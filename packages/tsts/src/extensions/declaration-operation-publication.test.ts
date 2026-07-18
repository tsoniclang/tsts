import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression, Node_Type, SourceFile_FileName } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_ForEachChild } from "../internal/ast/spine.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { AsBinaryExpression, AsElementAccessExpression, AsForInOrOfStatement } from "../internal/ast/generated/casts.js";
import {
  KindAsExpression,
  KindBinaryExpression,
  KindCallExpression,
  KindComputedPropertyName,
  KindElementAccessExpression,
  KindForOfStatement,
  KindIndexSignature,
  KindPropertyAccessExpression,
} from "../internal/ast/generated/kinds.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import {
  NewProgram,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  ExtensionHostDiagnosticCode,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  createExtensionConsumerQueries,
  deferObservation,
  finalizeExtensionSemantics,
  providerVirtualDeclarationFactKey,
  selectedTargetSignatureFactKey,
  targetConversionFactKey,
  targetOperationFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  CompilerExtension,
  ExtensionFactSubject,
  ExtensionHost,
  TargetBindingProvider,
  TargetOperationFact,
  TargetOperationProvenance,
  TargetSemanticProvider,
  TargetTypeRef,
} from "./index.js";
import { getProviderVirtualArtifactForCompiler } from "./provider-virtual-internal.js";

const regressionTarget = "neutral-regression";
const providerModuleSpecifier = "@neutral/runtime-values.js";
const numberTargetType: TargetTypeRef = Object.freeze({ kind: "source-primitive", name: "float64" });

interface CheckedOperationObservations {
  readonly calls: CheckedCallMappingRequest[];
  readonly properties: CheckedPropertyAccessMappingRequest[];
  readonly elements: CheckedElementAccessMappingRequest[];
  readonly operators: CheckedOperatorMappingRequest[];
  readonly iterations: CheckedIterationMappingRequest[];
  readonly conversions: CheckedConversionMappingRequest[];
}

