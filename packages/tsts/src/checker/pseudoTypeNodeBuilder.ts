import type {
  Node as AstNode,
  DotDotDotToken,
  NodeArray,
  ParameterDeclaration,
  QuestionToken,
  TypeElement,
  TypeNode,
  TypeParameterDeclaration,
} from "../ast/index.js";
import {
  createFunctionTypeNode,
  createIdentifier,
  createKeywordExpression,
  createKeywordTypeNode,
  createLiteralTypeNode,
  createMethodSignatureDeclaration,
  createNodeArray,
  createParameterDeclaration,
  createPropertySignatureDeclaration,
  createStringLiteral,
  createToken,
  createTupleTypeNode,
  createTypeLiteralNode,
  createTypeOperatorNode,
  createUnionTypeNode,
  isTypeNode,
  Kind,
} from "../ast/index.js";
import { NodeBuilder, NodeBuilderFlags } from "./nodeBuilder.js";
import type { Signature, Type } from "./types.js";

export type PseudoTypeKind =
  | "direct"
  | "inferred"
  | "noResult"
  | "maybeConstLocation"
  | "union"
  | "undefined"
  | "null"
  | "any"
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "false"
  | "true"
  | "singleCallSignature"
  | "tuple"
  | "objectLiteral"
  | "stringLiteral";

export type PseudoType =
  | { readonly kind: "direct"; readonly typeNode: TypeNode }
  | { readonly kind: "inferred"; readonly expression: AstNode; readonly errorNodes?: readonly AstNode[] }
  | { readonly kind: "noResult"; readonly declaration: AstNode }
  | { readonly kind: "maybeConstLocation"; readonly constType: PseudoType; readonly regularType: PseudoType; readonly inConstContext: boolean }
  | { readonly kind: "union"; readonly types: readonly PseudoType[] }
  | { readonly kind: "undefined" | "null" | "any" | "string" | "number" | "bigint" | "boolean" | "false" | "true" }
  | { readonly kind: "singleCallSignature"; readonly signature: Signature; readonly typeParameters?: readonly Type[]; readonly parameters: readonly PseudoParameter[]; readonly returnType: PseudoType }
  | { readonly kind: "tuple"; readonly elements: readonly PseudoType[]; readonly readonlyTuple?: boolean }
  | { readonly kind: "objectLiteral"; readonly elements: readonly PseudoObjectElement[]; readonly readonlyProperties?: boolean }
  | { readonly kind: "stringLiteral"; readonly text: string };

export interface PseudoParameter {
  readonly name: string;
  readonly type: PseudoType;
  readonly optional?: boolean;
  readonly rest?: boolean;
}

export type PseudoObjectElement =
  | { readonly kind: "property"; readonly name: string; readonly type: PseudoType; readonly optional?: boolean; readonly readonly?: boolean }
  | { readonly kind: "method"; readonly name: string; readonly parameters: readonly PseudoParameter[]; readonly returnType: PseudoType; readonly typeParameters?: readonly Type[]; readonly optional?: boolean };

export interface PseudoTypeNodeBuilderOptions {
  readonly fallbackType?: Type;
  readonly strictNullChecks?: boolean;
  readonly reportInferenceFallback?: (node: AstNode) => void;
}

export class PseudoTypeNodeBuilder {
  private readonly builder: NodeBuilder;
  private readonly enclosingDeclaration: AstNode | undefined;
  private readonly flags: NodeBuilderFlags;

  constructor(builder: NodeBuilder = new NodeBuilder(), enclosingDeclaration?: AstNode, flags: NodeBuilderFlags = NodeBuilderFlags.None) {
    this.builder = builder;
    this.enclosingDeclaration = enclosingDeclaration;
    this.flags = flags;
  }

  buildPseudoTypeNode(type: PseudoType | Type, options: PseudoTypeNodeBuilderOptions = {}): TypeNode | undefined {
    if (isCheckerType(type)) return this.builder.typeToTypeNode(type, this.enclosingDeclaration, this.flags);
    return this.pseudoTypeToNodeWithCheckerFallback(type, options.fallbackType, options);
  }

