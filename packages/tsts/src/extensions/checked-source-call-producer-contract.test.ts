import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionHostDiagnosticCode,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  completeCheckedSourceCallProduction,
  defineExtensionFactKey,
  deferCheckedSourceCallProduction,
  deferObservation,
  providerVirtualDeclarationFactKey,
  rejectCheckedSourceCallProduction,
  rejectObservation,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedCallMappingResult,
  CheckedSourceCallOperation,
  CheckedPropertyAccessMappingRequest,
  CheckedSourceCallProducer,
  CheckedSourceCallProducerContext,
  CheckedSourceCallProviderSelector,
  CompilerExtension,
  CompilerExtensionKind,
  ExtensionDiagnostic,
  ExtensionEvidence,
  ExtensionFactKey,
  ExtensionFactSubject,
  ExtensionObservationResult,
  ProviderVirtualDeclarationFact,
  SelectedSourceValueEvidence,
  TargetSemanticProvider,
} from "./index.js";
import type { CheckedOperationApplyOutcome } from "./checked-operation-finalization.js";
import type { RetainedCheckedSourceCallMappingRequest } from "./source-operation-producer.js";
import {
  extensionHostHasCheckedSourceCallProducers,
  extensionHostRunCheckedOperation,
  extensionHostSetFact,
} from "./host.js";
import type { CheckedOperationReference } from "./observations.js";
import type {
  CheckedCallMappingRequest as PublicCheckedCallMappingRequest,
  CheckedSourceCallProducerContext as PublicCheckedSourceCallProducerContext,
  CheckedSourceInlinePropertyOperation as PublicCheckedSourceInlinePropertyOperation,
} from "../index.js";

type RequireTrue<T extends true> = T;
type PublicCheckedSourceCallProducerCapabilityCoverage = RequireTrue<
  "entries" extends keyof PublicCheckedSourceCallProducerContext["facts"] ? false : true
> & RequireTrue<
  "all" extends keyof PublicCheckedSourceCallProducerContext["diagnostics"] ? false : true
> & RequireTrue<
  "sourceComposition" extends keyof PublicCheckedCallMappingRequest ? false : true
> & RequireTrue<
  "propertyName" extends keyof PublicCheckedSourceInlinePropertyOperation ? false : true
> & RequireTrue<
  Parameters<PublicCheckedSourceCallProducerContext["facts"]["set"]>[0] extends ExtensionFactKey<unknown>
    ? true
    : false
>;
const publicCheckedSourceCallProducerCapabilityCoverage: PublicCheckedSourceCallProducerCapabilityCoverage = true;

const callObservation = ExtensionObservationPoint.mapCheckedCall;
const propertyObservation = ExtensionObservationPoint.mapCheckedPropertyAccess;
const contractTarget = "checked-source-call-contract-target";
const exactProviderIdentity = Object.freeze({
  providerId: "checked-source-call-contract-provider",
  providerVersion: "7.3.1",
  providerModuleId: "checked.source.call.contract.module",
  exportId: "checked.source.call.contract.export",
  signatureId: "checked.source.call.contract.export(string)",
});

interface CheckedCallFixture {
  readonly call: ExtensionFactSubject;
  readonly callee: ExtensionFactSubject;
  readonly argument: ExtensionFactSubject;
  readonly declaration: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly request: RetainedCheckedSourceCallMappingRequest;
  readonly providerDeclaration: ProviderVirtualDeclarationFact;
}

function compilerExtension(id: string, options: {
  readonly composition?: CompilerExtension["composition"];
  readonly dependsOn?: readonly string[];
  readonly initialize?: CompilerExtension["initialize"];
} = {}): CompilerExtension {
  return {
    identity: {
      id,
      version: "1.0.0",
      capabilityNamespace: id,
    },
    ...(options.composition === undefined ? {} : { composition: options.composition }),
    ...(options.dependsOn === undefined ? {} : { dependencies: { dependsOn: options.dependsOn } }),
    ...(options.initialize === undefined ? {} : { initialize: options.initialize }),
  };
}

function exportSelector(signatureId: string = exactProviderIdentity.signatureId): CheckedSourceCallProviderSelector {
  return {
    kind: "export-signature",
    providerId: exactProviderIdentity.providerId,
    providerVersion: exactProviderIdentity.providerVersion,
    providerModuleId: exactProviderIdentity.providerModuleId,
    exportId: exactProviderIdentity.exportId,
    signatureId,
  };
}

function producerExtension(
  id: string,
  producers: readonly CheckedSourceCallProducer[],
  dependsOn?: readonly string[],
): CompilerExtension {
  return compilerExtension(id, {
    composition: { kind: "source" },
    ...(dependsOn === undefined ? {} : { dependsOn }),
    initialize: (context) => {
      for (const producer of producers) {
        assert.equal(context.registerCheckedSourceCallProducer(producer), true);
      }
    },
  });
}

