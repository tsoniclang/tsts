import { compareText } from "../core/deterministic-order.mjs";
import { parseTypeScriptModule } from "./module-index.mjs";
import { resolveModuleId, sliceText } from "./source-structure.mjs";
import {
  activeAnonymousJsonTagIssues,
  expectedJsonFields,
  goJsonContractIssues,
  parseGoJsonTag,
  taggedJsonFieldCount,
} from "./json-tag-go-contract.mjs";

export { expectedJsonFields, parseGoJsonTag };

const CONTRACT_NAME = "JsonFieldNamesForGoStructContract";

export function collectJsonTagMismatches(snapshot, sources, tsById, activeIds, options = {}) {
  const goById = new Map();
  for (const file of snapshot.files ?? []) for (const unit of file.units ?? []) goById.set(unit.id, unit);
  const contracts = [];
  const mismatches = [];
  for (const [file, text] of sources) {
    if (file.endsWith(".test.ts")) continue;
    const extracted = extractJsonFieldContractDeclarations(file, text, options);
    contracts.push(...extracted.contracts);
    mismatches.push(...extracted.mismatches);
  }

  const contractsById = new Map();
  for (const contract of contracts) {
    const rows = contractsById.get(contract.id) ?? [];
    rows.push(contract);
    contractsById.set(contract.id, rows);
  }

  const taggedIds = new Set();
  let taggedFields = 0;
  for (const [id, tsUnit] of tsById) {
    if (activeIds !== undefined && !activeIds.has(id)) continue;
    const goUnit = goById.get(id);
    if (goUnit?.kind !== "type") continue;
    const expected = expectedJsonFields(goUnit);
    const rows = contractsById.get(id) ?? [];
    if (expected === undefined) {
      if (rows.length > 0) mismatches.push(mismatch(id, rows[0].file, "json-tag-unexpected", "TypeScript declares a JSON field contract for a Go type with no JSON struct tags"));
      continue;
    }
    taggedIds.add(id);
    taggedFields += taggedJsonFieldCount(goUnit);
    mismatches.push(...goJsonContractIssues(goUnit, expected, tsUnit.path));
    if (rows.length === 0) {
      mismatches.push(mismatch(id, tsUnit.path, "json-tag-unclassified", `Active Go struct JSON tags require one colocated ${CONTRACT_NAME} declaration`));
      continue;
    }
    if (rows.length > 1) {
      mismatches.push(mismatch(id, rows[0].file, "json-tag-contract-duplicate", `${rows.length} declaration contracts target one Go struct`));
      continue;
    }
    const [contract] = rows;
    if (contract.file !== tsUnit.path) mismatches.push(mismatch(id, contract.file, "json-tag-contract-location", `JSON field contract must be colocated with its @tsgo-unit in '${tsUnit.path}'`));
    if (contract.typeName !== goUnit.name) mismatches.push(mismatch(id, contract.file, "json-tag-type-identity", `JSON field contract type '${contract.typeName}' does not identify Go type '${goUnit.name}'`));
    mismatches.push(...compareJsonFields(id, contract, expected));
  }

  for (const contract of contracts) {
    if (!taggedIds.has(contract.id)) mismatches.push(mismatch(contract.id, contract.file, "json-tag-contract-orphan", "JSON field contract does not target an active tagged Go struct unit"));
  }
  mismatches.push(...activeAnonymousJsonTagIssues(snapshot, tsById, activeIds));

  const completeContracts = [...taggedIds].flatMap((id) => contractsById.get(id) ?? []).filter((row) => (contractsById.get(row.id)?.length ?? 0) === 1);
  return {
    mismatches: mismatches.sort((left, right) => compareText(left.id, right.id) || compareText(left.kind, right.kind) || compareText(left.file, right.file)),
    taggedUnits: taggedIds.size,
    taggedFields,
    contractUnits: completeContracts.length,
    contractFields: completeContracts.reduce((count, contract) => count + contract.fields.size, 0),
    runtimeStrategyUnits: completeContracts.filter((contract) => contract.strategy === "runtime").length,
    customCodecStrategyUnits: completeContracts.filter((contract) => contract.strategy === "custom-codec").length,
    sourceMetadataStrategyUnits: completeContracts.filter((contract) => contract.strategy === "source-metadata").length,
  };
}

