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
  return Object.freeze({
    canonicalSet,
    rootFiles: Object.freeze([
      ...canonicalSources.filter((path) => !path.startsWith(canonicalRuntimePrefix)),
      targetRunnerPath,
    ].sort()),
    expectedArtifacts: Object.freeze([...canonicalSources, targetRunnerPath].sort()),
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
