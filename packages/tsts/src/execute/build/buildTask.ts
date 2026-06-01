import { computeHash } from "../incremental/index.js";
import {
  ExitStatus,
  type CommandLineTesting,
  type CompileAndEmitResult as TscCompileAndEmitResult,
  type DiagnosticLike,
  type DiagnosticReporter,
  type Statistics,
} from "../tsc/index.js";
import { getDirectoryPath, getNormalizedAbsolutePath } from "../../tspath/index.js";
import {
  FileAndTime,
  InputOutputFileAndTime,
  InputOutputName,
  UpstreamErrors,
  UpToDateStatus,
  UpToDateStatusType,
} from "./upToDateStatus.js";

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

export interface BuildInfoEntry<BuildInfoValue = BuildInfoLike> {
  readonly buildInfo: BuildInfoValue | undefined;
  readonly path: string;
  mTime: Date | undefined;
  dtsTime: Date | undefined;
}

export interface TaskResult<Program = unknown, Diagnostic extends DiagnosticLike = DiagnosticLike> {
  text: string;
  readonly reportStatus: DiagnosticReporter<Diagnostic>;
  readonly diagnosticReporter: DiagnosticReporter<Diagnostic>;
  exitStatus: ExitStatus;
  statistics: Statistics | undefined;
  program: Program | undefined;
  buildKind: BuildKind;
  filesToDelete: string[];
  emittedFiles: string[];
}

export interface BuildTaskResolvedProject<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  getConfigFileParsingDiagnostics(): readonly Diagnostic[];
  resolvedProjectReferencePaths(): readonly string[];
  projectReferences(): readonly BuildProjectReference[];
  fileNames?(): readonly string[];
  extendedSourceFiles?(): readonly string[];
  compilerOptions?(): BuildTaskCompilerOptions;
  getOutputFileNames?(): Iterable<string>;
  getBuildInfoFileName?(): string;
  reloadFileNamesOfParsedCommandLine?(host: BuildTaskFileSystem): BuildTaskResolvedProject<Diagnostic>;
}

export interface BuildProjectReference {
  readonly path: string;
  readonly circular?: boolean;
}

export interface BuildTaskCompilerOptions {
  readonly noEmit?: boolean;
  readonly noCheck?: boolean;
  readonly noEmitOnError?: boolean;
  readonly watch?: boolean;
  readonly declaration?: boolean;
  readonly emitDeclarationOnly?: boolean;
  readonly incremental?: boolean;
  readonly composite?: boolean;
  readonly [name: string]: unknown;
  isIncremental?(): boolean;
  getEmitDeclarations?(): boolean;
}

export interface BuildTaskFileSystem {
  readFile?(fileName: string): string | undefined;
  writeFile?(fileName: string, text: string): unknown;
  fileExists?(fileName: string): boolean;
  remove?(fileName: string): unknown;
}

export interface BuildTaskHost {
  readonly fs?: BuildTaskFileSystem;
  readonly currentDirectory?: string;
  readonly useCaseSensitiveFileNames?: boolean;
  getMTime?(fileName: string): Date | undefined;
  setMTime?(fileName: string, mTime: Date): unknown;
  storeMTime?(fileName: string, mTime: Date): void;
  storeMTimeFromOldCache?(fileName: string, oldCache: ReadonlyMap<string, Date | undefined>): void;
  readFile?(fileName: string): string | undefined;
  writeFile?(fileName: string, text: string): unknown;
  fileExists?(fileName: string): boolean;
  removeFile?(fileName: string): unknown;
}

export interface BuildInfoFileInfoLike {
  getFileInfo?(): { readonly version?: string; readonly signature?: string };
}

export interface BuildInfoRootInfoReaderLike {
  getBuildInfoFileInfo(inputFilePath: string): { readonly info?: BuildInfoFileInfoLike; readonly resolved: string };
  roots(): Iterable<string>;
}

export interface BuildInfoLike {
  readonly version?: string;
  readonly errors?: boolean;
  readonly semanticErrors?: boolean;
  readonly checkPending?: boolean;
  readonly emitDiagnosticsPerFile?: readonly unknown[];
  readonly semanticDiagnosticsPerFile?: readonly unknown[];
  readonly changeFileSet?: readonly unknown[];
  readonly affectedFilesPendingEmit?: readonly unknown[];
  readonly latestChangedDtsFile?: string;
  isValidVersion?(): boolean;
  isIncremental?(): boolean;
  isEmitPending?(resolved: BuildTaskResolvedProject, buildInfoDirectory: string): boolean;
  getBuildInfoRootInfoReader?(buildInfoDirectory: string, useCaseSensitiveFileNames: boolean): BuildInfoRootInfoReaderLike;
}

export interface BuildCompileAndEmitResult<Diagnostic extends DiagnosticLike = DiagnosticLike, Program = unknown>
  extends TscCompileAndEmitResult<Diagnostic> {
  readonly statistics?: Statistics;
  readonly program?: Program;
  readonly filesToDelete?: readonly string[];
  readonly emittedFiles?: readonly string[];
}

