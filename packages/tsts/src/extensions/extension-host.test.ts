import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionHostDiagnosticCode,
  ExtensionLifecycleEvent,
  ExtensionDecisionQuestion,
  acceptDecision,
  argumentPassingFactKey,
  attachExtensionHost,
  associatedTypeFactKey,
  canonicalIdentityFactKey,
  constGenericFactKey,
  createExtensionConsumerQueries,
  defineExtensionFactKey,
  deferDecision,
  flowStateFactKey,
  getExtensionHost,
  hasExtensionHost,
  rejectDecision,
  runtimeCarrierFactKey,
  selectedTargetSignatureFactKey,
  sourcePrimitiveFactKey,
  surfaceOperationFactKey,
  targetBindingFactKey,
} from "./index.js";
import type {
  AssignabilityRequest,
  CompilerExtension,
  ExtensionDiagnostic,
  InferTypeArgumentsResult,
  ProviderDeclarationModel,
  ProviderModuleResolution,
  ResolveCallRequest,
  ResolveCallResult,
  ResolveConversionResult,
  ResolveElementAccessRequest,
  ResolveOperationResult,
  ResolveOperatorRequest,
  ResolvePropertyAccessRequest,
  SatisfiesConstraintRequest,
  SelectedTargetSignatureFact,
  SourceFileBoundLifecycleRequest,
  SurfaceOperationFact,
  TargetBindingFact,
  TargetBindingProvider,
  TargetIdentity,
  TargetSemanticProvider,
  ValidateFlowUseRequest,
  ValidateFlowUseResult,
} from "./index.js";

const primitiveFactKey = defineExtensionFactKey({
  extensionId: "source-primitives",
  name: "primitive",
});

function extension(id: string, options: {
  readonly dependsOn?: readonly string[];
  readonly runsAfter?: readonly string[];
  readonly composition?: CompilerExtension["composition"];
  readonly decisionOwners?: readonly string[];
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
    },
    ...(dependencies !== undefined ? { dependencies } : {}),
    ...(options.composition !== undefined ? { composition: options.composition } : {}),
    ...(options.decisionOwners !== undefined ? { decisionOwners: options.decisionOwners } : {}),
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

test("decision owners are required and conflicts are reported", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("source", { decisionOwners: ["source-primitive:int"] }),
      extension("other", { decisionOwners: ["source-primitive:int"] }),
    ],
  });

  assert.equal(host.getDecisionOwner("source-primitive:int")?.identity.id, "other");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.decisionOwnerConflict);

  assert.equal(host.requireDecisionOwner("target-binding:csharp"), undefined);
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.decisionOwnerMissing);

  host.registerDecisionOwner("unknown-question", "missing-extension");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.unknownDecisionOwner);
});

