import { isSemanticPrimaryFile } from "./snapshot-validation.mjs";

export function buildSemanticUnitEligibility(snapshot) {
  const required = exactPathSet(snapshot?.semantic?.requiredFiles, "snapshot.semantic.requiredFiles");
  const excluded = exactPathSet(snapshot?.semantic?.excludedFiles, "snapshot.semantic.excludedFiles");
  for (const path of required) {
    if (excluded.has(path)) throw new Error(`semantic source file '${path}' is both required and excluded`);
  }
  for (const file of snapshot?.files ?? []) {
    const memberships = Number(required.has(file.path)) + Number(excluded.has(file.path));
    if (isSemanticPrimaryFile(file) && memberships !== 1) {
      throw new Error(`primary semantic source file '${file.path}' must be classified exactly once as required or excluded`);
    }
    if (!isSemanticPrimaryFile(file) && required.has(file.path)) {
      throw new Error(`snapshot.semantic.requiredFiles includes non-primary file '${file.path}'`);
    }
  }
  return {
    includes(file) {
      return required.has(file.path);
    },
    policyFor(file, configuredPolicy) {
      if (required.has(file.path)) return configuredPolicy;
      if (excluded.has(file.path)) {
        return {
          active: false,
          category: "semantic-excluded",
          reason: "The pinned Go toolchain excludes this source file from every audited semantic profile.",
        };
      }
      if (isSemanticPrimaryFile(file)) throw new Error(`primary semantic source file '${file.path}' has no exact disposition`);
      return {
        active: false,
        category: "semantic-declarationless",
        reason: "The source file contains no declaration kind in Porter's exact signature scope.",
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
