import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Text } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { AsForInOrOfStatement } from "../internal/ast/generated/casts.js";
import {
  KindBinaryExpression,
  KindCallExpression,
  KindElementAccessExpression,
  KindExpressionStatement,
  KindForInStatement,
  KindForOfStatement,
  KindFunctionDeclaration,
  KindIdentifier,
  KindPropertyAccessExpression,
  KindVariableDeclarationList,
} from "../internal/ast/generated/kinds.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import type { Type } from "../internal/checker/types.js";
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
  Program_GetTypeCheckerForFile,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { createTypeCheckerQueries } from "../index.js";
import {
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  finalizeExtensionSemantics,
  targetOperationFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  CompilerExtension,
  ExtensionFactSubject,
  ExtensionHost,
  TargetOperationProposal,
} from "./index.js";
import {
  beginExtensionCheckedSourceFileDecision,
  commitExtensionCheckedSourceFileDecision,
  recordExtensionCheckedPropertyAccessMapping,
} from "./checker-integration.js";
import { extensionHostGetCheckedOperationRequest } from "./host.js";

const neutralTarget = "neutral";

interface CheckedOperationObservations {
  readonly calls: CheckedCallMappingRequest[];
  readonly properties: CheckedPropertyAccessMappingRequest[];
  readonly elements: CheckedElementAccessMappingRequest[];
  readonly operators: CheckedOperatorMappingRequest[];
  readonly iterations: CheckedIterationMappingRequest[];
}

interface SourceDecisionProgram {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
  readonly observations: CheckedOperationObservations;
}

test("checker queries force canonical diagnostics and publish each checked source operation once", () => {
  const setup = createBasicOperationProgram("query-before-diagnostics");
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const call = onlyNodeByKind(index, KindCallExpression);
  const property = onlyNodeByKind(index, KindPropertyAccessExpression);
  const element = onlyNodeByKind(index, KindElementAccessExpression);
  const operator = onlyNodeByKind(index, KindBinaryExpression);

  assertProgramAndSyntaxClean(setup.program);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  assert.ok(queries.getResolvedSignature(call) !== undefined);
  for (const expression of [call, property, element, operator]) {
    assert.ok(queries.getTypeAtLocation(expression) !== undefined);
  }
  assertBasicOperationObservations(setup, { call, property, element, operator });
  const queriedCounts = observationCounts(setup.observations);

  assertAllSemanticsClean(setup.program);
  assertBasicOperationObservations(setup, { call, property, element, operator });
  assert.deepEqual(observationCounts(setup.observations), queriedCounts);
  finalizeClean(setup);

  assertBasicOperationObservations(setup, { call, property, element, operator });
  assert.deepEqual(observationCounts(setup.observations), queriedCounts);
});

