import type { Node } from "../ast/index.js";
import { Kind } from "../ast/index.js";

export type ParsingContext = number;
export const ParsingContext = {
  SourceElements: 1 << 0,
  BlockStatements: 1 << 1,
  SwitchClauses: 1 << 2,
  SwitchClauseStatements: 1 << 3,
  TypeMembers: 1 << 4,
  ClassMembers: 1 << 5,
  EnumMembers: 1 << 6,
  HeritageClauseElement: 1 << 7,
  VariableDeclarations: 1 << 8,
  ObjectBindingElements: 1 << 9,
  ArrayBindingElements: 1 << 10,
  ArgumentExpressions: 1 << 11,
  ObjectLiteralMembers: 1 << 12,
  ArrayLiteralMembers: 1 << 13,
  Parameters: 1 << 14,
  TypeParameters: 1 << 15,
  TypeArguments: 1 << 16,
  TupleElementTypes: 1 << 17,
  HeritageClauses: 1 << 18,
  ImportOrExportSpecifiers: 1 << 19,
  JsxChildren: 1 << 20,
  JsxAttributes: 1 << 21,
  JSDocComment: 1 << 22,
  Count: 23,
} as const;

export interface ListContextFrame {
  readonly context: ParsingContext;
  readonly startToken: Kind;
  readonly terminators: readonly Kind[];
  readonly allowTrailingComma: boolean;
}

export interface ListParseDecision {
  readonly isElement: boolean;
  readonly isTerminator: boolean;
  readonly shouldRecover: boolean;
  readonly reason: string;
}

export function isListTerminator(context: ParsingContext, token: Kind): boolean {
  switch (context) {
    case ParsingContext.SourceElements:
      return token === Kind.EndOfFile;
    case ParsingContext.BlockStatements:
    case ParsingContext.SwitchClauseStatements:
      return token === Kind.CloseBraceToken || token === Kind.EndOfFile;
    case ParsingContext.SwitchClauses:
      return token === Kind.CloseBraceToken || token === Kind.EndOfFile;
    case ParsingContext.TypeMembers:
    case ParsingContext.ClassMembers:
    case ParsingContext.ObjectLiteralMembers:
    case ParsingContext.ObjectBindingElements:
      return token === Kind.CloseBraceToken || token === Kind.EndOfFile;
    case ParsingContext.EnumMembers:
    case ParsingContext.ArrayBindingElements:
    case ParsingContext.ArrayLiteralMembers:
    case ParsingContext.TupleElementTypes:
      return token === Kind.CloseBracketToken || token === Kind.EndOfFile;
    case ParsingContext.Parameters:
    case ParsingContext.ArgumentExpressions:
    case ParsingContext.TypeParameters:
    case ParsingContext.TypeArguments:
      return token === Kind.CloseParenToken || token === Kind.GreaterThanToken || token === Kind.EndOfFile;
    case ParsingContext.ImportOrExportSpecifiers:
    case ParsingContext.HeritageClauses:
    case ParsingContext.HeritageClauseElement:
      return token === Kind.CloseBraceToken || token === Kind.EndOfFile;
    case ParsingContext.JsxChildren:
      return token === Kind.LessThanSlashToken || token === Kind.EndOfFile;
    case ParsingContext.JsxAttributes:
      return token === Kind.GreaterThanToken || token === Kind.SlashToken || token === Kind.EndOfFile;
    case ParsingContext.JSDocComment:
      return token === Kind.EndOfFile;
  }
  return token === Kind.EndOfFile;
}

