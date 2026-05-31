/**
 * Machine-readable option schema.
 *
 * TS-Go's declaration structs serve as both parser metadata and schema for
 * docs/showConfig/tsconfig validation. This module projects the declaration
 * table into a JSON-serializable schema while preserving enum domains,
 * list element shapes, command-line-only flags, and tsconfig-only flags.
 */

import type { CommandLineOption } from "./commandLineOption.js";
import { optionDeclarations } from "./declsCompiler.js";
import { buildOpts } from "./declsBuild.js";
import { watchOptions } from "./declsWatch.js";
import { typeAcquisitionDeclarations } from "./declsTypeAcquisition.js";
import { optionCatalogByName, type OptionCatalogEntry } from "./optionCatalog.js";

export interface OptionSchema {
  readonly name: string;
  readonly shortName: string | undefined;
  readonly owner: "compiler" | "build" | "watch" | "typeAcquisition";
  readonly value: OptionSchemaValue;
  readonly category: string;
  readonly isFilePath: boolean;
  readonly isCommandLineOnly: boolean;
  readonly isTSConfigOnly: boolean;
  readonly allowedInTsconfig: boolean;
  readonly allowedOnCommandLine: boolean;
}

export type OptionSchemaValue =
  | { readonly kind: "string" }
  | { readonly kind: "number"; readonly minValue: number | undefined }
  | { readonly kind: "boolean" }
  | { readonly kind: "object" }
  | { readonly kind: "enum"; readonly values: readonly string[] }
  | { readonly kind: "list"; readonly element: OptionSchemaValue | undefined }
  | { readonly kind: "listOrElement"; readonly element: OptionSchemaValue | undefined };

const catalogByName = optionCatalogByName();

export function buildCompilerOptionSchema(): readonly OptionSchema[] {
  return optionDeclarations.map((option) => optionSchemaFromDeclaration(option, "compiler"));
}

export function buildBuildOptionSchema(): readonly OptionSchema[] {
  return buildOpts.map((option) => optionSchemaFromDeclaration(option, "build"));
}

export function buildWatchOptionSchema(): readonly OptionSchema[] {
  return watchOptions.map((option) => optionSchemaFromDeclaration(option, "watch"));
}

export function buildTypeAcquisitionOptionSchema(): readonly OptionSchema[] {
  return typeAcquisitionDeclarations.map((option) => optionSchemaFromDeclaration(option, "typeAcquisition"));
}

export function buildCompleteOptionSchema(): readonly OptionSchema[] {
  return [
    ...buildCompilerOptionSchema(),
    ...buildBuildOptionSchema(),
    ...buildWatchOptionSchema(),
    ...buildTypeAcquisitionOptionSchema(),
  ];
}

function optionSchemaFromDeclaration(
  option: CommandLineOption,
  owner: OptionSchema["owner"],
): OptionSchema {
  const catalog = catalogEntry(option);
  return {
    name: option.name,
    shortName: option.shortName,
    owner,
    value: valueSchemaFromDeclaration(option),
    category: catalog?.category ?? "uncategorized",
    isFilePath: option.isFilePath === true,
    isCommandLineOnly: option.isCommandLineOnly === true,
    isTSConfigOnly: option.isTSConfigOnly === true,
    allowedInTsconfig: option.isCommandLineOnly !== true,
    allowedOnCommandLine: option.isTSConfigOnly !== true,
  };
}

function valueSchemaFromDeclaration(option: CommandLineOption): OptionSchemaValue {
  if (option.type === "string") return { kind: "string" };
  if (option.type === "number") return { kind: "number", minValue: option.minValue };
  if (option.type === "boolean") return { kind: "boolean" };
  if (option.type === "object") return { kind: "object" };
  if (option.type === "list") {
    const element = option.element ?? option.elements?.();
    return { kind: "list", element: element === undefined ? undefined : valueSchemaFromDeclaration(element) };
  }
  if (option.type === "listOrElement") {
    const element = option.element ?? option.elements?.();
    return { kind: "listOrElement", element: element === undefined ? undefined : valueSchemaFromDeclaration(element) };
  }
  return { kind: "enum", values: [...option.type.keys()] };
}

function catalogEntry(option: CommandLineOption): OptionCatalogEntry | undefined {
  return catalogByName.get(option.name.toLowerCase());
}

export function optionSchemaByName(): ReadonlyMap<string, OptionSchema> {
  const map = new Map<string, OptionSchema>();
  for (const schema of buildCompleteOptionSchema()) {
    map.set(schema.name.toLowerCase(), schema);
    if (schema.shortName !== undefined) map.set(schema.shortName.toLowerCase(), schema);
  }
  return map;
}

export function schemaForOption(name: string): OptionSchema | undefined {
  return optionSchemaByName().get(name.toLowerCase());
}

export function optionSchemaValueToString(value: OptionSchemaValue): string {
  switch (value.kind) {
    case "string":
      return "string";
    case "number":
      return value.minValue === undefined ? "number" : `number >= ${value.minValue}`;
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    case "enum":
      return value.values.join(" | ");
    case "list":
      return value.element === undefined ? "list" : `list<${optionSchemaValueToString(value.element)}>`;
    case "listOrElement":
      return value.element === undefined
        ? "listOrElement"
        : `${optionSchemaValueToString(value.element)} | list<${optionSchemaValueToString(value.element)}>`;
  }
}

export function serializeOptionSchemaForJson(schema: readonly OptionSchema[]): readonly Record<string, unknown>[] {
  return schema.map((option) => ({
    name: option.name,
    shortName: option.shortName,
    owner: option.owner,
    value: optionSchemaValueToString(option.value),
    category: option.category,
    isFilePath: option.isFilePath,
    allowedInTsconfig: option.allowedInTsconfig,
    allowedOnCommandLine: option.allowedOnCommandLine,
  }));
}
