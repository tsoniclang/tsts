import type { int, uint, bool } from "@tsonic/core/types.js";
import type { GoSlice } from "./compat.js";

// Go: package reflect
//
// Go's reflect package exposes the runtime type system. TypeScript has no
// equivalent static-type metadata, so this port implements the faithfully
// portable subset that typescript-go relies on at runtime:
//
//   - Kind constants (compared as distinct sentinel values).
//   - TypeOf(v).Kind() / ValueOf(v) over *runtime JS values* (the values produced
//     by JSON parsing: string/bool/number/array/Map/object/nil), with the Value
//     methods tsgo uses (Kind, Len, Index, Int, Uint, String, Bool, IsNil,
//     Interface).
//   - DeepEqual (structural deep equality).
//
// Operations that depend on Go's *static* struct type metadata (field layout,
// settable fields, typed zero values, MakeSlice over a concrete element type,
// generic TypeFor[T], interface TypeAssert) cannot be reproduced faithfully in
// TypeScript and are explicit throws. They are reached only through internal
// struct-marshaling code paths that themselves require TSTS extension hooks.

// Kind represents the specific kind of type that a Type represents (Go: reflect.Kind).
export type Kind = int;

// Kind constants. Values match Go's iota ordering in reflect/type.go so that any
// numeric comparison or ordering matches Go exactly.
export const Invalid: Kind = 0 as Kind;
export const Bool: Kind = 1 as Kind;
export const Int: Kind = 2 as Kind;
export const Int8: Kind = 3 as Kind;
export const Int16: Kind = 4 as Kind;
export const Int32: Kind = 5 as Kind;
export const Int64: Kind = 6 as Kind;
export const Uint: Kind = 7 as Kind;
export const Uint8: Kind = 8 as Kind;
export const Uint16: Kind = 9 as Kind;
export const Uint32: Kind = 10 as Kind;
export const Uint64: Kind = 11 as Kind;
export const Uintptr: Kind = 12 as Kind;
export const Float32: Kind = 13 as Kind;
export const Float64: Kind = 14 as Kind;
export const Complex64: Kind = 15 as Kind;
export const Complex128: Kind = 16 as Kind;
export const Array: Kind = 17 as Kind;
export const Chan: Kind = 18 as Kind;
export const Func: Kind = 19 as Kind;
export const Interface: Kind = 20 as Kind;
export const Map: Kind = 21 as Kind;
export const Pointer: Kind = 22 as Kind;
export const Slice: Kind = 23 as Kind;
export const String: Kind = 24 as Kind;
export const Struct: Kind = 25 as Kind;
export const UnsafePointer: Kind = 26 as Kind;

// Classify a runtime JS value into the Go Kind that typescript-go would observe
// for the corresponding JSON-parsed Go value.
//
// JSON-parsed Go values: bool, float64 (all JSON numbers), string, []any (Slice),
// *collections.OrderedMap (object) -> modeled here as Map for plain objects/Maps.
// A nil interface value has Kind Invalid.
function classifyKind(value: unknown): Kind {
  if (value === undefined || value === null) {
    return Invalid;
  }
  if (typeof value === "boolean") {
    return Bool;
  }
  if (typeof value === "number") {
    // JSON numbers decode to Go float64.
    return Float64;
  }
  if (typeof value === "bigint") {
    return Int64;
  }
  if (typeof value === "string") {
    return String;
  }
  if (globalThis.Array.isArray(value)) {
    return Slice;
  }
  if (value instanceof globalThis.Map) {
    return Map;
  }
  // Plain object -> treated as a Go map/object value.
  return Map;
}

// Type is the representation of a Go type. Over runtime values we can only report
// the value's Kind; structural type identity is not available.
export interface Type {
  Kind(): Kind;
}

// Value is the reflection interface to a Go value. This models a runtime JS value.
export class Value {
  // The wrapped runtime value (mutable container is intrinsic to reflect.Value).
  private readonly v: unknown;

  constructor(v: unknown) {
    this.v = v;
  }

  // Kind returns v's Kind.
  Kind(): Kind {
    return classifyKind(this.v);
  }

  // Type returns v's type.
  Type(): Type {
    const kind = classifyKind(this.v);
    return { Kind: (): Kind => kind };
  }

  // IsNil reports whether its argument v is nil. Valid for chan, func, interface,
  // map, pointer, or slice values.
  IsNil(): bool {
    return this.v === undefined || this.v === null;
  }

