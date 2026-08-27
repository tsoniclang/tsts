import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../maps.js";
export function OrderedMap$Clone$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    return OrderedMap__from_collections.Clone$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoMapValue<gostring, GoInterface | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    });
}
