import type { CommandLineOption } from "../../tsoptions/index.js";

export type InitConfigValue = string | number | boolean | readonly string[];

export interface InitConfigOptions {
  readonly compilerOptions: ReadonlyMap<string, InitConfigValue>;
  readonly files: readonly string[];
  readonly include: readonly string[];
  readonly exclude: readonly string[];
}

export function createDefaultInitConfig(): InitConfigOptions {
  return {
    compilerOptions: new Map<string, InitConfigValue>([
      ["target", "es2016"],
      ["module", "commonjs"],
      ["strict", true],
      ["esModuleInterop", true],
      ["skipLibCheck", true],
      ["forceConsistentCasingInFileNames", true],
    ]),
    files: [],
    include: [],
    exclude: [],
  };
}

export function serializeInitConfig(config: InitConfigOptions): string {
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
