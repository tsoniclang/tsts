/**
 * AST type aliases + re-exports.
 *
 * The TS-Go Go port and the TS-side AST schema use slightly different
 * names for the same concepts. This module unifies them:
 *
 * - `Identifier` (TS schema) ↔ `IdentifierNode` (TS-Go-style)
 * - `StringLiteral` ↔ `StringLiteralNode`
 * - `NodeArray<ModifierLike>` ↔ `ModifierList`
 *
 * It also defines the minimal types TS-Go exposes from its
 * `internal/ast` package that the TS schema doesn't yet have (because
 * they belong to checker/binder/printer state, not the AST proper).
 * These are kept as type-only aliases over `unknown` so consumers can
 * thread them without prescribing a runtime shape.
 *
 * No declares, no runtime — pure types.
 */

import type { int } from "@tsonic/core/types.js";

import type {
  Identifier,
  StringLiteral,
  NumericLiteral,
  BigIntLiteral,
  NoSubstitutionTemplateLiteral,
  ModifierLike,
  ClassDeclaration,
  ClassExpression,
  FunctionDeclaration,
  FunctionExpression,
  ArrowFunction,
  MethodDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  ConstructorDeclaration,
  PropertyDeclaration,
  PropertyAssignment,
  ShorthandPropertyAssignment,
  ParameterDeclaration,
  BindingElement,
  VariableDeclaration,
  VariableStatement,
  VariableDeclarationList,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  EnumDeclaration,
  EnumMember,
  ModuleDeclaration,
  ImportDeclaration,
  ImportClause,
  ImportSpecifier,
  ImportEqualsDeclaration,
  ExportDeclaration,
  ExportAssignment,
  ExportSpecifier,
  NamedImports,
  NamedExports,
  Block,
  HeritageClause,
  ExpressionWithTypeArguments,
  TypeReferenceNode,
  TypeParameterDeclaration,
  CallExpression,
  NewExpression,
  PropertyAccessExpression,
  ElementAccessExpression,
  BinaryExpression,
  ConditionalExpression,
  ParenthesizedExpression,
  TaggedTemplateExpression,
  ComputedPropertyName,
  ForStatement,
  ExpressionStatement,
  ClassStaticBlockDeclaration,
  CallSignatureDeclaration,
  ConstructSignatureDeclaration,
  IndexSignatureDeclaration,
  PropertySignatureDeclaration,
  MethodSignatureDeclaration,
  MappedTypeNode,
  ImportTypeNode,
  ConstructorTypeNode,
  FunctionTypeNode,
  ConditionalTypeNode,
  EntityName,
  QualifiedName,
  BindingPattern,
  Statement,
  Expression,
  Declaration,
  TypeNode,
  ForInitializer,
  PrivateIdentifier,
  JSDocTypeExpression,
  JSDocTypeLiteral,
  JSDocAllType,
  JsxSelfClosingElement,
  JsxOpeningElement,
  StatementList,
  ParameterList,
  TypeParameterList,
} from "./generated/nodes.js";

import type {
  Node,
  NodeArray,
  SourceFile,
  Symbol,
  FlowNode,
  FileReference,
  TextRange,
} from "./generated/types.js";

// ---------------------------------------------------------------------------
// Naming aliases — TS-Go-style names for TS-schema types
// ---------------------------------------------------------------------------

export type IdentifierNode = Identifier;
export type StringLiteralNode = StringLiteral;
export type NumericLiteralNode = NumericLiteral;
export type BigIntLiteralNode = BigIntLiteral;
export type NoSubstitutionTemplateLiteralNode = NoSubstitutionTemplateLiteral;
export type PrivateIdentifierNode = PrivateIdentifier;
// ClassLikeDeclaration, FunctionLikeDeclaration, ClassElement, ModuleName,
// LiteralLikeNode, BindingName, PropertyName, LeftHandSideExpression,
// MemberName all live in ./generated/nodes.ts now — re-exporting them here
// would create duplicate-export conflicts.
export type FunctionDeclarationNode = FunctionDeclaration;
export type EnumDeclarationNode = EnumDeclaration;
export type ModuleDeclarationNode = ModuleDeclaration;
export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;

/** `NodeArray<ModifierLike>` is what TS-Go calls a `ModifierList`. */
export type ModifierList = NodeArray<ModifierLike>;

