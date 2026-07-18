import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperationObservationPointName,
  CheckedOperationReference,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionObservationPhase,
  ExtensionObservationRequest,
  ExtensionObservationResponse,
  ExtensionObservationResult,
} from "./observations.js";
import { ExtensionObservationPoint } from "./observations.js";
import type { ExtensionFactSubject } from "./host.js";
import type { TargetCallArgumentConversionSlot } from "./facts.js";
import { checkedOperationRequestEquals } from "./checked-operation-request-equality.js";
import {
  type CheckedOperationRequestSnapshotCache,
  snapshotCheckedOperationRequest,
  snapshotCheckedOperationResult,
} from "./checked-operation-value-snapshot.js";

type AnyCheckedOperationResult = ExtensionObservationResult<unknown>;
type AcceptedCheckedOperationResult = Extract<AnyCheckedOperationResult, { readonly kind: "accept" }>;

export type CheckedOperationApplyOutcome =
  | { readonly kind: "applied" }
  | { readonly kind: "deferred"; readonly unresolved: CheckedOperationReference }
  | { readonly kind: "unavailable" };

const checkedOperationApplied: CheckedOperationApplyOutcome = Object.freeze({ kind: "applied" });
const checkedOperationUnavailableResult = Object.freeze({ kind: "checked-operation-apply-unavailable" });
type CheckedOperationUnavailableResult = typeof checkedOperationUnavailableResult;
type RetainedCheckedOperationResult = AnyCheckedOperationResult | CheckedOperationUnavailableResult;

interface CheckedOperationRecord {
  readonly observation: CheckedOperationObservationPointName;
  readonly subject: ExtensionFactSubject;
  readonly reference: CheckedOperationReference;
  readonly request: ExtensionObservationRequest<CheckedOperationObservationPointName>;
  readonly dependencies: readonly CheckedOperationReference[];
  readonly atomicOwner?: CheckedOperationReference;
  readonly allDependencies: CheckedOperationReference[];
  readonly dependencyIndex: CheckedOperationReferenceIndex;
  readonly evaluate: (phase: ExtensionObservationPhase) => AnyCheckedOperationResult;
  readonly apply: (result: AnyCheckedOperationResult) => void | CheckedOperationApplyOutcome;
  result?: RetainedCheckedOperationResult;
  pendingAcceptedResult?: AcceptedCheckedOperationResult;
  acceptedEffects?: unknown;
  unresolved?: CheckedOperationReference;
  state: "evaluating" | "deferred" | "accepted" | "unavailable";
}

interface CheckedOperationExecutionFrame {
  readonly stage: "evaluating" | "applying";
  readonly record: CheckedOperationRecord;
}

interface CheckedOperationTraversalFrame {
  readonly record: CheckedOperationRecord;
  readonly dependencies: readonly CheckedOperationReference[];
  nextDependencyIndex: number;
}

export interface CheckedOperationInventoryCallbacks {
  readonly beginAttempt: () => unknown;
  readonly captureAttemptEffects: (attempt: unknown) => unknown;
  readonly applyAttemptEffects: (attempt: unknown, effects: unknown) => void;
  readonly commitAttempt: (attempt: unknown) => void;
  readonly rollbackAttempt: (attempt: unknown) => void;
  readonly discardAttemptPreservingDiagnostics: (attempt: unknown) => void;
  readonly deferAttemptPreservingOperations: (attempt: unknown) => readonly CheckedOperationReference[];
  readonly onRequestConflict: (
    observation: CheckedOperationObservationPointName,
    subject: ExtensionFactSubject,
    existing: ExtensionObservationRequest<CheckedOperationObservationPointName>,
    incoming: ExtensionObservationRequest<CheckedOperationObservationPointName>,
  ) => void;
  readonly onDependencyConflict: (
    observation: CheckedOperationObservationPointName,
    subject: ExtensionFactSubject,
  ) => void;
  readonly onAtomicOwnerConflict: (
    observation: CheckedOperationObservationPointName,
    subject: ExtensionFactSubject,
  ) => void;
  readonly onUnresolved: (
    observation: CheckedOperationObservationPointName,
    subject: ExtensionFactSubject,
  ) => void;
  readonly onFatalFailure: (error: Error) => void;
}

const checkedPrimaryOperationObservationOrder: readonly CheckedOperationObservationPointName[] = Object.freeze([
  ExtensionObservationPoint.mapCheckedCall,
  ExtensionObservationPoint.mapCheckedPropertyAccess,
  ExtensionObservationPoint.mapCheckedElementAccess,
  ExtensionObservationPoint.mapCheckedOperator,
  ExtensionObservationPoint.mapCheckedIteration,
]);

export class CheckedOperationInventory {
  readonly #records: CheckedOperationRecord[] = [];
  readonly #recordsBySubject = new WeakMap<object, Map<CheckedOperationObservationPointName, CheckedOperationRecord[]>>();
  readonly #ownedRecordsByOwnerSubject = new WeakMap<object, CheckedOperationRecord[]>();
  readonly #callbacks: CheckedOperationInventoryCallbacks;
  readonly #executionFrames: CheckedOperationExecutionFrame[] = [];
  #failure: Error | undefined;
  #state: "open" | "finalizing" | "finalized" | "failed" = "open";

  constructor(callbacks: CheckedOperationInventoryCallbacks) {
    this.#callbacks = callbacks;
  }

