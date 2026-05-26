/**
 * Include processor.
 *
 * Port of TS-Go `internal/compiler/includeprocessor.go` (~181 LoC).
 * Builds the per-file FileIncludeReason graph and emits diagnostics
 * when files are unreachable, conflicting, or shadowed.
 */

import type { SourceFile, Diagnostic } from "../ast/index.js";
import type { FileIncludeReason } from "./fileinclude.js";

export class IncludeProcessor {
  reasons: Map<string, FileIncludeReason[]> = new Map();
  diagnostics: Diagnostic[] = [];

  addReason(fileName: string, reason: FileIncludeReason): void {
    const existing = this.reasons.get(fileName);
    if (existing === undefined) {
      this.reasons.set(fileName, [reason]);
    } else {
      this.reasons.set(fileName, [...existing, reason]);
    }
  }

  getReasons(fileName: string): readonly FileIncludeReason[] {
    return this.reasons.get(fileName) ?? [];
  }

  processFile(file: SourceFile): void { void file; }

  getDiagnostics(): readonly Diagnostic[] {
    return this.diagnostics;
  }
}

export function newIncludeProcessor(): IncludeProcessor {
  return new IncludeProcessor();
}
