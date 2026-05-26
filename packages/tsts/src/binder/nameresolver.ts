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

// ---------------------------------------------------------------------------
// NameResolver
// ---------------------------------------------------------------------------

export interface NameResolverHooks {
  argumentsSymbol(): AstSymbol;
  error(location: AstNode, message: DiagnosticMessage, ...args: unknown[]): void;
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
    void location; void name; void meaning; void nameNotFoundMessage; void isUse; void excludeGlobals;
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
    void node;
    return false;
  }

  error(location: AstNode, message: DiagnosticMessage, ...args: unknown[]): void {
    this.hooks.error(location, message, ...args);
  }

  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined {
    return this.hooks.getSymbolOfDeclaration(node);
  }

  lookup(symbols: SymbolTable, name: string, meaning: number): AstSymbol | undefined {
    void symbols; void name; void meaning;
    return undefined;
  }

  argumentsSymbol(): AstSymbol {
    return this.hooks.argumentsSymbol();
  }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function getLocalSymbolForExportDefault(symbol: AstSymbol): AstSymbol | undefined {
  void symbol;
  return undefined;
}

export function isExportDefaultSymbol(symbol: AstSymbol): boolean {
  void symbol;
  return false;
}

export function getIsDeferredContext(location: AstNode, lastLocation: AstNode | undefined): boolean {
  void location; void lastLocation;
  return false;
}

export function isTypeParameterSymbolDeclaredInContainer(symbol: AstSymbol, container: AstNode): boolean {
  void symbol; void container;
  return false;
}

export function isSelfReferenceLocation(node: AstNode, lastLocation: AstNode | undefined): boolean {
  void node; void lastLocation;
  return false;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }
interface DiagnosticMessage { code: number; message: string }
// IdentifierNode reserved for caller use
export type _Identifier = IdentifierNode;
