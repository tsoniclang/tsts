/**
 * Type relation checker.
 *
 * Substantive port of TS-Go `internal/checker/relater.go` (~4976 LoC,
 * 203 funcs/types). The relater is the heart of TypeScript's type
 * checking: implements assignability, identity, comparability,
 * subtype, and strict-subtype relations across all type shapes.
 *
 * Port scope: full method-API parity. Bodies stubbed; baseline checker
 * conformance tests drive incremental fill-in.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { Type, Signature, VarianceFlags, UnionOrIntersectionType, LiteralType, ObjectType } from "./types.js";
import { TypeFlags, SignatureKind, getTypeOfSymbol } from "./types.js";

// Composite TypeFlags masks (now defined 1:1 in types.ts); aliased locally
// to keep the ported relation logic readable.
const StringLikeFlags = TypeFlags.StringLike;
const NumberLikeFlags = TypeFlags.NumberLike;
const BigIntLikeFlags = TypeFlags.BigIntLike;
const BooleanLikeFlags = TypeFlags.BooleanLike;
const ESSymbolLikeFlags = TypeFlags.ESSymbolLike;
const UnionOrIntersectionFlags = TypeFlags.UnionOrIntersection;
// Mask of types that may simplify to other forms — matches TS-Go's
// isTypeRelatedTo identity branch exactly (NOT TypeFlags.Simplifiable).
const SimplifiableFlags =
  UnionOrIntersectionFlags | TypeFlags.IndexedAccess | TypeFlags.Conditional | TypeFlags.Substitution;

function literalValueOf(t: Type): unknown {
  return (t.data as LiteralType | undefined)?.value;
}

// Constituents of a union or intersection type, stored on `Type.data`
// (mirrors TS-Go's `t.AsUnionOrIntersectionType().Types()`).
function constituentTypes(t: Type): readonly Type[] | undefined {
  return (t.data as UnionOrIntersectionType | undefined)?.types;
}

// Call/construct signatures of an object type, stored on `Type.data`
// (mirrors TS-Go's `t.AsObjectType()` signature lists).
function signaturesOf(t: Type, kind: SignatureKind): readonly Signature[] | undefined {
  const data = t.data as ObjectType | undefined;
  return kind === SignatureKind.Call ? data?.declaredCallSignatures : data?.declaredConstructSignatures;
}

function getRelationKey(source: Type, target: Type, isIdentity: boolean): string {
  const sid = (source as { id?: number }).id ?? 0;
  const tid = (target as { id?: number }).id ?? 0;
  return isIdentity && sid > tid ? `${tid},${sid}` : `${sid},${tid}`;
}

// ---------------------------------------------------------------------------
// Relation tables
// ---------------------------------------------------------------------------

export type RelationKind = 0 | 1 | 2 | 3 | 4;
export const RelationKind = {
  Identity: 0 as RelationKind,
  Subtype: 1 as RelationKind,
  StrictSubtype: 2 as RelationKind,
  Assignable: 3 as RelationKind,
  Comparable: 4 as RelationKind,
} as const;

export interface Relation {
  kind: RelationKind;
  cache: Map<string, RelationComparisonResult>;
  errorCache?: Map<string, readonly unknown[]>;
}

export type RelationComparisonResult = number;
// 1:1 with TS-Go relater.go RelationComparisonResult.
export const RelationComparisonResult = {
  None: 0 as RelationComparisonResult,
  Succeeded: (1 << 0) as RelationComparisonResult,
  Failed: (1 << 1) as RelationComparisonResult,
  ReportsUnmeasurable: (1 << 3) as RelationComparisonResult,
  ReportsUnreliable: (1 << 4) as RelationComparisonResult,
  ReportsMask: 24 as RelationComparisonResult, // ReportsUnmeasurable|ReportsUnreliable
} as const;

export type RecursionFlags = number;
export const RecursionFlags = {
  None: 0 as RecursionFlags,
  Source: (1 << 0) as RecursionFlags,
  Target: (1 << 1) as RecursionFlags,
  Both: 3 as RecursionFlags,
} as const;

export type Ternary = -1 | 0 | 1 | 3;
// 1:1 with TS-Go: True=-1, False=0, Unknown=1, Maybe=3. The values are
// chosen so bitwise-AND of results composes correctly (Maybe MUST be 3).
export const Ternary = {
  False: 0 as Ternary,
  Unknown: 1 as Ternary,
  Maybe: 3 as Ternary,
  True: -1 as Ternary,
} as const;

// ---------------------------------------------------------------------------
// Relater
// ---------------------------------------------------------------------------

export class Relater {
  identityRelation: Relation = { kind: RelationKind.Identity, cache: new Map() };
  subtypeRelation: Relation = { kind: RelationKind.Subtype, cache: new Map() };
  strictSubtypeRelation: Relation = { kind: RelationKind.StrictSubtype, cache: new Map() };
  assignableRelation: Relation = { kind: RelationKind.Assignable, cache: new Map() };
  comparableRelation: Relation = { kind: RelationKind.Comparable, cache: new Map() };
  enumRelation: Map<string, RelationComparisonResult> = new Map();

  // strictNullChecks affects whether `null`/`undefined` are widely
  // assignable. Modern default is on; the checker can flip it.
  strictNullChecks = true;

  // -------------------------------------------------------------------------
  // Public entry points
  // -------------------------------------------------------------------------

  isTypeAssignableTo(source: Type, target: Type): boolean {
    return this.isTypeRelatedTo(source, target, this.assignableRelation);
  }
  isTypeSubtypeOf(source: Type, target: Type): boolean {
    return this.isTypeRelatedTo(source, target, this.subtypeRelation);
  }
  isTypeStrictSubtypeOf(source: Type, target: Type): boolean {
    return this.isTypeRelatedTo(source, target, this.strictSubtypeRelation);
  }
  isTypeIdenticalTo(source: Type, target: Type): boolean {
    if (source === target) return true;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    // Identical primitives by flag.
    const primitiveMask = TypeFlags.Primitive;
    if ((sf & primitiveMask) !== 0 && sf === tf) return true;
    return false;
  }
  isTypeComparableTo(source: Type, target: Type): boolean {
    return this.isTypeRelatedTo(source, target, this.comparableRelation);
  }
  isTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
    // Faithful port of relater.go isTypeRelatedTo. (Fresh-literal
    // normalization is deferred — it affects only literal-identity
    // edge cases.)
    if (source === target) return true;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    if (relation.kind !== RelationKind.Identity) {
      if (
        (relation.kind === RelationKind.Comparable
          && (tf & TypeFlags.Never) === 0
          && this.isSimpleTypeRelatedTo(target, source, relation))
        || this.isSimpleTypeRelatedTo(source, target, relation)
      ) {
        return true;
      }
    } else if (((sf | tf) & SimplifiableFlags) === 0) {
      // Excluding types that may simplify, identical types must have
      // identical flags.
      if (sf !== tf) return false;
      // Singleton intrinsics with equal flags are identical (literals are
      // NOT singletons — two literals with equal flags may differ by value).
      if ((sf & TypeFlags.Singleton) !== 0) return true;
    }
    if ((sf & TypeFlags.Object) !== 0 && (tf & TypeFlags.Object) !== 0) {
      const id = getRelationKey(source, target, relation.kind === RelationKind.Identity);
      const cached = relation.cache.get(id);
      if (cached !== undefined && cached !== RelationComparisonResult.None) {
        return (cached & RelationComparisonResult.Succeeded) !== 0;
      }
    }
    if ((sf & TypeFlags.StructuredOrInstantiable) !== 0 || (tf & TypeFlags.StructuredOrInstantiable) !== 0) {
      return this.checkTypeRelatedTo(source, target, relation, undefined);
    }
    return false;
  }
  checkTypeAssignableTo(
    source: Type, target: Type, errorNode: AstNode | undefined,
    headMessage?: { code: number; message: string },
  ): boolean {
    void errorNode; void headMessage;
    return this.isTypeAssignableTo(source, target);
  }
  checkTypeRelatedTo(
    source: Type, target: Type, relation: Relation, errorNode: AstNode | undefined,
  ): boolean {
    void errorNode;
    if (this.isSimpleTypeRelatedTo(source, target, relation)) return true;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    if ((sf & TypeFlags.StructuredOrInstantiable) === 0 && (tf & TypeFlags.StructuredOrInstantiable) === 0) {
      return false;
    }
    const key = getRelationKey(source, target, relation.kind === RelationKind.Identity);
    const cached = relation.cache.get(key);
    if (cached !== undefined && cached !== RelationComparisonResult.None) {
      return (cached & RelationComparisonResult.Succeeded) !== 0;
    }
    // Coinductive guard: assume related while recursing so cyclic
    // (recursive) types terminate (mirrors TS's maybe-stack approach).
    relation.cache.set(key, RelationComparisonResult.Succeeded);
    const result = this.recursiveTypeRelatedTo(source, target, false, 0, RecursionFlags.Both, relation);
    const ok = result !== Ternary.False;
    relation.cache.set(key, ok ? RelationComparisonResult.Succeeded : RelationComparisonResult.Failed);
    return ok;
  }

  // -------------------------------------------------------------------------
  // Internal relation worker
  // -------------------------------------------------------------------------

  recursiveTypeRelatedTo(
    source: Type, target: Type, reportErrors: boolean, intersectionState: number,
    recursionFlags: RecursionFlags, relation: Relation,
  ): Ternary {
    void recursionFlags; void relation;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    // Dispatch order mirrors TS-Go relater.go exactly: source union, then
    // target union, then target intersection, then source intersection. The
    // source-union-first rule makes union-source-to-union-target relate each
    // source constituent to the whole target union; keeping source-intersection
    // LAST preserves "does the whole source relate to some target constituent"
    // for the `(A & B) -> (C | D)` shape.
    // Source union: every constituent must relate to the target.
    if ((sf & TypeFlags.Union) !== 0) return this.eachTypeRelatedToType(source, target, reportErrors);
    // Target union: source must relate to at least one constituent.
    if ((tf & TypeFlags.Union) !== 0) return this.typeRelatedToSomeType(source, target, reportErrors);
    // Target intersection: source must relate to every constituent.
    if ((tf & TypeFlags.Intersection) !== 0) return this.typeRelatedToEachType(source, target, reportErrors);
    // Source intersection: some constituent must relate to the target.
    if ((sf & TypeFlags.Intersection) !== 0) return this.someTypeRelatedToType(source, target, reportErrors);
    // Both object: structural comparison.
    if ((sf & TypeFlags.Object) !== 0 && (tf & TypeFlags.Object) !== 0) {
      return this.structuredTypeRelatedTo(source, target, reportErrors, intersectionState);
    }
    return Ternary.False;
  }

  typeRelatedToSomeType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // source is related to target (a union) if related to at least one
    // of the union's constituents.
    void reportErrors;
    const types = constituentTypes(target);
    if (types === undefined) return Ternary.False;
    for (const t of types) {
      if (this.isTypeAssignableTo(source, t)) return Ternary.True;
    }
    return Ternary.False;
  }
  typeRelatedToEachType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // source is related to target (an intersection) iff related to all
    // of its constituents.
    void reportErrors;
    const types = constituentTypes(target);
    if (types === undefined) return Ternary.True;
    for (const t of types) {
      if (!this.isTypeAssignableTo(source, t)) return Ternary.False;
    }
    return Ternary.True;
  }
  someTypeRelatedToType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // Source is a union; succeed if any constituent is related to target.
    void reportErrors;
    const types = constituentTypes(source);
    if (types === undefined) return Ternary.False;
    for (const t of types) {
      if (this.isTypeAssignableTo(t, target)) return Ternary.True;
    }
    return Ternary.False;
  }
  eachTypeRelatedToSomeType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // Every constituent of source must be related to some constituent
    // of target.
    void reportErrors;
    const sourceTypes = constituentTypes(source);
    if (sourceTypes === undefined) return Ternary.False;
    for (const s of sourceTypes) {
      if (!this.isTypeAssignableTo(s, target)) return Ternary.False;
    }
    return Ternary.True;
  }
  eachTypeRelatedToType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // Every constituent of source must be related to target.
    return this.eachTypeRelatedToSomeType(source, target, reportErrors);
  }

  structuredTypeRelatedTo(
    source: Type, target: Type, reportErrors: boolean, intersectionState: number,
  ): Ternary {
    void intersectionState;
    // For object types: properties, call signatures, construct
    // signatures, index signatures all relate.
    const propsResult = this.propertiesRelatedTo(source, target, reportErrors);
    if (propsResult === Ternary.False) return propsResult;
    const callResult = this.signaturesRelatedTo(source, target, 0, reportErrors);
    if (callResult === Ternary.False) return callResult;
    const constructResult = this.signaturesRelatedTo(source, target, 1, reportErrors);
    if (constructResult === Ternary.False) return constructResult;
    return this.indexSignaturesRelatedTo(source, target, false, reportErrors);
  }

  membersRelatedToIndexInfo(source: Type, target: Type, reportErrors: boolean): Ternary {
    // Each member of source's type must satisfy target's index signature.
    void reportErrors;
    const indexInfos = (target as unknown as { indexInfos?: readonly { keyType: Type; type: Type }[] }).indexInfos;
    const sourceMembers = (source as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (indexInfos === undefined || sourceMembers === undefined) return Ternary.True;
    for (const [, sym] of sourceMembers) {
      const memberType = (sym as unknown as { type?: Type }).type;
      if (memberType === undefined) continue;
      for (const info of indexInfos) {
        if (!this.isTypeAssignableTo(memberType, info.type)) return Ternary.False;
      }
    }
    return Ternary.True;
  }

  propertiesRelatedTo(source: Type, target: Type, reportErrors: boolean): Ternary {
    // For each property of target, check the matching source property
    // is related.
    const targetProps = (target as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const sourceProps = (source as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (targetProps === undefined) return Ternary.True;
    if (sourceProps === undefined) return Ternary.False;
    for (const [name, targetProp] of targetProps) {
      const sourceProp = sourceProps.get(name);
      if (sourceProp === undefined) {
        // A missing source property is only acceptable when the target
        // property is optional (mirrors TS-Go propertiesRelatedTo).
        if (((targetProp.flags ?? 0) & SymbolFlags.Optional) !== 0) continue;
        return Ternary.False;
      }
      const r = this.propertyRelatedTo(source, target, sourceProp, targetProp, reportErrors);
      if (r === Ternary.False) return r;
    }
    return Ternary.True;
  }

  propertyRelatedTo(
    source: Type, target: Type, sourceProp: AstSymbol, targetProp: AstSymbol, reportErrors: boolean,
  ): Ternary {
    void source; void target; void reportErrors;
    const sourceType = getTypeOfSymbol(sourceProp);
    const targetType = getTypeOfSymbol(targetProp);
    if (sourceType === undefined || targetType === undefined) return Ternary.True;
    return this.isTypeAssignableTo(sourceType, targetType) ? Ternary.True : Ternary.False;
  }

  signaturesRelatedTo(
    source: Type, target: Type, kind: SignatureKind, reportErrors: boolean,
  ): Ternary {
    const sourceSigs = signaturesOf(source, kind);
    const targetSigs = signaturesOf(target, kind);
    if (targetSigs === undefined || targetSigs.length === 0) return Ternary.True;
    if (sourceSigs === undefined || sourceSigs.length === 0) return Ternary.False;
    // For each target sig, source must have at least one related sig.
    for (const ts of targetSigs) {
      let found = false;
      for (const ss of sourceSigs) {
        if (this.signatureRelatedTo(ss, ts, false, reportErrors) !== Ternary.False) {
          found = true;
          break;
        }
      }
      if (!found) return Ternary.False;
    }
    return Ternary.True;
  }

  signatureRelatedTo(
    source: Signature, target: Signature, erase: boolean, reportErrors: boolean,
  ): Ternary {
    // Parameter count match (rest parameters loosen this; not enforced
    // here). Return-type assignable.
    void erase; void reportErrors;
    const sourceParams = (source as unknown as { parameters?: readonly AstSymbol[] }).parameters ?? [];
    const targetParams = (target as unknown as { parameters?: readonly AstSymbol[] }).parameters ?? [];
    if (sourceParams.length > targetParams.length) return Ternary.False;
    const sourceRet = (source as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    const targetRet = (target as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    if (sourceRet !== undefined && targetRet !== undefined) {
      return this.isTypeAssignableTo(sourceRet, targetRet) ? Ternary.True : Ternary.False;
    }
    return Ternary.True;
  }

  indexSignaturesRelatedTo(
    source: Type, target: Type, sourceIsPrimitive: boolean, reportErrors: boolean,
  ): Ternary {
    void sourceIsPrimitive;
    const targetInfos = (target as unknown as { indexInfos?: readonly { keyType: Type; type: Type }[] }).indexInfos;
    if (targetInfos === undefined || targetInfos.length === 0) return Ternary.True;
    const sourceInfos = (source as unknown as { indexInfos?: readonly { keyType: Type; type: Type }[] }).indexInfos;
    if (sourceInfos === undefined) {
      // Members of source must satisfy target's index signature.
      return this.membersRelatedToIndexInfo(source, target, reportErrors);
    }
    // Match per keyType.
    for (const ti of targetInfos) {
      let found = false;
      for (const si of sourceInfos) {
        if (this.indexInfoRelatedTo(si as unknown as Type, ti as unknown as Type, reportErrors) !== Ternary.False) {
          found = true; break;
        }
      }
      if (!found) return Ternary.False;
    }
    return Ternary.True;
  }

  indexInfoRelatedTo(source: Type, target: Type, reportErrors: boolean): Ternary {
    void reportErrors;
    const sourceType = (source as unknown as { type?: Type }).type;
    const targetType = (target as unknown as { type?: Type }).type;
    if (sourceType === undefined || targetType === undefined) return Ternary.True;
    return this.isTypeAssignableTo(sourceType, targetType) ? Ternary.True : Ternary.False;
  }

  // -------------------------------------------------------------------------
  // Variance
  // -------------------------------------------------------------------------

  getVariances(t: Type): readonly VarianceFlags[] {
    void t;
    return [];
  }

  hasCovariantVoidArgument(typeArguments: readonly Type[], variances: readonly VarianceFlags[]): boolean {
    void typeArguments; void variances;
    return false;
  }

  isUnconstrainedTypeParameter(t: Type): boolean { void t; return false; }
  isNonDeferredTypeReference(t: Type): boolean { void t; return false; }
  isTypeReferenceWithGenericArguments(t: Type): boolean { void t; return false; }

  // -------------------------------------------------------------------------
  // Apparent type computation + cache
  // -------------------------------------------------------------------------

  getRecursionIdentity(t: Type): unknown { void t; return undefined; }

  reportRelationError(
    headMessage: { code: number; message: string } | undefined,
    source: Type, target: Type,
  ): void {
    void headMessage; void source; void target;
  }

  isWeakType(t: Type): boolean {
    // A weak type has only optional properties (or no required ones).
    const symbol = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
    const members = symbol?.members;
    if (members === undefined || members.size === 0) return false;
    for (const [, sym] of members) {
      const flags = (sym as unknown as { flags?: number }).flags ?? 0;
      if ((flags & SymbolFlags.Optional) === 0) return false;
    }
    return true;
  }
  isSimpleTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
    // Faithful port of relater.go isSimpleTypeRelatedTo: the flag-level
    // (non-structural) relation rules between intrinsic/primitive types.
    const s = (source as { flags?: number }).flags ?? 0;
    const t = (target as { flags?: number }).flags ?? 0;
    if ((t & TypeFlags.Any) !== 0 || (s & TypeFlags.Never) !== 0) return true;
    if ((t & TypeFlags.Unknown) !== 0
      && !(relation.kind === RelationKind.StrictSubtype && (s & TypeFlags.Any) !== 0)) {
      return true;
    }
    if ((t & TypeFlags.Never) !== 0) return false;
    if ((s & StringLikeFlags) !== 0 && (t & TypeFlags.String) !== 0) return true;
    if ((s & TypeFlags.StringLiteral) !== 0 && (s & TypeFlags.EnumLiteral) !== 0
      && (t & TypeFlags.StringLiteral) !== 0 && (t & TypeFlags.EnumLiteral) === 0
      && literalValueOf(source) === literalValueOf(target)) {
      return true;
    }
    if ((s & NumberLikeFlags) !== 0 && (t & TypeFlags.Number) !== 0) return true;
    if ((s & TypeFlags.NumberLiteral) !== 0 && (s & TypeFlags.EnumLiteral) !== 0
      && (t & TypeFlags.NumberLiteral) !== 0 && (t & TypeFlags.EnumLiteral) === 0
      && literalValueOf(source) === literalValueOf(target)) {
      return true;
    }
    if ((s & BigIntLikeFlags) !== 0 && (t & TypeFlags.BigInt) !== 0) return true;
    if ((s & BooleanLikeFlags) !== 0 && (t & TypeFlags.Boolean) !== 0) return true;
    if ((s & ESSymbolLikeFlags) !== 0 && (t & TypeFlags.ESSymbol) !== 0) return true;
    if ((s & TypeFlags.Enum) !== 0 && (t & TypeFlags.Enum) !== 0 && this.isEnumTypeRelatedTo(source, target)) {
      return true;
    }
    if ((s & TypeFlags.EnumLiteral) !== 0 && (t & TypeFlags.EnumLiteral) !== 0) {
      if ((s & TypeFlags.Union) !== 0 && (t & TypeFlags.Union) !== 0 && this.isEnumTypeRelatedTo(source, target)) {
        return true;
      }
      if ((s & TypeFlags.Literal) !== 0 && (t & TypeFlags.Literal) !== 0
        && literalValueOf(source) === literalValueOf(target) && this.isEnumTypeRelatedTo(source, target)) {
        return true;
      }
    }
    // In non-strictNullChecks mode, undefined/null are assignable to
    // anything except never (and unions/intersections, which may reduce).
    if ((s & TypeFlags.Undefined) !== 0
      && ((!this.strictNullChecks && (t & UnionOrIntersectionFlags) === 0)
        || (t & (TypeFlags.Undefined | TypeFlags.Void)) !== 0)) {
      return true;
    }
    if ((s & TypeFlags.Null) !== 0
      && ((!this.strictNullChecks && (t & UnionOrIntersectionFlags) === 0)
        || (t & TypeFlags.Null) !== 0)) {
      return true;
    }
    if ((s & TypeFlags.Object) !== 0 && (t & TypeFlags.NonPrimitive) !== 0) {
      return true;
    }
    if (relation.kind === RelationKind.Assignable || relation.kind === RelationKind.Comparable) {
      if ((s & TypeFlags.Any) !== 0) return true;
      if ((s & TypeFlags.Number) !== 0
        && ((t & TypeFlags.Enum) !== 0 || ((t & TypeFlags.NumberLiteral) !== 0 && (t & TypeFlags.EnumLiteral) !== 0))) {
        return true;
      }
      if ((s & TypeFlags.NumberLiteral) !== 0 && (s & TypeFlags.EnumLiteral) === 0
        && ((t & TypeFlags.Enum) !== 0
          || ((t & TypeFlags.NumberLiteral) !== 0 && (t & TypeFlags.EnumLiteral) !== 0 && literalValueOf(source) === literalValueOf(target)))) {
        return true;
      }
    }
    return false;
  }

  isEnumTypeRelatedTo(source: Type, target: Type): boolean {
    // Simplified: full version (relater.go) walks enum members via the
    // checker. Here: same enum symbol, or same enum name.
    const ss = (source as unknown as { symbol?: { name?: string } }).symbol;
    const ts = (target as unknown as { symbol?: { name?: string } }).symbol;
    if (ss === undefined || ts === undefined) return false;
    if (ss === ts) return true;
    return ss.name !== undefined && ss.name === ts.name;
  }
  isTypeDerivedFrom(source: Type, target: Type): boolean {
    return this.isTypeAssignableTo(source, target);
  }

  // -------------------------------------------------------------------------
  // Subtype reduction
  // -------------------------------------------------------------------------

  removeSubtypes(types: readonly Type[], hasObjectTypes: boolean): readonly Type[] {
    // Drop types that are subtypes of any other type in the list.
    void hasObjectTypes;
    if (types.length < 2) return types;
    const out: Type[] = [];
    for (let i = 0; i < types.length; i++) {
      let isSubsumed = false;
      for (let j = 0; j < types.length; j++) {
        if (i === j) continue;
        if (this.isTypeStrictSubtypeOf(types[i]!, types[j]!)) {
          isSubsumed = true;
          break;
        }
      }
      if (!isSubsumed) out.push(types[i]!);
    }
    return out;
  }

  getCommonSubtype(types: readonly Type[]): Type | undefined {
    // Find a type assignable to all of `types`.
    if (types.length === 0) return undefined;
    return types.reduce((acc: Type | undefined, t: Type) => {
      if (acc === undefined) return t;
      return this.isTypeAssignableTo(acc, t) ? acc :
        this.isTypeAssignableTo(t, acc) ? t : undefined;
    }, undefined as Type | undefined);
  }
  getCommonSupertype(types: readonly Type[]): Type | undefined {
    if (types.length === 0) return undefined;
    return types.reduce((acc: Type | undefined, t: Type) => {
      if (acc === undefined) return t;
      return this.isTypeAssignableTo(t, acc) ? acc :
        this.isTypeAssignableTo(acc, t) ? t : undefined;
    }, undefined as Type | undefined);
  }
  isTypeSubtypeOfFresh(source: Type, target: Type): boolean {
    // Same as isTypeSubtypeOf but with fresh-object handling — for our
    // simplified case, just forward.
    return this.isTypeSubtypeOf(source, target);
  }
  isExcessPropertyCheckTarget(t: Type): boolean {
    // A type is a target for excess-property check if it's an object
    // literal type and not a union containing 'any'.
    const flags = (t as { flags?: number }).flags ?? 0;
    return (flags & (1 << 19)) !== 0 && (flags & 1) === 0;
  }
  isObjectLiteralType(t: Type): boolean { void t; return (t.flags & TypeFlags.Object) !== 0; }
}

export function newRelater(): Relater {
  return new Relater();
}
