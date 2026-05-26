/**
 * Reference resolver.
 *
 * Substantive port of TS-Go `internal/binder/referenceresolver.go` (~248 LoC).
 * Resolves identifier references to their declarations, with awareness
 * of merged symbols, type-only aliases, and export-symbol redirects.
 * Used by emit-side transformers (declarations/, ES decorators, legacy
 * decorators) to determine when an identifier reference needs aliasing
 * or substitution.
 *
 * Port scope: full ReferenceResolver interface, hooks struct, concrete
 * `referenceResolver` class with all 13 public/private methods mapped.
 * Bodies that need symbol-table walks are stubbed; baseline tests
 * drive incremental fill-in.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  Symbol as AstSymbol,
  Declaration,
  IdentifierNode,
  ElementAccessExpression,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// Public interface + hooks
// ---------------------------------------------------------------------------

export interface ReferenceResolver {
  getReferencedExportContainer(node: IdentifierNode, prefixLocals: boolean): AstNode | undefined;
  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined;
  getReferencedValueDeclaration(node: IdentifierNode): Declaration | undefined;
  getReferencedValueDeclarations(node: IdentifierNode): readonly Declaration[];
  getElementAccessExpressionName(expression: ElementAccessExpression): string;
}

export interface ReferenceResolverHooks {
  getMergedSymbol(symbol: AstSymbol): AstSymbol;
  getParentOfSymbol(symbol: AstSymbol): AstSymbol | undefined;
  getSymbolOfDeclaration(declaration: Declaration): AstSymbol | undefined;
  getResolvedSymbol(node: AstNode): AstSymbol | undefined;
  getExportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol;
  isTypeOnlyAliasDeclaration(symbol: AstSymbol): boolean;
  getDeclarationOfAliasSymbol(symbol: AstSymbol): Declaration | undefined;
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

class ReferenceResolverImpl implements ReferenceResolver {
  readonly compilerOptions: CompilerOptions;
  readonly hooks: ReferenceResolverHooks;

  constructor(options: CompilerOptions, hooks: ReferenceResolverHooks) {
    this.compilerOptions = options;
    this.hooks = hooks;
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  getResolvedSymbol(node: AstNode): AstSymbol | undefined {
    return this.hooks.getResolvedSymbol(node);
  }

  getMergedSymbol(symbol: AstSymbol): AstSymbol {
    return this.hooks.getMergedSymbol(symbol);
  }

  getParentOfSymbol(symbol: AstSymbol): AstSymbol | undefined {
    return this.hooks.getParentOfSymbol(symbol);
  }

  getSymbolOfDeclaration(declaration: Declaration): AstSymbol | undefined {
    return this.hooks.getSymbolOfDeclaration(declaration);
  }

  getReferencedValueSymbol(reference: IdentifierNode, startInDeclarationContainer: boolean): AstSymbol | undefined {
    void reference; void startInDeclarationContainer;
    return undefined;
  }

  isTypeOnlyAliasDeclaration(symbol: AstSymbol): boolean {
    return this.hooks.isTypeOnlyAliasDeclaration(symbol);
  }

  getDeclarationOfAliasSymbol(symbol: AstSymbol): Declaration | undefined {
    return this.hooks.getDeclarationOfAliasSymbol(symbol);
  }

  getExportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol {
    return this.hooks.getExportSymbolOfValueSymbolIfExported(symbol);
  }

  // -------------------------------------------------------------------------
  // Public surface
  // -------------------------------------------------------------------------

  getReferencedExportContainer(node: IdentifierNode, prefixLocals: boolean): AstNode | undefined {
    void node; void prefixLocals;
    return undefined;
  }

  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined {
    void node;
    return undefined;
  }

  getReferencedValueDeclaration(node: IdentifierNode): Declaration | undefined {
    const symbol = this.getReferencedValueSymbol(node, false);
    if (symbol === undefined) return undefined;
    const decls = symbol.declarations;
    return decls.length > 0 ? decls[0]! : undefined;
  }

  getReferencedValueDeclarations(node: IdentifierNode): readonly Declaration[] {
    const symbol = this.getReferencedValueSymbol(node, false);
    if (symbol === undefined) return [];
    return symbol.declarations;
  }

  getElementAccessExpressionName(expression: ElementAccessExpression): string {
    void expression;
    return "";
  }
}

export function newReferenceResolver(
  options: CompilerOptions, hooks: ReferenceResolverHooks,
): ReferenceResolver {
  return new ReferenceResolverImpl(options, hooks);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }
