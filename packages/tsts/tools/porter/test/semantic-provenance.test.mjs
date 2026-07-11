import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import { validatePorterSnapshot } from "../core/snapshot.mjs";
import { canonicalSemanticDeclaration, semanticProfileKey, validateProfileArchitecture } from "../core/snapshot-validation.mjs";
import { repoRoot } from "../core/runtime.mjs";
import {
  fileRecord,
  funcType,
  identType,
  semanticFunctionDeclaration,
  signatureHash,
  testBodyHash,
  testSemanticEnvironment,
  testSemanticProfileKey,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

const config = { sourceRoot: ".", goModulePath: "m" };

test("semantic profile keys and file provenance are exact relational evidence", () => {
  const base = functionSnapshot();
  assert.deepEqual(validate(base), []);
  assert.equal(semanticProfileKey(base.semantic.profiles[0]), testSemanticProfileKey);
  const declaration = base.files[0].units[0].semantic[0];
  const reordered = Object.fromEntries(Object.entries(declaration).reverse());
  reordered.object = Object.fromEntries(Object.entries(reordered.object).reverse());
  assert.equal(canonicalSemanticDeclaration(reordered), canonicalSemanticDeclaration(declaration));
  const experimental = structuredClone(base);
  experimental.semantic.profiles[0].experiments = "regabiargs";
  experimental.semantic.profiles[0].goexperiment = "regabiargs";
  experimental.semantic.profiles[0].environment = testSemanticEnvironment({ goexperiment: "regabiargs" });
  experimental.semantic.profiles[0].toolTags.push("goexperiment.regabiargs");
  experimental.semantic.profiles[0].toolTags.sort();
  experimental.files[0].units[0].semantic[0].profiles = [0];
  assert.deepEqual(validate(experimental), []);
  assert.equal(semanticProfileKey(experimental.semantic.profiles[0]), "linux/amd64:cgo=0:arch=GOAMD64=v1:compiler=gc:experiments=regabiargs:goexperiment=regabiargs:tags=");

  for (const [description, mutate, pattern] of [
    ["missing required path", (value) => value.semantic.requiredFiles.push("missing.go"), /references missing snapshot file/],
    ["missing covered path", (value) => value.semantic.coveredFiles.push("missing.go"), /references missing snapshot file/],
    ["missing excluded path", (value) => value.semantic.excludedFiles.push("missing.go"), /references missing snapshot file/],
    ["non-primary required path", (value) => {
      value.files.push(testOnlyFile("internal/z_test.go"));
      value.semantic.requiredFiles.push("internal/z_test.go");
      value.semantic.coveredFiles.push("internal/z_test.go");
      value.semantic.profiles[0].coveredFiles.push("internal/z_test.go");
      refreshSummary(value);
    }, /includes non-primary file/],
    ["covered missing required", (value) => value.semantic.coveredFiles.length = 0, /coveredFiles must equal requiredFiles; missing/],
    ["covered extra", (value) => {
      value.files.push(testOnlyFile("internal/z_test.go"));
      value.semantic.coveredFiles.push("internal/z_test.go");
      refreshSummary(value);
    }, /coveredFiles must equal requiredFiles; extra/],
    ["duplicate required path", (value) => value.semantic.requiredFiles.push("internal/a.go"), /sorted with no duplicates/],
    ["duplicate profile key", (value) => value.semantic.profiles.push(structuredClone(value.semantic.profiles[0])), /duplicates semantic profile key/],
    ["removed global experiments", (value) => value.semantic.experiments = "", /snapshot.semantic keys must be exactly/],
    ["unsorted profile experiments", (value) => value.semantic.profiles[0].experiments = "z,a", /experiments must be sorted/],
    ["unsorted GOEXPERIMENT directives", (value) => value.semantic.profiles[0].goexperiment = "z,noa", /directives must be sorted/],
    ["empty profile coverage", (value) => value.semantic.profiles[0].coveredFiles = [], /coveredFiles must be non-empty/],
    ["profile covers non-required", (value) => {
      value.files.push(testOnlyFile("internal/z_test.go"));
      value.semantic.profiles[0].coveredFiles.push("internal/z_test.go");
      refreshSummary(value);
    }, /includes non-required file/],
    ["profile covers missing path", (value) => value.semantic.profiles[0].coveredFiles.push("missing.go"), /references missing snapshot file/],
    ["coverage union misses file", (value) => value.semantic.profiles[0].coveredFiles = [], /coverage union is missing/],
    ["unsorted file build tags", (value) => value.files[0].buildTags = ["z", "a"], /buildTags must be sorted/],
    ["invalid file byte length", (value) => value.files[0].byteLength = -1, /byteLength must be a non-negative safe integer/],
    ["unit beyond physical file", (value) => value.files[0].byteLength = value.files[0].units[0].endOffset - 1, /endOffset must not exceed the owning file byteLength/],
    ["unsorted build tags", (value) => value.semantic.profiles[0].buildTags = ["z", "a"], /buildTags must be sorted/],
    ["duplicate package id", (value) => value.semantic.profiles[0].packageIds.push("m/internal"), /packageIds must be sorted/],
    ["non-exact environment", (value) => value.semantic.profiles[0].environment.reverse(), /environment must be sorted|exactly record/],
    ["missing environment input", (value) => value.semantic.profiles[0].environment = value.semantic.profiles[0].environment.filter((entry) => !entry.startsWith("PATH=")), /missing allowlisted key 'PATH'/],
    ["missing extended environment input", (value) => value.semantic.profiles[0].environment = value.semantic.profiles[0].environment.filter((entry) => !entry.startsWith("GOAUTH=")), /missing allowlisted key 'GOAUTH'/],
    ["normalized experiment environment", (value) => value.semantic.profiles[0].environment = value.semantic.profiles[0].environment.map((entry) => entry === "GOEXPERIMENT=" ? "GOEXPERIMENT=none" : entry), /must contain GOEXPERIMENT=/],
    ["unmodeled environment input", (value) => value.semantic.profiles[0].environment.push("UNMODELED=value"), /unmodeled key 'UNMODELED'/],
    ["non-exact flags", (value) => value.semantic.profiles[0].buildFlags = ["-race"], /buildFlags must exactly encode/],
    ["architecture-tag drift", (value) => value.semantic.profiles[0].toolTags = [], /toolTags must exactly match/],
    ["invalid architecture evidence", (value) => value.semantic.profiles[0].architecture = "OTHER=v1", /must record GOAMD64/],
    ["duplicate release tag", (value) => value.semantic.releaseTags.push("go1.26"), /releaseTags must be sorted/],
    ["invalid toolchain hash", (value) => value.semantic.toolchainHash = "invalid", /toolchainHash must be lowercase SHA-256/],
    ["invalid unsupported cgo profile", (value) => value.semantic.unsupportedProfiles.push({ goos: "linux", goarch: "amd64", cgoEnabled: true, architecture: "GOAMD64=v1", goexperiment: "", reason: "unsupported" }), /cgoEnabled must be false/],
    ["unsupported profile architecture drift", (value) => value.semantic.unsupportedProfiles.push({ goos: "linux", goarch: "amd64", cgoEnabled: false, architecture: "OTHER=v1", goexperiment: "", reason: "unsupported" }), /architecture does not match goarch/],
    ["duplicate module", (value) => value.semantic.moduleGraph.push(structuredClone(value.semantic.moduleGraph[0])), /moduleGraph must be sorted/],
  ]) {
    assertRejected(mutateClone(base, mutate), pattern, description);
  }
});

test("primary files are classified exactly once and excluded units carry no semantics", () => {
  const requiredFile = functionFile("internal/a.go", "Run");
  const excludedFile = functionFile("internal/b.go", "Stop");
  delete excludedFile.units[0].semantic;
  const snapshot = snapshotFrom({
    excludedFiles: ["internal/b.go"],
    files: [requiredFile, excludedFile],
    profiles: [profile({ coveredFiles: ["internal/a.go"] })],
    requiredFiles: ["internal/a.go"],
  });
  assert.deepEqual(validate(snapshot), []);

  assertRejected(mutateClone(snapshot, (value) => value.semantic.excludedFiles = []), /must be exactly required or excluded/, "unclassified primary file");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.requiredFiles.push("internal/b.go")), /includes excluded path/, "doubly classified primary file");
  assertRejected(mutateClone(snapshot, (value) => value.files[1].units[0].semantic = structuredClone(value.files[0].units[0].semantic)), /must be omitted because.*excluded/, "semantic evidence on excluded unit");
});

