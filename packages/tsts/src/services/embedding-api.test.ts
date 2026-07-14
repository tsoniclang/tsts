import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ExtensionLifecycleEvent,
  ExtensionObservationPoint,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHostToProgram,
  attributeFactKey,
  createCompilerSessionFromFiles,
  createExtensionConsumerQueries,
  createSourceSemanticsExtension,
  defaultValueFactKey,
  fieldFactKey,
  formatDiagnostics,
  sourcePrimitive,
  structFactKey,
} from "../index.js";
import type {
  AstReader,
  CompilerExtension,
  CompilerSession,
  DefaultValueFact,
  ExtensionDiagnosticSourceSpan,
  ExtensionFactSubject,
  Node,
  ProviderDeclarationModel,
  ProviderModuleResolution,
  ProviderVirtualDeclarationDocument,
  RequiredProviderModuleSpec,
  SourceCallMarkerKind,
  SourceFile,
  SourceSemanticsModuleCapability,
  SourceTypeMarkerKind,
  TargetBindingProvider,
  TargetConversionFact,
  TargetIdentity,
  TargetOperationFact,
  TargetSemanticProvider,
} from "../index.js";

test("public root exports source metadata fact keys", () => {
  assert.equal(attributeFactKey.name, "attribute");
  assert.equal(defaultValueFactKey.name, "defaultValue");
  assert.equal(fieldFactKey.name, "field");
  assert.equal(structFactKey.name, "struct");
});

test("public root exposes generic extension host contracts", () => {
  const capability: SourceSemanticsModuleCapability = "primitive";
  const callMarker: SourceCallMarkerKind = "defaultof";
  const typeMarker: SourceTypeMarkerKind = "ptr";
  const subject = {};
  const sourceSpan = { sourceFile: subject, pos: 1, end: 2 } satisfies ExtensionDiagnosticSourceSpan;
  const requiredModule = { specifierPrefix: "@acme/native/" } satisfies RequiredProviderModuleSpec;
  const defaultValue = { type: subject } satisfies DefaultValueFact;
  const conversion = { convertedType: { kind: "source-primitive", name: "int32" } } satisfies TargetConversionFact;
  const virtualDocument = {
    uri: "tsts-provider://acme/native",
    fileName: "tsts-provider://acme/native/index.ts",
    artifactId: "provider-public:acme-native:index",
    artifactKind: "public",
    moduleSpecifier: "@acme/native/index.js",
    providerModuleId: "acme.native",
    provider: {
      id: "acme.provider",
      version: "1",
      target: "acme-target",
      extensionContractVersion: TstsProviderContractVersion,
    },
    declarationModel: {
      moduleSpecifier: "@acme/native/index.js",
      providerModuleId: "acme.native",
      exports: [],
    },
    sourceText: "",
    readOnly: true,
  } satisfies ProviderVirtualDeclarationDocument;

  assert.equal(typeof attachExtensionHostToProgram, "function");
  assert.deepEqual([capability, callMarker, typeMarker], ["primitive", "defaultof", "ptr"]);
  assert.equal(sourceSpan.sourceFile, subject);
  assert.equal(requiredModule.specifierPrefix, "@acme/native/");
  assert.equal(defaultValue.type, subject);
  assert.equal(conversion.convertedType?.kind, "source-primitive");
  assert.equal(virtualDocument.provider.extensionContractVersion, TstsProviderContractVersion);
});

