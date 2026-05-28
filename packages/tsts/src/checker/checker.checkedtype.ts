/**
 * Checker — intrinsic type singletons + leaf helpers.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Holds the checker's intrinsic `Type` singletons (the flags-based
 * `Type` from types.ts — the `types.go` port), assignability (delegated
 * to the `Relater`, the `relater.go` port), type-node resolution, and
 * binding-name binding. It depends only on types.ts + relater.ts, so it
 * remains the safe base of the checker's import graph.
 */

import {
  Kind,
  isIdentifier,
  isObjectBindingPattern,
  isArrayBindingPattern,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isNumericLiteral,
  isStringLiteral,
  type BindingElement,
  type BindingName,
  type LiteralTypeNode,
  type TypeNode,
} from "../ast/index.js";
import { fromString } from "../jsnum/index.js";
import {
  type Type,
  type IntrinsicType,
  type LiteralType,
  type ObjectType,
  type Signature,
  type UnionOrIntersectionType,
  TypeFlags,
  ObjectFlags,
} from "./types.js";
import { type Relater, newRelater } from "./relater.js";

export type { Type } from "./types.js";

export interface CheckDiagnostic {
  readonly message: string;
}

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

export interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
  readonly relater: Relater;
  // Literal-type caches (mirror checker.go's stringLiteralTypes /
  // numberLiteralTypes maps), keyed by literal value.
  readonly stringLiteralTypes: Map<string, Type>;
  readonly numberLiteralTypes: Map<number, Type>;
  nextTypeId(): number;
}

export type TypeEnvironment = Map<string, Type>;

export function newCheckState(): CheckState {
  const idSource = { value: 1000 };
  return {
    diagnostics: [],
    relater: newRelater(),
    stringLiteralTypes: new Map<string, Type>(),
    numberLiteralTypes: new Map<number, Type>(),
    nextTypeId: () => {
      idSource.value += 1;
      return idSource.value;
    },
  };
}

// ---------------------------------------------------------------------------
// Intrinsic type singletons (mirror checker.go's `c.anyType` etc., created
// via `newIntrinsicType`). Fixed ids keep them stable across checks.
// ---------------------------------------------------------------------------

function intrinsicType(id: number, flags: TypeFlags, name: string): Type {
  const data: IntrinsicType = { intrinsicName: name, objectFlags: ObjectFlags.None };
  return { flags, id, data };
}

export const anyType: Type = intrinsicType(1, TypeFlags.Any, "any");
export const unknownType: Type = intrinsicType(2, TypeFlags.Unknown, "unknown");
export const numberType: Type = intrinsicType(3, TypeFlags.Number, "number");
export const stringType: Type = intrinsicType(4, TypeFlags.String, "string");
export const booleanType: Type = intrinsicType(5, TypeFlags.Boolean, "boolean");
export const voidType: Type = intrinsicType(6, TypeFlags.Void, "void");
export const undefinedType: Type = intrinsicType(7, TypeFlags.Undefined, "undefined");
export const nullType: Type = intrinsicType(8, TypeFlags.Null, "null");
export const neverType: Type = intrinsicType(9, TypeFlags.Never, "never");
// `unresolvedType` is the checker's error type: Any-flagged so it both
// accepts and is accepted, suppressing cascading diagnostics (mirrors
// checker.go's `errorType`).
export const unresolvedType: Type = intrinsicType(10, TypeFlags.Any, "error");
export const bigintType: Type = intrinsicType(11, TypeFlags.BigInt, "bigint");

// ---------------------------------------------------------------------------
// Intrinsic identity predicates. Intrinsics are singletons, so identity is
// an exact discriminant (and distinguishes `any` from the error type, which
// share TypeFlags.Any).
// ---------------------------------------------------------------------------

