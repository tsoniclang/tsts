import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { incomingEntry as incomingEntry__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/callhierarchy.js";
import type { CrossProjectOrchestrator as CrossProjectOrchestrator__from_ls, response as response__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
import type { SymbolAndEntriesData as SymbolAndEntriesData__from_ls, symbolEntryTransformOptions as symbolEntryTransformOptions__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { LanguageService as LanguageService__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/languageservice.js";
import type { CallHierarchyIncomingCallsOrNull$Storage as CallHierarchyIncomingCallsOrNull__from_lsproto$Storage, ImplementationParams as ImplementationParams__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull$Storage as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, LocationsOrNull$Storage as LocationsOrNull__from_lsproto$Storage, ReferenceParams as ReferenceParams__from_lsproto, RenameParams as RenameParams__from_lsproto, VSReferenceItemsOrNull$Storage as VSReferenceItemsOrNull__from_lsproto$Storage, WorkspaceEditOrNull$Storage as WorkspaceEditOrNull__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { handleCrossProject$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
import { CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto, VSReferenceItemsOrNull as VSReferenceItemsOrNull__from_lsproto, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$CallHierarchyIncomingCallsOrNull, $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationsOrNull, $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$VSReferenceItemsOrNull, $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$WorkspaceEditOrNull as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$DocumentUri } from "../../../../../../capabilities/constraint_method.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function handleCrossProject$PointerTo_Named_ls$incomingEntry$Named_lsproto$CallHierarchyIncomingCallsOrNull($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: incomingEntry__from_ls | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined, $argument4: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: incomingEntry__from_ls | undefined, $3: SymbolAndEntriesData__from_ls, $4: symbolEntryTransformOptions__from_ls) => [
    CallHierarchyIncomingCallsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, $argument5: (($0: iter.Seq<CallHierarchyIncomingCallsOrNull__from_lsproto>) => CallHierarchyIncomingCallsOrNull__from_lsproto) | undefined, $argument6: bool, $argument7: bool, $argument8: symbolEntryTransformOptions__from_ls): [
    CallHierarchyIncomingCallsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return handleCrossProject$kernel<incomingEntry__from_ls | undefined, CallHierarchyIncomingCallsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined => {
        return $argument0;
    }, ($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto$Storage): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$CallHierarchyIncomingCallsOrNull($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$CallHierarchyIncomingCallsOrNull.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): CallHierarchyIncomingCallsOrNull__from_lsproto$Storage => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$storageOf($argument0);
    }, (): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$zero();
    }, (): tsonicTypeScriptRuntime.Location<response__from_ls<CallHierarchyIncomingCallsOrNull__from_lsproto>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5, $argument6, $argument7, $argument8);
}
export function handleCrossProject$PointerTo_Named_lsproto$ImplementationParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined, $argument4: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, $3: SymbolAndEntriesData__from_ls, $4: symbolEntryTransformOptions__from_ls) => [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, $argument5: (($0: iter.Seq<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>) => LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto) | undefined, $argument6: bool, $argument7: bool, $argument8: symbolEntryTransformOptions__from_ls): [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return handleCrossProject$kernel<tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined => {
        return $argument0;
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$storageOf($argument0);
    }, (): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$zero();
    }, (): tsonicTypeScriptRuntime.Location<response__from_ls<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5, $argument6, $argument7, $argument8);
}
export function handleCrossProject$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$LocationsOrNull($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined, $argument4: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $3: SymbolAndEntriesData__from_ls, $4: symbolEntryTransformOptions__from_ls) => [
    LocationsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, $argument5: (($0: iter.Seq<LocationsOrNull__from_lsproto>) => LocationsOrNull__from_lsproto) | undefined, $argument6: bool, $argument7: bool, $argument8: symbolEntryTransformOptions__from_ls): [
    LocationsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return handleCrossProject$kernel<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, LocationsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined => {
        return $argument0;
    }, ($argument0: LocationsOrNull__from_lsproto): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationsOrNull__from_lsproto$Storage): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationsOrNull($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$LocationsOrNull.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: LocationsOrNull__from_lsproto): LocationsOrNull__from_lsproto$Storage => {
        return LocationsOrNull__from_lsproto.$storageOf($argument0);
    }, (): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$zero();
    }, (): tsonicTypeScriptRuntime.Location<response__from_ls<LocationsOrNull__from_lsproto>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5, $argument6, $argument7, $argument8);
}
export function handleCrossProject$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$VSReferenceItemsOrNull($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined, $argument4: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $3: SymbolAndEntriesData__from_ls, $4: symbolEntryTransformOptions__from_ls) => [
    VSReferenceItemsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, $argument5: (($0: iter.Seq<VSReferenceItemsOrNull__from_lsproto>) => VSReferenceItemsOrNull__from_lsproto) | undefined, $argument6: bool, $argument7: bool, $argument8: symbolEntryTransformOptions__from_ls): [
    VSReferenceItemsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return handleCrossProject$kernel<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, VSReferenceItemsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined => {
        return $argument0;
    }, ($argument0: VSReferenceItemsOrNull__from_lsproto): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: VSReferenceItemsOrNull__from_lsproto$Storage): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$VSReferenceItemsOrNull($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ls$responseOf_Named_lsproto$VSReferenceItemsOrNull.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: VSReferenceItemsOrNull__from_lsproto): VSReferenceItemsOrNull__from_lsproto$Storage => {
        return VSReferenceItemsOrNull__from_lsproto.$storageOf($argument0);
    }, (): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$zero();
    }, (): tsonicTypeScriptRuntime.Location<response__from_ls<VSReferenceItemsOrNull__from_lsproto>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5, $argument6, $argument7, $argument8);
}
export function handleCrossProject$PointerTo_Named_lsproto$RenameParams$Named_lsproto$WorkspaceEditOrNull($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined, $argument4: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, $3: SymbolAndEntriesData__from_ls, $4: symbolEntryTransformOptions__from_ls) => [
    WorkspaceEditOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, $argument5: (($0: iter.Seq<WorkspaceEditOrNull__from_lsproto>) => WorkspaceEditOrNull__from_lsproto) | undefined, $argument6: bool, $argument7: bool, $argument8: symbolEntryTransformOptions__from_ls): [
    WorkspaceEditOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return handleCrossProject$kernel<tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$Position, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined => {
        return $argument0;
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: WorkspaceEditOrNull__from_lsproto$Storage): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): WorkspaceEditOrNull__from_lsproto$Storage => {
        return WorkspaceEditOrNull__from_lsproto.$storageOf($argument0);
    }, (): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$zero();
    }, (): tsonicTypeScriptRuntime.Location<response__from_ls<WorkspaceEditOrNull__from_lsproto>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5, $argument6, $argument7, $argument8);
}
