import { spawnSync } from "node:child_process";
import { lstat, readdir, realpath } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits } from "./canonical-order.mjs";
import { parseJsonSequence } from "./json-sequence.mjs";
import {
  copyExactFiles,
  digestExactFiles,
  validateRelativePath,
} from "./package-artifact.mjs";

const packageQueries = Object.freeze([
  Object.freeze({
    key: "gotots-tools",
    root: "tools/gotots",
    patterns: Object.freeze(["./cmd/gotots", "./cmd/tsgo-ast-printer"]),
  }),
  Object.freeze({
    key: "typescript-go-tool",
    root: "tools/gotots",
    patterns: Object.freeze(["github.com/microsoft/typescript-go/cmd/tsgo"]),
  }),
  Object.freeze({
    key: "typescript-go-product",
    root: "vendor/typescript-go",
    patterns: Object.freeze(["./cmd/tsgo"]),
  }),
]);
const queryKeys = Object.freeze(packageQueries.map((query) => query.key).sort(compareCodeUnits));

export async function stageGoModuleCache({
  repositoryRoot,
  bootstrapRoot,
  targetRoot,
  goExecutable,
  profile,
  bootstrapEnvironment,
  stagedEnvironment,
}) {
  const selectedBootstrap = await realpath(resolve(bootstrapRoot));
  if (!(await lstat(selectedBootstrap)).isDirectory()) {
    throw new Error("The explicit Go module cache is not a directory");
  }
  const selected = await describeClosure({
    repositoryRoot,
    cacheRoot: selectedBootstrap,
    goExecutable,
    profile,
    environment: bootstrapEnvironment,
  });
  await copyExactFiles({
    sourceRoot: selectedBootstrap,
    targetRoot,
    files: selected.files,
    mode: 0o444,
  });
  const staged = await describeClosure({
    repositoryRoot,
    cacheRoot: targetRoot,
    goExecutable,
    profile,
    environment: stagedEnvironment,
  });
  if (!isDeepStrictEqual(staged, selected)) {
    throw new Error("Artifact Go module cache differs from its exact offline selection");
  }
  return staged;
}

export async function verifyOfflineSourceClosure({
  sourceRoot,
  goExecutable,
  profile,
  environment,
  expectedModules,
}) {
  const query = await inspectQuery(
    { key: "sealed-typescript-go", root: sourceRoot, patterns: ["./cmd/tsgo"] },
    sourceRoot,
    goExecutable,
    profile,
    environment,
  );
  const expected = expectedModules
    .filter((module) => module.uses.includes("typescript-go-product"))
    .map((module) => moduleIdentity(module));
  if (!isDeepStrictEqual(query.modules, expected)) {
    throw new Error("Sealed TypeScript-Go source resolves a different module closure");
  }
  if (query.packages.length === 0) {
    throw new Error("Sealed TypeScript-Go source did not exercise an external module package");
  }
  return query;
}

