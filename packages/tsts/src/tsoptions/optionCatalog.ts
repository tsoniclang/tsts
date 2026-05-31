/**
 * Option-catalog metadata for the TS-Go command-line surface.
 *
 * This file is the TypeScript counterpart of the static declaration data
 * spread across TS-Go `internal/tsoptions/declscompiler.go`,
 * `declsbuild.go`, `declswatch.go`, and `declstypeacquisition.go`.
 * The executable parsers still consume `CommandLineOption` values; this
 * catalog is the normalized view used by show-config serialization,
 * validation, help output, and parity audits.
 */

import type { CommandLineOption } from "./commandLineOption.js";
import { optionDeclarations } from "./declsCompiler.js";
import { buildOpts } from "./declsBuild.js";
import { watchOptions } from "./declsWatch.js";
import { typeAcquisitionDeclarations } from "./declsTypeAcquisition.js";

export type OptionCatalogKind =
  | "compiler"
  | "build"
  | "watch"
  | "typeAcquisition"
  | "tsconfigRoot";

export type OptionValueShape =
  | "boolean"
  | "number"
  | "string"
  | "enum"
  | "list"
  | "listOrElement"
  | "object";

export type OptionCategoryName =
  | "commandLine"
  | "compilerDiagnostics"
  | "completeness"
  | "editorSupport"
  | "emit"
  | "fileManagement"
  | "interopConstraints"
  | "javascriptSupport"
  | "languageAndEnvironment"
  | "modules"
  | "outputFormatting"
  | "projects"
  | "typeChecking"
  | "watchAndBuildModes"
  | "uncategorized";

export interface OptionCatalogEntry {
  readonly name: string;
  readonly shortName?: string;
  readonly owner: OptionCatalogKind;
  readonly shape: OptionValueShape;
  readonly category: OptionCategoryName;
  readonly isFilePath: boolean;
  readonly isCommandLineOnly: boolean;
  readonly isTSConfigOnly: boolean;
  readonly showInSimplifiedHelpView: boolean;
  readonly affectsDeclarationPath: boolean;
  readonly affectsProgramStructure: boolean;
  readonly affectsSemanticDiagnostics: boolean;
  readonly affectsBuildInfo: boolean;
  readonly affectsBindDiagnostics: boolean;
  readonly affectsSourceFile: boolean;
  readonly affectsModuleResolution: boolean;
  readonly affectsEmit: boolean;
  readonly strictFlag: boolean;
  readonly allowJsFlag: boolean;
  readonly listPreserveFalsyValues: boolean;
  readonly allowConfigDirTemplateSubstitution: boolean;
  readonly minValue?: number;
  readonly elementName?: string;
  readonly elementShape?: OptionValueShape;
}

