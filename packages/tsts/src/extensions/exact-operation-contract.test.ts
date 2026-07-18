import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ExtensionObservationPoint,
} from "./observations.js";
import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedFlowSourceUse,
  CheckedIterationMappingRequest,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionFlowUseValidationRequest,
} from "./observations.js";
import {
  snapshotCheckedOperationRequest,
  snapshotTargetOperationFact,
} from "./checked-operation-value-snapshot.js";
import {
  targetOperationFactKey,
} from "./facts.js";
import type {
  CheckedAccessSourceEvidence,
  CheckedPropertyAccessSourceOperation,
  CheckedSourceChainRole,
  SelectedSourceIterationProtocolEvidence,
  SelectedSourceTypeEvidence,
  SelectedSourceValueEvidence,
  SelectedTargetSignatureFact,
  SourceSelectedCallArgumentBinding,
  SourceSelectedCallEvidence,
  TargetCallArgumentConversionSlot,
  TargetConstraint,
  TargetOperationFact,
  TargetOperationProvenance,
  TargetParameter,
  TargetTypeRef,
} from "./facts.js";

type Assert<T extends true> = T;
type NotAssignable<TValue, TTarget> = [TValue] extends [TTarget] ? false : true;

type _OrdinaryChainCannotCarryOptionalPosition = Assert<NotAssignable<{
  readonly kind: "ordinary";
  readonly participant: "call";
  readonly position: "root";
}, CheckedSourceChainRole<"call">>>;

type _OptionalChainRequiresBoundary = Assert<NotAssignable<{
  readonly kind: "optional-chain";
  readonly participant: "property-access";
  readonly position: "root";
}, CheckedSourceChainRole<"property-access">>>;

type _UntypedSelectionCannotCarrySignature = Assert<NotAssignable<{
  readonly kind: "untyped";
  readonly signature: object;
}, SourceSelectedCallEvidence>>;

type _ApplicableSelectionRequiresCompleteInventories = Assert<NotAssignable<{
  readonly kind: "applicable";
  readonly signature: object;
}, SourceSelectedCallEvidence>>;

type _ReadAccessCannotCarryWriteEvidence = Assert<NotAssignable<{
  readonly accessMode: "read";
  readonly use: "value";
  readonly sourceReadResult: SelectedSourceValueEvidence;
  readonly sourceWriteType: SelectedSourceTypeEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "property-access" };
}, CheckedAccessSourceEvidence>>;

type _WriteAccessCannotCarryReadEvidence = Assert<NotAssignable<{
  readonly accessMode: "write";
  readonly use: "value";
  readonly sourceReadResult: SelectedSourceValueEvidence;
  readonly sourceWriteType: SelectedSourceTypeEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "property-access" };
}, CheckedAccessSourceEvidence>>;

type _ReadWriteAccessRequiresWriteEvidence = Assert<NotAssignable<{
  readonly accessMode: "read-write";
  readonly use: "value";
  readonly sourceReadResult: SelectedSourceValueEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "property-access" };
}, CheckedAccessSourceEvidence>>;

type _ReadWriteAccessRequiresReadEvidence = Assert<NotAssignable<{
  readonly accessMode: "read-write";
  readonly use: "value";
  readonly sourceWriteType: SelectedSourceTypeEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "property-access" };
}, CheckedAccessSourceEvidence>>;

type _WriteAccessCannotBeCallCallee = Assert<NotAssignable<{
  readonly accessMode: "write";
  readonly use: "call-callee";
  readonly sourceWriteType: SelectedSourceTypeEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "property-access" };
}, CheckedAccessSourceEvidence>>;

type _ReadWriteAccessCannotParticipateInOptionalChain = Assert<NotAssignable<{
  readonly accessMode: "read-write";
  readonly use: "value";
  readonly sourceReadResult: SelectedSourceValueEvidence;
  readonly sourceWriteType: SelectedSourceTypeEvidence;
  readonly chainRole: {
    readonly kind: "optional-chain";
    readonly participant: "property-access";
    readonly position: "root";
    readonly boundary: "outermost";
  };
}, CheckedAccessSourceEvidence>>;