export function extractJsonFieldContractDeclarations(file, text, options = {}) {
  const api = options.api;
  if (api === undefined) throw new Error("JSON field contract extraction requires the configured TSTS parser API");
  const indexed = options.moduleIndex?.modules.get(file);
  if (indexed !== undefined && indexed.text !== text) throw new Error(`indexed TypeScript source '${file}' does not match JSON contract input`);
  const module = indexed ?? parseTypeScriptModule(api, file, text);
  const contracts = [];
  const mismatches = [];
  for (const statement of module.sourceFile.Statements?.Nodes ?? []) {
    if (statement.Kind !== api.Kinds.KindTypeAliasDeclaration) continue;
    const type = statement.Type;
    if (type?.Kind !== api.Kinds.KindTypeReference) continue;
    const resolution = importedTypeBinding(api, module, type.TypeName, CONTRACT_NAME, options);
    if (resolution === "resolved") {
      const parsed = parseContract(api, module, statement);
      if (parsed.contract !== undefined) contracts.push(parsed.contract);
      if (parsed.issue !== undefined) mismatches.push(mismatch(parsed.id ?? "", file, "json-tag-contract-invalid", parsed.issue));
    } else if (resolution === "ambiguous" || terminalTypeName(api, type.TypeName) === CONTRACT_NAME) {
      const detail = resolution === "ambiguous"
        ? `${CONTRACT_NAME} import binding is shadowed or ambiguous in the top-level type namespace`
        : `${CONTRACT_NAME} must resolve through an explicit ESM type import from a configured contract module`;
      mismatches.push(mismatch("", file, "json-tag-helper-unresolved", detail));
    }
  }
  return { contracts, mismatches };
}

function parseContract(api, module, declaration) {
  const args = declaration.Type.TypeArguments?.Nodes ?? [];
  if (args.length !== 5) return { issue: `${CONTRACT_NAME} requires a local struct type, Go unit id, exact field-map type, strategy, and reason` };
  const [structType, idType, fieldsType, strategyType, reasonType] = args;
  if (structType.Kind !== api.Kinds.KindTypeReference || structType.TypeName?.Kind !== api.Kinds.KindIdentifier || (structType.TypeArguments?.Nodes?.length ?? 0) !== 0) {
    return { issue: `${CONTRACT_NAME} requires an unqualified local struct type as its first argument` };
  }
  const id = stringLiteralTypeValue(api, idType);
  if (id === undefined || id.trim() === "") return { issue: `${CONTRACT_NAME} unit id must be a non-empty string literal type` };
  if (fieldsType.Kind !== api.Kinds.KindTypeLiteral) return { id, issue: `${CONTRACT_NAME} field map must be a type literal` };
  const strategy = stringLiteralTypeValue(api, strategyType);
  const reason = stringLiteralTypeValue(api, reasonType);
  const strategyIssue = validateStrategy(strategy, reason);
  if (strategyIssue !== undefined) return { id, issue: `${CONTRACT_NAME} strategy: ${strategyIssue}` };
  const fields = new Map();
  for (const member of fieldsType.Members?.Nodes ?? []) {
    if (member.Kind !== api.Kinds.KindPropertySignature || member.Type === undefined || member.PostfixToken?.Kind === api.Kinds.KindQuestionToken) return { id, issue: `${CONTRACT_NAME} field map supports only required property signatures` };
    const fieldName = propertyName(api, member.name);
    if (fieldName === undefined) return { id, issue: `${CONTRACT_NAME} field names must be identifiers or string literals` };
    if (fields.has(fieldName)) return { id, issue: `${CONTRACT_NAME} field '${fieldName}' is duplicated` };
    const field = parseTypeFieldSpec(api, module, member.Type);
    if (field.issue !== undefined) return { id, issue: `${CONTRACT_NAME} field '${fieldName}': ${field.issue}` };
    fields.set(fieldName, field.value);
  }
  return { contract: { id, file: module.moduleId, fields, binding: declaration.name.Text, typeName: structType.TypeName.Text, strategy, reason } };
}

