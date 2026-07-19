import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionHostDiagnosticCode,
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  defineExtensionFactKey,
  deferObservation,
} from "./index.js";
import type {
  CompilerExtension,
  ExtensionDiagnostic,
  ExtensionDiagnosticStore,
  ExtensionFactStore,
  ExtensionFactWriteResult,
  TargetSemanticProvider,
  TargetConstraintValidationRequest,
} from "./index.js";

interface NestedFactValue {
  readonly label: string;
  readonly nested: {
    readonly values: readonly string[];
  };
}

function snapshotNestedFactValue(value: NestedFactValue): NestedFactValue {
  return Object.freeze({
    label: value.label,
    nested: Object.freeze({
      values: Object.freeze([...value.nested.values]),
    }),
  });
}

function snapshotText(value: string): string {
  return value;
}

function extension(
  id: string,
  initialize: NonNullable<CompilerExtension["initialize"]>,
  observationOwners: CompilerExtension["observationOwners"] = [],
): CompilerExtension {
  return {
    identity: {
      id,
      version: "1.0.0",
      capabilityNamespace: id,
    },
    observationOwners,
    initialize,
  };
}

function request(source: object = {}): TargetConstraintValidationRequest {
  return {
    source,
    constraint: { kind: "copy" },
  };
}

function diagnostic(
  extensionId: string,
  extensionCode: string,
  numericCode: number,
  message: string,
  details?: unknown,
): ExtensionDiagnostic {
  return {
    extensionId,
    extensionCode,
    numericCode,
    category: "error",
    message,
    ...(details === undefined ? {} : { evidence: [{ message: "details", details }] }),
  };
}

function assertFrozenNullPrototypeRecord(value: unknown, expectedEntries: readonly (readonly [string, unknown])[]): void {
  assert.ok(value !== null && typeof value === "object" && !Array.isArray(value));
  assert.equal(Object.getPrototypeOf(value), null);
  assert.equal(Object.isFrozen(value), true);
  assert.deepEqual(Object.entries(value), expectedEntries);
}

test("accepted hook effects commit as independent immutable fact and diagnostic snapshots", () => {
  const extensionId = "isolation.commit";
  const factKey = defineExtensionFactKey<NestedFactValue>({
    extensionId,
    name: "value",
    snapshot: snapshotNestedFactValue,
  });
  const subject = {};
  const callerFact = {
    label: "committed",
    nested: { values: ["before"] },
  };
  const callerEvidenceDetails = { stage: "before" };
  const callerDiagnostic = diagnostic(extensionId, "COMMITTED", 9210001, "committed diagnostic", callerEvidenceDetails);

  const host = new ExtensionHost({}, {
    extensions: [extension(extensionId, (context) => {
      context.diagnostics.registerDiagnosticRange(extensionId, { start: 9210000, end: 9210099 });
      context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
        assert.equal(observationContext.facts.set(
          subject,
          factKey,
          callerFact,
          [{ message: "fact evidence", details: callerEvidenceDetails }],
        ), "inserted");
        assert.equal(observationContext.diagnostics.append(callerDiagnostic), true);
        return acceptObservation(true);
      });
    }, [ExtensionObservationPoint.validateTargetConstraint])],
  });

  const result = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(),
    () => false,
    { requireOwner: true },
  );
  assert.equal(result.kind, "accept");

  callerFact.label = "mutated";
  callerFact.nested.values.push("after");
  callerEvidenceDetails.stage = "after";
  Reflect.set(callerDiagnostic, "message", "mutated diagnostic");

  const stored = host.facts.getEntry(subject, factKey);
  assert.ok(stored !== undefined);
  assert.notEqual(stored.value, callerFact);
  assert.deepEqual(stored.value, {
    label: "committed",
    nested: { values: ["before"] },
  });
  assert.equal(Object.isFrozen(stored), true);
  assert.equal(Object.isFrozen(stored.value), true);
  assert.equal(Object.isFrozen(stored.value.nested), true);
  assert.equal(Object.isFrozen(stored.value.nested.values), true);
  assert.equal(Object.isFrozen(host.facts.entries(subject)), true);
  assertFrozenNullPrototypeRecord(stored.evidence[0]?.details, [["stage", "before"]]);

  const storedDiagnostic = host.diagnostics.all().find((item) => item.extensionCode === "COMMITTED");
  assert.ok(storedDiagnostic !== undefined);
  assert.equal(storedDiagnostic.message, "committed diagnostic");
  assertFrozenNullPrototypeRecord(storedDiagnostic.evidence?.[0]?.details, [["stage", "before"]]);
  assert.equal(Object.isFrozen(storedDiagnostic), true);
  assert.equal(Object.isFrozen(storedDiagnostic.evidence), true);
  assert.equal(Object.isFrozen(host.diagnostics.all()), true);
});

