/**
 * TokenFlags — scanner token flag bitset.
 *
 * Faithful port of TS-Go `internal/ast/tokenflags.go` (single source of
 * truth). Modeled as a const-map (NOT an enum) so it carries no runtime
 * machinery and stays a plain `number` at the type level.
 *
 * Bit values verified 1:1 against typescript-go:
 *   internal/ast/tokenflags.go
 */

export type TokenFlags = number;

export interface TokenFlagsTable {
  readonly None: TokenFlags;
  readonly PrecedingLineBreak: TokenFlags;
  readonly PrecedingJSDocComment: TokenFlags;
  readonly Unterminated: TokenFlags;
  readonly ExtendedUnicodeEscape: TokenFlags;
  readonly Scientific: TokenFlags;
  readonly Octal: TokenFlags;
  readonly HexSpecifier: TokenFlags;
  readonly BinarySpecifier: TokenFlags;
  readonly OctalSpecifier: TokenFlags;
  readonly ContainsSeparator: TokenFlags;
  readonly UnicodeEscape: TokenFlags;
  readonly ContainsInvalidEscape: TokenFlags;
  readonly HexEscape: TokenFlags;
  readonly ContainsLeadingZero: TokenFlags;
  readonly ContainsInvalidSeparator: TokenFlags;
  readonly PrecedingJSDocLeadingAsterisks: TokenFlags;
  readonly SingleQuote: TokenFlags;
  readonly PrecedingJSDocWithDeprecated: TokenFlags;
  readonly PrecedingJSDocWithSeeOrLink: TokenFlags;
  readonly BinaryOrOctalSpecifier: TokenFlags;
  readonly WithSpecifier: TokenFlags;
  readonly StringLiteralFlags: TokenFlags;
  readonly NumericLiteralFlags: TokenFlags;
  readonly TemplateLiteralLikeFlags: TokenFlags;
  readonly RegularExpressionLiteralFlags: TokenFlags;
  readonly IsInvalid: TokenFlags;
}

export const TokenFlags: TokenFlagsTable = {
  None: 0,
  PrecedingLineBreak: 1 << 0, // 1
  PrecedingJSDocComment: 1 << 1, // 2
  Unterminated: 1 << 2, // 4
  ExtendedUnicodeEscape: 1 << 3, // 8
  Scientific: 1 << 4, // 16  e.g. `10e2`
  Octal: 1 << 5, // 32  e.g. `0777`
  HexSpecifier: 1 << 6, // 64  e.g. `0x00000000`
  BinarySpecifier: 1 << 7, // 128  e.g. `0b0110010000000000`
  OctalSpecifier: 1 << 8, // 256  e.g. `0o777`
  ContainsSeparator: 1 << 9, // 512  e.g. `0b1100_0101`
  UnicodeEscape: 1 << 10, // 1024  e.g. ` `
  ContainsInvalidEscape: 1 << 11, // 2048  e.g. `\uhello`
  HexEscape: 1 << 12, // 4096  e.g. `\xa0`
  ContainsLeadingZero: 1 << 13, // 8192  e.g. `0888`
  ContainsInvalidSeparator: 1 << 14, // 16384  e.g. `0_1`
  PrecedingJSDocLeadingAsterisks: 1 << 15, // 32768
  SingleQuote: 1 << 16, // 65536  e.g. `'abc'`
  PrecedingJSDocWithDeprecated: 1 << 17, // 131072
  PrecedingJSDocWithSeeOrLink: 1 << 18, // 262144

  // Composite values are the bitwise-OR of their members, verified by
  // recomputation against tsgo's tokenflags.go (the const expressions are the
  // source of truth; the trailing decimals are the evaluated results).
  BinaryOrOctalSpecifier: (1 << 7) | (1 << 8), // 384
  WithSpecifier: (1 << 6) | ((1 << 7) | (1 << 8)), // 448
  StringLiteralFlags:
    (1 << 2) /* Unterminated */ |
    (1 << 12) /* HexEscape */ |
    (1 << 10) /* UnicodeEscape */ |
    (1 << 3) /* ExtendedUnicodeEscape */ |
    (1 << 11) /* ContainsInvalidEscape */ |
    (1 << 16) /* SingleQuote */, // 72716
  NumericLiteralFlags:
    (1 << 4) /* Scientific */ |
    (1 << 5) /* Octal */ |
    (1 << 13) /* ContainsLeadingZero */ |
    ((1 << 6) | ((1 << 7) | (1 << 8))) /* WithSpecifier */ |
    (1 << 9) /* ContainsSeparator */ |
    (1 << 14) /* ContainsInvalidSeparator */, // 25584
  TemplateLiteralLikeFlags:
    (1 << 2) /* Unterminated */ |
    (1 << 12) /* HexEscape */ |
    (1 << 10) /* UnicodeEscape */ |
    (1 << 3) /* ExtendedUnicodeEscape */ |
    (1 << 11) /* ContainsInvalidEscape */, // 7180
  RegularExpressionLiteralFlags: 1 << 2 /* Unterminated */, // 4
  IsInvalid:
    (1 << 5) /* Octal */ |
    (1 << 13) /* ContainsLeadingZero */ |
    (1 << 14) /* ContainsInvalidSeparator */ |
    (1 << 11) /* ContainsInvalidEscape */, // 26656
};

/**
 * CommentDirectiveType — kind of `// @ts-...` directive line.
 *
 * Faithful to TS-Go `ast.CommentDirectiveType` (internal/ast/ast.go). TSTS's
 * AST module does not yet export this shape, so it is defined here (the scanner
 * is its only producer in this CORE wave). Modeled as a const-map (no enum).
 */
export type CommentDirectiveType = number;

export const CommentDirectiveType = {
  ExpectError: 0,
  Ignore: 1,
} as const;

/**
 * CommentDirective — a `// @ts-expect-error` / `// @ts-ignore` directive and
 * the source range it covers. Faithful to TS-Go `ast.CommentDirective`.
 */
export interface CommentDirective {
  readonly range: { readonly pos: number; readonly end: number };
  readonly type: CommentDirectiveType;
}
