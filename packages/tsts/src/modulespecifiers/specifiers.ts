/**
 * Module-specifier generation — top-level entry points and dispatch logic.
 *
 * Port of TS-Go `internal/modulespecifiers/specifiers.go` (1397 LoC).
 *
 * This file mirrors the upstream Go semantics line-for-line. References
 * to subsystems not yet ported to TSTS (`module`, `outputpaths`,
 * `packagejson` advanced cache, `core.CompilerOptions`, deep `tspath`
 * helpers) are kept under their upstream names; the implementations
 * land as those subsystems arrive.
 *
 * Notation: where TS-Go uses `*ast.Symbol`, this file uses
 * `AstSymbol | undefined`; where Go uses `[]string`, TS uses
 * `readonly string[]`; where Go uses `string` for path values, TS
 * uses `string` (no separate `Path` type until tspath ports its
 * branded primitive).
 */

import type {
  Node as AstNode,
  SourceFile,
  StringLiteralLike,
  Symbol as AstSymbol,
} from "../ast/index.js";

import {
  getDirectoryPath, ensureTrailingDirectorySeparator,
  removeTrailingDirectorySeparator, combinePaths,
  normalizePath, containsPath, startsWithDirectory,
  fileExtensionIsOneOf, removeFileExtension, removeExtension,
  getBaseFileName, isDeclarationFileName, isRootedDiskPath,
  tryGetExtensionFromPath, changeExtension, resolvePath,
} from "../tspath/index.js";

import {
  countPathComponents,
  ensurePathIsNonModuleName,
  getJSExtensionForDeclarationFileExtension,
  getNodeModulePathParts,
  getPathsRelativeToRootDirs,
  isExcludedByRegex,
  isPathRelativeToParent,
  type NodeModulePathParts,
  packageJsonPathsAreEqual,
  pathIsBareSpecifier,
  prefersTsExtension,
  replaceFirstStar,
  stringToRegex,
  tryGetRealFileNameForNonJSDeclarationFileName,
  type ResolvedEntrypoint,
} from "./util.js";

import {
  type CheckerShape,
  type ImportModuleSpecifierEndingPreference,
  ImportModuleSpecifierEndingPreference as IMEP,
  type ImportModuleSpecifierPreference,
  ImportModuleSpecifierPreference as IMSP,
  type MatchingMode,
  MatchingMode as MM,
  type ModulePath,
  type ModuleSpecifierEnding,
  ModuleSpecifierEnding as MSE,
  type ModuleSpecifierGenerationHost,
  type ModuleSpecifierOptions,
  type ResolutionMode,
  ResolutionMode as RM,
  type ResultKind,
  ResultKind as RK,
  type RelativePreferenceKind,
  RelativePreferenceKind as RPK,
  type SourceFileForSpecifierGeneration,
  type UserPreferences,
} from "./types.js";

import {
  type CompilerOptionsForSpecifiers,
  getAllowedEndingsInPreferredOrder,
  getModuleSpecifierPreferences,
  type ModuleResolutionKind,
  ModuleResolutionKind as MRK,
  type ModuleSpecifierPreferences,
  shouldAllowImportingTsExtension,
  type TspathHelpers,
} from "./preferences.js";

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface used by specifier generation.
// These are minimal contracts; implementations land with the corresponding
// TSTS subsystems.
// ---------------------------------------------------------------------------

/**
 * Forward-declared `core.CompilerOptions` subset needed here. Captures
 * the `paths`, `rootDirs`, `configFilePath`, package-json-imports/exports
 * flags, and helpers TS-Go reads directly.
 */
export interface CompilerOptions extends CompilerOptionsForSpecifiers {
  readonly paths?: ReadonlyMap<string, readonly string[]>;
  readonly rootDirs?: readonly string[];
  readonly configFilePath?: string;
  getResolvePackageJsonImports(): boolean;
  getResolvePackageJsonExports(): boolean;
  getPathsBasePath(currentDirectory: string): string;
}

/**
 * Forward-declared `packagejson.ExportsOrImports`. The `type` field
 * matches TS-Go's `JSONValueType` enum used to dispatch on the shape
 * of the exports/imports entry.
 */
export type JSONValueType =
  | "not-present"
  | "null"
  | "string"
  | "array"
  | "object";

export interface ExportsOrImports {
  readonly type: JSONValueType;
  readonly value: string | readonly ExportsOrImports[] | ExportsOrImportsObject | null;
  isSubpaths(): boolean;
  asObject(): ExportsOrImportsObject;
  asArray(): readonly ExportsOrImports[];
}

export interface ExportsOrImportsObject {
  entries(): IterableIterator<readonly [string, ExportsOrImports]>;
}

/**
 * Forward-declared `module.ResolvedModule` subset.
 */
export interface ResolvedModule {
  readonly resolvedFileName: string;
  isResolved(): boolean;
}

// ResolvedEntrypoint lives in ./util.ts — single definition there.

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns module specifier strings for `moduleSymbol`. Mirrors
 * TS-Go `GetModuleSpecifiers`.
 */
export function getModuleSpecifiers(
  moduleSymbol: AstSymbol,
  checker: CheckerShape,
  compilerOptions: CompilerOptions,
  importingSourceFile: SourceFileForSpecifierGeneration,
  host: ModuleSpecifierGenerationHost,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  forAutoImports: boolean,
  tspath: TspathHelpers,
): readonly string[] {
  const [result] = getModuleSpecifiersWithInfo(
    moduleSymbol,
    checker,
    compilerOptions,
    importingSourceFile,
    host,
    userPreferences,
    options,
    forAutoImports,
    tspath,
  );
  return result;
}

/**
 * Returns module specifier strings + the resolved result kind for
 * `moduleSymbol`. Mirrors TS-Go `GetModuleSpecifiersWithInfo`.
 */
export function getModuleSpecifiersWithInfo(
  moduleSymbol: AstSymbol,
  checker: CheckerShape,
  compilerOptions: CompilerOptions,
  importingSourceFile: SourceFileForSpecifierGeneration,
  host: ModuleSpecifierGenerationHost,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  forAutoImports: boolean,
  tspath: TspathHelpers,
): readonly [readonly string[], ResultKind] {
  const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol, checker, tspath);
  if (ambient.length > 0) {
    if (forAutoImports && isExcludedByRegex(ambient, userPreferences.autoImportSpecifierExcludeRegexes)) {
      return [[], RK.Ambient];
    }
    return [[ambient], RK.Ambient];
  }

  const moduleSourceFile = getSourceFileOfModule(moduleSymbol);
  if (moduleSourceFile === undefined) {
    return [[], RK.None];
  }

  // Use original source file name when file is from project reference output.
  const moduleFileName = host.getSourceOfProjectReferenceIfOutputIncluded(moduleSourceFile);

  return getModuleSpecifiersForFileWithInfo(
    importingSourceFile,
    moduleFileName,
    compilerOptions,
    host,
    userPreferences,
    options,
    forAutoImports,
    tspath,
  );
}

/**
 * Like `getModuleSpecifiersWithInfo` but with the module file name
 * provided directly. Mirrors TS-Go `GetModuleSpecifiersForFileWithInfo`.
 */
export function getModuleSpecifiersForFileWithInfo(
  importingSourceFile: SourceFileForSpecifierGeneration,
  moduleFileName: string,
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  forAutoImports: boolean,
  tspath: TspathHelpers,
): readonly [readonly string[], ResultKind] {
  const modulePaths = getAllModulePathsWorker(
    getInfo(host.getSourceOfProjectReferenceIfOutputIncluded(importingSourceFile), host),
    moduleFileName,
    host,
    compilerOptions,
    options,
    tspath,
  );

  return computeModuleSpecifiers(
    modulePaths,
    compilerOptions,
    importingSourceFile,
    host,
    userPreferences,
    options,
    forAutoImports,
    tspath,
  );
}

// ---------------------------------------------------------------------------
// Ambient-module detection
// ---------------------------------------------------------------------------

/**
 * If `moduleSymbol` resolves through a `declare module "..."` ambient
 * declaration, returns the module name string. Otherwise returns "".
 *
 * Mirrors TS-Go `tryGetModuleNameFromAmbientModule`.
 */
