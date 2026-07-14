import assert from "node:assert/strict";
import test from "node:test";

import { compareSignatures, resolveOverride } from "./sig-check.mjs";

const zeroFactoryId = "packages/tsts/src/go/compat.ts::GoZeroFactory";
const valueOpsId = "packages/tsts/src/go/compat.ts::GoValueOps";
const equalityId = "packages/tsts/src/go/compat.ts::GoEquality";
const mapKeyDescriptorId = "packages/tsts/src/go/compat.ts::GoMapKeyDescriptor";
const identity = (value) => value;
const keyword = (name) => ({ t: "kw", kw: name });
const typeParameterReference = (index) => ({ t: "tp", depth: 0, index });
const typeParameter = (name, index) => ({
  name,
  binding: { depth: 0, index },
  modifiers: { const: false, variance: null, unsupported: [] },
  constraint: null,
  default: null,
  invalidConstraint: null,
});
const parameter = (name, type, changes = {}) => ({
  name,
  role: "parameter",
  modifiers: [],
  type,
  rest: false,
  optional: false,
  optionalSyntax: "required",
  question: false,
  missingType: false,
  initializerStatus: "missing",
  initializer: undefined,
  initializerIssue: undefined,
  ...changes,
});
const zeroDictionaryParameter = (name, typeParameterIndex, changes = {}) => parameter(name, {
  t: "ref",
  id: zeroFactoryId,
  args: [typeParameterReference(typeParameterIndex)],
}, changes);
const equalityDictionaryParameter = (name, typeParameterIndex, changes = {}) => parameter(name, {
  t: "ref",
  id: equalityId,
  args: [typeParameterReference(typeParameterIndex)],
}, changes);
const valueOpsDictionaryParameter = (name, typeParameterIndex, changes = {}) => parameter(name, {
  t: "ref",
  id: valueOpsId,
  args: [typeParameterReference(typeParameterIndex)],
}, changes);
const mapKeyDictionaryParameter = (name, typeParameterIndex, changes = {}) => parameter(name, {
  t: "ref",
  id: mapKeyDescriptorId,
  args: [typeParameterReference(typeParameterIndex)],
}, changes);
const signature = ({ params, ret = keyword("void"), typeParams }) => ({
  role: "implementation",
  declarationModifiers: ["export"],
  params,
  ret,
  missingReturnType: false,
  returnTypePolicy: "required",
  typeParams,
  signatureModifiers: [],
});
const func = (value) => ({ kind: "func", modifiers: ["export"], signatures: [signature(value)] });
const dictionary = (parameterName, typeParameterName) => ({
  kind: "zero-value",
  parameter: parameterName,
  typeParameter: typeParameterName,
});
const equalityDictionary = (parameterName, typeParameterName) => ({
  kind: "equality",
  parameter: parameterName,
  typeParameter: typeParameterName,
});
const valueOpsDictionary = (parameterName, typeParameterName) => ({
  kind: "value-ops",
  parameter: parameterName,
  typeParameter: typeParameterName,
});
const mapKeyDictionary = (parameterName, typeParameterName) => ({
  kind: "map-key",
  parameter: parameterName,
  typeParameter: typeParameterName,
});
const override = (runtimeDictionaries) => ({
  category: "runtime-representation",
  allow: ["signature"],
  reason: "Erased generic execution receives an explicit static zero-value dictionary for this declaration.",
  runtimeDictionaries,
});

function resolve(runtimeDictionaries, expected, actual) {
  const issues = [];
  const resolved = resolveOverride(override(runtimeDictionaries), "unit", expected, actual, identity, issues);
  return { issues, resolved };
}

test("runtime dictionary override projects one exact trailing zero factory", () => {
  const typeParams = [typeParameter("V", 0)];
  const expected = func({
    typeParams,
    params: [parameter("key", keyword("string"))],
    ret: typeParameterReference(0),
  });
  const actual = func({
    typeParams,
    params: [parameter("key", keyword("string")), zeroDictionaryParameter("zeroValue", 0)],
    ret: typeParameterReference(0),
  });
  const { issues, resolved } = resolve([dictionary("zeroValue", "V")], expected, actual);

  assert.deepEqual(issues, []);
  assert.ok(compareSignatures(expected, actual, null).some((entry) => entry.kind === "arity"));
  assert.deepEqual(compareSignatures(expected, actual, resolved), []);
});

