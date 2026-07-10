import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Chtimes, Stat } from "./os.js";
import { UnixMilli } from "./time.js";

test("Chtimes writes the supplied Time instants", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "tsts-chtimes-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "metadata.ts");
  writeFileSync(file, "export {};\n");

  const accessTime = UnixMilli(Date.UTC(2001, 1, 3, 4, 5, 6));
  const modificationTime = UnixMilli(Date.UTC(2002, 2, 4, 5, 6, 7));
  assert.equal(Chtimes(file, accessTime, modificationTime), undefined);

  const stats = statSync(file);
  assert.equal(stats.atimeMs, accessTime.UnixMilli());
  assert.equal(stats.mtimeMs, modificationTime.UnixMilli());

  const [fileInfo, statError] = Stat(file);
  assert.equal(statError, undefined);
  assert.ok(fileInfo !== undefined);
  assert.equal(fileInfo.ModTime().Equal(modificationTime), true);
});
