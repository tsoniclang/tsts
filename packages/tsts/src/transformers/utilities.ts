/**
 * Shared transformer utilities.
 *
 * Port of TS-Go `internal/transformers/utilities.go`. Covers
 * identifier emit-flag predicates, binding-to-assignment conversion,
 * super-call path search, modifier/decorator text-range moves, and
 * compound assignment operator mapping.
 *
 * Cross-module deps forward-declared at the file end.
 */

import type { Node as AstNode, IdentifierNode, BindingElement, BindingPattern, VariableDeclaration, ForStatement, ConditionalExpression, TaggedTemplateExpression, ImportEqualsDeclaration, ImportAttribute, TryStatement } from "../ast/index.js";

// ---------------------------------------------------------------------------
// Identifier predicates
// ---------------------------------------------------------------------------

export function isGeneratedIdentifier(emitContext: EmitContext, name: IdentifierNode): boolean {
  return emitContext.hasAutoGenerateInfo(name);
}

export function isHelperName(emitContext: EmitContext, name: IdentifierNode): boolean {
  return (emitContext.emitFlags(name) & EmitFlags.HelperName) !== 0;
}

export function isLocalName(emitContext: EmitContext, name: IdentifierNode): boolean {
  return (emitContext.emitFlags(name) & EmitFlags.LocalName) !== 0;
}

export function isExportName(emitContext: EmitContext, name: IdentifierNode): boolean {
  return (emitContext.emitFlags(name) & EmitFlags.ExportName) !== 0;
}

