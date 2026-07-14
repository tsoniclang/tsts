import type { bool, byte, double, int } from "../../go/scalars.js";
import type { Seq, Seq2 } from "../../go/iter.js";
import type { GoComparable, GoConstraint, GoEquality, GoError, GoMap, GoMapKeyDescriptor, GoPtr, GoRune, GoSlice, GoZeroFactory } from "../../go/compat.js";
import { GoAppend, GoMapMake, GoNilSlice, GoSliceIsNil, GoSliceToZeroLength, GoZeroString } from "../../go/compat.js";
import { GoSlicePrefix } from "../../go/slice-runtime.js";
import { Assert } from "../debug/debug.js";
import { MarshalIndent } from "../json/json.js";
import { ExtensionCjs, ExtensionCts, ExtensionJs, ExtensionJson, ExtensionJsx, ExtensionMjs, ExtensionMts, ExtensionTs, ExtensionTsx, HasTSFileExtension, IsDeclarationFileName } from "../tspath/extension.js";
import { PathIsRelative } from "../tspath/path.js";
import * as maps from "../../go/maps.js";
import * as math from "../../go/math.js";
import * as slices from "../../go/slices.js";
import * as strings from "../../go/strings.js";
import { Pool } from "../../go/sync.js";
import { Getenv } from "../../go/os.js";
import { Atoi } from "../../go/strconv.js";
import { SetMaxStack } from "../../go/runtime/debug.js";
import * as sort from "../../go/sort.js";
import * as unicode from "../../go/unicode.js";
import * as utf8 from "../../go/unicode/utf8.js";
import type { CompilerOptions } from "./compileroptions.js";
import { ScriptKindJS, ScriptKindJSON, ScriptKindJSX, ScriptKindTS, ScriptKindTSX, ScriptKindUnknown } from "./scriptkind.js";
import type { ScriptKind } from "./scriptkind.js";
import type { TextPos } from "./text.js";
import { Tristate_IsTrue } from "./tristate.js";

import type { GoFunc, GoInterface, GoPointerConstraint, GoRef } from "../../go/compat.js";
import { GoNumberValueOps, GoRefValueOps, GoSliceBuild, GoSliceMake, GoSliceStore } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";
import { GoEmptySlice } from "../../go/compat.js";



