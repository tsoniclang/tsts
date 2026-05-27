/**
 * Format-rule context predicates.
 *
 * Port skeleton of TS-Go `internal/format/rulecontext.go` (629 LoC).
 * Each predicate examines the formatting context (current/previous
 * token, enclosing parent kind, options) and decides whether a given
 * rule applies. Upstream has ~80 of these.
 *
 * Skeleton: defines every predicate name with a faithful (typically
 * one-line) body forwarded against the FormattingContext. Some
 * deeper checks that need full AST integration are filed as TODOs
 * but still appear in the surface so callers compile mechanically.
 */

import type { FormattingContext } from "./context.js";
import type { FormatCodeSettings } from "./api.js";
import { type Tristate, tristateIsTrue, tristateIsTrueOrUnknown } from "../core/tristate.js";
import { Kind } from "../ast/index.js";

function ctxParentKind(ctx: FormattingContext): number {
  return ((ctx as unknown as { contextNode?: { kind?: number } }).contextNode?.kind) ?? 0;
}
function ctxCurrentTokenKind(ctx: FormattingContext): number {
  return ((ctx as unknown as { currentTokenSpan?: { kind?: number } }).currentTokenSpan?.kind) ?? 0;
}
function ctxNextTokenKind(ctx: FormattingContext): number {
  return ((ctx as unknown as { nextTokenSpan?: { kind?: number } }).nextTokenSpan?.kind) ?? 0;
}
function ctxNextTokenParentKind(ctx: FormattingContext): number {
  return ((ctx as unknown as { nextTokenParent?: { kind?: number } }).nextTokenParent?.kind) ?? 0;
}

export type ContextPredicate = (ctx: FormattingContext) => boolean;
export type OptionSelector = (options: FormatCodeSettings) => Tristate | boolean | undefined;

/** Coerce a Tristate/boolean union to a Tristate. */
function coerceTristate(value: Tristate | boolean | undefined): Tristate {
  if (value === undefined) return 0 as Tristate;
  if (typeof value === "boolean") return (value ? 1 : 2) as Tristate;
  return value;
}
export type AnyOptionSelector<T> = (options: FormatCodeSettings) => T | undefined;

// ---------------------------------------------------------------------------
// Option selectors
// ---------------------------------------------------------------------------

export const semicolonOption: AnyOptionSelector<unknown> = (o) => (o as unknown as { semicolons?: unknown }).semicolons;

export const insertSpaceAfterCommaDelimiterOption: OptionSelector = (o) => o.insertSpaceAfterCommaDelimiter;
export const insertSpaceAfterSemicolonInForStatementsOption: OptionSelector = (o) => o.insertSpaceAfterSemicolonInForStatements;
export const insertSpaceBeforeAndAfterBinaryOperatorsOption: OptionSelector = (o) => o.insertSpaceBeforeAndAfterBinaryOperators;
export const insertSpaceAfterConstructorOption: OptionSelector = (o) => o.insertSpaceAfterConstructor;
export const insertSpaceAfterKeywordsInControlFlowStatementsOption: OptionSelector = (o) => o.insertSpaceAfterKeywordsInControlFlowStatements;
export const insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption: OptionSelector = (o) => o.insertSpaceAfterFunctionKeywordForAnonymousFunctions;
export const insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis;
export const insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets;
export const insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces;
export const insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces;
export const insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces;
export const insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption: OptionSelector = (o) => o.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces;
export const insertSpaceAfterTypeAssertionOption: OptionSelector = (o) => o.insertSpaceAfterTypeAssertion;
export const insertSpaceBeforeFunctionParenthesisOption: OptionSelector = (o) => o.insertSpaceBeforeFunctionParenthesis;
export const placeOpenBraceOnNewLineForFunctionsOption: OptionSelector = (o) => o.placeOpenBraceOnNewLineForFunctions;
export const placeOpenBraceOnNewLineForControlBlocksOption: OptionSelector = (o) => o.placeOpenBraceOnNewLineForControlBlocks;
export const insertSpaceBeforeTypeAnnotationOption: OptionSelector = (o) => o.insertSpaceBeforeTypeAnnotation;
export const indentMultiLineObjectLiteralBeginningOnBlankLineOption: OptionSelector = (o) => o.indentMultiLineObjectLiteralBeginningOnBlankLine;
export const indentSwitchCaseOption: OptionSelector = (o) => o.indentSwitchCase;

