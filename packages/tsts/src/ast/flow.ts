/**
 * Flow-graph payload types (control-flow analysis).
 *
 * TS-Go stores two synthetic flow payloads as the `Node` of a `FlowNode`
 * (`internal/ast/flow.go`): a `FlowSwitchClauseData` for `FlowFlagsSwitchClause`
 * nodes and a `FlowReduceLabelData` for `FlowFlagsReduceLabel` nodes. The binder
 * builds them via `newFlowNodeEx(flag, NewFlow…Data(...), antecedent)`
 * (`binder.go:478,513`) and the checker reads them back through
 * `flow.Node.AsFlowSwitchClauseData()` / `flow.Node.AsFlowReduceLabelData()`
 * (`checker/flow.go:1047,182`).
 *
 * TSTS mirrors that single-slot model: `FlowNode.node` is a `FlowNodePayload`
 * (a real AST `Node` for ordinary flow nodes, or one of these payloads for the
 * two synthetic kinds), and the accessors below are the TS form of TS-Go's
 * `Node.As…()` casts.
 */

import type { FlowLabel, FlowList } from "./aliases.js";
import type { Node } from "./generated/types.js";

/** Synthetic payload for a `FlowFlagsSwitchClause` flow node (flow.go:43-60). */
export interface FlowSwitchClauseData {
  readonly switchStatement: Node;
  readonly clauseStart: number;
  readonly clauseEnd: number;
}

/** Synthetic payload for a `FlowFlagsReduceLabel` flow node (flow.go:64-75). */
export interface FlowReduceLabelData {
  readonly target: FlowLabel;
  // TS-Go's `Antecedents *FlowList` is nilable; the reduce param can be absent.
  readonly antecedents: FlowList | undefined;
}

/** What a `FlowNode.node` slot may hold: an AST node, or a synthetic payload. */
export type FlowNodePayload = Node | FlowSwitchClauseData | FlowReduceLabelData;

/** TS form of `flow.Node.AsFlowSwitchClauseData()`. */
export function asFlowSwitchClauseData(node: FlowNodePayload | undefined): FlowSwitchClauseData | undefined {
  return node !== undefined && "clauseStart" in node ? node : undefined;
}

/** TS form of `flow.Node.AsFlowReduceLabelData()`. */
export function asFlowReduceLabelData(node: FlowNodePayload | undefined): FlowReduceLabelData | undefined {
  return node !== undefined && "target" in node ? node : undefined;
}

/** The AST node held by an ordinary flow node's slot, if it is one. */
export function flowNodeAstNode(node: FlowNodePayload | undefined): Node | undefined {
  return node !== undefined && "kind" in node ? node : undefined;
}

/** `FlowSwitchClauseData.IsEmpty()` (flow.go:58-60). */
export function flowSwitchClauseDataIsEmpty(data: FlowSwitchClauseData): boolean {
  return data.clauseStart === data.clauseEnd;
}
