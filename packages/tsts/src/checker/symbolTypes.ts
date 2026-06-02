import type { int } from "@tsonic/core/types.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, NodeFlags, SymbolFlags, getCombinedNodeFlags, hasSyntacticModifier, nodeParent } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import type { InterfaceType, ObjectType, Signature, Type, TypeParameter, TypeReference, IndexedAccessType } from "./types.js";
import { ObjectFlags, SignatureFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export function someSignature(signatures: readonly Signature[] | undefined, predicate: (signature: Signature) => boolean): boolean {
  return signatures?.some(predicate) === true;
}

export function signatureHasLiteralTypes(signature: Signature): boolean {
  if ((signature.flags & SignatureFlags.HasLiteralTypes) !== 0) return true;
  return signature.parameters.some((parameter) => {
    const type = getTypeOfSymbol(parameter);
    return type !== undefined && (type.flags & TypeFlags.Literal) !== 0;
  }) || ((signature.resolvedReturnType?.flags ?? 0) & TypeFlags.Literal) !== 0;
}

export function acceptsVoid(type: Type | undefined): boolean {
  if (type === undefined) return false;
  if ((type.flags & (TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
  return unionTypes(type).some(acceptsVoid);
}

export function getErrorNodeForCallNode(node: AstNode): AstNode {
  return node.kind === Kind.TaggedTemplateExpression
    ? field<AstNode>(node, "tag") ?? node
    : field<AstNode>(node, "expression") ?? node;
}

export function hasCommonDomTypeName(name: string): boolean {
  return commonDomTypeNames.has(name);
}

export function isEmptyObjectTypeOrSpreadsIntoEmptyObject(type: Type): boolean {
  if ((type.flags & TypeFlags.Object) === 0) return false;
  const data = type.data as ObjectType | undefined;
  const hasMembers = (type.symbol as { members?: Map<string, AstSymbol> } | undefined)?.members?.size !== undefined
    && ((type.symbol as { members?: Map<string, AstSymbol> }).members?.size ?? 0) > 0;
  return !hasMembers
    && (data?.declaredProperties?.length ?? 0) === 0
    && (data?.declaredCallSignatures?.length ?? 0) === 0
    && (data?.declaredConstructSignatures?.length ?? 0) === 0
    && (data?.indexInfos?.length ?? 0) === 0;
}

export function isConstContext(node: AstNode | undefined): boolean {
  for (let current = node; current !== undefined; current = nodeParent(current)) {
    if (current.kind === Kind.AsExpression || current.kind === Kind.TypeAssertionExpression) {
      const type = field<AstNode>(current, "type");
      if (nodeText(type) === "const") return true;
    }
    if (current.kind === Kind.VariableDeclaration && (getCombinedNodeFlags(current) & NodeFlags.Const) !== 0) return true;
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.ArrowFunction || current.kind === Kind.MethodDeclaration) return false;
  }
  return false;
}

export function isValidConstAssertionArgument(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  switch (node.kind) {
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.NumericLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
      return true;
    case Kind.ParenthesizedExpression:
    case Kind.PrefixUnaryExpression:
      return isValidConstAssertionArgument(field(node, "expression") ?? field(node, "operand"));
    default:
      return false;
  }
}

export function isConstTypeVariable(type: Type | undefined): boolean {
  if (type === undefined || (type.flags & TypeFlags.TypeParameter) === 0) return false;
  return (type.data as TypeParameter | undefined)?.isLocked === true
    || (type as { isConstTypeVariable?: boolean }).isConstTypeVariable === true;
}

export function isInPropertyInitializerOrClassStaticBlock(node: AstNode | undefined): boolean {
  for (let current = node; current !== undefined; current = nodeParent(current)) {
    if (current.kind === Kind.PropertyDeclaration || current.kind === Kind.ClassStaticBlockDeclaration) return true;
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression || current.kind === Kind.FunctionDeclaration) return false;
  }
  return false;
}

export function getNarrowedTypeOfSymbol(symbol: AstSymbol | undefined, scopes: readonly Map<AstSymbol, Type>[] = []): Type | undefined {
  if (symbol === undefined) return undefined;
  for (let index = scopes.length - 1; index >= 0; index -= 1) {
    const type = scopes[index]?.get(symbol);
    if (type !== undefined) return type;
  }
  return getTypeOfSymbol(symbol);
}

export function isReadonlyAssignmentDeclaration(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const name = field<AstNode>(node, "name");
  const symbol = name?.symbol ?? node.symbol;
  if (symbol !== undefined && isReadonlySymbol(symbol)) return true;
  return hasSyntacticModifier(node, ModifierFlags.Readonly);
}

export function checkExpressionForMutableLocation(type: Type, expression: AstNode | undefined, contextualType?: Type): Type {
  if (contextualType !== undefined && !isReadonlyExpression(expression)) return contextualType;
  return type;
}

export function getTypeOfSymbolWithDeferredType(symbol: AstSymbol | undefined, deferredType?: Type): Type | undefined {
  return getTypeOfSymbol(symbol) ?? deferredType;
}

export function getWriteTypeOfSymbolWithDeferredType(symbol: AstSymbol | undefined, deferredType?: Type): Type | undefined {
  return getWriteTypeOfSymbol(symbol) ?? deferredType;
}

export function getWriteTypeOfSymbol(symbol: AstSymbol | undefined): Type | undefined {
  return (symbol as unknown as { writeType?: Type; links?: { writeType?: Type } } | undefined)?.writeType
    ?? (symbol as unknown as { writeType?: Type; links?: { writeType?: Type } } | undefined)?.links?.writeType
    ?? getTypeOfSymbol(symbol);
}

export function getNonMissingTypeOfSymbol(symbol: AstSymbol | undefined): Type | undefined {
  const type = getTypeOfSymbol(symbol);
  return type === undefined ? undefined : removeMissingType(type);
}

export function getTypeOfInstantiatedSymbol(symbol: AstSymbol | undefined, mapper?: (type: Type) => Type): Type | undefined {
  const type = getTypeOfSymbol(symbol);
  return type === undefined ? undefined : mapper?.(type) ?? type;
}

export function getWriteTypeOfInstantiatedSymbol(symbol: AstSymbol | undefined, mapper?: (type: Type) => Type): Type | undefined {
  const type = getWriteTypeOfSymbol(symbol);
  return type === undefined ? undefined : mapper?.(type) ?? type;
}

export function isParameterOfContextSensitiveSignature(symbol: AstSymbol | undefined): boolean {
  const declaration = symbol?.valueDeclaration ?? symbol?.declarations[0];
  if (declaration?.kind !== Kind.Parameter) return false;
  const parent = nodeParent(declaration);
  return parent?.kind === Kind.FunctionExpression || parent?.kind === Kind.ArrowFunction || parent?.kind === Kind.MethodDeclaration;
}

export function getTypeOfVariableOrParameterOrPropertyWorker(symbol: AstSymbol | undefined, initializerType?: Type): Type | undefined {
  const explicit = getTypeOfSymbol(symbol);
  if (explicit !== undefined) return explicit;
  return initializerType === undefined ? undefined : getWidenedTypeForVariableLikeDeclaration(initializerType, symbol?.valueDeclaration);
}

export function getWidenedTypeForVariableLikeDeclaration(type: Type, declaration: AstNode | undefined): Type {
  return isConstContext(declaration) ? type : getWidenedLiteralTypeForInitializer(type);
}

export function getTypeForVariableLikeDeclaration(declaration: AstNode, initializerType?: Type): Type | undefined {
  const symbol = field<AstNode>(declaration, "name")?.symbol ?? declaration.symbol;
  return getTypeOfVariableOrParameterOrPropertyWorker(symbol, initializerType);
}

export function checkDeclarationInitializer(declaration: AstNode, initializerType: Type, contextualType?: Type): Type {
  return checkExpressionForMutableLocation(initializerType, field(declaration, "initializer"), contextualType);
}

export function padObjectLiteralType(type: Type): Type {
  if ((type.flags & TypeFlags.Object) === 0) return type;
  const data = type.data as ObjectType | undefined;
  if (data === undefined || data.objectFlags !== undefined) return type;
  return { ...type, data: { ...data, objectFlags: ObjectFlags.ObjectLiteral } };
}

export function getPropertyNameFromBindingElement(element: AstNode): string | undefined {
  const propertyName = field<AstNode>(element, "propertyName");
  const name = propertyName ?? field<AstNode>(element, "name");
  return propertyNameText(name);
}

export function padTupleType(type: Type, minLength: number): Type {
  const data = type.data as { minLength?: number; fixedLength?: number } | undefined;
  if (data === undefined || (data.minLength ?? 0) >= minLength) return type;
  return {
    ...type,
    data: {
      ...data,
      minLength,
      fixedLength: Math.max(data.fixedLength ?? 0, minLength),
    },
  };
}

export function widenTypeInferredFromInitializer(type: Type, declaration?: AstNode): Type {
  return getWidenedTypeForVariableLikeDeclaration(type, declaration);
}

export function getWidenedLiteralTypeForInitializer(type: Type): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return intrinsicType(TypeFlags.String, "string");
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return intrinsicType(TypeFlags.Number, "number");
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return intrinsicType(TypeFlags.BigInt, "bigint");
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return intrinsicType(TypeFlags.Boolean, "boolean");
  if ((type.flags & TypeFlags.Union) !== 0) {
    return {
      ...type,
      data: { ...(type.data as object), types: unionTypes(type).map(getWidenedLiteralTypeForInitializer) },
    };
  }
  return type;
}

export function getTypeOfFuncClassEnumModuleWorker(symbol: AstSymbol | undefined): Type | undefined {
  const type = getTypeOfSymbol(symbol);
  if (type !== undefined) return type;
  if (symbol === undefined) return undefined;
  return {
    flags: TypeFlags.Object,
    id: nextSymbolTypesSyntheticTypeId(),
    symbol,
    data: { objectFlags: ObjectFlags.Anonymous },
  };
}

export function getBaseTypeVariableOfClass(type: Type | undefined): Type | undefined {
  return (type?.data as { baseTypeVariable?: Type; thisType?: Type } | undefined)?.baseTypeVariable
    ?? (type?.data as { thisType?: Type } | undefined)?.thisType;
}

export function getBaseConstructorTypeOfClass(type: Type | undefined): Type | undefined {
  return (type?.data as { baseConstructorType?: Type; resolvedBaseTypes?: readonly Type[] } | undefined)?.baseConstructorType
    ?? (type?.data as { resolvedBaseTypes?: readonly Type[] } | undefined)?.resolvedBaseTypes?.[0];
}

export function isConstructorType(type: Type | undefined): boolean {
  return ((type?.data as ObjectType | undefined)?.declaredConstructSignatures?.length ?? 0) > 0;
}

export function isMixinConstructorType(type: Type | undefined): boolean {
  if (!isConstructorType(type)) return false;
  const constructSignatures = (type?.data as ObjectType | undefined)?.declaredConstructSignatures ?? [];
  return constructSignatures.some((signature) => signature.parameters.length === 1 || (signature.flags & SignatureFlags.HasRestParameter) !== 0);
}

export function getTypeOfParameter(parameter: AstSymbol | AstNode | undefined): Type | undefined {
  if (parameter === undefined) return undefined;
  return isAstNode(parameter) ? getTypeOfSymbol(parameter.symbol) : getTypeOfSymbol(parameter);
}

export function getConstraintOfType(type: Type | undefined): Type | undefined {
  if (type === undefined) return undefined;
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return getConstraintFromTypeParameter(type.data as TypeParameter | undefined);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getConstraintOfIndexedAccess(type);
  return (type.data as { constraint?: Type } | undefined)?.constraint;
}

export function hasNonCircularBaseConstraint(type: Type | undefined): boolean {
  const constraint = getConstraintOfType(type);
  return constraint !== undefined && constraint !== type;
}

export function getConstraintFromTypeParameter(typeParameter: TypeParameter | undefined): Type | undefined {
  return typeParameter?.constraint;
}

export function getConstraintOrUnknownFromTypeParameter(typeParameter: TypeParameter | undefined): Type {
  return getConstraintFromTypeParameter(typeParameter) ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getInferredTypeParameterConstraint(typeParameter: TypeParameter | undefined): Type | undefined {
  return (typeParameter as { inferredConstraint?: Type } | undefined)?.inferredConstraint ?? typeParameter?.constraint;
}

export function getTypeParametersForTypeReferenceOrImport(type: Type | undefined): readonly TypeParameter[] {
  return ((type?.data as TypeReference | undefined)?.target as InterfaceType | undefined)?.typeParameters ?? [];
}

export function getTypeParametersForTypeAndSymbol(type: Type | undefined, symbol: AstSymbol | undefined): readonly TypeParameter[] {
  return getTypeParametersForTypeReferenceOrImport(type)
    ?? (symbol as unknown as { typeParameters?: readonly TypeParameter[] } | undefined)?.typeParameters
    ?? [];
}

export function getEffectiveTypeArgumentAtIndex(type: Type | undefined, index: int): Type | undefined {
  const data = type?.data as TypeReference | undefined;
  return data?.resolvedTypeArguments?.[index] ?? data?.resolvedTypeArguments_?.[index];
}

export function getConstraintOfIndexedAccess(type: Type | undefined): Type | undefined {
  const data = type?.data as IndexedAccessType | undefined;
  return data?.constraint ?? data?.objectType;
}

function isReadonlySymbol(symbol: AstSymbol): boolean {
  const flags = symbol.flags ?? 0;
  return ((flags & SymbolFlags.EnumMember) !== 0)
    || (((flags & SymbolFlags.Property) !== 0) && symbol.declarations.some((declaration) => hasSyntacticModifier(declaration, ModifierFlags.Readonly)))
    || (((flags & SymbolFlags.Variable) !== 0) && symbol.declarations.some((declaration) => (getCombinedNodeFlags(declaration) & NodeFlags.Const) !== 0));
}

function isReadonlyExpression(expression: AstNode | undefined): boolean {
  return expression !== undefined && isReadonlyAssignmentDeclaration(expression);
}

function removeMissingType(type: Type): Type {
  if ((type.flags & TypeFlags.VoidLike) !== 0) return intrinsicType(TypeFlags.Never, "never");
  if ((type.flags & TypeFlags.Union) === 0) return type;
  const parts = unionTypes(type).filter((part) => (part.flags & TypeFlags.VoidLike) === 0);
  if (parts.length === 0) return intrinsicType(TypeFlags.Never, "never");
  if (parts.length === 1) return parts[0]!;
  return { ...type, data: { ...(type.data as object), types: parts } };
}

function unionTypes(type: Type): readonly Type[] {
  return (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
}

function field<T>(node: unknown, name: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[name];
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function propertyNameText(node: AstNode | undefined): string | undefined {
  const text = nodeText(node);
  return text.length === 0 ? undefined : text;
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return {
    flags,
    id: nextSymbolTypesSyntheticTypeId(),
    data: { intrinsicName, objectFlags: ObjectFlags.None },
  };
}

let symbolTypesSyntheticTypeId = -1;

function nextSymbolTypesSyntheticTypeId(): number {
  const id = symbolTypesSyntheticTypeId;
  symbolTypesSyntheticTypeId -= 1;
  return id;
}

const commonDomTypeNames = new Set([
  "Window",
  "Document",
  "Element",
  "HTMLElement",
  "Event",
  "Node",
  "CSSStyleDeclaration",
  "URL",
  "Request",
  "Response",
]);
