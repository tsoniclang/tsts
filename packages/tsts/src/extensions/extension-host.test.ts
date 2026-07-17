import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionHostDiagnosticCode,
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  argumentPassingFactKey,
  attachExtensionHost,
  attachExtensionHostToProgram,
  associatedTypeFactKey,
  canonicalIdentityFactKey,
  constGenericFactKey,
  createExtensionConsumerQueries,
  defineExtensionFactKey,
  deferObservation,
  flowStateFactKey,
  getExtensionHost,
  hasExtensionHost,
  rejectObservation,
  runtimeCarrierFactKey,
  selectedTargetSignatureFactKey,
  sourcePrimitiveFactKey,
  targetBindingFactKey,
  targetOperationFactKey,
} from "./index.js";
import type {
  CompilerExtension,
  ExtensionDiagnostic,
  ExtensionEvidence,
  CheckedConversionMappingResult,
  ProviderDeclarationModel,
  ProviderExportDeclaration,
  ProviderImportDeclaration,
  ProviderMemberDeclaration,
  ProviderModuleContext,
  ProviderModuleResolution,
  ProviderRequestedExport,
  ProviderTypeExpression,
  ProviderVirtualDeclarationDocument,
  CheckedCallMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedOperationMappingResult,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  TargetConstraintValidationRequest,
  TargetSignatureSelection,
  SourceFileBoundLifecycleRequest,
  TargetBindingFact,
  TargetBindingProvider,
  TargetIdentity,
  TargetOperationFact,
  TargetSemanticProvider,
  TargetTypeRef,
  ExtensionFlowUseValidationRequest,
  ExtensionFlowUseValidationResult,
} from "./index.js";
import { extensionHostRunCheckedOperation } from "./host.js";
import {
  getProviderVirtualArtifactForCompiler,
  providerCanonicalExportOwnerMarker,
  providerCanonicalModuleDependencyContextMarker,
  providerVirtualInternalRoot,
} from "./provider-virtual-internal.js";
import { providerAncillaryDataLimits, providerDeclarationClosureLimits } from "./provider-resource-limits.js";

const primitiveFactKey = defineExtensionFactKey({
  extensionId: "source-primitives",
  name: "primitive",
});

const ignoreCheckedOperationAcceptance = (): void => {};

function extension(id: string, options: {
  readonly dependsOn?: readonly string[];
  readonly runsAfter?: readonly string[];
  readonly composition?: CompilerExtension["composition"];
  readonly observationOwners?: CompilerExtension["observationOwners"];
  readonly diagnosticRange?: CompilerExtension["identity"]["diagnosticRange"];
  readonly initialize?: CompilerExtension["initialize"];
} = {}): CompilerExtension {
  const dependencies = options.dependsOn !== undefined || options.runsAfter !== undefined
    ? {
      ...(options.dependsOn !== undefined ? { dependsOn: options.dependsOn } : {}),
      ...(options.runsAfter !== undefined ? { runsAfter: options.runsAfter } : {}),
    } satisfies CompilerExtension["dependencies"]
    : undefined;
  return {
    identity: {
      id,
      version: "1.0.0",
      capabilityNamespace: id,
      ...(options.diagnosticRange !== undefined ? { diagnosticRange: options.diagnosticRange } : {}),
    },
    ...(dependencies !== undefined ? { dependencies } : {}),
    ...(options.composition !== undefined ? { composition: options.composition } : {}),
    ...(options.observationOwners !== undefined ? { observationOwners: options.observationOwners } : {}),
    ...(options.initialize !== undefined ? { initialize: options.initialize } : {}),
  };
}

test("extension host is sidecar state, not ambient program mutation", () => {
  const program = {};

  assert.equal(hasExtensionHost(program), false);
  assert.equal(getExtensionHost(program), undefined);

  const extended = attachExtensionHost(program, {
    extensions: [extension("source-primitives")],
  });

  assert.equal(extended.program, program);
  assert.equal(getExtensionHost(program), extended.extensionHost);
  assert.equal(hasExtensionHost(program), true);
  assert.deepEqual(extended.extensionHost.extensions.map((item) => item.identity.id), ["source-primitives"]);
});

test("extension host attaches from creation options to constructed program", () => {
  const options = {};
  const program = {};

  const extendedOptions = attachExtensionHost(options);
  const extendedProgram = attachExtensionHostToProgram(options, program);

  assert.equal(extendedProgram?.program, program);
  assert.equal(extendedProgram?.extensionHost, extendedOptions.extensionHost);
  assert.equal(extendedOptions.extensionHost.program, program);
  assert.equal(getExtensionHost(program), extendedOptions.extensionHost);
  assert.equal(Object.prototype.hasOwnProperty.call(program, "__extensionHost"), false);

  const checkerProgramAdapter = {};
  const adapterAttachment = attachExtensionHostToProgram(program, checkerProgramAdapter, { bindCompilerProgram: false });
  assert.equal(adapterAttachment?.extensionHost, extendedOptions.extensionHost);
  assert.equal(getExtensionHost(checkerProgramAdapter), extendedOptions.extensionHost);
  assert.equal(extendedOptions.extensionHost.program, program);
});

test("extension ordering is deterministic and honors dependencies", () => {
  const initialized: string[] = [];
  const host = new ExtensionHost({}, {
    extensions: [
      extension("surface", { dependsOn: ["target"], initialize: () => initialized.push("surface") }),
      extension("source", { initialize: () => initialized.push("source") }),
      extension("target", { dependsOn: ["source"], initialize: () => initialized.push("target") }),
    ],
  });

  assert.deepEqual(host.extensions.map((item) => item.identity.id), ["source", "target", "surface"]);
  assert.deepEqual(initialized, ["source", "target", "surface"]);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("runsAfter orders only when the predecessor is present", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("attributes", { runsAfter: ["target"] }),
      extension("source"),
      extension("target"),
    ],
  });

  assert.deepEqual(host.extensions.map((item) => item.identity.id), ["source", "target", "attributes"]);
});

test("missing dependencies, duplicate ids, and cycles are deterministic diagnostics", () => {
  const initialized: string[] = [];
  const duplicateHost = new ExtensionHost({}, {
    extensions: [extension("source"), extension("source")],
  });
  assert.equal(duplicateHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.duplicateExtension);

  const missingHost = new ExtensionHost({}, {
    extensions: [
      extension("target", { dependsOn: ["source"], initialize: () => initialized.push("target") }),
      extension("surface", { dependsOn: ["target"], initialize: () => initialized.push("surface") }),
    ],
  });
  assert.equal(missingHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.missingDependency);
  assert.deepEqual(missingHost.extensions.map((item) => item.identity.id), []);
  assert.equal(initialized.length, 0);

  const cycleHost = new ExtensionHost({}, {
    extensions: [
      extension("a", { dependsOn: ["b"], initialize: () => initialized.push("a") }),
      extension("b", { dependsOn: ["a"], initialize: () => initialized.push("b") }),
    ],
  });
  assert.equal(cycleHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.dependencyCycle);
  assert.deepEqual(cycleHost.extensions.map((item) => item.identity.id), []);
  assert.equal(initialized.length, 0);
});

test("observation owners are required and conflicts are reported", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("source", { observationOwners: [ExtensionObservationPoint.validateTargetConstraint] }),
      extension("other", { observationOwners: [ExtensionObservationPoint.validateTargetConstraint] }),
    ],
  });

  assert.equal(host.getObservationOwner(ExtensionObservationPoint.validateTargetConstraint)?.identity.id, "other");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationOwnerConflict);

  assert.equal(host.requireObservationOwner(ExtensionObservationPoint.mapCheckedCall), undefined);
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.observationOwnerMissing);

  host.registerObservationOwner(ExtensionObservationPoint.mapCheckedCall, "missing-extension");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.unknownObservationOwner);
});

test("public runObservation rejects every checked observation point at runtime despite compile-time exclusion", () => {
  const host = new ExtensionHost({});
  const checkedObservationPoints = [
    ExtensionObservationPoint.mapCheckedCall,
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    ExtensionObservationPoint.mapCheckedElementAccess,
    ExtensionObservationPoint.mapCheckedOperator,
    ExtensionObservationPoint.mapCheckedIteration,
    ExtensionObservationPoint.mapCheckedConversion,
  ] as const;

  for (const observation of checkedObservationPoints) {
    assert.throws(
      // @ts-expect-error Checked operation points are intentionally excluded from the public immediate-observation API.
      () => host.runObservation(observation, {}, () => undefined),
      (error: unknown) => error instanceof Error
        && error.message === `Checked semantic operation '${observation}' must use the host-owned finalization inventory.`,
      observation,
    );
  }
});

test("fact store supports insert, idempotent writes, conflicts, and object subjects only", () => {
  const host = new ExtensionHost({});
  const subject = {};
  const canonicalSubject = {};

  assert.equal(host.facts.set(subject, primitiveFactKey, "int32"), "inserted");
  assert.equal(host.facts.set(subject, primitiveFactKey, "int32"), "idempotent");
  assert.equal(host.facts.get(subject, primitiveFactKey), "int32");
  assert.equal(host.facts.set(subject, primitiveFactKey, "int64"), "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.factConflict);

  assert.equal(host.facts.set(canonicalSubject, primitiveFactKey, "int32"), "inserted");
  assert.equal(host.facts.get(canonicalSubject, primitiveFactKey), "int32");

  assert.equal(Reflect.apply(host.facts.set, host.facts, [null, primitiveFactKey, "int32"]), "invalid-subject");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidFactSubject);
});

test("fact conflict diagnostics are keyed per object subject", () => {
  const host = new ExtensionHost({});
  const firstSubject = {};
  const secondSubject = {};

  host.facts.set(firstSubject, primitiveFactKey, "int32");
  host.facts.set(firstSubject, primitiveFactKey, "int64");
  host.facts.set(secondSubject, primitiveFactKey, "int32");
  host.facts.set(secondSubject, primitiveFactKey, "int64");

  const conflicts = host.diagnostics.all().filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.factConflict);
  assert.equal(conflicts.length, 2);
});

test("fact resolver computes lazily and caches through the fact store", () => {
  const host = new ExtensionHost({});
  const canonical = {};
  const alias = {};
  let resolveCount = 0;

  host.facts.set(canonical, primitiveFactKey, "int32");
  host.factResolver.register(primitiveFactKey, (subject, context) => {
    if (subject !== alias) {
      return undefined;
    }
    resolveCount += 1;
    const value = context.facts.get(canonical, primitiveFactKey);
    return value === undefined ? undefined : {
      value,
      evidence: [{ message: "alias resolved to canonical primitive" }],
    };
  });

  assert.equal(host.factResolver.resolve(alias, primitiveFactKey), "int32");
  assert.equal(host.factResolver.resolve(alias, primitiveFactKey), "int32");
  assert.equal(resolveCount, 1);
  assert.equal(host.facts.getEntry(alias, primitiveFactKey)?.evidence[0]?.message, "alias resolved to canonical primitive");
});

test("fact resolver can lazily cache finalized facts without sealed-store diagnostics", () => {
  const host = new ExtensionHost({});
  const canonical = {};
  const alias = {};

  host.facts.set(canonical, primitiveFactKey, "int32");
  host.factResolver.register(primitiveFactKey, (subject, context) => {
    if (subject !== alias) {
      return undefined;
    }
    const value = context.facts.get(canonical, primitiveFactKey);
    return value === undefined ? undefined : {
      value,
      evidence: [{ message: "post-finalization alias resolved to canonical primitive" }],
    };
  });

  host.finalizeSemantics();
  assert.equal(host.getFactForConsumer("emitter", alias, primitiveFactKey), "int32");
  assert.equal(host.facts.getEntry(alias, primitiveFactKey)?.evidence[0]?.message, "post-finalization alias resolved to canonical primitive");
  assert.equal(host.diagnostics.all().some((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.factStoreSealed), false);
});

test("provider registry requires explicit provider identity and rejects duplicates", () => {
  const host = new ExtensionHost({});
  const provider = acmeBindingProvider("@example/target/Acme.Buffers.js");

  assert.equal(host.providers.registerTargetBindingProvider(provider), true);
  assert.equal(host.providers.hasBindingProviders, true);
  assert.equal(host.providers.registerTargetBindingProvider(provider), true);

  assert.equal(host.providers.registerTargetBindingProvider(acmeBindingProvider("@example/target/Acme.Text.js")), false);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.duplicateProvider);

  const invalidProvider = acmeBindingProvider("@example/target/Invalid.js", {
    id: "",
    providerKind: "semantic",
  });
  assert.equal(host.providers.registerTargetBindingProvider(invalidProvider), false);
  assert.equal(host.diagnostics.all()[1]?.numericCode, ExtensionHostDiagnosticCode.invalidProvider);
});

test("provider registry rejects unsupported extension contract versions", () => {
  const host = new ExtensionHost({});
  const provider = acmeBindingProvider("@example/target/Acme.Buffers.js", {
    extensionContractVersion: "unsupported.contract.0",
  });

  assert.equal(host.providers.registerTargetBindingProvider(provider), false);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerContractMismatch);
  assert.match(host.diagnostics.all()[0]?.message ?? "", /unsupported extension contract/);
  assert.equal(host.providers.resolveVirtualModule("@example/target/Acme.Buffers.js").kind, "unowned");
});

test("registered diagnostic ranges reject unstable extension codes", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("a-range-checked-extension", {
        diagnosticRange: { start: 9101000, end: 9101999 },
        initialize: (context) => {
          context.diagnostics.append(diagnostic("a-range-checked-extension", "IN_RANGE", 9101001, "accepted diagnostic"));
          context.diagnostics.append(diagnostic("a-range-checked-extension", "OUT_OF_RANGE", 9200001, "rejected diagnostic"));
        },
      }),
      extension("bad-range-extension", {
        diagnosticRange: { start: 9300002, end: 9300001 },
      }),
      extension("z-overlapping-range-extension", {
        diagnosticRange: { start: 9101500, end: 9102500 },
      }),
    ],
  });

  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "IN_RANGE"), true);
  assert.equal(host.diagnostics.all().some((item) => item.extensionCode === "OUT_OF_RANGE"), false);
  assert.equal(host.diagnostics.all().some((item) => item.numericCode === ExtensionHostDiagnosticCode.diagnosticCodeOutOfRange), true);
  assert.equal(host.diagnostics.all().filter((item) => item.numericCode === ExtensionHostDiagnosticCode.diagnosticRangeInvalid).length, 2);
});

test("extensions register binding and semantic providers through initialization context", () => {
  const bindingProvider = acmeBindingProvider("@example/target/Acme.Buffers.js");
  const call = {};
  const callee = {};
  const argument = {};
  const semanticProvider: TargetSemanticProvider = {
    identity: {
      id: "acme-semantic",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature: {
        member: {
          id: "Acme.TryParse",
          sourceName: "tryParse",
          targetName: "TryParse",
          kind: "method",
          parameters: [{
            name: "result",
            type: { kind: "source-primitive", name: "int32" },
            passingMode: "byref-writeonly-must-init",
          }],
        },
      },
      argumentConversions: [argumentConversionSlot(0)],
    }),
  };
  const host = new ExtensionHost({}, {
    extensions: [
      extension("acme", {
        initialize: (context) => {
          assert.equal(context.registerTargetBindingProvider(bindingProvider), true);
          assert.equal(context.registerTargetSemanticProvider(semanticProvider), true);
        },
      }),
    ],
  });

  assert.equal(host.providers.hasBindingProviders, true);
  assert.equal(host.diagnostics.hasErrors(), false);

  const mapped = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [argument],
    target: "acme",
  }, () => ({ kind: "source" }), ignoreCheckedOperationAcceptance, { requireOwner: true });

  assert.equal(mapped.kind, "accept");
  assert.equal(mapped.kind === "accept" && mapped.value.kind === "target" ? mapped.value.selectedSignature.member.parameters[0]?.passingMode : undefined, "byref-writeonly-must-init");
  assert.deepEqual(mapped.kind === "accept" && mapped.value.kind === "target" ? mapped.value.argumentConversions : [], [argumentConversionSlot(0)]);
  assert.equal(mapped.kind === "accept" ? mapped.extensionId : undefined, "acme");
});

test("semantic provider methods own typed observations without hook boilerplate", () => {
  const expression = {};
  const convertedExpression = {};
  const propertyAccess = {};
  const elementAccess = {};
  const operatorExpression = {};
  const lambda = {};
  const flowUse = {};
  const int32Type = { kind: "source-primitive", name: "int32" } satisfies TargetTypeRef;
  const longType = {};
  const byteType = {};
  const charType = { kind: "source-primitive", name: "char" } satisfies TargetTypeRef;
  const stringType = {};
  const delegateType = {};
  const consoleWriteLine = {};
  const callArgument = {};
  const spanArgument = {};
  const leftOperand = {};
  const rightOperand = {};
  const symbol = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("acme-target", {
        initialize: (context) => {
          assert.equal(context.registerTargetSemanticProvider({
            identity: {
              id: "acme-semantic",
              version: "1.0.0",
              target: "acme",
              extensionContractVersion: TstsProviderContractVersion,
              providerKind: "semantic",
            },
            validateTargetConstraint: () => acceptObservation(true),
            observePostCheckAssignability: () => acceptObservation(undefined),
            mapCheckedCall: () => acceptObservation({
              kind: "target",
              selectedSignature: {
                ...selectedSignature("Acme.Console.WriteLine(Acme.Int32)", true),
                targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
              },
              argumentConversions: [argumentConversionSlot(0)],
            }),
            mapCheckedPropertyAccess: () => acceptObservation({
              operation: targetOperation("Acme.String.Length", "property"),
              resultType: int32Type,
            }),
            mapCheckedElementAccess: () => acceptObservation({
              operation: targetOperation("Acme.Span.GetItem", "indexer"),
              resultType: charType,
            }),
            mapCheckedOperator: () => acceptObservation({
              operation: targetOperation("Acme.Int32.op_Addition", "operator"),
              resultType: int32Type,
            }),
            recordContextualTargetType: () => acceptObservation({
              type: delegateType,
              targetType: { kind: "target-named", id: "Acme.Func`2" },
            }),
            mapCheckedConversion: () => acceptObservation({
              convertedType: { kind: "source-primitive", name: "int32" },
              operation: targetOperation("Acme.Convert.ToInt32", "method"),
            }),
            resolveRuntimeCarrier: () => acceptObservation({
              carrier: { kind: "target-named", id: "Acme.Int32" },
              requiresAllocation: false,
            }),
            validateExtensionFlowUse: () => acceptObservation({
              valid: true,
              targetCompilerValidationRequired: false,
            }),
          }), true);
        },
      }),
    ],
  });

  const constraint = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source: int32Type,
    constraint: { kind: "implements", contract: "Acme.IEquatable`1" },
    target: "acme",
  }, () => false, { requireOwner: true });
  assert.equal(constraint.kind === "accept" ? constraint.value : false, true);

  const assignable = host.runObservation(ExtensionObservationPoint.observePostCheckAssignability, {
    source: int32Type,
    target: longType,
    relation: "assignment",
  }, () => undefined, { requireOwner: true });
  assert.equal(assignable.kind, "accept");

  const call = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
    call: expression,
    callee: consoleWriteLine,
    arguments: [callArgument],
    target: "acme",
  }, () => ({ kind: "source" }), ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(call.kind === "accept" && call.value.kind === "target" ? call.value.selectedSignature.member.id : undefined, "Acme.Console.WriteLine(Acme.Int32)");
  assert.equal(call.kind === "accept" && call.value.kind === "target" ? call.value.selectedSignature.member.typeParameters?.length : undefined, 1);
  assert.equal(call.kind === "accept" && call.value.kind === "target" ? call.value.selectedSignature.targetTypeArguments?.length : undefined, 1);
  assert.deepEqual(call.kind === "accept" && call.value.kind === "target" ? call.value.selectedSignature.targetTypeArguments : [], [{ kind: "source-primitive", name: "int32" }]);
  assert.deepEqual(call.kind === "accept" && call.value.kind === "target" ? call.value.argumentConversions : [], [argumentConversionSlot(0)]);

  const property = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedPropertyAccess, {
    expression: propertyAccess,
    receiver: stringType,
    propertyName: "length",
    target: "acme",
  }, () => ({ operation: targetOperation("core", "property") }), ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(property.kind === "accept" ? property.value.operation.operationId : undefined, "Acme.String.Length");

  const element = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedElementAccess, {
    expression: elementAccess,
    receiver: stringType,
    argument: spanArgument,
    target: "acme",
  }, () => ({ operation: targetOperation("core", "indexer") }), ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(element.kind === "accept" ? element.value.operation.operationId : undefined, "Acme.Span.GetItem");

  const operator = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedOperator, {
    expression: operatorExpression,
    operator: "+",
    left: leftOperand,
    right: rightOperand,
    target: "acme",
  }, () => ({ operation: targetOperation("core", "operator") }), ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(operator.kind === "accept" ? operator.value.operation.operationId : undefined, "Acme.Int32.op_Addition");

  const contextual = host.runObservation(ExtensionObservationPoint.recordContextualTargetType, {
    expression: lambda,
    context: delegateType,
    target: "acme",
  }, () => ({ type: int32Type }), { requireOwner: true });
  assert.equal(contextual.kind === "accept" ? contextual.value.type : undefined, delegateType);

  const noConversion: CheckedConversionMappingResult = {};
  const conversion = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedConversion, {
    conversionKind: "assertion",
    assertionKind: "as",
    expression: convertedExpression,
    source: byteType,
    target: int32Type,
    sourceExpression: convertedExpression,
    explicitTargetTypeNode: int32Type,
    targetPlatform: "acme",
  }, () => noConversion, ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(conversion.kind === "accept" ? conversion.value.operation?.operationId : undefined, "Acme.Convert.ToInt32");

  const carrier = host.runObservation(ExtensionObservationPoint.resolveRuntimeCarrier, {
    type: int32Type,
    target: "acme",
  }, () => ({ carrier: { kind: "opaque", id: "core" } }), { requireOwner: true });
  assert.equal(carrier.kind === "accept" ? carrier.value.carrier.kind : undefined, "target-named");

  const flow = host.runObservation(ExtensionObservationPoint.validateExtensionFlowUse, {
    useSite: flowUse,
    symbol,
    mode: "read",
    target: "acme",
  }, () => ({ valid: false }), { requireOwner: true });
  assert.equal(flow.kind === "accept" ? flow.value.valid : false, true);
  assert.equal(flow.kind === "accept" ? flow.extensionId : undefined, "acme-target");
});

test("observation hooks receive a read-only compiler query context", () => {
  const program = {};
  const source = {};
  const constraint = { kind: "implements", contract: "Acme.QueryContext" } as const;
  let observedProgram: object | undefined;
  let observedQueryFacade = false;
  const host = new ExtensionHost(program, {
    extensions: [
      extension("acme-target", {
        observationOwners: [ExtensionObservationPoint.validateTargetConstraint],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (_request, observationContext) => {
            observedProgram = observationContext.compiler.program;
            observedQueryFacade = typeof observationContext.compiler.ast.kindName === "function"
              && typeof observationContext.compiler.checker.getTypeAtLocation === "function"
              && typeof observationContext.compiler.typeShape.typeToString === "function"
              && typeof observationContext.compiler.getSourceFiles === "function";
            return acceptObservation(true);
          });
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source,
    constraint,
  }, () => false, { requireOwner: true });

  assert.equal(result.kind, "accept");
  assert.equal(observedProgram, program);
  assert.equal(observedQueryFacade, true);
});

test("target binding providers own and resolve virtual modules without file-backed side data", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(acmeBindingProvider(specifier));

  const context = {
    containingFile: "/src/example.ts",
    activeTarget: "acme",
  };
  const result = host.providers.resolveVirtualModule(specifier, context);
  assert.equal(result.kind, "resolved");
  if (result.kind !== "resolved") {
    return;
  }

  assert.equal(result.module.resolution.virtualFileName, "tsts-provider://acme/Acme.Buffers");
  assertProviderPublicVirtualFileName(result.module.artifact.fileName);
  assert.equal(result.module.declarationModel.exports[0]?.name, "SearchValues");
  assert.match(result.module.artifact.sourceText, /export \{ __TstsProviderCanonical_SearchValues as SearchValues \};/);
  assert.match(result.module.artifact.sourceText, /export type \{ __TstsProviderCanonical_Token as Token \};/);
  assert.equal(result.module.artifact.sourceText.includes("export declare class SearchValues"), false);
  const ownerSource = getCanonicalExportOwnerSource(host, "SearchValues");
  assert.match(ownerSource, /export declare class SearchValues<T extends unknown>/);
  assert.match(ownerSource, /Contains\(value: T\): boolean;/);
  assert.match(getCanonicalExportOwnerSource(host, "Token"), /export type Token = number;/);
  assert.equal(result.module.artifact.document.uri, result.module.artifact.fileName);
  assert.equal(result.module.artifact.document.readOnly, true);
  assert.equal(result.module.artifact.document.provider.id, "acme");
  assert.equal(result.module.artifact.document.sourceText, result.module.artifact.sourceText);
  const cached = host.providers.resolveVirtualModule(specifier, context);
  assert.equal(cached.kind, "resolved");
  if (cached.kind === "resolved") {
    assert.equal(cached.module, result.module);
  }
  assert.equal(result.module.declarationModel.exports[0]?.targetIdentity?.id, "Acme.Buffers.SearchValues`1");

  assert.equal(host.providers.resolveVirtualModule("@example/target/Unknown.js").kind, "unowned");
});

test("virtual declaration documents are stable consumer-readable compiler state", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(acmeBindingProvider(specifier));

  const result = host.providers.resolveVirtualModule(specifier, { activeTarget: "acme" });
  assert.equal(result.kind, "resolved");
  if (result.kind !== "resolved") {
    return;
  }

  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 2);
  assert.equal(host.providers.getVirtualDeclarationDocument(result.module.artifact.fileName), result.module.artifact.document);

  const consumer = createExtensionConsumerQueries(host, "future-lsp");
  assert.equal(consumer.getVirtualDeclarationDocument(result.module.artifact.fileName), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.consumerBeforeFinalization);

  host.finalizeSemantics();
  const document = consumer.getVirtualDeclarationDocument(result.module.artifact.fileName);
  assert.equal(document, result.module.artifact.document);
  assert.equal(document?.moduleSpecifier, specifier);
  assert.match(document?.sourceText ?? "", /export \{ __TstsProviderCanonical_SearchValues as SearchValues \};/);
  const ownerDocument = getCanonicalExportOwnerDocuments(host).find((candidate) => candidate.sourceText.includes("Contains(value: T): boolean;"));
  assert.ok(ownerDocument !== undefined);
  assert.equal(consumer.getVirtualDeclarationDocument(ownerDocument.fileName), undefined);
});

test("provider ownership conflicts and invalid declaration models are diagnostics", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const conflictHost = new ExtensionHost({});
  conflictHost.providers.registerTargetBindingProvider(acmeBindingProvider(specifier, { id: "first" }));
  conflictHost.providers.registerTargetBindingProvider(acmeBindingProvider(specifier, { id: "second" }));

  const conflict = conflictHost.providers.resolveVirtualModule(specifier);
  assert.equal(conflict.kind, "conflict");
  if (conflict.kind === "conflict") {
    assert.deepEqual(conflict.providers.map((provider) => provider.id), ["first", "second"]);
    assert.equal(Object.isFrozen(conflict.providers), true);
    assert.ok(conflict.providers.every((provider) => Object.isFrozen(provider)));
    assert.ok(conflict.providers.every((provider) => !("ownsModule" in provider)));
  }
  assert.equal(conflictHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerOwnershipConflict);

  const invalidHost = new ExtensionHost({});
  invalidHost.providers.registerTargetBindingProvider(acmeBindingProvider(specifier, {
    declarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: "wrong-provider-module-id",
      exports: [],
    }),
  }));

  assert.equal(invalidHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(invalidHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
});

