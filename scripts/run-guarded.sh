#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$root/.temp"

timeout_value="${TSTS_TIMEOUT:-30m}"
memory_max="${TSTS_MEMORY_MAX:-12G}"
minimum_available_kib="${TSTS_MIN_AVAILABLE_KIB:-16777216}"

exec 9>"$root/.temp/run-guarded.lock"
if ! flock -n 9; then
  echo "another guarded TSTS job is already running" >&2
  exit 75
fi

available_kib="$(awk '/^MemAvailable:/ { print $2 }' /proc/meminfo)"
if [[ -z "$available_kib" || "$available_kib" -lt "$minimum_available_kib" ]]; then
  echo "insufficient available memory: ${available_kib:-unknown} KiB" >&2
  exit 75
fi

run_id="$(date -u +%Y%m%dT%H%M%SZ)-$$"
record="$root/.temp/run-$run_id"
printf 'command=' >"$record.started"
printf '%q ' "$@" >>"$record.started"
printf '\n' >>"$record.started"

set +e
systemd-run --user --scope --quiet   --unit "tsts-$run_id"   -p "MemoryMax=$memory_max"   -p MemorySwapMax=0   -p OOMPolicy=kill   /usr/bin/time --verbose --output "$record.time"   timeout --signal=TERM --kill-after=30s "$timeout_value"   env GOMEMLIMIT="${GOMEMLIMIT:-9GiB}"       GOMAXPROCS="${GOMAXPROCS:-2}"       NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"       "$@"
status=$?
set -e
printf 'exit_status=%s\n' "$status" >"$record.finished"
exit "$status"
