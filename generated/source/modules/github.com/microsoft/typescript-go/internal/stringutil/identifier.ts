import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/state.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
export function IsUnicodeIdentifierStart(ch: int32): bool {
    const __gotots_conversion_0 = $state.unicodeESNextIdentifierStart;
    return unicode__from_gostdlib.Is(__gotots_conversion_0 === undefined ? undefined :
        (__gotots_conversion_0 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, ch);
}
export function IsUnicodeIdentifierPart(ch: int32): bool {
    const __gotots_conversion_1 = $state.unicodeESNextIdentifierPart;
    return unicode__from_gostdlib.Is(__gotots_conversion_1 === undefined ? undefined :
        (__gotots_conversion_1 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, ch);
}
