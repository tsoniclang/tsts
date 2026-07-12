import { compareText } from "../core/deterministic-order.mjs";
import { hashText } from "../core/runtime.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import { declarationDescriptor } from "../ts-extractor/ast-signatures.mjs";
import { trackedDeclarationStatements } from "../ts-extractor/extract-signatures.mjs";
import { variableNames } from "../ts-extractor/source-structure.mjs";
import { declarationNamespaces, declarationOwnershipIds } from "./declaration-ownership.mjs";
import { matchNonGoDeclarationPolicies, matchNonGoExportRoutePolicies } from "./non-go-declaration-policies.mjs";

export function collectUntrackedTypeScriptDeclarations({
  accountedDeclarationIds = new Set(),
  api,
  annotation,
  config,
  moduleIndex,
  valueEnvironments = new Map(),
}) {
  const declarations = [];
  const reExports = [];
  const sourceRoot = `${config.tsRoot.replace(/\/+$/, "")}/`;
  for (const [moduleId, module] of [...moduleIndex.modules].sort(([left], [right]) => compareText(left, right))) {
    if (!moduleId.startsWith(sourceRoot)) throw new Error(`indexed TypeScript module '${moduleId}' is outside configured tsRoot`);
    const generated = inspectGeneratedArtifactRegistration(moduleId.slice(sourceRoot.length), module.text);
    if (generated.error !== undefined) throw new Error(`TypeScript source '${moduleId}' has invalid generated-artifact evidence: ${generated.error}`);
    if (generated.metadata !== undefined) continue;
    const tracked = trackedDeclarationStatements(api, module, annotation);
    const fragmentCounts = new Map();
    for (const [statementIndex, statement] of (module.sourceFile.Statements?.Nodes ?? []).entries()) {
      if (statement.Kind === api.Kinds.KindExportAssignment) {
        declarations.push(exportAssignmentEvidence(api, module, statement, statementIndex));
        continue;
      }
      if (!isPorterDeclaration(api, statement)) continue;
      const kind = declarationKind(api, statement);
      const namespaces = declarationNamespaces(kind);
      const hash = declarationContractHash(api, module, statement, valueEnvironments.get(moduleId) ?? new Map());
      for (const name of declarationNames(api, statement)) {
        const fragmentKey = `${kind}\0${name}`;
        const fragmentIndex = fragmentCounts.get(fragmentKey) ?? 0;
        fragmentCounts.set(fragmentKey, fragmentIndex + 1);
        if (tracked.has(statement)) continue;
        const ownershipIds = declarationOwnershipIds(moduleId, name, kind);
        if (ownershipIds.every((id) => accountedDeclarationIds.has(id))) continue;
        if (ownershipIds.some((id) => accountedDeclarationIds.has(id))) {
          throw new Error(`TypeScript declaration '${moduleId}::${name}' has only partial type/value ownership`);
        }
        const directlyExported = hasExportModifier(api, statement);
        const exported = directlyExported || isDeclarationExported(module, moduleId, name, kind);
        declarations.push({
          declarationHash: hash,
          exported,
          file: moduleId,
          fragmentIndex,
          kind,
          name,
          namespaces,
          sourceVisible: exported || module.sourceFile.ExternalModuleIndicator === undefined || isAmbientSourceDeclaration(api, statement),
          statementIndex,
        });
      }
    }
    reExports.push(...exportRouteDeclarations(module, moduleId));
  }
  const declarationPolicy = matchNonGoDeclarationPolicies(config, declarations);
  const routePolicy = matchNonGoExportRoutePolicies(config, reExports);
  const privateDeclarations = [];
  const exportedDeclarations = [];
  const reviewedDeclarations = [];
  const mismatches = [...declarationPolicy.mismatches, ...routePolicy.mismatches];
  for (const declaration of declarations) {
    const key = declarationPolicyKey(declaration);
    if (declarationPolicy.accepted.has(key)) {
      reviewedDeclarations.push(declaration);
      continue;
    }
    (declaration.exported || declaration.sourceVisible ? exportedDeclarations : privateDeclarations).push(declaration);
    mismatches.push({
      id: `typescript-local:${declaration.file}::${declaration.kind}::${declaration.name}::${declaration.fragmentIndex}`,
      file: declaration.file,
      kind: "ts-declaration-without-go-unit",
      detail: `${declaration.sourceVisible ? "source-visible" : "module-private"} TypeScript ${declaration.kind} '${declaration.name}' fragment ${declaration.fragmentIndex} has no Go declaration identity or exact reviewed non-Go policy`,
    });
  }
  for (const route of reExports) {
    if (routePolicy.accepted.has(exportRoutePolicyKey(route))) continue;
    mismatches.push({
      id: `typescript-export:${route.file}::${route.namespace}::${route.name}`,
      file: route.file,
      kind: "ts-export-route-without-go-unit",
      detail: `TypeScript ${route.namespace} export '${route.name}' to '${route.target}' has no exact Go declaration route or reviewed non-Go route policy`,
    });
  }
  const declarationOrder = (left, right) => compareText(left.file, right.file) || compareText(left.kind, right.kind) ||
    compareText(left.name, right.name) || left.fragmentIndex - right.fragmentIndex;
  exportedDeclarations.sort(declarationOrder);
  privateDeclarations.sort(declarationOrder);
  reviewedDeclarations.sort(declarationOrder);
  reExports.sort(routeOrder);
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.id, right.id));
  return { exportedDeclarations, mismatches, privateDeclarations, reExports, reviewedDeclarations };
}

