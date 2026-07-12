import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const porterRoot = path.dirname(fileURLToPath(import.meta.url));
const testFiles = ["test", "ts-extractor"]
  .flatMap((directory) => collectTestFiles(path.join(porterRoot, directory)))
  .sort();

for (const file of testFiles) await import(pathToFileURL(file).href);

function collectTestFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectTestFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".test.mjs")) files.push(absolute);
  }
  return files;
}
