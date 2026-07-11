import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoSlice } from "../../go/compat.js";
import { AsCallExpression } from "../ast/generated/casts.js";
import { NewEmptyStatement, NewIdentifier } from "../ast/generated/factory.js";
import {
  EmitContext_AddLexicalDeclaration,
  EmitContext_AddVariableDeclaration,
  EmitContext_AddEmitHelper,
  EmitContext_EndLexicalEnvironment,
  EmitContext_EndVariableEnvironment,
  EmitContext_GetEmitHelpers,
  EmitContext_GetSyntheticLeadingComments,
  EmitContext_GetSyntheticTrailingComments,
  EmitContext_MergeEnvironment,
  EmitContext_MoveEmitHelpers,
  EmitContext_ReadEmitHelpers,
  EmitContext_RequestEmitHelper,
  EmitContext_SetSyntheticLeadingComments,
  EmitContext_SetSyntheticTrailingComments,
  EmitContext_SetEmitFlags,
  EmitContext_StartLexicalEnvironment,
  EmitContext_StartVariableEnvironment,
  NewEmitContext,
  type SynthesizedComment,
} from "./emitcontext.js";
import { EFCustomPrologue } from "./emitflags.js";
import {
  flattenCommaElements,
  NodeFactory_EnsureUseStrict,
  NodeFactory_InlineExpressions,
  NodeFactory_NewMethodCall,
  NodeFactory_SplitCustomPrologue,
  NodeFactory_SplitStandardPrologue,
} from "./factory.js";
import { decorateHelper } from "./helpers.js";
import { findSpanEnd } from "./utilities.js";

test("emit helpers remain nil until a helper is appended", () => {
  const context = NewEmitContext();
  const node = NewEmptyStatement(context!.Factory!.AsNodeFactory());
  assert.notEqual(node, undefined);

  assert.equal(EmitContext_GetEmitHelpers(context, node), undefined);
  EmitContext_AddEmitHelper(context, node);
  assert.equal(EmitContext_GetEmitHelpers(context, node), undefined);

  EmitContext_AddEmitHelper(context, node, decorateHelper);
  assert.deepEqual(EmitContext_GetEmitHelpers(context, node), [decorateHelper]);
});

test("reading requested emit helpers returns nil for an empty sequence", () => {
  const context = NewEmitContext();
  assert.equal(EmitContext_ReadEmitHelpers(context), undefined);

  EmitContext_RequestEmitHelper(context, decorateHelper);
  assert.deepEqual(EmitContext_ReadEmitHelpers(context), [decorateHelper]);
  assert.equal(EmitContext_ReadEmitHelpers(context), undefined);
});

test("moving every emit helper leaves the Go allocated-empty source slice", () => {
  const context = NewEmitContext();
  const source = NewEmptyStatement(context!.Factory!.AsNodeFactory());
  const target = NewEmptyStatement(context!.Factory!.AsNodeFactory());
  assert.notEqual(source, undefined);
  assert.notEqual(target, undefined);
  EmitContext_AddEmitHelper(context, source, decorateHelper);

  EmitContext_MoveEmitHelpers(context, source, target, () => true);

  const sourceHelpers = EmitContext_GetEmitHelpers(context, source);
  assert.notEqual(sourceHelpers, undefined);
  assert.deepEqual(sourceHelpers, []);
  assert.deepEqual(EmitContext_GetEmitHelpers(context, target), [decorateHelper]);
});

test("synthetic comment setters preserve nil and allocated-empty exactly", () => {
  const context = NewEmitContext();
  const node = NewEmptyStatement(context!.Factory!.AsNodeFactory());
  assert.notEqual(node, undefined);

  assert.equal(EmitContext_SetSyntheticLeadingComments(context, node, undefined), node);
  assert.equal(EmitContext_GetSyntheticLeadingComments(context, node), undefined);
  assert.equal(EmitContext_SetSyntheticTrailingComments(context, node, undefined), node);
  assert.equal(EmitContext_GetSyntheticTrailingComments(context, node), undefined);

  const leading: GoSlice<SynthesizedComment> = [];
  const trailing: GoSlice<SynthesizedComment> = [];
  EmitContext_SetSyntheticLeadingComments(context, node, leading);
  EmitContext_SetSyntheticTrailingComments(context, node, trailing);
  assert.equal(EmitContext_GetSyntheticLeadingComments(context, node), leading);
  assert.equal(EmitContext_GetSyntheticTrailingComments(context, node), trailing);
});

test("empty variable and lexical environments end as Go nil", () => {
  const context = NewEmitContext();

  EmitContext_StartVariableEnvironment(context);
  assert.equal(EmitContext_EndVariableEnvironment(context), undefined);

  EmitContext_StartLexicalEnvironment(context);
  assert.equal(EmitContext_EndLexicalEnvironment(context), undefined);
});

