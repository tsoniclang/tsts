import { compareText } from "../deterministic-order.mjs";

const numericBasicNames = Object.freeze([
  "byte",
  "float32",
  "float64",
  "int",
  "int8",
  "int16",
  "int32",
  "int64",
  "rune",
  "uint",
  "uint8",
  "uint16",
  "uint32",
  "uint64",
  "uintptr",
]);

const basicRules = new Map([
  ["bool", rule("GoBooleanValueOps", "constant")],
  ["string", rule("GoStringValueOps", "constant")],
  ...numericBasicNames.map((name) => [name, rule("GoNumberValueOps", "constant")]),
  ["complex64", rule("GoComplex64ValueOps", "constant")],
  ["complex128", rule("GoComplex128ValueOps", "constant")],
  ["Pointer", rule("GoUnsafePointerValueOps", "factory")],
]);

const carrierRules = new Map([
  ["slice", rule("GoSliceValueOps", "generic-factory")],
  ["map", rule("GoMapValueOps", "generic-factory")],
  ["chan", rule("GoChannelValueOps", "generic-factory")],
  ["func", rule("GoFunctionValueOps", "generic-factory")],
  ["interface", rule("GoInterfaceValueOps", "generic-factory")],
]);

const pointerRules = new Map([
  ["aggregate", rule("GoPointerValueOps", "generic-factory")],
  ["slot", rule("GoRefValueOps", "generic-factory")],
]);

const arrayRules = new Map([
  ["nonzero", rule("GoArrayValueOps", "array-factory")],
  ["zero", rule("GoZeroLengthArrayValueOps", "generic-factory")],
]);

const namedIntrinsicRules = new Map([
  ["interface", Object.freeze({ operationExport: "GoInterfaceValueOps", invocation: "target-generic-factory", zeroExport: null })],
  ["slice", Object.freeze({ operationExport: "GoNamedValueOps", invocation: "target-zero-factory", zeroExport: "GoNilSlice" })],
  ["map", Object.freeze({ operationExport: "GoNamedValueOps", invocation: "target-zero-factory", zeroExport: "GoNilMap" })],
  ["function", Object.freeze({ operationExport: "GoNamedValueOps", invocation: "target-zero-factory", zeroExport: null })],
]);

export function requireBasicValueOperationRule(name) {
  return requireRule(basicRules, name, "basic");
}

export function requireCarrierValueOperationRule(carrier) {
  return requireRule(carrierRules, carrier, "carrier");
}

export function requirePointerValueOperationRule(representation) {
  return requireRule(pointerRules, representation, "pointer representation");
}

export function requireArrayValueOperationRule(length) {
  return requireRule(arrayRules, length === "0" ? "zero" : "nonzero", "array");
}

export function requireNamedIntrinsicValueOperationRule(carrier) {
  return requireRule(namedIntrinsicRules, carrier, "named intrinsic carrier");
}

export function portableRuntimeValueOperationRules(config) {
  const moduleIdentity = `${requireTsRoot(config)}/go/compat.ts`;
  return Object.freeze({
    moduleIdentity,
    arrays: portableRules(arrayRules, moduleIdentity),
    basics: portableRules(basicRules, moduleIdentity),
    carriers: portableRules(carrierRules, moduleIdentity),
    namedIntrinsics: portableNamedIntrinsicRules(moduleIdentity),
    pointers: portableRules(pointerRules, moduleIdentity),
  });
}

function portableRules(rules, moduleIdentity) {
  return Object.freeze([...rules]
    .sort(([left], [right]) => compareText(left, right))
    .map(([key, value]) => Object.freeze({
      key,
      invocation: value.invocation,
      operationIdentity: `${moduleIdentity}::${value.operationExport}`,
    })));
}

function portableNamedIntrinsicRules(moduleIdentity) {
  return Object.freeze([...namedIntrinsicRules]
    .sort(([left], [right]) => compareText(left, right))
    .map(([carrier, value]) => Object.freeze({
      carrier,
      invocation: value.invocation,
      operationIdentity: `${moduleIdentity}::${value.operationExport}`,
      zeroIdentity: value.zeroExport === null ? null : `${moduleIdentity}::${value.zeroExport}`,
    })));
}

function rule(operationExport, invocation) {
  return Object.freeze({ operationExport, invocation });
}

function requireRule(rules, key, label) {
  const value = rules.get(key);
  if (value === undefined) throw new Error(`Go value operation has no exact ${label} provider for '${key}'`);
  return value;
}

function requireTsRoot(config) {
  const value = config?.tsRoot;
  if (typeof value !== "string" || value.trim() === "" || value !== value.trim()) {
    throw new Error("Go value-operation runtime rules require one non-empty trimmed TypeScript root");
  }
  return value.replace(/\/+$/, "");
}