test("Wasm profile tags follow the exact GOWASM feature setting", () => {
  const canonical = { goarch: "wasm", architecture: "GOWASM=", cgoEnabled: false, experiments: "", toolTags: ["wasm.satconv", "wasm.signext"] };
  const issues = [];
  validateProfileArchitecture(canonical, "profile", issues, "");
  assert.deepEqual(issues, []);
  for (const setting of ["satconv", "signext", "satconv,signext"]) {
    const rejected = [];
    validateProfileArchitecture({ ...canonical, architecture: `GOWASM=${setting}` }, "profile", rejected, "");
    assert.ok(rejected.some((issue) => issue.includes("unsupported exact setting")), setting);
  }
});

test("unit semantic profiles close exactly over every profile covering their file", () => {
  const linux = profile({ coveredFiles: ["internal/a.go", "internal/b.go"] });
  const darwin = profile({ goarch: "arm64", goos: "darwin", coveredFiles: ["internal/b.go"] });
  const fileA = functionFile("internal/a.go", "A");
  const fileB = functionFile("internal/b.go", "B");
  fileA.units[0].semantic[0].profiles = [1];
  fileB.units[0].semantic[0].profiles = [0, 1];
  const snapshot = snapshotFrom({ files: [fileA, fileB], profiles: [linux, darwin], requiredFiles: ["internal/a.go", "internal/b.go"] });
  assert.deepEqual(validate(snapshot), []);

  assertRejected(mutateClone(snapshot, (value) => value.semantic.profiles.reverse()), /profiles must be sorted by exact profile key/, "profile record order");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.requiredFiles.reverse()), /requiredFiles must be sorted/, "required file order");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.profiles.find((profileValue) => profileValue.coveredFiles.length === 2).coveredFiles.reverse()), /coveredFiles must be sorted/, "profile coverage order");
  assertRejected(mutateClone(snapshot, (value) => value.files[1].units[0].semantic[0].profiles.shift()), /is missing profile index/, "missing file profile");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].profiles.unshift(0)), /unknown or cross-file profile index 0/, "cross-file profile");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].profiles.push(2)), /out of bounds/, "unknown profile");
  assertRejected(mutateClone(snapshot, (value) => value.files[1].units[0].semantic[0].profiles.reverse()), /numerically sorted/, "profile index order");
  assertRejected(mutateClone(snapshot, (value) => value.files[1].units[0].semantic[0].profiles.push(1)), /numerically sorted/, "duplicate profile index");
  assertRejected(mutateClone(snapshot, (value) => value.files[1].units[0].semantic[0].profiles[0] = "0"), /non-negative safe integer/, "string profile key regression");
  assertRejected(mutateClone(snapshot, (value) => {
    const extra = structuredClone(value.files[1].units[0].semantic[0]);
    extra.signature.variadic = true;
    extra.object.type.signature.variadic = true;
    extra.profiles = [1];
    value.files[1].units[0].semantic.push(extra);
    value.files[1].units[0].semantic.sort((left, right) => canonicalSemanticDeclaration(left).localeCompare(canonicalSemanticDeclaration(right)));
  }), /duplicates profile/, "profile duplicated across variants");
});

