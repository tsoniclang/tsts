import type {
  CheckedAccessSourceEvidence,
  CheckedCallSourceOperation,
  CheckedConversionSourceOperation,
  CheckedElementAccessSourceOperation,
  CheckedForAwaitOfAtomicIterationMechanism,
  CheckedForAwaitOfIterationMechanism,
  CheckedForOfAtomicIterationMechanism,
  CheckedForOfIterationMechanism,
  CheckedIterationSourceOperation,
  CheckedOperatorSourceOperation,
  CheckedPropertyAccessSourceOperation,
  CheckedSourceChainRole,
  ProviderDeclarationIdentity,
  ProviderMemberKey,
  SelectedSourceIterationProtocolEvidence,
  SelectedSourceTypeEvidence,
  SelectedSourceValueEvidence,
  SelectedTargetSignatureFact,
  SourceSelectedCallArgumentBinding,
  SourceSelectedCallEvidence,
  SourceSelectedMethodTypeArgument,
  SourceSelectedSignatureParameter,
  TargetCallArgumentConversionSlot,
  TargetConstraint,
  TargetMember,
  TargetParameter,
  TargetTypeParameter,
  TargetTypeRef,
} from "./facts.js";
import type {
  CheckedSourceCallArgumentCompositionEvidence,
  CheckedSourceCallCompositionEvidence,
  CheckedSourceInlineOperation,
  CheckedSourceInlinePropertyOperation,
} from "./source-operation-producer.js";
import type { ExtensionFactSubject } from "./host.js";

export function selectedTargetSignatureEquals(
  left: SelectedTargetSignatureFact,
  right: SelectedTargetSignatureFact,
): boolean {
  return targetMemberEquals(left.member, right.member)
    && targetCallArgumentConversionSlotArrayEquals(left.argumentConversions, right.argumentConversions)
    && left.sourceCallKind === right.sourceCallKind
    && sourceSelectedCallEvidenceEquals(left.sourceSelection, right.sourceSelection)
    && targetTypeRefArrayEquals(left.targetTypeArguments, right.targetTypeArguments)
    && selectedSourceValueEvidenceEquals(left.sourceCallee, right.sourceCallee)
    && selectedSourceValueEvidenceArrayEquals(left.sourceArguments, right.sourceArguments)
    && selectedSourceValueEvidenceEquals(left.sourceResult, right.sourceResult)
    && optionalSelectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && checkedSourceChainRoleEquals(left.sourceChainRole, right.sourceChainRole)
    && optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration);
}

export function sourceSelectedCallEvidenceEquals(
  left: SourceSelectedCallEvidence,
  right: SourceSelectedCallEvidence,
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  if (left.kind === "untyped") {
    return true;
  }
  return right.kind === "applicable"
    && left.signature === right.signature
    && left.declaration === right.declaration
    && sourceSelectedMethodTypeArgumentArrayEquals(left.methodTypeArguments, right.methodTypeArguments)
    && sourceSelectedSignatureParameterArrayEquals(left.parameters, right.parameters)
    && sourceSelectedCallArgumentBindingArrayEquals(left.argumentBindings, right.argumentBindings);
}

export function checkedSourceChainRoleEquals(
  left: CheckedSourceChainRole,
  right: CheckedSourceChainRole,
): boolean {
  if (left.kind !== right.kind || left.participant !== right.participant) {
    return false;
  }
  return left.kind === "ordinary"
    || (right.kind === "optional-chain"
      && left.position === right.position
      && left.boundary === right.boundary);
}

function sourceSelectedCallArgumentBindingArrayEquals(
  left: readonly SourceSelectedCallArgumentBinding[],
  right: readonly SourceSelectedCallArgumentBinding[],
): boolean {
  return left.length === right.length
    && left.every((binding, index) => right[index] !== undefined
      && sourceSelectedCallArgumentBindingEquals(binding, right[index]!));
}

export function sourceSelectedCallArgumentBindingEquals(
  left: SourceSelectedCallArgumentBinding,
  right: SourceSelectedCallArgumentBinding,
): boolean {
  return left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.effectiveArgumentIndex === right.effectiveArgumentIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.sourceParameterIndex === right.sourceParameterIndex
    && left.sourceParameterForm === right.sourceParameterForm
    && left.selectedArgumentType === right.selectedArgumentType
    && left.selectedParameterType === right.selectedParameterType;
}

