// position.test.ts — codex-048 Stage-1a probe. Pins that the parser now stamps
// real token-tight pos/end ranges onto literal + identifier leaf nodes via the
// #finishNode helper (mirroring tsgo internal/parser/parser.go finishNode,
// 5904-5917, MINUS the error-flag bit which is Stage 3). Before Stage 1a these
// leaves carried the factory default pos/end == -1; these probes would have
// failed against that state and now pass against the stamped ranges.
//
// nodeEnd is token-tight per codex-048 (i): the end of the just-consumed token,
// NOT the trivia-inclusive Scanner TokenFullStart (a tracked Stage-4 item).

import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  isBinaryExpression,
  isExpressionStatement,
  isIdentifier,
  isNumericLiteral,
  isStringLiteral,
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";

export class ParserPositionTests {
  // `x` -> Identifier covers exactly the single character: pos 0, end 1.
  stamps_identifier_leaf_with_token_tight_range(): void {
    const sourceFile = parseSourceFile("x");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isIdentifier(expression)) throw new Exception("Expected identifier");

    Assert.Equal(0, expression.pos);
    Assert.Equal(1, expression.end);
  }

  // `"hi"` -> StringLiteral range covers the quotes: pos 0, end 4.
  stamps_string_literal_leaf_covering_the_quotes(): void {
    const sourceFile = parseSourceFile("\"hi\"");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isStringLiteral(expression)) throw new Exception("Expected string literal");

    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
  }

  // `42` -> NumericLiteral range covers both digits: pos 0, end 2.
  stamps_numeric_literal_leaf_with_token_tight_range(): void {
    const sourceFile = parseSourceFile("42");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isNumericLiteral(expression)) throw new Exception("Expected numeric literal");

    Assert.Equal(0, expression.pos);
    Assert.Equal(2, expression.end);
  }

  // An identifier that does not start at offset 0 must carry its real start,
  // proving nodePos captures the current token start (not a constant 0).
  stamps_identifier_at_non_zero_offset(): void {
    const sourceFile = parseSourceFile("  abc");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isIdentifier(expression)) throw new Exception("Expected identifier");

    Assert.Equal(2, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("abc", expression.text);
  }

  // Both leaves of a binary expression carry real token-tight ranges, not the
  // factory default pos/end == -1. `foo + 7`: foo @ [0,3), 7 @ [6,7).
  literal_and_identifier_leaves_are_not_synthesized(): void {
    const sourceFile = parseSourceFile("foo + 7");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");

    const binary = statement.expression;
    if (!isBinaryExpression(binary)) throw new Exception("Expected binary expression");

    const left = binary.left;
    if (!isIdentifier(left)) throw new Exception("Expected identifier on the left");
    Assert.Equal(0, left.pos);
    Assert.Equal(3, left.end);

    const right = binary.right;
    if (!isNumericLiteral(right)) throw new Exception("Expected numeric literal on the right");
    Assert.Equal(6, right.pos);
    Assert.Equal(7, right.end);
  }
}

A<ParserPositionTests>().method((t) => t.stamps_identifier_leaf_with_token_tight_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_string_literal_leaf_covering_the_quotes).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_numeric_literal_leaf_with_token_tight_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_identifier_at_non_zero_offset).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.literal_and_identifier_leaves_are_not_synthesized).add(FactAttribute);
