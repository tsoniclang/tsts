import type { ExtensionFactSubject } from "./host.js";
import type { CheckedOperationReference, SelectedSourceReceiverEvidence } from "./observations.js";

export interface CheckedCalleeSelectionEvidence extends SelectedSourceReceiverEvidence {
  readonly sourceInputOperations?: readonly CheckedOperationReference[];
}

export interface CheckedCalleeSelectionInventoryCallbacks {
  readonly onConflict: (
    call: ExtensionFactSubject,
    existing: CheckedCalleeSelectionEvidence,
    incoming: CheckedCalleeSelectionEvidence,
  ) => void;
}

export class CheckedCalleeSelectionInventory {
  readonly #evidenceByCall = new WeakMap<object, CheckedCalleeSelectionEvidence>();
  readonly #callbacks: CheckedCalleeSelectionInventoryCallbacks;

  constructor(callbacks: CheckedCalleeSelectionInventoryCallbacks) {
    this.#callbacks = callbacks;
  }

  retain(call: ExtensionFactSubject, evidence: CheckedCalleeSelectionEvidence): CheckedCalleeSelectionEvidence {
    const immutableEvidence = snapshotCheckedCalleeSelectionEvidence(evidence);
    const existing = this.#evidenceByCall.get(call);
    if (existing === undefined) {
      this.#evidenceByCall.set(call, immutableEvidence);
      return immutableEvidence;
    }
    if (!checkedCalleeSelectionEvidenceEquals(existing, immutableEvidence)) {
      this.#callbacks.onConflict(call, existing, immutableEvidence);
    }
    return existing;
  }

  get(call: ExtensionFactSubject | undefined): CheckedCalleeSelectionEvidence | undefined {
    return call === undefined ? undefined : this.#evidenceByCall.get(call);
  }
}

export function differingCheckedCalleeSelectionEvidenceFields(
  left: CheckedCalleeSelectionEvidence,
  right: CheckedCalleeSelectionEvidence,
): readonly string[] {
  const differences: string[] = [];
  compareIdentity(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareIdentity(differences, "sourceReceiverType", left.sourceReceiverType, right.sourceReceiverType);
  compareOperationReferences(differences, "sourceInputOperations", left.sourceInputOperations, right.sourceInputOperations);
  return Object.freeze(differences);
}

function snapshotCheckedCalleeSelectionEvidence(evidence: CheckedCalleeSelectionEvidence): CheckedCalleeSelectionEvidence {
  return Object.freeze({
    ...(evidence.sourceReceiver === undefined ? {} : { sourceReceiver: evidence.sourceReceiver }),
    ...(evidence.sourceReceiverType === undefined ? {} : { sourceReceiverType: evidence.sourceReceiverType }),
    ...(evidence.sourceInputOperations === undefined ? {} : {
      sourceInputOperations: Object.freeze(evidence.sourceInputOperations.map(snapshotCheckedOperationReference)),
    }),
  });
}

function snapshotCheckedOperationReference(reference: CheckedOperationReference): CheckedOperationReference {
  return Object.freeze({
    observation: reference.observation,
    subject: reference.subject,
    ...(reference.conversionKind === undefined ? {} : { conversionKind: reference.conversionKind }),
    ...(reference.call === undefined ? {} : { call: reference.call }),
    ...(reference.slot === undefined ? {} : { slot: reference.slot }),
    ...(reference.sourceArgumentIndex === undefined ? {} : { sourceArgumentIndex: reference.sourceArgumentIndex }),
    ...(reference.targetParameterIndex === undefined ? {} : { targetParameterIndex: reference.targetParameterIndex }),
  }) as CheckedOperationReference;
}

function checkedCalleeSelectionEvidenceEquals(left: CheckedCalleeSelectionEvidence, right: CheckedCalleeSelectionEvidence): boolean {
  return differingCheckedCalleeSelectionEvidenceFields(left, right).length === 0;
}

function compareIdentity(differences: string[], field: string, left: unknown, right: unknown): void {
  if (left !== right) {
    differences.push(field);
  }
}

function compareOperationReferences(
  differences: string[],
  field: string,
  left: readonly CheckedOperationReference[] | undefined,
  right: readonly CheckedOperationReference[] | undefined,
): void {
  if (left === undefined || right === undefined) {
    if (left !== right) {
      differences.push(field);
    }
    return;
  }
  if (left.length !== right.length || left.some((reference, index) => !checkedOperationReferenceEquals(reference, right[index]!))) {
    differences.push(field);
  }
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