  run<TObservation extends CheckedOperationObservationPointName>(
    observation: TObservation,
    request: ExtensionObservationRequest<TObservation>,
    evaluate: (
      request: ExtensionObservationRequest<TObservation>,
      phase: ExtensionObservationPhase,
    ) => ExtensionObservationResult<ExtensionObservationResponse<TObservation>>,
    apply: (
      result: ExtensionObservationResult<ExtensionObservationResponse<TObservation>>,
      request: ExtensionObservationRequest<TObservation>,
    ) => void | CheckedOperationApplyOutcome,
    phase: ExtensionObservationPhase,
    requestSnapshotCache?: CheckedOperationRequestSnapshotCache,
    dependencies: readonly CheckedOperationReference[] = [],
    atomicOwner?: CheckedOperationReference,
  ): ExtensionObservationResult<ExtensionObservationResponse<TObservation>> {
    this.#assertRecordingAvailable("record");
    const executionFrame = this.#executionFrames[this.#executionFrames.length - 1];
    if (executionFrame?.stage === "evaluating") {
      const error = new Error("A checked-operation mapper cannot record another checked operation while it is being evaluated.");
      this.#fail(error);
      throw error;
    }
    const incomingRequest = snapshotCheckedOperationRequest(observation, request, requestSnapshotCache);
    const incomingDependencies = snapshotCheckedOperationReferences(dependencies);
    const incomingAtomicOwner = atomicOwner === undefined ? undefined : snapshotCheckedOperationReference(atomicOwner);
    const incomingSubject = checkedOperationSubject(observation, incomingRequest);
    const existing = this.#findRecordForRequest(observation, incomingSubject, incomingRequest);
    if (existing !== undefined && !checkedOperationRequestEquals(observation, existing.request, incomingRequest)) {
      this.#callbacks.onRequestConflict(observation, incomingSubject, existing.request, incomingRequest);
      this.#fail(new Error(`Checked operation '${observation}' was observed with conflicting selected source evidence.`));
      return Object.freeze({ kind: "conflict", observation });
    }
    if (existing !== undefined && !checkedOperationReferenceArraysEqual(existing.dependencies, incomingDependencies)) {
      this.#callbacks.onDependencyConflict(observation, incomingSubject);
      this.#fail(new Error(`Checked operation '${observation}' was observed with conflicting operation dependencies.`));
      return Object.freeze({ kind: "conflict", observation });
    }
    if (existing !== undefined && !optionalCheckedOperationReferenceEquals(existing.atomicOwner, incomingAtomicOwner)) {
      this.#callbacks.onAtomicOwnerConflict(observation, incomingSubject);
      this.#fail(new Error(`Checked operation '${observation}' was observed with a conflicting atomic owner.`));
      return Object.freeze({ kind: "conflict", observation });
    }
    if (incomingAtomicOwner !== undefined
      && (executionFrame?.stage !== "applying"
        || !checkedOperationReferenceEquals(executionFrame.record.reference, incomingAtomicOwner))) {
      const error = new Error(`Atomically owned checked operation '${observation}' must be recorded while its exact owner is applying.`);
      this.#fail(error);
      throw error;
    }
    if (existing !== undefined) {
      if (existing.state === "evaluating") {
        const error = new Error(`Checked operation '${observation}' re-entered while its selected mapping was being evaluated.`);
        this.#fail(error);
        throw error;
      }
      if (existing.result === undefined) {
        throw new Error("Active checked operation has no observation result.");
      }
      if (existing.atomicOwner !== undefined && existing.state === "deferred") {
        const dependencyReadiness = this.#dependencyReadiness(existing, false);
        if (dependencyReadiness === "blocked") {
          markCheckedOperationUnavailable(existing);
          this.#settleOwnedRecords(existing);
        } else if (dependencyReadiness === "ready") {
          existing.state = "evaluating";
          const resumedResult = this.#runAttempt(existing, phase);
          this.#throwIfFailed();
          existing.result = resumedResult;
          existing.state = checkedOperationResultState(resumedResult);
          this.#settleOwnedRecords(existing);
        }
      }
      return existing.result as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>;
    }
    const immutableRequest = incomingRequest;
    const subject = checkedOperationSubject(observation, immutableRequest);
    const evaluateRecord = (phase: ExtensionObservationPhase): AnyCheckedOperationResult => snapshotCheckedOperationResult(
      observation,
      evaluate(immutableRequest, phase),
    ) as AnyCheckedOperationResult;
    const applyRecord = (result: AnyCheckedOperationResult): void | CheckedOperationApplyOutcome => {
      return apply(result as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>, immutableRequest);
    };
    const record: CheckedOperationRecord = {
      observation,
      subject,
      reference: checkedOperationReference(observation, immutableRequest, subject),
      request: immutableRequest,
      dependencies: incomingDependencies,
      ...(incomingAtomicOwner === undefined ? {} : { atomicOwner: incomingAtomicOwner }),
      allDependencies: [...incomingDependencies],
      dependencyIndex: createCheckedOperationReferenceIndex(incomingDependencies),
      evaluate: evaluateRecord,
      apply: applyRecord,
      state: "evaluating",
    };
    if (incomingAtomicOwner !== undefined && checkedOperationReferenceEquals(record.reference, incomingAtomicOwner)) {
      const error = new Error(`Checked operation '${observation}' cannot atomically own itself.`);
      this.#fail(error);
      throw error;
    }
    this.#addRecord(record);
    try {
      const dependencyReadiness = this.#dependencyReadiness(record, false);
      if (dependencyReadiness !== "ready") {
        const deferred = dependencyDeferredResult(observation);
        record.result = deferred;
        record.state = dependencyReadiness === "blocked" ? "unavailable" : "deferred";
        return deferred as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>;
      }
      const initialResult = this.#runAttempt(record, phase);
      this.#throwIfFailed();
      record.result = initialResult;
      record.state = checkedOperationResultState(initialResult);
      this.#settleOwnedRecords(record);
      return initialResult as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>;
    } catch (error) {
      this.#fail(asError(error));
      throw error;
    }
  }

