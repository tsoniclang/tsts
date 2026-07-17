import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Text } from "../internal/ast/ast.js";
import { IsSpreadElement } from "../internal/ast/generated/predicates.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
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
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  argumentPassingFactKey,
  attachExtensionHost,
  createExtensionConsumerQueries,
  deferObservation,
  finalizeExtensionSemantics,
  rejectObservation,
  selectedTargetSignatureFactKey,
  targetCallArgumentConversionFactKey,
  targetCallArgumentPassingFactKey,
  targetConversionFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CompilerExtension,
  ExtensionFactSubject,
  ExtensionObservationPhase,
  TargetCallArgumentConversionFact,
  TargetCallArgumentConversionSlot,
  TargetCallArgumentPassingFact,
  TargetSemanticProvider,
  TargetSignatureSelection,
  TargetTypeRef,
} from "./index.js";

const int32TargetType = { kind: "source-primitive", name: "int32" } as const satisfies TargetTypeRef;
const int32ArrayTargetType = { kind: "array", element: int32TargetType } as const satisfies TargetTypeRef;

test("params-array calls retain every conversion slot and distinguish params elements from sequences", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const selectedSignature = paramsTargetSignature();
  const extension = semanticExtension("params-slots", {
    mapCheckedCall: (request) => {
      callRequests.push(request);
      return acceptObservation({
        kind: "target",
        selectedSignature,
        argumentConversions: convertAllArgumentsToParams(request.arguments, 0),
      });
    },
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({ convertedType: request.target as TargetTypeRef });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function collect(...values: number[]): void;
    const values: number[] = [4, 5];
    collect(1, 2, 3);
    collect(...values);
  `);

  assertCleanProgram(program);
  assert.equal(callRequests.length, 2);
  assert.equal(
    conversionRequests.length,
    4,
    "Call-argument conversions must execute inside the selected call's atomic checking transaction.",
  );

  assert.ok(finalizeExtensionSemantics(programOptions) === extensionHost, "Finalization must return the attached host.");
  assert.equal(conversionRequests.length, 4, "Finalization must not replay already committed call conversions.");
  assert.deepEqual(conversionRequests.map((request) => request.conversionKind === "call-argument"
    ? [request.sourceArgumentIndex, request.targetParameterIndex, request.sourceForm, request.targetForm]
    : ["assertion"]), [
    [0, 0, "value", "params-element"],
    [1, 0, "value", "params-element"],
    [2, 0, "value", "params-element"],
    [0, 0, "spread-sequence", "params-sequence"],
  ]);

  const firstCall = callRequests[0];
  const spreadCall = callRequests[1];
  assert.ok(firstCall !== undefined && spreadCall !== undefined);
  assert.equal(firstCall.arguments.length, 3);
  for (let argumentIndex = 0; argumentIndex < firstCall.arguments.length; argumentIndex++) {
    const argument: ExtensionFactSubject | undefined = firstCall.arguments[argumentIndex];
    assert.ok(argument !== undefined);
    const conversionRequest = requireCallArgumentConversionRequest(conversionRequests, firstCall.call, argumentIndex, 0);
    const conversion: TargetCallArgumentConversionFact | undefined = extensionHost.facts.get(conversionRequest.slot, targetCallArgumentConversionFactKey);
    assert.ok(conversion?.slot === conversionRequest.slot, "Each conversion fact must retain its exact request slot subject.");
    assert.ok(conversion?.call === firstCall.call, "Each conversion fact must retain its exact call subject.");
    assert.equal(conversion?.sourceArgumentIndex, argumentIndex);
    assert.equal(conversion?.targetParameterIndex, 0);
    assert.equal(conversion?.sourceForm, "value");
    assert.equal(conversion?.targetForm, "params-element");
    assert.deepEqual(conversion?.convertedType, int32TargetType);
    const callSlot = requireArgumentConversionSlot(extensionHost, firstCall.call, argumentIndex, 0);
    const passing: TargetCallArgumentPassingFact | undefined = extensionHost.facts.get(callSlot, targetCallArgumentPassingFactKey);
    assert.ok(passing?.slot === callSlot, "Each passing fact must retain its exact selected-call slot subject.");
    assert.ok(passing?.call === firstCall.call, "Each passing fact must retain its exact call subject.");
    assert.equal(passing?.sourceArgumentIndex, argumentIndex);
    assert.equal(passing?.targetParameterIndex, 0);
    assert.equal(passing?.targetForm, "params-element");
  }
  const spreadArgument = spreadCall.arguments[0];
  assert.ok(spreadArgument !== undefined);
  const spreadConversionRequest = requireCallArgumentConversionRequest(conversionRequests, spreadCall.call, 0, 0);
  const spreadConversion = extensionHost.facts.get(spreadConversionRequest.slot, targetCallArgumentConversionFactKey);
  assert.ok(spreadConversion?.slot === spreadConversionRequest.slot, "Spread conversion evidence must retain its exact request slot subject.");
  assert.ok(spreadConversion?.call === spreadCall.call, "Spread conversion evidence must retain its exact call subject.");
  assert.equal(spreadConversion?.sourceArgumentIndex, 0);
  assert.equal(spreadConversion?.targetParameterIndex, 0);
  assert.equal(spreadConversion?.sourceForm, "spread-sequence");
  assert.equal(spreadConversion?.targetForm, "params-sequence");
  assert.deepEqual(spreadConversion?.convertedType, int32ArrayTargetType);
  const spreadCallSlot = requireArgumentConversionSlot(extensionHost, spreadCall.call, 0, 0);
  const spreadPassing = extensionHost.facts.get(spreadCallSlot, targetCallArgumentPassingFactKey);
  assert.ok(spreadPassing?.slot === spreadCallSlot, "Spread passing evidence must retain its exact selected-call slot subject.");
  assert.ok(spreadPassing?.call === spreadCall.call, "Spread passing evidence must retain its exact call subject.");
  assert.equal(spreadPassing?.sourceArgumentIndex, 0);
  assert.equal(spreadPassing?.targetParameterIndex, 0);
  assert.equal(spreadPassing?.targetForm, "params-sequence");
  const consumer = createExtensionConsumerQueries(extensionHost, "checked-operation-argument-slot-test");
  assert.equal(consumer.getTargetCallArgumentConversionFact(spreadConversionRequest.slot), spreadConversion);
  assert.equal(consumer.getTargetCallArgumentPassingFact(spreadCallSlot), spreadPassing);
  assert.equal(consumer.getTargetCallArgumentConversionFact({
    sourceArgumentIndex: 0,
    sourceForm: "spread-sequence",
    targetParameterIndex: 0,
    targetForm: "params-sequence",
  }), undefined, "A structurally equal but non-canonical slot identity must not alias the retained slot.");
  assert.equal(extensionHost.diagnostics.all().length, 0, "Params-array finalization must not report diagnostics.");
});

test("source argument-passing markers coexist with exact target call-slot passing evidence", () => {
  const selectedSignature = singleArgumentTargetSignature("consume", "byref-readonly");
  let callRequest: CheckedCallMappingRequest | undefined;
  const extension = semanticExtension("passing-fact-domains", {
    mapCheckedCall: (request, context) => {
      callRequest = request;
      const argument = request.arguments[0];
      assert.ok(argument !== undefined);
      context.facts.set(argument, argumentPassingFactKey, {
        mode: "byref-readonly",
        targetExpression: argument,
      });
      return acceptObservation({
        kind: "target",
        selectedSignature,
        argumentConversions: [{
          sourceArgumentIndex: 0,
          sourceForm: "value",
          targetParameterIndex: 0,
          targetForm: "parameter",
        }],
      });
    },
    mapCheckedConversion: () => acceptObservation({}),
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function consume(value: number): void;
    declare let value: number;
    consume(value);
  `);

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) === extensionHost, "Finalization must return the attached host.");
  assert.ok(callRequest !== undefined);
  const argument = callRequest.arguments[0];
  assert.ok(argument !== undefined);
  const sourcePassing = extensionHost.facts.get(argument, argumentPassingFactKey);
  const slot = requireArgumentConversionSlot(extensionHost, callRequest.call, 0, 0);
  const targetPassing = extensionHost.facts.get(slot, targetCallArgumentPassingFactKey);
  assert.equal(sourcePassing?.mode, "byref-readonly");
  assert.ok(sourcePassing?.targetExpression === argument, "Source marker evidence must retain its authored storage subject.");
  assert.equal(targetPassing?.mode, "byref-readonly");
  assert.ok(targetPassing?.slot === slot, "Target passing evidence must retain the exact conversion slot.");
  assert.ok(targetPassing?.call === callRequest.call, "Target passing evidence must retain its exact call.");
  assert.equal(targetPassing?.sourceArgumentIndex, 0);
  assert.equal(targetPassing?.targetParameterIndex, 0);
  assert.equal(targetPassing?.targetForm, "parameter");
  assert.equal(extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
});

test("params arguments retain one element conversion slot per source argument", () => {
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const extension = semanticExtension("rest-source-parameter", {
    mapCheckedCall: (request) => acceptObservation({
      kind: "target",
      selectedSignature: {
        member: {
          id: "collect(prefix, params int32[])",
          sourceName: "collect",
          targetName: "collect",
          kind: "method",
          parameters: [
            { name: "prefix", type: int32TargetType, passingMode: "by-value" },
            { name: "values", type: int32ArrayTargetType, passingMode: "by-value", paramsArray: true },
          ],
        },
      },
      argumentConversions: request.arguments.map((_argument, sourceArgumentIndex) => argumentConversionSlot(
        sourceArgumentIndex,
        sourceArgumentIndex === 0 ? 0 : 1,
        "value",
        sourceArgumentIndex === 0 ? "parameter" : "params-element",
      )),
    }),
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({ convertedType: request.target as TargetTypeRef });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function collect(prefix: number, ...values: number[]): void;
    collect(10, 20, 30);
  `);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);
  assert.deepEqual(conversionRequests.map((request) => request.conversionKind === "call-argument"
    ? [request.sourceArgumentIndex, request.targetParameterIndex, request.targetForm]
    : ["assertion"]), [
    [0, 0, "parameter"],
    [1, 1, "params-element"],
    [2, 1, "params-element"],
  ]);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Params element slots must finalize without diagnostics.");
});

test("tuple spreads bind explicit fixed elements to distinct target parameters", () => {
  let callRequest: CheckedCallMappingRequest | undefined;
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const extension = semanticExtension("fixed-tuple-spread", {
    mapCheckedCall: (request) => {
      callRequest = request;
      return acceptObservation({
        kind: "target",
        selectedSignature: twoArgumentTargetSignature("pair"),
        argumentConversions: [
          argumentConversionSlot(0, 0, "spread-element", "parameter", 0),
          argumentConversionSlot(0, 1, "spread-element", "parameter", 1),
        ],
      });
    },
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({ convertedType: request.target as TargetTypeRef });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function pair(first: number, second: number): void;
    const values: [number, number] = [1, 2];
    pair(...values);
  `);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);
  assert.ok(callRequest !== undefined);
  const selected = extensionHost.facts.get(callRequest.call, selectedTargetSignatureFactKey);
  assert.equal(selected?.argumentConversions.length, 2);
  const first = requireArgumentConversionSlot(extensionHost, callRequest.call, 0, 0);
  const second = requireArgumentConversionSlot(extensionHost, callRequest.call, 0, 1);
  assert.equal(first.sourceForm, "spread-element");
  assert.equal(first.spreadElementIndex, 0);
  assert.equal(first.targetForm, "parameter");
  assert.equal(second.sourceForm, "spread-element");
  assert.equal(second.spreadElementIndex, 1);
  assert.equal(second.targetForm, "parameter");
  const firstRequest = requireCallArgumentConversionRequest(conversionRequests, callRequest.call, 0, 0);
  const secondRequest = requireCallArgumentConversionRequest(conversionRequests, callRequest.call, 0, 1);
  assert.equal(extensionHost.facts.get(firstRequest.slot, targetCallArgumentConversionFactKey)?.spreadElementIndex, 0);
  assert.equal(extensionHost.facts.get(secondRequest.slot, targetCallArgumentConversionFactKey)?.spreadElementIndex, 1);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Fixed spread slots must finalize without diagnostics.");
});

