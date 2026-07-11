import { compareText } from "../core/deterministic-order.mjs";
import {
  canonicalKey,
  descriptorShapeIssue,
  isSoftId,
  typeDescriptorChildren,
  typesEqual,
} from "../ts-extractor/ast-signatures.mjs";
import { normalizeDescriptor } from "../ts-extractor/conventions.mjs";

const PARAMETER_FIELDS = [
  "name", "role", "modifiers", "type", "rest", "optional", "optionalSyntax", "question", "missingType",
  "initializerStatus", "initializer", "initializerIssue",
];
const CALLABLE_FIELDS = ["params", "ret", "missingReturnType", "returnTypePolicy", "typeParams", "signatureModifiers"];
const TYPE_PARAMETER_FIELDS = ["name", "binding", "modifiers", "constraint", "default", "invalidConstraint"];
const MEMBER_FIELDS = ["kind", "name", "modifiers", "type", "optional", "definite", "readonly", "missingType", "unsupported", "text"];
const VALUE_FIELDS = ["name", "type", "missing", "declarationKind", "definite", "modifiers", "initializerStatus", "value", "valueIssue"];
const UNIT_FIELDS = new Map([
  ["func", ["kind", "name", "modifiers", "signatures", "metadataIssues"]],
  ["interface", ["kind", "name", "modifiers", "typeParams", "heritage", "members", "fragments", "metadataIssues"]],
  ["class", ["kind", "name", "modifiers", "typeParams", "heritage", "members", "metadataIssues"]],
  ["enum", ["kind", "name", "modifiers", "members", "fragments", "metadataIssues"]],
  ["alias", ["kind", "name", "modifiers", "typeParams", "type", "metadataIssues"]],
  ["value", ["kind", "modifiers", "decls", "metadataIssues"]],
]);
const UNIT_REQUIRED_FIELDS = new Map([
  ["func", ["kind", "modifiers", "signatures"]],
  ["interface", ["kind", "modifiers", "typeParams", "heritage", "members", "fragments"]],
  ["class", ["kind", "modifiers", "typeParams", "heritage", "members"]],
  ["enum", ["kind", "modifiers", "members"]],
  ["alias", ["kind", "modifiers", "typeParams", "type"]],
  ["value", ["kind", "decls"]],
]);

const keyOf = (descriptor) => descriptor ? canonicalKey(descriptor) : "<none>";
const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const owns = (value, key) => value !== null && typeof value === "object" && Object.hasOwn(value, key);
const isTopConstraint = (constraint) => constraint?.t === "kw" && new Set(["unknown", "any"]).has(constraint.kw);

