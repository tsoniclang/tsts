import { resolve } from "node:path";

import { removeSuccessfulScratchTree } from "./scratch-lifecycle.mjs";

const [repositoryArgument, pathArgument, ...remaining] = process.argv.slice(2);
if (repositoryArgument === undefined || pathArgument === undefined || remaining.length !== 0) {
  throw new Error("Repository root and successful scratch path are required");
}
await removeSuccessfulScratchTree(resolve(repositoryArgument), resolve(pathArgument));
