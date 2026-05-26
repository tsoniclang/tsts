/**
 * `tsc -b` build-mode options.
 *
 * Port of TS-Go `internal/core/buildoptions.go` (16 LoC).
 */

import type { Tristate } from "./tristate.js";

export interface BuildOptions {
  dry?: Tristate;
  force?: Tristate;
  verbose?: Tristate;
  builders?: number;
  stopBuildOnErrors?: Tristate;

  // Internal
  clean?: Tristate;
}
