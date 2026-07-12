import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { decodeCanonicalUtf8, publishStableFlatDirectory, readStableFlatDirectory } from "./core/provenance-filesystem.mjs";

test("stable flat-directory evidence rejects links and nested entries", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-flat-evidence-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(path.join(root, "a.json"), "a\n");
  writeFileSync(path.join(root, "b.json"), "b\n");
  assert.deepEqual(
    [...readStableFlatDirectory(root, "fixture evidence")].map(([name, bytes]) => [name, bytes.toString("utf8")]),
    [["a.json", "a\n"], ["b.json", "b\n"]],
  );

  symlinkSync("a.json", path.join(root, "link.json"));
  assert.throws(() => readStableFlatDirectory(root, "fixture evidence"), /regular non-symlink file/);
  rmSync(path.join(root, "link.json"));
  mkdirSync(path.join(root, "nested"));
  assert.throws(() => readStableFlatDirectory(root, "fixture evidence"), /regular non-symlink file/);
});

test("text evidence rejects invalid and noncanonical UTF-8 bytes", () => {
  assert.equal(decodeCanonicalUtf8(Buffer.from("exact\n"), "fixture"), "exact\n");
  assert.throws(() => decodeCanonicalUtf8(Buffer.from([0xff]), "fixture"), /not valid UTF-8/);
  assert.throws(() => decodeCanonicalUtf8(Buffer.from([0xef, 0xbb, 0xbf, 0x7b, 0x7d]), "fixture"), /not canonical UTF-8/);
});

test("flat evidence publication is exclusive and descriptor-relative", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-flat-publish-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const output = path.join(root, "evidence");
  const staging = path.join(root, "evidence.partial");
  const records = publishStableFlatDirectory(output, staging, new Map([
    ["report.json", "{}\n"],
    ["COMPLETE.json", ({ files }) => `${JSON.stringify(files)}\n`],
  ]), "fixture publication");
  assert.equal(records["report.json"].bytes, 3);
  assert.equal(records["COMPLETE.json"].bytes > records["report.json"].bytes, true);
  assert.deepEqual([...readStableFlatDirectory(output)].map(([name]) => name), ["COMPLETE.json", "report.json"]);
  assert.throws(
    () => publishStableFlatDirectory(output, `${staging}-second`, new Map([["COMPLETE.json", "{}\n"]]), "fixture publication"),
    /already exists/,
  );
});
