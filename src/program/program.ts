import { dirname, extname, isAbsolute, join, normalize, relative } from "node:path";
import { bindSourceFile, type BindDiagnostic, type BindResult } from "../binder/index.js";
import { checkProgram } from "../checker/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { parseSourceFileWithDiagnostics } from "../parser/index.js";
import { Kind, forEachChild, isExportAssignment, isExportDeclaration, isExternalModuleReference, isImportDeclaration, isImportEqualsDeclaration, isModuleDeclaration, isStringLiteral, type Node, type SourceFile } from "../ast/index.js";
import { createDiagnostic, createDiagnosticAt, type DiagnosticCategory, type DiagnosticCode } from "../diagnostics/index.js";

export interface CompilerOptions {
  readonly outDir?: string;
  readonly outFile?: string;
  readonly baseUrl?: string;
  readonly lib?: readonly string[];
  readonly target?: ScriptTargetName;
  readonly module?: ModuleKindName;
  readonly moduleResolution?: ModuleResolutionKindName;
  readonly strict?: boolean;
  readonly noImplicitAny?: boolean;
  readonly noUnusedLocals?: boolean;
  readonly noUnusedParameters?: boolean;
  readonly strictNullChecks?: boolean;
  readonly strictPropertyInitialization?: boolean;
  readonly exactOptionalPropertyTypes?: boolean;
  readonly noLib?: boolean;
  readonly allowJs?: boolean;
  readonly checkJs?: boolean;
  readonly downlevelIteration?: boolean;
  readonly experimentalDecorators?: boolean;
  readonly emitDecoratorMetadata?: boolean;
  readonly allowSyntheticDefaultImports?: boolean;
  readonly alwaysStrict?: boolean;
  readonly allowUnreachableCode?: boolean;
  readonly esModuleInterop?: boolean;
  readonly noUncheckedSideEffectImports?: boolean;
  readonly noEmit?: boolean;
  readonly declaration?: boolean;
  readonly emitDeclarationOnly?: boolean;
  readonly jsx?: unknown;
  readonly jsxFactory?: string;
  readonly jsxFragmentFactory?: string;
  readonly jsxImportSource?: string;
  readonly reactNamespace?: string;
  readonly ignoreDeprecations?: string;
  readonly removedOptions?: readonly RemovedCompilerOptionName[];
}

export type ScriptTargetName = "es3" | "es5" | "es2015" | "es2016" | "es2017" | "es2018" | "es2019" | "es2020" | "es2021" | "es2022" | "es2023" | "es2024" | "esnext";
export type ModuleKindName = "none" | "commonjs" | "amd" | "system" | "umd" | "es2015" | "es2020" | "es2022" | "esnext" | "node16" | "node18" | "node20" | "nodenext" | "preserve";
export type ModuleResolutionKindName = "classic" | "node10" | "node16" | "nodenext" | "bundler";
export type RemovedCompilerOptionName =
  | "charset"
  | "importsNotUsedAsValues"
  | "keyofStringsOnly"
  | "noImplicitUseStrict"
  | "noStrictGenericChecks"
  | "out"
  | "preserveValueImports"
  | "suppressExcessPropertyErrors"
  | "suppressImplicitAnyIndexErrors";

export interface CompilerHost {
  readFile(fileName: string): string | undefined;
  readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[]): readonly string[];
  writeFile?(fileName: string, text: string): void;
  getCurrentDirectory?(): string;
  realpath?(fileName: string): string;
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
  readonly untyped?: boolean;
  readonly blockedByResolutionDiagnostic?: boolean;
}

