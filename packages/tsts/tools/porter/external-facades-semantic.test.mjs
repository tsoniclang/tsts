import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex, buildExternalFacadeMap } from "./core/external-facades.mjs";
import { externalTypeScriptDeclarationHash } from "./core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "./core/semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "./core/type-storage-policies.mjs";
import { renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { declarationOwnershipId } from "./sig-check/declaration-ownership.mjs";
import { baseConfig } from "./test/helpers.mjs";
import {
  basic,
  builtinType,
  externalSnapshot,
  externalType,
  interfaceType,
  method,
  namedType,
  signature,
  sliceType,
  structType,
  variable,
} from "./test/external-facade-fixtures.mjs";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractIndexedTypeExportDescriptor } from "./ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const parser = await loadParser();

function authoredTypeHash(moduleId, name, source, additionalSources = new Map()) {
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, source], ...additionalSources]));
  const valueEnvironments = buildIndexedModuleValueEnvironments(parser, moduleIndex);
  return externalTypeScriptDeclarationHash(
    extractIndexedTypeExportDescriptor(parser, moduleIndex, moduleId, name, valueEnvironments).descriptor,
  );
}

test("external facade identity and signatures come only from extracted go/types declarations", () => {
  const snapshot = externalSnapshot([
    externalType({ packagePath: "io", name: "Writer", rhs: interfaceType([
      method("io::type::Writer::rhs::explicitMethod::0::Write", "io::type::Writer::rhs", "Write", signature([
        variable("io::type::Writer::rhs::explicitMethod::0::Write::signature::parameters::0", "p", sliceType(basic("byte"))),
      ], [
        variable("io::type::Writer::rhs::explicitMethod::0::Write::signature::results::0", "", basic("int")),
        variable("io::type::Writer::rhs::explicitMethod::0::Write::signature::results::1", "", builtinType("error", true)),
      ])),
    ]), nilable: true }),
    externalType({ packagePath: "time", name: "Duration", rhs: basic("int64") }),
    externalType({ packagePath: "example.com/native", name: "Box", rhs: structType([
      variable("example.com/native::type::Box::rhs::field::0", "Value", basic("string"), true),
    ]) }),
  ]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/io.ts", "go/time.ts"],
    externalFacadePolicies: [
      { objectId: "io::type::Writer", tsModule: "go/io.ts", tsName: "Writer", storageStrategy: "authored" },
      { objectId: "time::type::Duration", tsModule: "go/time.ts", tsName: "Duration", storageStrategy: "authored" },
      { objectId: "example.com/native::type::Box", tsModule: "go/example.com/native.ts", tsName: "Box", storageStrategy: "generated" },
    ],
  };
  const semantic = buildDependencySemanticTypeIndex(snapshot);
  assert.equal(semantic.get("io::type::Writer").arity, 0);
  assert.equal(semantic.get("io::type::Writer").variants[0].declaration.object.type.nilable, true);

  const facades = buildExternalFacadeMap(config, snapshot);
  assert.equal(facades.get("io::type::Writer").storageStrategy, "authored");
  assert.equal(facades.get("io::type::Writer").arity, 0);
  assert.equal(facades.get("time::type::Duration").variants[0].declaration.rhs.kind, "basic");
  assert.equal(facades.get("example.com/native::type::Box").storageStrategy, "generated");

  const modules = renderExternalFacadeModules(config, snapshot);
  assert.equal(modules.has("go/io.ts"), false, "authored modules are excluded before rendering");
  assert.equal(modules.has("go/time.ts"), false, "authored modules are excluded before rendering");
  assert.match(modules.get("go/example.com/native.ts"), /export type Box = \(\{ Value: string \}\) & \{ readonly "__goDefinedType::example\.com\/native::type::Box::[0-9a-f]{64}": never \};/);
  assert.doesNotMatch(modules.get("go/example.com/native.ts"), /Nilable extends boolean|, true>|, false>/);
});

test("excluded module-local dependency types require reviewed storage and never become facades", () => {
  const packagePath = `${baseConfig.goModulePath}/internal/excluded`;
  const declaration = externalType({ packagePath, name: "HiddenState", rhs: structType([]) });
  const snapshot = externalSnapshot([declaration]);
  assert.throws(
    () => buildExternalFacadeMap(baseConfig, snapshot),
    /excluded module-local dependency type .* requires an explicit go-type-storage relation/,
  );

  const semantic = buildSemanticTypeCatalog(snapshot).get(declaration.object.id);
  const config = {
    ...baseConfig,
    semanticRelations: [{
      kind: "go-type-storage",
      objectId: declaration.object.id,
      storageIdentity: "packages/tsts/src/internal/excluded-storage.ts::HiddenState",
      goDeclarationHash: semanticDeclarationVariantsHash(semantic),
      tsDeclarationHash: "a".repeat(64),
      reason: "The excluded module-local declaration has one reviewed TypeScript storage owner.",
    }],
  };
  assert.deepEqual([...buildExternalFacadeMap(config, snapshot)], []);
  assert.equal(renderExternalFacadeModules(config, snapshot).size, 0);
});

