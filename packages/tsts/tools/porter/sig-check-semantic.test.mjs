import assert from "node:assert/strict";
import test from "node:test";

import { canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const modulePath = "example.com/proj";
const packagePath = `${modulePath}/pkg`;

test("portability: a non-tsts profile drives canonical Go-to-TS mapping", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: { int: "i32" } });
  const index = buildExpectedIndex(config, { files: [] }, new Map(), loadProfile(config));
  const pointer = functionUnit("pointer", [pointerType(basicType("int"))]);
  assert.equal(canonicalKey(goUnitDescriptor(pointer, index).params[0].type), "R:src/rt/bridge.ts::Ptr<R:@acme/prim::i32>");

  const duration = functionUnit("duration", [namedType("time", "Duration")]);
  assert.equal(canonicalKey(goUnitDescriptor(duration, index).params[0].type), "R:src/rt/time.ts::Duration");

  const source = functionUnit("source", [namedType("math/rand/v2", "Source")]);
  assert.equal(canonicalKey(goUnitDescriptor(source, index).params[0].type), "R:src/rt/math/rand/v2.ts::Source");
});

test("expected-from-go: inline struct value types use resolved array lengths", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: { int: "i32" } });
  const index = buildExpectedIndex(config, { files: [] }, new Map(), loadProfile(config));
  const fields = [structField("flag", basicType("int")), structField("name", basicType("string"))];
  const unit = valueUnit("table", { kind: "array", length: "2", element: { kind: "struct", struct: { fields } } });
  assert.equal(canonicalKey(goUnitDescriptor(unit, index).decls[0].type), "R:src/rt/bridge.ts::Arr<O:{flag:R:@acme/prim::i32;name:K:string},L:\"2\">");
});

test("expected-from-go: receiver methods remain separate from struct data", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: {} });
  const base = typeUnit("base.go", "Base", structType([]));
  const child = typeUnit("child.go", "Child", structType([
    structField("Signature", basicType("string")),
    structField("Base", namedType(packagePath, "Base"), true),
  ]));
  const method = methodUnit("base.go", "Base", "Signature", [], [basicType("string")]);
  const file = { importPath: packagePath, imports: [], units: [base, method, child] };
  const tsById = new Map([[base.id, { path: "pkg/base.ts" }], [child.id, { path: "pkg/child.ts" }]]);
  const index = buildExpectedIndex(config, { files: [file] }, tsById, loadProfile(config));

  const descriptor = goUnitDescriptor(child, index);
  assert.deepEqual(descriptor.members.map((member) => member.name), ["Signature", "__tsgoEmbedded0"]);
  assert.equal(canonicalKey(descriptor.members[0].type), "K:string");
  assert.equal(goUnitDescriptor(base, index).members.some((member) => member.name === "Signature"), false);
});

test("expected-from-go: interface completion does not mutate struct signatures", () => {
  const config = projectConfig({ keyword: { bool: "boolean", string: "string" }, core: {} });
  const read = interfaceMethod("Reader", "Read", [basicType("string")], [basicType("bool")]);
  const close = interfaceMethod("ReadCloser", "Close", [], []);
  const reader = typeUnit("contracts.go", "Reader", interfaceType([read], [], [read]));
  const readerReference = namedType(packagePath, "Reader");
  const closer = typeUnit("contracts.go", "ReadCloser", interfaceType([close], [readerReference], [close, read]));
  const wrapper = typeUnit("contracts.go", "ReaderWrapper", structType([structField("Reader", readerReference, true)]));
  const file = { importPath: packagePath, imports: [], units: [reader, closer, wrapper] };
  const tsById = new Map([reader, closer, wrapper].map((unit) => [unit.id, { path: "pkg/contracts.ts" }]));
  const index = buildExpectedIndex(config, { files: [file] }, tsById, loadProfile(config));

  const descriptor = goUnitDescriptor(closer, index);
  assert.deepEqual(descriptor.members.map((member) => member.name), ["Close", "__tsgoEmbedded0", "Read"]);
  assert.equal(canonicalKey(descriptor.members[0].type), "F:<>()=>K:void");
  assert.equal(canonicalKey(descriptor.members[2].type), "F:<>(K:string)=>K:boolean");
  assert.equal(descriptor.members[2].optional, true);
  assert.deepEqual(goUnitDescriptor(wrapper, index).members.map((member) => member.name), ["__tsgoEmbedded0"]);
});

