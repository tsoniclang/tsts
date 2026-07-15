import { test } from "node:test";
import assert from "node:assert/strict";
import type { ProviderDeclarationModel, ProviderExportDeclaration, ProviderTypeExpression } from "./host.js";
import {
  canonicalizeProviderAbiModel,
  validateProviderDeclarationModelGraph,
  type ProviderDeclarationModelGraphValidation,
} from "./provider-model-graph.js";
import {
  snapshotProviderBoundaryData,
  snapshotProviderEvidenceArray,
} from "./provider-boundary-data.js";
import { providerAncillaryDataLimits, providerDeclarationModelLimits } from "./provider-resource-limits.js";

function baseModel(overrides: Partial<ProviderDeclarationModel> = {}): ProviderDeclarationModel {
  return {
    moduleSpecifier: "@acme/model.js",
    providerModuleId: "acme:model",
    exports: [{ id: "Token", name: "Token", kind: "class" }],
    ...overrides,
  };
}

function requireInvalid(
  validation: ProviderDeclarationModelGraphValidation,
  reason: "shape" | "cycle" | "depth" | "complexity",
): Extract<ProviderDeclarationModelGraphValidation, { readonly kind: "invalid" }> {
  assert.equal(validation.kind, "invalid");
  assert.equal(validation.reason, reason);
  return validation;
}

function requireValid(
  validation: ProviderDeclarationModelGraphValidation,
): Extract<ProviderDeclarationModelGraphValidation, { readonly kind: "valid" }> {
  assert.equal(validation.kind, "valid");
  return validation;
}

test("provider model graph reports immutable transaction metrics", () => {
  const validation = requireValid(validateProviderDeclarationModelGraph(baseModel()));
  assert.ok(validation.metrics.physicalNodeAndArrayEntryCount > 0);
  assert.ok(validation.metrics.physicalScalarCodeUnitCount > 0);
  assert.ok(validation.metrics.expandedSemanticNodeAndArrayEntryCount > 0);
  assert.ok(validation.metrics.expandedSemanticScalarCodeUnitCount > 0);
  assert.ok(Object.isFrozen(validation.metrics));
});

test("provider model graph rejects a shared-array expansion bomb with bounded work", () => {
  const sharedElement: ProviderTypeExpression = { kind: "string" };
  const sharedElements = new Array<ProviderTypeExpression>(32_700).fill(sharedElement);
  const exports = Array.from({ length: 10_900 }, (): ProviderExportDeclaration => ({
    id: "T",
    name: "T",
    kind: "type",
    type: { kind: "tuple", elementTypes: sharedElements },
  }));
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({ exports })), "complexity");
  assert.equal(failure.limit, providerDeclarationModelLimits.maxExpandedSemanticNodeAndArrayEntries);
});

test("provider model graph preserves shared array identity without treating a DAG as a cycle", () => {
  const sharedElements: readonly ProviderTypeExpression[] = [{ kind: "string" }];
  const validation = requireValid(validateProviderDeclarationModelGraph(baseModel({
    exports: [{
      id: "First",
      name: "First",
      kind: "type",
      type: { kind: "tuple", elementTypes: sharedElements },
    }, {
      id: "Second",
      name: "Second",
      kind: "type",
      type: { kind: "tuple", elementTypes: sharedElements },
    }],
  })));
  const first = validation.model.exports[0]?.type as Extract<ProviderTypeExpression, { kind: "tuple" }>;
  const second = validation.model.exports[1]?.type as Extract<ProviderTypeExpression, { kind: "tuple" }>;
  assert.equal(first.elementTypes, second.elementTypes);
});

test("provider model graph snapshots and canonicalizes source-global references exactly", () => {
  const validation = requireValid(validateProviderDeclarationModelGraph(baseModel({
    exports: [{
      id: "AsyncValue",
      name: "AsyncValue",
      kind: "type",
      type: {
        kind: "source-global",
        name: "PromiseLikeValue",
        typeArguments: [{ kind: "source-global", name: "ClockInstant" }],
      },
    }],
  })));
  const snapshot = validation.model.exports[0]?.type;
  assert.deepEqual(snapshot, {
    kind: "source-global",
    name: "PromiseLikeValue",
    typeArguments: [{ kind: "source-global", name: "ClockInstant" }],
  });

  const canonical = canonicalizeProviderAbiModel(validation.model).exports[0]?.type;
  assert.deepEqual(canonical, snapshot);
  assert.notEqual(canonical, snapshot);
});