test("fact store supports insert, idempotent writes, conflicts, and primitive subjects", () => {
  const host = new ExtensionHost({});
  const subject = {};

  assert.equal(host.facts.set(subject, primitiveFactKey, "int32"), "inserted");
  assert.equal(host.facts.set(subject, primitiveFactKey, "int32"), "idempotent");
  assert.equal(host.facts.get(subject, primitiveFactKey), "int32");
  assert.equal(host.facts.set(subject, primitiveFactKey, "int64"), "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.factConflict);

  assert.equal(host.facts.set("canonical:@tsonic/core/types.js::int", primitiveFactKey, "int32"), "inserted");
  assert.equal(host.facts.get("canonical:@tsonic/core/types.js::int", primitiveFactKey), "int32");
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

test("provider registry requires explicit provider identity and rejects duplicates", () => {
  const host = new ExtensionHost({});
  const provider = dotnetBindingProvider("@tsonic/dotnet/System.Buffers.js");

  assert.equal(host.providers.registerTargetBindingProvider(provider), true);
  assert.equal(host.providers.getTargetBindingProvider("dotnet")?.identity.target, "csharp");
  assert.equal(host.providers.registerTargetBindingProvider(provider), true);

  assert.equal(host.providers.registerTargetBindingProvider(dotnetBindingProvider("@tsonic/dotnet/System.Text.js")), false);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.duplicateProvider);

  const invalidProvider = dotnetBindingProvider("@tsonic/dotnet/Invalid.js", {
    id: "",
    providerKind: "semantic",
  });
  assert.equal(host.providers.registerTargetBindingProvider(invalidProvider), false);
  assert.equal(host.diagnostics.all()[1]?.numericCode, ExtensionHostDiagnosticCode.invalidProvider);
});

test("extensions register binding and semantic providers through initialization context", () => {
  const bindingProvider = dotnetBindingProvider("@tsonic/dotnet/System.Buffers.js");
  const semanticProvider: TargetSemanticProvider = {
    identity: {
      id: "dotnet-semantic",
      version: "1.0.0",
      target: "csharp",
      extensionContractVersion: "1.0.0",
      providerKind: "semantic",
    },
    getParameterMode: () => acceptDecision({
      passing: { mode: "byref-writeonly-must-init" },
    }),
  };
  const host = new ExtensionHost({}, {
    extensions: [
      extension("dotnet", {
        initialize: (context) => {
          assert.equal(context.registerTargetBindingProvider(bindingProvider), true);
          assert.equal(context.registerTargetSemanticProvider(semanticProvider), true);
        },
      }),
    ],
  });

  assert.equal(host.providers.getTargetBindingProvider("dotnet"), bindingProvider);
  assert.equal(host.providers.getTargetSemanticProvider("dotnet-semantic"), semanticProvider);
  assert.equal(host.diagnostics.hasErrors(), false);

  const parameterMode = host.runDecision(ExtensionDecisionQuestion.getParameterMode, {
    parameter: "System.Console.TryParse.result",
    argument: "result",
    target: "csharp",
  }, () => ({ passing: { mode: "by-value" } }), { requireOwner: true });

  assert.equal(parameterMode.kind, "accept");
  assert.equal(parameterMode.kind === "accept" ? parameterMode.value.passing.mode : undefined, "byref-writeonly-must-init");
  assert.equal(parameterMode.kind === "accept" ? parameterMode.extensionId : undefined, "dotnet");
});

test("semantic provider methods own typed decisions without hook boilerplate", () => {
  const expression = {};
  const convertedExpression = {};
  const propertyAccess = {};
  const elementAccess = {};
  const operatorExpression = {};
  const lambda = {};
  const flowUse = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("csharp-target", {
        initialize: (context) => {
          assert.equal(context.registerTargetSemanticProvider({
            identity: {
              id: "dotnet-semantic",
              version: "1.0.0",
              target: "csharp",
              extensionContractVersion: "1.0.0",
              providerKind: "semantic",
            },
            satisfiesConstraint: () => acceptDecision(true),
            isAssignableTo: () => acceptDecision(true),
            resolveCall: () => acceptDecision({
              selectedSignature: selectedSignature("System.Console.WriteLine(System.Int32)"),
              returnType: "void",
            }),
            inferTypeArguments: () => acceptDecision({
              typeArguments: ["int32"],
              targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
            }),
            resolvePropertyAccess: () => acceptDecision({
              operation: surfaceOperation("System.String.Length", "property"),
              resultType: "int32",
            }),
            resolveElementAccess: () => acceptDecision({
              operation: surfaceOperation("System.Span.GetItem", "indexer"),
              resultType: "char",
            }),
            resolveOperator: () => acceptDecision({
              operation: surfaceOperation("System.Int32.op_Addition", "operator"),
              resultType: "int32",
            }),
            getContextualType: () => acceptDecision({
              type: "System.Func<System.Int32,System.Int32>",
              targetType: { kind: "target-named", id: "System.Func`2" },
            }),
            resolveConversion: () => acceptDecision({
              convertedType: { kind: "source-primitive", name: "int32" },
              operation: surfaceOperation("System.Convert.ToInt32", "method"),
            }),
            getParameterMode: () => acceptDecision({
              passing: { mode: "byref-readwrite" },
            }),
            getRuntimeCarrier: () => acceptDecision({
              carrier: { kind: "target-named", id: "System.Int32" },
              requiresAllocation: false,
            }),
            validateFlowUse: () => acceptDecision({
              valid: true,
              targetCompilerValidationRequired: false,
            }),
          }), true);
        },
      }),
    ],
  });

  const constraint = host.runDecision(ExtensionDecisionQuestion.satisfiesConstraint, {
    source: "int32",
    constraint: { kind: "implements", contract: "System.IEquatable`1" },
    target: "csharp",
  }, () => false, { requireOwner: true });
  assert.equal(constraint.kind === "accept" ? constraint.value : false, true);

  const assignable = host.runDecision(ExtensionDecisionQuestion.isAssignableTo, {
    source: "int32",
    target: "long",
    relation: "assignment",
  }, () => false, { requireOwner: true });
  assert.equal(assignable.kind === "accept" ? assignable.value : false, true);

  const call = host.runDecision(ExtensionDecisionQuestion.resolveCall, {
    call: expression,
    callee: "Console.WriteLine",
    arguments: [123],
    target: "csharp",
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });
  assert.equal(call.kind === "accept" ? call.value.selectedSignature.member.id : undefined, "System.Console.WriteLine(System.Int32)");

  const noInferredTypeArguments: InferTypeArgumentsResult = { typeArguments: [] };
  const inferred = host.runDecision(ExtensionDecisionQuestion.inferTypeArguments, {
    declaration: "List<T>.Add",
    arguments: ["value"],
    contextualType: "List<int32>",
  }, () => noInferredTypeArguments, { requireOwner: true });
  assert.deepEqual(inferred.kind === "accept" ? inferred.value.targetTypeArguments : [], [{ kind: "source-primitive", name: "int32" }]);

  const property = host.runDecision(ExtensionDecisionQuestion.resolvePropertyAccess, {
    expression: propertyAccess,
    receiver: "text",
    propertyName: "length",
    target: "csharp",
  }, () => ({ operation: surfaceOperation("core", "property") }), { requireOwner: true });
  assert.equal(property.kind === "accept" ? property.value.operation.operationId : undefined, "System.String.Length");

  const element = host.runDecision(ExtensionDecisionQuestion.resolveElementAccess, {
    expression: elementAccess,
    receiver: "span",
    argument: 0,
    target: "csharp",
  }, () => ({ operation: surfaceOperation("core", "indexer") }), { requireOwner: true });
  assert.equal(element.kind === "accept" ? element.value.operation.operationId : undefined, "System.Span.GetItem");

  const operator = host.runDecision(ExtensionDecisionQuestion.resolveOperator, {
    expression: operatorExpression,
    operator: "+",
    left: "left",
    right: "right",
    target: "csharp",
  }, () => ({ operation: surfaceOperation("core", "operator") }), { requireOwner: true });
  assert.equal(operator.kind === "accept" ? operator.value.operation.operationId : undefined, "System.Int32.op_Addition");

  const contextual = host.runDecision(ExtensionDecisionQuestion.getContextualType, {
    expression: lambda,
    context: "delegate",
    target: "csharp",
  }, () => ({ type: "core" }), { requireOwner: true });
  assert.equal(contextual.kind === "accept" ? contextual.value.type : undefined, "System.Func<System.Int32,System.Int32>");

  const noConversion: ResolveConversionResult = {};
  const conversion = host.runDecision(ExtensionDecisionQuestion.resolveConversion, {
    expression: convertedExpression,
    source: "byte",
    target: "int",
    targetPlatform: "csharp",
  }, () => noConversion, { requireOwner: true });
  assert.equal(conversion.kind === "accept" ? conversion.value.operation?.operationId : undefined, "System.Convert.ToInt32");

  const parameterMode = host.runDecision(ExtensionDecisionQuestion.getParameterMode, {
    parameter: "TryParse.result",
    argument: "result",
    target: "csharp",
  }, () => ({ passing: { mode: "by-value" } }), { requireOwner: true });
  assert.equal(parameterMode.kind === "accept" ? parameterMode.value.passing.mode : undefined, "byref-readwrite");

  const carrier = host.runDecision(ExtensionDecisionQuestion.getRuntimeCarrier, {
    type: "int32",
    target: "csharp",
  }, () => ({ carrier: { kind: "opaque", id: "core" } }), { requireOwner: true });
  assert.equal(carrier.kind === "accept" ? carrier.value.carrier.kind : undefined, "target-named");

  const flow = host.runDecision(ExtensionDecisionQuestion.validateFlowUse, {
    useSite: flowUse,
    symbol: "value",
    mode: "read",
    target: "csharp",
  }, () => ({ valid: false }), { requireOwner: true });
  assert.equal(flow.kind === "accept" ? flow.value.valid : false, true);
  assert.equal(flow.kind === "accept" ? flow.extensionId : undefined, "csharp-target");
});

