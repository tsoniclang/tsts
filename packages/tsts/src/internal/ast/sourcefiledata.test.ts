import assert from "node:assert/strict";
import { test } from "node:test";
import { GetOrComputeSourceFileData, NewSourceFileDataKey } from "./ast.js";
import type { SourceFileParseOptions } from "./parseoptions.js";
import { ScriptKindTS } from "../core/scriptkind.js";
import { ParseSourceFile } from "../parser/parser/statements-declarations.js";

function parseSourceFile() {
  const options = { FileName: "/source.ts", Path: "/source.ts" } satisfies SourceFileParseOptions;
  return ParseSourceFile(options, "export const value = 1;", ScriptKindTS);
}

test("source-file data computes once per key", () => {
  const file = parseSourceFile();
  const firstKey = NewSourceFileDataKey<number>();
  const secondKey = NewSourceFileDataKey<number>();
  let firstComputations = 0;

  assert.equal(GetOrComputeSourceFileData(file, firstKey, () => ++firstComputations), 1);
  assert.equal(GetOrComputeSourceFileData(file, firstKey, () => ++firstComputations), 1);
  assert.equal(firstComputations, 1);
  assert.equal(GetOrComputeSourceFileData(file, secondKey, () => 2), 2);
});

test("source-file data rejects an uninitialized key", () => {
  const file = parseSourceFile();
  assert.throws(
    () => GetOrComputeSourceFileData(file, undefined, () => 1),
    /invalid SourceFileDataKey; use NewSourceFileDataKey/,
  );
});
