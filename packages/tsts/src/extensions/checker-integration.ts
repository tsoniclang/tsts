import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression, Node_Symbol, Node_Text, Node_TypeArguments } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_Name } from "../internal/ast/spine.js";
import { AsElementAccessExpression, AsForInOrOfStatement } from "../internal/ast/generated/casts.js";
import { NodeFlagsOptionalChain } from "../internal/ast/generated/flags.js";
import type { Kind } from "../internal/ast/generated/kinds.js";
import { TokenToString } from "../internal/scanner/scanner.js";
import type { Checker } from "../internal/checker/checker/state.js";
import { Type_Flags, Type_Symbol, TypeFlagsUniqueESSymbol } from "../internal/checker/types.js";
import type { Signature, Type } from "../internal/checker/types.js";
import { Checker_GetReturnTypeOfSignature } from "../internal/checker/exports.js";
import { Checker_isTypeIdenticalTo } from "../internal/checker/relater.js";
import { ExtensionObservationPoint } from "./observations.js";
import type { CheckedCallMappingRequest, CheckedCallMappingResult, CheckedElementAccessMappingRequest, CheckedIterationKind, CheckedOperatorMappingRequest, CheckedPropertyAccessMappingRequest, PostCheckAssignabilityObservationRequest } from "./observations.js";
import { argumentPassingFactKey, contextualTargetTypeFactKey, flowStateFactKey, providerTypeFamilyFactKey, providerVirtualDeclarationFactKey, runtimeCarrierFactKey, selectedTargetSignatureFactKey, sourcePrimitiveFactKey, targetBindingFactKey, targetConversionFactKey, targetOperationFactKey } from "./facts.js";
import type { ArgumentPassingFact, SelectedTargetSignatureFact, SourceSelectedMethodTypeArgument, TargetOperationFact, TargetOperationProvenance, TargetParameter, TargetTypeRef } from "./facts.js";
import type { ExtensionEvidence, ExtensionFactKey, ExtensionFactSubject, ExtensionHost } from "./host.js";
import { getExtensionHost } from "./host.js";
import { recordProviderTypeFamilyReferenceFacts } from "./compiler-integration.js";

