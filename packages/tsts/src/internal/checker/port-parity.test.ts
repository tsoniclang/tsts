import assert from "node:assert/strict";
import { test } from "node:test";

import { Background } from "../../go/context.js";
import type { GoPtr } from "../../go/compat.js";
import type { bool } from "../../go/scalars.js";
import { Node_Initializer, Node_Type } from "../ast/ast.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import { AsVariableDeclarationList, AsVariableStatement } from "../ast/generated/casts.js";
import { KindTypeAliasDeclaration } from "../ast/generated/kinds.js";
import { InternalSymbolNameIndex } from "../ast/symbol.js";
import { SymbolFlagsNone } from "../ast/symbolflags.js";
import { LibPath, WrapFS } from "../bundled/bundled.js";
import { NewCompilerHost } from "../compiler/host.js";
import type { ProgramOptions } from "../compiler/program.js";
import { NewProgram, Program_BindSourceFiles, Program_GetSourceFile, Program_GetTypeChecker } from "../compiler/program.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { FlagsNone, InternalFlagsNone } from "../nodebuilder/types.js";
import { NewEmitContext } from "../printer/emitcontext.js";
import type { ParseConfigHost } from "../tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../tsoptions/tsconfigparsing.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import { NodeBuilder_enterContext, NodeBuilder_popContext, NewNodeBuilder } from "./nodebuilder.js";
import { NodeBuilderImpl_getNameOfSymbolAsWritten } from "./nodebuilderimpl.js";
import { Checker_elaborateError } from "./relater.js";
import { Checker_newSymbol } from "./checker/symbols.js";
import { Checker_GetTypeAtLocation, Checker_getBaseTypes } from "./checker/types.js";

function createChecker(source: string, compilerOptions: Readonly<Record<string, unknown>>) {
  let fs = FromMap(new Map<string, string>([
    ["/src/main.ts", source],
    ["/src/tsconfig.json", JSON.stringify({ compilerOptions, files: ["main.ts"] })],
  ]), false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [config, configErrors] = GetParsedCommandLineOfConfigFile(
    "/src/tsconfig.json",
    {} as CompilerOptions,
    undefined,
    host as ParseConfigHost,
    undefined,
  );
  assert.equal((configErrors ?? []).length, 0);

  const program = NewProgram({ Config: config, Host: host } satisfies ProgramOptions);
  Program_BindSourceFiles(program);
  const [checker, done] = Program_GetTypeChecker(program, Background());
  const sourceFile = Program_GetSourceFile(program, "/src/main.ts");
  assert.ok(checker !== undefined);
  assert.ok(sourceFile !== undefined);
  return { checker, done, sourceFile };
}

test("getBaseTypes ignores generic interface instantiations", () => {
  const fixture = createChecker(`
export interface Box<T> {
  value: T;
}
export type BoxOfString = Box<string>;
`, { noLib: true, strict: true });
  try {
    const alias = fixture.sourceFile.Statements?.Nodes.find((node) => node?.Kind === KindTypeAliasDeclaration);
    assert.ok(alias !== undefined);
    const aliasType = Checker_GetTypeAtLocation(fixture.checker, alias);
    assert.ok(aliasType !== undefined);
    assert.deepEqual(Checker_getBaseTypes(fixture.checker, aliasType), []);
  } finally {
    fixture.done();
  }
});

test("node builder escapes internal symbol names before creating identifiers", () => {
  const fixture = createChecker("export const value = 1;", { noLib: true });
  try {
    const symbol = Checker_newSymbol(fixture.checker, SymbolFlagsNone, InternalSymbolNameIndex);
    const builder = NewNodeBuilder(fixture.checker, NewEmitContext());
    NodeBuilder_enterContext(builder, undefined, FlagsNone, InternalFlagsNone, undefined);
    try {
      assert.equal(NodeBuilderImpl_getNameOfSymbolAsWritten(builder!.impl, symbol), "__index");
    } finally {
      NodeBuilder_popContext(builder);
    }
  } finally {
    fixture.done();
  }
});

test("noCheck disables relation error elaboration", () => {
  const fixture = createChecker("const value: { text: string } = { text: 1 };", {
    noCheck: true,
    noLib: true,
  });
  try {
    const statement = fixture.sourceFile.Statements?.Nodes[0];
    assert.ok(statement !== undefined);
    const declaration = AsVariableDeclarationList(AsVariableStatement(statement)!.DeclarationList)!.Declarations!.Nodes[0];
    const initializer = Node_Initializer(declaration);
    const typeNode = Node_Type(declaration);
    assert.ok(initializer !== undefined);
    assert.ok(typeNode !== undefined);
    const source = Checker_GetTypeAtLocation(fixture.checker, initializer);
    const target = Checker_GetTypeAtLocation(fixture.checker, typeNode);
    const diagnostics: Array<GoPtr<Diagnostic>> = [];

    assert.equal(
      Checker_elaborateError(
        fixture.checker,
        initializer,
        source,
        target,
        fixture.checker.assignableRelation,
        undefined,
        diagnostics,
      ),
      false,
    );
    assert.deepEqual(diagnostics, []);
  } finally {
    fixture.done();
  }
});
