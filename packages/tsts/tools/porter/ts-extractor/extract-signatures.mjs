// Parser-backed declaration descriptor extraction for tracked Porter units.

import { readFileSync } from "node:fs";
import {
  declarationDescriptor,
  loadParser,
} from "./ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments as buildConstantEnvironments } from "./constant-environment.mjs";
import { declarationName, expectedTypeScriptNames } from "./declaration-metadata.mjs";
import { indexTypeScriptModuleSources, parseTypeScriptModule } from "./module-index.mjs";

const DEFAULT_ANNOTATION = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };

export function extractParsedFileDescriptors(api, module, annotation = DEFAULT_ANNOTATION, initialValueEnvironment = new Map()) {
  const base = {
    api,
    text: module.text,
    imports: module.descriptorImports ?? module.structure.imports,
    localTypes: module.structure.localTypeNames,
    localNamespaces: module.structure.localNamespaceNames,
    moduleId: module.moduleId,
    valueEnvironment: initialValueEnvironment,
  };
  const metadataByStatement = new Map(module.metadata.map((record) => [record.statementIndex, record]));
  return module.metadata.map((record) => {
    const names = expectedTypeScriptNames(record.metadata, annotation);
    const descriptor = isValueGroup(record.metadata.kind) &&
        (record.statement.Kind === api.Kinds.KindVariableStatement || record.statement.Kind === api.Kinds.KindEnumDeclaration)
      ? valueGroupDescriptor(api, module, record, names, metadataByStatement, base)
      : declarationUnitDescriptor(api, module, record, names, base);
    return {
      id: record.metadata.id,
      metaKind: record.metadata.kind,
      metadata: record.metadata,
      moduleId: module.moduleId,
      descriptor,
    };
  });
}

function declarationUnitDescriptor(api, module, record, expectedNames, base) {
  if (expectedNames.length !== 1 || expectedNames[0].length === 0) {
    throw new Error(`invalid declaration identity in @tsgo-unit '${record.metadata.id}'`);
  }
  const expectedName = expectedNames[0];
  const actualName = declarationName(api, record.statement);
  const descriptor = groupedDeclarationDescriptor(api, module, record, actualName, base);
  const metadataIssues = [
    ...(descriptor.metadataIssues ?? []),
    ...declarationMetadataIssues(api, record.statement, record.metadata.kind, expectedName, actualName),
  ];
  return metadataIssues.length === 0 ? descriptor : { ...descriptor, metadataIssues };
}

function groupedDeclarationDescriptor(api, module, record, actualName, base) {
  const attached = declarationDescriptor(api, record.statement, base);
  if (actualName === undefined) return attached;
  if (record.statement.Kind === api.Kinds.KindFunctionDeclaration) {
    const declarations = sameNamedStatements(api, module, record, actualName, api.Kinds.KindFunctionDeclaration);
    return {
      kind: "func",
      name: actualName,
      modifiers: declarations.length === 0 ? [] : declarationDescriptor(api, declarations[0], base).modifiers,
      signatures: declarations.map((statement) => {
        const descriptor = declarationDescriptor(api, statement, base);
        return {
          role: statement.Body === undefined ? "overload" : "implementation",
          declarationModifiers: descriptor.modifiers,
          params: descriptor.params,
          ret: descriptor.ret,
          missingReturnType: descriptor.missingReturnType,
          returnTypePolicy: descriptor.returnTypePolicy,
          typeParams: descriptor.typeParams,
          signatureModifiers: descriptor.signatureModifiers,
        };
      }),
    };
  }
  if (record.statement.Kind === api.Kinds.KindInterfaceDeclaration) {
    return mergeInterfaceDescriptors(api, sameNamedStatements(api, module, record, actualName, api.Kinds.KindInterfaceDeclaration), base);
  }
  if (record.statement.Kind === api.Kinds.KindEnumDeclaration) {
    return mergeEnumDescriptors(api, sameNamedStatements(api, module, record, actualName, api.Kinds.KindEnumDeclaration), base);
  }
  return attached;
}

