import assert from "node:assert/strict";
import { test } from "node:test";
import {
  collectJsonTagMismatches,
  expectedJsonFields,
  extractJsonFieldMapRegistrations,
  parseGoJsonTag,
} from "./ts-extractor/json-tags.mjs";

const id = "example.com/project::event.go::type::Event";

function taggedUnit() {
  return {
    id,
    kind: "type",
    name: "Event",
    members: [
      { kind: "field", name: "Name", exported: true, typeExpr: { kind: "ident", name: "string" }, tagValues: [{ key: "json", value: "name,omitzero" }] },
      { kind: "field", name: "Default", exported: true, typeExpr: { kind: "ident", name: "string" } },
      { kind: "field", name: "Hidden", exported: false, tagValues: [{ key: "json", value: "hidden" }] },
    ],
  };
}

function snapshot(unit = taggedUnit()) {
  return { files: [{ units: [unit] }] };
}

test("Go JSON tags preserve default names, ignores, and distinct omission options", () => {
  assert.deepEqual(parseGoJsonTag("Default", undefined), {
    name: "Default", omitZero: false, omitEmpty: false, ignored: false, options: [],
  });
  assert.deepEqual(parseGoJsonTag("Value", ",omitempty"), {
    name: "Value", omitZero: false, omitEmpty: true, ignored: false, options: ["omitempty"],
  });
  assert.deepEqual(parseGoJsonTag("Value", "value,omitzero"), {
    name: "value", omitZero: true, omitEmpty: false, ignored: false, options: ["omitzero"], zeroMode: "value",
  });
  assert.deepEqual(parseGoJsonTag("Value", "-"), {
    name: "", omitZero: false, omitEmpty: false, ignored: true, options: [],
  });

  assert.deepEqual([...expectedJsonFields(taggedUnit())], [
    ["Name", { name: "name", omitZero: true, omitEmpty: false, ignored: false, options: ["omitzero"], zeroMode: "value" }],
    ["Default", { name: "Default", omitZero: false, omitEmpty: false, ignored: false, options: [] }],
  ]);
});

test("Go JSON zero modes distinguish nil-bearing fields from scalar payload zero", () => {
  const unit = {
    id: "example::type::ZeroModes",
    kind: "type",
    members: [
      { kind: "field", name: "Scalar", exported: true, typeExpr: { kind: "ident", name: "int" }, tagValues: [{ key: "json", value: "scalar,omitzero" }] },
      { kind: "field", name: "Pointer", exported: true, typeExpr: { kind: "pointer", element: { kind: "ident", name: "int" } }, tagValues: [{ key: "json", value: "pointer,omitzero" }] },
      { kind: "field", name: "Slice", exported: true, typeExpr: { kind: "slice", element: { kind: "ident", name: "string" } }, tagValues: [{ key: "json", value: "slice,omitzero" }] },
    ],
  };
  assert.deepEqual([...expectedJsonFields(unit)].map(([name, field]) => [name, field.zeroMode]), [
    ["Scalar", "value"],
    ["Pointer", "nil"],
    ["Slice", "nil"],
  ]);
});

test("runtime contracts reject unproven deep or named omitzero semantics", () => {
  const zeroUnit = {
    id: "example::zero.go::type::ZeroModes",
    kind: "type",
    name: "ZeroModes",
    members: [
      { kind: "field", name: "Fixed", exported: true, typeExpr: { kind: "array", length: "2", element: { kind: "ident", name: "int" } }, tagValues: [{ key: "json", value: "fixed,omitzero" }] },
      { kind: "field", name: "Named", exported: true, typeExpr: { kind: "ident", name: "NamedStruct" }, tagValues: [{ key: "json", value: "named,omitzero" }] },
    ],
  };
  const source = `
    import { AttachJsonFieldNamesForGoStruct, DefineJsonFieldNamesForGoStruct } from "./json.js";
    const fields = DefineJsonFieldNamesForGoStruct<ZeroModes>(
      "${zeroUnit.id}",
      { Fixed: { name: "fixed", omitZero: true }, Named: { name: "named", omitZero: true } },
      { strategy: "runtime", reason: "Runtime values would otherwise guess at unsupported Go zero categories." },
    );
    AttachJsonFieldNamesForGoStruct(value, fields);
  `;
  const report = collectJsonTagMismatches(
    snapshot(zeroUnit),
    new Map([["zero.ts", source]]),
    new Map([[zeroUnit.id, { id: zeroUnit.id, path: "zero.ts" }]]),
    new Set([zeroUnit.id]),
  );
  assert.deepEqual(report.mismatches.map((entry) => entry.kind), [
    "json-tag-zero-semantics-unsupported",
    "json-tag-zero-semantics-unsupported",
  ]);
});

