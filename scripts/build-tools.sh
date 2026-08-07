#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

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

for path in \
  tools/gotots \
  tools/tsonic \
  tools/tsonic-typescript \
  tools/typescript-runtime \
  tools/tsts-legacy \
  vendor/typescript-go; do
  verify_submodule "$path"
done
cmp "$root/AGENTS.md" "$root/CLAUDE.md"

npm --prefix "$root/tools/gotots/gostdlib" ci
npm --prefix "$root/tools/gotots/gostdlib" run build
npm --prefix "$root/tools/gotots/externals" run build

npm --prefix "$root/tools/typescript-runtime" ci
npm --prefix "$root/tools/typescript-runtime" run build

npm --prefix "$root/tools/tsts-legacy" ci
npm --prefix "$root/tools/tsts-legacy" run build

npm --prefix "$root/tools/tsonic" ci
npm --prefix "$root/tools/tsonic" run build

npm --prefix "$root/tools/tsonic-typescript" ci
npm --prefix "$root/tools/tsonic-typescript" run build

for path in \
  tools/gotots \
  tools/tsonic \
  tools/tsonic-typescript \
  tools/typescript-runtime \
  tools/tsts-legacy \
  vendor/typescript-go; do
  verify_submodule "$path"
done

node "$root/scripts/assemble-tools.mjs" "$root"

mkdir -p "$root/.temp/bin"
(
  cd "$root/tools/gotots"
  go build -o "$root/.temp/bin/gotots" ./cmd/gotots
  go build -o "$root/.temp/bin/tsgo-ast-printer" ./cmd/tsgo-ast-printer
)
