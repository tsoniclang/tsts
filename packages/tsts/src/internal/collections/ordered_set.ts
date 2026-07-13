import type { bool, int } from "../../go/scalars.js";
import type { Seq } from "../../go/iter.js";
import { GoZeroEmptyStruct, type GoComparable, type GoEquality, type GoMapKeyDescriptor, type GoPtr } from "../../go/compat.js";
import type { OrderedMap } from "./ordered_map.js";
import {
  newMapWithSizeHint,
  OrderedMap_clone,
  OrderedMap_Clear,
  OrderedMap_Delete,
  OrderedMap_Has,
  OrderedMap_Keys,
  OrderedMap_Set,
  OrderedMap_Size,
} from "./ordered_map.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::type::OrderedSet","kind":"type","status":"implemented","sigHash":"9617dd085ebe37ef90f0e45fe13271567b43b253466b697708813d109638d735"}
 *
 * Go source:
 * OrderedSet[T comparable] struct {
 * 	m OrderedMap[T, struct{}]
 * }
 */
export interface OrderedSet<T extends GoComparable = unknown> {
  m: OrderedMap<T, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::func::NewOrderedSetWithSizeHint","kind":"func","status":"implemented","sigHash":"2bd650c681d534d4023474281ecd97208315c6b1f2ec9d49ff10a359d6391c29"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-set construction forwards the exact static Go map-key descriptor to its backing ordered-map allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"T"}]}
 *
 * Go source:
 * func NewOrderedSetWithSizeHint[T comparable](hint int) *OrderedSet[T] {
 * 	return &OrderedSet[T]{
 * 		m: newMapWithSizeHint[T, struct{}](hint),
 * 	}
 * }
 */
export function NewOrderedSetWithSizeHint<T extends GoComparable>(hint: int, keyDescriptor: GoMapKeyDescriptor<T>): GoPtr<OrderedSet<T>> {
  return {
    m: newMapWithSizeHint<T, { readonly __tsgoEmpty?: never }>(hint, keyDescriptor),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Add","kind":"method","status":"implemented","sigHash":"8e67ec1a0fffb976220a62deae1a24995548cba5fd22f26d594253e6fb1f44d2"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-set insertion forwards the exact static Go map-key descriptor to its backing ordered map's possible allocation path.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"T"}]}
 *
 * Go source:
 * func (s *OrderedSet[T]) Add(value T) {
 * 	s.m.Set(value, struct{}{})
 * }
 */
export function OrderedSet_Add<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>, value: T, keyDescriptor: GoMapKeyDescriptor<T>): void {
  const s = receiver!;
  OrderedMap_Set(s.m, value, {}, keyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Has","kind":"method","status":"implemented","sigHash":"fc726e0ab3de530cff8fc45de9db94dd5de759570f2d953762ab20425aaa0c67"}
 *
 * Go source:
 * func (s *OrderedSet[T]) Has(value T) bool {
 * 	return s.m.Has(value)
 * }
 */
export function OrderedSet_Has<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>, value: T): bool {
  const s = receiver!;
  return OrderedMap_Has(s.m, value);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Delete","kind":"method","status":"implemented","sigHash":"1de758c0c30fa12a3f098df86d3f59ea146c62abf15029cc975efe870591ed42"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The generic ordered-set deletion forwards the exact static equality operation for its erased key type.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func (s *OrderedSet[T]) Delete(value T) bool {
 * 	_, ok := s.m.Delete(value)
 * 	return ok
 * }
 */
export function OrderedSet_Delete<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>, value: T, equal: GoEquality<T>): bool {
  const s = receiver!;
  const [, ok] = OrderedMap_Delete(s.m, value, GoZeroEmptyStruct, equal);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Values","kind":"method","status":"implemented","sigHash":"108393af0665cf90629b8441fb4c1764f3691ff1c3db2b1599b4d87157b29991"}
 *
 * Go source:
 * func (s *OrderedSet[T]) Values() iter.Seq[T] {
 * 	return s.m.Keys()
 * }
 */
export function OrderedSet_Values<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>): Seq<T> {
  const s = receiver!;
  return OrderedMap_Keys(s.m);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Clear","kind":"method","status":"implemented","sigHash":"f4d302272583e3d741a18e6551910ad9cabfb2ce5da6ccc26995e45add84a66c"}
 *
 * Go source:
 * func (s *OrderedSet[T]) Clear() {
 * 	s.m.Clear()
 * }
 */
export function OrderedSet_Clear<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>): void {
  const s = receiver!;
  OrderedMap_Clear(s.m);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Size","kind":"method","status":"implemented","sigHash":"6943604c4066668ad4826edc3d8535bafae7ae5d201a1cd8919c63dceef3e31d"}
 *
 * Go source:
 * func (s *OrderedSet[T]) Size() int {
 * 	return s.m.Size()
 * }
 */
export function OrderedSet_Size<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>): int {
  const s = receiver!;
  return OrderedMap_Size(s.m);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Clone","kind":"method","status":"implemented","sigHash":"848e18191b0e69ad1571be58d996bac53dbb50dfb8f38f6ee98b97dcc556f37b"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic ordered-set cloning forwards the exact static Go map-key descriptor to backing-map allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"T"}]}
 *
 * Go source:
 * func (s *OrderedSet[T]) Clone() *OrderedSet[T] {
 * 	return &OrderedSet[T]{
 * 		m: s.m.clone(),
 * 	}
 * }
 */
export function OrderedSet_Clone<T extends GoComparable>(receiver: GoPtr<OrderedSet<T>>, keyDescriptor: GoMapKeyDescriptor<T>): GoPtr<OrderedSet<T>> {
  const s = receiver!;
  return {
    m: OrderedMap_clone(s.m, keyDescriptor),
  };
}
