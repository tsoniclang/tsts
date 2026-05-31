/**
 * package.json field shapes used by the compiler.
 *
 * Port of TS-Go internal/packagejson/. TS-Go uses an `Expected[T]`
 * generic to track present-but-wrong-type cases for diagnostic
 * emission; we model the same with discriminated unions.
 *
 * Only the fields the compiler reads are typed; arbitrary other fields
 * are accessible via the raw JSON parse if needed.
 */

// ────────────────────────────────────────────────────────────────────────────
// Field-presence model
// ────────────────────────────────────────────────────────────────────────────

/**
 * Tracks a field that may be absent, present with wrong type, or present
 * with the expected type. The `actualJSONType` field captures what was
 * actually in the JSON for diagnostic purposes.
 */
export type Expected<T> =
  | { readonly state: "absent" }
  | { readonly state: "null"; readonly actualJSONType: "null" }
  | { readonly state: "wrong-type"; readonly actualJSONType: JsonTypeName }
  | { readonly state: "ok"; readonly value: T; readonly actualJSONType: JsonTypeName };

export type JsonTypeName = "string" | "number" | "boolean" | "null" | "array" | "object";

export const absent: { readonly state: "absent" } = { state: "absent" };

export function expectedOf<T>(value: T, actualJSONType: JsonTypeName): Expected<T> {
  return { state: "ok", value, actualJSONType };
}

export function isPresent<T>(e: Expected<T>): boolean {
  return e.state !== "absent";
}

export function isValid<T>(e: Expected<T>): e is Extract<Expected<T>, { state: "ok" }> {
  return e.state === "ok";
}

export function getValue<T>(e: Expected<T>): { ok: true; value: T } | { ok: false } {
  if (e.state === "ok") return { ok: true, value: e.value };
  return { ok: false };
}

// ────────────────────────────────────────────────────────────────────────────
// JSONValue (tagged tree shape used for typesVersions, exports, etc.)
// ────────────────────────────────────────────────────────────────────────────

export type JSONValueType =
  | "not-present"
  | "null"
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object";

export type JSONValueShape =
  | { readonly type: "not-present" }
  | { readonly type: "null"; readonly value: null }
  | { readonly type: "string"; readonly value: string }
  | { readonly type: "number"; readonly value: number }
  | { readonly type: "boolean"; readonly value: boolean }
  | { readonly type: "array"; readonly value: readonly JSONValueShape[] }
  | { readonly type: "object"; readonly value: ReadonlyMap<string, JSONValueShape> };

export function jsonValueFromJSON(raw: unknown | undefined): JSONValueShape {
  if (raw === undefined) return { type: "not-present" };
  if (raw === null) return { type: "null", value: null };
  switch (typeof raw) {
    case "string": return { type: "string", value: raw };
    case "number": return { type: "number", value: raw };
    case "boolean": return { type: "boolean", value: raw };
    case "object":
      if (Array.isArray(raw)) {
        return {
          type: "array",
          value: raw.map((item) => jsonValueFromJSON(item)),
        };
      }
      {
        const map = new Map<string, JSONValueShape>();
        for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
          map.set(k, jsonValueFromJSON(v));
        }
        return { type: "object", value: map };
      }
  }
  // unreachable
  return { type: "not-present" };
}

export function jsonValueIsFalsy(v: JSONValueShape): boolean {
  switch (v.type) {
    case "not-present":
    case "null":
      return true;
    case "string":
      return v.value === "";
    case "number":
      return v.value === 0;
    case "boolean":
      return !v.value;
    default:
      return false;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// PackageJSON field groups
// ────────────────────────────────────────────────────────────────────────────

export interface HeaderFields {
  readonly name: Expected<string>;
  readonly version: Expected<string>;
  readonly type: Expected<string>;
}

export interface PathFields {
  readonly tsconfig: Expected<string>;
  readonly main: Expected<string>;
  readonly types: Expected<string>;
  readonly typings: Expected<string>;
  readonly typesVersions: JSONValueShape;
  readonly imports: JSONValueShape;
  readonly exports: JSONValueShape;
}

export interface DependencyFields {
  readonly dependencies: Expected<ReadonlyMap<string, string>>;
  readonly devDependencies: Expected<ReadonlyMap<string, string>>;
  readonly peerDependencies: Expected<ReadonlyMap<string, string>>;
  readonly optionalDependencies: Expected<ReadonlyMap<string, string>>;
}

export interface PackageJSON
  extends HeaderFields, PathFields, DependencyFields {
  /** Raw parsed JSON for accessing fields not covered above. */
  readonly raw: unknown;
}

/** Returns true if `name` appears in any of the dependency-flavored fields. */
export function hasDependency(pkg: DependencyFields, name: string): boolean {
  const groups: readonly Expected<ReadonlyMap<string, string>>[] = [
    pkg.dependencies,
    pkg.devDependencies,
    pkg.peerDependencies,
    pkg.optionalDependencies,
  ];
  for (const group of groups) {
    if (group.state === "ok" && group.value.has(name)) return true;
  }
  return false;
}

export type DependencyField =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies";

/**
 * Iterate over all dependencies across all fields. Callback returns false
 * to stop iteration.
 */
export function forEachDependency(
  pkg: DependencyFields,
  callback: (name: string, version: string, field: DependencyField) => boolean | void
): void {
  const groups: readonly [Expected<ReadonlyMap<string, string>>, DependencyField][] = [
    [pkg.dependencies, "dependencies"],
    [pkg.devDependencies, "devDependencies"],
    [pkg.peerDependencies, "peerDependencies"],
    [pkg.optionalDependencies, "optionalDependencies"],
  ];
  for (const [group, fieldName] of groups) {
    if (group.state !== "ok") continue;
    for (const [name, version] of group.value) {
      const cont = callback(name, version, fieldName);
      if (cont === false) return;
    }
  }
}
