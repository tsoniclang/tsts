import assert from "node:assert/strict";
import { test } from "node:test";
import type { SelectedTargetSignatureFact, TargetTypeRef } from "./facts.js";
import { ExtensionObservationPoint } from "./observations.js";
import {
  createCheckedOperationRequestSnapshotCache,
  snapshotCheckedOperationRequest,
  snapshotCheckedOperationResponse,
  snapshotCheckedOperationResult,
  snapshotSelectedTargetSignatureFact,
  snapshotTargetOperationFact,
} from "./checked-operation-value-snapshot.js";

test("checked-operation snapshots clone, freeze, and preserve sharing in evidence details", () => {
  const shared = { values: ["before"] };
  const details = { left: shared, right: shared };
  const result = snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
    kind: "accept",
    extensionId: "acme",
    value: {},
    evidence: [{ message: "selection", details }],
  });

  assert.equal(result.kind, "accept");
  if (result.kind !== "accept") {
    throw new Error("Expected accepted checked-operation result.");
  }
  const retainedDetails = result.evidence?.[0]?.details as {
    readonly left: { readonly values: readonly string[] };
    readonly right: { readonly values: readonly string[] };
  };
  shared.values[0] = "after";

  assert.notEqual(retainedDetails, details);
  assert.notEqual(retainedDetails.left, shared);
  assert.equal(retainedDetails.left, retainedDetails.right);
  assert.deepEqual(retainedDetails.left.values, ["before"]);
  assert.equal(Object.isFrozen(retainedDetails), true);
  assert.equal(Object.isFrozen(retainedDetails.left), true);
  assert.equal(Object.isFrozen(retainedDetails.left.values), true);
});

test("checked-operation schema accessors are rejected without invoking them", () => {
  let reads = 0;
  const response = Object.create(null) as Record<string, unknown>;
  Object.defineProperty(response, "convertedType", {
    enumerable: true,
    get() {
      reads += 1;
      return undefined;
    },
  });

  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, response),
    /data property; accessors are unsupported/,
  );
  assert.equal(reads, 0);
});

test("checked-operation schema values are read from validated own descriptors, not proxy get traps", () => {
  const target = { convertedType: { kind: "source-primitive", name: "int32" } };
  let reads = 0;
  const response = new Proxy(target, {
    get() {
      reads += 1;
      throw new Error("schema get trap was invoked");
    },
  });

  const snapshot = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, response);
  assert.deepEqual(snapshot.convertedType, { kind: "source-primitive", name: "int32" });
  assert.equal(reads, 0);
});

test("checked access snapshots enforce discriminated read and write evidence", () => {
  const subject = {};
  const read = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedPropertyAccess, {
    sourceOperationKind: "property-access",
    expression: subject,
    receiver: subject,
    propertyName: "value",
    sourceReceiver: sourceValue(subject),
    accessMode: "read",
    use: "call-callee",
    sourceReadResult: sourceValue(subject),
    chainRole: { kind: "optional-chain", participant: "property-access", position: "root", boundary: "outermost" },
  });
  if (read.accessMode !== "read") {
    throw new Error("Expected read property evidence.");
  }
  assert.equal(read.sourceReadResult.expression, subject);
  assert.equal(Object.isFrozen(read.sourceReadResult), true);

  const write = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedPropertyAccess, {
    sourceOperationKind: "property-access",
    expression: subject,
    receiver: subject,
    propertyName: "value",
    sourceReceiver: sourceValue(subject),
    accessMode: "write",
    use: "value",
    sourceWriteType: { type: subject },
    chainRole: { kind: "ordinary", participant: "property-access" },
  });
  if (write.accessMode !== "write") {
    throw new Error("Expected write property evidence.");
  }
  assert.equal(write.sourceWriteType.type, subject);
  assert.equal(Object.isFrozen(write.sourceWriteType), true);

  const invalidRead = {
    sourceOperationKind: "property-access" as const,
    expression: subject,
    receiver: subject,
    propertyName: "value",
    sourceReceiver: sourceValue(subject),
    accessMode: "read" as const,
    use: "value" as const,
    sourceReadResult: sourceValue(subject),
    sourceWriteType: { type: subject },
    chainRole: { kind: "ordinary" as const, participant: "property-access" as const },
  };
  assert.throws(
    () => Reflect.apply(snapshotCheckedOperationRequest, undefined, [ExtensionObservationPoint.mapCheckedPropertyAccess, invalidRead]),
    /unsupported field 'sourceWriteType'/,
  );
});

