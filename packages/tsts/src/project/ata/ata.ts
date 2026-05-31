import type { FS } from "../../vfs/index.js";
import { discoverTypings, type TypingsDiscoveryInput } from "./discoverTypings.js";
import { NameValidationResult, renderPackageNameValidationFailure, validatePackageName } from "./validatePackageName.js";

export interface TypingsInfo {
  readonly inferredTypings: readonly string[];
  readonly unresolvedImports: readonly string[];
  readonly projectRootPath: string;
  readonly compilerOptions?: object | undefined;
}

export interface TypingsInstaller {
  readonly installPackage: (packageName: string) => Promise<void> | void;
}

export interface ATAStateChange {
  readonly projectName: string;
  readonly typingsFiles: readonly string[];
  readonly unresolvedImports: readonly string[];
}

export interface NpmExecutor {
  readonly exec: (args: readonly string[], cwd: string) => Promise<string> | string;
}

export interface CachedTyping {
  readonly typingsLocation: string;
  readonly version: string;
}

export interface TypingsInstallerOptions {
  readonly typingsLocation: string;
  readonly throttleLimit?: number;
}

export interface TypingsInstallRequest {
  readonly projectId: string;
  readonly typingsInfo: TypingsInfo;
  readonly fileNames: readonly string[];
  readonly projectRootPath: string;
  readonly currentDirectory: string;
  readonly fs: FS;
  readonly logger?: { readonly log: (message: string) => void };
  readonly discovery?: TypingsDiscoveryInput;
}

export interface TypingsInstallResult {
  readonly typingsFiles: readonly string[];
  readonly filesToWatch: readonly string[];
}

export interface TypesRegistryEntry {
  readonly latest?: string;
  readonly [tag: string]: string | undefined;
}

export interface TypingsInstallerHost {
  readonly npmExecutor: NpmExecutor;
}

const tsVersionToUse = "latest";

export class DefaultTypingsInstaller implements TypingsInstaller {
  private readonly typingsLocation: string;
  private readonly throttleLimit: number;
  private readonly npmExecutor: NpmExecutor;
  private readonly packageNameToTypingLocation = new Map<string, CachedTyping>();
  private readonly missingTypingsSet = new Set<string>();
  private readonly typesRegistry = new Map<string, TypesRegistryEntry>();
  private installRunCount = 0;
  private activeInstalls = 0;
  private readonly waiters: (() => void)[] = [];

  constructor(options: TypingsInstallerOptions, host: TypingsInstallerHost) {
    this.typingsLocation = options.typingsLocation;
    this.throttleLimit = Math.max(1, options.throttleLimit ?? 5);
    this.npmExecutor = host.npmExecutor;
  }

  installPackage(packageName: string): Promise<void> {
    return this.withInstallSlot(async () => {
      await this.npmExecutor.exec(["install", "--ignore-scripts", packageName, "--save-dev"], this.typingsLocation);
    });
  }

  isKnownTypesPackageName(name: string, fs: FS, logger?: { readonly log: (message: string) => void }): boolean {
    const validation = validatePackageName(name);
    if (validation.result !== NameValidationResult.NameOk) return false;
    this.initialize(fs, logger);
    return this.typesRegistry.has(name);
  }

  async installTypings(request: TypingsInstallRequest): Promise<TypingsInstallResult> {
    this.initialize(request.fs, request.logger);
    const defaultDiscovery: TypingsDiscoveryInput = request.typingsInfo.compilerOptions === undefined
      ? {
        projectRootPath: request.projectRootPath,
        imports: request.typingsInfo.unresolvedImports,
        fileNames: request.fileNames,
      }
      : {
        projectRootPath: request.projectRootPath,
        imports: request.typingsInfo.unresolvedImports,
        fileNames: request.fileNames,
        compilerOptions: request.typingsInfo.compilerOptions,
      };
    const discovery = request.discovery ?? defaultDiscovery;
    const discovered = discoverTypings(discovery);
    const cachedTypingPaths: string[] = [];
    const newTypingNames: string[] = [];
    for (const typing of discovered.inferredTypings) {
      const cached = this.packageNameToTypingLocation.get(mangleScopedPackageName(typing));
      if (cached === undefined) newTypingNames.push(typing);
      else cachedTypingPaths.push(cached.typingsLocation);
    }
    const filesToWatch = this.filesToWatchFor(cachedTypingPaths);
    if (newTypingNames.length === 0) {
      request.logger?.log("ATA:: No new typings were requested as a result of typings discovery");
      return { typingsFiles: cachedTypingPaths.sort(), filesToWatch };
    }
    const filteredTypings = this.filterTypings(request.projectId, newTypingNames, request.logger);
    if (filteredTypings.length === 0) {
      request.logger?.log("ATA:: All typings are known to be missing or invalid");
      return { typingsFiles: cachedTypingPaths.sort(), filesToWatch };
    }
    const installed = await this.installTypingPackages(request.projectId, filteredTypings, request.logger);
    return {
      typingsFiles: [...cachedTypingPaths, ...installed].sort(),
      filesToWatch: this.filesToWatchFor([...cachedTypingPaths, ...installed]),
    };
  }

