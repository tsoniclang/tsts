/**
 * Destructuring binding-pattern resolution.
 *
 * Ported from Strada `checker.go` — getTypeFromBindingPattern,
 * checkBindingElement, getInitialTypeOfBindingElement.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

const ANY: Type = { flags: 1 << 0 } as unknown as Type;
const OBJECT: Type = { flags: 1 << 19 } as unknown as Type;

/**
 * Returns the type implied by a binding pattern. An array pattern
 * produces a tuple-shaped Object with typeArguments; an object
 * pattern produces a fresh Object.
 */
export function getTypeFromBindingPattern(c: CheckerOps, node: AstNode): Type {
  const k = (node as { kind?: number }).kind;
  if (k === Kind.ArrayBindingPattern) return getTypeFromArrayBindingPattern(c, node);
  if (k === Kind.ObjectBindingPattern) return getTypeFromObjectBindingPattern(c, node);
  return ANY;
}

export function getTypeFromArrayBindingPattern(c: CheckerOps, node: AstNode): Type {
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
  return {
    flags: 1 << 19,
    typeArguments: elements !== undefined ? elements.map((e) => getTypeFromBindingElement(c, e)) : [],
  } as unknown as Type;
}

export function getTypeFromObjectBindingPattern(_c: CheckerOps, _node: AstNode): Type {
  return OBJECT;
}

export function getTypeFromBindingElement(c: CheckerOps, node: AstNode): Type {
  const typeNode = (node as unknown as { type?: AstNode }).type;
  if (typeNode !== undefined) return c.getTypeFromTypeNode(typeNode);
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) return c.checkExpression(init);
  // Nested pattern.
  const name = (node as unknown as { name?: AstNode }).name;
  if (name !== undefined) {
    const nameKind = (name as { kind?: number }).kind;
    if (nameKind === Kind.ArrayBindingPattern || nameKind === Kind.ObjectBindingPattern) {
      return getTypeFromBindingPattern(c, name);
    }
  }
  return ANY;
}

/**
 * Walks the binding pattern collecting names of bound identifiers.
 */
export function getBindingNames(node: AstNode): readonly string[] {
  const out: string[] = [];
  collectBindingNames(node, out);
  return out;
}

function collectBindingNames(node: AstNode, out: string[]): void {
  const k = (node as { kind?: number }).kind;
  if (k === Kind.Identifier) {
    const text = (node as unknown as { text?: string }).text;
    if (text !== undefined) out.push(text);
    return;
  }
  if (k === Kind.ArrayBindingPattern || k === Kind.ObjectBindingPattern) {
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elements !== undefined) for (const e of elements) {
      const name = (e as unknown as { name?: AstNode }).name;
      if (name !== undefined) collectBindingNames(name, out);
    }
  }
}

/**
 * Returns true when the binding element is a rest element (...).
 */
export function isRestBindingElement(node: AstNode): boolean {
  return (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns the property name for an object-binding element (the name
 * before the `:` in `{ a: b }`), falling back to the binding name.
 */
export function getPropertyNameOfBindingElement(node: AstNode): string | undefined {
  const propertyName = (node as unknown as { propertyName?: { text?: string } }).propertyName;
  if (propertyName?.text !== undefined) return propertyName.text;
  const name = (node as unknown as { name?: { text?: string } }).name;
  return name?.text;
}
