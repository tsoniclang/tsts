import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind, KindAliases, KindMarkers, KindNames, KindValues } from "../ast/generated/kind.js";
import { BaseDefinitions, ListAliases, NodeAliases, NodeDefinitions, NodeExtendsByName, NodeKindByName, NodeMembersByName, NodeNames } from "../ast/generated/schema.js";

interface MemberShape {
  readonly name: string;
  readonly type?: string | readonly string[];
  readonly inherited?: boolean;
  readonly private?: boolean;
  readonly optional?: boolean;
  readonly list?: string;
  readonly visit?: string;
}

function assertMembersByName(nodeName: string, expected: readonly MemberShape[]): void {
  const actual = NodeMembersByName[nodeName];
  Assert.NotUndefined(actual);
  Assert.Equal(expected.length, actual.length);
  for (let index = 0; index < expected.length; index += 1) {
    const expectedMember = expected[index]!;
    const actualMember = actual[index]!;
    Assert.Equal(expectedMember.name, actualMember.name);
    if (expectedMember.type === undefined) {
      Assert.True(actualMember.type === undefined);
    } else {
      Assert.Equal(expectedMember.type, actualMember.type as string | readonly string[]);
    }
    Assert.Equal(expectedMember.inherited ?? false, actualMember.inherited ?? false);
    Assert.Equal(expectedMember.private ?? false, actualMember.private ?? false);
    Assert.Equal(expectedMember.optional ?? false, actualMember.optional ?? false);
    Assert.Equal(expectedMember.list ?? "", actualMember.list ?? "");
    Assert.Equal(expectedMember.visit ?? "", actualMember.visit ?? "");
  }
}

export class SchemaContractTests {
  preserves_ts_go_kind_ids_instead_of_ts6_kind_ids(): void {
    Assert.Equal(1, Kind.EndOfFile);
    Assert.Equal(79, Kind.Identifier);
    Assert.Equal(307, Kind.SourceFile);
    Assert.Equal(263, Kind.FunctionDeclaration);
    Assert.Equal(254, Kind.ReturnStatement);
    Assert.Equal(184, Kind.TypeReference);
    Assert.False(Object.hasOwn(KindValues, "EndOfFileToken"));
    Assert.False(Object.hasOwn(KindValues, "ShebangTrivia"));
  }

  preserves_schema_cardinalities(): void {
    Assert.Equal(351, KindNames.length);
    Assert.Equal(34, Object.keys(KindMarkers).length);
    Assert.Equal(192, NodeNames.length);
    Assert.Equal(35, Object.keys(BaseDefinitions).length);
    Assert.Equal(71, Object.keys(NodeAliases).length);
    Assert.Equal(23, Object.keys(ListAliases).length);
    Assert.True(Object.keys(KindAliases).length > 0);
  }

  preserves_source_file_shape(): void {
    Assert.Equal("SourceFile", NodeKindByName.SourceFile);
    Assert.Equal<readonly string[]>(["NodeBase", "DeclarationBase", "LocalsContainerBase", "CompositeBase"], NodeExtendsByName.SourceFile);
    assertMembersByName("SourceFile", [
      { name: "Statements", type: "Statement", list: "NodeList", visit: "topLevelStatements" },
      { name: "EndOfFileToken", type: "EndOfFile" },
    ]);
  }

  preserves_parameter_declaration_as_ts_go_parameter_kind(): void {
    Assert.Equal("Parameter", NodeKindByName.ParameterDeclaration);
    assertMembersByName("ParameterDeclaration", [
      { name: "modifiers", inherited: true },
      { name: "DotDotDotToken", type: "DotDotDotToken", optional: true },
      { name: "name", type: "BindingName", private: true },
      { name: "QuestionToken", type: "QuestionToken", optional: true },
      { name: "Type", type: "TypeNode", optional: true },
      { name: "Initializer", type: "Expression", optional: true },
    ]);
  }

  preserves_identifier_shape(): void {
    Assert.Equal("Identifier", NodeKindByName.Identifier);
    Assert.Equal<readonly string[]>(["PrimaryExpressionBase", "FlowNodeBase"], NodeExtendsByName.Identifier);
    assertMembersByName("Identifier", [{ name: "Text", type: "string" }]);
  }

  keeps_raw_node_definitions_available_for_generator_consumers(): void {
    Assert.True(NodeDefinitions.SourceFile.handWritten);
    Assert.True(NodeDefinitions.Identifier.arena);
    Assert.Equal("ParameterDeclaration", ListAliases.ParameterList);
    Assert.Equal<readonly string[]>(["Identifier", "BindingPattern"], NodeAliases.BindingName);
  }
}

A<SchemaContractTests>().method((t) => t.preserves_ts_go_kind_ids_instead_of_ts6_kind_ids).add(FactAttribute);
A<SchemaContractTests>().method((t) => t.preserves_schema_cardinalities).add(FactAttribute);
A<SchemaContractTests>().method((t) => t.preserves_source_file_shape).add(FactAttribute);
A<SchemaContractTests>().method((t) => t.preserves_parameter_declaration_as_ts_go_parameter_kind).add(FactAttribute);
A<SchemaContractTests>().method((t) => t.preserves_identifier_shape).add(FactAttribute);
A<SchemaContractTests>().method((t) => t.keeps_raw_node_definitions_available_for_generator_consumers).add(FactAttribute);
