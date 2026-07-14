import assert from "node:assert/strict";
import test from "node:test";

import { semanticDeclarationVariantsHash } from "../semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "../type-storage-policies.mjs";
import {
  buildGeneratorOwnedGoValueOperationCatalog,
  emptyGeneratorOwnedGoValueOperationCatalog,
  requireGeneratorOwnedGoValueOperationCatalog,
} from "./generator-owned-providers.mjs";

const packagePath = "example.test/native";
const pairObjectId = `${packagePath}::type::Pair`;

test("generator-owned evidence retains only exact declaration contracts in an immutable catalog", () => {
  const { config, evidence, snapshot } = fixture();
  const catalog = buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [evidence]);
  const entry = catalog.get(pairObjectId);
  const requirements = catalog.requirements(config, snapshot);

  assert.equal(catalog.size, 1);
  assert.equal(catalog.has(pairObjectId), true);
  assert.deepEqual([...catalog].map(([objectId]) => objectId), [pairObjectId]);
  assert.deepEqual([...catalog.entries()].map(([objectId]) => objectId), [pairObjectId]);
  assert.equal(entry.goDeclarationHash, evidence.goDeclarationHash);
  assert.equal(entry.operationIdentity, evidence.operationIdentity);
  assert.equal(entry.ownerId, "porter:ast");
  assert.equal(entry.tsDeclarationHash, "b".repeat(64));
  assert.equal(entry.typeParameterCount, 1);
  assert.deepEqual(entry.operationTypeParameterIndexes, [0]);
  assert.equal(Object.hasOwn(entry, "implementationHash"), false);
  assert.deepEqual(requirements.get(pairObjectId), {
    disposition: "generator-owned",
    operationTypeParameterIndexes: [0],
    typeParameterCount: 1,
  });
  assert.equal(catalog.require(config, snapshot), catalog);
  assert.equal(requireGeneratorOwnedGoValueOperationCatalog(catalog, config, snapshot), catalog);
  assert.equal(Object.isFrozen(catalog), true);
  assert.equal(Object.isFrozen(entry), true);
  assert.equal(Object.isFrozen(entry.operationTypeParameterIndexes), true);
  assert.equal(Object.isFrozen(requirements.get(pairObjectId)), true);

  evidence.ownerId = "changed";
  evidence.operationTypeParameterIndexes[0] = 99;
  assert.equal(entry.ownerId, "porter:ast");
  assert.deepEqual(entry.operationTypeParameterIndexes, [0]);
  assert.throws(() => { entry.ownerId = "changed"; }, TypeError);
  assert.throws(() => { entry.operationTypeParameterIndexes.push(0); }, TypeError);

  const empty = emptyGeneratorOwnedGoValueOperationCatalog(config, snapshot);
  assert.equal(empty.size, 0);
  assert.deepEqual([...empty], []);
});

test("generator-owned evidence requires the original config and semantic snapshot objects", () => {
  const { config, evidence, snapshot } = fixture();
  const catalog = buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [evidence]);

  assert.throws(() => catalog.require({ ...config }, snapshot), /different config or snapshot objects/);
  assert.throws(() => catalog.require(config, { ...snapshot }), /different config or snapshot objects/);
  assert.throws(() => catalog.requirements({ ...config }, snapshot), /different config or snapshot objects/);
  assert.throws(
    () => requireGeneratorOwnedGoValueOperationCatalog(new Map(), config, snapshot),
    /requires one finalized generator-owned catalog/,
  );
});

test("generator-owned evidence rejects non-arrays, missing keys, and every unknown key", () => {
  const { config, evidence, snapshot } = fixture();

  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, {}),
    /must be an array/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [null]),
    /must be an object/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [omitKey(evidence, "ownerId")]),
    /keys must be exactly/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, unknown: true }]),
    /keys must be exactly.*unknown/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{
      ...evidence,
      implementationHash: "c".repeat(64),
    }]),
    /keys must be exactly.*implementationHash/,
  );
});

