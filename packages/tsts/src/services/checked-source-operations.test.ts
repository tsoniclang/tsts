import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCompilerSessionFromFiles,
  type SourceFileQueries,
} from "../index.js";
import {
  findNodes,
  testCoreDeclarations,
  testNoLibCompilerOptions,
} from "../extensions/source-provider-test-support.js";

test("checked source exposes exact constructor selection through the direct call query", () => {
  const source = checkedQueries(`
    class Box {
      constructor(readonly value: number) {}
    }

    export const box = new Box(1);
  `);
  const constructions = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsNewExpression,
  );
  assert.equal(constructions.length, 1);
  const construction = constructions[0];
  const syntax = source.ast.as.AsNewExpression(construction);
  const selected = source.checker.getResolvedCallInfo(construction);

  assert.equal(selected?.outcome, "applicable");
  assert.equal(selected?.sourceSelectedSignatureKind, "resolved");
  assert.ok(
    selected?.sourceCallee.expression === syntax?.Expression,
    "Constructor evidence must retain the exact authored callee expression.",
  );
  assert.equal(selected?.sourceSelectedSignatureParameters.length, 1);
  assert.equal(selected?.sourceSelectedSignatureParameters[0]?.parameterName, "value");
  assert.equal(
    source.checker.typeToString(selected?.sourceSelectedSignatureParameters[0]?.selectedType),
    "number",
  );
  assert.equal(selected?.sourceArguments.length, 1);
  assert.equal(source.checker.typeToString(selected?.sourceResultType), "Box");
  assert.equal(selected?.sourceReceiver, undefined);
  const repeated = source.checker.getResolvedCallInfo(construction);
  assert.ok(
    repeated === selected,
    "Repeated constructor queries must retain the exact resolved call result.",
  );
  assert.ok(
    repeated?.selectedSignature === selected?.selectedSignature,
    "Repeated constructor queries must retain the exact selected signature.",
  );
  assert.ok(
    repeated?.sourceResultType === selected?.sourceResultType,
    "Repeated constructor queries must retain the exact result type.",
  );
});

test("checked source exposes operator syntax and checker-owned operand and result types directly", () => {
  const source = checkedQueries(`
    declare let count: number;
    declare const flag: boolean;

    export const sum = count + 1;
    export const inverted = !flag;
    count++;
  `);
  const binaries = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsBinaryExpression,
  );
  const prefixes = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsPrefixUnaryExpression,
  );
  const postfixes = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsPostfixUnaryExpression,
  );
  assert.equal(binaries.length, 1);
  assert.equal(prefixes.length, 1);
  assert.equal(postfixes.length, 1);

  const binary = source.ast.as.AsBinaryExpression(binaries[0]);
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(binary?.Left)), "number");
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(binary?.Right)), "1");
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(binaries[0])), "number");

  const prefix = source.ast.as.AsPrefixUnaryExpression(prefixes[0]);
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(prefix?.Operand)), "boolean");
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(prefixes[0])), "boolean");

  const postfix = source.ast.as.AsPostfixUnaryExpression(postfixes[0]);
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(postfix?.Operand)), "number");
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(postfixes[0])), "number");
});

test("checked source exposes authored assertion syntax and semantic source and target types", () => {
  const source = checkedQueries(`
    class Animal {}
    class Dog extends Animal {
      bark(): void {}
    }

    declare const animal: Animal;
    export const dog = animal as Dog;
  `);
  const assertions = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsAsExpression,
  );
  assert.equal(assertions.length, 1);
  const assertion = source.ast.as.AsAsExpression(assertions[0]);

  assert.equal(
    source.checker.typeToString(source.checker.getTypeAtLocation(assertion?.Expression)),
    "Animal",
  );
  assert.equal(
    source.checker.typeToString(source.checker.getTypeFromTypeNode(assertion?.Type)),
    "Dog",
  );
  assert.equal(source.checker.typeToString(source.checker.getTypeAtLocation(assertions[0])), "Dog");
  assert.ok(
    source.checker.getTypeFromTypeNode(assertion?.Type)
      === source.checker.getTypeAtLocation(assertions[0]),
    "Assertion target syntax and checked result must retain the same target type.",
  );
});

