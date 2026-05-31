/**
 * Processing diagnostic.
 *
 * Port of TS-Go `internal/compiler/processingDiagnostic.go` (~135 LoC).
 * Lightweight diagnostic kind emitted during file loading + module
 * resolution before the full diagnostic surface is available.
 */

import type { Diagnostic } from "../ast/index.js";

export interface ProcessingDiagnostic {
  message: { code: number; message: string };
  args: readonly unknown[];
  fileName?: string;
  pos?: number;
  end?: number;
  related?: readonly ProcessingDiagnostic[];
}

export function newProcessingDiagnostic(
  message: { code: number; message: string }, args: readonly unknown[] = [],
): ProcessingDiagnostic {
  return { message, args };
}

export function withLocation(
  d: ProcessingDiagnostic, fileName: string, pos: number, end: number,
): ProcessingDiagnostic {
  return { ...d, fileName, pos, end };
}

export function withRelated(
  d: ProcessingDiagnostic, related: readonly ProcessingDiagnostic[],
): ProcessingDiagnostic {
  return { ...d, related };
}

export function toDiagnostic(d: ProcessingDiagnostic): Diagnostic {
  return {
    file: undefined, start: d.pos ?? 0, length: (d.end ?? d.pos ?? 0) - (d.pos ?? 0),
    messageText: d.message.message, category: 1, code: d.message.code,
  } as unknown as Diagnostic;
}
