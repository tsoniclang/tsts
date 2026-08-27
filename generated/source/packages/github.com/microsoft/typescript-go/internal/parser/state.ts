import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../ast/package.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare missingListNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    declare parserPool: sync__from_gostdlib.Pool;
    declare viableKeywordSuggestions: RuntimeSlice<gostring>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
