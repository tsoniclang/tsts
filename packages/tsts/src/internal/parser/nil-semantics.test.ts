import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import type { CommentRange, SourceFile } from "../ast/ast.js";
import {
  Node_EagerJSDoc,
  Node_JSDoc,
  SourceFile_BindDiagnostics,
  SourceFile_Diagnostics,
  SourceFile_JSDiagnostics,
  SourceFile_JSDocDiagnostics,
  SourceFile_SetBindDiagnostics,
  SourceFile_SetDiagnostics,
  SourceFile_SetHasLazyJSDoc,
  SourceFile_SetJSDiagnostics,
  SourceFile_SetJSDocCache,
  SourceFile_SetJSDocDiagnostics,
} from "../ast/ast.js";
import { AsJSDocText } from "../ast/generated/casts.js";
import { NewJSDocText } from "../ast/generated/factory.js";
import { NodeFlagsHasJSDoc } from "../ast/generated/flags.js";
import { KindSingleLineCommentTrivia } from "../ast/generated/kinds.js";
import type { SourceFileParseOptions } from "../ast/parseoptions.js";
import type { Node } from "../ast/spine.js";
import { NewNodeFactory } from "../ast/spine.js";
import { ScriptKindTS } from "../core/scriptkind.js";
import { removeLeadingNewlines, removeTrailingWhitespace } from "./jsdoc.js";
import { extractPragmas, getCommentPragmas, newParser, Parser_initializeState, Parser_mark, Parser_rewind } from "./parser/support.js";
import { Parser_reparseTopLevelAwait } from "./parser/expressions.js";
import { attachFileToDiagnostics } from "./parser/errors-recovery.js";
import { ParseSourceFile } from "./parser/statements-declarations.js";
import { GetJSDocCommentRanges } from "./utilities.js";

function parse(text: string): GoPtr<SourceFile> {
  return ParseSourceFile(
    { FileName: "/index.ts", Path: "/index.ts" } satisfies SourceFileParseOptions,
    text,
    ScriptKindTS,
  );
}

function firstStatement(file: GoPtr<SourceFile>): Node {
  const statement = file!.Statements!.Nodes?.[0];
  assert.notEqual(statement, undefined);
  return statement!;
}

test("pragma extraction keeps its Go nil accumulator until a pragma is found", () => {
  const ordinary = "// ordinary";
  const ordinaryRange: CommentRange = {
    Kind: KindSingleLineCommentTrivia,
    HasTrailingNewLine: false,
    pos: 0,
    end: ordinary.length,
  };
  assert.equal(extractPragmas(ordinaryRange, ordinary), undefined);

  const pragma = "// @ts-check";
  const pragmaRange: CommentRange = { ...ordinaryRange, end: pragma.length };
  assert.deepEqual(extractPragmas(pragmaRange, pragma)?.map(value => value.Name), ["ts-check"]);

  const factory = NewNodeFactory({});
  assert.equal(getCommentPragmas(factory, `${ordinary}\nconst value = 1;`), undefined);
  assert.deepEqual(getCommentPragmas(factory, `${pragma}\nconst value = 1;`)?.map(value => value.Name), ["ts-check"]);

  assert.equal(parse("const value = 1;")!.Pragmas, undefined);
  assert.deepEqual(parse(`${pragma}\nconst value = 1;`)!.Pragmas?.map(value => value.Name), ["ts-check"]);
});

test("parser JSDoc scratch slices begin in the Go nil state", () => {
  const parser = newParser();
  Parser_initializeState(
    parser,
    { FileName: "/index.ts", Path: "/index.ts" } satisfies SourceFileParseOptions,
    "",
    ScriptKindTS,
  );

  assert.equal(parser!.jsdocCommentsSpace, undefined);
  assert.equal(parser!.jsdocCommentRangesSpace, undefined);
  assert.equal(parser!.jsdocTagCommentsSpace, undefined);
  assert.equal(parser!.jsdocTagCommentsPartsSpace, undefined);
  assert.equal(parser!.diagnostics, undefined);
  assert.equal(parser!.jsDiagnostics, undefined);
  assert.equal(parser!.jsdocDiagnostics, undefined);
  assert.equal(parser!.jsdocInfos, undefined);
  assert.equal(parser!.possibleAwaitSpans, undefined);
  assert.equal(parser!.reparseList, undefined);
  assert.equal(parser!.reparsedClones, undefined);
  assert.equal(parser!.nodeSliceArena.data, undefined);
  assert.equal(parser!.stringSliceArena.data, undefined);
});

test("parser mark and rewind preserve nil and allocated-empty state", () => {
  const parser = newParser();
  Parser_initializeState(
    parser,
    { FileName: "/index.ts", Path: "/index.ts" } satisfies SourceFileParseOptions,
    "",
    ScriptKindTS,
  );

  Parser_rewind(parser, Parser_mark(parser));
  assert.equal(parser!.diagnostics, undefined);
  assert.equal(parser!.jsDiagnostics, undefined);
  assert.equal(parser!.jsdocInfos, undefined);
  assert.equal(parser!.reparsedClones, undefined);

  parser!.diagnostics = [];
  parser!.jsDiagnostics = [];
  parser!.jsdocInfos = [];
  parser!.reparsedClones = [];
  Parser_rewind(parser, Parser_mark(parser));
  assert.notEqual(parser!.diagnostics, undefined);
  assert.notEqual(parser!.jsDiagnostics, undefined);
  assert.notEqual(parser!.jsdocInfos, undefined);
  assert.notEqual(parser!.reparsedClones, undefined);
  assert.deepEqual(parser!.diagnostics, []);
  assert.deepEqual(parser!.jsDiagnostics, []);
  assert.deepEqual(parser!.jsdocInfos, []);
  assert.deepEqual(parser!.reparsedClones, []);
});

