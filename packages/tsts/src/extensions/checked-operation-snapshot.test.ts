import { test } from "node:test";
import assert from "node:assert/strict";
import { CheckedOperationInventory } from "./checked-operation-finalization.js";
import {
  createCheckedOperationRequestSnapshotCache,
  snapshotCheckedOperationRequest,
  snapshotCheckedOperationResponse,
  snapshotCheckedOperationResult,
} from "./checked-operation-value-snapshot.js";
import { ExtensionObservationPoint } from "./observations.js";
import type {
  CheckedCallMappingRequest,
  CheckedCallMappingResult,
  CheckedConversionMappingRequest,
  CheckedConversionMappingResult,
  CheckedElementAccessMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionObservationResult,
} from "./observations.js";
import type {
  ExtensionEvidence,
  SelectedTargetSignatureFact,
  TargetCallArgumentConversionSlot,
  TargetOperationFact,
  TargetParameter,
  TargetSignatureSelection,
  TargetTypeRef,
} from "./index.js";

test("retained call-argument conversion requests snapshot target values and preserve source subjects", () => {
  const expression = {};
  const source = {};
  const call = {};
  const callee = {};
  const sourceSignature = {};
  const selectedType = {};
  const parameterSymbol = {};
  const opaqueValue = { targetOwned: true };
  const targetTypeArguments: TargetTypeRef[] = [{ kind: "source-primitive", name: "int32" }];
  const targetParameter = {
    name: "value",
    type: { kind: "target-specific" as const, target: "acme", name: "payload", value: opaqueValue },
    passingMode: "by-value" as const,
  };
  const memberParameters: TargetParameter[] = [targetParameter];
  const sourceParameter = {
    parameterIndex: 0,
    parameterName: "value",
    parameterSymbol,
    selectedType,
    acceptsOmission: false,
    rest: false,
  };
  const slot = argumentConversionSlot(0, 0);
  const sourceBinding = {
    sourceArgumentIndex: 0,
    effectiveArgumentIndex: 0,
    sourceForm: "value" as const,
    sourceParameterIndex: 0,
    sourceParameterForm: "parameter" as const,
    selectedArgumentType: source,
    selectedParameterType: selectedType,
  };
  const selectedSignature = {
    member: {
      id: "acme.consume",
      sourceName: "consume",
      targetName: "consume",
      kind: "method" as const,
      parameters: memberParameters,
      typeParameters: [{ name: "T" }],
    },
    argumentConversions: [slot],
    sourceArgumentBindings: [sourceBinding],
    targetTypeArguments,
    sourceSelectedMethodTypeArguments: [{
      typeParameterName: "T",
      selectedType,
    }],
    sourceSelectedSignatureParameters: [sourceParameter],
    sourceCallKind: "call" as const,
    sourceSignature,
    sourceCallee: sourceValue(callee, {}),
    sourceArguments: [sourceValue(expression, source)],
    sourceResult: sourceValue(call, {}),
  };
  const request: CheckedConversionMappingRequest = {
    conversionKind: "call-argument",
    expression,
    source: sourceValue(expression, source),
    target: targetParameter.type,
    call,
    slot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter,
    sourceSelectedSignature: sourceSignature,
    selectedSignature,
    sourceBinding,
    targetPlatform: "acme",
  };
  const inventory = createInventory();
  let finalRequest: CheckedConversionMappingRequest | undefined;

  inventory.run(
    ExtensionObservationPoint.mapCheckedConversion,
    request,
    (retained, phase) => {
      if (phase === "checking") {
        return { kind: "owner-deferred", observation: ExtensionObservationPoint.mapCheckedConversion, extensionId: "acme" };
      }
      finalRequest = retained;
      return {
        kind: "accept",
        extensionId: "acme",
        value: { convertedType: { kind: "source-primitive", name: "int32" } },
      };
    },
    () => undefined,
    "checking",
  );

  targetTypeArguments.push({ kind: "source-primitive", name: "uint8" });
  memberParameters.push({
    name: "other",
    type: { kind: "target-specific", target: "acme", name: "other", value: {} },
    passingMode: "by-value",
  });
  targetParameter.name = "mutated";
  selectedSignature.sourceSelectedMethodTypeArguments[0]!.typeParameterName = "Mutated";
  inventory.finalize();

  assert.notEqual(finalRequest, request);
  assert.equal(finalRequest?.conversionKind, "call-argument");
  if (finalRequest?.conversionKind !== "call-argument") {
    throw new Error("Expected retained call-argument conversion request.");
  }
  assert.equal(finalRequest.expression, expression);
  assert.equal(finalRequest.source.expression, expression);
  assert.equal(finalRequest.source.type, source);
  assert.equal(finalRequest.call, call);
  assert.ok(
    finalRequest.slot === finalRequest.selectedSignature.argumentConversions[0],
    "A retained conversion must use the canonical slot identity from its retained selected signature.",
  );
  assert.notEqual(finalRequest.slot, slot);
  assert.equal(finalRequest.sourceArgumentIndex, 0);
  assert.equal(finalRequest.targetParameterIndex, 0);
  assert.equal(finalRequest.sourceForm, "value");
  assert.equal(finalRequest.targetForm, "parameter");
  assert.equal(finalRequest.sourceSelectedSignature, sourceSignature);
  assert.equal(finalRequest.targetParameter.name, "value");
  assert.equal(finalRequest.targetParameter, finalRequest.selectedSignature.member.parameters[0]);
  assert.equal(finalRequest.target, finalRequest.targetParameter.type);
  assert.equal(finalRequest.selectedSignature.member.parameters.length, 1);
  assert.equal(finalRequest.selectedSignature.targetTypeArguments?.length, 1);
  assert.equal(finalRequest.selectedSignature.sourceSelectedMethodTypeArguments?.[0]?.typeParameterName, "T");
  assert.equal(finalRequest.selectedSignature.sourceSelectedMethodTypeArguments?.[0]?.selectedType, selectedType);
  assert.equal(finalRequest.selectedSignature.sourceSelectedSignatureParameters?.[0]?.parameterSymbol, parameterSymbol);
  assert.equal(finalRequest.selectedSignature.sourceSignature, sourceSignature);
  assert.equal(Object.isFrozen(finalRequest), true);
  assert.equal(Object.isFrozen(finalRequest.source), true);
  assert.equal(Object.isFrozen(finalRequest.targetParameter), true);
  assert.equal(Object.isFrozen(finalRequest.targetParameter.type), true);
  assert.equal(Object.isFrozen(finalRequest.selectedSignature), true);
  assert.equal(Object.isFrozen(finalRequest.selectedSignature.member), true);
  assert.equal(Object.isFrozen(finalRequest.selectedSignature.member.parameters), true);
  assert.equal(Object.isFrozen(finalRequest.selectedSignature.argumentConversions), true);
  assert.equal(Object.isFrozen(finalRequest.selectedSignature.targetTypeArguments), true);
  const retainedMemberType = finalRequest.selectedSignature.member.parameters[0]!.type;
  assert.equal(retainedMemberType.kind, "target-specific");
  if (retainedMemberType.kind !== "target-specific") {
    throw new Error("Expected retained target-specific type.");
  }
  assert.equal(retainedMemberType.value, opaqueValue);
  assert.equal(Object.isFrozen(retainedMemberType), true);
  assert.equal(Object.isFrozen(opaqueValue), false);
});

