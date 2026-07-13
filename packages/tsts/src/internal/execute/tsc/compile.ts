import type { bool, int } from "../../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../../go/compat.js";
import type { Writer } from "../../../go/io.js";
import type { Duration, Time } from "../../../go/time.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import type { SyncMap } from "../../collections/syncmap.js";
import type { EmitResult } from "../../compiler/program.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import type { Locale } from "../../locale/locale.js";
import type { Path } from "../../tspath/path.js";
import type { FS } from "../../vfs/vfs.js";
import type { Program } from "../incremental/program.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::System","kind":"type","status":"implemented","sigHash":"9796f5a63a81e48716f70a9ce1144968740f12fb78d508829d5be302b9df34ef"}
 *
 * Go source:
 * System interface {
 * 	Writer() io.Writer
 * 	FS() vfs.FS
 * 	DefaultLibraryPath() string
 * 	GetCurrentDirectory() string
 * 	WriteOutputIsTTY() bool
 * 	GetWidthOfTerminal() int
 * 	GetEnvironmentVariable(name string) string
 * 
 * 	Now() time.Time
 * 	SinceStart() time.Duration
 * }
 */
export interface System {
  Writer(): GoInterface<Writer>;
  FS(): GoInterface<FS>;
  DefaultLibraryPath(): string;
  GetCurrentDirectory(): string;
  WriteOutputIsTTY(): bool;
  GetWidthOfTerminal(): int;
  GetEnvironmentVariable(name: string): string;
  Now(): Time;
  SinceStart(): Duration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::ExitStatus","kind":"type","status":"implemented","sigHash":"c0840dbe90bb4876ee4e540d172b1eb93656f499a857f85fd99a816fd93f7a1a"}
 *
 * Go source:
 * ExitStatus int
 */
export type ExitStatus = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::constGroup::ExitStatusSuccess+ExitStatusDiagnosticsPresent_OutputsSkipped+ExitStatusDiagnosticsPresent_OutputsGenerated+ExitStatusInvalidProject_OutputsSkipped+ExitStatusProjectReferenceCycle_OutputsSkipped+ExitStatusNotImplemented","kind":"constGroup","status":"implemented","sigHash":"f52247fde3d4e8d3add4ff1e6ca9beea887ece14578762bbf56f8323ec9c6a80"}
 *
 * Go source:
 * const (
 * 	ExitStatusSuccess                              ExitStatus = 0
 * 	ExitStatusDiagnosticsPresent_OutputsSkipped    ExitStatus = 1
 * 	ExitStatusDiagnosticsPresent_OutputsGenerated  ExitStatus = 2
 * 	ExitStatusInvalidProject_OutputsSkipped        ExitStatus = 3
 * 	ExitStatusProjectReferenceCycle_OutputsSkipped ExitStatus = 4
 * 	ExitStatusNotImplemented                       ExitStatus = 5
 * )
 */
export const ExitStatusSuccess: ExitStatus = 0;
export const ExitStatusDiagnosticsPresent_OutputsSkipped: ExitStatus = 1;
export const ExitStatusDiagnosticsPresent_OutputsGenerated: ExitStatus = 2;
export const ExitStatusInvalidProject_OutputsSkipped: ExitStatus = 3;
export const ExitStatusProjectReferenceCycle_OutputsSkipped: ExitStatus = 4;
export const ExitStatusNotImplemented: ExitStatus = 5;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::Watcher","kind":"type","status":"implemented","sigHash":"2a47ad3c74e0776aadddcb18d437342520fd225743cc17fef59eb9009038eb8e"}
 *
 * Go source:
 * Watcher interface {
 * 	DoCycle()
 * }
 */
export interface Watcher {
  DoCycle(): void;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::CommandLineResult","kind":"type","status":"implemented","sigHash":"e50a93841ad66672ce21962a3d4d374bb2472aff8487ed7239bc95d44088fdcb"}
 *
 * Go source:
 * CommandLineResult struct {
 * 	Status  ExitStatus
 * 	Watcher Watcher
 * }
 */
export interface CommandLineResult {
  Status: ExitStatus;
  Watcher: Watcher | undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::CommandLineTesting","kind":"type","status":"implemented","sigHash":"c68bf842b676a83b41e9a25f1564182e8348f701ec950e9bff1f53068f919941"}
 *
 * Go source:
 * CommandLineTesting interface {
 * 	// Ensure that all emitted files are timestamped in order to ensure they are deterministic for test baseline
 * 	OnEmittedFiles(result *compiler.EmitResult, mTimesCache *collections.SyncMap[tspath.Path, time.Time])
 * 	OnListFilesStart(w io.Writer)
 * 	OnListFilesEnd(w io.Writer)
 * 	OnStatisticsStart(w io.Writer)
 * 	OnStatisticsEnd(w io.Writer)
 * 	OnBuildStatusReportStart(w io.Writer)
 * 	OnBuildStatusReportEnd(w io.Writer)
 * 	OnWatchStatusReportStart()
 * 	OnWatchStatusReportEnd()
 * 	GetTrace(w io.Writer, locale locale.Locale) func(msg *diagnostics.Message, args ...any)
 * 	OnProgram(program *incremental.Program)
 * }
 */
export interface CommandLineTesting {
  OnEmittedFiles(result: GoPtr<EmitResult>, mTimesCache: GoPtr<SyncMap<Path, Time>>): void;
  OnListFilesStart(w: GoInterface<Writer>): void;
  OnListFilesEnd(w: GoInterface<Writer>): void;
  OnStatisticsStart(w: GoInterface<Writer>): void;
  OnStatisticsEnd(w: GoInterface<Writer>): void;
  OnBuildStatusReportStart(w: GoInterface<Writer>): void;
  OnBuildStatusReportEnd(w: GoInterface<Writer>): void;
  OnWatchStatusReportStart(): void;
  OnWatchStatusReportEnd(): void;
  GetTrace(w: GoInterface<Writer>, locale: Locale): (msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void;
  OnProgram(program: GoPtr<Program>): void;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::CompileTimes","kind":"type","status":"implemented","sigHash":"9906ca36f4bae5428c5e3f3c53973bba22c52cfed4027df640ee9a609c353512"}
 *
 * Go source:
 * CompileTimes struct {
 * 	ConfigTime         time.Duration
 * 	ParseTime          time.Duration
 * 	bindTime           time.Duration
 * 	checkTime          time.Duration
 * 	totalTime          time.Duration
 * 	emitTime           time.Duration
 * 	BuildInfoReadTime  time.Duration
 * 	ChangesComputeTime time.Duration
 * }
 */
export interface CompileTimes {
  ConfigTime: Duration;
  ParseTime: Duration;
  bindTime: Duration;
  checkTime: Duration;
  totalTime: Duration;
  emitTime: Duration;
  BuildInfoReadTime: Duration;
  ChangesComputeTime: Duration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/compile.go::type::CompileAndEmitResult","kind":"type","status":"implemented","sigHash":"9e44889df73aa495b668edc0282e0de265c1c102acd25cbe4fe4491fc8f9be52"}
 *
 * Go source:
 * CompileAndEmitResult struct {
 * 	Diagnostics []*ast.Diagnostic
 * 	EmitResult  *compiler.EmitResult
 * 	Status      ExitStatus
 * 	times       *CompileTimes
 * }
 */
export interface CompileAndEmitResult {
  Diagnostics: GoSlice<GoPtr<Diagnostic>>;
  EmitResult: GoPtr<EmitResult>;
  Status: ExitStatus;
  times: GoPtr<CompileTimes>;
}
