import assert from "node:assert/strict";
import { test } from "node:test";
import { createCompilerSessionFromFiles } from "../index.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { providerVirtualDeclarationFactKey } from "./facts.js";
import type { ProviderDeclarationModel } from "./index.js";
import {
  findNodes,
  sourceProviderExtension,
  testCoreDeclarations,
  testNoLibCompilerOptions,
} from "./source-provider-test-support.js";

test("provider overloads retain the exact checker-selected signature identity", () => {
  const moduleSpecifier = "@test/overloads.js";
  const model: ProviderDeclarationModel = {
    moduleSpecifier,
    providerModuleId: "Test.Overloads",
    exports: [{
      id: "choose",
      name: "choose",
      kind: "function",
      signatures: [{
        id: "choose(number)",
        parameters: [{ name: "value", type: { kind: "number" } }],
        returnType: { kind: "number" },
      }, {
        id: "choose(string)",
        parameters: [{ name: "value", type: { kind: "string" } }],
        returnType: { kind: "string" },
      }],
    }],
  };
  const checked = providerProgram(model, [
    `import { choose } from "${moduleSpecifier}";`,
    "export const numberValue: number = choose(1);",
    "export const stringValue: string = choose('one');",
  ].join("\n"));

  assertNoDiagnostics(checked);
  const sourceFile = checked.getSourceFile("/src/index.ts");
  const source = checked.getSourceFileQueries(sourceFile);
  const calls = findNodes(sourceFile, source.ast.children, source.ast.is.IsCallExpression);
  assert.deepEqual(
    calls.map((call) =>
      checked.sourceFacts?.getFact(
        source.checker.getSignatureDeclaration(
          source.checker.getResolvedCallInfo(call)?.selectedSignature,
        ),
        providerVirtualDeclarationFactKey,
      )?.signatureId),
    ["choose(number)", "choose(string)"],
  );
  assert.deepEqual(
    calls.map((call) =>
      source.checker.typeToString(
        source.checker.getResolvedCallInfo(call)?.sourceResultType,
      )),
    ["number", "string"],
  );
});

test("provider enum and namespace members retain exact declaration identities", () => {
  const moduleSpecifier = "@test/enum-namespace.js";
  const model: ProviderDeclarationModel = {
    moduleSpecifier,
    providerModuleId: "Test.EnumNamespace",
    exports: [{
      id: "Mode",
      name: "Mode",
      kind: "enum",
      members: [{
        id: "Mode::Read",
        name: "Read",
        kind: "property",
      }],
    }, {
      id: "Helpers",
      name: "Helpers",
      kind: "namespace",
      members: [{
        id: "Helpers::parse",
        name: "parse",
        kind: "method",
        signatures: [{
          id: "Helpers::parse(string)",
          parameters: [{ name: "value", type: { kind: "string" } }],
          returnType: { kind: "number" },
        }],
      }, {
        id: "Helpers::version",
        name: "version",
        kind: "property",
        type: { kind: "string" },
      }],
    }],
  };
  const checked = providerProgram(model, [
    `import { Helpers, Mode } from "${moduleSpecifier}";`,
    "export const mode: Mode = Mode.Read;",
    "export const parsed: number = Helpers.parse('1');",
    "export const version: string = Helpers.version;",
  ].join("\n"));

  assertNoDiagnostics(checked);
  const sourceFile = checked.getSourceFile("/src/index.ts");
  const source = checked.getSourceFileQueries(sourceFile);
  const properties = findNodes(
    sourceFile,
    source.ast.children,
    source.ast.is.IsPropertyAccessExpression,
  );
  assert.deepEqual(
    properties.map((property) => {
      const selected = source.checker.getResolvedPropertyAccessInfo(property);
      const fact = checked.sourceFacts?.getFact(
        selected?.selectedDeclaration,
        providerVirtualDeclarationFactKey,
      );
      return [fact?.exportId, fact?.memberId];
    }),
    [
      ["Mode", "Mode::Read"],
      ["Helpers", "Helpers::parse"],
      ["Helpers", "Helpers::version"],
    ],
  );
  const call = findNodes(
    sourceFile,
    source.ast.children,
    source.ast.is.IsCallExpression,
  )[0];
  const signature = source.checker.getResolvedCallInfo(call)?.selectedSignature;
  assert.equal(
    checked.sourceFacts?.getFact(
      source.checker.getSignatureDeclaration(signature),
      providerVirtualDeclarationFactKey,
    )?.signatureId,
    "Helpers::parse(string)",
  );
});

test("provider rest parameters retain one declared parameter across effective arguments", () => {
  const moduleSpecifier = "@test/rest-parameters.js";
  const actionType = {
    kind: "function",
    id: "invoke::action",
    parameters: [],
    returnType: { kind: "void" },
  } as const;
  const model: ProviderDeclarationModel = {
    moduleSpecifier,
    providerModuleId: "Test.RestParameters",
    exports: [{
      id: "invoke",
      name: "invoke",
      kind: "function",
      signatures: [{
        id: "invoke(...actions)",
        parameters: [{
          name: "actions",
          type: { kind: "array", elementType: actionType },
          rest: true,
        }],
        returnType: { kind: "void" },
      }],
    }],
  };
  const checked = providerProgram(model, [
    `import { invoke } from "${moduleSpecifier}";`,
    "declare const first: () => void;",
    "declare const second: () => void;",
    "invoke(first, second);",
  ].join("\n"));

  assertNoDiagnostics(checked);
  const sourceFile = checked.getSourceFile("/src/index.ts");
  const source = checked.getSourceFileQueries(sourceFile);
  const callNode = findNodes(
    sourceFile,
    source.ast.children,
    source.ast.is.IsCallExpression,
  )[0];
  const call = source.checker.getResolvedCallInfo(callNode);
  assert.equal(call?.sourceSelectedSignatureParameters.length, 1);
  assert.equal(call?.sourceSelectedSignatureParameters[0]?.parameterName, "actions");
  assert.equal(call?.sourceSelectedSignatureParameters[0]?.rest, true);
  assert.deepEqual(
    call?.sourceArgumentBindings.map((binding) => [
      binding.sourceArgumentIndex,
      binding.sourceParameterIndex,
      binding.sourceParameterForm,
    ]),
    [
      [0, 0, "rest-element"],
      [1, 0, "rest-element"],
    ],
  );
});

function providerProgram(model: ProviderDeclarationModel, source: string) {
  return createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": testCoreDeclarations,
      "/src/index.ts": source,
    },
    compilerOptions: testNoLibCompilerOptions,
    extensionHostOptions: {
      extensions: [sourceProviderExtension(new Map([[model.moduleSpecifier, model]]))],
    },
  }).checkSource();
}

function assertNoDiagnostics(checked: ReturnType<typeof providerProgram>): void {
  assert.equal(
    checked.diagnostics.length,
    0,
    checked.diagnostics.map(Diagnostic_String).join("\n"),
  );
  assert.deepEqual(checked.extensionDiagnostics, []);
}
