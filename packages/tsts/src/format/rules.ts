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

  void anyTokenIncludingMultilineComments;
  void anyTokenIncludingEOF;

  return rules;
}

export const allRules: readonly RuleSpec[] = getAllRules();

// ---------------------------------------------------------------------------
// Forward-declared Kind surface
// ---------------------------------------------------------------------------

declare const Kind: {
  FirstToken: number; LastToken: number; EndOfFile: number;
  MultiLineCommentTrivia: number;
  FirstKeyword: number; LastKeyword: number;
  FirstBinaryOperator: number; LastBinaryOperator: number;
  SemicolonToken: number; CommaToken: number; OpenParenToken: number;
};
