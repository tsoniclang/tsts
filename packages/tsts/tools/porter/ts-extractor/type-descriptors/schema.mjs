const DESCRIPTOR_KEYS = new Map([
  ["ref", ["t", "id", "args"]],
  ["array", ["t", "element"]],
  ["tuple", ["t", "elements"]],
  ["namedTuple", ["t", "name", "rest", "optional", "type"]],
  ["optional", ["t", "type"]],
  ["rest", ["t", "type"]],
  ["union", ["t", "members"]],
  ["intersect", ["t", "members"]],
  ["fn", ["t", "params", "ret", "missingReturnType", "returnTypePolicy", "typeParams", "signatureModifiers"]],
  ["constructor", ["t", "params", "ret", "missingReturnType", "returnTypePolicy", "typeParams", "signatureModifiers"]],
  ["object", ["t", "members"]],
  ["kw", ["t", "kw"]],
  ["tp", ["t", "depth", "index"]],
  ["literal", ["t", "kind", "value"]],
  ["predicate", ["t", "asserts", "subject", "type"]],
  ["query", ["t", "id", "args"]],
  ["conditional", ["t", "check", "extends", "trueType", "falseType"]],
  ["infer", ["t", "parameter"]],
  ["this", ["t"]],
  ["operator", ["t", "operator", "type"]],
  ["indexed", ["t", "object", "index"]],
  ["mapped", ["t", "readonly", "optional", "typeParam", "nameType", "valueType", "missingValueType", "members"]],
  ["template", ["t", "head", "spans"]],
  ["import", ["t", "typeOf", "module", "argument", "qualifier", "args", "attributes"]],
  ["conv", ["t", "token"]],
  ["goApprox", ["t", "type"]],
  ["unsupported", ["t", "kind", "text"]],
]);

const TYPE_PARAMETER_KEYS = new Set(["binding", "name", "modifiers", "constraint", "default", "invalidConstraint"]);
const TYPE_PARAMETER_MODIFIER_KEYS = new Set(["const", "variance", "unsupported"]);
const PARAMETER_KEYS = new Set([
  "name", "role", "modifiers", "type", "rest", "optional", "optionalSyntax", "question", "missingType",
  "initializerStatus", "initializer", "initializerIssue",
]);
const MEMBER_KEYS = new Set(["kind", "name", "modifiers", "type", "optional", "definite", "readonly", "missingType", "unsupported", "text"]);

export const isCurrentDescriptorKind = (kind) => DESCRIPTOR_KEYS.has(kind) && kind !== "unsupported";

export function descriptorShapeIssue(descriptor) {
  if (!isRecord(descriptor) || typeof descriptor.t !== "string") return "descriptor must be an object with a string t discriminator";
  const allowed = DESCRIPTOR_KEYS.get(descriptor.t);
  if (allowed === undefined) return `unknown descriptor kind '${descriptor.t}'`;
  const unknown = unknownKeys(descriptor, new Set(allowed));
  if (unknown.length > 0) return `${descriptor.t} descriptor has unknown key(s): ${unknown.join(", ")}`;
  switch (descriptor.t) {
    case "ref": case "query":
      return stringField(descriptor, "id") ?? arrayField(descriptor, "args");
    case "array": return recordField(descriptor, "element");
    case "tuple": return arrayField(descriptor, "elements");
    case "namedTuple":
      return stringField(descriptor, "name") ?? booleanField(descriptor, "rest") ?? booleanField(descriptor, "optional") ?? recordField(descriptor, "type");
    case "optional": case "rest": case "operator": case "goApprox":
      return recordField(descriptor, "type");
    case "union": case "intersect":
      return arrayField(descriptor, "members");
    case "fn": case "constructor":
      return callableIssue(descriptor);
    case "object":
      return memberArrayIssue(descriptor.members, "object.members");
    case "kw": return stringField(descriptor, "kw");
    case "tp":
      return integerField(descriptor, "depth") ?? integerField(descriptor, "index");
    case "literal":
      return literalIssue(descriptor);
    case "predicate":
      return booleanField(descriptor, "asserts") ?? predicateSubjectIssue(descriptor.subject) ?? nullableRecordField(descriptor, "type");
    case "conditional":
      return recordField(descriptor, "check") ?? recordField(descriptor, "extends") ?? recordField(descriptor, "trueType") ?? recordField(descriptor, "falseType");
    case "infer": return typeParameterIssue(descriptor.parameter, "infer.parameter");
    case "this": return undefined;
    case "indexed": return recordField(descriptor, "object") ?? recordField(descriptor, "index");
    case "mapped":
      return mappedIssue(descriptor);
    case "template":
      return templateIssue(descriptor);
    case "import":
      return importIssue(descriptor);
    case "conv": return stringField(descriptor, "token");
    case "unsupported": return stringField(descriptor, "kind") ?? stringField(descriptor, "text");
    default: return `unvalidated descriptor kind '${descriptor.t}'`;
  }
}

