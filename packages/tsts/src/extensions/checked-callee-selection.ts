import type { ExtensionFactSubject } from "./host.js";
import type { SelectedSourceValueEvidence } from "./facts.js";
import type { CheckedOperationReference } from "./observations.js";

export interface CheckedCalleeSelectionEvidence {
  readonly sourceReceiver?: SelectedSourceValueEvidence;
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
  compareSelectedSourceValueEvidence(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareOperationReferences(differences, "sourceInputOperations", left.sourceInputOperations, right.sourceInputOperations);
  return Object.freeze(differences);
}

function snapshotCheckedCalleeSelectionEvidence(evidence: CheckedCalleeSelectionEvidence): CheckedCalleeSelectionEvidence {
  return Object.freeze({
    ...(evidence.sourceReceiver === undefined ? {} : { sourceReceiver: snapshotSelectedSourceValueEvidence(evidence.sourceReceiver) }),
    ...(evidence.sourceInputOperations === undefined ? {} : {
      sourceInputOperations: Object.freeze(evidence.sourceInputOperations.map(snapshotCheckedOperationReference)),
    }),
  });
}

function snapshotSelectedSourceValueEvidence(evidence: SelectedSourceValueEvidence): SelectedSourceValueEvidence {
  return Object.freeze({
    expression: evidence.expression,
    type: evidence.type,
    ...(evidence.symbol === undefined ? {} : { symbol: evidence.symbol }),
    ...(evidence.declaration === undefined ? {} : { declaration: evidence.declaration }),
    ...(evidence.selectedSymbol === undefined ? {} : { selectedSymbol: evidence.selectedSymbol }),
    ...(evidence.selectedDeclaration === undefined ? {} : { selectedDeclaration: evidence.selectedDeclaration }),
    ...(evidence.authoredTypeNode === undefined ? {} : { authoredTypeNode: evidence.authoredTypeNode }),
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

function compareSelectedSourceValueEvidence(
  differences: string[],
  field: string,
  left: SelectedSourceValueEvidence | undefined,
  right: SelectedSourceValueEvidence | undefined,
): void {
  if (left === undefined || right === undefined) {
    if (left !== right) {
      differences.push(field);
    }
    return;
  }
  if (left.expression !== right.expression
    || left.type !== right.type
    || left.symbol !== right.symbol
    || left.declaration !== right.declaration
    || left.selectedSymbol !== right.selectedSymbol
    || left.selectedDeclaration !== right.selectedDeclaration
    || left.authoredTypeNode !== right.authoredTypeNode) {
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
