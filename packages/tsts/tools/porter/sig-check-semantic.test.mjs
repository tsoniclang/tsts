import assert from "node:assert/strict";
import test from "node:test";

import { buildExpectedIndex as buildExpectedIndexRaw, goUnitDescriptor, semanticTypeDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { compareSignatures, generatedTypeDeclarations } from "./sig-check.mjs";
import { testSemanticProfile } from "./test/helpers.mjs";
import { buildSemanticTypeCatalog } from "./core/type-storage-policies.mjs";
import { semanticDeclarationVariantsHash } from "./core/semantic-declaration-hash.mjs";
import { finalizeGeneratedFacadeFixtureCatalog } from "./test/external-facade-fixtures.mjs";

const modulePath = "example.com/proj";
const packagePath = `${modulePath}/pkg`;

function buildExpectedIndex(config, snapshot, tsById, profile, generatedTypeDeclarations = new Map()) {
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  return buildExpectedIndexRaw(config, snapshot, tsById, profile, generatedTypeDeclarations, {
    externalFacadeStorageView: externalFacadeCatalog.artifactFacades(config, snapshot),
  });
}

test("expected type index ignores non-type units without semantic variants", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: {} });
  const importGroup = { id: `${modulePath}::pkg/file.go::importGroup::fmt`, kind: "importGroup" };
  const unportedType = { id: `${modulePath}::pkg/file.go::type::Hidden`, kind: "type", name: "Hidden" };
  const snapshot = semanticSnapshot([{ importPath: packagePath, units: [importGroup, unportedType] }]);
  assert.doesNotThrow(() => buildExpectedIndex(config, snapshot, new Map(), loadProfile(config)));
  const generatedIndex = buildExpectedIndex(config, snapshot, new Map(), loadProfile(config),
    new Map([["Hidden", new Set(["src/pkg/generated.ts"])]]));
  assert.equal(generatedIndex.pkgType.get(`${packagePath}::Hidden`), "src/pkg/generated.ts");
  assert.throws(() => buildExpectedIndex(config, snapshot, new Map([[unportedType.id, { path: "pkg/hidden.ts" }]]), loadProfile(config)),
    /has no semantic profile variants/);
});

test("expected type index resolves one exact generated declaration and rejects ambiguity", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: {} });
  const generated = typeUnit("generated.go", "Generated", structType([]));
  const snapshot = semanticSnapshot([{ importPath: packagePath, units: [generated] }]);
  const profile = loadProfile(config);
  const exact = new Map([["Generated", new Set(["src/pkg/generated/types.ts"])] ]);
  const index = buildExpectedIndex(config, snapshot, new Map(), profile, exact);
  assert.equal(index.pkgType.get(`${packagePath}::Generated`), "src/pkg/generated/types.ts");
  const ambiguous = new Map([["Generated", new Set(["src/pkg/generated/a.ts", "src/pkg/generated/b.ts"])] ]);
  assert.throws(() => buildExpectedIndex(config, snapshot, new Map(), profile, ambiguous), /ambiguous generated TypeScript declarations/);
});

test("generated type identities require registered generated-artifact ownership", () => {
  const generatedModule = "src/internal/ast/generated/types.ts";
  const authoredModule = "src/pkg/authored.ts";
  const metadata = '// @tsgo-generated {"schemaVersion":1,"kind":"ast-generated","generator":"porter:ast","sourceRevision":"rev","path":"internal/ast/generated/types.ts","contentHash":"hash"}';
  const moduleIndex = {
    modules: new Map([
      [generatedModule, {
        text: `// Code generated. DO NOT EDIT.\n${metadata}\nexport type Generated = unknown;`,
        structure: { exportedTypeNames: new Set(["Generated"]) },
      }],
      [authoredModule, {
        text: "export type Authored = unknown;",
        structure: { exportedTypeNames: new Set(["Authored"]) },
      }],
    ]),
  };
  const declarations = generatedTypeDeclarations({ tsRoot: "src" }, moduleIndex);
  assert.deepEqual([...declarations], [["Generated", new Set([generatedModule])]]);
});