test("malformed params-array target signatures fail before target argument facts can escape", () => {
  const malformedSignature: TargetSignatureSelection = {
    member: {
      id: "collect(malformed params)",
      sourceName: "collect",
      targetName: "collect",
      kind: "method",
      parameters: [{
        name: "values",
        type: int32TargetType,
        passingMode: "by-value",
        paramsArray: true,
      }],
    },
  };
  const extension = semanticExtension("malformed-params-array", {
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature: malformedSignature,
      argumentConversions: [argumentConversionSlot(0, 0, "value", "params-element")],
    }),
  });

  const { program } = createProgram(extension, `
    declare function collect(...values: number[]): void;
    collect(1);
  `);

  assert.throws(
    () => assertCleanProgram(program),
    /marks parameter 0 as a params array without an array target type/,
  );
});

test("selected target signatures missing an actual argument parameter fail closed", () => {
  const extension = semanticExtension("missing-target-parameter", {
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature: singleArgumentTargetSignature("pair"),
      argumentConversions: [
        argumentConversionSlot(0, 0),
        argumentConversionSlot(1, 1),
      ],
    }),
  });

  const { program } = createProgram(extension, `
    declare function pair(first: number, second: number): void;
    pair(1, 2);
  `);

  assert.throws(
    () => assertCleanProgram(program),
    /requests conversion to missing target parameter 1/,
  );
});

