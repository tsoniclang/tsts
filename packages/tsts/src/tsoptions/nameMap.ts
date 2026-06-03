/**
 * Compiler/build/watch option lookup tables.
 *
 * Port of TS-Go `internal/tsoptions/namemap.go`. Provides
 * case-insensitive option name → declaration lookup with short-name
 * support. Used by the command-line parser.
 */

import type { CommandLineOption } from "./commandLineOption.js";
import { optionDeclarations } from "./declsCompiler.js";
import { buildOpts } from "./declsBuild.js";
import { watchOptions } from "./declsWatch.js";

/**
 * Map of canonical option names to declarations, plus a side index of
 * short-name aliases. Mirrors TS-Go `NameMap`.
 */
export class NameMap {
  private readonly optionsNames: Map<string, CommandLineOption>;
  private readonly shortOptionNames: Map<string, string>;

  constructor(optionsNames: Map<string, CommandLineOption>, shortOptionNames: Map<string, string>) {
    this.optionsNames = optionsNames;
    this.shortOptionNames = shortOptionNames;
  }

  get(name: string): CommandLineOption | undefined {
    return this.optionsNames.get(name.toLowerCase());
  }

  getFromShort(shortName: string): CommandLineOption | undefined {
    const name = this.shortOptionNames.get(shortName);
    if (name === undefined) return undefined;
    return this.get(name);
  }

  getOptionDeclarationFromName(optionName: string, allowShort: boolean): CommandLineOption | undefined {
    const lower = optionName.toLowerCase();
    if (allowShort) {
      const short = this.shortOptionNames.get(lower);
      if (short !== undefined && short !== "") return this.get(short);
    }
    return this.get(lower);
  }
}

/**
 * Builds a `NameMap` from a list of option declarations. Mirrors
 * TS-Go `GetNameMapFromList`.
 */
export function getNameMapFromList(optDecls: readonly CommandLineOption[]): NameMap {
  const optionsNames = new Map<string, CommandLineOption>();
  const shortOptionNames = new Map<string, string>();
  for (const option of optDecls) {
    optionsNames.set(option.name.toLowerCase(), option);
    if (option.shortName !== undefined && option.shortName !== "") {
      shortOptionNames.set(option.shortName, option.name);
    }
  }
  return new NameMap(optionsNames, shortOptionNames);
}

/**
 * Pre-built name maps for each parsing mode. Mirrors TS-Go's package-level
 * `CompilerNameMap`, `BuildNameMap`, `WatchNameMap` vars in namemap.go.
 */
export const CompilerNameMap: NameMap = getNameMapFromList(optionDeclarations);
export const BuildNameMap: NameMap = getNameMapFromList(buildOpts);
export const WatchNameMap: NameMap = getNameMapFromList(watchOptions);
