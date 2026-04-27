import { dirname, extname, isAbsolute, join, normalize, relative } from "node:path";
import { bindSourceFile, type BindDiagnostic, type BindResult } from "../binder/index.js";
import { checkProgram } from "../checker/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { parseSourceFileWithDiagnostics } from "../parser/index.js";
import { Kind, isExportAssignment, isExportDeclaration, isExternalModuleReference, isImportDeclaration, isImportEqualsDeclaration, isModuleDeclaration, isStringLiteral, type SourceFile } from "../ast/index.js";
import { createDiagnosticAt, type DiagnosticCategory, type DiagnosticCode } from "../diagnostics/index.js";

export interface CompilerOptions {
  readonly outDir?: string;
  readonly target?: ScriptTargetName;
  readonly module?: ModuleKindName;
  readonly strict?: boolean;
  readonly noImplicitAny?: boolean;
  readonly allowSyntheticDefaultImports?: boolean;
  readonly alwaysStrict?: boolean;
  readonly esModuleInterop?: boolean;
  readonly noUncheckedSideEffectImports?: boolean;
}

export type ScriptTargetName = "es3" | "es5" | "es2015" | "es2016" | "es2017" | "es2018" | "es2019" | "es2020" | "es2021" | "es2022" | "es2023" | "es2024" | "esnext";
export type ModuleKindName = "none" | "commonjs" | "amd" | "system" | "umd" | "es2015" | "es2020" | "es2022" | "esnext" | "node16" | "node18" | "nodenext" | "preserve";

export interface CompilerHost {
  readFile(fileName: string): string | undefined;
  readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[]): readonly string[];
  writeFile?(fileName: string, text: string): void;
  getCurrentDirectory?(): string;
  useCaseSensitiveFileNames?(): boolean;
}

export interface ProgramSourceFile {
  readonly fileName: string;
  readonly sourceText: string;
  readonly sourceFile: SourceFile;
  readonly bindResult: BindResult;
  readonly resolvedModules: readonly ResolvedModule[];
}

export interface ResolvedModule {
  readonly specifier: string;
  readonly fileName: string;
}

export interface ProgramDiagnostic {
  readonly fileName: string;
  readonly code?: DiagnosticCode;
  readonly category?: DiagnosticCategory;
  readonly key?: string;
  readonly messageText?: string;
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
  const unresolvedModules: { readonly fileName: string; readonly moduleSpecifier: string; readonly sideEffectOnly: boolean }[] = [];
  const moduleAugmentations: { readonly fileName: string; readonly moduleSpecifier: string }[] = [];
  const ambientModules = new Set<string>();
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
      diagnostics.push(programDiagnostic(rootName, 6053, rootName));
      continue;
    }
    let sourceFile: SourceFile;
    try {
      const parseResult = parseSourceFileWithDiagnostics(sourceText, { fileName: rootName });
      sourceFile = parseResult.sourceFile;
      diagnostics.push(...parseResult.diagnostics.map(diagnostic => ({
        fileName: rootName,
        code: diagnostic.code,
        category: diagnostic.category,
        key: diagnostic.key,
        messageText: diagnostic.messageText,
        message: diagnostic.message,
      })));
    } catch (error) {
      diagnostics.push({
        fileName: rootName,
        message: error instanceof Error ? error.message : String(error),
      });
      continue;
    }
    const bindResult = bindSourceFile(sourceFile);
    diagnostics.push(...bindResult.diagnostics.map(diagnostic => convertBindDiagnostic(rootName, diagnostic)));
    for (const moduleSpecifier of sourceFileAmbientModuleSpecifiers(sourceFile)) {
      ambientModules.add(moduleSpecifier);
    }
    moduleAugmentations.push(...sourceFileModuleAugmentationSpecifiers(sourceFile).map(moduleSpecifier => ({ fileName: rootName, moduleSpecifier })));
    const resolvedModules: ResolvedModule[] = [];
    for (const moduleReference of sourceFileModuleReferences(sourceFile)) {
      const resolved = resolveModuleName(moduleReference.moduleSpecifier, rootName, host, fileTextCache);
      if (!resolved.found) {
        unresolvedModules.push({ fileName: rootName, moduleSpecifier: moduleReference.moduleSpecifier, sideEffectOnly: moduleReference.sideEffectOnly });
        continue;
      }
      if (resolved.fileName !== undefined && !seen.has(canonicalFileName(resolved.fileName, host))) {
        resolvedModules.push({ specifier: moduleReference.moduleSpecifier, fileName: resolved.fileName });
        pending.push(resolved.fileName);
      }
      if (resolved.fileName !== undefined && seen.has(canonicalFileName(resolved.fileName, host))) {
        resolvedModules.push({ specifier: moduleReference.moduleSpecifier, fileName: resolved.fileName });
      }
    }
    sourceFiles.push({
      fileName: rootName,
      sourceText,
      sourceFile,
      bindResult,
      resolvedModules,
    });
  }
  return {
    rootNames: [...rootNames],
    options,
    sourceFiles,
    diagnostics: [
      ...diagnostics,
      ...unresolvedModules
        .filter(unresolved => !ambientModules.has(unresolved.moduleSpecifier))
        .filter(unresolved => !unresolved.sideEffectOnly || options.noUncheckedSideEffectImports === true)
        .map(unresolved => programDiagnostic(unresolved.fileName, unresolvedModuleDiagnosticCode(unresolved, options), unresolved.moduleSpecifier)),
      ...moduleAugmentations
        .filter(augmentation => !ambientModules.has(augmentation.moduleSpecifier))
        .filter(augmentation => !resolveModuleName(augmentation.moduleSpecifier, augmentation.fileName, host, fileTextCache).found)
        .map(augmentation => programDiagnostic(augmentation.fileName, 2664, augmentation.moduleSpecifier)),
    ],
  };
}

