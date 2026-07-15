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

test("provider closure input accounting accepts a neutral framework-scale transaction", () => {
  const measuredInputEntries = 1_058_822;
  const reservation = reserveProviderClosureResources(emptyProviderClosureResourceUsage(), {
    ...zeroContribution,
    snapshottedInputNodeAndCollectionEntryCount: measuredInputEntries,
  });
  assert.equal(reservation.kind, "reserved");
  assert.equal(
    reservation.kind === "reserved"
      ? reservation.usage.snapshottedInputNodeAndCollectionEntryCount
      : undefined,
    measuredInputEntries,
  );
});

test("provider closure resource accounting rejects invalid internal contributions", () => {
  assert.throws(() => reserveProviderClosureResources(emptyProviderClosureResourceUsage(), {
    ...zeroContribution,
    declarationSourceCodeUnitCount: -1,
  }), /non-negative safe-integer accounting/);
});
