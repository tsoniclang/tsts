import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Kind, KindAliases, KindMarkers, KindNames, KindValues } from "../../src/ast/generated/kind.js";
import { BaseDefinitions, ListAliases, NodeAliases, NodeDefinitions, NodeExtendsByName, NodeKindByName, NodeMembersByName, NodeNames } from "../../src/ast/generated/schema.js";

describe("TS-Go schema contract", () => {
  it("preserves TS-Go kind ids instead of TS 6 kind ids", () => {
    assert.equal(Kind.EndOfFile, 1);
    assert.equal(Kind.Identifier, 79);
    assert.equal(Kind.SourceFile, 307);
    assert.equal(Kind.FunctionDeclaration, 263);
    assert.equal(Kind.ReturnStatement, 254);
    assert.equal(Kind.TypeReference, 184);
    assert.equal(Object.hasOwn(KindValues, "EndOfFileToken"), false);
    assert.equal(Object.hasOwn(KindValues, "ShebangTrivia"), false);
  });

  it("preserves schema cardinalities", () => {
    assert.equal(KindNames.length, 351);
    assert.equal(Object.keys(KindMarkers).length, 34);
    assert.equal(NodeNames.length, 192);
    assert.equal(Object.keys(BaseDefinitions).length, 35);
    assert.equal(Object.keys(NodeAliases).length, 71);
    assert.equal(Object.keys(ListAliases).length, 23);
    assert.ok(Object.keys(KindAliases).length > 0);
  });

  it("preserves SourceFile shape", () => {
    assert.equal(NodeKindByName.SourceFile, "SourceFile");
    assert.deepEqual(NodeExtendsByName.SourceFile, ["NodeBase", "DeclarationBase", "LocalsContainerBase", "CompositeBase"]);
    assert.deepEqual(NodeMembersByName.SourceFile, [
      {
        name: "Statements",
        type: "Statement",
        list: "NodeList",
        visit: "topLevelStatements",
      },
      {
        name: "EndOfFileToken",
        type: "EndOfFile",
      },
    ]);
  });

  it("preserves ParameterDeclaration as TS-Go Parameter kind", () => {
    assert.equal(NodeKindByName.ParameterDeclaration, "Parameter");
    assert.deepEqual(NodeMembersByName.ParameterDeclaration, [
      {
        name: "modifiers",
        inherited: true,
      },
      {
        name: "DotDotDotToken",
        type: "DotDotDotToken",
        optional: true,
      },
      {
        name: "name",
        type: "BindingName",
        private: true,
      },
      {
        name: "QuestionToken",
        type: "QuestionToken",
        optional: true,
      },
      {
        name: "Type",
        type: "TypeNode",
        optional: true,
      },
      {
        name: "Initializer",
        type: "Expression",
        optional: true,
      },
    ]);
  });

  it("preserves Identifier shape", () => {
    assert.equal(NodeKindByName.Identifier, "Identifier");
    assert.deepEqual(NodeExtendsByName.Identifier, ["PrimaryExpressionBase", "FlowNodeBase"]);
    assert.deepEqual(NodeMembersByName.Identifier, [
      {
        name: "Text",
        type: "string",
      },
    ]);
  });

  it("keeps raw node definitions available for generator consumers", () => {
    assert.equal(NodeDefinitions.SourceFile.handWritten, true);
    assert.equal(NodeDefinitions.Identifier.arena, true);
    assert.deepEqual(ListAliases.ParameterList, "ParameterDeclaration");
    assert.deepEqual(NodeAliases.BindingName, ["Identifier", "BindingPattern"]);
  });
});
