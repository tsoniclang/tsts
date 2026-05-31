import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind } from "../ast/index.js";
import { LanguageVariant } from "../core/languageVariant.js";
import { createLiveScanner } from "./scanner.js";
import { TokenFlags } from "./tokenFlags.js";

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

  re_scan_greater_than_token_merges_double_angle(): void {
    // tsgo's scan() never produces `>>` directly: it yields a single `>` and
    // the parser merges via reScanGreaterThanToken (scanner.go:1004).
    const scanner = createLiveScanner("a >> b");
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.GreaterThanToken, scanner.scan());
    // The parser asks the scanner to merge the following `>` into `>>`.
    Assert.Equal(Kind.GreaterThanGreaterThanToken, scanner.reScanGreaterThanToken());
    Assert.Equal(">>", scanner.getTokenText());
    // The leftover identifier re-enters as the next token.
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.EndOfFile, scanner.scan());
  }

  re_scan_greater_than_token_recovers_compound_kinds(): void {
    const scanner = createLiveScanner(">>>=");
    Assert.Equal(Kind.GreaterThanToken, scanner.scan());
    Assert.Equal(Kind.GreaterThanGreaterThanGreaterThanEqualsToken, scanner.reScanGreaterThanToken());
    Assert.Equal(">>>=", scanner.getTokenText());
  }

  re_scan_less_than_token_splits_double_angle(): void {
    const scanner = createLiveScanner("a << b");
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.LessThanLessThanToken, scanner.scan());
    Assert.Equal(Kind.LessThanToken, scanner.reScanLessThanToken());
    Assert.Equal("<", scanner.getTokenText());
    Assert.Equal(Kind.LessThanToken, scanner.scan());
  }

  re_scan_slash_token_builds_regex_literal(): void {
    const scanner = createLiveScanner("/re/g");
    Assert.Equal(Kind.SlashToken, scanner.scan());
    Assert.Equal(Kind.RegularExpressionLiteral, scanner.reScanSlashToken());
    Assert.Equal("/re/g", scanner.getTokenValue());
    Assert.Equal("/re/g", scanner.getTokenText());
  }

  re_scan_slash_token_marks_unterminated_regex(): void {
    const scanner = createLiveScanner("/oops\n");
    Assert.Equal(Kind.SlashToken, scanner.scan());
    Assert.Equal(Kind.RegularExpressionLiteral, scanner.reScanSlashToken());
    Assert.Equal(true, scanner.isUnterminated());
  }

  re_scan_slash_equals_token_builds_regex_literal(): void {
    // A `/=` start is rescanned as a regex whose body begins with `=`.
    const scanner = createLiveScanner("/=a/");
    Assert.Equal(Kind.SlashEqualsToken, scanner.scan());
    Assert.Equal(Kind.RegularExpressionLiteral, scanner.reScanSlashToken());
    Assert.Equal("/=a/", scanner.getTokenValue());
  }

  re_scan_asterisk_equals_token_splits_into_equals(): void {
    const scanner = createLiveScanner("*=");
    Assert.Equal(Kind.AsteriskEqualsToken, scanner.scan());
    // tsgo sets pos = tokenStart + 1 (scanner.go:1041) but leaves tokenStart at
    // the `*`, so the token KIND becomes `=` while pos lands one past tokenStart.
    Assert.Equal(Kind.EqualsToken, scanner.reScanAsteriskEqualsToken());
    Assert.Equal(1, scanner.getTokenEnd());
  }

  re_scan_hash_token_splits_private_identifier(): void {
    const scanner = createLiveScanner("#field");
    Assert.Equal(Kind.PrivateIdentifier, scanner.scan());
    Assert.Equal(Kind.HashToken, scanner.reScanHashToken());
    Assert.Equal("#", scanner.getTokenText());
  }

  re_scan_question_token_splits_double_question(): void {
    const scanner = createLiveScanner("a ?? b");
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.QuestionQuestionToken, scanner.scan());
    Assert.Equal(Kind.QuestionToken, scanner.reScanQuestionToken());
    Assert.Equal("?", scanner.getTokenText());
    Assert.Equal(Kind.QuestionToken, scanner.scan());
  }

  re_scan_template_token_reads_middle_and_tail(): void {
    // After raw scan() emits TemplateHead, expr, then a plain CloseBraceToken,
    // the parser re-scans the `}`-started continuation as TemplateTail.
    const scanner = createLiveScanner("`a${x}b`");
    Assert.Equal(Kind.TemplateHead, scanner.scan());
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.CloseBraceToken, scanner.scan());
    Assert.Equal(Kind.TemplateTail, scanner.reScanTemplateToken(false));
    Assert.Equal("b", scanner.getTokenValue());
  }

  scan_jsx_token_reads_jsx_text(): void {
    const scanner = createLiveScanner("<div>hi</div>");
    scanner.setLanguageVariant(LanguageVariant.JSX);
    // `<`
    Assert.Equal(Kind.LessThanToken, scanner.scanJsxToken());
    // `div`
    Assert.Equal(Kind.Identifier, scanner.scan());
    // `>`
    Assert.Equal(Kind.GreaterThanToken, scanner.scan());
    // `hi` as a single JsxText token.
    Assert.Equal(Kind.JsxText, scanner.scanJsxToken());
    Assert.Equal("hi", scanner.getTokenValue());
    // `</`
    Assert.Equal(Kind.LessThanSlashToken, scanner.scanJsxToken());
  }

  scan_jsx_token_reads_all_whitespace_text(): void {
    const scanner = createLiveScanner("<a>\n  </a>");
    scanner.setLanguageVariant(LanguageVariant.JSX);
    Assert.Equal(Kind.LessThanToken, scanner.scanJsxToken());
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal(Kind.GreaterThanToken, scanner.scan());
    // The whitespace-only run after `>` is JsxTextAllWhiteSpaces.
    Assert.Equal(Kind.JsxTextAllWhiteSpaces, scanner.scanJsxToken());
  }

  scan_jsx_identifier_allows_dash(): void {
    const scanner = createLiveScanner("data-x");
    scanner.setLanguageVariant(LanguageVariant.JSX);
    // First a plain identifier `data` is scanned...
    Assert.Equal(Kind.Identifier, scanner.scan());
    Assert.Equal("data", scanner.getTokenValue());
    // ...then scanJsxIdentifier extends it across `-` in place.
    Assert.Equal(Kind.Identifier, scanner.scanJsxIdentifier());
    Assert.Equal("data-x", scanner.getTokenValue());
  }

  scan_jsx_attribute_value_reads_quoted_string(): void {
    const scanner = createLiveScanner("= \"hello\"");
    scanner.setLanguageVariant(LanguageVariant.JSX);
    Assert.Equal(Kind.EqualsToken, scanner.scan());
    // Leading whitespace is skipped (tsgo behavior) before the quote.
    Assert.Equal(Kind.StringLiteral, scanner.scanJsxAttributeValue());
    Assert.Equal("hello", scanner.getTokenValue());
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
A<LiveScannerTests>().method((t) => t.re_scan_greater_than_token_merges_double_angle).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_greater_than_token_recovers_compound_kinds).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_less_than_token_splits_double_angle).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_slash_token_builds_regex_literal).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_slash_token_marks_unterminated_regex).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_slash_equals_token_builds_regex_literal).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_asterisk_equals_token_splits_into_equals).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_hash_token_splits_private_identifier).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_question_token_splits_double_question).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.re_scan_template_token_reads_middle_and_tail).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.scan_jsx_token_reads_jsx_text).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.scan_jsx_token_reads_all_whitespace_text).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.scan_jsx_identifier_allows_dash).add(FactAttribute);
A<LiveScannerTests>().method((t) => t.scan_jsx_attribute_value_reads_quoted_string).add(FactAttribute);
