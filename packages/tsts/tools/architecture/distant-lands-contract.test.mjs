import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const sourceRoot = fileURLToPath(new URL("../../src/", import.meta.url));

const retiredTargetLifecycleNames = [
  "TargetSemanticProvider",
  "registerTargetSemanticProvider",
  "SelectedTargetSignatureFact",
  "TargetOperationFact",
  "TargetConversionFact",
  "TargetCallArgumentPassingFact",
  "RuntimeCarrierFact",
  "ContextualTargetTypeFact",
  "InstantiatedTargetTypeFact",
  "deferObservation",
  "mapCheckedCall",
  "mapCheckedPropertyAccess",
  "mapCheckedElementAccess",
  "mapCheckedOperator",
  "mapCheckedIteration",
  "mapCheckedConversion",
  "recordContextualTargetType",
  "resolveRuntimeCarrier",
  "validateTargetConstraint",
  "observePostCheckAssignability",
  "validateExtensionFlowUse",
];

const targetProviderShapeNames = [
  "TargetTypeRef",
  "target-named",
  "target-opaque",
  "sourceShape",
];

const mutableHostPublicNames = [
  "ExtensionDiagnosticStore",
  "ExtensionFactResolver",
  "ExtensionFactStore",
  "ExtensionHost",
  "CompilerExtensionKind",
  "ExtensionCapabilitySpec",
  "ExtensionCompositionSpec",
  "ProviderRegistry",
  "SourceFactQueries",
  "attachExtensionHost",
  "attachExtensionHostToProgram",
  "createSourceFactQueries",
  "getExtensionHost",
  "hasExtensionHost",
];

const publicSemanticConstructionNames = [
  "createAstReader",
  "createTypeCheckerQueries",
  "createTypeShapeQueries",
  "TypeCheckerQueryOptions",
  "TypeShapeQueryOptions",
];

test("product source contains no retired target semantic lifecycle", async () => {
  const violations = await findTokens(
    await productTypeScriptFiles(sourceRoot),
    retiredTargetLifecycleNames,
  );
  assert.deepEqual(violations, []);
});

test("source provider contracts contain no target type projection", async () => {
  const extensionRoot = fileURLToPath(new URL("../../src/extensions/", import.meta.url));
  const violations = await findTokens(
    await productTypeScriptFiles(extensionRoot),
    targetProviderShapeNames,
  );
  assert.deepEqual(violations, []);
});

test("public API exposes checked-source capabilities instead of mutable host internals", async () => {
  const publicSource = await readFile(`${sourceRoot}index.ts`, "utf8");
  const violations = [
    ...mutableHostPublicNames,
    ...publicSemanticConstructionNames,
  ].filter((name) =>
    new RegExp(`\\b${name}\\b`, "u").test(publicSource));
  assert.deepEqual(violations, []);
});

test("compiler sessions expose semantic queries only through CheckedSourceProgram", async () => {
  const sessionSource = await readFile(`${sourceRoot}services/compiler-session.ts`, "utf8");
  const forbiddenFields = [
    "ast",
    "checker",
    "types",
    "getSourceFile",
    "getSourceFiles",
  ];
  const violations = forbiddenFields.filter((name) =>
    new RegExp(`readonly\\s+${name}\\s*:`, "u").test(sessionSource));
  assert.deepEqual(violations, []);
});

test("direct query capabilities are bound to one exact source-file checker", async () => {
  const checkerSource = await readFile(`${sourceRoot}services/type-checker.ts`, "utf8");
  const shapeSource = await readFile(`${sourceRoot}services/type-shape.ts`, "utf8");
  const sourceProgram = await readFile(`${sourceRoot}extensions/source-program.ts`, "utf8");

  for (const source of [checkerSource, shapeSource]) {
    assert.match(source, /readonly sourceFile: GoPtr<SourceFile>;/u);
    assert.match(source, /defaultOptions\.sourceFile/u);
    assert.doesNotMatch(source, /sourceFile\?\s*:/u);
    assert.doesNotMatch(source, /Program_GetSourceFiles/u);
  }
  assert.match(sourceProgram, /createTypeCheckerQueries\(program, \{[\s\S]*?sourceFile,/u);
  assert.match(sourceProgram, /createTypeShapeQueries\(program, \{[\s\S]*?sourceFile,/u);
  const programQueriesContract = sourceProgram.match(
    /export interface SourceProgramQueries \{(?<body>[\s\S]*?)\n\}/u,
  )?.groups?.body;
  assert.ok(programQueriesContract !== undefined);
  assert.doesNotMatch(programQueriesContract, /readonly checker\s*:/u);
  assert.doesNotMatch(programQueriesContract, /readonly typeShape\s*:/u);
});

async function productTypeScriptFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...await productTypeScriptFiles(`${path}/`));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      files.push(path);
    }
  }
  return files.sort();
}

async function findTokens(files, tokens) {
  const violations = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const lines = source.split("\n");
    for (const token of tokens) {
      for (let index = 0; index < lines.length; index += 1) {
        if (lines[index].includes(token)) {
          violations.push({
            file: file.slice(sourceRoot.length),
            line: index + 1,
            token,
          });
        }
      }
    }
  }
  return violations;
}
