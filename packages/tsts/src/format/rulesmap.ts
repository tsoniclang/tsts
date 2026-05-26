/**
 * Rule-bucket lookup table.
 *
 * Port of TS-Go `internal/format/rulesmap.go` (156 LoC).
 * Each (leftKind, rightKind) bucket holds rules ordered so that
 * Stop-rules with specific tokens beat Context-rules with specific
 * tokens beat NoContext-rules with any tokens, etc.
 */

import { getAllRules } from "./rules.js";
import { RuleAction, type RuleSpec } from "./rule.js";
import type { FormattingContext } from "./context.js";

const MASK_BIT_SIZE = 5;
const MASK = 0b11111;

let mapRowLength = -1;
let rulesMapCache: (readonly RuleSpec[])[] | undefined;

export function setMapRowLength(value: number): void {
  mapRowLength = value;
  rulesMapCache = undefined;
}

function getRuleBucketIndex(row: number, column: number): number {
  return row * mapRowLength + column;
}

/**
 * Mirrors TS-Go `getRules` — returns the rules whose token range and
 * predicates match the current context, in priority order.
 */
export function getRules(context: FormattingContext, out: RuleSpec[] = []): RuleSpec[] {
  const map = getRulesMap();
  const bucket = map[getRuleBucketIndex(currentTokenKindOf(context), nextTokenKindOf(context))] ?? [];
  if (bucket.length === 0) return out;

  let ruleActionMask = 0;
  outer: for (const ruleSpec of bucket) {
    const acceptRuleActions = ~getRuleActionExclusion(ruleActionMask);
    if ((ruleSpec.rule.action & acceptRuleActions) === 0) continue;
    for (const p of ruleSpec.rule.context) {
      if (!p(context)) continue outer;
    }
    out.push(ruleSpec);
    ruleActionMask |= ruleSpec.rule.action;
  }
  return out;
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

export function getRulesMap(): (readonly RuleSpec[])[] {
  if (rulesMapCache === undefined) rulesMapCache = buildRulesMap();
  return rulesMapCache;
}

function buildRulesMap(): (readonly RuleSpec[])[] {
  const rules = getAllRules();
  if (mapRowLength < 0) {
    // Default to a generous upper-bound; real Kind.LastToken+1 will
    // be set via setMapRowLength once the Kind enum is loaded.
    mapRowLength = 512;
  }
  const m: RuleSpec[][] = new Array(mapRowLength * mapRowLength);
  for (let i = 0; i < m.length; i++) m[i] = [];
  const constructionState = new Array<number>(m.length).fill(0);

  for (const rule of rules) {
    const specific = rule.leftTokenRange.isSpecific && rule.rightTokenRange.isSpecific;
    for (const left of rule.leftTokenRange.tokens) {
      for (const right of rule.rightTokenRange.tokens) {
        const index = getRuleBucketIndex(left, right);
        addRule(m[index]!, rule, specific, constructionState, index);
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
): void {
  let position: number;
  if ((rule.rule.action & STOP_ACTION) !== 0) {
    position = specificTokens ? RulesPositionStopRulesSpecific : RulesPositionStopRulesAny;
  } else if (rule.rule.context.length !== 0) {
    position = specificTokens ? RulesPositionContextRulesSpecific : RulesPositionContextRulesAny;
  } else {
    position = specificTokens ? RulesPositionNoContextRulesSpecific : RulesPositionNoContextRulesAny;
  }

  const state = constructionState[rulesBucketIndex]!;
  const insertIndex = getRuleInsertionIndex(state, position);
  rules.splice(insertIndex, 0, rule);
  constructionState[rulesBucketIndex] = increaseInsertionIndex(state, position);
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

// Re-export for parity
export class RulesMap {
  static getRules = getRules;
  static getRulesMap = getRulesMap;
}

// ---------------------------------------------------------------------------
// Forward-declared accessors — implemented in context.ts when wired
// ---------------------------------------------------------------------------

declare function currentTokenKindOf(ctx: FormattingContext): number;
declare function nextTokenKindOf(ctx: FormattingContext): number;
