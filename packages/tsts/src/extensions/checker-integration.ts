import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression, Node_Text, Node_Type, Node_TypeArguments } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { GetSourceFileOfNode, IsCallOrNewExpression, IsFunctionLike, IsOptionalChainRoot, IsOutermostOptionalChain, SkipParentheses } from "../internal/ast/utilities.js";
import { AsElementAccessExpression, AsForInOrOfStatement } from "../internal/ast/generated/casts.js";
import { IsBinaryExpression, IsNewExpression, IsParenthesizedExpression, IsPostfixUnaryExpression, IsPrefixUnaryExpression, IsSpreadElement } from "../internal/ast/generated/predicates.js";
import { NodeFlagsOptionalChain } from "../internal/ast/generated/flags.js";
import type { Kind } from "../internal/ast/generated/kinds.js";
import { TokenToString } from "../internal/scanner/scanner.js";
import type { Checker } from "../internal/checker/checker/state.js";
import type { CheckedCallSelectionSeed, CheckedCallSourceSelectionProvenance, ResolvedCallArgumentEvidence, ResolvedCallEvidence, ResolvedCallSourceValueEvidence, Signature, SignatureLinks, Type, TypeNodeLinks } from "../internal/checker/types.js";
import { LinkStore_Get } from "../internal/core/linkstore.js";
import { Checker_getDeclarationOfAliasSymbol, Checker_getResolvedSymbolOrNil } from "../internal/checker/checker/symbols.js";
import { Checker_isErrorType } from "../internal/checker/checker/diagnostics.js";
import type {
  ExtensionCheckedIterationSelection,
  ExtensionForAwaitOfAtomicIterationMechanism,
  ExtensionForAwaitOfIterationMechanism,
  ExtensionForOfAtomicIterationMechanism,
  ExtensionForOfIterationMechanism,
  ExtensionSelectedIterationProtocol,
  ExtensionSelectedIterationTypes,
} from "./checker-iteration-selection.js";
import { ExtensionObservationPoint } from "./observations.js";
import type { CheckedCallMappingRequest, CheckedCallMappingResult, CheckedConversionMappingRequest, CheckedConversionMappingResult, CheckedElementAccessMappingRequest, CheckedFlowSourceUse, CheckedIterationMappingRequest, CheckedOperationObservationPointName, CheckedOperationReference, CheckedOperatorMappingRequest, CheckedPropertyAccessMappingRequest, ExtensionObservationResult, PostCheckAssignabilityObservationRequest } from "./observations.js";
import { argumentPassingFactKey, contextualTargetTypeFactKey, flowStateFactKey, providerTypeFamilyFactKey, providerVirtualDeclarationFactKey, runtimeCarrierFactKey, selectedTargetSignatureFactKey, sourcePrimitiveFactKey, targetBindingFactKey, targetCallArgumentConversionFactKey, targetCallArgumentPassingFactKey, targetConversionFactKey, targetOperationFactKey } from "./facts.js";
import type { CheckedBinaryOperatorToken, CheckedCallKind, CheckedConversionSourceOperation, CheckedElementAccessSourceOperation, CheckedForAwaitOfAtomicIterationMechanism, CheckedForAwaitOfIterationMechanism, CheckedForOfAtomicIterationMechanism, CheckedForOfIterationMechanism, CheckedIterationSourceOperation, CheckedOperatorSourceOperation, CheckedPrefixUnaryOperatorToken, CheckedPropertyAccessSourceOperation, CheckedSourceChainParticipant, CheckedSourceChainRole, CheckedUpdateOperatorToken, ProviderDeclarationIdentity, SelectedSourceIterationProtocolEvidence, SelectedSourceIterationTypes, SelectedSourceTypeEvidence, SelectedSourceValueEvidence, SelectedTargetSignatureFact, SourceSelectedCallArgumentBinding, SourceSelectedMethodTypeArgument, SourceSelectedSignatureParameter, TargetCallArgumentConversionSlot, TargetCallArgumentPassingFact, TargetOperationFact, TargetOperationProposal, TargetOperationProvenance, TargetParameter, TargetTypeRef } from "./facts.js";
import type { ExtensionEvidence, ExtensionFactSubject, ExtensionHost } from "./host.js";
import {
  extensionHostGetCheckedOperationReference,
  extensionHostGetCheckedOperationRequest,
  extensionHostHasCheckedOperationOwner,
  extensionHostPublishSourceDecisionBatch,
  extensionHostRetainCheckedOperation,
  extensionHostRunCheckedOperation,
  extensionHostSetFact,
  getExtensionHost,
} from "./host.js";
import {
  appendEvent,
  beginSourceDecisionFrame,
  commitPreparedSourceDecision,
  commitSourceDecisionFrame,
  disableSourceDecisionRecording,
  journalSignatureLinks,
  journalTypeNodeLinks,
  prepareSourceDecisionFrame,
  rollbackDiscardSourceDecisionFrame,
  rollbackPreparedSourceDecision,
  rollbackSourceDecisionFrame,
  sourceDecisionRecordingActive,
  sourceDecisionDiscardActive,
  sourceDecisionOwner,
} from "./checker-source-decisions.js";
import type {
  ExtensionSourceDecisionEvent,
  ExtensionSourceDecisionEventBatch,
  ExtensionSourceDecisionFrame,
} from "./checker-source-decisions.js";
import { recordProviderTypeFamilyReferenceFacts } from "./compiler-integration.js";
import { createCheckedOperationRequestSnapshotCache, snapshotSelectedTargetSignatureFact, snapshotTargetOperationFact } from "./checked-operation-value-snapshot.js";
import type { CheckedOperationRequestSnapshotCache } from "./checked-operation-value-snapshot.js";
import { substituteTargetParameter } from "./target-type-ref-substitution.js";
import { isRuntimeCheckedSourceExecution } from "./source-execution-role.js";
import {
  CheckedOperationReferenceIndex,
  type CheckedOperationApplyOutcome,
} from "./checked-operation-finalization.js";
export { preserveEquivalentCheckedSourceType } from "./checked-source-type-identity.js";
import {
  checkedSourceTypesShareStableIdentity,
  preserveEquivalentCheckedSourceType,
} from "./checked-source-type-identity.js";

const checkedOperationApplied: CheckedOperationApplyOutcome = Object.freeze({ kind: "applied" });
const checkedOperationUnavailable: CheckedOperationApplyOutcome = Object.freeze({ kind: "unavailable" });
type CheckedAccessMode = CheckedPropertyAccessSourceOperation["accessMode"];

export function hasExtensionCheckedOperationHost(
  checker: GoPtr<Checker>,
  observation: CheckedOperationObservationPointName,
  executionSite: GoPtr<Node>,
): boolean {
  return getCheckedOperationExtensionHost(checker, observation, executionSite) !== undefined;
}

export function beginExtensionCheckedSourceFileDecision(
  checker: GoPtr<Checker>,
  sourceFile: GoPtr<SourceFile>,
): ExtensionSourceDecisionFrame | undefined {
  if (checker === undefined || sourceFile === undefined) {
    return undefined;
  }
  const host = getExtensionHost(checker.program);
  if (host === undefined) {
    disableSourceDecisionRecording(checker);
    return undefined;
  }
  return beginSourceDecisionFrame(checker, "source-file", sourceFile);
}

export function beginExtensionCheckedSourceCandidateDecision(checker: GoPtr<Checker>): ExtensionSourceDecisionFrame | undefined {
  if (checker === undefined) {
    return undefined;
  }
  if (!sourceDecisionRecordingActive(checker)) {
    return undefined;
  }
  return beginSourceDecisionFrame(checker, "overload-candidate");
}

export function beginExtensionCheckedSourceSignatureDecision(checker: GoPtr<Checker>): ExtensionSourceDecisionFrame | undefined {
  if (checker === undefined || !sourceDecisionRecordingActive(checker)) {
    return undefined;
  }
  return beginSourceDecisionFrame(checker, "signature-resolution");
}

export function beginExtensionCheckedSourceDiscardDecision(checker: GoPtr<Checker>): ExtensionSourceDecisionFrame | undefined {
  if (checker === undefined || !sourceDecisionRecordingActive(checker)) {
    return undefined;
  }
  return beginSourceDecisionFrame(checker, "discard");
}

export function commitExtensionCheckedSourceCandidateDecision(
  checker: GoPtr<Checker>,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  if (checker !== undefined) {
    commitSourceDecisionFrame(checker, frame);
  }
}

export function commitExtensionCheckedSourceSignatureDecision(
  checker: GoPtr<Checker>,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  if (checker !== undefined) {
    commitSourceDecisionFrame(checker, frame);
  }
}

export function rollbackExtensionCheckedSourceDecision(
  checker: GoPtr<Checker>,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  if (checker !== undefined) {
    rollbackSourceDecisionFrame(checker, frame);
  }
}

export function rollbackExtensionCheckedSourceDiscardDecision(
  checker: GoPtr<Checker>,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  if (checker !== undefined) {
    rollbackDiscardSourceDecisionFrame(checker, frame);
  }
}

export function commitExtensionCheckedSourceFileDecision(
  checker: GoPtr<Checker>,
  frame: ExtensionSourceDecisionFrame | undefined,
): void {
  if (checker === undefined) {
    return;
  }
  const prepared = prepareSourceDecisionFrame(checker, frame);
  try {
    publishExtensionSourceDecisionBatch(checker, prepared?.batch);
    commitPreparedSourceDecision(checker, prepared);
  } catch (error) {
    rollbackPreparedSourceDecision(checker, prepared);
    throw error;
  }
}

export function journalExtensionCheckedCallEvidence(checker: GoPtr<Checker>, links: SignatureLinks): void {
  if (checker === undefined) {
    return;
  }
  journalSignatureLinks(checker, links);
}

export function extensionCheckedSourceDecisionOwner(checker: GoPtr<Checker>): GoPtr<SourceFile> {
  return checker === undefined ? undefined : sourceDecisionOwner(checker);
}

export function extensionCheckedSourceDecisionDiscardActive(checker: GoPtr<Checker>): boolean {
  return checker !== undefined && sourceDecisionDiscardActive(checker);
}

export function journalExtensionCheckedExpressionCache(
  checker: GoPtr<Checker>,
  links: TypeNodeLinks,
): void {
  if (checker !== undefined) {
    journalTypeNodeLinks(checker, links);
  }
}

function getCheckedOperationExtensionHost(
  checker: GoPtr<Checker>,
  observation: CheckedOperationObservationPointName,
  executionSite: GoPtr<Node>,
): ExtensionHost | undefined {
  if (checker === undefined || executionSite === undefined || !isRuntimeCheckedOperationExecutionSite(executionSite)) {
    return undefined;
  }
  const extensionHost = getExtensionHost(checker.program);
  return extensionHost?.[extensionHostHasCheckedOperationOwner](observation) === true
      && sourceDecisionRecordingActive(checker)
    ? extensionHost
    : undefined;
}

function isRuntimeCheckedOperationExecutionSite(executionSite: Node): boolean {
  return isRuntimeCheckedSourceExecution(executionSite);
}

function publishExtensionSourceDecisionBatch(
  checker: Checker,
  batch: ExtensionSourceDecisionEventBatch | undefined,
): void {
  if (batch === undefined || batch.length === 0) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined) {
    throw new Error("A prepared extension source-decision batch lost its owning extension host.");
  }
  const propertySelections = collectCheckedPropertySelections(batch);
  const publishedPropertySelections = new Set<Node>();
  extensionHost[extensionHostPublishSourceDecisionBatch](() => {
    for (const event of batch) {
      if (isCheckedOperationSourceDecisionEvent(event)) {
        if (event.kind === "checked-property") {
          if (publishedPropertySelections.has(event.origin)) {
            continue;
          }
          publishedPropertySelections.add(event.origin);
          publishExtensionCheckedPropertyAccessMapping(
            checker,
            extensionHost,
            event.origin,
            propertySelections.get(event.origin)!,
          );
          continue;
        }
        publishExtensionSourceDecisionEvent(checker, extensionHost, event);
      }
    }
    for (const event of batch) {
      if (!isCheckedOperationSourceDecisionEvent(event)) {
        publishExtensionSourceDecisionEvent(checker, extensionHost, event);
      }
    }
  });
}

type CheckedPropertySourceDecisionEvent = Extract<ExtensionSourceDecisionEvent, { readonly kind: "checked-property" }>;

interface CheckedPropertySourceSelections {
  readonly read: CheckedPropertySourceDecisionEvent | undefined;
  readonly write: CheckedPropertySourceDecisionEvent | undefined;
}

function collectCheckedPropertySelections(
  batch: ExtensionSourceDecisionEventBatch,
): ReadonlyMap<Node, CheckedPropertySourceSelections> {
  const selections = new Map<Node, { read?: CheckedPropertySourceDecisionEvent; write?: CheckedPropertySourceDecisionEvent }>();
  for (const event of batch) {
    if (event.kind !== "checked-property") {
      continue;
    }
    let selection = selections.get(event.origin);
    if (selection === undefined) {
      selection = {};
      selections.set(event.origin, selection);
    }
    if (selection[event.selectionMode] !== undefined) {
      throw new Error(`Checked property access has duplicate '${event.selectionMode}' source selections.`);
    }
    selection[event.selectionMode] = event;
  }
  const exact = new Map<Node, CheckedPropertySourceSelections>();
  for (const [origin, selection] of selections) {
    const representative = selection.read ?? selection.write;
    if (representative === undefined) {
      throw new Error("Checked property access has no selected source evidence.");
    }
    const requiresRead = representative.accessMode !== "write";
    const requiresWrite = representative.accessMode === "write" || representative.accessMode === "read-write";
    if ((selection.read !== undefined) !== requiresRead || (selection.write !== undefined) !== requiresWrite) {
      throw new Error(`Checked '${representative.accessMode}' property access has incomplete selected source evidence.`);
    }
    for (const candidate of [selection.read, selection.write]) {
      if (candidate === undefined) {
        continue;
      }
      if (candidate.accessMode !== representative.accessMode
        || candidate.callCallee !== representative.callCallee
        || !checkedSourceTypesShareStableIdentity(candidate.receiverType, representative.receiverType)) {
        throw new Error("Checked property read/write selections disagree on the source operation identity.");
      }
    }
    if (representative.callCallee && (representative.accessMode !== "read" || selection.write !== undefined)) {
      throw new Error("Only a read-only property selection can be a checked call callee.");
    }
    exact.set(origin, Object.freeze({ read: selection.read, write: selection.write }));
  }
  return exact;
}

