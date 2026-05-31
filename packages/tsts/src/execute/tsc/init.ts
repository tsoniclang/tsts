import type { CommandLineOption } from "../../tsoptions/index.js";

export interface InitConfigOptions {
  readonly compilerOptions: ReadonlyMap<string, unknown>;
  readonly files: readonly string[];
  readonly include: readonly string[];
  readonly exclude: readonly string[];
}

export function createDefaultInitConfig(): InitConfigOptions {
  return {
    compilerOptions: new Map<string, unknown>([
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
  const compilerOptions: Record<string, unknown> = {};
  for (const [key, value] of config.compilerOptions) compilerOptions[key] = value;
  const out: Record<string, unknown> = { compilerOptions };
  if (config.files.length > 0) out.files = config.files;
  if (config.include.length > 0) out.include = config.include;
  if (config.exclude.length > 0) out.exclude = config.exclude;
  return `${JSON.stringify(out, undefined, 2)}\n`;
}

export function optionDefaultForInit(option: CommandLineOption): readonly [string, unknown] | undefined {
  if (option.defaultValueDescription === undefined) return undefined;
  if (typeof option.defaultValueDescription === "object") return undefined;
  return [option.name, option.defaultValueDescription];
}
