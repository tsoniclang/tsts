import assert from "node:assert/strict";
import { test } from "node:test";
import {
  collectJsonTagMismatches as collectJsonTagMismatchesWithParser,
  expectedJsonFields,
  extractJsonFieldContractDeclarations as extractJsonFieldContractDeclarationsWithParser,
  parseGoJsonTag,
} from "./ts-extractor/json-tags.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { loadParser } from "./ts-extractor/parser-runtime.mjs";

const parserApi = await loadParser();
const extractJsonFieldContractDeclarations = (file, text, options = {}) =>
  extractJsonFieldContractDeclarationsWithParser(file, text, { ...options, api: parserApi });
const collectJsonTagMismatches = (snapshotValue, sources, tsById, activeIds, options = {}) =>
  collectJsonTagMismatchesWithParser(snapshotValue, sources, tsById, activeIds, { ...options, api: parserApi });

const id = "example.com/project::event.go::type::Event";

const basicType = (name) => ({ kind: "basic", basic: { name, untyped: false } });
const field = (name, type, tagValues = [], options = {}) => ({
  variable: { name, exported: options.exported ?? true, embedded: options.embedded || undefined, type },
  tag: "",
  tagValues,
});
const structUnit = (unitId, name, fields) => ({
  id: unitId,
  kind: "type",
  name,
  semantic: [{ type: { rhs: { kind: "struct", struct: { fields } } } }],
});

function taggedUnit() {
  return structUnit(id, "Event", [
    field("Name", basicType("string"), [{ key: "json", value: "name,omitzero" }]),
    field("Default", basicType("string")),
    field("Hidden", basicType("string"), [{ key: "json", value: "hidden" }], { exported: false }),
  ]);
}

function snapshot(unit = taggedUnit()) {
  return { files: [{ units: [unit] }] };
}

function contractSource({
  unitId = id,
  typeName = "Event",
  binding = "EventJsonContract",
  fields = 'readonly Name: { readonly name: "name"; readonly omitZero: true }; readonly Default: "Default";',
  module = "./json.js",
  imported = "JsonFieldNamesForGoStructContract",
  local = "JsonContract",
} = {}) {
  return `
    import type { ${imported} as ${local} } from ${JSON.stringify(module)};
    type ${binding} = ${local}<
      ${typeName},
      ${JSON.stringify(unitId)},
      { ${fields} }
    >;
  `;
}

test("Go JSON tags preserve default names, ignores, and distinct omission options", () => {
  assert.deepEqual(parseGoJsonTag("Default", undefined), {
    name: "Default", omitZero: false, omitEmpty: false, ignored: false, options: [],
  });
  assert.deepEqual(parseGoJsonTag("Value", ",omitempty"), {
    name: "Value", omitZero: false, omitEmpty: true, ignored: false, options: ["omitempty"],
  });
  assert.deepEqual(parseGoJsonTag("Value", "value,omitzero"), {
    name: "value", omitZero: true, omitEmpty: false, ignored: false, options: ["omitzero"],
  });
  assert.deepEqual(parseGoJsonTag("Value", "-"), {
    name: "", omitZero: false, omitEmpty: false, ignored: true, options: [],
  });

  assert.deepEqual([...expectedJsonFields(taggedUnit())], [
    ["Name", { name: "name", omitZero: true, omitEmpty: false, ignored: false, options: ["omitzero"] }],
    ["Default", { name: "Default", omitZero: false, omitEmpty: false, ignored: false, options: [] }],
  ]);
});

test("JSON declaration metadata is independent of field runtime representation", () => {
  const unit = structUnit("example::type::ZeroModes", "ZeroModes", [
    field("Scalar", basicType("int"), [{ key: "json", value: "scalar,omitzero" }]),
    field("Pointer", { kind: "pointer", element: basicType("int") }, [{ key: "json", value: "pointer,omitzero" }]),
    field("Slice", { kind: "slice", element: basicType("string") }, [{ key: "json", value: "slice,omitzero" }]),
  ]);
  assert.deepEqual([...expectedJsonFields(unit)].map(([name, value]) => [name, value.options]), [
    ["Scalar", ["omitzero"]],
    ["Pointer", ["omitzero"]],
    ["Slice", ["omitzero"]],
  ]);
});

