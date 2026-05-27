/**
 * Format engine — utility helpers.
 *
 * Port of TS-Go `internal/format/util.go`. Provides line-position
 * lookups, grammar-error detection, list-level node enclosure, and
 * open/close token kind mapping used by the rule engine.
 *
 * AST predicates (isTypeParameterDeclaration, etc.) and scanner
 * line-table helpers are forward-declared until their home modules
 * mature.
 */

import type { Kind, Node as AstNode, NodeArray, SourceFile } from "../ast/index.js";

import type { TextRange } from "./api.js";

/**
 * Returns true if `range` is contained in a single source line.
 * Mirrors TS-Go `rangeIsOnOneLine`.
 */
export function rangeIsOnOneLine(range: TextRange, file: SourceFile): boolean {
  const startLine = getECMALineOfPosition(file, range.pos);
  const endLine = getECMALineOfPosition(file, range.end);
  return startLine === endLine;
}

/**
 * Mirrors TS-Go `getOpenTokenForList`. Returns the kind of the opening
 * token for a node's list (parameters, type parameters, type
 * arguments, etc.).
 */
export function getOpenTokenForList(node: AstNode, list: NodeArray<AstNode>): Kind {
  switch (node.kind) {
    case KindConstructor:
    case KindFunctionDeclaration:
    case KindFunctionExpression:
    case KindMethodDeclaration:
    case KindMethodSignature:
    case KindArrowFunction:
    case KindCallSignature:
    case KindConstructSignature:
    case KindFunctionType:
    case KindConstructorType:
    case KindGetAccessor:
    case KindSetAccessor:
      if (typeParameterList(node) === list) return KindLessThanToken;
      if (parameterList(node) === list) return KindOpenParenToken;
      break;
    case KindCallExpression:
    case KindNewExpression:
      if (typeArgumentList(node) === list) return KindLessThanToken;
      if (argumentList(node) === list) return KindOpenParenToken;
      break;
    case KindClassDeclaration:
    case KindClassExpression:
    case KindInterfaceDeclaration:
    case KindTypeAliasDeclaration:
      if (typeParameterList(node) === list) return KindLessThanToken;
      break;
    case KindTypeReference:
    case KindTaggedTemplateExpression:
    case KindTypeQuery:
    case KindExpressionWithTypeArguments:
    case KindImportType:
      if (typeArgumentList(node) === list) return KindLessThanToken;
      break;
    case KindTypeLiteral:
      return KindOpenBraceToken;
  }
  return KindUnknown;
}

/**
 * Returns the matching close-token kind for an open-token kind.
 * Mirrors TS-Go `getCloseTokenForOpenToken`.
 */
export function getCloseTokenForOpenToken(kind: Kind): Kind {
  switch (kind) {
    case KindOpenParenToken:
      return KindCloseParenToken;
    case KindLessThanToken:
      return KindGreaterThanToken;
    case KindOpenBraceToken:
      return KindCloseBraceToken;
  }
  return KindUnknown;
}

/**
 * Returns the start-of-line position for `position` in `sourceFile`.
 * Mirrors TS-Go `GetLineStartPositionForPosition`.
 */
export function getLineStartPositionForPosition(position: number, sourceFile: SourceFile): number {
  const lineStarts = getECMALineStarts(sourceFile);
  const line = getECMALineOfPosition(sourceFile, position);
  return lineStarts[line]!;
}

/**
 * Tests whether `child` is a grammar error on `parent`. Mirrors TS-Go
 * `isGrammarError`.
 */
