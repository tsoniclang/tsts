/**
 * Include processor.
 *
 * Port of TS-Go `internal/compiler/includeprocessor.go` (~181 LoC).
 * Builds the per-file FileIncludeReason graph, caches reference locations
 * and related info, and materializes diagnostics for include/explain output.
 */

import type { Diagnostic, SourceFile } from "../ast/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import {
  fileIncludeIsReferencedFile,
  getReferencedLocation,
  toDiagnostic,
  toRelatedInfo,
  type FileIncludeReason,
  type ReferenceFileLocation,
} from "./fileInclude.js";

export interface ProcessingDiagnostic {
  toDiagnostic(program: ProgramForInclude): Diagnostic;
}

export interface ProgramForInclude {
  getSourceFile?(fileName: string): SourceFile | undefined;
  getSourceFileByPath?(path: string): SourceFile | undefined;
  getSourceOfProjectReferenceIfOutputIncluded?(file: SourceFile): string;
  getResolvedModules?(): ReadonlyMap<string, ReadonlyMap<string, ResolutionWithDiagnostics>>;
}

export interface ResolutionWithDiagnostics {
  readonly resolutionDiagnostics?: readonly Diagnostic[];
}

export class IncludeProcessor {
  reasons: Map<string, FileIncludeReason[]> = new Map();
  diagnostics: Diagnostic[] = [];
  processingDiagnostics: ProcessingDiagnostic[] = [];
  private readonly reasonToReferenceLocation = new WeakMap<FileIncludeReason, ReferenceFileLocation | undefined>();
  private readonly includeReasonToRelatedInfo = new WeakMap<FileIncludeReason, Diagnostic | undefined>();
  private readonly redirectAndFileFormat = new Map<string, readonly Diagnostic[]>();
  private computedDiagnostics: readonly Diagnostic[] | undefined;

  addReason(fileName: string, reason: FileIncludeReason): void {
    const existing = this.reasons.get(fileName);
    if (existing === undefined) {
      this.reasons.set(fileName, [reason]);
    } else {
      existing.push(reason);
    }
    this.computedDiagnostics = undefined;
  }

  getReasons(fileName: string): readonly FileIncludeReason[] {
    return this.reasons.get(fileName) ?? [];
  }

  processFile(file: SourceFile): void {
    for (const reason of this.getReasons(file.fileName)) {
      if (fileIncludeIsReferencedFile(reason)) this.getReferenceLocation(reason, this.programFromSourceFile(file));
    }
  }

  getDiagnostics(program?: ProgramForInclude): readonly Diagnostic[] {
    if (this.computedDiagnostics !== undefined) return this.computedDiagnostics;
    const diagnostics: Diagnostic[] = [...this.diagnostics];
    if (program !== undefined) {
      for (const diagnostic of this.processingDiagnostics) diagnostics.push(diagnostic.toDiagnostic(program));
      for (const resolutions of program.getResolvedModules?.().values() ?? []) {
        for (const resolved of resolutions.values()) diagnostics.push(...(resolved.resolutionDiagnostics ?? []));
      }
    }
    this.computedDiagnostics = diagnostics;
    return diagnostics;
  }

  addProcessingDiagnostic(...diagnostics: readonly ProcessingDiagnostic[]): void {
    this.processingDiagnostics.push(...diagnostics);
    this.computedDiagnostics = undefined;
  }

  addProcessingDiagnosticsForFileCasing(
    file: string,
    existingCasing: string,
    currentCasing: string,
    reason: FileIncludeReason,
  ): void {
    const referencedReasonAlreadyExists = this.getReasons(file).some(fileIncludeIsReferencedFile);
    const text = referencedReasonAlreadyExists
      ? `Already included file name '${existingCasing}' differs from file name '${currentCasing}' only in casing.`
      : `File name '${currentCasing}' differs from already included file name '${existingCasing}' only in casing.`;
    this.addProcessingDiagnostic({
      toDiagnostic: () => diagnosticFromText(text, reason.referencingFile),
    });
  }

  getReferenceLocation(reason: FileIncludeReason, program: ProgramForInclude): ReferenceFileLocation | undefined {
    if (this.reasonToReferenceLocation.has(reason)) return this.reasonToReferenceLocation.get(reason);
    const location = getReferencedLocation(reason, program);
    this.reasonToReferenceLocation.set(reason, location);
    return location;
  }

  getRelatedInfo(reason: FileIncludeReason, program: ProgramForInclude): Diagnostic | undefined {
    if (this.includeReasonToRelatedInfo.has(reason)) return this.includeReasonToRelatedInfo.get(reason);
    const related = toRelatedInfo(reason, program);
    this.includeReasonToRelatedInfo.set(reason, related);
    return related;
  }

  explainRedirectAndImpliedFormat(
    program: ProgramForInclude,
    filePath: string,
    toFileName: (fileName: string) => string,
  ): readonly Diagnostic[] {
    const existing = this.redirectAndFileFormat.get(filePath);
    if (existing !== undefined) return existing;
    const file = program.getSourceFileByPath?.(filePath);
    if (file === undefined) {
      this.redirectAndFileFormat.set(filePath, []);
      return [];
    }
    const diagnostics: Diagnostic[] = [];
    const source = program.getSourceOfProjectReferenceIfOutputIncluded?.(file);
    if (source !== undefined && source !== "" && source !== file.fileName) {
      diagnostics.push(diagnosticFromText(`File is output of project reference source '${toFileName(source)}'.`, file.fileName));
    }
    this.redirectAndFileFormat.set(filePath, diagnostics);
    return diagnostics;
  }

  includeReasonDiagnostics(program: ProgramForInclude, relativeFileName = true): readonly Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    for (const reasons of this.reasons.values()) {
      for (const reason of reasons) diagnostics.push(toDiagnostic(reason, program, relativeFileName));
    }
    return diagnostics;
  }

  private programFromSourceFile(file: SourceFile): ProgramForInclude {
    return {
      getSourceFile: (fileName) => fileName === file.fileName ? file : undefined,
      getSourceFileByPath: (path) => path === file.fileName ? file : undefined,
    };
  }
}

export function updateFileIncludeProcessor(current: IncludeProcessor): IncludeProcessor {
  const next = new IncludeProcessor();
  for (const [fileName, reasons] of current.reasons) {
    for (const reason of reasons) next.addReason(fileName, reason);
  }
  next.addProcessingDiagnostic(...current.processingDiagnostics);
  return next;
}

export function newIncludeProcessor(): IncludeProcessor {
  return new IncludeProcessor();
}

function diagnosticFromText(text: string, fileName?: string): Diagnostic {
  return {
    message: {
      key: "TSTS_Include_Diagnostic",
      code: 0,
      category: DiagnosticCategory.Error,
      message: text,
    },
    ...(fileName === undefined ? {} : { file: { fileName, text: "" } }),
    category: DiagnosticCategory.Error,
    code: 0,
    text,
  };
}
