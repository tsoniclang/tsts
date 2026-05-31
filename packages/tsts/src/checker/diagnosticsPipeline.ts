import {
  Kind,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import type { CheckerCoreState } from "./checkerCore.js";

export interface CheckerDiagnostic {
  readonly file?: SourceFile;
  readonly node?: AstNode;
  readonly start?: number;
  readonly length?: number;
  readonly message: string;
  readonly args?: readonly unknown[];
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  readonly suggestion?: boolean;
  readonly related?: readonly CheckerDiagnostic[];
}

export interface DeferredDiagnostic {
  readonly file: SourceFile | undefined;
  readonly node: AstNode | undefined;
  readonly callback: () => CheckerDiagnostic | readonly CheckerDiagnostic[] | undefined;
}

export interface DiagnosticStateLike {
  diagnostics: readonly unknown[];
  suggestionDiagnostics: readonly unknown[];
  deferredDiagnosticCallbacks: readonly (() => void)[];
  saveDeferredDiagnostics: boolean;
  currentNode?: AstNode | undefined;
  wasCanceled?: boolean;
}

export interface DeprecatedDiagnosticTarget {
  readonly symbol?: AstSymbol;
  readonly declaration?: AstNode;
  readonly node: AstNode;
  readonly message?: string;
}

export function getDiagnostics(state: DiagnosticStateLike): readonly CheckerDiagnostic[] {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics);
}

export function getSuggestionDiagnostics(state: DiagnosticStateLike): readonly CheckerDiagnostic[] {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.suggestionDiagnostics);
}

export function getGlobalDiagnostics(state: DiagnosticStateLike): readonly CheckerDiagnostic[] {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics).filter((diagnostic) => diagnostic.file === undefined);
}

export function clearDiagnostics(state: DiagnosticStateLike): void {
  mutableDiagnostics(state).length = 0;
  mutableSuggestionDiagnostics(state).length = 0;
  mutableDeferredCallbacks(state).length = 0;
}

export function addDeferredDiagnostic(
  state: DiagnosticStateLike,
  file: SourceFile | undefined,
  node: AstNode | undefined,
  callback: () => CheckerDiagnostic | readonly CheckerDiagnostic[] | undefined,
): void {
  const run = () => {
    const result = callback();
    if (result === undefined) return;
    if (Array.isArray(result)) {
      for (const diagnostic of result) addDiagnostic(state, withDefaultLocation(diagnostic, file, node));
      return;
    }
    addDiagnostic(state, withDefaultLocation(result as CheckerDiagnostic, file, node));
  };
  if (state.saveDeferredDiagnostics) {
    mutableDeferredCallbacks(state).push(run);
  } else {
    run();
  }
}

export function produceDeferredDiagnostics(state: DiagnosticStateLike): void {
  const callbacks = mutableDeferredCallbacks(state);
  while (callbacks.length > 0) {
    const callback = callbacks.shift();
    callback?.();
    if (state.wasCanceled === true) break;
  }
}

export function error(state: DiagnosticStateLike, node: AstNode | undefined, message: string, ...args: readonly unknown[]): CheckerDiagnostic {
  const diagnostic = createCheckerDiagnostic(node, message, args);
  addDiagnostic(state, diagnostic);
  return diagnostic;
}

export function errorSkippedOnNoEmit(
  state: DiagnosticStateLike,
  node: AstNode | undefined,
  message: string,
  ...args: readonly unknown[]
): CheckerDiagnostic | undefined {
  if (isNoEmitSuppressed(state, node)) return undefined;
  return error(state, node, message, ...args);
}

export function errorOrSuggestion(
  state: DiagnosticStateLike,
  reportAsSuggestion: boolean,
  node: AstNode | undefined,
  message: string,
  ...args: readonly unknown[]
): CheckerDiagnostic {
  const diagnostic = createCheckerDiagnostic(node, message, args);
  addErrorOrSuggestion(state, reportAsSuggestion, diagnostic);
  return diagnostic;
}

export function errorAndMaybeSuggestAwait(
  state: DiagnosticStateLike,
  node: AstNode | undefined,
  message: string,
  ...args: readonly unknown[]
): CheckerDiagnostic {
  const diagnostic = error(state, node, message, ...args);
  if (node !== undefined && canSuggestAwait(node)) {
    addErrorOrSuggestion(state, true, {
      node,
      message: "Did_you_forget_to_use_await",
      suggestion: true,
    });
  }
  return diagnostic;
}

export function addErrorOrSuggestion(
  state: DiagnosticStateLike,
  reportAsSuggestion: boolean,
  diagnostic: CheckerDiagnostic,
): void {
  if (reportAsSuggestion) addSuggestionDiagnostic(state, { ...diagnostic, suggestion: true });
  else addDiagnostic(state, diagnostic);
}

