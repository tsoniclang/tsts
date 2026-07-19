import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import { Background } from "../go/context.js";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { Type } from "../internal/checker/types.js";
import { Type_Symbol } from "../internal/checker/types.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import {
  NewProgram,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  defineExtensionFactKey,
  deferObservation,
  finalizeExtensionSemantics,
  rejectObservation,
  runtimeCarrierFactKey,
  selectedTargetSignatureFactKey,
  targetOperationFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  CompilerExtension,
  ExtensionFactSubject,
  ExtensionHost,
  TargetCallArgumentConversionSlot,
  TargetOperationFact,
  TargetOperationProposal,
} from "./index.js";
import { extensionHostSetFact } from "./host.js";

const lifecycleReadyFactKey = defineExtensionFactKey<{ readonly ready: true }>({
  extensionId: "acme.lifecycle-program-test",
  name: "lifecycleReady",
  snapshot: () => Object.freeze({ ready: true as const }),
  equals: (left, right) => left.ready === right.ready,
});

test("normal checking finalizes generic receiver calls and property assignment from retained evidence", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const elementRequests: CheckedElementAccessMappingRequest[] = [];
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const operatorRequests: CheckedOperatorMappingRequest[] = [];
  const lifecycleSubject = Object.freeze({});
  const carrierIds = new Map<ExtensionFactSubject, string>();
  const memberIds = new WeakMap<object, string>();
  let nextMemberId = 1;
  const extension: CompilerExtension = {
    identity: {
      id: "acme-program-lifecycle-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-program-lifecycle",
    },
    initialize(context): void {
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        lifecycleContext.host[extensionHostSetFact](lifecycleSubject, lifecycleReadyFactKey, Object.freeze({ ready: true as const }));
      });
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "acme-program-lifecycle-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedPropertyAccess: (request, observationContext) => {
          propertyRequests.push(request);
          const receiverType = request.sourceReceiver.type;
          if (receiverType === undefined) {
            return deferObservation;
          }
          if (observationContext.facts.get(lifecycleSubject, lifecycleReadyFactKey) === undefined) {
            return deferObservation;
          }
          const carrierId = carrierIds.get(receiverType) ?? `Box<${carrierIds.size + 1}>`;
          carrierIds.set(receiverType, carrierId);
          const selectedMember = request.accessMode === "write" ? request.sourceWriteType : request.sourceReadResult;
          return acceptObservation({
            operation: operation(`${carrierId}.${identityId(selectedMember.selectedDeclaration, memberIds, () => nextMemberId++)}`, "property"),
          });
        },
        mapCheckedElementAccess: (request, observationContext) => {
          elementRequests.push(request);
          const receiverType = request.sourceReceiver.type;
          if (receiverType === undefined) {
            return deferObservation;
          }
          if (observationContext.facts.get(lifecycleSubject, lifecycleReadyFactKey) === undefined) {
            return deferObservation;
          }
          const carrierId = carrierIds.get(receiverType) ?? `Box<${carrierIds.size + 1}>`;
          carrierIds.set(receiverType, carrierId);
          return acceptObservation({
            operation: operation(`${carrierId}.element`, "indexer"),
          });
        },
        mapCheckedCall: (request, observationContext) => {
          callRequests.push(request);
          if (request.sourceReceiver === undefined) {
            return acceptObservation(callResult("Box.constructor", request));
          }
          const receiverType = request.sourceReceiver.type;
          if (receiverType === undefined) {
            return deferObservation;
          }
          const ready = observationContext.facts.get(lifecycleSubject, lifecycleReadyFactKey);
          const calleeOperation = observationContext.facts.get(request.callee, targetOperationFactKey);
          if (ready === undefined || calleeOperation === undefined) {
            return deferObservation;
          }
          const carrierId = carrierIds.get(receiverType) ?? `Box<${carrierIds.size + 1}>`;
          carrierIds.set(receiverType, carrierId);
          return acceptObservation(callResult(`${carrierId}.${calleeOperation.targetOperation}`, request));
        },
        mapCheckedOperator: (request, observationContext) => {
          operatorRequests.push(request);
          const leftOperation = observationContext.facts.get(request.left, targetOperationFactKey);
          const rightOperation = observationContext.facts.get(request.right, targetOperationFactKey);
          if (leftOperation === undefined) {
            return deferObservation;
          }
          return acceptObservation({
            operation: operation(`${leftOperation?.targetOperation ?? "source"}.assign${rightOperation === undefined ? "" : `.${rightOperation.targetOperation}`}`, "operator"),
          });
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram(extension);

  assertCleanProgram(program);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Checking must not report extension diagnostics.");
  const receiverCallsBeforeFinalization = callRequests.filter((request) => request.sourceReceiver !== undefined);
  assert.equal(receiverCallsBeforeFinalization.length, 0, "A call mapper must not run before its checked callee dependency completes.");

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Finalization must not report extension diagnostics.");
  const receiverCalls = callRequests.filter((request) => request.sourceReceiver !== undefined);
  const receiverCallBySubject = new Map(receiverCalls.map((request) => [request.call, request]));
  const finalizedReceiverCalls = [...receiverCallBySubject.values()];
  const finalizedCalls = [...new Map(callRequests.map((request) => [request.call, request])).values()];
  assert.equal(finalizedCalls.filter((request) => request.callKind === "construct").length, 2);
  assert.ok(finalizedCalls.filter((request) => request.callKind === "construct").every((request) => request.sourceReceiver === undefined));
  assert.equal(receiverCalls.length, 5);
  assert.equal(finalizedReceiverCalls.length, 5);
  assert.ok(finalizedReceiverCalls.every((request) => receiverCalls.filter((candidate) => candidate.call === request.call).length === 1));
  assert.equal(finalizedReceiverCalls.filter((request) => request.chainRole.kind === "optional-chain").length, 1);
  assert.ok(finalizedReceiverCalls.every((request) => request.sourceReceiver !== undefined));
  const selectedReceiverTypes = [...new Set(receiverCalls.map((request) => request.sourceReceiver!.type))];
  assert.equal(selectedReceiverTypes.length, 2);
  assert.ok(selectedReceiverTypes[0] !== selectedReceiverTypes[1], "Distinct generic receiver instantiations must retain distinct source type subjects.");
  assert.ok(
    carrierIds.get(selectedReceiverTypes[0]!) !== carrierIds.get(selectedReceiverTypes[1]!),
    "Distinct receiver instantiations must map to distinct carriers.",
  );

  for (const request of finalizedReceiverCalls) {
    const selected = extensionHost.facts.get(request.call, selectedTargetSignatureFactKey);
    assert.ok(selected !== undefined);
    assert.ok(selected.sourceReceiver !== request.sourceReceiver, "Finalized facts must snapshot the receiver evidence envelope.");
    assert.equal(Object.isFrozen(selected.sourceReceiver), true);
    assert.ok(selected.sourceReceiver?.expression === request.sourceReceiver?.expression, "Finalized call evidence must retain the exact receiver expression subject.");
    assert.ok(selected.sourceReceiver?.type === request.sourceReceiver?.type, "Finalized call evidence must retain the exact instantiated receiver type.");
    assert.deepEqual(selected.sourceChainRole, request.chainRole);
    assert.equal(selected.sourceCallKind, request.callKind);
  }
  assert.ok(finalizedReceiverCalls.every((request) => {
    const selected = extensionHost.facts.get(request.call, selectedTargetSignatureFactKey);
    return selected?.targetTypeArguments === undefined;
  }), "A nongeneric selected target signature must canonicalize to no target type-argument field.");
  const assignmentRequests = operatorRequests.filter((request) => request.operator === "=");
  assert.equal(assignmentRequests.length, 3);
  assert.ok(assignmentRequests.every((request) => request.sourceResult.type !== undefined));
  assert.ok(assignmentRequests.every((request) => extensionHost.facts.get(request.left, targetOperationFactKey) !== undefined));
  assert.ok(assignmentRequests.every((request) => extensionHost.facts.get(request.expression, targetOperationFactKey)?.operationKind === "operator"));
  assert.ok(assignmentRequests.every((request) => {
    const sourceOperation = extensionHost.facts.get(request.expression, targetOperationFactKey)?.provenance.sourceOperation;
    return sourceOperation?.sourceOperationKind === "operator" && sourceOperation.sourceResult.type === request.sourceResult.type;
  }));
  const nestedAssignmentRequest = assignmentRequests.find((request) => extensionHost.facts.get(request.right, targetOperationFactKey) !== undefined);
  assert.ok(nestedAssignmentRequest !== undefined);
  const nestedAssignmentFact = extensionHost.facts.get(nestedAssignmentRequest.expression, targetOperationFactKey);
  const nestedRightFact = extensionHost.facts.get(nestedAssignmentRequest.right, targetOperationFactKey);
  assert.equal(nestedAssignmentFact?.operationKind, "operator");
  assert.ok(nestedRightFact !== undefined);
  assert.ok(nestedAssignmentFact?.targetOperation.endsWith(`.${nestedRightFact.targetOperation}`));
  const optionalPropertyRequest = propertyRequests.find((request) => request.chainRole.kind === "optional-chain");
  assert.ok(optionalPropertyRequest !== undefined);
  const optionalPropertySource = extensionHost.facts.get(optionalPropertyRequest.expression, targetOperationFactKey)?.provenance.sourceOperation;
  assert.equal(optionalPropertySource?.sourceOperationKind, "property-access");
  if (optionalPropertySource?.sourceOperationKind !== "property-access") {
    throw new Error("Expected property-access source operation provenance.");
  }
  assert.equal(optionalPropertySource.chainRole.kind, "optional-chain");
  assert.equal(optionalPropertySource.use, "call-callee");
  assert.equal(optionalPropertySource.accessMode, "read");
  const finalizedElementRequests = [...new Map(elementRequests.map((request) => [request.expression, request])).values()];
  assert.equal(finalizedElementRequests.length, 2);
  assert.ok(finalizedElementRequests.every((request) => request.sourceReceiver.type !== undefined));
  assert.ok(finalizedElementRequests.every((request) => extensionHost.facts.get(request.expression, targetOperationFactKey)?.operationKind === "indexer"));
  const optionalElementRequest = finalizedElementRequests.find((request) => request.chainRole.kind === "optional-chain");
  assert.ok(optionalElementRequest !== undefined);
  const optionalElementSource = extensionHost.facts.get(optionalElementRequest.expression, targetOperationFactKey)?.provenance.sourceOperation;
  assert.equal(optionalElementSource?.sourceOperationKind, "element-access");
  if (optionalElementSource?.sourceOperationKind !== "element-access") {
    throw new Error("Expected element-access source operation provenance.");
  }
  assert.equal(optionalElementSource.chainRole.kind, "optional-chain");
  assert.equal(optionalElementSource.use, "value");
  assert.equal(optionalElementSource.accessMode, "read");
  assert.ok(propertyRequests.some((request) => request.propertyName === "value"));
});

