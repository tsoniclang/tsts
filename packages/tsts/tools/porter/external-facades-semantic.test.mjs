import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex, buildExternalFacadeStoragePlan } from "./core/external-facades.mjs";
import { externalTypeScriptDeclarationHash } from "./core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "./core/semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "./core/type-storage-policies.mjs";
import { createExternalFacadeContractRenderer, renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { declarationOwnershipId } from "./sig-check/declaration-ownership.mjs";
import { baseConfig } from "./test/helpers.mjs";
import {
  basic,
  builtinType,
  externalSnapshot,
  externalType,
  finalizeExternalFacadeFixtureCatalog,
  finalizeGeneratedFacadeFixtureCatalog,
  interfaceType,
  method,
  namedType,
  setMethodSetParameterNameProvenance,
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

function finalizedCatalog(config, snapshot, moduleIndex) {
  return finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
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
    externalType({
      packagePath: "example.com/native",
      name: "Visitor",
      rhs: {
        kind: "signature",
        nilable: true,
        signature: signature([
          variable("example.com/native::type::Visitor::rhs::parameters::0", "value", basic("string")),
        ], [
          variable("example.com/native::type::Visitor::rhs::results::0", "", basic("bool")),
        ]),
      },
    }),
  ]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/io.ts", "go/time.ts"],
    externalFacadePolicies: [
      { objectId: "io::type::Writer", tsModule: "go/io.ts", tsName: "Writer", storageStrategy: "authored" },
      { objectId: "time::type::Duration", tsModule: "go/time.ts", tsName: "Duration", storageStrategy: "authored" },
      { objectId: "example.com/native::type::Box", tsModule: "go/example.com/native.ts", tsName: "Box", storageStrategy: "generated" },
      { objectId: "example.com/native::type::Visitor", tsModule: "go/example.com/native.ts", tsName: "Visitor", storageStrategy: "generated" },
    ],
  };
  const semantic = buildDependencySemanticTypeIndex(snapshot);
  assert.equal(semantic.get("io::type::Writer").arity, 0);
  assert.equal(semantic.get("io::type::Writer").variants[0].declaration.object.type.nilable, true);

  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
    [`${config.tsRoot}/go/io.ts`, "export interface Writer { Write(p: unknown): unknown; }\n"],
    [`${config.tsRoot}/go/time.ts`, "export type Duration = number;\n"],
  ]));
  const facades = finalizedCatalog(config, snapshot, moduleIndex);
  const auditFacades = facades.auditFacades(config, snapshot);
  assert.equal(auditFacades.get("io::type::Writer").storageStrategy, "authored");
  assert.equal(auditFacades.get("io::type::Writer").arity, 0);
  assert.equal(auditFacades.get("time::type::Duration").variants[0].declaration.rhs.kind, "basic");
  assert.equal(auditFacades.get("example.com/native::type::Box").storageStrategy, "generated");

  const modules = renderExternalFacadeModules(config, snapshot, facades);
  assert.equal(modules.has("go/io.ts"), false, "authored modules are excluded before rendering");
  assert.equal(modules.has("go/time.ts"), false, "authored modules are excluded before rendering");
  assert.match(modules.get("go/example.com/native.ts"), /export type Box = GoDefined<\{ Value: string \}, "__goDefinedType::example\.com\/native::type::Box::[0-9a-f]{64}">;/);
  assert.match(modules.get("go/example.com/native.ts"), /export type Visitor = GoDefined<GoFunc<\(value: string\) => bool>, "__goDefinedType::example\.com\/native::type::Visitor::[0-9a-f]{64}">;/);
  assert.doesNotMatch(modules.get("go/example.com/native.ts"), /Nilable extends boolean|, true>|, false>/);
});

test("excluded module-local dependency types require reviewed storage and never become facades", () => {
  const packagePath = `${baseConfig.goModulePath}/internal/excluded`;
  const declaration = externalType({ packagePath, name: "HiddenState", rhs: structType([]) });
  const snapshot = externalSnapshot([declaration]);
  assert.throws(
    () => finalizeGeneratedFacadeFixtureCatalog(baseConfig, snapshot),
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
  const catalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  assert.deepEqual([...catalog.artifactFacades(config, snapshot)], []);
  assert.equal(renderExternalFacadeModules(config, snapshot, finalizeGeneratedFacadeFixtureCatalog(config, snapshot)).size, 0);
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
  const audit = (source, canonicalIdentity = (identity) => identity, currentSnapshot = snapshot) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source]]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity,
      config,
      conventions: {},
      facades: finalizedCatalog(config, currentSnapshot, moduleIndex),
      moduleIndex,
      profile: loadProfile(config),
      snapshot: currentSnapshot,
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
  assert.ok(audit("export interface Reader { Close(): void; Read(value: string): string; }")
    .mismatches.every((mismatch) => mismatch.kind !== "member-order"), "go/types method-set order is canonical evidence");
  assert.ok(audit("interface Extra { extra(): void; } export interface Reader extends Extra { Read(value: string): string; Close(): void; }")
    .mismatches.some((mismatch) => mismatch.kind === "interface-heritage"));

  const unavailableSnapshot = structuredClone(snapshot);
  setMethodSetParameterNameProvenance(unavailableSnapshot, "unavailable");
  assert.ok(audit("export interface Reader { Read(input: string): string; Close(): void; }", undefined, unavailableSnapshot)
    .mismatches.every((mismatch) => mismatch.kind !== "param-name"));
  assert.ok(audit("export interface Reader { Close(): void; Read(input: string): string; }", undefined, unavailableSnapshot)
    .mismatches.every((mismatch) => mismatch.kind !== "member-order" && mismatch.kind !== "param-name"));
});