export function isGrammarError(parent: AstNode, child: AstNode): boolean {
  if (isTypeParameterDeclaration(parent)) {
    return child === typeParameterExpression(parent);
  }
  if (isPropertySignatureDeclaration(parent)) {
    return child === nodeInitializer(parent);
  }
  if (isPropertyDeclaration(parent)) {
    return isAutoAccessorPropertyDeclaration(parent) && child === postfixToken(parent) && child.kind === KindQuestionToken;
  }
  if (isPropertyAssignment(parent)) {
    const mods = modifiers(parent);
    return child === postfixToken(parent) || (mods !== undefined && isGrammarErrorElement(mods, child, isModifierLike));
  }
  if (isShorthandPropertyAssignment(parent)) {
    const mods = modifiers(parent);
    return child === equalsTokenOf(parent) || child === postfixToken(parent) ||
      (mods !== undefined && isGrammarErrorElement(mods, child, isModifierLike));
  }
  if (isMethodDeclaration(parent)) {
    return child === postfixToken(parent) && child.kind === KindExclamationToken;
  }
  if (isConstructorDeclaration(parent)) {
    return child === constructorType(parent) || isGrammarErrorElement(typeParameterList(parent), child, isTypeParameterDeclaration);
  }
  if (isGetAccessorDeclaration(parent)) {
    return isGrammarErrorElement(typeParameterList(parent), child, isTypeParameterDeclaration);
  }
  if (isSetAccessorDeclaration(parent)) {
    return child === setAccessorType(parent) || isGrammarErrorElement(typeParameterList(parent), child, isTypeParameterDeclaration);
  }
  if (isNamespaceExportDeclaration(parent)) {
    const mods = modifiers(parent);
    return mods !== undefined && isGrammarErrorElement(mods, child, isModifierLike);
  }
  return false;
}

function isGrammarErrorElement(
  list: NodeArray<AstNode> | undefined,
  child: AstNode,
  isPossibleElement: (n: AstNode) => boolean,
): boolean {
  if (list === undefined || list.length === 0) return false;
  if (!isPossibleElement(child)) return false;
  for (const n of list) {
    if (n === child) return true;
  }
  return false;
}

/**
 * Like astnav.FindPrecedingToken, but only returns a result if the
 * token has the expected kind and ends exactly at `end`. Mirrors
 * TS-Go `findImmediatelyPrecedingTokenOfKind`.
 */
export function findImmediatelyPrecedingTokenOfKind(
  end: number,
  expectedTokenKind: Kind,
  sourceFile: SourceFile,
): AstNode | undefined {
  const precedingToken = findPrecedingToken(sourceFile, end);
  if (precedingToken === undefined || precedingToken.kind !== expectedTokenKind || nodeEndOf(precedingToken) !== end) {
    return undefined;
  }
  return precedingToken;
}

/**
 * Finds the highest node enclosing `node` at the same list level whose
 * end doesn't exceed `node.end`. Mirrors TS-Go
 * `findOutermostNodeWithinListLevel`.
 */
export function findOutermostNodeWithinListLevel(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (
    current !== undefined &&
    nodeParent(current) !== undefined &&
    nodeEndOf(nodeParent(current)!) === nodeEndOf(node!) &&
    !isListElement(nodeParent(current)!, current)
  ) {
    current = nodeParent(current);
  }
  return current;
}

function isListElement(parent: AstNode, node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  switch (parent.kind) {
    case KindClassDeclaration:
    case KindInterfaceDeclaration:
      return locContains(memberListLoc(parent), nodeLoc(node));
    case KindModuleDeclaration: {
      const body = moduleDeclarationBody(parent);
      return body !== undefined && body.kind === KindModuleBlock && locContains(statementListLoc(body), nodeLoc(node));
    }
    case KindSourceFile:
    case KindBlock:
    case KindModuleBlock:
      return locContains(statementListLoc(parent), nodeLoc(node));
    case KindCatchClause:
      return locContains(statementListLoc(catchClauseBlock(parent)), nodeLoc(node));
  }
  return false;
}

// ---------------------------------------------------------------------------
// Forward-declared AST / scanner surface
// ---------------------------------------------------------------------------

declare function getECMALineOfPosition(file: SourceFile, position: number): number;
declare function getECMALineStarts(file: SourceFile): readonly number[];

