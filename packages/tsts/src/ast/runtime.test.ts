import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  NodeFlags,
  SymbolFlags,
  createBinaryExpression,
  createExpressionStatement,
  createIdentifier,
  createJSImportDeclaration,
  createNodeArray,
  createNumericLiteral,
  createSourceFile,
  createStringLiteral,
  createToken,
  createVariableDeclaration,
  createVariableDeclarationList,
  forEachChild,
  isBinaryOperatorToken,
  isExpression,
  isIdentifier,
  isSourceFile,
  updateIdentifier,
  type BinaryOperatorToken,
  type EndOfFile,
  type Node,
  type NodeArray,
  type Statement,
  type VariableDeclaration,
} from "./index.js";

export class GeneratedAstRuntimeTests {
  creates_and_updates_schema_generated_nodes_through_typed_factories(): void {
    const identifier = createIdentifier("answer");

    Assert.Equal(Kind.Identifier, identifier.kind);
    Assert.Equal("answer", identifier.text);
    Assert.True(isIdentifier(identifier));
    Assert.True(isExpression(identifier));
    Assert.Equal(identifier, updateIdentifier(identifier, "answer"));

    const renamed = updateIdentifier(identifier, "total");
    Assert.NotEqual(identifier, renamed);
    Assert.Equal("total", renamed.text);
  }

  creates_instantiation_alias_token_nodes_with_exact_guards(): void {
    const plusToken = createToken(Kind.PlusToken) as BinaryOperatorToken;

    Assert.Equal(Kind.PlusToken, plusToken.kind);
    Assert.True(isBinaryOperatorToken(plusToken));
  }

  visits_schema_child_members_in_ts_go_member_order(): void {
    const left = createIdentifier("left");
    const operatorToken = createToken(Kind.PlusToken) as BinaryOperatorToken;
    const right = createNumericLiteral("1", 0);
    const expression = createBinaryExpression(undefined, left, undefined, operatorToken, right);
    const visitedKinds: Kind[] = [];

    forEachChild(expression, (node) => {
      visitedKinds.push(node.kind);
      return undefined;
    });

    Assert.Equal<readonly Kind[]>([Kind.Identifier, Kind.PlusToken, Kind.NumericLiteral], visitedKinds);
  }

  models_handwritten_source_file_with_generated_node_array_storage(): void {
    const expression = createExpressionStatement(createIdentifier("x"));
    const endOfFileToken = createToken(Kind.EndOfFile) as EndOfFile;
    const sourceFile = createSourceFile("input.ts", "input.ts" as never, "x;", createNodeArray([expression]) as NodeArray<Statement>, endOfFileToken, [], 0, 0);
    const visited: Node[] = [];

    Assert.Equal(Kind.SourceFile, sourceFile.kind);
    Assert.True(isSourceFile(sourceFile));

    forEachChild(sourceFile, (node) => {
      visited.push(node);
      return undefined;
    });

    Assert.Equal<readonly Node[]>([expression, endOfFileToken], visited);
  }

  preserves_ts_go_node_and_symbol_flag_values(): void {
    Assert.Equal(1, NodeFlags.Let);
    Assert.Equal(2, NodeFlags.Const);
    Assert.Equal(7, NodeFlags.BlockScoped);
    Assert.Equal(6, NodeFlags.AwaitUsing);
    Assert.Equal(25_263_104, NodeFlags.ContextFlags);
    Assert.Equal(1, SymbolFlags.FunctionScopedVariable);
    Assert.Equal(2, SymbolFlags.BlockScopedVariable);
    Assert.Equal(111_551, SymbolFlags.Value);
    Assert.Equal(788_968, SymbolFlags.Type);
    Assert.Equal(1_073_741_823, SymbolFlags.All);
  }

  maps_schema_flags_members_onto_node_flags_and_wires_parent_links_generically(): void {
    const name = createIdentifier("answer");
    const declaration = createVariableDeclaration(name, undefined, undefined, createNumericLiteral("42", 0));
    const declarations = createNodeArray([declaration]) as NodeArray<VariableDeclaration>;
    const list = createVariableDeclarationList(declarations, NodeFlags.Const);

    Assert.Equal(NodeFlags.Const, list.flags);
    Assert.Equal(list, declaration.parent);
    Assert.Equal(declaration, name.parent);
    Assert.Equal(declaration, declaration.initializer?.parent);
  }

  generates_separate_factories_for_ts_go_multi_kind_node_definitions(): void {
    const moduleSpecifier = createStringLiteral("./dep", 0);
    const importDeclaration = createJSImportDeclaration(undefined, undefined, moduleSpecifier, undefined);

    Assert.Equal(Kind.JSImportDeclaration, importDeclaration.kind);
    Assert.Equal(moduleSpecifier, importDeclaration.moduleSpecifier);
    Assert.Equal(importDeclaration, moduleSpecifier.parent);
  }
}

A<GeneratedAstRuntimeTests>().method((t) => t.creates_and_updates_schema_generated_nodes_through_typed_factories).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.creates_instantiation_alias_token_nodes_with_exact_guards).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.visits_schema_child_members_in_ts_go_member_order).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.models_handwritten_source_file_with_generated_node_array_storage).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.preserves_ts_go_node_and_symbol_flag_values).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.maps_schema_flags_members_onto_node_flags_and_wires_parent_links_generically).add(FactAttribute);
A<GeneratedAstRuntimeTests>().method((t) => t.generates_separate_factories_for_ts_go_multi_kind_node_definitions).add(FactAttribute);
