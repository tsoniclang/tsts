import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { handlerMap } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { FileOperationFilter as FileOperationFilter__from_lsproto } from "./lsproto/package.js";
import type * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare fileRenameFilters: RuntimeSlice<{
        value: FileOperationFilter__from_lsproto;
    } | undefined>;
    declare genericSecretKeywordRegex: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare handlers: (() => handlerMap) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
