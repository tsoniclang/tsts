import {
  computeHash,
  createProgramSnapshotFromParts,
  type DiagnosticsOrBuildInfoDiagnosticsWithFileName,
  type ProgramSnapshotFileInfo,
  type ProgramSnapshot,
  type SnapshotFileEmitKind,
} from "./snapshot.js";
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
  readonly options: ReadonlyMap<string, unknown>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
}

export function fileInfoFromText(sourceFile: ProgramToSnapshotSourceFile, hashWithText: boolean): ProgramSnapshotFileInfo {
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
  const fileInfos = new Map<string, ProgramSnapshotFileInfo>();
  for (const sourceFile of options.sourceFiles) {
    fileInfos.set(sourceFile.path, fileInfoFromText(sourceFile, options.hashWithText));
  }
  return createProgramSnapshotFromParts(
    options.version,
    fileInfos,
    options.options,
    options.root,
    new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
    new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
    new Map(options.pendingEmit),
    program?.hasChangedDtsFile() === true ? program.changedFiles().find((file: string): boolean => file.endsWith(".d.ts")) : undefined,
    [],
    false,
  );
}
