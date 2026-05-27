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
import type { Type, Signature, VarianceFlags } from "./types.js";
import { TypeFlags } from "./types.js";

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

export type RelationComparisonResult = 0 | 1 | 2 | 3;
export const RelationComparisonResult = {
  None: 0 as RelationComparisonResult,
  Succeeded: 1 as RelationComparisonResult,
  Failed: 2 as RelationComparisonResult,
  Reported: 3 as RelationComparisonResult,
} as const;

export type RecursionFlags = number;
export const RecursionFlags = {
  None: 0 as RecursionFlags,
  Source: (1 << 0) as RecursionFlags,
  Target: (1 << 1) as RecursionFlags,
  Both: 3 as RecursionFlags,
} as const;

export type Ternary = -1 | 0 | 1 | 2;
export const Ternary = {
  False: 0 as Ternary,
  Unknown: 1 as Ternary,
  Maybe: 2 as Ternary,
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
    if (source === target) return true;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    // Any/Unknown target accepts everything.
    if ((tf & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
    // Any source assigns to anything except never.
    if ((sf & TypeFlags.Any) !== 0 && (tf & TypeFlags.Never) === 0) return true;
    // Never source assigns to anything.
    if ((sf & TypeFlags.Never) !== 0) return true;
    // Primitive ↔ primitive: same flag bit.
    if ((sf & TypeFlags.Primitive) !== 0 && (tf & TypeFlags.Primitive) !== 0) {
      if (sf === tf) return true;
      // Literal-of-primitive widens to its base in assignable contexts.
      if (relation.kind === RelationKind.Assignable || relation.kind === RelationKind.Subtype) {
        if ((sf & TypeFlags.StringLiteral) !== 0 && (tf & TypeFlags.String) !== 0) return true;
        if ((sf & TypeFlags.NumberLiteral) !== 0 && (tf & TypeFlags.Number) !== 0) return true;
        if ((sf & TypeFlags.BooleanLiteral) !== 0 && (tf & TypeFlags.Boolean) !== 0) return true;
        if ((sf & TypeFlags.BigIntLiteral) !== 0 && (tf & TypeFlags.BigInt) !== 0) return true;
      }
      return false;
    }
    // Object/structural cases need the full relater — conservative
    // "true" until the deep walk is ported.
    return true;
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
    return this.isTypeRelatedTo(source, target, relation);
  }

  // -------------------------------------------------------------------------
  // Internal relation worker
  // -------------------------------------------------------------------------

  recursiveTypeRelatedTo(
    source: Type, target: Type, reportErrors: boolean, intersectionState: number,
    recursionFlags: RecursionFlags, relation: Relation,
  ): Ternary {
    void source; void target; void reportErrors; void intersectionState; void recursionFlags; void relation;
    return Ternary.True;
  }

  typeRelatedToSomeType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // source is related to target (a union) if related to at least one
    // of the union's constituents.
    void reportErrors;
    const types = (target as unknown as { types?: readonly Type[] }).types;
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
    const types = (target as unknown as { types?: readonly Type[] }).types;
    if (types === undefined) return Ternary.True;
    for (const t of types) {
      if (!this.isTypeAssignableTo(source, t)) return Ternary.False;
    }
    return Ternary.True;
  }
  someTypeRelatedToType(source: Type, target: Type, reportErrors: boolean): Ternary {
    // Source is a union; succeed if any constituent is related to target.
    void reportErrors;
    const types = (source as unknown as { types?: readonly Type[] }).types;
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
    const sourceTypes = (source as unknown as { types?: readonly Type[] }).types;
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
      if (sourceProp === undefined) return Ternary.False;
      const r = this.propertyRelatedTo(source, target, sourceProp, targetProp, reportErrors);
      if (r === Ternary.False) return r;
    }
    return Ternary.True;
  }

  propertyRelatedTo(
    source: Type, target: Type, sourceProp: AstSymbol, targetProp: AstSymbol, reportErrors: boolean,
  ): Ternary {
    void source; void target; void reportErrors;
    const sourceType = (sourceProp as unknown as { type?: Type }).type;
    const targetType = (targetProp as unknown as { type?: Type }).type;
    if (sourceType === undefined || targetType === undefined) return Ternary.True;
    return this.isTypeAssignableTo(sourceType, targetType) ? Ternary.True : Ternary.False;
  }

  signaturesRelatedTo(
    source: Type, target: Type, kind: number, reportErrors: boolean,
  ): Ternary {
    const which = kind === 0 ? "callSignatures" : "constructSignatures";
    const sourceSigs = (source as unknown as Record<string, readonly Signature[] | undefined>)[which];
    const targetSigs = (target as unknown as Record<string, readonly Signature[] | undefined>)[which];
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
      // SymbolFlags.Optional = 16777216
      if ((flags & 16777216) === 0) return false;
    }
    return true;
  }
  isSimpleTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
    return this.isTypeRelatedTo(source, target, relation);
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
