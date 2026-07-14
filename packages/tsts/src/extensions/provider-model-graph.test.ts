import { test } from "node:test";
import assert from "node:assert/strict";
import type { ProviderDeclarationModel, ProviderExportDeclaration, ProviderTypeExpression } from "./host.js";
import {
  canonicalizeProviderAbiModel,
  validateProviderDeclarationModelGraph,
  type ProviderDeclarationModelGraphValidation,
} from "./provider-model-graph.js";
import {
  providerBoundaryMaxArrayEntries,
  providerBoundaryMaxStringCodeUnits,
  providerBoundaryMaxTotalStringCodeUnits,
  snapshotProviderEvidenceArray,
} from "./provider-boundary-data.js";

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
  assert.ok(validation.metrics.expandedSemanticNodeAndArrayEntryCount > 0);
  assert.ok(validation.metrics.totalScalarCodeUnitCount > 0);
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
  assert.equal(failure.limit, providerBoundaryMaxArrayEntries);
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
    moduleSpecifier: "x".repeat(providerBoundaryMaxStringCodeUnits + 1),
  })), "complexity");
  assert.equal(failure.limit, providerBoundaryMaxStringCodeUnits);
});

test("provider model graph rejects aggregate scalar code units before canonicalization", () => {
  const documentation = "d".repeat(providerBoundaryMaxStringCodeUnits);
  const exports = Array.from({ length: 17 }, (_, index): ProviderExportDeclaration => ({
    id: `Documented${index}`,
    name: `Documented${index}`,
    kind: "class",
    documentation,
  }));
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({ exports })), "complexity");
  assert.equal(failure.limit, providerBoundaryMaxTotalStringCodeUnits);
});

test("provider evidence details share the provider scalar budget", () => {
  const failure = requireInvalid(validateProviderDeclarationModelGraph(baseModel({
    evidence: [{
      message: "oversized detail",
      details: { value: "x".repeat(providerBoundaryMaxStringCodeUnits + 1) },
    }],
  })), "complexity");
  assert.equal(failure.path, "$.evidence[0].details.value");
  assert.equal(failure.limit, providerBoundaryMaxStringCodeUnits);
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
