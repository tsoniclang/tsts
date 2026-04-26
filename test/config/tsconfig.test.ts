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
        },
        "files": [
          "src/add.ts",
          "src/value.ts",
        ],
      }
    `);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["project/src/add.ts", "project/src/value.ts"]);
    assert.deepEqual(result.config?.options, { outDir: "dist" });
  });

  it("loads configs through the compiler host", () => {
    const host: Pick<CompilerHost, "readFile"> = {
      readFile: fileName => fileName === "tsconfig.json" ? "{\"files\":[\"src/index.ts\"]}" : undefined,
    };

    const result = loadTsConfig("tsconfig.json", host);

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.config?.rootNames, ["src/index.ts"]);
  });

  it("rejects include/exclude until glob expansion exists", () => {
    const result = parseTsConfigText("tsconfig.json", "{\"include\":[\"src/**/*.ts\"]}");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["include/exclude expansion is not implemented; use files for now"]);
  });

  it("rejects invalid option shapes", () => {
    const result = parseTsConfigText("tsconfig.json", "{\"compilerOptions\":{\"outDir\":false},\"files\":\"src/index.ts\"}");

    assert.deepEqual(
      result.diagnostics.map(diagnostic => diagnostic.message),
      ["compilerOptions.outDir must be a string", "files must be an array of strings"],
    );
  });
});
