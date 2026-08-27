import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CrossProjectOrchestrator as CrossProjectOrchestrator__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
import type { LanguageService as LanguageService__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/languageservice.js";
import type { RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { ImplementationParams as ImplementationParams__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull$Storage as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, LocationsOrNull$Storage as LocationsOrNull__from_lsproto$Storage, ReferenceParams as ReferenceParams__from_lsproto, VSReferenceItemsOrNull$Storage as VSReferenceItemsOrNull__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { handlerMap as handlerMap__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto, VSReferenceItemsOrNull as VSReferenceItemsOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { registerMultiProjectReferenceRequestHandler$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$LocationsOrNull, $goInterfaceAdapter$Named_lsproto$VSReferenceItemsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams, $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri } from "../../../../../../capabilities/constraint_method.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ImplementationParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>, $argument2: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, $3: CrossProjectOrchestrator__from_ls | undefined) => [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerMultiProjectReferenceRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$DocumentUri, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter(LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$LocationsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, LocationsOrNull__from_lsproto>, $argument2: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $3: CrossProjectOrchestrator__from_ls | undefined) => [
    LocationsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerMultiProjectReferenceRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, LocationsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri, ($argument0: LocationsOrNull__from_lsproto): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$LocationsOrNull(LocationsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$VSReferenceItemsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, VSReferenceItemsOrNull__from_lsproto>, $argument2: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $3: CrossProjectOrchestrator__from_ls | undefined) => [
    VSReferenceItemsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerMultiProjectReferenceRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, VSReferenceItemsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri, ($argument0: VSReferenceItemsOrNull__from_lsproto): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: VSReferenceItemsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$VSReferenceItemsOrNull(VSReferenceItemsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
