import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  deferObservation,
  defineExtensionFactKey,
  rejectObservation,
  selectedTargetSignatureFactKey,
  targetOperationFactKey,
} from "./index.js";
import type {
  BeforeSemanticsFinalizedLifecycleRequest,
  CheckedOperationMappingResult,
  CheckedPropertyAccessMappingRequest,
  CompilerExtension,
  ExtensionDiagnostic,
  ExtensionDiagnosticSourceSpan,
  ExtensionFactSubject,
  ExtensionObservationPhase,
  ExtensionObservationResult,
  SelectedSourceValueEvidence,
  SelectedTargetSignatureFact,
  TargetOperationFact,
  TargetSemanticProvider,
  TargetTypeRef,
} from "./index.js";
import type { CheckedOperationReference } from "./observations.js";
import {
  extensionHostGetCheckedOperationReference,
  extensionHostRunCheckedOperation,
} from "./host.js";

const propertyObservation = ExtensionObservationPoint.mapCheckedPropertyAccess;
const arbitraryTargetIds = ["hardening-target-17", "hardening-target-29"] as const;
const transactionFactKey = defineExtensionFactKey<{ readonly value: string }>({
  extensionId: "checked-operation-finalization-hardening",
  name: "transaction",
});

test("a true 20,000-node forward checked-operation dependency chain finalizes iteratively", () => {
  const host = new ExtensionHost({});
  const subjects: ExtensionFactSubject[] = Array.from({ length: 20_000 }, () => ({}));

  for (let index = 0; index < subjects.length; index++) {
    const subject = subjects[index]!;
    const dependencySubject = subjects[index + 1];
    retainPropertyOperation(
      host,
      subject,
      dependencySubject === undefined ? undefined : propertyReference(dependencySubject),
    );
  }

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(host.diagnostics.all().length, 0, "The deep dependency chain must finalize without diagnostics.");
});

test("selected target signature equality handles 20k-deep shared target-type DAGs iteratively", () => {
  const createDeepType = (): TargetTypeRef => {
    let current: TargetTypeRef = { kind: "source-primitive", name: "int32" };
    for (let index = 0; index < 20_000; index += 1) {
      current = { kind: "array", element: current };
    }
    return current;
  };
  const leftShared = createDeepType();
  const rightShared = createDeepType();
  const leftReturnType: TargetTypeRef = {
    kind: "tuple",
    elements: Array.from({ length: 4_096 }, () => leftShared),
  };
  const rightReturnType: TargetTypeRef = {
    kind: "tuple",
    elements: Array.from({ length: 4_096 }, () => rightShared),
  };
  const sourceCall = {};
  const sourceCallee = selectedSourceValue({}, {});
  const sourceResult = selectedSourceValue(sourceCall, {});
  const selectedFact = (returnType: TargetTypeRef): SelectedTargetSignatureFact => ({
    member: {
      id: "acme.deep-equality",
      sourceName: "deepEquality",
      targetName: "deep_equality",
      kind: "method",
      parameters: [],
      returnType,
    },
    argumentConversions: [],
    sourceArgumentBindings: [],
    sourceCallKind: "call",
    sourceCallee,
    sourceArguments: [],
    sourceResult,
  });
  const host = new ExtensionHost({});
  const call = {};

  assert.equal(host.facts.set(call, selectedTargetSignatureFactKey, selectedFact(leftReturnType)), "inserted");
  assert.equal(host.facts.set(call, selectedTargetSignatureFactKey, selectedFact(rightReturnType)), "idempotent");
  assert.equal(host.diagnostics.all().length, 0, "Equivalent deep/shared target types must not conflict.");
});

test("checked-operation finalization rejects a dangling dependency", () => {
  const host = new ExtensionHost({});
  retainPropertyOperation(host, {}, propertyReference({}));

  assert.throws(() => host.finalizeSemantics(), /references missing dependency/);
  assert.equal(host.finalized, false);
});

test("checked-operation finalization rejects a dependency cycle", () => {
  const host = new ExtensionHost({});
  const first = {};
  const second = {};
  retainPropertyOperation(host, first, propertyReference(second));
  retainPropertyOperation(host, second, propertyReference(first));

  assert.throws(() => host.finalizeSemantics(), /dependency cycle/);
  assert.equal(host.finalized, false);
});

test("checked-operation provenance rejects duplicate primary operations for one subject", () => {
  const host = new ExtensionHost({});
  const subject = {};
  retainPropertyOperation(host, subject);

  const initialReference = host[extensionHostGetCheckedOperationReference](subject);
  assert.equal(initialReference?.observation, propertyObservation);
  assert.equal(initialReference?.subject, subject);

  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedOperator, {
    expression: subject,
    operator: "+",
    left: {},
    right: {},
    sourceResult: selectedSourceValue(subject, {}),
  }, () => ({ operation: operation("retained.operator", "operator") }), () => {});

  assert.throws(
    () => host[extensionHostGetCheckedOperationReference](subject),
    /multiple primary operations/,
  );
});

