import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, normalize } from "node:path";

export interface NodeRunResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

export const loaderScript = `import script from "./script.mjs";
process.stdout.write(JSON.stringify(await script(...process.argv.slice(2))));`;

export function runNode(args: readonly string[], cwd?: string): NodeRunResult {
  const result = spawnSync(process.execPath, [...args], {
    cwd,
    encoding: "utf8",
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

export function getNodeExe(): string {
  return process.execPath;
}

export function skipIfNoNodeJS(): void {
  if (getNodeExe() === "") throw new Error("Node.js not found");
}

export function evalNodeScript<T>(script: string, dir = "", args: readonly string[] = []): T {
  return evalNodeScriptWithLoader<T>(script, loaderScript, dir, args);
}

export function evalNodeScriptWithTS<T>(script: string, dir = "", args: readonly string[] = []): T {
  const tsSrc = toFileUrl(normalize(join(process.cwd(), "node_modules/typescript/lib/typescript.js")));
  const tsLoaderScript = `import script from "./script.mjs";
import * as ts from "${tsSrc}";
process.stdout.write(JSON.stringify(await script(ts, ...process.argv.slice(2))));`;
  return evalNodeScriptWithLoader<T>(script, tsLoaderScript, dir, args);
}

export function evalNodeScriptWithLoader<T>(
  script: string,
  loader: string,
  dir = "",
  args: readonly string[] = [],
): T {
  const workingDirectory = dir === "" ? mkdtempSync(join(tmpdir(), "tsts-node-")) : dir;
  const scriptPath = join(workingDirectory, "script.mjs");
  const loaderPath = join(workingDirectory, "loader.mjs");
  writeFileSync(scriptPath, script);
  writeFileSync(loaderPath, loader);
  const result = runNode([loaderPath, ...args], workingDirectory);
  if (result.status !== 0) {
    throw new Error(`failed to run node: ${result.stderr}${result.stdout}`);
  }
  try {
    return JSON.parse(result.stdout) as T;
  } catch (error) {
    throw new Error(`failed to unmarshal JSON output: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function toFileUrl(path: string): string {
  const normalized = path.replaceAll("\\", "/");
  return normalized.startsWith("/") ? `file://${normalized}` : `file:///${normalized}`;
}
