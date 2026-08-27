import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { measureSortedness$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/organizeimports.js";
export function measureSortedness$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): int {
    return measureSortedness$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function measureSortedness$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring, $1: gostring) => int) | undefined): int {
    return measureSortedness$kernel<gostring>(($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
