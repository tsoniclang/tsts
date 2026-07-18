import type { Node } from "../internal/ast/spine.js";
import type { Kind } from "../internal/ast/generated/kinds.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import type { Checker } from "../internal/checker/checker/state.js";
import type { ResolvedCallEvidence, SignatureLinks, Type } from "../internal/checker/types.js";

export type ExtensionSourceDecisionEvent =
  | {
      readonly kind: "checked-call";
      readonly origin: Node;
      readonly resolvedCallEvidence: ResolvedCallEvidence;
    }
  | {
      readonly kind: "checked-property";
      readonly origin: Node;
      readonly selectedSymbol: Symbol | undefined;
      readonly resultType: Type;
      readonly receiverType: Type;
      readonly accessMode: "read" | "write" | "read-write" | "delete";
      readonly callCallee: boolean;
    }
  | {
      readonly kind: "checked-element";
      readonly origin: Node;
      readonly selectedSymbol: Symbol | undefined;
      readonly resultType: Type;
      readonly selectedElementIndex: number | undefined;
      readonly receiverType: Type;
      readonly argumentType: Type;
      readonly accessMode: "read" | "write" | "read-write" | "delete";
      readonly callCallee: boolean;
    }
  | {
      readonly kind: "checked-operator";
      readonly origin: Node;
      readonly operator: Kind;
      readonly left: Node;
      readonly right: Node | undefined;
      readonly sourceLeftType: Type;
      readonly sourceRightType: Type | undefined;
      readonly sourceResultType: Type;
    }
  | {
      readonly kind: "checked-iteration";
      readonly origin: Node;
      readonly iterationKind: "for-in" | "for-of" | "for-await-of";
      readonly sourceIterableType: Type;
      readonly sourceElementType: Type;
    }
  | {
      readonly kind: "assertion-conversion";
      readonly origin: Node;
      readonly sourceType: Type;
      readonly targetType: Type;
      readonly assertionKind: "as" | "angle-bracket" | "jsdoc";
    }
  | {
      readonly kind: "target-constraint";
      readonly origin: Node;
      readonly symbol: Symbol;
    }
  | {
      readonly kind: "runtime-carrier";
      readonly origin: Node;
      readonly type: Type;
      readonly symbol: Symbol | undefined;
    }
  | {
      readonly kind: "contextual-target";
      readonly origin: Node;
      readonly contextualType: Type;
    }
  | {
      readonly kind: "post-assignability";
      readonly origin: Node;
      readonly source: Type;
      readonly target: Type;
      readonly errorNode: Node | undefined;
      readonly expression: Node | undefined;
      readonly relation: "assignment" | "constraint" | "return" | "argument" | undefined;
    }
  | {
      readonly kind: "flow-use";
      readonly origin: Node;
      readonly symbol: Symbol;
    };

export type ExtensionSourceDecisionPhase = "idle" | "source" | "publishing" | "failed";
export type ExtensionSourceDecisionFrameKind =
  | "source-file"
  | "signature-resolution"
  | "overload-candidate"
  | "discard";
export type ExtensionSourceDecisionEventBatch = readonly ExtensionSourceDecisionEvent[];

export interface ExtensionSourceDecisionFrame {
  readonly kind: ExtensionSourceDecisionFrameKind;
  readonly eventMark: number;
  readonly depth: number;
}

export interface PreparedExtensionSourceDecision {
  readonly batch: ExtensionSourceDecisionEventBatch;
  readonly frame: ExtensionSourceDecisionFrame;
  active: boolean;
}

interface SignatureLinksSnapshot {
  readonly links: SignatureLinks;
  readonly checkedCallSelectionSeed: SignatureLinks["checkedCallSelectionSeed"];
  readonly resolvedCallSelectionEvidence: SignatureLinks["resolvedCallSelectionEvidence"];
  readonly resolvedCallEvidence: SignatureLinks["resolvedCallEvidence"];
}

interface ExtensionSourceDecisionFrameRecord extends ExtensionSourceDecisionFrame {
  settled: boolean;
  readonly signatureLinksSnapshots: SignatureLinksSnapshot[];
}

export interface ExtensionSourceDecisionState {
  phase: ExtensionSourceDecisionPhase;
  readonly events: ExtensionSourceDecisionEvent[];
  readonly frames: ExtensionSourceDecisionFrameRecord[];
  signatureLinksSnapshotCount: number;
}

const eventBudget = 65_536;
const frameBudget = 1_024;
const signatureLinksSnapshotBudget = 65_536;

