/**
 * Stringer helpers for LanguageVariant.
 *
 * Port of TS-Go `internal/core/languagevariant_stringer_generated.go`.
 */

import { LanguageVariant, type LanguageVariant as LanguageVariantValue, languageVariantToString } from "./languageVariant.js";

export function languageVariantString(variant: LanguageVariantValue): string {
  return languageVariantToString(variant);
}

export function isKnownLanguageVariant(variant: LanguageVariantValue): boolean {
  return variant === LanguageVariant.Standard || variant === LanguageVariant.JSX;
}
