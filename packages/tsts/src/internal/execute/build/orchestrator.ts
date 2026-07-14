import type { bool, int } from "../../../go/scalars.js";
import { GoSliceIsNil, GoStringKey, GoZeroPointer, GoZeroString, type GoComparable, type GoPtr, type GoSlice } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend, GoStringValueOps } from "../../../go/compat.js";
import type { Context } from "../../../go/context.js";
import type { Writer } from "../../../go/io.js";
import type { Time } from "../../../go/time.js";
import { NewCompilerDiagnostic } from "../../ast/diagnostic.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import type { SourceFile } from "../../ast/ast.js";
import type { SourceFileParseOptions } from "../../ast/parseoptions.js";
import { Set_Has, Set_Add, NewSetFromItems } from "../../collections/set.js";
import type { Set } from "../../collections/set.js";
import { SyncMap_Load, SyncMap_LoadOrStore, SyncMap_Store, SyncMap_Clone, SyncMap_Range } from "../../collections/syncmap.js";
import type { SyncMap } from "../../collections/syncmap.js";
import { Map as core_Map, LastOrNil, IfElse } from "../../core/core.js";
import { Tristate_IsTrue } from "../../core/tristate.js";
import { NewWorkGroup } from "../../core/workgroup.js";
import type { WorkGroup } from "../../core/workgroup.js";
import * as diagnostics from "../../diagnostics/generated/messages.js";
import { ParsedBuildCommandLine_ResolvedProjectPaths, ParsedBuildCommandLine_Locale } from "../../tsoptions/parsedbuildcommandline.js";
import type { ParsedBuildCommandLine } from "../../tsoptions/parsedbuildcommandline.js";
import { ParsedCommandLine_ResolvedProjectReferencePaths, ParsedCommandLine_ProjectReferences } from "../../tsoptions/parsedcommandline.js";
import type { ParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import { ConvertToRelativePath, ToPath } from "../../tspath/path.js";
import type { ComparePathsOptions, Path } from "../../tspath/path.js";
import { CreateWatchStatusReporter, CreateReportErrorSummary, CreateBuilderStatusReporter, CreateDiagnosticReporter } from "../tsc/diagnostics.js";
import type { CommandLineResult, CommandLineTesting, System, Watcher } from "../tsc/compile.js";
import { ExitStatusProjectReferenceCycle_OutputsSkipped } from "../tsc/compile.js";
import type { DiagnosticReporter, DiagnosticsReporter } from "../tsc/diagnostics.js";
import { Statistics_SetTotalTime, Statistics_Report, Statistics_Aggregate } from "../tsc/statistics.js";
import type { Statistics } from "../tsc/statistics.js";
import { NewCachedFSCompilerHost } from "../../compiler/host.js";
import type { FS } from "../../vfs/vfs.js";
import { GetTraceWithWriterFromSys } from "../tsc/emit.js";
import { BuildTask_report, BuildTask_buildProject, BuildTask_cleanProject, BuildTask_updateWatch, BuildTask_resetStatus, BuildTask_resetConfig, BuildTask_hasUpdate, updateKindNone, updateKindConfig } from "./buildtask.js";
import type { BuildTask } from "./buildtask.js";
import { host_GetResolvedProjectReference, host_storeMTimeFromOldCache } from "./host.js";
import { parseCache_reset } from "./parseCache.js";
import { FS_ClearCache } from "../../vfs/cachedvfs/cachedvfs.js";
import type { FS as cachedvfs_FS } from "../../vfs/cachedvfs/cachedvfs.js";
import type { ExtendedConfigCache } from "../tsc/extendedconfigcache.js";
import type { host } from "./host.js";
import { Bool } from "../../../go/sync/atomic.js";
import { Map as SyncGoMap } from "../../../go/sync.js";
import * as strings from "../../../go/strings.js";
import { Builder } from "../../../go/strings.js";
import type { parseCache } from "./parseCache.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
import { GoSliceMake } from "../../../go/compat.js";
import { GoSliceLoad } from "../../../go/compat.js";
import { GoEmptySlice } from "../../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::Options","kind":"type","status":"implemented","sigHash":"69628808be0501ab69e7a2e5cf9c349ab1129718bc63d4ddc222553efb32cabf"}
 *
 * Go source:
 * Options struct {
 * 	Sys     tsc.System
 * 	Command *tsoptions.ParsedBuildCommandLine
 * 	Testing tsc.CommandLineTesting
 * }
 */
