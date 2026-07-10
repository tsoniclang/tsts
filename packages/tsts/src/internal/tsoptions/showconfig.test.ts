import assert from "node:assert/strict";
import { test } from "node:test";

import { Marshal } from "../json/json.js";
import { EmptyCompilerOptions } from "../core/compileroptions.js";
import { NewParsedCommandLine } from "./parsedcommandline.js";
import { ConvertToTSConfig } from "./showconfig.js";

test("show-config JSON uses Go field names and omits zero optional fields", () => {
  const parsed = NewParsedCommandLine(EmptyCompilerOptions, [], {
    CurrentDirectory: "/work",
    UseCaseSensitiveFileNames: true,
  });
  const config = ConvertToTSConfig(parsed, "/work/tsconfig.json");
  const [encoded, error] = Marshal(config);

  assert.equal(error, undefined);
  const value = JSON.parse(new TextDecoder().decode(Uint8Array.from(encoded))) as Record<string, unknown>;
  assert.deepEqual(Object.keys(value), ["compilerOptions"]);
  assert.deepEqual(value.compilerOptions, {});
  for (const name of ["CompilerOptions", "References", "Files", "Include", "Exclude", "CompileOnSave"]) {
    assert.equal(name in value, false);
  }
});
