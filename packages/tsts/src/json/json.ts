/**
 * JSON utilities.
 *
 * Port of TS-Go internal/json/json.go. TS-Go's wrappers around go-json
 * support invalid UTF-8 and indent control. In TypeScript, `JSON.parse`
 * and `JSON.stringify` provide the equivalent functionality; this module
 * exposes the same names so ported callers translate mechanically.
 *
 * Tsonic-compatible: values flowing through JSON are typed as `JsValue`
 * rather than `unknown`, the sanctioned dynamic-JSON carrier.
 */

import type { JsValue } from "@tsonic/core/types.js";

/**
 * JSON-compatible values. A closed structural union.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };

// `marshal` and `marshalIndent` are temporarily removed pending a tsonic
// policy resolution for `JSON.stringify(JsonValue)` — see batch
// 2026-05-24-181000 follow-up. The previous sourcemap consumer is
// migrated separately.

/**
 * Parses a JSON string. Equivalent to TS-Go's `Unmarshal`.
 * Throws SyntaxError on invalid input. Returns `JsValue` — narrow at the
 * call site with the helpers below or with `instanceof`/`typeof` guards.
 */
export function unmarshal(input: string): JsValue {
  return JSON.parse(input) as JsValue;
}

export function isJsonObject(value: JsValue): value is { readonly [key: string]: JsValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: JsValue): value is readonly JsValue[] {
  return Array.isArray(value);
}
