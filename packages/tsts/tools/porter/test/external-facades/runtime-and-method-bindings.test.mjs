import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex, buildExternalFacadeStoragePlan } from "../../core/external-facades.mjs";
import { externalTypeScriptDeclarationHash } from "../../core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "../../core/semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "../../core/type-storage-policies.mjs";
import { renderExternalFacadeModules } from "../../core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "../../sig-check/authored-facades.mjs";
import { declarationOwnershipId } from "../../sig-check/declaration-ownership.mjs";
import { baseConfig } from "../helpers.mjs";
import {
  basic,
  externalSnapshot,
  externalType,
  finalizeExternalFacadeFixtureCatalog,
  finalizeGeneratedFacadeFixtureCatalog,
  method,
  namedType,
  signature,
  structType,
  variable,
} from "../external-facade-fixtures.mjs";
import { loadParser } from "../../ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractIndexedTypeExportDescriptor } from "../../ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "../../ts-extractor/module-index.mjs";
import { loadProfile } from "../../ts-extractor/profile.mjs";

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
  const audit = (source, canonicalIdentity = (identity) => identity) => {
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([
      [moduleId, source],
      [`${config.tsRoot}/go/scalars.ts`, "export type bool = boolean;"],
    ]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity,
      config,
      conventions: {},
      facades: finalizedCatalog(config, snapshot, moduleIndex),
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
  const equivalentReceiver = audit(`
import type { bool } from "../scalars.js";
export type Code = string & { readonly __code: "Code" };
export type EquivalentCode = Code;
export function Code_Valid(value: EquivalentCode, prefix: string): bool { return value.startsWith(prefix) as bool; }
`, (identity) => identity.endsWith("::EquivalentCode") ? `${moduleId}::Code` : identity);
  assert.ok(equivalentReceiver.mismatches.some((mismatch) =>
    mismatch.id === `external-method:${methodId}` && mismatch.kind === "authored-facade-receiver-storage"));
  assert.throws(() => buildExternalFacadeStoragePlan({
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
  assert.throws(() => buildExternalFacadeStoragePlan({
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      methodBindings: [{ methodId, receiverName: "class", tsName: "Code_Valid" }],
    }],
  }, snapshot), /receiverName must be one exact TypeScript identifier/);
});

test("authored fields retain source order while unavailable nested callback names stay non-semantic", () => {
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Callbacks`;
  const callback = signature([
    variable(`${objectId}::callback::parameters::0`, "arg0", basic("string")),
  ], []);
  callback.parameterNameProvenance = "unavailable";
  const declaration = externalType({
    packagePath,
    name: "Callbacks",
    rhs: structType([
      variable(`${objectId}::field::First`, "First", basic("string"), true),
      variable(`${objectId}::field::Second`, "Second", basic("string"), true),
      variable(`${objectId}::field::Handler`, "Handler", { kind: "signature", nilable: true, signature: callback }, true),
    ]),
  });
  const snapshot = externalSnapshot([declaration]);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const compatModuleId = `${baseConfig.tsRoot}/go/compat.ts`;
  const compatSource = "export type GoFunc<F> = F | null;";
  const exactSource = `
import type { GoFunc } from "../compat.js";
export interface Callbacks {
  First: string;
  Second: string;
  Handler: GoFunc<(authoredName: string) => void>;
}
`;
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const configFor = (source) => ({
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Callbacks",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "structural",
        pointer: "aggregate",
        nominality: "erased",
        nominalityReason: "The authored callback record intentionally uses structural storage rather than Go nominal identity.",
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash: authoredTypeHash(moduleId, "Callbacks", source, new Map([[compatModuleId, compatSource]])),
        reason: "The callback record is stored as one exact structural TypeScript interface with source-ordered fields.",
      },
    }],
  });
  const audit = (source) => {
    const config = configFor(source);
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [moduleId, source],
      [compatModuleId, compatSource],
    ]));
    return collectAuthoredFacadeMismatches({
      api: parser,
      canonicalIdentity: (identity) => identity,
      config,
      conventions: {},
      facades: finalizedCatalog(config, snapshot, moduleIndex),
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  assert.deepEqual(audit(exactSource).mismatches, []);
  const renamedCallback = exactSource.replace("authoredName: string", "anotherName: string");
  assert.deepEqual(audit(renamedCallback).mismatches, []);
  const wrongCallback = exactSource.replace("authoredName: string", "authoredName: number");
  assert.ok(audit(wrongCallback).mismatches.some((mismatch) => mismatch.kind === "member-type"));
  const reorderedFields = exactSource.replace("  First: string;\n  Second: string;", "  Second: string;\n  First: string;");
  assert.ok(audit(reorderedFields).mismatches.some((mismatch) => mismatch.kind === "member-order"));
});

test("authored facades require explicit consumed storage for lossless Go basic values", () => {
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Digest`;
  const methodId = `${objectId}::method::Sum64`;
  const receiver = variable(`${methodId}::signature::receiver`, "digest", namedType(objectId, packagePath, "Digest"));
  const sum64 = {
    id: methodId,
    ownerId: objectId,
    name: "Sum64",
    packagePath,
    exported: true,
    signature: { ...signature([], [variable(`${methodId}::signature::results::0`, "", basic("uint64"))]), receiver },
  };
  const declaration = externalType({
    packagePath,
    name: "Digest",
    rhs: structType([variable(`${objectId}::field::Hi`, "Hi", basic("uint64"), true)]),
    methods: [sum64],
  });
  const snapshot = externalSnapshot([declaration]);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const source = "export interface Digest { Hi: bigint; Sum64(): bigint; }";
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Digest",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "structural",
        pointer: "aggregate",
        nominality: "erased",
        nominalityReason: "The structural digest interface intentionally erases the distinct Go digest type identity.",
        basicStorage: [{
          goBasic: "uint64",
          tsScalar: "bigint",
          reason: "The digest fields and methods require lossless 64-bit arithmetic beyond JavaScript Number precision.",
        }],
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash: authoredTypeHash(moduleId, "Digest", source),
        reason: "The digest uses one exact structural interface while preserving each lossless 64-bit value as bigint.",
      },
    }],
  };
  const audit = (candidate, candidateConfig = config) => {
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, candidate]]));
    return collectAuthoredFacadeMismatches({
      api: parser,
      canonicalIdentity: (identity) => identity,
      config: candidateConfig,
      conventions: {},
      facades: finalizedCatalog(candidateConfig, snapshot, moduleIndex),
      moduleIndex,
      profile: loadProfile(candidateConfig),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  assert.deepEqual(audit(source).mismatches, []);
  assert.ok(audit(source.replaceAll("bigint", "number"), {
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      runtimeAdaptation: {
        ...config.externalFacadePolicies[0].runtimeAdaptation,
        tsDeclarationHash: authoredTypeHash(moduleId, "Digest", source.replaceAll("bigint", "number")),
      },
    }],
  }).mismatches.some((mismatch) => mismatch.kind === "member-type" || mismatch.kind === "return-type"));
  const unusedConfig = {
    ...config,
    externalFacadePolicies: [{
      ...config.externalFacadePolicies[0],
      runtimeAdaptation: {
        ...config.externalFacadePolicies[0].runtimeAdaptation,
        basicStorage: [{ goBasic: "int16", tsScalar: "number", reason: "This intentionally unused exact basic storage rule must fail closed during contract rendering." }],
      },
    }],
  };
  assert.ok(audit(source, unusedConfig).mismatches.some((mismatch) => mismatch.detail.includes("basicStorage is unused")));
});

