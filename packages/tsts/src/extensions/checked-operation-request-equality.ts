import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperationObservationPointName,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionObservationRequest,
} from "./observations.js";
import { ExtensionObservationPoint } from "./observations.js";
import { selectedTargetSignatureEquals, targetParameterEquals, targetTypeRefEquals } from "./facts.js";
import type { SelectedSourceTypeEvidence, SelectedSourceValueEvidence, SourceSelectedCallArgumentBinding, SourceSelectedMethodTypeArgument, SourceSelectedSignatureParameter } from "./facts.js";

type AllFieldsCompared<T, TCompared extends keyof T> = Exclude<keyof T, TCompared> extends never ? true : false;
type RequireAllTrue<T extends readonly true[]> = T;
type CallField = "call"
  | "callee"
  | "arguments"
  | "callKind"
  | "sourceSelectedSignature"
  | "sourceSelectedDeclaration"
  | "sourceSelectedMethodTypeArguments"
  | "sourceSelectedSignatureParameters"
  | "sourceSelectedSignatureKind"
  | "sourceArgumentBindings"
  | "sourceCallee"
  | "sourceArguments"
  | "sourceResult"
  | "sourceReceiver"
  | "optionalChain"
  | "target";
type PropertyField = "expression"
  | "receiver"
  | "propertyName"
  | "accessMode"
  | "callCallee"
  | "sourceReceiver"
  | "sourceResult"
  | "optionalChain"
  | "target";
type ElementField = "expression"
  | "receiver"
  | "argument"
  | "accessMode"
  | "callCallee"
  | "sourceReceiver"
  | "sourceArgument"
  | "sourceResult"
  | "sourceSelectedElementIndex"
  | "optionalChain"
  | "target";
type OperatorField = "expression" | "operator" | "left" | "right" | "sourceLeft" | "sourceRight" | "sourceResult" | "target";
type IterationField = "statement" | "expression" | "initializer" | "kind" | "sourceIterable" | "sourceElement" | "target";
type ConversionField = "conversionKind"
  | "expression"
  | "source"
  | "target"
  | "targetPlatform"
  | "call"
  | "slot"
  | "sourceArgumentIndex"
  | "targetParameterIndex"
  | "sourceForm"
  | "spreadElementIndex"
  | "targetForm"
  | "targetParameter"
  | "sourceSelectedSignature"
  | "selectedSignature"
  | "sourceBinding"
  | "assertionKind"
  | "explicitTargetTypeNode";

export type CheckedOperationRequestFieldCoverage = RequireAllTrue<[
  AllFieldsCompared<CheckedCallMappingRequest, CallField>,
  AllFieldsCompared<CheckedPropertyAccessMappingRequest, PropertyField>,
  AllFieldsCompared<CheckedElementAccessMappingRequest, ElementField>,
  AllFieldsCompared<CheckedOperatorMappingRequest, OperatorField>,
  AllFieldsCompared<CheckedIterationMappingRequest, IterationField>,
  AllFieldsCompared<CheckedConversionMappingRequest, ConversionField>,
]>;

export function checkedOperationRequestEquals<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  left: ExtensionObservationRequest<TObservation>,
  right: ExtensionObservationRequest<TObservation>,
): boolean {
  return differingCheckedOperationRequestFields(observation, left, right).length === 0;
}

export function differingCheckedOperationRequestFields<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  left: ExtensionObservationRequest<TObservation>,
  right: ExtensionObservationRequest<TObservation>,
): readonly string[] {
  const differences: string[] = [];
  switch (observation) {
    case ExtensionObservationPoint.mapCheckedCall:
      compareCallRequests(left as CheckedCallMappingRequest, right as CheckedCallMappingRequest, differences);
      break;
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
      comparePropertyRequests(left as CheckedPropertyAccessMappingRequest, right as CheckedPropertyAccessMappingRequest, differences);
      break;
    case ExtensionObservationPoint.mapCheckedElementAccess:
      compareElementRequests(left as CheckedElementAccessMappingRequest, right as CheckedElementAccessMappingRequest, differences);
      break;
    case ExtensionObservationPoint.mapCheckedOperator:
      compareOperatorRequests(left as CheckedOperatorMappingRequest, right as CheckedOperatorMappingRequest, differences);
      break;
    case ExtensionObservationPoint.mapCheckedIteration:
      compareIterationRequests(left as CheckedIterationMappingRequest, right as CheckedIterationMappingRequest, differences);
      break;
    case ExtensionObservationPoint.mapCheckedConversion:
      compareConversionRequests(left as CheckedConversionMappingRequest, right as CheckedConversionMappingRequest, differences);
      break;
  }
  return Object.freeze(differences);
}

