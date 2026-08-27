import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { MapEntry$Storage as MapEntry__from_collections$Storage, OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { NewOrderedMapFromList$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../maps.js";
export function NewOrderedMapFromList$string$Interface_void($argument0: RuntimeSlice<MapEntry__from_collections$Storage<gostring, GoInterface | undefined>>): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    return NewOrderedMapFromList$kernel<gostring, GoInterface | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<MapEntry__from_collections$Storage<gostring, GoInterface | undefined>>): int => {
        return $argument0.length;
    }, ($argument0: GoInterface | undefined): GoMapValue<gostring, GoInterface | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: GoInterface | undefined, $argument1: int): GoMapValue<gostring, GoInterface | undefined> => {
        return GoMap.make($argument1, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