test("retained selected-signature results are detached, deeply frozen, and idempotent", () => {
  const call = {};
  const callee = {};
  const targetTypeArguments: TargetTypeRef[] = [{ kind: "target-named", id: "Acme.Value" }];
  const parameters: TargetParameter[] = [{
    name: "value",
    type: { kind: "array" as const, element: targetTypeArguments[0]! },
    passingMode: "by-value" as const,
  }];
  const selectedSignature: TargetSignatureSelection = {
    member: {
      id: "acme.select",
      sourceName: "select",
      targetName: "select",
      kind: "method",
      parameters,
      typeParameters: [{ name: "T" }],
    },
    targetTypeArguments,
  };
  const response: CheckedCallMappingResult = { kind: "target", selectedSignature, argumentConversions: [] };
  const request: CheckedCallMappingRequest = {
    call,
    callee,
    arguments: [],
    callKind: "call",
    sourceCallee: sourceValue(callee, {}),
    sourceArguments: [],
    sourceResult: sourceValue(call, {}),
    target: "acme",
  };
  const inventory = createInventory();
  let applied: CheckedCallMappingResult | undefined;
  let evaluations = 0;
  let applications = 0;
  const evaluate = () => {
    evaluations += 1;
    return { kind: "accept" as const, extensionId: "acme", value: response };
  };
  const apply = (result: ExtensionObservationResult<CheckedCallMappingResult>) => {
    applications += 1;
    if (result.kind === "accept" || result.kind === "core") {
      applied = result.value;
    }
  };

  const first = inventory.run(ExtensionObservationPoint.mapCheckedCall, request, evaluate, apply, "checking");
  parameters.push({
    name: "later",
    type: { kind: "array", element: { kind: "target-named", id: "Acme.Later" } },
    passingMode: "by-value",
  });
  targetTypeArguments.push({ kind: "target-named", id: "Acme.Later" });
  const second = inventory.run(ExtensionObservationPoint.mapCheckedCall, request, evaluate, apply, "checking");

  assert.equal(evaluations, 1);
  assert.equal(applications, 1);
  assert.equal(second, first);
  assert.equal(applied?.kind, "target");
  if (applied?.kind !== "target") {
    throw new Error("Expected a retained target call mapping result.");
  }
  assert.notEqual(applied.selectedSignature, selectedSignature);
  assert.equal(applied.selectedSignature.member.parameters.length, 1);
  assert.equal(applied.selectedSignature.targetTypeArguments?.length, 1);
  assert.equal(applied.argumentConversions.length, 0);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(applied), true);
  assert.equal(Object.isFrozen(applied.selectedSignature), true);
  assert.equal(Object.isFrozen(applied.selectedSignature.member), true);
  assert.equal(Object.isFrozen(applied.selectedSignature.member.parameters), true);
  assert.equal(Object.isFrozen(applied.selectedSignature.targetTypeArguments), true);
  assert.equal(Object.isFrozen(applied.argumentConversions), true);
  assert.equal(Object.isFrozen(applied.selectedSignature.member.parameters[0]?.type), true);
});