// ---------------------------------------------------------------------------
// Option-based predicate builders
// ---------------------------------------------------------------------------

export function optionEquals<T>(selector: AnyOptionSelector<T>, value: T): ContextPredicate {
  return (ctx) => selector(ctx.options) === value;
}

export function isOptionEnabled(selector: OptionSelector): ContextPredicate {
  return (ctx) => tristateIsTrue(coerceTristate(selector(ctx.options)));
}

export function isOptionDisabled(selector: OptionSelector): ContextPredicate {
  const t = selector;
  return (ctx) => !tristateIsTrue(coerceTristate(t(ctx.options)));
}

export function isOptionDisabledOrUndefined(selector: OptionSelector): ContextPredicate {
  return (ctx) => {
    const v = selector(ctx.options);
    return v === undefined || !tristateIsTrue(coerceTristate(v));
  };
}

export function isOptionDisabledOrUndefinedOrTokensOnSameLine(selector: OptionSelector): ContextPredicate {
  return (ctx) => {
    const v = selector(ctx.options);
    return v === undefined || !tristateIsTrue(coerceTristate(v)) || ctx.tokensAreOnSameLine();
  };
}

export function isOptionEnabledOrUndefined(selector: OptionSelector): ContextPredicate {
  return (ctx) => {
    const v = selector(ctx.options);
    return v === undefined || tristateIsTrueOrUnknown(coerceTristate(v));
  };
}

// ---------------------------------------------------------------------------
// Structural-context predicates
// ---------------------------------------------------------------------------

export const isForContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ForStatement;
export const isNotForContext: ContextPredicate = (ctx) => !isForContext(ctx);

export const isBinaryOpContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.BinaryExpression || kind === Kind.ConditionalExpression;
};
export const isNotBinaryOpContext: ContextPredicate = (ctx) => !isBinaryOpContext(ctx);

export const isTypeAnnotationContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.TypeReference;
export const isNotTypeAnnotationContext: ContextPredicate = (ctx) => !isTypeAnnotationContext(ctx);

export const isOptionalPropertyContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.PropertyDeclaration || kind === Kind.PropertySignature;
};
export const isNonOptionalPropertyContext: ContextPredicate = (ctx) => !isOptionalPropertyContext(ctx);

export const isConditionalOperatorContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ConditionalExpression;

export const isSameLineTokenOrBeforeBlockContext: ContextPredicate = (ctx) =>
  ctx.tokensAreOnSameLine() || isBeforeBlockContext(ctx);

export const isBraceWrappedContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.Block || kind === Kind.ObjectLiteralExpression || kind === Kind.ObjectBindingPattern || kind === Kind.TypeLiteral || kind === Kind.MappedType || kind === Kind.EnumDeclaration;
};

export const isBeforeMultilineBlockContext: ContextPredicate = (ctx) =>
  isBeforeBlockContext(ctx) && !ctx.tokensAreOnSameLine();

export const isMultilineBlockContext: ContextPredicate = (ctx) =>
  isBlockContext(ctx) && !ctx.tokensAreOnSameLine();

export const isSingleLineBlockContext: ContextPredicate = (ctx) =>
  isBlockContext(ctx) && ctx.tokensAreOnSameLine();

function isBlockContext(ctx: FormattingContext): boolean {
  const kind = ctxParentKind(ctx);
  return kind === Kind.Block || kind === Kind.ModuleBlock || kind === Kind.CaseBlock;
}

export function isBeforeBlockContext(ctx: FormattingContext): boolean {
  const next = ctxNextTokenKind(ctx);
  return next === Kind.OpenBraceToken;
}

export const isStatementOrDeclarationContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return (
    k === Kind.Block ||
    k === Kind.SourceFile ||
    k === Kind.ModuleBlock ||
    k === Kind.CaseClause ||
    k === Kind.DefaultClause
  );
};

export const isNotPropertyAccessExpressionContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) !== Kind.PropertyAccessExpression;

export const isConditionalContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.ConditionalExpression;

export const isUnaryContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.PrefixUnaryExpression || k === Kind.PostfixUnaryExpression;
};

// ---------------------------------------------------------------------------
// Misc predicate exports — each follows the same Strada-mirror shape
// ---------------------------------------------------------------------------

export const isAfterCodeBlockContext: ContextPredicate = (ctx) => isBlockContext(ctx);
export const isControlDeclContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.IfStatement || kind === Kind.ForStatement || kind === Kind.ForInStatement || kind === Kind.ForOfStatement || kind === Kind.WhileStatement || kind === Kind.DoStatement || kind === Kind.SwitchStatement || kind === Kind.WithStatement;
};

export const isObjectContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ObjectLiteralExpression;
export const isFunctionDeclContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.FunctionDeclaration || kind === Kind.FunctionExpression || kind === Kind.MethodDeclaration || kind === Kind.GetAccessor || kind === Kind.SetAccessor || kind === Kind.Constructor;
};
export const isFunctionDeclarationOrFunctionExpressionContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.FunctionDeclaration || kind === Kind.FunctionExpression;
};
export const isTypeAssertionContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.TypeAssertionExpression;
export const isNonJsxSameLineTokenContext: ContextPredicate = (ctx) =>
  ctx.tokensAreOnSameLine() && ctxCurrentTokenKind(ctx) !== Kind.JsxText;
export const isNonJsxElementOrFragmentContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind !== Kind.JsxElement && kind !== Kind.JsxFragment;
};
export const isJsxExpressionContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.JsxExpression;
export const isNextTokenParentJsxAttribute: ContextPredicate = (ctx) => ctxNextTokenParentKind(ctx) === Kind.JsxAttribute;
export const isNextTokenParentNotJsxNamespacedName: ContextPredicate = (ctx) => ctxNextTokenParentKind(ctx) !== Kind.JsxNamespacedName;
export const isJsxAttributeContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.JsxAttribute;
export const isNotBeforeBlockInFunctionDeclarationContext: ContextPredicate = (ctx) => !(isFunctionDeclContext(ctx) && isBeforeBlockContext(ctx));
export const isEndOfDecoratorContextOnSameLine: ContextPredicate = (ctx) => isEndOfDecoratorContext(ctx) && ctx.tokensAreOnSameLine();

function isEndOfDecoratorContext(ctx: FormattingContext): boolean {
  return ctxParentKind(ctx) === Kind.Decorator;
}

export const isStartOfVariableDeclarationList: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.VariableDeclarationList;
export const isModuleDeclContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ModuleDeclaration;
export const isObjectTypeContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.TypeLiteral;
export const isConstructorSignatureContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ConstructSignature;
export const isPropertyContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.PropertyDeclaration || kind === Kind.PropertySignature || kind === Kind.PropertyAssignment;
};
export const isTypeArgumentOrParameterOrAssertionContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.TypeReference || kind === Kind.TypeParameter || kind === Kind.TypeAssertionExpression;
};

// Additional predicates ported to parity with TS-Go rulecontext.go.

export const isFunctionCallContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.CallExpression;
export const isNewContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.NewExpression;
export const isFunctionCallOrNewContext: ContextPredicate = (ctx) => isFunctionCallContext(ctx) || isNewContext(ctx);
export const isPreviousTokenNotComma: ContextPredicate = (ctx) => ctxCurrentTokenKind(ctx) !== Kind.CommaToken;
export const isNextTokenNotCloseBracket: ContextPredicate = (ctx) => ctxNextTokenKind(ctx) !== Kind.CloseBracketToken;
export const isNextTokenNotCloseParen: ContextPredicate = (ctx) => ctxNextTokenKind(ctx) !== Kind.CloseParenToken;
export const isArrowFunctionContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ArrowFunction;
export const isImportTypeContext: ContextPredicate = (ctx) => ctxParentKind(ctx) === Kind.ImportType;
export const isNonJsxTextContext: ContextPredicate = (ctx) => ctxParentKind(ctx) !== Kind.JsxText;
export const isNotFunctionDeclContext: ContextPredicate = (ctx) => !isFunctionDeclContext(ctx);
export const isTypeScriptDeclWithBlockContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.ClassDeclaration || k === Kind.ClassExpression
    || k === Kind.InterfaceDeclaration || k === Kind.EnumDeclaration
    || k === Kind.TypeLiteral || k === Kind.ModuleDeclaration
    || k === Kind.ExportDeclaration || k === Kind.NamedExports
    || k === Kind.ImportDeclaration || k === Kind.NamedImports;
};

