/**
 * Node builder.
 *
 * Substantive port of TS-Go `internal/checker/nodebuilder.go` (~292 LoC).
 *
 * The NodeBuilder constructs type-node AST representations from
 * checker types for declaration emit, hover display, and language-
 * services type queries. Companion files host the hover, scope, pseudo-type,
 * and implementation-state portions of the TS-Go node-builder family.
 *
 * Port scope: full method-API parity for the major typeToTypeNode /
 * signatureToSignatureDeclaration / symbolToExpression / typeToString
 * surface with primitive, literal, union/intersection, signature, object,
 * tuple, array, and type-parameter serialization.
 */

import type { int } from "@tsonic/core/types.js";
import type {
  Node as AstNode,
  KeywordTypeSyntaxKind,
  Symbol as AstSymbol,
  NodeArray,
  ParameterDeclaration,
  TypeParameterDeclaration,
  TypeNode,
} from "../ast/index.js";
import {
  createIdentifier,
  createArrayTypeNode,
  createKeywordExpression,
  createKeywordTypeNode,
  createCallSignatureDeclaration,
  createConstructSignatureDeclaration,
  createConstructorTypeNode,
  createFunctionTypeNode,
  createIndexSignatureDeclaration,
  createIndexedAccessTypeNode,
  createIntersectionTypeNode,
  createLiteralTypeNode,
  createMethodSignatureDeclaration,
  createNodeArray,
  createNumericLiteral,
  createParameterDeclaration,
  createPropertySignatureDeclaration,
  createStringLiteral,
  createTupleTypeNode,
  createTypeOperatorNode,
  createTypeParameterDeclaration,
  createTypeLiteralNode,
  createTypeReferenceNode,
  createUnionTypeNode,
  Kind,
  type TypeElement,
} from "../ast/index.js";
import type { Type, Signature, SymbolFormatFlags, TypeFormatFlags, ObjectType, IndexInfo, TupleType, TypeParameter } from "./types.js";
import { AccessFlags, ObjectFlags, SignatureKind, getTypeOfSymbol, TypeFlags } from "./types.js";
import type { SymbolTracker } from "./symbolTracker.js";

// ---------------------------------------------------------------------------
// NodeBuilderFlags
// ---------------------------------------------------------------------------

export type NodeBuilderFlags = number;
// 1:1 with TS-Go internal/nodebuilder/types.go `Flags` (the public
// node-builder flags). The previous layout was Strada's: shifted high bits
// (InObjectTypeLiteral/InTypeAlias), a literal IgnoreErrors (should be a
// composite), a misplaced DoNotIncludeSymbolChain (that lives in
// SymbolFormatFlags), and missing WriteCallStyleSignature /
// UseInstantiationExpressions / InInitialEntityName.
export const NodeBuilderFlags = {
  None: 0 as NodeBuilderFlags,
  NoTruncation: (1 << 0) as NodeBuilderFlags,
  WriteArrayAsGenericType: (1 << 1) as NodeBuilderFlags,
  GenerateNamesForShadowedTypeParams: (1 << 2) as NodeBuilderFlags,
  UseStructuralFallback: (1 << 3) as NodeBuilderFlags,
  ForbidIndexedAccessSymbolReferences: (1 << 4) as NodeBuilderFlags,
  WriteTypeArgumentsOfSignature: (1 << 5) as NodeBuilderFlags,
  UseFullyQualifiedType: (1 << 6) as NodeBuilderFlags,
  UseOnlyExternalAliasing: (1 << 7) as NodeBuilderFlags,
  SuppressAnyReturnType: (1 << 8) as NodeBuilderFlags,
  WriteTypeParametersInQualifiedName: (1 << 9) as NodeBuilderFlags,
  MultilineObjectLiterals: (1 << 10) as NodeBuilderFlags,
  WriteClassExpressionAsTypeLiteral: (1 << 11) as NodeBuilderFlags,
  UseTypeOfFunction: (1 << 12) as NodeBuilderFlags,
  OmitParameterModifiers: (1 << 13) as NodeBuilderFlags,
  UseAliasDefinedOutsideCurrentScope: (1 << 14) as NodeBuilderFlags,
  UseSingleQuotesForStringLiteralType: (1 << 28) as NodeBuilderFlags,
  NoTypeReduction: (1 << 29) as NodeBuilderFlags,
  UseInstantiationExpressions: (1 << 30) as NodeBuilderFlags,
  OmitThisParameter: (1 << 25) as NodeBuilderFlags,
  WriteCallStyleSignature: (1 << 27) as NodeBuilderFlags,
  AllowThisInObjectLiteral: (1 << 15) as NodeBuilderFlags,
  AllowQualifiedNameInPlaceOfIdentifier: (1 << 16) as NodeBuilderFlags,
  AllowAnonymousIdentifier: (1 << 17) as NodeBuilderFlags,
  AllowEmptyUnionOrIntersection: (1 << 18) as NodeBuilderFlags,
  AllowEmptyTuple: (1 << 19) as NodeBuilderFlags,
  AllowUniqueESSymbolType: (1 << 20) as NodeBuilderFlags,
  AllowEmptyIndexInfoType: (1 << 21) as NodeBuilderFlags,
  AllowNodeModulesRelativePaths: (1 << 26) as NodeBuilderFlags,
  IgnoreErrors: 70221824 as NodeBuilderFlags, // AllowThisInObjectLiteral|AllowQualifiedNameInPlaceOfIdentifier|AllowAnonymousIdentifier|AllowEmptyUnionOrIntersection|AllowEmptyTuple|AllowEmptyIndexInfoType|AllowNodeModulesRelativePaths
  InObjectTypeLiteral: (1 << 22) as NodeBuilderFlags,
  InTypeAlias: (1 << 23) as NodeBuilderFlags,
  InInitialEntityName: (1 << 24) as NodeBuilderFlags,
} as const;