export interface BuildTaskOrchestrator<Diagnostic extends DiagnosticLike = DiagnosticLike, Program = unknown> {
  readonly testing?: CommandLineTesting;
  readonly stopBuildOnErrors: boolean;
  readonly verbose: boolean;
  readonly force: boolean;
  readonly dry?: boolean;
  readonly now: () => Date;
  readonly toPath: (fileName: string) => string;
  readonly relativeFileName: (fileName: string) => string;
  readonly onProgram?: (program: Program) => void;
  readonly write: (text: string) => void;
  readonly buildInfoRead?: (task: BuildTask, path: string) => BuildInfoLike | undefined;
  readonly compileAndEmit?: (task: BuildTask, path: string) => BuildCompileAndEmitResult<Diagnostic, Program>;
  readonly host?: BuildTaskHost;
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
  buildInfoEntry: BuildInfoEntry<unknown> | undefined;
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
    this.pending = true;
  }

  reportDiagnostic(diagnostic: DiagnosticLike): void {
    this.ensureResult();
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
      if (this.result.statistics !== undefined) {
        if (buildResult.statistics === undefined) buildResult.statistics = this.result.statistics;
        else buildResult.statistics.aggregate(this.result.statistics);
      }
      if (this.result.buildKind === BuildKind.Program && this.result.program !== undefined) {
        orchestrator.onProgram?.(this.result.program);
      }
      if (this.result.buildKind === BuildKind.Program && buildResult.statistics !== undefined) buildResult.statistics.projectsBuilt += 1;
      if (this.result.buildKind === BuildKind.Pseudo && buildResult.statistics !== undefined) buildResult.statistics.timestampUpdates += 1;
      buildResult.filesToDelete.push(...this.result.filesToDelete);
    }
    this.result = undefined;
    this.reportCompleted = true;
  }

  buildProject(orchestrator: BuildTaskOrchestrator, path: string): void {
    if (!this.waitOnUpstream()) throw new Error(`project ${this.config} has incomplete upstream tasks`);
    this.ensureResult();
    if (this.pending) {
      this.status = this.getUpToDateStatus(orchestrator, path);
      this.reportUpToDateStatus(orchestrator);
      if (this.handleStatusThatDoesntRequireBuild(orchestrator)) {
        this.reportResolvedDiagnostics();
        if (this.errors.length > 0) this.result!.exitStatus = ExitStatus.DiagnosticsPresentOutputsSkipped;
      } else {
        this.compileAndEmit(orchestrator, path);
        this.updateDownstream(orchestrator, path);
      }
    } else if (this.errors.length > 0) {
      this.reportUpToDateStatus(orchestrator);
      for (const error of this.errors) this.result?.diagnosticReporter(error);
    }
    this.unblockDownstream();
  }

  updateDownstream(orchestrator: BuildTaskOrchestrator, path: string): void {
    if (this.isInitialCycle) return;
    if (orchestrator.stopBuildOnErrors && this.status?.isError() === true) return;
    for (const downstream of this.downStream) {
      if (downstream.status !== undefined) {
        switch (downstream.status.kind) {
          case UpToDateStatusType.UpToDate:
            if (!programHasChangedDtsFile(this.result?.program)) {
              downstream.status = new UpToDateStatus(UpToDateStatusType.UpToDateWithUpstreamTypes, downstream.status.data);
              break;
            }
            downstream.status = new UpToDateStatus(
              UpToDateStatusType.InputFileNewer,
              new InputOutputName(this.config, downstream.status.oldestOutputFileName()),
            );
            break;
          case UpToDateStatusType.UpToDateWithUpstreamTypes:
          case UpToDateStatusType.UpToDateWithInputFileText:
            if (programHasChangedDtsFile(this.result?.program)) {
              downstream.status = new UpToDateStatus(
                UpToDateStatusType.InputFileNewer,
                new InputOutputName(this.config, downstream.status.oldestOutputFileName()),
              );
            }
            break;
          case UpToDateStatusType.UpstreamErrors: {
            const upstreamErrors = downstream.status.upstreamErrors();
            if (orchestrator.toPath(upstreamErrors.ref) === path) downstream.resetStatus();
            break;
          }
          default:
            break;
        }
      }
      downstream.pending = true;
    }
  }

  compileAndEmit(orchestrator: BuildTaskOrchestrator, path: string): void {
    const taskResult = this.ensureResult();
    this.errors = [];
    if (orchestrator.verbose) taskResult.reportStatus({ message: `Building project ${orchestrator.relativeFileName(this.config)}` });
    const result = orchestrator.compileAndEmit?.(this, path);
    if (result === undefined) return;
    taskResult.exitStatus = result.status;
    taskResult.statistics = result.statistics;
    taskResult.program = result.program;
    taskResult.buildKind = BuildKind.Program;
    taskResult.filesToDelete = [...(result.filesToDelete ?? [])];
    taskResult.emittedFiles = emittedFilesFromCompileResult(result);
    for (const diagnostic of result.diagnostics) this.reportDiagnostic(diagnostic);
    const options = resolvedCompilerOptions(this.resolved);
    if (
      (!booleanCompilerOption(options, "noEmitOnError") || result.diagnostics.length === 0) &&
      (taskResult.emittedFiles.length > 0 || this.status?.kind !== UpToDateStatusType.OutOfDateBuildInfoWithErrors)
    ) {
      this.updateTimeStamps(orchestrator, taskResult.emittedFiles, `Updating unchanged output timestamps of project ${orchestrator.relativeFileName(this.config)}`);
    }
    this.status = result.status === ExitStatus.DiagnosticsPresentOutputsSkipped || result.status === ExitStatus.DiagnosticsPresentOutputsGenerated
      ? new UpToDateStatus(UpToDateStatusType.BuildErrors)
      : new UpToDateStatus(UpToDateStatusType.UpToDate, oldestOutputAfterEmit(this.resolved, taskResult.emittedFiles));
  }

  handleStatusThatDoesntRequireBuild(orchestrator: BuildTaskOrchestrator): boolean {
    if (this.status === undefined) return false;
    switch (this.status.kind) {
      case UpToDateStatusType.UpToDate:
        if (orchestrator.dry === true) this.ensureResult().reportStatus({ message: `Project ${this.config} is up to date` });
        return true;
      case UpToDateStatusType.UpstreamErrors: {
        const upstreamStatus = this.status.upstreamErrors();
        if (orchestrator.verbose) {
          const reason = upstreamStatus.refHasUpstreamErrors ? "was not built" : "has errors";
          this.ensureResult().reportStatus({
            message: `Skipping build of project ${orchestrator.relativeFileName(this.config)} because its dependency ${orchestrator.relativeFileName(upstreamStatus.ref)} ${reason}`,
          });
        }
        return true;
      }
      case UpToDateStatusType.Solution:
        return true;
      case UpToDateStatusType.ConfigFileNotFound:
        this.reportDiagnostic({ message: `File '${this.config}' not found.` });
        return true;
      default:
        break;
    }
    if (this.status.isError()) return true;
    if (this.status.isPseudoBuild()) {
      if (orchestrator.dry === true) {
        this.ensureResult().reportStatus({ message: `A non-dry build would update timestamps for output of project ${this.config}` });
        this.status = new UpToDateStatus(UpToDateStatusType.UpToDate);
        return true;
      }
      this.updateTimeStamps(orchestrator, [], `Updating output timestamps of project ${orchestrator.relativeFileName(this.config)}`);
      this.status = new UpToDateStatus(UpToDateStatusType.UpToDate, this.status.data);
      this.ensureResult().buildKind = BuildKind.Pseudo;
      return true;
    }
    if (orchestrator.force) return false;
    if (orchestrator.dry === true) {
      this.ensureResult().reportStatus({ message: `A non-dry build would build project ${this.config}` });
      this.status = new UpToDateStatus(UpToDateStatusType.UpToDate);
      return true;
    }
    return false;
  }

  reportResolvedDiagnostics(): void {
    if (this.resolved === undefined) return;
    for (const diagnostic of this.resolved.getConfigFileParsingDiagnostics()) {
      this.reportDiagnostic(diagnostic);
    }
  }

  loadOrStoreBuildInfo<BuildInfoValue>(
    path: string,
    load: string | ((path: string) => BuildInfoValue | undefined),
  ): BuildInfoValue | undefined {
    const buildInfoPath = typeof load === "string" ? load : path;
    const loader = typeof load === "function" ? load : undefined;
    if (this.buildInfoEntry !== undefined && this.buildInfoEntry.path === buildInfoPath) {
      return this.buildInfoEntry.buildInfo as BuildInfoValue | undefined;
    }
    const buildInfo = loader?.(buildInfoPath);
    this.buildInfoEntry = {
      buildInfo,
      path: buildInfoPath,
      mTime: undefined,
      dtsTime: undefined,
    };
    return buildInfo;
  }

  getUpToDateStatus(orchestrator: BuildTaskOrchestrator, configPath: string): UpToDateStatus {
    if (this.status !== undefined) return this.status;
    if (this.resolved === undefined) return new UpToDateStatus(UpToDateStatusType.ConfigFileNotFound);

    const fileNames = resolvedFileNames(this.resolved);
    if (fileNames.length === 0 && this.resolved.projectReferences().length > 0) {
      return new UpToDateStatus(UpToDateStatusType.Solution);
    }
    for (const upstream of this.upStream) {
      if (orchestrator.stopBuildOnErrors && upstream.task.status?.isError() === true) {
        const ref = this.resolved.projectReferences()[upstream.refIndex]?.path ?? upstream.task.config;
        return new UpToDateStatus(
          UpToDateStatusType.UpstreamErrors,
          new UpstreamErrors(ref, upstream.task.status.kind === UpToDateStatusType.UpstreamErrors),
        );
      }
    }
    if (orchestrator.force) return new UpToDateStatus(UpToDateStatusType.ForceBuild);

    const buildInfoPath = resolvedBuildInfoFileName(this.resolved);
    if (buildInfoPath === "") return this.getNonIncrementalUpToDateStatus(orchestrator);
    const buildInfoResult = this.loadOrStoreBuildInfoFromOrchestrator(orchestrator, configPath, buildInfoPath);
    const buildInfo = buildInfoResult.buildInfo;
    if (buildInfo === undefined) return new UpToDateStatus(UpToDateStatusType.OutputMissing, buildInfoPath);
    if (buildInfo.isValidVersion?.() === false) {
      return new UpToDateStatus(UpToDateStatusType.TsVersionOutputOfDate, buildInfo.version ?? "");
    }

    const options = resolvedCompilerOptions(this.resolved);
    if (
      buildInfo.errors === true ||
      (!booleanCompilerOption(options, "noCheck") && (buildInfo.semanticErrors === true || buildInfo.checkPending === true))
    ) {
      return new UpToDateStatus(UpToDateStatusType.OutOfDateBuildInfoWithErrors, buildInfoPath);
    }

    if (buildInfo.isIncremental?.() === true || isIncremental(options)) {
      if (buildInfo.isIncremental?.() === false) {
        return new UpToDateStatus(UpToDateStatusType.OutOfDateOptions, buildInfoPath);
      }
      if (
        (getEmitDeclarations(options) && nonEmpty(buildInfo.emitDiagnosticsPerFile)) ||
        (!booleanCompilerOption(options, "noCheck") && (nonEmpty(buildInfo.changeFileSet) || nonEmpty(buildInfo.semanticDiagnosticsPerFile)))
      ) {
        return new UpToDateStatus(UpToDateStatusType.OutOfDateBuildInfoWithErrors, buildInfoPath);
      }
      if (!booleanCompilerOption(options, "noEmit") && (nonEmpty(buildInfo.changeFileSet) || nonEmpty(buildInfo.affectedFilesPendingEmit))) {
        return new UpToDateStatus(UpToDateStatusType.OutOfDateBuildInfoWithPendingEmit, buildInfoPath);
      }
      const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, currentDirectory(orchestrator)));
      if (buildInfo.isEmitPending?.(this.resolved, buildInfoDirectory) === true) {
        return new UpToDateStatus(UpToDateStatusType.OutOfDateOptions, buildInfoPath);
      }
    }

    const oldestOutputFileAndTime = new FileAndTime(buildInfoPath, buildInfoResult.mTime ?? missingDate());
    let oldestOutput = oldestOutputFileAndTime;
    let newestInput = new FileAndTime("", missingDate());
    let inputTextUnchanged = false;
    const seenRoots = new Set<string>();
    const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, currentDirectory(orchestrator)));
    let rootInfoReader: BuildInfoRootInfoReaderLike | undefined;

    for (const inputFile of fileNames) {
      const inputTime = getMTime(orchestrator, inputFile);
      if (inputTime === undefined) return new UpToDateStatus(UpToDateStatusType.InputFileMissing, inputFile);
      const inputPath = orchestrator.toPath(inputFile);
      if (dateAfter(inputTime, oldestOutput.time)) {
        let version = "";
        let currentVersion = "";
        if (buildInfo.isIncremental?.() === true) {
          rootInfoReader ??= buildInfo.getBuildInfoRootInfoReader?.(buildInfoDirectory, useCaseSensitiveFileNames(orchestrator));
          const buildInfoFileInfo = rootInfoReader?.getBuildInfoFileInfo(inputPath);
          const fileInfo = buildInfoFileInfo?.info?.getFileInfo?.();
          version = fileInfo?.version ?? "";
          const resolvedInput = buildInfoFileInfo?.resolved === "" ? inputFile : buildInfoFileInfo?.resolved ?? inputFile;
          const text = readFile(orchestrator, resolvedInput);
          if (version !== "" && text !== undefined) {
            currentVersion = computeHash(text, orchestrator.testing !== undefined);
            if (version === currentVersion) inputTextUnchanged = true;
          }
        }
        if (version === "" || version !== currentVersion) {
          return new UpToDateStatus(UpToDateStatusType.InputFileNewer, new InputOutputName(inputFile, buildInfoPath));
        }
      }
      if (dateAfter(inputTime, newestInput.time)) newestInput = new FileAndTime(inputFile, inputTime);
      seenRoots.add(inputPath);
    }

    rootInfoReader ??= buildInfo.getBuildInfoRootInfoReader?.(buildInfoDirectory, useCaseSensitiveFileNames(orchestrator));
    if (rootInfoReader !== undefined) {
      for (const root of rootInfoReader.roots()) {
        if (!seenRoots.has(root)) {
          return new UpToDateStatus(UpToDateStatusType.OutOfDateRoots, new InputOutputName(String(root), buildInfoPath));
        }
      }
    }

    if (!isIncremental(options)) {
      const outputStatus = this.checkOutputFileStamps(orchestrator, newestInput, oldestOutput);
      if (outputStatus.status !== undefined) return outputStatus.status;
      oldestOutput = outputStatus.oldestOutput;
    }

    let refDtsUnchanged = false;
    for (const upstream of this.upStream) {
      if (upstream.task.status?.kind === UpToDateStatusType.Solution) continue;
      const refInputOutput = upstream.task.status?.inputOutputFileAndTime();
      if (refInputOutput !== undefined && !isMissingDate(refInputOutput.input.time) && dateBefore(refInputOutput.input.time, oldestOutput.time)) {
        continue;
      }
      if (this.hasConflictingBuildInfo(upstream.task)) {
        const ref = this.resolved.projectReferences()[upstream.refIndex]?.path ?? upstream.task.config;
        return new UpToDateStatus(UpToDateStatusType.InputFileNewer, new InputOutputName(ref, oldestOutput.file));
      }
      const newestDtsChangeTime = upstream.task.getLatestChangedDtsMTime(orchestrator);
      if (newestDtsChangeTime !== undefined && dateBefore(newestDtsChangeTime, oldestOutput.time)) {
        refDtsUnchanged = true;
        continue;
      }
      const ref = this.resolved.projectReferences()[upstream.refIndex]?.path ?? upstream.task.config;
      return new UpToDateStatus(UpToDateStatusType.InputFileNewer, new InputOutputName(ref, oldestOutput.file));
    }

    const configStatus = this.checkInputFileTime(orchestrator, this.config, oldestOutput);
    if (configStatus !== undefined) return configStatus;
    for (const extendedConfig of resolvedExtendedSourceFiles(this.resolved)) {
      const extendedConfigStatus = this.checkInputFileTime(orchestrator, extendedConfig, oldestOutput);
      if (extendedConfigStatus !== undefined) return extendedConfigStatus;
    }

    return new UpToDateStatus(
      refDtsUnchanged
        ? UpToDateStatusType.UpToDateWithUpstreamTypes
        : inputTextUnchanged
          ? UpToDateStatusType.UpToDateWithInputFileText
          : UpToDateStatusType.UpToDate,
      new InputOutputFileAndTime(newestInput, oldestOutput, buildInfoPath),
    );
  }

  reportUpToDateStatus(orchestrator: BuildTaskOrchestrator): void {
    if (!orchestrator.verbose || this.status === undefined) return;
    const result = this.ensureResult();
    const projectName = orchestrator.relativeFileName(this.config);
    switch (this.status.kind) {
      case UpToDateStatusType.ConfigFileNotFound:
        result.reportStatus({ message: `Project ${projectName} is out of date because config file does not exist` });
        break;
      case UpToDateStatusType.UpstreamErrors: {
        const upstreamStatus = this.status.upstreamErrors();
        const reason = upstreamStatus.refHasUpstreamErrors ? "was not built" : "has errors";
        result.reportStatus({ message: `Project ${projectName} can't be built because its dependency ${orchestrator.relativeFileName(upstreamStatus.ref)} ${reason}` });
        break;
      }
      case UpToDateStatusType.BuildErrors:
        result.reportStatus({ message: `Project ${projectName} is out of date because it has errors` });
        break;
      case UpToDateStatusType.UpToDate: {
        const inputOutput = this.status.inputOutputFileAndTime();
        if (inputOutput !== undefined) {
          result.reportStatus({
            message: `Project ${projectName} is up to date because newest input ${orchestrator.relativeFileName(inputOutput.input.file)} is older than output ${orchestrator.relativeFileName(inputOutput.output.file)}`,
          });
        }
        break;
      }
      case UpToDateStatusType.UpToDateWithUpstreamTypes:
        result.reportStatus({ message: `Project ${projectName} is up to date with .d.ts files from its dependencies` });
        break;
      case UpToDateStatusType.UpToDateWithInputFileText:
        result.reportStatus({ message: `Project ${projectName} is up to date but needs to update timestamps of output files that are older than input files` });
        break;
      case UpToDateStatusType.InputFileMissing:
        result.reportStatus({ message: `Project ${projectName} is out of date because input ${orchestrator.relativeFileName(String(this.status.data))} does not exist` });
        break;
      case UpToDateStatusType.OutputMissing:
        result.reportStatus({ message: `Project ${projectName} is out of date because output file ${orchestrator.relativeFileName(String(this.status.data))} does not exist` });
        break;
      case UpToDateStatusType.InputFileNewer: {
        const inputOutput = this.status.inputOutputName();
        if (inputOutput !== undefined) {
          result.reportStatus({
            message: `Project ${projectName} is out of date because output ${orchestrator.relativeFileName(inputOutput.output)} is older than input ${orchestrator.relativeFileName(inputOutput.input)}`,
          });
        }
        break;
      }
      case UpToDateStatusType.OutOfDateBuildInfoWithPendingEmit:
        result.reportStatus({ message: `Project ${projectName} is out of date because buildinfo file ${orchestrator.relativeFileName(String(this.status.data))} indicates that some changes were not emitted` });
        break;
      case UpToDateStatusType.OutOfDateBuildInfoWithErrors:
        result.reportStatus({ message: `Project ${projectName} is out of date because buildinfo file ${orchestrator.relativeFileName(String(this.status.data))} indicates that program needs to report errors` });
        break;
      case UpToDateStatusType.OutOfDateOptions:
        result.reportStatus({ message: `Project ${projectName} is out of date because buildinfo file ${orchestrator.relativeFileName(String(this.status.data))} indicates a compilerOptions change` });
        break;
      case UpToDateStatusType.OutOfDateRoots: {
        const inputOutput = this.status.inputOutputName();
        if (inputOutput !== undefined) {
          result.reportStatus({ message: `Project ${projectName} is out of date because buildinfo file ${orchestrator.relativeFileName(inputOutput.output)} indicates that file ${orchestrator.relativeFileName(inputOutput.input)} was root file of compilation but not any more` });
        }
        break;
      }
      case UpToDateStatusType.TsVersionOutputOfDate:
        result.reportStatus({ message: `Project ${projectName} is out of date because output was generated with version ${String(this.status.data)}` });
        break;
      case UpToDateStatusType.ForceBuild:
        result.reportStatus({ message: `Project ${projectName} is being forcibly rebuilt` });
        break;
      case UpToDateStatusType.Solution:
        break;
      default:
        throw new Error(`Unknown up-to-date status kind: ${this.status.kind}`);
    }
  }

  canUpdateJsDtsOutputTimestamps(): boolean {
    const options = resolvedCompilerOptions(this.resolved);
    return !booleanCompilerOption(options, "noEmit") && !isIncremental(options);
  }

  updateTimeStamps(orchestrator: BuildTaskOrchestrator, emittedFiles: readonly string[], verboseMessage: string): void {
    const emitted = new Set(emittedFiles);
    let verboseMessageReported = false;
    const buildInfoName = resolvedBuildInfoFileName(this.resolved);
    const now = orchestrator.now();
    const updateTimeStamp = (file: string): void => {
      if (file === "" || emitted.has(file)) return;
      if (!verboseMessageReported && orchestrator.verbose) {
        this.ensureResult().reportStatus({ message: verboseMessage });
        verboseMessageReported = true;
      }
      setMTime(orchestrator, file, now);
      if (file === buildInfoName) {
        if (this.buildInfoEntry !== undefined) this.buildInfoEntry.mTime = now;
      } else if (this.storeOutputTimeStamp(orchestrator)) {
        orchestrator.host?.storeMTime?.(file, now);
      }
    };

    if (this.canUpdateJsDtsOutputTimestamps()) {
      for (const outputFile of resolvedOutputFileNames(this.resolved)) updateTimeStamp(outputFile);
    }
    updateTimeStamp(buildInfoName);
  }

  cleanProject(orchestrator: BuildTaskOrchestrator, _path: string): void {
    if (this.resolved === undefined) {
      this.reportDiagnostic({ message: `File '${this.config}' not found.` });
      this.ensureResult().exitStatus = ExitStatus.DiagnosticsPresentOutputsSkipped;
      return;
    }
    const inputs = new Set(resolvedFileNames(this.resolved).map((fileName) => orchestrator.toPath(fileName)));
    for (const outputFile of resolvedOutputFileNames(this.resolved)) this.cleanProjectOutput(orchestrator, outputFile, inputs);
    this.cleanProjectOutput(orchestrator, resolvedBuildInfoFileName(this.resolved), inputs);
  }

  cleanProjectOutput(orchestrator: BuildTaskOrchestrator, outputFile: string, inputs: ReadonlySet<string>): void {
    if (outputFile === "") return;
    const outputPath = orchestrator.toPath(outputFile);
    if (inputs.has(outputPath)) return;
    if (fileExists(orchestrator, outputFile)) {
      if (orchestrator.dry !== true) {
        const removed = removeFile(orchestrator, outputFile);
        if (!removed) this.reportDiagnostic({ message: `Failed to delete file '${outputFile}'.` });
      } else {
        this.ensureResult().filesToDelete.push(outputFile);
      }
    }
  }

  updateWatch(orchestrator: BuildTaskOrchestrator, oldCache: ReadonlyMap<string, Date | undefined> | undefined = undefined): void {
    this.configTime = loadOrStoreMTime(orchestrator, this.config, oldCache, false);
    if (this.resolved !== undefined) {
      this.extendedConfigTimes = resolvedExtendedSourceFiles(this.resolved)
        .map((fileName) => loadOrStoreMTime(orchestrator, fileName, oldCache, false))
        .filter(isDefinedDate);
      this.inputFiles = resolvedFileNames(this.resolved)
        .map((fileName) => loadOrStoreMTime(orchestrator, fileName, oldCache, false))
        .filter(isDefinedDate);
      if (this.canUpdateJsDtsOutputTimestamps()) {
        for (const outputFile of resolvedOutputFileNames(this.resolved)) {
          orchestrator.host?.storeMTimeFromOldCache?.(outputFile, oldCache ?? new Map<string, Date | undefined>());
        }
      }
    }
  }

  resetConfig(orchestrator: BuildTaskOrchestrator, path: string): void {
    this.dirty = true;
    this.resetStatus();
    void orchestrator;
    void path;
  }

  hasUpdate(orchestrator: BuildTaskOrchestrator, path: string): UpdateKind {
    let needsConfigUpdate = false;
    let needsUpdate = false;
    const configTime = getMTime(orchestrator, this.config);
    if (!sameTime(configTime, this.configTime)) {
      this.resetConfig(orchestrator, path);
      needsConfigUpdate = true;
    }
    if (this.resolved !== undefined) {
      const extendedSourceFiles = resolvedExtendedSourceFiles(this.resolved);
      for (let index = 0; index < extendedSourceFiles.length; index += 1) {
        if (!sameTime(getMTime(orchestrator, extendedSourceFiles[index]!), this.extendedConfigTimes[index])) {
          this.resetConfig(orchestrator, path);
          needsConfigUpdate = true;
        }
      }
      const fileNames = resolvedFileNames(this.resolved);
      for (let index = 0; index < fileNames.length; index += 1) {
        if (!sameTime(getMTime(orchestrator, fileNames[index]!), this.inputFiles[index])) {
          this.resetStatus();
          needsUpdate = true;
        }
      }
      if (!needsConfigUpdate && this.resolved.reloadFileNamesOfParsedCommandLine !== undefined) {
        const newConfig = this.resolved.reloadFileNamesOfParsedCommandLine(orchestrator.host?.fs ?? {});
        if (!sameStringArray(resolvedFileNames(this.resolved), resolvedFileNames(newConfig))) {
          this.resolved = newConfig as Resolved;
          this.resetStatus();
          needsUpdate = true;
        }
      }
    }
    if (needsConfigUpdate) return UpdateKind.Config;
    if (needsUpdate) return UpdateKind.Update;
    return UpdateKind.None;
  }

  onBuildInfoEmit(orchestrator: BuildTaskOrchestrator, buildInfoFileName: string, buildInfo: BuildInfoLike, hasChangedDtsFile: boolean): void {
    const mTime = orchestrator.now();
    const dtsTime = hasChangedDtsFile ? mTime : this.buildInfoEntry?.dtsTime;
    this.buildInfoEntry = {
      buildInfo,
      path: orchestrator.toPath(buildInfoFileName),
      mTime,
      dtsTime,
    };
  }

  hasConflictingBuildInfo(upstream: BuildTask): boolean {
    if (this.buildInfoEntry !== undefined && upstream.buildInfoEntry !== undefined) {
      return this.buildInfoEntry.path === upstream.buildInfoEntry.path;
    }
    return false;
  }

  getLatestChangedDtsMTime(orchestrator: BuildTaskOrchestrator): Date | undefined {
    const entry = this.buildInfoEntry;
    if (entry?.dtsTime !== undefined) return entry.dtsTime;
    const buildInfo = isBuildInfoLike(entry?.buildInfo) ? entry.buildInfo : undefined;
    if (buildInfo === undefined || buildInfo.latestChangedDtsFile === undefined || buildInfo.latestChangedDtsFile === "") return undefined;
    const dtsTime = getMTime(
      orchestrator,
      getNormalizedAbsolutePath(buildInfo.latestChangedDtsFile, getDirectoryPath(entry!.path)),
    );
    if (entry !== undefined) entry.dtsTime = dtsTime;
    return dtsTime;
  }

  storeOutputTimeStamp(orchestrator: BuildTaskOrchestrator): boolean {
    const options = resolvedCompilerOptions(this.resolved);
    return booleanCompilerOption(options, "watch") && !isIncremental(options) && orchestrator.host?.storeMTime !== undefined;
  }

  writeFile(orchestrator: BuildTaskOrchestrator, fileName: string, text: string, data?: { readonly buildInfo?: unknown }): unknown {
    const writeResult = writeFile(orchestrator, fileName, text);
    const buildInfo = isBuildInfoLike(data?.buildInfo) ? data.buildInfo : undefined;
    if (buildInfo !== undefined) {
      this.onBuildInfoEmit(orchestrator, fileName, buildInfo, programHasChangedDtsFile(this.result?.program));
    } else if (this.storeOutputTimeStamp(orchestrator)) {
      orchestrator.host?.storeMTime?.(fileName, orchestrator.now());
    }
    return writeResult;
  }

  private ensureResult(): TaskResult {
    if (this.result !== undefined) return this.result;
    const result: TaskResult = {
      text: "",
      reportStatus: (diagnostic: DiagnosticLike): void => {
        result.text += diagnostic.message + "\n";
      },
      diagnosticReporter: (diagnostic: DiagnosticLike): void => {
        result.text += diagnostic.message + "\n";
      },
      exitStatus: ExitStatus.Success,
      statistics: undefined,
      program: undefined,
      buildKind: BuildKind.None,
      filesToDelete: [],
      emittedFiles: [],
    };
    this.result = result;
    return result;
  }

  private loadOrStoreBuildInfoFromOrchestrator(orchestrator: BuildTaskOrchestrator, configPath: string, buildInfoPath: string): { buildInfo: BuildInfoLike | undefined; mTime: Date | undefined } {
    const path = orchestrator.toPath(buildInfoPath);
    if (this.buildInfoEntry !== undefined && this.buildInfoEntry.path === path) {
      const buildInfo = isBuildInfoLike(this.buildInfoEntry.buildInfo) ? this.buildInfoEntry.buildInfo : undefined;
      return { buildInfo, mTime: this.buildInfoEntry.mTime };
    }
    const buildInfo = orchestrator.buildInfoRead?.(this, buildInfoPath);
    const mTime = buildInfo === undefined ? undefined : getMTime(orchestrator, buildInfoPath);
    this.buildInfoEntry = {
      buildInfo,
      path,
      mTime,
      dtsTime: undefined,
    };
    void configPath;
    return { buildInfo, mTime };
  }

  private getNonIncrementalUpToDateStatus(orchestrator: BuildTaskOrchestrator): UpToDateStatus {
    if (this.resolved === undefined) return new UpToDateStatus(UpToDateStatusType.ConfigFileNotFound);
    let newestInput = new FileAndTime("", missingDate());
    for (const inputFile of resolvedFileNames(this.resolved)) {
      const inputTime = getMTime(orchestrator, inputFile);
      if (inputTime === undefined) return new UpToDateStatus(UpToDateStatusType.InputFileMissing, inputFile);
      if (dateAfter(inputTime, newestInput.time)) newestInput = new FileAndTime(inputFile, inputTime);
    }
    const outputStatus = this.checkOutputFileStamps(orchestrator, newestInput, new FileAndTime("", farFutureDate()));
    return outputStatus.status ?? new UpToDateStatus(UpToDateStatusType.UpToDate, new InputOutputFileAndTime(newestInput, outputStatus.oldestOutput, ""));
  }

  private checkOutputFileStamps(
    orchestrator: BuildTaskOrchestrator,
    newestInput: FileAndTime,
    initialOldestOutput: FileAndTime,
  ): { status: UpToDateStatus | undefined; oldestOutput: FileAndTime } {
    let oldestOutput = initialOldestOutput;
    for (const outputFile of resolvedOutputFileNames(this.resolved)) {
      const outputTime = getMTime(orchestrator, outputFile);
      if (outputTime === undefined) return { status: new UpToDateStatus(UpToDateStatusType.OutputMissing, outputFile), oldestOutput };
      if (dateBefore(outputTime, newestInput.time)) {
        return { status: new UpToDateStatus(UpToDateStatusType.InputFileNewer, new InputOutputName(newestInput.file, outputFile)), oldestOutput };
      }
      if (dateBefore(outputTime, oldestOutput.time)) oldestOutput = new FileAndTime(outputFile, outputTime);
    }
    return { status: undefined, oldestOutput };
  }

  private checkInputFileTime(orchestrator: BuildTaskOrchestrator, inputFile: string, oldestOutput: FileAndTime): UpToDateStatus | undefined {
    const inputTime = getMTime(orchestrator, inputFile);
    if (inputTime !== undefined && dateAfter(inputTime, oldestOutput.time)) {
      return new UpToDateStatus(UpToDateStatusType.InputFileNewer, new InputOutputName(inputFile, oldestOutput.file));
    }
    return undefined;
  }
}

