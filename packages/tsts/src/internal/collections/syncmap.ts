import type { bool, int } from "../../go/scalars.js";
import type { Seq } from "../../go/iter.js";
import type { GoArray, GoComparable, GoDynamicComparable, GoMap, GoMapKeyDescriptor, GoPtr, GoZeroFactory } from "../../go/compat.js";
import { GoDynamicValue, GoMapMake } from "../../go/compat.js";
import { Map } from "../../go/sync.js";

import type { GoFunc } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::type::SyncMap","kind":"type","status":"implemented","sigHash":"4f6f655e995f945c3130474631c32240c46c5dd0b984a67769b1fe2ed69a7fa9"}
 *
 * Go source:
 * SyncMap[K comparable, V any] struct {
 * 	_ [0]K
 * 	_ [0]V
 * 	m sync.Map
 * }
 */
export interface SyncMap<K extends GoComparable, V> {
  __tsgoBlank0: GoArray<K, "0">;
  __tsgoBlank1: GoArray<V, "0">;
  m: Map;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Load","kind":"method","status":"implemented","sigHash":"8742a04ce4355c00eb82c36f8edccdfd8129995ae390641be36caee7a3d59b03"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized lookup receives exact static missing-value and key-representation operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Load(key K) (value V, ok bool) {
 * 	val, ok := s.m.Load(key)
 * 	if !ok || val == nil {
 * 		return value, ok
 * 	}
 * 	return val.(V), true
 * }
 */
export function SyncMap_Load<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, key: K, zeroValue: GoZeroFactory<V>, keyDescriptor: GoMapKeyDescriptor<K>): [value: V, ok: bool] {
  const value = zeroValue();
  const [val, ok] = receiver!.m.Load(GoDynamicValue(keyDescriptor, key));
  if (!ok || val === undefined) {
    return [value, ok];
  }
  return [val as V, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Store","kind":"method","status":"implemented","sigHash":"94630456ae4112e3622420c4cdb7bcd49b3e850cb36edfaf3780caad2035753f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized storage receives the exact static Go map-key descriptor for zero-value backing allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Store(key K, value V) {
 * 	s.m.Store(key, value)
 * }
 */
export function SyncMap_Store<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, key: K, value: V, keyDescriptor: GoMapKeyDescriptor<K>): void {
  receiver!.m.Store(GoDynamicValue(keyDescriptor, key), value);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.LoadOrStore","kind":"method","status":"implemented","sigHash":"3335e103762a37676b2ccb25628c5df2c2a6f44b6c12b07576fda42848d0a3b6"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized load-or-store receives exact static zero-value and Go map-key operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) LoadOrStore(key K, value V) (actual V, loaded bool) {
 * 	actualAny, loaded := s.m.LoadOrStore(key, value)
 * 	if actualAny == nil {
 * 		return actual, loaded
 * 	}
 * 
 * 	return actualAny.(V), loaded
 * }
 */
export function SyncMap_LoadOrStore<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, key: K, value: V, zeroValue: GoZeroFactory<V>, keyDescriptor: GoMapKeyDescriptor<K>): [actual: V, loaded: bool] {
  const [actual, loaded] = receiver!.m.LoadOrStore(GoDynamicValue(keyDescriptor, key), value);
  if (actual === undefined) {
    return [zeroValue(), loaded];
  }

  return [actual as V, loaded];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Delete","kind":"method","status":"implemented","sigHash":"11c8546058ae28b92e414283ae5fb8baec96f1050f60d153fd6715ef4363a694"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized deletion receives the exact static key-representation operation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Delete(key K) {
 * 	s.m.Delete(key)
 * }
 */
export function SyncMap_Delete<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, key: K, keyDescriptor: GoMapKeyDescriptor<K>): void {
  receiver!.m.Delete(GoDynamicValue(keyDescriptor, key));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Clear","kind":"method","status":"implemented","sigHash":"6d564106404f48db6f2d622a33eac281d3058ccb99fe7d718f901e909f5f19be"}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Clear() {
 * 	s.m.Clear()
 * }
 */
