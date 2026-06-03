/**
 * Format-rule context predicates.
 *
 * Mechanical 1:1 port of TS-Go `internal/format/rulecontext.go`. Each
 * predicate examines the formatting context (current/previous token,
 * enclosing parent kind, options) and decides whether a given rule
 * applies.
 *
 * Naming: TS-Go PascalCase methods on FormattingContext become
 * lower-camel accessors here (e.g. TokensAreOnSameLine ->
 * tokensAreOnSameLine). All free functions keep their upstream names.
 *
 * lsutil dependency: a few predicates in rulecontext.go call into the
 * `lsutil` package (PositionIsASICandidate, GetFirstToken,
 * PositionBelongsToNode). That package has no TSTS counterpart yet, so
 * the affected predicates (isSemicolonInsertionContext, and one branch
 * of isSemicolonDeletionContext) are ported with their control skeleton
 * intact and the lsutil leaf classified as blocked-by-lsutil.
 */

import { Kind, type Node as AstNode, type SourceFile } from "../ast/index.js";
import {
  binaryOperatorTokenKind,
  getECMALineOfPosition,
  getTypeAnnotation,
  hasDecorators,
  isExpression,
  isFunctionLike,
  isNumericLiteral,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isYieldExpression,
  nodeExpression,
  nodeInitializer,
  nodeParent,
  nodeQuestionToken,
  nodeText,
} from "../ast/index.js";
import { findNextToken, getStartOfNode } from "../astnav/index.js";
import { isTrivia } from "../scanner/index.js";
import {
  type Tristate,
  tristateIsTrue,
  tristateIsFalse,
  tristateIsFalseOrUnknown,
  tristateIsTrueOrUnknown,
} from "../core/tristate.js";

import { FormatRequestKind, type FormatCodeSettings } from "./api.js";
import type { FormattingContext, TextRangeWithKind } from "./context.js";

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

export type OptionSelector = (options: FormatCodeSettings) => Tristate;
export type AnyOptionSelector<T> = (options: FormatCodeSettings) => T;

// Coerce the FormatCodeSettings tristate-ish fields (boolean | undefined in
// the TSTS surface) into a core.Tristate so the IsTrue/IsFalse family applies
// exactly like in TS-Go.
function toTristate(value: boolean | undefined): Tristate {
  if (value === undefined) return 0 as Tristate;
  return (value ? 1 : 2) as Tristate;
}

export function semicolonOption(options: FormatCodeSettings): FormatCodeSettings["semicolons"] {
  return options.semicolons;
}

export const insertSpaceAfterCommaDelimiterOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterCommaDelimiter);

export const insertSpaceAfterSemicolonInForStatementsOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterSemicolonInForStatements);

export const insertSpaceBeforeAndAfterBinaryOperatorsOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceBeforeAndAfterBinaryOperators);

export const insertSpaceAfterConstructorOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterConstructor);

export const insertSpaceAfterKeywordsInControlFlowStatementsOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterKeywordsInControlFlowStatements);

export const insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterFunctionKeywordForAnonymousFunctions);

export const insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis);

export const insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets);

export const insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces);

export const insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces);

export const insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces);

export const insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces);

export const insertSpaceAfterTypeAssertionOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceAfterTypeAssertion);

export const insertSpaceBeforeFunctionParenthesisOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceBeforeFunctionParenthesis);

export const placeOpenBraceOnNewLineForFunctionsOption: OptionSelector = (options) =>
  toTristate(options.placeOpenBraceOnNewLineForFunctions);

export const placeOpenBraceOnNewLineForControlBlocksOption: OptionSelector = (options) =>
  toTristate(options.placeOpenBraceOnNewLineForControlBlocks);

export const insertSpaceBeforeTypeAnnotationOption: OptionSelector = (options) =>
  toTristate(options.insertSpaceBeforeTypeAnnotation);

export const indentMultiLineObjectLiteralBeginningOnBlankLineOption: OptionSelector = (options) =>
  toTristate(options.indentMultiLineObjectLiteralBeginningOnBlankLine);

