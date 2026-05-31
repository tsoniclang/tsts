/**
 * Compiler diagnostic-pipeline parity helpers.
 *
 * TS-Go keeps option, parse, bind, check, and emit diagnostics flowing through
 * ordered compiler phases. These helpers preserve the ordering and dedupe rules
 * for the split TSTS compiler modules.
 */

export type CompilerDiagnosticPhase =
  | "options"
  | "parse"
  | "bind"
  | "check"
  | "emit"
  | "declaration";

export interface CompilerPipelineDiagnostic {
  readonly phase: CompilerDiagnosticPhase;
  readonly fileName?: string;
  readonly start?: number;
  readonly length?: number;
  readonly code?: number;
  readonly message: string;
}

export interface CompilerDiagnosticPipeline {
  add(diagnostic: CompilerPipelineDiagnostic): void;
  addMany(diagnostics: readonly CompilerPipelineDiagnostic[]): void;
  diagnosticsForPhase(phase: CompilerDiagnosticPhase): readonly CompilerPipelineDiagnostic[];
  all(): readonly CompilerPipelineDiagnostic[];
  hasErrors(): boolean;
  clearPhase(phase: CompilerDiagnosticPhase): void;
}

const phaseOrder: readonly CompilerDiagnosticPhase[] = ["options", "parse", "bind", "check", "emit", "declaration"];

export function createCompilerDiagnosticPipeline(): CompilerDiagnosticPipeline {
  const diagnostics: CompilerPipelineDiagnostic[] = [];
  return {
    add(diagnostic) {
      if (!containsDiagnostic(diagnostics, diagnostic)) diagnostics.push(diagnostic);
    },
    addMany(items) {
      for (const diagnostic of items) this.add(diagnostic);
    },
    diagnosticsForPhase(phase) {
      return diagnostics.filter(diagnostic => diagnostic.phase === phase).sort(compareDiagnostics);
    },
    all() {
      return [...diagnostics].sort(compareDiagnostics);
    },
    hasErrors() {
      return diagnostics.length > 0;
    },
    clearPhase(phase) {
      for (let index = diagnostics.length - 1; index >= 0; index -= 1) {
        if (diagnostics[index]!.phase === phase) diagnostics.splice(index, 1);
      }
    },
  };
}

export function mergeCompilerDiagnostics(groups: readonly (readonly CompilerPipelineDiagnostic[])[]): readonly CompilerPipelineDiagnostic[] {
  const pipeline = createCompilerDiagnosticPipeline();
  for (const group of groups) pipeline.addMany(group);
  return pipeline.all();
}

export function diagnosticsBlockEmit(diagnostics: readonly CompilerPipelineDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.phase === "options" || diagnostic.phase === "parse" || diagnostic.phase === "bind" || diagnostic.phase === "check");
}

export function diagnosticsBlockDeclarationEmit(diagnostics: readonly CompilerPipelineDiagnostic[]): boolean {
  return diagnosticsBlockEmit(diagnostics) || diagnostics.some(diagnostic => diagnostic.phase === "declaration");
}

export function formatCompilerDiagnostic(diagnostic: CompilerPipelineDiagnostic): string {
  const location = diagnostic.fileName === undefined
    ? ""
    : `${diagnostic.fileName}${diagnostic.start === undefined ? "" : `(${diagnostic.start})`}: `;
  const code = diagnostic.code === undefined ? "" : `TS${diagnostic.code}: `;
  return `${location}${code}${diagnostic.message}`;
}

function containsDiagnostic(diagnostics: readonly CompilerPipelineDiagnostic[], diagnostic: CompilerPipelineDiagnostic): boolean {
  return diagnostics.some(existing => diagnosticKey(existing) === diagnosticKey(diagnostic));
}

function diagnosticKey(diagnostic: CompilerPipelineDiagnostic): string {
  return [
    diagnostic.phase,
    diagnostic.fileName ?? "",
    diagnostic.start ?? -1,
    diagnostic.length ?? -1,
    diagnostic.code ?? -1,
    diagnostic.message,
  ].join("|");
}

function compareDiagnostics(left: CompilerPipelineDiagnostic, right: CompilerPipelineDiagnostic): number {
  const phaseCompare = phaseOrder.indexOf(left.phase) - phaseOrder.indexOf(right.phase);
  if (phaseCompare !== 0) return phaseCompare;
  const fileCompare = (left.fileName ?? "").localeCompare(right.fileName ?? "");
  if (fileCompare !== 0) return fileCompare;
  return (left.start ?? -1) - (right.start ?? -1);
}
