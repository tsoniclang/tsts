import { resolve } from "node:path";

import {
  verifyToolRuntime,
  verifyToolRuntimeSelection,
} from "./tool-runtime-manifest.mjs";

const [repositoryArgument, mode] = process.argv.slice(2);
if (repositoryArgument === undefined) {
  throw new Error("repository root is required");
}
const repositoryRoot = resolve(repositoryArgument);
if (mode === "--selection") {
  const submodules = verifyToolRuntimeSelection(repositoryRoot);
  console.log(`tool_runtime_selection=verified submodules=${submodules.length}`);
} else if (mode === undefined) {
  const manifest = await verifyToolRuntime(repositoryRoot);
  console.log(`tool_runtime=verified packages=${manifest.packages.length}`);
} else {
  throw new Error(`Unsupported tool runtime verification mode '${mode}'`);
}
