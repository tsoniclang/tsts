import { SymbolFlags, type Node as AstNode, type Symbol as AstSymbol } from "../ast/index.js";
import { anyType, getArrayElementType, getTypeOfSymbol, voidType } from "./checker.checkedtype.js";
import { SignatureKind, TypeFlags, type Signature, type Type, type TypeParameter, type VarianceFlags } from "./types.js";

export type SignatureCheckMode = number;
export const SignatureCheckMode = {
  None: 0 as SignatureCheckMode,
  BivariantCallback: 1 << 0 as SignatureCheckMode,
  StrictCallback: 1 << 1 as SignatureCheckMode,
  IgnoreReturnTypes: 1 << 2 as SignatureCheckMode,
  StrictArity: 1 << 3 as SignatureCheckMode,
  Callback: (1 << 0) | (1 << 1) as SignatureCheckMode,
} as const;

export type Ternary = -1 | 0 | 1 | 3;
export const Ternary = {
  False: 0 as Ternary,
  Unknown: 1 as Ternary,
  Maybe: 3 as Ternary,
  True: -1 as Ternary,
} as const;

export type TypeComparer = (source: Type, target: Type) => Ternary;

export interface TypePredicate {
  readonly kind: TypePredicateKind;
  readonly parameterName: string;
  readonly parameterIndex: number;
  readonly type?: Type;
}

export type TypePredicateKind = 0 | 1 | 2 | 3;
export const TypePredicateKind = {
  This: 0 as TypePredicateKind,
  Identifier: 1 as TypePredicateKind,
  AssertsThis: 2 as TypePredicateKind,
  AssertsIdentifier: 3 as TypePredicateKind,
} as const;

export function isSignatureAssignableTo(
  source: Signature,
  target: Signature,
  ignoreReturnTypes: boolean,
  compareTypes: TypeComparer,
): boolean {
  const mode = ignoreReturnTypes ? SignatureCheckMode.IgnoreReturnTypes : SignatureCheckMode.None;
  return compareSignaturesRelated(source, target, mode, compareTypes) !== Ternary.False;
}

export function compareSignaturesRelated(
  source: Signature,
  target: Signature,
  checkMode: SignatureCheckMode,
  compareTypes: TypeComparer,
): Ternary {
  if (source === target) return Ternary.True;
  if (source.parameters.length < getMinArgumentCount(target)) return Ternary.False;
  if ((checkMode & SignatureCheckMode.StrictArity) !== 0 && getParameterCount(source) > getParameterCount(target)) return Ternary.False;

  const sourceThisType = source.thisParameter === undefined ? undefined : getTypeOfSymbol(source.thisParameter);
  const targetThisType = target.thisParameter === undefined ? undefined : getTypeOfSymbol(target.thisParameter);
  if (sourceThisType !== undefined && targetThisType !== undefined && compareTypes(targetThisType, sourceThisType) === Ternary.False) {
    return Ternary.False;
  }

  const count = Math.max(getParameterCount(source), getParameterCount(target));
  for (let index = 0; index < count; index++) {
    const sourceType = getTypeAtPosition(source, index);
    const targetType = getTypeAtPosition(target, index);
    if (sourceType === undefined || targetType === undefined) continue;
    const related = compareTypes(targetType, sourceType);
    if (related === Ternary.False) return Ternary.False;
  }

  if ((checkMode & SignatureCheckMode.IgnoreReturnTypes) === 0) {
    const targetReturnType = getReturnTypeOfSignature(target);
    if (targetReturnType !== voidType && targetReturnType !== anyType) {
      const sourceReturnType = getReturnTypeOfSignature(source);
      if (compareTypes(sourceReturnType, targetReturnType) === Ternary.False) return Ternary.False;
    }
  }

  const sourcePredicate = getTypePredicateOfSignature(source);
  const targetPredicate = getTypePredicateOfSignature(target);
  if (sourcePredicate !== undefined || targetPredicate !== undefined) {
    if (sourcePredicate === undefined || targetPredicate === undefined) return Ternary.False;
    return compareTypePredicatesIdentical(sourcePredicate, targetPredicate, compareTypes);
  }
  return Ternary.True;
}

