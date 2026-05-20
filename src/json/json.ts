/**
 * JSON utilities.
 *
 * Port of TS-Go internal/json/json.go. TS-Go's wrappers around go-json
 * support invalid UTF-8 and indent control. In TypeScript, `JSON.parse`
 * and `JSON.stringify` provide the equivalent functionality; this module
 * exposes the same names so ported callers translate mechanically.
 */

/**
 * Serializes `value` to a JSON string. Equivalent to TS-Go's `Marshal`.
 */
export function marshal(value: unknown): string {
  return JSON.stringify(value);
}

/**
 * Serializes with indent / prefix. When both are empty, equivalent to
 * `marshal`. Otherwise produces multiline output.
 */
export function marshalIndent(value: unknown, prefix: string, indent: string): string {
  if (prefix === "" && indent === "") {
    return marshal(value);
  }
  // TS-Go's prefix is a per-line prefix added in addition to indent;
  // JSON.stringify doesn't have a direct equivalent.
  if (prefix === "") {
    return JSON.stringify(value, null, indent);
  }
  // Manually apply per-line prefix to the indent output.
  const base = JSON.stringify(value, null, indent);
  return base.split("\n").map((line, i) => i === 0 ? line : prefix + line).join("\n");
}

/**
 * Parses a JSON string. Equivalent to TS-Go's `Unmarshal`.
 * Throws SyntaxError on invalid input.
 */
export function unmarshal<T = unknown>(input: string): T {
  return JSON.parse(input) as T;
}

/**
 * Type guard for JSON-compatible values.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };

export function isJsonObject(value: unknown): value is { readonly [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: unknown): value is readonly JsonValue[] {
  return Array.isArray(value);
}