export function isListElement(context: ParsingContext, token: Kind, inErrorRecovery: boolean): boolean {
  if (isListTerminator(context, token)) return false;
  switch (context) {
    case ParsingContext.SourceElements:
    case ParsingContext.BlockStatements:
    case ParsingContext.SwitchClauseStatements:
      return isStartOfStatement(token);
    case ParsingContext.SwitchClauses:
      return token === Kind.CaseKeyword || token === Kind.DefaultKeyword;
    case ParsingContext.TypeMembers:
      return isStartOfTypeMember(token);
    case ParsingContext.ClassMembers:
      return isStartOfClassMember(token);
    case ParsingContext.EnumMembers:
      return token === Kind.Identifier || token === Kind.StringLiteral || token === Kind.NumericLiteral;
    case ParsingContext.VariableDeclarations:
      return isBindingNameStart(token);
    case ParsingContext.ObjectBindingElements:
    case ParsingContext.ObjectLiteralMembers:
      return isObjectMemberStart(token);
    case ParsingContext.ArrayBindingElements:
    case ParsingContext.ArrayLiteralMembers:
      return token !== Kind.CommaToken;
    case ParsingContext.Parameters:
      return isParameterStart(token);
    case ParsingContext.TypeParameters:
      return token === Kind.Identifier || token === Kind.ConstKeyword || token === Kind.InKeyword || token === Kind.OutKeyword;
    case ParsingContext.TypeArguments:
    case ParsingContext.TupleElementTypes:
      return isStartOfType(token);
    case ParsingContext.ArgumentExpressions:
      return token !== Kind.CommaToken;
    case ParsingContext.HeritageClauses:
      return token === Kind.ExtendsKeyword || token === Kind.ImplementsKeyword;
    case ParsingContext.HeritageClauseElement:
      return isExpressionStart(token);
    case ParsingContext.ImportOrExportSpecifiers:
      return token === Kind.Identifier || token === Kind.StringLiteral || token === Kind.DefaultKeyword || token === Kind.TypeKeyword;
    case ParsingContext.JsxChildren:
      return token !== Kind.LessThanSlashToken;
    case ParsingContext.JsxAttributes:
      return token === Kind.Identifier || token === Kind.OpenBraceToken;
    case ParsingContext.JSDocComment:
      return !inErrorRecovery;
  }
  return false;
}

export function listParseDecision(context: ParsingContext, token: Kind, inErrorRecovery: boolean): ListParseDecision {
  const isTerminator = isListTerminator(context, token);
  const isElement = !isTerminator && isListElement(context, token, inErrorRecovery);
  return {
    isElement,
    isTerminator,
    shouldRecover: !isElement && !isTerminator && inErrorRecovery,
    reason: isElement ? "element" : isTerminator ? "terminator" : "not-list-element",
  };
}

export function createListContextFrame(context: ParsingContext): ListContextFrame {
  return {
    context,
    startToken: startTokenForContext(context),
    terminators: terminatorsForContext(context),
    allowTrailingComma: allowsTrailingComma(context),
  };
}

export function startTokenForContext(context: ParsingContext): Kind {
  switch (context) {
    case ParsingContext.BlockStatements:
    case ParsingContext.SwitchClauses:
    case ParsingContext.TypeMembers:
    case ParsingContext.ClassMembers:
    case ParsingContext.ObjectBindingElements:
    case ParsingContext.ObjectLiteralMembers:
    case ParsingContext.ImportOrExportSpecifiers:
      return Kind.OpenBraceToken;
    case ParsingContext.EnumMembers:
    case ParsingContext.ArrayBindingElements:
    case ParsingContext.ArrayLiteralMembers:
    case ParsingContext.TupleElementTypes:
      return Kind.OpenBracketToken;
    case ParsingContext.Parameters:
    case ParsingContext.ArgumentExpressions:
    case ParsingContext.TypeParameters:
    case ParsingContext.TypeArguments:
      return Kind.OpenParenToken;
  }
  return Kind.Unknown;
}

