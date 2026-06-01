/**
 * Locale context helpers.
 *
 * Port of TS-Go `internal/locale/locale.go`. Go threads locale through
 * `context.Context`; TSTS uses an immutable context carrier with the same
 * lookup/update semantics.
 */

const localeContextKey = Symbol("locale");

export type Locale = string;

export const defaultLocale: Locale = "";

export interface LocaleContext {
  readonly values: ReadonlyMap<symbol, unknown>;
}

export function emptyLocaleContext(): LocaleContext {
  return { values: new Map() };
}

export function withLocale(context: LocaleContext, locale: Locale): LocaleContext {
  const values = new Map(context.values);
  values.set(localeContextKey, locale);
  return { values };
}

export function fromContext(context: LocaleContext): Locale {
  const value = context.values.get(localeContextKey);
  return typeof value === "string" ? value : defaultLocale;
}

export function parse(localeText: string): { readonly locale: Locale; readonly ok: boolean } {
  try {
    const canonical = Intl.getCanonicalLocales(localeText)[0];
    return canonical === undefined ? { locale: defaultLocale, ok: false } : { locale: canonical, ok: true };
  } catch {
    return { locale: localeText, ok: false };
  }
}
