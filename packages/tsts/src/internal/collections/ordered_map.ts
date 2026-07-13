import type { bool, int } from "../../go/scalars.js";
import type { Seq, Seq2 } from "../../go/iter.js";
import {
  GoMapIsNil,
  GoMapMake,
  GoStringKey,
  type GoComparable,
  type GoEquality,
  type GoError,
  type GoFunc,
  type GoInterface,
  type GoMap,
  type GoMapKeyDescriptor,
  type GoPtr,
  type GoSlice,
  type GoZeroFactory,
} from "../../go/compat.js";
import { Int as reflect_Int, Int8 as reflect_Int8, Int16 as reflect_Int16, Int32 as reflect_Int32, Int64 as reflect_Int64, Uint as reflect_Uint, Uint8 as reflect_Uint8, Uint16 as reflect_Uint16, Uint32 as reflect_Uint32, Uint64 as reflect_Uint64, Uintptr as reflect_Uintptr, String as reflect_String, ValueOf as reflect_ValueOf } from "../../go/reflect.js";
import type { Value } from "../../go/reflect.js";
import { BeginObject as json_BeginObject, EndObject as json_EndObject, MarshalEncode as json_MarshalEncode } from "../json/json.js";
import type { Decoder, Encoder, MarshalerTo, UnmarshalerFrom } from "../json/json.js";
import * as slices from "../../go/slices.js";
import * as maps from "../../go/maps.js";
import * as strconv from "../../go/strconv.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::type::OrderedMap","kind":"type","status":"implemented","sigHash":"671bcec921be98d7ca21605a749133736df54c2b4c9e9e08fe72c5ecd5265e1b"}
 *
 * Go source:
 * OrderedMap[K comparable, V any] struct {
 * 	_    noCopy
 * 	keys []K
 * 	mp   map[K]V
 * }
 */