  filterTypings(projectId: string, typingsToInstall: readonly string[], logger?: { readonly log: (message: string) => void }): readonly string[] {
    const result: string[] = [];
    for (const typing of typingsToInstall) {
      const typingKey = mangleScopedPackageName(typing);
      if (this.missingTypingsSet.has(typingKey)) {
        logger?.log(`ATA:: '${typing}':: '${typingKey}' is in missingTypingsSet`);
        continue;
      }
      const validation = validatePackageName(typing);
      if (validation.result !== NameValidationResult.NameOk) {
        this.missingTypingsSet.add(typingKey);
        logger?.log(`ATA:: ${renderPackageNameValidationFailure(typing, validation.result, validation.name, validation.isScopeName)}`);
        continue;
      }
      const registryEntry = this.typesRegistry.get(typingKey);
      if (registryEntry === undefined) {
        logger?.log(`ATA:: '${typing}':: Entry for package '${typingKey}' does not exist in local types registry`);
        continue;
      }
      const cached = this.packageNameToTypingLocation.get(typingKey);
      if (cached !== undefined && isTypingUpToDate(cached, registryEntry)) {
        logger?.log(`ATA:: '${typing}':: '${typingKey}' already has an up-to-date typing`);
        continue;
      }
      result.push(typingKey);
    }
    logger?.log(`ATA:: ${projectId} filtered typings: ${result.join(",")}`);
    return result;
  }

  processCacheLocation(projectId: string, fs: FS, logger?: { readonly log: (message: string) => void }): void {
    logger?.log(`ATA:: Processing cache location ${this.typingsLocation}`);
    const packageJsonPath = combinePaths(this.typingsLocation, "package.json");
    const packageLockPath = combinePaths(this.typingsLocation, "package-lock.json");
    const packageJson = readJsonObject(fs, packageJsonPath);
    const packageLock = readJsonObject(fs, packageLockPath);
    const devDependencies = objectProperty<Record<string, unknown>>(packageJson, "devDependencies") ?? {};
    const lockPackages = objectProperty<Record<string, { readonly version?: string }>>(packageLock, "packages") ?? {};
    const lockDependencies = objectProperty<Record<string, { readonly version?: string }>>(packageLock, "dependencies") ?? {};
    for (const key of Object.keys(devDependencies)) {
      if (!key.startsWith("@types/")) continue;
      const packageName = key.slice("@types/".length);
      const lockValue = lockPackages[`node_modules/${key}`] ?? lockDependencies[key];
      if (lockValue?.version === undefined) continue;
      const typingFile = combinePaths(this.typingsLocation, "node_modules", key, "index.d.ts");
      if (!fs.fileExists(typingFile)) {
        this.missingTypingsSet.add(packageName);
        continue;
      }
      this.packageNameToTypingLocation.set(packageName, { typingsLocation: typingFile, version: lockValue.version });
      logger?.log(`ATA:: Adding entry into typings cache: ${packageName} => ${typingFile}`);
    }
    logger?.log(`ATA:: Finished processing cache location ${this.typingsLocation} for ${projectId}`);
  }

  loadTypesRegistryFile(fs: FS, logger?: { readonly log: (message: string) => void }): void {
    const typesRegistryPath = combinePaths(this.typingsLocation, "node_modules/types-registry/index.json");
    const registry = readJsonObject(fs, typesRegistryPath);
    const entries = objectProperty<Record<string, TypesRegistryEntry>>(registry, "entries")
      ?? objectProperty<Record<string, TypesRegistryEntry>>(registry, "typesMap")
      ?? {};
    this.typesRegistry.clear();
    for (const [packageName, entry] of Object.entries(entries)) this.typesRegistry.set(mangleScopedPackageName(packageName), entry);
    logger?.log(`ATA:: Loaded ${this.typesRegistry.size} entries from types registry`);
  }