test("retained operations demand exact structural runtime carriers without eager type scanning", () => {
  const extensionId = "acme.structural-carrier-extension";
  const requestedByMappers = new Set<ExtensionFactSubject>();
  const runtimeRequests: Array<{ readonly type: ExtensionFactSubject; readonly phase: "checking" | "finalization" }> = [];
  const acceptedTypes = new Set<ExtensionFactSubject>();
  const unretainedType = Object.freeze({});
  let unusedIndexType: ExtensionFactSubject | undefined;
  let elementReceiverType: ExtensionFactSubject | undefined;
  let rejectedReceiverType: ExtensionFactSubject | undefined;
  const carrierIds = new WeakMap<object, number>();
  let nextCarrierId = 1;
  const carrierFor = (type: ExtensionFactSubject) => {
    let id = carrierIds.get(type);
    if (id === undefined) {
      id = nextCarrierId++;
      carrierIds.set(type, id);
    }
    return { kind: "opaque" as const, id: `acme.structural.${id}` };
  };
  const carrierExtension: CompilerExtension = {
    identity: {
      id: "acme.structural-carrier-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-structural-carrier-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "acme.structural-carrier-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        resolveRuntimeCarrier: (request, observationContext) => {
          assert.equal(requestedByMappers.has(request.type), true, "Runtime carriers must be demand-driven by an active exact mapper request.");
          runtimeRequests.push({ type: request.type, phase: observationContext.phase });
          if (observationContext.phase === "checking") {
            return deferObservation;
          }
          acceptedTypes.add(request.type);
          return acceptObservation({ carrier: carrierFor(request.type) });
        },
      }), true);
    },
  };
  const extension: CompilerExtension = {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: "acme-structural-carrier",
      diagnosticRange: { start: 9_120_000, end: 9_120_099 },
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "acme.structural-operation-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request, observationContext) => {
          if (request.sourceReceiver === undefined) {
            return deferObservation;
          }
          requestedByMappers.add(request.sourceReceiver.type);
          const carrier = observationContext.factResolver.resolve(request.sourceReceiver.type, runtimeCarrierFactKey);
          return carrier === undefined
            ? deferObservation
            : acceptObservation(callResult("acme.structural.call", request));
        },
        mapCheckedPropertyAccess: (request, observationContext) => {
          requestedByMappers.add(request.sourceReceiver.type);
          const carrier = observationContext.factResolver.resolve(request.sourceReceiver.type, runtimeCarrierFactKey);
          if (carrier === undefined) {
            return deferObservation;
          }
          if (request.propertyName === "denied") {
            rejectedReceiverType = request.sourceReceiver.type;
            return rejectObservation({
              extensionId,
              extensionCode: "ACME_STRUCTURAL_DENIED",
              numericCode: 9_120_001,
              category: "error",
              message: "The neutral rollback lane rejects after resolving its exact carrier.",
              nodeOrSpan: request.expression,
            });
          }
          return acceptObservation({ operation: operation("acme.structural.property", "property") });
        },
        mapCheckedElementAccess: (request, observationContext) => {
          assert.equal(observationContext.factResolver.resolve(unretainedType, runtimeCarrierFactKey), undefined);
          unusedIndexType = request.sourceArgument.type;
          elementReceiverType = request.sourceReceiver.type;
          requestedByMappers.add(request.sourceReceiver.type);
          const carrier = observationContext.factResolver.resolve(request.sourceReceiver.type, runtimeCarrierFactKey);
          const repeatedCarrier = observationContext.factResolver.resolve(request.sourceReceiver.type, runtimeCarrierFactKey);
          assert.equal(repeatedCarrier, carrier, "Repeated exact demand in one mapper attempt must be bounded and idempotent.");
          return carrier === undefined
            ? deferObservation
            : acceptObservation({ operation: operation("acme.structural.element", "indexer") });
        },
        mapCheckedOperator: (request, observationContext) => {
          const operandType = request.operatorKind === "binary" ? request.sourceLeft.type : request.sourceOperand.type;
          requestedByMappers.add(operandType);
          const carrier = observationContext.factResolver.resolve(operandType, runtimeCarrierFactKey);
          return carrier === undefined
            ? deferObservation
            : acceptObservation({ operation: operation("acme.structural.operator", "operator") });
        },
        mapCheckedConversion: (request, observationContext) => {
          requestedByMappers.add(request.source.type);
          const sourceCarrier = observationContext.factResolver.resolve(request.source.type, runtimeCarrierFactKey);
          const targetType = request.conversionKind === "assertion"
            ? request.target.type
            : request.sourceBinding.selectedParameterType;
          requestedByMappers.add(targetType);
          const targetCarrier = observationContext.factResolver.resolve(targetType, runtimeCarrierFactKey);
          return sourceCarrier === undefined || targetCarrier === undefined
            ? deferObservation
            : acceptObservation({ convertedType: targetCarrier.carrier });
        },
        mapCheckedIteration: (request, observationContext) => {
          requestedByMappers.add(request.sourceIterable.type);
          const carrier = observationContext.factResolver.resolve(request.sourceIterable.type, runtimeCarrierFactKey);
          return carrier === undefined
            ? deferObservation
            : acceptObservation({ operation: operation("acme.structural.iterate", "iteration") });
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram([carrierExtension, extension], `
    const one: 1 = 1;
    declare class Box<T> { clear(): void; }

    export function call(box: Box<string>): void {
      box.clear();
    }

    export function tuple(pair: [number, string]): string {
      return pair[one];
    }

    export function property(point: { value: number }): number {
      return point.value;
    }

    export function operator(value: number): number {
      return -value;
    }

    export function conversion(value: unknown): { value: number } {
      return value as { value: number };
    }

    export function iteration(values: number[]): number {
      for (const value of values) {
        return value;
      }
      return 0;
    }

    export function rejected(value: { denied: number }): number {
      return value.denied;
    }
  `);

  assertCleanProgram(program);
  assert.ok(runtimeRequests.length > 0);
  assert.ok(runtimeRequests.every((request) => request.phase === "checking"));
  assert.ok([...requestedByMappers].every((type) => extensionHost.facts.get(type, runtimeCarrierFactKey) === undefined));

  finalizeExtensionSemantics(programOptions);

  assert.ok(runtimeRequests.some((request) => request.phase === "finalization"));
  assert.ok(acceptedTypes.size >= 5, "Every mapper-requested structural family must finalize independently.");
  for (const type of acceptedTypes) {
    if (type !== rejectedReceiverType) {
      assert.ok(extensionHost.facts.get(type, runtimeCarrierFactKey) !== undefined);
    }
  }
  assert.ok(rejectedReceiverType !== undefined);
  assert.equal(extensionHost.facts.get(rejectedReceiverType, runtimeCarrierFactKey), undefined, "Rejected operation effects must roll back their demanded carrier.");
  assert.ok(unusedIndexType !== undefined);
  assert.equal(runtimeRequests.some((request) => request.type === unusedIndexType), false, "Retained evidence that no mapper requests must not trigger eager carrier resolution.");
  assert.ok(elementReceiverType !== undefined);
  assert.equal(runtimeRequests.filter((request) => request.type === elementReceiverType && request.phase === "checking").length, 1);
  assert.equal(runtimeRequests.filter((request) => request.type === elementReceiverType && request.phase === "finalization").length, 1);
  assert.equal(extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "ACME_STRUCTURAL_DENIED").length, 1);
});