  getRequest<TObservation extends CheckedOperationObservationPointName>(
    observation: TObservation,
    subject: ExtensionFactSubject | undefined,
    reference?: CheckedOperationReference<TObservation>,
  ): ExtensionObservationRequest<TObservation> | undefined {
    if (subject === undefined) {
      return undefined;
    }
    if (this.#state === "failed") {
      return undefined;
    }
    const records = (this.#recordsBySubject.get(subject)?.get(observation) ?? [])
      .filter((record) => reference === undefined || checkedOperationReferenceEquals(record.reference, reference));
    if (records.length > 1) {
      const error = new Error(`Checked operation '${observation}' has multiple request slots; an exact operation reference is required.`);
      this.#fail(error);
      throw error;
    }
    return records[0]?.request as ExtensionObservationRequest<TObservation> | undefined;
  }

  getReference(subject: ExtensionFactSubject | undefined): CheckedOperationReference | undefined {
    if (subject === undefined) {
      return undefined;
    }
    if (this.#state === "failed") {
      return undefined;
    }
    const records = this.#recordsBySubject.get(subject);
    if (records === undefined) {
      return undefined;
    }
    let primary: CheckedOperationRecord | undefined;
    for (const observation of checkedPrimaryOperationObservationOrder) {
      const primaryRecords = records.get(observation) ?? [];
      if (primaryRecords.length > 1) {
        const error = new Error(`Checked-operation subject has multiple '${observation}' records.`);
        this.#fail(error);
        throw error;
      }
      const record = primaryRecords[0];
      if (record !== undefined) {
        if (primary !== undefined) {
          const error = new Error(`Checked-operation subject has multiple primary operations: '${primary.observation}' and '${record.observation}'.`);
          this.#fail(error);
          throw error;
        }
        primary = record;
      }
    }
    if (primary !== undefined) {
      return primary.reference;
    }
    return (records.get(ExtensionObservationPoint.mapCheckedConversion) ?? [])
      .find((record) => record.reference.conversionKind === "assertion")
      ?.reference;
  }

  finalize(): void {
    if (this.#state === "finalized") {
      return;
    }
    if (this.#state === "finalizing") {
      throw new Error("Checked-operation finalization cannot re-enter itself.");
    }
    if (this.#state === "failed") {
      throw new Error("Checked-operation finalization previously failed and cannot be retried.");
    }
    this.#state = "finalizing";
    try {
      this.#validatePrimaryOperationUniqueness();
      while (this.#records.some((record) => record.atomicOwner === undefined && record.state === "deferred")) {
        let completedDeferredRecord = false;
        for (const record of this.#dependencyOrderedRecords()) {
          if (record.atomicOwner !== undefined || record.state !== "deferred") {
            continue;
          }
          const dependencyReadiness = this.#dependencyReadiness(record, true);
          if (dependencyReadiness === "blocked") {
            markCheckedOperationUnavailable(record);
            this.#settleOwnedRecords(record);
            completedDeferredRecord = true;
            continue;
          }
          if (dependencyReadiness !== "ready") {
            continue;
          }
          record.state = "evaluating";
          const result = this.#runAttempt(record, "finalization");
          this.#throwIfFailed();
          record.result = result;
          record.state = checkedOperationResultState(result);
          this.#settleOwnedRecords(record);
          if (record.state === "deferred") {
            const unresolved = record.unresolved;
            if (unresolved === undefined) {
              this.#callbacks.onUnresolved(record.observation, record.subject);
              markCheckedOperationUnavailable(record);
            }
          }
          completedDeferredRecord = true;
        }
        if (!completedDeferredRecord) {
          throw new Error("Checked-operation finalization made no progress while deferred operations remained.");
        }
      }
      this.#validateOwnedOperationStates();
      this.#validatePrimaryOperationUniqueness();
      this.#state = "finalized";
    } catch (error) {
      this.#fail(asError(error));
      throw error;
    }
  }

  releaseRetainedEffects(): void {
    if (this.#state !== "finalized") {
      throw new Error("Checked-operation replay effects can be released only after finalization.");
    }
    for (const record of this.#records) {
      if (record.pendingAcceptedResult !== undefined) {
        throw new Error("Finalized checked operation still retains a pending accepted result.");
      }
      delete record.acceptedEffects;
    }
  }

  #assertRecordingAvailable(action: "record"): void {
    if (this.#state === "failed") {
      throw new Error(`Cannot ${action} a checked operation after semantic finalization failed.`);
    }
    if (this.#state === "finalized") {
      throw new Error(`Cannot ${action} a checked operation after semantic finalization.`);
    }
    if (this.#state === "finalizing" && this.#executionFrames[this.#executionFrames.length - 1]?.stage !== "applying") {
      throw new Error(`Cannot ${action} a checked operation outside checked-operation result application during finalization.`);
    }
  }

