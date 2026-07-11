import { compareText } from "../../core/deterministic-order.mjs";
import { descriptorShapeIssue, isCurrentDescriptorKind } from "./schema.mjs";

export function canonicalKey(descriptor) {
  if (descriptorHasUnsupported(descriptor)) return JSON.stringify(["invalidDescriptor", descriptor]);
  return JSON.stringify(descriptorForm(descriptor, (identity) => identity));
}

function descriptorForm(descriptor, canonicalIdentity) {
  if (!descriptor || typeof descriptor !== "object") return ["invalid", descriptor];
  const form = (value) => descriptorForm(value, canonicalIdentity);
  const typeParameter = (parameter) => [parameter.binding, parameter.modifiers, parameter.constraint ? form(parameter.constraint) : null,
    parameter.default ? form(parameter.default) : null, parameter.invalidConstraint];
  const parameter = (value) => [value.name, value.role, value.rest, value.optional, value.optionalSyntax, value.question,
    value.missingType, value.modifiers, value.initializerStatus, value.initializer, value.initializerIssue, form(value.type)];
  switch (descriptor.t) {
    case "ref": return ["ref", canonicalIdentity(descriptor.id), descriptor.args.map(form)];
    case "array": return ["array", form(descriptor.element)];
    case "tuple": return ["tuple", descriptor.elements.map(form)];
    case "namedTuple": return ["namedTuple", descriptor.name, !!descriptor.rest, !!descriptor.optional, form(descriptor.type)];
    case "optional": case "rest": return [descriptor.t, form(descriptor.type)];
    case "union": case "intersect": return [descriptor.t, flattenCompositeMembers(descriptor, descriptor.t).map(form).sort(compareForms)];
    case "fn": case "constructor": return [descriptor.t, descriptor.typeParams.map(typeParameter), descriptor.params.map(parameter),
      form(descriptor.ret), descriptor.missingReturnType, descriptor.returnTypePolicy, descriptor.signatureModifiers];
    case "object": return ["object", objectMemberForms(descriptor, form)];
    case "kw": return ["keyword", descriptor.kw];
    case "tp": return Number.isInteger(descriptor.depth) && Number.isInteger(descriptor.index)
      ? ["typeParameter", descriptor.depth, descriptor.index] : ["invalidTypeParameter", descriptor];
    case "literal": return ["literal", descriptor.kind, descriptor.value];
    case "predicate": return ["predicate", !!descriptor.asserts, descriptor.subject, descriptor.type ? form(descriptor.type) : null];
    case "query": return ["query", canonicalIdentity(descriptor.id), descriptor.args.map(form)];
    case "conditional": return ["conditional", form(descriptor.check), form(descriptor.extends), form(descriptor.trueType), form(descriptor.falseType)];
    case "infer": return ["infer", typeParameter(descriptor.parameter)];
    case "this": return ["this"];
    case "operator": return ["operator", descriptor.operator, form(descriptor.type)];
    case "indexed": return ["indexed", form(descriptor.object), form(descriptor.index)];
    case "mapped": return ["mapped", descriptor.readonly, descriptor.optional, typeParameter(descriptor.typeParam),
      descriptor.nameType ? form(descriptor.nameType) : null, descriptor.valueType ? form(descriptor.valueType) : null,
      !!descriptor.missingValueType, objectMemberForms({ members: descriptor.members }, form)];
    case "template": return ["template", descriptor.head, descriptor.spans.map((span) => [form(span.type), span.literal])];
    case "import": return ["import", !!descriptor.typeOf, descriptor.module, form(descriptor.argument), descriptor.qualifier,
      descriptor.args.map(form), descriptor.attributes === null ? null : [descriptor.attributes.token,
        descriptor.attributes.entries.map((entry) => [entry.name, form(entry.value)])]];
    case "conv": return ["convention", descriptor.token];
    case "goApprox": return ["goApprox", form(descriptor.type)];
    case "unsupported": return ["unsupported", descriptor.kind, descriptor.text];
    default: return ["schemaUnknownDescriptor", descriptor.t, JSON.stringify(descriptor)];
  }
}

function objectMemberForms(descriptor, form) {
  const groups = new Map();
  for (const member of descriptor.members ?? []) {
    const key = `${member.kind ?? "property"}:${member.name}`;
    const entries = groups.get(key) ?? [];
    entries.push(member.unsupported
      ? ["unsupported", member.unsupported, member.text ?? ""]
      : [member.modifiers ?? [], !!member.readonly, !!member.optional, !!member.definite, !!member.missingType, form(member.type)]);
    groups.set(key, entries);
  }
  return [...groups].sort(([left], [right]) => compareText(left, right));
}

const compareForms = (left, right) => compareText(JSON.stringify(left), JSON.stringify(right));

export function typesEqual(left, right, canonicalIdentity = (identity) => identity) {
  return !descriptorHasUnsupported(left) && !descriptorHasUnsupported(right) &&
    JSON.stringify(descriptorForm(left, canonicalIdentity)) === JSON.stringify(descriptorForm(right, canonicalIdentity));
}