test("target binding providers own and resolve virtual modules without file-backed side data", () => {
  const specifier = "@tsonic/dotnet/System.Buffers.js";
  const host = new ExtensionHost({});
  host.providers.registerTargetBindingProvider(dotnetBindingProvider(specifier));

  assert.equal(host.providers.getModuleOwner("@tsonic/core/types.js"), undefined);

  const context = {
    containingFile: "/src/example.ts",
    activeTarget: "csharp",
  };
  const result = host.providers.resolveVirtualModule(specifier, context);
  assert.equal(result.kind, "resolved");
  if (result.kind !== "resolved") {
    return;
  }

  assert.equal(result.module.resolution.virtualFileName, "tsts-provider://dotnet/System.Buffers");
  assert.equal(result.module.declarationModel.exports[0]?.name, "SearchValues");
  assert.match(result.module.virtualSourceText, /export declare class SearchValues<T extends unknown>/);
  assert.match(result.module.virtualSourceText, /Contains\(value: T\): boolean;/);
  const cached = host.providers.resolveVirtualModule(specifier, context);
  assert.equal(cached.kind, "resolved");
  if (cached.kind === "resolved") {
    assert.equal(cached.module, result.module);
  }
  assert.equal(result.module.provider.getTargetIdentity({
    moduleSpecifier: specifier,
    exportName: "SearchValues",
  })?.id, "System.Buffers.SearchValues`1");

  assert.equal(host.providers.resolveVirtualModule("@tsonic/dotnet/Unknown.js").kind, "unowned");
});

