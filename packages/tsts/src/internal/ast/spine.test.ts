import assert from "node:assert/strict";
import { test } from "node:test";

import { NewNodeFactory, NodeFactory_NewNodeList } from "./spine.js";

test("NewNodeList preserves nil and nonnil empty slices", () => {
  const factory = NewNodeFactory({});
  const nilList = NodeFactory_NewNodeList(factory, undefined);
  const emptyList = NodeFactory_NewNodeList(factory, []);

  assert.ok(nilList !== undefined);
  assert.ok(emptyList !== undefined);
  assert.equal(nilList.Nodes, undefined);
  assert.deepEqual(emptyList.Nodes, []);
});