// ---------------------------------------------------------------------------
// NodeBuilder
// ---------------------------------------------------------------------------

export interface NodeBuilderContext {
  enclosingDeclaration: AstNode | undefined;
  flags: NodeBuilderFlags;
  tracker?: SymbolTracker;
  approximateLength: number;
  truncated?: boolean;
  inferTypeParameters?: readonly Type[];
}

export class NodeBuilder {
  // -------------------------------------------------------------------------
  // Top-level entry points
  // -------------------------------------------------------------------------

  typeToTypeNode(
    type: Type, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): TypeNode | undefined {
    void enclosingDeclaration; void flags; void tracker;
    return typeToTypeNodeWorker(type);
  }

  indexInfoToIndexSignatureDeclaration(
    indexInfo: unknown, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void enclosingDeclaration; void flags; void tracker;
    const info = indexInfo as IndexInfo | undefined;
    if (info === undefined) return undefined;
    const keyName = (info.keyType.flags & TypeFlags.NumberLike) !== 0 ? "index" : "key";
    const parameter = createParameterDeclaration(
      undefined,
      undefined,
      createIdentifier(keyName),
      undefined,
      typeToTypeNodeWorker(info.keyType),
      undefined,
    );
    const valueType = typeToTypeNodeWorker(info.valueType);
    return valueType === undefined ? undefined : createIndexSignatureDeclaration(undefined, createNodeArray([parameter]), valueType);
  }

  signatureToSignatureDeclaration(
    signature: Signature, kind: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void enclosingDeclaration; void flags; void tracker;
    const typeParameters = signature.typeParameters === undefined
      ? undefined
      : createNodeArray(signature.typeParameters
        .map((parameter) => this.typeParameterToDeclaration(parameter as Type, enclosingDeclaration, flags, tracker))
        .filter(isAstNode)) as NodeArray<TypeParameterDeclaration>;
    const parameters = createNodeArray(signature.parameters
      .filter((parameter) => !((flags & NodeBuilderFlags.OmitThisParameter) !== 0 && symbolName(parameter) === "this"))
      .map((parameter) => this.symbolToParameterDeclaration(parameter, enclosingDeclaration, flags, tracker))
      .filter(isAstNode)) as NodeArray<ParameterDeclaration>;
    const returnType = signature.resolvedReturnType === undefined ? undefined : typeToTypeNodeWorker(signature.resolvedReturnType);
    if (kind === SignatureKind.Construct || kind === Kind.ConstructSignature || kind === Kind.ConstructorType) {
      return createConstructSignatureDeclaration(typeParameters, parameters, returnType);
    }
    if ((flags & NodeBuilderFlags.WriteCallStyleSignature) !== 0 || kind === Kind.CallSignature) {
      return createCallSignatureDeclaration(typeParameters, parameters, returnType);
    }
    return createFunctionTypeNode(typeParameters, parameters, returnType);
  }

