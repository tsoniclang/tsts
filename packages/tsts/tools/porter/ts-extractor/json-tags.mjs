import ts from "typescript";
import path from "node:path";

const DEFINITION_NAME = "DefineJsonFieldNamesForGoStruct";
const ATTACHMENT_NAME = "AttachJsonFieldNamesForGoStruct";
const CONTRACT_NAME = "JsonFieldNamesForGoStructContract";

export function collectJsonTagMismatches(snapshot, sources, tsById, activeIds, options = {}) {
  const goById = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) goById.set(unit.id, unit);
  }

  const registrations = [];
  const attachments = new Set();
  const mismatches = [];
  for (const [file, text] of sources) {
    if (file.endsWith(".test.ts")) continue;
    const result = extractJsonFieldMapRegistrations(file, text, options);
    registrations.push(...result.registrations);
    for (const attachment of result.attachments) attachments.add(attachment);
    mismatches.push(...result.mismatches);
  }

  const registrationsById = new Map();
  for (const registration of registrations) {
    const rows = registrationsById.get(registration.id) ?? [];
    rows.push(registration);
    registrationsById.set(registration.id, rows);
  }

  const taggedIds = new Set();
  let taggedFields = 0;
  for (const [id, tsUnit] of tsById) {
    if (activeIds !== undefined && !activeIds.has(id)) continue;
    const goUnit = goById.get(id);
    if (goUnit?.kind !== "type") continue;
    const expected = expectedJsonFields(goUnit);
    if (expected === undefined) {
      if (registrationsById.has(id)) {
        mismatches.push(mismatch(id, tsUnit.path, "json-tag-unexpected", "TypeScript declares JSON field-tag handling for a Go type with no JSON struct tags"));
      }
      continue;
    }
    taggedIds.add(id);
    taggedFields += (goUnit.members ?? []).filter((member) => (member.tagValues ?? []).some((entry) => entry.key === "json")).length;
    const rows = registrationsById.get(id) ?? [];
    mismatches.push(...goJsonContractIssues(goUnit, expected, tsUnit.path));
    if (rows.length > 1) {
      mismatches.push(mismatch(id, rows[0].file, "json-tag-registration-duplicate", `${rows.length} JSON field-map registrations target one Go struct`));
      continue;
    }
    if (rows.length === 0) {
      mismatches.push(mismatch(id, tsUnit.path, "json-tag-unclassified", "Active Go struct JSON tags are not bound to an exact local DefineJsonFieldNamesForGoStruct contract"));
      continue;
    }
    if (rows.length === 1) {
      if (rows[0].file !== tsUnit.path) {
        mismatches.push(mismatch(id, rows[0].file, "json-tag-registration-location", `JSON field-map registration must be colocated with its @tsgo-unit in '${tsUnit.path}'`));
      }
      if (rows[0].typeName !== goUnit.name) {
        mismatches.push(mismatch(id, rows[0].file, "json-tag-type-identity", `JSON field-map generic type '${rows[0].typeName}' does not identify Go type '${goUnit.name}'`));
      }
      mismatches.push(...compareJsonFields(id, rows[0], expected));
      if (rows[0].strategy === "runtime" && !attachments.has(`${rows[0].file}::${rows[0].binding}`)) {
        mismatches.push(mismatch(id, rows[0].file, "json-tag-runtime-unattached", `Runtime JSON metadata '${rows[0].binding}' is never attached through ${ATTACHMENT_NAME} in its defining module`));
      }
    }
  }

  for (const registration of registrations) {
    if (taggedIds.has(registration.id)) continue;
    mismatches.push(mismatch(registration.id, registration.file, "json-tag-registration-orphan", "JSON field-map registration does not target an active tagged Go struct unit"));
  }
  mismatches.push(...activeAnonymousJsonTagIssues(snapshot, tsById, activeIds));

  return {
    mismatches: mismatches.sort((left, right) => left.id.localeCompare(right.id) || left.kind.localeCompare(right.kind) || left.file.localeCompare(right.file)),
    taggedUnits: taggedIds.size,
    taggedFields,
    fieldMapUnits: [...taggedIds].filter((id) => (registrationsById.get(id)?.length ?? 0) === 1).length,
    fieldMapFields: [...taggedIds].reduce((count, id) => count + (registrationsById.get(id)?.[0]?.fields.size ?? 0), 0),
    runtimeUnits: [...taggedIds].filter((id) => registrationsById.get(id)?.[0]?.strategy === "runtime").length,
    customCodecUnits: [...taggedIds].filter((id) => registrationsById.get(id)?.[0]?.strategy === "custom-codec").length,
    sourceMetadataUnits: [...taggedIds].filter((id) => registrationsById.get(id)?.[0]?.strategy === "source-metadata").length,
  };
}

