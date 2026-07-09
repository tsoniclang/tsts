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
  CheckedConversionMappingResult,
  ProviderDeclarationModel,
  ProviderMemberDeclaration,
  ProviderModuleResolution,
  CheckedCallMappingRequest,
  CheckedCallMappingResult,
  CheckedElementAccessMappingRequest,
  CheckedOperationMappingResult,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  TargetConstraintValidationRequest,
  TargetTypeArgumentMappingResult,
  SelectedTargetSignatureFact,
  SourceFileBoundLifecycleRequest,
  TargetBindingFact,
  TargetBindingProvider,
  TargetIdentity,
  TargetOperationFact,
  TargetSemanticProvider,
  ExtensionFlowUseValidationRequest,
  ExtensionFlowUseValidationResult,
} from "./index.js";

const primitiveFactKey = defineExtensionFactKey({
  extensionId: "source-primitives",
  name: "primitive",
});

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
  assert.equal(host.providers.getTargetBindingProvider("acme")?.identity.target, "acme");
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
  const parameter = {};
  const argument = {};
  const semanticProvider: TargetSemanticProvider = {
    identity: {
      id: "acme-semantic",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    resolveParameterPassing: () => acceptObservation({
      passing: { mode: "byref-writeonly-must-init" },
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

  assert.equal(host.providers.getTargetBindingProvider("acme"), bindingProvider);
  assert.equal(host.providers.getTargetSemanticProvider("acme-semantic"), semanticProvider);
  assert.equal(host.diagnostics.hasErrors(), false);

  const parameterMode = host.runObservation(ExtensionObservationPoint.resolveParameterPassing, {
    parameter,
    argument,
    target: "acme",
  }, () => ({ passing: { mode: "by-value" } }), { requireOwner: true });

  assert.equal(parameterMode.kind, "accept");
  assert.equal(parameterMode.kind === "accept" ? parameterMode.value.passing.mode : undefined, "byref-writeonly-must-init");
  assert.equal(parameterMode.kind === "accept" ? parameterMode.extensionId : undefined, "acme");
});

test("semantic provider methods own typed observations without hook boilerplate", () => {
  const expression = {};
  const convertedExpression = {};
  const propertyAccess = {};
  const elementAccess = {};
  const operatorExpression = {};
  const lambda = {};
  const flowUse = {};
  const voidType = {};
  const int32Type = {};
  const longType = {};
  const byteType = {};
  const charType = {};
  const stringType = {};
  const delegateType = {};
  const listAdd = {};
  const listInt32 = {};
  const consoleWriteLine = {};
  const callArgument = {};
  const spanArgument = {};
  const leftOperand = {};
  const rightOperand = {};
  const tryParseParameter = {};
  const tryParseArgument = {};
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
              selectedSignature: selectedSignature("Acme.Console.WriteLine(Acme.Int32)"),
              returnType: voidType,
            }),
            mapInferredSourceTypeArgumentsToTarget: () => acceptObservation({
              targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
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
            resolveParameterPassing: () => acceptObservation({
              passing: { mode: "byref-readwrite" },
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

  const call = host.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call: expression,
    callee: consoleWriteLine,
    arguments: [callArgument],
    target: "acme",
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });
  assert.equal(call.kind === "accept" ? call.value.selectedSignature.member.id : undefined, "Acme.Console.WriteLine(Acme.Int32)");

  const noInferredTypeArguments: TargetTypeArgumentMappingResult = { targetTypeArguments: [] };
  const inferred = host.runObservation(ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget, {
    declaration: listAdd,
    arguments: [callArgument],
    contextualType: listInt32,
  }, () => noInferredTypeArguments, { requireOwner: true });
  assert.deepEqual(inferred.kind === "accept" ? inferred.value.targetTypeArguments : [], [{ kind: "source-primitive", name: "int32" }]);

  const property = host.runObservation(ExtensionObservationPoint.mapCheckedPropertyAccess, {
    expression: propertyAccess,
    receiver: stringType,
    propertyName: "length",
    target: "acme",
  }, () => ({ operation: targetOperation("core", "property") }), { requireOwner: true });
  assert.equal(property.kind === "accept" ? property.value.operation.operationId : undefined, "Acme.String.Length");

  const element = host.runObservation(ExtensionObservationPoint.mapCheckedElementAccess, {
    expression: elementAccess,
    receiver: stringType,
    argument: spanArgument,
    target: "acme",
  }, () => ({ operation: targetOperation("core", "indexer") }), { requireOwner: true });
  assert.equal(element.kind === "accept" ? element.value.operation.operationId : undefined, "Acme.Span.GetItem");

  const operator = host.runObservation(ExtensionObservationPoint.mapCheckedOperator, {
    expression: operatorExpression,
    operator: "+",
    left: leftOperand,
    right: rightOperand,
    target: "acme",
  }, () => ({ operation: targetOperation("core", "operator") }), { requireOwner: true });
  assert.equal(operator.kind === "accept" ? operator.value.operation.operationId : undefined, "Acme.Int32.op_Addition");

  const contextual = host.runObservation(ExtensionObservationPoint.recordContextualTargetType, {
    expression: lambda,
    context: delegateType,
    target: "acme",
  }, () => ({ type: int32Type }), { requireOwner: true });
  assert.equal(contextual.kind === "accept" ? contextual.value.type : undefined, delegateType);

  const noConversion: CheckedConversionMappingResult = {};
  const conversion = host.runObservation(ExtensionObservationPoint.mapCheckedConversion, {
    expression: convertedExpression,
    source: byteType,
    target: int32Type,
    targetPlatform: "acme",
  }, () => noConversion, { requireOwner: true });
  assert.equal(conversion.kind === "accept" ? conversion.value.operation?.operationId : undefined, "Acme.Convert.ToInt32");

  const parameterMode = host.runObservation(ExtensionObservationPoint.resolveParameterPassing, {
    parameter: tryParseParameter,
    argument: tryParseArgument,
    target: "acme",
  }, () => ({ passing: { mode: "by-value" } }), { requireOwner: true });
  assert.equal(parameterMode.kind === "accept" ? parameterMode.value.passing.mode : undefined, "byref-readwrite");

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
  const call = {};
  const callee = {};
  let observedProgram: object | undefined;
  let observedQueryFacade = false;
  const host = new ExtensionHost(program, {
    extensions: [
      extension("acme-target", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, (_request, observationContext) => {
            observedProgram = observationContext.compiler.program;
            observedQueryFacade = typeof observationContext.compiler.ast.kindName === "function"
              && typeof observationContext.compiler.checker.getTypeAtLocation === "function"
              && typeof observationContext.compiler.typeShape.typeToString === "function"
              && typeof observationContext.compiler.getSourceFiles === "function";
            return acceptObservation({
              selectedSignature: selectedSignature("acme.Native.call(i32)"),
            });
          });
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [],
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

  assert.equal(result.kind, "accept");
  assert.equal(observedProgram, program);
  assert.equal(observedQueryFacade, true);
});

test("target binding providers own and resolve virtual modules without file-backed side data", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(acmeBindingProvider(specifier));

  assert.equal(host.providers.getModuleOwner("@example/native/types.js"), undefined);

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
  assert.equal(result.module.declarationModel.exports[0]?.name, "SearchValues");
  assert.match(result.module.virtualSourceText, /export declare class SearchValues<T extends unknown>/);
  assert.match(result.module.virtualSourceText, /Contains\(value: T\): boolean;/);
  assert.match(result.module.virtualSourceText, /export type Token = number;/);
  assert.equal(result.module.virtualDocument.uri, "tsts-provider://acme/Acme.Buffers");
  assert.equal(result.module.virtualDocument.readOnly, true);
  assert.equal(result.module.virtualDocument.provider.id, "acme");
  assert.match(result.module.virtualDocument.sourceText, /export declare class SearchValues/);
  const cached = host.providers.resolveVirtualModule(specifier, context);
  assert.equal(cached.kind, "resolved");
  if (cached.kind === "resolved") {
    assert.equal(cached.module, result.module);
  }
  assert.equal(result.module.provider.getTargetIdentity({
    moduleSpecifier: specifier,
    exportName: "SearchValues",
  })?.id, "Acme.Buffers.SearchValues`1");

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
  assert.equal(host.providers.getVirtualDeclarationDocument(result.module.resolution.virtualFileName), result.module.virtualDocument);

  const consumer = createExtensionConsumerQueries(host, "future-lsp");
  assert.equal(consumer.getVirtualDeclarationDocument(result.module.resolution.virtualFileName), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.consumerBeforeFinalization);

  host.finalizeSemantics();
  const document = consumer.getVirtualDeclarationDocument(result.module.resolution.virtualFileName);
  assert.equal(document, result.module.virtualDocument);
  assert.equal(document?.moduleSpecifier, specifier);
  assert.match(document?.sourceText ?? "", /Contains\(value: T\): boolean;/);
});

test("provider ownership conflicts and invalid declaration models are diagnostics", () => {
  const specifier = "@example/target/Acme.Buffers.js";
  const conflictHost = new ExtensionHost({});
  conflictHost.providers.registerTargetBindingProvider(acmeBindingProvider(specifier, { id: "first" }));
  conflictHost.providers.registerTargetBindingProvider(acmeBindingProvider(specifier, { id: "second" }));

  assert.equal(conflictHost.providers.resolveVirtualModule(specifier).kind, "conflict");
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
    getTargetIdentity: () => undefined,
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
    getTargetIdentity: () => undefined,
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
    getTargetIdentity: () => undefined,
  });

  assert.equal(declarationHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(declarationHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerDeclarationFailed);
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

  const source = resolved.module.virtualSourceText;
  assert.match(source, /export declare class Box<T extends number>/);
  assert.match(source, /constructor\(value: T\);/);
  assert.match(source, /value: T;/);
  assert.match(source, /static Count: number;/);
  assert.match(source, /\[index: number\]: string;/);
  assert.match(source, /export interface Writer/);
  assert.match(source, /write\(text\?: string, \.\.\.chunks: string\[\]\): number;/);
  assert.match(source, /export declare function tryParse<T extends number>\(text\?: string, \.\.\.values: number\[\]\): boolean;/);
  assert.match(source, /export type Pair = \[number, string\];/);
  assert.match(source, /export declare const DefaultSize: number;/);
  assert.match(source, /export declare namespace Buffers/);
  assert.match(source, /export const Capacity: number;/);
  assert.match(source, /export declare enum Color/);
  assert.match(source, /Red,/);
  assert.match(source, /export declare const NativeHandle: unique symbol;/);

  assert.equal(resolved.module.declarationModel.exports.length, 8);
  assert.equal(resolved.module.virtualDocument.sourceText, source);
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

  const source = resolved.module.virtualSourceText;
  assert.match(source, /import type \{ BaseShape as ImportedBaseShape \} from "@acme\/native\/base.js";/);
  assert.match(source, /import type DefaultShape, \{ IteratorShape \} from "@acme\/native\/defaults.js";/);
  assert.match(source, /export interface Derived<T extends number = number> extends ImportedBaseShape/);
  assert.match(source, /readonly id: number;/);
  assert.match(source, /optionalName\?: string;/);
  assert.match(source, /defaultShape: DefaultShape;/);
  assert.match(source, /make\(value\?: ImportedBaseShape\): T;/);
  assert.match(source, /"not-valid-identifier": number;/);
  assert.match(source, /\[Symbol.iterator\]\(\): IteratorShape;/);
  assert.match(source, /export default class DefaultBox/);
  assert.equal(resolved.module.context.importSlice?.requestedExports?.[0]?.exportedName, "Derived");
  assert.equal(resolved.module.virtualDocument.context.importSlice?.kind, "named");
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

test("provider declaration models reject invalid type-family declarations", () => {
  const specifier = "@target/type-family.js";
  const invalidFamilies: readonly {
    readonly name: string;
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
  }];

  for (const entry of invalidFamilies) {
    const host = new ExtensionHost({});
    host.providers.registerTargetBindingProvider(typeFamilyBindingProvider(specifier, entry.exports, entry.imports));
    const resolved = host.providers.resolveVirtualModule(specifier, { activeTarget: "demo" });
    assert.equal(resolved.kind, "rejected", entry.name);
    assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration, entry.name);
  }
});

test("provider virtual module cache is separated by provider identity and resolution context", () => {
  const specifier = "@target/cache.js";
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
    ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
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
    getTargetIdentity: () => undefined,
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
  assert.equal(resolveCount, 2);
});

test("provider virtual module source variants receive distinct internal file identities", () => {
  const specifier = "@target/sliced.js";
  const host = new ExtensionHost({});
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
      const requestedExports = (context.importSlice?.requestedExports ?? []).map((request) => request.exportedName).sort();
      const sliceId = requestedExports.length === 0 ? "all" : requestedExports.join(".");
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://sliced/runtime",
        providerModuleId: `sliced.runtime.${sliceId}`,
        packageName: "@target/sliced",
        packageVersion: "1.0.0",
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: resolution.moduleSpecifier,
        name: resolution.providerModuleId.includes(".Second") ? "Second" : "First",
        kind: "interface",
        members: [],
      }],
    }),
    getTargetIdentity: () => undefined,
  });

  const first = host.providers.resolveVirtualModule(specifier, {
    activeTarget: "demo",
    importSlice: {
      moduleSpecifier: specifier,
      kind: "named",
      requestedExports: [{ exportedName: "First", localName: "First" }],
    },
  });
  const second = host.providers.resolveVirtualModule(specifier, {
    activeTarget: "demo",
    importSlice: {
      moduleSpecifier: specifier,
      kind: "named",
      requestedExports: [{ exportedName: "Second", localName: "Second" }],
    },
  });
  const firstAgain = host.providers.resolveVirtualModule(specifier, {
    activeTarget: "demo",
    importSlice: {
      moduleSpecifier: specifier,
      kind: "named",
      requestedExports: [{ exportedName: "First", localName: "RenamedFirst" }],
    },
  });

  assert.equal(first.kind, "resolved");
  assert.equal(second.kind, "resolved");
  assert.equal(firstAgain.kind, "resolved");
  if (first.kind !== "resolved" || second.kind !== "resolved" || firstAgain.kind !== "resolved") {
    return;
  }

  assert.equal(first.module.resolution.virtualFileName, "tsts-provider://sliced/runtime");
  assert.match(second.module.resolution.virtualFileName, /^tsts-provider:\/\/sliced\/runtime#tsts-slice-/);
  assert.equal(firstAgain.module.resolution.virtualFileName, first.module.resolution.virtualFileName);
  assert.equal(host.providers.getVirtualDeclarationDocument(first.module.resolution.virtualFileName)?.sourceText, first.module.virtualSourceText);
  assert.equal(host.providers.getVirtualDeclarationDocument(second.module.resolution.virtualFileName)?.sourceText, second.module.virtualSourceText);
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
      getTargetIdentity: () => undefined,
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

  host.facts.set(call, selectedTargetSignatureFactKey, selectedSignature("Acme.Console.WriteLine(Acme.Int32)"));
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
  satisfiedHost.facts.set(call, selectedTargetSignatureFactKey, selectedSignature("Acme.Console.WriteLine(Acme.Int32)"));
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
  const call = {};
  const callee = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("bad-observation-extension", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => {
            throw new Error("boom");
          });
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [],
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

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
  const call = {};
  const callee = {};
  const argument = {};
  const missing = missingOwnerHost.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [argument],
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

  assert.equal(missing.kind, "missing-owner");
  assert.equal(missingOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationOwnerMissing);

  const deferredOwnerHost = new ExtensionHost({}, {
    extensions: [
      extension("acme", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => deferObservation);
        },
      }),
    ],
  });
  const deferred = deferredOwnerHost.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [argument],
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

  assert.equal(deferred.kind, "owner-deferred");
  assert.equal(deferredOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationOwnerDeferred);
});

