/**
 * `--watch` option declarations.
 *
 * Port of TS-Go `internal/tsoptions/declswatch.go` (~88 LoC).
 */

import type { CommandLineOption } from "./commandLineOption.js";

export const watchOptions: readonly CommandLineOption[] = [
  { name: "watchInterval", type: "number" },
  { name: "watchFile", type: "string" },
  { name: "watchDirectory", type: "string" },
  { name: "fallbackPolling", type: "string" },
  { name: "synchronousWatchDirectory", type: "boolean" },
  {
    name: "excludeDirectories",
    type: "list",
    allowConfigDirTemplateSubstitution: true,
    element: { name: "excludeDirectory", type: "string", isFilePath: true },
  },
  {
    name: "excludeFiles",
    type: "list",
    allowConfigDirTemplateSubstitution: true,
    element: { name: "excludeFile", type: "string", isFilePath: true },
  },
];

export function isWatchOption(name: string): boolean {
  return watchOptions.some((option) => option.name.toLowerCase() === name.toLowerCase());
}