export const indentSwitchCaseOption: OptionSelector = (options) =>
  toTristate(options.indentSwitchCase);

export function optionEquals<T>(optionName: AnyOptionSelector<T>, optionValue: T): ContextPredicate {
  return (context) => optionName(context.options) === optionValue;
}

export function isOptionEnabled(optionName: OptionSelector): ContextPredicate {
  return (context) => tristateIsTrue(optionName(context.options));
}

export function isOptionDisabled(optionName: OptionSelector): ContextPredicate {
  return (context) => tristateIsFalse(optionName(context.options));
}

export function isOptionDisabledOrUndefined(optionName: OptionSelector): ContextPredicate {
  return (context) => tristateIsFalseOrUnknown(optionName(context.options));
}

export function isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName: OptionSelector): ContextPredicate {
  return (context) => tristateIsFalseOrUnknown(optionName(context.options)) || context.tokensAreOnSameLine();
}

export function isOptionEnabledOrUndefined(optionName: OptionSelector): ContextPredicate {
  return (context) => tristateIsTrueOrUnknown(optionName(context.options));
}

export type ContextPredicate = (context: FormattingContext) => boolean;

// Field reads mirroring TS-Go's `context.contextNode.Kind`,
// `context.currentTokenSpan.Kind`, etc. The FormattingContext exposes these
// through accessors; the upstream code never sees them as nil in practice
// because UpdateContext panics on nil parents before any predicate runs.
function contextNodeKind(context: FormattingContext): Kind {
  return (context.contextNode?.kind ?? Kind.Unknown) as Kind;
}

function currentTokenKind(context: FormattingContext): Kind {
  return (context.currentTokenSpan?.kind ?? Kind.Unknown) as Kind;
}

function nextTokenKind(context: FormattingContext): Kind {
  return (context.nextTokenSpan?.kind ?? Kind.Unknown) as Kind;
}

function currentTokenParentKind(context: FormattingContext): Kind {
  return (context.currentTokenParent?.kind ?? Kind.Unknown) as Kind;
}

function nextTokenParentKind(context: FormattingContext): Kind {
  return (context.nextTokenParent?.kind ?? Kind.Unknown) as Kind;
}

export function isForContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ForStatement;
}

export function isNotForContext(context: FormattingContext): boolean {
  return !isForContext(context);
}

export function isBinaryOpContext(context: FormattingContext): boolean {
  switch (contextNodeKind(context)) {
    case Kind.BinaryExpression:
      return binaryOperatorTokenKind(context.contextNode!) !== Kind.CommaToken;
    case Kind.ConditionalExpression:
    case Kind.ConditionalType:
    case Kind.AsExpression:
    case Kind.ExportSpecifier:
    case Kind.ImportSpecifier:
    case Kind.TypePredicate:
    case Kind.UnionType:
    case Kind.IntersectionType:
    case Kind.SatisfiesExpression:
      return true;

    // equals in binding elements func foo([[x, y] = [1, 2]])
    case Kind.BindingElement:
    // equals in type X = ...
    case Kind.TypeAliasDeclaration:
    // equal in import a = module('a');
    case Kind.ImportEqualsDeclaration:
    // equal in export = 1
    case Kind.ExportAssignment:
    // equal in let a = 0
    case Kind.VariableDeclaration:
    // equal in p = 0
    case Kind.Parameter:
    case Kind.EnumMember:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return currentTokenKind(context) === Kind.EqualsToken || nextTokenKind(context) === Kind.EqualsToken;
    // "in" keyword in for (let x in []) { }
    case Kind.ForInStatement:
    // "in" keyword in [P in keyof T] T[P]
    case Kind.TypeParameter:
      return currentTokenKind(context) === Kind.InKeyword || nextTokenKind(context) === Kind.InKeyword ||
        currentTokenKind(context) === Kind.EqualsToken || nextTokenKind(context) === Kind.EqualsToken;
    // Technically, "of" is not a binary operator, but format it the same way as "in"
    case Kind.ForOfStatement:
      return currentTokenKind(context) === Kind.OfKeyword || nextTokenKind(context) === Kind.OfKeyword;
  }
  return false;
}

