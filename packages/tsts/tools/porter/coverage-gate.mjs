import { execFile } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PORTER_NODE_TEST_DIRECTORIES = Object.freeze(["test", "ts-extractor"]);

const porterRoot = path.dirname(fileURLToPath(import.meta.url));

export function collectTestFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectTestFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".test.mjs")) files.push(absolute);
  }
  return files.sort();
}

export function porterNodeTestFiles(root = porterRoot) {
  return PORTER_NODE_TEST_DIRECTORIES
    .flatMap((directory) => collectTestFiles(path.join(root, directory)))
    .sort();
}

export async function importPorterNodeTests(root = porterRoot) {
  const files = porterNodeTestFiles(root);
  for (const file of files) await import(pathToFileURL(file).href);
  return files;
}

export function goExtractorTestCommand(root = porterRoot) {
  return {
    executable: "go",
    args: ["test", "./..."],
    cwd: path.join(root, "go-extractor"),
  };
}

export function runGoExtractorTests(root = porterRoot, execute = execFile) {
  const command = goExtractorTestCommand(root);
  return new Promise((resolve, reject) => {
    execute(command.executable, command.args, {
      cwd: command.cwd,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
    }, (error, stdout, stderr) => {
      if (error === null) {
        resolve();
        return;
      }
      const output = [stdout, stderr].filter((value) => typeof value === "string" && value.trim() !== "").join("\n");
      reject(new Error(`Go extractor tests failed${output === "" ? "" : `:\n${output.trimEnd()}`}`, { cause: error }));
    });
  });
}