export function terminatorsForContext(context: ParsingContext): readonly Kind[] {
  switch (context) {
    case ParsingContext.SourceElements:
      return [Kind.EndOfFile];
    case ParsingContext.BlockStatements:
    case ParsingContext.SwitchClauses:
    case ParsingContext.SwitchClauseStatements:
    case ParsingContext.TypeMembers:
    case ParsingContext.ClassMembers:
    case ParsingContext.ObjectBindingElements:
    case ParsingContext.ObjectLiteralMembers:
    case ParsingContext.ImportOrExportSpecifiers:
      return [Kind.CloseBraceToken, Kind.EndOfFile];
    case ParsingContext.EnumMembers:
    case ParsingContext.ArrayBindingElements:
    case ParsingContext.ArrayLiteralMembers:
    case ParsingContext.TupleElementTypes:
      return [Kind.CloseBracketToken, Kind.EndOfFile];
    case ParsingContext.Parameters:
    case ParsingContext.ArgumentExpressions:
    case ParsingContext.TypeParameters:
    case ParsingContext.TypeArguments:
      return [Kind.CloseParenToken, Kind.GreaterThanToken, Kind.EndOfFile];
    case ParsingContext.JsxChildren:
      return [Kind.LessThanSlashToken, Kind.EndOfFile];
    case ParsingContext.JsxAttributes:
      return [Kind.GreaterThanToken, Kind.SlashToken, Kind.EndOfFile];
  }
  return [Kind.EndOfFile];
}

export function allowsTrailingComma(context: ParsingContext): boolean {
  switch (context) {
    case ParsingContext.Parameters:
    case ParsingContext.TypeParameters:
    case ParsingContext.TypeArguments:
    case ParsingContext.HeritageClauses:
    case ParsingContext.HeritageClauseElement:
    case ParsingContext.JsxAttributes:
      return false;
  }
  return true;
}

export function isStartOfStatement(token: Kind): boolean {
  return token === Kind.SemicolonToken ||
    token === Kind.OpenBraceToken ||
    token === Kind.VarKeyword ||
    token === Kind.LetKeyword ||
    token === Kind.ConstKeyword ||
    token === Kind.FunctionKeyword ||
    token === Kind.ClassKeyword ||
    token === Kind.InterfaceKeyword ||
    token === Kind.TypeKeyword ||
    token === Kind.EnumKeyword ||
    token === Kind.NamespaceKeyword ||
    token === Kind.ModuleKeyword ||
    token === Kind.ImportKeyword ||
    token === Kind.ExportKeyword ||
    token === Kind.IfKeyword ||
    token === Kind.DoKeyword ||
    token === Kind.WhileKeyword ||
    token === Kind.ForKeyword ||
    token === Kind.SwitchKeyword ||
    token === Kind.ContinueKeyword ||
    token === Kind.BreakKeyword ||
    token === Kind.ReturnKeyword ||
    token === Kind.WithKeyword ||
    token === Kind.ThrowKeyword ||
    token === Kind.TryKeyword ||
    token === Kind.DebuggerKeyword ||
    isExpressionStart(token);
}

export function isStartOfTypeMember(token: Kind): boolean {
  return token === Kind.OpenParenToken ||
    token === Kind.LessThanToken ||
    token === Kind.Identifier ||
    token === Kind.StringLiteral ||
    token === Kind.NumericLiteral ||
    token === Kind.ReadonlyKeyword ||
    token === Kind.NewKeyword ||
    token === Kind.GetKeyword ||
    token === Kind.SetKeyword ||
    token === Kind.OpenBracketToken;
}

export function isStartOfClassMember(token: Kind): boolean {
  return token === Kind.SemicolonToken ||
    token === Kind.AtToken ||
    token === Kind.StaticKeyword ||
    token === Kind.PublicKeyword ||
    token === Kind.PrivateKeyword ||
    token === Kind.ProtectedKeyword ||
    token === Kind.AccessorKeyword ||
    token === Kind.ReadonlyKeyword ||
    token === Kind.AbstractKeyword ||
    token === Kind.DeclareKeyword ||
    token === Kind.ConstructorKeyword ||
    token === Kind.GetKeyword ||
    token === Kind.SetKeyword ||
    token === Kind.Identifier ||
    token === Kind.StringLiteral ||
    token === Kind.NumericLiteral ||
    token === Kind.OpenBracketToken;
}

