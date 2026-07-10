import { type Expression, SyntaxKind } from "./ast.js";

export const enum FlowFlags {
  Start = 1 << 0,
  Assignment = 1 << 1,
  Condition = 1 << 2,
  BranchLabel = 1 << 3,
  LoopLabel = 1 << 4,
}

interface FlowBase<F extends FlowFlags> {
  readonly id: number;
  readonly flags: F;
  readonly antecedent?: FlowNode;
}

export interface FlowStart extends FlowBase<FlowFlags.Start> {}
export interface FlowAssignment extends FlowBase<FlowFlags.Assignment> { readonly target: string; readonly expression: Expression; }
export interface FlowCondition extends FlowBase<FlowFlags.Condition> { readonly expression: Expression; readonly whenTrue: boolean; }
export interface FlowBranchLabel extends FlowBase<FlowFlags.BranchLabel> { readonly antecedents: readonly FlowNode[]; }
export interface FlowLoopLabel extends FlowBase<FlowFlags.LoopLabel> { readonly antecedents: readonly FlowNode[]; }
export type FlowNode = FlowStart | FlowAssignment | FlowCondition | FlowBranchLabel | FlowLoopLabel;

export type FlowForFlag<F extends FlowFlags> = Extract<FlowNode, { readonly flags: F }>;

export class FlowGraph {
  readonly #nodes = new Map<number, FlowNode>();

  add<T extends FlowNode>(flow: T): T {
    this.#nodes.set(flow.id, flow);
    return flow;
  }

  reaches(start: FlowNode, predicate: (node: FlowNode) => boolean): boolean {
    const seen = new Map<number, boolean>();
    const visit = (node: FlowNode): boolean => {
      if (predicate(node)) return true;
      if (seen.has(node.id)) return false;
      seen.set(node.id, true);
      if (node.flags === FlowFlags.BranchLabel || node.flags === FlowFlags.LoopLabel) return node.antecedents.filter(visit).length !== 0;
      return node.antecedent === undefined ? false : visit(node.antecedent);
    };
    return visit(start);
  }

  assignedNames(start: FlowNode): readonly string[] {
    const names: string[] = [];
    this.reaches(start, (node) => {
      if (node.flags === FlowFlags.Assignment && !names.filter((name) => name === node.target).length) names.push(node.target);
      return false;
    });
    return names;
  }
}

export function expressionKey(expression: Expression): string {
  switch (expression.kind) {
    case SyntaxKind.Identifier: return `id:${expression.text}`;
    case SyntaxKind.NumericLiteral: return `number:${expression.value}`;
    case SyntaxKind.StringLiteral: return `string:${expression.text}`;
    case SyntaxKind.BinaryExpression: return `binary:${expression.operator}:${expressionKey(expression.left)}:${expressionKey(expression.right)}`;
    case SyntaxKind.CallExpression: return `call:${expressionKey(expression.expression)}:${expression.arguments.map(expressionKey).length}`;
    case SyntaxKind.PropertyAccessExpression: return `property:${expressionKey(expression.expression)}:${expression.name.text}`;
  }
}
