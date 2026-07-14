import type { GoSlice } from "../../go/compat.js";
import type { TextPos } from "../core/text.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source.go::type::Source","kind":"type","status":"implemented","sigHash":"4d5d0f3845428c2d96c6c2fdd335486e1545543a0776f058798aaf2e4115441d"}
 *
 * Go source:
 * Source interface {
 * 	Text() string
 * 	FileName() string
 * 	ECMALineMap() []core.TextPos
 * }
 */
export interface Source {
  Text(): string;
  FileName(): string;
  ECMALineMap(): GoSlice<TextPos>;
}
