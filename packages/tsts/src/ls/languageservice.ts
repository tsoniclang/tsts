/**
 * Language service state holder.
 *
 * Porting anchor for TS-Go `internal/ls/languageservice.go`.
 */

import type { Diagnostic, DocumentUri, Hover, Position } from "../lsp/lsproto/index.js";
import { NodeFlags, isStringLiteralLike, type SourceFile, type StringLiteralLike } from "../ast/index.js";
import { tristateIsFalse } from "../core/index.js";
import { getDocumentPositionMapper, type DocumentPositionMapper } from "../sourcemap/index.js";
import { createECMALineInfo } from "../sourcemap/lineInfo.js";
import {
  extensionsNotSupportingExtensionlessResolution,
  fileExtensionIsOneOf,
  hasJSFileExtension,
  hasTSFileExtension,
  isExternalModuleNameRelative,
  pathIsAbsolute,
  pathIsRelative,
  toPath as toTspath,
  type Path,
} from "../tspath/index.js";
import { UnlimitedDepth } from "../vfs/vfsmatch/index.js";
import { ErrNeedsAutoImports } from "./completions.js";
import type { Host } from "./host.js";
import { autoImportFixProvider } from "./autoimport/fix.js";
import { newView, type View, type ViewRegistry } from "./autoimport/view.js";
import type { Registry } from "./autoimport/registry.js";
import type { AutoImportProgram, ConditionSet } from "./autoimport/specifiers.js";
import { ModuleResolutionKind, type SourceFileForSpecifierGeneration } from "../modulespecifiers/index.js";
import {
  getDefaultFormatCodeSettings,
  moduleSpecifierPreferences,
  type FormatCodeSettings,
  type UserPreferences,
} from "./lsutil/index.js";
import type { Converters } from "./lsconv/converters.js";

export interface LanguageServiceProgram {
  getCurrentDirectory?(): string;
  getSourceFile?(fileName: string): SourceFile | undefined;
  readonly sourceFiles?: readonly { readonly fileName: string; readonly sourceFile: SourceFile }[];
  options?(): unknown;
  getSymlinkCache?(): unknown;
  commonSourceDirectory?(): string;
  getGlobalTypingsCacheLocation?(): string;
  getProjectReferenceFromSource?(path: string): unknown;
  getRedirectTargets?(path: string): readonly string[];
  getSourceOfProjectReferenceIfOutputIncluded?(file: unknown): string;
  getNearestAncestorDirectoryWithPackageJson?(dirname: string): string;
  getPackageJsonInfo?(pkgJsonPath: string): unknown;
  getDefaultResolutionModeForFile?(file: unknown): 0 | 1 | 2;
  getResolvedModuleFromModuleSpecifier?(file: unknown, moduleSpecifier: StringLiteralLike): unknown;
  getModeForUsageLocation?(file: unknown, moduleSpecifier: StringLiteralLike): 0 | 1 | 2;
}

export interface LanguageServiceInit {
  readonly projectPath?: Path | string;
  readonly program?: LanguageServiceProgram;
  readonly host: Host;
  readonly activeFile?: string;
}

const emptyConditionSet: ConditionSet = {
  isSubsetOf: () => true,
  intersects: () => false,
};

export class LanguageService {
  readonly projectPath: Path | string;
  readonly host: Host;
  readonly activeConfig: UserPreferences;
  readonly program: LanguageServiceProgram | undefined;
  readonly converters: Converters;
  readonly documentPositionMappers = new Map<string, DocumentPositionMapper | undefined>();

  constructor(hostOrInit: Host | LanguageServiceInit) {
    const init = isLanguageServiceInit(hostOrInit) ? hostOrInit : { host: hostOrInit };
    this.projectPath = init.projectPath ?? "";
    this.host = init.host;
    this.program = init.program;
    this.converters = init.host.converters();
    this.activeConfig = init.host.getPreferences(init.activeFile ?? "");
  }

  getDiagnostics(uri: DocumentUri): readonly Diagnostic[] {
    const path = uri;
    const file = this.host.readFile(path);
    return file.ok ? [] : [{
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
      message: `File not found: ${path}`,
    }];
  }