export function isNotBinaryOpContext(context: FormattingContext): boolean {
  return !isBinaryOpContext(context);
}

export function isNotTypeAnnotationContext(context: FormattingContext): boolean {
  return !isTypeAnnotationContext(context);
}

export function isTypeAnnotationContext(context: FormattingContext): boolean {
  const contextKind = contextNodeKind(context);
  return contextKind === Kind.PropertyDeclaration ||
    contextKind === Kind.PropertySignature ||
    contextKind === Kind.Parameter ||
    contextKind === Kind.VariableDeclaration ||
    isFunctionLike(context.contextNode);
}

export function isOptionalPropertyContext(context: FormattingContext): boolean {
  return isPropertyDeclaration(context.contextNode!) && nodeQuestionToken(context.contextNode) !== undefined;
}

export function isNonOptionalPropertyContext(context: FormattingContext): boolean {
  return !isOptionalPropertyContext(context);
}

export function isConditionalOperatorContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ConditionalExpression ||
    contextNodeKind(context) === Kind.ConditionalType;
}

export function isSameLineTokenOrBeforeBlockContext(context: FormattingContext): boolean {
  return context.tokensAreOnSameLine() || isBeforeBlockContext(context);
}

export function isBraceWrappedContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ObjectBindingPattern ||
    contextNodeKind(context) === Kind.MappedType ||
    isSingleLineBlockContext(context);
}

// This check is done before an open brace in a control construct, a function, or a typescript block declaration
export function isBeforeMultilineBlockContext(context: FormattingContext): boolean {
  return isBeforeBlockContext(context) && !(context.nextNodeAllOnSameLine() || context.nextNodeBlockIsOnOneLine());
}

export function isMultilineBlockContext(context: FormattingContext): boolean {
  return isBlockContext(context) && !(context.contextNodeAllOnSameLine() || context.contextNodeBlockIsOnOneLine());
}

export function isSingleLineBlockContext(context: FormattingContext): boolean {
  return isBlockContext(context) && (context.contextNodeAllOnSameLine() || context.contextNodeBlockIsOnOneLine());
}

export function isBlockContext(context: FormattingContext): boolean {
  return nodeIsBlockContext(contextNodeKind(context));
}

export function isBeforeBlockContext(context: FormattingContext): boolean {
  return nodeIsBlockContext(nextTokenParentKind(context));
}

// IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
function nodeIsBlockContext(nodeKind: Kind): boolean {
  if (nodeIsTypeScriptDeclWithBlockContext(nodeKind)) {
    // This means we are in a context that looks like a block to the user, but in the grammar is actually not a node (it's a class, module, enum, object type literal, etc).
    return true;
  }

  switch (nodeKind) {
    case Kind.Block:
    case Kind.CaseBlock:
    case Kind.ObjectLiteralExpression:
    case Kind.ModuleBlock:
      return true;
  }

  return false;
}

export function isFunctionDeclContext(context: FormattingContext): boolean {
  switch (contextNodeKind(context)) {
    case Kind.FunctionDeclaration:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    // case Kind.MemberFunctionDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    // case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.FunctionExpression:
    case Kind.Constructor:
    case Kind.ArrowFunction:
    // case Kind.ConstructorDeclaration:
    // case Kind.SimpleArrowFunctionExpression:
    // case Kind.ParenthesizedArrowFunctionExpression:
    case Kind.InterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
      return true;
  }

  return false;
}

export function isNotFunctionDeclContext(context: FormattingContext): boolean {
  return !isFunctionDeclContext(context);
}

export function isFunctionDeclarationOrFunctionExpressionContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.FunctionDeclaration || contextNodeKind(context) === Kind.FunctionExpression;
}

export function isTypeScriptDeclWithBlockContext(context: FormattingContext): boolean {
  return nodeIsTypeScriptDeclWithBlockContext(contextNodeKind(context));
}

