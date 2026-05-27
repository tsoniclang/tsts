/**
 * Emit host wrapper.
 *
 * Port of TS-Go `internal/compiler/emitHost.go` (~138 LoC). Bridges the
 * Program to the printer's EmitHost interface.
 */

import type { SourceFile } from "../ast/index.js";
import type { Program } from "./program.js";

export interface EmitHost {
  getSourceFile(fileName: string): SourceFile | undefined;
  getCompilerOptions(): unknown;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  writeFile(fileName: string, data: string, writeByteOrderMark: boolean): void;
  getNewLine(): string;
  getCanonicalFileName(fileName: string): string;
  isEmitBlocked(emitFileName: string): boolean;
  getSourceFiles(): readonly SourceFile[];
  isSourceOfProjectReferenceRedirect(fileName: string): boolean;
}

export class ProgramEmitHost implements EmitHost {
  readonly program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getSourceFile(fileName: string): SourceFile | undefined {
    return this.program.sourceFiles().find((f) => (f as unknown as { fileName: string }).fileName === fileName);
  }
  getCompilerOptions(): unknown { return this.program.options(); }
  getCurrentDirectory(): string { return this.program.getCurrentDirectory(); }
  useCaseSensitiveFileNames(): boolean { return this.program.useCaseSensitiveFileNames(); }
  writeFile(fileName: string, data: string, writeByteOrderMark: boolean): void {
    const host = this.program.host();
    host.writeFile?.(fileName, data, writeByteOrderMark);
  }
  getNewLine(): string { return "\n"; }
  getCanonicalFileName(fileName: string): string {
    return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase();
  }
  isEmitBlocked(emitFileName: string): boolean { void emitFileName; return false; }
  getSourceFiles(): readonly SourceFile[] { return this.program.sourceFiles(); }
  isSourceOfProjectReferenceRedirect(fileName: string): boolean {
    return this.program.isSourceFromProjectReference(fileName);
  }
}

export function newProgramEmitHost(program: Program): ProgramEmitHost {
  return new ProgramEmitHost(program);
}
