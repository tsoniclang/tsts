import type { bool } from "../../go/scalars.js";
import { GoMapIsNil, GoMapMake } from "../../go/compat.js";
import type { GoComparable, GoMap, GoMapKeyDescriptor, GoPtr, GoZeroFactory } from "../../go/compat.js";
import { Arena_New } from "./arena.js";
import type { Arena } from "./arena.js";

import type { GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/linkstore.go::type::LinkStore","kind":"type","status":"implemented","sigHash":"96af231f81cab3ea96808ae94d0dd1d2f72fe89e0cdb4c2d385abf3ee3542b3d"}
 *
 * Go source:
 * LinkStore[K comparable, V any] struct {
 * 	entries map[K]*V
 * 	arena   Arena[V]
 * }
 */
export interface LinkStore<K extends GoComparable = unknown, V = unknown> {
  entries: GoMap<K, GoRef<V>>;
  arena: Arena<V>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/linkstore.go::method::LinkStore.Get","kind":"method","status":"implemented","sigHash":"9c97508aca07f6b6e2bf5511597c28312a377451b939490932beace4e6ef9302"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic link allocation receives the exact static stored-value zero and map-key operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *LinkStore[K, V]) Get(key K) *V {
 * 	value := s.entries[key]
 * 	if value != nil {
 * 		return value
 * 	}
 * 	if s.entries == nil {
 * 		s.entries = make(map[K]*V)
 * 	}
 * 	value = s.arena.New()
 * 	s.entries[key] = value
 * 	return value
 * }
 */
export function LinkStore_Get<K extends GoComparable, V>(receiver: GoPtr<LinkStore<K, V>>, key: K, zeroValue: GoZeroFactory<V>, keyDescriptor: GoMapKeyDescriptor<K>): GoRef<V> {
  if (GoMapIsNil(receiver!.entries)) {
    receiver!.entries = GoMapMake<K, GoRef<V>>(keyDescriptor);
  }
  const entries = receiver!.entries;
  let value = entries.get(key);
  if (value !== undefined) {
    return value;
  }
  value = Arena_New(receiver!.arena, zeroValue);
  entries.set(key, value);
  return value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/linkstore.go::method::LinkStore.Has","kind":"method","status":"implemented","sigHash":"d5412e68d7db372e005a7c9c2bd542d118470c5383a0760a238b2134d55819ac"}
 *
 * Go source:
 * func (s *LinkStore[K, V]) Has(key K) bool {
 * 	_, ok := s.entries[key]
 * 	return ok
 * }
 */
export function LinkStore_Has<K extends GoComparable, V>(receiver: GoPtr<LinkStore<K, V>>, key: K): bool {
  const ok = receiver!.entries.has(key);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/linkstore.go::method::LinkStore.TryGet","kind":"method","status":"implemented","sigHash":"3a7132f57e6bba51b9aa2b4955552b724fd1f6ae43a4ce9cf4963364414143d2"}
 *
 * Go source:
 * func (s *LinkStore[K, V]) TryGet(key K) *V {
 * 	return s.entries[key]
 * }
 */
export function LinkStore_TryGet<K extends GoComparable, V>(receiver: GoPtr<LinkStore<K, V>>, key: K): GoRef<V> {
  return receiver!.entries.get(key);
}