  // IsZero reports whether v is the zero value for its type.
  IsZero(): bool {
    if (this.v === undefined || this.v === null) return true;
    if (typeof this.v === "boolean") return this.v === false;
    if (typeof this.v === "number") return this.v === 0;
    if (typeof this.v === "bigint") return this.v === 0n;
    if (typeof this.v === "string") return this.v === "";
    if (globalThis.Array.isArray(this.v)) return (this.v as unknown[]).length === 0;
    if (this.v instanceof globalThis.Map) return this.v.size === 0;
    return false;
  }

  // IsValid reports whether v represents a value (a non-nil, non-Invalid kind).
  IsValid(): bool {
    return this.v !== undefined && this.v !== null;
  }

  // Len returns v's length. Valid for Array, Chan, Map, Slice, String.
  Len(): int {
    if (typeof this.v === "string") {
      return this.v.length as int;
    }
    if (globalThis.Array.isArray(this.v)) {
      return this.v.length as int;
    }
    if (this.v instanceof globalThis.Map) {
      return this.v.size as int;
    }
    throw new globalThis.Error("reflect: call of reflect.Value.Len on " + this.Kind() + " value");
  }

  // Index returns v's i'th element. Valid for Array, Slice, String.
  Index(i: int): Value {
    if (globalThis.Array.isArray(this.v)) {
      return new Value(this.v[i]);
    }
    if (typeof this.v === "string") {
      // Go indexes a string by byte; the JS analog over a code unit is sufficient
      // for the slice-iteration paths tsgo uses (it only iterates real slices).
      return new Value(this.v.charCodeAt(i));
    }
    throw new globalThis.Error("reflect: call of reflect.Value.Index on " + this.Kind() + " value");
  }

  // Int returns v's underlying value, as an int64. Valid for the int kinds.
  Int(): int {
    if (typeof this.v === "number") {
      return globalThis.Math.trunc(this.v) as int;
    }
    if (typeof this.v === "bigint") {
      return globalThis.Number(this.v) as int;
    }
    throw new globalThis.Error("reflect: call of reflect.Value.Int on " + this.Kind() + " value");
  }

  // Uint returns v's underlying value, as a uint64. Valid for the uint kinds.
  Uint(): uint {
    if (typeof this.v === "number") {
      return globalThis.Math.trunc(this.v) as uint;
    }
    if (typeof this.v === "bigint") {
      return globalThis.Number(this.v) as uint;
    }
    throw new globalThis.Error("reflect: call of reflect.Value.Uint on " + this.Kind() + " value");
  }

  // String returns the string v's underlying value, as a string. For non-string
  // kinds Go returns "<kind Value>"; here we only support the String kind path
  // that tsgo exercises (resolveKeyName checks Kind == String first).
  String(): string {
    if (typeof this.v === "string") {
      return this.v;
    }
    return "<" + this.Kind() + " Value>";
  }

  // Bool returns v's underlying value. Valid for the Bool kind.
  Bool(): bool {
    if (typeof this.v === "boolean") {
      return this.v;
    }
    throw new globalThis.Error("reflect: call of reflect.Value.Bool on " + this.Kind() + " value");
  }

  // Interface returns v's current value as an interface{} (the raw JS value).
  Interface(): unknown {
    return this.v;
  }
}

// TypeOf returns the reflection Type that represents the dynamic type of the
// runtime value. Returns undefined when the value is nil (Go returns nil Type).
export function TypeOf(value: unknown): Type | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const kind = classifyKind(value);
  return { Kind: (): Kind => kind };
}

// ValueOf returns a new Value initialized to the concrete value stored in the
// interface i.
export function ValueOf(value: unknown): Value {
  return new Value(value);
}

// DeepEqual reports whether x and y are "deeply equal". This is a faithful
// structural comparison: same type, recursively equal elements/fields/entries.
export function DeepEqual(x: unknown, y: unknown): bool {
  return deepEqual(x, y, new globalThis.Set<unknown>());
}