export interface ProgramDiagnostic {
  readonly fileName?: string;
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
  const diagnostics: ProgramDiagnostic[] = [...compilerOptionsDiagnostics(options)];
  const unresolvedModules: { readonly fileName: string; readonly moduleSpecifier: string; readonly sideEffectOnly: boolean }[] = [];
  const moduleAugmentations: { readonly fileName: string; readonly moduleSpecifier: string }[] = [];
  const ambientModules = new Set<string>();
  const pending = [...rootNames];
  const seen = new Set<string>();
  const canonicalSourceFileNames = new Map<string, string>();
  const fileTextCache = new Map<string, string | undefined>();
  while (pending.length > 0) {
    const rootName = pending.shift()!;
    const canonicalName = canonicalFileName(rootName, host);
    if (seen.has(canonicalName)) {
      continue;
    }
    seen.add(canonicalName);
    canonicalSourceFileNames.set(canonicalName, rootName);
    if (isJavaScriptFileName(rootName) && !shouldAllowJavaScript(options)) {
      diagnostics.push(optionDiagnostic(6504, rootName));
      continue;
    }
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
      diagnostics.push(...amdModuleDirectiveDiagnostics(rootName, sourceText));
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
    diagnostics.push(...sourceFileAmbientModuleGrammarDiagnostics(rootName, sourceFile));
    const resolvedModules: ResolvedModule[] = [];
    const recordResolvedModule = (moduleSpecifier: string, resolved: ModuleResolution): void => {
      if (resolved.fileName === undefined) {
        return;
      }
      const canonicalResolvedName = canonicalFileName(resolved.fileName, host);
      const resolvedFileName = canonicalSourceFileNames.get(canonicalResolvedName) ?? resolved.fileName;
      resolvedModules.push({
        specifier: moduleSpecifier,
        fileName: resolvedFileName,
        ...(resolved.untyped === true ? { untyped: true } : {}),
        ...(resolved.blockedByResolutionDiagnostic === true ? { blockedByResolutionDiagnostic: true } : {}),
      });
      if (resolved.untyped !== true && !seen.has(canonicalResolvedName)) {
        pending.push(resolved.fileName);
      }
    };
    for (const moduleReference of sourceFileModuleReferences(sourceFile)) {
      const resolved = resolveModuleName(moduleReference.moduleSpecifier, rootName, options, host, fileTextCache);
      if (!resolved.found) {
        unresolvedModules.push({ fileName: rootName, moduleSpecifier: moduleReference.moduleSpecifier, sideEffectOnly: moduleReference.sideEffectOnly });
        continue;
      }
      diagnostics.push(...moduleResolutionDiagnostics(rootName, moduleReference.moduleSpecifier, resolved, options));
      recordResolvedModule(moduleReference.moduleSpecifier, resolved);
    }
    for (const moduleReference of sourceFileImplicitModuleReferences(sourceFile, options)) {
      const resolved = resolveModuleName(moduleReference.moduleSpecifier, rootName, options, host, fileTextCache);
      if (resolved.found) {
        recordResolvedModule(moduleReference.moduleSpecifier, resolved);
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
        .filter(unresolved => !unresolved.sideEffectOnly || options.noUncheckedSideEffectImports !== false)
        .map(unresolved => programDiagnostic(unresolved.fileName, unresolvedModuleDiagnosticCode(unresolved, options), unresolved.moduleSpecifier)),
      ...moduleAugmentations
        .filter(augmentation => !ambientModules.has(augmentation.moduleSpecifier))
        .filter(augmentation => !resolveModuleName(augmentation.moduleSpecifier, augmentation.fileName, options, host, fileTextCache).found)
        .map(augmentation => programDiagnostic(augmentation.fileName, 2664, augmentation.moduleSpecifier)),
    ],
  };
}

function unresolvedModuleDiagnosticCode(unresolved: { readonly moduleSpecifier: string; readonly sideEffectOnly: boolean }, options: CompilerOptions): DiagnosticCode {
  if (unresolved.sideEffectOnly && options.noUncheckedSideEffectImports !== false) {
    return 2882;
  }
  return (options.module === "amd" || options.module === "system") ? 2792 : 2307;
}

function compilerOptionsDiagnostics(options: CompilerOptions): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [];
  for (const removedOption of options.removedOptions ?? []) {
    diagnostics.push(optionDiagnostic(5102, removedOption));
  }
  if (shouldReportDeprecated6Option(options)) {
    diagnostics.push(...deprecatedCompilerOptionsDiagnostics(options));
  }
  if (options.checkJs === true && options.allowJs === false) {
    diagnostics.push(optionDiagnostic(5052, "checkJs", "allowJs"));
  }
  if (options.strictPropertyInitialization === true && !strictCompilerOptionValue(options, "strictNullChecks")) {
    diagnostics.push(optionDiagnostic(5052, "strictPropertyInitialization", "strictNullChecks"));
  }
  if (options.exactOptionalPropertyTypes === true && !strictCompilerOptionValue(options, "strictNullChecks")) {
    diagnostics.push(optionDiagnostic(5052, "exactOptionalPropertyTypes", "strictNullChecks"));
  }
  if (options.emitDecoratorMetadata === true && options.experimentalDecorators !== true) {
    diagnostics.push(optionDiagnostic(5052, "emitDecoratorMetadata", "experimentalDecorators"));
  }
  if (options.outFile !== undefined && options.noEmit !== true && options.emitDeclarationOnly !== true && !moduleKindSupportsOutFile(options.module)) {
    diagnostics.push(optionDiagnostic(6082, "outFile"));
  }
  if (options.moduleResolution === "node16" && options.module !== "node16") {
    diagnostics.push(optionDiagnostic(5110, "Node16", "Node16"));
  }
  if (options.moduleResolution === "nodenext" && options.module !== "nodenext") {
    diagnostics.push(optionDiagnostic(5110, "NodeNext", "NodeNext"));
  }
  if (options.lib !== undefined && options.noLib === true) {
    diagnostics.push(optionDiagnostic(5053, "lib", "noLib"));
  }
  if (options.reactNamespace !== undefined && options.jsxFactory !== undefined) {
    diagnostics.push(optionDiagnostic(5053, "reactNamespace", "jsxFactory"));
  }
  if (options.reactNamespace !== undefined && !isIdentifierText(options.reactNamespace)) {
    diagnostics.push(optionDiagnostic(5059, options.reactNamespace));
  }
  if (options.jsxFactory !== undefined && !isQualifiedNameText(options.jsxFactory)) {
    diagnostics.push(optionDiagnostic(5067, options.jsxFactory));
  }
  if (options.jsxFragmentFactory !== undefined && !isQualifiedNameText(options.jsxFragmentFactory)) {
    diagnostics.push(optionDiagnostic(18035, options.jsxFragmentFactory));
  }
  return diagnostics;
}

