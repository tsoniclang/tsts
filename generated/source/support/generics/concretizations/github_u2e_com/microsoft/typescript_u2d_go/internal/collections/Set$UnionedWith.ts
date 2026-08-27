import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function Set$UnionedWith$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    return Set__from_collections.UnionedWith$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): GoMapValue<gostring, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoEmptyStruct>): int => {
        return $argument0.length();
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: GoEmptyStruct, $argument1: int): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make($argument1, []);
    }, (): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    }, $argument1);
}