test("an accepted-operation apply failure leaves finalization failed and non-retryable", () => {
  const targetId = arbitraryTargetIds[0];
  const phases: ExtensionObservationPhase[] = [];
  let applyAttempts = 0;
  const extension = propertyProviderExtension("apply-failure", targetId, (_request, context) => {
    phases.push(context.phase);
    return context.phase === "checking"
      ? deferObservation
      : acceptObservation({ operation: operation("apply-failure.operation") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });
  const initial = runPropertyOperation(host, {}, targetId, "value", () => {
    applyAttempts += 1;
    throw new Error("checked-operation apply failed");
  });

  assert.equal(initial.kind, "owner-deferred");
  assert.throws(() => host.finalizeSemantics(), /checked-operation apply failed/);
  assert.equal(host.finalized, false);
  assert.equal(applyAttempts, 1);
  assert.deepEqual(phases, ["checking", "finalization"]);
  assert.throws(
    () => host.finalizeSemantics(),
    /semantic finalization previously failed and cannot be retried/,
  );
  assert.equal(applyAttempts, 1);
  assert.throws(
    () => retainPropertyOperation(host, {}),
    /record a checked operation after semantic finalization failed/,
  );
});

test("an initial accepted-operation apply failure poisons the inventory before finalization", () => {
  const targetId = arbitraryTargetIds[0];
  const insertedSubject = {};
  let applyAttempts = 0;
  let lifecycleRuns = 0;
  const extension = propertyProviderExtension("initial-apply-failure", targetId, () =>
    acceptObservation({ operation: operation("initial-apply-failure.operation") }));
  const extensionWithLifecycle: CompilerExtension = {
    ...extension,
    initialize(context): void {
      extension.initialize?.(context);
      context.registerLifecycleHook<BeforeSemanticsFinalizedLifecycleRequest>(
        ExtensionLifecycleEvent.beforeSemanticsFinalized,
        () => {
          lifecycleRuns += 1;
        },
      );
    },
  };
  const host = new ExtensionHost({}, { extensions: [extensionWithLifecycle], activeTarget: targetId });

  assert.throws(
    () => runPropertyOperation(host, {}, targetId, "value", () => {
      applyAttempts += 1;
      host.facts.set(insertedSubject, transactionFactKey, { value: "must-roll-back" });
      throw new Error("initial checked-operation apply failed");
    }),
    /initial checked-operation apply failed/,
  );

  assert.equal(host.finalized, false);
  assert.equal(applyAttempts, 1);
  assert.equal(lifecycleRuns, 0);
  assert.equal(host.facts.get(insertedSubject, transactionFactKey), undefined);
  assert.throws(
    () => host.finalizeSemantics(),
    /semantic finalization previously failed and cannot be retried/,
  );
  assert.equal(host.finalized, false);
  assert.equal(applyAttempts, 1);
  assert.equal(lifecycleRuns, 0);
  assert.throws(
    () => retainPropertyOperation(host, {}),
    /record a checked operation after semantic finalization failed/,
  );
});

test("semantic finalization rolls back lifecycle and earlier operation facts when a later apply fails", () => {
  const targetId = arbitraryTargetIds[1];
  const lifecycleSubject = {};
  const firstSubject = {};
  const secondSubject = {};
  const extensionId = "checked-operation-finalization-atomic";
  const acceptedDiagnosticCode = "EARLIER_ACCEPTED_OPERATION_DIAGNOSTIC";
  const invalidDiagnosticCode = "EARLIER_ACCEPTED_OPERATION_INVALID_CODE";
  const extension: CompilerExtension = {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
      diagnosticRange: { start: 9_910_900, end: 9_910_910 },
    },
    initialize(context): void {
      context.registerLifecycleHook<BeforeSemanticsFinalizedLifecycleRequest>(
        ExtensionLifecycleEvent.beforeSemanticsFinalized,
        (_request, lifecycleContext) => {
          lifecycleContext.host.facts.set(lifecycleSubject, transactionFactKey, { value: "lifecycle" });
        },
      );
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target: targetId,
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedPropertyAccess: (request, observationContext) => {
          if (observationContext.phase === "checking") {
            return deferObservation;
          }
          if (request.propertyName === "first") {
            observationContext.diagnostics.append(attemptDiagnostic(extensionId, acceptedDiagnosticCode));
            observationContext.diagnostics.append({
              ...attemptDiagnostic(extensionId, invalidDiagnosticCode),
              numericCode: 9_910_999,
            });
          }
          return acceptObservation({ operation: operation(`atomic.${request.propertyName}`) });
        },
      }), true);
    },
  };
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  runPropertyOperation(host, firstSubject, targetId, "first", () => {
    host.facts.set(firstSubject, transactionFactKey, { value: "first" });
  });
  runPropertyOperation(host, secondSubject, targetId, "second", () => {
    host.facts.set(secondSubject, transactionFactKey, { value: "second" });
    throw new Error("second finalization apply failed");
  });

  assert.throws(() => host.finalizeSemantics(), /second finalization apply failed/);
  assert.equal(host.finalized, false);
  assert.equal(host.facts.get(lifecycleSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(firstSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(secondSubject, transactionFactKey), undefined);
  assert.equal(
    host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === acceptedDiagnosticCode).length,
    0,
    "An extension diagnostic committed by an earlier operation must roll back with the failed finalization transaction.",
  );
  assert.equal(
    host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "DIAGNOSTIC_CODE_OUT_OF_RANGE").length,
    1,
    "The host-owned invariant diagnostic must survive finalization rollback.",
  );
});

