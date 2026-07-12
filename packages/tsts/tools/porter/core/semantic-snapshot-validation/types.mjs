import { compareExactKeys, validateSnapshotObject, validateStructTagContract } from "../snapshot-validation.mjs";
import { semanticNilabilityIssue } from "../semantic-type-nilability.mjs";
import { isGoExported, isObject, objectId, typeParameterIdentity } from "../semantic-snapshot-validation-identity.mjs";

const semanticBasicNames = new Set([
  "Pointer", "bool", "byte", "complex128", "complex64", "float32", "float64", "int", "int16", "int32", "int64", "int8",
  "rune", "string", "uint", "uint16", "uint32", "uint64", "uint8", "uintptr", "untyped bool", "untyped complex", "untyped float",
  "untyped int", "untyped nil", "untyped rune", "untyped string",
]);

export function validateObject(object, label, issues, expectedId, scope) {
  const keys = new Set(["exported", "id", "name", "packagePath", "type"]);
  validateSnapshotObject(object, keys, label, issues, keys);
  if (!isObject(object)) return;
  for (const key of ["id", "name"]) if (typeof object[key] !== "string" || object[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
  if (expectedId !== undefined && object.id !== expectedId) issues.push(`${label}.id must equal '${expectedId}'`);
  if (typeof object.packagePath !== "string") issues.push(`${label}.packagePath must be a string`);
  if (typeof object.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof object.name === "string" && object.exported !== isGoExported(object.name)) issues.push(`${label}.exported must match the Go object name`);
  validateType(object.type, `${label}.type`, issues, scope, `${object.id}::type`);
}

export function validateConstant(constant, label, issues) {
  const keys = new Set(constant?.kind === "String" ? ["exact", "kind", "stringValue"] : ["exact", "kind"]);
  validateSnapshotObject(constant, keys, label, issues, keys);
  if (!isObject(constant)) return;
  if (!new Set(["Bool", "Complex", "Float", "Int", "String"]).has(constant.kind)) issues.push(`${label}.kind is invalid`);
  if (typeof constant.exact !== "string" || constant.exact === "") issues.push(`${label}.exact must be a non-empty string`);
  if (constant.kind === "String" && typeof constant.stringValue !== "string") issues.push(`${label}.stringValue must be the decoded Go string value`);
  if (constant.kind !== "String" && constant.stringValue !== undefined) issues.push(`${label}.stringValue is only valid for String constants`);
}

export function validateType(type, label, issues, scope, ownerPath = "unowned") {
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

export function validateTypeParameters(parameters, label, issues, context = {}) {
  if (!Array.isArray(parameters)) {
    issues.push(`${label} must be an array`);
    return new Map(context.outerScope ?? []);
  }
  const scope = new Map(context.outerScope ?? []);
  for (const [index, parameter] of parameters.entries()) {
    const parameterLabel = `${label}[${index}]`;
    const required = new Set(["constraint", "constraintSyntax", "reference"]);
    const allowed = new Set([...required, "constraintSource", "constraintSyntax"]);
    validateSnapshotObject(parameter, allowed, parameterLabel, issues, required);
    validateTypeParameterReference(parameter?.reference, `${parameterLabel}.reference`, issues);
    if (parameter?.reference?.index !== index) issues.push(`${parameterLabel}.reference.index must equal ${index}`);
    if (context.ownerId !== undefined && parameter?.reference?.ownerId !== context.ownerId) issues.push(`${parameterLabel}.reference.ownerId must equal '${context.ownerId}'`);
    if (context.role !== undefined && parameter?.reference?.role !== context.role) issues.push(`${parameterLabel}.reference.role must equal '${context.role}'`);
    const identity = typeParameterIdentity(parameter?.reference);
    if (scope.has(identity)) issues.push(`${parameterLabel}.reference duplicates another type parameter identity`);
    else scope.set(identity, parameter?.reference);
    if (parameter?.constraintSource !== undefined) {
      validateTypeParameterReference(parameter.constraintSource, `${parameterLabel}.constraintSource`, issues);
    }
    if (typeof parameter?.constraintSyntax !== "string" || parameter.constraintSyntax === "") {
      issues.push(`${parameterLabel}.constraintSyntax must be a non-empty exact constraint spelling`);
    }
    if (context.role === "receiver") {
      if (parameter?.constraintSource === undefined) {
        issues.push(`${parameterLabel}.constraintSource is required for a receiver type parameter`);
      } else {
        const sourceIdentity = typeParameterIdentity(parameter.constraintSource);
        const source = (context.outerScope ?? new Map()).get(sourceIdentity);
        if (source === undefined) issues.push(`${parameterLabel}.constraintSource must identify an active declaration type parameter`);
        if (source !== undefined && source.name !== parameter.constraintSource.name) {
          issues.push(`${parameterLabel}.constraintSource name must equal its declaration type parameter`);
        }
      }
    } else if (parameter?.constraintSource !== undefined) {
      issues.push(`${parameterLabel}.constraintSource is valid only for receiver type parameters`);
    }
  }
  for (const [index, parameter] of parameters.entries()) {
    const reference = parameter?.reference;
    validateType(parameter?.constraint, `${label}[${index}].constraint`, issues, scope, `${reference?.ownerId}::${reference?.role}::${index}::constraint`);
  }
  return scope;
}

export function validateSignature(signature, label, issues, context = {}) {
  const allowed = new Set(["parameterNameProvenance", "parameters", "receiver", "receiverMode", "receiverTypeParameters", "results", "typeParameters", "variadic"]);
  const required = new Set(["parameterNameProvenance", "parameters", "receiverTypeParameters", "results", "typeParameters", "variadic"]);
  validateSnapshotObject(signature, allowed, label, issues, required);
  if (!isObject(signature)) return;
  if (context.declarationKind === "method" && signature.receiver === undefined) issues.push(`${label}.receiver is required for a declared method`);
  if (context.declarationKind === "func" && signature.receiver !== undefined) issues.push(`${label}.receiver must be absent for a declared function`);
  if (signature.receiver === undefined && signature.receiverMode !== undefined) issues.push(`${label}.receiverMode must be absent without a receiver`);
  if (signature.receiver !== undefined) {
    if (signature.receiverMode !== "pointer" && signature.receiverMode !== "value") issues.push(`${label}.receiverMode must be 'pointer' or 'value'`);
    const expectedMode = signature.receiver?.type?.kind === "pointer" ? "pointer" : "value";
    if (signature.receiverMode !== expectedMode) issues.push(`${label}.receiverMode must equal the exact receiver type shape '${expectedMode}'`);
  }
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
  if (signature.parameterNameProvenance !== "source" && signature.parameterNameProvenance !== "unavailable") {
    issues.push(`${label}.parameterNameProvenance must be 'source' or 'unavailable'`);
  }
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

export function validateVariable(variable, label, issues, scope, ownerPath) {
  const allowed = new Set(["embedded", "exported", "id", "name", "nameKind", "packagePath", "type"]);
  const required = new Set(["exported", "id", "name", "nameKind", "packagePath", "type"]);
  validateSnapshotObject(variable, allowed, label, issues, required);
  if (!isObject(variable)) return;
  if (typeof variable.id !== "string" || variable.id === "") issues.push(`${label}.id must be a non-empty string`);
  if (ownerPath !== undefined && variable.id !== ownerPath) issues.push(`${label}.id must equal '${ownerPath}'`);
  if (typeof variable.name !== "string") issues.push(`${label}.name must be a string`);
  const expectedNameKind = variable.name === "" ? "unnamed" : variable.name === "_" ? "blank" : "named";
  if (variable.nameKind !== expectedNameKind) issues.push(`${label}.nameKind must equal '${expectedNameKind}'`);
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
  const keys = new Set(["comparable", "completeMethods", "embeddedKinds", "embeddedTypes", "explicitMethodOrderProvenance", "explicitMethods", "implicit", "methodSetOnly"]);
  validateSnapshotObject(value, keys, label, issues, keys);
  if (!isObject(value)) return;
  for (const key of ["comparable", "implicit", "methodSetOnly"]) if (typeof value[key] !== "boolean") issues.push(`${label}.${key} must be boolean`);
  if (value.explicitMethodOrderProvenance !== "source" && value.explicitMethodOrderProvenance !== "canonical") {
    issues.push(`${label}.explicitMethodOrderProvenance must be 'source' or 'canonical'`);
  }
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