function nodeIsTypeScriptDeclWithBlockContext(nodeKind: Kind): boolean {
  switch (nodeKind) {
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.EnumDeclaration:
    case Kind.TypeLiteral:
    case Kind.ModuleDeclaration:
    case Kind.ExportDeclaration:
    case Kind.NamedExports:
    case Kind.ImportDeclaration:
    case Kind.NamedImports:
      return true;
  }

  return false;
}

export function isAfterCodeBlockContext(context: FormattingContext): boolean {
  switch (currentTokenParentKind(context)) {
    case Kind.ClassDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.EnumDeclaration:
    case Kind.CatchClause:
    case Kind.ModuleBlock:
    case Kind.SwitchStatement:
      return true;
    case Kind.Block: {
      const blockParent = nodeParent(context.currentTokenParent!);
      // In a codefix scenario, we can't rely on parents being set. So just always return true.
      if (blockParent === undefined || (blockParent.kind !== Kind.ArrowFunction && blockParent.kind !== Kind.FunctionExpression)) {
        return true;
      }
    }
  }
  return false;
}

export function isControlDeclContext(context: FormattingContext): boolean {
  switch (contextNodeKind(context)) {
    case Kind.IfStatement:
    case Kind.SwitchStatement:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.WhileStatement:
    case Kind.TryStatement:
    case Kind.DoStatement:
    case Kind.WithStatement:
    // TODO
    // case Kind.ElseClause:
    case Kind.CatchClause:
      return true;

    default:
      return false;
  }
}

export function isObjectContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ObjectLiteralExpression;
}

export function isFunctionCallContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.CallExpression;
}

export function isNewContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.NewExpression;
}

export function isFunctionCallOrNewContext(context: FormattingContext): boolean {
  return isFunctionCallContext(context) || isNewContext(context);
}

export function isPreviousTokenNotComma(context: FormattingContext): boolean {
  return currentTokenKind(context) !== Kind.CommaToken;
}

export function isNextTokenNotCloseBracket(context: FormattingContext): boolean {
  return nextTokenKind(context) !== Kind.CloseBracketToken;
}

export function isNextTokenNotCloseParen(context: FormattingContext): boolean {
  return nextTokenKind(context) !== Kind.CloseParenToken;
}

export function isArrowFunctionContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ArrowFunction;
}

export function isImportTypeContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ImportType;
}

export function isNonJsxSameLineTokenContext(context: FormattingContext): boolean {
  return context.tokensAreOnSameLine() && contextNodeKind(context) !== Kind.JsxText;
}

export function isNonJsxTextContext(context: FormattingContext): boolean {
  return contextNodeKind(context) !== Kind.JsxText;
}

export function isNonJsxElementOrFragmentContext(context: FormattingContext): boolean {
  return contextNodeKind(context) !== Kind.JsxElement && contextNodeKind(context) !== Kind.JsxFragment;
}

export function isJsxExpressionContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.JsxExpression || contextNodeKind(context) === Kind.JsxSpreadAttribute;
}

export function isNextTokenParentJsxAttribute(context: FormattingContext): boolean {
  return nextTokenParentKind(context) === Kind.JsxAttribute ||
    (nextTokenParentKind(context) === Kind.JsxNamespacedName && nodeParent(context.nextTokenParent!)?.kind === Kind.JsxAttribute);
}

export function isJsxAttributeContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.JsxAttribute;
}

export function isNextTokenParentNotJsxNamespacedName(context: FormattingContext): boolean {
  return nextTokenParentKind(context) !== Kind.JsxNamespacedName;
}

export function isNextTokenParentJsxNamespacedName(context: FormattingContext): boolean {
  return nextTokenParentKind(context) === Kind.JsxNamespacedName;
}

export function isJsxSelfClosingElementContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.JsxSelfClosingElement;
}

export function isNotBeforeBlockInFunctionDeclarationContext(context: FormattingContext): boolean {
  return !isFunctionDeclContext(context) && !isBeforeBlockContext(context);
}