test("provider model graph rejects a semantic object cycle through an array edge", () => {
  const cyclic = { kind: "array" } as { kind: "array"; elementType: ProviderTypeExpression };
  cyclic.elementType = cyclic;
  requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    exports: [{ id: "Cyclic", name: "Cyclic", kind: "type", type: cyclic }],
  })), "cycle");
});

test("provider family local aliases remain permanently ambiguous after three collisions", () => {
  const family = (
    id: string,
    exportName: string,
    typeArgumentCount: number,
  ): ProviderExportDeclaration => ({
    id,
    name: "Native",
    kind: "class",
    sourceTypeFamily: { exportName, typeArgumentCount },
  });
  const referenceHolder: ProviderExportDeclaration = {
    id: "Holder",
    name: "Holder",
    kind: "class",
    members: [{
      id: "Holder.Value",
      name: "Value",
      kind: "property",
      type: {
        kind: "provider-ref",
        moduleSpecifier: "@acme/model.js",
        exportName: "Native",
      },
    }],
  };
  const canonical = canonicalizeProviderAbiModel(baseModel({
    exports: [family("F0", "F", 0), family("G0", "G", 0), family("H0", "H", 0), referenceHolder],
  }));
  const holder = canonical.exports.find((declaration) => declaration.id === "Holder");
  assert.equal(holder?.members?.[0]?.type?.kind, "provider-ref");
  assert.equal((holder?.members?.[0]?.type as Extract<ProviderTypeExpression, { kind: "provider-ref" }>).exportName, "Native");
});

test("provider family local aliases normalize only at an unambiguous exact arity", () => {
  const canonical = canonicalizeProviderAbiModel(baseModel({
    exports: [{
      id: "Family0",
      name: "Native",
      kind: "class",
      sourceTypeFamily: { exportName: "Family", typeArgumentCount: 0 },
    }, {
      id: "Family1",
      name: "Native",
      kind: "class",
      sourceTypeFamily: { exportName: "Family", typeArgumentCount: 1 },
    }, {
      id: "Holder",
      name: "Holder",
      kind: "class",
      members: [{
        id: "Holder.Zero",
        name: "Zero",
        kind: "property",
        type: { kind: "provider-ref", moduleSpecifier: "@acme/model.js", exportName: "Native" },
      }, {
        id: "Holder.One",
        name: "One",
        kind: "property",
        type: {
          kind: "provider-ref",
          moduleSpecifier: "@acme/model.js",
          exportName: "Native",
          typeArguments: [{ kind: "string" }],
        },
      }],
    }],
  }));
  const holder = canonical.exports.find((declaration) => declaration.id === "Holder")!;
  assert.deepEqual(holder.members?.map((member) => (
    member.type as Extract<ProviderTypeExpression, { kind: "provider-ref" }>
  ).exportName), ["Family", "Family"]);
});

test("provider model graph rejects an oversized single string before canonicalization", () => {
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    moduleSpecifier: "x".repeat(providerDeclarationModelLimits.maxStringCodeUnits + 1),
  })), "complexity");
  assert.equal(failure.limit, providerDeclarationModelLimits.maxStringCodeUnits);
});

test("provider declaration models use a bounded SDK-scale scalar profile", () => {
  const documentation = "d".repeat(16_384);
  const exports = Array.from({ length: 48 }, (_, index): ProviderExportDeclaration => ({
    id: `Documented${index}`,
    name: `Documented${index}`,
    kind: "class",
    documentation,
  }));
  const validation = requireValid(validateProviderDeclarationModelGraph(baseModel({ exports })));
  assert.ok(validation.metrics.physicalScalarCodeUnitCount > providerAncillaryDataLimits.maxTotalScalarCodeUnits);
  assert.ok(validation.metrics.expandedSemanticScalarCodeUnitCount > providerAncillaryDataLimits.maxTotalScalarCodeUnits);
  assert.ok(validation.metrics.physicalScalarCodeUnitCount < providerDeclarationModelLimits.maxPhysicalScalarCodeUnits);
  assert.ok(validation.metrics.expandedSemanticScalarCodeUnitCount < providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits);
  assert.equal(validation.model.exports.length, exports.length);
});

