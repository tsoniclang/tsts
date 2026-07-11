import assert from "node:assert/strict";
import test from "node:test";

import { buildExternalFacadeMap, buildExternalSemanticTypeIndex } from "./core/external-facades.mjs";
import { renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { baseConfig } from "./test/helpers.mjs";

const profile = 0;

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

test("generated method storage requires class adaptation and binds opaque bodies by exact method identity", () => {
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
  assert.throws(
    () => renderExternalFacadeModules({ ...baseConfig, externalFacadePolicies: [generatedPolicy] }, snapshot),
    /declared Go methods but no generated class runtime adaptation/,
  );

  const config = {
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: { representation: "class", pointer: "aggregate" },
    }],
  };
  const source = renderExternalFacadeModules(config, snapshot).get("go/example.com/native.ts");
  assert.match(source, /export class Thing/);
  assert.match(source, /Use\(\): void \{\n    throw new globalThis\.Error\("TSGO_EXTERNAL_FACADE_UNIMPLEMENTED example\.com\/native\.Thing\.Use"\);\n  \}/);
  const implemented = renderExternalFacadeModules({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: { representation: "class", pointer: "aggregate" },
      memberBodies: { [methodId]: "return;" },
    }],
  }, snapshot).get("go/example.com/native.ts");
  assert.match(implemented, /Use\(\): void \{\n    return;\n  \}/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      ...generatedPolicy,
      runtimeAdaptation: { representation: "class", pointer: "aggregate" },
      memberBodies: { [`${objectId}::method::Missing`]: "return;" },
    }],
  }, snapshot), /body for method.*missing from an active semantic profile/);
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

test("the full authored policy catalog is validated before active facade selection", () => {
  const used = externalType({ packagePath: "example.com/native", name: "Used", rhs: basic("int") });
  const unused = externalType({ packagePath: "example.com/native", name: "Unused", rhs: basic("int") });
  const snapshot = externalSnapshot([used, unused], [used.object.id]);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      objectId: unused.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Unused",
      storageStrategy: "authored",
    }],
  }, snapshot), /authored storage outside config\.authoredFacadeModules/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts", "go/example.com/native.ts"],
  }, snapshot), /authoredFacadeModules duplicates/);
});

function externalSnapshot(externalDeclarations, usedObjectIds = externalDeclarations.map((declaration) => declaration.object.id)) {
  const used = new Set(usedObjectIds);
  const profileIndexes = [...new Set(externalDeclarations.flatMap((declaration) => declaration.profiles))].sort((left, right) => left - right);
  return {
    gitRevision: "a".repeat(40),
    files: [{
      path: "fixture/use.go",
      generated: false,
      units: [{
        id: "fixture::fixture/use.go::func::Use",
        kind: "func",
        generated: false,
        metadata: { goPath: "fixture/use.go" },
        semantic: profileIndexes.map((profileIndex) => ({
          profiles: [profileIndex],
          signature: signature(externalDeclarations
            .filter((declaration) => used.has(declaration.object.id) && declaration.profiles.includes(profileIndex))
            .map((declaration, index) => variable(
              `fixture::func::Use::profile::${profileIndex}::signature::parameters::${index}`,
              `value${index}`,
              declaration.object.type,
            )), []),
        })),
      }],
    }],
    semantic: {
      externalDeclarations,
      profiles: profileIndexes.map(() => ({})),
    },
  };
}

function externalType({ packagePath, name, rhs, nilable = rhs.nilable, alias = false, methods = [], profiles = [profile], typeParameters = [] }) {
  const objectId = `${packagePath}::type::${name}`;
  const object = {
    id: objectId,
    name,
    packagePath,
    exported: true,
    type: { kind: alias ? "alias" : "named", nilable, reference: { objectId, packagePath, name, typeArgs: [] } },
  };
  return {
    kind: "type",
    packagePath,
    object,
    type: { alias, object, typeParameters, rhs, methods },
    profiles,
  };
}

function basic(name, nilable = false) {
  return { kind: "basic", nilable, basic: { name, untyped: false } };
}

function builtinType(name, nilable) {
  return { kind: "named", nilable, reference: { objectId: `builtin::type::${name}`, packagePath: "", name, typeArgs: [] } };
}

function namedType(objectId, packagePath, name, typeArgs = [], nilable = false) {
  return { kind: "named", nilable, reference: { objectId, packagePath, name, typeArgs } };
}

function sliceType(element) {
  return { kind: "slice", nilable: true, element };
}

function structType(fields) {
  return { kind: "struct", nilable: false, struct: { fields: fields.map((entry) => ({ variable: entry, tag: "", tagValues: [], tagRemainder: "" })) } };
}

function interfaceType(explicitMethods) {
  return {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods,
      embeddedTypes: [],
      embeddedKinds: [],
      completeMethods: explicitMethods,
      comparable: false,
      implicit: false,
      methodSetOnly: true,
    },
  };
}

function method(id, ownerId, name, methodSignature) {
  return { id, ownerId, name, packagePath: "io", exported: true, signature: methodSignature };
}

function signature(parameters, results) {
  return {
    receiverTypeParameters: [],
    typeParameters: [],
    parameters: { variables: parameters },
    results: { variables: results },
    variadic: false,
  };
}

function variable(id, name, type, exported = false) {
  return { id, name, packagePath: "", exported, type };
}
