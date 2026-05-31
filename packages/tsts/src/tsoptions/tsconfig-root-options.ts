/**
 * tsconfig root option parsing.
 *
 * TS-Go treats the root of tsconfig.json as a distinct option object with
 * `compilerOptions`, `watchOptions`, `typeAcquisition`, `extends`,
 * `references`, `files`, `include`, `exclude`, and `compileOnSave`.
 * This file owns that root-level shape so config parsing can remain a direct
 * translation instead of scattering property-name probes throughout callers.
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import type { ProjectReference } from "../core/projectreference.js";
import { getDefaultCompilerOptionsForConfigFile } from "./option-defaults.js";
import { normalizeCompilerOptionsFromJson, type OptionNormalizationDiagnostic } from "./option-normalization.js";
import { parseExtendsList, type ParsedExtendsList } from "./extends-resolution.js";
import { parseProjectReferences, type ProjectReferenceParseDiagnostic } from "./project-reference-parsing.js";

export interface ParsedTsconfigRoot {
  readonly raw: Record<string, unknown>;
  readonly compilerOptions: CompilerOptions;
  readonly watchOptions: Record<string, unknown>;
  readonly typeAcquisition: Record<string, unknown>;
  readonly extends: ParsedExtendsList;
  readonly references: readonly ProjectReference[];
  readonly files: readonly string[] | undefined;
  readonly include: readonly string[] | undefined;
  readonly exclude: readonly string[] | undefined;
  readonly compileOnSave: boolean | undefined;
  readonly diagnostics: readonly TsconfigRootDiagnostic[];
}

export type TsconfigRootDiagnostic =
  | OptionNormalizationDiagnostic
  | ProjectReferenceParseDiagnostic
  | {
    readonly option: string;
    readonly message: string;
    readonly value: unknown;
  };

export function parseTsconfigRoot(
  json: unknown,
  configFileName: string,
  basePath: string,
): ParsedTsconfigRoot {
  const diagnostics: TsconfigRootDiagnostic[] = [];
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return {
      raw: {},
      compilerOptions: getDefaultCompilerOptionsForConfigFile(configFileName),
      watchOptions: {},
      typeAcquisition: {},
      extends: { values: [], diagnostics: ["tsconfig root must be an object."] },
      references: [],
      files: undefined,
      include: undefined,
      exclude: undefined,
      compileOnSave: undefined,
      diagnostics: [{ option: "root", message: "tsconfig root must be an object.", value: json }],
    };
  }
  const raw = json as Record<string, unknown>;
  const compiler = normalizeCompilerOptionsFromJson(raw.compilerOptions, basePath);
  diagnostics.push(...compiler.diagnostics);
  const extendsList = parseExtendsList(raw.extends);
  for (const message of extendsList.diagnostics) {
    diagnostics.push({ option: "extends", message, value: raw.extends });
  }
  const references = parseProjectReferences(raw.references, basePath);
  diagnostics.push(...references.diagnostics);
  const files = parseOptionalStringList(raw.files, "files", diagnostics);
  const include = parseOptionalStringList(raw.include, "include", diagnostics);
  const exclude = parseOptionalStringList(raw.exclude, "exclude", diagnostics);
  const compileOnSave = parseOptionalBoolean(raw.compileOnSave, "compileOnSave", diagnostics);
  return {
    raw,
    compilerOptions: {
      ...getDefaultCompilerOptionsForConfigFile(configFileName),
      ...(compiler.options as CompilerOptions),
    },
    watchOptions: parseOptionalObject(raw.watchOptions, "watchOptions", diagnostics),
    typeAcquisition: parseOptionalObject(raw.typeAcquisition, "typeAcquisition", diagnostics),
    extends: extendsList,
    references: references.references,
    files,
    include,
    exclude,
    compileOnSave,
    diagnostics,
  };
}

function parseOptionalStringList(
  value: unknown,
  option: string,
  diagnostics: TsconfigRootDiagnostic[],
): readonly string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    diagnostics.push({ option, message: `Option '${option}' must be an array of strings.`, value });
    return undefined;
  }
  const result: string[] = [];
  for (let index = 0; index < value.length; index += 1) {
    const item = value[index];
    if (typeof item === "string") {
      result.push(item);
    } else {
      diagnostics.push({ option, message: `Option '${option}' entry ${index} must be a string.`, value: item });
    }
  }
  return result;
}

function parseOptionalBoolean(
  value: unknown,
  option: string,
  diagnostics: TsconfigRootDiagnostic[],
): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  diagnostics.push({ option, message: `Option '${option}' must be a boolean.`, value });
  return undefined;
}

function parseOptionalObject(
  value: unknown,
  option: string,
  diagnostics: TsconfigRootDiagnostic[],
): Record<string, unknown> {
  if (value === undefined) return {};
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  diagnostics.push({ option, message: `Option '${option}' must be an object.`, value });
  return {};
}

export function tsconfigRootHasExplicitFileList(root: ParsedTsconfigRoot): boolean {
  return root.files !== undefined;
}

export function tsconfigRootHasExplicitIncludeList(root: ParsedTsconfigRoot): boolean {
  return root.include !== undefined;
}

export function tsconfigRootHasProjectReferences(root: ParsedTsconfigRoot): boolean {
  return root.references.length > 0;
}

export function tsconfigRootOwnFileSpecCount(root: ParsedTsconfigRoot): number {
  return (root.files?.length ?? 0) + (root.include?.length ?? 0) + (root.exclude?.length ?? 0);
}

export function tsconfigRootShouldUseDefaultInclude(root: ParsedTsconfigRoot): boolean {
  return root.files === undefined && root.include === undefined;
}
