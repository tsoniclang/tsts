import type { GoSlice } from "../../go/compat.js";
import type { TextPos } from "../core/text.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source.go::type::Source","kind":"type","status":"implemented","sigHash":"48b2e4ad705e79122a041054fab903f83f0ec022e65751f33f0a4c419d699aee"}
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