export function compareSignatures(
  expected,
  actual,
  override,
  canon = (identity) => identity,
  conventions = { equivalences: [] },
  allowedGlobalNames = [],
) {
  const ignore = override?.ignore ?? new Set();
  const mismatches = [];
  const push = (kind, detail, expectedValue, actualValue) => {
    if (!ignore.has(kind)) mismatches.push({ kind, detail, expected: expectedValue, actual: actualValue });
  };
  const equalType = (left, right) => typesEqual(
    normalizeDescriptor(left, conventions, "type"),
    normalizeDescriptor(right, conventions, "type"),
    canon,
  );
  const equalConstraint = (left, right) => typesEqual(
    normalizeDescriptor(left, conventions, "constraint"),
    normalizeDescriptor(right, conventions, "constraint"),
    canon,
  );

  if (!actual) {
    push("actual-missing", "no TS declaration found for this @tsgo-unit");
    return mismatches;
  }
  for (const issue of actual.metadataIssues ?? []) push("metadata-declaration", issue);
  if (!expected || expected.kind === "other") {
    push("value-type-unresolved", "expected signature could not be derived from Go");
    return mismatches;
  }
  if (expected.kind === "profileVariants") {
    for (const variant of expected.variants) {
      for (const mismatch of compareSignatures(variant.descriptor, actual, null, canon, conventions, allowedGlobalNames)) {
        push(mismatch.kind, `profile ${variant.profiles.join(",")}: ${mismatch.detail}`, mismatch.expected, mismatch.actual);
      }
    }
    return mismatches;
  }
  if (expected.kind !== actual.kind) {
    push("declaration-kind", `expected ${expected.kind} declaration, found ${actual.kind}`, expected.kind, actual.kind);
    return mismatches;
  }

  validateUnitFields(expected, "expected declaration", push);
  validateUnitFields(actual, "TypeScript declaration", push);

  if (actual.kind !== "value") compareModifiers(expected.modifiers, actual.modifiers, "declaration", push);
  if (actual.kind === "func") compareFunction(expected, actual, push, equalType, equalConstraint);
  else if (actual.kind === "interface") compareStructuredDeclaration(expected, actual, push, equalType, equalConstraint);
  else if (actual.kind === "class") compareStructuredDeclaration(expected, actual, push, equalType, equalConstraint);
  else if (actual.kind === "enum") compareEnum(expected, actual, push);
  else if (actual.kind === "alias") {
    compareTypeParameters(expected.typeParams, actual.typeParams, push, equalConstraint, "declaration");
    if (!equalType(expected.type, actual.type)) push("alias-type", "alias type differs", keyOf(expected.type), keyOf(actual.type));
  } else if (actual.kind === "value") compareValues(expected, actual, push, equalType);

  const allowedGlobals = allowedGlobalNames instanceof Set ? allowedGlobalNames : new Set(allowedGlobalNames ?? []);
  const softIds = [...new Set([
    ...unitSoftIds(expected, conventions, allowedGlobals),
    ...unitSoftIds(actual, conventions, allowedGlobals),
  ])];
  if (softIds.length > 0) push("unresolved-ref", `unresolved type identity: ${softIds.slice(0, 6).join(", ")}`);
  const unsupported = [...new Set([...unitUnsupportedTypes(expected), ...unitUnsupportedTypes(actual)])];
  if (unsupported.length > 0) push("unsupported-type", `unsupported TypeScript signature shape: ${unsupported.slice(0, 6).join(", ")}`);
  return mismatches;
}

function compareFunction(expected, actual, push, equalType, equalConstraint) {
  if (!Array.isArray(expected.signatures) || !Array.isArray(actual.signatures)) {
    push("invalid-signature-contract", "function descriptor must use the current signatures array contract");
    return;
  }
  if (expected.signatures.length !== actual.signatures.length) {
    push("function-signature-count", "function overload/implementation signature count differs", expected.signatures.length, actual.signatures.length);
  }
  const count = Math.min(expected.signatures.length, actual.signatures.length);
  for (let index = 0; index < count; index++) {
    const expectedSignature = expected.signatures[index];
    const actualSignature = actual.signatures[index];
    const signaturePush = (kind, detail, left, right) => push(kind, `signature #${index}: ${detail}`, left, right);
    if (expectedSignature.role !== actualSignature.role) {
      signaturePush("function-signature-role", "signature role differs", expectedSignature.role, actualSignature.role);
    }
    compareModifiers(expectedSignature.declarationModifiers, actualSignature.declarationModifiers, "signature declaration", signaturePush);
    compareTypeParameters(expectedSignature.typeParams, actualSignature.typeParams, signaturePush, equalConstraint, "signature");
    compareCallable(expectedSignature, actualSignature, signaturePush, equalType);
  }
}

