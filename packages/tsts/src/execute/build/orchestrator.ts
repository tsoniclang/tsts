import {
  ExitStatus,
  Statistics,
  type CommandLineResult,
  type DiagnosticLike,
  type DiagnosticReporter,
  type DiagnosticsReporter,
  type Watcher,
} from "../tsc/index.js";
import {
  BuildTask,
  UpdateKind,
  type BuildAggregateResult,
  type BuildCompileAndEmitResult,
  type BuildInfoLike,
  type BuildTaskHost,
  type BuildTaskOrchestrator,
  type BuildTaskResolvedProject,
} from "./buildTask.js";

export interface BuildOptions<ParsedCommandLine extends BuildCommandLine = BuildCommandLine> {
  readonly command: ParsedCommandLine;
  readonly testing?: unknown;
  readonly writer: (text: string) => void;
  readonly now: () => Date;
  readonly sinceStart: () => number;
  readonly getResolvedProjectReference: (config: string, path: string) => BuildTaskResolvedProject | undefined;
  readonly toPath: (fileName: string) => string;
  readonly relativeFileName: (fileName: string) => string;
  readonly host?: BuildTaskHost;
  readonly buildInfoRead?: (task: BuildTask, path: string) => BuildInfoLike | undefined;
  readonly compileAndEmit?: (task: BuildTask, path: string) => BuildCompileAndEmitResult;
  readonly onProgram?: (program: unknown) => void;
}

export interface BuildCommandLine {
  readonly compilerOptions: BuildCompilerOptions;
  resolvedProjectPaths(): readonly string[];
}

export interface BuildCompilerOptions {
  readonly watch: boolean;
  readonly singleThreaded: boolean;
  readonly diagnostics: boolean;
  readonly extendedDiagnostics: boolean;
  readonly clean?: boolean;
  readonly verbose?: boolean;
  readonly dry?: boolean;
  readonly force?: boolean;
  readonly stopBuildOnErrors?: boolean;
  readonly builders?: number;
}

export interface BuildResult extends CommandLineResult {
  readonly errors: readonly unknown[];
  readonly statistics: Statistics | undefined;
  readonly filesToDelete: readonly string[];
}

class OrchestratorResult<Diagnostic extends DiagnosticLike = DiagnosticLike> implements BuildAggregateResult<Diagnostic> {
  errors: Diagnostic[] = [];
  status: ExitStatus = ExitStatus.Success;
  statistics: Statistics | undefined = new Statistics();
  filesToDelete: string[] = [];

  report(orchestrator: Orchestrator): void {
    if (orchestrator.opts.command.compilerOptions.watch) {
      orchestrator.watchStatusReporter({
        message: this.errors.length === 1
          ? "Found 1 error. Watching for file changes."
          : `Found ${this.errors.length} errors. Watching for file changes.`,
      });
    } else {
      orchestrator.errorSummaryReporter(this.errors);
    }
    if (this.filesToDelete.length > 0) {
      orchestrator.createBuilderStatusReporter()({
        message: "A non-dry build would delete the following files:" + this.filesToDelete.map((file) => "\r\n * " + file).join(""),
      });
    }
    if (!orchestrator.opts.command.compilerOptions.diagnostics && !orchestrator.opts.command.compilerOptions.extendedDiagnostics) return;
    this.statistics?.setTotalTime(orchestrator.opts.sinceStart());
    this.statistics?.report({ write: orchestrator.opts.writer });
  }
}

export class Orchestrator implements Watcher {
  readonly opts: BuildOptions;
  readonly tasks = new Map<string, BuildTask>();
  order: string[] = [];
  errors: DiagnosticLike[] = [];
  errorSummaryReporter: DiagnosticsReporter<DiagnosticLike> = (_diagnostics: readonly DiagnosticLike[]): void => {};
  watchStatusReporter: DiagnosticReporter<DiagnosticLike> = (_diagnostic: DiagnosticLike): void => {};

  constructor(opts: BuildOptions) {
    this.opts = opts;
  }

