/**
 * Strada-style accessor functions.
 *
 * The TS-Go port uses free functions like `nodeKind(n)` everywhere
 * because Go's `*ast.Node` is polymorphic. In TypeScript we have
 * typed nodes and direct property access, but the existing transformer
 * port carries thousands of `declare function nodeKind(...)` sites.
 * Rather than rewrite every call site, we centralize the accessors
 * here so each transformer file can do a single ESM import instead.
 *
 * No declares, no runtime side effects — just typed pass-throughs.
 */

import type { Node as AstNode, NodeArray } from "./generated/types.js";
import type { ModifierList } from "./aliases.js";

// `NodeList<T>` is generated/types.ts re-exporting the same NodeArray.
type NodeList<T extends AstNode = AstNode> = NodeArray<T>;

// ---- Generic node accessors ----
export function nodeKind(node: AstNode): number { return node.kind; }
export function nodeParent(node: AstNode | undefined): AstNode | undefined { return node?.parent; }
export function nodePos(node: AstNode): number { return node.pos; }
export function nodeEnd(node: AstNode): number { return node.end; }
export function nodeFlags(node: AstNode | undefined): number { return node === undefined ? 0 : (node.flags ?? 0); }
export function nodeText(node: AstNode | undefined): string {
  const t = (node as { text?: unknown } | undefined)?.text;
  return typeof t === "string" ? t : "";
}
export function nodeName(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as { name?: AstNode }).name;
}
export function nodeBody(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as { body?: AstNode }).body;
}
export function nodeLoc(node: AstNode | undefined): unknown {
  if (node === undefined) return undefined;
  return { pos: node.pos, end: node.end };
}

// ---- Setters used by transformers when synthesizing new nodes ----
export function setLoc(node: AstNode | NodeList, loc: unknown): void {
  if (loc === undefined || loc === null) return;
  const l = loc as { pos?: number; end?: number };
  if (typeof l.pos === "number") (node as unknown as { pos: number }).pos = l.pos;
  if (typeof l.end === "number") (node as unknown as { end: number }).end = l.end;
}

// ---- Identifier ----
export function identifierText(node: AstNode | undefined): string {
  return nodeText(node);
}

// ---- Binary expression ----
export function binaryLeft(node: AstNode): AstNode {
  return (node as unknown as { left: AstNode }).left;
}
export function binaryRight(node: AstNode): AstNode {
  return (node as unknown as { right: AstNode }).right;
}
export function binaryOperatorToken(node: AstNode): AstNode {
  return (node as unknown as { operatorToken: AstNode }).operatorToken;
}

// ---- Modifier predicates ----
export function hasSyntacticModifier(node: AstNode, flag: number): boolean {
  const flags = (node as unknown as { modifierFlags?: number }).modifierFlags ?? 0;
  return (flags & flag) !== 0;
}

// ---- Binding patterns ----
export function bindingPatternElements(node: AstNode): readonly AstNode[] {
  const elems = (node as unknown as { elements?: readonly AstNode[] }).elements;
  return elems ?? [];
}

// ---- Source-file accessors ----
export function sourceFileIsDeclarationFile(node: AstNode): boolean {
  return Boolean((node as unknown as { isDeclarationFile?: boolean }).isDeclarationFile);
}
export function sourceFileEndOfFileToken(node: AstNode): AstNode | undefined {
  return (node as unknown as { endOfFileToken?: AstNode }).endOfFileToken;
}
export function sourceFileStatementsLoc(node: AstNode): unknown {
  return nodeLoc(node);
}

// ---- Misc helpers ----
export function isExternalModule(node: AstNode): boolean {
  return Boolean((node as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator);
}

// Marker: these are pure forwarders; the body-completion phase may
// inline them or replace with checker-aware versions.
export type Accessor = (node: AstNode) => unknown;

// (ModifierList / NodeArray re-exports live in ./aliases and ./generated/types
// respectively; we don't re-export them here to avoid duplicate-name conflicts.)