function compareTypeParameters(expectedValue, actualValue, push, equalConstraint, owner) {
  const expected = expectedValue ?? [];
  const actual = actualValue ?? [];
  if (!Array.isArray(expected) || !Array.isArray(actual)) {
    push("invalid-signature-contract", `${owner} type parameters must be arrays`);
    return;
  }
  if (expected.length !== actual.length) {
    push("type-param-count", `expected ${expected.length} type params, found ${actual.length}`, expected.length, actual.length);
    return;
  }
  for (let index = 0; index < expected.length; index++) {
    const left = expected[index];
    const right = actual[index];
    const label = `type param #${index}`;
    validateCompleteFields(left, TYPE_PARAMETER_FIELDS, `${label} expected contract`, push);
    validateCompleteFields(right, TYPE_PARAMETER_FIELDS, `${label} TypeScript contract`, push);
    if (left.name !== right.name) push("type-param-name", `${label} name differs`, left.name, right.name);
    if (!sameJson(left.binding, right.binding)) push("type-param-binding", `${label} lexical binding differs`, left.binding, right.binding);
    compareTypeParameterModifiers(left.modifiers, right.modifiers, label, push);
    compareOptionalType(left.constraint, right.constraint, `${label} constraint`, "type-param-constraint", push, equalConstraint, true);
    compareOptionalType(left.default, right.default, `${label} default`, "type-param-default", push, equalConstraint, false);
    if (!sameJson(left.invalidConstraint ?? null, right.invalidConstraint ?? null)) {
      push("type-param-invalid-constraint", `${label} invalid constraint evidence differs`, left.invalidConstraint ?? null, right.invalidConstraint ?? null);
    }
  }
}

function compareTypeParameterModifiers(expected, actual, label, push) {
  if (!expected || !actual || typeof expected !== "object" || typeof actual !== "object") {
    push("invalid-signature-contract", `${label} modifiers must use the current const/variance/unsupported object contract`, expected, actual);
    return;
  }
  validateNoUnknownFields(expected, ["const", "variance", "unsupported"], `${label} expected modifiers`, push);
  validateNoUnknownFields(actual, ["const", "variance", "unsupported"], `${label} TypeScript modifiers`, push);
  if (expected.const !== actual.const) push("type-param-const", `${label} const modifier differs`, expected.const, actual.const);
  if (expected.variance !== actual.variance) push("type-param-variance", `${label} variance differs`, expected.variance, actual.variance);
  if (!sameJson(expected.unsupported, actual.unsupported)) {
    push("type-param-modifier", `${label} unsupported modifiers differ`, expected.unsupported, actual.unsupported);
  }
}

function compareOptionalType(expected, actual, detail, kind, push, equal, eraseTop) {
  const left = eraseTop && isTopConstraint(expected) ? null : expected ?? null;
  const right = eraseTop && isTopConstraint(actual) ? null : actual ?? null;
  if (left === null && right === null) return;
  if (left === null || right === null || !equal(left, right)) push(kind, `${detail} differs`, left ? keyOf(left) : null, right ? keyOf(right) : null);
}

function compareCallable(expected, actual, push, equalType) {
  const callableContextFields = ["role", "declarationModifiers", "t"];
  validateCompleteFields(expected, CALLABLE_FIELDS, "expected callable", push, callableContextFields);
  validateCompleteFields(actual, CALLABLE_FIELDS, "TypeScript callable", push, callableContextFields);
  const expectedParams = expected.params ?? [];
  const actualParams = actual.params ?? [];
  if (!Array.isArray(expectedParams) || !Array.isArray(actualParams)) {
    push("invalid-signature-contract", "callable parameters must be arrays");
    return;
  }
  if (expectedParams.length !== actualParams.length) {
    push("arity", `expected ${expectedParams.length} params, found ${actualParams.length}`, expectedParams.length, actualParams.length);
  }
  const count = Math.min(expectedParams.length, actualParams.length);
  const expectedTypeKeys = expectedParams.slice(0, count).map((parameter) => keyOf(parameter.type));
  const actualTypeKeys = actualParams.slice(0, count).map((parameter) => keyOf(parameter.type));
  const positionalTypeDifference = expectedParams.slice(0, count).some((parameter, index) => !equalType(parameter.type, actualParams[index].type));
  if (positionalTypeDifference && [...expectedTypeKeys].sort(compareText).join(" ") === [...actualTypeKeys].sort(compareText).join(" ")) {
    push("param-order", `parameters reordered: expected [${expectedTypeKeys.join(", ")}], found [${actualTypeKeys.join(", ")}]`);
  }
  for (let index = 0; index < count; index++) {
    const left = expectedParams[index];
    const right = actualParams[index];
    const label = `param #${index}`;
    validateCompleteFields(left, PARAMETER_FIELDS, label, push);
    validateCompleteFields(right, PARAMETER_FIELDS, label, push);
    if (right.missingType) push("param-annotation-missing", `${label} has no explicit type annotation`);
    if (!equalType(left.type, right.type)) push("param-type", `${label} type differs`, expectedTypeKeys[index], actualTypeKeys[index]);
    if (left.name !== right.name) push("param-name", `${label} name differs`, left.name, right.name);
    if (left.role !== right.role) push("param-role", `${label} role differs`, left.role, right.role);
    if (left.rest !== right.rest) push("variadic-position", `${label} rest/variadic differs`, left.rest, right.rest);
    if (left.optional !== right.optional) push("param-optionality", `${label} optionality differs`, left.optional, right.optional);
    if (left.question !== right.question) push("param-question", `${label} question-token semantics differ`, left.question, right.question);
    if (left.optionalSyntax !== right.optionalSyntax) push("param-optional-syntax", `${label} optional syntax differs`, left.optionalSyntax, right.optionalSyntax);
    compareModifiers(left.modifiers, right.modifiers, label, push, "param-modifier");
    compareInitializer(left, right, label, "param", push);
  }
  if (actual.missingReturnType) push("return-annotation-missing", "function has no explicit return type annotation");
  if (expected.returnTypePolicy !== actual.returnTypePolicy) {
    push("return-type-policy", "return annotation policy differs", expected.returnTypePolicy, actual.returnTypePolicy);
  }
  compareModifiers(expected.signatureModifiers, actual.signatureModifiers, "function signature", push, "function-modifier");
  if (!equalType(expected.ret, actual.ret)) push("return-type", "return type differs", keyOf(expected.ret), keyOf(actual.ret));
}