const compilerOptionCategories: ReadonlyMap<string, OptionCategoryName> = new Map([
  ["help", "commandLine"],
  ["watch", "commandLine"],
  ["locale", "commandLine"],
  ["quiet", "commandLine"],
  ["singleThreaded", "commandLine"],
  ["pprofDir", "commandLine"],
  ["checkers", "commandLine"],
  ["all", "commandLine"],
  ["version", "commandLine"],
  ["init", "commandLine"],
  ["project", "commandLine"],
  ["showConfig", "commandLine"],
  ["listFilesOnly", "commandLine"],
  ["ignoreConfig", "commandLine"],
  ["listFiles", "compilerDiagnostics"],
  ["explainFiles", "compilerDiagnostics"],
  ["listEmittedFiles", "compilerDiagnostics"],
  ["traceResolution", "compilerDiagnostics"],
  ["diagnostics", "compilerDiagnostics"],
  ["extendedDiagnostics", "compilerDiagnostics"],
  ["generateCpuProfile", "compilerDiagnostics"],
  ["generateTrace", "compilerDiagnostics"],
  ["noCheck", "compilerDiagnostics"],
  ["skipDefaultLibCheck", "completeness"],
  ["skipLibCheck", "completeness"],
  ["disableSizeLimit", "editorSupport"],
  ["plugins", "editorSupport"],
  ["declaration", "emit"],
  ["declarationMap", "emit"],
  ["emitDeclarationOnly", "emit"],
  ["sourceMap", "emit"],
  ["inlineSourceMap", "emit"],
  ["noEmit", "emit"],
  ["outFile", "emit"],
  ["outDir", "emit"],
  ["removeComments", "emit"],
  ["importHelpers", "emit"],
  ["downlevelIteration", "emit"],
  ["sourceRoot", "emit"],
  ["mapRoot", "emit"],
  ["inlineSources", "emit"],
  ["emitBOM", "emit"],
  ["newLine", "emit"],
  ["stripInternal", "emit"],
  ["noEmitHelpers", "emit"],
  ["noEmitOnError", "emit"],
  ["preserveConstEnums", "emit"],
  ["declarationDir", "emit"],
  ["erasableSyntaxOnly", "interopConstraints"],
  ["isolatedModules", "interopConstraints"],
  ["verbatimModuleSyntax", "interopConstraints"],
  ["isolatedDeclarations", "interopConstraints"],
  ["allowSyntheticDefaultImports", "interopConstraints"],
  ["esModuleInterop", "interopConstraints"],
  ["preserveSymlinks", "interopConstraints"],
  ["forceConsistentCasingInFileNames", "interopConstraints"],
  ["allowJs", "javascriptSupport"],
  ["checkJs", "javascriptSupport"],
  ["maxNodeModuleJsDepth", "javascriptSupport"],
  ["target", "languageAndEnvironment"],
  ["lib", "languageAndEnvironment"],
  ["jsx", "languageAndEnvironment"],
  ["libReplacement", "languageAndEnvironment"],
  ["experimentalDecorators", "languageAndEnvironment"],
  ["emitDecoratorMetadata", "languageAndEnvironment"],
  ["jsxFactory", "languageAndEnvironment"],
  ["jsxFragmentFactory", "languageAndEnvironment"],
  ["jsxImportSource", "languageAndEnvironment"],
  ["reactNamespace", "languageAndEnvironment"],
  ["noLib", "languageAndEnvironment"],
  ["useDefineForClassFields", "languageAndEnvironment"],
  ["moduleDetection", "languageAndEnvironment"],
  ["module", "modules"],
  ["rootDir", "modules"],
  ["moduleResolution", "modules"],
  ["baseUrl", "modules"],
  ["paths", "modules"],
  ["rootDirs", "modules"],
  ["typeRoots", "modules"],
  ["types", "modules"],
  ["allowUmdGlobalAccess", "modules"],
  ["moduleSuffixes", "modules"],
  ["allowImportingTsExtensions", "modules"],
  ["rewriteRelativeImportExtensions", "modules"],
  ["resolvePackageJsonExports", "modules"],
  ["resolvePackageJsonImports", "modules"],
  ["customConditions", "modules"],
  ["noUncheckedSideEffectImports", "modules"],
  ["resolveJsonModule", "modules"],
  ["allowArbitraryExtensions", "modules"],
  ["noResolve", "modules"],
  ["pretty", "outputFormatting"],
  ["preserveWatchOutput", "outputFormatting"],
  ["noErrorTruncation", "outputFormatting"],
  ["incremental", "projects"],
  ["composite", "projects"],
  ["tsBuildInfoFile", "projects"],
  ["disableSourceOfProjectReferenceRedirect", "projects"],
  ["disableSolutionSearching", "projects"],
  ["disableReferencedProjectLoad", "projects"],
  ["strict", "typeChecking"],
  ["noImplicitAny", "typeChecking"],
  ["strictNullChecks", "typeChecking"],
  ["strictFunctionTypes", "typeChecking"],
  ["strictBindCallApply", "typeChecking"],
  ["strictPropertyInitialization", "typeChecking"],
  ["strictBuiltinIteratorReturn", "typeChecking"],
  ["noImplicitThis", "typeChecking"],
  ["useUnknownInCatchVariables", "typeChecking"],
  ["alwaysStrict", "typeChecking"],
  ["stableTypeOrdering", "typeChecking"],
  ["noUnusedLocals", "typeChecking"],
  ["noUnusedParameters", "typeChecking"],
  ["exactOptionalPropertyTypes", "typeChecking"],
  ["noImplicitReturns", "typeChecking"],
  ["noFallthroughCasesInSwitch", "typeChecking"],
  ["noUncheckedIndexedAccess", "typeChecking"],
  ["noImplicitOverride", "typeChecking"],
  ["noPropertyAccessFromIndexSignature", "typeChecking"],
  ["allowUnusedLabels", "typeChecking"],
  ["allowUnreachableCode", "typeChecking"],
  ["assumeChangesOnlyAffectDirectDependencies", "watchAndBuildModes"],
]);

