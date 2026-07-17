import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression, Node_Text, Node_Type, Node_TypeArguments } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { IsCallOrNewExpression, IsFunctionLike, SkipParentheses } from "../internal/ast/utilities.js";
import { AsElementAccessExpression, AsForInOrOfStatement } from "../internal/ast/generated/casts.js";
import { IsParenthesizedExpression, IsSpreadElement } from "../internal/ast/generated/predicates.js";
import { NodeFlagsOptionalChain } from "../internal/ast/generated/flags.js";
import type { Kind } from "../internal/ast/generated/kinds.js";
import { TokenToString } from "../internal/scanner/scanner.js";
import type { Checker } from "../internal/checker/checker/state.js";
import { signatureHasRestParameter } from "../internal/checker/checker/state.js";
import { Type_Flags, Type_Id, Type_Symbol, TypeFlagsUniqueESSymbol } from "../internal/checker/types.js";
import type { Signature, Type } from "../internal/checker/types.js";
import { Checker_getMinArgumentCount } from "../internal/checker/relater.js";
import { Checker_getTypeOfParameter } from "../internal/checker/checker/signatures.js";
import { Checker_getResolvedSymbolOrNil, Checker_resolveSymbol } from "../internal/checker/checker/symbols.js";
import { ExtensionObservationPoint } from "./observations.js";
import type { CheckedCallMappingRequest, CheckedCallMappingResult, CheckedConversionMappingRequest, CheckedConversionMappingResult, CheckedElementAccessMappingRequest, CheckedIterationKind, CheckedIterationMappingRequest, CheckedOperationObservationPointName, CheckedOperationReference, CheckedOperatorMappingRequest, CheckedPropertyAccessMappingRequest, ExtensionObservationResult, PostCheckAssignabilityObservationRequest, SelectedSourceReceiverEvidence } from "./observations.js";
import { argumentPassingFactKey, contextualTargetTypeFactKey, flowStateFactKey, providerTypeFamilyFactKey, providerVirtualDeclarationFactKey, runtimeCarrierFactKey, selectedTargetSignatureFactKey, sourcePrimitiveFactKey, targetBindingFactKey, targetCallArgumentConversionFactKey, targetCallArgumentPassingFactKey, targetConversionFactKey, targetOperationFactKey } from "./facts.js";
import type { SelectedTargetSignatureFact, SourceSelectedMethodTypeArgument, SourceSelectedSignatureKind, SourceSelectedSignatureParameter, TargetCallArgumentConversionSlot, TargetCallArgumentPassingFact, TargetOperationFact, TargetOperationProvenance, TargetParameter, TargetTypeRef } from "./facts.js";
import type { ExtensionEvidence, ExtensionFactSubject, ExtensionHost } from "./host.js";
import { extensionHostGetCheckedCalleeSelectionEvidence, extensionHostGetCheckedOperationReference, extensionHostGetCheckedOperationRequest, extensionHostHasCheckedOperationOwner, extensionHostRetainCheckedCalleeSelectionEvidence, extensionHostRunCheckedOperation, getExtensionHost } from "./host.js";
import { recordProviderTypeFamilyReferenceFacts } from "./compiler-integration.js";
import { createCheckedOperationRequestSnapshotCache, snapshotSelectedTargetSignatureFact, snapshotTargetOperationFact } from "./checked-operation-value-snapshot.js";
import type { CheckedOperationRequestSnapshotCache } from "./checked-operation-value-snapshot.js";
import { substituteTargetParameter } from "./target-type-ref-substitution.js";
import type { CheckedOperationApplyOutcome } from "./checked-operation-finalization.js";

const checkedOperationApplied: CheckedOperationApplyOutcome = Object.freeze({ kind: "applied" });
const checkedOperationUnavailable: CheckedOperationApplyOutcome = Object.freeze({ kind: "unavailable" });

export function hasExtensionCheckedOperationHost(
  checker: GoPtr<Checker>,
  observation: CheckedOperationObservationPointName,
): boolean {
  return getCheckedOperationExtensionHost(checker, observation) !== undefined;
}

function getCheckedOperationExtensionHost(
  checker: GoPtr<Checker>,
  observation: CheckedOperationObservationPointName,
): ExtensionHost | undefined {
  if (checker === undefined) {
    return undefined;
  }
  const extensionHost = getExtensionHost(checker.program);
  return extensionHost?.[extensionHostHasCheckedOperationOwner](observation) === true ? extensionHost : undefined;
}