test("public embedding API drives a provider-backed program without internal imports", () => {
  const session = createEmbeddingSession(`
    import type { INT } from "@acme/native/types.js";
    import { consume } from "@acme/runtime.js";

    enum Mode {
      Read = 1,
      Write = Read << 1,
    }

    type Pair = [INT, string];
    type Maybe = string | INT[];
    class Box<T> { static create(): void {} value!: T; }
    class DerivedBox<T> extends Box<T> {}

    declare const values: INT[];
    declare const boxed: Box<INT>;
    let item!: INT;

    for (item of values) {
      consume(item);
    }

    boxed.value;
    export { Mode, boxed };
  `);

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const diagnostics = session.getDiagnostics("all", sourceFile);
  assert.equal(diagnostics.length, 0, formatDiagnostics(diagnostics.filter((diagnostic) => diagnostic !== undefined), "/src"));
  const enumeratedSourceFileNames = new Set(session.getSourceFiles().map((file) => session.ast.getFileName(file)));
  const publicDocuments = session.extensionHost?.providers.getVirtualDeclarationDocuments() ?? [];
  assert.ok(publicDocuments.length > 0);
  assert.ok(publicDocuments.every((document) => enumeratedSourceFileNames.has(document.fileName)));
  const canonicalOwnerFileNames = new Set(publicDocuments.flatMap((document) =>
    [...document.sourceText.matchAll(/from "([^"]+\.tsts-export-owner-[^"]+\.d\.ts)"/g)].map((match) => match[1]!)));
  assert.ok(canonicalOwnerFileNames.size > 0);
  for (const ownerFileName of canonicalOwnerFileNames) {
    assert.equal(session.getSourceFile(ownerFileName), undefined);
    assert.equal(enumeratedSourceFileNames.has(ownerFileName), false);
  }
  assert.ok(session.getSourceFilesToEmit().some((file) => session.ast.getFileName(file) === "/src/index.ts"));

  const importDeclaration = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsImportDeclaration(node)
    && ast.text(ast.as.AsImportDeclaration(node)?.ModuleSpecifier) === "@acme/runtime.js");
  const moduleSpecifier = session.ast.as.AsImportDeclaration(importDeclaration)?.ModuleSpecifier;
  const moduleSymbol = session.checker.getModuleSymbolFromSpecifier(moduleSpecifier);
  const resolvedModuleSymbol = session.checker.getResolvedExternalModuleSymbol(moduleSymbol);
  assert.ok(resolvedModuleSymbol !== undefined);
  assert.ok(session.checker.getExportsOfModule(resolvedModuleSymbol).some((symbol) => symbol?.Name === "consume"));

  const typeImport = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsImportDeclaration(node)
    && ast.text(ast.as.AsImportDeclaration(node)?.ModuleSpecifier) === "@acme/native/types.js");
  assert.equal(session.ast.isTypeOnlyImportDeclaration(typeImport), true);

  const derivedBox = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsClassDeclaration(node) && ast.text(ast.name(node)) === "DerivedBox");
  assert.equal(session.ast.extendsHeritageElements(derivedBox).length, 1);

  const createMethod = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsMethodDeclaration(node) && ast.text(ast.name(node)) === "create");
  assert.equal(session.ast.hasModifierKind(createMethod, "static"), true);

  const consumeIdentifier = findNode(sourceFile, session.ast, (node, ast) => ast.is.IsIdentifier(node) && ast.text(node) === "consume");
  const consumeAlias = session.checker.getSymbolAtLocation(consumeIdentifier);
  assert.equal(consumeAlias?.Name, "consume");
  assert.equal(session.checker.getAliasedSymbol(consumeAlias)?.Name, "consume");

  const writeMember = findNode(sourceFile, session.ast, (node, ast) => ast.is.IsEnumMember(node) && ast.text(ast.name(node)) === "Write");
  assert.equal(session.checker.getConstantValue(writeMember), 2);

  const call = findNode(sourceFile, session.ast, (node, ast) => ast.is.IsCallExpression(node));
  const callSignature = session.checker.getResolvedSignature(call);
  assert.equal(session.checker.typeToString(session.checker.getReturnTypeOfSignature(callSignature)), "void");

  const boxedValue = findNode(sourceFile, session.ast, (node, ast) => ast.is.IsPropertyAccessExpression(node) && ast.text(ast.name(node)) === "value");
  const boxedValueType = session.checker.getTypeAtLocation(boxedValue);
  assert.equal(session.types.isNumberLike(boxedValueType), true);
  assert.equal(session.types.typeToString(boxedValueType), "number");

  const pairType = session.checker.getTypeFromTypeNode(findTypeAliasType(sourceFile, session.ast, "Pair"));
  assert.equal(session.types.isTuple(pairType), true);
  assert.equal(session.types.getTupleElementTypes(pairType).length, 2);

  const maybeType = session.checker.getTypeFromTypeNode(findTypeAliasType(sourceFile, session.ast, "Maybe"));
  assert.equal(session.types.isUnion(maybeType), true);
  assert.equal(session.types.getUnionOrIntersectionTypes(maybeType).length, 2);

  const forOfStatement = findNode(sourceFile, session.ast, (node, ast) => ast.is.IsForOfStatement(node));
  assert.equal(session.isFinalized(), false);
  const extensionHost = session.finalizeExtensions();
  assert.equal(session.isFinalized(), true);
  assert.ok(extensionHost !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "embedding-test");
  assert.equal(consumer.getSelectedTargetIteration(forOfStatement)?.operationKind, "iteration");
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "Acme.Runtime.consume(INT)");
  assert.throws(() => consumer.mustSelectedTargetIteration(boxedValue, "emitting non-iteration"), /requires extension fact/);
});

