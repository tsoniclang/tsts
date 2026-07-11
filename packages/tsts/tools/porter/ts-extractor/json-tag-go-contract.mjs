import { semanticVariants } from "../core/semantic-variants.mjs";

export function taggedJsonFieldCount(goUnit) {
  return (semanticStructFields(goUnit) ?? []).filter(hasJsonTag).length;
}

export function expectedJsonFields(goUnit) {
  const fields = semanticStructFields(goUnit);
  if (fields === undefined) return undefined;
  const exported = fields.filter((field) => field.variable?.exported === true);
  if (!exported.some(hasJsonTag)) return undefined;
  const expected = new Map();
  for (const field of exported.filter((candidate) => candidate.variable?.embedded !== true)) {
    const jsonTags = (field.tagValues ?? []).filter((entry) => entry.key === "json");
    if (jsonTags.length > 1) {
      throw new Error(`${goUnit.id} field '${field.variable.name}' has duplicate json struct-tag keys`);
    }
    expected.set(
      field.variable.name,
      parseGoJsonTag(field.variable.name, jsonTags[0]?.value, goZeroMode(field.variable.type)),
    );
  }
  return expected;
}

export function goJsonContractIssues(goUnit, fields, file) {
  const issues = [];
  for (const field of semanticStructFields(goUnit) ?? []) {
    if (field.variable?.exported === true && field.variable?.embedded === true) {
      issues.push(mismatch(goUnit.id, file, "json-tag-embedded-unsupported", `Embedded Go JSON field '${field.variable.name}' requires explicit inline-field semantics before it can be classified`));
    }
  }
  const names = new Map();
  for (const [fieldName, field] of fields ?? []) {
    const unsupported = field.options.filter((option) => option !== "omitzero" && option !== "omitempty");
    for (const option of unsupported) {
      issues.push(mismatch(goUnit.id, file, "json-tag-option-unsupported", `Go JSON field '${fieldName}' uses unsupported option '${option}'`));
    }
    if (field.ignored) continue;
    const prior = names.get(field.name);
    if (prior !== undefined) {
      issues.push(mismatch(goUnit.id, file, "json-tag-name-duplicate", `Go JSON fields '${prior}' and '${fieldName}' both resolve to '${field.name}'`));
    } else {
      names.set(field.name, fieldName);
    }
  }
  return issues;
}

export function activeAnonymousJsonTagIssues(snapshot, tsById, activeIds) {
  if (activeIds === undefined) return [];
  const issues = [];
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!activeIds.has(unit.id)) continue;
      const outputFile = tsById.get(unit.id)?.path ?? file.path;
      for (const field of declarationJsonTaggedFields(unit)) {
        if (unit.kind !== "type") {
          issues.push(mismatch(unit.id, outputFile, "json-tag-anonymous-active", `Active ${unit.kind} '${unit.qualifiedName ?? unit.name}' contains JSON-tagged anonymous field '${field.name}'; it requires an explicit runtime or custom-codec contract instead of disappearing outside type signatures`));
        } else if (field.depth > 1) {
          issues.push(mismatch(unit.id, outputFile, "json-tag-nested-anonymous-active", `Active Go type '${unit.name}' contains nested anonymous JSON field '${field.name}' at struct depth ${field.depth}; nested metadata must be represented explicitly before generic serialization is accepted`));
        }
      }
    }
  }
  return issues;
}

export function parseGoJsonTag(fieldName, jsonTag, zeroMode = "value") {
  if (jsonTag === undefined) return { name: fieldName, omitZero: false, omitEmpty: false, ignored: false, options: [] };
  const [rawName = "", ...options] = jsonTag.split(",");
  if (rawName === "-") return { name: "", omitZero: false, omitEmpty: false, ignored: true, options: options.sort() };
  const result = {
    name: rawName === "" ? fieldName : rawName,
    omitZero: options.includes("omitzero"),
    omitEmpty: options.includes("omitempty"),
    ignored: false,
    options: [...options].filter(Boolean).sort(),
  };
  if (result.omitZero) result.zeroMode = zeroMode;
  return result;
}

function semanticStructFields(goUnit) {
  const variants = semanticVariants(goUnit);
  const rows = variants.map((variant) => variant?.type?.rhs?.kind === "struct" ? variant.type.rhs.struct?.fields ?? [] : undefined);
  if (rows.length === 0 || rows.some((fields) => fields === undefined)) return undefined;
  const canonical = JSON.stringify(rows[0]);
  if (rows.some((fields) => JSON.stringify(fields) !== canonical)) {
    throw new Error(`${goUnit.id} has profile-dependent JSON struct fields`);
  }
  return rows[0];
}

function hasJsonTag(field) {
  return (field.tagValues ?? []).some((entry) => entry.key === "json");
}

function goZeroMode(type) {
  if (type === undefined) return "unknown";
  if (["pointer", "slice", "map", "interface", "signature", "channel"].includes(type.kind)) return "nil";
  if (type.kind === "basic") return "value";
  if (type.kind === "array" || type.kind === "struct") return "deep";
  return "unknown";
}

function declarationJsonTaggedFields(unit) {
  const output = [];
  const visitMember = (member, depth) => {
    if ((member.tagValues ?? []).some((entry) => entry.key === "json")) output.push({ name: member.name, depth });
    visitType(member.typeExpr, depth);
  };
  const visitType = (type, parentDepth) => {
    if (type === undefined || type === null) return;
    if (type.kind === "struct") {
      const depth = parentDepth + 1;
      for (const member of type.members ?? []) visitMember(member, depth);
      return;
    }
    for (const key of ["element", "key", "value", "left", "right"]) visitType(type[key], parentDepth);
    for (const argument of type.typeArgs ?? []) visitType(argument, parentDepth);
    for (const parameter of [...(type.parameters ?? []), ...(type.results ?? [])]) visitType(parameter.type, parentDepth);
  };

  if ((unit.members?.length ?? 0) > 0) {
    for (const member of unit.members) visitMember(member, 1);
  } else {
    visitType(unit.typeExpression, 0);
  }
  visitType(unit.receiverType, 0);
  for (const parameter of [...(unit.parameters ?? []), ...(unit.results ?? [])]) visitType(parameter.type, 0);
  for (const specification of unit.valueSpecs ?? []) visitType(specification.type, 0);
  return output;
}

function mismatch(id, file, kind, detail) {
  return { id, file, kind, detail };
}
