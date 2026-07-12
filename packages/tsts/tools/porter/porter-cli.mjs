#!/usr/bin/env node
import process from "node:process";

import { inspectGitCheckout } from "./source-pin/git.mjs";
import { repoRoot } from "./core/runtime.mjs";

try {
  const command = process.argv[2] ?? "status";
  if (command === "delta" || command === "delta-verify") {
    const implementation = inspectGitCheckout(repoRoot);
    if (implementation.issues.length > 0) {
      throw new Error(`Porter delta commands require a clean implementation checkout before command modules load: ${implementation.issues.join("; ")}`);
    }
  }
  const { main } = await import("./core/commands.mjs");
  await main();
} catch (error) {
  console.error(error?.message ?? String(error));
  process.exitCode = 1;
}