function targetCallExtension(
  id: string,
  mapCheckedCall: NonNullable<TargetSemanticProvider["mapCheckedCall"]>,
  dependsOn?: readonly string[],
): CompilerExtension {
  return compilerExtension(id, {
    composition: { kind: "target", target: contractTarget },
    ...(dependsOn === undefined ? {} : { dependsOn }),
    initialize: (context) => {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${id}.provider`,
          version: "1.0.0",
          target: contractTarget,
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall,
      }), true);
    },
  });
}

function selectedSourceValue(
  expression: ExtensionFactSubject,
  type: ExtensionFactSubject,
): SelectedSourceValueEvidence {
  return {
    expression,
    type,
  };
}

function createCheckedCallFixture(target = contractTarget): CheckedCallFixture {
  const call = {};
  const callee = {};
  const argument = {};
  const declaration = {};
  const signature = {};
  const receiver = {};
  const calleeType = {};
  const argumentType = {};
  const parameterType = {};
  const resultType = {};
  const receiverType = {};
  const parameterSymbol = {};
  const request: RetainedCheckedSourceCallMappingRequest = {
    sourceOperationKind: "call",
    call,
    callee,
    arguments: [argument],
    callKind: "call",
    sourceSelection: {
      kind: "applicable",
      signature,
      declaration,
      methodTypeArguments: [],
      parameters: [{
        parameterIndex: 0,
        parameterName: "text",
        parameterSymbol,
        selectedType: parameterType,
        acceptsOmission: false,
        rest: false,
      }],
      argumentBindings: [{
        sourceArgumentIndex: 0,
        effectiveArgumentIndex: 0,
        sourceForm: "value",
        sourceParameterIndex: 0,
        sourceParameterForm: "parameter",
        selectedArgumentType: argumentType,
        selectedParameterType: parameterType,
      }],
    },
    sourceCallee: {
      ...selectedSourceValue(callee, calleeType),
      selectedDeclaration: declaration,
    },
    sourceArguments: [selectedSourceValue(argument, argumentType)],
    sourceResult: selectedSourceValue(call, resultType),
    sourceReceiver: selectedSourceValue(receiver, receiverType),
    sourceComposition: {
      argumentEvidence: [{
        kind: "authored-literal",
        literal: { kind: "string", value: "literal-string-evidence" },
      }],
    },
    chainRole: {
      kind: "optional-chain",
      participant: "call",
      position: "continuation",
      boundary: "outermost",
    },
    target,
  };
  return {
    call,
    callee,
    argument,
    declaration,
    receiver,
    request,
    providerDeclaration: {
      ...exactProviderIdentity,
      moduleSpecifier: "@checked-source-call/contract.js",
      artifactFileName: "tsts-provider://checked-source-call/contract.d.ts",
      exportName: "contractCall",
    },
  };
}

function publishProviderDeclaration(host: ExtensionHost, fixture: CheckedCallFixture): void {
  assert.equal(
    host[extensionHostSetFact](fixture.declaration, providerVirtualDeclarationFactKey, fixture.providerDeclaration),
    "inserted",
  );
}

function runCheckedCall(
  host: ExtensionHost,
  fixture: CheckedCallFixture,
  onAccept: (
    value: CheckedCallMappingResult,
    evidence: readonly ExtensionEvidence[],
    request: CheckedCallMappingRequest,
  ) => void | CheckedOperationApplyOutcome = () => {},
  requireOwner = false,
): ExtensionObservationResult<CheckedCallMappingResult> {
  return host[extensionHostRunCheckedOperation](
    callObservation,
    fixture.request,
    () => ({ kind: "source" }),
    onAccept,
    requireOwner ? { requireOwner: true } : {},
  );
}

function stringFactKey(extensionId: string, name: string): ExtensionFactKey<string> {
  return defineExtensionFactKey<string>({
    extensionId,
    name,
    snapshot: (value) => {
      if (typeof value !== "string") {
        throw new Error("Expected a string fact value.");
      }
      return value;
    },
  });
}

function diagnostic(extensionId: string, extensionCode: string, message: string): ExtensionDiagnostic {
  return {
    extensionId,
    extensionCode,
    numericCode: 9_950_001,
    category: "error",
    message,
    identity: `${extensionId}:${extensionCode}:${message}`,
  };
}

function acceptedTargetCall(id: string): CheckedCallMappingResult {
  return {
    kind: "target",
    selectedSignature: {
      member: {
        id,
        sourceName: "contractCall",
        targetName: id,
        kind: "method",
        parameters: [],
      },
    },
    argumentConversions: [],
  };
}

function checkedPropertyRequest(
  expression: ExtensionFactSubject,
  target = contractTarget,
): CheckedPropertyAccessMappingRequest {
  const receiver = {};
  return {
    sourceOperationKind: "property-access",
    expression,
    receiver,
    propertyName: "ready",
    accessMode: "read",
    use: "value",
    sourceReceiver: selectedSourceValue(receiver, {}),
    sourceReadResult: selectedSourceValue(expression, {}),
    chainRole: { kind: "ordinary", participant: "property-access" },
    target,
  };
}

function propertyReference(subject: ExtensionFactSubject): CheckedOperationReference {
  return { observation: propertyObservation, subject };
}

function requireSnapshottedErrorMessage(value: unknown): string {
  assert.ok(value !== null && typeof value === "object" && !Array.isArray(value));
  assert.equal(Object.isFrozen(value), true);
  assert.deepEqual(Reflect.ownKeys(value), ["message", "name"]);
  const name = Object.getOwnPropertyDescriptor(value, "name");
  const message = Object.getOwnPropertyDescriptor(value, "message");
  assert.ok(name !== undefined && "value" in name);
  assert.ok(message !== undefined && "value" in message);
  assert.equal(name.value, "Error");
  assert.equal(typeof message.value, "string");
  return message.value;
}

test("checked source-call producer registration is accepted only for source composition", () => {
  const kinds: readonly (CompilerExtensionKind | undefined)[] = [
    "source",
    "target",
    "surface",
    "consumer",
    "tooling",
    undefined,
  ];

  for (const kind of kinds) {
    const compositionName = kind ?? "unclassified";
    const extensionId = `checked-source-call.registration.${compositionName}`;
    let registrationResult: boolean | undefined;
    const host = new ExtensionHost({}, {
      extensions: [compilerExtension(extensionId, {
        ...(kind === undefined ? {} : { composition: { kind } }),
        initialize: (context) => {
          registrationResult = context.registerCheckedSourceCallProducer({
            selector: exportSelector(),
            produce: () => completeCheckedSourceCallProduction,
          });
        },
      })],
    });
    const accepted = kind === "source";

    assert.equal(registrationResult, accepted, compositionName);
    assert.equal(host[extensionHostHasCheckedSourceCallProducers](), accepted, compositionName);
    const registrationDiagnostics = host.diagnostics.all().filter((item) =>
      item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer);
    assert.equal(registrationDiagnostics.length, accepted ? 0 : 1, compositionName);
    if (!accepted) {
      assert.equal(
        registrationDiagnostics[0]?.message,
        `Only a source-composition extension can register a checked source-call producer; '${extensionId}' is '${compositionName}'.`,
        compositionName,
      );
    }
  }
});

test("checked source-call producer registration rolls back when initialization fails", () => {
  const extensionId = "checked-source-call.registration.rollback";
  let registrationResult: boolean | undefined;
  let producerCalls = 0;
  const attached = attachExtensionHost({}, {
    extensions: [compilerExtension(extensionId, {
      composition: { kind: "source" },
      initialize: (context) => {
        registrationResult = context.registerCheckedSourceCallProducer({
          selector: exportSelector(),
          produce: () => {
            producerCalls += 1;
            return completeCheckedSourceCallProduction;
          },
        });
        throw new Error("intentional checked source-call initialization failure");
      },
    })],
  });
  const host = attached.extensionHost;
  const fixture = createCheckedCallFixture();
  publishProviderDeclaration(host, fixture);
  let coreCalls = 0;
  const result = host[extensionHostRunCheckedOperation](
    callObservation,
    fixture.request,
    () => {
      coreCalls += 1;
      return { kind: "source" };
    },
    () => assert.fail("A rolled-back source producer must not accept the call."),
  );

  assert.equal(registrationResult, true);
  assert.equal(host[extensionHostHasCheckedSourceCallProducers](), false);
  assert.deepEqual(host.extensions.map((extension) => extension.identity.id), []);
  assert.equal(result.kind, "core");
  assert.equal(coreCalls, 1);
  assert.equal(producerCalls, 0);
  const failures = host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.initializationFailed);
  assert.equal(failures.length, 1);
  assert.equal(failures[0]?.message, `Extension '${extensionId}' failed during initialization.`);
});

test("checked source-call producer registration rollback restores aggregate selector accounting", () => {
  const failingExtensionId = "checked-source-call.registration.aggregate-rollback.failure";
  const succeedingExtensionId = "checked-source-call.registration.aggregate-rollback.success";
  const failingResults: boolean[] = [];
  let succeedingResult: boolean | undefined;
  const host = new ExtensionHost({}, {
    extensions: [
      compilerExtension(failingExtensionId, {
        composition: { kind: "source" },
        initialize: (context) => {
          for (let index = 0; index < 16; index++) {
            const prefix = `rollback-${index}-`;
            failingResults.push(context.registerCheckedSourceCallProducer({
              selector: exportSelector(prefix + "x".repeat(65_000 - prefix.length)),
              produce: () => completeCheckedSourceCallProduction,
            }));
          }
          throw new Error("intentional aggregate registration rollback");
        },
      }),
      compilerExtension(succeedingExtensionId, {
        composition: { kind: "source" },
        initialize: (context) => {
          const prefix = "after-rollback-";
          succeedingResult = context.registerCheckedSourceCallProducer({
            selector: exportSelector(prefix + "x".repeat(65_000 - prefix.length)),
            produce: () => completeCheckedSourceCallProduction,
          });
        },
      }),
    ],
  });

  assert.equal(failingResults.length, 16);
  assert.ok(failingResults.every(Boolean));
  assert.equal(succeedingResult, true);
  assert.equal(host[extensionHostHasCheckedSourceCallProducers](), true);
  assert.deepEqual(host.extensions.map((extension) => extension.identity.id), [succeedingExtensionId]);
  assert.equal(host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.initializationFailed).length, 1);
  assert.equal(host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer).length, 0);
});

test("producer and selector registrations require exact own data fields without invoking getters", () => {
  interface InvalidRegistrationCase {
    readonly name: string;
    readonly expectedReason: string;
    readonly create: (getterInvoked: () => void) => CheckedSourceCallProducer;
  }
  const cases: readonly InvalidRegistrationCase[] = [{
    name: "producer-accessor",
    expectedReason: "checked source-call producer.produce must be an own data property",
    create: (getterInvoked) => {
      const producer = { selector: exportSelector() };
      Object.defineProperty(producer, "produce", {
        enumerable: true,
        get: () => {
          getterInvoked();
          return () => completeCheckedSourceCallProduction;
        },
      });
      return producer as never;
    },
  }, {
    name: "producer-extra",
    expectedReason: "checked source-call producer contains unsupported field 'extra'",
    create: (getterInvoked) => {
      const producer = {
        selector: exportSelector(),
        produce: () => completeCheckedSourceCallProduction,
      };
      Object.defineProperty(producer, "extra", {
        enumerable: true,
        get: () => {
          getterInvoked();
          return "unsupported";
        },
      });
      return producer;
    },
  }, {
    name: "producer-missing-own-field",
    expectedReason: "checked source-call producer.produce is required",
    create: (getterInvoked) => {
      const prototype = Object.defineProperty({}, "produce", {
        get: () => {
          getterInvoked();
          return () => completeCheckedSourceCallProduction;
        },
      });
      const producer: object = Object.create(prototype);
      Object.defineProperty(producer, "selector", {
        enumerable: true,
        value: exportSelector(),
      });
      return producer as never;
    },
  }, {
    name: "selector-accessor",
    expectedReason: "checked source-call provider selector.kind must be an own data property",
    create: (getterInvoked) => {
      const selector = exportSelector();
      Object.defineProperty(selector, "kind", {
        enumerable: true,
        get: () => {
          getterInvoked();
          return "export-signature";
        },
      });
      return {
        selector,
        produce: () => completeCheckedSourceCallProduction,
      };
    },
  }, {
    name: "selector-extra",
    expectedReason: "checked source-call provider selector contains unsupported field 'extra'",
    create: (getterInvoked) => {
      const selector = exportSelector();
      Object.defineProperty(selector, "extra", {
        enumerable: true,
        get: () => {
          getterInvoked();
          return "unsupported";
        },
      });
      return {
        selector,
        produce: () => completeCheckedSourceCallProduction,
      };
    },
  }, {
    name: "selector-missing-own-field",
    expectedReason: "checked source-call provider selector.memberStatic is required",
    create: (getterInvoked) => {
      const prototype = Object.defineProperty({}, "memberStatic", {
        get: () => {
          getterInvoked();
          return false;
        },
      });
      const selector: object = Object.create(prototype);
      Object.defineProperties(selector, {
        kind: { enumerable: true, value: "member-signature" },
        providerId: { enumerable: true, value: exactProviderIdentity.providerId },
        providerVersion: { enumerable: true, value: exactProviderIdentity.providerVersion },
        providerModuleId: { enumerable: true, value: exactProviderIdentity.providerModuleId },
        exportId: { enumerable: true, value: exactProviderIdentity.exportId },
        memberId: { enumerable: true, value: "checked.source.call.contract.member" },
        signatureId: { enumerable: true, value: exactProviderIdentity.signatureId },
      });
      return {
        selector: selector as never,
        produce: () => completeCheckedSourceCallProduction,
      };
    },
  }];

  for (const entry of cases) {
    let getterInvocations = 0;
    let registrationResult: boolean | undefined;
    const extensionId = `checked-source-call.registration.shape.${entry.name}`;
    const host = new ExtensionHost({}, {
      extensions: [compilerExtension(extensionId, {
        composition: { kind: "source" },
        initialize: (context) => {
          registrationResult = context.registerCheckedSourceCallProducer(entry.create(() => {
            getterInvocations += 1;
          }));
        },
      })],
    });
    const failures = host.diagnostics.all().filter((item) =>
      item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer);

    assert.equal(registrationResult, false, entry.name);
    assert.equal(getterInvocations, 0, entry.name);
    assert.equal(host[extensionHostHasCheckedSourceCallProducers](), false, entry.name);
    assert.equal(failures.length, 1, entry.name);
    assert.equal(failures[0]?.message, `Invalid checked source-call producer registration for extension '${extensionId}'.`, entry.name);
    assert.equal(failures[0]?.evidence?.[0]?.message, "Registration rejection", entry.name);
    assert.equal(failures[0]?.evidence?.[0]?.details, entry.expectedReason, entry.name);
  }
});

test("checked source-call producer registration snapshots selector and callback mutations", () => {
  const extensionId = "checked-source-call.registration.snapshot";
  const mutableSelector: {
    kind: "export-signature";
    providerId: string;
    providerVersion: string;
    providerModuleId: string;
    exportId: string;
    signatureId: string;
  } = {
    kind: "export-signature",
    providerId: exactProviderIdentity.providerId,
    providerVersion: exactProviderIdentity.providerVersion,
    providerModuleId: exactProviderIdentity.providerModuleId,
    exportId: exactProviderIdentity.exportId,
    signatureId: exactProviderIdentity.signatureId,
  };
  let originalCalls = 0;
  let replacementCalls = 0;
  const producer: {
    selector: CheckedSourceCallProviderSelector;
    produce: CheckedSourceCallProducer["produce"];
  } = {
    selector: mutableSelector,
    produce: () => {
      originalCalls += 1;
      return completeCheckedSourceCallProduction;
    },
  };
  let registrationResult: boolean | undefined;
  const host = new ExtensionHost({}, {
    extensions: [compilerExtension(extensionId, {
      composition: { kind: "source" },
      initialize: (context) => {
        registrationResult = context.registerCheckedSourceCallProducer(producer);
      },
    })],
  });

  mutableSelector.providerId = "mutated-provider";
  mutableSelector.signatureId = "mutated-signature";
  producer.selector = exportSelector("replacement-signature");
  producer.produce = () => {
    replacementCalls += 1;
    return completeCheckedSourceCallProduction;
  };

  const fixture = createCheckedCallFixture();
  publishProviderDeclaration(host, fixture);
  const result = runCheckedCall(host, fixture);

  assert.equal(registrationResult, true);
  assert.equal(result.kind, "accept");
  assert.equal(result.kind === "accept" ? result.extensionId : undefined, extensionId);
  assert.equal(originalCalls, 1);
  assert.equal(replacementCalls, 0);
  assert.equal(host.diagnostics.all().length, 0);
});

test("checked source-call producer registration rejects duplicates and enforces its finite bound", () => {
  const duplicateExtensionId = "checked-source-call.registration.duplicate";
  const duplicateResults: boolean[] = [];
  const duplicateHost = new ExtensionHost({}, {
    extensions: [compilerExtension(duplicateExtensionId, {
      composition: { kind: "source" },
      initialize: (context) => {
        for (let index = 0; index < 2; index++) {
          duplicateResults.push(context.registerCheckedSourceCallProducer({
            selector: exportSelector(),
            produce: () => completeCheckedSourceCallProduction,
          }));
        }
      },
    })],
  });

  assert.deepEqual(duplicateResults, [true, false]);
  assert.equal(duplicateHost.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer).length, 1);

  const boundedExtensionId = "checked-source-call.registration.bound";
  const boundedResults: boolean[] = [];
  const boundedHost = new ExtensionHost({}, {
    extensions: [compilerExtension(boundedExtensionId, {
      composition: { kind: "source" },
      initialize: (context) => {
        for (let index = 0; index < 4_096; index++) {
          boundedResults.push(context.registerCheckedSourceCallProducer({
            selector: exportSelector(`checked-source-call.registration.bound.${index}`),
            produce: () => completeCheckedSourceCallProduction,
          }));
        }
        boundedResults.push(context.registerCheckedSourceCallProducer({
          selector: exportSelector("checked-source-call.registration.bound.0"),
          produce: () => completeCheckedSourceCallProduction,
        }));
        boundedResults.push(context.registerCheckedSourceCallProducer({
          selector: exportSelector("checked-source-call.registration.bound.overflow"),
          produce: () => completeCheckedSourceCallProduction,
        }));
      },
    })],
  });

  assert.equal(boundedResults.length, 4_098);
  assert.ok(boundedResults.slice(0, 4_096).every((accepted) => accepted));
  assert.equal(boundedResults[4_096], false);
  assert.equal(boundedResults[4_097], false);
  const boundDiagnostics = boundedHost.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer);
  assert.equal(boundDiagnostics.length, 2);
  assert.match(boundDiagnostics[0]!.message, /already owned/);
  assert.equal(
    boundDiagnostics[1]?.message,
    "Checked source-call producer registration exceeds the finite limit of 4096.",
  );
});

test("checked source-call producer retained identities have a finite aggregate scalar budget", () => {
  const extensionId = "checked-source-call.registration.scalar-bound";
  const results: boolean[] = [];
  const host = new ExtensionHost({}, {
    extensions: [compilerExtension(extensionId, {
      composition: { kind: "source" },
      initialize: (context) => {
        for (let index = 0; index < 70; index++) {
          const prefix = `selector-${index}-`;
          results.push(context.registerCheckedSourceCallProducer({
            selector: exportSelector(prefix + "x".repeat(65_000 - prefix.length)),
            produce: () => completeCheckedSourceCallProduction,
          }));
        }
      },
    })],
  });

  const firstFailure = results.indexOf(false);
  assert.ok(firstFailure > 0 && firstFailure < results.length);
  assert.ok(results.slice(0, firstFailure).every(Boolean));
  assert.ok(results.slice(firstFailure).every((accepted) => !accepted));
  const diagnostics = host.diagnostics.all().filter((item) =>
    item.message.includes("aggregate limit") && item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer);
  assert.equal(diagnostics.length, 1);
  assert.equal(
    diagnostics[0]?.message,
    "Checked source-call producer identities exceed the finite retained aggregate limit of 4194304 UTF-16 code units.",
  );
});

test("producer callbacks receive a frozen target-free checked call source operation", () => {
  const extensionId = "checked-source-call.operation.contract";
  let receivedOperation: CheckedSourceCallOperation | undefined;
  let receivedPhase: string | undefined;
  const attached = attachExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        receivedOperation = operation;
        receivedPhase = context.phase;
        assert.equal(context.extensionId, extensionId);
        assert.equal(Object.isFrozen(context), true);
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  const host = attached.extensionHost;
  const fixture = createCheckedCallFixture("must-not-cross-source-boundary");
  publishProviderDeclaration(host, fixture);
  const result = runCheckedCall(host, fixture);

  assert.equal(result.kind, "accept");
  assert.equal(receivedPhase, "checking");
  assert.ok(receivedOperation !== undefined);
  assert.notEqual(receivedOperation, fixture.request);
  assert.equal(Object.isFrozen(receivedOperation), true);
  assert.deepEqual(Object.keys(receivedOperation), [
    "sourceOperationKind",
    "sourceProviderSelection",
    "call",
    "callee",
    "arguments",
    "callKind",
    "sourceSelection",
    "sourceCallee",
    "sourceArguments",
    "sourceResult",
    "sourceReceiver",
    "chainRole",
  ]);
  assert.equal(Object.hasOwn(receivedOperation, "target"), false);
  assert.deepEqual(receivedOperation.sourceProviderSelection, exportSelector());
  assert.equal(receivedOperation.call, fixture.call);
  assert.equal(receivedOperation.callee, fixture.callee);
  assert.equal(receivedOperation.arguments[0], fixture.argument);
  assert.equal(receivedOperation.sourceReceiver?.expression, fixture.receiver);
  assert.equal(Object.isFrozen(receivedOperation.arguments), true);
  assert.equal(Object.isFrozen(receivedOperation.sourceSelection), true);
  assert.equal(Object.isFrozen(receivedOperation.sourceArguments), true);
  assert.equal(Object.isFrozen(receivedOperation.sourceArguments[0]), true);
  assert.deepEqual(receivedOperation.sourceArguments[0]?.composition, {
    kind: "authored-literal",
    literal: { kind: "string", value: "literal-string-evidence" },
  });
  assert.equal(Object.isFrozen(receivedOperation.chainRole), true);
});

test("retained source-producer capabilities cannot mutate host state after callback return", () => {
  const extensionId = "checked-source-call.retained-capability";
  const factKey = stringFactKey(extensionId, "retained-capability-value");
  let retainedFacts: CheckedSourceCallProducerContext["facts"] | undefined;
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (_operation, context) => {
        retainedFacts = context.facts;
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  const capturedFacts = retainedFacts;
  assert.ok(capturedFacts !== undefined);
  assert.throws(
    () => capturedFacts.set(factKey, "late-write"),
    /valid only during their exact host-owned callback/,
  );
  assert.equal(host.facts.get(fixture.call, factKey), undefined);
  assert.equal(host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.factOwnershipViolation).length, 0);
});

test("re-observing a source-produced call with changed composition evidence fails closed", () => {
  const extensionId = "checked-source-call.composition-conflict";
  const factKey = stringFactKey(extensionId, "composition-value");
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        assert.equal(context.facts.set(factKey, "retained"), "inserted");
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(host.facts.get(fixture.call, factKey), "retained");
  runCheckedCall(host, {
    ...fixture,
    request: {
      ...fixture.request,
      sourceComposition: {
        argumentEvidence: [{
          kind: "authored-literal",
          literal: { kind: "string", value: "changed-after-retention" },
        }],
      },
    },
  });

  const conflicts = host.diagnostics.all().filter((item) =>
    item.extensionCode === "CHECKED_OPERATION_REQUEST_CONFLICT");
  assert.equal(conflicts.length, 1);
  assert.deepEqual(conflicts[0]?.evidence?.[0]?.details, ["sourceComposition"]);
  assert.equal(host.facts.get(fixture.call, factKey), undefined);
  assert.throws(() => host.finalizeSemantics(), /semantic finalization previously failed/);
});

test("a checked source-call producer can write only its own fact keys", () => {
  const extensionId = "checked-source-call.fact-owner";
  const foreignExtensionId = "checked-source-call.foreign-fact-owner";
  const ownFactKey = stringFactKey(extensionId, "source-call-value");
  const foreignFactKey = stringFactKey(foreignExtensionId, "source-call-value");
  const acceptedFixture = createCheckedCallFixture();
  const rejectedFixture = createCheckedCallFixture();
  const ownWriteResults: string[] = [];
  const foreignWriteResults: string[] = [];
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        ownWriteResults.push(context.facts.set(ownFactKey, "source-owned"));
        if (operation.call === acceptedFixture.call) {
          return completeCheckedSourceCallProduction;
        }
        foreignWriteResults.push(context.facts.set(foreignFactKey, "foreign-owned"));
        return rejectCheckedSourceCallProduction(diagnostic(
          extensionId,
          "FOREIGN_FACT_WRITE_REJECTED",
          "The foreign fact write was rejected.",
        ));
      },
    }])],
  });
  publishProviderDeclaration(host, acceptedFixture);
  publishProviderDeclaration(host, rejectedFixture);

  const accepted = runCheckedCall(host, acceptedFixture);
  const rejected = runCheckedCall(host, rejectedFixture);

  assert.equal(accepted.kind, "accept");
  assert.equal(rejected.kind, "reject");
  assert.deepEqual(ownWriteResults, ["inserted", "inserted"]);
  assert.deepEqual(foreignWriteResults, ["conflict"]);
  assert.equal(host.facts.get(acceptedFixture.call, ownFactKey), "source-owned");
  assert.equal(host.facts.get(rejectedFixture.call, ownFactKey), undefined);
  assert.equal(host.facts.get(rejectedFixture.call, foreignFactKey), undefined);
  const ownershipViolations = host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.factOwnershipViolation);
  assert.equal(ownershipViolations.length, 1);
  assert.equal(
    ownershipViolations[0]?.message,
    `Extension '${extensionId}' cannot write fact key '${foreignExtensionId}:source-call-value' owned by '${foreignExtensionId}'.`,
  );
});

test("checked source-call producers read only host source facts and declared source dependencies", () => {
  const dependencyExtensionId = "checked-source-call.read-boundary.dependency";
  const producerExtensionId = "checked-source-call.read-boundary.producer";
  const targetExtensionId = "checked-source-call.read-boundary.target";
  const dependencyFactKey = stringFactKey(dependencyExtensionId, "dependency-value");
  const producerFactKey = stringFactKey(producerExtensionId, "producer-value");
  const targetFactKey = stringFactKey(targetExtensionId, "target-value");
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [
      compilerExtension(dependencyExtensionId, {
        composition: { kind: "source" },
        initialize: (context) => {
          assert.equal(context.facts.set(fixture.call, dependencyFactKey, "dependency"), "inserted");
        },
      }),
      producerExtension(producerExtensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          assert.equal(context.facts.get(fixture.call, dependencyFactKey), "dependency");
          assert.equal(context.facts.getEntry(fixture.call, dependencyFactKey)?.value, "dependency");
          assert.equal(context.facts.has(fixture.call, dependencyFactKey), true);
          assert.equal(context.factResolver.resolve(fixture.call, dependencyFactKey), "dependency");
          assert.equal(context.facts.get(operation.call, producerFactKey), undefined);
          assert.equal(context.facts.set(producerFactKey, "producer"), "inserted");
          for (const read of [
            () => context.facts.get(fixture.call, targetFactKey),
            () => context.facts.getEntry(fixture.call, targetFactKey),
            () => context.facts.has(fixture.call, targetFactKey),
            () => context.factResolver.resolve(fixture.call, targetFactKey),
            () => context.facts.get(fixture.declaration, providerVirtualDeclarationFactKey),
            () => context.facts.getEntry(fixture.declaration, providerVirtualDeclarationFactKey),
            () => context.facts.has(fixture.declaration, providerVirtualDeclarationFactKey),
            () => context.factResolver.resolve(fixture.declaration, providerVirtualDeclarationFactKey),
          ]) {
            assert.throws(read, /may read only host source facts, their own facts, and facts from explicitly declared source dependencies/);
          }
          return completeCheckedSourceCallProduction;
        },
      }], [dependencyExtensionId]),
      compilerExtension(targetExtensionId, {
        composition: { kind: "target", target: contractTarget },
        initialize: (context) => {
          assert.equal(context.facts.set(fixture.call, targetFactKey, "target"), "inserted");
        },
      }),
    ],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(host.facts.get(fixture.call, producerFactKey), "producer");
  assert.equal(host.facts.get(fixture.call, targetFactKey), "target");
  assert.equal(host.diagnostics.all().length, 0);
});

test("checked source-call producer reads are confined to retained subjects and writes are operation-owned", () => {
  const extensionId = "checked-source-call.subject-boundary";
  const factKey = stringFactKey(extensionId, "operation-subject");
  const fixture = createCheckedCallFixture();
  const unrelatedSubject = {};
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        for (const access of [
          () => context.facts.get(unrelatedSubject, factKey),
          () => context.facts.getEntry(unrelatedSubject, factKey),
          () => context.facts.has(unrelatedSubject, factKey),
          () => context.factResolver.resolve(unrelatedSubject, factKey),
          () => host.facts.get(unrelatedSubject, factKey),
          () => host.facts.set(unrelatedSubject, factKey, "captured-global-store"),
        ]) {
          assert.throws(access, /only on subjects retained by its exact checked operation/);
        }
        assert.equal(context.facts.set(factKey, "retained"), "inserted");
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(host.facts.get(fixture.call, factKey), "retained");
  assert.equal(host.facts.get(unrelatedSubject, factKey), undefined);
});

test("source producer facts stay isolated per call when selected declarations and signatures are shared", () => {
  const extensionId = "checked-source-call.operation-owned-facts";
  const factKey = stringFactKey(extensionId, "per-call-value");
  const first = createCheckedCallFixture();
  const independentSecond = createCheckedCallFixture();
  const second: CheckedCallFixture = {
    ...independentSecond,
    declaration: first.declaration,
    request: {
      ...independentSecond.request,
      sourceSelection: first.request.sourceSelection,
    },
    providerDeclaration: first.providerDeclaration,
  };
  const values = new Map<ExtensionFactSubject, string>([
    [first.call, "first"],
    [second.call, "second"],
  ]);
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        const value = values.get(operation.call);
        assert.ok(value !== undefined);
        assert.equal(context.facts.set(factKey, value), "inserted");
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, first);

  assert.equal(runCheckedCall(host, first).kind, "accept");
  assert.equal(runCheckedCall(host, second).kind, "accept");
  assert.equal(host.facts.get(first.call, factKey), "first");
  assert.equal(host.facts.get(second.call, factKey), "second");
  assert.equal(host.facts.get(first.declaration, factKey), undefined);
  assert.equal(host.facts.get(second.declaration, factKey), undefined);
  assert.equal(
    host.facts.get(first.request.sourceSelection.kind === "applicable"
      ? first.request.sourceSelection.signature
      : undefined, factKey),
    undefined,
  );
  assert.equal(
    host.facts.get(second.request.sourceSelection.kind === "applicable"
      ? second.request.sourceSelection.signature
      : undefined, factKey),
    undefined,
  );
});

test("fact resolver callbacks read through their own declared source-dependency authority", () => {
  const leafExtensionId = "checked-source-call.resolver-authority.leaf";
  const resolverExtensionId = "checked-source-call.resolver-authority.resolver";
  const producerExtensionId = "checked-source-call.resolver-authority.producer";
  const leafFactKey = stringFactKey(leafExtensionId, "leaf");
  const resolvedFactKey = stringFactKey(resolverExtensionId, "resolved");
  const producedFactKey = stringFactKey(producerExtensionId, "produced");
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [
      compilerExtension(leafExtensionId, {
        composition: { kind: "source" },
        initialize: (context) => {
          assert.equal(context.facts.set(fixture.call, leafFactKey, "leaf"), "inserted");
        },
      }),
      compilerExtension(resolverExtensionId, {
        composition: { kind: "source" },
        dependsOn: [leafExtensionId],
        initialize: (context) => {
          context.factResolver.register(resolvedFactKey, (subject, resolverContext) => {
            const leaf = resolverContext.facts.get(subject, leafFactKey);
            return leaf === undefined ? undefined : { value: `${leaf}:resolved` };
          });
        },
      }),
      producerExtension(producerExtensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          assert.equal(
            context.factResolver.resolve(operation.call, resolvedFactKey),
            "leaf:resolved",
          );
          assert.equal(context.facts.set(producedFactKey, "complete"), "inserted");
          return completeCheckedSourceCallProduction;
        },
      }], [resolverExtensionId]),
    ],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(host.facts.get(fixture.call, resolvedFactKey), "leaf:resolved");
  assert.equal(host.facts.get(fixture.call, producedFactKey), "complete");
});

test("source extensions cannot depend on non-source extensions", () => {
  const sourceExtensionId = "checked-source-call.invalid-dependency.source";
  const targetExtensionId = "checked-source-call.invalid-dependency.target";
  let sourceInitialized = false;
  const host = new ExtensionHost({}, {
    extensions: [
      compilerExtension(targetExtensionId, {
        composition: { kind: "target", target: contractTarget },
      }),
      compilerExtension(sourceExtensionId, {
        composition: { kind: "source" },
        dependsOn: [targetExtensionId],
        initialize: () => {
          sourceInitialized = true;
        },
      }),
    ],
  });

  assert.equal(sourceInitialized, false);
  assert.deepEqual(host.extensions.map((extension) => extension.identity.id), [targetExtensionId]);
  const diagnostics = host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidDependencyDirection);
  assert.equal(diagnostics.length, 1);
  assert.equal(
    diagnostics[0]?.message,
    `Source extension '${sourceExtensionId}' can depend only on another source extension; '${targetExtensionId}' is 'target'.`,
  );
});

test("source dependency direction rejects every non-source composition kind", () => {
  const dependencyKinds: readonly (CompilerExtensionKind | undefined)[] = [
    "target",
    "surface",
    "consumer",
    "tooling",
    undefined,
  ];
  for (const dependencyKind of dependencyKinds) {
    const suffix = dependencyKind ?? "unclassified";
    const dependencyId = `checked-source-call.invalid-source-dependency.${suffix}`;
    const sourceExtensionId = `checked-source-call.invalid-source-dependent.${suffix}`;
    let sourceInitialized = false;
    const dependency = compilerExtension(dependencyId, dependencyKind === undefined
      ? {}
      : {
          composition: dependencyKind === "target"
            ? { kind: "target", target: contractTarget }
            : { kind: dependencyKind },
        });
    const host = new ExtensionHost({}, {
      extensions: [
        dependency,
        compilerExtension(sourceExtensionId, {
          composition: { kind: "source" },
          dependsOn: [dependencyId],
          initialize: () => {
            sourceInitialized = true;
          },
        }),
      ],
    });

    assert.equal(sourceInitialized, false, suffix);
    assert.equal(host.extensions.some((extension) => extension.identity.id === sourceExtensionId), false, suffix);
    assert.equal(
      host.diagnostics.all().filter((item) =>
        item.numericCode === ExtensionHostDiagnosticCode.invalidDependencyDirection).length,
      1,
      suffix,
    );
  }
});

test("an invalid diagnostic append poisons the producer attempt even when its return value is ignored", () => {
  const extensionId = "checked-source-call.invalid-diagnostic-attempt";
  const factKey = stringFactKey(extensionId, "must-roll-back");
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation, context) => {
        assert.equal(context.facts.set(factKey, "provisional"), "inserted");
        assert.equal(context.diagnostics.append({
          extensionId,
          extensionCode: "INVALID_NUMERIC_CODE",
          numericCode: Number.NaN,
          category: "error",
          message: "This diagnostic cannot cross the immutable boundary.",
        }), false);
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, fixture);

  const result = runCheckedCall(host, fixture);
  assert.equal(result.kind, "reject");
  assert.equal(
    result.kind === "reject" ? result.diagnostic.numericCode : undefined,
    ExtensionHostDiagnosticCode.sourceOperationProducerFailed,
  );
  assert.equal(host.facts.get(fixture.call, factKey), undefined);
  assert.equal(host.diagnostics.all().some((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidDiagnosticSnapshot), true);
});

test("checked source-call producers cannot escape their callback-scoped host capabilities", () => {
  const extensionId = "checked-source-call.host-boundary";
  const fixture = createCheckedCallFixture();
  let host: ExtensionHost | undefined;
  host = new ExtensionHost({ program: "private" }, {
    activeTarget: contractTarget,
    activeSurface: "private-surface",
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: (operation) => {
        const activeHost = host!;
        const forbiddenReads: readonly (() => unknown)[] = [
          () => activeHost.extensions,
          () => activeHost.activeTarget,
          () => activeHost.activeSurface,
          () => activeHost.program,
          () => activeHost.finalized,
          () => activeHost.getObservationOwner(callObservation),
          () => activeHost.getCompilerQueryContext(),
          () => activeHost.assertFinalizedForConsumer("source-producer"),
          () => activeHost.getFactsForConsumer("source-producer", operation.call),
          () => activeHost.facts.entries(operation.call),
          () => activeHost.diagnostics.all(),
          () => activeHost.diagnostics.hasErrors(),
          () => activeHost.providers.hasBindingProviders,
          () => activeHost.providers.getVirtualDeclarationDocuments(),
          () => activeHost.registerLifecycleHook("late", extensionId, () => {}),
          () => activeHost.finalizeSemantics(),
        ];
        for (const read of forbiddenReads) {
          assert.throws(read, /Checked source-call producers cannot|cannot enumerate the global extension fact store|cannot inspect the global extension diagnostic store|cannot inspect or mutate the provider registry/);
        }
        return completeCheckedSourceCallProduction;
      },
    }])],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(host.diagnostics.all().length, 0);
});

test("malformed, foreign, and throwing source producer failures become deterministic host rejections", () => {
  interface FailureCase {
    readonly name: string;
    readonly expectedError: (extensionId: string) => string;
    readonly produce: (extensionId: string) => CheckedSourceCallProducer["produce"];
  }
  const cases: readonly FailureCase[] = [{
    name: "malformed-diagnostic",
    expectedError: (extensionId) =>
      `Source extension '${extensionId}' returned an invalid rejection diagnostic: diagnostic.message is required.`,
    produce: (extensionId) => () => ({
      kind: "reject",
      diagnostic: {
        extensionId,
        extensionCode: "MALFORMED_SOURCE_REJECTION",
        numericCode: 9_950_002,
        category: "error",
      } as never,
    }),
  }, {
    name: "foreign-diagnostic",
    expectedError: (extensionId) =>
      `Source extension '${extensionId}' returned a rejection diagnostic owned by 'checked-source-call.foreign-diagnostic'.`,
    produce: () => () => rejectCheckedSourceCallProduction(diagnostic(
      "checked-source-call.foreign-diagnostic",
      "FOREIGN_SOURCE_REJECTION",
      "A foreign extension cannot reject this source operation.",
    )),
  }, {
    name: "throw",
    expectedError: () => "intentional checked source-call producer throw",
    produce: () => () => {
      throw new Error("intentional checked source-call producer throw");
    },
  }];

  for (const entry of cases) {
    const extensionId = `checked-source-call.failure.${entry.name}`;
    const fixture = createCheckedCallFixture();
    const host = new ExtensionHost({}, {
      extensions: [producerExtension(extensionId, [{
        selector: exportSelector(),
        produce: entry.produce(extensionId),
      }])],
    });
    publishProviderDeclaration(host, fixture);
    const result = runCheckedCall(host, fixture);

    assert.equal(result.kind, "reject", entry.name);
    if (result.kind !== "reject") {
      throw new Error(`Expected deterministic host rejection for ${entry.name}.`);
    }
    assert.equal(result.extensionId, "tsts.extension-host", entry.name);
    assert.equal(result.diagnostic.extensionId, "tsts.extension-host", entry.name);
    assert.equal(result.diagnostic.extensionCode, "CHECKED_SOURCE_CALL_PRODUCER_FAILED", entry.name);
    assert.equal(result.diagnostic.numericCode, ExtensionHostDiagnosticCode.sourceOperationProducerFailed, entry.name);
    assert.equal(
      result.diagnostic.message,
      `Extension '${extensionId}' failed while producing checked source-call semantics.`,
      entry.name,
    );
    assert.equal(result.diagnostic.nodeOrSpan, fixture.call, entry.name);
    assert.equal(result.diagnostic.evidence?.[0]?.message, "Thrown value", entry.name);
    assert.equal(
      requireSnapshottedErrorMessage(result.diagnostic.evidence?.[0]?.details),
      entry.expectedError(extensionId),
      entry.name,
    );
    assert.equal(host.diagnostics.all().length, 0, entry.name);

    host.finalizeSemantics();

    const published = host.diagnostics.all().filter((item) =>
      item.numericCode === ExtensionHostDiagnosticCode.sourceOperationProducerFailed);
    assert.equal(published.length, 1, entry.name);
    assert.equal(published[0]?.message, result.diagnostic.message, entry.name);
    assert.equal(host.finalized, true, entry.name);
  }
});

test("producer outcomes are captured once without invoking value getters", () => {
  const extensionId = "checked-source-call.production.snapshot";
  let ownKeysReads = 0;
  let descriptorReads = 0;
  let valueReads = 0;
  const production = new Proxy({ kind: "complete" as const }, {
    ownKeys: (target) => {
      ownKeysReads += 1;
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor: (target, property) => {
      descriptorReads += 1;
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
    get: (target, property, receiver) => {
      valueReads += 1;
      return Reflect.get(target, property, receiver);
    },
  });
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [producerExtension(extensionId, [{
      selector: exportSelector(),
      produce: () => production,
    }])],
  });
  publishProviderDeclaration(host, fixture);

  assert.equal(runCheckedCall(host, fixture).kind, "accept");
  assert.equal(ownKeysReads, 1);
  assert.equal(descriptorReads, 1);
  assert.equal(valueReads, 0);
});

test("failed source fact attempts reject before every producer outcome can commit", () => {
  for (const outcome of ["complete", "defer", "reject"] as const) {
    const extensionId = `checked-source-call.failed-attempt.${outcome}`;
    const invalidFactKey = defineExtensionFactKey<string>({
      extensionId,
      name: "invalid-source-fact",
      snapshot: () => {
        throw new Error(`intentional invalid source fact for ${outcome}`);
      },
    });
    const fixture = createCheckedCallFixture();
    const host = new ExtensionHost({}, {
      extensions: [producerExtension(extensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          assert.equal(context.facts.set(invalidFactKey, "invalid"), "conflict");
          return outcome === "complete"
            ? completeCheckedSourceCallProduction
            : outcome === "defer"
              ? deferCheckedSourceCallProduction
              : rejectCheckedSourceCallProduction(diagnostic(
                  extensionId,
                  "INVALID_ATTEMPT_REJECTION",
                  "A failed fact attempt cannot be hidden by rejection.",
                ));
        },
      }])],
    });
    publishProviderDeclaration(host, fixture);

    const result = runCheckedCall(host, fixture);
    assert.equal(result.kind, "reject", outcome);
    assert.equal(result.kind === "reject" ? result.extensionId : undefined, "tsts.extension-host", outcome);
    assert.equal(
      result.kind === "reject" ? result.diagnostic.extensionCode : undefined,
      "CHECKED_SOURCE_CALL_PRODUCER_FAILED",
      outcome,
    );
    assert.equal(host.facts.get(fixture.call, invalidFactKey), undefined, outcome);
  }
});

test("failed target fact attempts cannot be hidden by defer or reject and roll back source effects", () => {
  for (const outcome of ["defer", "reject"] as const) {
    const sourceExtensionId = `checked-source-call.failed-target.${outcome}.source`;
    const targetExtensionId = `checked-source-call.failed-target.${outcome}.target`;
    const sourceFactKey = stringFactKey(sourceExtensionId, "provisional-source-value");
    const invalidTargetFactKey = defineExtensionFactKey<string>({
      extensionId: targetExtensionId,
      name: "invalid-target-fact",
      snapshot: () => {
        throw new Error(`intentional invalid target fact for ${outcome}`);
      },
    });
    const fixture = createCheckedCallFixture();
    const host = new ExtensionHost({}, {
      activeTarget: contractTarget,
      extensions: [
        producerExtension(sourceExtensionId, [{
          selector: exportSelector(),
          produce: (operation, context) => {
            assert.equal(context.facts.set(sourceFactKey, "must-roll-back"), "inserted");
            return completeCheckedSourceCallProduction;
          },
        }]),
        targetCallExtension(targetExtensionId, (request, context) => {
          assert.equal(context.facts.set(request.call, invalidTargetFactKey, "invalid"), "conflict");
          return outcome === "defer"
            ? deferObservation
            : rejectObservation(diagnostic(
                targetExtensionId,
                "INVALID_TARGET_ATTEMPT_REJECTION",
                "A failed target fact attempt cannot be hidden by rejection.",
              ));
        }, [sourceExtensionId]),
      ],
    });
    publishProviderDeclaration(host, fixture);

    const result = runCheckedCall(host, fixture, () => {
      assert.fail("A poisoned target fact attempt must not apply.");
    }, true);
    assert.equal(result.kind, "reject", outcome);
    assert.equal(host.facts.get(fixture.call, sourceFactKey), undefined, outcome);
    assert.equal(host.facts.get(fixture.call, invalidTargetFactKey), undefined, outcome);
  }
});

test("one exact checked source-call selector has one global source owner", () => {
  const firstExtensionId = "checked-source-call.order.first";
  const secondExtensionId = "checked-source-call.order.second";
  const firstFactKey = stringFactKey(firstExtensionId, "first-source-value");
  const calls: string[] = [];
  let secondRegistration: boolean | undefined;
  const host = new ExtensionHost({}, {
    extensions: [
      producerExtension(firstExtensionId, [{
        selector: exportSelector(),
          produce: (operation, context) => {
            calls.push(`${context.phase}:${context.extensionId}`);
            assert.equal(context.facts.set(firstFactKey, "first"), "inserted");
            return completeCheckedSourceCallProduction;
          },
        }]),
      compilerExtension(secondExtensionId, {
        composition: { kind: "source" },
        dependsOn: [firstExtensionId],
        initialize: (context) => {
          secondRegistration = context.registerCheckedSourceCallProducer({
            selector: exportSelector(),
            produce: () => {
              calls.push(`unexpected:${secondExtensionId}`);
              return completeCheckedSourceCallProduction;
            },
          });
        },
      }),
    ],
  });
  const fixture = createCheckedCallFixture();
  publishProviderDeclaration(host, fixture);
  const result = runCheckedCall(host, fixture);

  assert.equal(secondRegistration, false);
  assert.equal(result.kind, "accept");
  assert.equal(result.kind === "accept" ? result.extensionId : undefined, firstExtensionId);
  assert.deepEqual(calls, [`checking:${firstExtensionId}`]);
  assert.equal(host.facts.get(fixture.call, firstFactKey), "first");
  const diagnostics = host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.invalidSourceOperationProducer);
  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0]!.message, /already owned/);
});

for (const targetOutcome of ["defer", "reject"] as const) {
  test(`source writes roll back when the target mapper ${targetOutcome}s`, () => {
    const sourceExtensionId = `checked-source-call.target-${targetOutcome}.source`;
    const targetExtensionId = `checked-source-call.target-${targetOutcome}.target`;
    const sourceFactKey = stringFactKey(sourceExtensionId, "provisional-source-value");
    const fixture = createCheckedCallFixture();
    let sourceCalls = 0;
    let targetCalls = 0;
    const host = new ExtensionHost({}, {
      activeTarget: contractTarget,
      extensions: [
        producerExtension(sourceExtensionId, [{
          selector: exportSelector(),
          produce: (operation, context) => {
            sourceCalls += 1;
            assert.equal(context.facts.set(sourceFactKey, "must-roll-back"), "inserted");
            return completeCheckedSourceCallProduction;
          },
        }]),
        targetCallExtension(targetExtensionId, (_request, context) => {
          targetCalls += 1;
          return targetOutcome === "defer"
            ? deferObservation
            : rejectObservation(diagnostic(
              targetExtensionId,
              "TARGET_MAPPER_REJECTION",
              "The target mapper rejected the checked call.",
            ));
        }, [sourceExtensionId]),
      ],
    });
    publishProviderDeclaration(host, fixture);
    const result = runCheckedCall(host, fixture, () => {
      assert.fail("A deferred or rejected target mapping must not apply.");
    }, true);

    assert.equal(result.kind, targetOutcome === "defer" ? "owner-deferred" : "reject");
    assert.equal(
      result.kind === "owner-deferred" || result.kind === "reject" ? result.extensionId : undefined,
      targetExtensionId,
    );
    assert.equal(sourceCalls, 1);
    assert.equal(targetCalls, 1);
    assert.equal(host.facts.get(fixture.call, sourceFactKey), undefined);
  });
}

test("deferred target replay reuses one immutable source operation and one target request", () => {
  const sourceExtensionId = "checked-source-call.stable-replay.source";
  const targetExtensionId = "checked-source-call.stable-replay.target";
  const sourceFactKey = stringFactKey(sourceExtensionId, "stable-replay-value");
  const fixture = createCheckedCallFixture();
  const sourceOperations: CheckedSourceCallOperation[] = [];
  const targetRequests: CheckedCallMappingRequest[] = [];
  let applications = 0;
  const host = new ExtensionHost({}, {
    activeTarget: contractTarget,
    extensions: [
      producerExtension(sourceExtensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          sourceOperations.push(operation);
          assert.equal(context.facts.set(sourceFactKey, "stable"), "inserted");
          return completeCheckedSourceCallProduction;
        },
      }]),
      targetCallExtension(targetExtensionId, (request, context) => {
        targetRequests.push(request);
        assert.equal(Object.hasOwn(request, "sourceComposition"), false);
        assert.equal(context.facts.get(request.call, sourceFactKey), "stable");
        return context.phase === "checking"
          ? deferObservation
          : acceptObservation(acceptedTargetCall("checked-source-call.stable-replay"));
      }, [sourceExtensionId]),
    ],
  });
  publishProviderDeclaration(host, fixture);

  const initial = runCheckedCall(host, fixture, () => {
    applications += 1;
  }, true);
  assert.equal(initial.kind, "owner-deferred");
  assert.equal(host.facts.get(fixture.call, sourceFactKey), undefined);

  host.finalizeSemantics();

  assert.equal(sourceOperations.length, 2);
  assert.equal(sourceOperations[0], sourceOperations[1]);
  assert.equal(targetRequests.length, 2);
  assert.equal(targetRequests[0], targetRequests[1]);
  assert.notEqual(targetRequests[0], fixture.request);
  assert.equal(Object.isFrozen(sourceOperations[0]), true);
  assert.equal(Object.isFrozen(targetRequests[0]), true);
  assert.equal(applications, 1);
  assert.equal(host.facts.get(fixture.call, sourceFactKey), "stable");
});

test("source producer facts are visible to an accepting target mapper", () => {
  const sourceExtensionId = "checked-source-call.target-visible.source";
  const targetExtensionId = "checked-source-call.target-visible.target";
  const sourceFactKey = stringFactKey(sourceExtensionId, "source-value");
  const fixture = createCheckedCallFixture();
  let targetSawSourceFact: string | undefined;
  let targetSawSourceComposition = true;
  let applications = 0;
  const host = new ExtensionHost({}, {
    activeTarget: contractTarget,
    extensions: [
      producerExtension(sourceExtensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          assert.equal(context.facts.set(sourceFactKey, "visible-before-target"), "inserted");
          return completeCheckedSourceCallProduction;
        },
      }]),
      targetCallExtension(targetExtensionId, (request, context) => {
        targetSawSourceFact = context.facts.get(request.call, sourceFactKey);
        targetSawSourceComposition = Object.hasOwn(request, "sourceComposition");
        return acceptObservation(acceptedTargetCall("checked-source-call.target-visible"));
      }, [sourceExtensionId]),
    ],
  });
  publishProviderDeclaration(host, fixture);
  const result = runCheckedCall(host, fixture, () => {
    applications += 1;
  }, true);

  assert.equal(result.kind, "accept");
  assert.equal(result.kind === "accept" ? result.extensionId : undefined, targetExtensionId);
  assert.equal(result.kind === "accept" ? result.value.kind : undefined, "target");
  assert.equal(targetSawSourceFact, "visible-before-target");
  assert.equal(targetSawSourceComposition, false);
  assert.equal(host.facts.get(fixture.call, sourceFactKey), "visible-before-target");
  assert.equal(applications, 1);
});

test("accepted source effects replay idempotently without re-running the producer", () => {
  const sourceExtensionId = "checked-source-call.replay.source";
  const targetExtensionId = "checked-source-call.replay.target";
  const sourceFactKey = stringFactKey(sourceExtensionId, "retained-source-value");
  const blockerFactKey = stringFactKey(targetExtensionId, "blocker-ready");
  const fixture = createCheckedCallFixture();
  const blocker = {};
  const sourceWriteResults: string[] = [];
  const sourceValuesDuringApply: Array<string | undefined> = [];
  let producerCalls = 0;
  let blockerMapperCalls = 0;
  let blockerApplications = 0;
  let sourceApplications = 0;
  const blockerRequest = checkedPropertyRequest(blocker);
  const blockerOperation = {
    operationId: "checked-source-call.replay.blocker",
    operationKind: "property" as const,
    targetOperation: "checked-source-call.replay.blocker",
  };
  const host = new ExtensionHost({}, {
    activeTarget: contractTarget,
    extensions: [
      producerExtension(sourceExtensionId, [{
        selector: exportSelector(),
        produce: (operation, context) => {
          producerCalls += 1;
          sourceWriteResults.push(context.facts.set(sourceFactKey, "retained-source-effect"));
          return completeCheckedSourceCallProduction;
        },
      }]),
      compilerExtension(targetExtensionId, {
        composition: { kind: "target", target: contractTarget },
        dependsOn: [sourceExtensionId],
        initialize: (context) => {
          assert.equal(context.registerTargetSemanticProvider({
            identity: {
              id: `${targetExtensionId}.provider`,
              version: "1.0.0",
              target: contractTarget,
              extensionContractVersion: TstsProviderContractVersion,
              providerKind: "semantic",
            },
            mapCheckedPropertyAccess: (_request, observationContext) => {
              blockerMapperCalls += 1;
              return observationContext.phase === "checking"
                ? deferObservation
                : acceptObservation({ operation: blockerOperation });
            },
          }), true);
        },
      }),
    ],
  });
  publishProviderDeclaration(host, fixture);

  const blockerResult = host[extensionHostRunCheckedOperation](
    propertyObservation,
    blockerRequest,
    () => {
      throw new Error("The retained blocker unexpectedly reached core mapping.");
    },
    () => {
      blockerApplications += 1;
      assert.equal(host[extensionHostSetFact](blocker, blockerFactKey, "ready"), "inserted");
    },
    { requireOwner: true },
  );
  assert.equal(blockerResult.kind, "owner-deferred");

  const initial = runCheckedCall(host, fixture, () => {
    sourceApplications += 1;
    sourceValuesDuringApply.push(host.facts.get(fixture.call, sourceFactKey));
    return host.facts.get(blocker, blockerFactKey) === undefined
      ? { kind: "deferred", unresolved: propertyReference(blocker) }
      : { kind: "applied" };
  });

  assert.equal(initial.kind, "owner-deferred");
  assert.equal(producerCalls, 1);
  assert.deepEqual(sourceWriteResults, ["inserted"]);
  assert.equal(sourceApplications, 1);
  assert.deepEqual(sourceValuesDuringApply, ["retained-source-effect"]);
  assert.equal(host.facts.get(fixture.call, sourceFactKey), undefined);

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.equal(blockerMapperCalls, 2);
  assert.equal(blockerApplications, 1);
  assert.equal(producerCalls, 1);
  assert.deepEqual(sourceWriteResults, ["inserted"]);
  assert.equal(sourceApplications, 2);
  assert.deepEqual(sourceValuesDuringApply, ["retained-source-effect", "retained-source-effect"]);
  assert.equal(host.facts.get(blocker, blockerFactKey), "ready");
  assert.equal(host.facts.get(fixture.call, sourceFactKey), "retained-source-effect");
  assert.equal(host.diagnostics.all().length, 0);

  host.finalizeSemantics();
  assert.equal(producerCalls, 1);
  assert.equal(sourceApplications, 2);
  assert.equal(blockerApplications, 1);
});

test("unresolved finalization names the exact deferring source extension", () => {
  const deferringExtensionId = "checked-source-call.unresolved.exact-source";
  const phases: string[] = [];
  const fixture = createCheckedCallFixture();
  const host = new ExtensionHost({}, {
    extensions: [
      producerExtension(deferringExtensionId, [{
        selector: exportSelector(),
        produce: (_operation, context) => {
          phases.push(`${context.phase}:${context.extensionId}`);
          return deferCheckedSourceCallProduction;
        },
      }]),
    ],
  });
  publishProviderDeclaration(host, fixture);
  const initial = runCheckedCall(host, fixture, () => {
    assert.fail("A permanently deferred source operation must not apply.");
  });

  assert.equal(initial.kind, "owner-deferred");
  assert.equal(initial.kind === "owner-deferred" ? initial.extensionId : undefined, deferringExtensionId);
  assert.equal(host.diagnostics.all().length, 0);

  host.finalizeSemantics();

  assert.equal(host.finalized, true);
  assert.deepEqual(phases, [
    `checking:${deferringExtensionId}`,
    `finalization:${deferringExtensionId}`,
  ]);
  const unresolved = host.diagnostics.all().filter((item) =>
    item.numericCode === ExtensionHostDiagnosticCode.observationOwnerDeferred);
  assert.equal(unresolved.length, 1);
  assert.equal(unresolved[0]?.extensionId, "tsts.extension-host");
  assert.equal(unresolved[0]?.extensionCode, "OBSERVATION_OWNER_DEFERRED");
  assert.equal(
    unresolved[0]?.message,
    `Extension '${deferringExtensionId}' still deferred checked semantic operation '${callObservation}' after semantic finalization.`,
  );
});
