import { Kind, KindNames } from "../ast/index.js";
import type { JsxTokenSyntaxKind } from "../ast/index.js";
import { LanguageVariant } from "../core/languagevariant.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";
import { Diagnostics } from "../diagnostics/diagnostics_generated.js";
import {
  isASCIILetter,
  isDigit as isDigitCode,
  isHexDigit as isHexDigitCode,
  isLineBreak as isLineBreakCode,
  isOctalDigit as isOctalDigitCode,
  isWhiteSpaceLike,
  isWhiteSpaceSingleLine,
} from "../stringutil/util.js";
import { fromString as jsnumFromString, numberToString as jsnumToString } from "../jsnum/string.js";
import { parsePseudoBigInt } from "../jsnum/pseudobigint.js";
import {
  codePointIsHighSurrogate,
  codePointIsLowSurrogate,
  encodeSurrogate,
  surrogatePairToCodepoint,
} from "./utilities.js";
import {
  isConflictMarkerTrivia,
  scanConflictMarkerTrivia,
} from "./trivia.js";
import { tokenIsIdentifierOrKeyword } from "./utilities.js";
import { TokenFlags } from "./token-flags.js";
import type { CommentDirective, TokenFlags as TokenFlagsType } from "./token-flags.js";

export interface ScannedToken {
  readonly kind: Kind;
  readonly pos: number;
  readonly end: number;
  readonly text: string;
}

export interface ScannerOptions {
  readonly skipTrivia?: boolean;
}

const keywordKinds = new Map<string, Kind>([
  ["abstract", Kind.AbstractKeyword],
  ["accessor", Kind.AccessorKeyword],
  ["any", Kind.AnyKeyword],
  ["as", Kind.AsKeyword],
  ["assert", Kind.AssertKeyword],
  ["asserts", Kind.AssertsKeyword],
  ["async", Kind.AsyncKeyword],
  ["await", Kind.AwaitKeyword],
  ["bigint", Kind.BigIntKeyword],
  ["boolean", Kind.BooleanKeyword],
  ["break", Kind.BreakKeyword],
  ["case", Kind.CaseKeyword],
  ["catch", Kind.CatchKeyword],
  ["class", Kind.ClassKeyword],
  ["const", Kind.ConstKeyword],
  ["constructor", Kind.ConstructorKeyword],
  ["continue", Kind.ContinueKeyword],
  ["debugger", Kind.DebuggerKeyword],
  ["declare", Kind.DeclareKeyword],
  ["default", Kind.DefaultKeyword],
  ["defer", Kind.DeferKeyword],
  ["delete", Kind.DeleteKeyword],
  ["do", Kind.DoKeyword],
  ["else", Kind.ElseKeyword],
  ["enum", Kind.EnumKeyword],
  ["export", Kind.ExportKeyword],
  ["extends", Kind.ExtendsKeyword],
  ["false", Kind.FalseKeyword],
  ["finally", Kind.FinallyKeyword],
  ["for", Kind.ForKeyword],
  ["from", Kind.FromKeyword],
  ["function", Kind.FunctionKeyword],
  ["get", Kind.GetKeyword],
  ["global", Kind.GlobalKeyword],
  ["if", Kind.IfKeyword],
  ["implements", Kind.ImplementsKeyword],
  ["import", Kind.ImportKeyword],
  ["in", Kind.InKeyword],
  ["infer", Kind.InferKeyword],
  ["instanceof", Kind.InstanceOfKeyword],
  ["interface", Kind.InterfaceKeyword],
  ["intrinsic", Kind.IntrinsicKeyword],
  ["is", Kind.IsKeyword],
  ["keyof", Kind.KeyOfKeyword],
  ["let", Kind.LetKeyword],
  ["module", Kind.ModuleKeyword],
  ["namespace", Kind.NamespaceKeyword],
  ["never", Kind.NeverKeyword],
  ["new", Kind.NewKeyword],
  ["null", Kind.NullKeyword],
  ["number", Kind.NumberKeyword],
  ["object", Kind.ObjectKeyword],
  ["of", Kind.OfKeyword],
  ["out", Kind.OutKeyword],
  ["override", Kind.OverrideKeyword],
  ["package", Kind.PackageKeyword],
  ["private", Kind.PrivateKeyword],
  ["protected", Kind.ProtectedKeyword],
  ["public", Kind.PublicKeyword],
  ["readonly", Kind.ReadonlyKeyword],
  ["require", Kind.RequireKeyword],
  ["return", Kind.ReturnKeyword],
  ["satisfies", Kind.SatisfiesKeyword],
  ["set", Kind.SetKeyword],
  ["static", Kind.StaticKeyword],
  ["string", Kind.StringKeyword],
  ["super", Kind.SuperKeyword],
  ["switch", Kind.SwitchKeyword],
  ["symbol", Kind.SymbolKeyword],
  ["this", Kind.ThisKeyword],
  ["throw", Kind.ThrowKeyword],
  ["true", Kind.TrueKeyword],
  ["try", Kind.TryKeyword],
  ["type", Kind.TypeKeyword],
  ["typeof", Kind.TypeOfKeyword],
  ["undefined", Kind.UndefinedKeyword],
  ["unique", Kind.UniqueKeyword],
  ["unknown", Kind.UnknownKeyword],
  ["using", Kind.UsingKeyword],
  ["var", Kind.VarKeyword],
  ["void", Kind.VoidKeyword],
  ["while", Kind.WhileKeyword],
  ["with", Kind.WithKeyword],
  ["yield", Kind.YieldKeyword],
]);

const punctuators: readonly [string, Kind][] = [
  [">>>=", Kind.GreaterThanGreaterThanGreaterThanEqualsToken],
  ["===", Kind.EqualsEqualsEqualsToken],
  ["!==", Kind.ExclamationEqualsEqualsToken],
  [">>>", Kind.GreaterThanGreaterThanGreaterThanToken],
  ["<<=", Kind.LessThanLessThanEqualsToken],
  [">>=", Kind.GreaterThanGreaterThanEqualsToken],
  ["**=", Kind.AsteriskAsteriskEqualsToken],
  ["&&=", Kind.AmpersandAmpersandEqualsToken],
  ["||=", Kind.BarBarEqualsToken],
  ["??=", Kind.QuestionQuestionEqualsToken],
  ["=>", Kind.EqualsGreaterThanToken],
  ["...", Kind.DotDotDotToken],
  ["?.", Kind.QuestionDotToken],
  ["<=", Kind.LessThanEqualsToken],
  [">=", Kind.GreaterThanEqualsToken],
  ["==", Kind.EqualsEqualsToken],
  ["!=", Kind.ExclamationEqualsToken],
  ["**", Kind.AsteriskAsteriskToken],
  ["++", Kind.PlusPlusToken],
  ["--", Kind.MinusMinusToken],
  ["<<", Kind.LessThanLessThanToken],
  [">>", Kind.GreaterThanGreaterThanToken],
  ["&&", Kind.AmpersandAmpersandToken],
  ["||", Kind.BarBarToken],
  ["??", Kind.QuestionQuestionToken],
  ["+=", Kind.PlusEqualsToken],
  ["-=", Kind.MinusEqualsToken],
  ["*=", Kind.AsteriskEqualsToken],
  ["/=", Kind.SlashEqualsToken],
  ["%=", Kind.PercentEqualsToken],
  ["&=", Kind.AmpersandEqualsToken],
  ["|=", Kind.BarEqualsToken],
  ["^=", Kind.CaretEqualsToken],
  ["{", Kind.OpenBraceToken],
  ["}", Kind.CloseBraceToken],
  ["(", Kind.OpenParenToken],
  [")", Kind.CloseParenToken],
  ["[", Kind.OpenBracketToken],
  ["]", Kind.CloseBracketToken],
  [".", Kind.DotToken],
  [";", Kind.SemicolonToken],
  [",", Kind.CommaToken],
  ["<", Kind.LessThanToken],
  [">", Kind.GreaterThanToken],
  ["+", Kind.PlusToken],
  ["-", Kind.MinusToken],
  ["*", Kind.AsteriskToken],
  ["/", Kind.SlashToken],
  ["%", Kind.PercentToken],
  ["&", Kind.AmpersandToken],
  ["|", Kind.BarToken],
  ["^", Kind.CaretToken],
  ["!", Kind.ExclamationToken],
  ["~", Kind.TildeToken],
  ["?", Kind.QuestionToken],
  [":", Kind.ColonToken],
  ["@", Kind.AtToken],
  ["`", Kind.BacktickToken],
  ["#", Kind.HashToken],
  ["=", Kind.EqualsToken],
];

function isLineBreak(charCode: number): boolean {
  return charCode === 10 || charCode === 13 || charCode === 0x2028 || charCode === 0x2029;
}

function isWhitespace(charCode: number): boolean {
  return charCode === 9 || charCode === 11 || charCode === 12 || charCode === 32 || charCode === 0xA0 || charCode === 0xFEFF;
}

function isIdentifierStart(character: string): boolean {
  return character === "$" || character === "_" || /^\p{ID_Start}$/u.test(character);
}

function isIdentifierPart(character: string): boolean {
  return character === "$" || character === "\u200c" || character === "\u200d" || /^\p{ID_Continue}$/u.test(character);
}

function isDigit(character: string): boolean {
  return character >= "0" && character <= "9";
}

export class Scanner {
  readonly #text: string;
  readonly #skipTrivia: boolean;
  readonly #templateExpressionBraceDepths: number[] = [];
  #position = 0;
  #previousSignificantKind: Kind | undefined;
  #pendingTemplateContinuation = false;

  constructor(text: string, options: ScannerOptions = {}) {
    this.#text = text;
    this.#skipTrivia = options.skipTrivia ?? true;
  }

  scan(): ScannedToken {
    while (this.#position < this.#text.length) {
      const token = this.#scanToken();
      if (!this.#skipTrivia || !isTrivia(token.kind)) {
        if (!isTrivia(token.kind) && token.kind !== Kind.EndOfFile) {
          this.#previousSignificantKind = token.kind;
        }
        return token;
      }
    }
    const token = this.#token(Kind.EndOfFile, this.#position, this.#position);
    this.#previousSignificantKind = token.kind;
    return token;
  }

  #scanToken(): ScannedToken {
    if (this.#pendingTemplateContinuation) {
      this.#pendingTemplateContinuation = false;
      return this.#scanTemplateContinuation();
    }

    const start = this.#position;
    const charCode = this.#text.charCodeAt(this.#position);

    if (this.#position === 0 && this.#text.startsWith("#!", this.#position)) {
      this.#position += 2;
      while (this.#position < this.#text.length && !isLineBreak(this.#text.charCodeAt(this.#position))) {
        this.#position += 1;
      }
      return this.#token(Kind.SingleLineCommentTrivia, start, this.#position);
    }

    if (isLineBreak(charCode)) {
      if (charCode === 13 && this.#text.charCodeAt(this.#position + 1) === 10) {
        this.#position += 2;
      } else {
        this.#position += 1;
      }
      return this.#token(Kind.NewLineTrivia, start, this.#position);
    }

    if (isWhitespace(charCode)) {
      this.#position += 1;
      while (this.#position < this.#text.length) {
        const next = this.#text.charCodeAt(this.#position);
        if (!isWhitespace(next)) {
          break;
        }
        this.#position += 1;
      }
      return this.#token(Kind.WhitespaceTrivia, start, this.#position);
    }

    if (this.#text.startsWith("//", this.#position)) {
      this.#position += 2;
      while (this.#position < this.#text.length && !isLineBreak(this.#text.charCodeAt(this.#position))) {
        this.#position += 1;
      }
      return this.#token(Kind.SingleLineCommentTrivia, start, this.#position);
    }

    if (this.#text.startsWith("/*", this.#position)) {
      this.#position += 2;
      while (this.#position < this.#text.length && !this.#text.startsWith("*/", this.#position)) {
        this.#position += 1;
      }
      if (this.#position < this.#text.length) {
        this.#position += 2;
      }
      return this.#token(Kind.MultiLineCommentTrivia, start, this.#position);
    }

    const current = this.#text[this.#position]!;
    if (current === "\"" || current === "'") {
      return this.#scanString(current);
    }

    if (isDigit(current)) {
      return this.#scanNumber();
    }