test("public AST reader classifies variable declaration kinds without conflating modifiers", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: {
      "/src/index.ts": `
        export {};
        declare function acquire(): unknown;
        declare function acquireAsync(): unknown;

        var classicVar = 1, secondVar = 2;
        let blockLet = 3;
        export const fixedConst = 4;
        using syncResource = acquire();
        await using asyncResource = acquireAsync();

        for (let loopLet = 0; loopLet < 1; loopLet++) {}
        for (const loopConst of [1]) {}

        export const enum Mode { Value }
      `,
    },
    rootFiles: ["/src/index.ts"],
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      target: "esnext",
    },
  });

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const syntacticDiagnostics = session.getDiagnostics("syntactic", sourceFile);
  assert.equal(syntacticDiagnostics.length, 0, formatDiagnostics(syntacticDiagnostics.filter((diagnostic) => diagnostic !== undefined), "/src"));
  const expectedKinds = new Map([
    ["classicVar", "var"],
    ["secondVar", "var"],
    ["blockLet", "let"],
    ["fixedConst", "const"],
    ["syncResource", "using"],
    ["asyncResource", "await using"],
    ["loopLet", "let"],
    ["loopConst", "const"],
  ] as const);

  for (const [name, expectedKind] of expectedKinds) {
    const declaration = findNode(sourceFile, session.ast, (node, ast) =>
      ast.is.IsVariableDeclaration(node) && ast.text(ast.name(node)) === name);
    const declarationList = session.ast.parent(declaration);
    assert.equal(session.ast.is.IsVariableDeclarationList(declarationList), true, name);
    assert.equal(session.ast.variableDeclarationKind(declaration), expectedKind, name);
    assert.equal(session.ast.variableDeclarationKind(declarationList), expectedKind, name);

    const owner = session.ast.parent(declarationList);
    if (session.ast.is.IsVariableStatement(owner)) {
      assert.equal(session.ast.variableDeclarationKind(owner), expectedKind, name);
    } else {
      assert.equal(session.ast.variableDeclarationKind(owner), undefined, name);
    }
  }

  const fixedConst = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsVariableDeclaration(node) && ast.text(ast.name(node)) === "fixedConst");
  const fixedConstList = session.ast.parent(fixedConst);
  const fixedConstStatement = session.ast.parent(fixedConstList);
  assert.equal(session.ast.hasModifierKind(fixedConstList, "const"), false);
  assert.equal(session.ast.hasModifierKind(fixedConstStatement, "const"), false);
  assert.equal(session.ast.hasModifierKind(fixedConstStatement, "export"), true);

  const mode = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsEnumDeclaration(node) && ast.text(ast.name(node)) === "Mode");
  assert.equal(session.ast.hasModifierKind(mode, "const"), true);
  assert.equal(session.ast.variableDeclarationKind(mode), undefined);
});

