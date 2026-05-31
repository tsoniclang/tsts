import type { CommandLineOption } from "../../tsoptions/index.js";
import type { TextWriter } from "./statistics.js";

export interface HelpSection {
  readonly name: string;
  readonly options: readonly CommandLineOption[];
}

export interface HelpOptions {
  readonly all: boolean;
  readonly terminalWidth: number;
  readonly newLine: string;
}

export function getOptionsForHelp(options: readonly CommandLineOption[], includeAll: boolean): readonly CommandLineOption[] {
  if (includeAll) return options;
  return options.filter((option) => option.isCommandLineOnly === true || option.shortName !== undefined || option.defaultValueDescription !== undefined);
}

export function groupOptionsForHelp(options: readonly CommandLineOption[]): readonly HelpSection[] {
  const sections = new Map<string, CommandLineOption[]>();
  for (const option of options) {
    const sectionName = option.category?.key ?? "Options";
    let section = sections.get(sectionName);
    if (section === undefined) {
      section = [];
      sections.set(sectionName, section);
    }
    section.push(option);
  }
  return [...sections].map(([name, sectionOptions]) => ({ name, options: sectionOptions }));
}

export function optionUsage(option: CommandLineOption): string {
  const names = option.shortName === undefined
    ? [`--${option.name}`]
    : [`-${option.shortName}`, `--${option.name}`];
  const typeName = typeof option.type === "string" ? option.type : "enum";
  if (typeName === "boolean") return names.join(", ");
  return `${names.join(", ")} ${option.paramType?.key ?? typeName}`;
}

export function optionDefault(option: CommandLineOption): string {
  const value = option.defaultValueDescription;
  if (value === undefined) return "";
  if (typeof value === "object") return String(value.key);
  return String(value);
}

export function formatOption(option: CommandLineOption, width: number): string {
  const usage = optionUsage(option);
  const description = option.description?.key ?? "";
  const defaultValue = optionDefault(option);
  const suffix = defaultValue === "" ? "" : ` Default: ${defaultValue}.`;
  if (description === "") return usage;
  const indent = " ".repeat(Math.min(24, Math.max(2, width - usage.length)));
  return `${usage}${indent}${description}${suffix}`;
}

export function printHelp(
  writer: TextWriter,
  options: readonly CommandLineOption[],
  helpOptions: HelpOptions,
): void {
  const sections = groupOptionsForHelp(getOptionsForHelp(options, helpOptions.all));
  writer.write(`tsc: The TypeScript Compiler${helpOptions.newLine}`);
  for (const section of sections) {
    writer.write(helpOptions.newLine);
    writer.write(`${section.name}:${helpOptions.newLine}`);
    for (const option of section.options) {
      writer.write(`  ${formatOption(option, helpOptions.terminalWidth)}${helpOptions.newLine}`);
    }
  }
}

export function printVersion(writer: TextWriter, version: string, newLine: string): void {
  writer.write(`Version ${version}${newLine}`);
}
