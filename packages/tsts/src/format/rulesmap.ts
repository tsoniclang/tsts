/**
 * Rule-bucket lookup table.
 *
 * Port skeleton of TS-Go `internal/format/rulesmap.go` (~156 LoC).
 * Buckets the rule list by (leftKind, rightKind, context) for O(1)
 * dispatch from the format span walker.
 */

import { allRules } from "./rules.js";
import type { RuleSpec } from "./rule.js";

export class RulesMap {
  readonly buckets: ReadonlyMap<string, readonly RuleSpec[]>;

  constructor() {
    const buckets = new Map<string, RuleSpec[]>();
    for (const rule of allRules) {
      const key = bucketKey(rule);
      const list = buckets.get(key) ?? [];
      list.push(rule);
      buckets.set(key, list);
    }
    this.buckets = buckets;
  }

  getRule(leftKind: number, rightKind: number): readonly RuleSpec[] {
    return this.buckets.get(`${leftKind}-${rightKind}`) ?? [];
  }
}

function bucketKey(_rule: RuleSpec): string {
  // Skeleton — Strada keys per (leftKind, rightKind) cross-product.
  return "0-0";
}
