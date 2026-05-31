/**
 * Checker type-node constructors.
 *
 * Conceptual split from TS-Go `checker.go`'s `getTypeFrom*Node` family.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { MappedType, ObjectType, Type, TypeMapper, TypeParameter } from "./types.js";
import { ElementFlags, ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import type { TypeNodeResolutionHost } from "./checker.typeNodes.js";
import {
  createNormalizedTupleType,
  createNormalizedTypeReference,
  getTypeArgumentsFromNode,
  getTypeFromTypeNodeWorker,
} from "./checker.typeNodes.js";
import {
  newConditionalType,
  newIndexType,
  newTemplateLiteralType,
  newUnionType,
  type TypeAlgebraState,
  UnionReduction,
  getUnionTypeWorker,
} from "./checker.typeAlgebra.js";
import { newTypeMapper } from "./mapper.js";

export interface TypeNodeConstructorHost extends TypeNodeResolutionHost {
  readonly arrayType?: Type;
  readonly readonlyArrayType?: Type;
  readonly functionType?: Type;
  readonly importMetaType?: Type;
  readonly globalThisType?: Type;
  createArrayType?(elementType: Type, readonlyArray?: boolean): Type;
  getTypeAliasInstantiation?(symbol: AstSymbol, typeArguments: readonly Type[], location?: AstNode): Type;
  getTypeFromImport?(argument: AstNode, qualifier: readonly string[], typeArguments: readonly Type[]): Type | undefined;
  getConstraintOfInferType?(node: AstNode): Type | undefined;
  getGlobalType?(name: string, arity: number): Type | undefined;
}

export function getTypeFromTypeQueryNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  const symbol = host.getSymbolAtLocation(entityNameOfTypeQuery(node));
  return host.getTypeOfSymbol(symbol ?? syntheticSymbol(entityNameText(entityNameOfTypeQuery(node)), SymbolFlags.Value)) ?? host.unknownType;
}

export function getTypeFromArrayOrTupleTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  if (node.kind === Kind.ArrayType) {
    const element = host.getTypeFromTypeNode((node as { readonly elementType?: AstNode }).elementType) ?? host.unknownType;
    return host.createArrayType?.(element, false) ?? createNormalizedTypeReference(host, host.arrayType ?? syntheticArrayType(false), [element]);
  }
  const elements = nodeArray((node as { readonly elements?: unknown }).elements);
  const elementTypes = elements.map(element => host.getTypeFromTypeNode(getArrayElementTypeNode(element)) ?? host.unknownType);
  const elementFlags = elements.map(tupleElementFlags);
  return createNormalizedTupleType(host, elementTypes, elementFlags, isReadonlyTupleNode(node));
}

export function isVariadicTupleElement(node: AstNode | undefined): boolean {
  return node?.kind === Kind.RestType || Boolean((node as { readonly dotDotDotToken?: unknown; readonly variadic?: boolean } | undefined)?.dotDotDotToken)
    || (node?.kind === Kind.NamedTupleMember && isVariadicTupleElement(getArrayElementTypeNode(node)));
}

export function getArrayOrTupleTargetType(host: TypeNodeConstructorHost, node: AstNode): Type {
  return isReadonlyTypeOperator(parentOf(node)) || isReadonlyTupleNode(node)
    ? host.readonlyArrayType ?? syntheticArrayType(true)
    : host.arrayType ?? syntheticArrayType(false);
}

export function isReadonlyTypeOperator(node: AstNode | undefined): boolean {
  return node?.kind === Kind.TypeOperator && nodeText((node as { readonly operator?: AstNode }).operator) === "readonly";
}

export function getTypeFromNamedTupleTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  return host.getTypeFromTypeNode((node as { readonly type?: AstNode }).type) ?? host.unknownType;
}

export function getTypeFromRestTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  return host.getTypeFromTypeNode((node as { readonly type?: AstNode }).type) ?? host.unknownType;
}

export function getArrayElementTypeNode(node: AstNode | undefined): AstNode | undefined {
  if (node?.kind === Kind.NamedTupleMember) return (node as { readonly type?: AstNode }).type;
  if (node?.kind === Kind.RestType || node?.kind === Kind.OptionalType) return (node as { readonly type?: AstNode }).type;
  return node;
}

export function getTypeFromOptionalTypeNode(host: TypeNodeConstructorHost, node: AstNode, state?: TypeAlgebraState): Type {
  const element = host.getTypeFromTypeNode((node as { readonly type?: AstNode }).type) ?? host.unknownType;
  return getUnionTypeWorker([element, host.undefinedType], UnionReduction.Literal, undefined, undefined, state);
}

export function getTypeFromUnionTypeNode(host: TypeNodeConstructorHost, node: AstNode, state?: TypeAlgebraState): Type {
  return getUnionTypeWorker(typeNodes(node).map(typeNode => host.getTypeFromTypeNode(typeNode) ?? host.unknownType), UnionReduction.Literal, undefined, undefined, state);
}

export function getTypeFromIntersectionTypeNode(host: TypeNodeConstructorHost, node: AstNode, state?: TypeAlgebraState): Type {
  const types = typeNodes(node).map(typeNode => host.getTypeFromTypeNode(typeNode) ?? host.unknownType);
  return types.length === 0
    ? host.unknownType
    : types.length === 1
      ? types[0]!
      : { flags: TypeFlags.Intersection, id: nextSyntheticTypeId(), data: { types, objectFlags: ObjectFlags.None } };
  void state;
}

export function getTypeFromTemplateTypeNode(host: TypeNodeConstructorHost, node: AstNode, state?: TypeAlgebraState): Type {
  const texts = templateTextsFromNode(node);
  const types = nodeArray((node as { readonly templateSpans?: unknown; readonly types?: unknown }).templateSpans ?? (node as { readonly types?: unknown }).types)
    .map(span => host.getTypeFromTypeNode((span as { readonly type?: AstNode }).type ?? span) ?? host.stringType);
  return newTemplateLiteralType(texts.length === 0 ? ["", ""] : texts, types, state);
}

export function getTypeFromMappedTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  const typeParameterNode = (node as { readonly typeParameter?: AstNode }).typeParameter;
  const typeParameter = typeParameterNode === undefined
    ? undefined
    : ({ symbol: nodeSymbol(typeParameterNode), constraint: host.getTypeFromTypeNode((typeParameterNode as { readonly constraint?: AstNode }).constraint) } as TypeParameter);
  const mapped: MappedType = {
    objectFlags: ObjectFlags.Mapped,
    declaration: node,
    ...(typeParameter === undefined ? {} : { typeParameter }),
    constraintType: host.getTypeFromTypeNode((typeParameterNode as { readonly constraint?: AstNode } | undefined)?.constraint) ?? host.unknownType,
    ...(host.getTypeFromTypeNode((node as { readonly nameType?: AstNode }).nameType) === undefined ? {} : {
      nameType: host.getTypeFromTypeNode((node as { readonly nameType?: AstNode }).nameType)!,
    }),
    templateType: host.getTypeFromTypeNode((node as { readonly type?: AstNode }).type) ?? host.unknownType,
  };
  return { flags: TypeFlags.Object, id: nextSyntheticTypeId(), data: mapped };
}

export function getTypeFromConditionalTypeNode(host: TypeNodeConstructorHost, node: AstNode, state?: TypeAlgebraState): Type {
  const checkType = host.getTypeFromTypeNode((node as { readonly checkType?: AstNode }).checkType) ?? host.unknownType;
  const extendsType = host.getTypeFromTypeNode((node as { readonly extendsType?: AstNode }).extendsType) ?? host.unknownType;
  const trueType = host.getTypeFromTypeNode((node as { readonly trueType?: AstNode }).trueType) ?? host.unknownType;
  const falseType = host.getTypeFromTypeNode((node as { readonly falseType?: AstNode }).falseType) ?? host.unknownType;
  return getConditionalType({ checkType, extendsType, trueType, falseType, node }, undefined, undefined, state);
}

export function getConditionalType(root: ConditionalTypeRoot, mapper?: TypeMapper, combinedMapper?: TypeMapper, state?: TypeAlgebraState): Type {
  const type = newConditionalType(root, mapper, combinedMapper, state);
  type.data = {
    ...(type.data as object),
    trueType: mapper?.map?.(root.trueType) ?? root.trueType,
    falseType: mapper?.map?.(root.falseType) ?? root.falseType,
  } as NonNullable<Type["data"]>;
  return type;
}

export function getTailRecursionRoot(type: Type): ConditionalTypeRoot | undefined {
  return (type.data as { readonly root?: ConditionalTypeRoot } | undefined)?.root;
}

export function isSimpleTupleType(type: Type): boolean {
  const elementInfo = (type.data as { readonly elementInfo?: readonly { readonly flags: ElementFlags }[] } | undefined)?.elementInfo ?? [];
  return elementInfo.length !== 0 && elementInfo.every(info => (info.flags & ElementFlags.Variable) === 0);
}

export function isDeferredType(type: Type): boolean {
  return (type.flags & TypeFlags.Conditional) !== 0 && (type.data as { readonly mapper?: unknown; readonly combinedMapper?: unknown } | undefined)?.mapper !== undefined;
}

export function getPermissiveInstantiation(type: Type, state?: TypeAlgebraState): Type {
  return instantiateWithTypeParameterMapper(type, source => permissiveMapperWorker(source, state));
}

export function getRestrictiveInstantiation(type: Type, state?: TypeAlgebraState): Type {
  return instantiateWithTypeParameterMapper(type, source => restrictiveMapperWorker(source, state));
}

export function getRestrictiveTypeParameter(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.TypeParameter) === 0) return type;
  return {
    flags: TypeFlags.TypeParameter,
    id: nextSyntheticTypeId(),
    ...(type.symbol === undefined ? {} : { symbol: type.symbol }),
    data: { ...(type.data as object), constraint: restrictiveMapperWorker(type, state) } as TypeParameter,
  };
}

export function restrictiveMapperWorker(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return neverLike(state);
  return type;
}

export function permissiveMapperWorker(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return state?.errorType ?? hostAnyType;
  return type;
}

export function getTrueTypeFromConditionalType(type: Type): Type | undefined {
  return (type.data as { readonly trueType?: Type } | undefined)?.trueType;
}

export function getFalseTypeFromConditionalType(type: Type): Type | undefined {
  return (type.data as { readonly falseType?: Type } | undefined)?.falseType;
}

export function getInferredTrueTypeFromConditionalType(type: Type): Type | undefined {
  return (type.data as { readonly inferredTrueType?: Type; readonly trueType?: Type } | undefined)?.inferredTrueType
    ?? (type.data as { readonly trueType?: Type } | undefined)?.trueType;
}

export function getTypeFromInferTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  const resolved = host.getConstraintOfInferType?.(node)
    ?? host.getTypeFromTypeNode((node as { readonly typeParameter?: AstNode }).typeParameter);
  if (resolved !== undefined) return resolved;
  const symbol = nodeSymbol((node as { readonly typeParameter?: AstNode }).typeParameter);
  return {
    flags: TypeFlags.TypeParameter,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: {} as TypeParameter,
  };
}

export function getTypeFromImportTypeNode(host: TypeNodeConstructorHost, node: AstNode): Type {
  const argument = (node as { readonly argument?: AstNode }).argument;
  if (argument === undefined) return host.unknownType;
  const qualifier = getIdentifierChain((node as { readonly qualifier?: AstNode }).qualifier);
  const typeArguments = getTypeArgumentsFromNode(host, node);
  return host.getTypeFromImport?.(argument, qualifier, typeArguments) ?? host.unknownType;
}

export function getIdentifierChain(node: AstNode | undefined): readonly string[] {
  if (node === undefined) return [];
  const left = getIdentifierChain((node as { readonly left?: AstNode; readonly expression?: AstNode }).left ?? (node as { readonly expression?: AstNode }).expression);
  const own = nodeText((node as { readonly right?: AstNode; readonly name?: AstNode }).right ?? (node as { readonly name?: AstNode }).name ?? node);
  return own.length === 0 ? left : [...left, own];
}

export function resolveImportSymbolType(host: TypeNodeConstructorHost, symbol: AstSymbol | undefined, typeArguments: readonly Type[] = []): Type {
  if (symbol === undefined) return host.unknownType;
  const target = host.getDeclaredTypeOfSymbol(symbol) ?? host.unknownType;
  return typeArguments.length === 0 ? target : createNormalizedTypeReference(host, target, typeArguments);
}

export function createTypeFromGenericGlobalType(host: TypeNodeConstructorHost, name: string, typeArguments: readonly Type[]): Type {
  const target = host.getGlobalType?.(name, typeArguments.length) ?? syntheticGlobalType(name, typeArguments.length);
  return createNormalizedTypeReference(host, target, typeArguments);
}

export function getGlobalStrictFunctionType(host: TypeNodeConstructorHost): Type {
  return host.functionType ?? host.getGlobalType?.("Function", 0) ?? syntheticGlobalType("Function", 0);
}

export function getGlobalImportMetaExpressionType(host: TypeNodeConstructorHost): Type {
  return host.importMetaType ?? host.getGlobalType?.("ImportMeta", 0) ?? syntheticGlobalType("ImportMeta", 0);
}

function instantiateWithTypeParameterMapper(type: Type, mapper: (type: Type) => Type): Type {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return mapper(type);
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) {
    const types = constituentTypes(type).map(item => instantiateWithTypeParameterMapper(item, mapper));
    return { ...type, id: nextSyntheticTypeId(), data: { ...(type.data as object), types } as NonNullable<Type["data"]> };
  }
  if ((type.flags & TypeFlags.Object) !== 0) {
    const args = (type.data as ObjectType | undefined)?.resolvedTypeArguments;
    if (args !== undefined) {
      return { ...type, id: nextSyntheticTypeId(), data: { ...(type.data as object), resolvedTypeArguments: args.map(item => instantiateWithTypeParameterMapper(item, mapper)) } as unknown as ObjectType };
    }
  }
  return type;
}

function tupleElementFlags(node: AstNode): ElementFlags {
  if (isVariadicTupleElement(node)) return ElementFlags.Variadic;
  if (node.kind === Kind.OptionalType || Boolean((node as { readonly questionToken?: unknown }).questionToken)) return ElementFlags.Optional;
  if (node.kind === Kind.RestType) return ElementFlags.Rest;
  return ElementFlags.Required;
}

function isReadonlyTupleNode(node: AstNode): boolean {
  return Boolean((node as { readonly readonly?: boolean; readonly readonlyToken?: unknown }).readonly)
    || Boolean((node as { readonly readonly?: boolean; readonly readonlyToken?: unknown }).readonlyToken);
}

function templateTextsFromNode(node: AstNode): readonly string[] {
  const head = nodeText((node as { readonly head?: AstNode }).head);
  const spans = nodeArray((node as { readonly templateSpans?: unknown }).templateSpans);
  if (spans.length === 0) return head.length === 0 ? [""] : [head];
  return [head, ...spans.map(span => nodeText((span as { readonly literal?: AstNode }).literal))];
}

function entityNameOfTypeQuery(node: AstNode): AstNode | undefined {
  return (node as { readonly exprName?: AstNode; readonly expression?: AstNode }).exprName
    ?? (node as { readonly exprName?: AstNode; readonly expression?: AstNode }).expression;
}

function typeNodes(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly types?: unknown }).types);
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function entityNameText(node: AstNode | undefined): string {
  return getIdentifierChain(node).join(".");
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function syntheticSymbol(name: string, flags: SymbolFlags): AstSymbol {
  return { name, escapedName: name, flags, declarations: [] };
}

function syntheticArrayType(readonlyArray: boolean): Type {
  return syntheticGlobalType(readonlyArray ? "ReadonlyArray" : "Array", 1);
}

function syntheticGlobalType(name: string, arity: number): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    symbol: syntheticSymbol(name, SymbolFlags.Type),
    data: {
      objectFlags: ObjectFlags.Interface,
      typeParameters: Array.from({ length: arity }, (_, index) => ({ symbol: syntheticSymbol(`T${index}`, SymbolFlags.TypeParameter) }) as TypeParameter),
    } as ObjectType,
  };
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function neverLike(state?: TypeAlgebraState): Type {
  return state?.errorType ?? { flags: TypeFlags.Never, id: nextSyntheticTypeId(), data: { intrinsicName: "never", objectFlags: ObjectFlags.None } };
}

const hostAnyType: Type = { flags: TypeFlags.Any, id: -1_975_001, data: { intrinsicName: "any", objectFlags: ObjectFlags.None } };
let syntheticTypeId = -1_975_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}

interface ConditionalTypeRoot {
  readonly checkType: Type;
  readonly extendsType: Type;
  readonly trueType: Type;
  readonly falseType: Type;
  readonly node?: AstNode;
}
