import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CallHierarchyIncomingCall as CallHierarchyIncomingCall__from_lsproto, CallHierarchyItem as CallHierarchyItem__from_lsproto, HasTextDocumentPosition as HasTextDocumentPosition__from_lsproto, LocationLink as LocationLink__from_lsproto, Location as Location__from_lsproto, Location$Storage as Location__from_lsproto$Storage, RenameFile as RenameFile__from_lsproto, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile$Storage as TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage, TextEdit as TextEdit__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { SymbolAndEntries, nonLocalDefinition } from "./findallreferences.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewWorkGroup as NewWorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, DocumentUri as DocumentUri__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto, Position as Position__from_lsproto, Range as Range__from_lsproto, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile as TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto, VSReferenceItem as VSReferenceItem__from_lsproto, VSReferenceItemsOrNull as VSReferenceItemsOrNull__from_lsproto, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto, WorkspaceEdit as WorkspaceEdit__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_lsproto$Range, Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Array2Of_Named_lsproto$DocumentUri, Set$AddIfAbsent$Named_lsproto$Location } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$AddIfAbsent$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$AddIfAbsent.js";
import { combineLocationArray$Named_lsproto$Location, combineLocationArray$PointerTo_Named_lsproto$LocationLink } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/combineLocationArray.js";
import { combineResponseLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, combineResponseLocations$Named_lsproto$LocationsOrNull } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/combineResponseLocations.js";
import { $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetAllProjectsForInitialRequest$void_to_SliceOf_Named_ls$Project, $goInterfaceMethod$GetDefaultProject$void_to_Named_ls$Project, $goInterfaceMethod$GetLanguageServiceForProjectWithFile$Named_context$Context_Named_ls$Project_Named_lsproto$DocumentUri_to_PointerTo_Named_ls$LanguageService, $goInterfaceMethod$GetProgram$void_to_PointerTo_Named_compiler$Program, $goInterfaceMethod$GetProjectsForFile$Named_context$Context_Named_lsproto$DocumentUri_to_SliceOf_Named_ls$Project_Named_error, $goInterfaceMethod$GetProjectsLoadingProjectTree$Named_context$Context_PointerTo_Named_collections$SetOf_Named_tspath$Path_to_Named_iter$SeqOf_Named_ls$Project, $goInterfaceMethod$HasFile$string_to_bool, $goInterfaceMethod$Id$void_to_Named_tspath$Path } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Array2Of_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_collections$SetOf_Named_lsproto$Range, $goMap$MapOf_Named_lsproto$DocumentUri_To_SliceOf_PointerTo_Named_lsproto$TextEdit, $goMap$MapOf_Named_lsproto$Location_To_Struct_void, $goMap$MapOf_Named_lsproto$Range_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { SymbolAndEntriesData, position, symbolEntryTransformOptions } from "./findallreferences.js";
import { LanguageService } from "./languageservice.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as debug__from_gostdlib from "@gotots/gostdlib/runtime/debug.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export interface Project extends GoInterfaceValue {
    GetProgram(): {
        value: Program__from_compiler;
    } | undefined;
    HasFile($argument0: gostring): bool;
    Id(): Path__from_tspath;
}
export const Project$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetProgram$void_to_PointerTo_Named_compiler$Program, $goInterfaceMethod$HasFile$string_to_bool, $goInterfaceMethod$Id$void_to_Named_tspath$Path]);
export function Project$is(value: GoInterfaceValue | undefined): value is Project {
    return value !== undefined && value.$go$implements(Project$contract);
}
export class projectAndTextDocumentPosition {
    declare private readonly $goType: void;
    public constructor(public project: Project | undefined, public ls: LanguageService | undefined, public Uri: DocumentUri__from_lsproto, public Position: Position__from_lsproto, public forOriginalLocation: bool) {
    }
    declare private readonly then?: never;
}
export type response$Storage<Resp> = {
    complete: bool;
    result: GoStorage<Resp>;
    forOriginalLocation: bool;
};
export class response<Resp> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: response$Storage<Resp>) {
    }
    public static $storageOf<Resp>($source: response<Resp>): response$Storage<Resp> {
        return $source.$storage;
    }
    public static $fromStorage<Resp>($source: response$Storage<Resp>): response<Resp> {
        return new response<Resp>($source);
    }
    static $zero<Resp>($go$to_storage$T0_to_T0: ($0: Resp) => GoStorage<Resp>, $go$zero$void_to_T0: () => Resp): response<Resp> {
        return new response<Resp>({
            complete: false,
            result: $go$to_storage$T0_to_T0($go$zero$void_to_T0()),
            forOriginalLocation: false
        });
    }
    static $copy<Resp>($go$copy$T0_to_T0: ($0: Resp) => Resp, $go$from_storage$T0_to_T0: ($0: GoStorage<Resp>) => Resp, $go$to_storage$T0_to_T0: ($0: Resp) => GoStorage<Resp>, $source: response<Resp>): response<Resp> {
        return new response<Resp>({
            complete: $source.$storage.complete,
            result: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.result))),
            forOriginalLocation: $source.$storage.forOriginalLocation
        });
    }
    static $equal<Resp>($go$equal$T0_T0_to_bool: ($0: Resp, $1: Resp) => bool, $go$from_storage$T0_to_T0: ($0: GoStorage<Resp>) => Resp, $left: response<Resp>, $right: response<Resp>): bool {
        return $left.$storage.complete === $right.$storage.complete && $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.result), $go$from_storage$T0_to_T0($right.$storage.result)) && $left.$storage.forOriginalLocation === $right.$storage.forOriginalLocation;
    }
    static $hash<Resp>($go$from_storage$T0_to_T0: ($0: GoStorage<Resp>) => Resp, $go$hash$T0_to_uint32: ($0: Resp) => uint32, $source: response<Resp>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.complete));
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.result)));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.forOriginalLocation));
        return $hash;
    }
    declare private readonly then?: never;
}
export interface CrossProjectOrchestrator extends GoInterfaceValue {
    GetAllProjectsForInitialRequest(): RuntimeSlice<Project | undefined>;
    GetDefaultProject(): Project | undefined;
    GetLanguageServiceForProjectWithFile($argument0: GoInterface | undefined, $argument1: Project | undefined, $argument2: DocumentUri__from_lsproto): LanguageService | undefined;
    GetProjectsForFile($argument0: GoInterface | undefined, $argument1: DocumentUri__from_lsproto): [
        RuntimeSlice<Project | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    GetProjectsLoadingProjectTree($argument0: GoInterface | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): iter__from_gostdlib.Seq<Project | undefined>;
}
export const CrossProjectOrchestrator$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetAllProjectsForInitialRequest$void_to_SliceOf_Named_ls$Project, $goInterfaceMethod$GetDefaultProject$void_to_Named_ls$Project, $goInterfaceMethod$GetLanguageServiceForProjectWithFile$Named_context$Context_Named_ls$Project_Named_lsproto$DocumentUri_to_PointerTo_Named_ls$LanguageService, $goInterfaceMethod$GetProjectsForFile$Named_context$Context_Named_lsproto$DocumentUri_to_SliceOf_Named_ls$Project_Named_error, $goInterfaceMethod$GetProjectsLoadingProjectTree$Named_context$Context_PointerTo_Named_collections$SetOf_Named_tspath$Path_to_Named_iter$SeqOf_Named_ls$Project]);
export function CrossProjectOrchestrator$is(value: GoInterfaceValue | undefined): value is CrossProjectOrchestrator {
    return value !== undefined && value.$go$implements(CrossProjectOrchestrator$contract);
}
export function handleCrossProject$kernel<Req, Resp>($go$constraint_method$lsproto$TextDocumentPosition$T0_to_Named_lsproto$Position: ($0: Req) => Position__from_lsproto, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri: ($0: Req) => DocumentUri__from_lsproto, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1: ($0: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined) => tsonicTypeScriptRuntime.Location<response<Resp>> | undefined, $go$copy$T1_to_T1: ($0: Resp) => Resp, $go$from_storage$T1_to_T1: ($0: GoStorage<Resp>) => Resp, $go$interface_adapt$PointerTo_Named_ls$responseOf_T1_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1: ($0: $goInterface$Interface_void | undefined) => tsonicTypeScriptRuntime.Location<response<Resp>> | undefined, $go$to_storage$T1_to_T1: ($0: Resp) => GoStorage<Resp>, $go$zero$void_to_T1: () => Resp, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1: () => tsonicTypeScriptRuntime.Location<response<Resp>> | undefined, defaultLs: LanguageService | undefined, ctx: GoInterface | undefined, params: Req, orchestrator: CrossProjectOrchestrator | undefined, symbolAndEntriesToResp: (($0: LanguageService | undefined, $1: GoInterface | undefined, $2: Req, $3: SymbolAndEntriesData, $4: symbolEntryTransformOptions) => [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined, combineResults: (($0: iter__from_gostdlib.Seq<Resp>) => Resp) | undefined, isRename: bool, implementations: bool, options: symbolEntryTransformOptions): [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let resp: Resp = $go$zero$void_to_T1();
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (orchestrator === undefined) {
        const __gotots_results_0 = LanguageService.$go$private$ls$provideSymbolsAndEntries(defaultLs, ctx, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params), $go$constraint_method$lsproto$TextDocumentPosition$T0_to_Named_lsproto$Position(params), isRename, implementations);
        let data = __gotots_results_0[0];
        const __gotots_callee_0 = symbolAndEntriesToResp;
        const __gotots_argument_0 = defaultLs;
        const __gotots_argument_1 = ctx;
        const __gotots_argument_2 = params;
        const __gotots_argument_3 = SymbolAndEntriesData.$copy(data);
        const __gotots_argument_4 = symbolEntryTransformOptions.$copy(options);
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    }
    const __gotots_receiver_0 = orchestrator;
    let defaultProject: Project | undefined = goInterfaceNonNil<CrossProjectOrchestrator>(__gotots_receiver_0).GetDefaultProject();
    const __gotots_receiver_1 = orchestrator;
    let allProjects = goInterfaceNonNil<CrossProjectOrchestrator>(__gotots_receiver_1).GetAllProjectsForInitialRequest();
    let results = SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>();
    const results$location = tsonicTypeScriptRuntime.boundLocation({}, () => results, results$next => results = results$next);
    let defaultDefinition: nonLocalDefinition | undefined = void 0;
    let canSearchProject: (($0: Project | undefined) => bool) | undefined = (project: Project | undefined): bool => {
        const __gotots_receiver_3 = results$location;
        const __gotots_receiver_2 = project;
        const __gotots_argument_5 = goInterfaceNonNil<Project>(__gotots_receiver_2).Id();
        const __gotots_results_1 = SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(__gotots_receiver_3, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): $goInterface$Interface_void | undefined => {
            return new GoInterfaceAdapter($argument0);
        }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, __gotots_argument_5);
        let searched = __gotots_results_1[1];
        return !searched;
    };
    let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(false);
    let errMu = named_sync.SyncMutexOperations.$zero();
    let enqueueItem: (($0: projectAndTextDocumentPosition) => void) | undefined;
    let panicsOccured = RuntimeSlice.nil<gostring>();
    let panicMu = named_sync.SyncMutexOperations.$zero();
    enqueueItem = (item: projectAndTextDocumentPosition): void => {
        let response__shadow_1 = response.$zero<Resp>($go$to_storage$T1_to_T1, $go$zero$void_to_T1);
        const response__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => response__shadow_1, response__shadow_1$next => response__shadow_1 = response__shadow_1$next);
        {
            const __gotots_receiver_5 = results$location;
            const __gotots_receiver_4 = item.project;
            const __gotots_argument_6 = goInterfaceNonNil<Project>(__gotots_receiver_4).Id();
            const __gotots_argument_7 = response__shadow_1$location;
            const __gotots_results_2 = SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(__gotots_receiver_5, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, $go$interface_adapt$PointerTo_Named_ls$responseOf_T1_to_Interface_void, ($argument0: Path__from_tspath): $goInterface$Interface_void | undefined => {
                return new GoInterfaceAdapter($argument0);
            }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, __gotots_argument_6, __gotots_argument_7);
            let loaded = __gotots_results_2[1];
            if (loaded) {
                return;
            }
        }
        const __gotots_receiver_11 = wg;
        const __gotots_argument_28 = (): void => {
            const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
            let __gotots_panic_0: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_0: {
                        const __gotots_receiver_6 = ctx;
                        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_6).Err() === undefined)) {
                            break __gotots_return_block_0;
                        }
                        const __gotots_callee_1 = ($go$recovery: GoRecovery): void => {
                            {
                                let r: $goInterface$Interface_void | undefined = $go$recovery === undefined ? undefined : $go$recovery.take();
                                if (!(r === undefined)) {
                                    let stack = debug__from_gostdlib.Stack();
                                    const __gotots_argument_14 = "panic handling request: %v\n%s";
                                    const __gotots_argument_12 = r;
                                    const __gotots_conversion_3 = stack;
                                    let __gotots_conversion_4 = "";
                                    for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                                        __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                                    }
                                    const __gotots_argument_13 = new $goInterfaceAdapter$string(__gotots_conversion_4);
                                    const __gotots_argument_15 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_12, __gotots_argument_13]);
                                    let panicOccured = fmt__from_gostdlib.Sprintf(__gotots_argument_14, __gotots_argument_15);
                                    sync__from_gostdlib.Mutex.Lock(panicMu);
                                    panicsOccured = panicsOccured.append("", [panicOccured]);
                                    sync__from_gostdlib.Mutex.Unlock(panicMu);
                                }
                            }
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_1($go$recovery);
                        });
                        let ls: LanguageService | undefined = item.ls;
                        if (ls === undefined) {
                            const __gotots_receiver_7 = orchestrator;
                            const __gotots_argument_16 = ctx;
                            const __gotots_argument_17 = item.project;
                            const __gotots_argument_18 = item.Uri;
                            ls = goInterfaceNonNil<CrossProjectOrchestrator>(__gotots_receiver_7).GetLanguageServiceForProjectWithFile(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
                            if (ls === undefined) {
                                break __gotots_return_block_0;
                            }
                        }
                        const __gotots_results_3 = LanguageService.$go$private$ls$provideSymbolsAndEntries(ls, ctx, item.Uri, Position__from_lsproto.$copy(item.Position), isRename, implementations);
                        let data = __gotots_results_3[0];
                        let ok = __gotots_results_3[1];
                        const __gotots_receiver_8 = ctx;
                        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_8).Err() === undefined)) {
                            break __gotots_return_block_0;
                        }
                        if (ok) {
                            const __gotots_range_0 = data.SymbolsAndEntries;
                            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                                let entry: SymbolAndEntries | undefined = __gotots_range_value_0;
                                if (goInterfaceEqual(item.project, defaultProject) && defaultDefinition === undefined) {
                                    defaultDefinition = LanguageService.$go$private$ls$getNonLocalDefinition(ls, ctx, entry);
                                }
                                LanguageService.$go$private$ls$forEachOriginalDefinitionLocation(ls, ctx, entry, (uri: DocumentUri__from_lsproto, position__shadow_1: Position__from_lsproto): void => {
                                    const __gotots_receiver_9 = orchestrator;
                                    const __gotots_argument_19 = ctx;
                                    const __gotots_argument_20 = uri;
                                    const __gotots_results_4 = goInterfaceNonNil<CrossProjectOrchestrator>(__gotots_receiver_9).GetProjectsForFile(__gotots_argument_19, __gotots_argument_20);
                                    let defProjects = __gotots_results_4[0];
                                    let errProjects: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
                                    if (!(errProjects === undefined)) {
                                        return;
                                    }
                                    const __gotots_range_1 = defProjects;
                                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                                        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                                        let defProject: Project | undefined = __gotots_range_value_1;
                                        const __gotots_callee_2 = canSearchProject;
                                        const __gotots_argument_21 = defProject;
                                        if ((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21)) {
                                            const __gotots_callee_3 = enqueueItem;
                                            const __gotots_argument_22 = new projectAndTextDocumentPosition(defProject, void 0, uri, Position__from_lsproto.$copy(position__shadow_1), true);
                                            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
                                        }
                                    }
                                });
                            }
                        }
                        {
                            const __gotots_callee_4 = symbolAndEntriesToResp;
                            const __gotots_argument_23 = ls;
                            const __gotots_argument_24 = ctx;
                            const __gotots_argument_25 = params;
                            const __gotots_argument_26 = SymbolAndEntriesData.$copy(data);
                            const __gotots_argument_27 = symbolEntryTransformOptions.$copy(options);
                            const __gotots_results_5 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
                            let result: Resp = $go$copy$T1_to_T1(__gotots_results_5[0]);
                            let errSearch: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
                            if (errSearch === undefined) {
                                response.$storageOf(response__shadow_1).complete = true;
                                response.$storageOf(response__shadow_1).result = $go$to_storage$T1_to_T1($go$copy$T1_to_T1(result));
                                response.$storageOf(response__shadow_1).forOriginalLocation = item.forOriginalLocation;
                            }
                            else {
                                sync__from_gostdlib.Mutex.Lock(errMu);
                                const __gotots_receiver_10 = errMu;
                                __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                    recovery_sync.SyncMutexUnlock(__gotots_receiver_10, $go$recovery);
                                });
                                if (err === undefined) {
                                    err = errSearch;
                                }
                            }
                        }
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
            finally {
                while (__gotots_defers_0.length !== 0) {
                    const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                    const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                    try {
                        __gotots_deferred_0(__gotots_recovery_0);
                        if (__gotots_recovery_0.recovered()) {
                            __gotots_panic_0 = undefined;
                        }
                    }
                    catch (__gotots_caught_1) {
                        if (!(__gotots_caught_1 instanceof GoPanic)) {
                            throw __gotots_caught_1;
                        }
                        __gotots_panic_0 = __gotots_caught_1;
                    }
                }
            }
            if (__gotots_panic_0 !== undefined) {
                throw __gotots_panic_0;
            }
        };
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_11).Queue(__gotots_argument_28);
    };
    const __gotots_callee_5 = enqueueItem;
    const __gotots_argument_29 = new projectAndTextDocumentPosition(defaultProject, defaultLs, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params), $go$constraint_method$lsproto$TextDocumentPosition$T0_to_Named_lsproto$Position(params), false);
    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29);
    const __gotots_range_2 = allProjects;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let project: Project | undefined = __gotots_range_value_2;
        if (!goInterfaceEqual(project, defaultProject)) {
            const __gotots_callee_6 = enqueueItem;
            const __gotots_argument_30 = new projectAndTextDocumentPosition(project, void 0, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params), $go$constraint_method$lsproto$TextDocumentPosition$T0_to_Named_lsproto$Position(params), false);
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
        }
    }
    let getResultsIterator: (() => iter__from_gostdlib.Seq<Resp>) | undefined = (): iter__from_gostdlib.Seq<Resp> => {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: Resp) => bool) | undefined): void => {
            let seenProjects = SyncSet__from_collections.$zero<Path__from_tspath>();
            const seenProjects$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenProjects, seenProjects$next => seenProjects = seenProjects$next);
            {
                const __gotots_receiver_13 = results$location;
                const __gotots_receiver_12 = defaultProject;
                const __gotots_argument_31 = goInterfaceNonNil<Project>(__gotots_receiver_12).Id();
                const __gotots_results_6 = SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(__gotots_receiver_13, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): $goInterface$Interface_void | undefined => {
                    return new GoInterfaceAdapter($argument0);
                }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, __gotots_argument_31);
                let response__shadow_1: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined = __gotots_results_6[0];
                let loaded = __gotots_results_6[1];
                if (loaded && response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).complete) {
                    const __gotots_callee_7 = __go_yield;
                    const __gotots_argument_32 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).result));
                    if (!(__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32)) {
                        return;
                    }
                }
            }
            const __gotots_receiver_15 = seenProjects$location;
            const __gotots_receiver_14 = defaultProject;
            const __gotots_argument_33 = goInterfaceNonNil<Project>(__gotots_receiver_14).Id();
            SyncSet$Add$Named_tspath$Path(__gotots_receiver_15, __gotots_argument_33);
            const __gotots_range_3 = allProjects;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let project: Project | undefined = __gotots_range_value_3;
                const __gotots_receiver_17 = seenProjects$location;
                const __gotots_receiver_16 = project;
                const __gotots_argument_34 = goInterfaceNonNil<Project>(__gotots_receiver_16).Id();
                if (SyncSet$AddIfAbsent$Named_tspath$Path(__gotots_receiver_17, __gotots_argument_34)) {
                    {
                        const __gotots_receiver_19 = results$location;
                        const __gotots_receiver_18 = project;
                        const __gotots_argument_35 = goInterfaceNonNil<Project>(__gotots_receiver_18).Id();
                        const __gotots_results_7 = SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(__gotots_receiver_19, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): $goInterface$Interface_void | undefined => {
                            return new GoInterfaceAdapter($argument0);
                        }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, __gotots_argument_35);
                        let response__shadow_1: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined = __gotots_results_7[0];
                        let loaded = __gotots_results_7[1];
                        if (loaded && response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).complete) {
                            const __gotots_callee_8 = __go_yield;
                            const __gotots_argument_36 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).result));
                            if (!(__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36)) {
                                return;
                            }
                        }
                    }
                }
            }
            SyncMap__from_collections.Range$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(results$location, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): Path__from_tspath => {
                return $argument0;
            }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
                return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })($argument0);
            }, (): Path__from_tspath => {
                return new Path__from_tspath("");
            }, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, (key: Path__from_tspath, response__shadow_1: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined): bool => {
                if (!response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).forOriginalLocation && SyncSet$AddIfAbsent$Named_tspath$Path(seenProjects$location, key) && response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).complete) {
                    const __gotots_callee_9 = __go_yield;
                    const __gotots_argument_37 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).result));
                    return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37);
                }
                return true;
            });
            SyncMap__from_collections.Range$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(results$location, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): Path__from_tspath => {
                return $argument0;
            }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
                return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })($argument0);
            }, (): Path__from_tspath => {
                return new Path__from_tspath("");
            }, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, (key: Path__from_tspath, response__shadow_1: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined): bool => {
                if (response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).forOriginalLocation && SyncSet$AddIfAbsent$Named_tspath$Path(seenProjects$location, key) && response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).complete) {
                    const __gotots_callee_10 = __go_yield;
                    const __gotots_argument_38 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).result));
                    return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
                }
                return true;
            });
        });
    };
    for (;;) {
        const __gotots_receiver_20 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_20).RunAndWait();
        if (!panicsOccured.isNil()) {
            const __gotots_argument_39 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Panics occurred during cross-project handling: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_string(panicsOccured)])));
            GoPanic.raise(__gotots_argument_39 === undefined ? GoPanicNilValue.create() : __gotots_argument_39);
        }
        const __gotots_receiver_21 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_21).Err() === undefined)) {
            const __gotots_results_8 = $go$copy$T1_to_T1(resp);
            const __gotots_receiver_22 = ctx;
            const __gotots_results_9 = goInterfaceNonNil<GoInterface>(__gotots_receiver_22).Err();
            return [__gotots_results_8, __gotots_results_9];
        }
        if (!(err === undefined)) {
            return [$go$copy$T1_to_T1(resp), err];
        }
        wg = NewWorkGroup__from_core(false);
        let hasMoreWork = false;
        if (!(defaultDefinition === undefined)) {
            let requestedProjectTrees = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                return GoMap.nil();
            });
            const requestedProjectTrees$location = tsonicTypeScriptRuntime.boundLocation({}, () => requestedProjectTrees, requestedProjectTrees$next => requestedProjectTrees = requestedProjectTrees$next);
            SyncMap__from_collections.Range$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(results$location, $go$copy$PointerTo_Named_ls$responseOf_T1_to_PointerTo_Named_ls$responseOf_T1, ($argument0: Path__from_tspath): Path__from_tspath => {
                return $argument0;
            }, $go$interface_assert$Interface_void_to_PointerTo_Named_ls$responseOf_T1, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
                return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })($argument0);
            }, (): Path__from_tspath => {
                return new Path__from_tspath("");
            }, $go$zero$void_to_PointerTo_Named_ls$responseOf_T1, (key: Path__from_tspath, response__shadow_1: tsonicTypeScriptRuntime.Location<response<Resp>> | undefined): bool => {
                if (response.$storageOf(((response__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<response<Resp>>).value).complete) {
                    Set$Add$Named_tspath$Path(requestedProjectTrees$location, key);
                }
                return true;
            });
            const __gotots_receiver_23 = orchestrator;
            const __gotots_argument_40 = ctx;
            const __gotots_argument_41 = requestedProjectTrees$location;
            const __gotots_range_4 = named_iter.IterSeqValueOperations.$project(goInterfaceNonNil<CrossProjectOrchestrator>(__gotots_receiver_23).GetProjectsLoadingProjectTree(__gotots_argument_40, __gotots_argument_41));
            if (__gotots_range_4 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            let __gotots_range_return_0: [
                Resp,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] = [$go$zero$void_to_T1(), void 0];
            __gotots_range_4(($argument0: Project | undefined): bool => {
                if (__gotots_range_state_0 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_0 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_0 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_0 = -1;
                const __gotots_range_value_4 = $argument0;
                let loadedProject: Project | undefined = __gotots_range_value_4;
                const __gotots_receiver_24 = ctx;
                if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_24).Err() === undefined)) {
                    const __gotots_results_10 = $go$copy$T1_to_T1(resp);
                    const __gotots_receiver_25 = ctx;
                    const __gotots_results_11 = goInterfaceNonNil<GoInterface>(__gotots_receiver_25).Err();
                    __gotots_range_return_0 = [__gotots_results_10, __gotots_results_11];
                    __gotots_range_state_0 = 2;
                    return false;
                }
                const __gotots_callee_11 = canSearchProject;
                const __gotots_argument_42 = loadedProject;
                let __gotots_logical_result_0 = !(__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
                if (!__gotots_logical_result_0) {
                    const __gotots_receiver_26 = loadedProject;
                    __gotots_logical_result_0 = goInterfaceNonNil<Project>(__gotots_receiver_26).GetProgram() === undefined;
                }
                if (__gotots_logical_result_0) {
                    __gotots_range_state_0 = 1;
                    return true;
                }
                const __gotots_receiver_27 = loadedProject;
                const __gotots_store_0 = (defaultDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_43 = position.TextDocumentURI(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "position")).FileName();
                if (goInterfaceNonNil<Project>(__gotots_receiver_27).HasFile(__gotots_argument_43)) {
                    const __gotots_callee_12 = enqueueItem;
                    const __gotots_field_0 = loadedProject;
                    const __gotots_store_1 = (defaultDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_field_1 = position.TextDocumentURI(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "position"));
                    const __gotots_store_2 = (defaultDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_field_2 = position.TextDocumentPosition(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "position"));
                    const __gotots_argument_44 = new projectAndTextDocumentPosition(__gotots_field_0, void 0, __gotots_field_1, __gotots_field_2, false);
                    (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44);
                    hasMoreWork = true;
                }
                else {
                    const __gotots_callee_13 = (defaultDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetSourcePosition;
                    let sourcePos: HasTextDocumentPosition__from_lsproto | undefined = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))();
                    let __gotots_logical_result_1 = !(sourcePos === undefined);
                    if (__gotots_logical_result_1) {
                        const __gotots_receiver_29 = loadedProject;
                        const __gotots_receiver_28 = sourcePos;
                        const __gotots_argument_45 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_28).TextDocumentURI().FileName();
                        __gotots_logical_result_1 = goInterfaceNonNil<Project>(__gotots_receiver_29).HasFile(__gotots_argument_45);
                    }
                    if (__gotots_logical_result_1) {
                        const __gotots_callee_14 = enqueueItem;
                        const __gotots_field_3 = loadedProject;
                        const __gotots_receiver_30 = sourcePos;
                        const __gotots_field_4 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_30).TextDocumentURI();
                        const __gotots_receiver_31 = sourcePos;
                        const __gotots_field_5 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_31).TextDocumentPosition();
                        const __gotots_argument_46 = new projectAndTextDocumentPosition(__gotots_field_3, void 0, __gotots_field_4, __gotots_field_5, false);
                        (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46);
                        hasMoreWork = true;
                    }
                    else {
                        const __gotots_callee_15 = (defaultDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetGeneratedPosition;
                        let generatedPos: HasTextDocumentPosition__from_lsproto | undefined = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))();
                        let __gotots_logical_result_2 = !(generatedPos === undefined);
                        if (__gotots_logical_result_2) {
                            const __gotots_receiver_33 = loadedProject;
                            const __gotots_receiver_32 = generatedPos;
                            const __gotots_argument_47 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_32).TextDocumentURI().FileName();
                            __gotots_logical_result_2 = goInterfaceNonNil<Project>(__gotots_receiver_33).HasFile(__gotots_argument_47);
                        }
                        if (__gotots_logical_result_2) {
                            const __gotots_callee_16 = enqueueItem;
                            const __gotots_field_6 = loadedProject;
                            const __gotots_receiver_34 = generatedPos;
                            const __gotots_field_7 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_34).TextDocumentURI();
                            const __gotots_receiver_35 = generatedPos;
                            const __gotots_field_8 = goInterfaceNonNil<HasTextDocumentPosition__from_lsproto>(__gotots_receiver_35).TextDocumentPosition();
                            const __gotots_argument_48 = new projectAndTextDocumentPosition(__gotots_field_6, void 0, __gotots_field_7, __gotots_field_8, false);
                            (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
                            hasMoreWork = true;
                        }
                    }
                }
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            if (__gotots_range_state_0 === 2) {
                return __gotots_range_return_0;
            }
            __gotots_range_state_0 = -2;
        }
        if (!hasMoreWork) {
            break;
        }
    }
    if (SyncMap__from_collections.Size<Path__from_tspath, tsonicTypeScriptRuntime.Location<response<Resp>> | undefined>(results$location) > 1) {
        const __gotots_callee_18 = combineResults;
        const __gotots_callee_17 = getResultsIterator;
        const __gotots_argument_49 = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_argument_50 = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49);
        resp = $go$copy$T1_to_T1(__gotots_argument_50);
    }
    else {
        const __gotots_callee_19 = getResultsIterator;
        const __gotots_range_5 = named_iter.IterSeqValueOperations.$project((__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))());
        if (__gotots_range_5 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_1 = 1;
        __gotots_range_5(($argument0: Resp): bool => {
            if (__gotots_range_state_1 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_1 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_1 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_1 = -1;
            const __gotots_range_value_5 = $go$copy$T1_to_T1($argument0);
            let value: Resp = __gotots_range_value_5;
            resp = $go$copy$T1_to_T1(value);
            __gotots_range_state_1 = 0;
            return false;
            __gotots_range_state_1 = 1;
            return true;
        });
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_1 = -2;
    }
    return [$go$copy$T1_to_T1(resp), void 0];
}
export function combineLocationArray$kernel<T>($go$constraint_method$lsproto$GetLocation$T0_to_Named_lsproto$Location: ($0: T) => Location__from_lsproto, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, combined: RuntimeSlice<GoContainerStorage<T>>, locations: tsonicTypeScriptRuntime.Location<RuntimeSlice<GoContainerStorage<T>>> | undefined, seen: tsonicTypeScriptRuntime.Location<Set__from_collections<Location__from_lsproto>> | undefined): RuntimeSlice<GoContainerStorage<T>> {
    const __gotots_range_14 = ((locations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<GoContainerStorage<T>>>).value;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_14.length; __gotots_range_index_7++) {
        const __gotots_range_value_17 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_14.get(__gotots_range_index_7)));
        let loc: T = __gotots_range_value_17;
        if (Set$AddIfAbsent$Named_lsproto$Location(seen, $go$constraint_method$lsproto$GetLocation$T0_to_Named_lsproto$Location(loc))) {
            const __gotots_slice_build_8 = combined;
            const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
            let __gotots_slice_build_9 = __gotots_slice_build_8;
            if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(loc)));
            }
            else {
                __gotots_slice_build_9 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.set(__gotots_slice_build_11, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                }
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(loc)));
                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                }
            }
            combined = __gotots_slice_build_9;
        }
    }
    return combined;
}
export function combineResponseLocations$kernel<T>($go$constraint_method$lsproto$GetLocations$T0_to_PointerTo_SliceOf_Named_lsproto$Location: ($0: T) => tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, results: iter__from_gostdlib.Seq<T>): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined {
    let combined = RuntimeSlice.nil<Location__from_lsproto$Storage>();
    const combined$location = tsonicTypeScriptRuntime.boundLocation({}, () => combined, combined$next => combined = combined$next);
    let seenLocations = Set__from_collections.$zero<Location__from_lsproto>((): GoMapValue<Location__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$Location_To_Struct_void.nil();
    });
    const seenLocations$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenLocations, seenLocations$next => seenLocations = seenLocations$next);
    const __gotots_range_8 = named_iter.IterSeqValueOperations.$project(results);
    if (__gotots_range_8 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_3 = 1;
    __gotots_range_8(($argument0: T): bool => {
        if (__gotots_range_state_3 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_3 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_3 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_3 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_3 = -1;
        const __gotots_range_value_8 = $go$copy$T0_to_T0($argument0);
        let resp: T = __gotots_range_value_8;
        {
            let locations: tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined = $go$constraint_method$lsproto$GetLocations$T0_to_PointerTo_SliceOf_Named_lsproto$Location(resp);
            if (!(locations === undefined)) {
                combined = combineLocationArray$Named_lsproto$Location(combined, locations, seenLocations$location);
            }
        }
        __gotots_range_state_3 = 1;
        return true;
    });
    if (__gotots_range_state_3 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_3 = -2;
    return combined$location;
}
export function combineReferences(results: iter__from_gostdlib.Seq<LocationsOrNull__from_lsproto>): LocationsOrNull__from_lsproto {
    return LocationsOrNull__from_lsproto.$fromStorage({
        Locations: combineResponseLocations$Named_lsproto$LocationsOrNull(results)
    });
}
export function combineVSReferences(results: iter__from_gostdlib.Seq<VSReferenceItemsOrNull__from_lsproto>): VSReferenceItemsOrNull__from_lsproto {
    let combined = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto> | undefined>();
    const combined$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => combined, combined$next2 => combined = combined$next2);
    let nextId = 0;
    const __gotots_range_6 = named_iter.IterSeqValueOperations.$project(results);
    if (__gotots_range_6 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_2 = 1;
    __gotots_range_6(($argument0: VSReferenceItemsOrNull__from_lsproto): bool => {
        if (__gotots_range_state_2 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_2 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_2 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_2 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_2 = -1;
        const __gotots_range_value_6 = VSReferenceItemsOrNull__from_lsproto.$copy($argument0);
        let resp = __gotots_range_value_6;
        if (VSReferenceItemsOrNull__from_lsproto.$storageOf(resp).VSReferenceItems === undefined) {
            __gotots_range_state_2 = 1;
            return true;
        }
        let idMap: GoMapValue<int32, int32> = GoMap__from_gotots_runtime.make<int32, int32>(0, 0, []);
        const __gotots_range_7 = ((VSReferenceItemsOrNull__from_lsproto.$storageOf(resp).VSReferenceItems ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto> | undefined>>).value;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_4);
            let item: tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto> | undefined = __gotots_range_value_7;
            let oldId = ((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto>).value.VSId;
            let newId = nextId;
            idMap.store(oldId, newId);
            nextId++;
            let newItem = VSReferenceItem__from_lsproto.$copy(VSReferenceItem__from_lsproto.$copy(((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto>).value));
            const newItem$location = tsonicTypeScriptRuntime.boundLocation({}, () => newItem, newItem$next => newItem = newItem$next);
            newItem.VSId = newId;
            if (!(((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto>).value.VSDefinitionId === undefined)) {
                let newDefId = idMap.lookup(((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VSReferenceItem__from_lsproto>).value.VSDefinitionId ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int32>).value);
                const newDefId$location = tsonicTypeScriptRuntime.boundLocation({}, () => newDefId, newDefId$next => newDefId = newDefId$next);
                newItem.VSDefinitionId =
                    newDefId$location;
            }
            combined = combined.append(void 0, [
                newItem$location,
            ]);
        }
        __gotots_range_state_2 = 1;
        return true;
    });
    if (__gotots_range_state_2 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_2 = -2;
    return VSReferenceItemsOrNull__from_lsproto.$fromStorage({
        VSReferenceItems: combined$location2
    });
}
export function combineImplementations(results: iter__from_gostdlib.Seq<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto {
    let combined = RuntimeSlice.nil<{
        value: LocationLink__from_lsproto;
    } | undefined>();
    const combined$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => combined, combined$next3 => combined = combined$next3);
    let seenLocations = Set__from_collections.$zero<Location__from_lsproto>((): GoMapValue<Location__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$Location_To_Struct_void.nil();
    });
    const seenLocations$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => seenLocations, seenLocations$next2 => seenLocations = seenLocations$next2);
    const __gotots_range_13 = named_iter.IterSeqValueOperations.$project(results);
    if (__gotots_range_13 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_5 = 1;
    let __gotots_range_return_0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto = LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$zero();
    __gotots_range_13(($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): bool => {
        if (__gotots_range_state_5 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_5 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_5 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_5 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_5 = -1;
        const __gotots_range_value_16 = LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
        let resp = __gotots_range_value_16;
        {
            let definitionLinks: tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: LocationLink__from_lsproto;
            } | undefined>> | undefined = LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$storageOf(resp).DefinitionLinks;
            if (!(definitionLinks === undefined)) {
                combined = combineLocationArray$PointerTo_Named_lsproto$LocationLink(combined, definitionLinks, seenLocations$location2);
            }
            else {
                let locations: tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined = LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$storageOf(resp).Locations;
                if (!(locations === undefined)) {
                    __gotots_range_return_0 = LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$fromStorage({
                        Locations: combineResponseLocations$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(results),
                        Location: void 0,
                        DefinitionLinks: void 0
                    });
                    __gotots_range_state_5 = 2;
                    return false;
                }
            }
        }
        __gotots_range_state_5 = 1;
        return true;
    });
    if (__gotots_range_state_5 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    if (__gotots_range_state_5 === 2) {
        return __gotots_range_return_0;
    }
    __gotots_range_state_5 = -2;
    return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$fromStorage({
        DefinitionLinks: combined$location3,
        Location: void 0,
        Locations: void 0
    });
}
export function combineRenameResponse(results: iter__from_gostdlib.Seq<WorkspaceEditOrNull__from_lsproto>): WorkspaceEditOrNull__from_lsproto {
    let combined: GoMapValue<DocumentUri__from_lsproto, RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>> = $goMap$MapOf_Named_lsproto$DocumentUri_To_SliceOf_PointerTo_Named_lsproto$TextEdit.make(0, []);
    const combined$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => combined, combined$next4 => combined = combined$next4);
    let seenChanges: GoMapValue<DocumentUri__from_lsproto, tsonicTypeScriptRuntime.Location<Set__from_collections<Range__from_lsproto>> | undefined> = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_collections$SetOf_Named_lsproto$Range.make(0, []);
    let documentChanges = RuntimeSlice.nil<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>();
    const documentChanges$location = tsonicTypeScriptRuntime.boundLocation({}, () => documentChanges, documentChanges$next => documentChanges = documentChanges$next);
    let seenRenames = Set__from_collections.$fromStorage<GoArray<gostring, 2>>({
        M: $goMap$MapOf_Array2Of_Named_lsproto$DocumentUri_To_Struct_void.nil()
    });
    const seenRenames$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenRenames, seenRenames$next => seenRenames = seenRenames$next);
    const __gotots_range_9 = named_iter.IterSeqValueOperations.$project(results);
    if (__gotots_range_9 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_4 = 1;
    __gotots_range_9(($argument0: WorkspaceEditOrNull__from_lsproto): bool => {
        if (__gotots_range_state_4 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_4 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_4 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_4 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_4 = -1;
        const __gotots_range_value_9 = WorkspaceEditOrNull__from_lsproto.$copy($argument0);
        let resp = __gotots_range_value_9;
        if (!(WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit === undefined) && !((WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DocumentChanges === undefined)) {
            const __gotots_range_10 = (((WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DocumentChanges ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>>).value;
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_10.length; __gotots_range_index_5++) {
                const __gotots_range_value_10 = TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_range_10.get(__gotots_range_index_5)));
                let change = __gotots_range_value_10;
                __gotots_control_target_0: {
                    if (!(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile === undefined)) {
                        let key = GoArray.literal<gostring, 2>(2, ((void DocumentUri__from_lsproto,
                            "") as string), [0, 1], [(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri.$value, (TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewUri.$value]);
                        if (Set$AddIfAbsent$Array2Of_Named_lsproto$DocumentUri(seenRenames$location, key.copy())) {
                            const __gotots_slice_build_0 = documentChanges;
                            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                            let __gotots_slice_build_1 = __gotots_slice_build_0;
                            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                            }
                            else {
                                __gotots_slice_build_1 = goSliceAllocate<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.set(__gotots_slice_build_3, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                                }
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$zero()));
                                }
                            }
                            documentChanges = __gotots_slice_build_1;
                        }
                    }
                    else {
                        const __gotots_slice_build_4 = documentChanges;
                        const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                        let __gotots_slice_build_5 = __gotots_slice_build_4;
                        if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                            __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                        }
                        else {
                            __gotots_slice_build_5 = goSliceAllocate<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                                __gotots_slice_build_5.set(__gotots_slice_build_7, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                            }
                            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                            for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                                __gotots_slice_build_5.$initialize(__gotots_slice_build_7, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$zero()));
                            }
                        }
                        documentChanges = __gotots_slice_build_5;
                    }
                }
            }
        }
        if (!(WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit === undefined) && !((WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Changes === undefined)) {
            const __gotots_range_11 = (((WorkspaceEditOrNull__from_lsproto.$storageOf(resp).WorkspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoMapValue<DocumentUri__from_lsproto, RuntimeSlice<{
                value: TextEdit__from_lsproto;
            } | undefined>>>).value;
            const __gotots_range_keys_0 = __gotots_range_11.keys();
            for (const __gotots_range_value_11 of __gotots_range_keys_0) {
                const __gotots_range_value_12 = __gotots_range_11.lookupOk(__gotots_range_value_11);
                if (!__gotots_range_value_12[1]) {
                    continue;
                }
                const __gotots_range_value_13 = __gotots_range_value_11;
                const __gotots_range_value_14 = __gotots_range_value_12[0];
                let doc = __gotots_range_value_13;
                let changes = __gotots_range_value_14;
                const __gotots_results_10 = seenChanges.lookupOk(doc);
                let seenSet: tsonicTypeScriptRuntime.Location<Set__from_collections<Range__from_lsproto>> | undefined = __gotots_results_10[0];
                let ok = __gotots_results_10[1];
                if (!ok) {
                    seenSet =
                        tsonicTypeScriptRuntime.location<Set__from_collections<Range__from_lsproto>>(Set__from_collections.$fromStorage<Range__from_lsproto>({
                            M: $goMap$MapOf_Named_lsproto$Range_To_Struct_void.nil()
                        }));
                    seenChanges.store(doc, seenSet);
                }
                const __gotots_results_11 = combined.lookupOk(doc);
                let changesForDoc = __gotots_results_11[0];
                let exists = __gotots_results_11[1];
                if (!exists) {
                    changesForDoc = RuntimeSlice.literal<{
                        value: TextEdit__from_lsproto;
                    } | undefined>([]);
                }
                const __gotots_range_12 = changes;
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_12.length; __gotots_range_index_6++) {
                    const __gotots_range_value_15 = __gotots_range_12.get(__gotots_range_index_6);
                    let change: {
                        value: TextEdit__from_lsproto;
                    } | undefined = __gotots_range_value_15;
                    if (!Set__from_collections.Has<Range__from_lsproto>(seenSet, Range__from_lsproto.$copy((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range))) {
                        Set$Add$Named_lsproto$Range(seenSet, Range__from_lsproto.$copy((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range));
                        changesForDoc = changesForDoc.append(void 0, [change]);
                    }
                }
                combined.store(doc, changesForDoc);
            }
        }
        __gotots_range_state_4 = 1;
        return true;
    });
    if (__gotots_range_state_4 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_4 = -2;
    if (documentChanges.length > 0 || combined.length() > 0) {
        let workspaceEdit: {
            value: WorkspaceEdit__from_lsproto;
        } | undefined = { value: new WorkspaceEdit__from_lsproto(void 0, void 0, void 0) };
        if (documentChanges.length > 0) {
            (workspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DocumentChanges =
                documentChanges$location;
        }
        if (combined.length() > 0) {
            (workspaceEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Changes =
                combined$location4;
        }
        return WorkspaceEditOrNull__from_lsproto.$fromStorage({
            WorkspaceEdit: workspaceEdit
        });
    }
    return WorkspaceEditOrNull__from_lsproto.$fromStorage({
        WorkspaceEdit: void 0
    });
}
export function combineIncomingCalls(results: iter__from_gostdlib.Seq<CallHierarchyIncomingCallsOrNull__from_lsproto>): CallHierarchyIncomingCallsOrNull__from_lsproto {
    let combined = RuntimeSlice.nil<{
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined>();
    const combined$location5 = tsonicTypeScriptRuntime.boundLocation({}, () => combined, combined$next5 => combined = combined$next5);
    let seenCalls = Set__from_collections.$zero<Location__from_lsproto>((): GoMapValue<Location__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$Location_To_Struct_void.nil();
    });
    const seenCalls$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenCalls, seenCalls$next => seenCalls = seenCalls$next);
    const __gotots_range_15 = named_iter.IterSeqValueOperations.$project(results);
    if (__gotots_range_15 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_6 = 1;
    __gotots_range_15(($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): bool => {
        if (__gotots_range_state_6 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_6 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_6 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_6 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_6 = -1;
        const __gotots_range_value_18 = CallHierarchyIncomingCallsOrNull__from_lsproto.$copy($argument0);
        let resp = __gotots_range_value_18;
        if (!(CallHierarchyIncomingCallsOrNull__from_lsproto.$storageOf(resp).CallHierarchyIncomingCalls === undefined)) {
            const __gotots_range_16 = ((CallHierarchyIncomingCallsOrNull__from_lsproto.$storageOf(resp).CallHierarchyIncomingCalls ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: CallHierarchyIncomingCall__from_lsproto;
            } | undefined>>).value;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_16.length; __gotots_range_index_8++) {
                const __gotots_range_value_19 = __gotots_range_16.get(__gotots_range_index_8);
                let call: {
                    value: CallHierarchyIncomingCall__from_lsproto;
                } | undefined = __gotots_range_value_19;
                if (Set$AddIfAbsent$Named_lsproto$Location(seenCalls$location, ((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.From ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GetLocation())) {
                    combined = combined.append(void 0, [call]);
                }
            }
        }
        __gotots_range_state_6 = 1;
        return true;
    });
    if (__gotots_range_state_6 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_6 = -2;
    return CallHierarchyIncomingCallsOrNull__from_lsproto.$fromStorage({
        CallHierarchyIncomingCalls: combined$location5
    });
}
