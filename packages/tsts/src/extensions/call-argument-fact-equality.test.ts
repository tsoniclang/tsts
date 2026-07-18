import { test } from "node:test";
import assert from "node:assert/strict";
import {
  targetCallArgumentConversionFactKey,
  targetCallArgumentPassingFactKey,
} from "./facts.js";
import type {
  ProviderDeclarationIdentity,
  SourceSelectedCallArgumentBinding,
  TargetCallArgumentConversionFact,
  TargetCallArgumentConversionSlot,
  TargetCallArgumentPassingFact,
  TargetOperationFact,
  TargetParameter,
  TargetTypeRef,
} from "./facts.js";
import type { ExtensionFactSubject } from "./host.js";

interface NamedDifference<T> {
  readonly name: string;
  readonly value: T;
}

type CompleteSourceBinding = SourceSelectedCallArgumentBinding & {
  readonly spreadElementIndex: number;
};

type CompleteConversionSlot = TargetCallArgumentConversionSlot & {
  readonly spreadElementIndex: number;
};

type CompleteConversionFact = TargetCallArgumentConversionFact & {
  readonly spreadElementIndex: number;
  readonly convertedType: TargetTypeRef;
  readonly operation: TargetOperationFact;
};

type CompletePassingFact = TargetCallArgumentPassingFact & {
  readonly spreadElementIndex: number;
  readonly targetExpression: ExtensionFactSubject;
  readonly selectedSignature: ProviderDeclarationIdentity;
};

interface SourceBindingFixtures {
  readonly complete: CompleteSourceBinding;
  readonly structurallyEqual: CompleteSourceBinding;
  readonly differences: readonly NamedDifference<SourceSelectedCallArgumentBinding>[];
}

function subject(role: string): ExtensionFactSubject {
  return Object.freeze({ role });
}

function targetType(id: string): TargetTypeRef {
  const typeArgument = Object.freeze({
    kind: "source-primitive",
    name: "int32",
  } satisfies TargetTypeRef);
  return Object.freeze({
    kind: "target-named",
    id,
    typeArguments: Object.freeze([typeArgument]),
  } satisfies TargetTypeRef);
}

function targetOperation(operationId: string): TargetOperationFact {
  return Object.freeze({
    operationId,
    operationKind: "method",
    targetOperation: "Acme.Conversions.ConvertArgument",
    resultType: targetType("Acme.ConvertedArgument"),
    evidence: Object.freeze([
      Object.freeze({ message: "selected target conversion" }),
    ]),
  });
}

function targetParameter(name: string): TargetParameter {
  return Object.freeze({
    name,
    type: targetType("Acme.Parameter"),
    passingMode: "byref-readonly",
    optional: true,
    paramsArray: true,
  });
}

function selectedSignature(signatureId: string): ProviderDeclarationIdentity {
  return Object.freeze({
    providerId: "acme-provider",
    providerVersion: "1.0.0",
    providerModuleId: "acme-module",
    moduleSpecifier: "@acme/runtime",
    artifactFileName: "runtime.d.ts",
    exportName: "convert",
    exportId: "convert-export",
    memberName: "invoke",
    memberKey: Object.freeze({ kind: "property-key", name: "invoke" }),
    memberId: "convert.invoke",
    memberStatic: true,
    signatureId,
    targetIdentity: targetType("Acme.Signature"),
  });
}

function conversionSlot(): CompleteConversionSlot {
  return Object.freeze({
    sourceArgumentIndex: 1,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    targetParameterIndex: 4,
    targetForm: "params-element",
  });
}