function isCheckedOperationSourceDecisionEvent(event: ExtensionSourceDecisionEvent): boolean {
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

function publishExtensionSourceDecisionEvent(
  checker: Checker,
  extensionHost: ExtensionHost,
  event: ExtensionSourceDecisionEvent,
): void {
  switch (event.kind) {
    case "checked-call":
      publishExtensionCheckedCallMapping(extensionHost, event.origin, event.resolvedCallEvidence);
      return;
    case "checked-property":
      throw new Error("Checked property events must be coalesced before publication.");
    case "checked-element":
      publishExtensionCheckedElementAccessMapping(checker, extensionHost, event.origin, {
        selectedSymbol: event.selectedSymbol,
        resultType: event.resultType,
        ...(event.selectedElementIndex === undefined ? {} : { selectedElementIndex: event.selectedElementIndex }),
        receiverType: event.receiverType,
        argumentType: event.argumentType,
        accessMode: event.accessMode,
        callCallee: event.callCallee,
      });
      return;
    case "checked-operator":
      publishExtensionCheckedOperatorKindMapping(
        extensionHost,
        event.origin,
        event.operator,
        event.left,
        event.right,
        event.sourceLeftType,
        event.sourceRightType,
        event.sourceResultType,
      );
      return;
    case "checked-iteration":
      publishExtensionCheckedIterationMapping(
        extensionHost,
        event.origin,
        event.selection,
      );
      return;
    case "assertion-conversion":
      publishExtensionCheckedAssertionConversion(
        checker,
        extensionHost,
        event.origin,
        event.sourceExpression,
        event.explicitTargetTypeNode,
        event.sourceType,
        event.targetType,
        event.assertionKind,
        event.sourceSelectedSymbol,
        event.sourceSelectedDeclaration,
        event.sourceSelectedDeclarationTypeNode,
      );
      return;
    case "target-constraint":
      publishExtensionTargetConstraintValidation(extensionHost, event.origin, event.symbol);
      return;
    case "runtime-carrier":
      publishExtensionRuntimeCarrierFact(extensionHost, event.origin, event.type, event.symbol);
      return;
    case "contextual-target":
      publishExtensionContextualTargetTypeFact(extensionHost, event.origin, event.contextualType);
      return;
    case "post-assignability":
      publishExtensionPostCheckAssignabilityObservation(
        extensionHost,
        event.source,
        event.target,
        event.errorNode,
        event.expression,
        event.relation,
      );
      return;
    case "flow-use":
      publishExtensionFlowUseValidation(extensionHost, event.origin, event.symbol, event.sourceUse);
      return;
  }
}

function retainCheckedCallSelectionSeed(
  checker: Checker,
  callExpression: Node,
  incoming: CheckedCallSelectionSeed,
): CheckedCallSelectionSeed {
  const links = LinkStore_Get(checker.signatureLinks, callExpression) as SignatureLinks;
  journalExtensionCheckedCallEvidence(checker, links);
  const existing = links.checkedCallSelectionSeed;
  const calleeProvenance = mergeCheckedCallSourceSelectionProvenance(
    existing?.calleeProvenance,
    incoming.calleeProvenance,
  );
  const receiver = mergeResolvedCallSourceValueEvidence(existing?.receiver, incoming.receiver);
  const seed = Object.freeze({
    ...(calleeProvenance === undefined ? {} : { calleeProvenance }),
    ...(receiver === undefined ? {} : { receiver }),
  });
  links.checkedCallSelectionSeed = seed;
  return seed;
}

function mergeCheckedCallSourceSelectionProvenance(
  existing: CheckedCallSourceSelectionProvenance | undefined,
  incoming: CheckedCallSourceSelectionProvenance | undefined,
): CheckedCallSourceSelectionProvenance | undefined {
  if (existing === undefined) {
    return incoming === undefined ? undefined : Object.freeze({ ...incoming });
  }
  if (incoming === undefined) {
    return existing;
  }
  return Object.freeze({
    ...mergeCheckedCallProvenanceFields(existing, incoming, "callee"),
  });
}

function mergeResolvedCallSourceValueEvidence(
  existing: ResolvedCallSourceValueEvidence | undefined,
  incoming: ResolvedCallSourceValueEvidence | undefined,
): ResolvedCallSourceValueEvidence | undefined {
  if (existing === undefined) {
    return incoming === undefined ? undefined : Object.freeze({ ...incoming });
  }
  if (incoming === undefined) {
    return existing;
  }
  if (existing.expression !== incoming.expression || existing.type !== incoming.type) {
    throw new Error("Checked call receiver evidence conflicted before resolved-signature finalization.");
  }
  return Object.freeze({
    expression: existing.expression,
    type: existing.type,
    ...mergeCheckedCallProvenanceFields(existing, incoming, "receiver"),
  });
}

function mergeCheckedCallProvenanceFields(
  existing: CheckedCallSourceSelectionProvenance,
  incoming: CheckedCallSourceSelectionProvenance,
  subject: "callee" | "receiver",
): CheckedCallSourceSelectionProvenance {
  const symbol = mergeCheckedCallIdentity(existing.symbol, incoming.symbol, subject, "symbol");
  const declaration = mergeCheckedCallIdentity(existing.declaration, incoming.declaration, subject, "declaration");
  const selectedSymbol = mergeCheckedCallIdentity(existing.selectedSymbol, incoming.selectedSymbol, subject, "selectedSymbol");
  const selectedDeclaration = mergeCheckedCallIdentity(existing.selectedDeclaration, incoming.selectedDeclaration, subject, "selectedDeclaration");
  const authoredTypeNode = mergeCheckedCallIdentity(existing.authoredTypeNode, incoming.authoredTypeNode, subject, "authoredTypeNode");
  return Object.freeze({
    ...(symbol === undefined ? {} : { symbol }),
    ...(declaration === undefined ? {} : { declaration }),
    ...(selectedSymbol === undefined ? {} : { selectedSymbol }),
    ...(selectedDeclaration === undefined ? {} : { selectedDeclaration }),
    ...(authoredTypeNode === undefined ? {} : { authoredTypeNode }),
  });
}

function mergeCheckedCallIdentity<T>(
  existing: T | undefined,
  incoming: T | undefined,
  subject: "callee" | "receiver",
  field: string,
): T | undefined {
  if (existing !== undefined && incoming !== undefined && existing !== incoming) {
    throw new Error(`Checked call ${subject} ${field} conflicted before resolved-signature finalization.`);
  }
  return existing ?? incoming;
}

export function retainExtensionCheckedIdentifierCalleeSelection(
  checker: GoPtr<Checker>,
  identifier: GoPtr<Node>,
  sourceSymbol: GoPtr<Symbol>,
  sourceSelectedSymbol: GoPtr<Symbol>,
): void {
  if (checker === undefined || identifier === undefined) {
    return;
  }
  const callExpression = checkedCallForCallee(identifier);
  if (callExpression === undefined) {
    return;
  }
  const extensionHost = getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedCall, callExpression);
  const callee = Node_Expression(callExpression);
  if (extensionHost === undefined || callee === undefined) {
    return;
  }
  const canonicalSourceSymbol = selectedSourceSymbol(checker, sourceSymbol);
  const canonicalSelectedSymbol = selectedSourceSymbol(checker, sourceSelectedSymbol);
  const sourceDeclaration = canonicalSourceSymbol === undefined
    ? undefined
    : Checker_getDeclarationOfAliasSymbol(checker, canonicalSourceSymbol) ?? symbolValueDeclaration(canonicalSourceSymbol);
  const sourceSelectedDeclaration = symbolValueDeclaration(canonicalSelectedSymbol);
  const authoredTypeNode = sourceSelectedDeclaration === undefined
    ? sourceDeclaration === undefined ? undefined : Node_Type(sourceDeclaration)
    : Node_Type(sourceSelectedDeclaration);
  retainCheckedCallSelectionSeed(checker, callExpression, {
    calleeProvenance: Object.freeze({
      ...(canonicalSourceSymbol === undefined ? {} : { symbol: canonicalSourceSymbol }),
      ...(sourceDeclaration === undefined ? {} : { declaration: sourceDeclaration }),
      ...(canonicalSelectedSymbol === undefined ? {} : { selectedSymbol: canonicalSelectedSymbol }),
      ...(sourceSelectedDeclaration === undefined ? {} : { selectedDeclaration: sourceSelectedDeclaration }),
      ...(authoredTypeNode === undefined ? {} : { authoredTypeNode }),
    }),
  });
}

export function recordExtensionCheckedCallMapping(
  checker: GoPtr<Checker>,
  callExpression: GoPtr<Node>,
  resolvedCallEvidence: ResolvedCallEvidence,
): void {
  if (checker === undefined || callExpression === undefined) {
    return;
  }
  if (getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedCall, callExpression) === undefined) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "checked-call",
    origin: callExpression,
    resolvedCallEvidence,
  }));
}

function publishExtensionCheckedCallMapping(
  extensionHost: ExtensionHost,
  callExpression: Node,
  resolvedCallEvidence: ResolvedCallEvidence,
): void {

  const callee = Node_Expression(callExpression);
  if (callee === undefined) {
    return;
  }
  const arguments_ = Node_Arguments(callExpression) ?? [];
  const sourceSelectedSignature = resolvedCallEvidence.selectedSignature as GoPtr<Signature>;
  const selectedSourceCallee = resolvedCallEvidence.sourceCallee;
  const selectedSourceArguments = resolvedCallEvidence.sourceArguments;
  const selectedSourceArgumentBindings = resolvedCallEvidence.sourceArgumentBindings;
  if (resolvedCallEvidence.call !== callExpression
    || (resolvedCallEvidence.outcome !== "applicable" && resolvedCallEvidence.outcome !== "untyped")
    || resolvedCallEvidence.sourceResultType === undefined
    || (resolvedCallEvidence.outcome === "applicable" && sourceSelectedSignature === undefined)) {
    throw new Error("Checked call mapping requires complete exact callee, signature, argument, topology, and result evidence from source checking.");
  }
  if (arguments_.some((argument) => argument === undefined)) {
    throw new Error("Checked call mapping encountered an absent authored argument node.");
  }
  if (selectedSourceArguments.length !== arguments_.length
    || selectedSourceArguments.some((evidence, index) => evidence.expression !== arguments_[index])) {
    throw new Error("Checked call mapping requires one exact selected source evidence record for every authored argument.");
  }
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedCall, callExpression);
  const dependencies = collectResolvedCallDependencies(extensionHost, resolvedCallEvidence);
  const retainedApplicableSelection = retainedRequest?.sourceSelection.kind === "applicable"
    ? retainedRequest.sourceSelection
    : undefined;
  const sourceSelectedMethodTypeArguments = preserveEquivalentSelectedMethodTypeArguments(
    retainedApplicableSelection?.methodTypeArguments,
    resolvedCallEvidence.sourceSelectedMethodTypeArguments ?? [],
  );
  const sourceSelectedSignatureParameters = preserveEquivalentSelectedSignatureParameters(
    retainedApplicableSelection?.parameters,
    resolvedCallEvidence.sourceSelectedSignatureParameters,
  );
  const sourceArgumentBindings = preserveEquivalentSelectedCallArgumentBindings(
    retainedApplicableSelection?.argumentBindings,
    selectedSourceArgumentBindings,
  );
  const sourceResultType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceResult.type as GoPtr<Type>,
    resolvedCallEvidence.sourceResultType,
  );
  const sourceCalleeType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceCallee.type as GoPtr<Type>,
    selectedSourceCallee.type as Type,
  );
  const sourceArgumentTypes = selectedSourceArguments.map((evidence, index) => preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceArguments[index]?.type as GoPtr<Type>,
    evidence.type as Type,
  ));
  const sourceReceiverType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceReceiver?.type as GoPtr<Type>,
    resolvedCallEvidence.sourceReceiver?.type,
  );
  if (sourceResultType === undefined
    || sourceCalleeType === undefined
    || sourceArgumentTypes.some((type) => type === undefined)
    || (resolvedCallEvidence.sourceReceiver !== undefined) !== (sourceReceiverType !== undefined)) {
    throw new Error("Checked call mapping lost exact selected source value evidence.");
  }
  const sourceReceiver = resolvedCallEvidence.sourceReceiver === undefined
    ? undefined
    : selectedSourceValueEvidence(
        resolvedCallEvidence.sourceReceiver.expression,
        sourceReceiverType!,
        selectedSourceEvidenceProvenance(resolvedCallEvidence.sourceReceiver),
      );
  const sourceCallee = selectedSourceValueEvidence(callee, sourceCalleeType, selectedSourceEvidenceProvenance(selectedSourceCallee));
  const sourceArguments = selectedSourceArguments.map((evidence, index) => selectedSourceValueEvidence(
    arguments_[index]!,
    sourceArgumentTypes[index]!,
    selectedSourceEvidenceProvenance(evidence),
  ));
  const sourceResult = selectedSourceValueEvidence(callExpression!, sourceResultType);
  const sourceSelection = resolvedCallEvidence.outcome === "untyped"
    ? { kind: "untyped" as const }
    : {
        kind: "applicable" as const,
        signature: sourceSelectedSignature!,
        ...(sourceSelectedSignature!.declaration === undefined ? {} : { declaration: sourceSelectedSignature!.declaration }),
        methodTypeArguments: sourceSelectedMethodTypeArguments ?? [],
        parameters: sourceSelectedSignatureParameters ?? [],
        argumentBindings: sourceArgumentBindings ?? [],
      };
  const request: CheckedCallMappingRequest = {
    sourceOperationKind: "call",
    call: callExpression,
    callee,
    arguments: definedFactSubjects(arguments_),
    callKind: checkedCallKind(callExpression),
    sourceSelection,
    sourceCallee,
    sourceArguments,
    sourceResult,
    ...(sourceReceiver === undefined ? {} : { sourceReceiver }),
    chainRole: checkedSourceChainRole(callExpression, "call"),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  let retainedTargetApplication: {
    readonly result: Extract<CheckedCallMappingResult, { readonly kind: "target" }>;
    readonly selectedSignature: SelectedTargetSignatureFact;
    readonly argumentSlots: readonly SelectedTargetArgumentSlot[];
    readonly snapshotCache: CheckedOperationRequestSnapshotCache;
  } | undefined;
  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedCall,
    request,
    () => {
      throw new Error("Extension-owned checked call mapping unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      if (value.kind === "source") {
        return;
      }
      const finalizedCall = acceptedRequest.call as Node;
      if (retainedTargetApplication === undefined) {
        const finalizedArguments = acceptedRequest.arguments as readonly GoPtr<Node>[];
        const snapshotCache = createCheckedOperationRequestSnapshotCache();
        const selectedSignature = finalizeSelectedTargetSignatureFact(value, acceptedRequest, snapshotCache);
        retainedTargetApplication = Object.freeze({
          result: value,
          selectedSignature,
          argumentSlots: selectTargetArgumentConversionSlots(selectedSignature, finalizedArguments),
          snapshotCache,
        });
      } else if (retainedTargetApplication.result !== value) {
        throw new Error("A retained checked call changed its accepted target mapping result during application replay.");
      }
      const { selectedSignature, argumentSlots, snapshotCache } = retainedTargetApplication;
      const conversionOutcome = recordExtensionCallArgumentConversions(extensionHost, finalizedCall, selectedSignature, argumentSlots, snapshotCache);
      if (conversionOutcome.kind !== "applied") {
        return conversionOutcome;
      }
      const writeResult = extensionHost[extensionHostSetFact](finalizedCall, selectedTargetSignatureFactKey, selectedSignature, evidence);
      if (writeResult !== "inserted" && writeResult !== "idempotent") {
        throw new Error(`Cannot publish selected target signature '${selectedSignature.member.id}': ${writeResult}.`);
      }
      recordExtensionCallParameterModes(extensionHost, finalizedCall, selectedSignature, argumentSlots, evidence);
      return checkedOperationApplied;
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

function collectResolvedCallDependencies(
  extensionHost: ExtensionHost,
  evidence: ResolvedCallEvidence,
): readonly CheckedOperationReference[] {
  return collectCheckedOperationDependencies(
    extensionHost,
    [evidence.sourceCallee.expression, ...evidence.sourceArguments.map((argument) => argument.expression)],
  );
}

export interface CheckedPropertyAccessSourceEvidence {
  readonly selectedSymbol: GoPtr<Symbol>;
  readonly resultType: GoPtr<Type>;
  readonly receiverType: GoPtr<Type>;
  readonly selectionMode: "read" | "write";
  readonly accessMode: CheckedAccessMode;
  readonly callCallee: boolean;
}

export function recordExtensionCheckedPropertyAccessMapping(
  checker: GoPtr<Checker>,
  propertyAccessExpression: GoPtr<Node>,
  selected: CheckedPropertyAccessSourceEvidence,
): void {
  if (checker === undefined || propertyAccessExpression === undefined) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  const accessOwned = extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedPropertyAccess) === true;
  const callOwned = selected.callCallee
    && extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedCall) === true;
  if (!sourceDecisionRecordingActive(checker)
    || !isRuntimeCheckedOperationExecutionSite(propertyAccessExpression)
    || extensionHost === undefined
    || (!accessOwned && !callOwned)) {
    return;
  }
  if (selected.resultType === undefined || selected.receiverType === undefined) {
    throw new Error("Checked property source decision requires exact selected receiver and result types.");
  }
  appendEvent(checker, Object.freeze({
    kind: "checked-property",
    origin: propertyAccessExpression,
    selectedSymbol: selected.selectedSymbol,
    resultType: selected.resultType,
    receiverType: selected.receiverType,
    selectionMode: selected.selectionMode,
    accessMode: selected.accessMode,
    callCallee: selected.callCallee,
  }));

  if (!callOwned) {
    return;
  }
  const receiver = Node_Expression(propertyAccessExpression);
  const callExpression = checkedCallForCallee(propertyAccessExpression);
  if (receiver === undefined || callExpression === undefined) {
    throw new Error("Checked property callee evidence has no exact receiver or enclosing call expression.");
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, selected.selectedSymbol);
  const sourceSelectedDeclaration = symbolValueDeclaration(sourceSelectedSymbol);
  retainCheckedCallSelectionSeed(checker, callExpression, {
    calleeProvenance: Object.freeze({
      ...(sourceSelectedSymbol === undefined ? {} : { symbol: sourceSelectedSymbol, selectedSymbol: sourceSelectedSymbol }),
      ...(sourceSelectedDeclaration === undefined ? {} : { declaration: sourceSelectedDeclaration, selectedDeclaration: sourceSelectedDeclaration }),
      ...(sourceSelectedDeclaration === undefined || Node_Type(sourceSelectedDeclaration) === undefined
        ? {}
        : { authoredTypeNode: Node_Type(sourceSelectedDeclaration)! }),
    }),
    receiver: Object.freeze({
      expression: receiver,
      type: selected.receiverType,
    }),
  });
}

