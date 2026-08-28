import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFileParseOptions$Storage as SourceFileParseOptions__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { BuildInfo as BuildInfo__from_incremental } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import type { System as System__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import type { ParsedBuildCommandLine as ParsedBuildCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { GetMTime as GetMTime__from_incremental } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import { ExtendedConfigCache as ExtendedConfigCache__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import { GetParsedCommandLineOfConfigFilePath as GetParsedCommandLineOfConfigFilePath__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ExtensionJson$string as ExtensionJson$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { OrderedMap$Set$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { SyncMap$Load$Named_tspath$Path$Named_time$Time } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$Named_time$Time } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncMap$Store$Named_tspath$Path$Named_time$Duration, SyncMap$Store$Named_tspath$Path$Named_time$Time } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { parseCache$loadOrStore$Named_ast$SourceFileParseOptions$PointerTo_Named_ast$SourceFile, parseCache$loadOrStore$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/execute/build/parseCache$loadOrStore.js";
import { $goInterfaceAdapter$PointerTo_Named_build$host, $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetSourceFile$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../support/maps.js";
import { BuildTask } from "./buildtask.js";
import { Orchestrator } from "./orchestrator.js";
import { parseCache } from "./parseCache.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class host {
    declare private readonly $goType: void;
    public constructor(public orchestrator: {
        value: Orchestrator;
    } | undefined, public host: CompilerHost__from_compiler | undefined, public extendedConfigCache: ExtendedConfigCache__from_tsc, public sourceFiles: parseCache<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public configTimes: SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Duration>, public resolvedReferences: parseCache<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>, public mTimes: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined) {
    }
    static $copy($source: host): host {
        return new host($source.orchestrator, $source.host, ExtendedConfigCache__from_tsc.$copy($source.extendedConfigCache), parseCache.$copy<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>($source.sourceFiles), SyncMap__from_collections.$copy<Path__from_tspath, time__from_gostdlib.Duration>($source.configTimes), parseCache.$copy<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>($source.resolvedReferences), $source.mTimes);
    }
    declare private readonly then?: never;
    static DefaultLibraryPath(h: {
        value: host;
    } | undefined): gostring {
        const __gotots_receiver_4: host["host"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        return goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_4).DefaultLibraryPath();
    }
    static FS(h: {
        value: host;
    } | undefined): FS__from_vfs | undefined {
        const __gotots_receiver_2: host["host"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        return goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_2).FS();
    }
    static GetCurrentDirectory(h: {
        value: host;
    } | undefined): gostring {
        const __gotots_receiver_5: host["host"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        return goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_5).GetCurrentDirectory();
    }
    static GetMTime(h: {
        value: host;
    } | undefined, file: gostring): time__from_gostdlib.Time {
        return host.$go$private$build$loadOrStoreMTime(h, file, void 0, true);
    }
    static GetResolvedProjectReference(h: {
        value: host;
    } | undefined, fileName: gostring, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_store_0 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return parseCache$loadOrStore$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "resolvedReferences"), path, (path__shadow_1: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
            const __gotots_receiver_0 = ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
            let configStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_0).Now();
            let commandLineRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = void 0;
            {
                const __gotots_results_0 = (($value: GoInterface | undefined): [
                    tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [void 0, false];
                    }
                    return [$value.$go$value, true];
                })((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Raw);
                let raw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    const __gotots_struct_0 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
                        return GoMap.nil();
                    });
                    let wrapped: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_0);
                    OrderedMap$Set$string$Interface_void(wrapped, "compilerOptions", new GoInterfaceAdapter(raw));
                    commandLineRaw = wrapped;
                }
            }
            const __gotots_argument_0 = fileName;
            const __gotots_argument_1 = path__shadow_1;
            const __gotots_argument_2: ParsedBuildCommandLine__from_tsoptions["CompilerOptions"] = (((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions;
            const __gotots_argument_3 = commandLineRaw;
            const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_Named_build$host(h);
            const __gotots_store_1 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_5 = new $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "extendedConfigCache"));
            const __gotots_results_1 = GetParsedCommandLineOfConfigFilePath__from_tsoptions(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
            let commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_1[0];
            const __gotots_receiver_1 = ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
            let configTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_1).Now().Sub(named_time.TimeOperations.$copy(configStart));
            const __gotots_store_2 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$Named_tspath$Path$Named_time$Duration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "configTimes"), path__shadow_1, configTime);
            return commandLine;
        }, true);
    }
    static GetSourceFile(h: {
        value: host;
    } | undefined, opts: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        if (IsDeclarationFileName__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).FileName) || FileExtensionIs__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).FileName, ExtensionJson$string__from_tspath)) {
            const __gotots_store_3 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "sourceFiles");
            const __gotots_argument_9 = SourceFileParseOptions__from_ast.$copy(opts);
            const __gotots_receiver_6 = goInterfaceNonNil((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
            const __gotots_argument_10 = DeferredCallableRegistry.register(($argument0: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => __gotots_receiver_6.GetSourceFile($argument0), ($go$recovery: GoRecovery, $argument0: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
                const __gotots_receiver_7: CompilerHost__from_compiler = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_6);
                const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$GetSourceFile$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile, __gotots_receiver_7);
                return __gotots_deferred_0 === undefined ? __gotots_receiver_7.GetSourceFile($argument0) : __gotots_deferred_0($go$recovery, __gotots_receiver_7, $argument0);
            });
            const __gotots_argument_11 = false;
            return parseCache$loadOrStore$Named_ast$SourceFileParseOptions$PointerTo_Named_ast$SourceFile(__gotots_receiver_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
        }
        const __gotots_receiver_9: host["host"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_12 = SourceFileParseOptions__from_ast.$copy(opts);
        return goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_9).GetSourceFile(__gotots_argument_12);
    }
    static ReadBuildInfo(h: {
        value: host;
    } | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<BuildInfo__from_incremental> | undefined {
        let configPath = Orchestrator.$go$private$build$toPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, ParsedCommandLine__from_tsoptions.ConfigName(config));
        let task: {
            value: BuildTask;
        } | undefined = Orchestrator.$go$private$build$getTask((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, configPath);
        const __gotots_results_6 = BuildTask.$go$private$build$loadOrStoreBuildInfo(task, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, Orchestrator.$go$private$build$toPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, ParsedCommandLine__from_tsoptions.ConfigName(config)), ParsedCommandLine__from_tsoptions.GetBuildInfoFileName(config));
        let buildInfo: tsonicTypeScriptRuntime.Location<BuildInfo__from_incremental> | undefined = __gotots_results_6[0];
        return buildInfo;
    }
    static SetMTime(h: {
        value: host;
    } | undefined, file: gostring, mTime: time__from_gostdlib.Time): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_3 = host.FS(h);
        const __gotots_argument_6 = file;
        const __gotots_struct_1 = named_time.TimeOperations.$zero();
        const __gotots_argument_7 = __gotots_struct_1;
        const __gotots_argument_8 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).Chtimes(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
    }
    static Trace(h: {
        value: host;
    } | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        const __gotots_argument_13 = new $goInterfaceAdapter$string("build.Orchestrator.host does not support tracing, use a different host for tracing");
        GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
    }
    static $go$private$build$loadOrStoreMTime(h: {
        value: host;
    } | undefined, file: gostring, oldCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined, store: bool): time__from_gostdlib.Time {
        let path = Orchestrator.$go$private$build$toPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, file);
        {
            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$Named_time$Time((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes, path);
            let existing = __gotots_results_2[0];
            let loaded = __gotots_results_2[1];
            if (loaded) {
                return named_time.TimeOperations.$copy(existing);
            }
        }
        let found = false;
        let mTime = named_time.TimeOperations.$zero();
        if (!(oldCache === undefined)) {
            const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$Named_time$Time(oldCache, path);
            mTime = __gotots_results_3[0];
            found = __gotots_results_3[1];
        }
        if (!found) {
            mTime = GetMTime__from_incremental((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, file);
        }
        if (store) {
            const __gotots_results_4 = SyncMap$LoadOrStore$Named_tspath$Path$Named_time$Time((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes, path, named_time.TimeOperations.$copy(mTime));
            mTime = __gotots_results_4[0];
        }
        return named_time.TimeOperations.$copy(mTime);
    }
    static $go$private$build$storeMTime(h: {
        value: host;
    } | undefined, file: gostring, mTime: time__from_gostdlib.Time): void {
        let path = Orchestrator.$go$private$build$toPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, file);
        SyncMap$Store$Named_tspath$Path$Named_time$Time((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes, path, named_time.TimeOperations.$copy(mTime));
    }
    static $go$private$build$storeMTimeFromOldCache(h: {
        value: host;
    } | undefined, file: gostring, oldCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined): void {
        let path = Orchestrator.$go$private$build$toPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.orchestrator, file);
        {
            const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$Named_time$Time(oldCache, path);
            let mTime = __gotots_results_5[0];
            let found = __gotots_results_5[1];
            if (found) {
                SyncMap$Store$Named_tspath$Path$Named_time$Time((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes, path, named_time.TimeOperations.$copy(mTime));
            }
        }
    }
}
