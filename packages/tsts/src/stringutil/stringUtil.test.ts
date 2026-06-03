import test from "node:test";
import assert from "node:assert/strict";

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

test("digits and hex digits", () => {
  assert.ok(isDigit(0x30));
  assert.ok(isDigit(0x39));
  assert.ok(!isDigit(0x40));
  assert.ok(isHexDigit(0x41));
  assert.ok(isHexDigit(0x46));
  assert.ok(!isHexDigit(0x47));
  assert.ok(isHexDigit(0x61));
});

test("octal", () => {
  assert.ok(isOctalDigit(0x30));
  assert.ok(isOctalDigit(0x37));
  assert.ok(!isOctalDigit(0x38));
});

test("ascii letters", () => {
  assert.ok(isASCIILetter(0x41));
  assert.ok(isASCIILetter(0x7A));
  assert.ok(!isASCIILetter(0x30));
});

test("whitespace and line breaks", () => {
  assert.ok(isWhiteSpaceSingleLine(0x20));
  assert.ok(isWhiteSpaceSingleLine(0x09));
  assert.ok(!isWhiteSpaceSingleLine(0x0A));
  assert.ok(isLineBreak(0x0A));
  assert.ok(isLineBreak(0x0D));
  assert.ok(isLineBreak(0x2028));
  assert.ok(isLineBreak(0x2029));
  assert.ok(!isLineBreak(0x20));
  assert.ok(isWhiteSpaceLike(0x20));
  assert.ok(isWhiteSpaceLike(0x0A));
  assert.ok(!isWhiteSpaceLike(0x41));
});

test("splitLines handles lf cr and crlf", () => {
  assert.deepStrictEqual([...splitLines("a\nb\nc")], ["a", "b", "c"]);
  assert.deepStrictEqual([...splitLines("a\rb\rc")], ["a", "b", "c"]);
  assert.deepStrictEqual([...splitLines("a\r\nb\r\nc")], ["a", "b", "c"]);
  assert.deepStrictEqual([...splitLines("")], []);
  assert.deepStrictEqual([...splitLines("a")], ["a"]);
});

test("splitLines trailing newline produces no empty final segment", () => {
  assert.deepStrictEqual([...splitLines("a\n")], ["a"]);
  assert.deepStrictEqual([...splitLines("a\n\n")], ["a", ""]);
});

test("guessIndentation returns smallest indent across non empty lines", () => {
  assert.strictEqual(guessIndentation(["    foo", "  bar", "      baz"]), 2);
});

test("guessIndentation returns zero when any line has no indent", () => {
  assert.strictEqual(guessIndentation(["foo", "  bar"]), 0);
});

test("guessIndentation skips empty lines", () => {
  assert.strictEqual(guessIndentation(["", "  foo", "    bar"]), 2);
});

test("removeByteOrderMark strips utf8 bom", () => {
  assert.strictEqual(removeByteOrderMark("﻿hello"), "﻿hello");
  assert.strictEqual(removeByteOrderMark("hello"), "hello");
});

test("addUTF8ByteOrderMark adds bom when absent", () => {
  const withBom = addUTF8ByteOrderMark("hello");
  assert.ok(withBom.length > "hello".length);
});

test("stripQuotes strips matching outer", () => {
  assert.strictEqual(stripQuotes("'foo'"), "foo");
  assert.strictEqual(stripQuotes('"foo"'), "foo");
  assert.strictEqual(stripQuotes("`foo`"), "foo");
  assert.strictEqual(stripQuotes("foo"), "foo");
  assert.strictEqual(stripQuotes("'foo\""), "'foo\"");
});

test("unquoteString applies strada compat backslash replacement", () => {
  assert.strictEqual(unquoteString('"foo"'), "foo");
  assert.strictEqual(unquoteString('"a\\nb"'), "anb");
});

test("lowerFirstChar", () => {
  assert.strictEqual(lowerFirstChar("FOO"), "fOO");
  assert.strictEqual(lowerFirstChar("foo"), "foo");
  assert.strictEqual(lowerFirstChar(""), "");
});

test("truncateByRunes", () => {
  assert.strictEqual(truncateByRunes("hello", 10), "hello");
  assert.strictEqual(truncateByRunes("hello", 3), "hel");
  assert.strictEqual(truncateByRunes("hello", 0), "");
});

test("encodeURIBytes preserves unreserved characters", () => {
  assert.strictEqual(encodeURIBytes("hello"), "hello");
  assert.strictEqual(encodeURIBytes("abc123"), "abc123");
});

test("encodeURIBytes encodes reserved bytes", () => {
  assert.strictEqual(encodeURIBytes(" "), "%20");
  assert.strictEqual(encodeURIBytes("a b"), "a%20b");
});

test("encodeURIBytes does not encode rfc3986 reserved characters", () => {
  assert.strictEqual(encodeURIBytes("a/b?c=d"), "a/b?c=d");
});

test("compareStringsCaseSensitive", () => {
  assert.strictEqual(compareStringsCaseSensitive("a", "a"), ComparisonEqual);
  assert.strictEqual(compareStringsCaseSensitive("a", "b"), ComparisonLessThan);
  assert.strictEqual(compareStringsCaseSensitive("b", "a"), ComparisonGreaterThan);
  assert.strictEqual(compareStringsCaseSensitive("A", "a"), ComparisonLessThan);
});

test("compareStringsCaseInsensitive", () => {
  assert.strictEqual(compareStringsCaseInsensitive("foo", "FOO"), ComparisonEqual);
  assert.strictEqual(compareStringsCaseInsensitive("foo", "bar"), ComparisonGreaterThan);
});

test("compareStringsCaseInsensitiveEslintCompatible", () => {
  assert.strictEqual(
    compareStringsCaseInsensitiveEslintCompatible("Foo", "foo"),
    ComparisonEqual
  );
});

test("equateStringCaseInsensitive", () => {
  assert.ok(equateStringCaseInsensitive("foo", "FOO"));
  assert.ok(!equateStringCaseInsensitive("foo", "bar"));
});

test("hasPrefix hasSuffix", () => {
  assert.ok(hasPrefix("FooBar", "Foo", true));
  assert.ok(!hasPrefix("FooBar", "foo", true));
  assert.ok(hasPrefix("FooBar", "foo", false));
  assert.ok(hasSuffix("FooBar", "Bar", true));
  assert.ok(hasSuffix("FooBar", "bar", false));
});

test("hasPrefixAndSuffixWithoutOverlap", () => {
  assert.ok(hasPrefixAndSuffixWithoutOverlap("abcdef", "ab", "ef", true));
  assert.ok(!hasPrefixAndSuffixWithoutOverlap("ab", "ab", "ef", true));
});