test("provider ownership conflicts and invalid declaration models are diagnostics", () => {
  const specifier = "@tsonic/dotnet/System.Buffers.js";
  const conflictHost = new ExtensionHost({});
  conflictHost.providers.registerTargetBindingProvider(dotnetBindingProvider(specifier, { id: "first" }));
  conflictHost.providers.registerTargetBindingProvider(dotnetBindingProvider(specifier, { id: "second" }));

  assert.equal(conflictHost.providers.resolveVirtualModule(specifier).kind, "conflict");
  assert.equal(conflictHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerOwnershipConflict);

  const invalidHost = new ExtensionHost({});
  invalidHost.providers.registerTargetBindingProvider(dotnetBindingProvider(specifier, {
    declarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: "wrong-provider-module-id",
      exports: [],
    }),
  }));

  assert.equal(invalidHost.providers.resolveVirtualModule(specifier).kind, "rejected");
  assert.equal(invalidHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidProviderDeclaration);
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
  const host = new ExtensionHost({}, {
    extensions: [
      extension("source-core", {
        initialize: (context) => {
          context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
            if (request.sourceFile === sourceFile && request.fileName === "/src/index.ts") {
              context.facts.set(request.sourceFile, primitiveFactKey, "int32");
            }
          });
          context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, () => {
            context.facts.set("finalization-marker", primitiveFactKey, "int64");
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
  assert.equal(host.facts.get("finalization-marker", primitiveFactKey), "int64");
  assert.equal(host.facts.set("after-finalize", primitiveFactKey, "uint32"), "sealed");
});

test("canonical identity facts are consumer-queryable after finalization", () => {
  const host = new ExtensionHost({});
  const localAlias = {};

  host.facts.set(localAlias, canonicalIdentityFactKey, {
    kind: "export",
    id: "@tsonic/core/types.js::int",
    packageName: "@tsonic/core",
    packageVersion: "1.0.0",
    subpath: "types.js",
    exportName: "int",
    importKind: "type",
    canonicalSymbolId: "@tsonic/core/types.js::int",
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

  host.facts.set(call, selectedTargetSignatureFactKey, selectedSignature("System.Console.WriteLine(System.Int32)"));
  host.facts.set(propertyAccess, surfaceOperationFactKey, surfaceOperation("System.String.Length", "property"));
  host.facts.set(argument, argumentPassingFactKey, { mode: "byref-readonly" });
  host.facts.set(runtimeType, runtimeCarrierFactKey, {
    carrier: { kind: "target-named", id: "System.Int32" },
    requiresAllocation: false,
  });

  const consumer = createExtensionConsumerQueries(host, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call), undefined);
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.consumerBeforeFinalization);

  host.finalizeSemantics();
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "System.Console.WriteLine(System.Int32)");
  assert.equal(consumer.getSelectedTargetProperty(propertyAccess)?.operationId, "System.String.Length");
  assert.equal(consumer.getArgumentPassingFact(argument)?.mode, "byref-readonly");
  assert.equal(consumer.getRuntimeCarrierFact(runtimeType)?.carrier.kind, "target-named");
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

test("diagnostics are deduplicated by stable identity", () => {
  const host = new ExtensionHost({});

  host.requireDecisionOwner("target-binding:csharp");
  host.requireDecisionOwner("target-binding:csharp");

  const ownerMissingDiagnostics = host.diagnostics.all().filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.decisionOwnerMissing);
  assert.equal(ownerMissingDiagnostics.length, 1);
});

test("constraint and assignability decisions use owner hooks instead of core fallback", () => {
  const intType = {};
  const searchValuesConstraint = { kind: "implements", contract: "System.IEquatable`1" } as const;
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
      extension("csharp", {
        dependsOn: ["source"],
        decisionOwners: [ExtensionDecisionQuestion.satisfiesConstraint, ExtensionDecisionQuestion.isAssignableTo],
        initialize: (context) => {
          context.registerDecisionHook<SatisfiesConstraintRequest, boolean>(ExtensionDecisionQuestion.satisfiesConstraint, (request) => {
            if (request.source === intType && request.constraint === searchValuesConstraint) {
              return acceptDecision(true, [{ message: "int32 maps to System.Int32 and implements IEquatable<System.Int32>" }]);
            }
            return deferDecision;
          });
          context.registerDecisionHook<AssignabilityRequest, boolean>(ExtensionDecisionQuestion.isAssignableTo, (request) => {
            if (request.source === intType && request.target === "long") {
              return acceptDecision(true);
            }
            return rejectDecision<boolean>(diagnostic("csharp", "ASSIGNABILITY_REJECTED", 9100001, "source type is not assignable to target type"));
          });
        },
      }),
    ],
  });

  const constraintResult = host.runDecision(ExtensionDecisionQuestion.satisfiesConstraint, {
    source: intType,
    constraint: searchValuesConstraint,
    target: "csharp",
  }, () => {
    coreCalled = true;
    return false;
  }, { requireOwner: true });

  assert.equal(constraintResult.kind, "accept");
  assert.equal(constraintResult.kind === "accept" ? constraintResult.value : false, true);
  assert.equal(coreCalled, false);

  const assignabilityResult = host.runDecision(ExtensionDecisionQuestion.isAssignableTo, {
    source: intType,
    target: "string",
    relation: "assignment",
  }, () => true, { requireOwner: true });

  assert.equal(assignabilityResult.kind, "reject");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "ASSIGNABILITY_REJECTED");
});

