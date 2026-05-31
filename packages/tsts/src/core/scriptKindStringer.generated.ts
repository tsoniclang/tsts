/**
 * Stringer helpers for ScriptKind.
 *
 * Port of TS-Go `internal/core/scriptkind_stringer_generated.go`.
 */

import { ScriptKind, type ScriptKind as ScriptKindValue, scriptKindToString } from "./core.js";

export function scriptKindString(kind: ScriptKindValue): string {
  return scriptKindToString(kind);
}

export function isKnownScriptKind(kind: ScriptKindValue): boolean {
  return kind === ScriptKind.Unknown
    || kind === ScriptKind.JS
    || kind === ScriptKind.JSX
    || kind === ScriptKind.TS
    || kind === ScriptKind.TSX
    || kind === ScriptKind.External
    || kind === ScriptKind.JSON
    || kind === ScriptKind.Deferred;
}
