import { dirname, join } from "node:path";

import { normalizeSlashes } from "../tspath/index.js";
import type { FS } from "../vfs/index.js";

export const embedded = false;

export function wrapFS(fs: FS): FS {
  return fs;
}

let cachedExecutableDir: string | undefined;

export function executableDir(): string {
  if (cachedExecutableDir !== undefined) return cachedExecutableDir;
  const exe = process.argv[1];
  if (exe === undefined || exe === "") throw new Error("bundled: failed to get executable path");
  cachedExecutableDir = dirname(normalizeSlashes(exe));
  return cachedExecutableDir;
}

let cachedLibPath: string | undefined;

export function libPath(): string {
  if (cachedLibPath !== undefined) return cachedLibPath;
  cachedLibPath = join(executableDir(), "libs").replace(/\\/g, "/");
  return cachedLibPath;
}

export function isBundled(_path: string): boolean {
  return false;
}