test("authored facade audit checks every selected member without requiring the complete Go surface", () => {
  const api = parser;
  const objectId = "example.com/native::type::Reader";
  const readId = `${objectId}::method::Read`;
  const closeId = `${objectId}::method::Close`;
  const receiver = variable(`${readId}::signature::receiver`, "reader", namedType(objectId, "example.com/native", "Reader"));
  const read = {
    id: readId,
    ownerId: objectId,
    name: "Read",
    packagePath: "example.com/native",
    exported: true,
    signature: { ...signature([variable(`${readId}::signature::parameters::0`, "value", basic("string"))], [
      variable(`${readId}::signature::results::0`, "", basic("string")),
    ]), receiver },
  };
  const close = {
    id: closeId,
    ownerId: objectId,
    name: "Close",
    packagePath: "example.com/native",
    exported: true,
    signature: { ...signature([], []), receiver: { ...receiver, id: `${closeId}::signature::receiver` } },
  };
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Reader", rhs: interfaceType([read, close]), methods: [read, close], nilable: true }),
  ]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{ objectId, tsModule: "go/example.com/native.ts", tsName: "Reader", storageStrategy: "authored" }],
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const audit = (source, canonicalIdentity = (identity) => identity) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source]]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity,
      config,
      conventions: {},
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  const exact = audit("export interface Reader { Read(value: string): string; Close(): void; }");
  assert.equal(exact.checked, 1);
  assert.deepEqual(exact.mismatches, []);
  assert.deepEqual(exact.inventory, {
    constructors: [],
    methodBindings: [],
    privateStorageMembers: [],
    tsOnlyMembers: [],
    unselectedGoMembers: [],
  });
  const wrong = audit("export interface Reader { Read(value: string): boolean; runtimeHelper(): void; }");
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.kind === "return-type"));
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.kind === "authored-facade-ts-member-extra" && mismatch.detail.includes("'runtimeHelper'")));
  assert.deepEqual(wrong.inventory.tsOnlyMembers.map((member) => member.name), ["runtimeHelper"]);
  assert.deepEqual(wrong.inventory.unselectedGoMembers.map((member) => member.name), ["Close"]);
  assert.ok(audit("export interface Reader { Read(input: string): string; Close(): void; }")
    .mismatches.some((mismatch) => mismatch.kind === "param-name"));
  assert.ok(audit("interface Extra { extra(): void; } export interface Reader extends Extra { Read(value: string): string; Close(): void; }")
    .mismatches.some((mismatch) => mismatch.kind === "interface-heritage"));
});

test("authored Go interfaces retain unexported nominal method seals", () => {
  const api = parser;
  const objectId = "example.com/native::type::Sealed";
  const publicMethod = method(`${objectId}::rhs::explicitMethod::0::Read`, `${objectId}::rhs`, "Read", signature([], []));
  const privateMethod = {
    ...method(`${objectId}::rhs::explicitMethod::1::seal`, `${objectId}::rhs`, "seal", signature([], [])),
    exported: false,
  };
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Sealed", rhs: interfaceType([publicMethod, privateMethod]) }),
  ]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{ objectId, tsModule: "go/example.com/native.ts", tsName: "Sealed", storageStrategy: "authored" }],
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, "export interface Sealed { Read(): void; }"]]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.ok(result.mismatches.some((mismatch) => mismatch.kind === "missing-member" && mismatch.detail.includes("__goUnexported")));
});

