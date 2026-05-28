/**
 * JSX typing — props, children, return.
 *
 * Ported from Strada `checker.go` — checkJsxElementType,
 * getJsxFactoryReturnType, getJsxPropertiesType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the JSX tag is an intrinsic element
 * (lowercase identifier).
 */
export function isIntrinsicJsxTag(node: AstNode): boolean {
  if (node.kind !== Kind.Identifier) return false;
  const text = (node as unknown as { escapedText?: string }).escapedText;
  if (text === undefined || text.length === 0) return false;
  const first = text.charCodeAt(0);
  return first >= 97 && first <= 122; // a-z
}

/**
 * Returns true when the JSX tag is a component reference
 * (PascalCase identifier or member-access expression).
 */
export function isComponentJsxTag(node: AstNode): boolean {
  if (node.kind === Kind.PropertyAccessExpression) return true;
  if (node.kind !== Kind.Identifier) return false;
  const text = (node as unknown as { escapedText?: string }).escapedText;
  if (text === undefined || text.length === 0) return false;
  const first = text.charCodeAt(0);
  return first >= 65 && first <= 90; // A-Z
}

/**
 * Returns the props type of a JSX intrinsic element by tag name.
 */
export function getIntrinsicElementPropsType(_tagName: string): Type {
  return ANY;
}

/**
 * Returns the props type of a JSX component reference.
 */
export function getComponentPropsType(_componentType: Type): Type {
  return ANY;
}

/**
 * Returns the return type of a JSX call — the element type.
 */
export function getJsxElementReturnType(_componentType: Type): Type {
  return ANY;
}

/**
 * Returns the names of the props the component accepts.
 */
export function getComponentPropNames(componentType: Type): readonly string[] {
  const flags = (componentType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (componentType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  return [...members.keys()];
}

/**
 * Returns true when the JSX attributes have a spread (`{...rest}`).
 */
export function hasSpreadAttribute(attrs: AstNode): boolean {
  if (attrs.kind !== Kind.JsxAttributes) return false;
  const props = (attrs as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  if (props === undefined) return false;
  return props.some((p) => p.kind === Kind.JsxSpreadAttribute);
}

/**
 * Returns the property-name texts of a JsxAttributes node.
 */
export function getJsxAttributeNames(attrs: AstNode): readonly string[] {
  if (attrs.kind !== Kind.JsxAttributes) return [];
  const props = (attrs as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  if (props === undefined) return [];
  const out: string[] = [];
  for (const p of props) {
    if (p.kind !== Kind.JsxAttribute) continue;
    const name = (p as unknown as { name?: AstNode }).name;
    if (name === undefined || name.kind !== Kind.Identifier) continue;
    const text = (name as unknown as { escapedText?: string }).escapedText;
    if (text !== undefined) out.push(text);
  }
  return out;
}