test("multiple source arguments cannot collapse into one non-params target parameter", () => {
  const extension = semanticExtension("duplicate-non-params-target", {
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature: singleArgumentTargetSignature("pair"),
      argumentConversions: [
        argumentConversionSlot(0, 0),
        argumentConversionSlot(1, 0),
      ],
    }),
  });

  const { program } = createProgram(extension, `
    declare function pair(first: number, second: number): void;
    pair(1, 2);
  `);

  assert.throws(
    () => assertCleanProgram(program),
    /requests multiple conversions to non-params target parameter 0/,
  );
});

test("explicit conversion slots preserve target reordering without positional inference", () => {
  let callRequest: CheckedCallMappingRequest | undefined;
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const selectedSignature: TargetSignatureSelection = {
    member: {
      id: "reordered(second, first)",
      sourceName: "reordered",
      targetName: "reordered",
      kind: "method",
      parameters: [
        { name: "targetFirst", type: { kind: "target-named", id: "Acme.First" }, passingMode: "move" },
        { name: "targetSecond", type: { kind: "target-named", id: "Acme.Second" }, passingMode: "byref-readonly" },
      ],
    },
  };
  const extension = semanticExtension("reordered-bindings", {
    mapCheckedCall: (request) => {
      callRequest = request;
      return acceptObservation({
        kind: "target",
        selectedSignature,
        argumentConversions: [
          argumentConversionSlot(0, 1),
          argumentConversionSlot(1, 0),
        ],
      });
    },
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({ convertedType: request.target as TargetTypeRef });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function reordered(first: number, second: number): void;
    reordered(1, 2);
  `);

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) === extensionHost, "Finalization must return the attached host.");
  assert.ok(callRequest !== undefined);
  const firstArgument = callRequest.arguments[0];
  const secondArgument = callRequest.arguments[1];
  assert.ok(firstArgument !== undefined && secondArgument !== undefined);
  const firstSlot = requireArgumentConversionSlot(extensionHost, callRequest.call, 0, 1);
  const secondSlot = requireArgumentConversionSlot(extensionHost, callRequest.call, 1, 0);
  const firstRequest = requireCallArgumentConversionRequest(conversionRequests, callRequest.call, 0, 1);
  const secondRequest = requireCallArgumentConversionRequest(conversionRequests, callRequest.call, 1, 0);
  const firstConversion = extensionHost.facts.get(firstRequest.slot, targetCallArgumentConversionFactKey);
  const secondConversion = extensionHost.facts.get(secondRequest.slot, targetCallArgumentConversionFactKey);
  assert.equal(firstSlot.sourceArgumentIndex, 0);
  assert.equal(secondSlot.sourceArgumentIndex, 1);
  assert.equal(firstConversion?.targetParameterIndex, 1);
  assert.deepEqual(firstConversion?.convertedType, { kind: "target-named", id: "Acme.Second" });
  assert.equal(secondConversion?.targetParameterIndex, 0);
  assert.deepEqual(secondConversion?.convertedType, { kind: "target-named", id: "Acme.First" });
  assert.equal(extensionHost.facts.get(firstSlot, targetCallArgumentPassingFactKey)?.mode, "byref-readonly");
  assert.equal(extensionHost.facts.get(secondSlot, targetCallArgumentPassingFactKey)?.mode, "move");
});

test("generic target parameters are instantiated before checked argument conversion", () => {
  let callRequest: CheckedCallMappingRequest | undefined;
  let conversionRequest: Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }> | undefined;
  const targetTypeArgument = { kind: "target-named", id: "Acme.Int32" } as const satisfies TargetTypeRef;
  const selectedSignature: TargetSignatureSelection = {
    member: {
      id: "consume<T>(Box<T>)",
      sourceName: "consume",
      targetName: "consume",
      kind: "method",
      typeParameters: [{ name: "T" }],
      parameters: [{
        name: "value",
        type: {
          kind: "target-named",
          id: "Acme.Box",
          typeArguments: [{ kind: "type-parameter", name: "T" }],
        },
        passingMode: "by-value",
      }],
    },
    targetTypeArguments: [targetTypeArgument],
  };
  const extension = semanticExtension("generic-target-parameter", {
    mapCheckedCall: (request) => {
      callRequest = request;
      return acceptObservation({
        kind: "target",
        selectedSignature,
        argumentConversions: [argumentConversionSlot(0, 0)],
      });
    },
    mapCheckedConversion: (request) => {
      if (request.conversionKind === "call-argument") {
        conversionRequest = request;
      }
      return acceptObservation({ convertedType: request.target as TargetTypeRef });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function consume<T>(value: T): void;
    consume<number>(1);
  `);

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) === extensionHost);
  assert.ok(callRequest !== undefined);
  assert.ok(conversionRequest !== undefined);
  assert.equal(conversionRequest.target.kind, "target-named");
  assert.equal(conversionRequest.targetParameter.type.kind, "target-named");
  if (conversionRequest.target.kind !== "target-named" || conversionRequest.targetParameter.type.kind !== "target-named") {
    throw new Error("Expected instantiated target-named conversion evidence.");
  }
  assert.equal(conversionRequest.target.id, "Acme.Box");
  assert.equal(conversionRequest.targetParameter.type.id, "Acme.Box");
  const instantiatedTargetArgument = conversionRequest.target.typeArguments?.[0];
  assert.deepEqual(instantiatedTargetArgument, targetTypeArgument);
  assert.ok(conversionRequest.targetParameter.type.typeArguments?.[0] === instantiatedTargetArgument);
  assert.ok(conversionRequest.target === conversionRequest.targetParameter.type, "Conversion target and instantiated target parameter must share one canonical snapshot.");
  const selected = extensionHost.facts.get(callRequest.call, selectedTargetSignatureFactKey);
  assert.equal(selected?.targetTypeArguments?.length, 1);
  assert.deepEqual(selected?.targetTypeArguments?.[0], targetTypeArgument);
});