export function selectedSourceTypeEvidenceEquals(
  left: SelectedSourceTypeEvidence,
  right: SelectedSourceTypeEvidence,
): boolean {
  return left.type === right.type
    && left.symbol === right.symbol
    && left.declaration === right.declaration
    && left.selectedSymbol === right.selectedSymbol
    && left.selectedDeclaration === right.selectedDeclaration
    && left.authoredTypeNode === right.authoredTypeNode;
}

export function optionalSelectedSourceTypeEvidenceEquals(
  left: SelectedSourceTypeEvidence | undefined,
  right: SelectedSourceTypeEvidence | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : selectedSourceTypeEvidenceEquals(left, right);
}

export function selectedSourceValueEvidenceEquals(
  left: SelectedSourceValueEvidence,
  right: SelectedSourceValueEvidence,
): boolean {
  return left.expression === right.expression
    && selectedSourceTypeEvidenceEquals(left, right);
}

export function optionalCheckedSourceCallCompositionEvidenceEquals(
  left: CheckedSourceCallCompositionEvidence | undefined,
  right: CheckedSourceCallCompositionEvidence | undefined,
): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.argumentEvidence.length === right.argumentEvidence.length
    && left.argumentEvidence.every((evidence, index) => optionalCheckedSourceCallArgumentCompositionEvidenceEquals(
      evidence,
      right.argumentEvidence[index],
    ));
}

function optionalCheckedSourceCallArgumentCompositionEvidenceEquals(
  left: CheckedSourceCallArgumentCompositionEvidence | undefined,
  right: CheckedSourceCallArgumentCompositionEvidence | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : checkedSourceCallArgumentCompositionEvidenceEquals(left, right);
}

export function checkedSourceCallArgumentCompositionEvidenceEquals(
  left: CheckedSourceCallArgumentCompositionEvidence,
  right: CheckedSourceCallArgumentCompositionEvidence,
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  if (left.kind === "authored-literal") {
    return right.kind === "authored-literal"
      && checkedSourceAuthoredLiteralEvidenceEquals(left.literal, right.literal);
  }
  return right.kind === "inline-function"
    && left.function.expression === right.function.expression
    && left.function.parameters.length === right.function.parameters.length
    && left.function.parameters.every((parameter, index) =>
      parameter.declaration === right.function.parameters[index]?.declaration
      && parameter.symbol === right.function.parameters[index]?.symbol)
    && left.function.returns.length === right.function.returns.length
    && left.function.returns.every((returned, index) =>
      returned.expression === right.function.returns[index]?.expression)
    && left.function.operations.length === right.function.operations.length
    && left.function.operations.every((operation, index) =>
      checkedSourceInlineOperationEquals(operation, right.function.operations[index]!));
}

export function checkedSourceInlineOperationEquals(
  left: CheckedSourceInlineOperation,
  right: CheckedSourceInlineOperation,
): boolean {
  if (left.sourceOperationKind !== right.sourceOperationKind) {
    return false;
  }
  switch (left.sourceOperationKind) {
    case "call":
      return right.sourceOperationKind === "call" && checkedCallSourceOperationEquals(left, right);
    case "property-access":
      return right.sourceOperationKind === "property-access"
        && checkedSourceInlinePropertyOperationEquals(left, right);
    case "element-access":
      return right.sourceOperationKind === "element-access"
        && checkedElementAccessSourceOperationEquals(left, right);
    case "operator":
      return right.sourceOperationKind === "operator"
        && checkedOperatorSourceOperationEquals(left, right);
    case "iteration":
      return right.sourceOperationKind === "iteration"
        && checkedIterationSourceOperationEquals(left, right);
    case "conversion":
      return right.sourceOperationKind === "conversion"
        && checkedConversionSourceOperationEquals(left, right);
  }
}

function checkedSourceInlinePropertyOperationEquals(
  left: CheckedSourceInlinePropertyOperation,
  right: CheckedSourceInlinePropertyOperation,
): boolean {
  return left.expression === right.expression
    && left.receiver === right.receiver
    && left.use === right.use
    && selectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && checkedAccessSourceEvidenceEquals(left, right)
    && checkedSourceChainRoleEquals(left.chainRole, right.chainRole);
}

