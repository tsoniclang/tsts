import assert from "node:assert/strict";
import test from "node:test";

import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "../core/semantic-declaration-hash.mjs";
import { loadParser } from "../ts-extractor/ast-signatures.mjs";
import {
  buildIndexedModuleValueEnvironments,
  extractIndexedFunctionExportDescriptor,
  extractIndexedValueExportDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "../ts-extractor/module-index.mjs";
import { collectGoValueOperationProviderMismatches } from "./value-operation-providers.mjs";

const api = await loadParser();
const moduleId = "src/go/native.ts";
const objectId = "example.test/native::type::Pair";
const declaration = semanticDeclaration();
const snapshot = semanticSnapshot(declaration);

test("reviewed Go value-operation declarations are direct, hash-pinned, and body-independent", () => {
  const source = `
export interface GoValueOps<T> { readonly zero: () => T; readonly copy: (value: T) => T; }
export interface Pair<T> { value: T; }
export function PairValueOps<T>(valueOps: GoValueOps<T>): GoValueOps<Pair<T>> {
  return { zero: () => ({ value: valueOps.zero() }), copy: (value) => ({ value: valueOps.copy(value.value) }) };
}
`;
  const changedBody = source.replace("valueOps.copy(value.value)", "value.value");
  const first = operationHash(source, "PairValueOps", "function");
  const second = operationHash(changedBody, "PairValueOps", "function");
  assert.equal(first, second, "Porter declaration evidence must not hash implementation bodies");

  const relation = reviewedRelation(first);
  const config = fixtureConfig([relation]);
  const { moduleIndex, valueEnvironments } = indexed(source);
  const result = collectGoValueOperationProviderMismatches({ api, config, moduleIndex, snapshot, valueEnvironments });
  assert.equal(result.checked, 1);
  assert.deepEqual(result.mismatches, []);
  assert.equal(result.ownedDeclarationIds.size, 1);
});

test("reviewed Go value-operation declarations reject drift, re-exports, and wrong declaration kind", () => {
  const source = `
export interface GoValueOps<T> { readonly zero: () => T; readonly copy: (value: T) => T; }
export interface Pair<T> { value: T; }
export function PairValueOps<T>(valueOps: GoValueOps<T>): GoValueOps<Pair<T>> { throw new Error(); }
`;
  const hash = operationHash(source, "PairValueOps", "function");
  const config = fixtureConfig([reviewedRelation(hash)]);
  const drifted = indexed(source.replace("valueOps: GoValueOps<T>", "valueOps: T"));
  const drift = collectGoValueOperationProviderMismatches({ api, config, ...drifted, snapshot });
  assert.equal(drift.mismatches[0].kind, "go-value-operation-typescript-drift");

  const reexported = indexed(new Map([
    [moduleId, 'export { PairValueOps } from "./implementation.js";'],
    ["src/go/implementation.ts", source],
  ]));
  const reexport = collectGoValueOperationProviderMismatches({ api, config, ...reexported, snapshot });
  assert.equal(reexport.mismatches[0].kind, "go-value-operation-contract-error");
  assert.match(reexport.mismatches[0].detail, /instead of direct declaration/);

  const valueSource = source.replace(
    /export function PairValueOps[\s\S]*\n\}/,
    "export const PairValueOps: GoValueOps<Pair<unknown>> = undefined as never;",
  );
  const wrongKind = indexed(valueSource);
  const kindResult = collectGoValueOperationProviderMismatches({ api, config, ...wrongKind, snapshot });
  assert.equal(kindResult.mismatches[0].kind, "go-value-operation-contract-error");
  assert.match(kindResult.mismatches[0].detail, /function/);
});

test("reviewed Go value-operation declarations structurally target exact storage and operation-bearing parameters", () => {
  const source = `
export interface GoValueOps<T> { readonly zero: () => T; readonly copy: (value: T) => T; }
export interface Pair<T extends object> { value: T; }
export function PairValueOps<T extends object>(valueOps: GoValueOps<T>): GoValueOps<Pair<T>> { throw new Error(); }
`;
  const validRelation = {
    ...reviewedRelation(operationHash(source, "PairValueOps", "function")),
    tsDeclarationHash: operationHash(source, "PairValueOps", "function"),
  };
  const validConfig = fixtureConfig([validRelation]);
  const valid = collectGoValueOperationProviderMismatches({
    api,
    config: validConfig,
    ...indexed(source),
    snapshot,
  });
  assert.deepEqual(valid.mismatches, []);

  for (const { prior, replacement, expected } of [
    { prior: "GoValueOps<Pair<T>>", replacement: "GoValueOps<T>", expected: /return type differs/ },
    { prior: "valueOps: GoValueOps<T>", replacement: "valueOps: T", expected: /parameter 0 type differs/ },
    { prior: "T extends object>(valueOps", replacement: "T>(valueOps", expected: /type parameters differs/ },
  ]) {
    const changed = source.replace(prior, replacement);
    const relation = { ...validRelation, tsDeclarationHash: operationHash(changed, "PairValueOps", "function") };
    const result = collectGoValueOperationProviderMismatches({
      api,
      config: { ...validConfig, semanticRelations: [relation] },
      ...indexed(changed),
      snapshot,
    });
    assert.equal(result.mismatches[0].kind, "go-value-operation-contract-error");
    assert.match(result.mismatches[0].detail, expected);
  }
});

