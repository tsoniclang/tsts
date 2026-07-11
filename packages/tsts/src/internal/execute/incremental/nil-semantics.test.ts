import { test } from "node:test";
import assert from "node:assert/strict";
import type { Program as CompilerProgram } from "../../compiler/program.js";
import type { Path } from "../../tspath/path.js";
import { affectedFilesHandler_getFilesAffectedBy, type affectedFilesHandler } from "./affectedfileshandler.js";
import type { Program } from "./program.js";
import { emitSignature_requireDifferentOptions } from "./snapshot.js";

test("missing incremental source file returns Go nil", () => {
  const compilerProgram = {
    __tsgoEmbedded0: { filesByPath: new globalThis.Map() },
  } as CompilerProgram;
  const program = { program: compilerProgram } as Program;
  const handler = { program } as affectedFilesHandler;

  assert.equal(affectedFilesHandler_getFilesAffectedBy(handler, "/missing.ts" as Path), undefined);
});

test("alternate incremental emit signatures fail closed when the Go slice invariant is absent", () => {
  assert.equal(emitSignature_requireDifferentOptions({ signature: "", signatureWithDifferentOptions: ["alternate"] }), "alternate");
  assert.throws(
    () => emitSignature_requireDifferentOptions({ signature: "", signatureWithDifferentOptions: undefined }),
    /missing its alternate-options signature/,
  );
  assert.throws(
    () => emitSignature_requireDifferentOptions({ signature: "", signatureWithDifferentOptions: [] }),
    /missing its alternate-options signature/,
  );
});
