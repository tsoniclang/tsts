import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import { Node_Expression, Node_Text } from "../internal/ast/ast.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { KindArrowFunction, KindCallExpression, KindElementAccessExpression, KindExpressionStatement, KindForOfStatement, KindIdentifier, KindPropertyAccessExpression } from "../internal/ast/generated/kinds.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import { NewProgram, Program_GetSemanticDiagnostics, Program_GetSourceFile } from "../internal/compiler/program.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import { TypeFlagsNumber, TypeFlagsString } from "../internal/checker/types.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { createTypeCheckerQueries } from "../index.js";

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

  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const narrowedValue = findIdentifierByText(index, "value", (node) => node?.Parent?.Kind === KindExpressionStatement);
  const narrowedType = queries.getTypeAtLocation(narrowedValue);
  assert.equal((narrowedType?.flags ?? 0) & TypeFlagsString, TypeFlagsString);

  const valueSymbol = queries.getSymbolAtLocation(narrowedValue);
  assert.equal(queries.getSymbolName(valueSymbol), "value");
  const resolvedValueSymbol = queries.getResolvedSymbol(narrowedValue);
  assert.equal(resolvedValueSymbol?.Name, "value");
  assert.equal(queries.getResolvedSymbolOrNil(narrowedValue), resolvedValueSymbol);
  assert.ok(queries.getTypeOfSymbol(valueSymbol) !== undefined);
  assert.ok(queries.getDeclaredTypeOfSymbol(valueSymbol) !== undefined);
  assert.equal(queries.getSymbolDeclarations(valueSymbol).length, 1);
  assert.equal(queries.getSymbolValueDeclaration(valueSymbol), queries.getPrimarySymbolDeclaration(valueSymbol));
  assert.equal(queries.getSymbolSourceFile(valueSymbol), index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const signature = queries.getResolvedSignature(call);
  assert.equal(queries.getSignatureParameters(signature)[0]?.Name, "x");
  assert.equal(queries.getSignatureDeclaration(signature)?.Kind, call === undefined ? undefined : queries.getPrimarySymbolDeclaration(queries.getResolvedSymbol(Node_Expression(call)))?.Kind);

  const arrow = findFirstNodeByKind(index, KindArrowFunction);
  assert.ok(queries.getContextualType(arrow) !== undefined);
  const idIdentifier = findIdentifierByText(index, "id", (node) => node?.Parent?.Kind === KindCallExpression);
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
  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const call = findFirstNodeByKind(index, KindCallExpression);

  const queryFirst = queries.getResolvedCallInfo(call);
  assert.equal(queryFirst?.outcome, "applicable");
  assert.equal(queryFirst?.call, call);
  assert.equal(queryFirst?.selectedSignature, queries.getResolvedSignature(call));
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
  assert.equal(repeated, queryFirst);
  assert.equal(repeated?.selectedSignature, queryFirst?.selectedSignature);
  assert.equal(repeated?.sourceResultType, queryFirst?.sourceResultType);
});

