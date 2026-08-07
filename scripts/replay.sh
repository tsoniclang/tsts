#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/replay.sh"
fi

generated="$root/.temp/generated"
test -f "$generated/program.ts"
test -f "$generated/gotots-manifest.json"
mkdir -p "$root/.temp/bin"

if [[ -e "$generated/out" ]]; then
  preserved="$root/.temp/preserved"
  mkdir -p "$preserved"
  mv "$generated/out" \
    "$preserved/out-$(date -u +%Y%m%dT%H%M%SZ)-$$"
fi

cp "$root/assembly/runner.ts" "$generated/runner.ts"
cp "$root/assembly/tsconfig.emit.json" "$generated/tsconfig.emit.json"
(
  cd "$root/tools/gotots"
  go tool tsgo -p "$generated/tsconfig.emit.json"
)
node "$root/scripts/assemble.mjs" "$root"
node "$root/test/xxh3-contract.mjs" "$root"

(
  cd "$root/vendor/typescript-go"
  go build -o "$root/.temp/bin/tsgo-native" ./cmd/tsgo
)
node "$root/scripts/differential.mjs" "$root"