function activeAnonymousJsonTagIssues(snapshot, tsById, activeIds) {
  if (activeIds === undefined) return [];
  const issues = [];
  for (const file of snapshot.files ?? []) {
    for (const member of file.structTags ?? []) {
      if (!(member.tagValues ?? []).some((entry) => entry.key === "json")) continue;
      const owner = selectActiveTagOwner(file.units ?? [], member.startLine, activeIds);
      if (owner === undefined) continue;
      const outputFile = tsById.get(owner.id)?.path ?? file.path;
      if (owner.kind !== "type") {
        issues.push(mismatch(owner.id, outputFile, "json-tag-anonymous-active", `Active ${owner.kind} '${owner.qualifiedName ?? owner.name}' contains JSON-tagged anonymous field '${member.name}'; it requires an explicit runtime or custom-codec contract instead of disappearing outside type signatures`));
      } else if (member.structDepth > 1) {
        issues.push(mismatch(owner.id, outputFile, "json-tag-nested-anonymous-active", `Active Go type '${owner.name}' contains nested anonymous JSON field '${member.name}' at struct depth ${member.structDepth}; nested metadata must be represented explicitly before generic serialization is accepted`));
      }
    }
  }
  return issues;
}

function selectActiveTagOwner(units, line, activeIds) {
  if (!Number.isInteger(line)) return undefined;
  const candidates = units.filter((unit) => activeIds.has(unit.id) && unit.startLine <= line && line <= unit.endLine);
  candidates.sort((left, right) => {
    const leftType = left.kind === "type" ? 0 : 1;
    const rightType = right.kind === "type" ? 0 : 1;
    return leftType - rightType || (left.endLine - left.startLine) - (right.endLine - right.startLine) || left.id.localeCompare(right.id);
  });
  return candidates[0];
}

export function extractJsonFieldMapRegistrations(file, text, options = {}) {
  const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const helperBindings = collectHelperBindings(sourceFile);
  const registrations = [];
  const attachments = new Set();
  const mismatches = [];
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && isJsonFieldMapType(node.type) && ts.isObjectLiteralExpression(unwrapExpression(node.initializer))) {
      mismatches.push(mismatch("", file, "json-tag-unregistered-map", "JsonFieldNameMap object literals must use DefineJsonFieldNamesForGoStruct so Porter can verify their Go unit identity"));
    }
    if (ts.isCallExpression(node) && isImportedHelperCall(file, node.expression, DEFINITION_NAME, helperBindings, options)) {
      const parsed = parseRegistration(file, sourceFile, node);
      if (parsed.registration !== undefined) registrations.push(parsed.registration);
      if (parsed.issue !== undefined) mismatches.push(mismatch(parsed.id ?? "", file, "json-tag-registration-invalid", parsed.issue));
    } else if (ts.isCallExpression(node) && terminalName(node.expression) === DEFINITION_NAME) {
      mismatches.push(mismatch("", file, "json-tag-helper-unresolved", `${DEFINITION_NAME} must resolve through an explicit ESM import, not a same-spelled local or global binding`));
    }
    if (ts.isTypeAliasDeclaration(node) && ts.isTypeReferenceNode(node.type) && isImportedContractType(file, node.type.typeName, helperBindings, options)) {
      const parsed = parseContractRegistration(file, sourceFile, node);
      if (parsed.registration !== undefined) registrations.push(parsed.registration);
      if (parsed.issue !== undefined) mismatches.push(mismatch(parsed.id ?? "", file, "json-tag-registration-invalid", parsed.issue));
    } else if (ts.isTypeAliasDeclaration(node) && ts.isTypeReferenceNode(node.type) && terminalTypeName(node.type.typeName) === CONTRACT_NAME) {
      mismatches.push(mismatch("", file, "json-tag-helper-unresolved", `${CONTRACT_NAME} must resolve through an explicit ESM type import, not a same-spelled local or global type`));
    }
    if (ts.isCallExpression(node) && isImportedHelperCall(file, node.expression, ATTACHMENT_NAME, helperBindings, options) && node.arguments.length === 2) {
      const metadata = unwrapExpression(node.arguments[1]);
      if (ts.isIdentifier(metadata)) attachments.add(`${file}::${metadata.text}`);
    } else if (ts.isCallExpression(node) && terminalName(node.expression) === ATTACHMENT_NAME && !isImportedHelperCall(file, node.expression, ATTACHMENT_NAME, helperBindings, options)) {
      mismatches.push(mismatch("", file, "json-tag-helper-unresolved", `${ATTACHMENT_NAME} must resolve through an explicit ESM import, not a same-spelled local or global binding`));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return { registrations, attachments, mismatches };
}

