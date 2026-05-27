/**
 * Declaration-emit helpers (for `.d.ts` output).
 *
 * Ported from Strada `transform.go` (within `transformers/declarations`) —
 * type-portability checks, accessor pairing, alias visibility.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the node is eligible for declaration emit — has
 * an export modifier or is at module top-level.
 */
export function isDeclarationEmitTarget(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.VariableStatement:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
    case Kind.ImportDeclaration:
    case Kind.ImportEqualsDeclaration:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when a declaration has the `export` modifier.
 */
export function isExported(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.ExportKeyword) === true;
}

/**
 * Returns true when a declaration has the `default` modifier.
 */
export function isDefaultExported(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.DefaultKeyword) === true;
}

/**
 * Returns true when the symbol can be referenced in a `.d.ts` file —
 * its type is fully expressible without going through implementation
 * details.
 */
export function isPortableSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  return decls.every(isPortableDeclaration);
}

function isPortableDeclaration(decl: AstNode): boolean {
  switch (decl.kind) {
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.PropertySignature:
    case Kind.VariableDeclaration:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the declaration is private and would be stripped
 * from declaration emit.
 */
export function isStrippedByDeclarationEmit(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  return mods.some((m) => m.kind === Kind.PrivateKeyword);
}

/**
 * Returns true when the declaration is "internal" — marked with
 * `@internal` JSDoc tag, which the emitter strips when configured.
 */
export function isInternalDeclaration(decl: AstNode): boolean {
  return (decl as unknown as { isInternal?: boolean }).isInternal === true;
}
