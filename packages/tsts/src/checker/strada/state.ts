/**
 * Strada-shaped Checker state.
 *
 * The state object is what every standalone check / get function
 * mutates / reads. Splitting body code across files (see siblings in
 * this directory) keeps any one file small without giving up the
 * Strada method surface.
 *
 * The Checker class in index.ts holds a CheckerState and exposes
 * methods that delegate to the per-family modules.
 */

import type {
  SourceFile,
  Diagnostic,
} from "../../ast/index.js";

export interface CheckerState {
  fileDiagnostics: Map<SourceFile, Diagnostic[]>;
  globalDiagnostics: Diagnostic[];
}

export function newCheckerState(): CheckerState {
  return {
    fileDiagnostics: new Map(),
    globalDiagnostics: [],
  };
}
