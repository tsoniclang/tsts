import test from "node:test";
import assert from "node:assert/strict";

import { Kind } from "../ast/index.js";
import { scanAll } from "./index.js";

function kindsOf(source: string): readonly Kind[] {
  return scanAll(source).map((token) => token.kind);
}

function textsOf(source: string): readonly string[] {
  return scanAll(source).map((token) => token.text);
}

test("scans basic declarations with ts go syntax kind ids", () => {
  assert.deepStrictEqual(
    kindsOf("const answer: number = 42;"),
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
  );
});

test("preserves source spans and token text", () => {
  const tokens = scanAll("x += 1");

  assert.strictEqual(tokens.length, 4);
  assert.strictEqual(tokens[0]!.kind, Kind.Identifier);
  assert.strictEqual(tokens[0]!.pos, 0);
  assert.strictEqual(tokens[0]!.end, 1);
  assert.strictEqual(tokens[0]!.text, "x");

  assert.strictEqual(tokens[1]!.kind, Kind.PlusEqualsToken);
  assert.strictEqual(tokens[1]!.pos, 2);
  assert.strictEqual(tokens[1]!.end, 4);
  assert.strictEqual(tokens[1]!.text, "+=");

  assert.strictEqual(tokens[2]!.kind, Kind.NumericLiteral);
  assert.strictEqual(tokens[2]!.pos, 5);
  assert.strictEqual(tokens[2]!.end, 6);
  assert.strictEqual(tokens[2]!.text, "1");

  assert.strictEqual(tokens[3]!.kind, Kind.EndOfFile);
  assert.strictEqual(tokens[3]!.pos, 6);
  assert.strictEqual(tokens[3]!.end, 6);
  assert.strictEqual(tokens[3]!.text, "");
});

test("can expose trivia instead of skipping it", () => {
  assert.deepStrictEqual(textsOf("// c\nx"), ["x", ""]);
  assert.deepStrictEqual(
    scanAll("// c\nx", { skipTrivia: false }).map((token) => token.kind),
    [Kind.SingleLineCommentTrivia, Kind.NewLineTrivia, Kind.Identifier, Kind.EndOfFile],
  );
});

test("treats a leading shebang as skipped trivia", () => {
  assert.deepStrictEqual(
    kindsOf("#!/usr/bin/env node\nconst answer = 42;"),
    [
      Kind.ConstKeyword,
      Kind.Identifier,
      Kind.EqualsToken,
      Kind.NumericLiteral,
      Kind.SemicolonToken,
      Kind.EndOfFile,
    ],
  );
  // tsgo-faithful bare-scanner stream: scanner.go:880-888 SKIPS a leading
  // `#!...` shebang (continue, no token emitted) even with skipTrivia:false,
  // so the stream starts at the next real token (NewLineTrivia at the shebang's
  // terminating newline). The old batch scanner pre-emitted it as
  // SingleLineCommentTrivia; the faithful scanner drops it entirely.
  assert.deepStrictEqual(
    scanAll("#!/usr/bin/env node\nconst answer = 42;", { skipTrivia: false }).map((token) => token.kind),
    [
      Kind.NewLineTrivia,
      Kind.ConstKeyword,
      Kind.WhitespaceTrivia,
      Kind.Identifier,
      Kind.WhitespaceTrivia,
      Kind.EqualsToken,
      Kind.WhitespaceTrivia,
      Kind.NumericLiteral,
      Kind.SemicolonToken,
      Kind.EndOfFile,
    ],
  );
});

test("recognizes multi character punctuators greedily", () => {
  // tsgo-faithful bare-scanner stream: `??=` and `===` are scanned greedily as
  // single tokens, but `>>>=` is NOT merged. The faithful scanner scans one `>`
  // per token (scanner.go:803-804), so the run emits four tokens
  // (>, >, >, =); the parser recombines them via reScanGreaterThanToken. The
  // old batch scanner pre-merged the whole run into a single
  // GreaterThanGreaterThanGreaterThanEqualsToken.
  assert.deepStrictEqual(
    kindsOf("a ??= b === c >>>= d"),
    [
      Kind.Identifier,
      Kind.QuestionQuestionEqualsToken,
      Kind.Identifier,
      Kind.EqualsEqualsEqualsToken,
      Kind.Identifier,
      Kind.GreaterThanToken,
      Kind.GreaterThanToken,
      Kind.GreaterThanToken,
      Kind.EqualsToken,
      Kind.Identifier,
      Kind.EndOfFile,
    ],
  );
});

test("scans private identifiers regular expressions templates and numeric separators", () => {
  assert.deepStrictEqual(kindsOf("#value"), [Kind.PrivateIdentifier, Kind.EndOfFile]);
  // tsgo-faithful bare-scanner stream: the scanner does NOT pre-detect regex or
  // template continuations (no parser context). `/abc/g` is scanned as
  // SlashToken + Identifier(abc) + SlashToken + Identifier(g) — the parser
  // calls reScanSlashToken to recombine a RegularExpressionLiteral. After a
  // template `}` the scanner emits CloseBraceToken; with no parser-driven
  // reScanTemplateToken the following backtick starts a fresh template literal,
  // so `` ` 25_263_104`` is scanned (unterminated) as a single
  // NoSubstitutionTemplateLiteral. The old batch scanner pre-detected
  // RegularExpressionLiteral / TemplateTail via stateful look-back.
  assert.deepStrictEqual(
    kindsOf("const pattern = /abc/g; `hi ${name}` 25_263_104"),
    [
      Kind.ConstKeyword,
      Kind.Identifier,
      Kind.EqualsToken,
      Kind.SlashToken,
      Kind.Identifier,
      Kind.SlashToken,
      Kind.Identifier,
      Kind.SemicolonToken,
      Kind.TemplateHead,
      Kind.Identifier,
      Kind.CloseBraceToken,
      Kind.NoSubstitutionTemplateLiteral,
      Kind.EndOfFile,
    ],
  );
});
