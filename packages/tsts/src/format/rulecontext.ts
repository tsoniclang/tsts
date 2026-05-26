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
    return v === undefined || tristateIsTrueOrUnknown(v);
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

function isBeforeBlockContext(ctx: FormattingContext): boolean {
  const next = ctxNextTokenKind(ctx);
  return next === Kind.OpenBraceToken;
}

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

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare const Kind: {
  ForStatement: number; BinaryExpression: number; ConditionalExpression: number;
  TypeReference: number; PropertyDeclaration: number; PropertySignature: number;
  Block: number; ObjectLiteralExpression: number; ObjectBindingPattern: number;
  TypeLiteral: number; MappedType: number; EnumDeclaration: number;
  ModuleBlock: number; CaseBlock: number; OpenBraceToken: number;
  IfStatement: number; ForInStatement: number; ForOfStatement: number;
  WhileStatement: number; DoStatement: number; SwitchStatement: number; WithStatement: number;
  FunctionDeclaration: number; FunctionExpression: number; MethodDeclaration: number;
  GetAccessor: number; SetAccessor: number; Constructor: number;
  TypeAssertionExpression: number; JsxText: number; JsxElement: number; JsxFragment: number;
  JsxExpression: number; JsxAttribute: number; JsxNamespacedName: number;
  Decorator: number; VariableDeclarationList: number; ModuleDeclaration: number;
  ConstructSignature: number; PropertyAssignment: number; TypeParameter: number;
};

declare function ctxParentKind(ctx: FormattingContext): number;
declare function ctxCurrentTokenKind(ctx: FormattingContext): number;
declare function ctxNextTokenKind(ctx: FormattingContext): number;
declare function ctxNextTokenParentKind(ctx: FormattingContext): number;
