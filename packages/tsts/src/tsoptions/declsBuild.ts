/**
 * `tsc -b` build-mode option declarations.
 *
 * Port of TS-Go `internal/tsoptions/declsbuild.go` (~69 LoC).
 */

import type { CommandLineOption } from "./commandLineOption.js";

export const buildOpts: readonly CommandLineOption[] = [
  { name: "build", shortName: "b", type: "boolean", isCommandLineOnly: true, showInSimplifiedHelpView: true },
  { name: "help", shortName: "h", type: "boolean" },
  { name: "all", type: "boolean" },
  { name: "version", shortName: "v", type: "boolean" },
  { name: "verbose", shortName: "v", type: "boolean" },
  { name: "dry", shortName: "d", type: "boolean" },
  { name: "force", shortName: "f", type: "boolean" },
  { name: "clean", type: "boolean" },
  { name: "builders", type: "number", minValue: 1 },
  { name: "watch", shortName: "w", type: "boolean" },
  { name: "incremental", type: "boolean" },
  { name: "assumeChangesOnlyAffectDirectDependencies", type: "boolean" },
  { name: "stopBuildOnErrors", type: "boolean" },
  { name: "preserveWatchOutput", type: "boolean" },
];

export const tscBuildOption: CommandLineOption = buildOpts[0]!;

export function isBuildOption(name: string): boolean {
  return buildOpts.some((option) => option.name.toLowerCase() === name.toLowerCase() || option.shortName === name);
}