test("host-specific profile environment evidence is byte-identical across profiles", () => {
  const snapshot = twoProfileConstSnapshot();
  snapshot.semantic.profiles[0].experiments = "dwarf5";
  snapshot.semantic.profiles[0].toolTags.push("goexperiment.dwarf5");
  snapshot.semantic.profiles[0].toolTags.sort();
  snapshot.semantic.profiles[1].experiments = "regabiargs";
  snapshot.semantic.profiles[1].toolTags.push("goexperiment.regabiargs");
  snapshot.semantic.profiles[1].toolTags.sort();
  assert.deepEqual(validate(snapshot), []);
  assertRejected(mutateClone(snapshot, (value) => value.semantic.profiles[0].toolTags = value.semantic.profiles[0].toolTags.filter((tag) => tag !== "goexperiment.dwarf5")), /toolTags must exactly match/, "target experiment/tool-tag drift");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.profiles[1].environment = value.semantic.profiles[1].environment.map((entry) => entry === "GOCACHE=\/cache" ? "GOCACHE=/other-cache" : entry).sort();
  }), /environment GOCACHE must be byte-identical/, "host cache identity drift");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.profiles[1].environment = value.semantic.profiles[1].environment.map((entry) => entry === "GO386=sse2" ? "GO386=softfloat" : entry).sort();
  }), /inactive GO386 must be byte-identical/, "inactive architecture drift");
});

