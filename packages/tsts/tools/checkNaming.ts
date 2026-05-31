import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");

const CHECK_ROOTS = [
  join(PROJECT_ROOT, "src"),
  TOOL_DIR,
];

const FILE_NAME_PATTERN = /^[a-z][A-Za-z0-9]*(\.[a-z][A-Za-z0-9]*)*\.ts$/;

function walk(dir: string): readonly string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full));
    } else if (full.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

function isIgnored(file: string): boolean {
  const relativePath = relative(PROJECT_ROOT, file).replace(/\\/g, "/");
  return relativePath.startsWith("src/bundled/libs/") && relativePath.endsWith(".d.ts");
}

function main(): void {
  const violations = CHECK_ROOTS
    .flatMap((root) => walk(root))
    .filter((file) => !isIgnored(file))
    .filter((file) => !FILE_NAME_PATTERN.test(file.split(/[\\/]/).at(-1) ?? ""))
    .map((file) => relative(REPO_ROOT, file).replace(/\\/g, "/"));

  if (violations.length > 0) {
    console.error("TSTS file naming violations:");
    for (const violation of violations) console.error(`  ${violation}`);
    process.exit(1);
  }

  console.log("TSTS file naming conventions: ok");
}

main();