test("provider declaration model scalar budget accepts its exact limit and rejects limit plus one", () => {
  const exports = Array.from({ length: 65 }, (_, index): ProviderExportDeclaration => ({
    id: `Documented${index}`,
    name: `Documented${index}`,
    kind: "class",
  }));
  const baseValidation = requireValid(validateProviderDeclarationModelGraph(baseModel({ exports })));
  const withDocumentationCodeUnits = (totalCodeUnits: number): readonly ProviderExportDeclaration[] => {
    let remaining = totalCodeUnits;
    return exports.map((declaration) => {
      const count = Math.min(remaining, providerDeclarationModelLimits.maxStringCodeUnits);
      remaining -= count;
      return count === 0 ? declaration : { ...declaration, documentation: "d".repeat(count) };
    });
  };
  const exactDocumentationCodeUnits = providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits
    - baseValidation.metrics.expandedSemanticScalarCodeUnitCount;
  const exactValidation = requireValid(validateProviderDeclarationModelGraph(baseModel({
    exports: withDocumentationCodeUnits(exactDocumentationCodeUnits),
  })));
  assert.equal(
    exactValidation.metrics.expandedSemanticScalarCodeUnitCount,
    providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits,
  );
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    exports: withDocumentationCodeUnits(exactDocumentationCodeUnits + 1),
  })), "complexity");
  assert.equal(failure.limit, providerDeclarationModelLimits.maxPhysicalScalarCodeUnits);
});

test("provider declaration physical entry budget accepts its exact limit and rejects limit plus one", () => {
  const modelWithPayload = (length: number): ProviderDeclarationModel => baseModel({
    evidence: [{ message: "entries", details: Array.from({ length }, () => 1) }],
  });
  const empty = requireValid(validateProviderDeclarationModelGraph(modelWithPayload(0)));
  const exactPayloadLength = providerDeclarationModelLimits.maxPhysicalNodeAndArrayEntries
    - empty.metrics.physicalNodeAndArrayEntryCount;
  assert.ok(exactPayloadLength > 0);
  const exact = requireValid(validateProviderDeclarationModelGraph(modelWithPayload(exactPayloadLength)));
  assert.equal(
    exact.metrics.physicalNodeAndArrayEntryCount,
    providerDeclarationModelLimits.maxPhysicalNodeAndArrayEntries,
  );
  const failure = requireInvalid(
    validateProviderDeclarationModelGraph(modelWithPayload(exactPayloadLength + 1)),
    "complexity",
  );
  assert.equal(failure.limit, providerDeclarationModelLimits.maxPhysicalNodeAndArrayEntries);
});

test("provider declaration expanded node budget accepts its exact limit and rejects limit plus one", () => {
  const modelWithType = (type: ProviderTypeExpression): ProviderDeclarationModel => baseModel({
    exports: [{ id: "Alias", name: "Alias", kind: "type", type }],
  });
  const empty = requireValid(validateProviderDeclarationModelGraph(modelWithType({
    kind: "tuple",
    elementTypes: [],
  })));
  const leaf: ProviderTypeExpression = { kind: "string" };
  let chunk: ProviderTypeExpression = { kind: "string" };
  const chunkDepth = 14;
  for (let depth = 0; depth < chunkDepth; depth++) {
    chunk = { kind: "union", types: [chunk, chunk] };
  }
  const chunkExpandedNodeCount = 2 ** (chunkDepth + 1) - 1;
  const requiredChildren = providerDeclarationModelLimits.maxExpandedSemanticNodeAndArrayEntries
    - empty.metrics.expandedSemanticNodeAndArrayEntryCount;
  const chunkCount = Math.floor(requiredChildren / chunkExpandedNodeCount);
  const leafCount = requiredChildren - chunkCount * chunkExpandedNodeCount;
  const exactElements = [
    ...Array.from({ length: chunkCount }, () => chunk),
    ...Array.from({ length: leafCount }, () => leaf),
  ];
  const exact = requireValid(validateProviderDeclarationModelGraph(modelWithType({
    kind: "tuple",
    elementTypes: exactElements,
  })));
  assert.equal(
    exact.metrics.expandedSemanticNodeAndArrayEntryCount,
    providerDeclarationModelLimits.maxExpandedSemanticNodeAndArrayEntries,
  );
  const failure = requireInvalid(validateProviderDeclarationModelGraph(modelWithType({
    kind: "tuple",
    elementTypes: [...exactElements, leaf],
  })), "complexity");
  assert.equal(failure.limit, providerDeclarationModelLimits.maxExpandedSemanticNodeAndArrayEntries);
});