function resolvedCompilerOptions(resolved: BuildTaskResolvedProject | undefined): BuildTaskCompilerOptions {
  return resolved?.compilerOptions?.() ?? {};
}

function resolvedFileNames(resolved: BuildTaskResolvedProject | undefined): readonly string[] {
  return resolved?.fileNames?.() ?? [];
}

function resolvedExtendedSourceFiles(resolved: BuildTaskResolvedProject | undefined): readonly string[] {
  return resolved?.extendedSourceFiles?.() ?? [];
}

function resolvedOutputFileNames(resolved: BuildTaskResolvedProject | undefined): readonly string[] {
  const values = resolved?.getOutputFileNames?.();
  return values === undefined ? [] : [...values];
}

function resolvedBuildInfoFileName(resolved: BuildTaskResolvedProject | undefined): string {
  return resolved?.getBuildInfoFileName?.() ?? "";
}

function booleanCompilerOption(options: BuildTaskCompilerOptions, name: string): boolean {
  const value = options[name];
  return value === true;
}

function isIncremental(options: BuildTaskCompilerOptions): boolean {
  return options.isIncremental?.() === true || booleanCompilerOption(options, "incremental") || booleanCompilerOption(options, "composite");
}

function getEmitDeclarations(options: BuildTaskCompilerOptions): boolean {
  return options.getEmitDeclarations?.() === true || booleanCompilerOption(options, "declaration") || booleanCompilerOption(options, "emitDeclarationOnly");
}

