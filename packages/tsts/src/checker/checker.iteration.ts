/**
 * Iteration type resolution.
 *
 * TS-Go keeps this logic in `checker.go`; this file isolates the same
 * responsibility for the TypeScript port.  The functions below do not invent
 * a separate protocol: they read array/string element types, iterator
 * `next().value` shapes, and resolver-provided async normalization.
 */

import type { Node as AstNode } from "../ast/index.js";
import {
  anyType,
  getArrayElementType,
  getCallSignature,
  getUnionType,
  stringType,
  undefinedType,
  unknownType,
  type CheckState,
} from "./checker.checkedtype.js";
import {
  IterationTypeKind,
  IterationUse,
  type IterationTypes,
  type IterationTypesResolver,
} from "./checkerCore.js";
import {
  getPropertyTypeOfType,
  ObjectFlags,
  type Signature,
  type Type,
  TypeFlags,
  unionOrIntersectionTypes,
} from "./types.js";

export interface IterationDiagnosticDetails {
  readonly message: string;
  readonly iteratorPropertyName?: string;
}

export function getIteratedTypeOrElementType(
  use: IterationUse,
  inputType: Type,
  sentType: Type | undefined,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): Type {
  const iterationTypes = getIterationTypesOfIterable(inputType, use, errorNode, state, resolver);
  if (iterationTypes !== undefined) return iterationTypes.yieldType;
  const arrayElementType = getArrayElementType(inputType);
  if (arrayElementType !== undefined) return arrayElementType;
  if ((use & IterationUse.AllowsStringInputFlag) !== 0 && (inputType.flags & TypeFlags.StringLike) !== 0) return stringType;
  void sentType;
  return unknownType;
}

export function checkIteratedTypeOrElementType(
  use: IterationUse,
  inputType: Type,
  sentType: Type | undefined,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): Type {
  if ((inputType.flags & TypeFlags.Any) !== 0) return inputType;
  const result = getIteratedTypeOrElementType(use, inputType, sentType, errorNode, state, resolver);
  if (sentType !== undefined) {
    const iterationTypes = getIterationTypesOfIterable(inputType, use, undefined, state, resolver);
    if (iterationTypes?.nextType !== undefined && !state.relater.isTypeAssignableTo(sentType, iterationTypes.nextType)) {
      state.diagnostics.push({ message: "Iterator next input type is not assignable to the iterator next parameter type." });
    }
  }
  return result ?? anyType;
}

export function isReferenceToType(type: Type | undefined, target: Type | undefined): boolean {
  if (type === undefined || target === undefined) return false;
  if ((type.flags & TypeFlags.Object) === 0) return false;
  const data = type.data as { readonly objectFlags?: ObjectFlags; readonly target?: Type } | undefined;
  return ((data?.objectFlags ?? 0) & ObjectFlags.Reference) !== 0 && data?.target === target;
}

export function isReferenceToSomeType(type: Type | undefined, targets: readonly Type[]): boolean {
  return targets.some(target => isReferenceToType(type, target));
}

export function getIterationTypeOfGeneratorFunctionReturnType(
  kind: IterationTypeKind,
  returnType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): Type {
  const iterationTypes = getIterationTypesOfGeneratorFunctionReturnType(returnType, errorNode, state, resolver);
  return iterationTypes === undefined ? unknownType : getType(iterationTypes, kind);
}

export function getIterationTypesOfGeneratorFunctionReturnType(
  returnType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  return getIterationTypesOfIterable(returnType, IterationUse.GeneratorReturnType, errorNode, state, resolver)
    ?? getIterationTypesOfIterator(returnType, errorNode, state, resolver);
}

export function getIterationTypeOfIterable(
  kind: IterationTypeKind,
  type: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): Type | undefined {
  const iterationTypes = getIterationTypesOfIterable(type, IterationUse.Element, errorNode, state, resolver);
  return iterationTypes === undefined ? undefined : getType(iterationTypes, kind);
}

export function getIterationTypesOfIterable(
  type: Type,
  use: IterationUse,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  return getIterationTypesOfIterableWorker(type, use, errorNode, state, resolver);
}