test("invalid conversion slots are atomic while empty conversion plans remain valid", () => {
  let readRejectedFact: (() => unknown) | undefined;
  const rejectedExtension = semanticExtension("invalid-conversion-slot", {
    mapCheckedCall: (request, context) => {
      readRejectedFact = () => context.facts.get(request.call, selectedTargetSignatureFactKey);
      return acceptObservation({
        kind: "target",
        selectedSignature: singleArgumentTargetSignature("consume"),
        argumentConversions: [argumentConversionSlot(0, 1)],
      });
    },
  });

  const { program: rejectedProgram } = createProgram(rejectedExtension, `
    declare function consume(value: number): void;
    consume(1);
  `);

  assert.throws(
    () => assertCleanProgram(rejectedProgram),
    /requests conversion to missing target parameter 1/,
  );
  assert.ok(readRejectedFact !== undefined, "The invalid-slot mapper must have been observed.");
  assert.equal(readRejectedFact(), undefined, "An invalid conversion slot must not publish a selected call.");

  const acceptedCalls: CheckedCallMappingRequest[] = [];
  const acceptedExtension = semanticExtension("empty-conversion-slots", {
    mapCheckedCall: (request) => {
      acceptedCalls.push(request);
      return acceptObservation({
        kind: "target",
        selectedSignature: singleArgumentTargetSignature("consume"),
        argumentConversions: [],
      });
    },
  });
  const { program, extensionHost } = createProgram(acceptedExtension, `
    declare function consume(value: number): void;
    consume(1);
  `);

  assertCleanProgram(program);
  assert.equal(acceptedCalls.length, 1);
  assert.ok(acceptedCalls.every((request) => extensionHost.facts.get(request.call, selectedTargetSignatureFactKey) !== undefined));
  assert.equal(extensionHost.diagnostics.all().length, 0, "Target-owned inputs may omit conversion slots.");
});