export function tryGetModuleNameFromAmbientModule(
  moduleSymbol: AstSymbol,
  checker: CheckerShape,
  tspath: TspathHelpers,
): string {
  for (const decl of moduleSymbol.declarations ?? []) {
    if (
      isModuleWithStringLiteralName(decl) &&
      (!isModuleAugmentationExternal(decl) || !tspath.isExternalModuleNameRelative(declName(decl)))
    ) {
      return declName(decl);
    }
  }

  // The module could be a namespace exported through `export = ns` from
  // an ambient module:
  //
  //   declare module "m" {
  //     namespace ns { class c {} }
  //     export = ns;
  //   }
  //
  // `import { c } from "m";` is valid, in which case `moduleSymbol` is
  // "ns" but the module name should be "m".
  for (const d of moduleSymbol.declarations ?? []) {
    if (!isModuleDeclaration(d)) continue;

    const possibleContainer = findAncestor(d, isModuleWithStringLiteralName);
    if (possibleContainer === undefined || possibleContainer.parent === undefined || !isSourceFile(possibleContainer.parent)) {
      continue;
    }

    const sym = symbolExports(possibleContainer)?.get(InternalSymbolNameExportEquals);
    if (sym === undefined) continue;
    const exportAssignmentDecl = sym.valueDeclaration;
    if (exportAssignmentDecl === undefined || exportAssignmentDecl.kind !== KindExportAssignment) {
      continue;
    }
    let exportSymbol = checker.getSymbolAtLocation(exportAssignmentDeclExpression(exportAssignmentDecl));
    if (exportSymbol === undefined) continue;
    if (((exportSymbol.flags ?? 0) & SymbolFlagsAlias) !== 0) {
      const aliased = checker.getAliasedSymbol(exportSymbol);
      if (aliased !== undefined) exportSymbol = aliased;
    }
    if (exportSymbol === declSymbol(d)) {
      return declName(possibleContainer);
    }
  }
  return "";
}

// ---------------------------------------------------------------------------
// All-paths discovery
// ---------------------------------------------------------------------------

export interface Info {
  readonly useCaseSensitiveFileNames: boolean;
  readonly importingSourceFileName: string;
  readonly sourceDirectory: string;
}

export function getInfo(importingSourceFileName: string, host: ModuleSpecifierGenerationHost): Info {
  const sourceDirectory = getDirectoryPath(importingSourceFileName);
  return {
    importingSourceFileName,
    sourceDirectory,
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
  };
}

/**
 * Returns every fully-qualified file path that could refer to
 * `importedFileName`, including symlink alternatives, sorted by
 * proximity to the importing file. Mirrors TS-Go
 * `getAllModulePathsWorker`.
 */
export function getAllModulePathsWorker(
  info: Info,
  importedFileName: string,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptions,
  options: ModuleSpecifierOptions,
  tspath: TspathHelpers,
): readonly ModulePath[] {
  const allFileNames = new Map<string, ModulePath>();
  const paths = getEachFileNameOfModule(info.importingSourceFileName, importedFileName, host, true, tspath);
  for (const p of paths) {
    allFileNames.set(p.fileName, p);
  }

  const useCaseSensitiveFileNames = info.useCaseSensitiveFileNames;
  const compareModulePaths = (a: ModulePath, b: ModulePath): number =>
    comparePathsByRedirectInternal(a, b, useCaseSensitiveFileNames);

  // Sort by paths closest to importing file Name directory.
  const sortedPaths: ModulePath[] = [];
  let directory = info.sourceDirectory;
  while (allFileNames.size !== 0) {
    const directoryStart = ensureTrailingDirectorySeparator(directory);
    const pathsInDirectory: ModulePath[] = [];
    for (const [fileName, p] of allFileNames) {
      if (fileName.startsWith(directoryStart)) {
        pathsInDirectory.push(p);
        allFileNames.delete(fileName);
      }
    }
    if (pathsInDirectory.length > 0) {
      pathsInDirectory.sort(compareModulePaths);
      sortedPaths.push(...pathsInDirectory);
    }
    const newDirectory = getDirectoryPath(directory);
    if (newDirectory === directory) break;
    directory = newDirectory;
  }
  if (allFileNames.size > 0) {
    const remainingPaths = [...allFileNames.values()];
    remainingPaths.sort(compareModulePaths);
    sortedPaths.push(...remainingPaths);
  }
  return sortedPaths;
}

function comparePathsByRedirectInternal(a: ModulePath, b: ModulePath, useCaseSensitiveFileNames: boolean): number {
  if (a.isRedirect === b.isRedirect) {
    return comparePathsSimple(a.fileName, b.fileName, useCaseSensitiveFileNames);
  }
  return a.isRedirect ? 1 : -1;
}

/**
 * Local optimization of `tspath.ContainsIgnoredPath`. Mirrors TS-Go
 * `containsIgnoredPath`.
 */
function containsIgnoredPath(s: string): boolean {
  return s.includes("/node_modules/.") || s.includes("/.git") || s.includes(".#");
}

/**
 * Returns true if `s` contains a `node_modules` segment. Mirrors
 * TS-Go `ContainsNodeModules`.
 */
export function containsNodeModules(s: string): boolean {
  return s.includes("/node_modules/");
}

/**
 * Returns all possible file paths for a module, including symlink
 * alternatives. Mirrors TS-Go `GetEachFileNameOfModule`.
 */