test("retained conversion results snapshot operations, provenance, evidence, and target types", () => {
  const expression = {};
  const source = {};
  const target = {};
  const sourceExpression = {};
  const opaqueValue = { targetOwned: true };
  const tupleElements: TargetTypeRef[] = [{ kind: "target-specific", target: "acme", name: "opaque", value: opaqueValue }];
  const operationEvidence: ExtensionEvidence[] = [{ message: "selected operation", details: { opaque: true } }];
  const operation: TargetOperationFact = {
    operationId: "acme.convert",
    operationKind: "operator" as const,
    targetOperation: "convert",
    resultType: { kind: "tuple" as const, elements: tupleElements },
    evidence: operationEvidence,
    provenance: {
      sourceExpression,
      providerDeclaration: {
        providerId: "acme-provider",
        providerModuleId: "acme.module",
        moduleSpecifier: "@acme/module",
        targetIdentity: { kind: "target-specific" as const, target: "acme", name: "identity", value: opaqueValue },
      },
    },
  };
  const convertedElements: TargetTypeRef[] = [{ kind: "array", element: tupleElements[0]! }];
  const response: CheckedConversionMappingResult = {
    convertedType: { kind: "tuple", elements: convertedElements },
    operation,
  };
  const request: CheckedConversionMappingRequest = {
    conversionKind: "assertion",
    assertionKind: "as",
    expression,
    source: sourceValue(sourceExpression, source),
    target: sourceType(target),
    explicitTargetTypeNode: target,
    targetPlatform: "acme",
  };
  const inventory = createInventory();
  let applied: CheckedConversionMappingResult | undefined;

  inventory.run(
    ExtensionObservationPoint.mapCheckedConversion,
    request,
    () => ({
      kind: "accept",
      extensionId: "acme",
      value: response,
      evidence: [{ message: "accepted", details: opaqueValue }],
    }),
    (result) => {
      if (result.kind === "accept" || result.kind === "core") {
        applied = result.value;
      }
    },
    "checking",
  );

  tupleElements.push({ kind: "target-specific", target: "acme", name: "later", value: {} });
  convertedElements.push({ kind: "array", element: { kind: "target-specific", target: "acme", name: "later" } });
  operationEvidence.push({ message: "later", details: {} });

  assert.notEqual(applied, response);
  assert.equal(applied?.operation?.resultType?.kind, "tuple");
  if (applied?.operation?.resultType?.kind !== "tuple") {
    throw new Error("Expected retained operation tuple result.");
  }
  assert.equal(applied.operation.resultType.elements.length, 1);
  assert.equal(applied.operation.evidence?.length, 1);
  assert.equal(applied.operation.provenance?.sourceExpression, sourceExpression);
  assert.equal(applied.convertedType?.kind, "tuple");
  if (applied.convertedType?.kind !== "tuple") {
    throw new Error("Expected retained converted tuple type.");
  }
  assert.equal(applied.convertedType.elements.length, 1);
  assert.equal(Object.isFrozen(applied), true);
  assert.equal(Object.isFrozen(applied.operation), true);
  assert.equal(Object.isFrozen(applied.operation.resultType), true);
  assert.equal(Object.isFrozen(applied.operation.resultType.elements), true);
  assert.equal(Object.isFrozen(applied.operation.evidence), true);
  assert.equal(Object.isFrozen(applied.operation.evidence?.[0]), true);
  assert.equal(Object.isFrozen(applied.operation.provenance), true);
  assert.equal(Object.isFrozen(applied.operation.provenance?.providerDeclaration), true);
  const retainedIdentity = applied.operation.provenance?.providerDeclaration?.targetIdentity;
  assert.equal(retainedIdentity?.kind, "target-specific");
  if (retainedIdentity?.kind !== "target-specific") {
    throw new Error("Expected retained target-specific provider identity.");
  }
  assert.equal(retainedIdentity.value, opaqueValue);
  assert.equal(Object.isFrozen(retainedIdentity), true);
  assert.equal(Object.isFrozen(opaqueValue), false);
});

test("structurally equal call-argument target values remain one checked request after snapshotting", () => {
  const expression = {};
  const source = {};
  const call = {};
  const sourceSignature = {};
  const opaqueValue = {};
  const slot = argumentConversionSlot(0, 0);
  const callee = {};
  const resultType = {};
  let conflicts = 0;
  let evaluations = 0;
  let applications = 0;
  const requestSnapshotCache = createCheckedOperationRequestSnapshotCache();
  const inventory = new CheckedOperationInventory({
    beginAttempt: () => Object.freeze({}),
    commitAttempt: () => {},
    rollbackAttempt: () => {},
    discardAttemptPreservingDiagnostics: () => {},
    onFatalFailure: () => undefined,
    onRequestConflict: () => {
      conflicts += 1;
    },
    onDependencyConflict: () => {
      conflicts += 1;
    },
    onUnresolved: () => {
      throw new Error("Unexpected unresolved checked operation.");
    },
  });
  const request = (): CheckedConversionMappingRequest => {
    const targetParameter: TargetParameter = {
      name: "value",
      type: { kind: "target-specific", target: "acme", name: "payload", value: opaqueValue },
      passingMode: "by-value",
    };
    const sourceBinding = {
      sourceArgumentIndex: 0,
      effectiveArgumentIndex: 0,
      sourceForm: "value" as const,
      sourceParameterIndex: 0,
      sourceParameterForm: "parameter" as const,
      selectedArgumentType: source,
      selectedParameterType: source,
    };
    return {
      conversionKind: "call-argument",
      expression,
      source: sourceValue(expression, source),
      target: targetParameter.type,
      call,
      slot,
      sourceArgumentIndex: 0,
      targetParameterIndex: 0,
      sourceForm: "value",
      targetForm: "parameter",
      targetParameter,
      sourceBinding,
      sourceSelectedSignature: sourceSignature,
      selectedSignature: {
        member: {
          id: "acme.consume",
          sourceName: "consume",
          targetName: "consume",
          kind: "method",
          parameters: [targetParameter],
          typeParameters: [{ name: "T" }],
        },
        argumentConversions: [slot],
        sourceArgumentBindings: [sourceBinding],
        sourceCallKind: "call",
        targetTypeArguments: [{ kind: "array", element: { kind: "source-primitive", name: "int32" } }],
        sourceSignature,
        sourceCallee: sourceValue(callee, callee),
        sourceArguments: [sourceValue(expression, source)],
        sourceResult: sourceValue(call, resultType),
      },
      targetPlatform: "acme",
    };
  };
  const evaluate = (): ExtensionObservationResult<CheckedConversionMappingResult> => {
    evaluations += 1;
    return {
      kind: "accept",
      extensionId: "acme",
      value: { convertedType: { kind: "source-primitive", name: "int32" } },
    };
  };
  const apply = (): void => {
    applications += 1;
  };

  inventory.run(ExtensionObservationPoint.mapCheckedConversion, request(), evaluate, apply, "checking", requestSnapshotCache);
  inventory.run(ExtensionObservationPoint.mapCheckedConversion, request(), evaluate, apply, "checking", requestSnapshotCache);

  assert.equal(conflicts, 0);
  assert.equal(evaluations, 1);
  assert.equal(applications, 1);
});