function declarationContractHash(api, module, statement, valueEnvironment) {
  const descriptor = declarationDescriptor(api, statement, {
    api,
    imports: module.descriptorImports ?? module.structure.imports,
    localNamespaces: module.structure.localNamespaceNames,
    localTypes: module.structure.localTypeNames,
    localValues: module.structure.localValueNames,
    moduleId: module.moduleId,
    text: module.text,
    valueEnvironment,
  });
  return hashText(canonicalSchemaValue(descriptor));
}

function exportAssignmentEvidence(api, module, statement, statementIndex) {
  const exported = statement.IsExportEquals === true ? "export=" : "default";
  const descriptor = { kind: "export-assignment", exported };
  return {
    declarationHash: hashText(canonicalSchemaValue(descriptor)),
    exported: true,
    file: module.moduleId,
    fragmentIndex: 0,
    kind: "export-assignment",
    name: exported,
    namespaces: ["value"],
    sourceVisible: true,
    statementIndex,
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
  if (statement.Kind === api.Kinds.KindModuleDeclaration) {
    if (statement.name?.Text === "global") return "global-augmentation";
    if (statement.name?.Kind === api.Kinds.KindStringLiteral) return "ambient-module";
    return "namespace";
  }
  return "variable";
}

function declarationNames(api, statement) {
  if (statement.Kind !== api.Kinds.KindVariableStatement) {
    return [statement.name?.Text ?? `<anonymous@${api.Node_Pos(statement)}>`];
  }
  return variableNames(api, statement);
}

function hasExportModifier(api, statement) {
  return (statement.modifiers?.Nodes ?? []).some((modifier) =>
    modifier.Kind === api.Kinds.KindExportKeyword || modifier.Kind === api.Kinds.KindDefaultKeyword);
}

function isAmbientSourceDeclaration(api, statement) {
  return statement.Kind === api.Kinds.KindModuleDeclaration &&
    (statement.name?.Text === "global" || statement.name?.Kind === api.Kinds.KindStringLiteral);
}

function isDeclarationExported(module, moduleId, name, kind) {
  const identity = `${moduleId}::${name}`;
  const namespaces = declarationNamespaces(kind);
  return namespaces.some((namespace) => {
    if (namespace === "ambient") return true;
    const exports = namespace === "type" ? module.structure.typeExports : module.structure.valueExports;
    return [...exports.values()].includes(identity);
  });
}

function exportRouteDeclarations(module, moduleId) {
  const rows = new Map();
  for (const route of module.structure.explicitExportRoutes ?? []) add(route.namespace, route.name, route.target);
  return [...rows.values()];

  function add(namespace, name, target) {
    const descriptor = { file: moduleId, name, namespace, target };
    const routeHash = hashText(canonicalSchemaValue(descriptor));
    const identity = `${namespace}\0${name}\0${target}`;
    rows.set(identity, { ...descriptor, exported: true, kind: "re-export", routeHash });
  }
}

function declarationPolicyKey(value) {
  return [value.file, value.kind, value.name, value.fragmentIndex, [...value.namespaces].sort(compareText).join(",")].join("\0");
}

function exportRoutePolicyKey(value) {
  return [value.file, value.namespace, value.name, value.target].join("\0");
}

function routeOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.namespace, right.namespace) ||
    compareText(left.name, right.name) || compareText(left.target, right.target);
}