test("active local and nested anonymous JSON structs cannot escape the declaration gate", () => {
  const functionId = "example::local.go::func::read";
  const typeId = "example::nested.go::type::Outer";
  const localFile = {
    path: "local.go",
    units: [{
      id: functionId,
      kind: "func",
      name: "read",
      qualifiedName: "read",
      parameters: [{ type: { kind: "struct", members: [{ kind: "field", name: "Value", exported: true, tagValues: [{ key: "json", value: "value" }] }] } }],
    }],
  };
  const nestedFile = {
    path: "nested.go",
    units: [{
      id: typeId,
      kind: "type",
      name: "Outer",
      startLine: 1,
      endLine: 5,
      members: [{ kind: "field", name: "Nested", exported: true, typeExpr: { kind: "struct", members: [{ kind: "field", name: "Value", exported: true, typeExpr: { kind: "ident", name: "string" }, tagValues: [{ key: "json", value: "value" }] }] } }],
      semantic: [{
        profiles: ["linux/amd64:cgo=0:tags="],
        type: { rhs: { kind: "struct", struct: { fields: [
          field("Nested", { kind: "struct", struct: { fields: [field("Value", basicType("string"), [{ key: "json", value: "value" }])] } }),
        ] } } },
      }],
    }],
  };
  const report = collectJsonTagMismatches(
    { files: [localFile, nestedFile] },
    new Map(),
    new Map([[functionId, { id: functionId, path: "local.ts" }], [typeId, { id: typeId, path: "nested.ts" }]]),
    new Set([functionId, typeId]),
  );
  assert.deepEqual(report.mismatches.map((entry) => entry.kind), [
    "json-tag-anonymous-active",
    "json-tag-nested-anonymous-active",
  ]);
});

test("type-only JSON contracts expose exact declaration evidence", () => {
  const source = contractSource();
  const extracted = extractJsonFieldContractDeclarations("event.ts", source);
  assert.deepEqual(extracted.mismatches, []);
  assert.equal(extracted.contracts.length, 1);
  assert.equal(extracted.contracts[0].binding, "EventJsonContract");

  const report = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", source]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(report.mismatches, []);
  assert.deepEqual(
    { tagged: report.taggedUnits, contracts: report.contractUnits, fields: report.contractFields },
    { tagged: 1, contracts: 1, fields: 2 },
  );
});

test("JSON declaration verifier rejects missing, drifted, extra, and duplicate contracts", () => {
  const missing = collectJsonTagMismatches(snapshot(), new Map(), new Map([[id, { id, path: "event.ts" }]]), new Set([id]));
  assert.deepEqual(missing.mismatches.map((entry) => entry.kind), ["json-tag-unclassified"]);

  const driftedSource = contractSource({ fields: 'readonly Name: "wrong"; readonly Extra: "extra";' });
  const drifted = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", driftedSource]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(new Set(drifted.mismatches.map((entry) => entry.kind)), new Set([
    "json-tag-field-drift",
    "json-tag-field-missing",
    "json-tag-field-extra",
  ]));

  const duplicateSource = `${contractSource()}\n
    type DuplicateEventJsonContract = JsonContract<
      Event,
      ${JSON.stringify(id)},
      { readonly Name: { readonly name: "name"; readonly omitZero: true }; readonly Default: "Default"; }
    >;
  `;
  const duplicate = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", duplicateSource]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.ok(duplicate.mismatches.some((entry) => entry.kind === "json-tag-contract-duplicate"));
});

