import { compareText } from "../core/deterministic-order.mjs";
import { tsFilePolicyFor } from "../core/policies.mjs";
import { trackedDeclarationStatements } from "../ts-extractor/extract-signatures.mjs";
import { variableNames } from "../ts-extractor/source-structure.mjs";

export function collectUntrackedTypeScriptDeclarations({
  accountedDeclarationIds = new Set(),
  api,
  annotation,
  config,
  moduleIndex,
}) {
  const privateDeclarations = [];
  const reExports = [];
  const exportedDeclarations = [];
  for (const [moduleId, module] of [...moduleIndex.modules].sort(([left], [right]) => compareText(left, right))) {
    if (tsFilePolicyFor(config, moduleId).category !== "requires-tsgo-unit") continue;
    const tracked = trackedDeclarationStatements(api, module, annotation);
    const declarations = new Map();
    for (const statement of module.sourceFile.Statements?.Nodes ?? []) {
      if (tracked.has(statement) || !isPorterDeclaration(api, statement)) continue;
      const directlyExported = (statement.modifiers?.Nodes ?? []).some((modifier) =>
        modifier.Kind === api.Kinds.KindExportKeyword || modifier.Kind === api.Kinds.KindDefaultKeyword);
      for (const name of declarationNames(api, statement)) {
        if (accountedDeclarationIds.has(`${moduleId}::${name}`)) continue;
        const kind = declarationKind(api, statement);
        const key = `${kind}:${name}`;
        const exported = directlyExported || isDeclarationExported(module, moduleId, name, kind);
        const existing = declarations.get(key);
        declarations.set(key, existing === undefined ? { exported, kind, name } : { ...existing, exported: existing.exported || exported });
      }
    }
    reExports.push(...reExportDeclarations(module, moduleId));
    for (const declaration of declarations.values()) {
      const evidence = { file: moduleId, ...declaration };
      (declaration.exported ? exportedDeclarations : privateDeclarations).push(evidence);
    }
  }
  const order = (left, right) => compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.name, right.name);
  exportedDeclarations.sort(order);
  privateDeclarations.sort(order);
  reExports.sort(order);
  return {
    exportedDeclarations,
    privateDeclarations,
    reExports,
    mismatches: exportedDeclarations.map((declaration) => ({
      id: `typescript-local:${declaration.file}::${declaration.name}`,
      file: declaration.file,
      kind: "ts-export-without-go-unit",
      detail: `exported TypeScript ${declaration.kind} '${declaration.name}' has no @tsgo-unit declaration identity or explicit non-Go source policy`,
    })),
  };
}

function isPorterDeclaration(api, statement) {
  return statement.Kind === api.Kinds.KindFunctionDeclaration ||
    statement.Kind === api.Kinds.KindInterfaceDeclaration ||
    statement.Kind === api.Kinds.KindTypeAliasDeclaration ||
    statement.Kind === api.Kinds.KindClassDeclaration ||
    statement.Kind === api.Kinds.KindEnumDeclaration ||
    statement.Kind === api.Kinds.KindModuleDeclaration ||
    statement.Kind === api.Kinds.KindVariableStatement;
}

function declarationKind(api, statement) {
  if (statement.Kind === api.Kinds.KindFunctionDeclaration) return "function";
  if (statement.Kind === api.Kinds.KindInterfaceDeclaration) return "interface";
  if (statement.Kind === api.Kinds.KindTypeAliasDeclaration) return "type";
  if (statement.Kind === api.Kinds.KindClassDeclaration) return "class";
  if (statement.Kind === api.Kinds.KindEnumDeclaration) return "enum";
  if (statement.Kind === api.Kinds.KindModuleDeclaration) return "namespace";
  return "variable";
}

function declarationNames(api, statement) {
  if (statement.Kind !== api.Kinds.KindVariableStatement) {
    return [statement.name?.Text ?? `<anonymous@${api.Node_Pos(statement)}>`];
  }
  return variableNames(api, statement);
}

function isDeclarationExported(module, moduleId, name, kind) {
  const identity = `${moduleId}::${name}`;
  const exports = kind === "interface" || kind === "type"
    ? [module.structure.typeExports]
    : kind === "class" || kind === "enum" || kind === "namespace"
      ? [module.structure.typeExports, module.structure.valueExports]
      : [module.structure.valueExports];
  return exports.some((entries) => [...entries.values()].includes(identity));
}

function reExportDeclarations(module, moduleId) {
  const rows = new Map();
  for (const [name, target] of module.structure.namedReexports) if (!target.startsWith(`${moduleId}::`)) add("type", name, target);
  for (const [name, target] of module.structure.valueNamedReexports) if (!target.startsWith(`${moduleId}::`)) add("value", name, target);
  for (const source of module.structure.starReexports) add("type-star", "*", source);
  for (const source of module.structure.valueStarReexports) add("value-star", "*", source);
  for (const [name, target] of module.structure.namespaceReexports) {
    if (target.module !== moduleId) add(target.typeOnly ? "type-namespace" : "namespace", name, `${target.module}::${target.local ?? "*"}`);
  }
  return [...rows.values()];

  function add(namespace, name, target) {
    const identity = `${namespace}:${name}:${target}`;
    rows.set(identity, { exported: true, file: moduleId, kind: "re-export", name: `${namespace} ${name} from ${target}` });
  }
}