test("portability: a non-tsts profile drives canonical Go-to-TS mapping", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: { int: "i32" } });
  const pointer = functionUnit("pointer", [pointerType(basicType("int"))]);
  const duration = functionUnit("duration", [namedType("time", "Duration")]);
  const source = functionUnit("source", [namedType("math/rand/v2", "Source", true)]);
  const snapshot = semanticSnapshot([{ importPath: packagePath, units: [pointer, duration, source] }], [
    externalType("time", "Duration", basicType("int64")),
    externalType("math/rand/v2", "Source", interfaceType([], [], [])),
  ]);
  const index = buildExpectedIndex(config, snapshot, new Map(), loadProfile(config));
  assert.deepEqual(goUnitDescriptor(pointer, index).signatures[0].params[0].type, {
    t: "ref",
    id: "src/rt/bridge.ts::Ref",
    args: [{ t: "ref", id: "@acme/prim::i32", args: [] }],
  });

  assert.deepEqual(goUnitDescriptor(duration, index).signatures[0].params[0].type, {
    t: "ref", id: "src/rt/time.ts::Duration", args: [],
  });

  assert.deepEqual(goUnitDescriptor(source, index).signatures[0].params[0].type, {
    t: "ref",
    id: "src/rt/bridge.ts::Iface",
    args: [{ t: "ref", id: "src/rt/math/rand/v2.ts::Source", args: [] }],
  });
});

test("expected types use only explicit full-identity host-native mappings", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: {} });
  const event = functionUnit("event", [namedType("example.com/native", "Event")]);
  const other = functionUnit("other", [namedType("example.com/native", "Other")]);
  const snapshot = semanticSnapshot([{ importPath: packagePath, units: [event, other] }], [
    externalType("example.com/native", "Event", structType([])),
    externalType("example.com/native", "Other", structType([])),
  ]);
  const objectId = "example.com/native::type::Event";
  config.semanticRelations = [storageRelation(snapshot, objectId, "src/native/events.ts::HostEvent")];
  const index = buildExpectedIndex(config, snapshot, new Map(), loadProfile(config));
  const context = { index, profile: 0, typeParameters: new Map() };
  assert.deepEqual(semanticTypeDescriptor(namedType("example.com/native", "Event"), context),
    { t: "ref", id: "src/native/events.ts::HostEvent", args: [] });
  assert.deepEqual(semanticTypeDescriptor(namedType("example.com/native", "Other"), context),
    { t: "ref", id: "src/rt/example.com/native.ts::Other", args: [] });
});

test("expected-from-go: inline struct value types use resolved array lengths", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: { int: "i32" } });
  const index = buildExpectedIndex(config, semanticSnapshot(), new Map(), loadProfile(config));
  const fields = [structField("flag", basicType("int")), structField("name", basicType("string"))];
  const unit = valueUnit("table", { kind: "array", nilable: false, length: "2", element: { kind: "struct", nilable: false, struct: { fields } } });
  assert.deepEqual(goUnitDescriptor(unit, index).decls[0].type, {
    t: "ref",
    id: "src/rt/bridge.ts::Arr",
    args: [
      {
        t: "object",
        members: [
          { kind: "property", name: "flag", modifiers: [], optional: undefined, type: { t: "ref", id: "@acme/prim::i32", args: [] } },
          { kind: "property", name: "name", modifiers: [], optional: undefined, type: { t: "kw", kw: "string" } },
        ],
      },
      { t: "literal", kind: "string", value: "2" },
    ],
  });
});

