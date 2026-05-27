/**
 * Diagnostic message construction.
 *
 * Ported from Strada `diagnostics_emit.go` — createDiagnostic,
 * formatMessageText, applyChain.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { DiagnosticMessage } from "../../diagnostics/types.js";

export interface CheckerDiagnostic {
  readonly file?: string | undefined;
  readonly start: number;
  readonly length: number;
  readonly messageText: string;
  readonly code: number;
  readonly category: number;
}

/**
 * Returns a diagnostic for a node, interpolating placeholders in the
 * message text.
 */
export function createDiagnosticForNode(
  node: AstNode,
  message: DiagnosticMessage,
  ...args: readonly (string | number)[]
): CheckerDiagnostic {
  const pos = (node as unknown as { pos?: number }).pos ?? 0;
  const end = (node as unknown as { end?: number }).end ?? 0;
  const file = walkToFileName(node);
  return {
    file,
    start: pos,
    length: end - pos,
    messageText: interpolate(message.message, args),
    code: message.code,
    category: message.category,
  };
}

function walkToFileName(node: AstNode): string | undefined {
  const walker = (current: AstNode | undefined): string | undefined => {
    if (current === undefined) return undefined;
    if (current.kind === Kind.SourceFile) {
      return (current as unknown as { fileName?: string }).fileName;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker(node);
}

function interpolate(template: string, args: readonly (string | number)[]): string {
  return template.replace(/\{(\d+)\}/g, (_, idx) => {
    const v = args[Number(idx)];
    return v === undefined ? "" : String(v);
  });
}

/**
 * Returns the diagnostic category name as a string.
 */
export function getCategoryName(category: number): string {
  switch (category) {
    case 0: return "Warning";
    case 1: return "Error";
    case 2: return "Suggestion";
    case 3: return "Message";
    default: return "Unknown";
  }
}

/**
 * Returns a sortable key for a diagnostic — by file, then start.
 */
export function getSortKey(d: CheckerDiagnostic): string {
  const file = d.file ?? "";
  return `${file}:${d.start.toString().padStart(10, "0")}:${d.code}`;
}

/**
 * Returns the diagnostic's display string.
 */
export function getDisplayString(d: CheckerDiagnostic): string {
  const file = d.file ?? "(unknown)";
  return `${file}: error TS${d.code}: ${d.messageText}`;
}

/**
 * Returns true when two diagnostics are duplicates by code + position.
 */
export function isDuplicate(a: CheckerDiagnostic, b: CheckerDiagnostic): boolean {
  return (
    a.code === b.code &&
    a.start === b.start &&
    a.length === b.length &&
    a.file === b.file
  );
}

/**
 * Deduplicates a list of diagnostics by signature.
 */
export function dedupeDiagnostics(
  diagnostics: readonly CheckerDiagnostic[],
): readonly CheckerDiagnostic[] {
  const seen = new Set<string>();
  const out: CheckerDiagnostic[] = [];
  for (const d of diagnostics) {
    const key = `${d.file ?? ""}|${d.start}|${d.length}|${d.code}|${d.messageText}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(d);
  }
  return out;
}