export interface Options {
  Sys: GoInterface<System>;
  Command: GoPtr<ParsedBuildCommandLine>;
  Testing: GoInterface<CommandLineTesting>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::orchestratorResult","kind":"type","status":"implemented","sigHash":"a1ed589b2a0d747bea2ec47282401deff0ac2f3a723cabe23cd94ac831dca679"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::orchestratorResult.report","kind":"method","status":"implemented","sigHash":"0a59edbd01202a17ebdb418c50376b520766b371a8e8f72da922342822877d92"}
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
 * 			))
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
  if (!GoSliceIsNil(receiver!.filesToDelete)) {
    Orchestrator_createBuilderStatusReporter(o, undefined)!(
      NewCompilerDiagnostic(
        diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
        strings.Join(core_Map(receiver!.filesToDelete, (f: string): string => "\r\n * " + f), ""),
      ),
    );
  }
  if (!Tristate_IsTrue(o!.opts.Command!.CompilerOptions!.Diagnostics) && !Tristate_IsTrue(o!.opts.Command!.CompilerOptions!.ExtendedDiagnostics)) {
    return;
  }
  Statistics_SetTotalTime(receiver!.statistics, o!.opts.Sys!.SinceStart());
  Statistics_Report(receiver!.statistics, o!.opts.Sys!.Writer(), o!.opts.Testing);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::type::Orchestrator","kind":"type","status":"implemented","sigHash":"e05f5ba48f3744ecc8508f03d5b85fa7b27841fc13a92d0513c3cdfe66c8b8eb"}
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
 * }
 */
export interface Orchestrator {
  opts: Options;
  comparePathsOptions: ComparePathsOptions;
  host: GoPtr<host>;
  tasks: GoPtr<SyncMap<Path, GoPtr<BuildTask>>>;
  order: GoSlice<string>;
  errors: GoSlice<GoPtr<Diagnostic>>;
  errorSummaryReporter: DiagnosticsReporter;
  watchStatusReporter: DiagnosticReporter;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"1aaddfbd8f11e780383f08dd48156b6b561e81530f23250d9e4452c6551864a5"}
 *
 * Go source:
 * var _ tsc.Watcher = (*Orchestrator)(nil)
 */
export let __a05f111f_0: GoInterface<Watcher> = Orchestrator_as_tsc_Watcher(undefined);

