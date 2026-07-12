// Signature/type equivalence check.
//
// For every ported @tsgo-unit, compare the ACTUAL TS signature (parsed from the
// .ts file with TSTS's own parser) against the EXPECTED signature derived
// DIRECTLY from the Go extractor's structured type model (resolving each named
// type to the TS module where its @tsgo-unit actually lives). Both sides become
// canonical structured descriptors and are compared structurally. Closes the gap
// where a hand-edited TS signature can drift while the Go hash, tsc build, and
// conformance baselines all stay green.

import { join } from "node:path";
import { compareText } from "./core/deterministic-order.mjs";
import { completeAudit, notRunAudit } from "./core/declaration-audits.mjs";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractParsedFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadConventions } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { collectJsonTagMismatches } from "./ts-extractor/json-tags.mjs";
import { loadTypeScriptModuleIndex, requireIndexedModule } from "./ts-extractor/module-index.mjs";
import { inspectGeneratedArtifactRegistration } from "./generated-source.mjs";
import { compareSignatures } from "./sig-check/comparison.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { collectUntrackedTypeScriptDeclarations } from "./sig-check/untracked-declarations.mjs";
import { collectTypeStoragePolicyMismatches } from "./sig-check/type-storage-policies.mjs";
import { buildTypeEquivalenceRelationRegistry } from "./sig-check/type-equivalence-relations.mjs";
import { buildAmbientReferenceRelationRegistry } from "./sig-check/ambient-reference-relations.mjs";
import { buildDeclarationOwnershipRegistry } from "./sig-check/declaration-ownership.mjs";
import {
  resolveOverride,
  unitSignatureSnapshot,
  validateOverrideUse,
  withSignatureOverrideSnapshots,
} from "./sig-check/overrides.mjs";

const RENDERABLE = new Set(["func", "method", "type", "constGroup", "varGroup"]);

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

export async function computeSignatureReport(deps, options = {}) {
  const idFilter = options.idFilter;
  if (idFilter !== undefined && (typeof idFilter !== "string" || idFilter.trim() === "")) {
    throw new Error("signature audit idFilter must be a non-empty glob when provided");
  }
  const wholeProgramAudit = idFilter === undefined;
  const wholeProgramAuditNotRun = () => notRunAudit(
    `The --id filter ${JSON.stringify(idFilter)} limits signature-unit comparison, so this whole-program subaudit was not run.`,
  );
  const profile = loadProfile(deps.config);
  const api = await loadParser({
    distRoot: join(deps.repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((directory) => join(deps.repoRoot, directory)),
  });
  const conventions = loadConventions(profile.conventions ?? {});
  const overrideIssues = [];

  const goById = new Map();
  for (const file of deps.snapshot.files) {
    for (const unit of file.units ?? []) {
      goById.set(unit.id, { ...unit, file: { importPath: file.importPath, imports: file.imports } });
    }
  }

  const moduleIndex = loadTypeScriptModuleIndex(api, deps.repoRoot, deps.config.tsRoot);
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
  const expectedIndex = buildExpectedIndex(deps.config, deps.snapshot, deps.tsById, profile, generatedTypeDeclarations(deps.config, moduleIndex));
  const idPattern = idFilter === undefined ? undefined : globToRegExp(idFilter);
  const mismatches = [];
  let overriddenUnits = 0;
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
      moduleIndex,
      snapshot: deps.snapshot,
      valueEnvironments,
    })
    : { checked: 0, inventory: [], mismatches: [], ownedDeclarationIds: new Set() };
  mismatches.push(...typeStoragePolicies.mismatches);
  const declarationOwnership = wholeProgramAudit
    ? buildDeclarationOwnershipRegistry([
      { owner: "authored-facade", ids: authoredFacades.ownedDeclarationIds },
      { owner: "go-type-storage", ids: typeStoragePolicies.ownedDeclarationIds },
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
      valueEnvironments,
    })
    : { exportedDeclarations: [], privateDeclarations: [], reExports: [], reviewedDeclarations: [], mismatches: [] };
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
  }
  const typeEquivalenceRelations = wholeProgramAudit
    ? typeEquivalenceRegistry.finalize()
    : { checked: 0, inventory: [], mismatches: [] };
  mismatches.push(...typeEquivalenceRelations.mismatches);
  const ambientReferenceRelations = wholeProgramAudit
    ? ambientReferenceRegistry.finalize()
    : { checked: 0, inventory: [], mismatches: [] };
  mismatches.push(...ambientReferenceRelations.mismatches);
  return completeAudit({
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
        exportedDeclarations: untrackedTypeScript.exportedDeclarations,
        privateDeclarations: untrackedTypeScript.privateDeclarations,
        reExports: untrackedTypeScript.reExports,
        reviewedDeclarations: untrackedTypeScript.reviewedDeclarations,
      })
      : wholeProgramAuditNotRun(),
  });
}

export function generatedTypeDeclarations(config, moduleIndex) {
  const declarations = new Map();
  const prefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  for (const [moduleId, module] of moduleIndex.modules) {
    if (!moduleId.startsWith(prefix)) throw new Error(`indexed TypeScript module '${moduleId}' is outside configured tsRoot '${config.tsRoot}'`);
    const relativePath = moduleId.slice(prefix.length);
    const registration = inspectGeneratedArtifactRegistration(relativePath, module.text);
    if (registration.error !== undefined) throw new Error(`invalid generated TypeScript artifact '${relativePath}': ${registration.error}`);
    if (registration.metadata === undefined) continue;
    for (const name of module.structure.exportedTypeNames) {
      const modules = declarations.get(name) ?? new Set();
      modules.add(moduleId);
      declarations.set(name, modules);
    }
  }
  return declarations;
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
    const override = resolveOverride(localOverride, id, expected, actual, canonicalIdentity, overrideIssues);
    const allMismatches = compareSignatures(expected, actual, null, canonicalIdentity, conventions, ambientReferences);
    validateOverrideUse(localOverride, allMismatches, id, overrideIssues);
    const overridden = allMismatches.some((mismatch) => override.ignore.has(mismatch.kind));
    const active = allMismatches.filter((mismatch) => !override.ignore.has(mismatch.kind));
    return {
      overridden,
      mismatches: withSignatureOverrideSnapshots(active, expected, actual, canonicalIdentity)
        .map((mismatch) => ({ id, file, ...mismatch })),
    };
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

export { compareSignatures, resolveOverride, unitSignatureSnapshot, validateOverrideUse, withSignatureOverrideSnapshots };