test("checker queries after canonical checking are idempotent", () => {
  const setup = createBasicOperationProgram("query-after-checking");
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const call = onlyNodeByKind(index, KindCallExpression);
  const property = onlyNodeByKind(index, KindPropertyAccessExpression);
  const element = onlyNodeByKind(index, KindElementAccessExpression);
  const operator = onlyNodeByKind(index, KindBinaryExpression);
  const expressions = [call, property, element, operator];

  assertProgramAndSyntaxClean(setup.program);
  assertAllSemanticsClean(setup.program);
  assertBasicOperationObservations(setup, { call, property, element, operator });
  const checkedCounts = observationCounts(setup.observations);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  for (let repetition = 0; repetition < 2; repetition++) {
    assert.ok(queries.getResolvedSignature(call) !== undefined);
    for (const expression of expressions) {
      assert.ok(queries.getTypeAtLocation(expression) !== undefined);
    }
  }
  assert.deepEqual(observationCounts(setup.observations), checkedCounts);

  finalizeClean(setup);
  assertBasicOperationObservations(setup, { call, property, element, operator });
  const retainedFacts = expressions.slice(1).map((expression) =>
    setup.extensionHost.facts.get(expression, targetOperationFactKey));
  const retainedCounts = observationCounts(setup.observations);

  for (let repetition = 0; repetition < 2; repetition++) {
    assert.ok(queries.getResolvedSignature(call) !== undefined);
    for (const expression of expressions) {
      assert.ok(queries.getTypeAtLocation(expression) !== undefined);
    }
  }

  assert.deepEqual(observationCounts(setup.observations), retainedCounts);
  assert.ok(setup.extensionHost.facts.get(property, targetOperationFactKey) === retainedFacts[0]);
  assert.ok(setup.extensionHost.facts.get(element, targetOperationFactKey) === retainedFacts[1]);
  assert.ok(setup.extensionHost.facts.get(operator, targetOperationFactKey) === retainedFacts[2]);
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("rejected overload candidates discard nested source decisions and the winner publishes once", () => {
  const setup = createSourceDecisionProgram("overload-candidate-isolation", [
    { fileName: "profile.d.ts", sourceText: overloadProfile },
    { fileName: "index.ts", sourceText: overloadSource },
  ]);
  const profile = requireSourceFile(setup.program, "/src/profile.d.ts");
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const calls = collectNodesByKind(index, KindCallExpression);
  const properties = collectNodesByKind(index, KindPropertyAccessExpression);
  const elements = collectNodesByKind(index, KindElementAccessExpression);
  const operators = collectNodesByKind(index, KindBinaryExpression);
  const outerCall = calls.find((call) => (Node_Arguments(call) ?? []).length === 1);
  const innerCall = calls.find((call) => (Node_Arguments(call) ?? []).length === 0);
  const overloads = collectNodesByKind(profile, KindFunctionDeclaration)
    .filter((declaration) => Node_Text(Node_Name(declaration)) === "choose");

  assert.ok(outerCall !== undefined);
  assert.ok(innerCall !== undefined);
  assert.equal(calls.length, 2);
  assert.equal(properties.length, 2);
  assert.equal(elements.length, 1);
  assert.equal(operators.length, 2);
  assert.equal(overloads.length, 2);
  assertProgramAndSyntaxClean(setup.program);
  assertAllSemanticsClean(setup.program);
  finalizeClean(setup);

  assertObservedOnce(setup.observations.calls, calls, (request) => request.call);
  assertObservedOnce(setup.observations.properties, properties, (request) => request.expression);
  assertObservedOnce(setup.observations.elements, elements, (request) => request.expression);
  assertObservedOnce(setup.observations.operators, operators, (request) => request.expression);
  assert.equal(setup.observations.iterations.length, 0);

  const outerRequest = setup.observations.calls.find((request) => request.call === outerCall);
  const innerRequest = setup.observations.calls.find((request) => request.call === innerCall);
  assert.ok(outerRequest !== undefined);
  assert.ok(innerRequest !== undefined);
  assert.ok(outerRequest.sourceSelection.kind === "applicable");
  assert.ok(outerRequest.sourceSelection.declaration === overloads[1]);

  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  assert.deepEqual(
    setup.observations.properties.map((request) => queries.typeToString(request.sourceReceiver.type as GoPtr<Type>)),
    ["NumberBox", "NumberBox"],
  );
  assert.equal(queries.typeToString(setup.observations.elements[0]!.sourceReceiver.type as GoPtr<Type>), "NumberBox");
  assert.equal(queries.typeToString(innerRequest.sourceResult.type as GoPtr<Type>), "number");
  for (const request of setup.observations.operators) {
    assert.equal(request.sourceOperationKind, "operator");
    if (!("sourceLeft" in request)) {
      throw new Error("Expected a binary checked operator decision.");
    }
    assert.equal(queries.typeToString(request.sourceLeft.type as GoPtr<Type>), "number");
    assert.equal(queries.typeToString(request.sourceRight?.type as GoPtr<Type>), "number");
    assert.equal(queries.typeToString(request.sourceResult.type as GoPtr<Type>), "number");
  }
  assert.ok(setup.observations.properties.every((request) =>
    queries.typeToString(request.sourceReceiver.type as GoPtr<Type>) !== "TextBox"));
  for (const property of properties) {
    assert.equal(setup.extensionHost.facts.get(property, targetOperationFactKey)?.operationId, operationIds.property);
  }
  assert.equal(setup.extensionHost.facts.get(elements[0], targetOperationFactKey)?.operationId, operationIds.element);
  for (const operator of operators) {
    assert.equal(setup.extensionHost.facts.get(operator, targetOperationFactKey)?.operationId, operationIds.operator);
  }
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("declaration-source queries suppress runtime operation decisions", () => {
  const setup = createSourceDecisionProgram("declaration-runtime-suppression", [
    { fileName: "ambient.d.ts", sourceText: ambientOperationProfile },
    { fileName: "index.ts", sourceText: "export {};" },
  ]);
  const ambient = requireSourceFile(setup.program, "/src/ambient.d.ts");
  const call = onlyNodeByKind(ambient, KindCallExpression);
  const property = onlyNodeByKind(ambient, KindPropertyAccessExpression);
  const element = onlyNodeByKind(ambient, KindElementAccessExpression);
  const operator = onlyNodeByKind(ambient, KindBinaryExpression);

  assert.equal(ambient.IsDeclarationFile, true);
  assertProgramAndSyntaxClean(setup.program);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: ambient });
  assert.ok(queries.getResolvedSignature(call) !== undefined);
  for (const expression of [call, property, element, operator]) {
    assert.ok(queries.getTypeAtLocation(expression) !== undefined);
  }
  assertAllSemanticsClean(setup.program);
  finalizeClean(setup);

  assert.deepEqual(observationCounts(setup.observations), emptyObservationCounts);
  for (const expression of [property, element, operator]) {
    assert.equal(setup.extensionHost.facts.get(expression, targetOperationFactKey), undefined);
  }
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("flow and effects query order preserves nested optional-chain decisions", () => {
  const flowFirst = runOptionalChainQueryOrder("flow-first");
  const chainFirst = runOptionalChainQueryOrder("chain-first");

  assert.deepEqual(optionalChainObservationShape(flowFirst.observations), optionalChainObservationShape(chainFirst.observations));
  assert.deepEqual(optionalChainObservationShape(flowFirst.observations), {
    calls: [{ callKind: "call", optionalChain: true }],
    properties: [
      { accessMode: "read", callCallee: true, optionalChain: true, propertyName: "check" },
      { accessMode: "read", callCallee: false, optionalChain: true, propertyName: "guards" },
    ],
    elements: [{ accessMode: "read", callCallee: false, optionalChain: true }],
  });
});

test("for-in and for-of declaration and expression forms publish once", () => {
  const setup = createSourceDecisionProgram("iteration-form-ordering", [
    { fileName: "profile.d.ts", sourceText: iterationProfile },
    { fileName: "index.ts", sourceText: iterationSource },
  ]);
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const forInStatements = collectNodesByKind(index, KindForInStatement);
  const forOfStatements = collectNodesByKind(index, KindForOfStatement);
  const statements = [...forInStatements, ...forOfStatements];
  const bodyUses = collectNodesByKind(index, KindIdentifier)
    .filter((identifier) => identifier.Parent?.Kind === KindExpressionStatement);

  assert.equal(forInStatements.length, 2);
  assert.equal(forOfStatements.length, 2);
  assert.equal(bodyUses.length, 4);
  assertProgramAndSyntaxClean(setup.program);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  for (const useSite of [...bodyUses].reverse()) {
    const name = Node_Text(useSite);
    const expectedType = name.endsWith("Key") ? "string" : "number";
    assert.equal(queries.typeToString(queries.getTypeAtLocation(useSite)), expectedType);
  }
  assertAllSemanticsClean(setup.program);
  finalizeClean(setup);

  assertObservedOnce(setup.observations.iterations, statements, (request) => request.statement);
  assert.equal(setup.observations.calls.length, 0);
  assert.deepEqual(observationCounts(setup.observations), {
    calls: 0,
    properties: 0,
    elements: 0,
    operators: 0,
    iterations: 4,
  });
  assert.equal(setup.observations.elements.length, 0);
  assert.equal(setup.observations.operators.length, 0);
  for (const statement of statements) {
    const request = setup.observations.iterations.find((candidate) => candidate.statement === statement);
    const data = AsForInOrOfStatement(statement);
    assert.ok(request !== undefined);
    assert.ok(data !== undefined);
    assert.ok(request.initializer === data.Initializer);
    assert.ok(request.expression === data.Expression);
    assert.equal(
      request.mechanism.kind,
      statement.Kind === KindForInStatement ? "property-key-enumeration" : "array-like-index",
    );
    assert.equal(setup.extensionHost.facts.get(statement, targetOperationFactKey)?.operationId, operationIds.iteration);
  }
  for (const kind of ["for-in", "for-of"] as const) {
    const requests = setup.observations.iterations.filter((request) => request.iterationKind === kind);
    assert.equal(requests.length, 2);
    assert.equal(requests.filter((request) => (request.initializer as Node).Kind === KindVariableDeclarationList).length, 1);
    assert.equal(requests.filter((request) => (request.initializer as Node).Kind === KindIdentifier).length, 1);
  }
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("compound property assignment publishes one coherent read-write decision", () => {
  const setup = createSourceDecisionProgram("compound-property-decision", [
    { fileName: "profile.d.ts", sourceText: compoundAssignmentProfile },
    { fileName: "index.ts", sourceText: "export const result = counter.value += delta;" },
  ]);
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const property = onlyNodeByKind(index, KindPropertyAccessExpression);
  const operator = onlyNodeByKind(index, KindBinaryExpression);

  assertProgramAndSyntaxClean(setup.program);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  assert.ok(queries.getTypeAtLocation(property) !== undefined);
  assert.ok(queries.getTypeAtLocation(operator) !== undefined);
  assert.ok(queries.getTypeAtLocation(property) !== undefined);
  assertAllSemanticsClean(setup.program);
  finalizeClean(setup);

  assertObservedOnce(setup.observations.properties, [property], (request) => request.expression);
  assertObservedOnce(setup.observations.operators, [operator], (request) => request.expression);
  assert.equal(setup.observations.calls.length, 0);
  assert.equal(setup.observations.elements.length, 0);
  assert.equal(setup.observations.iterations.length, 0);
  const propertyRequest = setup.observations.properties[0]!;
  const operatorRequest = setup.observations.operators[0]!;
  assert.equal(propertyRequest.accessMode, "read-write");
  assert.equal(propertyRequest.use, "value");
  assert.equal(operatorRequest.operator, "+=");
  assert.ok(operatorRequest.left === property);
  assert.ok(operatorRequest.sourceLeft?.type === propertyRequest.sourceReadResult.type);
  assert.equal(queries.typeToString(propertyRequest.sourceReceiver.type as GoPtr<Type>), "Counter");
  assert.equal(queries.typeToString(propertyRequest.sourceReadResult.type as GoPtr<Type>), "number");
  const propertyFact = setup.extensionHost.facts.get(property, targetOperationFactKey);
  assert.equal(propertyFact?.operationId, operationIds.property);
  assert.equal(propertyFact?.provenance.sourceOperation.sourceOperationKind, "property-access");
  if (propertyFact?.provenance.sourceOperation.sourceOperationKind !== "property-access") {
    throw new Error("Expected property-access operation provenance.");
  }
  assert.equal(propertyFact.provenance.sourceOperation.accessMode, "read-write");
  assert.ok(propertyFact.provenance.sourceOperation.expression === property);
  assert.ok(propertyFact.provenance.sourceOperation.sourceReadResult.type === propertyRequest.sourceReadResult.type);
  assert.equal(setup.extensionHost.facts.get(operator, targetOperationFactKey)?.operationId, operationIds.operator);
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("identical same-origin source decisions are idempotent", () => {
  const setup = createSinglePropertyProgram("identical-source-decisions");
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const property = onlyNodeByKind(index, KindPropertyAccessExpression);

  assertProgramAndSyntaxClean(setup.program);
  assertAllSemanticsClean(setup.program);
  const retained = requireRetainedPropertyRequest(setup.extensionHost, property);
  const [checker, done] = Program_GetTypeCheckerForFile(setup.program, Background(), index);
  try {
    const frame = beginExtensionCheckedSourceFileDecision(checker, index);
    assert.ok(frame !== undefined);
    recordPropertyDecision(checker, property, retained, retained.accessMode);
    recordPropertyDecision(checker, property, retained, retained.accessMode);
    commitExtensionCheckedSourceFileDecision(checker, frame);
  } finally {
    done();
  }

  assert.ok(requireRetainedPropertyRequest(setup.extensionHost, property) === retained);
  finalizeClean(setup);
  assertObservedOnce(setup.observations.properties, [property], (request) => request.expression);
  assert.deepEqual(observationCounts(setup.observations), {
    calls: 0,
    properties: 1,
    elements: 0,
    operators: 0,
    iterations: 0,
  });
  assert.equal(setup.extensionHost.facts.get(property, targetOperationFactKey)?.operationId, operationIds.property);
  assertExtensionDiagnosticsClean(setup.extensionHost);
});

test("conflicting same-origin source decisions fail closed", () => {
  const setup = createSinglePropertyProgram("conflicting-source-decisions");
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const property = onlyNodeByKind(index, KindPropertyAccessExpression);

  assertProgramAndSyntaxClean(setup.program);
  assertAllSemanticsClean(setup.program);
  const retained = requireRetainedPropertyRequest(setup.extensionHost, property);
  const conflictingAccessMode = retained.accessMode === "read" ? "write" : "read";
  const [checker, done] = Program_GetTypeCheckerForFile(setup.program, Background(), index);
  try {
    const frame = beginExtensionCheckedSourceFileDecision(checker, index);
    assert.ok(frame !== undefined);
    recordPropertyDecision(checker, property, retained, conflictingAccessMode);
    assert.throws(
      () => commitExtensionCheckedSourceFileDecision(checker, frame),
      /selected source evidence conflicts/,
    );
  } finally {
    done();
  }

  assert.equal(
    setup.extensionHost[extensionHostGetCheckedOperationRequest](
      ExtensionObservationPoint.mapCheckedPropertyAccess,
      property,
    ),
    undefined,
  );
  assert.equal(setup.extensionHost.finalized, false);
  assert.equal(
    setup.observations.properties.length,
    1,
    "The previously committed exact source decision must map once; the conflicting later decision must not run a second mapper.",
  );
  assert.throws(
    () => finalizeExtensionSemantics(setup.programOptions),
    /previously failed and cannot be retried/,
  );
});

function runOptionalChainQueryOrder(order: "flow-first" | "chain-first"): SourceDecisionProgram {
  const setup = createSourceDecisionProgram(`optional-chain-${order}`, [
    { fileName: "profile.d.ts", sourceText: baseNoLibProfile },
    { fileName: "index.ts", sourceText: optionalChainSource },
  ]);
  const index = requireSourceFile(setup.program, "/src/index.ts");
  const call = onlyNodeByKind(index, KindCallExpression);
  const properties = collectNodesByKind(index, KindPropertyAccessExpression);
  const elements = collectNodesByKind(index, KindElementAccessExpression);
  const flowUse = collectNodesByKind(index, KindIdentifier)
    .find((identifier) => Node_Text(identifier) === "value" && identifier.Parent?.Kind === KindExpressionStatement);

  assert.equal(properties.length, 2);
  assert.equal(elements.length, 1);
  assert.ok(flowUse !== undefined);
  assertProgramAndSyntaxClean(setup.program);
  const queries = createTypeCheckerQueries(setup.program, { sourceFile: index });
  const queryFlowEffects = (): void => {
    const narrowedType = queries.getTypeAtLocation(flowUse);
    assert.equal(queries.typeToString(narrowedType), "number");
  };
  const queryOptionalChain = (): void => {
    assert.ok(queries.getResolvedSignature(call) !== undefined);
    assert.ok(queries.getTypeAtLocation(call) !== undefined);
  };
  if (order === "flow-first") {
    queryFlowEffects();
    queryOptionalChain();
  } else {
    queryOptionalChain();
    queryFlowEffects();
  }

  assertAllSemanticsClean(setup.program);
  finalizeClean(setup);
  assertObservedOnce(setup.observations.calls, [call], (request) => request.call);
  assertObservedOnce(setup.observations.properties, properties, (request) => request.expression);
  assertObservedOnce(setup.observations.elements, elements, (request) => request.expression);
  assert.equal(setup.observations.operators.length, 0);
  assert.equal(setup.observations.iterations.length, 0);
  for (const property of properties) {
    assert.equal(setup.extensionHost.facts.get(property, targetOperationFactKey)?.operationId, operationIds.property);
  }
  assert.equal(setup.extensionHost.facts.get(elements[0], targetOperationFactKey)?.operationId, operationIds.element);
  assertExtensionDiagnosticsClean(setup.extensionHost);
  return setup;
}

function optionalChainObservationShape(observations: CheckedOperationObservations) {
  return {
    calls: observations.calls.map((request) => ({
      callKind: request.callKind,
      optionalChain: request.chainRole.kind === "optional-chain",
    })),
    properties: observations.properties.map((request) => ({
      accessMode: request.accessMode,
      callCallee: request.use === "call-callee",
      optionalChain: request.chainRole.kind === "optional-chain",
      propertyName: request.propertyName,
    })).sort((left, right) => left.propertyName < right.propertyName ? -1 : left.propertyName > right.propertyName ? 1 : 0),
    elements: observations.elements.map((request) => ({
      accessMode: request.accessMode,
      callCallee: request.use === "call-callee",
      optionalChain: request.chainRole.kind === "optional-chain",
    })),
  };
}

function createBasicOperationProgram(id: string): SourceDecisionProgram {
  return createSourceDecisionProgram(id, [
    { fileName: "profile.d.ts", sourceText: basicOperationProfile },
    { fileName: "index.ts", sourceText: basicOperationSource },
  ]);
}

function createSinglePropertyProgram(id: string): SourceDecisionProgram {
  return createSourceDecisionProgram(id, [
    { fileName: "profile.d.ts", sourceText: compoundAssignmentProfile },
    { fileName: "index.ts", sourceText: "export const selected = counter.value;" },
  ]);
}

function createSourceDecisionProgram(
  id: string,
  files: readonly { readonly fileName: string; readonly sourceText: string }[],
): SourceDecisionProgram {
  const observations = checkedOperationObservations();
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
    activeTarget: neutralTarget,
    extensions: [sourceDecisionExtension(id, observations)],
  });
  return {
    program: NewProgram(attached.program),
    programOptions: attached.program,
    extensionHost: attached.extensionHost,
    observations,
  };
}

function sourceDecisionExtension(id: string, observations: CheckedOperationObservations): CompilerExtension {
  return {
    identity: {
      id: `source-decision-${id}`,
      version: "1.0.0",
      capabilityNamespace: `source-decision-${id}`,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: `source-decision-provider-${id}`,
          version: "1.0.0",
          target: neutralTarget,
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request) => {
          observations.calls.push(request);
          return acceptObservation({ kind: "source" as const });
        },
        mapCheckedPropertyAccess: (request) => {
          observations.properties.push(request);
          return acceptObservation({ operation: operation("property") });
        },
        mapCheckedElementAccess: (request) => {
          observations.elements.push(request);
          return acceptObservation({ operation: operation("element") });
        },
        mapCheckedOperator: (request) => {
          observations.operators.push(request);
          return acceptObservation({ operation: operation("operator") });
        },
        mapCheckedIteration: (request) => {
          observations.iterations.push(request);
          return acceptObservation({ operation: operation("iteration") });
        },
      }), true);
    },
  };
}

const operationIds = Object.freeze({
  property: "neutral.source-decision.property",
  element: "neutral.source-decision.element",
  operator: "neutral.source-decision.operator",
  iteration: "neutral.source-decision.iteration",
});

function operation(kind: keyof typeof operationIds): TargetOperationProposal {
  const operationKinds = {
    property: "property",
    element: "indexer",
    operator: "operator",
    iteration: "iteration",
  } as const;
  return {
    operationId: operationIds[kind],
    operationKind: operationKinds[kind],
    targetOperation: operationIds[kind],
  };
}

function checkedOperationObservations(): CheckedOperationObservations {
  return {
    calls: [],
    properties: [],
    elements: [],
    operators: [],
    iterations: [],
  };
}

const emptyObservationCounts = Object.freeze({
  calls: 0,
  properties: 0,
  elements: 0,
  operators: 0,
  iterations: 0,
});

function observationCounts(observations: CheckedOperationObservations) {
  return {
    calls: observations.calls.length,
    properties: observations.properties.length,
    elements: observations.elements.length,
    operators: observations.operators.length,
    iterations: observations.iterations.length,
  };
}

function assertBasicOperationObservations(
  setup: SourceDecisionProgram,
  nodes: {
    readonly call: Node;
    readonly property: Node;
    readonly element: Node;
    readonly operator: Node;
  },
): void {
  assertObservedOnce(setup.observations.calls, [nodes.call], (request) => request.call);
  assertObservedOnce(setup.observations.properties, [nodes.property], (request) => request.expression);
  assertObservedOnce(setup.observations.elements, [nodes.element], (request) => request.expression);
  assertObservedOnce(setup.observations.operators, [nodes.operator], (request) => request.expression);
  assert.equal(setup.observations.iterations.length, 0);
  assert.equal(setup.observations.calls[0]!.sourceSelection.kind, "applicable");
  assert.ok(setup.observations.calls[0]!.sourceResult.type !== undefined);
  assert.equal(setup.extensionHost.facts.get(nodes.property, targetOperationFactKey)?.operationId, operationIds.property);
  assert.equal(setup.extensionHost.facts.get(nodes.element, targetOperationFactKey)?.operationId, operationIds.element);
  assert.equal(setup.extensionHost.facts.get(nodes.operator, targetOperationFactKey)?.operationId, operationIds.operator);
  assertExtensionDiagnosticsClean(setup.extensionHost);
}

function assertObservedOnce<TRequest>(
  requests: readonly TRequest[],
  expectedSubjects: readonly Node[],
  getSubject: (request: TRequest) => ExtensionFactSubject,
): void {
  assert.equal(requests.length, expectedSubjects.length);
  for (const expected of expectedSubjects) {
    assert.equal(requests.filter((request) => getSubject(request) === expected).length, 1);
  }
  assert.ok(requests.every((request) => expectedSubjects.includes(getSubject(request) as Node)));
}

function requireRetainedPropertyRequest(
  extensionHost: ExtensionHost,
  property: Node,
): CheckedPropertyAccessMappingRequest {
  const request = extensionHost[extensionHostGetCheckedOperationRequest](
    ExtensionObservationPoint.mapCheckedPropertyAccess,
    property,
  );
  assert.ok(request !== undefined);
  return request;
}

function recordPropertyDecision(
  checker: Parameters<typeof recordExtensionCheckedPropertyAccessMapping>[0],
  property: Node,
  request: CheckedPropertyAccessMappingRequest,
  accessMode: CheckedPropertyAccessMappingRequest["accessMode"],
): void {
  const selected = request.accessMode === "write" ? request.sourceWriteType : request.sourceReadResult;
  if (selected === undefined) {
    throw new Error("Expected exact selected property source evidence.");
  }
  recordExtensionCheckedPropertyAccessMapping(checker, property, {
    selectedSymbol: selected.selectedSymbol as GoPtr<Symbol>,
    resultType: selected.type as GoPtr<Type>,
    receiverType: request.sourceReceiver.type as GoPtr<Type>,
    selectionMode: accessMode === "write" ? "write" : "read",
    accessMode,
    callCallee: request.use === "call-callee",
  });
}

function assertProgramAndSyntaxClean(program: GoPtr<Program>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
    assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
  }
}

function assertAllSemanticsClean(program: GoPtr<Program>): void {
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
    assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
  }
}