  symbolToEntityName(
    symbol: AstSymbol, meaning: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void meaning; void enclosingDeclaration; void flags; void tracker;
    const name = symbolName(symbol);
    return name === "" ? undefined : createIdentifier(name);
  }

  symbolToExpression(
    symbol: AstSymbol, meaning: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    return this.symbolToEntityName(symbol, meaning, enclosingDeclaration, flags, tracker);
  }

  symbolToTypeParameterDeclarations(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): readonly AstNode[] | undefined {
    const typeParameters = (getTypeOfSymbol(symbol)?.data as { typeParameters?: readonly Type[] } | undefined)?.typeParameters;
    return typeParameters?.map((parameter) => this.typeParameterToDeclaration(parameter, enclosingDeclaration, flags, tracker)).filter(isAstNode);
  }

  symbolToParameterDeclaration(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void enclosingDeclaration; void flags; void tracker;
    const name = symbolName(symbol);
    if (name === "") return undefined;
    const type = getTypeOfSymbol(symbol);
    return createParameterDeclaration(
      undefined,
      undefined,
      createIdentifier(name),
      undefined,
      type === undefined ? undefined : typeToTypeNodeWorker(type),
      undefined,
    );
  }

  typeParameterToDeclaration(
    parameter: Type, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void enclosingDeclaration; void flags; void tracker;
    const name = typeName(parameter);
    if (name === "") return undefined;
    const constraint = (parameter.data as { constraint?: Type } | undefined)?.constraint;
    return createTypeParameterDeclaration(
      undefined,
      createIdentifier(name),
      constraint === undefined ? undefined : typeToTypeNodeWorker(constraint),
      undefined,
      undefined,
    );
  }

  // -------------------------------------------------------------------------
  // Public typeToString surface
  // -------------------------------------------------------------------------

  typeToString(
    type: Type, enclosingDeclaration: AstNode | undefined,
    flags: TypeFormatFlags, tracker?: SymbolTracker,
  ): string {
    void enclosingDeclaration; void flags; void tracker;
    return typeToStringWorker(type);
  }

  symbolToString(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, flags: SymbolFormatFlags,
  ): string {
    void enclosingDeclaration; void meaning; void flags;
    return symbolName(symbol);
  }

  signatureToString(
    signature: Signature, enclosingDeclaration: AstNode | undefined,
    flags: TypeFormatFlags, kind: number,
  ): string {
    void enclosingDeclaration; void flags; void kind;
    const parameters = signature.parameters.map((symbol) => {
      const type = getTypeOfSymbol(symbol);
      return `${symbolName(symbol)}${type === undefined ? "" : `: ${typeToStringWorker(type)}`}`;
    }).join(", ");
    const returnType = signature.resolvedReturnType === undefined ? "void" : typeToStringWorker(signature.resolvedReturnType);
    return `(${parameters}) => ${returnType}`;
  }
}

// ---------------------------------------------------------------------------
// Top-level factory
// ---------------------------------------------------------------------------

export function newNodeBuilder(): NodeBuilder {
  return new NodeBuilder();
}

