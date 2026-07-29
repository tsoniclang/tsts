import type { GoPtr } from "../go/compat.js";
import type { Context } from "../go/context.js";
import type { SourceFile } from "../internal/ast/ast.js";
import type { Diagnostic } from "../internal/ast/diagnostic.js";
import {
  Program_GetSourceFile,
  Program_GetSourceFiles,
  type Program,
} from "../internal/compiler/program.js";
import { createAstReader, type AstReader } from "../services/ast-reader.js";
import { createTypeCheckerQueries, type TypeCheckerQueries } from "../services/type-checker.js";
import { createTypeShapeQueries, type TypeShapeQueries } from "../services/type-shape.js";
import type { ExtensionDiagnostic } from "./host.js";
import type { ReadonlySourceFactResolver } from "./consumer.js";

export interface SourceFileQueries {
  readonly sourceFile: SourceFile;
  readonly ast: AstReader;
  readonly checker: TypeCheckerQueries;
  readonly typeShape: TypeShapeQueries;
}

export interface SourceProgramQueries {
  readonly ast: AstReader;
  readonly checker: TypeCheckerQueries;
  readonly typeShape: TypeShapeQueries;
  readonly getSourceFiles: () => readonly GoPtr<SourceFile>[];
  readonly getSourceFile: (fileName: string) => GoPtr<SourceFile>;
  readonly getSourceFileQueries: (sourceFile: GoPtr<SourceFile>) => SourceFileQueries;
}

export interface CheckedSourceProgram extends SourceProgramQueries {
  readonly program: Program;
  readonly sourceFiles: readonly GoPtr<SourceFile>[];
  readonly sourceFacts: ReadonlySourceFactResolver;
  readonly diagnostics: readonly GoPtr<Diagnostic>[];
  readonly extensionDiagnostics: readonly ExtensionDiagnostic[];
}

export interface CreateSourceProgramQueriesOptions {
  readonly context?: Context;
  readonly includeSourceFile?: (sourceFile: SourceFile) => boolean;
  readonly ast?: AstReader;
  readonly checker?: TypeCheckerQueries;
  readonly typeShape?: TypeShapeQueries;
}

export function createSourceProgramQueries(
  program: GoPtr<Program>,
  options: CreateSourceProgramQueriesOptions = {},
): SourceProgramQueries {
  if (program === undefined) {
    throw new Error("Source program queries require a compiler program.");
  }
  const ast = options.ast ?? createAstReader();
  const checker = options.checker ?? createTypeCheckerQueries(program, {
    ...(options.context === undefined ? {} : { context: options.context }),
  });
  const typeShape = options.typeShape ?? createTypeShapeQueries(program, {
    ...(options.context === undefined ? {} : { context: options.context }),
  });
  const sourceFileQueries = new WeakMap<SourceFile, SourceFileQueries>();
  const included = (sourceFile: SourceFile): boolean => options.includeSourceFile?.(sourceFile) !== false;
  const getSourceFiles = (): readonly GoPtr<SourceFile>[] =>
    (Program_GetSourceFiles(program) ?? []).filter((sourceFile) =>
      sourceFile !== undefined && included(sourceFile));
  const getSourceFile = (fileName: string): GoPtr<SourceFile> => {
    const sourceFile = Program_GetSourceFile(program, fileName);
    return sourceFile !== undefined && included(sourceFile)
      ? sourceFile
      : undefined;
  };
  const getSourceFileQueries = (sourceFile: GoPtr<SourceFile>): SourceFileQueries => {
    if (sourceFile === undefined || !included(sourceFile)) {
      throw new Error("Source-file queries require an included source file from the checked program.");
    }
    const existing = sourceFileQueries.get(sourceFile);
    if (existing !== undefined) {
      return existing;
    }
    const created = Object.freeze({
      sourceFile,
      ast,
      checker,
      typeShape,
    });
    sourceFileQueries.set(sourceFile, created);
    return created;
  };
  return Object.freeze({
    ast,
    checker,
    typeShape,
    getSourceFiles,
    getSourceFile,
    getSourceFileQueries,
  });
}