function importedTypeBinding(api, module, nameNode, exportName, options) {
  let binding;
  let shadowed = false;
  if (nameNode?.Kind === api.Kinds.KindIdentifier) {
    const local = nameNode.Text;
    binding = module.structure.imports.named.get(local);
    shadowed = module.structure.localTypeNames.has(local);
    if (binding?.imported !== exportName) return "unresolved";
  } else if (nameNode?.Kind === api.Kinds.KindQualifiedName) {
    if (nameNode.Left?.Kind !== api.Kinds.KindIdentifier || nameNode.Right?.Kind !== api.Kinds.KindIdentifier || nameNode.Right.Text !== exportName) return "unresolved";
    const local = nameNode.Left.Text;
    binding = module.structure.imports.namespaces.get(local);
    shadowed = module.structure.localNamespaceNames.has(local);
    if (binding === undefined) return "unresolved";
  } else {
    return "unresolved";
  }
  if (shadowed) return "ambiguous";
  const targetModule = resolveModuleId(binding.module, module.moduleId);
  const targetId = `${targetModule}::${exportName}`;
  const origin = options.moduleIndex === undefined ? targetId : resolveIndexedTypeOrigin(options.moduleIndex, targetId);
  if (origin === undefined) return "unresolved";
  const originModule = origin.slice(0, origin.lastIndexOf("::"));
  return Array.isArray(options.contractModules) && options.contractModules.length > 0 && !options.contractModules.includes(originModule) ? "unresolved" : "resolved";
}

function resolveIndexedTypeOrigin(index, id, trail = []) {
  if (trail.includes(id)) return undefined;
  const separator = id.lastIndexOf("::");
  if (separator < 0) return undefined;
  const moduleId = id.slice(0, separator);
  const name = id.slice(separator + 2);
  if (index.externalModules.has(moduleId)) return id;
  const explicit = index.typeExports.get(id);
  if (explicit !== undefined) return explicit === id ? id : resolveIndexedTypeOrigin(index, explicit, [...trail, id]);
  if (name === "default") return undefined;
  const origins = new Set();
  for (const sourceModule of index.starReexport.get(moduleId) ?? []) {
    const origin = resolveIndexedTypeOrigin(index, `${sourceModule}::${name}`, [...trail, id]);
    if (origin !== undefined) origins.add(origin);
  }
  return origins.size === 1 ? origins.values().next().value : undefined;
}

function parseTypeFieldSpec(api, module, node) {
  const direct = stringLiteralTypeValue(api, node);
  if (direct !== undefined) return { value: { name: direct, omitZero: false, omitEmpty: false, ignored: false, options: [] } };
  if (node?.Kind !== api.Kinds.KindTypeLiteral) return { issue: "spec must be a string literal type or object type literal" };
  const result = { name: undefined, omitZero: false, omitEmpty: false, ignored: false, zeroMode: "value" };
  const known = new Set(["name", "omitZero", "omitEmpty", "ignored", "zero"]);
  for (const member of node.Members?.Nodes ?? []) {
    if (member.Kind !== api.Kinds.KindPropertySignature || member.Type === undefined || member.PostfixToken?.Kind === api.Kinds.KindQuestionToken) return { issue: "spec supports only required property signatures" };
    const key = propertyName(api, member.name);
    if (key === undefined || !known.has(key)) return { issue: `unknown or dynamic spec property '${key ?? sliceText(api, module.text, member.name)}'` };
    if (key === "name" || key === "zero") {
      const value = stringLiteralTypeValue(api, member.Type);
      if (key === "name" && value === undefined) return { issue: "name must be a string literal type" };
      if (key === "zero" && value !== "value" && value !== "nil") return { issue: "zero must be 'value' or 'nil'" };
      if (key === "name") result.name = value;
      else result.zeroMode = value;
      continue;
    }
    const value = booleanLiteralTypeValue(api, member.Type);
    if (value === undefined) return { issue: `${key} must be a boolean literal type` };
    result[key] = value;
  }
  if (typeof result.name !== "string") return { issue: "name is required" };
  const value = { name: result.name, omitZero: result.omitZero, omitEmpty: result.omitEmpty, ignored: result.ignored, options: [] };
  if (value.omitZero) value.options.push("omitzero");
  if (value.omitEmpty) value.options.push("omitempty");
  value.options.sort();
  if (value.omitZero) value.zeroMode = result.zeroMode;
  return { value };
}

