import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { bool, int, uint32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { BinarySearchUniqueFunc$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/binarysearch.js";
export function BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: int, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): [
    int,
    bool
] {
    return BinarySearchUniqueFunc$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function BinarySearchUniqueFunc$SliceOf_uint32$uint32($argument0: RuntimeSlice<uint32>, $argument1: (($0: int, $1: uint32) => int) | undefined): [
    int,
    bool
] {
    return BinarySearchUniqueFunc$kernel<RuntimeSlice<uint32>, uint32>(($argument0: RuntimeSlice<uint32>, $argument1: int): uint32 => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<uint32>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
