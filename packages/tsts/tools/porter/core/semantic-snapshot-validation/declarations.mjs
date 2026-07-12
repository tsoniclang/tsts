import {
  canonicalSchemaValue,
  canonicalSemanticDeclaration,
  compareExactKeys,
  SEMANTIC_PRIMARY_UNIT_KINDS,
  validateSnapshotObject,
} from "../snapshot-validation.mjs";
import { validateSemanticMethodSet } from "../semantic-method-set-validation.mjs";
import {
  declarationObjectId,
  isGoExported,
  isObject,
  objectId,
  profileDescription,
  receiverTypeReference,
  validateProfileIndexes,
} from "../semantic-snapshot-validation-identity.mjs";
import {
  validateConstant,
  validateObject,
  validateSignature,
  validateType,
  validateTypeParameters,
} from "./types.mjs";

export function validateSemanticDeclaration(semantic, label, issues, unit, expectation, context = {}) {
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
    validateSemanticVariant(variant, variantLabel, issues, unit, expectation?.packagePath, expectation?.profileLabels?.length ?? 0, context);
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

function validateSemanticVariant(semantic, label, issues, unit, expectedPackagePath, profileCount, context) {
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
    const receiverOwnerId = unitKind === "method" ? receiverTypeReference(semantic.signature?.receiver?.type)?.objectId : undefined;
    const outerScope = receiverOwnerId === undefined ? new Map() : context.typeParameterScopes?.get(receiverOwnerId) ?? new Map();
    validateObject(semantic.object, `${label}.object`, issues, declarationObjectId(semantic, unitKind, unit), outerScope);
    validateSignature(semantic.signature, `${label}.signature`, issues, {
      declarationKind: unitKind,
      ownerId: semantic.object?.id,
      ownerPath: `${semantic.object?.id}::signature`,
      outerScope,
    });
    validateCallableConsistency(semantic, label, issues, unit);
  } else if (unitKind === "type") {
    validateObject(semantic.object, `${label}.object`, issues, objectId(semantic.packagePath, "type", unit?.name));
    validateTypeDeclaration(semantic.type, `${label}.type`, issues, semantic.object, "declaration-units");
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

export function validateTypeDeclaration(declaration, label, issues, topLevelObject, expectedMethodSurface) {
  const keys = new Set(["alias", "methods", "methodSurface", "object", "pointerMethodSet", "rhs", "typeParameters", "valueMethodSet"]);
  validateSnapshotObject(declaration, keys, label, issues, keys);
  if (!isObject(declaration)) return;
  if (typeof declaration.alias !== "boolean") issues.push(`${label}.alias must be boolean`);
  if (declaration.methodSurface !== expectedMethodSurface) issues.push(`${label}.methodSurface must equal '${expectedMethodSurface}'`);
  validateObject(declaration.object, `${label}.object`, issues, topLevelObject?.id);
  const scope = validateTypeParameters(declaration.typeParameters, `${label}.typeParameters`, issues, {
    ownerId: topLevelObject?.id,
    outerScope: new Map(),
    role: "type",
  });
  validateType(declaration.rhs, `${label}.rhs`, issues, scope, `${topLevelObject?.id}::rhs`);
  if (!Array.isArray(declaration.methods)) issues.push(`${label}.methods must be an array`);
  if (expectedMethodSurface === "declaration-units" && ((declaration.methods?.length ?? 0) !== 0 ||
      (declaration.valueMethodSet?.length ?? 0) !== 0 || (declaration.pointerMethodSet?.length ?? 0) !== 0)) {
    issues.push(`${label} declaration-unit method surface must remain empty because methods are separate source declarations`);
  }
  let previousMethodId = "";
  for (const [index, method] of (Array.isArray(declaration.methods) ? declaration.methods : []).entries()) {
    validateExternalDeclaredMethod(method, `${label}.methods[${index}]`, issues, scope, topLevelObject?.id);
    if (typeof method?.id === "string" && previousMethodId !== "" && previousMethodId >= method.id) {
      issues.push(`${label}.methods must be sorted by exact Go method object identity with no duplicates`);
    }
    previousMethodId = typeof method?.id === "string" ? method.id : previousMethodId;
  }
  const callbacks = { validateSignature };
  validateSemanticMethodSet(declaration.valueMethodSet, `${label}.valueMethodSet`, issues, scope, topLevelObject?.id, "value", callbacks);
  validateSemanticMethodSet(declaration.pointerMethodSet, `${label}.pointerMethodSet`, issues, scope, topLevelObject?.id, "pointer", callbacks);
  if (expectedMethodSurface === "complete") validateMethodSetRelationship(declaration, label, issues);
}

function validateExternalDeclaredMethod(method, label, issues, scope, ownerId, options = { receiverRequired: true }) {
  const keys = new Set(["exported", "id", "name", "ownerId", "packagePath", "signature"]);
  validateSnapshotObject(method, keys, label, issues, keys);
  if (!isObject(method)) return;
  if (typeof method.name !== "string" || method.name === "") issues.push(`${label}.name must be non-empty`);
  if (method.ownerId !== ownerId) issues.push(`${label}.ownerId must equal '${ownerId}'`);
  if (method.id !== `${ownerId}::method::${method.name}`) issues.push(`${label}.id must identify the exact declared receiver method`);
  if (typeof method.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof method.exported !== "boolean" || method.exported !== isGoExported(method.name)) issues.push(`${label}.exported must match the Go method name`);
  validateSignature(method.signature, `${label}.signature`, issues, {
    declarationKind: options.receiverRequired ? "method" : undefined,
    ownerId: method.id,
    ownerPath: `${method.id}::signature`,
    outerScope: scope ?? new Map(),
  });
  if (options.receiverRequired && method.signature?.receiver === undefined) issues.push(`${label}.signature.receiver is required`);
  if (!options.receiverRequired && (method.signature?.receiver !== undefined || method.signature?.receiverMode !== undefined)) {
    issues.push(`${label}.signature must be receiver-free interface method evidence`);
  }
  if (options.receiverRequired && receiverTypeReference(method.signature?.receiver?.type)?.objectId !== ownerId) {
    issues.push(`${label}.signature.receiver must identify '${ownerId}'`);
  }
}

function validateMethodSetRelationship(declaration, label, issues) {
  if (declaration.alias === true || declaration.rhs?.kind === "interface") return;
  const value = Array.isArray(declaration.valueMethodSet) ? declaration.valueMethodSet : [];
  const pointer = Array.isArray(declaration.pointerMethodSet) ? declaration.pointerMethodSet : [];
  const pointerByKey = new Map(pointer.map((selection) => [selection?.key, selection]));
  for (const selection of value) {
    const pointerSelection = pointerByKey.get(selection?.key);
    if (pointerSelection === undefined) {
      issues.push(`${label}.pointerMethodSet must contain value method '${selection?.key ?? "<missing>"}'`);
      continue;
    }
    if (selection?.methodId !== pointerSelection.methodId || selection?.methodOwnerId !== pointerSelection.methodOwnerId ||
        selection?.name !== pointerSelection.name || selection?.packagePath !== pointerSelection.packagePath ||
        selection?.exported !== pointerSelection.exported || selection?.signatureId !== pointerSelection.signatureId) {
      issues.push(`${label} value/pointer method '${selection.key}' must identify the same declared and selected signatures`);
    }
  }
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
  delete declarationSignature.receiverMode;
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
