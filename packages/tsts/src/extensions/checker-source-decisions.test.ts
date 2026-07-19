import { test } from "node:test";
import assert from "node:assert/strict";
import type { SourceFile } from "../internal/ast/ast.js";
import type { SourceFileParseOptions } from "../internal/ast/parseoptions.js";
import type { Node } from "../internal/ast/spine.js";
import { KindIdentifier } from "../internal/ast/generated/kinds.js";
import { ScriptKindTS } from "../internal/core/scriptkind.js";
import type { Checker } from "../internal/checker/checker/state.js";
import type { Signature, SignatureLinks, Type } from "../internal/checker/types.js";
import { ParseSourceFile } from "../internal/parser/parser/statements-declarations.js";
import {
  appendEvent,
  beginSourceDecisionFrame,
  commitPreparedSourceDecision,
  commitSourceDecisionFrame,
  journalSignatureLinks,
  prepareSourceDecisionFrame,
  rollbackDiscardSourceDecisionFrame,
  rollbackSourceDecisionFrame,
} from "./checker-source-decisions.js";
import type {
  ExtensionSourceDecisionEvent,
  ExtensionSourceDecisionFrame,
  ExtensionSourceDecisionFrameKind,
  ExtensionSourceDecisionState,
} from "./checker-source-decisions.js";

test("source-decision frames require strict LIFO settlement and remain failed afterward", () => {
  const checker = createChecker();
  const root = beginFrame(checker, "source-file");
  const child = beginFrame(checker, "signature-resolution");

  assert.throws(
    () => commitSourceDecisionFrame(checker, root),
    /frames must settle exactly once in LIFO order/,
  );
  assert.equal(requireState(checker).phase, "failed");
  assert.throws(
    () => rollbackSourceDecisionFrame(checker, child),
    /transaction is permanently failed/,
  );
  assert.throws(
    () => beginSourceDecisionFrame(checker, "source-file"),
    /transaction is permanently failed/,
  );
});

test("source-decision frames reject a second settlement of the same frame", () => {
  const checker = createChecker();
  const root = beginFrame(checker, "source-file");
  const child = beginFrame(checker, "overload-candidate");

  assert.equal(commitSourceDecisionFrame(checker, child), undefined);
  assert.throws(
    () => commitSourceDecisionFrame(checker, child),
    /frames must settle exactly once in LIFO order/,
  );
  assert.equal(requireState(checker).phase, "failed");
  assert.throws(
    () => commitSourceDecisionFrame(checker, root),
    /transaction is permanently failed/,
  );
});

test("source-decision root frames settle exactly once", () => {
  const checker = createChecker();
  const root = beginFrame(checker, "source-file");

  assert.deepEqual(prepareAndCommitRoot(checker, root), []);
  assert.equal(requireState(checker).phase, "idle");
  assert.throws(
    () => prepareSourceDecisionFrame(checker, root),
    /frames can settle only in the source phase|no valid active frame/,
  );
  assert.equal(requireState(checker).phase, "failed");
});

test("nested commit merges SignatureLinks rollback ownership into the parent", () => {
  const checker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const links = createSignatureLinks();
  const originalSeed = links.checkedCallSelectionSeed;
  const originalSelection = links.resolvedCallSelectionEvidence;
  const originalEvidence = links.resolvedCallEvidence;
  const selectedSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const selectedSelection = {} as NonNullable<SignatureLinks["resolvedCallSelectionEvidence"]>;
  const selectedEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const root = beginFrame(checker, "source-file", implementation);

  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), createType()));
  const child = beginFrame(checker, "signature-resolution");
  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = selectedSeed;
  links.resolvedCallSelectionEvidence = selectedSelection;
  links.resolvedCallEvidence = selectedEvidence;
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), createType()));
  assert.equal(commitSourceDecisionFrame(checker, child), undefined);
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), createType()));

  rollbackSourceDecisionFrame(checker, root);

  assert.equal(links.checkedCallSelectionSeed, originalSeed);
  assert.equal(links.resolvedCallSelectionEvidence, originalSelection);
  assert.equal(links.resolvedCallEvidence, originalEvidence);
  assert.equal(requireState(checker).phase, "idle");
  assert.equal(requireState(checker).events.length, 0);
  assert.equal(requireState(checker).signatureLinksSnapshotCount, 0);
});

