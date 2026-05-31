import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
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

const UPSTREAM_FILES: Record<string, string> = {
  "ast.json": "_scripts/ast.json",
  "ast.schema.json": "_scripts/ast.schema.json",
  "protocol.ts": "_packages/native-preview/src/api/node/protocol.ts",
  "nodeflags.go": "internal/ast/nodeflags.go",
  "symbolflags.go": "internal/ast/symbolflags.go",
};

function resolveUpstreamRepo(): string {
  return process.env.TSGO_REPO ?? join(homedir(), "repos/microsoft/typescript-go");
}

function commitExists(upstream: string, commit: string): boolean {
  const result = spawnSync("git", ["-C", upstream, "cat-file", "-e", `${commit}^{commit}`], { stdio: "ignore" });
  return result.status === 0;
}

// Read a file's bytes as recorded at a specific commit (not the working tree),
// so the comparison proves the recorded snapshot regardless of the checkout.
function readBlobAtCommit(upstream: string, commit: string, relativePath: string): Buffer | undefined {
  const result = spawnSync("git", ["-C", upstream, "show", `${commit}:${relativePath}`], { maxBuffer: 128 * 1024 * 1024 });
  if (result.status !== 0) {
    return undefined;
  }
  return result.stdout;
}

function sha256Buffer(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function compareUpstreamIfAvailable(version: VersionInfo): Promise<void> {
  const upstream = resolveUpstreamRepo();
  const commit = version.upstreamCommit;

  if (!existsSync(upstream)) {
    console.log(`No TS-Go upstream repo at ${upstream} (set TSGO_REPO to override): checksum-only schema validation completed.`);
    return;
  }
  if (!existsSync(join(upstream, ".git"))) {
    console.log(`TS-Go upstream path ${upstream} is not a git repository: checksum-only schema validation completed.`);
    return;
  }
  if (!commitExists(upstream, commit)) {
    console.log(`TS-Go upstream repo found at ${upstream} but recorded commit ${commit} is absent locally: checksum-only validation, upstream comparison skipped.`);
    return;
  }

  for (const [localName, upstreamRelative] of Object.entries(UPSTREAM_FILES)) {
    const localHash = await sha256(`schema/tsgo/${localName}`);
    const blob = readBlobAtCommit(upstream, commit, upstreamRelative);
    if (blob === undefined) {
      throw new Error(`Upstream file ${upstreamRelative} does not exist at commit ${commit} in ${upstream}.`);
    }
    const upstreamHash = sha256Buffer(blob);
    if (localHash !== upstreamHash) {
      throw new Error(`${localName} differs from ${upstreamRelative}@${commit}: local ${localHash}, upstream ${upstreamHash}`);
    }
  }

  console.log(`Validated local schema checksums against TS-Go ${upstream} at commit ${commit}.`);
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