function checkedSourceAuthoredLiteralEvidenceEquals(
  left: Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "authored-literal" }>["literal"],
  right: Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "authored-literal" }>["literal"],
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "string":
    case "number":
    case "bigint":
      return right.kind === left.kind && left.value === right.value;
    case "boolean":
      return right.kind === "boolean" && left.value === right.value;
    case "null":
      return right.kind === "null";
  }
}

export function optionalSelectedSourceValueEvidenceEquals(
  left: SelectedSourceValueEvidence | undefined,
  right: SelectedSourceValueEvidence | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : selectedSourceValueEvidenceEquals(left, right);
}

export function selectedSourceValueEvidenceArrayEquals(
  left: readonly SelectedSourceValueEvidence[],
  right: readonly SelectedSourceValueEvidence[],
): boolean {
  return left.length === right.length
    && left.every((evidence, index) => selectedSourceValueEvidenceEquals(evidence, right[index]!));
}

function targetCallArgumentConversionSlotArrayEquals(
  left: readonly TargetCallArgumentConversionSlot[],
  right: readonly TargetCallArgumentConversionSlot[],
): boolean {
  return left.length === right.length
    && left.every((slot, index) => {
      const other = right[index];
      return other !== undefined && targetCallArgumentConversionSlotEquals(slot, other);
    });
}

export function targetCallArgumentConversionSlotEquals(
  left: TargetCallArgumentConversionSlot,
  right: TargetCallArgumentConversionSlot,
): boolean {
  return left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.targetParameterIndex === right.targetParameterIndex
    && left.targetForm === right.targetForm;
}

export function checkedCallSourceOperationEquals(
  left: CheckedCallSourceOperation,
  right: CheckedCallSourceOperation,
): boolean {
  return left.call === right.call
    && left.callee === right.callee
    && extensionFactSubjectArrayEquals(left.arguments, right.arguments)
    && left.callKind === right.callKind
    && sourceSelectedCallEvidenceEquals(left.sourceSelection, right.sourceSelection)
    && selectedSourceValueEvidenceEquals(left.sourceCallee, right.sourceCallee)
    && selectedSourceValueEvidenceArrayEquals(left.sourceArguments, right.sourceArguments)
    && selectedSourceValueEvidenceEquals(left.sourceResult, right.sourceResult)
    && optionalSelectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && checkedSourceChainRoleEquals(left.chainRole, right.chainRole);
}

export function checkedPropertyAccessSourceOperationEquals(
  left: CheckedPropertyAccessSourceOperation,
  right: CheckedPropertyAccessSourceOperation,
): boolean {
  return left.expression === right.expression
    && left.receiver === right.receiver
    && left.propertyName === right.propertyName
    && left.use === right.use
    && selectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && checkedAccessSourceEvidenceEquals(left, right)
    && checkedSourceChainRoleEquals(left.chainRole, right.chainRole);
}

export function checkedElementAccessSourceOperationEquals(
  left: CheckedElementAccessSourceOperation,
  right: CheckedElementAccessSourceOperation,
): boolean {
  return left.expression === right.expression
    && left.receiver === right.receiver
    && left.argument === right.argument
    && left.use === right.use
    && selectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && selectedSourceValueEvidenceEquals(left.sourceArgument, right.sourceArgument)
    && checkedAccessSourceEvidenceEquals(left, right)
    && left.sourceSelectedElementIndex === right.sourceSelectedElementIndex
    && checkedSourceChainRoleEquals(left.chainRole, right.chainRole);
}

function checkedAccessSourceEvidenceEquals(
  left: CheckedAccessSourceEvidence,
  right: CheckedAccessSourceEvidence,
): boolean {
  if (left.accessMode !== right.accessMode) {
    return false;
  }
  switch (left.accessMode) {
    case "read":
    case "delete":
      return right.accessMode === left.accessMode
        && selectedSourceValueEvidenceEquals(left.sourceReadResult, right.sourceReadResult);
    case "write":
      return right.accessMode === "write"
        && selectedSourceTypeEvidenceEquals(left.sourceWriteType, right.sourceWriteType);
    case "read-write":
      return right.accessMode === "read-write"
        && selectedSourceValueEvidenceEquals(left.sourceReadResult, right.sourceReadResult)
        && selectedSourceTypeEvidenceEquals(left.sourceWriteType, right.sourceWriteType);
  }
}

