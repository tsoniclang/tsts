import { safeIdentifier, safePropertyName } from "./names.mjs";

export function renderCanonicalType(type, operations) {
  requireType(type);
  switch (type.kind) {
    case "basic":
      return operations.basic(defaultBasicName(type.basic));
    case "named":
    case "alias":
      return renderReference(type.reference, operations);
    case "typeParameter":
      return renderTypeParameter(type.typeParameter);
    case "pointer":
      return `${operations.compat("GoPtr")}<${renderCanonicalType(type.element, operations)}>`;
    case "slice":
      return `${operations.compat("GoSlice")}<${renderCanonicalType(type.element, operations)}>`;
    case "array":
      return `${operations.compat("GoArray")}<${renderCanonicalType(type.element, operations)}, ${JSON.stringify(exactArrayLength(type.length))}>`;
    case "map":
      return `${operations.compat("GoMap")}<${renderCanonicalType(type.key, operations)}, ${renderCanonicalType(type.element, operations)}>`;
    case "channel":
      return `${operations.compat("GoChan")}<${renderCanonicalType(type.element, operations)}, ${JSON.stringify(exactChannelDirection(type.direction))}>`;
    case "signature":
      return renderSignature(type.signature, operations);
    case "tuple":
      return `[${variables(type.tuple).map((variable) => renderCanonicalType(variable.type, operations)).join(", ")}]`;
    case "struct":
      return renderStruct(type.struct, operations);
    case "interface":
      return renderInterface(type.interface, operations);
    case "union":
      throw new Error("canonical Go union constraints cannot appear as a value declaration type");
    default:
      throw new Error(`unsupported canonical Go declaration type '${type.kind}'`);
  }
}

function renderReference(reference, operations) {
  if (!isObject(reference) || typeof reference.name !== "string" || reference.name === "") {
    throw new Error("canonical Go type reference is missing its name");
  }
  if (typeof reference.packagePath !== "string") throw new Error("canonical Go type reference is missing its package path");
  const argumentsList = requireArray(reference.typeArgs, "canonical Go type reference arguments")
    .map((argument) => renderCanonicalType(argument, operations));
  return operations.reference(reference, argumentsList);
}

function renderTypeParameter(reference) {
  if (!isObject(reference) || typeof reference.name !== "string" || reference.name === "") {
    throw new Error("canonical Go type parameter reference is missing its name");
  }
  return safeIdentifier(reference.name);
}

function renderSignature(signature, operations) {
  if (!isObject(signature)) throw new Error("canonical Go signature is missing");
  const input = variables(signature.parameters);
  const parameters = input.map((variable, index) => {
    const name = variable.name === "" ? `arg${index}` : safeIdentifier(variable.name);
    if (signature.variadic === true && index === input.length - 1) {
      requireType(variable.type);
      if (variable.type.kind !== "slice") throw new Error("canonical Go variadic signature does not end in a slice");
      return `...${name}: ${renderCanonicalType(variable.type.element, operations)}[]`;
    }
    return `${name}: ${renderCanonicalType(variable.type, operations)}`;
  });
  const output = variables(signature.results).map((variable) => renderCanonicalType(variable.type, operations));
  const result = output.length === 0 ? "void" : output.length === 1 ? output[0] : `[${output.join(", ")}]`;
  return `(${parameters.join(", ")}) => ${result}`;
}

function renderStruct(structure, operations) {
  if (!isObject(structure)) throw new Error("canonical Go struct is missing");
  const fields = requireArray(structure.fields, "canonical Go struct fields");
  if (fields.length === 0) return "{ readonly __tsgoEmpty?: never }";
  let embeddedIndex = 0;
  return `{ ${fields.map((field) => {
    if (!isObject(field) || !isObject(field.variable)) throw new Error("canonical Go struct field is missing its variable");
    const name = field.variable.embedded === true ? `__tsgoEmbedded${embeddedIndex++}` : safePropertyName(field.variable.name);
    return `${name}: ${renderCanonicalType(field.variable.type, operations)}`;
  }).join("; ")} }`;
}

function renderInterface(value, operations) {
  if (!isObject(value)) throw new Error("canonical Go interface is missing");
  const members = requireArray(value.completeMethods, "canonical Go interface methods").map((method) => {
    if (!isObject(method) || typeof method.name !== "string" || method.name === "") throw new Error("canonical Go interface method is missing its name");
    return `${safePropertyName(method.name)}: ${renderSignature(method.signature, operations)}`;
  });
  const parts = [];
  if (members.length > 0) parts.push(`{ ${members.join("; ")} }`);
  for (const embedded of requireArray(value.embeddedTypes, "canonical Go interface embedded types")) {
    parts.push(renderCanonicalType(embedded, operations));
  }
  if (parts.length === 0) return value.comparable === true ? operations.compat("GoComparable") : "unknown";
  return parts.length === 1 ? parts[0] : parts.map((part) => `(${part})`).join(" & ");
}

function variables(tuple) {
  if (!isObject(tuple)) throw new Error("canonical Go tuple is missing");
  return requireArray(tuple.variables, "canonical Go tuple variables");
}

function defaultBasicName(basic) {
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

function exactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`canonical Go array length '${length}' is not an exact decimal string`);
  return length;
}

function exactChannelDirection(direction) {
  if (!new Set(["bidirectional", "receive", "send"]).has(direction)) throw new Error(`canonical Go channel direction '${direction}' is invalid`);
  return direction;
}

function requireType(type) {
  if (!isObject(type) || typeof type.kind !== "string" || type.kind === "") throw new Error("canonical Go declaration type is missing");
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