function compareStructuredDeclaration(expected, actual, push, equalType, equalConstraint) {
  compareTypeParameters(expected.typeParams, actual.typeParams, push, equalConstraint, "declaration");
  compareFragments(expected, actual, push);
  compareHeritage(expected.heritage ?? [], actual.heritage ?? [], push, equalType);
  compareMembers(expected.members ?? [], actual.members ?? [], push, equalType, equalConstraint);
}

function compareFragments(expectedDeclaration, actualDeclaration, push) {
  const expected = expectedDeclaration.fragments;
  const actual = actualDeclaration.fragments;
  if (!Array.isArray(expected) && !Array.isArray(actual)) return;
  if (!Array.isArray(expected) || !Array.isArray(actual)) {
    push("declaration-fragment-contract", "declaration fragments must use the current array contract", expected, actual);
    return;
  }
  if (expected.length !== actual.length) push("declaration-fragment-count", "declaration fragment count differs", expected.length, actual.length);
  const count = Math.min(expected.length, actual.length);
  for (let index = 0; index < count; index++) {
    validateFragment(expected[index], expectedDeclaration.kind, `fragment #${index} expected contract`, push);
    validateFragment(actual[index], actualDeclaration.kind, `fragment #${index} TypeScript contract`, push);
    compareModifiers(expected[index].modifiers, actual[index].modifiers, `fragment #${index}`, push, "declaration-fragment-modifier");
  }
  validateFragmentAggregate(expectedDeclaration, "expected declaration", push);
  validateFragmentAggregate(actualDeclaration, "TypeScript declaration", push);
}

function compareHeritage(expected, actual, push, equalType) {
  if (expected.length !== actual.length) {
    push("interface-heritage", "interface heritage clause count differs", expected.length, actual.length);
    return;
  }
  for (let index = 0; index < expected.length; index++) {
    const left = expected[index];
    const right = actual[index];
    validateCompleteFields(left, ["token", "types"], `heritage clause #${index} expected contract`, push);
    validateCompleteFields(right, ["token", "types"], `heritage clause #${index} TypeScript contract`, push);
    if (!Array.isArray(left?.types) || !Array.isArray(right?.types)) continue;
    if (left.token !== right.token || left.types.length !== right.types.length || left.types.some((type, typeIndex) => !equalType(type, right.types[typeIndex]))) {
      push("interface-heritage", `interface heritage clause #${index} differs`, left, right);
    }
  }
}

