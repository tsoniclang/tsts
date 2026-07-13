import type { bool, int } from "../../go/scalars.js";
import type { GoComparable, GoPtr, GoSeq, GoSlice } from "../../go/compat.js";
import type { SyncMap } from "./syncmap.js";
import { SyncMap_Delete, SyncMap_Load, SyncMap_LoadOrStore, SyncMap_Range } from "./syncmap.js";

import type { GoFunc } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::type::SyncSet","kind":"type","status":"implemented","sigHash":"570927ea2bf0e4da3a3ad7fdaadd4bd3b7b32ccbc5b750adb2dd0d43ce00e151"}
 *
 * Go source:
 * SyncSet[T comparable] struct {
 * 	m SyncMap[T, struct{}]
 * }
 */
export interface SyncSet<T extends GoComparable = unknown> {
  m: SyncMap<T, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Has","kind":"method","status":"implemented","sigHash":"bda102f39a3640ceaf05f8aa32bb85c92ab9913ffd0914ca831c6bc00f2ca693"}
 *
 * Go source:
 * func (s *SyncSet[T]) Has(key T) bool {
 * 	_, ok := s.m.Load(key)
 * 	return ok
 * }
 */
export function SyncSet_Has<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>, key: T): bool {
  const [, ok] = SyncMap_Load(receiver!.m, key);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Add","kind":"method","status":"implemented","sigHash":"17f2afbd26952225a4933765a22786cf85da3de557aa0e4effac67331f0fb0f7"}
 *
 * Go source:
 * func (s *SyncSet[T]) Add(key T) {
 * 	s.AddIfAbsent(key)
 * }
 */
export function SyncSet_Add<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>, key: T): void {
  SyncSet_AddIfAbsent(receiver, key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.AddIfAbsent","kind":"method","status":"implemented","sigHash":"bb712274c5a0ac98bda050eecb8986c92464f878ee34bb7ca5c95040b0a1a1f4"}
 *
 * Go source:
 * func (s *SyncSet[T]) AddIfAbsent(key T) bool {
 * 	_, loaded := s.m.LoadOrStore(key, struct{}{})
 * 	return !loaded
 * }
 */
export function SyncSet_AddIfAbsent<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>, key: T): bool {
  const [, loaded] = SyncMap_LoadOrStore(receiver!.m, key, {});
  return !loaded;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Delete","kind":"method","status":"implemented","sigHash":"0ba5a3353c582a1a670608fa549418d2bb31ec8fd3c886a1a4e72b77a65450db"}
 *
 * Go source:
 * func (s *SyncSet[T]) Delete(key T) {
 * 	s.m.Delete(key)
 * }
 */
export function SyncSet_Delete<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>, key: T): void {
  SyncMap_Delete(receiver!.m, key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Range","kind":"method","status":"implemented","sigHash":"c9ffe2a2be8783687ef174652bf53f406b7cde65508c366a2b2fe704bd05ad68"}
 *
 * Go source:
 * func (s *SyncSet[T]) Range(fn func(key T) bool) {
 * 	s.m.Range(func(key T, value struct{}) bool {
 * 		return fn(key)
 * 	})
 * }
 */
export function SyncSet_Range<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>, fn: GoFunc<(key: T) => bool>): void {
  SyncMap_Range(receiver!.m, (key: T, _value: { readonly __tsgoEmpty?: never }): bool => {
    return fn!(key);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Size","kind":"method","status":"implemented","sigHash":"1dd97f7397ceec060d9f095862765d569473855c18b14f26007b992f4abc89a6"}
 *
 * Go source:
 * func (s *SyncSet[T]) Size() int {
 * 	count := 0
 * 	s.m.Range(func(_ T, _ struct{}) bool {
 * 		count++
 * 		return true
 * 	})
 * 	return count
 * }
 */
export function SyncSet_Size<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>): int {
  const keys: T[] = [];
  SyncMap_Range(receiver!.m, (key: T, _value: { readonly __tsgoEmpty?: never }): bool => {
    keys.push(key);
    return true;
  });
  return keys.length as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.IsEmpty","kind":"method","status":"implemented","sigHash":"f6831d7dcf2b8e4cbfd13799246fa7f4708b9c74d51b2b515308fc05e3fb1a4c"}
 *
 * Go source:
 * func (s *SyncSet[T]) IsEmpty() bool {
 * 	empty := true
 * 	s.m.Range(func(_ T, _ struct{}) bool {
 * 		empty = false
 * 		return false
 * 	})
 * 
 * 	return empty
 * }
 */
export function SyncSet_IsEmpty<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>): bool {
  return SyncSet_Size(receiver) === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.ToSlice","kind":"method","status":"implemented","sigHash":"95240efbe0e99cd342b5207fb7d850b032d4a6b5b142fc742ab56451a7805b83"}
 *
 * Go source:
 * func (s *SyncSet[T]) ToSlice() []T {
 * 	var arr []T
 * 	arr = make([]T, 0, s.m.Size())
 * 	s.m.Range(func(key T, value struct{}) bool {
 * 		arr = append(arr, key)
 * 		return true
 * 	})
 * 	return arr
 * }
 */
export function SyncSet_ToSlice<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>): GoSlice<T> {
  const arr: GoSlice<T> = [];
  SyncMap_Range(receiver!.m, (key: T, _value: { readonly __tsgoEmpty?: never }): bool => {
    arr.push(key);
    return true;
  });
  return arr;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/syncset.go::method::SyncSet.Keys","kind":"method","status":"implemented","sigHash":"b069d6abff87cf29e964fd68e251ba7f99107b29f09a0c4e0aba17289c162bc3"}
 *
 * Go source:
 * func (s *SyncSet[T]) Keys() iter.Seq[T] {
 * 	return func(yield func(T) bool) {
 * 		s.m.Range(func(key T, value struct{}) bool {
 * 			if !yield(key) {
 * 				return false
 * 			}
 * 			return true
 * 		})
 * 	}
 * }
 */
export function SyncSet_Keys<T extends GoComparable>(receiver: GoPtr<SyncSet<T>>): GoSeq<T> {
  return (yield_: (value: T) => bool): void => {
    SyncMap_Range(receiver!.m, (key: T, _value: { readonly __tsgoEmpty?: never }): bool => {
      if (!yield_(key)) {
        return false;
      }
      return true;
    });
  };
}