export function checkedOperatorSourceOperationEquals(
  left: CheckedOperatorSourceOperation,
  right: CheckedOperatorSourceOperation,
): boolean {
  if (left.operatorKind !== right.operatorKind
    || left.expression !== right.expression
    || left.operator !== right.operator
    || !selectedSourceValueEvidenceEquals(left.sourceResult, right.sourceResult)) {
    return false;
  }
  switch (left.operatorKind) {
    case "prefix-unary":
    case "prefix-update":
    case "postfix-update":
      return right.operatorKind === left.operatorKind
        && left.operand === right.operand
        && selectedSourceValueEvidenceEquals(left.sourceOperand, right.sourceOperand);
    case "binary":
      return right.operatorKind === "binary"
        && left.left === right.left
        && left.right === right.right
        && selectedSourceValueEvidenceEquals(left.sourceLeft, right.sourceLeft)
        && selectedSourceValueEvidenceEquals(left.sourceRight, right.sourceRight);
  }
}

export function checkedIterationSourceOperationEquals(
  left: CheckedIterationSourceOperation,
  right: CheckedIterationSourceOperation,
): boolean {
  if (left.iterationKind !== right.iterationKind
    || left.statement !== right.statement
    || left.expression !== right.expression
    || left.initializer !== right.initializer
    || !selectedSourceValueEvidenceEquals(left.sourceIterable, right.sourceIterable)
    || !selectedSourceTypeEvidenceEquals(left.sourceElement, right.sourceElement)) {
    return false;
  }
  switch (left.iterationKind) {
    case "for-in":
      return right.iterationKind === "for-in" && left.mechanism.kind === right.mechanism.kind;
    case "for-of":
      return right.iterationKind === "for-of" && checkedForOfIterationMechanismEquals(left.mechanism, right.mechanism);
    case "for-await-of":
      return right.iterationKind === "for-await-of" && checkedForAwaitOfIterationMechanismEquals(left.mechanism, right.mechanism);
  }
}

function checkedForOfIterationMechanismEquals(
  left: CheckedForOfIterationMechanism,
  right: CheckedForOfIterationMechanism,
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  if (left.kind === "union") {
    return right.kind === "union"
      && left.alternatives.length === right.alternatives.length
      && left.alternatives.every((alternative, index) => checkedForOfAtomicIterationMechanismEquals(alternative, right.alternatives[index]!));
  }
  return right.kind !== "union" && checkedForOfAtomicIterationMechanismEquals(left, right);
}

function checkedForOfAtomicIterationMechanismEquals(
  left: CheckedForOfAtomicIterationMechanism,
  right: CheckedForOfAtomicIterationMechanism,
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "synchronous-iterator-protocol":
      return right.kind === "synchronous-iterator-protocol"
        && selectedSourceTypeEvidenceEquals(left.sourceAlternative, right.sourceAlternative)
        && selectedSourceIterationProtocolEvidenceEquals(left.protocol, right.protocol);
    case "array-like-index":
      return right.kind === "array-like-index"
        && selectedSourceTypeEvidenceEquals(left.sourceAlternative, right.sourceAlternative)
        && selectedSourceTypeEvidenceEquals(left.selectedIndex, right.selectedIndex);
    case "string-code-unit-index":
    case "untyped-dynamic-iteration":
      return right.kind === left.kind
        && selectedSourceTypeEvidenceEquals(left.sourceAlternative, right.sourceAlternative);
  }
}

function checkedForAwaitOfIterationMechanismEquals(
  left: CheckedForAwaitOfIterationMechanism,
  right: CheckedForAwaitOfIterationMechanism,
): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  if (left.kind === "union") {
    return right.kind === "union"
      && left.alternatives.length === right.alternatives.length
      && left.alternatives.every((alternative, index) => checkedForAwaitOfAtomicIterationMechanismEquals(alternative, right.alternatives[index]!));
  }
  return right.kind !== "union" && checkedForAwaitOfAtomicIterationMechanismEquals(left, right);
}

