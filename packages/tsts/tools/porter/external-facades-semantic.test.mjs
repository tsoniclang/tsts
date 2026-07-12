import assert from "node:assert/strict";
import test from "node:test";

import { buildExternalFacadeMap, buildExternalSemanticTypeIndex } from "./core/external-facades.mjs";
import { externalGoDeclarationHash } from "./core/external-facade-runtime-adaptation.mjs";
import { renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
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
import { buildIndexedModuleValueEnvironments } from "./ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const parser = await loadParser();

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
  const semantic = buildExternalSemanticTypeIndex(snapshot);
  assert.equal(semantic.get("io::type::Writer").arity, 0);
  assert.equal(semantic.get("io::type::Writer").intrinsicNilable, true);

  const facades = buildExternalFacadeMap(config, snapshot);
  assert.equal(facades.get("io::type::Writer").storageStrategy, "authored");
  assert.equal(facades.get("io::type::Writer").arity, 0);
  assert.equal(facades.get("time::type::Duration").declarationKind, "type");
  assert.equal(facades.get("example.com/native::type::Box").storageStrategy, "generated");

  const modules = renderExternalFacadeModules(config, snapshot);
  assert.equal(modules.has("go/io.ts"), false, "authored modules are excluded before rendering");
  assert.equal(modules.has("go/time.ts"), false, "authored modules are excluded before rendering");
  assert.match(modules.get("go/example.com/native.ts"), /export type Box = \{ Value: string \};/);
  assert.doesNotMatch(modules.get("go/example.com/native.ts"), /Nilable extends boolean|, true>|, false>/);
});

test("authored facade audit checks same-name signatures and reports both directional member gaps", () => {
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
      conventions: { equivalences: [] },
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
    goOnlyMembers: [],
    methodBindings: [],
    privateStorageMembers: [],
    tsOnlyMembers: [],
  });
  const wrong = audit("export interface Reader { Read(value: string): boolean; runtimeHelper(): void; }");
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.kind === "return-type"));
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.kind === "authored-facade-go-member-missing" && mismatch.detail.includes("'Close'")));
  assert.ok(wrong.mismatches.some((mismatch) => mismatch.kind === "authored-facade-ts-member-extra" && mismatch.detail.includes("'runtimeHelper'")));
  assert.deepEqual(wrong.inventory.goOnlyMembers.map((member) => member.name), ["Close"]);
  assert.deepEqual(wrong.inventory.tsOnlyMembers.map((member) => member.name), ["runtimeHelper"]);
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
    conventions: { equivalences: [] },
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.ok(result.mismatches.some((mismatch) => mismatch.kind === "missing-member" && mismatch.detail.includes("__goUnexported")));
});

test("authored facade aliases cannot share one declaration storage origin", () => {
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
    conventions: { equivalences: [] },
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.equal(result.mismatches.filter((mismatch) => mismatch.kind === "authored-facade-contract-error" &&
    mismatch.detail.includes("share authored declaration storage")).length, 1);
});

test("authored scalar adaptation accepts one exact branded scalar storage type", () => {
  const api = parser;
  const objectId = "example.com/native::type::Tag";
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("string") }),
  ]);
  const semantic = buildExternalSemanticTypeIndex(snapshot).get(objectId);
  const goDeclarationHash = externalGoDeclarationHash(semantic);
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
        goDeclarationHash,
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
        reason: "The native tag is stored as one exact branded JavaScript string scalar.",
      },
    }],
  }, snapshot), /requires exact scalarStorage/);
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const audit = (source) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source]]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity: (identity) => identity,
      config,
      conventions: { equivalences: [] },
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  assert.deepEqual(audit('export type Tag = string & { readonly __tag: "Tag" };').mismatches, []);
  assert.ok(audit("export type Tag = number;").mismatches.some((mismatch) => mismatch.kind === "metadata-declaration"));
  assert.ok(audit('export type Tag = string & { mutable: "Tag" };').mismatches.some((mismatch) =>
    mismatch.kind === "metadata-declaration"));
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
  const semantic = buildExternalSemanticTypeIndex(snapshot).get(objectId);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Code",
      storageStrategy: "authored",
      methodBindings: [{ methodId, receiverName: "value", tsName: "Code_Valid" }],
      runtimeAdaptation: {
        representation: "scalar",
        scalarStorage: "string",
        goDeclarationHash: externalGoDeclarationHash(semantic),
        reason: "The native code is stored as one exact branded JavaScript string scalar.",
      },
    }],
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const audit = (source) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([
      [moduleId, source],
      [`${config.tsRoot}/go/scalars.ts`, "export type bool = boolean;"],
    ]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity: (identity) => identity,
      config,
      conventions: { equivalences: [] },
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
  assert.ok(exact.ownedDeclarationIds.has(`${moduleId}::Code_Valid`));
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
      methodBindings: [{ methodId: `${objectId}::method::Missing`, receiverName: "value", tsName: "Code_Missing" }],
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

test("generated method storage requires class adaptation and keeps implementation bodies outside Porter", () => {
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
  const goDeclarationHash = externalGoDeclarationHash(buildExternalSemanticTypeIndex(snapshot).get(objectId));
  const generatedPolicy = {
    objectId,
    tsModule: "go/example.com/native.ts",
    tsName: "Thing",
    storageStrategy: "generated",
  };
  assert.throws(
    () => renderExternalFacadeModules({ ...baseConfig, externalFacadePolicies: [generatedPolicy] }, snapshot),
    /declared Go methods but no generated class runtime adaptation/,
  );
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: { representation: "class", pointer: "aggregate" },
    }],
  }, snapshot), /runtimeAdaptation\.reason must be a specific non-empty review justification/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: {
        representation: "class",
        pointer: "aggregate",
        reason: "The stateful Go struct is stored as one JavaScript class instance with aggregate identity.",
      },
    }],
  }, snapshot), /runtime adaptation requires exact goDeclarationHash/);

  const config = {
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: {
        representation: "class",
        pointer: "aggregate",
        goDeclarationHash,
        reason: "The stateful Go struct is stored as one JavaScript class instance with aggregate identity.",
      },
    }],
  };
  const source = renderExternalFacadeModules(config, snapshot).get("go/example.com/native.ts");
  assert.match(source, /export class Thing/);
  assert.match(source, /Use\(\): void \{\n    throw new globalThis\.Error\("TSGO_EXTERNAL_FACADE_UNIMPLEMENTED example\.com\/native\.Thing\.Use"\);\n  \}/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: {
        representation: "class",
        pointer: "aggregate",
        goDeclarationHash,
        reason: "The stateful Go struct is stored as one JavaScript class instance with aggregate identity.",
      },
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
    signatureCheck: { namedTypeMappings: { [objectId]: "packages/tsts/src/native.ts::Word" } },
  }, snapshot), /profile-dependent go\/types declarations but one profile storage contract/);
});