function compareCallRequests(left: CheckedCallMappingRequest, right: CheckedCallMappingRequest, differences: string[]): void {
  compareIdentity(differences, "call", left.call, right.call);
  compareIdentity(differences, "callee", left.callee, right.callee);
  compareArray(differences, "arguments", left.arguments, right.arguments, Object.is);
  compareIdentity(differences, "callKind", left.callKind, right.callKind);
  compareIdentity(differences, "sourceSelectedSignature", left.sourceSelectedSignature, right.sourceSelectedSignature);
  compareIdentity(differences, "sourceSelectedDeclaration", left.sourceSelectedDeclaration, right.sourceSelectedDeclaration);
  compareArray(differences, "sourceSelectedMethodTypeArguments", left.sourceSelectedMethodTypeArguments, right.sourceSelectedMethodTypeArguments, selectedMethodTypeArgumentEquals);
  compareArray(differences, "sourceSelectedSignatureParameters", left.sourceSelectedSignatureParameters, right.sourceSelectedSignatureParameters, selectedSignatureParameterEquals);
  compareIdentity(differences, "sourceSelectedSignatureKind", left.sourceSelectedSignatureKind, right.sourceSelectedSignatureKind);
  compareArray(differences, "sourceArgumentBindings", left.sourceArgumentBindings, right.sourceArgumentBindings, selectedCallArgumentBindingEquals);
  compareSelectedSourceValueEvidence(differences, "sourceCallee", left.sourceCallee, right.sourceCallee);
  compareArray(differences, "sourceArguments", left.sourceArguments, right.sourceArguments, selectedSourceValueEvidenceEquals);
  compareSelectedSourceValueEvidence(differences, "sourceResult", left.sourceResult, right.sourceResult);
  compareOptionalSelectedSourceValueEvidence(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
}

function comparePropertyRequests(left: CheckedPropertyAccessMappingRequest, right: CheckedPropertyAccessMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "receiver", left.receiver, right.receiver);
  compareIdentity(differences, "propertyName", left.propertyName, right.propertyName);
  compareIdentity(differences, "accessMode", left.accessMode, right.accessMode);
  compareIdentity(differences, "callCallee", left.callCallee, right.callCallee);
  compareSelectedSourceValueEvidence(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareSelectedSourceValueEvidence(differences, "sourceResult", left.sourceResult, right.sourceResult);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareElementRequests(left: CheckedElementAccessMappingRequest, right: CheckedElementAccessMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "receiver", left.receiver, right.receiver);
  compareIdentity(differences, "argument", left.argument, right.argument);
  compareIdentity(differences, "accessMode", left.accessMode, right.accessMode);
  compareIdentity(differences, "callCallee", left.callCallee, right.callCallee);
  compareSelectedSourceValueEvidence(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareSelectedSourceValueEvidence(differences, "sourceArgument", left.sourceArgument, right.sourceArgument);
  compareSelectedSourceValueEvidence(differences, "sourceResult", left.sourceResult, right.sourceResult);
  compareIdentity(differences, "sourceSelectedElementIndex", left.sourceSelectedElementIndex, right.sourceSelectedElementIndex);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareOperatorRequests(left: CheckedOperatorMappingRequest, right: CheckedOperatorMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "operator", left.operator, right.operator);
  compareIdentity(differences, "left", left.left, right.left);
  compareIdentity(differences, "right", left.right, right.right);
  compareOptionalSelectedSourceValueEvidence(differences, "sourceLeft", left.sourceLeft, right.sourceLeft);
  compareOptionalSelectedSourceValueEvidence(differences, "sourceRight", left.sourceRight, right.sourceRight);
  compareSelectedSourceValueEvidence(differences, "sourceResult", left.sourceResult, right.sourceResult);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareIterationRequests(left: CheckedIterationMappingRequest, right: CheckedIterationMappingRequest, differences: string[]): void {
  compareIdentity(differences, "statement", left.statement, right.statement);
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "initializer", left.initializer, right.initializer);
  compareIdentity(differences, "kind", left.kind, right.kind);
  compareSelectedSourceValueEvidence(differences, "sourceIterable", left.sourceIterable, right.sourceIterable);
  compareSelectedSourceTypeEvidence(differences, "sourceElement", left.sourceElement, right.sourceElement);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareConversionRequests(left: CheckedConversionMappingRequest, right: CheckedConversionMappingRequest, differences: string[]): void {
  compareIdentity(differences, "conversionKind", left.conversionKind, right.conversionKind);
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareSelectedSourceValueEvidence(differences, "source", left.source, right.source);
  compareIdentity(differences, "targetPlatform", left.targetPlatform, right.targetPlatform);
  if (left.conversionKind === "call-argument" && right.conversionKind === "call-argument") {
    compareValue(differences, "target", left.target, right.target, targetTypeRefEquals);
    compareIdentity(differences, "call", left.call, right.call);
    compareIdentity(differences, "slot", left.slot, right.slot);
    compareIdentity(differences, "sourceArgumentIndex", left.sourceArgumentIndex, right.sourceArgumentIndex);
    compareIdentity(differences, "targetParameterIndex", left.targetParameterIndex, right.targetParameterIndex);
    compareIdentity(differences, "sourceForm", left.sourceForm, right.sourceForm);
    compareIdentity(differences, "spreadElementIndex", left.spreadElementIndex, right.spreadElementIndex);
    compareIdentity(differences, "targetForm", left.targetForm, right.targetForm);
    compareValue(differences, "targetParameter", left.targetParameter, right.targetParameter, targetParameterEquals);
    compareIdentity(differences, "sourceSelectedSignature", left.sourceSelectedSignature, right.sourceSelectedSignature);
    compareValue(differences, "selectedSignature", left.selectedSignature, right.selectedSignature, selectedTargetSignatureEquals);
    compareValue(differences, "sourceBinding", left.sourceBinding, right.sourceBinding, selectedCallArgumentBindingEquals);
    return;
  }
  if (left.conversionKind === "assertion" && right.conversionKind === "assertion") {
    compareSelectedSourceTypeEvidence(differences, "target", left.target, right.target);
    compareIdentity(differences, "assertionKind", left.assertionKind, right.assertionKind);
    compareIdentity(differences, "explicitTargetTypeNode", left.explicitTargetTypeNode, right.explicitTargetTypeNode);
  }
}

function compareSelectedSourceTypeEvidence(
  differences: string[],
  field: string,
  left: SelectedSourceTypeEvidence,
  right: SelectedSourceTypeEvidence,
): void {
  if (!selectedSourceTypeEvidenceEquals(left, right)) {
    differences.push(field);
  }
}

function compareSelectedSourceValueEvidence(
  differences: string[],
  field: string,
  left: SelectedSourceValueEvidence,
  right: SelectedSourceValueEvidence,
): void {
  if (!selectedSourceValueEvidenceEquals(left, right)) {
    differences.push(field);
  }
}

function compareOptionalSelectedSourceValueEvidence(
  differences: string[],
  field: string,
  left: SelectedSourceValueEvidence | undefined,
  right: SelectedSourceValueEvidence | undefined,
): void {
  compareOptionalValue(differences, field, left, right, selectedSourceValueEvidenceEquals);
}

function selectedSourceTypeEvidenceEquals(left: SelectedSourceTypeEvidence, right: SelectedSourceTypeEvidence): boolean {
  return left.type === right.type
    && left.symbol === right.symbol
    && left.declaration === right.declaration
    && left.selectedSymbol === right.selectedSymbol
    && left.selectedDeclaration === right.selectedDeclaration
    && left.authoredTypeNode === right.authoredTypeNode;
}

function selectedSourceValueEvidenceEquals(left: SelectedSourceValueEvidence, right: SelectedSourceValueEvidence): boolean {
  return left.expression === right.expression && selectedSourceTypeEvidenceEquals(left, right);
}

function compareIdentity(differences: string[], field: string, left: unknown, right: unknown): void {
  if (!Object.is(left, right)) {
    differences.push(field);
  }
}

function compareValue<T>(differences: string[], field: string, left: T, right: T, equals: (left: T, right: T) => boolean): void {
  if (!equals(left, right)) {
    differences.push(field);
  }
}

function compareOptionalValue<T>(
  differences: string[],
  field: string,
  left: T | undefined,
  right: T | undefined,
  equals: (left: T, right: T) => boolean,
): void {
  if (left === undefined || right === undefined) {
    if (left !== right) {
      differences.push(field);
    }
    return;
  }
  compareValue(differences, field, left, right, equals);
}

function compareArray<T>(
  differences: string[],
  field: string,
  left: readonly T[] | undefined,
  right: readonly T[] | undefined,
  equals: (left: T, right: T) => boolean,
): void {
  if (!optionalArrayEquals(left, right, equals)) {
    differences.push(field);
  }
}

function optionalArrayEquals<T>(left: readonly T[] | undefined, right: readonly T[] | undefined, equals: (left: T, right: T) => boolean): boolean {
  if (left === right) {
    return true;
  }
  if (left === undefined || right === undefined || left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; index++) {
    const leftValue = left[index];
    const rightValue = right[index];
    if (leftValue === undefined || rightValue === undefined || !equals(leftValue, rightValue)) {
      return false;
    }
  }
  return true;
}

function selectedMethodTypeArgumentEquals(left: SourceSelectedMethodTypeArgument, right: SourceSelectedMethodTypeArgument): boolean {
  return left.typeParameterName === right.typeParameterName
    && left.typeParameter === right.typeParameter
    && left.selectedType === right.selectedType
    && left.explicitTypeNode === right.explicitTypeNode;
}

function selectedSignatureParameterEquals(left: SourceSelectedSignatureParameter, right: SourceSelectedSignatureParameter): boolean {
  return left.parameterIndex === right.parameterIndex
    && left.parameterName === right.parameterName
    && left.parameterSymbol === right.parameterSymbol
    && left.parameterDeclaration === right.parameterDeclaration
    && left.selectedType === right.selectedType
    && left.authoredTypeNode === right.authoredTypeNode
    && left.acceptsOmission === right.acceptsOmission
    && left.rest === right.rest;
}

function selectedCallArgumentBindingEquals(left: SourceSelectedCallArgumentBinding, right: SourceSelectedCallArgumentBinding): boolean {
  return left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.effectiveArgumentIndex === right.effectiveArgumentIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.sourceParameterIndex === right.sourceParameterIndex
    && left.sourceParameterForm === right.sourceParameterForm
    && left.selectedArgumentType === right.selectedArgumentType
    && left.selectedParameterType === right.selectedParameterType;
}