test("variant identity and semantic declaration cross-fields cannot drift", () => {
  const snapshot = twoProfileConstSnapshot();
  assert.deepEqual(validate(snapshot), []);

  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[1].valueSpecs[0].names[0].object.id += "-drift"), /changes source declaration identity/, "const object identity drift");
  assertRejected(mutateClone(snapshot, (value) => {
    for (const variant of value.files[0].units[0].semantic) variant.valueSpecs[0].names[0].object.id = "m/internal::const::Tampered";
  }), /object.id must equal/, "consistently tampered binding object id");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].valueSpecs = null), /valueSpecs must be a non-empty array/, "malformed canonical variant payload");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].valueSpecs[0].specIndex = 1), /specIndex must equal 0/, "spec index drift");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].valueSpecs[0].names[0].object.packagePath = "wrong"), /object.packagePath must equal declaration/, "binding package drift");
  assertRejected(mutateClone(snapshot, (value) => {
    const binding = value.files[0].units[0].semantic[0].valueSpecs[0].names[0];
    binding.object.type = { ...binding.type, basic: { ...binding.type.basic, name: "string" } };
  }), /object.type must equal binding type/, "binding type drift");

  const callable = functionSnapshot();
  assertRejected(mutateClone(callable, (value) => value.files[0].units[0].semantic[0].object.packagePath = "wrong"), /object.packagePath must equal declaration packagePath/, "callable package drift");
  assertRejected(mutateClone(callable, (value) => value.files[0].units[0].semantic[0].object.id = "m/internal::func::Tampered"), /object.id must equal/, "callable object id");
  assertRejected(mutateClone(callable, (value) => {
    const objectType = value.files[0].units[0].semantic[0].object.type;
    objectType.signature = { ...objectType.signature, variadic: true };
  }), /must equal declaration signature/, "callable signature drift");

  const method = methodSnapshot();
  assert.deepEqual(validate(method), []);
  assertRejected(mutateClone(method, (value) => delete value.files[0].units[0].semantic[0].signature.receiver), /receiver is required/, "method receiver omission");
  assertRejected(mutateClone(method, (value) => value.files[0].units[0].semantic[0].signature.receiver.id += "-drift"), /receiver.id must equal|\.id must equal/, "method receiver id");
  assertRejected(mutateClone(method, (value) => value.files[0].units[0].semantic[0].object.id = "m/internal::method::Run"), /object.id must equal/, "method object id");
  assertRejected(mutateClone(callable, (value) => value.files[0].units[0].semantic[0].signature.receiver = structuredClone(method.files[0].units[0].semantic[0].signature.receiver)), /receiver must be absent/, "function receiver injection");

  const type = typeSnapshot();
  assert.deepEqual(validate(type), []);
  assertRejected(mutateClone(type, (value) => {
    const declaration = value.files[0].units[0].semantic[0];
    declaration.type.object = { ...declaration.type.object, id: `${declaration.type.object.id}-drift` };
  }), /type.object must equal/, "type object drift");
  assertRejected(mutateClone(type, (value) => value.files[0].units[0].semantic[0].object.type.reference.objectId += "-drift"), /reference must identify/, "top-level type reference drift");
});

test("package initializers use physical declaration identity while ordinary init methods remain methods", () => {
  const first = initializerUnit("m::internal/a.go::func::init", 0);
  const second = initializerUnit("m::internal/a.go::func::init::#2", 20);
  const file = functionFile("internal/a.go", "init", first);
  file.units.push(second);
  const snapshot = snapshotFrom({ files: [file], profiles: [profile({ coveredFiles: ["internal/a.go"] })], requiredFiles: ["internal/a.go"] });
  assert.deepEqual(validate(snapshot), []);
  assert.notEqual(first.semantic[0].object.id, second.semantic[0].object.id);
  assertRejected(mutateClone(snapshot, (value) => {
    value.files[0].units[1].semantic[0].object.id = value.files[0].units[0].semantic[0].object.id;
  }), /object.id must equal/, "duplicate package initializer identity");
});

test("type-parameter ownership, roles, indices, and active-scope references are exact", () => {
  const snapshot = genericFunctionSnapshot();
  assert.deepEqual(validate(snapshot), []);
  const mutations = [
    [(value) => value.files[0].units[0].semantic[0].signature.typeParameters[0].reference.ownerId = "wrong", /ownerId must equal/],
    [(value) => value.files[0].units[0].semantic[0].signature.typeParameters[0].reference.role = "receiver", /role must equal 'type'/],
    [(value) => value.files[0].units[0].semantic[0].signature.typeParameters[0].reference.index = 1, /index must equal 0/],
    [(value) => {
      const type = value.files[0].units[0].semantic[0].signature.parameters.variables[0].type;
      type.typeParameter = { ...type.typeParameter, name: "Wrong" };
    }, /active declaration scope/],
    [(value) => value.files[0].units[0].semantic[0].signature.parameters.variables[0].id += "-drift", /\.id must equal/],
    [(value) => value.files[0].units[0].semantic[0].object.type.signature.results.variables[0].id += "-drift", /\.id must equal/],
  ];
  for (const [mutate, pattern] of mutations) assertRejected(mutateClone(snapshot, mutate), pattern, "type-parameter relation");
});

