/**
 * FileIncludeReason data.
 *
 * Substantive port of TS-Go `internal/compiler/fileInclude.go` (~319 LoC).
 * Tracks why each source file is in the compilation: root input, /// ref,
 * import resolution, lib reference, typeRoots, automaticTypeDirective.
 */

import type { Node as AstNode, FileReference, Diagnostic, SourceFile } from "../ast/index.js";
import { nodeIsSynthesized, nodeText } from "../ast/index.js";
import { skipTrivia } from "../scanner/index.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";

// ---------------------------------------------------------------------------
// fileIncludeKind enum
// ---------------------------------------------------------------------------

// 1:1 port of TS-Go `internal/compiler/fileInclude.go`:
//   type fileIncludeKind int
//   const (
//     // References from file
//     fileIncludeKindImport = iota
//     fileIncludeKindReferenceFile
//     fileIncludeKindTypeReferenceDirective
//     fileIncludeKindLibReferenceDirective
//
//     fileIncludeKindRootFile
//     fileIncludeKindLibFile
//     fileIncludeKindAutomaticTypeDirectiveFile
//   )
// The first four kinds are "referenced from file" (see isReferencedFile,
// which tests kind <= LibReferenceDirective); the iota order is load-bearing.
// TS-convention member names strip the `fileIncludeKind` prefix.
export const enum FileIncludeKind {
  Import = 0,
  ReferenceFile = 1,
  TypeReferenceDirective = 2,
  LibReferenceDirective = 3,
  RootFile = 4,
  LibFile = 5,
  AutomaticTypeDirectiveFile = 6,
}

export interface FileIncludeReason {
  kind: FileIncludeKind;
  fileName?: string;
  referencingFile?: string;
  ref?: FileReference;
  // Carries the resolution `module.PackageId` (or its already-stringified
  // form) for import / type-reference reasons; stringified on read via
  // packageIdString. Upstream keeps this inside the kind-specific data struct;
  // TSTS flattens it onto the reason.
  packageId?: PackageIdLike | string;
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
  // Port of TS-Go `referencedFileData.synthetic *ast.Node`: a synthesized
  // module specifier (importHelpers / jsx-factory) when there is no
  // source-text import node at `index`.
  synthetic?: AstNode;
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
  return r.kind <= FileIncludeKind.LibReferenceDirective;
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
  loc: ReferenceFileLocation, message: DiagnosticMessage, ...args: unknown[]
): Diagnostic {
  return {
    message,
    ...(loc.file === undefined ? {} : { file: { fileName: loc.file.fileName, text: loc.file.text } }),
    start: loc.position,
    length: loc.length,
    category: message.category,
    code: message.code,
    text: formatMessage(message.message, args),
  };
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
      const synthetic = ref?.synthetic;
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
      const packageId = data?.packageId ?? packageIdText(reason.packageId);
      const options = program.options?.();
      const usesWildcardTypes = options?.usesWildcardTypes?.() ?? false;
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
      const lib = options?.lib ?? [];
      if (ok && lib[index] !== undefined) {
        return compilerDiagnostic(Diagnostics.Library_0_specified_in_compilerOptions, lib[index]);
      }
      const target = emitScriptTargetName(options);
      return target !== ""
        ? compilerDiagnostic(Diagnostics.Default_library_for_target_0, target)
        : compilerDiagnostic(Diagnostics.Default_library);
    }
    default:
      // Mirrors upstream `panic(fmt.Sprintf("unknown reason: %v", r.kind))`.
      throw new Error(`unknown reason: ${reason.kind}`);
  }
}

export function computeReferenceFileDiagnostic(
  reason: FileIncludeReason, program: Program, toFileName: (s: string) => string,
): Diagnostic {
  const loc = getReferencedLocation(reason, program);
  const referenceTextValue = loc === undefined ? reason.fileName ?? "" : referenceLocationText(loc);
  const containingFile = loc?.fileName ?? reason.referencingFile ?? "";
  const packageId = loc?.packageId ?? packageIdText(reason.packageId);
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
      // Mirrors upstream `panic(fmt.Sprintf("unknown reason: %v", r.kind))`.
      throw new Error(`unknown reason: ${reason.kind}`);
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

// Forward-declared subset of the compiler Program surface that
// FileIncludeReason diagnostics read. Each accessor is properly typed so the
// switch bodies below need no `as`-casts.
interface CompilerOptionsLike {
  usesWildcardTypes?(): boolean;
  lib?: readonly string[];
  getEmitScriptTarget?(): unknown;
  target?: unknown;
}
interface ResolvedModuleLike {
  packageId?: PackageIdLike;
  resolvedFileName?: string;
  isExternalLibraryImport?: boolean;
}
interface PackageIdLike {
  name?: string;
  toString?(): string;
}
interface Program {
  readonly _p?: unknown;
  getSourceFile?(fileName: string): SourceFile | undefined;
  getSourceFileByPath?(path: string): SourceFile | undefined;
  getResolvedModuleFromModuleSpecifier?(file: SourceFile, moduleSpecifier: AstNode): ResolvedModuleLike | undefined;
  getCurrentDirectory?(): string;
  options?(): CompilerOptionsLike | undefined;
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

// 1:1 port of TS-Go `(*referenceFileLocation).text()`. A real source-text node
// yields the trivia-skipped source slice; a synthesized node yields its quoted
// text; otherwise the file-reference range slice.
function referenceText(file: SourceFile, node: AstNode | undefined, ref: FileReference | undefined): string {
  if (node !== undefined) {
    if (!nodeIsSynthesized(node)) {
      return file.text.slice(skipTrivia(file.text, node.pos), node.end);
    }
    return `"${nodeText(node)}"`;
  }
  if (ref !== undefined) return file.text.slice(ref.pos, ref.end);
  return "";
}

function packageIdString(resolved: ResolvedModuleLike | undefined): string {
  return packageIdValueString(resolved?.packageId);
}

// Stringify a flattened `FileIncludeReason.packageId` (a module.PackageId-like
// struct or an already-stringified name), matching upstream `PackageId.String()`.
function packageIdText(value: PackageIdLike | string | undefined): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return packageIdValueString(value);
}

function packageIdValueString(packageId: PackageIdLike | undefined): string {
  if (packageId === undefined) return "";
  if (typeof packageId.toString === "function" && packageId.toString !== Object.prototype.toString) {
    return packageId.toString();
  }
  return packageId.name ?? "";
}

function emitScriptTargetName(options: CompilerOptionsLike | undefined): string {
  const target = options?.getEmitScriptTarget?.() ?? options?.target;
  if (target === undefined || target === null) return "";
  return typeof target === "string" ? target : String(target);
}

function compilerDiagnostic(message: DiagnosticMessage, ...args: unknown[]): Diagnostic {
  return {
    message,
    category: message.category,
    code: message.code,
    text: formatMessage(message.message, args),
  };
}

function formatMessage(text: string, args: readonly unknown[]): string {
  return text.replace(/\{(\d+)\}/g, (_match, index) => {
    const value = args[Number(index)];
    return value === undefined ? `{${index}}` : String(value);
  });
}