type _DeleteAccessCannotBeCallCallee = Assert<NotAssignable<{
  readonly accessMode: "delete";
  readonly use: "call-callee";
  readonly sourceReadResult: SelectedSourceValueEvidence;
  readonly chainRole: { readonly kind: "ordinary"; readonly participant: "element-access" };
}, CheckedAccessSourceEvidence>>;

type _BinaryOperatorRequiresRightOperand = Assert<NotAssignable<{
  readonly sourceOperationKind: "operator";
  readonly operatorKind: "binary";
  readonly expression: object;
  readonly operator: "+";
  readonly left: object;
  readonly sourceLeft: SelectedSourceValueEvidence;
  readonly sourceResult: SelectedSourceValueEvidence;
}, CheckedOperatorMappingRequest>>;

type _PrefixUnaryCannotUseAssignmentToken = Assert<NotAssignable<{
  readonly sourceOperationKind: "operator";
  readonly operatorKind: "prefix-unary";
  readonly expression: object;
  readonly operator: "+=";
  readonly operand: object;
  readonly sourceOperand: SelectedSourceValueEvidence;
  readonly sourceResult: SelectedSourceValueEvidence;
}, CheckedOperatorMappingRequest>>;

type _AssertionConversionCannotCarryCallEvidence = Assert<NotAssignable<{
  readonly sourceOperationKind: "conversion";
  readonly conversionKind: "assertion";
  readonly expression: object;
  readonly source: SelectedSourceValueEvidence;
  readonly target: SelectedSourceTypeEvidence;
  readonly assertionKind: "as";
  readonly explicitTargetTypeNode: object;
  readonly call: object;
}, CheckedConversionMappingRequest>>;

type _CallConversionCannotCarryDuplicatedTopLevelSlotFields = Assert<NotAssignable<{
  readonly sourceOperationKind: "conversion";
  readonly conversionKind: "call-argument";
  readonly expression: object;
  readonly source: SelectedSourceValueEvidence;
  readonly call: object;
  readonly slot: TargetCallArgumentConversionSlot;
  readonly sourceBinding: SourceSelectedCallArgumentBinding;
  readonly target: TargetTypeRef;
  readonly targetParameter: TargetParameter;
  readonly selectedSignature: SelectedTargetSignatureFact;
  readonly sourceArgumentIndex: number;
}, CheckedConversionMappingRequest>>;

type _ForInCannotSelectIteratorProtocol = Assert<NotAssignable<{
  readonly sourceOperationKind: "iteration";
  readonly statement: object;
  readonly expression: object;
  readonly iterationKind: "for-in";
  readonly mechanism: {
    readonly kind: "synchronous-iterator-protocol";
    readonly sourceIterable: SelectedSourceTypeEvidence;
    readonly protocol: SelectedSourceIterationProtocolEvidence;
  };
  readonly sourceIterable: SelectedSourceValueEvidence;
  readonly sourceElement: SelectedSourceTypeEvidence;
}, CheckedIterationMappingRequest>>;

type _ForAwaitCannotSelectUnadaptedArrayIndex = Assert<NotAssignable<{
  readonly sourceOperationKind: "iteration";
  readonly statement: object;
  readonly expression: object;
  readonly iterationKind: "for-await-of";
  readonly mechanism: {
    readonly kind: "array-like-index";
    readonly sourceIterable: SelectedSourceTypeEvidence;
    readonly selectedIndex: SelectedSourceTypeEvidence;
  };
  readonly sourceIterable: SelectedSourceValueEvidence;
  readonly sourceElement: SelectedSourceTypeEvidence;
}, CheckedIterationMappingRequest>>;

type _FlatLegacyProvenanceIsRejected = Assert<NotAssignable<{
  readonly sourceExpression: object;
  readonly sourceOptionalChain: true;
}, TargetOperationProvenance>>;