test("runtime dictionary override preserves declared order for multiple factories", () => {
  const typeParams = [typeParameter("K", 0), typeParameter("V", 1)];
  const expected = func({ typeParams, params: [parameter("index", keyword("number"))], ret: keyword("void") });
  const actual = func({
    typeParams,
    params: [
      parameter("index", keyword("number")),
      zeroDictionaryParameter("zeroKey", 0),
      zeroDictionaryParameter("zeroValue", 1),
    ],
    ret: keyword("void"),
  });

  assert.deepEqual(resolve([
    dictionary("zeroKey", "K"),
    dictionary("zeroValue", "V"),
  ], expected, actual).issues, []);
  assert.match(resolve([
    dictionary("zeroValue", "V"),
    dictionary("zeroKey", "K"),
  ], expected, actual).issues[0].reason, /must occupy dictionary parameter/);
});

test("runtime dictionary override uses the canonical slot before a variadic rest", () => {
  const typeParams = [typeParameter("T", 0)];
  const expected = func({
    typeParams,
    params: [parameter("values", { t: "array", element: typeParameterReference(0) }, { rest: true })],
    ret: typeParameterReference(0),
  });
  const actual = func({
    typeParams,
    params: [
      zeroDictionaryParameter("zeroValue", 0),
      parameter("values", { t: "array", element: typeParameterReference(0) }, { rest: true }),
    ],
    ret: typeParameterReference(0),
  });

  const { issues, resolved } = resolve([dictionary("zeroValue", "T")], expected, actual);
  assert.deepEqual(issues, []);
  assert.deepEqual(compareSignatures(expected, actual, resolved), []);

  const invalidRestPlacement = structuredClone(actual);
  invalidRestPlacement.signatures[0].params.reverse();
  assert.match(resolve([dictionary("zeroValue", "T")], expected, invalidRestPlacement).issues[0].reason, /rest parameter to be unique and last/);

  const valueOpsActual = func({
    typeParams,
    params: [
      valueOpsDictionaryParameter("valueOps", 0),
      parameter("values", { t: "array", element: typeParameterReference(0) }, { rest: true }),
    ],
    ret: typeParameterReference(0),
  });
  const valueOpsProjection = resolve([valueOpsDictionary("valueOps", "T")], expected, valueOpsActual);
  assert.deepEqual(valueOpsProjection.issues, []);
  assert.deepEqual(compareSignatures(expected, valueOpsActual, valueOpsProjection.resolved), []);
});

test("runtime dictionary override validates equality dictionaries by exact identity", () => {
  const typeParams = [typeParameter("T", 0)];
  const expected = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0))],
    ret: keyword("boolean"),
  });
  const actual = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0)), equalityDictionaryParameter("equal", 0)],
    ret: keyword("boolean"),
  });

  assert.deepEqual(resolve([equalityDictionary("equal", "T")], expected, actual).issues, []);
  assert.match(resolve([dictionary("equal", "T")], expected, actual).issues[0].reason, /exact type GoZeroFactory/);
});

test("runtime dictionary override validates value operations by exact identity", () => {
  const typeParams = [typeParameter("T", 0)];
  const expected = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0))],
    ret: typeParameterReference(0),
  });
  const actual = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0)), valueOpsDictionaryParameter("valueOps", 0)],
    ret: typeParameterReference(0),
  });

  assert.deepEqual(resolve([valueOpsDictionary("valueOps", "T")], expected, actual).issues, []);
  assert.match(resolve([dictionary("valueOps", "T")], expected, actual).issues[0].reason, /exact type GoZeroFactory/);
});

test("runtime dictionary override validates map-key descriptors by exact identity", () => {
  const typeParams = [typeParameter("T", 0)];
  const expected = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0))],
    ret: keyword("boolean"),
  });
  const actual = func({
    typeParams,
    params: [parameter("value", typeParameterReference(0)), mapKeyDictionaryParameter("keyDescriptor", 0)],
    ret: keyword("boolean"),
  });

  assert.deepEqual(resolve([mapKeyDictionary("keyDescriptor", "T")], expected, actual).issues, []);
  assert.match(resolve([equalityDictionary("keyDescriptor", "T")], expected, actual).issues[0].reason, /exact type GoEquality/);
});

