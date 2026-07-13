import type { bool } from "../../../go/scalars.js";
import { GoZeroPointer, type GoComparable, type GoEquality, type GoMapKeyDescriptor, type GoPtr, type GoZeroFactory } from "../../../go/compat.js";
import { Map, Mutex } from "../../../go/sync.js";
import { SyncMap_Delete, SyncMap_LoadOrStore, SyncMap_Store } from "../../collections/syncmap.js";
import type { SyncMap } from "../../collections/syncmap.js";

import type { GoFunc } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::type::parseCacheEntry","kind":"type","status":"implemented","sigHash":"b0bcf8db74b0a9edfea4d6619cfb9f126f5464766f72635ef88ace7264561f50"}
 *
 * Go source:
 * parseCacheEntry[V comparable] struct {
 * 	value V
 * 	mu    sync.Mutex
 * }
 */
export interface parseCacheEntry<V extends GoComparable = unknown> {
  value: V;
  mu: Mutex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::type::parseCache","kind":"type","status":"implemented","sigHash":"ea424b2730ff8a5e2aa281b88ec7b93a6a3a77d8773a274db198495d19c209a1"}
 *
 * Go source:
 * parseCache[K comparable, V comparable] struct {
 * 	entries collections.SyncMap[K, *parseCacheEntry[V]]
 * }
 */
export interface parseCache<K extends GoComparable = unknown, V extends GoComparable = unknown> {
  entries: SyncMap<K, GoPtr<parseCacheEntry<V>>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::method::parseCache.loadOrStore","kind":"method","status":"implemented","sigHash":"687be8bd3c251584c9bd3de8cf5bf2f89bf4feb2ee573b40939cecde954cff19"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic cache storage receives exact static zero-value, equality, and map-key operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"},{"kind":"equality","parameter":"equal","typeParameter":"V"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (c *parseCache[K, V]) loadOrStore(key K, parse func(K) V, allowZero bool) V {
 * 	newEntry := &parseCacheEntry[V]{}
 * 	newEntry.mu.Lock()
 * 	defer newEntry.mu.Unlock()
 * 	if entry, loaded := c.entries.LoadOrStore(key, newEntry); loaded {
 * 		entry.mu.Lock()
 * 		defer entry.mu.Unlock()
 * 		if allowZero || entry.value != *new(V) {
 * 			return entry.value
 * 		}
 * 		newEntry = entry
 * 	}
 * 	newEntry.value = parse(key)
 * 	return newEntry.value
 * }
 */
export function parseCache_loadOrStore<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<parseCache<K, V>>, key: K, parse: GoFunc<(arg0: K) => V>, allowZero: bool, zeroValue: GoZeroFactory<V>, equal: GoEquality<V>, keyDescriptor: GoMapKeyDescriptor<K>): V {
  const zero = zeroValue();
  let newEntry: parseCacheEntry<V> = { value: zero, mu: new Mutex() };
  const [entry, loaded] = SyncMap_LoadOrStore<K, GoPtr<parseCacheEntry<V>>>(receiver!.entries as SyncMap<K, GoPtr<parseCacheEntry<V>>>, key, newEntry, GoZeroPointer<parseCacheEntry<V>>, keyDescriptor);
  if (loaded) {
    if (allowZero || !equal(entry!.value, zero)) {
      return entry!.value;
    }
    newEntry = entry!;
  }
  newEntry.value = parse!(key);
  return newEntry.value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::method::parseCache.store","kind":"method","status":"implemented","sigHash":"de712529c2c154ace9c8004bdd136f2ad68b3c9876537c35c541721b789e245d"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic cache storage receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (c *parseCache[K, V]) store(key K, value V) {
 * 	c.entries.Store(key, &parseCacheEntry[V]{value: value})
 * }
 */
export function parseCache_store<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<parseCache<K, V>>, key: K, value: V, keyDescriptor: GoMapKeyDescriptor<K>): void {
  SyncMap_Store<K, GoPtr<parseCacheEntry<V>>>(receiver!.entries as SyncMap<K, GoPtr<parseCacheEntry<V>>>, key, { value, mu: new Mutex() }, keyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::method::parseCache.delete","kind":"method","status":"implemented","sigHash":"272892ac9a7ddf92faaecb351b9543a4a036adc848b61a398fd591728756cab3"}
 *
 * Go source:
 * func (c *parseCache[K, V]) delete(key K) {
 * 	c.entries.Delete(key)
 * }
 */
export function parseCache_delete<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<parseCache<K, V>>, key: K): void {
  SyncMap_Delete<K, GoPtr<parseCacheEntry<V>>>(receiver!.entries as SyncMap<K, GoPtr<parseCacheEntry<V>>>, key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/parseCache.go::method::parseCache.reset","kind":"method","status":"implemented","sigHash":"d2536ad10f0efb61f5714b9dfcc024f57a99ca929ba2db4555f211c2eeeb6b61"}
 *
 * Go source:
 * func (c *parseCache[K, V]) reset() {
 * 	c.entries = collections.SyncMap[K, *parseCacheEntry[V]]{}
 * }
 */
export function parseCache_reset<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<parseCache<K, V>>): void {
  receiver!.entries = { __tsgoBlank0: [], __tsgoBlank1: [], m: new Map() } as SyncMap<K, GoPtr<parseCacheEntry<V>>>;
}