test("scalar method bindings are authored-surface roots even when the type selects no members", () => {
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Code`;
  const needed = externalType({ packagePath: "needed.example/api", name: "Result", rhs: basic("string") });
  const methodId = `${objectId}::method::Resolve`;
  const resolve = {
    id: methodId,
    ownerId: objectId,
    name: "Resolve",
    packagePath,
    exported: true,
    signature: {
      ...signature([], [variable(
        `${methodId}::signature::results::0`,
        "",
        namedType(needed.object.id, "needed.example/api", "Result"),
      )]),
      receiver: variable(`${methodId}::signature::receiver`, "code", namedType(objectId, packagePath, "Code")),
    },
  };
  const code = externalType({ packagePath, name: "Code", rhs: basic("string"), methods: [resolve] });
  const snapshot = externalSnapshot([code, needed], [objectId]);
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const source = "export type Code = string; export function Code_Resolve(value: Code): unknown { return value; }\n";
  const policy = {
    objectId,
    tsModule: "go/example.com/native.ts",
    tsName: "Code",
    storageStrategy: "authored",
    methodBindings: [{
      methodId,
      receiverName: "value",
      tsName: "Code_Resolve",
      reason: "Scalar Code storage promotes the exact Go method to one top-level binding.",
    }],
    runtimeAdaptation: {
      representation: "scalar",
      scalarStorage: "string",
      nominality: "erased",
      nominalityReason: "The authored JavaScript string storage intentionally erases Go defined-type nominality.",
      goDeclarationHash: semanticDeclarationVariantsHash(semantic),
      tsDeclarationHash: authoredTypeHash(moduleId, "Code", source),
      reason: "The native code is stored as one exact JavaScript string scalar.",
    },
  };
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [policy],
  };
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, source]]));
  const withBinding = finalizedCatalog(config, snapshot, moduleIndex);
  assert.equal(withBinding.artifactFacades(config, snapshot).has(needed.object.id), true);
  const withoutBindingConfig = {
    ...config,
    externalFacadePolicies: [{ ...policy, methodBindings: [] }],
  };
  const withoutBinding = finalizedCatalog(withoutBindingConfig, snapshot, moduleIndex);
  assert.equal(withoutBinding.artifactFacades(withoutBindingConfig, snapshot).has(needed.object.id), false);
});

test("scalar authored storage does not turn private aggregate layout or unexported methods into policy roots", () => {
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Tag`;
  const hidden = externalType({ packagePath: "hidden.example/internal", name: "State", rhs: structType([]) });
  const methodId = `${objectId}::method::hiddenState`;
  const hiddenMethod = {
    id: methodId,
    ownerId: objectId,
    name: "hiddenState",
    packagePath,
    exported: false,
    signature: {
      ...signature([], [variable(
        `${methodId}::signature::results::0`,
        "",
        namedType(hidden.object.id, "hidden.example/internal", "State"),
      )]),
      receiver: variable(`${methodId}::signature::receiver`, "tag", namedType(objectId, packagePath, "Tag")),
      receiverMode: "pointer",
    },
  };
  const tag = externalType({
    packagePath,
    name: "Tag",
    rhs: structType([variable(
      `${objectId}::field::state`,
      "state",
      namedType(hidden.object.id, "hidden.example/internal", "State"),
      false,
    )]),
    methods: [hiddenMethod],
  });
  const snapshot = externalSnapshot([tag, hidden], [objectId]);
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const source = "export type Tag = string;\n";
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
        pointer: "slot",
        nominality: "erased",
        nominalityReason: "The authored JavaScript string storage intentionally erases aggregate Go layout and nominality.",
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash: authoredTypeHash(moduleId, "Tag", source),
        reason: "The private native layout is represented by one reviewed JavaScript string scalar.",
      },
    }],
  };
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, source]]));
  const catalog = finalizedCatalog(config, snapshot, moduleIndex);
  assert.deepEqual([...catalog.artifactFacades(config, snapshot).keys()], [objectId]);
  const rendered = renderExternalFacadeModules(config, snapshot, catalog);
  assert.equal([...rendered.values()].some((text) => text.includes("hiddenState") || text.includes("State")), false);
});

