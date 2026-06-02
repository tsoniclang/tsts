import { getSpellingSuggestionForStrings } from "../core/core.js";
import { ScriptTarget, scriptTargetToString } from "../core/compilerOptions.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";
import { isASCIILetter, isDigit, isHexDigit, isOctalDigit } from "../stringutil/util.js";
import { LanguageVariant } from "../core/languageVariant.js";
import {
  isIdentifierPartCodePoint,
  isIdentifierStartCodePoint,
} from "./scanner.js";
import {
  binaryUnicodeProperties,
  binaryUnicodePropertiesOfStrings,
  nonBinaryUnicodeProperties,
  valuesOfNonBinaryUnicodeProperties,
} from "./unicodeProperties.js";
import { decodeClassAtomRune, encodeSurrogate } from "./utilities.js";

export type RegularExpressionFlags = number;
export const RegularExpressionFlags = {
  None: 0,
  HasIndices: 1 << 0,
  Global: 1 << 1,
  IgnoreCase: 1 << 2,
  Multiline: 1 << 3,
  DotAll: 1 << 4,
  Unicode: 1 << 5,
  UnicodeSets: 1 << 6,
  Sticky: 1 << 7,
  AnyUnicodeMode: (1 << 5) | (1 << 6),
  Modifiers: (1 << 2) | (1 << 3) | (1 << 4),
} as const;

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

export const regExpFlagToFirstAvailableLanguageVersion: ReadonlyMap<RegularExpressionFlags, number> = new Map([
  [RegularExpressionFlags.HasIndices, ScriptTarget.ES2022],
  [RegularExpressionFlags.DotAll, ScriptTarget.ES2018],
  [RegularExpressionFlags.UnicodeSets, ScriptTarget.ES2024],
]);

export type ClassSetExpressionType = number;
export const ClassSetExpressionType = {
  Unknown: 0,
  ClassUnion: 1,
  ClassIntersection: 2,
  ClassSubtraction: 3,
} as const;

export interface GroupNameReference {
  readonly pos: number;
  readonly end: number;
  readonly name: string;
}

export interface DecimalEscapeValue {
  readonly pos: number;
  readonly end: number;
  readonly value: number;
}

export interface RegularExpressionDiagnostic {
  readonly message: DiagnosticMessage;
  readonly pos: number;
  readonly length: number;
  readonly args: readonly unknown[];
}

export interface RegularExpressionScanOptions {
  languageVersion?: number;
  annexB?: boolean;
  reportDiagnostic?: (diagnostic: RegularExpressionDiagnostic) => void;
}

export interface RegularExpressionScanResult {
  readonly bodyEnd: number;
  readonly flagsEnd: number;
  readonly flags: RegularExpressionFlags;
  readonly diagnostics: readonly RegularExpressionDiagnostic[];
}

interface ParserState {
  pos: number;
  tokenValue: string;
  tokenStart: number;
  tokenFlags: number;
}

const EscapeSequenceScanningFlags = {
  String: 1 << 0,
  ReportErrors: 1 << 1,
  RegularExpression: 1 << 2,
  AnnexB: 1 << 3,
  AnyUnicodeMode: 1 << 4,
  AtomEscape: 1 << 5,
  ReportInvalidEscapeErrors: (1 << 2) | (1 << 1),
  AllowExtendedUnicodeEscape: (1 << 0) | (1 << 4),
} as const;

const TokenFlags = {
  ContainsInvalidEscape: 1 << 8,
  UnicodeEscape: 1 << 9,
  HexEscape: 1 << 10,
} as const;

const MAX_SAFE_INTEGER = 0x1f_ffff_ffff_ffff;
const SURR1 = 0xd800;
const SURR2 = 0xdc00;
const SURR_SELF = 0x10000;

function charSize(codePoint: number): number {
  return codePoint > 0xffff ? 2 : 1;
}

function charToString(codePoint: number): string {
  return codePoint < 0 ? "" : String.fromCodePoint(codePoint);
}

function compareDecimalStrings(left: string, right: string): number {
  let a = left.replace(/^0+/, "");
  let b = right.replace(/^0+/, "");
  if (a === "") a = "0";
  if (b === "") b = "0";
  if (a.length !== b.length) return a.length < b.length ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
}

function isWordCharacter(ch: number): boolean {
  return isASCIILetter(ch) || isDigit(ch) || ch === 0x5f;
}

export function isRegExpFlagAvailable(flag: RegularExpressionFlags, target: number): boolean {
  const from = regExpFlagToFirstAvailableLanguageVersion.get(flag);
  return from === undefined || target >= from;
}

export function scanRegularExpressionBody(
  text: string,
  start: number,
  options: RegularExpressionScanOptions = {},
): RegularExpressionScanResult {
  let pos = start;
  let inCharClass = false;
  let unterminated = false;
  while (pos < text.length) {
    const ch = text.charCodeAt(pos);
    if (ch === 0x5c) {
      pos += 2;
      continue;
    }
    if (ch === 0x5b) {
      inCharClass = true;
    } else if (ch === 0x5d) {
      inCharClass = false;
    } else if (ch === 0x2f && !inCharClass) {
      break;
    } else if (ch === 0x0a || ch === 0x0d || ch === 0x2028 || ch === 0x2029) {
      unterminated = true;
      break;
    }
    pos += charSize(text.codePointAt(pos) ?? ch);
  }

  const diagnostics: RegularExpressionDiagnostic[] = [];
  const reportDiagnostic = (diagnostic: RegularExpressionDiagnostic): void => {
    diagnostics.push(diagnostic);
    options.reportDiagnostic?.(diagnostic);
  };

  if (unterminated || pos >= text.length || text.charCodeAt(pos) !== 0x2f) {
    reportDiagnostic({
      message: Diagnostics.Unterminated_regular_expression_literal,
      pos: start - 1 >= 0 ? start - 1 : start,
      length: Math.max(1, pos - start + 1),
      args: [],
    });
    return { bodyEnd: pos, flagsEnd: pos, flags: RegularExpressionFlags.None, diagnostics };
  }

  const bodyEnd = pos;
  pos += 1;
  const flagOptions: RegularExpressionScanOptions = options.languageVersion === undefined
    ? { reportDiagnostic }
    : { languageVersion: options.languageVersion, reportDiagnostic };
  const { flags, end } = scanRegExpFlags(text, pos, flagOptions);

  validateRegularExpressionBody(text, start, bodyEnd, flags, {
    ...options,
    reportDiagnostic,
  });

  return { bodyEnd, flagsEnd: end, flags, diagnostics };
}

