#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/check-scalar.sh"
fi

bash "$root/scripts/build-tools.sh"
"$root/.temp/bin/gotots" build -c "$root/test/scalar/gotots.json"
node "$root/scripts/target.mjs" \
  "$root" \
  "$root/.temp/scalar/canonical" \
  "$root/.temp/scalar/target" \
  "$root/test/scalar/runner.ts"
(
  cd "$root/tools/gotots"
  go tool tsgo -p "$root/.temp/scalar/target/tsconfig.json"
  go tool tsgo -p "$root/.temp/scalar/target/tsconfig.emit.json"
)
actual="$(node "$root/.temp/scalar/target/out/runner.js")"
if [[ "$actual" != "11" ]]; then
  echo "scalar target output = '$actual', want '11'" >&2
  exit 1
fi
printf 'scalar_target=%s\n' "$actual"
