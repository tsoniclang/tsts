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
  "$host/env" TSTS_GUARDED=1 TSTS_BUILD_TRANSACTION=toolchain \
    "$host/bash" "$root/scripts/run-guarded.sh" \
    "$host/bash" "$root/scripts/build.sh"
  exec "$host/env" TSTS_GUARDED=1 TSTS_BUILD_TRANSACTION=product \
    "$host/bash" "$root/scripts/run-guarded.sh" \
    "$host/bash" "$root/scripts/build.sh"
fi

build_transaction="${TSTS_BUILD_TRANSACTION:-}"
case "$build_transaction" in
  toolchain|product) ;;
  *)
    echo "guarded build transaction must be toolchain or product" >&2
    exit 2
    ;;
esac

if [[ "$build_transaction" = "toolchain" ]]; then
  "$host/env" -i \
    HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
    TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
    "$TSTS_NODE_BUILDER" "$root/scripts/construct-toolchain.mjs" \
    "$root" "$TSTS_GO_BUILDER" "$TSTS_GO_MODULE_CACHE" \
    "$TSTS_NODE_BUILDER" "$TSTS_NPM_CLI" "$host"
  exit 0
fi

toolchain_line="$("$host/env" -i \
  HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
  TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
  "$TSTS_NODE_BUILDER" "$root/scripts/open-selected-toolchain.mjs" \
  "$root" "$TSTS_NODE_BUILDER")"
IFS=$'\t' read -r \
  toolchain_digest toolchain_root gotots printer tsgo go go_root go_module_cache \
  node npm node_root state_root tool_cache_root immutable_distribution immutable_source \
  distribution_workspace \
  <<< "$toolchain_line"

run_measured_toolchain() {
  local phase="$1"
  shift
  case "$phase" in
    target-proof|generation|target|typecheck) ;;
    *)
      echo "unknown measured build phase: $phase" >&2
      exit 2
      ;;
  esac
  local metrics_root="$root/.temp/phase-metrics"
  local record="$metrics_root/$phase.time"
  "$host/mkdir" -p "$metrics_root"
  "$host/time" --verbose --output "$record" \
    "$host/bash" "$root/scripts/run-exact-toolchain.sh" \
    "$host" "$node_root" "$go_root" "$go_module_cache" "$state_root" "$@"
  "$host/awk" -v phase="$phase" '
    /Elapsed \(wall clock\) time/ { elapsed = $NF }
    /Maximum resident set size/ { peak = $NF }
    END {
      if (elapsed == "" || peak == "") {
        exit 2
      }
      printf "phase=%s elapsed=%s peak_rss_kib=%s\n", phase, elapsed, peak
    }
  ' "$record"
}

run_measured_toolchain target-proof \
  "$node" "$root/scripts/verify-typescript-target.mjs" \
  "$root" "$toolchain_digest" "$toolchain_root"
run_measured_toolchain generation "$gotots" build -c "$root/gotots.json" \
  --distribution-root "$distribution_workspace" \
  --project-root "$immutable_source" \
  --go "$go" \
  --tsgo "$tsgo" \
  --tool-cache "$tool_cache_root"
run_measured_toolchain target "$node" "$root/scripts/target.mjs" \
  "$root" \
  "$root/.temp/generated" \
  "$root/.temp/target" \
  "$root/assembly/runner.ts" \
  "$toolchain_digest" \
  "$toolchain_root"
run_measured_toolchain typecheck \
  "$tsgo" -p "$root/.temp/target/tsconfig.json"
"$host/bash" "$root/scripts/run-exact-toolchain.sh" \
  "$host" "$node_root" "$go_root" "$go_module_cache" "$state_root" \
  "$node" "$root/scripts/remove-successful-scratch.mjs" \
  "$root" "${distribution_workspace%/compiler-distribution}"
