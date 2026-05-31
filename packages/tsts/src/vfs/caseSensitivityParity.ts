/**
 * VFS case-sensitivity parity helpers.
 */

export interface CanonicalPathHost {
  readonly useCaseSensitiveFileNames: boolean;
  getCurrentDirectory(): string;
}

export function toCanonicalPath(path: string, host: CanonicalPathHost): string {
  const normalized = normalizeSlashes(path);
  return host.useCaseSensitiveFileNames ? normalized : normalized.toLowerCase();
}

export function toPath(fileName: string, host: CanonicalPathHost): string {
  const absolute = isRooted(fileName) ? fileName : combinePaths(host.getCurrentDirectory(), fileName);
  return toCanonicalPath(removeDotSegments(absolute), host);
}

export function pathsEqual(left: string, right: string, host: CanonicalPathHost): boolean {
  return toCanonicalPath(left, host) === toCanonicalPath(right, host);
}

export function startsWithDirectory(path: string, directory: string, host: CanonicalPathHost): boolean {
  const canonicalPath = ensureTrailingSlash(toCanonicalPath(path, host));
  const canonicalDirectory = ensureTrailingSlash(toCanonicalPath(directory, host));
  return canonicalPath.startsWith(canonicalDirectory);
}

export function removePathPrefix(path: string, directory: string, host: CanonicalPathHost): string | undefined {
  if (!startsWithDirectory(path, directory, host)) return undefined;
  return normalizeSlashes(path).slice(ensureTrailingSlash(normalizeSlashes(directory)).length);
}

function normalizeSlashes(path: string): string {
  return path.replace(/\\/g, "/");
}

function isRooted(path: string): boolean {
  return path.startsWith("/") || /^[A-Za-z]:[\\/]/.test(path);
}

function combinePaths(left: string, right: string): string {
  return `${left.replace(/[\\/]+$/, "")}/${right.replace(/^[\\/]+/, "")}`;
}

function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function removeDotSegments(path: string): string {
  const rooted = path.startsWith("/");
  const parts: string[] = [];
  for (const part of normalizeSlashes(path).split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return `${rooted ? "/" : ""}${parts.join("/")}`;
}
