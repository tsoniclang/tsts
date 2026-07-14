import type { bool, int } from "../../go/scalars.js";
import type { Seq } from "../../go/iter.js";
import type { GoComparable, GoEquality, GoMap, GoMapKeyDescriptor, GoPtr, GoSlice } from "../../go/compat.js";
import { GoAppend, GoAppendSlice, GoMapIsNil, GoMapMake, GoNilMap } from "../../go/compat.js";
import * as maps from "../../go/maps.js";
import * as slices from "../../go/slices.js";

import type { GoFunc } from "../../go/compat.js";
import { GoEmptySlice } from "../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::type::MultiMap","kind":"type","status":"implemented","sigHash":"5fa746f9ad8184af45af12e61f174c3763b0f6e232c9d3cf29c17b36e4bd2f94"}
 *
 * Go source:
 * MultiMap[K comparable, V comparable] struct {
 * 	M map[K][]V
 * }
 */
export interface MultiMap<K extends GoComparable, V extends GoComparable> {
  M: GoMap<K, GoSlice<V>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::func::NewMultiMapWithSizeHint","kind":"func","status":"implemented","sigHash":"58f9bfeafa8eb6db3f0b665be009113ad9db3a0790abd5ce6f4165ae005cc499"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic multimap construction receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func NewMultiMapWithSizeHint[K comparable, V comparable](hint int) *MultiMap[K, V] {
 * 	return &MultiMap[K, V]{
 * 		M: make(map[K][]V, hint),
 * 	}
 * }
 */
export function NewMultiMapWithSizeHint<K extends GoComparable, V extends GoComparable>(hint: int, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<MultiMap<K, V>> {
  return {
    M: GoMapMake<K, GoSlice<V>>(keyDescriptor),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::func::GroupBy","kind":"func","status":"implemented","sigHash":"dca9bec35095fffba77521f0103dbd239076e0eb2c1ab06c3a4224e7d3b0f013"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic grouping forwards the exact static Go map-key descriptor to lazy multimap allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func GroupBy[K comparable, V comparable](items []V, groupId func(V) K) *MultiMap[K, V] {
 * 	m := &MultiMap[K, V]{}
 * 	for _, item := range items {
 * 		m.Add(groupId(item), item)
 * 	}
 * 	return m
 * }
 */
export function GroupBy<K extends GoComparable, V extends GoComparable>(items: GoSlice<V>, groupId: GoFunc<(arg0: V) => K>, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<MultiMap<K, V>> {
  const m: MultiMap<K, V> = { M: GoNilMap() };
  for (const item of items) {
    MultiMap_Add(m, groupId!(item), item, keyDescriptor);
  }
  return m;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Has","kind":"method","status":"implemented","sigHash":"f0b00bccc54335d4e0fcc9c112aa1accca3c8ae9fdce4405888095d8c06f4917"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Has(key K) bool {
 * 	_, ok := s.M[key]
 * 	return ok
 * }
 */
export function MultiMap_Has<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>, key: K): bool {
  const ok = receiver!.M.has(key);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Get","kind":"method","status":"implemented","sigHash":"a0be42680e41c44ecfbdd545e85e250c152199f88dfb03d99e9584f3cd0d4a6b"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Get(key K) []V {
 * 	return s.M[key]
 * }
 */
export function MultiMap_Get<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>, key: K): GoSlice<V> {
  return receiver!.M.get(key) ?? GoEmptySlice<V>();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Add","kind":"method","status":"implemented","sigHash":"64e28fd3385c790f5abed8cd688703d0bccb64cbb070ade258ebc3569f0f41f9"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic zero-multimap mutation receives the exact static Go map-key descriptor for lazy allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Add(key K, value V) {
 * 	if s.M == nil {
 * 		s.M = make(map[K][]V)
 * 	}
 * 	s.M[key] = append(s.M[key], value)
 * }
 */
export function MultiMap_Add<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>, key: K, value: V, keyDescriptor: GoMapKeyDescriptor<K>): void {
  if (GoMapIsNil(receiver!.M)) {
    receiver!.M = GoMapMake<K, GoSlice<V>>(keyDescriptor);
  }
  const existing = receiver!.M.get(key) ?? [];
  receiver!.M.set(key, GoAppend(existing, value));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Remove","kind":"method","status":"implemented","sigHash":"0ea0dff4fd3e8f01b8ae63b0221510a18d7c70c86e185367cfc9ddfccfcf9f03"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased multimap value type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"V"}]}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Remove(key K, value V) {
 * 	if values, ok := s.M[key]; ok {
 * 		i := slices.Index(values, value)
 * 		if i >= 0 {
 * 			if len(values) == 1 {
 * 				delete(s.M, key)
 * 			} else {
 * 				values = append(values[:i], values[i+1:]...)
 * 				s.M[key] = values
 * 			}
 * 		}
 * 	}
 * }
 */
export function MultiMap_Remove<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>, key: K, value: V, equal: GoEquality<V>): void {
  const values0 = receiver!.M.get(key);
  if (values0 !== undefined) {
    const i = slices.Index(values0, value, equal);
    if (i >= 0) {
      if (values0.length === 1) {
        receiver!.M.delete(key);
      } else {
        let values = values0.slice(0, i);
        values = GoAppendSlice(values, values0.slice(i + 1));
        receiver!.M.set(key, values);
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.RemoveAll","kind":"method","status":"implemented","sigHash":"2743e289f7d0c8ede0d6ff9a90100121addc29eaed0c6fa80a982def77ea0aa7"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) RemoveAll(key K) {
 * 	delete(s.M, key)
 * }
 */
export function MultiMap_RemoveAll<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>, key: K): void {
  receiver!.M.delete(key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Len","kind":"method","status":"implemented","sigHash":"9545983b0c0717a575d026b1f087f18ac050729af3be83dcafa3c11948e7e157"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Len() int {
 * 	return len(s.M)
 * }
 */
export function MultiMap_Len<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>): int {
  return receiver!.M.size;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Keys","kind":"method","status":"implemented","sigHash":"97eee82df00b25ee006c042e379c1f353455a028cc92e76d9ed0c6221a179d8e"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Keys() iter.Seq[K] {
 * 	return maps.Keys(s.M)
 * }
 */
export function MultiMap_Keys<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>): Seq<K> {
  return maps.Keys(receiver!.M);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Values","kind":"method","status":"implemented","sigHash":"51776984b3391916439a0cf3d348cf1e6c6f23aa1e959dca2f762e1a87079d7a"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Values() iter.Seq[[]V] {
 * 	return maps.Values(s.M)
 * }
 */
export function MultiMap_Values<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>): Seq<GoSlice<V>> {
  return maps.Values(receiver!.M);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/multimap.go::method::MultiMap.Clear","kind":"method","status":"implemented","sigHash":"a20f480be4680cd7692932a9a1b2ab300aeb8bda8838b0f14a7e39f23eb80d4c"}
 *
 * Go source:
 * func (s *MultiMap[K, V]) Clear() {
 * 	clear(s.M)
 * }
 */
export function MultiMap_Clear<K extends GoComparable, V extends GoComparable>(receiver: GoPtr<MultiMap<K, V>>): void {
  receiver!.M.clear();
}
