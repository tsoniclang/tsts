/**
 * FileIncludeReason data.
 *
 * Substantive port of TS-Go `internal/compiler/fileInclude.go` (~319 LoC).
 * Tracks why each source file is in the compilation: root input, /// ref,
 * import resolution, lib reference, typeRoots, automaticTypeDirective.
 */

import type { Node as AstNode, FileReference, Diagnostic, SourceFile } from "../ast/index.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";

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
  file?: SourceFile;
  node?: AstNode;
  ref?: FileReference;
  packageId?: string;
  isSynthetic?: boolean;
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
  if (!fileIncludeIsReferencedFile(reason)) return undefined;
  const ref = fileIncludeAsReferencedFileData(reason);
  const file = ref?.file ?? getProgramSourceFile(program, reason.referencingFile ?? reason.fileName ?? "");
  if (file === undefined) return undefined;

  switch (reason.kind) {
    case FileIncludeKind.Import: {
      const specifier = ref !== undefined ? importSpecifierAt(file, ref.index) : undefined;
      const synthetic = (ref as unknown as { synthetic?: AstNode } | undefined)?.synthetic;
      const node = synthetic ?? specifier;
      const resolved = node === undefined ? undefined : program.getResolvedModuleFromModuleSpecifier?.(file, node);
      const location: ReferenceFileLocation = {
        fileName: file.fileName,
        text: referenceText(file, node, undefined),
        position: node?.pos ?? 0,
        length: node === undefined ? 0 : Math.max(0, node.end - node.pos),
        file,
        packageId: packageIdString(resolved),
        isSynthetic: synthetic !== undefined,
      };
      if (node !== undefined) location.node = node;
      return location;
    }
    case FileIncludeKind.ReferenceFile:
      return referenceFileLocation(file, file.referencedFiles[ref?.index ?? reason.index ?? 0]);
    case FileIncludeKind.TypeReferenceDirective:
      return referenceFileLocation(file, file.typeReferenceDirectives[ref?.index ?? reason.index ?? 0]);
    case FileIncludeKind.LibReferenceDirective:
      return referenceFileLocation(file, file.libReferenceDirectives[ref?.index ?? reason.index ?? 0]);
    default:
      return undefined;
  }
}

export function toDiagnostic(reason: FileIncludeReason, program: Program, relativeFileName: boolean): Diagnostic {
  return computeDiagnostic(reason, program, relativeFileName ? toRelativeName : toAbsoluteName);
}

export function computeDiagnostic(
  reason: FileIncludeReason, program: Program, toFileName: (s: string) => string,
): Diagnostic {
  if (fileIncludeIsReferencedFile(reason)) return computeReferenceFileDiagnostic(reason, program, toFileName);
  switch (reason.kind) {
    case FileIncludeKind.RootFile:
      return compilerDiagnostic(Diagnostics.Root_file_specified_for_compilation);
    case FileIncludeKind.AutomaticTypeDirectiveFile: {
      const data = fileIncludeAsAutomaticTypeDirectiveFileData(reason);
      const typeReference = data?.typeReference ?? reason.fileName ?? "";
      const packageId = data?.packageId ?? reason.packageId ?? "";
      const options = program.options?.();
      const usesWildcardTypes = (options as unknown as { usesWildcardTypes?: () => boolean; UsesWildcardTypes?: () => boolean } | undefined)?.usesWildcardTypes?.()
        ?? (options as unknown as { UsesWildcardTypes?: () => boolean } | undefined)?.UsesWildcardTypes?.()
        ?? false;
      if (!usesWildcardTypes) {
        return packageId !== ""
          ? compilerDiagnostic(Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1, typeReference, packageId)
          : compilerDiagnostic(Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions, typeReference);
      }
      return packageId !== ""
        ? compilerDiagnostic(Diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1, typeReference, packageId)
        : compilerDiagnostic(Diagnostics.Entry_point_for_implicit_type_library_0, typeReference);
    }
    case FileIncludeKind.LibFile: {
      const { index, ok } = fileIncludeAsLibFileIndex(reason);
      const options = program.options?.();
      const lib = (options as unknown as { lib?: readonly string[]; Lib?: readonly string[] } | undefined)?.lib
        ?? (options as unknown as { Lib?: readonly string[] } | undefined)?.Lib
        ?? [];
      if (ok && lib[index] !== undefined) {
        return compilerDiagnostic(Diagnostics.Library_0_specified_in_compilerOptions, lib[index]);
      }
      const target = emitScriptTargetName(options);
      return target !== ""
        ? compilerDiagnostic(Diagnostics.Default_library_for_target_0, target)
        : compilerDiagnostic(Diagnostics.Default_library);
    }
    case FileIncludeKind.SourceFromProjectReference:
      return compilerDiagnostic({ code: 0, category: 1, message: "Source from project reference '{0}'." }, toFileName(reason.fileName ?? ""));
    case FileIncludeKind.OutputFromProjectReference:
      return compilerDiagnostic({ code: 0, category: 1, message: "Output from project reference '{0}'." }, toFileName(reason.fileName ?? ""));
    default:
      return compilerDiagnostic({ code: 0, category: 1, message: "Unknown file include reason." });
  }
}