test("rollback preserves exact extension evidence created with a newly cached TS-Go signature", () => {
  const checker = createChecker();
  const links = createSignatureLinks();
  const selectedSignature = {} as Signature;
  const selectedSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const selectedSelection = {
    selectedSignature,
  } as NonNullable<SignatureLinks["resolvedCallSelectionEvidence"]>;
  const selectedEvidence = {
    selectedSignature,
  } as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const root = beginFrame(checker, "source-file");

  journalSignatureLinks(checker, links);
  links.resolvedSignature = selectedSignature;
  links.checkedCallSelectionSeed = selectedSeed;
  links.resolvedCallSelectionEvidence = selectedSelection;
  links.resolvedCallEvidence = selectedEvidence;

  rollbackSourceDecisionFrame(checker, root);

  assert.equal(links.resolvedSignature, selectedSignature);
  assert.equal(links.checkedCallSelectionSeed, selectedSeed);
  assert.equal(links.resolvedCallSelectionEvidence, selectedSelection);
  assert.equal(links.resolvedCallEvidence, selectedEvidence);
});

test("rollback clears stale extension evidence when TS-Go installs a different cached signature", () => {
  const checker = createChecker();
  const links = createSignatureLinks();
  const selectedSignature = {} as Signature;
  const root = beginFrame(checker, "source-file");

  journalSignatureLinks(checker, links);
  links.resolvedSignature = selectedSignature;

  rollbackSourceDecisionFrame(checker, root);

  assert.equal(links.resolvedSignature, selectedSignature);
  assert.equal(links.checkedCallSelectionSeed, undefined);
  assert.equal(links.resolvedCallSelectionEvidence, undefined);
  assert.equal(links.resolvedCallEvidence, undefined);
});

test("nested commit keeps the parent's earliest SignatureLinks snapshot when both frames journal the same links", () => {
  const checker = createChecker();
  const links = createSignatureLinks();
  const originalSeed = links.checkedCallSelectionSeed;
  const originalEvidence = links.resolvedCallEvidence;
  const parentSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const parentEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const childSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const childEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const root = beginFrame(checker, "source-file");

  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = parentSeed;
  links.resolvedCallEvidence = parentEvidence;
  journalSignatureLinks(checker, links);
  const child = beginFrame(checker, "signature-resolution");
  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = childSeed;
  links.resolvedCallEvidence = childEvidence;
  assert.equal(commitSourceDecisionFrame(checker, child), undefined);

  rollbackSourceDecisionFrame(checker, root);

  assert.equal(links.checkedCallSelectionSeed, originalSeed);
  assert.equal(links.resolvedCallEvidence, originalEvidence);
  assert.equal(requireState(checker).signatureLinksSnapshotCount, 0);
});

test("nested commits retain events in deterministic source order", () => {
  const checker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const firstType = createType();
  const secondType = createType();
  const thirdType = createType();
  const root = beginFrame(checker, "source-file", implementation);

  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), firstType));
  const child = beginFrame(checker, "overload-candidate");
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), secondType));
  assert.equal(commitSourceDecisionFrame(checker, child), undefined);
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), thirdType));

  const batch = prepareAndCommitRoot(checker, root);
  assert.deepEqual(batch.map((event) => requireContextualTarget(event).contextualType), [
    firstType,
    secondType,
    thirdType,
  ]);
  assert.equal(requireState(checker).phase, "idle");
});