function callableIssue(descriptor) {
  const missing = missingKeys(descriptor, DESCRIPTOR_KEYS.get(descriptor.t));
  if (missing.length > 0) return `${descriptor.t} descriptor is missing key(s): ${missing.join(", ")}`;
  const params = arrayField(descriptor, "params");
  if (params) return params;
  for (const [index, parameter] of descriptor.params.entries()) {
    const issue = parameterIssue(parameter, `params[${index}]`);
    if (issue) return issue;
  }
  const ret = recordField(descriptor, "ret");
  if (ret) return ret;
  if (typeof descriptor.missingReturnType !== "boolean") return "missingReturnType must be boolean";
  if (!new Set(["required", "forbidden"]).has(descriptor.returnTypePolicy)) return "returnTypePolicy must be required or forbidden";
  if (!Array.isArray(descriptor.typeParams)) return "typeParams must be an array";
  for (const [index, parameter] of descriptor.typeParams.entries()) {
    const issue = typeParameterIssue(parameter, `typeParams[${index}]`);
    if (issue) return issue;
  }
  return stringArrayIssue(descriptor.signatureModifiers, "signatureModifiers");
}

function parameterIssue(parameter, label) {
  if (!isRecord(parameter)) return `${label} must be an object`;
  const unknown = unknownKeys(parameter, PARAMETER_KEYS);
  if (unknown.length > 0) return `${label} has unknown key(s): ${unknown.join(", ")}`;
  const missing = missingKeys(parameter, PARAMETER_KEYS);
  if (missing.length > 0) return `${label} is missing key(s): ${missing.join(", ")}`;
  if (typeof parameter.name !== "string") return `${label}.name must be a string`;
  if (!new Set(["parameter", "this", "parameter-property"]).has(parameter.role)) return `${label}.role is invalid`;
  if (!Array.isArray(parameter.modifiers) || parameter.modifiers.some((modifier) => typeof modifier !== "string")) return `${label}.modifiers must be a string array`;
  if (!isRecord(parameter.type)) return `${label}.type must be an object`;
  if (typeof parameter.rest !== "boolean") return `${label}.rest must be boolean`;
  if (typeof parameter.optional !== "boolean") return `${label}.optional must be boolean`;
  if (!new Set(["required", "question", "initializer", "question+initializer"]).has(parameter.optionalSyntax)) return `${label}.optionalSyntax is invalid`;
  if (typeof parameter.question !== "boolean") return `${label}.question must be boolean`;
  if (typeof parameter.missingType !== "boolean") return `${label}.missingType must be boolean`;
  if (!new Set(["known", "missing", "unsupported"]).has(parameter.initializerStatus)) return `${label}.initializerStatus is invalid`;
  if (parameter.initializer !== undefined) {
    const issue = constantValueIssue(parameter.initializer, `${label}.initializer`);
    if (issue) return issue;
  }
  if (parameter.initializerIssue !== undefined && typeof parameter.initializerIssue !== "string") return `${label}.initializerIssue must be a string when present`;
  return undefined;
}