export function computeReferenceFileDiagnostic(
  reason: FileIncludeReason, program: Program, toFileName: (s: string) => string,
): Diagnostic {
  const loc = getReferencedLocation(reason, program);
  const referenceTextValue = loc === undefined ? reason.fileName ?? "" : referenceLocationText(loc);
  const containingFile = loc?.fileName ?? reason.referencingFile ?? "";
  const packageId = loc?.packageId ?? reason.packageId ?? "";
  switch (reason.kind) {
    case FileIncludeKind.Import:
      if (packageId !== "") {
        return compilerDiagnostic(Diagnostics.Imported_via_0_from_file_1_with_packageId_2, referenceTextValue, toFileName(containingFile), packageId);
      }
      return compilerDiagnostic(Diagnostics.Imported_via_0_from_file_1, referenceTextValue, toFileName(containingFile));
    case FileIncludeKind.ReferenceFile:
      return compilerDiagnostic(Diagnostics.Referenced_via_0_from_file_1, referenceTextValue, toFileName(containingFile));
    case FileIncludeKind.TypeReferenceDirective:
      if (packageId !== "") {
        return compilerDiagnostic(Diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2, referenceTextValue, toFileName(containingFile), packageId);
      }
      return compilerDiagnostic(Diagnostics.Type_library_referenced_via_0_from_file_1, referenceTextValue, toFileName(containingFile));
    case FileIncludeKind.LibReferenceDirective:
      return compilerDiagnostic(Diagnostics.Library_referenced_via_0_from_file_1, referenceTextValue, toFileName(containingFile));
    default:
      return compilerDiagnostic({ code: 0, category: 1, message: "Unknown reference file include reason." });
  }
}

export function toRelatedInfo(reason: FileIncludeReason, program: Program): Diagnostic | undefined {
  if (fileIncludeIsReferencedFile(reason)) return computeReferenceFileRelatedInfo(reason, program);
  void program;
  return undefined;
}

export function computeReferenceFileRelatedInfo(reason: FileIncludeReason, program: Program): Diagnostic | undefined {
  const loc = getReferencedLocation(reason, program);
  if (loc === undefined || loc.isSynthetic === true) return undefined;
  switch (reason.kind) {
    case FileIncludeKind.Import:
      return referenceLocationDiagnosticAt(loc, Diagnostics.File_is_included_via_import_here);
    case FileIncludeKind.ReferenceFile:
      return referenceLocationDiagnosticAt(loc, Diagnostics.File_is_included_via_reference_here);
    case FileIncludeKind.TypeReferenceDirective:
      return referenceLocationDiagnosticAt(loc, Diagnostics.File_is_included_via_type_library_reference_here);
    case FileIncludeKind.LibReferenceDirective:
      return referenceLocationDiagnosticAt(loc, Diagnostics.File_is_included_via_library_reference_here);
    default:
      return undefined;
  }
}

