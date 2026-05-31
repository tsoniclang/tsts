/**
 * Checker diagnostic construction and elaboration.
 *
 * TS-Go checker.go centralizes error/suggestion emission, related-info
 * attachment, operator/call/property elaboration, deprecated suggestions, and
 * widening diagnostics. This module ports those decisions into a reusable
 * diagnostic builder for the split checker.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { TypeFlags, type Type } from "./types.js";

export type DiagnosticSeverity = "error" | "suggestion" | "message";
export type WideningDiagnosticKind = "normal" | "function-return" | "generator-next" | "generator-yield";

export interface CheckerDiagnostic {
  readonly node?: AstNode;
  readonly message: string;
  readonly severity: DiagnosticSeverity;
  readonly related?: readonly CheckerDiagnostic[];
}

export interface DiagnosticSink {
  readonly diagnostics: CheckerDiagnostic[];
  readonly suggestions: CheckerDiagnostic[];
  readonly noEmitSuppressed: Set<AstNode>;
}

export interface DiagnosticFormatEnvironment {
  readonly typeToString?: (type: Type) => string;
  readonly symbolToString?: (symbol: AstSymbol) => string;
  readonly getBaseTypeOfLiteralType?: (type: Type) => Type;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
}

export function createDiagnosticSink(): DiagnosticSink {
  return { diagnostics: [], suggestions: [], noEmitSuppressed: new Set() };
}

export function error(sink: DiagnosticSink, node: AstNode | undefined, message: string, related: readonly CheckerDiagnostic[] = []): CheckerDiagnostic {
  const diagnostic = makeDiagnostic(node, message, "error", related);
  sink.diagnostics.push(diagnostic);
  return diagnostic;
}

export function errorSkippedOnNoEmit(
  sink: DiagnosticSink,
  node: AstNode | undefined,
  message: string,
  related: readonly CheckerDiagnostic[] = [],
): CheckerDiagnostic | undefined {
  if (node !== undefined && sink.noEmitSuppressed.has(node)) return undefined;
  return error(sink, node, message, related);
}

export function suggestion(sink: DiagnosticSink, node: AstNode | undefined, message: string): CheckerDiagnostic {
  const diagnostic = makeDiagnostic(node, message, "suggestion");
  sink.suggestions.push(diagnostic);
  return diagnostic;
}

export function errorAndMaybeSuggestAwait(
  sink: DiagnosticSink,
  node: AstNode | undefined,
  maybeMissingAwait: boolean,
  message: string,
): CheckerDiagnostic {
  const related = maybeMissingAwait ? [makeDiagnostic(node, "Did you forget to use 'await'?", "suggestion")] : [];
  return error(sink, node, message, related);
}

export function addDeprecatedSuggestion(
  sink: DiagnosticSink,
  location: AstNode | undefined,
  declarations: readonly AstNode[],
  deprecatedEntity: string,
): CheckerDiagnostic | undefined {
  if (!declarations.some(isDeprecatedDeclaration)) return undefined;
  return suggestion(sink, location, `'${deprecatedEntity}' is deprecated.`);
}

export function isDeprecatedDeclaration(declaration: AstNode): boolean {
  return Boolean((declaration as { readonly deprecated?: boolean }).deprecated)
    || nodeArray(declaration, "jsDoc").some(doc => /@deprecated\b/.test((doc as { readonly comment?: string }).comment ?? ""));
}

export function isDeprecatedSymbol(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some(isDeprecatedDeclaration);
}

export function reportObjectPossiblyNullOrUndefinedError(
  sink: DiagnosticSink,
  node: AstNode,
  facts: TypeFlags,
): CheckerDiagnostic {
  const nullish = (facts & TypeFlags.Null) !== 0 && (facts & TypeFlags.Undefined) !== 0
    ? "null or undefined"
    : (facts & TypeFlags.Null) !== 0
      ? "null"
      : "undefined";
  return error(sink, node, `Object is possibly '${nullish}'.`);
}

export function reportCannotInvokePossiblyNullOrUndefinedError(
  sink: DiagnosticSink,
  node: AstNode,
  facts: TypeFlags,
): CheckerDiagnostic {
  const nullish = (facts & TypeFlags.Null) !== 0 && (facts & TypeFlags.Undefined) !== 0
    ? "null or undefined"
    : (facts & TypeFlags.Null) !== 0
      ? "null"
      : "undefined";
  return error(sink, node, `Cannot invoke an object which is possibly '${nullish}'.`);
}

export function invocationError(
  sink: DiagnosticSink,
  errorTarget: AstNode,
  apparentType: Type,
  kind: "call" | "construct",
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic {
  const typeText = formatType(apparentType, environment);
  const operation = kind === "call" ? "callable" : "constructable";
  return error(sink, errorTarget, `This expression is not ${operation}. Type '${typeText}' has no ${kind} signatures.`);
}

export function invocationErrorRecovery(apparentType: Type, kind: "call" | "construct"): Type {
  void kind;
  return apparentType;
}

export function getArgumentArityError(
  node: AstNode,
  min: number,
  max: number | undefined,
  actual: number,
): CheckerDiagnostic {
  const expected = max === undefined || max === min ? `${min}` : `${min}-${max}`;
  return makeDiagnostic(node, `Expected ${expected} arguments, but got ${actual}.`, "error");
}

export function getTypeArgumentArityError(
  node: AstNode,
  min: number,
  max: number,
  actual: number,
): CheckerDiagnostic {
  const expected = min === max ? `${min}` : `${min}-${max}`;
  return makeDiagnostic(node, `Expected ${expected} type arguments, but got ${actual}.`, "error");
}

export function reportOperatorError(
  sink: DiagnosticSink,
  leftType: Type,
  operator: Kind,
  rightType: Type,
  errorNode: AstNode,
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic {
  return error(
    sink,
    errorNode,
    `Operator '${operatorText(operator)}' cannot be applied to types '${formatType(leftType, environment)}' and '${formatType(rightType, environment)}'.`,
  );
}

export function reportOperatorErrorUnless(
  sink: DiagnosticSink,
  leftType: Type,
  operator: Kind,
  rightType: Type,
  errorNode: AstNode,
  predicate: (left: Type, right: Type) => boolean,
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic | undefined {
  return predicate(leftType, rightType) ? undefined : reportOperatorError(sink, leftType, operator, rightType, errorNode, environment);
}

export function addImplementationSuccessElaboration(
  failedMessage: CheckerDiagnostic,
  implementationMessage: CheckerDiagnostic,
): CheckerDiagnostic {
  return {
    ...failedMessage,
    related: [...failedMessage.related ?? [], implementationMessage],
  };
}

export function maybeAddMissingAwaitInfo(
  diagnostic: CheckerDiagnostic,
  source: Type,
  target: Type,
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic {
  if (!looksLikePromise(source) || looksLikePromise(target)) return diagnostic;
  const awaited = promiseArgument(source);
  if (awaited !== undefined && environment.isTypeAssignableTo?.(awaited, target) === true) {
    return {
      ...diagnostic,
      related: [...diagnostic.related ?? [], makeDiagnostic(diagnostic.node, "Did you forget to use 'await'?", "suggestion")],
    };
  }
  return diagnostic;
}

export function reportImplicitAny(
  sink: DiagnosticSink,
  declaration: AstNode,
  type: Type,
  wideningKind: WideningDiagnosticKind,
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic | undefined {
  if ((type.flags & TypeFlags.Any) === 0) return undefined;
  return error(sink, declaration, implicitAnyMessage(declaration, wideningKind, environment));
}

export function reportErrorsFromWidening(
  sink: DiagnosticSink,
  declaration: AstNode,
  type: Type,
  wideningKind: WideningDiagnosticKind,
  environment: DiagnosticFormatEnvironment,
): boolean {
  const diagnostic = reportImplicitAny(sink, declaration, type, wideningKind, environment);
  return diagnostic !== undefined;
}

export function reportWideningErrorsInType(
  sink: DiagnosticSink,
  type: Type,
  location: AstNode,
  environment: DiagnosticFormatEnvironment,
): boolean {
  if ((type.flags & TypeFlags.Any) !== 0) {
    error(sink, location, `Type '${formatType(type, environment)}' implicitly has an 'any' type.`);
    return true;
  }
  if ((type.flags & TypeFlags.Union) !== 0) {
    return constituentTypes(type).some(part => reportWideningErrorsInType(sink, part, location, environment));
  }
  return false;
}

export function elaborateNeverIntersection(
  diagnostic: CheckerDiagnostic,
  node: AstNode,
  type: Type,
  environment: DiagnosticFormatEnvironment,
): CheckerDiagnostic {
  if ((type.flags & TypeFlags.Intersection) === 0) return diagnostic;
  const neverProps = (type.data as { readonly resolvedProperties?: readonly AstSymbol[] } | undefined)?.resolvedProperties
    ?.filter(isNeverReducedProperty) ?? [];
  if (neverProps.length === 0) return diagnostic;
  return {
    ...diagnostic,
    related: [
      ...diagnostic.related ?? [],
      ...neverProps.map(prop => makeDiagnostic(node, `Property '${formatSymbol(prop, environment)}' conflicts and reduces the intersection to 'never'.`, "message")),
    ],
  };
}

export function isNeverReducedProperty(symbol: AstSymbol): boolean {
  const type = (symbol as { readonly syntheticType?: Type }).syntheticType;
  return type !== undefined && (type.flags & TypeFlags.Never) !== 0;
}

export function createDiagnosticForNode(node: AstNode, message: string): CheckerDiagnostic {
  return makeDiagnostic(getAdjustedNodeForError(node), message, "error");
}

export function getAdjustedNodeForError(node: AstNode): AstNode {
  if (node.kind === Kind.ParenthesizedExpression) {
    return (node as { readonly expression?: AstNode }).expression ?? node;
  }
  if (node.kind === Kind.AsExpression || node.kind === Kind.TypeAssertionExpression) {
    return (node as { readonly expression?: AstNode }).expression ?? node;
  }
  return node;
}

export function lookupOrIssueError(
  sink: DiagnosticSink,
  location: AstNode,
  symbol: AstSymbol | undefined,
  message: string,
): CheckerDiagnostic | undefined {
  if (symbol !== undefined) return undefined;
  return error(sink, location, message);
}

export function addDuplicateDeclarationError(
  sink: DiagnosticSink,
  node: AstNode,
  symbolName: string,
  relatedNodes: readonly AstNode[],
): CheckerDiagnostic {
  return error(
    sink,
    node,
    `Duplicate identifier '${symbolName}'.`,
    relatedNodes.map(related => makeDiagnostic(related, "Duplicate declaration is here.", "message")),
  );
}

export function addDuplicateDeclarationErrorsForSymbols(
  sink: DiagnosticSink,
  target: AstSymbol,
  source: AstSymbol,
): readonly CheckerDiagnostic[] {
  const name = target.name ?? target.escapedName ?? source.name ?? source.escapedName ?? "";
  const targetDecls = target.declarations ?? [];
  const sourceDecls = source.declarations ?? [];
  const diagnostics: CheckerDiagnostic[] = [];
  for (const sourceDecl of sourceDecls) {
    diagnostics.push(addDuplicateDeclarationError(sink, sourceDecl, name, targetDecls));
  }
  return diagnostics;
}

function makeDiagnostic(
  node: AstNode | undefined,
  message: string,
  severity: DiagnosticSeverity,
  related: readonly CheckerDiagnostic[] = [],
): CheckerDiagnostic {
  return {
    ...(node === undefined ? {} : { node }),
    message,
    severity,
    ...(related.length === 0 ? {} : { related }),
  };
}

function formatType(type: Type, environment: DiagnosticFormatEnvironment): string {
  return environment.typeToString?.(type)
    ?? type.symbol?.name
    ?? type.symbol?.escapedName
    ?? (type.data as { readonly intrinsicName?: string } | undefined)?.intrinsicName
    ?? `type#${type.id}`;
}

function formatSymbol(symbol: AstSymbol, environment: DiagnosticFormatEnvironment): string {
  return environment.symbolToString?.(symbol) ?? symbol.name ?? symbol.escapedName ?? "";
}

function operatorText(kind: Kind): string {
  return Kind[kind] ?? String(kind);
}

function implicitAnyMessage(node: AstNode, wideningKind: WideningDiagnosticKind, environment: DiagnosticFormatEnvironment): string {
  const name = nodeName(node);
  const prefix = name.length === 0 ? "Declaration" : `'${name}'`;
  if (wideningKind === "function-return") return `${prefix} implicitly has return type 'any'.`;
  if (wideningKind === "generator-next") return `${prefix} implicitly has yield-next type 'any'.`;
  if (wideningKind === "generator-yield") return `${prefix} implicitly has yield type 'any'.`;
  void environment;
  return `${prefix} implicitly has an 'any' type.`;
}

function looksLikePromise(type: Type): boolean {
  return type.symbol?.name === "Promise" || type.symbol?.escapedName === "Promise" || type.symbol?.name === "PromiseLike";
}

function promiseArgument(type: Type): Type | undefined {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function nodeName(node: AstNode): string {
  const candidate = node as { readonly name?: AstNode | string; readonly text?: string; readonly escapedText?: string };
  if (typeof candidate.name === "string") return candidate.name;
  if (candidate.name !== undefined) return nodeName(candidate.name);
  return candidate.text ?? candidate.escapedText ?? "";
}

function nodeArray(node: AstNode, field: "jsDoc"): readonly AstNode[] {
  return (node as { readonly jsDoc?: readonly AstNode[] })[field] ?? [];
}
