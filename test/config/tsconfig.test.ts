import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadTsConfig, parseTsConfigText } from "../../src/config/index.js";
import type { CompilerHost } from "../../src/program/index.js";

describe("tsconfig groundwork", () => {
  it("parses JSONC comments, trailing commas, files, and outDir", () => {
    const result = parseTsConfigText("project/tsconfig.json", `
      {
        // deterministic JSONC support
        "compilerOptions": {
          "outDir": "dist",
          "strict": true,
          "noImplicitAny": false,
          "strictNullChecks": true,
          "strictPropertyInitialization": false,
          "exactOptionalPropertyTypes": true,
          "experimentalDecorators": true,
          "emitDecoratorMetadata": true,
          "noUncheckedSideEffectImports": true,
        },
        "files": [
          "src/add.ts",
          "src/value.ts",
        ],
      }
    `);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["project/src/add.ts", "project/src/value.ts"]);
    assert.deepEqual(result.config?.options, {
      outDir: "dist",
      strict: true,
      noImplicitAny: false,
      strictNullChecks: true,
      strictPropertyInitialization: false,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      noUncheckedSideEffectImports: true,
    });
  });

  it("loads configs through the compiler host", () => {
    const host: Pick<CompilerHost, "readFile"> = {
      readFile: fileName => fileName === "tsconfig.json" ? "{\"files\":[\"src/index.ts\"]}" : undefined,
    };

    const result = loadTsConfig("tsconfig.json", host);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["src/index.ts"]);
  });

  it("expands include and exclude through the compiler host", () => {
    const calls: Array<{
      readonly rootDir: string;
      readonly extensions: readonly string[];
      readonly excludes: readonly string[];
      readonly includes: readonly string[];
    }> = [];
    const host: Pick<CompilerHost, "readDirectory"> = {
      readDirectory: (rootDir, extensions, excludes, includes) => {
        calls.push({ rootDir, extensions, excludes, includes });
        return ["project/src/index.ts", "project/src/util.ts"];
      },
    };

    const result = parseTsConfigText("project/tsconfig.json", "{\"compilerOptions\":{\"outDir\":\"dist\"},\"include\":[\"src/**/*.ts\"],\"exclude\":[\"src/**/*.test.ts\"]}", host);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["project/src/index.ts", "project/src/util.ts"]);
    assert.deepEqual(calls, [{
      rootDir: "project",
      extensions: [".ts", ".tsx", ".d.ts"],
      excludes: ["node_modules", "bower_components", "jspm_packages", "dist", "src/**/*.test.ts"],
      includes: ["src/**/*.ts"],
    }]);
  });

  it("requires directory support for include expansion", () => {
    const result = parseTsConfigText("tsconfig.json", "{\"include\":[\"src/**/*.ts\"]}");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["include/exclude expansion requires CompilerHost.readDirectory"]);
  });

  it("uses TypeScript default include and exclude rules when files are omitted", () => {
    const host: Pick<CompilerHost, "readDirectory"> = {
      readDirectory: (_rootDir, _extensions, _excludes, _includes) => ["src/index.ts"],
    };

    const result = parseTsConfigText("tsconfig.json", "{}", host);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["src/index.ts"]);
  });

  it("rejects invalid option shapes", () => {
    const result = parseTsConfigText("tsconfig.json", "{\"compilerOptions\":{\"outDir\":false},\"files\":\"src/index.ts\",\"include\":\"src\"}");

    assert.deepEqual(
      result.diagnostics.map(diagnostic => diagnostic.message),
      ["compilerOptions.outDir must be a string", "files must be an array of strings"],
    );
  });
});
