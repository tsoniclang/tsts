import type { CommandLineOption } from "../../tsoptions/index.js";
import { buildOpts } from "../../tsoptions/declsBuild.js";
import { watchOptions } from "../../tsoptions/declsWatch.js";
import { version } from "../../core/index.js";
import { Diagnostics } from "../../diagnostics/diagnostics.generated.js";
import { formatDiagnosticMessage } from "../../diagnostics/loc.generated.js";
import { createColors } from "./diagnostics.js";
import type { System } from "./compile.js";
import type { TextWriter } from "./statistics.js";

export interface HelpSection {
  readonly name: string;
  readonly options: readonly CommandLineOption[];
}

export interface HelpOptions {
  readonly all: boolean;
  readonly terminalWidth: number;
  readonly newLine: string;
  readonly sys?: System;
}

export function getOptionsForHelp(options: readonly CommandLineOption[], includeAll: boolean): readonly CommandLineOption[] {
  const sortedOptions = [...options].sort((left, right) => left.name.toLowerCase().localeCompare(right.name.toLowerCase()));
  if (includeAll) return sortedOptions;
  return sortedOptions.filter((option) => option.showInSimplifiedHelpView === true);
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
  return getDisplayNameTextOfOption(option);
}

export function optionDefault(option: CommandLineOption): string {
  return formatDefaultValue(
    option.defaultValueDescription,
    option.type === "list" || option.type === "listOrElement" ? option.elements?.() ?? option.element ?? option : option,
  );
}

export function formatOption(option: CommandLineOption, width: number): string {
  const usage = optionUsage(option);
  const description = option.description === undefined ? "" : formatDiagnosticMessage(option.description);
  const defaultValue = optionDefault(option);
  const suffix = defaultValue === "" ? "" : ` ${formatDiagnosticMessage(Diagnostics.X_default_Colon)} ${defaultValue}`;
  if (description === "") return usage;
  const indent = " ".repeat(Math.min(24, Math.max(2, width - usage.length)));
  return `${usage}${indent}${description}${suffix}`;
}

export function printHelp(
  writer: TextWriter,
  options: readonly CommandLineOption[],
  helpOptions: HelpOptions,
): void {
  const sys = helpOptions.sys ?? textWriterSystem(writer, helpOptions.terminalWidth);
  if (helpOptions.all) printAllHelp(sys, options);
  else printEasyHelp(sys, getOptionsForHelp(options, false));
}

export function printVersion(writer: TextWriter, compilerVersion: string, newLine: string): void {
  writer.write(`${formatDiagnosticMessage(Diagnostics.Version_0, compilerVersion)}${newLine}`);
}

