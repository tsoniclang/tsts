/**
 * Format rule types — single-rule data structures.
 *
 * Port of TS-Go `internal/format/rule.go`. Rules describe the
 * whitespace behavior between two tokens given a context filter.
 */

import type { Kind } from "../ast/index.js";

import type { FormattingContext } from "./context.js";

/**
 * Predicate over the formatting context. Mirrors TS-Go
 * `contextPredicate`.
 */
export type ContextPredicate = (ctx: FormattingContext) => boolean;

/** Empty predicate list — matches any context. */
export const anyContext: readonly ContextPredicate[] = [];

/**
 * Whitespace action a rule produces. Bit flags so multiple actions
 * can combine. Mirrors TS-Go `ruleAction`.
 */
export type RuleAction = number;
export const RuleAction = {
  None: 0 as RuleAction,
  StopProcessingSpaceActions: 1 << 0 as RuleAction,
  StopProcessingTokenActions: 1 << 1 as RuleAction,
  InsertSpace: 1 << 2 as RuleAction,
  InsertNewLine: 1 << 3 as RuleAction,
  DeleteSpace: 1 << 4 as RuleAction,
  DeleteToken: 1 << 5 as RuleAction,
  InsertTrailingSemicolon: 1 << 6 as RuleAction,
} as const;

export const RuleActionStop: RuleAction =
  RuleAction.StopProcessingSpaceActions | RuleAction.StopProcessingTokenActions;

export const RuleActionModifySpace: RuleAction =
  RuleAction.InsertSpace | RuleAction.InsertNewLine | RuleAction.DeleteSpace;

export const RuleActionModifyToken: RuleAction =
  RuleAction.DeleteToken | RuleAction.InsertTrailingSemicolon;

/**
 * Per-rule flags. Mirrors TS-Go `ruleFlags`.
 */
export type RuleFlags = 0 | 1;
export const RuleFlags: {
  readonly None: RuleFlags;
  readonly CanDeleteNewLines: RuleFlags;
} = {
  None: 0,
  CanDeleteNewLines: 1,
};

/**
 * A range of token kinds the left/right side of a rule applies to.
 * Mirrors TS-Go `tokenRange`.
 */
export interface TokenRange {
  readonly tokens: readonly Kind[];
  readonly isSpecific: boolean;
}

/**
 * A compiled rule. Mirrors TS-Go `ruleImpl`.
 */
export interface RuleImpl {
  readonly debugName: string;
  readonly context: readonly ContextPredicate[];
  readonly action: RuleAction;
  readonly flags: RuleFlags;
}

/**
 * A rule spec — the (leftToken, rightToken) ranges and the rule body.
 * Mirrors TS-Go `ruleSpec`.
 */
export interface RuleSpec {
  readonly leftTokenRange: TokenRange;
  readonly rightTokenRange: TokenRange;
  readonly rule: RuleImpl;
}

/**
 * Creates a rule. Mirrors TS-Go `rule`.
 */
export function rule(
  debugName: string,
  left: Kind | readonly Kind[] | TokenRange,
  right: Kind | readonly Kind[] | TokenRange,
  context: readonly ContextPredicate[],
  action: RuleAction,
  flags: RuleFlags = RuleFlags.None,
): RuleSpec {
  return {
    leftTokenRange: toTokenRange(left),
    rightTokenRange: toTokenRange(right),
    rule: {
      debugName,
      context,
      action,
      flags,
    },
  };
}

function toTokenRange(e: Kind | readonly Kind[] | TokenRange): TokenRange {
  if (typeof e === "number") {
    return { isSpecific: true, tokens: [e] };
  }
  if (Array.isArray(e)) {
    return { isSpecific: true, tokens: e as readonly Kind[] };
  }
  // Assume it's already a TokenRange.
  return e as TokenRange;
}
