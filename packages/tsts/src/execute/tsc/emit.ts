import type { CompileAndEmitResult, CompileTimes, ExitStatus } from "./compile.js";

export interface TscEmitInput<Diagnostic = unknown> {
  readonly diagnostics: readonly Diagnostic[];
  readonly emitSkipped: boolean;
  readonly emittedFiles: readonly string[];
  readonly times: CompileTimes;
}

export interface EmitOutput<Diagnostic = unknown> {
  readonly diagnostics: readonly Diagnostic[];
  readonly emittedFiles: readonly string[];
  readonly emitSkipped: boolean;
}

export function getExitStatusForEmit<Diagnostic>(
  input: TscEmitInput<Diagnostic>,
  success: ExitStatus,
  diagnosticsPresentOutputsGenerated: ExitStatus,
  diagnosticsPresentOutputsSkipped: ExitStatus,
): ExitStatus {
  if (input.diagnostics.length === 0) return success;
  return input.emitSkipped ? diagnosticsPresentOutputsSkipped : diagnosticsPresentOutputsGenerated;
}

export function createCompileAndEmitResult<Diagnostic>(
  input: TscEmitInput<Diagnostic>,
  status: ExitStatus,
): CompileAndEmitResult<Diagnostic, EmitOutput<Diagnostic>> {
  return {
    diagnostics: input.diagnostics,
    emitResult: {
      diagnostics: input.diagnostics,
      emittedFiles: input.emittedFiles,
      emitSkipped: input.emitSkipped,
    },
    status,
    times: input.times,
  };
}
