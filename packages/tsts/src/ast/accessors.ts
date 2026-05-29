/**
 * TS-Go-style accessor functions.
 *
 * The TS-Go port uses free functions like `nodeKind(n)` everywhere
 * because Go's `*ast.Node` is polymorphic. In TypeScript we have
 * typed nodes and direct property access, but the existing transformer
 * port carries thousands of `declare function nodeKind(...)` sites.
 * Rather than rewrite every call site, we centralize the accessors
 * here so each transformer file can do a single ESM import instead.
 *
 * No declares, no runtime side effects — just typed pass-throughs.
 */

import type { Node as AstNode, NodeArray } from "./generated/types.js";
import type { ModifierList } from "./aliases.js";
import { Kind } from "./generated/kind.js";
import {
  type SourceFileLike,
  getECMALineOfPosition as scannerGetECMALineOfPosition,
  getECMALineAndUTF16CharacterOfPosition as scannerGetECMALineAndUTF16CharacterOfPosition,
  skipTrivia as scannerSkipTrivia,
} from "../scanner/trivia.js";
import { computeECMALineStarts, memoize } from "../core/index.js";
// Faithful 1:1 modifier predicate (sole owner). `hasModifier` below delegates
// to this instead of the removed local copy.
import { hasSyntacticModifier } from "./utilities.js";

// Builds an ast.SourceFileLike adapter from a source-file node, reading only
// the public text and computing the ECMA line map from it (mirrors
// SourceFile.ECMALineMap(), whose result is computed lazily and memoized).
function sourceFileLike(file: AstNode | undefined): SourceFileLike {
  const t = file === undefined ? "" : sourceFileText(file);
  const ecmaLineMap = memoize(() => computeECMALineStarts(t));
  return {
    text: () => t,
    ecmaLineMap,
  };
}

type NodeList<T extends AstNode = AstNode> = NodeArray<T>;

// Generic untyped property read. Bridges the gap between TS-Go's
// polymorphic `*ast.Node` and our typed AST nodes; once a transformer
// is fully ported it can switch to direct property access.
function f<T = AstNode>(node: AstNode | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T>)[key];
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic node accessors
// ─────────────────────────────────────────────────────────────────────────────
export function nodeKind(node: AstNode): number { return node.kind; }
export function nodeParent(node: AstNode | undefined): AstNode | undefined { return node?.parent; }
export function nodePos(node: AstNode | undefined): number { return node?.pos ?? -1; }
export function nodeEnd(node: AstNode | undefined): number { return node?.end ?? -1; }
export function nodeFlags(node: AstNode | undefined): number {
  if (node === undefined) return 0;
  return (node as unknown as { flags?: number }).flags ?? 0;
}
export function nodeText(node: AstNode | undefined): string {
  const t = (node as { text?: unknown } | undefined)?.text;
  return typeof t === "string" ? t : "";
}
export function nodeName(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "name"); }
export function nodeBody(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "body"); }
export function nodeInitializerOf(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export interface NodeLoc { readonly pos: number; readonly end: number }
export function nodeLoc(node: AstNode | undefined): NodeLoc | undefined {
  if (node === undefined) return undefined;
  return { pos: node.pos, end: node.end };
}

// ─────────────────────────────────────────────────────────────────────────────
// Setters used by transformers when synthesizing new nodes
// ─────────────────────────────────────────────────────────────────────────────
export function setLoc(node: AstNode | NodeList | undefined, loc: unknown): void {
  if (node === undefined || loc === undefined || loc === null) return;
  const l = loc as { pos?: number; end?: number };
  if (typeof l.pos === "number") (node as unknown as { pos: number }).pos = l.pos;
  if (typeof l.end === "number") (node as unknown as { end: number }).end = l.end;
}

// ─────────────────────────────────────────────────────────────────────────────
// Identifier
// ─────────────────────────────────────────────────────────────────────────────
export function identifierText(node: AstNode | undefined): string { return nodeText(node); }

// ─────────────────────────────────────────────────────────────────────────────
// Binary / unary expressions
// ─────────────────────────────────────────────────────────────────────────────
export function binaryLeft(node: AstNode): AstNode { return f<AstNode>(node, "left")!; }
export function binaryRight(node: AstNode): AstNode { return f<AstNode>(node, "right")!; }
export function binaryOperatorToken(node: AstNode): AstNode { return f<AstNode>(node, "operatorToken")!; }
export function binaryOperatorTokenKind(node: AstNode): number {
  return f<AstNode>(node, "operatorToken")?.kind ?? 0;
}
export function binaryOperatorKind(node: AstNode): number { return binaryOperatorTokenKind(node); }
export function prefixUnaryOperatorRO(node: AstNode): number {
  return (node as unknown as { operator?: number }).operator ?? 0;
}
export function prefixUnaryOperandRO(node: AstNode): AstNode { return f<AstNode>(node, "operand")!; }
export function postfixUnaryOperatorRO(node: AstNode): number {
  return (node as unknown as { operator?: number }).operator ?? 0;
}
export function postfixUnaryOperandRO(node: AstNode): AstNode { return f<AstNode>(node, "operand")!; }

// ─────────────────────────────────────────────────────────────────────────────
// Modifier predicates
// ─────────────────────────────────────────────────────────────────────────────
// hasSyntacticModifier / canHaveModifiers are owned by ./utilities.js (faithful
// 1:1) and re-exported through the ast barrel; the former non-faithful copies
// here were removed during the M2 Fork B migration to avoid duplicate exports.
export function getModifierListNodes(modifiers: ModifierList | AstNode | undefined): readonly AstNode[] {
  if (modifiers === undefined) return [];
  return ((modifiers as unknown as { items?: readonly AstNode[] }).items ?? modifiers) as readonly AstNode[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Source file
// ─────────────────────────────────────────────────────────────────────────────
export function sourceFileIsDeclarationFile(node: AstNode): boolean {
  return Boolean((node as unknown as { isDeclarationFile?: boolean }).isDeclarationFile);
}
export function sourceFileEndOfFileToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "endOfFileToken"); }
export function sourceFileStatementsLoc(node: AstNode): unknown { return nodeLoc(node); }
export function sourceFileStatementsRO(node: AstNode): readonly AstNode[] {
  return f<readonly AstNode[]>(node, "statements") ?? [];
}
export function sourceFileFileName(node: AstNode): string {
  return (node as unknown as { fileName?: string }).fileName ?? "";
}
export function sourceFileCommonJSModuleIndicator(node: AstNode): AstNode | undefined { return f<AstNode>(node, "commonJSModuleIndicator"); }
export function sourceFileExternalModuleIndicator(node: AstNode): AstNode | undefined { return f<AstNode>(node, "externalModuleIndicator"); }
export function isExternalModule(node: AstNode): boolean {
  return Boolean((node as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator);
}

// ─────────────────────────────────────────────────────────────────────────────
// Binding patterns
// ─────────────────────────────────────────────────────────────────────────────
export function bindingPatternElements(node: AstNode): readonly AstNode[] {
  return f<readonly AstNode[]>(node, "elements") ?? [];
}
export function bindingPatternElementsRO(node: AstNode): readonly AstNode[] { return bindingPatternElements(node); }
export function bindingPatternElementsLoc(node: AstNode): unknown { return nodeLoc(node); }
export function bindingElementName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function bindingElementInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function bindingElementDotDotDotToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "dotDotDotToken"); }
export function bindingElementPropertyName(node: AstNode): AstNode | undefined { return f<AstNode>(node, "propertyName"); }
// Parameter-shaped aliases (TS-Go uses a single accessor for both).
export function parameterName(node: AstNode): AstNode { return bindingElementName(node); }
export function parameterInitializer(node: AstNode): AstNode | undefined { return bindingElementInitializer(node); }
export function parameterDotDotDotToken(node: AstNode): AstNode | undefined { return bindingElementDotDotDotToken(node); }

