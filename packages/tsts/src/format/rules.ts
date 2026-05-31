/**
 * Format rule table.
 *
 * Port skeleton of TS-Go `internal/format/rules.go` (450 LoC). The
 * TS-Go source enumerates ~250 rule entries that the formatter
 * consults for every (left-token, right-token) pair. Each rule binds
 * a token-range trigger, a context-predicate list, and a rule action
 * (space, newline, delete, indent, etc.).
 *
 * Skeleton: defines the token-range builders + rule-list scaffolding.
 * Tests will drive incremental fill-in of the actual rule entries.
 */

import { RuleAction, type RuleSpec, type TokenRange, rule } from "./rule.js";
import * as predicates from "./rulecontext.js";
import { Kind } from "../ast/index.js";

/**
 * Build a token-range that contains every kind in [first..last].
 */
export function tokenRangeFromRange(first: number, last: number): TokenRange {
  const tokens: number[] = [];
  for (let k = first; k <= last; k++) tokens.push(k);
  return { isSpecific: false, tokens };
}

/**
 * Build a token-range over a list of specific kinds.
 */
export function tokenRangeFrom(tokens: readonly number[]): TokenRange {
  return { isSpecific: true, tokens: [...tokens] };
}

/**
 * Build a token-range over the existing list plus extra tokens.
 */
export function tokenRangeFromEx(tokens: readonly number[], ...extra: readonly number[]): TokenRange {
  return { isSpecific: false, tokens: [...tokens, ...extra] };
}

/**
 * Returns all rule entries used by the formatter. Mirrors TS-Go's
 * `getAllRules`. The full table contains ~250 entries; this skeleton
 * returns a small starter set covering the most common operator and
 * keyword spacings.
 */
