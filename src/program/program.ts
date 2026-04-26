import { dirname, extname, join, normalize, relative } from "node:path";
import { bindSourceFile, type BindDiagnostic, type BindResult } from "../binder/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { parseSourceFile } from "../parser/index.js";
import { isExportDeclaration, isImportDeclaration, isStringLiteral, type SourceFile } from "../ast/index.js";

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
  const pending = [...rootNames];
  const seen = new Set<string>();
  const fileTextCache = new Map<string, string | undefined>();
  while (pending.length > 0) {
    const rootName = pending.shift()!;
    const canonicalName = canonicalFileName(rootName, host);
    if (seen.has(canonicalName)) {
      continue;
    }
    seen.add(canonicalName);
    const sourceText = readFileCached(rootName, host, fileTextCache);
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
    for (const moduleSpecifier of sourceFileModuleSpecifiers(sourceFile)) {
      const resolved = resolveModuleName(moduleSpecifier, rootName, host, fileTextCache);
      if (resolved === undefined) {
        if (isRelativeModuleName(moduleSpecifier)) {
          diagnostics.push({
            fileName: rootName,
            message: `Cannot find module '${moduleSpecifier}'.`,
          });
        }
        continue;
      }
      if (!seen.has(canonicalFileName(resolved, host))) {
        pending.push(resolved);
      }
    }
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
  const emittedFiles = program.sourceFiles.filter(sourceFile => !isDeclarationFileName(sourceFile.fileName)).map(sourceFile => {
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

function sourceFileModuleSpecifiers(sourceFile: SourceFile): readonly string[] {
  const specifiers: string[] = [];
  for (const statement of sourceFile.statements) {
    if (isImportDeclaration(statement) && isStringLiteral(statement.moduleSpecifier)) {
      specifiers.push(statement.moduleSpecifier.text);
      continue;
    }
    if (isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && isStringLiteral(statement.moduleSpecifier)) {
      specifiers.push(statement.moduleSpecifier.text);
    }
  }
  return specifiers;
}

function resolveModuleName(moduleSpecifier: string, containingFileName: string, host: CompilerHost, cache: Map<string, string | undefined>): string | undefined {
  if (!isRelativeModuleName(moduleSpecifier)) {
    return undefined;
  }
  const base = normalize(join(dirname(containingFileName), moduleSpecifier));
  const candidates = moduleResolutionCandidates(base);
  return candidates.find(candidate => readFileCached(candidate, host, cache) !== undefined);
}

function moduleResolutionCandidates(base: string): readonly string[] {
  if (extname(base) !== "") {
    return [base];
  }
  return [
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.d.ts`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
    join(base, "index.d.ts"),
  ];
}

function isRelativeModuleName(moduleSpecifier: string): boolean {
  return moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../");
}

function readFileCached(fileName: string, host: CompilerHost, cache: Map<string, string | undefined>): string | undefined {
  const key = canonicalFileName(fileName, host);
  if (!cache.has(key)) {
    cache.set(key, host.readFile(fileName));
  }
  return cache.get(key);
}

function canonicalFileName(fileName: string, host: Pick<CompilerHost, "useCaseSensitiveFileNames">): string {
  const normalized = normalize(fileName);
  return host.useCaseSensitiveFileNames?.() === false ? normalized.toLowerCase() : normalized;
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

function isDeclarationFileName(fileName: string): boolean {
  return fileName.endsWith(".d.ts");
}

function convertBindDiagnostic(fileName: string, diagnostic: BindDiagnostic): ProgramDiagnostic {
  return {
    fileName,
    message: diagnostic.message,
  };
}