test("provider virtual named exports use declaration name when exportName is omitted", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: {
      "/src/index.ts": `
        import { out } from "@acme/native/lang.js";
        let value = 1;
        out(value);
      `,
    },
    rootFiles: ["/src/index.ts"],
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      strict: true,
      target: "es2022",
    },
    extensionHostOptions: {
      activeTarget: "acme-native",
      extensions: [createNameFallbackRuntimeExtension()],
    },
  });

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const diagnostics = session.getDiagnostics("all", sourceFile);
  assert.equal(diagnostics.length, 0, formatDiagnostics(diagnostics.filter((diagnostic) => diagnostic !== undefined), "/src"));
  assertNoExtensionFactConflicts(session);

  const importDeclaration = findNode(sourceFile, session.ast, (node, ast) =>
    ast.is.IsImportDeclaration(node)
    && ast.text(ast.as.AsImportDeclaration(node)?.ModuleSpecifier) === "@acme/native/lang.js");
  const moduleSpecifier = session.ast.as.AsImportDeclaration(importDeclaration)?.ModuleSpecifier;
  const moduleSymbol = session.checker.getModuleSymbolFromSpecifier(moduleSpecifier);
  const resolvedModuleSymbol = session.checker.getResolvedExternalModuleSymbol(moduleSymbol);
  assert.ok(resolvedModuleSymbol !== undefined);
  assert.ok(session.checker.getExportsOfModule(resolvedModuleSymbol).some((symbol) => symbol?.Name === "out"));
});

test("provider virtual subpaths with the same package name keep independent exports", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: {
      "/src/index.ts": `
        import type { INT } from "@acme/native/types.js";
        import { field, out } from "@acme/native/lang.js";
        let value!: INT;
        const x = field<INT>();
        out(x);
      `,
    },
    rootFiles: ["/src/index.ts"],
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      strict: true,
      target: "es2022",
    },
    extensionHostOptions: {
      activeTarget: "acme-native",
      extensions: [createSharedPackageVirtualModulesExtension()],
    },
  });

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const diagnostics = session.getDiagnostics("all", sourceFile);
  assert.equal(diagnostics.length, 0, formatDiagnostics(diagnostics.filter((diagnostic) => diagnostic !== undefined), "/src"));
  assertNoExtensionFactConflicts(session);

  const extensionHost = session.finalizeExtensions();
  assert.ok(extensionHost !== undefined);
  const virtualDocuments = extensionHost.providers.getVirtualDeclarationDocuments()
    .filter((document) => document.moduleSpecifier.startsWith("@acme/native/"))
    .sort((left, right) => left.moduleSpecifier < right.moduleSpecifier ? -1 : 1);
  assert.deepEqual(virtualDocuments.map((document) => document.moduleSpecifier), [
    "@acme/native/lang.js",
    "@acme/native/types.js",
  ]);
  assert.equal(new Set(virtualDocuments.map((document) => document.fileName)).size, 2);
  assert.ok(virtualDocuments.every((document) => document.fileName.startsWith("tsts-provider://tsts-public/")));
});

test("post-check iteration observations cannot make invalid TypeScript valid", () => {
  const session = createEmbeddingSession(`
    declare const notIterable: number;
    let item!: number;

    for (item of notIterable) {
      item;
    }
  `);

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const diagnostics = session.getDiagnostics("semantic", sourceFile);
  assert.ok(diagnostics.length > 0);

  assert.ok(session.finalizeExtensions() !== undefined);
});

test("lifecycle hooks receive public read-only compiler queries before fact finalization", () => {
  let observedFileCount = 0;
  let observedTypeName = "";
  let observedNumberShape = false;
  let observedProgram: object | undefined;
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: {
      "/src/index.ts": "const value = 1; value;",
    },
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      strict: true,
      target: "es2022",
    },
    extensionHostOptions: {
      activeTarget: "acme-native",
      extensions: [{
        identity: {
          id: "acme.lifecycle-reader",
          version: "1.0.0",
          capabilityNamespace: "acme-lifecycle-reader",
        },
        initialize(context): void {
          context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
            observedProgram = lifecycleContext.compiler.program;
            observedFileCount = lifecycleContext.compiler.getSourceFiles().length;
            const sourceFile = lifecycleContext.compiler.getSourceFile("/src/index.ts");
            const valueUse = findNode(sourceFile, lifecycleContext.compiler.ast, (node, ast) =>
              ast.is.IsIdentifier(node) && ast.text(node) === "value");
            const valueType = lifecycleContext.compiler.checker.getTypeAtLocation(valueUse);
            observedTypeName = lifecycleContext.compiler.checker.typeToString(valueType);
            observedNumberShape = lifecycleContext.compiler.typeShape.isNumberLike(valueType);
          });
        },
      }],
    },
  });

  const sourceFile = session.getSourceFile("/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const diagnostics = session.getDiagnostics("semantic", sourceFile);
  assert.equal(diagnostics.length, 0, formatDiagnostics(diagnostics.filter((diagnostic) => diagnostic !== undefined), "/src"));
  assert.ok(session.finalizeExtensions() !== undefined);
  assert.equal(observedProgram, session.program);
  assert.ok(observedFileCount > 0);
  assert.equal(observedTypeName, "1");
  assert.equal(observedNumberShape, true);
});