function publishExtensionCheckedPropertyAccessMapping(
  checker: Checker,
  extensionHost: ExtensionHost,
  propertyAccessExpression: Node,
  selected: CheckedPropertySourceSelections,
): void {
  const receiver = Node_Expression(propertyAccessExpression);
  const propertyName = Node_Text(Node_Name(propertyAccessExpression));
  if (receiver === undefined || propertyName === "") {
    return;
  }
  const representative = selected.read ?? selected.write;
  if (representative === undefined) {
    throw new Error("Checked property publication has no exact source selection.");
  }
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedPropertyAccess, propertyAccessExpression);
  const canonicalSourceReceiverType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceReceiver.type as GoPtr<Type>,
    representative.receiverType,
  );
  const retainedReadType = retainedRequest?.accessMode === "read"
    || retainedRequest?.accessMode === "delete"
    || retainedRequest?.accessMode === "read-write"
    ? retainedRequest.sourceReadResult.type as GoPtr<Type>
    : undefined;
  const retainedWriteType = retainedRequest?.accessMode === "write"
    || retainedRequest?.accessMode === "read-write"
    ? retainedRequest.sourceWriteType.type as GoPtr<Type>
    : undefined;
  const canonicalSourceReadType = preserveEquivalentCheckedSourceType(
    retainedReadType,
    selected.read?.resultType,
  );
  const canonicalSourceWriteType = preserveEquivalentCheckedSourceType(
    retainedWriteType,
    selected.write?.resultType,
  );
  const sourceReceiver = selectedSourceReceiverEvidence(receiver, canonicalSourceReceiverType);
  if (canonicalSourceReceiverType === undefined
    || (selected.read !== undefined) !== (canonicalSourceReadType !== undefined)
    || (selected.write !== undefined) !== (canonicalSourceWriteType !== undefined)) {
    throw new Error("Checked property access mapping requires complete exact read/write source evidence.");
  }
  const sourceReadResult = selected.read === undefined
    ? undefined
    : selectedSourceValueEvidence(
        propertyAccessExpression,
        canonicalSourceReadType!,
        selectedPropertySelectionProvenance(checker, selected.read),
      );
  const sourceWriteType = selected.write === undefined
    ? undefined
    : selectedSourceTypeEvidence(
        canonicalSourceWriteType!,
        selectedPropertySelectionProvenance(checker, selected.write),
      );
  const sourceReceiverDependencies = collectCheckedOperationDependencies(extensionHost, [receiver]);
  const requestBase = {
    sourceOperationKind: "property-access" as const,
    expression: propertyAccessExpression,
    receiver,
    propertyName,
    sourceReceiver,
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  let request: CheckedPropertyAccessMappingRequest;
  switch (representative.accessMode) {
    case "read":
      request = {
        ...requestBase,
        accessMode: "read",
        use: representative.callCallee ? "call-callee" : "value",
        sourceReadResult: sourceReadResult!,
        chainRole: checkedSourceChainRole(propertyAccessExpression, "property-access"),
      };
      break;
    case "delete":
      request = {
        ...requestBase,
        accessMode: "delete",
        use: "value",
        sourceReadResult: sourceReadResult!,
        chainRole: checkedSourceChainRole(propertyAccessExpression, "property-access"),
      };
      break;
    case "write":
      request = {
        ...requestBase,
        accessMode: "write",
        use: "value",
        sourceWriteType: sourceWriteType!,
        chainRole: { kind: "ordinary", participant: "property-access" },
      };
      break;
    case "read-write":
      request = {
        ...requestBase,
        accessMode: "read-write",
        use: "value",
        sourceReadResult: sourceReadResult!,
        sourceWriteType: sourceWriteType!,
        chainRole: { kind: "ordinary", participant: "property-access" },
      };
      break;
  }
  if (!extensionHost[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedPropertyAccess)) {
    return;
  }

  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    request,
    () => {
      throw new Error("Extension-owned checked property access mapping unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      extensionHost[extensionHostSetFact](
        acceptedRequest.expression,
        targetOperationFactKey,
        snapshotTargetOperationFact(finalizeTargetOperationFact(
          value.operation,
          value.resultType,
          checkedPropertySourceOperationFromRequest(acceptedRequest),
          value.providerDeclaration,
        )),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    sourceReceiverDependencies,
  );
}

function selectedPropertySelectionProvenance(
  checker: Checker,
  selected: CheckedPropertySourceDecisionEvent,
): {
  readonly selectedSymbol?: ExtensionFactSubject;
  readonly selectedDeclaration?: ExtensionFactSubject;
  readonly authoredTypeNode?: ExtensionFactSubject;
} {
  const sourceSelectedSymbol = selectedSourceSymbol(checker, selected.selectedSymbol);
  const sourceSelectedDeclaration = symbolValueDeclaration(sourceSelectedSymbol);
  return {
    ...(sourceSelectedSymbol === undefined ? {} : { selectedSymbol: sourceSelectedSymbol }),
    ...(sourceSelectedDeclaration === undefined ? {} : { selectedDeclaration: sourceSelectedDeclaration }),
    ...(sourceSelectedDeclaration === undefined || Node_Type(sourceSelectedDeclaration) === undefined
      ? {}
      : { authoredTypeNode: Node_Type(sourceSelectedDeclaration)! }),
  };
}

export interface CheckedElementAccessSourceEvidence {
  readonly selectedSymbol: GoPtr<Symbol>;
  readonly resultType: GoPtr<Type>;
  readonly selectedElementIndex?: number;
  readonly receiverType: GoPtr<Type>;
  readonly argumentType: GoPtr<Type>;
  readonly accessMode: CheckedAccessMode;
  readonly callCallee: boolean;
}

export function recordExtensionCheckedElementAccessMapping(
  checker: GoPtr<Checker>,
  elementAccessExpression: GoPtr<Node>,
  selected: CheckedElementAccessSourceEvidence,
): void {
  if (checker === undefined || elementAccessExpression === undefined) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  const accessOwned = extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedElementAccess) === true;
  const callOwned = selected.callCallee
    && extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedCall) === true;
  if (!sourceDecisionRecordingActive(checker)
    || !isRuntimeCheckedOperationExecutionSite(elementAccessExpression)
    || extensionHost === undefined
    || (!accessOwned && !callOwned)) {
    return;
  }
  if (selected.resultType === undefined || selected.receiverType === undefined || selected.argumentType === undefined) {
    throw new Error("Checked element source decision requires exact selected receiver, argument, and result types.");
  }
  appendEvent(checker, Object.freeze({
    kind: "checked-element",
    origin: elementAccessExpression,
    selectedSymbol: selected.selectedSymbol,
    resultType: selected.resultType,
    selectedElementIndex: selected.selectedElementIndex,
    receiverType: selected.receiverType,
    argumentType: selected.argumentType,
    accessMode: selected.accessMode,
    callCallee: selected.callCallee,
  }));

  if (!callOwned) {
    return;
  }
  const receiver = Node_Expression(elementAccessExpression);
  const argument = AsElementAccessExpression(elementAccessExpression)?.ArgumentExpression;
  const callExpression = checkedCallForCallee(elementAccessExpression);
  if (receiver === undefined || argument === undefined || callExpression === undefined) {
    throw new Error("Checked element callee evidence has no exact receiver, argument, or enclosing call expression.");
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, selected.selectedSymbol);
  const sourceSelectedDeclaration = symbolValueDeclaration(sourceSelectedSymbol);
  retainCheckedCallSelectionSeed(checker, callExpression, {
    calleeProvenance: Object.freeze({
      ...(sourceSelectedSymbol === undefined ? {} : { symbol: sourceSelectedSymbol, selectedSymbol: sourceSelectedSymbol }),
      ...(sourceSelectedDeclaration === undefined ? {} : { declaration: sourceSelectedDeclaration, selectedDeclaration: sourceSelectedDeclaration }),
      ...(sourceSelectedDeclaration === undefined || Node_Type(sourceSelectedDeclaration) === undefined
        ? {}
        : { authoredTypeNode: Node_Type(sourceSelectedDeclaration)! }),
    }),
    receiver: Object.freeze({
      expression: receiver,
      type: selected.receiverType,
    }),
  });
}

