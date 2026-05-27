/**
 * Control-flow analysis (CFA) primitives.
 *
 * Ported from Strada `flow.go` (within `checker`) — the deeper CFA
 * surface used by narrowing. Complements the lighter `flow.ts`.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

export const FlowFlags = {
  Unreachable:        1 << 0,
  Start:              1 << 1,
  BranchLabel:        1 << 2,
  LoopLabel:          1 << 3,
  Assignment:         1 << 4,
  TrueCondition:      1 << 5,
  FalseCondition:     1 << 6,
  SwitchClause:       1 << 7,
  ArrayMutation:      1 << 8,
  Call:               1 << 9,
  ReduceLabel:        1 << 10,
  Referenced:         1 << 11,
  Shared:             1 << 12,
  PreFinally:         1 << 13,
  AfterFinally:       1 << 14,
  Label:              (1 << 2) | (1 << 3),
  Condition:          (1 << 5) | (1 << 6),
} as const;

export type FlowFlags = number;

export interface FlowNode {
  readonly flags: FlowFlags;
  readonly antecedent?: FlowNode | undefined;
  readonly antecedents?: readonly FlowNode[] | undefined;
}

/**
 * Returns true when the flow node is the special "unreachable"
 * sentinel — code after this is statically dead.
 */
export function isUnreachableFlowNode(node: FlowNode): boolean {
  return (node.flags & FlowFlags.Unreachable) !== 0;
}

/**
 * Returns true when the flow node is a label (branch or loop).
 */
export function isLabelFlowNode(node: FlowNode): boolean {
  return (node.flags & FlowFlags.Label) !== 0;
}

/**
 * Returns true when the flow node represents a condition branch.
 */
export function isConditionFlowNode(node: FlowNode): boolean {
  return (node.flags & FlowFlags.Condition) !== 0;
}

/**
 * Returns true when the flow node represents a variable assignment.
 */
export function isAssignmentFlowNode(node: FlowNode): boolean {
  return (node.flags & FlowFlags.Assignment) !== 0;
}

/**
 * Walks a flow node's antecedent chain breadth-first. Returns true
 * when the predicate matches any node in the chain.
 */
export function anyAntecedent(
  node: FlowNode,
  predicate: (n: FlowNode) => boolean,
): boolean {
  const queue: FlowNode[] = [node];
  const visited = new Set<FlowNode>();
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    if (predicate(current)) return true;
    if (current.antecedent !== undefined) queue.push(current.antecedent);
    if (current.antecedents !== undefined) {
      for (const a of current.antecedents) queue.push(a);
    }
  }
  return false;
}

/**
 * Returns the narrowed type at a flow node. Conservative placeholder
 * — returns Any until the full CFA pass is wired.
 */
export function getTypeAtFlowNode(_node: FlowNode): Type {
  return ANY;
}

/**
 * Returns the canonical "unreachable" flow node used by the binder.
 */
export const UnreachableFlow: FlowNode = { flags: FlowFlags.Unreachable };

/**
 * Returns the canonical "start" flow node for a function body.
 */
export const StartFlow: FlowNode = { flags: FlowFlags.Start };
