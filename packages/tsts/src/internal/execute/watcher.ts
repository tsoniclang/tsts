import type { bool } from "../../go/scalars.js";
import type { GoError, GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import type { Context } from "../../go/context.js";
import { Fprintf } from "../../go/fmt.js";
import { DeepEqual as reflect_DeepEqual } from "../../go/reflect.js";
import { Map as SyncGoMap } from "../../go/sync.js";
import type { Time } from "../../go/time.js";
import type { SourceFile } from "../ast/ast.js";
import type { SourceFileParseOptions } from "../ast/parseoptions.js";
import { NewCompilerDiagnostic } from "../ast/diagnostic.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import type { Set } from "../collections/set.js";
import { NewSetWithSizeHint, Set_Add, Set_Has } from "../collections/set.js";
import type { SyncMap } from "../collections/syncmap.js";
import { SyncMap_Delete, SyncMap_Load, SyncMap_Range, SyncMap_Store } from "../collections/syncmap.js";
import type { SyncSet } from "../collections/syncset.js";
import { SyncSet_Add, SyncSet_ToSlice } from "../collections/syncset.js";
import type { CompilerHost } from "../compiler/host.js";
import { NewCompilerHost } from "../compiler/host.js";
import { NewProgram, Program_FilesByPath } from "../compiler/program.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import * as fswatch from "../fswatch/fswatch.js";
import type { ParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import {
  ParsedCommandLine_Locale,
  ParsedCommandLine_CompilerOptions,
  ParsedCommandLine_ExtendedSourceFiles,
  ParsedCommandLine_FileNames,
  ParsedCommandLine_PossiblyMatchesDirectoryName,
  ParsedCommandLine_PossiblyMatchesFileName,
  ParsedCommandLine_WildcardDirectories,
  ParsedCommandLine_ReloadFileNamesOfParsedCommandLine,
} from "../tsoptions/parsedcommandline.js";
import type { ComparePathsOptions, Path } from "../tspath/path.js";
import {
  GetDirectoryPath,
  GetNormalizedAbsolutePath,
  ToPath,
} from "../tspath/path.js";
import { From as cachedvfsFrom, FS_as_vfs_FS as cachedvfsAsVfsFS, FS_DisableAndClearCache } from "../vfs/cachedvfs/cachedvfs.js";
import type { FS as TrackingFS } from "../vfs/trackingvfs/trackingvfs.js";
import { FS_as_vfs_FS as trackingFSAsVfsFS } from "../vfs/trackingvfs/trackingvfs.js";
import * as diagnosticMessages from "../diagnostics/generated/messages.js";
import { GetTraceWithWriterFromSys } from "./tsc/emit.js";
import type { Program } from "./incremental/program.js";
import {
  NewProgram as IncrementalNewProgram,
  Program_as_compiler_ProgramLike as IncrementalProgramAsCompilerProgramLike,
  Program_GetProgram,
} from "./incremental/program.js";
import {
  ReadBuildInfoProgram,
  NewBuildInfoReader,
} from "./incremental/incremental.js";
import type { CommandLineTesting, CompileAndEmitResult, System, Watcher as Watcher_c5dada01 } from "./tsc/compile.js";
import { CreateWatchStatusReporter } from "./tsc/diagnostics.js";
import type { DiagnosticReporter, DiagnosticsReporter } from "./tsc/diagnostics.js";
import { GetParsedCommandLineOfConfigFile } from "../tsoptions/tsconfigparsing.js";
import { ExtendedConfigCache_as_tsoptions_ExtendedConfigCache, type ExtendedConfigCache } from "./tsc/extendedconfigcache.js";
import { EmitFilesAndReportErrors } from "./tsc/emit.js";
import { CanWatchDirectory, GetCommandLineTestingWatchBackend } from "./watchmanager/watchbackend.js";
import type { WatchManager } from "./watchmanager/watchmanager.js";
import {
  IsDirCoveredByWatch,
  NewWatchManager,
  WatchManager_DrainEvents,
  WatchManager_EnsureDefaultBackend,
  WatchManager_ForceOverflow,
  WatchManager_IsPathUnderWatch,
  WatchManager_Lock,
  WatchManager_ReconcileWatches,
  WatchManager_ResolveDesiredDirs,
  WatchManager_RunLoop,
  WatchManager_SetBackend,
  WatchManager_Unlock,
} from "./watchmanager/watchmanager.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::type::cachedSourceFile","kind":"type","status":"implemented","sigHash":"09687ae4d0bc82215aab8c91746d0029f4280a603b1e1c93497af1183820b31d","bodyHash":"d8cbeff6207c7c328d055bc4a712ff6c00e4ab0b726cdd0ec198ed1ff9651acb"}
 *
 * Go source:
 * cachedSourceFile struct {
 * 	file    *ast.SourceFile
 * 	modTime time.Time
 * }
 */
export interface cachedSourceFile {
  file: GoPtr<SourceFile>;
  modTime: Time;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::type::watchCompilerHost","kind":"type","status":"implemented","sigHash":"eb3c7200342a1a34fb91c95ca7076a8eda6eed0a985019ec60d54bfd7b9cc291","bodyHash":"ce7346e77b8cb4af4af48914b1cf6e56cef5dd98bd01b2e97738d8dd431b7677"}
 *
 * Go source:
 * watchCompilerHost struct {
 * 	compiler.CompilerHost
 * 	cache *collections.SyncMap[tspath.Path, *cachedSourceFile]
 * }
 */
export interface watchCompilerHost {
  readonly __tsgoEmbedded0?: CompilerHost;
  cache: GoPtr<SyncMap<Path, GoPtr<cachedSourceFile>>>;
}

export function watchCompilerHost_as_compiler_CompilerHost(receiver: GoPtr<watchCompilerHost>): CompilerHost {
  const inner = receiver!.__tsgoEmbedded0!;
  return {
    FS: () => inner.FS(),
    DefaultLibraryPath: () => inner.DefaultLibraryPath(),
    GetCurrentDirectory: () => inner.GetCurrentDirectory(),
    Trace: (msg, ...args) => inner.Trace(msg, ...args),
    GetSourceFile: (opts) => watchCompilerHost_GetSourceFile(receiver, opts),
    GetResolvedProjectReference: (fileName, path) => inner.GetResolvedProjectReference(fileName, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::watchCompilerHost.GetSourceFile","kind":"method","status":"implemented","sigHash":"a46cae9b723ebb7938a073f5d67c1af9937c7e4e0f3ff022e90fda7c44dc3cbd","bodyHash":"6dc4e4f5f42f88a677159bd1e38a35cf0e2a718d201b22b3566b5e0a373cfaae"}
 *
 * Go source:
 * func (h *watchCompilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
 * 	info := h.CompilerHost.FS().Stat(opts.FileName)
 *
 * 	if cached, ok := h.cache.Load(opts.Path); ok {
 * 		if info != nil && info.ModTime().Equal(cached.modTime) {
 * 			return cached.file
 * 		}
 * 	}
 *
 * 	file := h.CompilerHost.GetSourceFile(opts)
 * 	if file != nil {
 * 		if info != nil {
 * 			h.cache.Store(opts.Path, &cachedSourceFile{
 * 				file:    file,
 * 				modTime: info.ModTime(),
 * 			})
 * 		}
 * 	} else {
 * 		h.cache.Delete(opts.Path)
 * 	}
 * 	return file
 * }
 */
export function watchCompilerHost_GetSourceFile(receiver: GoPtr<watchCompilerHost>, opts: SourceFileParseOptions): GoPtr<SourceFile> {
  const info = receiver!.__tsgoEmbedded0!.FS().Stat(opts.FileName);

  const [cached, ok] = SyncMap_Load(receiver!.cache as SyncMap<Path, GoPtr<cachedSourceFile>>, opts.Path);
  if (ok) {
    if (info !== undefined && info.ModTime().Equal(cached!.modTime)) {
      return cached!.file;
    }
  }

  const file = receiver!.__tsgoEmbedded0!.GetSourceFile(opts);
  if (file !== undefined) {
    if (info !== undefined) {
      SyncMap_Store(receiver!.cache as SyncMap<Path, GoPtr<cachedSourceFile>>, opts.Path, {
        file,
        modTime: info.ModTime(),
      });
    }
  } else {
    SyncMap_Delete(receiver!.cache as SyncMap<Path, GoPtr<cachedSourceFile>>, opts.Path);
  }
  return file;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::type::Watcher","kind":"type","status":"implemented","sigHash":"3c7720db1dd07fc5ed867242203119169d9e8b287c5f9fa9070d8b37e7c6e4e8","bodyHash":"8bf7c82d2cffb13943cb3f6185d44578ee7a5c9d189e61b7d61b7fbde2d259dd"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Watcher.testing is the nil Go testing interface outside tests, while configMtimes remains a nil map until the first successful config-time capture; TypeScript preserves both independent lifecycle sentinels with undefined.","goSignature":"interface{commandLineRaw:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/ordered_map.ts::OrderedMap<string,unknown>>;compilerOptionsFromCommandLine:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/core/compileroptions.ts::CompilerOptions>;config:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedcommandline.ts::ParsedCommandLine>;configFileName:string;configFilePaths:packages/tsts/src/go/compat.ts::GoSlice<string>;configHasErrors:packages/tsts/src/go/scalars.ts::bool;configModified:packages/tsts/src/go/scalars.ts::bool;configMtimes:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/go/time.ts::Time>;extendedConfigCache:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/tsc/extendedconfigcache.ts::ExtendedConfigCache>;program:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/incremental/program.ts::Program>;reportDiagnostic:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter;reportErrorSummary:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter;reportWatchStatus:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter;seenFiles:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/set.ts::Set<packages/tsts/src/internal/tspath/path.ts::Path>>;sourceFileCache:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/syncmap.ts::SyncMap<packages/tsts/src/internal/tspath/path.ts::Path,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watcher.ts::cachedSourceFile>>>;sys:packages/tsts/src/internal/execute/tsc/compile.ts::System;testing:packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting;wm:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>}","tsSignature":"interface{commandLineRaw:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/ordered_map.ts::OrderedMap<string,unknown>>;compilerOptionsFromCommandLine:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/core/compileroptions.ts::CompilerOptions>;config:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedcommandline.ts::ParsedCommandLine>;configFileName:string;configFilePaths:packages/tsts/src/go/compat.ts::GoSlice<string>;configHasErrors:packages/tsts/src/go/scalars.ts::bool;configModified:packages/tsts/src/go/scalars.ts::bool;configMtimes:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/go/time.ts::Time>|undefined;extendedConfigCache:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/tsc/extendedconfigcache.ts::ExtendedConfigCache>;program:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/incremental/program.ts::Program>;reportDiagnostic:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter;reportErrorSummary:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter;reportWatchStatus:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter;seenFiles:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/set.ts::Set<packages/tsts/src/internal/tspath/path.ts::Path>>;sourceFileCache:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/syncmap.ts::SyncMap<packages/tsts/src/internal/tspath/path.ts::Path,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watcher.ts::cachedSourceFile>>>;sys:packages/tsts/src/internal/execute/tsc/compile.ts::System;testing:packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting|undefined;wm:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>}"}
 *
 * Go source:
 * Watcher struct {
 * 	sys                            tsc.System
 * 	configFileName                 string
 * 	config                         *tsoptions.ParsedCommandLine
 * 	compilerOptionsFromCommandLine *core.CompilerOptions
 * 	commandLineRaw                 *collections.OrderedMap[string, any]
 * 	reportDiagnostic               tsc.DiagnosticReporter
 * 	reportErrorSummary             tsc.DiagnosticsReporter
 * 	reportWatchStatus              tsc.DiagnosticReporter
 * 	testing                        tsc.CommandLineTesting
 *
 * 	program             *incremental.Program
 * 	extendedConfigCache *tsc.ExtendedConfigCache
 * 	configModified      bool
 * 	configHasErrors     bool
 * 	configFilePaths     []string
 *
 * 	sourceFileCache *collections.SyncMap[tspath.Path, *cachedSourceFile]
 *
 * 	wm           *watchmanager.WatchManager
 * 	seenFiles    *collections.Set[tspath.Path] // all build dependencies (for event filtering)
 * 	configMtimes map[string]time.Time
 * }
 */
export interface Watcher {
  sys: System;
  configFileName: string;
  config: GoPtr<ParsedCommandLine>;
  compilerOptionsFromCommandLine: GoPtr<CompilerOptions>;
  commandLineRaw: GoPtr<OrderedMap<string, unknown>>;
  reportDiagnostic: DiagnosticReporter;
  reportErrorSummary: DiagnosticsReporter;
  reportWatchStatus: DiagnosticReporter;
  testing: CommandLineTesting | undefined;
  program: GoPtr<Program>;
  extendedConfigCache: GoPtr<ExtendedConfigCache>;
  configModified: bool;
  configHasErrors: bool;
  configFilePaths: GoSlice<string>;
  sourceFileCache: GoPtr<SyncMap<Path, GoPtr<cachedSourceFile>>>;
  wm: GoPtr<WatchManager>;
  seenFiles: GoPtr<Set<Path>>;
  configMtimes: GoMap<string, Time> | undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e","bodyHash":"e42466e9d55431436fd56f71ca20518e1ef306e5d2a89e987baac34aafe69adc"}
 *
 * Go source:
 * var _ tsc.Watcher = (*Watcher)(nil)
 */
export let __30d59bfd_0: Watcher_c5dada01 = Watcher_as_tsc_Watcher(undefined);

export function Watcher_as_tsc_Watcher(receiver: GoPtr<Watcher>): Watcher_c5dada01 {
  return {
    DoCycle: (): void => Watcher_DoCycle(receiver),
  };
}

function newSyncMap<K, V>(): SyncMap<K, V> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncGoMap() };
}

function newSyncSet<T>(): SyncSet<T> {
  return { m: newSyncMap<T, { readonly __tsgoEmpty?: never }>() };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::func::createWatcher","kind":"func","status":"implemented","sigHash":"0bd5b51e65f4826577017b4b24ad4ee240e6a42a38f2d93cc31bd1a9a18b236a","bodyHash":"a1261d67c2208d91ff6744b602a78c28160300da4ecfb3271a9b07d33bb6a64a"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"createWatcher accepts the nil Go CommandLineTesting interface for normal watch execution and conditionally installs testing hooks and backends only when present; TypeScript represents it with undefined.","goSignature":"func(packages/tsts/src/internal/execute/tsc/compile.ts::System,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedcommandline.ts::ParsedCommandLine>,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/core/compileroptions.ts::CompilerOptions>,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/ordered_map.ts::OrderedMap<string,unknown>>,packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter,packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter,packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting)=>packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watcher.ts::Watcher>","tsSignature":"func(packages/tsts/src/internal/execute/tsc/compile.ts::System,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedcommandline.ts::ParsedCommandLine>,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/core/compileroptions.ts::CompilerOptions>,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/ordered_map.ts::OrderedMap<string,unknown>>,packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter,packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter,packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting|undefined)=>packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watcher.ts::Watcher>"}
 *
 * Go source:
 * func createWatcher(
 * 	sys tsc.System,
 * 	configParseResult *tsoptions.ParsedCommandLine,
 * 	compilerOptionsFromCommandLine *core.CompilerOptions,
 * 	commandLineRaw *collections.OrderedMap[string, any],
 * 	reportDiagnostic tsc.DiagnosticReporter,
 * 	reportErrorSummary tsc.DiagnosticsReporter,
 * 	testing tsc.CommandLineTesting,
 * ) *Watcher {
 * 	wm := watchmanager.NewWatchManager(sys.Writer(), sys.FS().DirectoryExists)
 * 	if t, ok := testing.(watchmanager.CommandLineTestingWithWatchBackend); ok {
 * 		wm.SetBackend(t.WatchBackend())
 * 	}
 * 	w := &Watcher{
 * 		sys:                            sys,
 * 		config:                         configParseResult,
 * 		compilerOptionsFromCommandLine: compilerOptionsFromCommandLine,
 * 		commandLineRaw:                 commandLineRaw,
 * 		reportDiagnostic:               reportDiagnostic,
 * 		reportErrorSummary:             reportErrorSummary,
 * 		reportWatchStatus:              tsc.CreateWatchStatusReporter(sys, configParseResult.Locale(), configParseResult.CompilerOptions(), testing),
 * 		testing:                        testing,
 * 		sourceFileCache:                &collections.SyncMap[tspath.Path, *cachedSourceFile]{},
 * 		wm:                             wm,
 * 	}
 * 	if configParseResult.ConfigFile != nil {
 * 		w.configFileName = configParseResult.ConfigFile.SourceFile.FileName()
 * 	}
 * 	return w
 * }
 */
export function createWatcher(sys: System, configParseResult: GoPtr<ParsedCommandLine>, compilerOptionsFromCommandLine: GoPtr<CompilerOptions>, commandLineRaw: GoPtr<OrderedMap<string, unknown>>, reportDiagnostic: DiagnosticReporter, reportErrorSummary: DiagnosticsReporter, testing: CommandLineTesting | undefined): GoPtr<Watcher> {
  const sourceFileCache = newSyncMap<Path, GoPtr<cachedSourceFile>>();
  const wm = NewWatchManager(sys.Writer(), (path: string): bool => sys.FS().DirectoryExists(path));
  const backend = GetCommandLineTestingWatchBackend(testing);
  if (backend !== undefined) {
    WatchManager_SetBackend(wm, backend);
  }
  const w: Watcher = {
    sys,
    configFileName: "",
    config: configParseResult,
    compilerOptionsFromCommandLine,
    commandLineRaw,
    reportDiagnostic,
    reportErrorSummary,
    reportWatchStatus: CreateWatchStatusReporter(sys, ParsedCommandLine_Locale(configParseResult), ParsedCommandLine_CompilerOptions(configParseResult), testing),
    testing,
    program: undefined,
    extendedConfigCache: undefined,
    configModified: false,
    configHasErrors: false,
    configFilePaths: [],
    sourceFileCache: sourceFileCache,
    wm,
    seenFiles: undefined,
    configMtimes: undefined,
  };
  if (configParseResult!.ConfigFile !== undefined && configParseResult!.ConfigFile !== null) {
    w.configFileName = configParseResult!.ConfigFile!.SourceFile!.fileName;
  }
  return w;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.start","kind":"method","status":"implemented","sigHash":"7d0d0436308235fb0f443515a52ee9c102c605640ee9215d0bc93ddd23182af2","bodyHash":"9635c533f592bfe3aae65acf535e390a5545b3a3fe08d912ee788b59656852a4"}
 *
 * Go source:
 * func (w *Watcher) start(ctx context.Context) {
 * 	w.wm.Lock()
 * 	w.extendedConfigCache = &tsc.ExtendedConfigCache{}
 * 	host := compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), w.sys.FS(), w.sys.DefaultLibraryPath(), w.extendedConfigCache, getTraceFromSys(w.sys, w.config.Locale(), w.testing))
 * 	w.program = incremental.ReadBuildInfoProgram(w.config, incremental.NewBuildInfoReader(host), host)
 *
 * 	if w.configFileName != "" {
 * 		w.configFilePaths = append([]string{w.configFileName}, w.config.ExtendedSourceFiles()...)
 * 	}
 *
 * 	if w.sys.GetEnvironmentVariable("TS_WATCH_DEBUG") != "" {
 * 		w.wm.DebugLog = w.sys.Writer()
 * 	}
 *
 * 	if w.testing == nil {
 * 		w.wm.EnsureDefaultBackend()
 * 	}
 *
 * 	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
 * 	if err := w.doBuild(); err != nil {
 * 		w.wm.ForceOverflow()
 * 	}
 * 	w.wm.Unlock()
 *
 * 	if w.testing == nil {
 * 		w.wm.RunLoop(ctx, w.DoCycle)
 * 	}
 * }
 */
export function Watcher_start(receiver: GoPtr<Watcher>, ctx: Context): void {
  WatchManager_Lock(receiver!.wm);
  receiver!.extendedConfigCache = { m: newSyncMap() };
  const host = NewCompilerHost(
    receiver!.sys.GetCurrentDirectory(),
    receiver!.sys.FS(),
    receiver!.sys.DefaultLibraryPath(),
    ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(receiver!.extendedConfigCache),
    GetTraceWithWriterFromSys(receiver!.sys.Writer(), ParsedCommandLine_Locale(receiver!.config), receiver!.testing),
  );
  receiver!.program = ReadBuildInfoProgram(receiver!.config, NewBuildInfoReader(host), host);

  if (receiver!.configFileName !== "") {
    receiver!.configFilePaths = [receiver!.configFileName, ...ParsedCommandLine_ExtendedSourceFiles(receiver!.config)];
  }

  if (receiver!.sys.GetEnvironmentVariable("TS_WATCH_DEBUG") !== "") {
    receiver!.wm!.DebugLog = receiver!.sys.Writer();
  }

  if (receiver!.testing === undefined) {
    WatchManager_EnsureDefaultBackend(receiver!.wm);
  }

  receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.Starting_compilation_in_watch_mode));
  if (Watcher_doBuild(receiver) !== undefined) {
    WatchManager_ForceOverflow(receiver!.wm);
  }
  WatchManager_Unlock(receiver!.wm);

  if (receiver!.testing === undefined) {
    WatchManager_RunLoop(receiver!.wm, ctx, () => Watcher_DoCycle(receiver));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.computeDesiredWatches","kind":"method","status":"implemented","sigHash":"b44015b60ec8bb6c2989049374eef0e2dc35e20035b82454b3be8ddf5e89dd4b","bodyHash":"af2b03d2d7cb84037116cb80aab6762d4d7f027f462857b140e0a2a0fdf42dae"}
 *
 * Go source:
 * func (w *Watcher) computeDesiredWatches(seenFilePaths []string) map[string]bool {
 * 	cwd := w.sys.GetCurrentDirectory()
 *
 * 	desiredDirs := make(map[string]bool) // dir → recursive
 *
 * 	// Wildcard directories from tsconfig (recursive or non-recursive)
 * 	if w.config.ConfigFile != nil {
 * 		for dir, recursive := range w.config.WildcardDirectories() {
 * 			realDir := w.sys.FS().Realpath(dir)
 * 			desiredDirs[realDir] = recursive
 * 		}
 * 	}
 *
 * 	// For no-config CLI mode, ensure CWD is watched
 * 	if w.config.ConfigFile == nil && len(desiredDirs) == 0 {
 * 		dir := w.sys.FS().Realpath(cwd)
 * 		desiredDirs[dir] = false
 * 	}
 *
 * 	// Config file parent directories as non-recursive watches
 * 	for _, cfgPath := range w.configFilePaths {
 * 		realPath := w.sys.FS().Realpath(cfgPath)
 * 		dir := tspath.GetDirectoryPath(realPath)
 * 		if _, has := desiredDirs[dir]; !has {
 * 			desiredDirs[dir] = false
 * 		}
 * 	}
 *
 * 	// For no-config CLI mode, also watch the CLI-specified files' directories
 * 	if w.config.ConfigFile == nil {
 * 		for _, fileName := range w.config.FileNames() {
 * 			absPath := tspath.GetNormalizedAbsolutePath(fileName, cwd)
 * 			realPath := w.sys.FS().Realpath(absPath)
 * 			dir := tspath.GetDirectoryPath(realPath)
 * 			if _, has := desiredDirs[dir]; !has {
 * 				desiredDirs[dir] = false
 * 			}
 * 		}
 * 	}
 *
 * 	// Add parent directories for seen files not covered by existing dir watches.
 * 	// Resolve ancestor fallbacks first so coverage checks use final dirs.
 * 	resolvedDirs := w.wm.ResolveDesiredDirs(desiredDirs)
 *
 * 	opts := w.comparePathsOptions()
 * 	for _, filePath := range seenFilePaths {
 * 		dir := tspath.GetDirectoryPath(filePath)
 * 		if !watchmanager.IsDirCoveredByWatch(resolvedDirs, dir, opts) {
 * 			if watchmanager.CanWatchDirectory(dir) {
 * 				resolvedDirs[dir] = false
 * 			}
 * 		}
 * 	}
 *
 * 	// Re-resolve in case newly added dirs don't exist
 * 	return w.wm.ResolveDesiredDirs(resolvedDirs)
 * }
 */
export function Watcher_computeDesiredWatches(receiver: GoPtr<Watcher>, seenFilePaths: GoSlice<string>): GoMap<string, bool> {
  const cwd = receiver!.sys.GetCurrentDirectory();

  const desiredDirs: GoMap<string, bool> = new Map<string, bool>(); // dir → recursive

  // Wildcard directories from tsconfig (recursive or non-recursive)
  if (receiver!.config!.ConfigFile !== undefined) {
    for (const [dir, recursive] of ParsedCommandLine_WildcardDirectories(receiver!.config)) {
      const realDir = receiver!.sys.FS().Realpath(dir);
      desiredDirs.set(realDir, recursive);
    }
  }

  // For no-config CLI mode, ensure CWD is watched
  if (receiver!.config!.ConfigFile === undefined && desiredDirs.size === 0) {
    const dir = receiver!.sys.FS().Realpath(cwd);
    desiredDirs.set(dir, false as bool);
  }

  // Config file parent directories as non-recursive watches
  for (const cfgPath of receiver!.configFilePaths) {
    const realPath = receiver!.sys.FS().Realpath(cfgPath);
    const dir = GetDirectoryPath(realPath);
    if (!desiredDirs.has(dir)) {
      desiredDirs.set(dir, false as bool);
    }
  }

  // For no-config CLI mode, also watch the CLI-specified files' directories
  if (receiver!.config!.ConfigFile === undefined) {
    for (const fileName of ParsedCommandLine_FileNames(receiver!.config)) {
      const absPath = GetNormalizedAbsolutePath(fileName, cwd);
      const realPath = receiver!.sys.FS().Realpath(absPath);
      const dir = GetDirectoryPath(realPath);
      if (!desiredDirs.has(dir)) {
        desiredDirs.set(dir, false as bool);
      }
    }
  }

  // Add parent directories for seen files not covered by existing dir watches.
  // Resolve ancestor fallbacks first so coverage checks use final dirs.
  const resolvedDirs = WatchManager_ResolveDesiredDirs(receiver!.wm, desiredDirs);

  const opts = Watcher_comparePathsOptions(receiver);
  for (const filePath of seenFilePaths) {
    const dir = GetDirectoryPath(filePath);
    if (!IsDirCoveredByWatch(resolvedDirs, dir, opts)) {
      if (CanWatchDirectory(dir)) {
        resolvedDirs.set(dir, false as bool);
      }
    }
  }

  // Re-resolve in case newly added dirs don't exist
  return WatchManager_ResolveDesiredDirs(receiver!.wm, resolvedDirs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.reconcileWatches","kind":"method","status":"implemented","sigHash":"e04134e5cef8d4caeb31a94503de8edf3d2bde5705de0e556adb4b66df43da27","bodyHash":"1cf9f0b4ef595100970b5e253d1ef6c25827cd3c4c0298dafc83e749646f7743"}
 *
 * Go source:
 * func (w *Watcher) reconcileWatches(seenFilePaths []string) error {
 * 	desiredDirs := w.computeDesiredWatches(seenFilePaths)
 * 	return w.wm.ReconcileWatches(desiredDirs)
 * }
 */
export function Watcher_reconcileWatches(receiver: GoPtr<Watcher>, seenFilePaths: GoSlice<string>): GoError {
  const desiredDirs = Watcher_computeDesiredWatches(receiver, seenFilePaths);
  return WatchManager_ReconcileWatches(receiver!.wm, desiredDirs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.comparePathsOptions","kind":"method","status":"implemented","sigHash":"41c4a990b40652573eb143e5f1e5686d1c9e6ae0eda2b5cf2d34f1010a7f007e","bodyHash":"ff700a4d73c489098be768d356863b939ba23dc58baf3411cf90b5e83cfdd22b"}
 *
 * Go source:
 * func (w *Watcher) comparePathsOptions() tspath.ComparePathsOptions {
 * 	return tspath.ComparePathsOptions{
 * 		UseCaseSensitiveFileNames: w.sys.FS().UseCaseSensitiveFileNames(),
 * 		CurrentDirectory:          w.sys.GetCurrentDirectory(),
 * 	}
 * }
 */
export function Watcher_comparePathsOptions(receiver: GoPtr<Watcher>): ComparePathsOptions {
  return {
    UseCaseSensitiveFileNames: receiver!.sys.FS().UseCaseSensitiveFileNames(),
    CurrentDirectory: receiver!.sys.GetCurrentDirectory(),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.DoCycle","kind":"method","status":"implemented","sigHash":"ecaa47d3f54ab539ad5ba3eede04da38c22c27e5a87413f26108fe746bc7bbcc","bodyHash":"66625ef85acbde079b98726e16f5ebcf991f3932e83fca83c5b3e19aa8f3b9cb"}
 *
 * Go source:
 * func (w *Watcher) DoCycle() {
 * 	w.wm.Lock()
 * 	defer w.wm.Unlock()
 *
 * 	changedPaths, overflow := w.wm.DrainEvents()
 * 	hasEvents := len(changedPaths) > 0 || overflow
 *
 * 	if w.recheckTsConfig() {
 * 		return
 * 	}
 *
 * 	if hasEvents && !overflow && !w.configModified {
 * 		// Filter fswatch events against known dependencies
 * 		if w.isRelevantChange(changedPaths) {
 * 			w.evictChangedSourceFiles(changedPaths)
 * 		} else {
 * 			if w.wm.DebugLog != nil {
 * 				fmt.Fprintf(w.wm.DebugLog, "[watch] DoCycle: %d event(s) not relevant to compilation, skipping rebuild\n", len(changedPaths))
 * 			}
 * 			if w.testing != nil {
 * 				w.testing.OnProgram(w.program)
 * 			}
 * 			return
 * 		}
 * 	} else if overflow {
 * 		// Overflow: evict the entire source file cache to force re-build
 * 		w.sourceFileCache = &collections.SyncMap[tspath.Path, *cachedSourceFile]{}
 * 	} else if !hasEvents && !w.configModified {
 * 		// No events and no config change
 * 		if w.wm.DebugLog != nil {
 * 			fmt.Fprintf(w.wm.DebugLog, "[watch] DoCycle: no events, skipping\n")
 * 		}
 * 		if w.testing != nil {
 * 			w.testing.OnProgram(w.program)
 * 		}
 * 		return
 * 	}
 *
 * 	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation))
 * 	if err := w.doBuild(); err != nil {
 * 		// Mid-cycle watch failure; force a full rebuild on the next event
 * 		w.wm.ForceOverflow()
 * 	}
 * }
 */
export function Watcher_DoCycle(receiver: GoPtr<Watcher>): void {
  WatchManager_Lock(receiver!.wm);
  try {
    const [changedPaths, overflow] = WatchManager_DrainEvents(receiver!.wm);
    const hasEvents = (changedPaths?.size ?? 0) > 0 || overflow;

    if (Watcher_recheckTsConfig(receiver)) {
      return;
    }

    if (hasEvents && !overflow && !receiver!.configModified) {
      const eventPaths = changedPaths ?? new Map<string, fswatch.EventKind>();
      if (Watcher_isRelevantChange(receiver, eventPaths)) {
        Watcher_evictChangedSourceFiles(receiver, eventPaths);
      } else {
        if (receiver!.wm!.DebugLog !== undefined) {
          Fprintf(receiver!.wm!.DebugLog, "[watch] DoCycle: %d event(s) not relevant to compilation, skipping rebuild\n", eventPaths.size);
        }
        if (receiver!.testing !== undefined) {
          receiver!.testing.OnProgram(receiver!.program);
        }
        return;
      }
    } else if (overflow) {
      receiver!.sourceFileCache = newSyncMap<Path, GoPtr<cachedSourceFile>>();
    } else if (!hasEvents && !receiver!.configModified) {
      if (receiver!.wm!.DebugLog !== undefined) {
        Fprintf(receiver!.wm!.DebugLog, "[watch] DoCycle: no events, skipping\n");
      }
      if (receiver!.testing !== undefined) {
        receiver!.testing.OnProgram(receiver!.program);
      }
      return;
    }

    receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.File_change_detected_Starting_incremental_compilation));
    if (Watcher_doBuild(receiver) !== undefined) {
      WatchManager_ForceOverflow(receiver!.wm);
    }
  } finally {
    WatchManager_Unlock(receiver!.wm);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.isRelevantChange","kind":"method","status":"implemented","sigHash":"0f930cb42f5edbd2c4bce9cc84482df324a0ca9dedcb8a19442d8c5f56636dad","bodyHash":"bd9262e606b85830d00f4a403cc55a8c65ab808f2d6605983da263dc53c10d0c"}
 *
 * Go source:
 * func (w *Watcher) isRelevantChange(changedPaths map[string]fswatch.EventKind) bool {
 * 	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
 * 	cwd := w.sys.GetCurrentDirectory()
 * 	opts := w.comparePathsOptions()
 * 	for eventPath := range changedPaths {
 * 		p := tspath.ToPath(eventPath, cwd, caseSensitive)
 * 		if w.seenFiles.Has(p) {
 * 			return true
 * 		}
 * 		if w.config.ConfigFile != nil && w.config.PossiblyMatchesFileName(eventPath) {
 * 			return true
 * 		}
 * 		if w.config.ConfigFile != nil && w.config.PossiblyMatchesDirectoryName(p) {
 * 			return true
 * 		}
 * 		if w.sys.FS().DirectoryExists(eventPath) {
 * 			if w.wm.IsPathUnderWatch(eventPath, opts) {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Watcher_isRelevantChange(receiver: GoPtr<Watcher>, changedPaths: GoMap<string, fswatch.EventKind>): bool {
  const caseSensitive = receiver!.sys.FS().UseCaseSensitiveFileNames();
  const cwd = receiver!.sys.GetCurrentDirectory();
  const opts = Watcher_comparePathsOptions(receiver);
  for (const [eventPath] of changedPaths) {
    const p = ToPath(eventPath, cwd, caseSensitive);
    if (Set_Has(receiver!.seenFiles, p)) {
      return true as bool;
    }
    if (receiver!.config!.ConfigFile !== undefined && ParsedCommandLine_PossiblyMatchesFileName(receiver!.config, eventPath)) {
      return true as bool;
    }
    if (receiver!.config!.ConfigFile !== undefined && ParsedCommandLine_PossiblyMatchesDirectoryName(receiver!.config, p)) {
      return true as bool;
    }
    // If a directory was created under an ancestor fallback watch,
    // treat it as relevant — it may be on the path to a previously
    // non-existent directory we want to watch. Err on the side of
    // false positives (unnecessary rebuild) over false negatives
    // (missed rebuild).
    if (receiver!.sys.FS().DirectoryExists(eventPath)) {
      if (WatchManager_IsPathUnderWatch(receiver!.wm, eventPath, opts)) {
        return true as bool;
      }
    }
  }
  return false as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.doBuild","kind":"method","status":"implemented","sigHash":"457ff7b2b8ecf68f69c5983961d7147ee3d09cdc7d373ec8e789fca91aa2b95f","bodyHash":"82b509d1ed6cba3b8002caa6f6e9b5f98ef4015f012f522ffa0626028f12a3c6"}
 *
 * Go source:
 * func (w *Watcher) doBuild() error {
 * 	if w.configModified {
 * 		w.sourceFileCache = &collections.SyncMap[tspath.Path, *cachedSourceFile]{}
 * 	}
 *
 * 	cached := cachedvfs.From(w.sys.FS())
 * 	tfs := &trackingvfs.FS{Inner: cached}
 * 	innerHost := compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), tfs, w.sys.DefaultLibraryPath(), w.extendedConfigCache, getTraceFromSys(w.sys, w.config.Locale(), w.testing))
 * 	host := &watchCompilerHost{CompilerHost: innerHost, cache: w.sourceFileCache}
 *
 * 	var wildcardDirs map[string]bool
 * 	if w.config.ConfigFile != nil {
 * 		wildcardDirs = w.config.WildcardDirectories()
 * 		for dir := range wildcardDirs {
 * 			tfs.SeenFiles.Add(dir)
 * 		}
 * 		if len(wildcardDirs) > 0 {
 * 			w.config = w.config.ReloadFileNamesOfParsedCommandLine(w.sys.FS())
 * 		}
 * 	}
 * 	for _, path := range w.configFilePaths {
 * 		tfs.SeenFiles.Add(path)
 * 	}
 *
 * 	w.program = incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{
 * 		Config: w.config,
 * 		Host:   host,
 * 	}), w.program, nil, w.testing != nil)
 *
 * 	result := w.compileAndEmit()
 * 	cached.DisableAndClearCache()
 *
 * 	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
 * 	cwd := w.sys.GetCurrentDirectory()
 * 	seenSlice := tfs.SeenFiles.ToSlice()
 * 	w.seenFiles = collections.NewSetWithSizeHint[tspath.Path](len(seenSlice))
 * 	for _, p := range seenSlice {
 * 		w.seenFiles.Add(tspath.ToPath(p, cwd, caseSensitive))
 * 	}
 *
 * 	w.configMtimes = make(map[string]time.Time, len(w.configFilePaths))
 * 	for _, cfgPath := range w.configFilePaths {
 * 		if s := w.sys.FS().Stat(cfgPath); s != nil {
 * 			w.configMtimes[cfgPath] = s.ModTime()
 * 		}
 * 	}
 *
 * 	if err := w.reconcileWatches(seenSlice); err != nil {
 * 		fmt.Fprintf(w.sys.Writer(), "%v\n", err)
 * 		return err
 * 	}
 * 	w.configModified = false
 *
 * 	programFiles := w.program.GetProgram().FilesByPath()
 * 	w.sourceFileCache.Range(func(path tspath.Path, _ *cachedSourceFile) bool {
 * 		if _, ok := programFiles[path]; !ok {
 * 			w.sourceFileCache.Delete(path)
 * 		}
 * 		return true
 * 	})
 *
 * 	errorCount := len(result.Diagnostics)
 * 	if errorCount == 1 {
 * 		w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_1_error_Watching_for_file_changes))
 * 	} else {
 * 		w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_0_errors_Watching_for_file_changes, errorCount))
 * 	}
 *
 * 	if w.testing != nil {
 * 		w.testing.OnProgram(w.program)
 * 	}
 * 	return nil
 * }
 */
export function Watcher_doBuild(receiver: GoPtr<Watcher>): GoError {
  if (receiver!.configModified) {
    receiver!.sourceFileCache = newSyncMap();
  }

  const cached = cachedvfsFrom(receiver!.sys.FS());
  const tfsSeenFiles: SyncSet<string> = newSyncSet<string>();
  const tfs: TrackingFS = {
    Inner: cachedvfsAsVfsFS(cached),
    SeenFiles: tfsSeenFiles,
  };
  const innerHost = NewCompilerHost(
    receiver!.sys.GetCurrentDirectory(),
    trackingFSAsVfsFS(tfs),
    receiver!.sys.DefaultLibraryPath(),
    ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(receiver!.extendedConfigCache),
    GetTraceWithWriterFromSys(receiver!.sys.Writer(), ParsedCommandLine_Locale(receiver!.config), receiver!.testing),
  );
  const host: watchCompilerHost = {
    __tsgoEmbedded0: innerHost,
    cache: receiver!.sourceFileCache,
  };

  let wildcardDirs: GoMap<string, bool> | undefined;
  if (receiver!.config!.ConfigFile !== undefined) {
    wildcardDirs = ParsedCommandLine_WildcardDirectories(receiver!.config);
    for (const [dir] of wildcardDirs) {
      SyncSet_Add(tfs.SeenFiles, dir);
    }
    if (wildcardDirs.size > 0) {
      receiver!.config = ParsedCommandLine_ReloadFileNamesOfParsedCommandLine(receiver!.config, receiver!.sys.FS());
    }
  }
  for (const path of receiver!.configFilePaths) {
    SyncSet_Add(tfs.SeenFiles, path);
  }

  receiver!.program = IncrementalNewProgram(
    NewProgram({ Config: receiver!.config, Host: watchCompilerHost_as_compiler_CompilerHost(host) }),
    receiver!.program,
    undefined,
    receiver!.testing !== undefined,
  );

  const result = Watcher_compileAndEmit(receiver);
  FS_DisableAndClearCache(cached);

  const caseSensitive = receiver!.sys.FS().UseCaseSensitiveFileNames();
  const cwd = receiver!.sys.GetCurrentDirectory();
  const seenSlice = SyncSet_ToSlice(tfsSeenFiles);
  receiver!.seenFiles = NewSetWithSizeHint<Path>(seenSlice.length);
  for (const p of seenSlice) {
    Set_Add(receiver!.seenFiles, ToPath(p, cwd, caseSensitive));
  }

  receiver!.configMtimes = new Map<string, Time>();
  for (const cfgPath of receiver!.configFilePaths) {
    const s = receiver!.sys.FS().Stat(cfgPath);
    if (s !== undefined && s !== null) {
      receiver!.configMtimes.set(cfgPath, s.ModTime());
    }
  }

  const err = Watcher_reconcileWatches(receiver, seenSlice);
  if (err !== undefined) {
    Fprintf(receiver!.sys.Writer(), "%v\n", err);
    return err;
  }
  receiver!.configModified = false;

  const programFiles = Program_FilesByPath(Program_GetProgram(receiver!.program));
  SyncMap_Range(receiver!.sourceFileCache as SyncMap<Path, GoPtr<cachedSourceFile>>, (path: Path) => {
    if (!programFiles.has(path)) {
      SyncMap_Delete(receiver!.sourceFileCache as SyncMap<Path, GoPtr<cachedSourceFile>>, path);
    }
    return true;
  });

  const errorCount = result.Diagnostics.length;
  if (errorCount === 1) {
    receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.Found_1_error_Watching_for_file_changes));
  } else {
    receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.Found_0_errors_Watching_for_file_changes, errorCount));
  }

  if (receiver!.testing !== undefined) {
    receiver!.testing.OnProgram(receiver!.program);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.evictChangedSourceFiles","kind":"method","status":"implemented","sigHash":"e60b9c7673f470e0f11a958a772036134c4eb21fdb7d17d65e1dedcbb8d7ad7a","bodyHash":"ed3676b28b37214e6e03e1196d4af97078f5968a57d311160306ab81a49983cd"}
 *
 * Go source:
 * func (w *Watcher) evictChangedSourceFiles(changedPaths map[string]fswatch.EventKind) {
 * 	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
 * 	cwd := w.sys.GetCurrentDirectory()
 * 	for eventPath := range changedPaths {
 * 		p := tspath.ToPath(eventPath, cwd, caseSensitive)
 * 		if _, ok := w.sourceFileCache.Load(p); ok {
 * 			if w.wm.DebugLog != nil {
 * 				fmt.Fprintf(w.wm.DebugLog, "[watch] evicting cached source file: %s\n", p)
 * 			}
 * 			w.sourceFileCache.Delete(p)
 * 		}
 * 	}
 * }
 */
export function Watcher_evictChangedSourceFiles(receiver: GoPtr<Watcher>, changedPaths: GoMap<string, fswatch.EventKind>): void {
  const caseSensitive = receiver!.sys.FS().UseCaseSensitiveFileNames();
  const cwd = receiver!.sys.GetCurrentDirectory();
  for (const [eventPath] of changedPaths) {
    const p = ToPath(eventPath, cwd, caseSensitive);
    const [, ok] = SyncMap_Load(receiver!.sourceFileCache as SyncMap<Path, GoPtr<cachedSourceFile>>, p);
    if (ok) {
      if (receiver!.wm!.DebugLog !== undefined) {
        Fprintf(receiver!.wm!.DebugLog, "[watch] evicting cached source file: %s\n", p);
      }
      SyncMap_Delete(receiver!.sourceFileCache as SyncMap<Path, GoPtr<cachedSourceFile>>, p);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.compileAndEmit","kind":"method","status":"implemented","sigHash":"05d4e6cdd7e0f43d7ef232ee0965ba2d02987eef8698cce19e90676d88765889","bodyHash":"05e36bfbc522f925a718f7a89ac871104bd8a3cbba5e95c220cd3d90063878a7"}
 *
 * Go source:
 * func (w *Watcher) compileAndEmit() tsc.CompileAndEmitResult {
 * 	return tsc.EmitFilesAndReportErrors(tsc.EmitInput{
 * 		Sys:                w.sys,
 * 		ProgramLike:        w.program,
 * 		Program:            w.program.GetProgram(),
 * 		Config:             w.config,
 * 		ReportDiagnostic:   w.reportDiagnostic,
 * 		ReportErrorSummary: w.reportErrorSummary,
 * 		Writer:             w.sys.Writer(),
 * 		CompileTimes:       &tsc.CompileTimes{},
 * 		Testing:            w.testing,
 * 	})
 * }
 */
export function Watcher_compileAndEmit(receiver: GoPtr<Watcher>): CompileAndEmitResult {
  return EmitFilesAndReportErrors({
    Sys: receiver!.sys,
    ProgramLike: IncrementalProgramAsCompilerProgramLike(receiver!.program),
    Program: Program_GetProgram(receiver!.program),
    Config: receiver!.config,
    ReportDiagnostic: receiver!.reportDiagnostic,
    ReportErrorSummary: receiver!.reportErrorSummary,
    Writer: receiver!.sys.Writer(),
    WriteFile: undefined,
    CompileTimes: {
      ConfigTime: 0,
      ParseTime: 0,
      bindTime: 0,
      checkTime: 0,
      totalTime: 0,
      emitTime: 0,
      BuildInfoReadTime: 0,
      ChangesComputeTime: 0,
    },
    Testing: receiver!.testing,
    TestingMTimesCache: undefined,
    Tracing: undefined,
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.recheckTsConfig","kind":"method","status":"implemented","sigHash":"6fcb7c239a4aa41c93efb434f155a2dfc180916e73693d437db374172661ebf5","bodyHash":"d32e511a3f4d76788abd9de731e4f618fa6ff79fa98f62e8d4fe56854dbb119b"}
 *
 * Go source:
 * func (w *Watcher) recheckTsConfig() bool {
 * 	if w.configFileName == "" {
 * 		return false
 * 	}
 *
 * 	if !w.configHasErrors && len(w.configFilePaths) > 0 {
 * 		changed := false
 * 		for _, path := range w.configFilePaths {
 * 			oldMtime, ok := w.configMtimes[path]
 * 			s := w.sys.FS().Stat(path)
 * 			if !ok {
 * 				if s != nil {
 * 					changed = true
 * 					break
 * 				}
 * 			} else if s == nil || !s.ModTime().Equal(oldMtime) {
 * 				changed = true
 * 				break
 * 			}
 * 		}
 * 		if !changed {
 * 			return false
 * 		}
 * 	}
 *
 * 	configParseResult := w.parseConfigFile()
 * 	if configParseResult == nil {
 * 		return true
 * 	}
 * 	if w.configHasErrors {
 * 		w.configModified = true
 * 	}
 * 	w.configHasErrors = false
 * 	w.configFilePaths = append([]string{w.configFileName}, configParseResult.ExtendedSourceFiles()...)
 * 	if !reflect.DeepEqual(w.config.ParsedConfig, configParseResult.ParsedConfig) {
 * 		w.configModified = true
 * 	}
 * 	w.config = configParseResult
 * 	return false
 * }
 */
export function Watcher_recheckTsConfig(receiver: GoPtr<Watcher>): bool {
  if (receiver!.configFileName === "") {
    return false;
  }

  if (!receiver!.configHasErrors && receiver!.configFilePaths.length > 0) {
    let changed = false;
    for (const path of receiver!.configFilePaths) {
      const oldMtime = receiver!.configMtimes?.get(path);
      const ok = oldMtime !== undefined;
      const s = receiver!.sys.FS().Stat(path);
      if (!ok) {
        if (s !== undefined && s !== null) {
          changed = true;
          break;
        }
      } else if (s === undefined || s === null || !s.ModTime().Equal(oldMtime!)) {
        changed = true;
        break;
      }
    }
    if (!changed) {
      return false;
    }
  }

  const configParseResult = Watcher_parseConfigFile(receiver);
  if (configParseResult === undefined) {
    return true;
  }
  if (receiver!.configHasErrors) {
    receiver!.configModified = true;
  }
  receiver!.configHasErrors = false;
  receiver!.configFilePaths = [receiver!.configFileName, ...ParsedCommandLine_ExtendedSourceFiles(configParseResult)];
  if (!parsedConfigDeepEqual(receiver!.config!.ParsedConfig, configParseResult!.ParsedConfig)) {
    receiver!.configModified = true;
  }
  receiver!.config = configParseResult;
  return false;
}

export function parsedConfigDeepEqual(left: unknown, right: unknown): bool {
  return reflect_DeepEqual(left, right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watcher.go::method::Watcher.parseConfigFile","kind":"method","status":"implemented","sigHash":"2bea31445687e678bd54f1ec1577c8eb6232268ad1a233bf0cbec7c989badd5a","bodyHash":"0366d768d3f9ebb43f96e1876f1a72df85f5e8a4a5f42996a3b72c9ad7158a6d"}
 *
 * Go source:
 * func (w *Watcher) parseConfigFile() *tsoptions.ParsedCommandLine {
 * 	extendedConfigCache := &tsc.ExtendedConfigCache{}
 * 	configParseResult, errors := tsoptions.GetParsedCommandLineOfConfigFile(w.configFileName, w.compilerOptionsFromCommandLine, w.commandLineRaw, w.sys, extendedConfigCache)
 * 	if len(errors) > 0 {
 * 		for _, e := range errors {
 * 			w.reportDiagnostic(e)
 * 		}
 * 		w.configHasErrors = true
 * 		errorCount := len(errors)
 * 		if errorCount == 1 {
 * 			w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_1_error_Watching_for_file_changes))
 * 		} else {
 * 			w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_0_errors_Watching_for_file_changes, errorCount))
 * 		}
 * 		return nil
 * 	}
 * 	w.extendedConfigCache = extendedConfigCache
 * 	return configParseResult
 * }
 */
export function Watcher_parseConfigFile(receiver: GoPtr<Watcher>): GoPtr<ParsedCommandLine> {
  const extendedConfigCache: ExtendedConfigCache = { m: newSyncMap() };
  const [configParseResult, errors] = GetParsedCommandLineOfConfigFile(
    receiver!.configFileName,
    receiver!.compilerOptionsFromCommandLine,
    receiver!.commandLineRaw,
    receiver!.sys,
    ExtendedConfigCache_as_tsoptions_ExtendedConfigCache(extendedConfigCache),
  );
  if (errors.length > 0) {
    for (const e of errors) {
      receiver!.reportDiagnostic(e);
    }
    receiver!.configHasErrors = true;
    const errorCount = errors.length;
    if (errorCount === 1) {
      receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.Found_1_error_Watching_for_file_changes));
    } else {
      receiver!.reportWatchStatus(NewCompilerDiagnostic(diagnosticMessages.Found_0_errors_Watching_for_file_changes, errorCount));
    }
    return undefined;
  }
  receiver!.extendedConfigCache = extendedConfigCache;
  return configParseResult;
}
