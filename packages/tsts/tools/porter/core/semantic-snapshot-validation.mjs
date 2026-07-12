import {
  canonicalSchemaValue,
  canonicalSemanticDeclaration,
  compareExactKeys,
  SEMANTIC_PRIMARY_UNIT_KINDS,
  validateSnapshotObject,
  validateStructTagContract,
} from "./snapshot-validation.mjs";
import { semanticNilabilityIssue } from "./semantic-type-nilability.mjs";
import {
  declarationObjectId,
  isGoExported,
  isObject,
  objectId,
  profileDescription,
  receiverTypeReference,
  typeParameterIdentity,
  validateProfileIndexes,
} from "./semantic-snapshot-validation-identity.mjs";

const semanticBasicNames = new Set([
  "Pointer", "bool", "byte", "complex128", "complex64", "float32", "float64", "int", "int16", "int32", "int64", "int8",
  "rune", "string", "uint", "uint16", "uint32", "uint64", "uint8", "uintptr", "untyped bool", "untyped complex", "untyped float",
  "untyped int", "untyped nil", "untyped rune", "untyped string",
]);

export function validateSemanticDeclaration(semantic, label, issues, unit, expectation) {
  const unitKind = unit?.kind;
  if (!SEMANTIC_PRIMARY_UNIT_KINDS.has(unitKind)) {
    if (semantic !== undefined) issues.push(`${label} is only valid for primary declaration units`);
    return;
  }
  if (expectation?.kind === "excluded") {
    if (semantic !== undefined) issues.push(`${label} must be omitted because its declaration file is excluded from semantic profiles`);
    return;
  }
  const required = expectation?.kind === "required";
  if (!Array.isArray(semantic) || semantic.length === 0) {
    if (required) issues.push(`${label} must be a non-empty profile-variant array for required primary declaration units`);
    else if (semantic !== undefined) issues.push(`${label} must be a non-empty profile-variant array when present`);
    return;
  }
  const expectedProfiles = new Set(expectation?.profiles ?? []);
  const seenProfiles = new Set();
  let previousCanonical = "";
  let expectedIdentity;
  for (const [index, variant] of semantic.entries()) {
    const variantLabel = `${label}[${index}]`;
    validateSemanticVariant(variant, variantLabel, issues, unit, expectation?.packagePath, expectation?.profileLabels?.length ?? 0);
    for (const profile of Array.isArray(variant?.profiles) ? variant.profiles : []) {
      const description = profileDescription(profile, expectation?.profileLabels);
      if (seenProfiles.has(profile)) issues.push(`${variantLabel}.profiles duplicates ${description} from another semantic variant`);
      if (required && !expectedProfiles.has(profile)) issues.push(`${variantLabel}.profiles contains unknown or cross-file ${description}`);
      seenProfiles.add(profile);
    }
    if (isObject(variant)) {
      const canonical = canonicalSemanticDeclaration(variant);
      if (previousCanonical !== "" && previousCanonical >= canonical) issues.push(`${label} must be sorted by canonical declaration with no duplicate variants`);
      previousCanonical = canonical;
      const identity = semanticVariantIdentity(variant, unitKind);
      if (expectedIdentity === undefined) expectedIdentity = identity;
      else if (identity !== expectedIdentity) issues.push(`${variantLabel} changes source declaration identity across profiles`);
    }
  }
  if (required) {
    for (const profile of [...expectedProfiles].sort((left, right) => left - right)) {
      if (!seenProfiles.has(profile)) issues.push(`${label} is missing ${profileDescription(profile, expectation?.profileLabels)} required by its file`);
    }
  }
}

export function validateExternalSemanticDeclarations(declarations, profileCount, modulePath, issues) {
  const label = "snapshot.semantic.externalDeclarations";
  if (!Array.isArray(declarations)) {
    issues.push(`${label} must be an array`);
    return;
  }
  const profilesByObject = new Map();
  let previousKey = "";
  for (const [index, semantic] of declarations.entries()) {
    const itemLabel = `${label}[${index}]`;
    if (!isObject(semantic)) {
      issues.push(`${itemLabel} must be an object`);
      continue;
    }
    compareExactKeys(semantic, ["kind", "object", "packagePath", "profiles", "type"], itemLabel, issues);
    if (semantic.kind !== "type") issues.push(`${itemLabel}.kind must be 'type'`);
    if (typeof semantic.packagePath !== "string" || semantic.packagePath === "") issues.push(`${itemLabel}.packagePath must be non-empty`);
    if (semantic.packagePath === modulePath || semantic.packagePath?.startsWith(`${modulePath}/`)) issues.push(`${itemLabel} must describe an external Go package`);
    const expectedId = objectId(semantic.packagePath, "type", semantic.object?.name);
    validateObject(semantic.object, `${itemLabel}.object`, issues, expectedId);
    if (semantic.object?.packagePath !== semantic.packagePath) issues.push(`${itemLabel}.object.packagePath must equal declaration packagePath`);
    validateTypeDeclaration(semantic.type, `${itemLabel}.type`, issues, semantic.object, { externalMethods: true });
    validateProfileIndexes(semantic.profiles, `${itemLabel}.profiles`, issues, profileCount);
    const objectProfiles = profilesByObject.get(expectedId) ?? new Set();
    for (const profile of Array.isArray(semantic.profiles) ? semantic.profiles : []) {
      if (objectProfiles.has(profile)) issues.push(`${itemLabel}.profiles duplicates external type '${expectedId}' profile ${profile}`);
      objectProfiles.add(profile);
    }
    profilesByObject.set(expectedId, objectProfiles);
    const key = `${expectedId}\0${canonicalSemanticDeclaration(semantic)}`;
    if (previousKey !== "" && previousKey >= key) issues.push(`${label} must be sorted by object identity and canonical profile variant`);
    previousKey = key;
  }
}