test("deferred checked-operation attempts roll back provisional facts during checking and replay", () => {
  const targetId = arbitraryTargetIds[0];
  const provisionalSubject = {};
  let attempts = 0;
  const extension = propertyProviderExtension("deferred-fact-rollback", targetId, (_request, context) => {
    attempts += 1;
    context.facts.set(provisionalSubject, transactionFactKey, { value: `attempt-${attempts}` });
    return deferObservation;
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const initial = runPropertyOperation(host, {}, targetId, "value", () => {
    assert.fail("deferred checked operation was applied");
  });

  assert.equal(initial.kind, "owner-deferred");
  assert.equal(host.facts.get(provisionalSubject, transactionFactKey), undefined);
  host.finalizeSemantics();
  assert.equal(attempts, 2);
  assert.equal(host.facts.get(provisionalSubject, transactionFactKey), undefined);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED").length, 1);
});

test("deferred candidate diagnostics roll back and the same identity can commit on accepted replay", () => {
  const targetId = arbitraryTargetIds[0];
  const extensionCode = "CHECKED_CANDIDATE_PHASE_DIAGNOSTIC";
  const extensionId = "checked-operation-finalization-candidate-diagnostic-replay";
  const extension = propertyProviderExtension("candidate-diagnostic-replay", targetId, (_request, context) => {
    const diagnostic = { ...attemptDiagnostic(context.extensionId, extensionCode) };
    const originalIdentity = diagnostic.identity;
    context.diagnostics.append(diagnostic);
    if (context.phase === "checking") {
      diagnostic.identity = `${originalIdentity}:mutated-after-append`;
      return deferObservation;
    }
    return acceptObservation({ operation: operation("candidate-diagnostic.accepted") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const initial = runPropertyOperation(host, {}, targetId, "value", () => {});

  assert.equal(initial.kind, "owner-deferred");
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === extensionCode).length, 0);
  host.finalizeSemantics();
  assert.equal(host.finalized, true);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === extensionCode).length, 1);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED").length, 0);
  assert.equal(
    host.diagnostics.append(attemptDiagnostic(extensionId, extensionCode)),
    false,
    "The committed original identity must remain deduplicated after the rolled-back object was mutated.",
  );
});

test("rejected and throwing checked-operation hooks roll back facts but retain diagnostics", () => {
  for (const outcome of ["reject", "throw"] as const) {
    const targetId = arbitraryTargetIds[0];
    const provisionalSubject = {};
    const provisionalDiagnosticCode = `PROVISIONAL_${outcome.toUpperCase()}_DIAGNOSTIC`;
    const extension = propertyProviderExtension(`failed-hook-${outcome}`, targetId, (request, context) => {
      context.facts.set(provisionalSubject, transactionFactKey, { value: outcome });
      context.diagnostics.append(attemptDiagnostic(context.extensionId, provisionalDiagnosticCode));
      if (outcome === "throw") {
        throw new Error("intentional checked hook failure");
      }
      return rejectObservation({
        extensionId: context.extensionId,
        extensionCode: "INTENTIONAL_CHECKED_REJECTION",
        numericCode: 9910901,
        category: "error",
        message: "Intentional checked-operation rejection.",
        nodeOrSpan: request.expression,
        identity: `intentional-checked-rejection-${outcome}`,
      });
    });
    const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

    const result = runPropertyOperation(host, {}, targetId, "value", () => {
      assert.fail("failed checked hook was applied");
    });

    assert.equal(result.kind, "reject");
    assert.equal(host.facts.get(provisionalSubject, transactionFactKey), undefined);
    assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === provisionalDiagnosticCode).length, 0);
    assert.equal(
      host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === (outcome === "throw" ? "OBSERVATION_HOOK_FAILED" : "INTENTIONAL_CHECKED_REJECTION")).length,
      1,
    );
    host.finalizeSemantics();
    assert.equal(host.finalized, true);
  }
});