test("unowned multiple extension observations produce deterministic conflict", () => {
  const call = {};
  const callee = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("a", {
        initialize: (context) => context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => acceptObservation({ selectedSignature: selectedSignature("a") })),
      }),
      extension("b", {
        initialize: (context) => context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => acceptObservation({ selectedSignature: selectedSignature("b") })),
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.mapCheckedCall, { call, callee, arguments: [] }, () => ({ selectedSignature: selectedSignature("core") }));
  assert.equal(result.kind, "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.observationConflict);
});

test("owned multiple non-deferred observations produce deterministic conflict", () => {
  const call = {};
  const callee = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("owner", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => acceptObservation({ selectedSignature: selectedSignature("first") }));
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, () => acceptObservation({ selectedSignature: selectedSignature("second") }));
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.mapCheckedCall, { call, callee, arguments: [] }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });
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
  const voidType = {};
  const writeLineInt = selectedSignature("Acme.Console.WriteLine(Acme.Int32)");
  const host = new ExtensionHost({}, {
    extensions: [
      extension("acme", {
        observationOwners: [ExtensionObservationPoint.mapCheckedCall],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.mapCheckedCall, (request) => {
            if (request.call === call) {
              context.facts.set(request.call, selectedTargetSignatureFactKey, writeLineInt);
              return acceptObservation({
                selectedSignature: writeLineInt,
                returnType: voidType,
              });
            }
            return deferObservation;
          });
        },
      }),
    ],
  });

  const result = host.runObservation(ExtensionObservationPoint.mapCheckedCall, {
    call,
    callee,
    arguments: [argument],
    target: "acme",
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

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
  const int32Type = {};
  const elementType = {};
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

  assert.equal(host.runObservation(ExtensionObservationPoint.mapCheckedPropertyAccess, { expression: lengthExpression, receiver: arrayType, propertyName: "Length" }, () => ({ operation: targetOperation("core", "property") }), { requireOwner: true }).kind, "accept");
  assert.equal(host.runObservation(ExtensionObservationPoint.mapCheckedElementAccess, { expression: indexExpression, receiver: arrayType, argument: indexArgument }, () => ({ operation: targetOperation("core", "indexer") }), { requireOwner: true }).kind, "accept");
  assert.equal(host.runObservation(ExtensionObservationPoint.mapCheckedOperator, { expression: addExpression, operator: "+", left: leftOperand, right: rightOperand }, () => ({ operation: targetOperation("core", "operator") }), { requireOwner: true }).kind, "accept");

  assert.equal(host.facts.get(lengthExpression, targetOperationFactKey)?.operationId, "Acme.Array.Length");
  assert.equal(host.facts.get(indexExpression, targetOperationFactKey)?.operationId, "Acme.Array.Get");
  assert.equal(host.facts.get(addExpression, targetOperationFactKey)?.operationId, "Acme.Int32.op_Addition");
});

