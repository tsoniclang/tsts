/**
 * Diagnostic message format and lookup utilities.
 *
 * Port of TS-Go internal/diagnostics/diagnostics.go (core).
 *
 * Localization tables and the full message catalog are produced by
 * tools/generateDiagnostics.ts (forthcoming) from
 * upstream TypeScript's diagnosticMessages.json and TS-Go's
 * extraDiagnosticMessages.json. This file ports the runtime functions
 * that consume the generated catalog.
 */

import type { int } from "@tsonic/core/types.js";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { DiagnosticMessage, Key } from "./types.js";

/**
 * Returns the canonical lowercase name of a category.
 *
 * Mirrors TS-Go `func (category Category) Name() string` in
 * `internal/diagnostics/diagnostics.go`.
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
  }
  throw new Error("Unhandled diagnostic category");
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
 * This is the TSTS dependency-injection seam standing in for TS-Go's
 * module-level `localizedMessagesCache` / `getLocalizedMessages`
 * (which negotiate the locale tag against `matcher` and `localeFuncs` in
 * `loc_generated.go`). The control flow of `localize` mirrors upstream's
 * `Localize`; the resolver is threaded as a parameter rather than read from
 * package state.
 */
export type LocaleMessages = ReadonlyMap<Key, string>;
export type LocaleProvider = (loc: Locale) => LocaleMessages | undefined;

/**
 * Localizes a single message, stringifying its arguments first.
 *
 * Mirrors TS-Go `func (m *Message) Localize(locale locale.Locale, args ...any) string`.
 */
export function localizeMessage(
  message: DiagnosticMessage,
  loc: Locale,
  args: readonly unknown[],
  localeProvider: LocaleProvider,
): string {
  return localize(loc, message, "", stringifyArgs(args), keyToMessageEmpty, localeProvider);
}

// Reverse lookup is only consulted when `message` is undefined; `localizeMessage`
// always passes a concrete message, so it supplies a resolver that never matches.
function keyToMessageEmpty(_key: Key): DiagnosticMessage | undefined {
  return undefined;
}

/**
 * Returns the localized text for a message in a locale, with argument
 * placeholders filled. If `message` is `undefined`, the catalog is consulted
 * via `lookupByKey(key)`. If no localization is available, the English
 * (default) text is used.
 *
 * Mirrors TS-Go `func Localize(locale locale.Locale, message *Message, key Key, args ...string) string`.
 */
export function localize(
  loc: Locale,
  message: DiagnosticMessage | undefined,
  key: Key,
  args: readonly string[],
  lookupByKey: (key: Key) => DiagnosticMessage | undefined,
  localeProvider: LocaleProvider,
): string {
  if (message === undefined) {
    message = lookupByKey(key);
  }
  if (message === undefined) {
    throw new Error("Unknown diagnostic message: " + key);
  }

  let text = message.message;
  const localized = localeProvider(loc)?.get(message.key);
  if (localized !== undefined) {
    text = localized;
  }

  return format(text, args);
}

const placeholderRegexp = /\{(\d+)\}/g;

/**
 * Replaces `{N}` placeholders in `text` with `args[N]`. Invalid UTF-8 in
 * args is replaced with U+FFFD (matches TS-Go's `core.SameMap` over
 * `strings.ToValidUTF8`).
 *
 * Mirrors TS-Go `func Format(text string, args []string) string`.
 */
export function format(text: string, args: readonly string[]): string {
  if (args.length === 0) {
    return text;
  }

  // Replace invalid UTF-8 with Unicode replacement character.
  const sanitized = args.map(replaceInvalidUtf8);

  return text.replace(placeholderRegexp, (match: string, indexStr: string): string => {
    const index: int = Number.parseInt(indexStr, 10) | 0;
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
 * other values go through default formatting (`fmt.Sprintf("%v", arg)`,
 * whose TS counterpart is `String(arg)`).
 *
 * Mirrors TS-Go `func StringifyArgs(args []any) []string`.
 */
export function stringifyArgs(args: readonly unknown[]): readonly string[] {
  if (args.length === 0) {
    return [];
  }

  const result: string[] = args.map((arg) => {
    if (typeof arg === "string") {
      return arg;
    }
    return String(arg);
  });
  return result;
}