test("generator-owned evidence rejects unregistered owners and noncanonical owner paths or exports", () => {
  const { config, evidence, snapshot } = fixture();

  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, ownerId: "porter:unknown" }]),
    /is not a registered operation generator/,
  );

  const invalidIdentities = [
    [42, /exact direct generated TypeScript export identity/],
    ["src/internal/ast/generated/value-ops.ts", /exact direct generated TypeScript export identity/],
    ["src/internal/ast/generated/value-ops.ts::", /exact direct generated TypeScript export identity/],
    ["src/internal/ast/generated/../escape.ts::PairValueOps", /canonical generated \.ts file/],
    ["src/internal/ast/generated\\value-ops.ts::PairValueOps", /canonical generated \.ts file/],
    ["src/internal/ast/generated/value-ops.js::PairValueOps", /canonical generated \.ts file/],
    ["src/internal/ast/generated/value-ops.ts?profile::PairValueOps", /canonical generated \.ts file/],
    ["src/internal/ast/other/value-ops.ts::PairValueOps", /directly under 'src\/internal\/ast\/generated'/],
    ["src/internal/ast/generated/value-ops.ts::Pair-ValueOps", /exact TypeScript identifier/],
    ["src/internal/ast/generated/value-ops.ts::class", /exact TypeScript identifier/],
    ["src/internal/ast/generated/value-ops.ts::PairValueOps::Alias", /canonical generated \.ts file/],
  ];
  for (const [operationIdentity, expected] of invalidIdentities) {
    assert.throws(
      () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, operationIdentity }]),
      expected,
      String(operationIdentity),
    );
  }
});

test("generator-owned evidence rejects invalid identities and declaration hashes", () => {
  const { config, evidence, snapshot } = fixture();

  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, objectId: "example.test/native::func::Pair" }]),
    /exact Go type object identity/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, goDeclarationHash: "a".repeat(63) }]),
    /goDeclarationHash must be one SHA-256 contract snapshot/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{ ...evidence, tsDeclarationHash: "B".repeat(64) }]),
    /tsDeclarationHash must be one SHA-256 contract snapshot/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{
      ...evidence,
      goDeclarationHash: differentHash(evidence.goDeclarationHash),
    }]),
    /Go declaration snapshot drifted/,
  );
});

test("generator-owned evidence rejects missing Go declarations and duplicate ownership", () => {
  const boxObjectId = `${packagePath}::type::Box`;
  const declarations = [
    semanticDeclaration(),
    semanticDeclaration({ name: "Box", objectId: boxObjectId }),
  ];
  const { config, evidence, snapshot } = fixture({ declarations });
  const boxEvidence = evidenceFor(snapshot, boxObjectId);

  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [{
      ...evidence,
      objectId: `${packagePath}::type::Missing`,
    }]),
    /has no extracted Go type declaration/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [
      evidence,
      {
        ...evidence,
        operationIdentity: "src/internal/ast/generated/pair-secondary.ts::PairSecondaryValueOps",
      },
    ]),
    /duplicates generator-owned object/,
  );
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [
      evidence,
      { ...boxEvidence, operationIdentity: evidence.operationIdentity },
    ]),
    /operationIdentity .* is already owned by/,
  );
});

test("generator-owned evidence rejects arity and operation-bearing index errors", () => {
  const { config, evidence, snapshot } = fixture();
  const invalidEvidence = [
    [{ ...evidence, typeParameterCount: -1 }, /non-negative safe integer/],
    [{ ...evidence, typeParameterCount: 1.5 }, /non-negative safe integer/],
    [{ ...evidence, typeParameterCount: 2 }, /Go declaration arity is 1/],
    [{ ...evidence, operationTypeParameterIndexes: "0" }, /must be an array/],
    [{ ...evidence, operationTypeParameterIndexes: [-1] }, /outside generic arity 1/],
    [{ ...evidence, operationTypeParameterIndexes: [1] }, /outside generic arity 1/],
    [{ ...evidence, operationTypeParameterIndexes: [0, 0] }, /strictly increasing with no duplicates/],
    [{ ...evidence, operationTypeParameterIndexes: [Number.MAX_SAFE_INTEGER + 1] }, /outside generic arity 1/],
  ];
  const sparseIndexes = new Array(1);
  invalidEvidence.push([{ ...evidence, operationTypeParameterIndexes: sparseIndexes }, /outside generic arity 1/]);

  for (const [candidate, expected] of invalidEvidence) {
    assert.throws(
      () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [candidate]),
      expected,
    );
  }

  const twoParameterDeclaration = semanticDeclaration({ typeParameterCount: 2 });
  const twoParameterSnapshot = semanticSnapshot(twoParameterDeclaration);
  const descending = evidenceFor(twoParameterSnapshot, pairObjectId, {
    operationTypeParameterIndexes: [1, 0],
  });
  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, twoParameterSnapshot, [descending]),
    /strictly increasing with no duplicates/,
  );
});