test("provider declaration expanded scalar budget accepts its exact limit and rejects limit plus one", () => {
  const modelWithTypes = (elementTypes: readonly ProviderTypeExpression[]): ProviderDeclarationModel => baseModel({
    exports: [{
      id: "Alias",
      name: "Alias",
      kind: "type",
      type: { kind: "tuple", elementTypes },
    }],
  });
  const baseline = requireValid(validateProviderDeclarationModelGraph(modelWithTypes([])));
  const targetNamedType = (idLength: number): ProviderTypeExpression => ({
    kind: "target-named",
    target: "n",
    id: "i".repeat(idLength),
    sourceShape: { kind: "string" },
  });
  const minimumType = targetNamedType(1);
  const minimum = requireValid(validateProviderDeclarationModelGraph(modelWithTypes([minimumType])));
  const minimumContribution = minimum.metrics.expandedSemanticScalarCodeUnitCount
    - baseline.metrics.expandedSemanticScalarCodeUnitCount;
  const maximumType = targetNamedType(providerDeclarationModelLimits.maxStringCodeUnits);
  const maximum = requireValid(validateProviderDeclarationModelGraph(modelWithTypes([maximumType])));
  const maximumContribution = maximum.metrics.expandedSemanticScalarCodeUnitCount
    - baseline.metrics.expandedSemanticScalarCodeUnitCount;
  const requiredContribution = providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits
    - baseline.metrics.expandedSemanticScalarCodeUnitCount;
  const maximumTypeCount = Math.floor((requiredContribution - minimumContribution) / maximumContribution);
  const finalContribution = requiredContribution - maximumTypeCount * maximumContribution;
  const fixedContribution = minimumContribution - 1;
  const finalIdLength = finalContribution - fixedContribution;
  assert.ok(finalIdLength >= 1 && finalIdLength <= providerDeclarationModelLimits.maxStringCodeUnits);
  const exactElements = [
    ...Array.from({ length: maximumTypeCount }, () => maximumType),
    targetNamedType(finalIdLength),
  ];
  const exact = requireValid(validateProviderDeclarationModelGraph(modelWithTypes(exactElements)));
  assert.equal(
    exact.metrics.expandedSemanticScalarCodeUnitCount,
    providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits,
  );
  const plusOneElements = finalIdLength < providerDeclarationModelLimits.maxStringCodeUnits
    ? [...exactElements.slice(0, -1), targetNamedType(finalIdLength + 1)]
    : [
      ...exactElements.slice(0, -1),
      targetNamedType(1),
      targetNamedType(maximumContribution + 1 - 2 * fixedContribution - 1),
    ];
  const failure = requireInvalid(
    validateProviderDeclarationModelGraph(modelWithTypes(plusOneElements)),
    "complexity",
  );
  assert.equal(failure.limit, providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits);
});

test("provider model semantic scalar accounting expands shared declaration DAG uses", () => {
  const sharedType: ProviderTypeExpression = {
    kind: "target-named",
    target: "neutral",
    id: "I".repeat(providerDeclarationModelLimits.maxStringCodeUnits),
    displayName: "Native",
    sourceShape: { kind: "string" },
  };
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    exports: [{
      id: "Alias",
      name: "Alias",
      kind: "type",
      type: {
        kind: "tuple",
        elementTypes: Array.from({ length: 65 }, () => sharedType),
      },
    }],
  })), "complexity");
  assert.equal(failure.limit, providerDeclarationModelLimits.maxExpandedSemanticScalarCodeUnits);
});

test("provider evidence details share the provider scalar budget", () => {
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{
      message: "oversized detail",
      details: { value: "x".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1) },
    }],
  })), "complexity");
  assert.equal(failure.path, "$.evidence[0].details.value");
  assert.equal(failure.limit, providerAncillaryDataLimits.maxStringCodeUnits);
});

