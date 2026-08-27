import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { TypeMapper as TypeMapper__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FindLastIndex$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function FindLastIndex$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): int {
    return FindLastIndex$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function FindLastIndex$PointerTo_Named_checker$TypeMapper($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined) => bool) | undefined): int {
    return FindLastIndex$kernel<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
