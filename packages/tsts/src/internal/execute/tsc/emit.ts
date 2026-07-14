import { GoAppend, GoAppendSlice, GoNilSlice, type GoPtr } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppendSlice } from "../../../go/compat.js";
import { Background } from "../../../go/context.js";
import type { Context } from "../../../go/context.js";
import { Fprint, Fprintln } from "../../../go/fmt.js";
import type { Writer } from "../../../go/io.js";
import type { Time } from "../../../go/time.js";
import type { SyncMap } from "../../collections/syncmap.js";
import {
  GetDiagnosticsOfAnyProgram,
  Program_ExplainFiles,
  Program_GetCurrentDirectory,
  Program_GetSourceFiles,
  Program_Options,
  SortAndDeduplicateDiagnostics,
} from "../../compiler/program.js";
import type { EmitOptions, EmitResult, Program, ProgramLike, WriteFile } from "../../compiler/program.js";
import type { SourceFile } from "../../ast/ast.js";
import { Message_Localize } from "../../diagnostics/diagnostics.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import type { Locale } from "../../locale/locale.js";
import { Tracing_Push } from "../../tracing/tracing.js";
import { PhaseBind, PhaseCheck } from "../../tracing/tracing.js";
import type { Tracing } from "../../tracing/tracing.js";
import { ParsedCommandLine_CompilerOptions, ParsedCommandLine_Locale } from "../../tsoptions/parsedcommandline.js";
import type { ParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import { GetNormalizedAbsolutePath } from "../../tspath/path.js";
import type { Path } from "../../tspath/path.js";
import { Tristate_IsTrue } from "../../core/tristate.js";
import { SourceFile_FileName } from "../../ast/ast.js";
import type { CommandLineTesting, CompileAndEmitResult, CompileTimes, System } from "./compile.js";
import { ExitStatusDiagnosticsPresent_OutputsGenerated, ExitStatusDiagnosticsPresent_OutputsSkipped, ExitStatusSuccess } from "./compile.js";
import type { DiagnosticReporter, DiagnosticsReporter } from "./diagnostics.js";
import { statisticsFromProgram, Statistics_Report } from "./statistics.js";
import type { Statistics } from "./statistics.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
import { GoSliceMake } from "../../../go/compat.js";
import { GoSliceLoad, GoStringValueOps } from "../../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/emit.go::func::GetTraceWithWriterFromSys","kind":"func","status":"implemented","sigHash":"17a6384118d8903f7afa1b67bba22dbd81d93ed58d4f8ce909a645b6a1202124"}
 *
 * Go source:
 * func GetTraceWithWriterFromSys(w io.Writer, locale locale.Locale, testing CommandLineTesting) func(msg *diagnostics.Message, args ...any) {
 * 	if testing == nil {
 * 		return func(msg *diagnostics.Message, args ...any) {
 * 			fmt.Fprintln(w, msg.Localize(locale, args...))
 * 		}
 * 	} else {
 * 		return testing.GetTrace(w, locale)
 * 	}
 * }
 */