test("an unavailable child blocks its parent without evaluating or applying the parent", () => {
  const targetId = arbitraryTargetIds[0];
  const child = {};
  const parent = {};
  let childRuns = 0;
  let parentRuns = 0;
  let parentApplications = 0;
  const extension = propertyProviderExtension("blocked-parent", targetId, (request, context) => {
    if (request.propertyName === "child") {
      childRuns += 1;
      return rejectObservation({
        extensionId: context.extensionId,
        extensionCode: "INTENTIONAL_CHILD_REJECTION",
        numericCode: 9910901,
        category: "error",
        message: "Intentional child rejection.",
        nodeOrSpan: request.expression,
        identity: "checked-operation-finalization:blocked-parent:child",
      });
    }
    parentRuns += 1;
    return acceptObservation({ operation: operation("blocked-parent.parent") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const childResult = runPropertyOperation(host, child, targetId, "child", () => {
    assert.fail("The rejected child must not apply.");
  });
  const parentResult = host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest(parent, child, "parent", targetId), () => {
    throw new Error("The blocked provider-owned parent reached core.");
  }, (accepted) => {
    parentApplications += 1;
    host.facts.set(parent, targetOperationFactKey, accepted.operation);
  }, { requireOwner: true }, undefined, [propertyReference(child)]);

  assert.equal(childResult.kind, "reject");
  assert.equal(parentResult.kind, "owner-deferred");
  assert.equal(childRuns, 1);
  assert.equal(parentRuns, 0);
  host.finalizeSemantics();
  assert.equal(parentRuns, 0, "A parent whose dependency is unavailable must never be replayed.");
  assert.equal(parentApplications, 0);
  assert.equal(host.facts.get(parent, targetOperationFactKey), undefined);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "INTENTIONAL_CHILD_REJECTION").length, 1);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED").length, 0);
  assert.equal(host.finalized, true);
});

test("apply-discovered child operations survive rollback and finalize before their parent", () => {
  const targetId = arbitraryTargetIds[0];
  const parent = {};
  const acceptedChild = {};
  const acceptedChildReceiver = {};
  const deferredChild = {};
  const deferredChildReceiver = {};
  const acceptedChildRequest = checkedPropertyRequest(acceptedChild, acceptedChildReceiver, "acceptedChild", targetId);
  const deferredChildRequest = checkedPropertyRequest(deferredChild, deferredChildReceiver, "deferredChild", targetId);
  const applicationOrder: string[] = [];
  const extension = propertyProviderExtension("apply-discovered-children", targetId, (request, context) => {
    if (request.propertyName === "deferredChild" && context.phase === "checking") {
      return deferObservation;
    }
    return acceptObservation({ operation: operation(`apply-discovered.${request.propertyName}`) });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const initial = host[extensionHostRunCheckedOperation](
    propertyObservation,
    checkedPropertyRequest(parent, {}, "parent", targetId),
    () => {
      throw new Error("The provider-owned parent reached core.");
    },
    (accepted) => {
      const acceptedChildResult = host[extensionHostRunCheckedOperation](
        propertyObservation,
        acceptedChildRequest,
        () => {
          throw new Error("The provider-owned accepted child reached core.");
        },
        (child) => {
          applicationOrder.push("acceptedChild");
          host.facts.set(acceptedChild, targetOperationFactKey, child.operation);
        },
        { requireOwner: true },
      );
      if (acceptedChildResult.kind !== "accept") {
        return { kind: "deferred", unresolved: propertyReference(acceptedChild) };
      }
      const deferredChildResult = host[extensionHostRunCheckedOperation](
        propertyObservation,
        deferredChildRequest,
        () => {
          throw new Error("The provider-owned deferred child reached core.");
        },
        (child) => {
          applicationOrder.push("deferredChild");
          host.facts.set(deferredChild, targetOperationFactKey, child.operation);
        },
        { requireOwner: true },
      );
      if (deferredChildResult.kind !== "accept") {
        return { kind: "deferred", unresolved: propertyReference(deferredChild) };
      }
      applicationOrder.push("parent");
      host.facts.set(parent, targetOperationFactKey, accepted.operation);
    },
    { requireOwner: true },
  );

  assert.equal(initial.kind, "owner-deferred");
  assert.equal(host.facts.get(acceptedChild, targetOperationFactKey), undefined);
  assert.equal(host.facts.get(deferredChild, targetOperationFactKey), undefined);
  assert.equal(host.facts.get(parent, targetOperationFactKey), undefined);
  applicationOrder.length = 0;

  host.finalizeSemantics();

  assert.deepEqual(applicationOrder, ["acceptedChild", "deferredChild", "parent"]);
  assert.equal(host.facts.get(acceptedChild, targetOperationFactKey)?.targetOperation, "apply-discovered.acceptedChild");
  assert.equal(host.facts.get(deferredChild, targetOperationFactKey)?.targetOperation, "apply-discovered.deferredChild");
  assert.equal(host.facts.get(parent, targetOperationFactKey)?.targetOperation, "apply-discovered.parent");
  assert.equal(host.diagnostics.all().length, 0);
  assert.equal(host.finalized, true);
});

test("a deferred apply outcome must name an exact retained child operation", () => {
  const targetId = arbitraryTargetIds[0];
  const parent = {};
  const missingChild = {};
  const extension = propertyProviderExtension("missing-apply-child", targetId, () => {
    return acceptObservation({ operation: operation("missing-apply-child.parent") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  assert.throws(
    () => host[extensionHostRunCheckedOperation](
      propertyObservation,
      checkedPropertyRequest(parent, {}, "parent", targetId),
      () => {
        throw new Error("The provider-owned parent reached core.");
      },
      () => ({ kind: "deferred", unresolved: propertyReference(missingChild) }),
      { requireOwner: true },
    ),
    /deferred on an operation that was not retained/,
  );
  assert.equal(host.facts.get(parent, targetOperationFactKey), undefined);
  assert.throws(() => host.finalizeSemantics(), /previously failed/);
  assert.equal(host.finalized, false);
});

test("a deferred hook cannot leak facts to a later accepting hook", () => {
  const provisionalSubject = {};
  const acceptedSubject = {};
  let laterHookSawProvisionalFact = false;
  const first = observationExtension("deferred-fact-writer", (request, context) => {
    context.facts.set(provisionalSubject, transactionFactKey, { value: "provisional" });
    return deferObservation;
  });
  const second = observationExtension("accepting-fact-reader", (_request, context) => {
    laterHookSawProvisionalFact = context.facts.has(provisionalSubject, transactionFactKey);
    context.facts.set(acceptedSubject, transactionFactKey, { value: "accepted" });
    return acceptObservation({ operation: operation("accepted.after-defer") });
  });
  const host = new ExtensionHost({}, { extensions: [first, second] });

  const result = host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest({}, {}, "value"), () => {
    throw new Error("accepting observation unexpectedly reached core");
  }, () => {});

  assert.equal(result.kind, "accept");
  assert.equal(laterHookSawProvisionalFact, false);
  assert.equal(host.facts.get(provisionalSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(acceptedSubject, transactionFactKey)?.value, "accepted");
});

test("conflicting accepted hooks roll back every hook fact", () => {
  const firstSubject = {};
  const secondSubject = {};
  const first = observationExtension("conflicting-fact-writer-one", (_request, context) => {
    context.facts.set(firstSubject, transactionFactKey, { value: "first" });
    context.diagnostics.append(attemptDiagnostic(context.extensionId, "PROVISIONAL_CONFLICT_ONE"));
    return acceptObservation({ operation: operation("conflict.first") });
  });
  const second = observationExtension("conflicting-fact-writer-two", (_request, context) => {
    context.facts.set(secondSubject, transactionFactKey, { value: "second" });
    context.diagnostics.append(attemptDiagnostic(context.extensionId, "PROVISIONAL_CONFLICT_TWO"));
    return acceptObservation({ operation: operation("conflict.second") });
  });
  const host = new ExtensionHost({}, { extensions: [first, second] });

  const result = host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest({}, {}, "value"), () => {
    throw new Error("conflicting observation unexpectedly reached core");
  }, () => {});

  assert.equal(result.kind, "conflict");
  assert.equal(host.facts.get(firstSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(secondSubject, transactionFactKey), undefined);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode.startsWith("PROVISIONAL_CONFLICT_")).length, 0);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_CONFLICT").length, 1);
});

for (const orderedFirstValue of ["first", "second"] as const) {
  test(`accepted observation candidates are isolated before arbitration when '${orderedFirstValue}' is ordered first`, () => {
    const sharedSubject = {};
    let absentObservations = 0;
    const candidate = (extensionId: string, value: string): CompilerExtension => observationExtension(extensionId, (_request, context) => {
      if (context.facts.has(sharedSubject, transactionFactKey)) {
        return deferObservation;
      }
      absentObservations += 1;
      context.facts.set(sharedSubject, transactionFactKey, { value });
      return acceptObservation({ operation: operation(`candidate.${value}`) });
    });
    const first = candidate("candidate-a", orderedFirstValue);
    const second = candidate("candidate-b", orderedFirstValue === "first" ? "second" : "first");
    const host = new ExtensionHost({}, { extensions: [first, second] });

    const result = host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest({}, {}, "value"), () => {
      throw new Error("conflicting isolated candidates unexpectedly reached core");
    }, () => {});

    assert.equal(result.kind, "conflict");
    assert.equal(absentObservations, 2);
    assert.equal(host.facts.get(sharedSubject, transactionFactKey), undefined);
    assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_CONFLICT").length, 1);
  });
}

for (const outcome of ["reject", "throw"] as const) {
  for (const failingFirst of [true, false] as const) {
    test(`${outcome} candidate effects remain invisible to a sibling ordered ${failingFirst ? "after" : "before"} it`, () => {
      const provisionalSubject = {};
      const provisionalDiagnosticCode = `PROVISIONAL_${outcome.toUpperCase()}_ARBITRATION_DIAGNOSTIC`;
      const finalDiagnosticCode = outcome === "throw" ? "OBSERVATION_HOOK_FAILED" : "ARBITRATION_REJECTION";
      let observerRuns = 0;
      let observerSawProvisionalFact = false;
      let observerSawCandidateDiagnostic = false;
      const failure = observationExtension(
        failingFirst ? "candidate-a-failure" : "candidate-b-failure",
        (request, context) => {
          context.facts.set(provisionalSubject, transactionFactKey, { value: outcome });
          context.diagnostics.append(attemptDiagnostic(context.extensionId, provisionalDiagnosticCode));
          if (outcome === "throw") {
            throw new Error("intentional candidate arbitration failure");
          }
          return rejectObservation({
            extensionId: context.extensionId,
            extensionCode: finalDiagnosticCode,
            numericCode: 9910901,
            category: "error",
            message: "Intentional candidate arbitration rejection.",
            nodeOrSpan: request.expression,
            identity: `checked-operation-finalization-hardening:${outcome}:${failingFirst}:rejection`,
          });
        },
      );
      const observer = observationExtension(
        failingFirst ? "candidate-b-observer" : "candidate-a-observer",
        (_request, context) => {
          observerRuns += 1;
          observerSawProvisionalFact = context.facts.has(provisionalSubject, transactionFactKey);
          observerSawCandidateDiagnostic = context.diagnostics.all().some((diagnostic) =>
            diagnostic.extensionCode === provisionalDiagnosticCode
            || diagnostic.extensionCode === finalDiagnosticCode
            || diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED"
          );
          return deferObservation;
        },
      );
      const host = new ExtensionHost({}, { extensions: [failure, observer] });

      const result = host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest({}, {}, "value"), () => {
        throw new Error("rejected observation unexpectedly reached core");
      }, () => {
        assert.fail("A rejected observation must not be applied.");
      });

      assert.equal(result.kind, "reject");
      assert.equal(observerRuns, 1);
      assert.equal(observerSawProvisionalFact, false);
      assert.equal(observerSawCandidateDiagnostic, false);
      assert.equal(host.facts.get(provisionalSubject, transactionFactKey), undefined);
      assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === provisionalDiagnosticCode).length, 0);
      assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === finalDiagnosticCode).length, 1);
    });
  }
}