function createEmbeddingSession(sourceText: string): CompilerSession {
  return createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: {
      "/src/index.ts": sourceText,
      "/src/node_modules/@acme/native/types.d.ts": "export type INT = number;",
    },
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      strict: true,
      target: "es2022",
    },
    extensionHostOptions: {
      activeTarget: "acme-native",
      extensions: [
        createExampleSourceSemanticsExtension(),
        createAcmeRuntimeExtension(),
      ],
    },
  });
}

function createExampleSourceSemanticsExtension(): CompilerExtension {
  return createSourceSemanticsExtension({
    identity: {
      id: "acme.source-semantics",
      version: "1.0.0",
      capabilityNamespace: "acme-source",
    },
    modules: [{
      moduleSpecifier: "@acme/native/types.js",
      packageName: "@acme/native",
      subpath: "types.js",
      exports: [
        sourcePrimitive("INT", "int32", "number", true, 32),
      ],
    }],
  });
}

function createAcmeRuntimeExtension(): CompilerExtension {
  const bindingProvider = createAcmeRuntimeBindingProvider();
  const semanticProvider = createAcmeRuntimeSemanticProvider();
  return {
    identity: {
      id: "acme.runtime-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-runtime",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(bindingProvider), true);
      assert.equal(context.registerTargetSemanticProvider(semanticProvider), true);
    },
  };
}

function createNameFallbackRuntimeExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme.name-fallback-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-name-fallback",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(createNameFallbackRuntimeBindingProvider()), true);
    },
  };
}

function createSharedPackageVirtualModulesExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme.shared-package-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-shared-package",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(createSharedPackageVirtualModulesBindingProvider()), true);
    },
  };
}

function createAcmeRuntimeBindingProvider(): TargetBindingProvider {
  const consumeIdentity: TargetIdentity = {
    target: "acme-native",
    id: "Acme.Runtime.consume",
    displayName: "Acme.Runtime.consume",
  };
  return {
    identity: providerIdentity("acme.runtime-binding", "binding"),
    ownsModule(specifier) {
      return specifier === "@acme/runtime.js" ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule(specifier) {
      return {
        kind: "virtual",
        moduleSpecifier: specifier,
        virtualFileName: "tsts-provider://acme/runtime",
        providerModuleId: "acme-runtime",
        packageName: "@acme/runtime",
        packageVersion: "1.0.0",
      };
    },
    getDeclarationModel(resolution: ProviderModuleResolution): ProviderDeclarationModel {
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: "consume",
          name: "consume",
          kind: "function",
          targetIdentity: consumeIdentity,
          signatures: [{
            id: "consume(INT)",
            parameters: [{ name: "value", type: { kind: "number" } }],
            returnType: { kind: "void" },
          }],
        }],
      };
    },
  };
}