    if (current === "#" && isIdentifierStart(this.#text[this.#position + 1] ?? "")) {
      this.#position += 2;
      while (this.#position < this.#text.length && isIdentifierPart(this.#text[this.#position]!)) {
        this.#position += 1;
      }
      return this.#token(Kind.PrivateIdentifier, start, this.#position);
    }

    if (isIdentifierStart(current)) {
      return this.#scanIdentifierOrKeyword();
    }

    if (current === "`") {
      return this.#scanTemplateStart();
    }

    if (current === "/" && this.#canStartRegularExpression() && this.#text[this.#position + 1] !== "=") {
      const regex = this.#tryScanRegularExpression();
      if (regex !== undefined) {
        return regex;
      }
    }

    if (current === "{" && this.#templateExpressionBraceDepths.length > 0) {
      this.#templateExpressionBraceDepths[this.#templateExpressionBraceDepths.length - 1]! += 1;
    }

    if (current === "}" && this.#templateExpressionBraceDepths.length > 0) {
      const lastIndex = this.#templateExpressionBraceDepths.length - 1;
      if (this.#templateExpressionBraceDepths[lastIndex]! === 0) {
        this.#position += 1;
        this.#pendingTemplateContinuation = true;
        return this.#token(Kind.CloseBraceToken, start, this.#position);
      }
      this.#templateExpressionBraceDepths[lastIndex]! -= 1;
    }

    for (const [text, kind] of punctuators) {
      if (this.#text.startsWith(text, this.#position)) {
        this.#position += text.length;
        return this.#token(kind, start, this.#position);
      }
    }

    this.#position += 1;
    return this.#token(Kind.Unknown, start, this.#position);
  }

  #scanIdentifierOrKeyword(): ScannedToken {
    const start = this.#position;
    this.#position += 1;
    while (this.#position < this.#text.length && isIdentifierPart(this.#text[this.#position]!)) {
      this.#position += 1;
    }
    const text = this.#text.slice(start, this.#position);
    return this.#token(keywordKinds.get(text) ?? Kind.Identifier, start, this.#position);
  }

  #scanNumber(): ScannedToken {
    const start = this.#position;
    if (this.#text[this.#position] === "0") {
      const radixMarker = this.#text[this.#position + 1]?.toLowerCase();
      if (radixMarker === "x" || radixMarker === "b" || radixMarker === "o") {
        this.#position += 2;
        while (this.#position < this.#text.length && /[0-9a-fA-F_]/.test(this.#text[this.#position]!)) {
          this.#position += 1;
        }
        if (this.#text[this.#position] === "n") {
          this.#position += 1;
          return this.#token(Kind.BigIntLiteral, start, this.#position);
        }
        return this.#token(Kind.NumericLiteral, start, this.#position);
      }
    }
    while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
      this.#position += 1;
    }
    if (this.#text[this.#position] === "." && isDigit(this.#text[this.#position + 1] ?? "")) {
      this.#position += 1;
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    }
    if ((this.#text[this.#position] === "e" || this.#text[this.#position] === "E") && /[+\-0-9]/.test(this.#text[this.#position + 1] ?? "")) {
      const exponentStart = this.#position;
      this.#position += 1;
      if (this.#text[this.#position] === "+" || this.#text[this.#position] === "-") {
        this.#position += 1;
      }
      if (!isDigit(this.#text[this.#position] ?? "")) {
        this.#position = exponentStart;
      } else {
        while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
          this.#position += 1;
        }
      }
    }
    if (this.#text[this.#position] === "n") {
      this.#position += 1;
      return this.#token(Kind.BigIntLiteral, start, this.#position);
    }
    return this.#token(Kind.NumericLiteral, start, this.#position);
  }

  #scanString(quote: string): ScannedToken {
    const start = this.#position;
    this.#position += 1;
    while (this.#position < this.#text.length) {
      const current = this.#text[this.#position]!;
      if (current === "\\") {
        this.#position += 2;
        continue;
      }
      this.#position += 1;
      if (current === quote) {
        break;
      }
      if (isLineBreak(current.charCodeAt(0))) {
        break;
      }
    }
    return this.#token(Kind.StringLiteral, start, this.#position);
  }

  #scanTemplateStart(): ScannedToken {
    const start = this.#position;
    this.#position += 1;
    while (this.#position < this.#text.length) {
      const current = this.#text[this.#position]!;
      if (current === "\\") {
        this.#position += 2;
        continue;
      }
      if (current === "`") {
        this.#position += 1;
        return this.#token(Kind.NoSubstitutionTemplateLiteral, start, this.#position);
      }
      if (current === "$" && this.#text[this.#position + 1] === "{") {
        this.#position += 2;
        this.#templateExpressionBraceDepths.push(0);
        return this.#token(Kind.TemplateHead, start, this.#position);
      }
      this.#position += 1;
    }
    return this.#token(Kind.NoSubstitutionTemplateLiteral, start, this.#position);
  }

  #scanTemplateContinuation(): ScannedToken {
    const start = this.#position - 1;
    while (this.#position < this.#text.length) {
      const current = this.#text[this.#position]!;
      if (current === "\\") {
        this.#position += 2;
        continue;
      }
      if (current === "`") {
        this.#position += 1;
        this.#templateExpressionBraceDepths.pop();
        return this.#token(Kind.TemplateTail, start, this.#position);
      }
      if (current === "$" && this.#text[this.#position + 1] === "{") {
        this.#position += 2;
        this.#templateExpressionBraceDepths[this.#templateExpressionBraceDepths.length - 1] = 0;
        return this.#token(Kind.TemplateMiddle, start, this.#position);
      }
      this.#position += 1;
    }
    this.#templateExpressionBraceDepths.pop();
    return this.#token(Kind.TemplateTail, start, this.#position);
  }

  #tryScanRegularExpression(): ScannedToken | undefined {
    const start = this.#position;
    this.#position += 1;
    let inCharacterClass = false;
    while (this.#position < this.#text.length) {
      const current = this.#text[this.#position]!;
      if (isLineBreak(current.charCodeAt(0))) {
        this.#position = start;
        return undefined;
      }
      if (current === "\\") {
        this.#position += 2;
        continue;
      }
      if (current === "[") {
        inCharacterClass = true;
        this.#position += 1;
        continue;
      }
      if (current === "]") {
        inCharacterClass = false;
        this.#position += 1;
        continue;
      }
      if (current === "/" && !inCharacterClass) {
        this.#position += 1;
        while (this.#position < this.#text.length && isIdentifierPart(this.#text[this.#position]!)) {
          this.#position += 1;
        }
        return this.#token(Kind.RegularExpressionLiteral, start, this.#position);
      }
      this.#position += 1;
    }
    this.#position = start;
    return undefined;
  }

  #canStartRegularExpression(): boolean {
    switch (this.#previousSignificantKind) {
      case undefined:
      case Kind.OpenParenToken:
      case Kind.OpenBraceToken:
      case Kind.OpenBracketToken:
      case Kind.CommaToken:
      case Kind.SemicolonToken:
      case Kind.ColonToken:
      case Kind.QuestionToken:
      case Kind.EqualsToken:
      case Kind.EqualsGreaterThanToken:
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.AsteriskToken:
      case Kind.AsteriskAsteriskToken:
      case Kind.SlashToken:
      case Kind.PercentToken:
      case Kind.AmpersandToken:
      case Kind.BarToken:
      case Kind.CaretToken:
      case Kind.ExclamationToken:
      case Kind.TildeToken:
      case Kind.AmpersandAmpersandToken:
      case Kind.BarBarToken:
      case Kind.QuestionQuestionToken:
      case Kind.ReturnKeyword:
      case Kind.ThrowKeyword:
      case Kind.CaseKeyword:
      case Kind.DeleteKeyword:
      case Kind.TypeOfKeyword:
      case Kind.VoidKeyword:
      case Kind.AwaitKeyword:
        return true;
      default:
        return isAssignmentOperator(this.#previousSignificantKind);
    }
  }

  #token(kind: Kind, pos: number, end: number): ScannedToken {
    return { kind, pos, end, text: this.#text.slice(pos, end) };
  }
}

function isAssignmentOperator(kind: Kind): boolean {
  return kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.AsteriskAsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.LessThanLessThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.BarBarEqualsToken
    || kind === Kind.AmpersandAmpersandEqualsToken
    || kind === Kind.QuestionQuestionEqualsToken
    || kind === Kind.CaretEqualsToken;
}

function isDecimalDigitOrSeparator(character: string): boolean {
  return isDigit(character) || character === "_";
}

export function createScanner(text: string, options?: ScannerOptions): Scanner {
  return new Scanner(text, options);
}

export function scanAll(text: string, options?: ScannerOptions): readonly ScannedToken[] {
  const scanner = createScanner(text, options);
  const tokens: ScannedToken[] = [];
  while (true) {
    const token = scanner.scan();
    tokens.push(token);
    if (token.kind === Kind.EndOfFile) {
      return tokens;
    }
  }
}

export function isTrivia(kind: Kind): boolean {
  return kind === Kind.SingleLineCommentTrivia
    || kind === Kind.MultiLineCommentTrivia
    || kind === Kind.NewLineTrivia
    || kind === Kind.WhitespaceTrivia
    || kind === Kind.ConflictMarkerTrivia;
}


// ---------------------------------------------------------------------------
// LiveScanner — faithful, parser-decoupled, stateful token scanner.
//
// SIBLING to the batch `Scanner`/`scanAll`/`createScanner` API above (those
// stay byte-for-byte). This is a faithful port of TS-Go's stateful scanner
// (internal/scanner/scanner.go): `Scan` + the CORE helpers (scanString,
// scanNumber, scanIdentifier, scanTemplateAndSetTokenValue, scanEscapeSequence,
// scanUnicodeEscape, scanExtendedUnicodeEscape) + token accessors +
// Mark/Rewind/ResetPos. Speculation lives in the parser, not here. The reScan*
// and scanJsx* families are deferred to wave 4a-2.
//
// JS strings are natively UTF-16; TS-Go reads single UTF-8 bytes in char()/
// charAt() and decodes runes in charAndSize(). This port uses charCodeAt for
// char()/charAt() and codePointAt for charAndSize(), matching the existing
// trivia.ts/native-preview conventions. The -1 sentinel (pos >= end) is
// preserved so `ch < 0` EOF checks port faithfully.
// ---------------------------------------------------------------------------

// EscapeSequenceScanningFlags — faithful to scanner.go:21-32. Only the subset
// the CORE wave needs (string + template literals); regex modes land in 4a-2.
const EscapeSequenceScanningFlags = {
  String: 1 << 0,
  ReportErrors: 1 << 1,
  RegularExpression: 1 << 2,
  AnnexB: 1 << 3,
  AnyUnicodeMode: 1 << 4,
  AtomEscape: 1 << 5,
  // ReportInvalidEscapeErrors = RegularExpression | ReportErrors
  ReportInvalidEscapeErrors: (1 << 2) | (1 << 1),
  // AllowExtendedUnicodeEscape = String | AnyUnicodeMode
  AllowExtendedUnicodeEscape: (1 << 0) | (1 << 4),
} as const;

// regularExpressionFlags — faithful to regexp.go:16-41 (NO enum). Only the bits
// the reScanSlashToken flag-error loop needs (the deep regExpParser validation
// path of scanner.go:1171-1192 is DEFERRED — see reScanSlashToken below).
const regularExpressionFlags = {
  None: 0,
  HasIndices: 1 << 0, // d
  Global: 1 << 1, // g
  IgnoreCase: 1 << 2, // i
  Multiline: 1 << 3, // m
  DotAll: 1 << 4, // s
  Unicode: 1 << 5, // u
  UnicodeSets: 1 << 6, // v
  Sticky: 1 << 7, // y
  // AnyUnicodeMode = Unicode | UnicodeSets
  AnyUnicodeMode: (1 << 5) | (1 << 6),
} as const;

// charCodeToRegExpFlag — faithful to regexp.go:33-42 (keyed by char code).
const charCodeToRegExpFlag: ReadonlyMap<number, number> = new Map<number, number>([
  [0x64 /* d */, regularExpressionFlags.HasIndices],
  [0x67 /* g */, regularExpressionFlags.Global],
  [0x69 /* i */, regularExpressionFlags.IgnoreCase],
  [0x6d /* m */, regularExpressionFlags.Multiline],
  [0x73 /* s */, regularExpressionFlags.DotAll],
  [0x75 /* u */, regularExpressionFlags.Unicode],
  [0x76 /* v */, regularExpressionFlags.UnicodeSets],
  [0x79 /* y */, regularExpressionFlags.Sticky],
]);

/**
 * ErrorCallback — faithful to scanner.go:34. Optional, threaded so error sites
 * (and the flags they set, e.g. Unterminated) are preserved without dropping.
 */
export type ScannerErrorCallback = (
  message: DiagnosticMessage,
  pos: number,
  length: number,
  ...args: readonly unknown[]
) => void;