function validateSemanticVariant(semantic, label, issues, unit, expectedPackagePath, profileCount) {
  const unitKind = unit?.kind;
  if (!isObject(semantic)) {
    issues.push(`${label} must be an object`);
    return;
  }
  const expectedKeys = unitKind === "type"
    ? ["kind", "object", "packagePath", "profiles", "type"]
    : unitKind === "func" || unitKind === "method"
      ? ["kind", "object", "packagePath", "profiles", "signature"]
      : ["kind", "packagePath", "profiles", "valueSpecs"];
  compareExactKeys(semantic, expectedKeys, label, issues);
  if (semantic.kind !== unitKind) issues.push(`${label}.kind must equal unit kind '${unitKind}'`);
  if (typeof semantic.packagePath !== "string" || semantic.packagePath === "") issues.push(`${label}.packagePath must be a non-empty string`);
  validateProfileIndexes(semantic.profiles, `${label}.profiles`, issues, profileCount);
  if (typeof expectedPackagePath === "string" && semantic.packagePath !== expectedPackagePath) {
    issues.push(`${label}.packagePath must equal declaration file import path '${expectedPackagePath}'`);
  }
  if (unitKind === "func" || unitKind === "method") {
    validateObject(semantic.object, `${label}.object`, issues, declarationObjectId(semantic, unitKind, unit));
    validateSignature(semantic.signature, `${label}.signature`, issues, {
      declarationKind: unitKind,
      ownerId: semantic.object?.id,
      ownerPath: `${semantic.object?.id}::signature`,
      outerScope: new Map(),
    });
    validateCallableConsistency(semantic, label, issues, unit);
  } else if (unitKind === "type") {
    validateObject(semantic.object, `${label}.object`, issues, objectId(semantic.packagePath, "type", unit?.name));
    validateTypeDeclaration(semantic.type, `${label}.type`, issues, semantic.object);
    validateTypeConsistency(semantic, label, issues, unit);
  } else {
    if (!Array.isArray(semantic.valueSpecs) || semantic.valueSpecs.length === 0) issues.push(`${label}.valueSpecs must be a non-empty array`);
    for (const [index, valueSpec] of (Array.isArray(semantic.valueSpecs) ? semantic.valueSpecs : []).entries()) {
      validateValueSpec(valueSpec, `${label}.valueSpecs[${index}]`, issues, unitKind, index, semantic.packagePath, unit);
    }
    validateValueDeclarationConsistency(semantic, label, issues, unit);
  }
  if (isObject(semantic.object)) {
    if (semantic.object.packagePath !== semantic.packagePath) issues.push(`${label}.object.packagePath must equal declaration packagePath`);
    if (semantic.object.name !== unit?.name) issues.push(`${label}.object.name must equal source declaration name '${unit?.name}'`);
    if (semantic.object.exported !== unit?.exported) issues.push(`${label}.object.exported must equal source declaration exported state`);
  }
}

function semanticVariantIdentity(semantic, unitKind) {
  if (unitKind === "func" || unitKind === "method" || unitKind === "type") {
    return canonicalSchemaValue([semantic.packagePath, semantic.object?.id, semantic.object?.name]);
  }
  return canonicalSchemaValue([
    semantic.packagePath,
    ...(semantic.valueSpecs ?? []).map((specification) => [
      specification.specIndex,
      ...(specification.names ?? []).map((binding) => [
        binding.name,
        binding.nameIndex,
        binding.blank,
        binding.object?.id,
        binding.object?.name,
        binding.object?.packagePath,
        binding.object?.exported,
      ]),
    ]),
  ]);
}

