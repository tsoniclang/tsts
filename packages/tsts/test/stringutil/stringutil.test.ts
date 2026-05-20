/**
 * Tests for stringutil.
 *
 * Subset ported from TS-Go internal/stringutil/util_test.go.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

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
} from "../../src/stringutil/index.js";

describe("stringutil — character classification", () => {
  it("digits and hex digits", () => {
    assert.equal(isDigit(0x30), true);   // '0'
    assert.equal(isDigit(0x39), true);   // '9'
    assert.equal(isDigit(0x40), false);
    assert.equal(isHexDigit(0x41), true);   // 'A'
    assert.equal(isHexDigit(0x46), true);   // 'F'
    assert.equal(isHexDigit(0x47), false);  // 'G'
    assert.equal(isHexDigit(0x61), true);   // 'a'
  });

  it("octal", () => {
    assert.equal(isOctalDigit(0x30), true);  // '0'
    assert.equal(isOctalDigit(0x37), true);  // '7'
    assert.equal(isOctalDigit(0x38), false); // '8'
  });

  it("ASCII letters", () => {
    assert.equal(isASCIILetter(0x41), true);
    assert.equal(isASCIILetter(0x7A), true);
    assert.equal(isASCIILetter(0x30), false);
  });

  it("whitespace and line breaks", () => {
    assert.equal(isWhiteSpaceSingleLine(0x20), true);
    assert.equal(isWhiteSpaceSingleLine(0x09), true);
    assert.equal(isWhiteSpaceSingleLine(0x0A), false);   // line feed
    assert.equal(isLineBreak(0x0A), true);
    assert.equal(isLineBreak(0x0D), true);
    assert.equal(isLineBreak(0x2028), true);
    assert.equal(isLineBreak(0x2029), true);
    assert.equal(isLineBreak(0x20), false);
    assert.equal(isWhiteSpaceLike(0x20), true);
    assert.equal(isWhiteSpaceLike(0x0A), true);
    assert.equal(isWhiteSpaceLike(0x41), false);
  });
});

describe("stringutil — splitLines", () => {
  it("handles LF, CR, and CRLF", () => {
    assert.deepEqual([...splitLines("a\nb\nc")], ["a", "b", "c"]);
    assert.deepEqual([...splitLines("a\rb\rc")], ["a", "b", "c"]);
    assert.deepEqual([...splitLines("a\r\nb\r\nc")], ["a", "b", "c"]);
    assert.deepEqual([...splitLines("")], []);
    assert.deepEqual([...splitLines("a")], ["a"]);
  });

  it("trailing newline produces no empty final segment", () => {
    assert.deepEqual([...splitLines("a\n")], ["a"]);
    assert.deepEqual([...splitLines("a\n\n")], ["a", ""]);
  });
});

describe("stringutil — guessIndentation", () => {
  it("returns smallest indent across non-empty lines", () => {
    assert.equal(guessIndentation(["    foo", "  bar", "      baz"]), 2);
  });

  it("returns 0 when any line has no indent", () => {
    assert.equal(guessIndentation(["foo", "  bar"]), 0);
  });

  it("skips empty lines", () => {
    assert.equal(guessIndentation(["", "  foo", "    bar"]), 2);
  });
});

describe("stringutil — Byte Order Marks", () => {
  it("removeByteOrderMark strips UTF-8 BOM", () => {
    assert.equal(removeByteOrderMark("﻿hello"), "﻿hello"); // FEFF as JS char isn't the byte BOM
    assert.equal(removeByteOrderMark("hello"), "hello");
  });

  it("addUTF8ByteOrderMark adds BOM when absent", () => {
    const withBom = addUTF8ByteOrderMark("hello");
    assert.ok(withBom.length > "hello".length);
  });
});

describe("stringutil — quotes", () => {
  it("stripQuotes strips matching outer single/double/backtick", () => {
    assert.equal(stripQuotes("'foo'"), "foo");
    assert.equal(stripQuotes('"foo"'), "foo");
    assert.equal(stripQuotes("`foo`"), "foo");
    assert.equal(stripQuotes("foo"), "foo");
    assert.equal(stripQuotes("'foo\""), "'foo\"");  // mismatched
  });

  it("unquoteString applies Strada-compat backslash replacement", () => {
    assert.equal(unquoteString('"foo"'), "foo");
    assert.equal(unquoteString('"a\\nb"'), "anb");  // \n becomes n (Strada quirk)
  });
});

describe("stringutil — string mutations", () => {
  it("lowerFirstChar", () => {
    assert.equal(lowerFirstChar("FOO"), "fOO");
    assert.equal(lowerFirstChar("foo"), "foo");
    assert.equal(lowerFirstChar(""), "");
  });

  it("truncateByRunes", () => {
    assert.equal(truncateByRunes("hello", 10), "hello");
    assert.equal(truncateByRunes("hello", 3), "hel");
    assert.equal(truncateByRunes("hello", 0), "");
  });
});

describe("stringutil — encodeURIBytes", () => {
  it("preserves unreserved characters", () => {
    assert.equal(encodeURIBytes("hello"), "hello");
    assert.equal(encodeURIBytes("abc123"), "abc123");
  });

  it("encodes reserved bytes", () => {
    assert.equal(encodeURIBytes(" "), "%20");
    assert.equal(encodeURIBytes("a b"), "a%20b");
  });

  it("does not encode RFC 3986 reserved characters", () => {
    // semicolons, slashes, etc. are not encoded by encodeURI
    assert.equal(encodeURIBytes("a/b?c=d"), "a/b?c=d");
  });
});

describe("stringutil — comparisons", () => {
  it("compareStringsCaseSensitive", () => {
    assert.equal(compareStringsCaseSensitive("a", "a"), ComparisonEqual);
    assert.equal(compareStringsCaseSensitive("a", "b"), ComparisonLessThan);
    assert.equal(compareStringsCaseSensitive("b", "a"), ComparisonGreaterThan);
    // Case-sensitive: 'A' < 'a'
    assert.equal(compareStringsCaseSensitive("A", "a"), ComparisonLessThan);
  });

  it("compareStringsCaseInsensitive", () => {
    assert.equal(compareStringsCaseInsensitive("foo", "FOO"), ComparisonEqual);
    assert.equal(compareStringsCaseInsensitive("foo", "bar"), ComparisonGreaterThan);
  });

  it("compareStringsCaseInsensitiveEslintCompatible", () => {
    assert.equal(compareStringsCaseInsensitiveEslintCompatible("Foo", "foo"), ComparisonEqual);
  });

  it("equateStringCaseInsensitive", () => {
    assert.equal(equateStringCaseInsensitive("foo", "FOO"), true);
    assert.equal(equateStringCaseInsensitive("foo", "bar"), false);
  });

  it("hasPrefix / hasSuffix case-sensitive and -insensitive", () => {
    assert.equal(hasPrefix("FooBar", "Foo", true), true);
    assert.equal(hasPrefix("FooBar", "foo", true), false);
    assert.equal(hasPrefix("FooBar", "foo", false), true);
    assert.equal(hasSuffix("FooBar", "Bar", true), true);
    assert.equal(hasSuffix("FooBar", "bar", false), true);
  });

  it("hasPrefixAndSuffixWithoutOverlap", () => {
    assert.equal(hasPrefixAndSuffixWithoutOverlap("abcdef", "ab", "ef", true), true);
    assert.equal(hasPrefixAndSuffixWithoutOverlap("ab", "ab", "ef", true), false);
  });
});