test("deferred nested hook effects roll back while pre-existing facts remain exact", () => {
  const extensionId = "isolation.rollback";
  const baselineKey = defineExtensionFactKey<string>({
    extensionId,
    name: "baseline",
    snapshot: snapshotText,
  });
  const provisionalKey = defineExtensionFactKey<string>({
    extensionId,
    name: "provisional",
    snapshot: snapshotText,
  });
  const baselineSubject = {};
  const provisionalSubject = {};
  let phase: "baseline" | "defer" = "baseline";
  const host = new ExtensionHost({}, {
    extensions: [extension(extensionId, (context) => {
      context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
        if (phase === "baseline") {
          assert.equal(observationContext.facts.set(baselineSubject, baselineKey, "baseline"), "inserted");
          return acceptObservation(true);
        }
        assert.equal(observationContext.facts.get(baselineSubject, baselineKey), "baseline");
        observationContext.facts.set(provisionalSubject, provisionalKey, "discarded");
        observationContext.diagnostics.append(diagnostic(extensionId, "DISCARDED", 9211001, "discarded diagnostic"));
        return deferObservation;
      });
    }, [ExtensionObservationPoint.validateTargetConstraint])],
  });
  const baseline = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(),
    () => false,
  );
  assert.equal(baseline.kind, "accept");

  phase = "defer";
  const result = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(),
    () => true,
  );
  assert.equal(result.kind, "core");
  assert.equal(host.facts.get(baselineSubject, baselineKey), "baseline");
  assert.equal(host.facts.get(provisionalSubject, provisionalKey), undefined);
  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "DISCARDED"), false);
});

test("an invalid diagnostic write poisons every ordinary observation attempt even when ignored", () => {
  const extensionId = "isolation.invalid-diagnostic-poisons-attempt";
  const factKey = defineExtensionFactKey<string>({
    extensionId,
    name: "must-roll-back",
    snapshot: snapshotText,
  });
  const subject = {};
  const host = new ExtensionHost({}, {
    extensions: [extension(extensionId, (context) => {
      context.diagnostics.registerDiagnosticRange(extensionId, { start: 9211500, end: 9211599 });
      context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
        assert.equal(observationContext.facts.set(subject, factKey, "provisional"), "inserted");
        assert.equal(
          observationContext.diagnostics.append(diagnostic(
            extensionId,
            "OUT_OF_RANGE",
            9211600,
            "must not commit",
          )),
          false,
        );
        return acceptObservation(true);
      });
    }, [ExtensionObservationPoint.validateTargetConstraint])],
  });

  const result = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(),
    () => false,
    { requireOwner: true },
  );

  assert.equal(result.kind, "reject");
  assert.equal(host.facts.get(subject, factKey), undefined);
  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "OUT_OF_RANGE"), false);
  assert.equal(
    host.diagnostics.all().filter((item) =>
      item.numericCode === ExtensionHostDiagnosticCode.diagnosticCodeOutOfRange).length,
    1,
  );
});

