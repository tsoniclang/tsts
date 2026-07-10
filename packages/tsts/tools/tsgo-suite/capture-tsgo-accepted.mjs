#!/usr/bin/env node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  acceptedOverlayPaths,
  captureAcceptedOverlays,
} from "./accepted-overlay-capture.mjs";
import { loadActiveAcceptedOverlayBinding } from "./accepted-overlay-contract.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(scriptPath), "../../../..");
const paths = acceptedOverlayPaths(repoRoot);

try {
  const command = parseCommand(process.argv.slice(2));
  if (command.name === "verify") {
    const sourcePin = loadAndVerifyTsgoSourcePin(paths);
    const { barebonesLibContent } = await import(join(paths.packageRoot, "dist/src/index.js"));
    const active = loadActiveAcceptedOverlayBinding({
      root: paths.acceptedRoot,
      sourcePin,
      caseRoot: paths.caseRoot,
      baselineRoot: paths.baselineRoot,
      barebonesLibContent,
    });
    console.log(`VERIFIED capture=${active.capture.capture.captureId} binding=${active.binding.binding.bindingId}`);
  } else {
    const result = await captureAcceptedOverlays(paths);
    console.log(`CAPTURED ${result.capture.capture.captureId}`);
    console.log(`BOUND ${result.binding.binding.bindingId}`);
    console.log("Not activated. Review the immutable capture and binding, then update active.json through code review.");
  }
} catch (error) {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
}

export function parseCommand(args) {
  if (args.length === 1 && args[0] === "verify") return { name: "verify" };
  if (args.length === 1 && args[0] === "capture") return { name: "capture" };
  throw new Error("Usage: capture-tsgo-accepted.mjs verify | capture");
}