test("provider callback failures are diagnostics and never fall back to files", () => {
  const specifier = "@target/failing.js";
  const ownershipHost = new ExtensionHost({});
  ownershipHost.providers.registerTargetBindingProvider({
    identity: providerIdentity("throwing-ownership-provider", "demo", "binding"),
    ownsModule: () => {
      throw new Error("ownership failed");
    },
    resolveModule: () => {
      throw new Error("must not resolve");
    },
    getDeclarationModel: () => {
      throw new Error("must not declare");
    },
  });

  assert.equal(ownershipHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(ownershipHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerOwnershipFailed);

  const resolutionHost = new ExtensionHost({});
  resolutionHost.providers.registerTargetBindingProvider({
    identity: providerIdentity("throwing-resolution-provider", "demo", "binding"),
    ownsModule: () => ({ kind: "owned" }),
    resolveModule: () => {
      throw new Error("resolution failed");
    },
    getDeclarationModel: () => {
      throw new Error("must not declare");
    },
  });

  assert.equal(resolutionHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(resolutionHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerResolveFailed);

  const declarationHost = new ExtensionHost({});
  declarationHost.providers.registerTargetBindingProvider({
    identity: providerIdentity("throwing-declaration-provider", "demo", "binding"),
    ownsModule: () => ({ kind: "owned" }),
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://throwing/declaration",
      providerModuleId: "throwing.declaration",
    }),
    getDeclarationModel: () => {
      throw new Error("declaration failed");
    },
  });

  assert.equal(declarationHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(declarationHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerDeclarationFailed);
});

test("provider resolution rejects callback re-entry transactionally and caches the terminal rejection", () => {
  const specifier = "@target/reentrant.js";
  let reenter = true;
  let declarationCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("reentrant-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => {
      if (reenter) {
        const nested = host.providers.resolveVirtualModule(moduleSpecifier, { activeTarget: "demo" });
        assert.equal(nested.kind, "rejected");
      }
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://reentrant/model",
        providerModuleId: "reentrant.model",
      };
    },
    getDeclarationModel: (resolution) => {
      declarationCount += 1;
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
      };
    },
  });

  const rejected = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(rejected.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "PROVIDER_RESOLUTION_REENTRANT");
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  assert.equal(declarationCount, 1);

  reenter = false;
  const retry = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(retry, rejected);
  assert.equal(declarationCount, 1);
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 0);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 0);
});

test("provider resolution validates reentrant specifiers before diagnostics and rejects the outer transaction", () => {
  const specifier = "@target/reentrant-invalid-specifier.js";
  const oversizedSpecifier = "s".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1);
  let nestedResult: ReturnType<ExtensionHost["providers"]["resolveVirtualModule"]> | undefined;
  let declarationCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("reentrant-invalid-specifier-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => {
      nestedResult = host.providers.resolveVirtualModule(oversizedSpecifier, { activeTarget: "demo" });
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://reentrant-invalid-specifier/model",
        providerModuleId: "reentrant.invalid.specifier.model",
      };
    },
    getDeclarationModel: (resolution) => {
      declarationCount += 1;
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
      };
    },
  });

  const rejected = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(nestedResult?.kind, "rejected");
  assert.equal(nestedResult?.diagnostic.extensionCode, "INVALID_PROVIDER_MODULE_SPECIFIER");
  assert.equal(rejected.kind, "rejected");
  assert.equal(rejected.diagnostic, nestedResult?.diagnostic);
  assert.equal(declarationCount, 1);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 0);
});

test("provider declaration models render the supported export member and type matrix", () => {
  const specifier = "@target/runtime.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  if (resolved.kind !== "resolved") {
    return;
  }

  const source = getCanonicalExportOwnerDocuments(host).map((document) => document.sourceText).join("\n");
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 8);
  assert.equal(resolved.module.artifact.sourceText.includes("export declare class Box"), false);
  assert.match(source, /export declare class Box<T extends number>/);
  assert.match(source, /constructor\(value: T\);/);
  assert.match(source, /value: T;/);
  assert.match(source, /static Count: number;/);
  assert.match(source, /\[index: number\]: string;/);
  assert.match(source, /export interface Writer/);
  assert.match(source, /write\(text\?: string, \.\.\.chunks: string\[\]\): number;/);
  assert.match(source, /continueWith\(callback: \(\) => object, state: object \| undefined\): object;/);
  assert.match(source, /export declare function tryParse<T extends number>\(text\?: string, \.\.\.values: number\[\]\): boolean;/);
  assert.match(source, /export type Pair = \[number, string\];/);
  assert.match(source, /export declare const DefaultSize: number;/);
  assert.match(source, /export declare namespace Buffers/);
  assert.match(source, /export const Capacity: number;/);
  assert.match(source, /export declare enum Color/);
  assert.match(source, /Red,/);
  assert.match(source, /export declare const NativeHandle: unique symbol;/);

  assert.equal(resolved.module.declarationModel.exports.length, 8);
  assert.equal(resolved.module.artifact.document.sourceText, resolved.module.artifact.sourceText);
});

test("provider declaration models render imports heritage defaults readonly optionals and provider refs", () => {
  const specifier = "@acme/native/rich.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(richBindingProvider(specifier));

  const resolved = host.providers.resolveVirtualModule(specifier, {
    activeTarget: "acme-native",
    importSlice: {
      moduleSpecifier: specifier,
      kind: "named",
      requestedExports: [{ exportedName: "Derived", kind: "type" }],
      typeOnly: true,
    },
  });
  assert.equal(resolved.kind, "resolved");
  if (resolved.kind !== "resolved") {
    return;
  }

  const source = getCanonicalExportOwnerSource(host, "Derived");
  const baseImport = source.match(/import type \{ BaseShape as ([A-Za-z0-9_$]+) \} from "[^"]+\.tsts-export-owner-[^"]+\.d\.ts";/);
  const defaultImport = source.match(/import type \{ default as ([A-Za-z0-9_$]+) \} from "[^"]+\.tsts-export-owner-[^"]+\.d\.ts";/);
  const iteratorImport = source.match(/import type \{ IteratorShape as ([A-Za-z0-9_$]+) \} from "[^"]+\.tsts-export-owner-[^"]+\.d\.ts";/);
  assert.ok(baseImport !== null);
  assert.ok(defaultImport !== null);
  assert.ok(iteratorImport !== null);
  assert.match(source, new RegExp(`export interface Derived<T extends number = number> extends ${baseImport[1]}`));
  assert.match(source, /readonly id: number;/);
  assert.match(source, /optionalName\?: string;/);
  assert.match(source, new RegExp(`defaultShape: ${defaultImport[1]};`));
  assert.match(source, new RegExp(`make\\(value\\?: ${baseImport[1]}\\): T;`));
  assert.match(source, /"not-valid-identifier": number;/);
  assert.match(source, new RegExp(`\\[Symbol.iterator\\]\\(\\): ${iteratorImport[1]};`));
  assert.match(getCanonicalExportOwnerSource(host, "default", specifier), /export default class __TstsProviderDefaultExport/);
  assert.equal(resolved.module.artifact.sourceText.includes("@acme/native/base.js"), false);
  assert.equal(resolved.module.artifact.sourceText.includes("@acme/native/defaults.js"), false);
  assert.equal(resolved.module.context.importSlice?.requestedExports?.[0]?.exportedName, "Derived");
  assert.equal(resolved.module.context.importSlice?.kind, "named");
});

test("provider declaration models reject incomplete member declarations instead of rendering implicit unknown", () => {
  const specifier = "@target/runtime.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier, {
    members: [{
      id: "Changed",
      name: "Changed",
      kind: "property",
    }],
  }));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
});

test("provider declaration models reject target types without explicit source shape", () => {
  const specifier = "@target/runtime.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier, {
    valueType: {
      kind: "target-named",
      target: "demo",
      id: "Demo.NativeInt",
    },
  }));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
});

test("provider declaration models reject type-parameter references outside scope", () => {
  const specifier = "@target/type-parameter-scope.js";
  const invalidExportSets: readonly ProviderDeclarationModel["exports"][] = [
    [{
      id: "LeakedValue",
      name: "LeakedValue",
      kind: "value",
      type: { kind: "type-parameter", name: "T" },
    }],
    [{
      id: "Box",
      name: "Box",
      kind: "class",
      members: [{
        id: "value",
        name: "value",
        kind: "property",
        type: { kind: "type-parameter", name: "T" },
      }],
    }],
    [{
      id: "call",
      name: "call",
      kind: "function",
      signatures: [{
        id: "call",
        parameters: [{ name: "value", type: { kind: "type-parameter", name: "T" } }],
        returnType: { kind: "void" },
      }],
    }],
    [{
      id: "Box",
      name: "Box",
      kind: "class",
      typeParameters: [{ name: "T" }],
      members: [{
        id: "create",
        name: "create",
        static: true,
        kind: "method",
        signatures: [{
          id: "create()",
          parameters: [],
          returnType: { kind: "type-parameter", name: "T" },
        }],
      }],
    }],
    [{
      id: "Box",
      name: "Box",
      kind: "class",
      typeParameters: [
        { name: "T", defaultType: { kind: "type-parameter", name: "U" } },
        { name: "U" },
      ],
    }],
    [{
      id: "Box",
      name: "Box",
      kind: "class",
      typeParameters: [
        { name: "T", defaultType: { kind: "number" } },
        { name: "U" },
      ],
    }],
    [{
      id: "Outer",
      name: "Outer",
      kind: "class",
      typeParameters: [{ name: "T" }],
      members: [{
        id: "method",
        name: "method",
        kind: "method",
        signatures: [{
          id: "method()",
          typeParameters: [{ name: "T" }],
          parameters: [],
          returnType: { kind: "void" },
        }],
      }],
    }],
  ];

  for (const exports of invalidExportSets) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, exports));
    const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected");
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
  }
});

test("provider declaration models reject unbound provider references before rendering", () => {
  const specifier = "@target/provider-ref-scope.js";
  const invalidModels: readonly {
    readonly name: string;
    readonly imports?: ProviderDeclarationModel["imports"];
    readonly exports: ProviderDeclarationModel["exports"];
  }[] = [{
    name: "external ref without import",
    exports: [{
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{
        id: "value",
        name: "value",
        kind: "property",
        type: { kind: "provider-ref", moduleSpecifier: "@target/other.js", exportName: "Other" },
      }],
    }],
  }, {
    name: "external alias mismatch",
    imports: [{
      moduleSpecifier: "@target/other.js",
      namedImports: [{ exportedName: "Other", localName: "ImportedOther" }],
    }],
    exports: [{
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{
        id: "value",
        name: "value",
        kind: "property",
        type: { kind: "provider-ref", moduleSpecifier: "@target/other.js", exportName: "Other" },
      }],
    }],
  }, {
    name: "same-module missing export",
    exports: [{
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{
        id: "value",
        name: "value",
        kind: "property",
        type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Missing" },
      }],
    }],
  }, {
    name: "same-module value is not a type reference target",
    exports: [{ id: "NotAType", name: "NotAType", kind: "value", type: { kind: "number" } }, {
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{ id: "value", name: "value", kind: "property", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "NotAType" } }],
    }],
  }, {
    name: "same-module function is not a type reference target",
    exports: [{
      id: "NotAType",
      name: "NotAType",
      kind: "function",
      signatures: [{ id: "NotAType", parameters: [], returnType: { kind: "void" } }],
    }, {
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{ id: "value", name: "value", kind: "property", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "NotAType" } }],
    }],
  }, {
    name: "same-module namespace is not a type reference target",
    exports: [{ id: "NotAType", name: "NotAType", kind: "namespace", members: [] }, {
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{ id: "value", name: "value", kind: "property", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "NotAType" } }],
    }],
  }, {
    name: "same-module opaque export is not a type reference target",
    exports: [{ id: "NotAType", name: "NotAType", kind: "opaque" }, {
      id: "Box",
      name: "Box",
      kind: "interface",
      members: [{ id: "value", name: "value", kind: "property", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "NotAType" } }],
    }],
  }, {
    name: "same-module concrete family arity mismatch",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
      {
        id: "Box",
        name: "Box",
        kind: "interface",
        members: [{
          id: "value",
          name: "value",
          kind: "property",
          type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Task_1" },
        }],
      },
    ],
  }, {
    name: "class extends non-value type alias",
    exports: [{
      id: "Alias",
      name: "Alias",
      kind: "type",
      type: { kind: "object" },
    }, {
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{
        kind: "extends",
        type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Alias" },
      }],
    }],
  }, {
    name: "class extends ordinary class with wrong generic arity",
    exports: [{
      id: "Base",
      name: "Base",
      kind: "class",
      typeParameters: [{ name: "T" }],
      members: [],
    }, {
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{
        kind: "extends",
        type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Base" },
      }],
    }],
  }, {
    name: "class extends non-class family variant",
    exports: [{
      ...typeFamilyVariant("Base", 0),
      kind: "interface",
      members: [],
    }, {
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{
        kind: "extends",
        type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Base" },
      }],
    }],
  }];

  for (const model of invalidModels) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, model.exports, model.imports));
    const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected", model.name);
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration, model.name);
  }
});

test("provider declaration models reject invalid parameter passing modes", () => {
  const specifier = "@target/runtime.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier, {
    members: [{
      id: "write",
      name: "write",
      kind: "method",
      signatures: [{
        id: "write",
        parameters: [{
          name: "value",
          type: { kind: "number" },
          passingMode: "sideways" as never,
        }],
      }],
    }],
  }));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
});

test("provider declaration models reject namespace members that cannot render as exports", () => {
  assertInvalidMatrixNamespaceMembers([{
    id: "create",
    name: "constructor",
    kind: "constructor",
    signatures: [{
      id: "create()",
      parameters: [],
    }],
  }]);
  assertInvalidMatrixNamespaceMembers([{
    id: "not-valid",
    name: { kind: "string-literal", text: "not-valid" },
    kind: "field",
    type: { kind: "number" },
  }]);
});

test("provider interface heritage keeps type-family references in type position", () => {
  const specifier = "@target/type-family-interface.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, [{
    id: "Shape",
    name: "Shape",
    kind: "interface",
    sourceTypeFamily: { exportName: "Shape", typeArgumentCount: 0 },
    members: [],
  }, {
    id: "Shape_1",
    name: "Shape_1",
    kind: "interface",
    sourceTypeFamily: { exportName: "Shape", typeArgumentCount: 1 },
    typeParameters: [{ name: "T" }],
    members: [],
  }, {
    id: "StringShape",
    name: "StringShape",
    kind: "interface",
    heritage: [{
      kind: "extends",
      type: {
        kind: "provider-ref",
        moduleSpecifier: specifier,
        exportName: "Shape",
        typeArguments: [{ kind: "string" }],
      },
    }],
    members: [],
  }]));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  if (resolved.kind !== "resolved") {
    return;
  }
  const source = getCanonicalExportOwnerSource(host, "StringShape");
  const exactShapeImport = source.match(/import type \{ __TstsProvider_Shape_1 as ([A-Za-z0-9_$]+) \} from "[^\"]+\.tsts-export-owner-[^\"]+\.d\.ts";/);
  assert.ok(exactShapeImport !== null);
  assert.match(source, new RegExp(`export interface StringShape extends ${exactShapeImport[1]}<string>`));
  assert.equal(source.includes("StringShape extends Shape<string>"), false);
});

test("external provider value heritage fails closed for invalid family variants and class arity", () => {
  const familySpecifier = "@target/external-family.js";
  const derivedSpecifier = "@target/external-derived.js";
  const cases: readonly {
    readonly name: string;
    readonly familyExports: ProviderDeclarationModel["exports"];
    readonly typeArguments?: readonly ProviderTypeExpression[];
    readonly diagnostic: RegExp;
  }[] = [{
    name: "unavailable arity",
    familyExports: [typeFamilyVariant("Task", 0), typeFamilyVariant("Task_1", 1)],
    typeArguments: [{ kind: "unknown" }, { kind: "unknown" }],
    diagnostic: /unavailable type-family arity 2/,
  }, {
    name: "non-class variant",
    familyExports: [{ ...typeFamilyVariant("Task", 0), kind: "interface", members: [] }],
    diagnostic: /requires a class declaration/,
  }, {
    name: "ordinary class wrong arity",
    familyExports: [{
      id: "Task",
      name: "Task",
      kind: "class",
      typeParameters: [{ name: "T" }],
      members: [],
    }],
    diagnostic: /accepts 1 source type argument/,
  }];

  for (const entry of cases) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(new Map([
      [familySpecifier, {
        moduleSpecifier: familySpecifier,
        providerModuleId: "matrix.external-family",
        exports: entry.familyExports,
      }],
      [derivedSpecifier, {
        moduleSpecifier: derivedSpecifier,
        providerModuleId: "matrix.external-derived",
        imports: [{
          moduleSpecifier: familySpecifier,
          namedImports: [{ exportedName: "Task", localName: "ImportedTask" }],
        }],
        exports: [{
          id: "Derived",
          name: "Derived",
          kind: "class",
          heritage: [{
            kind: "extends",
            type: {
              kind: "provider-ref",
              moduleSpecifier: familySpecifier,
              exportName: "Task",
              localName: "ImportedTask",
              ...(entry.typeArguments === undefined ? {} : { typeArguments: entry.typeArguments }),
            },
          }],
          members: [],
        }],
      }],
    ])));

    const resolved = host.providers.resolveVirtualModule(derivedSpecifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected", entry.name);
    assert.match(host.diagnostics.all().at(-1)?.message ?? "", entry.diagnostic, entry.name);
  }
});

test("external ordinary class heritage accepts omitted defaulted type arguments", () => {
  const baseSpecifier = "@target/defaulted-base.js";
  const derivedSpecifier = "@target/defaulted-derived.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(new Map([
    [baseSpecifier, {
      moduleSpecifier: baseSpecifier,
      providerModuleId: "matrix.defaulted-base",
      exports: [{
        id: "Base",
        name: "Base",
        kind: "class",
        typeParameters: [{ name: "T", defaultType: { kind: "unknown" } }],
        members: [],
      }],
    }],
    [derivedSpecifier, {
      moduleSpecifier: derivedSpecifier,
      providerModuleId: "matrix.defaulted-derived",
      imports: [{
        moduleSpecifier: baseSpecifier,
        namedImports: [{ exportedName: "Base", localName: "ImportedBase", kind: "value" }],
      }],
      exports: [{
        id: "Derived",
        name: "Derived",
        kind: "class",
        heritage: [{
          kind: "extends",
          type: {
            kind: "provider-ref",
            moduleSpecifier: baseSpecifier,
            exportName: "Base",
            localName: "ImportedBase",
          },
        }],
        members: [],
      }],
    }],
  ])));

  const resolved = host.providers.resolveVirtualModule(derivedSpecifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  assert.equal(host.diagnostics.hasErrors(), false);
  if (resolved.kind === "resolved") {
    const source = getCanonicalExportOwnerSource(host, "Derived");
    const exactBaseImport = source.match(/import \{ Base as ([A-Za-z0-9_$]+) \} from "[^\"]+\.tsts-export-owner-[^\"]+\.d\.ts";/);
    assert.ok(exactBaseImport !== null);
    assert.match(source, new RegExp(`class Derived extends ${exactBaseImport[1]}`));
    assert.equal(resolved.module.artifact.sourceText.includes("ImportedBase"), false);
  }
});

test("acyclic provider heritage survives recursive exact declaration closure in either resolution order", () => {
  const coreSpecifier = "@acme/native/core.js";
  const reflectionSpecifier = "@acme/native/reflection.js";
  const leafSpecifier = "@acme/native/leaf.js";
  const snapshots: string[][] = [];

  for (const order of [
    [coreSpecifier, reflectionSpecifier, leafSpecifier],
    [reflectionSpecifier, coreSpecifier, leafSpecifier],
    [leafSpecifier, coreSpecifier, reflectionSpecifier],
    [leafSpecifier, reflectionSpecifier, coreSpecifier],
  ] as const) {
    const requests: Array<{ readonly moduleSpecifier: string; readonly context: ProviderModuleContext }> = [];
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(recursiveDeclarationClosureBindingProvider(requests));

    for (const moduleSpecifier of order) {
      const requestedExport = moduleSpecifier === coreSpecifier
        ? "Base"
        : moduleSpecifier === reflectionSpecifier
          ? "Member"
          : "Leaf";
      const resolved = host.providers.resolveVirtualModule(moduleSpecifier, {
        activeTarget: "demo",
        containingFile: `/src/${requestedExport}.ts`,
        importSlice: {
          moduleSpecifier,
          kind: "named",
          requestedExports: [{ exportedName: requestedExport, kind: "value" }],
          typeOnly: false,
        },
      });
      assert.equal(resolved.kind, "resolved");
    }

    assert.equal(host.diagnostics.hasErrors(), false);
    assert.ok(requests.some((request) =>
      request.moduleSpecifier === coreSpecifier
      && request.context.importSlice?.kind === "synthetic"
      && request.context.importSlice.requestedExports?.[0]?.exportedName === "Base"));
    assert.ok(requests.some((request) =>
      request.moduleSpecifier === reflectionSpecifier
      && request.context.importSlice?.kind === "synthetic"
      && request.context.importSlice.requestedExports?.[0]?.exportedName === "Member"));
    assert.ok(requests.every((request) =>
      request.moduleSpecifier === coreSpecifier
      || request.moduleSpecifier === reflectionSpecifier
      || request.moduleSpecifier === leafSpecifier));
    assert.ok(requests
      .filter((request) => request.context.importSlice?.kind === "synthetic")
      .every((request) => request.context.importSlice?.requestedExports?.length === 1
        && request.context.importSlice.requestedExports[0]?.kind === "value"
        && request.context.importSlice.typeOnly === false
        && request.context.importSlice.broadImport !== true));

    const documents = host.providers.getVirtualDeclarationDocuments();
    assert.equal(documents.length, 3);
    assert.equal(getCanonicalExportOwnerDocuments(host).length, 5);
    const coreDocument = documents.find((document) => document.moduleSpecifier === coreSpecifier);
    const reflectionDocument = documents.find((document) => document.moduleSpecifier === reflectionSpecifier);
    assert.ok(coreDocument !== undefined);
    assert.ok(reflectionDocument !== undefined);
    assert.match(coreDocument.sourceText, /export \{ __TstsProviderCanonical_Base as Base \};/);
    assert.match(reflectionDocument.sourceText, /export \{ __TstsProviderCanonical_Member as Member \};/);
    const baseOwner = getCanonicalExportOwnerSource(host, "Base");
    const memberOwner = getCanonicalExportOwnerSource(host, "Member");
    const derivedOwner = getCanonicalExportOwnerSource(host, "DerivedMember");
    const leafOwner = getCanonicalExportOwnerSource(host, "Leaf");
    assert.match(baseOwner, /import \{ __TstsProvider_Member_0 as __TstsProviderExact_Member_0_/);
    assert.match(baseOwner, /class __TstsProvider_Base_0 extends __TstsProviderExact_Member_0_/);
    assert.match(memberOwner, /import \{ __TstsProvider_Root_0 as __TstsProviderExact_Root_0_/);
    assert.match(memberOwner, /class __TstsProvider_Member_0 extends __TstsProviderExact_Root_0_/);
    assert.match(derivedOwner, /import \{ __TstsProvider_Base_0 as __TstsProviderExact_Base_0_/);
    assert.match(derivedOwner, /class __TstsProvider_DerivedMember_0 extends __TstsProviderExact_Base_0_/);
    assert.match(leafOwner, /class Leaf extends __TstsProviderExact_DerivedMember_0_/);

    snapshots.push(documents
      .map((document) => `${document.fileName}\n${document.sourceText}`)
      .sort());
  }

  for (const snapshot of snapshots.slice(1)) {
    assert.deepEqual(snapshot, snapshots[0]);
  }
});

test("canonical family export owners reject contract drift before a public family slice exists", () => {
  const familySpecifier = "@target/companion-contract-family.js";
  const firstSpecifier = "@target/companion-contract-first.js";
  const secondSpecifier = "@target/companion-contract-second.js";
  let familyValueType: ProviderTypeExpression = { kind: "number" };
  const derivedModel = (moduleSpecifier: string, exportName: string): ProviderDeclarationModel => ({
    moduleSpecifier,
    providerModuleId: `matrix.${exportName}`,
    imports: [{
      moduleSpecifier: familySpecifier,
      namedImports: [{ exportedName: "Base", localName: "ImportedBase", kind: "value" }],
    }],
    exports: [{
      id: exportName,
      name: exportName,
      kind: "class",
      heritage: [{
        kind: "extends",
        type: {
          kind: "provider-ref",
          moduleSpecifier: familySpecifier,
          exportName: "Base",
          localName: "ImportedBase",
        },
      }],
      members: [],
    }],
  });
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("companion-contract-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) =>
      moduleSpecifier === familySpecifier || moduleSpecifier === firstSpecifier || moduleSpecifier === secondSpecifier
        ? { kind: "owned" }
        : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: `tsts-provider://matrix/${encodeURIComponent(moduleSpecifier)}`,
      providerModuleId: moduleSpecifier === familySpecifier
        ? "matrix.family"
        : moduleSpecifier === firstSpecifier
          ? "matrix.First"
          : "matrix.Second",
    }),
    getDeclarationModel: (resolution) => resolution.moduleSpecifier === familySpecifier
      ? {
        moduleSpecifier: familySpecifier,
        providerModuleId: "matrix.family",
        exports: [{
          id: "Base",
          name: "Base",
          kind: "class",
          sourceTypeFamily: { exportName: "Base", typeArgumentCount: 0 },
          members: [{
            id: "Base.Value",
            name: "Value",
            kind: "property",
            readonly: true,
            type: familyValueType,
          }],
        }],
      }
      : resolution.moduleSpecifier === firstSpecifier
        ? derivedModel(firstSpecifier, "First")
        : derivedModel(secondSpecifier, "Second"),
  });

  const first = host.providers.resolveVirtualModule(firstSpecifier, { activeTarget: "demo" });
  assert.equal(first.kind, "resolved");
  const documentsBeforeConflict = host.providers.getVirtualDeclarationDocuments();
  assert.equal(documentsBeforeConflict.length, 1);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 2);
  assert.equal(documentsBeforeConflict.some((document) => document.moduleSpecifier === familySpecifier
    && !document.fileName.includes(providerCanonicalExportOwnerMarker)), false);

  familyValueType = { kind: "string" };
  const second = host.providers.resolveVirtualModule(secondSpecifier, { activeTarget: "demo" });
  assert.equal(second.kind, "rejected");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /conflicting declarations for public export|conflicts with its canonical export owner/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), documentsBeforeConflict);

  familyValueType = { kind: "number" };
  const retry = host.providers.resolveVirtualModule(secondSpecifier, { activeTarget: "demo" });
  assert.equal(retry, second);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), documentsBeforeConflict);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 2);
});

test("canonical export dependencies receive host-owned containing files instead of raw provider names", () => {
  const rootSpecifier = "@target/context-root.js";
  const baseSpecifier = "@target/context-base.js";
  const rawRootFileNames = ["tsts-provider://context/root-a", "tsts-provider://context/root-b"] as const;
  const dependencyContainingFiles: string[] = [];
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("canonical-containing-file-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === rootSpecifier || moduleSpecifier === baseSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      if (moduleSpecifier === baseSpecifier) {
        dependencyContainingFiles.push(context.containingFile ?? "");
      }
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: moduleSpecifier === baseSpecifier
          ? "tsts-provider://context/base"
          : context.containingFile === "/src/b.ts"
            ? rawRootFileNames[1]
            : rawRootFileNames[0],
        providerModuleId: moduleSpecifier === baseSpecifier ? "context.base" : "context.root",
      };
    },
    getDeclarationModel: (resolution) => resolution.moduleSpecifier === baseSpecifier
      ? {
        moduleSpecifier: baseSpecifier,
        providerModuleId: "context.base",
        exports: [{ id: "Base", name: "Base", kind: "class", members: [] }],
      }
      : {
        moduleSpecifier: rootSpecifier,
        providerModuleId: "context.root",
        imports: [{ moduleSpecifier: baseSpecifier, namedImports: [{ exportedName: "Base" }] }],
        exports: [{
          id: "Derived",
          name: "Derived",
          kind: "class",
          heritage: [{
            kind: "extends",
            type: { kind: "provider-ref", moduleSpecifier: baseSpecifier, exportName: "Base" },
          }],
          members: [],
        }],
      },
  });

  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", containingFile: "/src/a.ts" }).kind, "resolved");
  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", containingFile: "/src/b.ts" }).kind, "resolved");
  assert.equal(dependencyContainingFiles.length, 1);
  const dependencyContainingFile = dependencyContainingFiles[0]!;
  assert.equal(rawRootFileNames.includes(dependencyContainingFile as typeof rawRootFileNames[number]), false);
  assert.equal(dependencyContainingFile.startsWith(providerVirtualInternalRoot), true);
  assert.equal(dependencyContainingFile.includes(providerCanonicalModuleDependencyContextMarker), true);
  assert.equal(getProviderVirtualArtifactForCompiler(host.providers, dependencyContainingFile), undefined);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 2);
});