function sourceBindingFixtures(): SourceBindingFixtures {
  const selectedArgumentType = subject("selected-argument-type");
  const selectedParameterType = subject("selected-parameter-type");
  const complete: CompleteSourceBinding = Object.freeze({
    sourceArgumentIndex: 1,
    effectiveArgumentIndex: 3,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    sourceParameterIndex: 5,
    sourceParameterForm: "rest-element",
    selectedArgumentType,
    selectedParameterType,
  });
  const structurallyEqual: CompleteSourceBinding = Object.freeze({
    sourceArgumentIndex: 1,
    effectiveArgumentIndex: 3,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    sourceParameterIndex: 5,
    sourceParameterForm: "rest-element",
    selectedArgumentType,
    selectedParameterType,
  });
  const withoutSpreadElementIndex: SourceSelectedCallArgumentBinding = Object.freeze({
    sourceArgumentIndex: complete.sourceArgumentIndex,
    effectiveArgumentIndex: complete.effectiveArgumentIndex,
    sourceForm: complete.sourceForm,
    sourceParameterIndex: complete.sourceParameterIndex,
    sourceParameterForm: complete.sourceParameterForm,
    selectedArgumentType: complete.selectedArgumentType,
    selectedParameterType: complete.selectedParameterType,
  });
  const differences = [
    {
      name: "sourceArgumentIndex",
      value: Object.freeze({ ...complete, sourceArgumentIndex: 2 }),
    },
    {
      name: "effectiveArgumentIndex",
      value: Object.freeze({ ...complete, effectiveArgumentIndex: 4 }),
    },
    {
      name: "sourceForm",
      value: Object.freeze({ ...complete, sourceForm: "spread-sequence" }),
    },
    {
      name: "spreadElementIndex presence",
      value: withoutSpreadElementIndex,
    },
    {
      name: "spreadElementIndex value",
      value: Object.freeze({ ...complete, spreadElementIndex: 3 }),
    },
    {
      name: "sourceParameterIndex",
      value: Object.freeze({ ...complete, sourceParameterIndex: 6 }),
    },
    {
      name: "sourceParameterForm",
      value: Object.freeze({ ...complete, sourceParameterForm: "rest-sequence" }),
    },
    {
      name: "selectedArgumentType identity",
      value: Object.freeze({
        ...complete,
        selectedArgumentType: subject("selected-argument-type"),
      }),
    },
    {
      name: "selectedParameterType identity",
      value: Object.freeze({
        ...complete,
        selectedParameterType: subject("selected-parameter-type"),
      }),
    },
  ] satisfies readonly NamedDifference<SourceSelectedCallArgumentBinding>[];

  return Object.freeze({ complete, structurallyEqual, differences });
}

test("target call-argument conversion fact equality includes every source binding and outer field", () => {
  const sourceBindings = sourceBindingFixtures();
  const slot = conversionSlot();
  const call = subject("call");
  const complete: CompleteConversionFact = Object.freeze({
    slot,
    call,
    sourceArgumentIndex: 1,
    targetParameterIndex: 4,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    targetForm: "params-element",
    sourceBinding: sourceBindings.complete,
    convertedType: targetType("Acme.ConvertedArgument"),
    operation: targetOperation("convert-argument"),
  });
  const structurallyEqual: CompleteConversionFact = Object.freeze({
    slot,
    call,
    sourceArgumentIndex: 1,
    targetParameterIndex: 4,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    targetForm: "params-element",
    sourceBinding: sourceBindings.structurallyEqual,
    convertedType: targetType("Acme.ConvertedArgument"),
    operation: targetOperation("convert-argument"),
  });

  assert.notEqual(structurallyEqual, complete);
  assert.notEqual(structurallyEqual.sourceBinding, complete.sourceBinding);
  assert.notEqual(structurallyEqual.convertedType, complete.convertedType);
  assert.notEqual(structurallyEqual.operation, complete.operation);
  assert.deepEqual(structurallyEqual, complete);
  assert.equal(targetCallArgumentConversionFactKey.equals(complete, structurallyEqual), true);

  for (const difference of sourceBindings.differences) {
    const changed: TargetCallArgumentConversionFact = Object.freeze({
      ...complete,
      sourceBinding: difference.value,
    });
    assert.equal(
      targetCallArgumentConversionFactKey.equals(complete, changed),
      false,
      `sourceBinding.${difference.name} must participate in conversion fact equality`,
    );
  }

  const withoutSpreadElementIndex: TargetCallArgumentConversionFact = Object.freeze({
    slot: complete.slot,
    call: complete.call,
    sourceArgumentIndex: complete.sourceArgumentIndex,
    targetParameterIndex: complete.targetParameterIndex,
    sourceForm: complete.sourceForm,
    targetForm: complete.targetForm,
    sourceBinding: complete.sourceBinding,
    convertedType: complete.convertedType,
    operation: complete.operation,
  });
  const outerDifferences = [
    {
      name: "slot identity",
      value: Object.freeze({ ...complete, slot: conversionSlot() }),
    },
    {
      name: "call identity",
      value: Object.freeze({ ...complete, call: subject("call") }),
    },
    {
      name: "sourceArgumentIndex",
      value: Object.freeze({ ...complete, sourceArgumentIndex: 2 }),
    },
    {
      name: "targetParameterIndex",
      value: Object.freeze({ ...complete, targetParameterIndex: 5 }),
    },
    {
      name: "sourceForm",
      value: Object.freeze({ ...complete, sourceForm: "spread-sequence" }),
    },
    {
      name: "spreadElementIndex presence",
      value: withoutSpreadElementIndex,
    },
    {
      name: "spreadElementIndex value",
      value: Object.freeze({ ...complete, spreadElementIndex: 3 }),
    },
    {
      name: "targetForm",
      value: Object.freeze({ ...complete, targetForm: "params-sequence" }),
    },
    {
      name: "convertedType",
      value: Object.freeze({ ...complete, convertedType: targetType("Acme.OtherConvertedArgument") }),
    },
    {
      name: "operation",
      value: Object.freeze({ ...complete, operation: targetOperation("other-conversion") }),
    },
  ] satisfies readonly NamedDifference<TargetCallArgumentConversionFact>[];

  for (const difference of outerDifferences) {
    assert.equal(
      targetCallArgumentConversionFactKey.equals(complete, difference.value),
      false,
      `${difference.name} must participate in conversion fact equality`,
    );
  }
});

