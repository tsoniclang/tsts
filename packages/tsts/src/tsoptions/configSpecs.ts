/**
 * Config-file include/exclude/files normalization.
 *
 * TS-Go keeps this state in `configFileSpecs` inside
 * `internal/tsoptions/tsconfigparsing.go`. This TypeScript port keeps the
 * same separation: raw user specs are preserved for diagnostics, validated
 * specs are used for matching and show-config output, and the default include
 * marker is explicit rather than inferred by downstream callers.
 */

import {
  combinePaths,
  ensureTrailingDirectorySeparator,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  hasExtension,
  normalizePath,
  pathIsAbsolute,
  toPath,
  type ComparePathsOptions,
} from "../tspath/index.js";
import { newSpecMatcher, Usage } from "../vfs/vfsmatch/vfsMatch.js";

export const defaultIncludeSpec = "**/*";

export const implicitExcludeSpecs: readonly string[] = [
  "node_modules",
  "bower_components",
  "jspm_packages",
];

export interface ConfigFileSpecInput {
  readonly configFileName: string;
  readonly basePath: string;
  readonly files?: readonly string[];
  readonly include?: readonly string[];
  readonly exclude?: readonly string[];
  readonly outDir?: string;
  readonly declarationDir?: string;
  readonly configDirTemplateSubstitution?: string;
}

export interface NormalizedConfigFileSpecs {
  readonly filesSpecs: readonly string[] | undefined;
  readonly includeSpecs: readonly string[] | undefined;
  readonly excludeSpecs: readonly string[] | undefined;
  readonly validatedFilesSpec: readonly string[];
  readonly validatedIncludeSpecs: readonly string[];
  readonly validatedExcludeSpecs: readonly string[];
  readonly validatedFilesSpecBeforeSubstitution: readonly string[];
  readonly validatedIncludeSpecsBeforeSubstitution: readonly string[];
  readonly isDefaultIncludeSpec: boolean;
}

export interface FileSpecMatch {
  readonly fileName: string;
  readonly matchedBy: "files" | "include" | "none";
  readonly spec: string;
}

export function normalizeConfigFileSpecs(input: ConfigFileSpecInput): NormalizedConfigFileSpecs {
  const filesSpecs = cleanSpecArray(input.files);
  const includeSpecs = cleanSpecArray(input.include);
  const ownExcludeSpecs = cleanSpecArray(input.exclude);
  const defaultedInclude = filesSpecs === undefined && includeSpecs === undefined;
  const validatedFilesSpecBeforeSubstitution = filesSpecs ?? [];
  const validatedIncludeSpecsBeforeSubstitution = defaultedInclude
    ? [defaultIncludeSpec]
    : includeSpecs ?? [];
  const explicitExcludes = ownExcludeSpecs ?? [];
  const validatedExcludeSpecsBeforeSubstitution = [
    ...explicitExcludes,
    ...defaultExcludedOutputDirectories(input),
    ...implicitExcludeSpecs,
  ];
  return {
    filesSpecs,
    includeSpecs,
    excludeSpecs: ownExcludeSpecs,
    validatedFilesSpec: validatedFilesSpecBeforeSubstitution.map((spec) => normalizeSpec(input, spec)),
    validatedIncludeSpecs: validatedIncludeSpecsBeforeSubstitution.map((spec) => normalizeSpec(input, spec)),
    validatedExcludeSpecs: validatedExcludeSpecsBeforeSubstitution.map((spec) => normalizeSpec(input, spec)),
    validatedFilesSpecBeforeSubstitution,
    validatedIncludeSpecsBeforeSubstitution,
    isDefaultIncludeSpec: defaultedInclude,
  };
}

function cleanSpecArray(specs: readonly string[] | undefined): readonly string[] | undefined {
  if (specs === undefined) return undefined;
  const result = specs
    .map((spec) => spec.trim())
    .filter((spec) => spec.length > 0);
  return result.length === 0 ? [] : result;
}

function defaultExcludedOutputDirectories(input: ConfigFileSpecInput): readonly string[] {
  const result: string[] = [];
  if (input.outDir !== undefined && input.outDir !== "") result.push(input.outDir);
  if (input.declarationDir !== undefined && input.declarationDir !== "") result.push(input.declarationDir);
  return result;
}

function normalizeSpec(input: ConfigFileSpecInput, spec: string): string {
  const substituted = substituteConfigDirTemplate(spec, input.configDirTemplateSubstitution ?? input.basePath);
  const absolute = pathIsAbsolute(substituted)
    ? substituted
    : combinePaths(input.basePath, substituted);
  return normalizePath(absolute);
}

export function substituteConfigDirTemplate(spec: string, configDir: string): string {
  return spec.replaceAll("${configDir}", configDir);
}