test("required extension-owned questions cannot fall back when owner is absent or deferred", () => {
  const missingOwnerHost = new ExtensionHost({});
  const missing = missingOwnerHost.runDecision(ExtensionDecisionQuestion.resolveCall, {
    call: {},
    callee: "Console.WriteLine",
    arguments: [123],
  }, () => "core", { requireOwner: true });

  assert.equal(missing.kind, "missing-owner");
  assert.equal(missingOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.decisionOwnerMissing);

  const deferredOwnerHost = new ExtensionHost({}, {
    extensions: [
      extension("csharp", {
        decisionOwners: [ExtensionDecisionQuestion.resolveCall],
        initialize: (context) => {
          context.registerDecisionHook(ExtensionDecisionQuestion.resolveCall, () => deferDecision);
        },
      }),
    ],
  });
  const deferred = deferredOwnerHost.runDecision(ExtensionDecisionQuestion.resolveCall, {
    call: {},
    callee: "Console.WriteLine",
    arguments: [123],
  }, () => "core", { requireOwner: true });

  assert.equal(deferred.kind, "owner-deferred");
  assert.equal(deferredOwnerHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.decisionOwnerDeferred);
});

test("unowned multiple extension decisions produce deterministic conflict", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("a", {
        initialize: (context) => context.registerDecisionHook("demo.question", () => acceptDecision("a")),
      }),
      extension("b", {
        initialize: (context) => context.registerDecisionHook("demo.question", () => acceptDecision("b")),
      }),
    ],
  });

  const result = host.runDecision("demo.question", {}, () => "core");
  assert.equal(result.kind, "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.decisionConflict);
});