test("active local and nested anonymous JSON structs cannot escape the contract gate", () => {
  const functionId = "example::local.go::func::read";
  const typeId = "example::nested.go::type::Outer";
  const localFile = {
    path: "local.go",
    units: [{ id: functionId, kind: "func", name: "read", qualifiedName: "read", startLine: 1, endLine: 5 }],
    structTags: [{ name: "Value", startLine: 3, structDepth: 1, tagValues: [{ key: "json", value: "value" }] }],
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
    }],
    structTags: [{ name: "Value", startLine: 3, structDepth: 2, tagValues: [{ key: "json", value: "value" }] }],
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

test("field-map extraction requires a static unit identity, exact map, strategy, and attachment", () => {
  const source = `
    import { AttachJsonFieldNamesForGoStruct, DefineJsonFieldNamesForGoStruct } from "./json.js";
    const eventFields = DefineJsonFieldNamesForGoStruct<Event>(
      "${id}",
      { Name: { name: "name", omitZero: true }, Default: "Default" },
      { strategy: "runtime", reason: "Runtime event values use the generic Go JSON field mapper." },
    );
    AttachJsonFieldNamesForGoStruct(event, eventFields);
  `;
  const extracted = extractJsonFieldMapRegistrations("event.ts", source);
  assert.deepEqual(extracted.mismatches, []);
  assert.equal(extracted.registrations.length, 1);
  assert.equal(extracted.registrations[0].binding, "eventFields");
  assert.equal(extracted.registrations[0].strategy, "runtime");
  assert.ok(extracted.attachments.has("event.ts::eventFields"));

  const report = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", source]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(report.mismatches, []);
  assert.deepEqual(
    { tagged: report.taggedUnits, mapped: report.fieldMapUnits, runtime: report.runtimeUnits },
    { tagged: 1, mapped: 1, runtime: 1 },
  );
});

test("non-runtime JSON contracts are type-only and retain exact field metadata", () => {
  const source = `
    import type { JsonFieldNamesForGoStructContract as JsonContract } from "./json.js";
    type EventJsonContract = JsonContract<
      Event,
      "${id}",
      {
        readonly Name: { readonly name: "name"; readonly omitZero: true };
        readonly Default: "Default";
      },
      "source-metadata",
      "The explicit source decoder owns runtime behavior while Porter audits exact field identities."
    >;
  `;
  const extracted = extractJsonFieldMapRegistrations("event.ts", source);
  assert.deepEqual(extracted.mismatches, []);
  assert.equal(extracted.registrations.length, 1);
  assert.equal(extracted.registrations[0].binding, "EventJsonContract");
  assert.equal(extracted.registrations[0].strategy, "source-metadata");

  const report = collectJsonTagMismatches(
    snapshot(),
    new Map([["event.ts", source]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(report.mismatches, []);
  assert.deepEqual(
    { tagged: report.taggedUnits, mapped: report.fieldMapUnits, source: report.sourceMetadataUnits },
    { tagged: 1, mapped: 1, source: 1 },
  );
});

test("JSON tag verifier rejects missing, drifted, dynamic, duplicate, and unattached evidence", () => {
  const missing = collectJsonTagMismatches(snapshot(), new Map(), new Map([[id, { id, path: "event.ts" }]]), new Set([id]));
  assert.deepEqual(missing.mismatches.map((entry) => entry.kind), ["json-tag-unclassified"]);

  const driftedSource = `
    import { DefineJsonFieldNamesForGoStruct } from "./json.js";
    const eventFields = DefineJsonFieldNamesForGoStruct<Event>(
      "${id}",
      { Name: "wrong", Extra: "extra" },
      { strategy: "runtime", reason: "Runtime event values use the generic Go JSON field mapper." },
    );
  `;
  const drifted = collectJsonTagMismatches(snapshot(), new Map([["event.ts", driftedSource]]), new Map([[id, { id, path: "event.ts" }]]), new Set([id]));
  assert.deepEqual(new Set(drifted.mismatches.map((entry) => entry.kind)), new Set([
    "json-tag-field-drift",
    "json-tag-field-missing",
    "json-tag-field-extra",
    "json-tag-runtime-unattached",
  ]));

  const invalid = extractJsonFieldMapRegistrations("event.ts", `
    import { DefineJsonFieldNamesForGoStruct } from "./json.js";
    const raw: JsonFieldNameMap = { Name: "name" };
    const spread = DefineJsonFieldNamesForGoStruct<Event>("${id}", { ...raw }, { strategy: "runtime", reason: "Runtime event values use the generic Go JSON field mapper." });
  `);
  assert.deepEqual(new Set(invalid.mismatches.map((entry) => entry.kind)), new Set([
    "json-tag-unregistered-map",
    "json-tag-registration-invalid",
  ]));
});

test("JSON helper evidence resolves imported identities instead of trusting terminal spelling", () => {
  const aliased = extractJsonFieldMapRegistrations("event.ts", `
    import { AttachJsonFieldNamesForGoStruct as attach, DefineJsonFieldNamesForGoStruct as define } from "./json.js";
    const eventFields = define<Event>(
      "${id}",
      { Name: { name: "name", omitZero: true }, Default: "Default" },
      { strategy: "runtime", reason: "Runtime event values use the generic Go JSON field mapper." },
    );
    attach(event, eventFields);
  `);
  assert.deepEqual(aliased.mismatches, []);
  assert.equal(aliased.registrations.length, 1);
  assert.ok(aliased.attachments.has("event.ts::eventFields"));

  const sameSpelledLocal = extractJsonFieldMapRegistrations("event.ts", `
    const DefineJsonFieldNamesForGoStruct = (...args: unknown[]) => args;
    const eventFields = DefineJsonFieldNamesForGoStruct("${id}", {}, {});
  `);
  assert.deepEqual(sameSpelledLocal.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved"]);
  assert.equal(sameSpelledLocal.registrations.length, 0);

  const wrongModule = extractJsonFieldMapRegistrations("event.ts", `
    import { DefineJsonFieldNamesForGoStruct } from "./fake-json.js";
    const eventFields = DefineJsonFieldNamesForGoStruct<Event>(
      "${id}",
      { Name: { name: "name", omitZero: true }, Default: "Default" },
      { strategy: "runtime", reason: "Runtime event values use the generic Go JSON field mapper." },
    );
  `, { contractModules: ["json.ts"] });
  assert.deepEqual(wrongModule.mismatches.map((entry) => entry.kind), ["json-tag-helper-unresolved"]);
});

test("JSON tag contracts fail closed on wrong type identity, location, embedded fields, and unsupported options", () => {
  const source = `
    import { DefineJsonFieldNamesForGoStruct } from "./json.js";
    const eventFields = DefineJsonFieldNamesForGoStruct<WrongEvent>(
      "${id}",
      { Name: { name: "name", omitZero: true }, Default: "Default" },
      { strategy: "source-metadata", reason: "Source metadata remains exact without entering runtime serialization." },
    );
  `;
  const misplaced = collectJsonTagMismatches(
    snapshot(),
    new Map([["other.ts", source]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.deepEqual(new Set(misplaced.mismatches.map((entry) => entry.kind)), new Set([
    "json-tag-registration-location",
    "json-tag-type-identity",
  ]));

  const unsupported = taggedUnit();
  unsupported.members.push({ kind: "embeddedField", name: "Embedded", exported: true });
  unsupported.members[0].tagValues[0].value = "name,string";
  const unsupportedReport = collectJsonTagMismatches(
    snapshot(unsupported),
    new Map([["event.ts", source.replace("WrongEvent", "Event").replace("other.ts", "event.ts")]]),
    new Map([[id, { id, path: "event.ts" }]]),
    new Set([id]),
  );
  assert.ok(unsupportedReport.mismatches.some((entry) => entry.kind === "json-tag-option-unsupported"));
  assert.ok(unsupportedReport.mismatches.some((entry) => entry.kind === "json-tag-embedded-unsupported"));
});

test("duplicate Go JSON tag namespaces fail instead of selecting one heuristically", () => {
  const unit = taggedUnit();
  unit.members[0].tagValues.push({ key: "json", value: "other" });
  assert.throws(() => expectedJsonFields(unit), /duplicate json struct-tag keys/);
});