// Go strings are immutable UTF-8 byte sequences; `len(s)` is a byte length and
// byte indexing `s[i]` and slicing `s[i:j]` operate on byte offsets. We mirror
// that contract by operating over the UTF-8 byte view and converting back to a
// JS string at the boundaries.
const utf8Decoder: TextDecoder = new globalThis.TextDecoder("utf-8");
const byteLen: (value: string) => int = utf8.StringByteLen;
const byteSliceFrom = (s: string, start: int): string => utf8.StringByteSlice(s, start);
// []rune(s): decode the string into Unicode code points (runes).
const stringToRunes = (s: string): GoSlice<GoRune> => {
  const runes: GoSlice<GoRune> = GoSliceMake(0, 0, GoNumberValueOps);
  for (const ch of s) {
    runes.push(ch.codePointAt(0)!);
  }
  return runes;
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ApplyDebugStackLimit","kind":"func","status":"implemented","sigHash":"e324219fcfed6b193cbbae4e48d23f39a4248205de2000c52f88be69b3325e82"}
 *
 * Go source:
 * func ApplyDebugStackLimit() {
 * 	v := os.Getenv("TS_GO_DEBUG_STACK_LIMIT") //nolint:forbidigo
 * 	if v == "" {
 * 		return
 * 	}
 * 	n, err := strconv.Atoi(v)
 * 	if err != nil || n <= 0 {
 * 		return
 * 	}
 * 	rtdebug.SetMaxStack(n)
 * }
 */
export function ApplyDebugStackLimit(): void {
  const v = Getenv("TS_GO_DEBUG_STACK_LIMIT");
  if (v === "") {
    return;
  }
  const [n, err] = Atoi(v);
  if (err !== undefined || n <= 0) {
    return;
  }
  SetMaxStack(n);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Filter","kind":"func","status":"implemented","sigHash":"c6f3794b23a576819ceb29c279308a1f44ca586c2ad73bca238043ddf5cc2be6"}
 *
 * Go source:
 * func Filter[T any](slice []T, f func(T) bool) []T {
 * 	for i, value := range slice {
 * 		if !f(value) {
 * 			result := slices.Clone(slice[:i])
 * 			for i++; i < len(slice); i++ {
 * 				value = slice[i]
 * 				if f(value) {
 * 					result = append(result, value)
 * 				}
 * 			}
 * 			return result
 * 		}
 * 	}
 * 	return slice
 * }
 */
export function Filter<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): GoSlice<T> {
  const values = slice ?? GoEmptySlice<T>();
  for (let i = 0; i < values.length; i++) {
    let value = values[i]!;
    if (!f!(value)) {
      let result = slices.Clone(values.slice(0, i))!;
      for (i++; i < values.length; i++) {
        value = values[i]!;
        if (f!(value)) {
          result = GoAppend(result, value);
        }
      }
      return result;
    }
  }
  return values;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FilterSeq","kind":"func","status":"implemented","sigHash":"f284bfa2470adcad948df44f98aa3dbfd8bb42a3d789acaa6666bd90463022b8"}
 *
 * Go source:
 * func FilterSeq[T any](slice []T, f func(T) bool) iter.Seq[T] {
 * 	return func(yield func(T) bool) {
 * 		for _, value := range slice {
 * 			if f(value) {
 * 				if !yield(value) {
 * 					return
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function FilterSeq<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): Seq<T> {
  return (yield_: GoFunc<(value: T) => bool>): void => {
    for (const value of slice ?? GoEmptySlice<T>()) {
      if (f!(value)) {
        if (!yield_!(value)) {
          return;
        }
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FilterIndex","kind":"func","status":"implemented","sigHash":"2c8591ea4e8c355d063b10ee051308e882d1ceb245c39684e589bbb5e41f0884"}
 *
 * Go source:
 * func FilterIndex[T any](slice []T, f func(T, int, []T) bool) []T {
 * 	for i, value := range slice {
 * 		if !f(value, i, slice) {
 * 			result := slices.Clone(slice[:i])
 * 			for i++; i < len(slice); i++ {
 * 				value = slice[i]
 * 				if f(value, i, slice) {
 * 					result = append(result, value)
 * 				}
 * 			}
 * 			return result
 * 		}
 * 	}
 * 	return slice
 * }
 */
export function FilterIndex<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T, arg1: int, arg2: GoSlice<T>) => bool>): GoSlice<T> {
  const values = slice ?? GoEmptySlice<T>();
  for (let i = 0; i < values.length; i++) {
    let value = values[i]!;
    if (!f!(value, i, values)) {
      let result = slices.Clone(values.slice(0, i))!;
      for (i++; i < values.length; i++) {
        value = values[i]!;
        if (f!(value, i, values)) {
          result = GoAppend(result, value);
        }
      }
      return result;
    }
  }
  return values;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Map","kind":"func","status":"implemented","sigHash":"b481cba2d02e22bc46592031a41ffef58bb0311b4540bb0439b367d2155ac334"}
 *
 * Go source:
 * func Map[T, U any](slice []T, f func(T) U) []U {
 * 	if slice == nil {
 * 		return nil
 * 	}
 * 	result := make([]U, len(slice))
 * 	for i, value := range slice {
 * 		result[i] = f(value)
 * 	}
 * 	return result
 * }
 */
export function Map<T, U>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => U>): GoSlice<U> {
  if (GoSliceIsNil(slice)) {
    return GoNilSlice<U>();
  }
  const result: GoSlice<U> = new globalThis.Array<U>(slice.length);
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    result[i] = f!(value);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::TryMap","kind":"func","status":"implemented","sigHash":"4d35f66c625f2a9a04aeed7da8b0050693f2f20abad7d28788e8823caf441b15"}
 *
 * Go source:
 * func TryMap[T, U any](slice []T, f func(T) (U, error)) ([]U, error) {
 * 	if len(slice) == 0 {
 * 		return nil, nil
 * 	}
 * 	result := make([]U, len(slice))
 * 	for i, value := range slice {
 * 		mapped, err := f(value)
 * 		if err != nil {
 * 			return nil, err
 * 		}
 * 		result[i] = mapped
 * 	}
 * 	return result, nil
 * }
 */
export function TryMap<T, U>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => [U, GoError]>): [GoSlice<U>, GoError] {
  if (slice.length === 0) {
    return [GoEmptySlice<U>(), undefined];
  }
  const result: GoSlice<U> = new globalThis.Array<U>(slice.length);
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    const [mapped, err] = f!(value);
    if (err !== undefined) {
      return [GoEmptySlice<U>(), err];
    }
    result[i] = mapped;
  }
  return [result, undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::MapIndex","kind":"func","status":"implemented","sigHash":"e6acc3ef251f206b42ddc60894d9453e356a234bbf8e63a361ed473767842b4d"}
 *
 * Go source:
 * func MapIndex[T, U any](slice []T, f func(T, int) U) []U {
 * 	if slice == nil {
 * 		return nil
 * 	}
 * 	result := make([]U, len(slice))
 * 	for i, value := range slice {
 * 		result[i] = f(value, i)
 * 	}
 * 	return result
 * }
 */
export function MapIndex<T, U>(slice: GoSlice<T>, f: GoFunc<(arg0: T, arg1: int) => U>): GoSlice<U> {
  if (GoSliceIsNil(slice)) {
    return GoNilSlice<U>();
  }
  const result: GoSlice<U> = new globalThis.Array<U>(slice.length);
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    result[i] = f!(value, i);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::MapNonNil","kind":"func","status":"implemented","sigHash":"38a745442a53036b38c2d0687c6b7436bddeeef191ba490264b170c3a1ba972c"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic zero comparison receives exact static zero-value and equality operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"U"},{"kind":"equality","parameter":"equal","typeParameter":"U"}]}
 *
 * Go source:
 * func MapNonNil[T any, U comparable](slice []T, f func(T) U) []U {
 * 	var result []U
 * 	for _, value := range slice {
 * 		mapped := f(value)
 * 		if mapped != *new(U) {
 * 			result = append(result, mapped)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function MapNonNil<T, U extends GoComparable>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => U>, zeroValue: GoZeroFactory<U>, equal: GoEquality<U>): GoSlice<U> {
  let result: GoSlice<U> = GoEmptySlice<U>();
  const zero = zeroValue();
  for (const value of slice) {
    const mapped = f!(value);
    if (!equal(mapped, zero)) {
      result = GoAppend(result, mapped);
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::MapFiltered","kind":"func","status":"implemented","sigHash":"9577337c7818014e5f3d56eaf9bd3e6b4773fe1aae3595315e4eb6ca8018cddb"}
 *
 * Go source:
 * func MapFiltered[T any, U any](slice []T, f func(T) (U, bool)) []U {
 * 	var result []U
 * 	for _, value := range slice {
 * 		mapped, ok := f(value)
 * 		if !ok {
 * 			continue
 * 		}
 * 		result = append(result, mapped)
 * 	}
 * 	return result
 * }
 */
export function MapFiltered<T, U>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => [U, bool]>): GoSlice<U> {
  let result: GoSlice<U> = GoEmptySlice<U>();
  for (const value of slice) {
    const [mapped, ok] = f!(value);
    if (!ok) {
      continue;
    }
    result = GoAppend(result, mapped);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FlatMap","kind":"func","status":"implemented","sigHash":"fa3e3b0cd454d8e8d7c20c069fb1a4d0e113cd32b1dbfce1b7c58dd86b143520"}
 *
 * Go source:
 * func FlatMap[T any, U any](slice []T, f func(T) []U) []U {
 * 	var result []U
 * 	for _, value := range slice {
 * 		mapped := f(value)
 * 		if len(mapped) != 0 {
 * 			result = append(result, mapped...)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function FlatMap<T, U>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => GoSlice<U>>): GoSlice<U> {
  let result: GoSlice<U> = GoEmptySlice<U>();
  for (const value of slice) {
    const mapped = f!(value);
    if (mapped.length !== 0) {
      for (const e of mapped) {
        result = GoAppend(result, e);
      }
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::SameMap","kind":"func","status":"implemented","sigHash":"b37cc02f2d681b441a2bcf95a170a037c3e31ff3971463fba5f6290a56167d14"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased element type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func SameMap[T comparable](slice []T, f func(T) T) []T {
 * 	for i, value := range slice {
 * 		mapped := f(value)
 * 		if mapped != value {
 * 			result := make([]T, len(slice))
 * 			copy(result, slice[:i])
 * 			result[i] = mapped
 * 			for j := i + 1; j < len(slice); j++ {
 * 				result[j] = f(slice[j])
 * 			}
 * 			return result
 * 		}
 * 	}
 * 	return slice
 * }
 */
export function SameMap<T extends GoComparable>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => T>, equal: GoEquality<T>): GoSlice<T> {
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    const mapped = f!(value);
    if (!equal(mapped, value)) {
      const result: GoSlice<T> = new globalThis.Array<T>(slice.length);
      for (let k = 0; k < i; k++) {
        result[k] = slice[k]!;
      }
      result[i] = mapped;
      for (let j = i + 1; j < slice.length; j++) {
        result[j] = f!(slice[j]!);
      }
      return result;
    }
  }
  return slice;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::SameMapIndex","kind":"func","status":"implemented","sigHash":"6505040355c13afa243941839d6d044526ed0335e81bb95e22d06a24c0ff4d80"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased element type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func SameMapIndex[T comparable](slice []T, f func(T, int) T) []T {
 * 	for i, value := range slice {
 * 		mapped := f(value, i)
 * 		if mapped != value {
 * 			result := make([]T, len(slice))
 * 			copy(result, slice[:i])
 * 			result[i] = mapped
 * 			for j := i + 1; j < len(slice); j++ {
 * 				result[j] = f(slice[j], j)
 * 			}
 * 			return result
 * 		}
 * 	}
 * 	return slice
 * }
 */
export function SameMapIndex<T extends GoComparable>(slice: GoSlice<T>, f: GoFunc<(arg0: T, arg1: int) => T>, equal: GoEquality<T>): GoSlice<T> {
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    const mapped = f!(value, i);
    if (!equal(mapped, value)) {
      const result: GoSlice<T> = new globalThis.Array<T>(slice.length);
      for (let k = 0; k < i; k++) {
        result[k] = slice[k]!;
      }
      result[i] = mapped;
      for (let j = i + 1; j < slice.length; j++) {
        result[j] = f!(slice[j]!, j);
      }
      return result;
    }
  }
  return slice;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Same","kind":"func","status":"implemented","sigHash":"c1e9f30e303e3dbaf9dae9e859f3e14958553fd049a118b8e169eb77746d2e92"}
 *
 * Go source:
 * func Same[T any](s1 []T, s2 []T) bool {
 * 	if len(s1) == len(s2) {
 * 		return len(s1) == 0 || &s1[0] == &s2[0]
 * 	}
 * 	return false
 * }
 */
export function Same<T>(s1: GoSlice<T>, s2: GoSlice<T>): bool {
  if (s1.length === s2.length) {
    // Go compares the address of the first element (`&s1[0] == &s2[0]`) to test
    // whether the two slices share the same backing array. In this value-array
    // model that maps to JS reference identity of the slice itself.
    return s1.length === 0 || s1 === s2;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Some","kind":"func","status":"implemented","sigHash":"9cbe48e4837767d8e6e64571b1f05a4281e53311e62f370b3593a52a3056453b"}
 *
 * Go source:
 * func Some[T any](slice []T, f func(T) bool) bool {
 * 	for _, value := range slice { //nolint:modernize
 * 		if f(value) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Some<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): bool {
  for (const value of slice) {
    //nolint:modernize
    if (f!(value)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Every","kind":"func","status":"implemented","sigHash":"ea99b9b3f35d67edb785af36c6532dd9ceebd77305cb8a13e0e17d48bcda57c6"}
 *
 * Go source:
 * func Every[T any](slice []T, f func(T) bool) bool {
 * 	for _, value := range slice {
 * 		if !f(value) {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function Every<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): bool {
  for (const value of slice) {
    if (!f!(value)) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Or","kind":"func","status":"implemented","sigHash":"1bc86f860646b4bcd0088d6a1ab2601c2b806338b042fecf5e7502b9dd5ab560"}
 *
 * Go source:
 * func Or[T any](funcs ...func(T) bool) func(T) bool {
 * 	return func(input T) bool {
 * 		for _, f := range funcs {
 * 			if f(input) {
 * 				return true
 * 			}
 * 		}
 * 		return false
 * 	}
 * }
 */
export function Or<T>(...funcs: Array<GoFunc<(arg0: T) => bool>>): GoFunc<(arg0: T) => bool> {
  return (input: T): bool => {
    for (const f of funcs) {
      if (f!(input)) {
        return true;
      }
    }
    return false;
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Find","kind":"func","status":"implemented","sigHash":"2ee16e58ad0deb6cc7714a39d341a00341dee7669cbba6922629edbe0e420e37"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic search receives the exact static zero-value constructor for its missing-result path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func Find[T any](slice []T, f func(T) bool) T {
 * 	for _, value := range slice {
 * 		if f(value) {
 * 			return value
 * 		}
 * 	}
 * 	return *new(T)
 * }
 */
export function Find<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>, zeroValue: GoZeroFactory<T>): T {
  for (const value of slice) {
    if (f!(value)) {
      return value;
    }
  }
  return zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FindLast","kind":"func","status":"implemented","sigHash":"f52df98008b7638fb14b25ad503a9663f6455e0ca181d35ed26aa054670afde5"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic search receives the exact static zero-value constructor for its missing-result path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func FindLast[T any](slice []T, f func(T) bool) T {
 * 	for i := len(slice) - 1; i >= 0; i-- {
 * 		value := slice[i]
 * 		if f(value) {
 * 			return value
 * 		}
 * 	}
 * 	return *new(T)
 * }
 */
export function FindLast<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>, zeroValue: GoZeroFactory<T>): T {
  for (let i = slice.length - 1; i >= 0; i--) {
    const value = slice[i]!;
    if (f!(value)) {
      return value;
    }
  }
  return zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FindIndex","kind":"func","status":"implemented","sigHash":"311af221a7c0b594a4ff6c7179dea128aab868fce06fab609d1672697e6bef8d"}
 *
 * Go source:
 * func FindIndex[T any](slice []T, f func(T) bool) int {
 * 	for i, value := range slice {
 * 		if f(value) {
 * 			return i
 * 		}
 * 	}
 * 	return -1
 * }
 */
export function FindIndex<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): int {
  for (let i = 0; i < slice.length; i++) {
    const value = slice[i]!;
    if (f!(value)) {
      return i;
    }
  }
  return -1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FindLastIndex","kind":"func","status":"implemented","sigHash":"f10b29be576310e978a7d87c83212c025a618fcf7bd2edea77d9365bed98b555"}
 *
 * Go source:
 * func FindLastIndex[T any](slice []T, f func(T) bool) int {
 * 	for i := len(slice) - 1; i >= 0; i-- {
 * 		value := slice[i]
 * 		if f(value) {
 * 			return i
 * 		}
 * 	}
 * 	return -1
 * }
 */
export function FindLastIndex<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): int {
  for (let i = slice.length - 1; i >= 0; i--) {
    const value = slice[i]!;
    if (f!(value)) {
      return i;
    }
  }
  return -1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FirstOrNil","kind":"func","status":"implemented","sigHash":"5b02323d9799c251ff81888dc2253e15b12b9f05ae4ef699fff5fa580f5eb211"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic selection receives the exact static zero-value constructor for its empty-input path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func FirstOrNil[T any](slice []T) T {
 * 	if len(slice) != 0 {
 * 		return slice[0]
 * 	}
 * 	return *new(T)
 * }
 */
export function FirstOrNil<T>(slice: GoSlice<T>, zeroValue: GoZeroFactory<T>): T {
  if (slice.length !== 0) {
    return slice[0]!;
  }
  return zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::LastOrNil","kind":"func","status":"implemented","sigHash":"2e9c8036f902e50e1d0808502292b6458d1ff3e636a34424a4556b67480537f3"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic selection receives the exact static zero-value constructor for its empty-input path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func LastOrNil[T any](slice []T) T {
 * 	if len(slice) != 0 {
 * 		return slice[len(slice)-1]
 * 	}
 * 	return *new(T)
 * }
 */
export function LastOrNil<T>(slice: GoSlice<T>, zeroValue: GoZeroFactory<T>): T {
  if (slice.length !== 0) {
    return slice[slice.length - 1]!;
  }
  return zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ElementOrNil","kind":"func","status":"implemented","sigHash":"5d72715cfc3550ed669b5d8a565bc6c23b5fac16e70c7653b76bb357348970bf"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic indexing receives the exact static zero-value constructor for its out-of-range path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func ElementOrNil[T any](slice []T, index int) T {
 * 	if index < len(slice) {
 * 		return slice[index]
 * 	}
 * 	return *new(T)
 * }
 */
export function ElementOrNil<T>(slice: GoSlice<T>, index: int, zeroValue: GoZeroFactory<T>): T {
  if (index < slice.length) {
    return slice[index]!;
  }
  return zeroValue();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FirstOrNilSeq","kind":"func","status":"implemented","sigHash":"0cb753a080e39d02e9c60ac785b748dd0bb0bc0674fc721f4493447df92bf9b6"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic iteration receives the exact static zero-value constructor for its empty-sequence path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func FirstOrNilSeq[T any](seq iter.Seq[T]) T {
 * 	if seq != nil {
 * 		for value := range seq {
 * 			return value
 * 		}
 * 	}
 * 	return *new(T)
 * }
 */
export function FirstOrNilSeq<T>(seq: Seq<T>, zeroValue: GoZeroFactory<T>): T {
  let result = zeroValue();
  if (seq !== undefined) {
    seq((value: T): bool => {
      result = value;
      return false;
    });
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FirstNonNil","kind":"func","status":"implemented","sigHash":"5af1740123b28a4598c1e21e27b051d47d7414505d1076442a7c88bce368177f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic zero comparison receives exact static zero-value and equality operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"U"},{"kind":"equality","parameter":"equal","typeParameter":"U"}]}
 *
 * Go source:
 * func FirstNonNil[T any, U comparable](slice []T, f func(T) U) U {
 * 	for _, value := range slice {
 * 		mapped := f(value)
 * 		if mapped != *new(U) {
 * 			return mapped
 * 		}
 * 	}
 * 	return *new(U)
 * }
 */
export function FirstNonNil<T, U extends GoComparable>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => U>, zeroValue: GoZeroFactory<U>, equal: GoEquality<U>): U {
  const zero = zeroValue();
  for (const value of slice) {
    const mapped = f!(value);
    if (!equal(mapped, zero)) {
      return mapped;
    }
  }
  return zero;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FirstNonZero","kind":"func","status":"implemented","sigHash":"937815920a82b37fd05c1efdc4ae241c40a80974d412adad80b281393fe3e833"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic zero comparison receives exact static zero-value and equality operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"},{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func FirstNonZero[T comparable](values ...T) T {
 * 	var zero T
 * 	for _, value := range values {
 * 		if value != zero {
 * 			return value
 * 		}
 * 	}
 * 	return zero
 * }
 */
export function FirstNonZero<T extends GoComparable>(zeroValue: GoZeroFactory<T>, equal: GoEquality<T>, ...values: Array<T>): T {
  const zero = zeroValue();
  for (const value of values) {
    if (!equal(value, zero)) {
      return value;
    }
  }
  return zero;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Concatenate","kind":"func","status":"implemented","sigHash":"6956c1829700bd3fc3f92ccbb9409a1e9c08d886214b667237944eeaf8c08a06"}
 *
 * Go source:
 * func Concatenate[T any](s1 []T, s2 []T) []T {
 * 	if len(s2) == 0 {
 * 		return s1
 * 	}
 * 	if len(s1) == 0 {
 * 		return s2
 * 	}
 * 	return slices.Concat(s1, s2)
 * }
 */
export function Concatenate<T>(s1: GoSlice<T>, s2: GoSlice<T>): GoSlice<T> {
  const left = s1 ?? GoEmptySlice<T>();
  const right = s2 ?? GoEmptySlice<T>();
  if (right.length === 0) {
    return left;
  }
  if (left.length === 0) {
    return right;
  }
  return slices.Concat(left, right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Splice","kind":"func","status":"implemented","sigHash":"2059bb395cba83fa69150051bc69f7aa38df5fd393dd10eac311e2bfab466c6e"}
 *
 * Go source:
 * func Splice[T any](s1 []T, start int, deleteCount int, items ...T) []T {
 * 	if start < 0 {
 * 		start = len(s1) + start
 * 	}
 * 	if start < 0 {
 * 		start = 0
 * 	}
 * 	if start > len(s1) {
 * 		start = len(s1)
 * 	}
 * 	if deleteCount < 0 {
 * 		deleteCount = 0
 * 	}
 * 	end := min(start+max(deleteCount, 0), len(s1))
 * 	if start == end && len(items) == 0 {
 * 		return s1
 * 	}
 * 	return slices.Concat(s1[:start], items, s1[end:])
 * }
 */
export function Splice<T>(s1: GoSlice<T>, start: int, deleteCount: int, ...items: Array<T>): GoSlice<T> {
  if (start < 0) {
    start = s1.length + start;
  }
  if (start < 0) {
    start = 0;
  }
  if (start > s1.length) {
    start = s1.length;
  }
  if (deleteCount < 0) {
    deleteCount = 0;
  }
  const end = globalThis.Math.min(start + globalThis.Math.max(deleteCount, 0), s1.length);
  if (start === end && items.length === 0) {
    return s1;
  }
  return slices.Concat(s1.slice(0, start), items, s1.slice(end));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::CountWhere","kind":"func","status":"implemented","sigHash":"031bba4984386a9a0f55d877d220823bcd146922a8c3a81b8538d949323eb446"}
 *
 * Go source:
 * func CountWhere[T any](slice []T, f func(T) bool) int {
 * 	count := 0
 * 	for _, value := range slice {
 * 		if f(value) {
 * 			count++
 * 		}
 * 	}
 * 	return count
 * }
 */
export function CountWhere<T>(slice: GoSlice<T>, f: GoFunc<(arg0: T) => bool>): int {
  let count = 0;
  for (const value of slice) {
    if (f!(value)) {
      count++;
    }
  }
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ReplaceElement","kind":"func","status":"implemented","sigHash":"beb260c7a6baeb5dcdc126918cde78058634752f2e7f886084538bb51c5cd88b"}
 *
 * Go source:
 * func ReplaceElement[T any](slice []T, i int, t T) []T {
 * 	result := slices.Clone(slice)
 * 	result[i] = t
 * 	return result
 * }
 */
export function ReplaceElement<T>(slice: GoSlice<T>, i: int, t: T): GoSlice<T> {
  const result = slices.Clone(slice)!;
  result[i] = t;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::InsertSorted","kind":"func","status":"implemented","sigHash":"3b2f1a5ae3af2588c684e6770ec10debcac33e0adf8765045b584a2ebd8475e0"}
 *
 * Go source:
 * func InsertSorted[T any](slice []T, element T, cmp func(T, T) int) []T {
 * 	i, _ := slices.BinarySearchFunc(slice, element, cmp)
 * 	return slices.Insert(slice, i, element)
 * }
 */
export function InsertSorted<T>(slice: GoSlice<T>, element: T, cmp: GoFunc<(arg0: T, arg1: T) => int>): GoSlice<T> {
  const [i] = slices.BinarySearchFunc(slice, element, cmp!);
  return slices.Insert(slice, i, element);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::MinAllFunc","kind":"func","status":"implemented","sigHash":"087f37a414ce7257a8c7bfc27b78c7706b96f42c3a0d9c0e9d62210f1c1cf934"}
 *
 * Go source:
 * func MinAllFunc[T any](xs []T, cmp func(a, b T) int) []T {
 * 	if len(xs) == 0 {
 * 		return nil
 * 	}
 * 
 * 	m := xs[0]
 * 	mins := []T{m}
 * 
 * 	for _, x := range xs[1:] {
 * 		c := cmp(x, m)
 * 		switch {
 * 		case c < 0:
 * 			m = x
 * 			mins = mins[:0]
 * 			mins = append(mins, x)
 * 		case c == 0:
 * 			mins = append(mins, x)
 * 		}
 * 	}
 * 
 * 	return mins
 * }
 */
export function MinAllFunc<T>(xs: GoSlice<T>, cmp: GoFunc<(a: T, b: T) => int>): GoSlice<T> {
  if (xs.length === 0) {
    return GoEmptySlice<T>();
  }

  let m: T = xs[0]!;
  let mins: GoSlice<T> = [m];

  for (const x of xs.slice(1)) {
    const c = cmp!(x, m);
    if (c < 0) {
      m = x;
      mins = GoSliceToZeroLength(mins);
      mins = GoAppend(mins, x);
    } else if (c === 0) {
      mins = GoAppend(mins, x);
    }
  }

  return mins;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::AppendIfUnique","kind":"func","status":"implemented","sigHash":"306355ba71b10478033aadff90f427c91e2f254307d310e3474ae0425de73760"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased element type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func AppendIfUnique[T comparable](slice []T, element T) []T {
 * 	if slices.Contains(slice, element) {
 * 		return slice
 * 	}
 * 	return append(slice, element)
 * }
 */
export function AppendIfUnique<T extends GoComparable>(slice: GoSlice<T>, element: T, equal: GoEquality<T>): GoSlice<T> {
  if (slices.Contains(slice, element, equal)) {
    return slice;
  }
  return GoAppend(slice, element);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Memoize","kind":"func","status":"implemented","sigHash":"bf3d5a24243b53fb586b7a917e212771d780a4104a57e141340c1fb6637a4d3b"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic memoization receives the exact static zero-value constructor for its pre-initialization storage.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func Memoize[T any](create func() T) func() T {
 * 	var value T
 * 	return func() T {
 * 		if create != nil {
 * 			value = create()
 * 			create = nil
 * 		}
 * 		return value
 * 	}
 * }
 */
export function Memoize<T>(create: GoFunc<() => T>, zeroValue: GoZeroFactory<T>): GoFunc<() => T> {
  let value = zeroValue();
  // Go reassigns `create = nil` after the first call to release it and gate
  // re-invocation. The scaffold signature keeps `create` non-nullable, so the
  // nil-able gate is held in a local copy.
  let createOrNil: GoFunc<() => T> = create;
  return (): T => {
    if (createOrNil !== undefined) {
      value = createOrNil();
      createOrNil = undefined;
    }
    return value;
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::IfElse","kind":"func","status":"implemented","sigHash":"8ed31905adab168d7e62b34b753ca8d9dc6e58c71bfd8be562fa98bc2bc0d2a2"}
 *
 * Go source:
 * func IfElse[T any](b bool, whenTrue T, whenFalse T) T {
 * 	if b {
 * 		return whenTrue
 * 	}
 * 	return whenFalse
 * }
 */
export function IfElse<T>(b: bool, whenTrue: T, whenFalse: T): T {
  if (b) {
    return whenTrue;
  }
  return whenFalse;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::OrElse","kind":"func","status":"implemented","sigHash":"04ed316e84d21dda511b80c386abcd4589a573b10bcfdb222529d762e97f5606"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic zero comparison receives exact static zero-value and equality operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"},{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func OrElse[T comparable](value T, defaultValue T) T {
 * 	if value != *new(T) {
 * 		return value
 * 	}
 * 	return defaultValue
 * }
 */
export function OrElse<T extends GoComparable>(value: T, defaultValue: T, zeroValue: GoZeroFactory<T>, equal: GoEquality<T>): T {
  if (!equal(value, zeroValue())) {
    return value;
  }
  return defaultValue;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Coalesce","kind":"func","status":"implemented","sigHash":"744ae18e12021d7538c18b0d0aff8400409bec580f1d0d2ec49348473d59237b"}
 *
 * Go source:
 * func Coalesce[T *U, U any](a T, b T) T {
 * 	if a == nil {
 * 		return b
 * 	} else {
 * 		return a
 * 	}
 * }
 */
export function Coalesce<T extends GoPointerConstraint<U>, U>(a: T, b: T): T {
  // T is a pointer type *U in Go, so the zero value tested against nil is undefined.
  if (a === undefined) {
    return b;
  } else {
    return a;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::type::ECMALineStarts","kind":"type","status":"implemented","sigHash":"593ae08679195c95688abf8458f68ac4d519bae486e94f51f0632c480559168b"}
 *
 * Go source:
 * ECMALineStarts []TextPos
 */
export type ECMALineStarts = GoSlice<TextPos>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ComputeECMALineStarts","kind":"func","status":"implemented","sigHash":"b13aa73414e321c686bbc5459e2a16d89ef07cf199d497b29a4d76aa8c502aeb"}
 *
 * Go source:
 * func ComputeECMALineStarts(text string) ECMALineStarts {
 * 	result := make([]TextPos, 0, strings.Count(text, "\n")+1)
 * 	return slices.AppendSeq(result, ComputeECMALineStartsSeq(text))
 * }
 */
export function ComputeECMALineStarts(text: string): ECMALineStarts {
  const result: GoSlice<TextPos> = GoSliceMake(0, 0, GoNumberValueOps);
  return slices.AppendSeq(result, ComputeECMALineStartsSeq(text));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ComputeECMALineStartsSeq","kind":"func","status":"implemented","sigHash":"911fb066c24cc7312e67a544bedd9232d274063c961ddc2bacdafd2fc1a900f1"}
 *
 * Go source:
 * func ComputeECMALineStartsSeq(text string) iter.Seq[TextPos] {
 * 	return func(yield func(TextPos) bool) {
 * 		textLen := TextPos(len(text))
 * 		var pos TextPos
 * 		var lineStart TextPos
 * 		for pos < textLen {
 * 			b := text[pos]
 * 			if b < utf8.RuneSelf {
 * 				pos++
 * 				switch b {
 * 				case '\r':
 * 					if pos < textLen && text[pos] == '\n' {
 * 						pos++
 * 					}
 * 					fallthrough
 * 				case '\n':
 * 					if !yield(lineStart) {
 * 						return
 * 					}
 * 					lineStart = pos
 * 				}
 * 			} else {
 * 				ch, size := utf8.DecodeRuneInString(text[pos:])
 * 				pos += TextPos(size)
 * 				if stringutil.IsLineBreak(ch) {
 * 					if !yield(lineStart) {
 * 						return
 * 					}
 * 					lineStart = pos
 * 				}
 * 			}
 * 		}
 * 		yield(lineStart)
 * 	}
 * }
 */
export function ComputeECMALineStartsSeq(text: string): Seq<TextPos> {
  return (yield_: GoFunc<(value: TextPos) => bool>): void => {
    const textLen: int = text.length;
    let index: int = 0;
    let bytePos: TextPos = 0;
    let lineStart: TextPos = 0;
    while (index < textLen) {
      const ch = text.charCodeAt(index);
      index++;
      if (ch < utf8.RuneSelf) {
        bytePos++;
        switch (ch) {
          case 0x0d /* '\r' */:
            if (index < textLen && text.charCodeAt(index) === 0x0a /* '\n' */) {
              index++;
              bytePos++;
            }
          // fallthrough
          case 0x0a /* '\n' */:
            if (!yield_!(lineStart)) {
              return;
            }
            lineStart = bytePos;
            break;
        }
      } else if (ch < 0x0800) {
        bytePos += 2;
      } else if (ch >= 0xd800 && ch <= 0xdbff && index < textLen) {
        const low = text.charCodeAt(index);
        if (low >= 0xdc00 && low <= 0xdfff) {
          index++;
          bytePos += 4;
        } else {
          bytePos += 3;
        }
      } else {
        bytePos += 3;
        if (ch === 0x2028 || ch === 0x2029) {
          if (!yield_!(lineStart)) {
            return;
          }
          lineStart = bytePos;
        }
      }
    }
    yield_!(lineStart);
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::PositionToLineAndByteOffset","kind":"func","status":"implemented","sigHash":"5072996ce7e2b0172cc9fc71b85986d77803332890f927066aecd8a5c65ef439"}
 *
 * Go source:
 * func PositionToLineAndByteOffset(position int, lineStarts []TextPos) (line int, byteOffset int) {
 * 	line = max(sort.Search(len(lineStarts), func(i int) bool {
 * 		return int(lineStarts[i]) > position
 * 	})-1, 0)
 * 	return line, position - int(lineStarts[line])
 * }
 */
export function PositionToLineAndByteOffset(position: int, lineStarts: GoSlice<TextPos>): [line: int, byteOffset: int] {
  const line = globalThis.Math.max(
    sort.Search(lineStarts.length, (i: int): bool => {
      return GoSliceLoad(lineStarts, i, GoNumberValueOps)! > position;
    }) - 1,
    0,
  );
  return [line, position - GoSliceLoad(lineStarts, line, GoNumberValueOps)!];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::type::UTF16Offset","kind":"type","status":"implemented","sigHash":"90db5c6b3adf593e66bf8f2d2b3c216beb38406955cf0b46acbf88fe786db10f"}
 *
 * Go source:
 * UTF16Offset int
 */
export type UTF16Offset = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::UTF16Len","kind":"func","status":"implemented","sigHash":"b19c3616c0d4c6b83db688db47599bc92e1d5471f12db81c793d7f6e1fce382e"}
 *
 * Go source:
 * func UTF16Len(s string) UTF16Offset {
 * 	// Fast path: scan for non-ASCII bytes. For ASCII-only strings,
 * 	// each byte is one UTF-16 code unit, so we can return len(s) directly.
 * 	for i := range len(s) {
 * 		if s[i] >= utf8.RuneSelf {
 * 			// Found non-ASCII; count the ASCII prefix, then decode the rest.
 * 			n := UTF16Offset(i)
 * 			for _, r := range s[i:] {
 * 				n += UTF16Offset(utf16.RuneLen(r))
 * 			}
 * 			return n
 * 		}
 * 	}
 * 	return UTF16Offset(len(s))
 * }
 */
export function UTF16Len(s: string): UTF16Offset {
  return s.length;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Flatten","kind":"func","status":"implemented","sigHash":"d8d271526c45a14d27b1acd6f48cadeed4d8a4dea11b24d94baf324e6ff37446"}
 *
 * Go source:
 * func Flatten[T any](array [][]T) []T {
 * 	var result []T
 * 	for _, subArray := range array {
 * 		result = append(result, subArray...)
 * 	}
 * 	return result
 * }
 */
export function Flatten<T>(array: GoSlice<GoSlice<T>>): GoSlice<T> {
  let result: GoSlice<T> = GoEmptySlice<T>();
  for (const subArray of array) {
    for (const e of subArray) {
      result = GoAppend(result, e);
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Must","kind":"func","status":"implemented","sigHash":"7b1c16cc9133d57575a5501bad69c8a1cfb8803e2e5bf81c8486faf90b1a903d"}
 *
 * Go source:
 * func Must[T any](v T, err error) T {
 * 	if err != nil {
 * 		panic(err)
 * 	}
 * 	return v
 * }
 */
export function Must<T>(v: T, err: GoError): T {
  if (err !== undefined) {
    throw err;
  }
  return v;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::FirstResult","kind":"func","status":"implemented","sigHash":"751dac48fe324578f79ba5f75b125084631867dbfd721807193f7e005e68f4ad"}
 *
 * Go source:
 * func FirstResult[T1 any](t1 T1, _ ...any) T1 {
 * 	return t1
 * }
 */
export function FirstResult<T1>(t1: T1, ...arg: Array<GoInterface<unknown>>): T1 {
  return t1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::StringifyJson","kind":"func","status":"implemented","sigHash":"6bc065d9c75940c8f06ab9bf844f14e0e55f64b90d5739d442a18736989c8187"}
 *
 * Go source:
 * func StringifyJson(input any, prefix string, indent string) (string, error) {
 * 	output, err := json.MarshalIndent(input, prefix, indent)
 * 	return string(output), err
 * }
 */
export function StringifyJson(input: GoInterface<unknown>, prefix: string, indent: string): [string, GoError] {
  const [output, err] = MarshalIndent(input, prefix, indent);
  return [utf8Decoder.decode(globalThis.Uint8Array.from(output)), err];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::GetScriptKindFromFileName","kind":"func","status":"implemented","sigHash":"c3c316f0fb33499d86ceee6412056582e1e099739254e187fc4c2e582b91953b"}
 *
 * Go source:
 * func GetScriptKindFromFileName(fileName string) ScriptKind {
 * 	dotPos := strings.LastIndex(fileName, ".")
 * 	if dotPos >= 0 {
 * 		switch strings.ToLower(fileName[dotPos:]) {
 * 		case tspath.ExtensionJs, tspath.ExtensionCjs, tspath.ExtensionMjs:
 * 			return ScriptKindJS
 * 		case tspath.ExtensionJsx:
 * 			return ScriptKindJSX
 * 		case tspath.ExtensionTs, tspath.ExtensionCts, tspath.ExtensionMts:
 * 			return ScriptKindTS
 * 		case tspath.ExtensionTsx:
 * 			return ScriptKindTSX
 * 		case tspath.ExtensionJson:
 * 			return ScriptKindJSON
 * 		}
 * 	}
 * 	return ScriptKindUnknown
 * }
 */
export function GetScriptKindFromFileName(fileName: string): ScriptKind {
  const dotPos = strings.LastIndex(fileName, ".");
  if (dotPos >= 0) {
    switch (strings.ToLower(byteSliceFrom(fileName, dotPos))) {
      case ExtensionJs:
      case ExtensionCjs:
      case ExtensionMjs:
        return ScriptKindJS;
      case ExtensionJsx:
        return ScriptKindJSX;
      case ExtensionTs:
      case ExtensionCts:
      case ExtensionMts:
        return ScriptKindTS;
      case ExtensionTsx:
        return ScriptKindTSX;
      case ExtensionJson:
        return ScriptKindJSON;
    }
  }
  return ScriptKindUnknown;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::GetSpellingSuggestion","kind":"func","status":"implemented","sigHash":"1b0b9726dc2969cd01ad9c72a71a3a4e6d6108febf51eb5a214b595e6d38aafd"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic suggestion selection receives the exact static zero-value constructor for its no-candidate result.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"T"}]}
 *
 * Go source:
 * func GetSpellingSuggestion[T any](name string, candidates iter.Seq[T], getName func(T) string, compare func(T, T) int) T {
 * 	maximumLengthDifference := max(2, int(float64(len(name))*0.34))
 * 	bestDistance := math.Floor(float64(len(name))*0.4) + 0.9 // If the best result is worse than this, don't bother.
 * 	runeName := []rune(name)
 * 	buffers := levenshteinBuffersPool.Get().(*levenshteinBuffers)
 * 	defer levenshteinBuffersPool.Put(buffers)
 * 	var bestCandidate T
 * 	hasBest := false
 * 	for candidate := range candidates {
 * 		candidateName := getName(candidate)
 * 		maxLen := max(len(candidateName), len(name))
 * 		minLen := min(len(candidateName), len(name))
 * 		if candidateName != "" && maxLen-minLen <= maximumLengthDifference {
 * 			if candidateName == name {
 * 				continue
 * 			}
 * 			// Only consider candidates less than 3 characters long when they differ by case.
 * 			// Otherwise, don't bother, since a user would usually notice differences of a 2-character name.
 * 			if len(candidateName) < 3 && !strings.EqualFold(candidateName, name) {
 * 				continue
 * 			}
 * 			distance := levenshteinWithMax(buffers, runeName, []rune(candidateName), bestDistance)
 * 			if distance < 0 {
 * 				continue
 * 			}
 * 			debug.Assert(distance <= bestDistance) // Else `levenshteinWithMax` should return undefined
 * 			if distance < bestDistance {
 * 				bestDistance = distance
 * 				bestCandidate = candidate
 * 				hasBest = true
 * 			} else if !hasBest || compare(candidate, bestCandidate) < 0 {
 * 				bestCandidate = candidate
 * 				hasBest = true
 * 			}
 * 		}
 * 	}
 * 	return bestCandidate
 * }
 */
export function GetSpellingSuggestion<T>(name: string, candidates: Seq<T>, getName: GoFunc<(arg0: T) => string>, compare: GoFunc<(arg0: T, arg1: T) => int>, zeroValue: GoZeroFactory<T>): T {
  const searchName = name ?? "";
  const runeName = stringToRunes(searchName);
  const maximumLengthDifference = globalThis.Math.max(2, globalThis.Math.trunc(runeName.length * 0.34));
  let bestDistance = math.Floor(runeName.length * 0.4) + 0.9; // If the best result is worse than this, don't bother.
  // Go: levenshteinBuffersPool.Get().(*levenshteinBuffers) — the New factory is
  // always set, so the pool never yields nil and the type assertion holds.
  const buffers = levenshteinBuffersPool.Get() as levenshteinBuffers;
  try {
    let bestCandidate = zeroValue();
    let hasBest = false;
    candidates!((candidate: T): bool => {
      const candidateName = getName!(candidate) ?? "";
      const maxLen = globalThis.Math.max(byteLen(candidateName), runeName.length);
      const minLen = globalThis.Math.min(byteLen(candidateName), runeName.length);
      if (candidateName !== "" && maxLen - minLen <= maximumLengthDifference) {
        if (candidateName === searchName) {
          return true;
        }
        // Only consider candidates less than 3 characters long when they differ by case.
        // Otherwise, don't bother, since a user would usually notice differences of a 2-character name.
        if (byteLen(candidateName) < 3 && !strings.EqualFold(candidateName, searchName)) {
          return true;
        }
        const distance = levenshteinWithMax(buffers, runeName, stringToRunes(candidateName), bestDistance);
        if (distance < 0) {
          return true;
        }
        Assert(distance <= bestDistance); // Else `levenshteinWithMax` should return undefined
        if (distance < bestDistance) {
          bestDistance = distance;
          bestCandidate = candidate;
          hasBest = true;
        } else if (!hasBest || compare!(candidate, bestCandidate) < 0) {
          bestCandidate = candidate;
          hasBest = true;
        }
      }
      return true;
    });
    return bestCandidate;
  } finally {
    levenshteinBuffersPool.Put(buffers);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::GetSpellingSuggestionForStrings","kind":"func","status":"implemented","sigHash":"107bd01a9ffab497eaa7857629b7d71e7cc299a68b28603675778788477d8aa4"}
 *
 * Go source:
 * func GetSpellingSuggestionForStrings(name string, candidates iter.Seq[string]) string {
 * 	return GetSpellingSuggestion(name, candidates, Identity, strings.Compare)
 * }
 */
export function GetSpellingSuggestionForStrings(name: string, candidates: Seq<string>): string {
  return GetSpellingSuggestion(name, candidates, Identity, strings.Compare, GoZeroString);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::type::levenshteinBuffers","kind":"type","status":"implemented","sigHash":"88cdf73846a8c42946ea4db3107e8349f29c6f1dc3aa5939cdf5c08246f58f26"}
 *
 * Go source:
 * levenshteinBuffers struct {
 * 	previous []float64
 * 	current  []float64
 * }
 */
export interface levenshteinBuffers {
  previous: GoSlice<double>;
  current: GoSlice<double>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::varGroup::levenshteinBuffersPool","kind":"varGroup","status":"implemented","sigHash":"f62bbda612a7082a5f4bfe98fc2a2ad150523646d44c172ed3bf5b3e1a398fd3"}
 *
 * Go source:
 * var levenshteinBuffersPool = sync.Pool{
 * 	New: func() any {
 * 		return &levenshteinBuffers{}
 * 	},
 * }
 */
export let levenshteinBuffersPool: Pool = globalThis.Object.assign(new Pool(), {
  New: (): levenshteinBuffers => {
    return { previous: GoSliceMake(0, 0, GoNumberValueOps), current: GoSliceMake(0, 0, GoNumberValueOps) };
  },
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::levenshteinWithMax","kind":"func","status":"implemented","sigHash":"e13904897a0737b8b10a09c26aec62e3357225fe00c2a4810d4b77b74c74ef76"}
 *
 * Go source:
 * func levenshteinWithMax(buffers *levenshteinBuffers, s1 []rune, s2 []rune, maxValue float64) float64 {
 * 	bufferSize := len(s2) + 1
 * 	buffers.previous = slices.Grow(buffers.previous[:0], bufferSize)[:bufferSize]
 * 	buffers.current = slices.Grow(buffers.current[:0], bufferSize)[:bufferSize]
 * 
 * 	previous := buffers.previous
 * 	current := buffers.current
 * 
 * 	big := maxValue + 0.01
 * 	for i := range previous {
 * 		previous[i] = float64(i)
 * 	}
 * 	for i := 1; i <= len(s1); i++ {
 * 		c1 := s1[i-1]
 * 		minJ := max(int(math.Ceil(float64(i)-maxValue)), 1)
 * 		maxJ := min(int(math.Floor(maxValue+float64(i))), len(s2))
 * 		colMin := float64(i)
 * 		current[0] = colMin
 * 		for j := 1; j < minJ; j++ {
 * 			current[j] = big
 * 		}
 * 		for j := minJ; j <= maxJ; j++ {
 * 			var substitutionDistance, dist float64
 * 			if unicode.ToLower(s1[i-1]) == unicode.ToLower(s2[j-1]) {
 * 				substitutionDistance = previous[j-1] + 0.1
 * 			} else {
 * 				substitutionDistance = previous[j-1] + 2
 * 			}
 * 			if c1 == s2[j-1] {
 * 				dist = previous[j-1]
 * 			} else {
 * 				dist = math.Min(previous[j]+1, math.Min(current[j-1]+1, substitutionDistance))
 * 			}
 * 			current[j] = dist
 * 			colMin = math.Min(colMin, dist)
 * 		}
 * 		for j := maxJ + 1; j <= len(s2); j++ {
 * 			current[j] = big
 * 		}
 * 		if colMin > maxValue {
 * 			// Give up -- everything in this column is > max and it can't get better in future columns.
 * 			return -1
 * 		}
 * 		previous, current = current, previous
 * 	}
 * 	res := previous[len(s2)]
 * 	if res > maxValue {
 * 		return -1
 * 	}
 * 	return res
 * }
 */
export function levenshteinWithMax(buffers: GoPtr<levenshteinBuffers>, s1: GoSlice<GoRune>, s2: GoSlice<GoRune>, maxValue: double): double {
  const bufferSize = s2.length + 1;
  buffers!.previous = slices.Grow(GoSliceToZeroLength(buffers!.previous), bufferSize);
  buffers!.previous.length = bufferSize;
  buffers!.current = slices.Grow(GoSliceToZeroLength(buffers!.current), bufferSize);
  buffers!.current.length = bufferSize;

  let previous = buffers!.previous;
  let current = buffers!.current;

  const big = maxValue + 0.01;
  for (let i = 0; i < previous.length; i++) {
    GoSliceStore(previous, i, i, GoNumberValueOps);
  }
  for (let i = 1; i <= s1.length; i++) {
    const c1 = GoSliceLoad(s1, i - 1, GoNumberValueOps)!;
    const minJ = globalThis.Math.max(globalThis.Math.trunc(math.Ceil(i - maxValue)), 1);
    const maxJ = globalThis.Math.min(globalThis.Math.trunc(math.Floor(maxValue + i)), s2.length);
    let colMin = i;
    GoSliceStore(current, 0, colMin, GoNumberValueOps);
    for (let j = 1; j < minJ; j++) {
      GoSliceStore(current, j, big, GoNumberValueOps);
    }
    for (let j = minJ; j <= maxJ; j++) {
      let substitutionDistance: double;
      let dist: double;
      if (unicode.ToLower(GoSliceLoad(s1, i - 1, GoNumberValueOps)!) === unicode.ToLower(GoSliceLoad(s2, j - 1, GoNumberValueOps)!)) {
        substitutionDistance = GoSliceLoad(previous, j - 1, GoNumberValueOps)! + 0.1;
      } else {
        substitutionDistance = GoSliceLoad(previous, j - 1, GoNumberValueOps)! + 2;
      }
      if (c1 === GoSliceLoad(s2, j - 1, GoNumberValueOps)!) {
        dist = GoSliceLoad(previous, j - 1, GoNumberValueOps)!;
      } else {
        dist = math.Min(GoSliceLoad(previous, j, GoNumberValueOps)! + 1, math.Min(GoSliceLoad(current, j - 1, GoNumberValueOps)! + 1, substitutionDistance));
      }
      GoSliceStore(current, j, dist, GoNumberValueOps);
      colMin = math.Min(colMin, dist);
    }
    for (let j = maxJ + 1; j <= s2.length; j++) {
      GoSliceStore(current, j, big, GoNumberValueOps);
    }
    if (colMin > maxValue) {
      // Give up -- everything in this column is > max and it can't get better in future columns.
      return -1;
    }
    [previous, current] = [current, previous];
  }
  const res = GoSliceLoad(previous, s2.length, GoNumberValueOps)!;
  if (res > maxValue) {
    return -1;
  }
  return res;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Identity","kind":"func","status":"implemented","sigHash":"ec53e6504ecbd1f24f2ab6622de13214e48c19d842aef2d296537bfdefa656de"}
 *
 * Go source:
 * func Identity[T any](t T) T {
 * 	return t
 * }
 */
export function Identity<T>(t: T): T {
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::CheckEachDefined","kind":"func","status":"implemented","sigHash":"4fcaee62e139bdf23ff61239ea5ef45cacdc4765b079002722dba2c6f7d3d2ee"}
 *
 * Go source:
 * func CheckEachDefined[S any](s []*S, msg string) []*S {
 * 	for _, value := range s {
 * 		if value == nil {
 * 			panic(msg)
 * 		}
 * 	}
 * 	return s
 * }
 */
export function CheckEachDefined<S>(s: GoSlice<GoRef<S>>, msg: string): GoSlice<GoRef<S>> {
  for (const value of s) {
    if (value === undefined) {
      throw new globalThis.Error(msg);
    }
  }
  return s;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::IndexAfter","kind":"func","status":"implemented","sigHash":"2d6ab76ab57cdd5d5f0c6ea811f6c9ae3df44ca8efc6ceff27c16cdb3d1542bf"}
 *
 * Go source:
 * func IndexAfter(s string, pattern string, startIndex int) int {
 * 	matched := strings.Index(s[startIndex:], pattern)
 * 	if matched == -1 {
 * 		return -1
 * 	} else {
 * 		return matched + startIndex
 * 	}
 * }
 */
export function IndexAfter(s: string, pattern: string, startIndex: int): int {
  const matched = strings.Index(byteSliceFrom(s, startIndex), pattern);
  if (matched === -1) {
    return -1;
  } else {
    return matched + startIndex;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ShouldRewriteModuleSpecifier","kind":"func","status":"implemented","sigHash":"dd5d830c720d5ad0563b93923446e0d325a690863120fd2d6f5d2747a047d500"}
 *
 * Go source:
 * func ShouldRewriteModuleSpecifier(specifier string, compilerOptions *CompilerOptions) bool {
 * 	return compilerOptions.RewriteRelativeImportExtensions.IsTrue() && tspath.PathIsRelative(specifier) && !tspath.IsDeclarationFileName(specifier) && tspath.HasTSFileExtension(specifier)
 * }
 */
export function ShouldRewriteModuleSpecifier(specifier: string, compilerOptions: GoPtr<CompilerOptions>): bool {
  return Tristate_IsTrue(compilerOptions!.RewriteRelativeImportExtensions) && PathIsRelative(specifier) && !IsDeclarationFileName(specifier) && HasTSFileExtension(specifier);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::SingleElementSlice","kind":"func","status":"implemented","sigHash":"408e51ce0a659f1db8b999d49da2dbe6bf20b3b1cfdfd0c97d6083a7140aea3e"}
 *
 * Go source:
 * func SingleElementSlice[T any](element *T) []*T {
 * 	if element == nil {
 * 		return nil
 * 	}
 * 	return []*T{element}
 * }
 */
export function SingleElementSlice<T>(element: GoRef<T>): GoSlice<GoRef<T>> {
  if (element === undefined) {
    return GoNilSlice();
  }
  return GoSliceBuild(1, 1, GoRefValueOps<T>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, element, GoRefValueOps<T>());
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::ConcatenateSeq","kind":"func","status":"implemented","sigHash":"7051ed3377b99c1d7e59067ccc2248cf0080c305fc803b7ac379ad6f14ff742f"}
 *
 * Go source:
 * func ConcatenateSeq[T any](seqs ...iter.Seq[T]) iter.Seq[T] {
 * 	return func(yield func(T) bool) {
 * 		for _, seq := range seqs {
 * 			if seq == nil {
 * 				continue
 * 			}
 * 			for e := range seq {
 * 				if !yield(e) {
 * 					return
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function ConcatenateSeq<T>(...seqs: Array<Seq<T>>): Seq<T> {
  return (yield_: GoFunc<(value: T) => bool>): void => {
    for (const seq of seqs) {
      if (seq === undefined) {
        continue;
      }
      let stopped = false;
      seq((e: T): bool => {
        if (!yield_!(e)) {
          stopped = true;
          return false;
        }
        return true;
      });
      if (stopped) {
        return;
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Enumerate","kind":"func","status":"implemented","sigHash":"33d22847743048d43e0fd64bfb3f8892adb1a9cc1cef1f86d18627b158294d34"}
 *
 * Go source:
 * func Enumerate[T any](seq iter.Seq[T]) iter.Seq2[int, T] {
 * 	return func(yield func(int, T) bool) {
 * 		i := 0
 * 		for v := range seq {
 * 			if !yield(i, v) {
 * 				return
 * 			}
 * 			i++
 * 		}
 * 	}
 * }
 */
export function Enumerate<T>(seq: Seq<T>): Seq2<int, T> {
  return (yield_: GoFunc<(key: int, value: T) => bool>): void => {
    let i = 0;
    seq!((v: T): bool => {
      if (!yield_!(i, v)) {
        return false;
      }
      i++;
      return true;
    });
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::comparableValuesEqual","kind":"func","status":"implemented","sigHash":"b8f1bf1bfa79a35f285653c43edf369a51e87e9329f4f46fb1afc65183aa2e25"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased value type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func comparableValuesEqual[T comparable](a, b T) bool {
 * 	return a == b
 * }
 */
export function comparableValuesEqual<T extends GoComparable>(a: T, b: T, equal: GoEquality<T>): bool {
  return equal(a, b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::DiffMaps","kind":"func","status":"implemented","sigHash":"27d83fbfc4db5a84be97004bfedccd08f21b07da749454bbe68316c98a707c2a"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased map value type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equalValues","typeParameter":"V"}]}
 *
 * Go source:
 * func DiffMaps[K comparable, V comparable](m1 map[K]V, m2 map[K]V, onAdded func(K, V), onRemoved func(K, V), onChanged func(K, V, V)) {
 * 	DiffMapsFunc(m1, m2, comparableValuesEqual, onAdded, onRemoved, onChanged)
 * }
 */
export function DiffMaps<K extends GoComparable, V extends GoComparable>(m1: GoMap<K, V>, m2: GoMap<K, V>, onAdded: GoFunc<(arg0: K, arg1: V) => void>, onRemoved: GoFunc<(arg0: K, arg1: V) => void>, onChanged: GoFunc<(arg0: K, arg1: V, arg2: V) => void>, equalValues: GoEquality<V>): void {
  DiffMapsFunc(m1, m2, equalValues, onAdded, onRemoved, onChanged);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::DiffMapsFunc","kind":"func","status":"implemented","sigHash":"6e5dc85ce58470c59d2381789fb4edc881700acde04ca8a0cc2c39ef3425b4ed"}
 *
 * Go source:
 * func DiffMapsFunc[K comparable, V1 any, V2 any](m1 map[K]V1, m2 map[K]V2, equalValues func(V1, V2) bool, onAdded func(K, V2), onRemoved func(K, V1), onChanged func(K, V1, V2)) {
 * 	if onAdded != nil {
 * 		for k, v2 := range m2 {
 * 			if _, ok := m1[k]; !ok {
 * 				onAdded(k, v2)
 * 			}
 * 		}
 * 	}
 * 	if onChanged == nil && onRemoved == nil {
 * 		return
 * 	}
 * 	for k, v1 := range m1 {
 * 		if v2, ok := m2[k]; ok {
 * 			if onChanged != nil && !equalValues(v1, v2) {
 * 				onChanged(k, v1, v2)
 * 			}
 * 		} else {
 * 			onRemoved(k, v1)
 * 		}
 * 	}
 * }
 */
export function DiffMapsFunc<K extends GoComparable, V1, V2>(m1: GoMap<K, V1>, m2: GoMap<K, V2>, equalValues: GoFunc<(arg0: V1, arg1: V2) => bool>, onAdded: GoFunc<(arg0: K, arg1: V2) => void>, onRemoved: GoFunc<(arg0: K, arg1: V1) => void>, onChanged: GoFunc<(arg0: K, arg1: V1, arg2: V2) => void>): void {
  if (onAdded !== undefined) {
    for (const [k, v2] of m2) {
      if (!m1.has(k)) {
        onAdded(k, v2);
      }
    }
  }
  if (onChanged === undefined && onRemoved === undefined) {
    return;
  }
  for (const [k, v1] of m1) {
    if (m2.has(k)) {
      const v2 = m2.get(k)!;
      if (onChanged !== undefined && !equalValues!(v1, v2)) {
        onChanged(k, v1, v2);
      }
    } else {
      onRemoved!(k, v1);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::CopyMapInto","kind":"func","status":"implemented","sigHash":"6c06ac181bcf38497145425fd8efa61201a63468ad4449b5ca9245242feebea4"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic map cloning receives the exact static Go map-key descriptor for result allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func CopyMapInto[M1 ~map[K]V, M2 ~map[K]V, K comparable, V any](dst M1, src M2) map[K]V {
 * 	if dst == nil {
 * 		return maps.Clone(src)
 * 	}
 * 	maps.Copy(dst, src)
 * 	return dst
 * }
 */
export function CopyMapInto<M1 extends GoConstraint<"~map[K]V"> & GoMap<K, V>, M2 extends GoConstraint<"~map[K]V"> & GoMap<K, V>, K extends GoComparable, V>(dst: M1, src: M2, keyDescriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  if (dst === undefined) {
    return maps.Clone(src, keyDescriptor);
  }
  maps.Copy(dst, src);
  return dst;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::UnorderedEqual","kind":"func","status":"implemented","sigHash":"628726f66b16bbaa5eb6b22f1ecf59b792f02e16a3d17bbc520afaf1762b3d2a"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic map construction receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"T"}]}
 *
 * Go source:
 * func UnorderedEqual[T comparable](s1 []T, s2 []T) bool {
 * 	if len(s1) != len(s2) {
 * 		return false
 * 	}
 * 	counts := make(map[T]int)
 * 	for _, v := range s1 {
 * 		counts[v]++
 * 	}
 * 	for _, v := range s2 {
 * 		counts[v]--
 * 		if counts[v] < 0 {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function UnorderedEqual<T extends GoComparable>(s1: GoSlice<T>, s2: GoSlice<T>, keyDescriptor: GoMapKeyDescriptor<T>): bool {
  if (s1.length !== s2.length) {
    return false;
  }
  const counts: GoMap<T, int> = GoMapMake<T, int>(keyDescriptor);
  for (const v of s1) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  for (const v of s2) {
    counts.set(v, (counts.get(v) ?? 0) - 1);
    if ((counts.get(v) ?? 0) < 0) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::Deduplicate","kind":"func","status":"implemented","sigHash":"9a48c7a2471597670d0e43bc7482ff4566ad093029c455021cff6f30490e2bd3"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased element type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func Deduplicate[T comparable](slice []T) []T {
 * 	if len(slice) > 1 {
 * 		for i, value := range slice {
 * 			if slices.Contains(slice[:i], value) {
 * 				result := slices.Clone(slice[:i])
 * 				for i++; i < len(slice); i++ {
 * 					value = slice[i]
 * 					if !slices.Contains(result, value) {
 * 						result = append(result, value)
 * 					}
 * 				}
 * 				return result
 * 			}
 * 		}
 * 	}
 * 	return slice
 * }
 */
export function Deduplicate<T extends GoComparable>(slice: GoSlice<T>, equal: GoEquality<T>): GoSlice<T> {
  if (slice.length > 1) {
    for (let i = 0; i < slice.length; i++) {
      let value = slice[i]!;
      if (slices.Contains(slice.slice(0, i), value, equal)) {
        let result = slices.Clone(slice.slice(0, i))!;
        for (i++; i < slice.length; i++) {
          value = slice[i]!;
          if (!slices.Contains(result, value, equal)) {
            result = GoAppend(result, value);
          }
        }
        return result;
      }
    }
  }
  return slice;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::DeduplicateSorted","kind":"func","status":"implemented","sigHash":"12b85e5ed219868935300ff9c7e3be0ab744d40fa405cee9957a43b28e5225d3"}
 *
 * Go source:
 * func DeduplicateSorted[T any](slice []T, isEqual func(a, b T) bool) []T {
 * 	if len(slice) == 0 {
 * 		return slice
 * 	}
 * 	last := slice[0]
 * 	deduplicated := slice[:1]
 * 	for i := 1; i < len(slice); i++ {
 * 		next := slice[i]
 * 		if isEqual(last, next) {
 * 			continue
 * 		}
 * 
 * 		deduplicated = append(deduplicated, next)
 * 		last = next
 * 	}
 * 
 * 	return deduplicated
 * }
 */
export function DeduplicateSorted<T>(slice: GoSlice<T>, isEqual: GoFunc<(a: T, b: T) => bool>): GoSlice<T> {
  if (slice.length === 0) {
    return slice;
  }
  let last = slice[0]!;
  let deduplicated: GoSlice<T> = GoSlicePrefix(slice, 1);
  for (let i = 1; i < slice.length; i++) {
    const next = slice[i]!;
    if (isEqual!(last, next)) {
      continue;
    }

    deduplicated = GoAppend(deduplicated, next);
    last = next;
  }

  return deduplicated;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/core.go::func::CompareBooleans","kind":"func","status":"implemented","sigHash":"7f38a848c414971d081c502cd2de8edd17a25246bded4e2ad8a6d864fd2ccb4b"}
 *
 * Go source:
 * func CompareBooleans(a, b bool) int {
 * 	if a && !b {
 * 		return 1
 * 	} else if !a && b {
 * 		return -1
 * 	}
 * 	return 0
 * }
 */
export function CompareBooleans(a: bool, b: bool): int {
  if (a && !b) {
    return 1;
  } else if (!a && b) {
    return -1;
  }
  return 0;
}
