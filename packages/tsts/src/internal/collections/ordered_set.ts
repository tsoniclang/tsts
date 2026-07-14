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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::type::OrderedSet","kind":"type","status":"implemented","sigHash":"ecc0dcaf32a40a6042cce2e143e2338b7c2801ea3b2ad6e8e600b30247470776"}
 *
 * Go source:
 * OrderedSet[T comparable] struct {
 * 	m OrderedMap[T, struct{}]
 * }
 */
export interface OrderedSet<T extends GoComparable> {
  m: OrderedMap<T, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::func::NewOrderedSetWithSizeHint","kind":"func","status":"implemented","sigHash":"307322eaa1dc71ddc48d7781deadc7b6d82a1bb9458ea1727865156313d2a84d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Add","kind":"method","status":"implemented","sigHash":"b084b21a5baa943d636c02db5355564663a2de67a660d37c17f1985b58cfee1b"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Has","kind":"method","status":"implemented","sigHash":"21f130ba3ede50ffe0d2ac3069718b1edccf89804c3b6fcf72cd40094ebda00a"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Delete","kind":"method","status":"implemented","sigHash":"3ffebe18a07542894dc99eb619330a58cda437663153bd8a8c45babe9ab5d215"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Values","kind":"method","status":"implemented","sigHash":"e64f2c4b54012267fa2a1440f4e982b3bb37f64a29322ff3c3b62ec8f3366bab"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Clear","kind":"method","status":"implemented","sigHash":"784a231479d080da4e5b958285c589423d5742af927ebd25b74381c3c454db96"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Size","kind":"method","status":"implemented","sigHash":"9d84b7f21cc129b5e9613ee11d0e419456f6bb22e660250ddc9a903405f30ed6"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_set.go::method::OrderedSet.Clone","kind":"method","status":"implemented","sigHash":"6ff1461c2d3a89eedd4f2b7fa630f1b8785f7cb3a9a5542583d92cf562952ac1"}
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