test("checked member requests retain exact access use without target-side AST inspection", () => {
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const elementRequests: CheckedElementAccessMappingRequest[] = [];
  const extensionId = "acme-exact-access-use-extension";
  const extension: CompilerExtension = {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedPropertyAccess: (request) => {
          propertyRequests.push(request);
          return acceptObservation({ operation: operation(`property.${request.propertyName}.${request.accessMode}.${request.use}`, "property") });
        },
        mapCheckedElementAccess: (request) => {
          elementRequests.push(request);
          return acceptObservation({ operation: operation(`element.${request.accessMode}.${request.use}`, "indexer") });
        },
        mapCheckedCall: () => acceptObservation({ kind: "source" }),
        mapCheckedOperator: () => acceptObservation({ operation: operation("operator", "operator") }),
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram(extension, `
    declare class AccessBox {
      value: number;
      optional?: number;
      update(): void;
      handler: () => void;
    }
    declare const box: AccessBox;
    declare const table: { [key: string]: () => void };
    declare const numbers: { [key: string]: number };
    declare const optionalNumbers: { [key: string]: number | undefined };

    box.value;
    box.value = 1;
    box.value += 1;
    box.value++;
    delete box.optional;
    box.update();
    const update = box.update;
    box.handler();
    const handler = box.handler;
    box?.update();
    table["go"]();
    const indexed = table["go"];
    numbers["x"] = 1;
    numbers["x"] += 1;
    numbers["x"]++;
    delete optionalNumbers["x"];
  `);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);
  assert.equal(extensionHost.diagnostics.all().length, 0);

  assert.deepEqual(propertyRequests.map((request) => [request.propertyName, request.accessMode, request.use === "call-callee", request.chainRole.kind === "optional-chain"]), [
    ["value", "read", false, false],
    ["value", "write", false, false],
    ["value", "read-write", false, false],
    ["value", "read-write", false, false],
    ["optional", "delete", false, false],
    ["update", "read", true, false],
    ["update", "read", false, false],
    ["handler", "read", true, false],
    ["handler", "read", false, false],
    ["update", "read", true, true],
  ]);
  assert.deepEqual(elementRequests.map((request) => [request.accessMode, request.use === "call-callee"]), [
    ["read", true],
    ["read", false],
    ["write", false],
    ["read-write", false],
    ["read-write", false],
    ["delete", false],
  ]);
  for (const request of [...propertyRequests, ...elementRequests]) {
    const sourceOperation = extensionHost.facts.get(request.expression, targetOperationFactKey)?.provenance.sourceOperation;
    assert.ok(sourceOperation?.sourceOperationKind === "property-access" || sourceOperation?.sourceOperationKind === "element-access");
    assert.equal(sourceOperation.accessMode, request.accessMode);
    assert.equal(sourceOperation.use, request.use);
  }
});

