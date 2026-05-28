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
  SymbolFlags,
  isBigIntLiteral,
  isIdentifier,
  isObjectBindingPattern,
  isArrayBindingPattern,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isMethodSignatureDeclaration,
  isNumericLiteral,
  isPrefixUnaryExpression,
  isPropertySignatureDeclaration,
  isStringLiteral,
  isTypeLiteralNode,
  isUnionTypeNode,
  type BindingElement,
  type BindingName,
  type LiteralTypeNode,
  type Node as AstNode,
  type Symbol as AstSymbol,
  type TypeLiteralNode,
  type TypeNode,
  type UnionTypeNode,
} from "../ast/index.js";
import { fromString, newPseudoBigInt, parsePseudoBigInt, parseValidBigInt, pseudoBigIntToString, type PseudoBigInt } from "../jsnum/index.js";
import {
  type Type,
  type IntrinsicType,
  type LiteralType,
  type ObjectType,
  type Signature,
  type UnionType,
  type UnionOrIntersectionType,
  TypeFlags,
  ObjectFlags,
} from "./types.js";
import { type Relater, newRelater } from "./relater.js";

export { getTypeOfSymbol, getPropertySymbolOfType, getPropertyTypeOfType } from "./types.js";

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
  readonly bigintLiteralTypes: Map<string, Type>;
  // Union interning by sorted constituent type ids (mirrors TS-Go's unionTypes
  // cache). Preseeded with the canonical `false | true` -> booleanType entry.
  readonly unionTypes: Map<string, Type>;
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
    bigintLiteralTypes: new Map<string, Type>(),
    unionTypes: new Map<string, Type>([[unionTypeKey([regularFalseType, regularTrueType]), booleanType]]),
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
// Boolean. TS-Go models `boolean` as the canonical union `false | true`
// (checker.go:991 `c.booleanType = c.getUnionType([regularFalseType, regularTrueType])`),
// NOT as a standalone intrinsic. The two boolean literal singletons are created
// first (fixed ids), then `booleanType` is a fixed union of them. `getUnionType`
// interns by sorted constituent ids and `newCheckState` preseeds the
// `[false,true]` key, so `false | true` (in any order) normalizes back to this
// exact object — making boolean <-> `false | true` assignability fall out of
// identity rather than a special case.
// ---------------------------------------------------------------------------

function fixedLiteralType(id: number, flags: TypeFlags, value: boolean): Type {
  const data: LiteralType = { value };
  const type: Type = { flags, id, data };
  data.regularType = type;
  return type;
}

export const regularFalseType: Type = fixedLiteralType(12, TypeFlags.BooleanLiteral, false);
export const regularTrueType: Type = fixedLiteralType(13, TypeFlags.BooleanLiteral, true);

function fixedUnionType(id: number, flags: TypeFlags, types: readonly Type[]): Type {
  const data: UnionType = { types, objectFlags: ObjectFlags.None };
  return { flags, id, data };
}

// booleanType is the canonical `false | true` union that ALSO carries
// TypeFlags.Boolean, matching TS-Go (getUnionType flags a two-member
// boolean-literal union with TypeFlags.Boolean). The TypeFlags.Boolean fast
// paths in relater.ts / printer.ts are live against this object.
export const booleanType: Type = fixedUnionType(5, TypeFlags.Union | TypeFlags.Boolean, [regularFalseType, regularTrueType]);

export function getBooleanLiteralType(value: boolean): Type {
  return value ? regularTrueType : regularFalseType;
}

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

export interface FunctionParameter {
  readonly name: string;
  readonly type: Type;
  readonly optional?: boolean;
  readonly rest?: boolean;
}

