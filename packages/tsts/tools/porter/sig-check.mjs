// Signature/type equivalence check.
//
// For every ported @tsgo-unit, compare the ACTUAL TS signature (parsed from the
// .ts file with TSTS's own parser) against the EXPECTED signature derived
// DIRECTLY from the Go extractor's structured type model (resolving each named
// type to the TS module where its @tsgo-unit actually lives). Both sides become
// canonical structured descriptors and are compared structurally. Closes the gap
// where a hand-edited TS signature can drift while the Go hash, tsc build, and
// conformance baselines all stay green.

import { compareText } from "./core/deterministic-order.mjs";
import { completeAudit, notRunAudit } from "./core/declaration-audits.mjs";
import { buildPorterUnitOwnership } from "./core/unit-ownership.mjs";
import {
  declarationPrerequisiteMismatches,
  requireDeclarationAuditPrerequisites,
} from "./core/declaration-prerequisites.mjs";
import { buildIndexedModuleValueEnvironments, extractParsedFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goTypeUnitValueDescriptor, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { collectJsonTagMismatches } from "./ts-extractor/json-tags.mjs";
import { requireIndexedModule } from "./ts-extractor/module-index.mjs";
import { compareSignatures } from "./sig-check/comparison.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { collectExternalPackageSurfaceMismatches } from "./sig-check/external-package-declarations.mjs";
import { collectUntrackedTypeScriptDeclarations } from "./sig-check/untracked-declarations.mjs";
import { collectTypeStoragePolicyMismatches } from "./sig-check/type-storage-policies.mjs";
import { collectAstGoValueOperationProviderMismatches } from "./sig-check/ast-value-operation-providers.mjs";
import { collectGoValueOperationProviderMismatches } from "./sig-check/value-operation-providers.mjs";
import { buildAuditedTypeStorageCatalog } from "./sig-check/audited-type-storage.mjs";
import { buildTypeEquivalenceRelationRegistry } from "./sig-check/type-equivalence-relations.mjs";
import { buildAmbientReferenceRelationRegistry } from "./sig-check/ambient-reference-relations.mjs";
import { buildDeclarationOwnershipRegistry } from "./sig-check/declaration-ownership.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "./core/external-facades.mjs";
import { loadNonGoDeclarationManifest } from "./core/non-go-declaration-manifest.mjs";
import {
  resolveOverride,
  unitSignatureHash,
  validateOverrideUse,
  withSignatureOverrideHashes,
} from "./sig-check/overrides.mjs";

const RENDERABLE = new Set(["func", "method", "type", "constGroup", "varGroup"]);
const signatureOperationEvidence = new WeakMap();

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

export async function computeSignatureReport(preparedPrerequisites, options = {}) {
  const prerequisites = requireDeclarationAuditPrerequisites(preparedPrerequisites);
  const workspace = prerequisites.workspace;
  const deps = {
    config: workspace.config,
    snapshot: workspace.snapshot,
    repoRoot: workspace.repositoryRoot,
    tsById: new Map(workspace.tsUnits.units.map((unit) => [unit.id, unit])),
    tsFiles: workspace.tsUnits.files.filter((file) => file.metadataCount > 0),
    activeIds: prerequisites.activeIds,
    externalFacadeCatalog: workspace.externalFacadeCatalog,
  };
  const externalFacadeCatalog = requireFinalizedExternalFacadeStorageCatalog(deps.externalFacadeCatalog, deps.config, deps.snapshot);
  const idFilter = options.idFilter;
  if (idFilter !== undefined && (typeof idFilter !== "string" || idFilter.trim() === "")) {
    throw new Error("signature audit idFilter must be a non-empty glob when provided");
  }
  const wholeProgramAudit = idFilter === undefined;
  const wholeProgramAuditNotRun = () => notRunAudit(
    `The --id filter ${JSON.stringify(idFilter)} limits signature-unit comparison, so this whole-program subaudit was not run.`,
  );
  const prerequisiteMismatches = declarationPrerequisiteMismatches(prerequisites);
  if (prerequisiteMismatches.length > 0) {
    return prerequisiteBlockedReport(idFilter, prerequisiteMismatches);
  }
  const { api, conventions, generatedTypeOwnership, moduleIndex, profile } = prerequisites;
  const nonGoManifest = wholeProgramAudit
    ? deps.nonGoManifest ?? loadNonGoDeclarationManifest(deps.config, deps.repoRoot)
    : undefined;
  const overrideIssues = [];
  const unitOwnership = buildPorterUnitOwnership({
    config: deps.config,
    largeFileSplits: workspace.largeFileSplits,
    snapshot: deps.snapshot,
    tsUnits: workspace.tsUnits,
  });

  const goById = new Map();
  for (const file of deps.snapshot.files) {
    for (const unit of file.units ?? []) {
      goById.set(unit.id, { ...unit, file: { importPath: file.importPath, imports: file.imports } });
    }
  }

  const { sources } = moduleIndex;
  const valueEnvironments = buildIndexedModuleValueEnvironments(api, moduleIndex);
  const typeEquivalenceRegistry = buildTypeEquivalenceRelationRegistry({
    api,
    config: deps.config,
    moduleIndex,
    snapshot: deps.snapshot,
    valueEnvironments,
  });
  const ambientReferenceRegistry = buildAmbientReferenceRelationRegistry({ api, config: deps.config });
  const expectedIndex = buildExpectedIndex(
    deps.config,
    deps.snapshot,
    deps.tsById,
    profile,
    generatedTypeOwnership,
    { externalFacadeStorageView: externalFacadeCatalog.artifactFacades(deps.config, deps.snapshot) },
  );
  const externalExpectedIndex = wholeProgramAudit
    ? buildExpectedIndex(
      deps.config,
      deps.snapshot,
      deps.tsById,
      profile,
      generatedTypeOwnership,
      { externalFacadeStorageView: externalFacadeCatalog.auditFacades(deps.config, deps.snapshot) },
    )
    : undefined;
  const idPattern = idFilter === undefined ? undefined : globToRegExp(idFilter);
  const mismatches = [];
  let overriddenUnits = 0;
  const auditedTypeRecords = [];
  const expectedIds = new Set();
  for (const [id, go] of goById) {
    if (idPattern && !idPattern.test(id)) continue;
    if (deps.activeIds !== undefined && !deps.activeIds.has(id)) continue;
    if (RENDERABLE.has(go.kind)) expectedIds.add(id);
  }
  if (idPattern !== undefined && expectedIds.size === 0) {
    throw new Error(`signature audit --id filter ${JSON.stringify(idFilter)} matched no active renderable Go units`);
  }
  const descriptorsById = new Map();

  for (const file of deps.tsFiles) {
    const module = requireIndexedModule(moduleIndex, file.path);
    for (const unit of extractParsedFileDescriptors(api, module, profile.annotation, valueEnvironments.get(file.path))) {
      if (idPattern && !idPattern.test(unit.id)) continue;
      if (deps.activeIds !== undefined && !deps.activeIds.has(unit.id)) continue;
      const descriptors = descriptorsById.get(unit.id) ?? [];
      descriptors.push({ ...unit, file: file.path });
      descriptorsById.set(unit.id, descriptors);
    }
  }

  mismatches.push(...descriptorInventoryMismatches(expectedIds, descriptorsById));
  const jsonTags = collectJsonTagMismatches(deps.snapshot, sources, deps.tsById, deps.activeIds, {
    ...profile.jsonTags,
    api,
    moduleIndex,
  });
  const authoredFacades = wholeProgramAudit
    ? collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity: typeEquivalenceRegistry.forUseSite("authored-facade-audit"),
      config: deps.config,
      conventions,
      moduleIndex,
      profile,
      snapshot: deps.snapshot,
      valueEnvironments,
      facades: externalFacadeCatalog,
      ambientReferences: ambientReferenceRegistry.forUseSite("authored-facade-audit"),
    })
    : {
      checked: 0,
      inventory: { constructors: [], methodBindings: [], privateStorageMembers: [], tsOnlyMembers: [], unselectedGoMembers: [] },
      mismatches: [],
      ownedDeclarationIds: new Set(),
    };
  mismatches.push(...authoredFacades.mismatches);
  const typeStoragePolicies = wholeProgramAudit
    ? collectTypeStoragePolicyMismatches({
      api,
      config: deps.config,
      expectedIndex,
      generatedTypeOwnership,
      moduleIndex,
      snapshot: deps.snapshot,
      valueEnvironments,
    })
    : { checked: 0, inventory: [], mismatches: [], ownedDeclarationIds: new Set() };
  mismatches.push(...typeStoragePolicies.mismatches);
  const reviewedValueOperationProviders = wholeProgramAudit
    ? collectGoValueOperationProviderMismatches({
      api,
      config: deps.config,
      expectedIndex,
      moduleIndex,
      snapshot: deps.snapshot,
      valueEnvironments,
    })
    : { checked: 0, inventory: [], mismatches: [], ownedDeclarationIds: new Set() };
  const astValueOperationProviders = wholeProgramAudit
    ? collectAstGoValueOperationProviderMismatches({
      api,
      config: deps.config,
      expectedIndex,
      generatedTypeOwnership,
      moduleIndex,
      snapshot: deps.snapshot,
      valueEnvironments,
    })
    : { checked: 0, inventory: [], mismatches: [], ownedDeclarationIds: new Set() };
  const valueOperationProviders = combineValueOperationProviderAudits(
    reviewedValueOperationProviders,
    astValueOperationProviders,
  );
  mismatches.push(...valueOperationProviders.mismatches);
  const externalPackageSurface = wholeProgramAudit
    ? collectExternalPackageSurfaceMismatches({
      api,
      canonicalIdentity: typeEquivalenceRegistry.forUseSite("external-package-surface-audit"),
      config: deps.config,
      conventions,
      expectedIndex: externalExpectedIndex,
      moduleIndex,
      snapshot: deps.snapshot,
      valueEnvironments,
      ambientReferences: ambientReferenceRegistry.forUseSite("external-package-surface-audit"),
    })
    : { checked: 0, inventory: [], mismatches: [], ownedDeclarationIds: new Set() };
  mismatches.push(...externalPackageSurface.mismatches);
  const declarationOwnership = wholeProgramAudit
    ? buildDeclarationOwnershipRegistry([
      { owner: "authored-facade", ids: authoredFacades.ownedDeclarationIds },
      { owner: "external-package", ids: externalPackageSurface.ownedDeclarationIds },
      { owner: "go-type-storage", ids: typeStoragePolicies.ownedDeclarationIds },
      { owner: "go-value-operations", ids: valueOperationProviders.ownedDeclarationIds },
    ])
    : { ids: new Set(), inventory: [], mismatches: [] };
  mismatches.push(...declarationOwnership.mismatches);
  const untrackedTypeScript = wholeProgramAudit
    ? collectUntrackedTypeScriptDeclarations({
      api,
      annotation: profile.annotation,
      accountedDeclarationIds: declarationOwnership.ids,
      config: deps.config,
      moduleIndex,
      nonGoManifest,
      valueEnvironments,
    })
    : { exportedDeclarations: [], privateDeclarations: [], reExports: [], reviewedDeclarations: [], reviewedRoutes: [], testParityFiles: [], mismatches: [] };
  mismatches.push(...untrackedTypeScript.mismatches);

  for (const id of [...expectedIds].sort(compareText)) {
    const go = goById.get(id);
    const descriptors = descriptorsById.get(id) ?? [];
    const actual = descriptors.length === 1 ? descriptors[0].descriptor : undefined;
    const localOverride = deps.tsById.get(id)?.override;
    const result = compareSignatureUnit({
      id,
      file: deps.tsById.get(id)?.path ?? "",
      go,
      actual,
      localOverride,
      expectedIndex,
      canonicalIdentity: typeEquivalenceRegistry.forUseSite(id),
      conventions,
      ambientReferences: ambientReferenceRegistry.forUseSite(id),
      overrideIssues,
    });
    if (result.overridden) overriddenUnits++;
    mismatches.push(...result.mismatches);
    if (go.kind === "type" && result.evidence !== undefined) {
      const tsUnit = unitOwnership.tsByID.get(id);
      if (tsUnit !== undefined) auditedTypeRecords.push({
        actual: result.evidence.actual,
        expected: result.evidence.expected,
        goUnit: go,
        rawMismatches: result.evidence.rawMismatches,
        tsUnit,
        valueType: goTypeUnitValueDescriptor(go, expectedIndex),
      });
    }
  }
  const auditedTypeStorage = wholeProgramAudit
    ? buildAuditedTypeStorageCatalog({
      canonicalIdentity: typeEquivalenceRegistry.forUseSite("audited-type-storage"),
      config: deps.config,
      largeFileSplits: workspace.largeFileSplits,
      records: auditedTypeRecords,
      snapshot: deps.snapshot,
      tsUnits: workspace.tsUnits,
      unitOwnership,
    })
    : undefined;
  const typeEquivalenceRelations = wholeProgramAudit
    ? typeEquivalenceRegistry.finalize()
    : { checked: 0, inventory: [], mismatches: [] };
  mismatches.push(...typeEquivalenceRelations.mismatches);
  const ambientReferenceRelations = wholeProgramAudit
    ? ambientReferenceRegistry.finalize()
    : { checked: 0, inventory: [], mismatches: [] };
  mismatches.push(...ambientReferenceRelations.mismatches);
  const report = completeAudit({
    selection: wholeProgramAudit
      ? { kind: "all-active" }
      : { kind: "id-filter", pattern: idFilter, matchedUnitCount: expectedIds.size },
    mismatches,
    checked: expectedIds.size,
    descriptors: [...descriptorsById.values()].reduce((count, rows) => count + rows.length, 0),
    overriddenUnits,
    overrideIssues,
    jsonTags: completeAudit({ ...jsonTags, mismatchCount: jsonTags.mismatches.length }),
    authoredFacades: wholeProgramAudit
      ? completeAudit({
        checked: authoredFacades.checked,
        mismatchCount: authoredFacades.mismatches.length,
        constructorCount: authoredFacades.inventory.constructors.length,
        methodBindingCount: authoredFacades.inventory.methodBindings.length,
        privateStorageMemberCount: authoredFacades.inventory.privateStorageMembers.length,
        tsOnlyMemberCount: authoredFacades.inventory.tsOnlyMembers.length,
        unselectedGoMemberCount: authoredFacades.inventory.unselectedGoMembers.length,
        constructors: authoredFacades.inventory.constructors,
        methodBindings: authoredFacades.inventory.methodBindings,
        privateStorageMembers: authoredFacades.inventory.privateStorageMembers,
        tsOnlyMembers: authoredFacades.inventory.tsOnlyMembers,
        unselectedGoMembers: authoredFacades.inventory.unselectedGoMembers,
      })
      : wholeProgramAuditNotRun(),
    typeStoragePolicies: wholeProgramAudit
      ? completeAudit({
        checked: typeStoragePolicies.checked,
        inventory: typeStoragePolicies.inventory,
        mismatchCount: typeStoragePolicies.mismatches.length,
      })
      : wholeProgramAuditNotRun(),
    valueOperationProviders: wholeProgramAudit
      ? completeAudit({
        checked: valueOperationProviders.checked,
        inventory: valueOperationProviders.inventory,
        mismatchCount: valueOperationProviders.mismatches.length,
      })
      : wholeProgramAuditNotRun(),
    externalPackageSurface: wholeProgramAudit
      ? completeAudit({
        checked: externalPackageSurface.checked,
        inventory: externalPackageSurface.inventory,
        mismatchCount: externalPackageSurface.mismatches.length,
        resolvedProfileCount: externalPackageSurface.inventory.reduce((count, row) => count + row.resolvedProfiles.length, 0),
        unresolvedProfileCount: externalPackageSurface.inventory.reduce((count, row) => count + row.unresolvedProfiles.length, 0),
      })
      : wholeProgramAuditNotRun(),
    typeEquivalenceRelations: wholeProgramAudit
      ? completeAudit({
        checked: typeEquivalenceRelations.checked,
        inventory: typeEquivalenceRelations.inventory,
        mismatchCount: typeEquivalenceRelations.mismatches.length,
      })
      : wholeProgramAuditNotRun(),
    ambientReferenceRelations: wholeProgramAudit
      ? completeAudit({
        checked: ambientReferenceRelations.checked,
        inventory: ambientReferenceRelations.inventory,
        mismatchCount: ambientReferenceRelations.mismatches.length,
      })
      : wholeProgramAuditNotRun(),
    declarationOwnership: wholeProgramAudit
      ? completeAudit({
        checked: declarationOwnership.inventory.length,
        inventory: declarationOwnership.inventory,
        mismatchCount: declarationOwnership.mismatches.length,
      })
      : wholeProgramAuditNotRun(),
    untrackedTypeScript: wholeProgramAudit
      ? completeAudit({
        mismatchCount: untrackedTypeScript.mismatches.length,
        exportedDeclarationCount: untrackedTypeScript.exportedDeclarations.length,
        privateDeclarationCount: untrackedTypeScript.privateDeclarations.length,
        reExportCount: untrackedTypeScript.reExports.length,
        reviewedDeclarationCount: untrackedTypeScript.reviewedDeclarations.length,
        reviewedRouteCount: untrackedTypeScript.reviewedRoutes.length,
        testParityDeclarationCount: untrackedTypeScript.testParityFiles.reduce((count, file) => count + file.declarationCount, 0),
        testParityFileCount: untrackedTypeScript.testParityFiles.length,
        exportedDeclarations: untrackedTypeScript.exportedDeclarations,
        privateDeclarations: untrackedTypeScript.privateDeclarations,
        reExports: untrackedTypeScript.reExports,
        reviewedDeclarations: untrackedTypeScript.reviewedDeclarations,
        reviewedRoutes: untrackedTypeScript.reviewedRoutes,
        testParityFiles: untrackedTypeScript.testParityFiles,
      })
      : wholeProgramAuditNotRun(),
  });
  if (wholeProgramAudit) {
    signatureOperationEvidence.set(report, Object.freeze({
      auditedTypeStorage,
      generatorOwnedProviders: astValueOperationProviders.catalog,
      reviewedProviders: reviewedValueOperationProviders.reviewedCatalog,
      unitOwnership,
    }));
  }
  return report;
}