test("target type snapshots handle 20k acyclic depth iteratively", () => {
  const depth = 20_000;
  let sourceType: TargetTypeRef = { kind: "source-primitive", name: "int32" };
  for (let index = 0; index < depth; index += 1) {
    sourceType = { kind: "array", element: sourceType };
  }

  const response = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
    convertedType: sourceType,
  });

  assert.equal(Object.isFrozen(response), true);
  assert.ok(response.convertedType !== sourceType, "The retained 20k-deep target type must be an independent immutable snapshot.");
  let retainedType = response.convertedType;
  for (let index = 0; index < depth; index += 1) {
    if (retainedType?.kind !== "array") {
      throw new Error(`Expected array TargetTypeRef at depth ${index}.`);
    }
    assert.equal(Object.isFrozen(retainedType), true);
    retainedType = retainedType.element;
  }
  assert.deepEqual(retainedType, { kind: "source-primitive", name: "int32" });
  assert.equal(Object.isFrozen(retainedType), true);
});

test("target type snapshots reject cycles deterministically", () => {
  const cyclicType: { kind: "array"; element: TargetTypeRef } = {
    kind: "array",
    element: { kind: "source-primitive", name: "int32" },
  };
  cyclicType.element = cyclicType;

  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, { convertedType: cyclicType }),
    new Error(
      "Invalid TargetTypeRef at 'checked-operation response[operation.mapCheckedConversion].convertedType.element': "
      + "cycle references the active TargetTypeRef at 'checked-operation response[operation.mapCheckedConversion].convertedType'.",
    ),
  );
});

test("target type and constraint snapshots reject unknown or missing kinds precisely", () => {
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
      convertedType: { kind: "not-a-target-type" },
    }),
    new Error(
      "Invalid TargetTypeRef at 'checked-operation response[operation.mapCheckedConversion].convertedType': "
      + "unknown kind 'not-a-target-type'.",
    ),
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
      convertedType: { kind: "array" },
    }),
    new Error(
      "Invalid TargetTypeRef at 'checked-operation response[operation.mapCheckedConversion].convertedType.element': "
      + "expected a non-array object.",
    ),
  );

  const malformedSlot = argumentConversionSlot(0, 0);
  const malformedTargetParameter = {
    name: "value",
    type: { kind: "source-primitive" as const, name: "int32" as const },
    passingMode: "by-value" as const,
  };
  const malformedSourceBinding = {
    sourceArgumentIndex: 0,
    effectiveArgumentIndex: 0,
    sourceForm: "value" as const,
    sourceParameterIndex: 0,
    sourceParameterForm: "parameter" as const,
    selectedArgumentType: {},
    selectedParameterType: {},
  };
  const malformedConstraintRequest = {
    conversionKind: "call-argument",
    expression: {},
    source: sourceValue({}, {}),
    target: malformedTargetParameter.type,
    call: {},
    slot: malformedSlot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter: malformedTargetParameter,
    sourceBinding: malformedSourceBinding,
    selectedSignature: {
      member: {
        id: "acme.consume",
        sourceName: "consume",
        targetName: "consume",
        kind: "method",
        parameters: [],
        typeParameters: [{ name: "T", constraints: [{ kind: "not-a-constraint" }] }],
      },
      targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
      argumentConversions: [malformedSlot],
      sourceArgumentBindings: [malformedSourceBinding],
      sourceCallee: sourceValue({}, {}),
      sourceArguments: [sourceValue({}, {})],
      sourceResult: sourceValue({}, {}),
    },
  };
  assert.throws(
    () => snapshotUncheckedConversionRequest(malformedConstraintRequest),
    new Error(
      "Invalid TargetConstraint at 'checked-operation request[operation.mapCheckedConversion].selectedSignature.member.typeParameters[0].constraints[0]': "
      + "unknown kind 'not-a-constraint'.",
    ),
  );
});