function nonEmpty(values: readonly unknown[] | undefined): boolean {
  return values !== undefined && values.length > 0;
}

function currentDirectory(orchestrator: BuildTaskOrchestrator): string {
  return orchestrator.host?.currentDirectory ?? "";
}

function useCaseSensitiveFileNames(orchestrator: BuildTaskOrchestrator): boolean {
  return orchestrator.host?.useCaseSensitiveFileNames ?? true;
}

function getMTime(orchestrator: BuildTaskOrchestrator, fileName: string): Date | undefined {
  return orchestrator.host?.getMTime?.(fileName);
}

function setMTime(orchestrator: BuildTaskOrchestrator, fileName: string, mTime: Date): void {
  orchestrator.host?.setMTime?.(fileName, mTime);
}

function loadOrStoreMTime(orchestrator: BuildTaskOrchestrator, fileName: string, oldCache: ReadonlyMap<string, Date | undefined> | undefined, store: boolean): Date | undefined {
  const path = orchestrator.toPath(fileName);
  const existing = oldCache?.get(path);
  if (existing !== undefined || oldCache?.has(path) === true) return existing;
  const mTime = getMTime(orchestrator, fileName);
  if (store && mTime !== undefined) orchestrator.host?.storeMTime?.(fileName, mTime);
  return mTime;
}

