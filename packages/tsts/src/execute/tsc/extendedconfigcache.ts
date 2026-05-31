/**
 * Extended config cache.
 *
 * Port of TS-Go `internal/execute/tsc/extendedconfigcache.go`.
 */

import type { Path } from "../../tspath/index.js";

export interface ExtendedConfigCacheEntry {
  readonly configFileName: string;
  readonly path: Path;
  readonly value: unknown;
}

export interface ExtendedConfigHost {
  readonly readFile?: (fileName: string) => string | undefined;
}

export type ParseExtendedConfig = (
  fileName: string,
  path: Path,
  resolutionStack: readonly string[],
  host: ExtendedConfigHost,
  cache: ExtendedConfigCache,
) => ExtendedConfigCacheEntry;

export class ExtendedConfigCache {
  private readonly entries = new Map<Path, ExtendedConfigCacheEntry>();
  private readonly parseExtendedConfig: ParseExtendedConfig;

  constructor(parseExtendedConfig: ParseExtendedConfig) {
    this.parseExtendedConfig = parseExtendedConfig;
  }

  getExtendedConfig(
    fileName: string,
    path: Path,
    resolutionStack: readonly string[],
    host: ExtendedConfigHost,
  ): ExtendedConfigCacheEntry {
    const existing = this.entries.get(path);
    if (existing !== undefined) return existing;

    const entry = this.parseExtendedConfig(fileName, path, resolutionStack, host, this);
    this.entries.set(path, entry);
    return entry;
  }

  get size(): number {
    return this.entries.size;
  }
}