test("canonical export owners revalidate transitive dependencies transactionally", () => {
  const rootSpecifier = "@target/transitive-root.js";
  const middleSpecifier = "@target/transitive-middle.js";
  const leafSpecifier = "@target/transitive-leaf.js";
  let conflictingLeaf = false;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("transitive-owner-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => [rootSpecifier, middleSpecifier, leafSpecifier].includes(moduleSpecifier)
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: moduleSpecifier === rootSpecifier
        ? context.activeSurface === "second" ? "tsts-provider://transitive/root-b" : "tsts-provider://transitive/root-a"
        : moduleSpecifier === middleSpecifier
          ? context.activeSurface === "second" ? "tsts-provider://transitive/middle-b" : "tsts-provider://transitive/middle-a"
          : "tsts-provider://transitive/leaf",
      providerModuleId: moduleSpecifier === rootSpecifier ? "transitive.root" : moduleSpecifier === middleSpecifier ? "transitive.middle" : "transitive.leaf",
    }),
    getDeclarationModel: (resolution) => {
      if (resolution.moduleSpecifier === leafSpecifier) {
        return {
          moduleSpecifier: leafSpecifier,
          providerModuleId: "transitive.leaf",
          exports: [{
            id: "Leaf",
            name: "Leaf",
            kind: "class",
            members: [{ id: "Leaf.Value", name: "Value", kind: "property", type: { kind: conflictingLeaf ? "string" : "number" } }],
          }],
        };
      }
      const dependencySpecifier = resolution.moduleSpecifier === rootSpecifier ? middleSpecifier : leafSpecifier;
      const exportName = resolution.moduleSpecifier === rootSpecifier ? "Root" : "Middle";
      const dependencyExportName = resolution.moduleSpecifier === rootSpecifier ? "Middle" : "Leaf";
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.moduleSpecifier === rootSpecifier ? "transitive.root" : "transitive.middle",
        imports: [{ moduleSpecifier: dependencySpecifier, namedImports: [{ exportedName: dependencyExportName }] }],
        exports: [{
          id: exportName,
          name: exportName,
          kind: "class",
          heritage: [{
            kind: "extends",
            type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: dependencyExportName },
          }],
          members: [],
        }],
      };
    },
  });

  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", activeSurface: "first" }).kind, "resolved");
  const beforeConflict = host.providers.getVirtualDeclarationDocuments();
  conflictingLeaf = true;
  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", activeSurface: "second" }).kind, "rejected");
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), beforeConflict);
  conflictingLeaf = false;
  const retry = host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", activeSurface: "second" });
  assert.equal(retry.kind, "rejected");
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), beforeConflict);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 3);
});

test("canonical export owner source ignores provider import aliases and declaration order", () => {
  const rootSpecifier = "@target/canonical-alias-root.js";
  const dependencySpecifier = "@target/canonical-alias-dependency.js";
  const observedContainingFiles: string[] = [];
  let alternate = false;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("canonical-alias-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === rootSpecifier || moduleSpecifier === dependencySpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      observedContainingFiles.push(context.containingFile ?? "");
      alternate = moduleSpecifier === rootSpecifier && context.containingFile === "/src/second.ts";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: moduleSpecifier === rootSpecifier ? "tsts-provider://canonical-alias/root" : "tsts-provider://canonical-alias/dependency",
        providerModuleId: moduleSpecifier === rootSpecifier ? "canonical.alias.root" : "canonical.alias.dependency",
      };
    },
    getDeclarationModel: (resolution) => {
      if (resolution.moduleSpecifier === dependencySpecifier) {
        return {
          moduleSpecifier: dependencySpecifier,
          providerModuleId: "canonical.alias.dependency",
          exports: [{ id: "Token", name: "Token", kind: "interface", members: [] }],
        };
      }
      const alias = alternate ? "SecondTokenAlias" : "FirstTokenAlias";
      const holder: ProviderExportDeclaration = {
        id: "Holder",
        name: "Holder",
        kind: "interface",
        members: [{
          id: "Holder.token",
          name: "token",
          kind: "property",
          type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: "Token", localName: alias },
        }],
      };
      const marker: ProviderExportDeclaration = { id: "Marker", name: "Marker", kind: "interface", members: [] };
      return {
        moduleSpecifier: rootSpecifier,
        providerModuleId: "canonical.alias.root",
        imports: [{ moduleSpecifier: dependencySpecifier, typeOnly: true, namedImports: [{ exportedName: "Token", localName: alias }] }],
        exports: alternate ? [marker, holder] : [holder, marker],
      };
    },
  });

  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", containingFile: "/src/first.ts" }).kind, "resolved");
  const firstOwner = getCanonicalExportOwnerDocuments(host).find((document) => document.declarationModel.exports[0]?.id === "Holder");
  assert.ok(firstOwner !== undefined);
  const firstSnapshot = `${firstOwner.fileName}\n${firstOwner.sourceText}`;
  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo", containingFile: "/src/second.ts" }).kind, "resolved");
  const secondOwner = getCanonicalExportOwnerDocuments(host).find((document) => document.declarationModel.exports[0]?.id === "Holder");
  assert.ok(secondOwner !== undefined);
  assert.equal(`${secondOwner.fileName}\n${secondOwner.sourceText}`, firstSnapshot);
  assert.equal(secondOwner.sourceText.includes("FirstTokenAlias"), false);
  assert.equal(secondOwner.sourceText.includes("SecondTokenAlias"), false);
  assert.equal(observedContainingFiles.some((fileName) => fileName.includes(providerCanonicalModuleDependencyContextMarker)), true);
  const publicDocument = host.providers.getVirtualDeclarationDocuments().find((document) => document.moduleSpecifier === rootSpecifier);
  assert.ok(publicDocument !== undefined);
  assert.equal(publicDocument.sourceText.includes(dependencySpecifier), false);
});

test("provider references require a provider-owned canonical target", () => {
  const rootSpecifier = "@target/relative-root.js";
  const createHost = (dependencySpecifier: string, ownsDependency: boolean) => {
    const observedDependencyContainingFiles: string[] = [];
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`relative-reference-${ownsDependency ? "owned" : "unowned"}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === rootSpecifier || (ownsDependency && moduleSpecifier === dependencySpecifier)
        ? { kind: "owned" }
        : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        if (moduleSpecifier === dependencySpecifier) {
          observedDependencyContainingFiles.push(context.containingFile ?? "");
        }
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: moduleSpecifier === rootSpecifier
            ? "tsts-provider://relative/root.d.ts"
            : "tsts-provider://relative/relative-support.d.ts",
          providerModuleId: moduleSpecifier === rootSpecifier ? "relative.root" : "relative.support",
        };
      },
      getDeclarationModel: (resolution) => resolution.moduleSpecifier === dependencySpecifier
        ? {
            moduleSpecifier: dependencySpecifier,
            providerModuleId: "relative.support",
            exports: [{ id: "Support", name: "Support", kind: "interface", members: [] }],
          }
        : {
            moduleSpecifier: rootSpecifier,
            providerModuleId: "relative.root",
            imports: [{ moduleSpecifier: dependencySpecifier, typeOnly: true, namedImports: [{ exportedName: "Support" }] }],
            exports: [{
              id: "Holder",
              name: "Holder",
              kind: "interface",
              members: [{
                id: "Holder.support",
                name: "support",
                kind: "property",
                type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: "Support" },
              }],
            }],
          },
    });
    return { host, observedDependencyContainingFiles };
  };

  const dependencySpecifier = "./relative-support.js";
  const owned = createHost(dependencySpecifier, true);
  assert.equal(owned.host.providers.resolveVirtualModule(rootSpecifier, {
    activeTarget: "demo",
    containingFile: "/src/index.ts",
  }).kind, "resolved");
  assert.equal(owned.observedDependencyContainingFiles.length, 1);
  assert.equal(owned.observedDependencyContainingFiles[0]?.startsWith(providerVirtualInternalRoot), true);
  assert.equal(owned.observedDependencyContainingFiles[0]?.includes(providerCanonicalModuleDependencyContextMarker), true);
  const holderOwner = getCanonicalExportOwnerDocuments(owned.host)
    .find((document) => document.declarationModel.exports[0]?.id === "Holder");
  assert.ok(holderOwner !== undefined);
  assert.match(holderOwner.sourceText, /import type \{ Support as [A-Za-z0-9_$]+ \} from "[^"]+\.tsts-export-owner-[^"]+\.d\.ts";/);
  assert.equal(holderOwner.sourceText.includes(`from ${JSON.stringify(dependencySpecifier)}`), false);

  for (const unownedSpecifier of [dependencySpecifier, "unowned-package"]) {
    const unowned = createHost(unownedSpecifier, false);
    const rejected = unowned.host.providers.resolveVirtualModule(rootSpecifier, {
      activeTarget: "demo",
      containingFile: "/src/index.ts",
    });
    assert.equal(rejected.kind, "rejected");
    assert.equal(unowned.host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
    assert.match(unowned.host.diagnostics.all().at(-1)?.message ?? "", new RegExp(`references '${unownedSpecifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}#Support' without a provider-owned canonical target`));
    assert.equal(unowned.host.providers.getVirtualDeclarationDocuments().length, 0);
  }
});

test("external provider references accept only type-capable declaration targets", () => {
  const targetSpecifier = "@target/external-type-target.js";
  const consumerSpecifier = "@target/external-type-consumer.js";
  const cases: readonly {
    readonly name: string;
    readonly accepted: boolean;
    readonly target: ProviderExportDeclaration;
  }[] = [{
    name: "class",
    accepted: true,
    target: { id: "Target", name: "Target", kind: "class", members: [] },
  }, {
    name: "interface",
    accepted: true,
    target: { id: "Target", name: "Target", kind: "interface", members: [] },
  }, {
    name: "type alias",
    accepted: true,
    target: { id: "Target", name: "Target", kind: "type", type: { kind: "source-primitive", name: "int32" } },
  }, {
    name: "enum",
    accepted: true,
    target: { id: "Target", name: "Target", kind: "enum", members: [] },
  }, {
    name: "value",
    accepted: false,
    target: { id: "Target", name: "Target", kind: "value", type: { kind: "source-primitive", name: "int32" } },
  }, {
    name: "function",
    accepted: false,
    target: {
      id: "Target",
      name: "Target",
      kind: "function",
      signatures: [{ id: "Target()", parameters: [], returnType: { kind: "source-primitive", name: "int32" } }],
    },
  }, {
    name: "namespace",
    accepted: false,
    target: { id: "Target", name: "Target", kind: "namespace", members: [] },
  }, {
    name: "opaque",
    accepted: false,
    target: { id: "Target", name: "Target", kind: "opaque" },
  }];

  for (const entry of cases) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(new Map([
      [targetSpecifier, {
        moduleSpecifier: targetSpecifier,
        providerModuleId: "matrix.external-type-target",
        exports: [entry.target],
      }],
      [consumerSpecifier, {
        moduleSpecifier: consumerSpecifier,
        providerModuleId: "matrix.external-type-consumer",
        imports: [{
          moduleSpecifier: targetSpecifier,
          typeOnly: true,
          namedImports: [{ exportedName: "Target", kind: "type" }],
        }],
        exports: [{
          id: "Holder",
          name: "Holder",
          kind: "interface",
          members: [{
            id: "Holder.target",
            name: "target",
            kind: "property",
            type: { kind: "provider-ref", moduleSpecifier: targetSpecifier, exportName: "Target" },
          }],
        }],
      }],
    ])));

    const resolved = host.providers.resolveVirtualModule(consumerSpecifier, { activeTarget: "demo" });
    assert.equal(
      resolved.kind,
      entry.accepted ? "resolved" : "rejected",
      `${entry.name}: ${host.diagnostics.all().at(-1)?.message ?? "no diagnostic"}`,
    );
    if (entry.accepted) {
      assert.equal(host.diagnostics.hasErrors(), false, entry.name);
      assert.equal(getCanonicalExportOwnerDocuments(host).length, 2, entry.name);
      assert.match(
        getCanonicalExportOwnerSource(host, "Holder"),
        /import type \{ Target as [A-Za-z0-9_$]+ \} from "[^"]+\.tsts-export-owner-[^"]+\.d\.ts";/,
        entry.name,
      );
    } else {
      assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration, entry.name);
      assert.match(host.diagnostics.all().at(-1)?.message ?? "", /requires a type-capable declaration/, entry.name);
      assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
    }
  }
});

test("stable recursive provider owner graphs close as SCCs without hiding closure exports", () => {
  const leftSpecifier = "@target/stable-owner-left.js";
  const rightSpecifier = "@target/stable-owner-right.js";
  let closureType: ProviderTypeExpression = { kind: "number" };
  let resolveCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("stable-owner-scc-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === leftSpecifier || moduleSpecifier === rightSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      resolveCount += 1;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: moduleSpecifier === leftSpecifier
          ? "tsts-provider://stable-owner/left"
          : "tsts-provider://stable-owner/right",
        providerModuleId: moduleSpecifier === leftSpecifier ? "stable.owner.left" : "stable.owner.right",
      };
    },
    getDeclarationModel: (resolution) => {
      const left = resolution.moduleSpecifier === leftSpecifier;
      const dependencySpecifier = left ? rightSpecifier : leftSpecifier;
      const dependencyName = left ? "Right" : "Left";
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        imports: [{ moduleSpecifier: dependencySpecifier, typeOnly: true, namedImports: [{ exportedName: dependencyName }] }],
        exports: [{
          id: left ? "Left" : "Right",
          name: left ? "Left" : "Right",
          kind: "interface",
          members: [{
            id: `${left ? "Left" : "Right"}.peer`,
            name: "peer",
            kind: "property",
            type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: dependencyName },
          }],
        }, ...(left
          ? [{ id: "Closure", name: "Closure", kind: "type" as const, type: closureType }]
          : [])],
      };
    },
  });

  const first = host.providers.resolveVirtualModule(leftSpecifier, { activeTarget: "demo", containingFile: "/src/index.ts" });
  assert.equal(first.kind, "resolved");
  assert.equal(resolveCount, 3);
  assert.equal(getCanonicalExportOwnerDocuments(host).filter((document) =>
    document.declarationModel.exports.some((declaration) => declaration.id === "Left" || declaration.id === "Right")).length, 2);
  assert.equal(host.diagnostics.hasErrors(), false);

  closureType = { kind: "string" };
  const closureRequest = host.providers.resolveVirtualModule(leftSpecifier, {
    activeTarget: "demo",
    containingFile: "/src/closure.ts",
    importSlice: {
      moduleSpecifier: leftSpecifier,
      kind: "named",
      requestedExports: [{ exportedName: "Closure", kind: "type" }],
      typeOnly: true,
    },
  });
  assert.equal(closureRequest.kind, "rejected");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /conflicting declarations|canonical export owner|did not close every public export/);
});

test("raw virtual file expansion does not create semantic provider environment drift", () => {
  const leftSpecifier = "@target/expanding-owner-left.js";
  const rightSpecifier = "@target/expanding-owner-right.js";
  let resolveCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("expanding-owner-scc-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === leftSpecifier || moduleSpecifier === rightSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      resolveCount += 1;
      const side = moduleSpecifier === leftSpecifier ? "left" : "right";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://expanding-owner/${side}/${encodeURIComponent(context.containingFile ?? "root")}`,
        providerModuleId: `expanding.owner.${side}`,
      };
    },
    getDeclarationModel: (resolution) => {
      const left = resolution.moduleSpecifier === leftSpecifier;
      const dependencySpecifier = left ? rightSpecifier : leftSpecifier;
      const ownName = left ? "Left" : "Right";
      const dependencyName = left ? "Right" : "Left";
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        imports: [{ moduleSpecifier: dependencySpecifier, typeOnly: true, namedImports: [{ exportedName: dependencyName }] }],
        exports: [{
          id: ownName,
          name: ownName,
          kind: "interface",
          members: [{
            id: `${ownName}.peer`,
            name: "peer",
            kind: "property",
            type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: dependencyName },
          }],
        }],
      };
    },
  });

  const resolved = host.providers.resolveVirtualModule(leftSpecifier, { activeTarget: "demo", containingFile: "/src/index.ts" });
  assert.equal(resolved.kind, "resolved");
  assert.equal(resolveCount, 3);
  assert.equal(host.diagnostics.hasErrors(), false);
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 2);
});

test("mixed ordinary and type-family provider heritage cycles fail closed", () => {
  const ordinarySpecifier = "@target/mixed-cycle-ordinary.js";
  const familySpecifier = "@target/mixed-cycle-family.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(new Map([
    [ordinarySpecifier, {
      moduleSpecifier: ordinarySpecifier,
      providerModuleId: "mixed.cycle.ordinary",
      imports: [{ moduleSpecifier: familySpecifier, namedImports: [{ exportedName: "Family" }] }],
      exports: [{
        id: "Ordinary",
        name: "Ordinary",
        kind: "class",
        heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: familySpecifier, exportName: "Family" } }],
        members: [],
      }],
    }],
    [familySpecifier, {
      moduleSpecifier: familySpecifier,
      providerModuleId: "mixed.cycle.family",
      imports: [{ moduleSpecifier: ordinarySpecifier, namedImports: [{ exportedName: "Ordinary" }] }],
      exports: [{
        id: "Family",
        name: "Family",
        kind: "class",
        sourceTypeFamily: { exportName: "Family", typeArgumentCount: 0 },
        heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: ordinarySpecifier, exportName: "Ordinary" } }],
        members: [],
      }],
    }],
  ])));

  assert.equal(host.providers.resolveVirtualModule(ordinarySpecifier, { activeTarget: "demo" }).kind, "rejected");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /semantic class cycle/);
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 0);
});

test("ordinary provider class heritage cycles reject semantically rather than as resolution recursion", () => {
  const selfSpecifier = "@target/ordinary-self-cycle.js";
  const leftSpecifier = "@target/ordinary-left-cycle.js";
  const rightSpecifier = "@target/ordinary-right-cycle.js";
  const cases: readonly [string, ReadonlyMap<string, ProviderDeclarationModel>][] = [[selfSpecifier, new Map([
    [selfSpecifier, {
      moduleSpecifier: selfSpecifier,
      providerModuleId: "ordinary.self.cycle",
      exports: [{
        id: "Self",
        name: "Self",
        kind: "class",
        heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: selfSpecifier, exportName: "Self" } }],
        members: [],
      }],
    }],
  ])], [leftSpecifier, new Map([
    [leftSpecifier, {
      moduleSpecifier: leftSpecifier,
      providerModuleId: "ordinary.left.cycle",
      imports: [{ moduleSpecifier: rightSpecifier, namedImports: [{ exportedName: "Right" }] }],
      exports: [{
        id: "Left",
        name: "Left",
        kind: "class",
        heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: rightSpecifier, exportName: "Right" } }],
        members: [],
      }],
    }],
    [rightSpecifier, {
      moduleSpecifier: rightSpecifier,
      providerModuleId: "ordinary.right.cycle",
      imports: [{ moduleSpecifier: leftSpecifier, namedImports: [{ exportedName: "Left" }] }],
      exports: [{
        id: "Right",
        name: "Right",
        kind: "class",
        heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: leftSpecifier, exportName: "Left" } }],
        members: [],
      }],
    }],
  ])]];

  for (const [rootSpecifier, models] of cases) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(models));
    assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo" }).kind, "rejected");
    assert.match(host.diagnostics.all().at(-1)?.message ?? "", /semantic class cycle/);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  }
});

test("deep acyclic provider heritage is planned iteratively with bounded requests", () => {
  const depth = 1024;
  let resolveCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("deep-heritage-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier.startsWith("@target/deep/") ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => {
      resolveCount += 1;
      const index = Number(moduleSpecifier.slice("@target/deep/".length, -3));
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://deep/${index}`,
        providerModuleId: `deep.${index}`,
      };
    },
    getDeclarationModel: (resolution) => {
      const index = Number(resolution.moduleSpecifier.slice("@target/deep/".length, -3));
      const nextSpecifier = `@target/deep/${index + 1}.js`;
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        ...(index + 1 < depth ? {
          imports: [{ moduleSpecifier: nextSpecifier, namedImports: [{ exportedName: `Node${index + 1}` }] }],
        } : {}),
        exports: [{
          id: `Node${index}`,
          name: `Node${index}`,
          kind: "class",
          ...(index + 1 < depth ? {
            heritage: [{
              kind: "extends" as const,
              type: { kind: "provider-ref" as const, moduleSpecifier: nextSpecifier, exportName: `Node${index + 1}` },
            }],
          } : {}),
          members: [],
        }],
      };
    },
  });

  assert.equal(host.providers.resolveVirtualModule("@target/deep/0.js", { activeTarget: "demo" }).kind, "resolved");
  assert.equal(resolveCount, depth);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, depth);
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("recursive external provider-family value heritage fails closed from either starting module", () => {
  const leftSpecifier = "@target/cycle-left.js";
  const rightSpecifier = "@target/cycle-right.js";
  const family = (
    moduleSpecifier: string,
    providerModuleId: string,
    exportName: string,
    dependencySpecifier: string,
    dependencyExportName: string,
  ): ProviderDeclarationModel => ({
    moduleSpecifier,
    providerModuleId,
    imports: [{
      moduleSpecifier: dependencySpecifier,
      namedImports: [{ exportedName: dependencyExportName, localName: `Imported${dependencyExportName}` }],
    }],
    exports: [{
      id: exportName,
      name: exportName,
      kind: "class",
      sourceTypeFamily: { exportName, typeArgumentCount: 0 },
      heritage: [{
        kind: "extends",
        type: {
          kind: "provider-ref",
          moduleSpecifier: dependencySpecifier,
          exportName: dependencyExportName,
          localName: `Imported${dependencyExportName}`,
        },
      }],
      members: [],
    }],
  });
  for (const startingSpecifier of [leftSpecifier, rightSpecifier]) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(multiModuleTypeFamilyBindingProvider(new Map([
      [leftSpecifier, family(leftSpecifier, "matrix.cycle-left", "Left", rightSpecifier, "Right")],
      [rightSpecifier, family(rightSpecifier, "matrix.cycle-right", "Right", leftSpecifier, "Left")],
    ])));

    const resolved = host.providers.resolveVirtualModule(startingSpecifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected");
    assert.match(host.diagnostics.all().at(-1)?.message ?? "", /semantic class cycle.*(Left.*Right.*Left|Right.*Left.*Right)/);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  }
});

test("provider declaration models reject invalid type-family declarations", () => {
  const specifier = "@target/type-family.js";
  const invalidFamilies: readonly {
    readonly name: string;
    readonly expectedMessage?: RegExp;
    readonly imports?: ProviderDeclarationModel["imports"];
    readonly exports: ProviderDeclarationModel["exports"];
  }[] = [{
    name: "duplicate arity",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("TaskDuplicate", 0),
    ],
  }, {
    name: "non-contiguous arity",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_2", 2),
    ],
  }, {
    name: "public export collision",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
      { id: "TaskValue", name: "TaskValue", exportName: "Task", kind: "value", type: { kind: "number" } },
    ],
  }, {
    name: "variant type parameter default",
    exports: [
      typeFamilyVariant("Task", 0),
      {
        ...typeFamilyVariant("Task_1", 1),
        typeParameters: [{ name: "T", defaultType: { kind: "unknown" } }],
      },
    ],
  }, {
    name: "shared family parameter constraint contract mismatch",
    expectedMessage: /returned an invalid declaration model/,
    exports: [{
      ...typeFamilyVariant("Task_1", 1),
      typeParameters: [{ name: "T0", constraints: [{ kind: "source-primitive", name: "int32" }] }],
    }, {
      ...typeFamilyVariant("Task_2", 2),
      typeParameters: [
        { name: "T0", constraints: [{ kind: "source-primitive", name: "uint8" }] },
        { name: "T1" },
      ],
    }],
  }, {
    name: "synthesized family default violates parameter constraint",
    expectedMessage: /returned an invalid declaration model/,
    exports: [
      typeFamilyVariant("Task", 0),
      {
        ...typeFamilyVariant("Task_1", 1),
        typeParameters: [{ name: "T0", constraints: [{ kind: "source-primitive", name: "int32" }] }],
      },
    ],
  }, {
    name: "generated local-name collision",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
      { id: "Hidden", name: "__TstsProvider_Task_1", kind: "interface", members: [] },
    ],
  }, {
    name: "sentinel family export collision",
    exports: [
      {
        ...typeFamilyVariant("Task", 0),
        sourceTypeFamily: {
          exportName: "__TstsProviderTypeFamilyDefault",
          typeArgumentCount: 0,
        },
      },
    ],
  }, {
    name: "sentinel declaration collision",
    exports: [
      typeFamilyVariant("Task", 0),
      { id: "Sentinel", name: "__tstsProviderTypeFamilyDefault", kind: "interface", members: [] },
    ],
  }, {
    name: "is-any helper declaration collision",
    exports: [
      typeFamilyVariant("Task", 0),
      { id: "IsAny", name: "__TstsProviderTypeFamilyIsAny", kind: "interface", members: [] },
    ],
  }, {
    name: "family export import collision",
    imports: [{
      moduleSpecifier: "@target/dependency.js",
      namedImports: [{ exportedName: "ImportedTask", localName: "Task" }],
    }],
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
    ],
  }, {
    name: "sentinel import collision",
    imports: [{
      moduleSpecifier: "@target/dependency.js",
      namedImports: [{ exportedName: "Dependency", localName: "__tstsProviderTypeFamilyDefault" }],
    }],
    exports: [
      typeFamilyVariant("Task", 0),
    ],
  }, {
    name: "is-default helper import collision",
    imports: [{
      moduleSpecifier: "@target/dependency.js",
      namedImports: [{ exportedName: "Dependency", localName: "__TstsProviderTypeFamilyIsDefault" }],
    }],
    exports: [
      typeFamilyVariant("Task", 0),
    ],
  }, {
    name: "generated local-name import collision",
    imports: [{
      moduleSpecifier: "@target/dependency.js",
      namedImports: [{ exportedName: "Dependency", localName: "__TstsProvider_Task_1" }],
    }],
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
    ],
  }, {
    name: "generated canonical local-name declaration collision",
    exports: [
      typeFamilyVariant("Task", 0),
      { id: "Canonical", name: "__TstsProviderCanonical_Task", kind: "interface", members: [] },
    ],
  }, {
    name: "mixed value-capable and type-only variants",
    exports: [
      { ...typeFamilyVariant("Task", 0), kind: "interface" },
      typeFamilyVariant("Task_1", 1),
    ],
  }, {
    name: "public family reference with missing arity",
    exports: [
      typeFamilyVariant("Task", 0),
      typeFamilyVariant("Task_1", 1),
      {
        id: "Consumer",
        name: "Consumer",
        kind: "interface",
        members: [{
          id: "Consumer.value",
          name: "value",
          kind: "property",
          type: {
            kind: "provider-ref",
            moduleSpecifier: specifier,
            exportName: "Task",
            typeArguments: [{ kind: "unknown" }, { kind: "unknown" }],
          },
        }],
      },
    ],
  }, {
    name: "type-only external class heritage",
    imports: [{
      moduleSpecifier: "@target/base.js",
      typeOnly: true,
      namedImports: [{ exportedName: "Base", localName: "ImportedBase" }],
    }],
    exports: [{
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{
        kind: "extends",
        type: {
          kind: "provider-ref",
          moduleSpecifier: "@target/base.js",
          exportName: "Base",
          localName: "ImportedBase",
        },
      }],
      members: [],
    }],
  }, {
    name: "non-reference class heritage",
    exports: [{
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{ kind: "extends", type: { kind: "object" } }],
      members: [],
    }],
  }, {
    name: "class with multiple extends clauses",
    exports: [{ id: "Left", name: "Left", kind: "class", members: [] }, {
      id: "Right",
      name: "Right",
      kind: "class",
      members: [],
    }, {
      id: "Derived",
      name: "Derived",
      kind: "class",
      heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Left" } }, {
        kind: "extends",
        type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Right" },
      }],
      members: [],
    }],
  }, {
    name: "interface implements clause",
    exports: [{ id: "Base", name: "Base", kind: "interface", members: [] }, {
      id: "Derived",
      name: "Derived",
      kind: "interface",
      heritage: [{ kind: "implements", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Base" } }],
      members: [],
    }],
  }, {
    name: "non-class declaration heritage",
    exports: [{ id: "Base", name: "Base", kind: "interface", members: [] }, {
      id: "Alias",
      name: "Alias",
      kind: "type",
      type: { kind: "object" },
      heritage: [{ kind: "extends", type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Base" } }],
    }],
  }];

  for (const entry of invalidFamilies) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, entry.exports, entry.imports));
    const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected", entry.name);
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration, entry.name);
    if (entry.expectedMessage !== undefined) {
      assert.match(host.diagnostics.all()[0]?.message ?? "", entry.expectedMessage, entry.name);
    }
  }
});