export function getIterationTypesOfIterableWorker(
  type: Type,
  use: IterationUse,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  const fast = getIterationTypesOfIterableFast(type, use, errorNode, state, resolver);
  if (fast !== undefined) return fast;
  return getIterationTypesOfIterableSlow(type, use, errorNode, state, resolver);
}

export function getIterationTypesOfIterableFast(
  type: Type,
  use: IterationUse,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  const arrayElementType = getArrayElementType(type);
  if (arrayElementType !== undefined) return createIterationTypes(arrayElementType, undefinedType, unknownType);
  if ((use & IterationUse.AllowsStringInputFlag) !== 0 && (type.flags & TypeFlags.StringLike) !== 0) {
    return createIterationTypes(stringType, undefinedType, unknownType);
  }
  return getResolvedIterationTypes(type, errorNode, state, resolver);
}

export function getIterationTypesOfIterableSlow(
  type: Type,
  use: IterationUse,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  if ((type.flags & TypeFlags.Union) === 0) return undefined;
  const constituents = unionOrIntersectionTypes(type);
  const iterationTypes = constituents
    .map(constituent => getIterationTypesOfIterableFast(constituent, use, errorNode, state, resolver))
    .filter((types): types is IterationTypes => types !== undefined);
  return iterationTypes.length === constituents.length ? combineIterationTypes(iterationTypes, state) : undefined;
}

export function getResolvedIterationTypes(
  type: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  const iteratorMethodType = getPropertyTypeOfType(type, resolver.iteratorSymbolName)
    ?? getPropertyTypeOfType(type, `[Symbol.${resolver.iteratorSymbolName}]`);
  if (iteratorMethodType === undefined) return undefined;
  const iteratorMethod = getCallSignature(iteratorMethodType);
  const iteratorObjectType = iteratorMethod?.resolvedReturnType;
  if (iteratorObjectType === undefined) return undefined;
  return getIterationTypesOfIterator(iteratorObjectType, errorNode, state, resolver);
}

export function getBuiltinIteratorReturnType(resolver: IterationTypesResolver): Type {
  const builtinIteratorTypes = resolver.getGlobalBuiltinIteratorTypes();
  return builtinIteratorTypes.length === 0 ? anyType : builtinIteratorTypes[0]!;
}

export function hasTypes(iterationTypes: IterationTypes | undefined): boolean {
  return iterationTypes !== undefined
    && iterationTypes.yieldType !== undefined
    && iterationTypes.returnType !== undefined
    && iterationTypes.nextType !== undefined;
}

export function getType(iterationTypes: IterationTypes, kind: IterationTypeKind): Type {
  if (kind === IterationTypeKind.Return) return iterationTypes.returnType;
  if (kind === IterationTypeKind.Next) return iterationTypes.nextType;
  return iterationTypes.yieldType;
}

export function combineIterationTypes(
  iterationTypes: readonly IterationTypes[],
  state: CheckState,
): IterationTypes {
  return {
    yieldType: getIterationTypeUnion(iterationTypes, IterationTypeKind.Yield, state),
    returnType: getIterationTypeUnion(iterationTypes, IterationTypeKind.Return, state),
    nextType: getIterationTypeUnion(iterationTypes, IterationTypeKind.Next, state),
  };
}

export function getIterationTypeUnion(
  iterationTypes: readonly IterationTypes[],
  kind: IterationTypeKind,
  state: CheckState,
): Type {
  return getUnionType(iterationTypes.map(types => getType(types, kind)), state);
}

export function getAsyncFromSyncIterationTypes(
  iterationTypes: IterationTypes,
  errorNode: AstNode | undefined,
  resolver: IterationTypesResolver,
): IterationTypes {
  return {
    yieldType: resolver.resolveIterationType(iterationTypes.yieldType, errorNode),
    returnType: resolver.resolveIterationType(iterationTypes.returnType, errorNode),
    nextType: iterationTypes.nextType,
  };
}

export function getIterationTypesOfIterator(
  iteratorType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  return getIterationTypesOfIteratorWorker(iteratorType, errorNode, state, resolver);
}

