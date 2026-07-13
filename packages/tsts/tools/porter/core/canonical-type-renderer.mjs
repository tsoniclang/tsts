import { safeIdentifier, safePropertyName } from "./names.mjs";

export function renderCanonicalType(contract, operations) {
  requireContract(contract);
  switch (contract.kind) {
    case "basic":
      return operations.basic(contract.name, contract);
    case "reference":
      return renderReference(contract, operations);
    case "typeParameter":
      return operations.typeParameter?.(contract.reference, contract) ?? safeIdentifier(contract.reference.name);
    case "carrier":
      return renderCarrier(contract, operations);
    case "pointer":
      return renderPointer(contract, operations);
    case "array":
      return `${operations.carrier("array", contract)}<${renderCanonicalType(contract.element, operations)}, ${JSON.stringify(exactArrayLength(contract.length))}>`;
    case "tuple":
      return `[${requireArray(contract.elements, "canonical semantic tuple elements").map((element) => renderCanonicalType(element, operations)).join(", ")}]`;
    case "struct":
      return renderStruct(contract, operations);
    case "interfaceShape":
      return renderInterface(contract, operations);
    case "function":
      return renderFunction(contract.signature, operations);
    case "union":
      return renderComposite(contract.members, "union", " | ", operations);
    case "intersection":
      return renderComposite(contract.members, "intersection", " & ", operations);
    case "approximation": {
      const rendered = renderCanonicalType(contract.type, operations);
      return operations.approximation?.(contract.type, rendered) ?? rendered;
    }
    default:
      throw new Error(`unsupported canonical semantic type contract '${contract.kind}'`);
  }
}

export function renderCanonicalSignature(signature, operations, options = {}) {
  if (!isObject(signature)) throw new Error("canonical semantic signature is missing");
  const parameters = [];
  const usedNames = new Set();
  if (options.includeReceiver === true) {
    if (!isObject(signature.receiver)) throw new Error("canonical semantic method signature has no receiver");
    const receiverName = options.receiverName ?? "receiver";
    if (typeof receiverName !== "string" || receiverName.length === 0) {
      throw new Error("canonical semantic method receiver requires one exact TypeScript parameter name");
    }
    parameters.push(renderParameter({ ...signature.receiver, name: uniqueParameterName(safeIdentifier(receiverName), usedNames), variadic: false }, operations));
  }
  let syntheticIndex = 0;
  for (const parameter of requireArray(signature.parameters, "canonical semantic signature parameters")) {
    const baseName = parameter.name === "" ? `arg${syntheticIndex++}` : safeIdentifier(parameter.name);
    parameters.push(renderParameter({ ...parameter, name: uniqueParameterName(baseName, usedNames) }, operations));
  }
  const results = requireArray(signature.results, "canonical semantic signature results")
    .map((result) => renderCanonicalType(result.type, operations));
  const returnType = results.length === 0 ? "void" : results.length === 1 ? results[0] : `[${results.join(", ")}]`;
  return { parameters, returnType };
}

export function renderCanonicalTypeParameters(parameters, operations, ...unsupportedOptions) {
  if (unsupportedOptions.length !== 0) throw new Error("canonical semantic type parameters do not accept synthetic rendering options");
  const rendered = requireArray(parameters, "canonical semantic type parameters").map((parameter) => {
    const name = safeIdentifier(parameter.reference.name);
    const constraint = operations.constraint?.(parameter.constraint, parameter)
      ?? renderCanonicalType(parameter.constraint, operations);
    const extendsClause = constraint === "unknown" ? "" : ` extends ${constraint}`;
    return `${name}${extendsClause}`;
  });
  return rendered.length === 0 ? "" : `<${rendered.join(", ")}>`;
}

function renderReference(contract, operations) {
  const reference = contract.reference;
  if (!isObject(reference) || typeof reference.name !== "string" || reference.name === ""
    || typeof reference.packagePath !== "string" || typeof reference.objectId !== "string" || reference.objectId === "") {
    throw new Error("canonical semantic type reference has an incomplete identity");
  }
  const argumentsList = requireArray(contract.typeArguments, "canonical semantic reference arguments")
    .map((argument) => renderCanonicalType(argument, operations));
  return operations.reference(reference, argumentsList, contract);
}