export function beginSourceDecisionFrame(
  checker: Checker,
  kind: ExtensionSourceDecisionFrameKind,
): ExtensionSourceDecisionFrame | undefined {
  const existing = checker.extensionSourceDecisionState;
  if (existing === false) {
    return undefined;
  }

  const state = existing ?? createState();
  if (existing === undefined) {
    checker.extensionSourceDecisionState = state;
  }
  if (state.phase === "failed") {
    throw failedStateError();
  }
  if (state.phase === "publishing") {
    return failClosed(state, "cannot begin a frame while publishing");
  }

  if (state.phase === "idle") {
    if (kind !== "source-file") {
      return failClosed(state, "the root frame must be a source-file frame");
    }
    if (state.events.length !== 0 || state.frames.length !== 0 || state.signatureLinksSnapshotCount !== 0) {
      return failClosed(state, "idle state retained transaction data");
    }
    state.phase = "source";
  } else if (kind === "source-file") {
    return failClosed(state, "a source-file frame cannot be nested");
  }

  if (!Number.isSafeInteger(state.frames.length) || state.frames.length >= frameBudget) {
    return failClosed(state, "frame budget exceeded");
  }
  if (!Number.isSafeInteger(state.events.length)) {
    return failClosed(state, "event mark is not a safe integer");
  }

  const frame: ExtensionSourceDecisionFrameRecord = {
    kind,
    eventMark: state.events.length,
    depth: state.frames.length,
    settled: false,
    signatureLinksSnapshots: [],
  };
  state.frames.push(frame);
  return frame;
}

export function commitSourceDecisionFrame(
  checker: Checker,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  const state = stateForSettlement(checker, frame);
  if (state === undefined || frame === undefined) {
    return;
  }
  const record = activeFrame(state, frame);
  if (record.kind === "discard") {
    failClosed(state, "discard frames cannot commit");
  }
  if (record.depth === 0) {
    failClosed(state, "root source-file frames require prepareSourceDecisionFrame");
  }

  const parent = state.frames[state.frames.length - 2];
  if (parent === undefined || parent.settled) {
    return failClosed(state, "nested frame has no active parent");
  }
  mergeSignatureLinksSnapshots(state, parent, record);
  settleTopFrame(state, record);
}

export function prepareSourceDecisionFrame(
  checker: Checker,
  frame: ExtensionSourceDecisionFrame | undefined,
): PreparedExtensionSourceDecision | undefined {
  const state = stateForSettlement(checker, frame);
  if (state === undefined || frame === undefined) {
    return undefined;
  }
  const record = activeFrame(state, frame);
  if (record.kind !== "source-file"
    || record.depth !== 0
    || record.eventMark !== 0
    || state.frames.length !== 1) {
    return failClosed(state, "only the root source-file frame can be prepared");
  }
  if (state.signatureLinksSnapshotCount !== record.signatureLinksSnapshots.length) {
    return failClosed(state, "root SignatureLinks journal is inconsistent");
  }

  state.phase = "publishing";
  return {
    batch: Object.freeze(state.events.slice()),
    frame: record,
    active: true,
  };
}

export function commitPreparedSourceDecision(
  checker: Checker,
  prepared: PreparedExtensionSourceDecision | undefined,
): void {
  if (prepared === undefined) {
    return;
  }
  const state = preparedState(checker, prepared);
  const frame = prepared.frame as ExtensionSourceDecisionFrameRecord;
  frame.signatureLinksSnapshots.length = 0;
  state.signatureLinksSnapshotCount = 0;
  state.events.length = 0;
  settleTopFrame(state, frame);
  prepared.active = false;
  state.phase = "idle";
}

export function rollbackPreparedSourceDecision(
  checker: Checker,
  prepared: PreparedExtensionSourceDecision | undefined,
): void {
  if (prepared === undefined) {
    return;
  }
  const state = preparedState(checker, prepared);
  const frame = prepared.frame as ExtensionSourceDecisionFrameRecord;
  restoreSignatureLinksSnapshots(frame.signatureLinksSnapshots);
  frame.signatureLinksSnapshots.length = 0;
  state.signatureLinksSnapshotCount = 0;
  state.events.length = 0;
  settleTopFrame(state, frame);
  prepared.active = false;
  state.phase = "idle";
}

export function rollbackSourceDecisionFrame(
  checker: Checker,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  const state = stateForSettlement(checker, frame);
  if (state === undefined || frame === undefined) {
    return;
  }
  const record = activeFrame(state, frame);
  if (record.kind === "discard") {
    failClosed(state, "discard frames require rollbackDiscardSourceDecisionFrame");
  }
  rollbackTopFrame(state, record);
}

export function rollbackDiscardSourceDecisionFrame(
  checker: Checker,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  const state = stateForSettlement(checker, frame);
  if (state === undefined || frame === undefined) {
    return;
  }
  const record = activeFrame(state, frame);
  if (record.kind !== "discard") {
    failClosed(state, "rollbackDiscardSourceDecisionFrame requires a discard frame");
  }
  rollbackTopFrame(state, record);
}

