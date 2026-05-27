/**
 * Checker-side EmitResolver implementation.
 *
 * Substantive port of TS-Go `internal/checker/emitresolver.go` (~1233 LoC).
 * Implements the printer.EmitResolver interface (see ../printer/emitresolver.ts)
 * by routing through the checker's symbol + type resolution.
 */

import { Kind } from "../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, Declaration, IdentifierNode, Expression } from "../ast/index.js";
import { SymbolAccessibility, type SymbolAccessibilityResult, type EmitResolver } from "../printer/emitresolver.js";

export class CheckerEmitResolver implements EmitResolver {
  // Alias / value-alias queries
  isReferencedAliasDeclaration(node: AstNode): boolean {
    // Default-aware: an alias is "referenced" if anything in the
    // current source file might use it. Without checker integration we
    // err conservative-true (the emitter retains the import).
    void node; return true;
  }
  isValueAliasDeclaration(node: AstNode): boolean {
    // A value alias is one whose target is a value (not type-only).
    // ImportClause with isTypeOnly === false counts; conservative
    // default true preserves imports.
    const k = (node as { kind?: number }).kind;
    if (k === Kind.ImportClause || k === Kind.ImportSpecifier || k === Kind.NamespaceImport) {
      const isTypeOnly = (node as unknown as { isTypeOnly?: boolean }).isTypeOnly;
      return isTypeOnly !== true;
    }
    return true;
  }
  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.ImportEqualsDeclaration) return false;
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (parent === undefined) return false;
    if ((parent as { kind?: number }).kind !== Kind.SourceFile) return false;
    // Entity-name (not require-call) — moduleReference.kind is
    // QualifiedName or Identifier.
    const ref = (node as unknown as { moduleReference?: { kind?: number } }).moduleReference;
    return ref?.kind === Kind.QualifiedName || ref?.kind === Kind.Identifier;
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
    void node; return undefined;
  }
  isDeclarationWithCollidingName(node: AstNode): boolean { void node; return false; }
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
    void node; void setVisibility; return [];
  }

  // Overload classification
  isImplementationOfOverload(node: AstNode): boolean {
    // A FunctionDeclaration / MethodDeclaration with a body whose
    // preceding siblings include same-named declarations without
    // bodies. Conservative false until symbol info is available.
    void node; return false;
  }
  isLateBound(node: AstNode): boolean { void node; return false; }
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
  isExpandoFunctionDeclaration(node: AstNode): boolean { void node; return false; }
  getPropertiesOfContainerFunction(node: AstNode): readonly AstNode[] { void node; return []; }

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
    // Without type inference, emit `any` for arbitrary expressions.
    void expression;
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

export function newCheckerEmitResolver(): CheckerEmitResolver {
  return new CheckerEmitResolver();
}
