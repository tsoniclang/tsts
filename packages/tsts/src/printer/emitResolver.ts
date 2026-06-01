/**
 * EmitResolver interface.
 *
 * Port of TS-Go `internal/printer/emitresolver.go` (~126 LoC). The
 * EmitResolver is the printer's view of the checker — queries about
 * symbol references, type-only declarations, value aliases, that are
 * needed during emit (declaration files, import elision, etc.).
 */

import type { Node as AstNode, Declaration, IdentifierNode, Expression } from "../ast/index.js";

export interface EmitResolver {
  isReferencedAliasDeclaration(node: AstNode): boolean;
  isValueAliasDeclaration(node: AstNode): boolean;
  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean;
  hasGlobalName(name: string): boolean;
  getReferencedExportContainer(node: IdentifierNode, prefixLocals: boolean): AstNode | undefined;
  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined;
  getReferencedDeclarationWithCollidingName(node: IdentifierNode): Declaration | undefined;
  isDeclarationWithCollidingName(node: AstNode): boolean;
  isValueAlias(node: AstNode): boolean;
  getConstantValue(node: AstNode): string | number | undefined;
  collectLinkedAliases(node: IdentifierNode, setVisibility: boolean): readonly AstNode[];
  isImplementationOfOverload(node: AstNode): boolean;
  isLateBound(node: AstNode): boolean;
  isLiteralComputedPropertyDeclarationName(node: AstNode): boolean;
  getEnumMemberValue(node: AstNode): string | number | undefined;
  getNodeCheckFlags(node: AstNode): number;
  isOptionalParameter(node: AstNode): boolean;
  isRequiredInitializedParameter(node: AstNode): boolean;
  isOptionalUninitializedParameterProperty(node: AstNode): boolean;
  isExpandoFunctionDeclaration(node: AstNode): boolean;
  getPropertiesOfContainerFunction(node: AstNode): readonly AstNode[];
  createTypeOfDeclaration(declaration: AstNode): AstNode;
  createReturnTypeOfSignatureDeclaration(signatureDeclaration: AstNode): AstNode;
  createTypeOfExpression(expression: Expression): AstNode;
  isSymbolAccessible(symbol: unknown, enclosingDeclaration: AstNode | undefined, meaning: number, shouldComputeAliases: boolean): SymbolAccessibilityResult;
}

export interface SymbolAccessibilityResult {
  accessibility: number;
  errorSymbolName?: string;
  errorModuleName?: string;
  errorNode?: AstNode;
  aliasesToMakeVisible?: readonly AstNode[];
}

export const SymbolAccessibility = {
  Accessible: 0,
  NotAccessible: 1,
  CannotBeNamed: 2,
  NotResolved: 3,
} as const;
