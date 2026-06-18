import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionHost,
  ExtensionHostDiagnosticCode,
  ExtensionDiagnosticStore,
  ExtensionMetadataRegistry,
  ExtensionDecisionQuestion,
  acceptDecision,
  attachExtensionHost,
  associatedTypeFactKey,
  constGenericFactKey,
  defineExtensionFactKey,
  deferDecision,
  flowStateFactKey,
  getExtensionHost,
  hasExtensionHost,
  rejectDecision,
  selectedTargetSignatureFactKey,
  sourcePrimitiveFactKey,
  surfaceOperationFactKey,
  targetBindingFactKey,
} from "./index.js";
import type {
  AssignabilityRequest,
  CompilerExtension,
  ExtensionDiagnostic,
  ResolveCallRequest,
  ResolveCallResult,
  ResolveElementAccessRequest,
  ResolveOperationResult,
  ResolveOperatorRequest,
  ResolvePropertyAccessRequest,
  SatisfiesConstraintRequest,
  SelectedTargetSignatureFact,
  SurfaceOperationFact,
  TargetBindingFact,
  TargetBindingMetadataHeader,
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
    ...(options.decisionOwners !== undefined ? { decisionOwners: options.decisionOwners } : {}),
    ...(options.initialize !== undefined ? { initialize: options.initialize } : {}),
  };
}

function metadata(overrides: Partial<TargetBindingMetadataHeader> = {}): TargetBindingMetadataHeader {
  return {
    schema: "tsts.target-bindings",
    schemaVersion: "1.0.0",
    producer: "@example/bindgen",
    producerVersion: "1.0.0",
    target: "csharp",
    packageName: "@example/dotnet",
    packageVersion: "1.0.0",
    extensionContractVersion: "1.0.0",
    ...overrides,
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
  const duplicateHost = new ExtensionHost({}, {
    extensions: [extension("source"), extension("source")],
  });
  assert.equal(duplicateHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.duplicateExtension);

  const missingHost = new ExtensionHost({}, {
    extensions: [extension("target", { dependsOn: ["source"] })],
  });
  assert.equal(missingHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.missingDependency);

  const cycleHost = new ExtensionHost({}, {
    extensions: [
      extension("a", { dependsOn: ["b"] }),
      extension("b", { dependsOn: ["a"] }),
    ],
  });
  assert.equal(cycleHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.dependencyCycle);
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

test("metadata registry requires schema and producer identity", () => {
  const diagnostics = new ExtensionDiagnosticStore();
  const registry = new ExtensionMetadataRegistry(diagnostics);

  assert.equal(registry.registerTargetMetadata(metadata()), true);
  assert.equal(registry.getTargetMetadata("csharp", "@example/dotnet", "1.0.0")?.producer, "@example/bindgen");

  assert.equal(registry.registerTargetMetadata(metadata({ schema: "unknown.schema" })), false);
  assert.equal(diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.invalidMetadata);

  assert.equal(registry.registerTargetMetadata(metadata({ packageName: "" })), false);
  assert.equal(diagnostics.all()[1]?.numericCode, ExtensionHostDiagnosticCode.invalidMetadata);
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

  assert.equal(host.facts.set({}, primitiveFactKey, "int64"), "sealed");
  assert.equal(host.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.factStoreSealed);
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

test("target binding facts preserve metadata identity and constraints", () => {
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