test("a call-only provider retains exact property-callee receiver evidence without owning all properties", () => {
  const receiverCalls: CheckedCallMappingRequest[] = [];
  const extensionId = "acme-call-only-receiver-extension";
  const extension: CompilerExtension = {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request) => {
          if (request.sourceReceiver !== undefined) {
            receiverCalls.push(request);
          }
          return acceptObservation(callResult(`call-only-${receiverCalls.length}`, request));
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram(extension);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);

  assert.ok(receiverCalls.length > 0);
  assert.ok(receiverCalls.every((request) => request.sourceReceiver !== undefined));
  assert.ok(receiverCalls.every((request) => extensionHost.facts.get(request.callee, targetOperationFactKey) === undefined));
  assert.equal(extensionHost.diagnostics.all().length, 0, "Call-only mapping must not report extension diagnostics.");
});

test("call-only mapping retains real nested callee inputs without synthesizing property or element operations", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const observations: string[] = [];
  const extensionId = "acme-call-only-input-extension";
  const extension: CompilerExtension = {
    identity: {
      id: extensionId,
      version: "1.0.0",
      capabilityNamespace: extensionId,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request, observationContext) => {
          callRequests.push(request);
          const kind = request.sourceReceiver === undefined ? "input" : "receiver";
          observations.push(`${kind}:${observationContext.phase}`);
          if (kind === "input" && observationContext.phase === "checking") {
            return deferObservation;
          }
          return acceptObservation(callResult(`call-${callRequests.length}`, request));
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram(extension, `
    declare class Box<T> { get(): T; }
    declare function makeBox(): Box<string>;
    declare function key(): string;
    declare const dispatch: { [name: string]: (value: string) => void };
    declare const box: Box<string>;

    makeBox().get();
    dispatch[key()]("value");
    (box.get)();
    box?.get();
  `);

  assertCleanProgram(program);
  assert.equal(callRequests.length, 4, "Source checking must evaluate ready calls and retain unavailable input-dependent calls.");
  assert.equal(observations.filter((entry) => entry === "input:checking").length, 2);
  assert.equal(observations.filter((entry) => entry === "receiver:checking").length, 2);
  finalizeExtensionSemantics(programOptions);

  assert.equal(callRequests.length, 8, "Finalization must replay only the two deferred inputs and their two blocked dependents.");
  const receiverCalls = callRequests.filter((request) => request.sourceReceiver !== undefined);
  const inputCalls = callRequests.filter((request) => request.sourceReceiver === undefined);
  assert.equal(receiverCalls.length, 4);
  assert.equal(inputCalls.length, 4);
  assert.equal(new Set(callRequests.map((request) => request.call)).size, 6);
  assert.equal(receiverCalls.filter((request) => request.chainRole.kind === "optional-chain").length, 1);
  assert.ok(receiverCalls.every((request) => extensionHost.facts.get(request.callee, targetOperationFactKey) === undefined));
  assert.equal(observations.filter((entry) => entry === "input:checking").length, 2);
  assert.equal(observations.filter((entry) => entry === "receiver:checking").length, 2);
  assert.equal(observations.filter((entry) => entry === "input:finalization").length, 2);
  assert.equal(observations.filter((entry) => entry === "receiver:finalization").length, 2);
  assert.ok([...new Set(callRequests.map((request) => request.call))]
    .every((call) => extensionHost.facts.get(call, selectedTargetSignatureFactKey) !== undefined));
  assert.equal(extensionHost.diagnostics.all().length, 0, "Nested call finalization must not report extension diagnostics.");
});

test("property mapper receives TS-Go member-selection receiver types", () => {
  const observedTypes = new Map<string, string | undefined>();
  const extension: CompilerExtension = {
    identity: {
      id: "member-selection-receiver-observer",
      version: "1.0.0",
      capabilityNamespace: "member-selection-receiver-observer",
    },
    observationOwners: [ExtensionObservationPoint.mapCheckedPropertyAccess],
    initialize(context): void {
      context.registerObservation(ExtensionObservationPoint.mapCheckedPropertyAccess, (request) => {
        const memberSelectionType = request.sourceReceiver.type as GoPtr<Type>;
        observedTypes.set(request.propertyName, Type_Symbol(memberSelectionType)?.Name);
        return acceptObservation({ operation: operation(`member.${request.propertyName}`, "property") });
      });
    },
  };
  const { program, programOptions, extensionHost } = createMemberSelectionProgram(extension);

  assertCleanProgram(program);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Member-selection checking must not report extension diagnostics.");
  assert.equal(observedTypes.size, 2, "Ready member selections must expose their exact receiver types during source checking.");
  const checkingTypes = new Map(observedTypes);
  finalizeExtensionSemantics(programOptions);
  assert.deepEqual(observedTypes, checkingTypes, "Finalization must not replay already committed member selections.");
  assert.equal(observedTypes.size, 2);
  assert.equal(observedTypes.get("genericMember"), "MemberConstraint");
  assert.equal(observedTypes.get("primitiveMember"), "String");
});

function operation(targetOperation: string, operationKind: TargetOperationFact["operationKind"]): TargetOperationProposal {
  return {
    operationId: targetOperation,
    operationKind,
    targetOperation,
  };
}

function targetSignature(id: string, parameterCount: number) {
  return {
    member: {
      id,
      sourceName: id,
      targetName: id,
      kind: id.endsWith("constructor") ? "constructor" as const : "method" as const,
      parameters: Array.from({ length: parameterCount }, (_, index) => ({
        name: `argument${index}`,
        type: { kind: "target-specific" as const, target: "acme", name: "value" },
        passingMode: "by-value" as const,
      })),
    },
  };
}

function callResult(id: string, request: CheckedCallMappingRequest) {
  return {
    kind: "target" as const,
    selectedSignature: targetSignature(id, request.arguments.length),
    argumentConversions: [] as TargetCallArgumentConversionSlot[],
  };
}

function identityId(subject: ExtensionFactSubject | undefined, ids: WeakMap<object, string>, allocate: () => number): string {
  if (subject === undefined) {
    return "unselected";
  }
  const existing = ids.get(subject);
  if (existing !== undefined) {
    return existing;
  }
  const created = `member${allocate()}`;
  ids.set(subject, created);
  return created;
}

function createLifecycleProgram(extension: CompilerExtension | readonly CompilerExtension[], sourceText?: string): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
} {
  const files = new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ["/src/index.ts", sourceText ?? `
      declare class Box<T> {
        constructor();
        [index: number]: T;
        value: T;
        put(value: T): void;
        get(): T;
        clear(): void;
      }

      const strings: Box<string> = new Box<string>();
      strings.put("value");
      strings.get();
      strings?.get();
      strings.clear();
      strings[0];
      strings?.[0];
      strings.value = "next";
      strings.value = strings.value = "nested";

      const numbers: Box<number> = new Box<number>();
      numbers.clear();
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]);
  let fs = FromMap(files, false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const baseOptions = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(baseOptions, {
    activeTarget: "acme",
    extensions: Array.isArray(extension) ? [...extension] : [extension as CompilerExtension],
  });
  const program = NewProgram(extended.program);
  return { program, programOptions: extended.program, extensionHost: extended.extensionHost };
}

function createMemberSelectionProgram(extension: CompilerExtension): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
} {
  const files = new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ["/src/index.ts", `
      interface MemberConstraint {
        genericMember(): number;
      }
      interface String {
        readonly primitiveMember: number;
      }

      function readMember<T extends MemberConstraint>(receiver: T): number {
        return receiver.genericMember();
      }

      declare const primitiveReceiver: string;
      const primitiveMember = primitiveReceiver.primitiveMember;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]);
  let fs = FromMap(files, false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const programOptions = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(programOptions, { extensions: [extension] });
  const program = NewProgram(extended.program);
  return { program, programOptions: extended.program, extensionHost: extended.extensionHost };
}

function assertCleanProgram(program: GoPtr<Program>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
    const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
    assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
    assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
  }
}

const sourceProfile = `
  interface Object {}
  interface Function {}
  interface CallableFunction extends Function {}
  interface NewableFunction extends Function {}
  interface IArguments {}
  interface String {}
  interface Number {}
  interface Boolean {}
  interface RegExp {}
  interface Array<T> { readonly length: number; [index: number]: T; }
`;
