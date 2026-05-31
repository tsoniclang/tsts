/**
 * Call and overload resolution support.
 *
 * This is a split TypeScript port of the call-resolution spine in TS-Go
 * `checker.go`: `getResolvedSignature`, `resolveCallExpression`,
 * `resolveCall`, `chooseOverload`, `hasCorrectArity`,
 * `hasCorrectTypeArgumentArity`, `isSignatureApplicable`,
 * overload-failure candidate construction, and argument-spread handling.
 *
 * The main checker currently owns the user-visible entrypoints. This module
 * keeps the TS-Go decision machinery in a focused, reusable form so parser,
 * checker, services, and future diagnostics work do not grow separate
 * overload-selection translations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import { TypeFlags, SignatureFlags, getTypeOfSymbol, type Signature, type Type, type TypeParameter } from "./types.js";

export type CallResolutionRelation = (source: Type, target: Type) => boolean;
export type CallArgumentKind = "normal" | "spread" | "synthetic-this";
export type OverloadFailureKind =
  | "none"
  | "no-candidates"
  | "arity"
  | "type-argument-arity"
  | "argument-type"
  | "this-argument"
  | "not-callable"
  | "not-constructable";

export interface CallArgument {
  readonly node?: AstNode;
  readonly type: Type;
  readonly kind: CallArgumentKind;
  readonly name?: string;
}

export interface CallResolutionContext {
  readonly relation: CallResolutionRelation;
  readonly subtypeRelation?: CallResolutionRelation;
  readonly inferTypeArguments?: (signature: Signature, args: readonly CallArgument[], typeArguments: readonly Type[]) => readonly Type[];
  readonly instantiateSignature?: (signature: Signature, typeArguments: readonly Type[]) => Signature;
  readonly getRestElementType?: (type: Type) => Type | undefined;
  readonly getSpreadElementTypes?: (type: Type) => readonly Type[] | undefined;
  readonly getTypeParameterDefault?: (parameter: TypeParameter) => Type | undefined;
  readonly getTypeParameterConstraint?: (parameter: TypeParameter) => Type | undefined;
  readonly isOptionalParameter?: (symbol: AstSymbol) => boolean;
  readonly isRestParameter?: (symbol: AstSymbol) => boolean;
  readonly isTypeAssignableToKind?: (type: Type, flags: TypeFlags) => boolean;
}

export interface CandidateApplicability {
  readonly signature: Signature;
  readonly applicable: boolean;
  readonly failure: OverloadFailureKind;
  readonly failingArgumentIndex?: number;
  readonly expectedType?: Type;
  readonly actualType?: Type;
  readonly requiredArgumentCount: number;
  readonly effectiveArgumentCount: number;
}

export interface CallResolutionResult {
  readonly signature?: Signature;
  readonly selectedIndex: number;
  readonly failure: OverloadFailureKind;
  readonly candidateResults: readonly CandidateApplicability[];
  readonly overloadFailure?: Signature;
}

export interface CallResolutionTrace {
  readonly phases: readonly CallResolutionTracePhase[];
}

export interface CallResolutionTracePhase {
  readonly name: string;
  readonly candidateCount: number;
  readonly accepted: number;
  readonly rejected: number;
}

interface CandidateBucket {
  readonly literal: Signature[];
  readonly specialized: Signature[];
  readonly generic: Signature[];
  readonly fallback: Signature[];
}

export function resolveCallOverloads(
  signatures: readonly Signature[],
  args: readonly CallArgument[],
  typeArguments: readonly Type[],
  context: CallResolutionContext,
): CallResolutionResult {
  if (signatures.length === 0) {
    return {
      selectedIndex: -1,
      failure: "no-candidates",
      candidateResults: [],
    };
  }
  const reordered = reorderCallCandidates(signatures);
  const subtypePass = chooseOverload(reordered, args, typeArguments, {
    ...context,
    relation: context.subtypeRelation ?? context.relation,
  });
  if (subtypePass.signature !== undefined) return subtypePass;
  const assignablePass = chooseOverload(reordered, args, typeArguments, context);
  if (assignablePass.signature !== undefined) return assignablePass;
  return createOverloadFailureResult(reordered, args, typeArguments, context, assignablePass.candidateResults);
}

export function reorderCallCandidates(signatures: readonly Signature[]): readonly Signature[] {
  const buckets: CandidateBucket = {
    literal: [],
    specialized: [],
    generic: [],
    fallback: [],
  };
  for (const signature of signatures) {
    if (signatureHasLiteralTypes(signature)) {
      buckets.literal.push(signature);
    } else if (isSpecializedSignature(signature)) {
      buckets.specialized.push(signature);
    } else if ((signature.typeParameters?.length ?? 0) !== 0) {
      buckets.generic.push(signature);
    } else {
      buckets.fallback.push(signature);
    }
  }
  return [
    ...buckets.literal,
    ...buckets.specialized,
    ...buckets.generic,
    ...buckets.fallback,
  ];
}

export function chooseOverload(
  signatures: readonly Signature[],
  args: readonly CallArgument[],
  typeArguments: readonly Type[],
  context: CallResolutionContext,
): CallResolutionResult {
  const candidateResults: CandidateApplicability[] = [];
  for (let index = 0; index < signatures.length; index += 1) {
    const signature = instantiateCandidateIfNeeded(signatures[index]!, args, typeArguments, context);
    const applicability = isSignatureApplicable(signature, args, typeArguments, context);
    candidateResults.push(applicability);
    if (applicability.applicable) {
      return {
        signature,
        selectedIndex: index,
        failure: "none",
        candidateResults,
      };
    }
  }
  return {
    selectedIndex: -1,
    failure: firstMeaningfulFailure(candidateResults),
    candidateResults,
  };
}

export function instantiateCandidateIfNeeded(
  signature: Signature,
  args: readonly CallArgument[],
  typeArguments: readonly Type[],
  context: CallResolutionContext,
): Signature {
  const parameters = signature.typeParameters ?? [];
  if (parameters.length === 0) return signature;
  const explicit = fillMissingTypeArguments(typeArguments, parameters, context);
  const inferred = context.inferTypeArguments?.(signature, args, explicit) ?? explicit;
  return context.instantiateSignature?.(signature, inferred) ?? signature;
}

export function isSignatureApplicable(
  signature: Signature,
  args: readonly CallArgument[],
  typeArguments: readonly Type[],
  context: CallResolutionContext,
): CandidateApplicability {
  const requiredArgumentCount = getMinArgumentCount(signature, context);
  const effectiveArgumentCount = getEffectiveArgumentCount(args);
  if (!hasCorrectTypeArgumentArity(signature, typeArguments, context)) {
    return {
      signature,
      applicable: false,
      failure: "type-argument-arity",
      requiredArgumentCount,
      effectiveArgumentCount,
    };
  }
  if (!hasCorrectArity(signature, args, context)) {
    return {
      signature,
      applicable: false,
      failure: "arity",
      requiredArgumentCount,
      effectiveArgumentCount,
    };
  }
  const thisResult = checkThisArgumentApplicability(signature, args, context);
  if (!thisResult.applicable) return thisResult;
  return checkArgumentTypes(signature, args, context);
}

export function hasCorrectTypeArgumentArity(
  signature: Signature,
  typeArguments: readonly Type[],
  context: CallResolutionContext,
): boolean {
  const typeParameters = signature.typeParameters ?? [];
  if (typeArguments.length === 0) return true;
  if (typeParameters.length === 0) return false;
  const minimum = getMinTypeArgumentCount(typeParameters, context);
  return typeArguments.length >= minimum && typeArguments.length <= typeParameters.length;
}

export function hasCorrectArity(
  signature: Signature,
  args: readonly CallArgument[],
  context: CallResolutionContext,
): boolean {
  const minimum = getMinArgumentCount(signature, context);
  const effectiveCount = getEffectiveArgumentCount(args);
  if (effectiveCount < minimum) return false;
  if (signatureHasRestParameter(signature, context)) return true;
  return effectiveCount <= signature.parameters.length;
}

export function getEffectiveArgumentCount(args: readonly CallArgument[]): number {
  let count = args.length;
  while (count > 0 && isOmittedArgument(args[count - 1]!)) count -= 1;
  return count;
}

export function getMinArgumentCount(signature: Signature, context: CallResolutionContext): number {
  if (signature.resolvedMinArgumentCount !== undefined) return signature.resolvedMinArgumentCount;
  const declared = signature.minArgumentCount;
  const parameters = signature.parameters;
  let inferred = 0;
  for (let index = 0; index < parameters.length; index += 1) {
    const parameter = parameters[index]!;
    if (context.isRestParameter?.(parameter) === true) break;
    if (context.isOptionalParameter?.(parameter) === true) continue;
    const type = getTypeOfSymbol(parameter);
    if (type !== undefined && acceptsVoid(type)) continue;
    inferred = index + 1;
  }
  return Math.max(declared, inferred);
}

export function getMinTypeArgumentCount(parameters: readonly TypeParameter[], context: CallResolutionContext): number {
  let minimum = 0;
  for (let index = 0; index < parameters.length; index += 1) {
    const parameter = parameters[index]!;
    if (context.getTypeParameterDefault?.(parameter) === undefined) minimum = index + 1;
  }
  return minimum;
}

export function fillMissingTypeArguments(
  typeArguments: readonly Type[],
  parameters: readonly TypeParameter[],
  context: CallResolutionContext,
): readonly Type[] {
  if (typeArguments.length >= parameters.length) return typeArguments;
  const filled = [...typeArguments];
  for (let index = typeArguments.length; index < parameters.length; index += 1) {
    const parameter = parameters[index]!;
    const defaultType = context.getTypeParameterDefault?.(parameter);
    if (defaultType !== undefined) {
      filled.push(defaultType);
      continue;
    }
    const constraint = context.getTypeParameterConstraint?.(parameter) ?? parameter.constraint;
    if (constraint !== undefined) {
      filled.push(constraint);
    }
  }
  return filled;
}

export function checkThisArgumentApplicability(
  signature: Signature,
  args: readonly CallArgument[],
  context: CallResolutionContext,
): CandidateApplicability {
  const requiredArgumentCount = getMinArgumentCount(signature, context);
  const effectiveArgumentCount = getEffectiveArgumentCount(args);
  const thisParameter = signature.thisParameter;
  if (thisParameter === undefined) {
    return { signature, applicable: true, failure: "none", requiredArgumentCount, effectiveArgumentCount };
  }
  const thisArgument = args.find(argument => argument.kind === "synthetic-this");
  if (thisArgument === undefined) {
    return { signature, applicable: false, failure: "this-argument", requiredArgumentCount, effectiveArgumentCount };
  }
  const thisType = getTypeOfSymbol(thisParameter);
  if (thisType === undefined || context.relation(thisArgument.type, thisType)) {
    return { signature, applicable: true, failure: "none", requiredArgumentCount, effectiveArgumentCount };
  }
  return {
    signature,
    applicable: false,
    failure: "this-argument",
    failingArgumentIndex: 0,
    expectedType: thisType,
    actualType: thisArgument.type,
    requiredArgumentCount,
    effectiveArgumentCount,
  };
}

export function checkArgumentTypes(
  signature: Signature,
  args: readonly CallArgument[],
  context: CallResolutionContext,
): CandidateApplicability {
  const requiredArgumentCount = getMinArgumentCount(signature, context);
  const effectiveArgumentCount = getEffectiveArgumentCount(args);
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument.kind === "synthetic-this") continue;
    const parameterType = getTypeAtPosition(signature, index, context);
    if (parameterType === undefined) continue;
    const argumentTypes = argument.kind === "spread"
      ? expandSpreadArgument(argument.type, context)
      : [argument.type];
    for (const argumentType of argumentTypes) {
      if (!context.relation(argumentType, parameterType)) {
        return {
          signature,
          applicable: false,
          failure: "argument-type",
          failingArgumentIndex: index,
          expectedType: parameterType,
          actualType: argumentType,
          requiredArgumentCount,
          effectiveArgumentCount,
        };
      }
    }
  }
  return { signature, applicable: true, failure: "none", requiredArgumentCount, effectiveArgumentCount };
}

export function getTypeAtPosition(
  signature: Signature,
  position: number,
  context: CallResolutionContext,
): Type | undefined {
  const direct = signature.parameters[position];
  if (direct !== undefined) return getTypeOfSymbol(direct);
  if (!signatureHasRestParameter(signature, context)) return undefined;
  const restParameter = signature.parameters[signature.parameters.length - 1];
  if (restParameter === undefined) return undefined;
  const restType = getTypeOfSymbol(restParameter);
  if (restType === undefined) return undefined;
  return context.getRestElementType?.(restType) ?? restType;
}

export function expandSpreadArgument(type: Type, context: CallResolutionContext): readonly Type[] {
  const elements = context.getSpreadElementTypes?.(type);
  if (elements !== undefined) return elements;
  const restElement = context.getRestElementType?.(type);
  if (restElement !== undefined) return [restElement];
  return [type];
}

export function createOverloadFailureResult(
  signatures: readonly Signature[],
  args: readonly CallArgument[],
  typeArguments: readonly Type[],
  context: CallResolutionContext,
  existingResults: readonly CandidateApplicability[],
): CallResolutionResult {
  const candidateResults = existingResults.length === signatures.length
    ? existingResults
    : signatures.map(signature => isSignatureApplicable(signature, args, typeArguments, context));
  const failure = firstMeaningfulFailure(candidateResults);
  const overloadFailure = pickOverloadFailureSignature(signatures, args, context);
  return {
    selectedIndex: -1,
    failure,
    candidateResults,
    ...(overloadFailure === undefined ? {} : { overloadFailure }),
  };
}

export function firstMeaningfulFailure(results: readonly CandidateApplicability[]): OverloadFailureKind {
  const priority: readonly OverloadFailureKind[] = [
    "argument-type",
    "this-argument",
    "type-argument-arity",
    "arity",
    "not-callable",
    "not-constructable",
    "no-candidates",
  ];
  for (const failure of priority) {
    if (results.some(result => result.failure === failure)) return failure;
  }
  return "none";
}

export function pickOverloadFailureSignature(
  signatures: readonly Signature[],
  args: readonly CallArgument[],
  context: CallResolutionContext,
): Signature | undefined {
  if (signatures.length === 0) return undefined;
  const arityCompatible = signatures.filter(signature => hasCorrectArity(signature, args, context));
  if (arityCompatible.length === 1) return arityCompatible[0];
  if (arityCompatible.length > 1) return createUnionOfSignaturesForOverloadFailure(arityCompatible);
  return pickLongestCandidateSignature(signatures, args);
}

export function pickLongestCandidateSignature(signatures: readonly Signature[], args: readonly CallArgument[]): Signature | undefined {
  if (signatures.length === 0) return undefined;
  const argumentCount = getEffectiveArgumentCount(args);
  let best = signatures[0]!;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const signature of signatures) {
    const distance = Math.abs(signature.parameters.length - argumentCount);
    if (distance < bestDistance) {
      best = signature;
      bestDistance = distance;
    }
  }
  return best;
}

export function createUnionOfSignaturesForOverloadFailure(signatures: readonly Signature[]): Signature | undefined {
  if (signatures.length === 0) return undefined;
  if (signatures.length === 1) return signatures[0];
  const first = signatures[0]!;
  const parameters = combineOverloadFailureParameters(signatures);
  const returnTypes = signatures
    .map(signature => signature.resolvedReturnType)
    .filter((type): type is Type => type !== undefined);
  const resolvedReturnType = returnTypes[0];
  return {
    flags: first.flags | SignatureFlags.IsSignatureCandidateForOverloadFailure,
    ...(first.declaration === undefined ? {} : { declaration: first.declaration }),
    ...(first.typeParameters === undefined ? {} : { typeParameters: first.typeParameters }),
    parameters,
    ...(combineThisParameters(signatures) === undefined ? {} : { thisParameter: combineThisParameters(signatures)! }),
    ...(resolvedReturnType === undefined ? {} : { resolvedReturnType }),
    minArgumentCount: Math.min(...signatures.map(signature => signature.minArgumentCount)),
    ...(first.compositeKind === undefined ? {} : { compositeKind: first.compositeKind }),
    compositeSignatures: signatures,
  };
}

export function combineOverloadFailureParameters(signatures: readonly Signature[]): readonly AstSymbol[] {
  const max = Math.max(...signatures.map(signature => signature.parameters.length));
  const parameters: AstSymbol[] = [];
  for (let index = 0; index < max; index += 1) {
    const symbols = signatures
      .map(signature => signature.parameters[index])
      .filter((symbol): symbol is AstSymbol => symbol !== undefined);
    if (symbols.length === 0) continue;
    parameters.push(combineParameterSymbols(symbols, index));
  }
  return parameters;
}

export function combineParameterSymbols(symbols: readonly AstSymbol[], index: number): AstSymbol {
  const name = symbols.find(symbol => (symbol.name ?? "").length !== 0)?.name ?? `arg${index}`;
  const flags = symbols.reduce((acc, symbol) => acc | (symbol.flags ?? 0), 0);
  const declarations = symbols.flatMap(symbol => symbol.declarations ?? []);
  return {
    name,
    escapedName: name,
    flags: flags | SymbolFlags.Transient,
    declarations,
  };
}

export function combineThisParameters(signatures: readonly Signature[]): AstSymbol | undefined {
  const thisParameters = signatures
    .map(signature => signature.thisParameter)
    .filter((symbol): symbol is AstSymbol => symbol !== undefined);
  if (thisParameters.length === 0) return undefined;
  return combineParameterSymbols(thisParameters, 0);
}

export function signatureHasLiteralTypes(signature: Signature): boolean {
  if ((signature.flags & SignatureFlags.HasLiteralTypes) !== 0) return true;
  for (const parameter of signature.parameters) {
    const type = getTypeOfSymbol(parameter);
    if (type !== undefined && isLiteralLike(type)) return true;
  }
  const returnType = signature.resolvedReturnType;
  return returnType !== undefined && isLiteralLike(returnType);
}

export function isSpecializedSignature(signature: Signature): boolean {
  return (signature.typeParameters?.length ?? 0) === 0
    && signature.parameters.some(parameter => {
      const type = getTypeOfSymbol(parameter);
      return type !== undefined && isNarrowCallableParameter(type);
    });
}

export function isNarrowCallableParameter(type: Type): boolean {
  if (isLiteralLike(type)) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return true;
  if ((type.flags & TypeFlags.Intersection) !== 0) return true;
  return false;
}

export function isLiteralLike(type: Type): boolean {
  return (type.flags & TypeFlags.StringLiteral) !== 0
    || (type.flags & TypeFlags.NumberLiteral) !== 0
    || (type.flags & TypeFlags.BigIntLiteral) !== 0
    || (type.flags & TypeFlags.BooleanLiteral) !== 0
    || (type.flags & TypeFlags.EnumLiteral) !== 0
    || (type.flags & TypeFlags.UniqueESSymbol) !== 0;
}

export function signatureHasRestParameter(signature: Signature, context: CallResolutionContext): boolean {
  if ((signature.flags & SignatureFlags.HasRestParameter) !== 0) return true;
  const last = signature.parameters[signature.parameters.length - 1];
  return last !== undefined && context.isRestParameter?.(last) === true;
}

export function acceptsVoid(type: Type): boolean {
  return (type.flags & TypeFlags.Void) !== 0
    || (type.flags & TypeFlags.Undefined) !== 0
    || (type.flags & TypeFlags.Any) !== 0
    || (type.flags & TypeFlags.Unknown) !== 0;
}

export function isOmittedArgument(argument: CallArgument): boolean {
  return argument.name === "__omitted";
}

export function buildCallResolutionTrace(results: readonly CandidateApplicability[]): CallResolutionTrace {
  const arity = results.filter(result => result.failure === "arity");
  const typeArity = results.filter(result => result.failure === "type-argument-arity");
  const argumentType = results.filter(result => result.failure === "argument-type");
  const thisArgument = results.filter(result => result.failure === "this-argument");
  const accepted = results.filter(result => result.applicable);
  return {
    phases: [
      makeTracePhase("typeArgumentArity", results, typeArity),
      makeTracePhase("argumentArity", results, arity),
      makeTracePhase("thisArgument", results, thisArgument),
      makeTracePhase("argumentTypes", results, argumentType),
      {
        name: "accepted",
        candidateCount: results.length,
        accepted: accepted.length,
        rejected: results.length - accepted.length,
      },
    ],
  };
}

function makeTracePhase(
  name: string,
  all: readonly CandidateApplicability[],
  rejected: readonly CandidateApplicability[],
): CallResolutionTracePhase {
  return {
    name,
    candidateCount: all.length,
    accepted: all.length - rejected.length,
    rejected: rejected.length,
  };
}

export function formatCallResolutionFailure(result: CallResolutionResult): string {
  if (result.signature !== undefined) return "call resolved";
  switch (result.failure) {
    case "no-candidates":
      return "No overload candidates were available.";
    case "arity":
      return formatArityFailure(result.candidateResults);
    case "type-argument-arity":
      return "No overload expects the supplied number of type arguments.";
    case "argument-type":
      return formatArgumentTypeFailure(result.candidateResults);
    case "this-argument":
      return "The call target's this parameter is not compatible with the receiver.";
    case "not-callable":
      return "The expression is not callable.";
    case "not-constructable":
      return "The expression is not constructable.";
    case "none":
      return "No overload failure was recorded.";
  }
}

export function formatArityFailure(results: readonly CandidateApplicability[]): string {
  const first = results.find(result => result.failure === "arity") ?? results[0];
  if (first === undefined) return "No overload candidates were available.";
  return `Expected at least ${first.requiredArgumentCount} arguments, but got ${first.effectiveArgumentCount}.`;
}

export function formatArgumentTypeFailure(results: readonly CandidateApplicability[]): string {
  const first = results.find(result => result.failure === "argument-type");
  if (first === undefined) return "No argument type failure was recorded.";
  const position = first.failingArgumentIndex === undefined ? "an argument" : `argument ${first.failingArgumentIndex + 1}`;
  return `Type of ${position} is not assignable to the corresponding parameter.`;
}

export function classifyCallTarget(signatures: readonly Signature[], kind: "call" | "construct"): OverloadFailureKind {
  if (signatures.length !== 0) return "none";
  return kind === "call" ? "not-callable" : "not-constructable";
}

export function getEffectiveCallArguments(args: readonly CallArgument[]): readonly CallArgument[] {
  const syntheticThis = args.find(argument => argument.kind === "synthetic-this");
  const callArgs = args.filter(argument => argument.kind !== "synthetic-this");
  return syntheticThis === undefined ? callArgs : [syntheticThis, ...callArgs];
}

export function getSpreadArgumentIndex(args: readonly CallArgument[]): number {
  return args.findIndex(argument => argument.kind === "spread");
}

export function hasSpreadArgument(args: readonly CallArgument[]): boolean {
  return getSpreadArgumentIndex(args) >= 0;
}

export function getNonSpreadArgumentCount(args: readonly CallArgument[]): number {
  return args.filter(argument => argument.kind !== "spread" && argument.kind !== "synthetic-this").length;
}

export function compareCandidateSpecificity(
  left: Signature,
  right: Signature,
  context: CallResolutionContext,
): number {
  const leftScore = candidateSpecificityScore(left, context);
  const rightScore = candidateSpecificityScore(right, context);
  return rightScore - leftScore;
}

export function candidateSpecificityScore(signature: Signature, context: CallResolutionContext): number {
  let score = 0;
  if (signatureHasLiteralTypes(signature)) score += 8;
  if ((signature.typeParameters?.length ?? 0) === 0) score += 4;
  if (signatureHasRestParameter(signature, context)) score -= 2;
  score += signature.parameters.length;
  return score;
}

export function stableSortCandidatesBySpecificity(
  signatures: readonly Signature[],
  context: CallResolutionContext,
): readonly Signature[] {
  return signatures
    .map((signature, index) => ({ signature, index }))
    .sort((left, right) => {
      const comparison = compareCandidateSpecificity(left.signature, right.signature, context);
      return comparison === 0 ? left.index - right.index : comparison;
    })
    .map(entry => entry.signature);
}
