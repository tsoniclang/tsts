/**
 * Diagnostic factories + emitters.
 *
 * Ported from Strada `checker.go` — error/warning emission. The
 * Checker accumulates diagnostics in CheckerState; these helpers
 * build the diagnostic shape and push it into the appropriate bucket.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, SourceFile, Diagnostic } from "../../ast/index.js";
import type { CheckerState } from "./state.js";

export interface DiagnosticMessage {
  code: number;
  category: number;
  key: string;
  message: string;
}

export function error(
  state: CheckerState,
  location: AstNode | undefined,
  message: DiagnosticMessage,
  ...args: readonly unknown[]
): Diagnostic {
  const sf = findSourceFile(location);
  const pos = (location as unknown as { pos?: number } | undefined)?.pos ?? 0;
  const end = (location as unknown as { end?: number } | undefined)?.end ?? pos;
  const diag: Diagnostic = {
    file: sf,
    start: pos,
    length: Math.max(0, end - pos),
    messageText: formatMessage(message.message, args),
    category: message.category,
    code: message.code,
  } as unknown as Diagnostic;
  if (sf !== undefined) {
    const bucket = state.fileDiagnostics.get(sf);
    if (bucket !== undefined) bucket.push(diag);
    else state.fileDiagnostics.set(sf, [diag]);
  } else {
    state.globalDiagnostics.push(diag);
  }
  return diag;
}

export function errorAtRange(
  state: CheckerState,
  file: SourceFile | undefined,
  pos: number,
  end: number,
  message: DiagnosticMessage,
  ...args: readonly unknown[]
): Diagnostic {
  const diag: Diagnostic = {
    file,
    start: pos,
    length: Math.max(0, end - pos),
    messageText: formatMessage(message.message, args),
    category: message.category,
    code: message.code,
  } as unknown as Diagnostic;
  if (file !== undefined) {
    const bucket = state.fileDiagnostics.get(file);
    if (bucket !== undefined) bucket.push(diag);
    else state.fileDiagnostics.set(file, [diag]);
  } else {
    state.globalDiagnostics.push(diag);
  }
  return diag;
}

export function findSourceFile(node: AstNode | undefined): SourceFile | undefined {
  let n: AstNode | undefined = node;
  while (n !== undefined) {
    if ((n as { kind?: number }).kind === Kind.SourceFile) return n as unknown as SourceFile;
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

export function formatMessage(template: string, args: readonly unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (_match, idx) => {
    const i = Number(idx);
    return i < args.length ? String(args[i]) : `{${idx}}`;
  });
}

/**
 * Chain a new diagnostic onto an existing one — used for "related
 * error" surfacing.
 */
export function chain(
  prior: Diagnostic,
  location: AstNode | undefined,
  message: DiagnosticMessage,
  ...args: readonly unknown[]
): Diagnostic {
  const sf = findSourceFile(location);
  const pos = (location as unknown as { pos?: number } | undefined)?.pos ?? 0;
  const end = (location as unknown as { end?: number } | undefined)?.end ?? pos;
  const next: Diagnostic = {
    file: sf,
    start: pos,
    length: Math.max(0, end - pos),
    messageText: formatMessage(message.message, args),
    category: message.category,
    code: message.code,
  } as unknown as Diagnostic;
  (next as unknown as { next?: Diagnostic }).next = prior;
  return next;
}

/**
 * Returns the total error count across file + global buckets.
 */
export function totalErrorCount(state: CheckerState): number {
  let count = state.globalDiagnostics.length;
  for (const bucket of state.fileDiagnostics.values()) count += bucket.length;
  return count;
}
