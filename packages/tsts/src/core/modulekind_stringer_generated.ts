/**
 * Stringer helpers for ModuleKind.
 *
 * Port of TS-Go `internal/core/modulekind_stringer_generated.go`.
 */

import { ModuleKind, type ModuleKind as ModuleKindValue, moduleKindToString } from "./compileroptions.js";

export function moduleKindString(kind: ModuleKindValue): string {
  return moduleKindToString(kind);
}

export function isKnownModuleKind(kind: ModuleKindValue): boolean {
  return kind === ModuleKind.None
    || kind === ModuleKind.CommonJS
    || kind === ModuleKind.AMD
    || kind === ModuleKind.UMD
    || kind === ModuleKind.System
    || kind === ModuleKind.ES2015
    || kind === ModuleKind.ES2020
    || kind === ModuleKind.ES2022
    || kind === ModuleKind.ESNext
    || kind === ModuleKind.Node16
    || kind === ModuleKind.Node18
    || kind === ModuleKind.Node20
    || kind === ModuleKind.NodeNext
    || kind === ModuleKind.Preserve;
}
