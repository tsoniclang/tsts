import assert from "node:assert/strict";
import { test } from "node:test";

import { GoSliceBuild, GoSliceStore } from "../../../compat.js";
import { Exact, Low, MustParse, NewMatcher, TagValueOps, Und } from "./language.js";

test("Tag value operations preserve the adapted Go scalar contract", () => {
  const tag = MustParse("de-DE");

  assert.equal(TagValueOps.zero(), Und);
  assert.equal(TagValueOps.copy(tag), tag);
});

test("Matcher consumes opaque Go slices without JavaScript array semantics", () => {
  const english = MustParse("en");
  const german = MustParse("de-DE");
  const tags = GoSliceBuild(2, 2, TagValueOps, (slice) => {
    GoSliceStore(slice, 0, english, TagValueOps);
    GoSliceStore(slice, 1, german, TagValueOps);
  });
  const matcher = NewMatcher(tags);

  assert.deepEqual(matcher.Match(german), [german, 1, Exact]);
  assert.deepEqual(matcher.Match(MustParse("de-AT")), [german, 1, Low]);
});