export function printBuildHelp(sys: System, buildOptions: readonly CommandLineOption[] = buildOpts): void {
  const output: string[] = [];
  output.push(...getHeader(sys, `${formatDiagnosticMessage(Diagnostics.X_tsc_Colon_The_TypeScript_Compiler)} - ${formatDiagnosticMessage(Diagnostics.Version_0, version())}`));
  const before = formatDiagnosticMessage(Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds");
  output.push(...generateSectionOptionsOutput(
    sys,
    formatDiagnosticMessage(Diagnostics.BUILD_OPTIONS),
    buildOptions.filter((option) => option.name !== "build"),
    false,
    before,
    undefined,
  ));
  writeChunks(sys.writer(), output);
}

function printEasyHelp(sys: System, simpleOptions: readonly CommandLineOption[]): void {
  const colors = createColors(sys);
  const output: string[] = [];
  const example = (examples: readonly string[], description: string): void => {
    for (const command of examples) {
      output.push("  ", colors.blue(command), "\n");
    }
    output.push("  ", description, "\n", "\n");
  };

  const message = `${formatDiagnosticMessage(Diagnostics.X_tsc_Colon_The_TypeScript_Compiler)} - ${formatDiagnosticMessage(Diagnostics.Version_0, version())}`;
  output.push(...getHeader(sys, message));
  output.push(colors.bold(formatDiagnosticMessage(Diagnostics.COMMON_COMMANDS)), "\n", "\n");

  example(["tsc"], formatDiagnosticMessage(Diagnostics.Compiles_the_current_project_tsconfig_json_in_the_working_directory));
  example(["tsc app.ts util.ts"], formatDiagnosticMessage(Diagnostics.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options));
  example(["tsc -b"], formatDiagnosticMessage(Diagnostics.Build_a_composite_project_in_the_working_directory));
  example(["tsc --init"], formatDiagnosticMessage(Diagnostics.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory));
  example(["tsc -p ./path/to/tsconfig.json"], formatDiagnosticMessage(Diagnostics.Compiles_the_TypeScript_project_located_at_the_specified_path));
  example(["tsc --help --all"], formatDiagnosticMessage(Diagnostics.An_expanded_version_of_this_information_showing_all_possible_compiler_options));
  example(["tsc --noEmit", "tsc --target esnext"], formatDiagnosticMessage(Diagnostics.Compiles_the_current_project_with_additional_settings));

  const cliCommands: CommandLineOption[] = [];
  const configOptions: CommandLineOption[] = [];
  for (const option of simpleOptions) {
    if (option.isCommandLineOnly === true || option.category?.key === Diagnostics.Command_line_Options.key) cliCommands.push(option);
    else configOptions.push(option);
  }

  output.push(...generateSectionOptionsOutput(sys, formatDiagnosticMessage(Diagnostics.COMMAND_LINE_FLAGS), cliCommands, false, undefined, undefined));
  const after = formatDiagnosticMessage(Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc");
  output.push(...generateSectionOptionsOutput(sys, formatDiagnosticMessage(Diagnostics.COMMON_COMPILER_OPTIONS), configOptions, false, undefined, after));
  writeChunks(sys.writer(), output);
}

function printAllHelp(sys: System, options: readonly CommandLineOption[]): void {
  const output: string[] = [];
  const message = `${formatDiagnosticMessage(Diagnostics.X_tsc_Colon_The_TypeScript_Compiler)} - ${formatDiagnosticMessage(Diagnostics.Version_0, version())}`;
  output.push(...getHeader(sys, message));
  const afterCompilerOptions = formatDiagnosticMessage(Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc");
  output.push(...generateSectionOptionsOutput(sys, formatDiagnosticMessage(Diagnostics.ALL_COMPILER_OPTIONS), options, true, undefined, afterCompilerOptions));
  const beforeWatchOptions = formatDiagnosticMessage(Diagnostics.Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_config_watch_mode_with_Colon);
  output.push(...generateSectionOptionsOutput(sys, formatDiagnosticMessage(Diagnostics.WATCH_OPTIONS), watchOptions, false, beforeWatchOptions, undefined));
  const beforeBuildOptions = formatDiagnosticMessage(Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds");
  output.push(...generateSectionOptionsOutput(sys, formatDiagnosticMessage(Diagnostics.BUILD_OPTIONS), buildOpts.filter((option) => option.name !== "build"), false, beforeBuildOptions, undefined));
  writeChunks(sys.writer(), output);
}

function getHeader(sys: System, message: string): readonly string[] {
  const colors = createColors(sys);
  const header: string[] = [];
  const terminalWidth = sys.getWidthOfTerminal();
  const tsIcon = "     ";
  const tsIconTS = "  TS ";
  const tsIconLength = tsIcon.length;
  const tsIconFirstLine = colors.blueBackground(tsIcon);
  const tsIconSecondLine = colors.blueBackground(colors.brightWhite(tsIconTS));
  if (terminalWidth >= message.length + tsIconLength) {
    const rightAlign = terminalWidth > 120 ? 120 : terminalWidth;
    const leftAlign = rightAlign - tsIconLength;
    header.push(padEnd(message, leftAlign), tsIconFirstLine, "\n");
    header.push(" ".repeat(leftAlign), tsIconSecondLine, "\n");
  } else {
    header.push(message, "\n", "\n");
  }
  return header;
}

function generateSectionOptionsOutput(
  sys: System,
  sectionName: string,
  options: readonly CommandLineOption[],
  subCategory: boolean,
  beforeOptionsDescription: string | undefined,
  afterOptionsDescription: string | undefined,
): readonly string[] {
  const output: string[] = [];
  output.push(createColors(sys).bold(sectionName), "\n", "\n");
  if (beforeOptionsDescription !== undefined) output.push(beforeOptionsDescription, "\n", "\n");
  if (!subCategory) {
    output.push(...generateGroupOptionOutput(sys, options));
    if (afterOptionsDescription !== undefined) output.push(afterOptionsDescription, "\n", "\n");
    return output;
  }

  const categoryMap = new Map<string, CommandLineOption[]>();
  const categoryOrder: string[] = [];
  for (const option of options) {
    if (option.category === undefined) continue;
    const category = formatDiagnosticMessage(option.category);
    if (!categoryMap.has(category)) {
      categoryOrder.push(category);
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(option);
  }
  for (const category of categoryOrder) {
    output.push("### ", category, "\n", "\n");
    output.push(...generateGroupOptionOutput(sys, categoryMap.get(category)!));
  }
  if (afterOptionsDescription !== undefined) output.push(afterOptionsDescription, "\n", "\n");
  return output;
}

function generateGroupOptionOutput(sys: System, optionsList: readonly CommandLineOption[]): readonly string[] {
  let maxLength = 0;
  for (const option of optionsList) {
    maxLength = Math.max(getDisplayNameTextOfOption(option).length, maxLength);
  }
  const rightAlignOfLeftPart = maxLength + 2;
  const leftAlignOfRightPart = rightAlignOfLeftPart + 2;
  const lines: string[] = [];
  for (const option of optionsList) {
    lines.push(...generateOptionOutput(sys, option, rightAlignOfLeftPart, leftAlignOfRightPart));
  }
  if (lines.length < 2 || lines[lines.length - 2] !== "\n") lines.push("\n");
  return lines;
}

function generateOptionOutput(
  sys: System,
  option: CommandLineOption,
  rightAlignOfLeft: number,
  leftAlignOfRight: number,
): readonly string[] {
  const colors = createColors(sys);
  const text: string[] = [];
  const name = getDisplayNameTextOfOption(option);
  const valueCandidates = getValueCandidate(option);
  const defaultValueDescription = optionDefault(option);
  const terminalWidth = sys.getWidthOfTerminal();
  if (terminalWidth >= 80) {
    const description = option.description === undefined ? "" : formatDiagnosticMessage(option.description);
    text.push(...getPrettyOutput(colors, name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, true), "\n");
    if (showAdditionalInfoOutput(valueCandidates, option)) {
      if (valueCandidates !== undefined) {
        text.push(...getPrettyOutput(colors, valueCandidates.valueType, valueCandidates.possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false), "\n");
      }
      if (defaultValueDescription !== "") {
        text.push(...getPrettyOutput(colors, formatDiagnosticMessage(Diagnostics.X_default_Colon), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false), "\n");
      }
    }
    text.push("\n");
  } else {
    text.push(colors.blue(name), "\n");
    if (option.description !== undefined) text.push(formatDiagnosticMessage(option.description));
    text.push("\n");
    if (showAdditionalInfoOutput(valueCandidates, option)) {
      if (valueCandidates !== undefined) text.push(valueCandidates.valueType, " ", valueCandidates.possibleValues);
      if (defaultValueDescription !== "") {
        if (valueCandidates !== undefined) text.push("\n");
        text.push(formatDiagnosticMessage(Diagnostics.X_default_Colon), " ", defaultValueDescription);
      }
      text.push("\n");
    }
    text.push("\n");
  }
  return text;
}

function formatDefaultValue(defaultValue: unknown, option: CommandLineOption): string {
  if (defaultValue === undefined || defaultValue === null) return "";
  if (typeof defaultValue === "object" && "key" in defaultValue && "message" in defaultValue) {
    return formatDiagnosticMessage(defaultValue as typeof Diagnostics.Version_0);
  }
  const enumMap = option.enumMap?.();
  if (enumMap !== undefined) {
    const names: string[] = [];
    for (const [name, value] of enumMap.entries()) {
      if (Object.is(value, defaultValue)) names.push(name);
    }
    return names.join("/");
  }
  return String(defaultValue);
}

interface ValueCandidate {
  readonly valueType: string;
  readonly possibleValues: string;
}

function showAdditionalInfoOutput(valueCandidates: ValueCandidate | undefined, option: CommandLineOption): boolean {
  if (option.category?.key === Diagnostics.Command_line_Options.key) return false;
  if (
    valueCandidates !== undefined
    && valueCandidates.possibleValues === "string"
    && (option.defaultValueDescription === undefined || option.defaultValueDescription === "false" || option.defaultValueDescription === "n/a")
  ) {
    return false;
  }
  return true;
}

function getValueCandidate(option: CommandLineOption): ValueCandidate | undefined {
  if (option.type === "object") return undefined;
  if (option.type === "listOrElement") throw new Error("no value candidate for list or element");
  let valueType: string;
  if (option.type === "string" || option.type === "number" || option.type === "boolean") {
    valueType = formatDiagnosticMessage(Diagnostics.X_type_Colon);
  } else if (option.type === "list") {
    valueType = formatDiagnosticMessage(Diagnostics.X_one_or_more_Colon);
  } else {
    valueType = formatDiagnosticMessage(Diagnostics.X_one_of_Colon);
  }
  return { valueType, possibleValues: getPossibleValues(option) };
}

function getPossibleValues(option: CommandLineOption): string {
  if (option.type === "string" || option.type === "number" || option.type === "boolean") return option.type;
  if (option.type === "list" || option.type === "listOrElement") {
    return getPossibleValues(option.elements?.() ?? option.element ?? option);
  }
  const enumMap = option.enumMap?.();
  if (enumMap === undefined) return typeof option.type === "string" ? "" : [...option.type.keys()].join(", ");
  const deprecatedKeys = option.deprecatedKeys?.();
  const inverted = new Map<unknown, string[]>();
  for (const [name, value] of enumMap.entries()) {
    if (deprecatedKeys?.has(name) === true) continue;
    const existing = inverted.get(value);
    if (existing === undefined) inverted.set(value, [name]);
    else existing.push(name);
  }
  return [...inverted.values()].map((synonyms) => synonyms.join("/")).join(", ");
}

function getPrettyOutput(
  colors: ReturnType<typeof createColors>,
  left: string,
  right: string,
  rightAlignOfLeft: number,
  leftAlignOfRight: number,
  terminalWidth: number,
  colorLeft: boolean,
): readonly string[] {
  const result: string[] = [];
  let isFirstLine = true;
  let remainingRight = right;
  const rightCharacterNumber = terminalWidth - leftAlignOfRight;
  while (remainingRight.length > 0) {
    let currentLeft = "";
    if (isFirstLine) {
      currentLeft = padStart(left, rightAlignOfLeft);
      currentLeft = padEnd(currentLeft, leftAlignOfRight);
      if (colorLeft) currentLeft = colors.blue(currentLeft);
    } else {
      currentLeft = " ".repeat(leftAlignOfRight);
    }
    const currentRight = remainingRight.slice(0, rightCharacterNumber);
    remainingRight = remainingRight.slice(rightCharacterNumber);
    result.push(currentLeft, currentRight, "\n");
    isFirstLine = false;
  }
  if (right === "") {
    const currentLeft = colorLeft ? colors.blue(padEnd(padStart(left, rightAlignOfLeft), leftAlignOfRight)) : padEnd(padStart(left, rightAlignOfLeft), leftAlignOfRight);
    result.push(currentLeft);
  }
  return result;
}

function getDisplayNameTextOfOption(option: CommandLineOption): string {
  return option.shortName === undefined ? `--${option.name}` : `-${option.shortName}, --${option.name}`;
}

function padStart(value: string, width: number): string {
  if (value.length >= width) return value;
  return " ".repeat(width - value.length) + value;
}

function padEnd(value: string, width: number): string {
  if (value.length >= width) return value;
  return value + " ".repeat(width - value.length);
}

function writeChunks(writer: TextWriter, chunks: readonly string[]): void {
  for (const chunk of chunks) writer.write(chunk);
}

function textWriterSystem(writer: TextWriter, terminalWidth: number): System {
  return {
    writer: () => writer,
    fs: () => { throw new Error("help printer does not read the file system"); },
    defaultLibraryPath: () => "",
    getCurrentDirectory: () => "",
    writeOutputIsTTY: () => false,
    getWidthOfTerminal: () => terminalWidth,
    getEnvironmentVariable: () => "",
    now: () => new Date(),
    sinceStart: () => 0,
  };
}