test("nested semantic object and local provenance identities are exact", () => {
  const snapshot = identityRichTypeSnapshot();
  const field = snapshot.files[0].units[0].semantic[0].type.rhs.struct.fields[0];
  Object.assign(field, { tag: 'json:"handler" malformed', tagValues: [{ key: "json", value: "handler" }], tagRemainder: " malformed" });
  assert.deepEqual(validate(snapshot), []);
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].type.rhs.struct.fields[0].tagRemainder = "malformed"), /exact unparsed struct-tag suffix/, "semantic struct-tag remainder");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].type.rhs.struct.fields[0].tagValues[0].value = "wrong"), /exact reflect-compatible struct-tag prefix/, "semantic struct-tag prefix");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].type.rhs.struct.fields[0].variable.id += "-drift"), /variable.id must equal|\.id must equal/, "struct field id");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].type.rhs.struct.fields[0].variable.type.interface.explicitMethods[0].id += "-drift"), /\.id must equal/, "interface method id");
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].type.rhs.struct.fields[0].variable.type.interface.embeddedTypes[0].reference.objectId += "-drift"), /objectId must equal/, "nested type reference id");
});

test("blank value provenance is owned by the stable syntax unit id", () => {
  const signature = "var _ func";
  const syntaxType = funcType([{ type: identType("int") }], []);
  const unit = unitRecord({
    id: "m::internal/a.go::varGroup::_", kind: "varGroup", name: "_", qualifiedName: "_", exported: false, goPath: "internal/a.go",
    signature, snippet: signature, sigHash: signatureHash(signature), bodyHash: testBodyHash,
    valueSpecs: [{ names: ["_"], type: syntaxType }],
  });
  const snapshot = snapshotFrom({ files: [functionFile("internal/a.go", "_", unit)], profiles: [profile({ coveredFiles: ["internal/a.go"] })], requiredFiles: ["internal/a.go"] });
  assert.deepEqual(validate(snapshot), []);
  const moved = mutateClone(snapshot, (value) => {
    value.files[0].units[0].startLine = 2;
    value.files[0].units[0].endLine = 2;
    value.files[0].units[0].startOffset += 20;
    value.files[0].units[0].endOffset += 20;
  });
  assert.deepEqual(validate(moved), []);
  assertRejected(mutateClone(snapshot, (value) => value.files[0].units[0].semantic[0].valueSpecs[0].names[0].type.signature.parameters.variables[0].id += "-drift"), /\.id must equal/, "blank nested type provenance");
});

test("semantic array lengths are unbounded canonical decimal strings", () => {
  const hugeLength = "184467440737095516161844674407370955161";
  const syntaxArray = { kind: "array", text: `[${hugeLength}]int`, length: hugeLength, element: identType("int") };
  const unit = unitRecord({
    id: "m::internal/a.go::func::Sized",
    goPath: "internal/a.go",
    name: "Sized",
    parameters: [{ type: syntaxArray }],
    semantic: semanticFunctionDeclaration({ name: "Sized", packagePath: "m/internal", parameters: [{ type: syntaxArray }] }),
    sigHash: testSigHash,
    bodyHash: testBodyHash,
  });
  const snapshot = snapshotFrom({ files: [functionFile("internal/a.go", "Sized", unit)], profiles: [profile({ coveredFiles: ["internal/a.go"] })], requiredFiles: ["internal/a.go"] });
  assert.deepEqual(validate(snapshot), []);
  for (const alias of ["byte", "rune"]) {
    const aliased = mutateClone(snapshot, (value) => {
      value.files[0].units[0].semantic[0].signature.parameters.variables[0].type.element.basic.name = alias;
      value.files[0].units[0].semantic[0].object.type.signature.parameters.variables[0].type.element.basic.name = alias;
    });
    assert.deepEqual(validate(aliased), [], `${alias} is a canonical go/types basic alias`);
  }
  assertRejected(mutateClone(snapshot, (value) => {
    value.files[0].units[0].semantic[0].signature.parameters.variables[0].type.element.basic.kind = 2;
    value.files[0].units[0].semantic[0].object.type.signature.parameters.variables[0].type.element.basic.kind = 2;
  }), /unknown snapshot-schema-5 key 'kind'/, "removed redundant basic kind");
  assertRejected(mutateClone(snapshot, (value) => {
    value.files[0].units[0].semantic[0].signature.parameters.variables[0].type.element.basic.untyped = true;
    value.files[0].units[0].semantic[0].object.type.signature.parameters.variables[0].type.element.basic.untyped = true;
  }), /untyped must match/, "basic untyped/name relation");
  for (const invalid of [1, -1, "", "01", "+1", "1.0"]) {
    assertRejected(mutateClone(snapshot, (value) => {
      value.files[0].units[0].semantic[0].signature.parameters.variables[0].type.length = invalid;
      value.files[0].units[0].semantic[0].object.type.signature.parameters.variables[0].type.length = invalid;
    }), /canonical non-negative decimal string/, `semantic array length ${JSON.stringify(invalid)}`);
  }
});

