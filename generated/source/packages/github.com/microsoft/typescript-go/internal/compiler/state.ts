import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../collections/package.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { int32 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare parseTaskDataPool: sync__from_gostdlib.Pool;
    declare plainJSErrors: tsonicTypeScriptRuntime.Location<Set__from_collections<int32>> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