function strictCompilerOptionValue(options: CompilerOptions, optionName: "noImplicitAny" | "strictNullChecks" | "strictPropertyInitialization" | "exactOptionalPropertyTypes"): boolean {
  if (optionName === "exactOptionalPropertyTypes") {
    return options.exactOptionalPropertyTypes === true;
  }
  return options[optionName] === undefined ? options.strict !== false : options[optionName] === true;
}

function moduleKindSupportsOutFile(moduleKind: ModuleKindName | undefined): boolean {
  return moduleKind === undefined || moduleKind === "none" || moduleKind === "amd" || moduleKind === "system";
}

function shouldReportDeprecated6Option(options: CompilerOptions): boolean {
  return options.ignoreDeprecations === undefined || compareVersionText(options.ignoreDeprecations, "6.0") < 0;
}

function deprecatedCompilerOptionsDiagnostics(options: CompilerOptions): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [];
  if (options.outFile !== undefined) {
    diagnostics.push(deprecatedCompilerOptionDiagnostic("outFile"));
  }
  if (options.downlevelIteration !== undefined) {
    diagnostics.push(deprecatedCompilerOptionDiagnostic("downlevelIteration"));
  }
  if (options.baseUrl !== undefined) {
    diagnostics.push(deprecatedCompilerOptionDiagnostic("baseUrl"));
  }
  const moduleValue = deprecatedModuleOptionValue(options.module);
  if (moduleValue !== undefined) {
    diagnostics.push(deprecatedCompilerOptionValueDiagnostic("module", moduleValue));
  }
  if (options.target === "es3" || options.target === "es5") {
    diagnostics.push(deprecatedCompilerOptionValueDiagnostic("target", scriptTargetDisplayName(options.target)));
  }
  if (options.moduleResolution === "classic" || options.moduleResolution === "node10") {
    diagnostics.push(deprecatedCompilerOptionValueDiagnostic("moduleResolution", options.moduleResolution));
  }
  if (options.esModuleInterop === false) {
    diagnostics.push(deprecatedCompilerOptionValueDiagnostic("esModuleInterop", "false"));
  }
  if (options.allowSyntheticDefaultImports === false) {
    diagnostics.push(deprecatedCompilerOptionValueDiagnostic("allowSyntheticDefaultImports", "false"));
  }
  return diagnostics;
}

function deprecatedCompilerOptionDiagnostic(optionName: string): ProgramDiagnostic {
  return optionDiagnostic(5101, optionName, "7.0", "6.0");
}

function deprecatedCompilerOptionValueDiagnostic(optionName: string, optionValue: string): ProgramDiagnostic {
  return optionDiagnostic(5107, optionName, optionValue, "7.0", "6.0");
}

function deprecatedModuleOptionValue(moduleKind: ModuleKindName | undefined): string | undefined {
  switch (moduleKind) {
    case "none":
      return "None";
    case "amd":
      return "AMD";
    case "system":
      return "System";
    case "umd":
      return "UMD";
    default:
      return undefined;
  }
}