test("expected-from-go: named uint64 constants derive exact bigint values through aliases", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: { int64: "long", uint64: "ulong" } });
  config.signatureCheck.constantRepresentations = { bigintBasics: ["uint64"], bigintNamedTypes: [] };
  const symbolTableId = typeUnit("ids.go", "symbolTableID", basicType("uint64"));
  const symbolTableAlias = typeUnit("ids.go", "symbolTableAlias", namedType(packagePath, "symbolTableID"), [], true);
  const smallId = typeUnit("ids.go", "smallID", basicType("int64"));
  const stKindValues = [
    ["stKindLocals", namedType(packagePath, "symbolTableID"), "0"],
    ["stKindExports", namedType(packagePath, "symbolTableID"), "2305843009213693952"],
    ["stKindMembers", namedType(packagePath, "symbolTableID"), "4611686018427387904"],
    ["stKindGlobals", namedType(packagePath, "symbolTableID"), "6917529027641081856"],
    ["stKindResolvedExports", namedType(packagePath, "symbolTableID"), "9223372036854775808"],
    ["stKindMask", namedType(packagePath, "symbolTableID"), "9223372036854775808"],
    ["aliasMaximum", aliasType(packagePath, "symbolTableAlias"), "18446744073709551615"],
    ["ordinary", namedType(packagePath, "smallID"), "42"],
  ];
  const constants = constantUnit(stKindValues);
  const file = { importPath: packagePath, imports: [], units: [symbolTableId, symbolTableAlias, smallId, constants] };
  const tsById = new Map([
    [symbolTableId.id, { path: "pkg/ids.ts" }],
    [symbolTableAlias.id, { path: "pkg/ids.ts" }],
    [smallId.id, { path: "pkg/ids.ts" }],
  ]);
  const index = buildExpectedIndex(config, semanticSnapshot([file]), tsById, loadProfile(config));

  assert.deepEqual([...index.constantRepresentations.bigintNamedTypes], []);
  assert.deepEqual(goUnitDescriptor(constants, index).decls.map((declaration) => declaration.value), [
    { kind: "bigint", value: "0" },
    { kind: "bigint", value: "2305843009213693952" },
    { kind: "bigint", value: "4611686018427387904" },
    { kind: "bigint", value: "6917529027641081856" },
    { kind: "bigint", value: "9223372036854775808" },
    { kind: "bigint", value: "9223372036854775808" },
    { kind: "bigint", value: "18446744073709551615" },
    { kind: "number", value: "42" },
  ]);
});

test("expected-from-go: receiver methods remain separate from struct data", () => {
  const config = projectConfig({ keyword: { string: "string" }, core: {} });
  const base = typeUnit("base.go", "Base", structType([]));
  const child = typeUnit("child.go", "Child", structType([
    structField("Signature", basicType("string")),
    structField("Base", namedType(packagePath, "Base"), true),
  ]), [
    { kind: "field", name: "Signature" },
    { kind: "embeddedField", name: "Base" },
  ]);
  const method = methodUnit("base.go", "Base", "Signature", [], [basicType("string")]);
  const file = { importPath: packagePath, imports: [], units: [base, method, child] };
  const tsById = new Map([[base.id, { path: "pkg/base.ts" }], [child.id, { path: "pkg/child.ts" }]]);
  const index = buildExpectedIndex(config, semanticSnapshot([file]), tsById, loadProfile(config));

  const descriptor = goUnitDescriptor(child, index);
  assert.deepEqual(descriptor.members.map((member) => member.name), ["Signature", "__tsgoEmbedded0"]);
  assert.deepEqual(descriptor.members[0].type, { t: "kw", kw: "string" });
  assert.equal(goUnitDescriptor(base, index).members.some((member) => member.name === "Signature"), false);
});

