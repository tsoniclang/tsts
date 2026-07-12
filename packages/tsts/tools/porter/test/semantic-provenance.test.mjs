import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import { validatePorterSnapshot } from "../core/snapshot.mjs";
import { canonicalSemanticDeclaration, semanticProfileKey, validateProfileArchitecture } from "../core/snapshot-validation.mjs";
import { hashText, repoRoot } from "../core/runtime.mjs";
import { canonicalSemanticSignature } from "../core/semantic-variants.mjs";
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

test("canonical semantic identity retains every snapshot-schema-11 declaration field", () => {
  const method = methodSnapshot().files[0].units[0].semantic[0];
  const pointerMethod = structuredClone(method);
  pointerMethod.signature.receiverMode = "pointer";
  assert.notEqual(canonicalSemanticDeclaration(method), canonicalSemanticDeclaration(pointerMethod));

  const generic = genericFunctionSnapshot().files[0].units[0].semantic[0];
  const renamedKind = structuredClone(generic);
  renamedKind.signature.parameters.variables[0].nameKind = "blank";
  assert.notEqual(canonicalSemanticDeclaration(generic), canonicalSemanticDeclaration(renamedKind));
  const constrained = structuredClone(generic);
  constrained.signature.typeParameters[0].constraintSyntax = "~int";
  assert.notEqual(canonicalSemanticDeclaration(generic), canonicalSemanticDeclaration(constrained));

  const type = typeSnapshot().files[0].units[0].semantic[0];
  const selected = structuredClone(type);
  selected.type.valueMethodSet = [{
    key: "Run",
    methodId: "m/internal::type::Item::method::Run", methodOwnerId: "m/internal::type::Item",
    name: "Run", packagePath: "m/internal", exported: true,
    index: [0],
    indirect: false,
    promoted: false,
    signatureId: "m/internal::type::Item::method::Run::methodSetSignature::placeholder",
  }];
  assert.notEqual(canonicalSemanticDeclaration(type), canonicalSemanticDeclaration(selected));
});

test("method-set selections reference one exact normalized selected-signature pool", () => {
  const snapshot = typeSnapshot();
  const packagePath = "example.org/p";
  const objectId = `${packagePath}::type::Item`;
  const methodId = `${objectId}::method::Run`;
  const signature = {
    receiverTypeParameters: [],
    typeParameters: [],
    parameters: { variables: [] },
    results: { variables: [] },
    variadic: false,
    parameterNameProvenance: "source",
  };
  const signatureId = `${methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(signature))}`;
  const selection = {
    key: "Run",
    methodId,
    methodOwnerId: objectId,
    name: "Run",
    packagePath,
    exported: true,
    index: [0],
    indirect: false,
    promoted: false,
    signatureId,
  };
  const objectType = { kind: "named", nilable: false, reference: { objectId, packagePath, name: "Item", typeArgs: [] } };
  const object = { id: objectId, name: "Item", packagePath, exported: true, type: objectType };
  const declaredMethod = {
    id: methodId,
    ownerId: objectId,
    name: "Run",
    packagePath,
    exported: true,
    signature: {
      receiver: { id: `${methodId}::signature::receiver`, name: "", nameKind: "unnamed", packagePath, exported: false, type: objectType },
      receiverMode: "value",
      ...signature,
    },
  };
  snapshot.semantic.dependencyTypeDeclarations = [{
    kind: "type",
    packagePath,
    object,
    type: {
      alias: false,
      object,
      typeParameters: [],
      rhs: { kind: "struct", nilable: false, struct: { fields: [] } },
      methodSurface: "complete",
      methods: [declaredMethod],
      valueMethodSet: [selection],
      pointerMethodSet: [structuredClone(selection)],
    },
    profiles: [0],
  }];
  snapshot.semantic.methodSetSignatures = [{ id: signatureId, methodId, signature }];
  assert.deepEqual(validate(snapshot), []);
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.methodSetSignatures[0].signature.parameterNameProvenance = "guessed";
  }), /parameterNameProvenance/, "method-set parameter-name provenance");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.externalDeclarations = value.semantic.dependencyTypeDeclarations;
    delete value.semantic.dependencyTypeDeclarations;
  }), /externalDeclarations|dependencyTypeDeclarations/, "retired external declaration collection key");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.dependencyTypeDeclarations[0].externalRole = "package-export";
  }), /externalRole/, "obsolete external declaration role");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.dependencyTypeDeclarations[0].kind = "func";
  }), /dependency type closure contains only reachable named types/, "package function in dependency type closure");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.methodSetSignatures[0].signature.variadic = true), /id must hash the exact selected signature/, "selected signature drift");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.dependencyTypeDeclarations[0].type.valueMethodSet[0].signatureId = "missing"), /has no exact method-set signature evidence/, "missing selected signature");
  assertRejected(mutateClone(snapshot, (value) => {
    value.semantic.dependencyTypeDeclarations[0].type.valueMethodSet = [];
    value.semantic.dependencyTypeDeclarations[0].type.pointerMethodSet = [];
  }), /contains unused signature/, "unused selected signature");
  assertRejected(mutateClone(snapshot, (value) => value.semantic.dependencyTypeDeclarations[0].type.valueMethodSet[0].methodOwnerId = `${packagePath}::type::Other`), /methodId must identify/, "declaring method owner drift");
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
  const typeParameter = { reference, constraint: emptyInterfaceType(), constraintSyntax: "any" };
  const parameterType = { kind: "typeParameter", nilable: false, typeParameter: reference };
  declaration.signature.typeParameters = [typeParameter];
  declaration.signature.parameters.variables = [{ id: `${declaration.object.id}::signature::parameters::0`, name: "value", nameKind: "named", packagePath: declaration.packagePath, exported: false, type: parameterType }];
  declaration.object.type.signature = structuredClone(declaration.signature);
  declaration.object.type.signature.parameters.variables[0].id = `${declaration.object.id}::type::parameters::0`;
  declaration.signature.results.variables = [{ id: `${declaration.object.id}::signature::results::0`, name: "", nameKind: "unnamed", packagePath: declaration.packagePath, exported: false, type: parameterType }];
  declaration.object.type.signature.results.variables = [{ id: `${declaration.object.id}::type::results::0`, name: "", nameKind: "unnamed", packagePath: declaration.packagePath, exported: false, type: parameterType }];
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
      signature: { receiverTypeParameters: [], typeParameters: [], parameters: { variables: [] }, results: { variables: [] }, variadic: false, parameterNameProvenance: "source" },
    };
  };
  const interfaceType = {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods: [method("explicitMethod")],
      embeddedTypes: [{ kind: "named", nilable: true, reference: { objectId: "example.org/api::type::Token", packagePath: "example.org/api", name: "Token", typeArgs: [] } }],
      embeddedKinds: ["interface"],
      completeMethods: [method("completeMethod")], comparable: false, implicit: false, methodSetOnly: true, explicitMethodOrderProvenance: "source",
    },
  };
  declaration.type.rhs = {
    kind: "struct",
    nilable: false,
    struct: { fields: [{ variable: { id: fieldId, name: "Handler", nameKind: "named", packagePath: declaration.packagePath, exported: true, type: interfaceType }, tag: "", tagValues: [], tagRemainder: "" }] },
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
    schemaVersion: 11,
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
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
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
  return { kind: "interface", nilable: true, interface: { explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable: true, implicit: true, methodSetOnly: true, explicitMethodOrderProvenance: "source" } };
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
