import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Expected as Expected__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/expected.js";
import { $goInterfaceAdapter$PointerTo_MapOf_string_To_string, $goInterfaceAdapter$PointerTo_string as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoMap } from "@gotots/runtime/map.js";
export function Expected$UnmarshalJSON$MapOf_string_To_string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<GoMapValue<gostring, gostring>>> | undefined, $argument1: RuntimeSlice<uint8>): GoInterface | undefined {
    return Expected__from_packagejson.UnmarshalJSON$kernel<GoMapValue<gostring, gostring>>($argument0, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<GoMapValue<gostring, gostring>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_MapOf_string_To_string($argument0);
    }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, (): GoMapValue<gostring, gostring> => {
        return GoMap.nil<gostring, gostring>("");
    }, $argument1);
}
export function Expected$UnmarshalJSON$string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>> | undefined, $argument1: RuntimeSlice<uint8>): GoInterface | undefined {
    return Expected__from_packagejson.UnmarshalJSON$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument1);
}
