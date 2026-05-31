import { computeHash, createProgramSnapshot, type FileInfo, type ProgramSnapshot, type SnapshotFileEmitKind } from "./snapshot.js";
import type { IncrementalProgram } from "./program.js";

export interface ProgramToSnapshotSourceFile {
  readonly path: string;
  readonly text: string;
  readonly affectsGlobalScope?: boolean;
  readonly impliedNodeFormat?: string;
}

export interface ProgramToSnapshotOptions {
  readonly version: string;
  readonly hashWithText: boolean;
  readonly sourceFiles: readonly ProgramToSnapshotSourceFile[];
  readonly root: readonly string[];
  readonly options: unknown;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
}

export function fileInfoFromText(sourceFile: ProgramToSnapshotSourceFile, hashWithText: boolean): FileInfo {
  return {
    version: computeHash(sourceFile.text, hashWithText),
    signature: computeHash(sourceFile.text, hashWithText),
    affectsGlobalScope: sourceFile.affectsGlobalScope === true,
    impliedNodeFormat: sourceFile.impliedNodeFormat,
  };
}

export function programToSnapshot<Diagnostic>(
  program: IncrementalProgram<Diagnostic> | undefined,
  options: ProgramToSnapshotOptions,
): ProgramSnapshot<Diagnostic> {
  const fileInfos = new Map<string, FileInfo>();
  for (const sourceFile of options.sourceFiles) {
    fileInfos.set(sourceFile.path, fileInfoFromText(sourceFile, options.hashWithText));
  }
  return createProgramSnapshot({
    version: options.version,
    fileInfos,
    options: options.options,
    root: options.root,
    semanticDiagnosticsPerFile: new Map(),
    emitDiagnosticsPerFile: new Map(),
    pendingEmit: new Map(options.pendingEmit),
    latestChangedDtsFile: program?.hasChangedDtsFile() === true ? program.changedFiles().find((file) => file.endsWith(".d.ts")) : undefined,
    errors: [],
    checkPending: false,
  });
}
