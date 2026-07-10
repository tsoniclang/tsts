import { identifier, type Node, SyntaxKind, visitNode } from "./ast.js";
import { Checker } from "./checker.js";
import { FlowFlags, FlowGraph } from "./flow.js";

export const checker = new Checker();
export const graph = new FlowGraph();
export const start = graph.add({ id: 1, flags: FlowFlags.Start });
export const assignment = graph.add({
  id: 2,
  flags: FlowFlags.Assignment,
  antecedent: start,
  target: "value",
  expression: { kind: SyntaxKind.NumericLiteral, flags: 0, pos: 0, end: 1, value: 1 },
});

export function summarize(node: Node): string {
  return visitNode(node, {
    [SyntaxKind.Identifier]: (value) => value.text,
    [SyntaxKind.NumericLiteral]: (value) => `${value.value}`,
    [SyntaxKind.StringLiteral]: (value) => value.text,
    [SyntaxKind.BinaryExpression]: (value) => value.operator,
    [SyntaxKind.CallExpression]: (value) => `call:${value.arguments.length}`,
    [SyntaxKind.PropertyAccessExpression]: (value) => value.name.text,
    [SyntaxKind.VariableDeclaration]: (value) => value.name.text,
    [SyntaxKind.FunctionDeclaration]: (value) => value.name.text,
    [SyntaxKind.Block]: (value) => `block:${value.statements.length}`,
    [SyntaxKind.ReturnStatement]: (value) => value.expression === undefined ? "return" : "return:value",
  });
}

export const name = identifier("benchmark", 10);
export const reachableAssignment = graph.reaches(assignment, (node) => node.flags === FlowFlags.Assignment);