// Unicode identifier range tables — verified 1:1 against scanner.go:196-199
// (unicodeESNextIdentifierStart / unicodeESNextIdentifierPart, Unicode 15.1).
const unicodeESNextIdentifierStart: readonly number[] = [65, 90, 97, 122, 170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 895, 895, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1327, 1329, 1366, 1369, 1369, 1376, 1416, 1488, 1514, 1519, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2144, 2154, 2160, 2183, 2185, 2190, 2208, 2249, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2432, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2556, 2556, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2809, 2809, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3129, 3133, 3133, 3160, 3162, 3165, 3165, 3168, 3169, 3200, 3200, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3293, 3294, 3296, 3297, 3313, 3314, 3332, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3412, 3414, 3423, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3718, 3722, 3724, 3747, 3749, 3749, 3751, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5109, 5112, 5117, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5880, 5888, 5905, 5919, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6264, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6430, 6480, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6988, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7296, 7304, 7312, 7354, 7357, 7359, 7401, 7404, 7406, 7411, 7413, 7414, 7418, 7418, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8472, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12443, 12447, 12449, 12538, 12540, 12543, 12549, 12591, 12593, 12686, 12704, 12735, 12784, 12799, 13312, 19903, 19968, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42653, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42954, 42960, 42961, 42963, 42963, 42965, 42969, 42994, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43261, 43262, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43488, 43492, 43494, 43503, 43514, 43518, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43646, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43824, 43866, 43868, 43881, 43888, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65536, 65547, 65549, 65574, 65576, 65594, 65596, 65597, 65599, 65613, 65616, 65629, 65664, 65786, 65856, 65908, 66176, 66204, 66208, 66256, 66304, 66335, 66349, 66378, 66384, 66421, 66432, 66461, 66464, 66499, 66504, 66511, 66513, 66517, 66560, 66717, 66736, 66771, 66776, 66811, 66816, 66855, 66864, 66915, 66928, 66938, 66940, 66954, 66956, 66962, 66964, 66965, 66967, 66977, 66979, 66993, 66995, 67001, 67003, 67004, 67072, 67382, 67392, 67413, 67424, 67431, 67456, 67461, 67463, 67504, 67506, 67514, 67584, 67589, 67592, 67592, 67594, 67637, 67639, 67640, 67644, 67644, 67647, 67669, 67680, 67702, 67712, 67742, 67808, 67826, 67828, 67829, 67840, 67861, 67872, 67897, 67968, 68023, 68030, 68031, 68096, 68096, 68112, 68115, 68117, 68119, 68121, 68149, 68192, 68220, 68224, 68252, 68288, 68295, 68297, 68324, 68352, 68405, 68416, 68437, 68448, 68466, 68480, 68497, 68608, 68680, 68736, 68786, 68800, 68850, 68864, 68899, 69248, 69289, 69296, 69297, 69376, 69404, 69415, 69415, 69424, 69445, 69488, 69505, 69552, 69572, 69600, 69622, 69635, 69687, 69745, 69746, 69749, 69749, 69763, 69807, 69840, 69864, 69891, 69926, 69956, 69956, 69959, 69959, 69968, 70002, 70006, 70006, 70019, 70066, 70081, 70084, 70106, 70106, 70108, 70108, 70144, 70161, 70163, 70187, 70207, 70208, 70272, 70278, 70280, 70280, 70282, 70285, 70287, 70301, 70303, 70312, 70320, 70366, 70405, 70412, 70415, 70416, 70419, 70440, 70442, 70448, 70450, 70451, 70453, 70457, 70461, 70461, 70480, 70480, 70493, 70497, 70656, 70708, 70727, 70730, 70751, 70753, 70784, 70831, 70852, 70853, 70855, 70855, 71040, 71086, 71128, 71131, 71168, 71215, 71236, 71236, 71296, 71338, 71352, 71352, 71424, 71450, 71488, 71494, 71680, 71723, 71840, 71903, 71935, 71942, 71945, 71945, 71948, 71955, 71957, 71958, 71960, 71983, 71999, 71999, 72001, 72001, 72096, 72103, 72106, 72144, 72161, 72161, 72163, 72163, 72192, 72192, 72203, 72242, 72250, 72250, 72272, 72272, 72284, 72329, 72349, 72349, 72368, 72440, 72704, 72712, 72714, 72750, 72768, 72768, 72818, 72847, 72960, 72966, 72968, 72969, 72971, 73008, 73030, 73030, 73056, 73061, 73063, 73064, 73066, 73097, 73112, 73112, 73440, 73458, 73474, 73474, 73476, 73488, 73490, 73523, 73648, 73648, 73728, 74649, 74752, 74862, 74880, 75075, 77712, 77808, 77824, 78895, 78913, 78918, 82944, 83526, 92160, 92728, 92736, 92766, 92784, 92862, 92880, 92909, 92928, 92975, 92992, 92995, 93027, 93047, 93053, 93071, 93760, 93823, 93952, 94026, 94032, 94032, 94099, 94111, 94176, 94177, 94179, 94179, 94208, 100343, 100352, 101589, 101632, 101640, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 113664, 113770, 113776, 113788, 113792, 113800, 113808, 113817, 119808, 119892, 119894, 119964, 119966, 119967, 119970, 119970, 119973, 119974, 119977, 119980, 119982, 119993, 119995, 119995, 119997, 120003, 120005, 120069, 120071, 120074, 120077, 120084, 120086, 120092, 120094, 120121, 120123, 120126, 120128, 120132, 120134, 120134, 120138, 120144, 120146, 120485, 120488, 120512, 120514, 120538, 120540, 120570, 120572, 120596, 120598, 120628, 120630, 120654, 120656, 120686, 120688, 120712, 120714, 120744, 120746, 120770, 120772, 120779, 122624, 122654, 122661, 122666, 122928, 122989, 123136, 123180, 123191, 123197, 123214, 123214, 123536, 123565, 123584, 123627, 124112, 124139, 124896, 124902, 124904, 124907, 124909, 124910, 124912, 124926, 124928, 125124, 125184, 125251, 125259, 125259, 126464, 126467, 126469, 126495, 126497, 126498, 126500, 126500, 126503, 126503, 126505, 126514, 126516, 126519, 126521, 126521, 126523, 126523, 126530, 126530, 126535, 126535, 126537, 126537, 126539, 126539, 126541, 126543, 126545, 126546, 126548, 126548, 126551, 126551, 126553, 126553, 126555, 126555, 126557, 126557, 126559, 126559, 126561, 126562, 126564, 126564, 126567, 126570, 126572, 126578, 126580, 126583, 126585, 126588, 126590, 126590, 126592, 126601, 126603, 126619, 126625, 126627, 126629, 126633, 126635, 126651, 131072, 173791, 173824, 177977, 177984, 178205, 178208, 183969, 183984, 191456, 191472, 192093, 194560, 195101, 196608, 201546, 201552, 205743];
const unicodeESNextIdentifierPart: readonly number[] = [48, 57, 65, 90, 95, 95, 97, 122, 170, 170, 181, 181, 183, 183, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 895, 895, 902, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1327, 1329, 1366, 1369, 1369, 1376, 1416, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1519, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2045, 2045, 2048, 2093, 2112, 2139, 2144, 2154, 2160, 2183, 2185, 2190, 2200, 2273, 2275, 2403, 2406, 2415, 2417, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2556, 2556, 2558, 2558, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2809, 2815, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2901, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3072, 3084, 3086, 3088, 3090, 3112, 3114, 3129, 3132, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3162, 3165, 3165, 3168, 3171, 3174, 3183, 3200, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3293, 3294, 3296, 3299, 3302, 3311, 3313, 3315, 3328, 3340, 3342, 3344, 3346, 3396, 3398, 3400, 3402, 3406, 3412, 3415, 3423, 3427, 3430, 3439, 3450, 3455, 3457, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3558, 3567, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3718, 3722, 3724, 3747, 3749, 3749, 3751, 3773, 3776, 3780, 3782, 3782, 3784, 3790, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4969, 4977, 4992, 5007, 5024, 5109, 5112, 5117, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5880, 5888, 5909, 5919, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6159, 6169, 6176, 6264, 6272, 6314, 6320, 6389, 6400, 6430, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6618, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6832, 6845, 6847, 6862, 6912, 6988, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7296, 7304, 7312, 7354, 7357, 7359, 7376, 7378, 7380, 7418, 7424, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8472, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12447, 12449, 12543, 12549, 12591, 12593, 12686, 12704, 12735, 12784, 12799, 13312, 19903, 19968, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42737, 42775, 42783, 42786, 42888, 42891, 42954, 42960, 42961, 42963, 42963, 42965, 42969, 42994, 43047, 43052, 43052, 43072, 43123, 43136, 43205, 43216, 43225, 43232, 43255, 43259, 43259, 43261, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43488, 43518, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43824, 43866, 43868, 43881, 43888, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65071, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65381, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65536, 65547, 65549, 65574, 65576, 65594, 65596, 65597, 65599, 65613, 65616, 65629, 65664, 65786, 65856, 65908, 66045, 66045, 66176, 66204, 66208, 66256, 66272, 66272, 66304, 66335, 66349, 66378, 66384, 66426, 66432, 66461, 66464, 66499, 66504, 66511, 66513, 66517, 66560, 66717, 66720, 66729, 66736, 66771, 66776, 66811, 66816, 66855, 66864, 66915, 66928, 66938, 66940, 66954, 66956, 66962, 66964, 66965, 66967, 66977, 66979, 66993, 66995, 67001, 67003, 67004, 67072, 67382, 67392, 67413, 67424, 67431, 67456, 67461, 67463, 67504, 67506, 67514, 67584, 67589, 67592, 67592, 67594, 67637, 67639, 67640, 67644, 67644, 67647, 67669, 67680, 67702, 67712, 67742, 67808, 67826, 67828, 67829, 67840, 67861, 67872, 67897, 67968, 68023, 68030, 68031, 68096, 68099, 68101, 68102, 68108, 68115, 68117, 68119, 68121, 68149, 68152, 68154, 68159, 68159, 68192, 68220, 68224, 68252, 68288, 68295, 68297, 68326, 68352, 68405, 68416, 68437, 68448, 68466, 68480, 68497, 68608, 68680, 68736, 68786, 68800, 68850, 68864, 68903, 68912, 68921, 69248, 69289, 69291, 69292, 69296, 69297, 69373, 69404, 69415, 69415, 69424, 69456, 69488, 69509, 69552, 69572, 69600, 69622, 69632, 69702, 69734, 69749, 69759, 69818, 69826, 69826, 69840, 69864, 69872, 69881, 69888, 69940, 69942, 69951, 69956, 69959, 69968, 70003, 70006, 70006, 70016, 70084, 70089, 70092, 70094, 70106, 70108, 70108, 70144, 70161, 70163, 70199, 70206, 70209, 70272, 70278, 70280, 70280, 70282, 70285, 70287, 70301, 70303, 70312, 70320, 70378, 70384, 70393, 70400, 70403, 70405, 70412, 70415, 70416, 70419, 70440, 70442, 70448, 70450, 70451, 70453, 70457, 70459, 70468, 70471, 70472, 70475, 70477, 70480, 70480, 70487, 70487, 70493, 70499, 70502, 70508, 70512, 70516, 70656, 70730, 70736, 70745, 70750, 70753, 70784, 70853, 70855, 70855, 70864, 70873, 71040, 71093, 71096, 71104, 71128, 71133, 71168, 71232, 71236, 71236, 71248, 71257, 71296, 71352, 71360, 71369, 71424, 71450, 71453, 71467, 71472, 71481, 71488, 71494, 71680, 71738, 71840, 71913, 71935, 71942, 71945, 71945, 71948, 71955, 71957, 71958, 71960, 71989, 71991, 71992, 71995, 72003, 72016, 72025, 72096, 72103, 72106, 72151, 72154, 72161, 72163, 72164, 72192, 72254, 72263, 72263, 72272, 72345, 72349, 72349, 72368, 72440, 72704, 72712, 72714, 72758, 72760, 72768, 72784, 72793, 72818, 72847, 72850, 72871, 72873, 72886, 72960, 72966, 72968, 72969, 72971, 73014, 73018, 73018, 73020, 73021, 73023, 73031, 73040, 73049, 73056, 73061, 73063, 73064, 73066, 73102, 73104, 73105, 73107, 73112, 73120, 73129, 73440, 73462, 73472, 73488, 73490, 73530, 73534, 73538, 73552, 73561, 73648, 73648, 73728, 74649, 74752, 74862, 74880, 75075, 77712, 77808, 77824, 78895, 78912, 78933, 82944, 83526, 92160, 92728, 92736, 92766, 92768, 92777, 92784, 92862, 92864, 92873, 92880, 92909, 92912, 92916, 92928, 92982, 92992, 92995, 93008, 93017, 93027, 93047, 93053, 93071, 93760, 93823, 93952, 94026, 94031, 94087, 94095, 94111, 94176, 94177, 94179, 94180, 94192, 94193, 94208, 100343, 100352, 101589, 101632, 101640, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 113664, 113770, 113776, 113788, 113792, 113800, 113808, 113817, 113821, 113822, 118528, 118573, 118576, 118598, 119141, 119145, 119149, 119154, 119163, 119170, 119173, 119179, 119210, 119213, 119362, 119364, 119808, 119892, 119894, 119964, 119966, 119967, 119970, 119970, 119973, 119974, 119977, 119980, 119982, 119993, 119995, 119995, 119997, 120003, 120005, 120069, 120071, 120074, 120077, 120084, 120086, 120092, 120094, 120121, 120123, 120126, 120128, 120132, 120134, 120134, 120138, 120144, 120146, 120485, 120488, 120512, 120514, 120538, 120540, 120570, 120572, 120596, 120598, 120628, 120630, 120654, 120656, 120686, 120688, 120712, 120714, 120744, 120746, 120770, 120772, 120779, 120782, 120831, 121344, 121398, 121403, 121452, 121461, 121461, 121476, 121476, 121499, 121503, 121505, 121519, 122624, 122654, 122661, 122666, 122880, 122886, 122888, 122904, 122907, 122913, 122915, 122916, 122918, 122922, 122928, 122989, 123023, 123023, 123136, 123180, 123184, 123197, 123200, 123209, 123214, 123214, 123536, 123566, 123584, 123641, 124112, 124153, 124896, 124902, 124904, 124907, 124909, 124910, 124912, 124926, 124928, 125124, 125136, 125142, 125184, 125259, 125264, 125273, 126464, 126467, 126469, 126495, 126497, 126498, 126500, 126500, 126503, 126503, 126505, 126514, 126516, 126519, 126521, 126521, 126523, 126523, 126530, 126530, 126535, 126535, 126537, 126537, 126539, 126539, 126541, 126543, 126545, 126546, 126548, 126548, 126551, 126551, 126553, 126553, 126555, 126555, 126557, 126557, 126559, 126559, 126561, 126562, 126564, 126564, 126567, 126570, 126572, 126578, 126580, 126583, 126585, 126588, 126590, 126590, 126592, 126601, 126603, 126619, 126625, 126627, 126629, 126633, 126635, 126651, 130032, 130041, 131072, 173791, 173824, 177977, 177984, 178205, 178208, 183969, 183984, 191456, 191472, 192093, 194560, 195101, 196608, 201546, 201552, 205743, 917760, 917999];