test("semantic constants discriminate decoded String values exactly", () => {
  const snapshot = twoProfileConstSnapshot();
  snapshot.files[0].units[0].semantic[0].valueSpecs[0].names[0].constant = { kind: "String", exact: '"hello"', stringValue: "hello" };
  snapshot.files[0].units[0].semantic.sort((left, right) => canonicalSemanticDeclaration(left).localeCompare(canonicalSemanticDeclaration(right)));
  assert.deepEqual(validate(snapshot), []);
  assertRejected(mutateClone(snapshot, (value) => {
    const constant = value.files[0].units[0].semantic.find((variant) => variant.valueSpecs[0].names[0].constant.kind === "String").valueSpecs[0].names[0].constant;
    delete constant.stringValue;
  }), /stringValue/, "String without decoded value");
  assertRejected(mutateClone(snapshot, (value) => {
    const constant = value.files[0].units[0].semantic.find((variant) => variant.valueSpecs[0].names[0].constant.kind !== "String").valueSpecs[0].names[0].constant;
    constant.stringValue = "forbidden";
  }), /stringValue/, "non-String with decoded value");
});

function functionSnapshot() {
  return snapshotFrom({
    files: [functionFile("internal/a.go", "Run")],
    profiles: [profile({ coveredFiles: ["internal/a.go"] })],
    requiredFiles: ["internal/a.go"],
  });
}

function methodSnapshot() {
  const unit = unitRecord({
    id: "m::internal/a.go::method::Receiver.Run",
    goPath: "internal/a.go",
    kind: "method",
    name: "Run",
    qualifiedName: "Receiver.Run",
    receiver: "Receiver",
    receiverMode: "value",
    receiverType: identType("Receiver"),
    sigHash: testSigHash,
    bodyHash: testBodyHash,
  });
  return snapshotFrom({ files: [functionFile("internal/a.go", "Run", unit)], profiles: [profile({ coveredFiles: ["internal/a.go"] })], requiredFiles: ["internal/a.go"] });
}

function typeSnapshot() {
  const signature = "Item struct{}";
  const unit = unitRecord({
    id: "m::internal/a.go::type::Item",
    goPath: "internal/a.go",
    kind: "type",
    name: "Item",
    qualifiedName: "Item",
    typeKind: "struct",
    typeExpression: { kind: "struct", text: "struct{}", members: [] },
    signature,
    snippet: signature,
    sigHash: signatureHash(signature),
    bodyHash: testBodyHash,
  });
  return snapshotFrom({ files: [functionFile("internal/a.go", "Item", unit)], profiles: [profile({ coveredFiles: ["internal/a.go"] })], requiredFiles: ["internal/a.go"] });
}

