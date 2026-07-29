import { test } from "node:test";
import assert from "node:assert/strict";
import { Node_Expression } from "../internal/ast/ast.js";
import { Node_Name } from "../internal/ast/spine.js";
import { KindArrowFunction, KindCallExpression, KindExpressionStatement } from "../internal/ast/generated/kinds.js";
import { TypeFlagsNumber, TypeFlagsString } from "../internal/checker/types.js";
import { createTypeCheckerQueries } from "./type-checker.js";
import {
  assertCleanSemanticDiagnostics,
  createProgram,
  findFirstNodeByKind,
  findIdentifierByText,
  findNodesByKind,
  findPropertyAccessByName,
} from "./type-checker-test-support.js";

test("public type-checker queries expose TS-Go checker facts without emitter re-analysis", () => {
  const { program, index } = createProgram(`
    function id<T>(x: T): T { return x; }
    declare function takes(callback: (value: number) => void): void;
    declare let value: string | number;

    if (typeof value === "string") {
      value;
    }

    id(1);
    takes(parameter => parameter);
  `);
  assertCleanSemanticDiagnostics(program, index);

  const queries = createTypeCheckerQueries(program);
  const narrowedValue = findIdentifierByText(
    index,
    "value",
    (node) => node?.Parent?.Kind === KindExpressionStatement,
  );
  const narrowedType = queries.getTypeAtLocation(narrowedValue);
  assert.equal((narrowedType?.flags ?? 0) & TypeFlagsString, TypeFlagsString);

  const valueSymbol = queries.getSymbolAtLocation(narrowedValue);
  assert.equal(queries.getSymbolName(valueSymbol), "value");
  const resolvedValueSymbol = queries.getResolvedSymbol(narrowedValue);
  assert.equal(resolvedValueSymbol?.Name, "value");
  assert.ok(
    queries.getResolvedSymbolOrNil(narrowedValue) === resolvedValueSymbol,
    "Resolved-symbol queries must retain exact checker symbol identity.",
  );
  assert.ok(queries.getTypeOfSymbol(valueSymbol) !== undefined);
  assert.ok(queries.getDeclaredTypeOfSymbol(valueSymbol) !== undefined);
  assert.equal(queries.getSymbolDeclarations(valueSymbol).length, 1);
  assert.ok(
    queries.getSymbolValueDeclaration(valueSymbol) === queries.getPrimarySymbolDeclaration(valueSymbol),
    "The selected symbol must retain its exact value declaration.",
  );
  assert.ok(
    queries.getSymbolSourceFile(valueSymbol) === index,
    "The selected symbol must retain its exact source file.",
  );

  const call = findFirstNodeByKind(index, KindCallExpression);
  const signature = queries.getResolvedSignature(call);
  assert.equal(queries.getSignatureParameters(signature)[0]?.Name, "x");
  assert.equal(
    queries.getSignatureDeclaration(signature)?.Kind,
    call === undefined
      ? undefined
      : queries.getPrimarySymbolDeclaration(queries.getResolvedSymbol(Node_Expression(call)))?.Kind,
  );

  const arrow = findFirstNodeByKind(index, KindArrowFunction);
  assert.ok(queries.getContextualType(arrow) !== undefined);
  const idIdentifier = findIdentifierByText(
    index,
    "id",
    (node) => node?.Parent?.Kind === KindCallExpression,
  );
  const idType = queries.getTypeAtLocation(idIdentifier);
  assert.equal(queries.getCallSignaturesOfType(idType).length, 1);
  assert.equal(queries.getConstructSignaturesOfType(idType).length, 0);
  assertCleanSemanticDiagnostics(program, index);
});

