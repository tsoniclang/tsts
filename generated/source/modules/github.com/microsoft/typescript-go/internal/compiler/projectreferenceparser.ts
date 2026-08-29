import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CompilerOptions as CompilerOptions__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { CompilerHost } from "./host.js";
import type { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { PhaseParse$constant as PhaseParse$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$PointerTo_Named_compiler$projectReferenceParseTask } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$projectReferenceParseTask } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { Map$string$PointerTo_Named_compiler$projectReferenceParseTask } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Copy$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference } from "../../../../../../support/generics/concretizations/maps/Copy.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goMap$MapOf_Named_tspath$Path_To_SliceOf_Named_tspath$Path, $goMap$MapOf_PointerTo_Named_compiler$projectReferenceParseTask_To_Struct_void, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$ParsedCommandLine as GoMap } from "../../../../../../support/maps.js";
import { fileLoader } from "./fileloader.js";
import { ProgramOptions } from "./program.js";
import { newProjectReferenceDtsFakingHost } from "./projectreferencedtsfakinghost.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class projectReferenceParseTask {
    declare private readonly $goType: void;
    public constructor(public configName: gostring, public resolved: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public subTasks: RuntimeSlice<{
        value: projectReferenceParseTask;
    } | undefined>) {
    }
    static $copy($source: projectReferenceParseTask): projectReferenceParseTask {
        return new projectReferenceParseTask($source.configName, $source.resolved, $source.subTasks);
    }
    declare private readonly then?: never;
    static $go$private$compiler$parse(t: {
        value: projectReferenceParseTask;
    } | undefined, projectReferenceParser__shadow_1: projectReferenceParser | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let loader: fileLoader | undefined = (projectReferenceParser__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader;
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = (loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts.Tracing;
                        if (!(tr === undefined)) {
                            const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseParse$constant__from_tracing(), "parseJsonSourceFileConfigFileContent", $goMap$MapOf_string_To_Interface_void.make(1, [["path", new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configName)]]), false);
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                        }
                    }
                    const __gotots_receiver_2 = (loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts.Host;
                    const __gotots_argument_1: projectReferenceParseTask["configName"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configName;
                    const __gotots_argument_2 = fileLoader.$go$private$compiler$toPath(loader, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configName);
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved = goInterfaceNonNil<CompilerHost>(__gotots_receiver_2).GetResolvedProjectReference(__gotots_argument_1, __gotots_argument_2);
                    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined) {
                        break __gotots_return_block_0;
                    }
                    ParsedCommandLine__from_tsoptions.ParseInputOutputNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
                    {
                        let subReferences = ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
                        if (subReferences.length > 0) {
                            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks = createProjectReferenceParseTasks(subReferences);
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
    }
}
export function createProjectReferenceParseTasks(projectReferences: RuntimeSlice<gostring>): RuntimeSlice<{
    value: projectReferenceParseTask;
} | undefined> {
    return Map$string$PointerTo_Named_compiler$projectReferenceParseTask(projectReferences, (configName: gostring): {
        value: projectReferenceParseTask;
    } | undefined => {
        return { value: new projectReferenceParseTask(configName, void 0, RuntimeSlice.nil<{
                value: projectReferenceParseTask;
            } | undefined>()) };
    });
}
export class projectReferenceParser {
    declare private readonly $goType: void;
    public constructor(public loader: fileLoader | undefined, public wg: WorkGroup__from_core | undefined, public tasksByFileName: SyncMap__from_collections<Path__from_tspath, {
        value: projectReferenceParseTask;
    } | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$compiler$initMapper(p: projectReferenceParser | undefined, tasks: RuntimeSlice<{
        value: projectReferenceParseTask;
    } | undefined>): void {
        const __gotots_store_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_0 = SyncMap__from_collections.Size<Path__from_tspath, {
            value: projectReferenceParseTask;
        } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "tasksByFileName"));
        const __gotots_binary_operand_1 = 1;
        let totalReferences = __gotots_binary_operand_0 + __gotots_binary_operand_1;
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configToProjectReference = GoMap.make(totalReferences, []);
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile = $goMap$MapOf_Named_tspath$Path_To_SliceOf_Named_tspath$Path.make(totalReferences, []);
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceToProjectReference = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.make(0, []);
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outputDtsToProjectReference = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.make(0, []);
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.store(SourceFile__from_ast.Path((((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile), projectReferenceParser.$go$private$compiler$initMapperWorker(p, tasks, tsonicTypeScriptRuntime.location<Set__from_collections<{
            value: projectReferenceParseTask;
        } | undefined>>(Set__from_collections.$fromStorage<{
            value: projectReferenceParseTask;
        } | undefined>({
            M: $goMap$MapOf_PointerTo_Named_compiler$projectReferenceParseTask_To_Struct_void.nil()
        }))));
        const __gotots_store_2 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "opts")) && (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outputDtsToProjectReference.length() !== 0) {
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host = newProjectReferenceDtsFakingHost((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader);
        }
    }
    static $go$private$compiler$initMapperWorker(p: projectReferenceParser | undefined, tasks: RuntimeSlice<{
        value: projectReferenceParseTask;
    } | undefined>, seen: tsonicTypeScriptRuntime.Location<Set__from_collections<{
        value: projectReferenceParseTask;
    } | undefined>> | undefined): RuntimeSlice<gostring> {
        if (tasks.length === 0) {
            return RuntimeSlice.nil<gostring>();
        }
        let results = RuntimeSlice.make<gostring>(0, tasks.length, ((void Path__from_tspath,
            "") as string));
        const __gotots_range_1 = tasks;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let task: {
                value: projectReferenceParseTask;
            } | undefined = __gotots_range_value_2;
            let path = fileLoader.$go$private$compiler$toPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configName);
            results = results.append(((void Path__from_tspath,
                "") as string), [path.$value]);
            if (!Set$AddIfAbsent$PointerTo_Named_compiler$projectReferenceParseTask(seen, task)) {
                continue;
            }
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configToProjectReference.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
            if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined) && !((((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile
                ===
                    (((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile)) {
                Copy$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceToProjectReference, ParsedCommandLine__from_tsoptions.SourceToProjectReference((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
                Copy$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outputDtsToProjectReference, ParsedCommandLine__from_tsoptions.OutputDtsToProjectReference((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
                const __gotots_store_3 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                if (ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "opts"))) {
                    let declDir: CompilerOptions__from_core["DeclarationDir"] = (ParsedCommandLine__from_tsoptions.CompilerOptions((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir;
                    if (declDir === "") {
                        declDir = (ParsedCommandLine__from_tsoptions.CompilerOptions((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir;
                    }
                    if (declDir !== "") {
                        const __gotots_store_4 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "dtsDirectories"), fileLoader.$go$private$compiler$toPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader, declDir));
                    }
                }
            }
            let referencesInConfig = projectReferenceParser.$go$private$compiler$initMapperWorker(p, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks, seen);
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.store(path, referencesInConfig);
        }
        return results;
    }
    static $go$private$compiler$parse(p: projectReferenceParser | undefined, tasks: RuntimeSlice<{
        value: projectReferenceParseTask;
    } | undefined>): void {
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loader = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader;
        projectReferenceParser.$go$private$compiler$start(p, tasks);
        const __gotots_receiver_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_0).RunAndWait();
        projectReferenceParser.$go$private$compiler$initMapper(p, tasks);
    }
    static $go$private$compiler$start(p: projectReferenceParser | undefined, tasks: RuntimeSlice<{
        value: projectReferenceParseTask;
    } | undefined>): void {
        const __gotots_range_0 = tasks;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let task: {
                value: projectReferenceParseTask;
            } | undefined = __gotots_range_value_1;
            let path = fileLoader.$go$private$compiler$toPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).loader, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configName);
            {
                const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_0 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$projectReferenceParseTask(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "tasksByFileName"), path, task);
                let loadedTask: {
                    value: projectReferenceParseTask;
                } | undefined = __gotots_results_0[0];
                let loaded = __gotots_results_0[1];
                if (loaded) {
                    tasks.set(i, loadedTask);
                }
                else {
                    const __gotots_receiver_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wg;
                    const __gotots_argument_0 = (): void => {
                        projectReferenceParseTask.$go$private$compiler$parse(task, p);
                        projectReferenceParser.$go$private$compiler$start(p, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks);
                    };
                    goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_1).Queue(__gotots_argument_0);
                }
            }
        }
    }
}
