import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind } from "../ast/index.js";
import { scanAll } from "./index.js";

function kindsOf(source: string): readonly Kind[] {
  return scanAll(source).map((token) => token.kind);
}

function textsOf(source: string): readonly string[] {
  return scanAll(source).map((token) => token.text);
}

export class ScannerGroundworkTests {
  scans_basic_declarations_with_ts_go_syntax_kind_ids(): void {
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
      kindsOf("const answer: number = 42;"),
    );
  }

  preserves_source_spans_and_token_text(): void {
    const tokens = scanAll("x += 1");

    Assert.Equal(4, tokens.length);
    Assert.Equal(Kind.Identifier, tokens[0]!.kind);
    Assert.Equal(0, tokens[0]!.pos);
    Assert.Equal(1, tokens[0]!.end);
    Assert.Equal("x", tokens[0]!.text);

    Assert.Equal(Kind.PlusEqualsToken, tokens[1]!.kind);
    Assert.Equal(2, tokens[1]!.pos);
    Assert.Equal(4, tokens[1]!.end);
    Assert.Equal("+=", tokens[1]!.text);

    Assert.Equal(Kind.NumericLiteral, tokens[2]!.kind);
    Assert.Equal(5, tokens[2]!.pos);
    Assert.Equal(6, tokens[2]!.end);
    Assert.Equal("1", tokens[2]!.text);

    Assert.Equal(Kind.EndOfFile, tokens[3]!.kind);
    Assert.Equal(6, tokens[3]!.pos);
    Assert.Equal(6, tokens[3]!.end);
    Assert.Equal("", tokens[3]!.text);
  }

  can_expose_trivia_instead_of_skipping_it(): void {
    Assert.Equal<readonly string[]>(["x", ""], textsOf("// c\nx"));
    Assert.Equal<readonly Kind[]>(
      [Kind.SingleLineCommentTrivia, Kind.NewLineTrivia, Kind.Identifier, Kind.EndOfFile],
      scanAll("// c\nx", { skipTrivia: false }).map((token) => token.kind),
    );
  }

  treats_a_leading_shebang_as_single_line_trivia(): void {
    Assert.Equal<readonly Kind[]>(
      [
        Kind.ConstKeyword,
        Kind.Identifier,
        Kind.EqualsToken,
        Kind.NumericLiteral,
        Kind.SemicolonToken,
        Kind.EndOfFile,
      ],
      kindsOf("#!/usr/bin/env node\nconst answer = 42;"),
    );
    Assert.Equal<readonly Kind[]>(
      [
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
      ],
      scanAll("#!/usr/bin/env node\nconst answer = 42;", { skipTrivia: false }).map((token) => token.kind),
    );
  }

  recognizes_multi_character_punctuators_greedily(): void {
    Assert.Equal<readonly Kind[]>(
      [
        Kind.Identifier,
        Kind.QuestionQuestionEqualsToken,
        Kind.Identifier,
        Kind.EqualsEqualsEqualsToken,
        Kind.Identifier,
        Kind.GreaterThanGreaterThanGreaterThanEqualsToken,
        Kind.Identifier,
        Kind.EndOfFile,
      ],
      kindsOf("a ??= b === c >>>= d"),
    );
  }

  scans_private_identifiers_regular_expressions_templates_and_numeric_separators(): void {
    Assert.Equal<readonly Kind[]>([Kind.PrivateIdentifier, Kind.EndOfFile], kindsOf("#value"));
    Assert.Equal<readonly Kind[]>(
      [
        Kind.ConstKeyword,
        Kind.Identifier,
        Kind.EqualsToken,
        Kind.RegularExpressionLiteral,
        Kind.SemicolonToken,
        Kind.TemplateHead,
        Kind.Identifier,
        Kind.CloseBraceToken,
        Kind.TemplateTail,
        Kind.NumericLiteral,
        Kind.EndOfFile,
      ],
      kindsOf("const pattern = /abc/g; `hi ${name}` 25_263_104"),
    );
  }
}

A<ScannerGroundworkTests>().method((t) => t.scans_basic_declarations_with_ts_go_syntax_kind_ids).add(FactAttribute);
A<ScannerGroundworkTests>().method((t) => t.preserves_source_spans_and_token_text).add(FactAttribute);
A<ScannerGroundworkTests>().method((t) => t.can_expose_trivia_instead_of_skipping_it).add(FactAttribute);
A<ScannerGroundworkTests>().method((t) => t.treats_a_leading_shebang_as_single_line_trivia).add(FactAttribute);
A<ScannerGroundworkTests>().method((t) => t.recognizes_multi_character_punctuators_greedily).add(FactAttribute);
A<ScannerGroundworkTests>().method((t) => t.scans_private_identifiers_regular_expressions_templates_and_numeric_separators).add(FactAttribute);