export function makeFunctionType(returnType: Type, state: CheckState, parameters: readonly FunctionParameter[] = []): Type {
  const parameterSymbols = parameters.map((parameter) =>
    ({
      name: parameter.name,
      type: parameter.type,
      flags: parameter.optional === true ? SymbolFlags.Optional : 0,
      rest: parameter.rest === true,
      declarations: [],
    }) as unknown as AstSymbol,
  );
  // Required arity excludes optional and rest parameters.
  const minArgumentCount = parameters.filter((parameter) => parameter.optional !== true && parameter.rest !== true).length;
  const signature: Signature = {
    flags: 0,
    parameters: parameterSymbols,
    minArgumentCount,
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

export function getCallSignature(type: Type): Signature | undefined {
  return (type.data as ObjectType | undefined)?.declaredCallSignatures?.[0];
}

export function getFunctionReturnType(type: Type): Type {
  const data = type.data as ObjectType | undefined;
  return data?.declaredCallSignatures?.[0]?.resolvedReturnType ?? unresolvedType;
}

// SymbolFlags.Optional carried on a synthetic property symbol.
export function isOptionalSymbol(symbol: AstSymbol | undefined): boolean {
  return (((symbol as unknown as { readonly flags?: number } | undefined)?.flags ?? 0) & SymbolFlags.Optional) !== 0;
}

// Rest parameter marker on a synthetic parameter symbol.
export function isRestSymbol(symbol: AstSymbol | undefined): boolean {
  return (symbol as unknown as { readonly rest?: boolean } | undefined)?.rest === true;
}

// ---------------------------------------------------------------------------
// Anonymous object types (object literals + `{ ... }` type literals). The
// relater compares object types structurally via `type.symbol.members`
// (Map<string, Symbol>) where each property symbol carries its checker `type`,
// so construction mirrors that contract. Property type lives on the synthetic
// symbol (the relater's existing shortcut for getTypeOfSymbol).
// ---------------------------------------------------------------------------

interface PropertySymbol {
  readonly name: string;
  readonly type: Type;
  readonly flags: number;
  readonly declarations: readonly AstNode[];
}

export interface ObjectProperty {
  readonly name: string;
  readonly type: Type;
  readonly optional?: boolean;
}

export function makeObjectType(properties: readonly ObjectProperty[], state: CheckState): Type {
  const members = new Map<string, AstSymbol>();
  for (const property of properties) {
    const symbol: PropertySymbol = {
      name: property.name,
      type: property.type,
      flags: property.optional === true ? SymbolFlags.Optional : 0,
      declarations: [],
    };
    members.set(property.name, symbol as unknown as AstSymbol);
  }
  const data: ObjectType = { objectFlags: ObjectFlags.Anonymous };
  const typeSymbol = { name: "__object", declarations: [], members } as unknown as AstSymbol;
  return { flags: TypeFlags.Object, id: state.nextTypeId(), data, symbol: typeSymbol };
}

function objectTypeMembers(type: Type): ReadonlyMap<string, PropertySymbol> | undefined {
  return (type.symbol as unknown as { readonly members?: Map<string, PropertySymbol> } | undefined)?.members;
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

// Stable interning key: sorted constituent type ids. `false | true` in either
// order maps to the same key (and to the preseeded booleanType).
function unionTypeKey(types: readonly Type[]): string {
  return types.map((t) => t.id).sort((a, b) => a - b).join(",");
}

// The exact two-member `false | true` union (TS-Go marks it with TypeFlags.Boolean).
function isCanonicalBooleanUnion(types: readonly Type[]): boolean {
  return types.length === 2 && types.includes(regularFalseType) && types.includes(regularTrueType);
}

function makeUnionType(types: readonly Type[], state: CheckState): Type {
  const key = unionTypeKey(types);
  const cached = state.unionTypes.get(key);
  if (cached !== undefined) return cached;
  const flags = isCanonicalBooleanUnion(types) ? TypeFlags.Union | TypeFlags.Boolean : TypeFlags.Union;
  const data: UnionOrIntersectionType = { types, objectFlags: ObjectFlags.None };
  const type: Type = { flags, id: state.nextTypeId(), data };
  state.unionTypes.set(key, type);
  return type;
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
  void alias;
  void origin;
  if (types.length === 0) return neverType;
  const typeSet: Type[] = [];
  addTypesToUnion(typeSet, types);
  const reduced = reduceUnion(typeSet, reduction, state);
  if (reduced.length === 0) return neverType;
  if (reduced.length === 1) return reduced[0]!;
  return makeUnionType(reduced, state);
}

function reduceUnion(typeSet: Type[], reduction: UnionReduction, state: CheckState): Type[] {
  if (reduction === UnionReduction.None) return typeSet;
  const includes = typeSet.reduce((acc, t) => acc | t.flags, 0 as TypeFlags);
  const afterLiteral = removeRedundantLiteralTypes(typeSet, includes);
  if (reduction === UnionReduction.Subtype) {
    return [...state.relater.removeSubtypes(afterLiteral, false)];
  }
  return afterLiteral;
}

// TS-Go removeRedundantLiteralTypes: drop a literal constituent when its base
// primitive is already in the union, and drop a fresh literal when its regular
// type is already present. No BooleanLiteral/Boolean rule: `booleanType` is now
// the `false | true` union, so `boolean | false` collapses via union flattening
// + identity dedup, not a Boolean-flag special case.
function removeRedundantLiteralTypes(types: Type[], includes: TypeFlags): Type[] {
  return types.filter((t) => {
    const remove =
      ((t.flags & TypeFlags.StringLiteral) !== 0 && (includes & TypeFlags.String) !== 0)
      || ((t.flags & TypeFlags.NumberLiteral) !== 0 && (includes & TypeFlags.Number) !== 0)
      || ((t.flags & TypeFlags.BigIntLiteral) !== 0 && (includes & TypeFlags.BigInt) !== 0)
      || (isFreshLiteralType(t) && (t.data as LiteralType).regularType !== undefined && types.includes((t.data as LiteralType).regularType!));
    return !remove;
  });
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

function newLiteralType(flags: TypeFlags, value: string | number | boolean | PseudoBigInt, regularType: Type | undefined, state: CheckState): Type {
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

export function getBigIntLiteralType(value: PseudoBigInt, state: CheckState): Type {
  const key = pseudoBigIntToString(value);
  const cached = state.bigintLiteralTypes.get(key);
  if (cached !== undefined) return cached;
  const type = newLiteralType(TypeFlags.BigIntLiteral, value, undefined, state);
  state.bigintLiteralTypes.set(key, type);
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

export function getRegularTypeOfLiteralType(type: Type, state: CheckState): Type {
  if ((type.flags & TypeFlags.Freshable) !== 0) {
    return (type.data as LiteralType).regularType ?? type;
  }
  if ((type.flags & TypeFlags.Union) !== 0) {
    const data = type.data as UnionType;
    if (data.regularType === undefined) {
      const regular = (unionConstituents(type) ?? []).map((t) => getRegularTypeOfLiteralType(t, state));
      data.regularType = getUnionType(regular, state);
    }
    return data.regularType;
  }
  return type;
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

// ---------------------------------------------------------------------------
// Truthiness / nullability facts (the subset of TS-Go getTypeFacts +
// falsy-flag helpers needed for `&&` / `||` / `??` result types). Scoped to the
// primitive / literal / union types the checker currently models.
// ---------------------------------------------------------------------------

function unionMembers(type: Type): readonly Type[] {
  return (type.flags & TypeFlags.Union) !== 0 ? (unionConstituents(type) ?? [type]) : [type];
}

function mapType(type: Type, f: (t: Type) => Type, state: CheckState): Type {
  if ((type.flags & TypeFlags.Union) === 0) return f(type);
  return getUnionType((unionConstituents(type) ?? []).map(f), state);
}

function filterType(type: Type, predicate: (t: Type) => boolean, state: CheckState): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : neverType;
  return getUnionType((unionConstituents(type) ?? []).filter(predicate), state);
}

function isZeroPseudoBigInt(value: PseudoBigInt): boolean {
  return pseudoBigIntToString(value) === "0";
}

// Value-based false-literal test (matches fresh AND regular `false`, unlike an
// identity check against regularFalseType).
function isFalseLiteralType(t: Type): boolean {
  return (t.flags & TypeFlags.BooleanLiteral) !== 0 && (t.data as LiteralType).value === false;
}

// A single (non-union) constituent can hold a truthy value.
function constituentCanBeTruthy(t: Type): boolean {
  if ((t.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
  if ((t.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void | TypeFlags.Never)) !== 0) return false;
  if ((t.flags & TypeFlags.StringLiteral) !== 0) return (t.data as LiteralType).value !== "";
  if ((t.flags & TypeFlags.NumberLiteral) !== 0) return (t.data as LiteralType).value !== 0;
  if ((t.flags & TypeFlags.BigIntLiteral) !== 0) return !isZeroPseudoBigInt((t.data as LiteralType).value as PseudoBigInt);
  if ((t.flags & TypeFlags.BooleanLiteral) !== 0) return (t.data as LiteralType).value === true;
  return true;
}

// A single (non-union) constituent can hold a falsy value.
function constituentCanBeFalsy(t: Type): boolean {
  if ((t.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
  if ((t.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) !== 0) return true;
  if ((t.flags & TypeFlags.Never) !== 0) return false;
  if ((t.flags & TypeFlags.StringLiteral) !== 0) return (t.data as LiteralType).value === "";
  if ((t.flags & TypeFlags.NumberLiteral) !== 0) return (t.data as LiteralType).value === 0;
  if ((t.flags & TypeFlags.BigIntLiteral) !== 0) return isZeroPseudoBigInt((t.data as LiteralType).value as PseudoBigInt);
  if ((t.flags & TypeFlags.BooleanLiteral) !== 0) return (t.data as LiteralType).value === false;
  // Base string / number / bigint can be "" / 0 / 0n.
  return (t.flags & (TypeFlags.String | TypeFlags.Number | TypeFlags.BigInt)) !== 0;
}

// hasTypeFacts(type, Truthy): some constituent can be truthy.
export function isPossiblyTruthy(type: Type): boolean {
  return unionMembers(type).some(constituentCanBeTruthy);
}

// hasTypeFacts(type, Falsy): some constituent can be falsy.
export function isPossiblyFalsy(type: Type): boolean {
  return unionMembers(type).some(constituentCanBeFalsy);
}

// hasTypeFacts(type, EQUndefinedOrNull): some constituent is null/undefined/void
// (void carries the EQUndefined fact in TS-Go). any/unknown nullish handling is
// deferred — they need a `{}`/non-nullish-unknown representation the checker
// does not model yet (`any ?? x` already yields `any` via the left branch).
export function isPossiblyNullOrUndefined(type: Type): boolean {
  return unionMembers(type).some((t) => (t.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) !== 0);
}

// TS-Go GetNonNullableType: drop null/undefined/void constituents.
export function getNonNullableType(type: Type, state: CheckState): Type {
  return filterType(type, (t) => (t.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) === 0, state);
}

// TS-Go getDefinitelyFalsyPartOfType: the always-falsy projection of a type.
function getDefinitelyFalsyPartOfType(t: Type, state: CheckState): Type {
  if ((t.flags & TypeFlags.String) !== 0) return getStringLiteralType("", state);
  if ((t.flags & TypeFlags.Number) !== 0) return getNumberLiteralType(0, state);
  if ((t.flags & TypeFlags.BigInt) !== 0) return getBigIntLiteralType(parseValidBigInt("0n"), state);
  if (isFalseLiteralType(t)
    || (t.flags & (TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null | TypeFlags.Any | TypeFlags.Unknown)) !== 0
    || ((t.flags & TypeFlags.StringLiteral) !== 0 && (t.data as LiteralType).value === "")
    || ((t.flags & TypeFlags.NumberLiteral) !== 0 && (t.data as LiteralType).value === 0)
    || ((t.flags & TypeFlags.BigIntLiteral) !== 0 && isZeroPseudoBigInt((t.data as LiteralType).value as PseudoBigInt))) {
    return t;
  }
  return neverType;
}

// TS-Go extractDefinitelyFalsyTypes / removeDefinitelyFalsyTypes.
export function extractDefinitelyFalsyTypes(type: Type, state: CheckState): Type {
  return mapType(type, (t) => getDefinitelyFalsyPartOfType(t, state), state);
}

export function removeDefinitelyFalsyTypes(type: Type, state: CheckState): Type {
  return filterType(type, constituentCanBeTruthy, state);
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
  return getRegularTypeOfLiteralType(contextual, state);
}

// Shared fresh-literal construction for literal expressions AND literal type
// nodes (so the two paths can't drift). Returns undefined for non-literals.
export function literalTypeFromLiteralExpression(literal: AstNode, state: CheckState): Type | undefined {
  if (isStringLiteral(literal)) {
    return getFreshTypeOfLiteralType(getStringLiteralType(literal.text, state), state);
  }
  if (isNumericLiteral(literal)) {
    return getFreshTypeOfLiteralType(getNumberLiteralType(fromString(literal.text), state), state);
  }
  if (isBigIntLiteral(literal)) {
    return getFreshTypeOfLiteralType(getBigIntLiteralType(parseValidBigInt(literal.text), state), state);
  }
  if (literal.kind === Kind.TrueKeyword) {
    return getFreshTypeOfLiteralType(getBooleanLiteralType(true), state);
  }
  if (literal.kind === Kind.FalseKeyword) {
    return getFreshTypeOfLiteralType(getBooleanLiteralType(false), state);
  }
  // `null` is the intrinsic nullType, not a fresh literal type (mirrors TS-Go,
  // where the null literal resolves directly to the null intrinsic).
  if (literal.kind === Kind.NullKeyword) {
    return nullType;
  }
  return undefined;
}

// Negative numeric / bigint literal types for `-<literal>` prefix-unary
// expressions (mirrors TS-Go's KindMinusToken literal special-cases).
export function getNegatedLiteralType(operand: AstNode, state: CheckState): Type | undefined {
  if (isNumericLiteral(operand)) {
    return getFreshTypeOfLiteralType(getNumberLiteralType(-fromString(operand.text), state), state);
  }
  if (isBigIntLiteral(operand)) {
    const value = newPseudoBigInt(parsePseudoBigInt(operand.text), true);
    return getFreshTypeOfLiteralType(getBigIntLiteralType(value, state), state);
  }
  return undefined;
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
  if (isUnionTypeNode(type)) {
    return getUnionType((type as UnionTypeNode).types.map((member) => typeFromTypeNode(member, state)), state);
  }
  if (isTypeLiteralNode(type)) {
    return typeFromTypeLiteralNode(type, state);
  }
  return anyType;
}

// `{ name: T; ... }` type literals: build an anonymous object type from the
// property signatures (only named property signatures are modeled in this
// tranche; index/call/construct signatures are deferred).
function typeFromTypeLiteralNode(node: TypeLiteralNode, state: CheckState): Type {
  const properties: ObjectProperty[] = [];
  for (const member of node.members) {
    if (isPropertySignatureDeclaration(member) && isIdentifier(member.name)) {
      properties.push({
        name: member.name.text,
        type: typeFromTypeNode(member.type, state),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else if (isMethodSignatureDeclaration(member) && isIdentifier(member.name)) {
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      const parameters = member.parameters
        .filter((parameter) => isIdentifier(parameter.name))
        .map((parameter) => ({
          name: (parameter.name as { readonly text: string }).text,
          type: parameter.type === undefined ? anyType : typeFromTypeNode(parameter.type, state),
          optional: parameter.questionToken !== undefined || parameter.initializer !== undefined,
          rest: parameter.dotDotDotToken !== undefined,
        }));
      properties.push({
        name: member.name.text,
        type: makeFunctionType(returnType, state, parameters),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else {
      // Index/call/construct signatures + non-identifier names aren't modeled
      // yet; surface explicitly rather than silently dropping the member.
      state.diagnostics.push({ message: `Type member kind '${Kind[member.kind]}' is not yet supported by the checker.` });
    }
  }
  return makeObjectType(properties, state);
}

// Literal type nodes resolve to the REGULAR literal type via the shared
// literal-construction path (mirrors TS-Go
// getRegularTypeOfLiteralType(checkExpression(literal))). Covers string /
// number / bigint / true / false / null, plus `-<numeric|bigint>` prefix-minus
// literal nodes routed through the same negated-literal helper as expression
// inference (matching TS-Go's parseLiteralTypeNode(negative) shape).
function typeFromLiteralTypeNode(node: LiteralTypeNode, state: CheckState): Type {
  const literal = node.literal;
  const fresh = isPrefixUnaryExpression(literal) && literal.operator === Kind.MinusToken
    ? getNegatedLiteralType(literal.operand, state)
    : literalTypeFromLiteralExpression(literal, state);
  return fresh !== undefined ? getRegularTypeOfLiteralType(fresh, state) : anyType;
}

// Pure assignability check + diagnostic. Callers are responsible for any
// contextual widening of `actual` (via getWidenedLiteralLikeTypeForContextualType)
// before calling — matching TS-Go, where widening happens at the
// inference/initializer sites, not in the relation itself.
export function checkAssignable(actual: Type, expected: Type, state: CheckState): void {
  if (!state.relater.isTypeAssignableTo(actual, expected)) {
    // Per-property elaboration comes from the relation path (relater records the
    // failing property + incompatible types); the checker only formats it.
    const failing = state.relater.failingProperty;
    const elaboration = failing === undefined
      ? ""
      : `\n  Types of property '${failing.name}' are incompatible.`
        + `\n    Type '${displayType(failing.source)}' is not assignable to type '${displayType(failing.target)}'.`;
    state.diagnostics.push({
      message: `Type '${displayType(actual)}' is not assignable to type '${displayType(expected)}'.${elaboration}`,
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
    const constituents = unionConstituents(type) ?? [];
    // Collapse the canonical `false`+`true` pair to `boolean`, emitted at the
    // position of its first member (mirrors TS-Go formatUnionTypes).
    const hasBooleanPair = constituents.includes(regularFalseType) && constituents.includes(regularTrueType);
    if (!hasBooleanPair) {
      return constituents.map(displayType).join(" | ");
    }
    const firstBooleanIndex = constituents.findIndex((t) => t === regularFalseType || t === regularTrueType);
    return constituents
      .flatMap((t, i) =>
        t === regularFalseType || t === regularTrueType
          ? (i === firstBooleanIndex ? ["boolean"] : [])
          : [displayType(t)],
      )
      .join(" | ");
  }
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return JSON.stringify((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return `${pseudoBigIntToString((type.data as LiteralType).value as PseudoBigInt)}n`;
  if (isFunctionType(type)) return "function";
  if ((type.flags & TypeFlags.Object) !== 0) {
    const members = objectTypeMembers(type);
    if (members !== undefined) {
      const entries = [...members.values()].map((m) => `${m.name}: ${displayType(m.type)}`);
      return entries.length === 0 ? "{}" : `{ ${entries.join("; ")} }`;
    }
    return "object";
  }
  const name = (type.data as IntrinsicType | undefined)?.intrinsicName;
  if (name === undefined || name === "error") return "unknown";
  return name;
}
