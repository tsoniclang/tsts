/**
 * CompilerOptions and related enums.
 *
 * Faithful port of TS-Go `internal/core/compileroptions.go` (555 LoC).
 * Field names converted to camelCase to match the TSTS source style.
 */

import { Tristate, tristateIsTrue, tristateIsTrueOrUnknown } from "./tristate.js";

const TSTrue = Tristate.True;
const TSFalse = Tristate.False;
const TSUnknown = Tristate.Unknown;
const isTrue = tristateIsTrue;
const isTrueOrUnknown = tristateIsTrueOrUnknown;

// ---------------------------------------------------------------------------
// Constant unions
// ---------------------------------------------------------------------------

export type ModuleKind = number;
export const ModuleKind = {
  None: 0,
  CommonJS: 1,
  AMD: 2,
  UMD: 3,
  System: 4,
  ES2015: 5,
  ES2020: 6,
  ES2022: 7,
  ESNext: 99,
  Node16: 100,
  Node18: 101,
  Node20: 102,
  NodeNext: 199,
  Preserve: 200,
} as const;

export type ResolutionMode = ModuleKind;
export const ResolutionMode = {
  None: ModuleKind.None,
  CommonJS: ModuleKind.CommonJS,
  ESM: ModuleKind.ESNext,
} as const;

export type ModuleResolutionKind = number;
export const ModuleResolutionKind = {
  Unknown: 0,
  Classic: 1,
  Node10: 2,
  Node16: 3,
  NodeNext: 99,
  Bundler: 100,
} as const;

export const moduleKindToModuleResolutionKind: ReadonlyMap<ModuleKind, ModuleResolutionKind> = new Map([
  [ModuleKind.Node16, ModuleResolutionKind.Node16],
  [ModuleKind.NodeNext, ModuleResolutionKind.NodeNext],
]);

export type ModuleDetectionKind = number;
export const ModuleDetectionKind = {
  None: 0,
  Auto: 1,
  Legacy: 2,
  Force: 3,
} as const;

export type NewLineKind = number;
export const NewLineKind = {
  None: 0,
  CRLF: 1,
  LF: 2,
} as const;

export function getNewLineKind(s: string): NewLineKind {
  if (s === "\r\n") return NewLineKind.CRLF;
  if (s === "\n") return NewLineKind.LF;
  return NewLineKind.None;
}

export function getNewLineCharacter(newLine: NewLineKind): string {
  if (newLine === NewLineKind.CRLF) return "\r\n";
  return "\n";
}

export type ScriptTarget = number;
export const ScriptTarget = {
  None: 0,
  ES5: 1,
  ES2015: 2,
  ES2016: 3,
  ES2017: 4,
  ES2018: 5,
  ES2019: 6,
  ES2020: 7,
  ES2021: 8,
  ES2022: 9,
  ES2023: 10,
  ES2024: 11,
  ES2025: 12,
  ESNext: 99,
  JSON: 100,
  Latest: 99 /* ESNext */,
  LatestStandard: 12 /* ES2025 */,
} as const;

export type JsxEmit = number;
export const JsxEmit = {
  None: 0,
  Preserve: 1,
  ReactNative: 2,
  React: 3,
  ReactJSX: 4,
  ReactJSXDev: 5,
} as const;

export function jsxEmitToString(j: JsxEmit): string {
  switch (j) {
    case JsxEmit.Preserve: return "preserve";
    case JsxEmit.ReactNative: return "react-native";
    case JsxEmit.React: return "react";
    case JsxEmit.ReactJSX: return "react-jsx";
    case JsxEmit.ReactJSXDev: return "react-jsxdev";
    default: throw new Error("unhandled case in jsxEmitToString");
  }
}

export function moduleResolutionKindToString(m: ModuleResolutionKind): string {
  switch (m) {
    case ModuleResolutionKind.Classic: return "Classic";
    case ModuleResolutionKind.Node10: return "Node10";
    case ModuleResolutionKind.Node16: return "Node16";
    case ModuleResolutionKind.NodeNext: return "NodeNext";
    case ModuleResolutionKind.Bundler: return "Bundler";
    default: throw new Error("unhandled ModuleResolutionKind");
  }
}

export function moduleKindIsNonNodeESM(k: ModuleKind): boolean {
  return k >= ModuleKind.ES2015 && k <= ModuleKind.ESNext;
}

