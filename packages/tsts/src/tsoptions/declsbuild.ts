/**
 * `tsc -b` build-mode option declarations.
 *
 * Port of TS-Go `internal/tsoptions/declsbuild.go` (~69 LoC).
 */

import type { CommandLineOption } from "./commandlineoption.js";

export const buildOpts: readonly CommandLineOption[] = [
  { name: "help", shortName: "h", type: "boolean" },
  { name: "all", type: "boolean" },
  { name: "version", shortName: "v", type: "boolean" },
  { name: "verbose", type: "boolean" },
  { name: "dry", type: "boolean" },
  { name: "force", type: "boolean" },
  { name: "clean", type: "boolean" },
  { name: "watch", shortName: "w", type: "boolean" },
  { name: "incremental", type: "boolean" },
  { name: "assumeChangesOnlyAffectDirectDependencies", type: "boolean" },
  { name: "stopBuildOnErrors", type: "boolean" },
  { name: "preserveWatchOutput", type: "boolean" },
];