test("expected-from-go: interface descriptors contain only source-declared members", () => {
  const config = projectConfig({ keyword: { bool: "boolean", string: "string" }, core: {} });
  const read = interfaceMethod("Reader", "Read", [basicType("string")], [basicType("bool")]);
  const close = interfaceMethod("ReadCloser", "Close", [], []);
  const reader = typeUnit("contracts.go", "Reader", interfaceType([read], [], [read]), [
    { kind: "method", name: "Read" },
  ]);
  const readerReference = namedType(packagePath, "Reader", true);
  const closer = typeUnit("contracts.go", "ReadCloser", interfaceType([close], [readerReference], [close, read]), [
    { kind: "method", name: "Close" },
    { kind: "embeddedInterface", name: "Reader" },
  ]);
  const wrapper = typeUnit("contracts.go", "ReaderWrapper", structType([structField("Reader", readerReference, true)]), [
    { kind: "embeddedField", name: "Reader" },
  ]);
  const file = { importPath: packagePath, imports: [], units: [reader, closer, wrapper] };
  const tsById = new Map([reader, closer, wrapper].map((unit) => [unit.id, { path: "pkg/contracts.ts" }]));
  const index = buildExpectedIndex(config, semanticSnapshot([file]), tsById, loadProfile(config));

  const descriptor = goUnitDescriptor(closer, index);
  assert.deepEqual(descriptor.members.map((member) => member.name), ["Close"]);
  assert.deepEqual(descriptor.heritage, [{ token: "extends", space: "type", types: [{ t: "ref", id: "pkg/contracts.ts::Reader", args: [] }] }]);
  assert.deepEqual(descriptor.members[0].type, {
    t: "fn",
    params: [],
    ret: { t: "kw", kw: "void" },
    missingReturnType: false,
    returnTypePolicy: "required",
    typeParams: [],
    signatureModifiers: [],
  });
  assert.equal(descriptor.members.length, 1);
  assert.deepEqual(descriptor.members[0].modifiers, []);
  assert.equal(descriptor.members[0].optional, undefined);
  assert.deepEqual(goUnitDescriptor(wrapper, index).members.map((member) => member.name), ["__tsgoEmbedded0"]);
});

test("expected-from-go: interface syntax order survives semantic extraction and real TS reorders fail", () => {
  const config = projectConfig({ keyword: { bool: "boolean", int: "number", string: "string" }, core: {} });
  const embeddedMethod = interfaceMethod("Embedded", "EmbeddedOnly", [], [basicType("bool")]);
  const embedded = typeUnit("contracts.go", "Embedded", interfaceType([embeddedMethod], [], [embeddedMethod]), [
    { kind: "method", name: "EmbeddedOnly" },
  ]);
  const embeddedReference = namedType(packagePath, "Embedded", true);
  const zulu = interfaceMethod("Ordered", "Zulu", [basicType("int")], [basicType("string")]);
  const alpha = interfaceMethod("Ordered", "Alpha", [basicType("bool")], []);
  const ordered = typeUnit("contracts.go", "Ordered", interfaceType(
    [zulu, alpha],
    [embeddedReference],
    [alpha, embeddedMethod, zulu],
  ), [
    { kind: "method", name: "Zulu" },
    { kind: "embeddedInterface", name: "Embedded" },
    { kind: "method", name: "Alpha" },
  ]);
  const file = { importPath: packagePath, imports: [], units: [embedded, ordered] };
  const tsById = new Map([[embedded.id, { path: "pkg/contracts.ts" }], [ordered.id, { path: "pkg/contracts.ts" }]]);
  const index = buildExpectedIndex(config, semanticSnapshot([file]), tsById, loadProfile(config));

  const expected = goUnitDescriptor(ordered, index);
  assert.deepEqual(expected.members.map((member) => member.name), ["Zulu", "Alpha"]);
  assert.deepEqual(expected.heritage, [{ token: "extends", space: "type", types: [{ t: "ref", id: "pkg/contracts.ts::Embedded", args: [] }] }]);

  const reordered = structuredClone(expected);
  reordered.members = [reordered.members[1], reordered.members[0]];
  reordered.fragments[0].members = structuredClone(reordered.members);
  assert.deepEqual(compareSignatures(expected, reordered, null).map((mismatch) => mismatch.kind), ["member-order"]);
});