function combineValueOperationProviderAudits(...audits) {
  return {
    checked: audits.reduce((count, audit) => count + audit.checked, 0),
    inventory: audits.flatMap((audit) => audit.inventory)
      .sort((left, right) => compareText(left.objectId, right.objectId)),
    mismatches: audits.flatMap((audit) => audit.mismatches)
      .sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id)),
    ownedDeclarationIds: new Set(audits.flatMap((audit) => [...audit.ownedDeclarationIds])),
  };
}

export function requireSignatureOperationEvidence(report) {
  const evidence = signatureOperationEvidence.get(report);
  if (evidence === undefined) throw new Error("Go value-operation planning requires one complete whole-program signature audit");
  if (report.state !== "complete" || report.selection?.kind !== "all-active" ||
      !Array.isArray(report.mismatches) || report.mismatches.length !== 0 ||
      !Array.isArray(report.overrideIssues) || report.overrideIssues.length !== 0) {
    throw new Error("Go value-operation planning requires one clean whole-program signature audit with no mismatches or override issues");
  }
  const expectedKeys = ["auditedTypeStorage", "generatorOwnedProviders", "reviewedProviders", "unitOwnership"];
  const actualKeys = Object.keys(evidence).sort(compareText);
  if (actualKeys.length !== expectedKeys.length || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error(`Go value-operation evidence keys must be exactly ${expectedKeys.join(", ")}; got ${actualKeys.join(", ")}`);
  }
  for (const key of expectedKeys) {
    if (evidence[key] === undefined) throw new Error(`Go value-operation evidence '${key}' was not finalized`);
  }
  return evidence;
}