function readFile(orchestrator: BuildTaskOrchestrator, fileName: string): string | undefined {
  return orchestrator.host?.readFile?.(fileName) ?? orchestrator.host?.fs?.readFile?.(fileName);
}

function writeFile(orchestrator: BuildTaskOrchestrator, fileName: string, text: string): unknown {
  return orchestrator.host?.writeFile?.(fileName, text) ?? orchestrator.host?.fs?.writeFile?.(fileName, text);
}

function fileExists(orchestrator: BuildTaskOrchestrator, fileName: string): boolean {
  return orchestrator.host?.fileExists?.(fileName) ?? orchestrator.host?.fs?.fileExists?.(fileName) ?? false;
}

function removeFile(orchestrator: BuildTaskOrchestrator, fileName: string): boolean {
  const result = orchestrator.host?.removeFile?.(fileName) ?? orchestrator.host?.fs?.remove?.(fileName);
  return result !== false;
}

function dateAfter(left: Date, right: Date): boolean {
  return left.getTime() > right.getTime();
}

function dateBefore(left: Date, right: Date): boolean {
  return left.getTime() < right.getTime();
}

function sameTime(left: Date | undefined, right: Date | undefined): boolean {
  if (left === undefined || right === undefined) return left === right;
  return left.getTime() === right.getTime();
}

