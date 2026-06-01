import { getCompilerOptionDeclaration, optionDeclarations, type CommandLineOption } from "../../tsoptions/index.js";

export type InitConfigValue = string | number | boolean | readonly string[];

export interface InitConfigOptions {
  readonly compilerOptions: ReadonlyMap<string, InitConfigValue>;
  readonly files: readonly string[];
  readonly include: readonly string[];
  readonly exclude: readonly string[];
}

export interface InitSystem {
  readonly getCurrentDirectory: () => string;
  readonly fileExists: (path: string) => boolean;
  readonly writeFile: (path: string, text: string) => void;
  readonly write: (text: string) => void;
}

export type InitDiagnosticReporter = (message: string) => void;

type Commented = "never" | "always" | "optional";

export function createDefaultInitConfig(): InitConfigOptions {
  return {
    compilerOptions: new Map<string, InitConfigValue>([
      ["module", "nodenext"],
      ["target", "esnext"],
      ["types", []],
      ["sourceMap", true],
      ["declaration", true],
      ["declarationMap", true],
      ["noUncheckedIndexedAccess", true],
      ["exactOptionalPropertyTypes", true],
      ["strict", true],
      ["jsx", "react-jsx"],
      ["verbatimModuleSyntax", true],
      ["isolatedModules", true],
      ["noUncheckedSideEffectImports", true],
      ["moduleDetection", "force"],
      ["skipLibCheck", true],
    ]),
    files: [],
    include: [],
    exclude: [],
  };
}

export function writeConfigFile(
  sys: InitSystem,
  reportDiagnostic: InitDiagnosticReporter,
  options: ReadonlyMap<string, InitConfigValue> = createDefaultInitConfig().compilerOptions,
): void {
  const file = normalizePath(`${sys.getCurrentDirectory()}/tsconfig.json`);
  if (sys.fileExists(file)) {
    reportDiagnostic(`A tsconfig.json file is already defined at: ${file}`);
    return;
  }
  sys.writeFile(file, generateTsConfig(options));
  sys.write("\nCreated a new tsconfig.json\nYou can learn more at https://aka.ms/tsconfig\n");
}

