/**
 * Internal assertions and debug helpers.
 *
 * Port of TS-Go internal/debug/debug.go. All functions throw on failure;
 * TypeScript's `throw` replaces Go's `panic`.
 */

/**
 * Throws an unconditional debug-failure error.
 *
 * Used at unreachable code paths or impossible states. Mirrors TS-Go's
 * `Fail` behavior of prefixing the message with "Debug failure.".
 */
export function fail(reason?: string): never {
  const msg = reason && reason.length > 0
    ? "Debug failure. " + reason
    : "Debug failure.";
  throw new Error(msg);
}

/**
 * Throws an assertion error for an unexpected node kind. Used in
 * exhaustive switch statements over `Kind` to surface bugs early.
 */
export function failBadSyntaxKind(node: { kindString(): string }, ...message: readonly unknown[]): never {
  const msg = message.length === 0 ? "Unexpected node." : message.join("");
  fail(`${msg}\nNode ${node.kindString()} was unexpected.`);
}

/**
 * Throws for impossible values in exhaustive switches; param type `never`
 * gives compile-time exhaustiveness checking when the call site is reached.
 */
export function assertNever(member: unknown, ...message: readonly unknown[]): never {
  const msg = message.length === 0 ? "Illegal value:" : message.join("");
  fail(`${msg} ${String(member)}`);
}

/**
 * Throws if `value` is false. The error message is composed from the
 * provided arguments.
 */
export function assert(value: boolean, ...message: readonly unknown[]): asserts value {
  if (value) return;
  const msg = message.length > 0
    ? "False expression: " + message.join("")
    : "False expression.";
  fail(msg);
}