test("parser diagnostics remain nil until the first parse error", () => {
  assert.equal(SourceFile_Diagnostics(parse("const value = 1;")), undefined);
  const invalidDiagnostics = SourceFile_Diagnostics(parse("const = 1;"));
  assert.notEqual(invalidDiagnostics, undefined);
  assert.ok(invalidDiagnostics!.length > 0);
});

test("source-file diagnostic APIs preserve nil and allocated-empty slices", () => {
  const file = parse("const value = 1;");
  const empty: GoSlice<never> = [];

  SourceFile_SetDiagnostics(file, undefined);
  SourceFile_SetJSDiagnostics(file, undefined);
  SourceFile_SetJSDocDiagnostics(file, undefined);
  SourceFile_SetBindDiagnostics(file, undefined);
  assert.equal(SourceFile_Diagnostics(file), undefined);
  assert.equal(SourceFile_JSDiagnostics(file), undefined);
  assert.equal(SourceFile_JSDocDiagnostics(file), undefined);
  assert.equal(SourceFile_BindDiagnostics(file), undefined);

  SourceFile_SetDiagnostics(file, empty);
  SourceFile_SetJSDiagnostics(file, empty);
  SourceFile_SetJSDocDiagnostics(file, empty);
  SourceFile_SetBindDiagnostics(file, empty);
  assert.equal(SourceFile_Diagnostics(file), empty);
  assert.equal(SourceFile_JSDiagnostics(file), empty);
  assert.equal(SourceFile_JSDocDiagnostics(file), empty);
  assert.equal(SourceFile_BindDiagnostics(file), empty);
});

test("attaching source files preserves nil and allocated-empty diagnostic slices", () => {
  const file = parse("const value = 1;");
  assert.equal(attachFileToDiagnostics(undefined, file), undefined);
  const empty: GoSlice<never> = [];
  assert.equal(attachFileToDiagnostics(empty, file), empty);
});

test("generated JSDoc text factories preserve nil and allocated-empty raw slices", () => {
  const factory = NewNodeFactory({});
  assert.equal(AsJSDocText(NewJSDocText(factory, undefined))!.text, undefined);

  const empty: GoSlice<string> = [];
  assert.equal(AsJSDocText(NewJSDocText(factory, empty))!.text, empty);
});

test("top-level-await reparsing does not normalize a missing statement slice", () => {
  const parser = newParser();
  Parser_initializeState(
    parser,
    { FileName: "/index.ts", Path: "/index.ts" } satisfies SourceFileParseOptions,
    "",
    ScriptKindTS,
  );
  parser!.possibleAwaitSpans = [0, 1];

  const file = parse("");
  file!.Statements!.Nodes = undefined;
  assert.throws(
    () => Parser_reparseTopLevelAwait(parser, file),
    /possibleAwaitSpans requires source statements/,
  );
});

test("JSDoc comment-range discovery preserves nil and allocated-empty inputs", () => {
  const factory = NewNodeFactory({});
  const plainText = "const value = 1;";
  const plainFile = parse(plainText);
  const plainStatement = firstStatement(plainFile);

  assert.equal(GetJSDocCommentRanges(factory, undefined, plainStatement, plainText), undefined);
  const empty: GoSlice<CommentRange> = [];
  assert.equal(GetJSDocCommentRanges(factory, empty, plainStatement, plainText), empty);

  const documentedText = "/** docs */\nconst value = 1;";
  const documentedFile = parse(documentedText);
  const documentedStatement = firstStatement(documentedFile);
  assert.equal(GetJSDocCommentRanges(factory, undefined, documentedStatement, documentedText)?.length, 1);
});

test("JSDoc whitespace slice helpers preserve nil and allocated-empty", () => {
  assert.equal(removeLeadingNewlines(undefined), undefined);
  assert.equal(removeTrailingWhitespace(undefined), undefined);

  const leadingEmpty: GoSlice<string> = [];
  const trailingEmpty: GoSlice<string> = [];
  assert.deepEqual(removeLeadingNewlines(leadingEmpty), []);
  assert.deepEqual(removeTrailingWhitespace(trailingEmpty), []);
  assert.notEqual(removeLeadingNewlines(leadingEmpty), undefined);
  assert.notEqual(removeTrailingWhitespace(trailingEmpty), undefined);
});

test("Node JSDoc getters preserve cached nil and allocated-empty values", () => {
  const file = parse("const value = 1;");
  const statement = firstStatement(file);
  assert.equal(Node_JSDoc(statement, file), undefined);
  assert.equal(Node_EagerJSDoc(statement, file), undefined);

  statement.Flags |= NodeFlagsHasJSDoc;
  SourceFile_SetHasLazyJSDoc(file, false);
  const cache: GoMap<GoPtr<Node>, GoPtr<GoSlice<GoPtr<Node>>>> = new globalThis.Map();
  cache.set(statement, undefined);
  SourceFile_SetJSDocCache(file, cache);
  assert.equal(Node_JSDoc(statement, file), undefined);
  assert.equal(Node_EagerJSDoc(statement, file), undefined);

  const empty: GoSlice<GoPtr<Node>> = [];
  cache.set(statement, empty);
  assert.equal(Node_JSDoc(statement, file), empty);
  assert.equal(Node_EagerJSDoc(statement, file), empty);
});
