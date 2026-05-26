/**
 * Diagnostic message format and lookup utilities.
 *
 * Port of TS-Go internal/diagnostics/diagnostics.go (core).
 *
 * Localization tables and the full message catalog are produced by
 * tools/generate-diagnostics.ts (forthcoming) from
 * upstream TypeScript's diagnosticMessages.json and TS-Go's
 * extraDiagnosticMessages.json. This file ports the runtime functions
 * that consume the generated catalog.
 */

import type { JsValue } from "@tsonic/core/types.js";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { DiagnosticMessage } from "./types.js";

/**
 * Returns the canonical lowercase name of a category. Mirrors the
 * stringer-generated `Category.String()` / `Category.Name()` in TS-Go.
 */
export function categoryName(category: DiagnosticCategory): string {
  switch (category) {
    case DiagnosticCategory.Warning:
      return "warning";
    case DiagnosticCategory.Error:
      return "error";
    case DiagnosticCategory.Suggestion:
      return "suggestion";
    case DiagnosticCategory.Message:
      return "message";
    default:
      throw new Error("Unhandled diagnostic category");
  }
}

/**
 * Locale tag — an IETF BCP 47 language tag (e.g. "en", "de-DE", "zh-CN").
 * The empty string represents the "undetermined" locale (TS-Go's `language.Und`).
 */
export type Locale = string;

/**
 * Provider of localized messages for a locale. Returns a `Map<Key, string>`
 * (keyed by `DiagnosticMessage.key`) for the matched locale, or `undefined`
 * if no localization is available.
 *
 * Mirrors TS-Go's `localeFuncs` table — the generator emits one entry per
 * supported locale; runtime matches the requested locale tag against the
 * table.
 */
export type LocaleMessages = ReadonlyMap<string, string>;
export type LocaleProvider = (loc: Locale) => LocaleMessages | undefined;

/**
 * Returns the localized text for a message in a locale, with argument
 * placeholders filled. If `message` is `null`/`undefined`, the catalog
 * is consulted via `lookupByKey(key)`. If no localization is available,
 * the English (default) text is used.
 *
 * Mirrors TS-Go `Localize`.
 */
export function localize(
  loc: Locale,
  message: DiagnosticMessage | undefined,
  key: string,
  args: readonly string[],
  lookupByKey: (key: string) => DiagnosticMessage | undefined,
  localeProvider: LocaleProvider,
): string {
  const resolved = message ?? lookupByKey(key);
  if (resolved === undefined) {
    throw new Error("Unknown diagnostic message: " + key);
  }

  const localized = localeProvider(loc);
  const text = localized?.get(resolved.key) ?? resolved.message;

  return format(text, args);
}

const placeholderPattern = /\{(\d+)\}/g;

/**
 * Replaces `{N}` placeholders in `text` with `args[N]`. Invalid UTF-8 in
 * args is replaced with U+FFFD (matches TS-Go's `core.SameMap` over
 * `strings.ToValidUTF8`).
 *
 * Mirrors TS-Go `Format`.
 */
export function format(text: string, args: readonly string[]): string {
  if (args.length === 0) return text;
  const sanitized = args.map(replaceInvalidUtf8);
  return text.replace(placeholderPattern, (match: string, indexStr: string): string => {
    const index = Number.parseInt(indexStr, 10);
    if (!Number.isFinite(index) || index >= sanitized.length) {
      throw new Error("Invalid formatting placeholder");
    }
    return sanitized[index]!;
  });
}

/**
 * Replaces lone surrogates and other malformed UTF-16 with U+FFFD.
 * JavaScript strings can contain unpaired surrogates; this normalizes
 * them the same way Go's `strings.ToValidUTF8(s, "�")` does.
 */
function replaceInvalidUtf8(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i += 1) {
    const code = s.charCodeAt(i);
    if (code >= 0xD800 && code <= 0xDBFF) {
      // High surrogate; check for matching low surrogate
      if (i + 1 < s.length) {
        const next = s.charCodeAt(i + 1);
        if (next >= 0xDC00 && next <= 0xDFFF) {
          out += s[i] + s[i + 1]!;
          i += 1;
          continue;
        }
      }
      out += "�";
    } else if (code >= 0xDC00 && code <= 0xDFFF) {
      // Lone low surrogate
      out += "�";
    } else {
      out += s[i];
    }
  }
  return out;
}

/**
 * Converts an arbitrary argument list to strings: strings pass through,
 * other values go through default formatting (`String(arg)`).
 *
 * Mirrors TS-Go `StringifyArgs`.
 */
export function stringifyArgs(args: readonly JsValue[]): readonly string[] {
  if (args.length === 0) return [];
  return args.map((arg) => (typeof arg === "string" ? arg : String(arg)));
}
