import { lstatSync, realpathSync } from "node:fs";
import path from "node:path";

export function requireSafeDeltaOutputRoot(outRoot, sourceRoots) {
  if (typeof outRoot !== "string" || !path.isAbsolute(outRoot)) throw new Error("porter delta output root must be absolute");
  if (!Array.isArray(sourceRoots) || sourceRoots.length !== 2 || sourceRoots.some((root) => typeof root !== "string" || !path.isAbsolute(root))) {
    throw new Error("porter delta source roots must be two absolute paths");
  }
  const parent = path.dirname(outRoot);
  const parentStat = lstatSync(parent);
  if (parentStat.isSymbolicLink() || !parentStat.isDirectory() || realpathSync(parent) !== path.resolve(parent)) {
    throw new Error("porter delta evidence parent must be one real directory with no symbolic-link traversal");
  }
  for (const sourceRoot of sourceRoots) {
    const relative = path.relative(sourceRoot, outRoot);
    if (relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))) {
      throw new Error(`porter delta --out must be outside source checkout ${sourceRoot}`);
    }
  }
  return outRoot;
}