function publishExtensionCheckedElementAccessMapping(
  checker: Checker,
  extensionHost: ExtensionHost,
  elementAccessExpression: Node,
  selected: CheckedElementAccessSourceEvidence,
): void {
  const receiver = Node_Expression(elementAccessExpression);
  const argument = AsElementAccessExpression(elementAccessExpression)?.ArgumentExpression;
  if (receiver === undefined || argument === undefined) {
    return;
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, selected.selectedSymbol);
  const sourceSelectedDeclaration = symbolValueDeclaration(sourceSelectedSymbol);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedElementAccess, elementAccessExpression);
  const canonicalSourceReceiverType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceReceiver.type as GoPtr<Type>,
    selected.receiverType,
  );
  const retainedReadType = retainedRequest?.accessMode === "read"
    || retainedRequest?.accessMode === "delete"
    || retainedRequest?.accessMode === "read-write"
    ? retainedRequest.sourceReadResult.type as GoPtr<Type>
    : undefined;
  const retainedWriteType = retainedRequest?.accessMode === "write"
    || retainedRequest?.accessMode === "read-write"
    ? retainedRequest.sourceWriteType.type as GoPtr<Type>
    : undefined;
  const canonicalSourceReadType = preserveEquivalentCheckedSourceType(
    retainedReadType,
    selected.accessMode === "write" ? undefined : selected.resultType,
  );
  const canonicalSourceWriteType = preserveEquivalentCheckedSourceType(
    retainedWriteType,
    selected.accessMode === "read" || selected.accessMode === "delete" ? undefined : selected.resultType,
  );
  const canonicalSourceArgumentType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceArgument.type as GoPtr<Type>,
    selected.argumentType,
  );
  const sourceReceiver = selectedSourceReceiverEvidence(receiver, canonicalSourceReceiverType);
  if (canonicalSourceReceiverType === undefined
    || canonicalSourceArgumentType === undefined
    || (selected.accessMode !== "write") !== (canonicalSourceReadType !== undefined)
    || (selected.accessMode === "write" || selected.accessMode === "read-write") !== (canonicalSourceWriteType !== undefined)) {
    throw new Error("Checked element access mapping requires complete exact selected receiver, argument, and access evidence.");
  }
  const sourceArgument = selectedSourceValueEvidence(argument, canonicalSourceArgumentType);
  const selectionProvenance = {
    ...(sourceSelectedSymbol === undefined ? {} : { selectedSymbol: sourceSelectedSymbol }),
    ...(sourceSelectedDeclaration === undefined ? {} : { selectedDeclaration: sourceSelectedDeclaration }),
    ...(sourceSelectedDeclaration === undefined || Node_Type(sourceSelectedDeclaration) === undefined
      ? {}
      : { authoredTypeNode: Node_Type(sourceSelectedDeclaration)! }),
  };
  const sourceReadResult = canonicalSourceReadType === undefined
    ? undefined
    : selectedSourceValueEvidence(elementAccessExpression, canonicalSourceReadType, selectionProvenance);
  const sourceWriteType = canonicalSourceWriteType === undefined
    ? undefined
    : selectedSourceTypeEvidence(canonicalSourceWriteType, selectionProvenance);
  const dependencies = collectCheckedOperationDependencies(extensionHost, [receiver, argument]);
  const requestBase = {
    sourceOperationKind: "element-access" as const,
    expression: elementAccessExpression,
    receiver,
    argument,
    sourceReceiver,
    sourceArgument,
    ...(selected.selectedElementIndex !== undefined ? { sourceSelectedElementIndex: selected.selectedElementIndex } : {}),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  let request: CheckedElementAccessMappingRequest;
  switch (selected.accessMode) {
    case "read":
      request = {
        ...requestBase,
        accessMode: "read",
        use: selected.callCallee ? "call-callee" : "value",
        sourceReadResult: sourceReadResult!,
        chainRole: checkedSourceChainRole(elementAccessExpression, "element-access"),
      };
      break;
    case "delete":
      request = {
        ...requestBase,
        accessMode: "delete",
        use: "value",
        sourceReadResult: sourceReadResult!,
        chainRole: checkedSourceChainRole(elementAccessExpression, "element-access"),
      };
      break;
    case "write":
      request = {
        ...requestBase,
        accessMode: "write",
        use: "value",
        sourceWriteType: sourceWriteType!,
        chainRole: { kind: "ordinary", participant: "element-access" },
      };
      break;
    case "read-write":
      request = {
        ...requestBase,
        accessMode: "read-write",
        use: "value",
        sourceReadResult: sourceReadResult!,
        sourceWriteType: sourceWriteType!,
        chainRole: { kind: "ordinary", participant: "element-access" },
      };
      break;
  }
  if (!extensionHost[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedElementAccess)) {
    return;
  }

  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedElementAccess,
    request,
    () => {
      throw new Error("Extension-owned checked element access mapping unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      extensionHost[extensionHostSetFact](
        acceptedRequest.expression,
        targetOperationFactKey,
        snapshotTargetOperationFact(finalizeTargetOperationFact(
          value.operation,
          value.resultType,
          checkedElementSourceOperationFromRequest(acceptedRequest),
          value.providerDeclaration,
        )),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

export function recordExtensionCheckedAssertionConversion(checker: GoPtr<Checker>, assertionExpression: GoPtr<Node>, sourceType: GoPtr<Type>, targetType: GoPtr<Type>, assertionKind: "as" | "angle-bracket" | "jsdoc"): void {
  if (checker === undefined || assertionExpression === undefined || sourceType === undefined || targetType === undefined) {
    return;
  }
  if (getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedConversion, assertionExpression) === undefined) {
    return;
  }
  if (Checker_isErrorType(checker, sourceType) || Checker_isErrorType(checker, targetType)) {
    return;
  }
  const sourceExpression = Node_Expression(assertionExpression);
  const explicitTargetTypeNode = Node_Type(assertionExpression);
  if (sourceExpression === undefined || explicitTargetTypeNode === undefined) {
    throw new Error("Checked assertion source decision requires exact source expression and authored target type nodes.");
  }
  const sourceSelectedSymbol = sourceExpression === undefined
    ? undefined
    : selectedSourceSymbol(checker, Checker_getResolvedSymbolOrNil(checker, SkipParentheses(sourceExpression)));
  const sourceSelectedDeclaration = symbolValueDeclaration(sourceSelectedSymbol);
  const sourceSelectedDeclarationTypeNode = sourceSelectedDeclaration === undefined ? undefined : Node_Type(sourceSelectedDeclaration);
  appendEvent(checker, Object.freeze({
    kind: "assertion-conversion",
    origin: assertionExpression,
    sourceExpression,
    explicitTargetTypeNode,
    sourceType,
    targetType,
    assertionKind,
    ...(sourceSelectedSymbol === undefined ? {} : { sourceSelectedSymbol }),
    ...(sourceSelectedDeclaration === undefined ? {} : { sourceSelectedDeclaration }),
    ...(sourceSelectedDeclarationTypeNode === undefined ? {} : { sourceSelectedDeclarationTypeNode }),
  }));
}

function publishExtensionCheckedAssertionConversion(
  checker: Checker,
  extensionHost: ExtensionHost,
  assertionExpression: Node,
  sourceExpression: Node,
  explicitTargetTypeNode: Node,
  sourceType: Type,
  targetType: Type,
  assertionKind: "as" | "angle-bracket" | "jsdoc",
  sourceSelectedSymbol: Symbol | undefined,
  sourceSelectedDeclaration: Node | undefined,
  sourceSelectedDeclarationTypeNode: Node | undefined,
): void {
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](
    ExtensionObservationPoint.mapCheckedConversion,
    assertionExpression,
    {
      observation: ExtensionObservationPoint.mapCheckedConversion,
      subject: assertionExpression,
      conversionKind: "assertion",
    },
  );
  const retainedAssertion = retainedRequest?.conversionKind === "assertion" ? retainedRequest : undefined;
  const canonicalSourceType = preserveEquivalentCheckedSourceType(retainedAssertion?.source.type as GoPtr<Type>, sourceType);
  const canonicalTargetType = preserveEquivalentCheckedSourceType(retainedAssertion?.target.type as GoPtr<Type>, targetType);
  if (canonicalSourceType === undefined || canonicalTargetType === undefined) {
    throw new Error("Checked assertion mapping requires exact selected source and target types.");
  }
  retainExtensionCheckedConversion(extensionHost, {
    sourceOperationKind: "conversion",
    conversionKind: "assertion",
    assertionKind,
    expression: assertionExpression,
    source: selectedSourceValueEvidence(sourceExpression, canonicalSourceType, {
      ...(sourceSelectedSymbol === undefined ? {} : { selectedSymbol: sourceSelectedSymbol }),
      ...(sourceSelectedDeclaration === undefined ? {} : { selectedDeclaration: sourceSelectedDeclaration }),
      ...(sourceSelectedDeclarationTypeNode === undefined ? {} : { authoredTypeNode: sourceSelectedDeclarationTypeNode }),
    }),
    target: Object.freeze({
      type: canonicalTargetType,
      authoredTypeNode: explicitTargetTypeNode,
    }),
    explicitTargetTypeNode,
    ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
  });
}

export function recordExtensionCheckedOperatorMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operatorToken: GoPtr<Node>, left: GoPtr<Node>, right: GoPtr<Node>, sourceLeftType: GoPtr<Type>, sourceRightType: GoPtr<Type>, sourceResultType: GoPtr<Type>): void {
  if (operatorToken === undefined) {
    return;
  }

  recordExtensionCheckedOperatorKindMapping(checker, expression, operatorToken.Kind, left, right, sourceLeftType, sourceRightType, sourceResultType);
}

export function recordExtensionCheckedOperatorKindMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operator: Kind | undefined, left: GoPtr<Node>, right: GoPtr<Node>, sourceLeftType: GoPtr<Type>, sourceRightType: GoPtr<Type>, sourceResultType: GoPtr<Type>): void {
  if (checker === undefined || expression === undefined || operator === undefined || left === undefined) {
    return;
  }
  if (getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedOperator, expression) === undefined) {
    return;
  }
  if (sourceLeftType === undefined || sourceResultType === undefined || (right === undefined) !== (sourceRightType === undefined)) {
    throw new Error("Checked operator source decision requires exact selected result and operand types.");
  }
  if (Checker_isErrorType(checker, sourceLeftType)
    || (sourceRightType !== undefined && Checker_isErrorType(checker, sourceRightType))
    || Checker_isErrorType(checker, sourceResultType)) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "checked-operator",
    origin: expression,
    operator,
    left,
    right,
    sourceLeftType,
    sourceRightType,
    sourceResultType,
  }));
}

function publishExtensionCheckedOperatorKindMapping(
  extensionHost: ExtensionHost,
  expression: Node,
  operator: Kind,
  left: Node,
  right: Node | undefined,
  sourceLeftType: Type,
  sourceRightType: Type | undefined,
  sourceResultType: Type,
): void {
  const dependencies = collectCheckedOperationDependencies(extensionHost, [left, right]);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedOperator, expression);
  const canonicalSourceResultType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceResult.type as GoPtr<Type>,
    sourceResultType,
  );
  const retainedSourceLeftType = retainedRequest?.operatorKind === "binary"
    ? retainedRequest.sourceLeft.type as GoPtr<Type>
    : retainedRequest?.sourceOperand.type as GoPtr<Type>;
  const canonicalSourceLeftType = preserveEquivalentCheckedSourceType(
    retainedSourceLeftType,
    sourceLeftType,
  );
  const canonicalSourceRightType = preserveEquivalentCheckedSourceType(
    retainedRequest?.operatorKind === "binary" ? retainedRequest.sourceRight.type as GoPtr<Type> : undefined,
    sourceRightType,
  );
  if (canonicalSourceResultType === undefined
    || canonicalSourceLeftType === undefined
    || (right !== undefined) !== (canonicalSourceRightType !== undefined)) {
    throw new Error("Checked operator mapping requires exact selected source result and operand types.");
  }
  const sourceLeft = selectedSourceValueEvidence(left, canonicalSourceLeftType);
  const sourceRight = right === undefined || canonicalSourceRightType === undefined
    ? undefined
    : selectedSourceValueEvidence(right, canonicalSourceRightType);
  const sourceResult = selectedSourceValueEvidence(expression, canonicalSourceResultType);
  const sourceOperation = checkedOperatorSourceOperation(
    expression,
    operator,
    left,
    right,
    sourceLeft,
    sourceRight,
    sourceResult,
  );
  const request: CheckedOperatorMappingRequest = {
    ...sourceOperation,
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedOperator,
    request,
    () => {
      throw new Error("Extension-owned checked operator mapping unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      extensionHost[extensionHostSetFact](
        acceptedRequest.expression,
        targetOperationFactKey,
        snapshotTargetOperationFact(finalizeTargetOperationFact(
          value.operation,
          value.resultType,
          checkedOperatorSourceOperationFromRequest(acceptedRequest),
          value.providerDeclaration,
        )),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

function checkedOperatorSourceOperation(
  expression: Node,
  operatorKind: Kind,
  left: Node,
  right: Node | undefined,
  sourceLeft: SelectedSourceValueEvidence,
  sourceRight: SelectedSourceValueEvidence | undefined,
  sourceResult: SelectedSourceValueEvidence,
): CheckedOperatorSourceOperation {
  const operator = TokenToString(operatorKind);
  if (IsPrefixUnaryExpression(expression)) {
    if (operator === "++" || operator === "--") {
      return Object.freeze({
        sourceOperationKind: "operator",
        operatorKind: "prefix-update",
        operator: checkedUpdateOperatorToken(operator),
        expression,
        operand: left,
        sourceOperand: sourceLeft,
        sourceResult,
      });
    }
    return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "prefix-unary",
      operator: checkedPrefixUnaryOperatorToken(operator),
      expression,
      operand: left,
      sourceOperand: sourceLeft,
      sourceResult,
    });
  }
  if (IsPostfixUnaryExpression(expression)) {
    return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "postfix-update",
      operator: checkedUpdateOperatorToken(operator),
      expression,
      operand: left,
      sourceOperand: sourceLeft,
      sourceResult,
    });
  }
  if (!IsBinaryExpression(expression) || right === undefined || sourceRight === undefined) {
    throw new Error("Checked operator evidence does not match a TS-Go prefix, postfix, or binary expression.");
  }
  return Object.freeze({
    sourceOperationKind: "operator",
    operatorKind: "binary",
    operator: checkedBinaryOperatorToken(operator),
    expression,
    left,
    right,
    sourceLeft,
    sourceRight,
    sourceResult,
  });
}

function checkedPrefixUnaryOperatorToken(value: string): CheckedPrefixUnaryOperatorToken {
  switch (value) {
    case "+": case "-": case "~": case "!": case "typeof": case "void": case "delete":
      return value;
    default:
      throw new Error(`TS-Go selected unsupported prefix unary operator '${value}'.`);
  }
}

function checkedUpdateOperatorToken(value: string): CheckedUpdateOperatorToken {
  if (value === "++" || value === "--") {
    return value;
  }
  throw new Error(`TS-Go selected unsupported update operator '${value}'.`);
}

function checkedBinaryOperatorToken(value: string): CheckedBinaryOperatorToken {
  switch (value) {
    case "**": case "*": case "/": case "%": case "+": case "-":
    case "<<": case ">>": case ">>>":
    case "<": case ">": case "<=": case ">=": case "instanceof": case "in":
    case "==": case "!=": case "===": case "!==":
    case "&": case "^": case "|": case "&&": case "||": case "??":
    case "=": case "+=": case "-=": case "*=": case "**=": case "/=": case "%=":
    case "<<=": case ">>=": case ">>>=": case "&=": case "^=": case "|=":
    case "&&=": case "||=": case "??=": case ",":
      return value;
    default:
      throw new Error(`TS-Go selected unsupported binary operator '${value}'.`);
  }
}

export function recordExtensionCheckedIterationMapping(
  checker: GoPtr<Checker>,
  statement: GoPtr<Node>,
  selection: ExtensionCheckedIterationSelection | undefined,
): void {
  if (checker === undefined || statement === undefined) {
    return;
  }
  if (getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedIteration, statement) === undefined) {
    return;
  }
  if (selection === undefined) {
    throw new Error("Checked iteration source decision requires an exact TS-Go-selected iteration mechanism.");
  }
  appendEvent(checker, Object.freeze({
    kind: "checked-iteration",
    origin: statement,
    selection,
  }));
}

