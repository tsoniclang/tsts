import { requireDirectProviderIdentity } from "./provider-identity.mjs";

export function directUnitStorageIdentity(config, tsUnit, objectId) {
  if (tsUnit === null || typeof tsUnit !== "object" || Array.isArray(tsUnit)) {
    throw new Error(`Go type '${objectId}' has no direct TypeScript declaration owner`);
  }
  const identity = `${tsUnit.path ?? ""}::${tsUnit.declarationName ?? ""}`;
  return requireDirectProviderIdentity(
    identity,
    config.tsRoot,
    `Go type '${objectId}' storage`,
    "storage",
  ).identity;
}
