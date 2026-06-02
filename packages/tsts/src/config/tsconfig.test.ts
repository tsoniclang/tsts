import test from "node:test";
import assert from "node:assert/strict";

import { loadTsConfig, parseTsConfigText } from "./index.js";
import type { CompilerHost } from "../program/index.js";

test("parses jsonc files and outdir", () => {
  const result = parseTsConfigText(
    "project/tsconfig.json",
    "{\n" +
      "  // deterministic JSONC support\n" +
      "  \"compilerOptions\": {\n" +
      "    \"outDir\": \"dist\",\n" +
      "  },\n" +
      "  \"files\": [\n" +
      "    \"src/add.ts\",\n" +
      "    \"src/value.ts\",\n" +
      "  ],\n" +
      "}",
  );

  assert.strictEqual(result.diagnostics.length, 0);
  assert.ok(result.config != null);
  assert.deepStrictEqual(result.config!.rootNames, ["project/src/add.ts", "project/src/value.ts"]);
  assert.strictEqual(result.config!.options.outDir, "dist");
});

test("loads configs through host", () => {
  const host: Pick<CompilerHost, "readFile"> = {
    readFile: (fileName) => (fileName === "tsconfig.json" ? "{\"files\":[\"src/index.ts\"]}" : undefined),
  };

  const result = loadTsConfig("tsconfig.json", host);

  assert.strictEqual(result.diagnostics.length, 0);
  assert.ok(result.config != null);
  assert.deepStrictEqual(result.config!.rootNames, ["src/index.ts"]);
});

test("expands include through host", () => {
  interface ReadDirCall {
    readonly rootDir: string;
    readonly extensions: readonly string[];
    readonly excludes: readonly string[];
    readonly includes: readonly string[];
  }
  const calls: ReadDirCall[] = [];
  const host: Pick<CompilerHost, "readDirectory"> = {
    readDirectory: (rootDir, extensions, excludes, includes) => {
      calls.push({ rootDir, extensions, excludes, includes });
      return ["project/src/index.ts", "project/src/util.ts"];
    },
  };

  const result = parseTsConfigText(
    "project/tsconfig.json",
    "{\"compilerOptions\":{\"outDir\":\"dist\"},\"include\":[\"src/**/*.ts\"],\"exclude\":[\"src/**/*.test.ts\"]}",
    host,
  );

  assert.strictEqual(result.diagnostics.length, 0);
  assert.ok(result.config != null);
  assert.deepStrictEqual(result.config!.rootNames, ["project/src/index.ts", "project/src/util.ts"]);
  assert.strictEqual(calls.length, 1);
  assert.strictEqual(calls[0]!.rootDir, "project");
  assert.deepStrictEqual(calls[0]!.extensions, [".ts", ".tsx", ".d.ts"]);
  assert.deepStrictEqual(calls[0]!.excludes, ["node_modules", "bower_components", "jspm_packages", "dist", "src/**/*.test.ts"]);
  assert.deepStrictEqual(calls[0]!.includes, ["src/**/*.ts"]);
});

test("requires directory support", () => {
  const result = parseTsConfigText("tsconfig.json", "{\"include\":[\"src/**/*.ts\"]}");

  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0]!.message, "include/exclude expansion requires CompilerHost.readDirectory");
});

test("uses default include exclude when files omitted", () => {
  const host: Pick<CompilerHost, "readDirectory"> = {
    readDirectory: (_rootDir, _extensions, _excludes, _includes) => ["src/index.ts"],
  };

  const result = parseTsConfigText("tsconfig.json", "{}", host);

  assert.strictEqual(result.diagnostics.length, 0);
  assert.ok(result.config != null);
  assert.deepStrictEqual(result.config!.rootNames, ["src/index.ts"]);
});

test("rejects invalid option shapes", () => {
  const result = parseTsConfigText(
    "tsconfig.json",
    "{\"compilerOptions\":{\"outDir\":false},\"files\":\"src/index.ts\",\"include\":\"src\"}",
  );

  assert.strictEqual(result.diagnostics.length, 2);
  assert.strictEqual(result.diagnostics[0]!.message, "compilerOptions.outDir must be a string");
  assert.strictEqual(result.diagnostics[1]!.message, "files must be an array of strings");
});