export function validateGoModuleCacheRecord(record) {
  assertRecord(record, "Go module cache");
  assertFields(record, ["digest", "files", "modules", "queries", "root"], "Go module cache");
  validateFileList(record.files, "Go module cache");
  if (!isDigest(record.digest) || !Array.isArray(record.modules) || !Array.isArray(record.queries)) {
    throw new Error("Go module cache identity is invalid");
  }
  const owned = new Set();
  const identities = [];
  for (const module of record.modules) {
    validateModuleRecord(module);
    const identity = `${module.path}@${module.version}`;
    if (identities.includes(identity)) {
      throw new Error(`Go module cache identity '${identity}' is duplicated`);
    }
    identities.push(identity);
    for (const path of [
      ...module.sourceFiles.map((name) => `${module.sourceRoot}/${name}`),
      ...Object.values(module.metadata),
    ]) {
      if (owned.has(path)) {
        throw new Error(`Go module cache member '${path}' has multiple owners`);
      }
      owned.add(path);
    }
  }
  if (!isDeepStrictEqual(identities, [...identities].sort(compareCodeUnits))) {
    throw new Error("Go module cache identities are not sorted");
  }
  if (!isDeepStrictEqual([...owned].sort(compareCodeUnits), record.files)) {
    throw new Error("Go module cache physical ownership is incomplete");
  }
  const selectedQueryKeys = [];
  for (const query of record.queries) {
    assertRecord(query, "Go module cache query");
    assertFields(query, ["key", "modules", "packages"], "Go module cache query");
    if (typeof query.key !== "string" || query.key.length === 0) {
      throw new Error("Go module cache query key is invalid");
    }
    validateStringList(query.modules, `Go module cache query '${query.key}' modules`, true);
    validateStringList(query.packages, `Go module cache query '${query.key}' packages`, true);
    if (query.modules.some((identity) => !identities.includes(identity))) {
      throw new Error(`Go module cache query '${query.key}' selects an unknown module`);
    }
    const expectedModules = record.modules
      .filter((module) => module.uses.includes(query.key))
      .map(moduleIdentity);
    const expectedPackages = uniqueSorted(
      record.modules
        .filter((module) => module.uses.includes(query.key))
        .flatMap((module) => module.packages),
      `Go module cache query '${query.key}' packages`,
    );
    if (
      !isDeepStrictEqual(query.modules, expectedModules) ||
      !isDeepStrictEqual(query.packages, expectedPackages)
    ) {
      throw new Error(`Go module cache query '${query.key}' does not exact-join its modules`);
    }
    selectedQueryKeys.push(query.key);
  }
  if (!isDeepStrictEqual(selectedQueryKeys, queryKeys)) {
    throw new Error("Go module cache query selection is incomplete or unsorted");
  }
}

async function describeClosure({
  repositoryRoot,
  cacheRoot,
  goExecutable,
  profile,
  environment,
}) {
  const byIdentity = new Map();
  const queries = [];
  for (const query of packageQueries) {
    const selected = await inspectQuery(
      query,
      join(repositoryRoot, query.root),
      goExecutable,
      profile,
      environment,
    );
    queries.push(selected);
    for (const raw of selected.rawModules) {
      const identity = `${raw.Path}@${raw.Version}`;
      const existing = byIdentity.get(identity);
      if (existing !== undefined && !sameModuleIdentity(existing, raw)) {
        throw new Error(`Go module '${identity}' has conflicting selected metadata`);
      }
      const merged = existing ?? { ...raw, packages: new Set(), uses: new Set() };
      selected.packagesByModule.get(identity).forEach((path) => merged.packages.add(path));
      merged.uses.add(query.key);
      byIdentity.set(identity, merged);
    }
  }
  const modules = [];
  for (const identity of [...byIdentity.keys()].sort(compareCodeUnits)) {
    modules.push(await describeModule(
      byIdentity.get(identity),
      cacheRoot,
      goExecutable,
      environment,
      join(repositoryRoot, packageQueries[0].root),
    ));
  }
  const files = uniqueSorted(modules.flatMap((module) => [
    ...module.sourceFiles.map((path) => `${module.sourceRoot}/${path}`),
    ...Object.values(module.metadata),
  ]), "Go module cache members");
  const record = Object.freeze({
    root: "go-module-cache/pkg/mod",
    queries: Object.freeze(queries.map(({ key, modules: selected, packages }) =>
      Object.freeze({ key, modules: selected, packages })
    ).sort((left, right) => compareCodeUnits(left.key, right.key))),
    modules: Object.freeze(modules),
    files: Object.freeze(files),
    digest: await digestExactFiles(cacheRoot, files),
  });
  validateGoModuleCacheRecord(record);
  return record;
}

