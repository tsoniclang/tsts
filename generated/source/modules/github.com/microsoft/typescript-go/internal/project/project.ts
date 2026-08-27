import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CheckerPool as CheckerPool__from_compiler, DuplicateSourceFile as DuplicateSourceFile__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ProjectCollectionBuilder } from "./projectcollectionbuilder.js";
import type { SessionOptions } from "./session.js";
import type { snapshotFSBuilder, sourceFS } from "./snapshotfs.js";
import type { PatternsAndIgnored, PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage, WatchedFiles } from "./watch.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint64 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewProgram as NewProgram__from_compiler, ProgramOptions as ProgramOptions__from_compiler, Program as Program__from_compiler, SortAndDeduplicateDiagnostics as SortAndDeduplicateDiagnostics__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitReactJSX$constant as JsxEmitReactJSX$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleResolutionKindBundler$constant as ModuleResolutionKindBundler$constant__from_core, ScriptTargetLatestStandard$constant as ScriptTargetLatestStandard$constant__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, TypeAcquisition as TypeAcquisition__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetClientCapabilities as GetClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { TypingsInfo as TypingsInfo__from_ata } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/package.js";
import { LogTree as LogTree__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/state.js";
import { NewParsedCommandLine as NewParsedCommandLine__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ConvertToRelativePath as ConvertToRelativePath__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clone$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clone.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Concatenate$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Concatenate.js";
import { Identity$Named_project$PatternsAndIgnored } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { NewWatchedFiles$Named_project$PatternsAndIgnored, NewWatchedFiles$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/NewWatchedFiles.js";
import { RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Deref.js";
import { RefCountCache$Ref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Ref.js";
import { WatchedFiles$Clone$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/WatchedFiles$Clone.js";
import { $goInterfaceAdapter$PointerTo_Named_project$checkerPool, $goInterfaceAdapter$PointerTo_Named_project$compilerHost, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { CheckerPoolOptions, checkerPool, newCheckerPool } from "./checkerpool.js";
import { compilerHost } from "./compilerhost.js";
import { NewParseCacheKey } from "./parsecache.js";
import { _Kind_name$string } from "./project_stringer_generated.js";
import { ProjectTreeRequest } from "./snapshot.js";
import { createResolutionLookupGlobMapper } from "./watch.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export const inferredProjectName$string: gostring = "/dev/null/inferred";
export const hr$string: gostring = "-----------------------------------------------";
export class Kind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    String(): gostring {
        let idx = this.$value - 0;
        if (this.$value < 0 || idx >= 2) {
            return "Kind(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(this.$value)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
        }
        return goStringSlice(_Kind_name$string, $state._Kind_index.get(idx), $state._Kind_index.get(idx + 1));
    }
}
export function KindInferred$constant(): Kind {
    return new Kind(0);
}
export function KindConfigured$constant(): Kind {
    return new Kind(1);
}
export class ProgramUpdateKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ProgramUpdateKindNone$constant(): ProgramUpdateKind {
    return new ProgramUpdateKind(0);
}
export function ProgramUpdateKindCloned$constant(): ProgramUpdateKind {
    return new ProgramUpdateKind(1);
}
export function ProgramUpdateKindSameFileNames$constant(): ProgramUpdateKind {
    return new ProgramUpdateKind(2);
}
export function ProgramUpdateKindNewFiles$constant(): ProgramUpdateKind {
    return new ProgramUpdateKind(3);
}
export class PendingReload {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function PendingReloadNone$constant(): PendingReload {
    return new PendingReload(0);
}
export function PendingReloadFileNames$constant(): PendingReload {
    return new PendingReload(1);
}
export function PendingReloadFull$constant(): PendingReload {
    return new PendingReload(2);
}
export class Project {
    declare private readonly $goType: void;
    public constructor(public Kind: Kind, public currentDirectory: gostring, public configFileName: gostring, public configFilePath: Path__from_tspath, public dirty: bool, public dirtyFilePath: Path__from_tspath, public host: {
        value: compilerHost;
    } | undefined, public CommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public commandLineWithTypingsFiles: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public commandLineWithTypingsFilesOnce: sync__from_gostdlib.Once, public Program: {
        value: Program__from_compiler;
    } | undefined, public ProgramUpdateKind: ProgramUpdateKind, public ProgramLastUpdate: uint64, public potentialProjectReferences: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, public programFilesWatch: {
        value: WatchedFiles<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
    } | undefined, public typingsWatch: {
        value: WatchedFiles<PatternsAndIgnored>;
    } | undefined, public checkerPool: {
        value: checkerPool;
    } | undefined, public installedTypingsInfo: tsonicTypeScriptRuntime.Location<TypingsInfo__from_ata> | undefined, public typingsFiles: RuntimeSlice<gostring>) {
    }
    static $copy($source: Project): Project {
        return new Project($source.Kind, $source.currentDirectory, $source.configFileName, $source.configFilePath, $source.dirty, $source.dirtyFilePath, $source.host, $source.CommandLine, $source.commandLineWithTypingsFiles, named_sync.SyncOnceOperations.$copy($source.commandLineWithTypingsFilesOnce), $source.Program, $source.ProgramUpdateKind, $source.ProgramLastUpdate, $source.potentialProjectReferences, $source.programFilesWatch, $source.typingsWatch, $source.checkerPool, $source.installedTypingsInfo, $source.typingsFiles);
    }
    declare private readonly then?: never;
    static Clone(p: {
        value: Project;
    } | undefined): {
        value: Project;
    } | undefined {
        return { value: new Project((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFiles, named_sync.SyncOnceOperations.$zero(), (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program, ProgramUpdateKindNone$constant(), (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.installedTypingsInfo, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles) };
    }
    static CloneWatchers(p: {
        value: Project;
    } | undefined): {
        value: WatchedFiles<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
    } | undefined {
        return WatchedFiles$Clone$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch, (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles);
    }
    static ComputeTypingsInfo(p: {
        value: Project;
    } | undefined): TypingsInfo__from_ata {
        return new TypingsInfo__from_ata(Project.GetTypeAcquisition(p), ParsedCommandLine__from_tsoptions.CompilerOptions((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine), Project.GetUnresolvedImports(p));
    }
    static ConfigFilePath(p: {
        value: Project;
    } | undefined): Path__from_tspath {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("ConfigFilePath called on non-configured project");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath;
    }
    static CreateProgram(p: {
        value: Project;
    } | undefined): CreateProgramResult {
        let updateKind = ProgramUpdateKindNewFiles$constant();
        let programCloned = false;
        let newProgram: {
            value: Program__from_compiler;
        } | undefined = void 0;
        let createCheckerPool: (($0: {
            value: Program__from_compiler;
        } | undefined) => CheckerPool__from_compiler | undefined) | undefined = (program: {
            value: Program__from_compiler;
        } | undefined): CheckerPool__from_compiler | undefined => {
            const __gotots_argument_4 = CheckerPoolOptions.$copy((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckerPoolOptions);
            const __gotots_argument_5 = program;
            const __gotots_receiver_9 = p;
            const __gotots_argument_6 = ($argument0: gostring): void => {
                Project.$go$private$project$log(__gotots_receiver_9, $argument0);
            };
            return new $goInterfaceAdapter$PointerTo_Named_project$checkerPool(newCheckerPool(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6));
        };
        let commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = Project.$go$private$project$getCommandLineWithTypingsFiles(p);
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath.$value ===
            ((void Path__from_tspath,
                "") as string)) && !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(Program__from_compiler.CommandLine((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program), commandLine)) {
            let dirtyFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
            const __gotots_results_0 = Program__from_compiler.UpdateProgram((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath, new $goInterfaceAdapter$PointerTo_Named_project$compilerHost((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host), createCheckerPool);
            newProgram = __gotots_results_0[0];
            dirtyFile = __gotots_results_0[1];
            programCloned = __gotots_results_0[2];
            if (programCloned) {
                updateKind = ProgramUpdateKindCloned$constant();
                const __gotots_range_3 = Program__from_compiler.SourceFiles(newProgram);
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                    const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_2);
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_5;
                    if (!tsonicTypeScriptRuntime.sameLocation(file, dirtyFile)) {
                        RefCountCache$Ref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, NewParseCacheKey(SourceFile__from_ast.ParseOptions(file), Uint128__from_xxh3.$copy(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash), ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind));
                    }
                }
                const __gotots_range_4 = Program__from_compiler.DuplicateSourceFiles(newProgram);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                    const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_3);
                    let file: {
                        value: DuplicateSourceFile__from_compiler;
                    } | undefined = __gotots_range_value_6;
                    RefCountCache$Ref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, NewParseCacheKey(SourceFileParseOptions__from_ast.$copy((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParseOptions), Uint128__from_xxh3.$copy((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hash), (file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptKind));
                }
            }
            else if (!(dirtyFile === undefined)) {
                RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, NewParseCacheKey(SourceFile__from_ast.ParseOptions(dirtyFile), Uint128__from_xxh3.$copy(((dirtyFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash), ((dirtyFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind));
            }
        }
        else {
            let typingsLocation = "";
            if (Tristate_IsTrue__from_core((Project.GetTypeAcquisition(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable)) {
                typingsLocation = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation;
            }
            newProgram = NewProgram__from_compiler(new ProgramOptions__from_compiler(new $goInterfaceAdapter$PointerTo_Named_project$compilerHost((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host), commandLine, true, 0, createCheckerPool, typingsLocation, "", void 0));
        }
        if (!programCloned && !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) && Program__from_compiler.HasSameFileNames((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program, newProgram)) {
            updateKind = ProgramUpdateKindSameFileNames$constant();
        }
        Program__from_compiler.BindSourceFiles(newProgram);
        return new CreateProgramResult(newProgram, updateKind);
    }
    static DisplayName(p: {
        value: Project;
    } | undefined, cwd: gostring): gostring {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindInferred$constant().$value) {
            return GetBaseFileName__from_tspath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory);
        }
        return ConvertToRelativePath__from_tspath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName, new ComparePathsOptions__from_tspath(false, cwd));
    }
    static GetProgram(p: {
        value: Project;
    } | undefined): {
        value: Program__from_compiler;
    } | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program;
    }
    static GetProjectDiagnostics(p: {
        value: Project;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        let globalDiags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool === undefined)) {
            globalDiags = checkerPool.GetGlobalDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool);
        }
        return SortAndDeduplicateDiagnostics__from_compiler(Concatenate$PointerTo_Named_ast$Diagnostic(Program__from_compiler.GetProgramDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program), globalDiags));
    }
    static GetTypeAcquisition(p: {
        value: Project;
    } | undefined): {
        value: TypeAcquisition__from_core;
    } | undefined {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindInferred$constant().$value) {
            return { value: new TypeAcquisition__from_core(TSTrue$constant__from_core(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), TSFalse$constant__from_core()) };
        }
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined)) {
            return ParsedCommandLine__from_tsoptions.TypeAcquisition((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
        }
        return void 0;
    }
    static GetUnresolvedImports(p: {
        value: Project;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) {
            return void 0;
        }
        return Program__from_compiler.GetUnresolvedImports((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program);
    }
    static HasFile(p: {
        value: Project;
    } | undefined, fileName: gostring): bool {
        return Project.$go$private$project$containsFile(p, Project.$go$private$project$toPath(p, fileName));
    }
    static ID(p: {
        value: Project;
    } | undefined): Path__from_tspath {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath;
    }
    static Id(p: {
        value: Project;
    } | undefined): Path__from_tspath {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath;
    }
    static IsSourceFromProjectReference(p: {
        value: Project;
    } | undefined, path: Path__from_tspath): bool {
        return !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) && Program__from_compiler.IsSourceFromProjectReference((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program, path);
    }
    static Name(p: {
        value: Project;
    } | undefined): gostring {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName;
    }
    static SetCommandLine(p: {
        value: Project;
    } | undefined, commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): void {
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine = commandLine;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFiles = void 0;
        const __gotots_struct_1 = named_sync.SyncOnceOperations.$zero();
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFilesOnce = __gotots_struct_1;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences = void 0;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = new Path__from_tspath("");
    }
    static ShouldTriggerATA(p: {
        value: Project;
    } | undefined, snapshotID: uint64): bool {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined) {
            return false;
        }
        let typeAcquisition: {
            value: TypeAcquisition__from_core;
        } | undefined = Project.GetTypeAcquisition(p);
        if (typeAcquisition === undefined || !Tristate_IsTrue__from_core((typeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable)) {
            return false;
        }
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.installedTypingsInfo === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate === snapshotID && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind.$value === ProgramUpdateKindNewFiles$constant().$value) {
            return true;
        }
        return !(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.installedTypingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo__from_ata>).value.Equals(Project.ComputeTypingsInfo(p));
    }
    static $go$private$project$containsFile(p: {
        value: Project;
    } | undefined, path: Path__from_tspath): bool {
        return !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) && !(Program__from_compiler.GetSourceFileByPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program, path) === undefined);
    }
    static $go$private$project$getCommandLineWithTypingsFiles(p: {
        value: Project;
    } | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles.length === 0) {
            return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine;
        }
        let typeAcquisition: {
            value: TypeAcquisition__from_core;
        } | undefined = Project.GetTypeAcquisition(p);
        if (typeAcquisition === undefined || !Tristate_IsTrue__from_core((typeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable)) {
            return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine;
        }
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFilesOnce, (): void => {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFiles === undefined) {
                let originalRootNames = ParsedCommandLine__from_tsoptions.FileNames((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
                let newRootNames = RuntimeSlice.make<gostring>(0, originalRootNames.length + (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles.length, "");
                newRootNames = goSliceAppendSlice<gostring>(newRootNames, originalRootNames, "");
                newRootNames = goSliceAppendSlice<gostring>(newRootNames, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles, "");
                const __gotots_argument_21 = ParsedCommandLine__from_tsoptions.CompilerOptions((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
                const __gotots_argument_22 = newRootNames;
                const __gotots_receiver_13 = compilerHost.FS((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
                const __gotots_field_12 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13).UseCaseSensitiveFileNames();
                const __gotots_argument_23 = new ComparePathsOptions__from_tspath(__gotots_field_12, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory);
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFiles = NewParsedCommandLine__from_tsoptions(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
            }
        });
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLineWithTypingsFiles;
    }
    static $go$private$project$hasPotentialProjectReference(p: {
        value: Project;
    } | undefined, projectTreeRequest: ProjectTreeRequest | undefined): bool {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined)) {
            const __gotots_range_1 = ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let path = __gotots_range_value_1;
                if (ProjectTreeRequest.IsProjectReferenced(projectTreeRequest, Project.$go$private$project$toPath(p, path))) {
                    return true;
                }
            }
        }
        else if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences === undefined)) {
            const __gotots_range_2 = Set$Keys$Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences);
            const __gotots_range_keys_0 = __gotots_range_2.keys();
            for (const __gotots_range_value_2 of __gotots_range_keys_0) {
                const __gotots_range_value_3 = __gotots_range_2.lookupOk(__gotots_range_value_2);
                if (!__gotots_range_value_3[1]) {
                    continue;
                }
                const __gotots_range_value_4 = __gotots_range_value_2;
                let path = __gotots_range_value_4;
                if (ProjectTreeRequest.IsProjectReferenced(projectTreeRequest, path)) {
                    return true;
                }
            }
        }
        return false;
    }
    static $go$private$project$log(p: {
        value: Project;
    } | undefined, msg: gostring): void {
    }
    static $go$private$project$print(p: {
        value: Project;
    } | undefined, writeFileNames: bool, writeFileExplanation: bool, builder: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined): gostring {
        const __gotots_receiver_0 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, fmt__from_gostdlib.Sprintf("\nProject '%s'\n", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Project.Name(p))])));
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) {
            const __gotots_receiver_1 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_1 === void 0 ? void 0 :
                (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\tFiles (0) NoProgram\n");
        }
        else {
            let sourceFiles = Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program);
            const __gotots_receiver_2 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
                (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, fmt__from_gostdlib.Sprintf("\tFiles (%d)\n", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(sourceFiles.length)])));
            if (writeFileNames) {
                const __gotots_range_0 = sourceFiles;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
                    const __gotots_receiver_3 = builder;
                    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3 === void 0 ? void 0 :
                        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\t\t");
                    const __gotots_receiver_4 = builder;
                    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
                        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, SourceFile__from_ast.FileName(sourceFile));
                    const __gotots_receiver_5 = builder;
                    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_5 === void 0 ? void 0 :
                        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\n");
                }
            }
        }
        const __gotots_receiver_6 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_6 === void 0 ? void 0 :
            (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, hr$string);
        const __gotots_receiver_7 = builder;
        return strings__from_gostdlib.Builder.String(__gotots_receiver_7 === void 0 ? void 0 :
            (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value);
    }
    static $go$private$project$setPotentialProjectReference(p: {
        value: Project;
    } | undefined, configFilePath: Path__from_tspath): void {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences === undefined) {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences =
                tsonicTypeScriptRuntime.location<Set__from_collections<Path__from_tspath>>(Set__from_collections.$fromStorage<Path__from_tspath>({
                    M: GoMap.nil()
                }));
        }
        else {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences = Set$Clone$Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences);
        }
        Set$Add$Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences, configFilePath);
    }
    static $go$private$project$toPath(p: {
        value: Project;
    } | undefined, fileName: gostring): Path__from_tspath {
        const __gotots_argument_7 = fileName;
        const __gotots_argument_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
        const __gotots_receiver_10 = compilerHost.FS((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
        const __gotots_argument_9 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).UseCaseSensitiveFileNames();
        return ToPath__from_tspath(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
    }
}
export function NewConfiguredProject(configFileName: gostring, configFilePath: Path__from_tspath, builder: {
    value: ProjectCollectionBuilder;
} | undefined, logger: {
    value: LogTree__from_logging;
} | undefined): {
    value: Project;
} | undefined {
    return NewProject(configFileName, KindConfigured$constant(), GetDirectoryPath__from_tspath(configFileName), builder, logger);
}
export function NewInferredProject(currentDirectory: gostring, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, rootFileNames: RuntimeSlice<gostring>, builder: {
    value: ProjectCollectionBuilder;
} | undefined, logger: {
    value: LogTree__from_logging;
} | undefined): {
    value: Project;
} | undefined {
    let p: {
        value: Project;
    } | undefined = NewProject(inferredProjectName$string, KindInferred$constant(), currentDirectory, builder, logger);
    if (compilerOptions === undefined) {
        const __gotots_field_0 = TSTrue$constant__from_core();
        const __gotots_field_1 = ModuleKindESNext$constant__from_core();
        const __gotots_field_2 = ModuleResolutionKindBundler$constant__from_core();
        const __gotots_field_3 = ScriptTargetLatestStandard$constant__from_core();
        const __gotots_field_4 = JsxEmitReactJSX$constant__from_core();
        const __gotots_field_5 = TSTrue$constant__from_core();
        const __gotots_field_6 = TSTrue$constant__from_core();
        const __gotots_field_7 = TSTrue$constant__from_core();
        const __gotots_field_8 = TSTrue$constant__from_core();
        const __gotots_field_9 = TSTrue$constant__from_core();
        const __gotots_field_10 = TSTrue$constant__from_core();
        const __gotots_struct_0 = CompilerOptions__from_core.$zero();
        __gotots_struct_0.AllowJs = __gotots_field_0;
        __gotots_struct_0.Module = __gotots_field_1;
        __gotots_struct_0.ModuleResolution = __gotots_field_2;
        __gotots_struct_0.Target = __gotots_field_3;
        __gotots_struct_0.Jsx = __gotots_field_4;
        __gotots_struct_0.AllowImportingTsExtensions = __gotots_field_5;
        __gotots_struct_0.StrictNullChecks = __gotots_field_6;
        __gotots_struct_0.StrictFunctionTypes = __gotots_field_7;
        __gotots_struct_0.SourceMap = __gotots_field_8;
        __gotots_struct_0.AllowNonTsExtensions = __gotots_field_9;
        __gotots_struct_0.ResolveJsonModule = __gotots_field_10;
        compilerOptions =
            { value: __gotots_struct_0 };
    }
    const __gotots_argument_1 = compilerOptions;
    const __gotots_argument_2 = rootFileNames;
    const __gotots_receiver_8 = ((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    const __gotots_field_11 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).UseCaseSensitiveFileNames();
    const __gotots_argument_3 = new ComparePathsOptions__from_tspath(__gotots_field_11, currentDirectory);
    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine = NewParsedCommandLine__from_tsoptions(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
    return p;
}
export function NewProject(configFileName: gostring, kind: Kind, currentDirectory: gostring, builder: {
    value: ProjectCollectionBuilder;
} | undefined, logger: {
    value: LogTree__from_logging;
} | undefined): {
    value: Project;
} | undefined {
    if (!(logger === undefined)) {
        LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Creating %sProject: %s, currentDirectory: %s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(kind.String()), new GoInterfaceAdapter(configFileName), new GoInterfaceAdapter(currentDirectory)])))]));
    }
    let project: {
        value: Project;
    } | undefined = { value: new Project(kind, currentDirectory, configFileName, new Path__from_tspath(""), true, new Path__from_tspath(""), void 0, void 0, void 0, named_sync.SyncOnceOperations.$zero(), void 0, new ProgramUpdateKind(0), 0n, void 0, void 0, void 0, void 0, void 0, RuntimeSlice.nil<gostring>()) };
    const __gotots_argument_10 = configFileName;
    const __gotots_argument_11 = currentDirectory;
    const __gotots_receiver_11 = ((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    const __gotots_argument_12 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).UseCaseSensitiveFileNames();
    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath = ToPath__from_tspath(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
    const __gotots_argument_17 = "program files for " + configFileName;
    const __gotots_argument_18 = 7;
    const __gotots_argument_19 = ((GetClientCapabilities__from_lsproto((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.DidChangeWatchedFiles.RelativePatternSupport;
    const __gotots_argument_13 = ((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
    const __gotots_argument_14 = ((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DefaultLibraryPath;
    const __gotots_argument_15 = (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
    const __gotots_receiver_12 = ((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    const __gotots_argument_16 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_12).UseCaseSensitiveFileNames();
    const __gotots_argument_20 = createResolutionLookupGlobMapper(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch = NewWatchedFiles$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path(__gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
    if (((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation !== "") {
        (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch = NewWatchedFiles$Named_project$PatternsAndIgnored("typings installer files", 7, ((GetClientCapabilities__from_lsproto((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.DidChangeWatchedFiles.RelativePatternSupport, ($argument0: PatternsAndIgnored): PatternsAndIgnored => {
            return Identity$Named_project$PatternsAndIgnored($argument0);
        });
    }
    return project;
}
export class CreateProgramResult {
    declare private readonly $goType: void;
    public constructor(public Program: {
        value: Program__from_compiler;
    } | undefined, public UpdateKind: ProgramUpdateKind) {
    }
    declare private readonly then?: never;
}