export function isAnyType(type: Type): boolean { return type === anyType; }
export function isUnknownType(type: Type): boolean { return type === unknownType; }
export function isUnresolvedType(type: Type): boolean { return type === unresolvedType; }
export function isNumberType(type: Type): boolean { return type === numberType; }
export function isStringType(type: Type): boolean { return type === stringType; }
export function isBooleanType(type: Type): boolean { return type === booleanType; }

// ---------------------------------------------------------------------------
// Function types: anonymous object types carrying a single call signature
// (the on-model representation — functions are object types in TS-Go).
// ---------------------------------------------------------------------------

export function makeFunctionType(returnType: Type, state: CheckState): Type {
  const signature: Signature = {
    flags: 0,
    parameters: [],
    minArgumentCount: 0,
    resolvedReturnType: returnType,
  };
  const data: ObjectType = {
    objectFlags: ObjectFlags.Anonymous,
    declaredCallSignatures: [signature],
  };
  return { flags: TypeFlags.Object, id: state.nextTypeId(), data };
}

export function isFunctionType(type: Type): boolean {
  if ((type.flags & TypeFlags.Object) === 0) return false;
  const data = type.data as ObjectType | undefined;
  return data?.declaredCallSignatures !== undefined && data.declaredCallSignatures.length > 0;
}

export function getFunctionReturnType(type: Type): Type {
  const data = type.data as ObjectType | undefined;
  return data?.declaredCallSignatures?.[0]?.resolvedReturnType ?? unresolvedType;
}

// ---------------------------------------------------------------------------
// Union types. Constituents live on `Type.data` (UnionOrIntersectionType) so
// the relater's constituentTypes reads them. The surface mirrors TS-Go's
// `getUnionType` / `getUnionTypeEx` / `addTypesToUnion` family. Reduction
// (Literal/Subtype) is not yet implemented — only union flattening + identity
// dedup; full normalization (subtype reduction, literal collapse, ordering)
// is a later port step that depends on literal types.
// ---------------------------------------------------------------------------

export type UnionReduction = 0 | 1 | 2;
export const UnionReduction = {
  None: 0 as UnionReduction,
  Literal: 1 as UnionReduction,
  Subtype: 2 as UnionReduction,
} as const;

function makeUnionType(types: readonly Type[], state: CheckState): Type {
  const data: UnionOrIntersectionType = { types, objectFlags: ObjectFlags.None };
  return { flags: TypeFlags.Union, id: state.nextTypeId(), data };
}

function addTypeToUnion(typeSet: Type[], type: Type): void {
  // TS-Go ignores `never` constituents in unions (independent of reduction).
  if ((type.flags & TypeFlags.Never) !== 0) return;
  if (!typeSet.includes(type)) typeSet.push(type);
}

function addTypesToUnion(typeSet: Type[], types: readonly Type[]): void {
  for (const type of types) {
    if ((type.flags & TypeFlags.Union) !== 0) {
      addTypesToUnion(typeSet, unionConstituents(type) ?? []);
    } else {
      addTypeToUnion(typeSet, type);
    }
  }
}

export function getUnionType(types: readonly Type[], state: CheckState): Type {
  return getUnionTypeEx(types, UnionReduction.Literal, state);
}

export function getUnionTypeEx(
  types: readonly Type[],
  reduction: UnionReduction,
  state: CheckState,
  alias?: unknown,
  origin?: unknown,
): Type {
  void reduction;
  void alias;
  void origin;
  if (types.length === 0) return neverType;
  const typeSet: Type[] = [];
  addTypesToUnion(typeSet, types);
  if (typeSet.length === 0) return neverType;
  if (typeSet.length === 1) return typeSet[0]!;
  return makeUnionType(typeSet, state);
}

export function unionConstituents(type: Type): readonly Type[] | undefined {
  return (type.data as UnionOrIntersectionType | undefined)?.types;
}

// ---------------------------------------------------------------------------
// Primitive literal types. Faithful to TS-Go's literal model: a regular
// literal (cached by value) plus a lazily-created fresh variant linked via
// `freshType`/`regularType` on `Type.data` (LiteralType). Fresh literals
// widen to their base primitive in widening positions.
// ---------------------------------------------------------------------------

