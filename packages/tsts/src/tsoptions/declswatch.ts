/**
 * `--watch` option declarations.
 *
 * Port of TS-Go `internal/tsoptions/declswatch.go` (~88 LoC).
 */

import type { CommandLineOption } from "./commandlineoption.js";

export const watchOptions: readonly CommandLineOption[] = [
  { name: "watchFile", type: "string" },
  { name: "watchDirectory", type: "string" },
  { name: "fallbackPolling", type: "string" },
  { name: "synchronousWatchDirectory", type: "boolean" },
  { name: "excludeDirectories", type: "list", element: { name: "excludeDirectories", type: "string", isFilePath: true } },
  { name: "excludeFiles", type: "list", element: { name: "excludeFiles", type: "string", isFilePath: true } },
];