test("a failed candidate capture rolls back facts and diagnostics exactly once before the next operation", () => {
  const targetId = arbitraryTargetIds[0];
  const failedSubject = {};
  const successfulSubject = {};
  const provisionalDiagnosticCode = "PROVISIONAL_FAILED_CAPTURE_DIAGNOSTIC";
  let applications = 0;
  const extension = propertyProviderExtension("failed-write-poisons-attempt", targetId, (request, context) => {
    if (request.propertyName === "fail") {
      context.facts.set(failedSubject, transactionFactKey, { value: "first" });
      context.facts.set(failedSubject, transactionFactKey, { value: "conflict" });
      context.diagnostics.append(attemptDiagnostic(context.extensionId, provisionalDiagnosticCode));
      return acceptObservation({ operation: operation("must-not-commit") });
    }
    context.facts.set(successfulSubject, transactionFactKey, { value: "successful" });
    return acceptObservation({ operation: operation("commits-after-failed-capture") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const failed = runPropertyOperation(host, {}, targetId, "fail", () => {
    applications += 1;
  });
  const successful = runPropertyOperation(host, {}, targetId, "succeed", () => {
    applications += 1;
  });

  assert.equal(failed.kind, "reject");
  assert.equal(successful.kind, "accept");
  assert.equal(applications, 1);
  assert.equal(host.facts.get(failedSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(successfulSubject, transactionFactKey)?.value, "successful");
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === provisionalDiagnosticCode).length, 0);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED").length, 1);
  host.finalizeSemantics();
  assert.equal(host.finalized, true, "Exactly-once rollback must leave no active savepoint or finalization wedge.");
});

test("an observation hook cannot seal the fact store inside an active attempt", () => {
  const targetId = arbitraryTargetIds[0];
  const followupSubject = {};
  const extension = propertyProviderExtension("hook-seal-rejection", targetId, (_request, context) => {
    context.facts.seal();
    return acceptObservation({ operation: operation("must-not-commit") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const result = runPropertyOperation(host, {}, targetId, "value", () => {
    assert.fail("A hook that attempted to seal the fact store must not be applied.");
  });

  assert.equal(result.kind, "reject");
  assert.equal(host.facts.sealed, false);
  assert.equal(host.facts.set(followupSubject, transactionFactKey, { value: "usable" }), "inserted");
  host.finalizeSemantics();
  assert.equal(host.finalized, true);
  assert.equal(host.facts.get(followupSubject, transactionFactKey)?.value, "usable");
});

test("immediate observation apply failure rolls back hook facts, apply facts, and child operation records", () => {
  const hookSubject = {};
  const applySubject = {};
  const childExpression = {};
  let childCoreRuns = 0;
  const extensionId = "immediate-apply-atomicity";
  const extension: CompilerExtension = {
    identity: { id: extensionId, version: "1.0.0", capabilityNamespace: extensionId },
    observationOwners: [ExtensionObservationPoint.validateTargetConstraint],
    initialize(context): void {
      context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
        observationContext.facts.set(hookSubject, transactionFactKey, { value: "hook" });
        return acceptObservation(true);
      });
    },
  };
  const host = new ExtensionHost({}, { extensions: [extension] });
  const runChild = (): void => {
    host[extensionHostRunCheckedOperation](propertyObservation, checkedPropertyRequest(childExpression, {}, "child"), () => {
      childCoreRuns += 1;
      return { operation: operation("child.operation") };
    }, () => {});
  };

  assert.throws(() => host.runObservation(
    ExtensionObservationPoint.validateTargetConstraint,
    { source: {}, constraint: { kind: "implements", contract: "Acme.Atomic" } },
    () => false,
    { requireOwner: true },
    () => {
      host.facts.set(applySubject, transactionFactKey, { value: "apply" });
      runChild();
      throw new Error("immediate apply failed");
    },
  ), /immediate apply failed/);

  assert.equal(host.facts.get(hookSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(applySubject, transactionFactKey), undefined);
  assert.equal(childCoreRuns, 1);
  runChild();
  assert.equal(childCoreRuns, 2, "The child must be evaluated again after its rolled-back record is removed.");
  host.finalizeSemantics();
  assert.equal(host.finalized, true);
});

test("a throwing lifecycle hook rolls back checked operations created by that hook", () => {
  const childExpression = {};
  const extensionId = "lifecycle-operation-rollback";
  const extension: CompilerExtension = {
    identity: { id: extensionId, version: "1.0.0", capabilityNamespace: extensionId },
    initialize(context): void {
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        retainPropertyOperation(lifecycleContext.host, childExpression);
        throw new Error("lifecycle operation must roll back");
      });
    },
  };
  const host = new ExtensionHost({}, { extensions: [extension] });

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(host[extensionHostGetCheckedOperationReference](childExpression), undefined);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "LIFECYCLE_HOOK_FAILED").length, 1);
});

test("duplicate primary operations fail during finalization without requiring a provenance query", () => {
  const host = new ExtensionHost({});
  const subject = {};
  retainPropertyOperation(host, subject);
  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedOperator, {
    expression: subject,
    operator: "+",
    left: {},
    right: {},
    sourceResult: selectedSourceValue(subject, {}),
  }, () => ({ operation: operation("duplicate.operator", "operator") }), () => {});

  assert.throws(() => host.finalizeSemantics(), /multiple primary operations/);
  assert.equal(host.finalized, false);
});

test("fact resolver conflicts return no fabricated value and resolver registration seals with semantics", () => {
  const host = new ExtensionHost({});
  const subject = {};
  host.factResolver.register(transactionFactKey, (resolvedSubject, context) => {
    context.facts.set(resolvedSubject, transactionFactKey, { value: "existing" });
    return { value: { value: "conflicting" } };
  });

  assert.equal(host.factResolver.resolve(subject, transactionFactKey), undefined);
  assert.equal(host.facts.get(subject, transactionFactKey)?.value, "existing");
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);
  host.finalizeSemantics();
  assert.throws(
    () => host.factResolver.register(transactionFactKey, () => ({ value: { value: "late" } })),
    /Cannot register an extension fact resolver after semantic finalization/,
  );
});