  #runAttempt(record: CheckedOperationRecord, phase: ExtensionObservationPhase): RetainedCheckedOperationResult {
    const attempt = this.#callbacks.beginAttempt();
    let attemptOpen = true;
    try {
      const pendingAcceptedResult = record.pendingAcceptedResult;
      if (pendingAcceptedResult !== undefined) {
        if (record.acceptedEffects === undefined) {
          throw new Error(`Checked operation '${record.observation}' lost retained accepted-observation effects.`);
        }
        this.#callbacks.applyAttemptEffects(attempt, record.acceptedEffects);
      }
      const result = pendingAcceptedResult ?? this.#withExecutionFrame("evaluating", record, () => record.evaluate(phase));
      this.#throwIfFailed();
      if (result.kind === "accept") {
        if (pendingAcceptedResult === undefined) {
          record.acceptedEffects = this.#callbacks.captureAttemptEffects(attempt);
        }
        const applyOutcome = normalizeCheckedOperationApplyOutcome(this.#withExecutionFrame("applying", record, () => record.apply(result)));
        if (applyOutcome.kind === "applied") {
          this.#callbacks.commitAttempt(attempt);
          attemptOpen = false;
          delete record.pendingAcceptedResult;
          delete record.unresolved;
          return result;
        }
        if (applyOutcome.kind === "deferred") {
          const unresolved = snapshotCheckedOperationReference(applyOutcome.unresolved);
          const unresolvedRecord = this.#findRecordForReference(unresolved);
          if (unresolvedRecord === undefined) {
            throw new Error(`Checked operation '${record.observation}' deferred on an operation that was not retained.`);
          }
          if (unresolvedRecord === record) {
            throw new Error(`Checked operation '${record.observation}' cannot defer on itself.`);
          }
          if (unresolvedRecord.state === "unavailable") {
            attemptOpen = false;
            this.#callbacks.discardAttemptPreservingDiagnostics(attempt);
            delete record.pendingAcceptedResult;
            delete record.acceptedEffects;
            delete record.unresolved;
            return checkedOperationUnavailableResult;
          }
          if (unresolvedRecord.state !== "deferred") {
            throw new Error(`Checked operation '${record.observation}' deferred on operation '${unresolved.observation}' in state '${unresolvedRecord.state}'.`);
          }
          attemptOpen = false;
          const deferredDependencies = this.#callbacks.deferAttemptPreservingOperations(attempt);
          this.#retainDeferredDependencies(record, [...deferredDependencies, unresolved]);
          record.pendingAcceptedResult = result;
          record.unresolved = unresolved;
          return dependencyDeferredResult(record.observation);
        }
        attemptOpen = false;
        this.#callbacks.discardAttemptPreservingDiagnostics(attempt);
        delete record.pendingAcceptedResult;
        delete record.acceptedEffects;
        delete record.unresolved;
        return checkedOperationUnavailableResult;
      } else {
        attemptOpen = false;
        this.#callbacks.discardAttemptPreservingDiagnostics(attempt);
        delete record.pendingAcceptedResult;
        delete record.acceptedEffects;
      }
      return result;
    } catch (error) {
      if (attemptOpen) {
        attemptOpen = false;
        this.#callbacks.rollbackAttempt(attempt);
      }
      throw error;
    }
  }

