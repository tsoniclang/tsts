/**
 * Processing diagnostic.
 *
 * Port of TS-Go `internal/compiler/processingDiagnostic.go` (~135 LoC).
 * Lightweight diagnostic kind emitted during file loading + module
 * resolution before the full diagnostic surface is available.
 */

import type { Diagnostic } from "../ast/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

// Port of TS-Go `internal/compiler/processingDiagnostic.go`
// `type processingDiagnosticKind int` + iota const block
// (processingDiagnosticKindUnknownReference /
// processingDiagnosticKindExplainingFileInclude). The TS-convention member
// names strip the `processingDiagnosticKind` prefix.
export enum ProcessingDiagnosticKind {
  UnknownReference = 0,
  ExplainingFileInclude = 1,
}

export interface ProcessingDiagnostic {
  kind: ProcessingDiagnosticKind;
  message: { code: number; message: string };
  args: readonly unknown[];
  fileName?: string;
  pos?: number;
  end?: number;
  related?: readonly ProcessingDiagnostic[];
  includeReason?: FileIncludeReasonLike;
}

export interface FileIncludeReasonLike {
  readonly kind?: number;
  readonly fileName?: string;
  readonly referencingFile?: string;
  readonly ref?: { readonly fileName?: string };
}

export interface IncludeExplainingDiagnostic {
  readonly file?: string;
  readonly diagnosticReason?: FileIncludeReasonLike;
  readonly message: { code: number; message: string };
  readonly args: readonly unknown[];
}

export function newProcessingDiagnostic(
  message: { code: number; message: string }, args: readonly unknown[] = [],
): ProcessingDiagnostic {
  return { kind: ProcessingDiagnosticKind.ExplainingFileInclude, message, args };
}

export function newUnknownReferenceDiagnostic(reason: FileIncludeReasonLike): ProcessingDiagnostic {
  const refName = reason.ref?.fileName ?? reason.fileName ?? "";
  return {
    kind: ProcessingDiagnosticKind.UnknownReference,
    message: { code: 0, message: refName === "" ? "Cannot find referenced file." : `Cannot find referenced file '${refName}'.` },
    args: refName === "" ? [] : [refName],
    includeReason: reason,
  };
}

export function newIncludeExplainingDiagnostic(data: IncludeExplainingDiagnostic): ProcessingDiagnostic {
  const diagnostic: ProcessingDiagnostic = {
    kind: ProcessingDiagnosticKind.ExplainingFileInclude,
    message: data.message,
    args: data.args,
  };
  if (data.file !== undefined) diagnostic.fileName = data.file;
  if (data.diagnosticReason !== undefined) diagnostic.includeReason = data.diagnosticReason;
  return diagnostic;
}

export function withLocation(
  d: ProcessingDiagnostic, fileName: string, pos: number, end: number,
): ProcessingDiagnostic {
  return { ...d, fileName, pos, end };
}

export function withRelated(
  d: ProcessingDiagnostic, related: readonly ProcessingDiagnostic[],
): ProcessingDiagnostic {
  return { ...d, related };
}

export function asFileIncludeReason(d: ProcessingDiagnostic): FileIncludeReasonLike | undefined {
  return d.includeReason;
}

export function asIncludeExplainingDiagnostic(d: ProcessingDiagnostic): IncludeExplainingDiagnostic {
  return {
    message: d.message,
    args: d.args,
    ...(d.fileName === undefined ? {} : { file: d.fileName }),
    ...(d.includeReason === undefined ? {} : { diagnosticReason: d.includeReason }),
  };
}

export function toDiagnostic(d: ProcessingDiagnostic): Diagnostic {
  const text = formatMessage(d.message.message, d.args);
  const relatedInformation = d.related?.map(toDiagnostic);
  return {
    message: {
      key: "TSTS_Processing_Diagnostic",
      code: d.message.code,
      category: DiagnosticCategory.Error,
      message: d.message.message,
    },
    category: DiagnosticCategory.Error,
    code: d.message.code,
    text,
    ...(d.pos === undefined ? {} : { start: d.pos }),
    ...(d.end === undefined || d.pos === undefined ? {} : { length: Math.max(0, d.end - d.pos) }),
    ...(relatedInformation === undefined ? {} : { relatedInformation }),
  };
}

export function createDiagnosticExplainingFile(
  d: ProcessingDiagnostic,
  includeReasons: readonly FileIncludeReasonLike[] = [],
): Diagnostic {
  const base = toDiagnostic(d);
  if (includeReasons.length === 0) return base;
  const chainedDiagnostics = includeReasons.map((reason) => diagnosticFromText(formatIncludeReason(reason)));
  return { ...base, chainedDiagnostics };
}

function diagnosticFromText(text: string): Diagnostic {
  return {
    message: {
      key: "TSTS_Processing_Diagnostic_Detail",
      code: 0,
      category: DiagnosticCategory.Message,
      message: text,
    },
    category: DiagnosticCategory.Message,
    code: 0,
    text,
  };
}

function formatMessage(template: string, args: readonly unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (_match, indexText: string) => {
    const index = Number(indexText);
    return String(args[index] ?? "");
  });
}

function formatIncludeReason(reason: FileIncludeReasonLike): string {
  const ref = reason.ref?.fileName ?? reason.fileName ?? "";
  const from = reason.referencingFile === undefined ? "" : ` from '${reason.referencingFile}'`;
  return ref === "" ? `File was included${from}.` : `File '${ref}' was included${from}.`;
}
