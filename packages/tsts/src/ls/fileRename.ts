/**
 * File-rename workspace edits.
 *
 * Concrete port of TS-Go `internal/ls/file_rename.go`.
 */

import {
  Kind,
  getExpression,
  isArrayLiteralExpression,
  isNoSubstitutionTemplateLiteral,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  nodeEnd,
  nodeName,
  nodeText,
  type Node as AstNode,
  type ObjectLiteralExpression,
  type PropertyAssignment,
  type SourceFile,
  type StringLiteralLike,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { newTextRange } from "../core/index.js";
import {
  documentUriFileName,
  type DocumentUri,
  type OptionalVersionedTextDocumentIdentifier,
  type Range,
  type RenameFile,
  type TextDocumentEdit,
  type TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile,
  type TextEdit,
  type TextEditOrAnnotatedTextEditOrSnippetTextEdit,
} from "../lsp/lsproto/index.js";
import {
  type CompilerOptions as ModuleSpecifierCompilerOptions,
  ImportModuleSpecifierEndingPreference,
  ImportModuleSpecifierPreference,
  ResolutionMode,
  updateModuleSpecifier,
  type ModuleSpecifierGenerationHost,
  type ModuleSpecifierOptions,
  type UserPreferences as ModuleSpecifierUserPreferences,
} from "../modulespecifiers/index.js";
import {
  optionDeclarations,
  type CommandLineOption,
} from "../tsoptions/index.js";
import * as tspath from "../tspath/index.js";
import {
  changeFullExtension,
  combinePaths,
  comparePaths,
  ensurePathIsNonModuleName,
  getDeclarationFileExtension,
  getDirectoryPath,
  getPossibleOriginalInputExtensionForExtension,
  getRelativePathFromDirectory,
  isDeclarationFileName,
  isExternalModuleNameRelative,
  normalizePath,
  startsWithDirectory,
} from "../tspath/index.js";
import { fileNameToDocumentURI, type LineMapCarrier } from "./lsconv/converters.js";
import { newTracker } from "./change/index.js";

export type PathUpdater = (path: string) => readonly [updatedPath: string, updated: boolean];

export interface ToImport {
  readonly newFileName: string;
  readonly updated: boolean;
}

export interface FileRenameHost {
  fileExists(path: string): boolean;
}

export interface FileRenameSourceFile extends SourceFile, LineMapCarrier {}

export interface FileRenameResolvedModule {
  readonly resolvedFileName: string;
}

export interface FileRenameChecker {
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined;
}

export interface FileRenameProgram extends ModuleSpecifierGenerationHost {
  options(): ModuleSpecifierCompilerOptions;
  getSourceFiles(): readonly FileRenameSourceFile[];
  getTypeChecker(context: unknown): { readonly checker: FileRenameChecker; readonly release: () => void };
  commandLine?(): FileRenameCommandLine | undefined;
  getResolvedModuleFromModuleSpecifier(sourceFile: FileRenameSourceFile, moduleSpecifier: StringLiteralLike): FileRenameResolvedModule | undefined;
  getModeForUsageLocation(sourceFile: FileRenameSourceFile, moduleSpecifier: StringLiteralLike): ResolutionMode;
}

export interface FileRenameConverters {
  positionToLineAndCharacter(file: LineMapCarrier, position: number): { readonly line: number; readonly character: number };
  toLSPRange?(file: LineMapCarrier, range: { readonly pos: number; readonly end: number }): Range;
}

export interface FileRenameChangeTracker {
  getChanges(): ReadonlyMap<string, readonly TextEdit[]>;
  replaceRangeWithText(fileName: string, range: Range, text: string): void;
  insertText?(fileName: string, position: { readonly line: number; readonly character: number }, text: string): void;
}

export interface FileRenameUserPreferences {
  readonly importModuleSpecifierPreference?: ModuleSpecifierUserPreferences["importModuleSpecifierPreference"];
  readonly importModuleSpecifierEnding?: ModuleSpecifierUserPreferences["importModuleSpecifierEnding"];
  readonly autoImportSpecifierExcludeRegexes?: readonly string[];
}

export interface FileRenameLanguageService {
  readonly host: FileRenameHost;
  readonly converters: FileRenameConverters;
  getProgram(): FileRenameProgram;
  formatOptions?(): { readonly newLine?: string };
  userPreferences(): FileRenameUserPreferences;
  useCaseSensitiveFileNames(): boolean;
  createChangeTracker?(): FileRenameChangeTracker;
}

export interface FileRenameCommandLine {
  readonly configFile?: FileRenameConfigFile | FileRenameTsConfigSourceFile;
  getMatchedIncludeSpec?(fileName: string): FileRenameIncludeSpecMatch | readonly [string, boolean] | string | undefined;
}

export interface FileRenameConfigFile {
  readonly sourceFile?: FileRenameTsConfigSourceFile;
}

export interface FileRenameTsConfigSourceFile extends FileRenameSourceFile {}

export interface FileRenameIncludeSpecMatch {
  readonly spec: string;
  readonly isDefault: boolean;
}

const compilerOptionsByName: ReadonlyMap<string, CommandLineOption> = new Map(
  optionDeclarations.map((option) => [option.name.toLowerCase(), option] as const),
);

export function getEditsForFileRename(
  service: FileRenameLanguageService,
  context: unknown,
  oldURI: DocumentUri,
  newURI: DocumentUri,
): readonly TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile[] {
  void context;
  const program = service.getProgram();
  const oldPath = documentUriFileName(oldURI);
  const newPath = documentUriFileName(newURI);

  const oldToNew = createPathUpdater(service, oldPath, newPath);
  const changeTracker = service.createChangeTracker?.() ?? newTracker(service.formatOptions?.().newLine);

  updateTsconfigFiles(service, program, changeTracker, oldToNew, oldPath, newPath);
  updateImportsForFileRename(service, program, changeTracker, oldToNew);

  const documentChanges: TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile[] = [];

  if (isDeclarationFileName(oldPath) && isDeclarationFileName(newPath)) {
    const declarationExtension = getDeclarationFileExtension(oldPath);
    const originalExtensions = getPossibleOriginalInputExtensionForExtension(declarationExtension);
    for (const extension of originalExtensions) {
      const oldOriginalPath = changeFullExtension(oldPath, extension);
      if (service.host.fileExists(oldOriginalPath)) {
        const newDeclarationExtension = getDeclarationFileExtension(oldPath);
        const newOriginalExtensions = getPossibleOriginalInputExtensionForExtension(newDeclarationExtension);
        if (newOriginalExtensions.includes(extension)) {
          const newOriginalPath = changeFullExtension(newPath, extension);
          documentChanges.push({ renameFile: renameFile(oldOriginalPath, newOriginalPath) });
        }
      }
    }
  }

  for (const [fileName, edits] of changeTracker.getChanges()) {
    const lspEdits = edits.map((edit) => ({ textEdit: edit }));
    documentChanges.push({
      textDocumentEdit: {
        textDocument: optionalVersionedTextDocumentIdentifier(fileName),
        edits: lspEdits,
      },
    });
  }

  return documentChanges;
}

export function createPathUpdater(
  service: Pick<FileRenameLanguageService, "useCaseSensitiveFileNames">,
  oldPath: string,
  newPath: string,
): PathUpdater {
  const useCaseSensitiveFileNames = service.useCaseSensitiveFileNames();
  const compareOptions = { currentDirectory: "", useCaseSensitiveFileNames };
  return (path: string): readonly [string, boolean] => {
    if (comparePaths(path, oldPath, compareOptions) === 0) {
      return [newPath, true];
    }
    if (startsWithDirectory(path, oldPath, useCaseSensitiveFileNames)) {
      return [newPath + path.slice(oldPath.length), true];
    }
    return ["", false];
  };
}

export function updateTsconfigFiles(
  service: FileRenameLanguageService,
  program: FileRenameProgram,
  changeTracker: FileRenameChangeTracker,
  oldToNew: PathUpdater,
  oldPath: string,
  newPath: string,
): void {
  const commandLine = program.commandLine?.();
  if (commandLine === undefined || commandLine.configFile === undefined) return;

  const configFile = getCommandLineConfigSourceFile(commandLine.configFile);
  if (configFile === undefined) return;

  const configDirectory = getDirectoryPath(configFile.fileName);
  const jsonObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
  if (jsonObjectLiteral === undefined) return;

  forEachObjectProperty(jsonObjectLiteral, (property, propertyName) => {
    switch (propertyName) {
      case "files":
      case "include":
      case "exclude": {
        const foundExactMatch = updatePathsProperty(
          configFile,
          configDirectory,
          property,
          changeTracker,
          oldToNew,
          service.converters,
          service.useCaseSensitiveFileNames(),
        );
        if (foundExactMatch || propertyName !== "include" || !isArrayLiteralExpression(property.initializer)) return;

        const oldSpec = getMatchedIncludeSpec(commandLine, oldPath);
        if (oldSpec.spec !== "" && !oldSpec.isDefault) {
          const newSpec = getMatchedIncludeSpec(commandLine, newPath);
          if (newSpec.spec === "" && property.initializer.elements.length > 0) {
            insertStringElementAfter(
              configFile,
              property.initializer.elements[property.initializer.elements.length - 1]!,
              changeTracker,
              service.converters,
              relativePathFromDirectory(configDirectory, newPath, service.useCaseSensitiveFileNames()),
            );
          }
        }
        return;
      }
      case "compilerOptions": {
        if (!isObjectLiteralExpression(property.initializer)) return;
        forEachObjectProperty(property.initializer, (compilerOptionProperty, compilerOptionName) => {
          const option = compilerOptionsByName.get(compilerOptionName.toLowerCase());
          const elementOption = option?.element ?? option?.elements?.();
          if (
            option !== undefined
            && (
              option.isFilePath === true
              || (option.type === "list" && elementOption !== undefined && elementOption.isFilePath === true)
            )
          ) {
            updatePathsProperty(
              configFile,
              configDirectory,
              compilerOptionProperty,
              changeTracker,
              oldToNew,
              service.converters,
              service.useCaseSensitiveFileNames(),
            );
            return;
          }

          if (compilerOptionName !== "paths" || !isObjectLiteralExpression(compilerOptionProperty.initializer)) return;
          forEachObjectProperty(compilerOptionProperty.initializer, (pathsProperty) => {
            if (!isArrayLiteralExpression(pathsProperty.initializer)) return;
            for (const element of pathsProperty.initializer.elements) {
              tryUpdateConfigString(
                configFile,
                configDirectory,
                element,
                changeTracker,
                oldToNew,
                service.converters,
                service.useCaseSensitiveFileNames(),
              );
            }
          });
        });
        return;
      }
    }
  });
}

export function updatePathsProperty(
  configFile: FileRenameTsConfigSourceFile,
  configDirectory: string,
  property: PropertyAssignment,
  changeTracker: FileRenameChangeTracker,
  oldToNew: PathUpdater,
  converters: FileRenameConverters,
  useCaseSensitiveFileNames: boolean,
): boolean {
  const elements = isArrayLiteralExpression(property.initializer)
    ? property.initializer.elements
    : [property.initializer];

  let foundExactMatch = false;
  for (const element of elements) {
    foundExactMatch = tryUpdateConfigString(
      configFile,
      configDirectory,
      element,
      changeTracker,
      oldToNew,
      converters,
      useCaseSensitiveFileNames,
    ) || foundExactMatch;
  }
  return foundExactMatch;
}

export function tryUpdateConfigString(
  configFile: FileRenameTsConfigSourceFile,
  configDirectory: string,
  element: AstNode,
  changeTracker: FileRenameChangeTracker,
  oldToNew: PathUpdater,
  converters: FileRenameConverters,
  useCaseSensitiveFileNames: boolean,
): boolean {
  if (!isStringLiteral(element)) return false;

  const elementFileName = normalizePath(combinePaths(configDirectory, nodeText(element)));
  const [updated, ok] = oldToNew(elementFileName);
  if (!ok) return false;

  changeTracker.replaceRangeWithText(
    configFile.fileName,
    toLSPRange(configFile, createStringTextRange(element), converters),
    relativePathFromDirectory(configDirectory, updated, useCaseSensitiveFileNames),
  );
  return true;
}

export function updateRelativePath(
  service: Pick<FileRenameLanguageService, "useCaseSensitiveFileNames">,
  oldToNew: PathUpdater,
  oldImportFromPath: string,
  newImportFromPath: string,
  relativeSpecifier: string,
): string {
  const oldAbsolute = normalizePath(combinePaths(getDirectoryPath(oldImportFromPath), relativeSpecifier));
  const [newPath, ok] = oldToNew(oldAbsolute);
  const newAbsolute = ok ? newPath : oldAbsolute;
  return relativeImportPathFromDirectory(
    getDirectoryPath(newImportFromPath),
    newAbsolute,
    service.useCaseSensitiveFileNames(),
  );
}

export function updateImportsForFileRename(
  service: FileRenameLanguageService,
  program: FileRenameProgram,
  changeTracker: FileRenameChangeTracker,
  oldToNew: PathUpdater,
): void {
  const allFiles = program.getSourceFiles();
  const checkerLease = program.getTypeChecker(undefined);
  try {
    const moduleSpecifierPreferences = getModuleSpecifierUserPreferences(service.userPreferences());

    for (const sourceFile of allFiles) {
      const oldFileName = sourceFile.fileName;
      const [newFromOld, fileMoved] = oldToNew(sourceFile.fileName);
      const newImportFromPath = fileMoved ? newFromOld : sourceFile.fileName;

      for (const reference of sourceFile.referencedFiles) {
        if (!isExternalModuleNameRelative(reference.fileName)) continue;
        const updated = updateRelativePath(service, oldToNew, oldFileName, newImportFromPath, reference.fileName);
        if (updated !== reference.fileName) {
          changeTracker.replaceRangeWithText(
            sourceFile.fileName,
            toLSPRange(sourceFile, reference, service.converters),
            updated,
          );
        }
      }

      for (const importStringLiteral of sourceFileImports(sourceFile)) {
        const updated = getUpdatedImportSpecifier(
          service,
          program,
          checkerLease.checker,
          sourceFile,
          importStringLiteral,
          oldToNew,
          newImportFromPath,
          fileMoved,
          moduleSpecifierPreferences,
        );
        if (updated !== "" && updated !== nodeText(importStringLiteral)) {
          changeTracker.replaceRangeWithText(
            sourceFile.fileName,
            toLSPRange(sourceFile, createStringTextRange(importStringLiteral), service.converters),
            updated,
          );
        }
      }
    }
  } finally {
    checkerLease.release();
  }
}

export function getUpdatedImportSpecifier(
  service: Pick<FileRenameLanguageService, "useCaseSensitiveFileNames">,
  program: FileRenameProgram,
  checker: FileRenameChecker,
  sourceFile: FileRenameSourceFile,
  importLiteral: StringLiteralLike,
  oldToNew: PathUpdater,
  newImportFromPath: string,
  importingSourceFileMoved: boolean,
  userPreferences: ModuleSpecifierUserPreferences,
): string {
  const importedModuleSymbol = checker.getSymbolAtLocation(importLiteral);
  if (isAmbientModuleSymbol(importedModuleSymbol)) return "";

  const target = getSourceFileToImport(program, sourceFile, importLiteral, oldToNew);
  if (target === undefined) {
    const updated = getUpdatedImportSpecifierFromMovedSourceFiles(
      program,
      sourceFile,
      importLiteral,
      oldToNew,
      newImportFromPath,
      userPreferences,
    );
    if (updated !== "" && updated !== nodeText(importLiteral)) return updated;
    if (isExternalModuleNameRelative(nodeText(importLiteral))) {
      return updateRelativePath(service, oldToNew, sourceFile.fileName, newImportFromPath, nodeText(importLiteral));
    }
    return "";
  }

  if (!target.updated && !(importingSourceFileMoved && isExternalModuleNameRelative(nodeText(importLiteral)))) {
    return "";
  }

  return updateModuleSpecifier(
    program.options(),
    program,
    sourceFile,
    newImportFromPath,
    nodeText(importLiteral),
    target.newFileName,
    userPreferences,
    moduleSpecifierOptions(program, sourceFile, importLiteral),
    tspath,
  );
}

export function getSourceFileToImport(
  program: FileRenameProgram,
  sourceFile: FileRenameSourceFile,
  importLiteral: StringLiteralLike,
  oldToNew: PathUpdater,
): ToImport | undefined {
  const resolved = program.getResolvedModuleFromModuleSpecifier(sourceFile, importLiteral);
  if (resolved !== undefined && resolved.resolvedFileName !== "") {
    const oldFileName = resolved.resolvedFileName;
    const [newFileName, updated] = oldToNew(oldFileName);
    if (updated) return { newFileName, updated: true };
    return { newFileName: oldFileName, updated: false };
  }
  return undefined;
}

export function getUpdatedImportSpecifierFromMovedSourceFiles(
  program: FileRenameProgram,
  sourceFile: FileRenameSourceFile,
  importLiteral: StringLiteralLike,
  oldToNew: PathUpdater,
  importingSourceFileName: string,
  userPreferences: ModuleSpecifierUserPreferences,
): string {
  const resolutionMode = program.getModeForUsageLocation(sourceFile, importLiteral);
  for (const candidate of program.getSourceFiles()) {
    const [newFileName, ok] = oldToNew(candidate.fileName);
    if (!ok) continue;

    const options: ModuleSpecifierOptions = { overrideImportMode: resolutionMode };
    const oldSpecifier = updateModuleSpecifier(
      program.options(),
      program,
      sourceFile,
      importingSourceFileName,
      nodeText(importLiteral),
      candidate.fileName,
      userPreferences,
      options,
      tspath,
    );
    if (oldSpecifier !== nodeText(importLiteral)) continue;

    return updateModuleSpecifier(
      program.options(),
      program,
      sourceFile,
      importingSourceFileName,
      nodeText(importLiteral),
      newFileName,
      userPreferences,
      options,
      tspath,
    );
  }
  return "";
}

export function createStringTextRange(node: AstNode): { readonly pos: number; readonly end: number } {
  return newTextRange(node.pos + 1, node.end - 1);
}

export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: SourceFile | undefined): ObjectLiteralExpression | undefined {
  if (tsConfigSourceFile !== undefined && tsConfigSourceFile.statements.length > 0) {
    const firstStatement = tsConfigSourceFile.statements[0];
    if (firstStatement !== undefined) {
      const expression = getExpression(firstStatement);
      if (expression !== undefined && isObjectLiteralExpression(expression)) return expression;
    }
  }
  return undefined;
}