export function journalSignatureLinks(checker: Checker, links: SignatureLinks): void {
  const state = checker.extensionSourceDecisionState;
  if (state === undefined || state === false || state.phase === "idle") {
    return;
  }
  if (state.phase === "failed") {
    throw failedStateError();
  }
  if (state.phase !== "source") {
    failClosed(state, "cannot journal SignatureLinks outside the source phase");
  }

  const frame = currentFrame(state);
  for (const snapshot of frame.signatureLinksSnapshots) {
    if (snapshot.links === links) {
      return;
    }
  }
  if (!Number.isSafeInteger(state.signatureLinksSnapshotCount)
    || state.signatureLinksSnapshotCount >= signatureLinksSnapshotBudget) {
    failClosed(state, "SignatureLinks snapshot budget exceeded");
  }

  frame.signatureLinksSnapshots.push({
    links,
    checkedCallSelectionSeed: links.checkedCallSelectionSeed,
    resolvedCallSelectionEvidence: links.resolvedCallSelectionEvidence,
    resolvedCallEvidence: links.resolvedCallEvidence,
  });
  state.signatureLinksSnapshotCount++;
}

export function appendEvent(checker: Checker, event: ExtensionSourceDecisionEvent): void {
  const state = checker.extensionSourceDecisionState;
  if (state === undefined || state === false || state.phase === "idle") {
    return;
  }
  if (state.phase === "failed") {
    throw failedStateError();
  }
  if (state.phase !== "source") {
    failClosed(state, "cannot append an event outside the source phase");
  }

  currentFrame(state);
  if (state.frames.some((frame) => frame.kind === "discard")) {
    return;
  }
  const sourceFile = GetSourceFileOfNode(event.origin);
  if (sourceFile === undefined) {
    failClosed(state, "an event origin has no source file");
  }
  if (sourceFile.IsDeclarationFile && isRuntimeCheckedOperationEvent(event)) {
    return;
  }
  if (!Number.isSafeInteger(state.events.length) || state.events.length >= eventBudget) {
    failClosed(state, "event budget exceeded");
  }
  state.events.push(Object.freeze({ ...event }) as ExtensionSourceDecisionEvent);
}

export function sourceDecisionRecordingActive(checker: Checker): boolean {
  const state = checker.extensionSourceDecisionState;
  return state !== undefined && state !== false && state.phase === "source";
}

export function disableSourceDecisionRecording(checker: Checker): void {
  const state = checker.extensionSourceDecisionState;
  if (state !== undefined && state !== false && state.phase !== "idle") {
    failClosed(state, "cannot disable recording while a transaction is active");
  }
  checker.extensionSourceDecisionState = false;
}

function createState(): ExtensionSourceDecisionState {
  return {
    phase: "idle",
    events: [],
    frames: [],
    signatureLinksSnapshotCount: 0,
  };
}

function stateForSettlement(
  checker: Checker,
  frame: ExtensionSourceDecisionFrame | undefined,
): ExtensionSourceDecisionState | undefined {
  const state = checker.extensionSourceDecisionState;
  if (state === undefined || state === false) {
    if (frame !== undefined) {
      throw new Error("Extension source-decision frame does not belong to this checker.");
    }
    return undefined;
  }
  if (state.phase === "failed") {
    throw failedStateError();
  }
  if (frame === undefined) {
    if (state.phase === "idle") {
      return undefined;
    }
    failClosed(state, "an active transaction cannot settle an absent frame");
  }
  if (state.phase !== "source") {
    failClosed(state, "frames can settle only in the source phase");
  }
  return state;
}

function preparedState(
  checker: Checker,
  prepared: PreparedExtensionSourceDecision,
): ExtensionSourceDecisionState {
  const state = checker.extensionSourceDecisionState;
  if (!prepared.active) {
    throw new Error("Prepared extension source decision is no longer active.");
  }
  if (state === undefined || state === false) {
    throw new Error("Prepared extension source decision does not belong to this checker.");
  }
  if (state.phase === "failed") {
    throw failedStateError();
  }
  if (state.phase !== "publishing") {
    return failClosed(state, "prepared decisions can settle only in the publishing phase");
  }
  const frame = prepared.frame as ExtensionSourceDecisionFrameRecord;
  if (state.frames.length !== 1 || state.frames[0] !== frame || frame.settled) {
    return failClosed(state, "prepared root frame is not active");
  }
  return state;
}