test("expected-from-go: interface embeddings use heritage and struct embeddings stay required mutable storage", () => {
  const config = projectConfig({ keyword: { int: "number" }, core: {} });
  const base = typeUnit("embedding.go", "Base", interfaceType([], [], []), []);
  const extra = typeUnit("embedding.go", "Extra", interfaceType([], [], []), []);
  const baseReference = namedType(packagePath, "Base", true);
  const extraReference = namedType(packagePath, "Extra", true);
  const multi = typeUnit("embedding.go", "Multi", interfaceType([], [baseReference, extraReference], []), [
    { kind: "embeddedInterface", name: "Base" },
    { kind: "embeddedInterface", name: "Extra" },
  ]);
  const product = typeUnit("embedding.go", "Product", structType([
    structField("Base", baseReference, true),
    structField("Count", basicType("int")),
  ]), [
    { kind: "embeddedField", name: "Base" },
    { kind: "field", name: "Count" },
  ]);
  const file = { importPath: packagePath, imports: [], units: [base, extra, multi, product] };
  const tsById = new Map([base, extra, multi, product].map((unit) => [unit.id, { path: "pkg/embedding.ts" }]));
  const index = buildExpectedIndex(config, semanticSnapshot([file]), tsById, loadProfile(config));

  const multiExpected = goUnitDescriptor(multi, index);
  assert.deepEqual(multiExpected.members.map((member) => member.name), ["__tsgoEmpty"]);
  assert.deepEqual(multiExpected.heritage, [{
    token: "extends",
    space: "type",
    types: [
      { t: "ref", id: "pkg/embedding.ts::Base", args: [] },
      { t: "ref", id: "pkg/embedding.ts::Extra", args: [] },
    ],
  }]);
  assert.deepEqual(compareSignatures(multiExpected, structuredClone(multiExpected), null), []);

  const productExpected = goUnitDescriptor(product, index);
  assert.deepEqual(productExpected.members.map((member) => member.name), ["__tsgoEmbedded0", "Count"]);
  assert.deepEqual(productExpected.members[0].modifiers, []);
  assert.equal(productExpected.members[0].optional, undefined);
  assert.equal(productExpected.members[0].readonly, undefined);

  const optionalReadonly = structuredClone(productExpected);
  optionalReadonly.members[0].modifiers = ["readonly"];
  optionalReadonly.members[0].optional = true;
  optionalReadonly.fragments[0].members = structuredClone(optionalReadonly.members);
  const storageMismatchKinds = new Set(compareSignatures(productExpected, optionalReadonly, null).map((mismatch) => mismatch.kind));
  assert.equal(storageMismatchKinds.has("member-optionality"), true);
  assert.equal(storageMismatchKinds.has("member-modifier"), true);

  const flattened = structuredClone(productExpected);
  flattened.members[0] = { ...flattened.members[0], name: "Base" };
  flattened.fragments[0].members = structuredClone(flattened.members);
  const mismatchKinds = new Set(compareSignatures(productExpected, flattened, null).map((mismatch) => mismatch.kind));
  assert.equal(mismatchKinds.has("missing-member"), true);
  assert.equal(mismatchKinds.has("extra-member"), true);
});

function projectConfig(primitives) {
  return {
    goModulePath: modulePath,
    tsRoot: "src",
    signatureCheck: {
      modules: { core: "@acme/prim", compat: "src/rt/bridge.ts" },
      bridge: {
        nilable: "Maybe", pointer: "Ptr", ref: "Ref", slice: "Slc", array: "Arr",
        map: "Dict", chan: "Ch", func: "Fn", interface: "Iface",
      },
      primitives: { ...primitives, compat: {} },
      facadeTemplate: "src/rt/{importPath}.ts",
    },
  };
}

function storageRelation(snapshot, objectId, storageIdentity) {
  const semantic = buildSemanticTypeCatalog(snapshot).get(objectId);
  return {
    kind: "go-type-storage",
    objectId,
    storageIdentity,
    goDeclarationHash: semanticDeclarationVariantsHash(semantic),
    tsDeclarationHash: "0".repeat(64),
    reason: "The test pins one exact host-native TypeScript storage declaration for this Go type.",
  };
}