function sameNamedStatements(api, module, record, name, kind) {
  const metadataByStatement = new Map(module.metadata.map((item) => [item.statementIndex, item]));
  const declarations = [];
  for (const [statementIndex, statement] of (module.sourceFile.Statements?.Nodes ?? []).entries()) {
    if (statement.Kind !== kind || declarationName(api, statement) !== name) continue;
    const owner = metadataByStatement.get(statementIndex);
    if (owner !== undefined && owner !== record) {
      throw new Error(`declaration '${name}' in '${module.moduleId}' is owned by more than one @tsgo-unit`);
    }
    declarations.push(statement);
  }
  return declarations;
}

function mergeInterfaceDescriptors(api, declarations, base) {
  const fragments = declarations.map((statement) => declarationDescriptor(api, statement, base));
  if (fragments.length === 0) throw new Error("cannot merge an interface without a declaration fragment");
  const metadataIssues = fragmentConsistencyIssues(fragments, ["modifiers", "typeParams"], "interface");
  return {
    kind: "interface",
    name: fragments[0].name,
    modifiers: fragments[0].modifiers,
    fragments: fragments.map((fragment) => ({ modifiers: fragment.modifiers, typeParams: fragment.typeParams, heritage: fragment.heritage, members: fragment.members })),
    typeParams: fragments[0].typeParams,
    heritage: fragments.flatMap((fragment) => fragment.heritage),
    members: fragments.flatMap((fragment) => fragment.members),
    ...(metadataIssues.length === 0 ? {} : { metadataIssues }),
  };
}

function mergeEnumDescriptors(api, declarations, base) {
  const fragments = declarations.map((statement) => declarationDescriptor(api, statement, base));
  if (fragments.length === 0) throw new Error("cannot merge an enum without a declaration fragment");
  const metadataIssues = fragmentConsistencyIssues(fragments, ["modifiers"], "enum");
  return {
    kind: "enum",
    name: fragments[0].name,
    fragments: fragments.map((fragment) => ({ modifiers: fragment.modifiers, members: fragment.members })),
    modifiers: fragments[0].modifiers,
    members: fragments.flatMap((fragment) => fragment.members),
    ...(metadataIssues.length === 0 ? {} : { metadataIssues }),
  };
}

function fragmentConsistencyIssues(fragments, fields, declarationKind) {
  if (fragments.length < 2) return [];
  const issues = [];
  for (const field of fields) {
    const expected = JSON.stringify(fragments[0]?.[field]);
    for (let index = 1; index < fragments.length; index++) {
      if (JSON.stringify(fragments[index]?.[field]) !== expected) {
        issues.push(`${declarationKind} fragment #${index} has a different ${field} contract`);
      }
    }
  }
  return issues;
}