test("resolved call info exposes one canonical checker-owned selected decision", () => {
  const { program, index } = createProgram(`
    class Box<T> {
      run<U>(value: U, ...rest: U[]): U {
        return value;
      }
    }

    declare const box: Box<string>;
    box.run<number>(1, 2);
  `);
  const queries = createTypeCheckerQueries(program);
  const call = findFirstNodeByKind(index, KindCallExpression);

  const queryFirst = queries.getResolvedCallInfo(call);
  assert.equal(queryFirst?.outcome, "applicable");
  assert.ok(queryFirst?.call === call, "Resolved call evidence must retain the exact call node.");
  assert.ok(
    queryFirst?.selectedSignature === queries.getResolvedSignature(call),
    "Resolved call evidence must retain the checker-selected signature.",
  );
  assert.equal(queryFirst?.sourceSelectedMethodTypeArguments?.length, 1);
  assert.equal(
    (queryFirst?.sourceSelectedMethodTypeArguments?.[0]?.selectedType.flags ?? 0) & TypeFlagsNumber,
    TypeFlagsNumber,
  );
  assert.ok(queryFirst?.sourceSelectedMethodTypeArguments?.[0]?.explicitTypeNode !== undefined);
  assert.deepEqual(
    queryFirst?.sourceSelectedSignatureParameters.map((parameter) => [
      parameter.parameterIndex,
      parameter.parameterName,
      parameter.acceptsOmission,
      parameter.rest,
    ]),
    [
      [0, "value", false, false],
      [1, "rest", true, true],
    ],
  );
  assert.equal(queryFirst?.sourceArguments.length, 2);
  assert.equal(queryFirst?.sourceArgumentBindings.length, 2);
  assert.equal(queryFirst?.sourceArgumentBindings[1]?.sourceParameterForm, "rest-element");
  assert.ok(queryFirst?.sourceReceiver !== undefined);
  assert.equal(queryFirst?.sourceCalleeAccess?.kind, "property");
  assert.ok(queryFirst?.sourceCalleeAccess?.selectedDeclaration !== undefined);
  assert.equal((queryFirst?.sourceResultType.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  assertCleanSemanticDiagnostics(program, index);
  const repeated = queries.getResolvedCallInfo(call);
  assert.ok(repeated === queryFirst, "Repeated call queries must retain the exact evidence object.");
  assert.ok(
    repeated?.selectedSignature === queryFirst?.selectedSignature,
    "Repeated call queries must retain exact signature identity.",
  );
  assert.ok(
    repeated?.sourceResultType === queryFirst?.sourceResultType,
    "Repeated call queries must retain exact result-type identity.",
  );
});

test("resolved call info retains only the winning overload candidate", () => {
  const { program, index } = createProgram(`
    class Box {
      run(value: string): string;
      run(value: number): number;
      run(value: string | number): string | number {
        return value;
      }
    }

    declare const box: Box;
    box.run(1);
  `);
  const queries = createTypeCheckerQueries(program);
  const call = findFirstNodeByKind(index, KindCallExpression);

  const selected = queries.getResolvedCallInfo(call);
  assert.equal(selected?.outcome, "applicable");
  assert.equal(selected?.sourceSelectedSignatureParameters.length, 1);
  assert.equal(
    (selected?.sourceSelectedSignatureParameters[0]?.selectedType.flags ?? 0) & TypeFlagsNumber,
    TypeFlagsNumber,
  );
  assert.equal((selected?.sourceResultType.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  assertCleanSemanticDiagnostics(program, index);
  assert.ok(
    queries.getResolvedCallInfo(call) === selected,
    "Repeated overload selection must retain the exact winning evidence.",
  );
});

test("resolved call info preserves omission semantics without inventing effective arguments", () => {
  const { program, index } = createProgram(`
    declare function consume(value: number, state?: object): void;
    consume(1);
  `);
  const queries = createTypeCheckerQueries(program);
  const call = findFirstNodeByKind(index, KindCallExpression);
  queries.getTypeAtLocation(call);
  const selected = queries.getResolvedCallInfo(call);

  assert.equal(selected?.outcome, "applicable");
  assert.deepEqual(
    selected?.sourceSelectedSignatureParameters.map((parameter) => [
      parameter.parameterIndex,
      parameter.parameterName,
      parameter.acceptsOmission,
      parameter.rest,
    ]),
    [
      [0, "value", false, false],
      [1, "state", true, false],
    ],
  );
  assert.equal(selected?.sourceArguments.length, 1);
  assert.equal(selected?.sourceArgumentBindings.length, 1);
  assert.equal(selected?.sourceArgumentBindings[0]?.sourceParameterIndex, 0);
  assertCleanSemanticDiagnostics(program, index);
});

test("resolved call info preserves an applicable zero-argument decision", () => {
  const { program, index } = createProgram(`
    declare function clear(): void;
    clear();
  `);
  const queries = createTypeCheckerQueries(program);
  const calls = findNodesByKind(index, KindCallExpression);
  assert.equal(calls.length, 1);
  assert.equal(queries.getResolvedCallInfo(index), undefined);

  const selected = queries.getResolvedCallInfo(calls[0]);
  assert.equal(selected?.outcome, "applicable");
  assert.deepEqual(selected?.sourceSelectedSignatureParameters, []);
  assert.deepEqual(selected?.sourceArguments, []);
  assert.deepEqual(selected?.sourceArgumentBindings, []);
  assertCleanSemanticDiagnostics(program, index);
});

test("public type-checker queries expose instantiated generic member types", () => {
  const { program, index } = createProgram(`
    type int = number;
    class Box<T> { value!: T; }
    declare const nested: Box<Box<int>>;

    nested.value.value;
  `);
  assertCleanSemanticDiagnostics(program, index);

  const queries = createTypeCheckerQueries(program);
  const finalValueAccess = findPropertyAccessByName(
    index,
    "value",
    (node) => node?.Parent?.Kind === KindExpressionStatement,
  );
  const finalValueType = queries.getTypeAtLocation(finalValueAccess);
  assert.equal((finalValueType?.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  const finalValueSymbol = queries.getSymbolAtLocation(Node_Name(finalValueAccess));
  assert.equal(finalValueSymbol?.Name, "value");
  assertCleanSemanticDiagnostics(program, index);
});