function semanticSnapshot(files = [], dependencyTypeDeclarations = []) {
  const normalizedFiles = files.map((file, fileIndex) => {
    const goPath = file.path ?? `fixture/file-${fileIndex}.go`;
    return {
      ...file,
      path: goPath,
      generated: file.generated ?? false,
      units: (file.units ?? []).map((unit) => ({ ...unit, metadata: unit.metadata ?? { goPath } })),
    };
  });
  return {
    semantic: {
      dependencyTypeDeclarations,
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
      profiles: [testSemanticProfile({
        coveredFiles: normalizedFiles.map((file) => file.path),
        packageIds: normalizedFiles.map((file) => file.importPath),
      })],
    },
    files: normalizedFiles,
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

function typeUnit(file, name, rhs, members = [], alias = false) {
  const objectId = `${packagePath}::type::${name}`;
  const object = {
    id: objectId, name, packagePath, exported: true,
    type: alias ? aliasType(packagePath, name, rhs.nilable) : namedType(packagePath, name, rhs.nilable),
  };
  return {
    id: `${modulePath}::pkg/${file}::type::${name}`,
    kind: "type",
    name,
    members,
    semantic: [{
      kind: "type",
      packagePath,
      profiles: [0],
      object,
      type: {
        alias,
        object,
        typeParameters: [],
        rhs,
        methodSurface: "declaration-units",
        methods: [],
        valueMethodSet: [],
        pointerMethodSet: [],
      },
    }],
  };
}

function externalType(ownerPackage, name, rhs, alias = false) {
  const objectId = `${ownerPackage}::type::${name}`;
  const object = {
    id: objectId,
    name,
    packagePath: ownerPackage,
    exported: true,
    type: alias ? aliasType(ownerPackage, name, rhs.nilable) : namedType(ownerPackage, name, rhs.nilable),
  };
  return {
    kind: "type",
    packagePath: ownerPackage,
    object,
    type: {
      alias,
      object,
      typeParameters: [],
      rhs,
      methodSurface: "complete",
      methods: [],
      valueMethodSet: [],
      pointerMethodSet: [],
    },
    profiles: [0],
  };
}

function constantUnit(bindings) {
  const names = bindings.map(([name]) => name);
  return {
    id: `${modulePath}::pkg/values.go::constGroup::${names.join("+")}`,
    kind: "constGroup",
    name: names.join("+"),
    semantic: [{
      kind: "constGroup",
      packagePath,
      profiles: [0],
      valueSpecs: bindings.map(([name, type, exact], specIndex) => ({
        specIndex,
        names: [{ name, nameIndex: 0, blank: false, type, constant: { kind: "Int", exact } }],
      })),
    }],
  };
}

function signature(owner, parameters, results) {
  return {
    receiverTypeParameters: [], typeParameters: [], variadic: false,
    parameterNameProvenance: "source",
    parameters: { variables: parameters.map((type, index) => semanticVariable(`${owner}::parameter::${index}`, "", type)) },
    results: { variables: results.map((type, index) => semanticVariable(`${owner}::result::${index}`, "", type)) },
  };
}

function interfaceMethod(owner, name, parameters, results) {
  return { id: `${packagePath}::type::${owner}::method::${name}`, ownerId: `${packagePath}::type::${owner}`, name, packagePath, exported: true, signature: signature(`${owner}::${name}`, parameters, results) };
}

function semanticVariable(id, name, type, embedded = false) {
  const nameKind = name === "" ? "unnamed" : name === "_" ? "blank" : "named";
  return { id, name, nameKind, packagePath, embedded, exported: false, type };
}

function structField(name, type, embedded = false) {
  return { variable: semanticVariable(`${packagePath}::field::${name}`, name, type, embedded), tag: "", tagValues: [], tagRemainder: "" };
}

function basicType(name) {
  return { kind: "basic", nilable: false, basic: { name, untyped: false } };
}

function namedType(ownerPackage, name, nilable = false) {
  return { kind: "named", nilable, reference: { objectId: `${ownerPackage}::type::${name}`, packagePath: ownerPackage, name, typeArgs: [] } };
}

function aliasType(ownerPackage, name, nilable = false) {
  return { kind: "alias", nilable, reference: { objectId: `${ownerPackage}::type::${name}`, packagePath: ownerPackage, name, typeArgs: [] } };
}

function pointerType(element) {
  return { kind: "pointer", nilable: true, element };
}

function structType(fields) {
  return { kind: "struct", nilable: false, struct: { fields } };
}

function interfaceType(explicitMethods, embeddedTypes, completeMethods) {
  return {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods,
      embeddedTypes,
      embeddedKinds: embeddedTypes.map(() => "interface"),
      completeMethods,
      comparable: false,
      implicit: false,
      methodSetOnly: false,
      explicitMethodOrderProvenance: "source",
    },
  };
}
