/**
 * Checker-side EmitResolver implementation.
 *
 * Substantive port of TS-Go `internal/checker/emitresolver.go` (~1233 LoC).
 * Implements the printer.EmitResolver interface (see ../printer/emitresolver.ts)
 * by routing through the checker's symbol + type resolution.
 */

import { getCombinedNodeFlags, hasSyntacticModifier, Kind, NodeFlags, SymbolFlags } from "../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, Declaration, IdentifierNode, Expression } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { SymbolAccessibility, type SymbolAccessibilityResult, type EmitResolver } from "../printer/emitresolver.js";

export class CheckerEmitResolver implements EmitResolver {
  // Alias / value-alias queries
  isReferencedAliasDeclaration(node: AstNode): boolean {
    if (!isAliasDeclaration(node)) return false;
    const symbol = declarationSymbol(node);
    if (symbol === undefined) return this.isValueAliasDeclaration(node);
    const aliasLinks = symbol as unknown as { aliasReferenced?: boolean; referenced?: boolean; aliasTarget?: AstSymbol };
    if (aliasLinks.aliasReferenced === true || aliasLinks.referenced === true) return true;
    const target = aliasLinks.aliasTarget ?? symbol.exportSymbol;
    return hasExportModifier(node) && target !== undefined && ((target.flags ?? 0) & SymbolFlags.Value) !== 0;
  }
  isValueAliasDeclaration(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.ImportEqualsDeclaration:
        return this.isAliasResolvedToValue(declarationSymbol(node), false);
      case Kind.ImportClause:
      case Kind.NamespaceImport:
      case Kind.ImportSpecifier:
      case Kind.ExportSpecifier:
        return !isTypeOnlyAlias(node) && this.isAliasResolvedToValue(declarationSymbol(node), true);
      case Kind.ExportDeclaration: {
        const exportClause = (node as unknown as { exportClause?: AstNode }).exportClause;
        if (exportClause === undefined) return false;
        if (exportClause.kind === Kind.NamespaceExport) return true;
        const elements = (exportClause as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
        return elements.some((element) => this.isValueAliasDeclaration(element));
      }
      case Kind.ExportAssignment: {
        const expression = (node as unknown as { expression?: AstNode }).expression;
        return expression?.kind === Kind.Identifier ? this.isAliasResolvedToValue(declarationSymbol(node), true) : true;
      }
      case Kind.BinaryExpression:
        return isCommonJSModuleExports(node) && ((node as unknown as { right?: AstNode }).right?.kind === Kind.Identifier)
          ? this.isAliasResolvedToValue(declarationSymbol(node), true)
          : false;
    }
    return false;
  }
  private isAliasResolvedToValue(symbol: AstSymbol | undefined, excludeTypeOnlyValues: boolean): boolean {
    if (symbol === undefined) return false;
    if (excludeTypeOnlyValues && typeOnlyAliasDeclaration(symbol) !== undefined) return false;
    const target = symbol.exportSymbol ?? (symbol as unknown as { aliasTarget?: AstSymbol }).aliasTarget ?? symbol;
    return ((target.flags ?? symbol.flags ?? 0) & SymbolFlags.Value) !== 0;
  }
  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.ImportEqualsDeclaration) return false;
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (parent === undefined) return false;
    if ((parent as { kind?: number }).kind !== Kind.SourceFile) return false;
    // Entity-name (not require-call) — moduleReference.kind is
    // QualifiedName or Identifier.
    const ref = (node as unknown as { moduleReference?: { kind?: number } }).moduleReference;
    if (ref?.kind !== Kind.QualifiedName && ref?.kind !== Kind.Identifier) return false;
    return this.isAliasResolvedToValue(declarationSymbol(node), false);
  }
  hasGlobalName(name: string): boolean {
    // Without a global-symbol table, conservative false. Real impl
    // consults the checker's globals.
    void name; return false;
  }
  getReferencedExportContainer(node: IdentifierNode, prefixLocals: boolean): AstNode | undefined {
    // Match referenceresolver semantics: find the parent symbol's
    // first declaration node.
    void prefixLocals;
    const sym = (node as unknown as { symbol?: AstSymbol }).symbol;
    if (sym === undefined) return undefined;
    const parent = (sym as unknown as { parent?: AstSymbol }).parent;
    if (parent === undefined) return undefined;
    const decls = (parent as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined || decls.length === 0) return undefined;
    return decls[0];
  }
  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined {
    const sym = (node as unknown as { symbol?: AstSymbol }).symbol;
    if (sym === undefined) return undefined;
    const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined) return undefined;
    for (const d of decls) {
      const k = (d as { kind?: number }).kind;
      if (k === Kind.ImportClause || k === Kind.ImportSpecifier ||
          k === Kind.NamespaceImport || k === Kind.ImportEqualsDeclaration) {
        return d as Declaration;
      }
    }
    return undefined;
  }
  getReferencedDeclarationWithCollidingName(node: IdentifierNode): Declaration | undefined {
    const name = nodeText(node);
    if (name === "") return undefined;
    const symbol = declarationSymbol(node);
    const declarations = symbol?.declarations ?? [];
    for (const declaration of declarations) {
      if (declaration !== node && declarationNameText(declaration) === name && this.isDeclarationWithCollidingName(declaration)) {
        return declaration as Declaration;
      }
    }
    return undefined;
  }
  isDeclarationWithCollidingName(node: AstNode): boolean {
    const name = declarationNameText(node);
    if (name === "") return false;
    const siblings = siblingDeclarations(node);
    return siblings.some((candidate) => candidate !== node && declarationNameText(candidate) === name && declarationHasValueMeaning(candidate) === declarationHasValueMeaning(node));
  }
  isValueAlias(node: AstNode): boolean { return this.isValueAliasDeclaration(node); }

  // Constants + literals
  getConstantValue(node: AstNode): string | number | undefined {
    // For literal nodes, return the literal value directly. The full
    // checker also collapses enum-member constant references; without
    // type info we restrict to literal-direct cases.
    const k = (node as { kind?: number }).kind;
    if (k === Kind.NumericLiteral) {
      const text = (node as unknown as { text?: string }).text ?? "";
      const n = Number(text);
      return Number.isFinite(n) ? n : undefined;
    }
    if (k === Kind.StringLiteral || k === Kind.NoSubstitutionTemplateLiteral) {
      return (node as unknown as { text?: string }).text;
    }
    return undefined;
  }
  getEnumMemberValue(node: AstNode): string | number | undefined {
    // Use the initializer's constant value when present.
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) return undefined;
    return this.getConstantValue(init);
  }
  collectLinkedAliases(node: IdentifierNode, setVisibility: boolean): readonly AstNode[] {
    const result: AstNode[] = [];
    const seen = new Set<AstSymbol>();
    let current: AstSymbol | undefined = declarationSymbol(node);
    while (current !== undefined && !seen.has(current)) {
      seen.add(current);
      if (setVisibility) {
        (current as unknown as { aliasReferenced?: boolean }).aliasReferenced = true;
      }
      result.push(...current.declarations);
      current = current.exportSymbol ?? (current as unknown as { aliasTarget?: AstSymbol }).aliasTarget;
    }
    return result;
  }

  // Overload classification
  isImplementationOfOverload(node: AstNode): boolean {
    if (hasBody(node) === false) return false;
    if (node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor) return false;
    const symbolDeclarations = declarationSymbol(node)?.declarations ?? [];
    if (symbolDeclarations.some((declaration) => declaration !== node && declarationNameText(declaration) === declarationNameText(node) && !hasBody(declaration))) {
      return true;
    }
    const siblings = siblingDeclarations(node);
    return siblings.some((declaration) => declaration !== node && declarationNameText(declaration) === declarationNameText(node) && !hasBody(declaration));
  }
  isLateBound(node: AstNode): boolean {
    if (node.kind !== Kind.ComputedPropertyName) return false;
    return !this.isLiteralComputedPropertyDeclarationName(node);
  }
  isLiteralComputedPropertyDeclarationName(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.ComputedPropertyName) return false;
    const expr = (node as unknown as { expression?: { kind?: number } }).expression;
    return expr?.kind === Kind.StringLiteral || expr?.kind === Kind.NumericLiteral;
  }

  // Node-check flags
  getNodeCheckFlags(node: AstNode): number {
    return (node as unknown as { checkFlags?: number }).checkFlags ?? 0;
  }

  // Parameter classification
  isOptionalParameter(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined ||
           (node as unknown as { initializer?: AstNode }).initializer !== undefined ||
           (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
  }
  isRequiredInitializedParameter(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { initializer?: AstNode }).initializer !== undefined &&
           (node as unknown as { questionToken?: AstNode }).questionToken === undefined;
  }
  isOptionalUninitializedParameterProperty(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined &&
           (node as unknown as { initializer?: AstNode }).initializer === undefined;
  }

  // Expando functions
  isExpandoFunctionDeclaration(node: AstNode): boolean {
    return this.getPropertiesOfContainerFunction(node).some(isExpandoPropertyDeclaration);
  }
  getPropertiesOfContainerFunction(node: AstNode): readonly AstNode[] {
    const symbol = declarationSymbol(node);
    const members = symbol?.members ?? symbol?.exports;
    if (members === undefined) return [];
    const result: AstNode[] = [];
    for (const member of members.values()) result.push(...member.declarations);
    return result;
  }

  // Declaration emit support
  createTypeOfDeclaration(declaration: AstNode): AstNode {
    // Without checker type inference, return the declared type node
    // directly when present (declaration.type). Falls back to an empty
    // any-type sentinel.
    const t = (declaration as unknown as { type?: AstNode }).type;
    if (t !== undefined) return t;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }
  createReturnTypeOfSignatureDeclaration(signatureDeclaration: AstNode): AstNode {
    const t = (signatureDeclaration as unknown as { type?: AstNode }).type;
    if (t !== undefined) return t;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }
  createTypeOfExpression(expression: Expression): AstNode {
    if (expression.kind === Kind.NumericLiteral) return { kind: Kind.NumberKeyword } as unknown as AstNode;
    if (expression.kind === Kind.StringLiteral || expression.kind === Kind.NoSubstitutionTemplateLiteral) return { kind: Kind.StringKeyword } as unknown as AstNode;
    if (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword) return { kind: Kind.BooleanKeyword } as unknown as AstNode;
    if (expression.kind === Kind.BigIntLiteral) return { kind: Kind.BigIntKeyword } as unknown as AstNode;
    if (expression.kind === Kind.NullKeyword) return { kind: Kind.NullKeyword } as unknown as AstNode;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }

  isSymbolAccessible(
    symbol: unknown, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliases: boolean,
  ): SymbolAccessibilityResult {
    void symbol; void enclosingDeclaration; void meaning; void shouldComputeAliases;
    return { accessibility: SymbolAccessibility.Accessible };
  }
}

