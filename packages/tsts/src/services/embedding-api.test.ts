import assert from "node:assert/strict";
import { test } from "node:test";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import type { AstReader } from "./ast-reader.js";
import { getExtensionHost } from "../extensions/host.js";
import {
  TstsSourceProviderContractVersion,
  argumentPassingFactKey,
  associatedTypeFactKey,
  attributeFactKey,
  canonicalIdentityFactKey,
  constGenericFactKey,
  createCompilerSessionFromFiles,
  defaultValueFactKey,
  fieldFactKey,
  flowStateFactKey,
  functionPointerFactKey,
  pointerFactKey,
  providerTypeFamilyFactKey,
  providerVirtualDeclarationFactKey,
  sourcePrimitiveFactKey,
  structFactKey,
  type CompilerExtension,
  type ProviderDeclarationModel,
} from "../index.js";

const core = [
  "interface Object {}",
  "interface Function {}",
  "interface CallableFunction extends Function {}",
  "interface NewableFunction extends Function {}",
  "interface IArguments {}",
  "interface String {}",
  "interface Number {}",
  "interface Boolean {}",
  "interface RegExp {}",
  "interface Array<T> { readonly length: number; [index: number]: T; }",
].join("\n");

test("public root exports the complete source-only fact vocabulary", () => {
  assert.deepEqual(
    [
      argumentPassingFactKey,
      associatedTypeFactKey,
      attributeFactKey,
      canonicalIdentityFactKey,
      constGenericFactKey,
      defaultValueFactKey,
      fieldFactKey,
      flowStateFactKey,
      functionPointerFactKey,
      pointerFactKey,
      providerTypeFamilyFactKey,
      providerVirtualDeclarationFactKey,
      sourcePrimitiveFactKey,
      structFactKey,
    ].map((key) => [key.extensionId, key.name]),
    [
      ["tsts.source-semantics", "argumentPassing"],
      ["tsts.source-semantics", "associatedType"],
      ["tsts.source-semantics", "attribute"],
      ["tsts.source-semantics", "canonicalIdentity"],
      ["tsts.source-semantics", "constGeneric"],
      ["tsts.source-semantics", "defaultValue"],
      ["tsts.source-semantics", "field"],
      ["tsts.source-semantics", "flowState"],
      ["tsts.source-semantics", "functionPointer"],
      ["tsts.source-semantics", "pointer"],
      ["tsts.provider", "typeFamily"],
      ["tsts.provider", "virtualDeclaration"],
      ["tsts.source-semantics", "sourcePrimitive"],
      ["tsts.source-semantics", "struct"],
    ],
  );
});

test("public embedding API checks a provider-backed program through direct source queries", () => {
  const moduleSpecifier = "@test/public/runtime.js";
  const model: ProviderDeclarationModel = {
    moduleSpecifier,
    providerModuleId: "Test.Public.Runtime",
    exports: [{
      id: "consume",
      name: "consume",
      kind: "function",
      signatures: [{
        id: "consume(number)",
        parameters: [{ name: "value", type: { kind: "number" } }],
        returnType: { kind: "void" },
      }],
    }],
  };
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": [
        `import { consume } from "${moduleSpecifier}";`,
        "consume(1);",
      ].join("\n"),
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
    extensionHostOptions: { extensions: [providerExtension(model)] },
  });

  const checked = session.checkSource();
  assert.equal(checked.diagnostics.length, 0);
  assert.equal(checked.extensionDiagnostics.length, 0);
  assert.equal(Object.isFrozen(session.ast), true);
  assert.equal(Object.isFrozen(session.checker), true);
  assert.equal(Object.isFrozen(session.types), true);
  assert.equal("extensionHost" in session, false);
  const sourceFile = checked.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const source = checked.getSourceFileQueries(sourceFile);
  const call = findNode(sourceFile, checked.ast, (node) => checked.ast.is.IsCallExpression(node));
  const selected = source.checker.getResolvedCallInfo(call);
  assert.equal(selected?.outcome, "applicable");
  assert.equal(source.checker.typeToString(selected?.sourceResultType), "void");
  assert.equal(
    checked.sourceFacts?.getFact(
      source.checker.getSignatureDeclaration(selected?.selectedSignature),
      providerVirtualDeclarationFactKey,
    )?.signatureId,
    "consume(number)",
  );
});