function typeToTypeNodeWorker(type: Type): TypeNode | undefined {
  const primitive = primitiveKeywordKind(type);
  if (primitive !== undefined) return createKeywordTypeNode(primitive);
  if ((type.flags & TypeFlags.Null) !== 0) return createLiteralTypeNode(createKeywordExpression(Kind.NullKeyword));
  if ((type.flags & TypeFlags.StringLiteral) !== 0) {
    return createLiteralTypeNode(createStringLiteral(String((type.data as { value?: unknown } | undefined)?.value ?? ""), 0));
  }
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) {
    return createLiteralTypeNode(createNumericLiteral(String((type.data as { value?: unknown } | undefined)?.value ?? "0"), 0));
  }
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) {
    const value = (type.data as { value?: unknown } | undefined)?.value === true;
    return createLiteralTypeNode(createKeywordExpression(value ? Kind.TrueKeyword : Kind.FalseKeyword));
  }
  if ((type.flags & TypeFlags.Union) !== 0) {
    const types = (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
    return createUnionTypeNode(createNodeArray(types.map(typeToTypeNodeWorker).filter(isTypeNode)));
  }
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    const types = (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
    return createIntersectionTypeNode(createNodeArray(types.map(typeToTypeNodeWorker).filter(isTypeNode)));
  }
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) {
    const data = type.data as { objectType?: Type; indexType?: Type } | undefined;
    const objectType = data?.objectType === undefined ? undefined : typeToTypeNodeWorker(data.objectType);
    const indexType = data?.indexType === undefined ? undefined : typeToTypeNodeWorker(data.indexType);
    return objectType === undefined || indexType === undefined ? undefined : createIndexedAccessTypeNode(objectType, indexType);
  }
  if ((type.flags & TypeFlags.Object) !== 0) {
    const object = type.data as ObjectType | TupleType | undefined;
    if ((object?.objectFlags ?? 0) & ObjectFlags.Tuple) {
      const tuple = object as TupleType;
      const elements = tuple.elementInfo
        .map((_, index) => {
          const elementIndex: int = index | 0;
          return tupleElementType(type, elementIndex);
        })
        .filter((element): element is Type => element !== undefined)
        .map(typeToTypeNodeWorker)
        .filter(isTypeNode);
      return createTupleTypeNode(createNodeArray(elements));
    }
    const arrayElement = arrayElementType(type);
    if (arrayElement !== undefined && symbolName(type.symbol) !== "ReadonlyArray") {
      const elementNode = typeToTypeNodeWorker(arrayElement);
      return elementNode === undefined ? undefined : createArrayTypeNode(elementNode);
    }
    const members = objectTypeMembersToTypeElements(type);
    if (members.length > 0) {
      return createTypeLiteralNode(createNodeArray(members));
    }
  }
  if ((type.flags & TypeFlags.TypeParameter) !== 0) {
    return createTypeReferenceNode(createIdentifier(typeName(type) || "T"), undefined);
  }
  const name = typeName(type);
  if (name === "") return undefined;
  const typeArguments = typeArgumentsOf(type).map(typeToTypeNodeWorker).filter(isTypeNode);
  return createTypeReferenceNode(createIdentifier(name), typeArguments.length === 0 ? undefined : createNodeArray(typeArguments));
}

function primitiveKeywordKind(type: Type): KeywordTypeSyntaxKind | undefined {
  const flags = type.flags;
  if ((flags & TypeFlags.Any) !== 0) return Kind.AnyKeyword;
  if ((flags & TypeFlags.Unknown) !== 0) return Kind.UnknownKeyword;
  if ((flags & TypeFlags.String) !== 0) return Kind.StringKeyword;
  if ((flags & TypeFlags.Number) !== 0) return Kind.NumberKeyword;
  if ((flags & TypeFlags.BigInt) !== 0) return Kind.BigIntKeyword;
  if ((flags & TypeFlags.Boolean) !== 0) return Kind.BooleanKeyword;
  if ((flags & TypeFlags.ESSymbol) !== 0) return Kind.SymbolKeyword;
  if ((flags & TypeFlags.Void) !== 0) return Kind.VoidKeyword;
  if ((flags & TypeFlags.Undefined) !== 0) return Kind.UndefinedKeyword;
  if ((flags & TypeFlags.Never) !== 0) return Kind.NeverKeyword;
  if ((flags & TypeFlags.NonPrimitive) !== 0 || (flags & TypeFlags.Object) !== 0 && type.symbol === undefined) return Kind.ObjectKeyword;
  return undefined;
}

