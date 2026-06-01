/**
 * Checker contextual, awaited, decorator, and helper-reference algorithms.
 *
 * Conceptual split from TS-Go `checker.go`'s contextual typing and awaited
 * type sections.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { ObjectType, Signature, Type, TypeMapper, TypeParameter } from "./types.js";
import { ObjectFlags, SignatureFlags, TypeFlags, getPropertyTypeOfType, getTypeOfSymbol } from "./types.js";
import type { TypeAlgebraState } from "./checker.typeAlgebra.js";
import { getUnionTypeWorker, newSignature, UnionReduction } from "./checker.typeAlgebra.js";
import {
  anyType,
  neverType,
  nullType,
  stringType,
  undefinedType,
  unknownType,
  voidType,
} from "./checker.checkedtype.js";
import { getNonNullableType, getTypeFacts, TypeFacts } from "./typeFacts.js";

export interface ContextualTypeHost extends TypeAlgebraState {
  readonly promiseType?: Type;
  readonly promiseLikeType?: Type;
  readonly nonNullableType?: Type;
  readonly autoType?: Type;
  readonly anyFunctionType?: Type;
  readonly contextStack?: ContextualEntry[];
  getContextualType?(node: AstNode): Type | undefined;
  getTypeOfExpression?(node: AstNode): Type | undefined;
  getTypeOfSymbol?(symbol: AstSymbol): Type | undefined;
  getReturnTypeOfSignature?(signature: Signature): Type | undefined;
  getSignaturesOfType?(type: Type, kind: "call" | "construct"): readonly Signature[];
  createPromiseType?(type: Type): Type;
  createArrayType?(type: Type): Type;
  createTypeReference?(target: Type, args: readonly Type[]): Type;
  instantiateType?(type: Type, mapper: TypeMapper): Type;
  report?(node: AstNode | undefined, message: string): void;
  resolveAlias?(symbol: AstSymbol): AstSymbol | undefined;
}

export interface ContextualEntry {
  readonly node: AstNode;
  readonly type: Type;
  readonly isCache?: boolean;
}

export interface InferenceContext {
  readonly source?: AstNode;
  readonly candidates: Map<AstSymbol, Type[]>;
}

export function getPromisedTypeOfPromise(host: ContextualTypeHost, type: Type): Type | undefined {
  return getPromisedTypeOfPromiseEx(host, type, undefined);
}

export function getPromisedTypeOfPromiseEx(host: ContextualTypeHost, type: Type, errorNode?: AstNode): Type | undefined {
  if ((type.flags & TypeFlags.Any) !== 0) return anyType;
  const direct = firstTypeArgument(type);
  if (direct !== undefined && isPromiseLike(type)) return direct;
  const then = getPropertyTypeOfType(type, "then");
  const thenSignatures = then === undefined ? [] : host.getSignaturesOfType?.(then, "call") ?? signaturesOfType(then);
  const promiseType = promisedTypeFromThenSignatures(host, thenSignatures);
  if (promiseType === undefined && errorNode !== undefined) host.report?.(errorNode, "Type is not Promise-like.");
  return promiseType;
}

export function getTypeOfFirstParameterOfSignature(host: ContextualTypeHost, signature: Signature): Type | undefined {
  return getTypeOfFirstParameterOfSignatureWithFallback(host, signature, undefined);
}

export function getTypeOfFirstParameterOfSignatureWithFallback(host: ContextualTypeHost, signature: Signature, fallback: Type | undefined): Type | undefined {
  const first = signature.parameters[0];
  return first === undefined ? fallback : host.getTypeOfSymbol?.(first) ?? getTypeOfSymbol(first) ?? fallback;
}

export type MappedTypeModifiers = number;
export const MappedTypeModifiers = {
  None: 0 as MappedTypeModifiers,
  IncludeReadonly: 1 << 0 as MappedTypeModifiers,
  ExcludeReadonly: 1 << 1 as MappedTypeModifiers,
  IncludeOptional: 1 << 2 as MappedTypeModifiers,
  ExcludeOptional: 1 << 3 as MappedTypeModifiers,
} as const;

export function getMappedTypeModifiers(type: Type): MappedTypeModifiers {
  const declaration = (type.data as { readonly declaration?: AstNode } | undefined)?.declaration;
  const readonlyToken = tokenText((declaration as { readonly readonlyToken?: AstNode } | undefined)?.readonlyToken);
  const questionToken = tokenText((declaration as { readonly questionToken?: AstNode } | undefined)?.questionToken);
  return (readonlyToken === "readonly" || readonlyToken === "+readonly" ? MappedTypeModifiers.IncludeReadonly : 0)
    | (readonlyToken === "-readonly" ? MappedTypeModifiers.ExcludeReadonly : 0)
    | (questionToken === "?" || questionToken === "+?" ? MappedTypeModifiers.IncludeOptional : 0)
    | (questionToken === "-?" ? MappedTypeModifiers.ExcludeOptional : 0);
}

export function getMappedTypeOptionality(type: Type): 1 | 0 | -1 {
  const modifiers = getMappedTypeModifiers(type);
  if ((modifiers & MappedTypeModifiers.ExcludeOptional) !== 0) return -1;
  if ((modifiers & MappedTypeModifiers.IncludeOptional) !== 0) return 1;
  return 0;
}

export function getCombinedMappedTypeOptionality(type: Type): 1 | 0 | -1 {
  const own = getMappedTypeOptionality(type);
  if (own !== 0) return own;
  const modifiersType = (type.data as { readonly modifiersType?: Type } | undefined)?.modifiersType;
  return modifiersType === undefined ? 0 : getMappedTypeOptionality(modifiersType);
}

export function isPartialMappedType(type: Type): boolean {
  return getCombinedMappedTypeOptionality(type) > 0;
}

export function getOptionalExpressionType(type: Type): Type {
  return (type.flags & TypeFlags.Union) === 0 ? type : getNonNullableType(type);
}

export function removeOptionalTypeMarker(type: Type): Type {
  return (type.flags & TypeFlags.Union) === 0
    ? type
    : getUnionTypeWorker(unionTypes(type).filter(item => item !== undefinedType), UnionReduction.Literal);
}

export function propagateOptionalTypeMarker(type: Type, source: Type): Type {
  return containsUndefinedType(source) && !containsUndefinedType(type)
    ? getUnionTypeWorker([type, undefinedType], UnionReduction.Literal)
    : type;
}

export function getConstraintDeclaration(type: Type): AstNode | undefined {
  return (type.data as { readonly declaration?: AstNode; readonly constraintDeclaration?: AstNode } | undefined)?.constraintDeclaration
    ?? (type.data as { readonly declaration?: AstNode; readonly constraintDeclaration?: AstNode } | undefined)?.declaration;
}

export function getTemplateLiteralType(texts: readonly string[], types: readonly Type[], host?: TypeAlgebraState): Type {
  return { flags: TypeFlags.TemplateLiteral, id: nextTypeId(host), data: { texts, types } as NonNullable<Type["data"]> };
}

export function getTemplateStringForType(type: Type): string | undefined {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return String(literalValue(type));
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return String(literalValue(type));
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return String(literalValue(type));
  if ((type.flags & TypeFlags.TemplateLiteral) !== 0) return templateTexts(type).join("${}");
  return undefined;
}

export function getStringMappingType(symbol: AstSymbol, type: Type, host?: TypeAlgebraState): Type {
  return { flags: TypeFlags.StringMapping, id: nextTypeId(host), symbol, data: { target: type } as NonNullable<Type["data"]> };
}

export function applyStringMapping(symbol: AstSymbol, text: string): string {
  switch (symbolName(symbol)) {
    case "Uppercase": return text.toUpperCase();
    case "Lowercase": return text.toLowerCase();
    case "Capitalize": return text.length === 0 ? text : text[0]!.toUpperCase() + text.slice(1);
    case "Uncapitalize": return text.length === 0 ? text : text[0]!.toLowerCase() + text.slice(1);
    default: return text;
  }
}

export function applyTemplateStringMapping(symbol: AstSymbol, type: Type, host?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return stringLiteral(applyStringMapping(symbol, String(literalValue(type))), host);
  if ((type.flags & TypeFlags.TemplateLiteral) !== 0) {
    return getTemplateLiteralType(templateTexts(type).map(text => applyStringMapping(symbol, text)), templateTypes(type), host);
  }
  return getStringMappingType(symbol, type, host);
}

export function getStringMappingTypeForGenericType(symbol: AstSymbol, type: Type, host?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.Union) !== 0) {
    return getUnionTypeWorker(unionTypes(type).map(item => getStringMappingTypeForGenericType(symbol, item, host)), UnionReduction.Literal, undefined, undefined, host);
  }
  return applyTemplateStringMapping(symbol, type, host);
}

export function substituteIndexedMappedType(mappedType: Type, indexType: Type, host?: ContextualTypeHost): Type {
  const template = (mappedType.data as { readonly templateType?: Type } | undefined)?.templateType;
  if (template === undefined) return unknownType;
  const typeParameter = (mappedType.data as { readonly typeParameter?: TypeParameter } | undefined)?.typeParameter;
  if (typeParameter === undefined) return template;
  return host?.instantiateType?.(template, {
    kind: 0,
    map: type => type === typeParameterAsType(typeParameter) ? indexType : type,
  }) ?? template;
}

export function couldAccessOptionalProperty(objectType: Type, propertyName: string): boolean {
  const prop = propertyOfType(objectType, propertyName);
  return prop !== undefined && ((prop.flags ?? 0) & SymbolFlags.Optional) !== 0;
}

export function getTypeOfPropertyOrIndexSignatureOfType(host: ContextualTypeHost, type: Type, name: string): Type | undefined {
  return getPropertyTypeOfType(type, name)
    ?? indexInfos(type).find(info => isStringOrNumberIndex(info.keyType))?.valueType;
}

export function getContextualTypeForInitializerExpression(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return host.getContextualType?.(node) ?? getNodeContextualType(parentOf(node));
}

export function getContextualTypeForVariableLikeDeclaration(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return getNodeDeclaredType(node) ?? getContextualTypeForInitializerExpression(host, (node as { readonly initializer?: AstNode }).initializer ?? node);
}

export function getContextuallyTypedParameterType(host: ContextualTypeHost, parameter: AstNode): Type | undefined {
  const contextualSignature = getContextualSignatureForFunctionLikeDeclaration(host, parentOf(parameter));
  const index = nodeArray((parentOf(parameter) as { readonly parameters?: unknown } | undefined)?.parameters).indexOf(parameter);
  const symbol = contextualSignature?.parameters[index];
  return symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
}

export function isContextSensitiveFunctionOrObjectLiteralMethod(node: AstNode | undefined): boolean {
  return isContextSensitiveFunctionLikeDeclaration(node)
    || node?.kind === Kind.MethodDeclaration
    || node?.kind === Kind.MethodSignature
    || node?.kind === Kind.PropertyAssignment && ((node as { readonly initializer?: AstNode }).initializer?.kind === Kind.FunctionExpression);
}

export function getSpreadArgumentType(host: ContextualTypeHost, argument: AstNode): Type {
  const expression = (argument as { readonly expression?: AstNode }).expression ?? argument;
  const type = host.getTypeOfExpression?.(expression) ?? getNodeCheckedType(expression) ?? unknownType;
  return (type.flags & TypeFlags.AnyOrUnknown) !== 0 ? type : host.createArrayType?.(type) ?? arrayType(type);
}

export function getMutableArrayOrTupleType(host: ContextualTypeHost, type: Type): Type {
  if (isTupleType(type)) return { ...type, data: { ...(type.data as object), readonly: false } as unknown as ObjectType };
  const element = firstTypeArgument(type) ?? unknownType;
  return host.createArrayType?.(element) ?? arrayType(element);
}

export function getContextualTypeForBindingElement(host: ContextualTypeHost, element: AstNode): Type | undefined {
  const parent = parentOf(element);
  const parentType = parent === undefined ? undefined : host.getContextualType?.(parent);
  if (parentType === undefined) return undefined;
  const name = propertyNameText((element as { readonly propertyName?: AstNode; readonly name?: AstNode }).propertyName
    ?? (element as { readonly propertyName?: AstNode; readonly name?: AstNode }).name);
  return name.length === 0 ? firstTypeArgument(parentType) : getPropertyTypeOfType(parentType, name);
}

export function getContextualTypeForStaticPropertyDeclaration(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return getContextualTypeForVariableLikeDeclaration(host, node);
}

export function getContextualTypeForReturnExpression(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const signature = contextualFunctionSignature(host, node);
  return signature === undefined ? undefined : host.getReturnTypeOfSignature?.(signature) ?? signature.resolvedReturnType;
}

export function checkGeneratorInstantiationAssignabilityToReturnType(host: ContextualTypeHost, generatorType: Type, returnType: Type, node?: AstNode): boolean {
  const yieldType = firstTypeArgument(generatorType) ?? generatorType;
  const ok = isAssignable(host, yieldType, returnType);
  if (!ok) host.report?.(node, "Generator yield type is not assignable to return type.");
  return ok;
}

export function getContextualSignatureForFunctionLikeDeclaration(host: ContextualTypeHost, node: AstNode | undefined): Signature | undefined {
  const contextualType = node === undefined ? undefined : host.getContextualType?.(node);
  return contextualType === undefined ? undefined : (host.getSignaturesOfType?.(contextualType, "call") ?? signaturesOfType(contextualType))[0];
}

export function getContextualTypeForYieldOperand(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return firstTypeArgument(getContextualTypeForReturnExpression(host, node) ?? unknownType);
}

export function getContextualTypeForAwaitOperand(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const contextual = host.getContextualType?.(node);
  return contextual === undefined ? undefined : getPromisedTypeOfPromise(host, contextual) ?? contextual;
}

export function getContextualTypeForArgument(host: ContextualTypeHost, call: AstNode, index: number): Type | undefined {
  const signature = getResolvedSignature(call);
  const parameter = signature?.parameters[index];
  return parameter === undefined ? undefined : host.getTypeOfSymbol?.(parameter) ?? getTypeOfSymbol(parameter);
}

export function getContextualTypeForDecorator(host: ContextualTypeHost, decorator: AstNode): Type | undefined {
  const declaration = parentOf(decorator);
  if (declaration === undefined) return undefined;
  return decoratorContextTypeForDeclaration(host, declaration);
}

export function getContextualTypeForBinaryOperand(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const parent = parentOf(node);
  const other = parent?.kind === Kind.BinaryExpression ? otherBinaryOperand(parent, node) : undefined;
  return other === undefined ? undefined : host.getTypeOfExpression?.(other);
}

export function getContextualTypeForAssignmentExpression(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const left = (node as { readonly left?: AstNode }).left;
  return left === undefined ? undefined : host.getTypeOfExpression?.(left) ?? getNodeCheckedType(left);
}

export function getContextualTypeForObjectLiteralMethod(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const containingObject = parentOf(node);
  const objectType = containingObject === undefined ? undefined : host.getContextualType?.(containingObject);
  const name = propertyNameText((node as { readonly name?: AstNode }).name);
  return objectType === undefined || name.length === 0 ? undefined : getPropertyTypeOfType(objectType, name);
}

export function getContextualTypeForElementExpression(host: ContextualTypeHost, node: AstNode): Type | undefined {
  const arrayTypeValue = host.getContextualType?.(parentOf(node) ?? node);
  return arrayTypeValue === undefined ? undefined : firstTypeArgument(arrayTypeValue);
}

export function getContextualTypeForConditionalOperand(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return host.getContextualType?.(parentOf(node) ?? node);
}

export function getContextualTypeForSubstitutionExpression(host: ContextualTypeHost, node: AstNode): Type | undefined {
  return host.getContextualType?.(parentOf(node) ?? node) ?? stringType;
}

export function getContextualImportAttributeType(host: ContextualTypeHost, node: AstNode): Type {
  return host.getContextualType?.(node) ?? objectType("ImportAttributes", []);
}

export function getEffectiveCallArguments(call: AstNode): readonly AstNode[] {
  return nodeArray((call as { readonly arguments?: unknown }).arguments);
}

export function getSpreadArgumentIndex(args: readonly AstNode[]): number {
  return args.findIndex(isSpreadArgument);
}

export function isSpreadArgument(node: AstNode | undefined): boolean {
  return node?.kind === Kind.SpreadElement || Boolean((node as { readonly dotDotDotToken?: unknown } | undefined)?.dotDotDotToken);
}

export function createSyntheticExpression(type: Type, original?: AstNode): AstNode {
  return { kind: Kind.Identifier, text: "__synthetic", checkedType: type, parent: original } as unknown as AstNode;
}

export function getSpreadIndices(args: readonly AstNode[]): readonly number[] {
  return args.map((arg, index) => isSpreadArgument(arg) ? index : -1).filter(index => index >= 0);
}

export function getEffectiveDecoratorArguments(decorator: AstNode): readonly AstNode[] {
  const expression = (decorator as { readonly expression?: AstNode }).expression;
  return expression?.kind === Kind.CallExpression ? getEffectiveCallArguments(expression) : [expression ?? decorator];
}

export function getDecoratorCallSignature(host: ContextualTypeHost, decorator: AstNode): Signature | undefined {
  return getESDecoratorCallSignature(host, decorator) ?? getLegacyDecoratorCallSignature(host, decorator);
}

export function getLegacyDecoratorCallSignature(host: ContextualTypeHost, decorator: AstNode): Signature | undefined {
  const args = getEffectiveDecoratorArguments(decorator);
  return newCallSignature(args.map((arg, index) => syntheticSymbol(`arg${index}`, host.getTypeOfExpression?.(arg) ?? unknownType)), voidType);
}

export function getESDecoratorCallSignature(host: ContextualTypeHost, decorator: AstNode): Signature | undefined {
  const contextType = getContextualTypeForDecorator(host, decorator);
  return contextType === undefined ? undefined : newCallSignature([syntheticSymbol("value", unknownType), syntheticSymbol("context", contextType)], voidType);
}

export function newClassDecoratorContextType(host: ContextualTypeHost): Type {
  return objectType("ClassDecoratorContext", [syntheticSymbol("kind", stringLiteral("class", host))]);
}

export function newClassMethodDecoratorContextType(host: ContextualTypeHost, node?: AstNode): Type {
  return newClassMemberDecoratorContextTypeForNode(host, node, "method");
}

export function newClassGetterDecoratorContextType(host: ContextualTypeHost, node?: AstNode): Type {
  return newClassMemberDecoratorContextTypeForNode(host, node, "getter");
}

export function newClassSetterDecoratorContextType(host: ContextualTypeHost, node?: AstNode): Type {
  return newClassMemberDecoratorContextTypeForNode(host, node, "setter");
}

export function newClassAccessorDecoratorContextType(host: ContextualTypeHost, node?: AstNode): Type {
  return newClassMemberDecoratorContextTypeForNode(host, node, "accessor");
}

export function newClassFieldDecoratorContextType(host: ContextualTypeHost, node?: AstNode): Type {
  return newClassMemberDecoratorContextTypeForNode(host, node, "field");
}

export function getClassMemberDecoratorContextOverrideType(host: ContextualTypeHost, node?: AstNode): Type | undefined {
  return getNodeDeclaredType(node) ?? host.getContextualType?.(node ?? syntheticNode());
}

export function newClassMemberDecoratorContextTypeForNode(host: ContextualTypeHost, node: AstNode | undefined, kind = classMemberKind(node)): Type {
  const name = propertyNameText((node as { readonly name?: AstNode } | undefined)?.name);
  return objectType("ClassMemberDecoratorContext", [
    syntheticSymbol("kind", stringLiteral(kind, host)),
    syntheticSymbol("name", stringLiteral(name, host)),
    syntheticSymbol("static", booleanLiteral(Boolean((node as { readonly static?: boolean } | undefined)?.static), host)),
    syntheticSymbol("private", booleanLiteral(name.startsWith("#"), host)),
  ]);
}

export function newClassAccessorDecoratorTargetType(host: ContextualTypeHost, valueType: Type): Type {
  return objectType("ClassAccessorDecoratorTarget", [
    syntheticSymbol("get", newGetterFunctionType(host, valueType)),
    syntheticSymbol("set", newSetterFunctionType(host, valueType)),
  ]);
}

export function newClassAccessorDecoratorResultType(host: ContextualTypeHost, valueType: Type): Type {
  return objectType("ClassAccessorDecoratorResult", [
    syntheticSymbol("get", newGetterFunctionType(host, valueType)),
    syntheticSymbol("set", newSetterFunctionType(host, valueType)),
    syntheticSymbol("init", newFunctionType(host, [valueType], valueType)),
  ]);
}

export function newClassFieldDecoratorInitializerMutatorType(host: ContextualTypeHost, valueType: Type): Type {
  return newFunctionType(host, [valueType], valueType);
}

export function newESDecoratorCallSignature(host: ContextualTypeHost, valueType: Type, contextType: Type, returnType: Type = voidType): Signature {
  void host;
  return newCallSignature([syntheticSymbol("value", valueType), syntheticSymbol("context", contextType)], returnType);
}

export function newFunctionType(host: ContextualTypeHost, parameters: readonly Type[], returnType: Type): Type {
  const signature = newCallSignature(parameters.map((type, index) => syntheticSymbol(`arg${index}`, type)), returnType);
  return objectType("Function", [], [signature], [], host);
}

export function newGetterFunctionType(host: ContextualTypeHost, returnType: Type): Type {
  return newFunctionType(host, [], returnType);
}

export function newSetterFunctionType(host: ContextualTypeHost, valueType: Type): Type {
  return newFunctionType(host, [valueType], voidType);
}

export function newCallSignature(parameters: readonly AstSymbol[], returnType: Type): Signature {
  return newSignature(SignatureFlags.None, undefined, undefined, undefined, parameters, returnType, undefined, parameters.length);
}

export function newTypedPropertyDescriptorType(host: ContextualTypeHost, valueType: Type): Type {
  return objectType("TypedPropertyDescriptor", [
    syntheticSymbol("value", valueType),
    syntheticSymbol("writable", booleanType(host)),
    syntheticSymbol("get", newGetterFunctionType(host, valueType)),
    syntheticSymbol("set", newSetterFunctionType(host, valueType)),
  ]);
}

export function getParentTypeOfClassElement(host: ContextualTypeHost, node: AstNode | undefined): Type | undefined {
  const classNode = findAncestor(node, current => current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression);
  return classNode === undefined ? undefined : host.getTypeOfExpression?.(classNode) ?? getNodeDeclaredType(classNode);
}

export function getClassElementPropertyKeyType(host: ContextualTypeHost, node: AstNode): Type {
  const name = (node as { readonly name?: AstNode }).name;
  return name === undefined ? stringType : stringLiteral(propertyNameText(name), host);
}

export function getTypeOfPropertyOfContextualTypeEx(host: ContextualTypeHost, contextualType: Type, name: string, nameType?: Type): Type | undefined {
  return getTypeOfConcretePropertyOfContextualType(host, contextualType, name)
    ?? getIndexedMappedTypeSubstitutedTypeOfContextualType(host, contextualType, nameType ?? stringLiteral(name, host));
}

export function getIndexedMappedTypeSubstitutedTypeOfContextualType(host: ContextualTypeHost, contextualType: Type, nameType: Type): Type | undefined {
  const templateType = (contextualType.data as { readonly templateType?: Type } | undefined)?.templateType;
  return templateType === undefined ? undefined : host.instantiateType?.(templateType, { kind: 0, map: () => nameType }) ?? templateType;
}

export function isExcludedMappedPropertyName(type: Type, name: string): boolean {
  const nameType = (type.data as { readonly nameType?: Type } | undefined)?.nameType;
  return nameType !== undefined && (nameType.flags & TypeFlags.Never) !== 0 || name.startsWith("__");
}

export function getTypeOfConcretePropertyOfContextualType(host: ContextualTypeHost, contextualType: Type, name: string): Type | undefined {
  const symbol = propertyOfType(contextualType, name);
  return symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
}

export function getTypeFromIndexInfosOfContextualType(contextualType: Type, nameType: Type): Type | undefined {
  return indexInfos(contextualType).find(info => (nameType.flags & info.keyType.flags) !== 0)?.valueType;
}

export function isCircularMappedProperty(type: Type, name: string): boolean {
  return ((type.data as { readonly propertyCache?: Map<string, Type> } | undefined)?.propertyCache?.get(name)) === type;
}

export function appendContextualPropertyTypeConstituent(out: Type[], type: Type | undefined): Type[] {
  if (type !== undefined && (type.flags & TypeFlags.Never) === 0) out.push(type);
  return out;
}

export function getApparentTypeOfContextualType(type: Type): Type {
  return (type.flags & TypeFlags.StringLiteral) !== 0 ? stringType : type;
}

export function discriminateContextualTypeByObjectMembers(type: Type, objectLiteral: AstNode): Type {
  if ((type.flags & TypeFlags.Union) === 0) return type;
  const names = new Set(nodeArray((objectLiteral as { readonly properties?: unknown }).properties).map(prop => propertyNameText((prop as { readonly name?: AstNode }).name)));
  const matching = unionTypes(type).filter(part => [...names].every(name => propertyOfType(part, name) !== undefined));
  return matching.length === 0 ? type : getUnionTypeWorker(matching, UnionReduction.Literal);
}

export function getMatchingUnionConstituentForObjectLiteral(type: Type, objectLiteral: AstNode): Type | undefined {
  const discriminated = discriminateContextualTypeByObjectMembers(type, objectLiteral);
  return (discriminated.flags & TypeFlags.Union) === 0 ? discriminated : undefined;
}

export function isPossiblyDiscriminantValue(type: Type): boolean {
  return (type.flags & (TypeFlags.Literal | TypeFlags.BooleanLiteral | TypeFlags.UniqueESSymbol)) !== 0;
}

export function instantiateContextualType(host: ContextualTypeHost, type: Type, mapper?: TypeMapper): Type {
  return mapper === undefined ? type : host.instantiateType?.(type, mapper) ?? mapper.map?.(type) ?? type;
}

export function instantiateInstantiableTypes(host: ContextualTypeHost, types: readonly Type[], mapper?: TypeMapper): readonly Type[] {
  return mapper === undefined ? types : types.map(type => instantiateContextualType(host, type, mapper));
}

export function pushCachedContextualType(host: ContextualTypeHost, node: AstNode, type: Type): void {
  pushContextualType(host, node, type, true);
}

export function pushContextualType(host: ContextualTypeHost, node: AstNode, type: Type, isCache = false): void {
  host.contextStack?.push({ node, type, isCache });
}

export function popContextualType(host: ContextualTypeHost): ContextualEntry | undefined {
  return host.contextStack?.pop();
}

export function findContextualNode(host: ContextualTypeHost, node: AstNode): ContextualEntry | undefined {
  return host.contextStack?.findLast(entry => entry.node === node);
}

export function isContextSensitiveFunctionLikeDeclaration(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ArrowFunction
    || node?.kind === Kind.FunctionExpression
    || node?.kind === Kind.MethodDeclaration
    || node?.kind === Kind.GetAccessor
    || node?.kind === Kind.SetAccessor;
}

export function hasContextSensitiveReturnExpression(node: AstNode | undefined): boolean {
  return findDescendant(node, current => current.kind === Kind.ReturnStatement && (current as { readonly expression?: AstNode }).expression !== undefined);
}

export function hasContextSensitiveYieldExpression(node: AstNode | undefined): boolean {
  return findDescendant(node, current => current.kind === Kind.YieldExpression);
}

export function pushInferenceContext(stack: InferenceContext[], context: InferenceContext): void {
  stack.push(context);
}

export function popInferenceContext(stack: InferenceContext[]): InferenceContext | undefined {
  return stack.pop();
}

export function getInferenceContext(stack: readonly InferenceContext[]): InferenceContext | undefined {
  return stack[stack.length - 1];
}

export function getTypeFactsWorker(type: Type): TypeFacts {
  return getTypeFacts(type);
}

export function getIntersectionTypeFacts(type: Type): TypeFacts {
  return unionTypes(type).reduce((facts, item) => facts & getTypeFacts(item), TypeFacts.All);
}

export function isZeroBigInt(value: unknown): boolean {
  return typeof value === "object" && value !== null && (value as { readonly base10Value?: string }).base10Value === "";
}

export function getTypeWithFacts(host: ContextualTypeHost, type: Type, facts: TypeFacts): Type {
  if ((facts & TypeFacts.NEUndefinedOrNull) !== 0) return getAdjustedTypeWithFacts(host, type, facts);
  return type;
}

export function getAdjustedTypeWithFacts(host: ContextualTypeHost, type: Type, facts: TypeFacts): Type {
  if ((facts & TypeFacts.NEUndefinedOrNull) !== 0) return getNonNullableType(type);
  if ((facts & TypeFacts.EQUndefinedOrNull) !== 0) return getUnionTypeWorker([nullType, undefinedType], UnionReduction.Literal, undefined, undefined, host);
  return type;
}

export function removeNullableByIntersection(host: ContextualTypeHost, type: Type): Type {
  return getNonNullableType(type) ?? host.nonNullableType ?? type;
}

export function recombineUnknownType(type: Type, subtype: Type): Type {
  return type === unknownType && (subtype.flags & TypeFlags.Object) !== 0 ? getUnionTypeWorker([subtype, nullType, undefinedType], UnionReduction.Literal) : subtype;
}

export function getGlobalNonNullableTypeInstantiation(host: ContextualTypeHost, type: Type): Type {
  return host.nonNullableType === undefined ? getNonNullableType(type) : host.createTypeReference?.(host.nonNullableType, [type]) ?? getNonNullableType(type);
}

export function convertAutoToAny(host: ContextualTypeHost, type: Type): Type {
  return type === host.autoType ? anyType : type;
}

export function checkAwaitedType(host: ContextualTypeHost, type: Type, node?: AstNode): Type {
  return getAwaitedType(host, type, node) ?? (host.errorType ?? anyType);
}

export function getAwaitedType(host: ContextualTypeHost, type: Type, node?: AstNode): Type | undefined {
  return getAwaitedTypeEx(host, type, false, node);
}

export function getAwaitedTypeEx(host: ContextualTypeHost, type: Type, errorOnCircularity: boolean, node?: AstNode): Type | undefined {
  void errorOnCircularity;
  return getAwaitedTypeNoAliasEx(host, type, undefined, node);
}

export function getAwaitedTypeNoAlias(host: ContextualTypeHost, type: Type, node?: AstNode): Type | undefined {
  return getAwaitedTypeNoAliasEx(host, type, undefined, node);
}

export function getAwaitedTypeNoAliasEx(host: ContextualTypeHost, type: Type, seen?: readonly Type[], node?: AstNode): Type | undefined {
  if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return type;
  if (seen?.includes(type) === true) return host.errorType ?? anyType;
  const promised = getPromisedTypeOfPromiseEx(host, type, node);
  return promised === undefined || promised === type ? type : getAwaitedTypeNoAliasEx(host, promised, [...(seen ?? []), type], node);
}

export function isAwaitedTypeInstantiation(type: Type): boolean {
  return symbolName(type.aliasSymbol) === "Awaited" || symbolName(type.symbol) === "Awaited";
}

export function isAwaitedTypeNeeded(type: Type): boolean {
  return (type.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Never)) === 0 && (isThenableType(type) || containsThenable(type));
}

export function createAwaitedTypeIfNeeded(host: ContextualTypeHost, type: Type): Type {
  return isAwaitedTypeNeeded(type) ? getAwaitedType(host, type) ?? type : type;
}

export function tryCreateAwaitedType(host: ContextualTypeHost, type: Type): Type | undefined {
  return isAwaitedTypeNeeded(type) ? createAwaitedTypeIfNeeded(host, type) : undefined;
}

export function isThenableType(type: Type): boolean {
  return getPropertyTypeOfType(type, "then") !== undefined || isPromiseLike(type);
}

export function getAwaitedTypeOfPromise(host: ContextualTypeHost, type: Type): Type | undefined {
  return getAwaitedTypeOfPromiseEx(host, type, undefined);
}

export function getAwaitedTypeOfPromiseEx(host: ContextualTypeHost, type: Type, node?: AstNode): Type | undefined {
  const promised = getPromisedTypeOfPromiseEx(host, type, node);
  return promised === undefined ? undefined : getAwaitedType(host, promised, node);
}

export function isSomeSymbolAssigned(symbols: readonly AstSymbol[], node: AstNode | undefined): boolean {
  return symbols.some(symbol => isSomeSymbolAssignedWorker(symbol, node));
}

export function isSomeSymbolAssignedWorker(symbol: AstSymbol, node: AstNode | undefined): boolean {
  return findDescendant(node, current => nodeSymbol((current as { readonly left?: AstNode }).left) === symbol && current.kind === Kind.BinaryExpression);
}

export function isConstraintPosition(node: AstNode | undefined): boolean {
  const parent = parentOf(node);
  return parent?.kind === Kind.TypeParameter && (parent as { readonly constraint?: AstNode }).constraint === node;
}

export function isGenericTypeWithUnionConstraint(type: Type): boolean {
  const constraint = constraintOf(type);
  return constraint !== undefined && (constraint.flags & TypeFlags.Union) !== 0;
}

export function isGenericTypeWithoutNullableConstraint(type: Type): boolean {
  const constraint = constraintOf(type);
  return (type.flags & TypeFlags.TypeParameter) !== 0 && (constraint === undefined || !containsUndefinedType(constraint) && (constraint.flags & TypeFlags.Null) === 0);
}

export function hasContextualTypeWithNoGenericTypes(type: Type | undefined): boolean {
  return type !== undefined && !containsGenericType(type);
}

export function getNonUndefinedType(type: Type): Type {
  return (type.flags & TypeFlags.Union) === 0 ? type : getUnionTypeWorker(unionTypes(type).filter(item => (item.flags & TypeFlags.Undefined) === 0), UnionReduction.Literal);
}

export function isGenericTypeWithUndefinedConstraint(type: Type): boolean {
  return containsUndefinedType(constraintOf(type) ?? neverType);
}

export function getActualTypeVariable(type: Type): Type {
  return (type.data as { readonly target?: Type } | undefined)?.target ?? type;
}

export function getSymbolOfNameOrPropertyAccessExpression(node: AstNode | undefined): AstSymbol | undefined {
  return nodeSymbol((node as { readonly name?: AstNode } | undefined)?.name ?? node);
}

export function isThisPropertyAndThisTyped(node: AstNode | undefined): boolean {
  return node?.kind === Kind.PropertyAccessExpression && ((node as { readonly expression?: AstNode }).expression?.kind === Kind.ThisKeyword);
}

export function getTypeOfNode(host: ContextualTypeHost, node: AstNode | undefined): Type | undefined {
  return getNodeDeclaredType(node) ?? getNodeCheckedType(node) ?? host.getTypeOfExpression?.(node ?? syntheticNode());
}

export function getThisTypeOfObjectLiteralFromContextualType(type: Type | undefined): Type | undefined {
  return type === undefined ? undefined : getPropertyTypeOfType(type, "this");
}

export function getThisTypeFromContextualType(type: Type | undefined): Type | undefined {
  return getThisTypeOfObjectLiteralFromContextualType(type) ?? type;
}

export function getThisTypeArgument(type: Type): Type | undefined {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments?.at(-1);
}

export function getApplicableIndexInfos(type: Type, keyType: Type): readonly import("./types.js").IndexInfo[] {
  return indexInfos(type).filter(info => (info.keyType.flags & keyType.flags) !== 0 || (keyType.flags & info.keyType.flags) !== 0);
}

export function getApplicableIndexSymbol(type: Type, keyType: Type): AstSymbol | undefined {
  const info = getApplicableIndexInfos(type, keyType)[0];
  return info === undefined ? undefined : syntheticSymbol(`[${typeName(info.keyType)}]`, info.valueType);
}

export function getRegularTypeOfExpression(host: ContextualTypeHost, expression: AstNode): Type {
  const type = host.getTypeOfExpression?.(expression) ?? getNodeCheckedType(expression) ?? unknownType;
  return (type.data as { readonly regularType?: Type } | undefined)?.regularType ?? type;
}

export function containsArgumentsReference(node: AstNode | undefined): boolean {
  return findDescendant(node, current => current.kind === Kind.Identifier && nodeText(current) === "arguments");
}

export function getEmitResolver(host: ContextualTypeHost): ContextualTypeHost {
  return host;
}

export function getAliasedSymbol(host: ContextualTypeHost, symbol: AstSymbol): AstSymbol {
  return host.resolveAlias?.(symbol) ?? (symbol as { readonly target?: AstSymbol }).target ?? symbol;
}

function promisedTypeFromThenSignatures(host: ContextualTypeHost, signatures: readonly Signature[]): Type | undefined {
  for (const signature of signatures) {
    const onFulfilled = getTypeOfFirstParameterOfSignature(host, signature);
    const fulfilledSignature = onFulfilled === undefined ? undefined : (host.getSignaturesOfType?.(onFulfilled, "call") ?? signaturesOfType(onFulfilled))[0];
    const promised = fulfilledSignature === undefined ? undefined : getTypeOfFirstParameterOfSignature(host, fulfilledSignature);
    if (promised !== undefined) return promised;
  }
  return undefined;
}

function signaturesOfType(type: Type): readonly Signature[] {
  return (type.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
}

function isPromiseLike(type: Type): boolean {
  return symbolName(type.symbol) === "Promise" || symbolName(type.symbol) === "PromiseLike";
}

function containsThenable(type: Type): boolean {
  return (type.flags & TypeFlags.UnionOrIntersection) !== 0 && unionTypes(type).some(isThenableType);
}

function firstTypeArgument(type: Type): Type | undefined {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments?.[0];
}

function unionTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function containsUndefinedType(type: Type): boolean {
  return (type.flags & TypeFlags.Undefined) !== 0 || (type.flags & TypeFlags.Union) !== 0 && unionTypes(type).some(containsUndefinedType);
}

function templateTexts(type: Type): readonly string[] {
  return (type.data as { readonly texts?: readonly string[] } | undefined)?.texts ?? [];
}

function templateTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function tokenText(node: AstNode | undefined): string {
  return nodeText(node);
}

function propertyOfType(type: Type, name: string): AstSymbol | undefined {
  return (type.symbol as { readonly members?: Map<string, AstSymbol> } | undefined)?.members?.get(name)
    ?? (type.data as ObjectType | undefined)?.declaredProperties?.find(symbol => symbolName(symbol) === name);
}

function indexInfos(type: Type): readonly import("./types.js").IndexInfo[] {
  return (type.data as ObjectType | undefined)?.indexInfos ?? [];
}

function isStringOrNumberIndex(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLike | TypeFlags.NumberLike)) !== 0;
}

function isTupleType(type: Type): boolean {
  return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Tuple ? true : false;
}

function arrayType(elementType: Type): Type {
  return objectType("Array", [], [], [], undefined, [elementType]);
}

function objectType(
  name: string,
  properties: readonly AstSymbol[],
  callSignatures: readonly Signature[] = [],
  constructSignatures: readonly Signature[] = [],
  host?: TypeAlgebraState,
  typeArguments: readonly Type[] = [],
): Type {
  return {
    flags: TypeFlags.Object,
    id: nextTypeId(host),
    symbol: { name, escapedName: name, flags: SymbolFlags.Type, declarations: [], members: new Map(properties.map(prop => [symbolName(prop), prop])) },
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredProperties: properties,
      declaredCallSignatures: callSignatures,
      declaredConstructSignatures: constructSignatures,
      resolvedTypeArguments: typeArguments,
    } as ObjectType,
  };
}

function syntheticSymbol(name: string, type: Type): AstSymbol {
  return { name, escapedName: name, flags: SymbolFlags.Property, declarations: [], synthetic: true, syntheticType: type } as AstSymbol;
}

function stringLiteral(value: string, host?: TypeAlgebraState): Type {
  return { flags: TypeFlags.StringLiteral, id: nextTypeId(host), data: { value } };
}

function booleanLiteral(value: boolean, host?: TypeAlgebraState): Type {
  return { flags: TypeFlags.BooleanLiteral, id: nextTypeId(host), data: { value } };
}

function booleanType(host: TypeAlgebraState): Type {
  return getUnionTypeWorker([booleanLiteral(false, host), booleanLiteral(true, host)], UnionReduction.Literal, undefined, undefined, host);
}

function contextualFunctionSignature(host: ContextualTypeHost, node: AstNode): Signature | undefined {
  return getContextualSignatureForFunctionLikeDeclaration(host, findAncestor(node, isFunctionLike));
}

function decoratorContextTypeForDeclaration(host: ContextualTypeHost, declaration: AstNode): Type {
  if (declaration.kind === Kind.ClassDeclaration || declaration.kind === Kind.ClassExpression) return newClassDecoratorContextType(host);
  return newClassMemberDecoratorContextTypeForNode(host, declaration);
}

function classMemberKind(node: AstNode | undefined): string {
  switch (node?.kind) {
    case Kind.GetAccessor: return "getter";
    case Kind.SetAccessor: return "setter";
    case Kind.MethodDeclaration: return "method";
    case Kind.PropertyDeclaration: return "field";
    default: return "member";
  }
}

function isFunctionLike(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.MethodDeclaration;
}

function otherBinaryOperand(node: AstNode, operand: AstNode): AstNode | undefined {
  const left = (node as { readonly left?: AstNode }).left;
  const right = (node as { readonly right?: AstNode }).right;
  return operand === left ? right : left;
}

function getResolvedSignature(node: AstNode): Signature | undefined {
  return (node as { readonly resolvedSignature?: Signature }).resolvedSignature;
}

function typeParameterAsType(typeParameter: TypeParameter): Type {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  return { flags: TypeFlags.TypeParameter, id: nextTypeId(), ...(symbol === undefined ? {} : { symbol }), data: typeParameter };
}

function isAssignable(host: ContextualTypeHost, source: Type, target: Type): boolean {
  return source === target || (source.flags & target.flags) !== 0 || (source.flags & TypeFlags.AnyOrUnknown) !== 0 || target === unknownType || source === neverType
    || host.getTypeOfSymbol !== undefined && false;
}

function constraintOf(type: Type): Type | undefined {
  return (type.data as { readonly constraint?: Type } | undefined)?.constraint;
}

function containsGenericType(type: Type): boolean {
  return (type.flags & TypeFlags.TypeParameter) !== 0 || ((type.flags & TypeFlags.UnionOrIntersection) !== 0 && unionTypes(type).some(containsGenericType));
}

function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  for (let current = node; current !== undefined; current = parentOf(current)) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function findDescendant(node: AstNode | undefined, predicate: (node: AstNode) => boolean): boolean {
  if (node === undefined) return false;
  if (predicate(node)) return true;
  return childNodes(node).some(child => findDescendant(child, predicate));
}

function childNodes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const key of ["body", "statements", "members", "properties", "parameters", "arguments", "expression", "left", "right", "initializer", "type"]) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) out.push(value);
    else out.push(...nodeArray(value));
  }
  return out;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function getNodeContextualType(node: AstNode | undefined): Type | undefined {
  return (node as { readonly contextualType?: Type } | undefined)?.contextualType;
}

function getNodeDeclaredType(node: AstNode | undefined): Type | undefined {
  return (node as { readonly declaredType?: Type; readonly type?: Type } | undefined)?.declaredType
    ?? (node as { readonly declaredType?: Type; readonly type?: Type } | undefined)?.type;
}

function getNodeCheckedType(node: AstNode | undefined): Type | undefined {
  return (node as { readonly checkedType?: Type } | undefined)?.checkedType;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function propertyNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return nodeText(node);
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function typeName(type: Type): string {
  return type.symbol === undefined ? `type#${type.id}` : symbolName(type.symbol);
}

function syntheticNode(): AstNode {
  return { kind: Kind.Identifier, text: "__contextual" } as unknown as AstNode;
}

function nextTypeId(host?: TypeAlgebraState): number {
  if (host !== undefined) return host.nextTypeId();
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}

let syntheticTypeId = -3_250_000;