function publishExtensionCheckedIterationMapping(
  extensionHost: ExtensionHost,
  statement: Node,
  selection: ExtensionCheckedIterationSelection,
): void {
  const data = AsForInOrOfStatement(statement);
  const expression = data?.Expression;
  if (expression === undefined) {
    throw new Error("Checked iteration selection is not attached to a TS-Go for-in or for-of statement.");
  }

  const dependencies = collectCheckedOperationDependencies(extensionHost, [expression, data?.Initializer]);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedIteration, statement);
  const incoming = checkedIterationMappingRequest(statement, expression, data!.Initializer, selection, extensionHost.activeTarget);
  const request = preserveEquivalentCheckedIterationRequest(retainedRequest, incoming);
  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedIteration,
    request,
    () => {
      throw new Error("Extension-owned checked iteration mapping unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      const operation = finalizeTargetOperationFact(
        value.operation,
        value.resultType,
        checkedIterationSourceOperation(acceptedRequest),
        value.providerDeclaration,
      );
      extensionHost[extensionHostSetFact](
        acceptedRequest.statement,
        targetOperationFactKey,
        snapshotTargetOperationFact(operation),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

function checkedIterationMappingRequest(
  statement: Node,
  expression: Node,
  initializer: GoPtr<Node>,
  selection: ExtensionCheckedIterationSelection,
  target: string | undefined,
): CheckedIterationMappingRequest {
  const base = {
    sourceOperationKind: "iteration" as const,
    statement,
    expression,
    ...(initializer === undefined ? {} : { initializer }),
    sourceIterable: selectedSourceValueEvidenceForSemanticType(expression, selection.sourceIterableType),
    sourceElement: selectedSourceTypeEvidenceForSemanticType(selection.sourceElementType),
    ...(target === undefined ? {} : { target }),
  };
  switch (selection.iterationKind) {
    case "for-in":
      return Object.freeze({
        ...base,
        iterationKind: "for-in",
        mechanism: Object.freeze({ kind: "property-key-enumeration" }),
      });
    case "for-of":
      return Object.freeze({
        ...base,
        iterationKind: "for-of",
        mechanism: checkedForOfIterationMechanism(selection.mechanism),
      });
    case "for-await-of":
      return Object.freeze({
        ...base,
        iterationKind: "for-await-of",
        mechanism: checkedForAwaitOfIterationMechanism(selection.mechanism),
      });
  }
}

function selectedSourceTypeEvidenceForSemanticType(type: Type): SelectedSourceTypeEvidence {
  const symbol = type.symbol;
  return selectedSourceTypeEvidence(type, {
    ...(symbol === undefined ? {} : { symbol }),
    ...(symbol?.ValueDeclaration === undefined ? {} : { declaration: symbol.ValueDeclaration }),
  });
}

function selectedSourceValueEvidenceForSemanticType(expression: Node, type: Type): SelectedSourceValueEvidence {
  const symbol = type.symbol;
  return selectedSourceValueEvidence(expression, type, {
    ...(symbol === undefined ? {} : { symbol }),
    ...(symbol?.ValueDeclaration === undefined ? {} : { declaration: symbol.ValueDeclaration }),
  });
}

function checkedIterationTypes(iterationTypes: ExtensionSelectedIterationTypes): SelectedSourceIterationTypes {
  return Object.freeze({
    ...(iterationTypes.yieldType === undefined
      ? {}
      : { yieldType: selectedSourceTypeEvidenceForSemanticType(iterationTypes.yieldType) }),
    ...(iterationTypes.returnType === undefined
      ? {}
      : { returnType: selectedSourceTypeEvidenceForSemanticType(iterationTypes.returnType) }),
    ...(iterationTypes.nextType === undefined
      ? {}
      : { nextType: selectedSourceTypeEvidenceForSemanticType(iterationTypes.nextType) }),
  });
}

function definedIterationDeclarations(declarations: readonly GoPtr<Node>[]): readonly ExtensionFactSubject[] {
  return Object.freeze(declarations.filter((declaration): declaration is Node => declaration !== undefined));
}

function checkedIterationProtocol(
  protocol: ExtensionSelectedIterationProtocol,
): SelectedSourceIterationProtocolEvidence {
  const iterationTypes = checkedIterationTypes(protocol.iterationTypes);
  if (protocol.resolutionKind === "known-iterable-instantiation") {
    return Object.freeze({
      resolutionKind: "known-iterable-instantiation",
      iterationTypes,
      iterableTarget: selectedSourceTypeEvidence(protocol.iterableTargetType, {
        ...(protocol.iterableSymbol === undefined ? {} : { symbol: protocol.iterableSymbol }),
        ...(protocol.iterableValueDeclaration === undefined
          ? {}
          : { declaration: protocol.iterableValueDeclaration }),
      }),
      iterableDeclarations: definedIterationDeclarations(protocol.iterableDeclarations),
    });
  }
  return Object.freeze({
    resolutionKind: "selected-iterator-member",
    iterationTypes,
    iteratorMethod: Object.freeze({
      symbol: protocol.iteratorMethodSymbol,
      ...(protocol.iteratorMethodValueDeclaration === undefined
        ? {}
        : { valueDeclaration: protocol.iteratorMethodValueDeclaration }),
      declarations: definedIterationDeclarations(protocol.iteratorMethodDeclarations),
      type: protocol.iteratorMethodType,
    }),
    iteratorType: selectedSourceTypeEvidenceForSemanticType(protocol.iteratorType),
  });
}

function checkedForOfAtomicIterationMechanism(
  mechanism: ExtensionForOfAtomicIterationMechanism,
): CheckedForOfAtomicIterationMechanism {
  const sourceAlternative = selectedSourceTypeEvidenceForSemanticType(mechanism.sourceIterableType);
  switch (mechanism.kind) {
    case "synchronous-iterator-protocol":
      return Object.freeze({
        kind: mechanism.kind,
        sourceAlternative,
        protocol: checkedIterationProtocol(mechanism.protocol),
      });
    case "array-like-index":
      return Object.freeze({
        kind: mechanism.kind,
        sourceAlternative,
        selectedIndex: selectedSourceTypeEvidenceForSemanticType(mechanism.selectedIndexType),
      });
    case "string-code-unit-index":
    case "untyped-dynamic-iteration":
      return Object.freeze({ kind: mechanism.kind, sourceAlternative });
  }
}

function checkedForOfIterationMechanism(
  mechanism: ExtensionForOfIterationMechanism,
): CheckedForOfIterationMechanism {
  if (mechanism.kind !== "union") {
    return checkedForOfAtomicIterationMechanism(mechanism);
  }
  const alternatives = mechanism.alternatives.map(checkedForOfAtomicIterationMechanism);
  return Object.freeze({
    kind: "union",
    alternatives: freezeNonEmptyIterationAlternatives(alternatives, "for-of"),
  });
}

function checkedForAwaitOfAtomicIterationMechanism(
  mechanism: ExtensionForAwaitOfAtomicIterationMechanism,
): CheckedForAwaitOfAtomicIterationMechanism {
  const sourceAlternative = selectedSourceTypeEvidenceForSemanticType(mechanism.sourceIterableType);
  switch (mechanism.kind) {
    case "asynchronous-iterator-protocol":
    case "synchronous-iterator-adapted-to-async":
      return Object.freeze({
        kind: mechanism.kind,
        sourceAlternative,
        protocol: checkedIterationProtocol(mechanism.protocol),
      });
    case "array-like-index-adapted-to-async":
      return Object.freeze({
        kind: mechanism.kind,
        sourceAlternative,
        selectedIndex: selectedSourceTypeEvidenceForSemanticType(mechanism.selectedIndexType),
      });
    case "string-code-unit-index-adapted-to-async":
    case "untyped-dynamic-iteration":
      return Object.freeze({ kind: mechanism.kind, sourceAlternative });
  }
}

function checkedForAwaitOfIterationMechanism(
  mechanism: ExtensionForAwaitOfIterationMechanism,
): CheckedForAwaitOfIterationMechanism {
  if (mechanism.kind !== "union") {
    return checkedForAwaitOfAtomicIterationMechanism(mechanism);
  }
  const alternatives = mechanism.alternatives.map(checkedForAwaitOfAtomicIterationMechanism);
  return Object.freeze({
    kind: "union",
    alternatives: freezeNonEmptyIterationAlternatives(alternatives, "for-await-of"),
  });
}

function preserveEquivalentCheckedIterationRequest(
  existing: CheckedIterationMappingRequest | undefined,
  incoming: CheckedIterationMappingRequest,
): CheckedIterationMappingRequest {
  if (existing === undefined
    || existing.iterationKind !== incoming.iterationKind
    || existing.statement !== incoming.statement
    || existing.expression !== incoming.expression
    || existing.initializer !== incoming.initializer
    || existing.target !== incoming.target) {
    return incoming;
  }
  const sourceIterable = preserveEquivalentSelectedSourceValueEvidence(existing.sourceIterable, incoming.sourceIterable);
  const sourceElement = preserveEquivalentSelectedSourceTypeEvidence(existing.sourceElement, incoming.sourceElement);
  switch (incoming.iterationKind) {
    case "for-in":
      return Object.freeze({ ...incoming, sourceIterable, sourceElement });
    case "for-of":
      return existing.iterationKind === "for-of"
        ? Object.freeze({
            ...incoming,
            sourceIterable,
            sourceElement,
            mechanism: preserveEquivalentForOfMechanism(existing.mechanism, incoming.mechanism),
          })
        : incoming;
    case "for-await-of":
      return existing.iterationKind === "for-await-of"
        ? Object.freeze({
            ...incoming,
            sourceIterable,
            sourceElement,
            mechanism: preserveEquivalentForAwaitOfMechanism(existing.mechanism, incoming.mechanism),
          })
        : incoming;
  }
}

function preserveEquivalentSelectedSourceTypeEvidence(
  existing: SelectedSourceTypeEvidence,
  incoming: SelectedSourceTypeEvidence,
): SelectedSourceTypeEvidence {
  const type = preserveEquivalentCheckedSourceType(existing.type as GoPtr<Type>, incoming.type as GoPtr<Type>);
  if (type === existing.type
    && existing.symbol === incoming.symbol
    && existing.declaration === incoming.declaration
    && existing.selectedSymbol === incoming.selectedSymbol
    && existing.selectedDeclaration === incoming.selectedDeclaration
    && existing.authoredTypeNode === incoming.authoredTypeNode) {
    return existing;
  }
  return Object.freeze({ ...incoming, type: type! });
}

function preserveEquivalentSelectedSourceValueEvidence(
  existing: SelectedSourceValueEvidence,
  incoming: SelectedSourceValueEvidence,
): SelectedSourceValueEvidence {
  if (existing.expression !== incoming.expression) {
    return incoming;
  }
  const evidence = preserveEquivalentSelectedSourceTypeEvidence(existing, incoming);
  return evidence === existing ? existing : Object.freeze({ ...evidence, expression: incoming.expression });
}

function preserveEquivalentForOfMechanism(
  existing: CheckedForOfIterationMechanism,
  incoming: CheckedForOfIterationMechanism,
): CheckedForOfIterationMechanism {
  if (existing.kind !== incoming.kind) {
    return incoming;
  }
  if (incoming.kind === "union") {
    if (existing.kind !== "union" || existing.alternatives.length !== incoming.alternatives.length) {
      return incoming;
    }
    const alternatives = incoming.alternatives.map((alternative, index) =>
      preserveEquivalentForOfAtomicMechanism(existing.alternatives[index]!, alternative));
    return Object.freeze({
      kind: "union",
      alternatives: freezeNonEmptyIterationAlternatives(alternatives, "for-of"),
    });
  }
  return existing.kind === "union" ? incoming : preserveEquivalentForOfAtomicMechanism(existing, incoming);
}

function preserveEquivalentForOfAtomicMechanism(
  existing: CheckedForOfAtomicIterationMechanism,
  incoming: CheckedForOfAtomicIterationMechanism,
): CheckedForOfAtomicIterationMechanism {
  if (existing.kind !== incoming.kind) {
    return incoming;
  }
  const sourceAlternative = preserveEquivalentSelectedSourceTypeEvidence(existing.sourceAlternative, incoming.sourceAlternative);
  switch (incoming.kind) {
    case "synchronous-iterator-protocol":
      return existing.kind === "synchronous-iterator-protocol"
        ? Object.freeze({
            ...incoming,
            sourceAlternative,
            protocol: preserveEquivalentIterationProtocol(existing.protocol, incoming.protocol),
          })
        : incoming;
    case "array-like-index":
      return existing.kind === "array-like-index"
        ? Object.freeze({
            ...incoming,
            sourceAlternative,
            selectedIndex: preserveEquivalentSelectedSourceTypeEvidence(existing.selectedIndex, incoming.selectedIndex),
          })
        : incoming;
    case "string-code-unit-index":
    case "untyped-dynamic-iteration":
      return Object.freeze({ ...incoming, sourceAlternative });
  }
}

function preserveEquivalentForAwaitOfMechanism(
  existing: CheckedForAwaitOfIterationMechanism,
  incoming: CheckedForAwaitOfIterationMechanism,
): CheckedForAwaitOfIterationMechanism {
  if (existing.kind !== incoming.kind) {
    return incoming;
  }
  if (incoming.kind === "union") {
    if (existing.kind !== "union" || existing.alternatives.length !== incoming.alternatives.length) {
      return incoming;
    }
    const alternatives = incoming.alternatives.map((alternative, index) =>
      preserveEquivalentForAwaitOfAtomicMechanism(existing.alternatives[index]!, alternative));
    return Object.freeze({
      kind: "union",
      alternatives: freezeNonEmptyIterationAlternatives(alternatives, "for-await-of"),
    });
  }
  return existing.kind === "union" ? incoming : preserveEquivalentForAwaitOfAtomicMechanism(existing, incoming);
}

function freezeNonEmptyIterationAlternatives<T>(
  alternatives: readonly T[],
  iterationKind: "for-of" | "for-await-of",
): readonly [T, ...T[]] {
  const first = alternatives[0];
  if (first === undefined) {
    throw new Error(`TS-Go selected an empty ${iterationKind} union iteration mechanism.`);
  }
  return Object.freeze([first, ...alternatives.slice(1)]);
}

function preserveEquivalentForAwaitOfAtomicMechanism(
  existing: CheckedForAwaitOfAtomicIterationMechanism,
  incoming: CheckedForAwaitOfAtomicIterationMechanism,
): CheckedForAwaitOfAtomicIterationMechanism {
  if (existing.kind !== incoming.kind) {
    return incoming;
  }
  const sourceAlternative = preserveEquivalentSelectedSourceTypeEvidence(existing.sourceAlternative, incoming.sourceAlternative);
  switch (incoming.kind) {
    case "asynchronous-iterator-protocol":
    case "synchronous-iterator-adapted-to-async":
      return existing.kind === incoming.kind
        ? Object.freeze({
            ...incoming,
            sourceAlternative,
            protocol: preserveEquivalentIterationProtocol(existing.protocol, incoming.protocol),
          })
        : incoming;
    case "array-like-index-adapted-to-async":
      return existing.kind === "array-like-index-adapted-to-async"
        ? Object.freeze({
            ...incoming,
            sourceAlternative,
            selectedIndex: preserveEquivalentSelectedSourceTypeEvidence(existing.selectedIndex, incoming.selectedIndex),
          })
        : incoming;
    case "string-code-unit-index-adapted-to-async":
    case "untyped-dynamic-iteration":
      return Object.freeze({ ...incoming, sourceAlternative });
  }
}

function preserveEquivalentIterationProtocol(
  existing: SelectedSourceIterationProtocolEvidence,
  incoming: SelectedSourceIterationProtocolEvidence,
): SelectedSourceIterationProtocolEvidence {
  if (existing.resolutionKind !== incoming.resolutionKind) {
    return incoming;
  }
  const iterationTypes = Object.freeze({
    ...(incoming.iterationTypes.yieldType === undefined
      ? {}
      : {
          yieldType: existing.iterationTypes.yieldType === undefined
            ? incoming.iterationTypes.yieldType
            : preserveEquivalentSelectedSourceTypeEvidence(existing.iterationTypes.yieldType, incoming.iterationTypes.yieldType),
        }),
    ...(incoming.iterationTypes.returnType === undefined
      ? {}
      : {
          returnType: existing.iterationTypes.returnType === undefined
            ? incoming.iterationTypes.returnType
            : preserveEquivalentSelectedSourceTypeEvidence(existing.iterationTypes.returnType, incoming.iterationTypes.returnType),
        }),
    ...(incoming.iterationTypes.nextType === undefined
      ? {}
      : {
          nextType: existing.iterationTypes.nextType === undefined
            ? incoming.iterationTypes.nextType
            : preserveEquivalentSelectedSourceTypeEvidence(existing.iterationTypes.nextType, incoming.iterationTypes.nextType),
        }),
  });
  if (incoming.resolutionKind === "known-iterable-instantiation") {
    return existing.resolutionKind === "known-iterable-instantiation"
      ? Object.freeze({
          ...incoming,
          iterationTypes,
          iterableTarget: preserveEquivalentSelectedSourceTypeEvidence(existing.iterableTarget, incoming.iterableTarget),
        })
      : incoming;
  }
  return existing.resolutionKind === "selected-iterator-member"
    ? Object.freeze({
        ...incoming,
        iterationTypes,
        iteratorType: preserveEquivalentSelectedSourceTypeEvidence(existing.iteratorType, incoming.iteratorType),
      })
    : incoming;
}

export function recordExtensionTargetConstraintValidation(checker: GoPtr<Checker>, typeReference: GoPtr<Node>, symbol: GoPtr<Symbol>): boolean {
  if (checker === undefined || typeReference === undefined || symbol === undefined) {
    return true;
  }
  const extensionHost = getExtensionHost(checker.program);
  if (!sourceDecisionRecordingActive(checker)
    || extensionHost === undefined
    || extensionHost.getObservationOwner(ExtensionObservationPoint.validateTargetConstraint) === undefined) {
    return true;
  }
  appendEvent(checker, Object.freeze({
    kind: "target-constraint",
    origin: typeReference,
    symbol,
  }));
  return true;
}

function publishExtensionTargetConstraintValidation(
  extensionHost: ExtensionHost,
  typeReference: Node,
  symbol: Symbol,
): boolean {

  const targetBinding = extensionHost.facts.get(symbol, targetBindingFactKey);
  const typeParameters = targetBinding?.typeParameters ?? [];
  const typeArguments = Node_TypeArguments(typeReference) ?? [];
  if (targetBinding === undefined || typeParameters.length === 0 || typeArguments.length === 0) {
    return true;
  }

  let valid = true;
  for (let parameterIndex = 0; parameterIndex < typeParameters.length; parameterIndex++) {
    const parameter = typeParameters[parameterIndex];
    const argument = typeArguments[parameterIndex];
    if (parameter === undefined || argument === undefined) {
      continue;
    }
    for (const constraint of parameter.constraints ?? []) {
      const result = extensionHost.runObservation(
        ExtensionObservationPoint.validateTargetConstraint,
        {
          source: argument,
          constraint,
          target: extensionHost.activeTarget ?? targetBinding.target,
        },
        () => {
          throw new Error("Extension-owned target constraint checking unexpectedly reached core fallback.");
        },
        { requireOwner: true },
      );
      if (result.kind !== "accept" || !result.value) {
        valid = false;
      }
    }
  }
  return valid;
}

export function recordExtensionRuntimeCarrierFact(checker: GoPtr<Checker>, typeReference: GoPtr<Node>, type: GoPtr<Type>, symbol: GoPtr<Symbol>): void {
  if (checker === undefined || typeReference === undefined || type === undefined || !sourceDecisionRecordingActive(checker)) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "runtime-carrier",
    origin: typeReference,
    type,
    symbol,
  }));
}