test("nested rollback restores each SignatureLinks mutation to its frame boundary", () => {
  const checker = createChecker();
  const links = createSignatureLinks();
  const originalSeed = links.checkedCallSelectionSeed;
  const originalEvidence = links.resolvedCallEvidence;
  const parentSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const parentEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const childSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const childEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const root = beginFrame(checker, "source-file");

  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = parentSeed;
  links.resolvedCallEvidence = parentEvidence;
  const child = beginFrame(checker, "overload-candidate");
  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = childSeed;
  links.resolvedCallEvidence = childEvidence;

  rollbackSourceDecisionFrame(checker, child);
  assert.equal(links.checkedCallSelectionSeed, parentSeed);
  assert.equal(links.resolvedCallEvidence, parentEvidence);

  rollbackSourceDecisionFrame(checker, root);
  assert.equal(links.checkedCallSelectionSeed, originalSeed);
  assert.equal(links.resolvedCallEvidence, originalEvidence);
  assert.equal(requireState(checker).phase, "idle");
});

test("discard frames publish no events and restore their SignatureLinks mutations", () => {
  const checker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const links = createSignatureLinks();
  const originalSeed = links.checkedCallSelectionSeed;
  const originalEvidence = links.resolvedCallEvidence;
  const discardedSeed = {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>;
  const discardedEvidence = {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>;
  const beforeType = createType();
  const discardedType = createType();
  const afterType = createType();
  const root = beginFrame(checker, "source-file", implementation);

  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), beforeType));
  const discard = beginFrame(checker, "discard");
  journalSignatureLinks(checker, links);
  links.checkedCallSelectionSeed = discardedSeed;
  links.resolvedCallEvidence = discardedEvidence;
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), discardedType));
  rollbackDiscardSourceDecisionFrame(checker, discard);
  appendEvent(checker, contextualTargetEvent(ownedNode(implementation), afterType));

  const batch = prepareAndCommitRoot(checker, root);

  assert.equal(links.checkedCallSelectionSeed, originalSeed);
  assert.equal(links.resolvedCallEvidence, originalEvidence);
  assert.deepEqual(batch.map((event) => requireContextualTarget(event).contextualType), [
    beforeType,
    afterType,
  ]);
});

test("frame kind-specific settlement APIs fail closed when interchanged", () => {
  const discardChecker = createChecker();
  beginFrame(discardChecker, "source-file");
  const discard = beginFrame(discardChecker, "discard");
  assert.throws(
    () => commitSourceDecisionFrame(discardChecker, discard),
    /discard frames cannot commit/,
  );
  assert.equal(requireState(discardChecker).phase, "failed");

  const candidateChecker = createChecker();
  beginFrame(candidateChecker, "source-file");
  const candidate = beginFrame(candidateChecker, "overload-candidate");
  assert.throws(
    () => rollbackDiscardSourceDecisionFrame(candidateChecker, candidate),
    /requires a discard frame/,
  );
  assert.equal(requireState(candidateChecker).phase, "failed");
});

test("declaration files suppress runtime operation events but retain their own semantic decisions", () => {
  const checker = createChecker();
  const declarations = parseSourceFile("/src/profile.d.ts");
  const implementation = parseSourceFile("/src/index.ts");
  const declarationType = createType();
  const implementationType = createType();
  const declarationRoot = beginFrame(checker, "source-file", declarations);

  assert.equal(declarations.IsDeclarationFile, true);
  assert.equal(implementation.IsDeclarationFile, false);
  appendEvent(checker, checkedOperatorEvent(declarations, declarationType));
  appendEvent(checker, contextualTargetEvent(declarations, declarationType));
  const declarationBatch = prepareAndCommitRoot(checker, declarationRoot);

  assert.equal(declarationBatch.length, 1);
  assert.equal(requireContextualTarget(declarationBatch[0]).contextualType, declarationType);

  const implementationRoot = beginFrame(checker, "source-file", implementation);
  appendEvent(checker, contextualTargetEvent(implementation, implementationType));
  const implementationBatch = prepareAndCommitRoot(checker, implementationRoot);
  assert.equal(implementationBatch.length, 1);
  assert.equal(requireContextualTarget(implementationBatch[0]).contextualType, implementationType);
});

