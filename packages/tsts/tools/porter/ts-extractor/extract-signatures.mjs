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
    const descriptor = isValueGroup(record.metadata.kind)
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
  if (actualName !== expectedName) {
    throw new Error(`@tsgo-unit '${record.metadata.id}' is attached to '${actualName ?? "<anonymous>"}', expected '${expectedName}'`);
  }
  assertDeclarationKind(api, record.statement, record.metadata.kind, record.metadata.id);
  return declarationDescriptor(api, record.statement, base);
}

function valueGroupDescriptor(api, module, record, expectedNames, metadataByStatement, base) {
  if (expectedNames.length === 0 || expectedNames.some((name) => name.length === 0)) {
    throw new Error(`invalid value-group identity in @tsgo-unit '${record.metadata.id}'`);
  }
  const declarations = [];
  let statementIndex = record.statementIndex;
  while (declarations.length < expectedNames.length) {
    const statement = module.sourceFile.Statements?.Nodes?.[statementIndex];
    if (statement === undefined || statement.Kind !== api.Kinds.KindVariableStatement) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' does not own ${expectedNames.length} contiguous variable declarations`);
    }
    if (statementIndex !== record.statementIndex && metadataByStatement.has(statementIndex)) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' crosses another tracked declaration`);
    }
    if (record.metadata.kind === "constGroup" && (statement.DeclarationList.Flags & api.Flags.NodeFlagsConst) === 0) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' must own const declarations`);
    }
    const descriptor = declarationDescriptor(api, statement, base);
    declarations.push(...descriptor.decls);
    if (declarations.length > expectedNames.length) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' owns more declarations than its exact value-group identity`);
    }
    statementIndex++;
  }
  for (let index = 0; index < expectedNames.length; index++) {
    const expected = expectedNames[index];
    const actual = declarations[index].name;
    if (expected !== "_" && actual !== expected) {
      throw new Error(`@tsgo-unit '${record.metadata.id}' declaration ${index + 1} is '${actual ?? "<unsupported>"}', expected '${expected}'`);
    }
  }
  return { kind: "value", decls: declarations };
}

function assertDeclarationKind(api, statement, metadataKind, id) {
  const isFunction = statement.Kind === api.Kinds.KindFunctionDeclaration;
  const isType = statement.Kind === api.Kinds.KindInterfaceDeclaration ||
    statement.Kind === api.Kinds.KindTypeAliasDeclaration ||
    statement.Kind === api.Kinds.KindClassDeclaration ||
    statement.Kind === api.Kinds.KindEnumDeclaration;
  if ((metadataKind === "func" || metadataKind === "method") && !isFunction) {
    throw new Error(`@tsgo-unit '${id}' kind '${metadataKind}' must annotate a function declaration`);
  }
  if (metadataKind === "type" && !isType) {
    throw new Error(`@tsgo-unit '${id}' kind 'type' must annotate a type declaration`);
  }
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
