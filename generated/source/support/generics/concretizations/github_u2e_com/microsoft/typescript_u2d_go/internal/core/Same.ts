import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Same$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { goSliceAddress } from "@gotots/runtime/slice.js";
export function Same$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool {
    return Same$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined => {
        return goSliceAddress<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function Same$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): bool {
    return Same$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> | undefined => {
        return goSliceAddress<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function Same$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): bool {
    return Same$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> | undefined => {
        return goSliceAddress<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>($argument0, $argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function Same$SliceOf_string($argument0: RuntimeSlice<RuntimeSlice<gostring>>, $argument1: RuntimeSlice<RuntimeSlice<gostring>>): bool {
    return Same$kernel<RuntimeSlice<gostring>>(($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: RuntimeSlice<RuntimeSlice<gostring>>, $argument1: int): tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined => {
        return goSliceAddress<RuntimeSlice<gostring>>($argument0, $argument1);
    }, ($argument0: RuntimeSlice<RuntimeSlice<gostring>>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
export function Same$string($argument0: RuntimeSlice<gostring>, $argument1: RuntimeSlice<gostring>): bool {
    return Same$kernel<gostring>(($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined, $argument1: tsonicTypeScriptRuntime.Location<gostring> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return goSliceAddress<gostring>($argument0, $argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, $argument0, $argument1);
}