test("source-decision roots reject events owned by another source file", () => {
  const checker = createChecker();
  const owner = parseSourceFile("/src/owner.ts");
  const foreign = parseSourceFile("/src/foreign.ts");
  beginFrame(checker, "source-file", owner);

  assert.throws(
    () => appendEvent(checker, contextualTargetEvent(foreign, createType())),
    /active source-file owner/,
  );
  assert.equal(requireState(checker).phase, "failed");
});

test("an event origin without a source file fails closed", () => {
  const checker = createChecker();
  const detachedOrigin = { Kind: KindIdentifier, Parent: undefined } as Node;
  beginFrame(checker, "source-file");

  assert.throws(
    () => appendEvent(checker, contextualTargetEvent(detachedOrigin, createType())),
    /source file/,
  );
  assert.equal(requireState(checker).phase, "failed");
  assert.throws(
    () => appendEvent(checker, contextualTargetEvent(detachedOrigin, createType())),
    /transaction is permanently failed/,
  );
});

test("committed event batches contain immutable snapshots of event envelopes", () => {
  const checker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const originalType = createType();
  const replacementType = createType();
  const mutableEvent: {
    kind: "contextual-target";
    origin: Node;
    contextualType: Type;
  } = {
    kind: "contextual-target",
    origin: implementation,
    contextualType: originalType,
  };
  const root = beginFrame(checker, "source-file", implementation);

  appendEvent(checker, mutableEvent);
  mutableEvent.contextualType = replacementType;
  const batch = prepareAndCommitRoot(checker, root);

  assert.ok(Object.isFrozen(batch));
  assert.ok(Object.isFrozen(batch[0]));
  assert.notEqual(batch[0], mutableEvent);
  assert.equal(requireContextualTarget(batch[0]).contextualType, originalType);
  assert.throws(
    () => Object.defineProperty(batch[0], "contextualType", { value: replacementType }),
    TypeError,
  );
});

test("equivalent repeated decisions are idempotent and conflicting decisions fail closed", () => {
  const checker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const expression = ownedNode(implementation);
  const firstType = createType();
  const conflictingType = createType();
  const root = beginFrame(checker, "source-file", implementation);

  appendEvent(checker, contextualTargetEvent(expression, firstType));
  appendEvent(checker, contextualTargetEvent(expression, firstType));
  assert.equal(requireState(checker).events.length, 1);
  assert.throws(
    () => appendEvent(checker, contextualTargetEvent(expression, conflictingType)),
    /conflicting 'contextual-target' events/,
  );
  assert.equal(requireState(checker).phase, "failed");
  assert.throws(() => prepareSourceDecisionFrame(checker, root), /permanently failed/);
});

test("source-decision event and frame budgets fail closed at their exact finite bounds", () => {
  const eventChecker = createChecker();
  const implementation = parseSourceFile("/src/index.ts");
  const type = createType();
  beginFrame(eventChecker, "source-file", implementation);
  for (let index = 0; index < 65_536; index++) {
    appendEvent(eventChecker, contextualTargetEvent(ownedNode(implementation), type));
  }
  assert.throws(
    () => appendEvent(eventChecker, contextualTargetEvent(ownedNode(implementation), type)),
    /event budget exceeded/,
  );
  assert.equal(requireState(eventChecker).phase, "failed");

  const frameChecker = createChecker();
  beginFrame(frameChecker, "source-file");
  for (let depth = 1; depth < 1_024; depth++) {
    beginFrame(frameChecker, "signature-resolution");
  }
  assert.throws(
    () => beginSourceDecisionFrame(frameChecker, "signature-resolution"),
    /frame budget exceeded/,
  );
  assert.equal(requireState(frameChecker).phase, "failed");
});