test("provider evidence retains the smaller ancillary aggregate scalar budget", () => {
  const message = "e".repeat(60_000);
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: Array.from({ length: 5 }, () => ({ message })),
  })), "complexity");
  assert.equal(failure.limit, providerAncillaryDataLimits.maxTotalScalarCodeUnits);
});

test("provider ancillary entry budget accepts its exact limit and rejects limit plus one", () => {
  const exact = snapshotProviderBoundaryData(Array.from({
    length: providerAncillaryDataLimits.maxTotalEntries - 1,
  }, () => 1));
  assert.equal(exact.kind, "valid");
  if (exact.kind === "valid") {
    assert.equal(exact.physicalNodeAndCollectionEntryCount, providerAncillaryDataLimits.maxTotalEntries);
  }
  const failure = snapshotProviderBoundaryData(Array.from({
    length: providerAncillaryDataLimits.maxTotalEntries,
  }, () => 1));
  assert.equal(failure.kind, "invalid");
  if (failure.kind === "invalid") {
    assert.equal(failure.reason, "complexity");
    assert.equal(failure.limit, providerAncillaryDataLimits.maxTotalEntries);
  }
});

test("provider ancillary scalar budget accepts its exact limit and rejects limit plus one", () => {
  const segment = "s".repeat(providerAncillaryDataLimits.maxStringCodeUnits);
  const segmentCount = providerAncillaryDataLimits.maxTotalScalarCodeUnits
    / providerAncillaryDataLimits.maxStringCodeUnits;
  assert.equal(Number.isInteger(segmentCount), true);
  const exact = snapshotProviderBoundaryData(Array.from({ length: segmentCount }, () => segment));
  assert.equal(exact.kind, "valid");
  if (exact.kind === "valid") {
    assert.equal(exact.scalarCodeUnits, providerAncillaryDataLimits.maxTotalScalarCodeUnits);
  }
  const failure = snapshotProviderBoundaryData([...Array.from({ length: segmentCount }, () => segment), "x"]);
  assert.equal(failure.kind, "invalid");
  if (failure.kind === "invalid") {
    assert.equal(failure.reason, "complexity");
    assert.equal(failure.limit, providerAncillaryDataLimits.maxTotalScalarCodeUnits);
  }
});

test("provider ancillary depth budget accepts its exact limit and rejects limit plus one", () => {
  const createChain = (length: number): unknown => {
    let current: unknown = "end";
    for (let index = 0; index < length; index++) {
      current = { next: current };
    }
    return current;
  };
  assert.equal(snapshotProviderBoundaryData(createChain(providerAncillaryDataLimits.maxDepth)).kind, "valid");
  const failure = snapshotProviderBoundaryData(createChain(providerAncillaryDataLimits.maxDepth + 1));
  assert.equal(failure.kind, "invalid");
  if (failure.kind === "invalid") {
    assert.equal(failure.reason, "depth");
    assert.equal(failure.depth, providerAncillaryDataLimits.maxDepth + 1);
    assert.equal(failure.limit, providerAncillaryDataLimits.maxDepth);
  }
});

test("provider evidence physical accounting includes container records and collection entries", () => {
  const evidenceCount = Math.floor(providerAncillaryDataLimits.maxTotalEntries / 3) + 1;
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: Array.from({ length: evidenceCount }, (_, index) => ({ message: `entry-${index}` })),
  })), "complexity");
  assert.equal(failure.limit, providerAncillaryDataLimits.maxTotalEntries);
});

test("provider evidence preserves and charges shared details once across entries", () => {
  const sharedDetails = { value: "x".repeat(60_000) };
  const snapshot = snapshotProviderEvidenceArray(Array.from({ length: 5 }, (_, index) => ({
    message: `entry-${index}`,
    details: sharedDetails,
  })));
  assert.equal(snapshot.kind, "valid");
  if (snapshot.kind !== "valid" || snapshot.value === undefined) {
    return;
  }
  const details = snapshot.value.map((entry) => entry.details);
  assert.ok(details.every((value) => value === details[0]));
  assert.ok(snapshot.scalarCodeUnits < providerAncillaryDataLimits.maxTotalScalarCodeUnits);
  assert.ok(snapshot.physicalNodeAndCollectionEntryCount < providerAncillaryDataLimits.maxTotalEntries);
});

