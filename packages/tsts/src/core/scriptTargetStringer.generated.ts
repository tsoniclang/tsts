/**
 * Stringer helpers for ScriptTarget.
 *
 * Port of TS-Go `internal/core/scripttarget_stringer_generated.go`.
 */

import { ScriptTarget, type ScriptTarget as ScriptTargetValue, scriptTargetToString } from "./compilerOptions.js";

export function scriptTargetString(target: ScriptTargetValue): string {
  return scriptTargetToString(target);
}

export function isKnownScriptTarget(target: ScriptTargetValue): boolean {
  return target === ScriptTarget.None
    || target === ScriptTarget.ES5
    || target === ScriptTarget.ES2015
    || target === ScriptTarget.ES2016
    || target === ScriptTarget.ES2017
    || target === ScriptTarget.ES2018
    || target === ScriptTarget.ES2019
    || target === ScriptTarget.ES2020
    || target === ScriptTarget.ES2021
    || target === ScriptTarget.ES2022
    || target === ScriptTarget.ES2023
    || target === ScriptTarget.ES2024
    || target === ScriptTarget.ES2025
    || target === ScriptTarget.ESNext
    || target === ScriptTarget.JSON;
}
