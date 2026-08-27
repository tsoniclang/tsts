import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FileHandle } from "./overlayfs.js";
import type { Project } from "./project.js";
import type { ProjectCollectionBuilder } from "./projectcollectionbuilder.js";
import type { SessionOptions } from "./session.js";
import type { SnapshotFS } from "./snapshotfs.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state as $state__locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { LogTree as LogTree__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { RefCountCache$Acquire$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Acquire.js";
import { $goInterfaceAdapter$PointerTo_Named_project$SnapshotFS, $goInterfaceAdapter$PointerTo_Named_project$snapshotFSBuilder, $goInterfaceAdapter$PointerTo_Named_project$sourceFS, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { ConfigFileRegistry } from "./configfileregistry.js";
import { configFileRegistryBuilder } from "./configfileregistrybuilder.js";
import { NewParseCacheKey, ParseCacheKey } from "./parsecache.js";
import { newSourceFS, sourceFS } from "./snapshotfs.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class compilerHost {
    declare private readonly $goType: void;
    public constructor(public configFilePath: Path__from_tspath, public currentDirectory: gostring, public sessionOptions: {
        value: SessionOptions;
    } | undefined, public sourceFS: {
        value: sourceFS;
    } | undefined, public configFileRegistry: {
        value: ConfigFileRegistry;
    } | undefined, public project: {
        value: Project;
    } | undefined, public builder: {
        value: ProjectCollectionBuilder;
    } | undefined, public logger: {
        value: LogTree__from_logging;
    } | undefined) {
    }
    static $copy($source: compilerHost): compilerHost {
        return new compilerHost($source.configFilePath, $source.currentDirectory, $source.sessionOptions, $source.sourceFS, $source.configFileRegistry, $source.project, $source.builder, $source.logger);
    }
    static $equal($left: compilerHost, $right: compilerHost): bool {
        return $left.configFilePath.$value === $right.configFilePath.$value && $left.currentDirectory === $right.currentDirectory &&
            $left.sessionOptions
                ===
                    $right.sessionOptions &&
            $left.sourceFS
                ===
                    $right.sourceFS &&
            $left.configFileRegistry
                ===
                    $right.configFileRegistry &&
            $left.project
                ===
                    $right.project &&
            $left.builder
                ===
                    $right.builder &&
            $left.logger
                ===
                    $right.logger;
    }
    static $hash($source: compilerHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.configFilePath.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.currentDirectory));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.sessionOptions));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.sourceFS));
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.configFileRegistry));
        $hash = GoMapHash.mix($hash, (($pointer4: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer4 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer4)))($source.project));
        $hash = GoMapHash.mix($hash, (($pointer5: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer5 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer5)))($source.builder));
        $hash = GoMapHash.mix($hash, (($pointer6: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer6 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer6)))($source.logger));
        return $hash;
    }
    declare private readonly then?: never;
    static DefaultLibraryPath(c: {
        value: compilerHost;
    } | undefined): gostring {
        return ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DefaultLibraryPath;
    }
    static FS(c: {
        value: compilerHost;
    } | undefined): FS__from_vfs | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_project$sourceFS((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS);
    }
    static GetCurrentDirectory(c: {
        value: compilerHost;
    } | undefined): gostring {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
    }
    static GetResolvedProjectReference(c: {
        value: compilerHost;
    } | undefined, fileName: gostring, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder === undefined) {
            return ConfigFileRegistry.GetConfig((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry, path);
        }
        else {
            sourceFS.Track((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS, fileName);
            return configFileRegistryBuilder.$go$private$project$acquireConfigForProject(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, fileName, path, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.project, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger);
        }
    }
    static GetSourceFile(c: {
        value: compilerHost;
    } | undefined, opts: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        compilerHost.$go$private$project$ensureAlive(c);
        {
            let fh: FileHandle | undefined = sourceFS.GetFileByPath((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS, SourceFileParseOptions__from_ast.$storageOf(opts).FileName, new Path__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).Path));
            if (!(fh === undefined)) {
                const __gotots_argument_1 = SourceFileParseOptions__from_ast.$copy(opts);
                const __gotots_receiver_0 = fh;
                const __gotots_argument_2 = goInterfaceNonNil<FileHandle>(__gotots_receiver_0).Hash();
                const __gotots_receiver_1 = fh;
                const __gotots_argument_3 = goInterfaceNonNil<FileHandle>(__gotots_receiver_1).Kind();
                let key = NewParseCacheKey(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
                return RefCountCache$Acquire$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, ParseCacheKey.$copy(key), fh);
            }
        }
        return void 0;
    }
    static Trace(c: {
        value: compilerHost;
    } | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        LogTree__from_logging.Log((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Message__from_diagnostics.Localize(msg, Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default)), args))]));
    }
    static $go$private$project$ensureAlive(c: {
        value: compilerHost;
    } | undefined): void {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder === undefined || (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.project === undefined) {
            const __gotots_argument_4 = new GoInterfaceAdapter("method must not be called after snapshot initialization");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        }
    }
    static $go$private$project$freeze(c: {
        value: compilerHost;
    } | undefined, snapshotFS: {
        value: SnapshotFS;
    } | undefined, configFileRegistry: {
        value: ConfigFileRegistry;
    } | undefined): void {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder === undefined) {
            const __gotots_argument_0 = new GoInterfaceAdapter("freeze can only be called once");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source = new $goInterfaceAdapter$PointerTo_Named_project$SnapshotFS(snapshotFS);
        sourceFS.DisableTracking((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS);
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry = configFileRegistry;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder = void 0;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.project = void 0;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger = void 0;
    }
}
export function newCompilerHost(currentDirectory: gostring, project: {
    value: Project;
} | undefined, builder: {
    value: ProjectCollectionBuilder;
} | undefined, logger: {
    value: LogTree__from_logging;
} | undefined): {
    value: compilerHost;
} | undefined {
    return { value: new compilerHost((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, currentDirectory, (builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions, newSourceFS(true, new $goInterfaceAdapter$PointerTo_Named_project$snapshotFSBuilder((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs), (builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath), void 0, project, builder, logger) };
}
