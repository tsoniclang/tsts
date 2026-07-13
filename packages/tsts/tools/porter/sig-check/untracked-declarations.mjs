import { compareText } from "../core/deterministic-order.mjs";
import { tsFilePolicyFor } from "../core/policies.mjs";
import { hashText } from "../core/runtime.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import { declarationDescriptor } from "../ts-extractor/ast-signatures.mjs";
import { trackedDeclarationStatements } from "../ts-extractor/extract-signatures.mjs";
import { variableNames } from "../ts-extractor/source-structure.mjs";
import { declarationNamespaces, declarationOwnershipIds } from "./declaration-ownership.mjs";
import {
  declarationPolicyKey,
  exportRoutePolicyKey,
  matchReviewedNonGoDeclarations,
  matchReviewedNonGoExportRoutes,
} from "./non-go-declaration-policies.mjs";

export function collectUntrackedTypeScriptDeclarations({
  accountedDeclarationIds = new Set(),
  api,
  annotation,
  config,
  moduleIndex,
  nonGoManifest,
  valueEnvironments = new Map(),
}) {
  if (nonGoManifest === undefined) throw new Error("untracked TypeScript declaration audit requires the normalized non-Go declaration manifest");
  const declarations = [];
  const reExports = [];
  const testParityFiles = [];
  const testParityModules = new Set();
  const testParityMismatches = [];
  const sourceRoot = `${config.tsRoot.replace(/\/+$/, "")}/`;
  for (const [moduleId, module] of [...moduleIndex.modules].sort(([left], [right]) => compareText(left, right))) {
    if (!moduleId.startsWith(sourceRoot)) throw new Error(`indexed TypeScript module '${moduleId}' is outside configured tsRoot`);
    const filePolicy = tsFilePolicyFor(config, moduleId);
    const generated = inspectGeneratedArtifactRegistration(moduleId.slice(sourceRoot.length), module.text);
    if (generated.error !== undefined) throw new Error(`TypeScript source '${moduleId}' has invalid generated-artifact evidence: ${generated.error}`);
    if (generated.metadata !== undefined && filePolicy.category !== "test-parity") continue;
    const tracked = trackedDeclarationStatements(api, module, annotation);
    const fragmentCounts = new Map();
    const moduleDeclarations = [];
    for (const [statementIndex, statement] of (module.sourceFile.Statements?.Nodes ?? []).entries()) {
      if (statement.Kind === api.Kinds.KindExportAssignment) {
        moduleDeclarations.push(exportAssignmentEvidence(api, module, statement, statementIndex));
        continue;
      }
      if (!isPorterDeclaration(api, statement)) continue;
      const kind = declarationKind(api, statement);
      const namespaces = declarationNamespaces(kind);
      const contract = declarationContract(api, module, statement, valueEnvironments.get(moduleId) ?? new Map());
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
        const ambient = isAmbientSourceDeclaration(api, statement);
        const exported = directlyExported || isDeclarationExported(module, moduleId, name, kind);
        const sourceVisible = exported || module.sourceFile.ExternalModuleIndicator === undefined || ambient;
        moduleDeclarations.push({
          contractIssues: contract.issues,
          declarationHash: contract.hash,
          descriptor: contract.descriptor,
          directlyExported,
          exported,
          file: moduleId,
          fragmentIndex,
          kind,
          name,
          namespaces,
          sourceVisible,
          statementIndex,
          visibility: declarationVisibility({ ambient, directlyExported, exported, sourceVisible }),
        });
      }
    }
    const moduleReExports = exportRouteDeclarations(module, moduleId, moduleIndex);
    if (filePolicy.category === "test-parity") {
      testParityModules.add(moduleId);
      testParityFiles.push(testParityFileEvidence(module, moduleId, moduleDeclarations, moduleReExports));
      for (const declaration of moduleDeclarations) {
        if (!declaration.exported && !declaration.sourceVisible) continue;
        testParityMismatches.push({
          id: `test-parity:${moduleId}:${declaration.kind}:${declaration.name}:${declaration.fragmentIndex}`,
          file: moduleId,
          kind: "test-parity-declaration-visible",
          detail: `test-parity declaration '${declaration.name}' must remain module-private and non-ambient`,
        });
      }
      for (const route of moduleReExports) {
        testParityMismatches.push({
          id: `test-parity:${moduleId}:route:${route.namespace}:${route.name}`,
          file: moduleId,
          kind: "test-parity-export-route",
          detail: `test-parity module must not expose ${route.namespace} route '${route.name}'`,
        });
      }
      continue;
    }
    declarations.push(...moduleDeclarations);
    reExports.push(...moduleReExports);
  }
  testParityMismatches.push(...testParityImportMismatches(config, moduleIndex, testParityModules));
  const declarationPolicy = matchReviewedNonGoDeclarations(nonGoManifest, declarations);
  const routePolicy = matchReviewedNonGoExportRoutes(nonGoManifest, reExports);
  const privateDeclarations = [];
  const exportedDeclarations = [];
  const reviewedDeclarations = [];
  const reviewedRoutes = [];
  const mismatches = [...declarationPolicy.mismatches, ...routePolicy.mismatches, ...testParityMismatches];
  for (const declaration of declarations) {
    for (const issue of declaration.contractIssues) {
      mismatches.push({
        id: `typescript-contract:${declaration.file}::${declaration.kind}::${declaration.name}::${declaration.fragmentIndex}`,
        file: declaration.file,
        kind: "non-go-declaration-signature-incomplete",
        detail: `${declaration.kind} '${declaration.name}' has no exact declaration-only contract: ${issue}`,
      });
    }
    const key = declarationPolicyKey(declaration);
    const policy = declarationPolicy.accepted.get(key);
    if (policy !== undefined) {
      reviewedDeclarations.push({ ...declaration, owner: policy.owner, ownerReason: policy.ownerReason });
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
    const policy = routePolicy.accepted.get(exportRoutePolicyKey(route));
    if (policy !== undefined) {
      reviewedRoutes.push({ ...route, owner: policy.owner, ownerReason: policy.ownerReason });
      continue;
    }
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
  reviewedRoutes.sort(routeOrder);
  reExports.sort(routeOrder);
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.id, right.id));
  testParityFiles.sort((left, right) => compareText(left.file, right.file));
  return { exportedDeclarations, mismatches, privateDeclarations, reExports, reviewedDeclarations, reviewedRoutes, testParityFiles };
}

