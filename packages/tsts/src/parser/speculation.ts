import type { Node } from "../ast/index.js";
import { Kind } from "../ast/index.js";

export interface ParserSpeculationSnapshot<TToken = Kind> {
  readonly token: TToken;
  readonly tokenPos: number;
  readonly tokenFullStart: number;
  readonly diagnosticsLength: number;
  readonly contextFlags: number;
  readonly parsingContexts: number;
  readonly hasParseError: boolean;
}

export interface ParserSpeculationHost<TToken = Kind> {
  mark(): ParserSpeculationSnapshot<TToken>;
  rewind(snapshot: ParserSpeculationSnapshot<TToken>): void;
}

export interface SpeculationResult<T> {
  readonly matched: boolean;
  readonly value: T | undefined;
  readonly consumedTokens: boolean;
}

export function lookAhead<TToken, T>(
  host: ParserSpeculationHost<TToken>,
  callback: () => T | undefined,
): T | undefined {
  const snapshot = host.mark();
  try {
    return callback();
  } finally {
    host.rewind(snapshot);
  }
}

export function tryParse<TToken, T>(
  host: ParserSpeculationHost<TToken>,
  callback: () => T | undefined,
): T | undefined {
  const snapshot = host.mark();
  const result = callback();
  if (result === undefined) host.rewind(snapshot);
  return result;
}

export function speculation<TToken, T>(
  host: ParserSpeculationHost<TToken>,
  callback: () => T | undefined,
  isLookAhead: boolean,
): SpeculationResult<T> {
  const snapshot = host.mark();
  const value = callback();
  const after = host.mark();
  const consumedTokens = after.tokenPos !== snapshot.tokenPos || after.tokenFullStart !== snapshot.tokenFullStart;
  if (isLookAhead || value === undefined) host.rewind(snapshot);
  return { matched: value !== undefined, value, consumedTokens };
}

export function scanOptionalToken<TToken>(
  host: ParserSpeculationHost<TToken>,
  predicate: () => boolean,
  advance: () => void,
): boolean {
  const snapshot = host.mark();
  if (!predicate()) {
    host.rewind(snapshot);
    return false;
  }
  advance();
  return true;
}

export function parseExpectedToken<TToken>(
  host: ParserSpeculationHost<TToken>,
  predicate: () => boolean,
  advance: () => void,
  onMissing: () => void,
): boolean {
  if (predicate()) {
    advance();
    return true;
  }
  onMissing();
  void host;
  return false;
}

export function canParseSemicolon(token: Kind, hasPrecedingLineBreak: boolean): boolean {
  return token === Kind.SemicolonToken ||
    token === Kind.CloseBraceToken ||
    token === Kind.EndOfFile ||
    hasPrecedingLineBreak;
}

export function canParseExpressionAfterQuestionQuestion(left: Node, token: Kind): boolean {
  if (token === Kind.QuestionQuestionToken && isPossiblyNullishCoalescingHead(left)) return true;
  return token !== Kind.QuestionQuestionToken;
}

export function isPossiblyNullishCoalescingHead(node: Node): boolean {
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.CallExpression:
    case Kind.ParenthesizedExpression:
    case Kind.NonNullExpression:
    case Kind.NullKeyword:
    case Kind.UndefinedKeyword:
      return true;
    case Kind.BinaryExpression:
      return binaryOperatorKind(node) !== Kind.BarBarToken && binaryOperatorKind(node) !== Kind.AmpersandAmpersandToken;
  }
  return false;
}

export function isStartOfAsyncArrowFromContext(
  token: Kind,
  nextToken: Kind,
  hasLineBreak: boolean,
): boolean {
  return token === Kind.AsyncKeyword &&
    !hasLineBreak &&
    (nextToken === Kind.Identifier || nextToken === Kind.OpenParenToken || nextToken === Kind.LessThanToken);
}

export function isStartOfParenthesizedArrowFunction(token: Kind, nextToken: Kind): boolean {
  return token === Kind.OpenParenToken &&
    (nextToken === Kind.CloseParenToken ||
      nextToken === Kind.DotDotDotToken ||
      nextToken === Kind.ThisKeyword ||
      nextToken === Kind.Identifier ||
      nextToken === Kind.OpenBraceToken ||
      nextToken === Kind.OpenBracketToken);
}

export function isStartOfTypeParametersForArrow(token: Kind, nextToken: Kind): boolean {
  return token === Kind.LessThanToken &&
    (nextToken === Kind.Identifier || nextToken === Kind.ConstKeyword || nextToken === Kind.InKeyword || nextToken === Kind.OutKeyword);
}

export function canFollowTypeArgumentsInExpression(token: Kind): boolean {
  return token === Kind.OpenParenToken ||
    token === Kind.NoSubstitutionTemplateLiteral ||
    token === Kind.TemplateHead ||
    token === Kind.DotToken ||
    token === Kind.OpenBracketToken ||
    token === Kind.QuestionDotToken ||
    token === Kind.ExclamationToken;
}

export function shouldSpeculateAsTypeArguments(token: Kind, nextToken: Kind): boolean {
  if (token !== Kind.LessThanToken) return false;
  return nextToken === Kind.Identifier ||
    nextToken === Kind.StringKeyword ||
    nextToken === Kind.NumberKeyword ||
    nextToken === Kind.BooleanKeyword ||
    nextToken === Kind.OpenBraceToken ||
    nextToken === Kind.OpenBracketToken ||
    nextToken === Kind.ThisKeyword;
}

export function speculationFailed<T>(result: SpeculationResult<T>): boolean {
  return !result.matched;
}

export function speculationSucceeded<T>(result: SpeculationResult<T>): result is SpeculationResult<T> & { readonly matched: true; readonly value: T } {
  return result.matched && result.value !== undefined;
}

function binaryOperatorKind(node: Node): Kind {
  const operatorToken = (node as unknown as { operatorToken?: Node }).operatorToken;
  return operatorToken?.kind ?? Kind.Unknown;
}
