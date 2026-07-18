import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { repoRoot } from "./porter.mjs";

const porterRoot = path.join(repoRoot, "packages/tsts/tools/porter");

function filesUnder(root) {
  const files = [];
  const pending = [root];
  while (pending.length > 0) {
    const directory = pending.pop();
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) pending.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  return files.sort();
}

function lineCount(text) {
  if (text.length === 0) return 0;
  const lines = text.split(/\r?\n/).length;
  return text.endsWith("\n") ? lines - 1 : lines;
}

test("Porter files stay within the 600-line semantic-module limit", () => {
  const oversized = filesUnder(porterRoot)
    .map((file) => ({ file: path.relative(repoRoot, file), lines: lineCount(readFileSync(file, "utf8")) }))
    .filter(({ lines }) => lines > 600);
  assert.deepEqual(oversized, []);
});