  buildPseudoTypeParameter(parameter: Type): AstNode | undefined {
    return this.builder.typeParameterToDeclaration(parameter, this.enclosingDeclaration, this.flags);
  }

  pseudoTypeToNodeWithCheckerFallback(
    pseudoType: PseudoType,
    checkerType: Type | undefined,
    options: PseudoTypeNodeBuilderOptions = {},
  ): TypeNode | undefined {
    if (pseudoType.kind === "inferred") {
      this.reportFallback(pseudoType, options);
      return checkerType === undefined ? undefined : this.builder.typeToTypeNode(checkerType, this.enclosingDeclaration, this.flags);
    }
    return this.pseudoTypeToNode(pseudoType, options);
  }

  pseudoTypeToNode(pseudoType: PseudoType, options: PseudoTypeNodeBuilderOptions = {}): TypeNode | undefined {
    switch (pseudoType.kind) {
      case "direct":
        return pseudoType.typeNode;
      case "inferred":
        this.reportFallback(pseudoType, options);
        return undefined;
      case "noResult":
        options.reportInferenceFallback?.(pseudoType.declaration);
        return undefined;
      case "maybeConstLocation":
        return this.pseudoTypeToNode(pseudoType.inConstContext ? pseudoType.constType : pseudoType.regularType, options);
      case "union":
        return this.unionPseudoTypeToNode(pseudoType.types, options);
      case "undefined":
        return options.strictNullChecks === false ? createKeywordTypeNode(Kind.AnyKeyword) : createKeywordTypeNode(Kind.UndefinedKeyword);
      case "null":
        return options.strictNullChecks === false ? createKeywordTypeNode(Kind.AnyKeyword) : createLiteralTypeNode(createKeywordExpression(Kind.NullKeyword));
      case "any":
        return createKeywordTypeNode(Kind.AnyKeyword);
      case "string":
        return createKeywordTypeNode(Kind.StringKeyword);
      case "number":
        return createKeywordTypeNode(Kind.NumberKeyword);
      case "bigint":
        return createKeywordTypeNode(Kind.BigIntKeyword);
      case "boolean":
        return createKeywordTypeNode(Kind.BooleanKeyword);
      case "false":
        return createLiteralTypeNode(createKeywordExpression(Kind.FalseKeyword));
      case "true":
        return createLiteralTypeNode(createKeywordExpression(Kind.TrueKeyword));
      case "singleCallSignature":
        return this.singleCallSignatureToNode(pseudoType, options);
      case "tuple":
        return this.tuplePseudoTypeToNode(pseudoType, options);
      case "objectLiteral":
        return this.objectLiteralPseudoTypeToNode(pseudoType, options);
      case "stringLiteral":
        return createLiteralTypeNode(createStringLiteral(pseudoType.text, 0));
    }
  }

  private unionPseudoTypeToNode(types: readonly PseudoType[], options: PseudoTypeNodeBuilderOptions): TypeNode {
    const nodes = types
      .map(type => this.pseudoTypeToNode(type, options))
      .filter((node): node is TypeNode => node !== undefined);
    if (nodes.length === 0) return createKeywordTypeNode(Kind.NeverKeyword);
    if (nodes.length === 1) return nodes[0]!;
    return createUnionTypeNode(createNodeArray(nodes));
  }

  private singleCallSignatureToNode(
    pseudoType: Extract<PseudoType, { readonly kind: "singleCallSignature" }>,
    options: PseudoTypeNodeBuilderOptions,
  ): TypeNode {
    void pseudoType.signature;
    const typeParameters = pseudoType.typeParameters === undefined
      ? undefined
      : createNodeArray(pseudoType.typeParameters
        .map(type => this.builder.typeParameterToDeclaration(type, this.enclosingDeclaration, this.flags))
        .filter(isTypeParameterDeclaration)) as NodeArray<TypeParameterDeclaration>;
    return createFunctionTypeNode(
      typeParameters,
      createNodeArray(pseudoType.parameters.map(parameter => this.pseudoParameterToNode(parameter, options))),
      this.pseudoTypeToNode(pseudoType.returnType, options),
    );
  }

