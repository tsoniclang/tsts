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
import {
  checkedCallSourceOperationEquals,
  checkedConversionSourceOperationEquals,
  checkedElementAccessSourceOperationEquals,
  checkedIterationSourceOperationEquals,
  checkedOperatorSourceOperationEquals,
  checkedPropertyAccessSourceOperationEquals,
  selectedTargetSignatureEquals,
  targetParameterEquals,
  targetTypeRefEquals,
} from "./fact-value-equality.js";
import type {
  CheckedAssertionConversionSourceOperation,
  CheckedCallArgumentConversionSourceOperation,
  CheckedCallSourceOperation,
  CheckedElementAccessSourceOperation,
  CheckedIterationSourceOperation,
  CheckedOperatorSourceOperation,
  CheckedPropertyAccessSourceOperation,
} from "./facts.js";

type ExactEnvelopeFields<TRequest, TSource, TFields extends PropertyKey> =
  Exclude<keyof TRequest, keyof TSource> extends TFields
    ? Exclude<TFields, Exclude<keyof TRequest, keyof TSource>> extends never ? true : false
    : false;
type RequireAllTrue<T extends readonly true[]> = T;
type AssertionConversionRequest = Extract<CheckedConversionMappingRequest, { readonly conversionKind: "assertion" }>;
type CallArgumentConversionRequest = Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }>;

export type CheckedOperationRequestFieldCoverage = RequireAllTrue<[
  ExactEnvelopeFields<CheckedCallMappingRequest, CheckedCallSourceOperation, "target">,
  ExactEnvelopeFields<CheckedPropertyAccessMappingRequest, CheckedPropertyAccessSourceOperation, "target">,
  ExactEnvelopeFields<CheckedElementAccessMappingRequest, CheckedElementAccessSourceOperation, "target">,
  ExactEnvelopeFields<CheckedOperatorMappingRequest, CheckedOperatorSourceOperation, "target">,
  ExactEnvelopeFields<CheckedIterationMappingRequest, CheckedIterationSourceOperation, "target">,
  ExactEnvelopeFields<
    AssertionConversionRequest,
    CheckedAssertionConversionSourceOperation,
    "targetPlatform" | "targetParameter" | "selectedSignature"
  >,
  ExactEnvelopeFields<
    CallArgumentConversionRequest,
    CheckedCallArgumentConversionSourceOperation,
    "targetPlatform" | "target" | "targetParameter" | "selectedSignature"
  >,
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
      compareSourceOperation(
        differences,
        checkedCallSourceOperationEquals(
          left as CheckedCallMappingRequest,
          right as CheckedCallMappingRequest,
        ),
      );
      compareIdentity(differences, "target", (left as CheckedCallMappingRequest).target, (right as CheckedCallMappingRequest).target);
      break;
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
      compareSourceOperation(
        differences,
        checkedPropertyAccessSourceOperationEquals(
          left as CheckedPropertyAccessMappingRequest,
          right as CheckedPropertyAccessMappingRequest,
        ),
      );
      compareIdentity(differences, "target", (left as CheckedPropertyAccessMappingRequest).target, (right as CheckedPropertyAccessMappingRequest).target);
      break;
    case ExtensionObservationPoint.mapCheckedElementAccess:
      compareSourceOperation(
        differences,
        checkedElementAccessSourceOperationEquals(
          left as CheckedElementAccessMappingRequest,
          right as CheckedElementAccessMappingRequest,
        ),
      );
      compareIdentity(differences, "target", (left as CheckedElementAccessMappingRequest).target, (right as CheckedElementAccessMappingRequest).target);
      break;
    case ExtensionObservationPoint.mapCheckedOperator:
      compareSourceOperation(
        differences,
        checkedOperatorSourceOperationEquals(
          left as CheckedOperatorMappingRequest,
          right as CheckedOperatorMappingRequest,
        ),
      );
      compareIdentity(differences, "target", (left as CheckedOperatorMappingRequest).target, (right as CheckedOperatorMappingRequest).target);
      break;
    case ExtensionObservationPoint.mapCheckedIteration:
      compareSourceOperation(
        differences,
        checkedIterationSourceOperationEquals(
          left as CheckedIterationMappingRequest,
          right as CheckedIterationMappingRequest,
        ),
      );
      compareIdentity(differences, "target", (left as CheckedIterationMappingRequest).target, (right as CheckedIterationMappingRequest).target);
      break;
    case ExtensionObservationPoint.mapCheckedConversion:
      compareConversionRequests(
        left as CheckedConversionMappingRequest,
        right as CheckedConversionMappingRequest,
        differences,
      );
      break;
  }
  return Object.freeze(differences);
}

function compareConversionRequests(
  left: CheckedConversionMappingRequest,
  right: CheckedConversionMappingRequest,
  differences: string[],
): void {
  compareSourceOperation(differences, checkedConversionSourceOperationEquals(left, right));
  compareIdentity(differences, "targetPlatform", left.targetPlatform, right.targetPlatform);
  if (left.conversionKind !== "call-argument" || right.conversionKind !== "call-argument") {
    return;
  }
  compareValue(differences, "target", left.target, right.target, targetTypeRefEquals);
  compareValue(differences, "targetParameter", left.targetParameter, right.targetParameter, targetParameterEquals);
  compareValue(differences, "selectedSignature", left.selectedSignature, right.selectedSignature, selectedTargetSignatureEquals);
}

function compareSourceOperation(differences: string[], equal: boolean): void {
  if (!equal) {
    differences.push("sourceOperation");
  }
}

function compareIdentity(differences: string[], field: string, left: unknown, right: unknown): void {
  if (!Object.is(left, right)) {
    differences.push(field);
  }
}

function compareValue<T>(
  differences: string[],
  field: string,
  left: T,
  right: T,
  equals: (left: T, right: T) => boolean,
): void {
  if (!equals(left, right)) {
    differences.push(field);
  }
}