test("contextual target type and target type argument observations preserve target facts", () => {
  const lambda = {};
  const listGetItem = {};
  const delegateType = {};
  const coreType = {};
  const int32Type = {};
  const argument = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("target", {
        observationOwners: [ExtensionObservationPoint.recordContextualTargetType, ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget],
        initialize: (context) => {
          context.registerObservation(ExtensionObservationPoint.recordContextualTargetType, (request) => acceptObservation({
            type: delegateType,
            targetType: { kind: "target-named", id: "Acme.Func`2" },
          }));
          context.registerObservation(ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget, () => acceptObservation({
            targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
          }));
        },
      }),
    ],
  });

  const contextual = host.runObservation(ExtensionObservationPoint.recordContextualTargetType, { expression: lambda, context: delegateType }, () => ({ type: coreType }), { requireOwner: true });
  assert.equal(contextual.kind === "accept" ? contextual.value.type : undefined, delegateType);

  const inferred = host.runObservation(ExtensionObservationPoint.mapInferredSourceTypeArgumentsToTarget, { declaration: listGetItem, arguments: [argument] }, () => ({ targetTypeArguments: [] }), { requireOwner: true });
  assert.deepEqual(inferred.kind === "accept" ? inferred.value.targetTypeArguments : [], [{ kind: "source-primitive", name: "int32" }]);
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
    getTargetIdentity: (symbol) => symbol.moduleSpecifier === ownedSpecifier && symbol.exportName === "SearchValues"
      ? targetIdentity
      : undefined,
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
    getTargetIdentity: () => undefined,
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
    getTargetIdentity: () => undefined,
  };
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
  return {
    identity: providerIdentity("acme-rich-provider", "acme-native", "binding"),
    ownsModule: (specifier) => specifier === ownedSpecifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: "tsts-provider://acme/rich",
      providerModuleId: "acme.rich",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      imports: [{
        moduleSpecifier: "@acme/native/base.js",
        namedImports: [{ exportedName: "BaseShape", localName: "ImportedBaseShape" }],
        typeOnly: true,
      }, {
        moduleSpecifier: "@acme/native/defaults.js",
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
          type: { kind: "provider-ref", moduleSpecifier: "@acme/native/base.js", exportName: "BaseShape", localName: "ImportedBaseShape" },
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
          type: { kind: "provider-ref", moduleSpecifier: "@acme/native/defaults.js", exportName: "default", localName: "DefaultShape" },
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
            returnType: { kind: "provider-ref", moduleSpecifier: "@acme/native/defaults.js", exportName: "IteratorShape" },
          }],
        }, {
          id: "make",
          name: "make",
          kind: "method",
          signatures: [{
            id: "make(BaseShape)",
            parameters: [{
              name: "value",
              type: { kind: "provider-ref", moduleSpecifier: "@acme/native/base.js", exportName: "BaseShape", localName: "ImportedBaseShape" },
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
    getTargetIdentity: () => undefined,
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

function selectedSignature(id: string): SelectedTargetSignatureFact {
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
    },
  };
}

function targetOperation(operationId: string, operationKind: TargetOperationFact["operationKind"]): TargetOperationFact {
  return {
    operationId,
    operationKind,
    targetOperation: operationId,
  };
}
