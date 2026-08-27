import type { gostring, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { _ScriptKind_name$string } from "./scriptkind_stringer_generated.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type ScriptKind = int32;
export function ScriptKindUnknown$constant(): ScriptKind {
    return 0;
}
export function ScriptKindJS$constant(): ScriptKind {
    return 1;
}
export function ScriptKindJSX$constant(): ScriptKind {
    return 2;
}
export function ScriptKindTS$constant(): ScriptKind {
    return 3;
}
export function ScriptKindTSX$constant(): ScriptKind {
    return 4;
}
export function ScriptKindExternal$constant(): ScriptKind {
    return 5;
}
export function ScriptKindJSON$constant(): ScriptKind {
    return 6;
}
export function ScriptKindDeferred$constant(): ScriptKind {
    return 7;
}
export function ScriptKind_String(i: ScriptKind): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 8) {
        return "ScriptKind(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_ScriptKind_name$string, $state._ScriptKind_index.get(idx), $state._ScriptKind_index.get(idx + 1));
}
