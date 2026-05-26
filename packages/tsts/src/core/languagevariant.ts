/**
 * Language variant — Standard or JSX.
 *
 * Port of TS-Go `internal/core/languagevariant.go` (11 LoC).
 */

export type LanguageVariant = number;
export const LanguageVariant = {
  Standard: 0,
  JSX: 1,
} as const;

export function languageVariantToString(v: LanguageVariant): string {
  return v === LanguageVariant.JSX ? "JSX" : "Standard";
}
