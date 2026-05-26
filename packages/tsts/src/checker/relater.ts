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
import type { Type, Signature, VarianceFlags, TypeFlags } from "./types.js";

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

  isTypeAssignableTo(source: Type, target: Type): boolean { void source; void target; return true; }
  isTypeSubtypeOf(source: Type, target: Type): boolean { void source; void target; return true; }
  isTypeStrictSubtypeOf(source: Type, target: Type): boolean { void source; void target; return true; }
  isTypeIdenticalTo(source: Type, target: Type): boolean { void source; void target; return false; }
  isTypeComparableTo(source: Type, target: Type): boolean { void source; void target; return true; }
  isTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
    void source; void target; void relation; return true;
  }
  checkTypeAssignableTo(
    source: Type, target: Type, errorNode: AstNode | undefined,
    headMessage?: { code: number; message: string },
  ): boolean {
    void source; void target; void errorNode; void headMessage; return true;
  }
  checkTypeRelatedTo(
    source: Type, target: Type, relation: Relation, errorNode: AstNode | undefined,
  ): boolean {
    void source; void target; void relation; void errorNode; return true;
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
    void source; void target; void reportErrors; return Ternary.True;
  }

  typeRelatedToEachType(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  someTypeRelatedToType(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  eachTypeRelatedToSomeType(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  eachTypeRelatedToType(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  structuredTypeRelatedTo(
    source: Type, target: Type, reportErrors: boolean, intersectionState: number,
  ): Ternary {
    void source; void target; void reportErrors; void intersectionState; return Ternary.True;
  }

  membersRelatedToIndexInfo(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  propertiesRelatedTo(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors; return Ternary.True;
  }

  propertyRelatedTo(
    source: Type, target: Type, sourceProp: AstSymbol, targetProp: AstSymbol, reportErrors: boolean,
  ): Ternary {
    void source; void target; void sourceProp; void targetProp; void reportErrors;
    return Ternary.True;
  }

  signaturesRelatedTo(
    source: Type, target: Type, kind: number, reportErrors: boolean,
  ): Ternary {
    void source; void target; void kind; void reportErrors;
    return Ternary.True;
  }

  signatureRelatedTo(
    source: Signature, target: Signature, erase: boolean, reportErrors: boolean,
  ): Ternary {
    void source; void target; void erase; void reportErrors;
    return Ternary.True;
  }

  indexSignaturesRelatedTo(
    source: Type, target: Type, sourceIsPrimitive: boolean, reportErrors: boolean,
  ): Ternary {
    void source; void target; void sourceIsPrimitive; void reportErrors;
    return Ternary.True;
  }

  indexInfoRelatedTo(source: Type, target: Type, reportErrors: boolean): Ternary {
    void source; void target; void reportErrors;
    return Ternary.True;
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

  isWeakType(t: Type): boolean { void t; return false; }
  isSimpleTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
    void source; void target; void relation;
    return false;
  }
  isTypeDerivedFrom(source: Type, target: Type): boolean { void source; void target; return false; }

  // -------------------------------------------------------------------------
  // Subtype reduction
  // -------------------------------------------------------------------------

  removeSubtypes(types: readonly Type[], hasObjectTypes: boolean): readonly Type[] {
    void hasObjectTypes;
    return types;
  }

  getCommonSubtype(types: readonly Type[]): Type | undefined { void types; return undefined; }
  getCommonSupertype(types: readonly Type[]): Type | undefined { void types; return undefined; }
  isTypeSubtypeOfFresh(source: Type, target: Type): boolean { void source; void target; return false; }
  isExcessPropertyCheckTarget(t: Type): boolean { void t; return false; }
  isObjectLiteralType(t: Type): boolean { void t; return (t.flags & TypeFlags.Object) !== 0; }
}

export function newRelater(): Relater {
  return new Relater();
}