export function scanRegExpFlags(
  text: string,
  start: number,
  options: RegularExpressionScanOptions = {},
): { readonly flags: RegularExpressionFlags; readonly end: number } {
  let pos = start;
  let flags = RegularExpressionFlags.None;
  while (pos < text.length) {
    const cp = text.codePointAt(pos);
    if (cp === undefined || !isIdentifierPartCodePoint(cp, LanguageVariant.Standard)) break;
    const size = charSize(cp);
    const flag = charCodeToRegExpFlag.get(charToString(cp));
    if (flag === undefined) {
      options.reportDiagnostic?.({ message: Diagnostics.Unknown_regular_expression_flag, pos, length: size, args: [] });
    } else if ((flags & flag) !== 0) {
      options.reportDiagnostic?.({ message: Diagnostics.Duplicate_regular_expression_flag, pos, length: size, args: [] });
    } else if (((flags | flag) & RegularExpressionFlags.AnyUnicodeMode) === RegularExpressionFlags.AnyUnicodeMode) {
      options.reportDiagnostic?.({
        message: Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously,
        pos,
        length: size,
        args: [],
      });
    } else {
      flags |= flag;
      if (options.languageVersion !== undefined) {
        checkRegularExpressionFlagAvailability(flag, pos, size, options);
      }
    }
    pos += size;
  }
  return { flags, end: pos };
}

export function validateRegularExpressionBody(
  text: string,
  start: number,
  end: number,
  flags: RegularExpressionFlags,
  options: RegularExpressionScanOptions = {},
): readonly RegularExpressionDiagnostic[] {
  const diagnostics: RegularExpressionDiagnostic[] = [];
  const reportDiagnostic = (diagnostic: RegularExpressionDiagnostic): void => {
    diagnostics.push(diagnostic);
    options.reportDiagnostic?.(diagnostic);
  };
  const parser = new RegExpParser(text, start, end, flags, {
    ...options,
    reportDiagnostic,
  });
  parser.run();
  return diagnostics;
}

function checkRegularExpressionFlagAvailability(
  flag: RegularExpressionFlags,
  pos: number,
  size: number,
  options: RegularExpressionScanOptions,
): void {
  const target = options.languageVersion;
  const availableFrom = regExpFlagToFirstAvailableLanguageVersion.get(flag);
  if (target !== undefined && availableFrom !== undefined && target < availableFrom) {
    options.reportDiagnostic?.({
      message: Diagnostics.This_regular_expression_flag_is_only_available_when_targeting_0_or_later,
      pos,
      length: size,
      args: [scriptTargetToString(availableFrom).toLowerCase()],
    });
  }
}

class RegExpParser {
  private readonly text: string;
  private readonly state: ParserState;
  private readonly end: number;
  private readonly regExpFlags: RegularExpressionFlags;
  private readonly options: RegularExpressionScanOptions;
  private readonly anyUnicodeMode: boolean;
  private readonly unicodeSetsMode: boolean;
  private readonly annexB: boolean;
  private anyUnicodeModeOrNonAnnexB = false;
  private namedCaptureGroups = false;
  private mayContainStrings = false;
  private numberOfCapturingGroups = 0;
  private readonly groupSpecifiers = new Map<string, true>();
  private readonly groupNameReferences: GroupNameReference[] = [];
  private readonly decimalEscapes: DecimalEscapeValue[] = [];
  private readonly namedCapturingGroups: Map<string, true>[] = [];
  private pendingLowSurrogate = 0;

  constructor(
    text: string,
    start: number,
    end: number,
    regExpFlags: RegularExpressionFlags,
    options: RegularExpressionScanOptions,
  ) {
    this.text = text;
    this.end = end;
    this.regExpFlags = regExpFlags;
    this.options = options;
    this.state = { pos: start, tokenValue: "", tokenStart: start, tokenFlags: 0 };
    this.anyUnicodeMode = (regExpFlags & RegularExpressionFlags.AnyUnicodeMode) !== 0;
    this.unicodeSetsMode = (regExpFlags & RegularExpressionFlags.UnicodeSets) !== 0;
    this.annexB = options.annexB ?? true;
  }

  run(): void {
    this.anyUnicodeModeOrNonAnnexB = this.anyUnicodeMode || !this.annexB;
    this.scanDisjunction(false);
    for (const reference of this.groupNameReferences) {
      if (!this.groupSpecifiers.has(reference.name)) {
        this.error(
          Diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression,
          reference.pos,
          reference.end - reference.pos,
          reference.name,
        );
        if (this.groupSpecifiers.size > 0) {
          const suggestion = getSpellingSuggestionForStrings(reference.name, this.groupSpecifiers.keys());
          if (suggestion !== undefined) {
            this.error(Diagnostics.Did_you_mean_0, reference.pos, reference.end - reference.pos, suggestion);
          }
        }
      }
    }
    for (const escape of this.decimalEscapes) {
      if (escape.value > this.numberOfCapturingGroups) {
        if (this.numberOfCapturingGroups > 0) {
          this.error(
            Diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_regular_expression,
            escape.pos,
            escape.end - escape.pos,
            this.numberOfCapturingGroups,
          );
        } else {
          this.error(
            Diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regular_expression,
            escape.pos,
            escape.end - escape.pos,
          );
        }
      }
    }
  }

  private pos(): number {
    return this.state.pos;
  }

  private incPos(count: number): void {
    this.state.pos += count;
  }

  private char(): number {
    return this.state.pos >= this.end ? -1 : this.text.codePointAt(this.state.pos) ?? -1;
  }