export function recordExtensionCheckedCallMapping(
  checker: GoPtr<Checker>,
  callExpression: GoPtr<Node>,
  sourceSelectedSignature: GoPtr<Signature>,
  selectedSourceReturnType: GoPtr<Type>,
  resolvedCalleeSymbol?: GoPtr<Symbol>,
): void {
  if (checker === undefined || callExpression === undefined) {
    return;
  }

  const extensionHost = getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedCall);
  if (extensionHost === undefined) {
    return;
  }

  const callee = Node_Expression(callExpression);
  if (callee === undefined) {
    return;
  }
  const arguments_ = Node_Arguments(callExpression) ?? [];
  const sourceCalleeSelection = extensionHost[extensionHostGetCheckedCalleeSelectionEvidence](callExpression);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedCall, callExpression);
  const dependencies = collectCheckedOperationDependencies(
    extensionHost,
    [callee, ...arguments_],
    sourceCalleeSelection?.sourceInputOperations,
  );
  const sourceCalleeSymbol = selectedSourceSymbol(checker, resolvedCalleeSymbol);
  const sourceCalleeDeclaration = primarySymbolDeclaration(sourceCalleeSymbol);
  const sourceSelectedCalleeSymbol = selectedSourceSymbol(checker, sourceCalleeSymbol === undefined ? undefined : Checker_resolveSymbol(checker, sourceCalleeSymbol));
  const sourceSelectedCalleeDeclaration = primarySymbolDeclaration(sourceSelectedCalleeSymbol);
  const sourceSelectedMethodTypeArguments = preserveEquivalentSelectedMethodTypeArguments(
    retainedRequest?.sourceSelectedMethodTypeArguments,
    getSourceSelectedMethodTypeArguments(callExpression, sourceSelectedSignature),
  );
  const sourceSelectedSignatureParameters = preserveEquivalentSelectedSignatureParameters(
    retainedRequest?.sourceSelectedSignatureParameters,
    getSourceSelectedSignatureParameters(checker, sourceSelectedSignature),
  );
  const sourceSelectedSignatureKind = getSourceSelectedSignatureKind(checker, sourceSelectedSignature);
  const sourceReturnType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceReturnType as GoPtr<Type>,
    selectedSourceReturnType,
  );
  const sourceReceiverProvenance = selectedSourceReceiverEvidenceFromCalleeSelection(sourceCalleeSelection);
  const request: CheckedCallMappingRequest = {
    call: callExpression,
    callee,
    arguments: definedFactSubjects(arguments_),
    ...(sourceSelectedSignature !== undefined ? { sourceSelectedSignature } : {}),
    ...(sourceSelectedSignature?.declaration !== undefined ? { sourceSelectedDeclaration: sourceSelectedSignature.declaration } : {}),
    ...(sourceSelectedMethodTypeArguments !== undefined ? { sourceSelectedMethodTypeArguments } : {}),
    ...(sourceSelectedSignatureParameters !== undefined ? { sourceSelectedSignatureParameters } : {}),
    ...(sourceSelectedSignatureKind !== undefined ? { sourceSelectedSignatureKind } : {}),
    ...(sourceCalleeSymbol !== undefined ? { sourceCalleeSymbol } : {}),
    ...(sourceCalleeDeclaration !== undefined ? { sourceCalleeDeclaration } : {}),
    ...(sourceSelectedCalleeSymbol !== undefined ? { sourceSelectedCalleeSymbol } : {}),
    ...(sourceSelectedCalleeDeclaration !== undefined ? { sourceSelectedCalleeDeclaration } : {}),
    ...(sourceReturnType !== undefined ? { sourceReturnType } : {}),
    ...(((callExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { optionalChain: true } : {}),
    ...sourceReceiverProvenance,
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  extensionHost[extensionHostRunCheckedOperation](
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
      const finalizedArguments = acceptedRequest.arguments as readonly GoPtr<Node>[];
      const finalizedSourceProvenance = selectedSourceCallProvenanceFromRequest(acceptedRequest);
      const snapshotCache = createCheckedOperationRequestSnapshotCache();
      const selectedSignature = withSelectedTargetSignatureProvenance(value, finalizedSourceProvenance, snapshotCache);
      const argumentSlots = selectTargetArgumentConversionSlots(selectedSignature, finalizedArguments);
      const conversionOutcome = recordExtensionCallArgumentConversions(extensionHost, finalizedCall, selectedSignature, argumentSlots, snapshotCache);
      if (conversionOutcome.kind !== "applied") {
        return conversionOutcome;
      }
      const writeResult = extensionHost.facts.set(finalizedCall, selectedTargetSignatureFactKey, selectedSignature, evidence);
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

export function recordExtensionCheckedPropertyAccessMapping(checker: GoPtr<Checker>, propertyAccessExpression: GoPtr<Node>, resolvedSelectedSymbol?: GoPtr<Symbol>, sourceResultType?: GoPtr<Type>, sourceReceiverType?: GoPtr<Type>, retainCallReceiverEvidence = false): void {
  if (checker === undefined || propertyAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  const accessOwned = extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedPropertyAccess) === true;
  const callOwned = retainCallReceiverEvidence
    && extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedCall) === true;
  if (extensionHost === undefined || (!accessOwned && !callOwned)) {
    return;
  }

  const receiver = Node_Expression(propertyAccessExpression);
  const propertyName = Node_Text(Node_Name(propertyAccessExpression));
  if (receiver === undefined || propertyName === "") {
    return;
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, resolvedSelectedSymbol);
  const sourceSelectedDeclaration = primarySymbolDeclaration(sourceSelectedSymbol);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedPropertyAccess, propertyAccessExpression);
  const callExpression = retainCallReceiverEvidence ? checkedCallForCallee(propertyAccessExpression) : undefined;
  if (retainCallReceiverEvidence && callExpression === undefined) {
    throw new Error("Checked property callee evidence has no enclosing call expression.");
  }
  const retainedCalleeEvidence = extensionHost[extensionHostGetCheckedCalleeSelectionEvidence](callExpression);
  const canonicalSourceReceiverType = preserveEquivalentCheckedSourceType(
    (retainedRequest?.sourceReceiverType ?? retainedCalleeEvidence?.sourceReceiverType) as GoPtr<Type>,
    sourceReceiverType,
  );
  const canonicalSourceResultType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceResultType as GoPtr<Type>,
    sourceResultType,
  );
  const sourceReceiverProvenance = selectedSourceReceiverProvenance(
    receiver,
    canonicalSourceReceiverType,
  );
  const sourceReceiverDependencies = collectCheckedOperationDependencies(extensionHost, [receiver]);
  const request: CheckedPropertyAccessMappingRequest = {
    expression: propertyAccessExpression,
    receiver,
    propertyName,
    ...sourceReceiverProvenance,
    ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
    ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
    ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
    ...(((propertyAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { optionalChain: true } : {}),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  if (callOwned) {
    extensionHost[extensionHostRetainCheckedCalleeSelectionEvidence](callExpression!, {
      ...sourceReceiverProvenance,
      ...(sourceReceiverDependencies.length === 0 ? {} : { sourceInputOperations: sourceReceiverDependencies }),
    });
  }
  if (!accessOwned) {
    return;
  }

  extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    request,
    () => {
      throw new Error("Extension-owned checked property access mapping unexpectedly reached core fallback.");
    },
    (value, evidence) => {
      const operationWithResult = withCheckedOperationResultType(value.operation, value.resultType);
      const operation = value.provenance === undefined
        ? operationWithResult
        : withTargetOperationProvenance(operationWithResult, value.provenance);
      const operationWithProvenance = withTargetOperationProvenance(operation, {
        sourceExpression: propertyAccessExpression,
        sourceReceiver: receiver,
        ...sourceReceiverProvenance,
        ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
        ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
        ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
        ...(((propertyAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { sourceOptionalChain: true } : {}),
      });
      extensionHost.facts.set(
        propertyAccessExpression,
        targetOperationFactKey,
        snapshotTargetOperationFact(preserveEquivalentCheckedSourceResultType(extensionHost, propertyAccessExpression, operationWithProvenance, canonicalSourceResultType)),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    sourceReceiverDependencies,
  );
}

export function recordExtensionCheckedElementAccessMapping(checker: GoPtr<Checker>, elementAccessExpression: GoPtr<Node>, resolvedSelectedSymbol?: GoPtr<Symbol>, sourceResultType?: GoPtr<Type>, sourceSelectedElementIndex?: number, sourceReceiverType?: GoPtr<Type>, retainCallReceiverEvidence = false): void {
  if (checker === undefined || elementAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  const accessOwned = extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedElementAccess) === true;
  const callOwned = retainCallReceiverEvidence
    && extensionHost?.[extensionHostHasCheckedOperationOwner](ExtensionObservationPoint.mapCheckedCall) === true;
  if (extensionHost === undefined || (!accessOwned && !callOwned)) {
    return;
  }

  const receiver = Node_Expression(elementAccessExpression);
  const argument = AsElementAccessExpression(elementAccessExpression)?.ArgumentExpression;
  if (receiver === undefined || argument === undefined) {
    return;
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, resolvedSelectedSymbol);
  const sourceSelectedDeclaration = primarySymbolDeclaration(sourceSelectedSymbol);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedElementAccess, elementAccessExpression);
  const callExpression = retainCallReceiverEvidence ? checkedCallForCallee(elementAccessExpression) : undefined;
  if (retainCallReceiverEvidence && callExpression === undefined) {
    throw new Error("Checked element callee evidence has no enclosing call expression.");
  }
  const retainedCalleeEvidence = extensionHost[extensionHostGetCheckedCalleeSelectionEvidence](callExpression);
  const canonicalSourceReceiverType = preserveEquivalentCheckedSourceType(
    (retainedRequest?.sourceReceiverType ?? retainedCalleeEvidence?.sourceReceiverType) as GoPtr<Type>,
    sourceReceiverType,
  );
  const canonicalSourceResultType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceResultType as GoPtr<Type>,
    sourceResultType,
  );
  const sourceReceiverProvenance = selectedSourceReceiverProvenance(
    receiver,
    canonicalSourceReceiverType,
  );
  const dependencies = collectCheckedOperationDependencies(extensionHost, [receiver, argument]);
  const request: CheckedElementAccessMappingRequest = {
    expression: elementAccessExpression,
    receiver,
    argument,
    ...sourceReceiverProvenance,
    ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
    ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
    ...(sourceSelectedElementIndex !== undefined ? { sourceSelectedElementIndex } : {}),
    ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
    ...(((elementAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { optionalChain: true } : {}),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  if (callOwned) {
    extensionHost[extensionHostRetainCheckedCalleeSelectionEvidence](callExpression!, {
      ...sourceReceiverProvenance,
      ...(dependencies.length === 0 ? {} : { sourceInputOperations: dependencies }),
    });
  }
  if (!accessOwned) {
    return;
  }

  extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedElementAccess,
    request,
    () => {
      throw new Error("Extension-owned checked element access mapping unexpectedly reached core fallback.");
    },
    (value, evidence) => {
      const operationWithResult = withCheckedOperationResultType(value.operation, value.resultType);
      const operation = value.provenance === undefined
        ? operationWithResult
        : withTargetOperationProvenance(operationWithResult, value.provenance);
      const operationWithProvenance = withTargetOperationProvenance(operation, {
        sourceExpression: elementAccessExpression,
        sourceReceiver: receiver,
        ...sourceReceiverProvenance,
        ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
        ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
        ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
        ...(((elementAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { sourceOptionalChain: true } : {}),
      });
      extensionHost.facts.set(
        elementAccessExpression,
        targetOperationFactKey,
        snapshotTargetOperationFact(preserveEquivalentCheckedSourceResultType(extensionHost, elementAccessExpression, operationWithProvenance, canonicalSourceResultType)),
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

  const extensionHost = getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedConversion);
  if (extensionHost === undefined) {
    return;
  }
  const sourceExpression = Node_Expression(assertionExpression);
  const explicitTargetTypeNode = Node_Type(assertionExpression);
  if (sourceExpression === undefined || explicitTargetTypeNode === undefined) {
    return;
  }
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
  const canonicalSourceType = preserveEquivalentCheckedSourceType(retainedAssertion?.source as GoPtr<Type>, sourceType);
  const canonicalTargetType = preserveEquivalentCheckedSourceType(retainedAssertion?.target as GoPtr<Type>, targetType);
  const sourceSelectedSymbol = selectedSourceSymbol(checker, Checker_getResolvedSymbolOrNil(checker, SkipParentheses(sourceExpression)));
  const sourceSelectedDeclaration = primarySymbolDeclaration(sourceSelectedSymbol);
  const sourceSelectedDeclarationTypeNode = sourceSelectedDeclaration === undefined ? undefined : Node_Type(sourceSelectedDeclaration);
  recordExtensionCheckedConversion(extensionHost, {
    conversionKind: "assertion",
    assertionKind,
    expression: assertionExpression,
    source: canonicalSourceType!,
    target: canonicalTargetType!,
    sourceExpression,
    ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
    ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
    ...(sourceSelectedDeclarationTypeNode !== undefined ? { sourceSelectedDeclarationTypeNode } : {}),
    explicitTargetTypeNode,
    ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
  });
}

export function recordExtensionCheckedOperatorMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operatorToken: GoPtr<Node>, left: GoPtr<Node>, right: GoPtr<Node>, sourceResultType?: GoPtr<Type>): void {
  if (operatorToken === undefined) {
    return;
  }

  recordExtensionCheckedOperatorKindMapping(checker, expression, operatorToken.Kind, left, right, sourceResultType);
}

export function recordExtensionCheckedOperatorKindMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operator: Kind | undefined, left: GoPtr<Node>, right?: GoPtr<Node>, sourceResultType?: GoPtr<Type>): void {
  if (checker === undefined || expression === undefined || operator === undefined || left === undefined) {
    return;
  }

  const extensionHost = getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedOperator);
  if (extensionHost === undefined) {
    return;
  }
  const dependencies = collectCheckedOperationDependencies(extensionHost, [left, right]);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedOperator, expression);
  const canonicalSourceResultType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceResultType as GoPtr<Type>,
    sourceResultType,
  );
  const request: CheckedOperatorMappingRequest = {
    expression,
    operator: TokenToString(operator),
    left,
    ...(right !== undefined ? { right } : {}),
    ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedOperator,
    request,
    () => {
      throw new Error("Extension-owned checked operator mapping unexpectedly reached core fallback.");
    },
    (value, evidence) => {
      const operationWithResult = withCheckedOperationResultType(value.operation, value.resultType);
      const operation = value.provenance === undefined
        ? operationWithResult
        : withTargetOperationProvenance(operationWithResult, value.provenance);
      const operationWithProvenance = withTargetOperationProvenance(operation, {
        sourceExpression: expression,
        ...(canonicalSourceResultType !== undefined ? { sourceResultType: canonicalSourceResultType } : {}),
      });
      extensionHost.facts.set(
        expression,
        targetOperationFactKey,
        snapshotTargetOperationFact(preserveEquivalentCheckedSourceResultType(extensionHost, expression, operationWithProvenance, canonicalSourceResultType)),
        evidence,
      );
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

export function recordExtensionCheckedIterationMapping(checker: GoPtr<Checker>, statement: GoPtr<Node>, kind: CheckedIterationKind, sourceElementType?: GoPtr<Type>): void {
  if (checker === undefined || statement === undefined) {
    return;
  }

  const extensionHost = getCheckedOperationExtensionHost(checker, ExtensionObservationPoint.mapCheckedIteration);
  if (extensionHost === undefined) {
    return;
  }
  const data = AsForInOrOfStatement(statement);
  const expression = data?.Expression;
  if (expression === undefined) {
    return;
  }

  const dependencies = collectCheckedOperationDependencies(extensionHost, [expression, data?.Initializer]);
  const retainedRequest = extensionHost[extensionHostGetCheckedOperationRequest](ExtensionObservationPoint.mapCheckedIteration, statement);
  const canonicalSourceElementType = preserveEquivalentCheckedSourceType(
    retainedRequest?.sourceElementType as GoPtr<Type>,
    sourceElementType,
  );
  const request: CheckedIterationMappingRequest = {
    statement,
    expression,
    ...(data?.Initializer !== undefined ? { initializer: data.Initializer } : {}),
    kind,
    ...(canonicalSourceElementType !== undefined ? { sourceElementType: canonicalSourceElementType } : {}),
    ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
  };
  extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedIteration,
    request,
    () => {
      throw new Error("Extension-owned checked iteration mapping unexpectedly reached core fallback.");
    },
    (value, evidence) => {
      const operationWithResult = withCheckedOperationResultType(value.operation, value.resultType);
      const operation = value.provenance === undefined
        ? operationWithResult
        : withTargetOperationProvenance(operationWithResult, value.provenance);
      extensionHost.facts.set(statement, targetOperationFactKey, snapshotTargetOperationFact(withTargetOperationProvenance(operation, {
        sourceExpression: statement,
        sourceReceiver: expression,
      })), evidence);
    },
    { requireOwner: true },
    undefined,
    dependencies,
  );
}

export function recordExtensionTargetConstraintValidation(checker: GoPtr<Checker>, typeReference: GoPtr<Node>, symbol: GoPtr<Symbol>): boolean {
  if (checker === undefined || typeReference === undefined || symbol === undefined) {
    return true;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.validateTargetConstraint) === undefined) {
    return true;
  }

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
  if (checker === undefined || type === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined) {
    return;
  }
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
      extensionHost.facts.set(type, runtimeCarrierFactKey, {
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
        extensionHost.facts.set(typeReference, runtimeCarrierFactKey, {
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
        extensionHost.facts.set(symbol, runtimeCarrierFactKey, {
          ...commonFact,
          provenance: {
            ...providerProvenance,
            sourceSymbol: symbol,
          },
        }, evidence);
      }
      if (type.symbol !== undefined) {
        extensionHost.facts.set(type.symbol, runtimeCarrierFactKey, {
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
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.recordContextualTargetType) === undefined) {
    return;
  }

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
      extensionHost.facts.set(expression, contextualTargetTypeFactKey, {
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
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.observePostCheckAssignability) === undefined) {
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

export function recordExtensionFlowUseValidation(checker: GoPtr<Checker>, useSite: GoPtr<Node>, symbol: GoPtr<Symbol>): void {
  if (checker === undefined || useSite === undefined || symbol === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.validateExtensionFlowUse) === undefined) {
    return;
  }

  const useSiteFlowState = extensionHost.facts.getEntry(useSite, flowStateFactKey);
  if (useSiteFlowState !== undefined) {
    extensionHost.facts.set(symbol, flowStateFactKey, useSiteFlowState.value, useSiteFlowState.evidence);
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
      mode: "read",
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned flow validation unexpectedly reached core fallback.");
    },
    { requireOwner: true },
    (value, evidence) => {
      if (value.targetCompilerValidationRequired === true) {
        extensionHost.facts.set(useSite, flowStateFactKey, {
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
  readonly sourceArgumentIndex: number;
  readonly targetParameter: TargetParameter;
  readonly targetParameterIndex: number;
  readonly conversionTarget: TargetTypeRef;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly targetForm: "parameter" | "params-element" | "params-sequence";
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
        sourceArgumentIndex,
        targetParameter,
        targetParameterIndex: slot.targetParameterIndex,
        conversionTarget,
        sourceForm: slot.sourceForm,
        ...(slot.spreadElementIndex === undefined ? {} : { spreadElementIndex: slot.spreadElementIndex }),
        targetForm: slot.targetForm,
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
    extensionHost.facts.set(
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
  for (const slot of slots) {
    const result = recordExtensionCheckedConversion(extensionHost, {
      conversionKind: "call-argument",
      expression: slot.argument,
      source: slot.argument,
      target: slot.conversionTarget,
      call: callExpression,
      slot: slot.slot,
      sourceArgumentIndex: slot.sourceArgumentIndex,
      targetParameterIndex: slot.targetParameterIndex,
      sourceForm: slot.sourceForm,
      ...(slot.spreadElementIndex === undefined ? {} : { spreadElementIndex: slot.spreadElementIndex }),
      targetForm: slot.targetForm,
      targetParameter: slot.targetParameter,
      ...(selectedSignature.sourceSignature !== undefined ? { sourceSelectedSignature: selectedSignature.sourceSignature } : {}),
      selectedSignature,
      ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
    }, snapshotCache);
    if (result.kind === "accept") {
      continue;
    }
    if (result.kind === "owner-deferred") {
      return Object.freeze({
        kind: "deferred",
        unresolved: checkedCallArgumentConversionReference(callExpression, slot),
      });
    }
    return checkedOperationUnavailable;
  }
  return checkedOperationApplied;
}

function recordExtensionCheckedConversion(
  extensionHost: ExtensionHost,
  request: CheckedConversionMappingRequest,
  requestSnapshotCache?: CheckedOperationRequestSnapshotCache,
  additionalDependencies: readonly CheckedOperationReference[] = [],
): ExtensionObservationResult<CheckedConversionMappingResult> {
  const sourceExpression = (request.sourceExpression === undefined ? request.expression : request.sourceExpression) as GoPtr<Node>;
  const dependencies = collectCheckedOperationDependencies(extensionHost, [sourceExpression], additionalDependencies);
  return extensionHost[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedConversion,
    request,
    () => {
      throw new Error("Extension-owned conversion resolution unexpectedly reached core fallback.");
    },
    (value, evidence, acceptedRequest) => {
      if (acceptedRequest.conversionKind === "assertion"
        && value.convertedType === undefined
        && value.operation === undefined) {
        return;
      }
      const conversion = Object.freeze({
        ...(value.convertedType !== undefined ? { convertedType: value.convertedType } : {}),
        ...(value.operation !== undefined ? { operation: value.operation } : {}),
      });
      if (acceptedRequest.conversionKind === "call-argument") {
        extensionHost.facts.set(acceptedRequest.slot, targetCallArgumentConversionFactKey, Object.freeze({
          ...conversion,
          slot: acceptedRequest.slot,
          call: acceptedRequest.call,
          sourceArgumentIndex: acceptedRequest.sourceArgumentIndex,
          targetParameterIndex: acceptedRequest.targetParameterIndex,
          sourceForm: acceptedRequest.sourceForm,
          ...(acceptedRequest.spreadElementIndex === undefined ? {} : { spreadElementIndex: acceptedRequest.spreadElementIndex }),
          targetForm: acceptedRequest.targetForm,
        }), evidence);
      } else {
        extensionHost.facts.set(acceptedRequest.expression, targetConversionFactKey, conversion, evidence);
      }
    },
    { requireOwner: true },
    requestSnapshotCache,
    dependencies,
  );
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
    sourceArgumentIndex: slot.sourceArgumentIndex,
    targetParameterIndex: slot.targetParameterIndex,
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
  const dependenciesBySubject = new WeakMap<object, CheckedOperationReference[]>();
  const visited = new WeakSet<object>();
  const add = (reference: CheckedOperationReference): void => {
    const subjectDependencies = dependenciesBySubject.get(reference.subject) ?? [];
    if (!subjectDependencies.some((existing) => checkedOperationReferenceEquals(existing, reference))) {
      dependencies.push(reference);
      subjectDependencies.push(reference);
      dependenciesBySubject.set(reference.subject, subjectDependencies);
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

function checkedOperationReferenceEquals(left: CheckedOperationReference, right: CheckedOperationReference): boolean {
  return left.observation === right.observation
    && left.subject === right.subject
    && left.conversionKind === right.conversionKind
    && left.call === right.call
    && left.slot === right.slot
    && left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.targetParameterIndex === right.targetParameterIndex;
}

function selectedSourceSymbol(checker: GoPtr<Checker>, symbol: GoPtr<Symbol>): GoPtr<Symbol> {
  return symbol === undefined || symbol === checker?.unknownSymbol ? undefined : symbol;
}

function primarySymbolDeclaration(symbol: GoPtr<Symbol>): GoPtr<Node> {
  return symbol?.ValueDeclaration ?? symbol?.Declarations?.find((candidate) => candidate !== undefined);
}

interface SelectedSourceCallProvenance extends SelectedSourceReceiverEvidence {
  readonly sourceSelectedSignature: GoPtr<Signature>;
  readonly sourceSelectedDeclaration: GoPtr<Node>;
  readonly sourceSelectedMethodTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
  readonly sourceSelectedSignatureParameters: readonly SourceSelectedSignatureParameter[] | undefined;
  readonly sourceSelectedSignatureKind: SourceSelectedSignatureKind | undefined;
  readonly sourceCalleeSymbol: GoPtr<Symbol>;
  readonly sourceCalleeDeclaration: GoPtr<Node>;
  readonly sourceSelectedCalleeSymbol: GoPtr<Symbol>;
  readonly sourceSelectedCalleeDeclaration: GoPtr<Node>;
  readonly sourceReturnType: GoPtr<Type>;
  readonly sourceOptionalChain: boolean | undefined;
}

function selectedSourceCallProvenanceFromRequest(request: CheckedCallMappingRequest): SelectedSourceCallProvenance {
  return {
    sourceSelectedSignature: request.sourceSelectedSignature as GoPtr<Signature>,
    sourceSelectedDeclaration: request.sourceSelectedDeclaration as GoPtr<Node>,
    sourceSelectedMethodTypeArguments: request.sourceSelectedMethodTypeArguments,
    sourceSelectedSignatureParameters: request.sourceSelectedSignatureParameters,
    sourceSelectedSignatureKind: request.sourceSelectedSignatureKind,
    sourceCalleeSymbol: request.sourceCalleeSymbol as GoPtr<Symbol>,
    sourceCalleeDeclaration: request.sourceCalleeDeclaration as GoPtr<Node>,
    sourceSelectedCalleeSymbol: request.sourceSelectedCalleeSymbol as GoPtr<Symbol>,
    sourceSelectedCalleeDeclaration: request.sourceSelectedCalleeDeclaration as GoPtr<Node>,
    sourceReturnType: request.sourceReturnType as GoPtr<Type>,
    sourceOptionalChain: request.optionalChain,
    ...(request.sourceReceiver !== undefined ? { sourceReceiver: request.sourceReceiver } : {}),
    ...(request.sourceReceiverType !== undefined ? { sourceReceiverType: request.sourceReceiverType } : {}),
  };
}

function withSelectedTargetSignatureProvenance(
  callResult: Extract<CheckedCallMappingResult, { readonly kind: "target" }>,
  provenance: SelectedSourceCallProvenance,
  snapshotCache: CheckedOperationRequestSnapshotCache,
): SelectedTargetSignatureFact {
  const signature = callResult.selectedSignature;
  const sourceSelectedSignature = provenance.sourceSelectedSignature;
  const sourceSelectedMethodTypeArguments = provenance.sourceSelectedMethodTypeArguments;
  const sourceSelectedSignatureParameters = provenance.sourceSelectedSignatureParameters;
  const providerDeclaration = signature.providerDeclaration ?? signature.member.providerDeclaration;
  return snapshotSelectedTargetSignatureFact({
    member: signature.member,
    argumentConversions: callResult.argumentConversions,
    ...(signature.targetTypeArguments !== undefined ? { targetTypeArguments: signature.targetTypeArguments } : {}),
    ...(sourceSelectedMethodTypeArguments !== undefined ? { sourceSelectedMethodTypeArguments } : {}),
    ...(sourceSelectedSignatureParameters !== undefined ? { sourceSelectedSignatureParameters } : {}),
    ...(provenance.sourceSelectedSignatureKind !== undefined ? { sourceSelectedSignatureKind: provenance.sourceSelectedSignatureKind } : {}),
    ...(sourceSelectedSignature !== undefined ? { sourceSignature: sourceSelectedSignature } : {}),
    ...(provenance.sourceSelectedDeclaration !== undefined ? { sourceDeclaration: provenance.sourceSelectedDeclaration } : {}),
    ...(provenance.sourceCalleeSymbol !== undefined ? { sourceCalleeSymbol: provenance.sourceCalleeSymbol } : {}),
    ...(provenance.sourceCalleeDeclaration !== undefined ? { sourceCalleeDeclaration: provenance.sourceCalleeDeclaration } : {}),
    ...(provenance.sourceSelectedCalleeSymbol !== undefined ? { sourceSelectedCalleeSymbol: provenance.sourceSelectedCalleeSymbol } : {}),
    ...(provenance.sourceSelectedCalleeDeclaration !== undefined ? { sourceSelectedCalleeDeclaration: provenance.sourceSelectedCalleeDeclaration } : {}),
    ...(provenance.sourceReturnType !== undefined ? { sourceReturnType: provenance.sourceReturnType } : {}),
    ...(provenance.sourceOptionalChain !== undefined ? { sourceOptionalChain: provenance.sourceOptionalChain } : {}),
    ...(provenance.sourceReceiver !== undefined ? { sourceReceiver: provenance.sourceReceiver } : {}),
    ...(provenance.sourceReceiverType !== undefined ? { sourceReceiverType: provenance.sourceReceiverType } : {}),
    ...(providerDeclaration !== undefined ? { providerDeclaration } : {}),
  }, snapshotCache);
}

function selectedSourceReceiverProvenance(receiver: GoPtr<Node>, sourceReceiverType: GoPtr<Type>): SelectedSourceReceiverEvidence {
  if (receiver === undefined) {
    return {};
  }
  return {
    sourceReceiver: receiver,
    ...(sourceReceiverType !== undefined ? { sourceReceiverType } : {}),
  };
}

function selectedSourceReceiverEvidenceFromCalleeSelection(
  evidence: SelectedSourceReceiverEvidence | undefined,
): SelectedSourceReceiverEvidence {
  if (evidence === undefined) {
    return {};
  }
  return {
    ...(evidence.sourceReceiver === undefined ? {} : { sourceReceiver: evidence.sourceReceiver }),
    ...(evidence.sourceReceiverType === undefined ? {} : { sourceReceiverType: evidence.sourceReceiverType }),
  };
}

function checkedCallForCallee(callee: GoPtr<Node>): GoPtr<Node> {
  let current = callee;
  while (current !== undefined && IsParenthesizedExpression(current.Parent)) {
    current = current.Parent;
  }
  const parent = current?.Parent;
  return IsCallOrNewExpression(parent) && Node_Expression(parent) === current ? parent : undefined;
}

function getSourceSelectedMethodTypeArguments(callExpression: GoPtr<Node>, sourceSelectedSignature: GoPtr<Signature> | undefined): readonly SourceSelectedMethodTypeArgument[] | undefined {
  if (sourceSelectedSignature === undefined) {
    return undefined;
  }
  const typeParameters = sourceSelectedSignature.target?.typeParameters ?? sourceSelectedSignature.typeParameters ?? [];
  if (typeParameters.length === 0) {
    return undefined;
  }
  const explicitTypeNodes = Node_TypeArguments(callExpression) ?? [];
  const selected: SourceSelectedMethodTypeArgument[] = [];
  for (let index = 0; index < typeParameters.length; index++) {
    const typeParameter = typeParameters[index];
    const typeParameterName = typeParameter?.symbol?.Name ?? "";
    if (typeParameter === undefined || typeParameterName === "") {
      return undefined;
    }
    const explicitTypeNode = explicitTypeNodes[index];
    const selectedType = sourceSelectedSignature.mapper?.data.Map(typeParameter);
    if (selectedType === undefined) {
      return undefined;
    }
    selected.push({
      typeParameterName,
      typeParameter,
      selectedType,
      ...(explicitTypeNode !== undefined ? { explicitTypeNode } : {}),
    });
  }
  return selected.length === 0 ? undefined : selected;
}

function getSourceSelectedSignatureParameters(checker: GoPtr<Checker>, sourceSelectedSignature: GoPtr<Signature> | undefined): readonly SourceSelectedSignatureParameter[] | undefined {
  if (checker === undefined || sourceSelectedSignature === undefined) {
    return undefined;
  }
  const selected: SourceSelectedSignatureParameter[] = [];
  const minimumArgumentCount = Checker_getMinArgumentCount(checker, sourceSelectedSignature);
  const restParameterIndex = signatureHasRestParameter(sourceSelectedSignature) ? sourceSelectedSignature.parameters.length - 1 : -1;
  for (let parameterIndex = 0; parameterIndex < sourceSelectedSignature.parameters.length; parameterIndex++) {
    const parameterSymbol = sourceSelectedSignature.parameters[parameterIndex];
    if (parameterSymbol === undefined) {
      return undefined;
    }
    const selectedType = Checker_getTypeOfParameter(checker, parameterSymbol);
    if (selectedType === undefined) {
      return undefined;
    }
    const parameterDeclaration = primarySymbolDeclaration(parameterSymbol);
    const authoredTypeNode = parameterDeclaration === undefined ? undefined : Node_Type(parameterDeclaration);
    selected.push({
      parameterIndex,
      parameterName: parameterSymbol.Name,
      parameterSymbol,
      ...(parameterDeclaration !== undefined ? { parameterDeclaration } : {}),
      selectedType,
      ...(authoredTypeNode !== undefined ? { authoredTypeNode } : {}),
      acceptsOmission: parameterIndex >= minimumArgumentCount,
      rest: parameterIndex === restParameterIndex,
    });
  }
  return selected;
}

function getSourceSelectedSignatureKind(checker: GoPtr<Checker>, sourceSelectedSignature: GoPtr<Signature> | undefined): SourceSelectedSignatureKind | undefined {
  if (checker === undefined || sourceSelectedSignature === undefined) {
    return undefined;
  }
  if (sourceSelectedSignature === checker.anySignature) {
    return "untyped";
  }
  if (sourceSelectedSignature === checker.unknownSignature) {
    return "error";
  }
  if (sourceSelectedSignature === checker.silentNeverSignature) {
    return "silent-never";
  }
  return "resolved";
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

function withTargetOperationProvenance(operation: TargetOperationFact, provenance: TargetOperationProvenance): TargetOperationFact {
  return Object.freeze({
    ...operation,
    provenance: Object.freeze({
      ...(operation.provenance !== undefined ? operation.provenance : {}),
      ...provenance,
    }),
  });
}

function preserveEquivalentCheckedSourceType(
  existing: GoPtr<Type>,
  incoming: GoPtr<Type>,
): GoPtr<Type> {
  if (incoming === undefined) {
    return existing;
  }
  if (existing === undefined || existing === incoming) {
    return incoming;
  }
  return checkedSourceTypesShareStableIdentity(existing, incoming) ? existing : incoming;
}

function preserveEquivalentCheckedSourceResultType(
  extensionHost: ExtensionHost,
  subject: ExtensionFactSubject,
  incoming: TargetOperationFact,
  incomingSourceResultType: GoPtr<Type>,
): TargetOperationFact {
  if (incomingSourceResultType === undefined) {
    return incoming;
  }
  const existing = extensionHost.facts.get(subject, targetOperationFactKey);
  const existingSourceResultType = existing?.provenance?.sourceResultType as GoPtr<Type>;
  if (existing === undefined || existingSourceResultType === undefined || existingSourceResultType === incomingSourceResultType) {
    return incoming;
  }
  const withExistingSourceResultType = withTargetOperationProvenance(incoming, {
    sourceResultType: existingSourceResultType,
  });
  if (!targetOperationFactKey.equals(existing, withExistingSourceResultType)) {
    return incoming;
  }
  return checkedSourceTypesShareStableIdentity(existingSourceResultType, incomingSourceResultType)
    ? withExistingSourceResultType
    : incoming;
}

function checkedSourceTypesShareStableIdentity(left: GoPtr<Type>, right: GoPtr<Type>): boolean {
  if (left === right) {
    return true;
  }
  if (left?.checker !== undefined && left.checker === right?.checker && Type_Id(left) === Type_Id(right)) {
    return true;
  }
  const leftIsUniqueSymbol = (Type_Flags(left) & TypeFlagsUniqueESSymbol) !== 0;
  const rightIsUniqueSymbol = (Type_Flags(right) & TypeFlagsUniqueESSymbol) !== 0;
  if (leftIsUniqueSymbol || rightIsUniqueSymbol) {
    if (!leftIsUniqueSymbol || !rightIsUniqueSymbol) {
      return false;
    }
    const leftSymbol = Type_Symbol(left);
    const rightSymbol = Type_Symbol(right);
    if (leftSymbol === undefined || leftSymbol !== rightSymbol) {
      return false;
    }
    const declaration = primarySymbolDeclaration(leftSymbol);
    return declaration !== undefined && declaration === primarySymbolDeclaration(rightSymbol);
  }
  return false;
}

function withCheckedOperationResultType(operation: TargetOperationFact, resultType: TargetTypeRef | undefined): TargetOperationFact {
  if (operation.resultType !== undefined || resultType === undefined) {
    return operation;
  }
  return Object.freeze({
    ...operation,
    resultType,
  });
}

function withArgumentPassingProvenance(
  selectedSignature: SelectedTargetSignatureFact,
  call: ExtensionFactSubject,
  slot: SelectedTargetArgumentSlot,
): TargetCallArgumentPassingFact {
  return Object.freeze({
    slot: slot.slot,
    mode: slot.targetParameter.passingMode,
    call,
    sourceArgumentIndex: slot.sourceArgumentIndex,
    targetParameterIndex: slot.targetParameterIndex,
    sourceForm: slot.sourceForm,
    ...(slot.spreadElementIndex === undefined ? {} : { spreadElementIndex: slot.spreadElementIndex }),
    targetForm: slot.targetForm,
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