export function moduleKindSupportsImportAttributes(k: ModuleKind): boolean {
  return (
    (k >= ModuleKind.Node18 && k <= ModuleKind.NodeNext) ||
    k === ModuleKind.Preserve ||
    k === ModuleKind.ESNext
  );
}

// ---------------------------------------------------------------------------
// CompilerOptions
// ---------------------------------------------------------------------------

export interface CompilerOptions {
  allowJs?: Tristate;
  allowArbitraryExtensions?: Tristate;
  allowImportingTsExtensions?: Tristate;
  allowNonTsExtensions?: Tristate;
  allowUmdGlobalAccess?: Tristate;
  allowUnreachableCode?: Tristate;
  allowUnusedLabels?: Tristate;
  assumeChangesOnlyAffectDirectDependencies?: Tristate;
  checkJs?: Tristate;
  customConditions?: readonly string[];
  composite?: Tristate;
  emitDeclarationOnly?: Tristate;
  emitBOM?: Tristate;
  emitDecoratorMetadata?: Tristate;
  declaration?: Tristate;
  declarationDir?: string;
  declarationMap?: Tristate;
  deduplicatePackages?: Tristate;
  disableSizeLimit?: Tristate;
  disableSourceOfProjectReferenceRedirect?: Tristate;
  disableSolutionSearching?: Tristate;
  disableReferencedProjectLoad?: Tristate;
  erasableSyntaxOnly?: Tristate;
  exactOptionalPropertyTypes?: Tristate;
  experimentalDecorators?: Tristate;
  forceConsistentCasingInFileNames?: Tristate;
  isolatedModules?: Tristate;
  isolatedDeclarations?: Tristate;
  ignoreConfig?: Tristate;
  ignoreDeprecations?: string;
  importHelpers?: Tristate;
  inlineSourceMap?: Tristate;
  inlineSources?: Tristate;
  init?: Tristate;
  incremental?: Tristate;
  jsx?: JsxEmit;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  jsxImportSource?: string;
  lib?: readonly string[];
  libReplacement?: Tristate;
  locale?: string;
  mapRoot?: string;
  module?: ModuleKind;
  moduleResolution?: ModuleResolutionKind;
  moduleSuffixes?: readonly string[];
  moduleDetection?: ModuleDetectionKind;
  newLine?: NewLineKind;
  noEmit?: Tristate;
  noCheck?: Tristate;
  noErrorTruncation?: Tristate;
  noFallthroughCasesInSwitch?: Tristate;
  noImplicitAny?: Tristate;
  noImplicitThis?: Tristate;
  noImplicitReturns?: Tristate;
  noEmitHelpers?: Tristate;
  noLib?: Tristate;
  noPropertyAccessFromIndexSignature?: Tristate;
  noUncheckedIndexedAccess?: Tristate;
  noEmitOnError?: Tristate;
  noUnusedLocals?: Tristate;
  noUnusedParameters?: Tristate;
  noResolve?: Tristate;
  noImplicitOverride?: Tristate;
  noUncheckedSideEffectImports?: Tristate;
  outDir?: string;
  paths?: ReadonlyMap<string, readonly string[]>;
  preserveConstEnums?: Tristate;
  preserveSymlinks?: Tristate;
  project?: string;
  resolveJsonModule?: Tristate;
  resolvePackageJsonExports?: Tristate;
  resolvePackageJsonImports?: Tristate;
  removeComments?: Tristate;
  rewriteRelativeImportExtensions?: Tristate;
  reactNamespace?: string;
  rootDir?: string;
  rootDirs?: readonly string[];
  skipLibCheck?: Tristate;
  stableTypeOrdering?: Tristate;
  strict?: Tristate;
  strictBindCallApply?: Tristate;
  strictBuiltinIteratorReturn?: Tristate;
  strictFunctionTypes?: Tristate;
  strictNullChecks?: Tristate;
  strictPropertyInitialization?: Tristate;
  stripInternal?: Tristate;
  skipDefaultLibCheck?: Tristate;
  sourceMap?: Tristate;
  sourceRoot?: string;
  suppressOutputPathCheck?: Tristate;
  target?: ScriptTarget;
  traceResolution?: Tristate;
  tsBuildInfoFile?: string;
  typeRoots?: readonly string[];
  types?: readonly string[];
  useDefineForClassFields?: Tristate;
  useUnknownInCatchVariables?: Tristate;
  verbatimModuleSyntax?: Tristate;
  maxNodeModuleJsDepth?: number;

