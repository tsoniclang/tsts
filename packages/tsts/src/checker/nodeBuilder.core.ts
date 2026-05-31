/**
 * Node-builder context parity.
 *
 * Conceptual split from TS-Go `nodebuilder.go`: context stack management,
 * declaration/expression serializers, and node-builder factory entry points.
 */

import type { Node as AstNode } from "../ast/index.js";
import type { Signature, Type, TypeParameter, TypePredicate } from "./types.js";
import { TypeFlags } from "./types.js";

export interface NodeBuilderContext {
  readonly enclosingDeclaration?: AstNode;
  flags: number;
  internalFlags: number;
  approxLength: number;
  truncating: boolean;
}

export interface NodeBuilder {
  readonly contexts: NodeBuilderContext[];
  readonly maxLength: number;
}

export function emitContext(builder: NodeBuilder): NodeBuilderContext | undefined {
  return builder.contexts[builder.contexts.length - 1];
}

export function enterContext(builder: NodeBuilder, context: NodeBuilderContext): void {
  builder.contexts.push(context);
}

export function propagateVerbosityOut(builder: NodeBuilder, child: NodeBuilderContext): void {
  const parent = builder.contexts[builder.contexts.length - 1];
  if (parent === undefined) return;
  parent.approxLength += child.approxLength;
  parent.truncating ||= child.truncating;
}

export function popContext(builder: NodeBuilder): NodeBuilderContext | undefined {
  return builder.contexts.pop();
}

export function exitContext(builder: NodeBuilder, context: NodeBuilderContext): void {
  const popped = popContext(builder);
  if (popped !== context) throw new Error("NodeBuilder context stack imbalance.");
  propagateVerbosityOut(builder, context);
}

export function exitContextSlice(builder: NodeBuilder, contexts: readonly NodeBuilderContext[]): void {
  for (let index = contexts.length - 1; index >= 0; index--) exitContext(builder, contexts[index]!);
}

export function exitContextCheck(builder: NodeBuilder, context: NodeBuilderContext): boolean {
  const top = emitContext(builder);
  if (top !== context) return false;
  exitContext(builder, context);
  return true;
}

export function serializeReturnTypeForSignature(signature: Signature, builder = newNodeBuilderEx()): AstNode {
  const returnType = signature.resolvedReturnType ?? intrinsicType(TypeFlags.Unknown, "unknown");
  return typeToTypeNode(returnType, builder);
}

export function serializeTypeParametersForSignature(signature: Signature, builder = newNodeBuilderEx()): readonly AstNode[] {
  return (signature.typeParameters ?? []).map(typeParameter => typeParameterToTypeParameterNode(typeParameter, builder));
}

export function serializeTypeForDeclaration(type: Type, declaration: AstNode | undefined, builder = newNodeBuilderEx()): AstNode {
  enterContext(builder, newContext(declaration, 0));
  const node = typeToTypeNode(type, builder);
  exitContextCheck(builder, emitContext(builder)!);
  return node;
}

export function serializeTypeForExpression(type: Type, expression: AstNode | undefined, builder = newNodeBuilderEx()): AstNode {
  enterContext(builder, newContext(expression, 0));
  const node = typeToTypeNode(type, builder);
  exitContextCheck(builder, emitContext(builder)!);
  return node;
}

export function simplifyClassDeclaration(node: AstNode): AstNode {
  return {
    ...node,
    members: nodeArray((node as { readonly members?: unknown }).members).filter(member => !isPrivateSyntheticMember(member)),
  } as unknown as AstNode;
}

export function simplifyModifiers(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly modifiers?: unknown }).modifiers).filter(modifier => nodeText(modifier) !== "declare");
}

export function typePredicateToTypePredicateNode(predicate: TypePredicate | undefined, builder = newNodeBuilderEx()): AstNode | undefined {
  if (predicate === undefined) return undefined;
  return {
    kind: 0,
    parameterName: predicate.parameterName,
    type: predicate.type === undefined ? undefined : typeToTypeNode(predicate.type, builder),
  } as unknown as AstNode;
}

export function newNodeBuilderEx(maxLength = 160): NodeBuilder {
  return { contexts: [], maxLength };
}

export function getNodeBuilder(): NodeBuilder {
  return defaultNodeBuilder;
}

export function getNodeBuilderEx(maxLength = 160): NodeBuilder {
  return newNodeBuilderEx(maxLength);
}

function newContext(enclosingDeclaration: AstNode | undefined, flags: number): NodeBuilderContext {
  return {
    ...(enclosingDeclaration === undefined ? {} : { enclosingDeclaration }),
    flags,
    internalFlags: 0,
    approxLength: 0,
    truncating: false,
  };
}

function typeToTypeNode(type: Type, builder: NodeBuilder): AstNode {
  const text = typeToString(type);
  const context = emitContext(builder);
  if (context !== undefined) {
    context.approxLength += text.length;
    if (context.approxLength > builder.maxLength) context.truncating = true;
  }
  return { kind: kindForType(type), text } as unknown as AstNode;
}

function typeParameterToTypeParameterNode(typeParameter: TypeParameter, builder: NodeBuilder): AstNode {
  const symbol = (typeParameter as { readonly symbol?: { readonly name?: string; readonly escapedName?: string } }).symbol;
  const constraint = typeParameter.constraint === undefined ? undefined : typeToTypeNode(typeParameter.constraint, builder);
  return {
    kind: 0,
    name: { kind: 0, text: symbol?.name ?? symbol?.escapedName ?? "T" },
    ...(constraint === undefined ? {} : { constraint }),
  } as unknown as AstNode;
}

function typeToString(type: Type): string {
  if ((type.flags & TypeFlags.String) !== 0) return "string";
  if ((type.flags & TypeFlags.Number) !== 0) return "number";
  if ((type.flags & TypeFlags.Boolean) !== 0) return "boolean";
  if ((type.flags & TypeFlags.Void) !== 0) return "void";
  if ((type.flags & TypeFlags.Any) !== 0) return "any";
  if ((type.flags & TypeFlags.Unknown) !== 0) return "unknown";
  if ((type.flags & TypeFlags.Never) !== 0) return "never";
  if ((type.flags & TypeFlags.Union) !== 0) return ((type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? []).map(typeToString).join(" | ");
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

function kindForType(type: Type): number {
  if ((type.flags & TypeFlags.String) !== 0) return 150;
  if ((type.flags & TypeFlags.Number) !== 0) return 151;
  if ((type.flags & TypeFlags.Boolean) !== 0) return 136;
  if ((type.flags & TypeFlags.Void) !== 0) return 116;
  return 0;
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: -2_250_000, data: { intrinsicName } };
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function nodeText(node: AstNode): string {
  return (node as { readonly text?: string }).text ?? "";
}

function isPrivateSyntheticMember(node: AstNode): boolean {
  const name = nodeText((node as { readonly name?: AstNode }).name ?? node);
  return name.startsWith("#__") || name.startsWith("__private");
}

const defaultNodeBuilder = newNodeBuilderEx();