function typeParameterIssue(parameter, label) {
  if (!isRecord(parameter)) return `${label} must be an object`;
  const unknown = unknownKeys(parameter, TYPE_PARAMETER_KEYS);
  if (unknown.length > 0) return `${label} has unknown key(s): ${unknown.join(", ")}`;
  const missing = missingKeys(parameter, TYPE_PARAMETER_KEYS);
  if (missing.length > 0) return `${label} is missing key(s): ${missing.join(", ")}`;
  if (!isRecord(parameter.binding) || unknownKeys(parameter.binding, new Set(["depth", "index"])).length > 0 ||
      !Number.isInteger(parameter.binding.depth) || !Number.isInteger(parameter.binding.index)) return `${label}.binding must contain exact integer depth and index`;
  if (typeof parameter.name !== "string") return `${label}.name must be a string`;
  if (!isRecord(parameter.modifiers) || unknownKeys(parameter.modifiers, TYPE_PARAMETER_MODIFIER_KEYS).length > 0 ||
      typeof parameter.modifiers.const !== "boolean" || !new Set([null, "in", "out", "inout"]).has(parameter.modifiers.variance) ||
      !Array.isArray(parameter.modifiers.unsupported) || parameter.modifiers.unsupported.some((modifier) => typeof modifier !== "string")) {
    return `${label}.modifiers must contain exact const, variance, and unsupported fields`;
  }
  if (parameter.constraint !== null && !isRecord(parameter.constraint)) return `${label}.constraint must be a descriptor or null`;
  if (parameter.default !== null && !isRecord(parameter.default)) return `${label}.default must be a descriptor or null`;
  if (parameter.invalidConstraint !== undefined && parameter.invalidConstraint !== null && !isRecord(parameter.invalidConstraint)) return `${label}.invalidConstraint must be a descriptor or null`;
  return undefined;
}

function memberArrayIssue(members, label) {
  if (!Array.isArray(members)) return `${label} must be an array`;
  for (const [index, member] of members.entries()) {
    if (!isRecord(member)) return `${label}[${index}] must be an object`;
    const unknown = unknownKeys(member, MEMBER_KEYS);
    if (unknown.length > 0) return `${label}[${index}] has unknown key(s): ${unknown.join(", ")}`;
    if (typeof member.name !== "string") return `${label}[${index}].name must be a string`;
    if (member.kind !== undefined && typeof member.kind !== "string") return `${label}[${index}].kind must be a string when present`;
    if (member.modifiers !== undefined && (!Array.isArray(member.modifiers) || member.modifiers.some((modifier) => typeof modifier !== "string"))) return `${label}[${index}].modifiers must be a string array`;
    for (const key of ["readonly", "optional", "definite", "missingType"]) if (member[key] !== undefined && typeof member[key] !== "boolean") return `${label}[${index}].${key} must be boolean when present`;
    if (member.unsupported !== undefined) {
      if (typeof member.unsupported !== "string" || typeof member.text !== "string") return `${label}[${index}] unsupported members require string unsupported and text fields`;
    } else if (!isRecord(member.type)) return `${label}[${index}].type must be a descriptor`;
  }
  return undefined;
}

function literalIssue(descriptor) {
  if (!new Set(["string", "number", "bigint", "boolean", "null"]).has(descriptor.kind)) return "literal.kind is invalid";
  if (descriptor.kind === "null") return descriptor.value === null ? undefined : "null literal value must be null";
  if (descriptor.kind === "boolean") return typeof descriptor.value === "boolean" ? undefined : "boolean literal value must be boolean";
  return typeof descriptor.value === "string" ? undefined : `${descriptor.kind} literal value must be canonical text`;
}

function predicateSubjectIssue(subject) {
  if (!isRecord(subject) || typeof subject.kind !== "string") return "predicate.subject must be an object with a kind";
  const keys = subject.kind === "this" ? new Set(["kind"]) : subject.kind === "parameter" ? new Set(["kind", "index"]) : new Set(["kind", "name", "nodeKind"]);
  const unknown = unknownKeys(subject, keys);
  if (unknown.length > 0) return `predicate.subject has unknown key(s): ${unknown.join(", ")}`;
  if (subject.kind === "this") return undefined;
  if (subject.kind === "parameter") return Number.isInteger(subject.index) ? undefined : "predicate parameter subject requires integer index";
  if (subject.kind === "unresolved") return typeof subject.name === "string" ? undefined : "unresolved predicate subject requires name";
  if (subject.kind === "unsupported") return typeof subject.nodeKind === "string" ? undefined : "unsupported predicate subject requires nodeKind";
  return `unknown predicate subject kind '${subject.kind}'`;
}

