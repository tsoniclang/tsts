import { safeIdentifier } from "../names.mjs";
import { assertSourceModuleId } from "../../ts-extractor/source-structure.mjs";

export function requireDirectProviderIdentity(value, root, label, role) {
  if (typeof value !== "string") throw new Error(`${label} must be one exact direct TypeScript ${role} identity`);
  const separator = value.lastIndexOf("::");
  if (separator <= 0 || separator === value.length - 2) {
    throw new Error(`${label} must be one exact direct TypeScript ${role} identity`);
  }
  const moduleId = value.slice(0, separator);
  const exportName = value.slice(separator + 2);
  const canonicalRoot = requireCanonicalRoot(root, label);
  try {
    assertSourceModuleId(moduleId);
  } catch {
    throw new Error(`${label} module must be one canonical .ts file under '${canonicalRoot}'`);
  }
  if (!moduleId.startsWith(`${canonicalRoot}/`)) {
    throw new Error(`${label} module must be one canonical .ts file under '${canonicalRoot}'`);
  }
  if (safeIdentifier(exportName) !== exportName) {
    throw new Error(`${label} ${role} export must be one exact TypeScript identifier`);
  }
  return Object.freeze({ exportName, identity: value, moduleId });
}

function requireCanonicalRoot(value, label) {
  if (typeof value !== "string" || value === "" || value.startsWith("/") || value.startsWith("./") ||
      value.includes("\\") || value.includes("\0") || value.includes("::") || value.includes("?") || value.includes("#")) {
    throw new Error(`${label} root must be one canonical TypeScript source directory`);
  }
  const root = value.replace(/\/+$/, "");
  if (root === "" || root.split("/").some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`${label} root must be one canonical TypeScript source directory`);
  }
  return root;
}