test("owned multiple non-deferred decisions produce deterministic conflict", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("owner", {
        decisionOwners: ["demo.question"],
        initialize: (context) => {
          context.registerDecisionHook("demo.question", () => acceptDecision("first"));
          context.registerDecisionHook("demo.question", () => acceptDecision("second"));
        },
      }),
    ],
  });

  const result = host.runDecision("demo.question", {}, () => "core", { requireOwner: true });
  assert.equal(result.kind, "conflict");
  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.decisionConflict);
});

test("target extension composition requires explicit multi-target mode", () => {
  const host = new ExtensionHost({}, {
    extensions: [
      extension("csharp", { composition: { kind: "target", target: "csharp" } }),
      extension("rust", { composition: { kind: "target", target: "rust" } }),
    ],
  });

  assert.equal(host.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.multipleTargetExtensions);

  const multiTargetHost = new ExtensionHost({}, {
    allowMultipleTargets: true,
    extensions: [
      extension("csharp", { composition: { kind: "target", target: "csharp" } }),
      extension("rust", { composition: { kind: "target", target: "rust" } }),
    ],
  });

  assert.equal(multiTargetHost.diagnostics.hasErrors(), false);
});

test("call resolution records selected target signature facts", () => {
  const call = {};
  const writeLineInt = selectedSignature("System.Console.WriteLine(System.Int32)");
  const host = new ExtensionHost({}, {
    extensions: [
      extension("csharp", {
        decisionOwners: [ExtensionDecisionQuestion.resolveCall],
        initialize: (context) => {
          context.registerDecisionHook<ResolveCallRequest, ResolveCallResult>(ExtensionDecisionQuestion.resolveCall, (request) => {
            if (request.call === call) {
              context.facts.set(request.call, selectedTargetSignatureFactKey, writeLineInt);
              return acceptDecision({
                selectedSignature: writeLineInt,
                returnType: "void",
              });
            }
            return deferDecision;
          });
        },
      }),
    ],
  });

  const result = host.runDecision(ExtensionDecisionQuestion.resolveCall, {
    call,
    callee: "Console.WriteLine",
    arguments: [123],
    target: "csharp",
  }, () => ({ selectedSignature: selectedSignature("core") }), { requireOwner: true });

  assert.equal(result.kind, "accept");
  assert.equal(host.facts.get(call, selectedTargetSignatureFactKey)?.member.id, "System.Console.WriteLine(System.Int32)");
});