test("authored facade aliases cannot redirect configured storage through another declaration", () => {
  const api = parser;
  const firstId = "example.com/native::type::First";
  const secondId = "example.com/native::type::Second";
  const declaration = (objectId, name) => externalType({
    packagePath: "example.com/native",
    name,
    rhs: interfaceType([method(`${objectId}::rhs::explicitMethod::0::Read`, `${objectId}::rhs`, "Read", signature([], []))]),
  });
  const snapshot = externalSnapshot([declaration(firstId, "First"), declaration(secondId, "Second")]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [
      { objectId: firstId, tsModule: "go/example.com/native.ts", tsName: "First", storageStrategy: "authored" },
      { objectId: secondId, tsModule: "go/example.com/native.ts", tsName: "Second", storageStrategy: "authored" },
    ],
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([[
    moduleId,
    "interface Shared { Read(): void; } export { Shared as First, Shared as Second };",
  ]]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.equal(result.mismatches.filter((mismatch) => mismatch.kind === "authored-facade-contract-error" &&
    mismatch.detail.includes("must be stored directly")).length, 2);
});

test("authored scalar adaptation accepts one exact branded scalar storage type", () => {
  const api = parser;
  const objectId = "example.com/native::type::Tag";
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("string") }),
  ]);
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const goDeclarationHash = semanticDeclarationVariantsHash(semantic);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const exactSource = 'export type Tag = string & { readonly __tag: "Tag" };';
  const tsDeclarationHash = authoredTypeHash(moduleId, "Tag", exactSource);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Tag",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "scalar",
        scalarStorage: "string",
        nominality: "preserved",
        goDeclarationHash,
        tsDeclarationHash,
        reason: "The native tag is stored as one exact branded JavaScript string scalar.",
      },
    }],
  };
  assert.throws(() => buildExternalFacadeMap({
    ...config,
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Tag",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "scalar",
        nominality: "preserved",
        reason: "The native tag is stored as one exact branded JavaScript string scalar.",
      },
    }],
  }, snapshot), /requires exact scalarStorage/);
  const audit = (source) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source]]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity: (identity) => identity,
      config,
      conventions: {},
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  assert.deepEqual(audit(exactSource).mismatches, []);
  assert.ok(audit("export type Tag = number;").mismatches.some((mismatch) =>
    mismatch.kind === "authored-facade-typescript-adaptation-drift"));
  assert.ok(audit('export type Tag = string & { mutable: "Tag" };').mismatches.some((mismatch) =>
    mismatch.kind === "authored-facade-typescript-adaptation-drift"));
  const profileDrift = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("string"), profiles: [0] }),
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("int"), profiles: [1] }),
  ]);
  assert.throws(() => buildExternalFacadeMap(config, profileDrift), /cannot erase profile-dependent Go declaration semantics/);
  assert.throws(() => buildExternalFacadeMap({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      runtimeAdaptation: {
        ...config.externalFacadePolicies[0].runtimeAdaptation,
        goDeclarationHash: "0".repeat(64),
      },
    }],
  }, snapshot), /Go declaration snapshot drifted/);
});

test("authored method bindings map one exact Go method signature to one top-level function", () => {
  const api = parser;
  const objectId = "example.com/native::type::Code";
  const methodId = `${objectId}::method::Valid`;
  const receiver = variable(`${methodId}::signature::receiver`, "code", namedType(objectId, "example.com/native", "Code"));
  const valid = {
    id: methodId,
    ownerId: objectId,
    name: "Valid",
    packagePath: "example.com/native",
    exported: true,
    signature: {
      ...signature(
        [variable(`${methodId}::signature::parameters::0`, "prefix", basic("string"))],
        [variable(`${methodId}::signature::results::0`, "", basic("bool"))],
      ),
      receiver,
    },
  };
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Code", rhs: basic("string"), methods: [valid] }),
  ]);
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const exactTypeSource = 'export type Code = string & { readonly __code: "Code" };';
  const tsDeclarationHash = authoredTypeHash(moduleId, "Code", exactTypeSource);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Code",
      storageStrategy: "authored",
      methodBindings: [{
        methodId,
        receiverName: "value",
        tsName: "Code_Valid",
        reason: "Scalar Code storage cannot host the Go instance method, so its receiver is promoted explicitly.",
      }],
      runtimeAdaptation: {
        representation: "scalar",
        scalarStorage: "string",
        nominality: "preserved",
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash,
        reason: "The native code is stored as one exact branded JavaScript string scalar.",
      },
    }],
  };
  const audit = (source) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([
      [moduleId, source],
      [`${config.tsRoot}/go/scalars.ts`, "export type bool = boolean;"],
    ]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity: (identity) => identity,
      config,
      conventions: {},
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  const exact = audit(`
import type { bool } from "../scalars.js";
export type Code = string & { readonly __code: "Code" };
export function Code_Valid(value: Code, prefix: string): bool { return value.startsWith(prefix) as bool; }
`);
  assert.deepEqual(exact.mismatches, []);
  assert.equal(exact.inventory.methodBindings.length, 1);
  assert.ok(exact.ownedDeclarationIds.has(declarationOwnershipId(moduleId, "value", "function", "Code_Valid")));
  const wrong = audit(`
import type { bool } from "../scalars.js";
export type Code = string & { readonly __code: "Code" };
export function Code_Valid(value: Code, prefix: number): string { return String(prefix); }
`);
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.id === `external-method:${methodId}` && mismatch.kind === "param-type"));
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.id === `external-method:${methodId}` && mismatch.kind === "return-type"));
  assert.throws(() => buildExternalFacadeMap({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      methodBindings: [{
        methodId: `${objectId}::method::Missing`,
        receiverName: "value",
        tsName: "Code_Missing",
        reason: "Scalar Code storage cannot host the Go instance method, so its receiver is promoted explicitly.",
      }],
    }],
  }, snapshot), /not present in every active semantic profile/);
  assert.throws(() => buildExternalFacadeMap({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      methodBindings: [{ methodId, receiverName: "class", tsName: "Code_Valid" }],
    }],
  }, snapshot), /receiverName must be one exact TypeScript identifier/);
});