function genericFunctionSnapshot() {
  const snapshot = functionSnapshot();
  const declaration = snapshot.files[0].units[0].semantic[0];
  const reference = { ownerId: declaration.object.id, role: "type", index: 0, name: "T" };
  const typeParameter = { reference, constraint: emptyInterfaceType() };
  const parameterType = { kind: "typeParameter", nilable: false, typeParameter: reference };
  declaration.signature.typeParameters = [typeParameter];
  declaration.signature.parameters.variables = [{ id: `${declaration.object.id}::signature::parameters::0`, name: "value", packagePath: declaration.packagePath, exported: false, type: parameterType }];
  declaration.object.type.signature = structuredClone(declaration.signature);
  declaration.object.type.signature.parameters.variables[0].id = `${declaration.object.id}::type::parameters::0`;
  declaration.signature.results.variables = [{ id: `${declaration.object.id}::signature::results::0`, name: "", packagePath: declaration.packagePath, exported: false, type: parameterType }];
  declaration.object.type.signature.results.variables = [{ id: `${declaration.object.id}::type::results::0`, name: "", packagePath: declaration.packagePath, exported: false, type: parameterType }];
  snapshot.files[0].units[0].typeParameters = ["T"];
  snapshot.files[0].units[0].typeParameterDetails = [{ name: "T", constraint: { kind: "interface", text: "any", members: [] } }];
  snapshot.files[0].units[0].parameters = [{ names: ["value"], type: identType("T") }];
  snapshot.files[0].units[0].results = [{ type: identType("T") }];
  return snapshot;
}

function identityRichTypeSnapshot() {
  const snapshot = typeSnapshot();
  const declaration = snapshot.files[0].units[0].semantic[0];
  const root = `${declaration.object.id}::rhs`;
  const fieldId = `${root}::field::0`;
  const interfaceOwner = `${fieldId}::type`;
  const method = (role) => {
    const id = `${interfaceOwner}::${role}::0::Read`;
    return {
      id, ownerId: interfaceOwner, name: "Read", packagePath: declaration.packagePath, exported: true,
      signature: { receiverTypeParameters: [], typeParameters: [], parameters: { variables: [] }, results: { variables: [] }, variadic: false },
    };
  };
  const interfaceType = {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods: [method("explicitMethod")],
      embeddedTypes: [{ kind: "named", nilable: true, reference: { objectId: "example.org/api::type::Token", packagePath: "example.org/api", name: "Token", typeArgs: [] } }],
      embeddedKinds: ["interface"],
      completeMethods: [method("completeMethod")], comparable: false, implicit: false, methodSetOnly: true,
    },
  };
  declaration.type.rhs = {
    kind: "struct",
    nilable: false,
    struct: { fields: [{ variable: { id: fieldId, name: "Handler", packagePath: declaration.packagePath, exported: true, type: interfaceType }, tag: "", tagValues: [], tagRemainder: "" }] },
  };
  return snapshot;
}

function twoProfileConstSnapshot() {
  const syntaxSpec = { names: ["WordBits"], type: identType("int") };
  const signature = "const WordBits int";
  const unit = unitRecord({
    id: "m::internal/a.go::constGroup::WordBits",
    goPath: "internal/a.go",
    kind: "constGroup",
    name: "WordBits",
    qualifiedName: "WordBits",
    valueSpecs: [syntaxSpec],
    signature,
    snippet: signature,
    sigHash: signatureHash(signature),
    bodyHash: testBodyHash,
  });
  const linux = profile({ coveredFiles: ["internal/a.go"] });
  const darwin = profile({ goarch: "arm64", goos: "darwin", coveredFiles: ["internal/a.go"] });
  const first = unit.semantic[0];
  first.profiles = [1];
  const second = structuredClone(first);
  second.valueSpecs[0].names[0].constant.exact = "1";
  second.profiles = [0];
  unit.semantic = [first, second].sort((left, right) => canonicalSemanticDeclaration(left).localeCompare(canonicalSemanticDeclaration(right)));
  return snapshotFrom({ files: [functionFile("internal/a.go", "WordBits", unit)], profiles: [linux, darwin], requiredFiles: ["internal/a.go"] });
}

function functionFile(filePath, name, providedUnit) {
  const unit = providedUnit ?? unitRecord({
    id: `m::${filePath}::func::${name}`,
    goPath: filePath,
    name,
    qualifiedName: name,
    sigHash: testSigHash,
    bodyHash: testBodyHash,
  });
  const directory = filePath.split("/").slice(0, -1).join("/");
  return fileRecord({
    path: filePath,
    importPath: directory === "" ? "m" : `m/${directory}`,
    packageName: "internal",
    sourceHash: "c".repeat(64),
    gitBlobHash: "d".repeat(40),
    units: [unit],
  });
}

function initializerUnit(id, startOffset) {
  const signature = "func init()";
  const unit = unitRecord({
    id,
    goPath: "internal/a.go",
    name: "init",
    qualifiedName: "init",
    startOffset,
    endOffset: startOffset + Buffer.byteLength(signature),
    signature,
    snippet: signature,
    sigHash: signatureHash(signature),
    bodyHash: testBodyHash,
  });
  unit.semantic[0].object.id = `${id}::object`;
  return unit;
}