const watchOptionCategories: ReadonlyMap<string, OptionCategoryName> = new Map([
  ["watchInterval", "watchAndBuildModes"],
  ["watchFile", "watchAndBuildModes"],
  ["watchDirectory", "watchAndBuildModes"],
  ["fallbackPolling", "watchAndBuildModes"],
  ["synchronousWatchDirectory", "watchAndBuildModes"],
  ["excludeDirectories", "watchAndBuildModes"],
  ["excludeFiles", "watchAndBuildModes"],
]);

const buildOptionCategories: ReadonlyMap<string, OptionCategoryName> = new Map([
  ["build", "commandLine"],
  ["verbose", "commandLine"],
  ["dry", "commandLine"],
  ["force", "commandLine"],
  ["clean", "commandLine"],
  ["builders", "commandLine"],
  ["stopBuildOnErrors", "commandLine"],
]);

const tsconfigRootEntries: readonly OptionCatalogEntry[] = [
  {
    name: "compilerOptions",
    owner: "tsconfigRoot",
    shape: "object",
    category: "uncategorized",
    isFilePath: false,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: false,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: false,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
  },
  {
    name: "watchOptions",
    owner: "tsconfigRoot",
    shape: "object",
    category: "watchAndBuildModes",
    isFilePath: false,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: false,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: false,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
  },
  {
    name: "typeAcquisition",
    owner: "tsconfigRoot",
    shape: "object",
    category: "javascriptSupport",
    isFilePath: false,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: false,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: false,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
  },
  {
    name: "extends",
    owner: "tsconfigRoot",
    shape: "listOrElement",
    category: "fileManagement",
    isFilePath: true,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: true,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: false,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
    elementName: "extends",
    elementShape: "string",
  },
  {
    name: "references",
    owner: "tsconfigRoot",
    shape: "list",
    category: "projects",
    isFilePath: false,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: true,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: true,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
    elementName: "reference",
    elementShape: "object",
  },
  {
    name: "files",
    owner: "tsconfigRoot",
    shape: "list",
    category: "fileManagement",
    isFilePath: true,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: true,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: true,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: true,
    elementName: "file",
    elementShape: "string",
  },
  {
    name: "include",
    owner: "tsconfigRoot",
    shape: "list",
    category: "fileManagement",
    isFilePath: true,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: true,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: true,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: true,
    elementName: "include",
    elementShape: "string",
  },
  {
    name: "exclude",
    owner: "tsconfigRoot",
    shape: "list",
    category: "fileManagement",
    isFilePath: true,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: true,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: true,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: true,
    elementName: "exclude",
    elementShape: "string",
  },
  {
    name: "compileOnSave",
    owner: "tsconfigRoot",
    shape: "boolean",
    category: "projects",
    isFilePath: false,
    isCommandLineOnly: false,
    isTSConfigOnly: true,
    showInSimplifiedHelpView: false,
    affectsDeclarationPath: false,
    affectsProgramStructure: false,
    affectsSemanticDiagnostics: false,
    affectsBuildInfo: false,
    affectsBindDiagnostics: false,
    affectsSourceFile: false,
    affectsModuleResolution: false,
    affectsEmit: false,
    strictFlag: false,
    allowJsFlag: false,
    listPreserveFalsyValues: false,
    allowConfigDirTemplateSubstitution: false,
  },
];

function shapeOf(option: CommandLineOption): OptionValueShape {
  if (typeof option.type === "string") return option.type;
  return "enum";
}

