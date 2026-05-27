/**
 * Constructor parameter-property handling (`constructor(public x)`).
 *
 * Ported from Strada `checker.go` — isParameterProperty,
 * getParameterPropertySymbol, expandParameterProperty.
 *
 * Tsonic explicitly forbids parameter-property shorthand. This module
 * supplies detection for diagnostics.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the parameter has an accessibility modifier
 * (which makes it a parameter-property).
 */
export function isParameterProperty(node: AstNode): boolean {
  if (node.kind !== Kind.Parameter) return false;
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  return mods.some((m) =>
    m.kind === Kind.PublicKeyword ||
    m.kind === Kind.PrivateKeyword ||
    m.kind === Kind.ProtectedKeyword ||
    m.kind === Kind.ReadonlyKeyword,
  );
}

/**
 * Returns the accessibility modifier of a parameter-property, or
 * undefined when none is present.
 */
export function getParameterPropertyAccessibility(node: AstNode): "public" | "private" | "protected" | undefined {
  if (!isParameterProperty(node)) return undefined;
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return undefined;
  for (const m of mods) {
    if (m.kind === Kind.PrivateKeyword) return "private";
    if (m.kind === Kind.ProtectedKeyword) return "protected";
    if (m.kind === Kind.PublicKeyword) return "public";
  }
  return "public";
}

/**
 * Returns true when the parameter-property is readonly.
 */
export function isReadonlyParameterProperty(node: AstNode): boolean {
  if (!isParameterProperty(node)) return false;
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.ReadonlyKeyword) === true;
}

/**
 * Returns the name of a parameter-property — its binding name.
 */
export function getParameterPropertyName(node: AstNode): string | undefined {
  if (!isParameterProperty(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when the constructor declaration has any
 * parameter-properties.
 */
export function hasParameterProperties(node: AstNode): boolean {
  if (node.kind !== Kind.Constructor) return false;
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined) return false;
  return params.some(isParameterProperty);
}

/**
 * Returns the parameter-properties of a constructor.
 */
export function getParameterProperties(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.Constructor) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined) return [];
  return params.filter(isParameterProperty);
}