test("checked responses reject undefined and malformed operations precisely", () => {
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      selectedSignature: {
        member: {
          id: "acme.missing-kind",
          sourceName: "missingKind",
          targetName: "missingKind",
          kind: "method",
          parameters: [],
        },
      },
      argumentConversions: [],
    }),
    /Invalid checked call mapping response.*kind.*expected a string/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedPropertyAccess, {}),
    new Error(
      "Invalid TargetOperationFact at 'checked-operation response[operation.mapCheckedPropertyAccess].operation': "
      + "expected a non-array object.",
    ),
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedPropertyAccess, {
      operation: {
        operationId: "acme.read",
        operationKind: "invoke",
        targetOperation: "read",
      },
    }),
    new Error(
      "Invalid TargetOperationFact operationKind at 'checked-operation response[operation.mapCheckedPropertyAccess].operation.operationKind': "
      + "unknown kind 'invoke'.",
    ),
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, undefined),
    new Error(
      "Invalid checked-operation response at 'checked-operation response[operation.mapCheckedConversion]': expected a non-array object.",
    ),
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "target",
      selectedSignature: {
        member: {
          id: "acme.invalid",
          sourceName: "invalid",
          targetName: "invalid",
          kind: "function",
          parameters: [],
        },
      },
      argumentConversions: [],
    }),
    /Invalid TargetMember kind.*unknown value 'function'/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "target",
      selectedSignature: {
        member: {
          id: "acme.invalid",
          sourceName: "invalid",
          targetName: "invalid",
          kind: "method",
          parameters: [{
            name: "value",
            type: { kind: "source-primitive", name: "integer" },
            passingMode: "copy",
          }],
        },
      },
      argumentConversions: [argumentConversionSlot(0, 0)],
    }),
    /Invalid TargetParameter passingMode.*unknown value 'copy'/,
  );
  const validSelection = {
    member: {
      id: "acme.valid",
      sourceName: "valid",
      targetName: "valid",
      kind: "method",
      parameters: [{
        name: "value",
        type: { kind: "source-primitive", name: "int32" },
        passingMode: "by-value",
      }],
    },
  };
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "runtime",
      selectedSignature: validSelection,
      argumentConversions: [],
    }),
    /Invalid checked call mapping response.*unknown kind 'runtime'/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "source",
      argumentConversions: [],
    }),
    /Invalid source checked call mapping response.*unsupported field 'argumentConversions'/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "target",
      selectedSignature: validSelection,
      argumentConversions: [{
        sourceArgumentIndex: -1,
        sourceForm: "value",
        targetParameterIndex: 0,
        targetForm: "parameter",
      }],
    }),
    /TargetCallArgumentConversionSlot sourceArgumentIndex.*expected a non-negative safe integer/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "target",
      selectedSignature: validSelection,
      argumentConversions: [{
        sourceArgumentIndex: 0,
        sourceForm: "value",
        targetParameterIndex: Number.MAX_SAFE_INTEGER + 1,
        targetForm: "parameter",
      }],
    }),
    /TargetCallArgumentConversionSlot targetParameterIndex.*expected a non-negative safe integer/,
  );
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
      kind: "target",
      selectedSignature: validSelection,
      argumentConversions: [{
        sourceArgumentIndex: 0,
        sourceForm: "spread-element",
        targetParameterIndex: 0,
        targetForm: "parameter",
      }],
    }),
    /TargetCallArgumentConversionSlot spreadElementIndex.*expected a non-negative safe integer/,
  );
});

test("checked member request snapshots reject malformed exact use evidence", () => {
  const expression = {};
  const receiver = {};
  const argument = {};
  const callee = {};
  const propertyRequest: CheckedPropertyAccessMappingRequest = {
    expression,
    receiver,
    propertyName: "value",
    accessMode: "read",
    callCallee: false,
    sourceReceiver: sourceValue(receiver, {}),
    sourceResult: sourceValue(expression, {}),
  };
  const elementRequest: CheckedElementAccessMappingRequest = {
    expression,
    receiver,
    argument,
    accessMode: "read",
    callCallee: false,
    sourceReceiver: sourceValue(receiver, {}),
    sourceArgument: sourceValue(argument, {}),
    sourceResult: sourceValue(expression, {}),
  };
  const callRequest: CheckedCallMappingRequest = {
    call: expression,
    callee,
    arguments: [],
    callKind: "call",
    sourceCallee: sourceValue(callee, {}),
    sourceArguments: [],
    sourceResult: sourceValue(expression, {}),
  };

  assert.throws(
    () => snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedPropertyAccess, {
      ...propertyRequest,
      accessMode: "execute",
    } as unknown as CheckedPropertyAccessMappingRequest),
    /accessMode must be 'read', 'write', or 'read-write'/,
  );
  assert.throws(
    () => snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedElementAccess, {
      ...elementRequest,
      callCallee: "yes",
    } as unknown as CheckedElementAccessMappingRequest),
    /callCallee.*boolean/,
  );
  assert.throws(
    () => snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedCall, {
      ...callRequest,
      callKind: "invoke",
    } as unknown as CheckedCallMappingRequest),
    /callKind must be 'call' or 'construct'/,
  );
});

