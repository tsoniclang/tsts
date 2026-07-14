import type { bool } from "../../go/scalars.js";
import type { GoRune } from "../../go/compat.js";
import { Is } from "../../go/unicode.js";
import { unicodeESNextIdentifierPart, unicodeESNextIdentifierStart } from "./generated/identifier_parts_generated.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/identifier.go::func::IsUnicodeIdentifierStart","kind":"func","status":"implemented","sigHash":"7c0efd6d11ff15832e4b4bf8c412e9aa597f8a9c9a30f90be2f4a8a06abf980a"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/identifier.go::func::IsUnicodeIdentifierPart","kind":"func","status":"implemented","sigHash":"8dda05c1c34d3ddc4f7c5b7adc1a38ddc09b65ec901ee7d362408da1a9c42825"}
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
