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
import { lowerSemanticSignature, lowerSemanticType } from "../ts-extractor/semantic-type-contract.mjs";
import { compareSignatures } from "./comparison.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";
import {
  mergeExternalEvidence,
  normalizeExternalFunctionDescriptor,
  normalizeExternalValueDescriptor,
} from "./external-evidence-projection.mjs";

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
    } catch (error) {
      mismatches.push(contractError(entry, file, error));
      continue;
    }
    try {
      if (entry.kind === "func") {
        const signature = mergeExternalEvidence(
          entry.variants.flatMap(({ declaration, profiles }) => profiles.map((profile) => ({
            evidence: lowerSemanticSignature(declaration.signature, { index: expectedIndex, profile }),
            profiles: [profile],
          }))),
          `external package function '${entry.objectId}' evidence`,
        );
        expected = collapseExpectedProfiles(
          expected,
          (descriptor) => normalizeExternalFunctionDescriptor(descriptor, [signature]),
          entry,
        );
        actual = normalizeExternalFunctionDescriptor(actual, [signature]);
      } else if (entry.kind === "var") {
        const contract = mergeExternalEvidence(
          entry.variants.flatMap(({ declaration, profiles }) => profiles.map((profile) => ({
            evidence: lowerSemanticType(externalValueType(declaration, entry.objectId), { index: expectedIndex, profile }),
            profiles: [profile],
          }))),
          `external package variable '${entry.objectId}' evidence`,
        );
        expected = collapseExpectedProfiles(
          expected,
          (descriptor) => normalizeExternalValueDescriptor(descriptor, [contract]),
          entry,
        );
        actual = normalizeExternalValueDescriptor(actual, [contract]);
      } else {
        expected = collapseExpectedProfiles(expected, (descriptor) => descriptor, entry);
      }
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

function collapseExpectedProfiles(expected, normalize, entry) {
  if (expected.kind !== "profileVariants") return normalize(expected);
  const groups = new Map();
  for (const variant of expected.variants) {
    const descriptor = normalize(variant.descriptor);
    const key = JSON.stringify(descriptor);
    const row = groups.get(key) ?? { descriptor, profiles: [] };
    row.profiles.push(...variant.profiles);
    groups.set(key, row);
  }
  if (groups.size !== 1) {
    throw new Error(`selected external package declaration '${entry.objectId}' changes across profiles ${
      [...groups.values()].map((row) => `[${row.profiles.sort((left, right) => left - right).join(",")}]`).join(" versus ")}`);
  }
  return groups.values().next().value.descriptor;
}

function externalValueType(declaration, objectId) {
  const bindings = (declaration.valueSpecs ?? []).flatMap((specification) => specification.names ?? [])
    .filter((binding) => binding.object?.id === objectId);
  if (bindings.length !== 1 || bindings[0].type === undefined) {
    throw new Error(`external package value '${objectId}' has no unique exact semantic type binding`);
  }
  return bindings[0].type;
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