type _FinalFactRequiresExactSourceProvenance = Assert<NotAssignable<{
  readonly operationId: "acme.read";
  readonly operationKind: "property";
  readonly targetOperation: "acme.read";
}, TargetOperationFact>>;

type _FlowUseKindsAreExact = Assert<[
  CheckedFlowSourceUse["kind"],
] extends ["ordinary" | "call" | "construct" | "tagged-template" | "decorator" | "jsx-element"]
  ? ["ordinary" | "call" | "construct" | "tagged-template" | "decorator" | "jsx-element"] extends [CheckedFlowSourceUse["kind"]]
    ? true
    : false
  : false>;

type _OrdinaryFlowUseRequiresExactAccess = Assert<NotAssignable<{
  readonly kind: "ordinary";
}, CheckedFlowSourceUse>>;

type _CallFlowUseCannotCarryOrdinaryAccess = Assert<NotAssignable<{
  readonly kind: "call";
  readonly access: "write";
}, CheckedFlowSourceUse>>;

const exactFlowUses = [
  { kind: "ordinary", access: "read" },
  { kind: "ordinary", access: "write" },
  { kind: "ordinary", access: "read-write" },
  { kind: "call" },
  { kind: "construct" },
  { kind: "tagged-template" },
  { kind: "decorator" },
  { kind: "jsx-element" },
] as const satisfies readonly CheckedFlowSourceUse[];
void exactFlowUses;

// @ts-expect-error Legacy mode strings are not part of the exact source-use contract.
const legacyFlowRequest: ExtensionFlowUseValidationRequest = { useSite: {}, symbol: {}, mode: "read" };
void legacyFlowRequest;

// @ts-expect-error A call use cannot also carry an ordinary access mode.
const mixedFlowUse: CheckedFlowSourceUse = { kind: "call", access: "write" };
void mixedFlowUse;

// @ts-expect-error Target-owned dynamic objects are not part of the static target type-reference contract.
const dynamicTargetTypeRef: TargetTypeRef = { kind: "target-specific", target: "acme", name: "payload", value: {} };
void dynamicTargetTypeRef;

// @ts-expect-error Target-owned dynamic objects are not part of the static target-constraint contract.
const dynamicTargetConstraint: TargetConstraint = { kind: "target-specific", target: "acme", name: "payload", value: {} };
void dynamicTargetConstraint;