test("throwing initialization rolls back resolver, range, provider-facing hook, and owner registrations", () => {
  const extensionId = "isolation.initialize-rollback";
  const succeedingExtensionId = "isolation.initialize-success";
  const factKey = defineExtensionFactKey<string>({
    extensionId,
    name: "resolved",
    snapshot: snapshotText,
  });
  const resolvedSubject = {};
  const providerIdentity: TargetSemanticProvider["identity"] = {
    id: "isolation.transactional-provider",
    version: "1.0.0",
    target: "neutral",
    extensionContractVersion: TstsProviderContractVersion,
    providerKind: "semantic",
  };
  const rejectedProvider: TargetSemanticProvider = {
    identity: providerIdentity,
  };
  const succeedingProvider: TargetSemanticProvider = {
    identity: {
      ...providerIdentity,
    },
  };
  let succeedingProviderRegistered = false;
  let succeedingRangeRegistered = false;
  const host = new ExtensionHost({}, {
    extensions: [
      extension(extensionId, (context) => {
        assert.equal(context.diagnostics.registerDiagnosticRange(extensionId, { start: 9212000, end: 9212099 }), true);
        context.factResolver.register(factKey, (subject) => subject === resolvedSubject
          ? { value: "must-roll-back" }
          : undefined);
        assert.equal(context.registerTargetSemanticProvider(rejectedProvider), true);
        context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => acceptObservation(false));
        throw new Error("initialization failed after registrations");
      }, [ExtensionObservationPoint.validateTargetConstraint]),
      extension(succeedingExtensionId, (context) => {
        succeedingRangeRegistered = context.diagnostics.registerDiagnosticRange(
          succeedingExtensionId,
          { start: 9212000, end: 9212099 },
        );
        assert.equal(context.factResolver.resolve(resolvedSubject, factKey), undefined);
        succeedingProviderRegistered = context.registerTargetSemanticProvider(succeedingProvider);
        context.registerObservation(
          ExtensionObservationPoint.validateTargetConstraint,
          () => acceptObservation(true),
        );
      }, [ExtensionObservationPoint.validateTargetConstraint]),
    ],
  });

  assert.equal(succeedingRangeRegistered, true);
  assert.equal(succeedingProviderRegistered, true);
  assert.deepEqual(host.extensions.map((item) => item.identity.id), [succeedingExtensionId]);
  assert.equal(
    host.getObservationOwner(ExtensionObservationPoint.validateTargetConstraint)?.identity.id,
    succeedingExtensionId,
  );
  assert.equal(host.factResolver.resolve(resolvedSubject, factKey), undefined);
  const result = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(),
    () => true,
  );
  assert.equal(result.kind, "accept");
  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "EXTENSION_INITIALIZE_FAILED"), true);
});

test("owner-bound capabilities reject cross-owner and out-of-scope writes", () => {
  const ownerId = "isolation.owner-a";
  const foreignId = "isolation.owner-b";
  const foreignKey = defineExtensionFactKey<string>({
    extensionId: foreignId,
    name: "foreign",
    snapshot: snapshotText,
  });
  const subject = {};
  let retainedFacts: ExtensionFactStore | undefined;
  let retainedDiagnostics: ExtensionDiagnosticStore | undefined;
  let factResult: ExtensionFactWriteResult | undefined;
  let diagnosticResult: boolean | undefined;
  let providerSpoofRejected = false;
  const host = new ExtensionHost({}, {
    extensions: [extension(ownerId, (context) => {
      context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
        retainedFacts = observationContext.facts;
        retainedDiagnostics = observationContext.diagnostics;
        factResult = observationContext.facts.set(subject, foreignKey, "spoofed");
        diagnosticResult = observationContext.diagnostics.append(diagnostic(
          foreignId,
          "SPOOFED",
          9213001,
          "spoofed diagnostic",
        ));
        assert.throws(
          () => observationContext.host.providers.registerTargetSemanticProvider({
            identity: {
              id: "isolation.provider-spoof",
              version: "1.0.0",
              target: "neutral",
              extensionContractVersion: TstsProviderContractVersion,
              providerKind: "semantic",
            },
          }),
          /must register target semantic provider state through its owner-bound initialization capability/,
        );
        providerSpoofRejected = true;
        return deferObservation;
      });
    }, [ExtensionObservationPoint.validateTargetConstraint])],
  });

  host.runObservation(ExtensionObservationPoint.validateTargetConstraint, request(), () => true);
  assert.equal(factResult, "conflict");
  assert.equal(diagnosticResult, false);
  assert.equal(providerSpoofRejected, true);
  assert.equal(host.facts.get(subject, foreignKey), undefined);
  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "SPOOFED"), false);
  assert.equal(host.diagnostics.all().some((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.factOwnershipViolation
      || item.numericCode === ExtensionHostDiagnosticCode.diagnosticOwnershipViolation), true);

  assert.ok(retainedFacts !== undefined);
  assert.ok(retainedDiagnostics !== undefined);
  assert.equal(retainedFacts.set(subject, foreignKey, "late-spoof"), "conflict");
  assert.equal(retainedDiagnostics.append(diagnostic(ownerId, "LATE", 9213002, "late diagnostic")), false);
  assert.equal(host.diagnostics.all().some((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.factOwnershipViolation
      || item.numericCode === ExtensionHostDiagnosticCode.diagnosticOwnershipViolation), true);
  assert.throws(
    () => host.registerObservation(
      ExtensionObservationPoint.validateTargetConstraint,
      ownerId,
      () => acceptObservation(false),
    ),
    /Host-owned extension registration is required/,
  );
  assert.equal(host.facts.set(subject, foreignKey, "unbound-spoof"), "conflict");
  assert.equal(host.diagnostics.append(diagnostic(ownerId, "UNBOUND", 9213003, "unbound diagnostic")), false);
});