function createSharedPackageVirtualModulesBindingProvider(): TargetBindingProvider {
  const outIdentity: TargetIdentity = {
    target: "acme-native",
    id: "Acme.Native.out",
    displayName: "Acme.Native.out",
  };
  return {
    identity: providerIdentity("acme.shared-package-binding", "binding"),
    ownsModule(specifier) {
      return specifier === "@acme/native/types.js" || specifier === "@acme/native/lang.js"
        ? { kind: "owned" }
        : { kind: "unowned" };
    },
    resolveModule(specifier) {
      return {
        kind: "virtual",
        moduleSpecifier: specifier,
        virtualFileName: specifier.endsWith("/types.js") ? "tsts-provider://acme/native-types" : "tsts-provider://acme/native-lang",
        providerModuleId: specifier.endsWith("/types.js") ? "acme-native-types" : "acme-native-lang",
        packageName: "@acme/native",
        packageVersion: "1.0.0",
      };
    },
    getDeclarationModel(resolution: ProviderModuleResolution): ProviderDeclarationModel {
      if (resolution.moduleSpecifier === "@acme/native/types.js") {
        return {
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "INT",
            name: "INT",
            kind: "type",
            type: { kind: "number" },
          }],
        };
      }
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [
          {
            id: "field",
            name: "field",
            kind: "function",
            signatures: [{
              id: "field<T>()",
              typeParameters: [{ name: "T" }],
              parameters: [],
              returnType: { kind: "type-parameter", name: "T" },
            }],
          },
          {
            id: "out",
            name: "out",
            kind: "function",
            targetIdentity: outIdentity,
            signatures: [{
              id: "out(number)",
              parameters: [{ name: "value", type: { kind: "number" } }],
              returnType: { kind: "void" },
            }],
          },
        ],
      };
    },
  };
}

function createNameFallbackRuntimeBindingProvider(): TargetBindingProvider {
  const outIdentity: TargetIdentity = {
    target: "acme-native",
    id: "Acme.Native.out",
    displayName: "Acme.Native.out",
  };
  return {
    identity: providerIdentity("acme.name-fallback-binding", "binding"),
    ownsModule(specifier) {
      return specifier === "@acme/native/lang.js" ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule(specifier) {
      return {
        kind: "virtual",
        moduleSpecifier: specifier,
        virtualFileName: "tsts-provider://acme/native-lang",
        providerModuleId: "acme-native-lang",
        packageName: "@acme/native",
        packageVersion: "1.0.0",
      };
    },
    getDeclarationModel(resolution: ProviderModuleResolution): ProviderDeclarationModel {
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: "out",
          name: "out",
          kind: "function",
          targetIdentity: outIdentity,
          signatures: [{
            id: "out(number)",
            parameters: [{ name: "value", type: { kind: "number" } }],
            returnType: { kind: "void" },
          }],
        }],
      };
    },
  };
}

function createAcmeRuntimeSemanticProvider(): TargetSemanticProvider {
  return {
    identity: providerIdentity("acme.runtime-semantics", "semantic"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature: {
        member: {
          id: "Acme.Runtime.consume(INT)",
          sourceName: "consume",
          targetName: "consume",
          kind: "method",
          parameters: [{
            name: "value",
            type: { kind: "source-primitive", name: "int32" },
            passingMode: "by-value",
          }],
        },
      },
    }),
    mapCheckedIteration: () => acceptObservation({
      operation: targetOperation("acme.foreach", "foreach"),
    }),
  };
}

function providerIdentity(id: string, providerKind: "binding" | "semantic") {
  return {
    id,
    version: "1.0.0",
    target: "acme-native",
    extensionContractVersion: TstsProviderContractVersion,
    providerKind,
  };
}

function targetOperation(operationId: string, targetOperation: string): TargetOperationFact {
  return {
    operationId,
    operationKind: "iteration",
    targetOperation,
  };
}

function assertNoExtensionFactConflicts(session: CompilerSession): void {
  assert.equal(session.extensionHost?.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 0);
}

function findTypeAliasType(sourceFile: SourceFile | undefined, ast: AstReader, name: string): Node {
  return ast.as.AsTypeAliasDeclaration(findNode(sourceFile, ast, (node, reader) =>
    reader.is.IsTypeAliasDeclaration(node) && reader.text(reader.name(node)) === name))!.Type!;
}

function findNode(root: Node | undefined, ast: AstReader, predicate: (node: Node, ast: AstReader) => boolean): Node {
  let found: Node | undefined;
  visit(root, ast, (node) => {
    if (found === undefined && predicate(node, ast)) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function visit(node: Node | undefined, ast: AstReader, callback: (node: Node) => void): void {
  if (node === undefined) {
    return;
  }
  callback(node);
  ast.forEachChild(node, (child) => visit(child, ast, callback));
}
