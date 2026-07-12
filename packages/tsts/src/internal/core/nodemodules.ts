import type { bool } from "../../go/scalars.js";
import type { GoMap } from "../../go/compat.js";
import * as maps from "../../go/maps.js";
import { OnceValue } from "../../go/sync.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::UnprefixedNodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"00dcfbd0671d494a2d849d412f7532fcef4b7342281d62da72e1cc8efb4a5388"}
 *
 * Go source:
 * var UnprefixedNodeCoreModules = map[string]bool{
 * 	"assert":              true,
 * 	"assert/strict":       true,
 * 	"async_hooks":         true,
 * 	"buffer":              true,
 * 	"child_process":       true,
 * 	"cluster":             true,
 * 	"console":             true,
 * 	"constants":           true,
 * 	"crypto":              true,
 * 	"dgram":               true,
 * 	"diagnostics_channel": true,
 * 	"dns":                 true,
 * 	"dns/promises":        true,
 * 	"domain":              true,
 * 	"events":              true,
 * 	"fs":                  true,
 * 	"fs/promises":         true,
 * 	"http":                true,
 * 	"http2":               true,
 * 	"https":               true,
 * 	"inspector":           true,
 * 	"inspector/promises":  true,
 * 	"module":              true,
 * 	"net":                 true,
 * 	"os":                  true,
 * 	"path":                true,
 * 	"path/posix":          true,
 * 	"path/win32":          true,
 * 	"perf_hooks":          true,
 * 	"process":             true,
 * 	"punycode":            true,
 * 	"querystring":         true,
 * 	"readline":            true,
 * 	"readline/promises":   true,
 * 	"repl":                true,
 * 	"stream":              true,
 * 	"stream/consumers":    true,
 * 	"stream/promises":     true,
 * 	"stream/web":          true,
 * 	"string_decoder":      true,
 * 	"sys":                 true,
 * 	"timers":              true,
 * 	"timers/promises":     true,
 * 	"tls":                 true,
 * 	"trace_events":        true,
 * 	"tty":                 true,
 * 	"url":                 true,
 * 	"util":                true,
 * 	"util/types":          true,
 * 	"v8":                  true,
 * 	"vm":                  true,
 * 	"wasi":                true,
 * 	"worker_threads":      true,
 * 	"zlib":                true,
 * }
 */
export let UnprefixedNodeCoreModules: GoMap<string, bool> = new globalThis.Map<string, bool>([
  ["assert", true],
  ["assert/strict", true],
  ["async_hooks", true],
  ["buffer", true],
  ["child_process", true],
  ["cluster", true],
  ["console", true],
  ["constants", true],
  ["crypto", true],
  ["dgram", true],
  ["diagnostics_channel", true],
  ["dns", true],
  ["dns/promises", true],
  ["domain", true],
  ["events", true],
  ["fs", true],
  ["fs/promises", true],
  ["http", true],
  ["http2", true],
  ["https", true],
  ["inspector", true],
  ["inspector/promises", true],
  ["module", true],
  ["net", true],
  ["os", true],
  ["path", true],
  ["path/posix", true],
  ["path/win32", true],
  ["perf_hooks", true],
  ["process", true],
  ["punycode", true],
  ["querystring", true],
  ["readline", true],
  ["readline/promises", true],
  ["repl", true],
  ["stream", true],
  ["stream/consumers", true],
  ["stream/promises", true],
  ["stream/web", true],
  ["string_decoder", true],
  ["sys", true],
  ["timers", true],
  ["timers/promises", true],
  ["tls", true],
  ["trace_events", true],
  ["tty", true],
  ["url", true],
  ["util", true],
  ["util/types", true],
  ["v8", true],
  ["vm", true],
  ["wasi", true],
  ["worker_threads", true],
  ["zlib", true],
]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::ExclusivelyPrefixedNodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"1db47baaadc57ffe138dcb45fa85e4a84d64d3391a600e1cd44ba285fea0ea05"}
 *
 * Go source:
 * var ExclusivelyPrefixedNodeCoreModules = map[string]bool{
 * 	"node:quic":           true,
 * 	"node:sea":            true,
 * 	"node:sqlite":         true,
 * 	"node:test":           true,
 * 	"node:test/reporters": true,
 * }
 */
export let ExclusivelyPrefixedNodeCoreModules: GoMap<string, bool> = new globalThis.Map<string, bool>([
  ["node:quic", true],
  ["node:sea", true],
  ["node:sqlite", true],
  ["node:test", true],
  ["node:test/reporters", true],
]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::NodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"893e6ca72485f496815b62d5df8d4f69651f3576f404eca9f21e8878ac7f3118"}
 *
 * Go source:
 * var NodeCoreModules = sync.OnceValue(func() map[string]bool {
 * 	nodeCoreModules := make(map[string]bool, len(UnprefixedNodeCoreModules)*2+len(ExclusivelyPrefixedNodeCoreModules))
 * 	for unprefixed := range UnprefixedNodeCoreModules {
 * 		nodeCoreModules[unprefixed] = true
 * 		nodeCoreModules["node:"+unprefixed] = true
 * 	}
 * 	maps.Copy(nodeCoreModules, ExclusivelyPrefixedNodeCoreModules)
 * 	return nodeCoreModules
 * })
 */
export let NodeCoreModules: () => GoMap<string, bool> = OnceValue<GoMap<string, bool>>((): GoMap<string, bool> => {
  const nodeCoreModules = new globalThis.Map<string, bool>();
  for (const unprefixed of UnprefixedNodeCoreModules.keys()) {
    nodeCoreModules.set(unprefixed, true);
    nodeCoreModules.set("node:" + unprefixed, true);
  }
  maps.Copy(nodeCoreModules, ExclusivelyPrefixedNodeCoreModules);
  return nodeCoreModules;
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::func::NonRelativeModuleNameForTypingCache","kind":"func","status":"implemented","sigHash":"8ba3d267469749957b259accc676fb2847f346f8c34510a0614298c10e48e3a7"}
 *
 * Go source:
 * func NonRelativeModuleNameForTypingCache(moduleName string) string {
 * 	if NodeCoreModules()[moduleName] {
 * 		return "node"
 * 	}
 * 	return moduleName
 * }
 */
export function NonRelativeModuleNameForTypingCache(moduleName: string): string {
  if (NodeCoreModules().get(moduleName)) {
    return "node";
  }
  return moduleName;
}
