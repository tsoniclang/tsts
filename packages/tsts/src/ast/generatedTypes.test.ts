import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  SyntaxKind,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingPattern,
  type ForInOrOfStatement,
  type Modifier,
  type ModifierSyntaxKind,
  type NodeArray,
  type NullLiteral,
  type ParameterDeclaration,
  type PseudoLiteralSyntaxKind,
  type SourceFile,
  type Statement,
  type TemplateLiteralLikeNode,
  type EndOfFile,
} from "./index.js";

type Equal<Actual, Expected> =
  (<T>() => T extends Actual ? 1 : 2) extends
  (<T>() => T extends Expected ? 1 : 2) ? true : false;

function assertType<_T extends true>(): void {}

export class GeneratedAstTypeSurfaceTests {
  exports_syntax_kind_as_a_value_alias_for_kind(): void {
    Assert.Equal(Kind.Identifier, SyntaxKind.Identifier);
    Assert.Equal(Kind.SourceFile, SyntaxKind.SourceFile);
  }

  preserves_token_aliases_without_lowering_kind_unions_to_enum_members(): void {
    assertType<Equal<EndOfFile["kind"], Kind.EndOfFile>>();
    assertType<Equal<BinaryOperatorToken["kind"], BinaryOperator>>();
  }

  resolves_syntax_kind_aliases_to_node_token_aliases_for_node_unions(): void {
    assertType<Equal<Modifier["kind"], ModifierSyntaxKind>>();
    assertType<Equal<TemplateLiteralLikeNode["kind"], PseudoLiteralSyntaxKind>>();
  }

  expands_ts_go_multi_kind_implementation_nodes_into_exact_variant_unions(): void {
    assertType<Equal<ForInOrOfStatement["kind"], Kind.ForInStatement | Kind.ForOfStatement>>();
    assertType<Equal<BindingPattern["kind"], Kind.ObjectBindingPattern | Kind.ArrayBindingPattern>>();
  }

  includes_multi_kind_statement_implementations_in_base_derived_node_aliases(): void {
    assertType<ForInOrOfStatement extends Statement ? true : false>();
  }

  keeps_handwritten_source_file_and_schema_generated_node_fields_aligned(): void {
    assertType<Equal<SourceFile["statements"], NodeArray<Statement>>>();
    assertType<Equal<ParameterDeclaration["kind"], Kind.Parameter>>();
    assertType<Equal<NullLiteral["kind"], Kind.NullKeyword>>();
  }
}

A<GeneratedAstTypeSurfaceTests>().method((t) => t.exports_syntax_kind_as_a_value_alias_for_kind).add(FactAttribute);
A<GeneratedAstTypeSurfaceTests>().method((t) => t.preserves_token_aliases_without_lowering_kind_unions_to_enum_members).add(FactAttribute);
A<GeneratedAstTypeSurfaceTests>().method((t) => t.resolves_syntax_kind_aliases_to_node_token_aliases_for_node_unions).add(FactAttribute);
A<GeneratedAstTypeSurfaceTests>().method((t) => t.expands_ts_go_multi_kind_implementation_nodes_into_exact_variant_unions).add(FactAttribute);
A<GeneratedAstTypeSurfaceTests>().method((t) => t.includes_multi_kind_statement_implementations_in_base_derived_node_aliases).add(FactAttribute);
A<GeneratedAstTypeSurfaceTests>().method((t) => t.keeps_handwritten_source_file_and_schema_generated_node_fields_aligned).add(FactAttribute);