export function generateTsConfig(options: ReadonlyMap<string, InitConfigValue>): string {
  const allSetOptions = [...options.keys()].filter((key) => key !== "init" && key !== "help" && key !== "watch");
  const lines: string[] = [];
  const emitHeader = (header: string): void => { lines.push(`    // ${header}`); };
  const newline = (): void => { lines.push(""); };
  const emitOption = (setting: string, defaultValue: InitConfigValue, commented: Commented): void => {
    const existingIndex = allSetOptions.indexOf(setting);
    if (existingIndex >= 0) allSetOptions.splice(existingIndex, 1);
    const comment = commented === "always" || (commented === "optional" && !options.has(setting));
    const value = options.get(setting) ?? defaultValue;
    const prefix = comment ? "    // " : "    ";
    lines.push(`${prefix}${quoteJsonString(setting)}: ${formatValueOrArray(setting, value)},`);
  };

  lines.push("{");
  lines.push("  // Visit https://aka.ms/tsconfig to read more about this file");
  lines.push("  \"compilerOptions\": {");
  emitHeader("File Layout");
  emitOption("rootDir", "./src", "optional");
  emitOption("outDir", "./dist", "optional");

  newline();
  emitHeader("Environment Settings");
  emitHeader("See also https://aka.ms/tsconfig/module");
  emitOption("module", "nodenext", "never");
  emitOption("target", "esnext", "never");
  emitOption("types", [], "never");
  if (options.has("lib")) emitOption("lib", options.get("lib") ?? [], "never");
  emitHeader("For nodejs:");
  lines.push("    // \"lib\": [\"esnext\"],");
  lines.push("    // \"types\": [\"node\"],");
  emitHeader("and npm install -D @types/node");

  newline();
  emitHeader("Other Outputs");
  emitOption("sourceMap", true, "never");
  emitOption("declaration", true, "never");
  emitOption("declarationMap", true, "never");

  newline();
  emitHeader("Stricter Typechecking Options");
  emitOption("noUncheckedIndexedAccess", true, "never");
  emitOption("exactOptionalPropertyTypes", true, "never");

  newline();
  emitHeader("Style Options");
  emitOption("noImplicitReturns", true, "optional");
  emitOption("noImplicitOverride", true, "optional");
  emitOption("noUnusedLocals", true, "optional");
  emitOption("noUnusedParameters", true, "optional");
  emitOption("noFallthroughCasesInSwitch", true, "optional");
  emitOption("noPropertyAccessFromIndexSignature", true, "optional");

  newline();
  emitHeader("Recommended Options");
  emitOption("strict", true, "never");
  emitOption("jsx", "react-jsx", "never");
  emitOption("verbatimModuleSyntax", true, "never");
  emitOption("isolatedModules", true, "never");
  emitOption("noUncheckedSideEffectImports", true, "never");
  emitOption("moduleDetection", "force", "never");
  emitOption("skipLibCheck", true, "never");

  if (allSetOptions.length !== 0) {
    newline();
    while (allSetOptions.length !== 0) {
      const key = allSetOptions[0]!;
      emitOption(key, options.get(key) ?? true, "never");
    }
  }

  lines.push("  }");
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

export function serializeInitConfig(config: InitConfigOptions): string {
  if (config.files.length === 0 && config.include.length === 0 && config.exclude.length === 0) {
    return generateTsConfig(config.compilerOptions);
  }
  const lines: string[] = ["{"];
  lines.push("  \"compilerOptions\": {");
  const options = [...config.compilerOptions.entries()];
  options.forEach(([key, value]: readonly [string, InitConfigValue], index: number): void => {
    lines.push(`    ${quoteJsonString(key)}: ${serializeInitConfigValue(value)}${index === options.length - 1 ? "" : ","}`);
  });
  lines.push("  }");
  appendStringArrayProperty(lines, "files", config.files);
  appendStringArrayProperty(lines, "include", config.include);
  appendStringArrayProperty(lines, "exclude", config.exclude);
  lines.push("}");
  return `${lines.join("\n")}\n`;
}

export function optionDefaultForInit(option: CommandLineOption): readonly [string, InitConfigValue] | undefined {
  if (option.defaultValueDescription === undefined) return undefined;
  const value = option.defaultValueDescription;
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") return undefined;
  return [option.name, value];
}

export function collectInitOptionDefaults(): ReadonlyMap<string, InitConfigValue> {
  const result = new Map<string, InitConfigValue>();
  for (const option of optionDeclarations) {
    const entry = optionDefaultForInit(option);
    if (entry !== undefined) result.set(entry[0], entry[1]);
  }
  return result;
}

function appendStringArrayProperty(lines: string[], name: string, values: readonly string[]): void {
  if (values.length === 0) return;
  lines[lines.length - 1] = `${lines[lines.length - 1]!},`;
  lines.push(`  ${quoteJsonString(name)}: ${serializeInitConfigValue(values)}`);
}

function serializeInitConfigValue(value: InitConfigValue): string {
  if (typeof value === "string") return quoteJsonString(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return `[${value.map((entry: string): string => quoteJsonString(entry)).join(", ")}]`;
}

function formatValueOrArray(settingName: string, value: InitConfigValue): string {
  const option = getCompilerOptionDeclaration(settingName);
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    return `[${value.map((entry) => formatSingleValue(option?.element ?? option, entry)).join(", ")}]`;
  }
  return formatSingleValue(option, value);
}

function formatSingleValue(option: CommandLineOption | undefined, value: string | number | boolean): string {
  const enumValue = option === undefined ? undefined : enumNameForValue(option, value);
  return serializeInitConfigValue(enumValue ?? value);
}

function enumNameForValue(option: CommandLineOption, value: string | number | boolean): string | undefined {
  const enumMap = option.enumMap?.();
  if (enumMap !== undefined) {
    for (const [name, enumValue] of enumMap.entries()) {
      if (enumValue === value) return name;
    }
  }
  if (option.type instanceof Map) {
    for (const [name, enumValue] of option.type.entries()) {
      if (enumValue === value) return name;
    }
  }
  return undefined;
}

function quoteJsonString(value: string): string {
  let result = "\"";
  for (let index = 0; index < value.length; index += 1) {
    const ch = value[index]!;
    if (ch === "\"" || ch === "\\") {
      result += `\\${ch}`;
    } else if (ch === "\n") {
      result += "\\n";
    } else if (ch === "\r") {
      result += "\\r";
    } else if (ch === "\t") {
      result += "\\t";
    } else {
      result += ch;
    }
  }
  result += "\"";
  return result;
}

function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const part of path.replace(/\\/g, "/").split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return `/${parts.join("/")}`;
}
