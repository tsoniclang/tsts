import { checkSourceFile } from "../checker/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";

export interface CheckerPoolOptions {
  readonly maxWorkers?: number;
}

export class CheckerPool {
  readonly options: CheckerPoolOptions;
  private readonly globalDiagnostics: ProgramDiagnostic[] = [];

  constructor(options: CheckerPoolOptions = {}) {
    this.options = options;
  }

  checkProgram(program: Program): readonly ProgramDiagnostic[] {
    const diagnostics: ProgramDiagnostic[] = [];
    for (const sourceFile of program.sourceFiles) {
      const result = checkSourceFile(sourceFile.sourceFile);
      diagnostics.push(...result.diagnostics.map(diagnostic => ({
        fileName: sourceFile.fileName,
        message: diagnostic.message,
      })));
    }
    this.globalDiagnostics.length = 0;
    this.globalDiagnostics.push(...diagnostics);
    return diagnostics;
  }

  getGlobalDiagnostics(): readonly ProgramDiagnostic[] {
    return this.globalDiagnostics;
  }

  close(): void {
    this.globalDiagnostics.length = 0;
  }
}

export function newCheckerPool(options?: CheckerPoolOptions): CheckerPool {
  return new CheckerPool(options);
}
