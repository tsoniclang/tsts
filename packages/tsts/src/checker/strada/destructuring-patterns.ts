/**
 * Destructuring-pattern helpers (object/array binding).
 *
 * Ported from Strada `checker.go` — checkObjectBindingPattern,
 * checkArrayBindingPattern, getTypeForBindingElement,
 * getRestTypeOfBindingPattern.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an Object/Array binding pattern.
 */
export function isBindingPattern(node: AstNode): boolean {
  return node.kind === Kind.ObjectBindingPattern || node.kind === Kind.ArrayBindingPattern;
}

/**
 * Returns the elements of a binding pattern.
 */
export function getBindingPatternElements(node: AstNode): readonly AstNode[] {
  if (!isBindingPattern(node)) return [];
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns true when a binding element has a rest pattern (`...rest`).
 */
export function isBindingRestElement(element: AstNode): boolean {
  if (element.kind !== Kind.BindingElement) return false;
  return (element as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns the property-name node of a binding element — for
 * destructuring assignments with renaming (e.g. `{ a: b } = obj`).
 */
export function getBindingPropertyName(element: AstNode): AstNode | undefined {
  if (element.kind !== Kind.BindingElement) return undefined;
  return (element as unknown as { propertyName?: AstNode }).propertyName;
}

/**
 * Returns the local binding-name of a binding element. May be an
 * identifier or a nested binding pattern.
 */
export function getBindingName(element: AstNode): AstNode | undefined {
  if (element.kind !== Kind.BindingElement) return undefined;
  return (element as unknown as { name?: AstNode }).name;
}

/**
 * Returns the initializer (default value) of a binding element.
 */
export function getBindingInitializer(element: AstNode): AstNode | undefined {
  if (element.kind !== Kind.BindingElement) return undefined;
  return (element as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns true when the binding element is "elided" — a hole in an
 * array binding pattern (`[, , c]`).
 */
export function isElidedBindingElement(element: AstNode): boolean {
  // OmittedExpression in an array-binding-pattern slot.
  return element.kind === Kind.OmittedExpression;
}

/**
 * Walks a binding pattern collecting all bound identifier names.
 */
export function getBoundNames(pattern: AstNode): readonly string[] {
  const out: string[] = [];
  const walker = (node: AstNode): void => {
    if (isBindingPattern(node)) {
      for (const e of getBindingPatternElements(node)) walker(e);
      return;
    }
    if (node.kind === Kind.BindingElement) {
      const name = getBindingName(node);
      if (name !== undefined) walker(name);
      return;
    }
    if (node.kind === Kind.Identifier) {
      const text = (node as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
    }
  };
  walker(pattern);
  return out;
}

/**
 * Returns true when a binding pattern has a rest element anywhere
 * in its top level.
 */
export function hasRestElement(pattern: AstNode): boolean {
  return getBindingPatternElements(pattern).some(isBindingRestElement);
}