test("target call-argument passing fact equality includes every source binding and outer field", () => {
  const sourceBindings = sourceBindingFixtures();
  const slot = conversionSlot();
  const targetExpression = subject("target-expression");
  const call = subject("call");
  const complete: CompletePassingFact = Object.freeze({
    slot,
    mode: "byref-readonly",
    targetExpression,
    call,
    sourceArgumentIndex: 1,
    targetParameterIndex: 4,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    targetForm: "params-element",
    sourceBinding: sourceBindings.complete,
    targetParameter: targetParameter("items"),
    selectedSignature: selectedSignature("convert-signature"),
  });
  const structurallyEqual: CompletePassingFact = Object.freeze({
    slot,
    mode: "byref-readonly",
    targetExpression,
    call,
    sourceArgumentIndex: 1,
    targetParameterIndex: 4,
    sourceForm: "spread-element",
    spreadElementIndex: 2,
    targetForm: "params-element",
    sourceBinding: sourceBindings.structurallyEqual,
    targetParameter: targetParameter("items"),
    selectedSignature: selectedSignature("convert-signature"),
  });

  assert.notEqual(structurallyEqual, complete);
  assert.notEqual(structurallyEqual.sourceBinding, complete.sourceBinding);
  assert.notEqual(structurallyEqual.targetParameter, complete.targetParameter);
  assert.notEqual(structurallyEqual.selectedSignature, complete.selectedSignature);
  assert.deepEqual(structurallyEqual, complete);
  assert.equal(targetCallArgumentPassingFactKey.equals(complete, structurallyEqual), true);

  for (const difference of sourceBindings.differences) {
    const changed: TargetCallArgumentPassingFact = Object.freeze({
      ...complete,
      sourceBinding: difference.value,
    });
    assert.equal(
      targetCallArgumentPassingFactKey.equals(complete, changed),
      false,
      `sourceBinding.${difference.name} must participate in passing fact equality`,
    );
  }

  const withoutSpreadElementIndex: TargetCallArgumentPassingFact = Object.freeze({
    slot: complete.slot,
    mode: complete.mode,
    targetExpression: complete.targetExpression,
    call: complete.call,
    sourceArgumentIndex: complete.sourceArgumentIndex,
    targetParameterIndex: complete.targetParameterIndex,
    sourceForm: complete.sourceForm,
    targetForm: complete.targetForm,
    sourceBinding: complete.sourceBinding,
    targetParameter: complete.targetParameter,
    selectedSignature: complete.selectedSignature,
  });
  const outerDifferences = [
    {
      name: "slot identity",
      value: Object.freeze({ ...complete, slot: conversionSlot() }),
    },
    {
      name: "mode",
      value: Object.freeze({ ...complete, mode: "move" }),
    },
    {
      name: "targetExpression identity",
      value: Object.freeze({ ...complete, targetExpression: subject("target-expression") }),
    },
    {
      name: "call identity",
      value: Object.freeze({ ...complete, call: subject("call") }),
    },
    {
      name: "sourceArgumentIndex",
      value: Object.freeze({ ...complete, sourceArgumentIndex: 2 }),
    },
    {
      name: "targetParameterIndex",
      value: Object.freeze({ ...complete, targetParameterIndex: 5 }),
    },
    {
      name: "sourceForm",
      value: Object.freeze({ ...complete, sourceForm: "spread-sequence" }),
    },
    {
      name: "spreadElementIndex presence",
      value: withoutSpreadElementIndex,
    },
    {
      name: "spreadElementIndex value",
      value: Object.freeze({ ...complete, spreadElementIndex: 3 }),
    },
    {
      name: "targetForm",
      value: Object.freeze({ ...complete, targetForm: "params-sequence" }),
    },
    {
      name: "targetParameter",
      value: Object.freeze({ ...complete, targetParameter: targetParameter("other-items") }),
    },
    {
      name: "selectedSignature",
      value: Object.freeze({ ...complete, selectedSignature: selectedSignature("other-signature") }),
    },
  ] satisfies readonly NamedDifference<TargetCallArgumentPassingFact>[];

  for (const difference of outerDifferences) {
    assert.equal(
      targetCallArgumentPassingFactKey.equals(complete, difference.value),
      false,
      `${difference.name} must participate in passing fact equality`,
    );
  }
});