  // Deprecated: options-parsing-only.
  allowSyntheticDefaultImports?: Tristate;
  alwaysStrict?: Tristate;
  baseUrl?: string;
  downlevelIteration?: Tristate;
  esModuleInterop?: Tristate;
  outFile?: string;

  // Internal fields
  configFilePath?: string;
  noDtsResolution?: Tristate;
  pathsBasePath?: string;
  diagnostics?: Tristate;
  extendedDiagnostics?: Tristate;
  generateCpuProfile?: string;
  generateTrace?: string;
  listEmittedFiles?: Tristate;
  listFiles?: Tristate;
  explainFiles?: Tristate;
  listFilesOnly?: Tristate;
  noEmitForJsFiles?: Tristate;
  preserveWatchOutput?: Tristate;
  pretty?: Tristate;
  version?: Tristate;
  watch?: Tristate;
  showConfig?: Tristate;
  build?: Tristate;
  help?: Tristate;
  all?: Tristate;

  pprofDir?: string;
  singleThreaded?: Tristate;
  quiet?: Tristate;
  checkers?: number;
}

export const emptyCompilerOptions: CompilerOptions = Object.freeze({});

export function cloneCompilerOptions(options: CompilerOptions): CompilerOptions {
  return { ...options };
}

// ---------------------------------------------------------------------------
// Effective-value getters
// ---------------------------------------------------------------------------

export function getEmitScriptTarget(options: CompilerOptions): ScriptTarget {
  if (options.target !== undefined && options.target !== ScriptTarget.None) {
    return options.target;
  }
  return ScriptTarget.LatestStandard;
}

export function getEmitModuleKind(options: CompilerOptions): ModuleKind {
  if (options.module !== undefined && options.module !== ModuleKind.None) {
    return options.module;
  }
  const target = getEmitScriptTarget(options);
  if (target === ScriptTarget.ESNext) return ModuleKind.ESNext;
  if (target >= ScriptTarget.ES2022) return ModuleKind.ES2022;
  if (target >= ScriptTarget.ES2020) return ModuleKind.ES2020;
  if (target >= ScriptTarget.ES2015) return ModuleKind.ES2015;
  return ModuleKind.CommonJS;
}

export function getModuleResolutionKind(options: CompilerOptions): ModuleResolutionKind {
  const mr = options.moduleResolution ?? ModuleResolutionKind.Unknown;
  if (
    mr === ModuleResolutionKind.Unknown ||
    mr === ModuleResolutionKind.Classic ||
    mr === ModuleResolutionKind.Node10
  ) {
    const m = getEmitModuleKind(options);
    if (m === ModuleKind.Node16 || m === ModuleKind.Node18 || m === ModuleKind.Node20) {
      return ModuleResolutionKind.Node16;
    }
    if (m === ModuleKind.NodeNext) return ModuleResolutionKind.NodeNext;
    return ModuleResolutionKind.Bundler;
  }
  return mr;
}

export function getEmitModuleDetectionKind(options: CompilerOptions): ModuleDetectionKind {
  if (options.moduleDetection !== undefined && options.moduleDetection !== ModuleDetectionKind.None) {
    return options.moduleDetection;
  }
  const m = getEmitModuleKind(options);
  if (m >= ModuleKind.Node16 && m <= ModuleKind.NodeNext) return ModuleDetectionKind.Force;
  return ModuleDetectionKind.Auto;
}

export function getResolvePackageJsonExports(options: CompilerOptions): boolean {
  return isTrueOrUnknown(options.resolvePackageJsonExports);
}

export function getResolvePackageJsonImports(options: CompilerOptions): boolean {
  return isTrueOrUnknown(options.resolvePackageJsonImports);
}

export function getAllowImportingTsExtensions(options: CompilerOptions): boolean {
  return isTrue(options.allowImportingTsExtensions) || isTrue(options.rewriteRelativeImportExtensions);
}

export function allowImportingTsExtensionsFrom(options: CompilerOptions, fileName: string): boolean {
  return getAllowImportingTsExtensions(options) || isDeclarationFileName(fileName);
}