function unresolvedModuleDiagnosticCode(unresolved: { readonly moduleSpecifier: string; readonly sideEffectOnly: boolean }, options: CompilerOptions): DiagnosticCode {
  if (unresolved.sideEffectOnly && options.noUncheckedSideEffectImports === true) {
    return 2882;
  }
  return !isRelativeModuleName(unresolved.moduleSpecifier) && options.module === "system" ? 2792 : 2307;
}

export function emitProgram(program: Program, host?: Pick<CompilerHost, "writeFile" | "getCurrentDirectory">): EmitResult {
  const diagnostics = getProgramDiagnostics(program);
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

export function getProgramDiagnostics(program: Program): readonly ProgramDiagnostic[] {
  return checkProgram(program);
}

interface SourceFileModuleReference {
  readonly moduleSpecifier: string;
  readonly sideEffectOnly: boolean;
}

function sourceFileModuleReferences(sourceFile: SourceFile): readonly SourceFileModuleReference[] {
  const references: SourceFileModuleReference[] = [];
  for (const statement of sourceFile.statements) {
    if (isImportDeclaration(statement) && isStringLiteral(statement.moduleSpecifier)) {
      references.push({ moduleSpecifier: statement.moduleSpecifier.text, sideEffectOnly: statement.importClause === undefined });
      continue;
    }
    if (isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && isStringLiteral(statement.moduleSpecifier)) {
      references.push({ moduleSpecifier: statement.moduleSpecifier.text, sideEffectOnly: false });
      continue;
    }
    if (
      isImportEqualsDeclaration(statement)
      && isExternalModuleReference(statement.moduleReference)
      && isStringLiteral(statement.moduleReference.expression)
    ) {
      references.push({ moduleSpecifier: statement.moduleReference.expression.text, sideEffectOnly: false });
    }
  }
  return references;
}

function sourceFileAmbientModuleSpecifiers(sourceFile: SourceFile): readonly string[] {
  if (sourceFileIsExternalModule(sourceFile)) {
    return [];
  }
  const specifiers: string[] = [];
  for (const statement of sourceFile.statements) {
    if (isModuleDeclaration(statement) && isStringLiteral(statement.name)) {
      specifiers.push(statement.name.text);
    }
  }
  return specifiers;
}

function sourceFileModuleAugmentationSpecifiers(sourceFile: SourceFile): readonly string[] {
  if (!sourceFileIsExternalModule(sourceFile)) {
    return [];
  }
  const specifiers: string[] = [];
  for (const statement of sourceFile.statements) {
    if (isModuleDeclaration(statement) && isStringLiteral(statement.name)) {
      specifiers.push(statement.name.text);
    }
  }
  return specifiers;
}

function sourceFileIsExternalModule(sourceFile: SourceFile): boolean {
  return sourceFile.statements.some(statement =>
    isImportDeclaration(statement)
    || isImportEqualsDeclaration(statement)
    || isExportDeclaration(statement)
    || isExportAssignment(statement)
    || hasModifier(statement, Kind.ExportKeyword)
  );
}

function hasModifier(node: object, kind: Kind): boolean {
  return (node as { readonly modifiers?: readonly { readonly kind: Kind }[] }).modifiers?.some(modifier => modifier.kind === kind) === true;
}

interface ModuleResolution {
  readonly found: boolean;
  readonly fileName?: string;
}

function resolveModuleName(moduleSpecifier: string, containingFileName: string, host: CompilerHost, cache: Map<string, string | undefined>): ModuleResolution {
  if (!isRelativeModuleName(moduleSpecifier)) {
    const resolvedPackageFile = packageResolutionCandidates(moduleSpecifier, containingFileName, host, cache).find(candidate => readFileCached(candidate, host, cache) !== undefined);
    if (resolvedPackageFile !== undefined) {
      return { found: true, fileName: resolvedPackageFile };
    }
    return { found: false };
  }
  const base = normalize(join(dirname(containingFileName), moduleSpecifier));
  const candidates = moduleResolutionCandidates(base);
  const fileName = candidates.find(candidate => readFileCached(candidate, host, cache) !== undefined);
  return fileName === undefined ? { found: false } : { found: true, fileName };
}

function moduleResolutionCandidates(base: string): readonly string[] {
  const extension = extname(base);
  if (extension === ".js" || extension === ".jsx" || extension === ".mjs" || extension === ".cjs") {
    const withoutJsExtension = base.slice(0, -extension.length);
    return [
      `${withoutJsExtension}.ts`,
      `${withoutJsExtension}.tsx`,
      `${withoutJsExtension}.d.ts`,
      base,
    ];
  }
  if (extension !== "") {
    return [base];
  }
  return [
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.mts`,
    `${base}.cts`,
    `${base}.d.ts`,
    `${base}.d.mts`,
    `${base}.d.cts`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
    join(base, "index.mts"),
    join(base, "index.cts"),
    join(base, "index.d.ts"),
    join(base, "index.d.mts"),
    join(base, "index.d.cts"),
  ];
}

function packageResolutionCandidates(moduleSpecifier: string, containingFileName: string, host: CompilerHost, cache: Map<string, string | undefined>): readonly string[] {
  return nodeModulesSearchDirectories(dirname(containingFileName)).flatMap(nodeModulesDirectory => {
    const base = join(nodeModulesDirectory, moduleSpecifier);
    return [
      ...packageJsonResolutionCandidates(base, host, cache),
      `${base}.ts`,
      `${base}.tsx`,
      `${base}.mts`,
      `${base}.cts`,
      `${base}.d.ts`,
      `${base}.d.mts`,
      `${base}.d.cts`,
      join(base, "index.ts"),
      join(base, "index.tsx"),
      join(base, "index.mts"),
      join(base, "index.cts"),
      join(base, "index.d.ts"),
      join(base, "index.d.mts"),
      join(base, "index.d.cts"),
    ];
  });
}

function nodeModulesSearchDirectories(startDirectory: string): readonly string[] {
  const directories: string[] = [];
  let current = normalize(startDirectory || ".");
  while (true) {
    directories.push(join(current, "node_modules"));
    const parent = dirname(current);
    if (parent === current || parent === ".") {
      break;
    }
    current = parent;
  }
  directories.push("node_modules");
  return [...new Set(directories)];
}

function packageJsonResolutionCandidates(packageDirectory: string, host: CompilerHost, cache: Map<string, string | undefined>): readonly string[] {
  const packageJsonText = readFileCached(join(packageDirectory, "package.json"), host, cache);
  if (packageJsonText === undefined) {
    return [];
  }

  let packageMetadata: unknown;
  try {
    packageMetadata = JSON.parse(packageJsonText);
  } catch {
    return [];
  }
  if (!isRecord(packageMetadata)) {
    return [];
  }

  const candidates: string[] = [...packageExportsResolutionCandidates(packageDirectory, packageMetadata.exports)];
  for (const fieldName of ["types", "typings", "main"] as const) {
    const fieldValue = packageMetadata[fieldName];
    if (typeof fieldValue === "string") {
      candidates.push(...moduleResolutionCandidates(packageFieldTarget(packageDirectory, fieldValue)));
    }
  }
  return candidates;
}

function packageExportsResolutionCandidates(packageDirectory: string, exportsField: unknown): readonly string[] {
  return packageExportsTargets(exportsField).flatMap(target => moduleResolutionCandidates(packageFieldTarget(packageDirectory, target)));
}

function packageExportsTargets(exportsField: unknown): readonly string[] {
  if (typeof exportsField === "string") {
    return [exportsField];
  }
  if (!isRecord(exportsField)) {
    return [];
  }
  const rootExport = exportsField["."];
  if (typeof rootExport === "string") {
    return [rootExport];
  }
  if (!isRecord(rootExport)) {
    return [];
  }
  const targets: string[] = [];
  for (const condition of ["types", "typings", "import", "require", "default"] as const) {
    const target = rootExport[condition];
    if (typeof target === "string") {
      targets.push(target);
    }
  }
  return targets;
}

function packageFieldTarget(packageDirectory: string, fieldValue: string): string {
  return normalize(isAbsolute(fieldValue) ? fieldValue : join(packageDirectory, fieldValue));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
    code: diagnostic.code,
    category: diagnostic.category,
    key: diagnostic.key,
    messageText: diagnostic.messageText,
    message: diagnostic.message,
  };
}

function programDiagnostic(fileName: string, code: DiagnosticCode, ...args: readonly string[]): ProgramDiagnostic {
  const diagnostic = createDiagnosticAt({ fileName }, code, ...args);
  return {
    fileName,
    code: diagnostic.code,
    category: diagnostic.category,
    key: diagnostic.key,
    messageText: diagnostic.messageText,
    message: diagnostic.message,
  };
}
