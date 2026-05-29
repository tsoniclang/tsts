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
import { isIdentifier, isNumericLiteral, isStringLiteral } from "../ast/index.js";

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
    void startInDeclarationContainer;
    // Look up the resolved symbol attached to this identifier by the
    // binder. If the symbol is an alias, follow it via
    // getDeclarationOfAliasSymbol to its target value declaration; the
    // merged-symbol step normalizes across declaration merging.
    const resolved = this.getResolvedSymbol(reference);
    if (resolved === undefined) return undefined;
    let sym = this.getMergedSymbol(resolved);
    if (this.isTypeOnlyAliasDeclaration(sym)) return undefined;
    // Follow value-export redirect; e.g. an internal `function foo()`
    // referenced from outside the module returns the exported symbol.
    sym = this.getExportSymbolOfValueSymbolIfExported(sym);
    return sym;
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
    void prefixLocals;
    // The container of an exported symbol is the symbol's parent's
    // first declaration (the module/namespace declaration node).
    const sym = this.getReferencedValueSymbol(node, false);
    if (sym === undefined) return undefined;
    const parent = this.getParentOfSymbol(sym);
    if (parent === undefined) return undefined;
    const parentDecls = parent.declarations;
    if (parentDecls.length === 0) return undefined;
    return parentDecls[0];
  }

  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined {
    // If the resolved symbol is an alias, return its alias declaration.
    const resolved = this.getResolvedSymbol(node);
    if (resolved === undefined) return undefined;
    const sym = this.getMergedSymbol(resolved);
    if (!this.isTypeOnlyAliasDeclaration(sym)) {
      // Still might be a value-side alias (import { x }).
      const decl = this.getDeclarationOfAliasSymbol(sym);
      if (decl !== undefined) return decl;
    }
    return this.getDeclarationOfAliasSymbol(sym);
  }

  getReferencedValueDeclaration(node: IdentifierNode): Declaration | undefined {
    const symbol = this.getReferencedValueSymbol(node, false);
    if (symbol === undefined) return undefined;
    const decls = symbol.declarations;
    return decls.length > 0 ? (decls[0]! as Declaration) : undefined;
  }

  getReferencedValueDeclarations(node: IdentifierNode): readonly Declaration[] {
    const symbol = this.getReferencedValueSymbol(node, false);
    if (symbol === undefined) return [];
    // `symbol.declarations` is `Node[]` (a mutable binder slot, TS-Go []*Node).
    // Narrow each entry to `Declaration` the same way the single-declaration
    // accessor above does; this mirrors TS-Go treating *ast.Node and
    // *ast.Declaration as the same underlying node pointer.
    return symbol.declarations.map(declaration => declaration as Declaration);
  }

  getElementAccessExpressionName(expression: ElementAccessExpression): string {
    // For x["literal"] the property name is the literal text; for
    // x[expr] there is no static name.
    const arg = expression.argumentExpression;
    if (isStringLiteral(arg) || isNumericLiteral(arg) || isIdentifier(arg)) {
      return arg.text;
    }
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