test("property, element, and operator decisions expose surface operations", () => {
  const lengthExpression = {};
  const indexExpression = {};
  const addExpression = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("surface", {
        decisionOwners: [
          ExtensionDecisionQuestion.resolvePropertyAccess,
          ExtensionDecisionQuestion.resolveElementAccess,
          ExtensionDecisionQuestion.resolveOperator,
        ],
        initialize: (context) => {
          context.registerDecisionHook<ResolvePropertyAccessRequest, ResolveOperationResult>(ExtensionDecisionQuestion.resolvePropertyAccess, (request) => {
            const operation = surfaceOperation("System.Array.Length", "property");
            context.facts.set(request.expression, surfaceOperationFactKey, operation);
            return acceptDecision({ operation, resultType: "int32" });
          });
          context.registerDecisionHook<ResolveElementAccessRequest, ResolveOperationResult>(ExtensionDecisionQuestion.resolveElementAccess, (request) => {
            const operation = surfaceOperation("System.Array.Get", "indexer");
            context.facts.set(request.expression, surfaceOperationFactKey, operation);
            return acceptDecision({ operation, resultType: "element" });
          });
          context.registerDecisionHook<ResolveOperatorRequest, ResolveOperationResult>(ExtensionDecisionQuestion.resolveOperator, (request) => {
            const operation = surfaceOperation("System.Int32.op_Addition", "operator");
            context.facts.set(request.expression, surfaceOperationFactKey, operation);
            return acceptDecision({ operation, resultType: "int32" });
          });
        },
      }),
    ],
  });

  assert.equal(host.runDecision(ExtensionDecisionQuestion.resolvePropertyAccess, { expression: lengthExpression, receiver: "array", propertyName: "Length" }, () => undefined, { requireOwner: true }).kind, "accept");
  assert.equal(host.runDecision(ExtensionDecisionQuestion.resolveElementAccess, { expression: indexExpression, receiver: "array", argument: 0 }, () => undefined, { requireOwner: true }).kind, "accept");
  assert.equal(host.runDecision(ExtensionDecisionQuestion.resolveOperator, { expression: addExpression, operator: "+", left: "a", right: "b" }, () => undefined, { requireOwner: true }).kind, "accept");

  assert.equal(host.facts.get(lengthExpression, surfaceOperationFactKey)?.operationId, "System.Array.Length");
  assert.equal(host.facts.get(indexExpression, surfaceOperationFactKey)?.operationId, "System.Array.Get");
  assert.equal(host.facts.get(addExpression, surfaceOperationFactKey)?.operationId, "System.Int32.op_Addition");
});

test("contextual typing and generic inference decisions preserve target facts", () => {
  const lambda = {};
  const listGetItem = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("target", {
        decisionOwners: [ExtensionDecisionQuestion.getContextualType, ExtensionDecisionQuestion.inferTypeArguments],
        initialize: (context) => {
          context.registerDecisionHook(ExtensionDecisionQuestion.getContextualType, (request) => acceptDecision({
            type: "Func<int32,int32>",
            targetType: { kind: "target-named", id: "System.Func`2" },
          }));
          context.registerDecisionHook(ExtensionDecisionQuestion.inferTypeArguments, () => acceptDecision({
            typeArguments: ["int32"],
            targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
          }));
        },
      }),
    ],
  });

  const contextual = host.runDecision(ExtensionDecisionQuestion.getContextualType, { expression: lambda, context: "delegate" }, () => ({ type: "core" }), { requireOwner: true });
  assert.equal(contextual.kind === "accept" ? contextual.value.type : undefined, "Func<int32,int32>");

  const inferred = host.runDecision(ExtensionDecisionQuestion.inferTypeArguments, { declaration: listGetItem, arguments: [0] }, () => ({ typeArguments: [] }), { requireOwner: true });
  assert.deepEqual(inferred.kind === "accept" ? inferred.value.typeArguments : [], ["int32"]);
});

test("flow validation supports local rejection and target compiler validation facts", () => {
  const movedUse = {};
  const returnedBorrow = {};
  const host = new ExtensionHost({}, {
    extensions: [
      extension("rust", {
        decisionOwners: [ExtensionDecisionQuestion.validateFlowUse],
        initialize: (context) => {
          context.registerDecisionHook<ValidateFlowUseRequest, ValidateFlowUseResult>(ExtensionDecisionQuestion.validateFlowUse, (request) => {
            if (request.useSite === movedUse) {
              context.facts.set(request.useSite, flowStateFactKey, { state: "moved" });
              return rejectDecision(diagnostic("rust", "VALUE_WAS_MOVED", 9100101, "value was moved and cannot be used here"));
            }
            if (request.useSite === returnedBorrow) {
              context.facts.set(request.useSite, flowStateFactKey, {
                state: "target-validation-required",
                targetCompiler: "rustc",
              });
              return acceptDecision({
                valid: true,
                targetCompilerValidationRequired: true,
                targetCompiler: "rustc",
              });
            }
            return deferDecision;
          });
        },
      }),
    ],
  });

  const rejected = host.runDecision<ValidateFlowUseRequest, ValidateFlowUseResult>(ExtensionDecisionQuestion.validateFlowUse, { useSite: movedUse, symbol: "value", mode: "read", target: "rust" }, () => ({ valid: true }), { requireOwner: true });
  assert.equal(rejected.kind, "reject");
  assert.equal(host.facts.get(movedUse, flowStateFactKey)?.state, "moved");

  const accepted = host.runDecision<ValidateFlowUseRequest, ValidateFlowUseResult>(ExtensionDecisionQuestion.validateFlowUse, { useSite: returnedBorrow, symbol: "view", mode: "read", target: "rust" }, () => ({ valid: false }), { requireOwner: true });
  assert.equal(accepted.kind === "accept" ? accepted.value.targetCompiler : undefined, "rustc");
  assert.equal(host.facts.get(returnedBorrow, flowStateFactKey)?.targetCompiler, "rustc");
});

