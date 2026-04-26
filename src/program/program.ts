import { extname, join, relative } from "node:path";
import { bindSourceFile, type BindDiagnostic, type BindResult } from "../binder/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { parseSourceFile } from "../parser/index.js";
import type { SourceFile } from "../ast/index.js";

export interface CompilerOptions {
  readonly outDir?: string;
}

export interface CompilerHost {
  readFile(fileName: string): string | undefined;
  writeFile?(fileName: string, text: string): void;
  getCurrentDirectory?(): string;
  useCaseSensitiveFileNames?(): boolean;
}

export interface ProgramSourceFile {
  readonly fileName: string;
  readonly sourceText: string;
  readonly sourceFile: SourceFile;
  readonly bindResult: BindResult;
}

export interface ProgramDiagnostic {
  readonly fileName: string;
  readonly message: string;
}

export interface Program {
  readonly rootNames: readonly string[];
  readonly options: CompilerOptions;
  readonly sourceFiles: readonly ProgramSourceFile[];
  readonly diagnostics: readonly ProgramDiagnostic[];
}

export interface EmitOutput {
  readonly inputFileName: string;
  readonly outputFileName: string;
  readonly text: string;
}

export interface EmitResult {
  readonly emittedFiles: readonly EmitOutput[];
  readonly diagnostics: readonly ProgramDiagnostic[];
}

export function createProgram(rootNames: readonly string[], options: CompilerOptions, host: CompilerHost): Program {
  const sourceFiles: ProgramSourceFile[] = [];
  const diagnostics: ProgramDiagnostic[] = [];
  for (const rootName of rootNames) {
    const sourceText = host.readFile(rootName);
    if (sourceText === undefined) {
      diagnostics.push({
        fileName: rootName,
        message: `File not found: ${rootName}`,
      });
      continue;
    }
    const sourceFile = parseSourceFile(sourceText, { fileName: rootName });
    const bindResult = bindSourceFile(sourceFile);
    diagnostics.push(...bindResult.diagnostics.map(diagnostic => convertBindDiagnostic(rootName, diagnostic)));
    sourceFiles.push({
      fileName: rootName,
      sourceText,
      sourceFile,
      bindResult,
    });
  }
  return {
    rootNames: [...rootNames],
    options,
    sourceFiles,
    diagnostics,
  };
}

export function emitProgram(program: Program, host?: Pick<CompilerHost, "writeFile" | "getCurrentDirectory">): EmitResult {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.length > 0) {
    return { emittedFiles: [], diagnostics };
  }
  const emittedFiles = program.sourceFiles.map(sourceFile => {
    const outputFileName = outputFileNameFor(sourceFile.fileName, program.options, host);
    const text = printSourceFile(sourceFile.sourceFile);
    host?.writeFile?.(outputFileName, text);
    return {
      inputFileName: sourceFile.fileName,
      outputFileName,
      text,
    };
  });
  return { emittedFiles, diagnostics };
}

function outputFileNameFor(inputFileName: string, options: CompilerOptions, host?: Pick<CompilerHost, "getCurrentDirectory">): string {
  const outputBase = replaceExtension(inputFileName, ".js");
  if (options.outDir === undefined) {
    return outputBase;
  }
  const currentDirectory = host?.getCurrentDirectory?.() ?? process.cwd();
  const relativeInput = relative(currentDirectory, outputBase);
  return join(options.outDir, relativeInput.startsWith("..") ? outputBase : relativeInput);
}

function replaceExtension(fileName: string, extension: string): string {
  const currentExtension = extname(fileName);
  if (currentExtension.length === 0) {
    return `${fileName}${extension}`;
  }
  return `${fileName.slice(0, -currentExtension.length)}${extension}`;
}

function convertBindDiagnostic(fileName: string, diagnostic: BindDiagnostic): ProgramDiagnostic {
  return {
    fileName,
    message: diagnostic.message,
  };
}
