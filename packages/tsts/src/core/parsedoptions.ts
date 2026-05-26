/**
 * Aggregated parsed options.
 *
 * Port of TS-Go `internal/core/parsedoptions.go` (10 LoC).
 */

import type { CompilerOptions } from "./compileroptions.js";
import type { WatchOptions } from "./watchoptions.js";
import type { TypeAcquisition } from "./typeacquisition.js";
import type { ProjectReference } from "./projectreference.js";

export interface ParsedOptions {
  compilerOptions?: CompilerOptions;
  watchOptions?: WatchOptions;
  typeAcquisition?: TypeAcquisition;
  fileNames: readonly string[];
  projectReferences: readonly ProjectReference[];
}
