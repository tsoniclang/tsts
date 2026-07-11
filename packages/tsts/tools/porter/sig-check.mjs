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
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractParsedFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadConventions } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { collectJsonTagMismatches } from "./ts-extractor/json-tags.mjs";
import { loadTypeScriptModuleIndex, requireIndexedModule } from "./ts-extractor/module-index.mjs";
import { createCanonicalTypeResolver } from "./ts-extractor/module-resolution.mjs";
import { compareSignatures } from "./sig-check/comparison.mjs";
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
  const {
    namedReexport,
    starReexport,
    sources,
    definedTypes,
    exportedTypes,
    typeNamespaceReexport,
    externalModules,
  } = moduleIndex;
  const valueEnvironments = buildIndexedModuleValueEnvironments(api, moduleIndex);
  const canonicalIdentity = createCanonicalTypeResolver({
    namedReexport,
    starReexport,
    definedTypes,
    exportedTypes,
    knownModules: new Set(moduleIndex.modules.keys()),
    externalModules,
    typeNamespaceReexport,
    canonicalTypeAliases: profile.canonicalTypeAliases ?? {},
  });
  const expectedIndex = buildExpectedIndex(deps.config, deps.snapshot, deps.tsById, profile);
  const idPattern = options.idFilter ? globToRegExp(options.idFilter) : undefined;
  const mismatches = [];
  let overriddenUnits = 0;
  const expectedIds = new Set();
  for (const id of deps.tsById.keys()) {
    if (idPattern && !idPattern.test(id)) continue;
    if (deps.activeIds !== undefined && !deps.activeIds.has(id)) continue;
    const go = goById.get(id);
    if (go && RENDERABLE.has(go.kind)) expectedIds.add(id);
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

  for (const id of [...expectedIds].sort(compareText)) {
    const go = goById.get(id);
    const descriptors = descriptorsById.get(id) ?? [];
    const actual = descriptors.length === 1 ? descriptors[0].descriptor : undefined;
    const expected = goUnitDescriptor(go, expectedIndex);
    const localOverride = deps.tsById.get(id)?.override;
    const override = resolveOverride(localOverride, id, expected, actual, canonicalIdentity, overrideIssues);
    const allMismatches = compareSignatures(expected, actual, null, canonicalIdentity, conventions, profile.allowedGlobals);
    validateOverrideUse(localOverride, allMismatches, id, overrideIssues);
    if (allMismatches.some((mismatch) => override.ignore.has(mismatch.kind))) overriddenUnits++;
    const activeMismatches = allMismatches.filter((mismatch) => !override.ignore.has(mismatch.kind));
    for (const mismatch of withSignatureOverrideSnapshots(activeMismatches, expected, actual, canonicalIdentity)) {
      mismatches.push({ id, file: deps.tsById.get(id)?.path ?? "", ...mismatch });
    }
  }
  return {
    mismatches,
    checked: expectedIds.size,
    descriptors: [...descriptorsById.values()].reduce((count, rows) => count + rows.length, 0),
    overriddenUnits,
    overrideIssues,
    jsonTags: { ...jsonTags, mismatchCount: jsonTags.mismatches.length },
  };
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