test("accepted hook and apply facts commit as one checked-operation attempt", () => {
  const targetId = arbitraryTargetIds[1];
  const hookSubject = {};
  const applySubject = {};
  const extension = propertyProviderExtension("accepted-fact-commit", targetId, (_request, context) => {
    context.facts.set(hookSubject, transactionFactKey, { value: "hook" });
    return acceptObservation({ operation: operation("accepted.fact.commit") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const result = runPropertyOperation(host, {}, targetId, "value", () => {
    host.facts.set(applySubject, transactionFactKey, { value: "apply" });
  });

  assert.equal(result.kind, "accept");
  assert.equal(host.facts.get(hookSubject, transactionFactKey)?.value, "hook");
  assert.equal(host.facts.get(applySubject, transactionFactKey)?.value, "apply");
});

test("a failed lifecycle hook rolls back its facts before later lifecycle hooks run", () => {
  const failedSubject = {};
  const successfulSubject = {};
  let laterHookSawFailedFact = false;
  const extension: CompilerExtension = {
    identity: {
      id: "lifecycle-fact-attempts",
      version: "1.0.0",
      capabilityNamespace: "lifecycle-fact-attempts",
    },
    initialize(context): void {
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        lifecycleContext.host.facts.set(failedSubject, transactionFactKey, { value: "failed" });
        lifecycleContext.host.diagnostics.append(attemptDiagnostic(
          "lifecycle-fact-attempts",
          "PROVISIONAL_LIFECYCLE_DIAGNOSTIC",
        ));
        throw new Error("intentional lifecycle failure");
      });
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        laterHookSawFailedFact = lifecycleContext.host.facts.has(failedSubject, transactionFactKey);
        lifecycleContext.host.facts.set(successfulSubject, transactionFactKey, { value: "successful" });
      });
    },
  };
  const host = new ExtensionHost({}, { extensions: [extension] });

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(laterHookSawFailedFact, false);
  assert.equal(host.facts.get(failedSubject, transactionFactKey), undefined);
  assert.equal(host.facts.get(successfulSubject, transactionFactKey)?.value, "successful");
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "PROVISIONAL_LIFECYCLE_DIAGNOSTIC").length, 0);
  assert.equal(host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "LIFECYCLE_HOOK_FAILED").length, 1);
});

test("a sealed fact store makes semantic finalization fail permanently without a reentry wedge", () => {
  const host = new ExtensionHost({});
  host.facts.seal();

  assert.throws(() => host.finalizeSemantics(), /Cannot begin an extension fact transaction after the fact store is sealed/);
  assert.equal(host.finalized, false);
  assert.throws(() => host.finalizeSemantics(), /semantic finalization previously failed and cannot be retried/);
});

