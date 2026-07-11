import {
  assertSemanticNilability,
  assertSemanticTypeContext,
  semanticTypeContexts,
} from "../core/semantic-type-nilability.mjs";
import { semanticNamedNilabilityDisposition } from "./semantic-named-nilability.mjs";
import { semanticPointerPointeeRepresentation } from "./semantic-pointer-lowering.mjs";

export function lowerSemanticType(type, context, typeContext = semanticTypeContexts.value) {
  requireSemanticType(type);
  assertSemanticTypeContext(typeContext);
  assertSemanticNilability(type);
  switch (type.kind) {
    case "basic":
      return lowerBasic(type);
    case "named":
    case "alias":
      return lowerNamed(type, context, typeContext);
    case "typeParameter":
      return lowerTypeParameter(type.typeParameter);
    case "pointer":
      return {
        kind: "pointer",
        representation: semanticPointerPointeeRepresentation(type, context),
        element: lowerValue(type.element, context),
      };
    case "slice":
      return carrier("slice", [lowerValue(type.element, context)]);
    case "array":
      return { kind: "array", element: lowerValue(type.element, context), length: exactArrayLength(type.length) };
    case "map":
      return carrier("map", [lowerValue(type.key, context), lowerValue(type.element, context)]);
    case "channel":
      return {
        kind: "carrier",
        carrier: "chan",
        arguments: [lowerValue(type.element, context)],
        metadataArguments: [{ kind: "string", value: exactChannelDirection(type.direction) }],
      };
    case "signature":
      return carrier("func", [{ kind: "function", signature: lowerSemanticSignature(type.signature, context) }]);
    case "tuple":
      return { kind: "tuple", elements: variables(type.tuple).map((variable) => lowerValue(variable.type, context)) };
    case "struct":
      return lowerStruct(type.struct, context);
    case "interface": {
      const shape = lowerInterface(type.interface, context);
      if (typeContext !== semanticTypeContexts.value) return shape;
      return carrier("interface", [shape]);
    }
    case "union":
      if (typeContext !== semanticTypeContexts.constraint) {
        throw new Error(`canonical Go union cannot be lowered in ${typeContext} context`);
      }
      return lowerUnion(type.union, context);
    default:
      throw new Error(`unsupported canonical go/types descriptor '${type.kind}'`);
  }
}

export function lowerSemanticSignature(signature, parentContext, options = {}) {
  if (!isObject(signature)) throw new Error("canonical Go signature is missing");
  const receiverTypeParameters = requireArray(signature.receiverTypeParameters, "canonical Go receiver type parameters");
  const typeParameters = requireArray(signature.typeParameters, "canonical Go signature type parameters");
  const context = semanticContextWithTypeParameters(parentContext, [...receiverTypeParameters, ...typeParameters]);
  const input = variables(signature.parameters);
  const parameters = input.map((variable, index) => {
    requireVariable(variable, `canonical Go parameter #${index}`);
    const variadic = signature.variadic === true && index === input.length - 1;
    if (variadic && variable.type.kind !== "slice") throw new Error("canonical Go variadic signature does not end in a slice");
    return {
      name: variable.name,
      variadic,
      type: lowerValue(variadic ? variable.type.element : variable.type, context),
    };
  });
  if (signature.variadic === true && input.length === 0) throw new Error("canonical Go variadic signature has no final parameter");
  const results = variables(signature.results).map((variable, index) => {
    requireVariable(variable, `canonical Go result #${index}`);
    return { name: variable.name, type: lowerValue(variable.type, context) };
  });
  let receiver;
  if (options.includeReceiver === true) {
    requireVariable(signature.receiver, "canonical Go method receiver");
    receiver = { name: signature.receiver.name, type: lowerValue(signature.receiver.type, context) };
  }
  return {
    receiver,
    receiverTypeParameters: lowerSemanticTypeParameters(receiverTypeParameters, context),
    typeParameters: lowerSemanticTypeParameters(typeParameters, context),
    parameters,
    results,
  };
}

