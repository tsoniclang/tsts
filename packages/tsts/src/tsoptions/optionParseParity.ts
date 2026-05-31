/**
 * Command-line option parse parity helpers.
 *
 * TS-Go tsoptions normalizes raw argv/config values through a single option
 * declaration table. This module ports the shared parsing and diagnostics
 * policy for boolean, string, list, number, and enum-like options.
 */

export type OptionKind = "boolean" | "string" | "number" | "list" | "enum";

export interface OptionDeclaration {
  readonly name: string;
  readonly kind: OptionKind;
  readonly defaultValue?: unknown;
  readonly allowedValues?: readonly string[];
  readonly elementSeparator?: string;
}

export interface ParsedOption {
  readonly name: string;
  readonly value: unknown;
}

export interface OptionParseDiagnostic {
  readonly optionName: string;
  readonly message: string;
}

export interface OptionParseResult {
  readonly options: ReadonlyMap<string, unknown>;
  readonly diagnostics: readonly OptionParseDiagnostic[];
}

export function parseCommandLineOptions(raw: ReadonlyMap<string, string | readonly string[]>, declarations: readonly OptionDeclaration[]): OptionParseResult {
  const options = new Map<string, unknown>();
  const diagnostics: OptionParseDiagnostic[] = [];
  const declarationsByName = new Map(declarations.map(declaration => [normalizeOptionName(declaration.name), declaration]));
  for (const [rawName, rawValue] of raw) {
    const name = normalizeOptionName(rawName);
    const declaration = declarationsByName.get(name);
    if (declaration === undefined) {
      diagnostics.push({ optionName: rawName, message: `Unknown compiler option '${rawName}'.` });
      continue;
    }
    const parsed = parseOptionValue(declaration, rawValue);
    if (parsed.ok) options.set(declaration.name, parsed.value);
    else diagnostics.push({ optionName: declaration.name, message: parsed.message });
  }
  for (const declaration of declarations) {
    if (!options.has(declaration.name) && declaration.defaultValue !== undefined) options.set(declaration.name, declaration.defaultValue);
  }
  return { options, diagnostics };
}

export function parseOptionValue(declaration: OptionDeclaration, rawValue: string | readonly string[]): ParsedOptionValue {
  switch (declaration.kind) {
    case "boolean":
      return parseBooleanOption(rawValue);
    case "number":
      return parseNumberOption(rawValue);
    case "list":
      return { ok: true, value: parseListOption(rawValue, declaration.elementSeparator ?? ",") };
    case "enum":
      return parseEnumOption(declaration, rawValue);
    case "string":
      return { ok: true, value: Array.isArray(rawValue) ? rawValue[rawValue.length - 1] ?? "" : rawValue };
  }
}

export type ParsedOptionValue =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly message: string };

export function normalizeOptionName(name: string): string {
  return name.replace(/^--?/, "").toLowerCase();
}

export function parseBooleanOption(rawValue: string | readonly string[]): ParsedOptionValue {
  const value = Array.isArray(rawValue) ? rawValue[rawValue.length - 1] ?? "true" : rawValue;
  if (value === "" || value.toLowerCase() === "true") return { ok: true, value: true };
  if (value.toLowerCase() === "false") return { ok: true, value: false };
  return { ok: false, message: `Compiler option expects a boolean value, got '${value}'.` };
}

export function parseNumberOption(rawValue: string | readonly string[]): ParsedOptionValue {
  const value = Array.isArray(rawValue) ? rawValue[rawValue.length - 1] ?? "" : rawValue;
  const parsed = Number(value);
  if (Number.isFinite(parsed)) return { ok: true, value: parsed };
  return { ok: false, message: `Compiler option expects a number, got '${value}'.` };
}

export function parseEnumOption(declaration: OptionDeclaration, rawValue: string | readonly string[]): ParsedOptionValue {
  const value = Array.isArray(rawValue) ? rawValue[rawValue.length - 1] ?? "" : rawValue;
  const allowed = declaration.allowedValues ?? [];
  const match = allowed.find(candidate => candidate.toLowerCase() === value.toLowerCase());
  if (match !== undefined) return { ok: true, value: match };
  return { ok: false, message: `Compiler option '${declaration.name}' expects one of: ${allowed.join(", ")}.` };
}

export function parseListOption(rawValue: string | readonly string[], separator: string): readonly string[] {
  const values = Array.isArray(rawValue) ? rawValue : [rawValue];
  return values.flatMap(value => value.split(separator)).map(value => value.trim()).filter(value => value.length > 0);
}

export function optionMapToObject(options: ReadonlyMap<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of options) result[key] = value;
  return result;
}
