import type { CommandLineTesting, CompileAndEmitResult, DiagnosticLike, DiagnosticReporter, ExitStatus, Statistics } from "../tsc/index.js";
import type { UpToDateStatus } from "./upToDateStatus.js";

export enum UpdateKind {
  None = 0,
  Config = 1,
  Update = 2,
}

export enum BuildKind {
  None = 0,
  Pseudo = 1,
  Program = 2,
}

export interface UpstreamTask {
  readonly task: BuildTask;
  readonly refIndex: number;
}

export interface BuildInfoEntry<BuildInfo = unknown> {
  readonly buildInfo: BuildInfo | undefined;
  readonly path: string;
  readonly mTime: Date | undefined;
  readonly dtsTime: Date | undefined;
}

export interface TaskResult<Program = unknown, Diagnostic extends DiagnosticLike = DiagnosticLike> {
  readonly text: string;
  readonly reportStatus: DiagnosticReporter<Diagnostic>;
  readonly diagnosticReporter: DiagnosticReporter<Diagnostic>;
  readonly exitStatus: ExitStatus;
  readonly statistics: Statistics | undefined;
  readonly program: Program | undefined;
  readonly buildKind: BuildKind;
  readonly filesToDelete: readonly string[];
}

export interface BuildTaskResolvedProject<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  getConfigFileParsingDiagnostics(): readonly Diagnostic[];
  resolvedProjectReferencePaths(): readonly string[];
  projectReferences(): readonly BuildProjectReference[];
}

export interface BuildProjectReference {
  readonly path: string;
  readonly circular?: boolean;
}

export interface BuildTaskOrchestrator<Diagnostic extends DiagnosticLike = DiagnosticLike, Program = unknown> {
  readonly testing?: CommandLineTesting;
  readonly stopBuildOnErrors: boolean;
  readonly verbose: boolean;
  readonly force: boolean;
  readonly now: () => Date;
  readonly toPath: (fileName: string) => string;
  readonly relativeFileName: (fileName: string) => string;
  readonly onProgram?: (program: Program) => void;
  readonly write: (text: string) => void;
  readonly buildInfoRead?: (task: BuildTask, path: string) => unknown;
  readonly compileAndEmit?: (task: BuildTask, path: string) => CompileAndEmitResult<Diagnostic>;
}

export interface BuildAggregateResult<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  errors: Diagnostic[];
  status: ExitStatus;
  statistics: Statistics | undefined;
  filesToDelete: string[];
}

export class BuildTask<Resolved extends BuildTaskResolvedProject = BuildTaskResolvedProject> {
  readonly config: string;
  resolved: Resolved | undefined;
  upStream: UpstreamTask[] = [];
  downStream: BuildTask[] = [];
  status: UpToDateStatus | undefined;
  result: TaskResult | undefined;
  prevReporter: BuildTask | undefined;
  configTime: Date | undefined;
  extendedConfigTimes: Date[] = [];
  inputFiles: Date[] = [];
  buildInfoEntry: BuildInfoEntry | undefined;
  errors: DiagnosticLike[] = [];
  pending = true;
  isInitialCycle = true;
  dirty = false;
  reportCompleted = false;
  buildCompleted = false;

  constructor(config: string) {
    this.config = config;
  }

  waitOnUpstream(): boolean {
    for (const upstream of this.upStream) {
      if (!upstream.task.buildCompleted) return false;
    }
    return true;
  }

  unblockDownstream(): void {
    this.pending = false;
    this.isInitialCycle = false;
    this.buildCompleted = true;
  }

  resetStatus(): void {
    this.status = undefined;
    this.errors = [];
    this.dirty = false;
  }

  reportDiagnostic(diagnostic: DiagnosticLike): void {
    this.errors.push(diagnostic);
    this.result?.diagnosticReporter(diagnostic);
  }

  report(orchestrator: BuildTaskOrchestrator, buildResult: BuildAggregateResult): void {
    if (this.prevReporter !== undefined && !this.prevReporter.reportCompleted) {
      throw new Error(`cannot report ${this.config} before ${this.prevReporter.config}`);
    }
    if (this.errors.length > 0) buildResult.errors.push(...this.errors);
    if (this.result !== undefined) {
      orchestrator.write(this.result.text);
      if (this.result.exitStatus > buildResult.status) buildResult.status = this.result.exitStatus;
      if (this.result.buildKind === BuildKind.Program && this.result.program !== undefined) {
        orchestrator.onProgram?.(this.result.program);
      }
      buildResult.filesToDelete.push(...this.result.filesToDelete);
    }
    this.result = undefined;
    this.reportCompleted = true;
  }

  buildProject(orchestrator: BuildTaskOrchestrator, path: string): void {
    if (!this.waitOnUpstream()) throw new Error(`project ${this.config} has incomplete upstream tasks`);
    if (this.pending) {
      if (this.status !== undefined && this.handleStatusThatDoesntRequireBuild(orchestrator)) {
        this.reportResolvedDiagnostics();
      } else {
        this.compileAndEmit(orchestrator, path);
        this.updateDownstream(orchestrator, path);
      }
    } else if (this.errors.length > 0) {
      for (const error of this.errors) this.result?.diagnosticReporter(error);
    }
    this.unblockDownstream();
  }

  updateDownstream(orchestrator: BuildTaskOrchestrator, path: string): void {
    if (this.isInitialCycle) return;
    if (orchestrator.stopBuildOnErrors && this.status?.isError() === true) return;
    for (const downstream of this.downStream) {
      downstream.pending = true;
      if (downstream.status?.isPseudoBuild() === true) downstream.resetStatus();
    }
  }

  compileAndEmit(orchestrator: BuildTaskOrchestrator, path: string): void {
    this.errors = [];
    if (orchestrator.verbose) this.result?.reportStatus({ message: `Building project ${orchestrator.relativeFileName(this.config)}` });
    const result = orchestrator.compileAndEmit?.(this, path);
    if (result === undefined) return;
    this.result = {
      text: "",
      reportStatus: this.result?.reportStatus ?? ((_diagnostic: DiagnosticLike): void => {}),
      diagnosticReporter: this.result?.diagnosticReporter ?? ((_diagnostic: DiagnosticLike): void => {}),
      exitStatus: result.status,
      statistics: undefined,
      program: undefined,
      buildKind: BuildKind.Program,
      filesToDelete: [],
    };
    for (const diagnostic of result.diagnostics) this.reportDiagnostic(diagnostic);
  }

  handleStatusThatDoesntRequireBuild(orchestrator: BuildTaskOrchestrator): boolean {
    if (this.status === undefined) return false;
    if (this.status.isError()) return true;
    if (this.status.isPseudoBuild()) return true;
    if (orchestrator.force) return false;
    return this.pending === false;
  }

  reportResolvedDiagnostics(): void {
    if (this.resolved === undefined) return;
    for (const diagnostic of this.resolved.getConfigFileParsingDiagnostics()) {
      this.reportDiagnostic(diagnostic);
    }
  }

  loadOrStoreBuildInfo<BuildInfo>(path: string, load: (path: string) => BuildInfo | undefined): BuildInfo | undefined {
    if (this.buildInfoEntry !== undefined && this.buildInfoEntry.path === path) {
      return this.buildInfoEntry.buildInfo as BuildInfo | undefined;
    }
    const buildInfo = load(path);
    this.buildInfoEntry = {
      buildInfo,
      path,
      mTime: undefined,
      dtsTime: undefined,
    };
    return buildInfo;
  }
}