test("non-generic reviewed operations are direct const declarations", () => {
  const source = `
export interface GoValueOps<T> { readonly zero: () => T; readonly copy: (value: T) => T; }
export interface Marker { value: number; }
export const MarkerValueOps: GoValueOps<Marker> = undefined as never;
`;
  const markerId = "example.test/native::type::Marker";
  const markerDeclaration = semanticDeclaration(markerId, false);
  const relation = {
    ...reviewedRelation(operationHash(source, "MarkerValueOps", "value"), markerId),
    operationIdentity: `${moduleId}::MarkerValueOps`,
    storageIdentity: `${moduleId}::Marker`,
    operationTypeParameterIndexes: [],
    typeParameterCount: 0,
    goDeclarationHash: semanticHash(markerDeclaration, markerId, "Marker"),
  };
  const result = collectGoValueOperationProviderMismatches({
    api,
    config: fixtureConfig([relation]),
    ...indexed(source),
    snapshot: semanticSnapshot(markerDeclaration),
  });
  assert.deepEqual(result.mismatches, []);
});

function reviewedRelation(tsDeclarationHash, id = objectId) {
  return {
    kind: "go-value-ops",
    objectId: id,
    operationIdentity: `${moduleId}::PairValueOps`,
    storageIdentity: `${moduleId}::Pair`,
    typeParameterCount: 1,
    operationTypeParameterIndexes: [0],
    goDeclarationHash: semanticHash(declaration, objectId, "Pair"),
    tsDeclarationHash,
    reason: "This authored value carrier requires one reviewed declaration-level operation contract.",
  };
}

function fixtureConfig(semanticRelations) {
  return {
    semanticRelations,
    signatureCheck: { modules: { compat: moduleId, core: "src/go/scalars.ts" } },
    tsRoot: "src",
  };
}

function operationHash(source, name, kind) {
  const { moduleIndex, valueEnvironments } = indexed(source);
  const extracted = kind === "function"
    ? extractIndexedFunctionExportDescriptor(api, moduleIndex, moduleId, name, valueEnvironments)
    : extractIndexedValueExportDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
  return externalTypeScriptDeclarationHash(extracted.descriptor);
}

function indexed(sourceOrSources) {
  const sources = sourceOrSources instanceof Map ? sourceOrSources : new Map([[moduleId, sourceOrSources]]);
  const moduleIndex = indexTypeScriptModuleSources(api, sources);
  return { moduleIndex, valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex) };
}

function semanticHash(value, id, name) {
  return semanticDeclarationVariantsHash({
    objectId: id,
    packagePath: "example.test/native",
    name,
    variants: [{ declaration: value, profiles: [0] }],
    byProfile: new Map([[0, value]]),
  }, "fixture");
}

function semanticSnapshot(...declarations) {
  return {
    files: [{ units: declarations.map((entry, index) => ({ id: `unit-${index}`, kind: "type", semantic: [entry] })) }],
    semantic: { dependencyTypeDeclarations: [], externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [] } },
  };
}

function semanticDeclaration(id = objectId, generic = true) {
  const name = id.slice(id.lastIndexOf("::type::") + 8);
  const parameter = { ownerId: id, role: "type", index: 0, name: "T" };
  return {
    kind: "type",
    packagePath: "example.test/native",
    object: { id, name, packagePath: "example.test/native", exported: true },
    type: {
      alias: false,
      object: { id, name, packagePath: "example.test/native", exported: true },
      typeParameters: generic ? [{ reference: parameter, constraint: { kind: "interface", nilable: true, interface: {} } }] : [],
      rhs: generic
        ? { kind: "struct", nilable: false, struct: { fields: [{ variable: { name: "value", embedded: false, type: { kind: "typeParameter", nilable: false, typeParameter: parameter } } }] } }
        : { kind: "struct", nilable: false, struct: { fields: [{ variable: { name: "value", embedded: false, type: { kind: "basic", nilable: false, basic: { name: "int", untyped: false } } } }] } },
    },
    profiles: [0],
  };
}