function compareMembers(expected, actual, push, equalType, equalConstraint) {
  compareMemberOrder(expected, actual, push);
  const expectedGroups = memberGroups(expected);
  const actualGroups = memberGroups(actual);
  const keys = [...new Set([...expectedGroups.keys(), ...actualGroups.keys()])].sort(compareText);
  for (const key of keys) {
    const expectedMembers = expectedGroups.get(key) ?? [];
    const actualMembers = actualGroups.get(key) ?? [];
    if (key.startsWith("property:") && actualMembers.length > 1) {
      push("duplicate-member", `TypeScript property '${actualMembers[0].name}' occurs ${actualMembers.length} times`, 1, actualMembers.length);
    }
    if (expectedMembers.length !== actualMembers.length) {
      if (expectedMembers.length === 0) {
        for (const member of actualMembers) {
          push(member.unsupported ? "unsupported-member" : "extra-member", `member '${member.name}' present in TS but not in Go`, member.name);
        }
        continue;
      }
      if (actualMembers.length === 0) {
        for (const member of expectedMembers) push("missing-member", `member '${member.name}' present in Go but missing in TS`, member.name);
        continue;
      }
      push("member-overload-count", `member group '${key}' has a different declaration count`, expectedMembers.length, actualMembers.length);
    }
    const count = Math.min(expectedMembers.length, actualMembers.length);
    for (let index = 0; index < count; index++) {
      compareMember(expectedMembers[index], actualMembers[index], push, equalType, equalConstraint, index);
    }
  }
}

function compareMemberOrder(expected, actual, push) {
  if (expected.length !== actual.length) return;
  const expectedKeys = expected.map(memberKey);
  const actualKeys = actual.map(memberKey);
  if (!sameJson(expectedKeys, actualKeys) && sameJson([...expectedKeys].sort(compareText), [...actualKeys].sort(compareText))) {
    push("member-order", "member declaration order differs", expectedKeys, actualKeys);
  }
}

function memberGroups(members) {
  const groups = new Map();
  for (const member of members) {
    const key = memberKey(member);
    const group = groups.get(key) ?? [];
    group.push(member);
    groups.set(key, group);
  }
  return groups;
}

const memberKey = (member) => `${member.kind ?? "property"}:${member.name}`;

function compareMember(expected, actual, push, equalType, equalConstraint, overloadIndex) {
  const label = `member '${expected.name}' overload #${overloadIndex}`;
  validateNoUnknownFields(expected, MEMBER_FIELDS, `${label} expected contract`, push);
  validateNoUnknownFields(actual, MEMBER_FIELDS, `${label} TypeScript contract`, push);
  if (actual.unsupported) {
    push("unsupported-member", `${label} is an unsupported shape (${actual.unsupported})`, expected.name);
    return;
  }
  if (expected.optional !== actual.optional) push("member-optionality", `${label} optionality differs`, expected.optional, actual.optional);
  if (expected.readonly !== actual.readonly && (owns(expected, "readonly") || owns(actual, "readonly"))) {
    push("member-readonly", `${label} readonly semantics differ`, expected.readonly, actual.readonly);
  }
  if (expected.definite !== actual.definite && (owns(expected, "definite") || owns(actual, "definite"))) {
    push("member-definite", `${label} definite-assignment semantics differ`, expected.definite, actual.definite);
  }
  compareModifiers(expected.modifiers, actual.modifiers, label, push, "member-modifier");
  if (actual.missingType || actual.type?.missingReturnType) push("member-annotation-missing", `${label} has a missing type annotation`);
  if (expected.type?.t === "fn" && actual.type?.t === "fn") {
    const memberPush = (kind, detail, left, right) => push(kind, `${label}: ${detail}`, left, right);
    compareTypeParameters(expected.type.typeParams, actual.type.typeParams, memberPush, equalConstraint, label);
    compareCallable(expected.type, actual.type, memberPush, equalType);
  } else if (!equalType(expected.type, actual.type)) {
    push("member-type", `${label} type differs`, keyOf(expected.type), keyOf(actual.type));
  }
}

