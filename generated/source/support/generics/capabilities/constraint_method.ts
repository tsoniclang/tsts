import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Message as Message__from_diagnostics } from "../../../modules/github.com/microsoft/typescript-go/internal/diagnostics/diagnostics.js";
import type { Export as Export__from_autoimport } from "../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { incomingEntry as incomingEntry__from_ls } from "../../../modules/github.com/microsoft/typescript-go/internal/ls/callhierarchy.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { CallHierarchyPrepareParams as CallHierarchyPrepareParams__from_lsproto, CodeActionParams as CodeActionParams__from_lsproto, CodeLensParams as CodeLensParams__from_lsproto, CompletionParams as CompletionParams__from_lsproto, DefinitionParams as DefinitionParams__from_lsproto, DocumentDiagnosticParams as DocumentDiagnosticParams__from_lsproto, DocumentFormattingParams as DocumentFormattingParams__from_lsproto, DocumentHighlightParams as DocumentHighlightParams__from_lsproto, DocumentOnTypeFormattingParams as DocumentOnTypeFormattingParams__from_lsproto, DocumentRangeFormattingParams as DocumentRangeFormattingParams__from_lsproto, DocumentSymbolParams as DocumentSymbolParams__from_lsproto, FoldingRangeParams as FoldingRangeParams__from_lsproto, HoverParams as HoverParams__from_lsproto, ImplementationParams as ImplementationParams__from_lsproto, InlayHintParams as InlayHintParams__from_lsproto, LinkedEditingRangeParams as LinkedEditingRangeParams__from_lsproto, LocationLink as LocationLink__from_lsproto, Location$Storage as Location__from_lsproto$Storage, MultiDocumentHighlightParams as MultiDocumentHighlightParams__from_lsproto, Position as Position__from_lsproto, PrepareRenameParams as PrepareRenameParams__from_lsproto, ReferenceParams as ReferenceParams__from_lsproto, RenameParams as RenameParams__from_lsproto, SelectionRangeParams as SelectionRangeParams__from_lsproto, SemanticTokensParams as SemanticTokensParams__from_lsproto, SemanticTokensRangeParams as SemanticTokensRangeParams__from_lsproto, SignatureHelpParams as SignatureHelpParams__from_lsproto, TextDocumentPositionParams as TextDocumentPositionParams__from_lsproto, TypeDefinitionParams as TypeDefinitionParams__from_lsproto, VSOnAutoInsertParams as VSOnAutoInsertParams__from_lsproto } from "../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { configFileEntry as configFileEntry__from_project, configFileNames as configFileNames__from_project } from "../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { diskFile as diskFile__from_project } from "../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { buildOptionsParser as buildOptionsParser__from_tsoptions, compilerOptionsParser as compilerOptionsParser__from_tsoptions, typeAcquisitionParser as typeAcquisitionParser__from_tsoptions, watchOptionsParser as watchOptionsParser__from_tsoptions } from "../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsinghelpers.js";
import type { Path as Path__from_tspath } from "../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_Method_autoimport$Name_void_to_string, $goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet, $goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location, $goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location, $goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position, $goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri, $goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message, $goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message, $goInterface$Interface_void, $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project as GoInterface } from "../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, Location as Location__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto } from "../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $goInterfaceAdapter$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goInterfaceAdapter$Named_lsproto$Location, $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, $goInterfaceAdapter$Named_lsproto$LocationsOrNull, $goInterfaceAdapter$PointerTo_Named_autoimport$Export, $goInterfaceAdapter$PointerTo_Named_autoimport$RegistryBucket, $goInterfaceAdapter$PointerTo_Named_autoimport$directory, $goInterfaceAdapter$PointerTo_Named_ls$incomingEntry, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams, $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LocationLink, $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams, $goInterfaceAdapter$PointerTo_Named_project$configFileEntry, $goInterfaceAdapter$PointerTo_Named_project$configFileNames, $goInterfaceAdapter$PointerTo_Named_project$diskFile, $goInterfaceAdapter$PointerTo_Named_project$realpathAliasSet, $goInterfaceAdapter$PointerTo_Named_tsoptions$buildOptionsParser, $goInterfaceAdapter$PointerTo_Named_tsoptions$compilerOptionsParser, $goInterfaceAdapter$PointerTo_Named_tsoptions$typeAcquisitionParser, $goInterfaceAdapter$PointerTo_Named_tsoptions$watchOptionsParser, $goInterfaceAdapter$PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../interface-adapters.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
export function $go$constraint_method$autoimport$Name$PointerTo_Named_autoimport$Export_to_string($argument0: {
    value: Export__from_autoimport;
} | undefined): gostring {
    const __gotots_receiver_1 = new $goInterfaceAdapter$PointerTo_Named_autoimport$Export($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_autoimport$Name_void_to_string>(__gotots_receiver_1).Name();
}
export function $go$constraint_method$dirty$Clone$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> {
    const __gotots_receiver_3 = new $goInterfaceAdapter$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string>(__gotots_receiver_3).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$RegistryBucket_to_PointerTo_Named_autoimport$RegistryBucket($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined {
    const __gotots_receiver_2 = new $goInterfaceAdapter$PointerTo_Named_autoimport$RegistryBucket($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket>(__gotots_receiver_2).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$directory_to_PointerTo_Named_autoimport$directory($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined {
    const __gotots_receiver_16 = new $goInterfaceAdapter$PointerTo_Named_autoimport$directory($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory>(__gotots_receiver_16).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_project$Project_to_PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined {
    const __gotots_receiver_0 = new GoInterfaceAdapter($argument0);
    return goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileEntry_to_PointerTo_Named_project$configFileEntry($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined {
    const __gotots_receiver_13 = new $goInterfaceAdapter$PointerTo_Named_project$configFileEntry($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry>(__gotots_receiver_13).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileNames_to_PointerTo_Named_project$configFileNames($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined {
    const __gotots_receiver_8 = new $goInterfaceAdapter$PointerTo_Named_project$configFileNames($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames>(__gotots_receiver_8).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_project$diskFile_to_PointerTo_Named_project$diskFile($argument0: tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined {
    const __gotots_receiver_15 = new $goInterfaceAdapter$PointerTo_Named_project$diskFile($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile>(__gotots_receiver_15).Clone();
}
export function $go$constraint_method$dirty$Clone$PointerTo_Named_project$realpathAliasSet_to_PointerTo_Named_project$realpathAliasSet($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined {
    const __gotots_receiver_12 = new $goInterfaceAdapter$PointerTo_Named_project$realpathAliasSet($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet>(__gotots_receiver_12).Clone();
}
export function $go$constraint_method$lsproto$GetLocation$Named_lsproto$Location_to_Named_lsproto$Location($argument0: Location__from_lsproto): Location__from_lsproto {
    const __gotots_receiver_18 = new $goInterfaceAdapter$Named_lsproto$Location(Location__from_lsproto.$copy($argument0));
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location>(__gotots_receiver_18).GetLocation();
}
export function $go$constraint_method$lsproto$GetLocation$PointerTo_Named_lsproto$LocationLink_to_Named_lsproto$Location($argument0: {
    value: LocationLink__from_lsproto;
} | undefined): Location__from_lsproto {
    const __gotots_receiver_19 = new $goInterfaceAdapter$PointerTo_Named_lsproto$LocationLink($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location>(__gotots_receiver_19).GetLocation();
}
export function $go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull_to_PointerTo_SliceOf_Named_lsproto$Location($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined {
    const __gotots_receiver_17 = new $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0));
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location>(__gotots_receiver_17).GetLocations();
}
export function $go$constraint_method$lsproto$GetLocations$Named_lsproto$LocationsOrNull_to_PointerTo_SliceOf_Named_lsproto$Location($argument0: LocationsOrNull__from_lsproto): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined {
    const __gotots_receiver_49 = new $goInterfaceAdapter$Named_lsproto$LocationsOrNull(LocationsOrNull__from_lsproto.$copy($argument0));
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location>(__gotots_receiver_49).GetLocations();
}
export function $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$Position($argument0: incomingEntry__from_ls | undefined): Position__from_lsproto {
    const __gotots_receiver_46 = new $goInterfaceAdapter$PointerTo_Named_ls$incomingEntry($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position>(__gotots_receiver_46).TextDocumentPosition();
}
export function $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$Position($argument0: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined): Position__from_lsproto {
    const __gotots_receiver_29 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position>(__gotots_receiver_29).TextDocumentPosition();
}
export function $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$Position($argument0: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined): Position__from_lsproto {
    const __gotots_receiver_24 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position>(__gotots_receiver_24).TextDocumentPosition();
}
export function $go$constraint_method$lsproto$TextDocumentPosition$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$Position($argument0: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined): Position__from_lsproto {
    const __gotots_receiver_21 = new $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position>(__gotots_receiver_21).TextDocumentPosition();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_ls$incomingEntry_to_Named_lsproto$DocumentUri($argument0: incomingEntry__from_ls | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_45 = new $goInterfaceAdapter$PointerTo_Named_ls$incomingEntry($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_45).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CallHierarchyPrepareParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_52 = new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_52).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeActionParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_33 = new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_33).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeLensParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_41 = new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_41).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CompletionParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_40 = new $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_40).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DefinitionParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_31 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_31).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentDiagnosticParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_48 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_48).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentFormattingParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_28 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentFormattingParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_28).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentHighlightParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_34 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_34).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_51 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_51).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentRangeFormattingParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_36 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_36).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentSymbolParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_50 = new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_50).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$FoldingRangeParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_38 = new $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_38).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$HoverParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_44 = new $goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_44).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ImplementationParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_30 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_30).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$InlayHintParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_43 = new $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_43).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$LinkedEditingRangeParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_23 = new $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_23).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$MultiDocumentHighlightParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_27 = new $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_27).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$PrepareRenameParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_32 = new $goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_32).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$ReferenceParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_25 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_25).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$RenameParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_22 = new $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_22).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SelectionRangeParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_47 = new $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_47).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_37 = new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_37).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensRangeParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_42 = new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_42).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SignatureHelpParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_35 = new $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_35).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TextDocumentPositionParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_20 = new $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_20).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TypeDefinitionParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_26 = new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_26).TextDocumentURI();
}
export function $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$VSOnAutoInsertParams_to_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined): DocumentUri__from_lsproto {
    const __gotots_receiver_39 = new $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri>(__gotots_receiver_39).TextDocumentURI();
}
export function $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$buildOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic($argument0: buildOptionsParser__from_tsoptions | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    const __gotots_receiver_7 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$buildOptionsParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic>(__gotots_receiver_7).ParseOption($argument1, $argument2);
}
export function $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$compilerOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic($argument0: compilerOptionsParser__from_tsoptions | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    const __gotots_receiver_6 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$compilerOptionsParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic>(__gotots_receiver_6).ParseOption($argument1, $argument2);
}
export function $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$typeAcquisitionParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic($argument0: typeAcquisitionParser__from_tsoptions | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    const __gotots_receiver_11 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$typeAcquisitionParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic>(__gotots_receiver_11).ParseOption($argument1, $argument2);
}
export function $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$watchOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic($argument0: watchOptionsParser__from_tsoptions | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    const __gotots_receiver_14 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$watchOptionsParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic>(__gotots_receiver_14).ParseOption($argument1, $argument2);
}
export function $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message($argument0: compilerOptionsParser__from_tsoptions | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    const __gotots_receiver_5 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$compilerOptionsParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message>(__gotots_receiver_5).UnknownDidYouMeanDiagnostic();
}
export function $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message($argument0: typeAcquisitionParser__from_tsoptions | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    const __gotots_receiver_10 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$typeAcquisitionParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message>(__gotots_receiver_10).UnknownDidYouMeanDiagnostic();
}
export function $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message($argument0: compilerOptionsParser__from_tsoptions | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    const __gotots_receiver_4 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$compilerOptionsParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message>(__gotots_receiver_4).UnknownOptionDiagnostic();
}
export function $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message($argument0: typeAcquisitionParser__from_tsoptions | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    const __gotots_receiver_9 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$typeAcquisitionParser($argument0);
    return goInterfaceNonNil<$goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message>(__gotots_receiver_9).UnknownOptionDiagnostic();
}
