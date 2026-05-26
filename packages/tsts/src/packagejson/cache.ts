/**
 * package.json info cache.
 *
 * Port of TS-Go `internal/packagejson/cache.go` (172 LoC). Caches
 * parsed package.json contents keyed by canonical path.
 */

import type { Path } from "../tspath/path.ts";
import { JSONValueType, type JSONValue, asArray, asObject, asString } from "./jsonvalue.js";

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
  message: string; // diagnostic key
  args: readonly unknown[];
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
