import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Location$Storage as Location__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { combineResponseLocations$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
import { LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull_to_PointerTo_SliceOf_Named_lsproto$Location, $go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationsOrNull_to_PointerTo_SliceOf_Named_lsproto$Location } from "../../../../../../capabilities/constraint_method.js";
export function combineResponseLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: iter.Seq<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined {
    return combineResponseLocations$kernel<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull_to_PointerTo_SliceOf_Named_lsproto$Location, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, $argument0);
}
export function combineResponseLocations$Named_lsproto$LocationsOrNull($argument0: iter.Seq<LocationsOrNull__from_lsproto>): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined {
    return combineResponseLocations$kernel<LocationsOrNull__from_lsproto>($go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationsOrNull_to_PointerTo_SliceOf_Named_lsproto$Location, ($argument0: LocationsOrNull__from_lsproto): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$copy($argument0);
    }, $argument0);
}