function validateObject(object, label, issues, expectedId) {
  const keys = new Set(["exported", "id", "name", "packagePath", "type"]);
  validateSnapshotObject(object, keys, label, issues, keys);
  if (!isObject(object)) return;
  for (const key of ["id", "name"]) if (typeof object[key] !== "string" || object[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
  if (expectedId !== undefined && object.id !== expectedId) issues.push(`${label}.id must equal '${expectedId}'`);
  if (typeof object.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof object.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof object.name === "string" && object.exported !== isGoExported(object.name)) issues.push(`${label}.exported must match the Go object name`);
  validateType(object.type, `${label}.type`, issues, undefined, `${object.id}::type`);
}

function validateTypeDeclaration(declaration, label, issues, topLevelObject, options = {}) {
  const keys = new Set(["alias", "object", "rhs", "typeParameters", ...(options.externalMethods ? ["methods"] : [])]);
  validateSnapshotObject(declaration, keys, label, issues, new Set(["alias", "object", "rhs", "typeParameters"]));
  if (!isObject(declaration)) return;
  if (typeof declaration.alias !== "boolean") issues.push(`${label}.alias must be boolean`);
  validateObject(declaration.object, `${label}.object`, issues, topLevelObject?.id);
  const scope = validateTypeParameters(declaration.typeParameters, `${label}.typeParameters`, issues, {
    ownerId: topLevelObject?.id,
    outerScope: new Map(),
    role: "type",
  });
  validateType(declaration.rhs, `${label}.rhs`, issues, scope, `${topLevelObject?.id}::rhs`);
  if (options.externalMethods) {
    if (declaration.methods !== undefined && !Array.isArray(declaration.methods)) issues.push(`${label}.methods must be an array when present`);
    let previousMethodId = "";
    for (const [index, method] of (Array.isArray(declaration.methods) ? declaration.methods : []).entries()) {
      validateExternalDeclaredMethod(method, `${label}.methods[${index}]`, issues, scope, topLevelObject?.id);
      if (typeof method?.id === "string" && previousMethodId !== "" && previousMethodId >= method.id) {
        issues.push(`${label}.methods must be sorted by exact Go method object identity with no duplicates`);
      }
      previousMethodId = typeof method?.id === "string" ? method.id : previousMethodId;
    }
  }
}

function validateExternalDeclaredMethod(method, label, issues, scope, ownerId) {
  const keys = new Set(["exported", "id", "name", "ownerId", "packagePath", "signature"]);
  validateSnapshotObject(method, keys, label, issues, keys);
  if (!isObject(method)) return;
  if (typeof method.name !== "string" || method.name === "") issues.push(`${label}.name must be non-empty`);
  if (method.ownerId !== ownerId) issues.push(`${label}.ownerId must equal '${ownerId}'`);
  if (method.id !== `${ownerId}::method::${method.name}`) issues.push(`${label}.id must identify the exact declared receiver method`);
  if (typeof method.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof method.exported !== "boolean" || method.exported !== isGoExported(method.name)) issues.push(`${label}.exported must match the Go method name`);
  validateSignature(method.signature, `${label}.signature`, issues, {
    declarationKind: "method",
    ownerId: method.id,
    ownerPath: `${method.id}::signature`,
    outerScope: scope ?? new Map(),
  });
  if (method.signature?.receiver === undefined) issues.push(`${label}.signature.receiver is required`);
  if (receiverTypeReference(method.signature?.receiver?.type)?.objectId !== ownerId) issues.push(`${label}.signature.receiver must identify '${ownerId}'`);
}

function validateValueSpec(specification, label, issues, unitKind, expectedSpecIndex, packagePath, unit) {
  const keys = new Set(["names", "specIndex"]);
  validateSnapshotObject(specification, keys, label, issues, keys);
  if (!isObject(specification)) return;
  if (specification.specIndex !== expectedSpecIndex) issues.push(`${label}.specIndex must equal ${expectedSpecIndex}`);
  if (!Array.isArray(specification.names) || specification.names.length === 0) issues.push(`${label}.names must be a non-empty array`);
  for (const [index, binding] of (Array.isArray(specification.names) ? specification.names : []).entries()) {
    const bindingLabel = `${label}.names[${index}]`;
    const required = new Set(["blank", "name", "nameIndex", "type"]);
    validateSnapshotObject(binding, new Set([...required, "constant", "object"]), bindingLabel, issues, required);
    if (!isObject(binding)) continue;
    if (binding.nameIndex !== index) issues.push(`${bindingLabel}.nameIndex must equal ${index}`);
    if (typeof binding.name !== "string" || binding.name === "") issues.push(`${bindingLabel}.name must be a non-empty string`);
    if (typeof binding.blank !== "boolean") issues.push(`${bindingLabel}.blank must be boolean`);
    if (binding.blank === true && binding.name !== "_") issues.push(`${bindingLabel}.name must be '_' for a blank binding`);
    if (binding.blank === true) {
      if (binding.object !== undefined) issues.push(`${bindingLabel}.object must be omitted for a blank binding`);
    } else {
      validateObject(binding.object, `${bindingLabel}.object`, issues, objectId(packagePath, unitKind === "constGroup" ? "const" : "var", binding.name));
      if (binding.object?.name !== binding.name) issues.push(`${bindingLabel}.object.name must equal binding name`);
      if (binding.object?.packagePath !== packagePath) issues.push(`${bindingLabel}.object.packagePath must equal declaration packagePath`);
      if (canonicalSchemaValue(binding.object?.type) !== canonicalSchemaValue(binding.type)) issues.push(`${bindingLabel}.object.type must equal binding type`);
    }
    const typeOwner = binding.blank === true
      ? `${unit?.id}::spec::${expectedSpecIndex}::name::${index}::type`
      : `${binding.object?.id}::type`;
    validateType(binding.type, `${bindingLabel}.type`, issues, undefined, typeOwner);
    if (unitKind === "constGroup") validateConstant(binding.constant, `${bindingLabel}.constant`, issues);
    else if (binding.constant !== undefined) issues.push(`${bindingLabel}.constant is only valid for const declarations`);
  }
}

function validateCallableConsistency(semantic, label, issues, unit) {
  if (!isObject(semantic.object) || !isObject(semantic.signature)) return;
  if (semantic.object.type?.kind !== "signature") {
    issues.push(`${label}.object.type must be the selected signature type`);
    return;
  }
  const declarationSignature = { ...semantic.signature };
  delete declarationSignature.receiver;
  if (canonicalSchemaValue(callableSignatureShape(semantic.object.type.signature)) !== canonicalSchemaValue(callableSignatureShape(declarationSignature))) {
    issues.push(`${label}.object.type.signature must equal declaration signature without receiver evidence`);
  }
  if (unit.kind === "func" && semantic.signature.receiver !== undefined) issues.push(`${label}.signature.receiver must be absent for functions`);
  if (unit.kind === "method" && semantic.signature.receiver === undefined) issues.push(`${label}.signature.receiver is required for methods`);
  if (unit.kind === "method" && semantic.signature.receiver?.packagePath !== semantic.packagePath) issues.push(`${label}.signature.receiver.packagePath must equal declaration packagePath`);
  if (unit.kind === "method" && semantic.signature.receiver?.id !== `${semantic.object.id}::signature::receiver`) issues.push(`${label}.signature.receiver.id must identify the declaration receiver`);
  if (unit.kind === "method" && receiverTypeReference(semantic.signature.receiver?.type)?.name !== unit.receiver) issues.push(`${label}.signature.receiver.type must identify source receiver '${unit.receiver}'`);
  const sourceVariadic = unit.parameters?.at(-1)?.variadic === true;
  if (semantic.signature.variadic !== sourceVariadic) issues.push(`${label}.signature.variadic must equal the source parameter list`);
  validateTupleSourceNames(semantic.signature.parameters, unit.parameters, `${label}.signature.parameters`, issues);
  validateTupleSourceNames(semantic.signature.results, unit.results, `${label}.signature.results`, issues);
  const semanticTypeNames = (semantic.signature.typeParameters ?? []).map((parameter) => parameter?.reference?.name);
  if (canonicalSchemaValue(semanticTypeNames) !== canonicalSchemaValue(unit.typeParameters ?? [])) issues.push(`${label}.signature.typeParameters must equal source type parameters`);
}

function callableSignatureShape(signature) {
  if (!isObject(signature)) return signature;
  const output = structuredClone(signature);
  delete output.receiver;
  stripSignatureLocalProvenance(output);
  return output;
}

function stripSignatureLocalProvenance(value) {
  if (Array.isArray(value)) {
    for (const item of value) stripSignatureLocalProvenance(item);
    return;
  }
  if (!isObject(value)) return;
  if (Array.isArray(value.variables)) {
    for (const variable of value.variables) {
      if (isObject(variable)) delete variable.id;
      stripSignatureLocalProvenance(variable);
    }
  }
  if (Array.isArray(value.fields)) {
    for (const field of value.fields) {
      if (isObject(field?.variable)) delete field.variable.id;
      stripSignatureLocalProvenance(field);
    }
  }
  for (const key of ["explicitMethods", "completeMethods"]) {
    for (const method of Array.isArray(value[key]) ? value[key] : []) {
      if (isObject(method)) {
        delete method.id;
        delete method.ownerId;
      }
      stripSignatureLocalProvenance(method);
    }
  }
  for (const [key, item] of Object.entries(value)) {
    if (key !== "variables" && key !== "fields" && key !== "explicitMethods" && key !== "completeMethods") stripSignatureLocalProvenance(item);
  }
}

function validateTypeConsistency(semantic, label, issues, unit) {
  if (!isObject(semantic.object) || !isObject(semantic.type)) return;
  if (canonicalSchemaValue(semantic.object) !== canonicalSchemaValue(semantic.type.object)) {
    issues.push(`${label}.type.object must equal top-level declaration object`);
  }
  const expectedKind = semantic.type.alias === true ? "alias" : "named";
  if (semantic.object.type?.kind !== expectedKind) issues.push(`${label}.object.type.kind must be '${expectedKind}'`);
  const reference = semantic.object.type?.reference;
  if (reference?.objectId !== semantic.object.id || reference?.packagePath !== semantic.packagePath || reference?.name !== unit?.name) {
    issues.push(`${label}.object.type reference must identify the top-level type object exactly`);
  }
  if (!Array.isArray(reference?.typeArgs) || reference.typeArgs.length !== 0) issues.push(`${label}.object.type reference must have no instantiated type arguments`);
  if (semantic.type.alias !== (unit.typeKind === "alias")) issues.push(`${label}.type.alias must equal source typeKind`);
  const semanticTypeNames = (semantic.type.typeParameters ?? []).map((parameter) => parameter?.reference?.name);
  if (canonicalSchemaValue(semanticTypeNames) !== canonicalSchemaValue(unit.typeParameters ?? [])) issues.push(`${label}.type.typeParameters must equal source type parameters`);
}

function validateTupleSourceNames(tuple, source, label, issues) {
  const expected = (source ?? []).flatMap((parameter) => parameter?.names?.length ? parameter.names : [""]);
  const actual = (tuple?.variables ?? []).map((variable) => variable?.name);
  if (canonicalSchemaValue(actual) !== canonicalSchemaValue(expected)) issues.push(`${label} names must equal the flattened source parameter names`);
}

function validateValueDeclarationConsistency(semantic, label, issues, unit) {
  const sourceSpecs = Array.isArray(unit?.valueSpecs) ? unit.valueSpecs : [];
  const semanticSpecs = Array.isArray(semantic?.valueSpecs) ? semantic.valueSpecs : [];
  if (sourceSpecs.length !== semanticSpecs.length) issues.push(`${label}.valueSpecs must match source value-spec count`);
  for (let specIndex = 0; specIndex < Math.min(sourceSpecs.length, semanticSpecs.length); specIndex++) {
    const sourceNames = Array.isArray(sourceSpecs[specIndex]?.names) ? sourceSpecs[specIndex].names : [];
    const bindings = Array.isArray(semanticSpecs[specIndex]?.names) ? semanticSpecs[specIndex].names : [];
    if (sourceNames.length !== bindings.length) issues.push(`${label}.valueSpecs[${specIndex}].names must match source binding count`);
    for (let nameIndex = 0; nameIndex < Math.min(sourceNames.length, bindings.length); nameIndex++) {
      if (bindings[nameIndex]?.name !== sourceNames[nameIndex]) issues.push(`${label}.valueSpecs[${specIndex}].names[${nameIndex}].name must equal source binding name`);
      if (bindings[nameIndex]?.blank !== (sourceNames[nameIndex] === "_")) issues.push(`${label}.valueSpecs[${specIndex}].names[${nameIndex}].blank must equal source blank identity`);
    }
  }
}

function validateConstant(constant, label, issues) {
  const keys = new Set(constant?.kind === "String" ? ["exact", "kind", "stringValue"] : ["exact", "kind"]);
  validateSnapshotObject(constant, keys, label, issues, keys);
  if (!isObject(constant)) return;
  if (!new Set(["Bool", "Complex", "Float", "Int", "String"]).has(constant.kind)) issues.push(`${label}.kind is invalid`);
  if (typeof constant.exact !== "string" || constant.exact === "") issues.push(`${label}.exact must be a non-empty string`);
  if (constant.kind === "String" && typeof constant.stringValue !== "string") issues.push(`${label}.stringValue must be the decoded Go string value`);
  if (constant.kind !== "String" && constant.stringValue !== undefined) issues.push(`${label}.stringValue is only valid for String constants`);
}

function validateType(type, label, issues, scope, ownerPath = "unowned") {
  if (!isObject(type)) {
    issues.push(`${label} must be an object`);
    return;
  }
  const payloadByKind = {
    alias: "reference", array: "element", basic: "basic", channel: "element", interface: "interface",
    map: "element", named: "reference", pointer: "element", signature: "signature", slice: "element",
    struct: "struct", tuple: "tuple", typeParameter: "typeParameter", union: "union",
  };
  const payload = payloadByKind[type.kind];
  if (payload === undefined) {
    issues.push(`${label}.kind '${type.kind}' is unknown`);
    return;
  }
  const expectedKeys = ["kind", "nilable", payload];
  if (type.kind === "array") expectedKeys.push("length");
  if (type.kind === "channel") expectedKeys.push("direction");
  if (type.kind === "map") expectedKeys.push("key");
  expectedKeys.sort();
  compareExactKeys(type, expectedKeys, label, issues);
  const nilabilityIssue = semanticNilabilityIssue(type);
  if (nilabilityIssue !== undefined) issues.push(`${label}.nilable ${nilabilityIssue}`);
  if (type.kind === "basic") validateBasic(type.basic, `${label}.basic`, issues);
  else if (type.kind === "named" || type.kind === "alias") validateTypeReference(type.reference, `${label}.reference`, issues, scope, ownerPath);
  else if (type.kind === "typeParameter") validateTypeParameterReference(type.typeParameter, `${label}.typeParameter`, issues, scope);
  else if (type.kind === "pointer" || type.kind === "slice") validateType(type.element, `${label}.element`, issues, scope, `${ownerPath}::element`);
  else if (type.kind === "array") {
    if (typeof type.length !== "string" || !/^(?:0|[1-9][0-9]*)$/.test(type.length)) issues.push(`${label}.length must be a canonical non-negative decimal string`);
    validateType(type.element, `${label}.element`, issues, scope, `${ownerPath}::element`);
  } else if (type.kind === "map") {
    validateType(type.key, `${label}.key`, issues, scope, `${ownerPath}::key`);
    validateType(type.element, `${label}.element`, issues, scope, `${ownerPath}::element`);
  } else if (type.kind === "channel") {
    if (!new Set(["bidirectional", "receive", "send"]).has(type.direction)) issues.push(`${label}.direction is invalid`);
    validateType(type.element, `${label}.element`, issues, scope, `${ownerPath}::element`);
  } else if (type.kind === "signature") validateSignature(type.signature, `${label}.signature`, issues, { outerScope: scope ?? new Map(), ownerPath });
  else if (type.kind === "tuple") validateTuple(type.tuple, `${label}.tuple`, issues, scope, ownerPath);
  else if (type.kind === "struct") validateStruct(type.struct, `${label}.struct`, issues, scope, ownerPath);
  else if (type.kind === "interface") validateInterface(type.interface, `${label}.interface`, issues, scope, ownerPath);
  else if (type.kind === "union") validateUnion(type.union, `${label}.union`, issues, scope, ownerPath);
}

function validateBasic(basic, label, issues) {
  const keys = new Set(["name", "untyped"]);
  validateSnapshotObject(basic, keys, label, issues, keys);
  if (!isObject(basic)) return;
  if (typeof basic.name !== "string" || basic.name === "") issues.push(`${label}.name must be a non-empty string`);
  if (typeof basic.untyped !== "boolean") issues.push(`${label}.untyped must be boolean`);
  if (!semanticBasicNames.has(basic.name)) issues.push(`${label}.name is not a canonical Go basic type name`);
  if (typeof basic.name === "string" && basic.untyped !== basic.name.startsWith("untyped ")) issues.push(`${label}.untyped must match the canonical basic type name`);
}

function validateTypeReference(reference, label, issues, scope, ownerPath) {
  const keys = new Set(["name", "objectId", "packagePath", "typeArgs"]);
  validateSnapshotObject(reference, keys, label, issues, keys);
  if (!isObject(reference)) return;
  for (const key of ["name", "objectId"]) if (typeof reference[key] !== "string" || reference[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
  if (typeof reference.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  const expectedId = objectId(reference.packagePath, "type", reference.name);
  if (reference.objectId !== expectedId) issues.push(`${label}.objectId must equal '${expectedId}'`);
  if (!Array.isArray(reference.typeArgs)) issues.push(`${label}.typeArgs must be an array`);
  for (const [index, argument] of (Array.isArray(reference.typeArgs) ? reference.typeArgs : []).entries()) validateType(argument, `${label}.typeArgs[${index}]`, issues, scope, `${ownerPath}::typeArg::${index}`);
}

function validateTypeParameterReference(reference, label, issues, scope) {
  const keys = new Set(["index", "name", "ownerId", "role"]);
  validateSnapshotObject(reference, keys, label, issues, keys);
  if (!isObject(reference)) return;
  if (!Number.isSafeInteger(reference.index) || reference.index < 0) issues.push(`${label}.index must be a non-negative safe integer`);
  for (const key of ["name", "ownerId"]) if (typeof reference[key] !== "string" || reference[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
  if (!new Set(["receiver", "type"]).has(reference.role)) issues.push(`${label}.role is invalid`);
  if (scope instanceof Map && !scope.has(typeParameterIdentity(reference))) issues.push(`${label} does not identify a type parameter in the active declaration scope`);
}

function validateTypeParameters(parameters, label, issues, context = {}) {
  if (!Array.isArray(parameters)) {
    issues.push(`${label} must be an array`);
    return new Map(context.outerScope ?? []);
  }
  const scope = new Map(context.outerScope ?? []);
  for (const [index, parameter] of parameters.entries()) {
    const parameterLabel = `${label}[${index}]`;
    const keys = new Set(["constraint", "reference"]);
    validateSnapshotObject(parameter, keys, parameterLabel, issues, keys);
    validateTypeParameterReference(parameter?.reference, `${parameterLabel}.reference`, issues);
    if (parameter?.reference?.index !== index) issues.push(`${parameterLabel}.reference.index must equal ${index}`);
    if (context.ownerId !== undefined && parameter?.reference?.ownerId !== context.ownerId) issues.push(`${parameterLabel}.reference.ownerId must equal '${context.ownerId}'`);
    if (context.role !== undefined && parameter?.reference?.role !== context.role) issues.push(`${parameterLabel}.reference.role must equal '${context.role}'`);
    const identity = typeParameterIdentity(parameter?.reference);
    if (scope.has(identity)) issues.push(`${parameterLabel}.reference duplicates another type parameter identity`);
    else scope.set(identity, parameter?.reference);
  }
  for (const [index, parameter] of parameters.entries()) {
    const reference = parameter?.reference;
    validateType(parameter?.constraint, `${label}[${index}].constraint`, issues, scope, `${reference?.ownerId}::${reference?.role}::${index}::constraint`);
  }
  return scope;
}

function validateSignature(signature, label, issues, context = {}) {
  const allowed = new Set(["parameters", "receiver", "receiverTypeParameters", "results", "typeParameters", "variadic"]);
  const required = new Set(["parameters", "receiverTypeParameters", "results", "typeParameters", "variadic"]);
  validateSnapshotObject(signature, allowed, label, issues, required);
  if (!isObject(signature)) return;
  if (context.declarationKind === "method" && signature.receiver === undefined) issues.push(`${label}.receiver is required for a declared method`);
  if (context.declarationKind === "func" && signature.receiver !== undefined) issues.push(`${label}.receiver must be absent for a declared function`);
  const receiverScope = validateTypeParameters(signature.receiverTypeParameters, `${label}.receiverTypeParameters`, issues, {
    ownerId: context.ownerId,
    outerScope: context.outerScope ?? new Map(),
    role: "receiver",
  });
  if (context.declarationKind === "func" && (signature.receiverTypeParameters?.length ?? 0) !== 0) issues.push(`${label}.receiverTypeParameters must be empty for a declared function`);
  const scope = validateTypeParameters(signature.typeParameters, `${label}.typeParameters`, issues, {
    ownerId: context.ownerId,
    outerScope: receiverScope,
    role: "type",
  });
  if (signature.receiver !== undefined) validateVariable(signature.receiver, `${label}.receiver`, issues, scope, `${context.ownerPath}::receiver`);
  validateTuple(signature.parameters, `${label}.parameters`, issues, scope, `${context.ownerPath}::parameters`);
  validateTuple(signature.results, `${label}.results`, issues, scope, `${context.ownerPath}::results`);
  if (typeof signature.variadic !== "boolean") issues.push(`${label}.variadic must be boolean`);
  if (signature.variadic === true && signature.parameters?.variables?.at(-1)?.type?.kind !== "slice") issues.push(`${label}.variadic requires a final slice parameter`);
}

function validateTuple(tuple, label, issues, scope, ownerPath) {
  validateSnapshotObject(tuple, new Set(["variables"]), label, issues, new Set(["variables"]));
  if (!Array.isArray(tuple?.variables)) {
    issues.push(`${label}.variables must be an array`);
    return;
  }
  for (const [index, variable] of tuple.variables.entries()) validateVariable(variable, `${label}.variables[${index}]`, issues, scope, `${ownerPath}::${index}`);
}

function validateVariable(variable, label, issues, scope, ownerPath) {
  const allowed = new Set(["embedded", "exported", "id", "name", "packagePath", "type"]);
  const required = new Set(["exported", "id", "name", "packagePath", "type"]);
  validateSnapshotObject(variable, allowed, label, issues, required);
  if (!isObject(variable)) return;
  if (typeof variable.id !== "string" || variable.id === "") issues.push(`${label}.id must be a non-empty string`);
  if (ownerPath !== undefined && variable.id !== ownerPath) issues.push(`${label}.id must equal '${ownerPath}'`);
  if (typeof variable.name !== "string") issues.push(`${label}.name must be a string`);
  if (typeof variable.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof variable.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof variable.name === "string" && variable.exported !== isGoExported(variable.name)) issues.push(`${label}.exported must match the Go variable name`);
  if (variable.embedded !== undefined && typeof variable.embedded !== "boolean") issues.push(`${label}.embedded must be boolean when present`);
  validateType(variable.type, `${label}.type`, issues, scope, `${ownerPath}::type`);
}

function validateStruct(structure, label, issues, scope, ownerPath) {
  validateSnapshotObject(structure, new Set(["fields"]), label, issues, new Set(["fields"]));
  if (!Array.isArray(structure?.fields)) {
    issues.push(`${label}.fields must be an array`);
    return;
  }
  for (const [index, field] of structure.fields.entries()) {
    const fieldLabel = `${label}.fields[${index}]`;
    const keys = new Set(["tag", "tagRemainder", "tagValues", "variable"]);
    validateSnapshotObject(field, keys, fieldLabel, issues, keys);
    if (typeof field?.tag !== "string") issues.push(`${fieldLabel}.tag must be a string`);
    if (typeof field?.tagRemainder !== "string") issues.push(`${fieldLabel}.tagRemainder must be a string`);
    if (!Array.isArray(field?.tagValues)) issues.push(`${fieldLabel}.tagValues must be an array`);
    for (const [tagIndex, tag] of (Array.isArray(field?.tagValues) ? field.tagValues : []).entries()) {
      const tagLabel = `${fieldLabel}.tagValues[${tagIndex}]`;
      const tagKeys = new Set(["key", "value"]);
      validateSnapshotObject(tag, tagKeys, tagLabel, issues, tagKeys);
      if (typeof tag?.key !== "string" || tag.key === "") issues.push(`${tagLabel}.key must be a non-empty string`);
      if (typeof tag?.value !== "string") issues.push(`${tagLabel}.value must be a string`);
    }
    validateStructTagContract(field?.tag, field?.tagValues, field?.tagRemainder, fieldLabel, issues);
    validateVariable(field?.variable, `${fieldLabel}.variable`, issues, scope, `${ownerPath}::field::${index}`);
  }
}

function validateInterface(value, label, issues, scope, ownerPath) {
  const keys = new Set(["comparable", "completeMethods", "embeddedKinds", "embeddedTypes", "explicitMethods", "implicit", "methodSetOnly"]);
  validateSnapshotObject(value, keys, label, issues, keys);
  if (!isObject(value)) return;
  for (const key of ["comparable", "implicit", "methodSetOnly"]) if (typeof value[key] !== "boolean") issues.push(`${label}.${key} must be boolean`);
  for (const key of ["explicitMethods", "completeMethods"]) {
    if (!Array.isArray(value[key])) issues.push(`${label}.${key} must be an array`);
    const role = key === "explicitMethods" ? "explicitMethod" : "completeMethod";
    for (const [index, method] of (Array.isArray(value[key]) ? value[key] : []).entries()) validateMethod(method, `${label}.${key}[${index}]`, issues, scope, ownerPath, role, index);
  }
  if (!Array.isArray(value.embeddedTypes)) issues.push(`${label}.embeddedTypes must be an array`);
  if (!Array.isArray(value.embeddedKinds)) issues.push(`${label}.embeddedKinds must be an array`);
  if (Array.isArray(value.embeddedTypes) && Array.isArray(value.embeddedKinds) && value.embeddedTypes.length !== value.embeddedKinds.length) {
    issues.push(`${label}.embeddedKinds must have one entry per embedded type`);
  }
  for (const [index, kind] of (Array.isArray(value.embeddedKinds) ? value.embeddedKinds : []).entries()) {
    if (kind !== "interface" && kind !== "typeSet") issues.push(`${label}.embeddedKinds[${index}] must be 'interface' or 'typeSet'`);
  }
  for (const [index, embedded] of (Array.isArray(value.embeddedTypes) ? value.embeddedTypes : []).entries()) validateType(embedded, `${label}.embeddedTypes[${index}]`, issues, scope, `${ownerPath}::embedded::${index}`);
}

function validateMethod(method, label, issues, scope, ownerPath, role, index) {
  const keys = new Set(["exported", "id", "name", "ownerId", "packagePath", "signature"]);
  validateSnapshotObject(method, keys, label, issues, keys);
  if (!isObject(method)) return;
  for (const key of ["id", "name", "ownerId"]) if (typeof method[key] !== "string" || method[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
  if (method.ownerId !== ownerPath) issues.push(`${label}.ownerId must equal '${ownerPath}'`);
  const methodName = method.exported === true || method.packagePath === "" ? method.name : `${method.packagePath}.${method.name}`;
  const expectedId = `${ownerPath}::${role}::${index}::${methodName}`;
  if (method.id !== expectedId) issues.push(`${label}.id must equal '${expectedId}'`);
  if (typeof method.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof method.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof method.name === "string" && method.exported !== isGoExported(method.name)) issues.push(`${label}.exported must match the Go method name`);
  validateSignature(method.signature, `${label}.signature`, issues, { outerScope: scope ?? new Map(), ownerPath: `${method.id}::signature` });
  if (method.signature?.receiver !== undefined) issues.push(`${label}.signature.receiver must be absent for interface methods`);
  if ((method.signature?.receiverTypeParameters?.length ?? 0) !== 0) issues.push(`${label}.signature.receiverTypeParameters must be empty for interface methods`);
  if ((method.signature?.typeParameters?.length ?? 0) !== 0) issues.push(`${label}.signature.typeParameters must be empty for interface methods`);
}

function validateUnion(union, label, issues, scope, ownerPath) {
  validateSnapshotObject(union, new Set(["terms"]), label, issues, new Set(["terms"]));
  if (!Array.isArray(union?.terms) || union.terms.length === 0) {
    issues.push(`${label}.terms must be a non-empty array`);
    return;
  }
  for (const [index, term] of union.terms.entries()) {
    const termLabel = `${label}.terms[${index}]`;
    const keys = new Set(["tilde", "type"]);
    validateSnapshotObject(term, keys, termLabel, issues, keys);
    if (typeof term?.tilde !== "boolean") issues.push(`${termLabel}.tilde must be boolean`);
    validateType(term?.type, `${termLabel}.type`, issues, scope, `${ownerPath}::term::${index}`);
  }
}
