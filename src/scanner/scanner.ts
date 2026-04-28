import { Kind } from "../ast/index.js";

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
  if (character.length === 0) {
    return false;
  }
  return character === "$" || character === "_" || /^\p{ID_Start}$/u.test(character);
}

function isIdentifierPart(character: string): boolean {
  if (character.length === 0) {
    return false;
  }
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

    const current = this.#codePointAt(this.#position);
    if (current === "\"" || current === "'") {
      return this.#scanString(current);
    }

    if (isDigit(current) || current === "." && isDigit(this.#text[this.#position + 1] ?? "")) {
      return this.#scanNumber();
    }

    if (current === "#") {
      const escapedStart = this.#tryPeekIdentifierEscape(this.#position + 1);
      if (escapedStart !== undefined && isIdentifierStart(escapedStart.character)) {
        this.#position += 1;
        return this.#scanPrivateIdentifierWithEscapes(start);
      }
      const next = this.#codePointAt(this.#position + 1);
      if (isIdentifierStart(next)) {
        this.#position += 1 + next.length;
        while (this.#position < this.#text.length && isIdentifierPart(this.#codePointAt(this.#position))) {
          this.#position += this.#codePointAt(this.#position).length;
        }
        return this.#token(Kind.PrivateIdentifier, start, this.#position);
      }
    }

    const escapedStart = this.#tryPeekIdentifierEscape(this.#position);
    if ((escapedStart !== undefined && isIdentifierStart(escapedStart.character)) || isIdentifierStart(current)) {
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
    const escapedStart = this.#tryPeekIdentifierEscape(this.#position);
    if (escapedStart !== undefined && isIdentifierStart(escapedStart.character)) {
      const text = this.#scanIdentifierTextWithEscapes(true);
      return this.#token(Kind.Identifier, start, this.#position, text);
    }
    this.#position += this.#codePointAt(this.#position).length;
    let hasEscape = false;
    while (this.#position < this.#text.length) {
      const escaped = this.#tryPeekIdentifierEscape(this.#position);
      if (escaped !== undefined && isIdentifierPart(escaped.character)) {
        hasEscape = true;
        const text = this.#text.slice(start, this.#position) + this.#scanIdentifierTextWithEscapes(false);
        return this.#token(Kind.Identifier, start, this.#position, text);
      }
      const current = this.#codePointAt(this.#position);
      if (!isIdentifierPart(current)) {
        break;
      }
      this.#position += current.length;
    }
    const text = this.#text.slice(start, this.#position);
    return this.#token(hasEscape ? Kind.Identifier : keywordKinds.get(text) ?? Kind.Identifier, start, this.#position, text);
  }

  #scanPrivateIdentifierWithEscapes(start: number): ScannedToken {
    const text = `#${this.#scanIdentifierTextWithEscapes(true)}`;
    return this.#token(Kind.PrivateIdentifier, start, this.#position, text);
  }

  #scanIdentifierTextWithEscapes(requireStartOnFirst: boolean): string {
    let text = "";
    while (this.#position < this.#text.length) {
      const escaped = this.#tryScanIdentifierEscape(this.#position);
      const first = text.length === 0;
      if (escaped !== undefined && (first && requireStartOnFirst ? isIdentifierStart(escaped.character) : isIdentifierPart(escaped.character))) {
        text += escaped.character;
        continue;
      }
      const current = this.#codePointAt(this.#position);
      const valid = first && requireStartOnFirst ? isIdentifierStart(current) : isIdentifierPart(current);
      if (!valid) {
        break;
      }
      text += current;
      this.#position += current.length;
    }
    return text;
  }

  #tryPeekIdentifierEscape(position: number): { readonly character: string; readonly end: number } | undefined {
    const currentPosition = this.#position;
    const escaped = this.#tryScanIdentifierEscape(position);
    this.#position = currentPosition;
    return escaped;
  }

  #tryScanIdentifierEscape(position: number): { readonly character: string; readonly end: number } | undefined {
    if (this.#text[position] !== "\\" || this.#text[position + 1] !== "u") {
      return undefined;
    }
    let escapeEnd = position + 2;
    let codePointText = "";
    if (this.#text[escapeEnd] === "{") {
      escapeEnd += 1;
      const digitsStart = escapeEnd;
      while (escapeEnd < this.#text.length && /[0-9a-fA-F]/.test(this.#text[escapeEnd]!)) {
        escapeEnd += 1;
      }
      if (escapeEnd === digitsStart || this.#text[escapeEnd] !== "}") {
        return undefined;
      }
      codePointText = this.#text.slice(digitsStart, escapeEnd);
      escapeEnd += 1;
    } else {
      codePointText = this.#text.slice(escapeEnd, escapeEnd + 4);
      if (!/^[0-9a-fA-F]{4}$/.test(codePointText)) {
        return undefined;
      }
      escapeEnd += 4;
    }
    const codePoint = Number.parseInt(codePointText, 16);
    if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF) {
      return undefined;
    }
    const character = String.fromCodePoint(codePoint);
    this.#position = escapeEnd;
    return { character, end: escapeEnd };
  }

  #codePointAt(position: number): string {
    if (position >= this.#text.length) {
      return "";
    }
    const codePoint = this.#text.codePointAt(position);
    return codePoint === undefined ? "" : String.fromCodePoint(codePoint);
  }

  #scanNumber(): ScannedToken {
    const start = this.#position;
    let hasDecimalPointOrExponent = false;
    if (this.#text[this.#position] === ".") {
      hasDecimalPointOrExponent = true;
      this.#position += 1;
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    } else if (this.#text[this.#position] === "0") {
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
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    } else {
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    }
    if (this.#text[this.#position] === ".") {
      hasDecimalPointOrExponent = true;
      this.#position += 1;
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    }
    if (this.#text[this.#position] === "e" || this.#text[this.#position] === "E") {
      hasDecimalPointOrExponent = true;
      this.#position += 1;
      if (this.#text[this.#position] === "+" || this.#text[this.#position] === "-") {
        this.#position += 1;
      }
      while (this.#position < this.#text.length && isDecimalDigitOrSeparator(this.#text[this.#position]!)) {
        this.#position += 1;
      }
    }
    if (this.#text[this.#position] === "n") {
      this.#position += 1;
      return this.#token(hasDecimalPointOrExponent ? Kind.NumericLiteral : Kind.BigIntLiteral, start, this.#position);
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

  #token(kind: Kind, pos: number, end: number, text = this.#text.slice(pos, end)): ScannedToken {
    return { kind, pos, end, text };
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