test("JSON contract identities resolve imports rather than terminal spelling", () => {
  const aliased = extractJsonFieldContractDeclarations("event.ts", contractSource({ local: "FieldsContract" }));
  assert.deepEqual(aliased.mismatches, []);
  assert.equal(aliased.contracts.length, 1);

  const sameSpelledLocal = extractJsonFieldContractDeclarations("event.ts", `
    type JsonFieldNamesForGoStructContract<T> = T;
    type Fields = JsonFieldNamesForGoStructContract<Event>;
  `);
  assert.deepEqual(sameSpelledLocal.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved"]);
  assert.equal(sameSpelledLocal.contracts.length, 0);
  const localOnly = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", `type JsonFieldNamesForGoStructContract<T> = T; type Fields = JsonFieldNamesForGoStructContract<Event>;`]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(localOnly.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved", "json-tag-unclassified"]);

  const wrongModuleSource = contractSource({ module: "./fake-json.js" });
  const wrongModule = extractJsonFieldContractDeclarations("event.ts", wrongModuleSource, {
    contractModules: ["json.ts"],
  });
  assert.deepEqual(wrongModule.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved"]);
});

test("JSON extraction audits only top-level type declarations and rejects shadowed imports", () => {
  const nested = extractJsonFieldContractDeclarations("event.ts", `
    import type { JsonFieldNamesForGoStructContract as JsonContract } from "./json.js";
    namespace Hidden {
      export type Nested = JsonContract<Event, "nested", {}>;
    }
  `);
  assert.deepEqual(nested, { contracts: [], mismatches: [] });

  const shadowed = extractJsonFieldContractDeclarations("event.ts", `
    import type { JsonFieldNamesForGoStructContract as JsonContract } from "./json.js";
    interface JsonContract {}
    type Fields = JsonContract<Event, ${JSON.stringify(id)}, {}>;
  `);
  assert.deepEqual(shadowed.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved"]);
  assert.equal(shadowed.contracts.length, 0);
});

test("JSON contract bindings follow exact indexed re-export origins", () => {
  const source = contractSource({ module: "./barrel.js" });
  const sources = new Map([
    ["contract.ts", "export type JsonFieldNamesForGoStructContract<T, Id extends string, Fields> = T & { readonly __contract?: [Id, Fields] };"],
    ["barrel.ts", 'export type { JsonFieldNamesForGoStructContract } from "./contract.js";'],
    ["event.ts", source],
  ]);
  const moduleIndex = indexTypeScriptModuleSources(parserApi, sources);
  const extracted = extractJsonFieldContractDeclarations("event.ts", source, {
    contractModules: ["contract.ts"],
    moduleIndex,
  });
  assert.deepEqual(extracted.mismatches, []);
  assert.equal(extracted.contracts.length, 1);
});

test("JSON tag contracts fail closed on wrong type identity, location, embedded fields, and options", () => {
  const source = contractSource({ typeName: "WrongEvent" });
  const misplaced = collectJsonTagMismatches(
    snapshot(),
    new Map([["other.ts", source]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(new Set(misplaced.mismatches.map((entry) => entry.kind)), new Set([
    "json-tag-contract-location",
    "json-tag-type-identity",
  ]));

  const unsupported = taggedUnit();
  const unsupportedFields = unsupported.semantic[0].type.rhs.struct.fields;
  unsupportedFields.push(field("Embedded", { kind: "named", reference: { objectId: "example::type::Embedded", packagePath: "example", name: "Embedded", typeArgs: [] } }, [], { embedded: true }));
  unsupportedFields[0].tagValues[0].value = "name,string";
  const validIdentitySource = contractSource();
  const unsupportedReport = collectJsonTagMismatches(
    snapshot(unsupported),
    new Map([["event.ts", validIdentitySource]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.ok(unsupportedReport.mismatches.some((entry) => entry.kind === "json-tag-option-unsupported"));
  assert.ok(unsupportedReport.mismatches.some((entry) => entry.kind === "json-tag-embedded-unsupported"));
});

test("duplicate Go JSON tag namespaces fail instead of selecting one heuristically", () => {
  const unit = taggedUnit();
  unit.semantic[0].type.rhs.struct.fields[0].tagValues.push({ key: "json", value: "other" });
  assert.throws(() => expectedJsonFields(unit), /duplicate json struct-tag keys/);
});
