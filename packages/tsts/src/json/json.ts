/**
 * JSON utilities.
 *
 * Port of TS-Go `internal/json/json.go` (100 LoC).
 *
 * `internal/json/json.go` is a thin facade over the external Go module
 * `github.com/go-json-experiment/json` and its `jsontext` companion. Its
 * genuine compiler-logic surface is the trio `Marshal` / `MarshalIndent`
 * / `Unmarshal`, which we port mechanically here (1:1 control flow):
 *
 *   - `marshal`        <- `Marshal`
 *   - `marshalIndent`  <- `MarshalIndent` (`prefix==""&&indent==""` falls
 *                          back to compact `marshal`, matching upstream)
 *   - `unmarshal`      <- `Unmarshal`
 *
 * TS replaces the go-json runtime with native JSON.parse and a typed,
 * closed-`JsonValue` stringifier (Tsonic's closed-type-stringify policy
 * forbids reflective JSON.stringify of `any`).
 *
 * The remaining TS-Go declarations are go-json/jsontext library surface,
 * NOT TS-Go compiler logic, and have no TypeScript-compiler counterpart.
 * They are deliberately Go-only / deferred:
 *
 *   - streaming codec types & ctor: `Encoder`, `Decoder`, `NewDecoder`,
 *     `MarshalEncode`, `UnmarshalDecode`
 *   - io.Writer / io.Reader wrappers: `MarshalWrite`, `MarshalIndentWrite`,
 *     `UnmarshalRead`
 *   - opaque go-json option tokens: `allowInvalid`, `AllowDuplicateNames`,
 *     `Deterministic`, `WithIndent`
 *   - jsontext token constants: `BeginObject`, `EndObject`, `BeginArray`,
 *     `EndArray`, `Null`
 *   - library type aliases / interfaces: `Value`, `Kind`, `MarshalerTo`,
 *     `UnmarshalerFrom`
 *
 * Every TSTS consumer (packagejson, collections/orderedMap, sourcemap,
 * tracing) decodes eagerly from JSON.parse output, so the streaming
 * decoder/encoder is unreachable and is intentionally not reconstructed.
 *
 * JSON values are dynamic at the package boundary, matching TS-Go's
 * `any`-shaped Marshal/Unmarshal contract. The public carrier excludes
 * JavaScript-only primitives that JSON cannot represent.
 */

/**
 * JSON-compatible values at API boundaries.
 */
export type JsonPrimitive = string | number | boolean;
export type JsonValue =
  | JsonPrimitive
  | null
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };

// ---------------------------------------------------------------------------
// Marshal / Unmarshal
// ---------------------------------------------------------------------------

/**
 * Marshal a value to a compact JSON string. Mirrors TS-Go's `Marshal`.
 */
export function marshal(input: JsonValue): string {
  return stringifyJson(input, "", "");
}

/**
 * Marshal a value with indentation. Mirrors TS-Go's `MarshalIndent`.
 *
 * `prefix` is prepended to every line except the first. `indent` is
 * the per-level indent string. When both are empty, falls back to
 * compact `marshal`.
 */
export function marshalIndent(input: JsonValue, prefix: string, indent: string): string {
  if (prefix === "" && indent === "") return marshal(input);
  return formatJson(marshal(input), prefix, indent);
}

/**
 * Parses a JSON string. Equivalent to TS-Go's `Unmarshal`.
 * Throws SyntaxError on invalid input. Returns `JsonValue` — narrow at
 * the call site with the helpers below or with `instanceof`/`typeof`
 * guards.
 */
export function unmarshal(input: string): JsonValue {
  return JSON.parse(input) as JsonValue;
}

function formatJson(compact: string, prefix: string, indent: string): string {
  if (indent === "") {
    if (prefix === "") return compact;
    return compact.split("\n").join("\n" + prefix);
  }
  let result = "";
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = 0; index < compact.length; index += 1) {
    const ch = compact[index]!;
    if (inString) {
      result += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }
    if (ch === "\"") {
      inString = true;
      result += ch;
      continue;
    }
    if (ch === "{" || ch === "[") {
      const next = compact[index + 1];
      if ((ch === "{" && next === "}") || (ch === "[" && next === "]")) {
        result += ch + next;
        index += 1;
        continue;
      }
      depth += 1;
      result += ch + "\n" + prefix + indent.repeat(depth);
      continue;
    }
    if (ch === "}" || ch === "]") {
      depth -= 1;
      result += "\n" + prefix + indent.repeat(depth) + ch;
      continue;
    }
    if (ch === ",") {
      result += ",\n" + prefix + indent.repeat(depth);
      continue;
    }
    if (ch === ":") {
      result += ": ";
      continue;
    }
    result += ch;
  }
  return result;
}

function stringifyJson(input: JsonValue, prefix: string, indent: string): string {
  const out = indent === "" ? stringifyJsonCompact(input) : stringifyJsonIndented(input, indent, 0);
  if (prefix === "") return out;
  return out.split("\n").join("\n" + prefix);
}

function stringifyJsonCompact(input: JsonValue): string {
  if (input === null) return "null";
  if (typeof input === "string") return JSON.stringify(input);
  if (typeof input === "number") return Number.isFinite(input) ? String(input) : "null";
  if (typeof input === "boolean") return input ? "true" : "false";
  if (Array.isArray(input)) {
    const items: string[] = [];
    for (const item of input) items.push(stringifyJsonCompact(item));
    return "[" + items.join(",") + "]";
  }
  const object = input as { readonly [key: string]: JsonValue };
  const fields: string[] = [];
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value !== undefined) fields.push(JSON.stringify(key) + ":" + stringifyJsonCompact(value));
  }
  return "{" + fields.join(",") + "}";
}

function stringifyJsonIndented(input: JsonValue, indent: string, depth: number): string {
  if (input === null || typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
    return stringifyJsonCompact(input);
  }
  const childIndent = indent.repeat(depth + 1);
  const currentIndent = indent.repeat(depth);
  if (Array.isArray(input)) {
    if (input.length === 0) return "[]";
    const items: string[] = [];
    for (const item of input) items.push(childIndent + stringifyJsonIndented(item, indent, depth + 1));
    return "[\n" + items.join(",\n") + "\n" + currentIndent + "]";
  }
  const object = input as { readonly [key: string]: JsonValue };
  const fields: string[] = [];
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value !== undefined) fields.push(childIndent + JSON.stringify(key) + ": " + stringifyJsonIndented(value, indent, depth + 1));
  }
  if (fields.length === 0) return "{}";
  return "{\n" + fields.join(",\n") + "\n" + currentIndent + "}";
}

// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------

export function isJsonObject(value: JsonValue): value is { readonly [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: JsonValue): value is readonly JsonValue[] {
  return Array.isArray(value);
}