function compareValues(expected, actual, push, equalType) {
  const expectedDeclarations = expected.decls ?? [];
  const actualDeclarations = actual.decls ?? [];
  const unmatchedActual = new Set(actualDeclarations.map((_declaration, index) => index));
  let lastActualIndex = -1;
  for (let expectedIndex = 0; expectedIndex < expectedDeclarations.length; expectedIndex++) {
    const expectedDeclaration = expectedDeclarations[expectedIndex];
    const actualIndex = actualDeclarations.findIndex((declaration, index) => unmatchedActual.has(index) && declaration.name === expectedDeclaration.name);
    if (actualIndex < 0) {
      push("missing-value", `value '${expectedDeclaration.name}' present in Go but missing in TS`, expectedDeclaration.name);
      continue;
    }
    unmatchedActual.delete(actualIndex);
    if (actualIndex < lastActualIndex) push("value-order", `value '${expectedDeclaration.name}' is out of declaration order`, expectedIndex, actualIndex);
    lastActualIndex = actualIndex;
    const actualDeclaration = actualDeclarations[actualIndex];
    const label = `value '${actualDeclaration.name}'`;
    validateNoUnknownFields(expectedDeclaration, VALUE_FIELDS, `${label} expected contract`, push);
    validateNoUnknownFields(actualDeclaration, VALUE_FIELDS, `${label} TypeScript contract`, push);
    if (expectedDeclaration.declarationKind !== actualDeclaration.declarationKind) {
      push("value-declaration-kind", `${label} declaration kind differs`, expectedDeclaration.declarationKind, actualDeclaration.declarationKind);
    }
    if (expectedDeclaration.definite !== actualDeclaration.definite) {
      push("value-definite", `${label} definite-assignment semantics differ`, expectedDeclaration.definite, actualDeclaration.definite);
    }
    compareModifiers(expectedDeclaration.modifiers, actualDeclaration.modifiers, label, push, "value-modifier");
    if (actualDeclaration.missing) {
      push("value-annotation-missing", `${label} has no explicit type annotation`);
    } else if (!expectedDeclaration.type) {
      push("value-type-unresolved", `${label}: expected Go type could not be determined`, undefined, keyOf(actualDeclaration.type));
    } else if (!equalType(expectedDeclaration.type, actualDeclaration.type)) {
      push("value-type", `${label} type differs`, keyOf(expectedDeclaration.type), keyOf(actualDeclaration.type));
    }
    compareValueInitializer(expectedDeclaration, actualDeclaration, label, push);
  }
  for (const index of unmatchedActual) push("extra-value", `value '${actualDeclarations[index].name}' present in TS but not in Go`, undefined, actualDeclarations[index].name);
}

function compareValueInitializer(expected, actual, label, push) {
  if (expected.valueIssue !== undefined) {
    push("value-initializer-unresolved", `${label} initializer could not be resolved from Go: ${expected.valueIssue}`, expected.valueIssue);
  }
  if (expected.initializerStatus !== actual.initializerStatus && (owns(expected, "initializerStatus") || owns(actual, "initializerStatus"))) {
    push("value-initializer-status", `${label} initializer status differs`, expected.initializerStatus, actual.initializerStatus);
  }
  if (!sameJson(expected.value, actual.value) && (owns(expected, "value") || owns(actual, "value"))) {
    push("value-initializer", `${label} initializer differs`, expected.value, actual.value);
  }
  if (expected.valueIssue !== actual.valueIssue && actual.valueIssue !== undefined) {
    push("value-initializer-unresolved", `${label} TypeScript initializer is unresolved`, expected.valueIssue, actual.valueIssue);
  }
}