test("external facade policy rejects hand-authored Go semantics and unknown objects", () => {
  const snapshot = externalSnapshot([externalType({ packagePath: "time", name: "Duration", rhs: basic("int64") })]);
  assert.throws(
    () => buildExternalFacadeStoragePlan({
      ...baseConfig,
      externalFacadePolicies: [{ objectId: "time::type::Duration", arity: 0, kind: "type", typeExpression: basic("int64") }],
    }, snapshot),
    /forbidden hand-authored Go semantic field/,
  );
  assert.throws(
    () => buildExternalFacadeStoragePlan({
      ...baseConfig,
      authoredFacadeModules: ["go/time.ts"],
      externalFacadePolicies: [{ objectId: "time::type::Missing", tsModule: "go/time.ts", tsName: "Missing", storageStrategy: "authored" }],
    }, snapshot),
    /no extracted go\/types declaration/,
  );
  for (const forbidden of [
    { members: ["String"] },
    { embeddings: ["io::type::Writer"] },
  ]) {
    assert.throws(
      () => buildExternalFacadeStoragePlan({
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
  const config = { ...baseConfig, externalFacadePolicies: [generatedPolicy] };
  const source = renderExternalFacadeModules(config, snapshot, finalizeGeneratedFacadeFixtureCatalog(config, snapshot))
    .get("go/example.com/native.ts");
  assert.match(source, /export type Thing =/);
  assert.match(source, /Use\(\): void/);
  assert.doesNotMatch(source, /export class Thing|TSGO_EXTERNAL_FACADE_UNIMPLEMENTED/);
  assert.throws(() => buildExternalFacadeStoragePlan({
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
  assert.throws(() => buildExternalFacadeStoragePlan({
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
    () => {
      const config = {
      ...baseConfig,
      externalFacadePolicies: [{ objectId, tsModule: "go/example.com/native.ts", tsName: "Word", storageStrategy: "generated" }],
      };
      return renderExternalFacadeModules(config, snapshot, finalizeGeneratedFacadeFixtureCatalog(config, snapshot));
    },
    /renders differently across active semantic profiles/,
  );
  assert.throws(() => buildExternalFacadeStoragePlan({
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