  #addRecord(record: CheckedOperationRecord): void {
    this.#records.push(record);
    let recordsForSubject = this.#recordsBySubject.get(record.subject);
    if (recordsForSubject === undefined) {
      recordsForSubject = new Map();
      this.#recordsBySubject.set(record.subject, recordsForSubject);
    }
    const recordsForObservation = recordsForSubject.get(record.observation);
    if (recordsForObservation === undefined) {
      recordsForSubject.set(record.observation, [record]);
    } else {
      recordsForObservation.push(record);
    }
    if (record.atomicOwner !== undefined) {
      const ownedRecords = this.#ownedRecordsByOwnerSubject.get(record.atomicOwner.subject);
      if (ownedRecords === undefined) {
        this.#ownedRecordsByOwnerSubject.set(record.atomicOwner.subject, [record]);
      } else {
        ownedRecords.push(record);
      }
    }
  }

  createSavepoint(): number {
    return this.#records.length;
  }

  rollbackToSavepoint(recordCount: number): void {
    if (!Number.isSafeInteger(recordCount) || recordCount < 0 || recordCount > this.#records.length) {
      throw new Error("Invalid checked-operation inventory savepoint.");
    }
    while (this.#records.length > recordCount) {
      const record = this.#records.pop()!;
      const recordsForSubject = this.#recordsBySubject.get(record.subject);
      const recordsForObservation = recordsForSubject?.get(record.observation);
      if (recordsForObservation === undefined || recordsForObservation[recordsForObservation.length - 1] !== record) {
        throw new Error("Checked-operation inventory rollback encountered inconsistent record ordering.");
      }
      recordsForObservation.pop();
      if (recordsForObservation.length === 0) {
        recordsForSubject!.delete(record.observation);
      }
      if (recordsForSubject!.size === 0) {
        this.#recordsBySubject.delete(record.subject);
      }
      if (record.atomicOwner !== undefined) {
        const ownedRecords = this.#ownedRecordsByOwnerSubject.get(record.atomicOwner.subject);
        if (ownedRecords === undefined || ownedRecords[ownedRecords.length - 1] !== record) {
          throw new Error("Checked-operation inventory rollback encountered inconsistent atomic-owner ordering.");
        }
        ownedRecords.pop();
        if (ownedRecords.length === 0) {
          this.#ownedRecordsByOwnerSubject.delete(record.atomicOwner.subject);
        }
      }
    }
  }

  deferFromSavepoint(recordCount: number): readonly CheckedOperationReference[] {
    if (!Number.isSafeInteger(recordCount) || recordCount < 0 || recordCount > this.#records.length) {
      throw new Error("Invalid checked-operation inventory savepoint.");
    }
    const deferred: CheckedOperationReference[] = [];
    for (let index = recordCount; index < this.#records.length; index += 1) {
      const record = this.#records[index]!;
      deferred.push(record.reference);
      const result = record.result;
      if (result === undefined) {
        throw new Error(`Checked operation '${record.observation}' has no result while preserving a deferred apply attempt.`);
      }
      if (result.kind === "accept") {
        if (record.acceptedEffects === undefined) {
          throw new Error(`Accepted checked operation '${record.observation}' lost its replay effects.`);
        }
        record.pendingAcceptedResult = result;
        record.result = dependencyDeferredResult(record.observation);
        record.state = "deferred";
      } else if (result.kind === "owner-deferred") {
        record.state = "deferred";
      } else {
        markCheckedOperationUnavailable(record);
      }
      delete record.unresolved;
    }
    return Object.freeze(deferred);
  }

  #retainDeferredDependencies(
    owner: CheckedOperationRecord,
    references: readonly CheckedOperationReference[],
  ): void {
    const pending = [...references];
    let nextReferenceIndex = 0;
    const expandedOwnedRecords = new Set<CheckedOperationRecord>();
    while (nextReferenceIndex < pending.length) {
      const reference = pending[nextReferenceIndex++]!;
      const dependency = this.#findRecordForReference(reference);
      if (dependency === undefined) {
        throw new Error(`Checked operation '${owner.observation}' deferred on an operation that was not retained.`);
      }
      if (dependency === owner) {
        throw new Error(`Checked operation '${owner.observation}' cannot defer on itself.`);
      }
      if (this.#isAtomicallyOwnedBy(dependency, owner)) {
        if (expandedOwnedRecords.has(dependency)) {
          continue;
        }
        expandedOwnedRecords.add(dependency);
        pending.push(...checkedOperationDependencies(dependency));
        continue;
      }
      if (owner.dependencyIndex.add(reference)) {
        owner.allDependencies.push(reference);
      }
    }
  }

  #isAtomicallyOwnedBy(candidate: CheckedOperationRecord, owner: CheckedOperationRecord): boolean {
    let ownerReference = candidate.atomicOwner;
    const visited = new Set<CheckedOperationRecord>();
    while (ownerReference !== undefined) {
      const ownerRecord = this.#findRecordForReference(ownerReference);
      if (ownerRecord === undefined) {
        throw new Error(`Atomically owned checked operation '${candidate.observation}' references a missing owner.`);
      }
      if (ownerRecord === owner) {
        return true;
      }
      if (visited.has(ownerRecord)) {
        throw new Error("Checked-operation atomic ownership contains a cycle.");
      }
      visited.add(ownerRecord);
      ownerReference = ownerRecord.atomicOwner;
    }
    return false;
  }

  #directlyOwnedRecords(owner: CheckedOperationRecord): readonly CheckedOperationRecord[] {
    return (this.#ownedRecordsByOwnerSubject.get(owner.reference.subject) ?? [])
      .filter((record) => record.atomicOwner !== undefined
        && checkedOperationReferenceEquals(record.atomicOwner, owner.reference));
  }

  #settleOwnedRecords(owner: CheckedOperationRecord): void {
    if (owner.state === "deferred" || owner.state === "evaluating") {
      return;
    }
    const pending = [...this.#directlyOwnedRecords(owner)];
    while (pending.length !== 0) {
      const record = pending.pop()!;
      if (owner.state === "accepted") {
        if (record.state !== "accepted") {
          throw new Error(`Accepted checked operation '${owner.observation}' has atomically owned operation '${record.observation}' in state '${record.state}'.`);
        }
      } else {
        markCheckedOperationUnavailable(record);
      }
      pending.push(...this.#directlyOwnedRecords(record));
    }
  }

  #validateOwnedOperationStates(): void {
    for (const record of this.#records) {
      if (record.atomicOwner === undefined) {
        continue;
      }
      const owner = this.#findRecordForReference(record.atomicOwner);
      if (owner === undefined) {
        throw new Error(`Atomically owned checked operation '${record.observation}' references a missing owner.`);
      }
      if (owner.state === "accepted" && record.state !== "accepted") {
        throw new Error(`Accepted checked operation '${owner.observation}' has unaccepted atomic child '${record.observation}'.`);
      }
      if (owner.state === "unavailable" && record.state !== "unavailable") {
        throw new Error(`Unavailable checked operation '${owner.observation}' has a published atomic child '${record.observation}'.`);
      }
      if (record.state === "deferred") {
        throw new Error(`Atomically owned checked operation '${record.observation}' remained deferred after finalization.`);
      }
    }
  }

  #findRecordForRequest<TObservation extends CheckedOperationObservationPointName>(
    observation: TObservation,
    subject: ExtensionFactSubject,
    request: ExtensionObservationRequest<TObservation>,
  ): CheckedOperationRecord | undefined {
    return (this.#recordsBySubject.get(subject)?.get(observation) ?? [])
      .find((record) => checkedOperationSlotEquals(observation, record.request, request));
  }

  #findRecordForReference(reference: CheckedOperationReference): CheckedOperationRecord | undefined {
    return (this.#recordsBySubject.get(reference.subject)?.get(reference.observation) ?? [])
      .find((record) => checkedOperationReferenceEquals(record.reference, reference));
  }

  #dependencyReadiness(
    record: CheckedOperationRecord,
    requirePresent: boolean,
  ): "ready" | "waiting" | "blocked" {
    for (const dependency of checkedOperationDependencies(record)) {
      const dependencyRecord = this.#findRecordForReference(dependency);
      if (dependencyRecord === undefined) {
        if (requirePresent) {
          throw new Error(`Checked operation '${record.observation}' references missing dependency '${dependency.observation}'.`);
        }
        return "waiting";
      }
      if (dependencyRecord === record) {
        throw new Error(`Checked operation '${record.observation}' cannot depend on itself.`);
      }
      if (dependencyRecord.state === "unavailable") {
        return "blocked";
      }
      if (dependencyRecord.state !== "accepted") {
        return "waiting";
      }
    }
    return "ready";
  }

  #fail(error: Error): void {
    if (this.#state === "failed") {
      return;
    }
    this.#failure = error;
    this.#state = "failed";
    this.#callbacks.onFatalFailure(error);
  }

  #throwIfFailed(): void {
    if (this.#state === "failed") {
      throw this.#failure ?? new Error("Checked-operation finalization failed without error evidence.");
    }
  }

  #withExecutionFrame<T>(
    stage: "evaluating" | "applying",
    record: CheckedOperationRecord,
    callback: () => T,
  ): T {
    const frame: CheckedOperationExecutionFrame = { stage, record };
    this.#executionFrames.push(frame);
    try {
      return callback();
    } finally {
      const completed = this.#executionFrames.pop();
      if (completed !== frame) {
        throw new Error("Checked-operation execution stage stack is inconsistent.");
      }
    }
  }

  #validatePrimaryOperationUniqueness(): void {
    const primaryBySubject = new WeakMap<object, CheckedOperationRecord>();
    for (const record of this.#records) {
      if (!checkedPrimaryOperationObservationOrder.includes(record.observation)) {
        continue;
      }
      const existing = primaryBySubject.get(record.subject);
      if (existing !== undefined && existing.observation !== record.observation) {
        throw new Error(`Checked-operation subject has multiple primary operations: '${existing.observation}' and '${record.observation}'.`);
      }
      primaryBySubject.set(record.subject, record);
    }
  }

  #dependencyOrderedRecords(): readonly CheckedOperationRecord[] {
    const ordered: CheckedOperationRecord[] = [];
    const visited = new Set<CheckedOperationRecord>();
    const visiting = new Set<CheckedOperationRecord>();
    for (const root of this.#records) {
      if (visited.has(root)) {
        continue;
      }
      const stack: CheckedOperationTraversalFrame[] = [{
        record: root,
        dependencies: checkedOperationDependencies(root),
        nextDependencyIndex: 0,
      }];
      visiting.add(root);
      while (stack.length !== 0) {
        const frame = stack[stack.length - 1]!;
        const dependency = frame.dependencies[frame.nextDependencyIndex];
        if (dependency !== undefined) {
          frame.nextDependencyIndex += 1;
          const dependencyRecord = this.#findRecordForReference(dependency);
          if (dependencyRecord === undefined) {
            throw new Error(`Checked operation '${frame.record.observation}' references missing dependency '${dependency.observation}'.`);
          }
          if (visiting.has(dependencyRecord)) {
            throw new Error(`Checked-operation dependency cycle includes '${frame.record.observation}' and '${dependencyRecord.observation}'.`);
          }
          if (visited.has(dependencyRecord)) {
            continue;
          }
          visiting.add(dependencyRecord);
          stack.push({
            record: dependencyRecord,
            dependencies: checkedOperationDependencies(dependencyRecord),
            nextDependencyIndex: 0,
          });
          continue;
        }
        stack.pop();
        visiting.delete(frame.record);
        if (!visited.has(frame.record)) {
          visited.add(frame.record);
          ordered.push(frame.record);
        }
      }
    }
    return ordered;
  }
}