test("checked-operation records reject custom prototypes, symbols, and hidden fields", () => {
  const inherited = Object.create({ convertedType: undefined }) as Record<string, unknown>;
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, inherited),
    /expected Object\.prototype or null prototype/,
  );

  const symbolField = { convertedType: { kind: "source-primitive", name: "int32" } } as Record<PropertyKey, unknown>;
  symbolField[Symbol("hidden")] = true;
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, symbolField),
    /symbol fields are unsupported/,
  );

  const hiddenField = { convertedType: { kind: "source-primitive", name: "int32" } } as Record<string, unknown>;
  Object.defineProperty(hiddenField, "hidden", { enumerable: false, value: true });
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, hiddenField),
    /hidden own field 'hidden' is unsupported/,
  );
});

test("checked-operation arrays reject sparse, accessor, symbol, and custom-prototype shapes", () => {
  const sparseEvidence = new Array(1);
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: sparseEvidence,
    }),
    /arrays must be dense/,
  );

  let reads = 0;
  const accessorEvidence: unknown[] = [];
  Object.defineProperty(accessorEvidence, "0", {
    enumerable: true,
    configurable: true,
    get() {
      reads += 1;
      return { message: "not read" };
    },
  });
  accessorEvidence.length = 1;
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      // @ts-expect-error The malformed array is intentionally outside the public evidence type.
      evidence: accessorEvidence,
    }),
    /array accessors are unsupported/,
  );
  assert.equal(reads, 0);

  const symbolEvidence: unknown[] = [{ message: "entry" }];
  Object.defineProperty(symbolEvidence, Symbol("extra"), { enumerable: true, value: true });
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      // @ts-expect-error The symbol-bearing array is intentionally outside the public evidence type.
      evidence: symbolEvidence,
    }),
    /arrays must be dense and contain no extra or symbol fields/,
  );

  const customPrototypeEvidence: unknown[] = [{ message: "entry" }];
  Object.setPrototypeOf(customPrototypeEvidence, Object.create(Array.prototype));
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      // @ts-expect-error The custom-prototype array is intentionally outside the public evidence type.
      evidence: customPrototypeEvidence,
    }),
    /array subclasses and custom array prototypes are unsupported/,
  );
});

test("evidence details accept only bounded immutable data graphs", () => {
  class UnsupportedDetails {
    readonly value = 1;
  }
  const cyclic: Record<string, unknown> = {};
  cyclic.self = cyclic;
  const accessor: Record<string, unknown> = {};
  Object.defineProperty(accessor, "value", { enumerable: true, get: () => 1 });
  const symbolKey: Record<PropertyKey, unknown> = { value: 1 };
  symbolKey[Symbol("extra")] = 2;
  const unsupported = [
    new UnsupportedDetails(),
    cyclic,
    accessor,
    symbolKey,
    () => 1,
    Symbol("details"),
    1n,
    Number.NaN,
  ];

  for (const details of unsupported) {
    assert.throws(() => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: [{ message: "invalid", details }],
    }));
  }
});

test("snapshot limits reject excessive strings, arrays, and depth", () => {
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: [{ message: "limit", details: "x".repeat(1_048_577) }],
    }),
    /string-code-unit limit/,
  );

  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: [{ message: "limit", details: new Array(65_537).fill(null) }],
    }),
    /per-array limit/,
  );

  let deeplyNested: unknown = "leaf";
  for (let depth = 0; depth < 130; depth += 1) {
    deeplyNested = { child: deeplyNested };
  }
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: [{ message: "limit", details: deeplyNested }],
    }),
    /maximum nesting depth/,
  );

  const tooManyObjects = Array.from({ length: 16_385 }, () => ({}));
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "accept",
      extensionId: "acme",
      value: {},
      evidence: [{ message: "limit", details: tooManyObjects }],
    }),
    /maximum object count/,
  );
});