// `getX` style accessors used by the typeeraser port.
export function getNodeName(node: AstNode | undefined): AstNode | undefined { return nodeName(node); }
export function getNodeFlags(node: AstNode | undefined): number { return nodeFlags(node); }
export function getNodeLoc(node: AstNode | undefined): unknown { return nodeLoc(node); }
export function setNodeLoc(node: AstNode | undefined, loc: unknown): void { setLoc(node, loc); }
export function getModifiers(node: AstNode | undefined): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function getInitializer(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function getBody(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "body"); }
export function getParameters(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "parameters"); }
export function getAsteriskToken(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "asteriskToken"); }
export function getEqualsGreaterThan(node: AstNode): AstNode { return f<AstNode>(node, "equalsGreaterThanToken")!; }
export function getDotDotDotToken(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "dotDotDotToken"); }
export function getQuestionDotToken(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "questionDotToken"); }
export function getExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function getArguments(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "arguments"); }
export function getTag(node: AstNode): AstNode { return f<AstNode>(node, "tag")!; }
export function getTemplate(node: AstNode): AstNode { return f<AstNode>(node, "template")!; }
export function getTypeAnnotation(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "type"); }
export function getHeritageToken(node: AstNode): number { return (node as unknown as { token?: number }).token ?? 0; }
export function getHeritageTypes(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "types"); }
export function getHeritageClauses(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "heritageClauses"); }
export function getClassMembers(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "members"); }
export function getJsxTagName(node: AstNode): AstNode { return f<AstNode>(node, "tagName")!; }
export function getJsxAttributes(node: AstNode): AstNode { return f<AstNode>(node, "attributes")!; }
export function getImportClause(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "importClause"); }
export function getModuleSpecifier(node: AstNode): AstNode { return f<AstNode>(node, "moduleSpecifier")!; }
export function getImportAttributes(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "attributes"); }
export function getNamedBindings(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "namedBindings"); }
export function getPhaseModifier(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "phaseModifier"); }
export function getNamedImportElements(node: AstNode): NodeList { return (f<NodeList>(node, "elements") ?? []) as NodeList; }
export function getNamedExportElements(node: AstNode): NodeList { return (f<NodeList>(node, "elements") ?? []) as NodeList; }
export function getExportClause(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "exportClause"); }
export function getNodeListLength(list: unknown): number {
  if (list === undefined || list === null) return 0;
  if (Array.isArray(list)) return list.length;
  return (list as { items?: { length: number } }).items?.length ?? 0;
}
// nodeIsMissing is owned by ./utilities.js (faithful 1:1) and re-exported
// through the ast barrel; the non-faithful copy here was removed during the
// M2 Fork B migration to avoid duplicate exports.
// isStatement is in generated/is.ts
export function isThisParameter(node: AstNode | undefined): boolean {
  return node !== undefined && nodeText(nodeName(node)) === "this";
}
export function hasDecorators(node: AstNode | undefined): boolean {
  return node !== undefined && Boolean((node as unknown as { modifierFlags?: number }).modifierFlags);
}
export function getDecorators(_node: AstNode | undefined): readonly AstNode[] { return []; }
// isAssertionExpression / isSatisfiesExpression are in generated/is.ts
export function isJSDocTypeAssertion(_node: AstNode | undefined): boolean { return false; }
export function isImportTypeOnly(node: AstNode | undefined): boolean {
  return Boolean((node as unknown as { isTypeOnly?: boolean } | undefined)?.isTypeOnly);
}
export function isImportClauseTypeOnly(node: AstNode | undefined): boolean { return isImportTypeOnly(node); }
export function isExportTypeOnly(node: AstNode | undefined): boolean { return isImportTypeOnly(node); }
export function isSpecifierTypeOnly(node: AstNode | undefined): boolean { return isImportTypeOnly(node); }
export function isEnumConst(node: AstNode | undefined): boolean {
  return node !== undefined && (((node as unknown as { flags?: number }).flags ?? 0) & 0x2) !== 0;
}
export function isTrue(value: unknown): boolean { return value === true || value === 1; }
export function skipOuterExpressions(node: AstNode, _kinds: number): AstNode { return node; }
export function isInstantiatedModule(_node: AstNode, _preserveConstEnums: boolean): boolean { return false; }
export function shouldPreserveConstEnums(_opts: unknown): boolean { return false; }
export function getInnermostModuleBody(node: AstNode | undefined): AstNode | undefined { return nodeBody(node); }
// isParameterPropertyDeclaration is owned by ./utilities.js (faithful 1:1) and
// re-exported through the ast barrel; the non-faithful stub here was removed
// during the M2 Fork B migration to avoid duplicate exports.