export function getEachFileNameOfModule(
  importingFileName: string,
  importedFileName: string,
  host: ModuleSpecifierGenerationHost,
  preferSymlinks: boolean,
  tspath: TspathHelpers,
): readonly ModulePath[] {
  const cwd = host.getCurrentDirectory();
  const importedPath = toPath(importedFileName, cwd, host.useCaseSensitiveFileNames());
  let referenceRedirect = "";
  const outputAndReference = host.getProjectReferenceFromSource(importedPath);
  if (outputAndReference !== undefined && (outputAndReference as { outputDts?: string }).outputDts !== undefined && (outputAndReference as { outputDts: string }).outputDts !== "") {
    referenceRedirect = (outputAndReference as { outputDts: string }).outputDts;
  }

  const redirects = host.getRedirectTargets(importedPath);
  const importedFileNames: string[] = [];
  if (referenceRedirect.length > 0) importedFileNames.push(referenceRedirect);
  importedFileNames.push(importedFileName);
  importedFileNames.push(...redirects);
  const targets = importedFileNames.map((f) => getNormalizedAbsolutePath(f, cwd));
  let shouldFilterIgnoredPaths = !targets.every(containsIgnoredPath);

  const results: ModulePath[] = [];
  if (!preferSymlinks) {
    for (const p of targets) {
      if (!(shouldFilterIgnoredPaths && containsIgnoredPath(p))) {
        results.push({
          fileName: p,
          isInNodeModules: containsNodeModules(p),
          isRedirect: referenceRedirect === p,
        });
      }
    }
  }

  // Symlink-cache walk: this branch maps to TS-Go's
  // `tspath.ForEachAncestorDirectoryStoppingAtGlobalCache` traversal.
  // The symlink cache shape lands with the `symlinks` port; for now we
  // capture the surface as a forward declaration.
  const symlinkCache = host.getSymlinkCache();
  const fullImportedFileName = getNormalizedAbsolutePath(importedFileName, cwd);
  if (symlinkCache !== undefined && symlinkCache !== null) {
    forEachAncestorDirectoryStoppingAtGlobalCache(
      host.getGlobalTypingsCacheLocation(),
      getDirectoryPath(fullImportedFileName),
      (realPathDirectory: string): { readonly stop: boolean; readonly value: boolean } => {
        const directoriesByRealpath = (symlinkCache as { directoriesByRealpath(): { load(key: string): { readonly value: { range(fn: (symlinkDir: string) => boolean): void }; readonly ok: boolean } } }).directoriesByRealpath();
        const symlinkLoad = directoriesByRealpath.load(
          ensureTrailingDirectorySeparator(toPath(realPathDirectory, cwd, host.useCaseSensitiveFileNames())),
        );
        if (!symlinkLoad.ok) {
          return { stop: false, value: false };
        }
        // Don't allow a package to globally import from itself.
        if (startsWithDirectory(importingFileName, realPathDirectory, host.useCaseSensitiveFileNames())) {
          return { stop: true, value: false };
        }
        for (const target of targets) {
          if (!startsWithDirectory(target, realPathDirectory, host.useCaseSensitiveFileNames())) continue;
          const relative = getRelativePathFromDirectory(realPathDirectory, target, {
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
            currentDirectory: cwd,
          });
          symlinkLoad.value.range((symlinkDirectory: string): boolean => {
            const option = resolvePath(symlinkDirectory, relative);
            results.push({
              fileName: option,
              isInNodeModules: containsNodeModules(option),
              isRedirect: target === referenceRedirect,
            });
            shouldFilterIgnoredPaths = true;
            return true;
          });
        }
        return { stop: false, value: false };
      },
    );
  }

  if (preferSymlinks) {
    for (const p of targets) {
      if (!(shouldFilterIgnoredPaths && containsIgnoredPath(p))) {
        results.push({
          fileName: p,
          isInNodeModules: containsNodeModules(p),
          isRedirect: referenceRedirect === p,
        });
      }
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Specifier computation
// ---------------------------------------------------------------------------

/**
 * Given the discovered module paths, produces specifier strings ranked
 * by preference. Mirrors TS-Go `computeModuleSpecifiers`.
 */
export function computeModuleSpecifiers(
  modulePaths: readonly ModulePath[],
  compilerOptions: CompilerOptions,
  importingSourceFile: SourceFileForSpecifierGeneration,
  host: ModuleSpecifierGenerationHost,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  forAutoImport: boolean,
  tspath: TspathHelpers,
): readonly [readonly string[], ResultKind] {
  const info = getInfo(importingSourceFile.fileName(), host);
  const preferences = getModuleSpecifierPreferences(
    userPreferences,
    host,
    compilerOptions,
    importingSourceFile,
    "",
    tspath,
  );

  let existingSpecifier = "";
  for (const modulePath of modulePaths) {
    const targetPath = toPath(modulePath.fileName, host.getCurrentDirectory(), info.useCaseSensitiveFileNames);
    let existingImport: StringLiteralLike | undefined;
    for (const importSpecifier of importingSourceFile.imports()) {
      const resolvedModule = host.getResolvedModuleFromModuleSpecifier(importingSourceFile, importSpecifier) as ResolvedModule | undefined;
      if (resolvedModule !== undefined && resolvedModule.isResolved() &&
        toPath(resolvedModule.resolvedFileName, host.getCurrentDirectory(), info.useCaseSensitiveFileNames) === targetPath) {
        existingImport = importSpecifier;
        break;
      }
    }
    if (existingImport !== undefined) {
      if (preferences.relativePreference === RPK.NonRelative && tspath.pathIsRelative(existingImport.text)) {
        continue;
      }
      const existingMode = host.getModeForUsageLocation(importingSourceFile, existingImport);
      let targetMode = options.overrideImportMode;
      if (targetMode === RM.None) {
        targetMode = host.getDefaultResolutionModeForFile(importingSourceFile);
      }
      if (existingMode !== targetMode && existingMode !== RM.None && targetMode !== RM.None) {
        continue;
      }
      existingSpecifier = existingImport.text;
      break;
    }
  }

  if (existingSpecifier !== "") {
    return [[existingSpecifier], RK.None];
  }

  const importedFileIsInNodeModules = modulePaths.some((p) => p.isInNodeModules);

  // Priority:
  //   1. Bare package specifiers via package.json types entry
  //   2. paths-driven specifiers
  //   3. Non-relative specifiers via node_modules
  //   4. Relative paths
  const pathsSpecifiers: string[] = [];
  const redirectPathsSpecifiers: string[] = [];
  const nodeModulesSpecifiers: string[] = [];
  const relativeSpecifiers: string[] = [];

  for (const modulePath of modulePaths) {
    let specifier = "";
    if (modulePath.isInNodeModules) {
      specifier = tryGetModuleNameAsNodeModule(
        modulePath,
        info,
        importingSourceFile,
        host,
        compilerOptions,
        userPreferences,
        false,
        options.overrideImportMode,
        tspath,
      );
    }
    if (specifier.length > 0 && !(forAutoImport && isExcludedByRegex(specifier, preferences.excludeRegexes))) {
      nodeModulesSpecifiers.push(specifier);
      if (modulePath.isRedirect) {
        return [nodeModulesSpecifiers, RK.NodeModules];
      }
    }

    let importMode = options.overrideImportMode;
    if (importMode === RM.None) {
      importMode = host.getDefaultResolutionModeForFile(importingSourceFile);
    }
    const local = getLocalModuleSpecifier(
      modulePath.fileName,
      info,
      compilerOptions,
      host,
      importMode,
      preferences,
      modulePath.isRedirect || specifier.length > 0,
      tspath,
    );
    if (local.length === 0 || (forAutoImport && isExcludedByRegex(local, preferences.excludeRegexes))) {
      continue;
    }
    if (modulePath.isRedirect) {
      redirectPathsSpecifiers.push(local);
    } else if (pathIsBareSpecifier(local, tspath.pathIsAbsolute ?? ((p) => p.startsWith("/")), tspath.pathIsRelative)) {
      if (containsNodeModules(local)) {
        relativeSpecifiers.push(local);
      } else {
        pathsSpecifiers.push(local);
      }
    } else if (forAutoImport || !importedFileIsInNodeModules || modulePath.isInNodeModules) {
      relativeSpecifiers.push(local);
    }
  }

  if (pathsSpecifiers.length > 0) return [pathsSpecifiers, RK.Paths];
  if (redirectPathsSpecifiers.length > 0) return [redirectPathsSpecifiers, RK.Redirect];
  if (nodeModulesSpecifiers.length > 0) return [nodeModulesSpecifiers, RK.NodeModules];
  return [relativeSpecifiers, RK.Relative];
}

/**
 * Constructs a "local" module specifier (relative or via baseUrl/paths).
 * Mirrors TS-Go `getLocalModuleSpecifier`.
 */
export function getLocalModuleSpecifier(
  moduleFileName: string,
  info: Info,
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  importMode: ResolutionMode,
  preferences: ModuleSpecifierPreferences,
  pathsOnly: boolean,
  tspath: TspathHelpers,
): string {
  const paths = compilerOptions.paths;
  const rootDirs = compilerOptions.rootDirs;

  if (pathsOnly && paths === undefined) return "";

  const sourceDirectory = info.sourceDirectory;
  const allowedEndings = preferences.getAllowedEndingsInPreferredOrder(importMode);
  let relativePath = "";
  if (rootDirs !== undefined && rootDirs.length > 0) {
    relativePath = tryGetModuleNameFromRootDirs(
      rootDirs,
      moduleFileName,
      sourceDirectory,
      allowedEndings,
      compilerOptions,
      host,
      tspath,
    );
  }
  if (relativePath.length === 0) {
    relativePath = processEnding(
      ensurePathIsNonModuleName(
        getRelativePathFromDirectory(sourceDirectory, moduleFileName, {
          useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
          currentDirectory: host.getCurrentDirectory(),
        }),
        tspath.pathIsAbsolute ?? ((p) => p.startsWith("/")),
        tspath.pathIsRelative,
      ),
      allowedEndings,
      compilerOptions,
      host,
      tspath,
    );
  }

  if ((paths === undefined && !compilerOptions.getResolvePackageJsonImports()) || preferences.relativePreference === RPK.Relative) {
    if (pathsOnly) return "";
    return relativePath;
  }

  const root = compilerOptions.getPathsBasePath(host.getCurrentDirectory());
  const baseDirectory = getNormalizedAbsolutePath(root, host.getCurrentDirectory());
  const relativeToBaseUrl = getRelativePathIfInSameVolume(moduleFileName, baseDirectory, host.useCaseSensitiveFileNames());
  if (relativeToBaseUrl.length === 0) {
    if (pathsOnly) return "";
    return relativePath;
  }

  let fromPackageJsonImports = "";
  if (!pathsOnly) {
    fromPackageJsonImports = tryGetModuleNameFromPackageJsonImports(
      moduleFileName,
      sourceDirectory,
      compilerOptions,
      host,
      importMode,
      prefersTsExtension(allowedEndings),
      tspath,
    );
  }

  let fromPaths = "";
  if ((pathsOnly || fromPackageJsonImports.length === 0) && paths !== undefined) {
    fromPaths = tryGetModuleNameFromPaths(
      relativeToBaseUrl,
      paths,
      allowedEndings,
      baseDirectory,
      host,
      compilerOptions,
      tspath,
    );
  }

  if (pathsOnly) return fromPaths;

  const maybeNonRelative = fromPackageJsonImports.length > 0 ? fromPackageJsonImports : fromPaths;
  if (maybeNonRelative.length === 0) return relativePath;

  const relativeIsExcluded = isExcludedByRegex(relativePath, preferences.excludeRegexes);
  const nonRelativeIsExcluded = isExcludedByRegex(maybeNonRelative, preferences.excludeRegexes);
  if (!relativeIsExcluded && nonRelativeIsExcluded) return relativePath;
  if (relativeIsExcluded && !nonRelativeIsExcluded) return maybeNonRelative;

  if (preferences.relativePreference === RPK.NonRelative && !tspath.pathIsRelative(maybeNonRelative)) {
    return maybeNonRelative;
  }

  if (preferences.relativePreference === RPK.ExternalNonRelative && !tspath.pathIsRelative(maybeNonRelative)) {
    const projectDirectory = compilerOptions.configFilePath !== undefined && compilerOptions.configFilePath.length > 0
      ? toPath(compilerOptions.configFilePath, host.getCurrentDirectory(), host.useCaseSensitiveFileNames())
      : toPath(host.getCurrentDirectory(), host.getCurrentDirectory(), host.useCaseSensitiveFileNames());
    const canonicalSourceDirectory = toPath(sourceDirectory, host.getCurrentDirectory(), host.useCaseSensitiveFileNames());
    const modulePath = toPath(moduleFileName, projectDirectory, host.useCaseSensitiveFileNames());

    const sourceIsInternal = canonicalSourceDirectory.startsWith(projectDirectory);
    const targetIsInternal = modulePath.startsWith(projectDirectory);
    if ((sourceIsInternal && !targetIsInternal) || (!sourceIsInternal && targetIsInternal)) {
      return maybeNonRelative;
    }

    const nearestTargetPackageJson = host.getNearestAncestorDirectoryWithPackageJson(getDirectoryPath(modulePath));
    const nearestSourcePackageJson = host.getNearestAncestorDirectoryWithPackageJson(sourceDirectory);

    if (!packageJsonPathsAreEqual(nearestTargetPackageJson, nearestSourcePackageJson, (a, b) => comparePathsSimple(a, b, host.useCaseSensitiveFileNames()))) {
      return maybeNonRelative;
    }
    if (fromPackageJsonImports.length > 0) return relativePath;
  }

  // Prefer a relative import over a baseUrl import if it has fewer components.
  if (isPathRelativeToParent(maybeNonRelative) || countPathComponents(relativePath) < countPathComponents(maybeNonRelative)) {
    return relativePath;
  }
  return maybeNonRelative;
}

// ---------------------------------------------------------------------------
// Ending processing
// ---------------------------------------------------------------------------

/**
 * Applies an ending preference to a candidate module specifier.
 * Mirrors TS-Go `processEnding`.
 */
export function processEnding(
  fileName: string,
  allowedEndings: readonly ModuleSpecifierEnding[],
  options: CompilerOptions,
  host: ModuleSpecifierGenerationHost | undefined,
  tspath: TspathHelpers,
): string {
  if (fileExtensionIsOneOf(fileName, [".json", ".mjs", ".cjs"])) return fileName;

  const noExtension = removeFileExtension(fileName);
  if (fileName === noExtension) return fileName;

  const jsPriority = allowedEndings.indexOf(MSE.JsExtension);
  const tsPriority = allowedEndings.indexOf(MSE.TsExtension);

  if (fileExtensionIsOneOf(fileName, [".mts", ".cts"]) && tsPriority !== -1 && tsPriority < jsPriority) {
    return fileName;
  }
  if (fileExtensionIsOneOf(fileName, [".d.mts", ".d.cts"])) {
    const inputExt = getDeclarationFileExtension(fileName);
    const ext = getJSExtensionForDeclarationFileExtension(inputExt);
    return removeExtension(fileName, inputExt) + ext;
  }
  if (fileExtensionIsOneOf(fileName, [".mts", ".cts"])) {
    return noExtension + getJSExtensionForFile(fileName, options);
  }
  if (!fileExtensionIsOneOf(fileName, [".d.ts"]) && fileExtensionIsOneOf(fileName, [".ts"]) && fileName.includes(".d.")) {
    const result = tryGetRealFileNameForNonJSDeclarationFileName(fileName, getBaseFileName, removeExtension);
    if (result !== "") return result;
  }

  switch (allowedEndings[0]) {
    case MSE.Minimal: {
      const withoutIndex = noExtension.endsWith("/index") ? noExtension.slice(0, -"/index".length) : noExtension;
      if (host !== undefined && withoutIndex !== noExtension && tryGetAnyFileFromPath(host, withoutIndex, options)) {
        return noExtension;
      }
      return withoutIndex;
    }
    case MSE.Index:
      return noExtension;
    case MSE.JsExtension:
      return noExtension + getJSExtensionForFile(fileName, options);
    case MSE.TsExtension: {
      if (isDeclarationFileName(fileName)) {
        let extensionlessPriority = -1;
        for (let i = 0; i < allowedEndings.length; i += 1) {
          const e = allowedEndings[i];
          if (e === MSE.Minimal || e === MSE.Index) {
            extensionlessPriority = i;
            break;
          }
        }
        if (extensionlessPriority !== -1 && extensionlessPriority < jsPriority) {
          return noExtension;
        }
        return noExtension + getJSExtensionForFile(fileName, options);
      }
      return fileName;
    }
    default:
      throw new Error("unhandled ending: " + String(allowedEndings[0]));
  }
}

// ---------------------------------------------------------------------------
// rootDirs / node_modules / paths / package.json exports & imports
// ---------------------------------------------------------------------------

/**
 * Mirrors TS-Go `tryGetModuleNameFromRootDirs`.
 */
export function tryGetModuleNameFromRootDirs(
  rootDirs: readonly string[],
  moduleFileName: string,
  sourceDirectory: string,
  allowedEndings: readonly ModuleSpecifierEnding[],
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  tspath: TspathHelpers,
): string {
  const normalizedTargetPaths = getPathsRelativeToRootDirs(
    moduleFileName,
    rootDirs,
    host.useCaseSensitiveFileNames(),
    (root, p, useCaseSensitive) => getRelativePathFromDirectory(root, p, {
      useCaseSensitiveFileNames: useCaseSensitive,
      currentDirectory: root,
    }),
    isRootedDiskPath,
  );
  if (normalizedTargetPaths.length === 0) return "";

  const normalizedSourcePaths = getPathsRelativeToRootDirs(
    sourceDirectory,
    rootDirs,
    host.useCaseSensitiveFileNames(),
    (root, p, useCaseSensitive) => getRelativePathFromDirectory(root, p, {
      useCaseSensitiveFileNames: useCaseSensitive,
      currentDirectory: root,
    }),
    isRootedDiskPath,
  );
  let shortest = "";
  let shortestSepCount = 0;
  for (const sourcePath of normalizedSourcePaths) {
    for (const targetPath of normalizedTargetPaths) {
      const candidate = ensurePathIsNonModuleName(
        getRelativePathFromDirectory(sourcePath, targetPath, {
          useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
          currentDirectory: host.getCurrentDirectory(),
        }),
        tspath.pathIsAbsolute ?? ((p) => p.startsWith("/")),
        tspath.pathIsRelative,
      );
      let candidateSepCount = 0;
      for (let i = 0; i < candidate.length; i += 1) if (candidate[i] === "/") candidateSepCount += 1;
      if (shortest.length === 0 || candidateSepCount < shortestSepCount) {
        shortest = candidate;
        shortestSepCount = candidateSepCount;
      }
    }
  }

  if (shortest.length === 0) return "";
  return processEnding(shortest, allowedEndings, compilerOptions, host, tspath);
}

/**
 * Mirrors TS-Go `tryGetModuleNameAsNodeModule`.
 */
export function tryGetModuleNameAsNodeModule(
  pathObj: ModulePath,
  info: Info,
  importingSourceFile: SourceFileForSpecifierGeneration,
  host: ModuleSpecifierGenerationHost,
  options: CompilerOptions,
  userPreferences: UserPreferences,
  packageNameOnly: boolean,
  overrideMode: ResolutionMode,
  tspath: TspathHelpers,
): string {
  const parts = getNodeModulePathParts(pathObj.fileName);
  if (parts === undefined) return "";

  const preferences = getModuleSpecifierPreferences(userPreferences, host, options, importingSourceFile, "", tspath);
  const allowedEndings = preferences.getAllowedEndingsInPreferredOrder(RM.None);

  const caseSensitive = host.useCaseSensitiveFileNames();
  let moduleSpecifier = pathObj.fileName;
  let isPackageRootPath = false;
  if (!packageNameOnly) {
    let packageRootIndex = parts.packageRootIndex;
    let moduleFileName = "";
    while (true) {
      const result = tryDirectoryWithPackageJson(
        { ...parts, packageRootIndex },
        pathObj,
        importingSourceFile,
        host,
        overrideMode,
        options,
        allowedEndings,
        tspath,
      );
      if (result.blockedByExports) return "";
      if (result.verbatimFromExports) return result.moduleFileToTry;

      if (result.packageRootPath.length > 0) {
        moduleSpecifier = result.packageRootPath;
        isPackageRootPath = true;
        break;
      }
      if (moduleFileName.length === 0) {
        moduleFileName = result.moduleFileToTry;
      }
      packageRootIndex = indexAfter(pathObj.fileName, "/", packageRootIndex + 1);
      if (packageRootIndex === -1) {
        moduleSpecifier = processEnding(moduleFileName, allowedEndings, options, host, tspath);
        break;
      }
    }
  }

  if (pathObj.isRedirect && !isPackageRootPath) return "";

  const globalTypingsCacheLocation = host.getGlobalTypingsCacheLocation();
  const pathToTopLevelNodeModules = moduleSpecifier.slice(0, parts.topLevelNodeModulesIndex);

  if (!stringHasPrefix(info.sourceDirectory, pathToTopLevelNodeModules, caseSensitive) ||
    (globalTypingsCacheLocation.length > 0 && stringHasPrefix(globalTypingsCacheLocation, pathToTopLevelNodeModules, caseSensitive))) {
    return "";
  }

  // If the module was found in @types, get the actual Node package name.
  const nodeModulesDirectoryName = moduleSpecifier.slice(parts.topLevelPackageNameIndex + 1);
  return getPackageNameFromTypesPackageName(nodeModulesDirectoryName);
}

/** Forward-declared result type from `tryDirectoryWithPackageJson`. */
interface PkgJsonDirAttemptResult {
  readonly moduleFileToTry: string;
  readonly packageRootPath: string;
  readonly blockedByExports: boolean;
  readonly verbatimFromExports: boolean;
}

/**
 * Mirrors TS-Go `tryDirectoryWithPackageJson`. Body uses upstream API
 * names; `host.getPackageJsonInfo` is the surface that supplies the
 * parsed package.json contents (typings/types/main/exports/imports).
 */
function tryDirectoryWithPackageJson(
  parts: NodeModulePathParts,
  pathObj: ModulePath,
  importingSourceFile: SourceFileForSpecifierGeneration,
  host: ModuleSpecifierGenerationHost,
  overrideMode: ResolutionMode,
  options: CompilerOptions,
  allowedEndings: readonly ModuleSpecifierEnding[],
  tspath: TspathHelpers,
): PkgJsonDirAttemptResult {
  let rootIdx = parts.packageRootIndex;
  if (rootIdx === -1) rootIdx = pathObj.fileName.length;
  const packageRootPath = pathObj.fileName.slice(0, rootIdx);
  const packageJsonPath = combinePaths(packageRootPath, "package.json");
  let moduleFileToTry = pathObj.fileName;
  let maybeBlockedByTypesVersions = false;
  const packageJson = host.getPackageJsonInfo(packageJsonPath) as PackageJsonInfo | undefined;
  if (packageJson === undefined) {
    const fileName = moduleFileToTry.slice(parts.packageRootIndex + 1);
    if (fileName === "index.d.ts" || fileName === "index.js" || fileName === "index.ts" || fileName === "index.tsx") {
      return { moduleFileToTry, packageRootPath, blockedByExports: false, verbatimFromExports: false };
    }
    return { moduleFileToTry, packageRootPath: "", blockedByExports: false, verbatimFromExports: false };
  }

  let importMode = overrideMode;
  if (importMode === RM.None) importMode = host.getDefaultResolutionModeForFile(importingSourceFile);

  const packageJsonContent = packageJson.getContents();
  if (options.getResolvePackageJsonExports()) {
    const nodeModulesDirectoryName = packageRootPath.slice(parts.topLevelPackageNameIndex + 1);
    const packageName = getPackageNameFromTypesPackageName(nodeModulesDirectoryName);

    // Choose resolution mode based on the target file's extension.
    if (fileExtensionIsOneOf(pathObj.fileName, [".cjs", ".cts", ".d.cts"])) {
      importMode = RM.CommonJS;
    } else if (fileExtensionIsOneOf(pathObj.fileName, [".mjs", ".mts", ".d.mts"])) {
      importMode = RM.ESM;
    }

    const conditions = getConditions(options, importMode);

    let fromExports = "";
    if (packageJsonContent !== undefined && packageJsonContent.fields.exports.type !== "not-present") {
      fromExports = tryGetModuleNameFromExports(
        options,
        host,
        pathObj.fileName,
        packageRootPath,
        packageName,
        packageJsonContent.fields.exports,
        conditions,
        tspath,
      );
    }
    if (fromExports.length > 0) {
      return { moduleFileToTry: fromExports, packageRootPath: "", blockedByExports: false, verbatimFromExports: true };
    }
    if (packageJsonContent !== undefined && packageJsonContent.fields.exports.type !== "not-present") {
      return { moduleFileToTry: pathObj.fileName, packageRootPath: "", blockedByExports: true, verbatimFromExports: false };
    }
  }

  let versionPaths: VersionPaths | undefined;
  if (packageJsonContent !== undefined && packageJsonContent.typesVersions.type === "object") {
    versionPaths = packageJsonContent.getVersionPaths();
  }
  if (versionPaths !== undefined && versionPaths.getPaths() !== undefined) {
    const subModuleName = pathObj.fileName.slice(packageRootPath.length + 1);
    const fromPaths = tryGetModuleNameFromPaths(
      subModuleName,
      versionPaths.getPaths()!,
      allowedEndings,
      packageRootPath,
      host,
      options,
      tspath,
    );
    if (fromPaths.length === 0) {
      maybeBlockedByTypesVersions = true;
    } else {
      moduleFileToTry = combinePaths(packageRootPath, fromPaths);
    }
  }

  // If the file is the main module, it can be imported by the package name.
  let mainFileRelative = "index.js";
  if (packageJsonContent !== undefined) {
    if (packageJsonContent.typings.valid) mainFileRelative = packageJsonContent.typings.value;
    else if (packageJsonContent.types.valid) mainFileRelative = packageJsonContent.types.value;
    else if (packageJsonContent.main.valid) mainFileRelative = packageJsonContent.main.value;
  }

  if (mainFileRelative.length > 0 && !(maybeBlockedByTypesVersions && versionPaths !== undefined && matchPatternOrExact(tryParsePatterns(versionPaths.getPaths()!), mainFileRelative) !== undefined)) {
    const mainExportFile = toPath(mainFileRelative, packageRootPath, host.useCaseSensitiveFileNames());
    const compareOpt = {
      useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
      currentDirectory: host.getCurrentDirectory(),
    };
    if (comparePaths(removeFileExtension(mainExportFile), removeFileExtension(moduleFileToTry), compareOpt) === 0) {
      return { packageRootPath, moduleFileToTry, blockedByExports: false, verbatimFromExports: false };
    }
    if (
      (packageJsonContent === undefined || packageJsonContent.type.value !== "module") &&
      !fileExtensionIsOneOf(moduleFileToTry, ExtensionsNotSupportingExtensionlessResolution) &&
      stringHasPrefix(moduleFileToTry, mainExportFile, host.useCaseSensitiveFileNames()) &&
      comparePaths(getDirectoryPath(moduleFileToTry), removeTrailingDirectorySeparator(mainExportFile), compareOpt) === 0 &&
      removeFileExtension(getBaseFileName(moduleFileToTry)) === "index"
    ) {
      return { packageRootPath, moduleFileToTry, blockedByExports: false, verbatimFromExports: false };
    }
  }

  return { moduleFileToTry, packageRootPath: "", blockedByExports: false, verbatimFromExports: false };
}

/**
 * Mirrors TS-Go `tryGetModuleNameFromExports`.
 */
export function tryGetModuleNameFromExports(
  options: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  targetFilePath: string,
  packageDirectory: string,
  packageName: string,
  exports: ExportsOrImports,
  conditions: readonly string[],
  tspath: TspathHelpers,
): string {
  if (exports.isSubpaths()) {
    for (const [k, subk] of exports.asObject().entries()) {
      const subPackageName = getNormalizedAbsolutePath(combinePaths(packageName, k), "");
      let mode: MatchingMode = MM.Exact;
      if (k.endsWith("/")) mode = MM.Directory;
      else if (k.includes("*")) mode = MM.Pattern;
      const result = tryGetModuleNameFromExportsOrImports(
        options, host, targetFilePath, packageDirectory, subPackageName, subk, conditions, mode, false, false, tspath,
      );
      if (result.length > 0) return result;
    }
  }
  return tryGetModuleNameFromExportsOrImports(
    options, host, targetFilePath, packageDirectory, packageName, exports, conditions, MM.Exact, false, false, tspath,
  );
}

/**
 * Mirrors TS-Go `tryGetModuleNameFromPackageJsonImports`.
 */
export function tryGetModuleNameFromPackageJsonImports(
  moduleFileName: string,
  sourceDirectory: string,
  options: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  importMode: ResolutionMode,
  preferTsExtension: boolean,
  tspath: TspathHelpers,
): string {
  if (!options.getResolvePackageJsonImports()) return "";

  const ancestorDirectoryWithPackageJson = host.getNearestAncestorDirectoryWithPackageJson(sourceDirectory);
  if (ancestorDirectoryWithPackageJson.length === 0) return "";
  const packageJsonPath = combinePaths(ancestorDirectoryWithPackageJson, "package.json");
  const info = host.getPackageJsonInfo(packageJsonPath) as PackageJsonInfo | undefined;
  if (info === undefined) return "";

  const contents = info.getContents();
  if (contents === undefined) return "";
  const fields = contents.fields;
  if (fields === undefined) return "";
  const imports = fields.imports;
  if (imports === undefined) return "";
  switch (imports.type) {
    case "not-present":
    case "array":
    case "string":
      return "";
    case "object": {
      const conditions = getConditions(options, importMode);
      const top = imports.asObject();
      for (const [k, value] of top.entries()) {
        if (k === "#" || k === "#/" || !k.startsWith("#")) continue;
        const mr = options.getModuleResolutionKind();
        if (k.startsWith("#/") && mr !== MRK.NodeNext && mr !== MRK.Bundler) continue;
        let mode: MatchingMode = MM.Exact;
        if (k.endsWith("/")) mode = MM.Directory;
        else if (k.includes("*")) mode = MM.Pattern;
        const result = tryGetModuleNameFromExportsOrImports(
          options, host, moduleFileName, ancestorDirectoryWithPackageJson, k, value, conditions, mode, true, preferTsExtension, tspath,
        );
        if (result.length > 0) return result;
      }
      return "";
    }
    default:
      return "";
  }
}

interface SpecPair {
  readonly ending: ModuleSpecifierEnding;
  readonly value: string;
}

/**
 * Mirrors TS-Go `tryGetModuleNameFromPaths`.
 */
export function tryGetModuleNameFromPaths(
  relativeToBaseUrl: string,
  paths: ReadonlyMap<string, readonly string[]>,
  allowedEndings: readonly ModuleSpecifierEnding[],
  baseDirectory: string,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptions,
  tspath: TspathHelpers,
): string {
  const caseSensitive = host.useCaseSensitiveFileNames();
  for (const [key, values] of paths) {
    for (const patternText of values) {
      const normalized = normalizePath(patternText);
      let pattern = getRelativePathIfInSameVolume(normalized, baseDirectory, caseSensitive);
      if (pattern.length === 0) pattern = normalized;
      const starIndex = pattern.indexOf("*");
      const ok = starIndex !== -1;
      const prefix = ok ? pattern.slice(0, starIndex) : pattern;
      const suffix = ok ? pattern.slice(starIndex + 1) : "";

      const candidates: SpecPair[] = [];
      for (const ending of allowedEndings) {
        const result = processEnding(relativeToBaseUrl, [ending], compilerOptions, host, tspath);
        candidates.push({ ending, value: result });
      }
      if (tryGetExtensionFromPath(pattern).length > 0) {
        candidates.push({ ending: MSE.JsExtension, value: relativeToBaseUrl });
      }

      if (ok) {
        for (const c of candidates) {
          const value = c.value;
          if (value.length >= prefix.length + suffix.length &&
            stringHasPrefix(value, prefix, caseSensitive) &&
            stringHasSuffix(value, suffix, caseSensitive) &&
            validateEnding(c, relativeToBaseUrl, compilerOptions, host, tspath)) {
            const matchedStar = value.slice(prefix.length, value.length - suffix.length);
            if (!tspath.pathIsRelative(matchedStar)) {
              return replaceFirstStar(key, matchedStar);
            }
          }
        }
      } else if (
        candidates.some((c) => c.ending !== MSE.Minimal && pattern === c.value) ||
        candidates.some((c) => c.ending === MSE.Minimal && pattern === c.value && validateEnding(c, relativeToBaseUrl, compilerOptions, host, tspath))
      ) {
        return key;
      }
    }
  }
  return "";
}

function validateEnding(c: SpecPair, relativeToBaseUrl: string, compilerOptions: CompilerOptions, host: ModuleSpecifierGenerationHost, tspath: TspathHelpers): boolean {
  return c.ending !== MSE.Minimal || c.value === processEnding(relativeToBaseUrl, [c.ending], compilerOptions, host, tspath);
}

/**
 * Mirrors TS-Go `tryGetModuleNameFromExportsOrImports`.
 */
export function tryGetModuleNameFromExportsOrImports(
  options: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  targetFilePath: string,
  packageDirectory: string,
  packageName: string,
  exports: ExportsOrImports,
  conditions: readonly string[],
  mode: MatchingMode,
  isImports: boolean,
  preferTsExtension: boolean,
  tspath: TspathHelpers,
): string {
  switch (exports.type) {
    case "not-present":
      return "";
    case "string": {
      const strValue = exports.value as string;
      let outputFile = "";
      let declarationFile = "";
      if (isImports) {
        outputFile = getOutputJSFileNameWorker(targetFilePath, options, host);
        declarationFile = getOutputDeclarationFileNameWorker(targetFilePath, options, host);
      }
      const pathOrPattern = getNormalizedAbsolutePath(combinePaths(packageDirectory, strValue), "");
      const extensionSwappedTarget = tspath.hasTSFileExtension(targetFilePath)
        ? removeFileExtension(targetFilePath) + tryGetJSExtensionForFile(targetFilePath, options)
        : "";
      const canTryTsExtension = preferTsExtension && hasImplementationTSFileExtension(targetFilePath);
      const compareOpts = {
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        currentDirectory: host.getCurrentDirectory(),
      };

      switch (mode) {
        case MM.Exact: {
          if (
            (extensionSwappedTarget.length > 0 && comparePaths(extensionSwappedTarget, pathOrPattern, compareOpts) === 0) ||
            comparePaths(targetFilePath, pathOrPattern, compareOpts) === 0 ||
            (outputFile.length > 0 && comparePaths(outputFile, pathOrPattern, compareOpts) === 0) ||
            (declarationFile.length > 0 && comparePaths(declarationFile, pathOrPattern, compareOpts) === 0)
          ) {
            return packageName;
          }
          break;
        }
        case MM.Directory: {
          if (canTryTsExtension && containsPath(targetFilePath, pathOrPattern, compareOpts)) {
            const fragment = getRelativePathFromDirectory(pathOrPattern, targetFilePath, compareOpts);
            return getNormalizedAbsolutePath(combinePaths(combinePaths(packageName, strValue), fragment), "");
          }
          if (extensionSwappedTarget.length > 0 && containsPath(pathOrPattern, extensionSwappedTarget, compareOpts)) {
            const fragment = getRelativePathFromDirectory(pathOrPattern, extensionSwappedTarget, compareOpts);
            return getNormalizedAbsolutePath(combinePaths(combinePaths(packageName, strValue), fragment), "");
          }
          if (!canTryTsExtension && containsPath(pathOrPattern, targetFilePath, compareOpts)) {
            const fragment = getRelativePathFromDirectory(pathOrPattern, targetFilePath, compareOpts);
            return getNormalizedAbsolutePath(combinePaths(combinePaths(packageName, strValue), fragment), "");
          }
          if (outputFile.length > 0 && containsPath(pathOrPattern, outputFile, compareOpts)) {
            const fragment = getRelativePathFromDirectory(pathOrPattern, outputFile, compareOpts);
            return combinePaths(packageName, fragment);
          }
          if (declarationFile.length > 0 && containsPath(pathOrPattern, declarationFile, compareOpts)) {
            const fragment = getRelativePathFromDirectory(pathOrPattern, declarationFile, compareOpts);
            const jsExtension = getJSExtensionForFile(declarationFile, options);
            return combinePaths(packageName, changeExtension(fragment, jsExtension));
          }
          break;
        }
        case MM.Pattern: {
          const starIdx = pathOrPattern.indexOf("*");
          const leadingSlice = starIdx === -1 ? pathOrPattern : pathOrPattern.slice(0, starIdx);
          const trailingSlice = starIdx === -1 ? "" : pathOrPattern.slice(starIdx + 1);
          const caseSensitive = host.useCaseSensitiveFileNames();
          if (canTryTsExtension && hasPrefixAndSuffixWithoutOverlap(targetFilePath, leadingSlice, trailingSlice, caseSensitive)) {
            const starReplacement = targetFilePath.slice(leadingSlice.length, targetFilePath.length - trailingSlice.length);
            return replaceFirstStar(packageName, starReplacement);
          }
          if (extensionSwappedTarget.length > 0 && hasPrefixAndSuffixWithoutOverlap(extensionSwappedTarget, leadingSlice, trailingSlice, caseSensitive)) {
            const starReplacement = extensionSwappedTarget.slice(leadingSlice.length, extensionSwappedTarget.length - trailingSlice.length);
            return replaceFirstStar(packageName, starReplacement);
          }
          if (!canTryTsExtension && hasPrefixAndSuffixWithoutOverlap(targetFilePath, leadingSlice, trailingSlice, caseSensitive)) {
            const starReplacement = targetFilePath.slice(leadingSlice.length, targetFilePath.length - trailingSlice.length);
            return replaceFirstStar(packageName, starReplacement);
          }
          if (outputFile.length > 0 && hasPrefixAndSuffixWithoutOverlap(outputFile, leadingSlice, trailingSlice, caseSensitive)) {
            const starReplacement = outputFile.slice(leadingSlice.length, outputFile.length - trailingSlice.length);
            return replaceFirstStar(packageName, starReplacement);
          }
          if (declarationFile.length > 0 && hasPrefixAndSuffixWithoutOverlap(declarationFile, leadingSlice, trailingSlice, caseSensitive)) {
            const starReplacement = declarationFile.slice(leadingSlice.length, declarationFile.length - trailingSlice.length);
            const substituted = replaceFirstStar(packageName, starReplacement);
            const jsExtension = tryGetJSExtensionForFile(declarationFile, options);
            if (jsExtension.length > 0) {
              return changeFullExtension(substituted, jsExtension);
            }
          }
          break;
        }
      }
      return "";
    }
    case "array": {
      for (const e of exports.asArray()) {
        const result = tryGetModuleNameFromExportsOrImports(
          options, host, targetFilePath, packageDirectory, packageName, e, conditions, mode, isImports, preferTsExtension, tspath,
        );
        if (result.length > 0) return result;
      }
      return "";
    }
    case "object": {
      // conditional mapping
      const obj = exports.asObject();
      for (const [key, value] of obj.entries()) {
        if (key === "default" || conditions.includes(key) || (conditions.includes("types") && isApplicableVersionedTypesKey(key))) {
          const result = tryGetModuleNameFromExportsOrImports(
            options, host, targetFilePath, packageDirectory, packageName, value, conditions, mode, isImports, preferTsExtension, tspath,
          );
          if (result.length > 0) return result;
        }
      }
      return "";
    }
    case "null":
      return "";
    default:
      return "";
  }
}

// ---------------------------------------------------------------------------
// "GetModuleSpecifier" / "UpdateModuleSpecifier"
// ---------------------------------------------------------------------------

/**
 * Mirrors TS-Go `GetModuleSpecifier`.
 */
export function getModuleSpecifier(
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  importingSourceFile: SourceFile,
  importingSourceFileName: string,
  oldImportSpecifier: string,
  toFileName: string,
  options: ModuleSpecifierOptions,
  tspath: TspathHelpers,
): string {
  return getModuleSpecifierWithPreferences(
    compilerOptions,
    host,
    importingSourceFile,
    importingSourceFileName,
    oldImportSpecifier,
    toFileName,
    { importModuleSpecifierPreference: IMSP.None, importModuleSpecifierEnding: IMEP.None, autoImportSpecifierExcludeRegexes: [] },
    options,
    tspath,
  );
}

/**
 * Mirrors TS-Go `UpdateModuleSpecifier`.
 */
export function updateModuleSpecifier(
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  importingSourceFile: SourceFile,
  importingSourceFileName: string,
  oldImportSpecifier: string,
  toFileName: string,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  tspath: TspathHelpers,
): string {
  return getModuleSpecifierWithPreferences(
    compilerOptions,
    host,
    importingSourceFile,
    importingSourceFileName,
    oldImportSpecifier,
    toFileName,
    userPreferences,
    options,
    tspath,
  );
}

function getModuleSpecifierWithPreferences(
  compilerOptions: CompilerOptions,
  host: ModuleSpecifierGenerationHost,
  importingSourceFile: SourceFile,
  importingSourceFileName: string,
  oldImportSpecifier: string,
  toFileName: string,
  userPreferences: UserPreferences,
  options: ModuleSpecifierOptions,
  tspath: TspathHelpers,
): string {
  const info = getInfo(importingSourceFileName, host);
  const modulePaths = getAllModulePathsInternal(info, toFileName, host, compilerOptions, userPreferences, options, tspath);
  const preferences = getModuleSpecifierPreferences(
    userPreferences,
    host,
    compilerOptions,
    importingSourceFile as unknown as SourceFileForSpecifierGeneration,
    oldImportSpecifier,
    tspath,
  );

  let resolutionMode = options.overrideImportMode;
  if (resolutionMode === RM.None) {
    resolutionMode = host.getDefaultResolutionModeForFile(importingSourceFile);
  }

  for (const modulePath of modulePaths) {
    const firstDefined = tryGetModuleNameAsNodeModule(
      modulePath,
      info,
      importingSourceFile as unknown as SourceFileForSpecifierGeneration,
      host,
      compilerOptions,
      userPreferences,
      false,
      options.overrideImportMode,
      tspath,
    );
    if (firstDefined.length > 0) return firstDefined;
  }

  return getLocalModuleSpecifier(toFileName, info, compilerOptions, host, resolutionMode, preferences, false, tspath);
}

/**
 * Mirrors TS-Go `getAllModulePaths`. Distinct from
 * `getAllModulePathsWorker` only in that this version caches via the
 * eventual module-specifier cache (commented out until cache port lands).
 */
function getAllModulePathsInternal(
  info: Info,
  importedFileName: string,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptions,
  preferences: UserPreferences,
  options: ModuleSpecifierOptions,
  tspath: TspathHelpers,
): readonly ModulePath[] {
  return getAllModulePathsWorker(info, importedFileName, host, compilerOptions, options, tspath);
}

// ---------------------------------------------------------------------------
// `ProcessEntrypointEnding` (called by package.json exports lookups).
// Mirrors TS-Go `ProcessEntrypointEnding`.
// ---------------------------------------------------------------------------

export function processEntrypointEnding(
  entrypoint: ResolvedEntrypoint,
  prefs: UserPreferences,
  host: ModuleSpecifierGenerationHost,
  options: CompilerOptions,
  importingSourceFile: SourceFileForSpecifierGeneration,
  allowedEndingsIn: readonly ModuleSpecifierEnding[] | undefined,
  tspath: TspathHelpers,
): string {
  let specifier = entrypoint.moduleSpecifier;
  if (entrypoint.ending === "fixed") return specifier;

  const allowedEndings = allowedEndingsIn !== undefined && allowedEndingsIn.length > 0
    ? allowedEndingsIn
    : getAllowedEndingsInPreferredOrder(prefs, host, options, importingSourceFile, "", host.getDefaultResolutionModeForFile(importingSourceFile), tspath);

  const preferredEnding = allowedEndings[0];

  // Handle declaration file extensions
  const dtsExtension = getDeclarationFileExtension(specifier);
  if (dtsExtension !== "") {
    switch (preferredEnding) {
      case MSE.TsExtension:
      case MSE.JsExtension: {
        const jsExtension = getJSExtensionForDeclarationFileExtension(dtsExtension);
        return changeAnyExtension(specifier, jsExtension, [dtsExtension], false);
      }
      case MSE.Minimal:
      case MSE.Index: {
        if (entrypoint.ending === "changeable") {
          if (dtsExtension === ".d.ts") {
            specifier = removeExtension(specifier, dtsExtension);
            if (preferredEnding === MSE.Minimal) {
              if (specifier.endsWith("/index")) specifier = specifier.slice(0, -"/index".length);
            }
            return specifier;
          }
          const jsExtension = getJSExtensionForDeclarationFileExtension(dtsExtension);
          return changeAnyExtension(specifier, jsExtension, [dtsExtension], false);
        }
        const jsExtension = getJSExtensionForDeclarationFileExtension(dtsExtension);
        return changeAnyExtension(specifier, jsExtension, [dtsExtension], false);
      }
    }
    return specifier;
  }

  // Handle .ts/.tsx/.mts/.cts extensions
  if (fileExtensionIsOneOf(specifier, [".ts", ".tsx", ".mts", ".cts"])) {
    switch (preferredEnding) {
      case MSE.TsExtension:
        return specifier;
      case MSE.JsExtension: {
        const jsExtension = tryGetJSExtensionForFile(specifier, options);
        if (jsExtension !== "") return removeFileExtension(specifier) + jsExtension;
        return specifier;
      }
      case MSE.Minimal:
      case MSE.Index: {
        if (entrypoint.ending === "changeable") {
          specifier = removeFileExtension(specifier);
          if (preferredEnding === MSE.Minimal) {
            if (specifier.endsWith("/index")) specifier = specifier.slice(0, -"/index".length);
          }
          return specifier;
        }
        const jsExtension = tryGetJSExtensionForFile(specifier, options);
        if (jsExtension !== "") return removeFileExtension(specifier) + jsExtension;
        return specifier;
      }
    }
    return specifier;
  }

  // Handle .js/.jsx/.mjs/.cjs extensions
  if (fileExtensionIsOneOf(specifier, [".js", ".jsx", ".mjs", ".cjs"])) {
    switch (preferredEnding) {
      case MSE.TsExtension:
      case MSE.JsExtension:
        return specifier;
      case MSE.Minimal:
      case MSE.Index: {
        if (entrypoint.ending === "changeable") {
          specifier = removeFileExtension(specifier);
          if (preferredEnding === MSE.Minimal) {
            if (specifier.endsWith("/index")) specifier = specifier.slice(0, -"/index".length);
          }
          return specifier;
        }
        return specifier;
      }
    }
    return specifier;
  }

  return specifier;
}

// ---------------------------------------------------------------------------
// Forward-declared helpers from subsystems TSTS hasn't ported yet.
// These are NOT shims — they document the upstream surface the
// implementation depends on. As the corresponding TSTS modules land,
// these imports come from the right places.
// ---------------------------------------------------------------------------

// `ast` surface
declare function isModuleWithStringLiteralName(node: AstNode): boolean;
declare function isModuleAugmentationExternal(node: AstNode): boolean;
declare function isModuleDeclaration(node: AstNode): boolean;
declare function isSourceFile(node: AstNode): boolean;
declare function findAncestor<T extends AstNode>(node: AstNode, predicate: (n: AstNode) => boolean): T | undefined;
declare function declName(node: AstNode): string;
declare function declSymbol(node: AstNode): AstSymbol | undefined;
declare function symbolExports(node: AstNode): ReadonlyMap<string, AstSymbol> | undefined;
declare function exportAssignmentDeclExpression(node: AstNode): AstNode;
declare function getSourceFileOfModule(symbol: AstSymbol): SourceFile | undefined;
declare const KindExportAssignment: number;
declare const InternalSymbolNameExportEquals: string;
declare const SymbolFlagsAlias: number;

// `tspath` surface — most helpers come from ../tspath/index.js via the
// top-of-file imports below. A few that aren't yet ported stay declared.
declare function getNormalizedAbsolutePath(p: string, cwd: string): string;
declare function toPath(p: string, cwd: string, useCaseSensitive: boolean): string;
declare function comparePathsSimple(a: string, b: string, useCaseSensitive: boolean): number;
declare function comparePaths(a: string, b: string, opts: ComparePathsOptions): number;
declare function getRelativePathFromDirectory(from: string, to: string, opts: ComparePathsOptions): string;
declare function getRelativePathIfInSameVolume(path: string, directoryPath: string, useCaseSensitive: boolean): string;
declare function stringHasPrefix(s: string, prefix: string, caseSensitive: boolean): boolean;
declare function stringHasSuffix(s: string, suffix: string, caseSensitive: boolean): boolean;
declare function hasPrefixAndSuffixWithoutOverlap(s: string, prefix: string, suffix: string, caseSensitive: boolean): boolean;
declare function getDeclarationFileExtension(p: string): string;
declare function changeAnyExtension(p: string, ext: string, extensions: readonly string[], caseSensitive: boolean): string;
declare function changeFullExtension(p: string, ext: string): string;
declare function indexAfter(s: string, search: string, position: number): number;
declare const ExtensionsNotSupportingExtensionlessResolution: readonly string[];

interface ComparePathsOptions {
  readonly useCaseSensitiveFileNames: boolean;
  readonly currentDirectory: string;
}

// `module` surface
declare function getConditions(options: CompilerOptions, importMode: ResolutionMode): readonly string[];
declare function tryGetJSExtensionForFile(fileName: string, options: CompilerOptions): string;
declare function hasImplementationTSFileExtension(p: string): boolean;
declare function isApplicableVersionedTypesKey(key: string): boolean;
declare function matchPatternOrExact(patterns: readonly Pattern[], candidate: string): Pattern | undefined;
declare function tryParsePatterns(paths: ReadonlyMap<string, readonly string[]>): readonly Pattern[];
declare function getPackageNameFromTypesPackageName(name: string): string;

// `outputpaths` surface
declare function getOutputJSFileNameWorker(targetFilePath: string, options: CompilerOptions, host: ModuleSpecifierGenerationHost): string;
declare function getOutputDeclarationFileNameWorker(targetFilePath: string, options: CompilerOptions, host: ModuleSpecifierGenerationHost): string;

// `core` surface
declare function forEachAncestorDirectoryStoppingAtGlobalCache(
  globalCache: string,
  start: string,
  fn: (dir: string) => { readonly stop: boolean; readonly value: boolean },
): boolean;

interface Pattern {
  readonly prefix: string;
  readonly suffix: string;
}

// `packagejson` surface
interface PackageJsonInfo {
  getContents(): PackageJsonContents | undefined;
}

interface PackageJsonContents {
  readonly fields: {
    readonly exports: ExportsOrImports;
    readonly imports: ExportsOrImports;
  };
  readonly typesVersions: ExportsOrImports;
  readonly typings: { readonly valid: boolean; readonly value: string };
  readonly types: { readonly valid: boolean; readonly value: string };
  readonly main: { readonly valid: boolean; readonly value: string };
  readonly type: { readonly value: string };
  getVersionPaths(): VersionPaths;
}

interface VersionPaths {
  getPaths(): ReadonlyMap<string, readonly string[]> | undefined;
}

// `host.fileExists`-based asset probing.
function tryGetAnyFileFromPath(host: ModuleSpecifierGenerationHost, path: string, _options: CompilerOptions): boolean {
  const extensions = [".ts", ".tsx", ".d.ts", ".js", ".jsx", ".node", ".json"];
  for (const e of extensions) {
    if (host.fileExists(getNormalizedAbsolutePath(path + e, host.getCurrentDirectory()))) return true;
  }
  return false;
}

function getJSExtensionForFile(fileName: string, options: CompilerOptions): string {
  const result = tryGetJSExtensionForFile(fileName, options);
  if (result === "") {
    throw new Error(`Extension ${tryGetExtensionFromPath(fileName)} is unsupported. FileName: ${fileName}`);
  }
  return result;
}