function scriptTargetDisplayName(target: ScriptTargetName): string {
  return target.toUpperCase();
}

function compareVersionText(left: string, right: string): number {
  const leftParts = parseVersionText(left);
  const rightParts = parseVersionText(right);
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] ?? 0;
    const rightPart = rightParts[index] ?? 0;
    if (leftPart !== rightPart) {
      return leftPart - rightPart;
    }
  }
  return 0;
}

function parseVersionText(value: string): readonly number[] {
  return value.split(".").map(part => Number.parseInt(part, 10)).map(part => Number.isNaN(part) ? 0 : part);
}

function optionDiagnostic(code: DiagnosticCode, ...args: readonly string[]): ProgramDiagnostic {
  const diagnostic = createDiagnostic(code, ...args);
  return {
    code: diagnostic.code,
    category: diagnostic.category,
    key: diagnostic.key,
    messageText: diagnostic.messageText,
    message: diagnostic.message,
  };
}

function isQualifiedNameText(value: string): boolean {
  return value.split(".").every(isIdentifierText);
}

function isIdentifierText(value: string): boolean {
  return /^[$_\p{ID_Start}][$_\u200c\u200d\p{ID_Continue}]*$/u.test(value);
}

function isJavaScriptFileName(fileName: string): boolean {
  return fileName.endsWith(".js") || fileName.endsWith(".jsx") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs");
}

function shouldAllowJavaScript(options: CompilerOptions): boolean {
  return options.allowJs === true || (options.checkJs === true && options.allowJs !== false);
}

