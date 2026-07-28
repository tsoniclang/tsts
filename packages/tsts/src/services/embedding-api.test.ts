import assert from "node:assert/strict";
import { test } from "node:test";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import type { AstReader } from "./ast-reader.js";
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
  const documents = session.extensionHost?.providers.getVirtualDeclarationDocuments() ?? [];
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
      capabilityNamespace: "test.public-provider-extension",
    },
    composition: { kind: "source" },
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