export function isEndOfDecoratorContextOnSameLine(context: FormattingContext): boolean {
  return context.tokensAreOnSameLine() &&
    hasDecorators(context.contextNode) &&
    nodeIsInDecoratorContext(context.currentTokenParent) &&
    !nodeIsInDecoratorContext(context.nextTokenParent);
}

function nodeIsInDecoratorContext(nodeArg: AstNode | undefined): boolean {
  let node = nodeArg;
  while (node !== undefined && isExpression(node)) {
    node = nodeParent(node);
  }
  return node !== undefined && node.kind === Kind.Decorator;
}

export function isStartOfVariableDeclarationList(context: FormattingContext): boolean {
  return currentTokenParentKind(context) === Kind.VariableDeclarationList &&
    getStartOfNode(context.currentTokenParent!, context.sourceFile, false) === (context.currentTokenSpan?.loc.pos ?? -1);
}

export function isNotFormatOnEnter(context: FormattingContext): boolean {
  return context.formattingRequestKind !== FormatRequestKind.FormatOnEnter;
}

export function isModuleDeclContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ModuleDeclaration;
}

export function isObjectTypeContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.TypeLiteral; // && context.contextNode.parent.Kind != Kind.InterfaceDeclaration;
}

export function isConstructorSignatureContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.ConstructSignature;
}

function isTypeArgumentOrParameterOrAssertion(token: TextRangeWithKind | undefined, parent: AstNode | undefined): boolean {
  if (token === undefined || (token.kind !== Kind.LessThanToken && token.kind !== Kind.GreaterThanToken)) {
    return false;
  }
  switch (parent?.kind) {
    case Kind.TypeReference:
    case Kind.TypeAssertionExpression:
    case Kind.TypeAliasDeclaration:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.ConstructSignature:
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.ExpressionWithTypeArguments:
      return true;
    default:
      return false;
  }
}

export function isTypeArgumentOrParameterOrAssertionContext(context: FormattingContext): boolean {
  return isTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
    isTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
}

export function isTypeAssertionContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.TypeAssertionExpression;
}

export function isNonTypeAssertionContext(context: FormattingContext): boolean {
  return !isTypeAssertionContext(context);
}

export function isVoidOpContext(context: FormattingContext): boolean {
  return currentTokenKind(context) === Kind.VoidKeyword && currentTokenParentKind(context) === Kind.VoidExpression;
}

export function isYieldOrYieldStarWithOperand(context: FormattingContext): boolean {
  return context.contextNode !== undefined &&
    isYieldExpression(context.contextNode) &&
    context.contextNode.expression !== undefined;
}

export function isNonNullAssertionContext(context: FormattingContext): boolean {
  return contextNodeKind(context) === Kind.NonNullExpression;
}

export function isNotStatementConditionContext(context: FormattingContext): boolean {
  return !isStatementConditionContext(context);
}

export function isStatementConditionContext(context: FormattingContext): boolean {
  switch (contextNodeKind(context)) {
    case Kind.IfStatement:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.DoStatement:
    case Kind.WhileStatement:
      return true;

    default:
      return false;
  }
}