test("noLib Symbol.iterator declaration computed names never publish runtime property observations or OBSERVATION_OWNER_DEFERRED", () => {
  const observations = checkedOperationObservations();
  const setup = createRegressionProgram([
    { fileName: "profile.d.ts", sourceText: symbolIteratorProfile },
    { fileName: "index.ts", sourceText: "export {};" },
  ], [semanticExtension("symbol-iterator-owner-regression", runtimeSemanticProvider("symbol-iterator-owner-provider", observations))]);
  const profile = requireSourceFile(setup.program, "/src/profile.d.ts");
  const computedAccess = onlyNodeByKind(profile, KindPropertyAccessExpression);

  assert.equal(profile.IsDeclarationFile, true);
  assert.ok(GetSourceFileOfNode(computedAccess) === profile);
  assert.equal(computedAccess.Parent?.Kind, KindComputedPropertyName);

  assertCleanProgram(setup.program);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertNoObservationOwnerDeferred(setup.extensionHost);
  assert.deepEqual(observationCounts(observations), emptyObservationCounts);
  assert.equal(setup.extensionHost.facts.get(computedAccess, targetOperationFactKey), undefined);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("legal declaration call/property/element/operator/conversion expressions are not published; iteration has no legal declaration-file statement form", () => {
  const observations = checkedOperationObservations();
  const setup = createRegressionProgram([
    { fileName: "ambient-expressions.d.ts", sourceText: ambientExpressionProfile },
    { fileName: "index.ts", sourceText: "export {};" },
  ], [semanticExtension("ambient-expression-owner-regression", runtimeSemanticProvider("ambient-expression-owner-provider", observations))]);
  const declarations = requireSourceFile(setup.program, "/src/ambient-expressions.d.ts");
  const call = onlyNodeByKind(declarations, KindCallExpression);
  const property = onlyNodeByKind(declarations, KindPropertyAccessExpression);
  const element = onlyNodeByKind(declarations, KindElementAccessExpression);
  const operator = onlyNodeByKind(declarations, KindBinaryExpression);
  const conversion = onlyNodeByKind(declarations, KindAsExpression);

  assert.equal(declarations.IsDeclarationFile, true);
  for (const expression of [call, property, element, operator, conversion]) {
    assert.ok(GetSourceFileOfNode(expression) === declarations);
  }
  assert.equal(collectNodesByKind(declarations, KindForOfStatement).length, 0);

  assertCleanProgram(setup.program);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertNoObservationOwnerDeferred(setup.extensionHost);
  assert.deepEqual(observationCounts(observations), emptyObservationCounts);
  assert.equal(setup.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(property, targetOperationFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(element, targetOperationFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(operator, targetOperationFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(conversion, targetConversionFactKey), undefined);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("ambient and type-only expressions in implementation files never publish runtime checked operations", () => {
  const observations = checkedOperationObservations();
  const setup = createRegressionProgram([
    { fileName: "ambient-expressions.ts", sourceText: ambientImplementationProfile },
  ], [semanticExtension("ambient-source-owner-regression", runtimeSemanticProvider("ambient-source-owner-provider", observations))]);
  const source = requireSourceFile(setup.program, "/src/ambient-expressions.ts");

  assert.equal(source.IsDeclarationFile, false);
  assert.ok(collectNodesByKind(source, KindCallExpression).length >= 1);
  assert.ok(collectNodesByKind(source, KindPropertyAccessExpression).length >= 2);
  assert.ok(collectNodesByKind(source, KindElementAccessExpression).length >= 1);
  assert.ok(collectNodesByKind(source, KindBinaryExpression).length >= 1);
  assert.ok(collectNodesByKind(source, KindAsExpression).length >= 1);

  assertCleanProgram(setup.program);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertNoObservationOwnerDeferred(setup.extensionHost);
  assert.deepEqual(observationCounts(observations), emptyObservationCounts);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("implementation expressions publish every checked-operation kind with exact declaration-selected evidence", () => {
  const observations = checkedOperationObservations();
  const setup = createRegressionProgram([
    { fileName: "profile.d.ts", sourceText: implementationDeclarationProfile },
    { fileName: "index.ts", sourceText: implementationOperationSource },
  ], [semanticExtension("implementation-publication-regression", runtimeSemanticProvider("implementation-publication-provider", observations))]);
  const declarations = requireSourceFile(setup.program, "/src/profile.d.ts");
  const implementation = requireSourceFile(setup.program, "/src/index.ts");
  const call = onlyNodeByKind(implementation, KindCallExpression);
  const property = onlyNodeByKind(implementation, KindPropertyAccessExpression);
  const element = onlyNodeByKind(implementation, KindElementAccessExpression);
  const operator = onlyNodeByKind(implementation, KindBinaryExpression);
  const iteration = onlyNodeByKind(implementation, KindForOfStatement);
  const conversion = onlyNodeByKind(implementation, KindAsExpression);

  assert.equal(declarations.IsDeclarationFile, true);
  assert.equal(implementation.IsDeclarationFile, false);
  assertCleanProgram(setup.program);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertNoObservationOwnerDeferred(setup.extensionHost);
  assert.deepEqual(observationCounts(observations), {
    calls: 1,
    properties: 1,
    elements: 1,
    operators: 1,
    iterations: 1,
    conversions: 1,
  });

  const callRequest = observations.calls[0]!;
  const propertyRequest = observations.properties[0]!;
  const elementRequest = observations.elements[0]!;
  const operatorRequest = observations.operators[0]!;
  const iterationRequest = observations.iterations[0]!;
  const conversionRequest = observations.conversions[0]!;

  assertImplementationOwner(implementation, callRequest.call);
  assertImplementationOwner(implementation, propertyRequest.expression);
  assertImplementationOwner(implementation, elementRequest.expression);
  assertImplementationOwner(implementation, operatorRequest.expression);
  assertImplementationOwner(implementation, iterationRequest.statement);
  assertImplementationOwner(implementation, conversionRequest.expression);

  assert.ok(callRequest.call === call);
  assert.ok(callRequest.callee === Node_Expression(call));
  assert.deepEqual(callRequest.arguments, Node_Arguments(call) ?? []);
  assert.equal(callRequest.callKind, "call");
  assert.equal(callRequest.target, regressionTarget);
  assert.ok(callRequest.sourceCallee.expression === callRequest.callee);
  assert.ok(callRequest.sourceResult.expression === call);
  assertSelectedDeclarationFrom(callRequest.sourceCallee.selectedSymbol, callRequest.sourceCallee.selectedDeclaration, declarations);
  assert.ok(callRequest.sourceSelectedDeclaration === callRequest.sourceCallee.selectedDeclaration);

  assert.ok(propertyRequest.expression === property);
  assert.ok(propertyRequest.receiver === Node_Expression(property));
  assert.equal(propertyRequest.propertyName, "property");
  assert.equal(propertyRequest.accessMode, "read");
  assert.equal(propertyRequest.callCallee, false);
  assert.equal(propertyRequest.target, regressionTarget);
  assert.ok(propertyRequest.sourceReceiver.expression === propertyRequest.receiver);
  assert.ok(propertyRequest.sourceResult.expression === property);
  assertSelectedDeclarationFrom(propertyRequest.sourceResult.selectedSymbol, propertyRequest.sourceResult.selectedDeclaration, declarations);

  const elementData = AsElementAccessExpression(element);
  assert.ok(elementData !== undefined);
  assert.ok(elementRequest.expression === element);
  assert.ok(elementRequest.receiver === elementData.Expression);
  assert.ok(elementRequest.argument === elementData.ArgumentExpression);
  assert.equal(elementRequest.accessMode, "read");
  assert.equal(elementRequest.callCallee, false);
  assert.equal(elementRequest.target, regressionTarget);
  assert.ok(elementRequest.sourceReceiver.expression === elementRequest.receiver);
  assert.ok(elementRequest.sourceArgument.expression === elementRequest.argument);
  assert.ok(elementRequest.sourceResult.expression === element);
  assertSelectedDeclarationFrom(elementRequest.sourceResult.selectedSymbol, elementRequest.sourceResult.selectedDeclaration, declarations, KindIndexSignature);

  const binaryData = AsBinaryExpression(operator);
  assert.ok(binaryData !== undefined);
  assert.ok(operatorRequest.expression === operator);
  assert.ok(operatorRequest.left === binaryData.Left);
  assert.ok(operatorRequest.right === binaryData.Right);
  assert.equal(operatorRequest.operator, "+");
  assert.equal(operatorRequest.target, regressionTarget);
  assert.ok(operatorRequest.sourceLeft?.expression === operatorRequest.left);
  assert.ok(operatorRequest.sourceRight?.expression === operatorRequest.right);
  assert.ok(operatorRequest.sourceResult.expression === operator);

  const iterationData = AsForInOrOfStatement(iteration);
  assert.ok(iterationData !== undefined);
  assert.ok(iterationRequest.statement === iteration);
  assert.ok(iterationRequest.expression === iterationData.Expression);
  assert.ok(iterationRequest.initializer === iterationData.Initializer);
  assert.equal(iterationRequest.kind, "for-of");
  assert.equal(iterationRequest.target, regressionTarget);
  assert.ok(iterationRequest.sourceIterable.expression === iterationRequest.expression);
  assert.ok(iterationRequest.sourceIterable.type !== undefined);
  assert.ok(iterationRequest.sourceElement.type !== undefined);

  assert.equal(conversionRequest.conversionKind, "assertion");
  if (conversionRequest.conversionKind !== "assertion") {
    assert.fail("The unique implementation conversion must be an assertion conversion.");
  }
  assert.ok(conversionRequest.expression === conversion);
  assert.ok(conversionRequest.source.expression === Node_Expression(conversion));
  assert.ok(conversionRequest.explicitTargetTypeNode === Node_Type(conversion));
  assert.ok(conversionRequest.target.authoredTypeNode === conversionRequest.explicitTargetTypeNode);
  assert.equal(conversionRequest.assertionKind, "as");
  assert.equal(conversionRequest.targetPlatform, regressionTarget);
  assertSelectedDeclarationFrom(conversionRequest.source.selectedSymbol, conversionRequest.source.selectedDeclaration, declarations);

  const consumer = createExtensionConsumerQueries(setup.extensionHost, "declaration-operation-publication-regression");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(selectedCall?.member.id, operationIds.call);
  assert.ok(selectedCall?.sourceCallee.expression === callRequest.sourceCallee.expression);
  assert.ok(selectedCall?.sourceCallee.selectedSymbol === callRequest.sourceCallee.selectedSymbol);
  assert.ok(selectedCall?.sourceCallee.selectedDeclaration === callRequest.sourceCallee.selectedDeclaration);
  assert.ok(selectedCall?.sourceResult.type === callRequest.sourceResult.type);
  assert.ok(selectedCall?.sourceDeclaration === callRequest.sourceSelectedDeclaration);
  assert.deepEqual(selectedCall?.argumentConversions, []);

  assertOperationProvenance(consumer.getSelectedTargetProperty(property), operationIds.property, {
    sourceExpression: propertyRequest.expression,
    sourceReceiver: propertyRequest.receiver,
    ...(propertyRequest.sourceResult.selectedSymbol === undefined ? {} : { sourceSelectedSymbol: propertyRequest.sourceResult.selectedSymbol }),
    ...(propertyRequest.sourceResult.selectedDeclaration === undefined ? {} : { sourceSelectedDeclaration: propertyRequest.sourceResult.selectedDeclaration }),
    sourceResultType: propertyRequest.sourceResult.type,
    sourceReceiverType: propertyRequest.sourceReceiver.type,
    sourceAccessMode: propertyRequest.accessMode,
    sourceCallCallee: propertyRequest.callCallee,
  });
  assertOperationProvenance(consumer.getSelectedTargetElementAccess(element), operationIds.element, {
    sourceExpression: elementRequest.expression,
    sourceReceiver: elementRequest.receiver,
    ...(elementRequest.sourceResult.selectedSymbol === undefined ? {} : { sourceSelectedSymbol: elementRequest.sourceResult.selectedSymbol }),
    ...(elementRequest.sourceResult.selectedDeclaration === undefined ? {} : { sourceSelectedDeclaration: elementRequest.sourceResult.selectedDeclaration }),
    sourceResultType: elementRequest.sourceResult.type,
    sourceReceiverType: elementRequest.sourceReceiver.type,
    sourceAccessMode: elementRequest.accessMode,
    sourceCallCallee: elementRequest.callCallee,
  });
  assertOperationProvenance(consumer.getSelectedTargetOperator(operator), operationIds.operator, {
    sourceExpression: operatorRequest.expression,
    sourceResultType: operatorRequest.sourceResult.type,
  });
  assertOperationProvenance(consumer.getSelectedTargetIteration(iteration), operationIds.iteration, {
    sourceExpression: iterationRequest.statement,
    sourceReceiver: iterationRequest.expression,
  });

  const conversionFact = consumer.getTargetConversionFact(conversion);
  assert.deepEqual(conversionFact?.convertedType, numberTargetType);
  assertOperationProvenance(conversionFact?.operation, operationIds.conversion, {
    sourceExpression: conversionRequest.expression,
    sourceReceiver: conversionRequest.source.expression,
    sourceResultType: conversionRequest.target.type,
  });
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("provider virtual declaration slices suppress computed-name observations while implementation access preserves exact provider provenance", () => {
  const observations = checkedOperationObservations();
  const setup = createRegressionProgram([
    { fileName: "profile.d.ts", sourceText: symbolProfile },
    { fileName: "index.ts", sourceText: providerOperationSource },
  ], [providerVirtualExtension(observations)]);
  const implementation = requireSourceFile(setup.program, "/src/index.ts");
  const property = onlyNodeByKind(implementation, KindPropertyAccessExpression);
  const element = onlyNodeByKind(implementation, KindElementAccessExpression);
  const call = onlyNodeByKind(implementation, KindCallExpression);

  assertCleanProgram(setup.program);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertNoObservationOwnerDeferred(setup.extensionHost);
  assert.deepEqual(observationCounts(observations), {
    calls: 1,
    properties: 1,
    elements: 1,
    operators: 0,
    iterations: 0,
    conversions: 0,
  });

  const propertyRequest = observations.properties[0]!;
  const elementRequest = observations.elements[0]!;
  const callRequest = observations.calls[0]!;
  assert.ok(propertyRequest.expression === property);
  assert.ok(elementRequest.expression === element);
  assert.ok(callRequest.call === call);
  assertImplementationOwner(implementation, propertyRequest.expression);
  assertImplementationOwner(implementation, elementRequest.expression);
  assertImplementationOwner(implementation, callRequest.call);
  assert.equal(propertyRequest.propertyName, "iterator");
  assert.equal(elementRequest.callCallee, true);
  assert.ok(callRequest.callee === element);

  const selectedDeclaration = elementRequest.sourceResult.selectedDeclaration as GoPtr<Node>;
  assert.ok(selectedDeclaration !== undefined);
  assert.ok(callRequest.sourceCallee.selectedDeclaration === selectedDeclaration);
  const declarationOwner = GetSourceFileOfNode(selectedDeclaration);
  assert.ok(declarationOwner !== undefined);
  assert.equal(declarationOwner.IsDeclarationFile, true);
  const ownerArtifact = getProviderVirtualArtifactForCompiler(setup.extensionHost.providers, SourceFile_FileName(declarationOwner));
  assert.equal(ownerArtifact?.kind, "canonical-export-owner");

  const declarationFact = setup.extensionHost.facts.get(selectedDeclaration, providerVirtualDeclarationFactKey);
  assert.equal(declarationFact?.providerId, "neutral-provider-binding");
  assert.equal(declarationFact?.providerModuleId, "neutral.runtime-values");
  assert.equal(declarationFact?.moduleSpecifier, providerModuleSpecifier);
  assert.equal(declarationFact?.exportName, "RuntimeValues");
  assert.equal(declarationFact?.memberId, "RuntimeValues.iterator");
  assert.equal(declarationFact?.signatureId, "RuntimeValues.iterator()");
  assert.deepEqual(declarationFact?.memberKey, { kind: "well-known-symbol", name: "iterator" });

  const providerComputedAccess = onlyNodeByKind(selectedDeclaration, KindPropertyAccessExpression);
  assert.ok(GetSourceFileOfNode(providerComputedAccess) === declarationOwner);
  assert.equal(providerComputedAccess.Parent?.Kind, KindComputedPropertyName);
  assert.ok(providerComputedAccess !== propertyRequest.expression);
  assert.equal(setup.extensionHost.facts.get(providerComputedAccess, targetOperationFactKey), undefined);

  const publicDocuments = setup.extensionHost.providers.getVirtualDeclarationDocuments();
  assert.equal(publicDocuments.length, 1);
  const publicSlice = Program_GetSourceFile(setup.program, publicDocuments[0]!.fileName);
  assert.ok(publicSlice !== undefined);
  assert.equal(publicSlice.IsDeclarationFile, true);
  assert.equal(getProviderVirtualArtifactForCompiler(setup.extensionHost.providers, SourceFile_FileName(publicSlice))?.kind, "public");

  const consumer = createExtensionConsumerQueries(setup.extensionHost, "provider-declaration-operation-publication-regression");
  assertOperationProvenance(consumer.getSelectedTargetProperty(property), operationIds.property, {
    sourceExpression: propertyRequest.expression,
    sourceReceiver: propertyRequest.receiver,
    ...(propertyRequest.sourceResult.selectedSymbol === undefined ? {} : { sourceSelectedSymbol: propertyRequest.sourceResult.selectedSymbol }),
    ...(propertyRequest.sourceResult.selectedDeclaration === undefined ? {} : { sourceSelectedDeclaration: propertyRequest.sourceResult.selectedDeclaration }),
    sourceResultType: propertyRequest.sourceResult.type,
    sourceReceiverType: propertyRequest.sourceReceiver.type,
    sourceAccessMode: propertyRequest.accessMode,
    sourceCallCallee: propertyRequest.callCallee,
  });
  assertOperationProvenance(consumer.getSelectedTargetElementAccess(element), operationIds.element, {
    sourceExpression: elementRequest.expression,
    sourceReceiver: elementRequest.receiver,
    ...(elementRequest.sourceResult.selectedSymbol === undefined ? {} : { sourceSelectedSymbol: elementRequest.sourceResult.selectedSymbol }),
    sourceSelectedDeclaration: selectedDeclaration,
    sourceResultType: elementRequest.sourceResult.type,
    sourceReceiverType: elementRequest.sourceReceiver.type,
    sourceAccessMode: elementRequest.accessMode,
    sourceCallCallee: elementRequest.callCallee,
  });
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(selectedCall?.member.id, operationIds.call);
  assert.ok(selectedCall?.sourceCallee.selectedSymbol === elementRequest.sourceResult.selectedSymbol);
  assert.ok(selectedCall?.sourceCallee.selectedDeclaration === selectedDeclaration);
  assert.ok(selectedCall?.sourceResult.type === callRequest.sourceResult.type);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

const operationIds = Object.freeze({
  call: "neutral.operation.call",
  property: "neutral.operation.property",
  element: "neutral.operation.element",
  operator: "neutral.operation.operator",
  iteration: "neutral.operation.iteration",
  conversion: "neutral.operation.conversion",
});

const emptyObservationCounts = Object.freeze({
  calls: 0,
  properties: 0,
  elements: 0,
  operators: 0,
  iterations: 0,
  conversions: 0,
});

function checkedOperationObservations(): CheckedOperationObservations {
  return {
    calls: [],
    properties: [],
    elements: [],
    operators: [],
    iterations: [],
    conversions: [],
  };
}

function observationCounts(observations: CheckedOperationObservations) {
  return {
    calls: observations.calls.length,
    properties: observations.properties.length,
    elements: observations.elements.length,
    operators: observations.operators.length,
    iterations: observations.iterations.length,
    conversions: observations.conversions.length,
  };
}

function semanticExtension(id: string, provider: TargetSemanticProvider): CompilerExtension {
  return {
    identity: {
      id,
      version: "1.0.0",
      capabilityNamespace: id,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider(provider), true);
    },
  };
}

function runtimeSemanticProvider(id: string, observations: CheckedOperationObservations): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity(id),
    mapCheckedCall: (request) => {
      observations.calls.push(request);
      if (isDeclarationOwned(request.call)) {
        return deferObservation;
      }
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          member: {
            id: operationIds.call,
            sourceName: "invoke",
            targetName: "invoke",
            kind: "method",
            parameters: [],
            returnType: numberTargetType,
          },
        },
        argumentConversions: [],
      });
    },
    mapCheckedPropertyAccess: (request) => {
      observations.properties.push(request);
      return isDeclarationOwned(request.expression)
        ? deferObservation
        : acceptObservation({ operation: targetOperation(operationIds.property, "property") });
    },
    mapCheckedElementAccess: (request) => {
      observations.elements.push(request);
      return isDeclarationOwned(request.expression)
        ? deferObservation
        : acceptObservation({ operation: targetOperation(operationIds.element, "indexer") });
    },
    mapCheckedOperator: (request) => {
      observations.operators.push(request);
      return isDeclarationOwned(request.expression)
        ? deferObservation
        : acceptObservation({ operation: targetOperation(operationIds.operator, "operator") });
    },
    mapCheckedIteration: (request) => {
      observations.iterations.push(request);
      return isDeclarationOwned(request.statement)
        ? deferObservation
        : acceptObservation({ operation: targetOperation(operationIds.iteration, "iteration") });
    },
    mapCheckedConversion: (request) => {
      observations.conversions.push(request);
      if (isDeclarationOwned(request.expression)) {
        return deferObservation;
      }
      return acceptObservation({
        convertedType: numberTargetType,
        operation: targetOperation(operationIds.conversion, "operator", {
          sourceExpression: request.expression,
          sourceReceiver: request.source.expression,
          sourceResultType: request.conversionKind === "assertion" ? request.target.type : request.source.type,
        }),
      });
    },
  };
}

function semanticProviderIdentity(id: string) {
  return {
    id,
    version: "1.0.0",
    target: regressionTarget,
    extensionContractVersion: TstsProviderContractVersion,
    providerKind: "semantic" as const,
  };
}

function providerVirtualExtension(observations: CheckedOperationObservations): CompilerExtension {
  return {
    identity: {
      id: "neutral-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "neutral-provider-extension",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(providerBindingProvider()), true);
      assert.equal(context.registerTargetSemanticProvider(runtimeSemanticProvider("neutral-provider-semantics", observations)), true);
    },
  };
}

function providerBindingProvider(): TargetBindingProvider {
  return {
    identity: {
      id: "neutral-provider-binding",
      version: "1.0.0",
      target: regressionTarget,
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
    },
    ownsModule: (moduleSpecifier) => moduleSpecifier === providerModuleSpecifier ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://neutral/runtime-values",
      providerModuleId: "neutral.runtime-values",
    }),
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "RuntimeValues",
        name: "RuntimeValues",
        kind: "interface",
        members: [{
          id: "RuntimeValues.iterator",
          name: { kind: "well-known-symbol", name: "iterator" },
          kind: "method",
          signatures: [{
            id: "RuntimeValues.iterator()",
            parameters: [],
            returnType: { kind: "number" },
          }],
        }],
      }],
    }),
  };
}

function targetOperation(
  operationId: string,
  operationKind: TargetOperationFact["operationKind"],
  provenance?: TargetOperationProvenance,
): TargetOperationFact {
  return {
    operationId,
    operationKind,
    targetOperation: operationId,
    resultType: numberTargetType,
    ...(provenance === undefined ? {} : { provenance }),
  };
}

function createRegressionProgram(
  files: readonly { readonly fileName: string; readonly sourceText: string }[],
  extensions: readonly CompilerExtension[],
): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
} {
  const sourceEntries = files.map(({ fileName, sourceText }) => [`/src/${fileName}`, sourceText] as const);
  let fs = FromMap(new Map<string, string>([
    ...sourceEntries,
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        strict: true,
        target: "es2015",
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: files.map(({ fileName }) => fileName),
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const compilerHost = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile(
    "/src/tsconfig.json",
    {} as CompilerOptions,
    undefined,
    compilerHost as ParseConfigHost,
    undefined,
  );
  assert.equal((configErrors ?? []).length, 0);
  const programOptions = { Config: parsed, Host: compilerHost } satisfies ProgramOptions;
  const attached = attachExtensionHost(programOptions, {
    activeTarget: regressionTarget,
    extensions,
  });
  return {
    program: NewProgram(programOptions),
    programOptions,
    extensionHost: attached.extensionHost,
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

function assertNoObservationOwnerDeferred(extensionHost: ExtensionHost): void {
  const diagnostics = extensionHost.diagnostics.all();
  assert.equal(
    diagnostics.filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_OWNER_DEFERRED").length,
    0,
  );
  assert.equal(
    diagnostics.filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.observationOwnerDeferred).length,
    0,
  );
}

function assertImplementationOwner(implementation: SourceFile, subject: ExtensionFactSubject): void {
  const owner = GetSourceFileOfNode(subject as GoPtr<Node>);
  assert.ok(owner === implementation);
  assert.equal(owner.IsDeclarationFile, false);
}

function assertSelectedDeclarationFrom(
  selectedSymbolSubject: ExtensionFactSubject | undefined,
  selectedDeclarationSubject: ExtensionFactSubject | undefined,
  expectedOwner: SourceFile,
  expectedKind?: number,
): void {
  const selectedSymbol = selectedSymbolSubject as GoPtr<Symbol>;
  const selectedDeclaration = selectedDeclarationSubject as GoPtr<Node>;
  assert.ok(selectedSymbol !== undefined);
  assert.ok(selectedDeclaration !== undefined);
  assert.ok(selectedSymbol.ValueDeclaration === selectedDeclaration);
  assert.ok(GetSourceFileOfNode(selectedDeclaration) === expectedOwner);
  assert.equal(expectedOwner.IsDeclarationFile, true);
  if (expectedKind !== undefined) {
    assert.equal(selectedDeclaration.Kind, expectedKind);
  }
}

function assertOperationProvenance(
  operation: TargetOperationFact | undefined,
  operationId: string,
  provenance: TargetOperationProvenance,
): void {
  assert.equal(operation?.operationId, operationId);
  assert.equal(operation?.targetOperation, operationId);
  assert.deepEqual(operation?.resultType, numberTargetType);
  assert.deepEqual(Object.keys(operation?.provenance ?? {}).sort(), Object.keys(provenance).sort());
  for (const [key, value] of Object.entries(provenance) as Array<[keyof TargetOperationProvenance, ExtensionFactSubject | boolean | string | undefined]>) {
    assert.ok(operation?.provenance?.[key] === value, `Operation provenance '${key}' must retain the exact selected evidence.`);
  }
}

function requireSourceFile(program: GoPtr<Program>, fileName: string): SourceFile {
  const sourceFile = Program_GetSourceFile(program, fileName);
  assert.ok(sourceFile !== undefined);
  return sourceFile;
}

function onlyNodeByKind(root: GoPtr<Node>, kind: number): Node {
  const nodes = collectNodesByKind(root, kind);
  assert.equal(nodes.length, 1, `Expected exactly one AST node of kind ${kind}.`);
  return nodes[0]!;
}

function collectNodesByKind(root: GoPtr<Node>, kind: number): Node[] {
  const nodes: Node[] = [];
  visitNodes(root, (node) => {
    if (node.Kind === kind) {
      nodes.push(node);
    }
  });
  return nodes;
}

function visitNodes(root: GoPtr<Node>, visit: (node: Node) => void): void {
  if (root === undefined) {
    return;
  }
  visit(root);
  Node_ForEachChild(root, (child) => {
    visitNodes(child, visit);
    return false as bool;
  });
}

function isDeclarationOwned(subject: ExtensionFactSubject): boolean {
  const sourceFile = GetSourceFileOfNode(subject as GoPtr<Node>);
  assert.ok(sourceFile !== undefined);
  return sourceFile.IsDeclarationFile === true;
}

const baseNoLibProfile = `
  interface Object {}
  interface Function {}
  interface CallableFunction extends Function {}
  interface NewableFunction extends Function {}
  interface Boolean {}
  interface Number {}
  interface String {}
  interface RegExp {}
  interface IArguments {}
  interface Array<T> { readonly length: number; [index: number]: T; }
`;

const symbolProfile = `
  ${baseNoLibProfile}
  interface SymbolConstructor {
    readonly iterator: unique symbol;
  }
  declare var Symbol: SymbolConstructor;
`;

const symbolIteratorProfile = `
  ${symbolProfile}
  interface IteratorResult<T, TReturn = unknown> {
    done?: boolean;
    value: T | TReturn;
  }
  interface Iterator<T, TReturn = unknown, TNext = unknown> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  }
  interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
  }
  interface Array<T> extends Iterable<T> {}
`;

const ambientExpressionProfile = `
  ${baseNoLibProfile}
  type Constructor = new () => object;
  declare const Base: Constructor;
  declare const maybeBase: Constructor | undefined;
  declare function selectBase(base: Constructor): Constructor;
  declare const baseNamespace: { readonly selected: Constructor };
  declare const baseTable: { readonly [index: number]: Constructor };

  declare class FromCall extends selectBase(Base) {}
  declare class FromProperty extends baseNamespace.selected {}
  declare class FromElement extends baseTable[0] {}
  declare class FromOperator extends (maybeBase ?? Base) {}
  declare class FromConversion extends (Base as Constructor) {}
`;

const ambientImplementationProfile = `
  ${symbolIteratorProfile}
  type Constructor = new () => object;
  declare const Base: Constructor;
  declare const maybeBase: Constructor | undefined;
  declare function selectBase(base: Constructor): Constructor;
  declare const baseNamespace: { readonly selected: Constructor };
  declare const baseTable: { readonly [index: number]: Constructor };

  declare class FromCall extends selectBase(Base) {}
  declare class FromProperty extends baseNamespace.selected {}
  declare class FromElement extends baseTable[0] {}
  declare class FromOperator extends (maybeBase ?? Base) {}
  declare class FromConversion extends (Base as Constructor) {}
`;

const implementationDeclarationProfile = `
  ${baseNoLibProfile}
  interface Box {
    readonly property: number;
    readonly [index: number]: number;
  }
  declare const box: Box;
  declare const left: number;
  declare const right: number;
  declare const asserted: unknown;
  declare const values: number[];
  declare function invoke(): number;
`;

const implementationOperationSource = `
  export const callResult = invoke();
  export const propertyResult = box.property;
  export const elementResult = box[0];
  export const operatorResult = left + right;
  export const conversionResult = asserted as number;
  export function iterate(): void {
    for (const value of values) {
      value;
    }
  }
`;

const providerOperationSource = `
  import type { RuntimeValues } from "${providerModuleSpecifier}";

  declare const runtimeValues: RuntimeValues;
  export const result = runtimeValues[Symbol.iterator]();
`;
