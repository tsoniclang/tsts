import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Kind } from "../../src/ast/index.js";
import { scanAll } from "../../src/scanner/index.js";

function kindsOf(source: string): readonly Kind[] {
  return scanAll(source).map(token => token.kind);
}

function textsOf(source: string): readonly string[] {
  return scanAll(source).map(token => token.text);
}

describe("TS-Go scanner groundwork", () => {
  it("scans basic declarations with TS-Go SyntaxKind ids", () => {
    assert.deepEqual(kindsOf("const answer: number = 42;"), [
      Kind.ConstKeyword,
      Kind.Identifier,
      Kind.ColonToken,
      Kind.NumberKeyword,
      Kind.EqualsToken,
      Kind.NumericLiteral,
      Kind.SemicolonToken,
      Kind.EndOfFile,
    ]);
  });

  it("preserves source spans and token text", () => {
    const tokens = scanAll("x += 1");

    assert.deepEqual(tokens.map(token => [token.kind, token.pos, token.end, token.text]), [
      [Kind.Identifier, 0, 1, "x"],
      [Kind.PlusEqualsToken, 2, 4, "+="],
      [Kind.NumericLiteral, 5, 6, "1"],
      [Kind.EndOfFile, 6, 6, ""],
    ]);
  });

  it("can expose trivia instead of skipping it", () => {
    assert.deepEqual(textsOf("// c\nx"), ["x", ""]);
    assert.deepEqual(scanAll("// c\nx", { skipTrivia: false }).map(token => token.kind), [
      Kind.SingleLineCommentTrivia,
      Kind.NewLineTrivia,
      Kind.Identifier,
      Kind.EndOfFile,
    ]);
  });

  it("treats a leading shebang as single-line trivia", () => {
    assert.deepEqual(kindsOf("#!/usr/bin/env node\nconst answer = 42;"), [
      Kind.ConstKeyword,
      Kind.Identifier,
      Kind.EqualsToken,
      Kind.NumericLiteral,
      Kind.SemicolonToken,
      Kind.EndOfFile,
    ]);
    assert.deepEqual(scanAll("#!/usr/bin/env node\nconst answer = 42;", { skipTrivia: false }).map(token => token.kind), [
      Kind.SingleLineCommentTrivia,
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
    ]);
  });

  it("recognizes multi-character punctuators greedily", () => {
    assert.deepEqual(kindsOf("a ??= b === c >>>= d"), [
      Kind.Identifier,
      Kind.QuestionQuestionEqualsToken,
      Kind.Identifier,
      Kind.EqualsEqualsEqualsToken,
      Kind.Identifier,
      Kind.GreaterThanGreaterThanGreaterThanEqualsToken,
      Kind.Identifier,
      Kind.EndOfFile,
    ]);
  });
});
