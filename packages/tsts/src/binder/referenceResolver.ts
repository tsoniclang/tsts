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
import { Kind, SymbolFlags, isIdentifier, isNumericLiteral, isStringLiteral, nodeParent } from "../ast/index.js";

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
  resolveName?: (location: AstNode | undefined, name: string, meaning: number, nameNotFoundMessage: unknown, isUse: boolean, excludeGlobals: boolean) => AstSymbol | undefined;
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
    // Look up the resolved symbol attached to this identifier by the
    // binder. If the symbol is an alias, follow it via
    // getDeclarationOfAliasSymbol to its target value declaration; the
    // merged-symbol step normalizes across declaration merging.
    const location = startInDeclarationContainer && nodeParent(reference) !== undefined && isDeclarationName(reference, nodeParent(reference)!)
      ? declarationContainer(nodeParent(reference)!)
      : reference;
    const resolved = this.getResolvedSymbol(reference)
      ?? this.hooks.resolveName?.(location, reference.text, SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias, undefined, false, false);
    if (resolved === undefined) return undefined;
    let sym = this.getMergedSymbol(resolved);
    if (this.isTypeOnlyAliasDeclaration(sym)) return undefined;
    // Follow value-export redirect; e.g. an internal `function foo()`
    // referenced from outside the module returns the exported symbol.
    sym = this.getExportSymbolOfValueSymbolIfExported(sym);
    return sym;
  }

  isTypeOnlyAliasDeclaration(symbol: AstSymbol): boolean {
    if (this.hooks.isTypeOnlyAliasDeclaration(symbol)) return true;
    let node = this.getDeclarationOfAliasSymbol(symbol);
    while (node !== undefined) {
      const isTypeOnly = (node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
      switch (node.kind) {
        case Kind.ImportEqualsDeclaration:
        case Kind.ExportDeclaration:
          return isTypeOnly;
        case Kind.ImportClause:
        case Kind.ImportSpecifier:
        case Kind.ExportSpecifier:
          if (isTypeOnly) return true;
          node = nodeParent(node) as Declaration | undefined;
          continue;
        case Kind.NamedImports:
        case Kind.NamedExports:
          node = nodeParent(node) as Declaration | undefined;
          continue;
      }
      break;
    }
    return false;
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
    const parentNode = nodeParent(node);
    const startInDeclarationContainer = parentNode !== undefined
      && (parentNode.kind === Kind.ModuleDeclaration || parentNode.kind === Kind.EnumDeclaration)
      && isDeclarationName(node, parentNode);
    // The container of an exported symbol is the symbol's parent's
    // first declaration (the module/namespace declaration node).
    let sym = this.getReferencedValueSymbol(node, startInDeclarationContainer);
    if (sym === undefined) return undefined;
    if (((sym.flags ?? 0) & SymbolFlags.ExportValue) !== 0 && sym.exportSymbol !== undefined) {
      const exportSymbol = this.getMergedSymbol(sym.exportSymbol);
      if (!prefixLocals && ((exportSymbol.flags ?? 0) & SymbolFlags.ExportHasLocal) !== 0 && ((exportSymbol.flags ?? 0) & SymbolFlags.Variable) === 0) {
        return undefined;
      }
      sym = exportSymbol;
    }
    const parent = this.getParentOfSymbol(sym);
    if (parent === undefined) return undefined;
    const parentDecls = parent.declarations;
    if (parentDecls.length === 0) return undefined;
    return parentDecls[0];
  }

  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined {
    // If the resolved symbol is an alias, return its alias declaration.
    const sym = this.getReferencedValueSymbol(node, false);
    if (sym === undefined) return undefined;
    if (((sym.flags ?? 0) & SymbolFlags.Alias) === 0) return undefined;
    if (this.isTypeOnlyAliasDeclaration(sym)) return undefined;
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
    return symbol.declarations.filter(isValueDeclarationKind).map(declaration => declaration as Declaration);
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

function isDeclarationName(node: AstNode, declaration: AstNode): boolean {
  return (declaration as unknown as { name?: AstNode }).name === node;
}

function declarationContainer(declaration: AstNode): AstNode | undefined {
  let current = nodeParent(declaration);
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.SourceFile:
      case Kind.ModuleDeclaration:
      case Kind.EnumDeclaration:
      case Kind.Block:
      case Kind.ModuleBlock:
        return current;
    }
    current = nodeParent(current);
  }
  return undefined;
}

function isValueDeclarationKind(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.EnumMember:
    case Kind.ObjectLiteralExpression:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.EnumDeclaration:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ModuleDeclaration:
      return true;
  }
  return false;
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
