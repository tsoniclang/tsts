import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { loadParser, parseSource } from "./parser-runtime.mjs";
import { canonicalSchema, canonicalSchemaCoverage } from "./tsgo-canonical-schema.mjs";

const sourcePin = JSON.parse(readFileSync(new URL("../source-pin.json", import.meta.url), "utf8"));

test("parser is fixed to the complete pinned TS-Go schema contract", async () => {
  assert.deepEqual(canonicalSchemaCoverage(), { concreteKindCount: 351, plannedKindCount: 351 });
  assert.deepEqual(canonicalSchema().kindTypesOf("TypeAliasDeclaration").kindNames, [
    "TypeAliasDeclaration",
    "JSTypeAliasDeclaration",
  ]);
  const first = await loadParser();
  assert.equal(await loadParser(), first);
  assert.deepEqual(first.parserIdentity, { kind: "pinned-tsgo", revision: sourcePin.revision });
  await assert.rejects(loadParser({}), /selection is fixed by the pinned TS-Go source contract/);
});

test("parser rejects noncanonical source identities before TS-Go entry", async () => {
  const api = await loadParser();
  assert.throws(() => parseSource(api, "one/../two.ts", ""), /normalized absolute TS-Go path/);
  assert.throws(() => parseSource(api, "one\\two.ts", ""), /normalized absolute TS-Go path/);
});

test("parser preserves exact declaration evidence and opaque function bodies", async () => {
  const api = await loadParser();
  const text = `/** doc */
export function read<T extends object>(value: T): T { const hidden = value; return hidden; }
export interface Box<T> { readonly value: T; }
export class Item { static count: number = 0; }
export const enum Mode { Read = 1, Write = 2 }
export type Pair<T> = readonly [T, T];
`;
  const source = parseSource(api, "declarations.ts", text);
  assert.deepEqual(source.Statements.Nodes.map((statement) => api.kindName.get(statement.Kind)), [
    "KindFunctionDeclaration",
    "KindInterfaceDeclaration",
    "KindClassDeclaration",
    "KindEnumDeclaration",
    "KindTypeAliasDeclaration",
  ]);
  const declaration = source.Statements.Nodes[0];
  assert.equal(declaration.name.Text, "read");
  assert.equal(declaration.TypeParameters.Nodes[0].name.Text, "T");
  assert.equal(api.kindName.get(declaration.TypeParameters.Nodes[0].Constraint.Kind), "KindObjectKeyword");
  assert.equal(api.Node_JSDoc(declaration).length, 1);
  assert.equal(declaration.Body.__porterOpaqueImplementation, true);
  assert.deepEqual(declaration.Body.__porterChildren, []);
  assert.equal(Object.hasOwn(declaration.Body, "Statements"), false);
  assert.equal(api.SourceFile_Diagnostics(source).length, 0);
  assert.deepEqual(parseSource(api, "declarations.ts", text), source);
});

test("parser preserves UTF-16 diagnostic and node spans", async () => {
  const api = await loadParser();
  const text = "const wide = '💚';\nexport const broken = ;\n";
  const source = parseSource(api, "unicode.ts", text);
  const diagnostics = api.SourceFile_Diagnostics(source);
  assert.equal(diagnostics.length, 1);
  assert.deepEqual(diagnostics[0], { Code: api.Diagnostic_Code(diagnostics[0]), Pos: 41, End: 42 });
  const declaration = source.Statements.Nodes[1];
  assert.equal(api.GetTextOfNodeFromSourceText(text, declaration, false), "export const broken = ;");
});

test("parser preserves hand-written SourceFile declaration metadata", async () => {
  const api = await loadParser();
  const text = `/// <reference lib="base" />
/// <reference path="./extra.d.ts" />
/// <reference types="node" />
export interface Root {}
`;
  const source = parseSource(api, "fixture/lib.root.d.ts", text);
  assert.deepEqual(source.LibReferenceDirectives.map((reference) => reference.FileName), ["base"]);
  assert.deepEqual(source.ReferencedFiles.map((reference) => reference.FileName), ["./extra.d.ts"]);
  assert.deepEqual(source.TypeReferenceDirectives.map((reference) => reference.FileName), ["node"]);
  assert.notEqual(source.ExternalModuleIndicator, undefined);
  assert.equal(source.IsDeclarationFile, true);
});