function descriptorHasUnsupported(descriptor) {
  if (descriptorShapeIssue(descriptor) !== undefined || descriptor.t === "unsupported" || !isCurrentDescriptorKind(descriptor.t)) return true;
  if (descriptor.t === "tp" && (!Number.isInteger(descriptor.depth) || !Number.isInteger(descriptor.index))) return true;
  if ((descriptor.t === "fn" || descriptor.t === "constructor") &&
      (descriptor.typeParams.some(invalidTypeParameter) || descriptor.params.some(invalidParameter))) return true;
  if (descriptor.t === "predicate" && descriptor.subject?.kind === "unsupported") return true;
  if (descriptor.t === "mapped" && (descriptor.readonly.startsWith("unsupported:") || descriptor.optional.startsWith("unsupported:"))) return true;
  if (typeParametersOf(descriptor).some(invalidTypeParameter)) return true;
  if (descriptor.t === "import" && descriptor.attributes !== null &&
      (!new Set(["with", "assert"]).has(descriptor.attributes.token) ||
        descriptor.attributes.entries.some((entry) => typeof entry.name !== "string"))) return true;
  if ((descriptor.members ?? []).some((member) => member.unsupported)) return true;
  return typeDescriptorChildren(descriptor).some(descriptorHasUnsupported);
}

function invalidTypeParameter(parameter) {
  return !parameter || !Number.isInteger(parameter.binding?.depth) || !Number.isInteger(parameter.binding?.index) ||
    typeof parameter.modifiers?.const !== "boolean" || !new Set([null, "in", "out", "inout"]).has(parameter.modifiers?.variance) ||
    !Array.isArray(parameter.modifiers?.unsupported) || parameter.modifiers.unsupported.length > 0 || !!parameter.invalidConstraint;
}

function invalidParameter(parameter) {
  return !parameter || !new Set(["parameter", "this", "parameter-property"]).has(parameter.role) ||
    !new Set(["required", "question", "initializer", "question+initializer"]).has(parameter.optionalSyntax) ||
    !Array.isArray(parameter.modifiers);
}

export function hasUnresolved(descriptor) {
  if (descriptorHasUnsupported(descriptor)) return true;
  if ((descriptor.t === "ref" || descriptor.t === "query") && isSoftId(descriptor.id)) return true;
  if (descriptor.t === "predicate" && descriptor.subject?.kind === "unresolved") return true;
  if (descriptor.t === "import" && descriptor.module === null) return true;
  return typeDescriptorChildren(descriptor).some(hasUnresolved);
}

export function typeDescriptorChildren(descriptor) {
  switch (descriptor.t) {
    case "ref": return descriptor.args;
    case "array": return [descriptor.element];
    case "tuple": return descriptor.elements;
    case "namedTuple": case "optional": case "rest": case "operator": case "goApprox": return [descriptor.type];
    case "union": case "intersect": return descriptor.members;
    case "fn": case "constructor": return [...typeParameterTypes(descriptor.typeParams), ...descriptor.params.map((parameter) => parameter.type), descriptor.ret];
    case "object": return memberTypes(descriptor.members);
    case "predicate": return descriptor.type ? [descriptor.type] : [];
    case "query": return descriptor.args;
    case "conditional": return [descriptor.check, descriptor.extends, descriptor.trueType, descriptor.falseType];
    case "infer": return typeParameterTypes([descriptor.parameter]);
    case "indexed": return [descriptor.object, descriptor.index];
    case "mapped": return [...typeParameterTypes([descriptor.typeParam]), descriptor.nameType, descriptor.valueType, ...memberTypes(descriptor.members)].filter(Boolean);
    case "template": return descriptor.spans.map((span) => span.type);
    case "import": return [descriptor.argument, ...descriptor.args, ...(descriptor.attributes?.entries ?? []).map((entry) => entry.value)];
    default: return [];
  }
}

function memberTypes(members = []) {
  return members.filter((member) => !member.unsupported && member.type).map((member) => member.type);
}

function typeParametersOf(descriptor) {
  if (descriptor.t === "fn" || descriptor.t === "constructor") return descriptor.typeParams;
  if (descriptor.t === "infer") return [descriptor.parameter];
  if (descriptor.t === "mapped") return [descriptor.typeParam];
  return [];
}

function typeParameterTypes(parameters = []) {
  return parameters.flatMap((parameter) => [parameter.constraint, parameter.default, parameter.invalidConstraint].filter(Boolean));
}

function flattenCompositeMembers(descriptor, kind) {
  return descriptor.members.flatMap((member) => member.t === kind ? flattenCompositeMembers(member, kind) : [member]);
}

export const isSoftId = (identity) => identity.startsWith("global::") || identity.startsWith("name::") ||
  identity.startsWith("unresolved::") || identity.startsWith("unresolved-value::");
