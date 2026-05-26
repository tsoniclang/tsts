/**
 * Diagnostic-message localization table.
 *
 * Port of TS-Go `internal/diagnostics/loc_generated.go` (~151 LoC). The
 * upstream file embeds a compressed JSON table of message translations
 * for 13 locales and provides a `matcher` for BCP-47 tag negotiation.
 *
 * TSTS keeps an in-memory table loaded lazily from external locale
 * files. The lookup surface matches Strada's: `getLocaleSpecificMessage`
 * returns the translated text or falls back to the canonical English.
 */

import type { DiagnosticMessage } from "./types.js";

// ---------------------------------------------------------------------------
// Supported locales (matches upstream)
// ---------------------------------------------------------------------------

export const SupportedLocales = [
  "en",
  "zh-CN",
  "zh-TW",
  "cs-CZ",
  "de-DE",
  "es-ES",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "pl-PL",
  "pt-BR",
  "ru-RU",
  "tr-TR",
] as const;

export type SupportedLocale = (typeof SupportedLocales)[number];

// ---------------------------------------------------------------------------
// Translation table — populated lazily by loadLocale().
// ---------------------------------------------------------------------------

const translations = new Map<SupportedLocale, Map<string, string>>();
let currentLocale: SupportedLocale = "en";

// ---------------------------------------------------------------------------
// Locale matching (RFC 4647 lookup with case-insensitive base + region)
// ---------------------------------------------------------------------------

export function matchLocale(requested: string): SupportedLocale {
  const lower = requested.toLowerCase();
  for (const loc of SupportedLocales) {
    if (loc.toLowerCase() === lower) return loc;
  }
  const base = lower.split("-")[0];
  for (const loc of SupportedLocales) {
    if (loc.toLowerCase().split("-")[0] === base) return loc;
  }
  return "en";
}

export function setLocale(locale: string): void {
  currentLocale = matchLocale(locale);
}

export function getCurrentLocale(): SupportedLocale {
  return currentLocale;
}

// ---------------------------------------------------------------------------
// Locale loader (caller-supplied for environment portability)
// ---------------------------------------------------------------------------

export type LocaleLoader = (locale: SupportedLocale) => Map<string, string> | undefined;

let loader: LocaleLoader | undefined;

export function setLocaleLoader(l: LocaleLoader): void {
  loader = l;
}

function ensureLoaded(locale: SupportedLocale): Map<string, string> | undefined {
  if (locale === "en") return undefined;
  let table = translations.get(locale);
  if (table === undefined && loader !== undefined) {
    table = loader(locale);
    if (table !== undefined) translations.set(locale, table);
  }
  return table;
}

// ---------------------------------------------------------------------------
// Message lookup
// ---------------------------------------------------------------------------

export function getLocaleSpecificMessage(message: DiagnosticMessage): string {
  const table = ensureLoaded(currentLocale);
  if (table === undefined) return (message as unknown as { message: string }).message;
  const key = (message as unknown as { key: string }).key;
  const translated = table.get(key);
  if (translated !== undefined) return translated;
  return (message as unknown as { message: string }).message;
}

export function formatMessage(text: string, args: readonly unknown[]): string {
  return text.replace(/\{(\d+)\}/g, (_, idxStr) => {
    const idx = parseInt(idxStr, 10);
    const arg = args[idx];
    return arg === undefined ? `{${idxStr}}` : String(arg);
  });
}

export function formatDiagnosticMessage(message: DiagnosticMessage, ...args: unknown[]): string {
  return formatMessage(getLocaleSpecificMessage(message), args);
}
