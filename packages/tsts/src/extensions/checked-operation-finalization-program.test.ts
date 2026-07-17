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
} from "./index.js";

const receiverCarrierFactKey = defineExtensionFactKey<{ readonly id: string }>({
  extensionId: "acme.lifecycle-program-test",
  name: "receiverCarrier",
  equals: (left, right) => left.id === right.id,
});

test("normal checking finalizes generic receiver calls and property assignment from retained evidence", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const elementRequests: CheckedElementAccessMappingRequest[] = [];
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const operatorRequests: CheckedOperatorMappingRequest[] = [];
  const receiverTypes = new Set<ExtensionFactSubject>();
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
        let carrierIndex = 1;
        for (const receiverType of receiverTypes) {
          const carrierId = `Box<${carrierIndex}>`;
          carrierIndex += 1;
          carrierIds.set(receiverType, carrierId);
          lifecycleContext.host.facts.set(receiverType, receiverCarrierFactKey, { id: carrierId });
        }
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
          receiverTypes.add(receiverType);
          const carrier = observationContext.facts.get(receiverType, receiverCarrierFactKey);
          if (carrier === undefined) {
            return deferObservation;
          }
          return acceptObservation({
            operation: operation(`${carrier.id}.${identityId(request.sourceResult.selectedDeclaration, memberIds, () => nextMemberId++)}`, "property"),
          });
        },
        mapCheckedElementAccess: (request, observationContext) => {
          elementRequests.push(request);
          const receiverType = request.sourceReceiver.type;
          if (receiverType === undefined) {
            return deferObservation;
          }
          receiverTypes.add(receiverType);
          const carrier = observationContext.facts.get(receiverType, receiverCarrierFactKey);
          if (carrier === undefined) {
            return deferObservation;
          }
          return acceptObservation({
            operation: operation(`${carrier.id}.element`, "indexer"),
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
          receiverTypes.add(receiverType);
          const carrier = observationContext.facts.get(receiverType, receiverCarrierFactKey);
          const calleeOperation = observationContext.facts.get(request.callee, targetOperationFactKey);
          if (carrier === undefined || calleeOperation === undefined) {
            return deferObservation;
          }
          return acceptObservation(callResult(`${carrier.id}.${calleeOperation.targetOperation}`, request));
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
  assert.equal(finalizedReceiverCalls.filter((request) => request.optionalChain === true).length, 1);
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
    assert.equal(selected.sourceOptionalChain, request.optionalChain);
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
  assert.ok(assignmentRequests.every((request) =>
    extensionHost.facts.get(request.expression, targetOperationFactKey)?.provenance?.sourceResultType === request.sourceResult.type));
  const nestedAssignmentRequest = assignmentRequests.find((request) => extensionHost.facts.get(request.right, targetOperationFactKey) !== undefined);
  assert.ok(nestedAssignmentRequest !== undefined);
  const nestedAssignmentFact = extensionHost.facts.get(nestedAssignmentRequest.expression, targetOperationFactKey);
  const nestedRightFact = extensionHost.facts.get(nestedAssignmentRequest.right, targetOperationFactKey);
  assert.equal(nestedAssignmentFact?.operationKind, "operator");
  assert.ok(nestedRightFact !== undefined);
  assert.ok(nestedAssignmentFact?.targetOperation.endsWith(`.${nestedRightFact.targetOperation}`));
  const optionalPropertyRequest = propertyRequests.find((request) => request.optionalChain === true);
  assert.ok(optionalPropertyRequest !== undefined);
  assert.equal(extensionHost.facts.get(optionalPropertyRequest.expression, targetOperationFactKey)?.provenance?.sourceOptionalChain, true);
  assert.equal(extensionHost.facts.get(optionalPropertyRequest.expression, targetOperationFactKey)?.provenance?.sourceCallCallee, true);
  assert.equal(extensionHost.facts.get(optionalPropertyRequest.expression, targetOperationFactKey)?.provenance?.sourceAccessMode, "read");
  const finalizedElementRequests = [...new Map(elementRequests.map((request) => [request.expression, request])).values()];
  assert.equal(finalizedElementRequests.length, 2);
  assert.ok(finalizedElementRequests.every((request) => request.sourceReceiver.type !== undefined));
  assert.ok(finalizedElementRequests.every((request) => extensionHost.facts.get(request.expression, targetOperationFactKey)?.operationKind === "indexer"));
  const optionalElementRequest = finalizedElementRequests.find((request) => request.optionalChain === true);
  assert.ok(optionalElementRequest !== undefined);
  assert.equal(extensionHost.facts.get(optionalElementRequest.expression, targetOperationFactKey)?.provenance?.sourceOptionalChain, true);
  assert.equal(extensionHost.facts.get(optionalElementRequest.expression, targetOperationFactKey)?.provenance?.sourceCallCallee, false);
  assert.equal(extensionHost.facts.get(optionalElementRequest.expression, targetOperationFactKey)?.provenance?.sourceAccessMode, "read");
  assert.ok(propertyRequests.some((request) => request.propertyName === "value"));
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
          return acceptObservation({ operation: operation(`property.${request.propertyName}.${request.accessMode}.${request.callCallee}`, "property") });
        },
        mapCheckedElementAccess: (request) => {
          elementRequests.push(request);
          return acceptObservation({ operation: operation(`element.${request.accessMode}.${request.callCallee}`, "indexer") });
        },
        mapCheckedCall: () => acceptObservation({ kind: "source" }),
        mapCheckedOperator: () => acceptObservation({ operation: operation("operator", "operator") }),
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createLifecycleProgram(extension, `
    declare class AccessBox {
      value: number;
      update(): void;
      handler: () => void;
    }
    declare const box: AccessBox;
    declare const table: { [key: string]: () => void };
    declare const numbers: { [key: string]: number };

    box.value;
    box.value = 1;
    box.value += 1;
    box.update();
    const update = box.update;
    box.handler();
    const handler = box.handler;
    box?.update();
    table["go"]();
    const indexed = table["go"];
    numbers["x"] = 1;
    numbers["x"] += 1;
  `);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);
  assert.equal(extensionHost.diagnostics.all().length, 0);

  assert.deepEqual(propertyRequests.map((request) => [request.propertyName, request.accessMode, request.callCallee, request.optionalChain === true]), [
    ["value", "read", false, false],
    ["value", "write", false, false],
    ["value", "read-write", false, false],
    ["update", "read", true, false],
    ["update", "read", false, false],
    ["handler", "read", true, false],
    ["handler", "read", false, false],
    ["update", "read", true, true],
  ]);
  assert.deepEqual(elementRequests.map((request) => [request.accessMode, request.callCallee]), [
    ["read", true],
    ["read", false],
    ["write", false],
    ["read-write", false],
  ]);
  for (const request of [...propertyRequests, ...elementRequests]) {
    const provenance = extensionHost.facts.get(request.expression, targetOperationFactKey)?.provenance;
    assert.equal(provenance?.sourceAccessMode, request.accessMode);
    assert.equal(provenance?.sourceCallCallee, request.callCallee);
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
  assert.equal(callRequests.length, 4);
  assert.equal(observations.filter((entry) => entry === "input:checking").length, 2);
  assert.equal(observations.filter((entry) => entry === "receiver:checking").length, 2);
  finalizeExtensionSemantics(programOptions);

  assert.equal(callRequests.length, 8);
  const receiverCalls = callRequests.filter((request) => request.sourceReceiver !== undefined);
  const inputCalls = callRequests.filter((request) => request.sourceReceiver === undefined);
  assert.equal(receiverCalls.length, 4);
  assert.equal(inputCalls.length, 4);
  assert.equal(new Set(callRequests.map((request) => request.call)).size, 6);
  assert.equal(receiverCalls.filter((request) => request.optionalChain === true).length, 1);
  assert.ok(receiverCalls.every((request) => extensionHost.facts.get(request.callee, targetOperationFactKey) === undefined));
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
        return deferObservation;
      });
    },
  };
  const { program, extensionHost } = createMemberSelectionProgram(extension);

  assertCleanProgram(program);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Member-selection checking must not report extension diagnostics.");
  assert.equal(observedTypes.size, 2);
  assert.equal(observedTypes.get("genericMember"), "MemberConstraint");
  assert.equal(observedTypes.get("primitiveMember"), "String");
});

function operation(targetOperation: string, operationKind: TargetOperationFact["operationKind"]): TargetOperationFact {
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

function createLifecycleProgram(extension: CompilerExtension, sourceText?: string): {
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
    extensions: [extension],
  });
  const program = NewProgram(extended.program);
  return { program, programOptions: extended.program, extensionHost: extended.extensionHost };
}

function createMemberSelectionProgram(extension: CompilerExtension): {
  readonly program: GoPtr<Program>;
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
  return { program, extensionHost: extended.extensionHost };
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
