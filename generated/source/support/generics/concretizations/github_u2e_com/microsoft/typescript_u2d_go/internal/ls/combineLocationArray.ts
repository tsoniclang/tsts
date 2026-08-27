import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { LocationLink as LocationLink__from_lsproto, Location$Storage as Location__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { combineLocationArray$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
import { Location as Location__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $go$constraint_method$lsproto$GetLocation$Named_lsproto$Location_to_Named_lsproto$Location, $go$constraint_method$lsproto$GetLocation$PointerTo_Named_lsproto$LocationLink_to_Named_lsproto$Location } from "../../../../../../capabilities/constraint_method.js";
export function combineLocationArray$Named_lsproto$Location($argument0: RuntimeSlice<Location__from_lsproto$Storage>, $argument1: tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Set__from_collections<Location__from_lsproto>> | undefined): RuntimeSlice<Location__from_lsproto$Storage> {
    return combineLocationArray$kernel<Location__from_lsproto>($go$constraint_method$lsproto$GetLocation$Named_lsproto$Location_to_Named_lsproto$Location, ($argument0: Location__from_lsproto): Location__from_lsproto => {
        return Location__from_lsproto.$copy($argument0);
    }, ($argument0: Location__from_lsproto$Storage): Location__from_lsproto => {
        return Location__from_lsproto.$fromStorage($argument0);
    }, ($argument0: Location__from_lsproto): Location__from_lsproto$Storage => {
        return Location__from_lsproto.$storageOf($argument0);
    }, (): Location__from_lsproto => {
        return Location__from_lsproto.$zero();
    }, $argument0, $argument1, $argument2);
}
export function combineLocationArray$PointerTo_Named_lsproto$LocationLink($argument0: RuntimeSlice<{
    value: LocationLink__from_lsproto;
} | undefined>, $argument1: tsonicTypeScriptRuntime.Location<RuntimeSlice<{
    value: LocationLink__from_lsproto;
} | undefined>> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Set__from_collections<Location__from_lsproto>> | undefined): RuntimeSlice<{
    value: LocationLink__from_lsproto;
} | undefined> {
    return combineLocationArray$kernel<{
        value: LocationLink__from_lsproto;
    } | undefined>($go$constraint_method$lsproto$GetLocation$PointerTo_Named_lsproto$LocationLink_to_Named_lsproto$Location, ($argument0: {
        value: LocationLink__from_lsproto;
    } | undefined): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: LocationLink__from_lsproto;
    } | undefined): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: LocationLink__from_lsproto;
    } | undefined): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return $argument0;
    }, (): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