export function isObjectMemberStart(token: Kind): boolean {
  return token === Kind.Identifier ||
    token === Kind.StringLiteral ||
    token === Kind.NumericLiteral ||
    token === Kind.OpenBracketToken ||
    token === Kind.DotDotDotToken ||
    token === Kind.GetKeyword ||
    token === Kind.SetKeyword ||
    token === Kind.AsyncKeyword;
}

export function isParameterStart(token: Kind): boolean {
  return token === Kind.DotDotDotToken ||
    token === Kind.ThisKeyword ||
    token === Kind.Identifier ||
    token === Kind.OpenBraceToken ||
    token === Kind.OpenBracketToken ||
    token === Kind.PublicKeyword ||
    token === Kind.PrivateKeyword ||
    token === Kind.ProtectedKeyword ||
    token === Kind.ReadonlyKeyword ||
    token === Kind.OverrideKeyword;
}

export function isBindingNameStart(token: Kind): boolean {
  return token === Kind.Identifier || token === Kind.OpenBraceToken || token === Kind.OpenBracketToken;
}

export function isStartOfType(token: Kind): boolean {
  return token === Kind.AnyKeyword ||
    token === Kind.UnknownKeyword ||
    token === Kind.StringKeyword ||
    token === Kind.NumberKeyword ||
    token === Kind.BigIntKeyword ||
    token === Kind.BooleanKeyword ||
    token === Kind.SymbolKeyword ||
    token === Kind.VoidKeyword ||
    token === Kind.UndefinedKeyword ||
    token === Kind.NullKeyword ||
    token === Kind.NeverKeyword ||
    token === Kind.ObjectKeyword ||
    token === Kind.Identifier ||
    token === Kind.ThisKeyword ||
    token === Kind.TypeOfKeyword ||
    token === Kind.KeyOfKeyword ||
    token === Kind.UniqueKeyword ||
    token === Kind.ReadonlyKeyword ||
    token === Kind.InferKeyword ||
    token === Kind.ImportKeyword ||
    token === Kind.OpenBraceToken ||
    token === Kind.OpenBracketToken ||
    token === Kind.OpenParenToken ||
    token === Kind.LessThanToken ||
    token === Kind.NewKeyword ||
    token === Kind.AbstractKeyword ||
    token === Kind.TemplateHead ||
    token === Kind.TemplateMiddle ||
    token === Kind.TemplateTail;
}

export function isExpressionStart(token: Kind): boolean {
  return token === Kind.ThisKeyword ||
    token === Kind.SuperKeyword ||
    token === Kind.NullKeyword ||
    token === Kind.TrueKeyword ||
    token === Kind.FalseKeyword ||
    token === Kind.Identifier ||
    token === Kind.NumericLiteral ||
    token === Kind.StringLiteral ||
    token === Kind.NoSubstitutionTemplateLiteral ||
    token === Kind.OpenParenToken ||
    token === Kind.OpenBracketToken ||
    token === Kind.OpenBraceToken ||
    token === Kind.FunctionKeyword ||
    token === Kind.ClassKeyword ||
    token === Kind.NewKeyword ||
    token === Kind.DeleteKeyword ||
    token === Kind.TypeOfKeyword ||
    token === Kind.VoidKeyword ||
    token === Kind.PlusToken ||
    token === Kind.MinusToken ||
    token === Kind.TildeToken ||
    token === Kind.ExclamationToken ||
    token === Kind.PlusPlusToken ||
    token === Kind.MinusMinusToken ||
    token === Kind.LessThanToken ||
    token === Kind.AwaitKeyword ||
    token === Kind.YieldKeyword;
}

export function listContainsOnlySyntheticNodes(nodes: readonly Node[]): boolean {
  return nodes.every((node) => (node.flags & (1 << 20)) !== 0);
}