export interface OrderedMap<K extends GoComparable = unknown, V = unknown> {
  __tsgoBlank0: noCopy;
  keys: GoSlice<K>;
  mp: GoMap<K, V>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::type::noCopy","kind":"type","status":"implemented","sigHash":"b0d7fc76eb2a0820142f0a97003bd894c9dc0c9aa9a6200692eb4d77d21c2e00"}
 *
 * Go source:
 * noCopy struct{}
 */
export interface noCopy {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::noCopy.Lock","kind":"method","status":"implemented","sigHash":"a0089b65a8326a24a9d04c3ffc94c9425d54b9d2d6e4fb86812ce6293debaa5e"}
 *
 * Go source:
 * func (*noCopy) Lock()   {}
 */
export function noCopy_Lock(receiver: GoPtr<noCopy>): void {}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::noCopy.Unlock","kind":"method","status":"implemented","sigHash":"4b8ec101bd0b82416c8a357dd49660645aba927e928d925db66e01338e538acb"}
 *
 * Go source:
 * func (*noCopy) Unlock() {}
 */
export function noCopy_Unlock(receiver: GoPtr<noCopy>): void {}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::NewOrderedMapWithSizeHint","kind":"func","status":"implemented","sigHash":"0f4b48feb0d709268ce7bfa826eb0576bb266d7d5288af2ec386e19b94d9d96d"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-map construction forwards the exact static Go map-key descriptor to its allocation site.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func NewOrderedMapWithSizeHint[K comparable, V any](hint int) *OrderedMap[K, V] {
 * 	m := newMapWithSizeHint[K, V](hint)
 * 	return &m
 * }
 */
export function NewOrderedMapWithSizeHint<K extends GoComparable, V>(hint: int, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<OrderedMap<K, V>> {
  const m = newMapWithSizeHint<K, V>(hint, keyDescriptor);
  return m;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::newMapWithSizeHint","kind":"func","status":"implemented","sigHash":"9f925b2c16d1d7b12e2daf84eb6bea932acf8473c8c8da665148256cf505f61a"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-map allocation receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func newMapWithSizeHint[K comparable, V any](hint int) OrderedMap[K, V] {
 * 	return OrderedMap[K, V]{
 * 		keys: make([]K, 0, hint),
 * 		mp:   make(map[K]V, hint),
 * 	}
 * }
 */
export function newMapWithSizeHint<K extends GoComparable, V>(hint: int, keyDescriptor: GoMapKeyDescriptor<K>): OrderedMap<K, V> {
  return {
    __tsgoBlank0: {},
    keys: [],
    mp: GoMapMake<K, V>(keyDescriptor),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::type::MapEntry","kind":"type","status":"implemented","sigHash":"2c5396148b761558a159b207cb872400e7b671f9d217cfe2d519b82acfeb171f"}
 *
 * Go source:
 * MapEntry[K comparable, V any] struct {
 * 	Key   K
 * 	Value V
 * }
 */
export interface MapEntry<K extends GoComparable = unknown, V = unknown> {
  Key: K;
  Value: V;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::NewOrderedMapFromList","kind":"func","status":"implemented","sigHash":"bf79157fc2248e0cc47ce4bf9c7bc5339ae7f4e7019b10c543780f354199e53b"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-map list construction forwards the exact static Go map-key descriptor through every possible allocation path.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func NewOrderedMapFromList[K comparable, V any](items []MapEntry[K, V]) *OrderedMap[K, V] {
 * 	mp := NewOrderedMapWithSizeHint[K, V](len(items))
 * 	for _, item := range items {
 * 		mp.Set(item.Key, item.Value)
 * 	}
 * 	return mp
 * }
 */
export function NewOrderedMapFromList<K extends GoComparable, V>(items: GoSlice<MapEntry<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<OrderedMap<K, V>> {
  const mp = NewOrderedMapWithSizeHint<K, V>(items.length as int, keyDescriptor);
  for (const item of items) {
    OrderedMap_Set(mp, item.Key, item.Value, keyDescriptor);
  }
  return mp;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Set","kind":"method","status":"implemented","sigHash":"4469e0419152708c32019c17e81db5753ad891e423fc90155f2f7530d2c865a2"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"A zero-value erased generic ordered map receives the exact static Go map-key descriptor before allocating its backing map.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Set(key K, value V) {
 * 	if m.mp == nil {
 * 		m.mp = make(map[K]V)
 * 	}
 * 
 * 	if _, ok := m.mp[key]; !ok {
 * 		m.keys = append(m.keys, key)
 * 	}
 * 	m.mp[key] = value
 * }
 */
export function OrderedMap_Set<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, key: K, value: V, keyDescriptor: GoMapKeyDescriptor<K>): void {
  const m = receiver!;
  if (GoMapIsNil(m.mp)) {
    m.mp = GoMapMake<K, V>(keyDescriptor);
  }

  if (!m.mp.has(key)) {
    m.keys.push(key);
  }
  m.mp.set(key, value);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Get","kind":"method","status":"implemented","sigHash":"d32439c79fc90fa79c6ccc0d49a836f88237405347f2c6405ea0dd7bf357813b"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic lookup receives the exact static missing-value zero operation.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Get(key K) (V, bool) {
 * 	v, ok := m.mp[key]
 * 	return v, ok
 * }
 */
export function OrderedMap_Get<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, key: K, zeroValue: GoZeroFactory<V>): [V, bool] {
  const m = receiver!;
  const ok = m.mp.has(key);
  const v = ok ? m.mp.get(key)! : zeroValue();
  return [v, ok];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.GetOrZero","kind":"method","status":"implemented","sigHash":"8ab8a933ca7d7e86a8870543eff284236741ef6c0af43c71f73013d3561f173f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic lookup receives the exact static missing-value zero operation.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) GetOrZero(key K) V {
 * 	return m.mp[key]
 * }
 */
export function OrderedMap_GetOrZero<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, key: K, zeroValue: GoZeroFactory<V>): V {
  const m = receiver!;
  return m.mp.has(key) ? m.mp.get(key)! : zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.EntryAt","kind":"method","status":"implemented","sigHash":"57f46ffa42a364a35ede98eb6aecdf235862499af9603ae406ae3e4c032351cd"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic execution receives explicit static key and value zero dictionaries for the out-of-range result path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroKey","typeParameter":"K"},{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) EntryAt(index int) (K, V, bool) {
 * 	if index < 0 || index >= len(m.keys) {
 * 		var zero K
 * 		var zeroV V
 * 		return zero, zeroV, false
 * 	}
 * 
 * 	key := m.keys[index]
 * 	value := m.mp[key]
 * 	return key, value, true
 * }
 */
export function OrderedMap_EntryAt<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, index: int, zeroKey: GoZeroFactory<K>, zeroValue: GoZeroFactory<V>): [K, V, bool] {
  const m = receiver!;
  if (index < 0 || index >= m.keys.length) {
    return [zeroKey(), zeroValue(), false];
  }

  const key = m.keys[index]!;
  const value = m.mp.get(key)!;
  return [key, value, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Has","kind":"method","status":"implemented","sigHash":"2ef919354268b886d61a64faec9c30c7eb37282675c61342aa0db916221f22c3"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Has(key K) bool {
 * 	_, ok := m.mp[key]
 * 	return ok
 * }
 */
export function OrderedMap_Has<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, key: K): bool {
  const m = receiver!;
  const ok = m.mp.has(key);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Delete","kind":"method","status":"implemented","sigHash":"c9fe7cf0be22689301b59a2c908bb19938a9b00e5035ef0e6875dd4fb446786e"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic deletion receives the exact static missing-value zero and key equality operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"},{"kind":"equality","parameter":"equalKey","typeParameter":"K"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Delete(key K) (V, bool) {
 * 	v, ok := m.mp[key]
 * 	if !ok {
 * 		var zero V
 * 		return zero, false
 * 	}
 * 
 * 	delete(m.mp, key)
 * 	i := slices.Index(m.keys, key)
 * 	// If we're just removing the first or last element, avoid shifting everything around.
 * 	if i == 0 {
 * 		var zero K
 * 		m.keys[0] = zero
 * 		m.keys = m.keys[1:]
 * 	} else if end := len(m.keys) - 1; i == end {
 * 		var zero K
 * 		m.keys[end] = zero
 * 		m.keys = m.keys[:end]
 * 	} else {
 * 		m.keys = slices.Delete(m.keys, i, i+1)
 * 	}
 * 
 * 	return v, true
 * }
 */
export function OrderedMap_Delete<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, key: K, zeroValue: GoZeroFactory<V>, equalKey: GoEquality<K>): [V, bool] {
  const m = receiver!;
  const ok = m.mp.has(key);
  if (!ok) {
    return [zeroValue(), false];
  }
  const v = m.mp.get(key)!;

  m.mp.delete(key);
  const i = slices.Index(m.keys, key, equalKey);
  if (i === 0) {
    m.keys = m.keys.slice(1);
  } else {
    const end = m.keys.length - 1;
    if (i === end) {
      m.keys = m.keys.slice(0, end);
    } else {
      m.keys = slices.Delete(m.keys, i, i + 1);
    }
  }

  return [v, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Keys","kind":"method","status":"implemented","sigHash":"4bdb7d3c04f3c740e8e2997c82b8b416f84cacfbac06d72d64a20a20b6c7cf47"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Keys() iter.Seq[K] {
 * 	return func(yield func(K) bool) {
 * 		if m == nil {
 * 			return
 * 		}
 * 
 * 		// We use a for loop here to ensure we enumerate new items added during iteration.
 * 		//nolint:intrange
 * 		for i := 0; i < len(m.keys); i++ {
 * 			if !yield(m.keys[i]) {
 * 				break
 * 			}
 * 		}
 * 	}
 * }
 */
export function OrderedMap_Keys<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>): Seq<K> {
  const m = receiver;
  return (yield_: GoFunc<(value: K) => bool>): void => {
    if (m === undefined) {
      return;
    }

    // We use a for loop here to ensure we enumerate new items added during iteration.
    const iterate = (i: number): void => {
      if (i < m.keys.length && yield_!(m.keys[i]!)) {
        iterate(i + 1);
      }
    };
    iterate(0);
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Values","kind":"method","status":"implemented","sigHash":"79aea6029cccc0c3ea1b8ea47fbf4b499ada3c4b04d1cad7d0d923e9c30116b7"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Values() iter.Seq[V] {
 * 	return func(yield func(V) bool) {
 * 		if m == nil {
 * 			return
 * 		}
 * 
 * 		// We use a for loop here to ensure we enumerate new items added during iteration.
 * 		//nolint:intrange
 * 		for i := 0; i < len(m.keys); i++ {
 * 			if !yield(m.mp[m.keys[i]]) {
 * 				break
 * 			}
 * 		}
 * 	}
 * }
 */
export function OrderedMap_Values<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>): Seq<V> {
  const m = receiver;
  return (yield_: GoFunc<(value: V) => bool>): void => {
    if (m === undefined) {
      return;
    }

    // We use a for loop here to ensure we enumerate new items added during iteration.
    const iterate = (i: number): void => {
      if (i < m.keys.length && yield_!(m.mp.get(m.keys[i]!) as V)) {
        iterate(i + 1);
      }
    };
    iterate(0);
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Entries","kind":"method","status":"implemented","sigHash":"63f3b193ae76adbda2f7c64a88029be982a7dc033e3d709d95698bc5c4eabdfd"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Entries() iter.Seq2[K, V] {
 * 	return func(yield func(K, V) bool) {
 * 		if m == nil {
 * 			return
 * 		}
 * 
 * 		// We use a for loop here to ensure we enumerate new items added during iteration.
 * 		//nolint:intrange
 * 		for i := 0; i < len(m.keys); i++ {
 * 			key := m.keys[i]
 * 			if !yield(key, m.mp[key]) {
 * 				break
 * 			}
 * 		}
 * 	}
 * }
 */
export function OrderedMap_Entries<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>): Seq2<K, V> {
  const m = receiver;
  return (yield_: GoFunc<(key: K, value: V) => bool>): void => {
    if (m === undefined) {
      return;
    }

    // We use a for loop here to ensure we enumerate new items added during iteration.
    const iterate = (i: number): void => {
      if (i < m.keys.length) {
        const key = m.keys[i]!;
        if (yield_!(key, m.mp.get(key) as V)) {
          iterate(i + 1);
        }
      }
    };
    iterate(0);
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Clear","kind":"method","status":"implemented","sigHash":"356a6321188af5923f1f0b98b5f24374543403611f5e501e19d9d8d6a42eb399"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Clear() {
 * 	clear(m.keys)
 * 	m.keys = m.keys[:0]
 * 	clear(m.mp)
 * }
 */
export function OrderedMap_Clear<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>): void {
  const m = receiver!;
  m.keys.length = 0;
  m.keys = m.keys.slice(0, 0);
  m.mp.clear();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Size","kind":"method","status":"implemented","sigHash":"5baa53aabe86bcf03656ca021bef5e1282802e56efb4d6355c0db23db08476e6"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Size() int {
 * 	if m == nil {
 * 		return 0
 * 	}
 * 
 * 	return len(m.keys)
 * }
 */
export function OrderedMap_Size<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>): int {
  const m = receiver;
  if (m === undefined) {
    return 0 as int;
  }

  return m.keys.length as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Clone","kind":"method","status":"implemented","sigHash":"79a6223338a87d9a81747f660d6a7ac8f185eb06a918681e1a8038e56b1c61be"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-map cloning forwards the exact static Go map-key descriptor to result allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) Clone() *OrderedMap[K, V] {
 * 	if m == nil {
 * 		return nil
 * 	}
 * 
 * 	m2 := m.clone()
 * 	return &m2
 * }
 */
export function OrderedMap_Clone<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): GoPtr<OrderedMap<K, V>> {
  const m = receiver;
  if (m === undefined) {
    return undefined;
  }

  const m2 = OrderedMap_clone(m, keyDescriptor);
  return m2;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.clone","kind":"method","status":"implemented","sigHash":"48c31116827c5700de38de8064c82ec3e972387addbfc7f9d82e4c8c9ff1c6a5"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-map clone allocation receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) clone() OrderedMap[K, V] {
 * 	return OrderedMap[K, V]{
 * 		keys: slices.Clone(m.keys),
 * 		mp:   maps.Clone(m.mp),
 * 	}
 * }
 */
