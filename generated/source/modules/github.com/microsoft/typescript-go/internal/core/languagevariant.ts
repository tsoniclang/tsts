import type { gostring, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { _LanguageVariant_name$string } from "./languagevariant_stringer_generated.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type LanguageVariant = int32;
export function LanguageVariantStandard$constant(): LanguageVariant {
    return 0;
}
export function LanguageVariantJSX$constant(): LanguageVariant {
    return 1;
}
export function LanguageVariant_String(i: LanguageVariant): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 2) {
        return "LanguageVariant(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_LanguageVariant_name$string, $state._LanguageVariant_index.get(idx), $state._LanguageVariant_index.get(idx + 1));
}