test("invalid assertions remain ordinary source diagnostics and create no extension recovery path", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": testCoreDeclarations,
      "/src/index.ts": "export const invalid = 1 as string;",
    },
    compilerOptions: testNoLibCompilerOptions,
  });
  const checked = session.checkSource();

  assert.equal(checked.extensionDiagnostics.length, 0);
  assert.deepEqual(
    checked.diagnostics.map((diagnostic) => diagnostic?.code),
    [2352],
  );
  assert.deepEqual(checked.sourceFacts.getFacts(checked.getSourceFile("/src/index.ts")), []);
});

test("type-shape tuple queries are total for primitive and tuple source types", () => {
  const source = checkedQueries(`
    export const primitive = 1;
    export const tuple = [1, "one"] as const;
  `);
  const identifiers = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsIdentifier,
  );
  const primitive = identifiers.find((node) => source.ast.text(node) === "primitive");
  const tuple = identifiers.find((node) => source.ast.text(node) === "tuple");
  assert.ok(primitive !== undefined);
  assert.ok(tuple !== undefined);

  const primitiveType = source.checker.getTypeAtLocation(primitive);
  const tupleType = source.checker.getTypeAtLocation(tuple);
  assert.equal(source.typeShape.isTuple(primitiveType), false);
  assert.deepEqual(source.typeShape.getTupleElementTypes(primitiveType), []);
  assert.equal(source.typeShape.isTuple(tupleType), true);
  assert.deepEqual(
    source.typeShape.getTupleElementTypes(tupleType).map((type) => source.checker.typeToString(type)),
    ["1", "\"one\""],
  );
});

test("type-shape property information preserves effective mapped modifiers", () => {
  const source = checkedQueries(`
    type Source = { readonly id?: number; name: string };
    type Normalized<T> = { -readonly [K in keyof T]-?: T[K] };
    declare function acceptOpen<T>(openValue: Normalized<T>): void;
    declare const sourceValue: Source;
    declare const normalizedValue: Normalized<Source>;
  `);
  const identifiers = findNodes(
    source.sourceFile,
    source.ast.children,
    source.ast.is.IsIdentifier,
  );
  const sourceValue = identifiers.find((node) => source.ast.text(node) === "sourceValue");
  const openValue = identifiers.find((node) => source.ast.text(node) === "openValue");
  const normalizedValue = identifiers.find((node) => source.ast.text(node) === "normalizedValue");
  assert.ok(sourceValue !== undefined);
  assert.ok(openValue !== undefined);
  assert.ok(normalizedValue !== undefined);

  const sourceProperties = source.typeShape.getPropertyInfos(
    source.checker.getTypeAtLocation(sourceValue),
  );
  const normalizedProperties = source.typeShape.getPropertyInfos(
    source.checker.getTypeAtLocation(normalizedValue),
  );
  assert.equal(
    source.typeShape.couldContainTypeVariables(
      source.checker.getTypeAtLocation(openValue),
    ),
    true,
  );
  assert.equal(
    source.typeShape.couldContainTypeVariables(
      source.checker.getTypeAtLocation(normalizedValue),
    ),
    false,
  );
  assert.deepEqual(
    sourceProperties.map(({ name, optional, readonly, type }) => ({
      name,
      optional,
      readonly,
      type: source.checker.typeToString(type),
    })),
    [
      { name: "id", optional: true, readonly: true, type: "number | undefined" },
      { name: "name", optional: false, readonly: false, type: "string" },
    ],
  );
  assert.deepEqual(
    normalizedProperties.map(({ name, optional, readonly, type }) => ({
      name,
      optional,
      readonly,
      type: source.checker.typeToString(type),
    })),
    [
      { name: "id", optional: false, readonly: false, type: "number" },
      { name: "name", optional: false, readonly: false, type: "string" },
    ],
  );
});

function checkedQueries(sourceText: string): SourceFileQueries {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": testCoreDeclarations,
      "/src/index.ts": sourceText,
    },
    compilerOptions: testNoLibCompilerOptions,
  });
  const checked = session.checkSource();
  assert.equal(checked.diagnostics.length, 0);
  assert.equal(checked.extensionDiagnostics.length, 0);
  const sourceFile = checked.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined, "Expected checked source file /src/index.ts.");
  return checked.getSourceFileQueries(sourceFile);
}