function publishExtensionRuntimeCarrierFact(
  extensionHost: ExtensionHost,
  typeReference: Node,
  type: Type,
  symbol: Symbol | undefined,
): void {
  recordProviderTypeFamilyReferenceFacts(extensionHost, typeReference, type, symbol);
  if (extensionHost.getObservationOwner(ExtensionObservationPoint.resolveRuntimeCarrier) === undefined) {
    return;
  }

  if (!hasExtensionOwnedSubject(extensionHost, type) && !hasExtensionOwnedSubject(extensionHost, typeReference) && !hasExtensionOwnedSubject(extensionHost, symbol) && !hasExtensionOwnedSubject(extensionHost, type.symbol)) {
    return;
  }

  extensionHost.runObservation(
    ExtensionObservationPoint.resolveRuntimeCarrier,
    {
      type,
      ...(typeReference !== undefined ? { sourceTypeReference: typeReference } : {}),
      ...(symbol !== undefined ? { sourceSymbol: symbol } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned runtime carrier resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
    (value, evidence) => {
      const commonFact = {
        carrier: value.carrier,
        ...(value.requiresAllocation !== undefined ? { requiresAllocation: value.requiresAllocation } : {}),
      };
      const providerProvenance = value.provenance?.providerDeclaration === undefined
        ? {}
        : { providerDeclaration: value.provenance.providerDeclaration };
      extensionHost[extensionHostSetFact](type, runtimeCarrierFactKey, {
        ...commonFact,
        provenance: {
          ...providerProvenance,
          sourceType: type,
        },
      }, evidence);
      if (typeReference !== undefined) {
        const retainedSourceType = extensionHost.facts.get(typeReference, runtimeCarrierFactKey)?.provenance?.sourceType as GoPtr<Type>;
        const canonicalSourceType = preserveEquivalentCheckedSourceType(retainedSourceType, type);
        if (canonicalSourceType === undefined) {
          throw new Error("Runtime-carrier recording lost the checked source type.");
        }
        extensionHost[extensionHostSetFact](typeReference, runtimeCarrierFactKey, {
          ...commonFact,
          provenance: {
            ...providerProvenance,
            sourceType: canonicalSourceType,
            sourceTypeReference: typeReference,
            ...(symbol !== undefined ? { sourceSymbol: symbol } : {}),
          },
        }, evidence);
      }
      if (symbol !== undefined) {
        extensionHost[extensionHostSetFact](symbol, runtimeCarrierFactKey, {
          ...commonFact,
          provenance: {
            ...providerProvenance,
            sourceSymbol: symbol,
          },
        }, evidence);
      }
      if (type.symbol !== undefined) {
        extensionHost[extensionHostSetFact](type.symbol, runtimeCarrierFactKey, {
          ...commonFact,
          provenance: {
            ...providerProvenance,
            sourceSymbol: type.symbol,
          },
        }, evidence);
      }
    },
  );
}

export function recordExtensionContextualTargetTypeFact(checker: GoPtr<Checker>, expression: GoPtr<Node>, contextualType: GoPtr<Type>): void {
  if (checker === undefined || expression === undefined || contextualType === undefined) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  if (!sourceDecisionRecordingActive(checker)
    || extensionHost === undefined
    || extensionHost.getObservationOwner(ExtensionObservationPoint.recordContextualTargetType) === undefined) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "contextual-target",
    origin: expression,
    contextualType,
  }));
}

function publishExtensionContextualTargetTypeFact(
  extensionHost: ExtensionHost,
  expression: Node,
  contextualType: Type,
): void {

  extensionHost.runObservation(
    ExtensionObservationPoint.recordContextualTargetType,
    {
      expression,
      context: contextualType,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => ({
      type: contextualType,
    }),
    {},
    (value, evidence) => {
      extensionHost[extensionHostSetFact](expression, contextualTargetTypeFactKey, {
        type: value.type,
        ...(value.targetType !== undefined ? { targetType: value.targetType } : {}),
      }, evidence);
    },
  );
}

export function recordExtensionPostCheckAssignabilityObservation(checker: GoPtr<Checker>, source: GoPtr<Type>, target: GoPtr<Type>, errorNode: GoPtr<Node>, expression: GoPtr<Node>, relation: PostCheckAssignabilityObservationRequest["relation"]): void {
  if (checker === undefined || source === undefined || target === undefined) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  const origin = expression ?? errorNode;
  if (origin === undefined
    || !sourceDecisionRecordingActive(checker)
    || extensionHost === undefined
    || extensionHost.getObservationOwner(ExtensionObservationPoint.observePostCheckAssignability) === undefined) {
    return;
  }
  if (
    !hasExtensionOwnedSubject(extensionHost, source)
    && !hasExtensionOwnedSubject(extensionHost, target)
    && !hasExtensionOwnedSubject(extensionHost, source?.symbol)
    && !hasExtensionOwnedSubject(extensionHost, target?.symbol)
    && !hasExtensionOwnedSubject(extensionHost, errorNode)
    && !hasExtensionOwnedSubject(extensionHost, expression)
  ) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "post-assignability",
    origin,
    source,
    target,
    errorNode,
    expression,
    relation,
  }));
}

function publishExtensionPostCheckAssignabilityObservation(
  extensionHost: ExtensionHost,
  source: Type,
  target: Type,
  errorNode: Node | undefined,
  expression: Node | undefined,
  relation: PostCheckAssignabilityObservationRequest["relation"],
): void {

  extensionHost.runObservation(
    ExtensionObservationPoint.observePostCheckAssignability,
    {
      source,
      target,
      ...(relation !== undefined ? { relation } : {}),
      ...(errorNode !== undefined ? { errorNode } : {}),
      ...(expression !== undefined ? { expression } : {}),
      ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
    },
    () => undefined,
    { requireOwner: true },
  );
}

export function recordExtensionFlowUseValidation(checker: GoPtr<Checker>, useSite: GoPtr<Node>, symbol: GoPtr<Symbol>, sourceUse: CheckedFlowSourceUse): void {
  if (checker === undefined || useSite === undefined || symbol === undefined) {
    return;
  }
  const extensionHost = getExtensionHost(checker.program);
  if (!sourceDecisionRecordingActive(checker)
    || extensionHost === undefined
    || extensionHost.getObservationOwner(ExtensionObservationPoint.validateExtensionFlowUse) === undefined) {
    return;
  }
  appendEvent(checker, Object.freeze({
    kind: "flow-use",
    origin: useSite,
    symbol,
    sourceUse,
  }));
}

function publishExtensionFlowUseValidation(
  extensionHost: ExtensionHost,
  useSite: Node,
  symbol: Symbol,
  sourceUse: CheckedFlowSourceUse,
): void {

  const useSiteFlowState = extensionHost.facts.getEntry(useSite, flowStateFactKey);
  if (useSiteFlowState !== undefined) {
    extensionHost[extensionHostSetFact](symbol, flowStateFactKey, useSiteFlowState.value, useSiteFlowState.evidence);
    return;
  }
  const symbolFlowState = extensionHost.facts.get(symbol, flowStateFactKey);
  if (symbolFlowState === undefined) {
    return;
  }

  extensionHost.runObservation(
    ExtensionObservationPoint.validateExtensionFlowUse,
    {
      useSite,
      symbol,
      sourceUse,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned flow validation unexpectedly reached core fallback.");
    },
    { requireOwner: true },
    (value, evidence) => {
      if (value.targetCompilerValidationRequired === true) {
        extensionHost[extensionHostSetFact](useSite, flowStateFactKey, {
          state: "target-validation-required",
          ...(value.targetCompiler !== undefined ? { targetCompiler: value.targetCompiler } : {}),
        }, evidence);
      }
    },
  );
}

interface SelectedTargetArgumentSlot {
  readonly slot: TargetCallArgumentConversionSlot;
  readonly argument: Node;
  readonly targetParameter: TargetParameter;
  readonly conversionTarget: TargetTypeRef;
  readonly sourceBinding: SourceSelectedCallArgumentBinding;
}

function selectTargetArgumentConversionSlots(
  selectedSignature: SelectedTargetSignatureFact,
  arguments_: readonly GoPtr<Node>[],
): readonly SelectedTargetArgumentSlot[] {
  const parameters = instantiateSelectedTargetParameters(selectedSignature);
  validateTargetParameterList(selectedSignature);
  const slotsByArgument = new Map<number, TargetCallArgumentConversionSlot[]>();
  const slotsByTargetParameter = new Map<number, TargetCallArgumentConversionSlot[]>();
  const uniqueSlots = new Set<string>();
  for (const slot of selectedSignature.argumentConversions) {
    if (slot.sourceArgumentIndex >= arguments_.length) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' requests conversion for missing source argument ${slot.sourceArgumentIndex}.`);
    }
    if (slot.targetParameterIndex >= parameters.length) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' requests conversion to missing target parameter ${slot.targetParameterIndex}.`);
    }
    const identity = `${slot.sourceArgumentIndex}:${slot.sourceForm}:${slot.spreadElementIndex ?? "-"}:${slot.targetParameterIndex}:${slot.targetForm}`;
    if (uniqueSlots.has(identity)) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' repeats the same call-argument conversion slot.`);
    }
    uniqueSlots.add(identity);
    const argumentSlots = slotsByArgument.get(slot.sourceArgumentIndex) ?? [];
    argumentSlots.push(slot);
    slotsByArgument.set(slot.sourceArgumentIndex, argumentSlots);
    const parameterSlots = slotsByTargetParameter.get(slot.targetParameterIndex) ?? [];
    parameterSlots.push(slot);
    slotsByTargetParameter.set(slot.targetParameterIndex, parameterSlots);
  }

  const slots: SelectedTargetArgumentSlot[] = [];
  for (const [sourceArgumentIndex, argumentSlots] of slotsByArgument) {
    const argument = arguments_[sourceArgumentIndex];
    if (argument === undefined) {
      throw new Error(`Selected target signature has no argument node at index ${sourceArgumentIndex}.`);
    }
    const spread = IsSpreadElement(argument);
    if (!spread && argumentSlots.some((slot) => slot.sourceForm !== "value")) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' gives non-spread source argument ${sourceArgumentIndex} a spread conversion slot.`);
    }
    if (spread && argumentSlots.some((slot) => slot.sourceForm === "value")) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' gives spread source argument ${sourceArgumentIndex} a scalar conversion slot.`);
    }
    const spreadSequences = argumentSlots.filter((slot) => slot.sourceForm === "spread-sequence");
    const spreadElements = argumentSlots.filter((slot) => slot.sourceForm === "spread-element");
    if (spreadSequences.length > 1 || (spreadSequences.length !== 0 && spreadElements.length !== 0)) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' gives spread source argument ${sourceArgumentIndex} incompatible sequence and element conversion slots.`);
    }
    if (spreadElements.length !== 0) {
      const elementIndices = spreadElements.map((slot) => slot.spreadElementIndex).sort((left, right) => left! - right!);
      for (let index = 0; index < elementIndices.length; index++) {
        if (elementIndices[index] !== index) {
          throw new Error(`Selected target signature '${selectedSignature.member.id}' must map fixed spread argument ${sourceArgumentIndex} with contiguous element indices starting at zero.`);
        }
      }
    }
    for (const slot of argumentSlots) {
      const sourceBindings = selectedSignature.sourceSelection.kind === "applicable"
        ? selectedSignature.sourceSelection.argumentBindings
        : [];
      const sourceBinding = sourceBindings.find((binding) =>
        binding.sourceArgumentIndex === slot.sourceArgumentIndex
        && binding.sourceForm === slot.sourceForm
        && binding.spreadElementIndex === slot.spreadElementIndex);
      if (sourceBinding === undefined) {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' requests a conversion slot that is absent from the checker-selected source call topology.`);
      }
      const targetParameter = parameters[slot.targetParameterIndex]!;
      const targetIsParams = targetParameter.paramsArray === true;
      if (slot.targetForm === "parameter" && targetIsParams) {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' maps a whole parameter conversion to params target parameter ${slot.targetParameterIndex}.`);
      }
      if (slot.targetForm !== "parameter" && !targetIsParams) {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' maps a params conversion to non-params target parameter ${slot.targetParameterIndex}.`);
      }
      if (slot.targetForm === "params-sequence" && slot.sourceForm !== "spread-sequence") {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' maps non-sequence source argument ${sourceArgumentIndex} as a params sequence.`);
      }
      if (slot.targetForm === "params-element" && slot.sourceForm === "spread-sequence") {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' maps a spread sequence as one params element.`);
      }
      const conversionTarget = slot.targetForm === "params-element"
        ? (targetParameter.type as Extract<TargetTypeRef, { readonly kind: "array" }>).element
        : targetParameter.type;
      slots.push(Object.freeze({
        slot,
        argument,
        targetParameter,
        conversionTarget,
        sourceBinding,
      }));
    }
  }
  for (const [targetParameterIndex, parameterSlots] of slotsByTargetParameter) {
    const targetParameter = parameters[targetParameterIndex]!;
    if (targetParameter.paramsArray !== true) {
      if (parameterSlots.length > 1) {
        throw new Error(`Selected target signature '${selectedSignature.member.id}' requests multiple conversions to non-params target parameter ${targetParameterIndex}.`);
      }
      continue;
    }
    const sequenceSlots = parameterSlots.filter((slot) => slot.targetForm === "params-sequence");
    if (sequenceSlots.length > 1 || (sequenceSlots.length !== 0 && parameterSlots.length !== 1)) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' mixes a params sequence with other conversions for target parameter ${targetParameterIndex}.`);
    }
  }
  return Object.freeze(slots);
}

