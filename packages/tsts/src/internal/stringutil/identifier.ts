import type { bool } from "../../go/scalars.js";
import type { GoRune } from "../../go/compat.js";
import { Is } from "../../go/unicode.js";
import { unicodeESNextIdentifierPart, unicodeESNextIdentifierStart } from "./generated/identifier_parts_generated.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/identifier.go::func::IsUnicodeIdentifierStart","kind":"func","status":"implemented","sigHash":"00c94e0e836886f4af4e812340e34999ab3bdc9a0b5ae9646a665a8345a997fe"}
 *
 * Go source:
 * // IsUnicodeIdentifierStart reports whether ch may begin an ECMAScript
 * // identifier, i.e. whether it has the Unicode ID_Start (or Other_ID_Start)
 * // property. The range table is generated; see generate-unicode-data.mts.
 * func IsUnicodeIdentifierStart(ch rune) bool {
 * 	return unicode.Is(unicodeESNextIdentifierStart, ch)
 * }
 */
export function IsUnicodeIdentifierStart(ch: GoRune): bool {
  return Is(unicodeESNextIdentifierStart, ch);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/identifier.go::func::IsUnicodeIdentifierPart","kind":"func","status":"implemented","sigHash":"75f99182642f3bb28d32ec63769743df9f11bfb9b95d99460997c13dc54a41b6"}
 *
 * Go source:
 * // IsUnicodeIdentifierPart reports whether ch may appear after the first
 * // character of an ECMAScript identifier, i.e. whether it has the Unicode
 * // ID_Continue (or Other_ID_Continue) property, which also includes ID_Start.
 * func IsUnicodeIdentifierPart(ch rune) bool {
 * 	return unicode.Is(unicodeESNextIdentifierPart, ch)
 * }
 */
export function IsUnicodeIdentifierPart(ch: GoRune): bool {
  return Is(unicodeESNextIdentifierPart, ch);
}
