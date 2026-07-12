import assert from "node:assert/strict";
import test from "node:test";

import {
  mergeExternalEvidence,
  normalizeExternalFunctionDescriptor,
  normalizeExternalTypeDescriptor,
} from "./sig-check/external-evidence-projection.mjs";

const parameter = (name, type = { t: "kw", kw: "string" }) => ({ name, type });
const callable = (...names) => ({
  kind: "func",
  signatures: [{ params: names.map(parameter), ret: { t: "kw", kw: "void" } }],
});
const basic = (name) => ({ kind: "basic", name });
const signature = (provenance, parameters = []) => ({
  parameterNameProvenance: provenance,
  receiverTypeParameters: [],
  typeParameters: [],
  parameters: parameters.map((type, index) => ({ name: `go${index}`, variadic: false, type })),
  results: [],
});

test("unavailable external parameter names normalize both sides without copying authored names", () => {
  const expected = callable("receiver", "arg0");
  const actual = callable("receiver", "value");
  const evidence = signature("unavailable", [basic("string")]);
  const projectedExpected = normalizeExternalFunctionDescriptor(expected, [evidence], 1);
  const projectedActual = normalizeExternalFunctionDescriptor(actual, [evidence], 1);
  assert.deepEqual(projectedExpected.signatures[0].params.map((entry) => entry.name), ["receiver", "__tsgoExternalParameter0"]);
  assert.deepEqual(projectedActual.signatures[0].params.map((entry) => entry.name), ["receiver", "__tsgoExternalParameter0"]);
  assert.deepEqual(normalizeExternalFunctionDescriptor(expected, [signature("source", [basic("string")])], 1), expected);
});

test("unavailable evidence reaches nested callback signatures structurally", () => {
  const callback = signature("unavailable", [basic("string")]);
  const contract = {
    kind: "carrier",
    carrier: "func",
    arguments: [{ kind: "function", signature: callback }],
    metadataArguments: [],
  };
  const descriptor = {
    t: "ref",
    id: "go/compat.ts::GoFunc",
    args: [{
      t: "fn",
      params: [parameter("authored")],
      ret: { t: "kw", kw: "void" },
    }],
  };
  assert.equal(
    normalizeExternalTypeDescriptor(descriptor, contract).args[0].params[0].name,
    "__tsgoExternalParameter0",
  );
});

test("external parameter-name provenance is exact and profile-invariant", () => {
  const unavailable = signature("unavailable");
  assert.deepEqual(mergeExternalEvidence([
    { evidence: unavailable, profiles: [0] },
    { evidence: structuredClone(unavailable), profiles: [1] },
  ], "fixture"), unavailable);
  assert.equal(mergeExternalEvidence([
    { evidence: signature("source", [basic("string")]), profiles: [0] },
    { evidence: signature("unavailable", [basic("string")]), profiles: [1] },
  ], "fixture").parameterNameProvenance, "source");
  assert.throws(() => mergeExternalEvidence([
    { evidence: signature("source", [basic("string")]), profiles: [0] },
    { evidence: { ...signature("source", [basic("string")]), parameters: [{ name: "other", variadic: false, type: basic("string") }] }, profiles: [1] },
  ], "fixture"), /parameters\[0\]\.name.*across semantic profiles/);
  assert.throws(() => normalizeExternalFunctionDescriptor(callable("value"), [{
    ...signature("source"),
    parameterNameProvenance: "guessed",
  }]), /parameter-name provenance is invalid/);
});

test("source interface method order dominates canonical profiles and conflicting source order fails", () => {
  const method = (name) => ({ name, signature: signature("unavailable") });
  const interfaceEvidence = (provenance, names) => ({
    comparable: false,
    embedded: [],
    explicitMethodOrderProvenance: provenance,
    kind: "interfaceShape",
    methods: names.map(method),
  });
  const merged = mergeExternalEvidence([
    { evidence: interfaceEvidence("source", ["Second", "First"]), profiles: [0] },
    { evidence: interfaceEvidence("canonical", ["First", "Second"]), profiles: [1] },
  ], "fixture interface");
  assert.equal(merged.explicitMethodOrderProvenance, "source");
  assert.deepEqual(merged.methods.map((entry) => entry.name), ["Second", "First"]);
  assert.throws(() => mergeExternalEvidence([
    { evidence: interfaceEvidence("source", ["First", "Second"]), profiles: [0] },
    { evidence: interfaceEvidence("source", ["Second", "First"]), profiles: [1] },
  ], "fixture interface"), /source method order/);
  const canonical = mergeExternalEvidence([
    { evidence: interfaceEvidence("canonical", ["Second", "First"]), profiles: [0] },
    { evidence: interfaceEvidence("canonical", ["First", "Second"]), profiles: [1] },
  ], "fixture interface");
  assert.deepEqual(canonical.methods.map((entry) => entry.name), ["First", "Second"]);
});