test("public type-checker queries expose instantiated generic member types", () => {
  const { program, index } = createProgram(`
    type int = number;
    class Box<T> { value!: T; }
    declare const nested: Box<Box<int>>;

    nested.value.value;
  `);
  assertCleanSemanticDiagnostics(program, index);

  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const finalValueAccess = findPropertyAccessByName(index, "value", (node) => node?.Parent?.Kind === KindExpressionStatement);
  const finalValueType = queries.getTypeAtLocation(finalValueAccess);
  assert.equal((finalValueType?.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  const finalValueSymbol = queries.getSymbolAtLocation(Node_Name(finalValueAccess));
  assert.equal(finalValueSymbol?.Name, "value");
  assertCleanSemanticDiagnostics(program, index);
});

test("property selection uses the selected symbol with distinct read and write types", () => {
  const { program, index } = createProgram(`
    class Model {
      get value(): string {
        return "";
      }

      set value(next: number) {}
    }

    declare const model: Model;
    const read = model.value;
    model.value = 1;
  `);
  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const readAccess = findPropertyAccessByName(index, "value", (node) => node?.Parent?.Kind !== KindCallExpression);
  const selectedSymbol = queries.getSymbolAtLocation(Node_Name(readAccess));

  assert.equal(queries.getSymbolName(selectedSymbol), "value");
  assert.equal((queries.getTypeOfSymbol(selectedSymbol)?.flags ?? 0) & TypeFlagsString, TypeFlagsString);
  assert.equal((queries.getWriteTypeOfSymbol(selectedSymbol)?.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);
  assertCleanSemanticDiagnostics(program, index);
});

test("element access info preserves mapped declarations and proven tuple ordinals", () => {
  const { program, index } = createProgram(`
    type Dictionary<Key extends string, Value> = {
      [Property in Key]: Value;
    };

    declare const dictionary: Dictionary<string, number>;
    declare const key: string;
    dictionary[key];

    declare const pair: readonly [string, number];
    const one = 1 as const;
    pair[one];
  `, { noLib: false });
  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const accesses = findNodesByKind(index, KindElementAccessExpression);
  assert.equal(accesses.length, 2);

  const mapped = queries.getResolvedElementAccessInfo(accesses[0]);
  assert.equal(mapped?.selectedSymbol, undefined);
  assert.ok(mapped?.selectedDeclaration !== undefined);
  assert.equal(mapped?.selectedElementIndex, undefined);
  assert.equal((mapped?.sourceResultType.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  const tuple = queries.getResolvedElementAccessInfo(accesses[1]);
  assert.equal(tuple?.selectedElementIndex, 1);
  assert.equal((tuple?.sourceResultType.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);

  assertCleanSemanticDiagnostics(program, index);
  assert.equal(queries.getResolvedElementAccessInfo(accesses[0]), mapped);
  assert.equal(queries.getResolvedElementAccessInfo(accesses[1]), tuple);
});

test("iteration info preserves declaration and assignment element selection", () => {
  const { program, index } = createProgram(`
    declare const values: readonly number[];
    let existing = 0;

    for (const value of values) {
      value;
    }

    for (existing of values) {
      existing;
    }
  `, { noLib: false });
  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const statements = findNodesByKind(index, KindForOfStatement);
  assert.equal(statements.length, 2);

  const declaration = queries.getResolvedIterationInfo(statements[0]);
  const assignment = queries.getResolvedIterationInfo(statements[1]);
  assert.equal(declaration?.iterationKind, "for-of");
  assert.equal(assignment?.iterationKind, "for-of");
  assert.equal((declaration?.sourceElementType.flags ?? 0) & TypeFlagsNumber, TypeFlagsNumber);
  assert.equal(assignment?.sourceElementType, declaration?.sourceElementType);
  assert.equal(Object.isFrozen(declaration), true);
  assert.equal(Object.isFrozen(declaration?.mechanism), true);
  assertCleanSemanticDiagnostics(program, index);
  assert.equal(queries.getResolvedIterationInfo(statements[0]), declaration);
  assert.equal(queries.getResolvedIterationInfo(statements[1]), assignment);
});

test("public type-checker queries expose flow-narrowed receiver member access", () => {
  const { program, index } = createProgram(`
    class PageValue { value!: string; }
    declare let current: PageValue | number;

    if (current instanceof PageValue) {
      current;
      current.value;
    }
  `);
  assertCleanSemanticDiagnostics(program, index);

  const queries = createTypeCheckerQueries(program, { sourceFile: index });
  const narrowedCurrent = findIdentifierByText(index, "current", (node) => node?.Parent?.Kind === KindExpressionStatement);
  const narrowedCurrentType = queries.getTypeAtLocation(narrowedCurrent);
  assert.equal(queries.getSymbolName(queries.getTypeSymbol(narrowedCurrentType)), "PageValue");

  const valueAccess = findPropertyAccessByName(index, "value", (node) => node?.Parent?.Kind === KindExpressionStatement);
  const valueType = queries.getTypeAtLocation(valueAccess);
  assert.equal((valueType?.flags ?? 0) & TypeFlagsString, TypeFlagsString);
  assert.equal(queries.getSymbolAtLocation(Node_Name(valueAccess))?.Name, "value");
  assertCleanSemanticDiagnostics(program, index);
});

test("assertion flow does not create false initializer circularity", () => {
  const { program, index } = createProgram(`
    interface RequestedExport {
      readonly exportedName: string;
      readonly localName?: string | undefined;
    }

    declare function assertBoundaryString(value: unknown): asserts value is string;
    declare function countString(value: string): void;

    export function snapshot(requestedExports: readonly RequestedExport[] | undefined): readonly string[] {
      const entries: string[] = [];
      if (requestedExports !== undefined) {
        for (let index = 0; index < requestedExports.length; index++) {
          const request = requestedExports[index];
          const exportedName = request.exportedName;
          const localName = request.localName;
          assertBoundaryString(exportedName);
          countString(exportedName);
          if (localName !== undefined) {
            assertBoundaryString(localName);
            countString(localName);
          }
          entries.push(localName === undefined ? exportedName : localName);
        }
      }
      return entries;
    }
  `, { noLib: false });
  assertCleanSemanticDiagnostics(program, index);
});

test("write-only JavaScript property inference does not query the circular read type", () => {
  const { program, index } = createProgram(`
    class Values {
      constructor() {
        this.items = [3];
        this.items = [this.items[0] * 2];
      }
    }
  `, { noLib: false, fileName: "index.js", checkJs: true });
  assertCleanSemanticDiagnostics(program, index);
});

function createProgram(
  sourceText: string,
  settings: { readonly noLib?: boolean; readonly fileName?: "index.ts" | "index.js"; readonly checkJs?: boolean } = {},
): { readonly program: GoPtr<Program>; readonly index: GoPtr<SourceFile> } {
  const fileName = settings.fileName ?? "index.ts";
  const sourcePath = `/src/${fileName}`;
  let fs = FromMap(new Map<string, string>([
    [sourcePath, sourceText],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: settings.noLib ?? true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
        ...(settings.checkJs === true ? { allowJs: true, checkJs: true, noEmit: true } : {}),
      },
      files: [fileName],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, sourcePath);
  assert.ok(index !== undefined);
  return { program, index };
}

function assertCleanSemanticDiagnostics(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.equal(diagnostics.length, 0, diagnostics.map(Diagnostic_String).join("\n"));
}

function findIdentifierByText(root: GoPtr<Node>, text: string, predicate: (node: GoPtr<Node>) => boolean): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found === undefined && node?.Kind === KindIdentifier && Node_Text(node) === text && predicate(node)) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findFirstNodeByKind(root: GoPtr<Node>, kind: number): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found === undefined && node?.Kind === kind) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findNodesByKind(root: GoPtr<Node>, kind: number): readonly Node[] {
  const found: Node[] = [];
  visitNodes(root, (node) => {
    if (node?.Kind === kind) {
      found.push(node);
    }
  });
  return found;
}

function findPropertyAccessByName(root: GoPtr<Node>, name: string, predicate: (node: GoPtr<Node>) => boolean): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found === undefined && node?.Kind === KindPropertyAccessExpression && Node_Text(Node_Name(node)) === name && predicate(node)) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function visitNodes(root: GoPtr<Node>, visit: (node: GoPtr<Node>) => void): void {
  if (root === undefined) {
    return;
  }
  visit(root);
  Node_ForEachChild(root, (child) => {
    visitNodes(child, visit);
    return false as bool;
  });
}