  private async installTypingPackages(projectId: string, packageNames: readonly string[], logger?: { readonly log: (message: string) => void }): Promise<readonly string[]> {
    const requestId = ++this.installRunCount;
    const scopedTypings = packageNames.map(packageName => `@types/${packageName}@${tsVersionToUse}`);
    logger?.log(`ATA:: #${requestId} with cwd: ${this.typingsLocation} arguments: ${scopedTypings.join(",")}`);
    try {
      await installNpmPackages(scopedTypings, packages => this.withInstallSlot(async () => {
        await this.npmExecutor.exec(["install", "--ignore-scripts", ...packages, "--save-dev"], this.typingsLocation);
      }));
    } catch {
      for (const packageName of packageNames) this.missingTypingsSet.add(packageName);
      throw new Error(`npm install failed for ${projectId}`);
    }
    const installed: string[] = [];
    for (const packageName of packageNames) {
      const typingFile = combinePaths(this.typingsLocation, "node_modules", "@types", packageName, "index.d.ts");
      const registryEntry = this.typesRegistry.get(packageName);
      const version = registryEntry?.[`ts${tsVersionToUse}`] ?? registryEntry?.latest ?? tsVersionToUse;
      this.packageNameToTypingLocation.set(packageName, { typingsLocation: typingFile, version });
      installed.push(typingFile);
    }
    logger?.log(`ATA:: Installed typing files ${installed.join(",")}`);
    return installed;
  }

  private initialize(fs: FS, logger?: { readonly log: (message: string) => void }): void {
    if (this.typesRegistry.size > 0) return;
    this.processCacheLocation("global", fs, logger);
    this.loadTypesRegistryFile(fs, logger);
  }

  private filesToWatchFor(typingFiles: readonly string[]): readonly string[] {
    return [...new Set(typingFiles.map(fileName => dirname(fileName)))].sort();
  }

  private async withInstallSlot<T>(work: () => Promise<T>): Promise<T> {
    if (this.activeInstalls >= this.throttleLimit) {
      await new Promise<void>(resolve => this.waiters.push(resolve));
    }
    this.activeInstalls += 1;
    try {
      return await work();
    } finally {
      this.activeInstalls -= 1;
      this.waiters.shift()?.();
    }
  }
}

export function computeTypingsInfo(projectRootPath: string, unresolvedImports: Iterable<string>, compilerOptions?: object): TypingsInfo {
  const imports = [...unresolvedImports].sort();
  const info: TypingsInfo = {
    projectRootPath,
    unresolvedImports: imports,
    inferredTypings: imports.map(toTypingPackageName).filter((value, index, array) => array.indexOf(value) === index),
  };
  return compilerOptions === undefined ? info : { ...info, compilerOptions };
}

export function toTypingPackageName(packageName: string): string {
  if (packageName.startsWith("@types/")) return packageName;
  if (packageName.startsWith("@")) {
    const [scope, name] = packageName.split("/");
    return `@types/${scope!.slice(1)}__${name ?? ""}`;
  }
  return `@types/${packageName}`;
}

export async function installNpmPackages(packageNames: readonly string[], installPackages: (packages: readonly string[]) => Promise<void> | void): Promise<void> {
  let currentCommandStart = 0;
  let currentCommandEnd = 0;
  let currentCommandSize = 100;
  const batches: Promise<void>[] = [];
  for (const packageName of packageNames) {
    currentCommandSize += packageName.length + 1;
    if (currentCommandSize < 8000) {
      currentCommandEnd += 1;
    } else {
      const packages = packageNames.slice(currentCommandStart, currentCommandEnd);
      batches.push(Promise.resolve(installPackages(packages)));
      currentCommandStart = currentCommandEnd;
      currentCommandSize = 100 + packageName.length + 1;
      currentCommandEnd += 1;
    }
  }
  if (currentCommandStart < packageNames.length) {
    const packages = packageNames.slice(currentCommandStart, currentCommandEnd);
    batches.push(Promise.resolve(installPackages(packages)));
  }
  await Promise.all(batches);
}

function isTypingUpToDate(cachedTyping: CachedTyping, registryEntry: TypesRegistryEntry): boolean {
  const latest = registryEntry.latest;
  return latest === undefined || compareSemver(cachedTyping.version, latest) >= 0;
}

function mangleScopedPackageName(packageName: string): string {
  if (!packageName.startsWith("@")) return packageName;
  const [scope, name] = packageName.slice(1).split("/");
  return name === undefined ? scope ?? packageName : `${scope}__${name}`;
}

function readJsonObject(fs: FS, fileName: string): Record<string, unknown> {
  const text = fs.readFile(fileName);
  if (text === undefined) return {};
  const value = JSON.parse(text) as unknown;
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function objectProperty<T>(object: Record<string, unknown>, key: string): T | undefined {
  const value = object[key];
  return value !== null && typeof value === "object" ? value as T : undefined;
}

function combinePaths(...parts: readonly string[]): string {
  return parts.join("/").replace(/\/+/g, "/");
}

function dirname(path: string): string {
  const normalized = path.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  if (index <= 0) return normalized.startsWith("/") ? "/" : "";
  return normalized.slice(0, index);
}

function compareSemver(left: string, right: string): number {
  const leftParts = left.split(".").map(part => Number.parseInt(part, 10) || 0);
  const rightParts = right.split(".").map(part => Number.parseInt(part, 10) || 0);
  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const delta = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (delta !== 0) return delta;
  }
  return 0;
}
