import assert from "node:assert/strict";
import test from "node:test";

import { CategoryError, CategoryMessage, CategorySuggestion, CategoryWarning } from "./diagnostics.js";
import { Category_String } from "./stringer_generated.js";

test("diagnostic category stringer matches TS-Go generated names", () => {
  assert.equal(Category_String(CategoryWarning), "CategoryWarning");
  assert.equal(Category_String(CategoryError), "CategoryError");
  assert.equal(Category_String(CategorySuggestion), "CategorySuggestion");
  assert.equal(Category_String(CategoryMessage), "CategoryMessage");
  assert.equal(Category_String(-1), "Category(-1)");
  assert.equal(Category_String(4), "Category(4)");
});