function checkedOperationSubject<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  request: ExtensionObservationRequest<TObservation>,
): ExtensionFactSubject {
  switch (observation) {
    case ExtensionObservationPoint.mapCheckedCall:
      return (request as CheckedCallMappingRequest).call;
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
      return (request as CheckedPropertyAccessMappingRequest).expression;
    case ExtensionObservationPoint.mapCheckedElementAccess:
      return (request as CheckedElementAccessMappingRequest).expression;
    case ExtensionObservationPoint.mapCheckedOperator:
      return (request as CheckedOperatorMappingRequest).expression;
    case ExtensionObservationPoint.mapCheckedIteration:
      return (request as CheckedIterationMappingRequest).statement;
    case ExtensionObservationPoint.mapCheckedConversion:
      return (request as CheckedConversionMappingRequest).expression;
  }
}

function checkedOperationReference<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  request: ExtensionObservationRequest<TObservation>,
  subject: ExtensionFactSubject,
): CheckedOperationReference {
  switch (observation) {
    case ExtensionObservationPoint.mapCheckedCall:
      return Object.freeze({ observation: ExtensionObservationPoint.mapCheckedCall, subject });
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
      return Object.freeze({ observation: ExtensionObservationPoint.mapCheckedPropertyAccess, subject });
    case ExtensionObservationPoint.mapCheckedElementAccess:
      return Object.freeze({ observation: ExtensionObservationPoint.mapCheckedElementAccess, subject });
    case ExtensionObservationPoint.mapCheckedOperator:
      return Object.freeze({ observation: ExtensionObservationPoint.mapCheckedOperator, subject });
    case ExtensionObservationPoint.mapCheckedIteration:
      return Object.freeze({ observation: ExtensionObservationPoint.mapCheckedIteration, subject });
    case ExtensionObservationPoint.mapCheckedConversion: {
      const conversion = request as CheckedConversionMappingRequest;
      return Object.freeze(conversion.conversionKind === "assertion"
        ? { observation: ExtensionObservationPoint.mapCheckedConversion, subject, conversionKind: "assertion" }
        : {
            observation: ExtensionObservationPoint.mapCheckedConversion,
            subject,
            conversionKind: "call-argument",
            call: conversion.call,
            slot: conversion.slot,
            sourceArgumentIndex: conversion.sourceArgumentIndex,
            targetParameterIndex: conversion.targetParameterIndex,
          });
    }
  }
}