export function Orchestrator_as_tsc_Watcher(receiver: GoPtr<Orchestrator>): Watcher {
  return {
    DoCycle: (): void => Orchestrator_DoCycle(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.relativeFileName","kind":"method","status":"implemented","sigHash":"72ff97cf7be6af75d0bcb0a972d3c887eec0137ae80fdd7bf9ec0abf11edc9b4"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.toPath","kind":"method","status":"implemented","sigHash":"9e61b62a405e313d1ad17028e975890f0df3e6fd78ea274d85c7a5b9cc01edf0"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Order","kind":"method","status":"implemented","sigHash":"1301e30f674ef1c608aefd50ccd0739e9612b69d9bfa3960f0ef286873c97219"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Upstream","kind":"method","status":"implemented","sigHash":"7f3b0fb743b122979e2b074f6444231c3de0eb3ea6cb87465543694f936a5c96"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Downstream","kind":"method","status":"implemented","sigHash":"0fa4b32ce78c45e5133b8fb53e268a74704700b01972ead882fc5c003b17aecc"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.getTask","kind":"method","status":"implemented","sigHash":"4b2b5e6cba576241e54fc1ab31c9ede92bcb74dad862d5ecdc3676ff0de82092"}
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
  const [task, ok] = SyncMap_Load(receiver!.tasks, path, GoZeroPointer<BuildTask>, GoStringKey);
  if (!ok) {
    throw new globalThis.Error("No build task found for " + path);
  }
  return task;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createBuildTasks","kind":"method","status":"implemented","sigHash":"329dee7541b89ead2d2bbc950f66b9ac5355421b6feb4025adf54d1652414d57"}
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
export function Orchestrator_createBuildTasks(receiver: GoPtr<Orchestrator>, oldTasks: GoPtr<SyncMap<Path, GoPtr<BuildTask>>>, configs: GoSlice<string>, wg: GoInterface<WorkGroup>): void {
  for (
    let __goRangeSlice = configs,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const config = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    wg!.Queue((): void => {
      const path = Orchestrator_toPath(receiver, config);
      let task: GoPtr<BuildTask> = undefined;
      let buildInfo = undefined;
      if (oldTasks !== undefined) {
        const [existing, ok] = SyncMap_Load(oldTasks, path, GoZeroPointer<BuildTask>, GoStringKey);
        if (ok) {
          if (!existing!.dirty) {
            task = existing;
          } else {
            buildInfo = existing!.buildInfoEntry;
          }
        }
      }
      if (task === undefined) {
        const pending = new Bool();
        task = {
          config,
          resolved: undefined,
          upStream: GoSliceMake(0, 0, GoPointerValueOps<upstreamTask>()),
          downStream: GoSliceMake(0, 0, GoPointerValueOps<BuildTask>()),
          status: undefined,
          done: {} as BuildTask["done"],
          result: undefined,
          prevReporter: undefined,
          reportDone: {} as BuildTask["reportDone"],
          configTime: {} as Time,
          extendedConfigTimes: GoEmptySlice<Time>(),
          inputFiles: GoEmptySlice<Time>(),
          buildInfoEntry: buildInfo,
          buildInfoEntryMu: { Lock: () => {}, Unlock: () => {}, TryLock: () => true } as BuildTask["buildInfoEntryMu"],
          errors: GoSliceMake(0, 0, GoPointerValueOps<Diagnostic>()),
          pending,
          isInitialCycle: oldTasks === undefined,
          downStreamUpdateMu: { Lock: () => {}, Unlock: () => {}, TryLock: () => true } as BuildTask["downStreamUpdateMu"],
          dirty: false,
        };
        task!.pending.Store(true as bool);
        task!.buildInfoEntry = buildInfo;
      }
      const [, loaded] = SyncMap_LoadOrStore(receiver!.tasks, path, task, GoZeroPointer<BuildTask>, GoStringKey);
      if (loaded) {
        return;
      }
      task!.resolved = host_GetResolvedProjectReference(receiver!.host, config, path);
      task!.upStream = GoSliceMake(0, 0, GoPointerValueOps<upstreamTask>());
      if (task!.resolved !== undefined) {
        const refPaths = ParsedCommandLine_ResolvedProjectReferencePaths(task!.resolved);
        Orchestrator_createBuildTasks(receiver, oldTasks, refPaths, wg);
      }
    });
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.setupBuildTask","kind":"method","status":"implemented","sigHash":"66425ad7812e87b4684055d1970a30cb40f0863fef9394515cbb0c54bdf123e2"}
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
        receiver!.errors = GoSliceAppend(receiver!.errors, NewCompilerDiagnostic(
          diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
          strings.Join(circularityStack, "\n"),
        ), GoPointerValueOps<Diagnostic>());
      }
      return undefined;
    }
    Set_Add(analyzing, path, GoStringKey);
    circularityStack = GoSliceAppend(circularityStack, configName, GoStringValueOps);
    if (task!.resolved !== undefined) {
      const subRefs = ParsedCommandLine_ResolvedProjectReferencePaths(task!.resolved);
      const projectRefs = ParsedCommandLine_ProjectReferences(task!.resolved);
      for (let index = 0; index < subRefs.length; index++) {
        const subReference = GoSliceLoad(subRefs, index, GoStringValueOps)!;
        const upstream = Orchestrator_setupBuildTask(receiver, subReference, task, (inCircularContext || projectRefs[index]!.Circular) as bool, completed, analyzing, circularityStack);
        if (upstream !== undefined) {
          task!.upStream = GoSliceAppend(task!.upStream, { task: upstream, refIndex: index }, GoPointerValueOps<upstreamTask>());
        }
      }
    }
    circularityStack = circularityStack.slice(0, circularityStack.length - 1);
    Set_Add(completed, path, GoStringKey);
    task!.reportDone = {} as BuildTask["reportDone"];
    const prev = LastOrNil(receiver!.order, GoZeroString);
    if (prev !== "") {
      task!.prevReporter = Orchestrator_getTask(receiver, Orchestrator_toPath(receiver, prev));
    }
    task!.done = {} as BuildTask["done"];
    receiver!.order = GoSliceAppend(receiver!.order, configName, GoStringValueOps);
  }
  if (Tristate_IsTrue(receiver!.opts.Command!.CompilerOptions!.Watch) && downStream !== undefined) {
    task!.downStream = GoSliceAppend(task!.downStream, downStream, GoPointerValueOps<BuildTask>());
  }
  return task;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.GenerateGraphReusingOldTasks","kind":"method","status":"implemented","sigHash":"169d3ccca94606a2a402942539df2105a48962d215156c2d8c57714504cbb3ca"}
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
  receiver!.order = GoSliceMake(0, 0, GoStringValueOps);
  receiver!.errors = GoSliceMake(0, 0, GoPointerValueOps<Diagnostic>());
  Orchestrator_GenerateGraph(receiver, tasks);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.GenerateGraph","kind":"method","status":"implemented","sigHash":"279f8f4940231b9f3a890093603ccd86df99c79f77cdc4ff810389693aee4527"}
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
  wg!.RunAndWait();

  const completed: Set<Path> = {} as Set<Path>;
  const analyzing: Set<Path> = {} as Set<Path>;
  const circularityStack: GoSlice<string> = GoSliceMake(0, 0, GoStringValueOps);
  for (
    let __goRangeSlice = projects,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const project = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    Orchestrator_setupBuildTask(receiver, project, undefined, false as bool, completed, analyzing, circularityStack);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Start","kind":"method","status":"implemented","sigHash":"0262ef5622e64e786c5441a5853ea21c76e8a20aa686c24179e144412a923b89"}
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
export function Orchestrator_Start(receiver: GoPtr<Orchestrator>, ctx: GoInterface<Context>): CommandLineResult {
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.Watch","kind":"method","status":"implemented","sigHash":"3a5d894f9edb920da49f99bb7ba9f2c595d97d3d4fcd5f67246ea84066ad4839"}
 *
 * Go source:
 * func (o *Orchestrator) Watch(ctx context.Context) {
 * 	o.updateWatch()
 * 	o.resetCaches()
 *
 * 	// Start watching for file changes
 * 	if o.opts.Testing == nil {
 * 		watchInterval := o.opts.Command.WatchOptions.WatchInterval()
 * 		ticker := time.NewTicker(watchInterval)
 * 		defer ticker.Stop()
 * 		for {
 * 			select {
 * 			case <-ctx.Done():
 * 				return
 * 			case <-ticker.C:
 * 				o.DoCycle()
 * 			}
 * 		}
 * 	}
 * }
 */
export function Orchestrator_Watch(receiver: GoPtr<Orchestrator>, ctx: GoInterface<Context>): void {
  void ctx;
  Orchestrator_updateWatch(receiver);
  Orchestrator_resetCaches(receiver);
  // In single-threaded TSTS, no goroutine loop; testing mode only
  if (receiver!.opts.Testing === undefined || receiver!.opts.Testing === null) {
    // Non-test: the go code would block forever in a ticker/ctx.Done() select
    // loop calling o.DoCycle() — no-op in single-threaded JS.
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.updateWatch","kind":"method","status":"implemented","sigHash":"218642ad6c3469aad6172a9e74ede9f4e4b3fdbaa9b0d8bb5632c9fc24105acb"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.resetCaches","kind":"method","status":"implemented","sigHash":"6f412b8cdfba3231f801add4772a3c2119ffe5da7faf908703e3f75f0a233891"}
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
  const cachesVfs = receiver!.host!.host!.FS() as unknown as cachedvfs_FS;
  FS_ClearCache(cachesVfs);
  receiver!.host!.extendedConfigCache = { m: newSyncMap() };
  parseCache_reset(receiver!.host!.sourceFiles);
  receiver!.host!.configTimes = newSyncMap();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.DoCycle","kind":"method","status":"implemented","sigHash":"640ff407c09d9786aebcad8d144723150eab5e178d0af93c3f933d63211b0fc1"}
 *
 * Go source:
 * func (o *Orchestrator) DoCycle() {
 * 	var needsConfigUpdate atomic.Bool
 * 	var needsUpdate atomic.Bool
 * 	mTimes := o.host.mTimes.Clone()
 * 	o.rangeTask(func(path tspath.Path, task *BuildTask) {
 * 		if updateKind := task.hasUpdate(o, path); updateKind != updateKindNone {
 * 			needsUpdate.Store(true)
 * 			if updateKind == updateKindConfig {
 * 				needsConfigUpdate.Store(true)
 * 			}
 * 		}
 * 	})
 *
 * 	if !needsUpdate.Load() {
 * 		o.host.mTimes = mTimes
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
 * 	o.resetCaches()
 * }
 */
export function Orchestrator_DoCycle(receiver: GoPtr<Orchestrator>): void {
  const needsConfigUpdate = new Bool();
  const needsUpdate = new Bool();
  const mTimes = SyncMap_Clone(receiver!.host!.mTimes, GoStringKey);
  Orchestrator_rangeTask(receiver, (path: Path, task: GoPtr<BuildTask>): void => {
    const kind = BuildTask_hasUpdate(task, receiver, path);
    if (kind !== updateKindNone) {
      needsUpdate.Store(true as bool);
      if (kind === updateKindConfig) {
        needsConfigUpdate.Store(true as bool);
      }
    }
  });

  if (!needsUpdate.Load()) {
    receiver!.host!.mTimes = mTimes;
    Orchestrator_resetCaches(receiver);
    return;
  }

  receiver!.watchStatusReporter!(NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation));
  if (needsConfigUpdate.Load()) {
    Orchestrator_GenerateGraphReusingOldTasks(receiver);
  }

  Orchestrator_buildOrClean(receiver);
  Orchestrator_updateWatch(receiver);
  Orchestrator_resetCaches(receiver);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.buildOrClean","kind":"method","status":"implemented","sigHash":"7d5f56d191ca2a8f9d05270b4da82798ad439398eca2dc68d650841d8dc293df"}
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
    Orchestrator_createBuilderStatusReporter(receiver, undefined)!(NewCompilerDiagnostic(
      diagnostics.Projects_in_this_build_Colon_0,
      strings.Join(core_Map(Orchestrator_Order(receiver), (p: string): string => "\r\n    * " + Orchestrator_relativeFileName(receiver, p)), ""),
    ));
  }
  const buildResult: orchestratorResult = {
    result: { Status: 0 as import("../tsc/compile.js").ExitStatus, Watcher: undefined },
    errors: GoSliceMake(0, 0, GoPointerValueOps<Diagnostic>()),
    statistics: {
      Projects: 0,
      ProjectsBuilt: 0,
      TimestampUpdates: 0,
    } as import("../tsc/statistics.js").Statistics,
    filesToDelete: GoSliceMake(0, 0, GoStringValueOps),
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
    for (
      let __goRangeSlice = receiver!.errors,
        __goRangeLength = __goRangeSlice.length,
        __goRangeValueOps = GoPointerValueOps<Diagnostic>(),
        __goRangeIndex = 0;
      __goRangeIndex < __goRangeLength;
      __goRangeIndex++
    ) {
      const err = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
      reportDiagnostic!(err);
    }
    buildResult.errors = receiver!.errors;
  }
  orchestratorResult_report(buildResult, receiver);
  return buildResult.result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.rangeTask","kind":"method","status":"implemented","sigHash":"c4b50a219b88c1e7ec3b1256d39ac98a97be09a55a8454631350f17e5bc19ad4"}
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
export function Orchestrator_rangeTask(receiver: GoPtr<Orchestrator>, f: GoFunc<(path: Path, task: GoPtr<BuildTask>) => void>): void {
  // In single-threaded TSTS, always run sequentially (numRoutines = 1)
  let currentTaskIndex = 0;
  while (currentTaskIndex < receiver!.order.length) {
    const index = currentTaskIndex;
    currentTaskIndex++;
    const config = GoSliceLoad(receiver!.order, index, GoStringValueOps)!;
    const path = Orchestrator_toPath(receiver, config);
    const task = Orchestrator_getTask(receiver, path);
    f!(path, task);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.buildOrCleanProject","kind":"method","status":"implemented","sigHash":"1fe90a62f3e8d0f67ade2d3b056d1511c739e6bce2ef44d2f38b28503225a083"}
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
  task!.result = {
    builder: new Builder(),
    reportStatus: undefined as unknown as import("../tsc/diagnostics.js").DiagnosticReporter,
    diagnosticReporter: undefined as unknown as import("../tsc/diagnostics.js").DiagnosticReporter,
    exitStatus: 0 as import("../tsc/compile.js").ExitStatus,
    statistics: undefined,
    program: undefined,
    buildKind: 0 as import("./buildtask.js").buildKind,
    filesToDelete: GoSliceMake(0, 0, GoStringValueOps),
  };
  task!.result.reportStatus = Orchestrator_createBuilderStatusReporter(receiver, task);
  task!.result.diagnosticReporter = Orchestrator_createDiagnosticReporter(receiver, task);
  if (!Tristate_IsTrue(receiver!.opts.Command!.BuildOptions!.Clean)) {
    BuildTask_buildProject(task, receiver, path);
  } else {
    BuildTask_cleanProject(task, receiver, path);
  }
  BuildTask_report(task, receiver, path, buildResult);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.getWriter","kind":"method","status":"implemented","sigHash":"eb31e4ddd1f9d2150d9180a488576cad040605f79e0fc3515053d60ad08a916b"}
 *
 * Go source:
 * func (o *Orchestrator) getWriter(task *BuildTask) io.Writer {
 * 	if task == nil {
 * 		return o.opts.Sys.Writer()
 * 	}
 * 	return &task.result.builder
 * }
 */
export function Orchestrator_getWriter(receiver: GoPtr<Orchestrator>, task: GoPtr<BuildTask>): GoInterface<Writer> {
  if (task === undefined || task === null) {
    return receiver!.opts.Sys!.Writer();
  }
  return task!.result!.builder as unknown as Writer;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createBuilderStatusReporter","kind":"method","status":"implemented","sigHash":"6e00f36032a39c9ef392399b0e87a956867a3efb0a14c29e98ec6711d7c6316b"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::method::Orchestrator.createDiagnosticReporter","kind":"method","status":"implemented","sigHash":"737739d0bc4bc0efb4d794ff61c7d898082f295487378cb9bc77eb1f84fd2dc9"}
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
 * Port note: upstream implementation source follows.
 *
 * Go source:
 * func NewOrchestrator(opts Options) *Orchestrator {
 * 	orchestrator := &Orchestrator{
 * 		opts: opts,
 * 		comparePathsOptions: tspath.ComparePathsOptions{
 * 			CurrentDirectory:          opts.Sys.GetCurrentDirectory(),
 * 			UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
 * 		},
 * 		tasks: &collections.SyncMap[tspath.Path, *BuildTask]{},
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
 * 	} else {
 * 		orchestrator.errorSummaryReporter = tsc.CreateReportErrorSummary(opts.Sys, opts.Command.Locale(), opts.Command.CompilerOptions)
 * 	}
 * 	return orchestrator
 * }
 */
function newSyncMap<K extends GoComparable, V>(): SyncMap<K, V> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncGoMap() } as SyncMap<K, V>;
}

function newParseCache<K extends GoComparable, V extends GoComparable>(): parseCache<K, V> {
  return { entries: newSyncMap() };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/orchestrator.go::func::NewOrchestrator","kind":"func","status":"implemented","sigHash":"6c0049265dfb54baf9553d2875da47942e66e5689268add560602a85932d4175"}
 */
export function NewOrchestrator(opts: Options): GoPtr<Orchestrator> {
  const orchestrator: Orchestrator = {
    opts,
    comparePathsOptions: {
      CurrentDirectory: opts.Sys!.GetCurrentDirectory(),
      UseCaseSensitiveFileNames: opts.Sys!.FS()!.UseCaseSensitiveFileNames(),
    },
    host: undefined,
    tasks: newSyncMap<Path, GoPtr<BuildTask>>(),
    order: GoSliceMake(0, 0, GoStringValueOps),
    errors: GoSliceMake(0, 0, GoPointerValueOps<Diagnostic>()),
    errorSummaryReporter: undefined,
    watchStatusReporter: undefined,
  };
  const extendedConfigCache: ExtendedConfigCache = { m: newSyncMap() };
  const innerHost: host = {
    orchestrator,
    host: NewCachedFSCompilerHost(
      orchestrator.opts.Sys!.GetCurrentDirectory(),
      orchestrator.opts.Sys!.FS(),
      orchestrator.opts.Sys!.DefaultLibraryPath(),
      undefined,
      undefined,
    ),
    extendedConfigCache,
    sourceFiles: newParseCache<SourceFileParseOptions, GoPtr<SourceFile>>(),
    configTimes: newSyncMap(),
    resolvedReferences: newParseCache<Path, GoPtr<ParsedCommandLine>>(),
    mTimes: newSyncMap(),
  };
  orchestrator.host = innerHost;
  if (Tristate_IsTrue(opts.Command!.CompilerOptions!.Watch)) {
    orchestrator.watchStatusReporter = CreateWatchStatusReporter(opts.Sys, ParsedBuildCommandLine_Locale(opts.Command), opts.Command!.CompilerOptions, opts.Testing);
  } else {
    orchestrator.errorSummaryReporter = CreateReportErrorSummary(opts.Sys, ParsedBuildCommandLine_Locale(opts.Command), opts.Command!.CompilerOptions);
  }
  return orchestrator;
}