test("a deferred or rejected argument conversion leaves the entire selected call transaction unpublished", () => {
  const callNames: string[] = [];
  const conversionRequests: Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }>[] = [];
  let innerCall: CheckedCallMappingRequest | undefined;
  const extension = semanticExtension("atomic-call-conversion-failure", {
    mapCheckedCall: (request) => {
      const name = Node_Text(request.callee as GoPtr<Node>);
      callNames.push(name);
      if (name !== "inner") {
        throw new Error(`The outer call must remain blocked by its unavailable inner dependency, but '${name}' was mapped.`);
      }
      innerCall = request;
      return acceptObservation({
        kind: "target",
        selectedSignature: twoArgumentTargetSignature("inner"),
        argumentConversions: [argumentConversionSlot(0, 0), argumentConversionSlot(1, 1)],
      });
    },
    mapCheckedConversion: (request, context) => {
      if (request.conversionKind !== "call-argument") {
        return acceptObservation({});
      }
      conversionRequests.push(request);
      if (request.sourceArgumentIndex === 0) {
        return acceptObservation({ convertedType: int32TargetType });
      }
      if (context.phase === "checking") {
        return deferObservation;
      }
      return rejectObservation({
        extensionId: context.extensionId,
        extensionCode: "INTENTIONAL_ARGUMENT_CONVERSION_REJECTION",
        numericCode: 9910901,
        category: "error",
        message: "Intentional argument-conversion rejection.",
        nodeOrSpan: request.expression,
        identity: "checked-operation-argument-slots:atomic-call-conversion-rejection",
      });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function inner(first: number, second: number): number;
    declare function outer(value: number): void;
    outer(inner(1, 2));
  `);

  assertCleanProgram(program);
  assert.deepEqual(callNames, ["inner"]);
  assert.ok(innerCall !== undefined);
  assert.deepEqual(conversionRequests.map((request) => request.sourceArgumentIndex), [0, 1]);
  assert.equal(extensionHost.facts.get(innerCall.call, selectedTargetSignatureFactKey), undefined);
  for (const request of conversionRequests) {
    assert.equal(extensionHost.facts.get(request.slot, targetCallArgumentConversionFactKey), undefined);
    assert.equal(extensionHost.facts.get(request.slot, targetCallArgumentPassingFactKey), undefined);
  }
  assert.equal(extensionHost.diagnostics.all().length, 0, "A checking-phase deferral must remain diagnostic-free.");

  finalizeExtensionSemantics(programOptions);
  assert.deepEqual(callNames, ["inner", "inner"]);
  assert.deepEqual(conversionRequests.map((request) => request.sourceArgumentIndex), [0, 1, 0, 1]);
  assert.equal(extensionHost.facts.get(innerCall.call, selectedTargetSignatureFactKey), undefined);
  for (const request of conversionRequests) {
    assert.equal(extensionHost.facts.get(request.slot, targetCallArgumentConversionFactKey), undefined);
    assert.equal(extensionHost.facts.get(request.slot, targetCallArgumentPassingFactKey), undefined);
  }
  const diagnostics = extensionHost.diagnostics.all();
  assert.equal(diagnostics.filter((diagnostic) => diagnostic.extensionCode === "INTENTIONAL_ARGUMENT_CONVERSION_REJECTION").length, 1);
  assert.equal(diagnostics.filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED").length, 0);
});

test("assertion and call-argument conversions coexist for one checked source expression", () => {
  const selectedSignature = singleArgumentTargetSignature("consume");
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const extension = semanticExtension("conversion-slots", {
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature,
      argumentConversions: [argumentConversionSlot(0, 0)],
    }),
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({
        convertedType: request.conversionKind === "assertion"
          ? { kind: "target-named", id: "Acme.AssertedInt32" }
          : int32TargetType,
      });
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    type int32 = number;
    declare function consume(value: int32): void;
    const value: number = 1;
    consume(value as int32);
  `);

  assertCleanProgram(program);
  assert.equal(conversionRequests.filter((request) => request.conversionKind === "assertion").length, 1);
  assert.ok(finalizeExtensionSemantics(programOptions) === extensionHost, "Finalization must return the attached host.");
  assert.equal(conversionRequests.filter((request) => request.conversionKind === "call-argument").length, 1);
  const callRequest = findSingleCallRequest(extensionHost, conversionRequests);
  const expression = callRequest.expression;
  assert.deepEqual(extensionHost.facts.get(expression, targetConversionFactKey)?.convertedType, {
    kind: "target-named",
    id: "Acme.AssertedInt32",
  });
  const callConversion = extensionHost.facts.get(callRequest.slot, targetCallArgumentConversionFactKey);
  assert.ok(callRequest.slot === callRequest.selectedSignature.argumentConversions[0]);
  assert.ok(callConversion?.call === callRequest.call, "Call conversion must retain the exact enclosing call.");
  assert.equal(callConversion?.sourceArgumentIndex, 0);
  assert.equal(callConversion?.targetParameterIndex, 0);
  assert.equal(callConversion?.targetForm, "parameter");
  assert.deepEqual(callConversion?.convertedType, int32TargetType);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Distinct conversion slots must not conflict.");
});

test("accepted no-op call conversions publish slot completion while no-op assertions publish no fact", () => {
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const extension = semanticExtension("no-op-conversion-slots", {
    mapCheckedCall: () => acceptObservation({
      kind: "target",
      selectedSignature: singleArgumentTargetSignature("consume"),
      argumentConversions: [argumentConversionSlot(0, 0)],
    }),
    mapCheckedConversion: (request) => {
      conversionRequests.push(request);
      return acceptObservation({});
    },
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    type int32 = number;
    declare function consume(value: int32): void;
    const value: number = 1;
    consume(value as int32);
  `);

  assertCleanProgram(program);
  finalizeExtensionSemantics(programOptions);
  const assertionRequest = conversionRequests.find((request) => request.conversionKind === "assertion");
  assert.ok(assertionRequest !== undefined, "The authored assertion must be observed.");
  assert.equal(
    extensionHost.facts.get(assertionRequest.expression, targetConversionFactKey),
    undefined,
    "An accepted no-op assertion must not fabricate a target conversion.",
  );
  const callRequest = findSingleCallRequest(extensionHost, conversionRequests);
  const callConversion = extensionHost.facts.get(callRequest.slot, targetCallArgumentConversionFactKey);
  assert.ok(callConversion !== undefined, "An accepted call slot must publish explicit completion even when no conversion is needed.");
  assert.ok(callConversion.slot === callRequest.slot);
  assert.ok(callConversion.call === callRequest.call);
  assert.equal(callConversion.sourceArgumentIndex, 0);
  assert.equal(callConversion.targetParameterIndex, 0);
  assert.equal(callConversion.sourceForm, "value");
  assert.equal(callConversion.targetForm, "parameter");
  assert.equal(callConversion.convertedType, undefined);
  assert.equal(callConversion.operation, undefined);
  assert.equal(extensionHost.diagnostics.all().length, 0);
});

test("nested calls behind object and conditional wrappers finalize in deterministic postorder", () => {
  const observations: Array<{ readonly name: string; readonly phase: ExtensionObservationPhase }> = [];
  const extension = semanticExtension("wrapped-dependencies", {
    mapCheckedCall: (request, context) => {
      const name = Node_Text(request.callee as GoPtr<Node>);
      observations.push({ name, phase: context.phase });
      if ((name === "boxLeft" || name === "boxRight") && context.phase === "checking") {
        return deferObservation;
      }
      return acceptObservation({
        kind: "target",
        selectedSignature: singleArgumentTargetSignature(name),
        argumentConversions: identityArgumentConversionSlots(request.arguments.length),
      });
    },
    mapCheckedConversion: () => acceptObservation({}),
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function boxLeft(value: number): number;
    declare function boxRight(value: number): number;
    declare function consume(value: { item: number }): void;
    consume({ item: true ? boxLeft(1) : boxRight(2) });
  `);

  assertCleanProgram(program);
  assert.deepEqual(observations, [
    { name: "boxLeft", phase: "checking" },
    { name: "boxRight", phase: "checking" },
  ]);
  finalizeExtensionSemantics(programOptions);
  assert.deepEqual(observations, [
    { name: "boxLeft", phase: "checking" },
    { name: "boxRight", phase: "checking" },
    { name: "boxLeft", phase: "finalization" },
    { name: "boxRight", phase: "finalization" },
    { name: "consume", phase: "finalization" },
  ]);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Wrapped dependencies must finalize without diagnostics.");
});

test("operations inside a callback body do not block the enclosing call", () => {
  const observations: Array<{ readonly name: string; readonly phase: ExtensionObservationPhase }> = [];
  const extension = semanticExtension("callback-boundary", {
    mapCheckedCall: (request, context) => {
      const name = Node_Text(request.callee as GoPtr<Node>);
      observations.push({ name, phase: context.phase });
      if (name === "box" && context.phase === "checking") {
        return deferObservation;
      }
      return acceptObservation({
        kind: "target",
        selectedSignature: singleArgumentTargetSignature(name),
        argumentConversions: identityArgumentConversionSlots(request.arguments.length),
      });
    },
    mapCheckedConversion: () => acceptObservation({}),
  });
  const { program, programOptions, extensionHost } = createProgram(extension, `
    declare function box(value: number): number;
    declare function consumeCallback(callback: () => number): void;
    consumeCallback(() => box(1));
  `);

  assertCleanProgram(program);
  assert.deepEqual(observations, [
    { name: "box", phase: "checking" },
    { name: "consumeCallback", phase: "checking" },
  ]);
  finalizeExtensionSemantics(programOptions);
  assert.deepEqual(observations, [
    { name: "box", phase: "checking" },
    { name: "consumeCallback", phase: "checking" },
    { name: "box", phase: "finalization" },
  ]);
  assert.equal(extensionHost.diagnostics.all().length, 0, "Callback boundaries must not create false dependencies.");
});

function semanticExtension(id: string, provider: Omit<TargetSemanticProvider, "identity">): CompilerExtension {
  const extensionId = `checked-operation-${id}`;
  return {
    identity: { id: extensionId, version: "1.0.0", capabilityNamespace: extensionId },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `${extensionId}-provider`,
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        ...provider,
      }), true);
    },
  };
}