function typeToStringWorker(type: Type): string {
  const primitive = primitiveKeywordKind(type);
  if (primitive !== undefined) return keywordKindToText(primitive);
  if ((type.flags & TypeFlags.Null) !== 0) return "null";
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return JSON.stringify(String((type.data as { value?: unknown } | undefined)?.value ?? ""));
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return String((type.data as { value?: unknown } | undefined)?.value ?? "0");
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return (type.data as { value?: unknown } | undefined)?.value === true ? "true" : "false";
  if ((type.flags & TypeFlags.Union) !== 0) {
    const types = (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
    return types.map(typeToStringWorker).join(" | ");
  }
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    const types = (type.data as { types?: readonly Type[] } | undefined)?.types ?? [];
    return types.map(typeToStringWorker).join(" & ");
  }
  return typeName(type) || "unknown";
}

function typeName(type: Type): string {
  return symbolName(type.aliasSymbol) || symbolName(type.symbol) || ((type.data as { intrinsicName?: string } | undefined)?.intrinsicName ?? "");
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function isTypeNode(node: TypeNode | undefined): node is TypeNode {
  return node !== undefined;
}

function isAstNode(node: AstNode | undefined): node is AstNode {
  return node !== undefined;
}

function keywordKindToText(kind: Kind): string {
  switch (kind) {
    case Kind.AnyKeyword: return "any";
    case Kind.UnknownKeyword: return "unknown";
    case Kind.StringKeyword: return "string";
    case Kind.NumberKeyword: return "number";
    case Kind.BigIntKeyword: return "bigint";
    case Kind.BooleanKeyword: return "boolean";
    case Kind.SymbolKeyword: return "symbol";
    case Kind.VoidKeyword: return "void";
    case Kind.UndefinedKeyword: return "undefined";
    case Kind.NullKeyword: return "null";
    case Kind.NeverKeyword: return "never";
    case Kind.ObjectKeyword: return "object";
  }
  return "unknown";
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return type.aliasTypeArguments
    ?? (type.data as ObjectType | undefined)?.resolvedTypeArguments
    ?? (type.data as { resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? [];
}

function arrayElementType(type: Type): Type | undefined {
  return (type.data as { elementType?: Type } | undefined)?.elementType
    ?? typeArgumentsOf(type)[0];
}

function tupleElementType(type: Type, index: int): Type | undefined {
  return typeArgumentsOf(type)[index];
}

function objectTypeMembersToTypeElements(type: Type): readonly TypeElement[] {
  const data = type.data as ObjectType | undefined;
  const members: TypeElement[] = [];
  for (const property of data?.declaredProperties ?? []) {
    const propertyType = getTypeOfSymbol(property);
    const propertyTypeNode = propertyType === undefined ? undefined : typeToTypeNodeWorker(propertyType);
    const name = symbolName(property);
    if (name.length === 0 || propertyTypeNode === undefined) continue;
    members.push(createPropertySignatureDeclaration(
      undefined,
      createIdentifier(name),
      undefined,
      propertyTypeNode,
      undefined as never,
    ));
  }
  for (const signature of data?.declaredCallSignatures ?? []) {
    const node = signatureToTypeElement(signature, SignatureKind.Call);
    if (node !== undefined) members.push(node as TypeElement);
  }
  for (const signature of data?.declaredConstructSignatures ?? []) {
    const node = signatureToTypeElement(signature, SignatureKind.Construct);
    if (node !== undefined) members.push(node as TypeElement);
  }
  for (const indexInfo of data?.indexInfos ?? []) {
    const node = indexInfoToTypeElement(indexInfo);
    if (node !== undefined) members.push(node as TypeElement);
  }
  return members;
}

function signatureToTypeElement(signature: Signature, kind: SignatureKind): AstNode | undefined {
  const builder = new NodeBuilder();
  return builder.signatureToSignatureDeclaration(signature, kind, undefined, NodeBuilderFlags.None);
}

function indexInfoToTypeElement(indexInfo: IndexInfo): AstNode | undefined {
  return new NodeBuilder().indexInfoToIndexSignatureDeclaration(indexInfo, undefined, NodeBuilderFlags.None);
}