test("advanced associated-type and const-generic facts are first-class", () => {
  const iteratorType = {};
  const fixedBytesType = {};
  const host = new ExtensionHost({});

  assert.equal(host.facts.set(iteratorType, associatedTypeFactKey, {
    owner: iteratorType,
    name: "Item",
    value: "int32",
  }), "inserted");
  assert.equal(host.facts.set(fixedBytesType, constGenericFactKey, {
    name: "N",
    value: 32,
  }), "inserted");

  assert.equal(host.facts.get(iteratorType, associatedTypeFactKey)?.value, "int32");
  assert.equal(host.facts.get(fixedBytesType, constGenericFactKey)?.value, 32);
});

test("target binding facts preserve provider identity and constraints", () => {
  const searchValues = {};
  const fact: TargetBindingFact = {
    id: "System.Buffers.SearchValues`1",
    sourceName: "SearchValues",
    targetName: "System.Buffers.SearchValues`1",
    target: "csharp",
    kind: "struct",
    typeParameters: [{
      name: "T",
      constraints: [{
        kind: "implements",
        contract: "System.IEquatable`1",
        typeArguments: [{ kind: "type-parameter", name: "T" }],
      }],
    }],
  };
  const host = new ExtensionHost({});

  assert.equal(host.facts.set(searchValues, targetBindingFactKey, fact), "inserted");
  assert.equal(host.facts.get(searchValues, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0]?.kind, "implements");
});

function dotnetBindingProvider(
  ownedSpecifier: string,
  options: {
    readonly id?: string;
    readonly providerKind?: TargetBindingProvider["identity"]["providerKind"];
    readonly declarationModel?: (resolution: ProviderModuleResolution) => ProviderDeclarationModel;
  } = {},
): TargetBindingProvider {
  const moduleId = "dotnet:System.Buffers";
  const targetIdentity: TargetIdentity = {
    target: "csharp",
    id: "System.Buffers.SearchValues`1",
    displayName: "System.Buffers.SearchValues<T>",
  };
  return {
    identity: {
      id: options.id ?? "dotnet",
      version: "1.0.0",
      target: "csharp",
      extensionContractVersion: "1.0.0",
      providerKind: options.providerKind ?? "binding",
    },
    ownsModule: (specifier) => specifier === ownedSpecifier
      ? { kind: "owned", evidence: [{ message: "owned by the .NET target binding provider" }] }
      : { kind: "unowned" },
    resolveModule: (specifier) => ({
      kind: "virtual",
      moduleSpecifier: specifier,
      virtualFileName: "tsts-provider://dotnet/System.Buffers",
      providerModuleId: moduleId,
      packageName: "@tsonic/dotnet",
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
            returnType: { kind: "source-primitive", name: "boolean" },
          }],
        }],
      }],
    })),
    getTargetIdentity: (symbol) => symbol.moduleSpecifier === ownedSpecifier && symbol.exportName === "SearchValues"
      ? targetIdentity
      : undefined,
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

function surfaceOperation(operationId: string, sourceOperation: SurfaceOperationFact["sourceOperation"]): SurfaceOperationFact {
  return {
    operationId,
    sourceOperation,
    targetOperation: operationId,
  };
}