test("provider declaration models reject non-finite numeric literal types", () => {
  const specifier = "@target/non-finite-literal.js";
  for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, [{
      id: "Value",
      name: "Value",
      kind: "type",
      type: { kind: "literal", value },
    }]));
    const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected");
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
  }
});

test("provider declaration models reject malformed source-global references", () => {
  const specifier = "@target/source-global-invalid.js";
  const invalidTypes: readonly ProviderTypeExpression[] = [{
    kind: "source-global",
    name: "Clock.Instant",
  }, {
    kind: "source-global",
    name: "",
  }];
  for (const [index, type] of invalidTypes.entries()) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, [{
      id: `Invalid${index}`,
      name: `Invalid${index}`,
      kind: "type",
      type,
    }]));
    assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  }
});

test("source-global references are type-position-only and reject class value heritage", () => {
  const specifier = "@target/source-global-value-heritage.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, [{
    id: "Derived",
    name: "Derived",
    kind: "class",
    heritage: [{ kind: "extends", type: { kind: "source-global", name: "ProfileBase" } }],
    members: [],
  }]));
  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider declaration graph validation rejects recursive schema edges without retaining provider objects", () => {
  const specifier = "@target/recursive-model.js";
  const placements: readonly ((type: ProviderTypeExpression) => ProviderDeclarationModel["exports"])[] = [
    (type) => [{ id: "Alias", name: "Alias", kind: "type", type }],
    (type) => [{ id: "Box", name: "Box", kind: "interface", typeParameters: [{ name: "T", constraints: [type] }], members: [] }],
    (type) => [{ id: "Box", name: "Box", kind: "interface", typeParameters: [{ name: "T", defaultType: type }], members: [] }],
    (type) => [{ id: "Box", name: "Box", kind: "interface", heritage: [{ kind: "extends", type }], members: [] }],
    (type) => [{ id: "Box", name: "Box", kind: "interface", members: [{ id: "value", name: "value", kind: "property", type }] }],
    (type) => [{
      id: "call",
      name: "call",
      kind: "function",
      signatures: [{ id: "call", parameters: [{ name: "value", type }], returnType: { kind: "void" } }],
    }],
    (type) => [{
      id: "call",
      name: "call",
      kind: "function",
      signatures: [{ id: "call", parameters: [], returnType: type }],
    }],
    (type) => [{
      id: "call",
      name: "call",
      kind: "function",
      signatures: [{ id: "call", typeParameters: [{ name: "T", constraints: [type] }], parameters: [], returnType: { kind: "void" } }],
    }],
    (type) => [{ id: "Alias", name: "Alias", kind: "type", type: { kind: "target-named", target: "demo", id: "Demo.Alias", sourceShape: type } }],
    (type) => [{ id: "Alias", name: "Alias", kind: "type", type: { kind: "opaque", id: "Demo.Alias", sourceShape: type } }],
    (type) => [{ id: "Alias", name: "Alias", kind: "type", type: { kind: "source-global", name: "PromiseLikeValue", typeArguments: [type] } }],
    (type) => [{
      id: "Alias",
      name: "Alias",
      kind: "type",
      type: { kind: "provider-ref", moduleSpecifier: specifier, exportName: "Alias", typeArguments: [type] },
    }],
  ];

  for (const [index, place] of placements.entries()) {
    const recursiveType: { kind: "array"; elementType: ProviderTypeExpression } = {
      kind: "array",
      elementType: { kind: "never" },
    };
    recursiveType.elementType = recursiveType;
    let exports = place(recursiveType);
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`recursive-model-provider-${index}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://recursive-model/${index}`,
        providerModuleId: `recursive.model.${index}`,
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports,
      }),
    });

    const rejected = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(rejected.kind, "rejected", `placement ${index}`);
    assert.match(host.diagnostics.all().at(-1)?.message ?? "", /unsafe declaration graph/);
    assert.doesNotThrow(() => JSON.stringify(host.diagnostics.all()));
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);

    exports = [{ id: "Alias", name: "Alias", kind: "type", type: { kind: "number" } }];
    assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }), rejected, `retry ${index}`);
  }
});

test("provider declaration graph validation enforces its exact nesting boundary and accepts shared DAGs", () => {
  const makeNestedArray = (depth: number): ProviderTypeExpression => {
    let type: ProviderTypeExpression = { kind: "number" };
    for (let index = 0; index < depth; index++) {
      type = { kind: "array", elementType: type };
    }
    return type;
  };
  const resolve = (id: string, exports: ProviderDeclarationModel["exports"]) => {
    const specifier = `@target/${id}.js`;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, exports));
    return { host, result: host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }) };
  };

  const accepted = resolve("depth-accepted", [{ id: "Alias", name: "Alias", kind: "type", type: makeNestedArray(253) }]);
  assert.equal(accepted.result.kind, "resolved");
  const rejected = resolve("depth-rejected", [{ id: "Alias", name: "Alias", kind: "type", type: makeNestedArray(254) }]);
  assert.equal(rejected.result.kind, "rejected");
  assert.match(JSON.stringify(rejected.host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"reason":"depth"/);
  assert.match(JSON.stringify(rejected.host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"depth":257/);

  const veryDeep = resolve("depth-adversarial", [{ id: "Alias", name: "Alias", kind: "type", type: makeNestedArray(20_000) }]);
  assert.equal(veryDeep.result.kind, "rejected");
  assert.match(veryDeep.host.diagnostics.all().at(-1)?.message ?? "", /unsafe declaration graph/);

  const shared: ProviderTypeExpression = { kind: "array", elementType: { kind: "string" } };
  const dag = resolve("shared-dag", [{ id: "Left", name: "Left", kind: "type", type: shared }, {
    id: "Right",
    name: "Right",
    kind: "type",
    type: { kind: "tuple", elementTypes: [shared, shared] },
  }]);
  assert.equal(dag.result.kind, "resolved");
  if (dag.result.kind === "resolved") {
    const left = dag.result.module.declarationModel.exports[0]?.type;
    const right = dag.result.module.declarationModel.exports[1]?.type;
    assert.ok(right?.kind === "tuple");
    assert.equal(right.elementTypes[0], left);
    assert.equal(right.elementTypes[1], left);
  }

  const makeDuplicatedChildDag = (depth: number): ProviderTypeExpression => {
    let type: ProviderTypeExpression = { kind: "number" };
    for (let index = 0; index < depth; index++) {
      type = { kind: "union", types: [type, type] };
    }
    return type;
  };
  const moderateDag = resolve("moderate-shared-dag", [{
    id: "Alias",
    name: "Alias",
    kind: "type",
    type: makeDuplicatedChildDag(10),
  }]);
  assert.equal(moderateDag.result.kind, "resolved");

  const expandedDag = resolve("expanded-shared-dag", [{
    id: "Alias",
    name: "Alias",
    kind: "type",
    type: makeDuplicatedChildDag(40),
  }]);
  assert.equal(expandedDag.result.kind, "rejected");
  assert.match(JSON.stringify(expandedDag.host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"reason":"complexity"/);
  assert.match(JSON.stringify(expandedDag.host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"limit":65536/);
  assert.deepEqual(expandedDag.host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider declaration graph safety is traversal-order independent", () => {
  const specifier = "@target/cross-field-depth.js";
  const ladder: ProviderTypeExpression[] = [];
  let deepType: ProviderTypeExpression = { kind: "number" };
  for (let index = 0; index < 10_000; index++) {
    deepType = { kind: "array", elementType: deepType };
    ladder.push(deepType);
  }
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, [{
    id: "Unsafe",
    name: "Unsafe",
    kind: "function",
    type: deepType,
    signatures: ladder.map((type, index) => ({
      id: `Unsafe.${index}`,
      parameters: [{ name: "value", type }],
      returnType: { kind: "void" },
    })),
  }]));

  assert.doesNotThrow(() => {
    assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  });
  assert.match(JSON.stringify(host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"reason":"depth"/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider declaration graph complexity includes import and request expansion", () => {
  const specifier = "@target/import-expansion.js";
  const requestedExport = { exportedName: "Value", kind: "type" as const };
  const requestedExports = Array.from({ length: 257 }, () => requestedExport);
  const sharedImport: ProviderImportDeclaration = {
    moduleSpecifier: "@target/dependency.js",
    namedImports: requestedExports,
    typeOnly: true,
  };
  const imports = Array.from({ length: 257 }, () => sharedImport);
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("import-expansion-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://import-expansion/model",
      providerModuleId: "import.expansion.model",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      imports,
      exports: [{ id: "Value", name: "Value", kind: "type", type: { kind: "number" } }],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  assert.match(JSON.stringify(host.diagnostics.all().at(-1)?.evidence?.[0]?.details), /"reason":"complexity"/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider declaration graph rejects revoked arrays and evidence accessor failures", () => {
  const cases: readonly {
    readonly name: string;
    readonly model: (specifier: string, providerModuleId: string) => ProviderDeclarationModel;
  }[] = [{
    name: "revoked exports array",
    model: (specifier, providerModuleId) => {
      const revocable = Proxy.revocable([], {});
      revocable.revoke();
      return {
        moduleSpecifier: specifier,
        providerModuleId,
        exports: revocable.proxy as ProviderDeclarationModel["exports"],
      };
    },
  }, {
    name: "throwing evidence details",
    model: (specifier, providerModuleId) => {
      const evidence = { message: "provider evidence" } as ExtensionEvidence;
      Object.defineProperty(evidence, "details", {
        enumerable: true,
        get: () => {
          throw new Error("evidence details unavailable");
        },
      });
      return {
        moduleSpecifier: specifier,
        providerModuleId,
        evidence: [evidence],
        exports: [{ id: "Value", name: "Value", kind: "type", type: { kind: "number" } }],
      };
    },
  }];

  for (const entry of cases) {
    const specifier = `@target/${entry.name.replaceAll(" ", "-")}.js`;
    const providerModuleId = entry.name.replaceAll(" ", ".");
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`${entry.name.replaceAll(" ", "-")}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://${entry.name.replaceAll(" ", "-")}/model`,
        providerModuleId,
      }),
      getDeclarationModel: () => entry.model(specifier, providerModuleId),
    });

    assert.doesNotThrow(() => {
      assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected", entry.name);
    });
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("provider declaration array limits report complexity before allocation", () => {
  const specifier = "@target/oversized-model-array.js";
  const declaration: ProviderExportDeclaration = {
    id: "Value",
    name: "Value",
    kind: "type",
    type: { kind: "number" },
  };
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(
    specifier,
    Array.from({ length: 65_537 }, () => declaration),
  ));

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  const details = JSON.stringify(host.diagnostics.all().at(-1)?.evidence?.[0]?.details);
  assert.match(details, /"reason":"complexity"/);
  assert.match(details, /"limit":65536/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider type-family local declaration names do not affect canonical ABI", () => {
  const specifier = "@target/family-local-name.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("family-local-name-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://family-local-name/model",
      providerModuleId: "family.local.name",
      evidence: [{ message: context.containingFile ?? "" }],
    }),
    getDeclarationModel: (resolution) => {
      const localName = resolution.evidence?.[0]?.message === "/src/second.ts" ? "NativeB" : "NativeA";
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: "Family_0",
          name: localName,
          kind: "class",
          sourceTypeFamily: { exportName: "Family", typeArgumentCount: 0 },
          members: [{
            id: "Family_0.Self",
            name: "Self",
            kind: "property",
            type: {
              kind: "provider-ref",
              moduleSpecifier: resolution.moduleSpecifier,
              exportName: localName,
            },
          }],
        }],
      };
    },
  });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/first.ts" });
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  if (first.kind === "resolved" && second.kind === "resolved") {
    assert.equal(first.module.artifact, second.module.artifact);
  }
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("provider declaration resolution snapshots accepted schema state", () => {
  const specifier = "@target/snapshot.js";
  const mutableType: ProviderTypeExpression = { kind: "number" };
  const model: ProviderDeclarationModel = {
    moduleSpecifier: specifier,
    providerModuleId: "snapshot.model",
    exports: [{ id: "Value", name: "Value", kind: "type", type: mutableType }],
  };
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("snapshot-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://snapshot/model",
      providerModuleId: "snapshot.model",
    }),
    getDeclarationModel: () => model,
  });

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  Object.defineProperty(mutableType, "kind", { configurable: true, enumerable: true, value: "string" });
  assert.match(getCanonicalExportOwnerSource(host, "Value"), /type Value = number;/);
  if (resolved.kind === "resolved") {
    assert.equal(resolved.module.declarationModel.exports[0]?.type?.kind, "number");
  }
});

test("provider declaration capture reads schema accessors once before validation and rendering", () => {
  const specifier = "@target/single-read-model.js";
  let elementTypeReads = 0;
  const unstableType = { kind: "array" } as { kind: "array"; readonly elementType: ProviderTypeExpression };
  Object.defineProperty(unstableType, "elementType", {
    enumerable: true,
    get: () => {
      elementTypeReads += 1;
      return elementTypeReads === 1 ? { kind: "number" } : unstableType;
    },
  });
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("single-read-model-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://single-read-model/model",
      providerModuleId: "single.read.model",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Values", name: "Values", kind: "type", type: unstableType }],
    }),
  });

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  assert.equal(elementTypeReads, 1);
  assert.match(getCanonicalExportOwnerSource(host, "Values"), /type Values = number\[\];/);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("provider declaration accessor failures reject before publishing artifacts", () => {
  const specifier = "@target/throwing-model-accessor.js";
  const throwingType = { kind: "array" } as { kind: "array"; readonly elementType: ProviderTypeExpression };
  Object.defineProperty(throwingType, "elementType", {
    enumerable: true,
    get: () => {
      throw new Error("element type unavailable");
    },
  });
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("throwing-model-accessor-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://throwing-model-accessor/model",
      providerModuleId: "throwing.model.accessor",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Values", name: "Values", kind: "type", type: throwingType }],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /unsafe declaration graph/);
});

test("provider virtual module cache is separated by provider identity and resolution context", () => {
  const specifier = "@target/cache.js";
  let ownershipCount = 0;
  let resolveCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: {
      id: "cache-provider",
      version: "1.0.0",
      target: "demo",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
      configHash: "config-a",
    },
    ownsModule: (moduleSpecifier) => {
      ownershipCount += 1;
      return moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule: (moduleSpecifier, context) => {
      resolveCount += 1;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://cache/${context.activeSurface ?? "default"}`,
        providerModuleId: `cache:${context.activeSurface ?? "default"}`,
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
    }),
  });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", activeSurface: "array" });
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", activeSurface: "array" });
  const third = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", activeSurface: "span" });

  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  assert.equal(third.kind, "resolved");
  if (first.kind !== "resolved" || second.kind !== "resolved" || third.kind !== "resolved") {
    return;
  }

  assert.equal(first.module, second.module);
  assert.notEqual(first.module, third.module);
  assert.notEqual(first.module.cacheKey, third.module.cacheKey);
  assert.equal(ownershipCount, 2);
  assert.equal(resolveCount, 2);
});

test("provider virtual module cache preserves exact callback-visible context", () => {
  const specifier = "@target/exact-cache.js";
  const contexts: ProviderModuleContext[] = [];
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("exact-cache-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      contexts.push(context);
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://exact-cache/model",
        providerModuleId: "exact.cache.model",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
    }),
  });
  const named = (moduleSpecifier: string, requestedExports?: readonly ProviderRequestedExport[]): ProviderModuleContext => ({
    activeTarget: "demo",
    resolutionMode: "import",
    importSlice: {
      moduleSpecifier,
      kind: "named",
      ...(requestedExports === undefined ? {} : { requestedExports }),
    },
  });

  const contextsToResolve: readonly ProviderModuleContext[] = [
    { activeTarget: "demo" },
    { activeTarget: "demo", resolutionMode: undefined },
    { activeTarget: "demo", importSlice: undefined },
    { activeTarget: "demo", resolutionMode: "none" },
    { activeTarget: "demo", resolutionMode: "import" },
    { activeTarget: "demo", resolutionMode: "require" },
    named(specifier),
    {
      activeTarget: "demo",
      resolutionMode: "import",
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: undefined,
      },
    },
    named(specifier, []),
    named(specifier, [{ exportedName: "Value" }]),
    named(specifier, [{ exportedName: "Value", localName: undefined, kind: undefined }]),
    named("@target/alias.js", [{ exportedName: "Value" }]),
    {
      activeTarget: "demo",
      resolutionMode: "import",
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: [{ exportedName: "Value" }, { exportedName: "Other" }],
      },
    },
    {
      activeTarget: "demo",
      resolutionMode: "import",
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: [{ exportedName: "Other" }, { exportedName: "Value" }],
      },
    },
  ];
  for (const context of contextsToResolve) {
    assert.equal(host.providers.resolveVirtualModule(specifier, context).kind, "resolved");
    assert.equal(host.providers.resolveVirtualModule(specifier, context).kind, "resolved");
  }
  assert.equal(contexts.length, contextsToResolve.length);
  assert.deepEqual(contexts, contextsToResolve);
});

test("provider registration snapshots identity and callback methods exactly once", () => {
  const specifier = "@target/registration-snapshot.js";
  const mutableIdentity = providerIdentity("registration-snapshot-provider", "demo", "binding");
  let versionReads = 0;
  Object.defineProperty(mutableIdentity, "version", {
    configurable: true,
    get: () => {
      versionReads += 1;
      return versionReads === 1 ? "1.0.0" : "unstable-version";
    },
  });
  let ownershipCount = 0;
  const provider: TargetBindingProvider = {
    identity: mutableIdentity,
    ownsModule: (moduleSpecifier) => {
      ownershipCount += 1;
      return moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://registration-snapshot/model",
      providerModuleId: "registration.snapshot.model",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
    }),
  };
  const host = new ExtensionHost({});
  assert.equal(host.providers.registerTargetBindingProvider(provider), true);
  Object.defineProperty(mutableIdentity, "version", { value: "2.0.0" });
  Object.defineProperty(provider, "ownsModule", { value: () => ({ kind: "unowned" }) });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  if (first.kind === "resolved" && second.kind === "resolved") {
    assert.equal(first.module, second.module);
    assert.equal(first.module.artifact.provider.version, "1.0.0");
  }
  assert.equal(ownershipCount, 1);
  assert.equal(versionReads, 1);
  assert.equal(host.providers.registerTargetBindingProvider(provider), true);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("provider resolution snapshots context before callbacks and retains immutable cache identity", () => {
  const specifier = "@target/context-snapshot.js";
  let resolveCount = 0;
  let observedContext: ProviderModuleContext | undefined;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("context-snapshot-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      resolveCount += 1;
      observedContext = context;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://context-snapshot/model",
        providerModuleId: "context.snapshot.model",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
    }),
  });

  const mutableContext: { activeTarget: string; activeSurface: string } = {
    activeTarget: "demo",
    activeSurface: "native",
  };
  const first = host.providers.resolveVirtualModule(specifier, mutableContext);
  mutableContext.activeSurface = "changed-after-resolution";
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", activeSurface: "native" });
  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  if (first.kind === "resolved" && second.kind === "resolved") {
    assert.equal(first.module, second.module);
    assert.equal(first.module.context.activeSurface, "native");
    assert.equal(Object.isFrozen(first.module.context), true);
  }
  assert.equal(Object.isFrozen(observedContext), true);
  assert.equal(resolveCount, 1);
});

test("unreadable provider module contexts reject before ownership callbacks", () => {
  const specifier = "@target/unreadable-context.js";
  let ownershipCount = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("unreadable-context-provider", "demo", "binding"),
    ownsModule: () => {
      ownershipCount += 1;
      return { kind: "owned" };
    },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://unreadable-context/model",
      providerModuleId: "unreadable.context.model",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [],
    }),
  });
  const revocable = Proxy.revocable<ProviderModuleContext>({}, {});
  revocable.revoke();

  assert.doesNotThrow(() => {
    assert.equal(host.providers.resolveVirtualModule(specifier, revocable.proxy).kind, "rejected");
  });
  assert.equal(ownershipCount, 0);
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /unreadable module context/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider resolution output is read once before any artifact is published", () => {
  const specifier = "@target/resolution-snapshot.js";
  let virtualFileNameReads = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("resolution-snapshot-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      get virtualFileName(): string {
        virtualFileNameReads += 1;
        if (virtualFileNameReads > 1) {
          throw new Error("virtualFileName read more than once");
        }
        return "tsts-provider://resolution-snapshot/model";
      },
      providerModuleId: "resolution.snapshot.model",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Value", name: "Value", kind: "value", type: { kind: "number" } }],
    }),
  });

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  assert.equal(virtualFileNameReads, 1);
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("published provider artifacts and canonical declaration state are deeply immutable", () => {
  const specifier = "@target/immutable-artifact.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier, {
    members: [{ id: "Value", name: "Value", kind: "property", type: { kind: "array", elementType: { kind: "number" } } }, {
      id: "Pending",
      name: "Pending",
      kind: "property",
      type: {
        kind: "source-global",
        name: "PromiseLikeValue",
        typeArguments: [{ kind: "array", elementType: { kind: "number" } }],
      },
    }],
  }));
  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "resolved");
  if (resolved.kind !== "resolved") {
    return;
  }
  const artifact = resolved.module.artifact;
  const declaration = artifact.declarationModel.exports[0]!;
  const member = declaration.members?.[0];
  assert.ok(member !== undefined && member.type?.kind === "array");
  assert.equal(Object.isFrozen(artifact), true);
  assert.equal(Object.isFrozen(artifact.document), true);
  assert.equal(Object.isFrozen(artifact.provider), true);
  assert.equal(Object.isFrozen(artifact.declarationModel), true);
  assert.equal(Object.isFrozen(artifact.declarationModel.exports), true);
  assert.equal(Object.isFrozen(declaration), true);
  assert.equal(Object.isFrozen(member), true);
  assert.equal(Object.isFrozen(member.type), true);
  assert.equal(Object.isFrozen(member.type.elementType), true);
  const pending = declaration.members?.[1];
  assert.ok(pending?.type?.kind === "source-global");
  assert.equal(Object.isFrozen(pending.type), true);
  assert.equal(Object.isFrozen(pending.type.typeArguments), true);
  const pendingArgument = pending.type.typeArguments?.[0];
  assert.ok(pendingArgument?.kind === "array");
  assert.equal(Object.isFrozen(pendingArgument), true);
  assert.equal(Object.isFrozen(pendingArgument.elementType), true);
  assert.throws(() => (artifact.declarationModel.exports as ProviderExportDeclaration[]).pop(), TypeError);
  assert.throws(() => Object.defineProperty(member, "id", { value: "Changed" }), TypeError);
});

