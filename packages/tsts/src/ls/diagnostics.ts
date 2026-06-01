/**
 * Language-service diagnostics.
 *
 * Port of TS-Go `internal/ls/diagnostics.go`. The collection order is
 * syntactic, semantic, suggestion, then declaration diagnostics when
 * declaration emit is enabled.
 */

import type { Diagnostic as CompilerDiagnostic, SourceFileSlim } from "../diagnostics/types.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import {
  DiagnosticSeverityError,
  DiagnosticSeverityHint,
  DiagnosticSeverityInformation,
  DiagnosticSeverityWarning,
  type Diagnostic as LSPDiagnostic,
  type DocumentDiagnosticResponse,
  type DocumentUri,
  type Range,
} from "../lsp/lsproto/index.js";
import { computeLSPLineStarts, LSPLineMap } from "./lsconv/index.js";

export interface DiagnosticProgramOptions {
  getEmitDeclarations(): boolean;
}

export interface DiagnosticProgram<TFile extends SourceFileSlim = SourceFileSlim> {
  getSyntacticDiagnostics(file: TFile): readonly CompilerDiagnostic[];
  getSemanticDiagnostics(file: TFile): readonly CompilerDiagnostic[];
  getSuggestionDiagnostics(file: TFile): readonly CompilerDiagnostic[];
  getDeclarationDiagnostics(file: TFile): readonly CompilerDiagnostic[];
  options(): DiagnosticProgramOptions;
}

export interface DiagnosticLanguageService<TFile extends SourceFileSlim = SourceFileSlim> {
  getProgramAndFile(uri: DocumentUri): readonly [DiagnosticProgram<TFile>, TFile];
  reportStyleChecksAsWarnings(): boolean;
}

export function getAllDiagnostics<TFile extends SourceFileSlim>(
  program: DiagnosticProgram<TFile>,
  file: TFile,
): readonly CompilerDiagnostic[] {
  const diagnostics: CompilerDiagnostic[] = [];
  diagnostics.push(...program.getSyntacticDiagnostics(file));
  diagnostics.push(...program.getSemanticDiagnostics(file));
  diagnostics.push(...program.getSuggestionDiagnostics(file));
  if (program.options().getEmitDeclarations()) {
    diagnostics.push(...program.getDeclarationDiagnostics(file));
  }
  return diagnostics;
}

export function provideDiagnostics<TFile extends SourceFileSlim>(
  service: DiagnosticLanguageService<TFile>,
  uri: DocumentUri,
): DocumentDiagnosticResponse {
  const [program, file] = service.getProgramAndFile(uri);
  const diagnostics = getAllDiagnostics(program, file);
  return {
    fullDocumentDiagnosticReport: {
      kind: "full",
      items: toLSPDiagnostics(service, diagnostics),
    },
  };
}

export function toLSPDiagnostics(
  service: Pick<DiagnosticLanguageService, "reportStyleChecksAsWarnings">,
  ...diagnosticGroups: readonly (readonly CompilerDiagnostic[])[]
): readonly LSPDiagnostic[] {
  const diagnostics: LSPDiagnostic[] = [];
  for (const group of diagnosticGroups) {
    for (const diagnostic of group) {
      diagnostics.push(diagnosticToLSPPull(diagnostic, service.reportStyleChecksAsWarnings()));
    }
  }
  return diagnostics;
}

export function diagnosticToLSPPull(diagnostic: CompilerDiagnostic, reportStyleChecksAsWarnings: boolean): LSPDiagnostic {
  const file = diagnostic.file;
  const range = file === undefined
    ? emptyRange()
    : diagnosticRange(file, diagnostic.start ?? 0, diagnostic.length ?? 0);
  const result: LSPDiagnostic = {
    range,
    severity: diagnosticSeverity(diagnostic, reportStyleChecksAsWarnings),
    code: { integer: diagnostic.code },
    source: "ts",
    message: diagnostic.text,
  };
  if (diagnostic.relatedInformation !== undefined) {
    return {
      ...result,
      relatedInformation: diagnostic.relatedInformation.map((related) => ({
      location: {
        uri: related.file?.fileName ?? "",
        range: related.file === undefined ? emptyRange() : diagnosticRange(related.file, related.start ?? 0, related.length ?? 0),
      },
      message: related.text,
      })),
    };
  }
  return result;
}

export function diagnosticSeverity(diagnostic: CompilerDiagnostic, reportStyleChecksAsWarnings: boolean): number {
  if (diagnostic.category === DiagnosticCategory.Error) return DiagnosticSeverityError;
  if (diagnostic.category === DiagnosticCategory.Warning) return DiagnosticSeverityWarning;
  if (diagnostic.category === DiagnosticCategory.Suggestion) {
    return reportStyleChecksAsWarnings ? DiagnosticSeverityWarning : DiagnosticSeverityHint;
  }
  return DiagnosticSeverityInformation;
}

export function diagnosticRange(file: SourceFileSlim, start: number, length: number): Range {
  const lineMap = computeLSPLineStarts(file.text);
  return {
    start: positionAt(lineMap, start),
    end: positionAt(lineMap, start + length),
  };
}

function positionAt(lineMap: LSPLineMap, position: number): { readonly line: number; readonly character: number } {
  const line = lineMap.computeIndexOfLineStart(position);
  return { line, character: position - (lineMap.lineStarts[line] ?? 0) };
}

function emptyRange(): Range {
  return {
    start: { line: 0, character: 0 },
    end: { line: 0, character: 0 },
  };
}
