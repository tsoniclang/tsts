/**
 * Parser for package.json into typed PackageJSON shape.
 *
 * Mirrors TS-Go's `Expected[T]` semantics: a field can be absent, null,
 * present with the wrong type, or present with the expected type.
 */

import { unmarshal } from "../json/index.js";
import {
  absent,
  expectedOf,
  type DependencyFields,
  type Expected,
  type HeaderFields,
  type JsonTypeName,
  type JSONValueShape,
  jsonValueFromJSON,
  type PackageJSON,
  type PathFields,
} from "./types.js";

/**
 * Parse package.json text into the typed shape. Throws on invalid JSON
 * syntax; type mismatches on individual fields produce `wrong-type` Expected
 * states rather than throwing.
 */
export function parsePackageJSON(text: string): PackageJSON {
  const raw: unknown = unmarshal(text);
  return packageJSONFromValue(raw);
}

type JsonObject = { readonly [key: string]: unknown };

function isPlainJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function packageJSONFromValue(raw: unknown): PackageJSON {
  const obj: JsonObject = isPlainJsonObject(raw) ? raw : {};
  return {
    name: readString(obj, "name"),
    version: readString(obj, "version"),
    type: readString(obj, "type"),
    tsconfig: readString(obj, "tsconfig"),
    main: readString(obj, "main"),
    types: readString(obj, "types"),
    typings: readString(obj, "typings"),
    typesVersions: jsonValueFromJSON(obj["typesVersions"]),
    imports: jsonValueFromJSON(obj["imports"]),
    exports: jsonValueFromJSON(obj["exports"]),
    dependencies: readStringMap(obj, "dependencies"),
    devDependencies: readStringMap(obj, "devDependencies"),
    peerDependencies: readStringMap(obj, "peerDependencies"),
    optionalDependencies: readStringMap(obj, "optionalDependencies"),
    raw,
  };
}

function readString(obj: JsonObject, key: string): Expected<string> {
  const v = obj[key];
  if (v === undefined) return absent;
  if (v === null) return { state: "null", actualJSONType: "null" };
  const actual = jsonTypeOf(v);
  if (typeof v !== "string") return { state: "wrong-type", actualJSONType: actual };
  return expectedOf(v, "string");
}

function readStringMap(
  obj: JsonObject,
  key: string
): Expected<ReadonlyMap<string, string>> {
  const v = obj[key];
  if (v === undefined) return absent;
  if (v === null) return { state: "null", actualJSONType: "null" };
  const actual = jsonTypeOf(v);
  if (!isPlainJsonObject(v)) return { state: "wrong-type", actualJSONType: actual };
  // Only string-valued entries; others ignored
  const map = new Map<string, string>();
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === "string") {
      map.set(k, val);
    }
  }
  return expectedOf(map, "object");
}

function jsonTypeOf(v: unknown): JsonTypeName {
  if (v === null) return "null";
  if (typeof v === "string") return "string";
  if (typeof v === "number") return "number";
  if (typeof v === "boolean") return "boolean";
  if (Array.isArray(v)) return "array";
  return "object";
}

// Re-export the supporting types so consumers can use them
export type { HeaderFields, PathFields, DependencyFields, PackageJSON, Expected, JSONValueShape };
