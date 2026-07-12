import { canonicalKey } from "./type-descriptors/contract.mjs";

const PRIMITIVE_APPROXIMATION_CARRIERS = new Map([
  ["boolean", ["bool"]],
  ["number", [
    "int", "int8", "int16", "int32", "int64",
    "uint", "uint8", "uint16", "uint32", "uint64", "uintptr",
    "float32", "float64",
  ]],
  ["string", ["string"]],
]);

export function canonicalizeGoTypeConstraint(descriptor, sourceConstraint, index) {
  const typeSet = unwrapEmbeddedTypeSet(descriptor);
  if (!containsApproximation(typeSet)) return typeSet;
  const text = exactConstraintText(sourceConstraint);
  const markerId = index?.goConstraintId;
  if (typeof markerId !== "string" || !markerId.includes("::")) {
    throw new Error("canonical Go type-set comparison requires one exact GoConstraint identity");
  }
  const marker = {
    t: "ref",
    id: markerId,
    args: [{ t: "literal", kind: "string", value: text }],
  };
  return composite("intersect", [marker, approximationCarrier(typeSet, index)]);
}

function exactConstraintText(sourceConstraint) {
  if (typeof sourceConstraint?.text !== "string" || sourceConstraint.text === "") {
    throw new Error("canonical Go type-set comparison requires the exact declaration constraint text");
  }
  return sourceConstraint.text;
}

function unwrapEmbeddedTypeSet(descriptor) {
  const payload = embeddedTypeSetPayload(descriptor);
  if (payload !== undefined) return unwrapEmbeddedTypeSet(payload);
  if (descriptor?.t !== "intersect") return descriptor;
  return composite("intersect", descriptor.members.map(unwrapEmbeddedTypeSet));
}

function embeddedTypeSetPayload(descriptor) {
  if (descriptor?.t !== "object" || descriptor.members.length !== 1) return undefined;
  const member = descriptor.members[0];
  if (member.kind !== "property" || !/^__tsgoEmbedded(?:0|[1-9][0-9]*)$/.test(member.name) ||
      !Array.isArray(member.modifiers) || member.modifiers.length !== 0 ||
      member.readonly !== true || member.optional !== true || member.definite === true ||
      member.missingType === true || member.unsupported !== undefined) return undefined;
  return member.type;
}

function containsApproximation(descriptor) {
  if (descriptor?.t === "goApprox") return true;
  if (descriptor?.t === "union" || descriptor?.t === "intersect") {
    return descriptor.members.some(containsApproximation);
  }
  if (descriptor?.t === "object") {
    return descriptor.members.some((member) => member.unsupported === undefined && containsApproximation(member.type));
  }
  return false;
}

function approximationCarrier(descriptor, index) {
  if (descriptor.t === "goApprox") return primitiveCarrier(descriptor.type, index) ?? descriptor.type;
  if (descriptor.t === "union" || descriptor.t === "intersect") {
    return composite(descriptor.t, descriptor.members.map((member) => approximationCarrier(member, index)));
  }
  if (descriptor.t === "object") {
    return {
      t: "object",
      members: descriptor.members.map((member) => member.unsupported
        ? member
        : { ...member, type: approximationCarrier(member.type, index) }),
    };
  }
  return descriptor;
}

function primitiveCarrier(descriptor, index) {
  for (const [keyword, names] of PRIMITIVE_APPROXIMATION_CARRIERS) {
    for (const name of names) {
      const mapped = mappedBasicDescriptor(name, index);
      if (mapped !== undefined && canonicalKey(mapped) === canonicalKey(descriptor)) return { t: "kw", kw: keyword };
    }
  }
  return undefined;
}

function mappedBasicDescriptor(name, index) {
  if (Object.hasOwn(index.primKeyword, name)) return { t: "kw", kw: index.primKeyword[name] };
  if (Object.hasOwn(index.primCore, name)) return { t: "ref", id: `${index.core}::${index.primCore[name]}`, args: [] };
  if (Object.hasOwn(index.primCompat, name)) return { t: "ref", id: `${index.compat}::${index.primCompat[name]}`, args: [] };
  return undefined;
}

function composite(kind, members) {
  const flattened = members.flatMap((member) => member.t === kind ? member.members : [member]);
  const unique = [...new Map(flattened.map((member) => [canonicalKey(member), member])).values()];
  return unique.length === 1 ? unique[0] : { t: kind, members: unique };
}
