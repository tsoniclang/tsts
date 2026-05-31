/**
 * Checker type-node and mapped-type construction.
 *
 * Conceptual split from TS-Go `checker.go` type-node conversion section.
 * The functions here convert AST type nodes to structural checker `Type`
 * values and keep mapped/tuple/reference helper boundaries aligned with
 * upstream.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { MappedType, ObjectType, Type, TypeMapper, TypeParameter } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getMappedType, newTypeMapper } from "./mapper.js";
import { instantiateTypeWorker, type InstantiationHost } from "./checker.instantiation.js";

export interface TypeNodeResolutionHost extends InstantiationHost {
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly bigintType: Type;
  readonly voidType: Type;
  readonly undefinedType: Type;
  readonly nullType: Type;
  readonly symbolType: Type;
  getSymbolAtLocation(node: AstNode | undefined): AstSymbol | undefined;
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined;
  getTypeOfSymbol(symbol: AstSymbol): Type | undefined;
  getTypeFromTypeNode(node: AstNode | undefined): Type | undefined;
  report(node: AstNode | undefined, message: string): void;
}

export function instantiateMappedArrayType(host: TypeNodeResolutionHost, type: Type, mapper: TypeMapper): Type {
  const elementType = elementTypeOfArrayLike(type) ?? host.unknownType;
  return host.createTypeReference(type, [instantiateTypeWorker(host, elementType, mapper)]);
}

export function instantiateMappedTupleType(host: TypeNodeResolutionHost, type: Type, mapper: TypeMapper): Type {
  const data = type.data as ObjectType & { readonly elementInfo?: readonly unknown[] } | undefined;
  const elements = (data?.resolvedTypeArguments ?? []).map(element => instantiateTypeWorker(host, element, mapper));
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: {
      ...data,
      resolvedTypeArguments: elements,
      objectFlags: (data?.objectFlags ?? ObjectFlags.Tuple) | ObjectFlags.Instantiated,
    },
  };
}

export function instantiateMappedTypeTemplate(host: TypeNodeResolutionHost, type: Type, mapper: TypeMapper): Type {
  const mapped = type.data as MappedType | undefined;
  return mapped?.templateType === undefined ? host.unknownType : instantiateTypeWorker(host, mapped.templateType, mapper);
}

export function getModifiedReadonlyState(mappedType: Type, fallback: boolean): boolean {
  const token = ((mappedType.data as MappedType | undefined)?.declaration as { readonly readonlyToken?: AstNode } | undefined)?.readonlyToken;
  if (token === undefined) return fallback;
  const text = nodeText(token);
  if (text === "-readonly") return false;
  if (text === "+readonly" || text === "readonly") return true;
  return fallback;
}

export function getTypeParameterFromMappedType(type: Type): TypeParameter | undefined {
  return (type.data as MappedType | undefined)?.typeParameter;
}

export function getConstraintTypeFromMappedType(type: Type): Type | undefined {
  return (type.data as MappedType | undefined)?.constraintType;
}

export function getNameTypeFromMappedType(type: Type): Type | undefined {
  return (type.data as MappedType | undefined)?.nameType;
}

export function getTemplateTypeFromMappedType(type: Type): Type | undefined {
  return (type.data as MappedType | undefined)?.templateType;
}

export function isMappedTypeWithKeyofConstraintDeclaration(type: Type): boolean {
  const declaration = (type.data as MappedType | undefined)?.declaration;
  const constraint = getConstraintDeclarationForMappedType(declaration);
  return constraint?.kind === Kind.TypeOperator && nodeText((constraint as { readonly operator?: AstNode }).operator) === "keyof";
}

export function getConstraintDeclarationForMappedType(declaration: AstNode | undefined): AstNode | undefined {
  return typeNodeOf((declaration as { readonly typeParameter?: AstNode } | undefined)?.typeParameter)
    ?? (declaration as { readonly constraint?: AstNode } | undefined)?.constraint;
}

export function getApparentMappedTypeKeys(host: TypeNodeResolutionHost, type: Type): readonly Type[] {
  const constraint = getConstraintTypeFromMappedType(type);
  if (constraint === undefined) return [];
  const keys: Type[] = [];
  forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(host, type, (key) => keys.push(key));
  return keys.length === 0 ? typeConstituents(constraint) : keys;
}

export function forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(
  host: TypeNodeResolutionHost,
  type: Type,
  callback: (type: Type) => void,
): void {
  const constraint = getConstraintTypeFromMappedType(type);
  if (constraint === undefined) return;
  const mappedKeys = typeConstituents(constraint);
  for (const key of mappedKeys.length === 0 ? [constraint] : mappedKeys) callback(key);
  const data = constraint.data as { readonly indexInfos?: readonly { readonly keyType: Type }[] } | undefined;
  for (const info of data?.indexInfos ?? []) callback(info.keyType);
  if (mappedKeys.length === 0 && (constraint.flags & TypeFlags.Object) !== 0) {
    for (const property of (constraint.data as ObjectType | undefined)?.declaredProperties ?? []) {
      callback(stringLiteralType(symbolName(property)));
    }
  }
  void host;
}

export function instantiateReverseMappedType(host: TypeNodeResolutionHost, source: Type, mappedType: Type, constraintType: Type): Type {
  void host;
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(source.symbol === undefined ? {} : { symbol: source.symbol }),
    data: {
      objectFlags: ObjectFlags.ReverseMapped,
      source,
      mappedType: mappedType.data as MappedType,
      constraintType,
      declaredProperties: (source.data as ObjectType | undefined)?.declaredProperties ?? [],
    },
  };
}

export function instantiateTypeAlias(host: TypeNodeResolutionHost, symbol: AstSymbol, typeArguments: readonly Type[]): Type {
  const declared = host.getDeclaredTypeOfSymbol(symbol) ?? host.unknownType;
  const typeParameters = ((declared.data as { readonly typeParameters?: readonly Type[] } | undefined)?.typeParameters ?? []) as readonly Type[];
  const mapper = newTypeMapper(typeParameters, typeArguments);
  return instantiateTypeWorker(host, declared, mapper);
}

export function instantiateTypes(host: TypeNodeResolutionHost, types: readonly Type[], mapper: TypeMapper | undefined): readonly Type[] {
  return mapper === undefined ? types : types.map(type => instantiateTypeWorker(host, type, mapper));
}

export function tryGetTypeFromTypeNode(host: TypeNodeResolutionHost, node: AstNode | undefined): Type | undefined {
  try {
    return node === undefined ? undefined : getTypeFromTypeNodeWorker(host, node);
  } catch {
    return undefined;
  }
}

export function getTypeFromTypeNodeWorker(host: TypeNodeResolutionHost, node: AstNode): Type {
  switch (node.kind) {
    case Kind.AnyKeyword:
      return host.anyType;
    case Kind.UnknownKeyword:
      return host.unknownType;
    case Kind.StringKeyword:
      return host.stringType;
    case Kind.NumberKeyword:
      return host.numberType;
    case Kind.BooleanKeyword:
      return host.booleanType;
    case Kind.BigIntKeyword:
      return host.bigintType;
    case Kind.VoidKeyword:
      return host.voidType;
    case Kind.UndefinedKeyword:
      return host.undefinedType;
    case Kind.NullKeyword:
      return host.nullType;
    case Kind.ThisType:
      return getTypeFromThisTypeNode(host, node);
    case Kind.LiteralType:
      return getTypeFromLiteralTypeNode(host, node);
    case Kind.TypeLiteral:
    case Kind.FunctionType:
    case Kind.ConstructorType:
      return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(host, node);
    case Kind.IndexedAccessType:
      return getTypeFromIndexedAccessTypeNode(host, node);
    case Kind.TypeOperator:
      return getTypeFromTypeOperatorNode(host, node);
    case Kind.TypeReference:
      return getTypeFromTypeReference(host, node);
    default:
      return host.getTypeFromTypeNode(node) ?? host.unknownType;
  }
}

export function getTypeFromThisTypeNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  return getThisType(host, node) ?? host.unknownType;
}

export function getThisType(host: TypeNodeResolutionHost, node: AstNode | undefined): Type | undefined {
  for (let current = node; current !== undefined; current = parentOf(current)) {
    const symbol = nodeSymbol(current);
    const type = symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol(symbol);
    const thisType = (type?.data as { readonly thisType?: TypeParameter } | undefined)?.thisType;
    if (thisType !== undefined) return typeParameterAsType(thisType);
  }
  return undefined;
}

export function getTypeFromLiteralTypeNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  const literal = (node as { readonly literal?: AstNode }).literal ?? (node as { readonly expression?: AstNode }).expression;
  if (literal === undefined) return host.unknownType;
  if (literal.kind === Kind.StringLiteral || literal.kind === Kind.NoSubstitutionTemplateLiteral) return stringLiteralType(nodeText(literal));
  if (literal.kind === Kind.NumericLiteral) return numberLiteralType(Number(nodeText(literal)));
  if (literal.kind === Kind.TrueKeyword) return booleanLiteralType(true);
  if (literal.kind === Kind.FalseKeyword) return booleanLiteralType(false);
  return host.unknownType;
}

export function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  const properties = membersOfNode(node).map(member => createPropertySymbol(nodeText(declarationName(member)), host.getTypeFromTypeNode(typeNodeOf(member)) ?? host.unknownType));
  const callSignatures = node.kind === Kind.FunctionType ? [signatureFromTypeNode(host, node)] : [];
  const constructSignatures = node.kind === Kind.ConstructorType ? [signatureFromTypeNode(host, node)] : [];
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredProperties: properties,
      declaredCallSignatures: callSignatures,
      declaredConstructSignatures: constructSignatures,
    },
  };
}

export function getTypeFromIndexedAccessTypeNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  const objectType = host.getTypeFromTypeNode((node as { readonly objectType?: AstNode }).objectType) ?? host.unknownType;
  const indexType = host.getTypeFromTypeNode((node as { readonly indexType?: AstNode }).indexType) ?? host.unknownType;
  const propertyName = literalValue(indexType);
  if (typeof propertyName === "string") {
    const property = (objectType.data as ObjectType | undefined)?.declaredProperties?.find(symbol => symbolName(symbol) === propertyName);
    return getTypeOfSymbol(property) ?? host.unknownType;
  }
  return {
    flags: TypeFlags.IndexedAccess,
    id: nextSyntheticTypeId(),
    data: { objectType, indexType, accessFlags: 0 },
  };
}

export function getTypeFromTypeOperatorNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  const operator = nodeText((node as { readonly operator?: AstNode }).operator);
  const operand = host.getTypeFromTypeNode(typeNodeOf(node)) ?? host.unknownType;
  if (operator === "keyof") return getKeyOfType(operand);
  if (operator === "readonly") return readonlyType(operand);
  if (operator === "unique") return getESSymbolLikeTypeForNode(host, node);
  return operand;
}

export function getESSymbolLikeTypeForNode(host: TypeNodeResolutionHost, node: AstNode): Type {
  const symbol = host.getSymbolAtLocation(node);
  return symbol === undefined
    ? host.symbolType
    : { flags: TypeFlags.UniqueESSymbol, id: nextSyntheticTypeId(), symbol, data: { escapedName: symbolName(symbol) } };
}

export function getTypeFromTypeReference(host: TypeNodeResolutionHost, node: AstNode): Type {
  const symbol = getSymbolFromTypeReference(host, node);
  if (symbol === undefined) return host.unknownType;
  const target = host.getDeclaredTypeOfSymbol(symbol) ?? host.unknownType;
  const typeArguments = getTypeArgumentsFromNode(host, node);
  return typeArguments.length === 0 ? target : createNormalizedTypeReference(host, target, typeArguments);
}

export function getIntendedTypeFromJSDocTypeReference(host: TypeNodeResolutionHost, node: AstNode): Type | undefined {
  return getTypeFromTypeReference(host, node);
}

export function getSymbolFromTypeReference(host: TypeNodeResolutionHost, node: AstNode): AstSymbol | undefined {
  return resolveTypeReferenceName(host, typeNameNode(node));
}

export function resolveTypeReferenceName(host: TypeNodeResolutionHost, name: AstNode | undefined): AstSymbol | undefined {
  return host.getSymbolAtLocation(name) ?? getUnresolvedSymbolForEntityName(name);
}

export function getUnresolvedSymbolForEntityName(name: AstNode | undefined): AstSymbol | undefined {
  const text = entityNameText(name);
  return text.length === 0 ? undefined : { name: text, escapedName: text, flags: SymbolFlags.Type, declarations: [] };
}

export function getSymbolPath(symbol: AstSymbol | undefined): readonly string[] {
  const path: string[] = [];
  for (let current = symbol; current !== undefined; current = (current as { readonly parent?: AstSymbol }).parent) {
    path.push(symbolName(current));
  }
  return path.reverse();
}

export function getTypeReferenceType(host: TypeNodeResolutionHost, symbol: AstSymbol, typeArguments: readonly Type[]): Type {
  const target = host.getDeclaredTypeOfSymbol(symbol) ?? host.unknownType;
  return createNormalizedTypeReference(host, target, typeArguments);
}

export function getTypeFromClassOrInterfaceReference(host: TypeNodeResolutionHost, node: AstNode, symbol: AstSymbol): Type {
  return getTypeReferenceType(host, symbol, getTypeArgumentsFromNode(host, node));
}

export function getTypeArgumentsFromNode(host: TypeNodeResolutionHost, node: AstNode | undefined): readonly Type[] {
  return nodeArray((node as { readonly typeArguments?: unknown } | undefined)?.typeArguments)
    .map(typeNode => host.getTypeFromTypeNode(typeNode) ?? host.unknownType);
}

export function checkNoTypeArguments(host: Pick<TypeNodeResolutionHost, "report">, node: AstNode | undefined): boolean {
  const hasArguments = nodeArray((node as { readonly typeArguments?: unknown } | undefined)?.typeArguments).length !== 0;
  if (hasArguments) host.report(node, "Type arguments are not permitted here.");
  return !hasArguments;
}

export function isDeferredTypeReferenceNode(node: AstNode | undefined): boolean {
  return node?.kind === Kind.TypeReference && ((node as { readonly deferred?: boolean }).deferred === true || entityNameText(typeNameNode(node)).length === 0);
}

export function isResolvedByTypeAlias(symbol: AstSymbol | undefined): boolean {
  return symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.TypeAlias) !== 0;
}

export function mayResolveTypeAlias(symbol: AstSymbol | undefined): boolean {
  return isResolvedByTypeAlias(symbol) || (symbol?.declarations ?? []).some(declaration => declaration.kind === Kind.TypeAliasDeclaration);
}

export function createNormalizedTypeReference(host: TypeNodeResolutionHost, target: Type, typeArguments: readonly Type[]): Type {
  const normalized = normalize(host, target, typeArguments);
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(target.symbol === undefined ? {} : { symbol: target.symbol }),
    data: {
      objectFlags: ObjectFlags.Reference,
      target: normalized.target.data as ObjectType,
      resolvedTypeArguments: normalized.typeArguments,
    },
  };
}

export function createNormalizedTupleTypeEx(host: TypeNodeResolutionHost, elements: readonly Type[], readonlyTuple: boolean): Type {
  return createNormalizedTupleType(host, elements, elements.map(() => 1), readonlyTuple);
}

export function createNormalizedTupleType(host: TypeNodeResolutionHost, elements: readonly Type[], elementFlags: readonly number[], readonlyTuple: boolean): Type {
  void host;
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    symbol: { name: readonlyTuple ? "readonly tuple" : "tuple", escapedName: readonlyTuple ? "readonly tuple" : "tuple", flags: SymbolFlags.Type, declarations: [] },
    data: {
      objectFlags: ObjectFlags.Tuple | ObjectFlags.Reference,
      resolvedTypeArguments: elements,
      readonly: readonlyTuple,
      fixedLength: getTotalFixedElementCount(elementFlags),
      minLength: getStartElementCount(elementFlags),
      hasRestElement: elementFlags.some(flag => (flag & elementFlagRest) !== 0),
      combinedFlags: elementFlags.reduce((left, right) => left | right, 0),
      elementInfo: elementFlags.map(flags => ({ flags })),
    },
  };
}

export function normalize(host: TypeNodeResolutionHost, target: Type, typeArguments: readonly Type[]): { readonly target: Type; readonly typeArguments: readonly Type[] } {
  const arity = getTypeReferenceArity(target);
  if (arity === 0) return { target, typeArguments: [] };
  if (typeArguments.length === arity) return { target, typeArguments };
  const padded = [...typeArguments];
  while (padded.length < arity) padded.push(host.unknownType);
  return { target, typeArguments: padded.slice(0, arity) };
}

export function getStartElementCount(elementFlags: readonly number[]): number {
  let count = 0;
  for (const flags of elementFlags) {
    if ((flags & elementFlagRest) !== 0) break;
    count += 1;
  }
  return count;
}

export function getEndElementCount(elementFlags: readonly number[]): number {
  let count = 0;
  for (let index = elementFlags.length - 1; index >= 0; index--) {
    if (((elementFlags[index] ?? 0) & elementFlagRest) !== 0) break;
    count += 1;
  }
  return count;
}

export function getTotalFixedElementCount(elementFlags: readonly number[]): number {
  return elementFlags.filter(flags => (flags & elementFlagRest) === 0).length;
}

export function getElementTypes(type: Type): readonly Type[] {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? [];
}

export function getTypeReferenceArity(type: Type): number {
  return ((type.data as { readonly typeParameters?: readonly unknown[] } | undefined)?.typeParameters
    ?? (type.data as ObjectType | undefined)?.resolvedTypeArguments
    ?? []).length;
}

function typeParameterAsType(typeParameter: TypeParameter): Type {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  return { flags: TypeFlags.TypeParameter, id: nextSyntheticTypeId(), ...(symbol === undefined ? {} : { symbol }), data: typeParameter };
}

function signatureFromTypeNode(host: TypeNodeResolutionHost, node: AstNode): import("./types.js").Signature {
  return {
    flags: 0,
    declaration: node,
    parameters: nodeArray((node as { readonly parameters?: unknown }).parameters).map(parameter =>
      createPropertySymbol(nodeText(declarationName(parameter)), host.getTypeFromTypeNode(typeNodeOf(parameter)) ?? host.unknownType),
    ),
    resolvedReturnType: host.getTypeFromTypeNode(typeNodeOf(node)) ?? host.voidType,
    minArgumentCount: 0,
  };
}

function createPropertySymbol(name: string, type: Type): AstSymbol {
  return { name, escapedName: name, flags: SymbolFlags.Property, declarations: [], synthetic: true, syntheticType: type } as AstSymbol;
}

function getKeyOfType(type: Type): Type {
  const names = ((type.data as ObjectType | undefined)?.declaredProperties ?? []).map(property => stringLiteralType(symbolName(property)));
  return unionType(names);
}

function readonlyType(type: Type): Type {
  return { ...type, data: { ...(type.data as object), readonly: true } };
}

function membersOfNode(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly members?: unknown; readonly properties?: unknown }).members ?? (node as { readonly properties?: unknown }).properties);
}

function typeNameNode(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly typeName?: AstNode; readonly name?: AstNode } | undefined)?.typeName
    ?? (node as { readonly name?: AstNode } | undefined)?.name;
}

function declarationName(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly name?: AstNode } | undefined)?.name ?? node;
}

function typeNodeOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type;
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
  if (node === undefined) return "";
  const text = nodeText(node);
  if (text.length !== 0) return text;
  const left = entityNameText((node as { readonly left?: AstNode; readonly expression?: AstNode }).left ?? (node as { readonly expression?: AstNode }).expression);
  const right = entityNameText((node as { readonly right?: AstNode; readonly name?: AstNode }).right ?? (node as { readonly name?: AstNode }).name);
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function elementTypeOfArrayLike(type: Type): Type | undefined {
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function stringLiteralType(value: string): Type {
  return { flags: TypeFlags.StringLiteral, id: nextSyntheticTypeId(), data: { value } };
}

function numberLiteralType(value: number): Type {
  return { flags: TypeFlags.NumberLiteral, id: nextSyntheticTypeId(), data: { value } };
}

function booleanLiteralType(value: boolean): Type {
  return { flags: TypeFlags.BooleanLiteral, id: nextSyntheticTypeId(), data: { value } };
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 0
    ? { flags: TypeFlags.Never, id: nextSyntheticTypeId(), data: { intrinsicName: "never", objectFlags: ObjectFlags.None } }
    : unique.length === 1
      ? unique[0]!
      : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

const elementFlagRest = 1 << 2;
let syntheticTypeId = -1_650_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