function paramsTargetSignature(): TargetSignatureSelection {
  return {
    member: {
      id: "collect(params int32[])",
      sourceName: "collect",
      targetName: "collect",
      kind: "method",
      parameters: [{
        name: "values",
        type: int32ArrayTargetType,
        passingMode: "by-value",
        paramsArray: true,
      }],
    },
  };
}

function singleArgumentTargetSignature(
  name: string,
  passingMode: "by-value" | "byref-readonly" = "by-value",
): TargetSignatureSelection {
  return {
    member: {
      id: `${name}(value)`,
      sourceName: name,
      targetName: name,
      kind: "method",
      parameters: [{ name: "value", type: int32TargetType, passingMode }],
    },
  };
}

function identityArgumentConversionSlots(argumentCount: number): readonly TargetCallArgumentConversionSlot[] {
  return Array.from({ length: argumentCount }, (_, sourceArgumentIndex) =>
    argumentConversionSlot(sourceArgumentIndex, sourceArgumentIndex));
}

function convertAllArgumentsToParams(
  arguments_: readonly ExtensionFactSubject[],
  targetParameterIndex: number,
): readonly TargetCallArgumentConversionSlot[] {
  return arguments_.map((argument, sourceArgumentIndex) => IsSpreadElement(argument as GoPtr<Node>)
    ? argumentConversionSlot(sourceArgumentIndex, targetParameterIndex, "spread-sequence", "params-sequence")
    : argumentConversionSlot(sourceArgumentIndex, targetParameterIndex, "value", "params-element"));
}