function checkedOperationSlotEquals<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  left: ExtensionObservationRequest<CheckedOperationObservationPointName>,
  right: ExtensionObservationRequest<TObservation>,
): boolean {
  if (observation !== ExtensionObservationPoint.mapCheckedConversion) {
    return true;
  }
  const leftConversion = left as CheckedConversionMappingRequest;
  const rightConversion = right as CheckedConversionMappingRequest;
  if (leftConversion.conversionKind !== rightConversion.conversionKind) {
    return false;
  }
  return leftConversion.conversionKind === "assertion"
    || (leftConversion.call === (rightConversion as Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }>).call
      && leftConversion.slot === (rightConversion as Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }>).slot);
}

function checkedOperationReferenceEquals(left: CheckedOperationReference, right: CheckedOperationReference): boolean {
  return left.observation === right.observation
    && left.subject === right.subject
    && left.conversionKind === right.conversionKind
    && left.call === right.call
    && left.slot === right.slot
    && left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.targetParameterIndex === right.targetParameterIndex;
}

function optionalCheckedOperationReferenceEquals(
  left: CheckedOperationReference | undefined,
  right: CheckedOperationReference | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : checkedOperationReferenceEquals(left, right);
}

function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

function snapshotCheckedOperationReferences(references: readonly CheckedOperationReference[]): readonly CheckedOperationReference[] {
  if (!Array.isArray(references)) {
    throw new Error("Checked-operation dependencies must be an array.");
  }
  const snapshots: CheckedOperationReference[] = [];
  const index = new CheckedOperationReferenceIndex();
  for (const reference of references) {
    const snapshot = snapshotCheckedOperationReference(reference);
    if (index.add(snapshot)) {
      snapshots.push(snapshot);
    }
  }
  return Object.freeze(snapshots);
}

function snapshotCheckedOperationReference(reference: CheckedOperationReference): CheckedOperationReference {
  const fields = readExactDataFields(reference, "checked-operation reference");
  const observation = fields.observation;
  if (!isCheckedOperationObservationPointName(observation)) {
    throw new Error(`Unknown checked-operation reference observation '${String(observation)}'.`);
  }
  const subject = requireReferenceSubject(fields.subject, "subject");
  if (observation !== ExtensionObservationPoint.mapCheckedConversion) {
    assertExactReferenceFields(fields, ["observation", "subject"]);
    return Object.freeze({ observation, subject }) as CheckedOperationReference;
  }
  const conversionKind = fields.conversionKind;
  if (conversionKind === "assertion") {
    assertExactReferenceFields(fields, ["observation", "subject", "conversionKind"]);
    return Object.freeze({ observation, subject, conversionKind });
  }
  if (conversionKind !== "call-argument") {
    throw new Error(`Unknown checked-operation conversion reference kind '${String(conversionKind)}'.`);
  }
  assertExactReferenceFields(fields, [
    "observation",
    "subject",
    "conversionKind",
    "call",
    "slot",
    "sourceArgumentIndex",
    "targetParameterIndex",
  ]);
  const call = requireReferenceSubject(fields.call, "call");
  const slot = requireReferenceSubject(fields.slot, "slot") as TargetCallArgumentConversionSlot;
  const sourceArgumentIndex = requireReferenceIndex(fields.sourceArgumentIndex, "sourceArgumentIndex");
  const targetParameterIndex = requireReferenceIndex(fields.targetParameterIndex, "targetParameterIndex");
  return Object.freeze({
    observation,
    subject,
    conversionKind,
    call,
    slot,
    sourceArgumentIndex,
    targetParameterIndex,
  });
}

function readExactDataFields(value: unknown, valueName: string): Readonly<Record<string, unknown>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`A ${valueName} must be a non-array object.`);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new Error(`A ${valueName} must be a plain object.`);
  }
  const ownKeys = Reflect.ownKeys(value);
  if (ownKeys.some((key) => typeof key !== "string")) {
    throw new Error(`A ${valueName} cannot contain symbol fields.`);
  }
  const fields: Record<string, unknown> = Object.create(null) as Record<string, unknown>;
  const descriptors = Object.getOwnPropertyDescriptors(value);
  for (const key of ownKeys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      throw new Error(`A ${valueName} field '${key}' must be an enumerable own data property.`);
    }
    fields[key] = descriptor.value;
  }
  return Object.freeze(fields);
}

function assertExactReferenceFields(fields: Readonly<Record<string, unknown>>, expected: readonly string[]): void {
  const actual = Object.keys(fields);
  if (actual.length !== expected.length || expected.some((field) => !Object.hasOwn(fields, field))) {
    throw new Error(`A checked-operation reference must contain exactly: ${expected.join(", ")}.`);
  }
}

function requireReferenceSubject(value: unknown, field: string): ExtensionFactSubject {
  if (typeof value !== "object" || value === null) {
    throw new Error(`Checked-operation reference '${field}' must be an object identity.`);
  }
  return value;
}

