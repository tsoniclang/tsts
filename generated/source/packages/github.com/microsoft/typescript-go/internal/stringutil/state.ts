import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { specialCasingMapping } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/stringutil/js_case_generated.js";
import type * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import type * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int32 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare matchSlashSomething: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare specialCasingMappings: GoMapValue<int32, specialCasingMapping>;
    declare unicodeCaseIgnorableRanges: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined;
    declare unicodeCasedRanges: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined;
    declare unicodeESNextIdentifierPart: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined;
    declare unicodeESNextIdentifierStart: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
