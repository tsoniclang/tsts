/**
 * Decorator checking and generated-code collision tracking.
 *
 * TS-Go checker.go checks legacy/ES decorators, builds decorator context
 * function types, marks metadata references, and guards generated names such
 * as Promise/Reflect/WeakMap from colliding with user declarations. This
 * module ports those decisions as reusable checker operations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Signature, Type, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface DecoratorCollisionHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly voidType: Type;
  readonly neverType: Type;
  readonly stringType: Type;
  readonly booleanType: Type;
  readonly functionType?: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getSignaturesOfType?: (type: Type) => readonly Signature[];
  readonly createFunctionType?: (parameters: readonly AstSymbol[], returnType: Type, typeParameters?: readonly Type[]) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface DecoratorCheckResult {
  readonly decorator: AstNode;
  readonly target: AstNode;
  readonly signature?: Signature;
  readonly argumentCount: number;
  readonly valid: boolean;
  readonly legacy: boolean;
}

export interface GeneratedNameCollisionState {
  readonly weakMapSetCandidates: Map<string, AstNode[]>;
  readonly reflectCandidates: Map<string, AstNode[]>;
  readonly promiseCandidates: Map<string, AstNode[]>;
}

export interface DecoratorContextTypes {
  readonly targetType: Type;
  readonly contextType: Type;
  readonly resultType: Type;
}

export function createGeneratedNameCollisionState(): GeneratedNameCollisionState {
  return { weakMapSetCandidates: new Map(), reflectCandidates: new Map(), promiseCandidates: new Map() };
}

export function checkDecorators(node: AstNode, host: DecoratorCollisionHost): readonly DecoratorCheckResult[] {
  const decorators = getDecorators(node);
  const results: DecoratorCheckResult[] = [];
  for (const decorator of decorators) results.push(checkDecorator(decorator, node, host));
  return results;
}

export function checkDecorator(decorator: AstNode, target: AstNode, host: DecoratorCollisionHost): DecoratorCheckResult {
  const signature = getDecoratorCallSignature(decorator, target, host) ?? getLegacyDecoratorCallSignature(decorator, target, host);
  const legacy = signature === getLegacyDecoratorCallSignature(decorator, target, host);
  const argumentCount = legacy ? getLegacyDecoratorArgumentCount(target) : getDecoratorArgumentCount(target, signature);
  const valid = signature !== undefined && signature.minArgumentCount <= argumentCount && argumentCount <= Math.max(signature.parameters.length, argumentCount);
  if (!valid) host.report?.(decorator, "Decorator signature is not assignable to this declaration.");
  markDecoratorAliasReferenced(decorator);
  markDecoratorMetadataDataTypeNodeAsReferenced(target);
  return { decorator, target, ...(signature !== undefined ? { signature } : {}), argumentCount, valid, legacy };
}

export function resolveDecorator(decorator: AstNode, candidatesOutArray: Signature[] | undefined, host: DecoratorCollisionHost): Signature | undefined {
  const expression = expressionOf(decorator) ?? decorator;
  const type = host.getTypeOfExpression?.(expression) ?? host.unknownType;
  const signatures = host.getSignaturesOfType?.(type) ?? [];
  candidatesOutArray?.push(...signatures);
  return signatures.find(signature => signature.minArgumentCount <= getDecoratorArgumentCount(parentOfDecorator(decorator), signature)) ?? signatures[0];
}

export function getDecoratorCallSignature(decorator: AstNode, target: AstNode, host: DecoratorCollisionHost): Signature | undefined {
  const type = host.getTypeOfExpression?.(expressionOf(decorator) ?? decorator);
  const signatures = type === undefined ? [] : host.getSignaturesOfType?.(type) ?? [];
  const argumentCount = getDecoratorArgumentCount(target, signatures[0]);
  return signatures.find(signature => signature.minArgumentCount <= argumentCount && signature.parameters.length >= argumentCount);
}

export function getLegacyDecoratorCallSignature(decorator: AstNode, target: AstNode, host: DecoratorCollisionHost): Signature | undefined {
  const type = host.getTypeOfExpression?.(expressionOf(decorator) ?? decorator);
  const signatures = type === undefined ? [] : host.getSignaturesOfType?.(type) ?? [];
  const argumentCount = getLegacyDecoratorArgumentCount(target);
  return signatures.find(signature => signature.minArgumentCount <= argumentCount && signature.parameters.length >= argumentCount);
}

export function getDecoratorArgumentCount(node: AstNode | undefined, signature: Signature | undefined): number {
  if (node === undefined) return 0;
  if (isClassElement(node)) return 2;
  if (node.kind === Kind.Parameter) return 3;
  if (node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression) return 1;
  return signature?.parameters.length ?? 1;
}

export function getLegacyDecoratorArgumentCount(node: AstNode | undefined): number {
  if (node === undefined) return 0;
  if (node.kind === Kind.Parameter) return 3;
  if (node.kind === Kind.PropertyDeclaration || node.kind === Kind.MethodDeclaration || node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor) return 3;
  if (node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression) return 1;
  return 2;
}

export function isPotentiallyUncalledDecorator(decorator: AstNode, signatures: readonly Signature[]): boolean {
  return decorator.kind !== Kind.CallExpression && signatures.some(signature => signature.parameters.length === 0 || signature.minArgumentCount === 0);
}

export function getDiagnosticHeadMessageForDecoratorResolution(node: AstNode): string {
  if (node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression) return "Unable to resolve signature of class decorator when called as an expression.";
  if (node.kind === Kind.Parameter) return "Unable to resolve signature of parameter decorator when called as an expression.";
  if (node.kind === Kind.PropertyDeclaration) return "Unable to resolve signature of property decorator when called as an expression.";
  return "Unable to resolve signature of decorator when called as an expression.";
}

export function newClassDecoratorContextType(classType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassDecoratorContext", [classType], host);
}

export function newClassMethodDecoratorContextType(classType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassMethodDecoratorContext", [classType, valueType], host);
}

export function newClassGetterDecoratorContextType(classType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassGetterDecoratorContext", [classType, valueType], host);
}

export function newClassSetterDecoratorContextType(classType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassSetterDecoratorContext", [classType, valueType], host);
}

export function newClassAccessorDecoratorContextType(thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassAccessorDecoratorContext", [thisType, valueType], host);
}

export function newClassFieldDecoratorContextType(thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassFieldDecoratorContext", [thisType, valueType], host);
}

export function getClassMemberDecoratorContextOverrideType(nameType: Type, isPrivate: boolean, isStatic: boolean, host: DecoratorCollisionHost): Type {
  const flags = [
    nameType,
    literalBooleanType(isPrivate, host),
    literalBooleanType(isStatic, host),
  ];
  return objectType("ClassMemberDecoratorContextOverride", flags, host);
}

export function newClassMemberDecoratorContextTypeForNode(node: AstNode, thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  const nameType = decoratorNameType(node, host);
  const overrideType = getClassMemberDecoratorContextOverrideType(nameType, isPrivateMember(node), isStaticMember(node), host);
  if (node.kind === Kind.GetAccessor) return newClassGetterDecoratorContextType(thisType, valueType, host);
  if (node.kind === Kind.SetAccessor) return newClassSetterDecoratorContextType(thisType, valueType, host);
  if (node.kind === Kind.MethodDeclaration) return newClassMethodDecoratorContextType(thisType, valueType, host);
  if (node.kind === Kind.AccessorKeyword) return newClassAccessorDecoratorContextType(thisType, valueType, host);
  return host.createUnionType?.([newClassFieldDecoratorContextType(thisType, valueType, host), overrideType]) ?? unionType([newClassFieldDecoratorContextType(thisType, valueType, host), overrideType]);
}

export function newClassAccessorDecoratorTargetType(thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassAccessorDecoratorTarget", [thisType, valueType], host);
}

export function newClassAccessorDecoratorResultType(thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return objectType("ClassAccessorDecoratorResult", [thisType, valueType], host);
}

export function newClassFieldDecoratorInitializerMutatorType(thisType: Type, valueType: Type, host: DecoratorCollisionHost): Type {
  return newFunctionType([], undefined, [valueType], valueType, host, thisType);
}

export function newESDecoratorCallSignature(targetType: Type, contextType: Type, nonOptionalReturnType: Type, host: DecoratorCollisionHost): Signature {
  const target = newParameter("target", targetType);
  const context = newParameter("context", contextType);
  return { flags: SignatureFlags.None, parameters: [target, context], minArgumentCount: 2, resolvedReturnType: nonOptionalReturnType };
}

export function newFunctionType(typeParameters: readonly Type[] | undefined, thisParameter: AstSymbol | undefined, parameters: readonly Type[], returnType: Type, host: DecoratorCollisionHost, thisType?: Type): Type {
  const symbols = parameters.map((type, index) => newParameter(`arg${index}`, type));
  const thisSymbol = thisParameter ?? (thisType === undefined ? undefined : newParameter("this", thisType));
  return host.createFunctionType?.(symbols, returnType, typeParameters) ?? {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredCallSignatures: [{ flags: SignatureFlags.None, parameters: symbols, minArgumentCount: symbols.length, resolvedReturnType: returnType, ...(thisSymbol !== undefined ? { thisParameter: thisSymbol } : {}) }],
    } as object,
  };
}

export function newGetterFunctionType(type: Type, host: DecoratorCollisionHost): Type {
  return newFunctionType([], undefined, [], type, host);
}

export function newSetterFunctionType(type: Type, host: DecoratorCollisionHost): Type {
  return newFunctionType([], undefined, [type], host.voidType, host);
}

export function newCallSignature(typeParameters: readonly Type[] | undefined, thisParameter: AstSymbol | undefined, parameters: readonly AstSymbol[], returnType: Type): Signature {
  return { flags: SignatureFlags.None, parameters, minArgumentCount: parameters.length, resolvedReturnType: returnType, ...(typeParameters !== undefined ? { typeParameters: typeParameters as never } : {}), ...(thisParameter !== undefined ? { thisParameter } : {}) };
}

export function newTypedPropertyDescriptorType(propertyType: Type, host: DecoratorCollisionHost): Type {
  return objectType("TypedPropertyDescriptor", [propertyType], host);
}

export function getParentTypeOfClassElement(node: AstNode, host: DecoratorCollisionHost): Type | undefined {
  const classNode = nearestClass(node);
  const symbol = classNode?.symbol;
  return symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
}

export function getClassElementPropertyKeyType(element: AstNode, host: DecoratorCollisionHost): Type {
  return decoratorNameType(element, host);
}

export function checkCollisionsForDeclarationName(node: AstNode, name: AstNode, state: GeneratedNameCollisionState, host: DecoratorCollisionHost): void {
  const text = nodeText(name);
  if (needCollisionCheckForIdentifier(node, name, text)) {
    recordPotentialCollisionWithWeakMapSetInGeneratedCode(node, name, state);
    recordPotentialCollisionWithReflectInGeneratedCode(node, name, state);
    checkCollisionWithGlobalPromiseInGeneratedCode(node, name, state, host);
  }
}

export function needCollisionCheckForIdentifier(node: AstNode, identifier: AstNode, name: string): boolean {
  if (name.length === 0) return false;
  if (identifier.kind !== Kind.Identifier && identifier.kind !== Kind.PrivateIdentifier) return false;
  return node.kind === Kind.ClassDeclaration || node.kind === Kind.VariableDeclaration || node.kind === Kind.FunctionDeclaration || isClassElement(node);
}

export function setNodeLinksForPrivateIdentifierScope(node: AstNode): void {
  (node as { privateIdentifierScope?: AstNode }).privateIdentifierScope = nearestClass(node) ?? node;
}

export function recordPotentialCollisionWithWeakMapSetInGeneratedCode(node: AstNode, name: AstNode, state: GeneratedNameCollisionState): void {
  if (nodeText(name) !== "WeakMap" && nodeText(name) !== "WeakSet") return;
  appendCollision(state.weakMapSetCandidates, nodeText(name), node);
}

export function checkWeakMapSetCollision(node: AstNode, state: GeneratedNameCollisionState, host: DecoratorCollisionHost): void {
  for (const [name, declarations] of state.weakMapSetCandidates) {
    if (declarations.length > 1) for (const declaration of declarations) host.report?.(declaration, `Declaration conflicts with generated ${name} helper usage.`);
  }
  void node;
}

export function checkCollisionWithGlobalPromiseInGeneratedCode(node: AstNode, name: AstNode, state: GeneratedNameCollisionState, host: DecoratorCollisionHost): void {
  if (nodeText(name) !== "Promise") return;
  appendCollision(state.promiseCandidates, "Promise", node);
  if (state.promiseCandidates.get("Promise")!.length > 1) host.report?.(node, "Declaration conflicts with generated Promise helper usage.");
}

export function recordPotentialCollisionWithReflectInGeneratedCode(node: AstNode, name: AstNode, state: GeneratedNameCollisionState): void {
  if (nodeText(name) === "Reflect") appendCollision(state.reflectCandidates, "Reflect", node);
}

export function checkReflectCollision(node: AstNode, state: GeneratedNameCollisionState, host: DecoratorCollisionHost): void {
  const candidates = state.reflectCandidates.get("Reflect") ?? [];
  if (candidates.length > 1) for (const candidate of candidates) host.report?.(candidate, "Declaration conflicts with generated Reflect helper usage.");
  void node;
}

export function checkClassNameCollisionWithObject(name: AstNode, host: DecoratorCollisionHost): void {
  if (nodeText(name) === "Object") host.report?.(name, "Class name 'Object' conflicts with emitted helper references.");
}

export function markDecoratorAliasReferenced(node: AstNode): void {
  const expression = expressionOf(node) ?? node;
  markEntityNameOrEntityExpressionAsReference(expression, false);
}

export function markDecoratorMetadataDataTypeNodeAsReferenced(node: AstNode): void {
  const entity = getEntityNameForDecoratorMetadata(node);
  if (entity !== undefined) markEntityNameOrEntityExpressionAsReference(entity, true);
}

export function getEntityNameForDecoratorMetadata(node: AstNode): AstNode | undefined {
  const type = (node as { readonly type?: AstNode }).type;
  if (type !== undefined) return getEntityNameFromTypeNode(type);
  const parameters = (node as { readonly parameters?: readonly AstNode[] }).parameters ?? [];
  return getEntityNameForDecoratorMetadataFromTypeList(parameters.map(parameter => (parameter as { readonly type?: AstNode }).type).filter((item): item is AstNode => item !== undefined));
}

export function getEntityNameForDecoratorMetadataFromTypeList(typeNodes: readonly AstNode[]): AstNode | undefined {
  for (const typeNode of typeNodes) {
    const entity = getEntityNameFromTypeNode(typeNode);
    if (entity !== undefined) return entity;
  }
  return undefined;
}

export function getEntityNameFromTypeNode(node: AstNode): AstNode | undefined {
  if (node.kind === Kind.TypeReference) return (node as { readonly typeName?: AstNode }).typeName;
  if (node.kind === Kind.ArrayType || node.kind === Kind.TypeOperator) return getEntityNameFromTypeNode((node as { readonly elementType?: AstNode; readonly type?: AstNode }).elementType ?? (node as { readonly type?: AstNode }).type ?? node);
  return undefined;
}

export function markTypeNodeAsReferenced(node: AstNode): void {
  const entity = getEntityNameFromTypeNode(node);
  if (entity !== undefined) markEntityNameOrEntityExpressionAsReference(entity, false);
}

export function markEntityNameOrEntityExpressionAsReference(typeName: AstNode | undefined, forDecoratorMetadata: boolean): void {
  if (typeName === undefined) return;
  const symbol = typeName.symbol;
  if (symbol !== undefined) (symbol as { referenced?: boolean; decoratorMetadataReferenced?: boolean }).referenced = true;
  if (symbol !== undefined && forDecoratorMetadata) (symbol as { decoratorMetadataReferenced?: boolean }).decoratorMetadataReferenced = true;
}

function objectType(name: string, typeArguments: readonly Type[], host: DecoratorCollisionHost): Type {
  return {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: {
      objectFlags: ObjectFlags.Reference,
      name,
      resolvedTypeArguments: typeArguments,
    } as object,
  };
}

function literalBooleanType(value: boolean, host: DecoratorCollisionHost): Type {
  return value ? literalType("true", TypeFlags.BooleanLiteral, true, host) : literalType("false", TypeFlags.BooleanLiteral, false, host);
}

function decoratorNameType(node: AstNode, host: DecoratorCollisionHost): Type {
  const name = declarationName(node);
  return literalType(name, TypeFlags.StringLiteral, name, host);
}

function literalType(name: string, flags: TypeFlags, value: string | boolean, host: DecoratorCollisionHost): Type {
  void name;
  void host;
  return { id: nextSyntheticTypeId(), flags, data: { value } };
}

function newParameter(name: string, type: Type): AstSymbol {
  return { name, escapedName: name, flags: SymbolFlags.FunctionScopedVariable, declarations: [], type } as AstSymbol & { type: Type };
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  if (unique.length === 1) return unique[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: unique, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function getDecorators(node: AstNode): readonly AstNode[] {
  return (node as { readonly decorators?: readonly AstNode[] }).decorators ?? [];
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function parentOfDecorator(decorator: AstNode): AstNode | undefined {
  return decorator.parent;
}

function parenthesizedName(node: AstNode | undefined): string {
  return nodeText(node);
}

function declarationName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return parenthesizedName(name);
  return nodeText(node);
}

function isClassElement(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.Constructor
    || node.kind === Kind.ClassStaticBlockDeclaration;
}

function isPrivateMember(node: AstNode): boolean {
  return declarationName(node).startsWith("#") || hasModifier(node, "private");
}

function isStaticMember(node: AstNode): boolean {
  return hasModifier(node, "static");
}

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] } | undefined)?.modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function nearestClass(node: AstNode | undefined): AstNode | undefined {
  let current = node?.parent;
  while (current !== undefined) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) return current;
    current = current.parent;
  }
  return undefined;
}

function appendCollision(map: Map<string, AstNode[]>, name: string, node: AstNode): void {
  const list = map.get(name) ?? [];
  list.push(node);
  map.set(name, list);
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

let syntheticTypeId = -3_500_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