function collectHelperBindings(sourceFile) {
  const identifiers = new Map([[DEFINITION_NAME, new Set()], [ATTACHMENT_NAME, new Set()]]);
  const typeIdentifiers = new Map([[CONTRACT_NAME, new Set()]]);
  const namespaces = new Set();
  const typeNamespaces = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || statement.importClause === undefined) continue;
    const bindings = statement.importClause.namedBindings;
    if (bindings === undefined) continue;
    if (ts.isNamespaceImport(bindings)) {
      typeNamespaces.set(bindings.name.text, statement.moduleSpecifier.text);
      if (!statement.importClause.isTypeOnly) {
        namespaces.add(bindings.name.text);
        identifiers.set(`namespace:${bindings.name.text}`, statement.moduleSpecifier.text);
      }
      continue;
    }
    for (const element of bindings.elements) {
      const importedName = element.propertyName?.text ?? element.name.text;
      const entry = `${element.name.text}\u0000${statement.moduleSpecifier.text}`;
      const typeEntries = typeIdentifiers.get(importedName);
      if (typeEntries !== undefined) typeEntries.add(entry);
      if (!statement.importClause.isTypeOnly && !element.isTypeOnly) {
        const entries = identifiers.get(importedName);
        if (entries !== undefined) entries.add(entry);
      }
    }
  }
  return { identifiers, namespaces, typeIdentifiers, typeNamespaces };
}

function isImportedHelperCall(file, expression, exportName, bindings, options) {
  let moduleSpecifier;
  if (ts.isIdentifier(expression)) {
    const prefix = `${expression.text}\u0000`;
    const binding = [...(bindings.identifiers.get(exportName) ?? [])].find((entry) => entry.startsWith(prefix));
    moduleSpecifier = binding?.slice(prefix.length);
  } else if (ts.isPropertyAccessExpression(expression)
    && ts.isIdentifier(expression.expression)
    && bindings.namespaces.has(expression.expression.text)
    && expression.name.text === exportName) {
    moduleSpecifier = bindings.identifiers.get(`namespace:${expression.expression.text}`);
  }
  if (typeof moduleSpecifier !== "string") return false;
  const allowed = options.contractModules;
  return !Array.isArray(allowed) || allowed.length === 0 || allowed.includes(resolveImportModule(file, moduleSpecifier));
}

function isImportedContractType(file, typeName, bindings, options) {
  let moduleSpecifier;
  if (ts.isIdentifier(typeName)) {
    const prefix = `${typeName.text}\u0000`;
    const binding = [...(bindings.typeIdentifiers.get(CONTRACT_NAME) ?? [])].find((entry) => entry.startsWith(prefix));
    moduleSpecifier = binding?.slice(prefix.length);
  } else if (ts.isQualifiedName(typeName)
    && ts.isIdentifier(typeName.left)
    && typeName.right.text === CONTRACT_NAME) {
    moduleSpecifier = bindings.typeNamespaces.get(typeName.left.text);
  }
  if (typeof moduleSpecifier !== "string") return false;
  const allowed = options.contractModules;
  return !Array.isArray(allowed) || allowed.length === 0 || allowed.includes(resolveImportModule(file, moduleSpecifier));
}

