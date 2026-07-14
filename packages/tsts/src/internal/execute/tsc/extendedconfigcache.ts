import type { bool } from "../../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../../go/compat.js";
import { GoStringKey, GoZeroPointer } from "../../../go/compat.js";
import { Mutex } from "../../../go/sync.js";
import type { SyncMap } from "../../collections/syncmap.js";
import { SyncMap_LoadOrStore } from "../../collections/syncmap.js";
import type { ExtendedConfigCache as ExtendedConfigCache_f02f7376, ExtendedConfigCacheEntry, ParseConfigHost } from "../../tsoptions/tsconfigparsing.js";
import { ParseExtendedConfig } from "../../tsoptions/tsconfigparsing.js";
import type { Path } from "../../tspath/path.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::type::ExtendedConfigCache","kind":"type","status":"implemented","sigHash":"16b956a0a6c87fb4d8a04cedc5d547a2e935e0ee4f0e23c018e9fd01ed1689f7"}
 *
 * Go source:
 * ExtendedConfigCache struct {
 * 	m collections.SyncMap[tspath.Path, *extendedConfigCacheEntry]
 * }
 */
export interface ExtendedConfigCache {
  m: SyncMap<Path, GoPtr<extendedConfigCacheEntry>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::type::extendedConfigCacheEntry","kind":"type","status":"implemented","sigHash":"5ce44b7f0e315e1081d9bdf8aa47d454ecc9782902b2bc261033f4c9ec2c07dd"}
 *
 * Go source:
 * extendedConfigCacheEntry struct {
 * 	*tsoptions.ExtendedConfigCacheEntry
 * 	mu sync.Mutex
 * }
 */
export interface extendedConfigCacheEntry {
  __tsgoEmbedded0: GoPtr<ExtendedConfigCacheEntry>;
  mu: Mutex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"fead51199cce51b7cd068f71131e4060193fe4268f6990d25372e6c794851486"}
 *
 * Go source:
 * var _ tsoptions.ExtendedConfigCache = (*ExtendedConfigCache)(nil)
 */
export let __a568fcce_0: GoInterface<ExtendedConfigCache_f02f7376> = ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(undefined);

export function ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(receiver: GoPtr<ExtendedConfigCache>): ExtendedConfigCache_f02f7376 {
  return {
    GetExtendedConfig: (fileName: string, path: Path, resolutionStack: GoSlice<Path>, host: GoInterface<ParseConfigHost>): GoPtr<ExtendedConfigCacheEntry> =>
      ExtendedConfigCache_GetExtendedConfig(receiver, fileName, path, resolutionStack, host),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::method::ExtendedConfigCache.GetExtendedConfig","kind":"method","status":"implemented","sigHash":"a26ce8e5e79570c637cdf17f3548753f0301bc266a1014bea7648dda10e79702"}
 *
 * Go source:
 * func (e *ExtendedConfigCache) GetExtendedConfig(fileName string, path tspath.Path, resolutionStack []tspath.Path, host tsoptions.ParseConfigHost) *tsoptions.ExtendedConfigCacheEntry {
 * 	entry, loaded := e.loadOrStoreNewLockedEntry(path)
 * 	defer entry.mu.Unlock()
 * 	if !loaded {
 * 		entry.ExtendedConfigCacheEntry = tsoptions.ParseExtendedConfig(fileName, path, resolutionStack, host, e)
 * 	}
 * 	return entry.ExtendedConfigCacheEntry
 * }
 */
export function ExtendedConfigCache_GetExtendedConfig(receiver: GoPtr<ExtendedConfigCache>, fileName: string, path: Path, resolutionStack: GoSlice<Path>, host: GoInterface<ParseConfigHost>): GoPtr<ExtendedConfigCacheEntry> {
  const [entry, loaded] = ExtendedConfigCache_loadOrStoreNewLockedEntry(receiver, path);
  try {
    if (!loaded) {
      entry!.__tsgoEmbedded0 = ParseExtendedConfig(fileName, path, resolutionStack, host, ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(receiver));
    }
    return entry!.__tsgoEmbedded0;
  } finally {
    entry!.mu.Unlock();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::method::ExtendedConfigCache.loadOrStoreNewLockedEntry","kind":"method","status":"implemented","sigHash":"3619c5ab83ebdc99c921e882268b3a3584fee67d411c88b0f9d4554c492a9c82"}
 *
 * Go source:
 * func (c *ExtendedConfigCache) loadOrStoreNewLockedEntry(path tspath.Path) (*extendedConfigCacheEntry, bool) {
 * 	entry := &extendedConfigCacheEntry{}
 * 	entry.mu.Lock()
 * 	if existing, loaded := c.m.LoadOrStore(path, entry); loaded {
 * 		existing.mu.Lock()
 * 		return existing, true
 * 	}
 * 	return entry, false
 * }
 */
export function ExtendedConfigCache_loadOrStoreNewLockedEntry(receiver: GoPtr<ExtendedConfigCache>, path: Path): [GoPtr<extendedConfigCacheEntry>, bool] {
  const entry: extendedConfigCacheEntry = { __tsgoEmbedded0: undefined, mu: new Mutex() };
  entry.mu.Lock();
  const [existing, loaded] = SyncMap_LoadOrStore<Path, GoPtr<extendedConfigCacheEntry>>(receiver!.m, path, entry, GoZeroPointer<extendedConfigCacheEntry>, GoStringKey);
  if (loaded) {
    existing!.mu.Lock();
    return [existing, true];
  }
  return [entry, false];
}
