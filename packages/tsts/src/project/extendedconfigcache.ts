import { createHash } from "node:crypto";

import { OwnerCache } from "./ownercache.js";

export interface ExtendedConfigParseArgs<TEntry> {
  readonly fileName: string;
  readonly content: string;
  readonly resolutionStack: readonly string[];
  readonly parse: () => TEntry;
  readonly extendedFileContents?: (fileName: string) => string | undefined;
}

export interface ExtendedConfigCacheEntry<TEntry> {
  readonly entry: TEntry;
  readonly hash: string;
}

export type ExtendedConfigCache<TEntry> = OwnerCache<string, ExtendedConfigCacheEntry<TEntry>, ExtendedConfigParseArgs<TEntry>>;

export function newExtendedConfigCache<TEntry>(): ExtendedConfigCache<TEntry> {
  return new OwnerCache(
    (_path, args) => {
      const entry = args.parse();
      return { entry, hash: hashExtendedConfig(entry, args) };
    },
    (_path, cached, args) => cached.hash !== hashExtendedConfig(cached.entry, args),
  );
}

export function hashExtendedConfig<TEntry>(entry: TEntry, args: ExtendedConfigParseArgs<TEntry>): string {
  const hasher = createHash("sha256");
  hasher.update(args.content);
  hasher.update(JSON.stringify(entry));
  for (const fileName of args.resolutionStack) {
    hasher.update(fileName);
    hasher.update(args.extendedFileContents?.(fileName) ?? "");
  }
  return hasher.digest("hex");
}