test("public AST reader distinguishes declaration-list kinds from const enum modifiers", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": [
        "var a = 1;",
        "let b = 2;",
        "const c = 3;",
        "using d = resource;",
        "await using e = asyncResource;",
        "const enum Choice { A }",
        "declare const resource: { [Symbol.dispose](): void };",
        "declare const asyncResource: { [Symbol.asyncDispose](): PromiseLike<void> };",
      ].join("\n"),
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
  });
  const sourceFile = session.getSourceFile("/src/index.ts");
  const lists = collectNodes(sourceFile, session.ast, (node) => session.ast.is.IsVariableDeclarationList(node));
  assert.deepEqual(lists.slice(0, 5).map(session.ast.variableDeclarationKind), [
    "var",
    "let",
    "const",
    "using",
    "await using",
  ]);
  const enumDeclaration = findNode(sourceFile, session.ast, (node) => session.ast.is.IsEnumDeclaration(node));
  assert.equal(session.ast.hasModifierKind(enumDeclaration, "const"), true);
  assert.equal(session.ast.variableDeclarationKind(enumDeclaration), undefined);
});

test("public AST reader exposes exact optional-parameter question tokens", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": "export function run(required: string, optional?: number): void {}",
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
  });
  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.equal(session.ast.isDeclarationFile(session.getSourceFile("/src/core.d.ts")), true);
  assert.equal(session.ast.isDeclarationFile(sourceFile), false);
  const parameters = collectNodes(sourceFile, session.ast, (node) => session.ast.is.IsParameterDeclaration(node));
  assert.equal(parameters.length, 2);
  assert.equal(session.ast.questionToken(parameters[0]), undefined);
  assert.equal(session.ast.kindName(session.ast.questionToken(parameters[1])), "KindQuestionToken");
  assert.equal(session.ast.questionToken(sourceFile), undefined);
});

test("public AST reader exposes exact binary and update operator kinds", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": [
        "let left = 1;",
        "let right = 2;",
        "left + right;",
        "++left;",
        "right--;",
      ].join("\n"),
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
  });
  const sourceFile = session.getSourceFile("/src/index.ts");
  const binary = findNode(sourceFile, session.ast, (node) => session.ast.is.IsBinaryExpression(node));
  const prefix = findNode(sourceFile, session.ast, (node) => session.ast.is.IsPrefixUnaryExpression(node));
  const postfix = findNode(sourceFile, session.ast, (node) => session.ast.is.IsPostfixUnaryExpression(node));
  assert.equal(session.ast.operatorKindName(binary), "KindPlusToken");
  assert.equal(session.ast.operatorKindName(prefix), "KindPlusPlusToken");
  assert.equal(session.ast.operatorKindName(postfix), "KindMinusMinusToken");
  assert.equal(session.ast.operatorKindName(sourceFile), undefined);
});

test("public AST reader classifies import and export type-only syntax without speculative casts", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": [
        'import "./setup.js";',
        'import type { Shape as FullType } from "./types.js";',
        'import { type Shape as InlineType } from "./types.js";',
        'import { type Shape as MixedType, value } from "./types.js";',
        'import DefaultValue, { type Shape as DefaultType } from "./types.js";',
        'import DefaultOnly from "./types.js";',
        'import * as namespaceValue from "./types.js";',
        'import type * as namespaceType from "./types.js";',
        'import {} from "./types.js";',
        'export type { Shape as ExportType } from "./types.js";',
        'export { type Shape as InlineExportType } from "./types.js";',
        'export { type Shape as MixedExportType, value as exportedValue } from "./types.js";',
      ].join("\n"),
      "/src/setup.ts": "export {};",
      "/src/types.ts": [
        "export interface Shape {}",
        "export const value = 1;",
        "export default value;",
      ].join("\n"),
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
  });
  const sourceFile = session.getSourceFile("/src/index.ts");
  const imports = collectNodes(
    sourceFile,
    session.ast,
    (node) => session.ast.is.IsImportDeclaration(node),
  );
  assert.deepEqual(
    imports.map(session.ast.isTypeOnlyImportDeclaration),
    [false, true, false, false, false, false, false, true, false],
  );

  const importSpecifiers = collectNodes(
    sourceFile,
    session.ast,
    (node) => session.ast.is.IsImportSpecifier(node),
  );
  assert.deepEqual(
    importSpecifiers.map(session.ast.isTypeOnlyImportOrExportDeclaration),
    [true, true, true, false, true],
  );

  const exportSpecifiers = collectNodes(
    sourceFile,
    session.ast,
    (node) => session.ast.is.IsExportSpecifier(node),
  );
  assert.deepEqual(
    exportSpecifiers.map(session.ast.isTypeOnlyImportOrExportDeclaration),
    [true, true, true, false],
  );
  assert.equal(session.ast.isTypeOnlyImportDeclaration(sourceFile), false);
  assert.equal(session.ast.isTypeOnlyImportOrExportDeclaration(sourceFile), false);
});