test("the authoritative checked-operation boundary snapshots exact call and chain evidence", () => {
  const receiver = {};
  const callee = {};
  const call = {};
  const argument = {};
  const argumentType = {};
  const parameterType = {};
  const parameterSymbol = {};
  const sourceArgument = sourceValue(argument, argumentType);
  const request: CheckedCallMappingRequest = {
    sourceOperationKind: "call",
    call,
    callee,
    arguments: [argument],
    callKind: "call",
    sourceSelection: {
      kind: "applicable",
      signature: {},
      methodTypeArguments: [],
      parameters: [{
        parameterIndex: 0,
        parameterName: "value",
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
    sourceCallee: sourceValue(callee),
    sourceArguments: [sourceArgument],
    sourceResult: sourceValue(call),
    sourceReceiver: sourceValue(receiver),
    chainRole: {
      kind: "optional-chain",
      participant: "call",
      position: "continuation",
      boundary: "outermost",
    },
    target: "acme",
  };

  const snapshot = snapshotCheckedOperationRequest(ExtensionObservationPoint.mapCheckedCall, request);
  assert.notEqual(snapshot, request);
  assert.equal(Object.isFrozen(snapshot), true);
  assert.deepEqual(snapshot.chainRole, {
    kind: "optional-chain",
    participant: "call",
    position: "continuation",
    boundary: "outermost",
  });

  // @ts-expect-error Legacy optionalChain is absent from the exact chain-role contract.
  const legacyRequest: CheckedCallMappingRequest = { ...request, optionalChain: true };
  assert.throws(() => snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedCall,
    legacyRequest,
  ), /optionalChain/);
});

test("the authoritative boundary keeps asymmetric property and element access evidence separate", () => {
  const expression = {};
  const receiver = {};
  const argument = {};
  const sourceReceiver = sourceValue(receiver);
  const sourceReadResult = sourceValue(expression);
  const sourceWriteType = sourceType({});

  const property: CheckedPropertyAccessMappingRequest = {
    sourceOperationKind: "property-access",
    expression,
    receiver,
    propertyName: "value",
    accessMode: "read-write",
    use: "value",
    sourceReceiver,
    sourceReadResult,
    sourceWriteType,
    chainRole: { kind: "ordinary", participant: "property-access" },
  };
  const propertySnapshot = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    property,
  );
  if (propertySnapshot.accessMode !== "read-write") {
    throw new Error("Expected exact read-write property evidence.");
  }
  assert.equal(propertySnapshot.sourceReadResult.type, sourceReadResult.type);
  assert.equal(propertySnapshot.sourceWriteType.type, sourceWriteType.type);

  const element: CheckedElementAccessMappingRequest = {
    sourceOperationKind: "element-access",
    expression,
    receiver,
    argument,
    accessMode: "write",
    use: "value",
    sourceReceiver,
    sourceArgument: sourceValue(argument),
    sourceWriteType,
    sourceSelectedElementIndex: 0,
    chainRole: { kind: "ordinary", participant: "element-access" },
  };
  const elementSnapshot = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedElementAccess,
    element,
  );
  if (elementSnapshot.accessMode !== "write") {
    throw new Error("Expected exact write-only element evidence.");
  }
  assert.equal(elementSnapshot.sourceWriteType.type, sourceWriteType.type);

  // @ts-expect-error A read-write access cannot omit its independently selected write type.
  const incompleteProperty: CheckedPropertyAccessMappingRequest = { ...property, sourceWriteType: undefined };
  assert.throws(() => snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    incompleteProperty,
  ), /sourceWriteType/);
  // @ts-expect-error A write-only access cannot carry selected read evidence.
  const mixedElement: CheckedElementAccessMappingRequest = { ...element, sourceReadResult };
  assert.throws(() => snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedElementAccess,
    mixedElement,
  ), /sourceReadResult/);
});

test("the authoritative boundary enforces discriminated operator and iteration requests", () => {
  const expression = {};
  const left = {};
  const right = {};
  const sourceLeft = sourceValue(left);
  const sourceRight = sourceValue(right);
  const sourceResult = sourceValue(expression);

  const binary: CheckedOperatorMappingRequest = {
    sourceOperationKind: "operator",
    operatorKind: "binary",
    expression,
    operator: "??=",
    left,
    right,
    sourceLeft,
    sourceRight,
    sourceResult,
  };
  const operatorSnapshot = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedOperator,
    binary,
  );
  if (operatorSnapshot.operatorKind !== "binary") {
    throw new Error("Expected exact binary-operator evidence.");
  }
  assert.equal(operatorSnapshot.right, right);

  // @ts-expect-error Prefix updates accept only ++ and --.
  const invalidUpdate: CheckedOperatorMappingRequest = {
    sourceOperationKind: "operator",
    operatorKind: "prefix-update",
    expression,
    operator: "+=",
    operand: left,
    sourceOperand: sourceLeft,
    sourceResult,
  };
  assert.throws(() => snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedOperator,
    invalidUpdate,
  ), /operator/);

  const protocol = iterationProtocol();
  const iteration: CheckedIterationMappingRequest = {
    sourceOperationKind: "iteration",
    statement: {},
    expression,
    iterationKind: "for-await-of",
    mechanism: {
      kind: "synchronous-iterator-adapted-to-async",
      sourceAlternative: sourceType({}),
      protocol,
    },
    sourceIterable: sourceValue(expression),
    sourceElement: sourceType({}),
  };
  const iterationSnapshot = snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedIteration,
    iteration,
  );
  assert.equal(iterationSnapshot.iterationKind, "for-await-of");
  assert.equal(iterationSnapshot.mechanism.kind, "synchronous-iterator-adapted-to-async");

  const emptyUnionIteration: CheckedIterationMappingRequest = {
    ...iteration,
    iterationKind: "for-of",
    mechanism: {
      kind: "union",
      // @ts-expect-error A selected union mechanism must contain at least one exact alternative.
      alternatives: [],
    },
  };
  assert.throws(() => snapshotCheckedOperationRequest(
    ExtensionObservationPoint.mapCheckedIteration,
    emptyUnionIteration,
  ), /alternatives|non-empty/);
});

