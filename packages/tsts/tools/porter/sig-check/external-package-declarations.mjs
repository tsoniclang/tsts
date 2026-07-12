import { compareText } from "../core/deterministic-order.mjs";
import {
  buildExternalPackageSurfaceDeclarationIndex,
  externalPackageSurfaceValueUnit,
} from "../core/external-package-declarations.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedValueExportDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { goUnitDescriptor } from "../ts-extractor/expected-from-go-semantic.mjs";
import { compareSignatures } from "./comparison.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";

export function collectExternalPackageSurfaceMismatches({
  api,
  canonicalIdentity,
  config,
  conventions,
  expectedIndex,
  moduleIndex,
  snapshot,
  valueEnvironments,
  ambientReferences = { accept: () => false },
}) {
  const declarations = buildExternalPackageSurfaceDeclarationIndex(config, snapshot);
  const inventory = [];
  const mismatches = [];
  const ownedDeclarationIds = new Set();
  for (const entry of declarations.values()) {
    const file = `${config.tsRoot.replace(/\/+$/, "")}/${entry.tsModule}`;
    inventory.push({
      file,
      kind: entry.kind,
      name: entry.name,
      objectId: entry.objectId,
      resolvedProfiles: [...entry.byProfile.keys()].sort((left, right) => left - right),
      tsModule: entry.tsModule,
      tsName: entry.tsName,
      unresolvedProfiles: [...entry.unresolvedProfiles].sort((left, right) => left - right),
    });
    if (entry.kind === "type") {
      continue;
    }
    let actual;
    try {
      const extracted = entry.kind === "func"
        ? extractIndexedFunctionExportDescriptor(api, moduleIndex, file, entry.tsName, valueEnvironments)
        : extractIndexedValueExportDescriptor(api, moduleIndex, file, entry.tsName, valueEnvironments);
      requireDirectStorage(extracted.declarationId, file, entry.tsName);
      actual = extracted.descriptor;
      const ownershipKind = descriptorOwnershipKind(actual);
      for (const id of declarationOwnershipIds(file, entry.tsName, ownershipKind)) ownedDeclarationIds.add(id);
    } catch (error) {
      mismatches.push(contractError(entry, file, error));
      continue;
    }
    let expected;
    try {
      expected = goUnitDescriptor(externalPackageSurfaceValueUnit(entry), expectedIndex);
      if (expected.kind === "profileVariants") {
        throw new Error(`selected external package declaration changes across profiles ${expected.variants.map((row) => `[${row.profiles.join(",")}]`).join(" versus ")}`);
      }
    } catch (error) {
      mismatches.push(contractError(entry, file, error));
      continue;
    }
    try {
      for (const mismatch of compareSignatures(
        expected,
        actual,
        null,
        canonicalIdentity,
        conventions,
        ambientReferences,
      )) {
        mismatches.push({
          id: `external-package:${entry.objectId}`,
          file,
          ...mismatch,
          detail: `external package declaration '${entry.objectId}': ${mismatch.detail}`,
        });
      }
    } catch (error) {
      mismatches.push(contractError(entry, file, error));
    }
  }
  inventory.sort((left, right) => compareText(left.objectId, right.objectId));
  return { checked: inventory.length, inventory, mismatches, ownedDeclarationIds };
}

function requireDirectStorage(declarationId, file, name) {
  const expected = `${file}::${name}`;
  if (declarationId !== expected) throw new Error(`TypeScript export '${expected}' resolves to '${declarationId}' instead of exact local storage`);
}

function contractError(entry, file, error) {
  return {
    id: `external-package:${entry.objectId}`,
    file,
    kind: "external-package-contract-error",
    detail: `external package declaration failed closed: ${error instanceof Error ? error.message : String(error)}`,
  };
}