test("aggregate authored storage exposes pointer methods and replaces private Go layout", () => {
  const api = parser;
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Thing`;
  const hidden = externalType({ packagePath: "private.example/internal", name: "State", rhs: structType([]) });
  const declaredMethod = (name, receiverMode) => {
    const methodId = `${objectId}::method::${name}`;
    return {
      id: methodId,
      ownerId: objectId,
      name,
      packagePath,
      exported: true,
      signature: {
        ...signature([], []),
        receiver: variable(`${methodId}::signature::receiver`, "thing", namedType(objectId, packagePath, "Thing")),
        receiverMode,
      },
    };
  };
  const thing = externalType({
    packagePath,
    name: "Thing",
    rhs: structType([
      variable(
        `${objectId}::rhs::field::state`,
        "state",
        namedType(hidden.object.id, "private.example/internal", "State"),
        false,
      ),
    ]),
    methods: [declaredMethod("Value", "value"), declaredMethod("Pointer", "pointer")],
  });
  const snapshot = externalSnapshot([thing, hidden], [objectId]);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const source = "export class Thing { private state: number; Pointer(): void {} }";
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts", "go/private.example/internal.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Thing",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "class",
        nominality: "preserved",
        pointer: "aggregate",
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash: authoredTypeHash(moduleId, "Thing", source),
        reason: "The authored class replaces private Go layout while retaining aggregate pointer identity.",
      },
    }],
  };
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source]]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    facades: finalizedCatalog(config, snapshot, moduleIndex),
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.deepEqual(result.mismatches, []);
  assert.deepEqual(result.inventory.tsOnlyMembers, []);
  assert.deepEqual(result.inventory.unselectedGoMembers.map((member) => member.name), ["Value"]);
  assert.deepEqual(result.inventory.privateStorageMembers.map((member) => member.name), ["state"]);
  assert.throws(() => buildExternalFacadeStoragePlan({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      runtimeAdaptation: { ...config.externalFacadePolicies[0].runtimeAdaptation, pointer: undefined },
    }],
  }, snapshot), /aggregate Go storage requires exact pointer storage/);
});

test("slot-authored aggregate storage carries pointer-only methods through exact metadata", () => {
  const api = parser;
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::SlotThing`;
  const declaredMethod = (name, receiverMode) => {
    const methodId = `${objectId}::method::${name}`;
    return {
      id: methodId,
      ownerId: objectId,
      name,
      packagePath,
      exported: true,
      signature: {
        ...signature([], []),
        receiver: variable(`${methodId}::signature::receiver`, "thing", namedType(objectId, packagePath, "SlotThing")),
        receiverMode,
      },
    };
  };
  const thing = externalType({
    packagePath,
    name: "SlotThing",
    rhs: structType([]),
    methods: [declaredMethod("Value", "value"), declaredMethod("Pointer", "pointer")],
  });
  const snapshot = externalSnapshot([thing]);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const compatModuleId = `${baseConfig.tsRoot}/go/compat.ts`;
  const compatSource = "export type GoPointerMethodSet<T extends object> = T; declare global { const __tsgoPointerMethodSet: unique symbol; }";
  const seedSource = "export interface SlotThing { Value(): void; }\n";
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const policy = {
    objectId,
    tsModule: "go/example.com/native.ts",
    tsName: "SlotThing",
    storageStrategy: "authored",
    runtimeAdaptation: {
      representation: "structural",
      pointer: "slot",
      nominality: "erased",
      nominalityReason: "The structural slot representation intentionally erases the defined Go aggregate identity.",
      goDeclarationHash: semanticDeclarationVariantsHash(semantic),
      tsDeclarationHash: authoredTypeHash(moduleId, "SlotThing", seedSource, new Map([[compatModuleId, compatSource]])),
      reason: "The aggregate value is stored structurally while pointers use a replaceable slot with exact method metadata.",
    },
  };
  const provisionalConfig = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [policy],
  };
  const seedIndex = indexTypeScriptModuleSources(api, new Map([
    [moduleId, seedSource],
    [compatModuleId, compatSource],
  ]));
  const provisionalFacades = finalizedCatalog(provisionalConfig, snapshot, seedIndex);
  const source = createExternalFacadeContractRenderer(provisionalConfig, snapshot, provisionalFacades)(
    provisionalFacades.auditFacades(provisionalConfig, snapshot).get(objectId),
    semantic.byProfile.get(0),
    0,
  ).source;
  assert.match(source, /__tsgoPointerMethodSet/);
  assert.match(source, /Pointer\(\): void/);
  const config = {
    ...provisionalConfig,
    externalFacadePolicies: [{
      ...policy,
      runtimeAdaptation: {
        ...policy.runtimeAdaptation,
        tsDeclarationHash: authoredTypeHash(moduleId, "SlotThing", source, new Map([[compatModuleId, compatSource]])),
      },
    }],
  };
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, source], [compatModuleId, compatSource]]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    facades: finalizedCatalog(config, snapshot, moduleIndex),
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.deepEqual(result.mismatches, []);
  assert.deepEqual(result.inventory.tsOnlyMembers, []);
  assert.deepEqual(result.inventory.unselectedGoMembers.map((member) => member.name), []);
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
  const seedIndex = indexTypeScriptModuleSources(api, new Map([[
    moduleId,
    "export interface Sealed { Read(): void; }\n",
  ]]));
  const seedFacades = finalizedCatalog(config, snapshot, seedIndex);
  const facade = seedFacades.auditFacades(config, snapshot).get(objectId);
  const exactSource = createExternalFacadeContractRenderer(config, snapshot, seedFacades)(
    facade,
    snapshot.semantic.dependencyTypeDeclarations[0].type,
    0,
  ).source;
  const exactIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, exactSource]]));
  const exact = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    facades: finalizedCatalog(config, snapshot, exactIndex),
    moduleIndex: exactIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, exactIndex),
  });
  assert.deepEqual(exact.mismatches, []);
  assert.deepEqual(exact.inventory.tsOnlyMembers, []);
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, "export interface Sealed { Read(): void; }"]]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    facades: finalizedCatalog(config, snapshot, moduleIndex),
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
  for (const policy of config.externalFacadePolicies) {
    assert.throws(() => finalizedCatalog({ ...config, externalFacadePolicies: [policy] }, snapshot, moduleIndex), /must be stored directly/);
  }
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
  assert.throws(() => buildExternalFacadeStoragePlan({
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
      facades: finalizedCatalog(config, snapshot, moduleIndex),
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  assert.deepEqual(audit(exactSource).mismatches, []);
  const numberSource = "export type Tag = number;";
  const numberHash = authoredTypeHash(moduleId, "Tag", numberSource);
  assert.throws(
    () => audit(numberSource),
    new RegExp(`authored facade surfaces drifted[\\s\\S]*example\\.com/native::type::Tag: config=${tsDeclarationHash} current=${numberHash}`),
  );
  assert.throws(() => audit('export type Tag = string & { mutable: "Tag" };'), /reviewed TypeScript declaration hashes/);
  assert.throws(() => buildExternalFacadeStoragePlan({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      runtimeAdaptation: { ...config.externalFacadePolicies[0].runtimeAdaptation, pointer: "slot" },
    }],
  }, snapshot), /pointer storage applies only to Go values with aggregate storage/);
  const profileDrift = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("string"), profiles: [0] }),
    externalType({ packagePath: "example.com/native", name: "Tag", rhs: basic("int"), profiles: [1] }),
  ]);
  assert.throws(() => buildExternalFacadeStoragePlan(config, profileDrift), /cannot erase profile-dependent Go declaration semantics/);
  assert.throws(() => buildExternalFacadeStoragePlan({
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

test("authored facade declaration-hash drift reports every reviewed surface deterministically", () => {
  const tsModule = "go/example.com/native.ts";
  const moduleId = `${baseConfig.tsRoot}/${tsModule}`;
  const exactSource = "export type Alpha = string;\nexport type Zeta = string;\n";
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Zeta", rhs: basic("string") }),
    externalType({ packagePath: "example.com/native", name: "Alpha", rhs: basic("string") }),
  ]);
  const semanticTypes = buildDependencySemanticTypeIndex(snapshot);
  const policies = ["Zeta", "Alpha"].map((name) => ({
    objectId: `example.com/native::type::${name}`,
    tsModule,
    tsName: name,
    storageStrategy: "authored",
    runtimeAdaptation: {
      representation: "scalar",
      scalarStorage: "string",
      nominality: "preserved",
      goDeclarationHash: semanticDeclarationVariantsHash(semanticTypes.get(`example.com/native::type::${name}`)),
      tsDeclarationHash: authoredTypeHash(moduleId, name, exactSource),
      reason: "The native identifier is stored as one exact branded JavaScript string scalar.",
    },
  }));
  const config = {
    ...baseConfig,
    authoredFacadeModules: [tsModule],
    externalFacadePolicies: policies,
  };
  const driftSource = "export type Alpha = number;\nexport type Zeta = number;\n";
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, driftSource]]));
  assert.throws(
    () => finalizedCatalog(config, snapshot, moduleIndex),
    (error) => {
      assert.match(error.message, /authored facade surfaces drifted from their reviewed TypeScript declaration hashes/);
      const alpha = error.message.indexOf("example.com/native::type::Alpha");
      const zeta = error.message.indexOf("example.com/native::type::Zeta");
      assert.ok(alpha >= 0 && zeta > alpha, error.message);
      return true;
    },
  );
});