function finalizeClean(setup: SourceDecisionProgram): void {
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assertExtensionDiagnosticsClean(setup.extensionHost);
}

function assertExtensionDiagnosticsClean(extensionHost: ExtensionHost): void {
  const diagnostics = extensionHost.diagnostics.all();
  assert.equal(
    diagnostics.length,
    0,
    diagnostics.map((diagnostic) => `${diagnostic.extensionCode}: ${diagnostic.message}`).join("\n"),
  );
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

const basicOperationProfile = `
  ${baseNoLibProfile}
  interface Box {
    readonly property: number;
    readonly [index: number]: number;
  }
  declare const box: Box;
  declare const left: number;
  declare const right: number;
  declare function invoke(): number;
`;

const basicOperationSource = `
  export const callResult = invoke();
  export const propertyResult = box.property;
  export const elementResult = box[0];
  export const operatorResult = left + right;
`;

const overloadProfile = `
  ${baseNoLibProfile}
  interface TextBox {
    readonly property: string;
    readonly [index: number]: string;
    method(): string;
  }
  interface NumberBox {
    readonly property: number;
    readonly [index: number]: number;
    method(): number;
  }
  declare function choose(callback: (value: NumberBox) => string): "text";
  declare function choose(callback: (value: NumberBox) => number): "number";
`;

const overloadSource = `
  export const selected = choose((value: NumberBox) => value.method() + value.property + value[0]);
`;

const ambientOperationProfile = `
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
`;

const optionalChainSource = `
  interface Guard {
    check(value: unknown): value is number;
  }
  declare const registry: {
    readonly guards?: { readonly [name: string]: Guard | undefined };
  } | undefined;
  declare let value: unknown;

  if (registry?.guards?.["current"]?.check(value)) {
    value;
  }
`;

const iterationProfile = `
  ${baseNoLibProfile}
  interface Dictionary { readonly [key: string]: number; }
  declare const dictionary: Dictionary;
  declare const values: number[];
`;

const iterationSource = `
  export function iterate(): void {
    for (const declaredKey in dictionary) {
      declaredKey;
    }
    let assignedKey = "";
    for (assignedKey in dictionary) {
      assignedKey;
    }
    for (const declaredValue of values) {
      declaredValue;
    }
    let assignedValue = 0;
    for (assignedValue of values) {
      assignedValue;
    }
  }
`;

const compoundAssignmentProfile = `
  ${baseNoLibProfile}
  interface Counter { value: number; }
  declare const counter: Counter;
  declare const delta: number;
`;
