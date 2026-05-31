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
  KindNames,
  NodeFlags,
  SymbolFlags,
  hasModifier,
  isArrayTypeNode,
  isBigIntLiteral,
  isBindingElement,
  isCallSignatureDeclaration,
  isClassDeclaration,
  isComputedPropertyName,
  isConstructorDeclaration,
  isConstructSignatureDeclaration,
  isFunctionDeclaration,
  isGetAccessorDeclaration,
  isIdentifier,
  isIndexSignatureDeclaration,
  isInterfaceDeclaration,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isNumericLiteral,
  isParameterDeclaration,
  isPrefixUnaryExpression,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isQualifiedName,
  isPrivateIdentifier,
  isNoSubstitutionTemplateLiteral,
  isSetAccessorDeclaration,
  isStringLiteral,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeOperatorNode,
  isTypeReferenceNode,
  isTypeParameterDeclaration,
  isUnionTypeNode,
  isVariableDeclaration,
  type BindingElement,
  type ClassDeclaration,
  type EntityName,
  type Expression,
  type LiteralTypeNode,
  type Node as AstNode,
  type ParameterDeclaration,
  type PropertyName,
  type Statement,
  type Symbol as AstSymbol,
  type TypeAliasDeclaration,
  type TypeLiteralNode,
  type TypeNode,
  type TypeParameterDeclaration,
  type TypeReferenceNode,
  type UnionTypeNode,
} from "../ast/index.js";
import { nodeParent, nodeSymbol } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { NameResolver } from "../binder/index.js";
import { fromString, newPseudoBigInt, parsePseudoBigInt, parseValidBigInt, pseudoBigIntToString, type PseudoBigInt } from "../jsnum/index.js";
import {
  type Type,
  type IndexInfo,
  type IntrinsicType,
  type LiteralType,
  type ObjectType,
  type Signature,
  type UnionType,
  type UnionOrIntersectionType,
  TypeFlags,
  ObjectFlags,
  setBinderSymbolTypeResolver,
} from "./types.js";
import { type Relater, newRelater } from "./relater.js";

export { getTypeOfSymbol, getPropertySymbolOfType, getPropertyTypeOfType } from "./types.js";

export type { Type } from "./types.js";

function kindDebugName(kind: Kind): string {
  return KindNames[kind] ?? String(kind);
}

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
  // Type-declaration caches keyed by binder symbols. Names are resolved through
  // the binder graph, not through a checker-owned string environment.
  readonly declaredTypeResolutions: Map<AstSymbol, Type>;
  readonly genericTypeInstantiations: Map<AstSymbol, Map<string, Type>>;
  readonly typeParameterSubstitutions: Map<AstSymbol, Type>[];
  readonly typeResolutionStack: Set<AstSymbol>;
  readonly cyclicTypeAliases: Set<AstSymbol>;
  readonly reportedCyclicTypeAliases: Set<AstSymbol>;
  nextTypeId(): number;
}

