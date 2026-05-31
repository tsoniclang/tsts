/**
 * Command-line execution contracts.
 *
 * Port of TS-Go `internal/execute/tsc/compile.go`.
 */

import type { FS } from "../../vfs/index.js";
import type { TextWriter } from "./statistics.js";

export interface System {
  writer(): TextWriter;
  fs(): FS;
  defaultLibraryPath(): string;
  getCurrentDirectory(): string;
  writeOutputIsTTY(): boolean;
  getWidthOfTerminal(): number;
  getEnvironmentVariable(name: string): string;
  now(): Date;
  sinceStart(): number;
}

export enum ExitStatus {
  Success = 0,
  DiagnosticsPresentOutputsGenerated = 1,
  DiagnosticsPresentOutputsSkipped = 2,
  InvalidProjectOutputsSkipped = 3,
  ProjectReferenceCycleOutputsSkipped = 4,
  NotImplemented = 5,
}

export interface Watcher {
  doCycle(): void;
}

export interface CommandLineResult {
  readonly status: ExitStatus;
  readonly watcher?: Watcher;
}

export interface CommandLineTesting {
  onEmittedFiles(result: unknown, mTimesCache: unknown): void;
  onListFilesStart(writer: TextWriter): void;
  onListFilesEnd(writer: TextWriter): void;
  onStatisticsStart(writer: TextWriter): void;
  onStatisticsEnd(writer: TextWriter): void;
  onBuildStatusReportStart(writer: TextWriter): void;
  onBuildStatusReportEnd(writer: TextWriter): void;
  onWatchStatusReportStart(): void;
  onWatchStatusReportEnd(): void;
  getTrace(writer: TextWriter, locale: unknown): (message: unknown, ...args: readonly unknown[]) => void;
  onProgram(program: unknown): void;
}

export interface CompileTimes {
  configTime?: number;
  parseTime: number;
  bindTime?: number;
  checkTime?: number;
  totalTime: number;
  emitTime?: number;
  buildInfoReadTime?: number;
  changesComputeTime?: number;
}

export interface CompileAndEmitResult<Diagnostic = unknown, EmitResult = unknown> {
  diagnostics: readonly Diagnostic[];
  emitResult: EmitResult | undefined;
  status: ExitStatus;
  times: CompileTimes;
}