function testParityFileEvidence(module, moduleId, declarations, routes) {
  if (!moduleId.endsWith(".test.ts")) {
    throw new Error(`test-parity TypeScript source '${moduleId}' must use the recursively discovered .test.ts suffix`);
  }
  const inventory = {
    declarations: declarations.map(declarationInventoryRow),
    moduleReferences: module.structure.moduleReferences,
    routes,
  };
  return {
    declarationCount: declarations.length,
    declarationInventoryHash: hashText(canonicalSchemaValue(inventory)),
    file: moduleId,
  };
}

function declarationInventoryRow(declaration) {
  return {
    declarationHash: declaration.declarationHash,
    descriptor: declaration.descriptor,
    exported: declaration.exported,
    fragmentIndex: declaration.fragmentIndex,
    kind: declaration.kind,
    name: declaration.name,
    namespaces: declaration.namespaces,
    sourceVisible: declaration.sourceVisible,
    statementIndex: declaration.statementIndex,
    visibility: declaration.visibility,
  };
}

function testParityImportMismatches(config, moduleIndex, testParityModules) {
  const mismatches = [];
  for (const [moduleId, module] of moduleIndex.modules) {
    if (testParityModules.has(moduleId) || tsFilePolicyFor(config, moduleId).category === "test-parity") continue;
    for (const reference of module.structure.moduleReferences ?? []) {
      if (!reference.relative || !testParityModules.has(reference.resolved)) continue;
      mismatches.push({
        id: `test-parity-import:${moduleId}:${reference.resolved}`,
        file: moduleId,
        kind: "production-imports-test-parity",
        detail: `production TypeScript module imports test-parity source '${reference.resolved}'`,
      });
    }
  }
  return mismatches;
}

function declarationContract(api, module, statement, valueEnvironment) {
  const descriptor = nonGoDeclarationSignatureDescriptor(declarationDescriptor(api, statement, {
    api,
    imports: module.descriptorImports ?? module.structure.imports,
    localNamespaces: module.structure.localNamespaceNames,
    localTypes: module.structure.localTypeNames,
    localValues: module.structure.localValueNames,
    moduleId: module.moduleId,
    text: module.text,
    valueEnvironment,
  }));
  return { descriptor, hash: hashText(canonicalSchemaValue(descriptor)), issues: declarationContractIssues(descriptor) };
}

function nonGoDeclarationSignatureDescriptor(descriptor) {
  return normalize(descriptor);

  function normalize(value) {
    if (Array.isArray(value)) return value.map(normalize);
    if (value === null || typeof value !== "object") return value;
    const result = {};
    const explicitVariableType = typeof value.declarationKind === "string" && value.missing === false;
    for (const [key, child] of Object.entries(value)) {
      if (explicitVariableType && value.initializerStatus === "unsupported" && key === "valueIssue") continue;
      result[key] = normalize(child);
    }
    return result;
  }
}

