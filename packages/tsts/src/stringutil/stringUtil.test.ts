import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  addUTF8ByteOrderMark,
  compareStringsCaseInsensitive,
  compareStringsCaseInsensitiveEslintCompatible,
  compareStringsCaseSensitive,
  ComparisonEqual,
  ComparisonGreaterThan,
  ComparisonLessThan,
  encodeURIBytes,
  equateStringCaseInsensitive,
  guessIndentation,
  hasPrefix,
  hasPrefixAndSuffixWithoutOverlap,
  hasSuffix,
  isASCIILetter,
  isDigit,
  isHexDigit,
  isLineBreak,
  isOctalDigit,
  isWhiteSpaceLike,
  isWhiteSpaceSingleLine,
  lowerFirstChar,
  removeByteOrderMark,
  splitLines,
  stripQuotes,
  truncateByRunes,
  unquoteString,
} from "./index.js";

export class CharClassificationTests {
  digits_and_hex_digits(): void {
    Assert.True(isDigit(0x30));
    Assert.True(isDigit(0x39));
    Assert.False(isDigit(0x40));
    Assert.True(isHexDigit(0x41));
    Assert.True(isHexDigit(0x46));
    Assert.False(isHexDigit(0x47));
    Assert.True(isHexDigit(0x61));
  }

  octal(): void {
    Assert.True(isOctalDigit(0x30));
    Assert.True(isOctalDigit(0x37));
    Assert.False(isOctalDigit(0x38));
  }

  ascii_letters(): void {
    Assert.True(isASCIILetter(0x41));
    Assert.True(isASCIILetter(0x7A));
    Assert.False(isASCIILetter(0x30));
  }

  whitespace_and_line_breaks(): void {
    Assert.True(isWhiteSpaceSingleLine(0x20));
    Assert.True(isWhiteSpaceSingleLine(0x09));
    Assert.False(isWhiteSpaceSingleLine(0x0A));
    Assert.True(isLineBreak(0x0A));
    Assert.True(isLineBreak(0x0D));
    Assert.True(isLineBreak(0x2028));
    Assert.True(isLineBreak(0x2029));
    Assert.False(isLineBreak(0x20));
    Assert.True(isWhiteSpaceLike(0x20));
    Assert.True(isWhiteSpaceLike(0x0A));
    Assert.False(isWhiteSpaceLike(0x41));
  }
}

export class SplitLinesTests {
  handles_lf_cr_and_crlf(): void {
    Assert.Equal<readonly string[]>(["a", "b", "c"], [...splitLines("a\nb\nc")]);
    Assert.Equal<readonly string[]>(["a", "b", "c"], [...splitLines("a\rb\rc")]);
    Assert.Equal<readonly string[]>(["a", "b", "c"], [...splitLines("a\r\nb\r\nc")]);
    Assert.Equal<readonly string[]>([], [...splitLines("")]);
    Assert.Equal<readonly string[]>(["a"], [...splitLines("a")]);
  }

  trailing_newline_produces_no_empty_final_segment(): void {
    Assert.Equal<readonly string[]>(["a"], [...splitLines("a\n")]);
    Assert.Equal<readonly string[]>(["a", ""], [...splitLines("a\n\n")]);
  }
}

export class GuessIndentationTests {
  returns_smallest_indent_across_non_empty_lines(): void {
    Assert.Equal(2, guessIndentation(["    foo", "  bar", "      baz"]));
  }

  returns_zero_when_any_line_has_no_indent(): void {
    Assert.Equal(0, guessIndentation(["foo", "  bar"]));
  }

  skips_empty_lines(): void {
    Assert.Equal(2, guessIndentation(["", "  foo", "    bar"]));
  }
}

export class ByteOrderMarkTests {
  remove_strips_utf8_bom(): void {
    Assert.Equal("﻿hello", removeByteOrderMark("﻿hello"));
    Assert.Equal("hello", removeByteOrderMark("hello"));
  }

  add_utf8_byte_order_mark_when_absent(): void {
    const withBom = addUTF8ByteOrderMark("hello");
    Assert.True(withBom.length > "hello".length);
  }
}

export class QuotesTests {
  strip_quotes_strips_matching_outer(): void {
    Assert.Equal("foo", stripQuotes("'foo'"));
    Assert.Equal("foo", stripQuotes('"foo"'));
    Assert.Equal("foo", stripQuotes("`foo`"));
    Assert.Equal("foo", stripQuotes("foo"));
    Assert.Equal("'foo\"", stripQuotes("'foo\""));
  }

  unquote_string_applies_strada_compat_backslash_replacement(): void {
    Assert.Equal("foo", unquoteString('"foo"'));
    Assert.Equal("anb", unquoteString('"a\\nb"'));
  }
}

export class StringMutationsTests {
  lower_first_char(): void {
    Assert.Equal("fOO", lowerFirstChar("FOO"));
    Assert.Equal("foo", lowerFirstChar("foo"));
    Assert.Equal("", lowerFirstChar(""));
  }

  truncate_by_runes(): void {
    Assert.Equal("hello", truncateByRunes("hello", 10));
    Assert.Equal("hel", truncateByRunes("hello", 3));
    Assert.Equal("", truncateByRunes("hello", 0));
  }
}