function resolveImportModule(file, moduleSpecifier) {
  if (!moduleSpecifier.startsWith(".")) return moduleSpecifier;
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), moduleSpecifier));
  return resolved.endsWith(".js") ? `${resolved.slice(0, -3)}.ts` : resolved;
}

function goJsonContractIssues(goUnit, fields, file) {
  const issues = [];
  const exportedMembers = (goUnit.members ?? []).filter((member) => member.exported === true);
  for (const member of exportedMembers) {
    if (member.kind === "embeddedField") {
      issues.push(mismatch(goUnit.id, file, "json-tag-embedded-unsupported", `Embedded Go JSON field '${member.name}' requires explicit inline-field semantics before it can be classified`));
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

export function expectedJsonFields(goUnit) {
  const exportedMembers = (goUnit.members ?? []).filter((member) => member.exported === true);
  if (!exportedMembers.some((member) => (member.tagValues ?? []).some((entry) => entry.key === "json"))) return undefined;
  const members = exportedMembers.filter((member) => member.kind === "field");
  const fields = new Map();
  for (const member of members) {
    const jsonTags = (member.tagValues ?? []).filter((entry) => entry.key === "json");
    if (jsonTags.length > 1) {
      throw new Error(`${goUnit.id} field '${member.name}' has duplicate json struct-tag keys`);
    }
    const parsed = parseGoJsonTag(member.name, jsonTags[0]?.value, goZeroMode(member.typeExpr));
    fields.set(member.name, parsed);
  }
  return fields;
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

function goZeroMode(typeExpression) {
  let current = typeExpression;
  while (current?.kind === "paren") current = current.element;
  if (["pointer", "slice", "map", "interface", "func", "channel"].includes(current?.kind)) return "nil";
  if (current?.kind === "ident" && (current.name === "any" || current.name === "error")) return "nil";
  if (current?.kind === "ident" && new Set([
    "bool", "string",
    "int", "int8", "int16", "int32", "int64",
    "uint", "uint8", "uint16", "uint32", "uint64", "uintptr",
    "byte", "rune", "float32", "float64",
  ]).has(current.name)) return "value";
  if (current?.kind === "array" || current?.kind === "struct") return "deep";
  return "unknown";
}

function parseRegistration(file, sourceFile, call) {
  if (call.arguments.length !== 3) return { issue: `${DEFINITION_NAME} requires exactly a Go unit id, an object-literal field map, and a strategy object` };
  if (call.typeArguments?.length !== 1 || !ts.isTypeReferenceNode(call.typeArguments[0]) || !ts.isIdentifier(call.typeArguments[0].typeName) || call.typeArguments[0].typeArguments !== undefined) {
    return { issue: `${DEFINITION_NAME} requires exactly one unqualified local struct type argument` };
  }
  const typeName = call.typeArguments[0].typeName.text;
  const idNode = unwrapExpression(call.arguments[0]);
  const fieldsNode = unwrapExpression(call.arguments[1]);
  const strategyNode = unwrapExpression(call.arguments[2]);
  const id = ts.isStringLiteral(idNode) || ts.isNoSubstitutionTemplateLiteral(idNode) ? idNode.text : undefined;
  if (id === undefined || id.trim() === "") return { issue: `${DEFINITION_NAME} unit id must be a non-empty string literal` };
  if (!ts.isObjectLiteralExpression(fieldsNode)) return { id, issue: `${DEFINITION_NAME} field map must be an object literal` };
  const strategy = parseStrategy(strategyNode);
  if (strategy.issue !== undefined) return { id, issue: `${DEFINITION_NAME} strategy: ${strategy.issue}` };
  const declaration = call.parent;
  if (!ts.isVariableDeclaration(declaration) || !ts.isIdentifier(declaration.name)) {
    return { id, issue: `${DEFINITION_NAME} must initialize a named variable so runtime attachment can be audited` };
  }
  const fields = new Map();
  for (const property of fieldsNode.properties) {
    if (!ts.isPropertyAssignment(property)) return { id, issue: `${DEFINITION_NAME} field map supports only explicit property assignments` };
    const fieldName = propertyName(property.name);
    if (fieldName === undefined) return { id, issue: `${DEFINITION_NAME} field names must be identifiers or string literals` };
    if (fields.has(fieldName)) return { id, issue: `${DEFINITION_NAME} field '${fieldName}' is duplicated` };
    const field = parseFieldSpec(property.initializer);
    if (field.issue !== undefined) return { id, issue: `${DEFINITION_NAME} field '${fieldName}': ${field.issue}` };
    fields.set(fieldName, field.value);
  }
  return { registration: { id, file, fields, binding: declaration.name.text, typeName, strategy: strategy.strategy, reason: strategy.reason, line: sourceFile.getLineAndCharacterOfPosition(call.getStart(sourceFile)).line + 1 } };
}

function parseContractRegistration(file, sourceFile, declaration) {
  const type = declaration.type;
  const args = type.typeArguments ?? [];
  if (args.length !== 5) return { issue: `${CONTRACT_NAME} requires a local struct type, Go unit id, exact field-map type, strategy, and reason` };
  const [structType, idType, fieldsType, strategyType, reasonType] = args;
  if (!ts.isTypeReferenceNode(structType) || !ts.isIdentifier(structType.typeName) || structType.typeArguments !== undefined) {
    return { issue: `${CONTRACT_NAME} requires an unqualified local struct type as its first argument` };
  }
  const typeName = structType.typeName.text;
  const id = stringLiteralTypeValue(idType);
  if (id === undefined || id.trim() === "") return { issue: `${CONTRACT_NAME} unit id must be a non-empty string literal type` };
  if (!ts.isTypeLiteralNode(fieldsType)) return { id, issue: `${CONTRACT_NAME} field map must be a type literal` };
  const strategy = stringLiteralTypeValue(strategyType);
  const reason = stringLiteralTypeValue(reasonType);
  const strategyIssue = validateStrategy(strategy, reason, new Set(["custom-codec", "source-metadata"]));
  if (strategyIssue !== undefined) return { id, issue: `${CONTRACT_NAME} strategy: ${strategyIssue}` };
  const fields = new Map();
  for (const member of fieldsType.members) {
    if (!ts.isPropertySignature(member) || member.type === undefined || member.questionToken !== undefined) {
      return { id, issue: `${CONTRACT_NAME} field map supports only required property signatures` };
    }
    const fieldName = propertyName(member.name);
    if (fieldName === undefined) return { id, issue: `${CONTRACT_NAME} field names must be identifiers or string literals` };
    if (fields.has(fieldName)) return { id, issue: `${CONTRACT_NAME} field '${fieldName}' is duplicated` };
    const field = parseTypeFieldSpec(member.type);
    if (field.issue !== undefined) return { id, issue: `${CONTRACT_NAME} field '${fieldName}': ${field.issue}` };
    fields.set(fieldName, field.value);
  }
  return {
    registration: {
      id,
      file,
      fields,
      binding: declaration.name.text,
      typeName,
      strategy,
      reason,
      line: sourceFile.getLineAndCharacterOfPosition(declaration.getStart(sourceFile)).line + 1,
    },
  };
}

function parseStrategy(node) {
  if (!ts.isObjectLiteralExpression(node)) return { issue: "must be an object literal" };
  let strategy;
  let reason;
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) return { issue: "supports only explicit property assignments" };
    const key = propertyName(property.name);
    if (key !== "strategy" && key !== "reason") return { issue: `unknown property '${key ?? property.name.getText()}'` };
    const value = unwrapExpression(property.initializer);
    if (!ts.isStringLiteral(value) && !ts.isNoSubstitutionTemplateLiteral(value)) return { issue: `${key} must be a string literal` };
    if (key === "strategy") strategy = value.text;
    if (key === "reason") reason = value.text;
  }
  const issue = validateStrategy(strategy, reason, new Set(["runtime", "custom-codec", "source-metadata"]));
  if (issue !== undefined) return { issue };
  return { strategy, reason };
}

function validateStrategy(strategy, reason, allowed) {
  if (!allowed.has(strategy)) return allowed.has("runtime")
    ? "strategy must be 'runtime', 'custom-codec', or 'source-metadata'"
    : "strategy must be 'custom-codec' or 'source-metadata' because runtime metadata requires an attached value";
  if (typeof reason !== "string" || reason.trim().length < 40) return "reason must be a durable explanation of at least 40 characters";
  if (/\b(?:todo|tbd|fixme|phase\s*\d+|slice\s*\d+)\b/i.test(reason)) return "reason must be timeless and cannot contain planning/status placeholders";
  return undefined;
}

function parseFieldSpec(node) {
  const expression = unwrapExpression(node);
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return { value: { name: expression.text, omitZero: false, omitEmpty: false, ignored: false, options: [] } };
  }
  if (!ts.isObjectLiteralExpression(expression)) return { issue: "spec must be a string or object literal" };
  let name;
  let omitZero = false;
  let omitEmpty = false;
  let ignored = false;
  let zeroMode = "value";
  const options = [];
  const known = new Set(["name", "omitZero", "omitEmpty", "ignored", "zero", "isZero", "marshal", "unmarshal"]);
  for (const property of expression.properties) {
    if (!ts.isPropertyAssignment(property)) return { issue: "spec supports only explicit property assignments" };
    const key = propertyName(property.name);
    if (key === undefined || !known.has(key)) return { issue: `unknown or dynamic spec property '${key ?? property.name.getText()}'` };
    if (key === "marshal" || key === "unmarshal" || key === "isZero") continue;
    const value = unwrapExpression(property.initializer);
    if (key === "name") {
      if (!ts.isStringLiteral(value) && !ts.isNoSubstitutionTemplateLiteral(value)) return { issue: "name must be a string literal" };
      name = value.text;
      continue;
    }
    if (key === "zero") {
      if ((!ts.isStringLiteral(value) && !ts.isNoSubstitutionTemplateLiteral(value)) || (value.text !== "value" && value.text !== "nil")) return { issue: "zero must be 'value' or 'nil'" };
      zeroMode = value.text;
      continue;
    }
    if (value.kind !== ts.SyntaxKind.TrueKeyword && value.kind !== ts.SyntaxKind.FalseKeyword) return { issue: `${key} must be a boolean literal` };
    const enabled = value.kind === ts.SyntaxKind.TrueKeyword;
    if (key === "omitZero") omitZero = enabled;
    if (key === "omitEmpty") omitEmpty = enabled;
    if (key === "ignored") ignored = enabled;
  }
  if (typeof name !== "string") return { issue: "name is required" };
  if (omitZero) options.push("omitzero");
  if (omitEmpty) options.push("omitempty");
  const result = { name, omitZero, omitEmpty, ignored, options: options.sort() };
  if (omitZero) result.zeroMode = zeroMode;
  return { value: result };
}

function parseTypeFieldSpec(node) {
  const stringValue = stringLiteralTypeValue(node);
  if (stringValue !== undefined) {
    return { value: { name: stringValue, omitZero: false, omitEmpty: false, ignored: false, options: [] } };
  }
  if (!ts.isTypeLiteralNode(node)) return { issue: "spec must be a string literal type or object type literal" };
  let name;
  let omitZero = false;
  let omitEmpty = false;
  let ignored = false;
  let zeroMode = "value";
  const options = [];
  const known = new Set(["name", "omitZero", "omitEmpty", "ignored", "zero"]);
  for (const member of node.members) {
    if (!ts.isPropertySignature(member) || member.type === undefined || member.questionToken !== undefined) return { issue: "spec supports only required property signatures" };
    const key = propertyName(member.name);
    if (key === undefined || !known.has(key)) return { issue: `unknown or dynamic spec property '${key ?? member.name.getText()}'` };
    if (key === "name") {
      name = stringLiteralTypeValue(member.type);
      if (name === undefined) return { issue: "name must be a string literal type" };
      continue;
    }
    if (key === "zero") {
      const value = stringLiteralTypeValue(member.type);
      if (value !== "value" && value !== "nil") return { issue: "zero must be 'value' or 'nil'" };
      zeroMode = value;
      continue;
    }
    const enabled = booleanLiteralTypeValue(member.type);
    if (enabled === undefined) return { issue: `${key} must be a boolean literal type` };
    if (key === "omitZero") omitZero = enabled;
    if (key === "omitEmpty") omitEmpty = enabled;
    if (key === "ignored") ignored = enabled;
  }
  if (typeof name !== "string") return { issue: "name is required" };
  if (omitZero) options.push("omitzero");
  if (omitEmpty) options.push("omitempty");
  const result = { name, omitZero, omitEmpty, ignored, options: options.sort() };
  if (omitZero) result.zeroMode = zeroMode;
  return { value: result };
}

function compareJsonFields(id, registration, expected) {
  const mismatches = [];
  for (const [name, field] of expected) {
    const actual = registration.fields.get(name);
    if (actual === undefined) {
      mismatches.push(mismatch(id, registration.file, "json-tag-field-missing", `Go JSON field '${name}' is absent from the registered TypeScript field map`));
      continue;
    }
    if (registration.strategy === "runtime" && field.omitZero && field.zeroMode !== "value" && field.zeroMode !== "nil") {
      mismatches.push(mismatch(id, registration.file, "json-tag-zero-semantics-unsupported", `Go JSON field '${name}' has ${field.zeroMode} zero semantics; runtime metadata must not guess until Porter can prove that Go zero category`));
    }
    const compareZeroMode = registration.strategy === "runtime" && (field.zeroMode === "value" || field.zeroMode === "nil");
    const expectedField = compareZeroMode ? field : withoutZeroMode(field);
    const actualField = compareZeroMode ? actual : withoutZeroMode(actual);
    if (JSON.stringify(expectedField) !== JSON.stringify(actualField)) {
      mismatches.push(mismatch(id, registration.file, "json-tag-field-drift", `JSON field '${name}' differs: Go=${JSON.stringify(field)} TypeScript=${JSON.stringify(actual)}`));
    }
  }
  for (const name of registration.fields.keys()) {
    if (!expected.has(name)) mismatches.push(mismatch(id, registration.file, "json-tag-field-extra", `TypeScript JSON field '${name}' is not an exported Go JSON field`));
  }
  return mismatches;
}

function withoutZeroMode(field) {
  const { zeroMode: _zeroMode, ...rest } = field;
  return rest;
}

function mismatch(id, file, kind, detail) {
  return { id, file, kind, detail };
}

function isJsonFieldMapType(node) {
  if (node === undefined) return false;
  const text = node.getText().replace(/\s+/g, "");
  return text === "JsonFieldNameMap" || text.endsWith(".JsonFieldNameMap");
}

function unwrapExpression(node) {
  let current = node;
  while (current !== undefined && (ts.isAsExpression(current) || ts.isTypeAssertionExpression(current) || ts.isParenthesizedExpression(current) || ts.isSatisfiesExpression(current))) {
    current = current.expression;
  }
  return current;
}

function terminalName(expression) {
  let current = expression;
  while (ts.isPropertyAccessExpression(current)) current = current.name;
  return ts.isIdentifier(current) ? current.text : undefined;
}

function terminalTypeName(typeName) {
  let current = typeName;
  while (ts.isQualifiedName(current)) current = current.right;
  return ts.isIdentifier(current) ? current.text : undefined;
}

function stringLiteralTypeValue(node) {
  return ts.isLiteralTypeNode(node) && (ts.isStringLiteral(node.literal) || ts.isNoSubstitutionTemplateLiteral(node.literal))
    ? node.literal.text
    : undefined;
}

function booleanLiteralTypeValue(node) {
  if (!ts.isLiteralTypeNode(node)) return undefined;
  if (node.literal.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.literal.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}