export function forEachObjectProperty(
  objectLiteral: ObjectLiteralExpression | undefined,
  callback: (property: PropertyAssignment, propertyName: string) => void,
): void {
  if (objectLiteral === undefined) return;
  for (const property of objectLiteral.properties) {
    if (!isPropertyAssignment(property)) continue;
    const name = tryGetTextOfPropertyName(nodeName(property));
    if (name !== undefined) callback(property, name);
  }
}

export function relativePathFromDirectory(
  fromDirectory: string,
  to: string,
  useCaseSensitiveFileNames: boolean,
): string {
  return getRelativePathFromDirectory(fromDirectory, to, {
    currentDirectory: "",
    useCaseSensitiveFileNames,
  });
}

export function relativeImportPathFromDirectory(
  fromDirectory: string,
  to: string,
  useCaseSensitiveFileNames: boolean,
): string {
  return ensurePathIsNonModuleName(relativePathFromDirectory(fromDirectory, to, useCaseSensitiveFileNames));
}

export function isAmbientModuleSymbol(symbol: AstSymbol | undefined): boolean {
  if (symbol === undefined) return false;
  for (const declaration of symbol.declarations) {
    if (isModuleWithStringLiteralName(declaration)) return true;
  }
  return false;
}

function getCommandLineConfigSourceFile(configFile: FileRenameConfigFile | FileRenameTsConfigSourceFile): FileRenameTsConfigSourceFile | undefined {
  if (isSourceFile(configFile)) return configFile;
  return configFile.sourceFile;
}

