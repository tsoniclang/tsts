/**
 * Node-builder serialization helpers.
 *
 * Conceptual split from TS-Go `nodebuilderimpl.go` sections that convert
 * checker symbols, signatures, type predicates, index infos, and object
 * types back into AST nodes.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, Type, TypeParameter, TypePredicate } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import type { NodeBuilderImplContext } from "./nodeBuilderImpl.js";
import { NodeBuilderFlags } from "./nodeBuilder.js";

export interface NodeBuilderExtraHost {
  readonly currentFile?: AstNode;
  readonly moduleSpecifierResolver?: (symbol: AstSymbol, mode?: string) => string | undefined;
  readonly typeToTypeNode?: (type: Type) => AstNode;
  readonly symbolToTypeNode?: (symbol: AstSymbol) => AstNode;
  readonly typeParameterToDeclaration?: (type: TypeParameter) => AstNode;
  readonly signatureToDeclaration?: (signature: Signature, kind: Kind) => AstNode;
  readonly tracker?: { trackSymbol?(symbol: AstSymbol, node?: AstNode): void };
}

export function setCommentRange(node: AstNode, range: AstNode | undefined): AstNode {
  if (range === undefined) return node;
  return { ...(node as object), pos: (range as { readonly pos?: number }).pos, end: (range as { readonly end?: number }).end } as AstNode;
}

export function lookupSymbolChainWorker(symbol: AstSymbol, meaning: SymbolFlags, result: AstSymbol[] = []): readonly AstSymbol[] {
  void meaning;
  if (symbol.parent !== undefined) lookupSymbolChainWorker(symbol.parent, meaning, result);
  result.push(symbol);
  return result;
}

export function getSymbolChain(symbol: AstSymbol, meaning: SymbolFlags): readonly AstSymbol[] {
  return lookupSymbolChainWorker(symbol, meaning);
}

export function sortByBestName(symbols: readonly AstSymbol[]): readonly AstSymbol[] {
  return [...symbols].sort((left, right) => displayName(left).localeCompare(displayName(right)) || declarationDepth(left) - declarationDepth(right));
}

export function canHaveModuleSpecifier(symbol: AstSymbol): boolean {
  return symbol.declarations.some(declaration => declaration.kind === Kind.ImportDeclaration || declaration.kind === Kind.ExportDeclaration || declaration.kind === Kind.SourceFile);
}

export function tryGetModuleSpecifierFromDeclaration(declaration: AstNode | undefined): string | undefined {
  return tryGetModuleSpecifierFromDeclarationWorker(declaration);
}

export function tryGetModuleSpecifierFromDeclarationWorker(declaration: AstNode | undefined): string | undefined {
  const moduleSpecifier = (declaration as { readonly moduleSpecifier?: AstNode; readonly fileName?: string } | undefined)?.moduleSpecifier;
  return literalText(moduleSpecifier) ?? (declaration as { readonly moduleSpecifier?: AstNode; readonly fileName?: string } | undefined)?.fileName;
}

export function getSpecifierForModuleSymbol(host: NodeBuilderExtraHost, symbol: AstSymbol, mode?: string): string {
  return host.moduleSpecifierResolver?.(symbol, mode)
    ?? symbol.declarations.map(tryGetModuleSpecifierFromDeclaration).find(isString)
    ?? displayName(symbol);
}

export function typeParameterToDeclarationWithConstraint(host: NodeBuilderExtraHost, typeParameter: TypeParameter, constraint?: Type): AstNode {
  const existing = host.typeParameterToDeclaration?.(typeParameter);
  if (existing !== undefined && constraint === undefined) return existing;
  return {
    kind: Kind.TypeParameter,
    name: typeParameterToName(typeParameter),
    ...(constraint === undefined ? {} : { constraint: typeNode(host, constraint) }),
  } as unknown as AstNode;
}

export function setTextRange<T extends AstNode>(node: T, range: AstNode | undefined): T {
  return setCommentRange(node, range) as T;
}

export function typeParameterShadowsOtherTypeParameterInScope(typeParameter: TypeParameter, scope: readonly TypeParameter[]): boolean {
  const name = nodeText(typeParameterToName(typeParameter));
  return scope.some(other => other !== typeParameter && nodeText(typeParameterToName(other)) === name);
}

export function typeParameterToName(typeParameter: TypeParameter): AstNode {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  return identifier(displayName(symbol) || "T");
}

export function isMappedTypeHomomorphic(type: Type): boolean {
  return (objectFlags(type) & ObjectFlags.Mapped) !== 0 && (type.data as { readonly nameType?: Type } | undefined)?.nameType === undefined;
}

export function isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type: Type): boolean {
  return isMappedTypeHomomorphic(type) && (objectFlags(type) & ObjectFlags.InstantiatedMapped) !== 0
    && (type.data as { readonly nameType?: Type } | undefined)?.nameType !== undefined;
}

export function createMappedTypeNodeFromType(host: NodeBuilderExtraHost, type: Type): AstNode {
  const declaration = (type.data as { readonly declaration?: AstNode } | undefined)?.declaration;
  if (declaration !== undefined) return declaration;
  const typeParameter = (type.data as { readonly typeParameter?: TypeParameter } | undefined)?.typeParameter;
  return {
    kind: Kind.MappedType,
    typeParameter: typeParameter === undefined ? typeParameterToName({} as TypeParameter) : typeParameterToDeclarationWithConstraint(host, typeParameter),
    type: typeNode(host, (type.data as { readonly templateType?: Type } | undefined)?.templateType ?? unknownType()),
  } as unknown as AstNode;
}

export function typeToTypeNodeHelperWithPossibleReusableTypeNode(host: NodeBuilderExtraHost, type: Type, reusable?: AstNode): AstNode {
  return reusable ?? typeNode(host, type);
}

export function typeParametersToTypeParameterDeclarations(host: NodeBuilderExtraHost, typeParameters: readonly TypeParameter[] | undefined): readonly AstNode[] {
  return (typeParameters ?? []).map(typeParameter => typeParameterToDeclarationWithConstraint(host, typeParameter));
}

export function getEffectiveParameterDeclaration(parameter: AstSymbol): AstNode | undefined {
  return parameter.valueDeclaration ?? parameter.declarations[0];
}

export function parameterToParameterDeclarationName(parameter: AstSymbol): AstNode {
  return cloneBindingName((getEffectiveParameterDeclaration(parameter) as { readonly name?: AstNode } | undefined)?.name ?? identifier(displayName(parameter)));
}

export function cloneBindingName(name: AstNode): AstNode {
  const children = nodeArray((name as { readonly elements?: unknown }).elements).map(cloneBindingName);
  return {
    ...(name as object),
    ...(children.length === 0 ? {} : { elements: createNodeArray(children) }),
  } as AstNode;
}

export function serializeInferredReturnTypeForSignature(host: NodeBuilderExtraHost, signature: Signature): AstNode {
  return typeNode(host, signature.resolvedReturnType ?? unknownType());
}

export function typePredicateToTypePredicateNodeHelper(host: NodeBuilderExtraHost, predicate: TypePredicate | undefined): AstNode | undefined {
  if (predicate === undefined) return undefined;
  return {
    kind: Kind.TypePredicate,
    parameterName: identifier(predicate.parameterName),
    type: predicate.type === undefined ? undefined : typeNode(host, predicate.type),
  } as unknown as AstNode;
}

export function signatureToSignatureDeclarationHelper(host: NodeBuilderExtraHost, signature: Signature, kind: Kind): AstNode {
  const existing = host.signatureToDeclaration?.(signature, kind);
  if (existing !== undefined) return existing;
  return {
    kind,
    parameters: createNodeArray(signature.parameters.map(parameter => parameterToParameterDeclaration(parameter))),
    type: signature.resolvedReturnType === undefined ? undefined : typeNode(host, signature.resolvedReturnType),
    typeParameters: createNodeArray(typeParametersToTypeParameterDeclarations(host, signature.typeParameters)),
  } as unknown as AstNode;
}

export function tryGetThisParameterDeclaration(host: NodeBuilderExtraHost, signature: Signature): AstNode | undefined {
  const thisParameter = signature.thisParameter;
  return thisParameter === undefined ? undefined : parameterToParameterDeclaration(thisParameter, host);
}

export function indexInfoToIndexSignatureDeclarationHelper(host: NodeBuilderExtraHost, info: IndexInfo): AstNode {
  return {
    kind: Kind.IndexSignature,
    parameters: createNodeArray([parameterNode("key", info.keyType, host)]),
    type: typeNode(host, info.valueType),
    ...(info.declaration === undefined ? {} : { original: info.declaration }),
  } as unknown as AstNode;
}

export function shouldUsePlaceholderForProperty(symbol: AstSymbol): boolean {
  return displayName(symbol).length === 0 || displayName(symbol).startsWith("__missing") || symbol.valueDeclaration?.kind === Kind.MissingDeclaration;
}

export function trackComputedName(host: NodeBuilderExtraHost, symbol: AstSymbol, node?: AstNode): void {
  if (isComputedName(node ?? symbol.valueDeclaration)) host.tracker?.trackSymbol?.(symbol, node);
}

export function createPropertyNameNodeForIdentifierOrLiteral(name: string | number): AstNode {
  return typeof name === "number" || isNumericName(String(name)) ? numericLiteral(String(name)) : identifier(String(name));
}

export function isStringNamed(symbol: AstSymbol): boolean {
  return typeof displayName(symbol) === "string" && displayName(symbol).length !== 0;
}

export function isSingleQuotedStringNamed(symbol: AstSymbol): boolean {
  const declaration = symbol.valueDeclaration;
  const text = literalText((declaration as { readonly name?: AstNode } | undefined)?.name);
  return text !== undefined && text.includes("'") && !text.includes("\"");
}

export function getPropertyNameNodeForSymbol(host: NodeBuilderExtraHost, symbol: AstSymbol): AstNode {
  const nameType = (symbol as { readonly nameType?: Type }).nameType;
  return getPropertyNameNodeForSymbolFromNameType(host, symbol, nameType);
}

export function getPropertyNameNodeForSymbolFromNameType(host: NodeBuilderExtraHost, symbol: AstSymbol, nameType: Type | undefined): AstNode {
  if (nameType !== undefined) return trackablePropertyName(host, nameType);
  const declarationName = (symbol.valueDeclaration as { readonly name?: AstNode } | undefined)?.name;
  return declarationName === undefined ? createPropertyNameNodeForIdentifierOrLiteral(displayName(symbol)) : cloneBindingName(declarationName);
}

export function addPropertyToElementList(elements: AstNode[], property: AstSymbol, type: Type, host: NodeBuilderExtraHost): AstNode[] {
  if (shouldUsePlaceholderForProperty(property)) return elements;
  elements.push({
    kind: Kind.PropertySignature,
    name: getPropertyNameNodeForSymbol(host, property),
    type: typeNode(host, type),
  } as unknown as AstNode);
  return elements;
}

export function createTypeNodesFromResolvedType(host: NodeBuilderExtraHost, type: Type): readonly AstNode[] {
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return constituentTypes(type).map(part => typeNode(host, part));
  return [typeNode(host, type)];
}

export function createTypeNodeFromObjectType(host: NodeBuilderExtraHost, type: Type): AstNode {
  const data = type.data as ObjectType | undefined;
  const members: AstNode[] = [];
  for (const property of data?.declaredProperties ?? []) {
    addPropertyToElementList(members, property, getTypeOfSymbol(property) ?? unknownType(), host);
  }
  for (const info of data?.indexInfos ?? []) members.push(indexInfoToIndexSignatureDeclarationHelper(host, info));
  return { kind: Kind.TypeLiteral, members: createNodeArray(members) } as unknown as AstNode;
}

export function getTypeAliasForTypeLiteral(type: Type): AstSymbol | undefined {
  return type.aliasSymbol ?? ((type.data as { readonly aliasSymbol?: AstSymbol } | undefined)?.aliasSymbol);
}

export function shouldWriteTypeOfFunctionSymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & (SymbolFlags.Function | SymbolFlags.Method)) !== 0
    && ((symbol.flags ?? 0) & SymbolFlags.Type) === 0;
}

export function createAnonymousTypeNode(host: NodeBuilderExtraHost, type: Type): AstNode {
  return createAnonymousTypeNodeEx(host, type, false);
}

export function createAnonymousTypeNodeEx(host: NodeBuilderExtraHost, type: Type, includeConstructSignatures: boolean): AstNode {
  const data = type.data as ObjectType | undefined;
  const members = [...(data?.declaredProperties ?? []).map(property => ({
    kind: Kind.PropertySignature,
    name: getPropertyNameNodeForSymbol(host, property),
    type: typeNode(host, getTypeOfSymbol(property) ?? unknownType()),
  } as unknown as AstNode))];
  if (includeConstructSignatures) {
    members.push(...(data?.declaredConstructSignatures ?? []).map(signature => signatureToSignatureDeclarationHelper(host, signature, Kind.ConstructSignature)));
  }
  members.push(...(data?.declaredCallSignatures ?? []).map(signature => signatureToSignatureDeclarationHelper(host, signature, Kind.CallSignature)));
  return { kind: Kind.TypeLiteral, members: createNodeArray(members) } as unknown as AstNode;
}

export function typeToTypeNodeOrCircularityElision(host: NodeBuilderExtraHost, type: Type, seen: Set<number> = new Set()): AstNode {
  if (seen.has(type.id)) return typeReferenceNode("...");
  seen.add(type.id);
  return typeNode(host, type);
}

export function conditionalTypeToTypeNode(host: NodeBuilderExtraHost, type: Type): AstNode {
  const data = type.data as { readonly checkType?: Type; readonly extendsType?: Type; readonly trueType?: Type; readonly falseType?: Type } | undefined;
  return {
    kind: Kind.ConditionalType,
    checkType: typeNode(host, data?.checkType ?? unknownType()),
    extendsType: typeNode(host, data?.extendsType ?? unknownType()),
    trueType: typeNode(host, data?.trueType ?? unknownType()),
    falseType: typeNode(host, data?.falseType ?? neverType()),
  } as unknown as AstNode;
}

export function getParentSymbolOfTypeParameter(typeParameter: TypeParameter): AstSymbol | undefined {
  return (typeParameter as { readonly symbol?: AstSymbol }).symbol?.parent;
}

export function typeReferenceToTypeNode(host: NodeBuilderExtraHost, type: Type): AstNode {
  const args = (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? [];
  return typeReferenceNode(displayName(type.symbol) || "Anonymous", args.map(arg => typeNode(host, arg)));
}

export function visitAndTransformType(node: AstNode, visitor: (node: AstNode) => AstNode): AstNode {
  const visited = visitor(node);
  const children = nodeArray((visited as { readonly children?: unknown }).children);
  return children.length === 0 ? visited : { ...(visited as object), children: createNodeArray(children.map(child => visitAndTransformType(child, visitor))) } as unknown as AstNode;
}

export function newStringLiteral(text: string): AstNode {
  return newStringLiteralEx(text, false);
}

export function newStringLiteralEx(text: string, singleQuote: boolean): AstNode {
  return { kind: Kind.StringLiteral, text, singleQuote } as unknown as AstNode;
}

export function toTypeReferenceNode(node: AstNode): AstNode {
  if (node.kind === Kind.TypeReference) return node;
  return typeReferenceNode(nodeText(node));
}

export function createExpressionWithTypeArguments(expression: AstNode, typeArguments: readonly AstNode[] | undefined): AstNode {
  return {
    kind: Kind.ExpressionWithTypeArguments,
    expression,
    typeArguments: typeArguments === undefined ? undefined : createNodeArray(typeArguments),
  } as unknown as AstNode;
}

export function lookupInstantiatedTypeArgumentNodes(host: NodeBuilderExtraHost, type: Type): readonly AstNode[] {
  return ((type.data as ObjectType | undefined)?.resolvedTypeArguments ?? []).map(arg => typeNode(host, arg));
}

export function shouldWriteTypeParametersInQualifiedName(context: Pick<NodeBuilderImplContext, "flags">, symbol: AstSymbol): boolean {
  return (context.flags & NodeBuilderFlags.WriteTypeArgumentsOfSignature) !== 0
    || ((symbol.flags ?? 0) & SymbolFlags.TypeParameter) !== 0;
}

function typeNode(host: NodeBuilderExtraHost, type: Type): AstNode {
  const delegated = host.typeToTypeNode?.(type);
  if (delegated !== undefined) return delegated;
  if ((type.flags & TypeFlags.String) !== 0) return keywordTypeNode(Kind.StringKeyword);
  if ((type.flags & TypeFlags.Number) !== 0) return keywordTypeNode(Kind.NumberKeyword);
  if ((type.flags & TypeFlags.Boolean) !== 0) return keywordTypeNode(Kind.BooleanKeyword);
  if ((type.flags & TypeFlags.Void) !== 0) return keywordTypeNode(Kind.VoidKeyword);
  if ((type.flags & TypeFlags.Unknown) !== 0) return keywordTypeNode(Kind.UnknownKeyword);
  if ((type.flags & TypeFlags.Any) !== 0) return keywordTypeNode(Kind.AnyKeyword);
  if ((type.flags & TypeFlags.Never) !== 0) return keywordTypeNode(Kind.NeverKeyword);
  if ((type.flags & TypeFlags.StringLiteral) !== 0 || (type.flags & TypeFlags.NumberLiteral) !== 0) return { kind: Kind.LiteralType, literal: literalNode(type) } as unknown as AstNode;
  if ((type.flags & TypeFlags.Union) !== 0) return { kind: Kind.UnionType, types: createNodeArray(constituentTypes(type).map(part => typeNode(host, part))) } as unknown as AstNode;
  if ((type.flags & TypeFlags.Intersection) !== 0) return { kind: Kind.IntersectionType, types: createNodeArray(constituentTypes(type).map(part => typeNode(host, part))) } as unknown as AstNode;
  if ((type.flags & TypeFlags.Conditional) !== 0) return conditionalTypeToTypeNode(host, type);
  if ((type.flags & TypeFlags.Object) !== 0 && (objectFlags(type) & ObjectFlags.Reference) !== 0) return typeReferenceToTypeNode(host, type);
  if ((type.flags & TypeFlags.Object) !== 0) return createTypeNodeFromObjectType(host, type);
  return typeReferenceNode(displayName(type.symbol) || `Type${type.id}`);
}

function parameterToParameterDeclaration(parameter: AstSymbol, host?: NodeBuilderExtraHost): AstNode {
  return {
    kind: Kind.Parameter,
    name: parameterToParameterDeclarationName(parameter),
    type: host === undefined ? undefined : typeNode(host, getTypeOfSymbol(parameter) ?? unknownType()),
  } as unknown as AstNode;
}

function parameterNode(name: string, type: Type, host: NodeBuilderExtraHost): AstNode {
  return { kind: Kind.Parameter, name: identifier(name), type: typeNode(host, type) } as unknown as AstNode;
}

function trackablePropertyName(host: NodeBuilderExtraHost, type: Type): AstNode {
  if ((type.flags & TypeFlags.StringLiteral) !== 0 || (type.flags & TypeFlags.NumberLiteral) !== 0) return createPropertyNameNodeForIdentifierOrLiteral(String(literalValue(type)));
  if (type.symbol !== undefined) {
    host.tracker?.trackSymbol?.(type.symbol);
    return identifier(displayName(type.symbol));
  }
  return identifier("__computed");
}

function keywordTypeNode(kind: Kind): AstNode {
  return { kind } as AstNode;
}

function typeReferenceNode(name: string, typeArguments: readonly AstNode[] = []): AstNode {
  return {
    kind: Kind.TypeReference,
    typeName: identifier(name),
    ...(typeArguments.length === 0 ? {} : { typeArguments: createNodeArray(typeArguments) }),
  } as unknown as AstNode;
}

function identifier(text: string): AstNode {
  return { kind: Kind.Identifier, text } as unknown as AstNode;
}

function numericLiteral(text: string): AstNode {
  return { kind: Kind.NumericLiteral, text } as unknown as AstNode;
}

function literalNode(type: Type): AstNode {
  const value = literalValue(type);
  return typeof value === "number" ? numericLiteral(String(value)) : newStringLiteral(String(value));
}

function createNodeArray(nodes: readonly AstNode[]): AstNode {
  return { kind: Kind.SyntaxList, nodes } as unknown as AstNode;
}

function unknownType(): Type {
  return { flags: TypeFlags.Unknown, id: -3_500_001, data: { intrinsicName: "unknown", objectFlags: ObjectFlags.None } };
}

function neverType(): Type {
  return { flags: TypeFlags.Never, id: -3_500_002, data: { intrinsicName: "never", objectFlags: ObjectFlags.None } };
}

function objectFlags(type: Type): ObjectFlags {
  return (type.data as ObjectType | undefined)?.objectFlags ?? ObjectFlags.None;
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function isComputedName(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ComputedPropertyName || (node as { readonly name?: AstNode } | undefined)?.name?.kind === Kind.ComputedPropertyName;
}

function literalText(node: AstNode | undefined): string | undefined {
  return (node as { readonly text?: string } | undefined)?.text;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? displayName((node as { readonly symbol?: AstSymbol } | undefined)?.symbol);
}

function displayName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function declarationDepth(symbol: AstSymbol): number {
  let depth = 0;
  for (let current = symbol.parent; current !== undefined; current = current.parent) depth += 1;
  return depth;
}

function isNumericName(name: string): boolean {
  return name.length !== 0 && Number.isInteger(Number(name));
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function isString(value: string | undefined): value is string {
  return value !== undefined && value.length !== 0;
}
