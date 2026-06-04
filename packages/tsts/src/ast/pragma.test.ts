import test from "node:test";
import assert from "node:assert/strict";

import {
  CommentDirectiveKind,
  PragmaKindFlags,
  pragmaSpecificationIsTripleSlash,
  type PragmaSpecification,
} from "./pragma.js";

test("CommentDirectiveKind matches tsgo iota values", () => {
  assert.strictEqual(CommentDirectiveKind.Unknown, 0);
  assert.strictEqual(CommentDirectiveKind.ExpectError, 1);
  assert.strictEqual(CommentDirectiveKind.Ignore, 2);
});

test("PragmaKindFlags matches tsgo bit values", () => {
  assert.strictEqual(PragmaKindFlags.None, 0);
  assert.strictEqual(PragmaKindFlags.TripleSlashXML, 1);
  assert.strictEqual(PragmaKindFlags.SingleLine, 2);
  assert.strictEqual(PragmaKindFlags.MultiLine, 4);
  assert.strictEqual(PragmaKindFlags.All, 7);
  assert.strictEqual(PragmaKindFlags.Default, 7);
});

test("pragmaSpecificationIsTripleSlash reads the TripleSlashXML bit", () => {
  const tripleSlash: PragmaSpecification = { args: [], kind: PragmaKindFlags.TripleSlashXML };
  const singleLine: PragmaSpecification = { args: [], kind: PragmaKindFlags.SingleLine };
  assert.strictEqual(pragmaSpecificationIsTripleSlash(tripleSlash), true);
  assert.strictEqual(pragmaSpecificationIsTripleSlash(singleLine), false);
  assert.strictEqual(pragmaSpecificationIsTripleSlash({ args: [], kind: PragmaKindFlags.All }), true);
});