function getMatchedIncludeSpec(commandLine: FileRenameCommandLine, fileName: string): FileRenameIncludeSpecMatch {
  const match = commandLine.getMatchedIncludeSpec?.(fileName);
  if (match === undefined) return { spec: "", isDefault: false };
  if (typeof match === "string") return { spec: match, isDefault: false };
  if (isIncludeSpecTuple(match)) return { spec: match[0] ?? "", isDefault: match[1] ?? false };
  return match;
}

function insertStringElementAfter(
  configFile: FileRenameTsConfigSourceFile,
  afterElement: AstNode,
  changeTracker: FileRenameChangeTracker,
  converters: FileRenameConverters,
  value: string,
): void {
  const position = converters.positionToLineAndCharacter(configFile, nodeEnd(afterElement));
  const quoted = JSON.stringify(value);
  const text = `, ${quoted}`;
  if (changeTracker.insertText !== undefined) {
    changeTracker.insertText(configFile.fileName, position, text);
    return;
  }
  changeTracker.replaceRangeWithText(configFile.fileName, { start: position, end: position }, text);
}

function getModuleSpecifierUserPreferences(preferences: FileRenameUserPreferences): ModuleSpecifierUserPreferences {
  return {
    importModuleSpecifierPreference: preferences.importModuleSpecifierPreference ?? ImportModuleSpecifierPreference.None,
    importModuleSpecifierEnding: preferences.importModuleSpecifierEnding ?? ImportModuleSpecifierEndingPreference.None,
    autoImportSpecifierExcludeRegexes: preferences.autoImportSpecifierExcludeRegexes ?? [],
  };
}