function newLiteralType(flags: TypeFlags, value: string | number | bigint | boolean, regularType: Type | undefined, state: CheckState): Type {
  const data: LiteralType = { value };
  const type: Type = { flags, id: state.nextTypeId(), data };
  data.regularType = regularType ?? type;
  return type;
}

export function getStringLiteralType(value: string, state: CheckState): Type {
  const cached = state.stringLiteralTypes.get(value);
  if (cached !== undefined) return cached;
  const type = newLiteralType(TypeFlags.StringLiteral, value, undefined, state);
  state.stringLiteralTypes.set(value, type);
  return type;
}

export function getNumberLiteralType(value: number, state: CheckState): Type {
  const cached = state.numberLiteralTypes.get(value);
  if (cached !== undefined) return cached;
  const type = newLiteralType(TypeFlags.NumberLiteral, value, undefined, state);
  state.numberLiteralTypes.set(value, type);
  return type;
}

export function getFreshTypeOfLiteralType(type: Type, state: CheckState): Type {
  if ((type.flags & TypeFlags.Freshable) === 0) return type;
  const data = type.data as LiteralType;
  if (data.freshType === undefined) {
    const fresh = newLiteralType(type.flags, data.value, type, state);
    (fresh.data as LiteralType).freshType = fresh;
    data.freshType = fresh;
  }
  return data.freshType;
}

export function getRegularTypeOfLiteralType(type: Type): Type {
  if ((type.flags & TypeFlags.Freshable) === 0) return type;
  return (type.data as LiteralType).regularType ?? type;
}

export function isFreshLiteralType(type: Type): boolean {
  return (type.flags & TypeFlags.Freshable) !== 0 && (type.data as LiteralType).freshType === type;
}

// Widens a FRESH primitive literal to its base primitive (mirrors TS-Go
// getWidenedLiteralType). Regular literals and non-literals are unchanged.
export function getWidenedLiteralType(type: Type): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0 && isFreshLiteralType(type)) return stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0 && isFreshLiteralType(type)) return numberType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0 && isFreshLiteralType(type)) return bigintType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0 && isFreshLiteralType(type)) return booleanType;
  return type;
}

// Widening for assignment/return positions. Primitive-literal + union only;
// object/array literal widening is deferred (needs member resolution).
export function getWidenedType(type: Type, state: CheckState): Type {
  if ((type.flags & TypeFlags.Freshable) !== 0) return getWidenedLiteralType(type);
  if ((type.flags & TypeFlags.Union) !== 0) {
    const widened = (unionConstituents(type) ?? []).map((t) => getWidenedType(t, state));
    return getUnionType(widened, state);
  }
  return type;
}

// Apparent type for member access: a primitive literal's members come from
// its base primitive. Full getApparentType (number→Number interface, etc.)
// is deferred until member resolution lands.
export function getApparentType(type: Type): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return booleanType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  return type;
}

// Boolean literal singletons (TS-Go regularTrueType/regularFalseType). Fresh
// variants are created lazily via getFreshTypeOfLiteralType.
// NOTE (deviation): TS-Go's `booleanType` is the union `false | true`; ours is
// still the intrinsic `booleanType` above. That union shape is deferred.
function fixedLiteralType(id: number, flags: TypeFlags, value: boolean): Type {
  const data: LiteralType = { value };
  const type: Type = { flags, id, data };
  data.regularType = type;
  return type;
}

export const regularFalseType: Type = fixedLiteralType(12, TypeFlags.BooleanLiteral, false);
export const regularTrueType: Type = fixedLiteralType(13, TypeFlags.BooleanLiteral, true);

export function getBooleanLiteralType(value: boolean): Type {
  return value ? regularTrueType : regularFalseType;
}

