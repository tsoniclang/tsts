/**
 * Constant-expression evaluator for enum members and const-context types.
 *
 * Port of TS-Go internal/evaluator/evaluator.go.
 *
 * The evaluator computes literal values for expressions during the binder
 * and checker passes. It returns a Result tagged with metadata about whether
 * the value originated syntactically as a string (for template-literal type
 * narrowing), whether evaluation crossed file boundaries, and whether the
 * value reaches into external references (for isolatedModules diagnostics).
 *
 * NOTE: this module's `newEvaluator` needs the AST module to be wired
 * (`src/ast/*`) before it can walk expression nodes. For now we expose the
 * type signatures and pure-data utility functions (`anyToString`,
 * `isTruthy`); the constructor remains a stub until the AST adoption is
 * complete.
 */

import { numberToString } from "../jsnum/string.js";

/**
 * Result of evaluating a constant expression.
 *
 * - `value` is `string | number | boolean | bigint | undefined`. `undefined`
 *   means evaluation could not produce a constant.
 * - `isSyntacticallyString` distinguishes `"5"` from `5` even when both
 *   evaluate to the string `"5"` (relevant for template-literal type narrowing).
 * - `resolvedOtherFiles` records whether evaluation followed an identifier
 *   that resolved to a declaration in a different file.
 * - `hasExternalReferences` records whether the result depends on a symbol
 *   from outside the current compilation unit (for isolatedModules).
 */
export interface EvaluatorResult {
  readonly value: string | number | boolean | bigint | undefined;
  readonly isSyntacticallyString: boolean;
  readonly resolvedOtherFiles: boolean;
  readonly hasExternalReferences: boolean;
}

export function newResult(
  value: EvaluatorResult["value"],
  isSyntacticallyString: boolean,
  resolvedOtherFiles: boolean,
  hasExternalReferences: boolean
): EvaluatorResult {
  return {
    value,
    isSyntacticallyString,
    resolvedOtherFiles,
    hasExternalReferences,
  };
}

/**
 * Evaluator function type. Takes an expression node and an optional
 * location node (for error reporting); returns the evaluated result.
 *
 * The AST node type is left as `unknown` here because the AST module is
 * still being adopted. When `src/ast/*` is wired, narrow this to the
 * appropriate node type.
 */
export type Evaluator = (expr: unknown, location: unknown) => EvaluatorResult;

/**
 * Constructs an evaluator with the given entity-resolution callback and
 * outer-expression-skipping configuration.
 *
 * STUB: the full constant-expression walker requires the active AST.
 * Returns a placeholder evaluator that always returns "unevaluable" until
 * the AST is wired and the body can be filled in (mirroring TS-Go's
 * switch on `expr.Kind`).
 */
export function newEvaluator(
  evaluateEntity: Evaluator,
  outerExpressionsToSkip: number  // OuterExpressionKinds bitmask
): Evaluator {
  void evaluateEntity;
  void outerExpressionsToSkip;
  return (_expr: unknown, _location: unknown): EvaluatorResult => {
    // TODO(tsts-rebuild): implement once AST is migrated.
    return newResult(undefined, false, false, false);
  };
}

/**
 * Stringifies an evaluated value per TS-Go's `AnyToString`. Mirrors JS
 * string-coercion rules (`String(x)` for the relevant types).
 */
export function anyToString(v: EvaluatorResult["value"]): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return numberToString(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "bigint") return v.toString();
  throw new Error("Unhandled case in anyToString");
}

/**
 * Truthiness check matching JS semantics. Throws if the value isn't one
 * of the evaluable types — callers should only call this with a confirmed
 * EvaluatorResult value.
 */
export function isTruthy(v: EvaluatorResult["value"]): boolean {
  if (typeof v === "string") return v.length !== 0;
  if (typeof v === "number") return v !== 0 && !Number.isNaN(v);
  if (typeof v === "boolean") return v;
  if (typeof v === "bigint") return v !== 0n;
  throw new Error("Unhandled case in isTruthy");
}