test("failed snapshots cannot poison reusable request caches", () => {
  const subject = {};
  const parameter = {
    name: "before",
    type: { kind: "source-primitive" as const, name: "int32" as const },
    passingMode: "by-value" as const,
  };
  const selection = selectedSignature(subject, parameter);
  const cache = createCheckedOperationRequestSnapshotCache();
  Object.defineProperty(selection, "sourceChainRole", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
      kind: "optional-chain",
      participant: "call",
      position: "invalid",
      boundary: "outermost",
    },
  });

  assert.throws(
    () => snapshotSelectedTargetSignatureFact(selection, cache),
    /CheckedSourceChainRole position/,
  );

  parameter.name = "after";
  Object.defineProperty(selection, "sourceChainRole", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { kind: "ordinary", participant: "call" },
  });
  const snapshot = snapshotSelectedTargetSignatureFact(selection, cache);
  assert.equal(snapshot.member.parameters[0]?.name, "after");
});

test("reusable request caches preserve canonical snapshots and reject later source mutation", () => {
  const subject = {};
  const parameter = {
    name: "value",
    type: { kind: "source-primitive" as const, name: "int32" as const },
    passingMode: "by-value" as const,
  };
  const selection = selectedSignature(subject, parameter);
  const cache = createCheckedOperationRequestSnapshotCache();
  const first = snapshotSelectedTargetSignatureFact(selection, cache);
  const second = snapshotSelectedTargetSignatureFact(selection, cache);

  assert.equal(second, first);
  assert.equal(second.member.parameters[0], first.member.parameters[0]);

  parameter.name = "changed";
  assert.throws(
    () => snapshotSelectedTargetSignatureFact(selection, cache),
    /source object changed after its reusable snapshot was committed/,
  );
});

test("only codec-created request caches are accepted", () => {
  const subject = {};
  const parameter = {
    name: "value",
    type: { kind: "source-primitive" as const, name: "int32" as const },
    passingMode: "by-value" as const,
  };
  assert.throws(
    () => snapshotSelectedTargetSignatureFact(
      selectedSignature(subject, parameter),
      {} as ReturnType<typeof createCheckedOperationRequestSnapshotCache>,
    ),
    /cache was not created/,
  );
});

test("target type snapshots preserve DAG sharing and reject schema cycles", () => {
  const shared: TargetTypeRef = { kind: "target-named", id: "Acme.Shared" };
  const response = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
    convertedType: { kind: "tuple", elements: [shared, shared] },
  });
  assert.equal(response.convertedType?.kind, "tuple");
  if (response.convertedType?.kind !== "tuple") {
    throw new Error("Expected tuple target type.");
  }
  assert.equal(response.convertedType.elements[0], response.convertedType.elements[1]);

  const cyclic = { kind: "array" } as { kind: "array"; element: TargetTypeRef };
  cyclic.element = cyclic;
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, { convertedType: cyclic }),
    /cycle references the active TargetTypeRef/,
  );
});

test("iteration snapshots retain exact protocol and adapted-index evidence", () => {
  const subject = {};
  const knownProtocol = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedIteration, {
    sourceOperationKind: "iteration",
    statement: subject,
    expression: subject,
    iterationKind: "for-of",
    mechanism: {
      kind: "synchronous-iterator-protocol",
      sourceAlternative: { type: subject },
      protocol: {
        resolutionKind: "known-iterable-instantiation",
        iterableTarget: { type: subject },
        iterableDeclarations: [subject],
        iterationTypes: {
          yieldType: { type: subject },
          returnType: { type: subject },
          nextType: { type: subject },
        },
      },
    },
    sourceIterable: sourceValue(subject),
    sourceElement: { type: subject },
  });
  assert.equal(knownProtocol.iterationKind, "for-of");
  if (knownProtocol.iterationKind !== "for-of" || knownProtocol.mechanism.kind !== "synchronous-iterator-protocol") {
    throw new Error("Expected synchronous iterator protocol evidence.");
  }
  assert.equal(knownProtocol.mechanism.protocol.resolutionKind, "known-iterable-instantiation");
  assert.equal(Object.isFrozen(knownProtocol.mechanism.protocol), true);

  const adaptedIndex = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedIteration, {
    sourceOperationKind: "iteration",
    statement: subject,
    expression: subject,
    iterationKind: "for-await-of",
    mechanism: {
      kind: "array-like-index-adapted-to-async",
      sourceAlternative: { type: subject },
      selectedIndex: { type: subject },
    },
    sourceIterable: sourceValue(subject),
    sourceElement: { type: subject },
  });
  assert.equal(adaptedIndex.iterationKind, "for-await-of");
  if (adaptedIndex.iterationKind !== "for-await-of") {
    throw new Error("Expected for-await-of evidence.");
  }
  assert.equal(adaptedIndex.mechanism.kind, "array-like-index-adapted-to-async");
});