export function isIdentifierReference(name: IdentifierNode, parent: AstNode): boolean {
  switch (parent.kind) {
    case Kind.BinaryExpression:
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.YieldExpression:
    case Kind.AsExpression:
    case Kind.SatisfiesExpression:
    case Kind.ElementAccessExpression:
    case Kind.NonNullExpression:
    case Kind.SpreadElement:
    case Kind.SpreadAssignment:
    case Kind.ParenthesizedExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.AwaitExpression:
    case Kind.TypeAssertionExpression:
    case Kind.ExpressionWithTypeArguments:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxSpreadAttribute:
    case Kind.JsxExpression:
    case Kind.PartiallyEmittedExpression:
      // all immediate children that can be `Identifier` would be instances of `IdentifierReference`
      return true;
    case Kind.ComputedPropertyName:
    case Kind.Decorator:
    case Kind.IfStatement:
    case Kind.DoStatement:
    case Kind.WhileStatement:
    case Kind.WithStatement:
    case Kind.ReturnStatement:
    case Kind.SwitchStatement:
    case Kind.CaseClause:
    case Kind.ThrowStatement:
    case Kind.ExpressionStatement:
    case Kind.ExportAssignment:
    case Kind.PropertyAccessExpression:
    case Kind.TemplateSpan:
      return parentExpression(parent) === (name as unknown as AstNode);
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.PropertyAssignment:
    case Kind.EnumMember:
    case Kind.JsxAttribute:
      return parentInitializer(parent) === (name as unknown as AstNode);
    case Kind.ForStatement: {
      const fs = parent as unknown as ForStatement;
      return (
        forStatementInitializer(fs) === (name as unknown as AstNode) ||
        forStatementCondition(fs) === (name as unknown as AstNode) ||
        forStatementIncrementor(fs) === (name as unknown as AstNode)
      );
    }
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
      return (
        parentInitializer(parent) === (name as unknown as AstNode) ||
        parentExpression(parent) === (name as unknown as AstNode)
      );
    case Kind.ImportEqualsDeclaration:
      return importEqualsModuleReference(parent as unknown as ImportEqualsDeclaration) === (name as unknown as AstNode);
    case Kind.ArrowFunction:
      return parentBody(parent) === (name as unknown as AstNode);
    case Kind.ConditionalExpression: {
      const ce = parent as unknown as ConditionalExpression;
      return (
        conditionalCondition(ce) === (name as unknown as AstNode) ||
        conditionalWhenTrue(ce) === (name as unknown as AstNode) ||
        conditionalWhenFalse(ce) === (name as unknown as AstNode)
      );
    }
    case Kind.CallExpression:
    case Kind.NewExpression:
      return (
        parentExpression(parent) === (name as unknown as AstNode) ||
        parentArguments(parent).includes(name as unknown as AstNode)
      );
    case Kind.TaggedTemplateExpression:
      return taggedTemplateTag(parent as unknown as TaggedTemplateExpression) === (name as unknown as AstNode);
    case Kind.ImportAttribute:
      return importAttributeValue(parent as unknown as ImportAttribute) === (name as unknown as AstNode);
    case Kind.JsxOpeningElement:
    case Kind.JsxClosingElement:
      return jsxTagName(parent) === (name as unknown as AstNode);
    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// Binding ↔ assignment pattern conversion
// ---------------------------------------------------------------------------

function convertBindingElementToArrayAssignmentElement(
  emitContext: EmitContext,
  element: BindingElement,
): AstNode {
  const f = emitContext.factory();
  const name = bindingElementName(element);
  if (name === undefined) {
    const elision = f.newOmittedExpression();
    emitContext.setOriginal(elision, element as unknown as AstNode);
    emitContext.assignCommentAndSourceMapRanges(elision, element as unknown as AstNode);
    return elision;
  }
  if (bindingElementDotDotDotToken(element) !== undefined) {
    const spread = f.newSpreadElement(name);
    emitContext.setOriginal(spread, element as unknown as AstNode);
    emitContext.assignCommentAndSourceMapRanges(spread, element as unknown as AstNode);
    return spread;
  }
  let expression = convertBindingNameToAssignmentElementTarget(emitContext, name);
  const initializer = bindingElementInitializer(element);
  if (initializer !== undefined) {
    const assignment = f.newAssignmentExpression(expression, initializer);
    emitContext.setOriginal(assignment, element as unknown as AstNode);
    emitContext.assignCommentAndSourceMapRanges(assignment, element as unknown as AstNode);
    return assignment;
  }
  return expression;
}

function convertBindingElementToObjectAssignmentElement(
  emitContext: EmitContext,
  element: BindingElement,
): AstNode {
  const f = emitContext.factory();
  if (bindingElementDotDotDotToken(element) !== undefined) {
    const spread = f.newSpreadAssignment(bindingElementName(element)!);
    emitContext.setOriginal(spread, element as unknown as AstNode);
    emitContext.assignCommentAndSourceMapRanges(spread, element as unknown as AstNode);
    return spread;
  }
  const propertyName = bindingElementPropertyName(element);
  if (propertyName !== undefined) {
    let expression = convertBindingNameToAssignmentElementTarget(emitContext, bindingElementName(element)!);
    const initializer = bindingElementInitializer(element);
    if (initializer !== undefined) {
      expression = f.newAssignmentExpression(expression, initializer);
    }
    const assignment = f.newPropertyAssignment(undefined, propertyName, undefined, undefined, expression);
    emitContext.setOriginal(assignment, element as unknown as AstNode);
    emitContext.assignCommentAndSourceMapRanges(assignment, element as unknown as AstNode);
    return assignment;
  }
  let equalsToken: AstNode | undefined;
  const initializer = bindingElementInitializer(element);
  if (initializer !== undefined) equalsToken = f.newToken(Kind.EqualsToken);
  const assignment = f.newShorthandPropertyAssignment(
    undefined,
    bindingElementName(element)!,
    undefined,
    undefined,
    equalsToken,
    initializer,
  );
  emitContext.setOriginal(assignment, element as unknown as AstNode);
  emitContext.assignCommentAndSourceMapRanges(assignment, element as unknown as AstNode);
  return assignment;
}

export function convertBindingPatternToAssignmentPattern(
  emitContext: EmitContext,
  element: BindingPattern,
): AstNode {
  switch ((element as unknown as AstNode).kind) {
    case Kind.ArrayBindingPattern:
      return convertBindingElementToArrayAssignmentPattern(emitContext, element);
    case Kind.ObjectBindingPattern:
      return convertBindingElementToObjectAssignmentPattern(emitContext, element);
    default:
      throw new Error("Unknown binding pattern");
  }
}

function convertBindingElementToObjectAssignmentPattern(
  emitContext: EmitContext,
  element: BindingPattern,
): AstNode {
  const f = emitContext.factory();
  const properties: AstNode[] = [];
  for (const e of bindingPatternElements(element)) {
    properties.push(convertBindingElementToObjectAssignmentElement(emitContext, e as unknown as BindingElement));
  }
  const propertyList = f.newNodeList(properties);
  setLoc(propertyList, bindingPatternElementsLoc(element));
  const object = f.newObjectLiteralExpression(propertyList, false);
  emitContext.setOriginal(object, element as unknown as AstNode);
  emitContext.assignCommentAndSourceMapRanges(object, element as unknown as AstNode);
  return object;
}

function convertBindingElementToArrayAssignmentPattern(
  emitContext: EmitContext,
  element: BindingPattern,
): AstNode {
  const f = emitContext.factory();
  const elements: AstNode[] = [];
  for (const e of bindingPatternElements(element)) {
    elements.push(convertBindingElementToArrayAssignmentElement(emitContext, e as unknown as BindingElement));
  }
  const elementList = f.newNodeList(elements);
  setLoc(elementList, bindingPatternElementsLoc(element));
  const object = f.newArrayLiteralExpression(elementList, false);
  emitContext.setOriginal(object, element as unknown as AstNode);
  emitContext.assignCommentAndSourceMapRanges(object, element as unknown as AstNode);
  return object;
}

function convertBindingNameToAssignmentElementTarget(emitContext: EmitContext, element: AstNode): AstNode {
  if (isBindingPattern(element)) {
    return convertBindingPatternToAssignmentPattern(emitContext, element as unknown as BindingPattern);
  }
  return element;
}

export function convertVariableDeclarationToAssignmentExpression(
  emitContext: EmitContext,
  element: VariableDeclaration,
): AstNode | undefined {
  const initializer = variableDeclarationInitializer(element);
  if (initializer === undefined) return undefined;
  const expression = convertBindingNameToAssignmentElementTarget(emitContext, variableDeclarationName(element));
  const assignment = emitContext.factory().newAssignmentExpression(expression, initializer);
  emitContext.setOriginal(assignment, element as unknown as AstNode);
  emitContext.assignCommentAndSourceMapRanges(assignment, element as unknown as AstNode);
  return assignment;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------

export function singleOrMany(nodes: readonly AstNode[], factory: Factory): AstNode {
  if (nodes.length === 1) return nodes[0]!;
  return factory.newSyntaxList([...nodes]);
}

export function isSimpleCopiableExpression(expression: AstNode): boolean {
  return (
    isStringLiteralLike(expression) ||
    isNumericLiteral(expression) ||
    isKeywordKind(expression.kind) ||
    isIdentifier(expression)
  );
}

export function isOriginalNodeSingleLine(emitContext: EmitContext, node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const original = emitContext.mostOriginal(node);
  if (original === undefined) return false;
  const source = getSourceFileOfNode(original);
  if (source === undefined) return false;
  const startLine = getECMALineOfPosition(source, nodePos(original));
  const endLine = getECMALineOfPosition(source, nodeEnd(original));
  return startLine === endLine;
}

export function isSimpleInlineableExpression(expression: AstNode): boolean {
  return !isIdentifier(expression) && isSimpleCopiableExpression(expression);
}

// ---------------------------------------------------------------------------
// super-statement path search
// ---------------------------------------------------------------------------

export function findSuperStatementIndexPath(statements: readonly AstNode[], start: number): number[] {
  const indices = findSuperStatementIndexPathWorker(statements, start, []);
  return indices.slice().reverse();
}

function findSuperStatementIndexPathWorker(
  statements: readonly AstNode[],
  start: number,
  indices: number[],
): number[] {
  for (let i = start; i < statements.length; i++) {
    const statement = statements[i]!;
    if (getSuperCallFromStatement(statement) !== undefined) return [...indices, i];
    if (isTryStatement(statement)) {
      const tryBlock = tryStatementTryBlock(statement as unknown as TryStatement);
      const result = findSuperStatementIndexPathWorker(blockStatements(tryBlock), 0, indices);
      if (result.length > 0) return [...result, i];
    }
  }
  return [];
}

export function getSuperCallFromStatement(statement: AstNode): AstNode | undefined {
  if (!isExpressionStatement(statement)) return undefined;
  const expression = skipParentheses(expressionOfStatement(statement));
  if (isSuperCall(expression)) return expression;
  return undefined;
}

// ---------------------------------------------------------------------------
// Range manipulations
// ---------------------------------------------------------------------------

export function moveRangePastModifiers(node: AstNode): TextRange {
  if (isPropertyDeclaration(node) || isMethodDeclaration(node)) {
    return newTextRange(nodePos(nodeName(node)!), nodeEnd(node));
  }
  let lastModifier: AstNode | undefined;
  if (canHaveModifiers(node)) {
    const nodes = modifierNodes(node);
    if (nodes !== undefined && nodes.length > 0) lastModifier = nodes[nodes.length - 1];
  }
  if (lastModifier !== undefined && !positionIsSynthesized(nodeEnd(lastModifier))) {
    return newTextRange(nodeEnd(lastModifier), nodeEnd(node));
  }
  return moveRangePastDecorators(node);
}

export function moveRangePastDecorators(node: AstNode): TextRange {
  let lastDecorator: AstNode | undefined;
  if (canHaveModifiers(node)) {
    const nodes = modifierNodes(node);
    if (nodes !== undefined) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (isDecorator(nodes[i]!)) {
          lastDecorator = nodes[i];
          break;
        }
      }
    }
  }
  if (lastDecorator !== undefined && !positionIsSynthesized(nodeEnd(lastDecorator))) {
    return newTextRange(nodeEnd(lastDecorator), nodeEnd(node));
  }
  return nodeLoc(node);
}

// ---------------------------------------------------------------------------
// Compound assignment mapping
// ---------------------------------------------------------------------------

export function getNonAssignmentOperatorForCompoundAssignment(kind: number): number {
  switch (kind) {
    case Kind.PlusEqualsToken: return Kind.PlusToken;
    case Kind.MinusEqualsToken: return Kind.MinusToken;
    case Kind.AsteriskEqualsToken: return Kind.AsteriskToken;
    case Kind.AsteriskAsteriskEqualsToken: return Kind.AsteriskAsteriskToken;
    case Kind.SlashEqualsToken: return Kind.SlashToken;
    case Kind.PercentEqualsToken: return Kind.PercentToken;
    case Kind.LessThanLessThanEqualsToken: return Kind.LessThanLessThanToken;
    case Kind.GreaterThanGreaterThanEqualsToken: return Kind.GreaterThanGreaterThanToken;
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken: return Kind.GreaterThanGreaterThanGreaterThanToken;
    case Kind.AmpersandEqualsToken: return Kind.AmpersandToken;
    case Kind.BarEqualsToken: return Kind.BarToken;
    case Kind.CaretEqualsToken: return Kind.CaretToken;
    case Kind.BarBarEqualsToken: return Kind.BarBarToken;
    case Kind.AmpersandAmpersandEqualsToken: return Kind.AmpersandAmpersandToken;
    case Kind.QuestionQuestionEqualsToken: return Kind.QuestionQuestionToken;
  }
  return kind;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext {
  factory(): Factory;
  emitFlags(node: AstNode): number;
  hasAutoGenerateInfo(node: AstNode): boolean;
  setOriginal(node: AstNode, original: AstNode): void;
  assignCommentAndSourceMapRanges(node: AstNode, original: AstNode): void;
  mostOriginal(node: AstNode): AstNode | undefined;
}

interface Factory {
  newOmittedExpression(): AstNode;
  newSpreadElement(name: AstNode): AstNode;
  newSpreadAssignment(name: AstNode): AstNode;
  newAssignmentExpression(left: AstNode, right: AstNode): AstNode;
  newPropertyAssignment(modifiers: unknown, name: AstNode, postfix: unknown, typeNode: unknown, initializer: AstNode): AstNode;
  newShorthandPropertyAssignment(modifiers: unknown, name: AstNode, postfix: unknown, typeNode: unknown, equalsToken: AstNode | undefined, initializer: AstNode | undefined): AstNode;
  newToken(kind: number): AstNode;
  newNodeList<T extends AstNode>(items: readonly T[]): unknown;
  newObjectLiteralExpression(elements: unknown, multiLine: boolean): AstNode;
  newArrayLiteralExpression(elements: unknown, multiLine: boolean): AstNode;
  newSyntaxList(items: AstNode[]): AstNode;
}

interface TextRange {
  pos(): number;
  end(): number;
}

declare const Kind: {
  BinaryExpression: number; PrefixUnaryExpression: number; PostfixUnaryExpression: number;
  YieldExpression: number; AsExpression: number; SatisfiesExpression: number;
  ElementAccessExpression: number; NonNullExpression: number; SpreadElement: number;
  SpreadAssignment: number; ParenthesizedExpression: number; ArrayLiteralExpression: number;
  DeleteExpression: number; TypeOfExpression: number; VoidExpression: number;
  AwaitExpression: number; TypeAssertionExpression: number; ExpressionWithTypeArguments: number;
  JsxSelfClosingElement: number; JsxSpreadAttribute: number; JsxExpression: number;
  PartiallyEmittedExpression: number; ComputedPropertyName: number; Decorator: number;
  IfStatement: number; DoStatement: number; WhileStatement: number; WithStatement: number;
  ReturnStatement: number; SwitchStatement: number; CaseClause: number; ThrowStatement: number;
  ExpressionStatement: number; ExportAssignment: number; PropertyAccessExpression: number;
  TemplateSpan: number; VariableDeclaration: number; Parameter: number; BindingElement: number;
  PropertyDeclaration: number; PropertySignature: number; PropertyAssignment: number;
  EnumMember: number; JsxAttribute: number; ForStatement: number; ForInStatement: number;
  ForOfStatement: number; ImportEqualsDeclaration: number; ArrowFunction: number;
  ConditionalExpression: number; CallExpression: number; NewExpression: number;
  TaggedTemplateExpression: number; ImportAttribute: number;
  JsxOpeningElement: number; JsxClosingElement: number;
  ArrayBindingPattern: number; ObjectBindingPattern: number; EqualsToken: number;
  PlusEqualsToken: number; PlusToken: number; MinusEqualsToken: number; MinusToken: number;
  AsteriskEqualsToken: number; AsteriskToken: number; AsteriskAsteriskEqualsToken: number;
  AsteriskAsteriskToken: number; SlashEqualsToken: number; SlashToken: number;
  PercentEqualsToken: number; PercentToken: number;
  LessThanLessThanEqualsToken: number; LessThanLessThanToken: number;
  GreaterThanGreaterThanEqualsToken: number; GreaterThanGreaterThanToken: number;
  GreaterThanGreaterThanGreaterThanEqualsToken: number; GreaterThanGreaterThanGreaterThanToken: number;
  AmpersandEqualsToken: number; AmpersandToken: number;
  BarEqualsToken: number; BarToken: number; CaretEqualsToken: number; CaretToken: number;
  BarBarEqualsToken: number; BarBarToken: number;
  AmpersandAmpersandEqualsToken: number; AmpersandAmpersandToken: number;
  QuestionQuestionEqualsToken: number; QuestionQuestionToken: number;
};

declare const EmitFlags: { HelperName: number; LocalName: number; ExportName: number };

declare function nodeLoc(node: AstNode): TextRange;
declare function nodePos(node: AstNode): number;
declare function nodeEnd(node: AstNode): number;
declare function nodeName(node: AstNode): AstNode | undefined;
declare function setLoc(node: unknown, loc: unknown): void;
declare function parentExpression(parent: AstNode): AstNode | undefined;
declare function parentInitializer(parent: AstNode): AstNode | undefined;
declare function parentBody(parent: AstNode): AstNode | undefined;
declare function parentArguments(parent: AstNode): readonly AstNode[];
declare function forStatementInitializer(node: ForStatement): AstNode | undefined;
declare function forStatementCondition(node: ForStatement): AstNode | undefined;
declare function forStatementIncrementor(node: ForStatement): AstNode | undefined;
declare function importEqualsModuleReference(node: ImportEqualsDeclaration): AstNode;
declare function conditionalCondition(node: ConditionalExpression): AstNode;
declare function conditionalWhenTrue(node: ConditionalExpression): AstNode;
declare function conditionalWhenFalse(node: ConditionalExpression): AstNode;
declare function taggedTemplateTag(node: TaggedTemplateExpression): AstNode;
declare function importAttributeValue(node: ImportAttribute): AstNode;
declare function jsxTagName(node: AstNode): AstNode;
declare function bindingElementName(element: BindingElement): AstNode | undefined;
declare function bindingElementDotDotDotToken(element: BindingElement): AstNode | undefined;
declare function bindingElementInitializer(element: BindingElement): AstNode | undefined;
declare function bindingElementPropertyName(element: BindingElement): AstNode | undefined;
declare function bindingPatternElements(pattern: BindingPattern): readonly AstNode[];
declare function bindingPatternElementsLoc(pattern: BindingPattern): unknown;
declare function variableDeclarationInitializer(node: VariableDeclaration): AstNode | undefined;
declare function variableDeclarationName(node: VariableDeclaration): AstNode;
declare function isBindingPattern(node: AstNode): boolean;
declare function isStringLiteralLike(node: AstNode): boolean;
declare function isNumericLiteral(node: AstNode): boolean;
declare function isKeywordKind(kind: number): boolean;
declare function isIdentifier(node: AstNode): boolean;
declare function isTryStatement(node: AstNode): boolean;
declare function tryStatementTryBlock(node: TryStatement): AstNode;
declare function blockStatements(node: AstNode): readonly AstNode[];
declare function isExpressionStatement(node: AstNode): boolean;
declare function expressionOfStatement(node: AstNode): AstNode;
declare function skipParentheses(node: AstNode): AstNode;
declare function isSuperCall(node: AstNode): boolean;
declare function isPropertyDeclaration(node: AstNode): boolean;
declare function isMethodDeclaration(node: AstNode): boolean;
declare function canHaveModifiers(node: AstNode): boolean;
declare function modifierNodes(node: AstNode): readonly AstNode[] | undefined;
declare function isDecorator(node: AstNode): boolean;
declare function positionIsSynthesized(pos: number): boolean;
declare function newTextRange(pos: number, end: number): TextRange;
declare function getSourceFileOfNode(node: AstNode): AstNode | undefined;
declare function getECMALineOfPosition(source: AstNode, pos: number): number;
