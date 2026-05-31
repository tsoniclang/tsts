import { computeTypingsInfo, type TypingsInfo } from "./ata.js";
import { validatePackageName } from "./validatepackagename.js";

export interface TypingsDiscoveryInput {
  readonly projectRootPath: string;
  readonly imports: readonly string[];
  readonly dependencies?: ReadonlyMap<string, string>;
  readonly devDependencies?: ReadonlyMap<string, string>;
  readonly compilerOptions?: object;
}

export function discoverTypings(input: TypingsDiscoveryInput): TypingsInfo {
  const unresolved: string[] = [];
  for (const moduleName of input.imports) {
    if (moduleName.startsWith(".") || moduleName.startsWith("/")) continue;
    const packageName = packageNameFromModule(moduleName);
    if (!validatePackageName(packageName).valid) continue;
    if (input.dependencies?.has(packageName) === true || input.devDependencies?.has(packageName) === true) continue;
    unresolved.push(packageName);
  }
  return computeTypingsInfo(input.projectRootPath, unresolved, input.compilerOptions);
}

export function packageNameFromModule(moduleName: string): string {
  if (!moduleName.startsWith("@")) return moduleName.split("/")[0] ?? moduleName;
  const parts = moduleName.split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : moduleName;
}
