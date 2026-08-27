import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../collections/package.js";
import type * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import type { int32 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare extraEscapeReplacer: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer> | undefined;
    declare styleCheckDiagnostics: tsonicTypeScriptRuntime.Location<Set__from_collections<int32>> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