export function isSemicolonDeletionContext(context: FormattingContext): boolean {
  let nextTokenKindLocal = nextTokenKind(context);
  let nextTokenStart = context.nextTokenSpan?.loc.pos ?? -1;
  if (isTrivia(nextTokenKindLocal)) {
    let nextRealToken: AstNode | undefined;
    if (context.nextTokenParent === context.currentTokenParent) {
      // !!! TODO: very different from strada, but strada's logic here is wonky - find the first ancestor without a parent? that's just the source file.
      nextRealToken = findNextToken(context.nextTokenParent!, context.sourceFile, context.sourceFile);
    } else {
      // lsutil.GetFirstToken has no TSTS counterpart yet (blocked-by-lsutil);
      // the control skeleton is preserved and the first-token leaf is left
      // undefined until lsutil lands.
      nextRealToken = getFirstToken(context.nextTokenParent, context.sourceFile);
    }

    if (nextRealToken === undefined) {
      return true;
    }
    nextTokenKindLocal = nextRealToken.kind as Kind;
    nextTokenStart = getStartOfNode(nextRealToken, context.sourceFile, false);
  }

  const startLine = getECMALineOfPosition(context.sourceFile, context.currentTokenSpan?.loc.pos ?? -1);
  const endLine = getECMALineOfPosition(context.sourceFile, nextTokenStart);
  if (startLine === endLine) {
    return nextTokenKindLocal === Kind.CloseBraceToken || nextTokenKindLocal === Kind.EndOfFile;
  }

  if (nextTokenKindLocal === Kind.SemicolonToken &&
    currentTokenKind(context) === Kind.SemicolonToken) {
    return true;
  }

  if (nextTokenKindLocal === Kind.SemicolonClassElement ||
    nextTokenKindLocal === Kind.SemicolonToken) {
    return false;
  }

  if (contextNodeKind(context) === Kind.InterfaceDeclaration ||
    contextNodeKind(context) === Kind.TypeAliasDeclaration) {
    // Can't remove semicolon after `foo`; it would parse as a method declaration:
    //
    // interface I {
    //   foo;
    //   () void
    // }
    return currentTokenParentKind(context) !== Kind.PropertySignature ||
      getTypeAnnotation(context.currentTokenParent) !== undefined ||
      nextTokenKindLocal !== Kind.OpenParenToken;
  }

  if (isPropertyDeclaration(context.currentTokenParent!)) {
    return nodeInitializer(context.currentTokenParent!) === undefined;
  }

  return currentTokenParentKind(context) !== Kind.ForStatement &&
    currentTokenParentKind(context) !== Kind.EmptyStatement &&
    currentTokenParentKind(context) !== Kind.SemicolonClassElement &&
    nextTokenKindLocal !== Kind.OpenBracketToken &&
    nextTokenKindLocal !== Kind.OpenParenToken &&
    nextTokenKindLocal !== Kind.PlusToken &&
    nextTokenKindLocal !== Kind.MinusToken &&
    nextTokenKindLocal !== Kind.SlashToken &&
    nextTokenKindLocal !== Kind.RegularExpressionLiteral &&
    nextTokenKindLocal !== Kind.CommaToken &&
    nextTokenKindLocal !== Kind.TemplateExpression &&
    nextTokenKindLocal !== Kind.TemplateHead &&
    nextTokenKindLocal !== Kind.NoSubstitutionTemplateLiteral &&
    nextTokenKindLocal !== Kind.DotToken;
}

export function isSemicolonInsertionContext(context: FormattingContext): boolean {
  // lsutil.PositionIsASICandidate has no TSTS counterpart yet
  // (blocked-by-lsutil). Until lsutil lands, ASI candidacy cannot be
  // evaluated, so no semicolon is inserted.
  return positionIsASICandidate(
    context.currentTokenSpan?.loc.end ?? -1,
    context.currentTokenParent,
    context.sourceFile,
  );
}

export function isNotPropertyAccessOnIntegerLiteral(context: FormattingContext): boolean {
  return !isPropertyAccessExpression(context.contextNode!) ||
    !isNumericLiteral(nodeExpression(context.contextNode!)) ||
    nodeText(nodeExpression(context.contextNode!)).includes(".");
}

// ---------------------------------------------------------------------------
// Helpers that stand in for TS-Go lsutil leaves not yet exported by TSTS
// ---------------------------------------------------------------------------

// lsutil.GetFirstToken — blocked-by-lsutil. No TSTS counterpart; returns
// undefined so the isSemicolonDeletionContext skeleton bails out as the
// upstream `nextRealToken == nil` branch would.
function getFirstToken(_node: AstNode | undefined, _sourceFile: SourceFile): AstNode | undefined {
  return undefined;
}

// lsutil.PositionIsASICandidate — blocked-by-lsutil. No TSTS counterpart;
// returns false so isSemicolonInsertionContext never inserts a semicolon
// until lsutil lands.
function positionIsASICandidate(_pos: number, _node: AstNode | undefined, _sourceFile: SourceFile): boolean {
  return false;
}