function moduleSpecifierOptions(
  program: FileRenameProgram,
  sourceFile: FileRenameSourceFile,
  importLiteral: StringLiteralLike,
): ModuleSpecifierOptions {
  return { overrideImportMode: program.getModeForUsageLocation(sourceFile, importLiteral) };
}

function sourceFileImports(sourceFile: FileRenameSourceFile): readonly StringLiteralLike[] {
  return sourceFile.imports.filter(isStringLiteralLikeNode);
}

function isStringLiteralLikeNode(node: AstNode): node is StringLiteralLike {
  return isStringLiteral(node) || isNoSubstitutionTemplateLiteral(node);
}

function tryGetTextOfPropertyName(name: AstNode | undefined): string | undefined {
  if (name === undefined) return undefined;
  switch (name.kind) {
    case Kind.Identifier:
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return nodeText(name);
    default:
      return undefined;
  }
}

function isModuleWithStringLiteralName(node: AstNode): boolean {
  return isStringLiteralLikeNode(nodeName(node) ?? node);
}

function toLSPRange(
  file: LineMapCarrier,
  range: { readonly pos: number; readonly end: number },
  converters: FileRenameConverters,
): Range {
  if (converters.toLSPRange !== undefined) return converters.toLSPRange(file, range);
  return {
    start: converters.positionToLineAndCharacter(file, range.pos),
    end: converters.positionToLineAndCharacter(file, range.end),
  };
}

function optionalVersionedTextDocumentIdentifier(fileName: string): OptionalVersionedTextDocumentIdentifier {
  return { uri: fileNameToDocumentURI(fileName), version: {} };
}

function renameFile(oldPath: string, newPath: string): RenameFile {
  return {
    kind: "rename",
    oldUri: fileNameToDocumentURI(oldPath),
    newUri: fileNameToDocumentURI(newPath),
  };
}

function isSourceFile(value: FileRenameConfigFile | FileRenameTsConfigSourceFile): value is FileRenameTsConfigSourceFile {
  return (value as { readonly kind?: unknown }).kind === Kind.SourceFile;
}

function isIncludeSpecTuple(value: readonly [string, boolean] | FileRenameIncludeSpecMatch | string): value is readonly [string, boolean] {
  return Array.isArray(value);
}

export type { TextDocumentEdit, TextEditOrAnnotatedTextEditOrSnippetTextEdit };