function missingDate(): Date {
  return new Date(0);
}

function farFutureDate(): Date {
  return new Date(8640000000000000);
}

function isMissingDate(time: Date): boolean {
  return time.getTime() === 0;
}

function isDefinedDate(time: Date | undefined): time is Date {
  return time !== undefined;
}

function programHasChangedDtsFile(program: unknown): boolean {
  if (typeof program !== "object" || program === null) return false;
  const method = (program as { readonly hasChangedDtsFile?: unknown }).hasChangedDtsFile;
  return typeof method === "function" && method.call(program) === true;
}

function emittedFilesFromCompileResult(result: BuildCompileAndEmitResult): string[] {
  if (result.emittedFiles !== undefined) return [...result.emittedFiles];
  const emitResult = result.emitResult;
  if (typeof emitResult !== "object" || emitResult === null) return [];
  const emittedFiles = (emitResult as { readonly emittedFiles?: unknown; readonly EmittedFiles?: unknown }).emittedFiles
    ?? (emitResult as { readonly EmittedFiles?: unknown }).EmittedFiles;
  return Array.isArray(emittedFiles) ? emittedFiles.filter((file): file is string => typeof file === "string") : [];
}

function oldestOutputAfterEmit(resolved: BuildTaskResolvedProject | undefined, emittedFiles: readonly string[]): string {
  return emittedFiles[0] ?? resolvedOutputFileNames(resolved)[0] ?? resolvedBuildInfoFileName(resolved);
}

function sameStringArray(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}

function isBuildInfoLike(value: unknown): value is BuildInfoLike {
  return typeof value === "object" && value !== null;
}
