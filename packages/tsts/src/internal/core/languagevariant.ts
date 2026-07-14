import type { int } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant.go::type::LanguageVariant","kind":"type","status":"implemented","sigHash":"07cf3a4062d0d59ae35779e1c52cb692592314aa8f3d1375c3c56721c781600c"}
 *
 * Go source:
 * LanguageVariant int32
 */
export type LanguageVariant = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant.go::constGroup::LanguageVariantStandard+LanguageVariantJSX","kind":"constGroup","status":"implemented","sigHash":"796fac957d82ef929283d51fbf1db74b1777f949d9742695f9ecd3fd69010ba3"}
 *
 * Go source:
 * const (
 * 	LanguageVariantStandard LanguageVariant = iota
 * 	LanguageVariantJSX
 * )
 */
export const LanguageVariantStandard: LanguageVariant = 0;
export const LanguageVariantJSX: LanguageVariant = 1;
