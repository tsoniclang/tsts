#!/usr/bin/env bash
set -euo pipefail

script_dir="${BASH_SOURCE[0]%/*}"
root="$(cd "$script_dir/.." && pwd)"
: "${TSTS_GO_BUILDER:?TSTS_GO_BUILDER must select the exact Go builder}"
: "${TSTS_GO_MODULE_CACHE:?TSTS_GO_MODULE_CACHE must select the exact Go module cache}"
: "${TSTS_NODE_BUILDER:?TSTS_NODE_BUILDER must select the exact Node bootstrap}"
: "${TSTS_NPM_CLI:?TSTS_NPM_CLI must select the exact npm CLI}"
: "${TSTS_HOST_PLATFORM_PATH:?TSTS_HOST_PLATFORM_PATH must select host utilities}"
host="$TSTS_HOST_PLATFORM_PATH"
for utility in awk bash date env flock git mkdir mv sh systemd-run time timeout; do
  [[ "$host" = /* && "$host" != *:* && -x "$host/$utility" ]] || {
    echo "invalid host-platform utility boundary: $host/$utility" >&2
    exit 2
  }
done
bootstrap_state="$root/.temp/bootstrap-state"
"$host/mkdir" -p "$bootstrap_state/home" "$bootstrap_state/tmp"

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec "$host/env" TSTS_GUARDED=1 \
    "$host/bash" "$root/scripts/run-guarded.sh" \
    "$host/bash" "$root/scripts/check-scalar.sh"
fi

toolchain_line="$("$host/env" -i \
  HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
  TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
  "$TSTS_NODE_BUILDER" "$root/scripts/build-toolchain.mjs" \
  "$root" "$TSTS_GO_BUILDER" "$TSTS_GO_MODULE_CACHE" \
  "$TSTS_NODE_BUILDER" "$TSTS_NPM_CLI" "$host")"
IFS=$'\t' read -r \
  toolchain_digest toolchain_root gotots printer tsgo go go_root go_module_cache \
  node npm node_root state_root tool_cache_root immutable_distribution immutable_source \
  distribution_workspace \
  <<< "$toolchain_line"

run_toolchain() {
  "$host/bash" "$root/scripts/run-exact-toolchain.sh" \
    "$host" "$node_root" "$go_root" "$go_module_cache" "$state_root" "$@"
}

run_toolchain "$gotots" build -c "$root/test/scalar/gotots.json" \
  --distribution-root "$distribution_workspace" \
  --go "$go" \
  --tsgo "$tsgo" \
  --tool-cache "$tool_cache_root"
run_toolchain "$node" "$root/scripts/target.mjs" \
  "$root" \
  "$root/.temp/scalar/canonical" \
  "$root/.temp/scalar/target" \
  "$root/test/scalar/runner.ts" \
  "$toolchain_digest" \
  "$toolchain_root"
run_toolchain "$tsgo" -p "$root/.temp/scalar/target/tsconfig.json"
run_toolchain "$tsgo" -p "$root/.temp/scalar/target/tsconfig.emit.json"
actual="$(run_toolchain "$node" "$root/.temp/scalar/target/out/runner.js")"
if [[ "$actual" != "11" ]]; then
  echo "scalar target output = '$actual', want '11'" >&2
  exit 1
fi
printf 'scalar_target=%s\n' "$actual"
