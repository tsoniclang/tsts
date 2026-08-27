import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Arena as Arena__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
export function Arena$Clone$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Arena__from_core.Clone$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument1);
}
export function Arena$Clone$string($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<gostring>> | undefined, $argument1: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    return Arena__from_core.Clone$kernel<gostring>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument1);
}