test("target-specific target types accept only an opaque payload id", () => {
  const snapshot = snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
    convertedType: { kind: "target-specific", target: "acme", name: "handle", payloadId: "handle-1" },
  });
  assert.deepEqual(snapshot.convertedType, {
    kind: "target-specific",
    target: "acme",
    name: "handle",
    payloadId: "handle-1",
  });
  assert.throws(
    () => snapshotCheckedOperationResponse(ExtensionObservationPoint.mapCheckedConversion, {
      convertedType: { kind: "target-specific", target: "acme", name: "handle", value: {} },
    }),
    /unsupported field 'value'/,
  );
});

test("retained source-operation provenance rejects request-only target fields", () => {
  const subject = {};
  const sourceOperation = {
    sourceOperationKind: "property-access" as const,
    expression: subject,
    receiver: subject,
    propertyName: "value",
    sourceReceiver: sourceValue(subject),
    accessMode: "read" as const,
    use: "value" as const,
    sourceReadResult: sourceValue(subject),
    chainRole: { kind: "ordinary" as const, participant: "property-access" as const },
    target: "acme",
  };
  assert.throws(
    () => snapshotTargetOperationFact({
      operationId: "acme.read",
      operationKind: "property",
      targetOperation: "acme.read",
      provenance: { sourceOperation },
    }),
    /unsupported field 'target'/,
  );
});

test("diagnostic spans are descriptor-captured, cloned, and frozen", () => {
  const sourceFile = {};
  const span = { sourceFile, pos: 7, end: 11 };
  const result = snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
    kind: "reject",
    extensionId: "acme",
    diagnostic: {
      extensionId: "acme",
      extensionCode: "INVALID_VALUE",
      numericCode: 9100001,
      category: "error",
      message: "Invalid value.",
      nodeOrSpan: span,
    },
  });
  assert.equal(result.kind, "reject");
  if (result.kind !== "reject") {
    throw new Error("Expected rejected checked-operation result.");
  }
  const retainedSpan = result.diagnostic.nodeOrSpan as { readonly sourceFile: object; readonly pos: number; readonly end: number };
  span.pos = 100;
  span.end = 101;

  assert.notEqual(retainedSpan, span);
  assert.equal(retainedSpan.sourceFile, sourceFile);
  assert.equal(retainedSpan.pos, 7);
  assert.equal(retainedSpan.end, 11);
  assert.equal(Object.isFrozen(retainedSpan), true);
});