test("call-argument request snapshots reject structurally equal non-canonical slots", () => {
  const canonicalSlot = argumentConversionSlot(0, 0);
  const nonCanonicalSlot = argumentConversionSlot(0, 0);
  const targetParameter: TargetParameter = {
    name: "value",
    type: { kind: "source-primitive", name: "int32" },
    passingMode: "by-value",
  };
  const request: CheckedConversionMappingRequest = {
    conversionKind: "call-argument",
    expression: {},
    source: sourceValue({}, {}),
    target: targetParameter.type,
    call: {},
    slot: nonCanonicalSlot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter,
    sourceBinding: {
      sourceArgumentIndex: 0,
      effectiveArgumentIndex: 0,
      sourceForm: "value",
      sourceParameterIndex: 0,
      sourceParameterForm: "parameter",
      selectedArgumentType: {},
      selectedParameterType: {},
    },
    selectedSignature: {
      member: {
        id: "acme.canonical-binding",
        sourceName: "canonicalBinding",
        targetName: "canonicalBinding",
        kind: "method",
        parameters: [targetParameter],
      },
      argumentConversions: [canonicalSlot],
      sourceArgumentBindings: [{
        sourceArgumentIndex: 0,
        effectiveArgumentIndex: 0,
        sourceForm: "value",
        sourceParameterIndex: 0,
        sourceParameterForm: "parameter",
        selectedArgumentType: {},
        selectedParameterType: {},
      }],
      sourceCallKind: "call",
      sourceCallee: sourceValue({}, {}),
      sourceArguments: [sourceValue({}, {})],
      sourceResult: sourceValue({}, {}),
    },
  };

  assert.throws(
    () => snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedConversion, request),
    /slot is not one of the selected target signature's canonical conversion slots/,
  );
});

test("call slot snapshots preserve fixed spread elements in canonical order", () => {
  const response = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, {
    kind: "target",
    selectedSignature: {
      member: {
        id: "acme.fixed-spread",
        sourceName: "fixedSpread",
        targetName: "fixedSpread",
        kind: "method",
        parameters: [
          { name: "first", type: { kind: "source-primitive", name: "int32" }, passingMode: "by-value" },
          { name: "second", type: { kind: "source-primitive", name: "int32" }, passingMode: "by-value" },
        ],
      },
    },
    argumentConversions: [
      {
        sourceArgumentIndex: 0,
        sourceForm: "spread-element",
        spreadElementIndex: 1,
        targetParameterIndex: 1,
        targetForm: "parameter",
      },
      {
        sourceArgumentIndex: 0,
        sourceForm: "spread-element",
        spreadElementIndex: 0,
        targetParameterIndex: 0,
        targetForm: "parameter",
      },
    ],
  });

  assert.equal(response.kind, "target");
  if (response.kind !== "target") {
    throw new Error("Expected a target call response snapshot.");
  }
  const first = response.argumentConversions[0];
  const second = response.argumentConversions[1];
  assert.ok(first !== undefined && second !== undefined);
  assert.equal(first.sourceArgumentIndex, 0);
  assert.equal(first.spreadElementIndex, 0);
  assert.equal(first.targetParameterIndex, 0);
  assert.equal(first.targetForm, "parameter");
  assert.equal(second.sourceArgumentIndex, 0);
  assert.equal(second.spreadElementIndex, 1);
  assert.equal(second.targetParameterIndex, 1);
  assert.equal(second.targetForm, "parameter");
  assert.equal(Object.isFrozen(response.argumentConversions), true);
  assert.ok(response.argumentConversions.every((slot) => Object.isFrozen(slot)));
});

test("checked response snapshots are reused without re-copying validated target graphs", () => {
  const first = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedPropertyAccess, {
    operation: {
      operationId: "acme.length",
      operationKind: "property",
      targetOperation: "length",
      resultType: { kind: "source-primitive", name: "int32" },
    },
  });
  const second = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedPropertyAccess, first);

  assert.equal(second, first);
  assert.equal(second.operation, first.operation);
  assert.equal(second.operation.resultType, first.operation.resultType);
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedCall, first),
    /Invalid checked call mapping response.*kind.*expected a string/,
  );
});

test("checked response snapshots read each extension-owned target field once", () => {
  const reads = new Map<string, number>();
  const readOnce = <T>(field: string, value: T): T => {
    const count = (reads.get(field) ?? 0) + 1;
    reads.set(field, count);
    if (count > 1) {
      throw new Error(`Field '${field}' was read more than once.`);
    }
    return value;
  };
  const element = {
    get kind(): "source-primitive" {
      return readOnce("element.kind", "source-primitive");
    },
    get name(): "int32" {
      return readOnce("element.name", "int32");
    },
  } satisfies TargetTypeRef;
  const resultType = {
    get kind(): "target-named" {
      return readOnce("resultType.kind", "target-named");
    },
    get id(): string {
      return readOnce("resultType.id", "Acme.Box");
    },
    get typeArguments(): readonly TargetTypeRef[] {
      return readOnce("resultType.typeArguments", [element]);
    },
  } satisfies TargetTypeRef;
  const operation = {
    get operationId(): string {
      return readOnce("operation.operationId", "acme.box.value");
    },
    get operationKind(): "property" {
      return readOnce("operation.operationKind", "property");
    },
    get targetOperation(): string {
      return readOnce("operation.targetOperation", "value");
    },
    get resultType(): TargetTypeRef {
      return readOnce("operation.resultType", resultType);
    },
  } satisfies TargetOperationFact;
  const response = {
    get operation(): TargetOperationFact {
      return readOnce("response.operation", operation);
    },
    get resultType(): undefined {
      return readOnce("response.resultType", undefined);
    },
    get provenance(): undefined {
      return readOnce("response.provenance", undefined);
    },
  };

  const snapshot = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedPropertyAccess, response);

  assert.deepEqual(snapshot.operation.resultType, {
    kind: "target-named",
    id: "Acme.Box",
    typeArguments: [{ kind: "source-primitive", name: "int32" }],
  });
  assert.deepEqual([...reads.values()], Array.from({ length: reads.size }, () => 1));
});

