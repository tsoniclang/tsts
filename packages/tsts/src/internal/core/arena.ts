import type { int } from "../../go/scalars.js";
import { GoNilSlice, GoSliceElementRef, GoSliceIsNil } from "../../go/compat.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";

import type { GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::type::Arena","kind":"type","status":"implemented","sigHash":"866dd69ab11aaa9aeee1c0e91b8a7af12f59ff5857f9a4e17d1779c0c3f973c2"}
 *
 * Go source:
 * Arena[T any] struct {
 * 	data []T
 * }
 */
export interface Arena<T = unknown> {
  data: GoSlice<T>;
}

function ensureArena<T>(receiver: GoPtr<Arena<T>>): Arena<T> {
  return receiver!;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.New","kind":"method","status":"implemented","sigHash":"7f61e2bb57de57610e5585534f7544ee42ef4fef68509f3a42c767cf9152e756"}
 *
 * Go source:
 * func (a *Arena[T]) New() *T {
 * 	if len(a.data) == cap(a.data) {
 * 		nextSize := nextArenaSize(len(a.data))
 * 		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
 * 		a.data = slices.Grow[[]T](nil, nextSize)
 * 	}
 * 	index := len(a.data)
 * 	a.data = a.data[:index+1]
 * 	return &a.data[index]
 * }
 */
export function Arena_New<T>(receiver: GoPtr<Arena<T>>): GoRef<T> {
  const arena = ensureArena(receiver);
  if (GoSliceIsNil(arena.data)) {
    arena.data = [];
  }
  const index = arena.data.length as int;
  arena.data.push({} as T);
  return GoSliceElementRef(arena.data, index);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.NewSlice","kind":"method","status":"implemented","sigHash":"e6e68464be11603146e0ba334fce4d5628033c5389e68c2032220be0b3bef2c3"}
 *
 * Go source:
 * func (a *Arena[T]) NewSlice(size int) []T {
 * 	if size == 0 {
 * 		return nil
 * 	}
 * 	if len(a.data)+size > cap(a.data) {
 * 		nextSize := nextArenaSize(len(a.data))
 * 		if size > nextSize {
 * 			return make([]T, size)
 * 		}
 * 		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
 * 		a.data = slices.Grow[[]T](nil, nextSize)
 * 	}
 * 	newLen := len(a.data) + size
 * 	slice := a.data[len(a.data):newLen:newLen]
 * 	a.data = a.data[:newLen]
 * 	return slice
 * }
 */
export function Arena_NewSlice<T>(receiver: GoPtr<Arena<T>>, size: int): GoSlice<T> {
  if (size === 0) {
    return GoNilSlice();
  }
  ensureArena(receiver);
  return new globalThis.Array<T>(size as number);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.NewSlice1","kind":"method","status":"implemented","sigHash":"4992a47dcf040851aaf48bfd2287241d7af83d638266ca8a84a954dfd0c34ea8"}
 *
 * Go source:
 * func (a *Arena[T]) NewSlice1(t T) []T {
 * 	slice := a.NewSlice(1)
 * 	slice[0] = t
 * 	return slice
 * }
 */
export function Arena_NewSlice1<T>(receiver: GoPtr<Arena<T>>, t: T): GoSlice<T> {
  const slice = Arena_NewSlice(receiver, 1 as int);
  slice[0] = t;
  return slice;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.Clone","kind":"method","status":"implemented","sigHash":"27f28fb80bfb60096650cf2a896227f2837f1d4e0e6bda9450442ee99972cd6c"}
 *
 * Go source:
 * func (a *Arena[T]) Clone(t []T) []T {
 * 	if len(t) == 0 {
 * 		return nil
 * 	}
 * 	slice := a.NewSlice(len(t))
 * 	copy(slice, t)
 * 	return slice
 * }
 */
export function Arena_Clone<T>(receiver: GoPtr<Arena<T>>, t: GoSlice<T>): GoSlice<T> {
  if (t.length === 0) {
    return GoNilSlice();
  }
  ensureArena(receiver);
  return t.slice();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/arena.go::func::nextArenaSize","kind":"func","status":"implemented","sigHash":"145aabd29c835d4b980e31052effdb814889c81c01833bae2f7ebe1098daa5a9"}
 *
 * Go source:
 * func nextArenaSize(size int) int {
 * 	// This compiles down branch-free.
 * 	size = max(size, 1)
 * 	size = min(size*2, 256)
 * 	return size
 * }
 */
export function nextArenaSize(size: int): int {
  const s1 = globalThis.Math.max(size as number, 1) as int;
  return globalThis.Math.min((s1 as number) * 2, 256) as int;
}
