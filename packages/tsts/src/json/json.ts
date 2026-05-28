/**
 * JSON utilities.
 *
 * Port of TS-Go `internal/json/json.go` (100 LoC).
 * TS-Go's wrappers around go-json support invalid UTF-8 and indent
 * control; the TS counterpart uses native JSON.stringify / JSON.parse
 * and exposes the same Marshal/MarshalIndent/Unmarshal names so
 * ported callers translate mechanically.
 *
 * Values are typed as `JsValue` (TSTS canonical dynamic-JSON carrier)
 * rather than `unknown`.
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

// ---------------------------------------------------------------------------
// Marshal / Unmarshal
// ---------------------------------------------------------------------------

/**
 * Marshal a value to a compact JSON string. Mirrors TS-Go's `Marshal`.
 */
export function marshal(input: JsValue): string {
  return JSON.stringify(input);
}

/**
 * Marshal a value with indentation. Mirrors TS-Go's `MarshalIndent`.
 *
 * `prefix` is prepended to every line except the first. `indent` is
 * the per-level indent string. When both are empty, falls back to
 * compact `marshal`.
 */
export function marshalIndent(input: JsValue, prefix: string, indent: string): string {
  if (prefix === "" && indent === "") return marshal(input);
  const body = JSON.stringify(input, undefined, indent);
  if (prefix === "") return body;
  return body.split("\n").join("\n" + prefix);
}

/**
 * Parses a JSON string. Equivalent to TS-Go's `Unmarshal`.
 * Throws SyntaxError on invalid input. Returns `JsValue` — narrow at
 * the call site with the helpers below or with `instanceof`/`typeof`
 * guards.
 */
export function unmarshal(input: string): JsValue {
  return JSON.parse(input) as JsValue;
}

// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------

export function isJsonObject(value: JsValue): value is { readonly [key: string]: JsValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: JsValue): value is readonly JsValue[] {
  return Array.isArray(value);
}