  getHover(_uri: DocumentUri, _position: Position): Hover | undefined {
    return undefined;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.host.useCaseSensitiveFileNames();
  }

  toPath(fileName: string): Path | string {
    return toTspath(fileName, this.program?.getCurrentDirectory?.() ?? "", this.useCaseSensitiveFileNames());
  }

  getProgram(): LanguageServiceProgram | undefined {
    return this.program;
  }

  userPreferences(): UserPreferences {
    return this.activeConfig;
  }

  formatOptions(): FormatCodeSettings {
    return this.activeConfig.formatCodeSettings ?? getDefaultFormatCodeSettings();
  }

  tryGetProgramAndFile(fileName: string): readonly [LanguageServiceProgram | undefined, SourceFile | undefined] {
    const program = this.getProgram();
    if (program === undefined) return [undefined, undefined];
    const file = program.getSourceFile?.(fileName)
      ?? program.sourceFiles?.find(sourceFile => sourceFile.fileName === fileName)?.sourceFile;
    return [program, file];
  }

  getProgramAndFile(documentURI: DocumentUri): readonly [LanguageServiceProgram, SourceFile] {
    const fileName = documentUriFileName(documentURI);
    const [program, file] = this.tryGetProgramAndFile(fileName);
    if (program === undefined || file === undefined) throw new Error(`file not found: ${fileName}`);
    return [program, file];
  }

  getDocumentPositionMapper(fileName: string): DocumentPositionMapper | undefined {
    if (!this.documentPositionMappers.has(fileName)) {
      this.documentPositionMappers.set(fileName, getDocumentPositionMapper(this.sourceMapHost(), fileName));
    }
    return this.documentPositionMappers.get(fileName);
  }

  readFile(fileName: string): { readonly contents: string; readonly ok: boolean } {
    return this.host.readFile(fileName);
  }

  getECMALineInfo(fileName: string): ReturnType<Host["getECMALineInfo"]> {
    return this.host.getECMALineInfo(fileName);
  }

  getPreparedAutoImportView(fromFile: SourceFile): View | undefined {
    if (tristateIsFalse(this.userPreferences().includeCompletionsForModuleExports)) return undefined;
    const registry = this.host.autoImportRegistry();
    if (!registry.isPreparedForImportingFile(fromFile.fileName, this.projectPath, this.userPreferences())) {
      throw ErrNeedsAutoImports;
    }
    return this.newAutoImportView(registry, fromFile);
  }

  getCurrentAutoImportView(fromFile: SourceFile): View {
    return this.newAutoImportView(this.host.autoImportRegistry(), fromFile);
  }

  directoryExists(path: string): boolean {
    return this.host.directoryExists(path);
  }

  readDirectory(path: string, extensions: readonly string[], includes: readonly string[]): readonly string[] {
    return this.host.readDirectory(this.program?.getCurrentDirectory?.() ?? "", path, extensions, [], includes, UnlimitedDepth);
  }

  getDirectories(path: string): readonly string[] {
    return this.host.getDirectories(path);
  }

  private newAutoImportView(registry: Registry, fromFile: SourceFile): View {
    return newView({
      registry: registry as unknown as ViewRegistry,
      importingFile: sourceFileForSpecifierGeneration(fromFile),
      importingFilePath: fromFile.path,
      projectKey: this.projectPath as Path,
      program: this.autoImportProgram(),
      preferences: moduleSpecifierPreferences(this.userPreferences()),
      conditions: emptyConditionSet,
      fixProvider: autoImportFixProvider,
      tspath: {
        isDeclarationFileName: (fileName) => fileName.endsWith(".d.ts"),
        pathIsRelative,
        pathIsAbsolute,
        hasTSFileExtension,
        hasJSFileExtension,
        fileExtensionIsOneOf,
        extensionsNotSupportingExtensionlessResolution,
        isExternalModuleNameRelative,
      },
    });
  }

