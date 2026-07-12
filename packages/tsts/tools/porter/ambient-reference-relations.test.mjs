import assert from "node:assert/strict";
import test from "node:test";

import { deriveAmbientLibraryClosure } from "./sig-check/ambient-library-closure.mjs";
import {
  ambientDeclarationContractHash,
  buildAmbientReferenceRelationRegistry,
} from "./sig-check/ambient-reference-relations.mjs";
import { loadParser } from "./ts-extractor/parser-runtime.mjs";

const api = await loadParser();

test("ambient library roots close mechanically over lib and path references", () => {
  const sources = fixtureSources();
  const closure = deriveAmbientLibraryClosure(api, {
    readSource: (file) => requireSource(sources, file),
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
  });
  assert.deepEqual(closure.rootFiles, ["fixture/libs/lib.root.d.ts"]);
  assert.deepEqual(closure.sourceFiles, [
    "fixture/libs/extra.d.ts",
    "fixture/libs/lib.base.d.ts",
    "fixture/libs/lib.root.d.ts",
  ]);
  assert.equal(closure.sourceSetHash.length, 64);

  const declarationHash = ambientDeclarationContractHash(api, closure.sources, "Token");
  const config = { semanticRelations: [{
    kind: "ambient-reference",
    identity: "global::Token",
    namespace: "type",
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
    sourceSetHash: closure.sourceSetHash,
    declarationHash,
    reason: "The fixture intentionally depends on one exact ambient declaration-library closure.",
  }] };
  const registry = buildAmbientReferenceRelationRegistry({
    api,
    config,
    readSource: (file) => requireSource(sources, file),
  });
  assert.equal(registry.forUseSite("fixture").accept("global::Token"), true);
  const report = registry.finalize();
  assert.deepEqual(report.mismatches, []);
  assert.deepEqual(report.inventory[0].sourceFiles, closure.sourceFiles);
  assert.deepEqual(report.inventory[0].uses, ["fixture"]);
});

test("ambient library closure rejects escapes and package type references", () => {
  assert.throws(() => deriveAmbientLibraryClosure(api, {
    readSource: () => "/// <reference path=\"../outside.d.ts\" />\n",
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
  }), /escapes ambient library root/);
  assert.throws(() => deriveAmbientLibraryClosure(api, {
    readSource: () => "/// <reference types=\"node\" />\n",
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
  }), /package type-reference directives outside the closed library contract/);
});

test("ambient relation source drift and unused relations fail closed", () => {
  const sources = fixtureSources();
  const closure = deriveAmbientLibraryClosure(api, {
    readSource: (file) => requireSource(sources, file),
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
  });
  const config = { semanticRelations: [{
    kind: "ambient-reference",
    identity: "global::Token",
    namespace: "type",
    rootDirectory: "fixture/libs",
    rootFiles: ["lib.root.d.ts"],
    sourceSetHash: closure.sourceSetHash,
    declarationHash: ambientDeclarationContractHash(api, closure.sources, "Token"),
    reason: "The fixture intentionally depends on one exact ambient declaration-library closure.",
  }] };
  const drifted = new Map(sources);
  drifted.set("fixture/libs/extra.d.ts", "interface Token { readonly changed: true; }\n");
  const driftReport = buildAmbientReferenceRelationRegistry({
    api,
    config,
    readSource: (file) => requireSource(drifted, file),
  }).finalize();
  assert.ok(driftReport.mismatches.some((mismatch) => mismatch.detail.includes("ambient source set drifted")));

  const unusedReport = buildAmbientReferenceRelationRegistry({
    api,
    config,
    readSource: (file) => requireSource(sources, file),
  }).finalize();
  assert.ok(unusedReport.mismatches.some((mismatch) => mismatch.kind === "unused-ambient-reference-relation"));
});

function fixtureSources() {
  return new Map([
    ["fixture/libs/lib.root.d.ts", "/// <reference lib=\"base\" />\ninterface Root {}\n"],
    ["fixture/libs/lib.base.d.ts", "/// <reference path=\"./extra.d.ts\" />\ninterface Shared {}\n"],
    ["fixture/libs/extra.d.ts", "interface Token { readonly value: string; }\n"],
  ]);
}

function requireSource(sources, file) {
  const source = sources.get(file);
  if (source === undefined) throw new Error(`missing fixture source ${file}`);
  return source;
}
