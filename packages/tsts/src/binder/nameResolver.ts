/**
 * Name resolver.
 *
 * Substantive port of TS-Go `internal/binder/nameresolver.go` (~488 LoC).
 * Implements the `Resolve` algorithm — the workhorse of TypeScript's
 * scope lookup. Walks up from a starting location through enclosing
 * containers, consulting symbol tables and applying scope rules
 * (block-scoped binding, type-vs-value separation, default-export
 * special-cases, etc.).
 *
 * Port scope: full state declarations, method signatures for
 * `Resolve` and its 10+ helpers, module-level helpers
 * (GetLocalSymbolForExportDefault, isExportDefaultSymbol,
 * getIsDeferredContext, isTypeParameterSymbolDeclaredInContainer,
 * isSelfReferenceLocation). The Resolve body is stubbed; baseline
 * lookup tests drive incremental fill-in.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  Symbol as AstSymbol,
  SymbolTable,
  IdentifierNode,
} from "../ast/index.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";
import { Kind, nodeLocals, nodeParent, nodeSymbol } from "../ast/index.js";

// ---------------------------------------------------------------------------
// NameResolver
// ---------------------------------------------------------------------------

export interface NameResolverHooks {
  argumentsSymbol(): AstSymbol;
  error(location: AstNode, message: DiagnosticMessage, ...args: DiagnosticArgument[]): void;
  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined;
}

export class NameResolver {
  readonly hooks: NameResolverHooks;
  readonly compilerOptions: CompilerOptions;

  constructor(hooks: NameResolverHooks, options: CompilerOptions) {
    this.hooks = hooks;
    this.compilerOptions = options;
  }

  // -------------------------------------------------------------------------
  // Main entry
  // -------------------------------------------------------------------------

  resolve(
    location: AstNode | undefined,
    name: string,
    meaning: number,
    nameNotFoundMessage: DiagnosticMessage | undefined,
    isUse: boolean,
    excludeGlobals: boolean,
  ): AstSymbol | undefined {
    void nameNotFoundMessage; void isUse; void excludeGlobals;
    // Walk up the parent chain of `location` looking for a symbol named
    // `name` in any enclosing scope's `locals` table or `symbol.exports`
    // (for module/namespace containers). Stops at SourceFile.
    let n: AstNode | undefined = location;
    while (n !== undefined) {
      const locals = nodeLocals(n);
      if (locals !== undefined) {
        const found = this.lookup(locals, name, meaning);
        if (found !== undefined) return found;
      }
      const sym = nodeSymbol(n);
      const exports = sym?.exports;
      if (exports !== undefined) {
        const found = this.lookup(exports, name, meaning);
        if (found !== undefined) return found;
      }
      const members = sym?.members;
      if (members !== undefined) {
        const found = this.lookup(members, name, meaning);
        if (found !== undefined) return found;
      }
      n = nodeParent(n);
    }
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Scope-change predicates
  // -------------------------------------------------------------------------

  useOuterVariableScopeInParameter(
    result: AstSymbol, location: AstNode, lastLocation: AstNode | undefined,
  ): boolean {
    void result; void location; void lastLocation;
    return false;
  }

  requiresScopeChange(node: AstNode): boolean {
    return this.requiresScopeChangeWorker(node);
  }

  requiresScopeChangeWorker(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.SourceFile:
      case Kind.ModuleDeclaration:
      case Kind.Block:
      case Kind.CaseBlock:
      case Kind.CatchClause:
      case Kind.ForStatement:
      case Kind.ForInStatement:
      case Kind.ForOfStatement:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.Constructor:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.InterfaceDeclaration:
      case Kind.TypeAliasDeclaration:
      case Kind.ConditionalType:
        return true;
    }
    return nodeLocals(node) !== undefined || nodeSymbol(node)?.exports !== undefined || nodeSymbol(node)?.members !== undefined;
  }

  error(location: AstNode, message: DiagnosticMessage, ...args: DiagnosticArgument[]): void {
    this.hooks.error(location, message, ...args);
  }

  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined {
    return this.hooks.getSymbolOfDeclaration(node);
  }

  lookup(symbols: SymbolTable, name: string, meaning: number): AstSymbol | undefined {
    const sym = symbols.get(name);
    if (sym === undefined) return undefined;
    // If a meaning bitset is provided, only return the symbol when its
    // flags include at least one of the requested bits. When the symbol
    // doesn't expose a `flags` field, fall through (caller-side meaning
    // refinement is the responsibility of the checker).
    if (meaning !== 0) {
      const flags = sym.flags;
      if (flags !== undefined && (flags & meaning) === 0) return undefined;
    }
    return sym;
  }

  argumentsSymbol(): AstSymbol {
    return this.hooks.argumentsSymbol();
  }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function getLocalSymbolForExportDefault(symbol: AstSymbol): AstSymbol | undefined {
  const direct = (symbol as unknown as { localSymbol?: AstSymbol }).localSymbol;
  if (direct !== undefined) return direct;
  for (const declaration of symbol.declarations ?? []) {
    const local = (declaration as unknown as { localSymbol?: AstSymbol }).localSymbol;
    if (local !== undefined) return local;
    const declarationSymbol = nodeSymbol(declaration);
    if (declarationSymbol !== undefined && declarationSymbol !== symbol) return declarationSymbol;
  }
  return undefined;
}

export function isExportDefaultSymbol(symbol: AstSymbol): boolean {
  const name = (symbol as unknown as { name?: string; escapedName?: string }).name
    ?? (symbol as unknown as { escapedName?: string }).escapedName
    ?? "";
  if (name === "default" || name === "export default") return true;
  return (symbol.declarations ?? []).some((declaration) => declaration.kind === Kind.ExportAssignment
    || ((declaration as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes ?? [])
      .some((modifier) => modifier.kind === Kind.DefaultKeyword));
}

export function getIsDeferredContext(location: AstNode, lastLocation: AstNode | undefined): boolean {
  if (location.kind === Kind.ConditionalType) {
    const trueType = (location as unknown as { trueType?: AstNode }).trueType;
    const falseType = (location as unknown as { falseType?: AstNode }).falseType;
    return lastLocation !== undefined && lastLocation !== trueType && lastLocation !== falseType;
  }
  if (location.kind === Kind.MappedType) return true;
  if (location.kind === Kind.TypeQuery) return true;
  return false;
}

export function isTypeParameterSymbolDeclaredInContainer(symbol: AstSymbol, container: AstNode): boolean {
  return (symbol.declarations ?? []).some((declaration) => {
    if (declaration.kind !== Kind.TypeParameter) return false;
    let parent = nodeParent(declaration);
    while (parent !== undefined) {
      if (parent === container) return true;
      if (parent.kind === Kind.SourceFile || parent.kind === Kind.Block || parent.kind === Kind.ModuleBlock) return false;
      parent = nodeParent(parent);
    }
    return false;
  });
}

export function isSelfReferenceLocation(node: AstNode, lastLocation: AstNode | undefined): boolean {
  if (lastLocation === undefined) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === lastLocation) return true;
  if (node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression
      || node.kind === Kind.InterfaceDeclaration || node.kind === Kind.TypeAliasDeclaration
      || node.kind === Kind.FunctionDeclaration || node.kind === Kind.EnumDeclaration
      || node.kind === Kind.ModuleDeclaration) {
    return name === lastLocation;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

type DiagnosticArgument = string | number | boolean | object | null | undefined;
// IdentifierNode reserved for caller use
export type _Identifier = IdentifierNode;