test("provider package metadata is exact and rejects empty or partial package identities", () => {
  const cases: readonly { readonly name: string; readonly packageName?: string; readonly packageVersion?: string }[] = [
    { name: "empty package name", packageName: "" },
    { name: "empty package version", packageName: "@target/package", packageVersion: "" },
    { name: "version without package", packageVersion: "1.0.0" },
  ];
  for (const entry of cases) {
    const specifier = `@target/invalid-package-${entry.name.replaceAll(" ", "-")}.js`;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`invalid-package-${entry.name}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://invalid-package/${entry.name}`,
        providerModuleId: `invalid.package.${entry.name}`,
        ...(entry.packageName === undefined ? {} : { packageName: entry.packageName }),
        ...(entry.packageVersion === undefined ? {} : { packageVersion: entry.packageVersion }),
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [],
      }),
    });
    assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected", entry.name);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("provider resolution identity fields share one bounded ancillary envelope", () => {
  const oversizedSpecifierHost = new ExtensionHost({});
  let ownershipCalls = 0;
  oversizedSpecifierHost.providers.registerTargetBindingProvider({
    ...acmeBindingProvider("@target/unused.js", { id: "oversized-specifier-provider" }),
    ownsModule: () => {
      ownershipCalls += 1;
      return { kind: "unowned" };
    },
  });
  assert.equal(
    oversizedSpecifierHost.providers.resolveVirtualModule(
      "s".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1),
    ).kind,
    "rejected",
  );
  assert.equal(ownershipCalls, 0);
  assert.equal(oversizedSpecifierHost.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_SPECIFIER");

  const oversizedFields = ["virtualFileName", "providerModuleId", "packageName", "packageVersion"] as const;
  for (const field of oversizedFields) {
    const specifier = `@target/oversized-resolution-${field}.js`;
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`oversized-resolution-${field}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: field === "virtualFileName"
          ? "v".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1)
          : `tsts-provider://resolution-envelope/${field}`,
        providerModuleId: field === "providerModuleId"
          ? "m".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1)
          : `resolution.envelope.${field}`,
        ...(field === "packageName"
          ? { packageName: "p".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1) }
          : field === "packageVersion"
            ? {
              packageName: "@target/resolution-envelope",
              packageVersion: "v".repeat(providerAncillaryDataLimits.maxStringCodeUnits + 1),
            }
            : {}),
      }),
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [],
        };
      },
    });
    assert.equal(host.providers.resolveVirtualModule(specifier).kind, "rejected", field);
    assert.equal(declarationCalls, 0, field);
    assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION", field);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], field);
  }

  const specifier = "@target/exact-resolution-envelope.js";
  const virtualFileName = "v".repeat(providerAncillaryDataLimits.maxStringCodeUnits);
  const providerModuleId = "m".repeat(providerAncillaryDataLimits.maxStringCodeUnits);
  const packageName = "p".repeat(providerAncillaryDataLimits.maxStringCodeUnits);
  const exactPackageVersionLength = providerAncillaryDataLimits.maxTotalScalarCodeUnits
    - specifier.length
    - virtualFileName.length
    - providerModuleId.length
    - packageName.length;
  assert.ok(exactPackageVersionLength > 0);
  const createEnvelopeHost = (packageVersionLength: number) => {
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`exact-resolution-envelope-${packageVersionLength}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName,
        providerModuleId,
        packageName,
        packageVersion: "r".repeat(packageVersionLength),
      }),
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [],
        };
      },
    });
    return { host, declarationCalls: () => declarationCalls };
  };
  const exact = createEnvelopeHost(exactPackageVersionLength);
  assert.equal(exact.host.providers.resolveVirtualModule(specifier).kind, "resolved");
  assert.equal(exact.declarationCalls(), 1);
  const over = createEnvelopeHost(exactPackageVersionLength + 1);
  assert.equal(over.host.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(over.declarationCalls(), 0);
  assert.match(JSON.stringify(over.host.diagnostics.all().at(-1)?.evidence), /exceeds the total string limit/);
});

test("provider-returned diagnostics share one bounded ancillary envelope", () => {
  const specifier = "@target/oversized-diagnostic.js";
  const payload = "d".repeat(60_000);
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("oversized-diagnostic-provider", "demo", "binding"),
    ownsModule: () => ({
      kind: "reject",
      diagnostic: {
        extensionId: payload,
        extensionCode: payload,
        numericCode: 1,
        publicCode: payload,
        category: "error",
        message: payload,
        identity: payload,
      },
    }),
    resolveModule: () => {
      throw new Error("resolveModule must not run");
    },
    getDeclarationModel: () => {
      throw new Error("getDeclarationModel must not run");
    },
  });

  assert.equal(host.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_CALLBACK_RESULT");
  assert.match(JSON.stringify(host.diagnostics.all().at(-1)?.evidence), /exceeds the total string limit/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("provider virtual module source variants receive distinct internal file identities", () => {
  const specifier = "@target/sliced.js";
  const createHost = () => {
    const host = new ExtensionHost({});
    let pendingExports: readonly string[] = [];
    host.providers.registerTargetBindingProvider({
      identity: {
        id: "sliced-provider",
        version: "1.0.0",
        target: "demo",
        extensionContractVersion: TstsProviderContractVersion,
        providerKind: "binding",
      },
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        pendingExports = (context.importSlice?.requestedExports ?? []).map((request) => request.exportedName).sort();
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://sliced/runtime",
          providerModuleId: "sliced.runtime",
          packageName: "@target/sliced",
          packageVersion: "1.0.0",
        };
      },
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: resolution.moduleSpecifier,
          name: pendingExports.includes("Second") ? "Second" : "First",
          kind: "interface",
          members: [],
        }],
      }),
    });
    return host;
  };
  const resolveSlice = (host: ExtensionHost, exportedName: string, localName = exportedName) =>
    host.providers.resolveVirtualModule(specifier, {
      activeTarget: "demo",
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: [{ exportedName, localName }],
      },
    });

  const host = createHost();
  const first = resolveSlice(host, "First");
  const second = resolveSlice(host, "Second");
  const firstAgain = resolveSlice(host, "First", "RenamedFirst");

  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  assert.equal(firstAgain.kind, "resolved");
  if (first.kind !== "resolved" || second.kind !== "resolved" || firstAgain.kind !== "resolved") {
    return;
  }

  assert.equal(first.module.resolution.virtualFileName, "tsts-provider://sliced/runtime");
  assert.equal(second.module.resolution.virtualFileName, "tsts-provider://sliced/runtime");
  assertProviderPublicVirtualFileName(first.module.artifact.fileName);
  assertProviderPublicVirtualFileName(second.module.artifact.fileName);
  assert.notEqual(second.module.artifact.fileName, first.module.artifact.fileName);
  assert.equal(firstAgain.module.artifact, first.module.artifact);
  assert.notEqual(firstAgain, first);
  assert.equal(firstAgain.module.context.importSlice?.requestedExports?.[0]?.localName, "RenamedFirst");
  assert.equal(host.providers.getVirtualDeclarationDocument(first.module.artifact.fileName)?.sourceText, first.module.artifact.sourceText);
  assert.equal(host.providers.getVirtualDeclarationDocument(second.module.artifact.fileName)?.sourceText, second.module.artifact.sourceText);

  const reverseHost = createHost();
  const reverseSecond = resolveSlice(reverseHost, "Second");
  const reverseFirst = resolveSlice(reverseHost, "First");
  assert.equal(reverseSecond.kind, "resolved");
  assert.equal(reverseFirst.kind, "resolved");
  if (reverseSecond.kind !== "resolved" || reverseFirst.kind !== "resolved") {
    return;
  }
  assert.equal(reverseFirst.module.artifact.sourceText, first.module.artifact.sourceText);
  assert.equal(reverseFirst.module.artifact.fileName, first.module.artifact.fileName);
  assert.equal(reverseSecond.module.artifact.sourceText, second.module.artifact.sourceText);
  assert.equal(reverseSecond.module.artifact.fileName, second.module.artifact.fileName);
});

test("provider virtual source variants canonicalize repeated public exports before redeclaration", () => {
  const specifier = "@target/canonical.js";
  const dependencySpecifier = "@target/dependency.js";
  const host = new ExtensionHost({});
  let dependencyLocalName = "DependencyWithoutContext";
  let includeHolder = false;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("canonical-source-variant-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier || moduleSpecifier === dependencySpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      if (moduleSpecifier === dependencySpecifier) {
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://canonical/dependency",
          providerModuleId: "canonical.dependency",
        };
      }
      const withDependencyContext = context.containingFile === "/src/with-dependency.ts";
      includeHolder = withDependencyContext;
      dependencyLocalName = withDependencyContext ? "DependencyWithContext" : "DependencyWithoutContext";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: context.containingFile === "/src/alternate-base.ts"
          ? "tsts-provider://canonical/source-variant-alternate"
          : withDependencyContext
            ? "tsts-provider://canonical/source-variant-with-dependency"
            : "tsts-provider://canonical/source-variant",
        providerModuleId: "canonical.source.variant",
      };
    },
    getDeclarationModel: (resolution) => resolution.moduleSpecifier === dependencySpecifier
      ? {
        moduleSpecifier: dependencySpecifier,
        providerModuleId: "canonical.dependency",
        exports: [{ id: "Dependency", name: "Dependency", kind: "interface", members: [] }],
      }
      : ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      imports: [{
        moduleSpecifier: dependencySpecifier,
        typeOnly: true,
        namedImports: [{ exportedName: "Dependency", localName: dependencyLocalName }],
      }],
      exports: [{
        id: "Token",
        name: "TokenImplementation",
        exportName: "Token",
        kind: "class",
        members: [{
          id: "Token.dependency",
          name: "dependency",
          kind: "property",
          type: {
            kind: "provider-ref",
            moduleSpecifier: dependencySpecifier,
            exportName: "Dependency",
            localName: dependencyLocalName,
          },
        }],
      }, {
        id: "TokenShape",
        name: "TokenShape",
        kind: "interface",
        members: [],
      }, ...(includeHolder ? [{
        id: "Holder",
        name: "Holder",
        kind: "interface" as const,
        members: [{
          id: "Holder.token",
          name: "token",
          kind: "property" as const,
          type: {
            kind: "provider-ref" as const,
            moduleSpecifier: specifier,
            exportName: "Token",
            localName: "TokenImplementation",
          },
        }],
      }] : [])],
    }),
  });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/without-dependency.ts" });
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/with-dependency.ts" });
  const exactSourceAlternateBase = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/alternate-base.ts" });

  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  assert.equal(exactSourceAlternateBase.kind, "resolved");
  if (first.kind !== "resolved" || second.kind !== "resolved" || exactSourceAlternateBase.kind !== "resolved") {
    return;
  }

  assert.notEqual(exactSourceAlternateBase.module.resolution.virtualFileName, first.module.resolution.virtualFileName);
  assert.equal(exactSourceAlternateBase.module.artifact, first.module.artifact);
  assertProviderPublicVirtualFileName(first.module.artifact.fileName);
  assertProviderPublicVirtualFileName(second.module.artifact.fileName);
  assert.notEqual(second.module.artifact.fileName, first.module.artifact.fileName);
  assert.match(second.module.artifact.sourceText, /import \{ Token as __TstsProviderCanonical_Token \} from "tsts-provider:\/\/tsts-internal\/[^\"]+\.tsts-export-owner-[^\"]+\.d\.ts";/);
  assert.match(second.module.artifact.sourceText, /import type \{ TokenShape as __TstsProviderCanonical_TokenShape \} from "tsts-provider:\/\/tsts-internal\/[^\"]+\.tsts-export-owner-[^\"]+\.d\.ts";/);
  assert.match(second.module.artifact.sourceText, /export \{ __TstsProviderCanonical_Token as Token \};/);
  assert.match(second.module.artifact.sourceText, /export type \{ __TstsProviderCanonical_TokenShape as TokenShape \};/);
  const holderSource = getCanonicalExportOwnerSource(host, "Holder");
  assert.match(holderSource, /import type \{ Token as ([A-Za-z0-9_$]+) \} from "tsts-provider:\/\/tsts-internal\/[^\"]+\.tsts-export-owner-[^\"]+\.d\.ts";/);
  assert.match(holderSource, /token: __TstsProviderExact_Token_0_/);
  assert.equal(second.module.artifact.sourceText.includes("@target/dependency.js"), false);
  assert.equal(second.module.artifact.sourceText.includes("declare class TokenImplementation"), false);
  assert.equal(second.module.artifact.sourceText.includes("export interface TokenShape"), false);
});

test("provider virtual source variants canonicalize value and type-only default exports", () => {
  for (const kind of ["class", "interface"] as const) {
    const specifier = `@target/default-${kind}.js`;
    const host = new ExtensionHost({});
    let includeSupportImport = false;
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`default-${kind}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        includeSupportImport = context.containingFile === "/src/second.ts";
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: `tsts-provider://default/${kind}`,
          providerModuleId: `default.${kind}`,
        };
      },
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        ...(includeSupportImport ? {
          imports: [{
            moduleSpecifier: "@target/support.js",
            typeOnly: true,
            namedImports: [{ exportedName: "Marker" }],
          }],
        } : {}),
        exports: [{
          id: "DefaultToken",
          name: "DefaultToken",
          ...(includeSupportImport ? { exportName: "default" } : { exportKind: "default" as const }),
          kind,
          members: [],
        }],
      }),
    });

    const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/first.ts" });
    const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
    assert.equal(first.kind, "resolved");
    assert.equal(second.kind, "resolved", JSON.stringify(host.diagnostics.all()));
    if (first.kind !== "resolved" || second.kind !== "resolved") {
      continue;
    }

    const typeKeyword = kind === "interface" ? "type " : "";
    assert.match(second.module.artifact.sourceText, new RegExp(`import ${typeKeyword}\\{ default as __TstsProviderCanonical_default \\}`));
    assert.match(second.module.artifact.sourceText, new RegExp(`export ${typeKeyword}\\{ __TstsProviderCanonical_default as default \\}`));
    assert.equal(second.module.artifact.sourceText.includes(`DefaultToken`), false);
  }
});

test("provider virtual source variants canonicalize complete multi-arity type families", () => {
  for (const kind of ["class", "interface"] as const) {
    const specifier = `@target/family-${kind}.js`;
    const host = new ExtensionHost({});
    let contextKind: "first" | "second" | "conflicting" = "first";
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`family-${kind}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        contextKind = context.containingFile === "/src/second.ts"
          ? "second"
          : context.containingFile === "/src/conflicting.ts"
            ? "conflicting"
            : "first";
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: `tsts-provider://family/${kind}`,
          providerModuleId: `family.${kind}`,
        };
      },
      getDeclarationModel: (resolution) => {
        const variants = [{
          id: "Family_0",
          name: "Family_0",
          kind,
          sourceTypeFamily: { exportName: "Family", typeArgumentCount: 0 },
          members: [],
        }, {
          id: "Family_1",
          name: "Family_1",
          kind,
          sourceTypeFamily: { exportName: "Family", typeArgumentCount: 1 },
          typeParameters: [{ name: "T" }],
          members: contextKind === "conflicting" ? [{
            id: "Family_1.value",
            name: "value",
            kind: "property" as const,
            type: { kind: "type-parameter" as const, name: "T" },
          }] : [],
        }];
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          ...(contextKind === "first" ? {} : {
            imports: [{
              moduleSpecifier: "@target/support.js",
              typeOnly: true,
              namedImports: [{ exportedName: "Marker" }],
            }],
          }),
          exports: contextKind === "first" ? variants : [...variants].reverse(),
        };
      },
    });

    const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/first.ts" });
    const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
    const conflicting = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/conflicting.ts" });
    assert.equal(first.kind, "resolved");
    assert.equal(second.kind, "resolved");
    assert.equal(conflicting.kind, "rejected");
    if (second.kind !== "resolved") {
      continue;
    }

    const typeKeyword = kind === "interface" ? "type " : "";
    assert.match(second.module.artifact.sourceText, new RegExp(`import ${typeKeyword}\\{ Family as __TstsProviderCanonical_Family \\}`));
    assert.match(second.module.artifact.sourceText, new RegExp(`export ${typeKeyword}\\{ __TstsProviderCanonical_Family as Family \\}`));
    assert.equal(second.module.artifact.sourceText.includes("__TstsProvider_Family_0"), false);
    assert.equal(second.module.artifact.sourceText.includes("__TstsProvider_Family_1"), false);
  }
});

test("provider virtual export ownership composes subset superset overlap and disjoint slices", () => {
  const specifier = "@target/composed.js";
  const cases = [
    { first: ["A", "B"], second: ["B"] },
    { first: ["B"], second: ["A", "B"] },
    { first: ["A", "B"], second: ["B", "C"] },
    { first: ["B", "C"], second: ["A", "B"] },
    { first: ["A"], second: ["B"] },
  ] as const;

  for (const entry of cases) {
    const host = new ExtensionHost({});
    let pendingExports: readonly string[] = [];
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`composed-slice-provider-${entry.first.join("")}-${entry.second.join("")}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        pendingExports = (context.importSlice?.requestedExports ?? []).map((request) => request.exportedName).sort();
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://composed/slices",
          providerModuleId: "composed.slices",
        };
      },
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: pendingExports.map((exportName) => ({
          id: exportName,
          name: exportName,
          kind: "class" as const,
          members: [],
        })),
      }),
    });

    const resolve = (requestedExports: readonly string[]) => host.providers.resolveVirtualModule(specifier, {
      activeTarget: "demo",
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: requestedExports.map((exportedName) => ({ exportedName })),
      },
    });
    const first = resolve(entry.first);
    const second = resolve(entry.second);
    assert.equal(first.kind, "resolved");
    assert.equal(second.kind, "resolved");
    if (first.kind !== "resolved" || second.kind !== "resolved") {
      continue;
    }

    for (const exportName of entry.second) {
      assert.match(second.module.artifact.sourceText, new RegExp(`export \\{ __TstsProviderCanonical_${exportName} as ${exportName} \\};`));
      assert.equal(second.module.artifact.sourceText.includes(`export declare class ${exportName}`), false);
      assert.match(getCanonicalExportOwnerSource(host, exportName), new RegExp(`export declare class ${exportName}`));
    }
    const secondExports = new Set<string>(entry.second);
    if (entry.first.every((exportName) => !secondExports.has(exportName))) {
      const combined = [...new Set([...entry.first, ...entry.second])].sort();
      const third = resolve(combined);
      assert.equal(third.kind, "resolved");
      if (third.kind === "resolved") {
        for (const exportName of combined) {
          assert.match(third.module.artifact.sourceText, new RegExp(`export \\{ __TstsProviderCanonical_${exportName} as ${exportName} \\};`));
          assert.equal(third.module.artifact.sourceText.includes(`export declare class ${exportName}`), false);
        }
      }
    }
  }
});

test("provider virtual slices reject conflicting contracts for one public export", () => {
  const specifier = "@target/conflicting-export.js";
  const host = new ExtensionHost({});
  let includeMember = false;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("conflicting-export-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      includeMember = context.containingFile === "/src/second.ts";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://conflicting/export",
        providerModuleId: "conflicting.export",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Token",
        name: "Token",
        kind: "class",
        members: includeMember ? [{
          id: "Token.value",
          name: "value",
          kind: "property",
          type: { kind: "number" },
        }] : [],
      }],
    }),
  });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/first.ts" });
  const conflicting = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/second.ts" });

  assert.equal(first.kind, "resolved");
  assert.equal(conflicting.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_DECLARATION_MODEL");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /conflicting declarations for public export '@target\/conflicting-export\.js#Token'/);
});

test("provider export contracts distinguish text keys from well-known symbol keys", () => {
  const specifier = "@target/property-key-contract.js";
  const host = new ExtensionHost({});
  let useWellKnownSymbol = false;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("property-key-contract-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      useWellKnownSymbol = context.containingFile === "/src/symbol.ts";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://property-key/contract",
        providerModuleId: "property-key.contract",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Token",
        name: "Token",
        kind: "interface",
        members: [{
          id: "Token.member",
          name: useWellKnownSymbol
            ? { kind: "well-known-symbol", name: "iterator" }
            : { kind: "string-literal", text: "Symbol.iterator" },
          kind: "property",
          type: { kind: "number" },
        }],
      }],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/text.ts" }).kind, "resolved");
  const conflicting = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/symbol.ts" });
  assert.equal(conflicting.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_DECLARATION_MODEL");
});

test("provider export contracts normalize negative zero to its rendered numeric literal", () => {
  const specifier = "@target/negative-zero-contract.js";
  const host = new ExtensionHost({});
  let value = -0;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("negative-zero-contract-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      value = context.containingFile === "/src/negative.ts" ? -0 : 0;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://negative-zero/contract",
        providerModuleId: "negative-zero.contract",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Zero",
        name: "Zero",
        kind: "type",
        type: { kind: "literal", value },
      }],
    }),
  });

  const negative = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/negative.ts" });
  const positive = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo", containingFile: "/src/positive.ts" });
  assert.equal(negative.kind, "resolved");
  assert.equal(positive.kind, "resolved");
  if (negative.kind === "resolved" && positive.kind === "resolved") {
    assert.equal(negative.module.artifact, positive.module.artifact);
  }
});

test("contract-equivalent provider models intern one immutable artifact in either request order", () => {
  const specifier = "@target/canonical-equivalence.js";
  const snapshots: string[] = [];
  for (const order of [["a", "b"], ["b", "a"]] as const) {
    const host = new ExtensionHost({});
    let alternate = false;
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity("canonical-equivalence-provider", "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        alternate = context.containingFile === "/src/b.ts";
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://canonical-equivalence/provider",
          providerModuleId: "canonical.equivalence",
          evidence: [{ message: alternate ? "request B" : "request A" }],
        };
      },
      getDeclarationModel: (resolution): ProviderDeclarationModel => {
        const token: ProviderExportDeclaration = {
          id: "Token",
          name: alternate ? "TokenAliasB" : "TokenAliasA",
          exportName: "Token",
          ...(alternate ? { typeParameters: [], heritage: [] } : {}),
          kind: "interface",
          members: [{
            id: "Token.zero",
            name: alternate ? { kind: "string-literal", text: "zero" } : { kind: "identifier", text: "zero" },
            kind: "property",
            ...(alternate ? { readonly: false, optional: false } : {}),
            type: { kind: "literal", value: alternate ? 0 : -0 },
          }, {
            id: "Token.call",
            name: "call",
            kind: "method",
            signatures: [{
              id: "Token.call(value)",
              parameters: [{
                name: "value",
                type: { kind: "number" },
                ...(alternate ? { passingMode: "by-value", optional: false, rest: false } : {}),
              }],
              ...(alternate ? { typeParameters: [] } : {}),
              returnType: { kind: "void" },
            }],
          }],
          documentation: alternate ? "request B docs" : "request A docs",
        };
        const marker: ProviderExportDeclaration = {
          id: "Marker",
          name: "Marker",
          kind: "interface",
          members: [],
        };
        const family: ProviderExportDeclaration = {
          id: "Family_0",
          name: "Family_0",
          kind: "class",
          sourceTypeFamily: { exportName: "Family", typeArgumentCount: alternate ? 0 : -0 },
          ...(alternate ? { typeParameters: [] } : {}),
          members: [],
        };
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: alternate ? [family, marker, token] : [token, family, marker],
          evidence: [{ message: alternate ? "model B" : "model A" }],
        };
      },
    });

    const resolved = order.map((name) => host.providers.resolveVirtualModule(specifier, {
      activeTarget: "demo",
      containingFile: `/src/${name}.ts`,
    }));
    assert.ok(resolved.every((result) => result.kind === "resolved"));
    const first = resolved[0];
    const second = resolved[1];
    if (first === undefined || second === undefined || first.kind !== "resolved" || second.kind !== "resolved") {
      continue;
    }
    assert.notEqual(first.module, second.module);
    assert.equal(first.module.artifact, second.module.artifact);
    assert.notEqual(first.module.declarationModel.exports.find((declaration) => declaration.id === "Token")?.name,
      second.module.declarationModel.exports.find((declaration) => declaration.id === "Token")?.name);
    assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
    snapshots.push(JSON.stringify({
      artifact: first.module.artifact,
      owners: getCanonicalExportOwnerDocuments(host).map((document) => ({
        fileName: document.fileName,
        declarationModel: document.declarationModel,
        sourceText: document.sourceText,
      })),
    }, undefined, 2));
  }
  assert.equal(snapshots.length, 2);
  assert.equal(snapshots[0], snapshots[1]);
});

test("rejected provider slices do not reserve virtual file ownership", () => {
  const firstSpecifier = "@target/rejected-owner.js";
  const secondSpecifier = "@target/later-owner.js";
  const rejectedBaseFileName = "tsts-provider://rejected/uncommitted-base";
  const host = new ExtensionHost({});
  let conflictingFirstModule = false;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("transactional-file-owner-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === firstSpecifier || moduleSpecifier === secondSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      conflictingFirstModule = moduleSpecifier === firstSpecifier && context.containingFile === "/src/rejected.ts";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: conflictingFirstModule || moduleSpecifier === secondSpecifier
          ? rejectedBaseFileName
          : "tsts-provider://rejected/canonical-base",
        providerModuleId: moduleSpecifier === firstSpecifier ? "rejected.owner" : "later.owner",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Token",
        name: "Token",
        kind: "class",
        members: conflictingFirstModule ? [{
          id: "Token.value",
          name: "value",
          kind: "property",
          type: { kind: "number" },
        }] : [],
      }],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(firstSpecifier, { activeTarget: "demo", containingFile: "/src/accepted.ts" }).kind, "resolved");
  assert.equal(host.providers.resolveVirtualModule(firstSpecifier, { activeTarget: "demo", containingFile: "/src/rejected.ts" }).kind, "rejected");
  assert.equal(host.providers.resolveVirtualModule(secondSpecifier, { activeTarget: "demo", containingFile: "/src/later.ts" }).kind, "resolved");
});

test("successful provider closure reserves transitive raw virtual file identities", () => {
  const rootSpecifier = "@target/transitive-file-root.js";
  const dependencySpecifier = "@target/transitive-file-dependency.js";
  const collidingSpecifier = "@target/transitive-file-collision.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("transitive-file-identity-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => [rootSpecifier, dependencySpecifier, collidingSpecifier].includes(moduleSpecifier)
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: moduleSpecifier === rootSpecifier
        ? "tsts-provider://transitive-file/root"
        : "tsts-provider://transitive-file/shared",
      providerModuleId: moduleSpecifier === rootSpecifier
        ? "transitive.file.root"
        : moduleSpecifier === dependencySpecifier
          ? "transitive.file.dependency"
          : "transitive.file.collision",
    }),
    getDeclarationModel: (resolution) => resolution.moduleSpecifier === rootSpecifier
      ? {
        moduleSpecifier: rootSpecifier,
        providerModuleId: resolution.providerModuleId,
        imports: [{
          moduleSpecifier: dependencySpecifier,
          namedImports: [{ exportedName: "Dependency" }],
          typeOnly: true,
        }],
        exports: [{
          id: "Root",
          name: "Root",
          kind: "interface",
          members: [{
            id: "Root.dependency",
            name: "dependency",
            kind: "property",
            type: { kind: "provider-ref", moduleSpecifier: dependencySpecifier, exportName: "Dependency" },
          }],
        }],
      }
      : {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: resolution.moduleSpecifier === dependencySpecifier ? "Dependency" : "Collision",
          name: resolution.moduleSpecifier === dependencySpecifier ? "Dependency" : "Collision",
          kind: "interface",
          members: [],
        }],
      },
  });

  assert.equal(host.providers.resolveVirtualModule(rootSpecifier, { activeTarget: "demo" }).kind, "resolved");
  const documentsBeforeCollision = host.providers.getVirtualDeclarationDocuments();
  assert.equal(host.providers.resolveVirtualModule(collidingSpecifier, { activeTarget: "demo" }).kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /used for multiple public provider module identities/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), documentsBeforeCollision);
});

test("generated provider slice files cannot be reused as another module base", () => {
  const slicedSpecifier = "@target/generated-owner.js";
  const collidingSpecifier = "@target/generated-collision.js";
  const host = new ExtensionHost({});
  let generatedFileName = "";
  let includeExtraExport = false;
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("generated-file-owner-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === slicedSpecifier || moduleSpecifier === collidingSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      includeExtraExport = moduleSpecifier === slicedSpecifier && context.containingFile === "/src/second.ts";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: moduleSpecifier === collidingSpecifier ? generatedFileName : "tsts-provider://generated/owner",
        providerModuleId: moduleSpecifier === slicedSpecifier ? "generated.owner" : "generated.collision",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [
        { id: "Token", name: "Token", kind: "class", members: [] },
        ...(includeExtraExport ? [{ id: "Extra", name: "Extra", kind: "interface" as const, members: [] }] : []),
      ],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/first.ts" }).kind, "resolved");
  const second = host.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
  assert.equal(second.kind, "resolved");
  if (second.kind !== "resolved") {
    return;
  }
  generatedFileName = second.module.artifact.fileName;
  assertProviderPublicVirtualFileName(generatedFileName);
  const colliding = host.providers.resolveVirtualModule(collidingSpecifier, { activeTarget: "demo", containingFile: "/src/collision.ts" });
  assert.equal(colliding.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION");
});

test("provider resolutions cannot claim host-owned canonical export owner file names", () => {
  const specifier = "@target/reserved-family-companion.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("reserved-family-companion-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: `${providerVirtualInternalRoot}reserved${providerCanonicalExportOwnerMarker}provider-owned.d.ts`,
      providerModuleId: "reserved.family-companion",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{ id: "Token", name: "Token", kind: "class", members: [] }],
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION");
});

test("host-owned public identities reject provider claims without reserving the rejected path", () => {
  const slicedSpecifier = "@target/preoccupied-generated.js";
  const occupyingSpecifier = "@target/preoccupied-base.js";
  const createHost = (occupiedFileName: string | undefined) => {
    const host = new ExtensionHost({});
    let includeExtraExport = false;
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity("preoccupied-generated-file-provider", "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === slicedSpecifier || moduleSpecifier === occupyingSpecifier
        ? { kind: "owned" }
        : { kind: "unowned" },
      resolveModule: (moduleSpecifier, context) => {
        includeExtraExport = moduleSpecifier === slicedSpecifier && context.containingFile === "/src/second.ts";
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: moduleSpecifier === occupyingSpecifier
            ? occupiedFileName ?? "tsts-provider://unused/probe-occupier"
            : "tsts-provider://preoccupied/generated-owner",
          providerModuleId: moduleSpecifier === slicedSpecifier ? "preoccupied.generated.owner" : "preoccupied.base.owner",
        };
      },
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [
          { id: "Token", name: "Token", kind: "class", members: [] },
          ...(includeExtraExport ? [{ id: "Extra", name: "Extra", kind: "interface" as const, members: [] }] : []),
        ],
      }),
    });
    return host;
  };

  const probe = createHost(undefined);
  assert.equal(probe.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/first.ts" }).kind, "resolved");
  const probeSecond = probe.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
  assert.equal(probeSecond.kind, "resolved");
  if (probeSecond.kind !== "resolved") {
    return;
  }
  const occupiedFileName = probeSecond.module.artifact.fileName;
  assertProviderPublicVirtualFileName(occupiedFileName);

  const host = createHost(occupiedFileName);
  assert.equal(host.providers.resolveVirtualModule(occupyingSpecifier, { activeTarget: "demo", containingFile: "/src/occupier.ts" }).kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION");
  assert.equal(host.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/first.ts" }).kind, "resolved");
  const second = host.providers.resolveVirtualModule(slicedSpecifier, { activeTarget: "demo", containingFile: "/src/second.ts" });
  assert.equal(second.kind, "resolved");
  if (second.kind === "resolved") {
    assert.equal(second.module.artifact.fileName, occupiedFileName);
  }
});

test("provider virtual base file names cannot represent multiple public module identities", () => {
  const host = new ExtensionHost({});
  for (const specifier of ["@target/first.js", "@target/second.js"]) {
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`base-conflict-${specifier}`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://conflict/shared",
        providerModuleId: moduleSpecifier,
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: "Value",
          name: "Value",
          kind: "value",
          type: { kind: "number" },
        }],
      }),
    });
  }

  const first = host.providers.resolveVirtualModule("@target/first.js", { activeTarget: "demo" });
  const second = host.providers.resolveVirtualModule("@target/second.js", { activeTarget: "demo" });

  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.providerResolutionFailed);
});

test("required provider module patterns diagnose missing providers without hardcoded target names", () => {
  const host = new ExtensionHost({}, {
    activeTarget: "demo",
    requiredProviderModules: [{
      specifierPrefix: "@target/",
      target: "demo",
      message: "The demo target provider is required for @target/* imports.",
    }],
  });

  const missing = host.providers.resolveVirtualModule("@target/runtime.js", { activeTarget: "demo" });
  const unrelated = host.providers.resolveVirtualModule("@other/runtime.js", { activeTarget: "demo" });

  assert.equal(missing.kind, "rejected");
  assert.equal(unrelated.kind, "unowned");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerMissing);
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "REQUIRED_PROVIDER_MISSING");
});

test("semantic finalization seals facts and gates consumer reads", () => {
  const host = new ExtensionHost({});
  const subject = {};

  host.facts.set(subject, primitiveFactKey, "int32");
  assert.equal(host.getFactForConsumer("emitter", subject, primitiveFactKey), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.consumerBeforeFinalization);

  host.finalizeSemantics();
  assert.equal(host.finalized, true);
  assert.equal(host.getFactForConsumer("emitter", subject, primitiveFactKey), "int32");
  assert.equal(host.getFactsForConsumer("emitter", subject).length, 1);

  assert.equal(host.facts.set({}, primitiveFactKey, "int64"), "sealed");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.factStoreSealed);
});

test("lifecycle hooks run before semantic finalization seals facts", () => {
  const sourceFile = {};
  const finalizationMarker = {};
  const afterFinalize = {};
  let lifecycleCompilerProgram: object | undefined;
  let lifecycleQueryFacade = false;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("source-semantics", {
        initialize: (context) => {
          context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
            if (request.sourceFile === sourceFile && request.fileName === "/src/index.ts") {
              context.facts.set(request.sourceFile, primitiveFactKey, "int32");
            }
          });
          context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
            lifecycleCompilerProgram = lifecycleContext.compiler.program;
            lifecycleQueryFacade = typeof lifecycleContext.compiler.ast.kindName === "function"
              && typeof lifecycleContext.compiler.checker.getTypeAtLocation === "function"
              && typeof lifecycleContext.compiler.typeShape.typeToString === "function"
              && typeof lifecycleContext.compiler.getSourceFile === "function";
            context.facts.set(finalizationMarker, primitiveFactKey, "int64");
          });
        },
      }),
    ],
  });

  host.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
    sourceFile,
    fileName: "/src/index.ts",
  });
  assert.equal(host.facts.get(sourceFile, primitiveFactKey), "int32");

  host.finalizeSemantics();
  assert.equal(host.facts.get(finalizationMarker, primitiveFactKey), "int64");
  assert.equal(lifecycleCompilerProgram, host.program);
  assert.equal(lifecycleQueryFacade, true);
  assert.equal(host.facts.set(afterFinalize, primitiveFactKey, "uint32"), "sealed");
});

test("lifecycle hooks share one host-owned immutable request snapshot", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const sourceFile = {};
  let callerRequest: SourceFileBoundLifecycleRequest | undefined;
  let firstRequest: SourceFileBoundLifecycleRequest | undefined;
  let secondRequest: SourceFileBoundLifecycleRequest | undefined;
  let replaceFileNameResult: boolean | undefined;
  let replaceArtifactResult: boolean | undefined;
  let mutateArtifactResult: boolean | undefined;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("lifecycle-request-mutator", {
        initialize: (context) => {
          context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
            firstRequest = request;
            assert.equal(Object.isFrozen(request), true);
            assert.equal(Object.isFrozen(request.providerVirtualArtifact), true);
            replaceFileNameResult = Reflect.set(request, "fileName", "/src/mutated.ts");
            replaceArtifactResult = Reflect.set(request, "providerVirtualArtifact", undefined);
            mutateArtifactResult = Reflect.set(request.providerVirtualArtifact!, "fileName", "/src/mutated-provider.d.ts");
          });
        },
      }),
      extension("lifecycle-request-observer", {
        dependsOn: ["lifecycle-request-mutator"],
        initialize: (context) => {
          context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
            secondRequest = request;
          });
        },
      }),
    ],
  });
  host.providers.registerTargetBindingProvider(acmeBindingProvider(specifier));
  const resolution = host.providers.resolveVirtualModule(specifier, { activeTarget: "acme" });
  assert.equal(resolution.kind, "resolved");
  if (resolution.kind !== "resolved") {
    return;
  }
  const artifact = resolution.module.artifact;
  const request: SourceFileBoundLifecycleRequest = {
    sourceFile,
    fileName: "/src/index.ts",
    providerVirtualArtifact: artifact,
  };
  callerRequest = request;

  host.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, request);

  assert.notEqual(firstRequest, callerRequest);
  assert.equal(firstRequest, secondRequest);
  assert.equal(Object.isFrozen(callerRequest), false);
  assert.equal(replaceFileNameResult, false);
  assert.equal(replaceArtifactResult, false);
  assert.equal(mutateArtifactResult, false);
  assert.equal(secondRequest?.sourceFile, sourceFile);
  assert.equal(secondRequest?.fileName, "/src/index.ts");
  assert.equal(secondRequest?.providerVirtualArtifact, artifact);
  assert.equal(artifact.fileName.includes("mutated-provider"), false);
  assert.equal(host.diagnostics.hasErrors(), false);
});

test("canonical identity facts are consumer-queryable after finalization", () => {
  const host = new ExtensionHost({});
  const localAlias = {};

  host.facts.set(localAlias, canonicalIdentityFactKey, {
    kind: "export",
    id: "@example/native/types.js::int",
    packageName: "@example/native",
    packageVersion: "1.0.0",
    subpath: "types.js",
    exportName: "int",
    importKind: "type",
    canonicalSymbolId: "@example/native/types.js::int",
  });
  host.finalizeSemantics();

  assert.equal(host.getFactForConsumer("emitter", localAlias, canonicalIdentityFactKey)?.exportName, "int");
});

test("consumer query facade exposes finalized target facts without fallback inference", () => {
  const call = {};
  const propertyAccess = {};
  const argument = {};
  const runtimeType = {};
  const host = new ExtensionHost({});

  host.facts.set(call, selectedTargetSignatureFactKey, selectedTargetCallFact("Acme.Console.WriteLine(Acme.Int32)"));
  host.facts.set(propertyAccess, targetOperationFactKey, targetOperation("Acme.String.Length", "property"));
  host.facts.set(argument, argumentPassingFactKey, { mode: "byref-readonly" });
  host.facts.set(runtimeType, runtimeCarrierFactKey, {
    carrier: { kind: "target-named", id: "Acme.Int32" },
    requiresAllocation: false,
  });

  const consumer = createExtensionConsumerQueries(host, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.consumerBeforeFinalization);

  host.finalizeSemantics();
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "Acme.Console.WriteLine(Acme.Int32)");
  assert.equal(consumer.getSelectedTargetProperty(propertyAccess)?.operationId, "Acme.String.Length");
  assert.equal(consumer.getArgumentPassingFact(argument)?.mode, "byref-readonly");
  assert.equal(consumer.getRuntimeCarrierFact(runtimeType)?.carrier.kind, "target-named");
});

test("required consumer facts report diagnostics instead of allowing fallback inference", () => {
  const call = {};
  const type = {};
  const host = new ExtensionHost({});
  const consumer = createExtensionConsumerQueries(host, "emitter");

  host.finalizeSemantics();
  assert.equal(consumer.requireSelectedTargetCall(call, "emitting provider-owned call"), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.requiredFactMissing);
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "REQUIRED_FACT_MISSING");

  assert.equal(consumer.requireSelectedTargetCall(call, "emitting provider-owned call"), undefined);
  assert.equal(host.diagnostics.all().length, 1);

  host.facts.get(type, sourcePrimitiveFactKey);
  assert.equal(consumer.requireSourcePrimitiveFact(type, "emitting source primitive"), undefined);
  assert.equal(host.diagnostics.all()[1]?.numericCode, ExtensionHostDiagnosticCode.requiredFactMissing);
});

test("strict consumer facts report diagnostics and fail closed", () => {
  const call = {};
  const host = new ExtensionHost({});
  const consumer = createExtensionConsumerQueries(host, "emitter");

  host.finalizeSemantics();
  assert.throws(
    () => consumer.mustSelectedTargetCall(call, "emitting provider-owned call"),
    /requires extension fact 'tsts\.target-bindings:selectedTargetSignature'/,
  );
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.requiredFactMissing);

  const satisfiedHost = new ExtensionHost({});
  satisfiedHost.facts.set(call, selectedTargetSignatureFactKey, selectedTargetCallFact("Acme.Console.WriteLine(Acme.Int32)"));
  satisfiedHost.finalizeSemantics();
  assert.equal(createExtensionConsumerQueries(satisfiedHost, "emitter").mustSelectedTargetCall(call).member.id, "Acme.Console.WriteLine(Acme.Int32)");
});

test("lifecycle hook failures are diagnostics with extension identity", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("bad-extension", {
        initialize: (context) => {
          context.registerLifecycleHook(ExtensionLifecycleEvent.afterSourceFileBound, () => {
            throw new Error("boom");
          });
        },
      }),
    ],
  });

  host.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
    sourceFile: {},
    fileName: "/src/index.ts",
  });

  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.lifecycleHookFailed);
  assert.equal(host.diagnostics.all()[0]?.extensionId, "tsts.extension-host");
});

test("observation hook failures are diagnostics and do not crash the compiler host", () => {
  const source = {};
  const constraint = { kind: "implements", contract: "Acme.FailingConstraint" } as const;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("bad-observation-extension", {
        observationOwners: [ExtensionObservationPoint.validateTargetConstraint],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => {
            throw new Error("boom");
          });
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source,
    constraint,
  }, () => false, { requireOwner: true });

  assert.equal(result.kind, "reject");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationHookFailed);
  assert.equal(host.diagnostics.all()[0]?.extensionId, "tsts.extension-host");
});

test("diagnostics are deduplicated by stable identity", () => {
  const host = new ExtensionHost({});

  host.requireObservationOwner(ExtensionObservationPoint.mapCheckedCall);
  host.requireObservationOwner(ExtensionObservationPoint.mapCheckedCall);

  const ownerMissingDiagnostics = host.diagnostics.all().filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.observationOwnerMissing);
  assert.equal(ownerMissingDiagnostics.length, 1);
});

test("target constraint and post-check assignability observations use owner hooks instead of core fallback", () => {
  const intType = {};
  const longType = {};
  const stringType = {};
  const searchValuesConstraint = { kind: "implements", contract: "Acme.IEquatable`1" } as const;
  let coreCalled = false;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("source", {
        initialize: (context) => {
          context.facts.set(intType, sourcePrimitiveFactKey, {
            kind: "int32",
            signed: true,
            width: 32,
            runtimeBase: "number",
          });
        },
      }),
      extension("acme", {
        dependsOn: ["source"],
        observationOwners: [ExtensionObservationPoint.validateTargetConstraint, ExtensionObservationPoint.observePostCheckAssignability],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, (request) => {
            if (request.source === intType && request.constraint === searchValuesConstraint) {
              return acceptObservation(true, [{ message: "int32 maps to Acme.Int32 and implements IEquatable<Acme.Int32>" }]);
            }
            return deferObservation;
          });
          context.registerObservation(ExtensionObservationPoint.observePostCheckAssignability, (request) => {
            if (request.source === intType && request.target === longType) {
              return acceptObservation(undefined);
            }
            return rejectObservation<void>(diagnostic("acme", "ASSIGNABILITY_REJECTED", 9100001, "source type is not assignable to target type"));
          });
        },
      }),
    ],
  });

  const constraintResult = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source: intType,
    constraint: searchValuesConstraint,
    target: "acme",
  }, () => {
    coreCalled = true;
    return false;
  }, { requireOwner: true });

  assert.equal(constraintResult.kind, "accept");
  assert.equal(constraintResult.kind === "accept" ? constraintResult.value : false, true);
  assert.equal(coreCalled, false);

  const assignabilityResult = host.runObservation(ExtensionObservationPoint.observePostCheckAssignability, {
    source: intType,
    target: stringType,
    relation: "assignment",
  }, () => undefined, { requireOwner: true });

  assert.equal(assignabilityResult.kind, "reject");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "ASSIGNABILITY_REJECTED");
});