function checkedForAwaitOfAtomicIterationMechanismEquals(
  left: CheckedForAwaitOfAtomicIterationMechanism,
  right: CheckedForAwaitOfAtomicIterationMechanism,
): boolean {
  if (left.kind !== right.kind
    || !selectedSourceTypeEvidenceEquals(left.sourceAlternative, right.sourceAlternative)) {
    return false;
  }
  switch (left.kind) {
    case "asynchronous-iterator-protocol":
    case "synchronous-iterator-adapted-to-async":
      return right.kind === left.kind
        && selectedSourceIterationProtocolEvidenceEquals(left.protocol, right.protocol);
    case "array-like-index-adapted-to-async":
      return right.kind === "array-like-index-adapted-to-async"
        && selectedSourceTypeEvidenceEquals(left.selectedIndex, right.selectedIndex);
    case "string-code-unit-index-adapted-to-async":
    case "untyped-dynamic-iteration":
      return true;
  }
}

function selectedSourceIterationProtocolEvidenceEquals(
  left: SelectedSourceIterationProtocolEvidence,
  right: SelectedSourceIterationProtocolEvidence,
): boolean {
  if (left.resolutionKind !== right.resolutionKind
    || !optionalSelectedSourceTypeEvidenceEquals(left.iterationTypes.yieldType, right.iterationTypes.yieldType)
    || !optionalSelectedSourceTypeEvidenceEquals(left.iterationTypes.returnType, right.iterationTypes.returnType)
    || !optionalSelectedSourceTypeEvidenceEquals(left.iterationTypes.nextType, right.iterationTypes.nextType)) {
    return false;
  }
  if (left.resolutionKind === "known-iterable-instantiation") {
    return right.resolutionKind === "known-iterable-instantiation"
      && selectedSourceTypeEvidenceEquals(left.iterableTarget, right.iterableTarget)
      && extensionFactSubjectArrayEquals(left.iterableDeclarations, right.iterableDeclarations);
  }
  return right.resolutionKind === "selected-iterator-member"
    && left.iteratorMethod.symbol === right.iteratorMethod.symbol
    && left.iteratorMethod.valueDeclaration === right.iteratorMethod.valueDeclaration
    && extensionFactSubjectArrayEquals(left.iteratorMethod.declarations, right.iteratorMethod.declarations)
    && left.iteratorMethod.type === right.iteratorMethod.type
    && selectedSourceTypeEvidenceEquals(left.iteratorType, right.iteratorType);
}

function extensionFactSubjectArrayEquals(
  left: readonly ExtensionFactSubject[],
  right: readonly ExtensionFactSubject[],
): boolean {
  return left.length === right.length && left.every((subject, index) => subject === right[index]);
}

export function checkedConversionSourceOperationEquals(
  left: CheckedConversionSourceOperation,
  right: CheckedConversionSourceOperation,
): boolean {
  if (left.conversionKind !== right.conversionKind
    || left.expression !== right.expression
    || !selectedSourceValueEvidenceEquals(left.source, right.source)) {
    return false;
  }
  if (left.conversionKind === "assertion") {
    return right.conversionKind === "assertion"
      && selectedSourceTypeEvidenceEquals(left.target, right.target)
      && left.assertionKind === right.assertionKind
      && left.explicitTargetTypeNode === right.explicitTargetTypeNode;
  }
  return right.conversionKind === "call-argument"
    && left.call === right.call
    && targetCallArgumentConversionSlotEquals(left.slot, right.slot)
    && sourceSelectedCallArgumentBindingEquals(left.sourceBinding, right.sourceBinding);
}

export function optionalTargetTypeRefEquals(
  left: TargetTypeRef | undefined,
  right: TargetTypeRef | undefined,
): boolean {
  return left === undefined || right === undefined ? left === right : targetTypeRefEquals(left, right);
}

export function optionalProviderDeclarationIdentityEquals(
  left: ProviderDeclarationIdentity | undefined,
  right: ProviderDeclarationIdentity | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : providerDeclarationIdentityEquals(left, right);
}

export function optionalProviderMemberKeyEquals(
  left: ProviderMemberKey | undefined,
  right: ProviderMemberKey | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : left.kind === right.kind && left.name === right.name;
}