export function getAllRules(): readonly RuleSpec[] {
  const allTokens: number[] = [];
  for (let k = Kind.FirstToken; k <= Kind.LastToken; k++) {
    if (k !== Kind.EndOfFile) allTokens.push(k);
  }
  const anyToken: TokenRange = { isSpecific: false, tokens: allTokens };
  const anyTokenIncludingMultilineComments = tokenRangeFromEx(allTokens, Kind.MultiLineCommentTrivia);
  const anyTokenIncludingEOF = tokenRangeFromEx(allTokens, Kind.EndOfFile);
  const keywords = tokenRangeFromRange(Kind.FirstKeyword, Kind.LastKeyword);
  const binaryOperators = tokenRangeFromRange(Kind.FirstBinaryOperator, Kind.LastBinaryOperator);

  const rules: RuleSpec[] = [];

  rules.push(rule(
    "NoSpaceBetweenSemicolonAndAny",
    Kind.SemicolonToken,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterCommaDelimiter",
    Kind.CommaToken,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterCommaDelimiterOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterKeywordsInControlFlowStatements",
    keywords,
    Kind.OpenParenToken,
    [
      predicates.isOptionEnabled(predicates.insertSpaceAfterKeywordsInControlFlowStatementsOption),
      predicates.isControlDeclContext,
    ],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeAndAfterBinaryOperators",
    binaryOperators,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceBeforeAndAfterBinaryOperatorsOption), predicates.isBinaryOpContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOpeningParenthesis",
    Kind.OpenParenToken,
    anyToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeClosingParenthesis",
    anyToken,
    Kind.CloseParenToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOpeningBracket",
    Kind.OpenBracketToken,
    anyToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeClosingBracket",
    anyToken,
    Kind.CloseBracketToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterOpeningBrace",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), predicates.isBraceWrappedContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeClosingBrace",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), predicates.isBraceWrappedContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeSemicolon",
    anyToken,
    Kind.SemicolonToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeComma",
    anyToken,
    Kind.CommaToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeColon",
    anyToken,
    Kind.ColonToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isNotBinaryOpContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterColon",
    Kind.ColonToken,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterTypeAssertionOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterIfWhileForKeyword",
    [Kind.IfKeyword, Kind.WhileKeyword, Kind.ForKeyword, Kind.SwitchKeyword, Kind.CatchKeyword, Kind.WithKeyword],
    Kind.OpenParenToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeOpenBraceInBlock",
    [Kind.CloseParenToken, Kind.ElseKeyword, Kind.DoKeyword, Kind.TryKeyword, Kind.FinallyKeyword],
    Kind.OpenBraceToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isBeforeBlockContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBetweenStatements",
    [Kind.CloseParenToken, Kind.SemicolonToken, Kind.CloseBraceToken],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isStatementOrDeclarationContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterArrow",
    Kind.EqualsGreaterThanToken,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeArrow",
    anyToken,
    Kind.EqualsGreaterThanToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeDot",
    anyToken,
    [Kind.DotToken, Kind.QuestionDotToken],
    [predicates.isNonJsxSameLineTokenContext, predicates.isNotPropertyAccessExpressionContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterDot",
    [Kind.DotToken, Kind.QuestionDotToken],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeOpenParenInCallExpression",
    anyToken,
    Kind.OpenParenToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isFunctionCallContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterNew",
    Kind.NewKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterReturnTypeof",
    [Kind.ReturnKeyword, Kind.TypeOfKeyword, Kind.DeleteKeyword, Kind.VoidKeyword, Kind.YieldKeyword, Kind.AwaitKeyword],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeOpenBracketInElementAccess",
    anyToken,
    Kind.OpenBracketToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isPropertyAccessExpressionContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAroundQuestionInTernary",
    anyToken,
    Kind.QuestionToken,
    [predicates.isConditionalContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceInTemplateExpressions",
    [Kind.TemplateHead, Kind.TemplateMiddle],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterPrefixUnary",
    [Kind.PlusPlusToken, Kind.MinusMinusToken, Kind.ExclamationToken, Kind.TildeToken],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isUnaryContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforePostfixUnary",
    anyToken,
    [Kind.PlusPlusToken, Kind.MinusMinusToken],
    [predicates.isNonJsxSameLineTokenContext, predicates.isUnaryContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOpenParenBeforeCloseParen",
    Kind.OpenParenToken,
    Kind.CloseParenToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOpenBracketBeforeCloseBracket",
    Kind.OpenBracketToken,
    Kind.CloseBracketToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterSemicolonInFor",
    Kind.SemicolonToken,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterSemicolonInForStatementsOption), predicates.isForContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeSemicolonInFor",
    anyToken,
    Kind.SemicolonToken,
    [predicates.isForContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceBeforeFunctionOpenParen",
    Kind.FunctionKeyword,
    Kind.OpenParenToken,
    [predicates.isOptionEnabled(predicates.insertSpaceBeforeFunctionParenthesisOption), predicates.isFunctionDeclContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeFunctionOpenParen",
    Kind.FunctionKeyword,
    Kind.OpenParenToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceBeforeFunctionParenthesisOption), predicates.isFunctionDeclContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterAnonymousFunctionKeyword",
    Kind.FunctionKeyword,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption), predicates.isFunctionDeclarationOrFunctionExpressionContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterConstructorKeyword",
    Kind.ConstructorKeyword,
    Kind.OpenParenToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterConstructorOption), predicates.isFunctionDeclContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeTypeAnnotationColon",
    anyToken,
    Kind.ColonToken,
    [predicates.isTypeAnnotationContext, predicates.isOptionDisabledOrUndefined(predicates.insertSpaceBeforeTypeAnnotationOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceBeforeTypeAnnotationColon",
    anyToken,
    Kind.ColonToken,
    [predicates.isTypeAnnotationContext, predicates.isOptionEnabled(predicates.insertSpaceBeforeTypeAnnotationOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterTypeAnnotationColon",
    Kind.ColonToken,
    anyToken,
    [predicates.isTypeAnnotationContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeOptionalPropertyQuestion",
    anyToken,
    Kind.QuestionToken,
    [predicates.isOptionalPropertyContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOptionalPropertyQuestion",
    Kind.QuestionToken,
    Kind.ColonToken,
    [predicates.isOptionalPropertyContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAroundEqualsInVariableDeclaration",
    Kind.EqualsToken,
    anyToken,
    [predicates.isVariableDeclarationOrInitializerContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeEqualsInVariableDeclaration",
    anyToken,
    Kind.EqualsToken,
    [predicates.isVariableDeclarationOrInitializerContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterOpenBraceEmptyBraces",
    Kind.OpenBraceToken,
    Kind.CloseBraceToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterOpenBraceEmptyBraces",
    Kind.OpenBraceToken,
    Kind.CloseBraceToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeOpenBraceForFunctions",
    anyToken,
    Kind.OpenBraceToken,
    [predicates.isFunctionDeclContext, predicates.isOptionDisabledOrUndefined(predicates.placeOpenBraceOnNewLineForFunctionsOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NewLineBeforeOpenBraceForFunctions",
    anyToken,
    Kind.OpenBraceToken,
    [predicates.isFunctionDeclContext, predicates.isOptionEnabled(predicates.placeOpenBraceOnNewLineForFunctionsOption)],
    RuleAction.InsertNewLine,
  ));

  rules.push(rule(
    "SpaceBeforeOpenBraceForControl",
    anyToken,
    Kind.OpenBraceToken,
    [predicates.isControlDeclContext, predicates.isOptionDisabledOrUndefined(predicates.placeOpenBraceOnNewLineForControlBlocksOption), predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NewLineBeforeOpenBraceForControl",
    anyToken,
    Kind.OpenBraceToken,
    [predicates.isControlDeclContext, predicates.isOptionEnabled(predicates.placeOpenBraceOnNewLineForControlBlocksOption)],
    RuleAction.InsertNewLine,
  ));

  rules.push(rule(
    "NoSpaceAfterJsxExpressionOpenBrace",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isJsxExpressionContext, predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterJsxExpressionOpenBrace",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isJsxExpressionContext, predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeJsxExpressionCloseBrace",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isJsxExpressionContext, predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceBeforeJsxExpressionCloseBrace",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isJsxExpressionContext, predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterTemplateOpenBrace",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterTemplateOpenBrace",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeTemplateCloseBrace",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceBeforeTemplateCloseBrace",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeCloseBraceSingleLineBlock",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isSingleLineBlockContext, predicates.isOptionDisabledOrUndefined(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption)],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceBeforeCloseBraceSingleLineBlock",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isSingleLineBlockContext, predicates.isOptionEnabled(predicates.insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption)],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NewLineAfterOpenBraceMultilineBlock",
    Kind.OpenBraceToken,
    anyToken,
    [predicates.isMultilineBlockContext],
    RuleAction.InsertNewLine,
  ));

  rules.push(rule(
    "NewLineBeforeCloseBraceMultilineBlock",
    anyToken,
    Kind.CloseBraceToken,
    [predicates.isMultilineBlockContext],
    RuleAction.InsertNewLine,
  ));

  rules.push(rule(
    "NoSpaceAfterLessThanInTypeArguments",
    Kind.LessThanToken,
    anyToken,
    [predicates.isTypeArgumentOrParameterOrAssertionContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeGreaterThanInTypeArguments",
    anyToken,
    Kind.GreaterThanToken,
    [predicates.isTypeArgumentOrParameterOrAssertionContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterExtendsKeyword",
    Kind.ExtendsKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterImplementsKeyword",
    Kind.ImplementsKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterFromKeyword",
    Kind.FromKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeFromKeyword",
    anyToken,
    Kind.FromKeyword,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterAsKeyword",
    Kind.AsKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeAsKeyword",
    anyToken,
    Kind.AsKeyword,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterSatisfiesKeyword",
    Kind.SatisfiesKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeSatisfiesKeyword",
    anyToken,
    Kind.SatisfiesKeyword,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterAtDecorator",
    Kind.AtToken,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NewLineAfterDecorator",
    anyToken,
    [Kind.ExportKeyword, Kind.DefaultKeyword, Kind.ClassKeyword, Kind.FunctionKeyword],
    [predicates.isEndOfDecoratorContextOnSameLine],
    RuleAction.InsertNewLine,
  ));

  rules.push(rule(
    "NoSpaceAfterSpread",
    Kind.DotDotDotToken,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeSpread",
    anyToken,
    Kind.DotDotDotToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterCaseKeyword",
    Kind.CaseKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeCaseColon",
    anyToken,
    Kind.ColonToken,
    [predicates.isEnumDeclarationContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterThrowKeyword",
    Kind.ThrowKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterImportKeyword",
    Kind.ImportKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterExportKeyword",
    Kind.ExportKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterDefaultKeyword",
    Kind.DefaultKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterReadonlyKeyword",
    Kind.ReadonlyKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterPublicPrivateProtected",
    [Kind.PublicKeyword, Kind.PrivateKeyword, Kind.ProtectedKeyword],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterStaticAbstractAccessor",
    [Kind.StaticKeyword, Kind.AbstractKeyword, Kind.AccessorKeyword],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterAsyncKeyword",
    Kind.AsyncKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterLetConstVarKeywords",
    [Kind.LetKeyword, Kind.ConstKeyword, Kind.VarKeyword],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterGetSetKeywords",
    [Kind.GetKeyword, Kind.SetKeyword],
    anyToken,
    [predicates.isClassMemberContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterInOfKeywords",
    [Kind.InKeyword, Kind.OfKeyword],
    anyToken,
    [predicates.isForContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeInOfKeywords",
    anyToken,
    [Kind.InKeyword, Kind.OfKeyword],
    [predicates.isForContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterInstanceofKeyword",
    Kind.InstanceOfKeyword,
    anyToken,
    [predicates.isBinaryOpContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeInstanceofKeyword",
    anyToken,
    Kind.InstanceOfKeyword,
    [predicates.isBinaryOpContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterInferKeyword",
    Kind.InferKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterKeyofUniqueKeywords",
    [Kind.KeyOfKeyword, Kind.UniqueKeyword],
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterAssertKeyword",
    Kind.AssertKeyword,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeNonNullAssertion",
    anyToken,
    Kind.ExclamationToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isNotBinaryOpContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterNonNullAssertion",
    Kind.ExclamationToken,
    anyToken,
    [predicates.isNonJsxSameLineTokenContext, predicates.isNotBinaryOpContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAroundAmpersandIntersection",
    Kind.AmpersandToken,
    anyToken,
    [predicates.isInterfaceOrTypeAliasContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeAmpersandIntersection",
    anyToken,
    Kind.AmpersandToken,
    [predicates.isInterfaceOrTypeAliasContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAroundBarUnion",
    Kind.BarToken,
    anyToken,
    [predicates.isInterfaceOrTypeAliasContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceBeforeBarUnion",
    anyToken,
    Kind.BarToken,
    [predicates.isInterfaceOrTypeAliasContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceBeforeQuestionDot",
    anyToken,
    Kind.QuestionDotToken,
    [predicates.isPropertyAccessExpressionContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "NoSpaceAfterQuestionDot",
    Kind.QuestionDotToken,
    anyToken,
    [predicates.isPropertyAccessExpressionContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  rules.push(rule(
    "SpaceAfterNamespaceKeyword",
    Kind.NamespaceKeyword,
    anyToken,
    [predicates.isModuleDeclContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "SpaceAfterModuleKeyword",
    Kind.ModuleKeyword,
    anyToken,
    [predicates.isModuleDeclContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.InsertSpace,
  ));

  rules.push(rule(
    "NoSpaceAroundImportTypeDot",
    anyToken,
    Kind.DotToken,
    [predicates.isImportTypeContext, predicates.isNonJsxSameLineTokenContext],
    RuleAction.DeleteSpace,
  ));

  void anyTokenIncludingMultilineComments;
  void anyTokenIncludingEOF;

  return rules;
}

export const allRules: readonly RuleSpec[] = getAllRules();

// ---------------------------------------------------------------------------
// Forward-declared Kind surface
// ---------------------------------------------------------------------------

// Some First*/Last* sentinel kinds aren't in the canonical Kind enum
// schema yet. Pick them off the value-side imported `Kind` enum
// permissively (returns 0 when absent) so the rule table compiles.
const _K = Kind as unknown as Record<string, number>;
const _FirstToken = _K.FirstToken ?? 0;
const _LastToken = _K.LastToken ?? 0;
const _FirstKeyword = _K.FirstKeyword ?? 0;
const _LastKeyword = _K.LastKeyword ?? 0;
const _FirstBinaryOperator = _K.FirstBinaryOperator ?? 0;
const _LastBinaryOperator = _K.LastBinaryOperator ?? 0;
void _FirstToken; void _LastToken; void _FirstKeyword; void _LastKeyword;
void _FirstBinaryOperator; void _LastBinaryOperator;
