import { createHash } from "node:crypto";

import { parseSourceFile } from "../parser/index.js";
import type { SourceFile } from "../ast/index.js";
import { RefCountCache, type RefCountCacheOptions } from "./refCountCache.js";

export interface ParseCacheAcquireArgs {
  readonly fileName: string;
  readonly content: string;
}

export interface ParseCacheEntry {
  readonly fileName: string;
  readonly contentHash: string;
  readonly sourceFile: SourceFile;
}

export type ParseCache = RefCountCache<string, ParseCacheEntry, ParseCacheAcquireArgs>;

export function newParseCache(options: RefCountCacheOptions): ParseCache {
  return new RefCountCache(options, (_identity, args) => ({
    fileName: args.fileName,
    contentHash: hashText(args.content),
    sourceFile: parseSourceFile(args.content, { fileName: args.fileName }),
  }));
}

export function parseCacheKey(fileName: string): string {
  return fileName.replaceAll("\\", "/");
}

export function acquireParsedSourceFile(cache: ParseCache, owner: number, args: ParseCacheAcquireArgs): SourceFile {
  return cache.acquire(parseCacheKey(args.fileName), args).sourceFile;
}

export function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
