import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind, type Node, type SourceFile } from "../../ast/index.js";
import { parseSourceFile } from "../../parser/index.js";
import { isCompletedNode, positionBelongsToNode } from "./completedNode.js";

function source(text: string): SourceFile {
  return parseSourceFile(text);
}

function firstNode(file: SourceFile, kind: Kind): Node {
  const found = findFirst(file, kind);
  if (found === undefined) {
    throw new Error(`Expected source to contain ${Kind[kind]}`);
  }
  return found;
}

function findFirst(node: Node, kind: Kind): Node | undefined {
  if (node.kind === kind) return node;
  let found: Node | undefined;
  node.forEachChild(
    (child) => {
      if (found === undefined) {
        found = findFirst(child, kind);
      }
      return found !== undefined ? true : undefined;
    },
    (children) => {
      for (const child of children) {
        if (found !== undefined) break;
        found = findFirst(child, kind);
      }
      return found !== undefined ? true : undefined;
    },
  );
  return found;
}

export class CompletedNodeTests {
  keeps_positions_inside_a_node_and_releases_completed_end_positions(): void {
    const file = source("class Box { value: number; }");
    const classNode = firstNode(file, Kind.ClassDeclaration);

    Assert.True(positionBelongsToNode(classNode, classNode.pos, file));
    Assert.False(positionBelongsToNode(classNode, classNode.end, file));
  }

  keeps_end_positions_inside_incomplete_nodes(): void {
    const file = source("class Box { value: number;");
    const classNode = firstNode(file, Kind.ClassDeclaration);

    Assert.False(isCompletedNode(classNode, file));
    Assert.True(positionBelongsToNode(classNode, classNode.end, file));
  }

  recognizes_brace_delimited_declarations_and_literals(): void {
    const completeFile = source("class Box { value = { answer: 42 }; }");
    const incompleteFile = source("class Box { value = { answer: 42;");

    Assert.True(isCompletedNode(firstNode(completeFile, Kind.ClassDeclaration), completeFile));
    Assert.True(isCompletedNode(firstNode(completeFile, Kind.ObjectLiteralExpression), completeFile));
    Assert.False(isCompletedNode(firstNode(incompleteFile, Kind.ClassDeclaration), incompleteFile));
    Assert.False(isCompletedNode(firstNode(incompleteFile, Kind.ObjectLiteralExpression), incompleteFile));
  }

  recognizes_parenthesized_call_and_function_shapes(): void {
    const callFile = source("const value = read(1, 2);");
    const functionFile = source("function read(value: string): number");

    Assert.True(isCompletedNode(firstNode(callFile, Kind.CallExpression), callFile));
    Assert.True(isCompletedNode(firstNode(functionFile, Kind.FunctionDeclaration), functionFile));
  }

  treats_new_without_argument_list_as_complete(): void {
    const file = source("const value = new Box;");

    Assert.True(isCompletedNode(firstNode(file, Kind.NewExpression), file));
  }

  recognizes_bracket_delimited_expressions_and_types(): void {
    const completeFile = source("type Pair = [string, number]; const xs = [1, 2];");
    const incompleteFile = source("type Pair = [string, number; const xs = [1, 2;");

    Assert.True(isCompletedNode(firstNode(completeFile, Kind.TupleType), completeFile));
    Assert.True(isCompletedNode(firstNode(completeFile, Kind.ArrayLiteralExpression), completeFile));
    Assert.False(isCompletedNode(firstNode(incompleteFile, Kind.TupleType), incompleteFile));
    Assert.False(isCompletedNode(firstNode(incompleteFile, Kind.ArrayLiteralExpression), incompleteFile));
  }

  treats_case_and_default_clauses_as_incomplete_by_contract(): void {
    const file = source("switch (value) { case 1: value; default: value; }");

    Assert.False(isCompletedNode(firstNode(file, Kind.CaseClause), file));
    Assert.False(isCompletedNode(firstNode(file, Kind.DefaultClause), file));
  }

  follows_control_statement_child_completion(): void {
    const completeFile = source("if (flag) { work(); } else { done(); }");
    const incompleteFile = source("if (flag) { work(); } else { done();");

    Assert.True(isCompletedNode(firstNode(completeFile, Kind.IfStatement), completeFile));
    Assert.False(isCompletedNode(firstNode(incompleteFile, Kind.IfStatement), incompleteFile));
  }

  requires_template_and_module_specifier_terminal_nodes(): void {
    const templateFile = source("const text = `hello ${name}`;");
    const importFile = source("import { value } from \"pkg\";");
    const missingImportFile = source("import { value } from ;");

    Assert.True(isCompletedNode(firstNode(templateFile, Kind.TemplateExpression), templateFile));
    Assert.True(isCompletedNode(firstNode(importFile, Kind.ImportDeclaration), importFile));
    Assert.False(isCompletedNode(firstNode(missingImportFile, Kind.ImportDeclaration), missingImportFile));
  }
}

A<CompletedNodeTests>().method((t) => t.keeps_positions_inside_a_node_and_releases_completed_end_positions).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.keeps_end_positions_inside_incomplete_nodes).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.recognizes_brace_delimited_declarations_and_literals).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.recognizes_parenthesized_call_and_function_shapes).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.treats_new_without_argument_list_as_complete).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.recognizes_bracket_delimited_expressions_and_types).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.treats_case_and_default_clauses_as_incomplete_by_contract).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.follows_control_statement_child_completion).add(FactAttribute);
A<CompletedNodeTests>().method((t) => t.requires_template_and_module_specifier_terminal_nodes).add(FactAttribute);
