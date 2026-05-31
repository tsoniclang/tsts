import { realpathSync } from "node:fs";

export function realpath(path: string): string {
  const resolved = realpathSync.native(path);
  if (resolved.startsWith("\\\\?\\")) {
    const withoutLongPrefix = resolved.slice(4);
    if (withoutLongPrefix.startsWith("UNC\\")) return `\\\\${withoutLongPrefix.slice(4)}`;
    return withoutLongPrefix;
  }
  return resolved;
}