test("failed component acquisition unwinds previously acquired checked-operation savepoints", () => {
  const host = new ExtensionHost({});
  host.facts.seal();
  const run = (): void => {
    host.runObservation(ExtensionObservationPoint.validateTargetConstraint, request(), () => true);
  };

  assert.throws(run, /Cannot begin an extension fact transaction after the fact store is sealed/);
  assert.throws(
    run,
    /Cannot begin an extension fact transaction after the fact store is sealed/,
    "A leaked first-component savepoint would instead fail strict LIFO validation on the second attempt.",
  );
});

test("semantic sealing prevents resolver-driven query-order mutation", () => {
  const extensionId = "isolation.seal";
  const factKey = defineExtensionFactKey<NestedFactValue>({
    extensionId,
    name: "resolved",
    snapshot: snapshotNestedFactValue,
  });
  const known = {};
  const unknown = {};
  let resolverCalls = 0;
  const host = new ExtensionHost({}, {
    extensions: [extension(extensionId, (context) => {
      context.factResolver.register(factKey, (subject) => {
        resolverCalls += 1;
        return subject === known
          ? { value: { label: "known", nested: { values: ["resolved"] } } }
          : undefined;
      });
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, () => {
        assert.equal(context.factResolver.resolve(known, factKey)?.label, "known");
      });
    })],
  });

  assert.throws(
    () => host.factResolver.resolve(known, factKey),
    /Extension fact resolver callbacks require a host-owned mutation transaction/,
  );
  assert.equal(resolverCalls, 0);
  host.finalizeSemantics();
  assert.equal(resolverCalls, 1);
  const finalized = host.getFactForConsumer("test", known, factKey);
  assert.equal(finalized?.label, "known");
  assert.equal(host.factResolver.resolve(unknown, factKey), undefined);
  assert.equal(host.factResolver.resolve(unknown, factKey), undefined);
  assert.equal(resolverCalls, 1, "Finalized reads must not invoke or cache resolvers in query order.");
  assert.equal(host.facts.sealed, true);
  assert.equal(host.facts.get(unknown, factKey), undefined);
  assert.throws(
    () => host.factResolver.register(factKey, () => ({
      value: { label: "late", nested: { values: [] } },
    })),
    /Cannot register an extension fact resolver/,
  );
  assert.equal(Reflect.set(finalized!, "label", "mutated"), false);
  assert.equal(host.getFactForConsumer("test", known, factKey)?.label, "known");
});