test("generator-owned evidence rejects profile-dependent Go storage", () => {
  const snapshot = semanticSnapshot(
    semanticDeclaration({ profiles: [0] }),
    semanticDeclaration({ profiles: [1], storage: "string" }),
  );
  const config = { tsRoot: "src" };
  const evidence = evidenceFor(snapshot, pairObjectId);

  assert.throws(
    () => buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, [evidence]),
    /changes storage shape across semantic profiles/,
  );
});

function fixture({ declarations = [semanticDeclaration()] } = {}) {
  const snapshot = semanticSnapshot(...declarations);
  return {
    config: { tsRoot: "src" },
    evidence: evidenceFor(snapshot, declarations[0].type.object.id),
    snapshot,
  };
}

function evidenceFor(snapshot, objectId, overrides = {}) {
  const semantic = buildSemanticTypeCatalog(snapshot).get(objectId);
  if (semantic === undefined) throw new Error(`fixture has no semantic declaration for '${objectId}'`);
  return {
    goDeclarationHash: semanticDeclarationVariantsHash(semantic, "generator-owned fixture"),
    objectId,
    operationIdentity: `src/internal/ast/generated/${semantic.name.toLowerCase()}-value-ops.ts::${semantic.name}ValueOps`,
    operationTypeParameterIndexes: semantic.variants[0].declaration.type.typeParameters.length === 0 ? [] : [0],
    ownerId: "porter:ast",
    tsDeclarationHash: "b".repeat(64),
    typeParameterCount: semantic.variants[0].declaration.type.typeParameters.length,
    ...overrides,
  };
}

function semanticSnapshot(...declarations) {
  return {
    files: [{
      units: declarations.map((declaration, index) => ({
        id: `unit-${index}`,
        kind: "type",
        semantic: [declaration],
      })),
    }],
    semantic: {
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [] },
    },
  };
}

function semanticDeclaration({
  name = "Pair",
  objectId = pairObjectId,
  profiles = [0, 1],
  storage = "parameter",
  typeParameterCount = 1,
} = {}) {
  const object = { id: objectId, name, packagePath, exported: true };
  const references = Array.from({ length: typeParameterCount }, (_unused, index) => ({
    ownerId: objectId,
    role: "type",
    index,
    name: `T${index}`,
  }));
  const fieldType = storage === "parameter"
    ? { kind: "typeParameter", nilable: false, typeParameter: references[0] }
    : { kind: "basic", nilable: false, basic: { name: "string", untyped: false } };
  return {
    kind: "type",
    packagePath,
    object,
    type: {
      alias: false,
      object,
      typeParameters: references.map((reference) => ({
        reference,
        constraint: { kind: "interface", nilable: true, interface: {} },
      })),
      rhs: {
        kind: "struct",
        nilable: false,
        struct: {
          fields: [{ variable: { name: "value", embedded: false, type: fieldType } }],
        },
      },
    },
    profiles,
  };
}

function omitKey(value, omittedKey) {
  return Object.fromEntries(Object.entries(value).filter(([key]) => key !== omittedKey));
}

function differentHash(value) {
  return `${value[0] === "0" ? "1" : "0"}${value.slice(1)}`;
}