  relativeFileName(fileName: string): string {
    return this.opts.relativeFileName(fileName);
  }

  toPath(fileName: string): string {
    return this.opts.toPath(fileName);
  }

  orderList(): readonly string[] {
    return this.order;
  }

  getTask(path: string): BuildTask {
    const task = this.tasks.get(path);
    if (task === undefined) throw new Error(`No build task found for ${path}`);
    return task;
  }

  upstream(configName: string): readonly string[] {
    const task = this.getTask(this.toPath(configName));
    return task.upStream.map((upstream) => upstream.task.config);
  }

  downstream(configName: string): readonly string[] {
    const task = this.getTask(this.toPath(configName));
    return task.downStream.map((downstream) => downstream.config);
  }

  createBuildTasks(configs: readonly string[], oldTasks: ReadonlyMap<string, BuildTask> | undefined = undefined): void {
    for (const config of configs) {
      const path = this.toPath(config);
      if (this.tasks.has(path)) continue;
      const oldTask = oldTasks?.get(path);
      const task = oldTask !== undefined && !oldTask.dirty ? oldTask : new BuildTask(config);
      if (oldTask !== undefined && oldTask.dirty) task.buildInfoEntry = oldTask.buildInfoEntry;
      task.resolved = this.opts.getResolvedProjectReference(config, path);
      task.upStream = [];
      task.downStream = [];
      this.tasks.set(path, task);
      if (task.resolved !== undefined) this.createBuildTasks(task.resolved.resolvedProjectReferencePaths(), oldTasks);
    }
  }

  setupBuildTask(
    configName: string,
    downStream: BuildTask | undefined,
    inCircularContext: boolean,
    completed: Set<string>,
    analyzing: Set<string>,
    circularityStack: string[],
  ): BuildTask | undefined {
    const path = this.toPath(configName);
    const task = this.getTask(path);
    if (!completed.has(path)) {
      if (analyzing.has(path)) {
        if (!inCircularContext) this.errors.push({ message: `Project references may not form a circular graph: ${circularityStack.join("\n")}` });
        return undefined;
      }
      analyzing.add(path);
      circularityStack.push(configName);
      const references = task.resolved?.resolvedProjectReferencePaths() ?? [];
      const referenceOptions = task.resolved?.projectReferences() ?? [];
      for (let index = 0; index < references.length; index += 1) {
        const reference = references[index];
        if (reference === undefined) continue;
        const upstream = this.setupBuildTask(
          reference,
          task,
          inCircularContext || referenceOptions[index]?.circular === true,
          completed,
          analyzing,
          circularityStack,
        );
        if (upstream !== undefined) task.upStream.push({ task: upstream, refIndex: index });
      }
      circularityStack.pop();
      completed.add(path);
      const previous = this.order[this.order.length - 1];
      if (previous !== undefined) task.prevReporter = this.getTask(this.toPath(previous));
      task.reportCompleted = false;
      task.buildCompleted = false;
      this.order.push(configName);
    }
    if (this.opts.command.compilerOptions.watch && downStream !== undefined) task.downStream.push(downStream);
    return task;
  }

  generateGraph(oldTasks: ReadonlyMap<string, BuildTask> | undefined = undefined): void {
    this.tasks.clear();
    this.order = [];
    this.errors = [];
    const projects = this.opts.command.resolvedProjectPaths();
    this.createBuildTasks(projects, oldTasks);
    const completed = new Set<string>();
    const analyzing = new Set<string>();
    for (const project of projects) this.setupBuildTask(project, undefined, false, completed, analyzing, []);
  }

  generateGraphReusingOldTasks(): void {
    const oldTasks = new Map(this.tasks);
    this.generateGraph(oldTasks);
  }

  start(status: ExitStatus = ExitStatus.Success): BuildResult {
    if (this.opts.command.compilerOptions.watch) this.watchStatusReporter({ message: "Starting compilation in watch mode." });
    this.generateGraph();
    const result = this.buildOrClean(status);
    if (this.opts.command.compilerOptions.watch) {
      this.updateWatch();
      this.resetCaches();
      return { ...result, watcher: this };
    }
    return result;
  }

