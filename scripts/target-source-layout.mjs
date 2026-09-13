import { compareCodeUnits } from "./canonical-order.mjs";
import { componentByKey } from "./toolchain-registry.mjs";

const canonicalRuntimePrefix = "runtime/";
const installedRuntimePrefix = "node_modules/@gotots/runtime/";

export const targetRunnerPath = "runner.ts";

export function createTargetSourceLayout(canonicalSources) {
  const canonicalSet = new Set(canonicalSources);
  if (canonicalSet.size !== canonicalSources.length) {
    throw new Error("Canonical TypeScript source paths are duplicated");
  }
  if (canonicalSet.has(targetRunnerPath)) {
    throw new Error(`Canonical output collides with product runner '${targetRunnerPath}'`);
  }
  if (canonicalSources.some(path => path.startsWith(installedRuntimePrefix))) {
    throw new Error("Canonical output cannot contain an installed runtime alias");
  }
  return Object.freeze({
    canonicalSet,
    rootFiles: Object.freeze([
      ...canonicalSources.map(path => path.startsWith(canonicalRuntimePrefix)
        ? `${installedRuntimePrefix}${path.slice(canonicalRuntimePrefix.length)}`
        : path),
      targetRunnerPath,
    ].sort(compareCodeUnits)),
    expectedArtifacts: Object.freeze(
      [...canonicalSources, targetRunnerPath].sort(compareCodeUnits),
    ),
  });
}

export function canonicalTargetSourcePath(path, canonicalSources) {
  if (!path.startsWith(installedRuntimePrefix)) {
    return path;
  }
  const canonicalPath = `${canonicalRuntimePrefix}${path.slice(installedRuntimePrefix.length)}`;
  if (!canonicalSources.has(canonicalPath)) {
    throw new Error(
      `Installed Go runtime source '${path}' has no canonical artifact '${canonicalPath}'`,
    );
  }
  return canonicalPath;
}

export function withProviderDeclarationArtifacts(layout, artifacts, packages) {
  const allowed = new Set();
  const prefixes = [];
  for (const key of ["gostdlib", "externals"]) {
    const prefix = `${componentByKey.get(key).target}/`;
    prefixes.push(prefix);
    for (const path of packages[key].files) {
      if (path.endsWith(".d.ts")) allowed.add(`${prefix}${path}`);
    }
  }
  const selected = [];
  const seen = new Set();
  for (const artifact of artifacts) {
    if (!prefixes.some(prefix => artifact.path.startsWith(prefix))) continue;
    if (artifact.kind !== "source" || !allowed.has(artifact.path)) {
      throw new Error(`Provider artifact '${artifact.path}' has no exact selected declaration`);
    }
    if (seen.has(artifact.path)) {
      throw new Error(`Provider declaration artifact '${artifact.path}' is duplicated`);
    }
    seen.add(artifact.path);
    selected.push(artifact.path);
  }
  return Object.freeze({
    ...layout,
    expectedArtifacts: Object.freeze([...layout.expectedArtifacts, ...selected].sort(compareCodeUnits)),
  });
}
