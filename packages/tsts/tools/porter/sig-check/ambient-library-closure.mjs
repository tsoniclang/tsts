import { posix } from "node:path";

import { compareText } from "../core/deterministic-order.mjs";
import { hashText } from "../core/runtime.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";

export function deriveAmbientLibraryClosure(api, { readSource, rootDirectory, rootFiles }) {
  requireNormalizedDirectory(rootDirectory, "ambient library rootDirectory");
  if (!Array.isArray(rootFiles) || rootFiles.length === 0) {
    throw new Error("ambient library rootFiles must contain at least one declaration-library root");
  }
  if (new Set(rootFiles).size !== rootFiles.length) throw new Error("ambient library rootFiles contains duplicates");
  if (typeof readSource !== "function") throw new Error("ambient library readSource must be a function");
  const roots = rootFiles.map((file, index) => resolveRootFile(rootDirectory, file, `ambient library rootFiles[${index}]`));
  const pending = [...roots].sort(compareText);
  const queued = new Set(pending);
  const sources = new Map();
  while (pending.length > 0) {
    const file = pending.shift();
    let text;
    try {
      text = readSource(file);
    } catch (error) {
      throw new Error(`cannot read ambient declaration source '${file}': ${error instanceof Error ? error.message : String(error)}`);
    }
    if (typeof text !== "string") throw new Error(`ambient declaration source '${file}' did not produce text`);
    sources.set(file, text);
    const sourceFile = parseTypeScriptModule(api, file, text).sourceFile;
    if ((sourceFile.TypeReferenceDirectives ?? []).length > 0) {
      throw new Error(`ambient declaration source '${file}' uses package type-reference directives outside the closed library contract`);
    }
    const dependencies = [
      ...(sourceFile.LibReferenceDirectives ?? []).map((reference) => resolveLibReference(rootDirectory, reference, file)),
      ...(sourceFile.ReferencedFiles ?? []).map((reference) => resolvePathReference(rootDirectory, file, reference)),
    ];
    for (const dependency of dependencies.sort(compareText)) {
      if (queued.has(dependency)) continue;
      queued.add(dependency);
      pending.push(dependency);
      pending.sort(compareText);
    }
  }
  const sourceRows = [...sources]
    .map(([file, text]) => ({ file, hash: hashText(text) }))
    .sort((left, right) => compareText(left.file, right.file));
  return {
    rootFiles: [...roots].sort(compareText),
    sourceFiles: sourceRows.map((row) => row.file),
    sources: new Map([...sources].sort(([left], [right]) => compareText(left, right))),
    sourceSetHash: hashText(canonicalSchemaValue(sourceRows)),
  };
}

function resolveRootFile(rootDirectory, value, label) {
  if (typeof value !== "string" || value === "" || value.includes("/") || value.includes("\\") || !value.endsWith(".d.ts")) {
    throw new Error(`${label} must be one declaration filename below '${rootDirectory}'`);
  }
  return requireWithinRoot(rootDirectory, posix.join(rootDirectory, value), label);
}

function resolveLibReference(rootDirectory, reference, owner) {
  const name = reference?.FileName;
  if (typeof name !== "string" || name === "" || !/^[A-Za-z0-9._-]+$/.test(name)) {
    throw new Error(`ambient declaration source '${owner}' has an invalid lib reference`);
  }
  return requireWithinRoot(rootDirectory, posix.join(rootDirectory, `lib.${name}.d.ts`), `lib reference '${name}' in '${owner}'`);
}

function resolvePathReference(rootDirectory, owner, reference) {
  const name = reference?.FileName;
  if (typeof name !== "string" || name === "" || name.includes("\\")) {
    throw new Error(`ambient declaration source '${owner}' has an invalid path reference`);
  }
  const resolved = posix.normalize(posix.join(posix.dirname(owner), name));
  if (!resolved.endsWith(".d.ts")) throw new Error(`path reference '${name}' in '${owner}' is not a declaration file`);
  return requireWithinRoot(rootDirectory, resolved, `path reference '${name}' in '${owner}'`);
}

function requireWithinRoot(rootDirectory, value, label) {
  const normalized = posix.normalize(value);
  if (normalized === rootDirectory || !normalized.startsWith(`${rootDirectory}/`)) {
    throw new Error(`${label} escapes ambient library root '${rootDirectory}'`);
  }
  return normalized;
}

function requireNormalizedDirectory(value, label) {
  if (typeof value !== "string" || value === "" || value.startsWith("/") || value.includes("\\") || value.endsWith("/") ||
      value.split("/").some((segment) => segment === "" || segment === "." || segment === "..") || posix.normalize(value) !== value) {
    throw new Error(`${label} must be one normalized repository-relative directory`);
  }
}