test("diagnostic span accessors are rejected without invocation", () => {
  let reads = 0;
  const span = Object.create(null) as Record<string, unknown>;
  Object.defineProperties(span, {
    sourceFile: { enumerable: true, value: {} },
    pos: {
      enumerable: true,
      get() {
        reads += 1;
        return 0;
      },
    },
    end: { enumerable: true, value: 1 },
  });
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "reject",
      extensionId: "acme",
      diagnostic: {
        extensionId: "acme",
        extensionCode: "INVALID_VALUE",
        numericCode: 9100001,
        category: "error",
        message: "Invalid value.",
        nodeOrSpan: span,
      },
    }),
    /data property; accessors are unsupported/,
  );
  assert.equal(reads, 0);

  const customPrototypeSpan = Object.assign(Object.create({}), { sourceFile: {}, pos: 0, end: 1 });
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "reject",
      extensionId: "acme",
      diagnostic: {
        extensionId: "acme",
        extensionCode: "INVALID_VALUE",
        numericCode: 9100001,
        category: "error",
        message: "Invalid value.",
        nodeOrSpan: customPrototypeSpan,
      },
    }),
    /expected Object\.prototype or null prototype/,
  );

  const spanWithExtraField = { sourceFile: {}, pos: 0, end: 1, extra: true };
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "reject",
      extensionId: "acme",
      diagnostic: {
        extensionId: "acme",
        extensionCode: "INVALID_VALUE",
        numericCode: 9100001,
        category: "error",
        message: "Invalid value.",
        nodeOrSpan: spanWithExtraField,
      },
    }),
    /must contain exactly sourceFile, pos, and end own data properties/,
  );

  const inheritedSourceFileSpan = Object.assign(Object.create({ sourceFile: {} }), { pos: 0, end: 1 });
  assert.throws(
    () => snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
      kind: "reject",
      extensionId: "acme",
      diagnostic: {
        extensionId: "acme",
        extensionCode: "INVALID_VALUE",
        numericCode: 9100001,
        category: "error",
        message: "Invalid value.",
        nodeOrSpan: inheritedSourceFileSpan,
      },
    }),
    /must contain exactly sourceFile, pos, and end own data properties/,
  );
});

test("opaque compiler identity subjects are retained without traversal", () => {
  const opaqueTarget = {};
  const subject = new Proxy(opaqueTarget, {
    getPrototypeOf() {
      throw new Error("opaque subject prototype was inspected");
    },
    ownKeys() {
      throw new Error("opaque subject keys were inspected");
    },
    getOwnPropertyDescriptor() {
      throw new Error("opaque subject descriptors were inspected");
    },
  });
  const request = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedPropertyAccess, {
    sourceOperationKind: "property-access",
    expression: subject,
    receiver: subject,
    propertyName: "value",
    accessMode: "read",
    use: "value",
    sourceReceiver: sourceValue(subject),
    sourceReadResult: sourceValue(subject),
    chainRole: { kind: "ordinary", participant: "property-access" },
  });
  if (request.accessMode !== "read") {
    throw new Error("Expected read property evidence.");
  }

  assert.equal(request.expression, subject);
  assert.equal(request.receiver, subject);
  assert.equal(request.sourceReceiver.type, subject);
  assert.equal(request.sourceReadResult.expression, subject);
});

test("opaque diagnostic node subjects are retained without record traversal", () => {
  const subject = new Proxy({}, {
    getPrototypeOf() {
      throw new Error("opaque diagnostic node prototype was inspected");
    },
    ownKeys() {
      throw new Error("opaque diagnostic node keys were inspected");
    },
    getOwnPropertyDescriptor() {
      throw new Error("opaque diagnostic node descriptors were inspected");
    },
  });
  const result = snapshotCheckedOperationResult(ExtensionObservationPoint.mapCheckedConversion, {
    kind: "reject",
    extensionId: "acme",
    diagnostic: {
      extensionId: "acme",
      extensionCode: "INVALID_VALUE",
      numericCode: 9100001,
      category: "error",
      message: "Invalid value.",
      nodeOrSpan: subject,
    },
  });
  assert.equal(result.kind, "reject");
  if (result.kind !== "reject") {
    throw new Error("Expected rejected checked-operation result.");
  }
  assert.equal(result.diagnostic.nodeOrSpan, subject);
});

function sourceValue(subject: object) {
  return Object.freeze({ expression: subject, type: subject });
}

function selectedSignature(
  subject: object,
  parameter: {
    name: string;
    type: { readonly kind: "source-primitive"; readonly name: "int32" };
    passingMode: "by-value";
  },
): SelectedTargetSignatureFact {
  return {
    member: {
      id: "acme.consume",
      sourceName: "consume",
      targetName: "consume",
      kind: "method",
      parameters: [parameter],
    },
    argumentConversions: [],
    sourceCallKind: "call",
    sourceSelection: {
      kind: "applicable",
      signature: subject,
      methodTypeArguments: [],
      parameters: [],
      argumentBindings: [],
    },
    sourceCallee: sourceValue(subject),
    sourceArguments: [],
    sourceResult: sourceValue(subject),
    sourceChainRole: { kind: "ordinary", participant: "call" },
  };
}