export function compareSignaturesIdentical(
  source: Signature,
  target: Signature,
  partialMatch: boolean,
  ignoreThisTypes: boolean,
  ignoreReturnTypes: boolean,
  compareTypes: TypeComparer,
): Ternary {
  if (source === target) return Ternary.True;
  if (!partialMatch && source.parameters.length !== target.parameters.length) return Ternary.False;
  if (!ignoreThisTypes) {
    const sourceThis = source.thisParameter === undefined ? undefined : getTypeOfSymbol(source.thisParameter);
    const targetThis = target.thisParameter === undefined ? undefined : getTypeOfSymbol(target.thisParameter);
    if ((sourceThis === undefined) !== (targetThis === undefined)) return Ternary.False;
    if (sourceThis !== undefined && targetThis !== undefined && compareTypes(sourceThis, targetThis) === Ternary.False) return Ternary.False;
  }
  const count = partialMatch ? Math.min(source.parameters.length, target.parameters.length) : source.parameters.length;
  for (let index = 0; index < count; index++) {
    const sourceType = getTypeAtPosition(source, index);
    const targetType = getTypeAtPosition(target, index);
    if (sourceType !== undefined && targetType !== undefined && compareTypes(sourceType, targetType) === Ternary.False) return Ternary.False;
  }
  if (!ignoreReturnTypes) {
    const sourceReturn = getReturnTypeOfSignature(source);
    const targetReturn = getReturnTypeOfSignature(target);
    if (compareTypes(sourceReturn, targetReturn) === Ternary.False) return Ternary.False;
  }
  return compareTypePredicatesIdentical(getTypePredicateOfSignature(source), getTypePredicateOfSignature(target), compareTypes);
}

export function isMatchingSignature(source: Signature, target: Signature, partialMatch: boolean): boolean {
  if (!partialMatch && source.parameters.length !== target.parameters.length) return false;
  if (source.minArgumentCount > target.minArgumentCount) return false;
  return true;
}

export function findMatchingSignatures(signatureLists: readonly (readonly Signature[])[], signature: Signature, listIndex: number): readonly Signature[] {
  const result: Signature[] = [];
  for (let index = listIndex; index < signatureLists.length; index++) {
    const match = findMatchingSignature(signatureLists[index]!, signature, false, false, false);
    if (match !== undefined) result.push(match);
  }
  return result;
}

export function findMatchingSignature(
  signatureList: readonly Signature[],
  signature: Signature,
  partialMatch: boolean,
  ignoreThisTypes: boolean,
  ignoreReturnTypes: boolean,
): Signature | undefined {
  for (const candidate of signatureList) {
    if (!isMatchingSignature(candidate, signature, partialMatch)) continue;
    if (!ignoreThisTypes && (candidate.thisParameter === undefined) !== (signature.thisParameter === undefined)) continue;
    if (!ignoreReturnTypes && getReturnTypeOfSignature(candidate).flags !== getReturnTypeOfSignature(signature).flags) continue;
    return candidate;
  }
  return undefined;
}

export function compareTypeParametersIdentical(sourceParams: readonly TypeParameter[] | undefined, targetParams: readonly TypeParameter[] | undefined): boolean {
  const source = sourceParams ?? [];
  const target = targetParams ?? [];
  if (source.length !== target.length) return false;
  for (let index = 0; index < source.length; index++) {
    if ((source[index]!.constraint?.flags ?? 0) !== (target[index]!.constraint?.flags ?? 0)) return false;
  }
  return true;
}

export function compareTypePredicatesIdentical(
  source: TypePredicate | undefined,
  target: TypePredicate | undefined,
  compareTypes: TypeComparer,
): Ternary {
  if (source === target) return Ternary.True;
  if (source === undefined || target === undefined) return Ternary.False;
  if (!typePredicateKindsMatch(source, target)) return Ternary.False;
  if (source.parameterName !== target.parameterName || source.parameterIndex !== target.parameterIndex) return Ternary.False;
  if (source.type === undefined || target.type === undefined) return source.type === target.type ? Ternary.True : Ternary.False;
  return compareTypes(source.type, target.type);
}

export function typePredicateKindsMatch(a: TypePredicate, b: TypePredicate): boolean {
  return a.kind === b.kind
    || (a.kind === TypePredicateKind.Identifier && b.kind === TypePredicateKind.AssertsIdentifier)
    || (a.kind === TypePredicateKind.This && b.kind === TypePredicateKind.AssertsThis);
}

export function getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined {
  return signature.resolvedTypePredicate as TypePredicate | undefined;
}

