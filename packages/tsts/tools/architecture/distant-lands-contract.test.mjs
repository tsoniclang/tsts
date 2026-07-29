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
  const violations = mutableHostPublicNames.filter((name) =>
    new RegExp(`\\b${name}\\b`, "u").test(publicSource));
  assert.deepEqual(violations, []);
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
