export function buildSemanticUnitEligibility(snapshot) {
  const required = exactPathSet(snapshot?.semantic?.requiredFiles, "snapshot.semantic.requiredFiles");
  const excluded = exactPathSet(snapshot?.semantic?.excludedFiles, "snapshot.semantic.excludedFiles");
  for (const path of required) {
    if (excluded.has(path)) throw new Error(`semantic source file '${path}' is both required and excluded`);
  }
  for (const file of snapshot?.files ?? []) {
    if (required.has(file.path) === excluded.has(file.path)) {
      throw new Error(`semantic source file '${file.path}' must be classified exactly once as required or excluded`);
    }
  }
  return {
    includes(file) {
      return required.has(file.path);
    },
    policyFor(file, configuredPolicy) {
      if (required.has(file.path)) return configuredPolicy;
      if (!excluded.has(file.path)) throw new Error(`semantic source file '${file.path}' has no exact disposition`);
      return {
        active: false,
        category: "semantic-excluded",
        reason: "The pinned Go toolchain excludes this source file from every audited semantic profile.",
      };
    },
  };
}

function exactPathSet(value, label) {
  if (!Array.isArray(value) || value.some((path) => typeof path !== "string" || path === "")) {
    throw new Error(`${label} must be an array of non-empty source paths`);
  }
  if (new Set(value).size !== value.length) throw new Error(`${label} must not contain duplicates`);
  return new Set(value);
}
