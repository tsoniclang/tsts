import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperationObservationPointName,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionObservationRequest,
  SelectedSourceReceiverEvidence,
} from "./observations.js";
import { ExtensionObservationPoint } from "./observations.js";
import { selectedTargetSignatureEquals, targetParameterEquals, targetTypeRefEquals } from "./facts.js";
import type { SourceSelectedMethodTypeArgument, SourceSelectedSignatureParameter } from "./facts.js";

type AllFieldsCompared<T, TCompared extends keyof T> = Exclude<keyof T, TCompared> extends never ? true : false;
type RequireAllTrue<T extends readonly true[]> = T;
type ReceiverEvidenceField = keyof SelectedSourceReceiverEvidence;
type CallField = ReceiverEvidenceField
  | "call"
  | "callee"
  | "arguments"
  | "sourceSelectedSignature"
  | "sourceSelectedDeclaration"
  | "sourceSelectedMethodTypeArguments"
  | "sourceSelectedSignatureParameters"
  | "sourceSelectedSignatureKind"
  | "sourceCalleeSymbol"
  | "sourceCalleeDeclaration"
  | "sourceSelectedCalleeSymbol"
  | "sourceSelectedCalleeDeclaration"
  | "sourceReturnType"
  | "optionalChain"
  | "target";
type PropertyField = ReceiverEvidenceField
  | "expression"
  | "receiver"
  | "propertyName"
  | "sourceSelectedSymbol"
  | "sourceSelectedDeclaration"
  | "sourceResultType"
  | "optionalChain"
  | "target";
type ElementField = ReceiverEvidenceField
  | "expression"
  | "receiver"
  | "argument"
  | "sourceSelectedSymbol"
  | "sourceSelectedDeclaration"
  | "sourceSelectedElementIndex"
  | "sourceResultType"
  | "optionalChain"
  | "target";
type OperatorField = "expression" | "operator" | "left" | "right" | "sourceResultType" | "target";
type IterationField = "statement" | "expression" | "initializer" | "kind" | "sourceElementType" | "target";
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
  | "assertionKind"
  | "sourceExpression"
  | "sourceSelectedSymbol"
  | "sourceSelectedDeclaration"
  | "sourceSelectedDeclarationTypeNode"
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
  compareIdentity(differences, "sourceSelectedSignature", left.sourceSelectedSignature, right.sourceSelectedSignature);
  compareIdentity(differences, "sourceSelectedDeclaration", left.sourceSelectedDeclaration, right.sourceSelectedDeclaration);
  compareArray(differences, "sourceSelectedMethodTypeArguments", left.sourceSelectedMethodTypeArguments, right.sourceSelectedMethodTypeArguments, selectedMethodTypeArgumentEquals);
  compareArray(differences, "sourceSelectedSignatureParameters", left.sourceSelectedSignatureParameters, right.sourceSelectedSignatureParameters, selectedSignatureParameterEquals);
  compareIdentity(differences, "sourceSelectedSignatureKind", left.sourceSelectedSignatureKind, right.sourceSelectedSignatureKind);
  compareIdentity(differences, "sourceCalleeSymbol", left.sourceCalleeSymbol, right.sourceCalleeSymbol);
  compareIdentity(differences, "sourceCalleeDeclaration", left.sourceCalleeDeclaration, right.sourceCalleeDeclaration);
  compareIdentity(differences, "sourceSelectedCalleeSymbol", left.sourceSelectedCalleeSymbol, right.sourceSelectedCalleeSymbol);
  compareIdentity(differences, "sourceSelectedCalleeDeclaration", left.sourceSelectedCalleeDeclaration, right.sourceSelectedCalleeDeclaration);
  compareIdentity(differences, "sourceReturnType", left.sourceReturnType, right.sourceReturnType);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
  compareReceiverEvidence(left, right, differences);
}

