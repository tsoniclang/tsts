import { authoredFacadeModuleSet } from "../external-facades.mjs";

export function authoredFacadePathSet(config) {
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  return new Set([...authoredFacadeModuleSet(config)].map((entry) => `${sourceRootPrefix}/${entry}`));
}