function twoArgumentTargetSignature(name: string): TargetSignatureSelection {
  return {
    member: {
      id: `${name}(first, second)`,
      sourceName: name,
      targetName: name,
      kind: "method",
      parameters: [
        { name: "first", type: int32TargetType, passingMode: "by-value" },
        { name: "second", type: int32TargetType, passingMode: "by-value" },
      ],
    },
  };
}

function argumentConversionSlot(
  sourceArgumentIndex: number,
  targetParameterIndex: number,
  sourceForm: "value" | "spread-element" | "spread-sequence" = "value",
  targetForm: "parameter" | "params-element" | "params-sequence" = "parameter",
  spreadElementIndex?: number,
): TargetCallArgumentConversionSlot {
  return {
    sourceArgumentIndex,
    sourceForm,
    ...(spreadElementIndex === undefined ? {} : { spreadElementIndex }),
    targetParameterIndex,
    targetForm,
  };
}

function requireArgumentConversionSlot(
  extensionHost: ReturnType<typeof createProgram>["extensionHost"],
  call: ExtensionFactSubject,
  sourceArgumentIndex: number,
  targetParameterIndex: number,
): TargetCallArgumentConversionSlot {
  const selected = extensionHost.facts.get(call, selectedTargetSignatureFactKey);
  const slot = selected?.argumentConversions.find((candidate) =>
    candidate.sourceArgumentIndex === sourceArgumentIndex
    && candidate.targetParameterIndex === targetParameterIndex);
  if (slot === undefined) {
    throw new Error(`Missing retained argument conversion slot ${sourceArgumentIndex}:${targetParameterIndex}.`);
  }
  return slot;
}

function requireCallArgumentConversionRequest(
  requests: readonly CheckedConversionMappingRequest[],
  call: ExtensionFactSubject,
  sourceArgumentIndex: number,
  targetParameterIndex: number,
): Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }> {
  const request = requests.find((candidate): candidate is Extract<CheckedConversionMappingRequest, {
    readonly conversionKind: "call-argument";
  }> => candidate.conversionKind === "call-argument"
    && candidate.call === call
    && candidate.sourceArgumentIndex === sourceArgumentIndex
    && candidate.targetParameterIndex === targetParameterIndex);
  if (request === undefined) {
    throw new Error(`Missing call-argument conversion request ${sourceArgumentIndex}:${targetParameterIndex}.`);
  }
  assert.ok(
    request.selectedSignature.argumentConversions.includes(request.slot),
    "A conversion request must use its selected signature's canonical slot identity.",
  );
  return request;
}

function findSingleCallRequest(
  extensionHost: ReturnType<typeof createProgram>["extensionHost"],
  requests: readonly CheckedConversionMappingRequest[],
): Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }> {
  const callRequests = requests.filter((request): request is Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }> =>
    request.conversionKind === "call-argument");
  assert.equal(callRequests.length, 1);
  const request = callRequests[0]!;
  assert.ok(extensionHost.facts.get(request.call, selectedTargetSignatureFactKey) !== undefined);
  return request;
}

function createProgram(extension: CompilerExtension, sourceText: string): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ReturnType<typeof attachExtensionHost>["extensionHost"];
} {
  const files = new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ["/src/index.ts", sourceText],
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
  const extended = attachExtensionHost(baseOptions, { activeTarget: "acme", extensions: [extension] });
  return {
    program: NewProgram(extended.program),
    programOptions: extended.program,
    extensionHost: extended.extensionHost,
  };
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