export class EncodeURIBytesTests {
  preserves_unreserved_characters(): void {
    Assert.Equal("hello", encodeURIBytes("hello"));
    Assert.Equal("abc123", encodeURIBytes("abc123"));
  }

  encodes_reserved_bytes(): void {
    Assert.Equal("%20", encodeURIBytes(" "));
    Assert.Equal("a%20b", encodeURIBytes("a b"));
  }

  does_not_encode_rfc3986_reserved_characters(): void {
    Assert.Equal("a/b?c=d", encodeURIBytes("a/b?c=d"));
  }
}

export class ComparisonTests {
  compare_strings_case_sensitive(): void {
    Assert.Equal(ComparisonEqual, compareStringsCaseSensitive("a", "a"));
    Assert.Equal(ComparisonLessThan, compareStringsCaseSensitive("a", "b"));
    Assert.Equal(ComparisonGreaterThan, compareStringsCaseSensitive("b", "a"));
    Assert.Equal(ComparisonLessThan, compareStringsCaseSensitive("A", "a"));
  }

  compare_strings_case_insensitive(): void {
    Assert.Equal(ComparisonEqual, compareStringsCaseInsensitive("foo", "FOO"));
    Assert.Equal(ComparisonGreaterThan, compareStringsCaseInsensitive("foo", "bar"));
  }

  compare_strings_case_insensitive_eslint_compatible(): void {
    Assert.Equal(ComparisonEqual, compareStringsCaseInsensitiveEslintCompatible("Foo", "foo"));
  }

  equate_string_case_insensitive(): void {
    Assert.True(equateStringCaseInsensitive("foo", "FOO"));
    Assert.False(equateStringCaseInsensitive("foo", "bar"));
  }

  has_prefix_has_suffix(): void {
    Assert.True(hasPrefix("FooBar", "Foo", true));
    Assert.False(hasPrefix("FooBar", "foo", true));
    Assert.True(hasPrefix("FooBar", "foo", false));
    Assert.True(hasSuffix("FooBar", "Bar", true));
    Assert.True(hasSuffix("FooBar", "bar", false));
  }

  has_prefix_and_suffix_without_overlap(): void {
    Assert.True(hasPrefixAndSuffixWithoutOverlap("abcdef", "ab", "ef", true));
    Assert.False(hasPrefixAndSuffixWithoutOverlap("ab", "ab", "ef", true));
  }
}

A<CharClassificationTests>().method((t) => t.digits_and_hex_digits).add(FactAttribute);
A<CharClassificationTests>().method((t) => t.octal).add(FactAttribute);
A<CharClassificationTests>().method((t) => t.ascii_letters).add(FactAttribute);
A<CharClassificationTests>().method((t) => t.whitespace_and_line_breaks).add(FactAttribute);
A<SplitLinesTests>().method((t) => t.handles_lf_cr_and_crlf).add(FactAttribute);
A<SplitLinesTests>().method((t) => t.trailing_newline_produces_no_empty_final_segment).add(FactAttribute);
A<GuessIndentationTests>().method((t) => t.returns_smallest_indent_across_non_empty_lines).add(FactAttribute);
A<GuessIndentationTests>().method((t) => t.returns_zero_when_any_line_has_no_indent).add(FactAttribute);
A<GuessIndentationTests>().method((t) => t.skips_empty_lines).add(FactAttribute);
A<ByteOrderMarkTests>().method((t) => t.remove_strips_utf8_bom).add(FactAttribute);
A<ByteOrderMarkTests>().method((t) => t.add_utf8_byte_order_mark_when_absent).add(FactAttribute);
A<QuotesTests>().method((t) => t.strip_quotes_strips_matching_outer).add(FactAttribute);
A<QuotesTests>().method((t) => t.unquote_string_applies_strada_compat_backslash_replacement).add(FactAttribute);
A<StringMutationsTests>().method((t) => t.lower_first_char).add(FactAttribute);
A<StringMutationsTests>().method((t) => t.truncate_by_runes).add(FactAttribute);
A<EncodeURIBytesTests>().method((t) => t.preserves_unreserved_characters).add(FactAttribute);
A<EncodeURIBytesTests>().method((t) => t.encodes_reserved_bytes).add(FactAttribute);
A<EncodeURIBytesTests>().method((t) => t.does_not_encode_rfc3986_reserved_characters).add(FactAttribute);
A<ComparisonTests>().method((t) => t.compare_strings_case_sensitive).add(FactAttribute);
A<ComparisonTests>().method((t) => t.compare_strings_case_insensitive).add(FactAttribute);
A<ComparisonTests>().method((t) => t.compare_strings_case_insensitive_eslint_compatible).add(FactAttribute);
A<ComparisonTests>().method((t) => t.equate_string_case_insensitive).add(FactAttribute);
A<ComparisonTests>().method((t) => t.has_prefix_has_suffix).add(FactAttribute);
A<ComparisonTests>().method((t) => t.has_prefix_and_suffix_without_overlap).add(FactAttribute);
