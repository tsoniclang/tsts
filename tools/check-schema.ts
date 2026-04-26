import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sha256 } from "./common.js";
import { normalizeKinds, normalizeNodes, readAstSchema } from "./schema.js";

interface VersionInfo {
  readonly upstreamCommit: string;
  readonly files: Record<string, string>;
}

function parseVersion(text: string): VersionInfo {
  const commit = text.match(/\| Commit \| `([^`]+)` \|/)?.[1];
  if (commit === undefined) {
    throw new Error("schema/tsgo/VERSION.md is missing the upstream commit row");
  }

  const files: Record<string, string> = {};
  for (const match of text.matchAll(/\| `([^`]+)` SHA-256 \| `([a-f0-9]{64})` \|/g)) {
    const [, file, hash] = match;
    if (file === undefined || hash === undefined) {
      throw new Error("Invalid VERSION.md checksum row");
    }
    files[file] = hash;
  }

  return { upstreamCommit: commit, files };
}

async function assertChecksum(file: string, expected: string): Promise<void> {
  const actual = await sha256(`schema/tsgo/${file}`);
  if (actual !== expected) {
    throw new Error(`${file} checksum mismatch: expected ${expected}, got ${actual}`);
  }
}

async function compareUpstreamIfAvailable(version: VersionInfo): Promise<void> {
  const upstream = process.env.TSGO_REPO ?? "/home/jester/repos/microsoft/typescript-go";
  if (!existsSync(upstream)) {
    console.log(`TS-Go upstream repo not found at ${upstream}; checksum-only schema validation completed.`);
    return;
  }

  const upstreamFiles: Record<string, string> = {
    "ast.json": "_scripts/ast.json",
    "ast.schema.json": "_scripts/ast.schema.json",
    "protocol.ts": "_packages/native-preview/src/api/node/protocol.ts",
  };

  for (const [localName, upstreamRelative] of Object.entries(upstreamFiles)) {
    const localHash = await sha256(`schema/tsgo/${localName}`);
    const upstreamPath = join(upstream, upstreamRelative);
    if (!existsSync(upstreamPath)) {
      throw new Error(`Expected upstream schema file does not exist: ${upstreamPath}`);
    }
    const upstreamHash = await sha256(upstreamPath);
    if (localHash !== upstreamHash) {
      throw new Error(`${localName} differs from ${upstreamPath}: local ${localHash}, upstream ${upstreamHash}`);
    }
  }

  const headPath = join(upstream, ".git", "HEAD");
  if (existsSync(headPath)) {
    console.log(`Validated local schema checksums against TS-Go repo at ${upstream}.`);
  }
}

async function main(): Promise<void> {
  const version = parseVersion(await readFile("schema/tsgo/VERSION.md", "utf8"));
  for (const [file, hash] of Object.entries(version.files)) {
    await assertChecksum(file, hash);
  }

  const schema = await readAstSchema();
  const kinds = normalizeKinds(schema);
  const nodes = normalizeNodes(schema);

  if (kinds.length !== 351) {
    throw new Error(`Expected 351 concrete kind elements, got ${kinds.length}`);
  }
  if (schema.kinds.markers.length !== 34) {
    throw new Error(`Expected 34 kind markers, got ${schema.kinds.markers.length}`);
  }
  if (nodes.length !== 192) {
    throw new Error(`Expected 192 node definitions, got ${nodes.length}`);
  }
  if (Object.keys(schema.bases).length !== 35) {
    throw new Error(`Expected 35 base definitions, got ${Object.keys(schema.bases).length}`);
  }
  if (Object.keys(schema.nodes.aliases).length !== 71) {
    throw new Error(`Expected 71 node aliases, got ${Object.keys(schema.nodes.aliases).length}`);
  }
  if (Object.keys(schema.nodes.listAliases ?? {}).length !== 23) {
    throw new Error(`Expected 23 list aliases, got ${Object.keys(schema.nodes.listAliases ?? {}).length}`);
  }

  const kindByName = new Map(kinds.map(kind => [kind.name, kind.value]));
  const requiredKinds = new Map<string, number>([
    ["EndOfFile", 1],
    ["Identifier", 79],
    ["TypeReference", 184],
    ["ReturnStatement", 254],
    ["FunctionDeclaration", 263],
    ["SourceFile", 307],
  ]);

  for (const [name, expected] of requiredKinds) {
    const actual = kindByName.get(name);
    if (actual !== expected) {
      throw new Error(`Kind.${name} expected ${expected}, got ${actual}`);
    }
  }

  if (kindByName.has("EndOfFileToken")) {
    throw new Error("TS-Go schema must use EndOfFile, not TS 6 EndOfFileToken");
  }
  if (kindByName.has("ShebangTrivia")) {
    throw new Error("TS-Go schema must not expose ShebangTrivia as a normal kind");
  }

  await compareUpstreamIfAvailable(version);
  console.log(`Schema check passed for TS-Go commit ${version.upstreamCommit}.`);
}

await main();