  buildOrClean(status: ExitStatus = ExitStatus.Success): BuildResult {
    if (!this.opts.command.compilerOptions.clean && this.opts.command.compilerOptions.verbose) {
      this.createBuilderStatusReporter()({
        message: "Projects in this build:" + this.order.map((project) => "\r\n    * " + this.relativeFileName(project)).join(""),
      });
    }
    const aggregate = new OrchestratorResult();
    aggregate.errors.push(...this.errors);
    aggregate.status = this.errors.length === 0 ? status : ExitStatus.ProjectReferenceCycleOutputsSkipped;
    if (this.errors.length === 0) {
      aggregate.statistics!.projects = this.order.length;
      this.rangeTask((path, task) => this.buildOrCleanProject(task, path, aggregate));
    } else {
      const reportDiagnostic = this.createDiagnosticReporter();
      for (const error of this.errors) reportDiagnostic(error);
    }
    aggregate.report(this);
    return {
      status: aggregate.status,
      errors: aggregate.errors,
      statistics: aggregate.statistics,
      filesToDelete: aggregate.filesToDelete,
    };
  }

  rangeTask(callback: (path: string, task: BuildTask) => void): void {
    for (const config of this.order) {
      const path = this.toPath(config);
      callback(path, this.getTask(path));
    }
  }

  buildOrCleanProject(task: BuildTask, path: string, buildResult: BuildAggregateResult): void {
    const taskOrchestrator = this.taskOrchestrator();
    if (!this.opts.command.compilerOptions.clean) task.buildProject(taskOrchestrator, path);
    else task.cleanProject(taskOrchestrator, path);
    task.report(taskOrchestrator, buildResult);
  }

  updateWatch(): void {
    this.rangeTask((_path, task) => task.updateWatch(this.taskOrchestrator()));
  }

  resetCaches(): void {
  }

  doCycle(): void {
    let needsConfigUpdate = false;
    let needsUpdate = false;
    this.rangeTask((path, task) => {
      const updateKind = task.hasUpdate(this.taskOrchestrator(), path);
      if (updateKind !== UpdateKind.None) {
        needsUpdate = true;
        if (updateKind === UpdateKind.Config) needsConfigUpdate = true;
      }
    });
    if (!needsUpdate) {
      this.resetCaches();
      return;
    }
    this.watchStatusReporter({ message: "File change detected. Starting incremental compilation." });
    if (needsConfigUpdate) this.generateGraphReusingOldTasks();
    this.buildOrClean();
    this.updateWatch();
    this.resetCaches();
  }

  createBuilderStatusReporter(): DiagnosticReporter<DiagnosticLike> {
    return (diagnostic) => {
      this.opts.writer(`${this.opts.now().toLocaleTimeString()} - ${diagnostic.message}\n\n`);
    };
  }

  createDiagnosticReporter(): DiagnosticReporter<DiagnosticLike> {
    return (diagnostic) => this.opts.writer(diagnostic.message + "\n");
  }

  private taskOrchestrator(): BuildTaskOrchestrator {
    return {
      force: this.opts.command.compilerOptions.force === true,
      dry: this.opts.command.compilerOptions.dry === true,
      now: this.opts.now,
      relativeFileName: (fileName: string): string => this.relativeFileName(fileName),
      stopBuildOnErrors: this.opts.command.compilerOptions.stopBuildOnErrors === true,
      toPath: (fileName: string): string => this.toPath(fileName),
      verbose: this.opts.command.compilerOptions.verbose === true,
      write: this.opts.writer,
      ...(this.opts.buildInfoRead === undefined ? {} : { buildInfoRead: this.opts.buildInfoRead }),
      ...(this.opts.compileAndEmit === undefined ? {} : { compileAndEmit: this.opts.compileAndEmit }),
      ...(this.opts.host === undefined ? {} : { host: this.opts.host }),
      ...(this.opts.onProgram === undefined ? {} : { onProgram: this.opts.onProgram }),
    };
  }
}