function isRuntimeCheckedOperationEvent(event: ExtensionSourceDecisionEvent): boolean {
  switch (event.kind) {
    case "checked-call":
    case "checked-property":
    case "checked-element":
    case "checked-operator":
    case "checked-iteration":
    case "assertion-conversion":
      return true;
    case "target-constraint":
    case "runtime-carrier":
    case "contextual-target":
    case "post-assignability":
    case "flow-use":
      return false;
  }
}

function currentFrame(state: ExtensionSourceDecisionState): ExtensionSourceDecisionFrameRecord {
  const frame = state.frames[state.frames.length - 1];
  if (frame === undefined || frame.settled || frame.depth !== state.frames.length - 1) {
    return failClosed(state, "source phase has no valid active frame");
  }
  return frame;
}

function activeFrame(
  state: ExtensionSourceDecisionState,
  frame: ExtensionSourceDecisionFrame,
): ExtensionSourceDecisionFrameRecord {
  const active = currentFrame(state);
  if (active !== frame) {
    return failClosed(state, "frames must settle exactly once in LIFO order");
  }
  if (!Number.isSafeInteger(active.eventMark)
    || active.eventMark < 0
    || active.eventMark > state.events.length) {
    return failClosed(state, "frame event mark is invalid");
  }
  return active;
}

function rollbackTopFrame(
  state: ExtensionSourceDecisionState,
  frame: ExtensionSourceDecisionFrameRecord,
): void {
  restoreSignatureLinksSnapshots(frame.signatureLinksSnapshots);
  removeSignatureLinksSnapshots(state, frame.signatureLinksSnapshots.length);
  frame.signatureLinksSnapshots.length = 0;
  state.events.length = frame.eventMark;
  settleTopFrame(state, frame);

  if (frame.depth === 0) {
    if (frame.kind !== "source-file" || state.frames.length !== 0 || state.signatureLinksSnapshotCount !== 0) {
      failClosed(state, "root rollback did not empty the transaction");
    }
    state.events.length = 0;
    state.phase = "idle";
  }
}

function settleTopFrame(
  state: ExtensionSourceDecisionState,
  frame: ExtensionSourceDecisionFrameRecord,
): void {
  const popped = state.frames.pop();
  if (popped !== frame || frame.settled) {
    failClosed(state, "frame settlement violated LIFO order");
  }
  frame.settled = true;
}

function mergeSignatureLinksSnapshots(
  state: ExtensionSourceDecisionState,
  parent: ExtensionSourceDecisionFrameRecord,
  child: ExtensionSourceDecisionFrameRecord,
): void {
  for (const childSnapshot of child.signatureLinksSnapshots) {
    let alreadyJournaled = false;
    for (const parentSnapshot of parent.signatureLinksSnapshots) {
      if (parentSnapshot.links === childSnapshot.links) {
        alreadyJournaled = true;
        break;
      }
    }
    if (alreadyJournaled) {
      removeSignatureLinksSnapshots(state, 1);
    } else {
      parent.signatureLinksSnapshots.push(childSnapshot);
    }
  }
  child.signatureLinksSnapshots.length = 0;
}

function removeSignatureLinksSnapshots(state: ExtensionSourceDecisionState, count: number): void {
  if (!Number.isSafeInteger(count)
    || count < 0
    || !Number.isSafeInteger(state.signatureLinksSnapshotCount)
    || count > state.signatureLinksSnapshotCount) {
    failClosed(state, "SignatureLinks snapshot count is inconsistent");
  }
  state.signatureLinksSnapshotCount -= count;
}

function restoreSignatureLinksSnapshots(snapshots: readonly SignatureLinksSnapshot[]): void {
  for (let index = snapshots.length - 1; index >= 0; index--) {
    const snapshot = snapshots[index];
    if (snapshot === undefined) {
      throw new Error("Extension source-decision SignatureLinks journal is sparse.");
    }
    snapshot.links.checkedCallSelectionSeed = snapshot.checkedCallSelectionSeed;
    snapshot.links.resolvedCallSelectionEvidence = snapshot.resolvedCallSelectionEvidence;
    snapshot.links.resolvedCallEvidence = snapshot.resolvedCallEvidence;
  }
}

function failClosed(state: ExtensionSourceDecisionState, reason: string): never {
  state.phase = "failed";
  for (let frameIndex = state.frames.length - 1; frameIndex >= 0; frameIndex--) {
    const frame = state.frames[frameIndex];
    if (frame !== undefined) {
      restoreSignatureLinksSnapshots(frame.signatureLinksSnapshots);
      frame.signatureLinksSnapshots.length = 0;
      frame.settled = true;
    }
  }
  state.events.length = 0;
  state.frames.length = 0;
  state.signatureLinksSnapshotCount = 0;
  throw new Error(`Extension source-decision transaction failed closed: ${reason}.`);
}

function failedStateError(): Error {
  return new Error("Extension source-decision transaction is permanently failed.");
}