function comparePropertyRequests(left: CheckedPropertyAccessMappingRequest, right: CheckedPropertyAccessMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "receiver", left.receiver, right.receiver);
  compareIdentity(differences, "propertyName", left.propertyName, right.propertyName);
  compareIdentity(differences, "sourceSelectedSymbol", left.sourceSelectedSymbol, right.sourceSelectedSymbol);
  compareIdentity(differences, "sourceSelectedDeclaration", left.sourceSelectedDeclaration, right.sourceSelectedDeclaration);
  compareIdentity(differences, "sourceResultType", left.sourceResultType, right.sourceResultType);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
  compareReceiverEvidence(left, right, differences);
}

function compareElementRequests(left: CheckedElementAccessMappingRequest, right: CheckedElementAccessMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "receiver", left.receiver, right.receiver);
  compareIdentity(differences, "argument", left.argument, right.argument);
  compareIdentity(differences, "sourceSelectedSymbol", left.sourceSelectedSymbol, right.sourceSelectedSymbol);
  compareIdentity(differences, "sourceSelectedDeclaration", left.sourceSelectedDeclaration, right.sourceSelectedDeclaration);
  compareIdentity(differences, "sourceSelectedElementIndex", left.sourceSelectedElementIndex, right.sourceSelectedElementIndex);
  compareIdentity(differences, "sourceResultType", left.sourceResultType, right.sourceResultType);
  compareIdentity(differences, "optionalChain", left.optionalChain, right.optionalChain);
  compareIdentity(differences, "target", left.target, right.target);
  compareReceiverEvidence(left, right, differences);
}

function compareOperatorRequests(left: CheckedOperatorMappingRequest, right: CheckedOperatorMappingRequest, differences: string[]): void {
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "operator", left.operator, right.operator);
  compareIdentity(differences, "left", left.left, right.left);
  compareIdentity(differences, "right", left.right, right.right);
  compareIdentity(differences, "sourceResultType", left.sourceResultType, right.sourceResultType);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareIterationRequests(left: CheckedIterationMappingRequest, right: CheckedIterationMappingRequest, differences: string[]): void {
  compareIdentity(differences, "statement", left.statement, right.statement);
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "initializer", left.initializer, right.initializer);
  compareIdentity(differences, "kind", left.kind, right.kind);
  compareIdentity(differences, "sourceElementType", left.sourceElementType, right.sourceElementType);
  compareIdentity(differences, "target", left.target, right.target);
}

function compareConversionRequests(left: CheckedConversionMappingRequest, right: CheckedConversionMappingRequest, differences: string[]): void {
  compareIdentity(differences, "conversionKind", left.conversionKind, right.conversionKind);
  compareIdentity(differences, "expression", left.expression, right.expression);
  compareIdentity(differences, "source", left.source, right.source);
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
    return;
  }
  if (left.conversionKind === "assertion" && right.conversionKind === "assertion") {
    compareIdentity(differences, "target", left.target, right.target);
    compareIdentity(differences, "assertionKind", left.assertionKind, right.assertionKind);
    compareIdentity(differences, "sourceExpression", left.sourceExpression, right.sourceExpression);
    compareIdentity(differences, "sourceSelectedSymbol", left.sourceSelectedSymbol, right.sourceSelectedSymbol);
    compareIdentity(differences, "sourceSelectedDeclaration", left.sourceSelectedDeclaration, right.sourceSelectedDeclaration);
    compareIdentity(differences, "sourceSelectedDeclarationTypeNode", left.sourceSelectedDeclarationTypeNode, right.sourceSelectedDeclarationTypeNode);
    compareIdentity(differences, "explicitTargetTypeNode", left.explicitTargetTypeNode, right.explicitTargetTypeNode);
  }
}

function compareReceiverEvidence(left: SelectedSourceReceiverEvidence, right: SelectedSourceReceiverEvidence, differences: string[]): void {
  compareIdentity(differences, "sourceReceiver", left.sourceReceiver, right.sourceReceiver);
  compareIdentity(differences, "sourceReceiverType", left.sourceReceiverType, right.sourceReceiverType);
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
