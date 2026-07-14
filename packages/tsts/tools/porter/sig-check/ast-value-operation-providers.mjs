import { buildAstGeneratorOwnedGoValueOperationRoutes } from "../ast-generator/value-operation-routes.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { buildGeneratorOwnedGoValueOperationCatalog } from "../core/value-operations/generator-owned-providers.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import {
  auditGoValueOperationProvider,
  splitOperationIdentity,
} from "./value-operation-providers.mjs";

export function collectAstGoValueOperationProviderMismatches({
  api,
  config,
  expectedIndex,
  generatedTypeOwnership,
  moduleIndex,
  snapshot,
  valueEnvironments,
}) {
  const routes = buildAstGeneratorOwnedGoValueOperationRoutes(config, snapshot, generatedTypeOwnership);
  return auditAstGoValueOperationRoutes({
    api,
    config,
    expectedIndex,
    moduleIndex,
    routes,
    snapshot,
    valueEnvironments,
  });
}

export function auditAstGoValueOperationRoutes({
  api,
  config,
  expectedIndex,
  moduleIndex,
  routes,
  snapshot,
  valueEnvironments,
}) {
  if (!Array.isArray(routes)) throw new Error("AST Go value-operation audit requires exact generated routes");
  const inventory = [];
  const mismatches = [];
  const ownedDeclarationIds = new Set();
  const evidence = [];
  const goValueOpsIdentity = `${loadProfile(config).modules.compat}::GoValueOps`;
  for (const route of routes) {
    const { moduleId, name } = splitOperationIdentity(route.operationIdentity);
    try {
      const audited = auditGoValueOperationProvider({
        api,
        expectedIndex,
        goValueOpsIdentity,
        moduleId,
        moduleIndex,
        name,
        policy: route,
        valueEnvironments,
      });
      const provider = Object.freeze({ ...route, tsDeclarationHash: audited.tsDeclarationHash });
      evidence.push(provider);
      inventory.push({
        disposition: "generator-owned",
        ...provider,
        reason: "The AST schema generator emits exact zero and copy operations from the same pinned storage declaration.",
      });
      for (const id of audited.ownedDeclarationIds) ownedDeclarationIds.add(id);
    } catch (error) {
      mismatches.push({
        id: `go-value-ops:${route.objectId}`,
        file: moduleId,
        kind: "go-value-operation-contract-error",
        detail: `generator-owned Go value-operation provider failed closed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
  let catalog;
  if (evidence.length === routes.length) {
    try {
      catalog = buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, evidence);
    } catch (error) {
      mismatches.push({
        id: "go-value-ops:porter:ast",
        file: `${config.tsRoot.replace(/\/+$/, "")}/internal/ast/generated`,
        kind: "go-value-operation-contract-error",
        detail: `generator-owned Go value-operation catalog failed closed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
  inventory.sort((left, right) => compareText(left.objectId, right.objectId));
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
  return {
    catalog,
    checked: routes.length,
    inventory,
    mismatches,
    ownedDeclarationIds,
  };
}