function amdModuleDirectiveDiagnostics(fileName: string, sourceText: string): readonly ProgramDiagnostic[] {
  const directives = [...sourceText.matchAll(/\/\/\/\s*<amd-module\b[^>]*\bname\s*=\s*(['\"])[^'\"]+\1[^>]*>/g)];
  return directives.length > 1 ? [programDiagnostic(fileName, 2458)] : [];
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
  collectModuleReferences(sourceFile.statements, references);
  return references;
}

function sourceFileImplicitModuleReferences(sourceFile: SourceFile, options: CompilerOptions): readonly SourceFileModuleReference[] {
  const runtimeModule = automaticJsxRuntimeModule(options);
  if (runtimeModule === undefined || !sourceFileContainsJsx(sourceFile)) {
    return [];
  }
  return [{ moduleSpecifier: runtimeModule, sideEffectOnly: false }];
}

function automaticJsxRuntimeModule(options: CompilerOptions): string | undefined {
  const importSource = options.jsxImportSource ?? "react";
  if (options.jsx === 4 || options.jsx === "react-jsx") {
    return `${importSource}/jsx-runtime`;
  }
  if (options.jsx === 5 || options.jsx === "react-jsxdev") {
    return `${importSource}/jsx-dev-runtime`;
  }
  return undefined;
}

function sourceFileContainsJsx(node: Node): boolean {
  if (node.kind === Kind.JsxElement || node.kind === Kind.JsxSelfClosingElement || node.kind === Kind.JsxFragment) {
    return true;
  }
  return forEachChild(node, child => sourceFileContainsJsx(child) ? true : undefined) === true;
}

function collectModuleReferences(statements: readonly SourceFile["statements"][number][], references: SourceFileModuleReference[]): void {
  for (const statement of statements) {
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
    if (isModuleDeclaration(statement) && statement.body?.kind === Kind.ModuleBlock) {
      collectModuleReferences(statement.body.statements, references);
    }
  }
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

function sourceFileAmbientModuleGrammarDiagnostics(fileName: string, sourceFile: SourceFile): readonly ProgramDiagnostic[] {
  if (sourceFileIsExternalModule(sourceFile)) {
    return [];
  }
  const diagnostics: ProgramDiagnostic[] = [];
  for (const statement of sourceFile.statements) {
    if (!isGlobalAmbientExternalModuleDeclaration(statement)) {
      continue;
    }
    if (isRelativeModuleName(statement.name.text)) {
      diagnostics.push(programDiagnostic(fileName, 2436));
    }
    if (statement.body?.kind !== Kind.ModuleBlock) {
      continue;
    }
    for (const bodyStatement of statement.body.statements) {
      if (isAmbientExternalModuleRelativeImportOrExport(bodyStatement)) {
        diagnostics.push(programDiagnostic(fileName, 2439));
      }
    }
  }
  return diagnostics;
}

function isGlobalAmbientExternalModuleDeclaration(statement: SourceFile["statements"][number]): statement is Extract<SourceFile["statements"][number], { readonly kind: Kind.ModuleDeclaration }> & { readonly name: { readonly text: string } } {
  return isModuleDeclaration(statement) && isStringLiteral(statement.name) && hasModifier(statement, Kind.DeclareKeyword);
}

function isAmbientExternalModuleRelativeImportOrExport(statement: SourceFile["statements"][number]): boolean {
  if (isImportDeclaration(statement) && isStringLiteral(statement.moduleSpecifier)) {
    return isRelativeModuleName(statement.moduleSpecifier.text);
  }
  if (isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && isStringLiteral(statement.moduleSpecifier)) {
    return isRelativeModuleName(statement.moduleSpecifier.text);
  }
  return isImportEqualsDeclaration(statement)
    && isExternalModuleReference(statement.moduleReference)
    && isStringLiteral(statement.moduleReference.expression)
    && isRelativeModuleName(statement.moduleReference.expression.text);
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
  readonly untyped?: boolean;
  readonly blockedByResolutionDiagnostic?: boolean;
}

function resolveModuleName(moduleSpecifier: string, containingFileName: string, options: CompilerOptions, host: CompilerHost, cache: Map<string, string | undefined>): ModuleResolution {
  if (isPathLikeModuleName(moduleSpecifier)) {
    const base = isAbsoluteModuleName(moduleSpecifier) ? normalize(moduleSpecifier) : normalize(join(dirname(containingFileName), moduleSpecifier));
    const candidates = moduleResolutionCandidates(base, options);
    const fileName = candidates.find(candidate => readFileCached(candidate, host, cache) !== undefined);
    return moduleResolutionResult(fileName, options);
  }
  if (!isRelativeModuleName(moduleSpecifier)) {
    const baseUrl = moduleResolutionBaseUrl(options, host);
    if (baseUrl !== undefined) {
      const resolvedBaseUrlFile = moduleResolutionCandidates(normalize(join(baseUrl, moduleSpecifier)), options).find(candidate => readFileCached(candidate, host, cache) !== undefined);
      if (resolvedBaseUrlFile !== undefined) {
        return moduleResolutionResult(resolvedBaseUrlFile, options);
      }
    }
    const resolvedPackageFile = packageResolutionCandidates(moduleSpecifier, containingFileName, options, host, cache).find(candidate => readFileCached(candidate, host, cache) !== undefined);
    if (resolvedPackageFile !== undefined) {
      return moduleResolutionResult(resolvedPackageFile, options);
    }
    const resolvedTypesPackageFile = typePackageResolutionCandidates(moduleSpecifier, containingFileName, options, host, cache).find(candidate => readFileCached(candidate, host, cache) !== undefined);
    if (resolvedTypesPackageFile !== undefined) {
      return moduleResolutionResult(resolvedTypesPackageFile, options);
    }
    return { found: false };
  }
  return { found: false };
}

function moduleResolutionDiagnostics(containingFileName: string, moduleSpecifier: string, resolution: ModuleResolution, options: CompilerOptions): readonly ProgramDiagnostic[] {
  if (resolution.fileName === undefined) {
    return [];
  }
  if (isUnsupportedJsxResolution(resolution.fileName, options)) {
    return [programDiagnostic(containingFileName, 6142, moduleSpecifier, resolution.fileName)];
  }
  if (resolution.untyped === true && options.noImplicitAny === true) {
    return [programDiagnostic(containingFileName, 7016, moduleSpecifier, resolution.fileName)];
  }
  return [];
}

function moduleResolutionResult(fileName: string | undefined, options: CompilerOptions): ModuleResolution {
  if (fileName === undefined) {
    return { found: false };
  }
  return {
    found: true,
    fileName,
    ...(isUntypedJavaScriptResolution(fileName, options) ? { untyped: true } : {}),
    ...(isUnsupportedJsxResolution(fileName, options) ? { blockedByResolutionDiagnostic: true } : {}),
  };
}

function isUntypedJavaScriptResolution(fileName: string, options: CompilerOptions): boolean {
  return isJavaScriptFileName(fileName) && !shouldAllowJavaScript(options);
}

function isUnsupportedJsxResolution(fileName: string, options: CompilerOptions): boolean {
  return options.jsx === undefined && isJsxSourceFileName(fileName);
}

function moduleResolutionBaseUrl(options: CompilerOptions, host: CompilerHost): string | undefined {
  if (options.baseUrl === undefined) {
    return undefined;
  }
  return normalize(isAbsolute(options.baseUrl) ? options.baseUrl : join(host.getCurrentDirectory?.() ?? ".", options.baseUrl));
}

function moduleResolutionCandidates(base: string, options: CompilerOptions): readonly string[] {
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
    `${base}.js`,
    `${base}.jsx`,
    `${base}.mjs`,
    `${base}.cjs`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
    join(base, "index.mts"),
    join(base, "index.cts"),
    join(base, "index.d.ts"),
    join(base, "index.d.mts"),
    join(base, "index.d.cts"),
    join(base, "index.js"),
    join(base, "index.jsx"),
    join(base, "index.mjs"),
    join(base, "index.cjs"),
  ];
}

function packageResolutionCandidates(moduleSpecifier: string, containingFileName: string, options: CompilerOptions, host: CompilerHost, cache: Map<string, string | undefined>): readonly string[] {
  const containingRealPath = normalize(host.realpath?.(containingFileName) ?? containingFileName);
  return nodeModulesSearchDirectories(dirname(containingRealPath)).flatMap(nodeModulesDirectory => {
    const base = join(nodeModulesDirectory, moduleSpecifier);
    return [
      ...packageJsonResolutionCandidates(base, options, host, cache),
      ...moduleResolutionCandidates(base, options),
    ];
  });
}

function typePackageResolutionCandidates(moduleSpecifier: string, containingFileName: string, options: CompilerOptions, host: CompilerHost, cache: Map<string, string | undefined>): readonly string[] {
  const typePackage = typePackageNameAndSubpath(moduleSpecifier);
  if (typePackage === undefined) {
    return [];
  }
  const containingRealPath = normalize(host.realpath?.(containingFileName) ?? containingFileName);
  return nodeModulesSearchDirectories(dirname(containingRealPath)).flatMap(nodeModulesDirectory => {
    const packageDirectory = join(nodeModulesDirectory, "@types", typePackage.packageName);
    const subpathBase = typePackage.subpath === "" ? packageDirectory : join(packageDirectory, typePackage.subpath);
    return [
      ...moduleResolutionCandidates(subpathBase, options),
      ...(typePackage.subpath === "" ? packageJsonResolutionCandidates(packageDirectory, options, host, cache) : []),
    ];
  });
}

function typePackageNameAndSubpath(moduleSpecifier: string): { readonly packageName: string; readonly subpath: string } | undefined {
  const parts = moduleSpecifier.split("/");
  if (parts.length === 0 || parts[0] === "") {
    return undefined;
  }
  if (parts[0]?.startsWith("@") === true) {
    const scope = parts[0].slice(1);
    const packageName = parts[1];
    if (packageName === undefined) {
      return undefined;
    }
    return { packageName: `${scope}__${packageName}`, subpath: parts.slice(2).join("/") };
  }
  return { packageName: parts[0]!, subpath: parts.slice(1).join("/") };
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

function packageJsonResolutionCandidates(packageDirectory: string, options: CompilerOptions, host: CompilerHost, cache: Map<string, string | undefined>): readonly string[] {
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

  const candidates: string[] = [...packageExportsResolutionCandidates(packageDirectory, packageMetadata.exports, options)];
  for (const fieldName of ["types", "typings", "main"] as const) {
    const fieldValue = packageMetadata[fieldName];
    if (typeof fieldValue === "string") {
      candidates.push(...moduleResolutionCandidates(packageFieldTarget(packageDirectory, fieldValue), options));
    }
  }
  return candidates;
}

function packageExportsResolutionCandidates(packageDirectory: string, exportsField: unknown, options: CompilerOptions): readonly string[] {
  return packageExportsTargets(exportsField).flatMap(target => moduleResolutionCandidates(packageFieldTarget(packageDirectory, target), options));
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
  return moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../") || moduleSpecifier.startsWith(".\\") || moduleSpecifier.startsWith("..\\");
}

function isAbsoluteModuleName(moduleSpecifier: string): boolean {
  return isAbsolute(moduleSpecifier) || /^[A-Za-z]:[\\/]/u.test(moduleSpecifier);
}

function isPathLikeModuleName(moduleSpecifier: string): boolean {
  return isRelativeModuleName(moduleSpecifier) || isAbsoluteModuleName(moduleSpecifier);
}

function isJsxSourceFileName(fileName: string): boolean {
  return fileName.endsWith(".tsx") || fileName.endsWith(".jsx");
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
