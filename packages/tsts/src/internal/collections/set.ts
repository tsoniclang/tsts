import type { bool, int } from "../../go/scalars.js";
import type { GoComparable, GoMap, GoPtr } from "../../go/compat.js";
import { GoEqualEmptyStruct, GoMapIsNil, GoNilMap } from "../../go/compat.js";
import * as maps from "../../go/maps.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::type::Set","kind":"type","status":"implemented","sigHash":"b78751182a173542a2fc40a2d7a06459ad2b7539fa753c39278377d1cbed21b3"}
 *
 * Go source:
 * Set[T comparable] struct {
 * 	M map[T]struct{}
 * }
 */
export interface Set<T extends GoComparable = unknown> {
  M: GoMap<T, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::func::NewSetWithSizeHint","kind":"func","status":"implemented","sigHash":"c15b107ff0d15d004f5b4a1f19dc8b9f9dea9715bd6974fed8bcb970f7af301b"}
 *
 * Go source:
 * func NewSetWithSizeHint[T comparable](hint int) *Set[T] {
 * 	return &Set[T]{
 * 		M: make(map[T]struct{}, hint),
 * 	}
 * }
 */
export function NewSetWithSizeHint<T extends GoComparable>(hint: int): GoPtr<Set<T>> {
  return {
    M: new globalThis.Map<T, { readonly __tsgoEmpty?: never }>(),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Has","kind":"method","status":"implemented","sigHash":"41a83d731845f8936f6709921306bed1270a8a52005eae6745c7f83487fea2d7"}
 *
 * Go source:
 * func (s *Set[T]) Has(key T) bool {
 * 	if s == nil {
 * 		return false
 * 	}
 * 	_, ok := s.M[key]
 * 	return ok
 * }
 */
export function Set_Has<T extends GoComparable>(receiver: GoPtr<Set<T>>, key: T): bool {
  if (receiver === undefined) {
    return false;
  }
  const ok = receiver.M.has(key);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Add","kind":"method","status":"implemented","sigHash":"944adc575acc7b5f8af5bf75a041f737d6dabcfaf85f4e51a96184b39d0a2e7e"}
 *
 * Go source:
 * func (s *Set[T]) Add(key T) {
 * 	if s.M == nil {
 * 		s.M = make(map[T]struct{})
 * 	}
 * 	s.M[key] = struct{}{}
 * }
 */
export function Set_Add<T extends GoComparable>(receiver: GoPtr<Set<T>>, key: T): void {
  if (GoMapIsNil(receiver!.M)) {
    receiver!.M = new globalThis.Map<T, { readonly __tsgoEmpty?: never }>();
  }
  receiver!.M.set(key, {});
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Delete","kind":"method","status":"implemented","sigHash":"508bfd49ee39124ae955b60128f548248df98e623af72276f02caf8590b6fb1c"}
 *
 * Go source:
 * func (s *Set[T]) Delete(key T) {
 * 	delete(s.M, key)
 * }
 */
export function Set_Delete<T extends GoComparable>(receiver: GoPtr<Set<T>>, key: T): void {
  receiver!.M.delete(key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Len","kind":"method","status":"implemented","sigHash":"a3d02b954a3882a53d982fa75920c99fa17bcf34c6e1ff79ed2e76f55fa21ac0"}
 *
 * Go source:
 * func (s *Set[T]) Len() int {
 * 	if s == nil {
 * 		return 0
 * 	}
 * 	return len(s.M)
 * }
 */
export function Set_Len<T extends GoComparable>(receiver: GoPtr<Set<T>>): int {
  if (receiver === undefined) {
    return 0;
  }
  return receiver.M.size;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Keys","kind":"method","status":"implemented","sigHash":"830e54f2b773e473d934914bccf5d69905924ba29447a256b1f6a8865bb8ea82"}
 *
 * Go source:
 * func (s *Set[T]) Keys() map[T]struct{} {
 * 	if s == nil {
 * 		return nil
 * 	}
 * 	return s.M
 * }
 */
export function Set_Keys<T extends GoComparable>(receiver: GoPtr<Set<T>>): GoMap<T, { readonly __tsgoEmpty?: never }> {
  if (receiver === undefined) {
    return GoNilMap();
  }
  return receiver.M;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Clear","kind":"method","status":"implemented","sigHash":"53af17cb334dfb5438dedd38d2156b41db5b792169308924ec8fcc2afda24f6b"}
 *
 * Go source:
 * func (s *Set[T]) Clear() {
 * 	if s == nil {
 * 		return
 * 	}
 * 	clear(s.M)
 * }
 */
export function Set_Clear<T extends GoComparable>(receiver: GoPtr<Set<T>>): void {
  if (receiver === undefined) {
    return;
  }
  receiver.M.clear();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.AddIfAbsent","kind":"method","status":"implemented","sigHash":"6ac4332c884dc335a7c9c941b408b45593b6326496ef93cf3a83aa2b1167f8e3"}
 *
 * Go source:
 * func (s *Set[T]) AddIfAbsent(key T) bool {
 * 	if s.Has(key) {
 * 		return false
 * 	}
 * 	s.Add(key)
 * 	return true
 * }
 */
export function Set_AddIfAbsent<T extends GoComparable>(receiver: GoPtr<Set<T>>, key: T): bool {
  if (Set_Has(receiver, key)) {
    return false;
  }
  Set_Add(receiver, key);
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Clone","kind":"method","status":"implemented","sigHash":"6a973a74abeb3e1a19c0cbdf39b9a019d36e0e8a3b5e1531929b1eaa414708e0"}
 *
 * Go source:
 * func (s *Set[T]) Clone() *Set[T] {
 * 	if s == nil {
 * 		return nil
 * 	}
 * 	clone := &Set[T]{M: maps.Clone(s.M)}
 * 	return clone
 * }
 */
export function Set_Clone<T extends GoComparable>(receiver: GoPtr<Set<T>>): GoPtr<Set<T>> {
  if (receiver === undefined) {
    return undefined;
  }
  const clone: Set<T> = { M: maps.Clone(receiver.M) };
  return clone;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Union","kind":"method","status":"implemented","sigHash":"5f646c6f16fc7124120c65c4707699558f97d70bce2e29100856e783d150b921"}
 *
 * Go source:
 * func (s *Set[T]) Union(other *Set[T]) {
 * 	if s.Len() == 0 && other.Len() == 0 {
 * 		return
 * 	}
 * 	if s == nil {
 * 		panic("cannot modify nil Set")
 * 	}
 * 	if s.M == nil {
 * 		s.M = maps.Clone(other.M)
 * 		return
 * 	}
 * 	maps.Copy(s.M, other.M)
 * }
 */
export function Set_Union<T extends GoComparable>(receiver: GoPtr<Set<T>>, other: GoPtr<Set<T>>): void {
  if (Set_Len(receiver) === 0 && Set_Len(other) === 0) {
    return;
  }
  if (receiver === undefined) {
    throw new globalThis.Error("cannot modify nil Set");
  }
  if (GoMapIsNil(receiver.M)) {
    receiver.M = maps.Clone(other!.M);
    return;
  }
  maps.Copy(receiver.M, other!.M);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.UnionedWith","kind":"method","status":"implemented","sigHash":"3346c9538e36f0751bb74b5a16d55acfa2df3b9001e0df71a0995541db32a107"}
 *
 * Go source:
 * func (s *Set[T]) UnionedWith(other *Set[T]) *Set[T] {
 * 	if s == nil && other == nil {
 * 		return nil
 * 	}
 * 	result := s.Clone()
 * 	if other != nil {
 * 		if result == nil {
 * 			result = &Set[T]{}
 * 		}
 * 		if result.M == nil {
 * 			result.M = make(map[T]struct{}, len(other.M))
 * 		}
 * 		maps.Copy(result.M, other.M)
 * 	}
 * 	return result
 * }
 */
export function Set_UnionedWith<T extends GoComparable>(receiver: GoPtr<Set<T>>, other: GoPtr<Set<T>>): GoPtr<Set<T>> {
  if (receiver === undefined && other === undefined) {
    return undefined;
  }
  const cloned = Set_Clone(receiver);
  if (other === undefined) {
    return cloned;
  }
  const result = cloned !== undefined
    ? cloned
    : { M: GoNilMap<T, { readonly __tsgoEmpty?: never }>() };
  if (GoMapIsNil(result.M)) {
    result.M = new globalThis.Map<T, { readonly __tsgoEmpty?: never }>();
  }
  maps.Copy(result.M, other.M);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Equals","kind":"method","status":"implemented","sigHash":"92fe5df374f2820d05c508366d6b57b4f58724937588a5d8acb8c4249b9e68a0"}
 *
 * Go source:
 * func (s *Set[T]) Equals(other *Set[T]) bool {
 * 	if s == other {
 * 		return true
 * 	}
 * 	if s == nil || other == nil {
 * 		return false
 * 	}
 * 	return maps.Equal(s.M, other.M)
 * }
 */
export function Set_Equals<T extends GoComparable>(receiver: GoPtr<Set<T>>, other: GoPtr<Set<T>>): bool {
  if (receiver === other) {
    return true;
  }
  if (receiver === undefined || other === undefined) {
    return false;
  }
  return maps.Equal(receiver.M, other.M, GoEqualEmptyStruct);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.IsSubsetOf","kind":"method","status":"implemented","sigHash":"eab651b460efc81f7ebb52437a30118e2da070da8e37ea4fcc46c764fa2fce54"}
 *
 * Go source:
 * func (s *Set[T]) IsSubsetOf(other *Set[T]) bool {
 * 	if s == nil {
 * 		return true
 * 	}
 * 	for key := range s.M {
 * 		if !other.Has(key) {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function Set_IsSubsetOf<T extends GoComparable>(receiver: GoPtr<Set<T>>, other: GoPtr<Set<T>>): bool {
  if (receiver === undefined) {
    return true;
  }
  for (const key of receiver.M.keys()) {
    if (!Set_Has(other, key)) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::method::Set.Intersects","kind":"method","status":"implemented","sigHash":"87fa1076a93655052ada18d97885202d30da7129bd2c072448390a25baa43e8d"}
 *
 * Go source:
 * func (s *Set[T]) Intersects(other *Set[T]) bool {
 * 	if s == nil || other == nil {
 * 		return false
 * 	}
 * 	for key := range s.M {
 * 		if other.Has(key) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Set_Intersects<T extends GoComparable>(receiver: GoPtr<Set<T>>, other: GoPtr<Set<T>>): bool {
  if (receiver === undefined || other === undefined) {
    return false;
  }
  for (const key of receiver.M.keys()) {
    if (Set_Has(other, key)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/set.go::func::NewSetFromItems","kind":"func","status":"implemented","sigHash":"e9b35dd7a6df85934f276b3f036ab3ab9deb3e8153d651f2ec59ce5f489e0a97"}
 *
 * Go source:
 * func NewSetFromItems[T comparable](items ...T) *Set[T] {
 * 	s := &Set[T]{}
 * 	for _, item := range items {
 * 		s.Add(item)
 * 	}
 * 	return s
 * }
 */
export function NewSetFromItems<T extends GoComparable>(...items: Array<T>): GoPtr<Set<T>> {
  const s: Set<T> = { M: GoNilMap() };
  for (const item of items) {
    Set_Add(s, item);
  }
  return s;
}
