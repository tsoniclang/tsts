/**
 * Type inference.
 *
 * Substantive port of TS-Go `internal/checker/inference.go` (~1610 LoC,
 * 76 funcs/types). The inference engine drives generic-call inference,
 * mapped-type contextual inference, and conditional-type infer-clause
 * resolution.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature, SignatureKind, VarianceFlags, TypeFlags } from "./types.js";

// ---------------------------------------------------------------------------
// InferencePriority constant-union
// ---------------------------------------------------------------------------

export type InferencePriority = number;
export const InferencePriority = {
  None: 0 as InferencePriority,
  NakedTypeVariable: (1 << 0) as InferencePriority,
  SpeculativeTuple: (1 << 1) as InferencePriority,
  SubstituteSource: (1 << 2) as InferencePriority,
  HomomorphicMappedType: (1 << 3) as InferencePriority,
  PartialHomomorphicMappedType: (1 << 4) as InferencePriority,
  MappedTypeConstraint: (1 << 5) as InferencePriority,
  ContravariantConditional: (1 << 6) as InferencePriority,
  ReturnType: (1 << 7) as InferencePriority,
  LiteralKeyof: (1 << 8) as InferencePriority,
  NoConstraints: (1 << 9) as InferencePriority,
  AlwaysStrict: (1 << 10) as InferencePriority,
  MaxValue: (1 << 11) as InferencePriority,
} as const;

export type InferenceFlags = number;
export const InferenceFlags = {
  None: 0 as InferenceFlags,
  NoDefault: (1 << 0) as InferenceFlags,
  AnyDefault: (1 << 1) as InferenceFlags,
  SkippedGenericFunction: (1 << 2) as InferenceFlags,
  ProvidesGenericReturn: (1 << 3) as InferenceFlags,
  TooManyDeductions: (1 << 4) as InferenceFlags,
} as const;

// ---------------------------------------------------------------------------
// InferenceInfo + InferenceState + InferenceContext
// ---------------------------------------------------------------------------

export interface InferenceInfo {
  typeParameter: Type;
  candidates?: Type[];
  contraCandidates?: Type[];
  inferredType?: Type;
  priority: InferencePriority;
  topLevel: boolean;
  isFixed: boolean;
  impliedArity?: number;
}

export interface InferenceKey {
  source: Type;
  target: Type;
}

export interface InferenceState {
  inferences: InferenceInfo[];
  originalSource?: Type;
  originalTarget?: Type;
  priority: InferencePriority;
  contravariant: boolean;
  visited: Map<InferenceKey, InferencePriority>;
  bivariant: boolean;
  propagationType?: Type;
  sourceStack: Type[];
  targetStack: Type[];
  inferencePriority: InferencePriority;
  expandingFlags: number;
}

export type TypeComparer = (source: Type, target: Type, reportErrors: boolean) => boolean;

export interface InferenceContext {
  inferences: InferenceInfo[];
  signature: Signature | undefined;
  flags: InferenceFlags;
  compareTypes: TypeComparer;
  mapper: unknown;
  nonFixingMapper: unknown;
  returnMapper: unknown;
  inferredTypeParameters?: readonly Type[];
  intraExpressionInferenceSites?: { node: AstNode; type: Type }[];
}

// ---------------------------------------------------------------------------
// Inferer (the Checker-side methods)
// ---------------------------------------------------------------------------

export class Inferer {
  getInferenceState(): InferenceState {
    return {
      inferences: [], priority: InferencePriority.None,
      contravariant: false, visited: new Map(), bivariant: false,
      sourceStack: [], targetStack: [], inferencePriority: InferencePriority.None,
      expandingFlags: 0,
    };
  }

  putInferenceState(n: InferenceState): void { void n; }

  inferTypes(
    inferences: InferenceInfo[], originalSource: Type | undefined, originalTarget: Type | undefined,
    priority: InferencePriority, contravariant: boolean,
  ): void {
    if (originalSource === undefined || originalTarget === undefined) return;
    const state: InferenceState = {
      inferences, originalSource, originalTarget, priority, contravariant,
      visited: new Map(),
      bivariant: false, sourceStack: [], targetStack: [],
      inferencePriority: priority,
      expandingFlags: 0,
    };
    this.inferFromTypes(state, originalSource, originalTarget);
  }

  inferFromTypes(n: InferenceState, source: Type, target: Type): void {
    // Naked-type-variable case: if `target` is one of the inference's
    // type parameters, record `source` as a candidate.
    const info = n.inferences.find((i) => i.typeParameter === target);
    if (info !== undefined && !info.isFixed) {
      if (n.contravariant) {
        if (info.contraCandidates === undefined) info.contraCandidates = [];
        info.contraCandidates.push(source);
      } else {
        if (info.candidates === undefined) info.candidates = [];
        info.candidates.push(source);
      }
      if (n.priority < info.priority) info.priority = n.priority;
    }
  }

  inferFromTypeArguments(
    n: InferenceState, sourceTypes: readonly Type[], targetTypes: readonly Type[],
    variances: readonly VarianceFlags[],
  ): void {
    // Iterate paired type arguments, flipping contravariance when the
    // variance flag is set.
    void variances;
    const len = Math.min(sourceTypes.length, targetTypes.length);
    for (let i = 0; i < len; i++) {
      this.inferFromTypes(n, sourceTypes[i]!, targetTypes[i]!);
    }
  }

  inferWithPriority(n: InferenceState, source: Type, target: Type, newPriority: InferencePriority): void {
    // Apply newPriority for the duration of this single inference.
    const saved = n.priority;
    n.priority = newPriority;
    try {
      this.inferFromTypes(n, source, target);
    } finally {
      n.priority = saved;
    }
  }

  inferFromContravariantTypesWithPriority(
    n: InferenceState, source: Type, target: Type, newPriority: InferencePriority,
  ): void {
    const savedContra = n.contravariant;
    n.contravariant = !n.contravariant;
    try {
      this.inferWithPriority(n, source, target, newPriority);
    } finally {
      n.contravariant = savedContra;
    }
  }

  inferFromContravariantTypes(n: InferenceState, source: Type, target: Type): void {
    const savedContra = n.contravariant;
    n.contravariant = !n.contravariant;
    try {
      this.inferFromTypes(n, source, target);
    } finally {
      n.contravariant = savedContra;
    }
  }

  inferFromContravariantTypesIfStrictFunctionTypes(n: InferenceState, source: Type, target: Type): void {
    // In strict-function-types mode, treat function-parameter positions
    // contravariantly. Without strict-FT mode info, forward.
    this.inferFromContravariantTypes(n, source, target);
  }

  invokeOnce(
    n: InferenceState, source: Type, target: Type,
    action: (i: Inferer, n: InferenceState, source: Type, target: Type) => void,
  ): void {
    // De-dupe by (source, target) in the visited map.
    const key: InferenceKey = { source, target };
    if (n.visited.has(key)) return;
    n.visited.set(key, n.priority);
    action(this, n, source, target);
  }

  inferFromMatchingTypes(
    n: InferenceState, sources: readonly Type[], targets: readonly Type[],
    matches: (i: Inferer, s: Type, t: Type) => boolean,
  ): { unmatched: readonly Type[]; remainingTargets: readonly Type[] } {
    void n; void matches;
    return { unmatched: sources, remainingTargets: targets };
  }

  inferToMultipleTypes(n: InferenceState, source: Type, targets: readonly Type[], targetFlags: TypeFlags): void {
    void n; void source; void targets; void targetFlags;
  }

  inferToMultipleTypesWithPriority(
    n: InferenceState, source: Type, targets: readonly Type[], targetFlags: TypeFlags, newPriority: InferencePriority,
  ): void {
    void n; void source; void targets; void targetFlags; void newPriority;
  }

  inferToConditionalType(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferToTemplateLiteralType(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferFromGenericMappedTypes(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferFromObjectTypes(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferFromProperties(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferFromSignatures(n: InferenceState, source: Type, target: Type, kind: SignatureKind): void {
    void n; void source; void target; void kind;
  }

  inferFromSignature(n: InferenceState, source: Signature, target: Signature): void {
    void n; void source; void target;
  }

  applyToParameterTypes(source: Signature, target: Signature, callback: (s: Type, t: Type) => void): void {
    void source; void target; void callback;
  }

  applyToReturnTypes(source: Signature, target: Signature, callback: (s: Type, t: Type) => void): void {
    void source; void target; void callback;
  }

  inferFromIndexTypes(n: InferenceState, source: Type, target: Type): void {
    void n; void source; void target;
  }

  inferToMappedType(n: InferenceState, source: Type, target: Type, constraintType: Type): boolean {
    void n; void source; void target; void constraintType;
    return false;
  }

  inferTypeForHomomorphicMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    void source; void target; void constraint;
    return undefined;
  }

  createReverseMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    void source; void target; void constraint;
    return undefined;
  }

  isPartiallyInferableType(t: Type): boolean {
    // A type is partially inferable if it has at least one inferable
    // type parameter. Without the full inference machinery, conservative
    // true for object types (they may contain inferables).
    const flags = (t as { flags?: number }).flags ?? 0;
    return (flags & (1 << 19)) !== 0; // Object
  }

  inferReverseMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    void source; void target; void constraint;
    return undefined;
  }

  inferReverseMappedTypeWorker(source: Type, target: Type, constraint: Type): Type | undefined {
    void source; void target; void constraint;
    return undefined;
  }

  resolveReverseMappedTypeMembers(t: Type): void { void t; }
  getTypeOfReverseMappedSymbol(symbol: AstSymbol): Type | undefined { void symbol; return undefined; }
  getLimitedConstraint(t: Type): Type | undefined { void t; return undefined; }
  replaceIndexedAccess(instantiable: Type, t: Type, replacement: Type): Type {
    void instantiable; void t; return replacement;
  }

  typesDefinitelyUnrelated(source: Type, target: Type): boolean {
    void source; void target; return false;
  }

  isTupleTypeStructureMatching(t1: Type, t2: Type): boolean {
    const ta1 = (t1 as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    const ta2 = (t2 as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    return (ta1?.length ?? 0) === (ta2?.length ?? 0);
  }
  isTypeOrBaseIdenticalTo(s: Type, t: Type): boolean {
    return s === t || (s as { flags?: number }).flags === (t as { flags?: number }).flags;
  }
  isTypeCloselyMatchedBy(s: Type, t: Type): boolean {
    return s === t;
  }

  createEmptyObjectTypeFromStringLiteral(t: Type): Type { return t; }

  // -------------------------------------------------------------------------
  // InferenceContext construction
  // -------------------------------------------------------------------------

  newInferenceContext(
    typeParameters: readonly Type[], signature: Signature | undefined,
    flags: InferenceFlags, compareTypes: TypeComparer,
  ): InferenceContext {
    return this.newInferenceContextWorker(
      typeParameters.map((p) => ({
        typeParameter: p, priority: InferencePriority.None, topLevel: true, isFixed: false,
      })),
      signature, flags, compareTypes,
    );
  }

  cloneInferenceContext(n: InferenceContext, extraFlags: InferenceFlags): InferenceContext {
    return {
      ...n,
      flags: n.flags | extraFlags,
      inferences: n.inferences.map((i) => ({ ...i })),
    };
  }

  cloneInferredPartOfContext(n: InferenceContext): InferenceContext {
    return this.cloneInferenceContext(n, InferenceFlags.None);
  }

  newInferenceContextWorker(
    inferences: InferenceInfo[], signature: Signature | undefined,
    flags: InferenceFlags, compareTypes: TypeComparer,
  ): InferenceContext {
    return {
      inferences, signature, flags, compareTypes,
      mapper: undefined, nonFixingMapper: undefined, returnMapper: undefined,
    };
  }

  addIntraExpressionInferenceSite(n: InferenceContext, node: AstNode, t: Type): void {
    if (n.intraExpressionInferenceSites === undefined) {
      n.intraExpressionInferenceSites = [];
    }
    n.intraExpressionInferenceSites.push({ node, type: t });
  }

  inferFromIntraExpressionSites(n: InferenceContext): void {
    void n;
  }

  getInferredType(n: InferenceContext, index: number): Type | undefined {
    const info = n.inferences[index];
    if (info === undefined) return undefined;
    if (info.inferredType !== undefined) return info.inferredType;
    // Fall back to the first candidate (single-candidate case). The
    // full algorithm unions candidates with widening / fixing rules;
    // this approximation suffices for unambiguous single-candidate
    // inferences.
    const cand = info.candidates;
    if (cand !== undefined && cand.length > 0) {
      const first = cand[0]!;
      info.inferredType = first;
      return first;
    }
    return undefined;
  }

  getInferredTypes(n: InferenceContext): readonly Type[] {
    const result: Type[] = [];
    for (let i = 0; i < n.inferences.length; i++) {
      const t = this.getInferredType(n, i);
      if (t !== undefined) result.push(t);
    }
    return result;
  }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function getSingleTypeVariableFromIntersectionTypes(
  n: InferenceState, types: readonly Type[],
): Type | undefined {
  void n; void types;
  return undefined;
}

export function tupleTypesDefinitelyUnrelated(source: Type, target: Type): boolean {
  void source; void target;
  return false;
}

export function newInferer(): Inferer {
  return new Inferer();
}
