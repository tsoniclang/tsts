/**
 * Checker base-type and declared-member resolution.
 *
 * Conceptual split from TS-Go `internal/checker/checker.go` base-type
 * resolution and index-info construction.  These helpers keep the same
 * algorithm boundaries as upstream while using the local structural Type and
 * Symbol shapes.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import type { IndexInfo, InterfaceType, ObjectType, Signature, Type, TypeParameter } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getSignatureInstantiation, getSignaturesOfType } from "./checker.signatures.js";

export interface BaseTypeResolutionHost {
  readonly anyType: Type;
  readonly numberType: Type;
  readonly stringType: Type;
  readonly esSymbolType: Type;
  readonly undefinedType: Type;
  getTypeFromTypeNode(node: AstNode | undefined): Type;
  getBaseConstructorTypeOfClass(type: Type): Type;
  getApparentType(type: Type): Type;
  getReducedType(type: Type): Type;
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type;
  getBaseTypes(type: Type): readonly Type[];
  hasBaseType(type: Type, checkBase: Type): boolean;
  createArrayType(elementType: Type, readonlyArray: boolean): Type;
  createTypeReference(target: Type, typeArguments: readonly Type[]): Type;
  createUnionType(types: readonly Type[]): Type;
  createIntersectionType(types: readonly Type[]): Type;
  isTypeAssignableTo(source: Type, target: Type): boolean;
  report(node: AstNode | undefined, message: string): void;
}

export function getTupleBaseType(host: Pick<BaseTypeResolutionHost, "numberType" | "createArrayType" | "createUnionType">, type: Type): Type {
  const tuple = type.data as InterfaceType & { readonly elementInfo?: readonly { readonly flags?: number }[]; readonly readonly?: boolean } | undefined;
  const typeParameters = tuple?.typeParameters ?? [];
  const elementInfos = tuple?.elementInfo ?? [];
  const elementTypes = typeParameters.map((typeParameter, index) => {
    const typeParameterType = typeParameterAsType(typeParameter);
    const variadic = ((elementInfos[index]?.flags ?? 0) & elementFlagVariadic) !== 0;
    return variadic ? indexedAccessElement(typeParameterType, host.numberType) ?? typeParameterType : typeParameterType;
  });
  return host.createArrayType(host.createUnionType(elementTypes), tuple?.readonly === true);
}

export function resolveBaseTypesOfClass(host: BaseTypeResolutionHost, type: Type): void {
  const baseConstructorType = host.getApparentType(host.getBaseConstructorTypeOfClass(type));
  if ((baseConstructorType.flags & (TypeFlags.Object | TypeFlags.Intersection | TypeFlags.Any)) === 0) return;
  const baseTypeNode = getBaseTypeNodeOfClass(type);
  const originalBaseType = baseConstructorType.symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol(baseConstructorType.symbol);
  let baseType: Type | undefined;
  if (baseConstructorType.symbol !== undefined
    && ((baseConstructorType.symbol.flags ?? 0) & SymbolFlags.Class) !== 0
    && originalBaseType !== undefined
    && areAllOuterTypeParametersApplied(originalBaseType)) {
    baseType = host.getTypeFromTypeNode(baseTypeNode);
  } else if ((baseConstructorType.flags & TypeFlags.Any) !== 0) {
    baseType = baseConstructorType;
  } else {
    const constructors = getInstantiatedConstructorsForTypeArguments(host, baseConstructorType, typeArgumentNodesOf(baseTypeNode), baseTypeNode);
    if (constructors.length === 0) {
      host.report(expressionOf(baseTypeNode), "No base constructor has the specified number of type arguments.");
      return;
    }
    baseType = constructors[0]?.resolvedReturnType;
  }
  if (baseType === undefined || isErrorType(baseType)) return;
  const reducedBaseType = host.getReducedType(baseType);
  if (!isValidBaseType(host, reducedBaseType)) {
    host.report(expressionOf(baseTypeNode), `Base constructor return type ${typeName(reducedBaseType)} is not an object type or intersection of object types with statically known members.`);
    return;
  }
  if (type === reducedBaseType || host.hasBaseType(reducedBaseType, type)) {
    host.report(type.symbol?.valueDeclaration ?? type.symbol?.declarations?.[0], `Type ${typeName(type)} recursively references itself as a base type.`);
    return;
  }
  const data = interfaceData(type);
  if (data !== undefined) {
    data.resolvedBaseTypes = [reducedBaseType];
    data.baseTypesResolved = true;
  }
}

export function getBaseTypeNodeOfClass(type: Type): AstNode | undefined {
  const declarations = type.symbol?.declarations ?? [];
  for (const declaration of declarations) {
    if (isClassLikeDeclaration(declaration)) return extendsHeritageClauseElement(declaration);
  }
  return undefined;
}

export function getInstantiatedConstructorsForTypeArguments(
  host: Pick<BaseTypeResolutionHost, "getTypeFromTypeNode">,
  type: Type,
  typeArgumentNodes: readonly AstNode[],
  location: AstNode | undefined,
): readonly Signature[] {
  const signatures = getConstructorsForTypeArguments(type, typeArgumentNodes, location);
  const typeArguments = typeArgumentNodes.map((node) => host.getTypeFromTypeNode(node));
  return signatures.map((signature) =>
    (signature.typeParameters?.length ?? 0) === 0
      ? signature
      : getSignatureInstantiation(signature, typeArguments, isInJavaScriptFile(location), []),
  );
}

export function getConstructorsForTypeArguments(type: Type, typeArgumentNodes: readonly AstNode[], location: AstNode | undefined): readonly Signature[] {
  void location;
  const typeArgumentCount = typeArgumentNodes.length;
  return getSignaturesOfType(type, SignatureKind.Construct).filter((signature) => {
    const typeParameters = signature.typeParameters ?? [];
    const minimum = typeParameters.filter((parameter) => parameter.constraint === undefined).length;
    return typeArgumentCount >= minimum && typeArgumentCount <= typeParameters.length;
  });
}

export function resolveBaseTypesOfInterface(host: BaseTypeResolutionHost, type: Type): void {
  const data = interfaceData(type);
  if (data === undefined) return;
  const resolvedBaseTypes: Type[] = [];
  for (const declaration of type.symbol?.declarations ?? []) {
    if (!isInterfaceDeclaration(declaration)) continue;
    for (const heritage of heritageClauseElements(declaration)) {
      const baseType = host.getReducedType(host.getTypeFromTypeNode(heritage));
      if (isErrorType(baseType)) continue;
      if (isValidBaseType(host, baseType)) {
        if (type !== baseType && !host.hasBaseType(baseType, type)) {
          resolvedBaseTypes.push(baseType);
        } else {
          reportCircularBaseType(host, declaration, type);
        }
      } else {
        host.report(heritage, "An interface can only extend an object type or intersection of object types with statically known members.");
      }
    }
  }
  data.resolvedBaseTypes = resolvedBaseTypes;
  data.baseTypesResolved = true;
}

export function areAllOuterTypeParametersApplied(type: Type): boolean {
  const data = interfaceData(type);
  const outer = data?.outerTypeParameters ?? [];
  if (outer.length === 0) return true;
  const typeArguments = typeArgumentsOf(type);
  const last = outer.length - 1;
  return (outer[last] as { readonly symbol?: AstSymbol } | undefined)?.symbol !== typeArguments[last]?.symbol;
}

export function reportCircularBaseType(host: Pick<BaseTypeResolutionHost, "report">, node: AstNode | undefined, type: Type): void {
  host.report(node, `Type ${typeName(type)} recursively references itself as a base type.`);
}

export function isValidBaseType(host: Pick<BaseTypeResolutionHost, "getReducedType">, type: Type): boolean {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) {
    const constraint = (type.data as TypeParameter | undefined)?.constraint;
    if (constraint !== undefined) return isValidBaseType(host, constraint);
  }
  if ((type.flags & (TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.Any)) !== 0 && !isGenericMappedType(type)) return true;
  if ((type.flags & TypeFlags.Intersection) !== 0) return typeConstituents(type).every((part) => isValidBaseType(host, host.getReducedType(part)));
  return false;
}

export function getTargetType(type: Type): Type {
  const object = type.data as ObjectType | undefined;
  return ((object?.objectFlags ?? 0) & ObjectFlags.Reference) !== 0 && object?.target !== undefined
    ? object.target as unknown as Type
    : type;
}

export function getTypeWithThisArgument(
  host: Pick<BaseTypeResolutionHost, "createTypeReference" | "createIntersectionType" | "getApparentType">,
  type: Type,
  thisArgument: Type | undefined,
  needApparentType: boolean,
): Type {
  const object = type.data as ObjectType & InterfaceType | undefined;
  if (object !== undefined && (object.objectFlags & ObjectFlags.Reference) !== 0 && object.target !== undefined) {
    const target = object.target as unknown as Type;
    const targetData = target.data as InterfaceType | undefined;
    const typeArguments = typeArgumentsOf(type);
    if ((targetData?.typeParameters?.length ?? 0) === typeArguments.length) {
      const resolvedThis = thisArgument ?? typeParameterAsType(targetData?.thisType);
      return host.createTypeReference(target, [...typeArguments, resolvedThis]);
    }
    return type;
  }
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    const mapped = typeConstituents(type).map((part) => getTypeWithThisArgument(host, part, thisArgument, needApparentType));
    return sameTypes(mapped, typeConstituents(type)) ? type : host.createIntersectionType(mapped);
  }
  return needApparentType ? host.getApparentType(type) : type;
}

export function addInheritedMembers(symbols: SymbolTable | undefined, baseSymbols: readonly AstSymbol[]): SymbolTable {
  const result = symbols ?? new Map<string, AstSymbol>();
  for (const base of baseSymbols) {
    if (isStaticPrivateIdentifierProperty(base)) continue;
    const existing = result.get(symbolName(base));
    if (existing === undefined || ((existing.flags ?? 0) & SymbolFlags.Value) === 0) {
      result.set(symbolName(base), base);
    }
  }
  return result;
}

export function resolveDeclaredMembers(type: Type): InterfaceType | undefined {
  const data = interfaceData(type);
  if (data === undefined) return undefined;
  const extended = data as InterfaceType & {
    declaredMembersResolved?: boolean;
    declaredMembers?: SymbolTable;
    declaredIndexInfos?: readonly IndexInfo[];
  };
  if (extended.declaredMembersResolved === true) return extended;
  const members = getMembersOfSymbol(type.symbol);
  extended.declaredMembersResolved = true;
  extended.declaredMembers = members;
  extended.declaredCallSignatures = getSignaturesOfSymbol(members.get("__call"));
  extended.declaredConstructSignatures = getSignaturesOfSymbol(members.get("__new"));
  extended.declaredIndexInfos = getIndexInfosOfSymbol(type.symbol);
  return extended;
}

export function getIndexInfosOfSymbol(symbol: AstSymbol | undefined): readonly IndexInfo[] {
  const indexSymbol = getIndexSymbol(symbol);
  return indexSymbol === undefined ? [] : getIndexInfosOfIndexSymbol(indexSymbol, [...getMembersOfSymbol(symbol).values()]);
}

export function getIndexInfosOfIndexSymbol(indexSymbol: AstSymbol, siblingSymbols: readonly AstSymbol[]): readonly IndexInfo[] {
  const indexInfos: IndexInfo[] = [];
  const computed = {
    string: { seen: false, readonly: true },
    number: { seen: false, readonly: true },
    symbol: { seen: false, readonly: true },
  };
  const propertySymbols: AstSymbol[] = [];
  for (const declaration of indexSymbol.declarations ?? []) {
    if (isIndexSignatureDeclaration(declaration)) {
      const parameters = parametersOf(declaration);
      const returnTypeNode = typeNodeOf(declaration);
      if (parameters.length !== 1) continue;
      const keyType = typeOfNode(typeNodeOf(parameters[0]));
      const valueType = returnTypeNode === undefined ? unknownType() : typeOfNode(returnTypeNode);
      if (isValidIndexKeyType(keyType) && findIndexInfo(indexInfos, keyType) === undefined) {
        indexInfos.push({ keyType, valueType, isReadonly: hasReadonlyModifier(declaration), declaration });
      }
      continue;
    }
    if (!hasLateBindableIndexSignature(declaration)) continue;
    const name = declarationName(declaration);
    const keyType = isElementAccessExpression(name) ? typeOfNode(argumentExpressionOf(name)) : typeOfNode(name);
    if (findIndexInfo(indexInfos, keyType) !== undefined) continue;
    const readonly = hasReadonlyModifier(declaration);
    if ((keyType.flags & TypeFlags.NumberLike) !== 0) {
      computed.number.seen = true;
      computed.number.readonly &&= readonly;
    } else if ((keyType.flags & TypeFlags.ESSymbolLike) !== 0) {
      computed.symbol.seen = true;
      computed.symbol.readonly &&= readonly;
    } else {
      computed.string.seen = true;
      computed.string.readonly &&= readonly;
    }
    const symbol = nodeSymbol(declaration);
    if (symbol !== undefined) propertySymbols.push(symbol);
  }
  if (computed.string.seen || computed.number.seen || computed.symbol.seen) {
    propertySymbols.push(...siblingSymbols.filter((symbol) => symbol !== indexSymbol));
    if (computed.string.seen && findIndexInfoByName(indexInfos, "string") === undefined) {
      indexInfos.push(getObjectLiteralIndexInfo(computed.string.readonly, propertySymbols, intrinsicType(TypeFlags.String, "string")));
    }
    if (computed.number.seen && findIndexInfoByName(indexInfos, "number") === undefined) {
      indexInfos.push(getObjectLiteralIndexInfo(computed.number.readonly, propertySymbols, intrinsicType(TypeFlags.Number, "number")));
    }
    if (computed.symbol.seen && findIndexInfoByName(indexInfos, "symbol") === undefined) {
      indexInfos.push(getObjectLiteralIndexInfo(computed.symbol.readonly, propertySymbols, intrinsicType(TypeFlags.ESSymbol, "symbol")));
    }
  }
  return indexInfos;
}

export function getObjectLiteralIndexInfo(isReadonly: boolean, properties: readonly AstSymbol[], keyType: Type): IndexInfo {
  const propTypes: Type[] = [];
  const components: AstNode[] = [];
  for (const property of properties) {
    if (keyType.flags === TypeFlags.String && !isSymbolWithSymbolName(property)
      || keyType.flags === TypeFlags.Number && isSymbolWithNumericName(property)
      || keyType.flags === TypeFlags.ESSymbol && isSymbolWithSymbolName(property)) {
      const type = getTypeOfSymbol(property);
      if (type !== undefined) propTypes.push(type);
      if (isSymbolWithComputedName(property) && property.declarations?.[0] !== undefined) components.push(property.declarations[0]);
    }
  }
  return {
    keyType,
    valueType: propTypes.length === 0 ? intrinsicType(TypeFlags.Undefined, "undefined") : unionType(propTypes),
    isReadonly,
    ...(components[0] === undefined ? {} : { declaration: components[0] }),
  };
}

export function isSymbolWithSymbolName(symbol: AstSymbol): boolean {
  if (isKnownSymbol(symbol)) return true;
  const name = symbol.declarations?.[0] === undefined ? undefined : declarationName(symbol.declarations[0]);
  return name !== undefined && isComputedPropertyName(name) && (typeOfNode(name).flags & TypeFlags.ESSymbolLike) !== 0;
}

export function isSymbolWithNumericName(symbol: AstSymbol): boolean {
  if (isNumericLiteralName(symbolName(symbol))) return true;
  const name = symbol.declarations?.[0] === undefined ? undefined : declarationName(symbol.declarations[0]);
  return name !== undefined && isNumericName(name);
}

export function isSymbolWithComputedName(symbol: AstSymbol): boolean {
  const name = symbol.declarations?.[0] === undefined ? undefined : declarationName(symbol.declarations[0]);
  return name !== undefined && isComputedPropertyName(name);
}

export function isNumericName(node: AstNode): boolean {
  return isNumericLiteralName(nodeText(node)) || isNumericComputedName(node);
}

export function isNumericComputedName(node: AstNode): boolean {
  return isComputedPropertyName(node) && (typeOfNode(expressionOf(node)).flags & TypeFlags.NumberLike) !== 0;
}

export function isValidIndexKeyType(type: Type): boolean {
  return (type.flags & (TypeFlags.String | TypeFlags.Number | TypeFlags.ESSymbol | TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.UniqueESSymbol)) !== 0
    || ((type.flags & TypeFlags.Union) !== 0 && typeConstituents(type).every(isValidIndexKeyType));
}

export function getIndexSymbol(symbol: AstSymbol | undefined): AstSymbol | undefined {
  const members = getMembersOfSymbol(symbol);
  return members.get("__index") ?? members.get("__computed");
}

export function getSignaturesOfSymbol(symbol: AstSymbol | undefined): readonly Signature[] {
  const type = getTypeOfSymbol(symbol);
  if (type === undefined) return [];
  return [
    ...getSignaturesOfType(type, SignatureKind.Call),
    ...getSignaturesOfType(type, SignatureKind.Construct),
  ];
}

export function getTypeParametersFromDeclaration(declaration: AstNode | undefined): readonly TypeParameter[] {
  return nodeArray((declaration as { readonly typeParameters?: unknown } | undefined)?.typeParameters)
    .map((node) => typeOfNode(node).data as TypeParameter)
    .filter((parameter): parameter is TypeParameter => parameter !== undefined);
}

export function getAnnotatedAccessorThisParameter(accessor: AstNode | undefined): AstSymbol | undefined {
  return parametersOf(accessor).find((parameter) => nodeText(declarationName(parameter)) === "this")?.symbol;
}

export function getAccessorThisParameter(accessor: AstNode | undefined): AstSymbol | undefined {
  return getAnnotatedAccessorThisParameter(accessor) ?? nodeSymbol(parentOf(accessor));
}

export function hasBindableName(node: AstNode | undefined): boolean {
  const name = declarationName(node);
  return name !== undefined && (isIdentifierLike(name) || isLiteralName(name) || isComputedPropertyName(name));
}

export function hasLateBindableName(node: AstNode | undefined): boolean {
  const name = declarationName(node);
  return name !== undefined && isLateBindableName(name);
}

export function isLateBindableName(node: AstNode | undefined): boolean {
  return node !== undefined && isComputedPropertyName(node) && isValidIndexKeyType(typeOfNode(expressionOf(node)));
}

export function hasLateBindableIndexSignature(node: AstNode | undefined): boolean {
  return isLateBindableIndexSignature(node);
}

export function isLateBindableIndexSignature(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if (isIndexSignatureDeclaration(node)) return parametersOf(node).some((parameter) => isLateBindableName(typeNodeOf(parameter)));
  return isLateBindableName(declarationName(node));
}

export function isTypeUsableAsIndexSignatureDeclaration(type: Type): boolean {
  return isValidIndexKeyType(type);
}

export function isLateBindableAST(node: AstNode | undefined): boolean {
  return hasLateBindableName(node) || hasLateBindableIndexSignature(node);
}

function interfaceData(type: Type): InterfaceType | undefined {
  const data = type.data as InterfaceType | undefined;
  return (data?.objectFlags ?? 0) & ObjectFlags.Interface ? data : undefined;
}

function typeParameterAsType(typeParameter: TypeParameter | undefined): Type {
  if (typeParameter === undefined) return unknownType();
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  return {
    flags: TypeFlags.TypeParameter,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: typeParameter,
  };
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? [];
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function indexedAccessElement(type: Type, indexType: Type): Type | undefined {
  void indexType;
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function getMembersOfSymbol(symbol: AstSymbol | undefined): SymbolTable {
  return (symbol as { readonly members?: SymbolTable; readonly exports?: SymbolTable } | undefined)?.members
    ?? (symbol as { readonly exports?: SymbolTable } | undefined)?.exports
    ?? new Map<string, AstSymbol>();
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function typeArgumentNodesOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly typeArguments?: unknown } | undefined)?.typeArguments);
}

function heritageClauseElements(node: AstNode): readonly AstNode[] {
  const clauses = nodeArray((node as { readonly heritageClauses?: unknown } | undefined)?.heritageClauses);
  return clauses.flatMap((clause) => nodeArray((clause as { readonly types?: unknown; readonly elements?: unknown }).types ?? (clause as { readonly elements?: unknown }).elements));
}

function extendsHeritageClauseElement(node: AstNode): AstNode | undefined {
  return heritageClauseElements(node)[0];
}

function parametersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly parameters?: unknown } | undefined)?.parameters);
}

function typeNodeOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly expression?: AstNode } | undefined)?.expression;
}

function argumentExpressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly argumentExpression?: AstNode } | undefined)?.argumentExpression;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function isInJavaScriptFile(node: AstNode | undefined): boolean {
  const fileName = sourceFileName(node);
  return fileName.endsWith(".js") || fileName.endsWith(".jsx") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs");
}

function sourceFileName(node: AstNode | undefined): string {
  for (let current = node; current !== undefined; current = parentOf(current)) {
    const fileName = (current as { readonly fileName?: string }).fileName;
    if (fileName !== undefined) return fileName;
  }
  return "";
}

function declarationName(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly name?: AstNode } | undefined)?.name ?? node;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function typeOfNode(node: AstNode | undefined): Type {
  return (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.type
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.syntheticType
    ?? unknownType();
}

function isClassLikeDeclaration(node: AstNode): boolean {
  return node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression;
}

function isInterfaceDeclaration(node: AstNode): boolean {
  return node.kind === Kind.InterfaceDeclaration;
}

function isIndexSignatureDeclaration(node: AstNode): boolean {
  return node.kind === Kind.IndexSignature;
}

function isElementAccessExpression(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ElementAccessExpression;
}

function isComputedPropertyName(node: AstNode): boolean {
  return node.kind === Kind.ComputedPropertyName;
}

function isIdentifierLike(node: AstNode): boolean {
  return node.kind === Kind.Identifier || node.kind === Kind.PrivateIdentifier;
}

function isLiteralName(node: AstNode): boolean {
  return node.kind === Kind.StringLiteral || node.kind === Kind.NumericLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral;
}

function hasReadonlyModifier(node: AstNode): boolean {
  const flags = (node as { readonly modifierFlags?: number; readonly modifiers?: readonly AstNode[] }).modifierFlags ?? 0;
  if ((flags & ModifierFlags.Readonly) !== 0) return true;
  return ((node as { readonly modifiers?: readonly AstNode[] }).modifiers ?? []).some((modifier) => modifier.kind === Kind.ReadonlyKeyword);
}

function isStaticPrivateIdentifierProperty(symbol: AstSymbol): boolean {
  const declaration = symbol.declarations?.[0];
  return declarationName(declaration)?.kind === Kind.PrivateIdentifier && ((declaration as { readonly modifierFlags?: number } | undefined)?.modifierFlags ?? 0) & ModifierFlags.Static ? true : false;
}

function isKnownSymbol(symbol: AstSymbol): boolean {
  return symbolName(symbol).startsWith("__@");
}

function isNumericLiteralName(name: string): boolean {
  return name.length !== 0 && Number.isFinite(Number(name));
}

function sameTypes(left: readonly Type[], right: readonly Type[]): boolean {
  return left.length === right.length && left.every((type, index) => type === right[index]);
}

function findIndexInfo(infos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return infos.find((info) => info.keyType === keyType || typeName(info.keyType) === typeName(keyType));
}

function findIndexInfoByName(infos: readonly IndexInfo[], name: string): IndexInfo | undefined {
  return infos.find((info) => typeName(info.keyType) === name);
}

function isGenericMappedType(type: Type): boolean {
  return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Mapped ? true : false;
}

function isErrorType(type: Type): boolean {
  return typeName(type) === "error";
}

function typeName(type: Type | undefined): string {
  if (type === undefined) return "unknown";
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: nextSyntheticTypeId(), data: { intrinsicName, objectFlags: ObjectFlags.None } };
}

function unknownType(): Type {
  return intrinsicType(TypeFlags.Unknown, "unknown");
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 1 ? unique[0]! : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

const elementFlagVariadic = 1 << 3;
let syntheticTypeId = -950_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