test("target-specific values remain uninspected target-owned identities inside frozen snapshots", () => {
  const opaqueTarget = { targetOwned: true };
  const opaqueValue = new Proxy(opaqueTarget, {
    get() {
      throw new Error("Opaque target-owned value was inspected.");
    },
    getOwnPropertyDescriptor() {
      throw new Error("Opaque target-owned value descriptor was inspected.");
    },
    getPrototypeOf() {
      throw new Error("Opaque target-owned value prototype was inspected.");
    },
    ownKeys() {
      throw new Error("Opaque target-owned value keys were inspected.");
    },
    preventExtensions() {
      throw new Error("Opaque target-owned value was frozen.");
    },
  });

  const result = snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
    kind: "accept",
    extensionId: "acme",
    value: {
      convertedType: {
        kind: "tuple",
        elements: [{ kind: "target-specific", target: "acme", name: "identity", value: opaqueValue }],
      },
    },
  });

  assert.equal(result.kind, "accept");
  if (result.kind !== "accept") {
    throw new Error("Expected accepted checked conversion result.");
  }
  assert.equal(result.value.convertedType?.kind, "tuple");
  if (result.value.convertedType?.kind !== "tuple") {
    throw new Error("Expected tuple conversion type.");
  }
  const retainedIdentity = result.value.convertedType.elements[0];
  assert.equal(retainedIdentity?.kind, "target-specific");
  if (retainedIdentity?.kind !== "target-specific") {
    throw new Error("Expected target-specific identity type.");
  }
  assert.equal(retainedIdentity.value, opaqueValue);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.value), true);
  assert.equal(Object.isFrozen(result.value.convertedType), true);
  assert.equal(Object.isFrozen(result.value.convertedType.elements), true);
  assert.equal(Object.isFrozen(retainedIdentity), true);
  assert.equal(Object.isFrozen(opaqueTarget), false);
});

test("one request snapshot cache reuses selected signatures and their target parameters", () => {
  const parameterCount = 64;
  let parameterNameReads = 0;
  let selectedMemberReads = 0;
  const sourceParameters: TargetParameter[] = Array.from({ length: parameterCount }, (_, index) => ({
    get name(): string {
      parameterNameReads += 1;
      return `value${index}`;
    },
    type: { kind: "source-primitive" as const, name: "int32" as const },
    passingMode: "by-value" as const,
  }));
  const sourceMember: TargetSignatureSelection["member"] = {
    id: "acme.consume",
    sourceName: "consume",
    targetName: "consume",
    kind: "method",
    parameters: sourceParameters,
  };
  const slots: TargetCallArgumentConversionSlot[] = Array.from(
    { length: parameterCount },
    (_, sourceArgumentIndex) => argumentConversionSlot(sourceArgumentIndex, sourceArgumentIndex),
  );
  const selectedSignature: SelectedTargetSignatureFact = {
    get member(): TargetSignatureSelection["member"] {
      selectedMemberReads += 1;
      return sourceMember;
    },
    argumentConversions: slots,
    sourceArgumentBindings: slots.map((slot) => ({
      sourceArgumentIndex: slot.sourceArgumentIndex,
      effectiveArgumentIndex: slot.sourceArgumentIndex,
      sourceForm: slot.sourceForm,
      sourceParameterIndex: slot.targetParameterIndex,
      sourceParameterForm: "parameter",
      selectedArgumentType: sourceParameters[slot.sourceArgumentIndex]!.type,
      selectedParameterType: sourceParameters[slot.targetParameterIndex]!.type,
    })),
    sourceCallKind: "call",
    sourceCallee: sourceValue({}, {}),
    sourceArguments: sourceParameters.map((parameter, index) => sourceValue({ index }, parameter.type)),
    sourceResult: sourceValue({}, {}),
  };
  const expression = {};
  const source = {};
  const call = {};
  const requestFor = (targetParameterIndex: number): CheckedConversionMappingRequest => ({
    conversionKind: "call-argument",
    expression,
    source: sourceValue(expression, source),
    target: sourceParameters[targetParameterIndex]!.type,
    call,
    slot: slots[targetParameterIndex]!,
    sourceArgumentIndex: targetParameterIndex,
    targetParameterIndex,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter: sourceParameters[targetParameterIndex]!,
    selectedSignature,
    sourceBinding: selectedSignature.sourceArgumentBindings[targetParameterIndex]!,
  });
  const cache = createCheckedOperationRequestSnapshotCache();
  let sharedSelectedSignature: SelectedTargetSignatureFact | undefined;

  for (let parameterIndex = 0; parameterIndex < parameterCount; parameterIndex += 1) {
    const snapshot = snapshotCheckedOperationRequest(
      ExtensionObservationPoint.mapCheckedConversion,
      requestFor(parameterIndex),
      cache,
    );
    if (snapshot.conversionKind !== "call-argument") {
      throw new Error("Expected call-argument request snapshot.");
    }
    if (sharedSelectedSignature === undefined) {
      sharedSelectedSignature = snapshot.selectedSignature;
    } else {
      assert.equal(snapshot.selectedSignature, sharedSelectedSignature);
    }
    assert.equal(snapshot.targetParameter, snapshot.selectedSignature.member.parameters[parameterIndex]);
  }

  assert.equal(selectedMemberReads, 1);
  assert.equal(parameterNameReads, parameterCount);
  assert.equal(Object.isFrozen(sharedSelectedSignature), true);
  assert.equal(Object.isFrozen(sharedSelectedSignature?.member.parameters), true);

  const isolatedSnapshot = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedConversion,
    requestFor(0),
    createCheckedOperationRequestSnapshotCache(),
  );
  if (isolatedSnapshot.conversionKind !== "call-argument") {
    throw new Error("Expected isolated call-argument request snapshot.");
  }
  assert.notEqual(isolatedSnapshot.selectedSignature, sharedSelectedSignature);
  assert.equal(isolatedSnapshot.targetParameter, isolatedSnapshot.selectedSignature.member.parameters[0]);
  assert.equal(selectedMemberReads, 2);
  assert.equal(parameterNameReads, parameterCount * 2);
});