const charSize = (cp: number): number => (cp > 0xffff ? 2 : 1);

// Binary search over a flattened [lo, hi, lo, hi, ...] range table.
// Faithful to scanner.go:isInUnicodeRanges (2189-2211).
function isInUnicodeRanges(cp: number, ranges: readonly number[]): boolean {
  if (cp < ranges[0]!) {
    return false;
  }
  let lo = 0;
  let hi = ranges.length;
  while (lo + 1 < hi) {
    let mid = lo + ((hi - lo) >> 1);
    mid -= mid % 2;
    if (ranges[mid]! <= cp && cp <= ranges[mid + 1]!) {
      return true;
    }
    if (cp < ranges[mid]!) {
      hi = mid;
    } else {
      lo = mid + 2;
    }
  }
  return false;
}

function isUnicodeIdentifierStart(ch: number): boolean {
  return isInUnicodeRanges(ch, unicodeESNextIdentifierStart);
}

function isUnicodeIdentifierPart(ch: number): boolean {
  return isInUnicodeRanges(ch, unicodeESNextIdentifierPart);
}

// Section 6.1.4 — scanner.go:2163-2165.
function isWordCharacter(ch: number): boolean {
  return isASCIILetter(ch) || isDigitCode(ch) || ch === 0x5f /* _ */;
}

/** scanner.go:2167-2169. */
export function isIdentifierStartCodePoint(ch: number): boolean {
  return isASCIILetter(ch) || ch === 0x5f /* _ */ || ch === 0x24 /* $ */
    || (ch >= 0x80 && isUnicodeIdentifierStart(ch));
}

/** scanner.go:2175-2179 (IsIdentifierPartEx). */
export function isIdentifierPartCodePoint(ch: number, languageVariant: LanguageVariant): boolean {
  return isWordCharacter(ch) || ch === 0x24 /* $ */
    || (ch >= 0x80 && isUnicodeIdentifierPart(ch))
    || (languageVariant === LanguageVariant.JSX && (ch === 0x2d /* - */ || ch === 0x3a /* : */));
}

// textToKeyword — faithful to scanner.go:36-122, built from KindNames so it
// tracks the AST's keyword set exactly (incl. "immediate"/"defer"). Lowercased
// stem of every "*Keyword" Kind maps to that Kind.
const textToKeyword: ReadonlyMap<string, number> = (() => {
  const m = new Map<string, number>();
  for (let i = 0; i < KindNames.length; i++) {
    const name = KindNames[i]!;
    if (name.endsWith("Keyword")) {
      const stem = name.slice(0, -"Keyword".length);
      m.set(stem.toLowerCase(), i);
    }
  }
  return m;
})();

/** scanner.go:2140-2148. */
export function getIdentifierToken(str: string): Kind {
  if (str.length >= 2 && str.length <= 12) {
    const c0 = str.charCodeAt(0);
    if (c0 >= 0x61 /* a */ && c0 <= 0x7a /* z */) {
      const keyword = textToKeyword.get(str);
      if (keyword !== undefined && keyword !== Kind.Unknown) {
        return keyword;
      }
    }
  }
  return Kind.Identifier;
}

// ---------------------------------------------------------------------------
// ScannerState — the unit captured by Mark() / restored by Rewind().
// EXACTLY the 8 tsgo fields (scanner.go:201-210), retyped Kind/TokenFlags.
// These are the narrow controlled-mutable cursor (codex-059).
// ---------------------------------------------------------------------------

export interface ScannerState {
  pos: number;
  fullStartPos: number;
  tokenStart: number;
  token: Kind;
  tokenValue: string;
  tokenFlags: TokenFlagsType;
  commentDirectives: readonly CommentDirective[] | undefined;
  skipJSDocLeadingAsterisks: number;
}

export interface LiveScannerOptions {
  readonly languageVariant?: LanguageVariant;
  readonly skipTrivia?: boolean;
  readonly onError?: ScannerErrorCallback;
}

export interface LiveScanner {
  scan(): Kind;
  nextToken(): Kind;
  getToken(): Kind;
  getTokenStart(): number;
  getTokenEnd(): number;
  getTokenFullStart(): number;
  getTokenText(): string;
  getTokenValue(): string;
  getTokenFlags(): TokenFlagsType;
  hasPrecedingLineBreak(): boolean;
  isIdentifier(): boolean;
  isReservedWord(): boolean;
  isUnterminated(): boolean;
  mark(): ScannerState;
  rewind(state: ScannerState): void;
  resetPos(pos: number): void;
  resetTokenState(pos: number): void;
  setText(text: string, start?: number, length?: number): void;
  getText(): string;
  setLanguageVariant(variant: LanguageVariant): void;
  // reScan* family (scanner.go:996-1226) — re-tokenize the current token.
  reScanLessThanToken(): Kind;
  reScanGreaterThanToken(): Kind;
  reScanTemplateToken(isTaggedTemplate: boolean): Kind;
  reScanTemplateHeadOrNoSubstitutionTemplate(): Kind;
  reScanAsteriskEqualsToken(): Kind;
  reScanSlashToken(reportErrors?: boolean): Kind;
  reScanHashToken(): Kind;
  reScanQuestionToken(): Kind;
  reScanInvalidIdentifier(): Kind;
  // JSX scan modes (scanner.go:1204-1350).
  scanJsxToken(): JsxTokenSyntaxKind;
  reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind;
  scanJsxIdentifier(): Kind;
  scanJsxAttributeValue(): Kind;
  reScanJsxAttributeValue(): Kind;
}