function prerequisiteBlockedReport(idFilter, mismatches) {
  const reason = `${mismatches.length} declaration prerequisite(s) failed; signature comparison was not run against an untrusted type universe.`;
  const skipped = () => notRunAudit(reason);
  return {
    state: "not-run",
    reason,
    selection: idFilter === undefined ? { kind: "all-active" } : { kind: "id-filter", pattern: idFilter, matchedUnitCount: 0 },
    mismatches,
    overrideIssues: [],
    jsonTags: skipped(),
    authoredFacades: skipped(),
    externalPackageSurface: skipped(),
    typeStoragePolicies: skipped(),
    valueOperationProviders: skipped(),
    typeEquivalenceRelations: skipped(),
    ambientReferenceRelations: skipped(),
    declarationOwnership: skipped(),
    untrackedTypeScript: skipped(),
  };
}

export function compareSignatureUnit({
  id,
  file,
  go,
  actual,
  localOverride,
  expectedIndex,
  canonicalIdentity,
  conventions,
  ambientReferences,
  overrideIssues,
}) {
  try {
    const expected = goUnitDescriptor(go, expectedIndex);
    const override = resolveOverride(localOverride, id, expected, actual, canonicalIdentity, overrideIssues, conventions, ambientReferences);
    const allMismatches = compareSignatures(expected, actual, null, canonicalIdentity, conventions, ambientReferences);
    validateOverrideUse(localOverride, allMismatches, id, overrideIssues);
    const overridden = allMismatches.some((mismatch) => override.ignore.has(mismatch.kind));
    const active = allMismatches.filter((mismatch) => !override.ignore.has(mismatch.kind));
    const result = {
      overridden,
      mismatches: withSignatureOverrideHashes(active, expected, actual, canonicalIdentity)
        .map((mismatch) => ({ id, file, ...mismatch })),
    };
    Object.defineProperty(result, "evidence", {
      value: Object.freeze({ actual, expected, rawMismatches: Object.freeze(allMismatches) }),
      enumerable: false,
    });
    return result;
  } catch (error) {
    return {
      overridden: false,
      mismatches: [{
        id,
        file,
        kind: "signature-contract-error",
        detail: `exact declaration comparison failed closed: ${error instanceof Error ? error.message : String(error)}`,
      }],
    };
  }
}

export function descriptorInventoryMismatches(expectedIds, descriptorsById) {
  const mismatches = [];
  for (const [id, descriptors] of descriptorsById) {
    if (!expectedIds.has(id)) {
      mismatches.push({
        id,
        file: descriptors[0]?.file ?? "",
        kind: "descriptor-unexpected",
        detail: "TS descriptor has no active renderable @tsgo-unit contract",
      });
    } else if (descriptors.length > 1) {
      mismatches.push({
        id,
        file: descriptors[0]?.file ?? "",
        kind: "descriptor-duplicate",
        detail: `${descriptors.length} TS descriptors were extracted for one @tsgo-unit`,
      });
    }
  }
  return mismatches.sort((left, right) => compareText(left.id, right.id) || compareText(left.kind, right.kind));
}

export { compareSignatures, resolveOverride, unitSignatureHash, validateOverrideUse, withSignatureOverrideHashes };