async function inspectQuery(query, root, goExecutable, profile, environment) {
  const output = run(
    goExecutable,
    [
      "list", "-deps", ...tagArguments(profile), "-json", ...query.patterns,
    ],
    root,
    environment,
    `select ${query.key} Go package closure`,
  );
  const modules = new Map();
  const packagesByModule = new Map();
  const packages = [];
  for (const selected of parseJsonSequence(output, `Go package closure '${query.key}'`)) {
    if (!isRecord(selected.Module) || selected.Module.Main === true) continue;
    if (typeof selected.ImportPath !== "string" || selected.ImportPath.length === 0) {
      throw new Error(`Go package closure '${query.key}' returned an invalid import path`);
    }
    const importPath = selected.ImportPath;
    const module = parseSelectedModule(selected.Module, query.key);
    const identity = `${module.Path}@${module.Version}`;
    const existing = modules.get(identity);
    if (existing !== undefined && !sameModuleIdentity(existing, module)) {
      throw new Error(`Go module '${identity}' collides within '${query.key}'`);
    }
    modules.set(identity, module);
    const selectedPackages = packagesByModule.get(identity) ?? new Set();
    selectedPackages.add(importPath);
    packagesByModule.set(identity, selectedPackages);
    packages.push(importPath);
  }
  const identities = [...modules.keys()].sort(compareCodeUnits);
  return {
    key: query.key,
    modules: Object.freeze(identities),
    packages: Object.freeze(uniqueSorted(packages, `${query.key} external packages`)),
    rawModules: identities.map((identity) => modules.get(identity)),
    packagesByModule,
  };
}

async function describeModule(selected, cacheRoot, goExecutable, environment, cwd) {
  const downloaded = JSON.parse(run(
    goExecutable,
    ["mod", "download", "-json", `${selected.Path}@${selected.Version}`],
    cwd,
    environment,
    `inspect Go module ${selected.Path}@${selected.Version}`,
  ));
  if (
    downloaded.Error !== undefined || downloaded.Path !== selected.Path ||
    downloaded.Version !== selected.Version || downloaded.Sum !== selected.Sum ||
    downloaded.GoModSum !== selected.GoModSum
  ) {
    throw new Error(`Downloaded Go module '${selected.Path}@${selected.Version}' differs from selection`);
  }
  const sourceRoot = containedCachePath(cacheRoot, downloaded.Dir, "module source");
  const metadata = Object.freeze({
    info: containedCachePath(cacheRoot, downloaded.Info, "module info"),
    mod: containedCachePath(cacheRoot, downloaded.GoMod, "module go.mod"),
    zip: containedCachePath(cacheRoot, downloaded.Zip, "module zip"),
    zipHash: containedCachePath(cacheRoot, `${downloaded.Zip}hash`, "module zip hash"),
  });
  const sourceFiles = await listRegularFiles(downloaded.Dir, selected.Path);
  for (const path of Object.values(metadata)) {
    const info = await lstat(join(cacheRoot, path));
    if (!info.isFile() || info.nlink !== 1) {
      throw new Error(`Go module metadata '${path}' is not an unaliased regular file`);
    }
  }
  const files = [
    ...sourceFiles.map((path) => `${sourceRoot}/${path}`),
    ...Object.values(metadata),
  ].sort(compareCodeUnits);
  return Object.freeze({
    path: selected.Path,
    version: selected.Version,
    sum: selected.Sum,
    goModSum: selected.GoModSum,
    sourceRoot,
    sourceFiles: Object.freeze(sourceFiles),
    metadata,
    packages: Object.freeze([...selected.packages].sort(compareCodeUnits)),
    uses: Object.freeze([...selected.uses].sort(compareCodeUnits)),
    digest: await digestExactFiles(cacheRoot, files),
  });
}

function parseSelectedModule(value, query) {
  assertRecord(value, `Go module selected by '${query}'`);
  if (
    value.Main === true || value.Replace !== undefined ||
    typeof value.Path !== "string" || value.Path.length === 0 ||
    typeof value.Version !== "string" || value.Version.length === 0 ||
    typeof value.Dir !== "string" || typeof value.GoMod !== "string" ||
    !isSum(value.Sum) || !isSum(value.GoModSum)
  ) {
    throw new Error(`Go module selected by '${query}' has incomplete exact metadata`);
  }
  return Object.freeze({
    Path: value.Path,
    Version: value.Version,
    Dir: value.Dir,
    GoMod: value.GoMod,
    Sum: value.Sum,
    GoModSum: value.GoModSum,
  });
}