declare function findPrecedingToken(sourceFile: SourceFile, position: number): AstNode | undefined;

declare function nodeEndOf(node: AstNode): number;
declare function nodeParent(node: AstNode): AstNode | undefined;
declare function nodeLoc(node: AstNode): TextRange;
declare function nodeInitializer(node: AstNode): AstNode | undefined;
declare function modifiers(node: AstNode): NodeArray<AstNode> | undefined;
declare function postfixToken(node: AstNode): AstNode | undefined;
declare function equalsTokenOf(node: AstNode): AstNode | undefined;
declare function constructorType(node: AstNode): AstNode | undefined;
declare function setAccessorType(node: AstNode): AstNode | undefined;
declare function typeParameterList(node: AstNode): NodeArray<AstNode> | undefined;
declare function parameterList(node: AstNode): NodeArray<AstNode> | undefined;
declare function typeArgumentList(node: AstNode): NodeArray<AstNode> | undefined;
declare function argumentList(node: AstNode): NodeArray<AstNode> | undefined;
declare function typeParameterExpression(node: AstNode): AstNode | undefined;
declare function memberListLoc(node: AstNode): TextRange;
declare function statementListLoc(node: AstNode): TextRange;
declare function catchClauseBlock(node: AstNode): AstNode;
declare function moduleDeclarationBody(node: AstNode): AstNode | undefined;
declare function locContains(outer: TextRange, inner: TextRange): boolean;

declare function isTypeParameterDeclaration(node: AstNode): boolean;
declare function isPropertySignatureDeclaration(node: AstNode): boolean;
declare function isPropertyDeclaration(node: AstNode): boolean;
declare function isAutoAccessorPropertyDeclaration(node: AstNode): boolean;
declare function isPropertyAssignment(node: AstNode): boolean;
declare function isShorthandPropertyAssignment(node: AstNode): boolean;
declare function isMethodDeclaration(node: AstNode): boolean;
declare function isConstructorDeclaration(node: AstNode): boolean;
declare function isGetAccessorDeclaration(node: AstNode): boolean;
declare function isSetAccessorDeclaration(node: AstNode): boolean;
declare function isNamespaceExportDeclaration(node: AstNode): boolean;
declare function isModifierLike(node: AstNode): boolean;

declare const KindConstructor: Kind;
declare const KindFunctionDeclaration: Kind;
declare const KindFunctionExpression: Kind;
declare const KindMethodDeclaration: Kind;
declare const KindMethodSignature: Kind;
declare const KindArrowFunction: Kind;
declare const KindCallSignature: Kind;
declare const KindConstructSignature: Kind;
declare const KindFunctionType: Kind;
declare const KindConstructorType: Kind;
declare const KindGetAccessor: Kind;
declare const KindSetAccessor: Kind;
declare const KindCallExpression: Kind;
declare const KindNewExpression: Kind;
declare const KindClassDeclaration: Kind;
declare const KindClassExpression: Kind;
declare const KindInterfaceDeclaration: Kind;
declare const KindTypeAliasDeclaration: Kind;
declare const KindTypeReference: Kind;
declare const KindTaggedTemplateExpression: Kind;
declare const KindTypeQuery: Kind;
declare const KindExpressionWithTypeArguments: Kind;
declare const KindImportType: Kind;
declare const KindTypeLiteral: Kind;
declare const KindModuleDeclaration: Kind;
declare const KindModuleBlock: Kind;
declare const KindSourceFile: Kind;
declare const KindBlock: Kind;
declare const KindCatchClause: Kind;
declare const KindLessThanToken: Kind;
declare const KindGreaterThanToken: Kind;
declare const KindOpenParenToken: Kind;
declare const KindCloseParenToken: Kind;
declare const KindOpenBraceToken: Kind;
declare const KindCloseBraceToken: Kind;
declare const KindQuestionToken: Kind;
declare const KindExclamationToken: Kind;
declare const KindUnknown: Kind;