export function lowerSemanticTypeParameters(parameters, context) {
  return requireArray(parameters, "canonical Go type parameters").map((parameter, index) => {
    const reference = requireTypeParameterReference(parameter?.reference, `canonical Go type parameter #${index}`);
    requireSemanticType(parameter.constraint);
    return {
      reference,
      constraint: lowerSemanticType(parameter.constraint, context, semanticTypeContexts.constraint),
    };
  });
}

export function semanticContextWithTypeParameters(context, parameters) {
  const typeParameterConstraints = new Map(context.typeParameterConstraints ?? []);
  for (const [index, parameter] of requireArray(parameters, "canonical Go type parameters").entries()) {
    const reference = requireTypeParameterReference(parameter?.reference, `canonical Go type parameter #${index}`);
    requireSemanticType(parameter.constraint);
    const key = semanticTypeParameterKey(reference);
    const previous = typeParameterConstraints.get(key);
    if (previous !== undefined && previous !== parameter.constraint) {
      throw new Error(`canonical Go type parameter '${key}' has conflicting constraints in one lowering scope`);
    }
    typeParameterConstraints.set(key, parameter.constraint);
  }
  return { ...context, typeParameterConstraints };
}

export function semanticTypeParameterKey(reference) {
  requireTypeParameterReference(reference, "canonical Go type parameter");
  return `${reference.ownerId}::${reference.role}::${reference.index}`;
}

export function normalizedSemanticBasicName(basic) {
  if (!isObject(basic) || typeof basic.name !== "string" || basic.name === "") throw new Error("canonical Go basic type is missing");
  if (basic.untyped !== true) return basic.name;
  const defaults = new Map([
    ["untyped bool", "bool"],
    ["untyped int", "int"],
    ["untyped rune", "rune"],
    ["untyped float", "float64"],
    ["untyped complex", "complex128"],
    ["untyped string", "string"],
  ]);
  const name = defaults.get(basic.name);
  if (name === undefined) throw new Error(`canonical untyped Go basic '${basic.name}' has no default type`);
  return name;
}

export function semanticContractContainsApproximation(contract) {
  if (contract?.kind === "approximation") return true;
  if (contract?.kind === "union" || contract?.kind === "intersection") {
    return contract.members.some(semanticContractContainsApproximation);
  }
  if (contract?.kind === "interfaceShape") {
    return contract.embedded.some((embedded) => semanticContractContainsApproximation(embedded.type));
  }
  return false;
}

function lowerBasic(type) {
  const name = normalizedSemanticBasicName(type.basic);
  if (type.basic.name === "Pointer") return carrier("unsafePointer", []);
  if (type.nilable) throw new Error(`canonical nilable Go basic '${type.basic.name}' has no exact value representation`);
  return { kind: "basic", name };
}

function lowerNamed(type, context, typeContext) {
  const reference = type.reference;
  if (!isObject(reference) || !Array.isArray(reference.typeArgs)) throw new Error("canonical named/alias Go type has no exact reference arguments");
  const typeArguments = reference.typeArgs.map((argument) => lowerValue(argument, context));
  const base = { kind: "reference", reference, typeArguments };
  const disposition = semanticNamedNilabilityDisposition(type, context);
  if (disposition.kind === "plain") return base;
  if (disposition.kind === "rawInterface") {
    return typeContext === semanticTypeContexts.value ? carrier("interface", [base]) : base;
  }
  if (disposition.kind === "carrier") return carrier(disposition.carrier, [base]);
  throw new Error(`named/alias Go type '${reference.objectId}' has no exact semantic lowering contract in profile '${context.profile}'`);
}

function lowerTypeParameter(reference) {
  return { kind: "typeParameter", reference: requireTypeParameterReference(reference, "canonical Go type parameter reference") };
}

