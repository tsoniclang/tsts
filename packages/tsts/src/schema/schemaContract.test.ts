import test from "node:test";
import assert from "node:assert/strict";

import { Kind, KindAliases, KindMarkers, KindNames, KindValues } from "../ast/generated/kind.js";
import { BaseDefinitions, ListAliases, NodeAliases, NodeDefinitions, NodeExtendsByName, NodeKindByName, NodeMembersByName, NodeNames } from "../ast/generated/schema.js";

test("preserves ts go kind ids instead of ts6 kind ids", () => {
  assert.strictEqual(Kind.EndOfFile, 1);
  assert.strictEqual(Kind.Identifier, 79);
  assert.strictEqual(Kind.SourceFile, 307);
  assert.strictEqual(Kind.FunctionDeclaration, 263);
  assert.strictEqual(Kind.ReturnStatement, 254);
  assert.strictEqual(Kind.TypeReference, 184);
  assert.ok(!Object.hasOwn(KindValues, "EndOfFileToken"));
  assert.ok(!Object.hasOwn(KindValues, "ShebangTrivia"));
});

test("preserves schema cardinalities", () => {
  assert.strictEqual(KindNames.length, 351);
  assert.strictEqual(Object.keys(KindMarkers).length, 34);
  assert.strictEqual(NodeNames.length, 192);
  assert.strictEqual(Object.keys(BaseDefinitions).length, 35);
  assert.strictEqual(Object.keys(NodeAliases).length, 71);
  assert.strictEqual(Object.keys(ListAliases).length, 23);
  assert.ok(Object.keys(KindAliases).length > 0);
});

test("preserves source file shape", () => {
  assert.strictEqual(NodeKindByName.SourceFile, "SourceFile");
  assert.deepStrictEqual(NodeExtendsByName.SourceFile, ["NodeBase", "DeclarationBase", "LocalsContainerBase", "CompositeBase"]);
  // Deep object equality through ts-go shape; left as runtime comparison on stringified shape:
  assert.strictEqual(
    JSON.stringify(NodeMembersByName.SourceFile),
    JSON.stringify([
      { name: "Statements", type: "Statement", list: "NodeList", visit: "topLevelStatements" },
      { name: "EndOfFileToken", type: "EndOfFile" },
    ]),
  );
});

test("preserves parameter declaration as ts go parameter kind", () => {
  assert.strictEqual(NodeKindByName.ParameterDeclaration, "Parameter");
  assert.strictEqual(
    JSON.stringify(NodeMembersByName.ParameterDeclaration),
    JSON.stringify([
      { name: "modifiers", inherited: true },
      { name: "DotDotDotToken", type: "DotDotDotToken", optional: true },
      { name: "name", type: "BindingName", private: true },
      { name: "QuestionToken", type: "QuestionToken", optional: true },
      { name: "Type", type: "TypeNode", optional: true },
      { name: "Initializer", type: "Expression", optional: true },
    ]),
  );
});

test("preserves identifier shape", () => {
  assert.strictEqual(NodeKindByName.Identifier, "Identifier");
  assert.deepStrictEqual(NodeExtendsByName.Identifier, ["PrimaryExpressionBase", "FlowNodeBase"]);
  assert.strictEqual(
    JSON.stringify(NodeMembersByName.Identifier),
    JSON.stringify([{ name: "Text", type: "string" }]),
  );
});

test("keeps raw node definitions available for generator consumers", () => {
  assert.ok(NodeDefinitions.SourceFile.handWritten);
  assert.ok(NodeDefinitions.Identifier.arena);
  assert.strictEqual(ListAliases.ParameterList, "ParameterDeclaration");
  assert.deepStrictEqual(NodeAliases.BindingName, ["Identifier", "BindingPattern"]);
});