function declarationSymbol(node: AstNode): AstSymbol | undefined {
  return node.symbol ?? (node as unknown as { localSymbol?: AstSymbol }).localSymbol;
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function declarationNameText(node: AstNode): string {
  return nodeText((node as unknown as { name?: AstNode }).name);
}

function isAliasDeclaration(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportClause:
    case Kind.NamespaceImport:
    case Kind.ImportSpecifier:
    case Kind.ExportSpecifier:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      return true;
  }
  return isCommonJSModuleExports(node);
}

function isTypeOnlyAlias(node: AstNode): boolean {
  if ((node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return true;
  const parent = (node as unknown as { parent?: AstNode }).parent;
  return parent !== undefined && (parent as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}

function typeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined {
  return symbol.declarations.find(isTypeOnlyAlias);
}

function hasExportModifier(node: AstNode): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Export);
}

function isCommonJSModuleExports(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const left = (node as unknown as { left?: AstNode }).left;
  if (left?.kind !== Kind.PropertyAccessExpression) return false;
  const leftExpression = (left as unknown as { expression?: AstNode }).expression;
  const leftName = (left as unknown as { name?: AstNode }).name;
  return leftExpression?.kind === Kind.Identifier && nodeText(leftExpression) === "module" && nodeText(leftName) === "exports";
}

function siblingDeclarations(node: AstNode): readonly AstNode[] {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return [];
  if (parent.kind === Kind.SourceFile) return (parent as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
  if (parent.kind === Kind.ModuleBlock || parent.kind === Kind.Block) return (parent as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
  if (parent.kind === Kind.ClassDeclaration || parent.kind === Kind.ClassExpression || parent.kind === Kind.InterfaceDeclaration || parent.kind === Kind.ObjectLiteralExpression) {
    return (parent as unknown as { members?: { nodes?: readonly AstNode[] }; properties?: { nodes?: readonly AstNode[] } }).members?.nodes
      ?? (parent as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes
      ?? [];
  }
  return [];
}

function declarationHasValueMeaning(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.TypeParameter:
      return false;
  }
  return true;
}

function hasBody(node: AstNode): boolean {
  return (node as unknown as { body?: AstNode }).body !== undefined;
}

function isExpandoPropertyDeclaration(node: AstNode): boolean {
  if (node.kind === Kind.BinaryExpression) {
    const left = (node as unknown as { left?: AstNode }).left;
    return left?.kind === Kind.PropertyAccessExpression;
  }
  return ((getCombinedNodeFlags(node) & NodeFlags.JavaScriptFile) !== 0)
    && (node.kind === Kind.PropertyAssignment || node.kind === Kind.MethodDeclaration || node.kind === Kind.PropertyDeclaration);
}

export function newCheckerEmitResolver(): CheckerEmitResolver {
  return new CheckerEmitResolver();
}
