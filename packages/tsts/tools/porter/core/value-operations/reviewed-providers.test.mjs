import assert from "node:assert/strict";
import test from "node:test";

import { semanticDeclarationVariantsHash } from "../semantic-declaration-hash.mjs";
import { buildReviewedGoValueOperationCatalog } from "./reviewed-providers.mjs";

const objectId = "example.test/native::type::Pair";
const declaration = semanticDeclaration();
const snapshot = semanticSnapshot(declaration);
const relation = {
  kind: "go-value-ops",
  objectId,
  operationIdentity: "src/go/native.ts::PairValueOps",
  typeParameterCount: 1,
  operationTypeParameterIndexes: [0],
  goDeclarationHash: semanticDeclarationVariantsHash({
    objectId,
    packagePath: "example.test/native",
    name: "Pair",
    variants: [{ declaration, profiles: [0] }],
    byProfile: new Map([[0, declaration]]),
  }, "fixture"),
  tsDeclarationHash: "b".repeat(64),
  reason: "This exact authored value carrier requires reviewed field-wise copy operations.",
};

test("reviewed Go value-operation policies are exact, immutable requirements", () => {
  const config = { tsRoot: "src", semanticRelations: [relation] };
  const catalog = buildReviewedGoValueOperationCatalog(config, snapshot);
  assert.equal(catalog.size, 1);
  assert.deepEqual(catalog.requirements(config, snapshot).get(objectId), {
    disposition: "reviewed",
    operationTypeParameterIndexes: [0],
    typeParameterCount: 1,
  });
  assert.equal(catalog.get(objectId).operationIdentity, "src/go/native.ts::PairValueOps");
  assert.throws(() => catalog.requirements({ ...config }, snapshot), /different config or snapshot/);
});

test("reviewed Go value-operation policies reject ambiguity and drift", () => {
  const valid = { tsRoot: "src", semanticRelations: [relation] };
  assert.throws(() => buildReviewedGoValueOperationCatalog({
    ...valid,
    semanticRelations: [{ ...relation, unknown: true }],
  }, snapshot), /keys must be exactly/);
  assert.throws(() => buildReviewedGoValueOperationCatalog({
    ...valid,
    semanticRelations: [{ ...relation, operationTypeParameterIndexes: [0, 0] }],
  }, snapshot), /strictly increasing/);
  assert.throws(() => buildReviewedGoValueOperationCatalog({
    ...valid,
    semanticRelations: [{ ...relation, typeParameterCount: 2 }],
  }, snapshot), /Go declaration arity is 1/);
  assert.throws(() => buildReviewedGoValueOperationCatalog({
    ...valid,
    semanticRelations: [{ ...relation, goDeclarationHash: "d".repeat(64) }],
  }, snapshot), /Go declaration snapshot drifted/);
  assert.throws(() => buildReviewedGoValueOperationCatalog({
    ...valid,
    semanticRelations: [relation, { ...relation, objectId: "builtin::type::error" }],
  }, semanticSnapshot(declaration, builtinErrorDeclaration())), /intrinsic interface value/);
});

function semanticSnapshot(...declarations) {
  return {
    files: [{ units: declarations.map((entry, index) => ({ id: `unit-${index}`, kind: "type", semantic: [entry] })) }],
    semantic: { dependencyTypeDeclarations: [], externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [] } },
  };
}

function semanticDeclaration() {
  const parameter = { ownerId: objectId, role: "type", index: 0, name: "T" };
  return {
    kind: "type",
    packagePath: "example.test/native",
    object: { id: objectId, name: "Pair", packagePath: "example.test/native", exported: true },
    type: {
      alias: false,
      object: { id: objectId, name: "Pair", packagePath: "example.test/native", exported: true },
      typeParameters: [{ reference: parameter, constraint: { kind: "interface", nilable: true, interface: {} } }],
      rhs: {
        kind: "struct",
        nilable: false,
        struct: { fields: [{ variable: { name: "value", embedded: false, type: { kind: "typeParameter", nilable: false, typeParameter: parameter } } }] },
      },
    },
    profiles: [0],
  };
}

function builtinErrorDeclaration() {
  return {
    kind: "type",
    packagePath: "",
    object: { id: "builtin::type::error", name: "error", packagePath: "", exported: true },
    type: {
      alias: false,
      object: { id: "builtin::type::error", name: "error", packagePath: "", exported: true },
      typeParameters: [],
      rhs: { kind: "interface", nilable: true, interface: {} },
    },
    profiles: [0],
  };
}
