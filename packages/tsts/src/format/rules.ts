/**
 * Formatting rule definitions.
 *
 * Port skeleton of TS-Go `internal/format/rules.go` (~450 LoC).
 * Defines the static rule table that the rules-map consults to decide
 * whitespace decisions between any two adjacent token kinds.
 */

import type { RuleSpec } from "./rule.js";

export const allRules: readonly RuleSpec[] = [
  // Skeleton — the Strada table contains ~250 rule entries spanning
  // operator spacing, type-argument tightness, control-flow newlines,
  // JSX whitespace, etc. The full set will be filled in as tests need.
];
