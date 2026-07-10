import type { bool, int } from "../../../go/scalars.js";
import type { GoComparable, GoMap, GoPtr, GoSlice } from "../../../go/compat.js";
import { GoInterfaceAssert, MakeGoChan } from "../../../go/compat.js";
import type { Context } from "../../../go/context.js";
import type { Writer } from "../../../go/io.js";
import type { Time } from "../../../go/time.js";
import { Fprintf } from "../../../go/fmt.js";
import { NewCompilerDiagnostic } from "../../ast/diagnostic.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import { Set_Has, Set_Add, NewSetFromItems, NewSetWithSizeHint } from "../../collections/set.js";
import type { Set } from "../../collections/set.js";
import { SyncMap_Load, SyncMap_LoadOrStore, SyncMap_Store, SyncMap_Range } from "../../collections/syncmap.js";
import type { SyncMap } from "../../collections/syncmap.js";
import { Map as core_Map, LastOrNil, IfElse } from "../../core/core.js";
import { Tristate_IsTrue } from "../../core/tristate.js";
import { NewWorkGroup } from "../../core/workgroup.js";
import type { WorkGroup } from "../../core/workgroup.js";
import * as diagnostics from "../../diagnostics/generated/messages.js";
import { ParsedBuildCommandLine_ResolvedProjectPaths, ParsedBuildCommandLine_Locale } from "../../tsoptions/parsedbuildcommandline.js";
import type { ParsedBuildCommandLine } from "../../tsoptions/parsedbuildcommandline.js";
import { ParsedCommandLine_ResolvedProjectReferencePaths, ParsedCommandLine_ProjectReferences, ParsedCommandLine_FileNames, ParsedCommandLine_ExtendedSourceFiles, ParsedCommandLine_ReloadFileNamesOfParsedCommandLine, ParsedCommandLine_WildcardDirectories } from "../../tsoptions/parsedcommandline.js";
import type { ParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import { CombinePaths, ContainsPath, ConvertToRelativePath, GetBaseFileName, GetDirectoryPath, GetNormalizedAbsolutePath, ToPath } from "../../tspath/path.js";
import type { ComparePathsOptions, Path } from "../../tspath/path.js";
import { CreateWatchStatusReporter, CreateReportErrorSummary, CreateBuilderStatusReporter, CreateDiagnosticReporter } from "../tsc/diagnostics.js";
import type { CommandLineResult, CommandLineTesting, System, Watcher } from "../tsc/compile.js";
import { ExitStatusProjectReferenceCycle_OutputsSkipped } from "../tsc/compile.js";
import type { DiagnosticReporter, DiagnosticsReporter } from "../tsc/diagnostics.js";
import { Statistics_SetTotalTime, Statistics_Report, Statistics_Aggregate } from "../tsc/statistics.js";
import type { Statistics } from "../tsc/statistics.js";
import { NewCachedFSCompilerHost } from "../../compiler/host.js";
import type { FS } from "../../vfs/vfs.js";
import { BuildInfo_GetMissingPackageJsons, BuildInfo_GetPackageJsons, IsBuildInfoFileNameDefaultLibrary } from "../incremental/buildInfo.js";
import { GetTraceWithWriterFromSys } from "../tsc/emit.js";
import { BuildTask_report, BuildTask_buildProject, BuildTask_cleanProject, BuildTask_updateWatch, BuildTask_resetStatus, BuildTask_resetConfig } from "./buildtask.js";
import type { BuildTask } from "./buildtask.js";
import { host_FS as host_FS_fn, host_DefaultLibraryPath, host_GetMTime, host_GetResolvedProjectReference, host_storeMTimeFromOldCache } from "./host.js";
import { parseCache_reset, parseCache_store } from "./parseCache.js";
import { FS_ClearCache, FS_GoInterfaceType } from "../../vfs/cachedvfs/cachedvfs.js";
import type { ExtendedConfigCache } from "../tsc/extendedconfigcache.js";
import type { host } from "./host.js";
import { Bool } from "../../../go/sync/atomic.js";
import { Map as SyncGoMap, Mutex } from "../../../go/sync.js";
import * as strings from "../../../go/strings.js";
import { Builder } from "../../../go/strings.js";
import type { parseCache, parseCacheEntry } from "./parseCache.js";
import * as fswatch from "../../fswatch/fswatch.js";
import { CanWatchDirectory, GetCommandLineTestingWatchBackend } from "../watchmanager/watchbackend.js";
import { IsDirCoveredByWatch, NewWatchManager, WatchManager_DrainEvents, WatchManager_EnsureDefaultBackend, WatchManager_ForceOverflow, WatchManager_IsPathUnderWatch, WatchManager_Lock, WatchManager_ReconcileWatches, WatchManager_ResolveDesiredDirs, WatchManager_RunLoop, WatchManager_SetBackend, WatchManager_Unlock } from "../watchmanager/watchmanager.js";
import type { WatchManager } from "../watchmanager/watchmanager.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::Options","kind":"type","status":"implemented","sigHash":"ea173f48959bb5742f1a055b1561015dbc45fb79cf6ff15219753c2abb245e1f","bodyHash":"69628808be0501ab69e7a2e5cf9c349ab1129718bc63d4ddc222553efb32cabf"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Options.Testing is a nil Go command-line testing interface during normal CLI execution; Start and Watch branch on that nil sentinel before invoking any testing hook, so TypeScript represents it with undefined.","goSignature":"interface{Command:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedbuildcommandline.ts::ParsedBuildCommandLine>;Sys:packages/tsts/src/internal/execute/tsc/compile.ts::System;Testing:packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting}","tsSignature":"interface{Command:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/tsoptions/parsedbuildcommandline.ts::ParsedBuildCommandLine>;Sys:packages/tsts/src/internal/execute/tsc/compile.ts::System;Testing:packages/tsts/src/internal/execute/tsc/compile.ts::CommandLineTesting|undefined}"}
 *
 * Go source:
 * Options struct {
 * 	Sys     tsc.System
 * 	Command *tsoptions.ParsedBuildCommandLine
 * 	Testing tsc.CommandLineTesting
 * }
 */
export interface Options {
  Sys: System;
  Command: GoPtr<ParsedBuildCommandLine>;
  Testing: CommandLineTesting | undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::orchestratorResult","kind":"type","status":"implemented","sigHash":"8ed1815afef001927a40cb48a20d8e8330f1a075fcfae11e8581fd64a39186c9","bodyHash":"a1ed589b2a0d747bea2ec47282401deff0ac2f3a723cabe23cd94ac831dca679"}
 *
 * Go source:
 * orchestratorResult struct {
 * 	result        tsc.CommandLineResult
 * 	errors        []*ast.Diagnostic
 * 	statistics    tsc.Statistics
 * 	filesToDelete []string
 * }
 */
export interface orchestratorResult {
  result: CommandLineResult;
  errors: GoSlice<GoPtr<Diagnostic>>;
  statistics: Statistics;
  filesToDelete: GoSlice<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::orchestratorResult.report","kind":"method","status":"implemented","sigHash":"0a59edbd01202a17ebdb418c50376b520766b371a8e8f72da922342822877d92","bodyHash":"025b45545cb40bbb15ca144e1d379a0aeb57b810b8f9bf637f2e43f07113dcaf"}
 *
 * Go source:
 * func (b *orchestratorResult) report(o *Orchestrator) {
 * 	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
 * 		o.watchStatusReporter(ast.NewCompilerDiagnostic(core.IfElse(len(b.errors) == 1, diagnostics.Found_1_error_Watching_for_file_changes, diagnostics.Found_0_errors_Watching_for_file_changes), len(b.errors)))
 * 	} else {
 * 		o.errorSummaryReporter(b.errors)
 * 	}
 * 	if b.filesToDelete != nil {
 * 		o.createBuilderStatusReporter(nil)(
 * 			ast.NewCompilerDiagnostic(
 * 				diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
 * 				strings.Join(core.Map(b.filesToDelete, func(f string) string {
 * 					return "\r\n * " + f
 * 				}), ""),
 * 			),
 * 		)
 * 	}
 * 	if !o.opts.Command.CompilerOptions.Diagnostics.IsTrue() && !o.opts.Command.CompilerOptions.ExtendedDiagnostics.IsTrue() {
 * 		return
 * 	}
 * 	b.statistics.SetTotalTime(o.opts.Sys.SinceStart())
 * 	b.statistics.Report(o.opts.Sys.Writer(), o.opts.Testing)
 * }
 */
export function orchestratorResult_report(receiver: GoPtr<orchestratorResult>, o: GoPtr<Orchestrator>): void {
  if (Tristate_IsTrue(o!.opts.Command!.CompilerOptions!.Watch)) {
    o!.watchStatusReporter!(NewCompilerDiagnostic(
      IfElse(receiver!.errors.length === 1, diagnostics.Found_1_error_Watching_for_file_changes, diagnostics.Found_0_errors_Watching_for_file_changes),
      receiver!.errors.length,
    ));
  } else {
    o!.errorSummaryReporter!(receiver!.errors);
  }
  if (receiver!.filesToDelete !== undefined && receiver!.filesToDelete !== null) {
    Orchestrator_createBuilderStatusReporter(o, undefined)(
      NewCompilerDiagnostic(
        diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
        strings.Join(core_Map(receiver!.filesToDelete, (f: string): string => "\r\n * " + f), ""),
      ),
    );
  }
  if (!Tristate_IsTrue(o!.opts.Command!.CompilerOptions!.Diagnostics) && !Tristate_IsTrue(o!.opts.Command!.CompilerOptions!.ExtendedDiagnostics)) {
    return;
  }
  Statistics_SetTotalTime(receiver!.statistics, o!.opts.Sys.SinceStart());
  Statistics_Report(receiver!.statistics, o!.opts.Sys.Writer(), o!.opts.Testing);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::Orchestrator","kind":"type","status":"implemented","sigHash":"cc9f01c813767aac83bd2edb634eabe00c8a752fffaf005f38e8353e8a25796e","bodyHash":"af5dd0b93012fee5c6bd2fd91f8256c18f99185feae0343b1d7af612fa41aba1"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"NewOrchestrator installs watchStatusReporter only in watch mode and errorSummaryReporter only otherwise; the inactive Go function field remains nil and TypeScript preserves each mutually exclusive reporter state with undefined.","goSignature":"interface{comparePathsOptions:packages/tsts/src/internal/tspath/path.ts::ComparePathsOptions;errorSummaryReporter:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter;errors:packages/tsts/src/go/compat.ts::GoSlice<packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/ast/diagnostic.ts::Diagnostic>>;host:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/build/host.ts::host>;opts:packages/tsts/src/internal/execute/build/orchestrator.ts::Options;order:packages/tsts/src/go/compat.ts::GoSlice<string>;tasks:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/syncmap.ts::SyncMap<packages/tsts/src/internal/tspath/path.ts::Path,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/build/buildtask.ts::BuildTask>>>;watchStatusReporter:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter;wm:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>}","tsSignature":"interface{comparePathsOptions:packages/tsts/src/internal/tspath/path.ts::ComparePathsOptions;errorSummaryReporter:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticsReporter|undefined;errors:packages/tsts/src/go/compat.ts::GoSlice<packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/ast/diagnostic.ts::Diagnostic>>;host:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/build/host.ts::host>;opts:packages/tsts/src/internal/execute/build/orchestrator.ts::Options;order:packages/tsts/src/go/compat.ts::GoSlice<string>;tasks:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/collections/syncmap.ts::SyncMap<packages/tsts/src/internal/tspath/path.ts::Path,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/build/buildtask.ts::BuildTask>>>;watchStatusReporter:packages/tsts/src/internal/execute/tsc/diagnostics.ts::DiagnosticReporter|undefined;wm:packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>}"}
 *
 * Go source:
 * Orchestrator struct {
 * 	opts                Options
 * 	comparePathsOptions tspath.ComparePathsOptions
 * 	host                *host
 *
 * 	// order generation result
 * 	tasks  *collections.SyncMap[tspath.Path, *BuildTask]
 * 	order  []string
 * 	errors []*ast.Diagnostic
 *
 * 	errorSummaryReporter tsc.DiagnosticsReporter
 * 	watchStatusReporter  tsc.DiagnosticReporter
 *
 * 	// fswatch event-based watching
 * 	wm *watchmanager.WatchManager
 * }
 */
export interface Orchestrator {
  opts: Options;
  comparePathsOptions: ComparePathsOptions;
  host: GoPtr<host>;
  tasks: GoPtr<SyncMap<Path, GoPtr<BuildTask>>>;
  order: GoSlice<string>;
  errors: GoSlice<GoPtr<Diagnostic>>;
  errorSummaryReporter: DiagnosticsReporter | undefined;
  watchStatusReporter: DiagnosticReporter | undefined;
  wm: GoPtr<WatchManager>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e","bodyHash":"8df5ee902b902bae8873b016f2fdb528c344be93f113c5f408fde2185f0ff258"}
 *
 * Go source:
 * var _ tsc.Watcher = (*Orchestrator)(nil)
 */
export let __a05f111f_0: Watcher = Orchestrator_as_tsc_Watcher(undefined);

export function Orchestrator_as_tsc_Watcher(receiver: GoPtr<Orchestrator>): Watcher {
  return {
    DoCycle: (): void => Orchestrator_DoCycle(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.relativeFileName","kind":"method","status":"implemented","sigHash":"72ff97cf7be6af75d0bcb0a972d3c887eec0137ae80fdd7bf9ec0abf11edc9b4","bodyHash":"ff945d4da9c439fd6783fed02507cb9daab99b679d06699e3d94c0ebfe74591a"}
 *
 * Go source:
 * func (o *Orchestrator) relativeFileName(fileName string) string {
 * 	return tspath.ConvertToRelativePath(fileName, o.comparePathsOptions)
 * }
 */
export function Orchestrator_relativeFileName(receiver: GoPtr<Orchestrator>, fileName: string): string {
  return ConvertToRelativePath(fileName, receiver!.comparePathsOptions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.toPath","kind":"method","status":"implemented","sigHash":"9e61b62a405e313d1ad17028e975890f0df3e6fd78ea274d85c7a5b9cc01edf0","bodyHash":"27d7a1b912fa68839612692b556aa464ef54d9b75be35d445a69f2b54dfa83b8"}
 *
 * Go source:
 * func (o *Orchestrator) toPath(fileName string) tspath.Path {
 * 	return tspath.ToPath(fileName, o.comparePathsOptions.CurrentDirectory, o.comparePathsOptions.UseCaseSensitiveFileNames)
 * }
 */
export function Orchestrator_toPath(receiver: GoPtr<Orchestrator>, fileName: string): Path {
  return ToPath(fileName, receiver!.comparePathsOptions.CurrentDirectory, receiver!.comparePathsOptions.UseCaseSensitiveFileNames);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.resolveBuildInfoFileName","kind":"method","status":"implemented","sigHash":"5abab9fa0c9a31d8b26a14a2720c6c1041095b0a5c9c1c2cc11414df623de23c","bodyHash":"28bc57b1d197f4cb4a046792eac4001e436848112f5d96e4ee229ecdc5c4a63a"}
 *
 * Go source:
 * func (o *Orchestrator) resolveBuildInfoFileName(fileName string, buildInfoDir string) string {
 * 	if incremental.IsBuildInfoFileNameDefaultLibrary(fileName) {
 * 		return tspath.CombinePaths(o.host.DefaultLibraryPath(), fileName)
 * 	}
 * 	return tspath.GetNormalizedAbsolutePath(fileName, buildInfoDir)
 * }
 */
export function Orchestrator_resolveBuildInfoFileName(receiver: GoPtr<Orchestrator>, fileName: string, buildInfoDir: string): string {
  if (IsBuildInfoFileNameDefaultLibrary(fileName)) {
    return CombinePaths(host_DefaultLibraryPath(receiver!.host), fileName);
  }
  return GetNormalizedAbsolutePath(fileName, buildInfoDir);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Order","kind":"method","status":"implemented","sigHash":"1301e30f674ef1c608aefd50ccd0739e9612b69d9bfa3960f0ef286873c97219","bodyHash":"4d8ffbdd713ca06f0061502658a991f0f4b41925550afae89b90caedec18b6c3"}
 *
 * Go source:
 * func (o *Orchestrator) Order() []string {
 * 	return o.order
 * }
 */
export function Orchestrator_Order(receiver: GoPtr<Orchestrator>): GoSlice<string> {
  return receiver!.order;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Upstream","kind":"method","status":"implemented","sigHash":"7f3b0fb743b122979e2b074f6444231c3de0eb3ea6cb87465543694f936a5c96","bodyHash":"23c05c9394d5ca6d1c76bbdc069efae890cad6211b8c439e6aaf7b5a493d34be"}
 *
 * Go source:
 * func (o *Orchestrator) Upstream(configName string) []string {
 * 	path := o.toPath(configName)
 * 	task := o.getTask(path)
 * 	return core.Map(task.upStream, func(t *upstreamTask) string {
 * 		return t.task.config
 * 	})
 * }
 */
export function Orchestrator_Upstream(receiver: GoPtr<Orchestrator>, configName: string): GoSlice<string> {
  const path = Orchestrator_toPath(receiver, configName);
  const task = Orchestrator_getTask(receiver, path);
  return core_Map(task!.upStream, (t) => t!.task!.config);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Downstream","kind":"method","status":"implemented","sigHash":"0fa4b32ce78c45e5133b8fb53e268a74704700b01972ead882fc5c003b17aecc","bodyHash":"03be9d1de6a867a66869ac312c9957bbc6b03232bf02d21178bc49708106611e"}
 *
 * Go source:
 * func (o *Orchestrator) Downstream(configName string) []string {
 * 	path := o.toPath(configName)
 * 	task := o.getTask(path)
 * 	return core.Map(task.downStream, func(t *BuildTask) string {
 * 		return t.config
 * 	})
 * }
 */
export function Orchestrator_Downstream(receiver: GoPtr<Orchestrator>, configName: string): GoSlice<string> {
  const path = Orchestrator_toPath(receiver, configName);
  const task = Orchestrator_getTask(receiver, path);
  return core_Map(task!.downStream, (t) => t!.config);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.getTask","kind":"method","status":"implemented","sigHash":"4b2b5e6cba576241e54fc1ab31c9ede92bcb74dad862d5ecdc3676ff0de82092","bodyHash":"3a1a10a118892df43330e92f0f3df5571c3669d7f320c7cf0b7fd82acd1e116d"}
 *
 * Go source:
 * func (o *Orchestrator) getTask(path tspath.Path) *BuildTask {
 * 	task, ok := o.tasks.Load(path)
 * 	if !ok {
 * 		panic("No build task found for " + path)
 * 	}
 * 	return task
 * }
 */
export function Orchestrator_getTask(receiver: GoPtr<Orchestrator>, path: Path): GoPtr<BuildTask> {
  const [task, ok] = SyncMap_Load(receiver!.tasks, path);
  if (!ok) {
    throw new globalThis.Error("No build task found for " + path);
  }
  return task as GoPtr<BuildTask>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createBuildTasks","kind":"method","status":"implemented","sigHash":"329dee7541b89ead2d2bbc950f66b9ac5355421b6feb4025adf54d1652414d57","bodyHash":"e9072f6f2ffedf70a1212c48bb2a9a80bdc89d01adeaa6a2a1401f84c8fb1a3f"}
 *
 * Go source:
 * func (o *Orchestrator) createBuildTasks(oldTasks *collections.SyncMap[tspath.Path, *BuildTask], configs []string, wg core.WorkGroup) {
 * 	for _, config := range configs {
 * 		wg.Queue(func() {
 * 			path := o.toPath(config)
 * 			var task *BuildTask
 * 			var buildInfo *buildInfoEntry
 * 			if oldTasks != nil {
 * 				if existing, ok := oldTasks.Load(path); ok {
 * 					if !existing.dirty {
 * 						// Reuse existing task if config is same
 * 						task = existing
 * 					} else {
 * 						buildInfo = existing.buildInfoEntry
 * 					}
 * 				}
 * 			}
 * 			if task == nil {
 * 				task = &BuildTask{config: config, isInitialCycle: oldTasks == nil}
 * 				task.pending.Store(true)
 * 				task.buildInfoEntry = buildInfo
 * 			}
 * 			if _, loaded := o.tasks.LoadOrStore(path, task); loaded {
 * 				return
 * 			}
 * 			task.resolved = o.host.GetResolvedProjectReference(config, path)
 * 			task.upStream = nil
 * 			if task.resolved != nil {
 * 				o.createBuildTasks(oldTasks, task.resolved.ResolvedProjectReferencePaths(), wg)
 * 			}
 * 		})
 * 	}
 * }
 */
export function Orchestrator_createBuildTasks(receiver: GoPtr<Orchestrator>, oldTasks: GoPtr<SyncMap<Path, GoPtr<BuildTask>>>, configs: GoSlice<string>, wg: WorkGroup): void {
  for (const config of configs) {
    wg.Queue((): void => {
      const path = Orchestrator_toPath(receiver, config);
      let task: GoPtr<BuildTask> = undefined;
      let buildInfo = undefined;
      if (oldTasks !== undefined) {
        const [existing, ok] = SyncMap_Load(oldTasks, path);
        if (ok) {
          const existingTask = existing as GoPtr<BuildTask>;
          if (!existingTask!.dirty) {
            task = existingTask;
          } else {
            buildInfo = existingTask!.buildInfoEntry;
          }
        }
      }
      if (task === undefined) {
        const pending = new Bool();
        task = {
          config,
          resolved: undefined,
          upStream: [],
          downStream: [],
          status: undefined,
          done: undefined,
          result: undefined,
          prevReporter: undefined,
          reportDone: undefined,
          buildInfoEntry: buildInfo,
          buildInfoEntryMu: new Mutex(),
          packageJsons: [],
          errors: [],
          pending,
          isInitialCycle: oldTasks === undefined,
          downStreamUpdateMu: new Mutex(),
          dirty: false,
        };
        task!.pending.Store(true as bool);
        task!.buildInfoEntry = buildInfo;
      }
      const [, loaded] = SyncMap_LoadOrStore(receiver!.tasks, path, task);
      if (loaded) {
        return;
      }
      task!.resolved = host_GetResolvedProjectReference(receiver!.host, config, path);
      task!.upStream = [];
      if (task!.resolved !== undefined) {
        const refPaths = ParsedCommandLine_ResolvedProjectReferencePaths(task!.resolved);
        Orchestrator_createBuildTasks(receiver, oldTasks, refPaths, wg);
      }
    });
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.setupBuildTask","kind":"method","status":"implemented","sigHash":"66425ad7812e87b4684055d1970a30cb40f0863fef9394515cbb0c54bdf123e2","bodyHash":"5c7444a439956b4871099f7866500401575250c81213dd03e31f5c8c534afc42"}
 *
 * Go source:
 * func (o *Orchestrator) setupBuildTask(
 * 	configName string,
 * 	downStream *BuildTask,
 * 	inCircularContext bool,
 * 	completed *collections.Set[tspath.Path],
 * 	analyzing *collections.Set[tspath.Path],
 * 	circularityStack []string,
 * ) *BuildTask {
 * 	path := o.toPath(configName)
 * 	task := o.getTask(path)
 * 	if !completed.Has(path) {
 * 		if analyzing.Has(path) {
 * 			if !inCircularContext {
 * 				o.errors = append(o.errors, ast.NewCompilerDiagnostic(
 * 					diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
 * 					strings.Join(circularityStack, "\n"),
 * 				))
 * 			}
 * 			return nil
 * 		}
 * 		analyzing.Add(path)
 * 		circularityStack = append(circularityStack, configName)
 * 		if task.resolved != nil {
 * 			for index, subReference := range task.resolved.ResolvedProjectReferencePaths() {
 * 				upstream := o.setupBuildTask(subReference, task, inCircularContext || task.resolved.ProjectReferences()[index].Circular, completed, analyzing, circularityStack)
 * 				if upstream != nil {
 * 					task.upStream = append(task.upStream, &upstreamTask{task: upstream, refIndex: index})
 * 				}
 * 			}
 * 		}
 * 		circularityStack = circularityStack[:len(circularityStack)-1]
 * 		completed.Add(path)
 * 		task.reportDone = make(chan struct{})
 * 		prev := core.LastOrNil(o.order)
 * 		if prev != "" {
 * 			task.prevReporter = o.getTask(o.toPath(prev))
 * 		}
 * 		task.done = make(chan struct{})
 * 		o.order = append(o.order, configName)
 * 	}
 * 	if o.opts.Command.CompilerOptions.Watch.IsTrue() && downStream != nil {
 * 		task.downStream = append(task.downStream, downStream)
 * 	}
 * 	return task
 * }
 */
export function Orchestrator_setupBuildTask(receiver: GoPtr<Orchestrator>, configName: string, downStream: GoPtr<BuildTask>, inCircularContext: bool, completed: GoPtr<Set<Path>>, analyzing: GoPtr<Set<Path>>, circularityStack: GoSlice<string>): GoPtr<BuildTask> {
  const path = Orchestrator_toPath(receiver, configName);
  const task = Orchestrator_getTask(receiver, path);
  if (!Set_Has(completed, path)) {
    if (Set_Has(analyzing, path)) {
      if (!inCircularContext) {
        receiver!.errors.push(NewCompilerDiagnostic(
          diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
          strings.Join(circularityStack, "\n"),
        ));
      }
      return undefined;
    }
    Set_Add(analyzing, path);
    circularityStack = [...circularityStack, configName];
    if (task!.resolved !== undefined) {
      const subRefs = ParsedCommandLine_ResolvedProjectReferencePaths(task!.resolved);
      const projectRefs = ParsedCommandLine_ProjectReferences(task!.resolved);
      for (let index = 0; index < subRefs.length; index++) {
        const subReference = subRefs[index]!;
        const upstream = Orchestrator_setupBuildTask(receiver, subReference, task, (inCircularContext || projectRefs[index]!.Circular) as bool, completed, analyzing, circularityStack);
        if (upstream !== undefined) {
          task!.upStream.push({ task: upstream, refIndex: index });
        }
      }
    }
    circularityStack = circularityStack.slice(0, circularityStack.length - 1);
    Set_Add(completed, path);
    task!.reportDone = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
    const prev = LastOrNil(receiver!.order);
    if (prev !== "") {
      task!.prevReporter = Orchestrator_getTask(receiver, Orchestrator_toPath(receiver, prev));
    }
    task!.done = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
    receiver!.order.push(configName);
  }
  if (Tristate_IsTrue(receiver!.opts.Command!.CompilerOptions!.Watch) && downStream !== undefined) {
    task!.downStream.push(downStream);
  }
  return task;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.GenerateGraphReusingOldTasks","kind":"method","status":"implemented","sigHash":"169d3ccca94606a2a402942539df2105a48962d215156c2d8c57714504cbb3ca","bodyHash":"d2f511d69049e087e9db651d732b979d6313bd4b0bcec8abfd688cb0536221b3"}
 *
 * Go source:
 * func (o *Orchestrator) GenerateGraphReusingOldTasks() {
 * 	tasks := o.tasks
 * 	o.tasks = &collections.SyncMap[tspath.Path, *BuildTask]{}
 * 	o.order = nil
 * 	o.errors = nil
 * 	o.GenerateGraph(tasks)
 * }
 */
export function Orchestrator_GenerateGraphReusingOldTasks(receiver: GoPtr<Orchestrator>): void {
  const tasks = receiver!.tasks;
  receiver!.tasks = newSyncMap<Path, GoPtr<BuildTask>>();
  receiver!.order = [];
  receiver!.errors = [];
  Orchestrator_GenerateGraph(receiver, tasks);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.GenerateGraph","kind":"method","status":"implemented","sigHash":"279f8f4940231b9f3a890093603ccd86df99c79f77cdc4ff810389693aee4527","bodyHash":"2bb6f987d23dcbb34ebbb64effb83fa4d3b2fbba960f585e03c3e385e2ba611a"}
 *
 * Go source:
 * func (o *Orchestrator) GenerateGraph(oldTasks *collections.SyncMap[tspath.Path, *BuildTask]) {
 * 	projects := o.opts.Command.ResolvedProjectPaths()
 * 	// Parse all config files in parallel
 * 	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
 * 	o.createBuildTasks(oldTasks, projects, wg)
 * 	wg.RunAndWait()
 *
 * 	// Generate the graph
 * 	completed := collections.Set[tspath.Path]{}
 * 	analyzing := collections.Set[tspath.Path]{}
 * 	circularityStack := []string{}
 * 	for _, project := range projects {
 * 		o.setupBuildTask(project, nil, false, &completed, &analyzing, circularityStack)
 * 	}
 * }
 */
export function Orchestrator_GenerateGraph(receiver: GoPtr<Orchestrator>, oldTasks: GoPtr<SyncMap<Path, GoPtr<BuildTask>>>): void {
  const projects = ParsedBuildCommandLine_ResolvedProjectPaths(receiver!.opts.Command);
  const wg = NewWorkGroup(Tristate_IsTrue(receiver!.opts.Command!.CompilerOptions!.SingleThreaded));
  Orchestrator_createBuildTasks(receiver, oldTasks, projects, wg);
  wg.RunAndWait();

  const completed = NewSetWithSizeHint<Path>(0)!;
  const analyzing = NewSetWithSizeHint<Path>(0)!;
  const circularityStack: GoSlice<string> = [];
  for (const project of projects) {
    Orchestrator_setupBuildTask(receiver, project, undefined, false as bool, completed, analyzing, circularityStack);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Start","kind":"method","status":"implemented","sigHash":"0262ef5622e64e786c5441a5853ea21c76e8a20aa686c24179e144412a923b89","bodyHash":"9b1c7dea303633b2c3b13b0619e942ee19321e384be7627900742afec2c87dfe"}
 *
 * Go source:
 * func (o *Orchestrator) Start(ctx context.Context) tsc.CommandLineResult {
 * 	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
 * 		o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
 * 	}
 * 	o.GenerateGraph(nil)
 * 	result := o.buildOrClean()
 * 	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
 * 		o.Watch(ctx)
 * 		result.Watcher = o
 * 	}
 * 	return result
 * }
 */
export function Orchestrator_Start(receiver: GoPtr<Orchestrator>, ctx: Context): CommandLineResult {
  if (Tristate_IsTrue(receiver!.opts.Command!.CompilerOptions!.Watch)) {
    receiver!.watchStatusReporter!(NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode));
  }
  Orchestrator_GenerateGraph(receiver, undefined);
  const result = Orchestrator_buildOrClean(receiver);
  if (Tristate_IsTrue(receiver!.opts.Command!.CompilerOptions!.Watch)) {
    Orchestrator_Watch(receiver, ctx);
    result.Watcher = Orchestrator_as_tsc_Watcher(receiver);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Watch","kind":"method","status":"implemented","sigHash":"3a5d894f9edb920da49f99bb7ba9f2c595d97d3d4fcd5f67246ea84066ad4839","bodyHash":"3c7bc1f7d4b3ea995b9d2714a5c5699116b0515bc14d3bc0f39e0725b1d91a87"}
 *
 * Go source:
 * func (o *Orchestrator) Watch(ctx context.Context) {
 * 	o.wm.Lock()
 *
 * 	if o.opts.Testing == nil {
 * 		if o.opts.Sys.GetEnvironmentVariable("TS_WATCH_DEBUG") != "" {
 * 			o.wm.DebugLog = o.opts.Sys.Writer()
 * 		}
 * 		o.wm.EnsureDefaultBackend()
 * 	}
 *
 * 	o.updateWatch()
 * 	desiredDirs := o.computeDesiredWatches()
 * 	if err := o.wm.ReconcileWatches(desiredDirs); err != nil {
 * 		fmt.Fprintf(o.opts.Sys.Writer(), "%v\n", err)
 * 		o.wm.ForceOverflow()
 * 	}
 * 	o.resetCaches()
 *
 * 	o.wm.Unlock()
 *
 * 	if o.opts.Testing == nil {
 * 		o.wm.RunLoop(ctx, o.DoCycle)
 * 	}
 * }
 */
export function Orchestrator_Watch(receiver: GoPtr<Orchestrator>, ctx: Context): void {
  WatchManager_Lock(receiver!.wm);
  if (receiver!.opts.Testing === undefined) {
    if (receiver!.opts.Sys.GetEnvironmentVariable("TS_WATCH_DEBUG") !== "") {
      receiver!.wm!.DebugLog = receiver!.opts.Sys.Writer();
    }
    WatchManager_EnsureDefaultBackend(receiver!.wm);
  }
  Orchestrator_updateWatch(receiver);
  const desiredDirs = Orchestrator_computeDesiredWatches(receiver);
  const err = WatchManager_ReconcileWatches(receiver!.wm, desiredDirs);
  if (err !== undefined) {
    Fprintf(receiver!.opts.Sys.Writer(), "%v\n", err);
    WatchManager_ForceOverflow(receiver!.wm);
  }
  Orchestrator_resetCaches(receiver);
  WatchManager_Unlock(receiver!.wm);

  if (receiver!.opts.Testing === undefined) {
    WatchManager_RunLoop(receiver!.wm, ctx, (): void => Orchestrator_DoCycle(receiver));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.updateWatch","kind":"method","status":"implemented","sigHash":"218642ad6c3469aad6172a9e74ede9f4e4b3fdbaa9b0d8bb5632c9fc24105acb","bodyHash":"e12c9ed62a55b971ba42148f882fa9177c659094ad824046eb9ed92650e96cbf"}
 *
 * Go source:
 * func (o *Orchestrator) updateWatch() {
 * 	oldCache := o.host.mTimes
 * 	o.host.mTimes = &collections.SyncMap[tspath.Path, time.Time]{}
 * 	o.rangeTask(func(path tspath.Path, task *BuildTask) {
 * 		task.updateWatch(o, oldCache)
 * 	})
 * }
 */
export function Orchestrator_updateWatch(receiver: GoPtr<Orchestrator>): void {
  const oldCache = receiver!.host!.mTimes;
  receiver!.host!.mTimes = newSyncMap();
  Orchestrator_rangeTask(receiver, (_path: Path, task: GoPtr<BuildTask>): void => {
    BuildTask_updateWatch(task, receiver, oldCache);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.resetCaches","kind":"method","status":"implemented","sigHash":"6f412b8cdfba3231f801add4772a3c2119ffe5da7faf908703e3f75f0a233891","bodyHash":"fe4d07e47deb072bbe6569496a0a2327ccfda4d89b66f833660a2d86f5c70898"}
 *
 * Go source:
 * func (o *Orchestrator) resetCaches() {
 * 	// Clean out all the caches
 * 	cachesVfs := o.host.host.FS().(*cachedvfs.FS)
 * 	cachesVfs.ClearCache()
 * 	o.host.extendedConfigCache = tsc.ExtendedConfigCache{}
 * 	o.host.sourceFiles.reset()
 * 	o.host.configTimes = collections.SyncMap[tspath.Path, time.Duration]{}
 * }
 */
export function Orchestrator_resetCaches(receiver: GoPtr<Orchestrator>): void {
  const cachesVfs = GoInterfaceAssert(receiver!.host!.host.FS(), FS_GoInterfaceType);
  FS_ClearCache(cachesVfs);
  receiver!.host!.extendedConfigCache = { m: newSyncMap() };
  parseCache_reset(receiver!.host!.sourceFiles);
  receiver!.host!.configTimes = newSyncMap();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.checkTasksForEventChanges","kind":"method","status":"implemented","sigHash":"98d3899517c82e04b947061bc4c4856189d400742c02b9c377d15fb0020a57b7","bodyHash":"ab0d6b12a5f972a62b0a24f10838f6f11fb62af912656802604a2d9b8763d4b0"}
 *
 * Go source:
 * func (o *Orchestrator) checkTasksForEventChanges(changedPaths map[string]fswatch.EventKind, needsConfigUpdate, needsUpdate *atomic.Bool) {
 * 	normalizedPaths := make(map[tspath.Path]fswatch.EventKind, len(changedPaths))
 * 	for eventPath, kind := range changedPaths {
 * 		normalizedPaths[o.toPath(eventPath)] = kind
 * 	}
 *
 * 	for i := range o.order {
 * 		config := o.order[i]
 * 		path := o.toPath(config)
 * 		task := o.getTask(path)
 *
 * 		configPath := o.toPath(task.config)
 * 		if _, changed := normalizedPaths[configPath]; changed {
 * 			task.resetConfig(o, path)
 * 			needsConfigUpdate.Store(true)
 * 			needsUpdate.Store(true)
 * 			continue
 * 		}
 *
 * 		if task.resolved == nil {
 * 			continue
 * 		}
 *
 * 		configChanged := false
 * 		for _, file := range task.resolved.ExtendedSourceFiles() {
 * 			fp := o.toPath(file)
 * 			if _, changed := normalizedPaths[fp]; changed {
 * 				task.resetConfig(o, path)
 * 				needsConfigUpdate.Store(true)
 * 				needsUpdate.Store(true)
 * 				configChanged = true
 * 				break
 * 			}
 * 		}
 * 		if configChanged {
 * 			continue
 * 		}
 *
 * 		rootChanged := false
 * 		fileNames := task.resolved.FileNames()
 * 		roots := collections.NewSetWithSizeHint[tspath.Path](len(fileNames))
 * 		for _, file := range fileNames {
 * 			fp := o.toPath(file)
 * 			roots.Add(fp)
 * 			if !rootChanged {
 * 				if _, changed := normalizedPaths[fp]; changed {
 * 					task.resetStatus()
 * 					needsUpdate.Store(true)
 * 					rootChanged = true
 * 				}
 * 			}
 * 		}
 *
 * 		if !rootChanged {
 * 			task.buildInfoEntryMu.Lock()
 * 			bi := task.buildInfoEntry
 * 			task.buildInfoEntryMu.Unlock()
 * 			if bi != nil && bi.buildInfo != nil {
 * 				buildInfoDir := tspath.GetDirectoryPath(string(bi.path))
 * 				for _, fileName := range bi.buildInfo.FileNames {
 * 					fp := o.toPath(o.resolveBuildInfoFileName(fileName, buildInfoDir))
 * 					if roots.Has(fp) {
 * 						continue
 * 					}
 * 					if _, changed := normalizedPaths[fp]; changed {
 * 						task.resetStatus()
 * 						needsUpdate.Store(true)
 * 						break
 * 					}
 * 				}
 * 				for packageJson := range bi.buildInfo.GetPackageJsons(buildInfoDir) {
 * 					if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
 * 						task.resetStatus()
 * 						needsUpdate.Store(true)
 * 						break
 * 					}
 * 				}
 * 				for packageJson := range bi.buildInfo.GetMissingPackageJsons(buildInfoDir) {
 * 					if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
 * 						task.resetStatus()
 * 						needsUpdate.Store(true)
 * 						break
 * 					}
 * 				}
 * 			}
 * 			for _, packageJson := range task.packageJsons {
 * 				if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
 * 					task.resetStatus()
 * 					needsUpdate.Store(true)
 * 					break
 * 				}
 * 			}
 * 		}
 *
 * 		task.reportDone = make(chan struct{})
 * 		task.done = make(chan struct{})
 *
 * 		newConfig := task.resolved.ReloadFileNamesOfParsedCommandLine(o.host.FS())
 * 		if !slices.Equal(task.resolved.FileNames(), newConfig.FileNames()) {
 * 			o.host.resolvedReferences.store(path, newConfig)
 * 			task.resolved = newConfig
 * 			task.resetStatus()
 * 			needsUpdate.Store(true)
 * 		}
 * 	}
 *
 * 	if !needsUpdate.Load() {
 * 		opts := o.comparePathsOptions
 * 		for eventPath := range changedPaths {
 * 			if o.host.FS().DirectoryExists(eventPath) {
 * 				if o.wm.IsPathUnderWatch(eventPath, opts) {
 * 					o.rangeTask(func(path tspath.Path, task *BuildTask) {
 * 						task.resetStatus()
 * 						task.reportDone = make(chan struct{})
 * 						task.done = make(chan struct{})
 * 					})
 * 					needsUpdate.Store(true)
 * 					break
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function Orchestrator_checkTasksForEventChanges(receiver: GoPtr<Orchestrator>, changedPaths: GoMap<string, fswatch.EventKind>, needsConfigUpdate: GoPtr<Bool>, needsUpdate: GoPtr<Bool>): void {
  const normalizedPaths: GoMap<Path, fswatch.EventKind> = new Map<Path, fswatch.EventKind>();
  for (const [eventPath, kind] of changedPaths) {
    normalizedPaths.set(Orchestrator_toPath(receiver, eventPath), kind);
  }

  for (const config of receiver!.order) {
    const path = Orchestrator_toPath(receiver, config);
    const task = Orchestrator_getTask(receiver, path);

    const configPath = Orchestrator_toPath(receiver, task!.config);
    if (normalizedPaths.has(configPath)) {
      BuildTask_resetConfig(task, receiver, path);
      needsConfigUpdate!.Store(true as bool);
      needsUpdate!.Store(true as bool);
      continue;
    }

    if (task!.resolved === undefined) {
      continue;
    }

    let configChanged = false;
    for (const file of ParsedCommandLine_ExtendedSourceFiles(task!.resolved)) {
      if (normalizedPaths.has(Orchestrator_toPath(receiver, file))) {
        BuildTask_resetConfig(task, receiver, path);
        needsConfigUpdate!.Store(true as bool);
        needsUpdate!.Store(true as bool);
        configChanged = true;
        break;
      }
    }
    if (configChanged) {
      continue;
    }

    let rootChanged = false;
    const fileNames = ParsedCommandLine_FileNames(task!.resolved);
    const roots = NewSetWithSizeHint<Path>(fileNames.length);
    for (const file of fileNames) {
      const fp = Orchestrator_toPath(receiver, file);
      Set_Add(roots, fp);
      if (!rootChanged && normalizedPaths.has(fp)) {
        BuildTask_resetStatus(task);
        needsUpdate!.Store(true as bool);
        rootChanged = true;
      }
    }

    if (!rootChanged) {
      task!.buildInfoEntryMu.Lock();
      const bi = task!.buildInfoEntry;
      task!.buildInfoEntryMu.Unlock();
      if (bi !== undefined && bi.buildInfo !== undefined) {
        const buildInfoDir = GetDirectoryPath(String(bi.path));
        for (const fileName of bi.buildInfo.FileNames ?? []) {
          const fp = Orchestrator_toPath(receiver, Orchestrator_resolveBuildInfoFileName(receiver, fileName, buildInfoDir));
          if (Set_Has(roots, fp)) {
            continue;
          }
          if (normalizedPaths.has(fp)) {
            BuildTask_resetStatus(task);
            needsUpdate!.Store(true as bool);
            break;
          }
        }
        BuildInfo_GetPackageJsons(bi.buildInfo, buildInfoDir)((packageJson: string): bool => {
          if (Orchestrator_packageJsonLookupChanged(receiver, packageJson, normalizedPaths)) {
            BuildTask_resetStatus(task);
            needsUpdate!.Store(true as bool);
            return false as bool;
          }
          return true as bool;
        });
        BuildInfo_GetMissingPackageJsons(bi.buildInfo, buildInfoDir)((packageJson: string): bool => {
          if (Orchestrator_packageJsonLookupChanged(receiver, packageJson, normalizedPaths)) {
            BuildTask_resetStatus(task);
            needsUpdate!.Store(true as bool);
            return false as bool;
          }
          return true as bool;
        });
      }
      for (const packageJson of task!.packageJsons) {
        if (Orchestrator_packageJsonLookupChanged(receiver, packageJson, normalizedPaths)) {
          BuildTask_resetStatus(task);
          needsUpdate!.Store(true as bool);
          break;
        }
      }
    }

    task!.reportDone = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
    task!.done = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));

    const newConfig = ParsedCommandLine_ReloadFileNamesOfParsedCommandLine(task!.resolved, host_FS_fn(receiver!.host));
    if (!stringArrayEqual(ParsedCommandLine_FileNames(task!.resolved), ParsedCommandLine_FileNames(newConfig))) {
      parseCache_store(receiver!.host!.resolvedReferences, path, newConfig);
      task!.resolved = newConfig;
      BuildTask_resetStatus(task);
      needsUpdate!.Store(true as bool);
    }
  }

  if (!needsUpdate!.Load()) {
    const opts = receiver!.comparePathsOptions;
    for (const eventPath of changedPaths.keys()) {
      if (host_FS_fn(receiver!.host).DirectoryExists(eventPath)) {
        if (WatchManager_IsPathUnderWatch(receiver!.wm, eventPath, opts)) {
          Orchestrator_rangeTask(receiver, (_path: Path, task: GoPtr<BuildTask>): void => {
            BuildTask_resetStatus(task);
            task!.reportDone = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
            task!.done = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
          });
          needsUpdate!.Store(true as bool);
          break;
        }
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.packageJsonLookupChanged","kind":"method","status":"implemented","sigHash":"55bc6ba76be9cb87bd31d15ef63f63312d156a83625e9242b9152ac5f60f59b1","bodyHash":"b1a4472d9e7f760e5d2cbb049750baf167bf69d18150816f264b2bafa2df4971"}
 *
 * Go source:
 * func (o *Orchestrator) packageJsonLookupChanged(packageJson string, changedPaths map[tspath.Path]fswatch.EventKind) bool {
 * 	packageJsonPath := o.toPath(packageJson)
 * 	if _, changed := changedPaths[packageJsonPath]; changed {
 * 		return true
 * 	}
 * 	for changedPath, kind := range changedPaths {
 * 		if kind == fswatch.EventDelete && tspath.ContainsPath(string(changedPath), string(packageJsonPath), o.comparePathsOptions) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Orchestrator_packageJsonLookupChanged(receiver: GoPtr<Orchestrator>, packageJson: string, changedPaths: GoMap<Path, fswatch.EventKind>): bool {
  const packageJsonPath = Orchestrator_toPath(receiver, packageJson);
  if (changedPaths.has(packageJsonPath)) {
    return true as bool;
  }
  for (const [changedPath, kind] of changedPaths) {
    if (kind === fswatch.EventDelete && ContainsPath(String(changedPath), String(packageJsonPath), receiver!.comparePathsOptions)) {
      return true as bool;
    }
  }
  return false as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.computeDesiredWatches","kind":"method","status":"implemented","sigHash":"56dc5e6d67c26842bf41668082087ec133e79c46916f2e6fc3442a64689574db","bodyHash":"fc3778314bc5394eccca7003e821533eeff269407dfde1300760b38d36c6499e"}
 *
 * Go source:
 * func (o *Orchestrator) computeDesiredWatches() map[string]bool {
 * 	desiredDirs := make(map[string]bool)
 *
 * 	for i := range o.order {
 * 		config := o.order[i]
 * 		path := o.toPath(config)
 * 		task := o.getTask(path)
 *
 * 		// Watch config file directory
 * 		configDir := tspath.GetDirectoryPath(task.config)
 * 		realConfigDir := o.host.FS().Realpath(configDir)
 * 		if _, has := desiredDirs[realConfigDir]; !has {
 * 			desiredDirs[realConfigDir] = false
 * 		}
 *
 * 		if task.resolved == nil {
 * 			continue
 * 		}
 *
 * 		// Extended config file directories
 * 		for _, cfgPath := range task.resolved.ExtendedSourceFiles() {
 * 			realPath := o.host.FS().Realpath(cfgPath)
 * 			dir := tspath.GetDirectoryPath(realPath)
 * 			if _, has := desiredDirs[dir]; !has {
 * 				desiredDirs[dir] = false
 * 			}
 * 		}
 *
 * 		// Wildcard directories from tsconfig
 * 		for dir, recursive := range task.resolved.WildcardDirectories() {
 * 			realDir := o.host.FS().Realpath(dir)
 * 			if existing, has := desiredDirs[realDir]; has {
 * 				desiredDirs[realDir] = existing || recursive
 * 			} else {
 * 				desiredDirs[realDir] = recursive
 * 			}
 * 		}
 *
 * 		// Input file directories not already covered
 * 		for _, fileName := range task.resolved.FileNames() {
 * 			absPath := tspath.GetNormalizedAbsolutePath(fileName, o.opts.Sys.GetCurrentDirectory())
 * 			dir := tspath.GetDirectoryPath(absPath)
 * 			if !watchmanager.IsDirCoveredByWatch(desiredDirs, dir, o.comparePathsOptions) {
 * 				if watchmanager.CanWatchDirectory(dir) {
 * 					desiredDirs[dir] = false
 * 				}
 * 			}
 * 		}
 *
 * 		// Non-root dependency directories from buildinfo (e.g. node_modules .d.ts files).
 * 		task.buildInfoEntryMu.Lock()
 * 		bi := task.buildInfoEntry
 * 		task.buildInfoEntryMu.Unlock()
 * 		if bi != nil && bi.buildInfo != nil {
 * 			buildInfoDir := tspath.GetDirectoryPath(string(bi.path))
 * 			roots := collections.NewSetFromItems(core.Map(task.resolved.FileNames(), o.toPath)...)
 * 			for _, fileName := range bi.buildInfo.FileNames {
 * 				absPath := o.host.FS().Realpath(o.resolveBuildInfoFileName(fileName, buildInfoDir))
 * 				fp := o.toPath(absPath)
 * 				if roots.Has(fp) {
 * 					continue
 * 				}
 * 				dir := tspath.GetDirectoryPath(absPath)
 * 				if !watchmanager.IsDirCoveredByWatch(desiredDirs, dir, o.comparePathsOptions) {
 * 					if watchmanager.CanWatchDirectory(dir) {
 * 						desiredDirs[dir] = false
 * 					}
 * 				}
 * 			}
 * 			for packageJson := range bi.buildInfo.GetPackageJsons(buildInfoDir) {
 * 				o.addPackageJsonWatchDirs(desiredDirs, packageJson)
 * 			}
 * 			for packageJson := range bi.buildInfo.GetMissingPackageJsons(buildInfoDir) {
 * 				o.addPackageJsonWatchDirs(desiredDirs, packageJson)
 * 			}
 * 		}
 * 		for _, packageJson := range task.packageJsons {
 * 			o.addPackageJsonWatchDirs(desiredDirs, packageJson)
 * 		}
 * 	}
 *
 * 	return o.wm.ResolveDesiredDirs(desiredDirs)
 * }
 */
export function Orchestrator_computeDesiredWatches(receiver: GoPtr<Orchestrator>): GoMap<string, bool> {
  const desiredDirs: GoMap<string, bool> = new Map<string, bool>();

  for (const config of receiver!.order) {
    const path = Orchestrator_toPath(receiver, config);
    const task = Orchestrator_getTask(receiver, path);
    const configDir = GetDirectoryPath(task!.config);
    const realConfigDir = host_FS_fn(receiver!.host).Realpath(configDir);
    if (!desiredDirs.has(realConfigDir)) {
      desiredDirs.set(realConfigDir, false as bool);
    }

    if (task!.resolved === undefined) {
      continue;
    }

    for (const cfgPath of ParsedCommandLine_ExtendedSourceFiles(task!.resolved)) {
      const realPath = host_FS_fn(receiver!.host).Realpath(cfgPath);
      const dir = GetDirectoryPath(realPath);
      if (!desiredDirs.has(dir)) {
        desiredDirs.set(dir, false as bool);
      }
    }

    for (const [dir, recursive] of ParsedCommandLine_WildcardDirectories(task!.resolved)) {
      const realDir = host_FS_fn(receiver!.host).Realpath(dir);
      if (desiredDirs.has(realDir)) {
        desiredDirs.set(realDir, (desiredDirs.get(realDir)! || recursive) as bool);
      } else {
        desiredDirs.set(realDir, recursive);
      }
    }

    for (const fileName of ParsedCommandLine_FileNames(task!.resolved)) {
      const absPath = GetNormalizedAbsolutePath(fileName, receiver!.opts.Sys.GetCurrentDirectory());
      const dir = GetDirectoryPath(absPath);
      Orchestrator_addWatchDir(receiver, desiredDirs, dir);
    }

    task!.buildInfoEntryMu.Lock();
    const bi = task!.buildInfoEntry;
    task!.buildInfoEntryMu.Unlock();
    if (bi !== undefined && bi.buildInfo !== undefined) {
      const buildInfoDir = GetDirectoryPath(String(bi.path));
      const roots = NewSetFromItems(...ParsedCommandLine_FileNames(task!.resolved).map((fileName) => Orchestrator_toPath(receiver, fileName)));
      for (const fileName of bi.buildInfo.FileNames ?? []) {
        const absPath = host_FS_fn(receiver!.host).Realpath(Orchestrator_resolveBuildInfoFileName(receiver, fileName, buildInfoDir));
        const fp = Orchestrator_toPath(receiver, absPath);
        if (Set_Has(roots, fp)) {
          continue;
        }
        Orchestrator_addWatchDir(receiver, desiredDirs, GetDirectoryPath(absPath));
      }
      BuildInfo_GetPackageJsons(bi.buildInfo, buildInfoDir)((packageJson: string): bool => {
        Orchestrator_addPackageJsonWatchDirs(receiver, desiredDirs, packageJson);
        return true as bool;
      });
      BuildInfo_GetMissingPackageJsons(bi.buildInfo, buildInfoDir)((packageJson: string): bool => {
        Orchestrator_addPackageJsonWatchDirs(receiver, desiredDirs, packageJson);
        return true as bool;
      });
    }
    for (const packageJson of task!.packageJsons) {
      Orchestrator_addPackageJsonWatchDirs(receiver, desiredDirs, packageJson);
    }
  }

  return WatchManager_ResolveDesiredDirs(receiver!.wm, desiredDirs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.addWatchDir","kind":"method","status":"implemented","sigHash":"c008f571aac188908968f8498da1d2583b30e2909e4461783df006635dd91c99","bodyHash":"27d8a4a9351bbee0db38e0498af50808b2ac5d2b3c1f814684ea85060c1b9c57"}
 *
 * Go source:
 * func (o *Orchestrator) addWatchDir(desiredDirs map[string]bool, dir string) {
 * 	if !watchmanager.IsDirCoveredByWatch(desiredDirs, dir, o.comparePathsOptions) && watchmanager.CanWatchDirectory(dir) {
 * 		desiredDirs[dir] = false
 * 	}
 * }
 */
export function Orchestrator_addWatchDir(receiver: GoPtr<Orchestrator>, desiredDirs: GoMap<string, bool>, dir: string): void {
  if (!IsDirCoveredByWatch(desiredDirs, dir, receiver!.comparePathsOptions) && CanWatchDirectory(dir)) {
    desiredDirs.set(dir, false as bool);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.addPackageJsonWatchDirs","kind":"method","status":"implemented","sigHash":"a85cb273e52f3f6dee48d8954b8a70b7ec8e73933cb0c13d767fa370e104d966","bodyHash":"d35c0bf34bcc3c0270094472cce299a15edb7de5ae4b769ca0bda14be7fabcd6"}
 *
 * Go source:
 * func (o *Orchestrator) addPackageJsonWatchDirs(desiredDirs map[string]bool, packageJson string) {
 * 	dir := tspath.GetDirectoryPath(packageJson)
 * 	dirs := []string{dir}
 * 	foundNodeModules := false
 * 	for current := dir; ; {
 * 		parent := tspath.GetDirectoryPath(current)
 * 		if parent == "" || parent == current {
 * 			break
 * 		}
 * 		dirs = append(dirs, parent)
 * 		if tspath.GetBaseFileName(parent) == "node_modules" {
 * 			foundNodeModules = true
 * 			if grandparent := tspath.GetDirectoryPath(parent); grandparent != "" && grandparent != parent {
 * 				dirs = append(dirs, grandparent)
 * 			}
 * 			break
 * 		}
 * 		current = parent
 * 	}
 *
 * 	if !foundNodeModules {
 * 		o.addWatchDir(desiredDirs, dir)
 * 		return
 * 	}
 * 	for _, dir := range dirs {
 * 		o.addWatchDir(desiredDirs, dir)
 * 	}
 * }
 */
export function Orchestrator_addPackageJsonWatchDirs(receiver: GoPtr<Orchestrator>, desiredDirs: GoMap<string, bool>, packageJson: string): void {
  const dir = GetDirectoryPath(packageJson);
  const dirs: GoSlice<string> = [dir];
  let foundNodeModules = false;
  for (let current = dir; ;) {
    const parent = GetDirectoryPath(current);
    if (parent === "" || parent === current) {
      break;
    }
    dirs.push(parent);
    if (GetBaseFileName(parent) === "node_modules") {
      foundNodeModules = true;
      const grandparent = GetDirectoryPath(parent);
      if (grandparent !== "" && grandparent !== parent) {
        dirs.push(grandparent);
      }
      break;
    }
    current = parent;
  }

  if (!foundNodeModules) {
    Orchestrator_addWatchDir(receiver, desiredDirs, dir);
    return;
  }
  for (const watchDir of dirs) {
    Orchestrator_addWatchDir(receiver, desiredDirs, watchDir);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.DoCycle","kind":"method","status":"implemented","sigHash":"640ff407c09d9786aebcad8d144723150eab5e178d0af93c3f933d63211b0fc1","bodyHash":"ace471b829c4197f9541e5fa0833e70ac3e65c12d5d2202690a2f1830287b17c"}
 *
 * Go source:
 * func (o *Orchestrator) DoCycle() {
 * 	o.wm.Lock()
 * 	defer o.wm.Unlock()
 *
 * 	changedPaths, overflow := o.wm.DrainEvents()
 * 	hasEvents := len(changedPaths) > 0 || overflow
 *
 * 	if !hasEvents {
 * 		if o.wm.DebugLog != nil {
 * 			fmt.Fprintf(o.wm.DebugLog, "[watch] DoCycle: no events, skipping\n")
 * 		}
 * 		return
 * 	}
 *
 * 	var needsConfigUpdate atomic.Bool
 * 	var needsUpdate atomic.Bool
 *
 * 	if overflow {
 * 		// Overflow: reset all tasks to force a full rebuild.
 * 		o.rangeTask(func(path tspath.Path, task *BuildTask) {
 * 			task.resetConfig(o, path)
 * 			task.reportDone = make(chan struct{})
 * 			task.done = make(chan struct{})
 * 		})
 * 		needsConfigUpdate.Store(true)
 * 		needsUpdate.Store(true)
 * 	} else {
 * 		// Event-driven: check only tasks affected by changed paths
 * 		o.checkTasksForEventChanges(changedPaths, &needsConfigUpdate, &needsUpdate)
 * 	}
 *
 * 	if !needsUpdate.Load() {
 * 		o.resetCaches()
 * 		return
 * 	}
 *
 * 	o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation))
 * 	if needsConfigUpdate.Load() {
 * 		// Generate new tasks
 * 		o.GenerateGraphReusingOldTasks()
 * 	}
 *
 * 	o.buildOrClean()
 * 	o.updateWatch()
 * 	desiredDirs := o.computeDesiredWatches()
 * 	if err := o.wm.ReconcileWatches(desiredDirs); err != nil {
 * 		fmt.Fprintf(o.opts.Sys.Writer(), "%v\n", err)
 * 		// Mark overflow so the next event triggers a full rebuild
 * 		o.wm.ForceOverflow()
 * 	}
 * 	o.resetCaches()
 * }
 */
export function Orchestrator_DoCycle(receiver: GoPtr<Orchestrator>): void {
  WatchManager_Lock(receiver!.wm);
  try {
    const needsConfigUpdate = new Bool();
    const needsUpdate = new Bool();
    const [changedPaths, overflow] = WatchManager_DrainEvents(receiver!.wm);
    const hasEvents = (changedPaths !== undefined && changedPaths.size > 0) || overflow;

    if (!hasEvents) {
      if (receiver!.wm!.DebugLog !== undefined) {
        Fprintf(receiver!.wm!.DebugLog, "[watch] DoCycle: no events, skipping\n");
      }
      return;
    }

    if (overflow) {
      Orchestrator_rangeTask(receiver, (path: Path, task: GoPtr<BuildTask>): void => {
        BuildTask_resetConfig(task, receiver, path);
        task!.reportDone = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
        task!.done = MakeGoChan<{ readonly __tsgoEmpty?: never }>(0, () => ({}));
      });
      needsConfigUpdate.Store(true as bool);
      needsUpdate.Store(true as bool);
    } else {
      Orchestrator_checkTasksForEventChanges(receiver, changedPaths!, needsConfigUpdate, needsUpdate);
    }

    if (!needsUpdate.Load()) {
      Orchestrator_resetCaches(receiver);
      return;
    }

    receiver!.watchStatusReporter!(NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation));
    if (needsConfigUpdate.Load()) {
      Orchestrator_GenerateGraphReusingOldTasks(receiver);
    }

    Orchestrator_buildOrClean(receiver);
    Orchestrator_updateWatch(receiver);
    const desiredDirs = Orchestrator_computeDesiredWatches(receiver);
    const err = WatchManager_ReconcileWatches(receiver!.wm, desiredDirs);
    if (err !== undefined) {
      Fprintf(receiver!.opts.Sys.Writer(), "%v\n", err);
      WatchManager_ForceOverflow(receiver!.wm);
    }
    Orchestrator_resetCaches(receiver);
  } finally {
    WatchManager_Unlock(receiver!.wm);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.buildOrClean","kind":"method","status":"implemented","sigHash":"7d5f56d191ca2a8f9d05270b4da82798ad439398eca2dc68d650841d8dc293df","bodyHash":"88ac0456847aa9d5045c16d1a9046e9534c7dce6b3f83c5cdec3e43990285fcc"}
 *
 * Go source:
 * func (o *Orchestrator) buildOrClean() tsc.CommandLineResult {
 * 	if !o.opts.Command.BuildOptions.Clean.IsTrue() && o.opts.Command.BuildOptions.Verbose.IsTrue() {
 * 		o.createBuilderStatusReporter(nil)(ast.NewCompilerDiagnostic(
 * 			diagnostics.Projects_in_this_build_Colon_0,
 * 			strings.Join(core.Map(o.Order(), func(p string) string {
 * 				return "\r\n    * " + o.relativeFileName(p)
 * 			}), ""),
 * 		))
 * 	}
 * 	var buildResult orchestratorResult
 * 	if len(o.errors) == 0 {
 * 		buildResult.statistics.Projects = len(o.Order())
 * 		o.rangeTask(func(path tspath.Path, task *BuildTask) {
 * 			o.buildOrCleanProject(task, path, &buildResult)
 * 		})
 * 	} else {
 * 		// Circularity errors prevent any project from being built
 * 		buildResult.result.Status = tsc.ExitStatusProjectReferenceCycle_OutputsSkipped
 * 		reportDiagnostic := o.createDiagnosticReporter(nil)
 * 		for _, err := range o.errors {
 * 			reportDiagnostic(err)
 * 		}
 * 		buildResult.errors = o.errors
 * 	}
 * 	buildResult.report(o)
 * 	return buildResult.result
 * }
 */
export function Orchestrator_buildOrClean(receiver: GoPtr<Orchestrator>): CommandLineResult {
  if (!Tristate_IsTrue(receiver!.opts.Command!.BuildOptions!.Clean) && Tristate_IsTrue(receiver!.opts.Command!.BuildOptions!.Verbose)) {
    Orchestrator_createBuilderStatusReporter(receiver, undefined)(NewCompilerDiagnostic(
      diagnostics.Projects_in_this_build_Colon_0,
      strings.Join(core_Map(Orchestrator_Order(receiver), (p: string): string => "\r\n    * " + Orchestrator_relativeFileName(receiver, p)), ""),
    ));
  }
  const buildResult: orchestratorResult = {
    result: { Status: 0 as import("../tsc/compile.js").ExitStatus, Watcher: undefined },
    errors: [],
    statistics: {
      Projects: 0,
      ProjectsBuilt: 0,
      TimestampUpdates: 0,
    } as import("../tsc/statistics.js").Statistics,
    filesToDelete: [],
  };
  if (receiver!.errors.length === 0) {
    buildResult.statistics.Projects = Orchestrator_Order(receiver).length;
    Orchestrator_rangeTask(receiver, (path: Path, task: GoPtr<BuildTask>): void => {
      Orchestrator_buildOrCleanProject(receiver, task, path, buildResult);
    });
  } else {
    // Circularity errors prevent any project from being built
    buildResult.result.Status = ExitStatusProjectReferenceCycle_OutputsSkipped;
    const reportDiagnostic = Orchestrator_createDiagnosticReporter(receiver, undefined);
    for (const err of receiver!.errors) {
      reportDiagnostic(err);
    }
    buildResult.errors = receiver!.errors;
  }
  orchestratorResult_report(buildResult, receiver);
  return buildResult.result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.rangeTask","kind":"method","status":"implemented","sigHash":"c4b50a219b88c1e7ec3b1256d39ac98a97be09a55a8454631350f17e5bc19ad4","bodyHash":"659a424cabd1c3239753710c7f79a5ba56041d2200f577e3c31f3e8d52e50805"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"The JavaScript runtime has no blocking worker/goroutine execution for synchronous compiler bodies, so rangeTask walks the same topologically ordered task list synchronously; this preserves build/report ordering while the Go port uses a bounded worker group."}
 *
 * Go source:
 * func (o *Orchestrator) rangeTask(f func(path tspath.Path, task *BuildTask)) {
 * 	numRoutines := 4
 * 	if o.opts.Command.CompilerOptions.SingleThreaded.IsTrue() {
 * 		numRoutines = 1
 * 	} else if builders := o.opts.Command.BuildOptions.Builders; builders != nil {
 * 		numRoutines = *builders
 * 	}
 *
 * 	var currentTaskIndex atomic.Int64
 * 	getNextTask := func() (tspath.Path, *BuildTask, bool) {
 * 		index := int(currentTaskIndex.Add(1) - 1)
 * 		if index >= len(o.order) {
 * 			return "", nil, false
 * 		}
 * 		config := o.order[index]
 * 		path := o.toPath(config)
 * 		task := o.getTask(path)
 * 		return path, task, true
 * 	}
 * 	runTask := func() {
 * 		for path, task, ok := getNextTask(); ok; path, task, ok = getNextTask() {
 * 			f(path, task)
 * 		}
 * 	}
 * 
 * 	if numRoutines == 1 {
 * 		runTask()
 * 	} else {
 * 		wg := core.NewWorkGroup(false)
 * 		for range numRoutines {
 * 			wg.Queue(runTask)
 * 		}
 * 		wg.RunAndWait()
 * 	}
 * }
 */
export function Orchestrator_rangeTask(receiver: GoPtr<Orchestrator>, f: (path: Path, task: GoPtr<BuildTask>) => void): void {
  // In single-threaded TSTS, always run sequentially (numRoutines = 1)
  let currentTaskIndex = 0;
  while (currentTaskIndex < receiver!.order.length) {
    const index = currentTaskIndex;
    currentTaskIndex++;
    const config = receiver!.order[index]!;
    const path = Orchestrator_toPath(receiver, config);
    const task = Orchestrator_getTask(receiver, path);
    f(path, task);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.buildOrCleanProject","kind":"method","status":"implemented","sigHash":"1fe90a62f3e8d0f67ade2d3b056d1511c739e6bce2ef44d2f38b28503225a083","bodyHash":"9c8b3bb4a7a120085a1feb0288f06bd91c55c47c1aff26cd1f56e21b46963b7f"}
 *
 * Go source:
 * func (o *Orchestrator) buildOrCleanProject(task *BuildTask, path tspath.Path, buildResult *orchestratorResult) {
 * 	task.result = &taskResult{}
 * 	task.result.reportStatus = o.createBuilderStatusReporter(task)
 * 	task.result.diagnosticReporter = o.createDiagnosticReporter(task)
 * 	if !o.opts.Command.BuildOptions.Clean.IsTrue() {
 * 		task.buildProject(o, path)
 * 	} else {
 * 		task.cleanProject(o, path)
 * 	}
 * 	task.report(o, path, buildResult)
 * }
 */
export function Orchestrator_buildOrCleanProject(receiver: GoPtr<Orchestrator>, task: GoPtr<BuildTask>, path: Path, buildResult: GoPtr<orchestratorResult>): void {
  const builder = new Builder();
  const reportStatus = CreateBuilderStatusReporter(receiver!.opts.Sys, builder, ParsedBuildCommandLine_Locale(receiver!.opts.Command), receiver!.opts.Command!.CompilerOptions, receiver!.opts.Testing);
  const diagnosticReporter = CreateDiagnosticReporter(receiver!.opts.Sys, builder, ParsedBuildCommandLine_Locale(receiver!.opts.Command), receiver!.opts.Command!.CompilerOptions);
  task!.result = {
    builder,
    reportStatus,
    diagnosticReporter,
    exitStatus: 0 as import("../tsc/compile.js").ExitStatus,
    statistics: undefined,
    program: undefined,
    buildKind: 0 as import("./buildtask.js").buildKind,
    filesToDelete: [],
  };
  if (!Tristate_IsTrue(receiver!.opts.Command!.BuildOptions!.Clean)) {
    BuildTask_buildProject(task, receiver, path);
  } else {
    BuildTask_cleanProject(task, receiver, path);
  }
  BuildTask_report(task, receiver, path, buildResult);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.getWriter","kind":"method","status":"implemented","sigHash":"eb31e4ddd1f9d2150d9180a488576cad040605f79e0fc3515053d60ad08a916b","bodyHash":"d2bf80af84724134737bd5fd3fb39b774a888effd1f2f0c0372acd83cae2bd23"}
 *
 * Go source:
 * func (o *Orchestrator) getWriter(task *BuildTask) io.Writer {
 * 	if task == nil {
 * 		return o.opts.Sys.Writer()
 * 	}
 * 	return &task.result.builder
 * }
 */
export function Orchestrator_getWriter(receiver: GoPtr<Orchestrator>, task: GoPtr<BuildTask>): Writer {
  if (task === undefined || task === null) {
    return receiver!.opts.Sys.Writer();
  }
  return task!.result!.builder;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createBuilderStatusReporter","kind":"method","status":"implemented","sigHash":"6e00f36032a39c9ef392399b0e87a956867a3efb0a14c29e98ec6711d7c6316b","bodyHash":"60499118067602279b4673b4653c9d6af2bf4b4f5412899c6630632eb483fcea"}
 *
 * Go source:
 * func (o *Orchestrator) createBuilderStatusReporter(task *BuildTask) tsc.DiagnosticReporter {
 * 	return tsc.CreateBuilderStatusReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.Locale(), o.opts.Command.CompilerOptions, o.opts.Testing)
 * }
 */
export function Orchestrator_createBuilderStatusReporter(receiver: GoPtr<Orchestrator>, task: GoPtr<BuildTask>): DiagnosticReporter {
  return CreateBuilderStatusReporter(receiver!.opts.Sys, Orchestrator_getWriter(receiver, task), ParsedBuildCommandLine_Locale(receiver!.opts.Command), receiver!.opts.Command!.CompilerOptions, receiver!.opts.Testing);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createDiagnosticReporter","kind":"method","status":"implemented","sigHash":"737739d0bc4bc0efb4d794ff61c7d898082f295487378cb9bc77eb1f84fd2dc9","bodyHash":"fc665a57c15d5bafd44fec3d7c45c3e77dd42e2562e984a7a502c66dfed8275c"}
 *
 * Go source:
 * func (o *Orchestrator) createDiagnosticReporter(task *BuildTask) tsc.DiagnosticReporter {
 * 	return tsc.CreateDiagnosticReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.Locale(), o.opts.Command.CompilerOptions)
 * }
 */
export function Orchestrator_createDiagnosticReporter(receiver: GoPtr<Orchestrator>, task: GoPtr<BuildTask>): DiagnosticReporter {
  return CreateDiagnosticReporter(receiver!.opts.Sys, Orchestrator_getWriter(receiver, task), ParsedBuildCommandLine_Locale(receiver!.opts.Command), receiver!.opts.Command!.CompilerOptions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::func::NewOrchestrator","kind":"func","status":"implemented","sigHash":"6c0049265dfb54baf9553d2875da47942e66e5689268add560602a85932d4175","bodyHash":"aa61bd0b7acde68d0c282e4b517ba2b2c39528453b80f926dceaba3a3dd53b67"}
 *
 * Go source:
 * func NewOrchestrator(opts Options) *Orchestrator {
 * 	wm := watchmanager.NewWatchManager(opts.Sys.Writer(), opts.Sys.FS().DirectoryExists)
 * 	orchestrator := &Orchestrator{
 * 		opts: opts,
 * 		comparePathsOptions: tspath.ComparePathsOptions{
 * 			CurrentDirectory:          opts.Sys.GetCurrentDirectory(),
 * 			UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
 * 		},
 * 		tasks: &collections.SyncMap[tspath.Path, *BuildTask]{},
 * 		wm:    wm,
 * 	}
 * 	orchestrator.host = &host{
 * 		orchestrator: orchestrator,
 * 		host: compiler.NewCachedFSCompilerHost(
 * 			orchestrator.opts.Sys.GetCurrentDirectory(),
 * 			orchestrator.opts.Sys.FS(),
 * 			orchestrator.opts.Sys.DefaultLibraryPath(),
 * 			nil,
 * 			nil,
 * 		),
 * 		mTimes: &collections.SyncMap[tspath.Path, time.Time]{},
 * 	}
 * 	if opts.Command.CompilerOptions.Watch.IsTrue() {
 * 		orchestrator.watchStatusReporter = tsc.CreateWatchStatusReporter(opts.Sys, opts.Command.Locale(), opts.Command.CompilerOptions, opts.Testing)
 * 		if t, ok := opts.Testing.(watchmanager.CommandLineTestingWithWatchBackend); ok {
 * 			wm.SetBackend(t.WatchBackend())
 * 		}
 * 	} else {
 * 		orchestrator.errorSummaryReporter = tsc.CreateReportErrorSummary(opts.Sys, opts.Command.Locale(), opts.Command.CompilerOptions)
 * 	}
 * 	return orchestrator
 * }
 */
function newSyncMap<K extends GoComparable = unknown, V = unknown>(): SyncMap<K, V> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncGoMap() };
}

function stringArrayEqual(left: GoSlice<string>, right: GoSlice<string>): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function newParseCache<K extends GoComparable, V extends GoComparable>(): parseCache<K, V> {
  return { entries: newSyncMap<K, GoPtr<parseCacheEntry<V>>>() };
}

export function NewOrchestrator(opts: Options): GoPtr<Orchestrator> {
  const wm = NewWatchManager(opts.Sys.Writer(), (dir: string): bool => opts.Sys.FS().DirectoryExists(dir));
  const orchestrator: Orchestrator = {
    opts,
    comparePathsOptions: {
      CurrentDirectory: opts.Sys.GetCurrentDirectory(),
      UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
    },
    host: undefined,
    tasks: newSyncMap<Path, GoPtr<BuildTask>>(),
    order: [],
    errors: [],
    errorSummaryReporter: undefined,
    watchStatusReporter: undefined,
    wm,
  };
  const extendedConfigCache: ExtendedConfigCache = { m: newSyncMap() };
  const innerHost: host = {
    orchestrator,
    host: NewCachedFSCompilerHost(
      orchestrator.opts.Sys.GetCurrentDirectory(),
      orchestrator.opts.Sys.FS(),
      orchestrator.opts.Sys.DefaultLibraryPath(),
      undefined,
      undefined,
    ),
    extendedConfigCache,
    sourceFiles: newParseCache(),
    configTimes: newSyncMap(),
    resolvedReferences: newParseCache(),
    mTimes: newSyncMap(),
  };
  orchestrator.host = innerHost;
  if (Tristate_IsTrue(opts.Command!.CompilerOptions!.Watch)) {
    orchestrator.watchStatusReporter = CreateWatchStatusReporter(opts.Sys, ParsedBuildCommandLine_Locale(opts.Command), opts.Command!.CompilerOptions, opts.Testing);
    const backend = GetCommandLineTestingWatchBackend(opts.Testing);
    if (backend !== undefined) {
      WatchManager_SetBackend(wm, backend);
    }
  } else {
    orchestrator.errorSummaryReporter = CreateReportErrorSummary(opts.Sys, ParsedBuildCommandLine_Locale(opts.Command), opts.Command!.CompilerOptions);
  }
  return orchestrator;
}
