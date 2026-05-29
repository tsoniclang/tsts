import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind } from "../ast/index.js";
import { createLiveScanner } from "./scanner.js";
import { TokenFlags } from "./token-flags.js";

function tokenKinds(source: string): readonly Kind[] {
  const scanner = createLiveScanner(source);
  const kinds: Kind[] = [];
  for (;;) {
    const kind = scanner.scan();
    kinds.push(kind);
    if (kind === Kind.EndOfFile) {
      return kinds;
    }
  }
}

export class LiveScannerTests {
  scans_a_nextToken_sequence_with_keywords_and_punctuators(): void {
    Assert.Equal<readonly Kind[]>(
      [
        Kind.ConstKeyword,
        Kind.Identifier,
        Kind.ColonToken,
        Kind.NumberKeyword,
        Kind.EqualsToken,
        Kind.NumericLiteral,
        Kind.SemicolonToken,
        Kind.EndOfFile,
      ],
      tokenKinds("const answer: number = 42;"),
    );
  }

  nextToken_forwards_to_scan(): void {
    const scanner = createLiveScanner("a >>>= b");
    Assert.Equal(Kind.Identifier, scanner.nextToken());
    Assert.Equal("a", scanner.getTokenText());
    Assert.Equal(Kind.GreaterThanGreaterThanGreaterThanEqualsToken, scanner.nextToken());
    Assert.Equal(Kind.Identifier, scanner.nextToken());
    Assert.Equal(Kind.EndOfFile, scanner.nextToken());
  }

  token_start_end_and_full_start_include_leading_trivia(): void {
    const scanner = createLiveScanner("  // c\n  x");
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("x", scanner.getTokenText());
    // tokenStart is the non-trivia start; fullStart includes leading trivia.
    Assert.Equal(9, scanner.getTokenStart());
    Assert.Equal(10, scanner.getTokenEnd());
    Assert.Equal(0, scanner.getTokenFullStart());
    Assert.Equal(true, scanner.hasPrecedingLineBreak());
  }

  mark_and_rewind_round_trip_restores_position_and_token(): void {
    const scanner = createLiveScanner("foo bar baz");
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("foo", scanner.getTokenValue());
    const saved = scanner.mark();
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("bar", scanner.getTokenValue());
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("baz", scanner.getTokenValue());
    // Rewind to right after "foo" and re-scan: must replay "bar" then "baz".
    scanner.rewind(saved);
    Assert.Equal("foo", scanner.getTokenValue());
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("bar", scanner.getTokenValue());
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("baz", scanner.getTokenValue());
  }

  single_quoted_string_sets_single_quote_flag(): void {
    const scanner = createLiveScanner("'hi'");
    Assert.Equal(Kind.StringLiteral, scanner.scan());
    Assert.Equal("hi", scanner.getTokenValue());
    Assert.Equal(TokenFlags.SingleQuote, scanner.getTokenFlags() & TokenFlags.SingleQuote);
  }

  string_escape_is_decoded_in_token_value(): void {
    const scanner = createLiveScanner("\"a\\tb\"");
    Assert.Equal(Kind.StringLiteral, scanner.scan());
    Assert.Equal("a\tb", scanner.getTokenValue());
  }

  unterminated_string_sets_unterminated_flag(): void {
    const scanner = createLiveScanner("\"oops");
    Assert.Equal(Kind.StringLiteral, scanner.scan());
    Assert.Equal(true, scanner.isUnterminated());
  }

  numeric_separators_scientific_and_bigint(): void {
    const sep = createLiveScanner("25_263_104");
    Assert.Equal(Kind.NumericLiteral, sep.scan());
    Assert.Equal("25263104", sep.getTokenValue());
    Assert.Equal(TokenFlags.ContainsSeparator, sep.getTokenFlags() & TokenFlags.ContainsSeparator);

    const sci = createLiveScanner("1e3");
    Assert.Equal(Kind.NumericLiteral, sci.scan());
    Assert.Equal(TokenFlags.Scientific, sci.getTokenFlags() & TokenFlags.Scientific);

    const big = createLiveScanner("123n");
    Assert.Equal(Kind.BigIntLiteral, big.scan());
    Assert.Equal("123n", big.getTokenValue());

    const hex = createLiveScanner("0xFF");
    Assert.Equal(Kind.NumericLiteral, hex.scan());
    Assert.Equal(TokenFlags.HexSpecifier, hex.getTokenFlags() & TokenFlags.HexSpecifier);
    Assert.Equal("0xff", hex.getTokenValue());
  }

  no_substitution_template_is_a_single_token(): void {
    const scanner = createLiveScanner("`hello`");
    Assert.Equal(Kind.NoSubstitutionTemplateLiteral, scanner.scan());
    Assert.Equal("hello", scanner.getTokenValue());
    Assert.Equal(Kind.EndOfFile, scanner.scan());
  }

  template_head_then_raw_scan_emits_close_brace(): void {
    // The raw scan() emits TemplateHead, then the expression, then a plain
    // CloseBraceToken. TemplateMiddle/Tail are produced by the parser-driven
    // reScanTemplateToken (deferred to wave 4a-2), so the trailing text
    // re-enters as ordinary tokens here.
    Assert.Equal<readonly Kind[]>(
      [
        Kind.TemplateHead,
        Kind.Identifier,
        Kind.CloseBraceToken,
        Kind.Identifier,
        Kind.NoSubstitutionTemplateLiteral,
        Kind.EndOfFile,
      ],
      tokenKinds("`a${x}b`"),
    );
  }

  reserved_word_and_identifier_predicates(): void {
    const reserved = createLiveScanner("return");
    Assert.Equal(Kind.ReturnKeyword, reserved.scan());
    Assert.Equal(true, reserved.isReservedWord());
    Assert.Equal(false, reserved.isIdentifier());

    const ident = createLiveScanner("foo");
    Assert.Equal(Kind.Identifier, ident.scan());
    Assert.Equal(true, ident.isIdentifier());
    Assert.Equal(false, ident.isReservedWord());
  }
}

A<LiveScannerTests>().method((t) => t.scans_a_nextToken_sequence_with_keywords_and_punctuators).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.nextToken_forwards_to_scan).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.token_start_end_and_full_start_include_leading_trivia).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.mark_and_rewind_round_trip_restores_position_and_token).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.single_quoted_string_sets_single_quote_flag).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.string_escape_is_decoded_in_token_value).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.unterminated_string_sets_unterminated_flag).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.numeric_separators_scientific_and_bigint).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.no_substitution_template_is_a_single_token).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.template_head_then_raw_scan_emits_close_brace).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.reserved_word_and_identifier_predicates).add(FactAttribute);