export function providerDeclarationIdentityEquals(
  left: ProviderDeclarationIdentity,
  right: ProviderDeclarationIdentity,
): boolean {
  return left.providerId === right.providerId
    && left.providerVersion === right.providerVersion
    && left.providerModuleId === right.providerModuleId
    && left.moduleSpecifier === right.moduleSpecifier
    && left.artifactFileName === right.artifactFileName
    && left.exportName === right.exportName
    && left.exportId === right.exportId
    && left.memberName === right.memberName
    && optionalProviderMemberKeyEquals(left.memberKey, right.memberKey)
    && left.memberId === right.memberId
    && left.memberStatic === right.memberStatic
    && left.signatureId === right.signatureId
    && optionalTargetTypeRefEquals(left.targetIdentity, right.targetIdentity);
}

export function targetTypeRefArrayEquals(
  left: readonly TargetTypeRef[] | undefined,
  right: readonly TargetTypeRef[] | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : left.length === right.length && left.every((value, index) => targetTypeRefEquals(value, right[index]!));
}

export function targetMemberEquals(left: TargetMember, right: TargetMember): boolean {
  return left.id === right.id
    && left.sourceName === right.sourceName
    && left.targetName === right.targetName
    && left.kind === right.kind
    && left.static === right.static
    && targetParameterArrayEquals(left.parameters, right.parameters)
    && optionalTargetTypeRefEquals(left.returnType, right.returnType)
    && targetTypeParameterArrayEquals(left.typeParameters, right.typeParameters)
    && left.overloadGroup === right.overloadGroup
    && optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration);
}

function targetParameterArrayEquals(left: readonly TargetParameter[], right: readonly TargetParameter[]): boolean {
  return left.length === right.length && left.every((value, index) => targetParameterEquals(value, right[index]!));
}

export function targetParameterEquals(left: TargetParameter, right: TargetParameter): boolean {
  return left.name === right.name
    && targetTypeRefEquals(left.type, right.type)
    && left.passingMode === right.passingMode
    && left.optional === right.optional
    && left.paramsArray === right.paramsArray;
}

export function targetTypeParameterArrayEquals(
  left: readonly TargetTypeParameter[] | undefined,
  right: readonly TargetTypeParameter[] | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : left.length === right.length && left.every((value, index) => targetTypeParameterEquals(value, right[index]!));
}

function targetTypeParameterEquals(left: TargetTypeParameter, right: TargetTypeParameter): boolean {
  return left.name === right.name
    && left.variance === right.variance
    && targetConstraintArrayEquals(left.constraints, right.constraints);
}

export function targetConstraintArrayEquals(
  left: readonly TargetConstraint[] | undefined,
  right: readonly TargetConstraint[] | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : left.length === right.length && left.every((value, index) => targetConstraintEquals(value, right[index]!));
}

function targetConstraintEquals(left: TargetConstraint, right: TargetConstraint): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "implements":
      return right.kind === "implements"
        && left.contract === right.contract
        && targetTypeRefArrayEquals(left.typeArguments, right.typeArguments);
    case "lifetime":
      return right.kind === "lifetime" && left.name === right.name;
    case "target-specific":
      return right.kind === "target-specific"
        && left.target === right.target
        && left.name === right.name
        && left.payloadId === right.payloadId;
    case "value-type":
    case "reference-type":
    case "constructible":
    case "unmanaged":
    case "copy":
    case "clone":
    case "default":
    case "sized":
      return true;
  }
}

export function sourceSelectedMethodTypeArgumentArrayEquals(
  left: readonly SourceSelectedMethodTypeArgument[],
  right: readonly SourceSelectedMethodTypeArgument[],
): boolean {
  return left.length === right.length
    && left.every((argument, index) => sourceSelectedMethodTypeArgumentEquals(argument, right[index]!));
}

function sourceSelectedMethodTypeArgumentEquals(
  left: SourceSelectedMethodTypeArgument,
  right: SourceSelectedMethodTypeArgument,
): boolean {
  return left.typeParameterName === right.typeParameterName
    && left.typeParameter === right.typeParameter
    && left.selectedType === right.selectedType
    && left.explicitTypeNode === right.explicitTypeNode;
}

