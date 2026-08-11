#!/usr/bin/env bash
set -euo pipefail

if [[ "$#" -lt 6 ]]; then
  echo "host, Node root, Go root, module cache, state root, command, and arguments are required" >&2
  exit 2
fi

host="$1"
node_root="$2"
go_root="$3"
go_module_cache="$4"
state_root="$5"
shift 5

if [[ "$go_module_cache" != */go-module-cache/pkg/mod ]]; then
  echo "Go module cache is outside the immutable toolchain component" >&2
  exit 2
fi

exec "$host/env" -i \
  CI=1 HOME="$state_root/home" TMPDIR="$state_root/tmp" TMP="$state_root/tmp" \
  TEMP="$state_root/tmp" LANG=C LC_ALL=C TZ=UTC NO_COLOR=1 SOURCE_DATE_EPOCH=0 \
  NODE_OPTIONS=--max-old-space-size=8192 NODE_PATH= \
  PATH="$node_root/bin:$go_root/bin" SHELL= \
  NPM_CONFIG_CACHE="$state_root/npm-cache" \
  NPM_CONFIG_GLOBALCONFIG="$state_root/npm-global.conf" \
  NPM_CONFIG_USERCONFIG="$state_root/npm-user.conf" \
  GOROOT="$go_root" GOPATH="${go_module_cache%/pkg/mod}" \
  GOMODCACHE="$go_module_cache" GOCACHE="$state_root/go-build" \
  GO111MODULE=on GOAUTH=off GOENV=off GOFLAGS=-mod=readonly \
  GOINSECURE= GONOPROXY=none GONOSUMDB='*' GOPRIVATE= GOPROXY=off \
  GOSUMDB=off GOTOOLCHAIN=local GOVCS=off GOWORK=off \
  "$@"