test("runtime dictionary override rejects every malformed dictionary parameter shape", () => {
  const typeParams = [typeParameter("K", 0), typeParameter("V", 1)];
  const expected = func({ typeParams, params: [parameter("key", typeParameterReference(0))], ret: typeParameterReference(1) });
  const validParams = [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("zeroValue", 1)];
  const unknownField = zeroDictionaryParameter("zeroValue", 1);
  unknownField.legacy = true;
  const missingField = zeroDictionaryParameter("zeroValue", 1);
  delete missingField.initializerIssue;
  const cases = [
    ["name", [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("other", 1)], /must occupy dictionary parameter/],
    ["factory", [parameter("key", typeParameterReference(0)), parameter("zeroValue", { t: "ref", id: "m::Other", args: [typeParameterReference(1)] })], /exact type GoZeroFactory/],
    ["factory arity", [parameter("key", typeParameterReference(0)), parameter("zeroValue", { t: "ref", id: zeroFactoryId, args: [] })], /exact type GoZeroFactory/],
    ["type parameter", [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("zeroValue", 0)], /exact lexical type parameter/],
    ["optional", [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("zeroValue", 1, { optional: true, optionalSyntax: "question", question: true })], /optional must be false/],
    ["rest", [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("zeroValue", 1, { rest: true })], /must occupy dictionary parameter/],
    ["initializer", [parameter("key", typeParameterReference(0)), zeroDictionaryParameter("zeroValue", 1, { initializerStatus: "known", initializer: { kind: "identifier", name: "factory" } })], /initializerStatus must be "missing"/],
    ["unknown descriptor field", [parameter("key", typeParameterReference(0)), unknownField], /unknown=legacy/],
    ["missing descriptor field", [parameter("key", typeParameterReference(0)), missingField], /missing=initializerIssue/],
  ];

  for (const [label, params, pattern] of cases) {
    const { issues, resolved } = resolve([dictionary("zeroValue", "V")], expected, func({ typeParams, params, ret: typeParameterReference(1) }));
    assert.match(issues[0]?.reason ?? "", pattern, label);
    assert.equal(resolved.ignore.size, 0, label);
  }
  assert.deepEqual(validParams[1].type.args, [typeParameterReference(1)]);
});

test("runtime dictionary projection cannot hide unrelated declaration drift", () => {
  const typeParams = [typeParameter("V", 0)];
  const expected = func({
    typeParams,
    params: [parameter("key", keyword("string"))],
    ret: typeParameterReference(0),
  });
  const changedReturn = func({
    typeParams,
    params: [parameter("key", keyword("string")), zeroDictionaryParameter("zeroValue", 0)],
    ret: keyword("string"),
  });
  const changedOrdinaryParameter = func({
    typeParams,
    params: [parameter("key", keyword("number")), zeroDictionaryParameter("zeroValue", 0)],
    ret: typeParameterReference(0),
  });

  for (const actual of [changedReturn, changedOrdinaryParameter]) {
    const { issues, resolved } = resolve([dictionary("zeroValue", "V")], expected, actual);
    assert.match(issues[0]?.reason ?? "", /unrelated signature mismatch/);
    assert.equal(resolved.ignore.size, 0);
  }
});

test("runtime dictionary projection rejects missing, misplaced, and extra parameters", () => {
  const typeParams = [typeParameter("V", 0)];
  const expected = func({ typeParams, params: [parameter("key", keyword("string"))], ret: typeParameterReference(0) });
  const cases = [
    func({ typeParams, params: [parameter("key", keyword("string"))], ret: typeParameterReference(0) }),
    func({ typeParams, params: [zeroDictionaryParameter("zeroValue", 0), parameter("key", keyword("string"))], ret: typeParameterReference(0) }),
    func({ typeParams, params: [parameter("key", keyword("string")), zeroDictionaryParameter("zeroValue", 0), parameter("extra", keyword("boolean"))], ret: typeParameterReference(0) }),
  ];

  for (const actual of cases) {
    const { issues, resolved } = resolve([dictionary("zeroValue", "V")], expected, actual);
    assert.ok(issues.length > 0);
    assert.equal(resolved.ignore.size, 0);
  }
});