function requireReferenceIndex(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Checked-operation reference '${field}' must be a non-negative safe integer.`);
  }
  return value;
}

function isCheckedOperationObservationPointName(value: unknown): value is CheckedOperationObservationPointName {
  return value === ExtensionObservationPoint.mapCheckedCall
    || value === ExtensionObservationPoint.mapCheckedPropertyAccess
    || value === ExtensionObservationPoint.mapCheckedElementAccess
    || value === ExtensionObservationPoint.mapCheckedOperator
    || value === ExtensionObservationPoint.mapCheckedIteration
    || value === ExtensionObservationPoint.mapCheckedConversion;
}

function checkedOperationDependencies(record: CheckedOperationRecord): readonly CheckedOperationReference[] {
  return record.allDependencies;
}

interface CheckedOperationReferenceSubjectIndex {
  readonly observations: Set<CheckedOperationObservationPointName>;
  assertion: boolean;
  readonly calls: WeakMap<object, WeakMap<object, Map<number, Set<number>>>>;
}

export class CheckedOperationReferenceIndex {
  readonly #subjects = new WeakMap<object, CheckedOperationReferenceSubjectIndex>();

  add(reference: CheckedOperationReference): boolean {
    let subject = this.#subjects.get(reference.subject);
    if (subject === undefined) {
      subject = {
        observations: new Set(),
        assertion: false,
        calls: new WeakMap(),
      };
      this.#subjects.set(reference.subject, subject);
    }
    if (reference.observation !== ExtensionObservationPoint.mapCheckedConversion) {
      if (subject.observations.has(reference.observation)) {
        return false;
      }
      subject.observations.add(reference.observation);
      return true;
    }
    if (reference.conversionKind === "assertion") {
      if (subject.assertion) {
        return false;
      }
      subject.assertion = true;
      return true;
    }
    let slots = subject.calls.get(reference.call);
    if (slots === undefined) {
      slots = new WeakMap();
      subject.calls.set(reference.call, slots);
    }
    let sourceIndices = slots.get(reference.slot);
    if (sourceIndices === undefined) {
      sourceIndices = new Map();
      slots.set(reference.slot, sourceIndices);
    }
    let targetIndices = sourceIndices.get(reference.sourceArgumentIndex);
    if (targetIndices === undefined) {
      targetIndices = new Set();
      sourceIndices.set(reference.sourceArgumentIndex, targetIndices);
    }
    if (targetIndices.has(reference.targetParameterIndex)) {
      return false;
    }
    targetIndices.add(reference.targetParameterIndex);
    return true;
  }
}

function createCheckedOperationReferenceIndex(
  references: readonly CheckedOperationReference[],
): CheckedOperationReferenceIndex {
  const index = new CheckedOperationReferenceIndex();
  for (const reference of references) {
    index.add(reference);
  }
  return index;
}

function checkedOperationReferenceArraysEqual(
  left: readonly CheckedOperationReference[],
  right: readonly CheckedOperationReference[],
): boolean {
  return left.length === right.length
    && left.every((reference, index) => checkedOperationReferenceEquals(reference, right[index]!));
}

function dependencyDeferredResult<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
): ExtensionObservationResult<ExtensionObservationResponse<TObservation>> {
  return Object.freeze({
    kind: "owner-deferred",
    observation,
    extensionId: "tsts.checked-operation-dependency",
  });
}

function checkedOperationResultState(
  result: RetainedCheckedOperationResult,
): CheckedOperationRecord["state"] {
  if (result.kind === "checked-operation-apply-unavailable") {
    return "unavailable";
  }
  if (result.kind === "accept") {
    return "accepted";
  }
  if (result.kind === "owner-deferred") {
    return "deferred";
  }
  return "unavailable";
}

function markCheckedOperationUnavailable(record: CheckedOperationRecord): void {
  record.state = "unavailable";
  delete record.pendingAcceptedResult;
  delete record.acceptedEffects;
  delete record.unresolved;
}

function normalizeCheckedOperationApplyOutcome(value: unknown): CheckedOperationApplyOutcome {
  if (value === undefined) {
    return checkedOperationApplied;
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("A checked-operation apply callback must return undefined or an exact CheckedOperationApplyOutcome object.");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new Error("A checked-operation apply outcome must be a plain object.");
  }
  const ownKeys = Reflect.ownKeys(value);
  if (ownKeys.some((key) => typeof key !== "string")) {
    throw new Error("A checked-operation apply outcome cannot contain symbol fields.");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);
  for (const key of ownKeys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      throw new Error(`A checked-operation apply outcome field '${key}' must be an enumerable own data property.`);
    }
  }
  const kind = descriptors.kind?.value;
  if (kind === "applied" || kind === "unavailable") {
    assertExactApplyOutcomeFields(ownKeys as string[], ["kind"], kind);
    return Object.freeze({ kind });
  }
  if (kind === "deferred") {
    assertExactApplyOutcomeFields(ownKeys as string[], ["kind", "unresolved"], kind);
    const unresolved = descriptors.unresolved?.value as CheckedOperationReference | undefined;
    if (unresolved === undefined) {
      throw new Error("A deferred checked-operation apply outcome requires an unresolved operation reference.");
    }
    return Object.freeze({ kind, unresolved });
  }
  throw new Error(`Unknown checked-operation apply outcome kind '${String(kind)}'.`);
}

function assertExactApplyOutcomeFields(
  actualFields: readonly string[],
  expectedFields: readonly string[],
  kind: CheckedOperationApplyOutcome["kind"],
): void {
  if (actualFields.length !== expectedFields.length || expectedFields.some((field) => !actualFields.includes(field))) {
    throw new Error(`Checked-operation apply outcome '${kind}' must contain exactly: ${expectedFields.join(", ")}.`);
  }
}
