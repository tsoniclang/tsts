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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::type::ExtendedConfigCache","kind":"type","status":"implemented","sigHash":"1b52b82667615aefc15acf9d7aa6dbe59c12376e0718375a18c85e3a9f6ade13"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::type::extendedConfigCacheEntry","kind":"type","status":"implemented","sigHash":"33a3944620d039898ebd8313ee2d0cb396b0ab0d9619ccba4171a54509d2a8ab"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::method::ExtendedConfigCache.GetExtendedConfig","kind":"method","status":"implemented","sigHash":"8e57132a1193eeffdb2a9ec5d5afe5e80ec35eec864063ee085f3613b4e87015"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/extendedconfigcache.go::method::ExtendedConfigCache.loadOrStoreNewLockedEntry","kind":"method","status":"implemented","sigHash":"ab2e292ce94004a8cf826497b03adb48e3f1dfca4ed7e0ae01cff17354af5869"}
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