test("target-operation equality and snapshots preserve independent read and write evidence", () => {
  const expression = {};
  const receiver = {};
  const readType = {};
  const writeType = {};
  const sourceOperation: CheckedPropertyAccessSourceOperation = {
    sourceOperationKind: "property-access",
    expression,
    receiver,
    propertyName: "value",
    accessMode: "read-write",
    use: "value",
    sourceReceiver: sourceValue(receiver),
    sourceReadResult: sourceValue(expression, readType),
    sourceWriteType: sourceType(writeType),
    chainRole: { kind: "ordinary", participant: "property-access" },
  };
  const provenance: TargetOperationProvenance = {
    sourceOperation,
  };
  const fact: TargetOperationFact = {
    operationId: "acme.value",
    operationKind: "property",
    targetOperation: "acme.value",
    provenance,
  };
  const equivalent: TargetOperationFact = {
    ...fact,
    provenance: {
      sourceOperation: {
        ...sourceOperation,
        sourceReadResult: sourceValue(expression, readType),
        sourceWriteType: sourceType(writeType),
      },
    },
  };
  const differentRead: TargetOperationFact = {
    ...equivalent,
    provenance: {
      sourceOperation: {
        ...sourceOperation,
        sourceReadResult: sourceValue(expression, {}),
      },
    },
  };
  const differentWrite: TargetOperationFact = {
    ...equivalent,
    provenance: {
      sourceOperation: {
        ...sourceOperation,
        sourceWriteType: sourceType({}),
      },
    },
  };

  assert.equal(targetOperationFactKey.equals(fact, equivalent), true);
  assert.equal(targetOperationFactKey.equals(fact, differentRead), false);
  assert.equal(targetOperationFactKey.equals(fact, differentWrite), false);

  const snapshot = snapshotTargetOperationFact(fact);
  assert.equal(snapshot.provenance.sourceOperation.sourceOperationKind, "property-access");
  if (snapshot.provenance.sourceOperation.sourceOperationKind !== "property-access"
    || snapshot.provenance.sourceOperation.accessMode !== "read-write") {
    throw new Error("Expected exact read-write property provenance.");
  }
  assert.equal(snapshot.provenance.sourceOperation.sourceReadResult.type, readType);
  assert.equal(snapshot.provenance.sourceOperation.sourceWriteType.type, writeType);

  const invalidFact: TargetOperationFact = {
    operationId: "acme.invalid",
    operationKind: "property",
    targetOperation: "acme.invalid",
    provenance,
    // @ts-expect-error Final target-operation facts reject flat legacy source fields.
    sourceExpression: expression,
  };
  assert.throws(() => snapshotTargetOperationFact(invalidFact), /provenance|sourceExpression/);
});

function sourceType(type: object): SelectedSourceTypeEvidence {
  return { type };
}

function sourceValue(expression: object, type: object = {}): SelectedSourceValueEvidence {
  return { expression, type };
}

function iterationProtocol(): SelectedSourceIterationProtocolEvidence {
  return {
    resolutionKind: "selected-iterator-member",
    iteratorMethod: { symbol: {}, declarations: [], type: {} },
    iteratorType: sourceType({}),
    iterationTypes: {
      yieldType: sourceType({}),
      returnType: sourceType({}),
      nextType: sourceType({}),
    },
  };
}
