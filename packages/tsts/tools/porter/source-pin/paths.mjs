import { existsSync, realpathSync } from "node:fs";
import path from "node:path";

export function requireRelativePath(value, label) {
  if (typeof value !== "string" || value.trim() === "") throw new Error(`${label} must be a non-empty relative path`);
  const normalized = value.split(path.sep).join("/");
  if (path.posix.isAbsolute(normalized) || normalized === ".." || normalized.startsWith("../") || normalized.includes("/../")) {
    throw new Error(`${label} must stay within its declared root`);
  }
  return normalized;
}

export function resolveInside(root, relative, label) {
  const safe = requireRelativePath(relative, label);
  const resolved = path.resolve(root, safe);
  const relation = path.relative(root, resolved);
  if (relation === ".." || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new Error(`${label} resolves outside its declared root`);
  }
  if (existsSync(root) && existsSync(path.dirname(resolved))) {
    const realRoot = realpathSync(root);
    const realParent = realpathSync(path.dirname(resolved));
    if (realParent !== realRoot && !realParent.startsWith(`${realRoot}${path.sep}`)) throw new Error(`${label} escapes its declared root through a symlink`);
  }
  return resolved;
}

export function relativePath(root, file) {
  return path.relative(root, file).split(path.sep).join("/");
}