test("provider ancillary DAG depth is checked at every shared use site", () => {
  const createChain = (length: number, tail: unknown): unknown => {
    let current = tail;
    for (let index = 0; index < length; index++) {
      current = { next: current };
    }
    return current;
  };
  const sharedTail = createChain(40, "end");
  const result = snapshotProviderBoundaryData({
    aShallow: sharedTail,
    zDeep: createChain(40, sharedTail),
  });
  assert.equal(result.kind, "invalid");
  assert.equal(result.reason, "depth");
  assert.ok((result.depth ?? 0) > providerAncillaryDataLimits.maxDepth);
  assert.equal(result.limit, providerAncillaryDataLimits.maxDepth);
});

test("provider evidence details become bounded frozen data and preserve shared DAG identity", () => {
  const shared = { value: "before" };
  const details = { first: shared, second: shared, values: [1, 2] };
  const validation = requireValid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{ message: "snapshot", details }],
  })));
  const snapshot = validation.model.evidence?.[0]?.details as {
    readonly first: { readonly value: string };
    readonly second: { readonly value: string };
    readonly values: readonly number[];
  };
  shared.value = "after";
  details.values[0] = 9;
  assert.equal(snapshot.first.value, "before");
  assert.deepEqual(snapshot.values, [1, 2]);
  assert.equal(snapshot.first, snapshot.second);
  assert.ok(Object.isFrozen(snapshot));
  assert.ok(Object.isFrozen(snapshot.first));
  assert.ok(Object.isFrozen(snapshot.values));
});

test("provider evidence details reject cycles without retaining live objects", () => {
  const details: Record<string, unknown> = {};
  details.self = details;
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{ message: "cycle", details }],
  })), "cycle");
  assert.equal(failure.firstPath, "$.evidence[0].details");
});

test("provider evidence details reject accessors without invoking them", () => {
  let getterCalls = 0;
  const details = Object.defineProperty({}, "value", {
    enumerable: true,
    get: () => {
      getterCalls++;
      return "live";
    },
  });
  requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{ message: "accessor", details }],
  })), "shape");
  assert.equal(getterCalls, 0);
});

test("provider evidence rejects throwing and revoked detail boundaries", () => {
  let detailsReads = 0;
  const evidence = Object.defineProperty({ message: "hostile" }, "details", {
    enumerable: true,
    get: () => {
      detailsReads++;
      throw new Error("must be contained");
    },
  });
  requireInvalid(validateProviderDeclarationModelGraph(baseModel({ evidence: [evidence] })), "shape");
  assert.equal(detailsReads, 0);

  const revocable = Proxy.revocable({}, {});
  revocable.revoke();
  requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{ message: "revoked", details: revocable.proxy }],
  })), "shape");
});

test("provider evidence arrays reject custom entries without invoking map or iteration", () => {
  const source = [{ message: "a" }, { message: "b" }];
  Object.defineProperty(source, "map", {
    value: () => {
      throw new Error("map must not be called");
    },
  });
  Object.defineProperty(source, Symbol.iterator, {
    value: () => {
      throw new Error("iterator must not be called");
    },
  });
  const reads = new Map<PropertyKey, number>();
  const proxy = new Proxy(source, {
    get: (target, property, receiver) => {
      reads.set(property, (reads.get(property) ?? 0) + 1);
      return Reflect.get(target, property, receiver);
    },
  });
  const snapshot = snapshotProviderEvidenceArray(proxy, "$.evidence");
  assert.equal(snapshot.kind, "invalid");
  assert.equal(reads.get("length"), undefined);
  assert.equal(reads.get("0"), undefined);
  assert.equal(reads.get("1"), undefined);
  assert.equal(reads.get("map"), undefined);
  assert.equal(reads.get(Symbol.iterator), undefined);
});

test("provider evidence rejects inherited accessors without invoking them", () => {
  let inheritedReads = 0;
  const prototype = Object.defineProperty({}, "details", {
    get: () => {
      inheritedReads++;
      return { unsafe: true };
    },
  });
  const entry = Object.create(prototype) as { message: string };
  entry.message = "inherited";
  const snapshot = snapshotProviderEvidenceArray([entry], "$.evidence");
  assert.equal(snapshot.kind, "invalid");
  assert.equal(inheritedReads, 0);
});
