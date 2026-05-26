/**
 * Rule-context predicates.
 *
 * Port skeleton of TS-Go `internal/format/rulecontext.go` (~629 LoC).
 * Each predicate inspects the formatting context (current/previous
 * token, enclosing node, parent kind) to decide whether a given rule
 * applies. The Strada list contains ~80 small predicates.
 */

import type { FormattingContext } from "./context.js";

export type RulePredicate = (ctx: FormattingContext) => boolean;

// Skeleton: a handful of representative predicates. Full coverage will
// be filled in as the rule table matures.
export const isOptionDisabled =
  (option: keyof FormattingContextOptions): RulePredicate =>
  (ctx) =>
    !Boolean((ctx.options as unknown as Record<string, unknown>)[option as string]);

export const isOptionEnabled =
  (option: keyof FormattingContextOptions): RulePredicate =>
  (ctx) =>
    Boolean((ctx.options as unknown as Record<string, unknown>)[option as string]);

export const isNonNullOptionPresent =
  (option: string): RulePredicate =>
  (ctx) =>
    (ctx.options as unknown as Record<string, unknown>)[option] !== undefined;

export const isSameLineTokenContext: RulePredicate = (ctx) => ctx.tokensAreOnSameLine();
export const isNotFormatOnEnter: RulePredicate = (ctx) => ctx.formattingRequestKind !== FormatRequestKindOnEnter;

interface FormattingContextOptions {
  readonly _opts: unknown;
}

declare const FormatRequestKindOnEnter: number;
