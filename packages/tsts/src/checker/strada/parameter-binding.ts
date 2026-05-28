/**
 * Parameter-binding helpers.
 *
 * Ported from Strada `checker.go` — getParameterSymbols,
 * resolveParameterBinding, isParameterUsedInBody.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns the parameter symbols of a function-like declaration.
 */
export function getParameterSymbols(decl: AstNode): readonly AstSymbol[] {
  const params = (decl as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined) return [];
  const out: AstSymbol[] = [];
  for (const p of params) {
    const sym = (p as unknown as { symbol?: AstSymbol }).symbol;
    if (sym !== undefined) out.push(sym);
  }
  return out;
}

/**
 * Returns the parameter symbol at a given index.
 */
export function getParameterSymbolAt(
  decl: AstNode,
  index: number,
): AstSymbol | undefined {
  const symbols = getParameterSymbols(decl);
  return symbols[index];
}

/**
 * Returns true when the parameter has a destructuring binding pattern.
 */
export function hasDestructuringBinding(param: AstNode): boolean {
  if (param.kind !== Kind.Parameter) return false;
  const name = (param as unknown as { name?: AstNode }).name;
  if (name === undefined) return false;
  return (
    name.kind === Kind.ObjectBindingPattern ||
    name.kind === Kind.ArrayBindingPattern
  );
}

/**
 * Returns true when the parameter is rest.
 */
export function isRestBindingParameter(param: AstNode): boolean {
  if (param.kind !== Kind.Parameter) return false;
  return (param as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns true when the parameter has a default initializer.
 */
export function hasParameterDefault(param: AstNode): boolean {
  if (param.kind !== Kind.Parameter) return false;
  return (param as unknown as { initializer?: AstNode }).initializer !== undefined;
}

/**
 * Returns the parameter index for a parameter symbol.
 */
export function getParameterIndexForSymbol(
  decl: AstNode,
  sym: AstSymbol,
): number {
  const symbols = getParameterSymbols(decl);
  return symbols.indexOf(sym);
}

/**
 * Returns true when the parameter is "shadowed" by a parameter
 * later in the list (a duplicate name).
 */
export function isShadowedParameter(decl: AstNode, paramName: string): boolean {
  const params = (decl as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined) return false;
  const ref: { count: number } = { count: 0 };
  for (const p of params) {
    const name = (p as unknown as { name?: AstNode }).name;
    if (name === undefined || name.kind !== Kind.Identifier) continue;
    const text = (name as unknown as { escapedText?: string }).escapedText;
    if (text === paramName) ref.count++;
  }
  return ref.count > 1;
}
