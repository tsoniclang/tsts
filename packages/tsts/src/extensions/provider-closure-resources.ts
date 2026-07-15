import { providerDeclarationClosureLimits } from "./provider-resource-limits.js";

export interface ProviderClosureResourceUsage {
  readonly snapshottedInputNodeAndCollectionEntryCount: number;
  readonly snapshottedInputScalarCodeUnitCount: number;
  readonly expandedSemanticNodeAndArrayEntryCount: number;
  readonly expandedSemanticScalarCodeUnitCount: number;
  readonly declarationSourceCodeUnitCount: number;
}

export type ProviderClosureResourceContribution = ProviderClosureResourceUsage;

export type ProviderClosureResourceReservation =
  | { readonly kind: "reserved"; readonly usage: ProviderClosureResourceUsage }
  | {
    readonly kind: "exceeded";
    readonly dimension: string;
    readonly actual: number;
    readonly limit: number;
  };

export function emptyProviderClosureResourceUsage(): ProviderClosureResourceUsage {
  return Object.freeze({
    snapshottedInputNodeAndCollectionEntryCount: 0,
    snapshottedInputScalarCodeUnitCount: 0,
    expandedSemanticNodeAndArrayEntryCount: 0,
    expandedSemanticScalarCodeUnitCount: 0,
    declarationSourceCodeUnitCount: 0,
  });
}

export function reserveProviderClosureResources(
  current: ProviderClosureResourceUsage,
  contribution: ProviderClosureResourceContribution,
): ProviderClosureResourceReservation {
  const inputNodes = reserveProviderClosureResourceDimension(
    current.snapshottedInputNodeAndCollectionEntryCount,
    contribution.snapshottedInputNodeAndCollectionEntryCount,
    providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries,
    "snapshotted provider input nodes and collection entries",
  );
  if (inputNodes.kind === "exceeded") {
    return inputNodes;
  }
  const inputScalars = reserveProviderClosureResourceDimension(
    current.snapshottedInputScalarCodeUnitCount,
    contribution.snapshottedInputScalarCodeUnitCount,
    providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits,
    "snapshotted provider input scalar code units",
  );
  if (inputScalars.kind === "exceeded") {
    return inputScalars;
  }
  const expandedNodes = reserveProviderClosureResourceDimension(
    current.expandedSemanticNodeAndArrayEntryCount,
    contribution.expandedSemanticNodeAndArrayEntryCount,
    providerDeclarationClosureLimits.maxExpandedSemanticNodeAndArrayEntries,
    "expanded semantic declaration nodes",
  );
  if (expandedNodes.kind === "exceeded") {
    return expandedNodes;
  }
  const expandedScalars = reserveProviderClosureResourceDimension(
    current.expandedSemanticScalarCodeUnitCount,
    contribution.expandedSemanticScalarCodeUnitCount,
    providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits,
    "expanded semantic provider declaration scalar code units",
  );
  if (expandedScalars.kind === "exceeded") {
    return expandedScalars;
  }
  const declarationSource = reserveProviderClosureResourceDimension(
    current.declarationSourceCodeUnitCount,
    contribution.declarationSourceCodeUnitCount,
    providerDeclarationClosureLimits.maxDeclarationSourceCodeUnits,
    "provider declaration source code units",
  );
  if (declarationSource.kind === "exceeded") {
    return declarationSource;
  }
  return {
    kind: "reserved",
    usage: Object.freeze({
      snapshottedInputNodeAndCollectionEntryCount: inputNodes.actual,
      snapshottedInputScalarCodeUnitCount: inputScalars.actual,
      expandedSemanticNodeAndArrayEntryCount: expandedNodes.actual,
      expandedSemanticScalarCodeUnitCount: expandedScalars.actual,
      declarationSourceCodeUnitCount: declarationSource.actual,
    }),
  };
}

type ProviderClosureResourceDimensionReservation =
  | { readonly kind: "reserved"; readonly actual: number }
  | {
    readonly kind: "exceeded";
    readonly dimension: string;
    readonly actual: number;
    readonly limit: number;
  };

function reserveProviderClosureResourceDimension(
  current: number,
  contribution: number,
  limit: number,
  dimension: string,
): ProviderClosureResourceDimensionReservation {
  if (!Number.isSafeInteger(current) || current < 0
    || !Number.isSafeInteger(contribution) || contribution < 0) {
    throw new RangeError(`Provider closure resource '${dimension}' requires non-negative safe-integer accounting.`);
  }
  const actual = current + contribution;
  return Number.isSafeInteger(actual) && actual <= limit
    ? { kind: "reserved", actual }
    : { kind: "exceeded", dimension, actual, limit };
}