test("a checked mapper cannot record any checked operation during candidate evaluation", () => {
  const targetId = arbitraryTargetIds[0];
  const expression = {};
  const receiver = {};
  let mapperRuns = 0;
  let host: ExtensionHost;
  const extension = propertyProviderExtension("same-operation-reentry", targetId, () => {
    mapperRuns += 1;
    runPropertyOperation(host, expression, targetId, "value", () => {
      assert.fail("re-entered checked operation was applied");
    }, receiver);
    return acceptObservation({ operation: operation("unreachable.reentry") });
  });
  host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  const result = runPropertyOperation(host, expression, targetId, "value", () => {
    assert.fail("failed checked operation was applied");
  }, receiver);

  assert.equal(result.kind, "reject");
  assert.equal(mapperRuns, 1);
  assert.equal(host.finalized, false);
  const hookFailures = host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED");
  assert.equal(hookFailures.length, 1);
  const thrownValue = hookFailures[0]?.evidence?.[0]?.details;
  assert.ok(thrownValue instanceof Error);
  assert.equal(thrownValue.message, "Observation hooks cannot record checked operations while observation candidates are being arbitrated.");
  assert.throws(() => host.finalizeSemantics(), /semantic finalization previously failed/);
});

for (const [caseName, malformedResponse] of [
  ["missing operation", {}],
  ["unknown operation kind", {
    operation: {
      operationId: "acme.invalid",
      operationKind: "invoke",
      targetOperation: "invalid",
    },
  }],
  ["unknown result type", {
    operation: operation("acme.invalid-result"),
    resultType: { kind: "not-a-target-type" },
  }],
] as const satisfies readonly (readonly [string, unknown])[]) {
  test(`a checked mapper ${caseName} is rejected at the observation boundary`, () => {
    const targetId = arbitraryTargetIds[0];
    let applications = 0;
    const extension = propertyProviderExtension(`malformed-${caseName}`, targetId, () =>
      acceptObservation(uncheckedCheckedOperationMappingResult(malformedResponse)));
    const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

    const result = runPropertyOperation(host, {}, targetId, "value", () => {
      applications += 1;
    });

    assert.equal(result.kind, "reject");
    assert.equal(applications, 0);
    const hookFailures = host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED");
    assert.equal(hookFailures.length, 1);
    const thrownValue = hookFailures[0]?.evidence?.[0]?.details;
    assert.ok(thrownValue instanceof Error);
    assert.match(thrownValue.message, /Invalid (TargetOperationFact|TargetTypeRef)/);

    host.finalizeSemantics();
    assert.equal(host.finalized, true);
    assert.equal(applications, 0);
  });
}

for (const [caseName, provenance, expectedFailure] of [
  [
    "non-subject source provenance",
    { sourceExpression: "not-an-extension-fact-subject" },
    /sourceExpression.*non-array object|sourceExpression.*ExtensionFactSubject/,
  ],
  [
    "non-boolean optional-chain provenance",
    { sourceOptionalChain: "true" },
    /sourceOptionalChain.*boolean/,
  ],
] as const satisfies readonly (readonly [string, unknown, RegExp])[]) {
  test(`a checked mapper rejects ${caseName} before target facts persist`, () => {
    const targetId = arbitraryTargetIds[0];
    const expression = {};
    let applications = 0;
    const extension = propertyProviderExtension(`malformed-provenance-${caseName}`, targetId, () =>
      acceptObservation(uncheckedCheckedOperationMappingResult({
        operation: {
          ...operation("acme.invalid-provenance"),
          provenance,
        },
      })));
    const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

    const result = runPropertyOperation(host, expression, targetId, "value", (accepted) => {
      applications += 1;
      host.facts.set(expression, targetOperationFactKey, accepted.operation);
    });

    assert.equal(result.kind, "reject");
    assert.equal(applications, 0);
    assert.equal(host.facts.get(expression, targetOperationFactKey), undefined);
    const hookFailures = host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED");
    assert.equal(hookFailures.length, 1);
    const thrownValue = hookFailures[0]?.evidence?.[0]?.details;
    assert.ok(thrownValue instanceof Error);
    assert.match(thrownValue.message, expectedFailure);
  });
}

test("public lifecycle host access records finalization reentry as failure evidence", () => {
  let reentryAttempted = false;
  let reentryReturned = false;
  let lifecycleHostsMatched = false;
  const extension: CompilerExtension = {
    identity: {
      id: "checked-operation-finalization-reentry",
      version: "1.0.0",
      capabilityNamespace: "checked-operation-finalization-reentry",
    },
    initialize(context): void {
      context.registerLifecycleHook<BeforeSemanticsFinalizedLifecycleRequest>(
        ExtensionLifecycleEvent.beforeSemanticsFinalized,
        (request, lifecycleContext) => {
          reentryAttempted = true;
          lifecycleHostsMatched = request.host === lifecycleContext.host;
          request.host.finalizeSemantics();
          reentryReturned = true;
        },
      );
    },
  };
  const host = new ExtensionHost({}, { extensions: [extension] });

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(reentryAttempted, true);
  assert.equal(reentryReturned, false);
  assert.equal(lifecycleHostsMatched, true);
  const reentryDiagnostics = host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "LIFECYCLE_HOOK_FAILED");
  assert.equal(reentryDiagnostics.length, 1);
  assert.equal(reentryDiagnostics[0]?.evidence?.[0]?.message, "Thrown value");
  const thrownValue = reentryDiagnostics[0]?.evidence?.[0]?.details;
  assert.ok(thrownValue instanceof Error);
  assert.equal(thrownValue.message, "Extension semantic finalization cannot re-enter itself.");
});

