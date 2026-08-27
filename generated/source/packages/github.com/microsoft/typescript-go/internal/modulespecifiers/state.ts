import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { regexPatternCacheKey } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/util.js";
import type * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
export class $PackageState {
    declare regexPatternCache: GoMapValue<regexPatternCacheKey, tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined>;
    declare regexPatternCacheMu: sync__from_gostdlib.RWMutex;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