export function getResolveJsonModule(options: CompilerOptions): boolean {
  if (options.resolveJsonModule !== undefined && options.resolveJsonModule !== TSUnknown) {
    return options.resolveJsonModule === TSTrue;
  }
  const m = getEmitModuleKind(options);
  if (m === ModuleKind.Node20 || m === ModuleKind.NodeNext) return true;
  return getModuleResolutionKind(options) === ModuleResolutionKind.Bundler;
}

export function shouldPreserveConstEnums(options: CompilerOptions): boolean {
  return options.preserveConstEnums === TSTrue || getIsolatedModules(options);
}

export function getAllowJS(options: CompilerOptions): boolean {
  if (options.allowJs !== undefined && options.allowJs !== TSUnknown) {
    return options.allowJs === TSTrue;
  }
  return options.checkJs === TSTrue;
}

export function getJSXTransformEnabled(options: CompilerOptions): boolean {
  const j = options.jsx ?? JsxEmit.None;
  return j === JsxEmit.React || j === JsxEmit.ReactJSX || j === JsxEmit.ReactJSXDev;
}

export function getStrictOptionValue(options: CompilerOptions, value: Tristate | undefined): boolean {
  if (value !== undefined && value !== TSUnknown) return value === TSTrue;
  return options.strict !== TSFalse;
}

export function getEffectiveTypeRoots(
  options: CompilerOptions,
  currentDirectory: string,
): { typeRoots: readonly string[]; fromConfig: boolean } {
  if (options.typeRoots !== undefined) {
    return { typeRoots: options.typeRoots, fromConfig: true };
  }
  let baseDir: string;
  if (options.configFilePath !== undefined && options.configFilePath !== "") {
    baseDir = getDirectoryPath(options.configFilePath);
  } else {
    if (currentDirectory === "") {
      throw new Error("cannot get effective type roots without a config file path or current directory");
    }
    baseDir = currentDirectory;
  }
  const typeRoots: string[] = [];
  forEachAncestorDirectory(baseDir, (dir) => {
    typeRoots.push(combinePaths(dir, "node_modules", "@types"));
    return undefined;
  });
  return { typeRoots, fromConfig: false };
}

export function usesWildcardTypes(options: CompilerOptions): boolean {
  return (options.types ?? []).includes("*");
}

export function getIsolatedModules(options: CompilerOptions): boolean {
  return options.isolatedModules === TSTrue || options.verbatimModuleSyntax === TSTrue;
}

export function isIncremental(options: CompilerOptions): boolean {
  return isTrue(options.incremental) || isTrue(options.composite);
}

export function getEmitStandardClassFields(options: CompilerOptions): boolean {
  return options.useDefineForClassFields !== TSFalse && getEmitScriptTarget(options) >= ScriptTarget.ES2022;
}

export function getUseDefineForClassFields(options: CompilerOptions): boolean {
  const v = options.useDefineForClassFields ?? TSUnknown;
  if (v === TSUnknown) return getEmitScriptTarget(options) >= ScriptTarget.ES2022;
  return v === TSTrue;
}

export function getEmitDeclarations(options: CompilerOptions): boolean {
  return isTrue(options.declaration) || isTrue(options.composite);
}

export function getAreDeclarationMapsEnabled(options: CompilerOptions): boolean {
  return options.declarationMap === TSTrue && getEmitDeclarations(options);
}

export function hasJsonModuleEmitEnabled(options: CompilerOptions): boolean {
  const m = getEmitModuleKind(options);
  if (m === ModuleKind.System || m === ModuleKind.UMD) return false;
  return true;
}

export function getPathsBasePath(options: CompilerOptions, currentDirectory: string): string {
  if (options.paths === undefined || options.paths.size === 0) return "";
  if (options.pathsBasePath !== undefined && options.pathsBasePath !== "") return options.pathsBasePath;
  return currentDirectory;
}

// ---------------------------------------------------------------------------
// Forward-declared tspath helpers (cross-module dep)
// ---------------------------------------------------------------------------

declare function isDeclarationFileName(fileName: string): boolean;
declare function getDirectoryPath(path: string): string;
declare function combinePaths(...paths: readonly string[]): string;
declare function forEachAncestorDirectory<T>(directory: string, callback: (dir: string) => T | undefined): T | undefined;