function instantiateSelectedTargetParameters(
  selectedSignature: SelectedTargetSignatureFact,
): readonly TargetParameter[] {
  const typeParameters = selectedSignature.member.typeParameters ?? [];
  const typeArguments = selectedSignature.targetTypeArguments ?? [];
  if (typeParameters.length !== typeArguments.length) {
    throw new Error(`Selected target signature '${selectedSignature.member.id}' has ${typeParameters.length} target type parameters but ${typeArguments.length} selected target type arguments.`);
  }
  const substitutions = new Map<string, TargetTypeRef>();
  for (let index = 0; index < typeParameters.length; index++) {
    const typeParameter = typeParameters[index]!;
    if (substitutions.has(typeParameter.name)) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' declares duplicate target type parameter '${typeParameter.name}'.`);
    }
    substitutions.set(typeParameter.name, typeArguments[index]!);
  }
  return Object.freeze(selectedSignature.member.parameters.map((parameter) =>
    substituteTargetParameter(parameter, substitutions)));
}

function validateTargetParameterList(selectedSignature: SelectedTargetSignatureFact): void {
  let paramsArrayIndex = -1;
  for (let index = 0; index < selectedSignature.member.parameters.length; index++) {
    const parameter = selectedSignature.member.parameters[index]!;
    if (parameter.paramsArray !== true) {
      continue;
    }
    if (paramsArrayIndex !== -1 || index !== selectedSignature.member.parameters.length - 1) {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' must have at most one params array and it must be the final target parameter.`);
    }
    if (parameter.type.kind !== "array") {
      throw new Error(`Selected target signature '${selectedSignature.member.id}' marks parameter ${index} as a params array without an array target type.`);
    }
    paramsArrayIndex = index;
  }
}

function recordExtensionCallParameterModes(
  extensionHost: ExtensionHost,
  callExpression: Node,
  selectedSignature: SelectedTargetSignatureFact,
  slots: readonly SelectedTargetArgumentSlot[],
  evidence: readonly ExtensionEvidence[] | undefined,
): void {
  for (const slot of slots) {
    extensionHost[extensionHostSetFact](
      slot.slot,
      targetCallArgumentPassingFactKey,
      withArgumentPassingProvenance(selectedSignature, callExpression, slot),
      evidence,
    );
  }
}

function recordExtensionCallArgumentConversions(
  extensionHost: ExtensionHost,
  callExpression: Node,
  selectedSignature: SelectedTargetSignatureFact,
  slots: readonly SelectedTargetArgumentSlot[],
  snapshotCache: CheckedOperationRequestSnapshotCache,
): CheckedOperationApplyOutcome {
  let unresolved: CheckedOperationReference<typeof ExtensionObservationPoint.mapCheckedConversion> | undefined;
  for (const slot of slots) {
    const sourceArgument = selectedSignature.sourceArguments[slot.slot.sourceArgumentIndex];
    if (sourceArgument === undefined || sourceArgument.expression !== slot.argument) {
      throw new Error(`Selected call '${selectedSignature.member.id}' lost source argument evidence at index ${slot.slot.sourceArgumentIndex}.`);
    }
    const result = recordExtensionCheckedConversion(extensionHost, {
      sourceOperationKind: "conversion",
      conversionKind: "call-argument",
      expression: slot.argument,
      source: sourceArgument,
      sourceBinding: slot.sourceBinding,
      target: slot.conversionTarget,
      call: callExpression,
      slot: slot.slot,
      targetParameter: slot.targetParameter,
      selectedSignature,
      ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
    }, snapshotCache);
    if (result.kind === "accept") {
      continue;
    }
    if (result.kind === "owner-deferred") {
      unresolved ??= checkedCallArgumentConversionReference(callExpression, slot);
      continue;
    }
    return checkedOperationUnavailable;
  }
  return unresolved === undefined
    ? checkedOperationApplied
    : Object.freeze({ kind: "deferred", unresolved });
}