function valueGroupDescriptor(api, module, record, expectedNames, metadataByStatement, base) {
  if (expectedNames.length === 0 || expectedNames.some((name) => name.length === 0)) {
    throw new Error(`invalid value-group identity in @tsgo-unit '${record.metadata.id}'`);
  }
  const declarations = [];
  const metadataIssues = [];
  let statementIndex = record.statementIndex;
  while (declarations.length < expectedNames.length) {
    const statement = module.sourceFile.Statements?.Nodes?.[statementIndex];
    if (statement === undefined || (statement.Kind !== api.Kinds.KindVariableStatement && statement.Kind !== api.Kinds.KindEnumDeclaration)) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' does not own ${expectedNames.length} contiguous variable declarations`);
    }
    if (statementIndex !== record.statementIndex && metadataByStatement.has(statementIndex)) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' crosses another tracked declaration`);
    }
    const descriptor = declarationDescriptor(api, statement, base);
    if (descriptor.kind === "value") declarations.push(...descriptor.decls);
    else if (descriptor.kind === "enum") {
      const enumType = { t: "ref", id: `${module.moduleId}::${descriptor.name}`, args: [] };
      declarations.push(...descriptor.members.map((member) => ({
        name: member.name,
        declarationKind: "enum",
        modifiers: descriptor.modifiers,
        type: enumType,
        value: member.value,
        valueIssue: member.valueIssue,
      })));
    } else {
      metadataIssues.push(`value-group metadata is attached to ${descriptor.kind}`);
      break;
    }
    if (declarations.length > expectedNames.length) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' owns more declarations than its exact value-group identity`);
    }
    statementIndex++;
  }
  for (let index = 0; index < expectedNames.length; index++) {
    const expected = expectedNames[index];
    const actual = declarations[index].name;
    if (expected !== "_" && actual !== expected) {
      metadataIssues.push(`declaration ${index + 1} is '${actual ?? "<unsupported>"}', expected '${expected}'`);
    }
  }
  return { kind: "value", decls: declarations, ...(metadataIssues.length === 0 ? {} : { metadataIssues }) };
}

function declarationMetadataIssues(api, statement, metadataKind, expectedName, actualName) {
  const issues = [];
  if (actualName !== expectedName) issues.push(`metadata names '${expectedName}', but declaration name is '${actualName ?? "<anonymous>"}'`);
  const isFunction = statement.Kind === api.Kinds.KindFunctionDeclaration;
  const isType = statement.Kind === api.Kinds.KindInterfaceDeclaration ||
    statement.Kind === api.Kinds.KindTypeAliasDeclaration ||
    statement.Kind === api.Kinds.KindClassDeclaration ||
    statement.Kind === api.Kinds.KindEnumDeclaration;
  if ((metadataKind === "func" || metadataKind === "method") && !isFunction) {
    issues.push(`metadata kind '${metadataKind}' is attached to ${api.kindName.get(statement.Kind) ?? statement.Kind}`);
  }
  if (metadataKind === "type" && !isType) {
    issues.push(`metadata kind 'type' is attached to ${api.kindName.get(statement.Kind) ?? statement.Kind}`);
  }
  if (isValueGroup(metadataKind) && statement.Kind !== api.Kinds.KindVariableStatement && statement.Kind !== api.Kinds.KindEnumDeclaration) {
    issues.push(`metadata kind '${metadataKind}' is attached to ${api.kindName.get(statement.Kind) ?? statement.Kind}`);
  }
  return issues;
}

function isValueGroup(kind) {
  return kind === "constGroup" || kind === "varGroup";
}

export function extractFileDescriptors(api, moduleId, text, annotation = DEFAULT_ANNOTATION, initialValueEnvironment = undefined) {
  return extractParsedFileDescriptors(api, parseTypeScriptModule(api, moduleId, text), annotation, initialValueEnvironment ?? new Map());
}

export function buildIndexedModuleValueEnvironments(api, index) {
  return buildConstantEnvironments(api, index);
}

export function buildModuleValueEnvironments(api, sources) {
  return buildConstantEnvironments(api, indexTypeScriptModuleSources(api, sources));
}

export function extractFile(api, repoRoot, relativePath) {
  const text = readFileSync(`${repoRoot}/${relativePath}`, "utf8");
  return extractFileDescriptors(api, relativePath, text);
}

const invokedDirectly = process.argv[1] && process.argv[1].endsWith("extract-signatures.mjs");
if (invokedDirectly) {
  const api = await loadParser();
  const result = {};
  for (const file of process.argv.slice(2)) {
    const relativePath = file.replace(/^\.?\//, "");
    for (const unit of extractFileDescriptors(api, relativePath, readFileSync(file, "utf8"))) {
      result[unit.id] = { metaKind: unit.metaKind, descriptor: unit.descriptor };
    }
  }
  console.log(JSON.stringify(result, null, 2));
}