function validateModuleRecord(module) {
  assertRecord(module, "Go module cache module");
  assertFields(
    module,
    ["digest", "goModSum", "metadata", "packages", "path", "sourceFiles", "sourceRoot", "sum", "uses", "version"],
    "Go module cache module",
  );
  if (
    typeof module.path !== "string" || module.path.length === 0 ||
    typeof module.version !== "string" || module.version.length === 0 ||
    !isSum(module.sum) || !isSum(module.goModSum) || !isDigest(module.digest)
  ) {
    throw new Error("Go module cache module identity is invalid");
  }
  validateRelativePath(module.sourceRoot, `Go module '${module.path}' source root`);
  validateFileList(module.sourceFiles, `Go module '${module.path}' source`);
  validateStringList(module.packages, `Go module '${module.path}' packages`, false);
  validateStringList(module.uses, `Go module '${module.path}' uses`, false);
  assertRecord(module.metadata, `Go module '${module.path}' metadata`);
  assertFields(module.metadata, ["info", "mod", "zip", "zipHash"], `Go module '${module.path}' metadata`);
  for (const path of Object.values(module.metadata)) {
    validateRelativePath(path, `Go module '${module.path}' metadata`);
  }
}

async function listRegularFiles(root, subject, directory = "") {
  const files = [];
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  entries.sort((left, right) => compareCodeUnits(left.name, right.name));
  for (const entry of entries) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...await listRegularFiles(root, subject, path));
    } else if (entry.isFile()) {
      if ((await lstat(join(root, path))).nlink !== 1) {
        throw new Error(`Go module '${subject}' member '${path}' is a hard link`);
      }
      files.push(path);
    } else {
      throw new Error(`Go module '${subject}' member '${path}' is not a regular file`);
    }
  }
  return files.sort(compareCodeUnits);
}

function containedCachePath(cacheRoot, path, subject) {
  if (typeof path !== "string" || !isAbsolute(path)) {
    throw new Error(`Go ${subject} path is not absolute`);
  }
  const selected = relative(cacheRoot, path);
  if (selected === ".." || selected.startsWith(`..${sep}`) || isAbsolute(selected)) {
    throw new Error(`Go ${subject} is outside the explicit module cache`);
  }
  return validateRelativePath(selected.split(sep).join("/"), `Go ${subject}`);
}

function sameModuleIdentity(left, right) {
  return ["Path", "Version", "Sum", "GoModSum"].every((key) => left[key] === right[key]);
}

function moduleIdentity(module) {
  return `${module.path}@${module.version}`;
}

function uniqueSorted(values, subject) {
  const selected = [...new Set(values)].sort(compareCodeUnits);
  if (selected.length !== values.length) {
    throw new Error(`${subject} contain duplicate selections`);
  }
  return selected;
}

function validateFileList(files, subject) {
  validateStringList(files, `${subject} files`, false);
  files.forEach((path) => validateRelativePath(path, subject));
}

function validateStringList(values, subject, allowEmpty) {
  if (
    !Array.isArray(values) || (!allowEmpty && values.length === 0) ||
    !values.every((value) => typeof value === "string" && value.length !== 0) ||
    !isDeepStrictEqual(values, [...new Set(values)].sort(compareCodeUnits))
  ) {
    throw new Error(`${subject} are not unique and sorted`);
  }
}

function tagArguments(profile) {
  return profile.tags.length === 0 ? [] : [`-tags=${profile.tags.join(",")}`];
}

function run(command, arguments_, cwd, environment, subject) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    env: environment,
    maxBuffer: 128 * 1024 * 1024,
  });
  if (result.error !== undefined) throw result.error;
  if (result.signal !== null || result.status !== 0) {
    throw new Error(`${subject} failed: status=${String(result.status)} signal=${String(result.signal)}\n${result.stdout}${result.stderr}`);
  }
  return result.stdout;
}

function assertRecord(value, subject) {
  if (!isRecord(value)) {
    throw new Error(`${subject} must be an object`);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertFields(record, expected, subject) {
  if (!isDeepStrictEqual(Object.keys(record).sort(compareCodeUnits), [...expected].sort(compareCodeUnits))) {
    throw new Error(`${subject} fields are invalid`);
  }
}

function isDigest(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function isSum(value) {
  return typeof value === "string" && /^h1:[A-Za-z0-9+/]{43}=$/u.test(value);
}
