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
  #position = 0;

  constructor(text: string, options: ScannerOptions = {}) {
    this.#text = text;
    this.#skipTrivia = options.skipTrivia ?? true;
  }

  scan(): ScannedToken {
    while (this.#position < this.#text.length) {
      const token = this.#scanToken();
      if (!this.#skipTrivia || !isTrivia(token.kind)) {
        return token;
      }
    }
    return this.#token(Kind.EndOfFile, this.#position, this.#position);
  }

  #scanToken(): ScannedToken {
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

    if (isIdentifierStart(current)) {
      return this.#scanIdentifierOrKeyword();
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
    while (this.#position < this.#text.length && isDigit(this.#text[this.#position]!)) {
      this.#position += 1;
    }
    if (this.#text[this.#position] === "." && isDigit(this.#text[this.#position + 1] ?? "")) {
      this.#position += 1;
      while (this.#position < this.#text.length && isDigit(this.#text[this.#position]!)) {
        this.#position += 1;
      }
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

  #token(kind: Kind, pos: number, end: number): ScannedToken {
    return { kind, pos, end, text: this.#text.slice(pos, end) };
  }
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
