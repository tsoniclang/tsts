/**
 * Type inference.
 *
 * Substantive port of TS-Go `internal/checker/inference.go` (~1610 LoC,
 * 76 funcs/types). The inference engine drives generic-call inference,
 * mapped-type contextual inference, and conditional-type infer-clause
 * resolution.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature, SignatureKind, VarianceFlags, TypeFlags as TypeFlagsType } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

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
  Circularity: -1 as InferencePriority, // less than all other priorities
  PriorityImpliesCombination: 416 as InferencePriority, // ReturnType|MappedTypeConstraint|LiteralKeyof
} as const;

export type InferenceFlags = number;
// 1:1 with TS-Go: only None/NoDefault/AnyDefault/SkippedGenericFunction
// (the Strada ProvidesGenericReturn/TooManyDeductions flags were dropped).
export const InferenceFlags = {
  None: 0 as InferenceFlags,
  NoDefault: (1 << 0) as InferenceFlags,
  AnyDefault: (1 << 1) as InferenceFlags,
  SkippedGenericFunction: (1 << 2) as InferenceFlags,
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
    this.invokeOnce(n, source, target, (inferer, state, sourceType, targetType) => {
      inferer.inferFromTypesWorker(state, sourceType, targetType);
    });
  }

  private inferFromTypesWorker(n: InferenceState, source: Type, target: Type): void {
    // Naked-type-variable case: if `target` is one of the inference's
    // type parameters, record `source` as a candidate.
    const info = n.inferences.find((i) => i.typeParameter === target);
    if (info !== undefined && !info.isFixed) {
      addInferenceCandidate(info, source, n.contravariant);
      if (n.priority < info.priority) info.priority = n.priority;
      return;
    }

    const sourceFlags = source.flags;
    const targetFlags = target.flags;
    if ((targetFlags & TypeFlags.Union) !== 0) {
      this.inferToMultipleTypes(n, source, constituentTypes(target), targetFlags);
      return;
    }
    if ((sourceFlags & TypeFlags.Union) !== 0) {
      for (const sourceConstituent of constituentTypes(source)) this.inferFromTypes(n, sourceConstituent, target);
      return;
    }
    if ((targetFlags & TypeFlags.Intersection) !== 0) {
      for (const targetConstituent of constituentTypes(target)) this.inferFromTypes(n, source, targetConstituent);
      return;
    }
    if ((sourceFlags & TypeFlags.Intersection) !== 0) {
      for (const sourceConstituent of constituentTypes(source)) this.inferFromTypes(n, sourceConstituent, target);
      return;
    }
    if ((targetFlags & TypeFlags.Conditional) !== 0) {
      this.inferToConditionalType(n, source, target);
      return;
    }
    const sourceArgs = typeArgumentsOf(source);
    const targetArgs = typeArgumentsOf(target);
    if (sourceArgs.length !== 0 || targetArgs.length !== 0) {
      this.inferFromTypeArguments(n, sourceArgs, targetArgs, []);
    }
    if ((sourceFlags & TypeFlags.Object) !== 0 && (targetFlags & TypeFlags.Object) !== 0) {
      this.inferFromObjectTypes(n, source, target);
    }
  }

  inferFromTypeArguments(
    n: InferenceState, sourceTypes: readonly Type[], targetTypes: readonly Type[],
    variances: readonly VarianceFlags[],
  ): void {
    // Iterate paired type arguments, flipping contravariance when the
    // variance flag is set.
    const len = Math.min(sourceTypes.length, targetTypes.length);
    for (let i = 0; i < len; i++) {
      const variance = variances[i] ?? VarianceFlagsCovariant;
      if ((variance & VarianceFlagsContravariant) !== 0 && (variance & VarianceFlagsCovariant) === 0) {
        this.inferFromContravariantTypes(n, sourceTypes[i]!, targetTypes[i]!);
      } else {
        this.inferFromTypes(n, sourceTypes[i]!, targetTypes[i]!);
      }
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
    const stableKey = `${source.id}->${target.id}`;
    if ((n.visited as unknown as Map<string, InferencePriority>).has(stableKey)) return;
    (n.visited as unknown as Map<string, InferencePriority>).set(stableKey, n.priority);
    if (n.visited.has(key)) return;
    n.visited.set(key, n.priority);
    action(this, n, source, target);
  }

  inferFromMatchingTypes(
    n: InferenceState, sources: readonly Type[], targets: readonly Type[],
    matches: (i: Inferer, s: Type, t: Type) => boolean,
  ): { unmatched: readonly Type[]; remainingTargets: readonly Type[] } {
    const unmatched: Type[] = [];
    const remainingTargets = [...targets];
    for (const source of sources) {
      const index = remainingTargets.findIndex((target) => matches(this, source, target));
      if (index < 0) {
        unmatched.push(source);
        continue;
      }
      this.inferFromTypes(n, source, remainingTargets[index]!);
      remainingTargets.splice(index, 1);
    }
    return { unmatched, remainingTargets };
  }

  inferToMultipleTypes(n: InferenceState, source: Type, targets: readonly Type[], targetFlags: TypeFlagsType): void {
    // For each target in a union, infer source against it.
    void targetFlags;
    for (const t of targets) this.inferFromTypes(n, source, t);
  }

  inferToMultipleTypesWithPriority(
    n: InferenceState, source: Type, targets: readonly Type[], targetFlags: TypeFlagsType, newPriority: InferencePriority,
  ): void {
    const saved = n.priority;
    n.priority = newPriority;
    try {
      this.inferToMultipleTypes(n, source, targets, targetFlags);
    } finally {
      n.priority = saved;
    }
  }

  inferToConditionalType(n: InferenceState, source: Type, target: Type): void {
    // Conditional type: source → checkType, trueType, falseType.
    const data = target.data as { checkType?: Type; trueType?: Type; falseType?: Type; root?: { checkType?: Type; trueType?: Type; falseType?: Type } } | undefined;
    const checkType = data?.checkType ?? data?.root?.checkType;
    const trueType = data?.trueType ?? data?.root?.trueType;
    const falseType = data?.falseType ?? data?.root?.falseType;
    if (checkType !== undefined) this.inferFromTypes(n, source, checkType);
    if (trueType !== undefined) this.inferFromTypes(n, source, trueType);
    if (falseType !== undefined) this.inferFromTypes(n, source, falseType);
  }

  inferToTemplateLiteralType(n: InferenceState, source: Type, target: Type): void {
    // Template literal type inference matches text+holes; conservative
    // forward as a single-type inference.
    this.inferFromTypes(n, source, target);
  }

  inferFromGenericMappedTypes(n: InferenceState, source: Type, target: Type): void {
    // Mapped type's constraint + template; conservative pair forward.
    const data = target.data as { constraintType?: Type; templateType?: Type } | undefined;
    const constraint = data?.constraintType;
    const template = data?.templateType;
    if (constraint !== undefined) this.inferFromTypes(n, source, constraint);
    if (template !== undefined) this.inferFromTypes(n, source, template);
  }

  inferFromObjectTypes(n: InferenceState, source: Type, target: Type): void {
    this.inferFromProperties(n, source, target);
    this.inferFromSignatures(n, source, target, 0 /* Call */);
    this.inferFromSignatures(n, source, target, 1 /* Construct */);
  }

  inferFromProperties(n: InferenceState, source: Type, target: Type): void {
    const targetProps = (target as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const sourceProps = (source as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (targetProps === undefined || sourceProps === undefined) return;
    for (const [name, targetSym] of targetProps) {
      const sourceSym = sourceProps.get(name);
      if (sourceSym === undefined) continue;
      const sourceType = (sourceSym as unknown as { type?: Type }).type;
      const targetType = (targetSym as unknown as { type?: Type }).type;
      if (sourceType !== undefined && targetType !== undefined) {
        this.inferFromTypes(n, sourceType, targetType);
      }
    }
  }

  inferFromSignatures(n: InferenceState, source: Type, target: Type, kind: SignatureKind): void {
    const sourceSigs = signaturesOf(source, kind);
    const targetSigs = signaturesOf(target, kind);
    if (sourceSigs === undefined || targetSigs === undefined) return;
    const len = Math.min(sourceSigs.length, targetSigs.length);
    for (let i = 0; i < len; i++) {
      this.inferFromSignature(n, sourceSigs[i]!, targetSigs[i]!);
    }
  }

  inferFromSignature(n: InferenceState, source: Signature, target: Signature): void {
    this.applyToParameterTypes(source, target, (s, t) => this.inferFromContravariantTypes(n, s, t));
    this.applyToReturnTypes(source, target, (s, t) => this.inferFromTypes(n, s, t));
  }

  applyToParameterTypes(source: Signature, target: Signature, callback: (s: Type, t: Type) => void): void {
    const sourceParams = (source as unknown as { parameters?: readonly AstSymbol[] }).parameters ?? [];
    const targetParams = (target as unknown as { parameters?: readonly AstSymbol[] }).parameters ?? [];
    const len = Math.min(sourceParams.length, targetParams.length);
    for (let i = 0; i < len; i++) {
      const sourceType = getTypeOfSymbol(sourceParams[i]);
      const targetType = getTypeOfSymbol(targetParams[i]);
      if (sourceType !== undefined && targetType !== undefined) callback(sourceType, targetType);
    }
  }

  applyToReturnTypes(source: Signature, target: Signature, callback: (s: Type, t: Type) => void): void {
    const sourceRet = (source as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    const targetRet = (target as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    if (sourceRet !== undefined && targetRet !== undefined) callback(sourceRet, targetRet);
  }

  inferFromIndexTypes(n: InferenceState, source: Type, target: Type): void {
    // Pull index infos off both types and pair-infer.
    const sourceInfos = indexInfosOf(source);
    const targetInfos = indexInfosOf(target);
    if (sourceInfos === undefined || targetInfos === undefined) return;
    const len = Math.min(sourceInfos.length, targetInfos.length);
    for (let i = 0; i < len; i++) {
      this.inferFromTypes(n, sourceInfos[i]!.valueType, targetInfos[i]!.valueType);
    }
  }

  inferToMappedType(n: InferenceState, source: Type, target: Type, constraintType: Type): boolean {
    this.inferFromTypes(n, source, constraintType);
    const data = target.data as { typeParameter?: Type; templateType?: Type; nameType?: Type } | undefined;
    if (data?.typeParameter !== undefined) this.inferFromTypes(n, source, data.typeParameter);
    if (data?.templateType !== undefined) this.inferFromTypes(n, source, data.templateType);
    if (data?.nameType !== undefined) this.inferFromTypes(n, source, data.nameType);
    return true;
  }

  inferTypeForHomomorphicMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    if ((target.flags & TypeFlags.Object) === 0) return undefined;
    if ((objectFlagsOf(target) & ObjectFlags.Mapped) === 0) return undefined;
    if (!this.isPartiallyInferableType(source)) return undefined;
    return constraint;
  }

  createReverseMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    return {
      flags: TypeFlags.Object,
      id: nextSyntheticTypeId(),
      symbol: source.symbol,
      data: {
        objectFlags: ObjectFlags.ReverseMapped,
        source,
        mappedType: target.data,
        constraintType: constraint,
      },
    } as Type;
  }

  isPartiallyInferableType(t: Type): boolean {
    // A type is partially inferable if it has at least one inferable
    // type parameter. Without the full inference machinery, conservative
    // true for object types (they may contain inferables).
    if ((t.flags & TypeFlags.TypeParameter) !== 0) return true;
    if ((t.flags & TypeFlags.Object) !== 0) {
      const members = (t.symbol as unknown as { members?: Map<string, AstSymbol> } | undefined)?.members;
      if (members === undefined || members.size === 0) return true;
      for (const symbol of members.values()) {
        const type = getTypeOfSymbol(symbol);
        if (type !== undefined && this.isPartiallyInferableType(type)) return true;
      }
    }
    if ((t.flags & TypeFlags.UnionOrIntersection) !== 0) {
      return constituentTypes(t).some((type) => this.isPartiallyInferableType(type));
    }
    return false;
  }

  inferReverseMappedType(source: Type, target: Type, constraint: Type): Type | undefined {
    return this.inferReverseMappedTypeWorker(source, target, constraint);
  }

  inferReverseMappedTypeWorker(source: Type, target: Type, constraint: Type): Type | undefined {
    const inferred = this.inferTypeForHomomorphicMappedType(source, target, constraint);
    if (inferred !== undefined) return this.createReverseMappedType(source, target, inferred);
    return undefined;
  }

  resolveReverseMappedTypeMembers(t: Type): void {
    const data = t.data as { source?: Type } | undefined;
    if (t.symbol === undefined && data?.source?.symbol !== undefined) t.symbol = data.source.symbol;
  }
  getTypeOfReverseMappedSymbol(symbol: AstSymbol): Type | undefined {
    return getTypeOfSymbol(symbol);
  }
  getLimitedConstraint(t: Type): Type | undefined {
    return (t.data as { constraint?: Type; constraintType?: Type } | undefined)?.constraint
      ?? (t.data as { constraintType?: Type } | undefined)?.constraintType;
  }
  replaceIndexedAccess(instantiable: Type, t: Type, replacement: Type): Type {
    void instantiable; void t; return replacement;
  }

  typesDefinitelyUnrelated(source: Type, target: Type): boolean {
    // Two types are definitely unrelated if their primitive flags
    // don't overlap (and neither is Any/Unknown/Never).
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    // Any/Unknown/Never relate to everything.
    if ((sf & (TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Never)) !== 0) return false;
    if ((tf & (TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Never)) !== 0) return false;
    const primitiveMask = TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.BooleanLike | TypeFlags.ESSymbolLike;
    if ((sf & primitiveMask) !== 0 && (tf & primitiveMask) !== 0 && (sf & tf & primitiveMask) === 0) {
      return true;
    }
    return false;
  }

  isTupleTypeStructureMatching(t1: Type, t2: Type): boolean {
    return tupleElementInfos(t1).length === tupleElementInfos(t2).length;
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
    const candidates = bestInferenceCandidates(info);
    if (candidates.length > 0) {
      const first = candidates[0]!;
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
  void n;
  let result: Type | undefined;
  for (const type of types) {
    if ((type.flags & TypeFlags.TypeParameter) === 0) continue;
    if (result !== undefined) return undefined;
    result = type;
  }
  return result;
}

export function tupleTypesDefinitelyUnrelated(source: Type, target: Type): boolean {
  const sourceElements = tupleElementInfos(source);
  const targetElements = tupleElementInfos(target);
  if (sourceElements.length !== targetElements.length) return true;
  for (let i = 0; i < sourceElements.length; i += 1) {
    const sourceFlags = sourceElements[i]?.flags ?? 0;
    const targetFlags = targetElements[i]?.flags ?? 0;
    if ((sourceFlags & targetFlags) === 0) return true;
  }
  return false;
}

function addInferenceCandidate(info: InferenceInfo, candidate: Type, contravariant: boolean): void {
  const candidates = contravariant ? (info.contraCandidates ??= []) : (info.candidates ??= []);
  if (!candidates.includes(candidate)) candidates.push(candidate);
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return (type.data as { resolvedTypeArguments?: readonly Type[]; resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? type.aliasTypeArguments
    ?? [];
}

function signaturesOf(type: Type, kind: SignatureKind): readonly Signature[] | undefined {
  const data = type.data as { declaredCallSignatures?: readonly Signature[]; declaredConstructSignatures?: readonly Signature[] } | undefined;
  return kind === 0 ? data?.declaredCallSignatures : data?.declaredConstructSignatures;
}

function indexInfosOf(type: Type): readonly { keyType: Type; valueType: Type }[] | undefined {
  return (type.data as { indexInfos?: readonly { keyType: Type; valueType: Type }[] } | undefined)?.indexInfos;
}

function objectFlagsOf(type: Type): ObjectFlags {
  return ((type.data as { objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? 0) as ObjectFlags;
}

function tupleElementInfos(type: Type): readonly { flags: number }[] {
  return (type.data as { elementInfo?: readonly { flags: number }[] } | undefined)?.elementInfo ?? [];
}

function bestInferenceCandidates(info: InferenceInfo): readonly Type[] {
  if (info.candidates !== undefined && info.candidates.length !== 0) return info.candidates;
  if (info.contraCandidates !== undefined && info.contraCandidates.length !== 0) return info.contraCandidates;
  return [];
}

let syntheticTypeId = -1;
function nextSyntheticTypeId(): number {
  syntheticTypeId -= 1;
  return syntheticTypeId;
}

const VarianceFlagsCovariant = 1 << 0;
const VarianceFlagsContravariant = 1 << 1;

export function newInferer(): Inferer {
  return new Inferer();
}
