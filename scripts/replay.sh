#!/usr/bin/env bash
set -euo pipefail

script_dir="${BASH_SOURCE[0]%/*}"
root="$(cd "$script_dir/.." && pwd)"
: "${TSTS_HOST_PLATFORM_PATH:?TSTS_HOST_PLATFORM_PATH must select replay host utilities}"
host="$TSTS_HOST_PLATFORM_PATH"
for utility in awk bash date env flock mkdir mv systemd-run time timeout; do
  [[ "$host" = /* && "$host" != *:* && -x "$host/$utility" ]] || {
    echo "invalid replay host-platform utility boundary: $host/$utility" >&2
    exit 2
  }
done

if [[ "${TSTS_GUARDED:-0}" != "1" ]]; then
  exec "$host/env" TSTS_GUARDED=1 \
    "$host/bash" "$root/scripts/run-guarded.sh" \
    "$host/bash" "$root/scripts/replay.sh"
fi

canonical="$root/.temp/generated"
target="$root/.temp/target"
[[ -f "$canonical/gotots-manifest.json" ]]
[[ -f "$target/program.ts" ]]
[[ -f "$target/tsts-target-manifest.json" ]]

prior_out=""
if [[ -e "$target/out" ]]; then
  preserved="$root/.temp/preserved"
  "$host/mkdir" -p "$preserved"
  prior_out="$preserved/out-$("$host/date" -u +%Y%m%dT%H%M%SZ)-$$"
  "$host/mv" "$target/out" "$prior_out"
fi

digest_pattern='^  "toolchainDigest": "([0-9a-f]{64})",$'
toolchain_digest=""
while IFS= read -r line; do
  if [[ "$line" =~ $digest_pattern ]]; then
    if [[ -n "$toolchain_digest" ]]; then
      echo "target manifest contains duplicate toolchain digests" >&2
      exit 1
    fi
    toolchain_digest="${BASH_REMATCH[1]}"
  fi
done < "$target/tsts-target-manifest.json"
if [[ -z "$toolchain_digest" ]]; then
  echo "target manifest does not select an exact toolchain digest" >&2
  exit 1
fi

toolchain_root="$root/.temp/toolchains/$toolchain_digest"
bootstrap_node="$toolchain_root/node-runtime/bin/node"
bootstrap_state="$root/.temp/replay-bootstrap"
"$host/mkdir" -p "$bootstrap_state/home" "$bootstrap_state/tmp"
toolchain_line="$("$host/env" -i \
  HOME="$bootstrap_state/home" TMPDIR="$bootstrap_state/tmp" TMP="$bootstrap_state/tmp" \
  TEMP="$bootstrap_state/tmp" PATH="$host" LANG=C LC_ALL=C TZ=UTC \
  "$bootstrap_node" "$root/scripts/verify-target-manifest.mjs" \
  "$root" "$canonical" "$target" "$toolchain_digest" "$toolchain_root")"
IFS=$'\t' read -r \
  toolchain_digest toolchain_root gotots printer tsgo go go_root go_module_cache \
  node npm node_root state_root tool_cache_root immutable_distribution immutable_source \
  <<< "$toolchain_line"

run_toolchain() {
  "$host/bash" "$root/scripts/run-exact-toolchain.sh" \
    "$host" "$node_root" "$go_root" "$go_module_cache" "$state_root" "$@"
}

run_toolchain "$tsgo" -p "$target/tsconfig.emit.json"
run_toolchain "$node" "$root/scripts/assemble.mjs" \
  "$root" "$target" "$toolchain_digest" "$toolchain_root"
run_toolchain "$node" "$root/test/xxh3-contract.mjs" "$root"
run_toolchain "$node" "$root/test/core-hotpaths-contract.mjs" "$root"
run_toolchain "$node" "$root/scripts/seal-executable.mjs" \
  "$root" "$target" "$toolchain_digest" "$toolchain_root"
run_toolchain "$node" "$root/scripts/differential.mjs" "$root" "$tsgo"
if [[ -n "$prior_out" ]]; then
  run_toolchain "$node" "$root/scripts/remove-successful-scratch.mjs" \
    "$root" "$prior_out"
fi
