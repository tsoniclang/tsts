/**
 * Source interface — text-bearing input for the source-mapper.
 *
 * Port of TS-Go `internal/sourcemap/source.go` (9 LoC).
 */

import type { TextPos } from "../core/text.js";

export interface Source {
  text(): string;
  fileName(): string;
  ecmaLineMap(): readonly TextPos[];
}