function deepEqual(x: unknown, y: unknown, seen: Set<unknown>): bool {
  if (x === y) {
    return true;
  }
  // NaN is not == itself, but Go's DeepEqual on floats uses ==, so NaN != NaN.
  if (typeof x !== typeof y) {
    return false;
  }
  if (x === null || x === undefined || y === null || y === undefined) {
    // One is nil and they are not ===, so not equal.
    return x === y;
  }
  if (typeof x !== "object") {
    // Primitives already failed === above.
    return false;
  }
  // Guard against cycles (Go's DeepEqual tracks visited pointer pairs).
  if (seen.has(x)) {
    return true;
  }
  seen.add(x);

  const xIsArray = globalThis.Array.isArray(x);
  const yIsArray = globalThis.Array.isArray(y);
  if (xIsArray || yIsArray) {
    if (!xIsArray || !yIsArray) {
      return false;
    }
    const xa = x as unknown[];
    const ya = y as unknown[];
    if (xa.length !== ya.length) {
      return false;
    }
    for (let i = 0; i < xa.length; i = i + 1) {
      if (!deepEqual(xa[i], ya[i], seen)) {
        return false;
      }
    }
    return true;
  }

  if (x instanceof globalThis.Map || y instanceof globalThis.Map) {
    if (!(x instanceof globalThis.Map) || !(y instanceof globalThis.Map)) {
      return false;
    }
    if (x.size !== y.size) {
      return false;
    }
    for (const [k, v] of x.entries()) {
      if (!y.has(k)) {
        return false;
      }
      if (!deepEqual(v, y.get(k), seen)) {
        return false;
      }
    }
    return true;
  }

  // Plain objects: compare own enumerable keys.
  const xObj = x as globalThis.Record<string, unknown>;
  const yObj = y as globalThis.Record<string, unknown>;
  const xKeys = globalThis.Object.keys(xObj);
  const yKeys = globalThis.Object.keys(yObj);
  if (xKeys.length !== yKeys.length) {
    return false;
  }
  for (const key of xKeys) {
    if (!globalThis.Object.prototype.hasOwnProperty.call(yObj, key)) {
      return false;
    }
    if (!deepEqual(xObj[key], yObj[key], seen)) {
      return false;
    }
  }
  return true;
}

// StructField describes a single field in a struct (Go: reflect.StructField).
// Modeled minimally; populated only by the struct-static paths that are not
// faithfully portable here.
export interface StructField {
  readonly Name: string;
  readonly Type: Type;
}

// ---------------------------------------------------------------------------
// Static-type-dependent operations.
//
// These require Go's compile-time struct/type metadata, which does not exist in
// TypeScript. They are reached only through internal struct-marshaling code
// (userpreferences, expected, showconfig) that itself needs TSTS extension hooks
// to bridge Go structs. Implementing them with a runtime guess would silently
// produce wrong results, so they are explicit throws per the faithfulness rules.
// ---------------------------------------------------------------------------

// TypeFor returns the Type that represents the static type T. Go resolves T at
// compile time; TypeScript erases generic type parameters at runtime, so the
// concrete Go type cannot be recovered.
export function TypeFor<T>(): Type {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.TypeFor: requires Go static type metadata (T is erased in TypeScript)",
  );
}

// TypeAssert performs the Go interface type assertion v.(T) via reflection.
// Requires Go interface/method-set metadata that is not available in TypeScript.
export function TypeAssert<T>(_v: Value): [T | undefined, bool] {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.TypeAssert: requires Go interface type-set metadata (T is erased in TypeScript)",
  );
}

// MakeSlice creates a new zero-initialized slice value for the specified slice
// Type, length, and capacity. Requires the concrete element Type to allocate
// typed zero values.
export function MakeSlice(_typ: Type, _len: int, _cap: int): Value {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.MakeSlice: requires concrete Go slice element type metadata",
  );
}

// Append appends the values x to a slice s and returns the resulting slice.
// Requires reflect.Value slice semantics over a typed backing array.
export function Append(_s: Value, ..._x: GoSlice<Value>): Value {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.Append: requires typed reflect.Value slice backing (Go static type metadata)",
  );
}

// Zero returns a Value representing the zero value for the specified type.
// The zero value depends on the concrete Go type, which is not available.
export function Zero(_typ: Type): Value {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.Zero: requires concrete Go type to materialize a typed zero value",
  );
}

// VisibleFields returns all the visible fields in the struct type t, including
// fields inside anonymous struct members. Requires Go struct field metadata.
export function VisibleFields(_t: Type): GoSlice<StructField> {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/reflect.VisibleFields: requires Go struct field layout metadata",
  );
}