function compareEnum(expected, actual, push) {
  compareFragments(expected, actual, push);
  const expectedMembers = expected.members ?? [];
  const actualMembers = actual.members ?? [];
  if (expectedMembers.length !== actualMembers.length) push("enum-member-count", "enum member count differs", expectedMembers.length, actualMembers.length);
  const count = Math.min(expectedMembers.length, actualMembers.length);
  for (let index = 0; index < count; index++) {
    const left = expectedMembers[index];
    const right = actualMembers[index];
    validateNoUnknownFields(left, ["name", "value", "valueIssue"], `enum member #${index} expected contract`, push);
    validateNoUnknownFields(right, ["name", "value", "valueIssue"], `enum member #${index} TypeScript contract`, push);
    if (left.name !== right.name) push("enum-member-name", `enum member #${index} name differs`, left.name, right.name);
    if (left.valueIssue !== right.valueIssue || !sameJson(left.value, right.value)) {
      push("enum-member-value", `enum member #${index} value differs`, left.valueIssue ?? left.value, right.valueIssue ?? right.value);
    }
  }
}

function compareModifiers(expected, actual, label, push, kind = "declaration-modifier") {
  if (!Array.isArray(expected) || !Array.isArray(actual)) {
    push("invalid-signature-contract", `${label} modifiers must be arrays`, expected, actual);
    return;
  }
  if (!sameJson(expected, actual)) push(kind, `${label} modifiers differ`, expected, actual);
}

function compareInitializer(expected, actual, label, prefix, push) {
  const represented = ["initializerStatus", "initializer", "initializerIssue"].some((key) => owns(expected, key) || owns(actual, key));
  if (!represented) return;
  if (expected.initializerStatus !== actual.initializerStatus) {
    push(`${prefix}-initializer-status`, `${label} initializer status differs`, expected.initializerStatus, actual.initializerStatus);
  }
  if (!sameJson(expected.initializer, actual.initializer)) {
    push(`${prefix}-initializer`, `${label} initializer value differs`, expected.initializer, actual.initializer);
  }
  if (expected.initializerIssue !== actual.initializerIssue) {
    push(`${prefix}-initializer-unresolved`, `${label} initializer issue differs`, expected.initializerIssue, actual.initializerIssue);
  }
}

function validateCompleteFields(value, fields, label, push, additionalAllowed = []) {
  if (!isPlainDataRecord(value)) {
    push("invalid-signature-contract", `${label} must be a plain own-data-property object`, undefined, value);
    return;
  }
  const missing = fields.filter((field) => !owns(value, field));
  if (missing.length > 0) {
    push("invalid-signature-contract", `${label} is missing current descriptor field(s): ${missing.join(", ")}`, fields, Object.keys(value ?? {}));
  }
  validateNoUnknownFields(value, [...fields, ...additionalAllowed], label, push);
}

function validateNoUnknownFields(value, fields, label, push) {
  if (!isPlainDataRecord(value)) {
    push("invalid-signature-contract", `${label} must be a plain own-data-property object`, undefined, value);
    return;
  }
  const allowed = new Set(fields);
  const unknown = Reflect.ownKeys(value).filter((key) => typeof key !== "string" || !allowed.has(key)).map(String).sort(compareText);
  if (unknown.length > 0) push("invalid-signature-contract", `${label} has unknown current-contract field(s): ${unknown.join(", ")}`, fields, Reflect.ownKeys(value).map(String));
}

function validateUnitFields(value, label, push) {
  const fields = UNIT_FIELDS.get(value?.kind);
  const required = UNIT_REQUIRED_FIELDS.get(value?.kind);
  if (fields === undefined || required === undefined) {
    push("invalid-signature-contract", `${label} has no current descriptor schema for kind '${value?.kind ?? "<missing>"}'`);
    return;
  }
  validateCompleteFields(value, required, label, push, fields.filter((field) => !required.includes(field)));
}

function validateFragment(value, declarationKind, label, push) {
  const fields = declarationKind === "enum"
    ? ["modifiers", "members"]
    : declarationKind === "interface" ? ["modifiers", "typeParams", "heritage", "members"] : undefined;
  if (fields === undefined) {
    push("invalid-signature-contract", `${label} is not valid for declaration kind '${declarationKind}'`);
    return;
  }
  validateCompleteFields(value, fields, label, push);
}