test("public provider contract keeps package subpaths as independent source modules", () => {
  const left: ProviderDeclarationModel = {
    moduleSpecifier: "@test/package/left.js",
    providerModuleId: "Test.Package.Left",
    exports: [{ id: "Left", name: "Left", kind: "class" }],
  };
  const right: ProviderDeclarationModel = {
    moduleSpecifier: "@test/package/right.js",
    providerModuleId: "Test.Package.Right",
    exports: [{ id: "Right", name: "Right", kind: "class" }],
  };
  const models = new Map([
    [left.moduleSpecifier, left],
    [right.moduleSpecifier, right],
  ]);
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/core.d.ts", "/src/index.ts"],
    files: {
      "/src/core.d.ts": core,
      "/src/index.ts": [
        `import type { Left } from "${left.moduleSpecifier}";`,
        `import type { Right } from "${right.moduleSpecifier}";`,
        "export type Pair = [Left, Right];",
      ].join("\n"),
    },
    compilerOptions: {
      noLib: true,
      module: "esnext",
      moduleResolution: "bundler",
    },
    extensionHostOptions: {
      extensions: [providerExtension(left, models)],
    },
  });

  const checked = session.checkSource();
  assert.equal(checked.diagnostics.length, 0);
  const documents = getExtensionHost(session.program!)?.providers.getVirtualDeclarationDocuments() ?? [];
  assert.equal(documents.some((document) => document.moduleSpecifier === left.moduleSpecifier), true);
  assert.equal(documents.some((document) => document.moduleSpecifier === right.moduleSpecifier), true);
  assert.notEqual(
    documents.find((document) => document.moduleSpecifier === left.moduleSpecifier)?.fileName,
    documents.find((document) => document.moduleSpecifier === right.moduleSpecifier)?.fileName,
  );
});

function providerExtension(
  firstModel: ProviderDeclarationModel,
  suppliedModels = new Map([[firstModel.moduleSpecifier, firstModel]]),
): CompilerExtension {
  return {
    identity: {
      id: "test.public-provider-extension",
      version: "1.0.0",
    },
    initialize(context): void {
      context.registerSourceDeclarationProvider({
        identity: {
          id: "test.public-provider",
          version: "1.0.0",
          extensionContractVersion: TstsSourceProviderContractVersion,
        },
        ownsModule: (specifier) => suppliedModels.has(specifier)
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule(specifier) {
          const model = suppliedModels.get(specifier);
          if (model === undefined) {
            throw new Error(`Provider resolved unowned module '${specifier}'.`);
          }
          return {
            kind: "virtual",
            moduleSpecifier: specifier,
            virtualFileName: `/provider/${model.providerModuleId}.d.ts`,
            providerModuleId: model.providerModuleId,
            packageName: "@test/package",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel(resolution) {
          const model = suppliedModels.get(resolution.moduleSpecifier);
          if (model === undefined) {
            throw new Error(`Provider model missing for '${resolution.moduleSpecifier}'.`);
          }
          return model;
        },
      });
    },
  };
}

function findNode(
  root: GoPtr<Node>,
  ast: AstReader,
  predicate: (node: GoPtr<Node>) => boolean,
): GoPtr<Node> {
  const matches = collectNodes(root, ast, predicate);
  assert.ok(matches.length > 0);
  return matches[0];
}

function collectNodes(
  root: GoPtr<Node>,
  ast: AstReader,
  predicate: (node: GoPtr<Node>) => boolean,
): Node[] {
  const matches: Node[] = [];
  const visit = (node: GoPtr<Node>): void => {
    if (node === undefined) {
      return;
    }
    if (predicate(node)) {
      matches.push(node);
    }
    for (const child of ast.children(node)) {
      visit(child);
    }
  };
  visit(root);
  return matches;
}
