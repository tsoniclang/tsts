#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/replay.sh"
fi

canonical="$root/.temp/generated"
target="$root/.temp/target"
test -f "$canonical/gotots-manifest.json"
test -f "$target/program.ts"
test -f "$target/tsts-target-manifest.json"
mkdir -p "$root/.temp/bin"

if [[ -e "$target/out" ]]; then
  preserved="$root/.temp/preserved"
  mkdir -p "$preserved"
  mv "$target/out" \
    "$preserved/out-$(date -u +%Y%m%dT%H%M%SZ)-$$"
fi

node "$root/scripts/verify-target-manifest.mjs" "$root" "$canonical" "$target"

(
  cd "$root/tools/gotots"
  go tool tsgo -p "$target/tsconfig.emit.json"
)
node "$root/scripts/assemble.mjs" "$root" "$target"
node "$root/test/xxh3-contract.mjs" "$root"

(
  cd "$root/vendor/typescript-go"
  go build -o "$root/.temp/bin/tsgo-native" ./cmd/tsgo
)
node "$root/scripts/differential.mjs" "$root"
