/**
 * Node built-in module lists.
 *
 * Port of TS-Go `internal/core/nodemodules.go`.
 * `require('module').builtinModules` filtered into two sets:
 * unprefixed (also valid with `node:` prefix) and node:-only.
 */

const UNPREFIXED_NODE_CORE_LIST: readonly string[] = [
  "assert", "assert/strict", "async_hooks", "buffer", "child_process",
  "cluster", "console", "constants", "crypto", "dgram",
  "diagnostics_channel", "dns", "dns/promises", "domain", "events",
  "fs", "fs/promises", "http", "http2", "https", "inspector",
  "inspector/promises", "module", "net", "os", "path", "path/posix",
  "path/win32", "perf_hooks", "process", "punycode", "querystring",
  "readline", "readline/promises", "repl", "stream", "stream/consumers",
  "stream/promises", "stream/web", "string_decoder", "sys", "timers",
  "timers/promises", "tls", "trace_events", "tty", "url", "util",
  "util/types", "v8", "vm", "wasi", "worker_threads", "zlib",
];

const EXCLUSIVELY_PREFIXED_NODE_CORE_LIST: readonly string[] = [
  "node:quic", "node:sea", "node:sqlite", "node:test", "node:test/reporters",
];

export const unprefixedNodeCoreModules: ReadonlySet<string> = new Set(UNPREFIXED_NODE_CORE_LIST);

export const exclusivelyPrefixedNodeCoreModules: ReadonlySet<string> = new Set(EXCLUSIVELY_PREFIXED_NODE_CORE_LIST);

let _nodeCoreModulesCache: ReadonlySet<string> | undefined;

export function nodeCoreModules(): ReadonlySet<string> {
  if (_nodeCoreModulesCache === undefined) {
    const set = new Set<string>();
    for (const name of UNPREFIXED_NODE_CORE_LIST) {
      set.add(name);
      set.add("node:" + name);
    }
    for (const name of EXCLUSIVELY_PREFIXED_NODE_CORE_LIST) {
      set.add(name);
    }
    _nodeCoreModulesCache = set;
  }
  return _nodeCoreModulesCache;
}

export function nonRelativeModuleNameForTypingCache(moduleName: string): string {
  if (nodeCoreModules().has(moduleName)) return "node";
  return moduleName;
}
