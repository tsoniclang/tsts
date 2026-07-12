import type { int } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant.go::type::LanguageVariant","kind":"type","status":"implemented","sigHash":"ed0ac3c2af951c8bd909555490be1c982b05b09cf06f64c8ff0aaa661065105b"}
 *
 * Go source:
 * LanguageVariant int32
 */
export type LanguageVariant = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/languagevariant.go::constGroup::LanguageVariantStandard+LanguageVariantJSX","kind":"constGroup","status":"implemented","sigHash":"ba4c3e9216ea4121c8c0181ccbe91c706e95482f5aa7159c53619176953e8b46"}
 *
 * Go source:
 * const (
 * 	LanguageVariantStandard LanguageVariant = iota
 * 	LanguageVariantJSX
 * )
 */
export const LanguageVariantStandard: LanguageVariant = 0;
export const LanguageVariantJSX: LanguageVariant = 1;