function mappedIssue(descriptor) {
  if (!new Set(["preserve", "add", "remove"]).has(descriptor.readonly)) return "mapped.readonly is invalid";
  if (!new Set(["preserve", "add", "remove"]).has(descriptor.optional)) return "mapped.optional is invalid";
  return typeParameterIssue(descriptor.typeParam, "mapped.typeParam") ?? nullableRecordField(descriptor, "nameType") ??
    nullableRecordField(descriptor, "valueType") ?? booleanField(descriptor, "missingValueType") ?? memberArrayIssue(descriptor.members, "mapped.members");
}

function templateIssue(descriptor) {
  if (typeof descriptor.head !== "string" || !Array.isArray(descriptor.spans)) return "template requires string head and spans array";
  for (const [index, span] of descriptor.spans.entries()) {
    if (!isRecord(span) || unknownKeys(span, new Set(["type", "literal"])).length > 0 || !isRecord(span.type) || typeof span.literal !== "string") {
      return `template.spans[${index}] must contain exact type and literal fields`;
    }
  }
  return undefined;
}

function importIssue(descriptor) {
  if (typeof descriptor.typeOf !== "boolean") return "import.typeOf must be boolean";
  if (descriptor.module !== null && typeof descriptor.module !== "string") return "import.module must be a string or null";
  if (!isRecord(descriptor.argument)) return "import.argument must be a descriptor";
  if (!Array.isArray(descriptor.qualifier) || descriptor.qualifier.some((part) => typeof part !== "string")) return "import.qualifier must be a string array";
  if (!Array.isArray(descriptor.args)) return "import.args must be an array";
  if (descriptor.attributes === null) return undefined;
  const attributes = descriptor.attributes;
  if (!isRecord(attributes) || unknownKeys(attributes, new Set(["token", "entries"])).length > 0 ||
      !new Set(["with", "assert"]).has(attributes.token) || !Array.isArray(attributes.entries)) return "import.attributes has invalid shape";
  for (const [index, entry] of attributes.entries.entries()) {
    if (!isRecord(entry) || unknownKeys(entry, new Set(["name", "value"])).length > 0 || typeof entry.name !== "string" || !isRecord(entry.value)) {
      return `import.attributes.entries[${index}] has invalid shape`;
    }
  }
  return undefined;
}

function constantValueIssue(value, label) {
  if (!isRecord(value) || unknownKeys(value, new Set(["kind", "value"])).length > 0 || typeof value.kind !== "string") return `${label} has invalid constant shape`;
  if (value.kind === "undefined") return value.value === undefined ? undefined : `${label} undefined value must be absent`;
  if (value.kind === "null") return value.value === null ? undefined : `${label} null value must be null`;
  if (value.kind === "boolean") return typeof value.value === "boolean" ? undefined : `${label} boolean value must be boolean`;
  return typeof value.value === "string" ? undefined : `${label} scalar value must be canonical text`;
}

const isRecord = (value) => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return false;
  return Reflect.ownKeys(value).every((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key === "string" && descriptor?.enumerable === true && "value" in descriptor;
  });
};
const unknownKeys = (value, allowed) => Reflect.ownKeys(value).filter((key) => typeof key !== "string" || !allowed.has(key)).map(String).sort();
const missingKeys = (value, required) => [...required].filter((key) => !Object.hasOwn(value, key)).sort();
const stringField = (value, key) => typeof value[key] === "string" ? undefined : `${key} must be a string`;
const booleanField = (value, key) => typeof value[key] === "boolean" ? undefined : `${key} must be boolean`;
const integerField = (value, key) => Number.isInteger(value[key]) ? undefined : `${key} must be an integer`;
const arrayField = (value, key) => Array.isArray(value[key]) ? undefined : `${key} must be an array`;
const recordField = (value, key) => isRecord(value[key]) ? undefined : `${key} must be an object`;
const nullableRecordField = (value, key) => value[key] === null || isRecord(value[key]) ? undefined : `${key} must be an object or null`;
const stringArrayIssue = (value, label) => Array.isArray(value) && value.every((entry) => typeof entry === "string") ? undefined : `${label} must be a string array`;
