import assert from "node:assert/strict";
import test from "node:test";

import { buildGoValueOperationCatalog, buildGoValueRequirementShape } from "./shape-plan.mjs";

const basic = (name) => ({ kind: "basic", nilable: false, basic: { name, untyped: false } });
const parameter = (ownerId, index, name) => ({
  kind: "typeParameter",
  nilable: false,
  typeParameter: { ownerId, role: "type", index, name },
});
const reference = (objectId, name, typeArgs = []) => ({
  kind: "named",
  nilable: false,
  reference: { objectId, packagePath: "example", name, typeArgs },
});
const field = (name, type, options = {}) => ({
  variable: { name, type, embedded: options.embedded === true },
  tag: "",
  tagValues: [],
  tagRemainder: "",
});
const typeUnit = (objectId, name, rhs, typeParameterNames = []) => {
  const typeParameters = typeParameterNames.map((parameterName, index) => ({
    reference: { ownerId: objectId, role: "type", index, name: parameterName },
    constraint: { kind: "interface", nilable: true, interface: {} },
  }));
  return {
    id: `unit::${name}`,
    kind: "type",
    semantic: [{
      kind: "type",
      profiles: [0],
      type: { alias: false, object: { id: objectId, name }, typeParameters, rhs },
    }],
  };
};

test("value shapes cut reference carriers and preserve aggregate declaration order", () => {
  const owner = "example::type::Entry";
  assert.deepEqual(buildGoValueRequirementShape({
    kind: "struct",
    nilable: false,
    struct: {
      fields: [
        field("name", basic("string")),
        field("_", basic("int")),
        field("next", { kind: "pointer", nilable: true, element: reference(owner, "Entry") }),
        field("values", { kind: "array", nilable: false, length: "2", element: basic("int") }),
      ],
    },
  }), {
    kind: "struct",
    fields: [
      { name: "name", blank: false, shape: { kind: "scalar", name: "string" } },
      { name: "__tsgoBlank0", blank: true, shape: { kind: "scalar", name: "int" } },
      { name: "next", blank: false, shape: { kind: "pointer" } },
      { name: "values", blank: false, shape: { kind: "array", length: "2", element: { kind: "scalar", name: "int" } } },
    ],
  });
});

test("operation requirements propagate only through by-value aggregate positions", () => {
  const pairId = "example::type::Pair";
  const headersId = "example::type::Headers";
  const wrapperId = "example::type::Wrapper";
  const pair = typeUnit(pairId, "Pair", {
    kind: "struct",
    nilable: false,
    struct: { fields: [field("left", parameter(pairId, 0, "L")), field("right", parameter(pairId, 1, "R"))] },
  }, ["L", "R"]);
  const headers = typeUnit(headersId, "Headers", {
    kind: "struct",
    nilable: false,
    struct: {
      fields: [
        field("slice", { kind: "slice", nilable: true, element: parameter(headersId, 0, "T") }),
        field("pointer", { kind: "pointer", nilable: true, element: parameter(headersId, 0, "T") }),
        field("phantom", { kind: "array", nilable: false, length: "0", element: parameter(headersId, 0, "T") }),
      ],
    },
  }, ["T"]);
  const wrapper = typeUnit(wrapperId, "Wrapper", {
    kind: "struct",
    nilable: false,
    struct: {
      fields: [field("pair", reference(pairId, "Pair", [basic("string"), parameter(wrapperId, 0, "T")]))],
    },
  }, ["T"]);
  const catalog = buildGoValueOperationCatalog([pair, headers, wrapper]);
  assert.equal(catalog.byObjectId.get(pairId).disposition, "generated");
  assert.deepEqual(catalog.byObjectId.get(pairId).operationTypeParameterIndexes, [0, 1]);
  assert.deepEqual(catalog.byObjectId.get(headersId).operationTypeParameterIndexes, []);
  assert.deepEqual(catalog.byObjectId.get(wrapperId).operationTypeParameterIndexes, [0]);
});

test("operation planning fails closed for missing providers and direct value cycles", () => {
  const externalId = "external::type::Value";
  const holderId = "example::type::Holder";
  const holder = typeUnit(holderId, "Holder", {
    kind: "struct",
    nilable: false,
    struct: { fields: [field("value", reference(externalId, "Value"))] },
  });
  assert.throws(() => buildGoValueOperationCatalog([holder]), /no generated declaration or reviewed provider/);
  const providers = new Map([[externalId, { disposition: "reviewed", typeParameterCount: 0, operationTypeParameterIndexes: [] }]]);
  assert.deepEqual(buildGoValueOperationCatalog([holder], { providers }).byObjectId.get(holderId).operationTypeParameterIndexes, []);

  const recursiveId = "example::type::Recursive";
  const recursive = typeUnit(recursiveId, "Recursive", {
    kind: "struct",
    nilable: false,
    struct: { fields: [field("self", reference(recursiveId, "Recursive"))] },
  });
  assert.throws(() => buildGoValueOperationCatalog([recursive]), /dependency cycle is not cut by a reference carrier/);
});
