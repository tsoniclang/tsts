/**
 * Format rule table.
 *
 * Port skeleton of TS-Go `internal/format/rules.go` (450 LoC). The
 * Strada source enumerates ~250 rule entries that the formatter
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
