/**
 * Node-builder serialization support.
 *
 * TS-Go nodebuilderimpl.go converts checker Types, Symbols, Signatures, and
 * IndexInfos back into AST type nodes. This split module keeps the core
 * serialization decisions as reusable data operations for declaration emit,
 * hover display, and diagnostics.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import {
  ObjectFlags,
  SignatureKind,
  TypeFlags,
  type IndexInfo,
  type Signature,
  type Type,
  type TypeParameter,
} from "./types.js";

export type SerializedTypeNodeKind =
  | "keyword"
  | "literal"
  | "array"
  | "tuple"
  | "union"
  | "intersection"
  | "type-reference"
  | "type-literal"
  | "function-type"
  | "constructor-type"
  | "indexed-access"
  | "conditional"
  | "mapped"
  | "template-literal"
  | "unknown";

export interface NodeBuilderContext {
  readonly enclosingDeclaration?: AstNode;
  readonly flags: number;
  readonly tracker?: SymbolTrackerLike;
  readonly maxDepth: number;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getSignaturesOfType?: (type: Type, kind: SignatureKind) => readonly Signature[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly typeToString?: (type: Type) => string;
}

export interface SymbolTrackerLike {
  readonly trackSymbol?: (symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: SymbolFlags) => void;
  readonly reportCyclicStructure?: (type: Type) => void;
  readonly reportInaccessibleThisError?: () => void;
  readonly moduleSpecifier?: (symbol: AstSymbol) => string | undefined;
}

export interface SerializedTypeNode {
  readonly kind: SerializedTypeNodeKind;
  readonly text?: string;
  readonly symbol?: AstSymbol;
  readonly children?: readonly SerializedTypeNode[];
  readonly parameters?: readonly SerializedParameterNode[];
  readonly typeParameters?: readonly SerializedTypeParameterNode[];
  readonly readonly?: boolean;
  readonly optional?: boolean;
  readonly rest?: boolean;
}

export interface SerializedParameterNode {
  readonly name: string;
  readonly type: SerializedTypeNode;
  readonly optional: boolean;
  readonly rest: boolean;
}

export interface SerializedTypeParameterNode {
  readonly name: string;
  readonly constraint?: SerializedTypeNode;
  readonly defaultType?: SerializedTypeNode;
}

export interface SerializedSymbolChain {
  readonly left?: SerializedSymbolChain;
  readonly symbol: AstSymbol;
  readonly text: string;
}

export function typeToTypeNode(type: Type, context: NodeBuilderContext, depth = 0): SerializedTypeNode {
  if (depth > context.maxDepth) {
    context.tracker?.reportCyclicStructure?.(type);
    return { kind: "unknown", text: "..." };
  }
  const keyword = keywordTypeNode(type);
  if (keyword !== undefined) return keyword;
  if ((type.flags & TypeFlags.Literal) !== 0) return literalTypeNode(type);
  if ((type.flags & TypeFlags.Union) !== 0) return unionOrIntersectionTypeNode(type, context, depth, "union");
  if ((type.flags & TypeFlags.Intersection) !== 0) return unionOrIntersectionTypeNode(type, context, depth, "intersection");
  if ((type.flags & TypeFlags.Object) !== 0) return objectTypeNode(type, context, depth);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return indexedAccessTypeNode(type, context, depth);
  if ((type.flags & TypeFlags.Conditional) !== 0) return conditionalTypeNode(type, context, depth);
  if ((type.flags & TypeFlags.TemplateLiteral) !== 0) return templateLiteralTypeNode(type, context, depth);
  return { kind: "unknown", text: context.typeToString?.(type) ?? type.symbol?.name ?? "unknown" };
}

export function keywordTypeNode(type: Type): SerializedTypeNode | undefined {
  if ((type.flags & TypeFlags.Any) !== 0) return { kind: "keyword", text: "any" };
  if ((type.flags & TypeFlags.Unknown) !== 0) return { kind: "keyword", text: "unknown" };
  if ((type.flags & TypeFlags.Never) !== 0) return { kind: "keyword", text: "never" };
  if ((type.flags & TypeFlags.Void) !== 0) return { kind: "keyword", text: "void" };
  if ((type.flags & TypeFlags.String) !== 0) return { kind: "keyword", text: "string" };
  if ((type.flags & TypeFlags.Number) !== 0) return { kind: "keyword", text: "number" };
  if ((type.flags & TypeFlags.Boolean) !== 0) return { kind: "keyword", text: "boolean" };
  if ((type.flags & TypeFlags.BigInt) !== 0) return { kind: "keyword", text: "bigint" };
  if ((type.flags & TypeFlags.ESSymbol) !== 0) return { kind: "keyword", text: "symbol" };
  if ((type.flags & TypeFlags.Null) !== 0) return { kind: "literal", text: "null" };
  if ((type.flags & TypeFlags.Undefined) !== 0) return { kind: "keyword", text: "undefined" };
  return undefined;
}

export function literalTypeNode(type: Type): SerializedTypeNode {
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  return { kind: "literal", text: JSON.stringify(value ?? type.symbol?.name ?? "") };
}

export function unionOrIntersectionTypeNode(
  type: Type,
  context: NodeBuilderContext,
  depth: number,
  kind: "union" | "intersection",
): SerializedTypeNode {
  const types = constituentTypes(type).map(part => typeToTypeNode(part, context, depth + 1));
  return { kind, children: types };
}

export function objectTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const objectFlags = (type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None;
  if ((objectFlags & ObjectFlags.Tuple) !== 0) return tupleTypeNode(type, context, depth);
  if ((objectFlags & ObjectFlags.Reference) !== 0 && type.symbol !== undefined) return typeReferenceNode(type, context, depth);
  const call = context.getSignaturesOfType?.(type, SignatureKind.Call) ?? [];
  const construct = context.getSignaturesOfType?.(type, SignatureKind.Construct) ?? [];
  if (call.length === 1 && (context.getPropertiesOfType?.(type) ?? []).length === 0) return signatureToTypeNode(call[0]!, context, depth, "function-type");
  if (construct.length === 1 && (context.getPropertiesOfType?.(type) ?? []).length === 0) return signatureToTypeNode(construct[0]!, context, depth, "constructor-type");
  return anonymousTypeNode(type, context, depth);
}

export function typeReferenceNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const symbol = type.symbol;
  if (symbol !== undefined) context.tracker?.trackSymbol?.(symbol, context.enclosingDeclaration, SymbolFlags.Type);
  const args = typeArguments(type).map(arg => typeToTypeNode(arg, context, depth + 1));
  return {
    kind: "type-reference",
    text: symbol === undefined ? "anonymous" : serializeEntityName(symbol, context).text,
    ...(symbol === undefined ? {} : { symbol }),
    children: args,
  };
}

export function tupleTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const args = typeArguments(type).map(arg => typeToTypeNode(arg, context, depth + 1));
  const readonlyTuple = Boolean((type.data as { readonly readonly?: boolean } | undefined)?.readonly);
  return { kind: "tuple", children: args, readonly: readonlyTuple };
}

export function anonymousTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const properties = (context.getPropertiesOfType?.(type) ?? []).map(symbol => symbolToPropertyTypeNode(symbol, context, depth + 1));
  const callSignatures = (context.getSignaturesOfType?.(type, SignatureKind.Call) ?? []).map(signature => signatureToTypeNode(signature, context, depth + 1, "function-type"));
  const constructSignatures = (context.getSignaturesOfType?.(type, SignatureKind.Construct) ?? []).map(signature => signatureToTypeNode(signature, context, depth + 1, "constructor-type"));
  const indexInfos = (context.getIndexInfosOfType?.(type) ?? []).map(info => indexInfoToTypeNode(info, context, depth + 1));
  return {
    kind: "type-literal",
    children: [...properties, ...callSignatures, ...constructSignatures, ...indexInfos],
  };
}

export function symbolToPropertyTypeNode(symbol: AstSymbol, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  context.tracker?.trackSymbol?.(symbol, context.enclosingDeclaration, SymbolFlags.Property);
  const symbolType = (symbol as { readonly syntheticType?: Type }).syntheticType;
  const typeNode = symbolType === undefined ? { kind: "unknown", text: "unknown" } as SerializedTypeNode : typeToTypeNode(symbolType, context, depth + 1);
  return {
    kind: "type-literal",
    text: symbol.name ?? symbol.escapedName ?? "",
    symbol,
    children: [typeNode],
    optional: ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0,
    readonly: Boolean((symbol as { readonly readonly?: boolean }).readonly),
  };
}

export function signatureToTypeNode(
  signature: Signature,
  context: NodeBuilderContext,
  depth: number,
  kind: "function-type" | "constructor-type",
): SerializedTypeNode {
  return {
    kind,
    typeParameters: (signature.typeParameters ?? []).map(typeParameter => typeParameterToDeclaration(typeParameter, context, depth + 1)),
    parameters: signature.parameters.map(parameter => symbolToParameterDeclaration(parameter, context, depth + 1)),
    children: [typeToTypeNode(signature.resolvedReturnType ?? unknownSerializedBacking(), context, depth + 1)],
  };
}

export function symbolToParameterDeclaration(symbol: AstSymbol, context: NodeBuilderContext, depth: number): SerializedParameterNode {
  const type = (symbol as { readonly syntheticType?: Type }).syntheticType;
  return {
    name: symbol.name ?? symbol.escapedName ?? "arg",
    type: type === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(type, context, depth + 1),
    optional: ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0,
    rest: Boolean((symbol as { readonly rest?: boolean }).rest),
  };
}

export function typeParameterToDeclaration(typeParameter: TypeParameter, context: NodeBuilderContext, depth: number): SerializedTypeParameterNode {
  const name = typeParameterSymbolName(typeParameter);
  const constraint = typeParameter.constraint === undefined ? undefined : typeToTypeNode(typeParameter.constraint, context, depth + 1);
  const defaultType = (typeParameter as { readonly defaultType?: Type }).defaultType;
  const serializedDefault = defaultType === undefined ? undefined : typeToTypeNode(defaultType, context, depth + 1);
  return {
    name,
    ...(constraint === undefined ? {} : { constraint }),
    ...(serializedDefault === undefined ? {} : { defaultType: serializedDefault }),
  };
}

export function indexInfoToTypeNode(info: IndexInfo, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  return {
    kind: "type-literal",
    text: `[key: ${renderTypeNode(typeToTypeNode(info.keyType, context, depth + 1))}]`,
    children: [typeToTypeNode(info.valueType, context, depth + 1)],
    readonly: info.isReadonly === true,
  };
}

export function indexedAccessTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const data = type.data as { readonly objectType?: Type; readonly indexType?: Type } | undefined;
  const object: SerializedTypeNode = data?.objectType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.objectType, context, depth + 1);
  const index: SerializedTypeNode = data?.indexType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.indexType, context, depth + 1);
  return { kind: "indexed-access", children: [object, index] };
}

export function conditionalTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const data = type.data as { readonly checkType?: Type; readonly extendsType?: Type; readonly trueType?: Type; readonly falseType?: Type } | undefined;
  return {
    kind: "conditional",
    children: [
      data?.checkType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.checkType, context, depth + 1),
      data?.extendsType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.extendsType, context, depth + 1),
      data?.trueType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.trueType, context, depth + 1),
      data?.falseType === undefined ? { kind: "unknown", text: "unknown" } : typeToTypeNode(data.falseType, context, depth + 1),
    ],
  };
}

export function templateLiteralTypeNode(type: Type, context: NodeBuilderContext, depth: number): SerializedTypeNode {
  const data = type.data as { readonly texts?: readonly string[]; readonly types?: readonly Type[] } | undefined;
  const children = (data?.types ?? []).map(part => typeToTypeNode(part, context, depth + 1));
  return { kind: "template-literal", text: (data?.texts ?? []).join("${}"), children };
}

export function serializeEntityName(symbol: AstSymbol, context: NodeBuilderContext): SerializedSymbolChain {
  const parent = symbol.parent;
  const left = parent === undefined ? undefined : serializeEntityName(parent, context);
  const moduleSpecifier = context.tracker?.moduleSpecifier?.(symbol);
  return {
    ...(left === undefined ? {} : { left }),
    symbol,
    text: moduleSpecifier ?? symbol.name ?? symbol.escapedName ?? "",
  };
}

export function createTypeNodesFromResolvedType(type: Type, context: NodeBuilderContext): readonly SerializedTypeNode[] {
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).map(part => typeToTypeNode(part, context));
  return [typeToTypeNode(type, context)];
}

export function renderTypeNode(node: SerializedTypeNode): string {
  switch (node.kind) {
    case "keyword":
    case "literal":
    case "type-reference":
    case "unknown":
      return node.text ?? "unknown";
    case "array":
      return `${renderTypeNode(node.children?.[0] ?? { kind: "unknown", text: "unknown" })}[]`;
    case "tuple":
      return `[${(node.children ?? []).map(renderTypeNode).join(", ")}]`;
    case "union":
      return (node.children ?? []).map(renderTypeNode).join(" | ");
    case "intersection":
      return (node.children ?? []).map(renderTypeNode).join(" & ");
    case "function-type":
      return `(${(node.parameters ?? []).map(renderParameter).join(", ")}) => ${renderTypeNode(node.children?.[0] ?? { kind: "keyword", text: "void" })}`;
    case "constructor-type":
      return `new (${(node.parameters ?? []).map(renderParameter).join(", ")}) => ${renderTypeNode(node.children?.[0] ?? { kind: "keyword", text: "void" })}`;
    case "indexed-access":
      return `${renderTypeNode(node.children?.[0] ?? { kind: "unknown", text: "unknown" })}[${renderTypeNode(node.children?.[1] ?? { kind: "unknown", text: "unknown" })}]`;
    case "conditional":
      return `${renderTypeNode(node.children?.[0] ?? { kind: "unknown", text: "unknown" })} extends ${renderTypeNode(node.children?.[1] ?? { kind: "unknown", text: "unknown" })} ? ${renderTypeNode(node.children?.[2] ?? { kind: "unknown", text: "unknown" })} : ${renderTypeNode(node.children?.[3] ?? { kind: "unknown", text: "unknown" })}`;
    case "mapped":
    case "type-literal":
      return `{ ${(node.children ?? []).map(renderTypeNode).join("; ")} }`;
    case "template-literal":
      return `\`${node.text ?? ""}\``;
  }
}

export function renderParameter(parameter: SerializedParameterNode): string {
  return `${parameter.rest ? "..." : ""}${parameter.name}${parameter.optional ? "?" : ""}: ${renderTypeNode(parameter.type)}`;
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function typeArguments(type: Type): readonly Type[] {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? [];
}

function typeParameterSymbolName(typeParameter: TypeParameter): string {
  return (typeParameter as Type & { readonly symbol?: AstSymbol }).symbol?.name
    ?? (typeParameter as Type & { readonly symbol?: AstSymbol }).symbol?.escapedName
    ?? "T";
}

function unknownSerializedBacking(): Type {
  return { flags: TypeFlags.Unknown, id: -9_100_001 };
}