export function OrderedMap_clone<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): OrderedMap<K, V> {
  const m = receiver!;
  return {
    __tsgoBlank0: {},
    keys: slices.Clone(m.keys)!,
    mp: maps.Clone(m.mp, keyDescriptor),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ json.MarshalerTo = (*OrderedMap[string, string])(nil)
 */
export let __83877ae8_0: GoInterface<MarshalerTo> = OrderedMap_as_json_MarshalerTo<string, string>(undefined);

export function OrderedMap_as_json_MarshalerTo<K, V>(receiver: GoPtr<OrderedMap<K, V>>): MarshalerTo {
  return {
    MarshalJSONTo: (encoder: Encoder): GoError => OrderedMap_MarshalJSONTo(receiver, encoder),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.MarshalJSONTo","kind":"method","status":"implemented","sigHash":"c276ee5f48fdfa57fdc9849d191b2334e25048b2cb68a37a9096425c013cb0dc"}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) MarshalJSONTo(enc *json.Encoder) error {
 * 	if err := enc.WriteToken(json.BeginObject); err != nil {
 * 		return err
 * 	}
 * 
 * 	for _, k := range m.keys {
 * 		// TODO: is this needed? Can we just MarshalEncode k directly?
 * 		keyString, err := resolveKeyName(reflect.ValueOf(k))
 * 		if err != nil {
 * 			return err
 * 		}
 * 
 * 		if err := json.MarshalEncode(enc, keyString); err != nil {
 * 			return err
 * 		}
 * 
 * 		if err := json.MarshalEncode(enc, m.mp[k]); err != nil {
 * 			return err
 * 		}
 * 	}
 * 
 * 	return enc.WriteToken(json.EndObject)
 * }
 */
export function OrderedMap_MarshalJSONTo<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, enc: GoPtr<Encoder>): GoError {
  if (enc === undefined) {
    return new globalThis.Error("nil json encoder");
  }
  const m = receiver!;
  let err = enc.WriteToken(json_BeginObject);
  if (err !== undefined) {
    return err;
  }
  for (const k of m.keys) {
    const [keyString, keyErr] = resolveKeyName(reflect_ValueOf(k));
    if (keyErr !== undefined) {
      return keyErr;
    }
    err = json_MarshalEncode(enc, keyString);
    if (err !== undefined) {
      return err;
    }
    err = json_MarshalEncode(enc, m.mp.get(k));
    if (err !== undefined) {
      return err;
    }
  }
  return enc.WriteToken(json_EndObject);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::resolveKeyName","kind":"func","status":"implemented","sigHash":"9c1bfb11e5032437d999dacf40d5012bb8d493d331cb620a6e34b27ff5d3732e"}
 *
 * Go source:
 * func resolveKeyName(k reflect.Value) (string, error) {
 * 	if k.Kind() == reflect.String {
 * 		return k.String(), nil
 * 	}
 * 	if tm, ok := reflect.TypeAssert[encoding.TextMarshaler](k); ok {
 * 		if k.Kind() == reflect.Pointer && k.IsNil() {
 * 			return "", nil
 * 		}
 * 		buf, err := tm.MarshalText()
 * 		return string(buf), err
 * 	}
 * 	switch k.Kind() {
 * 	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
 * 		return strconv.FormatInt(k.Int(), 10), nil
 * 	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
 * 		return strconv.FormatUint(k.Uint(), 10), nil
 * 	}
 * 	panic("unexpected map key type")
 * }
 */
export function resolveKeyName(k: Value): [string, GoError] {
  if (k.Kind() === reflect_String) {
    return [k.String(), undefined];
  }
  // reflect.TypeAssert[encoding.TextMarshaler] is not available in TS port - skip
  const kind = k.Kind();
  if (kind === reflect_Int || kind === reflect_Int8 || kind === reflect_Int16 || kind === reflect_Int32 || kind === reflect_Int64) {
    return [strconv.FormatInt(k.Int(), 10), undefined];
  }
  if (kind === reflect_Uint || kind === reflect_Uint8 || kind === reflect_Uint16 || kind === reflect_Uint32 || kind === reflect_Uint64 || kind === reflect_Uintptr) {
    return [strconv.FormatUint(k.Uint(), 10), undefined];
  }
  throw new globalThis.Error("unexpected map key type");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::varGroup::_::#2","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ json.UnmarshalerFrom = (*OrderedMap[string, string])(nil)
 */
export let ___2_ffc9f882_0: GoInterface<UnmarshalerFrom> = OrderedMap_as_json_UnmarshalerFrom<string, string>(undefined, GoStringKey);

export function OrderedMap_as_json_UnmarshalerFrom<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): UnmarshalerFrom {
  return {
    UnmarshalJSONFrom: (decoder: Decoder): GoError => OrderedMap_UnmarshalJSONFrom(receiver, decoder, keyDescriptor),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.UnmarshalJSONFrom","kind":"method","status":"implemented","sigHash":"a7144f1a9e8365998959b2007618110405c3631c153fe92dbfe6516a80ef469d"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Generic JSON insertion forwards the exact static Go map-key descriptor to the ordered map's possible allocation path.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (m *OrderedMap[K, V]) UnmarshalJSONFrom(dec *json.Decoder) error {
 * 	token, err := dec.ReadToken()
 * 	if err != nil {
 * 		return err
 * 	}
 * 	if token.Kind() == 'n' { // json.Null.Kind()
 * 		// By convention, to approximate the behavior of Unmarshal itself,
 * 		// Unmarshalers implement UnmarshalJSON([]byte("null")) as a no-op.
 * 		// https://pkg.go.dev/encoding/json#Unmarshaler
 * 		// TODO: reconsider
 * 		return nil
 * 	}
 * 	if token.Kind() != '{' { // json.ObjectStart.Kind()
 * 		return errors.New("cannot unmarshal non-object JSON value into Map")
 * 	}
 * 	for dec.PeekKind() != '}' { // json.ObjectEnd.Kind()
 * 		var key K
 * 		var value V
 * 		if err := json.UnmarshalDecode(dec, &key); err != nil {
 * 			return err
 * 		}
 * 		if err := json.UnmarshalDecode(dec, &value); err != nil {
 * 			return err
 * 		}
 * 		m.Set(key, value)
 * 	}
 * 	if _, err := dec.ReadToken(); err != nil {
 * 		return err
 * 	}
 * 	return nil
 * }
 */
export function OrderedMap_UnmarshalJSONFrom<K extends GoComparable, V>(receiver: GoPtr<OrderedMap<K, V>>, dec: GoPtr<Decoder>, keyDescriptor: GoMapKeyDescriptor<K>): GoError {
  if (dec === undefined) {
    return new globalThis.Error("nil json decoder");
  }
  const [value, err] = dec.ReadValue();
  if (err !== undefined) {
    return err;
  }
  if (value === null) {
    return undefined;
  }
  if (value instanceof globalThis.Map) {
    for (const [key, element] of value.entries()) {
      OrderedMap_Set(receiver, key as K, element as V, keyDescriptor);
    }
    return undefined;
  }
  if (typeof value !== "object" || value === undefined || globalThis.Array.isArray(value)) {
    return new globalThis.Error("cannot unmarshal non-object JSON value into Map");
  }
  for (const [key, element] of globalThis.Object.entries(value as Record<string, unknown>)) {
    OrderedMap_Set(receiver, key as K, element as V, keyDescriptor);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::DiffOrderedMaps","kind":"func","status":"implemented","sigHash":"14c021339a1b5bdbeb90d48187aa8a40b6dedb2a4300745dedb85b1408bc4b2f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased value type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equalValues","typeParameter":"V"}]}
 *
 * Go source:
 * func DiffOrderedMaps[K comparable, V comparable](m1 *OrderedMap[K, V], m2 *OrderedMap[K, V], onAdded func(key K, value V), onRemoved func(key K, value V), onModified func(key K, oldValue V, newValue V)) {
 * 	DiffOrderedMapsFunc(m1, m2, func(a, b V) bool {
 * 		return a == b
 * 	}, onAdded, onRemoved, onModified)
 * }
 */
export function DiffOrderedMaps<K extends GoComparable, V extends GoComparable>(m1: GoPtr<OrderedMap<K, V>>, m2: GoPtr<OrderedMap<K, V>>, onAdded: GoFunc<(key: K, value: V) => void>, onRemoved: GoFunc<(key: K, value: V) => void>, onModified: GoFunc<(key: K, oldValue: V, newValue: V) => void>, equalValues: GoEquality<V>): void {
  DiffOrderedMapsFunc(m1, m2, equalValues, onAdded, onRemoved, onModified);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::func::DiffOrderedMapsFunc","kind":"func","status":"implemented","sigHash":"d8c71173cb1eff544c8b4145c0b7194d45f42cd1e5b519d2041a8f9e27ceaaf7"}
 *
 * Go source:
 * func DiffOrderedMapsFunc[K comparable, V any](m1 *OrderedMap[K, V], m2 *OrderedMap[K, V], equalValues func(a, b V) bool, onAdded func(key K, value V), onRemoved func(key K, value V), onModified func(key K, oldValue V, newValue V)) {
 * 	for k, v2 := range m2.Entries() {
 * 		if _, ok := m1.Get(k); !ok {
 * 			onAdded(k, v2)
 * 		}
 * 	}
 * 	for k, v1 := range m1.Entries() {
 * 		if v2, ok := m2.Get(k); ok {
 * 			if !equalValues(v1, v2) {
 * 				onModified(k, v1, v2)
 * 			}
 * 		} else {
 * 			onRemoved(k, v1)
 * 		}
 * 	}
 * }
 */
export function DiffOrderedMapsFunc<K extends GoComparable, V>(m1: GoPtr<OrderedMap<K, V>>, m2: GoPtr<OrderedMap<K, V>>, equalValues: GoFunc<(a: V, b: V) => bool>, onAdded: GoFunc<(key: K, value: V) => void>, onRemoved: GoFunc<(key: K, value: V) => void>, onModified: GoFunc<(key: K, oldValue: V, newValue: V) => void>): void {
  OrderedMap_Entries(m2)!((k: K, v2: V): bool => {
    const ok = m1!.mp.has(k);
    if (!ok) {
      onAdded!(k, v2);
    }
    return true;
  });
  OrderedMap_Entries(m1)!((k: K, v1: V): bool => {
    const ok = m2!.mp.has(k);
    const v2 = m2!.mp.get(k)!;
    if (ok) {
      if (!equalValues!(v1, v2)) {
        onModified!(k, v1, v2);
      }
    } else {
      onRemoved!(k, v1);
    }
    return true;
  });
}