test("checked-operation dependency snapshots preserve exact conversion slots", () => {
  const inventory = createInventory();
  const dependencyExpression = {};
  const dependencyCall = {};
  const targetParameter: TargetParameter = {
    name: "value",
    type: { kind: "source-primitive", name: "int32" },
    passingMode: "by-value",
  };
  const dependencySlot = argumentConversionSlot(0, 0);
  const dependencyRequest: CheckedConversionMappingRequest = {
    conversionKind: "call-argument",
    expression: dependencyExpression,
    source: sourceValue(dependencyExpression, dependencyExpression),
    target: targetParameter.type,
    call: dependencyCall,
    slot: dependencySlot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter,
    sourceBinding: {
      sourceArgumentIndex: 0,
      effectiveArgumentIndex: 0,
      sourceForm: "value",
      sourceParameterIndex: 0,
      sourceParameterForm: "parameter",
      selectedArgumentType: dependencyExpression,
      selectedParameterType: targetParameter.type,
    },
    selectedSignature: {
      member: {
        id: "acme.consume",
        sourceName: "consume",
        targetName: "consume",
        kind: "method",
        parameters: [targetParameter],
      },
      argumentConversions: [dependencySlot],
      sourceArgumentBindings: [{
        sourceArgumentIndex: 0,
        effectiveArgumentIndex: 0,
        sourceForm: "value",
        sourceParameterIndex: 0,
        sourceParameterForm: "parameter",
        selectedArgumentType: dependencyExpression,
        selectedParameterType: targetParameter.type,
      }],
      sourceCallKind: "call",
      sourceCallee: sourceValue({}, {}),
      sourceArguments: [sourceValue(dependencyExpression, dependencyExpression)],
      sourceResult: sourceValue(dependencyCall, {}),
    },
  };
  const requestSnapshotCache = createCheckedOperationRequestSnapshotCache();
  const retainedDependencyRequest = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedConversion,
    dependencyRequest,
    requestSnapshotCache,
  );
  if (retainedDependencyRequest.conversionKind !== "call-argument") {
    throw new Error("Expected a retained call-argument dependency request.");
  }
  const sourceReference = {
    observation: ExtensionObservationPoint.mapCheckedConversion,
    subject: dependencyExpression,
    conversionKind: "call-argument" as const,
    call: dependencyCall,
    slot: retainedDependencyRequest.slot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
  };
  const parentExpression = {};
  const parentRequest: CheckedConversionMappingRequest = {
    conversionKind: "assertion",
    assertionKind: "as",
    expression: parentExpression,
    source: sourceValue(parentExpression, {}),
    target: sourceType({}),
    explicitTargetTypeNode: {},
  };
  const order: string[] = [];

  inventory.run(
    ExtensionObservationPoint.mapCheckedConversion,
    dependencyRequest,
    (_request, phase) => phase === "checking"
      ? { kind: "owner-deferred", observation: ExtensionObservationPoint.mapCheckedConversion, extensionId: "acme" }
      : { kind: "accept", extensionId: "acme", value: {} },
    () => {
      order.push("dependency");
    },
    "checking",
    requestSnapshotCache,
  );
  inventory.run(
    ExtensionObservationPoint.mapCheckedConversion,
    parentRequest,
    () => ({ kind: "accept", extensionId: "acme", value: {} }),
    () => {
      order.push("parent");
    },
    "checking",
    undefined,
    [sourceReference],
  );

  sourceReference.sourceArgumentIndex = 9;
  sourceReference.targetParameterIndex = 9;
  inventory.finalize();

  assert.deepEqual(order, ["dependency", "parent"]);
});

function snapshotUncheckedConversionRequest(request: unknown): unknown {
  return snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedConversion,
    request as CheckedConversionMappingRequest,
  );
}

function sourceType(type: object) {
  return { type };
}

function sourceValue(expression: object, type: object) {
  return { expression, type };
}

function argumentConversionSlot(
  sourceArgumentIndex: number,
  targetParameterIndex: number,
  sourceForm: "value" | "spread-element" | "spread-sequence" = "value",
  targetForm: "parameter" | "params-element" | "params-sequence" = "parameter",
  spreadElementIndex?: number,
): TargetCallArgumentConversionSlot {
  return {
    sourceArgumentIndex,
    sourceForm,
    ...(spreadElementIndex === undefined ? {} : { spreadElementIndex }),
    targetParameterIndex,
    targetForm,
  };
}

function createInventory(): CheckedOperationInventory {
  return new CheckedOperationInventory({
    beginAttempt: () => Object.freeze({}),
    commitAttempt: () => {},
    rollbackAttempt: () => {},
    discardAttemptPreservingDiagnostics: () => {},
    onFatalFailure: () => undefined,
    onRequestConflict: () => {
      throw new Error("Unexpected checked-operation request conflict.");
    },
    onDependencyConflict: () => {
      throw new Error("Unexpected checked-operation dependency conflict.");
    },
    onUnresolved: () => {
      throw new Error("Unexpected unresolved checked operation.");
    },
  });
}