export function SyncMap_Clear<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>): void {
  receiver!.m.Clear();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Range","kind":"method","status":"implemented","sigHash":"5558fbe590ec5e96bfe465b80469387ab8baca6ae47d614be87642c0ca5cb9c7"}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Range(f func(key K, value V) bool) {
 * 	s.m.Range(func(key, value any) bool {
 * 		var k K
 * 		if key != nil {
 * 			k = key.(K)
 * 		}
 * 
 * 		var v V
 * 		if value != nil {
 * 			v = value.(V)
 * 		}
 * 
 * 		return f(k, v)
 * 	})
 * }
 */
export function SyncMap_Range<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, f: GoFunc<(key: K, value: V) => bool>): void {
  receiver!.m.Range((key, value): bool => f!((key as GoDynamicComparable<K>).value, value as V));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Size","kind":"method","status":"implemented","sigHash":"2784caf4e166218ceae9487fe1139ccb4f3b47f422efcd15d6ff0eb1d8e63ce9"}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Size() int {
 * 	count := 0
 * 	s.m.Range(func(_, _ any) bool {
 * 		count++
 * 		return true
 * 	})
 * 	return count
 * }
 */
export function SyncMap_Size<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>): int {
  let count = 0;
  receiver!.m.Range((_key, _value): bool => {
    count++;
    return true;
  });
  return count as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.ToMap","kind":"method","status":"implemented","sigHash":"a1b039297e8259bf5a5d29b8f9c25c5a5e9aa49ee48f49e4e3b679b648c6a359"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized-map materialization receives the exact static Go map-key descriptor for its result map.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) ToMap() map[K]V {
 * 	m := make(map[K]V, s.Size())
 * 	s.m.Range(func(key, value any) bool {
 * 		m[key.(K)] = value.(V)
 * 		return true
 * 	})
 * 	return m
 * }
 */
export function SyncMap_ToMap<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  const m = GoMapMake<K, V>(keyDescriptor);
  receiver!.m.Range((key, value): bool => {
    m.set((key as GoDynamicComparable<K>).value, value as V);
    return true;
  });
  return m;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Keys","kind":"method","status":"implemented","sigHash":"1b5ef426912c42096e3c6a500619def74fda575ef9ff8375b4091de3de8aef05"}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Keys() iter.Seq[K] {
 * 	return func(yield func(K) bool) {
 * 		s.m.Range(func(key, value any) bool {
 * 			if !yield(key.(K)) {
 * 				return false
 * 			}
 * 			return true
 * 		})
 * 	}
 * }
 */
export function SyncMap_Keys<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>): Seq<K> {
  return (yield_: GoFunc<(value: K) => bool>): void => {
    receiver!.m.Range((key, _value): bool => {
      if (!yield_!((key as GoDynamicComparable<K>).value)) {
        return false;
      }
      return true;
    });
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncmap.go::method::SyncMap.Clone","kind":"method","status":"implemented","sigHash":"96b7f45a1626d0905a2caf4520cffd4055c3d6e783a207f03df5c102a7615dd4"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic synchronized-map cloning receives the exact static Go map-key descriptor for clone storage.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (s *SyncMap[K, V]) Clone() *SyncMap[K, V] {
 * 	clone := &SyncMap[K, V]{}
 * 	s.m.Range(func(key, value any) bool {
 * 		clone.m.Store(key, value)
 * 		return true
 * 	})
 * 	return clone
 * }
 */
export function SyncMap_Clone<K extends GoComparable, V>(receiver: GoPtr<SyncMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<SyncMap<K, V>> {
  const clone: SyncMap<K, V> = {
    __tsgoBlank0: [],
    __tsgoBlank1: [],
    m: new Map(),
  };
  receiver!.m.Range((key, value): bool => {
    clone.m.Store(key, value);
    return true;
  });
  return clone;
}