function validateFragmentAggregate(declaration, label, push) {
  if (!Array.isArray(declaration.fragments)) return;
  const fragments = declaration.fragments;
  if (fragments.length === 0) {
    push("invalid-signature-contract", `${label} fragments must contain at least one declaration fragment`);
    return;
  }
  if (declaration.kind === "interface") {
    const firstTypeParameters = fragments[0].typeParams;
    if (!sameJson(declaration.typeParams, firstTypeParameters) ||
        !sameJson(declaration.heritage, fragments.flatMap((fragment) => fragment.heritage ?? [])) ||
        !sameJson(declaration.members, fragments.flatMap((fragment) => fragment.members ?? []))) {
      push("invalid-signature-contract", `${label} interface fragments do not reconstruct the declaration contract`);
    }
  } else if (declaration.kind === "enum" &&
      !sameJson(declaration.members, fragments.flatMap((fragment) => fragment.members ?? []))) {
    push("invalid-signature-contract", `${label} enum fragments do not reconstruct the declaration contract`);
  }
}

function isPlainDataRecord(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return false;
  return Reflect.ownKeys(value).every((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key === "string" && descriptor?.enumerable === true && "value" in descriptor;
  });
}

function unitTypeNodes(descriptor) {
  if (!descriptor) return [];
  const output = [];
  const addTypeParameters = (parameters) => {
    for (const parameter of parameters ?? []) {
      if (parameter.constraint) output.push(["constraint", parameter.constraint]);
      if (parameter.default) output.push(["type", parameter.default]);
      if (parameter.invalidConstraint) output.push(["constraint", parameter.invalidConstraint]);
    }
  };
  for (const signature of descriptor.signatures ?? []) {
    for (const parameter of signature.params ?? []) output.push(["type", parameter.type]);
    if (signature.ret) output.push(["type", signature.ret]);
    addTypeParameters(signature.typeParams);
  }
  addTypeParameters(descriptor.typeParams);
  for (const member of descriptor.members ?? []) {
    if (member.type) output.push(["type", member.type]);
    if (member.unsupported) output.push(["type", { t: "unsupported", kind: member.unsupported, text: member.text ?? "" }]);
  }
  for (const clause of descriptor.heritage ?? []) for (const type of clause.types ?? []) output.push(["type", type]);
  for (const declaration of descriptor.decls ?? []) if (declaration.type) output.push(["type", declaration.type]);
  if (descriptor.type) output.push(["type", descriptor.type]);
  return output;
}

function unitSoftIds(descriptor, conventions, allowedGlobals) {
  const identities = new Set();
  for (const [context, type] of unitTypeNodes(descriptor)) collectSoftIds(normalizeDescriptor(type, conventions, context), identities);
  return [...identities].filter((identity) => !(identity.startsWith("global::") && allowedGlobals.has(identity.slice("global::".length))));
}

function collectSoftIds(descriptor, identities) {
  if (!descriptor || typeof descriptor !== "object") return;
  if ((descriptor.t === "ref" || descriptor.t === "query") && isSoftId(descriptor.id)) identities.add(descriptor.id);
  if (descriptor.t === "predicate" && descriptor.subject?.kind === "unresolved") identities.add(`predicate::${descriptor.subject.name}`);
  if (descriptor.t === "import" && descriptor.module === null) identities.add(`import::${keyOf(descriptor.argument)}`);
  for (const child of typeDescriptorChildren(descriptor)) collectSoftIds(child, identities);
}

function unitUnsupportedTypes(descriptor) {
  const unsupported = new Set();
  for (const [, type] of unitTypeNodes(descriptor)) collectUnsupportedTypes(type, unsupported);
  return [...unsupported];
}

function collectUnsupportedTypes(descriptor, unsupported) {
  const shapeIssue = descriptorShapeIssue(descriptor);
  if (shapeIssue !== undefined) {
    unsupported.add(`schema:${shapeIssue}`);
    return;
  }
  if (descriptor.t === "unsupported") unsupported.add(`${descriptor.kind}:${descriptor.text}`);
  if (descriptor.t === "tp" && (!Number.isInteger(descriptor.depth) || !Number.isInteger(descriptor.index))) {
    unsupported.add(`type-parameter:${JSON.stringify(descriptor)}`);
  }
  for (const child of typeDescriptorChildren(descriptor)) collectUnsupportedTypes(child, unsupported);
}
