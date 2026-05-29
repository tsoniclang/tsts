/**
 * FlowFlags — control-flow-graph node flag bitset.
 *
 * Faithful port of TS-Go `internal/ast/flow.go` (lines 5-23; single source of
 * truth). Modeled as a const-map (NOT an enum) so it carries no runtime
 * machinery and stays a plain `number` at the type level — same discipline as
 * `scanner/token-flags.ts`.
 *
 * Bit values verified 1:1 against typescript-go:
 *   internal/ast/flow.go:7-22
 *
 * M4a defines the constants only. The flow GRAPH construction (createFlow*,
 * the binder's #currentFlow wiring) is DEFERRED to M4d.
 */

export type FlowFlags = number;

export const FlowFlags = {
  Unreachable: 1 << 0, // 1     Unreachable code
  Start: 1 << 1, // 2     Start of flow graph
  BranchLabel: 1 << 2, // 4     Non-looping junction
  LoopLabel: 1 << 3, // 8     Looping junction
  Assignment: 1 << 4, // 16    Assignment
  TrueCondition: 1 << 5, // 32    Condition known to be true
  FalseCondition: 1 << 6, // 64    Condition known to be false
  SwitchClause: 1 << 7, // 128   Switch statement clause
  ArrayMutation: 1 << 8, // 256   Potential array mutation
  Call: 1 << 9, // 512   Potential assertion call
  ReduceLabel: 1 << 10, // 1024  Temporarily reduce antecedents of label
  Referenced: 1 << 11, // 2048  Referenced as antecedent once
  Shared: 1 << 12, // 4096  Referenced as antecedent more than once

  // Composite values are the bitwise-OR of their members (tsgo flow.go:21-22).
  Label: (1 << 2) /* BranchLabel */ | (1 << 3) /* LoopLabel */, // 12
  Condition: (1 << 5) /* TrueCondition */ | (1 << 6) /* FalseCondition */, // 96
} as const;