function entryFromOption(
  option: CommandLineOption,
  owner: OptionCatalogKind,
  category: OptionCategoryName,
): OptionCatalogEntry {
  const base = {
    name: option.name,
    owner,
    shape: shapeOf(option),
    category,
    isFilePath: option.isFilePath === true,
    isCommandLineOnly: option.isCommandLineOnly === true,
    isTSConfigOnly: option.isTSConfigOnly === true,
    showInSimplifiedHelpView: option.showInSimplifiedHelpView === true,
    affectsDeclarationPath: option.affectsDeclarationPath === true,
    affectsProgramStructure: option.affectsProgramStructure === true,
    affectsSemanticDiagnostics: option.affectsSemanticDiagnostics === true,
    affectsBuildInfo: option.affectsBuildInfo === true,
    affectsBindDiagnostics: option.affectsBindDiagnostics === true,
    affectsSourceFile: option.affectsSourceFile === true,
    affectsModuleResolution: option.affectsModuleResolution === true,
    affectsEmit: option.affectsEmit === true,
    strictFlag: option.strictFlag === true,
    allowJsFlag: option.allowJsFlag === true,
    listPreserveFalsyValues: option.listPreserveFalsyValues === true,
    allowConfigDirTemplateSubstitution: option.allowConfigDirTemplateSubstitution === true,
  };
  const maybeShort = option.shortName === undefined ? {} : { shortName: option.shortName };
  const maybeMin = option.minValue === undefined ? {} : { minValue: option.minValue };
  const element = option.element ?? option.elements?.();
  const maybeElement = element === undefined
    ? {}
    : { elementName: element.name, elementShape: shapeOf(element) };
  return {
    ...base,
    ...maybeShort,
    ...maybeMin,
    ...maybeElement,
  };
}

function entriesFromOptions(
  options: readonly CommandLineOption[],
  owner: OptionCatalogKind,
  categories: ReadonlyMap<string, OptionCategoryName>,
): readonly OptionCatalogEntry[] {
  return options.map((option) => entryFromOption(
    option,
    owner,
    categories.get(option.name) ?? "uncategorized",
  ));
}

export const compilerOptionCatalog: readonly OptionCatalogEntry[] = entriesFromOptions(
  optionDeclarations,
  "compiler",
  compilerOptionCategories,
);

export const buildOptionCatalog: readonly OptionCatalogEntry[] = entriesFromOptions(
  buildOpts,
  "build",
  buildOptionCategories,
);

export const watchOptionCatalog: readonly OptionCatalogEntry[] = entriesFromOptions(
  watchOptions,
  "watch",
  watchOptionCategories,
);

export const typeAcquisitionOptionCatalog: readonly OptionCatalogEntry[] = entriesFromOptions(
  typeAcquisitionDeclarations,
  "typeAcquisition",
  new Map(),
);

export const tsconfigRootOptionCatalog: readonly OptionCatalogEntry[] = tsconfigRootEntries;

export const optionCatalog: readonly OptionCatalogEntry[] = [
  ...compilerOptionCatalog,
  ...buildOptionCatalog,
  ...watchOptionCatalog,
  ...typeAcquisitionOptionCatalog,
  ...tsconfigRootOptionCatalog,
];

export function optionCatalogByName(
  entries: readonly OptionCatalogEntry[] = optionCatalog,
): ReadonlyMap<string, OptionCatalogEntry> {
  const map = new Map<string, OptionCatalogEntry>();
  for (const entry of entries) {
    map.set(entry.name.toLowerCase(), entry);
    if (entry.shortName !== undefined) {
      map.set(entry.shortName.toLowerCase(), entry);
    }
  }
  return map;
}

export function getOptionCatalogEntry(name: string): OptionCatalogEntry | undefined {
  return optionCatalogByName().get(name.toLowerCase());
}

export function optionNamesByCategory(category: OptionCategoryName): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.category === category)
    .map((entry) => entry.name);
}

export function optionsAffectingProgramStructure(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.affectsProgramStructure)
    .map((entry) => entry.name);
}

export function optionsAffectingModuleResolution(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.affectsModuleResolution)
    .map((entry) => entry.name);
}

export function optionsAffectingEmit(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.affectsEmit || entry.affectsDeclarationPath)
    .map((entry) => entry.name);
}

export function optionsAffectingSemanticDiagnostics(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.affectsSemanticDiagnostics)
    .map((entry) => entry.name);
}

export function optionsAffectingBuildInfo(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.affectsBuildInfo)
    .map((entry) => entry.name);
}

export function commandLineOnlyOptionNames(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.isCommandLineOnly)
    .map((entry) => entry.name);
}

export function tsconfigOnlyOptionNames(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.isTSConfigOnly)
    .map((entry) => entry.name);
}

export function filePathOptionNames(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.isFilePath || entry.elementShape === "string")
    .filter((entry) => entry.isFilePath || entry.allowConfigDirTemplateSubstitution)
    .map((entry) => entry.name);
}

export function simplifiedHelpOptionNames(): readonly string[] {
  return optionCatalog
    .filter((entry) => entry.showInSimplifiedHelpView)
    .map((entry) => entry.name);
}