// "Same-line" tests rely on context.tokensAreOnSameLine etc., already
// provided as instance methods on FormattingContext.
export const isStatementConditionContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.IfStatement || k === Kind.WhileStatement
    || k === Kind.DoStatement || k === Kind.ForStatement
    || k === Kind.ForInStatement || k === Kind.ForOfStatement
    || k === Kind.SwitchStatement;
};

export const isJsxElementOrFragmentContext: ContextPredicate = (ctx) => {
  const kind = ctxParentKind(ctx);
  return kind === Kind.JsxElement || kind === Kind.JsxFragment;
};

export const isJsxSelfClosingElementContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.JsxSelfClosingElement;

export const isJsxClosingElementContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.JsxClosingElement;

export const isVariableDeclarationOrInitializerContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.VariableDeclaration;
};

export const isYieldOrYieldStarWithOperand: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.YieldExpression;

export const isPropertyAccessExpressionContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.PropertyAccessExpression;

export const isElementAccessExpressionContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.ElementAccessExpression;

export const isClassDeclContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.ClassDeclaration || k === Kind.ClassExpression;
};

export const isInterfaceOrTypeAliasContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.InterfaceDeclaration || k === Kind.TypeAliasDeclaration;
};

export const isEnumDeclarationContext: ContextPredicate = (ctx) =>
  ctxParentKind(ctx) === Kind.EnumDeclaration;

export const isClassMemberContext: ContextPredicate = (ctx) => {
  const k = ctxParentKind(ctx);
  return k === Kind.PropertyDeclaration || k === Kind.MethodDeclaration
    || k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor;
};

export const isAfterCommaContext: ContextPredicate = (ctx) => ctxCurrentTokenKind(ctx) === Kind.CommaToken;

export const isAfterSemicolonContext: ContextPredicate = (ctx) =>
  ctxCurrentTokenKind(ctx) === Kind.SemicolonToken;

export const isAfterOpenBraceContext: ContextPredicate = (ctx) =>
  ctxCurrentTokenKind(ctx) === Kind.OpenBraceToken;

export const isAfterOpenParenContext: ContextPredicate = (ctx) =>
  ctxCurrentTokenKind(ctx) === Kind.OpenParenToken;

export const isAfterOpenBracketContext: ContextPredicate = (ctx) =>
  ctxCurrentTokenKind(ctx) === Kind.OpenBracketToken;

export const isBeforeCloseBraceContext: ContextPredicate = (ctx) =>
  ctxNextTokenKind(ctx) === Kind.CloseBraceToken;

export const isBeforeCloseParenContext: ContextPredicate = (ctx) =>
  ctxNextTokenKind(ctx) === Kind.CloseParenToken;

export const isBeforeCloseBracketContext: ContextPredicate = (ctx) =>
  ctxNextTokenKind(ctx) === Kind.CloseBracketToken;

export const isBeforeCommaContext: ContextPredicate = (ctx) =>
  ctxNextTokenKind(ctx) === Kind.CommaToken;

export const isBeforeSemicolonContext: ContextPredicate = (ctx) =>
  ctxNextTokenKind(ctx) === Kind.SemicolonToken;

// "Not on same line" predicate (negation of tokensAreOnSameLine).
export const isNotSameLineTokenContext: ContextPredicate = (ctx) => !ctx.tokensAreOnSameLine();

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