function testOnlyFile(filePath) {
  return fileRecord({
    path: filePath,
    importPath: "m/internal",
    packageName: "internal",
    sourceHash: "e".repeat(64),
    gitBlobHash: "f".repeat(40),
    units: [],
  });
}

function profile({ goos = "linux", goarch = "amd64", coveredFiles, experiments = "", goexperiment = "" }) {
  const architecture = goarch === "amd64" ? "GOAMD64=v1" : goarch === "arm64" ? "GOARM64=v8.0" : "";
  const toolTags = [...(experiments === "" ? [] : experiments.split(",").map((name) => `goexperiment.${name}`)), ...(goarch === "amd64" ? ["amd64.v1"] : goarch === "arm64" ? ["arm64.v8.0"] : [])].sort();
  return {
    goos,
    goarch,
    cgoEnabled: false,
    architecture,
    buildTags: [],
    buildFlags: ["-mod=readonly"],
    toolTags,
    environment: testSemanticEnvironment({ architecture, goarch, goexperiment, goos }),
    experiments,
    goexperiment,
    packageIds: ["m/internal"],
    coveredFiles: [...coveredFiles].sort(),
  };
}

function snapshotFrom({ files, profiles, requiredFiles, excludedFiles = [] }) {
  const snapshot = {
    schemaVersion: 6,
    sourceRoot: path.resolve(repoRoot),
    modulePath: "m",
    gitRevision: "e".repeat(40),
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    semantic: {
      toolchain: "go1.26.4",
      toolchainExecutable: "/toolchain/bin/go",
      toolchainHash: "0".repeat(64),
      goroot: "/toolchain",
      gorootHash: "1".repeat(64),
      gorootHashContract: "tsts-porter-goroot-tree-v1",
      gorootEntryCount: 5,
      gorootFileCount: 2,
      gorootDirectoryCount: 3,
      gorootSymlinkCount: 0,
      gorootBytes: 128,
      compiler: "gc",
      releaseTags: ["go1.26"],
      modulePath: "m",
      requiredFiles: [...requiredFiles].sort(),
      coveredFiles: [...requiredFiles].sort(),
      excludedFiles: [...excludedFiles].sort(),
      profiles: [...profiles].sort((left, right) => semanticProfileKey(left).localeCompare(semanticProfileKey(right))),
      unsupportedProfiles: [],
      moduleGraph: [{ path: "m", version: "", sum: "", replacePath: "", replaceVersion: "", replaceSum: "" }],
    },
    summary: {},
    files: [...files].sort((left, right) => left.path.localeCompare(right.path)),
  };
  refreshSummary(snapshot);
  return snapshot;
}

function refreshSummary(snapshot) {
  const unitKindCounts = {};
  const packageCounts = {};
  const buildTagCounts = {};
  const importPaths = new Set();
  let unitCount = 0;
  for (const file of snapshot.files) {
    packageCounts[file.packageName] = (packageCounts[file.packageName] ?? 0) + 1;
    importPaths.add(file.importPath);
    for (const tag of [...file.buildTags, ...file.implicitBuildTags]) buildTagCounts[tag] = (buildTagCounts[tag] ?? 0) + 1;
    for (const unit of file.units) {
      unitCount++;
      unitKindCounts[unit.kind] = (unitKindCounts[unit.kind] ?? 0) + 1;
    }
  }
  snapshot.summary = {
    fileCount: snapshot.files.length,
    goFileCount: snapshot.files.length,
    generatedFiles: snapshot.files.filter((file) => file.generated).length,
    lineCount: snapshot.files.reduce((sum, file) => sum + file.lineCount, 0),
    unitCount,
    unitKindCounts,
    buildTagCounts,
    packageCounts,
    importPathCount: importPaths.size,
    structTagCount: 0,
    structTagKeyCounts: {},
  };
}

function emptyInterfaceType() {
  return { kind: "interface", nilable: true, interface: { explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable: true, implicit: true, methodSetOnly: true } };
}

function mutateClone(value, mutate) {
  const clone = structuredClone(value);
  mutate(clone);
  return clone;
}

function validate(snapshot) {
  return validatePorterSnapshot(snapshot, config);
}

function assertRejected(snapshot, pattern, description) {
  const issues = validate(snapshot);
  assert.ok(issues.some((issue) => pattern.test(issue)), `${description}: ${issues.join("; ")}`);
}