export function newTypePredicate(kind: TypePredicateKind, parameterName: string, parameterIndex: number, type: Type | undefined): TypePredicate {
  return { kind, parameterName, parameterIndex, ...(type === undefined ? {} : { type }) };
}

export function getReturnTypeOfSignature(signature: Signature): Type {
  return signature.resolvedReturnType ?? anyType;
}

export function getParameterCount(signature: Signature): number {
  const restType = getEffectiveRestType(signature);
  return restType === undefined ? signature.parameters.length : Math.max(0, signature.parameters.length - 1);
}

export function getMinArgumentCount(signature: Signature): number {
  if (signature.resolvedMinArgumentCount !== undefined) return signature.resolvedMinArgumentCount;
  return signature.minArgumentCount;
}

export function hasEffectiveRestParameter(signature: Signature): boolean {
  const last = signature.parameters[signature.parameters.length - 1];
  return last !== undefined && (((last.flags ?? 0) & SymbolFlags.Optional) === 0) && symbolHasRestFlag(last);
}

export function getTypeAtPosition(signature: Signature, position: number): Type | undefined {
  const parameter = tryGetTypeAtPosition(signature, position);
  if (parameter !== undefined) return parameter;
  const restType = getRestTypeAtPosition(signature, position, false);
  return restType;
}

export function tryGetTypeAtPosition(signature: Signature, position: number): Type | undefined {
  const parameter = signature.parameters[position];
  return parameter === undefined ? undefined : getTypeOfSymbol(parameter);
}

export function getRestOrAnyTypeAtPosition(signature: Signature, position: number): Type {
  return getRestTypeAtPosition(signature, position, false) ?? anyType;
}

export function getRestTypeAtPosition(signature: Signature, position: number, readonly: boolean): Type | undefined {
  void readonly;
  const restType = getEffectiveRestType(signature);
  if (restType === undefined) return undefined;
  const elementType = getArrayElementType(restType);
  if (elementType !== undefined) return elementType;
  return position >= Math.max(0, signature.parameters.length - 1) ? restType : undefined;
}

export function getEffectiveRestType(signature: Signature): Type | undefined {
  if (!hasEffectiveRestParameter(signature)) return undefined;
  const last = signature.parameters[signature.parameters.length - 1]!;
  return getTypeOfSymbol(last);
}

export function getThisTypeOfSignature(signature: Signature): Type | undefined {
  return signature.thisParameter === undefined ? undefined : getTypeOfSymbol(signature.thisParameter);
}

export function isTopSignature(signature: Signature): boolean {
  const returnType = getReturnTypeOfSignature(signature);
  return signature.parameters.length === 0 && (returnType.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0;
}

export function isInstantiatedGenericParameter(signature: Signature, position: number): boolean {
  const parameter = signature.parameters[position];
  if (parameter === undefined) return false;
  const type = getTypeOfSymbol(parameter);
  return type !== undefined && (type.flags & TypeFlags.TypeParameter) !== 0 && signature.target !== undefined;
}

export function getParameterNameAtPosition(signature: Signature, position: number): string {
  const parameter = signature.parameters[position];
  if (parameter !== undefined) return parameter.escapedName ?? parameter.name ?? "";
  const rest = signature.parameters[signature.parameters.length - 1];
  return rest === undefined ? "" : rest.escapedName ?? rest.name ?? "";
}

export function getNameableDeclarationAtPosition(signature: Signature, position: number): AstNode | undefined {
  return signature.parameters[position]?.declarations?.[0] ?? signature.declaration;
}

export function getTupleElementLabel(_elementInfo: unknown, restSymbol: AstSymbol | undefined, index: number): string {
  const name = restSymbol?.escapedName ?? restSymbol?.name;
  return name === undefined || name.length === 0 ? `arg${index}` : name;
}

export function isValidDeclarationForTupleLabel(declaration: AstNode | undefined): boolean {
  if (declaration === undefined) return false;
  const kind = (declaration as { readonly kind?: number }).kind ?? 0;
  return kind !== 0;
}

export function getSignatureKind(signature: Signature): SignatureKind {
  return signature.compositeKind ?? SignatureKind.Call;
}

function symbolHasRestFlag(symbol: AstSymbol): boolean {
  return (symbol as { readonly rest?: boolean; readonly isRest?: boolean }).rest === true
    || (symbol as { readonly rest?: boolean; readonly isRest?: boolean }).isRest === true;
}
