/**
 * Emit host wrapper.
 *
 * Port of TS-Go `internal/compiler/emitHost.go` (~138 LoC). Bridges the
 * Program to the printer's EmitHost interface.
 */

import type { Node as AstNode, FileReference, SourceFile } from "../ast/index.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import type { Program } from "./program.js";

export interface EmitHost {
  getSourceFile(fileName: string): SourceFile | undefined;
  getCompilerOptions(): CompilerOptions;
  options(): CompilerOptions;
  getCurrentDirectory(): string;
  commonSourceDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void;
  getNewLine(): string;
  getCanonicalFileName(fileName: string): string;
  isEmitBlocked(emitFileName: string): boolean;
  getSourceFiles(): readonly SourceFile[];
  sourceFiles(): readonly SourceFile[];
  isSourceOfProjectReferenceRedirect(fileName: string): boolean;
  fileExists(path: string): boolean;
  getGlobalTypingsCacheLocation(): string;
  getNearestAncestorDirectoryWithPackageJson(dirname: string): string;
  getPackageJsonInfo(pkgJsonPath: string): unknown;
  getSourceOfProjectReferenceIfOutputIncluded(file: SourceFile): string;
  getProjectReferenceFromSource(path: string): unknown;
  getRedirectTargets(path: string): readonly string[];
  getModeForUsageLocation(file: SourceFile, moduleSpecifier: AstNode | undefined): number;
  getResolvedModuleFromModuleSpecifier(file: SourceFile, moduleSpecifier: AstNode): unknown;
  getDefaultResolutionModeForFile(file: SourceFile): number;
  getEmitModuleFormatOfFile(file: SourceFile): number;
  getSourceFileFromReference(origin: SourceFile, ref: FileReference): SourceFile | undefined;
  isSourceFileFromExternalLibrary(file: SourceFile): boolean;
  resolveModuleName(moduleName: string, containingFile: string, resolutionMode: number): unknown;
}

export class ProgramEmitHost implements EmitHost {
  readonly program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getSourceFile(fileName: string): SourceFile | undefined {
    return this.program.getSourceFile(fileName) ?? this.program.sourceFiles().find((f) => (f as unknown as { fileName: string }).fileName === fileName);
  }
  getCompilerOptions(): CompilerOptions { return this.program.options(); }
  options(): CompilerOptions { return this.program.options(); }
  getCurrentDirectory(): string { return this.program.getCurrentDirectory(); }
  commonSourceDirectory(): string { return this.program.commonSourceDirectory(); }
  useCaseSensitiveFileNames(): boolean { return this.program.useCaseSensitiveFileNames(); }
  writeFile(fileName: string, data: string, writeByteOrderMark = false): void {
    const host = this.program.host();
    host.writeFile?.(fileName, data, writeByteOrderMark);
  }
  getNewLine(): string { return "\n"; }
  getCanonicalFileName(fileName: string): string {
    return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase();
  }
  isEmitBlocked(emitFileName: string): boolean { return this.program.isEmitBlocked(emitFileName); }
  getSourceFiles(): readonly SourceFile[] { return this.program.sourceFiles(); }
  sourceFiles(): readonly SourceFile[] { return this.program.sourceFiles(); }
  isSourceOfProjectReferenceRedirect(fileName: string): boolean {
    return this.program.isSourceFromProjectReference(fileName);
  }
  fileExists(path: string): boolean { return this.program.fileExists(path); }
  getGlobalTypingsCacheLocation(): string { return this.program.getGlobalTypingsCacheLocation(); }
  getNearestAncestorDirectoryWithPackageJson(dirname: string): string {
    return this.program.getNearestAncestorDirectoryWithPackageJson(dirname);
  }
  getPackageJsonInfo(pkgJsonPath: string): unknown { return this.program.getPackageJsonInfo(pkgJsonPath); }
  getSourceOfProjectReferenceIfOutputIncluded(file: SourceFile): string {
    return this.program.getSourceOfProjectReferenceIfOutputIncluded(file);
  }
  getProjectReferenceFromSource(path: string): unknown { return this.program.getProjectReferenceFromSource(path); }
  getRedirectTargets(path: string): readonly string[] { return this.program.getRedirectTargets(path); }
  getModeForUsageLocation(file: SourceFile, moduleSpecifier: AstNode | undefined): number {
    return this.program.getModeForUsageLocation(file, moduleSpecifier);
  }
  getResolvedModuleFromModuleSpecifier(file: SourceFile, moduleSpecifier: AstNode): unknown {
    return this.program.getResolvedModuleFromModuleSpecifier(file, moduleSpecifier);
  }
  getDefaultResolutionModeForFile(file: SourceFile): number {
    return this.program.getModeForUsageLocation(file, undefined);
  }
  getEmitModuleFormatOfFile(file: SourceFile): number {
    return this.program.getModeForUsageLocation(file, undefined);
  }
  getSourceFileFromReference(origin: SourceFile, ref: FileReference): SourceFile | undefined {
    return this.program.getSourceFileFromReference(origin, ref);
  }
  isSourceFileFromExternalLibrary(file: SourceFile): boolean {
    const fileName = (file as { readonly fileName?: string }).fileName ?? "";
    return fileName.includes("/node_modules/") || fileName.includes("\\node_modules\\");
  }
  resolveModuleName(moduleName: string, containingFile: string, resolutionMode: number): unknown {
    const file = this.program.getSourceFile(containingFile);
    if (file === undefined) return undefined;
    return this.program.getResolvedModule(file, moduleName, resolutionMode);
  }
}

export function newProgramEmitHost(program: Program): ProgramEmitHost {
  return new ProgramEmitHost(program);
}
