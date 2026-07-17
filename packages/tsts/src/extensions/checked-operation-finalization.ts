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
import { checkedOperationRequestEquals } from "./checked-operation-request-equality.js";
import {
  type CheckedOperationRequestSnapshotCache,
  snapshotCheckedOperationRequest,
  snapshotCheckedOperationResult,
} from "./checked-operation-value-snapshot.js";

type AnyCheckedOperationResult = ExtensionObservationResult<unknown>;

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
  readonly evaluate: (phase: ExtensionObservationPhase) => AnyCheckedOperationResult;
  readonly apply: (result: AnyCheckedOperationResult) => unknown;
  result?: RetainedCheckedOperationResult;
  unresolved?: CheckedOperationReference;
  state: "evaluating" | "deferred" | "accepted" | "unavailable";
}

interface CheckedOperationTraversalFrame {
  readonly record: CheckedOperationRecord;
  nextDependencyIndex: number;
}

export interface CheckedOperationInventoryCallbacks {
  readonly beginAttempt: () => unknown;
  readonly commitAttempt: (attempt: unknown) => void;
  readonly rollbackAttempt: (attempt: unknown) => void;
  readonly discardAttemptPreservingDiagnostics: (attempt: unknown) => void;
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
  readonly #callbacks: CheckedOperationInventoryCallbacks;
  readonly #executionStages: Array<"evaluating" | "applying"> = [];
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
    ) => unknown,
    phase: ExtensionObservationPhase,
    requestSnapshotCache?: CheckedOperationRequestSnapshotCache,
    dependencies: readonly CheckedOperationReference[] = [],
  ): ExtensionObservationResult<ExtensionObservationResponse<TObservation>> {
    this.#assertRecordingAvailable("record");
    if (this.#executionStages[this.#executionStages.length - 1] === "evaluating") {
      const error = new Error("A checked-operation mapper cannot record another checked operation while it is being evaluated.");
      this.#fail(error);
      throw error;
    }
    const incomingRequest = snapshotCheckedOperationRequest(observation, request, requestSnapshotCache);
    const incomingDependencies = snapshotCheckedOperationReferences(dependencies);
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
    if (existing !== undefined) {
      if (existing.state === "evaluating") {
        const error = new Error(`Checked operation '${observation}' re-entered while its selected mapping was being evaluated.`);
        this.#fail(error);
        throw error;
      }
      if (existing.result === undefined) {
        throw new Error("Active checked operation has no observation result.");
      }
      return existing.result as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>;
    }
    const immutableRequest = incomingRequest;
    const subject = checkedOperationSubject(observation, immutableRequest);
    const evaluateRecord = (phase: ExtensionObservationPhase): AnyCheckedOperationResult => snapshotCheckedOperationResult(
      observation,
      evaluate(immutableRequest, phase),
    ) as AnyCheckedOperationResult;
    const applyRecord = (result: AnyCheckedOperationResult): unknown => {
      return apply(result as ExtensionObservationResult<ExtensionObservationResponse<TObservation>>, immutableRequest);
    };
    const record: CheckedOperationRecord = {
      observation,
      subject,
      reference: checkedOperationReference(observation, immutableRequest, subject),
      request: immutableRequest,
      dependencies: incomingDependencies,
      evaluate: evaluateRecord,
      apply: applyRecord,
      state: "evaluating",
    };
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
      while (this.#records.some((record) => record.state === "deferred")) {
        let completedDeferredRecord = false;
        for (const record of this.#dependencyOrderedRecords()) {
          if (record.state !== "deferred") {
            continue;
          }
          const dependencyReadiness = this.#dependencyReadiness(record, true);
          if (dependencyReadiness === "blocked") {
            record.state = "unavailable";
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
          if (record.state === "deferred") {
            const unresolved = record.unresolved;
            this.#callbacks.onUnresolved(unresolved?.observation ?? record.observation, unresolved?.subject ?? record.subject);
            record.state = "unavailable";
          }
          completedDeferredRecord = true;
        }
        if (!completedDeferredRecord) {
          throw new Error("Checked-operation finalization made no progress while deferred operations remained.");
        }
      }
      this.#validatePrimaryOperationUniqueness();
      this.#state = "finalized";
    } catch (error) {
      this.#fail(asError(error));
      throw error;
    }
  }

  #assertRecordingAvailable(action: "record"): void {
    if (this.#state === "failed") {
      throw new Error(`Cannot ${action} a checked operation after semantic finalization failed.`);
    }
    if (this.#state === "finalized") {
      throw new Error(`Cannot ${action} a checked operation after semantic finalization.`);
    }
    if (this.#state === "finalizing" && this.#executionStages[this.#executionStages.length - 1] !== "applying") {
      throw new Error(`Cannot ${action} a checked operation outside checked-operation result application during finalization.`);
    }
  }

  #runAttempt(record: CheckedOperationRecord, phase: ExtensionObservationPhase): RetainedCheckedOperationResult {
    const attempt = this.#callbacks.beginAttempt();
    let attemptOpen = true;
    try {
      const result = this.#withExecutionStage("evaluating", () => record.evaluate(phase));
      this.#throwIfFailed();
      if (result.kind === "accept") {
        const applyOutcome = normalizeCheckedOperationApplyOutcome(this.#withExecutionStage("applying", () => record.apply(result)));
        if (applyOutcome.kind === "applied") {
          this.#callbacks.commitAttempt(attempt);
          attemptOpen = false;
          delete record.unresolved;
          return result;
        }
        attemptOpen = false;
        this.#callbacks.discardAttemptPreservingDiagnostics(attempt);
        if (applyOutcome.kind === "deferred") {
          record.unresolved = applyOutcome.unresolved;
          return dependencyDeferredResult(record.observation);
        }
        delete record.unresolved;
        return checkedOperationUnavailableResult;
      } else {
        attemptOpen = false;
        this.#callbacks.discardAttemptPreservingDiagnostics(attempt);
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
    for (const dependency of record.dependencies) {
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

  #withExecutionStage<T>(stage: "evaluating" | "applying", callback: () => T): T {
    this.#executionStages.push(stage);
    try {
      return callback();
    } finally {
      const completed = this.#executionStages.pop();
      if (completed !== stage) {
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
      const stack: CheckedOperationTraversalFrame[] = [{ record: root, nextDependencyIndex: 0 }];
      visiting.add(root);
      while (stack.length !== 0) {
        const frame = stack[stack.length - 1]!;
        const dependency = frame.record.dependencies[frame.nextDependencyIndex];
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
          stack.push({ record: dependencyRecord, nextDependencyIndex: 0 });
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

function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

function snapshotCheckedOperationReferences(references: readonly CheckedOperationReference[]): readonly CheckedOperationReference[] {
  const snapshots: CheckedOperationReference[] = [];
  const snapshotsBySubject = new WeakMap<object, CheckedOperationReference[]>();
  for (const reference of references) {
    const snapshot = Object.freeze({
      observation: reference.observation,
      subject: reference.subject,
      ...(reference.conversionKind === undefined ? {} : { conversionKind: reference.conversionKind }),
      ...(reference.call === undefined ? {} : { call: reference.call }),
      ...(reference.slot === undefined ? {} : { slot: reference.slot }),
      ...(reference.sourceArgumentIndex === undefined ? {} : { sourceArgumentIndex: reference.sourceArgumentIndex }),
      ...(reference.targetParameterIndex === undefined ? {} : { targetParameterIndex: reference.targetParameterIndex }),
    }) as CheckedOperationReference;
    const subjectSnapshots = snapshotsBySubject.get(reference.subject) ?? [];
    if (!subjectSnapshots.some((existing) => checkedOperationReferenceEquals(existing, snapshot))) {
      snapshots.push(snapshot);
      subjectSnapshots.push(snapshot);
      snapshotsBySubject.set(reference.subject, subjectSnapshots);
    }
  }
  return Object.freeze(snapshots);
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

function normalizeCheckedOperationApplyOutcome(value: unknown): CheckedOperationApplyOutcome {
  if (typeof value !== "object" || value === null) {
    return checkedOperationApplied;
  }
  const kind = Object.getOwnPropertyDescriptor(value, "kind")?.value;
  if (kind === "applied" || kind === "unavailable") {
    return Object.freeze({ kind });
  }
  if (kind === "deferred") {
    const unresolved = Object.getOwnPropertyDescriptor(value, "unresolved")?.value as CheckedOperationReference | undefined;
    if (unresolved === undefined) {
      throw new Error("A deferred checked-operation apply outcome requires an unresolved operation reference.");
    }
    return Object.freeze({ kind, unresolved });
  }
  return checkedOperationApplied;
}