for (const targetId of arbitraryTargetIds) {
  test(`checked-operation finalization is neutral to arbitrary target id '${targetId}'`, () => {
    const observations: Array<{ readonly phase: ExtensionObservationPhase; readonly target: string | undefined }> = [];
    const appliedOperations: TargetOperationFact[] = [];
    const extension = propertyProviderExtension(`neutral-${targetId}`, targetId, (request, context) => {
      observations.push({ phase: context.phase, target: request.target });
      return context.phase === "checking"
        ? deferObservation
        : acceptObservation({ operation: operation(`operation.${targetId}`) });
    });
    const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

    const initial = runPropertyOperation(host, {}, targetId, "value", (result) => {
      appliedOperations.push(result.operation);
    });
    assert.equal(initial.kind, "owner-deferred");
    host.finalizeSemantics();

    assert.equal(host.finalized, true);
    assert.deepEqual(observations, [
      { phase: "checking", target: targetId },
      { phase: "finalization", target: targetId },
    ]);
    assert.equal(appliedOperations.length, 1);
    assert.equal(appliedOperations[0]?.targetOperation, `operation.${targetId}`);
    assert.equal(host.diagnostics.all().length, 0, "Target-neutral finalization must not report diagnostics.");
  });
}

test("unresolved checked operations report exactly once at each source location", () => {
  const targetId = arbitraryTargetIds[1];
  const sourceFile = {};
  const sourceSpans: readonly ExtensionDiagnosticSourceSpan[] = [
    { sourceFile, pos: 11, end: 19 },
    { sourceFile, pos: 31, end: 47 },
  ];
  let resolvedApplyCount = 0;
  const extension = propertyProviderExtension("unresolved-locations", targetId, (request, context) => {
    if (request.propertyName !== "eventuallyResolved") {
      return deferObservation;
    }
    return context.phase === "checking"
      ? deferObservation
      : acceptObservation({ operation: operation("eventually-resolved.operation") });
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: targetId });

  for (const sourceSpan of sourceSpans) {
    const initial = runPropertyOperation(host, sourceSpan, targetId, "missing", () => {
      assert.fail("permanently deferred operation was applied");
    });
    assert.equal(initial.kind, "owner-deferred");
  }
  const resolvedInitial = runPropertyOperation(host, {}, targetId, "eventuallyResolved", () => {
    resolvedApplyCount += 1;
  });
  assert.equal(resolvedInitial.kind, "owner-deferred");

  host.finalizeSemantics();
  const diagnosticCountAfterFinalization = host.diagnostics.all().length;
  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(resolvedApplyCount, 1);
  assert.equal(diagnosticCountAfterFinalization, sourceSpans.length);
  assert.equal(host.diagnostics.all().length, diagnosticCountAfterFinalization);
  const unresolvedDiagnostics = host.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED");
  assert.equal(unresolvedDiagnostics.length, sourceSpans.length);
  for (const sourceSpan of sourceSpans) {
    const diagnosticsAtSpan = unresolvedDiagnostics.filter((diagnostic) => diagnostic.nodeOrSpan === sourceSpan);
    assert.equal(diagnosticsAtSpan.length, 1);
    assert.ok(
      diagnosticsAtSpan[0]?.nodeOrSpan === sourceSpan,
      "The unresolved diagnostic must retain the exact source span subject.",
    );
  }
});

function propertyReference(
  subject: ExtensionFactSubject,
): CheckedOperationReference {
  return { observation: propertyObservation, subject };
}

function selectedSourceValue(
  expression: ExtensionFactSubject,
  type: ExtensionFactSubject,
): SelectedSourceValueEvidence {
  return Object.freeze({ expression, type });
}

function checkedPropertyRequest(
  expression: ExtensionFactSubject,
  receiver: ExtensionFactSubject,
  propertyName: string,
  target?: string,
): CheckedPropertyAccessMappingRequest {
  return Object.freeze({
    expression,
    receiver,
    propertyName,
    accessMode: "read",
    callCallee: false,
    sourceReceiver: selectedSourceValue(receiver, {}),
    sourceResult: selectedSourceValue(expression, {}),
    ...(target === undefined ? {} : { target }),
  });
}

function retainPropertyOperation(
  host: ExtensionHost,
  expression: ExtensionFactSubject,
  dependency?: CheckedOperationReference,
): void {
  host[extensionHostRunCheckedOperation](
    propertyObservation,
    checkedPropertyRequest(expression, dependency?.subject ?? {}, "value"),
    () => ({ operation: operation("retained.property") }),
    () => {},
    {},
    undefined,
    dependency === undefined ? [] : [dependency],
  );
}

function runPropertyOperation(
  host: ExtensionHost,
  expression: ExtensionFactSubject,
  target: string,
  propertyName: string,
  onAccept: (result: CheckedOperationMappingResult) => void,
  receiver: ExtensionFactSubject = {},
): ExtensionObservationResult<CheckedOperationMappingResult> {
  return host[extensionHostRunCheckedOperation](
    propertyObservation,
    checkedPropertyRequest(expression, receiver, propertyName, target),
    () => {
      throw new Error("provider-owned checked property operation reached core");
    },
    onAccept,
    { requireOwner: true },
  );
}

function observationExtension(
  extensionId: string,
  hook: NonNullable<TargetSemanticProvider["mapCheckedPropertyAccess"]>,
): CompilerExtension {
  return {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
    },
    initialize(context): void {
      context.registerObservation(propertyObservation, hook);
    },
  };
}

function propertyProviderExtension(
  discriminator: string,
  target: string,
  mapCheckedPropertyAccess: NonNullable<TargetSemanticProvider["mapCheckedPropertyAccess"]>,
): CompilerExtension {
  const extensionId = `checked-operation-finalization-${discriminator}`;
  return {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target,
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedPropertyAccess,
      }), true);
    },
  };
}

function operation(targetOperation: string, operationKind: TargetOperationFact["operationKind"] = "property"): TargetOperationFact {
  return {
    operationId: targetOperation,
    operationKind,
    targetOperation,
  };
}

function attemptDiagnostic(extensionId: string, extensionCode: string): ExtensionDiagnostic {
  return {
    extensionId,
    extensionCode,
    numericCode: 9910902,
    category: "warning",
    message: `Provisional diagnostic ${extensionCode}.`,
    identity: `checked-operation-finalization-hardening:${extensionId}:${extensionCode}`,
  };
}

function uncheckedCheckedOperationMappingResult(value: unknown): CheckedOperationMappingResult {
  return value as CheckedOperationMappingResult;
}
