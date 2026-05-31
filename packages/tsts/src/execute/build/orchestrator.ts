import type { CommandLineResult, DiagnosticLike, DiagnosticReporter, DiagnosticsReporter, ExitStatus, Statistics, Watcher } from "../tsc/index.js";
import { BuildTask, type BuildAggregateResult, type BuildTaskResolvedProject } from "./buildtask.js";

export interface BuildOptions<ParsedCommandLine extends BuildCommandLine = BuildCommandLine> {
  readonly command: ParsedCommandLine;
  readonly testing?: unknown;
  readonly writer: (text: string) => void;
  readonly now: () => Date;
  readonly sinceStart: () => number;
  readonly getResolvedProjectReference: (config: string, path: string) => BuildTaskResolvedProject | undefined;
  readonly toPath: (fileName: string) => string;
  readonly relativeFileName: (fileName: string) => string;
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
}

export interface BuildResult extends CommandLineResult {
  readonly errors: readonly unknown[];
  readonly statistics: Statistics | undefined;
  readonly filesToDelete: readonly string[];
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

  createBuildTasks(configs: readonly string[]): void {
    for (const config of configs) {
      const path = this.toPath(config);
      if (this.tasks.has(path)) continue;
      const task = new BuildTask(config);
      task.resolved = this.opts.getResolvedProjectReference(config, path);
      this.tasks.set(path, task);
      if (task.resolved !== undefined) this.createBuildTasks(task.resolved.resolvedProjectReferencePaths());
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
      const prev = this.order[this.order.length - 1];
      if (prev !== undefined) task.prevReporter = this.getTask(this.toPath(prev));
      this.order.push(configName);
    }
    if (this.opts.command.compilerOptions.watch && downStream !== undefined) task.downStream.push(downStream);
    return task;
  }

  generateGraph(): void {
    this.tasks.clear();
    this.order = [];
    this.errors = [];
    const projects = this.opts.command.resolvedProjectPaths();
    this.createBuildTasks(projects);
    const completed = new Set<string>();
    const analyzing = new Set<string>();
    for (const project of projects) {
      this.setupBuildTask(project, undefined, false, completed, analyzing, []);
    }
  }

  start(status: ExitStatus): BuildResult {
    this.generateGraph();
    const result = this.buildOrClean(status);
    if (this.opts.command.compilerOptions.watch) {
      return { ...result, watcher: this };
    }
    return result;
  }

  buildOrClean(status: ExitStatus): BuildResult {
    const relativeFileName = (fileName: string): string => this.relativeFileName(fileName);
    const toPath = (fileName: string): string => this.toPath(fileName);
    const aggregate: BuildAggregateResult = {
      errors: [...this.errors],
      status,
      statistics: undefined,
      filesToDelete: [],
    };
    for (const config of this.order) {
      const task = this.getTask(this.toPath(config));
      task.buildProject({
        force: false,
        now: this.opts.now,
        relativeFileName,
        stopBuildOnErrors: false,
        toPath,
        verbose: false,
        write: this.opts.writer,
      }, this.toPath(config));
      task.report({
        force: false,
        now: this.opts.now,
        relativeFileName,
        stopBuildOnErrors: false,
        toPath,
        verbose: false,
        write: this.opts.writer,
      }, aggregate);
    }
    return {
      status: aggregate.status,
      errors: aggregate.errors,
      statistics: aggregate.statistics,
      filesToDelete: aggregate.filesToDelete,
    };
  }

  doCycle(): void {
    this.generateGraph();
  }
}