function compareJsonFields(id, contract, expected) {
  const mismatches = [];
  for (const [name, field] of expected) {
    const actual = contract.fields.get(name);
    if (actual === undefined) {
      mismatches.push(mismatch(id, contract.file, "json-tag-field-missing", `Go JSON field '${name}' is absent from the TypeScript declaration contract`));
      continue;
    }
    if (contract.strategy === "runtime" && field.omitZero && field.zeroMode !== "value" && field.zeroMode !== "nil") {
      mismatches.push(mismatch(id, contract.file, "json-tag-zero-semantics-unsupported", `Go JSON field '${name}' has ${field.zeroMode} zero semantics; a runtime declaration must not guess`));
    }
    const compareZeroMode = contract.strategy === "runtime" && (field.zeroMode === "value" || field.zeroMode === "nil");
    const expectedField = compareZeroMode ? field : withoutZeroMode(field);
    const actualField = compareZeroMode ? actual : withoutZeroMode(actual);
    if (JSON.stringify(expectedField) !== JSON.stringify(actualField)) mismatches.push(mismatch(id, contract.file, "json-tag-field-drift", `JSON field '${name}' differs: Go=${JSON.stringify(field)} TypeScript=${JSON.stringify(actual)}`));
  }
  for (const name of contract.fields.keys()) if (!expected.has(name)) mismatches.push(mismatch(id, contract.file, "json-tag-field-extra", `TypeScript JSON field '${name}' is not an exported Go JSON field`));
  return mismatches;
}

function validateStrategy(strategy, reason) {
  if (!new Set(["runtime", "custom-codec", "source-metadata"]).has(strategy)) return "strategy must be 'runtime', 'custom-codec', or 'source-metadata'";
  if (typeof reason !== "string" || reason.trim().length < 40) return "reason must be a durable explanation of at least 40 characters";
  if (/\b(?:todo|tbd|fixme|phase\s*\d+|slice\s*\d+)\b/i.test(reason)) return "reason must be timeless and cannot contain planning/status placeholders";
  return undefined;
}

function withoutZeroMode(field) {
  const { zeroMode: _zeroMode, ...rest } = field;
  return rest;
}

function mismatch(id, file, kind, detail) {
  return { id, file, kind, detail };
}

function terminalTypeName(api, typeName) {
  let current = typeName;
  while (current?.Kind === api.Kinds.KindQualifiedName) current = current.Right;
  return current?.Kind === api.Kinds.KindIdentifier ? current.Text : undefined;
}

function stringLiteralTypeValue(api, node) {
  return node?.Kind === api.Kinds.KindLiteralType && (node.Literal?.Kind === api.Kinds.KindStringLiteral || node.Literal?.Kind === api.Kinds.KindNoSubstitutionTemplateLiteral) ? node.Literal.Text : undefined;
}

function booleanLiteralTypeValue(api, node) {
  if (node?.Kind !== api.Kinds.KindLiteralType) return undefined;
  if (node.Literal?.Kind === api.Kinds.KindTrueKeyword) return true;
  if (node.Literal?.Kind === api.Kinds.KindFalseKeyword) return false;
  return undefined;
}

function propertyName(api, node) {
  if (node?.Kind === api.Kinds.KindIdentifier || node?.Kind === api.Kinds.KindStringLiteral || node?.Kind === api.Kinds.KindNumericLiteral) return node.Text;
  return undefined;
}