test("required extension-owned observations cannot fall back when owner is absent or deferred", () => {
  const missingOwnerHost = new ExtensionHost({});
  const source = {};
  const constraint = { kind: "implements", contract: "Acme.RequiredConstraint" } as const;
  const missing = missingOwnerHost.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source,
    constraint,
  }, () => false, { requireOwner: true });

  assert.equal(missing.kind, "missing-owner");
  assert.equal(missingOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationOwnerMissing);

  const deferredOwnerHost = new ExtensionHost({}, {
    extensions: [
      extension("acme", {
        observationOwners: [ExtensionObservationPoint.validateTargetConstraint],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => deferObservation);
        },
      }),
    ],
  });
  const deferred = deferredOwnerHost.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
    source,
    constraint,
  }, () => false, { requireOwner: true });

  assert.equal(deferred.kind, "owner-deferred");
  assert.equal(deferredOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationOwnerDeferred);
});

test("unowned multiple extension observations produce deterministic conflict", () => {
  const source = {};
  const constraint = { kind: "implements", contract: "Acme.ConflictingConstraint" } as const;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("a", {
        initialize: (context) => context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => acceptObservation(true)),
      }),
      extension("b", {
        initialize: (context) => context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => acceptObservation(false)),
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, { source, constraint }, () => false);
  assert.equal(result.kind, "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationConflict);
});

test("owned multiple non-deferred observations produce deterministic conflict", () => {
  const source = {};
  const constraint = { kind: "implements", contract: "Acme.OwnedConflictingConstraint" } as const;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("owner", {
        observationOwners: [ExtensionObservationPoint.validateTargetConstraint],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => acceptObservation(true));
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => acceptObservation(false));
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, { source, constraint }, () => false, { requireOwner: true });
  assert.equal(result.kind, "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationConflict);
});

test("target extension composition requires explicit multi-target mode", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("acme", { composition: { kind: "target", target: "acme" } }),
      extension("borrow", { composition: { kind: "target", target: "borrow" } }),
    ],
  });

  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.multipleTargetExtensions);

  const multiTargetHost = new ExtensionHost({}, {
    allowMultipleTargets: true,
    extensions: [
      extension("acme", { composition: { kind: "target", target: "acme" } }),
      extension("borrow", { composition: { kind: "target", target: "borrow" } }),
    ],
  });

  assert.equal(multiTargetHost.diagnostics.hasErrors(), false);
});

test("checked call mapping records selected target signature facts", () => {
  const call = {};
  const callee = {};
  const argument = {};
  const writeLineInt = selectedSignature("Acme.Console.WriteLine(Acme.Int32)");
  const argumentConversions = [argumentConversionSlot(0)] as const;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("acme", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, (request) => {
            if (request.call === call) {
              context.facts.set(request.call, selectedTargetSignatureFactKey, {
                ...writeLineInt,
                argumentConversions,
              });
              return acceptObservation({
                kind: "target",
                selectedSignature: writeLineInt,
                argumentConversions,
              });
            }
            return deferObservation;
          });
        },
      }),
    ],
  });

  const result = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [argument],
    target: "acme",
  }, () => ({ kind: "source" }), ignoreCheckedOperationAcceptance, { requireOwner: true });

  assert.equal(result.kind, "accept");
  assert.equal(host.facts.get(call, selectedTargetSignatureFactKey)?.member.id, "Acme.Console.WriteLine(Acme.Int32)");
});

test("property, element, and operator observations expose target operations", () => {
  const lengthExpression = {};
  const indexExpression = {};
  const addExpression = {};
  const arrayType = {};
  const indexArgument = {};
  const leftOperand = {};
  const rightOperand = {};
  const int32Type = { kind: "source-primitive", name: "int32" } satisfies TargetTypeRef;
  const elementType = { kind: "target-named", id: "Acme.Element" } satisfies TargetTypeRef;
  const host = new ExtensionHost({}, {
    extensions: [
      extension("surface", {
        observationOwners: [
          ExtensionObservationPoint.mapCheckedPropertyAccess,
          ExtensionObservationPoint.mapCheckedElementAccess,
          ExtensionObservationPoint.mapCheckedOperator,
        ],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedPropertyAccess, (request) => {
            const operation = targetOperation("Acme.Array.Length", "property");
            context.facts.set(request.expression, targetOperationFactKey, operation);
            return acceptObservation({ operation, resultType: int32Type });
          });
          context.registerObservation(ExtensionObservationPoint.mapCheckedElementAccess, (request) => {
            const operation = targetOperation("Acme.Array.Get", "indexer");
            context.facts.set(request.expression, targetOperationFactKey, operation);
            return acceptObservation({ operation, resultType: elementType });
          });
          context.registerObservation(ExtensionObservationPoint.mapCheckedOperator, (request) => {
            const operation = targetOperation("Acme.Int32.op_Addition", "operator");
            context.facts.set(request.expression, targetOperationFactKey, operation);
            return acceptObservation({ operation, resultType: int32Type });
          });
        },
      }),
    ],
  });

  assert.equal(host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    { expression: lengthExpression, receiver: arrayType, propertyName: "Length" },
    () => ({ operation: targetOperation("core", "property") }),
    ignoreCheckedOperationAcceptance,
    { requireOwner: true },
  ).kind, "accept");
  assert.equal(host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedElementAccess,
    { expression: indexExpression, receiver: arrayType, argument: indexArgument },
    () => ({ operation: targetOperation("core", "indexer") }),
    ignoreCheckedOperationAcceptance,
    { requireOwner: true },
  ).kind, "accept");
  assert.equal(host[extensionHostRunCheckedOperation](
    ExtensionObservationPoint.mapCheckedOperator,
    { expression: addExpression, operator: "+", left: leftOperand, right: rightOperand },
    () => ({ operation: targetOperation("core", "operator") }),
    ignoreCheckedOperationAcceptance,
    { requireOwner: true },
  ).kind, "accept");

  assert.equal(host.facts.get(lengthExpression, targetOperationFactKey)?.operationId, "Acme.Array.Length");
  assert.equal(host.facts.get(indexExpression, targetOperationFactKey)?.operationId, "Acme.Array.Get");
  assert.equal(host.facts.get(addExpression, targetOperationFactKey)?.operationId, "Acme.Int32.op_Addition");
});

test("contextual target type observations preserve target facts", () => {
  const lambda = {};
  const delegateType = {};
  const coreType = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("target", {
        observationOwners: [ExtensionObservationPoint.recordContextualTargetType],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.recordContextualTargetType, (request) => acceptObservation({
            type: delegateType,
            targetType: { kind: "target-named", id: "Acme.Func`2" },
          }));
        },
      }),
    ],
  });

  const contextual = host.runObservation(ExtensionObservationPoint.recordContextualTargetType, { expression: lambda, context: delegateType }, () => ({ type: coreType }), { requireOwner: true });
  assert.ok(contextual.kind === "accept" && contextual.value.type === delegateType, "Contextual target observations must retain the exact selected source type.");
});

test("flow validation supports local rejection and target compiler validation facts", () => {
  const movedUse = {};
  const returnedBorrow = {};
  const movedSymbol = {};
  const borrowSymbol = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("borrow", {
        observationOwners: [ExtensionObservationPoint.validateExtensionFlowUse],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.validateExtensionFlowUse, (request) => {
            if (request.useSite === movedUse) {
              context.facts.set(request.useSite, flowStateFactKey, { state: "moved" });
              return rejectObservation(diagnostic("borrow", "VALUE_WAS_MOVED", 9100101, "value was moved and cannot be used here"));
            }
            if (request.useSite === returnedBorrow) {
              context.facts.set(request.useSite, flowStateFactKey, {
                state: "target-validation-required",
                targetCompiler: "acme-checker",
              });
              return acceptObservation({
                valid: true,
                targetCompilerValidationRequired: true,
                targetCompiler: "acme-checker",
              });
            }
            return deferObservation;
          });
        },
      }),
    ],
  });

  const rejected = host.runObservation(ExtensionObservationPoint.validateExtensionFlowUse, { useSite: movedUse, symbol: movedSymbol, mode: "read", target: "borrow" }, () => ({ valid: true }), { requireOwner: true });
  assert.equal(rejected.kind, "reject");
  assert.equal(host.facts.get(movedUse, flowStateFactKey)?.state, "moved");

  const accepted = host.runObservation(ExtensionObservationPoint.validateExtensionFlowUse, { useSite: returnedBorrow, symbol: borrowSymbol, mode: "read", target: "borrow" }, () => ({ valid: false }), { requireOwner: true });
  assert.equal(accepted.kind === "accept" ? accepted.value.targetCompiler : undefined, "acme-checker");
  assert.equal(host.facts.get(returnedBorrow, flowStateFactKey)?.targetCompiler, "acme-checker");
});

test("advanced associated-type and const-generic facts are first-class", () => {
  const iteratorType = {};
  const itemType = {};
  const fixedBytesType = {};
  const host = new ExtensionHost({});

  assert.equal(host.facts.set(iteratorType, associatedTypeFactKey, {
    owner: iteratorType,
    name: "Item",
    value: itemType,
  }), "inserted");
  assert.equal(host.facts.set(fixedBytesType, constGenericFactKey, {
    name: "N",
    value: 32,
  }), "inserted");

  assert.equal(host.facts.get(iteratorType, associatedTypeFactKey)?.value, itemType);
  assert.equal(host.facts.get(fixedBytesType, constGenericFactKey)?.value, 32);
});

test("target binding facts preserve provider identity and constraints", () => {
  const searchValues = {};
  const fact: TargetBindingFact = {
    id: "Acme.Buffers.SearchValues`1",
    sourceName: "SearchValues",
    targetName: "Acme.Buffers.SearchValues`1",
    target: "acme",
    kind: "struct",
    typeParameters: [{
      name: "T",
      constraints: [{
        kind: "implements",
        contract: "Acme.IEquatable`1",
        typeArguments: [{ kind: "type-parameter", name: "T" }],
      }],
    }],
  };
  const host = new ExtensionHost({});

  assert.equal(host.facts.set(searchValues, targetBindingFactKey, fact), "inserted");
  assert.equal(host.facts.get(searchValues, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0]?.kind, "implements");
});

test("provider registrations seal after first resolution observation or lifecycle execution", () => {
  const executions: readonly {
    readonly name: string;
    readonly execute: (host: ExtensionHost) => void;
  }[] = [{
    name: "resolution",
    execute: (host) => {
      assert.equal(host.providers.resolveVirtualModule("@target/registration-seal-probe.js").kind, "unowned");
    },
  }, {
    name: "observation",
    execute: (host) => {
      const result = host.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
        source: {},
        constraint: { kind: "implements", contract: "Acme.RegistrationSeal" },
      }, () => false);
      assert.equal(result.kind, "core");
    },
  }, {
    name: "lifecycle",
    execute: (host) => {
      host.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
        sourceFile: {},
        fileName: "/src/registration-seal.ts",
      });
    },
  }];

  for (const execution of executions) {
    let registerBinding!: (provider: TargetBindingProvider) => boolean;
    let registerSemantic!: (provider: TargetSemanticProvider) => boolean;
    const extensionId = `registration-seal-${execution.name}`;
    const host = new ExtensionHost({}, {
      extensions: [extension(extensionId, {
        initialize: (context) => {
          registerBinding = context.registerTargetBindingProvider;
          registerSemantic = context.registerTargetSemanticProvider;
        },
      })],
    });

    execution.execute(host);

    assert.equal(registerBinding(acmeBindingProvider(`@target/late-${execution.name}.js`, {
      id: `late-binding-${execution.name}`,
    })), false, execution.name);
    assert.equal(registerSemantic({
      identity: providerIdentity(`late-semantic-${execution.name}`, "demo", "semantic"),
    }), false, execution.name);
    const closed = host.diagnostics.all().filter((item) => item.numericCode === ExtensionHostDiagnosticCode.registrationClosed);
    assert.equal(closed.length, 2, execution.name);
    assert.ok(closed.every((item) => item.extensionId === "tsts.extension-host"), execution.name);
  }
});

test("hook registration during dispatch is rejected without extending live or future iteration", () => {
  let observationCalls = 0;
  let injectedObservationCalls = 0;
  const constraint = { kind: "implements", contract: "Acme.DispatchRegistration" } as const;
  const observationHost = new ExtensionHost({}, {
    extensions: [extension("dispatch-observation-registration", {
      initialize: (context) => {
        context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => {
          observationCalls += 1;
          context.registerObservation(ExtensionObservationPoint.validateTargetConstraint, () => {
            injectedObservationCalls += 1;
            return acceptObservation(false);
          });
          return acceptObservation(true);
        });
      },
    })],
  });

  for (let index = 0; index < 2; index++) {
    const result = observationHost.runObservation(ExtensionObservationPoint.validateTargetConstraint, {
      source: {},
      constraint,
    }, () => false);
    assert.equal(result.kind, "accept");
  }
  assert.equal(observationCalls, 2);
  assert.equal(injectedObservationCalls, 0);
  assert.equal(observationHost.diagnostics.all().filter((item) => item.numericCode === ExtensionHostDiagnosticCode.registrationClosed).length, 1);

  let lifecycleCalls = 0;
  let injectedLifecycleCalls = 0;
  const lifecycleHost = new ExtensionHost({}, {
    extensions: [extension("dispatch-lifecycle-registration", {
      initialize: (context) => {
        context.registerLifecycleHook(ExtensionLifecycleEvent.afterSourceFileBound, () => {
          lifecycleCalls += 1;
          context.registerLifecycleHook(ExtensionLifecycleEvent.afterSourceFileBound, () => {
            injectedLifecycleCalls += 1;
          });
        });
      },
    })],
  });

  for (let index = 0; index < 2; index++) {
    lifecycleHost.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
      sourceFile: {},
      fileName: `/src/dispatch-${index}.ts`,
    });
  }
  assert.equal(lifecycleCalls, 2);
  assert.equal(injectedLifecycleCalls, 0);
  assert.equal(lifecycleHost.diagnostics.all().filter((item) => item.numericCode === ExtensionHostDiagnosticCode.registrationClosed).length, 1);
});

test("malformed ownership callback envelopes fail closed without invoking later provider stages", () => {
  const cases: readonly {
    readonly name: string;
    readonly value: () => object | null;
  }[] = [{
    name: "null",
    value: () => null,
  }, {
    name: "missing-kind",
    value: () => ({}),
  }, {
    name: "typo-kind",
    value: () => ({ kind: "onwed" }),
  }, {
    name: "revoked-envelope",
    value: () => {
      const revocable = Proxy.revocable({}, {});
      revocable.revoke();
      return revocable.proxy;
    },
  }];

  for (const entry of cases) {
    const specifier = `@target/ownership-${entry.name}.js`;
    let resolveCalls = 0;
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    assert.equal(host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`ownership-${entry.name}-provider`, "demo", "binding"),
      ownsModule: () => entry.value() as never,
      resolveModule: (moduleSpecifier) => {
        resolveCalls += 1;
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: `tsts-provider://ownership/${entry.name}`,
          providerModuleId: `ownership.${entry.name}`,
        };
      },
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [],
        };
      },
    }), true, entry.name);

    assert.doesNotThrow(() => {
      assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected", entry.name);
    });
    assert.equal(resolveCalls, 0, entry.name);
    assert.equal(declarationCalls, 0, entry.name);
    assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_CALLBACK_RESULT", entry.name);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("unowned and rejected ownership outcomes are cached before stateful callbacks can transition", () => {
  for (const outcome of ["unowned", "rejected"] as const) {
    const specifier = `@target/stateful-${outcome}.js`;
    const providerId = `stateful-${outcome}-provider`;
    const rejectedDiagnostic = diagnostic(providerId, "STATEFUL_OWNERSHIP_REJECTED", 9100101, "first ownership decision rejects");
    let ownershipCalls = 0;
    let resolveCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(providerId, "demo", "binding"),
      ownsModule: () => {
        ownershipCalls += 1;
        if (ownershipCalls === 1) {
          return outcome === "unowned"
            ? { kind: "unowned" }
            : { kind: "reject", diagnostic: rejectedDiagnostic };
        }
        return { kind: "owned" };
      },
      resolveModule: (moduleSpecifier) => {
        resolveCalls += 1;
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: `tsts-provider://stateful/${outcome}`,
          providerModuleId: `stateful.${outcome}`,
        };
      },
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [],
      }),
    });

    const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(first.kind, outcome, outcome);
    assert.equal(second, first, outcome);
    assert.equal(ownershipCalls, 1, outcome);
    assert.equal(resolveCalls, 0, outcome);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], outcome);
  }
});