function toRelativeName(name: string): string { return name; }
function toAbsoluteName(name: string): string { return name; }

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface Program {
  readonly _p?: unknown;
  getSourceFile?(fileName: string): SourceFile | undefined;
  getSourceFileByPath?(path: string): SourceFile | undefined;
  getResolvedModuleFromModuleSpecifier?(file: SourceFile, moduleSpecifier: AstNode): unknown;
  getCurrentDirectory?(): string;
  options?(): unknown;
}
export type _Ast = AstNode;

function getProgramSourceFile(program: Program, fileName: string): SourceFile | undefined {
  if (fileName === "") return undefined;
  return program.getSourceFile?.(fileName) ?? program.getSourceFileByPath?.(fileName);
}

function importSpecifierAt(file: SourceFile, index: number): AstNode | undefined {
  if (index < file.imports.length) return file.imports[index];
  let current = file.imports.length;
  for (const augmentation of file.moduleAugmentations) {
    if (augmentation.kind === 16 /* StringLiteral */) {
      if (current === index) return augmentation;
      current += 1;
    }
  }
  return undefined;
}

function referenceFileLocation(file: SourceFile, ref: FileReference | undefined): ReferenceFileLocation | undefined {
  if (ref === undefined) return undefined;
  return {
    fileName: file.fileName,
    text: referenceText(file, undefined, ref),
    position: ref.pos,
    length: Math.max(0, ref.end - ref.pos),
    file,
    ref,
  };
}

function referenceText(file: SourceFile, node: AstNode | undefined, ref: FileReference | undefined): string {
  if (node !== undefined) {
    const text = (node as unknown as { text?: string }).text;
    if (text !== undefined) return JSON.stringify(text);
    return file.text.slice(node.pos, node.end);
  }
  if (ref !== undefined) return file.text.slice(ref.pos, ref.end);
  return "";
}

function packageIdString(resolved: unknown): string {
  const packageId = (resolved as { packageId?: unknown; PackageId?: unknown } | undefined)?.packageId
    ?? (resolved as { PackageId?: unknown } | undefined)?.PackageId;
  if (packageId === undefined || packageId === null) return "";
  if (typeof packageId === "string") return packageId;
  const stringer = packageId as { toString?: () => string; String?: () => string; name?: string; Name?: string };
  if (typeof stringer.String === "function") return stringer.String();
  if (typeof stringer.toString === "function" && stringer.toString !== Object.prototype.toString) return stringer.toString();
  return stringer.name ?? stringer.Name ?? "";
}

function emitScriptTargetName(options: unknown): string {
  const target = (options as { target?: unknown; Target?: unknown; getEmitScriptTarget?: () => unknown; GetEmitScriptTarget?: () => unknown } | undefined)?.getEmitScriptTarget?.()
    ?? (options as { GetEmitScriptTarget?: () => unknown } | undefined)?.GetEmitScriptTarget?.()
    ?? (options as { target?: unknown; Target?: unknown } | undefined)?.target
    ?? (options as { Target?: unknown } | undefined)?.Target;
  if (target === undefined || target === null) return "";
  return typeof target === "string" ? target : String(target);
}

function compilerDiagnostic(message: { code?: number; category?: number; message?: string }, ...args: unknown[]): Diagnostic {
  return {
    file: undefined,
    start: 0,
    length: 0,
    messageText: formatMessage(message.message ?? "diagnostic", args),
    category: message.category ?? 1,
    code: message.code ?? 0,
    args,
  } as unknown as Diagnostic;
}

function formatMessage(text: string, args: readonly unknown[]): string {
  return text.replace(/\{(\d+)\}/g, (_match, index) => {
    const value = args[Number(index)];
    return value === undefined ? `{${index}}` : String(value);
  });
}
