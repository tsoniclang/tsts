import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const toolDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(toolDir, "..", "..");
const packageJsonPath = join(packageRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

const failures = [];

function fail(message) {
  failures.push(message);
}

function collectExportTargets(value, path = "exports") {
  if (typeof value === "string") {
    return [{ path, target: value }];
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }
  return Object.entries(value).flatMap(([key, nested]) => {
    const childPath = key.startsWith(".") ? `${path}[${JSON.stringify(key)}]` : `${path}.${key}`;
    return collectExportTargets(nested, childPath);
  });
}

function packagePath(target) {
  return join(packageRoot, target.replace(/^\.\//, ""));
}

const publicTargets = [
  { path: "main", target: packageJson.main },
  { path: "types", target: packageJson.types },
  ...collectExportTargets(packageJson.exports),
  ...Object.entries(packageJson.bin ?? {}).map(([name, target]) => ({ path: `bin.${name}`, target })),
].filter((entry) => typeof entry.target === "string");

for (const entry of publicTargets) {
  if (entry.target.startsWith("./src/") || entry.target.startsWith("src/")) {
    fail(`${entry.path} points at source instead of dist: ${entry.target}`);
  }
  if (entry.target.startsWith("./") && !existsSync(packagePath(entry.target))) {
    fail(`${entry.path} target does not exist: ${entry.target}`);
  }
}

if (!existsSync(join(packageRoot, "dist", "src", "index.js"))) {
  fail("missing built JS entry: dist/src/index.js");
}
if (!existsSync(join(packageRoot, "dist", "src", "index.d.ts"))) {
  fail("missing built type entry: dist/src/index.d.ts");
}
if (!existsSync(join(packageRoot, "dist", "src", "cli", "index.js"))) {
  fail("missing built CLI entry: dist/src/cli/index.js");
}

const npmCommand = process.env.npm_execpath ? process.execPath : "npm";
const npmArgs = process.env.npm_execpath
  ? [process.env.npm_execpath, "pack", "--dry-run", "--json", "--ignore-scripts"]
  : ["pack", "--dry-run", "--json", "--ignore-scripts"];
const pack = spawnSync(npmCommand, npmArgs, {
  cwd: packageRoot,
  encoding: "utf8",
});

if (pack.status !== 0 || pack.signal !== null) {
  fail(`npm pack --dry-run failed${pack.signal === null ? "" : ` with ${pack.signal}`}:\n${pack.stderr || pack.stdout}`);
} else {
  const output = JSON.parse(pack.stdout);
  const files = output[0]?.files?.map((file) => file.path) ?? [];
  for (const file of files) {
    if (file.startsWith("src/") || file === "tsonic.package.json" || file === "tsonic.json") {
      fail(`package includes source-only artifact: ${file}`);
    }
  }
  for (const requiredFile of ["dist/src/index.js", "dist/src/index.d.ts", "dist/src/cli/index.js", "package.json"]) {
    if (!files.includes(requiredFile)) {
      fail(`package dry-run is missing required file: ${requiredFile}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Built package contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Built package contract OK for ${relative(process.cwd(), packageRoot) || "."}`);
