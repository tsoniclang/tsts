/**
 * JSONValue / JSONValueType discriminator for package.json parsing.
 *
 * Port of TS-Go `internal/packagejson/jsonvalue.go` (175 LoC).
 * Wraps a generic JSON shape with a typed-kind tag to support trace
 * messages like "expected type of `typesVersions` to be `object`,
 * got `array`".
 *
 * Decoding is done eagerly from `JSON.parse` output (no streaming
 * decoder is needed in TS).
 */

import { unmarshal } from "../json/json.js";

export type JSONValueType = number;
export const JSONValueType = {
  NotPresent: 0,
  Null: 1,
  String: 2,
  Number: 3,
  Boolean: 4,
  Array: 5,
  Object: 6,
} as const;

export function jsonValueTypeToString(t: JSONValueType): string {
  switch (t) {
    case JSONValueType.Null: return "null";
    case JSONValueType.String: return "string";
    case JSONValueType.Number: return "number";
    case JSONValueType.Boolean: return "boolean";
    case JSONValueType.Array: return "array";
    case JSONValueType.Object: return "object";
    default: return `unknown(${t})`;
  }
}

export interface JSONValue {
  readonly type: JSONValueType;
  readonly value: unknown;
}

export function jsonValueNotPresent(): JSONValue {
  return { type: JSONValueType.NotPresent, value: undefined };
}

export function isPresent(v: JSONValue): boolean {
  return v.type !== JSONValueType.NotPresent;
}

export function isFalsy(v: JSONValue): boolean {
  switch (v.type) {
    case JSONValueType.NotPresent:
    case JSONValueType.Null:
      return true;
    case JSONValueType.String:
      return v.value === "";
    case JSONValueType.Number:
      return v.value === 0;
    case JSONValueType.Boolean:
      return v.value === false;
    default:
      return false;
  }
}

export function asObject(v: JSONValue): ReadonlyMap<string, JSONValue> {
  if (v.type !== JSONValueType.Object) {
    throw new Error(`expected object, got ${jsonValueTypeToString(v.type)}`);
  }
  return v.value as ReadonlyMap<string, JSONValue>;
}

export function asArray(v: JSONValue): readonly JSONValue[] {
  if (v.type !== JSONValueType.Array) {
    throw new Error(`expected array, got ${jsonValueTypeToString(v.type)}`);
  }
  return v.value as readonly JSONValue[];
}

export function asString(v: JSONValue): string {
  if (v.type !== JSONValueType.String) {
    throw new Error(`expected string, got ${jsonValueTypeToString(v.type)}`);
  }
  return v.value as string;
}

/**
 * Parse a raw JSON string into a tagged JSONValue tree.
 */
export function parseJsonValue(text: string): JSONValue {
  return convertToJsonValue(unmarshal(text));
}

export function convertToJsonValue(raw: unknown): JSONValue {
  if (raw === null) return { type: JSONValueType.Null, value: null };
  if (raw === undefined) return { type: JSONValueType.NotPresent, value: undefined };
  if (typeof raw === "string") return { type: JSONValueType.String, value: raw };
  if (typeof raw === "number") return { type: JSONValueType.Number, value: raw };
  if (typeof raw === "boolean") return { type: JSONValueType.Boolean, value: raw };
  if (Array.isArray(raw)) {
    return {
      type: JSONValueType.Array,
      value: (raw as readonly unknown[]).map(convertToJsonValue),
    };
  }
  // object
  const obj = new Map<string, JSONValue>();
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    obj.set(k, convertToJsonValue(v));
  }
  return { type: JSONValueType.Object, value: obj };
}
