/**
 * Regular-expression literal scanner.
 *
 * Port skeleton of TS-Go `internal/scanner/regexp.go` (1071 LoC).
 * The Strada regex parser walks a `/.../flags` literal validating
 * syntax, Unicode/UnicodeSets modes, class-set expressions, group
 * names, decimal-escape backreferences, Annex B compatibility, etc.
 *
 * The skeleton below provides:
 * - `RegularExpressionFlags` constant-union (bit flags)
 * - flag-character lookup table
 * - flag → first-available-script-target map
 * - public `scanRegularExpressionBody` entry point
 * - private RegExpParser class structure with the API surface
 *
 * The deep grammar walker (~30 nested parseXxx methods) is deferred —
 * tests will surface gaps as the scanner integrates. Until then,
 * scanRegularExpressionBody accepts any /.../ shape as long as the
 * leading slash, body, trailing slash, and flag characters are valid.
 *
 * Cross-module deps (scanner state, diagnostics, ScriptTarget)
 * forward-declared at file end.
 */

export type RegularExpressionFlags = number;
export const RegularExpressionFlags = {
  None: 0,
  HasIndices: 1 << 0,    // d
  Global: 1 << 1,        // g
  IgnoreCase: 1 << 2,    // i
  Multiline: 1 << 3,     // m
  DotAll: 1 << 4,        // s
  Unicode: 1 << 5,       // u
  UnicodeSets: 1 << 6,   // v
  Sticky: 1 << 7,        // y
  AnyUnicodeMode: (1 << 5) | (1 << 6),
  Modifiers: (1 << 2) | (1 << 3) | (1 << 4),
} as const;

/** Char → flag bit. */
export const charCodeToRegExpFlag: ReadonlyMap<string, RegularExpressionFlags> = new Map([
  ["d", RegularExpressionFlags.HasIndices],
  ["g", RegularExpressionFlags.Global],
  ["i", RegularExpressionFlags.IgnoreCase],
  ["m", RegularExpressionFlags.Multiline],
  ["s", RegularExpressionFlags.DotAll],
  ["u", RegularExpressionFlags.Unicode],
  ["v", RegularExpressionFlags.UnicodeSets],
  ["y", RegularExpressionFlags.Sticky],
]);

/** Each flag's first-available ScriptTarget for diagnostic gating. */
export const regExpFlagToFirstAvailableLanguageVersion: ReadonlyMap<RegularExpressionFlags, number> = new Map([
  [RegularExpressionFlags.HasIndices, ScriptTarget_ES2022],
  [RegularExpressionFlags.DotAll, ScriptTarget_ES2018],
  [RegularExpressionFlags.UnicodeSets, ScriptTarget_ES2024],
]);

export type ClassSetExpressionType = number;
export const ClassSetExpressionType = {
  Unknown: 0,
  ClassUnion: 1,
  ClassIntersection: 2,
  ClassSubtraction: 3,
} as const;

export interface GroupNameReference {
  pos: number;
  end: number;
  name: string;
}

export interface DecimalEscapeValue {
  pos: number;
  end: number;
  value: number;
}

// ---------------------------------------------------------------------------
// RegExpParser — public structure; deep methods stub until tests demand them
// ---------------------------------------------------------------------------

export interface RegExpParserState {
  regExpFlags: RegularExpressionFlags;
  anyUnicodeMode: boolean;
  unicodeSetsMode: boolean;
  annexB: boolean;
  anyUnicodeModeOrNonAnnexB: boolean;
  namedCaptureGroups: boolean;
  mayContainStrings: boolean;
  numberOfCapturingGroups: number;
  groupSpecifiers: ReadonlySet<string>;
  groupNameReferences: readonly GroupNameReference[];
  decimalEscapes: readonly DecimalEscapeValue[];
}

export interface RegExpParser {
  state: RegExpParserState;
  scan(): void;
  scanRegExpFlags(start: number): { flags: RegularExpressionFlags; end: number };
}

/**
 * Walks the body of a regex literal until the closing `/`, then
 * returns the body start/end positions and the parsed flags.
 *
 * Stub: the full Strada parser validates each character against the
 * UnicodeMode / UnicodeSetsMode / AnnexB grammar trees. Until that
 * full grammar is ported, this fast-path scans for the closing `/`
 * respecting character classes and escape sequences.
 *
 * Returns the literal's end position (after the trailing flags) and
 * the flag bitmask.
 */
export function scanRegularExpressionBody(
  text: string,
  start: number,
): { bodyEnd: number; flagsEnd: number; flags: RegularExpressionFlags } {
  let pos = start;
  const len = text.length;
  let inCharClass = false;

  while (pos < len) {
    const ch = text.charCodeAt(pos);
    if (ch === 0x5C /* \ */) {
      pos += 2;
      continue;
    }
    if (ch === 0x5B /* [ */) {
      inCharClass = true;
    } else if (ch === 0x5D /* ] */) {
      inCharClass = false;
    } else if (ch === 0x2F /* / */ && !inCharClass) {
      const bodyEnd = pos;
      pos += 1;
      let flags = RegularExpressionFlags.None;
      while (pos < len) {
        const fc = text[pos]!;
        const flag = charCodeToRegExpFlag.get(fc);
        if (flag === undefined) break;
        flags |= flag;
        pos += 1;
      }
      return { bodyEnd, flagsEnd: pos, flags };
    } else if (ch === 0x0A || ch === 0x0D) {
      break; // unterminated literal
    }
    pos += 1;
  }
  return { bodyEnd: pos, flagsEnd: pos, flags: RegularExpressionFlags.None };
}

/** Returns true if `flag` is supported at `target` or later. */
export function isRegExpFlagAvailable(flag: RegularExpressionFlags, target: number): boolean {
  const from = regExpFlagToFirstAvailableLanguageVersion.get(flag);
  if (from === undefined) return true;
  return target >= from;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare const ScriptTarget_ES2018: number;
declare const ScriptTarget_ES2022: number;
declare const ScriptTarget_ES2024: number;
