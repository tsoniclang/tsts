import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { MultiMap as MultiMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GroupBy$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
import { $goMap$MapOf_bool_To_SliceOf_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../maps.js";
export function GroupBy$bool$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): MultiMap__from_collections<bool, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined {
    return GroupBy$kernel<bool, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<bool, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return GoMap.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, (): GoMapValue<bool, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return GoMap.nil();
    }, $argument0, $argument1);
}