test("environment slices allocate only when a declaration is appended", () => {
  const context = NewEmitContext();
  const factory = context!.Factory!.AsNodeFactory();

  EmitContext_StartVariableEnvironment(context);
  EmitContext_AddVariableDeclaration(context, NewIdentifier(factory, "hoisted"));
  const variables = EmitContext_EndVariableEnvironment(context);
  assert.notEqual(variables, undefined);
  assert.equal(variables!.length, 1);

  EmitContext_StartLexicalEnvironment(context);
  EmitContext_AddLexicalDeclaration(context, NewIdentifier(factory, "lexical"));
  const lexical = EmitContext_EndLexicalEnvironment(context);
  assert.notEqual(lexical, undefined);
  assert.equal(lexical!.length, 1);
});

test("environment merging preserves nil and allocated-empty inputs on a no-op", () => {
  const context = NewEmitContext();
  const allocated: GoSlice<never> = [];

  assert.equal(EmitContext_MergeEnvironment(context, undefined, undefined), undefined);
  assert.equal(EmitContext_MergeEnvironment(context, allocated, undefined), allocated);
});

test("comma flattening and inlining keep empty inputs at Go nil", () => {
  const context = NewEmitContext();
  assert.equal(flattenCommaElements(undefined), undefined);
  assert.equal(flattenCommaElements([]), undefined);
  assert.equal(NodeFactory_InlineExpressions(context!.Factory, undefined), undefined);
  assert.equal(NodeFactory_InlineExpressions(context!.Factory, []), undefined);
});

test("span scanning treats nil as length zero without invoking the predicate", () => {
  assert.equal(
    findSpanEnd<number>(undefined, () => {
      throw new globalThis.Error("predicate must not run");
    }, 7),
    7,
  );
});

test("prologue splitting preserves each nil and allocated-empty result", () => {
  const context = NewEmitContext();
  const factory = context!.Factory;

  assert.deepEqual(NodeFactory_SplitStandardPrologue(factory, undefined), [undefined, undefined]);
  assert.deepEqual(NodeFactory_SplitCustomPrologue(factory, undefined), [undefined, undefined]);

  const standardEmpty: GoSlice<never> = [];
  const [standard, standardRest] = NodeFactory_SplitStandardPrologue(factory, standardEmpty);
  assert.equal(standard, standardEmpty);
  assert.equal(standardRest, undefined);

  const customEmpty: GoSlice<never> = [];
  const [custom, customRest] = NodeFactory_SplitCustomPrologue(factory, customEmpty);
  assert.equal(custom, undefined);
  assert.equal(customRest, customEmpty);

  const directive = NodeFactory_EnsureUseStrict(factory, undefined)[0];
  const standardSource = [directive];
  const [allStandard, afterStandard] = NodeFactory_SplitStandardPrologue(factory, standardSource);
  assert.equal(allStandard, standardSource);
  assert.equal(afterStandard, undefined);

  const ordinary = NewEmptyStatement(context!.Factory!.AsNodeFactory());
  const [noStandard, ordinaryRest] = NodeFactory_SplitStandardPrologue(factory, [ordinary]);
  assert.notEqual(noStandard, undefined);
  assert.deepEqual(noStandard, []);
  assert.deepEqual(ordinaryRest, [ordinary]);

  EmitContext_SetEmitFlags(context, ordinary, EFCustomPrologue);
  const customSource = [ordinary];
  const [allCustom, afterCustom] = NodeFactory_SplitCustomPrologue(factory, customSource);
  assert.equal(allCustom, undefined);
  assert.equal(afterCustom, customSource);
});

test("use-strict insertion accepts a nil statement slice and allocates its result", () => {
  const context = NewEmitContext();
  const statements = NodeFactory_EnsureUseStrict(context!.Factory, undefined);
  assert.equal(statements.length, 1);
});

test("method-call construction preserves a nil argument NodeList slice", () => {
  const context = NewEmitContext();
  const factory = context!.Factory!.AsNodeFactory();
  const call = NodeFactory_NewMethodCall(
    context!.Factory,
    NewIdentifier(factory, "receiver"),
    NewIdentifier(factory, "method"),
    undefined,
  );
  assert.equal(AsCallExpression(call)!.Arguments!.Nodes, undefined);

  const empty: GoSlice<never> = [];
  const emptyCall = NodeFactory_NewMethodCall(
    context!.Factory,
    NewIdentifier(factory, "receiver"),
    NewIdentifier(factory, "method"),
    empty,
  );
  assert.equal(AsCallExpression(emptyCall)!.Arguments!.Nodes, empty);
});
