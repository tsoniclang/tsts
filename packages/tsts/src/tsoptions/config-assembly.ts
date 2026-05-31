/**
 * Parsed-command-line assembly from normalized tsconfig parts.
 *
 * TS-Go's `tsconfigparsing.go` builds a `ParsedCommandLine` by combining
 * default options, inherited options, own root options, file specs, project
 * references, and diagnostics. This module makes that assembly explicit so
 * partial parsers can share the same merge semantics.
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import { ParsedCommandLine } from "./parsedcommandline.js";
import type { Diagnostic } from "../ast/index.js";
import type { ProjectReference } from "../core/projectreference.js";
import type { ComparePathsOptions } from "../tspath/index.js";
import type { NormalizedConfigFileSpecs } from "./config-specs.js";

export interface ParsedCommandLineAssemblyInput {
  readonly compilerOptions: CompilerOptions;
  readonly inheritedCompilerOptions?: CompilerOptions;
  readonly fileNames: readonly string[];
  readonly projectReferences: readonly ProjectReference[];
  readonly configFileName: string;
  readonly raw: unknown;
  readonly specs: NormalizedConfigFileSpecs | undefined;
  readonly compileOnSave: boolean | undefined;
  readonly comparePathsOptions: ComparePathsOptions;
  readonly diagnostics: readonly Diagnostic[];
}

export interface ParsedCommandLineAssemblyResult {
  readonly parsedCommandLine: ParsedCommandLine;
  readonly projectReferences: readonly ProjectReference[];
  readonly specs: NormalizedConfigFileSpecs | undefined;
}

export function assembleParsedCommandLine(
  input: ParsedCommandLineAssemblyInput,
): ParsedCommandLineAssemblyResult {
  const compilerOptions = mergeCompilerOptionObjects(
    input.inheritedCompilerOptions ?? {},
    input.compilerOptions,
  );
  const parsed = new ParsedCommandLine(
    compilerOptions,
    input.fileNames,
    input.comparePathsOptions,
  );
  parsed.raw = input.raw;
  parsed.errors = input.diagnostics;
  if (input.compileOnSave !== undefined) parsed.compileOnSave = input.compileOnSave;
  return {
    parsedCommandLine: parsed,
    projectReferences: input.projectReferences,
    specs: input.specs,
  };
}

export function mergeCompilerOptionObjects(
  inherited: CompilerOptions,
  own: CompilerOptions,
): CompilerOptions {
  const result: Record<string, unknown> = { ...(inherited as Record<string, unknown>) };
  for (const [key, value] of Object.entries(own as Record<string, unknown>)) {
    if (value === null || value === undefined) {
      delete result[key];
    } else {
      result[key] = value;
    }
  }
  return result as CompilerOptions;
}

export function mergeRawTsconfigObjects(
  inherited: Record<string, unknown>,
  own: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...inherited };
  for (const [key, value] of Object.entries(own)) {
    if (key === "compilerOptions") {
      result[key] = mergeRecord(
        asRecord(inherited.compilerOptions),
        asRecord(value),
      );
    } else if (key === "watchOptions") {
      result[key] = mergeRecord(
        asRecord(inherited.watchOptions),
        asRecord(value),
      );
    } else if (key === "typeAcquisition") {
      result[key] = mergeRecord(
        asRecord(inherited.typeAcquisition),
        asRecord(value),
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

function mergeRecord(
  inherited: Record<string, unknown>,
  own: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...inherited };
  for (const [key, value] of Object.entries(own)) {
    if (value === null) {
      delete result[key];
    } else {
      result[key] = value;
    }
  }
  return result;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

export function appendConfigDiagnostics(
  existing: readonly Diagnostic[],
  additional: readonly Diagnostic[],
): readonly Diagnostic[] {
  if (existing.length === 0) return additional;
  if (additional.length === 0) return existing;
  return [...existing, ...additional];
}

export function parsedCommandLineHasErrors(parsed: ParsedCommandLine): boolean {
  return parsed.errors.length > 0;
}

export function parsedCommandLineFileCount(parsed: ParsedCommandLine): number {
  return parsed.parsedConfig.fileNames.length;
}

export function parsedCommandLineUsesConfigFile(parsed: ParsedCommandLine): boolean {
  return parsed.configName() !== "";
}
