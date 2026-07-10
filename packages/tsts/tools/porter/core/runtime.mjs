import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export const repoRoot = findRepoRoot(process.cwd());
export const configPath = path.join(repoRoot, "packages/tsts/porter.config.json");

export function loadConfig() {
  if (!existsSync(configPath)) {
    fail(`missing config: ${path.relative(repoRoot, configPath)}`);
  }
  return JSON.parse(readFileSync(configPath, "utf8"));
}

export function parseArgs(args) {
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      fail(`unexpected positional argument: ${arg}`);
    }
    const key = arg.slice(2);
    const next = args[index + 1];
    if (next === undefined || next.startsWith("--")) {
      options[key] = true;
    } else {
      options[key] = next;
      index++;
    }
  }
  return options;
}

export function walk(root) {
  if (!existsSync(root)) return [];
  const out = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist") continue;
        stack.push(full);
      } else if (entry.isFile()) {
        out.push(full);
      }
    }
  }
  out.sort();
  return out;
}

export function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

export function countsByModule(rows) {
  const counts = new Map();
  for (const row of rows) {
    increment(counts, moduleNameFor(row.goPath));
  }
  return Object.fromEntries([...counts.entries()].sort());
}

export function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}

export function moduleNameFor(goPath) {
  const parts = goPath.split("/");
  if (parts[0] === "internal" && parts.length > 1) return `internal/${parts[1]}`;
  if (parts[0] === "cmd" && parts.length > 1) return `cmd/${parts[1]}`;
  return parts[0] || ".";
}

export function writeJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeText(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, value);
}

export function writeJsonSafely(file, value, options = {}) {
  return writeTextSafely(file, `${JSON.stringify(value, null, 2)}\n`, options);
}

export function writeTextSafely(file, value, options = {}) {
  if (existsSync(file)) {
    const current = readFileSync(file, "utf8");
    if (current === value) return "unchanged";
    if (options.force !== true) {
      const relative = path.relative(repoRoot, file);
      const label = options.label ?? "file";
      throw new Error(`refusing to overwrite existing ${label}: ${relative}. Re-run with --force after reviewing the diff.`);
    }
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, value);
  return "written";
}

export function resolveRepo(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

export function findRepoRoot(start) {
  let current = path.resolve(start);
  while (true) {
    if (existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) fail("could not find repo root");
    current = parent;
  }
}

export function assertDirectory(directory, label) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    fail(`${label} is not a directory: ${directory}`);
  }
}

export function escapeMd(value) {
  return String(value).replaceAll("|", "\\|");
}

export function fail(message) {
  console.error(message);
  process.exit(1);
}
