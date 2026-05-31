/**
 * Checker type constructors and declaration-backed type helpers.
 *
 * Conceptual split from TS-Go `checker.go` sections that create intrinsic,
 * object, tuple, array, alias, enum, and type-reference shapes.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { InterfaceType, ObjectType, TupleElementInfo, Type, TypeParameter } from "./types.js";
import { ElementFlags, ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface TypeConstructorHost {
  readonly anyType: Type;
  readonly neverType: Type;
  readonly unknownType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly readonlyArrayType?: Type;
  readonly arrayType?: Type;
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined;
  getTypeFromTypeNode(node: AstNode | undefined): Type | undefined;
  getSymbolAtLocation(node: AstNode | undefined): AstSymbol | undefined;
  createUnionType(types: readonly Type[]): Type;
  report(node: AstNode | undefined, message: string): void;
}

export function isArrayType(type: Type): boolean {
  return symbolName(type.symbol) === "Array"
    || (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Reference) !== 0
      && symbolName(((type.data as ObjectType | undefined)?.target as unknown as Type | undefined)?.symbol) === "Array";
}

export function isReadonlyArrayType(type: Type): boolean {
  return symbolName(type.symbol) === "ReadonlyArray"
    || (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Reference) !== 0
      && symbolName(((type.data as ObjectType | undefined)?.target as unknown as Type | undefined)?.symbol) === "ReadonlyArray";
}

export function isMutableTupleType(type: Type): boolean {
  return isTupleLikeType(type) && ((type.data as { readonly readonly?: boolean } | undefined)?.readonly !== true);
}

export function isSingleElementGenericTupleType(type: Type): boolean {
  return isTupleLikeType(type)
    && ((type.data as ObjectType | undefined)?.resolvedTypeArguments?.length ?? 0) === 1
    && (((type.data as ObjectType | undefined)?.resolvedTypeArguments?.[0]?.flags ?? 0) & TypeFlags.TypeParameter) !== 0;
}

export function isMutableArrayOrTuple(type: Type): boolean {
  return isArrayType(type) || isMutableTupleType(type);
}

export function isMutableArrayLikeType(type: Type): boolean {
  return isMutableArrayOrTuple(type) || symbolName(type.symbol) === "MutableArrayLike";
}

export function isEmptyArrayLiteralType(type: Type): boolean {
  return (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.ArrayLiteral) !== 0
    && ((type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.length ?? 0) === 0;
}

export function isEmptyLiteralType(type: Type): boolean {
  if (isEmptyArrayLiteralType(type)) return true;
  return ((type.data as ObjectType | undefined)?.declaredProperties?.length ?? 0) === 0
    && (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.ObjectLiteral) !== 0;
}

export function isTupleLikeType(type: Type): boolean {
  return (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Tuple) !== 0
    || symbolName(type.symbol) === "Tuple";
}

export function isArrayOrTupleLikeType(type: Type): boolean {
  return isArrayType(type) || isReadonlyArrayType(type) || isTupleLikeType(type);
}

export function isArrayOrTupleOrIntersection(type: Type): boolean {
  return isArrayOrTupleLikeType(type)
    || ((type.flags & TypeFlags.Intersection) !== 0 && typeConstituents(type).some(isArrayOrTupleLikeType));
}

export function getTypeFromTypeAliasReference(host: TypeConstructorHost, node: AstNode, symbol: AstSymbol): Type {
  const typeArguments = getTypeArgumentsForAliasSymbol(host, node, symbol);
  return getTypeAliasInstantiation(host, symbol, typeArguments, node);
}

export function getTypeAliasInstantiation(host: TypeConstructorHost, symbol: AstSymbol, typeArguments: readonly Type[], location?: AstNode): Type {
  void location;
  const declared = host.getDeclaredTypeOfSymbol(symbol) ?? host.unknownType;
  if (typeArguments.length === 0) return declared;
  const links = symbol as { instantiations?: Map<string, Type> };
  links.instantiations ??= new Map<string, Type>();
  const key = typeArguments.map(type => String(type.id)).join(",");
  const cached = links.instantiations.get(key);
  if (cached !== undefined) return cached;
  const instantiated: Type = {
    ...declared,
    id: nextSyntheticTypeId(),
    aliasSymbol: symbol,
    aliasTypeArguments: typeArguments,
  };
  links.instantiations.set(key, instantiated);
  return instantiated;
}

export function isLocalTypeAlias(symbol: AstSymbol | undefined): boolean {
  return symbol !== undefined
    && ((symbol.flags ?? 0) & SymbolFlags.TypeAlias) !== 0
    && (symbol.declarations ?? []).some(declaration => parentOf(declaration)?.kind !== Kind.SourceFile);
}

export function tryGetDeclaredTypeOfSymbol(host: Pick<TypeConstructorHost, "getDeclaredTypeOfSymbol">, symbol: AstSymbol | undefined): Type | undefined {
  return symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol(symbol);
}

export function getTypeReferenceName(node: AstNode | undefined): string {
  return entityNameText((node as { readonly typeName?: AstNode; readonly name?: AstNode } | undefined)?.typeName
    ?? (node as { readonly name?: AstNode } | undefined)?.name);
}

export function getAliasForTypeNode(host: TypeConstructorHost, node: AstNode | undefined): AstSymbol | undefined {
  const symbol = host.getSymbolAtLocation((node as { readonly typeName?: AstNode; readonly name?: AstNode } | undefined)?.typeName
    ?? (node as { readonly name?: AstNode } | undefined)?.name);
  return getAliasSymbolForTypeNode(symbol);
}

export function getAliasSymbolForTypeNode(symbol: AstSymbol | undefined): AstSymbol | undefined {
  return symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0 ? symbol : undefined;
}

export function getTypeArgumentsForAliasSymbol(host: TypeConstructorHost, node: AstNode | undefined, symbol: AstSymbol): readonly Type[] {
  const typeArguments = nodeArray((node as { readonly typeArguments?: unknown } | undefined)?.typeArguments)
    .map(typeNode => host.getTypeFromTypeNode(typeNode) ?? host.unknownType);
  const declared = host.getDeclaredTypeOfSymbol(symbol);
  const parameters = (declared?.data as InterfaceType | undefined)?.typeParameters ?? [];
  if (typeArguments.length >= parameters.length) return typeArguments;
  return [...typeArguments, ...parameters.slice(typeArguments.length).map(getDefaultOrUnknownFromTypeParameter)];
}

export function getOuterTypeParametersOfClassOrInterface(type: Type): readonly TypeParameter[] {
  return (type.data as InterfaceType | undefined)?.outerTypeParameters ?? [];
}

export function getOuterTypeParameters(node: AstNode | undefined): readonly TypeParameter[] {
  const symbol = nodeSymbol(node);
  const type = getTypeOfSymbol(symbol);
  return type === undefined ? [] : getOuterTypeParametersOfClassOrInterface(type);
}

export function getInferTypeParameters(node: AstNode | undefined): readonly TypeParameter[] {
  const typeParameters: TypeParameter[] = [];
  visit(node, child => {
    if (child.kind === Kind.InferType) {
      const type = typeOfNode((child as { readonly typeParameter?: AstNode }).typeParameter);
      const parameter = type?.data as TypeParameter | undefined;
      if (parameter !== undefined) typeParameters.push(parameter);
    }
  });
  return typeParameters;
}

export function appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(out: TypeParameter[], symbol: AstSymbol | undefined): TypeParameter[] {
  const type = getTypeOfSymbol(symbol);
  out.push(...(type?.data as InterfaceType | undefined)?.localTypeParameters ?? []);
  out.push(...(type?.data as InterfaceType | undefined)?.typeParameters ?? []);
  return [...uniqueTypeParameters(out)];
}

export function appendTypeParameters(left: readonly TypeParameter[], right: readonly TypeParameter[]): readonly TypeParameter[] {
  return uniqueTypeParameters([...left, ...right]);
}

export function getDeclaredTypeOfTypeParameter(symbol: AstSymbol | undefined): Type {
  return {
    flags: TypeFlags.TypeParameter,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: typeOfNode(typeNodeOf(symbol?.declarations?.[0])) === undefined
      ? {}
      : { constraint: typeOfNode(typeNodeOf(symbol?.declarations?.[0])) } as TypeParameter,
  };
}

export function getDeclaredTypeOfEnum(symbol: AstSymbol | undefined): Type {
  const members = (symbol?.declarations ?? []).flatMap(declaration => membersOfNode(declaration));
  const memberTypes = members.map(member => getDeclaredTypeOfEnumMember(nodeSymbol(member)));
  return createComputedEnumType(symbol, memberTypes);
}

export function createComputedEnumType(symbol: AstSymbol | undefined, members: readonly Type[] = []): Type {
  return {
    flags: TypeFlags.Enum,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: {
      objectFlags: ObjectFlags.None,
      types: members,
    },
  };
}

export function getDeclaredTypeOfEnumMember(symbol: AstSymbol | undefined): Type {
  const value = computeEnumMemberValue(symbol?.valueDeclaration ?? symbol?.declarations?.[0]);
  return {
    flags: TypeFlags.EnumLiteral | (typeof value === "number" ? TypeFlags.NumberLiteral : TypeFlags.StringLiteral),
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: { value },
  };
}

export function computeEnumMemberValues(enumDeclaration: AstNode | undefined): readonly (string | number)[] {
  let previous = -1;
  return membersOfNode(enumDeclaration).map(member => {
    const value = computeEnumMemberValue(member, previous + 1);
    if (typeof value === "number") previous = value;
    return value;
  });
}

export function computeEnumMemberValue(member: AstNode | undefined, autoValue = 0): string | number {
  const initializer = initializerOf(member);
  return initializer === undefined ? autoValue : computeConstantEnumMemberValue(initializer);
}

export function computeConstantEnumMemberValue(expression: AstNode | undefined): string | number {
  const value = evaluateEntity(expression);
  return typeof value === "string" || typeof value === "number" ? value : 0;
}

export function evaluateEntity(node: AstNode | undefined): string | number | undefined {
  if (node === undefined) return undefined;
  if (node.kind === Kind.NumericLiteral) return Number(nodeText(node));
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral) return nodeText(node);
  if (node.kind === Kind.PrefixUnaryExpression) {
    const operand = evaluateEntity((node as { readonly operand?: AstNode }).operand);
    if (typeof operand !== "number") return undefined;
    const operator = nodeText((node as { readonly operator?: AstNode }).operator);
    return operator === "-" ? -operand : operand;
  }
  if (node.kind === Kind.BinaryExpression) return evaluateBinaryExpression(node);
  return undefined;
}

export function evaluateEnumMember(member: AstNode | undefined): string | number {
  return computeEnumMemberValue(member);
}

export function getDeclaredTypeOfAlias(host: TypeConstructorHost, symbol: AstSymbol | undefined): Type {
  const declaration = symbol?.declarations?.[0];
  return host.getTypeFromTypeNode(typeNodeOf(declaration)) ?? host.unknownType;
}

export function createIterableType(host: TypeConstructorHost, elementType: Type): Type {
  const iterableSymbol: AstSymbol = { name: "Iterable", escapedName: "Iterable", flags: SymbolFlags.Interface, declarations: [] };
  return createTypeReferenceEx(host, newObjectType(ObjectFlags.Interface, iterableSymbol), [elementType]);
}

export function createArrayTypeEx(host: TypeConstructorHost, elementType: Type, readonlyArray: boolean): Type {
  const target = readonlyArray
    ? host.readonlyArrayType ?? newObjectType(ObjectFlags.Interface, syntheticSymbol("ReadonlyArray"))
    : host.arrayType ?? newObjectType(ObjectFlags.Interface, syntheticSymbol("Array"));
  return createTypeReferenceEx(host, target, [elementType]);
}

export function getTupleElementInfo(type: Type): readonly TupleElementInfo[] {
  return (type.data as { readonly elementInfo?: readonly TupleElementInfo[] } | undefined)?.elementInfo ?? [];
}

export function createTupleType(host: TypeConstructorHost, elementTypes: readonly Type[], readonlyTuple = false): Type {
  return createTupleTypeEx(host, elementTypes, elementTypes.map(() => ElementFlags.Required), readonlyTuple);
}

export function createTupleTypeEx(host: TypeConstructorHost, elementTypes: readonly Type[], elementFlags: readonly number[], readonlyTuple = false): Type {
  const target = getTupleTargetType(elementFlags, readonlyTuple);
  return createTypeReferenceEx(host, target, elementTypes);
}

export function getTupleTargetType(elementFlags: readonly number[], readonlyTuple = false): Type {
  return createTupleTargetType(elementFlags, readonlyTuple);
}

export function createTupleTargetType(elementFlags: readonly number[], readonlyTuple = false): Type {
  const elementInfo = elementFlags.map(flags => ({ flags }));
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    symbol: syntheticSymbol(readonlyTuple ? "readonly tuple" : "tuple"),
    data: {
      objectFlags: ObjectFlags.Tuple | ObjectFlags.Reference,
      typeParameters: elementFlags.map((_, index) => syntheticTypeParameter(`T${index}`)),
      elementInfo,
      readonly: readonlyTuple,
      fixedLength: elementFlags.filter(flags => (flags & ElementFlags.Rest) === 0).length,
      minLength: elementFlags.findIndex(flags => (flags & ElementFlags.Optional) !== 0 || (flags & ElementFlags.Rest) !== 0),
      hasRestElement: elementFlags.some(flags => (flags & ElementFlags.Rest) !== 0),
      combinedFlags: elementFlags.reduce((left, right) => left | right, 0),
    } as Partial<InterfaceType> & { elementInfo: readonly TupleElementInfo[]; readonly: boolean },
  };
}

export function getRestTypeOfTupleType(type: Type): Type | undefined {
  const data = type.data as ObjectType & { readonly elementInfo?: readonly TupleElementInfo[] } | undefined;
  const args = data?.resolvedTypeArguments ?? [];
  const restIndex = data?.elementInfo?.findIndex(info => (info.flags & ElementFlags.Rest) !== 0) ?? -1;
  return restIndex < 0 ? undefined : args[restIndex];
}

export function getTupleElementTypeOutOfStartCount(type: Type, index: number, startCount: number): Type | undefined {
  const args = (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? [];
  return args[index + startCount];
}

export function isGenericType(type: Type): boolean {
  return (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.IsGenericType) !== 0
    || isGenericObjectType(type)
    || isGenericIndexType(type);
}

export function isGenericObjectType(type: Type): boolean {
  return (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.IsGenericObjectType) !== 0
    || ((type.flags & TypeFlags.Object) !== 0 && typeContainsTypeParameter(type));
}

export function isGenericIndexType(type: Type): boolean {
  return (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.IsGenericIndexType) !== 0
    || (type.flags & (TypeFlags.Index | TypeFlags.IndexedAccess)) !== 0;
}

export function getGenericObjectFlags(type: Type): ObjectFlags {
  let flags = ObjectFlags.None;
  if (isGenericObjectType(type)) flags |= ObjectFlags.IsGenericObjectType;
  if (isGenericIndexType(type)) flags |= ObjectFlags.IsGenericIndexType;
  return flags;
}

export function isGenericReducibleType(type: Type): boolean {
  return isGenericType(type) && ((type.flags & (TypeFlags.Union | TypeFlags.Intersection | TypeFlags.Conditional)) !== 0);
}

export function isReducibleIntersection(type: Type): boolean {
  return (type.flags & TypeFlags.Intersection) !== 0 && typeConstituents(type).some(isGenericReducibleType);
}

export function getUniqueLiteralTypeForTypeParameter(typeParameter: Type): Type {
  return {
    flags: TypeFlags.UniqueESSymbol,
    id: nextSyntheticTypeId(),
    ...(typeParameter.symbol === undefined ? {} : { symbol: typeParameter.symbol }),
    data: { escapedName: symbolName(typeParameter.symbol) || `typeParameter#${typeParameter.id}` },
  };
}

export function getConditionalFlowTypeOfType(type: Type): Type {
  return (type.data as { readonly conditionalFlowType?: Type } | undefined)?.conditionalFlowType ?? type;
}

export function getImpliedConstraint(type: Type): Type | undefined {
  return (type.data as TypeParameter | undefined)?.constraint
    ?? (type.data as { readonly constraint?: Type } | undefined)?.constraint;
}

export function isUnaryTupleTypeNode(node: AstNode | undefined): boolean {
  const elements = nodeArray((node as { readonly elements?: unknown } | undefined)?.elements);
  return node?.kind === Kind.TupleType && elements.length === 1;
}

export function newType(flags: TypeFlags): Type {
  return { flags, id: nextSyntheticTypeId() };
}

export function newIntrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return newIntrinsicTypeEx(flags, intrinsicName, intrinsicName);
}

export function newIntrinsicTypeEx(flags: TypeFlags, intrinsicName: string, debugIntrinsicName: string): Type {
  return {
    flags,
    id: nextSyntheticTypeId(),
    data: { intrinsicName, debugIntrinsicName, objectFlags: ObjectFlags.None },
  };
}

export function createWideningType(type: Type): Type {
  return { ...type, id: nextSyntheticTypeId(), data: { ...(type.data as object), freshType: type } };
}

export function createUnknownUnionType(types: readonly Type[]): Type {
  return {
    flags: TypeFlags.Union,
    id: nextSyntheticTypeId(),
    data: { types, objectFlags: ObjectFlags.IsUnknownLikeUnion },
  };
}

export function newUniqueESSymbolType(symbol: AstSymbol): Type {
  return { flags: TypeFlags.UniqueESSymbol, id: nextSyntheticTypeId(), symbol, data: { escapedName: symbolName(symbol) } };
}

export function newObjectType(objectFlags: ObjectFlags, symbol?: AstSymbol): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: { objectFlags, declaredProperties: [] },
  };
}

export function newAnonymousType(symbol: AstSymbol | undefined, members: SymbolTable, callSignatures: readonly unknown[] = [], constructSignatures: readonly unknown[] = []): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredProperties: [...members.values()],
      declaredCallSignatures: callSignatures as never,
      declaredConstructSignatures: constructSignatures as never,
    },
  };
}

export function tryCreateTypeReference(host: TypeConstructorHost, target: Type, typeArguments: readonly Type[]): Type | undefined {
  const arity = ((target.data as InterfaceType | undefined)?.typeParameters ?? []).length;
  return arity !== 0 && typeArguments.length > arity ? undefined : createTypeReferenceEx(host, target, typeArguments);
}

export function createTypeReferenceEx(host: TypeConstructorHost, target: Type, typeArguments: readonly Type[]): Type {
  void host;
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(target.symbol === undefined ? {} : { symbol: target.symbol }),
    data: {
      objectFlags: ObjectFlags.Reference,
      target: target.data as ObjectType,
      resolvedTypeArguments: typeArguments,
    },
  };
}

export function createDeferredTypeReference(target: Type, node: AstNode, mapper?: unknown): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    ...(target.symbol === undefined ? {} : { symbol: target.symbol }),
    data: {
      objectFlags: ObjectFlags.Reference | ObjectFlags.UnresolvedMembers,
      target: target.data as ObjectType,
      node,
      mapper,
    },
  };
}

export function cloneTypeReference(type: Type): Type {
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: { ...(type.data as ObjectType) },
  };
}

export function setStructuredTypeMembers(type: Type, properties: readonly AstSymbol[], callSignatures: readonly unknown[], constructSignatures: readonly unknown[], indexInfos: readonly unknown[]): Type {
  const data = type.data as ObjectType | undefined;
  return {
    ...type,
    data: {
      ...data,
      objectFlags: (data?.objectFlags ?? ObjectFlags.Anonymous) | ObjectFlags.MembersResolved,
      declaredProperties: properties,
      declaredCallSignatures: callSignatures as never,
      declaredConstructSignatures: constructSignatures as never,
      indexInfos: indexInfos as never,
    },
  };
}

function getDefaultOrUnknownFromTypeParameter(typeParameter: TypeParameter): Type {
  return (typeParameter as { readonly defaultType?: Type }).defaultType ?? typeParameter.constraint ?? newIntrinsicType(TypeFlags.Unknown, "unknown");
}

function typeContainsTypeParameter(type: Type): boolean {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return true;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return typeConstituents(type).some(typeContainsTypeParameter);
  return ((type.data as ObjectType | undefined)?.resolvedTypeArguments ?? []).some(typeContainsTypeParameter);
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function syntheticTypeParameter(name: string): TypeParameter {
  return { symbol: syntheticSymbol(name) } as unknown as TypeParameter;
}

function syntheticSymbol(name: string): AstSymbol {
  return { name, escapedName: name, flags: SymbolFlags.TypeParameter, declarations: [] };
}

function membersOfNode(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly members?: unknown } | undefined)?.members);
}

function visit(node: AstNode | undefined, callback: (node: AstNode) => void): void {
  if (node === undefined) return;
  callback(node);
  for (const child of childrenOf(node)) visit(child, callback);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const key of ["children", "members", "typeParameters", "typeArguments", "elements", "types"]) {
    out.push(...nodeArray((node as unknown as Record<string, unknown>)[key]));
  }
  for (const key of ["type", "expression", "name", "left", "right", "initializer", "operand"]) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (isNode(child)) out.push(child);
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

function typeNodeOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type;
}

function initializerOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly initializer?: AstNode } | undefined)?.initializer;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function typeOfNode(node: AstNode | undefined): Type | undefined {
  return (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.type
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.syntheticType;
}

function entityNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const text = nodeText(node);
  if (text.length !== 0) return text;
  const left = entityNameText((node as { readonly left?: AstNode; readonly expression?: AstNode }).left ?? (node as { readonly expression?: AstNode }).expression);
  const right = entityNameText((node as { readonly right?: AstNode; readonly name?: AstNode }).right ?? (node as { readonly name?: AstNode }).name);
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function evaluateBinaryExpression(node: AstNode): string | number | undefined {
  const left = evaluateEntity((node as { readonly left?: AstNode }).left);
  const right = evaluateEntity((node as { readonly right?: AstNode }).right);
  const operator = nodeText((node as { readonly operatorToken?: AstNode; readonly operator?: AstNode }).operatorToken ?? (node as { readonly operator?: AstNode }).operator);
  if (typeof left === "string" || typeof right === "string") return operator === "+" ? `${left ?? ""}${right ?? ""}` : undefined;
  if (typeof left !== "number" || typeof right !== "number") return undefined;
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  if (operator === "/") return right === 0 ? undefined : left / right;
  return undefined;
}

function uniqueTypeParameters(parameters: readonly TypeParameter[]): readonly TypeParameter[] {
  return [...new Set(parameters)];
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

let syntheticTypeId = -2_450_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