export function addDiagnostic(state: DiagnosticStateLike, diagnostic: CheckerDiagnostic): void {
  mutableDiagnostics(state).push(diagnostic);
}

export function addSuggestionDiagnostic(state: DiagnosticStateLike, diagnostic: CheckerDiagnostic): void {
  mutableSuggestionDiagnostics(state).push(diagnostic);
}

export function addDeprecatedSuggestion(
  state: DiagnosticStateLike,
  node: AstNode,
  symbol: AstSymbol | undefined,
  message = "Deprecated_symbol_0",
): CheckerDiagnostic | undefined {
  const declaration = symbol?.declarations.find(isDeprecatedDeclaration);
  if (declaration === undefined) return undefined;
  const target: DeprecatedDiagnosticTarget = {
    node,
    declaration,
    message,
  };
  if (symbol !== undefined) (target as { symbol: AstSymbol }).symbol = symbol;
  return addDeprecatedSuggestionWorker(state, target);
}

export function addDeprecatedSuggestionWorker(
  state: DiagnosticStateLike,
  target: DeprecatedDiagnosticTarget,
): CheckerDiagnostic {
  const diagnostic: CheckerDiagnostic = {
    node: target.node,
    message: target.message ?? "Deprecated_symbol_0",
    args: [symbolName(target.symbol) || declarationName(target.declaration)],
    reportsDeprecated: true,
    suggestion: true,
  };
  addSuggestionDiagnostic(state, diagnostic);
  return diagnostic;
}

export function isDeprecatedSymbol(symbol: AstSymbol | undefined): boolean {
  return symbol?.declarations.some(isDeprecatedDeclaration) === true;
}

export function isDeprecatedDeclaration(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const jsDoc = (node as unknown as { jsDoc?: readonly AstNode[] }).jsDoc;
  if (jsDoc === undefined) return false;
  return jsDoc.some((doc) => {
    const tags = nodeArray((doc as unknown as { tags?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).tags);
    return tags.some((tag) => declarationName(tag) === "deprecated" || nodeText(nodeField(tag, "tagName")) === "deprecated");
  });
}

export function hasParseDiagnostics(sourceFile: SourceFile): boolean {
  const parseDiagnostics = (sourceFile as unknown as { parseDiagnostics?: readonly unknown[] }).parseDiagnostics;
  return parseDiagnostics !== undefined && parseDiagnostics.length > 0;
}

export function getCannotFindNameDiagnosticForName(name: string): string {
  if (name === "Promise") return "Cannot_find_global_value_Promise";
  if (name === "console") return "Cannot_find_name_console_Do_you_need_to_change_your_target_library";
  if (name === "require") return "Cannot_find_name_require_Do_you_need_to_install_type_definitions_for_node";
  if (name === "module") return "Cannot_find_name_module_Do_you_need_to_install_type_definitions_for_node";
  return "Cannot_find_name_0";
}

export function getCannotFindNameDiagnostic(
  state: DiagnosticStateLike,
  node: AstNode | undefined,
  name: string,
): CheckerDiagnostic {
  return error(state, node, getCannotFindNameDiagnosticForName(name), name);
}

export function diagnosticsForFile(state: DiagnosticStateLike, file: SourceFile): readonly CheckerDiagnostic[] {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics).filter((diagnostic) => diagnostic.file === file);
}

export function diagnosticsForNode(state: DiagnosticStateLike, node: AstNode): readonly CheckerDiagnostic[] {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics).filter((diagnostic) => diagnostic.node === node);
}

export function withDeferredDiagnostics<T>(state: DiagnosticStateLike, callback: () => T): T {
  const previous = state.saveDeferredDiagnostics;
  setSaveDeferredDiagnostics(state, true);
  try {
    return callback();
  } finally {
    setSaveDeferredDiagnostics(state, previous);
  }
}

export function flushDeferredDiagnosticsForNode(
  state: DiagnosticStateLike,
  node: AstNode,
  body: () => CheckerDiagnostic | readonly CheckerDiagnostic[] | undefined,
): void {
  addDeferredDiagnostic(state, sourceFileOf(node), node, body);
}

export function diagnosticCount(state: DiagnosticStateLike): number {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics).length + diagnosticArray(state.suggestionDiagnostics).length;
}

export function hasErrors(state: DiagnosticStateLike): boolean {
  produceDeferredDiagnostics(state);
  return diagnosticArray(state.diagnostics).length > 0;
}

