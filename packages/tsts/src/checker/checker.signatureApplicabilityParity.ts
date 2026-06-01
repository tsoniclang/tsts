/**
 * Signature applicability and overload ranking parity.
 *
 * TS-Go checker.go keeps call applicability, candidate ranking, contextual
 * argument typing, rest-argument expansion, and overload diagnostics together.
 * This split module ports that cluster as reusable checker operations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Signature, Type, TypeParameter } from "./types.js";
import { SignatureFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface SignatureApplicabilityHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly voidType: Type;
  readonly undefinedType: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getContextualType?: (node: AstNode) => Type | undefined;
  readonly getRestTypeOfSignature?: (signature: Signature) => Type | undefined;
  readonly getReturnTypeOfSignature?: (signature: Signature) => Type | undefined;
  readonly instantiateSignature?: (signature: Signature, mapper: SignatureTypeMapper | undefined) => Signature;
  readonly inferTypeArguments?: (signature: Signature, argumentsList: readonly AstNode[]) => SignatureTypeMapper | undefined;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly compareTypes?: (source: Type, target: Type) => number;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface SignatureTypeMapper {
  map(type: Type): Type;
}

export interface CandidateApplicability {
  readonly signature: Signature;
  readonly instantiated: Signature;
  readonly applicable: boolean;
  readonly arityValid: boolean;
  readonly argumentResults: readonly ArgumentApplicability[];
  readonly diagnostics: readonly string[];
  readonly score: number;
}

export interface ArgumentApplicability {
  readonly argument: AstNode;
  readonly parameter: AstSymbol | undefined;
  readonly argumentType: Type;
  readonly parameterType: Type;
  readonly assignable: boolean;
  readonly contextual: boolean;
}

export interface OverloadResolutionResult {
  readonly candidates: readonly CandidateApplicability[];
  readonly selected?: Signature;
  readonly diagnostics: readonly string[];
}

export function chooseOverload(
  node: AstNode,
  candidates: readonly Signature[],
  argumentsList: readonly AstNode[],
  host: SignatureApplicabilityHost,
): OverloadResolutionResult {
  const checked = candidates.map(candidate => checkSignatureApplicability(candidate, argumentsList, host));
  const applicable = checked.filter(candidate => candidate.applicable);
  if (applicable.length === 0) {
    const diagnostics = buildNoApplicableOverloadDiagnostics(checked);
    for (const message of diagnostics) host.report?.(node, message);
    return { candidates: checked, diagnostics };
  }
  const selected = pickBestApplicableSignature(applicable, host).instantiated;
  return { candidates: checked, selected, diagnostics: [] };
}

export function checkSignatureApplicability(signature: Signature, argumentsList: readonly AstNode[], host: SignatureApplicabilityHost): CandidateApplicability {
  const mapper = host.inferTypeArguments?.(signature, argumentsList);
  const instantiated = host.instantiateSignature?.(signature, mapper) ?? signature;
  const diagnostics: string[] = [];
  const arity = checkApplicableArity(instantiated, argumentsList.length);
  if (!arity.valid) diagnostics.push(arity.message);
  const argumentResults = checkArgumentApplicability(instantiated, argumentsList, host);
  diagnostics.push(...argumentResults.filter(result => !result.assignable).map(formatArgumentError));
  const score = scoreSignatureApplicability(instantiated, argumentResults, arity.valid);
  return {
    signature,
    instantiated,
    applicable: arity.valid && argumentResults.every(result => result.assignable),
    arityValid: arity.valid,
    argumentResults,
    diagnostics,
    score,
  };
}

export function checkApplicableArity(signature: Signature, argumentCount: number): ArityCheckResult {
  const min = signature.minArgumentCount;
  const max = maximumArgumentCount(signature);
  if (argumentCount < min) return { valid: false, message: `Expected at least ${min} arguments, got ${argumentCount}.` };
  if (max !== undefined && argumentCount > max) return { valid: false, message: `Expected at most ${max} arguments, got ${argumentCount}.` };
  return { valid: true, message: "" };
}

export interface ArityCheckResult {
  readonly valid: boolean;
  readonly message: string;
}

export function checkArgumentApplicability(signature: Signature, argumentsList: readonly AstNode[], host: SignatureApplicabilityHost): readonly ArgumentApplicability[] {
  const results: ArgumentApplicability[] = [];
  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index]!;
    const parameter = parameterAt(signature, index);
    const parameterType = getParameterType(signature, index, host);
    const argumentType = getArgumentType(argument, parameterType, host);
    const assignable = isArgumentAssignable(argumentType, parameterType, host);
    results.push({
      argument,
      parameter,
      argumentType,
      parameterType,
      assignable,
      contextual: host.getContextualType?.(argument) !== undefined,
    });
  }
  return results;
}

export function pickBestApplicableSignature(candidates: readonly CandidateApplicability[], host: SignatureApplicabilityHost): CandidateApplicability {
  let best = candidates[0]!;
  for (const candidate of candidates.slice(1)) {
    if (compareApplicableSignatures(candidate, best, host) < 0) best = candidate;
  }
  return best;
}

export function compareApplicableSignatures(left: CandidateApplicability, right: CandidateApplicability, host: SignatureApplicabilityHost): number {
  if (left.score !== right.score) return left.score - right.score;
  const leftSpecificity = signatureSpecificity(left.instantiated, host);
  const rightSpecificity = signatureSpecificity(right.instantiated, host);
  if (leftSpecificity !== rightSpecificity) return rightSpecificity - leftSpecificity;
  return left.instantiated.parameters.length - right.instantiated.parameters.length;
}

export function scoreSignatureApplicability(signature: Signature, argumentResults: readonly ArgumentApplicability[], arityValid: boolean): number {
  let score = arityValid ? 0 : 1000;
  for (const result of argumentResults) {
    if (!result.assignable) score += 100;
    if (result.contextual) score -= 1;
    if (isAnyLike(result.argumentType)) score += 10;
    if (isRestParameter(signature, result.parameter)) score += 2;
  }
  return score;
}

export function signatureSpecificity(signature: Signature, host: SignatureApplicabilityHost): number {
  let score = 0;
  for (const parameter of signature.parameters) {
    const type = getTypeOfSymbol(parameter) ?? host.unknownType;
    if (isLiteralLike(type)) score += 4;
    else if (isPrimitiveLike(type)) score += 2;
    else if (isAnyLike(type)) score -= 4;
    else score += 1;
  }
  if ((signature.flags & SignatureFlags.HasRestParameter) !== 0) score -= 2;
  return score;
}

export function buildNoApplicableOverloadDiagnostics(candidates: readonly CandidateApplicability[]): readonly string[] {
  if (candidates.length === 0) return ["No overloads are available."];
  const arity = candidates.find(candidate => !candidate.arityValid);
  if (arity !== undefined) return arity.diagnostics;
  const best = [...candidates].sort((left, right) => left.score - right.score)[0]!;
  return best.diagnostics.length === 0 ? ["No overload matches this call."] : best.diagnostics;
}

export function getArgumentType(argument: AstNode, contextualType: Type, host: SignatureApplicabilityHost): Type {
  const contextual = host.getContextualType?.(argument);
  if (contextual !== undefined) return contextual;
  return host.getTypeOfExpression?.(argument) ?? contextualType ?? host.unknownType;
}

export function getParameterType(signature: Signature, index: number, host: SignatureApplicabilityHost): Type {
  const parameter = parameterAt(signature, index);
  if (parameter !== undefined) return getTypeOfSymbol(parameter) ?? host.unknownType;
  return host.getRestTypeOfSignature?.(signature) ?? host.unknownType;
}

export function parameterAt(signature: Signature, index: number): AstSymbol | undefined {
  if (index < signature.parameters.length) return signature.parameters[index];
  return isRestSignature(signature) ? signature.parameters[signature.parameters.length - 1] : undefined;
}

export function maximumArgumentCount(signature: Signature): number | undefined {
  return isRestSignature(signature) ? undefined : signature.parameters.length;
}

export function isRestSignature(signature: Signature): boolean {
  return (signature.flags & SignatureFlags.HasRestParameter) !== 0;
}

export function isRestParameter(signature: Signature, parameter: AstSymbol | undefined): boolean {
  return parameter !== undefined && isRestSignature(signature) && parameter === signature.parameters[signature.parameters.length - 1];
}

export function isArgumentAssignable(source: Type, target: Type, host: SignatureApplicabilityHost): boolean {
  if (source === target) return true;
  if (isAnyLike(source) || isAnyLike(target)) return true;
  if ((source.flags & TypeFlags.Never) !== 0) return true;
  return host.isTypeAssignableTo?.(source, target) !== false;
}

export function inferMapperFromArguments(signature: Signature, argumentsList: readonly AstNode[], host: SignatureApplicabilityHost): SignatureTypeMapper {
  const inferred = new Map<TypeParameter, Type>();
  for (let index = 0; index < argumentsList.length; index += 1) {
    const parameterType = getParameterType(signature, index, host);
    const typeParameter = typeParameterOf(parameterType);
    if (typeParameter === undefined) continue;
    inferred.set(typeParameter, host.getTypeOfExpression?.(argumentsList[index]!) ?? host.unknownType);
  }
  return {
    map(type) {
      const parameter = typeParameterOf(type);
      return parameter === undefined ? type : inferred.get(parameter) ?? type;
    },
  };
}

export function instantiateSignatureFromMapper(signature: Signature, mapper: SignatureTypeMapper | undefined): Signature {
  if (mapper === undefined) return signature;
  const resolvedReturnType = signature.resolvedReturnType === undefined ? undefined : mapper.map(signature.resolvedReturnType);
  return {
    ...signature,
    parameters: signature.parameters.map(parameter => instantiateParameterSymbol(parameter, mapper)),
    ...(resolvedReturnType === undefined ? {} : { resolvedReturnType }),
    mapper: { kind: 0, map: mapper.map },
  };
}

export function getResolvedSignatureReturnType(signature: Signature, host: SignatureApplicabilityHost): Type {
  return signature.resolvedReturnType ?? host.getReturnTypeOfSignature?.(signature) ?? host.voidType;
}

export function hasCorrectTypeArgumentArity(signature: Signature, typeArguments: readonly Type[]): boolean {
  const typeParameters = signature.typeParameters ?? [];
  return typeArguments.length === 0 || typeArguments.length === typeParameters.length;
}

export function applyTypeArgumentsToSignature(signature: Signature, typeArguments: readonly Type[]): Signature {
  const typeParameters = signature.typeParameters ?? [];
  if (typeArguments.length === 0 || typeArguments.length !== typeParameters.length) return signature;
  const mapper: SignatureTypeMapper = {
    map(type) {
      const parameter = typeParameterOf(type);
      if (parameter === undefined) return type;
      const index = typeParameters.indexOf(parameter);
      return index >= 0 ? typeArguments[index]! : type;
    },
  };
  return instantiateSignatureFromMapper(signature, mapper);
}

export function getCandidateForOverloadFailure(candidates: readonly CandidateApplicability[]): CandidateApplicability | undefined {
  return [...candidates].sort((left, right) => {
    if (left.arityValid !== right.arityValid) return left.arityValid ? -1 : 1;
    return left.score - right.score;
  })[0];
}

export function formatArgumentError(result: ArgumentApplicability): string {
  return `Argument of type '${typeName(result.argumentType)}' is not assignable to parameter of type '${typeName(result.parameterType)}'.`;
}

export function signatureToDisplayParts(signature: Signature, host: SignatureApplicabilityHost): readonly string[] {
  const parts: string[] = [];
  parts.push("(");
  for (let index = 0; index < signature.parameters.length; index += 1) {
    if (index > 0) parts.push(", ");
    const parameter = signature.parameters[index]!;
    parts.push(parameter.name ?? parameter.escapedName ?? `arg${index}`);
    parts.push(": ");
    parts.push(typeName(getTypeOfSymbol(parameter) ?? host.unknownType));
  }
  parts.push(") => ");
  parts.push(typeName(getResolvedSignatureReturnType(signature, host)));
  return parts;
}

export function compareSignatureReturnTypes(left: Signature, right: Signature, host: SignatureApplicabilityHost): number {
  const leftReturn = getResolvedSignatureReturnType(left, host);
  const rightReturn = getResolvedSignatureReturnType(right, host);
  return host.compareTypes?.(leftReturn, rightReturn) ?? typeName(leftReturn).localeCompare(typeName(rightReturn));
}

export function signatureHasLiteralTypes(signature: Signature): boolean {
  return (signature.flags & SignatureFlags.HasLiteralTypes) !== 0
    || signature.parameters.some(parameter => {
      const type = getTypeOfSymbol(parameter);
      return type !== undefined && isLiteralLike(type);
    });
}

export function signatureMinArgumentCount(signature: Signature): number {
  return Math.max(0, signature.minArgumentCount);
}

export function signatureParameterCount(signature: Signature): number {
  return signature.parameters.length;
}

export function signatureHasTypeParameters(signature: Signature): boolean {
  return (signature.typeParameters?.length ?? 0) > 0;
}

function instantiateParameterSymbol(parameter: AstSymbol, mapper: SignatureTypeMapper): AstSymbol {
  const type = getTypeOfSymbol(parameter);
  if (type === undefined) return parameter;
  return { ...parameter, type: mapper.map(type) } as AstSymbol;
}

function typeParameterOf(type: Type): TypeParameter | undefined {
  return (type.flags & TypeFlags.TypeParameter) !== 0 ? type.data as TypeParameter | undefined : undefined;
}

function isAnyLike(type: Type): boolean {
  return (type.flags & TypeFlags.AnyOrUnknown) !== 0;
}

function isLiteralLike(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BigIntLiteral | TypeFlags.BooleanLiteral)) !== 0;
}

function isPrimitiveLike(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.BooleanLike | TypeFlags.ESSymbolLike)) !== 0;
}

function typeName(type: Type): string {
  if (type.symbol?.name !== undefined) return type.symbol.name;
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.VoidLike) !== 0) return "void";
  if ((type.flags & TypeFlags.Never) !== 0) return "never";
  return `type:${type.id}`;
}