export function newCheckState(): CheckState {
  const idSource = { value: 1000 };
  return {
    diagnostics: [],
    relater: newRelater(),
    stringLiteralTypes: new Map<string, Type>(),
    numberLiteralTypes: new Map<number, Type>(),
    bigintLiteralTypes: new Map<string, Type>(),
    unionTypes: new Map<string, Type>([[unionTypeKey([regularFalseType, regularTrueType]), booleanType]]),
    declaredTypeResolutions: new Map<AstSymbol, Type>(),
    genericTypeInstantiations: new Map<AstSymbol, Map<string, Type>>(),
    typeParameterSubstitutions: [],
    typeResolutionStack: new Set<AstSymbol>(),
    cyclicTypeAliases: new Set<AstSymbol>(),
    reportedCyclicTypeAliases: new Set<AstSymbol>(),
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

export function makeCallSignature(returnType: Type, parameters: readonly FunctionParameter[] = []): Signature {
  const parameterSymbols = parameters.map((parameter) =>
    ({
      name: parameter.name,
      // `synthetic` + `syntheticType` are the checker-created provenance marker
      // getTypeOfSymbol gates on (so a synthetic parameter symbol never goes
      // through the binder flag-dispatch). The synthetic carrier stays — but
      // PROVENANCE-SPECIFIC.
      synthetic: true,
      syntheticType: parameter.type,
      flags: parameter.optional === true ? SymbolFlags.Optional : 0,
      rest: parameter.rest === true,
      declarations: [],
    }) as unknown as AstSymbol,
  );
  // Required arity excludes optional and rest parameters.
  const minArgumentCount = parameters.filter((parameter) => parameter.optional !== true && parameter.rest !== true).length;
  return {
    flags: 0,
    parameters: parameterSymbols,
    minArgumentCount,
    resolvedReturnType: returnType,
  };
}

export function makeFunctionType(returnType: Type, state: CheckState, parameters: readonly FunctionParameter[] = []): Type {
  const data: ObjectType = {
    objectFlags: ObjectFlags.Anonymous,
    declaredCallSignatures: [makeCallSignature(returnType, parameters)],
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

export function getConstructSignature(type: Type): Signature | undefined {
  return (type.data as ObjectType | undefined)?.declaredConstructSignatures?.[0];
}

// Minimal array type: an object type carrying its element type. Enough to
// extract a rest-parameter element type and to display `T[]`; full element-wise
// array relating is a later tranche.
interface ArrayObjectType extends ObjectType {
  readonly elementType: Type;
}

export function makeArrayType(elementType: Type, state: CheckState): Type {
  const data: ArrayObjectType = { objectFlags: ObjectFlags.Anonymous, elementType };
  return { flags: TypeFlags.Object, id: state.nextTypeId(), data };
}

export function getArrayElementType(type: Type): Type | undefined {
  return (type.data as unknown as { readonly elementType?: Type } | undefined)?.elementType;
}

export function getIndexInfos(type: Type): readonly IndexInfo[] | undefined {
  return (type.data as ObjectType | undefined)?.indexInfos;
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
  // `synthetic`/`syntheticType` are the checker-created provenance marker
  // getTypeOfSymbol gates on (mirrors the parameter-symbol carrier above).
  readonly synthetic: true;
  readonly syntheticType: Type;
  readonly flags: number;
  readonly declarations: readonly AstNode[];
}

export interface ObjectProperty {
  readonly name: string;
  readonly type: Type;
  readonly optional?: boolean;
}

export interface ObjectTypeExtras {
  readonly callSignatures?: readonly Signature[];
  readonly constructSignatures?: readonly Signature[];
  readonly indexInfos?: readonly IndexInfo[];
}

export function makeObjectType(properties: readonly ObjectProperty[], state: CheckState, fresh: boolean = false, extras?: ObjectTypeExtras): Type {
  const members = new Map<string, AstSymbol>();
  for (const property of properties) {
    const symbol: PropertySymbol = {
      name: property.name,
      synthetic: true,
      syntheticType: property.type,
      flags: property.optional === true ? SymbolFlags.Optional : 0,
      declarations: [],
    };
    members.set(property.name, symbol as unknown as AstSymbol);
  }
  // Direct object literals are marked fresh; the assignability relation uses
  // freshness to gate excess-property checking. Type-literal types are not fresh.
  const data: ObjectType = {
    objectFlags: fresh ? (ObjectFlags.Anonymous | ObjectFlags.FreshLiteral) : ObjectFlags.Anonymous,
  };
  if (extras?.callSignatures !== undefined) {
    data.declaredCallSignatures = extras.callSignatures;
  }
  if (extras?.constructSignatures !== undefined) {
    data.declaredConstructSignatures = extras.constructSignatures;
  }
  if (extras?.indexInfos !== undefined) {
    data.indexInfos = extras.indexInfos;
  }
  const typeSymbol: AstSymbol = { name: "__object", declarations: [], members };
  return { flags: TypeFlags.Object, id: state.nextTypeId(), data, symbol: typeSymbol };
}

function objectTypeMembers(type: Type): ReadonlyMap<string, PropertySymbol> | undefined {
  return (type.symbol as unknown as { readonly members?: Map<string, PropertySymbol> } | undefined)?.members;
}

// Strip the fresh-literal flag for stored/regular object types (TS-Go
// getRegularTypeOfObjectLiteral), RECURSIVELY — a stored object's nested
// object-literal properties must also lose freshness, or assigning the stored
// variable would still excess-check nested literals. Returns the same type when
// nothing needs regularization (e.g. type-literal object types).
export function getRegularTypeOfObjectLiteral(type: Type, state: CheckState): Type {
  if ((type.flags & TypeFlags.Object) === 0) return type;
  const members = objectTypeMembers(type);
  if (members === undefined) return type;
  const wasFresh = (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.FreshLiteral) !== 0;
  const regularized = [...members.values()].map((member) => ({
    name: member.name,
    regular: getRegularTypeOfObjectLiteral(member.syntheticType, state),
    original: member.syntheticType,
    optional: (member.flags & SymbolFlags.Optional) !== 0,
  }));
  if (!wasFresh && regularized.every((property) => property.regular === property.original)) {
    return type;
  }
  return makeObjectType(regularized.map((property) => ({ name: property.name, type: property.regular, optional: property.optional })), state, false);
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
interface UnionReductionTable {
  readonly None: UnionReduction;
  readonly Literal: UnionReduction;
  readonly Subtype: UnionReduction;
}
export const UnionReduction: UnionReductionTable = {
  None: 0 as UnionReduction,
  Literal: 1 as UnionReduction,
  Subtype: 2 as UnionReduction,
};

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
  if (isArrayTypeNode(type)) {
    return makeArrayType(typeFromTypeNode(type.elementType, state), state);
  }
  if (isTypeOperatorNode(type)) {
    // `readonly T[]` relates element-wise like `T[]` here (readonly affects
    // mutation, not the element-assignability cases modeled). keyof/unique
    // operators are deferred.
    return type.operator === Kind.ReadonlyKeyword ? typeFromTypeNode(type.type, state) : anyType;
  }
  if (isTypeReferenceNode(type)) {
    return typeFromTypeReferenceNode(type, state);
  }
  return anyType;
}

// Resolve a named type reference through the binder symbol graph. A named
// reference must NEVER silently become `any`: unresolved names, unsupported
// generic aliases, and circular aliases each produce a deliberate diagnostic
// and return the error type. Mirrors TS-Go getTypeFromTypeReference plus
// getDeclaredTypeOfTypeAlias/getDeclaredTypeOfClassOrInterface.
function typeFromTypeReferenceNode(type: TypeReferenceNode, state: CheckState): Type {
  const symbol = getTypeSymbolFromEntityName(type.typeName);
  if (symbol === undefined) {
    state.diagnostics.push({ message: `Cannot find name '${entityNameText(type.typeName)}'.` });
    return unresolvedType;
  }
  return getDeclaredTypeOfTypeSymbol(symbol, type.typeArguments, state);
}

function getTypeSymbolFromEntityName(name: EntityName): AstSymbol | undefined {
  if (isIdentifier(name)) {
    return getResolvedTypeSymbol(name.text, name);
  }
  if (isQualifiedName(name)) {
    const left = getTypeSymbolFromEntityName(name.left);
    return left?.exports?.get(name.right.text) ?? left?.members?.get(name.right.text);
  }
  return undefined;
}

function entityNameText(name: EntityName): string {
  if (isIdentifier(name)) return name.text;
  return `${entityNameText(name.left)}.${name.right.text}`;
}

function typeAliasDeclarationOfSymbol(symbol: AstSymbol): TypeAliasDeclaration | undefined {
  const valueDeclaration = symbol.valueDeclaration;
  if (valueDeclaration !== undefined && isTypeAliasDeclaration(valueDeclaration)) {
    return valueDeclaration;
  }
  return symbol.declarations?.find(isTypeAliasDeclaration);
}

function declarationName(symbol: AstSymbol): string {
  return symbol.name ?? "<anonymous>";
}

function getDeclaredTypeOfTypeSymbol(symbol: AstSymbol, typeArguments: readonly TypeNode[] | undefined, state: CheckState): Type {
  const flags = symbol.flags ?? 0;
  if ((flags & SymbolFlags.TypeAlias) !== 0) {
    const declaration = typeAliasDeclarationOfSymbol(symbol);
    if (declaration === undefined) {
      return unresolvedType;
    }
    return getDeclaredTypeOfTypeAlias(symbol, declaration, typeArguments, state);
  }
  if ((flags & (SymbolFlags.Interface | SymbolFlags.Class)) !== 0) {
    return getDeclaredTypeOfClassOrInterface(symbol, typeArguments, state);
  }
  if ((flags & SymbolFlags.TypeParameter) !== 0) {
    return lookupTypeParameterSubstitution(symbol, state) ?? makeTypeParameterType(symbol, state);
  }
  if ((flags & SymbolFlags.Alias) !== 0) {
    return anyType;
  }
  state.diagnostics.push({ message: `Symbol '${declarationName(symbol)}' does not refer to a type.` });
  return unresolvedType;
}

// Resolve an alias declaration to its target type, with cycle protection and
// caching. A generic alias (declaring type parameters) is a deferred-with-
// diagnostic usage; a self/mutually-referential alias is diagnosed once.
function getDeclaredTypeOfTypeAlias(
  symbol: AstSymbol,
  declaration: TypeAliasDeclaration,
  typeArguments: readonly TypeNode[] | undefined,
  state: CheckState,
): Type {
  if (declaration.typeParameters !== undefined && declaration.typeParameters.length > 0) {
    return instantiateGenericType(
      symbol,
      "type alias",
      declaration.typeParameters,
      typeArguments,
      state,
      () => getDeclaredTypeOfTypeAliasCore(symbol, declaration, state, false),
    );
  }
  if (typeArguments !== undefined && typeArguments.length > 0) {
    state.diagnostics.push({ message: `Type alias '${declarationName(symbol)}' is not generic.` });
    return unresolvedType;
  }
  return getDeclaredTypeOfTypeAliasCore(symbol, declaration, state);
}

function getDeclaredTypeOfTypeAliasCore(symbol: AstSymbol, declaration: TypeAliasDeclaration, state: CheckState, cacheable: boolean = true): Type {
  if (state.cyclicTypeAliases.has(symbol)) {
    reportCyclicTypeAlias(symbol, state);
    return unresolvedType;
  }
  if (cacheable) {
    const cached = state.declaredTypeResolutions.get(symbol);
    if (cached !== undefined) {
      if (state.cyclicTypeAliases.has(symbol)) {
        reportCyclicTypeAlias(symbol, state);
      }
      return cached;
    }
  }
  if (state.typeResolutionStack.has(symbol)) {
    markTypeAliasCycle(symbol, state);
    reportCyclicTypeAlias(symbol, state);
    return unresolvedType;
  }
  state.typeResolutionStack.add(symbol);
  const resolved = typeFromTypeNode(declaration.type, state);
  state.typeResolutionStack.delete(symbol);
  if (cacheable) {
    state.declaredTypeResolutions.set(symbol, resolved);
  }
  return resolved;
}

function markTypeAliasCycle(symbol: AstSymbol, state: CheckState): void {
  let inCycle = false;
  for (const active of state.typeResolutionStack) {
    if (active === symbol) {
      inCycle = true;
    }
    if (inCycle && ((active.flags ?? 0) & SymbolFlags.TypeAlias) !== 0) {
      state.cyclicTypeAliases.add(active);
    }
  }
  state.cyclicTypeAliases.add(symbol);
}

function reportCyclicTypeAlias(symbol: AstSymbol, state: CheckState): void {
  if (!state.reportedCyclicTypeAliases.has(symbol)) {
    state.reportedCyclicTypeAliases.add(symbol);
    state.diagnostics.push({ message: `Type alias '${declarationName(symbol)}' circularly references itself.` });
  }
}

function getDeclaredTypeOfClassOrInterface(
  symbol: AstSymbol,
  typeArguments: readonly TypeNode[] | undefined,
  state: CheckState,
): Type {
  const declaration = symbol.declarations?.find((node): node is AstNode =>
    isInterfaceDeclaration(node) || isClassDeclaration(node)
  );
  const typeParameters = declaration !== undefined && (isInterfaceDeclaration(declaration) || isClassDeclaration(declaration))
    ? declaration.typeParameters
    : undefined;
  if (typeParameters !== undefined && typeParameters.length > 0) {
    return instantiateGenericType(
      symbol,
      "type",
      typeParameters,
      typeArguments,
      state,
      () => getDeclaredTypeOfClassOrInterfaceCore(symbol, declaration, state, false),
    );
  }
  if (typeArguments !== undefined && typeArguments.length > 0) {
    state.diagnostics.push({ message: `Type '${declarationName(symbol)}' is not generic.` });
    return unresolvedType;
  }
  return getDeclaredTypeOfClassOrInterfaceCore(symbol, declaration, state);
}

function getDeclaredTypeOfClassOrInterfaceCore(symbol: AstSymbol, declaration: AstNode | undefined, state: CheckState, cacheable: boolean = true): Type {
  if (cacheable) {
    const cached = state.declaredTypeResolutions.get(symbol);
    if (cached !== undefined) {
      return cached;
    }
  }
  if (state.typeResolutionStack.has(symbol)) {
    return anyType;
  }
  state.typeResolutionStack.add(symbol);
  const type = declaration === undefined
    ? anyType
    : makeNominalObjectType(symbol, declaration, state);
  state.typeResolutionStack.delete(symbol);
  if (cacheable) {
    state.declaredTypeResolutions.set(symbol, type);
  }
  return type;
}

function instantiateGenericType(
  symbol: AstSymbol,
  declarationKind: "type" | "type alias",
  typeParameters: readonly TypeParameterDeclaration[],
  typeArguments: readonly TypeNode[] | undefined,
  state: CheckState,
  produce: () => Type,
): Type {
  const substitutions = buildTypeParameterSubstitutions(symbol, declarationKind, typeParameters, typeArguments, state);
  if (substitutions === undefined) return unresolvedType;
  const key = genericInstantiationKey(substitutions);
  let instantiations = state.genericTypeInstantiations.get(symbol);
  if (instantiations === undefined) {
    instantiations = new Map<string, Type>();
    state.genericTypeInstantiations.set(symbol, instantiations);
  }
  const cached = instantiations.get(key);
  if (cached !== undefined) return cached;

  state.typeParameterSubstitutions.push(substitutions);
  const type = produce();
  state.typeParameterSubstitutions.pop();
  instantiations.set(key, type);
  return type;
}

function buildTypeParameterSubstitutions(
  symbol: AstSymbol,
  declarationKind: "type" | "type alias",
  typeParameters: readonly TypeParameterDeclaration[],
  typeArguments: readonly TypeNode[] | undefined,
  state: CheckState,
): Map<AstSymbol, Type> | undefined {
  const provided = typeArguments ?? [];
  if (provided.length > typeParameters.length) {
    state.diagnostics.push({
      message: `${capitalize(declarationKind)} '${declarationName(symbol)}' requires ${typeParameters.length} type argument${typeParameters.length === 1 ? "" : "s"}, but got ${provided.length}.`,
    });
    return undefined;
  }

  const substitutions = new Map<AstSymbol, Type>();
  state.typeParameterSubstitutions.push(substitutions);
  for (let index = 0; index < typeParameters.length; index += 1) {
    const parameter = typeParameters[index]!;
    const parameterSymbol = nodeSymbol(parameter);
    if (parameterSymbol === undefined) continue;

    const argument = provided[index];
    if (argument !== undefined) {
      substitutions.set(parameterSymbol, typeFromTypeNode(argument, state));
      continue;
    }
    if (parameter.defaultType !== undefined) {
      substitutions.set(parameterSymbol, typeFromTypeNode(parameter.defaultType, state));
      continue;
    }

    state.typeParameterSubstitutions.pop();
    state.diagnostics.push({
      message: `${capitalize(declarationKind)} '${declarationName(symbol)}' requires ${typeParameters.length} type argument${typeParameters.length === 1 ? "" : "s"}.`,
    });
    return undefined;
  }
  state.typeParameterSubstitutions.pop();
  return substitutions;
}

function lookupTypeParameterSubstitution(symbol: AstSymbol, state: CheckState): Type | undefined {
  for (let index = state.typeParameterSubstitutions.length - 1; index >= 0; index -= 1) {
    const substitution = state.typeParameterSubstitutions[index]!.get(symbol);
    if (substitution !== undefined) return substitution;
  }
  return undefined;
}

function genericInstantiationKey(substitutions: ReadonlyMap<AstSymbol, Type>): string {
  const parts: string[] = [];
  for (const [symbol, type] of substitutions) {
    parts.push(`${symbol.name ?? ""}:${type.id}`);
  }
  return parts.join(",");
}

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
}

function makeNominalObjectType(symbol: AstSymbol, declaration: AstNode, state: CheckState): Type {
  const properties: ObjectProperty[] = [];
  let extras: ObjectTypeExtras | undefined;
  if (isInterfaceDeclaration(declaration)) {
    collectTypeMembers(declaration.members, properties, state);
    extras = collectTypeMemberExtras(declaration.members, state);
  } else if (isClassDeclaration(declaration)) {
    const instanceMember = (member: AstNode): boolean => !isStaticClassMember(member);
    collectTypeMembers(declaration.members, properties, state, instanceMember);
    extras = collectTypeMemberExtras(declaration.members, state, instanceMember);
  }
  const type = makeObjectType(properties, state, false, extras);
  type.aliasSymbol = symbol;
  return type;
}

function makeTypeParameterType(symbol: AstSymbol, state: CheckState): Type {
  const cached = state.declaredTypeResolutions.get(symbol);
  if (cached !== undefined) {
    return cached;
  }
  const type: Type = {
    flags: TypeFlags.TypeParameter,
    id: state.nextTypeId(),
    symbol,
    data: {},
  };
  state.declaredTypeResolutions.set(symbol, type);
  return type;
}

function propertyNameText(name: PropertyName, state: CheckState): string | undefined {
  if (isIdentifier(name) || isPrivateIdentifier(name)) return name.text;
  if (isStringLiteral(name) || isNoSubstitutionTemplateLiteral(name) || isNumericLiteral(name) || isBigIntLiteral(name)) return name.text;
  if (isComputedPropertyName(name)) {
    const literalName = literalPropertyNameFromExpression(name.expression);
    if (literalName !== undefined) return literalName;
    state.diagnostics.push({ message: "Computed property names in type declarations must be literal string, number, or bigint names for checker object construction." });
    return undefined;
  }
  state.diagnostics.push({ message: `Property name kind '${kindDebugName((name as { readonly kind: Kind }).kind)}' is not yet supported by the checker.` });
  return undefined;
}

function literalPropertyNameFromExpression(expression: Expression): string | undefined {
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression) || isNumericLiteral(expression) || isBigIntLiteral(expression)) {
    return expression.text;
  }
  return undefined;
}

function collectTypeMembers(members: readonly AstNode[], properties: ObjectProperty[], state: CheckState, includeMember: (member: AstNode) => boolean = () => true): void {
  for (const member of members) {
    if (!includeMember(member)) continue;
    if (isPropertySignatureDeclaration(member) || isPropertyDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      properties.push({
        name,
        type: member.type === undefined ? anyType : typeFromTypeNode(member.type, state),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else if (isMethodSignatureDeclaration(member) || isMethodDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      properties.push({
        name,
        type: makeFunctionType(returnType, state, functionParametersFromNode(member.parameters, state)),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else if (isGetAccessorDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      properties.push({ name, type: returnType });
    } else if (isSetAccessorDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      const parameter = member.parameters[0];
      const parameterType = parameter?.type === undefined ? anyType : typeFromTypeNode(parameter.type, state);
      properties.push({ name, type: parameterType });
    }
  }
}

function isStaticClassMember(member: AstNode): boolean {
  return (isPropertyDeclaration(member) || isMethodDeclaration(member) || isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member))
    && hasModifier(member, ModifierFlags.Static);
}

function collectTypeMemberExtras(members: readonly AstNode[], state: CheckState, includeMember: (member: AstNode) => boolean = () => true): ObjectTypeExtras | undefined {
  const callSignatures: Signature[] = [];
  const constructSignatures: Signature[] = [];
  const indexInfos: IndexInfo[] = [];
  for (const member of members) {
    if (!includeMember(member)) continue;
    if (isCallSignatureDeclaration(member)) {
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      callSignatures.push(makeCallSignature(returnType, functionParametersFromNode(member.parameters, state)));
    } else if (isConstructSignatureDeclaration(member)) {
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      constructSignatures.push(makeCallSignature(returnType, functionParametersFromNode(member.parameters, state)));
    } else if (isIndexSignatureDeclaration(member)) {
      const keyParameter = member.parameters[0];
      const keyType = keyParameter?.type === undefined ? anyType : typeFromTypeNode(keyParameter.type, state);
      const valueType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      indexInfos.push({ keyType, valueType, declaration: member });
    }
  }
  if (callSignatures.length === 0 && constructSignatures.length === 0 && indexInfos.length === 0) return undefined;
  return {
    ...(callSignatures.length > 0 ? { callSignatures } : {}),
    ...(constructSignatures.length > 0 ? { constructSignatures } : {}),
    ...(indexInfos.length > 0 ? { indexInfos } : {}),
  };
}

// Build the FunctionParameter list for a signature/method declaration's
// parameters (named parameters only; matches the method-signature path).
function functionParametersFromNode(parameters: readonly ParameterDeclaration[], state: CheckState): FunctionParameter[] {
  return parameters
    .filter((parameter) => isIdentifier(parameter.name))
    .map((parameter) => ({
      name: (parameter.name as { readonly text: string }).text,
      type: parameter.type === undefined ? anyType : typeFromTypeNode(parameter.type, state),
      optional: parameter.questionToken !== undefined || parameter.initializer !== undefined,
      rest: parameter.dotDotDotToken !== undefined,
    }));
}

// `{ name: T; ... }` type literals: build an anonymous object type from the
// property/method signatures, call signatures, construct signatures, and index
// signatures.
function typeFromTypeLiteralNode(node: TypeLiteralNode, state: CheckState): Type {
  const properties: ObjectProperty[] = [];
  const callSignatures: Signature[] = [];
  const constructSignatures: Signature[] = [];
  const indexInfos: IndexInfo[] = [];
  for (const member of node.members) {
    if (isPropertySignatureDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      properties.push({
        name,
        type: typeFromTypeNode(member.type, state),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else if (isMethodSignatureDeclaration(member)) {
      const name = propertyNameText(member.name, state);
      if (name === undefined) continue;
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      properties.push({
        name,
        type: makeFunctionType(returnType, state, functionParametersFromNode(member.parameters, state)),
        optional: member.postfixToken?.kind === Kind.QuestionToken,
      });
    } else if (isCallSignatureDeclaration(member)) {
      // `{ (args): R }` — an object type carrying a bare call signature.
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      callSignatures.push(makeCallSignature(returnType, functionParametersFromNode(member.parameters, state)));
    } else if (isConstructSignatureDeclaration(member)) {
      // `{ new (args): R }` — object type carrying a construct signature.
      const returnType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      constructSignatures.push(makeCallSignature(returnType, functionParametersFromNode(member.parameters, state)));
    } else if (isIndexSignatureDeclaration(member)) {
      // `{ [key: K]: V }` — the index parameter's type is the key, member.type
      // is the value. A missing key/value type defaults to `any`.
      const keyParameter = member.parameters[0];
      const keyType = keyParameter?.type === undefined ? anyType : typeFromTypeNode(keyParameter.type, state);
      const valueType = member.type === undefined ? anyType : typeFromTypeNode(member.type, state);
      indexInfos.push({ keyType, valueType, declaration: member });
    } else {
      state.diagnostics.push({ message: `Type member kind '${kindDebugName(member.kind)}' is not yet supported by the checker.` });
    }
  }
  const extras: ObjectTypeExtras = {
    ...(callSignatures.length > 0 ? { callSignatures } : {}),
    ...(constructSignatures.length > 0 ? { constructSignatures } : {}),
    ...(indexInfos.length > 0 ? { indexInfos } : {}),
  };
  return makeObjectType(properties, state, false, extras);
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
    // Excess property of a fresh object literal: TS reports this in place of the
    // structural mismatch.
    const excess = state.relater.excessProperty;
    if (excess !== undefined) {
      state.diagnostics.push({
        message: `Object literal may only specify known properties, and '${excess.name}' does not exist in type '${displayType(excess.target)}'.`,
      });
      return;
    }
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

// ---------------------------------------------------------------------------
// Value/module/export name resolution via the BINDER symbol graph (M5a).
//
// The checker no longer carries its own value scope (the `new Map(environment)`
// clones + setBindingNameType are gone): the binder already built the lexical
// scopes (container.locals), the module export surface (sourceFile.symbol.
// exports), and the member tables (symbol.members). An identifier in value
// position resolves through NameResolver.resolve walking those tables up the
// parent chain (mirrors checker.go getResolvedSymbol → resolveName), then its
// type comes from getTypeOfSymbol's flag-dispatch.
// ---------------------------------------------------------------------------

// The single shared NameResolver (mirrors the checker's one resolver). Its
// hooks are checker-side concerns; M5a only needs getSymbolOfDeclaration +
// no-op error/arguments (diagnostics for unresolved names are emitted by the
// caller, matching checker.go where resolveName returns undefined and the
// caller reports Cannot_find_name).
const sharedNameResolver = new NameResolver(
  {
    argumentsSymbol: () => ({ name: "arguments", declarations: [] }),
    error: () => { /* the checker caller emits the unresolved-name diagnostic */ },
    getSymbolOfDeclaration: (node) => nodeSymbol(node),
  },
  {},
);

// getResolvedSymbol (checker.go:14036) — resolve an identifier in VALUE position
// to its binder symbol. Value meaning admits an Alias (an imported/exported
// binding used as a value resolves through its alias symbol).
export function getResolvedSymbol(identifierText: string, location: AstNode): AstSymbol | undefined {
  return sharedNameResolver.resolve(location, identifierText, SymbolFlags.Value | SymbolFlags.Alias, undefined, true, false);
}

function getResolvedTypeSymbol(identifierText: string, location: AstNode): AstSymbol | undefined {
  return sharedNameResolver.resolve(location, identifierText, SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias, undefined, true, false);
}

// Initializer inference is injected by checker.expressions.ts (which owns
// inferExpression) to avoid a checkedtype → expressions import cycle at module
// load; the runtime call cycle is fine (ESM supports it).
let inferInitializerType: ((initializer: Expression, state: CheckState, contextualType?: Type) => Type) | undefined;

export function setInitializerInferrer(inferrer: (initializer: Expression, state: CheckState, contextualType?: Type) => Type): void {
  inferInitializerType = inferrer;
}

// getTypeOfSymbol flag-dispatch for BINDER symbols (checker.go:16099). Registered
// per-check via wireBinderSymbolResolution so the resolver hook (called from the
// state-free getTypeOfSymbol) sees the current CheckState.
export function wireBinderSymbolResolution(state: CheckState): void {
  setBinderSymbolTypeResolver((symbol) => getTypeOfBinderSymbol(symbol, state));
}

function getTypeOfBinderSymbol(symbol: AstSymbol, state: CheckState): Type | undefined {
  const flags = symbol.flags ?? 0;
  if ((flags & (SymbolFlags.Variable | SymbolFlags.Property)) !== 0) {
    return getTypeOfVariableOrParameterOrProperty(symbol, state);
  }
  if ((flags & (SymbolFlags.Function | SymbolFlags.Method | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.Module)) !== 0) {
    return getTypeOfFuncClassEnumModule(symbol, state);
  }
  if ((flags & SymbolFlags.Alias) !== 0) {
    return getTypeOfAlias(symbol, state);
  }
  // ExportValue locals carry no value type of their own — the value lives on the
  // linked export symbol (local.exportSymbol). An in-file reference resolves to
  // the value declaration via locals before reaching here, so this path is the
  // export-surface read: follow the link.
  if ((flags & SymbolFlags.ExportValue) !== 0 && symbol.exportSymbol !== undefined) {
    return getTypeOfBinderSymbol(symbol.exportSymbol, state);
  }
  return undefined;
}

// getTypeOfVariableOrParameterOrProperty (checker.go) — the declared annotation
// when present, else the inferred initializer type (widened per const/let, as in
// getWidenedTypeForVariableLikeDeclaration). Destructuring binding-element types
// are deferred to a later slice (no annotation → falls back to the initializer /
// error type), matching the previous setBindingNameType pattern-binding behavior.
function getTypeOfVariableOrParameterOrProperty(symbol: AstSymbol, state: CheckState): Type | undefined {
  const declaration = symbol.valueDeclaration;
  if (declaration === undefined) return undefined;
  if (isVariableDeclaration(declaration) || isParameterDeclaration(declaration) || isPropertyDeclaration(declaration) || isPropertySignatureDeclaration(declaration)) {
    if (declaration.type !== undefined) {
      return typeFromTypeNode(declaration.type, state);
    }
    if (declaration.initializer !== undefined && inferInitializerType !== undefined) {
      const initializerType = inferInitializerType(declaration.initializer, state);
      return isVariableDeclaration(declaration)
        ? widenedVariableType(initializerType, declaration, state)
        : getWidenedType(initializerType, state);
    }
    // A parameter with neither annotation nor initializer is an implicit-any
    // position the checker does not yet model precisely — the error type keeps
    // it from cascading (matching the prior unresolvedType binding).
    return isParameterDeclaration(declaration) ? unresolvedType : anyType;
  }
  // A destructured binding element resolves through its annotated parent for now
  // (pattern element typing is a later slice). The prior model bound the whole
  // pattern's type to each name; return that so a `{ value }: T` parameter still
  // resolves `value`.
  if (isBindingElement(declaration)) {
    return getTypeOfDestructuredBindingElement(declaration, state);
  }
  return undefined;
}

// `const` preserves a primitive-literal initializer; `let`/`var` widen it
// (getWidenedTypeForVariableLikeDeclaration widens only non-const block-scoped
// declarations). The stored type also drops object-literal freshness.
function widenedVariableType(initializerType: Type, declaration: AstNode, state: CheckState): Type {
  const declarationList = nodeParent(declaration);
  const isConst = declarationList !== undefined && ((declarationList.flags ?? 0) & NodeFlags.Const) !== 0;
  const literalAdjusted = isConst
    ? getRegularTypeOfLiteralType(initializerType, state)
    : getWidenedType(initializerType, state);
  return getRegularTypeOfObjectLiteral(literalAdjusted, state);
}

// A binding-element name (`const { value } = …` / `function f({ value }: T)`)
// resolves through the pattern's annotated parent declaration. Element-wise
// destructured typing is a later slice; the whole-pattern type is returned (the
// behavior the prior setBindingNameType pattern-binding produced).
function getTypeOfDestructuredBindingElement(element: BindingElement, state: CheckState): Type | undefined {
  let node: AstNode | undefined = nodeParent(element);
  while (node !== undefined) {
    if (isParameterDeclaration(node) || isVariableDeclaration(node)) {
      if (node.type !== undefined) return typeFromTypeNode(node.type, state);
      if (node.initializer !== undefined && inferInitializerType !== undefined) {
        return getWidenedType(inferInitializerType(node.initializer, state), state);
      }
      return isParameterDeclaration(node) ? unresolvedType : anyType;
    }
    node = nodeParent(node);
  }
  return undefined;
}

// getTypeOfFuncClassEnumModule (checker.go) — a function/class/enum/module symbol
// used as a value. Function symbols are callable; classes/enums/modules are
// object-like value namespaces. Full class-instance/static + enum-member typing
// is a later slice, so these resolve to `any` value placeholders (NOT the error
// type — a class name IS a known value), with functions kept callable so a
// direct `f()` call still type-checks.
function getTypeOfFuncClassEnumModule(symbol: AstSymbol, state: CheckState): Type | undefined {
  const flags = symbol.flags ?? 0;
  if ((flags & (SymbolFlags.Function | SymbolFlags.Method)) !== 0) {
    const declaration = symbol.valueDeclaration;
    if (declaration !== undefined && (isFunctionDeclaration(declaration) || isMethodDeclaration(declaration) || isMethodSignatureDeclaration(declaration))) {
      const returnType = declaration.type === undefined ? anyType : typeFromTypeNode(declaration.type, state);
      return makeFunctionType(returnType, state, functionParametersFromNode(declaration.parameters, state));
    }
    return makeFunctionType(anyType, state, [{ name: "args", type: anyType, rest: true }]);
  }
  if ((flags & SymbolFlags.Class) !== 0) {
    const declaration = symbol.declarations?.find((node): node is ClassDeclaration => isClassDeclaration(node));
    const instanceType = getDeclaredTypeOfClassOrInterfaceCore(symbol, declaration, state);
    const constructor = declaration?.members.find((member) => isConstructorDeclaration(member));
    const parameters = constructor === undefined ? [] : functionParametersFromNode(constructor.parameters, state);
    const staticProperties: ObjectProperty[] = [];
    if (declaration !== undefined) {
      collectTypeMembers(declaration.members, staticProperties, state, isStaticClassMember);
    }
    return makeObjectType(staticProperties, state, false, { constructSignatures: [makeCallSignature(instanceType, parameters)] });
  }
  void state;
  return anyType;
}

// getTypeOfAlias (checker.go) — an import/export alias. Cross-file alias-target
// typing is a later slice; M5a takes the symbol-flag path and resolves the alias
// to `any` (a known imported value of unknown-yet type), NOT the error type.
function getTypeOfAlias(symbol: AstSymbol, state: CheckState): Type | undefined {
  void symbol; void state;
  return anyType;
}

// The declared index parameter name (`[key: string]`) for display, falling back
// to `x` (TS-Go's default) when the declaration is unavailable.
function indexSignatureParameterName(info: IndexInfo): string {
  const parameter = (info.declaration as { parameters?: readonly ParameterDeclaration[] } | undefined)?.parameters?.[0];
  return parameter !== undefined && isIdentifier(parameter.name) ? parameter.name.text : "x";
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
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return quoteStringLiteral(String((type.data as LiteralType).value));
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return String((type.data as LiteralType).value);
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return `${pseudoBigIntToString((type.data as LiteralType).value as PseudoBigInt)}n`;
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return type.symbol?.name ?? "T";
  if (isFunctionType(type)) return "function";
  const elementType = getArrayElementType(type);
  if (elementType !== undefined) {
    const rendered = displayType(elementType);
    // Parenthesize a union element so `(string | number)[]` reads correctly.
    return (elementType.flags & TypeFlags.Union) !== 0 ? `(${rendered})[]` : `${rendered}[]`;
  }
  if ((type.flags & TypeFlags.Object) !== 0) {
    if (type.aliasSymbol !== undefined && (((type.aliasSymbol.flags ?? 0) & (SymbolFlags.Class | SymbolFlags.Interface)) !== 0)) {
      return declarationName(type.aliasSymbol);
    }
    const members = objectTypeMembers(type);
    if (members !== undefined) {
      const entries = [...members.values()].map((m) => `${m.name}: ${displayType(m.syntheticType)}`);
      const indexEntries = (getIndexInfos(type) ?? []).map(
        (info) => `[${indexSignatureParameterName(info)}: ${displayType(info.keyType)}]: ${displayType(info.valueType)}`,
      );
      const all = [...entries, ...indexEntries];
      return all.length === 0 ? "{}" : `{ ${all.join("; ")} }`;
    }
    return "object";
  }
  const name = (type.data as IntrinsicType | undefined)?.intrinsicName;
  if (name === undefined || name === "error") return "unknown";
  return name;
}

function quoteStringLiteral(value: string): string {
  let result = "\"";
  for (let index = 0; index < value.length; index += 1) {
    const ch = value[index]!;
    switch (ch) {
      case "\"":
        result += "\\\"";
        break;
      case "\\":
        result += "\\\\";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\r":
        result += "\\r";
        break;
      case "\t":
        result += "\\t";
        break;
      default:
        result += ch;
        break;
    }
  }
  return result + "\"";
}