// ---------------------------------------------------------------------------
// Node-union aliases not covered by ./generated/nodes.ts
// (TS-Go internal/ast/ast.go:1257-1265 — modeled as `= Node`).
// ---------------------------------------------------------------------------

// (ImportDeclaration | ExportDeclaration | JSDocImportTag) & { moduleSpecifier: StringLiteral } | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteral }} | RequireOrImportCall | ValidImportTypeNode
export type AnyValidImportOrReExport = Node;

// AnyImportSyntax | RequireVariableStatement
export type AnyImportOrRequireStatement = Node;

// ---------------------------------------------------------------------------
// Re-exports for one-stop import
// ---------------------------------------------------------------------------

export type {
  Identifier,
  StringLiteral,
  NumericLiteral,
  BigIntLiteral,
  NoSubstitutionTemplateLiteral,
  ModifierLike,
  ClassDeclaration,
  ClassExpression,
  FunctionDeclaration,
  FunctionExpression,
  ArrowFunction,
  MethodDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  ConstructorDeclaration,
  PropertyDeclaration,
  PropertyAssignment,
  ShorthandPropertyAssignment,
  ParameterDeclaration,
  BindingElement,
  VariableDeclaration,
  VariableStatement,
  VariableDeclarationList,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  EnumDeclaration,
  EnumMember,
  ModuleDeclaration,
  ImportDeclaration,
  ImportClause,
  ImportSpecifier,
  ImportEqualsDeclaration,
  ExportDeclaration,
  ExportAssignment,
  ExportSpecifier,
  NamedImports,
  NamedExports,
  Block,
  HeritageClause,
  ExpressionWithTypeArguments,
  TypeReferenceNode,
  TypeParameterDeclaration,
  CallExpression,
  NewExpression,
  PropertyAccessExpression,
  ElementAccessExpression,
  BinaryExpression,
  ConditionalExpression,
  ParenthesizedExpression,
  TaggedTemplateExpression,
  ComputedPropertyName,
  ForStatement,
  ExpressionStatement,
  ClassStaticBlockDeclaration,
  CallSignatureDeclaration,
  ConstructSignatureDeclaration,
  IndexSignatureDeclaration,
  PropertySignatureDeclaration,
  MethodSignatureDeclaration,
  MappedTypeNode,
  ImportTypeNode,
  ConstructorTypeNode,
  FunctionTypeNode,
  ConditionalTypeNode,
  EntityName,
  QualifiedName,
  BindingPattern,
  Statement,
  Expression,
  Declaration,
  TypeNode,
  ForInitializer,
  PrivateIdentifier,
  JSDocTypeExpression,
  JSDocTypeLiteral,
  JSDocAllType,
  JsxSelfClosingElement,
  JsxOpeningElement,
  StatementList,
  ParameterList,
  TypeParameterList,
};
export type { Node, NodeArray, SourceFile, Symbol, FlowNode, FileReference, TextRange };

// ---------------------------------------------------------------------------
// Symbol-table + flow types
// (TS-Go's internal/ast/symbol.go + internal/ast/flow.go shapes)
// ---------------------------------------------------------------------------

/** Symbol table keyed by escaped name. */
export type SymbolTable = Map<string, Symbol>;

/** Module instance state per ambient module declaration. */
export type ModuleInstanceState = 0 | 1 | 2;

/** Flow-label node (control-flow analysis). */
export interface FlowLabel extends FlowNode {
  antecedents?: FlowList | undefined;
}

/** Singly-linked list of flow nodes. */
export interface FlowList {
  head: FlowNode;
  tail: FlowList | undefined;
}

/** Position-map index for binary-AST encoding. */
export interface PositionMap {
  getLineAndCharacterOfPosition(pos: number): { line: number; character: number };
  getPositionOfLineAndCharacter(line: number, character: number): number;
}

// ---------------------------------------------------------------------------
// Comment-range type (shared with scanner; redeclared here for ergonomics)
// ---------------------------------------------------------------------------

export interface CommentRange extends TextRange {
  pos: int;
  end: int;
  hasTrailingNewLine?: boolean;
  kind: number;
}

// ---------------------------------------------------------------------------
// Diagnostic — re-exported from diagnostics module
// ---------------------------------------------------------------------------

export type { Diagnostic } from "../diagnostics/types.js";
