import type { byte, int, long } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import { FormatInt } from "../../go/strconv.js";
import { LanguageVariantJSX, LanguageVariantStandard } from "./languagevariant.js";
import type { LanguageVariant } from "./languagevariant.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant_stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6"}
 *
 * Go source:
 * func _() {
 * 	// An "invalid array index" compiler error signifies that the constant values have changed.
 * 	// Re-run the stringer command to generate them again.
 * 	var x [1]struct{}
 * 	_ = x[LanguageVariantStandard-0]
 * 	_ = x[LanguageVariantJSX-1]
 * }
 */
export function _(): void {
  // An "invalid array index" compiler error signifies that the constant values have changed.
  // Re-run the stringer command to generate them again.
  const x: GoArray<Record<string, never>, "1"> = [{}];
  void x[LanguageVariantStandard - 0];
  void x[LanguageVariantJSX - 1];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant_stringer_generated.go::constGroup::_LanguageVariant_name","kind":"constGroup","status":"implemented","sigHash":"f62ffd8c67372076e820b948ec56383391876894b9bb61930d8123edd118ebfe"}
 *
 * Go source:
 * const _LanguageVariant_name = "LanguageVariantStandardLanguageVariantJSX"
 */
export const _LanguageVariant_name: string = "LanguageVariantStandardLanguageVariantJSX";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant_stringer_generated.go::varGroup::_LanguageVariant_index","kind":"varGroup","status":"implemented","sigHash":"0945bb23c8993daea2e70385b791c040fa66ffdf021af5588889844516a48c92"}
 *
 * Go source:
 * var _LanguageVariant_index = [...]uint8{0, 23, 41}
 */
export let _LanguageVariant_index: GoArray<byte, "3"> = [0, 23, 41];

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant_stringer_generated.go::method::LanguageVariant.String","kind":"method","status":"implemented","sigHash":"4ce505d9da83893055f9726103d7dbce9384e90de63121b28291e5e0cdc306ce"}
 *
 * Go source:
 * func (i LanguageVariant) String() string {
 * 	idx := int(i) - 0
 * 	if i < 0 || idx >= len(_LanguageVariant_index)-1 {
 * 		return "LanguageVariant(" + strconv.FormatInt(int64(i), 10) + ")"
 * 	}
 * 	return _LanguageVariant_name[_LanguageVariant_index[idx]:_LanguageVariant_index[idx+1]]
 * }
 */
export function LanguageVariant_String(receiver: LanguageVariant): string {
  const i: LanguageVariant = receiver;
  const idx: int = (i as int) - 0;
  if (i < 0 || idx >= _LanguageVariant_index.length - 1) {
    return "LanguageVariant(" + FormatInt(i as long, 10) + ")";
  }
  return _LanguageVariant_name.slice(_LanguageVariant_index[idx]!, _LanguageVariant_index[idx + 1]!);
}