export function installCheckerDiagnosticMethods<T extends { core: CheckerCoreState }>(checker: T): T & {
  getDiagnostics(): readonly CheckerDiagnostic[];
  getSuggestionDiagnostics(): readonly CheckerDiagnostic[];
  getGlobalDiagnostics(): readonly CheckerDiagnostic[];
} {
  const withMethods = checker as T & {
    getDiagnostics(): readonly CheckerDiagnostic[];
    getSuggestionDiagnostics(): readonly CheckerDiagnostic[];
    getGlobalDiagnostics(): readonly CheckerDiagnostic[];
  };
  withMethods.getDiagnostics = () => getDiagnostics(checker.core);
  withMethods.getSuggestionDiagnostics = () => getSuggestionDiagnostics(checker.core);
  withMethods.getGlobalDiagnostics = () => getGlobalDiagnostics(checker.core);
  return withMethods;
}

function createCheckerDiagnostic(
  node: AstNode | undefined,
  message: string,
  args: readonly unknown[],
): CheckerDiagnostic {
  const file = node === undefined ? undefined : sourceFileOf(node);
  const range = node === undefined ? undefined : nodeRange(node);
  const diagnostic: {
    file?: SourceFile;
    node?: AstNode;
    start?: number;
    length?: number;
    message: string;
    args: readonly unknown[];
  } = {
    message,
    args,
  };
  if (file !== undefined) diagnostic.file = file;
  if (node !== undefined) diagnostic.node = node;
  if (range !== undefined) {
    diagnostic.start = range.start;
    diagnostic.length = range.length;
  }
  return diagnostic;
}

function withDefaultLocation(
  diagnostic: CheckerDiagnostic,
  file: SourceFile | undefined,
  node: AstNode | undefined,
): CheckerDiagnostic {
  if (diagnostic.file !== undefined || diagnostic.node !== undefined) return diagnostic;
  const range = node === undefined ? undefined : nodeRange(node);
  const withLocation: {
    file?: SourceFile;
    node?: AstNode;
    start?: number;
    length?: number;
  } & CheckerDiagnostic = { ...diagnostic };
  if (file !== undefined) withLocation.file = file;
  if (node !== undefined) withLocation.node = node;
  if (range !== undefined) {
    withLocation.start = range.start;
    withLocation.length = range.length;
  }
  return withLocation;
}

function isNoEmitSuppressed(_state: DiagnosticStateLike, node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  return ((node as unknown as { emitNode?: { flags?: number } }).emitNode?.flags ?? 0) !== 0
    && (node.kind === Kind.NotEmittedStatement || node.kind === Kind.MissingDeclaration);
}

function canSuggestAwait(node: AstNode): boolean {
  return node.kind === Kind.CallExpression
    || node.kind === Kind.PropertyAccessExpression
    || node.kind === Kind.ElementAccessExpression
    || node.kind === Kind.Identifier;
}

function sourceFileOf(node: AstNode): SourceFile | undefined {
  const getSourceFile = (node as unknown as { getSourceFile?: () => SourceFile }).getSourceFile;
  if (getSourceFile !== undefined) return getSourceFile.call(node);
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current as unknown as SourceFile;
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

function nodeRange(node: AstNode): { readonly start: number; readonly length: number } {
  const start = (node as unknown as { pos?: number }).pos ?? 0;
  const end = (node as unknown as { end?: number }).end ?? start;
  return { start, length: Math.max(0, end - start) };
}

function mutableDiagnostics(state: DiagnosticStateLike): CheckerDiagnostic[] {
  return state.diagnostics as CheckerDiagnostic[];
}

function mutableSuggestionDiagnostics(state: DiagnosticStateLike): CheckerDiagnostic[] {
  return state.suggestionDiagnostics as CheckerDiagnostic[];
}

function mutableDeferredCallbacks(state: DiagnosticStateLike): (() => void)[] {
  return state.deferredDiagnosticCallbacks as (() => void)[];
}

function diagnosticArray(value: readonly unknown[]): readonly CheckerDiagnostic[] {
  return value as readonly CheckerDiagnostic[];
}

function setSaveDeferredDiagnostics(state: DiagnosticStateLike, value: boolean): void {
  (state as { saveDeferredDiagnostics: boolean }).saveDeferredDiagnostics = value;
}

function nodeArray(node: unknown): readonly AstNode[] {
  if (node === undefined) return [];
  if (Array.isArray(node)) return node as readonly AstNode[];
  return (node as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function nodeField<T = AstNode>(node: unknown, field: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[field];
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function declarationName(node: AstNode | undefined): string {
  return nodeText(nodeField(node, "name")) || nodeText(node);
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}
