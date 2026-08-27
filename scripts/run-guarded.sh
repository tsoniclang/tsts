#!/usr/bin/env bash
set -euo pipefail

script_dir="${BASH_SOURCE[0]%/*}"
root="$(cd "$script_dir/.." && pwd)"
: "${TSTS_HOST_PLATFORM_PATH:?TSTS_HOST_PLATFORM_PATH must select host utilities}"
host="$TSTS_HOST_PLATFORM_PATH"
"$host/mkdir" -p "$root/.temp"

timeout_value="${TSTS_TIMEOUT:-30m}"
memory_max="${TSTS_MEMORY_MAX:-12G}"
minimum_available_kib="${TSTS_MIN_AVAILABLE_KIB:-16777216}"
go_memory_limit="6GiB"
go_max_procs="2"
node_old_space_mib="10240"

exec 9>"$root/.temp/run-guarded.lock"
if ! "$host/flock" -n 9; then
  echo "another guarded TSTS job is already running" >&2
  exit 75
fi

available_kib="$("$host/awk" '/^MemAvailable:/ { print $2 }' /proc/meminfo)"
if [[ -z "$available_kib" || "$available_kib" -lt "$minimum_available_kib" ]]; then
  echo "insufficient available memory: ${available_kib:-unknown} KiB" >&2
  exit 75
fi

run_id="$("$host/date" -u +%Y%m%dT%H%M%SZ)-$$"
record="$root/.temp/run-$run_id"
printf 'command=' >"$record.started"
printf '%q ' "$@" >>"$record.started"
printf '\n' >>"$record.started"

set +e
"$host/systemd-run" --user --scope --quiet \
  --unit "tsts-$run_id" \
  -p "MemoryMax=$memory_max" \
  -p MemorySwapMax=0 \
  -p OOMPolicy=kill \
  "$host/time" --verbose --output "$record.time" \
  "$host/timeout" --signal=TERM --kill-after=30s "$timeout_value" \
  "$host/env" \
  TSTS_GO_MEMORY_LIMIT="$go_memory_limit" \
  TSTS_GO_MAX_PROCS="$go_max_procs" \
  TSTS_NODE_OLD_SPACE_MIB="$node_old_space_mib" \
  "$@"
status=$?
set -e
printf 'exit_status=%s\n' "$status" >"$record.finished"
exit "$status"
