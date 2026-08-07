#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/build.sh"
fi

verify_submodule() {
  local path="$1"
  local expected
  local actual

  expected="$(git -C "$root" ls-files --stage -- "$path" | awk '{ print $2 }')"
  actual="$(git -C "$root/$path" rev-parse HEAD)"
  if [[ -z "$expected" || "$actual" != "$expected" ]]; then
    echo "$path is not at its recorded gitlink" >&2
    exit 1
  fi
  if [[ -n "$(git -C "$root/$path" status --porcelain)" ]]; then
    echo "$path contains uncommitted changes" >&2
    exit 1
  fi
}

verify_submodule "tools/gotots"
verify_submodule "vendor/typescript-go"
cmp "$root/AGENTS.md" "$root/CLAUDE.md"

mkdir -p "$root/.temp/bin"
if [[ ! -d "$root/tools/gotots/gostdlib/node_modules/@types/node" ]]; then
  npm --prefix "$root/tools/gotots/gostdlib" ci
fi
npm --prefix "$root/tools/gotots/gostdlib" run build
npm --prefix "$root/tools/gotots/externals" run build
(
  cd "$root/tools/gotots"
  go build -o "$root/.temp/bin/gotots" ./cmd/gotots
)
"$root/.temp/bin/gotots" build -c "$root/gotots.json"