  private autoImportProgram(): AutoImportProgram {
    const program = this.program;
    return {
      options: () => {
        const options = program?.options?.();
        return {
          ...(isObject(options) ? options : {}),
          getResolvePackageJsonImports: optionMethod(options, "getResolvePackageJsonImports"),
          getResolvePackageJsonExports: optionMethod(options, "getResolvePackageJsonExports"),
          getPathsBasePath: optionMethod(options, "getPathsBasePath"),
          getAllowImportingTsExtensions: optionMethod(options, "getAllowImportingTsExtensions"),
          getModuleResolutionKind: optionMethod(options, "getModuleResolutionKind"),
        };
      },
      getCurrentDirectory: () => program?.getCurrentDirectory?.() ?? "",
      fileExists: (fileName: string) => this.host.fileExists(fileName),
      useCaseSensitiveFileNames: () => this.host.useCaseSensitiveFileNames(),
      getSymlinkCache: programMethod(program, "getSymlinkCache"),
      commonSourceDirectory: programMethod(program, "commonSourceDirectory"),
      getGlobalTypingsCacheLocation: programMethod(program, "getGlobalTypingsCacheLocation"),
      getProjectReferenceFromSource: programMethod(program, "getProjectReferenceFromSource"),
      getRedirectTargets: programMethod(program, "getRedirectTargets"),
      getSourceOfProjectReferenceIfOutputIncluded: programMethod(program, "getSourceOfProjectReferenceIfOutputIncluded"),
      getNearestAncestorDirectoryWithPackageJson: programMethod(program, "getNearestAncestorDirectoryWithPackageJson"),
      getPackageJsonInfo: programMethod(program, "getPackageJsonInfo"),
      getDefaultResolutionModeForFile: programMethod(program, "getDefaultResolutionModeForFile"),
      getResolvedModuleFromModuleSpecifier: programMethod(program, "getResolvedModuleFromModuleSpecifier"),
      getModeForUsageLocation: programMethod(program, "getModeForUsageLocation"),
    };
  }

  private sourceMapHost(): {
    useCaseSensitiveFileNames(): boolean;
    getECMALineInfo(fileName: string): ReturnType<typeof createECMALineInfo> | undefined;
    readFile(fileName: string): { readonly contents: string; readonly ok: boolean };
  } {
    return {
      useCaseSensitiveFileNames: () => this.host.useCaseSensitiveFileNames(),
      readFile: (fileName) => this.host.readFile(fileName),
      getECMALineInfo: (fileName) => {
        const info = this.host.getECMALineInfo(fileName);
        if (info === undefined) return undefined;
        const file = this.host.readFile(fileName);
        return createECMALineInfo(file.ok ? file.contents : "", info.lineStarts);
      },
    };
  }
}

function isLanguageServiceInit(value: Host | LanguageServiceInit): value is LanguageServiceInit {
  return "host" in value;
}

function documentUriFileName(uri: DocumentUri): string {
  return uri;
}

function sourceFileForSpecifierGeneration(sourceFile: SourceFile): SourceFileForSpecifierGeneration {
  return {
    path: () => sourceFile.path,
    fileName: () => sourceFile.fileName,
    imports: () => sourceFile.imports.filter(isStringLiteralLike) as unknown as readonly StringLiteralLike[],
    isJS: () => (sourceFile.flags & NodeFlags.JavaScriptFile) !== 0 || sourceFile.scriptKind === 1 || sourceFile.scriptKind === 2,
    sourceFile: () => sourceFile,
  } as SourceFileForSpecifierGeneration & { readonly sourceFile: () => SourceFile };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function optionMethod<T extends (...args: never[]) => unknown>(options: unknown, name: string): T {
  if (isObject(options) && typeof options[name] === "function") return options[name] as T;
  return missingMethod(`CompilerOptions.${name}`) as unknown as T;
}

function programMethod<T extends (...args: never[]) => unknown>(
  program: LanguageServiceProgram | undefined,
  name: keyof LanguageServiceProgram & string,
): T {
  const value = program?.[name];
  if (typeof value === "function") return value.bind(program) as T;
  return missingMethod(`Program.${name}`) as unknown as T;
}

function missingMethod(name: string): (...args: never[]) => never {
  return () => {
    throw new Error(`LanguageService requires ${name} for auto-import module-specifier generation`);
  };
}
