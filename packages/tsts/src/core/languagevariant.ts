/**
 * Language variant — Standard or JSX.
 *
 * Port of TS-Go `internal/core/languagevariant.go` (11 LoC).
 */

export type LanguageVariant = number;
export interface LanguageVariantTable {
  readonly Standard: LanguageVariant;
  readonly JSX: LanguageVariant;
}
export const LanguageVariant: LanguageVariantTable = {
  Standard: 0,
  JSX: 1,
};

export function languageVariantToString(v: LanguageVariant): string {
  return v === LanguageVariant.JSX ? "JSX" : "Standard";
}
