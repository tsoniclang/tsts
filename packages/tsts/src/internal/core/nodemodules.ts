import type { bool } from "../../go/scalars.js";
import type { GoMap } from "../../go/compat.js";
import * as maps from "../../go/maps.js";
import { OnceValue } from "../../go/sync.js";

import type { GoFunc } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::UnprefixedNodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"ee6061edc2a6608372fa0143103a74b11fd585da7615748ce09d3a6b1be96db1"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::ExclusivelyPrefixedNodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"be0f09352feff0409ea3bdd58272998d52fd1fe26b6e96e26d98c494e69e0f54"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/nodemodules.go::varGroup::NodeCoreModules","kind":"varGroup","status":"implemented","sigHash":"94448a0710922c5d4f0ba948ccd27b2a8ad68f0475327e947ccc83f81fab525d"}
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
export let NodeCoreModules: GoFunc<() => GoMap<string, bool>> = OnceValue<GoMap<string, bool>>((): GoMap<string, bool> => {
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
  if (NodeCoreModules!().get(moduleName)) {
    return "node";
  }
  return moduleName;
}
