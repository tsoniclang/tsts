#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

node "$root/scripts/verify-tool-runtime.mjs" "$root" --selection
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

node "$root/scripts/verify-tool-runtime.mjs" "$root" --selection

node "$root/scripts/assemble-tools.mjs" "$root"

mkdir -p "$root/.temp/bin"
(
  cd "$root/tools/gotots"
  go build -o "$root/.temp/bin/gotots" ./cmd/gotots
  go build -o "$root/.temp/bin/tsgo-ast-printer" ./cmd/tsgo-ast-printer
)
