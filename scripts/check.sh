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
mode="${1:-verify}"
if [[ "$#" -gt 1 || ( "$mode" != "verify" && "$mode" != "publish" ) ]]; then
  echo "usage: scripts/check.sh [verify|publish]" >&2
  exit 2
fi
for utility in awk bash date env flock git mkdir mv sh systemd-run time timeout; do
  [[ "$host" = /* && "$host" != *:* && -x "$host/$utility" ]] || {
    echo "invalid host-platform utility boundary: $host/$utility" >&2
    exit 2
  }
done
bootstrap_state="$root/.temp/bootstrap-state"
"$host/mkdir" -p "$bootstrap_state/home" "$bootstrap_state/tmp" "$bootstrap_state/npm-cache"

if [[ -n "${TSTS_GUARDED:-}" ]]; then
  echo "the product check must own fresh assembly, toolchain, product, and replay guards" >&2
  exit 2
fi

"$host/bash" "$root/scripts/run-guarded.sh" \
  "$host/env" -i \
  HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
  TEMP="$bootstrap_state/tmp" PATH="${TSTS_NODE_BUILDER%/*}:$host" LANG=C LC_ALL=C \
  TZ=UTC NODE_OPTIONS= NODE_PATH= NPM_CONFIG_CACHE="$bootstrap_state/npm-cache" \
  TSTS_GO_BUILDER="$TSTS_GO_BUILDER" \
  TSTS_GO_MODULE_CACHE="$TSTS_GO_MODULE_CACHE" \
  TSTS_HOST_PLATFORM_PATH="$host" \
  "$TSTS_NODE_BUILDER" --test "$root"/test/*.test.mjs
"$host/bash" "$root/scripts/build.sh"
"$host/bash" "$root/scripts/replay.sh"
if [[ "$mode" = "publish" ]]; then
  "$host/env" -i \
    HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
    TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
    "$TSTS_NODE_BUILDER" "$root/scripts/publish-generated.mjs" \
    "$root" "$root/.temp/target" "$root/generated"
else
  "$host/env" -i \
    HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
    TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
    "$TSTS_NODE_BUILDER" "$root/scripts/verify-generated.mjs" \
    "$root" "$root/.temp/target" "$root/generated"
fi