export function GetTraceWithWriterFromSys(w: GoInterface<Writer>, locale: Locale, testing: GoInterface<CommandLineTesting>): GoFunc<(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void> {
  if (testing === undefined) {
    return (msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void => {
      Fprintln(w!, Message_Localize(msg, locale, ...args));
    };
  } else {
    return testing.GetTrace(w, locale);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/emit.go::type::EmitInput","kind":"type","status":"implemented","sigHash":"4f076a1f5307477c5cfd12bb558a34129ff8d11e1855b22c33d0486d04d4cbb8"}
 *
 * Go source:
 * EmitInput struct {
 * 	Sys                System
 * 	ProgramLike        compiler.ProgramLike
 * 	Program            *compiler.Program
 * 	Config             *tsoptions.ParsedCommandLine
 * 	ReportDiagnostic   DiagnosticReporter
 * 	ReportErrorSummary DiagnosticsReporter
 * 	Writer             io.Writer
 * 	WriteFile          compiler.WriteFile
 * 	CompileTimes       *CompileTimes
 * 	Testing            CommandLineTesting
 * 	TestingMTimesCache *collections.SyncMap[tspath.Path, time.Time]
 * 	Tracing            *tracing.Tracing
 * }
 */
export interface EmitInput {
  Sys: GoInterface<System>;
  ProgramLike: GoInterface<ProgramLike>;
  Program: GoPtr<Program>;
  Config: GoPtr<ParsedCommandLine>;
  ReportDiagnostic: DiagnosticReporter;
  ReportErrorSummary: DiagnosticsReporter;
  Writer: GoInterface<Writer>;
  WriteFile: WriteFile;
  CompileTimes: GoPtr<CompileTimes>;
  Testing: GoInterface<CommandLineTesting>;
  TestingMTimesCache: GoPtr<SyncMap<Path, Time>>;
  Tracing: GoPtr<Tracing>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/emit.go::func::EmitAndReportStatistics","kind":"func","status":"implemented","sigHash":"0b6652d302c0ecd13cc0e43a0892d4fe5e1af322263827515001ca00f9320be2"}
 *
 * Go source:
 * func EmitAndReportStatistics(input EmitInput) (CompileAndEmitResult, *Statistics) {
 * 	var statistics *Statistics
 * 	result := EmitFilesAndReportErrors(input)
 * 	if result.Status != ExitStatusSuccess {
 * 		// compile exited early
 * 		return result, nil
 * 	}
 * 	result.times.totalTime = input.Sys.SinceStart()
 * 
 * 	if input.Config.CompilerOptions().Diagnostics.IsTrue() || input.Config.CompilerOptions().ExtendedDiagnostics.IsTrue() {
 * 		var memStats runtime.MemStats
 * 		// GC must be called twice to allow things to settle.
 * 		runtime.GC()
 * 		runtime.GC()
 * 		runtime.ReadMemStats(&memStats)
 * 
 * 		statistics = statisticsFromProgram(input, &memStats)
 * 		statistics.Report(input.Writer, input.Testing)
 * 	}
 * 
 * 	if result.EmitResult.EmitSkipped && len(result.Diagnostics) > 0 {
 * 		result.Status = ExitStatusDiagnosticsPresent_OutputsSkipped
 * 	} else if len(result.Diagnostics) > 0 {
 * 		result.Status = ExitStatusDiagnosticsPresent_OutputsGenerated
 * 	}
 * 	return result, statistics
 * }
 */
export function EmitAndReportStatistics(input: EmitInput): [CompileAndEmitResult, GoPtr<Statistics>] {
  let statistics: GoPtr<Statistics> = undefined;
  let result = EmitFilesAndReportErrors(input);
  if (result.Status !== ExitStatusSuccess) {
    return [result, undefined];
  }
  result = { ...result, times: { ...result.times!, totalTime: input.Sys!.SinceStart() } };
  const options = ParsedCommandLine_CompilerOptions(input.Config);
  if (Tristate_IsTrue(options!.Diagnostics) || Tristate_IsTrue(options!.ExtendedDiagnostics)) {
    const memStats = {} as import("../../../go/runtime.js").MemStats;
    // Note: runtime.GC() and runtime.ReadMemStats() are Go runtime facades not available in TS.
    statistics = statisticsFromProgram(input, memStats);
    Statistics_Report(statistics, input.Writer, input.Testing);
  }
  let finalResult = result;
  if (result.EmitResult!.EmitSkipped && result.Diagnostics.length > 0) {
    finalResult = { ...result, Status: ExitStatusDiagnosticsPresent_OutputsSkipped };
  } else if (result.Diagnostics.length > 0) {
    finalResult = { ...result, Status: ExitStatusDiagnosticsPresent_OutputsGenerated };
  }
  return [finalResult, statistics];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/emit.go::func::EmitFilesAndReportErrors","kind":"func","status":"implemented","sigHash":"12d76c9302d5e22db5dd76c803b8d9282528114327cfa745a89986a7067f9559"}
 *
 * Go source:
 * func EmitFilesAndReportErrors(input EmitInput) (result CompileAndEmitResult) {
 * 	result.times = input.CompileTimes
 * 	ctx := context.Background()
 * 
 * 	allDiagnostics := compiler.GetDiagnosticsOfAnyProgram(
 * 		ctx,
 * 		input.ProgramLike,
 * 		nil,
 * 		false,
 * 		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
 * 			// Options diagnostics include global diagnostics (even though we collect them separately),
 * 			// and global diagnostics create checkers, which then bind all of the files. Do this binding
 * 			// early so we can track the time.
 * 			if tr := input.Tracing; tr != nil {
 * 				defer tr.Push(tracing.PhaseBind, "bindSourceFiles", nil, true)()
 * 			}
 * 			bindStart := input.Sys.Now()
 * 			diags := input.ProgramLike.GetBindDiagnostics(ctx, file)
 * 			result.times.bindTime = input.Sys.Now().Sub(bindStart)
 * 			return diags
 * 		},
 * 		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
 * 			if tr := input.Tracing; tr != nil {
 * 				defer tr.Push(tracing.PhaseCheck, "checkSourceFiles", nil, true)()
 * 			}
 * 			checkStart := input.Sys.Now()
 * 			diags := input.ProgramLike.GetSemanticDiagnostics(ctx, file)
 * 			result.times.checkTime = input.Sys.Now().Sub(checkStart)
 * 			return diags
 * 		},
 * 	)
 * 
 * 	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
 * 	if !input.ProgramLike.Options().ListFilesOnly.IsTrue() {
 * 		emitStart := input.Sys.Now()
 * 		emitResult = input.ProgramLike.Emit(ctx, compiler.EmitOptions{
 * 			WriteFile: input.WriteFile,
 * 		})
 * 		result.times.emitTime = input.Sys.Now().Sub(emitStart)
 * 	}
 * 	if emitResult != nil {
 * 		allDiagnostics = append(allDiagnostics, emitResult.Diagnostics...)
 * 	}
 * 	if input.Testing != nil {
 * 		input.Testing.OnEmittedFiles(emitResult, input.TestingMTimesCache)
 * 	}
 * 
 * 	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
 * 	for _, diagnostic := range allDiagnostics {
 * 		input.ReportDiagnostic(diagnostic)
 * 	}
 * 
 * 	listFiles(input, emitResult)
 * 
 * 	input.ReportErrorSummary(allDiagnostics)
 * 	result.Diagnostics = allDiagnostics
 * 	result.EmitResult = emitResult
 * 	result.Status = ExitStatusSuccess
 * 	return result
 * }
 */
export function EmitFilesAndReportErrors(input: EmitInput): CompileAndEmitResult {
  type TimeWithSub = import("../../../go/time.js").Time & { Sub(t: import("../../../go/time.js").Time): number };
  const result: CompileAndEmitResult = {
    Diagnostics: GoSliceMake(0, 0, GoPointerValueOps<Diagnostic>()),
    EmitResult: undefined,
    Status: ExitStatusSuccess,
    times: input.CompileTimes,
  };
  const ctx: Context = Background();

  let allDiagnostics = GetDiagnosticsOfAnyProgram(
    ctx,
    input.ProgramLike,
    undefined,
    false,
    (innerCtx: GoInterface<Context>, file: GoPtr<SourceFile>) => {
      // Options diagnostics include global diagnostics (even though we collect them separately),
      // and global diagnostics create checkers, which then bind all of the files. Do this binding
      // early so we can track the time.
      let pop: (() => void) | undefined;
      if (input.Tracing !== undefined) {
        pop = Tracing_Push(input.Tracing, PhaseBind, "bindSourceFiles", undefined as unknown as Map<string, unknown>, true);
      }
      const bindStart = input.Sys!.Now();
      const diags = input.ProgramLike!.GetBindDiagnostics(innerCtx, file);
      result.times!.bindTime = (input.Sys!.Now() as TimeWithSub).Sub(bindStart) as import("../../../go/time.js").Duration;
      if (pop !== undefined) {
        pop();
      }
      return diags;
    },
    (innerCtx: GoInterface<Context>, file: GoPtr<SourceFile>) => {
      let pop: (() => void) | undefined;
      if (input.Tracing !== undefined) {
        pop = Tracing_Push(input.Tracing, PhaseCheck, "checkSourceFiles", undefined as unknown as Map<string, unknown>, true);
      }
      const checkStart = input.Sys!.Now();
      const diags = input.ProgramLike!.GetSemanticDiagnostics(innerCtx, file);
      result.times!.checkTime = (input.Sys!.Now() as TimeWithSub).Sub(checkStart) as import("../../../go/time.js").Duration;
      if (pop !== undefined) {
        pop();
      }
      return diags;
    },
  );

  let emitResult: GoPtr<EmitResult> = {
    EmitSkipped: true,
    Diagnostics: GoNilSlice(),
    EmittedFiles: GoNilSlice(),
    SourceMaps: GoNilSlice(),
  };
  if (!Tristate_IsTrue(input.ProgramLike!.Options()!.ListFilesOnly)) {
    const emitStart = input.Sys!.Now();
    emitResult = input.ProgramLike!.Emit(ctx, { TargetSourceFile: undefined, EmitOnly: 0 as import("../../compiler/emitter.js").EmitOnly, WriteFile: input.WriteFile });
    result.times!.emitTime = (input.Sys!.Now() as TimeWithSub).Sub(emitStart) as import("../../../go/time.js").Duration;
  }
  if (emitResult !== undefined) {
    allDiagnostics = GoSliceAppendSlice(allDiagnostics, emitResult!.Diagnostics, GoPointerValueOps<Diagnostic>());
  }
  if (input.Testing !== undefined) {
    input.Testing.OnEmittedFiles(emitResult, input.TestingMTimesCache);
  }

  allDiagnostics = SortAndDeduplicateDiagnostics(allDiagnostics);
  for (const diagnostic of allDiagnostics) {
    input.ReportDiagnostic!(diagnostic);
  }

  listFiles(input, emitResult);

  input.ReportErrorSummary!(allDiagnostics);
  return { ...result, Diagnostics: allDiagnostics, EmitResult: emitResult, Status: ExitStatusSuccess };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/tsc/emit.go::func::listFiles","kind":"func","status":"implemented","sigHash":"c1f5f67217ce85c6c591d40b9ac34c43184044573f9c9b4a988d0f9bcaa411fc"}
 *
 * Go source:
 * func listFiles(input EmitInput, emitResult *compiler.EmitResult) {
 * 	if input.Testing != nil {
 * 		input.Testing.OnListFilesStart(input.Writer)
 * 		defer input.Testing.OnListFilesEnd(input.Writer)
 * 	}
 * 	options := input.Program.Options()
 * 	if options.ListEmittedFiles.IsTrue() {
 * 		for _, file := range emitResult.EmittedFiles {
 * 			fmt.Fprintln(input.Writer, "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, input.Program.GetCurrentDirectory()))
 * 		}
 * 	}
 * 	if options.ExplainFiles.IsTrue() {
 * 		input.Program.ExplainFiles(input.Writer, input.Config.Locale())
 * 	} else if options.ListFiles.IsTrue() || options.ListFilesOnly.IsTrue() {
 * 		for _, file := range input.Program.GetSourceFiles() {
 * 			fmt.Fprintln(input.Writer, file.FileName())
 * 		}
 * 	}
 * }
 */
export function listFiles(input: EmitInput, emitResult: GoPtr<EmitResult>): void {
  if (input.Testing !== undefined) {
    input.Testing.OnListFilesStart(input.Writer);
  }
  try {
    const options = Program_Options(input.Program);
    if (Tristate_IsTrue(options!.ListEmittedFiles)) {
      for (
        let __goRangeSlice = emitResult!.EmittedFiles,
          __goRangeLength = __goRangeSlice.length,
          __goRangeValueOps = GoStringValueOps,
          __goRangeIndex = 0;
        __goRangeIndex < __goRangeLength;
        __goRangeIndex++
      ) {
        const file = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
        Fprintln(input.Writer!, "TSFILE: ", GetNormalizedAbsolutePath(file, Program_GetCurrentDirectory(input.Program)));
      }
    }
    if (Tristate_IsTrue(options!.ExplainFiles)) {
      Program_ExplainFiles(input.Program, input.Writer, ParsedCommandLine_Locale(input.Config));
    } else if (Tristate_IsTrue(options!.ListFiles) || Tristate_IsTrue(options!.ListFilesOnly)) {
      for (
        let __goRangeSlice = Program_GetSourceFiles(input.Program),
          __goRangeLength = __goRangeSlice.length,
          __goRangeValueOps = GoPointerValueOps<SourceFile>(),
          __goRangeIndex = 0;
        __goRangeIndex < __goRangeLength;
        __goRangeIndex++
      ) {
        const file = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
        Fprintln(input.Writer!, SourceFile_FileName(file));
      }
    }
  } finally {
    if (input.Testing !== undefined) {
      input.Testing.OnListFilesEnd(input.Writer);
    }
  }
}
