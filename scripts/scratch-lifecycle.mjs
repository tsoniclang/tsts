import { chmod, lstat, readdir, rm } from "node:fs/promises";
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
  await makeDirectoriesWritable(target);
  await rm(target, { recursive: true, maxRetries: 3, retryDelay: 100 });
}

async function makeDirectoriesWritable(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      await makeDirectoriesWritable(join(directory, entry.name));
    }
  }
  await chmod(directory, 0o755);
}