test("semantic provider identity and handlers are snapshotted before caller mutation", () => {
  const providerId = "semantic-snapshot-provider";
  const mutableIdentity = providerIdentity(providerId, "demo", "semantic");
  let identityReads = 0;
  Object.defineProperty(mutableIdentity, "id", {
    configurable: true,
    enumerable: true,
    get: () => {
      identityReads += 1;
      return providerId;
    },
  });
  let handlerReads = 0;
  let originalHandlerCalls = 0;
  let replacementHandlerCalls = 0;
  const originalHandler: NonNullable<TargetSemanticProvider["mapCheckedCall"]> = () => {
    originalHandlerCalls += 1;
    return acceptObservation({
      kind: "target",
      selectedSignature: selectedSignature("original-semantic-handler"),
      argumentConversions: [],
    });
  };
  const semanticProvider: TargetSemanticProvider = {
    identity: mutableIdentity,
    get mapCheckedCall() {
      handlerReads += 1;
      return originalHandler;
    },
  };
  const host = new ExtensionHost({}, {
    extensions: [extension("semantic-snapshot-extension", {
      observationOwners: [ExtensionObservationPoint.mapCheckedCall],
      initialize: (context) => {
        assert.equal(context.registerTargetSemanticProvider(semanticProvider), true);
      },
    })],
  });
  assert.equal(identityReads, 1);
  assert.equal(handlerReads, 1);

  Object.defineProperty(mutableIdentity, "id", { configurable: true, enumerable: true, value: "mutated-semantic-provider" });
  Object.defineProperty(semanticProvider, "mapCheckedCall", {
    configurable: true,
    value: () => {
      replacementHandlerCalls += 1;
      return acceptObservation({
        kind: "target",
        selectedSignature: selectedSignature("replacement-semantic-handler"),
        argumentConversions: [],
      });
    },
  });
  assert.equal(host.providers.registerTargetSemanticProvider({
    identity: providerIdentity(providerId, "demo", "semantic"),
  }), false);
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.duplicateProvider);

  const result = host[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
    call: {},
    callee: {},
    arguments: [],
  }, () => ({ kind: "source" }), ignoreCheckedOperationAcceptance, { requireOwner: true });
  assert.equal(result.kind, "accept");
  assert.equal(result.kind === "accept" && result.value.kind === "target" ? result.value.selectedSignature.member.id : undefined, "original-semantic-handler");
  assert.equal(originalHandlerCalls, 1);
  assert.equal(replacementHandlerCalls, 0);
  assert.equal(identityReads, 1);
  assert.equal(handlerReads, 1);
});

test("semantic provider registration getters and callback envelopes fail as host diagnostics", () => {
  const getterCases: readonly {
    readonly name: string;
    readonly provider: () => TargetSemanticProvider;
  }[] = [{
    name: "identity-getter",
    provider: () => ({
      get identity(): TargetSemanticProvider["identity"] {
        throw new Error("semantic identity unavailable");
      },
    }),
  }, {
    name: "handler-getter",
    provider: () => ({
      identity: providerIdentity("semantic-handler-getter-provider", "demo", "semantic"),
      get mapCheckedCall(): NonNullable<TargetSemanticProvider["mapCheckedCall"]> {
        throw new Error("semantic handler unavailable");
      },
    }),
  }];

  for (const entry of getterCases) {
    let registrationResult = true;
    let host: ExtensionHost | undefined;
    assert.doesNotThrow(() => {
      host = new ExtensionHost({}, {
        extensions: [extension(`semantic-${entry.name}-extension`, {
          initialize: (context) => {
            registrationResult = context.registerTargetSemanticProvider(entry.provider());
          },
        })],
      });
    });
    assert.equal(registrationResult, false, entry.name);
    assert.equal(host?.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProvider, entry.name);
    assert.equal(host?.diagnostics.all().at(-1)?.extensionId, "tsts.extension-host", entry.name);
  }

  let envelopeKindReads = 0;
  const hostileEnvelope = {};
  Object.defineProperty(hostileEnvelope, "kind", {
    get: () => {
      envelopeKindReads += 1;
      throw new Error("semantic envelope kind unavailable");
    },
  });
  const envelopeHost = new ExtensionHost({}, {
    extensions: [extension("semantic-envelope-extension", {
      observationOwners: [ExtensionObservationPoint.mapCheckedCall],
      initialize: (context) => {
        assert.equal(context.registerTargetSemanticProvider({
          identity: providerIdentity("semantic-envelope-provider", "demo", "semantic"),
          mapCheckedCall: () => hostileEnvelope as never,
        }), true);
      },
    })],
  });
  assert.doesNotThrow(() => {
    const result = envelopeHost[extensionHostRunCheckedOperation](ExtensionObservationPoint.mapCheckedCall, {
      call: {},
      callee: {},
      arguments: [],
    }, () => ({ kind: "source" }), ignoreCheckedOperationAcceptance, { requireOwner: true });
    assert.equal(result.kind, "reject");
  });
  assert.equal(envelopeKindReads, 1);
  assert.equal(envelopeHost.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.observationHookFailed);
  assert.equal(envelopeHost.diagnostics.all().at(-1)?.extensionId, "tsts.extension-host");
});

test("provider public-module identity drift across import slices is rejected transactionally", () => {
  const specifier = "@target/public-identity-drift.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("public-identity-drift-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      const requestedExport = context.importSlice?.requestedExports?.[0]?.exportedName ?? "First";
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://public-identity-drift/${requestedExport}`,
        providerModuleId: `public.identity.${requestedExport}`,
      };
    },
    getDeclarationModel: (resolution) => {
      const exportName = resolution.providerModuleId.endsWith("Second") ? "Second" : "First";
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{ id: exportName, name: exportName, kind: "interface", members: [] }],
      };
    },
  });
  const slice = (exportedName: string): ProviderModuleContext => ({
    activeTarget: "demo",
    resolutionMode: "import",
    importSlice: {
      moduleSpecifier: specifier,
      kind: "named",
      requestedExports: [{ exportedName, kind: "type" }],
      typeOnly: true,
    },
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, slice("First")).kind, "resolved");
  const documentsBeforeDrift = host.providers.getVirtualDeclarationDocuments();
  const drifted = host.providers.resolveVirtualModule(specifier, slice("Second"));
  assert.equal(drifted.kind, "rejected");
  assert.match(host.diagnostics.all().at(-1)?.message ?? "", /multiple identities for public module/);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), documentsBeforeDrift);
});

test("host-owned provider URIs reject direct requests imports and provider references", () => {
  const reservedUris = [
    `${providerVirtualInternalRoot}reserved-direct.d.ts`,
    "tsts-provider://tsts-public/reserved-direct.d.ts",
  ];
  for (const reservedUri of reservedUris) {
    let ownershipCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`reserved-direct-${ownershipCalls}-${reservedUri.length}`, "demo", "binding"),
      ownsModule: () => {
        ownershipCalls += 1;
        return { kind: "owned" };
      },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://provider/reserved-direct",
        providerModuleId: "reserved.direct",
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [],
      }),
    });

    assert.equal(host.providers.resolveVirtualModule(reservedUri, { activeTarget: "demo" }).kind, "rejected");
    assert.equal(ownershipCalls, 0);
    assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "PROVIDER_RESERVED_MODULE_SPECIFIER");
  }

  const reservedDependency = `${providerVirtualInternalRoot}reserved-dependency.d.ts`;
  for (const boundary of ["import", "provider-ref"] as const) {
    const specifier = `@target/reserved-${boundary}.js`;
    const ownershipSpecifiers: string[] = [];
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`reserved-${boundary}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => {
        ownershipSpecifiers.push(moduleSpecifier);
        return moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" };
      },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://reserved-${boundary}/model`,
        providerModuleId: `reserved.${boundary}`,
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        ...(boundary === "import"
          ? {
            imports: [{
              moduleSpecifier: reservedDependency,
              namedImports: [{ exportedName: "Reserved" }],
              typeOnly: true,
            }],
          }
          : {}),
        exports: [{
          id: "Value",
          name: "Value",
          kind: "type",
          type: boundary === "provider-ref"
            ? { kind: "provider-ref", moduleSpecifier: reservedDependency, exportName: "Reserved" }
            : { kind: "number" },
        }],
      }),
    });

    assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected", boundary);
    assert.deepEqual(ownershipSpecifiers, [specifier], boundary);
    assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration, boundary);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], boundary);
  }
});

test("hostile evidence accessors and iterators are rejected without execution", () => {
  const cases: readonly {
    readonly name: string;
    readonly create: () => {
      readonly evidence: readonly ExtensionEvidence[];
      readonly invocationCount: () => number;
    };
  }[] = [{
    name: "array-index-getter",
    create: () => {
      let invocations = 0;
      const evidence: ExtensionEvidence[] = [];
      Object.defineProperty(evidence, "0", {
        enumerable: true,
        get: () => {
          invocations += 1;
          throw new Error("evidence entry getter executed");
        },
      });
      return { evidence, invocationCount: () => invocations };
    },
  }, {
    name: "details-getter",
    create: () => {
      let invocations = 0;
      const details = {};
      Object.defineProperty(details, "secret", {
        enumerable: true,
        get: () => {
          invocations += 1;
          throw new Error("evidence details getter executed");
        },
      });
      return {
        evidence: [{ message: "hostile details", details }],
        invocationCount: () => invocations,
      };
    },
  }, {
    name: "array-iterator",
    create: () => {
      let invocations = 0;
      const evidence: ExtensionEvidence[] = [{ message: "hostile iterator" }];
      Object.defineProperty(evidence, Symbol.iterator, {
        configurable: true,
        value: () => {
          invocations += 1;
          throw new Error("evidence iterator executed");
        },
      });
      return { evidence, invocationCount: () => invocations };
    },
  }];

  for (const entry of cases) {
    const specifier = `@target/evidence-${entry.name}.js`;
    const hostile = entry.create();
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`evidence-${entry.name}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://evidence/${entry.name}`,
        providerModuleId: `evidence.${entry.name}`,
        evidence: hostile.evidence,
      }),
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [],
        };
      },
    });

    assert.doesNotThrow(() => {
      assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "rejected", entry.name);
    });
    assert.equal(hostile.invocationCount(), 0, entry.name);
    assert.equal(declarationCalls, 0, entry.name);
    assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_RESOLUTION", entry.name);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("non-string config hashes and hostile context arrays or proxies fail closed", () => {
  let configHashCoercions = 0;
  const hostileConfigHash = {
    toString: () => {
      configHashCoercions += 1;
      throw new Error("configHash was coerced");
    },
  };
  const configHost = new ExtensionHost({});
  assert.doesNotThrow(() => {
    assert.equal(configHost.providers.registerTargetBindingProvider({
      ...acmeBindingProvider("@target/invalid-config-hash.js", { id: "invalid-config-hash-provider" }),
      identity: {
        ...providerIdentity("invalid-config-hash-provider", "demo", "binding"),
        configHash: hostileConfigHash as never,
      },
    }), false);
  });
  assert.equal(configHashCoercions, 0);
  assert.equal(configHost.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.invalidProvider);

  const contextCases: readonly {
    readonly name: string;
    readonly context: (specifier: string) => ProviderModuleContext;
  }[] = [{
    name: "array-like-object",
    context: (specifier) => ({
      importSlice: {
        moduleSpecifier: specifier,
        kind: "named",
        requestedExports: { 0: { exportedName: "Value" }, length: 1 } as never,
      },
    }),
  }, {
    name: "revoked-array-proxy",
    context: (specifier) => {
      const revocable = Proxy.revocable<ProviderRequestedExport[]>([{ exportedName: "Value" }], {});
      revocable.revoke();
      return {
        importSlice: {
          moduleSpecifier: specifier,
          kind: "named",
          requestedExports: revocable.proxy,
        },
      };
    },
  }, {
    name: "revoked-entry-proxy",
    context: (specifier) => {
      const revocable = Proxy.revocable<ProviderRequestedExport>({ exportedName: "Value" }, {});
      revocable.revoke();
      return {
        importSlice: {
          moduleSpecifier: specifier,
          kind: "named",
          requestedExports: [revocable.proxy],
        },
      };
    },
  }];

  for (const entry of contextCases) {
    const specifier = `@target/context-${entry.name}.js`;
    let ownershipCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`context-${entry.name}-provider`, "demo", "binding"),
      ownsModule: () => {
        ownershipCalls += 1;
        return { kind: "owned" };
      },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://context/${entry.name}`,
        providerModuleId: `context.${entry.name}`,
      }),
      getDeclarationModel: (resolution) => ({
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [],
      }),
    });

    assert.doesNotThrow(() => {
      assert.equal(host.providers.resolveVirtualModule(specifier, entry.context(specifier)).kind, "rejected", entry.name);
    });
    assert.equal(ownershipCalls, 0, entry.name);
    assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "INVALID_PROVIDER_MODULE_CONTEXT", entry.name);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("provider host resolves bounded SDK-scale declaration models above ancillary limits", () => {
  const specifier = "@target/sdk-scale-model.js";
  const documentation = "d".repeat(16_384);
  const exports = Array.from({ length: 48 }, (_, index): ProviderExportDeclaration => ({
    id: `Documented${index}`,
    name: `Documented${index}`,
    kind: "class",
    documentation,
    members: [],
  }));
  let resolutionCalls = 0;
  let declarationCalls = 0;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("sdk-scale-model-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => {
      resolutionCalls += 1;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://sdk-scale/model",
        providerModuleId: "sdk.scale.model",
      };
    },
    getDeclarationModel: (resolution) => {
      declarationCalls += 1;
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports,
      };
    },
  });

  const first = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(first.kind, "resolved");
  assert.equal(resolutionCalls, 1);
  assert.equal(declarationCalls, 1);
  const documents = host.providers.getVirtualDeclarationDocuments();
  assert.equal(documents.length, 1);
  assert.match(documents[0]?.sourceText ?? "", /as Documented47 \};/);
  const ownerDocuments = getCanonicalExportOwnerDocuments(host);
  assert.equal(ownerDocuments.length, exports.length);
  assert.equal(host.diagnostics.hasErrors(), false);
  const second = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(second, first);
  assert.equal(resolutionCalls, 1);
  assert.equal(declarationCalls, 1);
});

test("canonical export owner models share declarations from one canonical candidate graph", () => {
  const specifier = "@target/canonical-owner-views.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("canonical-owner-view-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://canonical-owner-views/model",
      providerModuleId: "canonical.owner.views",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: ["First", "Second", "Third"].map((name) => ({
        id: name,
        name,
        kind: "class" as const,
        members: [],
      })),
    }),
  });

  assert.equal(host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" }).kind, "resolved");
  const publicDocument = host.providers.getVirtualDeclarationDocuments().find((document) =>
    document.moduleSpecifier === specifier);
  assert.ok(publicDocument !== undefined);
  const canonicalDeclarationsById = new Map(
    publicDocument.declarationModel.exports.map((declaration) => [declaration.id, declaration]),
  );
  const ownerDocuments = getCanonicalExportOwnerDocuments(host);
  assert.equal(ownerDocuments.length, 3);
  for (const ownerDocument of ownerDocuments) {
    assert.equal(ownerDocument.declarationModel.exports.length, 1);
    const declaration = ownerDocument.declarationModel.exports[0]!;
    assert.equal(declaration, canonicalDeclarationsById.get(declaration.id));
    assert.equal(Object.isFrozen(ownerDocument.declarationModel), true);
    assert.equal(Object.isFrozen(ownerDocument.declarationModel.exports), true);
  }
});

function assertNeutralProviderChainResolvesInEitherOrder(options: {
  readonly name: string;
  readonly moduleCount: number;
  readonly evidence?: () => readonly ExtensionEvidence[];
  readonly payloadType?: ProviderTypeExpression;
}): void {
  const specifiers = Array.from({ length: options.moduleCount }, (_, index) => `@target/${options.name}-${index}.js`);
  const indexBySpecifier = new Map(specifiers.map((specifier, index) => [specifier, index] as const));
  const createHost = () => {
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`neutral-${options.name}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => indexBySpecifier.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => ({
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://neutral-${options.name}/${indexBySpecifier.get(moduleSpecifier)!}`,
        providerModuleId: `neutral.${options.name}.${indexBySpecifier.get(moduleSpecifier)!}`,
      }),
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        const index = indexBySpecifier.get(resolution.moduleSpecifier)!;
        const nextSpecifier = specifiers[index + 1];
        const members: ProviderMemberDeclaration[] = [
          ...(options.payloadType === undefined
            ? []
            : [{
              id: `Node${index}.payload`,
              name: "payload",
              kind: "property" as const,
              type: options.payloadType,
            }]),
          ...(nextSpecifier === undefined
            ? []
            : [{
              id: `Node${index}.next`,
              name: "next",
              kind: "property" as const,
              type: {
                kind: "provider-ref" as const,
                moduleSpecifier: nextSpecifier,
                exportName: "Node",
              },
            }]),
        ];
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          ...(options.evidence === undefined ? {} : { evidence: options.evidence() }),
          ...(nextSpecifier === undefined
            ? {}
            : {
              imports: [{
                moduleSpecifier: nextSpecifier,
                namedImports: [{ exportedName: "Node" }],
                typeOnly: true,
              }],
            }),
          exports: [{
            id: `Node${index}`,
            name: "Node",
            kind: "interface" as const,
            members,
          }],
        };
      },
    });
    return { host, declarationCalls: () => declarationCalls };
  };

  const direct = createHost();
  const directResult = direct.host.providers.resolveVirtualModule(specifiers[0]!, { activeTarget: "demo" });
  assert.equal(directResult.kind, "resolved");
  assert.equal(direct.declarationCalls(), options.moduleCount);
  assert.equal(direct.host.diagnostics.hasErrors(), false);

  const dependencyFirst = createHost();
  assert.equal(dependencyFirst.host.providers.resolveVirtualModule(specifiers.at(-1)!, { activeTarget: "demo" }).kind, "resolved");
  const dependencyFirstResult = dependencyFirst.host.providers.resolveVirtualModule(specifiers[0]!, { activeTarget: "demo" });
  assert.equal(dependencyFirstResult.kind, "resolved");
  assert.equal(dependencyFirst.host.diagnostics.hasErrors(), false);
  assert.equal(
    dependencyFirstResult.kind === "resolved" ? dependencyFirstResult.module.artifact.sourceText : undefined,
    directResult.kind === "resolved" ? directResult.module.artifact.sourceText : undefined,
  );
}

test("provider closure accepts the complete framework-scale input-entry profile in either resolution order", () => {
  const measuredInputEntries = 4_024_403;
  const evidenceEntriesPerModule = 60_000;
  const moduleCount = Math.ceil(measuredInputEntries / evidenceEntriesPerModule);
  assert.ok(moduleCount * evidenceEntriesPerModule >= measuredInputEntries);
  assert.ok(moduleCount * evidenceEntriesPerModule < providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries);
  const evidencePayload = Array.from({ length: evidenceEntriesPerModule }, () => 1);
  assertNeutralProviderChainResolvesInEitherOrder({
    name: "input-entry-scale",
    moduleCount,
    evidence: () => [{ message: "bounded input entries", details: evidencePayload }],
  });
});

test("provider closure accepts the complete framework-scale input-scalar profile in either resolution order", () => {
  const measuredInputScalarCodeUnits = 232_199_844;
  const scalarPayload = "s".repeat(providerAncillaryDataLimits.maxStringCodeUnits - 6);
  const inputScalarCodeUnitsPerModule = 1 + 4 + 4 * scalarPayload.length;
  const moduleCount = Math.ceil(measuredInputScalarCodeUnits / inputScalarCodeUnitsPerModule);
  assert.ok(moduleCount * inputScalarCodeUnitsPerModule >= measuredInputScalarCodeUnits);
  assert.ok(moduleCount * inputScalarCodeUnitsPerModule < providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits);
  assertNeutralProviderChainResolvesInEitherOrder({
    name: "input-scalar-scale",
    moduleCount,
    evidence: () => [{
      message: "m",
      details: { a: scalarPayload, b: scalarPayload, c: scalarPayload, d: scalarPayload },
    }],
  });
});

test("provider closure accepts the complete framework-scale expanded-node profile in either resolution order", () => {
  const measuredExpandedNodes = 2_625_163;
  let sharedExpandedType: ProviderTypeExpression = { kind: "number" };
  const sharedDepth = 14;
  for (let depth = 0; depth < sharedDepth; depth++) {
    sharedExpandedType = { kind: "union", types: [sharedExpandedType, sharedExpandedType] };
  }
  const expandedNodesPerModule = 2 ** (sharedDepth + 1) - 1;
  const moduleCount = Math.ceil(measuredExpandedNodes / expandedNodesPerModule);
  assert.ok(moduleCount * expandedNodesPerModule >= measuredExpandedNodes);
  assert.ok(moduleCount * expandedNodesPerModule < providerDeclarationClosureLimits.maxExpandedSemanticNodeAndArrayEntries);
  assertNeutralProviderChainResolvesInEitherOrder({
    name: "expanded-node-scale",
    moduleCount,
    payloadType: sharedExpandedType,
  });
});

test("provider closure accepts the complete framework-scale expanded-scalar profile in either resolution order", () => {
  const measuredExpandedScalarCodeUnits = 232_240_749;
  const sharedScalarType: ProviderTypeExpression = {
    kind: "target-named",
    target: "neutral",
    id: "I".repeat(providerAncillaryDataLimits.maxStringCodeUnits),
    sourceShape: { kind: "string" },
  };
  const typesPerModule = 32;
  const expandedScalarCodeUnitsPerModule = typesPerModule * providerAncillaryDataLimits.maxStringCodeUnits;
  const moduleCount = Math.ceil(measuredExpandedScalarCodeUnits / expandedScalarCodeUnitsPerModule);
  assert.ok(moduleCount * expandedScalarCodeUnitsPerModule >= measuredExpandedScalarCodeUnits);
  assert.ok(moduleCount * expandedScalarCodeUnitsPerModule < providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits);
  assertNeutralProviderChainResolvesInEitherOrder({
    name: "expanded-scalar-scale",
    moduleCount,
    payloadType: {
      kind: "tuple",
      elementTypes: Array.from({ length: typesPerModule }, () => sharedScalarType),
    },
  });
});

test("provider closure enforces rendered declaration source limits transactionally", () => {
  const moduleCount = 18;
  const exportsPerModule = 56;
  const paddingExportNames = Array.from({ length: exportsPerModule - 1 }, (_, index) =>
    `Padding${index}_`.padEnd(65_000, "s"));
  const declarationScalarCodeUnits = moduleCount * paddingExportNames.reduce((total, name) => total + name.length, 0);
  assert.ok(declarationScalarCodeUnits < providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits);
  assert.ok(declarationScalarCodeUnits < providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits);
  assert.ok(declarationScalarCodeUnits + paddingExportNames.reduce((total, name) => total + name.length, 0)
    > providerDeclarationClosureLimits.maxDeclarationSourceCodeUnits);
  const specifiers = Array.from({ length: moduleCount }, (_, index) => `@target/source-budget-${index}.js`);
  const indexBySpecifier = new Map(specifiers.map((specifier, index) => [specifier, index] as const));
  const declarationCallsBySpecifier = new Map<string, number>();
  let leafDependencyContext: ProviderModuleContext | undefined;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("rendered-source-budget-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => indexBySpecifier.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      if (indexBySpecifier.get(moduleSpecifier) === moduleCount - 1 && leafDependencyContext === undefined) {
        leafDependencyContext = context;
      }
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://rendered-source-budget/${indexBySpecifier.get(moduleSpecifier)!}`,
        providerModuleId: `rendered.source.budget.${indexBySpecifier.get(moduleSpecifier)!}`,
      };
    },
    getDeclarationModel: (resolution) => {
      declarationCallsBySpecifier.set(
        resolution.moduleSpecifier,
        (declarationCallsBySpecifier.get(resolution.moduleSpecifier) ?? 0) + 1,
      );
      const index = indexBySpecifier.get(resolution.moduleSpecifier)!;
      const nextSpecifier = specifiers[index + 1];
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        ...(nextSpecifier === undefined
          ? {}
          : {
            imports: [{
              moduleSpecifier: nextSpecifier,
              namedImports: [{ exportedName: "Node" }],
              typeOnly: true,
            }],
          }),
        exports: ["Node", ...paddingExportNames].map((name, exportIndex) => ({
          id: exportIndex === 0 ? `Node${index}` : `Padding${index}_${exportIndex}`,
          name,
          kind: "interface" as const,
          members: exportIndex !== 0 || nextSpecifier === undefined
            ? []
            : [{
              id: `Node${index}.next`,
              name: "next",
              kind: "property" as const,
              type: {
                kind: "provider-ref" as const,
                moduleSpecifier: nextSpecifier,
                exportName: "Node",
              },
            }],
        })),
      };
    },
  });

  const result = host.providers.resolveVirtualModule(specifiers[0]!, { activeTarget: "demo" });
  assert.equal(result.kind, "rejected");
  assert.ok([...declarationCallsBySpecifier.values()].every((count) => count === 1));
  const diagnostic = host.diagnostics.all().at(-1);
  const details = diagnostic?.evidence?.find((evidence) => evidence.message === "Provider declaration closure budget")?.details as {
    readonly dimension: string;
    readonly actual: number;
    readonly limit: number;
  } | undefined;
  assert.equal(details?.dimension, "provider declaration source code units");
  assert.ok((details?.actual ?? 0) > providerDeclarationClosureLimits.maxDeclarationSourceCodeUnits);
  assert.equal(details?.limit, providerDeclarationClosureLimits.maxDeclarationSourceCodeUnits);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);

  assert.ok(leafDependencyContext !== undefined);
  const dependencySpecifier = specifiers.at(-1)!;
  const dependency = host.providers.resolveVirtualModule(dependencySpecifier, leafDependencyContext);
  assert.equal(dependency.kind, "resolved");
  assert.equal(declarationCallsBySpecifier.get(dependencySpecifier), 2);
  assert.ok(host.providers.getVirtualDeclarationDocuments().some((document) => document.moduleSpecifier === dependencySpecifier));
});

