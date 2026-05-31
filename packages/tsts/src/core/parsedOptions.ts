/**
 * Aggregated parsed options.
 *
 * Port of TS-Go `internal/core/parsedoptions.go` (10 LoC).
 */

import type { CompilerOptions } from "./compilerOptions.js";
import type { WatchOptions } from "./watchOptions.js";
import type { TypeAcquisition } from "./typeAcquisition.js";
import type { ProjectReference } from "./projectReference.js";

export interface ParsedOptions {
  compilerOptions?: CompilerOptions;
  watchOptions?: WatchOptions;
  typeAcquisition?: TypeAcquisition;
  fileNames: readonly string[];
  projectReferences: readonly ProjectReference[];
}
