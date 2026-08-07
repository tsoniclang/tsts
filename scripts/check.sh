#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec env TSTS_GUARDED=1 \
    bash "$root/scripts/run-guarded.sh" \
    bash "$root/scripts/check.sh"
fi

bash "$root/scripts/build.sh"
bash "$root/scripts/replay.sh"
