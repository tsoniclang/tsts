#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/build.sh"
fi

bash "$root/scripts/build-tools.sh"
node "$root/scripts/verify-typescript-target.mjs" "$root"
"$root/.temp/bin/gotots" build -c "$root/gotots.json"
node "$root/scripts/target.mjs" \
  "$root" \
  "$root/.temp/generated" \
  "$root/.temp/target" \
  "$root/assembly/runner.ts"
(
  cd "$root/tools/gotots"
  go tool tsgo -p "$root/.temp/target/tsconfig.json"
)
