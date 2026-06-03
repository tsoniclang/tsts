/**
 * Rule-bucket lookup table.
 *
 * Port of TS-Go `internal/format/rulesmap.go` (156 LoC).
 * Each (leftKind, rightKind) bucket holds rules ordered so that
 * Stop-rules with specific tokens beat Context-rules with specific
 * tokens beat NoContext-rules with any tokens, etc.
 */

import { Kind } from "../ast/index.js";
import { assert } from "../debug/index.js";

import { getAllRules } from "./rules.js";
import { RuleAction, type RuleSpec } from "./rule.js";
import type { FormattingContext } from "./context.js";

const MASK_BIT_SIZE = 5;
const MASK = 0b11111;

// mapRowLength mirrors TS-Go's `mapRowLength = int(ast.KindLastToken) + 1`
// (rulesmap.go:42) — a compile-time-style constant derived from the Kind
// enum, not a mutable runtime value.
const mapRowLength = (Kind.LastToken as number) + 1;

/**
 * Mirrors TS-Go `getRules` — returns the rules whose token range and
 * predicates match the current context, in priority order.
 */
export function getRules(context: FormattingContext, rules: RuleSpec[] = []): RuleSpec[] {
  const bucket = getRulesMap()[getRuleBucketIndex(currentTokenKindOf(context), nextTokenKindOf(context))] ?? [];
  if (bucket.length > 0) {
    let ruleActionMask = 0;
    outer: for (const rule of bucket) {
      const acceptRuleActions = ~getRuleActionExclusion(ruleActionMask);
      if ((rule.rule.action & acceptRuleActions) !== 0) {
        const preds = rule.rule.context;
        for (const p of preds) {
          if (!p(context)) {
            continue outer;
          }
        }
        rules.push(rule);
        ruleActionMask |= rule.rule.action;
      }
    }
    return rules;
  }
  return rules;
}

const MODIFY_SPACE_ACTION = RuleAction.InsertSpace | RuleAction.InsertNewLine | RuleAction.DeleteSpace;
const MODIFY_TOKEN_ACTION = RuleAction.DeleteToken | RuleAction.InsertTrailingSemicolon;

function getRuleActionExclusion(action: number): number {
  let mask = 0;
  if ((action & RuleAction.StopProcessingSpaceActions) !== 0) {
    mask |= MODIFY_SPACE_ACTION;
  }
  if ((action & RuleAction.StopProcessingTokenActions) !== 0) {
    mask |= MODIFY_TOKEN_ACTION;
  }
  if ((action & MODIFY_SPACE_ACTION) !== 0) {
    mask |= MODIFY_SPACE_ACTION;
  }
  if ((action & MODIFY_TOKEN_ACTION) !== 0) {
    mask |= MODIFY_TOKEN_ACTION;
  }
  return mask;
}

function getRuleBucketIndex(row: number, column: number): number {
  assert(row <= (Kind.LastKeyword as number) && column <= (Kind.LastKeyword as number), "Must compute formatting context from tokens");
  return row * mapRowLength + column;
}

// getRulesMap mirrors TS-Go's `sync.OnceValue(buildRulesMap)` (rulesmap.go:66):
// the rules map is built once and memoized for the process lifetime.
let rulesMapCache: (readonly RuleSpec[])[] | undefined;
export function getRulesMap(): (readonly RuleSpec[])[] {
  if (rulesMapCache === undefined) rulesMapCache = buildRulesMap();
  return rulesMapCache;
}

function buildRulesMap(): (readonly RuleSpec[])[] {
  const rules = getAllRules();
  // Map from bucket index to array of rules
  const m: RuleSpec[][] = new Array(mapRowLength * mapRowLength);
  for (let i = 0; i < m.length; i++) m[i] = [];
  // This array is used only during construction of the rulesbucket in the map
  const rulesBucketConstructionStateList = new Array<number>(m.length).fill(0);
  for (const rule of rules) {
    const specificRule = rule.leftTokenRange.isSpecific && rule.rightTokenRange.isSpecific;
    for (const left of rule.leftTokenRange.tokens) {
      for (const right of rule.rightTokenRange.tokens) {
        const index = getRuleBucketIndex(left, right);
        m[index] = addRule(m[index]!, rule, specificRule, rulesBucketConstructionStateList, index);
      }
    }
  }
  return m;
}

// ---------------------------------------------------------------------------
// Rule positions
// ---------------------------------------------------------------------------

const RulesPositionStopRulesSpecific = 0;
const RulesPositionStopRulesAny = MASK_BIT_SIZE * 1;
const RulesPositionContextRulesSpecific = MASK_BIT_SIZE * 2;
const RulesPositionContextRulesAny = MASK_BIT_SIZE * 3;
const RulesPositionNoContextRulesSpecific = MASK_BIT_SIZE * 4;
const RulesPositionNoContextRulesAny = MASK_BIT_SIZE * 5;

const STOP_ACTION = RuleAction.StopProcessingSpaceActions | RuleAction.StopProcessingTokenActions;

function addRule(
  rules: RuleSpec[],
  rule: RuleSpec,
  specificTokens: boolean,
  constructionState: number[],
  rulesBucketIndex: number,
): RuleSpec[] {
  let position: number;
  if ((rule.rule.action & STOP_ACTION) !== 0) {
    position = specificTokens ? RulesPositionStopRulesSpecific : RulesPositionStopRulesAny;
  } else if (rule.rule.context.length !== 0) {
    position = specificTokens ? RulesPositionContextRulesSpecific : RulesPositionContextRulesAny;
  } else {
    position = specificTokens ? RulesPositionNoContextRulesSpecific : RulesPositionNoContextRulesAny;
  }

  const state = constructionState[rulesBucketIndex]!;
  rules.splice(getRuleInsertionIndex(state, position), 0, rule);
  constructionState[rulesBucketIndex] = increaseInsertionIndex(state, position);
  return rules;
}

function getRuleInsertionIndex(indexBitmap: number, maskPosition: number): number {
  let index = 0;
  for (let pos = 0; pos <= maskPosition; pos += MASK_BIT_SIZE) {
    index += indexBitmap & MASK;
    indexBitmap >>>= MASK_BIT_SIZE;
  }
  return index;
}

function increaseInsertionIndex(indexBitmap: number, maskPosition: number): number {
  const value = ((indexBitmap >>> maskPosition) & MASK) + 1;
  if ((value & MASK) !== value) {
    throw new Error("Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");
  }
  return (indexBitmap & ~(MASK << maskPosition)) | (value << maskPosition);
}

// Read the current/next token kinds from the formatting context. Mirrors
// TS-Go's `context.currentTokenSpan.Kind` / `context.nextTokenSpan.Kind`
// reads in getRules (rulesmap.go:12).
function currentTokenKindOf(ctx: FormattingContext): number {
  return ctx.currentTokenSpan?.kind ?? 0;
}
function nextTokenKindOf(ctx: FormattingContext): number {
  return ctx.nextTokenSpan?.kind ?? 0;
}
