import { Kind } from "../ast/index.js";
import { ParsingContext, isListElement, isListTerminator } from "./listContext.js";

export interface ParseRecoveryDecision {
  readonly action: "consume" | "skip" | "insert-missing" | "stop-list";
  readonly diagnostic: string;
  readonly expected: readonly Kind[];
}

export interface ParseErrorExpectation {
  readonly token: Kind;
  readonly context: ParsingContext;
  readonly expected: readonly Kind[];
}

export function recoverFromMissingToken(token: Kind, expected: Kind, context: ParsingContext): ParseRecoveryDecision {
  if (token === expected) return { action: "consume", diagnostic: "", expected: [expected] };
  if (isListTerminator(context, token)) {
    return { action: "insert-missing", diagnostic: missingTokenDiagnostic(expected), expected: [expected] };
  }
  if (canRecoverBySkippingToken(token, context)) {
    return { action: "skip", diagnostic: unexpectedTokenDiagnostic(token), expected: [expected] };
  }
  return { action: "insert-missing", diagnostic: missingTokenDiagnostic(expected), expected: [expected] };
}

export function recoverListElement(token: Kind, context: ParsingContext): ParseRecoveryDecision {
  if (isListTerminator(context, token)) {
    return { action: "stop-list", diagnostic: "", expected: [] };
  }
  if (isListElement(context, token, true)) {
    return { action: "consume", diagnostic: "", expected: [] };
  }
  if (token === Kind.CommaToken) {
    return { action: "skip", diagnostic: unexpectedTokenDiagnostic(token), expected: [] };
  }
  return {
    action: "insert-missing",
    diagnostic: expectedListElementDiagnostic(context),
    expected: expectedTokensForContext(context),
  };
}

export function canRecoverBySkippingToken(token: Kind, context: ParsingContext): boolean {
  if (token === Kind.EndOfFile) return false;
  if (isListTerminator(context, token)) return false;
  if (token === Kind.CommaToken || token === Kind.SemicolonToken) return true;
  if (token === Kind.CloseParenToken || token === Kind.CloseBracketToken || token === Kind.CloseBraceToken) return false;
  return !isListElement(context, token, true);
}

export function expectedTokensForContext(context: ParsingContext): readonly Kind[] {
  switch (context) {
    case ParsingContext.SourceElements:
    case ParsingContext.BlockStatements:
      return [Kind.Identifier, Kind.FunctionKeyword, Kind.ClassKeyword, Kind.ImportKeyword, Kind.ExportKeyword];
    case ParsingContext.TypeMembers:
      return [Kind.Identifier, Kind.OpenParenToken, Kind.NewKeyword, Kind.GetKeyword, Kind.SetKeyword];
    case ParsingContext.ClassMembers:
      return [Kind.Identifier, Kind.ConstructorKeyword, Kind.GetKeyword, Kind.SetKeyword, Kind.StaticKeyword];
    case ParsingContext.Parameters:
      return [Kind.Identifier, Kind.ThisKeyword, Kind.DotDotDotToken, Kind.OpenBraceToken, Kind.OpenBracketToken];
    case ParsingContext.TypeParameters:
      return [Kind.Identifier, Kind.ConstKeyword];
    case ParsingContext.TypeArguments:
      return [Kind.Identifier, Kind.StringKeyword, Kind.NumberKeyword, Kind.OpenBraceToken];
    case ParsingContext.ObjectBindingElements:
    case ParsingContext.ObjectLiteralMembers:
      return [Kind.Identifier, Kind.StringLiteral, Kind.NumericLiteral, Kind.OpenBracketToken];
    case ParsingContext.ArrayBindingElements:
    case ParsingContext.ArrayLiteralMembers:
      return [Kind.Identifier, Kind.DotDotDotToken, Kind.CommaToken];
    case ParsingContext.ArgumentExpressions:
      return [Kind.Identifier, Kind.StringLiteral, Kind.NumericLiteral, Kind.OpenParenToken];
    case ParsingContext.ImportOrExportSpecifiers:
      return [Kind.Identifier, Kind.StringLiteral, Kind.TypeKeyword];
    case ParsingContext.JsxAttributes:
      return [Kind.Identifier, Kind.OpenBraceToken];
  }
  return [Kind.Identifier];
}

export function missingTokenDiagnostic(expected: Kind): string {
  return `'${tokenToString(expected)}' expected.`;
}

export function unexpectedTokenDiagnostic(actual: Kind): string {
  return `Unexpected token '${tokenToString(actual)}'.`;
}

export function expectedListElementDiagnostic(context: ParsingContext): string {
  return `Expected ${contextName(context)} list element.`;
}

export function buildParseErrorExpectation(token: Kind, context: ParsingContext): ParseErrorExpectation {
  return { token, context, expected: expectedTokensForContext(context) };
}

export function contextName(context: ParsingContext): string {
  switch (context) {
    case ParsingContext.SourceElements:
      return "source-element";
    case ParsingContext.BlockStatements:
      return "block-statement";
    case ParsingContext.SwitchClauses:
      return "switch-clause";
    case ParsingContext.SwitchClauseStatements:
      return "switch-clause-statement";
    case ParsingContext.TypeMembers:
      return "type-member";
    case ParsingContext.ClassMembers:
      return "class-member";
    case ParsingContext.EnumMembers:
      return "enum-member";
    case ParsingContext.HeritageClauseElement:
      return "heritage-clause-element";
    case ParsingContext.VariableDeclarations:
      return "variable-declaration";
    case ParsingContext.ObjectBindingElements:
      return "object-binding-element";
    case ParsingContext.ArrayBindingElements:
      return "array-binding-element";
    case ParsingContext.ArgumentExpressions:
      return "argument-expression";
    case ParsingContext.ObjectLiteralMembers:
      return "object-literal-member";
    case ParsingContext.ArrayLiteralMembers:
      return "array-literal-member";
    case ParsingContext.Parameters:
      return "parameter";
    case ParsingContext.TypeParameters:
      return "type-parameter";
    case ParsingContext.TypeArguments:
      return "type-argument";
    case ParsingContext.TupleElementTypes:
      return "tuple-element-type";
    case ParsingContext.HeritageClauses:
      return "heritage-clause";
    case ParsingContext.ImportOrExportSpecifiers:
      return "import-or-export-specifier";
    case ParsingContext.JsxChildren:
      return "jsx-child";
    case ParsingContext.JsxAttributes:
      return "jsx-attribute";
    case ParsingContext.JSDocComment:
      return "jsdoc-comment";
  }
  return "unknown";
}

export function tokenToString(kind: Kind): string {
  const entry = Object.entries(Kind).find(([, value]) => value === kind);
  if (entry === undefined) return `Kind(${kind})`;
  return entry[0].replace(/Token$/, "");
}

export function shouldAbortParsingList(token: Kind, context: ParsingContext, depth: number): boolean {
  if (token === Kind.EndOfFile) return true;
  if (depth <= 0 && isListTerminator(context, token)) return true;
  return false;
}

export function updateRecoveryDepth(token: Kind, depth: number): number {
  if (token === Kind.OpenParenToken || token === Kind.OpenBraceToken || token === Kind.OpenBracketToken) return depth + 1;
  if (token === Kind.CloseParenToken || token === Kind.CloseBraceToken || token === Kind.CloseBracketToken) return Math.max(0, depth - 1);
  return depth;
}
