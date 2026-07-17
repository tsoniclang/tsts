import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  defineExtensionFactKey,
  deferObservation,
  targetCallArgumentConversionFactKey,
  targetConversionFactKey,
  targetOperationFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CompilerExtension,
  ExtensionFactSubject,
  SelectedSourceTypeEvidence,
  SelectedSourceValueEvidence,
  SelectedTargetSignatureFact,
  SourceSelectedCallArgumentBinding,
  TargetCallArgumentConversionSlot,
  TargetOperationFact,
  TargetSemanticProvider,
} from "./index.js";
import { extensionHostGetCheckedOperationReference, extensionHostRunCheckedOperation } from "./host.js";

const receiverCarrierFactKey = defineExtensionFactKey<{ readonly id: string }>({
  extensionId: "acme.lifecycle-test",
  name: "receiverCarrier",
  equals: (left, right) => left.id === right.id,
});

test("checked operations replay after lifecycle in deterministic dependency order", () => {
  const receiver = {};
  const receiverType = {};
  const property = {};
  const assignment = {};
  const assignmentConversion = {};
  const phases: string[] = [];
  const extension = lifecycleExtension({
    beforeFinalization: (host) => {
      host.facts.set(receiverType, receiverCarrierFactKey, { id: "Box<string>" });
    },
    property: (request, context) => {
      phases.push(`property:${context.phase}`);
      assert.equal(Object.isFrozen(request), true);
      if (!context.facts.has(request.sourceReceiver.type, receiverCarrierFactKey)) {
        return deferObservation;
      }
      return acceptObservation({ operation: operation("box.value", "property") });
    },
    operator: (request, context) => {
      phases.push(`operator:${context.phase}`);
      assert.equal(Object.isFrozen(request), true);
      if (!context.facts.has(request.left, targetOperationFactKey)) {
        return deferObservation;
      }
      return acceptObservation({ operation: operation("box.value.set", "operator") });
    },
    conversion: (_request, context) => {
      phases.push(`conversion:${context.phase}`);
      return acceptObservation({ convertedType: { kind: "target-named", id: "Acme.Assignment" } });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  const operatorResult = host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedOperator,
    {
      expression: assignment,
      operator: "=",
      left: property,
      right: {},
      sourceResult: sourceValue(assignment, {}),
      target: "acme",
    },
    () => {
      throw new Error("owned operator reached core");
    },
    (value, evidence) => {
      host.facts.set(assignment, targetOperationFactKey, value.operation, evidence);
      host[extensionHostRunCheckedOperation](
        ExtensionObservationPoint.mapCheckedConversion,
        {
          conversionKind: "assertion",
          assertionKind: "as",
          expression: assignmentConversion,
          source: sourceValue(assignment, {}),
          target: sourceType({}),
          explicitTargetTypeNode: {},
          targetPlatform: "acme",
        },
        () => {
          throw new Error("owned conversion reached core");
        },
        (conversion, conversionEvidence) => {
          host.facts.set(assignmentConversion, targetConversionFactKey, {
            ...(conversion.convertedType === undefined ? {} : { convertedType: conversion.convertedType }),
            ...(conversion.operation === undefined ? {} : { operation: conversion.operation }),
          }, conversionEvidence);
        },
        { requireOwner: true },
        undefined,
        [{ observation: ExtensionObservationPoint.mapCheckedOperator, subject: assignment }],
      );
    },
    { requireOwner: true },
    undefined,
    [{ observation: ExtensionObservationPoint.mapCheckedPropertyAccess, subject: property }],
  );
  const propertyResult = host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    {
      expression: property,
      receiver,
      propertyName: "value",
      sourceReceiver: sourceValue(receiver, receiverType),
      sourceResult: sourceValue(property, {}),
      target: "acme",
    },
    () => {
      throw new Error("owned property reached core");
    },
    (value, evidence) => {
      host.facts.set(property, targetOperationFactKey, value.operation, evidence);
    },
    { requireOwner: true },
  );

  assert.equal(operatorResult.kind, "owner-deferred");
  assert.equal(propertyResult.kind, "owner-deferred");
  assert.deepEqual(phases, ["property:checking"]);
  assert.equal(host.diagnostics.all().length, 0, "Checking must not report extension diagnostics.");

  host.finalizeSemantics();
  assert.deepEqual(phases, [
    "property:checking",
    "property:finalization",
    "operator:finalization",
    "conversion:finalization",
  ]);
  assert.equal(host.facts.get(property, targetOperationFactKey)?.targetOperation, "box.value");
  assert.equal(host.facts.get(assignment, targetOperationFactKey)?.targetOperation, "box.value.set");
  assert.deepEqual(host.facts.get(assignmentConversion, targetConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Assignment" });
  assert.equal(host.diagnostics.all().length, 0, "Finalization must not report extension diagnostics.");

  host.finalizeSemantics();
  assert.equal(phases.length, 4);
});

test("retained selected receiver evidence remains distinct across generic instantiations", () => {
  const stringType = {};
  const numberType = {};
  const stringReceiver = {};
  const numberReceiver = {};
  const stringCall = {};
  const numberCall = {};
  const seenReceiverTypes: ExtensionFactSubject[] = [];
  const extension = lifecycleExtension({
    beforeFinalization: (host) => {
      host.facts.set(stringType, receiverCarrierFactKey, { id: "Box<string>" });
      host.facts.set(numberType, receiverCarrierFactKey, { id: "Box<number>" });
    },
    call: (request, context) => {
      if (request.sourceReceiver !== undefined) {
        seenReceiverTypes.push(request.sourceReceiver.type);
      }
      const carrier = context.facts.get(request.sourceReceiver?.type, receiverCarrierFactKey);
      if (carrier === undefined) {
        return deferObservation;
      }
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          member: {
            id: `${carrier.id}.clear`,
            sourceName: "clear",
            targetName: "clear",
            kind: "method",
            parameters: [],
          },
        },
        argumentConversions: [],
      });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  runDeferredCall(host, stringCall, stringReceiver, stringType);
  runDeferredCall(host, numberCall, numberReceiver, numberType);
  host.finalizeSemantics();

  assert.ok(stringType !== numberType, "Distinct generic receiver types must have distinct identities.");
  assert.equal(seenReceiverTypes.length, 4);
  assert.ok(seenReceiverTypes[0] === stringType, "The first checking request must retain the string receiver type.");
  assert.ok(seenReceiverTypes[1] === numberType, "The second checking request must retain the number receiver type.");
  assert.ok(seenReceiverTypes[2] === stringType, "The first finalized request must retain the string receiver type.");
  assert.ok(seenReceiverTypes[3] === numberType, "The second finalized request must retain the number receiver type.");
  assert.equal(host.facts.get(stringCall, selectedCallFactKey)?.id, "Box<string>.clear");
  assert.equal(host.facts.get(numberCall, selectedCallFactKey)?.id, "Box<number>.clear");
  assert.equal(host.diagnostics.all().length, 0, "Finalized generic receivers must not report extension diagnostics.");
});

test("unresolved checked operations produce one final diagnostic and no target fact", () => {
  const expression = {};
  const receiver = {};
  const receiverType = {};
  const extension = lifecycleExtension({
    property: () => deferObservation,
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    {
      expression,
      receiver,
      propertyName: "missing",
      sourceReceiver: sourceValue(receiver, receiverType),
      sourceResult: sourceValue(expression, {}),
      target: "acme",
    },
    () => {
      throw new Error("owned property reached core");
    },
    (value, evidence) => {
      host.facts.set(expression, targetOperationFactKey, value.operation, evidence);
    },
    { requireOwner: true },
  );

  assert.equal(host.diagnostics.all().length, 0, "Checking must not report an unresolved-operation diagnostic before finalization.");
  host.finalizeSemantics();
  assert.equal(host.facts.get(expression, targetOperationFactKey), undefined);
  assert.equal(host.diagnostics.all().length, 1);
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "OBSERVATION_OWNER_DEFERRED");
  assert.equal(host.diagnostics.all()[0]?.nodeOrSpan, expression);
  assert.match(host.diagnostics.all()[0]?.message ?? "", /after semantic finalization/);
  host.finalizeSemantics();
  assert.equal(host.diagnostics.all().length, 1);
});

test("checked conversions share the deferred finalization contract", () => {
  const expression = {};
  const source = {};
  const target = {};
  const phases: string[] = [];
  const extension = lifecycleExtension({
    beforeFinalization: (host) => {
      host.facts.set(source, receiverCarrierFactKey, { id: "source-ready" });
    },
    conversion: (request, context) => {
      phases.push(context.phase);
      if (!context.facts.has(request.source.type, receiverCarrierFactKey)) {
        return deferObservation;
      }
      return acceptObservation({ convertedType: { kind: "target-named", id: "Acme.Value" } });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  const result = host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedConversion,
    {
      conversionKind: "assertion",
      assertionKind: "as",
      expression,
      source: sourceValue(expression, source),
      target: sourceType(target),
      explicitTargetTypeNode: {},
      targetPlatform: "acme",
    },
    () => {
      throw new Error("owned conversion reached core");
    },
    (value, evidence) => {
      host.facts.set(expression, targetConversionFactKey, {
        ...(value.convertedType === undefined ? {} : { convertedType: value.convertedType }),
        ...(value.operation === undefined ? {} : { operation: value.operation }),
      }, evidence);
    },
    { requireOwner: true },
  );

  assert.equal(result.kind, "owner-deferred");
  assert.deepEqual(phases, ["checking"]);
  host.finalizeSemantics();
  assert.deepEqual(phases, ["checking", "finalization"]);
  assert.deepEqual(host.facts.get(expression, targetConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Value" });
  assert.equal(host.diagnostics.all().length, 0, "Conversion finalization must not report extension diagnostics.");
});

test("assertion and call-argument conversions retain distinct slots for one expression", () => {
  const expression = {};
  const call = {};
  const source = {};
  const target = {};
  const slot = {
    sourceArgumentIndex: 0,
    sourceForm: "value" as const,
    targetParameterIndex: 0,
    targetForm: "parameter" as const,
  };
  const selectedSourceBinding = sourceArgumentBinding(source, target, 0, 0);
  const selectedSignature: SelectedTargetSignatureFact = {
    member: {
      id: "consume(value)",
      sourceName: "consume",
      targetName: "consume",
      kind: "method" as const,
      parameters: [{
        name: "value",
        type: { kind: "target-named" as const, id: "Acme.Value" },
        passingMode: "by-value" as const,
      }],
    },
    argumentConversions: [slot],
    sourceArgumentBindings: [selectedSourceBinding],
    sourceCallee: sourceValue({}, {}),
    sourceArguments: [sourceValue(expression, source)],
    sourceResult: sourceValue(call, {}),
  };
  const observedKinds: string[] = [];
  let applied = 0;
  let retainedSlot: TargetCallArgumentConversionSlot | undefined;
  const extension = lifecycleExtension({
    conversion: (request) => {
      observedKinds.push(request.conversionKind);
      return request.conversionKind === "assertion"
        ? acceptObservation({ convertedType: { kind: "target-named", id: "Acme.Value" } })
        : acceptObservation({ convertedType: { kind: "target-named", id: "Acme.Parameter" } });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedConversion, {
    conversionKind: "assertion",
    assertionKind: "as",
    expression,
    source: sourceValue(expression, source),
    target: sourceType(target),
    explicitTargetTypeNode: target,
    targetPlatform: "acme",
  }, () => {
    throw new Error("owned assertion conversion reached core");
  }, (value, evidence, request) => {
    assert.equal(request.conversionKind, "assertion");
    host.facts.set(request.expression, targetConversionFactKey, value, evidence);
    applied += 1;
  }, { requireOwner: true });

  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedConversion, {
    conversionKind: "call-argument",
    expression,
    source: selectedSignature.sourceArguments[0]!,
    sourceBinding: selectedSourceBinding,
    target: selectedSignature.member.parameters[0]!.type,
    call,
    slot,
    sourceArgumentIndex: 0,
    targetParameterIndex: 0,
    sourceForm: "value",
    targetForm: "parameter",
    targetParameter: selectedSignature.member.parameters[0]!,
    selectedSignature,
    targetPlatform: "acme",
  }, () => {
    throw new Error("owned call-argument conversion reached core");
  }, (value, evidence, request) => {
    assert.equal(request.conversionKind, "call-argument");
    if (request.conversionKind === "call-argument") {
      assert.ok(
        request.slot === request.selectedSignature.argumentConversions[0],
        "The conversion request must retain its selected signature's canonical slot.",
      );
      retainedSlot = request.slot;
      host.facts.set(request.slot, targetCallArgumentConversionFactKey, {
        ...value,
        slot: request.slot,
        call: request.call,
        sourceArgumentIndex: request.sourceArgumentIndex,
        targetParameterIndex: request.targetParameterIndex,
        sourceForm: request.sourceForm,
        ...(request.spreadElementIndex === undefined ? {} : { spreadElementIndex: request.spreadElementIndex }),
        targetForm: request.targetForm,
        sourceBinding: request.sourceBinding,
      }, evidence);
    }
    applied += 1;
  }, { requireOwner: true });

  assert.deepEqual(observedKinds, ["assertion", "call-argument"]);
  assert.equal(applied, 2);
  assert.ok(retainedSlot !== undefined);
  assert.notEqual(retainedSlot, slot);
  assert.equal(host[extensionHostGetCheckedOperationReference](expression)?.conversionKind, "assertion");
  assert.deepEqual(host.facts.get(expression, targetConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Value" });
  assert.deepEqual(host.facts.get(retainedSlot, targetCallArgumentConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Parameter" });
  assert.ok(
    host.facts.get(retainedSlot, targetCallArgumentConversionFactKey)?.call === call,
    "Call-argument conversion evidence must retain the exact call subject.",
  );
  assert.equal(host.facts.get(retainedSlot, targetCallArgumentConversionFactKey)?.sourceArgumentIndex, 0);
  assert.equal(host.facts.get(retainedSlot, targetCallArgumentConversionFactKey)?.targetParameterIndex, 0);
  host.finalizeSemantics();
  assert.equal(host.finalized, true);
  assert.equal(host.diagnostics.all().length, 0, "Distinct conversion slots must not report extension diagnostics.");
});

test("checked iteration shares the deferred finalization contract", () => {
  const statement = {};
  const expression = {};
  const sourceElementType = {};
  const phases: string[] = [];
  const extension = lifecycleExtension({
    beforeFinalization: (host) => {
      host.facts.set(sourceElementType, receiverCarrierFactKey, { id: "element-ready" });
    },
    iteration: (request, context) => {
      phases.push(context.phase);
      if (!context.facts.has(request.sourceElement.type, receiverCarrierFactKey)) {
        return deferObservation;
      }
      return acceptObservation({ operation: operation("box.iterate", "iteration") });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  const result = host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedIteration,
    {
      statement,
      expression,
      kind: "for-of",
      sourceIterable: sourceValue(expression, {}),
      sourceElement: sourceType(sourceElementType),
      target: "acme",
    },
    () => {
      throw new Error("owned iteration reached core");
    },
    (value, evidence) => {
      host.facts.set(statement, targetOperationFactKey, value.operation, evidence);
    },
    { requireOwner: true },
  );

  assert.equal(result.kind, "owner-deferred");
  assert.deepEqual(phases, ["checking"]);
  host.finalizeSemantics();
  assert.deepEqual(phases, ["checking", "finalization"]);
  assert.equal(host.facts.get(statement, targetOperationFactKey)?.targetOperation, "box.iterate");
  assert.equal(host.diagnostics.all().length, 0, "Iteration finalization must not report extension diagnostics.");
});

test("operations first observed by finalization lifecycle hooks use finalization phase", () => {
  const phases: string[] = [];
  const call = {};
  const extension = lifecycleExtension({
    beforeFinalization: (host) => {
      runDeferredCall(host, call, {}, {});
    },
    call: (_request, context) => {
      phases.push(context.phase);
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          member: {
            id: "lifecycle-call",
            sourceName: "lifecycleCall",
            targetName: "lifecycle_call",
            kind: "method",
            parameters: [],
          },
        },
        argumentConversions: [],
      });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });

  host.finalizeSemantics();
  assert.deepEqual(phases, ["finalization"]);
  assert.equal(host.facts.get(call, selectedCallFactKey)?.id, "lifecycle-call");
  assert.equal(host.diagnostics.all().length, 0, "Lifecycle-created operations must not report extension diagnostics.");
});

test("repeated checked observations are idempotent and conflicting source evidence fails closed", () => {
  const call = {};
  const callee = {};
  const receiver = {};
  const receiverType = {};
  let mapperRuns = 0;
  let acceptedResults = 0;
  const extension = lifecycleExtension({
    call: () => {
      mapperRuns += 1;
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          member: {
            id: "repeatable-call",
            sourceName: "repeatableCall",
            targetName: "repeatable_call",
            kind: "method",
            parameters: [],
          },
        },
        argumentConversions: [],
      });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });
  const request = checkedCallRequest(call, callee, receiver, receiverType);
  const apply = (): void => {
    acceptedResults += 1;
    host.facts.set(call, selectedCallFactKey, { id: "repeatable-call" });
  };

  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, request, () => {
    throw new Error("owned call reached core");
  }, apply, { requireOwner: true });
  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, request, () => {
    throw new Error("owned call reached core");
  }, apply, { requireOwner: true });
  assert.equal(mapperRuns, 1);
  assert.equal(acceptedResults, 1);
  assert.equal(host.diagnostics.all().length, 0, "Idempotent observations must not report extension diagnostics.");

  host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
    ...request,
    sourceReceiver: sourceValue(receiver, {}),
  }, () => {
    throw new Error("owned call reached core");
  }, apply, { requireOwner: true });
  assert.equal(mapperRuns, 1);
  assert.equal(acceptedResults, 1);
  assert.equal(host.diagnostics.all().length, 1);
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "CHECKED_OPERATION_REQUEST_CONFLICT");
  assert.deepEqual(host.diagnostics.all()[0]?.evidence?.[0]?.details, ["sourceReceiver"]);
  assert.equal(host.facts.get(call, selectedCallFactKey), undefined);
  assert.equal(host.finalized, false);
  assert.throws(() => host.finalizeSemantics(), /semantic finalization previously failed/);
});

test("one source expression can retain distinct canonical target conversion slots", () => {
  const expression = {};
  const call = {};
  const firstParameter = {
    name: "first",
    type: { kind: "target-named" as const, id: "Acme.First" },
    passingMode: "by-value" as const,
  };
  const secondParameter = {
    name: "second",
    type: { kind: "target-named" as const, id: "Acme.Second" },
    passingMode: "by-value" as const,
  };
  const firstSourceBinding = sourceArgumentBinding(expression, firstParameter.type, 0, 0);
  const selectedSignature: SelectedTargetSignatureFact = {
    member: {
      id: "acme.consume",
      sourceName: "consume",
      targetName: "consume",
      kind: "method" as const,
      parameters: [firstParameter, secondParameter],
    },
    argumentConversions: [
      {
        sourceArgumentIndex: 0,
        sourceForm: "value" as const,
        targetParameterIndex: 0,
        targetForm: "parameter" as const,
      },
      {
        sourceArgumentIndex: 0,
        sourceForm: "value" as const,
        targetParameterIndex: 1,
        targetForm: "parameter" as const,
      },
    ],
    sourceArgumentBindings: [firstSourceBinding],
    sourceCallee: sourceValue({}, {}),
    sourceArguments: [sourceValue(expression, expression)],
    sourceResult: sourceValue(call, {}),
  };
  const extension = lifecycleExtension({
    conversion: () => acceptObservation({ convertedType: { kind: "target-named", id: "Acme.Converted" } }),
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });
  const run = (
    slot: typeof selectedSignature.argumentConversions[number],
    targetParameter: typeof firstParameter,
  ): TargetCallArgumentConversionSlot => {
    let retainedSlot: TargetCallArgumentConversionSlot | undefined;
    host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedConversion, {
      conversionKind: "call-argument",
      expression,
      source: selectedSignature.sourceArguments[0]!,
      target: targetParameter.type,
      call,
      slot,
      sourceArgumentIndex: slot.sourceArgumentIndex,
      targetParameterIndex: slot.targetParameterIndex,
      sourceForm: slot.sourceForm,
      targetForm: slot.targetForm,
      targetParameter,
      sourceBinding: firstSourceBinding,
      selectedSignature,
      targetPlatform: "acme",
    }, () => {
      throw new Error("owned conversion reached core");
    }, (value, evidence, request) => {
      if (request.conversionKind !== "call-argument") {
        throw new Error("Expected a call-argument conversion request.");
      }
      assert.ok(request.slot === request.selectedSignature.argumentConversions[request.targetParameterIndex]);
      retainedSlot = request.slot;
      host.facts.set(request.slot, targetCallArgumentConversionFactKey, {
        ...value,
        slot: request.slot,
        call: request.call,
        sourceArgumentIndex: request.sourceArgumentIndex,
        targetParameterIndex: request.targetParameterIndex,
        sourceForm: request.sourceForm,
        ...(request.spreadElementIndex === undefined ? {} : { spreadElementIndex: request.spreadElementIndex }),
        targetForm: request.targetForm,
        sourceBinding: request.sourceBinding,
      }, evidence);
    }, { requireOwner: true });
    if (retainedSlot === undefined) {
      throw new Error("Expected the call-argument conversion to apply synchronously.");
    }
    return retainedSlot;
  };

  const firstAuthoredSlot = selectedSignature.argumentConversions[0]!;
  const secondAuthoredSlot = selectedSignature.argumentConversions[1]!;
  const firstSlot = run(firstAuthoredSlot, firstParameter);
  const secondSlot = run(secondAuthoredSlot, secondParameter);

  assert.equal(host.diagnostics.all().length, 0, "Distinct slot subjects must not conflict.");
  assert.notEqual(firstSlot, firstAuthoredSlot);
  assert.notEqual(secondSlot, secondAuthoredSlot);
  assert.deepEqual(host.facts.get(firstSlot, targetCallArgumentConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Converted" });
  assert.deepEqual(host.facts.get(secondSlot, targetCallArgumentConversionFactKey)?.convertedType, { kind: "target-named", id: "Acme.Converted" });
  assert.ok(host.facts.get(firstSlot, targetCallArgumentConversionFactKey)?.slot === firstSlot);
  assert.ok(host.facts.get(secondSlot, targetCallArgumentConversionFactKey)?.slot === secondSlot);
});

test("conflicting checked result types fail closed instead of reusing stale evidence", () => {
  const expression = {};
  const receiver = {};
  const receiverType = {};
  const firstResultType = {};
  const secondResultType = {};
  let mapperRuns = 0;
  const extension = lifecycleExtension({
    property: () => {
      mapperRuns += 1;
      return acceptObservation({ operation: operation("box.value", "property") });
    },
  });
  const host = new ExtensionHost({}, { extensions: [extension], activeTarget: "acme" });
  const run = (sourceResultType: ExtensionFactSubject): void => {
    host[extensionHostRunCheckedOperation](
      ExtensionObservationPoint.mapCheckedPropertyAccess,
      {
        expression,
        receiver,
        propertyName: "value",
        sourceReceiver: sourceValue(receiver, receiverType),
        sourceResult: sourceValue(expression, sourceResultType),
        target: "acme",
      },
      () => {
        throw new Error("owned property reached core");
      },
      (value, evidence) => {
        host.facts.set(expression, targetOperationFactKey, value.operation, evidence);
      },
      { requireOwner: true },
    );
  };

  run(firstResultType);
  run(secondResultType);

  assert.equal(mapperRuns, 1);
  assert.equal(host.diagnostics.all().length, 1);
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "CHECKED_OPERATION_REQUEST_CONFLICT");
  assert.deepEqual(host.diagnostics.all()[0]?.evidence?.[0]?.details, ["sourceResult"]);
  assert.equal(host.facts.get(expression, targetOperationFactKey), undefined);
  assert.equal(host.finalized, false);
  assert.throws(() => host.finalizeSemantics(), /semantic finalization previously failed/);
});

const selectedCallFactKey = defineExtensionFactKey<{ readonly id: string }>({
  extensionId: "acme.lifecycle-test",
  name: "selectedCall",
  equals: (left, right) => left.id === right.id,
});

function sourceType(type: ExtensionFactSubject): SelectedSourceTypeEvidence {
  return Object.freeze({ type });
}

function sourceValue(expression: ExtensionFactSubject, type: ExtensionFactSubject): SelectedSourceValueEvidence {
  return Object.freeze({ expression, type });
}

function sourceArgumentBinding(
  selectedArgumentType: ExtensionFactSubject,
  selectedParameterType: ExtensionFactSubject,
  sourceArgumentIndex: number,
  sourceParameterIndex: number,
): SourceSelectedCallArgumentBinding {
  return Object.freeze({
    sourceArgumentIndex,
    effectiveArgumentIndex: sourceArgumentIndex,
    sourceForm: "value",
    sourceParameterIndex,
    sourceParameterForm: "parameter",
    selectedArgumentType,
    selectedParameterType,
  });
}

function checkedCallRequest(
  call: ExtensionFactSubject,
  callee: ExtensionFactSubject,
  receiver: ExtensionFactSubject,
  receiverType: ExtensionFactSubject,
): CheckedCallMappingRequest {
  return Object.freeze({
    call,
    callee,
    arguments: Object.freeze([]),
    sourceArgumentBindings: Object.freeze([]),
    sourceCallee: sourceValue(callee, {}),
    sourceArguments: Object.freeze([]),
    sourceResult: sourceValue(call, {}),
    sourceReceiver: sourceValue(receiver, receiverType),
    target: "acme",
  });
}

function runDeferredCall(
  host: ExtensionHost,
  call: ExtensionFactSubject,
  receiver: ExtensionFactSubject,
  receiverType: ExtensionFactSubject,
): void {
  host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedCall,
    checkedCallRequest(call, {}, receiver, receiverType),
    () => {
      throw new Error("owned call reached core");
    },
    (value, evidence) => {
      if (value.kind !== "target") {
        throw new Error("Expected a retained target call mapping.");
      }
      host.facts.set(call, selectedCallFactKey, { id: value.selectedSignature.member.id }, evidence);
    },
    { requireOwner: true },
  );
}

function lifecycleExtension(options: {
  readonly beforeFinalization?: (host: ExtensionHost) => void;
  readonly call?: NonNullable<TargetSemanticProvider["mapCheckedCall"]>;
  readonly property?: NonNullable<TargetSemanticProvider["mapCheckedPropertyAccess"]>;
  readonly operator?: NonNullable<TargetSemanticProvider["mapCheckedOperator"]>;
  readonly iteration?: NonNullable<TargetSemanticProvider["mapCheckedIteration"]>;
  readonly conversion?: NonNullable<TargetSemanticProvider["mapCheckedConversion"]>;
}): CompilerExtension {
  return {
    identity: {
      id: "acme-lifecycle-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-lifecycle",
    },
    initialize(context): void {
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        options.beforeFinalization?.(lifecycleContext.host);
      });
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "acme-lifecycle-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        ...(options.call === undefined ? {} : { mapCheckedCall: options.call }),
        ...(options.property === undefined ? {} : { mapCheckedPropertyAccess: options.property }),
        ...(options.operator === undefined ? {} : { mapCheckedOperator: options.operator }),
        ...(options.iteration === undefined ? {} : { mapCheckedIteration: options.iteration }),
        ...(options.conversion === undefined ? {} : { mapCheckedConversion: options.conversion }),
      }), true);
    },
  };
}

function operation(targetOperation: string, operationKind: TargetOperationFact["operationKind"]): TargetOperationFact {
  return {
    operationId: targetOperation,
    operationKind,
    targetOperation,
  };
}
