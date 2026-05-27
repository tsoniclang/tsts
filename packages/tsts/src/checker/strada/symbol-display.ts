/**
 * Symbol-display strings for diagnostics.
 *
 * Ported from Strada `printer.go` (within `checker`) — symbolToDisplayString,
 * getDeclarationKindName.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns a display name for a node kind (e.g. "function", "interface").
 */
export function getDeclarationKindDisplayName(kind: number): string {
  switch (kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression: return "function";
    case Kind.ArrowFunction: return "arrow function";
    case Kind.ClassDeclaration:
    case Kind.ClassExpression: return "class";
    case Kind.InterfaceDeclaration: return "interface";
    case Kind.TypeAliasDeclaration: return "type alias";
    case Kind.EnumDeclaration: return "enum";
    case Kind.ModuleDeclaration: return "namespace";
    case Kind.VariableDeclaration: return "variable";
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature: return "property";
    case Kind.MethodDeclaration:
    case Kind.MethodSignature: return "method";
    case Kind.Constructor: return "constructor";
    case Kind.GetAccessor: return "getter";
    case Kind.SetAccessor: return "setter";
    case Kind.Parameter: return "parameter";
    case Kind.TypeParameter: return "type parameter";
    case Kind.EnumMember: return "enum member";
    case Kind.ImportDeclaration: return "import";
    case Kind.ExportDeclaration: return "export";
    case Kind.SourceFile: return "module";
    default: return "(unknown)";
  }
}

/**
 * Returns the display name for a symbol's first declaration kind.
 */
export function getSymbolDeclarationKind(sym: AstSymbol): string {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return "(symbol)";
  return getDeclarationKindDisplayName(decls[0]!.kind);
}

/**
 * Returns a rendered diagnostic display: `'name' (kind)`.
 */
export function getSymbolDiagnosticDisplay(sym: AstSymbol): string {
  const name = (sym as unknown as { name?: string }).name ?? "(anonymous)";
  const kind = getSymbolDeclarationKind(sym);
  return `'${name}' (${kind})`;
}

/**
 * Returns the location string for a symbol's declaration —
 * `file.ts:line:col`.
 */
export function getSymbolLocationString(sym: AstSymbol): string {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return "(unknown location)";
  const first = decls[0]!;
  const fileName = walkToFileName(first);
  const pos = (first as unknown as { pos?: number }).pos ?? 0;
  return `${fileName ?? "(unknown)"}:${pos}`;
}

function walkToFileName(node: AstNode): string | undefined {
  const walker = (current: AstNode | undefined): string | undefined => {
    if (current === undefined) return undefined;
    if (current.kind === Kind.SourceFile) {
      return (current as unknown as { fileName?: string }).fileName;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker(node);
}