// ─────────────────────────────────────────────────────────────────────────────
// Variable declarations
// ─────────────────────────────────────────────────────────────────────────────
export function variableStatementDeclarationListRO(node: AstNode): AstNode { return f<AstNode>(node, "declarationList")!; }
export function variableStatementModifiers(node: AstNode): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function variableDeclarationListDeclarationsRO(node: AstNode): readonly AstNode[] {
  return f<readonly AstNode[]>(node, "declarations") ?? [];
}
export function variableDeclarationNameRO(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function variableDeclarationName(node: AstNode): AstNode { return variableDeclarationNameRO(node); }
export function variableDeclarationInitializerRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function variableDeclarationExclamationTokenRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "exclamationToken"); }
export function variableDeclarationTypeRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "type"); }

// ─────────────────────────────────────────────────────────────────────────────
// Imports / exports
// ─────────────────────────────────────────────────────────────────────────────
export function importDeclarationImportClause(node: AstNode): AstNode | undefined { return f<AstNode>(node, "importClause"); }
export function importDeclarationModuleSpecifier(node: AstNode): AstNode | undefined { return f<AstNode>(node, "moduleSpecifier"); }
export function importDeclarationAttributes(node: AstNode): AstNode | undefined { return f<AstNode>(node, "attributes"); }
export function importClauseName(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "name"); }
export function importClauseNamedBindings(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "namedBindings"); }
export function importClauseIsTypeOnly(node: AstNode | undefined): boolean { return Boolean((node as unknown as { isTypeOnly?: boolean } | undefined)?.isTypeOnly); }
export function importSpecifierName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function importSpecifierPropertyName(node: AstNode): AstNode | undefined { return f<AstNode>(node, "propertyName"); }
export function importSpecifierPropertyNameOrNameRO(node: AstNode): AstNode { return importSpecifierPropertyName(node) ?? importSpecifierName(node); }
export function importEqualsName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function importEqualsModuleReference(node: AstNode): AstNode { return f<AstNode>(node, "moduleReference")!; }
export function namedElements(node: AstNode): readonly AstNode[] {
  return f<readonly AstNode[]>(node, "elements") ?? [];
}
export function namedExportsElements(node: AstNode): readonly AstNode[] { return namedElements(node); }
export function exportSpecifierName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function exportSpecifierPropertyName(node: AstNode): AstNode | undefined { return f<AstNode>(node, "propertyName"); }
export function exportSpecifierPropertyNameOrName(node: AstNode): AstNode { return exportSpecifierPropertyName(node) ?? exportSpecifierName(node); }
export function exportDeclarationModuleSpecifier(node: AstNode): AstNode | undefined { return f<AstNode>(node, "moduleSpecifier"); }
export function exportDeclarationExportClause(node: AstNode): AstNode | undefined { return f<AstNode>(node, "exportClause"); }
export function exportDeclarationAttributes(node: AstNode): AstNode | undefined { return f<AstNode>(node, "attributes"); }
export function exportAssignmentIsExportEquals(node: AstNode): boolean {
  return Boolean((node as unknown as { isExportEquals?: boolean }).isExportEquals);
}
export function exportAssignmentExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function exportAssignmentExpressionRO(node: AstNode): AstNode { return exportAssignmentExpression(node); }

// ─────────────────────────────────────────────────────────────────────────────
// Class / function declarations
// ─────────────────────────────────────────────────────────────────────────────
export function classDeclarationName(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "name"); }
export function classDeclName(node: AstNode | undefined): AstNode | undefined { return classDeclarationName(node); }
export function classDeclarationModifiers(node: AstNode): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function classModifiers(node: AstNode): ModifierList | undefined { return classDeclarationModifiers(node); }
export function classDeclarationHeritageClauses(node: AstNode): NodeList | undefined { return f<NodeList>(node, "heritageClauses"); }
export function classHeritageClauses(node: AstNode): NodeList | undefined { return classDeclarationHeritageClauses(node); }
export function classDeclarationMembers(node: AstNode): NodeList | undefined { return f<NodeList>(node, "members"); }
export function classMembers(node: AstNode): NodeList | undefined { return classDeclarationMembers(node); }
export function classTypeParameters(node: AstNode): NodeList | undefined { return f<NodeList>(node, "typeParameters"); }
export function functionDeclarationModifiers(node: AstNode): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function functionAsteriskTokenRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "asteriskToken"); }
export function functionDeclarationParameters(node: AstNode): NodeList | undefined { return f<NodeList>(node, "parameters"); }
export function functionDeclarationBody(node: AstNode): AstNode | undefined { return f<AstNode>(node, "body"); }
export function declParameters(node: AstNode): NodeList | undefined { return f<NodeList>(node, "parameters"); }
export function declModifiers(node: AstNode): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function declName(node: AstNode | undefined): AstNode | undefined { return nodeName(node); }
export function methodAsteriskToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "asteriskToken"); }
export function arrowFunctionBody(node: AstNode): AstNode { return f<AstNode>(node, "body")!; }
export function arrowEqualsGreaterThanToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "equalsGreaterThanToken"); }