function lowerStruct(structure, context) {
  if (!isObject(structure)) throw new Error("canonical Go struct is missing");
  const fields = requireArray(structure.fields, "canonical Go struct fields").map((field, index) => {
    const variable = field?.variable;
    requireVariable(variable, `canonical Go struct field #${index}`);
    if (typeof field.tag !== "string" || !Array.isArray(field.tagValues) || typeof field.tagRemainder !== "string") {
      throw new Error(`canonical Go struct field #${index} has incomplete exact tag provenance`);
    }
    return {
      name: variable.name,
      embedded: variable.embedded === true,
      type: lowerValue(variable.type, context),
      tag: field.tag,
      tagValues: field.tagValues,
      tagRemainder: field.tagRemainder,
    };
  });
  return { kind: "struct", fields };
}

function lowerInterface(value, context) {
  if (!isObject(value)) throw new Error("canonical Go interface is missing");
  const methods = requireArray(value.explicitMethods, "canonical Go interface explicit methods").map((method, index) => {
    if (!isObject(method) || typeof method.name !== "string" || method.name === "") {
      throw new Error(`canonical Go interface method #${index} is missing its name`);
    }
    return { name: method.name, signature: lowerSemanticSignature(method.signature, context) };
  });
  const embeddedTypes = requireArray(value.embeddedTypes, "canonical Go interface embedded types");
  const embeddedKinds = requireArray(value.embeddedKinds, "canonical Go interface embedded classifications");
  if (embeddedTypes.length !== embeddedKinds.length) throw new Error("canonical Go interface embedded types and classifications differ in length");
  const embedded = embeddedTypes.map((type, index) => {
    const embeddingKind = embeddedKinds[index];
    if (embeddingKind !== "interface" && embeddingKind !== "typeSet") {
      throw new Error(`canonical Go interface embedding #${index} has unknown classification '${embeddingKind}'`);
    }
    return {
      embeddingKind,
      type: lowerSemanticType(type, context, embeddingKind === "interface" ? semanticTypeContexts.heritage : semanticTypeContexts.constraint),
    };
  });
  return { kind: "interfaceShape", methods, embedded, comparable: value.comparable === true };
}

function lowerUnion(union, context) {
  if (!isObject(union)) throw new Error("canonical Go union is missing");
  const terms = requireArray(union.terms, "canonical Go union terms");
  if (terms.length === 0) throw new Error("canonical Go union has no terms");
  const members = terms.map((term, index) => {
    requireSemanticType(term?.type);
    if (term.tilde !== true && term.tilde !== false) throw new Error(`canonical Go union term #${index} has no exact approximation flag`);
    const lowered = lowerSemanticType(term.type, context, semanticTypeContexts.constraint);
    return term.tilde ? { kind: "approximation", type: lowered } : lowered;
  });
  return members.length === 1 ? members[0] : { kind: "union", members };
}

function carrier(carrierName, argumentsList) {
  return { kind: "carrier", carrier: carrierName, arguments: argumentsList, metadataArguments: [] };
}

function lowerValue(type, context) {
  return lowerSemanticType(type, context, semanticTypeContexts.value);
}

function variables(tuple) {
  if (!isObject(tuple)) throw new Error("canonical Go tuple is missing");
  return requireArray(tuple.variables, "canonical Go tuple variables");
}

function exactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`canonical Go array length '${length}' is not an exact decimal string`);
  return length;
}

function exactChannelDirection(direction) {
  if (!new Set(["bidirectional", "receive", "send"]).has(direction)) throw new Error(`canonical Go channel direction '${direction}' is invalid`);
  return direction;
}

function requireSemanticType(type) {
  if (!isObject(type) || typeof type.kind !== "string" || type.kind === "") throw new Error("canonical Go declaration type is missing");
}

function requireVariable(variable, label) {
  if (!isObject(variable) || typeof variable.name !== "string") throw new Error(`${label} is missing`);
  requireSemanticType(variable.type);
}

function requireTypeParameterReference(reference, label) {
  if (!isObject(reference) || typeof reference.ownerId !== "string" || reference.ownerId === ""
    || !new Set(["receiver", "type"]).has(reference.role) || !Number.isSafeInteger(reference.index) || reference.index < 0
    || typeof reference.name !== "string" || reference.name === "") {
    throw new Error(`${label} has no exact owner/role/index/name identity`);
  }
  return reference;
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
