import assert from "node:assert/strict";
import { test } from "node:test";
import { ToLowerJS, ToUpperJS } from "./js_case.js";

test("JS casing follows the vendored Unicode 15.1 mappings", () => {
  assert.equal(ToLowerJS("ΟΣ"), "ος");
  assert.equal(ToLowerJS("ΟΣΑ"), "οσα");
  assert.equal(ToLowerJS("Σ"), "σ");
  assert.equal(ToUpperJS("ß"), "SS");
  assert.equal(ToLowerJS("\u{10400}"), "\u{10428}");
  assert.equal(ToUpperJS("\u{10428}"), "\u{10400}");
});

test("JS casing does not inherit newer host-runtime Unicode mappings", () => {
  assert.equal(ToLowerJS("\u1C89"), "\u1C89");
  assert.equal(ToUpperJS("\u1C8A"), "\u1C8A");
});

test("JS casing preserves lone surrogate code units", () => {
  assert.equal(ToLowerJS("A\uD800Z"), "a\uD800z");
  assert.equal(ToUpperJS("a\uDC00z"), "A\uDC00Z");
});
