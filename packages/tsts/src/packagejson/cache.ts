/**
 * package.json info cache.
 *
 * Port of TS-Go `internal/packagejson/cache.go` (172 LoC). Caches
 * parsed package.json contents keyed by canonical path.
 */

import type { Path } from "../tspath/path.js";
import { JSONValueType, jsonValueTypeToString, type JSONValue, asArray, asObject, asString } from "./jsonValue.js";
import { mustParse, tryParseVersionRange, type Version } from "../semver/index.js";
import { version, versionMajorMinor } from "../core/version.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";

// ---------------------------------------------------------------------------
// VersionPaths
// ---------------------------------------------------------------------------

export interface VersionPaths {
  readonly version: string;
  readonly pathsJSON?: ReadonlyMap<string, JSONValue>;
  readonly paths?: ReadonlyMap<string, readonly string[]>;
}

export function versionPathsExists(v: VersionPaths | undefined): v is VersionPaths {
  return v !== undefined && v.version !== "" && v.pathsJSON !== undefined;
}

export function getVersionPathsPaths(v: VersionPaths): ReadonlyMap<string, readonly string[]> {
  if (v.paths !== undefined) return v.paths;
  if (v.pathsJSON === undefined) return new Map();
  const paths = new Map<string, readonly string[]>();
  for (const [key, value] of v.pathsJSON) {
    if (value.type !== JSONValueType.Array) continue;
    const arr = asArray(value);
    const list: string[] = [];
    for (const p of arr) {
      if (p.type === JSONValueType.String) list.push(asString(p));
    }
    paths.set(key, list);
  }
  return paths;
}

// ---------------------------------------------------------------------------
// PackageJson + InfoCacheEntry
// ---------------------------------------------------------------------------

export interface PackageJsonFields {
  // The full Fields struct is in TS-Go's expected.go; we mirror the
  // most-referenced ones here and let the rest be discovered through
  // typesVersions.
  name?: string;
  version?: string;
  main?: string;
  module?: string;
  types?: string;
  typings?: string;
  type?: "module" | "commonjs" | undefined;
  exports?: JSONValue;
  imports?: JSONValue;
  typesVersions: JSONValue;
}

export interface PackageJson {
  readonly fields: PackageJsonFields;
  readonly parseable: boolean;
  versionPaths?: VersionPaths;
  versionTraces?: readonly DiagnosticAndArgs[];
}

export interface DiagnosticAndArgs {
  message: DiagnosticMessage;
  args: readonly unknown[];
}

let cachedTypeScriptVersion: Version | undefined;
function getTypeScriptVersion(): Version {
  cachedTypeScriptVersion ??= mustParse(version());
  return cachedTypeScriptVersion;
}

/**
 * Mirrors the body of TS-Go's `PackageJson.GetVersionPaths` `sync.Once`:
 * parses `fields.typesVersions`, populating `p.versionPaths` and caching
 * `p.versionTraces`. Runs at most once per `PackageJson`.
 */
function computeVersionTraces(p: PackageJson): readonly DiagnosticAndArgs[] {
  const cached = p.versionTraces;
  if (cached !== undefined) {
    return cached;
  }

  const traces: DiagnosticAndArgs[] = [];
  const typesVersions = p.fields.typesVersions;
  if (typesVersions.type === JSONValueType.NotPresent) {
    traces.push({
      message: Diagnostics.X_package_json_does_not_have_a_0_field,
      args: ["typesVersions"],
    });
    p.versionTraces = traces;
    return traces;
  }
  if (typesVersions.type !== JSONValueType.Object) {
    traces.push({
      message: Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
      args: ["typesVersions", "object", jsonValueTypeToString(typesVersions.type)],
    });
    p.versionTraces = traces;
    return traces;
  }

  traces.push({
    message: Diagnostics.X_package_json_has_a_typesVersions_field_with_version_specific_path_mappings,
    args: ["typesVersions"],
  });

  for (const [key, value] of asObject(typesVersions)) {
    const keyRange = tryParseVersionRange(key);
    if (keyRange === undefined) {
      traces.push({
        message: Diagnostics.X_package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range,
        args: [key],
      });
      continue;
    }
    if (keyRange.test(getTypeScriptVersion())) {
      if (value.type !== JSONValueType.Object) {
        traces.push({
          message: Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
          args: ["typesVersions['" + key + "']", "object", jsonValueTypeToString(value.type)],
        });
        p.versionTraces = traces;
        return traces;
      }
      p.versionPaths = {
        version: key,
        pathsJSON: asObject(value),
      };
      p.versionTraces = traces;
      return traces;
    }
  }

  traces.push({
    message: Diagnostics.X_package_json_does_not_have_a_typesVersions_entry_that_matches_version_0,
    args: [versionMajorMinor()],
  });
  p.versionTraces = traces;
  return traces;
}

/**
 * Parses `fields.typesVersions` to populate `versionPaths` + `versionTraces`,
 * computing them at most once. Mirrors TS-Go `PackageJson.GetVersionPaths`
 * (the `sync.Once` body); subsequent calls reuse the cached traces and replay
 * them through `trace` if provided.
 */
export function getVersionPaths(
  p: PackageJson,
  trace?: (m: DiagnosticMessage, ...args: readonly unknown[]) => void
): VersionPaths | undefined {
  const versionTraces = computeVersionTraces(p);

  if (trace !== undefined) {
    for (const t of versionTraces) {
      trace(t.message, ...t.args);
    }
  }
  return p.versionPaths;
}

export interface InfoCacheEntry {
  packageDirectory: string;
  directoryExists: boolean;
  contents?: PackageJson;
}

export function infoCacheEntryExists(e: InfoCacheEntry | undefined): e is InfoCacheEntry & { contents: PackageJson } {
  return e !== undefined && e.contents !== undefined;
}

// ---------------------------------------------------------------------------
// InfoCache
// ---------------------------------------------------------------------------

export class InfoCache {
  private readonly cache = new Map<Path, InfoCacheEntry>();
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNames: boolean;

  constructor(currentDirectory: string, useCaseSensitiveFileNames: boolean) {
    this.currentDirectory = currentDirectory;
    this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
  }

  get(packageJsonPath: string): InfoCacheEntry | undefined {
    const key = this.toKey(packageJsonPath);
    return this.cache.get(key);
  }

  set(packageJsonPath: string, info: InfoCacheEntry): InfoCacheEntry {
    const key = this.toKey(packageJsonPath);
    const existing = this.cache.get(key);
    if (existing !== undefined) return existing;
    this.cache.set(key, info);
    return info;
  }

  private toKey(packageJsonPath: string): Path {
    // Lower-cased if case-insensitive, otherwise as-is.
    return (this.useCaseSensitiveFileNames ? packageJsonPath : packageJsonPath.toLowerCase()) as Path;
  }
}