export function recordExtensionCheckedCallMapping(checker: GoPtr<Checker>, callExpression: GoPtr<Node>, sourceSelectedSignature?: GoPtr<Signature>, resolvedCalleeSymbol?: GoPtr<Symbol>): void {
  if (checker === undefined || callExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedCall) === undefined) {
    return;
  }

  const callee = Node_Expression(callExpression);
  if (callee === undefined) {
    return;
  }
  const sourceCalleeSymbol = selectedSourceSymbol(checker, resolvedCalleeSymbol ?? Node_Symbol(callee));
  const sourceCalleeDeclaration = primarySymbolDeclaration(sourceCalleeSymbol);
  const sourceSelectedMethodTypeArguments = getSourceSelectedMethodTypeArguments(callExpression, sourceSelectedSignature);
  const sourceReturnType = sourceSelectedSignature === undefined ? undefined : Checker_GetReturnTypeOfSignature(checker, sourceSelectedSignature);

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapCheckedCall,
    {
      call: callExpression,
      callee,
      arguments: definedFactSubjects(Node_Arguments(callExpression) ?? []),
      ...(sourceSelectedSignature !== undefined ? { sourceSelectedSignature } : {}),
      ...(sourceSelectedSignature?.declaration !== undefined ? { sourceSelectedDeclaration: sourceSelectedSignature.declaration } : {}),
      ...(sourceSelectedMethodTypeArguments !== undefined ? { sourceSelectedMethodTypeArguments } : {}),
      ...(sourceCalleeSymbol !== undefined ? { sourceCalleeSymbol } : {}),
      ...(sourceCalleeDeclaration !== undefined ? { sourceCalleeDeclaration } : {}),
      ...(sourceReturnType !== undefined ? { sourceReturnType } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned checked call mapping unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  const arguments_ = Node_Arguments(callExpression) ?? [];
  const selectedSignature = withSelectedTargetSignatureProvenance(
    recordExtensionTargetTypeArgumentMapping(extensionHost, callExpression, callee, sourceSelectedSignature, sourceSelectedMethodTypeArguments, sourceCalleeSymbol, sourceCalleeDeclaration, sourceReturnType, result.value, arguments_),
    {
      sourceSelectedSignature,
      sourceSelectedMethodTypeArguments,
      sourceCalleeSymbol,
      sourceCalleeDeclaration,
      sourceReturnType,
    },
  );
  extensionHost.facts.set(callExpression, selectedTargetSignatureFactKey, selectedSignature, result.evidence ?? []);
  recordExtensionCallParameterModes(extensionHost, callExpression, { ...result.value, selectedSignature }, arguments_);
  recordExtensionCallArgumentConversions(extensionHost, callExpression, { ...result.value, selectedSignature }, arguments_);
}

export function recordExtensionCheckedPropertyAccessMapping(checker: GoPtr<Checker>, propertyAccessExpression: GoPtr<Node>, resolvedSelectedSymbol?: GoPtr<Symbol>, sourceResultType?: GoPtr<Type>): void {
  if (checker === undefined || propertyAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedPropertyAccess) === undefined) {
    return;
  }

  const receiver = Node_Expression(propertyAccessExpression);
  const propertyName = Node_Text(Node_Name(propertyAccessExpression));
  if (receiver === undefined || propertyName === "") {
    return;
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, resolvedSelectedSymbol ?? Node_Symbol(Node_Name(propertyAccessExpression)));
  const sourceSelectedDeclaration = primarySymbolDeclaration(sourceSelectedSymbol);

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    {
      expression: propertyAccessExpression,
      receiver,
      propertyName,
      ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
      ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
      ...(sourceResultType !== undefined ? { sourceResultType } : {}),
      ...(((propertyAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { optionalChain: true } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned checked property access mapping unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  const operationWithResult = withCheckedOperationResultType(result.value.operation, result.value.resultType);
  const operation = result.value.provenance === undefined
    ? operationWithResult
    : withTargetOperationProvenance(operationWithResult, result.value.provenance);
  const operationWithProvenance = withTargetOperationProvenance(operation, {
    sourceExpression: propertyAccessExpression,
    sourceReceiver: receiver,
    ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
    ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
    ...(sourceResultType !== undefined ? { sourceResultType } : {}),
  });
  extensionHost.facts.set(
    propertyAccessExpression,
    targetOperationFactKey,
    preserveEquivalentCheckedSourceResultType(checker, extensionHost, propertyAccessExpression, operationWithProvenance, sourceResultType),
    result.evidence ?? [],
  );
}

export function recordExtensionCheckedElementAccessMapping(checker: GoPtr<Checker>, elementAccessExpression: GoPtr<Node>, resolvedSelectedSymbol?: GoPtr<Symbol>, sourceResultType?: GoPtr<Type>): void {
  if (checker === undefined || elementAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedElementAccess) === undefined) {
    return;
  }

  const receiver = Node_Expression(elementAccessExpression);
  const argument = AsElementAccessExpression(elementAccessExpression)?.ArgumentExpression;
  if (receiver === undefined || argument === undefined) {
    return;
  }
  const sourceSelectedSymbol = selectedSourceSymbol(checker, resolvedSelectedSymbol ?? Node_Symbol(elementAccessExpression));
  const sourceSelectedDeclaration = primarySymbolDeclaration(sourceSelectedSymbol);

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapCheckedElementAccess,
    {
      expression: elementAccessExpression,
      receiver,
      argument,
      ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
      ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
      ...(sourceResultType !== undefined ? { sourceResultType } : {}),
      ...(((elementAccessExpression.Flags ?? 0) & NodeFlagsOptionalChain) !== 0 ? { optionalChain: true } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned checked element access mapping unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  const operationWithResult = withCheckedOperationResultType(result.value.operation, result.value.resultType);
  const operation = result.value.provenance === undefined
    ? operationWithResult
    : withTargetOperationProvenance(operationWithResult, result.value.provenance);
  const operationWithProvenance = withTargetOperationProvenance(operation, {
    sourceExpression: elementAccessExpression,
    sourceReceiver: receiver,
    ...(sourceSelectedSymbol !== undefined ? { sourceSelectedSymbol } : {}),
    ...(sourceSelectedDeclaration !== undefined ? { sourceSelectedDeclaration } : {}),
    ...(sourceResultType !== undefined ? { sourceResultType } : {}),
  });
  extensionHost.facts.set(
    elementAccessExpression,
    targetOperationFactKey,
    preserveEquivalentCheckedSourceResultType(checker, extensionHost, elementAccessExpression, operationWithProvenance, sourceResultType),
    result.evidence ?? [],
  );
}

export function recordExtensionCheckedOperatorMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operatorToken: GoPtr<Node>, left: GoPtr<Node>, right: GoPtr<Node>): void {
  if (operatorToken === undefined) {
    return;
  }

  recordExtensionCheckedOperatorKindMapping(checker, expression, operatorToken.Kind, left, right);
}

export function recordExtensionCheckedOperatorKindMapping(checker: GoPtr<Checker>, expression: GoPtr<Node>, operator: Kind | undefined, left: GoPtr<Node>, right?: GoPtr<Node>): void {
  if (checker === undefined || expression === undefined || operator === undefined || left === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedOperator) === undefined) {
    return;
  }

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapCheckedOperator,
    {
      expression,
      operator: TokenToString(operator),
      left,
      ...(right !== undefined ? { right } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned checked operator mapping unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  const operationWithResult = withCheckedOperationResultType(result.value.operation, result.value.resultType);
  const operation = result.value.provenance === undefined
    ? operationWithResult
    : withTargetOperationProvenance(operationWithResult, result.value.provenance);
  extensionHost.facts.set(expression, targetOperationFactKey, withTargetOperationProvenance(operation, {
    sourceExpression: expression,
  }), result.evidence ?? []);
}

export function recordExtensionCheckedIterationMapping(checker: GoPtr<Checker>, statement: GoPtr<Node>, kind: CheckedIterationKind, sourceElementType?: GoPtr<Type>): void {
  if (checker === undefined || statement === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedIteration) === undefined) {
    return;
  }
  const data = AsForInOrOfStatement(statement);
  const expression = data?.Expression;
  if (expression === undefined) {
    return;
  }

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapCheckedIteration,
    {
      statement,
      expression,
      ...(data?.Initializer !== undefined ? { initializer: data.Initializer } : {}),
      kind,
      ...(sourceElementType !== undefined ? { sourceElementType } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned checked iteration mapping unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  const operationWithResult = withCheckedOperationResultType(result.value.operation, result.value.resultType);
  const operation = result.value.provenance === undefined
    ? operationWithResult
    : withTargetOperationProvenance(operationWithResult, result.value.provenance);
  extensionHost.facts.set(statement, targetOperationFactKey, withTargetOperationProvenance(operation, {
    sourceExpression: statement,
    sourceReceiver: expression,
  }), result.evidence ?? []);
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

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.resolveRuntimeCarrier,
    {
      type,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned runtime carrier resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );
  if (result.kind !== "accept") {
    return;
  }

  const fact = {
    carrier: result.value.carrier,
    ...(result.value.requiresAllocation !== undefined ? { requiresAllocation: result.value.requiresAllocation } : {}),
    provenance: {
      ...(result.value.provenance !== undefined ? result.value.provenance : {}),
      sourceType: type,
      ...(typeReference !== undefined ? { sourceTypeReference: typeReference } : {}),
      ...(symbol !== undefined ? { sourceSymbol: symbol } : {}),
    },
  };
  extensionHost.facts.set(type, runtimeCarrierFactKey, fact, result.evidence ?? []);
  setFactOnOptionalSubject(extensionHost, typeReference, runtimeCarrierFactKey, fact, result.evidence ?? []);
  setFactOnOptionalSubject(extensionHost, symbol, runtimeCarrierFactKey, fact, result.evidence ?? []);
  setFactOnOptionalSubject(extensionHost, type.symbol, runtimeCarrierFactKey, fact, result.evidence ?? []);
}

export function recordExtensionContextualTargetTypeFact(checker: GoPtr<Checker>, expression: GoPtr<Node>, contextualType: GoPtr<Type>): void {
  if (checker === undefined || expression === undefined || contextualType === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getObservationOwner(ExtensionObservationPoint.recordContextualTargetType) === undefined) {
    return;
  }

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.recordContextualTargetType,
    {
      expression,
      context: contextualType,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => ({
      type: contextualType,
    }),
  );
  if (result.kind !== "accept") {
    return;
  }

  extensionHost.facts.set(expression, contextualTargetTypeFactKey, {
    type: result.value.type,
    ...(result.value.targetType !== undefined ? { targetType: result.value.targetType } : {}),
  }, result.evidence ?? []);
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

  const result = extensionHost.runObservation(
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
  );
  if (result.kind !== "accept") {
    return;
  }
  if (result.value.targetCompilerValidationRequired === true) {
    extensionHost.facts.set(useSite, flowStateFactKey, {
      state: "target-validation-required",
      ...(result.value.targetCompiler !== undefined ? { targetCompiler: result.value.targetCompiler } : {}),
    }, result.evidence ?? []);
  }
}

function recordExtensionCallParameterModes(extensionHost: ExtensionHost, callExpression: GoPtr<Node>, callResult: CheckedCallMappingResult, arguments_: readonly GoPtr<Node>[]): void {
  if (extensionHost.getObservationOwner(ExtensionObservationPoint.resolveParameterPassing) === undefined) {
    return;
  }
  const parameters = callResult.selectedSignature.member.parameters;
  for (let index = 0; index < parameters.length; index++) {
    const parameter = parameters[index];
    const argument = arguments_[index];
    if (parameter === undefined || argument === undefined) {
      continue;
    }
    const result = extensionHost.runObservation(
      ExtensionObservationPoint.resolveParameterPassing,
      {
        parameter,
        argument,
        parameterIndex: index,
        targetParameter: parameter,
        ...(callExpression !== undefined ? { call: callExpression } : {}),
        selectedSignature: callResult.selectedSignature,
        ...(callResult.selectedSignature.sourceSignature !== undefined ? { sourceSelectedSignature: callResult.selectedSignature.sourceSignature } : {}),
        ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
      },
      () => {
        throw new Error("Extension-owned parameter mode checking unexpectedly reached core fallback.");
      },
      { requireOwner: true },
    );
    if (result.kind !== "accept") {
      continue;
    }
    extensionHost.facts.set(argument, argumentPassingFactKey, withArgumentPassingProvenance(result.value.passing, callResult.selectedSignature, parameter, index), result.evidence ?? []);
  }
}

function recordExtensionTargetTypeArgumentMapping(extensionHost: ExtensionHost, callExpression: GoPtr<Node>, callee: Node, sourceSelectedSignature: GoPtr<Signature> | undefined, sourceSelectedMethodTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined, sourceCalleeSymbol: GoPtr<Symbol>, sourceCalleeDeclaration: GoPtr<Node>, sourceReturnType: GoPtr<Type>, callResult: CheckedCallMappingResult, arguments_: readonly GoPtr<Node>[]): CheckedCallMappingResult["selectedSignature"] {
  if (extensionHost.getObservationOwner(ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget) === undefined) {
    return callResult.selectedSignature;
  }

  const result = extensionHost.runObservation(
    ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget,
    {
      ...(callExpression !== undefined ? { call: callExpression } : {}),
      declaration: callee,
      arguments: definedFactSubjects(arguments_),
      ...(sourceSelectedSignature !== undefined ? { sourceSelectedSignature } : {}),
      ...(sourceSelectedSignature?.declaration !== undefined ? { sourceSelectedDeclaration: sourceSelectedSignature.declaration } : {}),
      ...(sourceSelectedMethodTypeArguments !== undefined ? { sourceSelectedMethodTypeArguments } : {}),
      ...(sourceCalleeSymbol !== undefined ? { sourceCalleeSymbol } : {}),
      ...(sourceCalleeDeclaration !== undefined ? { sourceCalleeDeclaration } : {}),
      ...(sourceReturnType !== undefined ? { sourceReturnType } : {}),
      ...(callResult.returnType !== undefined ? { contextualType: callResult.returnType } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => ({
      targetTypeArguments: [],
    }),
    { requireOwner: true },
  );
  if (result.kind !== "accept") {
    return callResult.selectedSignature;
  }
  return {
    ...callResult.selectedSignature,
    targetTypeArguments: result.value.targetTypeArguments,
  };
}

function recordExtensionCallArgumentConversions(extensionHost: ExtensionHost, callExpression: GoPtr<Node>, callResult: CheckedCallMappingResult, arguments_: readonly GoPtr<Node>[]): void {
  if (extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedConversion) === undefined) {
    return;
  }
  const parameters = callResult.selectedSignature.member.parameters;
  for (let index = 0; index < parameters.length; index++) {
    const parameter = parameters[index];
    const argument = arguments_[index];
    if (parameter === undefined || argument === undefined) {
      continue;
    }
    const result = extensionHost.runObservation(
      ExtensionObservationPoint.mapCheckedConversion,
      {
        expression: argument,
        source: argument,
        target: parameter.type,
        ...(callExpression !== undefined ? { call: callExpression } : {}),
        parameterIndex: index,
        targetParameter: parameter,
        ...(callResult.selectedSignature.sourceSignature !== undefined ? { sourceSelectedSignature: callResult.selectedSignature.sourceSignature } : {}),
        selectedSignature: callResult.selectedSignature,
        ...(extensionHost.activeTarget !== undefined ? { targetPlatform: extensionHost.activeTarget } : {}),
      },
      () => {
        throw new Error("Extension-owned conversion resolution unexpectedly reached core fallback.");
      },
      { requireOwner: true },
    );
    if (result.kind !== "accept" || (result.value.convertedType === undefined && result.value.operation === undefined)) {
      continue;
    }
    extensionHost.facts.set(argument, targetConversionFactKey, {
      ...(result.value.convertedType !== undefined ? { convertedType: result.value.convertedType } : {}),
      ...(result.value.operation !== undefined ? { operation: result.value.operation } : {}),
    }, result.evidence ?? []);
  }
}

function definedFactSubjects<T extends object>(subjects: readonly (T | undefined)[]): readonly ExtensionFactSubject[] {
  return subjects.filter((subject): subject is T => subject !== undefined);
}

function selectedSourceSymbol(checker: GoPtr<Checker>, symbol: GoPtr<Symbol>): GoPtr<Symbol> {
  return symbol === undefined || symbol === checker?.unknownSymbol ? undefined : symbol;
}

function primarySymbolDeclaration(symbol: GoPtr<Symbol>): GoPtr<Node> {
  return symbol?.ValueDeclaration ?? symbol?.Declarations?.find((candidate) => candidate !== undefined);
}

interface SelectedSourceCallProvenance {
  readonly sourceSelectedSignature: GoPtr<Signature>;
  readonly sourceSelectedMethodTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
  readonly sourceCalleeSymbol: GoPtr<Symbol>;
  readonly sourceCalleeDeclaration: GoPtr<Node>;
  readonly sourceReturnType: GoPtr<Type>;
}

function withSelectedTargetSignatureProvenance(signature: SelectedTargetSignatureFact, provenance: SelectedSourceCallProvenance): SelectedTargetSignatureFact {
  const sourceSelectedSignature = provenance.sourceSelectedSignature;
  const sourceSelectedMethodTypeArguments = provenance.sourceSelectedMethodTypeArguments;
  return {
    ...signature,
    ...(signature.sourceSelectedMethodTypeArguments !== undefined || sourceSelectedMethodTypeArguments === undefined ? {} : { sourceSelectedMethodTypeArguments }),
    ...(signature.sourceSignature !== undefined || sourceSelectedSignature === undefined ? {} : { sourceSignature: sourceSelectedSignature }),
    ...(signature.sourceDeclaration !== undefined || sourceSelectedSignature?.declaration === undefined ? {} : { sourceDeclaration: sourceSelectedSignature.declaration }),
    ...(signature.sourceCalleeSymbol !== undefined || provenance.sourceCalleeSymbol === undefined ? {} : { sourceCalleeSymbol: provenance.sourceCalleeSymbol }),
    ...(signature.sourceCalleeDeclaration !== undefined || provenance.sourceCalleeDeclaration === undefined ? {} : { sourceCalleeDeclaration: provenance.sourceCalleeDeclaration }),
    ...(signature.sourceReturnType !== undefined || provenance.sourceReturnType === undefined ? {} : { sourceReturnType: provenance.sourceReturnType }),
    ...(signature.providerDeclaration !== undefined || signature.member.providerDeclaration === undefined ? {} : { providerDeclaration: signature.member.providerDeclaration }),
  };
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

function withTargetOperationProvenance(operation: TargetOperationFact, provenance: TargetOperationProvenance): TargetOperationFact {
  return {
    ...operation,
    provenance: {
      ...(operation.provenance !== undefined ? operation.provenance : {}),
      ...provenance,
    },
  };
}

function preserveEquivalentCheckedSourceResultType(
  checker: GoPtr<Checker>,
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
  return checkedSourceResultTypesEquivalent(checker, existingSourceResultType, incomingSourceResultType)
    ? withExistingSourceResultType
    : incoming;
}

function checkedSourceResultTypesEquivalent(checker: GoPtr<Checker>, left: GoPtr<Type>, right: GoPtr<Type>): boolean {
  if (Checker_isTypeIdenticalTo(checker, left, right)) {
    return true;
  }
  if ((Type_Flags(left) & TypeFlagsUniqueESSymbol) === 0 || (Type_Flags(right) & TypeFlagsUniqueESSymbol) === 0) {
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

function withCheckedOperationResultType(operation: TargetOperationFact, resultType: TargetTypeRef | undefined): TargetOperationFact {
  if (operation.resultType !== undefined || resultType === undefined) {
    return operation;
  }
  return {
    ...operation,
    resultType,
  };
}

function withArgumentPassingProvenance(passing: ArgumentPassingFact, selectedSignature: SelectedTargetSignatureFact, parameter: TargetParameter, parameterIndex: number): ArgumentPassingFact {
  return {
    ...passing,
    parameterIndex: passing.parameterIndex ?? parameterIndex,
    ...(passing.targetParameter !== undefined ? {} : { targetParameter: parameter }),
    ...(passing.selectedSignature !== undefined ? {} : selectedSignature.providerDeclaration !== undefined
      ? { selectedSignature: selectedSignature.providerDeclaration }
      : selectedSignature.member.providerDeclaration !== undefined
        ? { selectedSignature: selectedSignature.member.providerDeclaration }
        : {}),
  };
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
    || extensionHost.facts.get(subject, flowStateFactKey) !== undefined
    || extensionHost.facts.get(subject, runtimeCarrierFactKey) !== undefined;
}

function setFactOnOptionalSubject<T>(extensionHost: ExtensionHost, subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>, value: T, evidence: readonly ExtensionEvidence[]): void {
  if (subject !== undefined) {
    extensionHost.facts.set(subject, key, value, evidence);
  }
}
