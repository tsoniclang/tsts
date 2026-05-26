/**
 * `tsc --showConfig` config printer.
 *
 * Port skeleton of TS-Go `internal/tsoptions/showconfig.go` (~389 LoC).
 * Produces a JSON-stringifiable view of an effective compiler-options
 * set with values normalized back to user-facing strings.
 */

import type { ParsedCommandLine } from "./parsedcommandline.js";

export interface ShowConfigOutput {
  compilerOptions: Record<string, unknown>;
  files: readonly string[];
  include: readonly string[] | undefined;
  exclude: readonly string[] | undefined;
  references: readonly unknown[] | undefined;
  watchOptions: Record<string, unknown> | undefined;
}

export function showConfig(parsed: ParsedCommandLine): string {
  const out: ShowConfigOutput = {
    compilerOptions: parsed.options ?? {},
    files: parsed.fileNames ?? [],
    include: undefined,
    exclude: undefined,
    references: parsed.projectReferences,
    watchOptions: parsed.watchOptions,
  };
  return JSON.stringify(out, undefined, 4);
}