export function getSpecsBasePath(configFileName: string, fallbackCurrentDirectory: string): string {
  return configFileName === ""
    ? fallbackCurrentDirectory
    : getDirectoryPath(getNormalizedAbsolutePath(configFileName, fallbackCurrentDirectory));
}

export function matchesExclude(
  specs: NormalizedConfigFileSpecs,
  fileName: string,
  comparePathsOptions: ComparePathsOptions,
): boolean {
  if (specs.validatedExcludeSpecs.length === 0) {
    return false;
  }
  const excludeMatcher = newSpecMatcher(
    specs.validatedExcludeSpecs,
    comparePathsOptions.currentDirectory,
    Usage.Exclude,
    comparePathsOptions.useCaseSensitiveFileNames,
  );
  if (excludeMatcher === undefined) {
    return false;
  }
  if (excludeMatcher.matchString(fileName)) {
    return true;
  }
  if (!hasExtension(fileName)) {
    if (excludeMatcher.matchString(ensureTrailingDirectorySeparator(fileName))) {
      return true;
    }
  }
  return false;
}

export function getMatchedIncludeSpec(
  specs: NormalizedConfigFileSpecs,
  fileName: string,
  comparePathsOptions: ComparePathsOptions,
): string {
  if (specs.validatedIncludeSpecs.length === 0) {
    return "";
  }
  for (let index = 0; index < specs.validatedIncludeSpecs.length; index += 1) {
    const spec = specs.validatedIncludeSpecs[index]!;
    const includeMatcher = newSpecMatcher(
      [spec],
      comparePathsOptions.currentDirectory,
      Usage.Files,
      comparePathsOptions.useCaseSensitiveFileNames,
    );
    if (includeMatcher !== undefined && includeMatcher.matchString(fileName)) {
      return specs.validatedIncludeSpecsBeforeSubstitution[index]!;
    }
  }
  return "";
}

export function getMatchedFileSpec(
  specs: NormalizedConfigFileSpecs,
  fileName: string,
  comparePathsOptions: ComparePathsOptions,
): string {
  if (specs.validatedFilesSpec.length === 0) return "";
  const filePath = toPath(
    fileName,
    comparePathsOptions.currentDirectory,
    comparePathsOptions.useCaseSensitiveFileNames,
  );
  for (let index = 0; index < specs.validatedFilesSpec.length; index += 1) {
    const spec = specs.validatedFilesSpec[index]!;
    const specPath = toPath(
      spec,
      comparePathsOptions.currentDirectory,
      comparePathsOptions.useCaseSensitiveFileNames,
    );
    if (specPath === filePath) return specs.validatedFilesSpecBeforeSubstitution[index] ?? spec;
  }
  return "";
}

export function classifyConfigFileName(
  specs: NormalizedConfigFileSpecs,
  fileName: string,
  comparePathsOptions: ComparePathsOptions,
): FileSpecMatch {
  const fileSpec = getMatchedFileSpec(specs, fileName, comparePathsOptions);
  if (fileSpec !== "") return { fileName, matchedBy: "files", spec: fileSpec };
  const includeSpec = getMatchedIncludeSpec(specs, fileName, comparePathsOptions);
  if (includeSpec !== "") return { fileName, matchedBy: "include", spec: includeSpec };
  return { fileName, matchedBy: "none", spec: "" };
}

export function filterSameAsDefaultInclude(specs: readonly string[]): readonly string[] | undefined {
  if (specs.length === 0) return undefined;
  if (specs.length === 1 && specs[0] === defaultIncludeSpec) return undefined;
  return specs;
}

export function getWildcardDirectoriesFromSpecs(
  specs: NormalizedConfigFileSpecs,
): ReadonlyMap<string, boolean> {
  const result = new Map<string, boolean>();
  for (const spec of specs.validatedIncludeSpecs) {
    const recursiveIndex = spec.indexOf("**");
    const firstWildcard = firstWildcardIndex(spec);
    if (firstWildcard === -1) continue;
    const directoryEnd = recursiveIndex >= 0 ? recursiveIndex : firstWildcard;
    const directory = normalizePath(spec.slice(0, directoryEnd));
    if (directory === "") continue;
    result.set(removeTrailingSpecSeparator(directory), recursiveIndex >= 0);
  }
  return result;
}

function firstWildcardIndex(spec: string): number {
  const star = spec.indexOf("*");
  const question = spec.indexOf("?");
  if (star === -1) return question;
  if (question === -1) return star;
  return Math.min(star, question);
}

function removeTrailingSpecSeparator(path: string): string {
  if (path.endsWith("/") && path.length > 1) return path.slice(0, -1);
  return path;
}
