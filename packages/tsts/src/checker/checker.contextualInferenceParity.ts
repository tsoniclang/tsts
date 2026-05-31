/**
 * Contextual typing and inference plumbing.
 *
 * TS-Go checker.go uses contextual stacks and inference contexts for call
 * arguments, object/array literal elements, function expressions, decorators,
 * yield/await operands, and conditional branches. This module ports that
 * control surface as standalone TSTS operations so checker slices consume one
 * consistent contextual source of truth.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { InferenceContext, InferenceInfo } from "./inference.js";
import { InferencePriority } from "./inference.js";
import type { IndexInfo, Signature, Type, TypeParameter } from "./types.js";
import { ContextFlags, ObjectFlags, SignatureFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export type CheckMode = number;
export const CheckMode = {
  Normal: 0 as CheckMode,
  Contextual: (1 << 0) as CheckMode,
  Inferential: (1 << 1) as CheckMode,
  SkipContextSensitive: (1 << 2) as CheckMode,
  SkipGenericFunctions: (1 << 3) as CheckMode,
} as const;

export interface ContextualTypingHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly voidType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getReturnTypeOfSignature?: (signature: Signature) => Type | undefined;
  readonly getSignaturesOfType?: (type: Type, kind: SignatureKind) => readonly Signature[];
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly getElementTypeOfArrayType?: (type: Type) => Type | undefined;
  readonly getTupleElementType?: (type: Type, index: number) => Type | undefined;
  readonly getApparentType?: (type: Type) => Type;
  readonly instantiateType?: (type: Type, mapper: unknown) => Type;
  readonly instantiateSignature?: (signature: Signature, mapper: unknown) => Signature;
  readonly createInferenceContext?: (typeParameters: readonly TypeParameter[], signature?: Signature) => InferenceContext;
  readonly inferTypes?: (inferences: readonly InferenceInfo[], source: Type, target: Type, priority: number, contravariant: boolean) => void;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createTupleType?: (types: readonly Type[], readonlyTuple: boolean) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface ContextualFrame {
  readonly node: AstNode;
  readonly contextualType: Type;
  readonly isCache: boolean;
  readonly inferenceContext?: InferenceContext;
}

export interface ContextualTypingState {
  readonly stack: ContextualFrame[];
  readonly inferenceStack: InferenceFrame[];
}

export interface InferenceFrame {
  readonly node: AstNode;
  readonly context: InferenceContext;
}

export interface ContextualArgumentResult {
  readonly argument: AstNode;
  readonly type: Type | undefined;
  readonly source: "signature" | "rest" | "tuple-rest" | "spread" | "none";
}

export interface ContextSensitiveAnalysis {
  readonly node: AstNode;
  readonly contextSensitive: boolean;
  readonly reason?: string;
}

export function createContextualTypingState(): ContextualTypingState {
  return { stack: [], inferenceStack: [] };
}

export function pushContextualType(state: ContextualTypingState, node: AstNode, type: Type, isCache = false, inferenceContext?: InferenceContext): void {
  const frame: ContextualFrame = inferenceContext === undefined ? { node, contextualType: type, isCache } : { node, contextualType: type, isCache, inferenceContext };
  state.stack.push(frame);
}

export function pushCachedContextualType(state: ContextualTypingState, node: AstNode, type: Type): void {
  pushContextualType(state, node, type, true);
}

export function popContextualType(state: ContextualTypingState): ContextualFrame | undefined {
  return state.stack.pop();
}

export function pushInferenceContext(state: ContextualTypingState, node: AstNode, context: InferenceContext): void {
  state.inferenceStack.push({ node, context });
}

export function popInferenceContext(state: ContextualTypingState): InferenceFrame | undefined {
  return state.inferenceStack.pop();
}

export function getInferenceContext(state: ContextualTypingState, node: AstNode): InferenceContext | undefined {
  return findFrameForNode(state.inferenceStack, node)?.context;
}

export function getContextualType(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const frame = findContextualNode(state, node, true);
  if (frame !== undefined) return frame.contextualType;
  const parent = node.parent;
  if (parent === undefined) return undefined;
  if (isInitializerOfVariableLike(node, parent)) return getContextualTypeForInitializerExpression(parent, contextFlags, state, host);
  if (isReturnExpression(node, parent)) return getContextualTypeForReturnExpression(node, contextFlags, state, host);
  if (isYieldOperand(node, parent)) return getContextualTypeForYieldOperand(node, contextFlags, state, host);
  if (isAwaitOperand(node, parent)) return getContextualTypeForAwaitOperand(node, contextFlags, state, host);
  if (isCallArgument(node, parent)) return getContextualTypeForArgument(parent, argumentIndex(parent, node), host);
  if (isArrayElement(node, parent)) return getContextualTypeForElementExpressionFromParent(parent, node, host);
  if (isObjectLiteralElement(node)) return getContextualTypeForObjectLiteralElement(node, contextFlags, state, host);
  if (parent.kind === Kind.ConditionalExpression) return getContextualTypeForConditionalOperand(node, contextFlags, state, host);
  if (parent.kind === Kind.BinaryExpression) return getContextualTypeForBinaryOperand(node, contextFlags, host);
  return undefined;
}

export function findContextualNode(state: ContextualTypingState, node: AstNode, includeCaches: boolean): ContextualFrame | undefined {
  for (let index = state.stack.length - 1; index >= 0; index -= 1) {
    const frame = state.stack[index]!;
    if (!includeCaches && frame.isCache) continue;
    if (frame.node === node || nodeIsDescendantOf(node, frame.node)) return frame;
  }
  return undefined;
}

export function getContextualTypeForInitializerExpression(declaration: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const annotation = annotatedType(declaration);
  if (annotation !== undefined) return annotation;
  const symbol = symbolOf(declaration);
  const symbolType = symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
  if (symbolType !== undefined && (contextFlags & ContextFlags.NoConstraints) === 0) return symbolType;
  const parentType = declaration.parent === undefined ? undefined : getContextualType(declaration.parent, contextFlags, state, host);
  if (parentType === undefined) return undefined;
  const name = declarationName(declaration);
  return name.length === 0 ? undefined : getTypeOfPropertyOfContextualType(parentType, name, host);
}

export function getContextualTypeForVariableLikeDeclaration(declaration: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  return getContextualTypeForInitializerExpression(declaration, contextFlags, state, host);
}

export function getContextuallyTypedParameterType(parameter: AstNode, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const signature = getContextualSignatureForFunctionLikeDeclaration(parentFunction(parameter), state, host);
  const index = parameterIndex(parameter);
  const symbol = signature?.parameters[index];
  return symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
}

export function getContextualTypeForReturnExpression(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const fn = nearestFunction(node);
  const contextualSignature = getContextualSignatureForFunctionLikeDeclaration(fn, state, host);
  if (contextualSignature !== undefined) {
    const returnType = host.getReturnTypeOfSignature?.(contextualSignature) ?? contextualSignature.resolvedReturnType;
    if (returnType !== undefined) return returnType;
  }
  const frame = fn === undefined ? undefined : findContextualNode(state, fn, true);
  void contextFlags;
  return frame?.contextualType;
}

export function getContextualTypeForYieldOperand(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const returnType = getContextualTypeForReturnExpression(node, contextFlags, state, host);
  return iterationType(returnType, "yield", host);
}

export function getContextualTypeForAwaitOperand(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const returnType = getContextualTypeForReturnExpression(node, contextFlags, state, host);
  return promisedType(returnType) ?? returnType;
}

export function getContextualTypeForArgument(callTarget: AstNode, argIndex: number, host: ContextualTypingHost): Type | undefined {
  const signature = getResolvedSignatureLike(callTarget, host);
  if (signature === undefined) return undefined;
  const parameter = signature.parameters[argIndex] ?? signature.parameters[signature.parameters.length - 1];
  if (parameter === undefined) return undefined;
  const parameterType = host.getTypeOfSymbol?.(parameter) ?? getTypeOfSymbol(parameter);
  if (parameterType === undefined) return undefined;
  if (argIndex >= signature.parameters.length - 1 && signatureHasRestParameter(signature)) return restElementType(parameterType, argIndex - signature.parameters.length + 1, host);
  return parameterType;
}

export function getContextualTypeForArgumentAtIndex(callTarget: AstNode, argIndex: number, host: ContextualTypingHost): ContextualArgumentResult {
  const signature = getResolvedSignatureLike(callTarget, host);
  if (signature === undefined) return { argument: callArguments(callTarget)[argIndex] ?? callTarget, type: undefined, source: "none" };
  const argument = callArguments(callTarget)[argIndex] ?? callTarget;
  const type = getContextualTypeForArgument(callTarget, argIndex, host);
  const source = signatureHasRestParameter(signature) && argIndex >= signature.parameters.length - 1 ? "rest" : type === undefined ? "none" : "signature";
  return { argument, type, source };
}

export function getSpreadArgumentType(args: readonly AstNode[], index: number, argCount: number, restType: Type, context: InferenceContext | undefined, checkMode: CheckMode, host: ContextualTypingHost): Type {
  const spread = args[index];
  if (spread !== undefined && isSpreadArgument(spread)) {
    const expression = (spread as { readonly expression?: AstNode }).expression ?? spread;
    const expressionType = host.getTypeOfExpression?.(expression);
    if (expressionType !== undefined) return expressionType;
  }
  const elementTypes: Type[] = [];
  for (let i = index; i < argCount; i += 1) {
    const arg = args[i];
    if (arg === undefined) continue;
    const argType = host.getTypeOfExpression?.(isSpreadArgument(arg) ? (arg as { readonly expression?: AstNode }).expression ?? arg : arg) ?? host.unknownType;
    elementTypes.push(argType);
  }
  if (context !== undefined && (checkMode & CheckMode.Inferential) !== 0) {
    for (const type of elementTypes) for (const inference of context.inferences) context.compareTypes(type, inference.typeParameter, false);
  }
  return host.createTupleType?.(elementTypes, false) ?? restType;
}

export function getMutableArrayOrTupleType(type: Type, host: ContextualTypingHost): Type {
  if (isReadonlyArrayOrTuple(type)) {
    const elementTypes = tupleElementTypes(type);
    if (elementTypes.length !== 0) return host.createTupleType?.(elementTypes, false) ?? type;
  }
  return type;
}

export function getContextualTypeForBindingElement(declaration: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const parentType = declaration.parent === undefined ? undefined : getContextualType(declaration.parent, contextFlags, state, host);
  if (parentType === undefined) return undefined;
  if (isObjectBindingElement(declaration)) return getTypeOfPropertyOfContextualType(parentType, declarationName(declaration), host);
  if (isArrayBindingElement(declaration)) return host.getTupleElementType?.(parentType, elementIndex(declaration)) ?? host.getElementTypeOfArrayType?.(parentType);
  return undefined;
}

export function getContextualTypeForObjectLiteralElement(element: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const objectLiteral = parentObjectLiteral(element);
  const contextualType = objectLiteral === undefined ? undefined : getContextualType(objectLiteral, contextFlags, state, host);
  if (contextualType === undefined) return undefined;
  const name = declarationName(element);
  if (name.length !== 0) return getTypeOfPropertyOfContextualType(contextualType, name, host);
  if (element.kind === Kind.SpreadAssignment) return contextualType;
  return undefined;
}

export function getContextualTypeForObjectLiteralMethod(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  return getContextualTypeForObjectLiteralElement(node, contextFlags, state, host);
}

export function getContextualTypeForElementExpression(type: Type, index: number, length: number, firstSpreadIndex: number, lastSpreadIndex: number, host: ContextualTypingHost): Type | undefined {
  if (index >= 0 && firstSpreadIndex < 0 && lastSpreadIndex < 0) return host.getTupleElementType?.(type, index) ?? host.getElementTypeOfArrayType?.(type);
  if (index < firstSpreadIndex || index > lastSpreadIndex) return host.getTupleElementType?.(type, index);
  const restType = host.getTupleElementType?.(type, Math.min(index, length - 1));
  return restElementType(restType ?? type, index - firstSpreadIndex, host);
}

export function getContextualTypeForConditionalOperand(node: AstNode, contextFlags: ContextFlags, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const conditional = node.parent;
  if (conditional?.kind !== Kind.ConditionalExpression) return undefined;
  const parentType = getContextualType(conditional, contextFlags, state, host);
  if (parentType !== undefined) return parentType;
  return undefined;
}

export function getContextualTypeForSubstitutionExpression(template: AstNode, substitutionExpression: AstNode, state: ContextualTypingState, host: ContextualTypingHost): Type | undefined {
  const contextualType = getContextualType(template, ContextFlags.None, state, host);
  if (contextualType !== undefined && (contextualType.flags & TypeFlags.StringLike) !== 0) return host.stringType;
  void substitutionExpression;
  return undefined;
}

export function getContextualImportAttributeType(node: AstNode, host: ContextualTypingHost): Type | undefined {
  if (node.kind !== Kind.ImportAttribute) return undefined;
  const name = declarationName(node);
  if (name === "type") return host.stringType;
  return host.unknownType;
}

export function getContextualTypeForBinaryOperand(node: AstNode, contextFlags: ContextFlags, host: ContextualTypingHost): Type | undefined {
  const parent = node.parent;
  if (parent?.kind !== Kind.BinaryExpression) return undefined;
  const operator = (parent as { readonly operatorToken?: AstNode }).operatorToken?.kind;
  if (operator === Kind.EqualsToken) {
    const left = (parent as { readonly left?: AstNode }).left;
    if (node === (parent as { readonly right?: AstNode }).right && left !== undefined) return host.getTypeOfExpression?.(left);
  }
  if (operator === Kind.AmpersandAmpersandToken || operator === Kind.BarBarToken || operator === Kind.QuestionQuestionToken) return undefined;
  void contextFlags;
  return undefined;
}

export function getContextualTypeForAssignmentExpression(binary: AstNode, host: ContextualTypingHost): Type | undefined {
  if (binary.kind !== Kind.BinaryExpression) return undefined;
  const operator = (binary as { readonly operatorToken?: AstNode }).operatorToken?.kind;
  if (operator !== Kind.EqualsToken) return undefined;
  const left = (binary as { readonly left?: AstNode }).left;
  return left === undefined ? undefined : host.getTypeOfExpression?.(left);
}

export function getEffectiveCallArguments(node: AstNode): readonly AstNode[] {
  const args = callArguments(node);
  if (node.kind === Kind.TaggedTemplateExpression) {
    const template = (node as { readonly template?: AstNode }).template;
    return template === undefined ? args : [template, ...args];
  }
  return args;
}

export function getSpreadArgumentIndex(args: readonly AstNode[]): number {
  return args.findIndex(isSpreadArgument);
}

export function getSpreadIndices(node: AstNode): readonly [number, number] {
  const args = getEffectiveCallArguments(node);
  const first = args.findIndex(isSpreadArgument);
  if (first < 0) return [-1, -1];
  let last = first;
  for (let index = first + 1; index < args.length; index += 1) {
    if (isSpreadArgument(args[index]!)) last = index;
  }
  return [first, last];
}

export function createSyntheticExpression(parent: AstNode, type: Type, isSpread: boolean, tupleNameSource?: AstNode): AstNode {
  const expression = {
    kind: isSpread ? Kind.SpreadElement : Kind.SyntheticExpression,
    parent,
    type,
    tupleNameSource,
  } as unknown as AstNode;
  return expression;
}

export function getContextualSignatureForFunctionLikeDeclaration(node: AstNode | undefined, state: ContextualTypingState, host: ContextualTypingHost): Signature | undefined {
  if (node === undefined) return undefined;
  const frame = findContextualNode(state, node, true);
  const contextualType = frame?.contextualType;
  if (contextualType === undefined) return undefined;
  return getContextualCallSignature(contextualType, node, host);
}

export function getContextualCallSignature(type: Type, node: AstNode, host: ContextualTypingHost): Signature | undefined {
  const signatures = host.getSignaturesOfType?.(type, SignatureKind.Call) ?? [];
  if (signatures.length === 1) return signatures[0];
  const constructSignatures = host.getSignaturesOfType?.(type, SignatureKind.Construct) ?? [];
  if (node.kind === Kind.ClassExpression && constructSignatures.length === 1) return constructSignatures[0];
  return chooseContextualSignature(signatures, node);
}

export function assignContextualParameterTypes(signature: Signature, context: Signature, host: ContextualTypingHost): void {
  for (let index = 0; index < signature.parameters.length; index += 1) {
    const parameter = signature.parameters[index]!;
    const contextualParameter = context.parameters[index];
    const contextualType = contextualParameter === undefined ? undefined : host.getTypeOfSymbol?.(contextualParameter) ?? getTypeOfSymbol(contextualParameter);
    if (contextualType !== undefined) assignParameterType(parameter, contextualType);
  }
}

export function assignNonContextualParameterTypes(signature: Signature, host: ContextualTypingHost): void {
  for (const parameter of signature.parameters) {
    if ((parameter as { readonly type?: Type }).type === undefined) assignParameterType(parameter, host.anyType);
  }
}

export function assignParameterType(parameter: AstSymbol, contextualType: Type): void {
  (parameter as { type?: Type }).type = contextualType;
}

export function assignBindingElementTypes(pattern: AstNode, parentType: Type, host: ContextualTypingHost): void {
  for (const element of bindingElements(pattern)) {
    const type = isObjectBindingElement(element)
      ? getTypeOfPropertyOfContextualType(parentType, declarationName(element), host)
      : host.getTupleElementType?.(parentType, elementIndex(element)) ?? host.getElementTypeOfArrayType?.(parentType);
    const symbol = symbolOf(element);
    if (symbol !== undefined && type !== undefined) assignParameterType(symbol, type);
  }
}

export function inferFromAnnotatedParametersAndReturn(signature: Signature, context: Signature, inferenceContext: InferenceContext, host: ContextualTypingHost): void {
  for (let index = 0; index < signature.parameters.length; index += 1) {
    const parameter = signature.parameters[index]!;
    const contextualParameter = context.parameters[index];
    const source = host.getTypeOfSymbol?.(parameter) ?? getTypeOfSymbol(parameter);
    const target = contextualParameter === undefined ? undefined : host.getTypeOfSymbol?.(contextualParameter) ?? getTypeOfSymbol(contextualParameter);
    if (source !== undefined && target !== undefined) host.inferTypes?.(inferenceContext.inferences, source, target, InferencePriority.AlwaysStrict, true);
  }
  const sourceReturn = signature.resolvedReturnType;
  const targetReturn = context.resolvedReturnType;
  if (sourceReturn !== undefined && targetReturn !== undefined) {
    host.inferTypes?.(inferenceContext.inferences, sourceReturn, targetReturn, InferencePriority.ReturnType, false);
  }
}

export function instantiateContextualType(contextualType: Type, node: AstNode, contextFlags: ContextFlags, host: ContextualTypingHost): Type {
  const mapper = (node as { readonly contextualMapper?: unknown }).contextualMapper;
  if (mapper === undefined || host.instantiateType === undefined) return contextualType;
  if ((contextFlags & ContextFlags.NoConstraints) !== 0) return contextualType;
  return host.instantiateType(contextualType, mapper);
}

export function instantiateInstantiableTypes(type: Type, mapper: unknown, host: ContextualTypingHost): Type {
  if ((type.flags & TypeFlags.Instantiable) === 0 || host.instantiateType === undefined) return type;
  return host.instantiateType(type, mapper);
}

export function isContextSensitive(node: AstNode): boolean {
  return analyzeContextSensitivity(node).contextSensitive;
}

export function analyzeContextSensitivity(node: AstNode): ContextSensitiveAnalysis {
  if (isFunctionLike(node)) {
    if (parametersNeedContext(node)) return { node, contextSensitive: true, reason: "parameter" };
    if (hasContextSensitiveReturnExpression(node)) return { node, contextSensitive: true, reason: "return" };
    if (hasContextSensitiveYieldExpression(node)) return { node, contextSensitive: true, reason: "yield" };
  }
  if (node.kind === Kind.ObjectLiteralExpression && objectLiteralHasContextSensitiveMember(node)) {
    return { node, contextSensitive: true, reason: "object-literal-member" };
  }
  if (node.kind === Kind.ArrayLiteralExpression && ((node as { readonly elements?: readonly AstNode[] }).elements ?? []).some(isContextSensitive)) {
    return { node, contextSensitive: true, reason: "array-element" };
  }
  return { node, contextSensitive: false };
}

export function isContextSensitiveFunctionLikeDeclaration(node: AstNode): boolean {
  return isFunctionLike(node) && analyzeContextSensitivity(node).contextSensitive;
}

export function hasContextSensitiveReturnExpression(node: AstNode): boolean {
  const body = (node as { readonly body?: AstNode }).body;
  return body !== undefined && nodeTree(body).some(child => child.kind === Kind.ReturnStatement && expressionOf(child) !== undefined && expressionContainsContextSensitiveNode(expressionOf(child)!));
}

export function hasContextSensitiveYieldExpression(node: AstNode): boolean {
  const body = (node as { readonly body?: AstNode }).body;
  return body !== undefined && nodeTree(body).some(child => child.kind === Kind.YieldExpression && expressionOf(child) !== undefined);
}

export function getUniqueTypeParameters(context: InferenceContext | undefined, typeParameters: readonly TypeParameter[]): readonly TypeParameter[] {
  const seen = new Set<string>();
  const result: TypeParameter[] = [];
  for (const typeParameter of typeParameters) {
    const name = typeParameterName(typeParameter);
    const key = seen.has(name) ? getUniqueTypeParameterName(result, name) : name;
    seen.add(key);
    result.push(typeParameter);
  }
  if (context !== undefined) (context as unknown as { inferredTypeParameters?: readonly TypeParameter[] }).inferredTypeParameters = result;
  return result;
}

export function hasTypeParameterByName(typeParameters: readonly TypeParameter[], name: string): boolean {
  return typeParameters.some(typeParameter => typeParameterName(typeParameter) === name);
}

export function getUniqueTypeParameterName(typeParameters: readonly TypeParameter[], baseName: string): string {
  let candidate = baseName;
  let suffix = 1;
  while (hasTypeParameterByName(typeParameters, candidate)) {
    candidate = `${baseName}_${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function getResolvedSignatureLike(node: AstNode, host: ContextualTypingHost): Signature | undefined {
  return (node as { readonly resolvedSignature?: Signature }).resolvedSignature
    ?? getContextualCallSignature(host.getTypeOfExpression?.((node as { readonly expression?: AstNode }).expression ?? node) ?? host.unknownType, node, host);
}

function getTypeOfPropertyOfContextualType(type: Type, name: string, host: ContextualTypingHost): Type | undefined {
  const property = host.getPropertyOfType?.(type, name) ?? host.getPropertiesOfType?.(type).find(symbol => symbolName(symbol) === name);
  if (property !== undefined) return host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
  const indexInfo = getIndexInfoForName(type, name, host);
  return indexInfo?.valueType;
}

function getIndexInfoForName(type: Type, name: string, host: ContextualTypingHost): IndexInfo | undefined {
  const infos = host.getIndexInfosOfType?.(type) ?? [];
  const numeric = isNumericName(name);
  return infos.find(info => numeric ? (info.keyType.flags & TypeFlags.NumberLike) !== 0 : (info.keyType.flags & TypeFlags.StringLike) !== 0);
}

function chooseContextualSignature(signatures: readonly Signature[], node: AstNode): Signature | undefined {
  const parameterCount = ((node as { readonly parameters?: readonly AstNode[] }).parameters ?? []).length;
  return signatures.find(signature => signature.minArgumentCount <= parameterCount && parameterCount <= signature.parameters.length)
    ?? signatures.find(signature => signatureHasRestParameter(signature))
    ?? signatures[0];
}

function signatureHasRestParameter(signature: Signature): boolean {
  return (signature.flags & SignatureFlags.HasRestParameter) !== 0;
}

function restElementType(type: Type, index: number, host: ContextualTypingHost): Type | undefined {
  return host.getTupleElementType?.(type, index) ?? host.getElementTypeOfArrayType?.(type) ?? type;
}

function iterationType(type: Type | undefined, slot: "yield" | "return" | "next", host: ContextualTypingHost): Type | undefined {
  if (type === undefined) return undefined;
  const data = type.data as { readonly yieldType?: Type; readonly returnType?: Type; readonly nextType?: Type } | undefined;
  if (slot === "yield") return data?.yieldType ?? host.getElementTypeOfArrayType?.(type);
  if (slot === "return") return data?.returnType;
  return data?.nextType;
}

function promisedType(type: Type | undefined): Type | undefined {
  return (type?.data as { readonly promisedType?: Type } | undefined)?.promisedType;
}

function callArguments(node: AstNode): readonly AstNode[] {
  return (node as { readonly arguments?: readonly AstNode[] }).arguments ?? [];
}

function argumentIndex(call: AstNode, node: AstNode): number {
  return callArguments(call).indexOf(node);
}

function isSpreadArgument(node: AstNode): boolean {
  return node.kind === Kind.SpreadElement || node.kind === Kind.SpreadAssignment;
}

function isCallArgument(node: AstNode, parent: AstNode): boolean {
  return (parent.kind === Kind.CallExpression || parent.kind === Kind.NewExpression || parent.kind === Kind.TaggedTemplateExpression)
    && callArguments(parent).includes(node);
}

function isArrayElement(node: AstNode, parent: AstNode): boolean {
  return parent.kind === Kind.ArrayLiteralExpression && ((parent as { readonly elements?: readonly AstNode[] }).elements ?? []).includes(node);
}

function getContextualTypeForElementExpressionFromParent(parent: AstNode, node: AstNode, host: ContextualTypingHost): Type | undefined {
  const parentType = host.getTypeOfExpression?.(parent);
  if (parentType === undefined) return undefined;
  const elements = (parent as { readonly elements?: readonly AstNode[] }).elements ?? [];
  const index = elements.indexOf(node);
  const firstSpread = elements.findIndex(isSpreadArgument);
  const lastSpread = lastIndexOf(elements, isSpreadArgument);
  return getContextualTypeForElementExpression(parentType, index, elements.length, firstSpread, lastSpread, host);
}

function parentObjectLiteral(node: AstNode): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.ObjectLiteralExpression) return current;
    if (current.kind === Kind.SourceFile || current.kind === Kind.Block) return undefined;
    current = (current as AstNode).parent;
  }
  return undefined;
}

function isObjectLiteralElement(node: AstNode): boolean {
  return node.kind === Kind.PropertyAssignment
    || node.kind === Kind.ShorthandPropertyAssignment
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.SpreadAssignment;
}

function isInitializerOfVariableLike(node: AstNode, parent: AstNode): boolean {
  return ((parent as { readonly initializer?: AstNode }).initializer === node)
    && (parent.kind === Kind.VariableDeclaration || parent.kind === Kind.PropertyDeclaration || parent.kind === Kind.Parameter);
}

function isReturnExpression(node: AstNode, parent: AstNode): boolean {
  return parent.kind === Kind.ReturnStatement && expressionOf(parent) === node;
}

function isYieldOperand(node: AstNode, parent: AstNode): boolean {
  return parent.kind === Kind.YieldExpression && expressionOf(parent) === node;
}

function isAwaitOperand(node: AstNode, parent: AstNode): boolean {
  return parent.kind === Kind.AwaitExpression && expressionOf(parent) === node;
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function nearestFunction(node: AstNode | undefined): AstNode | undefined {
  let current = node?.parent;
  while (current !== undefined) {
    if (isFunctionLike(current)) return current;
    current = current.parent;
  }
  return undefined;
}

function parentFunction(node: AstNode | undefined): AstNode | undefined {
  return nearestFunction(node);
}

function isFunctionLike(node: AstNode | undefined): boolean {
  return node !== undefined
    && (node.kind === Kind.FunctionDeclaration
      || node.kind === Kind.FunctionExpression
      || node.kind === Kind.ArrowFunction
      || node.kind === Kind.MethodDeclaration
      || node.kind === Kind.Constructor
      || node.kind === Kind.GetAccessor
      || node.kind === Kind.SetAccessor);
}

function parametersNeedContext(node: AstNode): boolean {
  return ((node as { readonly parameters?: readonly AstNode[] }).parameters ?? []).some(parameter => annotatedType(parameter) === undefined);
}

function expressionContainsContextSensitiveNode(node: AstNode): boolean {
  return nodeTree(node).some(child => child !== node && isContextSensitive(child));
}

function objectLiteralHasContextSensitiveMember(node: AstNode): boolean {
  return ((node as { readonly properties?: readonly AstNode[] }).properties ?? []).some(property => {
    const initializer = (property as { readonly initializer?: AstNode }).initializer;
    return initializer !== undefined && isContextSensitive(initializer);
  });
}

function bindingElements(pattern: AstNode): readonly AstNode[] {
  return (pattern as { readonly elements?: readonly AstNode[] }).elements
    ?? (pattern as { readonly properties?: readonly AstNode[] }).properties
    ?? [];
}

function isObjectBindingElement(node: AstNode): boolean {
  return nodeKind(node.parent) === Kind.ObjectBindingPattern || node.kind === Kind.BindingElement && nodeKind(node.parent) === Kind.ObjectBindingPattern;
}

function isArrayBindingElement(node: AstNode): boolean {
  return nodeKind(node.parent) === Kind.ArrayBindingPattern || node.kind === Kind.BindingElement && nodeKind(node.parent) === Kind.ArrayBindingPattern;
}

function elementIndex(node: AstNode): number {
  const siblings = bindingElements(node.parent ?? node);
  return Math.max(0, siblings.indexOf(node));
}

function parameterIndex(parameter: AstNode): number {
  const parameters = (parameter.parent as { readonly parameters?: readonly AstNode[] } | undefined)?.parameters ?? [];
  return Math.max(0, parameters.indexOf(parameter));
}

function tupleElementTypes(type: Type): readonly Type[] {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly elementTypes?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly elementTypes?: readonly Type[] } | undefined)?.elementTypes
    ?? [];
}

function isReadonlyArrayOrTuple(type: Type): boolean {
  return ((type.data as { readonly readonly?: boolean; readonly objectFlags?: ObjectFlags } | undefined)?.readonly === true)
    || (((type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? 0) & ObjectFlags.Tuple) !== 0;
}

function nodeIsDescendantOf(node: AstNode, ancestor: AstNode): boolean {
  let current = node.parent;
  while (current !== undefined) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
}

function findFrameForNode<T extends { readonly node: AstNode }>(frames: readonly T[], node: AstNode): T | undefined {
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    const frame = frames[index]!;
    if (frame.node === node || nodeIsDescendantOf(node, frame.node)) return frame;
  }
  return undefined;
}

function declarationName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return nodeText(name);
  return nodeText(node);
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function symbolOf(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function annotatedType(node: AstNode | undefined): Type | undefined {
  return (node as { readonly type?: Type } | undefined)?.type;
}

function typeParameterName(typeParameter: TypeParameter): string {
  return (typeParameter as { readonly symbol?: AstSymbol }).symbol?.name
    ?? (typeParameter as { readonly name?: string }).name
    ?? String((typeParameter as { readonly id?: number }).id ?? "");
}

function isNumericName(name: string): boolean {
  return name !== "" && String(Number(name)) === name;
}

function lastIndexOf<T>(values: readonly T[], predicate: (value: T) => boolean): number {
  for (let index = values.length - 1; index >= 0; index -= 1) if (predicate(values[index]!)) return index;
  return -1;
}

function nodeTree(root: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  const visit = (node: AstNode | undefined): void => {
    if (node === undefined) return;
    out.push(node);
    for (const child of childNodes(node)) visit(child);
  };
  visit(root);
  return out;
}

function childNodes(node: AstNode): readonly AstNode[] {
  const children: AstNode[] = [];
  for (const key of ["statements", "members", "parameters", "arguments", "elements", "properties"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(value)) children.push(...value.filter(isNode));
  }
  for (const key of ["body", "expression", "left", "right", "initializer", "name", "whenTrue", "whenFalse"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) children.push(value);
  }
  return children;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

function nodeKind(node: AstNode | undefined): Kind | undefined {
  return node?.kind;
}

export function contextualParameterHasExplicitType(parameter: AstNode): boolean {
  return annotatedType(parameter) !== undefined || Boolean((parameter as { readonly typeAnnotation?: unknown }).typeAnnotation);
}

export function contextualSignatureNeedsInference(signature: Signature): boolean {
  return (signature.typeParameters?.length ?? 0) !== 0 || signature.parameters.some(parameter => (parameter.flags ?? 0) & SymbolFlags.Transient);
}