function recordExtensionCheckedConversion(
  extensionHost: ExtensionHost,
  request: CheckedConversionMappingRequest,
  requestSnapshotCache?: CheckedOperationRequestSnapshotCache,
  additionalDependencies: readonly CheckedOperationReference[] = [],
): ExtensionObservationResult<CheckedConversionMappingResult> {
  const sourceExpression = request.source.expression as GoPtr<Node>;
  if (sourceExpression === undefined || !isRuntimeCheckedOperationExecutionSite(sourceExpression)) {
    throw new Error("A checked runtime conversion cannot be recorded for a declaration-only source expression.");
  }
  const dependencies = collectCheckedOperationDependencies(extensionHost, [sourceExpression], additionalDependencies);
  return extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedConversion,
    request,
    () => {
      throw new Error("Extension-owned conversion resolution unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => applyExtensionCheckedConversion(extensionHost, value, evidence, acceptedRequest),
    { requireOwner: true },
    requestSnapshotCache,
    dependencies,
    request.conversionKind === "call-argument"
      ? Object.freeze({ observation: ExtensionObservationPoint.mapCheckedCall, subject: request.call })
      : undefined,
  );
}

function retainExtensionCheckedConversion(
  extensionHost: ExtensionHost,
  request: CheckedConversionMappingRequest,
  requestSnapshotCache?: CheckedOperationRequestSnapshotCache,
  additionalDependencies: readonly CheckedOperationReference[] = [],
): void {
  const sourceExpression = request.source.expression as GoPtr<Node>;
  if (sourceExpression === undefined || !isRuntimeCheckedOperationExecutionSite(sourceExpression)) {
    return;
  }
  const dependencies = collectCheckedOperationDependencies(extensionHost, [sourceExpression], additionalDependencies);
  extensionHost[extensionHostRetainCheckedOperation](
    ExtensionObservationPoint.mapCheckedConversion,
    request,
    () => {
      throw new Error("Extension-owned conversion resolution unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => applyExtensionCheckedConversion(extensionHost, value, evidence, acceptedRequest),
    { requireOwner: true },
    requestSnapshotCache,
    dependencies,
  );
}

export function applyExtensionCheckedConversion(
  extensionHost: ExtensionHost,
  value: CheckedConversionMappingResult,
  evidence: readonly ExtensionEvidence[],
  acceptedRequest: CheckedConversionMappingRequest,
): void {
  if (acceptedRequest.conversionKind === "assertion"
    && value.convertedType === undefined
    && value.operation === undefined) {
    return;
  }
  const conversion = Object.freeze({
    ...(value.convertedType !== undefined ? { convertedType: value.convertedType } : {}),
    ...(value.operation !== undefined ? {
      operation: finalizeTargetOperationFact(
        value.operation,
        value.convertedType,
        checkedConversionSourceOperation(acceptedRequest),
        value.providerDeclaration,
      ),
    } : {}),
  });
  if (acceptedRequest.conversionKind === "call-argument") {
    const slot = acceptedRequest.slot;
    extensionHost[extensionHostSetFact](acceptedRequest.slot, targetCallArgumentConversionFactKey, Object.freeze({
      ...conversion,
      slot,
      call: acceptedRequest.call,
      sourceBinding: acceptedRequest.sourceBinding,
    }), evidence);
  } else {
    extensionHost[extensionHostSetFact](acceptedRequest.expression, targetConversionFactKey, conversion, evidence);
  }
}

function checkedCallArgumentConversionReference(
  callExpression: ExtensionFactSubject,
  slot: SelectedTargetArgumentSlot,
): CheckedOperationReference<typeof ExtensionObservationPoint.mapCheckedConversion> {
  return Object.freeze({
    observation: ExtensionObservationPoint.mapCheckedConversion,
    subject: slot.argument,
    conversionKind: "call-argument",
    call: callExpression,
    slot: slot.slot,
  });
}

function definedFactSubjects<T extends object>(subjects: readonly (T | undefined)[]): readonly ExtensionFactSubject[] {
  return subjects.filter((subject): subject is T => subject !== undefined);
}

function collectCheckedOperationDependencies(
  extensionHost: ExtensionHost,
  roots: readonly GoPtr<Node>[],
  additional: readonly CheckedOperationReference[] = [],
): readonly CheckedOperationReference[] {
  const dependencies: CheckedOperationReference[] = [];
  const dependencyIndex = new CheckedOperationReferenceIndex();
  const visited = new WeakSet<object>();
  const add = (reference: CheckedOperationReference): void => {
    if (dependencyIndex.add(reference)) {
      dependencies.push(reference);
    }
  };
  for (const reference of additional) {
    add(reference);
  }
  const pending = [...roots].reverse();
  while (pending.length !== 0) {
    const node = pending.pop();
    if (node === undefined || visited.has(node)) {
      continue;
    }
    visited.add(node);
    const reference = extensionHost[extensionHostGetCheckedOperationReference](node);
    if (reference !== undefined) {
      add(reference);
      continue;
    }
    if (IsFunctionLike(node)) {
      continue;
    }
    const children: GoPtr<Node>[] = [];
    Node_ForEachChild(node, (child) => {
      children.push(child);
      return false as bool;
    });
    for (let index = children.length - 1; index >= 0; index--) {
      pending.push(children[index]);
    }
  }
  return Object.freeze(dependencies);
}

function selectedSourceSymbol(checker: GoPtr<Checker>, symbol: GoPtr<Symbol>): GoPtr<Symbol> {
  return symbol === undefined || symbol === checker?.unknownSymbol ? undefined : symbol;
}

function symbolValueDeclaration(symbol: GoPtr<Symbol>): GoPtr<Node> {
  return symbol?.ValueDeclaration;
}

interface SelectedSourceEvidenceFields {
  readonly symbol?: ExtensionFactSubject;
  readonly declaration?: ExtensionFactSubject;
  readonly selectedSymbol?: ExtensionFactSubject;
  readonly selectedDeclaration?: ExtensionFactSubject;
  readonly authoredTypeNode?: ExtensionFactSubject;
}

function selectedSourceTypeEvidence(
  type: ExtensionFactSubject,
  selection: SelectedSourceEvidenceFields = {},
): SelectedSourceTypeEvidence {
  return Object.freeze({
    type,
    ...(selection.symbol === undefined ? {} : { symbol: selection.symbol }),
    ...(selection.declaration === undefined ? {} : { declaration: selection.declaration }),
    ...(selection.selectedSymbol === undefined ? {} : { selectedSymbol: selection.selectedSymbol }),
    ...(selection.selectedDeclaration === undefined ? {} : { selectedDeclaration: selection.selectedDeclaration }),
    ...(selection.authoredTypeNode === undefined ? {} : { authoredTypeNode: selection.authoredTypeNode }),
  });
}

function selectedSourceValueEvidence(
  expression: ExtensionFactSubject,
  type: ExtensionFactSubject,
  selection: SelectedSourceEvidenceFields = {},
): SelectedSourceValueEvidence {
  return Object.freeze({
    expression,
    type,
    ...(selection.symbol === undefined ? {} : { symbol: selection.symbol }),
    ...(selection.declaration === undefined ? {} : { declaration: selection.declaration }),
    ...(selection.selectedSymbol === undefined ? {} : { selectedSymbol: selection.selectedSymbol }),
    ...(selection.selectedDeclaration === undefined ? {} : { selectedDeclaration: selection.selectedDeclaration }),
    ...(selection.authoredTypeNode === undefined ? {} : { authoredTypeNode: selection.authoredTypeNode }),
  });
}

function checkedSourceChainRole<TParticipant extends CheckedSourceChainParticipant>(
  expression: Node,
  participant: TParticipant,
): CheckedSourceChainRole<TParticipant> {
  if ((expression.Flags & NodeFlagsOptionalChain) === 0) {
    return Object.freeze({ kind: "ordinary", participant });
  }
  return Object.freeze({
    kind: "optional-chain",
    participant,
    position: IsOptionalChainRoot(expression) ? "root" : "continuation",
    boundary: IsOutermostOptionalChain(expression) ? "outermost" : "nested",
  });
}

function selectedSourceEvidenceProvenance(evidence: SelectedSourceValueEvidence): {
  readonly symbol?: ExtensionFactSubject;
  readonly declaration?: ExtensionFactSubject;
  readonly selectedSymbol?: ExtensionFactSubject;
  readonly selectedDeclaration?: ExtensionFactSubject;
  readonly authoredTypeNode?: ExtensionFactSubject;
} {
  return {
    ...(evidence.symbol === undefined ? {} : { symbol: evidence.symbol }),
    ...(evidence.declaration === undefined ? {} : { declaration: evidence.declaration }),
    ...(evidence.selectedSymbol === undefined ? {} : { selectedSymbol: evidence.selectedSymbol }),
    ...(evidence.selectedDeclaration === undefined ? {} : { selectedDeclaration: evidence.selectedDeclaration }),
    ...(evidence.authoredTypeNode === undefined ? {} : { authoredTypeNode: evidence.authoredTypeNode }),
  };
}

export function finalizeSelectedTargetSignatureFact(
  callResult: Extract<CheckedCallMappingResult, { readonly kind: "target" }>,
  sourceOperation: CheckedCallMappingRequest,
  snapshotCache: CheckedOperationRequestSnapshotCache,
): SelectedTargetSignatureFact {
  const signature = callResult.selectedSignature;
  if (sourceOperation.sourceSelection.kind === "applicable"
    && sourceOperation.sourceSelection.argumentBindings.length === 0
    && sourceOperation.arguments.length !== 0) {
    throw new Error(`Target call selection '${signature.member.id}' requires complete checker-selected source argument topology.`);
  }
  const providerDeclaration = signature.providerDeclaration ?? signature.member.providerDeclaration;
  return snapshotSelectedTargetSignatureFact({
    member: signature.member,
    argumentConversions: callResult.argumentConversions,
    ...(signature.targetTypeArguments !== undefined ? { targetTypeArguments: signature.targetTypeArguments } : {}),
    sourceCallKind: sourceOperation.callKind,
    sourceSelection: sourceOperation.sourceSelection,
    sourceCallee: sourceOperation.sourceCallee,
    sourceArguments: sourceOperation.sourceArguments,
    sourceResult: sourceOperation.sourceResult,
    ...(sourceOperation.sourceReceiver !== undefined ? { sourceReceiver: sourceOperation.sourceReceiver } : {}),
    sourceChainRole: sourceOperation.chainRole,
    ...(providerDeclaration !== undefined ? { providerDeclaration } : {}),
  }, snapshotCache);
}

function selectedSourceReceiverEvidence(receiver: GoPtr<Node>, sourceReceiverType: GoPtr<Type>): SelectedSourceValueEvidence {
  if (receiver === undefined || sourceReceiverType === undefined) {
    throw new Error("Checked receiver evidence requires both the source expression and its exact selected type.");
  }
  return selectedSourceValueEvidence(receiver, sourceReceiverType);
}

function checkedCallForCallee(callee: GoPtr<Node>): GoPtr<Node> {
  let current = callee;
  while (current !== undefined && IsParenthesizedExpression(current.Parent)) {
    current = current.Parent;
  }
  const parent = current?.Parent;
  return IsCallOrNewExpression(parent) && Node_Expression(parent) === current ? parent : undefined;
}

function checkedCallKind(callExpression: Node): CheckedCallKind {
  if (!IsCallOrNewExpression(callExpression)) {
    throw new Error("Checked call mapping requires a call or construction expression.");
  }
  return IsNewExpression(callExpression) ? "construct" : "call";
}

function preserveEquivalentSelectedMethodTypeArguments(
  existing: readonly SourceSelectedMethodTypeArgument[] | undefined,
  incoming: readonly SourceSelectedMethodTypeArgument[] | undefined,
): readonly SourceSelectedMethodTypeArgument[] | undefined {
  if (existing === undefined || incoming === undefined || existing.length !== incoming.length) {
    return incoming;
  }
  return incoming.map((argument, index) => {
    const retained = existing[index];
    if (retained === undefined
      || retained.typeParameterName !== argument.typeParameterName
      || retained.explicitTypeNode !== argument.explicitTypeNode) {
      return argument;
    }
    const typeParameter = preserveEquivalentCheckedSourceType(
      retained.typeParameter as GoPtr<Type>,
      argument.typeParameter as GoPtr<Type>,
    );
    const selectedType = preserveEquivalentCheckedSourceType(
      retained.selectedType as GoPtr<Type>,
      argument.selectedType as GoPtr<Type>,
    );
    return typeParameter === retained.typeParameter && selectedType === retained.selectedType
      ? retained
      : {
          ...argument,
          ...(typeParameter === undefined ? {} : { typeParameter }),
          selectedType: selectedType!,
        };
  });
}

function preserveEquivalentSelectedCallArgumentBindings(
  existing: readonly SourceSelectedCallArgumentBinding[] | undefined,
  incoming: readonly (SourceSelectedCallArgumentBinding | ResolvedCallArgumentEvidence)[] | undefined,
): readonly SourceSelectedCallArgumentBinding[] | undefined {
  if (incoming === undefined) {
    return undefined;
  }
  return Object.freeze(incoming.map((binding, index) => {
    if (!Number.isSafeInteger(binding.sourceArgumentIndex) || binding.sourceArgumentIndex < 0
      || !Number.isSafeInteger(binding.effectiveArgumentIndex) || binding.effectiveArgumentIndex !== index
      || !Number.isSafeInteger(binding.sourceParameterIndex) || binding.sourceParameterIndex < 0
      || (binding.spreadElementIndex !== undefined
        && (!Number.isSafeInteger(binding.spreadElementIndex) || binding.spreadElementIndex < 0))
      || binding.selectedArgumentType === undefined
      || binding.selectedParameterType === undefined) {
      throw new Error("Checked call mapping received invalid source-selected argument binding evidence.");
    }
    const retained = existing?.[index];
    if (retained === undefined
      || retained.sourceArgumentIndex !== binding.sourceArgumentIndex
      || retained.effectiveArgumentIndex !== binding.effectiveArgumentIndex
      || retained.sourceForm !== binding.sourceForm
      || retained.spreadElementIndex !== binding.spreadElementIndex
      || retained.sourceParameterIndex !== binding.sourceParameterIndex
      || retained.sourceParameterForm !== binding.sourceParameterForm) {
      return Object.freeze({ ...binding }) as SourceSelectedCallArgumentBinding;
    }
    const selectedArgumentType = preserveEquivalentCheckedSourceType(
      retained.selectedArgumentType as GoPtr<Type>,
      binding.selectedArgumentType as GoPtr<Type>,
    );
    const selectedParameterType = preserveEquivalentCheckedSourceType(
      retained.selectedParameterType as GoPtr<Type>,
      binding.selectedParameterType as GoPtr<Type>,
    );
    return selectedArgumentType === retained.selectedArgumentType
      && selectedParameterType === retained.selectedParameterType
      ? retained
      : Object.freeze({
          ...binding,
          selectedArgumentType: selectedArgumentType!,
          selectedParameterType: selectedParameterType!,
        });
  }));
}

function preserveEquivalentSelectedSignatureParameters(
  existing: readonly SourceSelectedSignatureParameter[] | undefined,
  incoming: readonly SourceSelectedSignatureParameter[] | undefined,
): readonly SourceSelectedSignatureParameter[] | undefined {
  if (existing === undefined || incoming === undefined || existing.length !== incoming.length) {
    return incoming;
  }
  return incoming.map((parameter, index) => {
    const retained = existing[index];
    if (retained === undefined
      || retained.parameterIndex !== parameter.parameterIndex
      || retained.parameterName !== parameter.parameterName
      || retained.parameterSymbol !== parameter.parameterSymbol
      || retained.parameterDeclaration !== parameter.parameterDeclaration
      || retained.authoredTypeNode !== parameter.authoredTypeNode
      || retained.acceptsOmission !== parameter.acceptsOmission
      || retained.rest !== parameter.rest) {
      return parameter;
    }
    const selectedType = preserveEquivalentCheckedSourceType(
      retained.selectedType as GoPtr<Type>,
      parameter.selectedType as GoPtr<Type>,
    );
    return selectedType === retained.selectedType
      ? retained
      : { ...parameter, selectedType: selectedType! };
  });
}

export function finalizeTargetOperationFact(
  operation: TargetOperationProposal,
  resultType: TargetTypeRef | undefined,
  sourceOperation: TargetOperationProvenance["sourceOperation"],
  providerDeclaration: ProviderDeclarationIdentity | undefined,
): TargetOperationFact {
  return Object.freeze({
    ...operation,
    ...(resultType === undefined ? {} : { resultType }),
    provenance: Object.freeze({
      ...(providerDeclaration === undefined ? {} : { providerDeclaration }),
      sourceOperation,
    }),
  });
}

export function checkedPropertySourceOperationFromRequest(
  request: CheckedPropertyAccessMappingRequest,
): CheckedPropertyAccessSourceOperation {
  const common = {
    sourceOperationKind: "property-access" as const,
    expression: request.expression,
    receiver: request.receiver,
    propertyName: request.propertyName,
    sourceReceiver: request.sourceReceiver,
  };
  switch (request.accessMode) {
    case "read": return Object.freeze({
      ...common,
      accessMode: "read",
      use: request.use,
      sourceReadResult: request.sourceReadResult,
      chainRole: request.chainRole,
    });
    case "delete": return Object.freeze({
      ...common,
      accessMode: "delete",
      use: "value",
      sourceReadResult: request.sourceReadResult,
      chainRole: request.chainRole,
    });
    case "write": return Object.freeze({
      ...common,
      accessMode: "write",
      use: "value",
      sourceWriteType: request.sourceWriteType,
      chainRole: request.chainRole,
    });
    case "read-write": return Object.freeze({
      ...common,
      accessMode: "read-write",
      use: "value",
      sourceReadResult: request.sourceReadResult,
      sourceWriteType: request.sourceWriteType,
      chainRole: request.chainRole,
    });
  }
}

export function checkedElementSourceOperationFromRequest(
  request: CheckedElementAccessMappingRequest,
): CheckedElementAccessSourceOperation {
  const common = {
    sourceOperationKind: "element-access" as const,
    expression: request.expression,
    receiver: request.receiver,
    argument: request.argument,
    sourceReceiver: request.sourceReceiver,
    sourceArgument: request.sourceArgument,
    ...(request.sourceSelectedElementIndex === undefined ? {} : { sourceSelectedElementIndex: request.sourceSelectedElementIndex }),
  };
  switch (request.accessMode) {
    case "read": return Object.freeze({
      ...common,
      accessMode: "read",
      use: request.use,
      sourceReadResult: request.sourceReadResult,
      chainRole: request.chainRole,
    });
    case "delete": return Object.freeze({
      ...common,
      accessMode: "delete",
      use: "value",
      sourceReadResult: request.sourceReadResult,
      chainRole: request.chainRole,
    });
    case "write": return Object.freeze({
      ...common,
      accessMode: "write",
      use: "value",
      sourceWriteType: request.sourceWriteType,
      chainRole: request.chainRole,
    });
    case "read-write": return Object.freeze({
      ...common,
      accessMode: "read-write",
      use: "value",
      sourceReadResult: request.sourceReadResult,
      sourceWriteType: request.sourceWriteType,
      chainRole: request.chainRole,
    });
  }
}

export function checkedOperatorSourceOperationFromRequest(
  request: CheckedOperatorMappingRequest,
): CheckedOperatorSourceOperation {
  switch (request.operatorKind) {
    case "prefix-unary": return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "prefix-unary",
      operator: request.operator,
      expression: request.expression,
      operand: request.operand,
      sourceOperand: request.sourceOperand,
      sourceResult: request.sourceResult,
    });
    case "prefix-update": return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "prefix-update",
      operator: request.operator,
      expression: request.expression,
      operand: request.operand,
      sourceOperand: request.sourceOperand,
      sourceResult: request.sourceResult,
    });
    case "postfix-update": return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "postfix-update",
      operator: request.operator,
      expression: request.expression,
      operand: request.operand,
      sourceOperand: request.sourceOperand,
      sourceResult: request.sourceResult,
    });
    case "binary": return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "binary",
      operator: request.operator,
      expression: request.expression,
      left: request.left,
      right: request.right,
      sourceLeft: request.sourceLeft,
      sourceRight: request.sourceRight,
      sourceResult: request.sourceResult,
    });
  }
}

export function checkedConversionSourceOperation(
  request: CheckedConversionMappingRequest,
): CheckedConversionSourceOperation {
  if (request.conversionKind === "assertion") {
    return Object.freeze({
      sourceOperationKind: "conversion",
      conversionKind: "assertion",
      expression: request.expression,
      source: request.source,
      target: request.target,
      assertionKind: request.assertionKind,
      explicitTargetTypeNode: request.explicitTargetTypeNode,
    });
  }
  return Object.freeze({
    sourceOperationKind: "conversion",
    conversionKind: "call-argument",
    expression: request.expression,
    source: request.source,
    call: request.call,
    slot: request.slot,
    sourceBinding: request.sourceBinding,
  });
}

export function checkedIterationSourceOperation(
  request: CheckedIterationMappingRequest,
): CheckedIterationSourceOperation {
  const base = {
    sourceOperationKind: "iteration" as const,
    statement: request.statement,
    expression: request.expression,
    ...(request.initializer === undefined ? {} : { initializer: request.initializer }),
    sourceIterable: request.sourceIterable,
    sourceElement: request.sourceElement,
  };
  switch (request.iterationKind) {
    case "for-in":
      return Object.freeze({ ...base, iterationKind: "for-in", mechanism: request.mechanism });
    case "for-of":
      return Object.freeze({ ...base, iterationKind: "for-of", mechanism: request.mechanism });
    case "for-await-of":
      return Object.freeze({ ...base, iterationKind: "for-await-of", mechanism: request.mechanism });
  }
}

function withArgumentPassingProvenance(
  selectedSignature: SelectedTargetSignatureFact,
  call: ExtensionFactSubject,
  slot: SelectedTargetArgumentSlot,
): TargetCallArgumentPassingFact {
  return Object.freeze({
    slot: slot.slot,
    mode: slot.targetParameter.passingMode,
    targetExpression: slot.argument,
    call,
    sourceBinding: slot.sourceBinding,
    targetParameter: slot.targetParameter,
    ...(selectedSignature.providerDeclaration !== undefined
      ? { selectedSignature: selectedSignature.providerDeclaration }
      : selectedSignature.member.providerDeclaration !== undefined
        ? { selectedSignature: selectedSignature.member.providerDeclaration }
        : {}),
  });
}

function hasExtensionOwnedSubject(extensionHost: ExtensionHost, subject: ExtensionFactSubject | undefined): boolean {
  if (subject === undefined) {
    return false;
  }
  return extensionHost.facts.get(subject, targetBindingFactKey) !== undefined
    || extensionHost.facts.get(subject, providerTypeFamilyFactKey) !== undefined
    || extensionHost.facts.get(subject, providerVirtualDeclarationFactKey) !== undefined
    || extensionHost.facts.get(subject, sourcePrimitiveFactKey) !== undefined
    || extensionHost.facts.get(subject, argumentPassingFactKey) !== undefined
    || extensionHost.facts.get(subject, targetCallArgumentPassingFactKey) !== undefined
    || extensionHost.facts.get(subject, flowStateFactKey) !== undefined
    || extensionHost.facts.get(subject, runtimeCarrierFactKey) !== undefined;
}
