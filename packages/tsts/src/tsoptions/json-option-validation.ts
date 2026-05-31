/**
 * JSON option validation.
 *
 * TS-Go validates command-line options and tsconfig JSON properties through
 * the same declaration table. This module ports that behavior as a reusable
 * validation layer: unknown keys, wrong primitive types, enum values, list
 * element shapes, path-only options, and command-line-only/tsconfig-only
 * boundaries are checked before options are copied into compiler state.
 */

import type { CommandLineOption } from "./commandlineoption.js";
import { optionDeclarations } from "./declscompiler.js";
import { buildOpts } from "./declsbuild.js";
import { watchOptions } from "./declswatch.js";
import { typeAcquisitionDeclarations } from "./declstypeacquisition.js";

export type JsonOptionScope =
  | "compilerOptions"
  | "buildOptions"
  | "watchOptions"
  | "typeAcquisition";

export interface JsonOptionValidationDiagnostic {
  readonly scope: JsonOptionScope;
  readonly option: string;
  readonly path: readonly string[];
  readonly message: string;
  readonly value: unknown;
}

export interface JsonOptionValidationResult {
  readonly diagnostics: readonly JsonOptionValidationDiagnostic[];
  readonly accepted: ReadonlyMap<string, unknown>;
}

const declarationsByScope: ReadonlyMap<JsonOptionScope, readonly CommandLineOption[]> = new Map([
  ["compilerOptions", optionDeclarations],
  ["buildOptions", buildOpts],
  ["watchOptions", watchOptions],
  ["typeAcquisition", typeAcquisitionDeclarations],
]);

export function validateJsonOptions(
  scope: JsonOptionScope,
  json: unknown,
): JsonOptionValidationResult {
  const diagnostics: JsonOptionValidationDiagnostic[] = [];
  const accepted = new Map<string, unknown>();
  const declarations = declarationsByScope.get(scope) ?? [];
  const nameMap = declarationMap(declarations);
  if (json === undefined) return { diagnostics, accepted };
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    diagnostics.push({
      scope,
      option: scope,
      path: [scope],
      message: `${scope} must be an object.`,
      value: json,
    });
    return { diagnostics, accepted };
  }
  for (const [key, value] of Object.entries(json as Record<string, unknown>)) {
    const declaration = nameMap.get(key.toLowerCase());
    if (declaration === undefined) {
      diagnostics.push({
        scope,
        option: key,
        path: [scope, key],
        message: `Unknown option '${key}'.`,
        value,
      });
      continue;
    }
    const optionDiagnostics = validateJsonOptionValue(scope, declaration, value, [scope, declaration.name]);
    diagnostics.push(...optionDiagnostics);
    if (optionDiagnostics.length === 0) accepted.set(declaration.name, value);
  }
  return { diagnostics, accepted };
}

function declarationMap(declarations: readonly CommandLineOption[]): ReadonlyMap<string, CommandLineOption> {
  const result = new Map<string, CommandLineOption>();
  for (const declaration of declarations) {
    result.set(declaration.name.toLowerCase(), declaration);
    if (declaration.shortName !== undefined) result.set(declaration.shortName.toLowerCase(), declaration);
  }
  return result;
}

export function validateJsonOptionValue(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  if (value === undefined || value === null) {
    return declaration.disallowNullOrUndefined === true || declaration.name === "extends"
      ? [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' cannot be null or undefined.`, value)]
      : [];
  }
  if (declaration.type === "boolean") return validateBoolean(scope, declaration, value, path);
  if (declaration.type === "number") return validateNumber(scope, declaration, value, path);
  if (declaration.type === "string") return validateString(scope, declaration, value, path);
  if (declaration.type === "object") return validateObject(scope, declaration, value, path);
  if (declaration.type === "list") return validateList(scope, declaration, value, path, false);
  if (declaration.type === "listOrElement") return validateList(scope, declaration, value, path, true);
  return validateEnum(scope, declaration, value, path);
}

function validateBoolean(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  return typeof value === "boolean"
    ? []
    : [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be a boolean.`, value)];
}

function validateNumber(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be a number.`, value)];
  }
  if (declaration.minValue !== undefined && value < declaration.minValue) {
    return [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be at least ${declaration.minValue}.`, value)];
  }
  return [];
}

function validateString(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  return typeof value === "string"
    ? []
    : [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be a string.`, value)];
}

function validateObject(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? []
    : [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be an object.`, value)];
}

function validateList(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
  allowSingleElement: boolean,
): readonly JsonOptionValidationDiagnostic[] {
  const values = Array.isArray(value) ? value : allowSingleElement ? [value] : undefined;
  if (values === undefined) {
    return [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be an array.`, value)];
  }
  const element = declaration.element ?? declaration.elements?.();
  if (element === undefined) return [];
  const diagnostics: JsonOptionValidationDiagnostic[] = [];
  for (let index = 0; index < values.length; index += 1) {
    diagnostics.push(...validateJsonOptionValue(
      scope,
      element,
      values[index],
      [...path, String(index)],
    ));
  }
  return diagnostics;
}

function validateEnum(
  scope: JsonOptionScope,
  declaration: CommandLineOption,
  value: unknown,
  path: readonly string[],
): readonly JsonOptionValidationDiagnostic[] {
  if (!(declaration.type instanceof Map)) {
    return [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' is not backed by an enum map.`, value)];
  }
  if (typeof value !== "string") {
    return [diagnostic(scope, declaration.name, path, `Option '${declaration.name}' must be a string enum key.`, value)];
  }
  if (!declaration.type.has(value.toLowerCase())) {
    return [diagnostic(scope, declaration.name, path, `Unknown value '${value}' for option '${declaration.name}'.`, value)];
  }
  return [];
}

function diagnostic(
  scope: JsonOptionScope,
  option: string,
  path: readonly string[],
  message: string,
  value: unknown,
): JsonOptionValidationDiagnostic {
  return { scope, option, path, message, value };
}

export function validateTsconfigRoot(
  json: unknown,
): readonly JsonOptionValidationDiagnostic[] {
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return [diagnostic("compilerOptions", "root", [], "tsconfig root must be an object.", json)];
  }
  const object = json as Record<string, unknown>;
  const diagnostics: JsonOptionValidationDiagnostic[] = [];
  if (object.compilerOptions !== undefined) diagnostics.push(...validateJsonOptions("compilerOptions", object.compilerOptions).diagnostics);
  if (object.watchOptions !== undefined) diagnostics.push(...validateJsonOptions("watchOptions", object.watchOptions).diagnostics);
  if (object.typeAcquisition !== undefined) diagnostics.push(...validateJsonOptions("typeAcquisition", object.typeAcquisition).diagnostics);
  return diagnostics;
}

export function unknownRootOptionNames(json: unknown): readonly string[] {
  if (json === null || typeof json !== "object" || Array.isArray(json)) return [];
  const allowed = new Set([
    "compilerOptions",
    "watchOptions",
    "typeAcquisition",
    "extends",
    "references",
    "files",
    "include",
    "exclude",
    "compileOnSave",
  ]);
  return Object.keys(json as Record<string, unknown>).filter((key) => !allowed.has(key));
}