export function getIterationTypesOfIteratorWorker(
  iteratorType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  return getIterationTypesOfIteratorFast(iteratorType, errorNode, state, resolver)
    ?? getIterationTypesOfIteratorSlow(iteratorType, errorNode, state, resolver);
}

export function getIterationTypesOfIteratorFast(
  iteratorType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  void errorNode; void state; void resolver;
  const nextType = getPropertyTypeOfType(iteratorType, "next");
  const nextSignature = nextType === undefined ? undefined : getCallSignature(nextType);
  if (nextSignature === undefined) return undefined;
  return getIterationTypesOfIteratorResult(nextSignature, iteratorType, errorNode, state, resolver);
}

export function getIterationTypesOfIteratorSlow(
  iteratorType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  void state;
  const valueType = getPropertyTypeOfType(iteratorType, "value");
  if (valueType === undefined) return undefined;
  return createIterationTypes(resolver.resolveIterationType(valueType, errorNode), undefinedType, unknownType);
}

export function getIterationTypesOfMethod(
  methodSignature: Signature,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  const iteratorType = methodSignature.resolvedReturnType;
  return iteratorType === undefined ? undefined : getIterationTypesOfIterator(iteratorType, errorNode, state, resolver);
}

export function getIterationTypesOfIteratorResult(
  nextSignature: Signature,
  iteratorType: Type,
  errorNode: AstNode | undefined,
  state: CheckState,
  resolver: IterationTypesResolver,
): IterationTypes | undefined {
  void iteratorType; void state;
  const resultType = nextSignature.resolvedReturnType;
  if (resultType === undefined) return undefined;
  const valueType = getPropertyTypeOfType(resultType, "value") ?? unknownType;
  const doneType = getPropertyTypeOfType(resultType, "done");
  if (doneType === undefined) return createIterationTypes(resolver.resolveIterationType(valueType, errorNode), undefinedType, unknownType);
  return isReturnIteratorResult(resultType)
    ? createIterationTypes(neverIterationType(), resolver.resolveIterationType(valueType, errorNode), unknownType)
    : createIterationTypes(resolver.resolveIterationType(valueType, errorNode), undefinedType, unknownType);
}

export function isYieldIteratorResult(type: Type): boolean {
  const doneType = getPropertyTypeOfType(type, "done");
  return doneType === undefined || (doneType.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function isReturnIteratorResult(type: Type): boolean {
  const doneType = getPropertyTypeOfType(type, "done");
  return doneType !== undefined && (doneType.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function isIteratorResult(type: Type): boolean {
  return getPropertyTypeOfType(type, "value") !== undefined;
}

export function reportTypeNotIterableError(
  resolver: IterationTypesResolver,
): IterationDiagnosticDetails {
  return {
    message: resolver.mustHaveANextMethodDiagnostic ?? "Type is not iterable",
    iteratorPropertyName: resolver.iteratorSymbolName,
  };
}

export function getIterationDiagnosticDetails(
  resolver: IterationTypesResolver,
  failure: "missingNext" | "notMethod" | "missingValue",
): IterationDiagnosticDetails {
  if (failure === "notMethod") return { message: resolver.mustBeAMethodDiagnostic ?? "Iterator member is not a method", iteratorPropertyName: resolver.iteratorSymbolName };
  if (failure === "missingValue") return { message: resolver.mustHaveAValueDiagnostic ?? "Iterator result is missing value", iteratorPropertyName: resolver.iteratorSymbolName };
  return reportTypeNotIterableError(resolver);
}

export function isES2015OrLaterIterable(type: Type, resolver: IterationTypesResolver): boolean {
  return getPropertyTypeOfType(type, resolver.iteratorSymbolName) !== undefined
    || getPropertyTypeOfType(type, `[Symbol.${resolver.iteratorSymbolName}]`) !== undefined;
}

function createIterationTypes(yieldType: Type, returnType: Type, nextType: Type): IterationTypes {
  return { yieldType, returnType, nextType };
}

function neverIterationType(): Type {
  return { flags: TypeFlags.Never, id: -1 };
}
