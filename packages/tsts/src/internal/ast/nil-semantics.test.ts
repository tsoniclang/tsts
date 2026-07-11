import test from "node:test";
import assert from "node:assert/strict";

import { AsBlock } from "./generated/casts.js";
import { NewEmptyStatement, NewSyntaxList } from "./generated/factory.js";
import { NewNodeFactory } from "./spine.js";
import {
  NewNodeVisitor,
  NodeVisitor_VisitEmbeddedStatement,
  NodeVisitor_VisitNode,
  NodeVisitor_VisitSlice,
} from "./visitor.js";

test("visiting a single node rejects a syntax list with a nil child slice", () => {
  const factory = NewNodeFactory({});
  const input = NewEmptyStatement(factory);
  const nilSyntaxList = NewSyntaxList(factory, undefined);
  const visitor = NewNodeVisitor(() => nilSyntaxList, factory, {});

  assert.throws(
    () => NodeVisitor_VisitNode(visitor, input),
    /Expected only a single node to be written to output/,
  );
});

test("splicing a nil syntax-list child slice produces an allocated empty result", () => {
  const factory = NewNodeFactory({});
  const input = NewEmptyStatement(factory);
  const nilSyntaxList = NewSyntaxList(factory, undefined);
  const visitor = NewNodeVisitor(() => nilSyntaxList, factory, {});

  const [result, changed] = NodeVisitor_VisitSlice(visitor, [input]);

  assert.equal(changed, true);
  assert.deepEqual(result, []);
  assert.notEqual(result, undefined);
});

test("lifting a syntax list with nil children preserves nil in the new block list", () => {
  const factory = NewNodeFactory({});
  const input = NewEmptyStatement(factory);
  const nilSyntaxList = NewSyntaxList(factory, undefined);
  const visitor = NewNodeVisitor(() => nilSyntaxList, factory, {});

  const result = NodeVisitor_VisitEmbeddedStatement(visitor, input);
  const block = AsBlock(result);

  assert.ok(block !== undefined);
  assert.ok(block.Statements !== undefined);
  assert.equal(block.Statements.Nodes, undefined);
});