  private tuplePseudoTypeToNode(
    pseudoType: Extract<PseudoType, { readonly kind: "tuple" }>,
    options: PseudoTypeNodeBuilderOptions,
  ): TypeNode {
    const tuple = createTupleTypeNode(createNodeArray(pseudoType.elements
      .map(element => this.pseudoTypeToNode(element, options))
      .filter((node): node is TypeNode => node !== undefined)));
    return pseudoType.readonlyTuple === true ? createTypeOperatorNode(Kind.ReadonlyKeyword, tuple) : tuple;
  }

  private objectLiteralPseudoTypeToNode(
    pseudoType: Extract<PseudoType, { readonly kind: "objectLiteral" }>,
    options: PseudoTypeNodeBuilderOptions,
  ): TypeNode {
    const elements = pseudoType.elements
      .map(element => this.pseudoObjectElementToNode(element, pseudoType.readonlyProperties === true, options))
      .filter((node): node is TypeElement => node !== undefined);
    return createTypeLiteralNode(createNodeArray(elements));
  }

  private pseudoObjectElementToNode(
    element: PseudoObjectElement,
    readonlyProperties: boolean,
    options: PseudoTypeNodeBuilderOptions,
  ): TypeElement | undefined {
    void readonlyProperties;
    const optionalToken = element.optional === true ? createTokenQuestion() : undefined;
    if (element.kind === "property") {
      const type = this.pseudoTypeToNode(element.type, options);
      if (type === undefined) return undefined;
      return createPropertySignatureDeclaration(undefined, createIdentifier(element.name), optionalToken, type, undefined as never);
    }
    const returnType = this.pseudoTypeToNode(element.returnType, options);
    return createMethodSignatureDeclaration(
      undefined,
      createIdentifier(element.name),
      optionalToken,
      element.typeParameters === undefined ? undefined : createNodeArray(element.typeParameters
        .map(type => this.builder.typeParameterToDeclaration(type, this.enclosingDeclaration, this.flags))
        .filter(isTypeParameterDeclaration)) as NodeArray<TypeParameterDeclaration>,
      createNodeArray(element.parameters.map(parameter => this.pseudoParameterToNode(parameter, options))),
      returnType,
    );
  }

  private pseudoParameterToNode(parameter: PseudoParameter, options: PseudoTypeNodeBuilderOptions): ParameterDeclaration {
    return createParameterDeclaration(
      undefined,
      parameter.rest === true ? createTokenDotDotDot() : undefined,
      createIdentifier(parameter.name),
      parameter.optional === true ? createTokenQuestion() : undefined,
      this.pseudoTypeToNode(parameter.type, options),
      undefined,
    );
  }

  private reportFallback(pseudoType: Extract<PseudoType, { readonly kind: "inferred" }>, options: PseudoTypeNodeBuilderOptions): void {
    const nodes = pseudoType.errorNodes !== undefined && pseudoType.errorNodes.length > 0
      ? pseudoType.errorNodes
      : [pseudoType.expression];
    for (const node of nodes) options.reportInferenceFallback?.(node);
  }
}

export function newPseudoTypeNodeBuilder(
  builder?: NodeBuilder,
  enclosingDeclaration?: AstNode,
  flags?: NodeBuilderFlags,
): PseudoTypeNodeBuilder {
  return new PseudoTypeNodeBuilder(builder, enclosingDeclaration, flags);
}

function createTokenQuestion(): QuestionToken {
  return createToken(Kind.QuestionToken) as QuestionToken;
}

function createTokenDotDotDot(): DotDotDotToken {
  return createToken(Kind.DotDotDotToken) as DotDotDotToken;
}

function isCheckerType(value: PseudoType | Type): value is Type {
  return typeof (value as Type).flags === "number";
}

function isTypeParameterDeclaration(node: AstNode | undefined): node is TypeParameterDeclaration {
  return node !== undefined && node.kind === Kind.TypeParameter;
}

export function pseudoTypeEquivalentToType(pseudoType: PseudoType, typeNode: TypeNode | undefined): boolean {
  if (typeNode === undefined) return false;
  const builder = new PseudoTypeNodeBuilder();
  const pseudoNode = builder.pseudoTypeToNode(pseudoType);
  return pseudoNode !== undefined && isTypeNode(pseudoNode) && pseudoNode.kind === typeNode.kind;
}