test("external facade policy rejects hand-authored Go semantics and unknown objects", () => {
  const snapshot = externalSnapshot([externalType({ packagePath: "time", name: "Duration", rhs: basic("int64") })]);
  assert.throws(
    () => buildExternalFacadeMap({
      ...baseConfig,
      externalFacadePolicies: [{ objectId: "time::type::Duration", arity: 0, kind: "type", typeExpression: basic("int64") }],
    }, snapshot),
    /forbidden hand-authored Go semantic field/,
  );
  assert.throws(
    () => buildExternalFacadeMap({
      ...baseConfig,
      externalFacadePolicies: [{ objectId: "time::type::Missing", tsModule: "go/time.ts", tsName: "Missing", storageStrategy: "authored" }],
    }, snapshot),
    /no extracted go\/types declaration/,
  );
  for (const forbidden of [
    { members: ["String"] },
    { embeddings: ["io::type::Writer"] },
  ]) {
    assert.throws(
      () => buildExternalFacadeMap({
        ...baseConfig,
        authoredFacadeModules: ["go/time.ts"],
        externalFacadePolicies: [{
          objectId: "time::type::Duration",
          tsModule: "go/time.ts",
          tsName: "Duration",
          storageStrategy: "authored",
          ...forbidden,
        }],
      }, snapshot),
      /forbidden hand-authored Go semantic field/,
    );
  }
});

test("generated method-bearing types remain declaration-only and reject runtime adaptation", () => {
  const objectId = "example.com/native::type::Thing";
  const methodId = `${objectId}::method::Use`;
  const receiver = variable(`${methodId}::signature::receiver`, "thing", namedType(objectId, "example.com/native", "Thing"));
  const useMethod = {
    id: methodId,
    ownerId: objectId,
    name: "Use",
    packagePath: "example.com/native",
    exported: true,
    signature: { ...signature([], []), receiver },
  };
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Thing", rhs: structType([]), methods: [useMethod] }),
  ]);
  const generatedPolicy = {
    objectId,
    tsModule: "go/example.com/native.ts",
    tsName: "Thing",
    storageStrategy: "generated",
  };
  const source = renderExternalFacadeModules({ ...baseConfig, externalFacadePolicies: [generatedPolicy] }, snapshot)
    .get("go/example.com/native.ts");
  assert.match(source, /export type Thing =/);
  assert.match(source, /Use\(\): void/);
  assert.doesNotMatch(source, /export class Thing|TSGO_EXTERNAL_FACADE_UNIMPLEMENTED/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: {
        representation: "class",
        nominality: "preserved",
        pointer: "aggregate",
        goDeclarationHash: semanticDeclarationVariantsHash(buildDependencySemanticTypeIndex(snapshot).get(objectId)),
        reason: "The stateful Go struct is stored as one JavaScript class instance with aggregate identity.",
      },
    }],
  }, snapshot), /generated declaration storage cannot define runtime adaptation/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      memberBodies: { [methodId]: "return;" },
    }],
  }, snapshot), /forbidden hand-authored Go semantic field.*memberBodies/);
});

test("one generated storage contract rejects profile-dependent external semantics", () => {
  const objectId = "example.com/native::type::Word";
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Word", rhs: basic("int32"), profiles: [0] }),
    externalType({ packagePath: "example.com/native", name: "Word", rhs: basic("int64"), profiles: [1] }),
  ]);
  assert.throws(
    () => renderExternalFacadeModules({
      ...baseConfig,
      externalFacadePolicies: [{ objectId, tsModule: "go/example.com/native.ts", tsName: "Word", storageStrategy: "generated" }],
    }, snapshot),
    /renders differently across active semantic profiles/,
  );
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    semanticRelations: [{
      kind: "go-type-storage",
      objectId,
      storageIdentity: "packages/tsts/src/native.ts::Word",
      goDeclarationHash: semanticDeclarationVariantsHash(buildSemanticTypeCatalog(snapshot).get(objectId)),
      tsDeclarationHash: "0".repeat(64),
      reason: "The test intentionally attempts one storage declaration for a profile-dependent Go type.",
    }],
  }, snapshot), /profile-dependent go\/types declarations but one storage contract/);
});