test("a failed source-decision state cannot be restarted or silently disabled", () => {
  const checker = createChecker();

  assert.throws(
    () => beginSourceDecisionFrame(checker, "signature-resolution"),
    /root frame must be a source-file frame/,
  );
  assert.equal(requireState(checker).phase, "failed");
  assert.throws(
    () => beginSourceDecisionFrame(checker, "source-file"),
    /transaction is permanently failed/,
  );
  assert.throws(
    () => commitSourceDecisionFrame(checker, undefined),
    /transaction is permanently failed/,
  );
});

test("a checker that explicitly disables source decisions remains a no-op", () => {
  const checker = createChecker(false);
  const origin = parseSourceFile("/src/index.ts");
  const links = createSignatureLinks();

  assert.equal(beginSourceDecisionFrame(checker, "source-file"), undefined);
  appendEvent(checker, contextualTargetEvent(origin, createType()));
  journalSignatureLinks(checker, links);
  assert.equal(commitSourceDecisionFrame(checker, undefined), undefined);
  rollbackSourceDecisionFrame(checker, undefined);
  rollbackDiscardSourceDecisionFrame(checker, undefined);
  assert.equal(checker.extensionSourceDecisionState, false);
});

function createChecker(
  extensionSourceDecisionState: Checker["extensionSourceDecisionState"] = undefined,
): Checker {
  return { extensionSourceDecisionState } as Checker;
}

function beginFrame(
  checker: Checker,
  kind: ExtensionSourceDecisionFrameKind,
  ownerSourceFile: SourceFile = parseSourceFile("/src/owner.ts"),
): ExtensionSourceDecisionFrame {
  const frame = beginSourceDecisionFrame(checker, kind, kind === "source-file" ? ownerSourceFile : undefined);
  assert.ok(frame !== undefined);
  return frame;
}

function ownedNode(sourceFile: SourceFile): Node {
  return { Kind: KindIdentifier, Parent: sourceFile } as unknown as Node;
}

function prepareAndCommitRoot(
  checker: Checker,
  root: ExtensionSourceDecisionFrame,
): readonly ExtensionSourceDecisionEvent[] {
  const prepared = prepareSourceDecisionFrame(checker, root);
  assert.ok(prepared !== undefined);
  const batch = prepared.batch;
  commitPreparedSourceDecision(checker, prepared);
  return batch;
}

function requireState(checker: Checker): ExtensionSourceDecisionState {
  const state = checker.extensionSourceDecisionState;
  assert.ok(state !== undefined && state !== false);
  return state;
}

function parseSourceFile(fileName: string): SourceFile {
  const sourceFile = ParseSourceFile(
    { FileName: fileName, Path: fileName } satisfies SourceFileParseOptions,
    "export {};",
    ScriptKindTS,
  );
  assert.ok(sourceFile !== undefined);
  return sourceFile;
}

function contextualTargetEvent(origin: Node, contextualType: Type): ExtensionSourceDecisionEvent {
  return {
    kind: "contextual-target",
    origin,
    contextualType,
  };
}

function checkedOperatorEvent(origin: Node, type: Type): ExtensionSourceDecisionEvent {
  return {
    kind: "checked-operator",
    origin,
    operator: KindIdentifier,
    left: origin,
    right: undefined,
    sourceLeftType: type,
    sourceRightType: undefined,
    sourceResultType: type,
  };
}

function requireContextualTarget(
  event: ExtensionSourceDecisionEvent | undefined,
): Extract<ExtensionSourceDecisionEvent, { readonly kind: "contextual-target" }> {
  assert.ok(event !== undefined && event.kind === "contextual-target");
  return event;
}

function createType(): Type {
  return {} as Type;
}

function createSignatureLinks(): SignatureLinks {
  return {
    resolvedSignature: undefined,
    effectsSignature: undefined,
    decoratorSignature: undefined,
    checkedCallSelectionSeed: {} as NonNullable<SignatureLinks["checkedCallSelectionSeed"]>,
    resolvedCallSelectionEvidence: {} as NonNullable<SignatureLinks["resolvedCallSelectionEvidence"]>,
    resolvedCallEvidence: {} as NonNullable<SignatureLinks["resolvedCallEvidence"]>,
  };
}
