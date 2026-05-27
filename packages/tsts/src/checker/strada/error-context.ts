/**
 * Error reporting context — accumulates a chain of related
 * diagnostics that lead up to a final type-mismatch error.
 *
 * Ported from Strada `checker.go` — chainDiagnosticMessages,
 * concatenateDiagnosticMessageChains, createDiagnosticMessageChain.
 */

import type { DiagnosticMessage } from "../../diagnostics/types.js";

export interface DiagnosticMessageChain {
  readonly messageText: string;
  readonly code: number;
  readonly category: number;
  readonly next?: readonly DiagnosticMessageChain[];
}

/**
 * Returns a fresh chain head for a message + arguments.
 */
export function createDiagnosticMessageChain(
  message: DiagnosticMessage,
  ...args: readonly (string | number)[]
): DiagnosticMessageChain {
  return {
    messageText: interpolate(message.message, args),
    code: message.code,
    category: message.category,
  };
}

/**
 * Returns a chain where `inner` becomes the `next` of `outer`.
 */
export function chainDiagnosticMessages(
  outer: DiagnosticMessageChain,
  inner: DiagnosticMessageChain,
): DiagnosticMessageChain {
  const existing = outer.next ?? [];
  return { ...outer, next: [...existing, inner] };
}

/**
 * Concatenates two chains — appends the second chain's nodes to the
 * first chain's `next` list.
 */
export function concatenateDiagnosticMessageChains(
  a: DiagnosticMessageChain,
  b: DiagnosticMessageChain,
): DiagnosticMessageChain {
  const existing = a.next ?? [];
  return { ...a, next: [...existing, b] };
}

/**
 * Renders a chain into a flat indented string suitable for
 * terminal display.
 */
export function renderChain(chain: DiagnosticMessageChain, indent = 0): string {
  const pad = "  ".repeat(indent);
  const lines = [pad + chain.messageText];
  if (chain.next !== undefined) {
    for (const child of chain.next) {
      lines.push(renderChain(child, indent + 1));
    }
  }
  return lines.join("\n");
}

/**
 * Returns the depth of a chain (longest path from head to leaf).
 */
export function chainDepth(chain: DiagnosticMessageChain): number {
  if (chain.next === undefined || chain.next.length === 0) return 1;
  const childDepths = chain.next.map(chainDepth);
  return 1 + Math.max(...childDepths);
}

/**
 * Interpolates `{0}`, `{1}`, … placeholders in a message text.
 */
function interpolate(text: string, args: readonly (string | number)[]): string {
  return text.replace(/\{(\d+)\}/g, (_, idx) => {
    const v = args[Number(idx)];
    return v === undefined ? "" : String(v);
  });
}