export function createLiveScanner(text: string, options?: LiveScannerOptions): LiveScanner {
  const onError = options?.onError;
  // The narrow controlled-mutable cursor (codex-059): one ScannerState plus
  // immutable-by-convention text/end/languageVariant/skipTrivia config.
  const state: ScannerState = {
    pos: 0,
    fullStartPos: 0,
    tokenStart: 0,
    token: Kind.Unknown,
    tokenValue: "",
    tokenFlags: TokenFlags.None,
    commentDirectives: undefined,
    skipJSDocLeadingAsterisks: 0,
  };
  const config = {
    text,
    end: text.length,
    languageVariant: options?.languageVariant ?? LanguageVariant.Standard,
    skipTrivia: options?.skipTrivia ?? true,
  };

  // --- diagnostics ---------------------------------------------------------
  function errorAt(message: DiagnosticMessage, pos: number, length: number, ...args: readonly unknown[]): void {
    if (onError !== undefined) {
      onError(message, pos, length, ...args);
    }
  }
  function error(message: DiagnosticMessage): void {
    errorAt(message, state.pos, 0);
  }

  // --- cursor (scanner.go:443-464, ported to UTF-16) -----------------------
  function char(): number {
    return state.pos < config.end ? config.text.charCodeAt(state.pos) : -1;
  }
  function charAt(offset: number): number {
    return state.pos + offset < config.end ? config.text.charCodeAt(state.pos + offset) : -1;
  }
  // codePointAt-based decode of a possibly-astral code point at pos.
  function charAndSize(): { ch: number; size: number } {
    if (state.pos >= config.end) {
      return { ch: -1, size: 0 };
    }
    const cp = config.text.codePointAt(state.pos)!;
    return { ch: cp, size: charSize(cp) };
  }



  // --- identifiers (scanner.go:1506-1565) ----------------------------------
  function scanIdentifier(prefixLength: number): boolean {
    const start = state.pos;
    state.pos += prefixLength;
    let ch = char();
    // Fast path for simple ASCII identifiers.
    if (isASCIILetter(ch) || ch === 0x5f /* _ */ || ch === 0x24 /* $ */) {
      for (;;) {
        state.pos++;
        ch = char();
        if (!(isWordCharacter(ch) || ch === 0x24 /* $ */)) {
          break;
        }
      }
      if (ch < 0x80 && ch !== 0x5c /* \ */) {
        state.tokenValue = config.text.slice(start, state.pos);
        return true;
      }
      state.pos = start + prefixLength;
    }
    const cs = charAndSize();
    if (isIdentifierStartCodePoint(cs.ch)) {
      let size = cs.size;
      for (;;) {
        state.pos += size;
        const next = charAndSize();
        size = next.size;
        if (!isIdentifierPartCodePoint(next.ch, config.languageVariant)) {
          state.tokenValue = config.text.slice(start, state.pos);
          if (next.ch === 0x5c /* \ */) {
            state.tokenValue += scanIdentifierParts();
          }
          return true;
        }
      }
    }
    return false;
  }

  function scanIdentifierParts(): string {
    let sb = "";
    let start = state.pos;
    for (;;) {
      const cs = charAndSize();
      if (isIdentifierPartCodePoint(cs.ch, config.languageVariant)) {
        state.pos += cs.size;
        continue;
      }
      if (cs.ch === 0x5c /* \ */) {
        const escaped = peekUnicodeEscape();
        if (escaped >= 0 && isIdentifierPartCodePoint(escaped, config.languageVariant)) {
          sb += config.text.slice(start, state.pos);
          sb += String.fromCodePoint(scanUnicodeEscape(true));
          start = state.pos;
          continue;
        }
      }
      break;
    }
    sb += config.text.slice(start, state.pos);
    return sb;
  }

  // --- strings (scanner.go:1567-1616) --------------------------------------
  function scanString(jsxAttributeString: boolean): string {
    const quote = char();
    if (quote === 0x27 /* ' */) {
      state.tokenFlags |= TokenFlags.SingleQuote;
    }
    state.pos++;
    // Fast path for simple strings without escape sequences.
    const quoteChar = String.fromCharCode(quote);
    const idx = config.text.indexOf(quoteChar, state.pos);
    const strLen = idx < 0 ? -1 : idx - state.pos;
    if (strLen === 0) {
      state.pos++;
      return "";
    }
    if (strLen > 0) {
      const str = config.text.slice(state.pos, state.pos + strLen);
      if (!jsxAttributeString && !/[\r\n\\]/.test(str)) {
        state.pos += strLen + 1;
        return str;
      }
    }
    let sb = "";
    let start = state.pos;
    for (;;) {
      const ch = char();
      if (ch < 0) {
        sb += config.text.slice(start, state.pos);
        state.tokenFlags |= TokenFlags.Unterminated;
        error(Diagnostics.Unterminated_string_literal);
        break;
      }
      if (ch === quote) {
        sb += config.text.slice(start, state.pos);
        state.pos++;
        break;
      }
      if (ch === 0x5c /* \ */ && !jsxAttributeString) {
        sb += config.text.slice(start, state.pos);
        sb += scanEscapeSequence(EscapeSequenceScanningFlags.String | EscapeSequenceScanningFlags.ReportErrors);
        start = state.pos;
        continue;
      }
      if ((ch === 0x0a /* \n */ || ch === 0x0d /* \r */) && !jsxAttributeString) {
        sb += config.text.slice(start, state.pos);
        state.tokenFlags |= TokenFlags.Unterminated;
        error(Diagnostics.Unterminated_string_literal);
        break;
      }
      state.pos++;
    }
    return sb;
  }

  // --- templates (scanner.go:1618-1665) ------------------------------------
  function scanTemplateAndSetTokenValue(shouldEmitInvalidEscapeError: boolean): Kind {
    const startedWithBacktick = char() === 0x60 /* ` */;
    state.pos++;
    let start = state.pos;
    const parts: string[] = [];
    let token: Kind;
    for (;;) {
      const ch = char();
      if (ch < 0 || ch === 0x60 /* ` */) {
        parts.push(config.text.slice(start, state.pos));
        if (ch === 0x60 /* ` */) {
          state.pos++;
        } else {
          state.tokenFlags |= TokenFlags.Unterminated;
          error(Diagnostics.Unterminated_template_literal);
        }
        token = startedWithBacktick ? Kind.NoSubstitutionTemplateLiteral : Kind.TemplateTail;
        break;
      }
      if (ch === 0x24 /* $ */ && charAt(1) === 0x7b /* { */) {
        parts.push(config.text.slice(start, state.pos));
        state.pos += 2;
        token = startedWithBacktick ? Kind.TemplateHead : Kind.TemplateMiddle;
        break;
      }
      if (ch === 0x5c /* \ */) {
        parts.push(config.text.slice(start, state.pos));
        parts.push(scanEscapeSequence(
          EscapeSequenceScanningFlags.String | (shouldEmitInvalidEscapeError ? EscapeSequenceScanningFlags.ReportErrors : 0),
        ));
        start = state.pos;
        continue;
      }
      // <CR><LF> and <CR> normalized to <LF> for template values.
      if (ch === 0x0d /* \r */) {
        parts.push(config.text.slice(start, state.pos));
        state.pos++;
        if (char() === 0x0a /* \n */) {
          state.pos++;
        }
        parts.push("\n");
        start = state.pos;
        continue;
      }
      state.pos++;
    }
    state.tokenValue = parts.join("");
    return token;
  }

  // --- escape sequences (scanner.go:1667-1808) -----------------------------
  function scanEscapeSequence(flags: number): string {
    const start = state.pos;
    state.pos++;
    let ch = char();
    if (ch < 0) {
      error(Diagnostics.Unexpected_end_of_text);
      return "";
    }
    state.pos++;
    switch (ch) {
      case 0x30 /* 0 */:
        // '\08' is '\0' + '8'; '\0' alone is NUL.
        if (!isDigitCode(char())) {
          return "\x00";
        }
        // fallthrough — '\01', '\011'
        if (isOctalDigitCode(char())) {
          state.pos++;
        }
        if (isOctalDigitCode(char())) {
          state.pos++;
        }
        state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          errorAt(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, state.pos - start);
          return String.fromCodePoint(parseInt(config.text.slice(start + 1, state.pos), 8));
        }
        return config.text.slice(start, state.pos);
      case 0x31 /* 1 */:
      case 0x32 /* 2 */:
      case 0x33 /* 3 */:
        if (isOctalDigitCode(char())) {
          state.pos++;
        }
        if (isOctalDigitCode(char())) {
          state.pos++;
        }
        state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          errorAt(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, state.pos - start);
          return String.fromCodePoint(parseInt(config.text.slice(start + 1, state.pos), 8));
        }
        return config.text.slice(start, state.pos);
      case 0x34 /* 4 */:
      case 0x35 /* 5 */:
      case 0x36 /* 6 */:
      case 0x37 /* 7 */:
        if (isOctalDigitCode(char())) {
          state.pos++;
        }
        state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          errorAt(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, state.pos - start);
          return String.fromCodePoint(parseInt(config.text.slice(start + 1, state.pos), 8));
        }
        return config.text.slice(start, state.pos);
      case 0x38 /* 8 */:
      case 0x39 /* 9 */:
        state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
          errorAt(Diagnostics.Escape_sequence_0_is_not_allowed, start, state.pos - start, config.text.slice(start, state.pos));
          return String.fromCharCode(ch);
        }
        return config.text.slice(start, state.pos);
      case 0x62 /* b */:
        return "\b";
      case 0x74 /* t */:
        return "\t";
      case 0x6e /* n */:
        return "\n";
      case 0x76 /* v */:
        return "\v";
      case 0x66 /* f */:
        return "\f";
      case 0x72 /* r */:
        return "\r";
      case 0x27 /* ' */:
        return "'";
      case 0x22 /* " */:
        return "\"";
      case 0x75 /* u */: {
        const extended = char() === 0x7b /* { */;
        state.pos -= 2;
        const codePoint = scanUnicodeEscape((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0);
        if (extended) {
          if ((flags & EscapeSequenceScanningFlags.AllowExtendedUnicodeEscape) === 0) {
            state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
            if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
              errorAt(
                Diagnostics.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set,
                start,
                state.pos - start,
              );
            }
          }
          if (codePoint < 0) {
            return config.text.slice(start, state.pos);
          }
          return String.fromCodePoint(codePoint);
        }
        if (codePoint < 0) {
          return config.text.slice(start, state.pos);
        }
        if (
          codePointIsHighSurrogate(codePoint)
          && ((flags & EscapeSequenceScanningFlags.RegularExpression) === 0 || (flags & EscapeSequenceScanningFlags.AnyUnicodeMode) !== 0)
          && char() === 0x5c /* \ */ && charAt(1) === 0x75 /* u */ && charAt(2) !== 0x7b /* { */
        ) {
          const savedPos = state.pos;
          const nextCodePoint = scanUnicodeEscape((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0);
          if (codePointIsLowSurrogate(nextCodePoint)) {
            return String.fromCodePoint(surrogatePairToCodepoint(codePoint, nextCodePoint));
          }
          state.pos = savedPos;
          if ((flags & EscapeSequenceScanningFlags.RegularExpression) !== 0) {
            return encodeSurrogate(codePoint);
          }
        } else if (
          (codePointIsHighSurrogate(codePoint) || codePointIsLowSurrogate(codePoint))
          && (flags & EscapeSequenceScanningFlags.RegularExpression) !== 0
        ) {
          return encodeSurrogate(codePoint);
        }
        return String.fromCodePoint(codePoint);
      }
      case 0x78 /* x */:
        while (state.pos < start + 4) {
          if (!isHexDigitCode(char())) {
            state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
            if ((flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) !== 0) {
              error(Diagnostics.Hexadecimal_digit_expected);
            }
            return config.text.slice(start, state.pos);
          }
          state.pos++;
        }
        state.tokenFlags |= TokenFlags.HexEscape;
        return String.fromCodePoint(parseInt(config.text.slice(start + 2, state.pos), 16));
      case 0x0d /* \r */:
        if (char() === 0x0a /* \n */) {
          state.pos++;
        }
        // fallthrough
        return "";
      case 0x0a /* \n */:
        return "";
      default:
        if (
          (flags & EscapeSequenceScanningFlags.AnyUnicodeMode) !== 0
          || ((flags & EscapeSequenceScanningFlags.RegularExpression) !== 0
            && (flags & EscapeSequenceScanningFlags.AnnexB) === 0
            && isIdentifierPartCodePoint(ch, config.languageVariant))
        ) {
          errorAt(Diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, state.pos - 2, 2);
        }
        return String.fromCodePoint(ch);
    }
  }

  // Known to be at \u — scanner.go:1811-1859.
  function scanUnicodeEscape(shouldEmitInvalidEscapeError: boolean): number {
    state.pos += 2;
    const start = state.pos;
    const extended = char() === 0x7b /* { */;
    let hexDigits: string;
    if (extended) {
      state.pos++;
      hexDigits = scanHexDigits(1, true, false);
    } else {
      state.tokenFlags |= TokenFlags.UnicodeEscape;
      hexDigits = scanHexDigits(4, false, false);
    }
    if (hexDigits === "") {
      state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
      if (shouldEmitInvalidEscapeError) {
        error(Diagnostics.Hexadecimal_digit_expected);
      }
      return -1;
    }
    const hexValue = parseInt(hexDigits, 16);
    if (extended) {
      let isInvalidExtendedEscape = false;
      if (hexValue > 0x10ffff) {
        if (shouldEmitInvalidEscapeError) {
          errorAt(
            Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive,
            start + 1,
            state.pos - start - 1,
          );
        }
        isInvalidExtendedEscape = true;
      }
      if (state.pos >= config.end) {
        if (shouldEmitInvalidEscapeError) {
          error(Diagnostics.Unexpected_end_of_text);
        }
        isInvalidExtendedEscape = true;
      } else if (char() === 0x7d /* } */) {
        state.pos++;
      } else {
        if (shouldEmitInvalidEscapeError) {
          error(Diagnostics.Unterminated_Unicode_escape_sequence);
        }
        isInvalidExtendedEscape = true;
      }
      if (isInvalidExtendedEscape) {
        state.tokenFlags |= TokenFlags.ContainsInvalidEscape;
        return -1;
      }
      state.tokenFlags |= TokenFlags.ExtendedUnicodeEscape;
    }
    return hexValue;
  }

  // scanner.go:1863-1873.
  function peekUnicodeEscape(): number {
    if (charAt(1) === 0x75 /* u */) {
      const savePos = state.pos;
      const saveTokenFlags = state.tokenFlags;
      const codePoint = scanUnicodeEscape(false);
      state.pos = savePos;
      state.tokenFlags = saveTokenFlags;
      return codePoint;
    }
    return -1;
  }

  // --- numbers (scanner.go:1875-2131) --------------------------------------
  function scanNumber(): Kind {
    let start = state.pos;
    let fixedPart = "";
    if (char() === 0x30 /* 0 */) {
      state.pos++;
      if (char() === 0x5f /* _ */) {
        state.tokenFlags |= TokenFlags.ContainsSeparator | TokenFlags.ContainsInvalidSeparator;
        errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos, 1);
        state.pos = start;
        fixedPart = scanNumberFragment();
      } else {
        const digitsResult = scanDigits();
        if (digitsResult.digits === "") {
          fixedPart = "0";
        } else if (!digitsResult.isOctal) {
          state.tokenFlags |= TokenFlags.ContainsLeadingZero;
          fixedPart = digitsResult.digits;
        } else {
          const val = parseInt(digitsResult.digits, 8);
          state.tokenValue = val.toString(10);
          state.tokenFlags |= TokenFlags.Octal;
          const withMinus = state.token === Kind.MinusToken;
          const literal = (withMinus ? "-" : "") + "0o" + val.toString(8);
          if (withMinus) {
            start--;
          }
          errorAt(Diagnostics.Octal_literals_are_not_allowed_Use_the_syntax_0, start, state.pos - start, literal);
          return Kind.NumericLiteral;
        }
      }
    } else {
      fixedPart = scanNumberFragment();
    }
    const fixedPartEnd = state.pos;
    let fractionalPart = "";
    let exponentPreamble = "";
    let exponentPart = "";
    if (char() === 0x2e /* . */) {
      state.pos++;
      fractionalPart = scanNumberFragment();
    }
    let end = state.pos;
    if (char() === 0x45 /* E */ || char() === 0x65 /* e */) {
      state.pos++;
      state.tokenFlags |= TokenFlags.Scientific;
      if (char() === 0x2b /* + */ || char() === 0x2d /* - */) {
        state.pos++;
      }
      const startNumericPart = state.pos;
      exponentPart = scanNumberFragment();
      if (exponentPart === "") {
        error(Diagnostics.Digit_expected);
      } else {
        exponentPreamble = config.text.slice(end, startNumericPart);
        end = state.pos;
      }
    }
    if ((state.tokenFlags & TokenFlags.ContainsSeparator) !== 0) {
      state.tokenValue = fixedPart;
      if (fractionalPart !== "") {
        state.tokenValue += "." + fractionalPart;
      }
      if (exponentPart !== "") {
        state.tokenValue += exponentPreamble + exponentPart;
      }
    } else {
      state.tokenValue = config.text.slice(start, end);
    }
    if ((state.tokenFlags & TokenFlags.ContainsLeadingZero) !== 0) {
      errorAt(Diagnostics.Decimals_with_leading_zeros_are_not_allowed, start, state.pos - start);
      state.tokenValue = jsnumToString(jsnumFromString(state.tokenValue));
      return Kind.NumericLiteral;
    }
    let result: Kind;
    if (fixedPartEnd === state.pos) {
      result = scanBigIntSuffix();
    } else {
      state.tokenValue = jsnumToString(jsnumFromString(state.tokenValue));
      result = Kind.NumericLiteral;
    }
    const cs = charAndSize();
    if (isIdentifierStartCodePoint(cs.ch)) {
      const idStart = state.pos;
      const id = scanIdentifierParts();
      if (result !== Kind.BigIntLiteral && id.length === 1 && config.text.charCodeAt(idStart) === 0x6e /* n */) {
        if ((state.tokenFlags & TokenFlags.Scientific) !== 0) {
          errorAt(Diagnostics.A_bigint_literal_cannot_use_exponential_notation, start, state.pos - start);
          return result;
        }
        if (fixedPartEnd < idStart) {
          errorAt(Diagnostics.A_bigint_literal_must_be_an_integer, start, state.pos - start);
          return result;
        }
      }
      errorAt(Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, idStart, state.pos - idStart);
      state.pos = idStart;
    }
    return result;
  }

  function scanNumberFragment(): string {
    let start = state.pos;
    let allowSeparator = false;
    let isPreviousTokenSeparator = false;
    let result = "";
    for (;;) {
      const ch = char();
      if (ch === 0x5f /* _ */) {
        state.tokenFlags |= TokenFlags.ContainsSeparator;
        if (allowSeparator) {
          allowSeparator = false;
          isPreviousTokenSeparator = true;
          result += config.text.slice(start, state.pos);
        } else {
          state.tokenFlags |= TokenFlags.ContainsInvalidSeparator;
          if (isPreviousTokenSeparator) {
            errorAt(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, state.pos, 1);
          } else {
            errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos, 1);
          }
        }
        state.pos++;
        start = state.pos;
        continue;
      }
      if (isDigitCode(ch)) {
        allowSeparator = true;
        isPreviousTokenSeparator = false;
        state.pos++;
        continue;
      }
      break;
    }
    if (isPreviousTokenSeparator) {
      state.tokenFlags |= TokenFlags.ContainsInvalidSeparator;
      errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos - 1, 1);
    }
    result += config.text.slice(start, state.pos);
    return result;
  }

  function scanDigits(): { digits: string; isOctal: boolean } {
    const start = state.pos;
    let isOctal = true;
    while (isDigitCode(char())) {
      if (!isOctalDigitCode(char())) {
        isOctal = false;
      }
      state.pos++;
    }
    return { digits: config.text.slice(start, state.pos), isOctal };
  }

  function scanHexDigits(minCount: number, scanAsManyAsPossible: boolean, canHaveSeparators: boolean): string {
    let digitCount = 0;
    const start = state.pos;
    let allowSeparator = false;
    let isPreviousTokenSeparator = false;
    while (digitCount < minCount || scanAsManyAsPossible) {
      const ch = char();
      if (isHexDigitCode(ch)) {
        allowSeparator = canHaveSeparators;
        isPreviousTokenSeparator = false;
        digitCount++;
      } else if (canHaveSeparators && ch === 0x5f /* _ */) {
        state.tokenFlags |= TokenFlags.ContainsSeparator;
        if (allowSeparator) {
          allowSeparator = false;
          isPreviousTokenSeparator = true;
        } else if (isPreviousTokenSeparator) {
          errorAt(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, state.pos, 1);
        } else {
          errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos, 1);
        }
      } else {
        break;
      }
      state.pos++;
    }
    if (isPreviousTokenSeparator) {
      errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos - 1, 1);
    }
    if (digitCount < minCount) {
      return "";
    }
    let digits = config.text.slice(start, state.pos);
    if ((state.tokenFlags & TokenFlags.ContainsSeparator) !== 0) {
      digits = digits.split("_").join("");
    }
    return digits.toLowerCase();
  }

  function scanBinaryOrOctalDigits(base: number): string {
    let sb = "";
    let allowSeparator = false;
    let isPreviousTokenSeparator = false;
    for (;;) {
      const ch = char();
      if (isDigitCode(ch) && ch - 0x30 < base) {
        sb += String.fromCharCode(ch);
        allowSeparator = true;
        isPreviousTokenSeparator = false;
      } else if (ch === 0x5f /* _ */) {
        state.tokenFlags |= TokenFlags.ContainsSeparator;
        if (allowSeparator) {
          allowSeparator = false;
          isPreviousTokenSeparator = true;
        } else if (isPreviousTokenSeparator) {
          errorAt(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, state.pos, 1);
        } else {
          errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos, 1);
        }
      } else {
        break;
      }
      state.pos++;
    }
    if (isPreviousTokenSeparator) {
      errorAt(Diagnostics.Numeric_separators_are_not_allowed_here, state.pos - 1, 1);
    }
    return sb;
  }

  function scanBigIntSuffix(): Kind {
    if (char() === 0x6e /* n */) {
      state.tokenValue += "n";
      if ((state.tokenFlags & TokenFlags.BinaryOrOctalSpecifier) !== 0) {
        state.tokenValue = parsePseudoBigInt(state.tokenValue) + "n";
      }
      state.pos++;
      return Kind.BigIntLiteral;
    }
    state.tokenValue = jsnumToString(jsnumFromString(state.tokenValue));
    return Kind.NumericLiteral;
  }

  function scanInvalidCharacter(): void {
    const cs = charAndSize();
    errorAt(Diagnostics.Invalid_character, state.pos, cs.size);
    state.pos += cs.size;
    state.token = Kind.Unknown;
  }

  // --- scan() tokenizer state machine (scanner.go:466-953) -----------------
  function scan(): Kind {
    state.fullStartPos = state.pos;
    state.tokenFlags = TokenFlags.None;
    for (;;) {
      state.tokenStart = state.pos;
      const ch = char();

      switch (ch) {
        case 0x09 /* \t */:
        case 0x0b /* \v */:
        case 0x0c /* \f */:
        case 0x20 /* space */: {
          state.pos++;
          if (config.skipTrivia) {
            continue;
          }
          for (;;) {
            const cs = charAndSize();
            if (!isWhiteSpaceSingleLine(cs.ch)) {
              break;
            }
            state.pos += cs.size;
          }
          state.token = Kind.WhitespaceTrivia;
          break;
        }
        case 0x0a /* \n */:
        case 0x0d /* \r */: {
          state.tokenFlags |= TokenFlags.PrecedingLineBreak;
          if (config.skipTrivia) {
            state.pos++;
            continue;
          }
          if (ch === 0x0d /* \r */ && charAt(1) === 0x0a /* \n */) {
            state.pos += 2;
          } else {
            state.pos++;
          }
          state.token = Kind.NewLineTrivia;
          break;
        }
        case 0x21 /* ! */:
          if (charAt(1) === 0x3d /* = */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.ExclamationEqualsEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.ExclamationEqualsToken;
            }
          } else {
            state.pos++;
            state.token = Kind.ExclamationToken;
          }
          break;
        case 0x22 /* " */:
        case 0x27 /* ' */:
          state.tokenValue = scanString(false);
          state.token = Kind.StringLiteral;
          break;
        case 0x60 /* ` */:
          state.token = scanTemplateAndSetTokenValue(false);
          break;
        case 0x25 /* % */:
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.PercentEqualsToken;
          } else {
            state.pos++;
            state.token = Kind.PercentToken;
          }
          break;
        case 0x26 /* & */:
          if (charAt(1) === 0x26 /* & */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.AmpersandAmpersandEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.AmpersandAmpersandToken;
            }
          } else if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.AmpersandEqualsToken;
          } else {
            state.pos++;
            state.token = Kind.AmpersandToken;
          }
          break;
        case 0x28 /* ( */:
          state.pos++;
          state.token = Kind.OpenParenToken;
          break;
        case 0x29 /* ) */:
          state.pos++;
          state.token = Kind.CloseParenToken;
          break;
        case 0x2a /* * */:
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.AsteriskEqualsToken;
          } else if (charAt(1) === 0x2a /* * */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.AsteriskAsteriskEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.AsteriskAsteriskToken;
            }
          } else {
            state.pos++;
            if (
              state.skipJSDocLeadingAsterisks !== 0
              && (state.tokenFlags & TokenFlags.PrecedingJSDocLeadingAsterisks) === 0
              && (state.tokenFlags & TokenFlags.PrecedingLineBreak) !== 0
            ) {
              state.tokenFlags |= TokenFlags.PrecedingJSDocLeadingAsterisks;
              continue;
            }
            state.token = Kind.AsteriskToken;
          }
          break;
        case 0x2b /* + */:
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.PlusEqualsToken;
          } else if (charAt(1) === 0x2b /* + */) {
            state.pos += 2;
            state.token = Kind.PlusPlusToken;
          } else {
            state.pos++;
            state.token = Kind.PlusToken;
          }
          break;
        case 0x2c /* , */:
          state.pos++;
          state.token = Kind.CommaToken;
          break;
        case 0x2d /* - */:
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.MinusEqualsToken;
          } else if (charAt(1) === 0x2d /* - */) {
            state.pos += 2;
            state.token = Kind.MinusMinusToken;
          } else {
            state.pos++;
            state.token = Kind.MinusToken;
          }
          break;
        case 0x2e /* . */:
          if (isDigitCode(charAt(1))) {
            state.token = scanNumber();
          } else if (charAt(1) === 0x2e /* . */ && charAt(2) === 0x2e /* . */) {
            state.pos += 3;
            state.token = Kind.DotDotDotToken;
          } else {
            state.pos++;
            state.token = Kind.DotToken;
          }
          break;
        case 0x2f /* / */: {
          // Single-line comment.
          if (charAt(1) === 0x2f /* / */) {
            state.pos += 2;
            for (;;) {
              const cs = charAndSize();
              if (cs.size === 0 || isLineBreakCode(cs.ch)) {
                break;
              }
              state.pos += cs.size;
            }
            if (config.skipTrivia) {
              continue;
            }
            state.token = Kind.SingleLineCommentTrivia;
            return state.token;
          }
          // Multi-line comment.
          if (charAt(1) === 0x2a /* * */) {
            state.pos += 2;
            let commentClosed = false;
            for (;;) {
              const cs = charAndSize();
              if (cs.size === 0) {
                break;
              }
              if (cs.ch === 0x2a /* * */ && charAt(1) === 0x2f /* / */) {
                state.pos += 2;
                commentClosed = true;
                break;
              }
              state.pos += cs.size;
              if (isLineBreakCode(cs.ch)) {
                state.tokenFlags |= TokenFlags.PrecedingLineBreak;
              }
            }
            if (!commentClosed) {
              error(Diagnostics.Asterisk_Slash_expected);
            }
            if (config.skipTrivia) {
              continue;
            }
            if (!commentClosed) {
              state.tokenFlags |= TokenFlags.Unterminated;
            }
            state.token = Kind.MultiLineCommentTrivia;
            return state.token;
          }
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.SlashEqualsToken;
          } else {
            state.pos++;
            state.token = Kind.SlashToken;
          }
          break;
        }
        case 0x30 /* 0 */:
          if (charAt(1) === 0x58 /* X */ || charAt(1) === 0x78 /* x */) {
            const hexStart = state.pos;
            state.pos += 2;
            let digits = scanHexDigits(1, true, true);
            if (digits === "") {
              error(Diagnostics.Hexadecimal_digit_expected);
              digits = "0";
            }
            const rawText = config.text.slice(hexStart, state.pos);
            if (rawText.startsWith("0x") && rawText.slice(2) === digits) {
              state.tokenValue = rawText;
            } else {
              state.tokenValue = "0x" + digits;
            }
            state.tokenFlags |= TokenFlags.HexSpecifier;
            state.token = scanBigIntSuffix();
            break;
          }
          if (charAt(1) === 0x42 /* B */ || charAt(1) === 0x62 /* b */) {
            state.pos += 2;
            let digits = scanBinaryOrOctalDigits(2);
            if (digits === "") {
              error(Diagnostics.Binary_digit_expected);
              digits = "0";
            }
            state.tokenValue = "0b" + digits;
            state.tokenFlags |= TokenFlags.BinarySpecifier;
            state.token = scanBigIntSuffix();
            break;
          }
          if (charAt(1) === 0x4f /* O */ || charAt(1) === 0x6f /* o */) {
            state.pos += 2;
            let digits = scanBinaryOrOctalDigits(8);
            if (digits === "") {
              error(Diagnostics.Octal_digit_expected);
              digits = "0";
            }
            state.tokenValue = "0o" + digits;
            state.tokenFlags |= TokenFlags.OctalSpecifier;
            state.token = scanBigIntSuffix();
            break;
          }
          state.token = scanNumber();
          break;
        case 0x31 /* 1 */:
        case 0x32 /* 2 */:
        case 0x33 /* 3 */:
        case 0x34 /* 4 */:
        case 0x35 /* 5 */:
        case 0x36 /* 6 */:
        case 0x37 /* 7 */:
        case 0x38 /* 8 */:
        case 0x39 /* 9 */:
          state.token = scanNumber();
          break;
        case 0x3a /* : */:
          state.pos++;
          state.token = Kind.ColonToken;
          break;
        case 0x3b /* ; */:
          state.pos++;
          state.token = Kind.SemicolonToken;
          break;
        case 0x3c /* < */:
          if (isConflictMarkerTrivia(config.text, state.pos)) {
            state.pos = scanConflictMarkerTrivia(config.text, state.pos, onError);
            if (config.skipTrivia) {
              continue;
            }
            state.token = Kind.ConflictMarkerTrivia;
            return state.token;
          }
          if (charAt(1) === 0x3c /* < */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.LessThanLessThanEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.LessThanLessThanToken;
            }
          } else if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.LessThanEqualsToken;
          } else if (config.languageVariant === LanguageVariant.JSX && charAt(1) === 0x2f /* / */ && charAt(2) !== 0x2a /* * */) {
            state.pos += 2;
            state.token = Kind.LessThanSlashToken;
          } else {
            state.pos++;
            state.token = Kind.LessThanToken;
          }
          break;
        case 0x3d /* = */:
          if (isConflictMarkerTrivia(config.text, state.pos)) {
            state.pos = scanConflictMarkerTrivia(config.text, state.pos, onError);
            if (config.skipTrivia) {
              continue;
            }
            state.token = Kind.ConflictMarkerTrivia;
            return state.token;
          }
          if (charAt(1) === 0x3d /* = */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.EqualsEqualsEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.EqualsEqualsToken;
            }
          } else if (charAt(1) === 0x3e /* > */) {
            state.pos += 2;
            state.token = Kind.EqualsGreaterThanToken;
          } else {
            state.pos++;
            state.token = Kind.EqualsToken;
          }
          break;
        case 0x3e /* > */:
          if (isConflictMarkerTrivia(config.text, state.pos)) {
            state.pos = scanConflictMarkerTrivia(config.text, state.pos, onError);
            if (config.skipTrivia) {
              continue;
            }
            state.token = Kind.ConflictMarkerTrivia;
            return state.token;
          }
          state.pos++;
          state.token = Kind.GreaterThanToken;
          break;
        case 0x3f /* ? */:
          if (charAt(1) === 0x2e /* . */ && !isDigitCode(charAt(2))) {
            state.pos += 2;
            state.token = Kind.QuestionDotToken;
          } else if (charAt(1) === 0x3f /* ? */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.QuestionQuestionEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.QuestionQuestionToken;
            }
          } else {
            state.pos++;
            state.token = Kind.QuestionToken;
          }
          break;
        case 0x5b /* [ */:
          state.pos++;
          state.token = Kind.OpenBracketToken;
          break;
        case 0x5d /* ] */:
          state.pos++;
          state.token = Kind.CloseBracketToken;
          break;
        case 0x5e /* ^ */:
          if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.CaretEqualsToken;
          } else {
            state.pos++;
            state.token = Kind.CaretToken;
          }
          break;
        case 0x7b /* { */:
          state.pos++;
          state.token = Kind.OpenBraceToken;
          break;
        case 0x7c /* | */:
          if (isConflictMarkerTrivia(config.text, state.pos)) {
            state.pos = scanConflictMarkerTrivia(config.text, state.pos, onError);
            if (config.skipTrivia) {
              continue;
            }
            state.token = Kind.ConflictMarkerTrivia;
            return state.token;
          }
          if (charAt(1) === 0x7c /* | */) {
            if (charAt(2) === 0x3d /* = */) {
              state.pos += 3;
              state.token = Kind.BarBarEqualsToken;
            } else {
              state.pos += 2;
              state.token = Kind.BarBarToken;
            }
          } else if (charAt(1) === 0x3d /* = */) {
            state.pos += 2;
            state.token = Kind.BarEqualsToken;
          } else {
            state.pos++;
            state.token = Kind.BarToken;
          }
          break;
        case 0x7d /* } */:
          state.pos++;
          state.token = Kind.CloseBraceToken;
          break;
        case 0x7e /* ~ */:
          state.pos++;
          state.token = Kind.TildeToken;
          break;
        case 0x40 /* @ */:
          state.pos++;
          state.token = Kind.AtToken;
          break;
        case 0x5c /* \ */: {
          const cp = peekUnicodeEscape();
          if (cp >= 0 && isIdentifierStartCodePoint(cp)) {
            state.tokenValue = String.fromCodePoint(scanUnicodeEscape(true)) + scanIdentifierParts();
            state.token = getIdentifierToken(state.tokenValue);
          } else {
            scanInvalidCharacter();
          }
          break;
        }
        case 0x23 /* # */: {
          if (charAt(1) === 0x21 /* ! */) {
            if (state.pos === 0) {
              state.pos += 2;
              for (;;) {
                const cs = charAndSize();
                if (cs.size === 0 || isLineBreakCode(cs.ch)) {
                  break;
                }
                state.pos += cs.size;
              }
              continue;
            }
            errorAt(Diagnostics.X_can_only_be_used_at_the_start_of_a_file, state.pos, 2);
            state.pos++;
            state.token = Kind.Unknown;
            break;
          }
          if (charAt(1) === 0x5c /* \ */) {
            state.pos++;
            const cp = peekUnicodeEscape();
            if (cp >= 0 && isIdentifierStartCodePoint(cp)) {
              state.tokenValue = "#" + String.fromCodePoint(scanUnicodeEscape(true)) + scanIdentifierParts();
              state.token = Kind.PrivateIdentifier;
              break;
            }
            state.pos--;
          }
          if (!scanIdentifier(1)) {
            errorAt(Diagnostics.Invalid_character, state.pos - 1, 1);
            state.tokenValue = "#";
          }
          state.token = Kind.PrivateIdentifier;
          break;
        }
        default: {
          if (ch < 0) {
            state.token = Kind.EndOfFile;
            break;
          }
          if (scanIdentifier(0)) {
            state.token = getIdentifierToken(state.tokenValue);
            break;
          }
          const cs = charAndSize();
          if (isWhiteSpaceSingleLine(cs.ch)) {
            state.pos += cs.size;
            // If not 0x0085 (nextLine), this is non-ASCII whitespace; handle
            // skipTrivia like the space case above.
            if (cs.ch === 0x0085 || config.skipTrivia) {
              continue;
            }
            for (;;) {
              const next = charAndSize();
              if (!isWhiteSpaceSingleLine(next.ch)) {
                break;
              }
              state.pos += next.size;
            }
            state.token = Kind.WhitespaceTrivia;
            return state.token;
          }
          if (isLineBreakCode(cs.ch)) {
            state.tokenFlags |= TokenFlags.PrecedingLineBreak;
            state.pos += cs.size;
            continue;
          }
          scanInvalidCharacter();
          break;
        }
      }
      return state.token;
    }
  }

  // nextToken — TSTS-side convenience forwarding to scan() (tsgo parser calls
  // Scan() directly; nextToken keeps parser usage readable).
  function nextToken(): Kind {
    return scan();
  }

  // -------------------------------------------------------------------------
  // reScan* family (scanner.go:996-1226) — parser-requested re-tokenization of
  // the CURRENT token. Each MUTATES the shared ScannerState in place and
  // returns state.token, re-reading from state.tokenStart (or fullStartPos for
  // JSX) via the existing char()/charAt()/charAndSize() cursor. No speculation.
  // -------------------------------------------------------------------------

  // scanner.go:996-1002. Splits a `<<` back into a single `<`.
  function reScanLessThanToken(): Kind {
    if (state.token === Kind.LessThanLessThanToken) {
      state.pos = state.tokenStart + 1;
      state.token = Kind.LessThanToken;
    }
    return state.token;
  }

  // scanner.go:1004-1029. Splits a `>` token forward into >>, >>>, >=, >>=, >>>=.
  function reScanGreaterThanToken(): Kind {
    if (state.token === Kind.GreaterThanToken) {
      state.pos = state.tokenStart + 1;
      if (char() === 0x3e /* > */) {
        if (charAt(1) === 0x3e /* > */) {
          if (charAt(2) === 0x3d /* = */) {
            state.pos += 3;
            state.token = Kind.GreaterThanGreaterThanGreaterThanEqualsToken;
          } else {
            state.pos += 2;
            state.token = Kind.GreaterThanGreaterThanGreaterThanToken;
          }
        } else if (charAt(1) === 0x3d /* = */) {
          state.pos += 2;
          state.token = Kind.GreaterThanGreaterThanEqualsToken;
        } else {
          state.pos++;
          state.token = Kind.GreaterThanGreaterThanToken;
        }
      } else if (char() === 0x3d /* = */) {
        state.pos++;
        state.token = Kind.GreaterThanEqualsToken;
      }
    }
    return state.token;
  }

  // scanner.go:1031-1035. Re-reads a template continuation/start from tokenStart
  // so a `}`-started TemplateMiddle/Tail or a backtick head/no-substitution is
  // rescanned with the correct head/tail kind.
  function reScanTemplateToken(isTaggedTemplate: boolean): Kind {
    state.pos = state.tokenStart;
    state.token = scanTemplateAndSetTokenValue(!isTaggedTemplate);
    return state.token;
  }

  // scanner.go:1037-1044. tsgo PANICS if the current token is not `*=`; ported
  // as a thrown Error to stay faithful (NOT the unconditional native-preview
  // form). Splits `*=` into `=`.
  function reScanAsteriskEqualsToken(): Kind {
    if (state.token !== Kind.AsteriskEqualsToken) {
      throw new Error("'ReScanAsteriskEqualsToken' should only be called on a '*='");
    }
    state.pos = state.tokenStart + 1;
    state.token = Kind.EqualsToken;
    return state.token;
  }

  // scanner.go:1046-1202. Re-reads a `/` or `/=` as a regular expression
  // literal. Ports the simple body + recovery + flag-error path. The heavyweight
  // regExpParser deep-validation sub-branch (scanner.go:1171-1192, depends on
  // internal/scanner/regexp.go which is NOT ported in wave 4a) is DEFERRED: the
  // parser only ever calls ReScanSlashToken() with no args (reportErrors=false),
  // so the produced token kind/pos/tokenValue is identical without it.
  function reScanSlashToken(reportErrors?: boolean): Kind {
    const shouldReportErrors = reportErrors === true;
    if (state.token === Kind.SlashToken || state.token === Kind.SlashEqualsToken) {
      // Quickly get to the end of regex such that we know the flags.
      const startOfRegExpBody = state.tokenStart + 1;
      let p = startOfRegExpBody;
      let inEscape = false;
      // Although nested character classes are allowed in Unicode Sets mode, an
      // unescaped slash is invalid even in a character class in any Unicode mode
      // (see scanner.go:1054-1062). We must not handle nested character classes
      // in the first pass.
      let inCharacterClass = false;
      for (;;) {
        // EOF or newline => unterminated regex; report and return what we have.
        if (p >= config.end) {
          state.tokenFlags |= TokenFlags.Unterminated;
          break;
        }
        const ch = config.text.charCodeAt(p);
        if (isLineBreakCode(ch)) {
          state.tokenFlags |= TokenFlags.Unterminated;
          break;
        } else if (inEscape) {
          // Parsing an escape character; reset the flag and advance.
          inEscape = false;
        } else if (ch === 0x2f /* / */ && !inCharacterClass) {
          // A slash within a character class is permissible, but in general it
          // signals the end of the regexp literal.
          break;
        } else if (ch === 0x5b /* [ */) {
          inCharacterClass = true;
        } else if (ch === 0x5c /* \ */) {
          inEscape = true;
        } else if (ch === 0x5d /* ] */) {
          inCharacterClass = false;
        }
        p++;
      }

      const endOfRegExpBody = p;
      if ((state.tokenFlags & TokenFlags.Unterminated) !== 0) {
        // Search for the nearest unbalanced bracket for better recovery. Since
        // the expression is invalid anyway, take nested square brackets into
        // consideration for the best guess (scanner.go:1104-1136).
        p = startOfRegExpBody;
        inEscape = false;
        let characterClassDepth = 0;
        let inDecimalQuantifier = false;
        let groupDepth = 0;
        for (; p < endOfRegExpBody;) {
          const ch = config.text.charCodeAt(p);
          if (inEscape) {
            inEscape = false;
          } else if (ch === 0x5c /* \ */) {
            inEscape = true;
          } else if (ch === 0x5b /* [ */) {
            characterClassDepth++;
          } else if (ch === 0x5d /* ] */ && characterClassDepth !== 0) {
            characterClassDepth--;
          } else if (characterClassDepth === 0) {
            if (ch === 0x7b /* { */) {
              inDecimalQuantifier = true;
            } else if (ch === 0x7d /* } */ && inDecimalQuantifier) {
              inDecimalQuantifier = false;
            } else if (!inDecimalQuantifier) {
              if (ch === 0x28 /* ( */) {
                groupDepth++;
              } else if (ch === 0x29 /* ) */ && groupDepth !== 0) {
                groupDepth--;
              } else if (ch === 0x29 /* ) */ || ch === 0x5d /* ] */ || ch === 0x7d /* } */) {
                // Unbalanced bracket outside a character class: treat this
                // position as the end of regex.
                break;
              }
            }
          }
          p++;
        }
        // Whitespace and semicolons at the end are not likely part of the regex.
        for (; p > startOfRegExpBody;) {
          const last = config.text.codePointAt(p - 1)!;
          const size = last > 0xffff ? 2 : 1;
          if (isWhiteSpaceLike(last) || last === 0x3b /* ; */) {
            p -= size;
          } else {
            break;
          }
        }
        errorAt(Diagnostics.Unterminated_regular_expression_literal, state.tokenStart, p - state.tokenStart);
      } else {
        // Consume the slash character.
        p++;
        let regExpFlagsValue = regularExpressionFlags.None;
        for (; p < config.end;) {
          const cp = config.text.codePointAt(p)!;
          const size = cp > 0xffff ? 2 : 1;
          if (!isIdentifierPartCodePoint(cp, config.languageVariant)) {
            break;
          }
          if (shouldReportErrors) {
            const flag = charCodeToRegExpFlag.get(cp);
            if (flag === undefined) {
              errorAt(Diagnostics.Unknown_regular_expression_flag, p, size);
            } else if ((regExpFlagsValue & flag) !== 0) {
              errorAt(Diagnostics.Duplicate_regular_expression_flag, p, size);
            } else if (
              ((regExpFlagsValue | flag) & regularExpressionFlags.AnyUnicodeMode) === regularExpressionFlags.AnyUnicodeMode
            ) {
              errorAt(
                Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously,
                p,
                size,
              );
            } else {
              regExpFlagsValue |= flag;
              // checkRegularExpressionFlagAvailability needs languageVersion(),
              // which the LiveScanner has no script-target for — that
              // availability check is part of the DEFERRED deep-validation.
            }
          }
          p += size;
        }
        // DEFERRED: the regExpParser.run() deep-validation sub-branch
        // (scanner.go:1171-1192) is not ported in wave 4a; the parser path
        // (reportErrors=false) never reaches it.
      }

      state.pos = p;
      state.tokenValue = config.text.slice(state.tokenStart, state.pos);
      state.token = Kind.RegularExpressionLiteral;
    }
    return state.token;
  }

  // scanner.go:1211-1217. Splits a private identifier back into a `#` token.
  function reScanHashToken(): Kind {
    if (state.token === Kind.PrivateIdentifier) {
      state.pos = state.tokenStart + 1;
      state.token = Kind.HashToken;
    }
    return state.token;
  }

  // scanner.go:1219-1226. tsgo PANICS if the current token is not `??`; ported
  // as a thrown Error to stay faithful. Splits `??` into `?`.
  function reScanQuestionToken(): Kind {
    if (state.token !== Kind.QuestionQuestionToken) {
      throw new Error("'reScanQuestionToken' should only be called on a '??'");
    }
    state.pos = state.tokenStart + 1;
    state.token = Kind.QuestionToken;
    return state.token;
  }

  // Strada-parity (NOT in tsgo scanner.go) — ported from
  // scanner.native-preview.ts:2015-2025. Re-reads from fullStartPos and tries a
  // plain identifier scan; on failure advances one code unit, leaving Unknown.
  function reScanInvalidIdentifier(): Kind {
    state.pos = state.fullStartPos;
    state.tokenStart = state.fullStartPos;
    state.tokenFlags = TokenFlags.None;
    if (scanIdentifier(0)) {
      state.token = getIdentifierToken(state.tokenValue);
      return state.token;
    }
    const cs = charAndSize();
    state.pos += cs.size;
    return state.token; // Still Kind.Unknown
  }

  // Strada-parity (NOT in tsgo scanner.go) — ported from
  // scanner.native-preview.ts:2207-2210. Identical body to
  // reScanTemplateToken(false).
  function reScanTemplateHeadOrNoSubstitutionTemplate(): Kind {
    state.pos = state.tokenStart;
    state.token = scanTemplateAndSetTokenValue(true /*shouldEmitInvalidEscapeError*/);
    return state.token;
  }

  // -------------------------------------------------------------------------
  // JSX scan modes (scanner.go:1204-1350) — also MUTATE ScannerState in place.
  // -------------------------------------------------------------------------

  // scanner.go:1232-1297. Internal worker for scanJsxToken/reScanJsxToken.
  function scanJsxTokenEx(allowMultilineJsxText: boolean): JsxTokenSyntaxKind {
    state.fullStartPos = state.pos;
    state.tokenStart = state.pos;
    const ch = char();
    if (ch < 0) {
      state.token = Kind.EndOfFile;
    } else if (ch === 0x3c /* < */) {
      if (charAt(1) === 0x2f /* / */) {
        state.pos += 2;
        state.token = Kind.LessThanSlashToken;
      } else {
        state.pos++;
        state.token = Kind.LessThanToken;
      }
    } else if (ch === 0x7b /* { */) {
      state.pos++;
      state.token = Kind.OpenBraceToken;
    } else {
      // First non-whitespace character on this line. The initial value 0 is
      // special: it means "we still want leading whitespace" (scanner.go:1252).
      let firstNonWhitespace = 0;
      for (;;) {
        const cs = charAndSize();
        if (cs.size === 0 || cs.ch === 0x7b /* { */) {
          break;
        }
        if (cs.ch === 0x3c /* < */) {
          if (isConflictMarkerTrivia(config.text, state.pos)) {
            state.pos = scanConflictMarkerTrivia(config.text, state.pos, onError);
            state.token = Kind.ConflictMarkerTrivia;
            return state.token;
          }
          break;
        }
        if (cs.ch === 0x3e /* > */) {
          errorAt(Diagnostics.Unexpected_token_Did_you_mean_or_gt, state.pos, 1);
        } else if (cs.ch === 0x7d /* } */) {
          errorAt(Diagnostics.Unexpected_token_Did_you_mean_or_rbrace, state.pos, 1);
        }
        // If firstNonWhitespace is 0 we have only seen whitespace so far; a
        // line break means we ignore that leading whitespace (scanner.go:1273).
        if (isLineBreakCode(cs.ch) && firstNonWhitespace === 0) {
          firstNonWhitespace = -1;
        } else if (!allowMultilineJsxText && isLineBreakCode(cs.ch) && firstNonWhitespace > 0) {
          // Stop JsxText on each line during formatting.
          break;
        } else if (!isWhiteSpaceLike(cs.ch)) {
          firstNonWhitespace = state.pos;
        }
        state.pos += cs.size;
      }
      state.tokenValue = config.text.slice(state.fullStartPos, state.pos);
      state.token = Kind.JsxText;
      if (firstNonWhitespace === -1) {
        state.token = Kind.JsxTextAllWhiteSpaces;
      }
    }
    return state.token as JsxTokenSyntaxKind;
  }

  // scanner.go:1228-1230.
  function scanJsxToken(): JsxTokenSyntaxKind {
    return scanJsxTokenEx(true /*allowMultilineJsxText*/);
  }

  // scanner.go:1204-1209. Re-reads from fullStartPos (the trivia-inclusive
  // start), not tokenStart.
  function reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind {
    const allow = allowMultilineJsxText ?? true;
    state.pos = state.fullStartPos;
    state.tokenStart = state.fullStartPos;
    state.token = scanJsxTokenEx(allow);
    return state.token as JsxTokenSyntaxKind;
  }

  // scanner.go:1300-1325. Scans a JSX identifier; these allow dashes and a
  // single `:`. MUTATES the visible token in place (no advance to a new token);
  // callers read pos/tokenValue after.
  function scanJsxIdentifier(): Kind {
    if (tokenIsIdentifierOrKeyword(state.token)) {
      for (;;) {
        const ch = char();
        if (ch < 0) {
          break;
        }
        if (ch === 0x2d /* - */) {
          state.tokenValue += "-";
          state.pos++;
          continue;
        }
        const oldPos = state.pos;
        // Reuse scanIdentifierParts so unicode escapes are handled.
        state.tokenValue += scanIdentifierParts();
        if (state.pos === oldPos) {
          break;
        }
      }
      state.token = getIdentifierToken(state.tokenValue);
    }
    return state.token;
  }

  // scanner.go:1327-1344. Skips leading whitespace (tsgo behavior; native
  // preview does NOT skip — we follow tsgo, the source of truth), then scans a
  // quoted attribute string, or re-tokenizes via scan() for anything else.
  function scanJsxAttributeValue(): Kind {
    state.fullStartPos = state.pos;
    // Skip whitespace between '=' and the value so tokenStart lands on the
    // opening quote, not on trivia.
    for (;;) {
      const cs = charAndSize();
      if (!(cs.size > 0 && isWhiteSpaceLike(cs.ch))) {
        break;
      }
      state.pos += cs.size;
    }
    state.tokenStart = state.pos;
    const ch = char();
    if (ch === 0x22 /* " */ || ch === 0x27 /* ' */) {
      state.tokenValue = scanString(true /*jsxAttributeString*/);
      state.token = Kind.StringLiteral;
      return state.token;
    }
    // If this scans anything other than `{`, it's a parse error.
    return scan();
  }

  // scanner.go:1346-1350.
  function reScanJsxAttributeValue(): Kind {
    state.pos = state.fullStartPos;
    state.tokenStart = state.fullStartPos;
    return scanJsxAttributeValue();
  }

  // --- accessors -----------------------------------------------------------
  return {
    scan,
    nextToken,
    getToken: () => state.token,
    getTokenStart: () => state.tokenStart,
    getTokenEnd: () => state.pos,
    getTokenFullStart: () => state.fullStartPos,
    getTokenText: () => config.text.slice(state.tokenStart, state.pos),
    getTokenValue: () => state.tokenValue,
    getTokenFlags: () => state.tokenFlags,
    hasPrecedingLineBreak: () => (state.tokenFlags & TokenFlags.PrecedingLineBreak) !== 0,
    isIdentifier: () => state.token === Kind.Identifier,
    isReservedWord: () => state.token >= Kind.FirstReservedWord && state.token <= Kind.LastReservedWord,
    isUnterminated: () => (state.tokenFlags & TokenFlags.Unterminated) !== 0,
    mark: () => ({ ...state }),
    rewind: (saved: ScannerState): void => {
      state.pos = saved.pos;
      state.fullStartPos = saved.fullStartPos;
      state.tokenStart = saved.tokenStart;
      state.token = saved.token;
      state.tokenValue = saved.tokenValue;
      state.tokenFlags = saved.tokenFlags;
      state.commentDirectives = saved.commentDirectives;
      state.skipJSDocLeadingAsterisks = saved.skipJSDocLeadingAsterisks;
    },
    resetPos: (pos: number): void => {
      if (pos < 0) {
        throw new Error("Cannot reset token state to negative position");
      }
      state.pos = pos;
      state.fullStartPos = pos;
      state.tokenStart = pos;
    },
    resetTokenState: (pos: number): void => {
      if (pos < 0) {
        throw new Error("Cannot reset token state to negative position");
      }
      state.pos = pos;
      state.fullStartPos = pos;
      state.tokenStart = pos;
      state.token = Kind.Unknown;
      state.tokenValue = "";
      state.tokenFlags = TokenFlags.None;
    },
    setText: (newText: string, start?: number, length?: number): void => {
      config.text = newText;
      const begin = start ?? 0;
      config.end = length === undefined ? newText.length : begin + length;
      state.pos = begin;
      state.fullStartPos = begin;
      state.tokenStart = begin;
      state.token = Kind.Unknown;
      state.tokenValue = "";
      state.tokenFlags = TokenFlags.None;
      state.commentDirectives = undefined;
      state.skipJSDocLeadingAsterisks = 0;
    },
    getText: () => config.text,
    setLanguageVariant: (variant: LanguageVariant): void => {
      config.languageVariant = variant;
    },
    reScanLessThanToken,
    reScanGreaterThanToken,
    reScanTemplateToken,
    reScanTemplateHeadOrNoSubstitutionTemplate,
    reScanAsteriskEqualsToken,
    reScanSlashToken,
    reScanHashToken,
    reScanQuestionToken,
    reScanInvalidIdentifier,
    scanJsxToken,
    reScanJsxToken,
    scanJsxIdentifier,
    scanJsxAttributeValue,
    reScanJsxAttributeValue,
  };
}
