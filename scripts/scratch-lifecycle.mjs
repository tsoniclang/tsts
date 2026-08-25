import { chmod, lstat, readdir, rmdir, unlink } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

export async function removeSuccessfulScratchTree(repositoryArgument, pathArgument) {
  const repositoryRoot = resolve(repositoryArgument);
  const scratchRoot = join(repositoryRoot, ".temp");
  const target = resolve(pathArgument);
  const pathWithinScratch = relative(scratchRoot, target);
  if (
    pathWithinScratch.length === 0 ||
    pathWithinScratch === ".." ||
    pathWithinScratch.startsWith(`..${sep}`) ||
    isAbsolute(pathWithinScratch)
  ) {
    throw new Error("Successful scratch cleanup target is outside the owned .temp tree");
  }
  if (!(await lstat(target)).isDirectory()) {
    throw new Error("Successful scratch cleanup target is not a directory");
  }
  await removeTree(target);
}

async function removeTree(directory) {
  await chmod(directory, 0o755);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await removeTree(path);
    } else {
      await unlink(path);
    }
  }
  await rmdir(directory);
}