test("host-mediated fact resolution delegates across extension owners with strict LIFO authority and atomic rollback", () => {
  const leafOwner = "isolation.resolver.leaf";
  const primaryOwner = "isolation.resolver.primary";
  const consumerOwner = "isolation.resolver.consumer";
  const leafKey = defineExtensionFactKey<NestedFactValue>({
    extensionId: leafOwner,
    name: "leaf",
    snapshot: snapshotNestedFactValue,
  });
  const primaryKey = defineExtensionFactKey<NestedFactValue>({
    extensionId: primaryOwner,
    name: "primary",
    snapshot: snapshotNestedFactValue,
  });
  const consumerKey = defineExtensionFactKey<NestedFactValue>({
    extensionId: consumerOwner,
    name: "consumer",
    snapshot: snapshotNestedFactValue,
    equals: (left, right) => left.label === right.label
      && left.nested.values.length === right.nested.values.length
      && left.nested.values.every((value, index) => value === right.nested.values[index]),
  });
  const committedSubject = {};
  const rolledBackSubject = {};
  const calls: string[] = [];
  const consumerWriteResults: ExtensionFactWriteResult[] = [];
  let resolveWithPrimaryCapability: ((subject: object) => NestedFactValue | undefined) | undefined;

  const host = new ExtensionHost({}, {
    extensions: [
      extension(leafOwner, (context) => {
        context.factResolver.register(leafKey, (subject) => {
          calls.push("leaf");
          return {
            value: {
              label: subject === committedSubject ? "leaf-committed" : "leaf-rolled-back",
              nested: { values: ["leaf"] },
            },
          };
        });
      }),
      extension(primaryOwner, (context) => {
        resolveWithPrimaryCapability = (subject) => context.factResolver.resolve(subject, primaryKey);
        context.factResolver.register(primaryKey, (subject) => {
          calls.push("primary-before-leaf");
          const leaf = context.factResolver.resolve(subject, leafKey);
          calls.push("primary-after-leaf");
          if (leaf === undefined) {
            return undefined;
          }
          return {
            value: {
              label: `primary:${leaf.label}`,
              nested: { values: [...leaf.nested.values, "primary"] },
            },
          };
        });
      }),
      extension(consumerOwner, (context) => {
        context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (observationRequest, observationContext) => {
          calls.push("consumer-before-primary");
          assert.throws(
            () => resolveWithPrimaryCapability?.(observationRequest.source),
            /outside its host-owned callback scope/,
            "A consumer must not invoke another extension's owner-bound resolver capability directly.",
          );
          const resolved = observationContext.factResolver.resolve(observationRequest.source, primaryKey);
          calls.push("consumer-after-primary");
          assert.ok(resolved !== undefined);
          const consumerWriteResult = observationContext.facts.set(observationRequest.source, consumerKey, {
            label: `consumer:${resolved.label}`,
            nested: { values: [...resolved.nested.values, "consumer"] },
          });
          consumerWriteResults.push(consumerWriteResult);
          assert.ok(
            consumerWriteResult === "inserted" || consumerWriteResult === "idempotent",
            "Resolver owner authority must restore the calling observation owner exactly.",
          );
          if (observationRequest.source === rolledBackSubject) {
            throw new Error("rollback after nested cross-owner resolution");
          }
          return acceptObservation(true);
        });
      }, [ExtensionObservationPoint.validateTargetConstraint]),
    ],
  });

  const rejected = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(rolledBackSubject),
    () => true,
    { requireOwner: true },
  );
  assert.equal(rejected.kind, "reject");
  assert.equal(host.facts.get(rolledBackSubject, leafKey), undefined);
  assert.equal(host.facts.get(rolledBackSubject, primaryKey), undefined);
  assert.equal(host.facts.get(rolledBackSubject, consumerKey), undefined);
  assert.deepEqual(consumerWriteResults, ["inserted"]);

  calls.length = 0;
  const accepted = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(committedSubject),
    () => true,
    { requireOwner: true },
  );
  assert.equal(accepted.kind, "accept");
  assert.deepEqual(calls, [
    "consumer-before-primary",
    "primary-before-leaf",
    "leaf",
    "primary-after-leaf",
    "consumer-after-primary",
  ]);
  assert.equal(host.facts.get(committedSubject, leafKey)?.label, "leaf-committed");
  assert.equal(host.facts.get(committedSubject, primaryKey)?.label, "primary:leaf-committed");
  assert.equal(host.facts.get(committedSubject, consumerKey)?.label, "consumer:primary:leaf-committed");
  assert.deepEqual(consumerWriteResults, ["inserted", "inserted"]);

  calls.length = 0;
  const repeated = host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    request(committedSubject),
    () => true,
    { requireOwner: true },
  );
  assert.equal(repeated.kind, "accept");
  assert.deepEqual(calls, ["consumer-before-primary", "consumer-after-primary"]);
  assert.deepEqual(consumerWriteResults, ["inserted", "inserted", "idempotent"]);
  assert.equal(host.diagnostics.all().filter((item) => item.extensionCode === "FACT_WRITER_OWNERSHIP_VIOLATION").length, 0);
});