function declarationContractIssues(descriptor) {
  const issues = [];
  visit(descriptor, "declaration");
  return [...new Set(issues)].sort(compareText);

  function visit(value, path) {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) visit(item, `${path}[${index}]`);
      return;
    }
    if (typeof value !== "object") return;
    if (value.missing === true || value.missingType === true || value.missingReturnType === true) {
      issues.push(`${path} relies on an inferred TypeScript type`);
    }
    if (value.invalidConstraint !== undefined && value.invalidConstraint !== null) {
      issues.push(`${path} has an invalid generic constraint`);
    }
    if (value.valueIssue !== undefined || value.initializerIssue !== undefined) {
      issues.push(`${path} has unresolved declaration value evidence`);
    }
    if (value.t === "unsupported" || value.t === "invalidDescriptor" || String(value.kind ?? "").startsWith("unsupported")) {
      issues.push(`${path} contains unsupported declaration syntax`);
    }
    if (Array.isArray(value.unsupported) && value.unsupported.length > 0) {
      issues.push(`${path} contains unsupported declaration modifiers`);
    }
    for (const [key, child] of Object.entries(value)) visit(child, `${path}.${key}`);
  }
}

function exportAssignmentEvidence(api, module, statement, statementIndex) {
  const exported = statement.IsExportEquals === true ? "export=" : "default";
  const target = module.structure.valueExports.get("default");
  if (typeof target !== "string" || target === `${module.moduleId}::default`) {
    throw new Error(`TypeScript export assignment in '${module.moduleId}' must resolve to one named declaration target`);
  }
  const descriptor = { kind: "export-assignment", exported, target };
  return {
    contractIssues: [],
    declarationHash: hashText(canonicalSchemaValue(descriptor)),
    descriptor,
    directlyExported: true,
    exported: true,
    file: module.moduleId,
    fragmentIndex: 0,
    kind: "export-assignment",
    name: exported,
    namespaces: ["value"],
    sourceVisible: true,
    statementIndex,
    target,
    visibility: "direct-export",
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
    if (statement.name?.Text === undefined && hasDefaultModifier(api, statement)) return ["default"];
    return [statement.name?.Text ?? `<anonymous@${api.Node_Pos(statement)}>`];
  }
  return variableNames(api, statement);
}

function hasExportModifier(api, statement) {
  return (statement.modifiers?.Nodes ?? []).some((modifier) =>
    modifier.Kind === api.Kinds.KindExportKeyword || modifier.Kind === api.Kinds.KindDefaultKeyword);
}

function hasDefaultModifier(api, statement) {
  return (statement.modifiers?.Nodes ?? []).some((modifier) => modifier.Kind === api.Kinds.KindDefaultKeyword);
}

function declarationVisibility({ ambient, directlyExported, exported, sourceVisible }) {
  if (ambient) return "ambient";
  if (directlyExported) return "direct-export";
  if (exported) return "indirect-export";
  return sourceVisible ? "script-global" : "module-private";
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

function exportRouteDeclarations(module, moduleId, moduleIndex) {
  const rows = new Map();
  for (const route of module.structure.explicitExportRoutes ?? []) add(route.namespace, route.name, route.target);
  return [...rows.values()];

  function add(namespace, name, target) {
    const expandedTargets = namespace === "type-star" || namespace === "value-star"
      ? expandedStarTargets(moduleIndex, target, namespace)
      : [];
    const descriptor = { expandedTargets, file: moduleId, name, namespace, target };
    const routeHash = hashText(canonicalSchemaValue(descriptor));
    const identity = `${namespace}\0${name}\0${target}`;
    rows.set(identity, { ...descriptor, exported: true, kind: "re-export", routeHash });
  }
}

function expandedStarTargets(moduleIndex, target, namespace) {
  const targetModule = moduleIndex.modules.get(target);
  if (targetModule === undefined) throw new Error(`TypeScript star export references unavailable module '${target}'`);
  const exports = namespace === "type-star" ? targetModule.structure.typeExports : targetModule.structure.valueExports;
  return [...exports].map(([name, identity]) => ({ identity, name })).sort((left, right) =>
    compareText(left.name, right.name) || compareText(left.identity, right.identity));
}

function routeOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.namespace, right.namespace) ||
    compareText(left.name, right.name) || compareText(left.target, right.target);
}
