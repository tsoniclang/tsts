/**
 * Deferred diagnostic parity helpers.
 *
 * TS-Go defers contextual diagnostics while checking declarations, overloads,
 * and inference candidates. The queue must preserve source order while still
 * allowing speculative checks to discard frames.
 */

export type DeferredDiagnosticPhase =
  | "grammar"
  | "binding"
  | "types"
  | "relations"
  | "controlFlow"
  | "emitResolver";

export interface DeferredDiagnostic {
  readonly fileName: string;
  readonly start: number;
  readonly length: number;
  readonly code: number;
  readonly category: "error" | "warning" | "suggestion" | "message";
  readonly message: string;
  readonly phase: DeferredDiagnosticPhase;
  readonly related?: readonly DeferredDiagnostic[];
}

export interface DeferredDiagnosticCheckpoint {
  readonly queueLength: number;
  readonly speculative: boolean;
}

export interface DeferredDiagnosticQueue {
  readonly diagnostics: readonly DeferredDiagnostic[];
  readonly checkpoints: readonly DeferredDiagnosticCheckpoint[];
}

export function createDeferredDiagnosticQueue(): DeferredDiagnosticQueue {
  return {
    diagnostics: [],
    checkpoints: [],
  };
}

export function enqueueDeferredDiagnostic(queue: DeferredDiagnosticQueue, diagnostic: DeferredDiagnostic): DeferredDiagnosticQueue {
  return {
    ...queue,
    diagnostics: [...queue.diagnostics, diagnostic],
  };
}

export function enqueueDeferredDiagnostics(queue: DeferredDiagnosticQueue, diagnostics: readonly DeferredDiagnostic[]): DeferredDiagnosticQueue {
  let current = queue;
  for (const diagnostic of diagnostics) current = enqueueDeferredDiagnostic(current, diagnostic);
  return current;
}

export function beginDeferredDiagnosticCheckpoint(queue: DeferredDiagnosticQueue, speculative: boolean): DeferredDiagnosticQueue {
  return {
    ...queue,
    checkpoints: [...queue.checkpoints, { queueLength: queue.diagnostics.length, speculative }],
  };
}

export function commitDeferredDiagnosticCheckpoint(queue: DeferredDiagnosticQueue): DeferredDiagnosticQueue {
  if (queue.checkpoints.length === 0) return queue;
  return {
    ...queue,
    checkpoints: queue.checkpoints.slice(0, -1),
  };
}

export function rollbackDeferredDiagnosticCheckpoint(queue: DeferredDiagnosticQueue): DeferredDiagnosticQueue {
  const checkpoint = queue.checkpoints.at(-1);
  if (checkpoint === undefined) return queue;
  return {
    diagnostics: queue.diagnostics.slice(0, checkpoint.queueLength),
    checkpoints: queue.checkpoints.slice(0, -1),
  };
}

export function replayDeferredDiagnostics(queue: DeferredDiagnosticQueue, sink: (diagnostic: DeferredDiagnostic) => void): void {
  for (const diagnostic of sortDeferredDiagnostics(queue.diagnostics)) sink(diagnostic);
}

export function sortDeferredDiagnostics(diagnostics: readonly DeferredDiagnostic[]): readonly DeferredDiagnostic[] {
  return [...diagnostics].sort(compareDeferredDiagnostics);
}

export function compareDeferredDiagnostics(left: DeferredDiagnostic, right: DeferredDiagnostic): number {
  const file = left.fileName.localeCompare(right.fileName);
  if (file !== 0) return file;
  if (left.start !== right.start) return left.start - right.start;
  if (left.length !== right.length) return left.length - right.length;
  if (left.code !== right.code) return left.code - right.code;
  return phaseOrder(left.phase) - phaseOrder(right.phase);
}

export function dedupeDeferredDiagnostics(diagnostics: readonly DeferredDiagnostic[]): readonly DeferredDiagnostic[] {
  const seen = new Set<string>();
  const result: DeferredDiagnostic[] = [];
  for (const diagnostic of sortDeferredDiagnostics(diagnostics)) {
    const key = deferredDiagnosticKey(diagnostic);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(diagnostic);
  }
  return result;
}

export function filterDeferredDiagnosticsByPhase(queue: DeferredDiagnosticQueue, phase: DeferredDiagnosticPhase): readonly DeferredDiagnostic[] {
  return queue.diagnostics.filter(diagnostic => diagnostic.phase === phase);
}

export function hasDeferredDiagnostic(queue: DeferredDiagnosticQueue, code: number): boolean {
  return queue.diagnostics.some(diagnostic => diagnostic.code === code);
}

export function mapDeferredDiagnosticMessages(queue: DeferredDiagnosticQueue, mapper: (message: string) => string): DeferredDiagnosticQueue {
  return {
    ...queue,
    diagnostics: queue.diagnostics.map(diagnostic => ({
      ...diagnostic,
      message: mapper(diagnostic.message),
      ...(diagnostic.related === undefined ? {} : { related: diagnostic.related.map(related => ({ ...related, message: mapper(related.message) })) }),
    })),
  };
}

export function attachRelatedDeferredDiagnostic(diagnostic: DeferredDiagnostic, related: DeferredDiagnostic): DeferredDiagnostic {
  return {
    ...diagnostic,
    related: [...diagnostic.related ?? [], related],
  };
}

export function flattenRelatedDeferredDiagnostics(diagnostic: DeferredDiagnostic): readonly DeferredDiagnostic[] {
  const result: DeferredDiagnostic[] = [diagnostic];
  for (const related of diagnostic.related ?? []) result.push(...flattenRelatedDeferredDiagnostics(related));
  return result;
}

export function summarizeDeferredDiagnostics(queue: DeferredDiagnosticQueue): ReadonlyMap<DeferredDiagnosticPhase, number> {
  const counts = new Map<DeferredDiagnosticPhase, number>();
  for (const diagnostic of queue.diagnostics) {
    counts.set(diagnostic.phase, (counts.get(diagnostic.phase) ?? 0) + 1);
  }
  return counts;
}

export function deferredDiagnosticKey(diagnostic: DeferredDiagnostic): string {
  return [
    diagnostic.fileName,
    diagnostic.start,
    diagnostic.length,
    diagnostic.code,
    diagnostic.category,
    diagnostic.phase,
    diagnostic.message,
  ].join(":");
}

export function phaseOrder(phase: DeferredDiagnosticPhase): number {
  switch (phase) {
    case "grammar":
      return 0;
    case "binding":
      return 1;
    case "types":
      return 2;
    case "relations":
      return 3;
    case "controlFlow":
      return 4;
    case "emitResolver":
      return 5;
  }
}
