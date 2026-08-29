import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Checker as Checker__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { Signature as Signature__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { runWithoutResolvedSignatureCaching$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/services.js";
export function runWithoutResolvedSignatureCaching$SliceOf_PointerTo_Named_checker$Signature($argument0: {
    value: Checker__from_checker;
} | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: (() => RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return runWithoutResolvedSignatureCaching$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