// Whether a contextual (target) type would preserve a fresh literal source.
function isLiteralLikeContextualType(contextualType: Type): boolean {
  if ((contextualType.flags & TypeFlags.Literal) !== 0) return true;
  if ((contextualType.flags & TypeFlags.Union) !== 0) {
    return (unionConstituents(contextualType) ?? []).some(isLiteralLikeContextualType);
  }
  return false;
}

// Widening at a position with a contextual type: keep the fresh literal when
// the contextual type is literal-like, otherwise widen to base (mirrors
// TS-Go getWidenedLiteralLikeTypeForContextualType). Applied at return /
// assignment / arrow-body check sites — NOT inside checkAssignable.
export function getWidenedLiteralLikeTypeForContextualType(type: Type, contextualType: Type, state: CheckState): Type {
  const contextual = isLiteralLikeContextualType(contextualType) ? type : getWidenedType(type, state);
  // Always pass the regular (non-fresh) literal forward, matching TS-Go's
  // trailing getRegularTypeOfLiteralType.
  return getRegularTypeOfLiteralType(contextual);
}

// ---------------------------------------------------------------------------
// Leaf helpers
// ---------------------------------------------------------------------------

export function typeFromTypeNode(type: TypeNode, state: CheckState): Type {
  if (isKeywordTypeNode(type)) {
    switch (type.kind) {
      case Kind.AnyKeyword:
        return anyType;
      case Kind.BooleanKeyword:
        return booleanType;
      case Kind.NumberKeyword:
        return numberType;
      case Kind.StringKeyword:
        return stringType;
      case Kind.BigIntKeyword:
        return bigintType;
      case Kind.VoidKeyword:
        return voidType;
      case Kind.UndefinedKeyword:
        return undefinedType;
      case Kind.NeverKeyword:
        return neverType;
      case Kind.UnknownKeyword:
        return unknownType;
      default:
        return unknownType;
    }
  }
  if (isLiteralTypeNode(type)) {
    return typeFromLiteralTypeNode(type, state);
  }
  return anyType;
}

// Literal type nodes (`"lit"` / `1` / `true` / `false`) resolve to the
// REGULAR literal type. (Negative numeric, bigint, and null literal type
// nodes are deferred.)
function typeFromLiteralTypeNode(node: LiteralTypeNode, state: CheckState): Type {
  const literal = node.literal;
  if (isStringLiteral(literal)) return getStringLiteralType(literal.text, state);
  if (isNumericLiteral(literal)) return getNumberLiteralType(fromString(literal.text), state);
  if (literal.kind === Kind.TrueKeyword) return getBooleanLiteralType(true);
  if (literal.kind === Kind.FalseKeyword) return getBooleanLiteralType(false);
  return anyType;
}

// Pure assignability check + diagnostic. Callers are responsible for any
// contextual widening of `actual` (via getWidenedLiteralLikeTypeForContextualType)
// before calling — matching TS-Go, where widening happens at the
// inference/initializer sites, not in the relation itself.
export function checkAssignable(actual: Type, expected: Type, state: CheckState): void {
  if (!state.relater.isTypeAssignableTo(actual, expected)) {
    state.diagnostics.push({
      message: `Type '${displayType(actual)}' is not assignable to type '${displayType(expected)}'.`,
    });
  }
}

export function setBindingNameType(name: BindingName, type: Type, environment: TypeEnvironment): void {
  if (isIdentifier(name)) {
    environment.set(name.text, type);
    return;
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      setBindingElementType(element, type, environment);
    }
  }
}

export function setBindingElementType(element: BindingElement, type: Type, environment: TypeEnvironment): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment);
  }
}

export function displayType(type: Type): string {
  if ((type.flags & TypeFlags.Union) !== 0) {
    return (unionConstituents(type) ?? []).map(displayType).join(" | ");
  }
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return JSON.stringify((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return `${(type.data as LiteralType).value}n`;
  if (isFunctionType(type)) return "function";
  const name = (type.data as IntrinsicType | undefined)?.intrinsicName;
  if (name === undefined || name === "error") return "unknown";
  return name;
}
