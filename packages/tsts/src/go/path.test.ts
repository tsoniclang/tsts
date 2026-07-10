import assert from "node:assert/strict";
import test from "node:test";

import { Split } from "./path.js";

test("path.Split preserves the final slash in dir and trailing-slash emptiness", () => {
  assert.deepEqual(Split("static/myfile.css"), ["static/", "myfile.css"]);
  assert.deepEqual(Split("myfile.css"), ["", "myfile.css"]);
  assert.deepEqual(Split("/a/b/"), ["/a/b/", ""]);
  assert.deepEqual(Split("/"), ["/", ""]);
  assert.deepEqual(Split(""), ["", ""]);
});
