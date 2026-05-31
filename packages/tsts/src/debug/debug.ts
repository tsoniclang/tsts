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
  throw new Error(formatFailureMessage(reason));
}

export function formatFailureMessage(reason?: string): string {
  return reason !== undefined && reason.length > 0
    ? "Debug failure. " + reason
    : "Debug failure.";
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
  fail(`${msg} ${debugString(member)}`);
}

/**
 * Throws if `value` is false. The error message is composed from the
 * provided arguments.
 */
export function assert(value: boolean, ...message: readonly unknown[]): asserts value {
  if (value) return;
  assertSlow(...message);
}

function assertSlow(...message: readonly unknown[]): never {
  fail(formatAssertionMessage(message));
}

export function formatAssertionMessage(message: readonly unknown[]): string {
  return message.length > 0
    ? "False expression: " + message.join("")
    : "False expression.";
}

export function debugString(value: unknown): string {
  if (hasKindString(value)) {
    return value.kindString();
  }
  if (hasToString(value)) {
    return value.toString();
  }
  return String(value);
}

export function hasKindString(value: unknown): value is { kindString(): string } {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly kindString?: unknown }).kindString === "function";
}

export function hasToString(value: unknown): value is { toString(): string } {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly toString?: unknown }).toString === "function"
    && (value as { readonly toString: unknown }).toString !== Object.prototype.toString;
}