export function sourceSelectedSignatureParameterArrayEquals(
  left: readonly SourceSelectedSignatureParameter[],
  right: readonly SourceSelectedSignatureParameter[],
): boolean {
  return left.length === right.length
    && left.every((parameter, index) => sourceSelectedSignatureParameterEquals(parameter, right[index]!));
}

function sourceSelectedSignatureParameterEquals(
  left: SourceSelectedSignatureParameter,
  right: SourceSelectedSignatureParameter,
): boolean {
  return left.parameterIndex === right.parameterIndex
    && left.parameterName === right.parameterName
    && left.parameterSymbol === right.parameterSymbol
    && left.parameterDeclaration === right.parameterDeclaration
    && left.selectedType === right.selectedType
    && left.authoredTypeNode === right.authoredTypeNode
    && left.acceptsOmission === right.acceptsOmission
    && left.rest === right.rest;
}

export function targetTypeRefEquals(left: TargetTypeRef, right: TargetTypeRef): boolean {
  const pending: Array<readonly [TargetTypeRef, TargetTypeRef]> = [[left, right]];
  const compared = new WeakMap<object, WeakSet<object>>();
  const queueLists = (leftItems: readonly TargetTypeRef[], rightItems: readonly TargetTypeRef[]): boolean => {
    if (leftItems.length !== rightItems.length) {
      return false;
    }
    for (let index = 0; index < leftItems.length; index++) {
      pending.push([leftItems[index]!, rightItems[index]!]);
    }
    return true;
  };

  while (pending.length !== 0) {
    const [currentLeft, currentRight] = pending.pop()!;
    if (currentLeft === currentRight) {
      continue;
    }
    let rightComparisons = compared.get(currentLeft);
    if (rightComparisons?.has(currentRight) === true) {
      continue;
    }
    if (rightComparisons === undefined) {
      rightComparisons = new WeakSet<object>();
      compared.set(currentLeft, rightComparisons);
    }
    rightComparisons.add(currentRight);
    if (currentLeft.kind !== currentRight.kind) {
      return false;
    }
    switch (currentLeft.kind) {
      case "source-primitive":
        if (currentRight.kind !== "source-primitive" || currentLeft.name !== currentRight.name) return false;
        break;
      case "source-global":
        if (currentRight.kind !== "source-global"
          || currentLeft.name !== currentRight.name
          || !queueLists(currentLeft.typeArguments ?? [], currentRight.typeArguments ?? [])) return false;
        break;
      case "target-named":
        if (currentRight.kind !== "target-named"
          || currentLeft.id !== currentRight.id
          || !queueLists(currentLeft.typeArguments ?? [], currentRight.typeArguments ?? [])) return false;
        break;
      case "type-parameter":
        if (currentRight.kind !== "type-parameter" || currentLeft.name !== currentRight.name) return false;
        break;
      case "array":
        if (currentRight.kind !== "array" || currentLeft.rank !== currentRight.rank) return false;
        pending.push([currentLeft.element, currentRight.element]);
        break;
      case "tuple":
        if (currentRight.kind !== "tuple" || !queueLists(currentLeft.elements, currentRight.elements)) return false;
        break;
      case "pointer":
        if (currentRight.kind !== "pointer" || currentLeft.mutability !== currentRight.mutability) return false;
        pending.push([currentLeft.pointee, currentRight.pointee]);
        break;
      case "function-pointer":
        if (currentRight.kind !== "function-pointer"
          || !stringListEquals(currentLeft.abi ?? [], currentRight.abi ?? [])
          || !queueLists(currentLeft.args, currentRight.args)) return false;
        pending.push([currentLeft.result, currentRight.result]);
        break;
      case "opaque":
        if (currentRight.kind !== "opaque" || currentLeft.id !== currentRight.id) return false;
        break;
      case "associated-type":
        if (currentRight.kind !== "associated-type" || currentLeft.name !== currentRight.name) return false;
        pending.push([currentLeft.owner, currentRight.owner]);
        break;
      case "lifetime":
        if (currentRight.kind !== "lifetime" || currentLeft.name !== currentRight.name) return false;
        break;
      case "target-specific":
        if (currentRight.kind !== "target-specific"
          || currentLeft.target !== currentRight.target
          || currentLeft.name !== currentRight.name
          || currentLeft.payloadId !== currentRight.payloadId) return false;
        break;
    }
  }
  return true;
}

function stringListEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