  private charAt(pos: number): number {
    return pos >= this.end ? -1 : this.text.codePointAt(pos) ?? -1;
  }

  private error(message: DiagnosticMessage, pos: number, length: number, ...args: readonly unknown[]): void {
    this.options.reportDiagnostic?.({ message, pos, length, args });
  }

  private scanDisjunction(isInGroup: boolean): void {
    for (;;) {
      this.namedCapturingGroups.push(new Map());
      this.scanAlternative(isInGroup);
      this.namedCapturingGroups.pop();
      if (this.char() !== 0x7c) return;
      this.incPos(1);
    }
  }

  private scanAlternative(isInGroup: boolean): void {
    let isPreviousTermQuantifiable = false;
    while (this.pos() < this.end) {
      const start = this.pos();
      const ch = this.char();
      switch (ch) {
        case 0x5e:
        case 0x24:
          this.incPos(1);
          isPreviousTermQuantifiable = false;
          break;
        case 0x5c:
          this.incPos(1);
          switch (this.char()) {
            case 0x62:
            case 0x42:
              this.incPos(1);
              isPreviousTermQuantifiable = false;
              break;
            default:
              this.scanAtomEscape();
              isPreviousTermQuantifiable = true;
              break;
          }
          break;
        case 0x28:
          this.incPos(1);
          if (this.char() === 0x3f) {
            this.incPos(1);
            switch (this.char()) {
              case 0x3d:
              case 0x21:
                this.incPos(1);
                isPreviousTermQuantifiable = !this.anyUnicodeModeOrNonAnnexB;
                break;
              case 0x3c: {
                const groupNameStart = this.pos();
                this.incPos(1);
                switch (this.char()) {
                  case 0x3d:
                  case 0x21:
                    this.incPos(1);
                    isPreviousTermQuantifiable = false;
                    break;
                  default:
                    this.scanGroupName(false);
                    this.scanExpectedChar(0x3e);
                    if ((this.options.languageVersion ?? ScriptTarget.ESNext) < ScriptTarget.ES2018) {
                      this.error(
                        Diagnostics.Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later,
                        groupNameStart,
                        this.pos() - groupNameStart,
                      );
                    }
                    this.numberOfCapturingGroups++;
                    isPreviousTermQuantifiable = true;
                    break;
                }
                break;
              }
              default: {
                const flagsStart = this.pos();
                const setFlags = this.scanPatternModifiers(RegularExpressionFlags.None);
                if (this.char() === 0x2d) {
                  this.incPos(1);
                  this.scanPatternModifiers(setFlags);
                  if (this.pos() === flagsStart + 1) {
                    this.error(
                      Diagnostics.Subpattern_flags_must_be_present_when_there_is_a_minus_sign,
                      flagsStart,
                      this.pos() - flagsStart,
                    );
                  }
                }
                this.scanExpectedChar(0x3a);
                isPreviousTermQuantifiable = true;
                break;
              }
            }
          } else {
            this.numberOfCapturingGroups++;
            isPreviousTermQuantifiable = true;
          }
          this.scanDisjunction(true);
          this.scanExpectedChar(0x29);
          break;
        case 0x7b:
          this.incPos(1);
          this.scanQuantifierBody(start, ch);
          if (this.char() === 0x7d) {
            this.incPos(1);
            if (this.char() === 0x3f) this.incPos(1);
            if (!isPreviousTermQuantifiable) {
              this.error(Diagnostics.There_is_nothing_available_for_repetition, start, this.pos() - start);
            }
            isPreviousTermQuantifiable = false;
          } else {
            isPreviousTermQuantifiable = true;
          }
          break;
        case 0x2a:
        case 0x2b:
        case 0x3f:
          this.incPos(1);
          if (this.char() === 0x3f) this.incPos(1);
          if (!isPreviousTermQuantifiable) {
            this.error(Diagnostics.There_is_nothing_available_for_repetition, start, this.pos() - start);
          }
          isPreviousTermQuantifiable = false;
          break;
        case 0x2e:
          this.incPos(1);
          isPreviousTermQuantifiable = true;
          break;
        case 0x5b:
          this.incPos(1);
          if (this.unicodeSetsMode) {
            this.scanClassSetExpression();
          } else {
            this.scanClassRanges();
            this.pendingLowSurrogate = 0;
          }
          this.scanExpectedChar(0x5d);
          isPreviousTermQuantifiable = true;
          break;
        case 0x29:
          if (isInGroup) return;
          if (this.anyUnicodeModeOrNonAnnexB) {
            this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, charToString(ch));
          }
          this.incPos(1);
          isPreviousTermQuantifiable = true;
          break;
        case 0x5d:
        case 0x7d:
          if (this.anyUnicodeModeOrNonAnnexB) {
            this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, charToString(ch));
          }
          this.incPos(1);
          isPreviousTermQuantifiable = true;
          break;
        case 0x2f:
        case 0x7c:
          return;
        default:
          this.scanSourceCharacter();
          isPreviousTermQuantifiable = true;
          break;
      }
    }
  }

  private scanQuantifierBody(start: number, opening: number): void {
    const digitsStart = this.pos();
    this.scanDigits();
    const minStr = this.state.tokenValue;
    if (!this.anyUnicodeModeOrNonAnnexB && minStr === "") return;
    if (this.char() === 0x2c) {
      this.incPos(1);
      this.scanDigits();
      const maxStr = this.state.tokenValue;
      if (minStr === "") {
        if (maxStr !== "" || this.char() === 0x7d) {
          this.error(Diagnostics.Incomplete_quantifier_Digit_expected, digitsStart, 0);
        } else {
          this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, charToString(opening));
        }
      } else if (maxStr !== "" && compareDecimalStrings(minStr, maxStr) > 0 && (this.anyUnicodeModeOrNonAnnexB || this.char() === 0x7d)) {
        this.error(Diagnostics.Numbers_out_of_order_in_quantifier, digitsStart, this.pos() - digitsStart);
      }
    } else if (minStr === "") {
      if (this.anyUnicodeModeOrNonAnnexB) {
        this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, charToString(opening));
      }
      return;
    }
    if (this.char() !== 0x7d && this.anyUnicodeModeOrNonAnnexB) {
      this.error(Diagnostics.X_0_expected, this.pos(), 0, "}");
      this.incPos(-1);
    }
  }

  private scanPatternModifiers(currFlags: RegularExpressionFlags): RegularExpressionFlags {
    let flags = currFlags;
    while (this.pos() < this.end) {
      const ch = this.char();
      if (ch < 0 || !isIdentifierPartCodePoint(ch, LanguageVariant.Standard)) break;
      const size = charSize(ch);
      const flag = charCodeToRegExpFlag.get(charToString(ch));
      if (flag === undefined) {
        this.error(Diagnostics.Unknown_regular_expression_flag, this.pos(), size);
      } else if ((flags & flag) !== 0) {
        this.error(Diagnostics.Duplicate_regular_expression_flag, this.pos(), size);
      } else if ((flag & RegularExpressionFlags.Modifiers) === 0) {
        this.error(Diagnostics.This_regular_expression_flag_cannot_be_toggled_within_a_subpattern, this.pos(), size);
      } else {
        flags |= flag;
        checkRegularExpressionFlagAvailability(flag, this.pos(), size, this.options);
      }
      this.incPos(size);
    }
    return flags;
  }

  private scanAtomEscape(): void {
    switch (this.char()) {
      case 0x6b:
        this.incPos(1);
        if (this.char() === 0x3c) {
          this.incPos(1);
          this.scanGroupName(true);
          this.scanExpectedChar(0x3e);
        } else if (this.anyUnicodeModeOrNonAnnexB || this.namedCaptureGroups) {
          this.error(Diagnostics.X_k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets, this.pos() - 2, 2);
        }
        break;
      case 0x71:
        if (this.unicodeSetsMode) {
          this.incPos(1);
          this.error(Diagnostics.X_q_is_only_available_inside_character_class, this.pos() - 2, 2);
          return;
        }
        if (!this.scanCharacterClassEscape() && !this.scanDecimalEscape()) this.scanCharacterEscape(true);
        break;
      default:
        if (!this.scanCharacterClassEscape() && !this.scanDecimalEscape()) this.scanCharacterEscape(true);
        break;
    }
  }

  private scanDecimalEscape(): boolean {
    const ch = this.char();
    if (ch >= 0x31 && ch <= 0x39) {
      const start = this.pos();
      this.scanDigits();
      const value = Number.parseInt(this.state.tokenValue, 10);
      this.decimalEscapes.push({ pos: start, end: this.pos(), value: Number.isFinite(value) ? value : MAX_SAFE_INTEGER });
      return true;
    }
    return false;
  }

  private scanCharacterEscape(atomEscape: boolean): string {
    const ch = this.char();
    switch (ch) {
      case -1:
        this.error(Diagnostics.Undetermined_character_escape, this.pos() - 1, 1);
        return "\\";
      case 0x63:
        this.incPos(1);
        if (isASCIILetter(this.char())) {
          const control = this.char() & 0x1f;
          this.incPos(1);
          return String.fromCharCode(control);
        }
        if (this.anyUnicodeModeOrNonAnnexB) {
          this.error(Diagnostics.X_c_must_be_followed_by_an_ASCII_letter, this.pos() - 2, 2);
        } else if (atomEscape) {
          this.incPos(-1);
          return "\\";
        }
        return charToString(this.char());
      case 0x5e:
      case 0x24:
      case 0x2f:
      case 0x5c:
      case 0x2e:
      case 0x2a:
      case 0x2b:
      case 0x3f:
      case 0x28:
      case 0x29:
      case 0x5b:
      case 0x5d:
      case 0x7b:
      case 0x7d:
      case 0x7c:
        this.incPos(1);
        return charToString(ch);
      default: {
        this.incPos(-1);
        let flags = EscapeSequenceScanningFlags.RegularExpression;
        if (this.annexB) flags |= EscapeSequenceScanningFlags.AnnexB;
        if (this.anyUnicodeMode) flags |= EscapeSequenceScanningFlags.AnyUnicodeMode;
        if (atomEscape) flags |= EscapeSequenceScanningFlags.AtomEscape;
        return this.scanEscapeSequence(flags);
      }
    }
  }

  private scanGroupName(isReference: boolean): void {
    this.state.tokenStart = this.pos();
    this.scanIdentifier();
    if (this.pos() === this.state.tokenStart) {
      this.error(Diagnostics.Expected_a_capturing_group_name, this.pos(), 0);
    } else if (isReference) {
      this.groupNameReferences.push({ pos: this.state.tokenStart, end: this.pos(), name: this.state.tokenValue });
      this.namedCaptureGroups = true;
    } else if (this.namedCapturingGroupsContains(this.state.tokenValue)) {
      this.error(
        Diagnostics.Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other,
        this.state.tokenStart,
        this.pos() - this.state.tokenStart,
      );
    } else {
      if (this.namedCapturingGroups.length > 0) {
        this.namedCapturingGroups[this.namedCapturingGroups.length - 1]!.set(this.state.tokenValue, true);
      }
      this.groupSpecifiers.set(this.state.tokenValue, true);
      this.namedCaptureGroups = true;
    }
  }

  private namedCapturingGroupsContains(name: string): boolean {
    for (const group of this.namedCapturingGroups) if (group.has(name)) return true;
    return false;
  }

  private isClassContentExit(ch: number): boolean {
    return ch === 0x5d || this.pos() >= this.end;
  }

  private scanClassRanges(): void {
    this.pendingLowSurrogate = 0;
    if (this.char() === 0x5e) this.incPos(1);
    while (this.pos() < this.end) {
      let ch = this.char();
      if (this.isClassContentExit(ch)) return;
      const minStart = this.pos();
      const minCharacter = this.scanClassAtom();
      if (this.char() === 0x2d) {
        this.incPos(1);
        ch = this.char();
        if (this.isClassContentExit(ch)) return;
        if (minCharacter === "" && this.anyUnicodeModeOrNonAnnexB) {
          this.error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, minStart, this.pos() - 1 - minStart);
        }
        const maxStart = this.pos();
        const maxCharacter = this.scanClassAtom();
        if (maxCharacter === "" && this.anyUnicodeModeOrNonAnnexB) {
          this.error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, maxStart, this.pos() - maxStart);
          continue;
        }
        if (minCharacter === "") continue;
        const min = decodeClassAtomRune(minCharacter);
        const max = decodeClassAtomRune(maxCharacter);
        if (minCharacter.length === min.size && maxCharacter.length === max.size && min.code > max.code) {
          this.error(Diagnostics.Range_out_of_order_in_character_class, minStart, this.pos() - minStart);
        }
      }
    }
  }

  private scanClassSetExpression(): void {
    let isCharacterComplement = false;
    if (this.char() === 0x5e) {
      this.incPos(1);
      isCharacterComplement = true;
    }
    let expressionMayContainStrings = false;
    if (this.isClassContentExit(this.char())) return;
    let start = this.pos();
    let operand = "";
    let twoChars = this.pos() + 1 < this.end ? this.text.slice(this.pos(), this.pos() + 2) : "";
    if (twoChars === "--" || twoChars === "&&") {
      this.error(Diagnostics.Expected_a_class_set_operand, this.pos(), 0);
      this.mayContainStrings = false;
    } else {
      operand = this.scanClassSetOperand();
    }
    if (this.char() === 0x2d && this.pos() + 1 < this.end && this.charAt(this.pos() + 1) === 0x2d) {
      if (isCharacterComplement && this.mayContainStrings) {
        this.error(
          Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class,
          start,
          this.pos() - start,
        );
      }
      expressionMayContainStrings = this.mayContainStrings;
      this.scanClassSetSubExpression(ClassSetExpressionType.ClassSubtraction);
      this.mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
      return;
    }
    if (this.char() === 0x26) {
      if (this.pos() + 1 < this.end && this.charAt(this.pos() + 1) === 0x26) {
        this.scanClassSetSubExpression(ClassSetExpressionType.ClassIntersection);
        if (isCharacterComplement && this.mayContainStrings) {
          this.error(
            Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class,
            start,
            this.pos() - start,
          );
        }
        expressionMayContainStrings = this.mayContainStrings;
        this.mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
        return;
      }
      this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, "&");
    } else {
      if (isCharacterComplement && this.mayContainStrings) {
        this.error(
          Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class,
          start,
          this.pos() - start,
        );
      }
      expressionMayContainStrings = this.mayContainStrings;
    }
    while (this.pos() < this.end) {
      const ch = this.char();
      if (ch === 0x2d) {
        this.incPos(1);
        if (this.isClassContentExit(this.char())) {
          this.mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
          return;
        }
        if (this.char() === 0x2d) {
          this.incPos(1);
          this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos() - 2, 2);
          start = this.pos() - 2;
          operand = this.text.slice(start, this.pos());
          continue;
        }
        if (operand === "") {
          this.error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, start, this.pos() - 1 - start);
        }
        const secondStart = this.pos();
        const secondOperand = this.scanClassSetOperand();
        if (isCharacterComplement && this.mayContainStrings) {
          this.error(
            Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class,
            secondStart,
            this.pos() - secondStart,
          );
        }
        expressionMayContainStrings = expressionMayContainStrings || this.mayContainStrings;
        if (secondOperand === "") {
          this.error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, secondStart, this.pos() - secondStart);
        } else if (operand !== "") {
          const min = decodeClassAtomRune(operand);
          const max = decodeClassAtomRune(secondOperand);
          if (operand.length === min.size && secondOperand.length === max.size && min.code > max.code) {
            this.error(Diagnostics.Range_out_of_order_in_character_class, start, this.pos() - start);
          }
        }
      } else if (ch === 0x26) {
        start = this.pos();
        this.incPos(1);
        if (this.char() === 0x26) {
          this.incPos(1);
          this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos() - 2, 2);
          if (this.char() === 0x26) {
            this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, "&");
            this.incPos(1);
          }
        } else {
          this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos() - 1, 1, "&");
        }
        operand = this.text.slice(start, this.pos());
        continue;
      }
      if (this.isClassContentExit(this.char())) break;
      start = this.pos();
      twoChars = this.pos() + 1 < this.end ? this.text.slice(this.pos(), this.pos() + 2) : "";
      if (twoChars === "--" || twoChars === "&&") {
        this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos(), 2);
        this.incPos(2);
        operand = this.text.slice(start, this.pos());
      } else {
        operand = this.scanClassSetOperand();
      }
    }
    this.mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
  }

  private scanClassSetSubExpression(expressionType: ClassSetExpressionType): void {
    let expressionMayContainStrings = this.mayContainStrings;
    while (this.pos() < this.end) {
      const ch = this.char();
      if (this.isClassContentExit(ch)) break;
      if (ch === 0x2d) {
        this.incPos(1);
        if (this.char() === 0x2d) {
          this.incPos(1);
          if (expressionType !== ClassSetExpressionType.ClassSubtraction) {
            this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos() - 2, 2);
          }
        } else {
          this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos() - 1, 1);
        }
      } else if (ch === 0x26) {
        this.incPos(1);
        if (this.char() === 0x26) {
          this.incPos(1);
          if (expressionType !== ClassSetExpressionType.ClassIntersection) {
            this.error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, this.pos() - 2, 2);
          }
          if (this.char() === 0x26) {
            this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, "&");
            this.incPos(1);
          }
        } else {
          this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos() - 1, 1, "&");
        }
      } else if (expressionType === ClassSetExpressionType.ClassSubtraction) {
        this.error(Diagnostics.X_0_expected, this.pos(), 0, "--");
      } else if (expressionType === ClassSetExpressionType.ClassIntersection) {
        this.error(Diagnostics.X_0_expected, this.pos(), 0, "&&");
      }
      if (this.isClassContentExit(this.char())) {
        this.error(Diagnostics.Expected_a_class_set_operand, this.pos(), 0);
        break;
      }
      this.scanClassSetOperand();
      if (expressionType === ClassSetExpressionType.ClassIntersection) {
        expressionMayContainStrings = expressionMayContainStrings && this.mayContainStrings;
      }
    }
    this.mayContainStrings = expressionMayContainStrings;
  }

  private scanClassSetOperand(): string {
    this.mayContainStrings = false;
    switch (this.char()) {
      case 0x5b:
        this.incPos(1);
        this.scanClassSetExpression();
        this.scanExpectedChar(0x5d);
        return "";
      case 0x5c:
        this.incPos(1);
        if (this.scanCharacterClassEscape()) return "";
        if (this.char() === 0x71) {
          this.incPos(1);
          if (this.char() === 0x7b) {
            this.incPos(1);
            this.scanClassStringDisjunctionContents();
            this.scanExpectedChar(0x7d);
            return "";
          }
          this.error(Diagnostics.X_q_must_be_followed_by_string_alternatives_enclosed_in_braces, this.pos() - 2, 2);
          return "q";
        }
        this.incPos(-1);
        return this.scanClassSetCharacter();
      default:
        return this.scanClassSetCharacter();
    }
  }

  private scanClassStringDisjunctionContents(): void {
    let characterCount = 0;
    while (this.pos() < this.end) {
      switch (this.char()) {
        case 0x7d:
          if (characterCount !== 1) this.mayContainStrings = true;
          return;
        case 0x7c:
          if (characterCount !== 1) this.mayContainStrings = true;
          this.incPos(1);
          characterCount = 0;
          break;
        default:
          this.scanClassSetCharacter();
          characterCount++;
          break;
      }
    }
  }

  private scanClassSetCharacter(): string {
    const ch = this.char();
    if (ch === 0x5c) {
      this.incPos(1);
      const innerCh = this.char();
      switch (innerCh) {
        case 0x62:
          this.incPos(1);
          return "\b";
        case 0x26:
        case 0x2d:
        case 0x21:
        case 0x23:
        case 0x25:
        case 0x2c:
        case 0x3a:
        case 0x3b:
        case 0x3c:
        case 0x3d:
        case 0x3e:
        case 0x40:
        case 0x60:
        case 0x7e:
          this.incPos(1);
          return charToString(innerCh);
        default:
          return this.scanCharacterEscape(false);
      }
    }
    if (this.pos() + 1 < this.end && ch === this.charAt(this.pos() + 1)) {
      switch (ch) {
        case 0x26:
        case 0x21:
        case 0x23:
        case 0x25:
        case 0x2a:
        case 0x2b:
        case 0x2c:
        case 0x2e:
        case 0x3a:
        case 0x3b:
        case 0x3c:
        case 0x3d:
        case 0x3e:
        case 0x3f:
        case 0x40:
        case 0x60:
        case 0x7e:
          this.error(
            Diagnostics.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash,
            this.pos(),
            2,
          );
          this.incPos(2);
          return this.text.slice(this.pos() - 2, this.pos());
        default:
          break;
      }
    }
    switch (ch) {
      case 0x2f:
      case 0x28:
      case 0x29:
      case 0x5b:
      case 0x5d:
      case 0x7b:
      case 0x7d:
      case 0x2d:
      case 0x7c:
        this.error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, this.pos(), 1, charToString(ch));
        this.incPos(1);
        return charToString(ch);
      default:
        return this.scanSourceCharacter();
    }
  }

  private scanClassAtom(): string {
    if (this.char() === 0x5c) {
      this.incPos(1);
      switch (this.char()) {
        case 0x62:
          this.incPos(1);
          return "\b";
        case 0x2d:
          this.incPos(1);
          return "-";
        default:
          if (this.scanCharacterClassEscape()) return "";
          return this.scanCharacterEscape(false);
      }
    }
    return this.scanSourceCharacter();
  }

  private scanCharacterClassEscape(): boolean {
    let isCharacterComplement = false;
    const start = this.pos() - 1;
    const ch = this.char();
    switch (ch) {
      case 0x64:
      case 0x44:
      case 0x73:
      case 0x53:
      case 0x77:
      case 0x57:
        this.incPos(1);
        return true;
      case 0x50:
        isCharacterComplement = true;
        this.incPos(1);
        this.scanUnicodePropertyValueExpression(start, ch, isCharacterComplement);
        return true;
      case 0x70:
        this.incPos(1);
        this.scanUnicodePropertyValueExpression(start, ch, isCharacterComplement);
        return true;
      default:
        return false;
    }
  }

  private scanUnicodePropertyValueExpression(start: number, ch: number, isCharacterComplement: boolean): void {
    if (this.char() === 0x7b) {
      this.incPos(1);
      const propertyNameOrValueStart = this.pos();
      const propertyNameOrValue = this.scanWordCharacters();
      if (this.char() === 0x3d) {
        const propertyName = nonBinaryUnicodeProperties.get(propertyNameOrValue);
        if (this.pos() === propertyNameOrValueStart) {
          this.error(Diagnostics.Expected_a_Unicode_property_name, this.pos(), 0);
        } else if (propertyName === undefined) {
          this.error(Diagnostics.Unknown_Unicode_property_name, propertyNameOrValueStart, this.pos() - propertyNameOrValueStart);
          const suggestion = this.getSpellingSuggestionForUnicodePropertyName(propertyNameOrValue);
          if (suggestion !== undefined) this.error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, this.pos() - propertyNameOrValueStart, suggestion);
        }
        this.incPos(1);
        const propertyValueStart = this.pos();
        const propertyValue = this.scanWordCharacters();
        if (this.pos() === propertyValueStart) {
          this.error(Diagnostics.Expected_a_Unicode_property_value, this.pos(), 0);
        } else if (propertyName !== undefined) {
          const values = valuesOfNonBinaryUnicodeProperties.get(propertyName);
          if (values !== undefined && !values.has(propertyValue)) {
            this.error(Diagnostics.Unknown_Unicode_property_value, propertyValueStart, this.pos() - propertyValueStart);
            const suggestion = this.getSpellingSuggestionForUnicodePropertyValue(propertyName, propertyValue);
            if (suggestion !== undefined) this.error(Diagnostics.Did_you_mean_0, propertyValueStart, this.pos() - propertyValueStart, suggestion);
          }
        }
      } else if (this.pos() === propertyNameOrValueStart) {
        this.error(Diagnostics.Expected_a_Unicode_property_name_or_value, this.pos(), 0);
      } else if (binaryUnicodePropertiesOfStrings.has(propertyNameOrValue)) {
        if (!this.unicodeSetsMode) {
          this.error(
            Diagnostics.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set,
            propertyNameOrValueStart,
            this.pos() - propertyNameOrValueStart,
          );
        } else if (isCharacterComplement) {
          this.error(
            Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class,
            propertyNameOrValueStart,
            this.pos() - propertyNameOrValueStart,
          );
        } else {
          this.mayContainStrings = true;
        }
      } else {
        const generalCategory = valuesOfNonBinaryUnicodeProperties.get("General_Category");
        if ((generalCategory === undefined || !generalCategory.has(propertyNameOrValue)) && !binaryUnicodeProperties.has(propertyNameOrValue)) {
          this.error(Diagnostics.Unknown_Unicode_property_name_or_value, propertyNameOrValueStart, this.pos() - propertyNameOrValueStart);
          const suggestion = this.getSpellingSuggestionForUnicodePropertyNameOrValue(propertyNameOrValue);
          if (suggestion !== undefined) this.error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, this.pos() - propertyNameOrValueStart, suggestion);
        }
      }
      this.scanExpectedChar(0x7d);
      if (!this.anyUnicodeMode) {
        this.error(
          Diagnostics.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set,
          start,
          this.pos() - start,
        );
      }
    } else if (this.anyUnicodeModeOrNonAnnexB) {
      this.error(
        Diagnostics.X_0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces,
        this.pos() - 2,
        2,
        charToString(ch),
      );
    } else {
      this.incPos(-1);
    }
  }

  private getSpellingSuggestionForUnicodePropertyName(name: string): string | undefined {
    return getSpellingSuggestionForStrings(name, nonBinaryUnicodeProperties.keys());
  }

  private getSpellingSuggestionForUnicodePropertyValue(propertyName: string, value: string): string | undefined {
    const values = valuesOfNonBinaryUnicodeProperties.get(propertyName);
    return values === undefined ? undefined : getSpellingSuggestionForStrings(value, values.keys());
  }

  private getSpellingSuggestionForUnicodePropertyNameOrValue(name: string): string | undefined {
    const generalCategory = valuesOfNonBinaryUnicodeProperties.get("General_Category") ?? new Set<string>();
    return getSpellingSuggestionForStrings(name, [
      ...generalCategory.keys(),
      ...binaryUnicodeProperties.keys(),
      ...binaryUnicodePropertiesOfStrings.keys(),
    ]);
  }

  private scanWordCharacters(): string {
    const start = this.pos();
    while (this.pos() < this.end && isWordCharacter(this.char())) this.incPos(1);
    return this.text.slice(start, this.pos());
  }

  private scanSourceCharacter(): string {
    if (this.pos() >= this.end) return "";
    if (!this.anyUnicodeMode) {
      if (this.pendingLowSurrogate !== 0) {
        const cp = this.text.codePointAt(this.pos());
        this.incPos(cp === undefined ? 1 : charSize(cp));
        const low = this.pendingLowSurrogate;
        this.pendingLowSurrogate = 0;
        return encodeSurrogate(low);
      }
      const cp = this.text.codePointAt(this.pos());
      if (cp === undefined) {
        this.incPos(1);
        return this.text.slice(this.pos() - 1, this.pos());
      }
      if (cp >= SURR_SELF) {
        const high = SURR1 + ((cp - SURR_SELF) >> 10);
        const low = SURR2 + ((cp - SURR_SELF) & 0x3ff);
        this.pendingLowSurrogate = low;
        return encodeSurrogate(high);
      }
      this.incPos(charSize(cp));
      return charToString(cp);
    }
    const cp = this.text.codePointAt(this.pos());
    if (cp === undefined) return "";
    this.incPos(charSize(cp));
    return charToString(cp);
  }

  private scanExpectedChar(ch: number): void {
    if (this.char() === ch) {
      this.incPos(1);
    } else {
      this.error(Diagnostics.X_0_expected, this.pos(), 0, charToString(ch));
    }
  }

  private scanDigits(): void {
    const start = this.pos();
    while (this.pos() < this.end && isDigit(this.char())) this.incPos(1);
    this.state.tokenValue = this.text.slice(start, this.pos());
  }

  private scanIdentifier(): void {
    const start = this.pos();
    let cp = this.char();
    if (cp < 0 || !isIdentifierStartCodePoint(cp)) {
      this.state.tokenValue = "";
      return;
    }
    this.incPos(charSize(cp));
    while (this.pos() < this.end) {
      cp = this.char();
      if (cp < 0 || !isIdentifierPartCodePoint(cp, LanguageVariant.Standard)) break;
      this.incPos(charSize(cp));
    }
    this.state.tokenValue = this.text.slice(start, this.pos());
  }

  private scanEscapeSequence(flags: number): string {
    const start = this.pos();
    this.incPos(1);
    const ch = this.char();
    if (ch < 0) {
      this.error(Diagnostics.Unexpected_end_of_text, this.pos(), 0);
      return "";
    }
    this.incPos(charSize(ch));
    switch (ch) {
      case 0x30:
        if (!isDigit(this.char())) return "\x00";
        if (isOctalDigit(this.char())) this.incPos(1);
        if (isOctalDigit(this.char())) this.incPos(1);
        this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          this.error(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, this.pos() - start);
          return String.fromCodePoint(Number.parseInt(this.text.slice(start + 1, this.pos()), 8));
        }
        return this.text.slice(start, this.pos());
      case 0x31:
      case 0x32:
      case 0x33:
        if (isOctalDigit(this.char())) this.incPos(1);
        if (isOctalDigit(this.char())) this.incPos(1);
        this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          this.error(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, this.pos() - start);
          return String.fromCodePoint(Number.parseInt(this.text.slice(start + 1, this.pos()), 8));
        }
        return this.text.slice(start, this.pos());
      case 0x34:
      case 0x35:
      case 0x36:
      case 0x37:
        if (isOctalDigit(this.char())) this.incPos(1);
        this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          this.error(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, this.pos() - start);
          return String.fromCodePoint(Number.parseInt(this.text.slice(start + 1, this.pos()), 8));
        }
        return this.text.slice(start, this.pos());
      case 0x38:
      case 0x39:
        this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          this.error(Diagnostics.Escape_sequence_0_is_not_allowed, start, this.pos() - start, this.text.slice(start, this.pos()));
          return charToString(ch);
        }
        return this.text.slice(start, this.pos());
      case 0x62:
        return "\b";
      case 0x74:
        return "\t";
      case 0x6e:
        return "\n";
      case 0x76:
        return "\v";
      case 0x66:
        return "\f";
      case 0x72:
        return "\r";
      case 0x27:
        return "'";
      case 0x22:
        return "\"";
      case 0x75: {
        const extended = this.char() === 0x7b;
        this.incPos(-2);
        const codePoint = this.scanUnicodeEscape((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0);
        if (extended) {
          if ((flags & EscapeSequenceScanningFlags.AllowExtendedUnicodeEscape) === 0) {
            this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
            if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
              this.error(
                Diagnostics.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set,
                start,
                this.pos() - start,
              );
            }
          }
          return codePoint < 0 ? this.text.slice(start, this.pos()) : String.fromCodePoint(codePoint);
        }
        if (codePoint < 0) return this.text.slice(start, this.pos());
        if (
          codePoint >= SURR1
          && codePoint < SURR2
          && ((flags & EscapeSequenceScanningFlags.RegularExpression) === 0 || (flags & EscapeSequenceScanningFlags.AnyUnicodeMode) !== 0)
          && this.char() === 0x5c
          && this.charAt(this.pos() + 1) === 0x75
          && this.charAt(this.pos() + 2) !== 0x7b
        ) {
          const savedPos = this.pos();
          const nextCodePoint = this.scanUnicodeEscape((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0);
          if (nextCodePoint >= SURR2 && nextCodePoint < 0xe000) {
            return String.fromCodePoint(((codePoint - SURR1) << 10) | (nextCodePoint - SURR2) + SURR_SELF);
          }
          this.state.pos = savedPos;
          if ((flags & EscapeSequenceScanningFlags.RegularExpression) !== 0) return encodeSurrogate(codePoint);
        } else if (
          (codePoint >= SURR1 && codePoint < 0xe000)
          && (flags & EscapeSequenceScanningFlags.RegularExpression) !== 0
        ) {
          return encodeSurrogate(codePoint);
        }
        return String.fromCodePoint(codePoint);
      }
      case 0x78:
        while (this.pos() < start + 4) {
          if (!isHexDigit(this.char())) {
            this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
            if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) this.error(Diagnostics.Hexadecimal_digit_expected, this.pos(), 0);
            return this.text.slice(start, this.pos());
          }
          this.incPos(1);
        }
        this.state.tokenFlags |= TokenFlags.HexEscape;
        return String.fromCodePoint(Number.parseInt(this.text.slice(start + 2, this.pos()), 16));
      case 0x0d:
        if (this.char() === 0x0a) this.incPos(1);
        return "";
      case 0x0a:
        return "";
      default:
        if (
          (flags & EscapeSequenceScanningFlags.AnyUnicodeMode) !== 0
          || ((flags & EscapeSequenceScanningFlags.RegularExpression) !== 0
            && (flags & EscapeSequenceScanningFlags.AnnexB) === 0
            && isIdentifierPartCodePoint(ch, LanguageVariant.Standard))
        ) {
          this.error(Diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, this.pos() - 2, 2);
        }
        return charToString(ch);
    }
  }

  private scanUnicodeEscape(shouldEmitInvalidEscapeError: boolean): number {
    this.incPos(2);
    const extended = this.char() === 0x7b;
    let hexDigits = "";
    if (extended) {
      this.incPos(1);
      hexDigits = this.scanHexDigits(1, true, false);
    } else {
      this.state.tokenFlags |= TokenFlags.UnicodeEscape;
      hexDigits = this.scanHexDigits(4, false, false);
    }
    if (hexDigits === "") {
      this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
      if (shouldEmitInvalidEscapeError) this.error(Diagnostics.Hexadecimal_digit_expected, this.pos(), 0);
      return -1;
    }
    const hexValue = Number.parseInt(hexDigits, 16);
    if (extended) {
      if (this.char() === 0x7d) {
        this.incPos(1);
      } else if (shouldEmitInvalidEscapeError) {
        this.error(Diagnostics.Unterminated_Unicode_escape_sequence, this.pos(), 0);
      }
      if (hexValue > 0x10ffff) {
        this.state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if (shouldEmitInvalidEscapeError) this.error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive, this.pos(), 0);
        return -1;
      }
    }
    return hexValue;
  }

  private scanHexDigits(minCount: number, scanAsManyAsPossible: boolean, canHaveSeparators: boolean): string {
    const start = this.pos();
    let digits = "";
    let lastWasSeparator = false;
    while (this.pos() < this.end) {
      const ch = this.char();
      if (canHaveSeparators && ch === 0x5f) {
        lastWasSeparator = true;
        this.incPos(1);
        continue;
      }
      if (!isHexDigit(ch)) break;
      digits += charToString(ch);
      lastWasSeparator = false;
      this.incPos(1);
      if (!scanAsManyAsPossible && digits.length >= minCount) break;
    }
    if (digits.length < minCount || lastWasSeparator) {
      this.state.pos = start;
      return "";
    }
    return digits;
  }
}