function renderCarrier(contract, operations) {
  if (typeof contract.carrier !== "string" || contract.carrier === "") throw new Error("canonical semantic carrier has no identity");
  const argumentsList = requireArray(contract.arguments, "canonical semantic carrier arguments")
    .map((argument) => renderCanonicalType(argument, operations));
  for (const metadata of requireArray(contract.metadataArguments, "canonical semantic carrier metadata arguments")) {
    if (metadata?.kind !== "string" || typeof metadata.value !== "string") throw new Error("canonical semantic carrier has invalid metadata");
    argumentsList.push(JSON.stringify(metadata.value));
  }
  const carrier = operations.carrier(contract.carrier, contract);
  return argumentsList.length === 0 ? carrier : `${carrier}<${argumentsList.join(", ")}>`;
}

function renderPointer(contract, operations) {
  if (!new Set(["aggregate", "slot"]).has(contract.representation)) {
    throw new Error(`canonical semantic pointer has unknown representation '${contract.representation}'`);
  }
  const element = renderCanonicalType(contract.element, operations);
  return `${operations.pointerCarrier(contract.representation, contract)}<${element}>`;
}

function renderStruct(contract, operations) {
  const fields = requireArray(contract.fields, "canonical semantic struct fields");
  if (fields.length === 0) return "{ readonly __tsgoEmpty?: never }";
  let embeddedIndex = 0;
  let blankIndex = 0;
  const members = fields.map((field) => {
    const name = field.embedded ? `__tsgoEmbedded${embeddedIndex++}`
      : field.name === "_" ? `__tsgoBlank${blankIndex++}` : field.name;
    return `${safePropertyName(name)}: ${renderCanonicalType(field.type, operations)}`;
  });
  return `{ ${members.join("; ")} }`;
}

function renderInterface(contract, operations) {
  const methods = requireArray(contract.methods, "canonical semantic interface methods").map((method) => {
    const typeParameters = renderCanonicalTypeParameters([
      ...(method.signature.receiverTypeParameters ?? []),
      ...(method.signature.typeParameters ?? []),
    ], operations);
    const { parameters, returnType } = renderCanonicalSignature(method.signature, operations);
    return `${safePropertyName(method.name)}${typeParameters}(${parameters.join(", ")}): ${returnType}`;
  });
  const parts = [];
  if (methods.length > 0) parts.push(`{ ${methods.join("; ")} }`);
  for (const embedded of requireArray(contract.embedded, "canonical semantic interface embeddings")) {
    if (!isObject(embedded) || !new Set(["interface", "typeSet"]).has(embedded.embeddingKind)) {
      throw new Error("canonical semantic interface embedding is incomplete");
    }
    parts.push(renderCanonicalType(embedded.type, operations));
  }
  if (parts.length === 0) return contract.comparable === true ? operations.compat("GoComparable") : "unknown";
  if (parts.length === 1) return parts[0];
  return parts.map((part) => `(${part})`).join(" & ");
}

function renderFunction(signature, operations) {
  const typeParameters = renderCanonicalTypeParameters([
    ...(signature.receiverTypeParameters ?? []),
    ...(signature.typeParameters ?? []),
  ], operations);
  const { parameters, returnType } = renderCanonicalSignature(signature, operations);
  return `${typeParameters}(${parameters.join(", ")}) => ${returnType}`;
}

function renderParameter(parameter, operations) {
  const type = renderCanonicalType(parameter.type, operations);
  return parameter.variadic === true ? `...${safeIdentifier(parameter.name)}: ${type}[]` : `${safeIdentifier(parameter.name)}: ${type}`;
}

function parenthesizeComposite(contract, operations) {
  const rendered = renderCanonicalType(contract, operations);
  return contract.kind === "union" || contract.kind === "intersection" ? `(${rendered})` : rendered;
}

function renderComposite(members, kind, separator, operations) {
  const contracts = requireArray(members, `canonical semantic ${kind} members`);
  if (contracts.length === 0) throw new Error(`canonical semantic ${kind} has no members`);
  return contracts.map((member) => parenthesizeComposite(member, operations)).join(separator);
}

function uniqueParameterName(name, used) {
  const base = name === "" ? "arg" : name;
  let candidate = base;
  let index = 0;
  while (used.has(candidate)) candidate = `${base}${++index}`;
  used.add(candidate);
  return candidate;
}

function exactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`canonical semantic array length '${length}' is not an exact decimal string`);
  return length;
}

function requireContract(contract) {
  if (!isObject(contract) || typeof contract.kind !== "string" || contract.kind === "") throw new Error("canonical semantic type contract is missing");
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
