import { test } from "node:test";
import assert from "node:assert/strict";
import {
  emptyProviderClosureResourceUsage,
  reserveProviderClosureResources,
  type ProviderClosureResourceContribution,
} from "./provider-closure-resources.js";
import { providerDeclarationClosureLimits } from "./provider-resource-limits.js";

const zeroContribution: ProviderClosureResourceContribution = Object.freeze({
  snapshottedInputNodeAndCollectionEntryCount: 0,
  snapshottedInputScalarCodeUnitCount: 0,
  expandedSemanticNodeAndArrayEntryCount: 0,
  expandedSemanticScalarCodeUnitCount: 0,
  declarationSourceCodeUnitCount: 0,
});

test("provider closure resource dimensions accept their exact limits and reject limit plus one", () => {
  const cases = [{
    field: "snapshottedInputNodeAndCollectionEntryCount",
    limit: providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries,
    dimension: "snapshotted provider input nodes and collection entries",
  }, {
    field: "snapshottedInputScalarCodeUnitCount",
    limit: providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits,
    dimension: "snapshotted provider input scalar code units",
  }, {
    field: "expandedSemanticNodeAndArrayEntryCount",
    limit: providerDeclarationClosureLimits.maxExpandedSemanticNodeAndArrayEntries,
    dimension: "expanded semantic declaration nodes",
  }, {
    field: "expandedSemanticScalarCodeUnitCount",
    limit: providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits,
    dimension: "expanded semantic provider declaration scalar code units",
  }, {
    field: "declarationSourceCodeUnitCount",
    limit: providerDeclarationClosureLimits.maxDeclarationSourceCodeUnits,
    dimension: "provider declaration source code units",
  }] as const;

  for (const entry of cases) {
    const exact = reserveProviderClosureResources(emptyProviderClosureResourceUsage(), {
      ...zeroContribution,
      [entry.field]: entry.limit,
    });
    assert.equal(exact.kind, "reserved", entry.field);
    if (exact.kind !== "reserved") {
      continue;
    }
    const over = reserveProviderClosureResources(exact.usage, {
      ...zeroContribution,
      [entry.field]: 1,
    });
    assert.deepEqual(over, {
      kind: "exceeded",
      dimension: entry.dimension,
      actual: entry.limit + 1,
      limit: entry.limit,
    });
  }
});

test("provider closure resource accounting accepts the complete measured framework-scale profile", () => {
  const measuredInputEntries = 4_024_403;
  const measuredInputScalarCodeUnits = 232_199_844;
  const measuredExpandedEntries = 2_625_163;
  const measuredExpandedScalarCodeUnits = 232_240_749;
  const reservation = reserveProviderClosureResources(emptyProviderClosureResourceUsage(), {
    ...zeroContribution,
    snapshottedInputNodeAndCollectionEntryCount: measuredInputEntries,
    snapshottedInputScalarCodeUnitCount: measuredInputScalarCodeUnits,
    expandedSemanticNodeAndArrayEntryCount: measuredExpandedEntries,
    expandedSemanticScalarCodeUnitCount: measuredExpandedScalarCodeUnits,
  });
  assert.equal(reservation.kind, "reserved");
  assert.deepEqual(reservation.kind === "reserved" ? reservation.usage : undefined, {
    snapshottedInputNodeAndCollectionEntryCount: measuredInputEntries,
    snapshottedInputScalarCodeUnitCount: measuredInputScalarCodeUnits,
    expandedSemanticNodeAndArrayEntryCount: measuredExpandedEntries,
    expandedSemanticScalarCodeUnitCount: measuredExpandedScalarCodeUnits,
    declarationSourceCodeUnitCount: 0,
  });
});

test("provider closure resource accounting rejects invalid internal contributions", () => {
  const fields = Object.keys(zeroContribution) as readonly (keyof ProviderClosureResourceContribution)[];
  const invalidValues = [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1];
  for (const field of fields) {
    for (const invalidValue of invalidValues) {
      assert.throws(() => reserveProviderClosureResources(emptyProviderClosureResourceUsage(), {
        ...zeroContribution,
        [field]: invalidValue,
      }), /non-negative safe-integer accounting/, `${field}: ${invalidValue}`);
      assert.throws(() => reserveProviderClosureResources({
        ...emptyProviderClosureResourceUsage(),
        [field]: invalidValue,
      }, zeroContribution), /non-negative safe-integer accounting/, `${field}: current ${invalidValue}`);
    }
  }
  assert.throws(() => reserveProviderClosureResources({
    ...emptyProviderClosureResourceUsage(),
    snapshottedInputNodeAndCollectionEntryCount: Number.MAX_SAFE_INTEGER,
  }, {
    ...zeroContribution,
    snapshottedInputNodeAndCollectionEntryCount: 1,
  }), /non-negative safe-integer accounting/);
});
