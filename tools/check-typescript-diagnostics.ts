import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sha256 } from "./common.js";

interface VersionInfo {
  readonly upstreamCommit: string;
  readonly diagnosticMessagesHash: string;
}

function parseVersion(text: string): VersionInfo {
  const commit = text.match(/\| Commit \| `([^`]+)` \|/)?.[1];
  const hash = text.match(/\| `diagnosticMessages\.json` SHA-256 \| `([a-f0-9]{64})` \|/)?.[1];
  if (commit === undefined || hash === undefined) {
    throw new Error("schema/typescript/VERSION.md is missing commit or diagnosticMessages.json checksum rows");
  }
  return { upstreamCommit: commit, diagnosticMessagesHash: hash };
}

async function compareUpstreamIfAvailable(): Promise<void> {
  const upstream = process.env.TYPESCRIPT_REPO ?? "/home/jester/repos/microsoft/TypeScript";
  if (!existsSync(upstream)) {
    console.log(`TypeScript upstream repo not found at ${upstream}; checksum-only diagnostic validation completed.`);
    return;
  }

  const upstreamPath = join(upstream, "src/compiler/diagnosticMessages.json");
  if (!existsSync(upstreamPath)) {
    throw new Error(`Expected upstream diagnostic catalog does not exist: ${upstreamPath}`);
  }

  const localHash = await sha256("schema/typescript/diagnosticMessages.json");
  const upstreamHash = await sha256(upstreamPath);
  if (localHash !== upstreamHash) {
    throw new Error(`diagnosticMessages.json differs from ${upstreamPath}: local ${localHash}, upstream ${upstreamHash}`);
  }

  console.log(`Validated local diagnostic catalog against TypeScript repo at ${upstream}.`);
}

async function main(): Promise<void> {
  const version = parseVersion(await readFile("schema/typescript/VERSION.md", "utf8"));
  const actualHash = await sha256("schema/typescript/diagnosticMessages.json");
  if (actualHash !== version.diagnosticMessagesHash) {
    throw new Error(`diagnosticMessages.json checksum mismatch: expected ${version.diagnosticMessagesHash}, got ${actualHash}`);
  }
  await compareUpstreamIfAvailable();
  console.log(`Diagnostic catalog check passed for TypeScript commit ${version.upstreamCommit}.`);
}

await main();
