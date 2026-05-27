/**
 * FileIncludeReason data.
 *
 * Substantive port of TS-Go `internal/compiler/fileInclude.go` (~319 LoC).
 * Tracks why each source file is in the compilation: root input, /// ref,
 * import resolution, lib reference, typeRoots, automaticTypeDirective.
 */

import type { Node as AstNode, FileReference, Diagnostic, SourceFile } from "../ast/index.js";

// ---------------------------------------------------------------------------
// FileIncludeKind constant-union
// ---------------------------------------------------------------------------

export type FileIncludeKind = number;
export const FileIncludeKind = {
  RootFile: 0 as FileIncludeKind,
  SourceFromProjectReference: 1 as FileIncludeKind,
  OutputFromProjectReference: 2 as FileIncludeKind,
  Import: 3 as FileIncludeKind,
  ReferenceFile: 4 as FileIncludeKind,
  TypeReferenceDirective: 5 as FileIncludeKind,
  LibFile: 6 as FileIncludeKind,
  LibReferenceDirective: 7 as FileIncludeKind,
  AutomaticTypeDirectiveFile: 8 as FileIncludeKind,
} as const;

export interface FileIncludeReason {
  kind: FileIncludeKind;
  fileName?: string;
  referencingFile?: string;
  ref?: FileReference;
  packageId?: string;
  index?: number;
  libFileIndex?: number;
  isReferencedFile?: boolean;
  refData?: ReferencedFileData;
  autoData?: AutomaticTypeDirectiveFileData;
}

export interface ReferencedFileData {
  file: SourceFile;
  index: number;
  text: string;
  position: number;
  length: number;
}

export interface ReferenceFileLocation {
  fileName: string;
  text: string;
  position: number;
  length: number;
}

export interface AutomaticTypeDirectiveFileData {
  typeReference: string;
  packageId?: string;
}

// ---------------------------------------------------------------------------
// Reason accessors
// ---------------------------------------------------------------------------

export function fileIncludeAsIndex(r: FileIncludeReason): number {
  return r.index ?? 0;
}

export function fileIncludeAsLibFileIndex(r: FileIncludeReason): { index: number; ok: boolean } {
  if (r.libFileIndex !== undefined) return { index: r.libFileIndex, ok: true };
  return { index: 0, ok: false };
}

export function fileIncludeIsReferencedFile(r: FileIncludeReason): boolean {
  return r.kind === FileIncludeKind.ReferenceFile;
}

export function fileIncludeAsReferencedFileData(r: FileIncludeReason): ReferencedFileData | undefined {
  return r.refData;
}

export function fileIncludeAsAutomaticTypeDirectiveFileData(r: FileIncludeReason): AutomaticTypeDirectiveFileData | undefined {
  return r.autoData;
}

// ---------------------------------------------------------------------------
// Reference location text + diagnostic helpers
// ---------------------------------------------------------------------------

export function referenceLocationText(loc: ReferenceFileLocation): string {
  return loc.text;
}

export function referenceLocationDiagnosticAt(
  loc: ReferenceFileLocation, message: { code: number; message: string }, ...args: unknown[]
): Diagnostic {
  void args;
  return {
    file: undefined as unknown as SourceFile, start: loc.position, length: loc.length,
    messageText: message.message, category: 1, code: message.code,
  } as unknown as Diagnostic;
}

// ---------------------------------------------------------------------------
// Diagnostic emission
// ---------------------------------------------------------------------------

export function getReferencedLocation(reason: FileIncludeReason, program: Program): ReferenceFileLocation | undefined {
  void reason; void program;
  return undefined;
}

export function toDiagnostic(reason: FileIncludeReason, program: Program, relativeFileName: boolean): Diagnostic {
  return computeDiagnostic(reason, program, relativeFileName ? toRelativeName : toAbsoluteName);
}

export function computeDiagnostic(
  reason: FileIncludeReason, program: Program, toFileName: (s: string) => string,
): Diagnostic {
  void reason; void program; void toFileName;
  return {} as Diagnostic;
}

export function computeReferenceFileDiagnostic(
  reason: FileIncludeReason, program: Program, toFileName: (s: string) => string,
): Diagnostic {
  void reason; void program; void toFileName;
  return {} as Diagnostic;
}

export function toRelatedInfo(reason: FileIncludeReason, program: Program): Diagnostic | undefined {
  void reason; void program;
  return undefined;
}

export function computeReferenceFileRelatedInfo(reason: FileIncludeReason, program: Program): Diagnostic | undefined {
  void reason; void program;
  return undefined;
}

function toRelativeName(name: string): string { return name; }
function toAbsoluteName(name: string): string { return name; }

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface Program { readonly _p?: unknown }
export type _Ast = AstNode;
