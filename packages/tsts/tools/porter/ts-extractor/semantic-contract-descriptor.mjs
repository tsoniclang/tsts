import { safeParamName, uniqueName } from "../core/names.mjs";
import { semanticTypeParameterKey } from "./semantic-type-contract.mjs";

export function semanticContractDescriptor(contract, context, operations, options = {}) {
  requireContract(contract);
  switch (contract.kind) {
    case "basic":
      return operations.basic(contract.name, contract);
    case "reference": {
      const argumentsList = contract.typeArguments.map((argument) => semanticContractDescriptor(argument, context, operations));
      return operations.reference(contract.reference, argumentsList, contract);
    }
    case "typeParameter":
      return typeParameterDescriptor(contract.reference, context);
    case "carrier": {
      const argumentsList = contract.arguments.map((argument) => semanticContractDescriptor(argument, context, operations));
      for (const metadata of contract.metadataArguments) argumentsList.push({ t: "literal", kind: metadata.kind, value: metadata.value });
      return { t: "ref", id: operations.carrierId(contract.carrier, contract), args: argumentsList };
    }
    case "pointer": {
      const element = semanticContractDescriptor(contract.element, context, operations);
      return {
        t: "ref",
        id: operations.pointerCarrierId(contract.representation, contract),
        args: [element],
      };
    }
    case "array":
      return {
        t: "ref",
        id: operations.carrierId("array", contract),
        args: [
          semanticContractDescriptor(contract.element, context, operations),
          { t: "literal", kind: "string", value: exactArrayLength(contract.length) },
        ],
      };
    case "tuple":
      return { t: "tuple", elements: contract.elements.map((element) => semanticContractDescriptor(element, context, operations)) };
    case "struct":
      return structDescriptor(contract, context, operations, options.objectContract ?? "type");
    case "interfaceShape":
      return interfaceDescriptor(contract, context, operations);
    case "function":
      return { t: "fn", ...semanticSignatureDescriptor(contract.signature, context, operations) };
    case "union":
      return { t: "union", members: contract.members.map((member) => semanticContractDescriptor(member, context, operations)) };
    case "intersection":
      return { t: "intersect", members: contract.members.map((member) => semanticContractDescriptor(member, context, operations)) };
    case "approximation":
      return { t: "goApprox", type: semanticContractDescriptor(contract.type, context, operations) };
    default:
      throw new Error(`unsupported canonical semantic descriptor contract '${contract.kind}'`);
  }
}

export function semanticSignatureDescriptor(signature, parentContext, operations, options = {}) {
  if (!isObject(signature)) throw new Error("canonical semantic signature is missing");
  const allTypeParameters = [...signature.receiverTypeParameters, ...signature.typeParameters];
  const typeParameters = bindTypeParameters(allTypeParameters, parentContext.typeParameters ?? new Map());
  const context = { ...parentContext, typeParameters };
  const params = [];
  const usedNames = new Set();
  if (options.includeReceiver === true) {
    if (!isObject(signature.receiver)) throw new Error("canonical semantic method signature has no receiver");
    params.push(callableParameterDescriptor(
      uniqueName("receiver", usedNames),
      semanticContractDescriptor(signature.receiver.type, context, operations),
    ));
  }
  let syntheticIndex = 0;
  for (const parameter of signature.parameters) {
    const baseName = parameter.name === "" ? `arg${syntheticIndex++}` : safeParamName(parameter.name);
    const name = uniqueName(baseName, usedNames);
    if (parameter.variadic === true && !isSliceCarrier(parameter.type)) {
      throw new Error("canonical Go variadic parameter does not retain its slice carrier");
    }
    const type = semanticContractDescriptor(parameter.type, context, operations);
    params.push(callableParameterDescriptor(name, type));
  }
  const ret = semanticResultsDescriptor(signature.results, context, operations);
  const receiverCount = signature.receiverTypeParameters.length;
  const typeParams = allTypeParameters.map((parameter, index) => {
    const binding = typeParameters.get(semanticTypeParameterKey(parameter.reference));
    if (binding === undefined) throw new Error(`unbound canonical Go type parameter '${parameter.reference.name}'`);
    const constraint = semanticContractDescriptor(parameter.constraint, context, operations);
    return operations.typeParameterDeclaration?.(parameter, binding, constraint, index, receiverCount)
      ?? defaultTypeParameterDescriptor(parameter, binding, constraint);
  });
  return {
    params,
    ret,
    missingReturnType: false,
    returnTypePolicy: "required",
    typeParams,
    signatureModifiers: [],
  };
}