test("recursive canonical-owner planning enforces aggregate declaration graph budgets", () => {
  const expandedNodeContribution = 2 ** 15 - 1;
  const expandedScalarContribution = 32 * providerAncillaryDataLimits.maxStringCodeUnits;
  const snapshottedInputEntryContribution = Math.floor(providerAncillaryDataLimits.maxTotalEntries * 0.9);
  const scalarEvidencePayload = "x".repeat(providerAncillaryDataLimits.maxStringCodeUnits - 6);
  const snapshottedInputScalarContribution = 1 + 4 + 4 * scalarEvidencePayload.length;
  const cases: readonly {
    readonly name: string;
    readonly moduleCount: number;
    readonly expectedDimension: string;
  }[] = [{
    name: "expanded-nodes",
    moduleCount: Math.floor(
      providerDeclarationClosureLimits.maxExpandedSemanticNodeAndArrayEntries / expandedNodeContribution,
    ) + 2,
    expectedDimension: "expanded semantic declaration nodes",
  }, {
    name: "expanded-scalars",
    moduleCount: Math.floor(
      providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits / expandedScalarContribution,
    ) + 2,
    expectedDimension: "expanded semantic provider declaration scalar code units",
  }, {
    name: "physical-entries",
    moduleCount: Math.floor(
      providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries / snapshottedInputEntryContribution,
    ) + 2,
    expectedDimension: "snapshotted provider input nodes and collection entries",
  }, {
    name: "resolution-evidence",
    moduleCount: Math.floor(
      providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries / snapshottedInputEntryContribution,
    ) + 2,
    expectedDimension: "snapshotted provider input nodes and collection entries",
  }, {
    name: "physical-scalars",
    moduleCount: Math.floor(
      providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits / snapshottedInputScalarContribution,
    ) + 2,
    expectedDimension: "snapshotted provider input scalar code units",
  }];

  for (const entry of cases) {
    const specifiers = Array.from({ length: entry.moduleCount }, (_, index) => `@target/aggregate-${entry.name}-${index}.js`);
    const indexBySpecifier = new Map(specifiers.map((specifier, index) => [specifier, index] as const));
    let sharedExpandedType: ProviderTypeExpression = { kind: "number" };
    for (let depth = 0; depth < 14; depth++) {
      sharedExpandedType = { kind: "union", types: [sharedExpandedType, sharedExpandedType] };
    }
    const sharedScalarType: ProviderTypeExpression = {
      kind: "target-named",
      target: "neutral",
      id: "I".repeat(providerAncillaryDataLimits.maxStringCodeUnits),
      displayName: "Native",
      sourceShape: { kind: "string" },
    };
    const sharedExpandedScalarTypes = Array.from({ length: 32 }, () => sharedScalarType);
    const sharedPhysicalEvidence = Array.from({
      length: snapshottedInputEntryContribution,
    }, () => 1);
    let declarationCalls = 0;
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider({
      identity: providerIdentity(`aggregate-${entry.name}-provider`, "demo", "binding"),
      ownsModule: (moduleSpecifier) => indexBySpecifier.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
      resolveModule: (moduleSpecifier) => {
        const index = indexBySpecifier.get(moduleSpecifier)!;
        return {
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: `tsts-provider://aggregate-${entry.name}/${index}`,
          providerModuleId: `aggregate.${entry.name}.${index}`,
          ...(entry.name === "resolution-evidence"
            ? { evidence: [{ message: "resolution entries", details: sharedPhysicalEvidence }] }
            : {}),
        };
      },
      getDeclarationModel: (resolution) => {
        declarationCalls += 1;
        const index = indexBySpecifier.get(resolution.moduleSpecifier)!;
        const nextSpecifier = specifiers[index + 1];
        const members: ProviderMemberDeclaration[] = [
          ...(entry.name === "expanded-nodes"
            ? [{
              id: `Node${index}.payload`,
              name: "payload",
              kind: "property" as const,
              type: sharedExpandedType,
            }]
            : []),
          ...(entry.name === "expanded-scalars"
            ? [{
              id: `Node${index}.payload`,
              name: "payload",
              kind: "property" as const,
              type: { kind: "tuple" as const, elementTypes: sharedExpandedScalarTypes },
            }]
            : []),
          ...(nextSpecifier === undefined
            ? []
            : [{
              id: `Node${index}.next`,
              name: "next",
              kind: "property" as const,
              type: {
                kind: "provider-ref" as const,
                moduleSpecifier: nextSpecifier,
                exportName: "Node",
              },
            }]),
        ];
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          ...(entry.name === "physical-entries"
            ? { evidence: [{ message: "physical entries", details: sharedPhysicalEvidence }] }
            : entry.name === "physical-scalars"
              ? {
                evidence: [{
                  message: "m",
                  details: {
                    a: scalarEvidencePayload,
                    b: scalarEvidencePayload,
                    c: scalarEvidencePayload,
                    d: scalarEvidencePayload,
                  },
                }],
              }
            : {}),
          ...(nextSpecifier === undefined
            ? {}
            : {
              imports: [{
                moduleSpecifier: nextSpecifier,
                namedImports: [{ exportedName: "Node" }],
                typeOnly: true,
              }],
            }),
          exports: [{ id: `Node${index}`, name: "Node", kind: "interface", members }],
        };
      },
    });

    const result = host.providers.resolveVirtualModule(specifiers[0]!, { activeTarget: "demo" });
    assert.equal(result.kind, "rejected", entry.name);
    assert.ok(declarationCalls > 2, entry.name);
    assert.ok(declarationCalls <= entry.moduleCount, entry.name);
    const diagnostic = host.diagnostics.all().at(-1);
    assert.match(diagnostic?.message ?? "", /exceeds the transaction limit/, entry.name);
    const details = diagnostic?.evidence?.find((evidence) => evidence.message === "Provider declaration closure budget")?.details as {
      readonly dimension: string;
      readonly actual: number;
      readonly limit: number;
    } | undefined;
    assert.equal(details?.dimension, entry.expectedDimension, `${entry.name}: ${JSON.stringify(host.diagnostics.all())}`);
    const expectedLimit = entry.name === "expanded-nodes"
      ? providerDeclarationClosureLimits.maxExpandedSemanticNodeAndArrayEntries
      : entry.name === "expanded-scalars"
        ? providerDeclarationClosureLimits.maxExpandedSemanticScalarCodeUnits
        : entry.name === "physical-entries" || entry.name === "resolution-evidence"
          ? providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries
          : providerDeclarationClosureLimits.maxSnapshottedInputScalarCodeUnits;
    assert.equal(details?.limit, expectedLimit, entry.name);
    assert.ok((details?.actual ?? 0) > (details?.limit ?? Number.POSITIVE_INFINITY), entry.name);
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), [], entry.name);
  }
});

test("failed provider closure transactions retain only the terminal root rejection", () => {
  const evidencePayloadLength = Math.floor(providerAncillaryDataLimits.maxTotalEntries * 0.9);
  const moduleCount = Math.floor(
    providerDeclarationClosureLimits.maxSnapshottedInputNodeAndCollectionEntries / evidencePayloadLength,
  ) + 1;
  const specifiers = Array.from({ length: moduleCount }, (_, index) => `@target/rollback-${index}.js`);
  const indexBySpecifier = new Map(specifiers.map((specifier, index) => [specifier, index] as const));
  const evidencePayload = Array.from({
    length: evidencePayloadLength,
  }, () => 1);
  const declarationCallsBySpecifier = new Map<string, number>();
  let firstDependencyContext: ProviderModuleContext | undefined;
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider({
    identity: providerIdentity("provider-closure-rollback", "demo", "binding"),
    ownsModule: (moduleSpecifier) => indexBySpecifier.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      const index = indexBySpecifier.get(moduleSpecifier)!;
      if (index === 1 && firstDependencyContext === undefined) {
        firstDependencyContext = context;
      }
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://rollback/${index}`,
        providerModuleId: `rollback.${index}`,
      };
    },
    getDeclarationModel: (resolution) => {
      declarationCallsBySpecifier.set(
        resolution.moduleSpecifier,
        (declarationCallsBySpecifier.get(resolution.moduleSpecifier) ?? 0) + 1,
      );
      const index = indexBySpecifier.get(resolution.moduleSpecifier)!;
      const nextSpecifier = specifiers[index + 1];
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        evidence: [{ message: "physical entries", details: evidencePayload }],
        ...(nextSpecifier === undefined
          ? {}
          : {
            imports: [{
              moduleSpecifier: nextSpecifier,
              namedImports: [{ exportedName: "Node" }],
              typeOnly: true,
            }],
          }),
        exports: [{
          id: `Node${index}`,
          name: "Node",
          kind: "interface",
          members: nextSpecifier === undefined
            ? []
            : [{
              id: `Node${index}.next`,
              name: "next",
              kind: "property",
              type: {
                kind: "provider-ref",
                moduleSpecifier: nextSpecifier,
                exportName: "Node",
              },
            }],
        }],
      };
    },
  });

  const rootContext = { activeTarget: "demo" } as const;
  const rejected = host.providers.resolveVirtualModule(specifiers[0]!, rootContext);
  assert.equal(rejected.kind, "rejected");
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 0);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, 0);
  const callsAfterFailure = new Map(declarationCallsBySpecifier);
  assert.equal(host.providers.resolveVirtualModule(specifiers[0]!, rootContext), rejected);
  assert.deepEqual(declarationCallsBySpecifier, callsAfterFailure);

  const dependencySpecifier = specifiers[1]!;
  assert.ok(firstDependencyContext !== undefined);
  const dependencyCallsBeforeRetry = declarationCallsBySpecifier.get(dependencySpecifier);
  const dependency = host.providers.resolveVirtualModule(dependencySpecifier, firstDependencyContext);
  assert.equal(dependency.kind, "resolved");
  assert.equal(declarationCallsBySpecifier.get(dependencySpecifier), (dependencyCallsBeforeRetry ?? 0) + 1);
  assert.equal(declarationCallsBySpecifier.get(specifiers[0]!), callsAfterFailure.get(specifiers[0]!));
  assert.equal(host.providers.getVirtualDeclarationDocuments().length, 1);
  assert.equal(getCanonicalExportOwnerDocuments(host).length, moduleCount - 1);
});

function acmeBindingProvider(
  ownedSpecifier: string,
  options: {
    readonly id?: string;
    readonly providerKind?: TargetBindingProvider["identity"]["providerKind"];
    readonly extensionContractVersion?: string;
    readonly declarationModel?: (resolution: ProviderModuleResolution) => ProviderDeclarationModel;
  } = {},
): TargetBindingProvider {
  const moduleId = "acme:Acme.Buffers";
  const targetIdentity: TargetIdentity = {
    target: "acme",
    id: "Acme.Buffers.SearchValues`1",
    displayName: "Acme.Buffers.SearchValues<T>",
  };
  return {
    identity: {
      id: options.id ?? "acme",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: options.extensionContractVersion ?? TstsProviderContractVersion,
      providerKind: options.providerKind ?? "binding",
    },
    ownsModule: (specifier) => specifier === ownedSpecifier
      ? { kind: "owned", evidence: [{ message: "owned by the .NET target binding provider" }] }
      : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: "tsts-provider://acme/Acme.Buffers",
      providerModuleId: moduleId,
      packageName: "@example/target",
      packageVersion: "1.0.0",
    }),
    getDeclarationModel: options.declarationModel ?? ((resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "SearchValues",
        name: "SearchValues",
        kind: "class",
        targetIdentity,
        typeParameters: [{
          name: "T",
          constraints: [{ kind: "unknown" }],
        }],
        members: [{
          id: "Contains",
          name: "Contains",
          kind: "method",
          signatures: [{
            id: "Contains(T)",
            parameters: [{ name: "value", type: { kind: "type-parameter", name: "T" } }],
            returnType: { kind: "source-primitive", name: "bool" },
          }],
        }],
      }, {
        id: "Token",
        name: "Token",
        kind: "type",
        targetIdentity: {
          target: "acme",
          id: "Acme.Int32",
          displayName: "Acme.Int32",
        },
        type: {
          kind: "target-named",
          target: "acme",
          id: "Acme.Int32",
          sourceShape: { kind: "number" },
        },
      }],
    })),
  };
}

function matrixBindingProvider(
  ownedSpecifier: string,
  options: {
    readonly members?: readonly ProviderMemberDeclaration[];
    readonly namespaceMembers?: readonly ProviderMemberDeclaration[];
    readonly valueType?: ProviderDeclarationModel["exports"][number]["type"];
  } = {},
): TargetBindingProvider {
  return {
    identity: {
      id: "matrix-provider",
      version: "1.0.0",
      target: "demo",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
    },
    ownsModule: (specifier) => specifier === ownedSpecifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: "tsts-provider://matrix/runtime",
      providerModuleId: "matrix.runtime",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Box",
        name: "Box",
        kind: "class",
        targetIdentity: { target: "demo", id: "Demo.Box`1" },
        typeParameters: [{
          name: "T",
          constraints: [{ kind: "source-primitive", name: "int32" }],
        }],
        members: options.members ?? [{
          id: "ctor",
          name: "constructor",
          kind: "constructor",
          signatures: [{
            id: "new(T)",
            parameters: [{ name: "value", type: { kind: "type-parameter", name: "T" } }],
          }],
        }, {
          id: "value",
          name: "value",
          kind: "property",
          type: { kind: "type-parameter", name: "T" },
        }, {
          id: "continueWith",
          name: "continueWith",
          kind: "method",
          signatures: [{
            id: "continueWith",
            parameters: [{
              name: "callback",
              type: {
                kind: "function",
                parameters: [],
                returnType: { kind: "object" },
              },
            }, {
              name: "state",
              type: {
                kind: "union",
                types: [{ kind: "object" }, { kind: "undefined" }],
              },
            }],
            returnType: { kind: "object" },
          }],
        }, {
          id: "Count",
          name: "Count",
          kind: "field",
          static: true,
          type: { kind: "number" },
        }, {
          id: "item",
          name: "item",
          kind: "indexer",
          signatures: [{
            id: "item(number)",
            parameters: [{ name: "index", type: { kind: "number" } }],
            returnType: { kind: "string" },
          }],
        }],
      }, {
        id: "Writer",
        name: "Writer",
        kind: "interface",
        members: [{
          id: "write",
          name: "write",
          kind: "method",
          signatures: [{
            id: "write",
            parameters: [
              { name: "text", type: { kind: "string" }, optional: true },
              { name: "chunks", type: { kind: "array", elementType: { kind: "string" } }, rest: true },
            ],
            returnType: { kind: "number" },
          }],
        }],
      }, {
        id: "tryParse",
        name: "tryParse",
        kind: "function",
        typeParameters: [{
          name: "T",
          constraints: [{ kind: "source-primitive", name: "int32" }],
        }],
        signatures: [{
          id: "tryParse",
          typeParameters: [{
            name: "T",
            constraints: [{ kind: "source-primitive", name: "int32" }],
          }],
          parameters: [
            { name: "text", type: { kind: "string" }, optional: true },
            { name: "values", type: { kind: "array", elementType: { kind: "number" } }, rest: true },
          ],
          returnType: { kind: "boolean" },
        }],
      }, {
        id: "Pair",
        name: "Pair",
        kind: "type",
        type: { kind: "tuple", elementTypes: [{ kind: "number" }, { kind: "string" }] },
      }, {
        id: "DefaultSize",
        name: "DefaultSize",
        kind: "value",
        type: options.valueType ?? { kind: "number" },
      }, {
        id: "Buffers",
        name: "Buffers",
        kind: "namespace",
        members: options.namespaceMembers ?? [{
          id: "Capacity",
          name: "Capacity",
          kind: "field",
          type: { kind: "number" },
        }],
      }, {
        id: "Color",
        name: "Color",
        kind: "enum",
        members: [
          { id: "Red", name: "Red", kind: "field" },
          { id: "Blue", name: "Blue", kind: "field" },
        ],
      }, {
        id: "NativeHandle",
        name: "NativeHandle",
        kind: "opaque",
      }],
    }),
  };
}

function typeFamilyVariant(name: string, typeArgumentCount: number): ProviderDeclarationModel["exports"][number] {
  return {
    id: name,
    name,
    kind: "class",
    sourceTypeFamily: {
      exportName: "Task",
      typeArgumentCount,
    },
    typeParameters: Array.from({ length: typeArgumentCount }, (_, index) => ({ name: `T${index}` })),
    members: [],
  };
}

function typeFamilyBindingProvider(ownedSpecifier: string, exports: ProviderDeclarationModel["exports"], imports?: ProviderDeclarationModel["imports"]): TargetBindingProvider {
  return {
    identity: providerIdentity("type-family-provider", "demo", "binding"),
    ownsModule: (specifier) => specifier === ownedSpecifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: "tsts-provider://matrix/type-family",
      providerModuleId: "matrix.type-family",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      ...(imports !== undefined ? { imports } : {}),
      exports,
    }),
  };
}

function multiModuleTypeFamilyBindingProvider(models: ReadonlyMap<string, ProviderDeclarationModel>): TargetBindingProvider {
  return {
    identity: providerIdentity("multi-module-type-family-provider", "demo", "binding"),
    ownsModule: (specifier) => models.has(specifier) ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (specifier) => {
      const model = models.get(specifier)!;
      return {
        kind: "virtual",
        moduleSpecifier: specifier,
        virtualFileName: `tsts-provider://matrix/type-family/${encodeURIComponent(specifier)}`,
        providerModuleId: model.providerModuleId,
      };
    },
    getDeclarationModel: (resolution) => models.get(resolution.moduleSpecifier)!,
  };
}

function recursiveDeclarationClosureBindingProvider(
  requests: Array<{ readonly moduleSpecifier: string; readonly context: ProviderModuleContext }>,
): TargetBindingProvider {
  const coreSpecifier = "@acme/native/core.js";
  const reflectionSpecifier = "@acme/native/reflection.js";
  const leafSpecifier = "@acme/native/leaf.js";
  const familyClass = (
    exportName: string,
    heritage: ProviderExportDeclaration["heritage"] = [],
  ): ProviderExportDeclaration => ({
    id: exportName,
    name: exportName,
    kind: "class",
    sourceTypeFamily: { exportName, typeArgumentCount: 0 },
    heritage,
    members: [],
  });
  const models = new Map<string, ProviderDeclarationModel>([
    [coreSpecifier, {
      moduleSpecifier: coreSpecifier,
      providerModuleId: "acme.recursive.core",
      imports: [{
        moduleSpecifier: reflectionSpecifier,
        namedImports: [{ exportedName: "Member", localName: "ImportedMember", kind: "value" }],
      }],
      exports: [familyClass("Base", [{
        kind: "extends",
        type: {
          kind: "provider-ref",
          moduleSpecifier: reflectionSpecifier,
          exportName: "Member",
          localName: "ImportedMember",
        },
      }])],
    }],
    [reflectionSpecifier, {
      moduleSpecifier: reflectionSpecifier,
      providerModuleId: "acme.recursive.reflection",
      imports: [{
        moduleSpecifier: coreSpecifier,
        namedImports: [{ exportedName: "Base", localName: "ImportedBase", kind: "value" }],
      }],
      exports: [
        familyClass("Root"),
        familyClass("Member", [{
          kind: "extends",
          type: { kind: "provider-ref", moduleSpecifier: reflectionSpecifier, exportName: "Root" },
        }]),
        familyClass("DerivedMember", [{
          kind: "extends",
          type: {
            kind: "provider-ref",
            moduleSpecifier: coreSpecifier,
            exportName: "Base",
            localName: "ImportedBase",
          },
        }]),
      ],
    }],
    [leafSpecifier, {
      moduleSpecifier: leafSpecifier,
      providerModuleId: "acme.recursive.leaf",
      imports: [{
        moduleSpecifier: reflectionSpecifier,
        namedImports: [{ exportedName: "DerivedMember", localName: "ImportedDerivedMember", kind: "value" }],
      }],
      exports: [{
        id: "Leaf",
        name: "Leaf",
        kind: "class",
        heritage: [{
          kind: "extends",
          type: {
            kind: "provider-ref",
            moduleSpecifier: reflectionSpecifier,
            exportName: "DerivedMember",
            localName: "ImportedDerivedMember",
          },
        }],
        members: [],
      }],
    }],
  ]);
  const pendingRequestedExports = new Map<string, readonly string[]>();
  return {
    identity: providerIdentity("recursive-declaration-closure-provider", "demo", "binding"),
    ownsModule: (moduleSpecifier) => models.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      requests.push({ moduleSpecifier, context });
      pendingRequestedExports.set(
        moduleSpecifier,
        (context.importSlice?.requestedExports ?? []).map((request) => request.exportedName),
      );
      const model = models.get(moduleSpecifier)!;
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: moduleSpecifier === coreSpecifier
          ? "tsts-provider://acme/recursive-core"
          : moduleSpecifier === reflectionSpecifier
            ? "tsts-provider://acme/recursive-reflection"
            : "tsts-provider://acme/recursive-leaf",
        providerModuleId: model.providerModuleId,
      };
    },
    getDeclarationModel: (resolution) => getRecursiveDeclarationClosureSlice(
      models.get(resolution.moduleSpecifier)!,
      pendingRequestedExports.get(resolution.moduleSpecifier) ?? [],
    ),
  };
}

function getRecursiveDeclarationClosureSlice(
  model: ProviderDeclarationModel,
  requestedExports: readonly string[],
): ProviderDeclarationModel {
  if (requestedExports.length === 0) {
    return model;
  }
  const closure = new Set(requestedExports);
  if (requestedExports.includes("Member")) {
    closure.add("Root");
    closure.add("DerivedMember");
  }
  const exports = model.exports.filter((declaration) => closure.has(declaration.sourceTypeFamily?.exportName ?? declaration.exportName ?? declaration.name));
  return { ...model, exports };
}

function getCanonicalExportOwnerDocuments(host: ExtensionHost) {
  const documents = new Map<string, ProviderVirtualDeclarationDocument>();
  const pending = host.providers.getVirtualDeclarationDocuments()
    .flatMap((document) => getCanonicalExportOwnerReferences(document.sourceText));
  for (let index = 0; index < pending.length; index++) {
    const fileName = pending[index]!;
    if (documents.has(fileName)) {
      continue;
    }
    const artifact = getProviderVirtualArtifactForCompiler(host.providers, fileName);
    assert.equal(artifact?.kind, "canonical-export-owner", `canonical owner artifact ${fileName}`);
    if (artifact?.kind !== "canonical-export-owner") {
      continue;
    }
    const document = artifact.document;
    documents.set(fileName, document);
    pending.push(...getCanonicalExportOwnerReferences(document.sourceText));
  }
  return [...documents.values()].sort((left, right) =>
    left.fileName < right.fileName ? -1 : left.fileName > right.fileName ? 1 : 0);
}

function assertProviderPublicVirtualFileName(fileName: string): void {
  assert.match(fileName, /^tsts-provider:\/\/tsts-public\/[a-z0-9]+\.tsts-slice-[a-z0-9]+\.d\.ts$/);
}

function getCanonicalExportOwnerReferences(sourceText: string): string[] {
  return [...sourceText.matchAll(/^[ \t]*(?:import|export)(?:[ \t]+type)?[ \t]+[^"\n;]*?[ \t]+from[ \t]+"([^"\n]*\.tsts-export-owner-[^"\n]*\.d\.ts)"[ \t]*;?[ \t]*$/gm)]
    .map((match) => match[1]!);
}

function getCanonicalExportOwnerSource(host: ExtensionHost, sourceExportName: string, moduleSpecifier?: string): string {
  const documents = getCanonicalExportOwnerDocuments(host).filter((document) =>
    (moduleSpecifier === undefined || document.moduleSpecifier === moduleSpecifier)
    && document.declarationModel.exports.some((declaration) =>
      (declaration.sourceTypeFamily?.exportName
        ?? (declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name)) === sourceExportName));
  assert.equal(documents.length, 1, `canonical owner for ${moduleSpecifier === undefined ? "" : `${moduleSpecifier}#`}${sourceExportName}`);
  return documents[0]!.sourceText;
}

function assertInvalidMatrixNamespaceMembers(namespaceMembers: readonly ProviderMemberDeclaration[]): void {
  const specifier = "@target/runtime.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(matrixBindingProvider(specifier, { namespaceMembers }));

  const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
  assert.equal(resolved.kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
}

function richBindingProvider(ownedSpecifier: string): TargetBindingProvider {
  const baseSpecifier = "@acme/native/base.js";
  const defaultsSpecifier = "@acme/native/defaults.js";
  return {
    identity: providerIdentity("acme-rich-provider", "acme-native", "binding"),
    ownsModule: (specifier) => [ownedSpecifier, baseSpecifier, defaultsSpecifier].includes(specifier)
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: specifier === ownedSpecifier
        ? "tsts-provider://acme/rich"
        : specifier === baseSpecifier
          ? "tsts-provider://acme/base"
          : "tsts-provider://acme/defaults",
      providerModuleId: specifier === ownedSpecifier
        ? "acme.rich"
        : specifier === baseSpecifier
          ? "acme.base"
          : "acme.defaults",
    }),
    getDeclarationModel: (resolution) => resolution.moduleSpecifier === baseSpecifier
      ? {
        moduleSpecifier: baseSpecifier,
        providerModuleId: "acme.base",
        exports: [{ id: "BaseShape", name: "BaseShape", kind: "interface", members: [] }],
      }
      : resolution.moduleSpecifier === defaultsSpecifier
        ? {
          moduleSpecifier: defaultsSpecifier,
          providerModuleId: "acme.defaults",
          exports: [{
            id: "DefaultShape",
            name: "DefaultShape",
            exportKind: "default",
            kind: "interface",
            members: [],
          }, {
            id: "IteratorShape",
            name: "IteratorShape",
            kind: "interface",
            members: [],
          }],
        }
        : ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      imports: [{
        moduleSpecifier: baseSpecifier,
        namedImports: [{ exportedName: "BaseShape", localName: "ImportedBaseShape" }],
        typeOnly: true,
      }, {
        moduleSpecifier: defaultsSpecifier,
        defaultImport: "DefaultShape",
        namedImports: [{ exportedName: "IteratorShape" }],
        typeOnly: true,
      }],
      exports: [{
        id: "Derived",
        name: "Derived",
        kind: "interface",
        typeParameters: [{
          name: "T",
          constraints: [{ kind: "number" }],
          defaultType: { kind: "number" },
        }],
        heritage: [{
          kind: "extends",
          type: { kind: "provider-ref", moduleSpecifier: baseSpecifier, exportName: "BaseShape", localName: "ImportedBaseShape" },
        }],
        members: [{
          id: "id",
          name: "id",
          kind: "property",
          readonly: true,
          type: { kind: "number" },
        }, {
          id: "optionalName",
          name: "optionalName",
          kind: "property",
          optional: true,
          type: { kind: "string" },
        }, {
          id: "defaultShape",
          name: "defaultShape",
          kind: "property",
          type: { kind: "provider-ref", moduleSpecifier: defaultsSpecifier, exportName: "default", localName: "DefaultShape" },
        }, {
          id: "quoted",
          name: { kind: "string-literal", text: "not-valid-identifier" },
          kind: "property",
          type: { kind: "number" },
        }, {
          id: "iterator",
          name: { kind: "well-known-symbol", name: "iterator" },
          kind: "method",
          signatures: [{
            id: "iterator()",
            parameters: [],
            returnType: { kind: "provider-ref", moduleSpecifier: defaultsSpecifier, exportName: "IteratorShape" },
          }],
        }, {
          id: "make",
          name: "make",
          kind: "method",
          signatures: [{
            id: "make(BaseShape)",
            parameters: [{
              name: "value",
              type: { kind: "provider-ref", moduleSpecifier: baseSpecifier, exportName: "BaseShape", localName: "ImportedBaseShape" },
              optional: true,
            }],
            returnType: { kind: "type-parameter", name: "T" },
          }],
        }],
      }, {
        id: "DefaultBox",
        name: "DefaultBox",
        exportKind: "default",
        kind: "class",
        members: [],
      }],
    }),
  };
}

function providerIdentity(id: string, target: string, providerKind: NonNullable<TargetBindingProvider["identity"]["providerKind"]>) {
  return {
    id,
    version: "1.0.0",
    target,
    extensionContractVersion: TstsProviderContractVersion,
    providerKind,
  };
}

function diagnostic(extensionId: string, extensionCode: string, numericCode: number, message: string): ExtensionDiagnostic {
  return {
    extensionId,
    extensionCode,
    numericCode,
    category: "error",
    message,
    identity: `${extensionId}:${extensionCode}:${message}`,
  };
}

function selectedSignature(id: string, generic = false): TargetSignatureSelection {
  return {
    member: {
      id,
      sourceName: "WriteLine",
      targetName: id,
      kind: "method",
      parameters: [{
        name: "value",
        type: { kind: "source-primitive", name: "int32" },
        passingMode: "by-value",
      }],
      ...(generic ? { typeParameters: [{ name: "T" }] } : {}),
    },
  };
}

function selectedTargetCallFact(id: string) {
  return {
    ...selectedSignature(id),
    argumentConversions: [argumentConversionSlot(0)],
  } as const;
}

function argumentConversionSlot(argumentIndex: number) {
  return {
    sourceArgumentIndex: argumentIndex,
    sourceForm: "value" as const,
    targetParameterIndex: argumentIndex,
    targetForm: "parameter" as const,
  };
}

function targetOperation(operationId: string, operationKind: TargetOperationFact["operationKind"]): TargetOperationFact {
  return {
    operationId,
    operationKind,
    targetOperation: operationId,
  };
}