function projectConfig(primitives) {
  return {
    goModulePath: modulePath,
    signatureCheck: {
      modules: { core: "@acme/prim", compat: "src/rt/bridge.ts" },
      bridge: { pointer: "Ptr", slice: "Slc", array: "Arr", map: "Dict", chan: "Ch" },
      primitives: { ...primitives, compat: {} },
      stdlibTypes: {},
      facadeTemplate: "src/rt/{importPath}.ts",
    },
  };
}

function functionUnit(name, parameters, results = []) {
  return { id: `${modulePath}::pkg/${name}.go::func::${name}`, kind: "func", semantic: [{ kind: "func", packagePath, profiles: [0], signature: signature(`${name}::signature`, parameters, results) }] };
}

function methodUnit(file, receiver, name, parameters, results) {
  const owner = `${packagePath}::type::${receiver}::method::${name}`;
  return {
    id: `${modulePath}::pkg/${file}::method::${receiver}.${name}`,
    kind: "method",
    semantic: [{
      kind: "method", packagePath, profiles: [0],
      signature: { ...signature(`${owner}::signature`, parameters, results), receiver: semanticVariable(`${owner}::receiver`, "", namedType(packagePath, receiver)) },
    }],
  };
}

function valueUnit(name, type) {
  return {
    id: `${modulePath}::pkg/value.go::varGroup::${name}`,
    kind: "varGroup",
    semantic: [{
      kind: "varGroup", packagePath, profiles: [0],
      valueSpecs: [{ specIndex: 0, names: [{ name, nameIndex: 0, blank: false, type, object: { id: `${packagePath}::var::${name}`, name, packagePath, exported: false, type } }] }],
    }],
  };
}

function typeUnit(file, name, rhs) {
  const objectId = `${packagePath}::type::${name}`;
  const object = { id: objectId, name, packagePath, exported: true, type: namedType(packagePath, name) };
  return {
    id: `${modulePath}::pkg/${file}::type::${name}`,
    kind: "type",
    name,
    semantic: [{ kind: "type", packagePath, profiles: [0], object, type: { alias: false, object, typeParameters: [], rhs } }],
  };
}

function signature(owner, parameters, results) {
  return {
    receiverTypeParameters: [], typeParameters: [], variadic: false,
    parameters: { variables: parameters.map((type, index) => semanticVariable(`${owner}::parameter::${index}`, "", type)) },
    results: { variables: results.map((type, index) => semanticVariable(`${owner}::result::${index}`, "", type)) },
  };
}

function interfaceMethod(owner, name, parameters, results) {
  return { id: `${packagePath}::type::${owner}::method::${name}`, ownerId: `${packagePath}::type::${owner}`, name, packagePath, exported: true, signature: signature(`${owner}::${name}`, parameters, results) };
}

function semanticVariable(id, name, type, embedded = false) {
  return { id, name, packagePath, embedded, exported: false, type };
}

function structField(name, type, embedded = false) {
  return { variable: semanticVariable(`${packagePath}::field::${name}`, name, type, embedded), tag: "", tagValues: [], tagRemainder: "" };
}

function basicType(name) {
  return { kind: "basic", basic: { name, untyped: false } };
}

function namedType(ownerPackage, name) {
  return { kind: "named", reference: { objectId: `${ownerPackage}::type::${name}`, packagePath: ownerPackage, name, typeArgs: [] } };
}

function pointerType(element) {
  return { kind: "pointer", element };
}

function structType(fields) {
  return { kind: "struct", struct: { fields } };
}

function interfaceType(explicitMethods, embeddedTypes, completeMethods) {
  return { kind: "interface", interface: { explicitMethods, embeddedTypes, completeMethods, comparable: false, implicit: false, methodSetOnly: false } };
}