function semanticResultsDescriptor(results, context, operations) {
  if (!Array.isArray(results)) throw new Error("canonical semantic signature results must be an array");
  for (const [index, result] of results.entries()) {
    validateResultName(result, index);
  }
  if (results.length === 0) return { t: "kw", kw: "void" };
  if (results.length === 1) {
    return semanticContractDescriptor(results[0].type, context, operations);
  }
  const labeledCount = results.filter((result) => result.nameKind !== "unnamed").length;
  if (labeledCount !== 0 && labeledCount !== results.length) {
    throw new Error("canonical Go result list mixes named/blank and unnamed results and has no exact TypeScript tuple descriptor");
  }
  const elements = results.map((result) => {
    const type = semanticContractDescriptor(result.type, context, operations);
    if (result.nameKind === "unnamed") return type;
    return {
      t: "namedTuple",
      name: result.name === "_" ? "_" : safeParamName(result.name),
      rest: false,
      optional: false,
      type,
    };
  });
  return { t: "tuple", elements };
}

function validateResultName(result, index) {
  if (!isObject(result) || typeof result.name !== "string") throw new Error(`canonical Go result #${index} has no exact name`);
  const expectedNameKind = result.name === "" ? "unnamed" : result.name === "_" ? "blank" : "named";
  if (result.nameKind !== expectedNameKind) {
    throw new Error(`canonical Go result #${index} nameKind must be '${expectedNameKind}', got '${result.nameKind}'`);
  }
}

export function bindTypeParameters(parameters, inherited = new Map()) {
  const typeParameters = new Map(inherited);
  if (parameters.length === 0) return typeParameters;
  const inheritedBindings = [...inherited.values()];
  const depth = inheritedBindings.length === 0 ? 0 : Math.max(...inheritedBindings.map((binding) => binding.depth)) + 1;
  parameters.forEach((parameter, index) => {
    const key = semanticTypeParameterKey(parameter.reference);
    if (typeParameters.has(key)) throw new Error(`canonical Go type parameter '${key}' is bound twice`);
    typeParameters.set(key, { depth, index });
  });
  return typeParameters;
}

function structDescriptor(contract, context, operations, objectContract) {
  let embeddedIndex = 0;
  let blankIndex = 0;
  const members = contract.fields.map((field) => ({
    kind: "property",
    name: field.embedded ? `__tsgoEmbedded${embeddedIndex++}`
      : field.name === "_" && objectContract === "declaration" ? `__tsgoBlank${blankIndex++}` : field.name,
    modifiers: [],
    optional: undefined,
    type: semanticContractDescriptor(field.type, context, operations),
  }));
  return { t: "object", members: members.length === 0 ? [emptyObjectMember(objectContract)] : members };
}

function interfaceDescriptor(contract, context, operations) {
  const parts = [];
  const methods = contract.methods.map((method) => ({
    kind: "method",
    name: method.name,
    role: "signature",
    modifiers: [],
    type: { t: "fn", ...semanticSignatureDescriptor(method.signature, context, operations) },
  }));
  if (methods.length > 0) parts.push({ t: "object", members: methods });
  for (const embedded of contract.embedded) parts.push(semanticContractDescriptor(embedded.type, context, operations));
  if (parts.length === 0) return contract.comparable ? { t: "ref", id: operations.compatId("GoComparable"), args: [] } : { t: "kw", kw: "unknown" };
  return parts.length === 1 ? parts[0] : { t: "intersect", members: parts };
}

function typeParameterDescriptor(reference, context) {
  const binding = context.typeParameters?.get(semanticTypeParameterKey(reference));
  if (binding === undefined) throw new Error(`unbound Go type parameter ${semanticTypeParameterKey(reference)}`);
  return { t: "tp", depth: binding.depth, index: binding.index };
}

function callableParameterDescriptor(name, type) {
  return {
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
  };
}

function isSliceCarrier(contract) {
  return contract?.kind === "carrier" && contract.carrier === "slice";
}

function defaultTypeParameterDescriptor(parameter, binding, constraint) {
  return {
    name: parameter.reference.name,
    binding: { depth: binding.depth, index: binding.index },
    modifiers: { const: false, variance: null, unsupported: [] },
    constraint,
    default: null,
    invalidConstraint: null,
  };
}

function emptyObjectMember(contract) {
  return {
    kind: "property",
    name: "__tsgoEmpty",
    modifiers: contract === "declaration" ? ["readonly"] : [],
    ...(contract === "type" ? { readonly: true } : {}),
    optional: true,
    type: { t: "kw", kw: "never" },
  };
}

function exactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`invalid canonical semantic array length '${length}'`);
  return length;
}

function requireContract(contract) {
  if (!isObject(contract) || typeof contract.kind !== "string" || contract.kind === "") throw new Error("canonical semantic descriptor contract is missing");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