// ─────────────────────────────────────────────────────────────────────────────
// For / loop / labeled / if / switch / try / catch
// ─────────────────────────────────────────────────────────────────────────────
export function forInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function forInitializerRO(node: AstNode): AstNode | undefined { return forInitializer(node); }
export function forCondition(node: AstNode): AstNode | undefined { return f<AstNode>(node, "condition"); }
export function forConditionRO(node: AstNode): AstNode | undefined { return forCondition(node); }
export function forIncrementor(node: AstNode): AstNode | undefined { return f<AstNode>(node, "incrementor"); }
export function forIncrementorRO(node: AstNode): AstNode | undefined { return forIncrementor(node); }
export function forBody(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function forBodyRO(node: AstNode): AstNode { return forBody(node); }
export function forStatementBody(node: AstNode): AstNode | undefined { return f<AstNode>(node, "statement"); }
export function forInOrOfInitializer(node: AstNode): AstNode { return f<AstNode>(node, "initializer")!; }
export function forInOrOfInitializerRO(node: AstNode): AstNode { return forInOrOfInitializer(node); }
export function forInOrOfExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function forInOrOfExpressionRO(node: AstNode): AstNode { return forInOrOfExpression(node); }
export function forInOrOfBody(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function forInOrOfBodyRO(node: AstNode): AstNode { return forInOrOfBody(node); }
export function forInOrOfAwaitModifierRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "awaitModifier"); }
export function forInOrOfStatementBody(node: AstNode): AstNode | undefined { return forStatementBody(node); }
export function doStatementStatement(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function doStatementExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function whileStatementExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function whileStatementBody(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function labeledStatementLabel(node: AstNode): AstNode { return f<AstNode>(node, "label")!; }
export function labeledStatementStatement(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function withStatementExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function withStatementStatement(node: AstNode): AstNode { return f<AstNode>(node, "statement")!; }
export function ifStatementExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function ifStatementThen(node: AstNode): AstNode { return f<AstNode>(node, "thenStatement")!; }
export function ifStatementElse(node: AstNode): AstNode | undefined { return f<AstNode>(node, "elseStatement"); }
export function switchStatementExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function switchStatementCaseBlock(node: AstNode): AstNode { return f<AstNode>(node, "caseBlock")!; }
export function caseClauseExpression(node: AstNode): AstNode | undefined { return f<AstNode>(node, "expression"); }
export function caseClauseStatements(node: AstNode): NodeList | undefined { return f<NodeList>(node, "statements"); }
export function catchClauseVariableDeclaration(node: AstNode): AstNode | undefined { return f<AstNode>(node, "variableDeclaration"); }
export function catchClauseBlock(node: AstNode): AstNode { return f<AstNode>(node, "block")!; }

// ─────────────────────────────────────────────────────────────────────────────
// Block
// ─────────────────────────────────────────────────────────────────────────────
export function blockStatements(node: AstNode | undefined): readonly AstNode[] { return f<readonly AstNode[]>(node, "statements") ?? []; }
export function blockStatementsRO(node: AstNode | undefined): readonly AstNode[] { return blockStatements(node); }
export function blockStatementList(node: AstNode | undefined): NodeList | undefined { return f<NodeList>(node, "statements"); }
export function blockStatementListLoc(node: AstNode | undefined): unknown { return nodeLoc(node); }
export function blockStatementsLoc(node: AstNode | undefined): unknown { return nodeLoc(node); }
export function blockMultiLine(node: AstNode | undefined): boolean { return Boolean((node as unknown as { multiLine?: boolean } | undefined)?.multiLine); }
export function blockMultiLineRO(node: AstNode | undefined): boolean { return blockMultiLine(node); }

// ─────────────────────────────────────────────────────────────────────────────
// Parenthesized / partially-emitted / await / yield / await-expression
// ─────────────────────────────────────────────────────────────────────────────
export function parenthesizedExpressionRO(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function partiallyEmittedExpressionRO(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function awaitExpressionOf(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }

// ─────────────────────────────────────────────────────────────────────────────
// Call / new / tagged template / property + element access
// ─────────────────────────────────────────────────────────────────────────────
export function callExpressionExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function callExpressionExpressionRO(node: AstNode): AstNode { return callExpressionExpression(node); }
export function callExpressionArgumentsRO(node: AstNode): readonly AstNode[] { return f<readonly AstNode[]>(node, "arguments") ?? []; }
export function callExpressionArguments(node: AstNode): readonly AstNode[] { return callExpressionArgumentsRO(node); }
export function callExpressionArgumentsListRO(node: AstNode): NodeList | undefined { return f<NodeList>(node, "arguments"); }
export function callExpressionArgumentsLocRO(node: AstNode): unknown { return nodeLoc(node); }
export function callExpressionArgumentsLoc(node: AstNode): unknown { return callExpressionArgumentsLocRO(node); }
export function callExpressionQuestionDotToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "questionDotToken"); }
export function callExpressionQuestionDotTokenRO(node: AstNode): AstNode | undefined { return callExpressionQuestionDotToken(node); }
export function taggedTemplateTagRO(node: AstNode): AstNode { return f<AstNode>(node, "tag")!; }
export function taggedTemplateTemplateRO(node: AstNode): AstNode { return f<AstNode>(node, "template")!; }
export function accessExpressionExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function propertyAccessExpressionOf(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function propertyAccessName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function elementAccessExpressionOf(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function elementArgumentExpression(node: AstNode): AstNode { return f<AstNode>(node, "argumentExpression")!; }
export function expressionOf(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function parenthesizedExpression(node: AstNode): AstNode { return parenthesizedExpressionRO(node); }
export function functionExpressionBody(node: AstNode): AstNode | undefined { return f<AstNode>(node, "body"); }
export function functionExpressionAsteriskToken(node: AstNode): AstNode | undefined { return f<AstNode>(node, "asteriskToken"); }
export function functionAsteriskToken(node: AstNode): AstNode | undefined { return functionAsteriskTokenRO(node); }
export function nodeParameters(node: AstNode): readonly AstNode[] {
  const list = f<NodeList>(node, "parameters");
  if (list === undefined) return [];
  const inner = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? [];
}
export function nodeParameterList(node: AstNode): NodeList | undefined { return f<NodeList>(node, "parameters"); }
export function forInOrOfInitializerNode(node: AstNode): AstNode { return forInOrOfInitializer(node); }
export function forInOrOfExpressionNode(node: AstNode): AstNode { return forInOrOfExpression(node); }
export function forInOrOfAwaitModifierOpt(node: AstNode): AstNode | undefined { return forInOrOfAwaitModifierRO(node); }
export function variableStatementDeclarationList(node: AstNode): AstNode { return variableStatementDeclarationListRO(node); }
export function variableDeclarationListDeclarations(node: AstNode): readonly AstNode[] { return variableDeclarationListDeclarationsRO(node); }
export function variableDeclarationInitializer(node: AstNode): AstNode | undefined { return variableDeclarationInitializerRO(node); }
export function propertyAssignmentInitializer(node: AstNode): AstNode { return propertyAssignmentInitializerRO(node); }
export function shorthandPropertyAssignmentName(node: AstNode): AstNode { return shorthandPropertyAssignmentNameRO(node); }
export function spreadAssignmentExpression(node: AstNode): AstNode { return spreadAssignmentExpressionRO(node); }
export function spreadElementExpression(node: AstNode): AstNode { return spreadElementExpressionRO(node); }
export function prefixUnaryOperator(node: AstNode): number { return prefixUnaryOperatorRO(node); }
export function postfixUnaryOperator(node: AstNode): number { return postfixUnaryOperatorRO(node); }
export function unaryOperand(node: AstNode): AstNode { return f<AstNode>(node, "operand")!; }
export function nodeListNodes(list: AstNode): readonly AstNode[] {
  const inner = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? [];
}
export function propertyDeclarationName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function propertyDeclarationInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function propertyDeclarationModifiers(node: AstNode): ModifierList | undefined { return f<ModifierList>(node, "modifiers"); }
export function parameterDeclarationName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function parameterDeclarationInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function nodeInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function classStaticBlockBodyStatements(node: AstNode): readonly AstNode[] {
  const body = f<AstNode>(node, "body");
  if (body === undefined) return [];
  const stmts = f<NodeList | readonly AstNode[]>(body, "statements");
  if (stmts === undefined) return [];
  const inner = (stmts as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? (stmts as unknown as readonly AstNode[]);
}
export function expressionOfStatement(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function stringLiteralText(node: AstNode): string {
  const t = (node as unknown as { text?: string }).text;
  return t ?? "";
}
export function classMemberListLoc(node: AstNode): unknown {
  const members = f<NodeList>(node, "members");
  return members !== undefined ? nodeLoc(members as unknown as AstNode) : nodeLoc(node);
}
export function classTypeParameterList(node: AstNode): NodeList | undefined {
  return f<NodeList>(node, "typeParameters");
}
export function functionExpressionName(node: AstNode): AstNode | undefined {
  return f<AstNode>(node, "name");
}
export function propertyNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return nodeText(node);
}
export function propertyNameExpression(node: AstNode): AstNode {
  const k = nodeKind(node);
  if (k === Kind.ComputedPropertyName) return f<AstNode>(node, "expression")!;
  return node;
}
export function propertyAssignmentName(node: AstNode): AstNode { return propertyAssignmentNameRO(node); }
export function shorthandName(node: AstNode): AstNode { return shorthandPropertyAssignmentNameRO(node); }
export function shorthandObjectAssignmentInitializer(node: AstNode): AstNode | undefined { return shorthandObjectAssignmentInitializerRO(node); }
export function shorthandEqualsToken(node: AstNode): AstNode | undefined { return shorthandEqualsTokenRO(node); }
export function cloneIdentifier(node: AstNode, _factory?: unknown): AstNode {
  return { ...(node as unknown as Record<string, unknown>) } as unknown as AstNode;
}
export function getQualifiedNameLeft(node: AstNode): AstNode { return f<AstNode>(node, "left")!; }
export function getQualifiedNameRight(node: AstNode): AstNode { return f<AstNode>(node, "right")!; }
export function getParenthesizedTypeType(node: AstNode): AstNode { return f<AstNode>(node, "type")!; }
export function getUnionOrIntersectionTypes(node: AstNode): readonly AstNode[] {
  const types = f<NodeList | readonly AstNode[]>(node, "types");
  if (types === undefined) return [];
  const inner = (types as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? (types as unknown as readonly AstNode[]);
}
export function getConditionalTrueType(node: AstNode): AstNode { return f<AstNode>(node, "trueType")!; }
export function getConditionalFalseType(node: AstNode): AstNode { return f<AstNode>(node, "falseType")!; }
export function getTypeOperatorOperator(node: AstNode): number { return f<number>(node, "operator") ?? 0; }
export function getTypeOperatorType(node: AstNode): AstNode { return f<AstNode>(node, "type")!; }
export function getAccessorParameters(node: AstNode): readonly AstNode[] {
  const list = f<NodeList>(node, "parameters");
  if (list === undefined) return [];
  const inner = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? [];
}
export function getParameterType(node: AstNode): AstNode | undefined { return f<AstNode>(node, "type"); }
export function getReturnType(node: AstNode): AstNode | undefined { return f<AstNode>(node, "type"); }
// Delegates to the faithful hasSyntacticModifier (sole owner in ./utilities.js).
export function hasModifier(node: AstNode, flag: number): boolean { return hasSyntacticModifier(node, flag); }
// hasStaticModifier is owned by ./utilities.js (faithful 1:1) and re-exported
// through the ast barrel; the non-faithful copy here was removed during the
// M2 Fork B migration to avoid duplicate exports.
export function parentExpression(parent: AstNode): AstNode | undefined { return f<AstNode>(parent, "expression"); }
export function parentInitializer(parent: AstNode): AstNode | undefined { return f<AstNode>(parent, "initializer"); }
export function parentBody(parent: AstNode): AstNode | undefined { return f<AstNode>(parent, "body"); }
export function parentArguments(parent: AstNode): readonly AstNode[] {
  const args = f<NodeList | readonly AstNode[]>(parent, "arguments");
  if (args === undefined) return [];
  const inner = (args as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? (args as unknown as readonly AstNode[]);
}
export function conditionalCondition(node: AstNode): AstNode { return f<AstNode>(node, "condition")!; }
export function conditionalWhenTrue(node: AstNode): AstNode { return f<AstNode>(node, "whenTrue")!; }
export function conditionalWhenFalse(node: AstNode): AstNode { return f<AstNode>(node, "whenFalse")!; }
export function taggedTemplateTag(node: AstNode): AstNode { return f<AstNode>(node, "tag")!; }
export function importAttributeValue(node: AstNode): AstNode { return f<AstNode>(node, "value")!; }
export function jsxTagName(node: AstNode): AstNode { return f<AstNode>(node, "tagName")!; }
export function tryStatementTryBlock(node: AstNode): AstNode { return f<AstNode>(node, "tryBlock")!; }
export function isSuperCall(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if (nodeKind(node) !== Kind.CallExpression) return false;
  const expr = f<AstNode>(node, "expression");
  return expr !== undefined && nodeKind(expr) === Kind.SuperKeyword;
}
export function modifierNodes(node: AstNode | undefined): readonly AstNode[] | undefined {
  const list = f<ModifierList>(node, "modifiers");
  if (list === undefined) return undefined;
  const inner = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
  return inner;
}
// positionIsSynthesized is owned by ./utilities.js (faithful 1:1) and
// re-exported through the ast barrel; the non-faithful copy here was removed
// during the M2 Fork B migration to avoid duplicate exports.
export function isKeywordKind(kind: number): boolean {
  return kind >= Kind.BreakKeyword && kind <= Kind.OfKeyword;
}
export function isAssignmentPattern(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = nodeKind(node);
  return k === Kind.ArrayLiteralExpression || k === Kind.ObjectLiteralExpression;
}
export function isStringOrNumericLiteralLike(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = nodeKind(node);
  return k === Kind.StringLiteral || k === Kind.NumericLiteral || k === Kind.NoSubstitutionTemplateLiteral;
}
export function getSourceFileOfNode(node: AstNode | undefined): AstNode | undefined {
  let cur: AstNode | undefined = node;
  while (cur !== undefined && nodeKind(cur) !== Kind.SourceFile) {
    cur = nodeParent(cur);
  }
  return cur;
}
export function getECMALineOfPosition(sourceFile: AstNode | undefined, pos: number): number {
  return scannerGetECMALineOfPosition(sourceFileLike(sourceFile), pos);
}
export function getPropertyAccessExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function getPropertyAccessName(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function getModifierListLength(list: unknown): number {
  if (list === undefined || list === null) return 0;
  const nodes = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
  return nodes?.length ?? 0;
}
export function moveRangePastModifiers(node: AstNode): unknown {
  const mods = f<ModifierList>(node, "modifiers");
  if (mods === undefined) return nodeLoc(node);
  return nodeLoc(mods as unknown as AstNode);
}
export function copyNodeListLoc(_src: unknown, _dst: unknown): void { /* loc handled via setLoc elsewhere */ }
export function copyModifierListLoc(_src: unknown, _dst: unknown): void { /* loc handled via setLoc elsewhere */ }
export function skipParentheses(node: AstNode): AstNode {
  let cur: AstNode = node;
  while (nodeKind(cur) === Kind.ParenthesizedExpression) {
    cur = parenthesizedExpressionRO(cur);
  }
  return cur;
}
export function isSuperProperty(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = nodeKind(node);
  if (k === Kind.PropertyAccessExpression || k === Kind.ElementAccessExpression) {
    return nodeKind(f<AstNode>(node, "expression")!) === Kind.SuperKeyword;
  }
  return false;
}
export function isUpdateExpression(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = nodeKind(node);
  if (k !== Kind.PrefixUnaryExpression && k !== Kind.PostfixUnaryExpression) return false;
  const op = f<number>(node, "operator");
  return op === Kind.PlusPlusToken || op === Kind.MinusMinusToken;
}
export function isSimpleCopiableExpression(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = nodeKind(node);
  return k === Kind.Identifier
    || k === Kind.StringLiteral
    || k === Kind.NoSubstitutionTemplateLiteral
    || k === Kind.NumericLiteral
    || k === Kind.BigIntLiteral
    || k === Kind.SuperKeyword
    || k === Kind.ThisKeyword
    || k === Kind.NullKeyword
    || k === Kind.TrueKeyword
    || k === Kind.FalseKeyword;
}

// ─────────────────────────────────────────────────────────────────────────────
// Property / shorthand / spread assignments
// ─────────────────────────────────────────────────────────────────────────────
export function propertyAssignmentNameRO(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function propertyAssignmentInitializerRO(node: AstNode): AstNode { return f<AstNode>(node, "initializer")!; }
export function shorthandPropertyAssignmentNameRO(node: AstNode): AstNode { return f<AstNode>(node, "name")!; }
export function shorthandObjectAssignmentInitializerRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "objectAssignmentInitializer"); }
export function shorthandEqualsTokenRO(node: AstNode): AstNode | undefined { return f<AstNode>(node, "equalsToken"); }
export function spreadAssignmentExpressionRO(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function spreadElementExpressionRO(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function objectLiteralProperties(node: AstNode): readonly AstNode[] { return f<readonly AstNode[]>(node, "properties") ?? []; }
export function arrayLiteralElements(node: AstNode): readonly AstNode[] { return f<readonly AstNode[]>(node, "elements") ?? []; }

// ─────────────────────────────────────────────────────────────────────────────
// JSX
// ─────────────────────────────────────────────────────────────────────────────
export function jsxSpreadAttributeExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function jsxNamespacedNamespaceText(node: AstNode): string {
  const ns = (node as unknown as { namespace?: AstNode }).namespace;
  return nodeText(ns);
}
export function jsxNamespacedNameText(node: AstNode): string {
  const name = (node as unknown as { name?: AstNode }).name;
  return nodeText(name);
}
export function jsxOpeningElement(node: AstNode): AstNode { return f<AstNode>(node, "openingElement")!; }
export function jsxChildren(node: AstNode): readonly AstNode[] { return f<readonly AstNode[]>(node, "children") ?? []; }
export function jsxFragmentOpeningFragment(node: AstNode): AstNode { return f<AstNode>(node, "openingFragment")!; }
export function jsxFragmentChildren(node: AstNode): readonly AstNode[] { return f<readonly AstNode[]>(node, "children") ?? []; }
export function jsxAttributeName(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "name"); }
export function jsxAttributeInitializer(node: AstNode): AstNode | undefined { return f<AstNode>(node, "initializer"); }
export function jsxExpressionExpression(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "expression"); }
export function jsxExpressionDotDotDot(node: AstNode | undefined): AstNode | undefined { return f<AstNode>(node, "dotDotDotToken"); }
export function jsxTextText(node: AstNode): string { return nodeText(node); }
export function nodeExpression(node: AstNode): AstNode { return f<AstNode>(node, "expression")!; }
export function nodeAttributesProperties(node: AstNode): readonly AstNode[] {
  const attrs = (node as unknown as { attributes?: { properties?: readonly AstNode[] } }).attributes;
  return attrs?.properties ?? [];
}
export function nodeTagName(node: AstNode): AstNode { return f<AstNode>(node, "tagName")!; }
export function qualifiedNameLeft(node: AstNode): AstNode { return f<AstNode>(node, "left")!; }
export function qualifiedNameRight(node: AstNode): AstNode { return f<AstNode>(node, "right")!; }
export function setParentInChildren(_node: AstNode): void { /* no-op until binder phase */ }
export function clearNodeSynthesizedFlag(_node: AstNode): void { /* no-op until printer phase */ }
export function setNodeParent(node: AstNode, parent: AstNode): void { (node as unknown as { parent: AstNode }).parent = parent; }
export function stringLiteralTokenFlags(node: AstNode): number {
  return (node as unknown as { tokenFlags?: number }).tokenFlags ?? 0;
}
export function setStringLiteralTokenFlags(node: AstNode, flags: number): void {
  (node as unknown as { tokenFlags: number }).tokenFlags = flags;
}
export function compilerOptionsEmitScriptTarget(opts: unknown): number {
  return compilerOptionsGetEmitScriptTarget(opts);
}
export function compilerOptionsReactNamespace(opts: unknown): string {
  return (opts as { reactNamespace?: string } | undefined)?.reactNamespace ?? "React";
}
export function getJSXRuntimeImport(importSource: string, _opts: unknown): string { return importSource; }
export function getJSXImplicitImportBase(_opts: unknown, _file: AstNode): string { return ""; }
export function sourceFileName(file: AstNode): string { return sourceFileFileName(file); }
export function sourceFileText(file: AstNode): string {
  return (file as unknown as { text?: string }).text ?? "";
}
export function isExternalOrCommonJSModule(file: AstNode): boolean { return isExternalModule(file); }
// isPrologueDirective is owned by ./utilities.js (faithful 1:1) and re-exported
// through the ast barrel; the non-faithful copy here was removed during the
// M2 Fork B migration to avoid duplicate exports.
export function isIntrinsicJsxName(name: string): boolean {
  return name.length > 0 && name[0] === name[0]?.toLowerCase();
}
export function isIdentifierText(text: string, _variant: number): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(text);
}
export function isLineBreak(code: number): boolean {
  return code === 10 /* \n */ || code === 13 /* \r */ ||
    code === 0x2028 /* line separator */ || code === 0x2029 /* paragraph separator */;
}
export function isWhiteSpaceSingleLine(code: number): boolean {
  return code === 0x20 || code === 0x9 || code === 0xB || code === 0xC ||
    code === 0xA0 || code === 0x1680 || code === 0xFEFF ||
    (code >= 0x2000 && code <= 0x200A) || code === 0x202F || code === 0x205F || code === 0x3000;
}
export function skipTrivia(text: string, pos: number): number {
  return scannerSkipTrivia(text, pos);
}
export function getSemanticJsxChildren(children: readonly AstNode[]): readonly AstNode[] {
  return children.filter((c) => !(c.kind === 14 /* JsxText */ && nodeText(c).trim() === ""));
}
export function compareStringsCaseSensitive(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
export function newTextRange(pos: number, end: number): { pos: number; end: number } {
  return { pos, end };
}
export function getECMALineAndUTF16CharacterOfPosition(file: AstNode, pos: number): { line: number; character: number } {
  return scannerGetECMALineAndUTF16CharacterOfPosition(sourceFileLike(file), pos);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subtree facts + emit
// ─────────────────────────────────────────────────────────────────────────────
export function subtreeFacts(node: AstNode): number {
  return (node as unknown as { transformFlags?: number; subtreeFacts?: number }).subtreeFacts
    ?? (node as unknown as { transformFlags?: number }).transformFlags ?? 0;
}
export function getSubtreeFacts(node: AstNode): number { return subtreeFacts(node); }

// ─────────────────────────────────────────────────────────────────────────────
// AutoGenerate (generated identifier info)
// ─────────────────────────────────────────────────────────────────────────────
export function autoGenInfoIsFileLevel(info: unknown): boolean {
  return Boolean((info as { flags?: number } | undefined)?.flags ?? 0 & /* FileLevel */ 0x20);
}
export function autoGenInfoIsOptimistic(info: unknown): boolean {
  return Boolean((info as { flags?: number } | undefined)?.flags ?? 0 & /* Optimistic */ 0x10);
}
export function autoGenInfoIsReservedInNestedScopes(info: unknown): boolean {
  return Boolean((info as { flags?: number } | undefined)?.flags ?? 0 & /* ReservedInNestedScopes */ 0x8);
}
export function autoGenInfoHasAllowNameSubstitution(info: unknown): boolean {
  return Boolean((info as { flags?: number } | undefined)?.flags ?? 0 & /* AllowNameSubstitution */ 0x40);
}

// ─────────────────────────────────────────────────────────────────────────────
// Predicates not in generated/is.ts
// ─────────────────────────────────────────────────────────────────────────────
export function isBlockNode(node: AstNode | undefined): boolean { return node !== undefined && node.kind === /* Kind.Block */ 234; }
export function isStringLiteralLike(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  return node.kind === /* StringLiteral */ 11 || node.kind === /* NoSubstitutionTemplateLiteral */ 14;
}
// isAssignmentExpression / isCommaExpression are owned by ./utilities.js
// (faithful 1:1) and re-exported through the ast barrel; the non-faithful
// copies here were removed during the M2 Fork B migration to avoid duplicate
// exports.
// isExpression lives in generated/is.ts
export function isInJSFile(_node: AstNode): boolean { return false; }
export function isDefaultImport(node: AstNode | undefined): boolean {
  return node !== undefined && importClauseName(node) !== undefined;
}
export function isImportCall(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if (node.kind !== /* CallExpression */ 213) return false;
  const exp = callExpressionExpression(node);
  return exp.kind === /* ImportKeyword */ 102;
}
export function isRequireCall(node: AstNode | undefined, _requireStringLiteralLikeArgument: boolean): boolean {
  if (node === undefined) return false;
  if (node.kind !== /* CallExpression */ 213) return false;
  const exp = callExpressionExpression(node);
  return exp.kind === /* Identifier */ 80 && nodeText(exp) === "require";
}
export function isExternalModuleImportEqualsDeclaration(_node: AstNode | undefined): boolean { return false; }
// isDestructuringAssignment lives in generated/is.ts
export function moduleExportNameIsDefault(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  return nodeText(node) === "default";
}
export function isEffectiveExternalModule(node: AstNode, _opts: unknown): boolean { return isExternalModule(node); }
export function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  let cur: AstNode | undefined = node;
  while (cur !== undefined) {
    if (predicate(cur)) return cur;
    cur = cur.parent;
  }
  return undefined;
}
export function getNamespaceDeclarationNode(node: AstNode | undefined): AstNode | undefined {
  return importClauseNamedBindings(node);
}
export function fileExtensionIsOneOf(name: string, exts: readonly string[]): boolean {
  for (const ext of exts) if (name.endsWith(ext)) return true;
  return false;
}
export function fileExtensionIs(name: string, ext: string): boolean { return name.endsWith(ext); }

// ─────────────────────────────────────────────────────────────────────────────
// Compiler-option getters (forward-declared until tsoptions ports lands)
// ─────────────────────────────────────────────────────────────────────────────
export function compilerOptionsGetEmitScriptTarget(opts: unknown): number {
  return ((opts as { target?: number } | undefined)?.target) ?? 0;
}
export function compilerOptionsGetEmitModuleKind(opts: unknown): number {
  return ((opts as { module?: number } | undefined)?.module) ?? 0;
}
export function compilerOptionsRewriteRelativeImportExtensions(opts: unknown): boolean {
  return Boolean((opts as { rewriteRelativeImportExtensions?: boolean } | undefined)?.rewriteRelativeImportExtensions);
}
export function compilerOptionsJsx(opts: unknown): number {
  return ((opts as { jsx?: number } | undefined)?.jsx) ?? 0;
}
export function shouldTransformImportCallStandalone(_fileName: string, _opts: unknown, _moduleFormat: number): boolean {
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Misc small helpers
// ─────────────────────────────────────────────────────────────────────────────
// cloneNode lives in generated/factory.ts
export function appendVariableDeclaration<T>(arr: T[], decl: T): T[] {
  return [...arr, decl];
}
// nodeIsSynthesized is owned by ./utilities.js (faithful 1:1) and re-exported
// through the ast barrel; the non-faithful copy here was removed during the
// M2 Fork B migration to avoid duplicate exports.
export function getTextOfNode(node: AstNode | undefined): string { return nodeText(node); }
export function safeMultiLineComment(text: string): string {
  return text.replace(/\*\//g, "*\\/");
}
export function assignmentTargetContainsSuperProperty(_node: AstNode): boolean { return false; }
export function getOriginalIfFunctionLike(node: AstNode): AstNode { return node; }
export function getFunctionFlags(_node: AstNode): number { return 0; }

// Type marker for forwarders.
export type Accessor = (node: AstNode) => unknown;
