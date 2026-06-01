import { ClientMock } from "./clientMock.generated.js";
import { NpmExecutorMock } from "./npmExecutorMock.generated.js";
import { newSession, type Session, type SessionOptions, type SessionInit } from "../../project/session.js";
import { SnapshotFS } from "../../project/snapshotFs.js";

export const testTypingsLocation = "/home/src/Library/Caches/typescript";

export interface TypingsInstallerOptions {
  readonly typesRegistry?: readonly string[];
  readonly packageToFile?: ReadonlyMap<string, string> | Record<string, string>;
}

export interface ProjectTestHost {
  readonly client: ClientMock;
  readonly npmExecutor: NpmExecutorMock;
  readonly files: Map<string, string>;
}

export class SessionUtils implements ProjectTestHost {
  readonly files: Map<string, string>;
  readonly client: ClientMock;
  readonly npmExecutor: NpmExecutorMock;
  readonly currentDirectory: string;
  private readonly typingsInstallerOptions: NormalizedTypingsInstallerOptions | undefined;
  private readonly logLines: string[] = [];

  constructor(init: {
    readonly currentDirectory: string;
    readonly files: Iterable<readonly [string, string]>;
    readonly client?: ClientMock;
    readonly npmExecutor?: NpmExecutorMock;
    readonly typingsInstallerOptions?: TypingsInstallerOptions;
  }) {
    this.currentDirectory = normalizePath(init.currentDirectory);
    this.files = new Map([...init.files].map(([fileName, content]) => [normalizePath(fileName), content]));
    this.client = init.client ?? new ClientMock();
    this.npmExecutor = init.npmExecutor ?? new NpmExecutorMock();
    this.typingsInstallerOptions = normalizeTypingsInstallerOptions(init.typingsInstallerOptions);
    this.setupNpmExecutorForTypingsInstaller();
  }

  fsFromFileMap(): Map<string, string> {
    return new Map(this.files);
  }

  fs(): SnapshotFS {
    return new SnapshotFS(this.files);
  }

  toPath(fileName: string): string {
    return normalizePath(resolvePath(this.currentDirectory, fileName));
  }

  setupNpmExecutorForTypingsInstaller(): void {
    if (this.typingsInstallerOptions === undefined) return;
    this.npmExecutor.npmInstallFunc = async (cwd, npmInstallArgs) => {
      if (npmInstallArgs.length < 3) throw new Error(`unexpected npm install: ${cwd} ${npmInstallArgs.join(" ")}`);
      if (npmInstallArgs.length === 3 && npmInstallArgs[2] === "types-registry@latest") {
        updateHostFile(this, `${cwd}/node_modules/types-registry/index.json`, this.createTypesRegistryFileContent());
        return undefined;
      }

      let packageEnd = npmInstallArgs.length;
      for (let index = 2; index < npmInstallArgs.length; index++) {
        if (npmInstallArgs[index]!.startsWith("--")) {
          packageEnd = index;
          break;
        }
      }
      for (const atTypesPackageWithVersion of npmInstallArgs.slice(2, packageEnd)) {
        let atTypesPackage = atTypesPackageWithVersion;
        const versionIndex = atTypesPackage.lastIndexOf("@");
        if (versionIndex > "@types/".length - 1) atTypesPackage = atTypesPackage.slice(0, versionIndex);
        const packageBaseName = atTypesPackage.slice("@types/".length);
        const content = this.typingsInstallerOptions?.packageToFile.get(packageBaseName);
        if (content === undefined) throw new Error(`content not provided for ${packageBaseName}`);
        updateHostFile(this, `${cwd}/node_modules/@types/${packageBaseName}/index.d.ts`, content);
      }
      return undefined;
    };
  }

  watchesFile(filePath: string): boolean {
    const normalized = normalizePath(filePath);
    for (const call of this.client.watchFilesCalls()) {
      for (const watcher of call.watchers) {
        const pattern = getWatcherPattern(watcher);
        if (pattern === undefined) continue;
        if (globToRegExp(pattern).test(normalized)) return true;
      }
    }
    return false;
  }

  logs(): string {
    return this.logLines.join("\n");
  }

  log(message: string): void {
    this.logLines.push(message);
  }

  createTypesRegistryFileContent(): string {
    const options = this.typingsInstallerOptions;
    if (options === undefined) return "{\n  \"entries\": {\n  }\n}";
    const entries = [...options.typesRegistry];
    for (const key of options.packageToFile.keys()) {
      if (!entries.includes(key)) entries.push(key);
    }
    return `{\n  "entries": {${entries.map((entry, index) => `${index === 0 ? "" : ","}\n    "${entry}": {${typesRegistryConfigText()}\n    }`).join("")}\n  }\n}`;
  }
}

export function newProjectTestHost(files?: Iterable<readonly [string, string]>): ProjectTestHost {
  return new SessionUtils({ currentDirectory: "/", files: files ?? [] });
}

export function updateHostFile(host: ProjectTestHost, fileName: string, content: string): void {
  host.files.set(normalizePath(fileName), content);
}

export function deleteHostFile(host: ProjectTestHost, fileName: string): void {
  host.files.delete(normalizePath(fileName));
}

export function setup(files: ReadonlyMap<string, string> | Iterable<readonly [string, string]>): readonly [Session, SessionUtils] {
  return setupWithTypingsInstaller(files, {});
}

export function setupWithOptions(
  files: ReadonlyMap<string, string> | Iterable<readonly [string, string]>,
  options?: SessionOptions,
): readonly [Session, SessionUtils] {
  return setupWithOptionsAndTypingsInstaller(files, options, {});
}

export function setupWithTypingsInstaller(
  files: ReadonlyMap<string, string> | Iterable<readonly [string, string]>,
  typingsInstallerOptions?: TypingsInstallerOptions,
): readonly [Session, SessionUtils] {
  return setupWithOptionsAndTypingsInstaller(files, undefined, typingsInstallerOptions);
}

export function setupWithOptionsAndTypingsInstaller(
  files: ReadonlyMap<string, string> | Iterable<readonly [string, string]>,
  options?: SessionOptions,
  typingsInstallerOptions?: TypingsInstallerOptions,
): readonly [Session, SessionUtils] {
  const [init, utils] = getSessionInitOptions(files, options, typingsInstallerOptions);
  return [newSession(init), utils];
}

export function getSessionInitOptions(
  files: ReadonlyMap<string, string> | Iterable<readonly [string, string]>,
  options?: SessionOptions,
  typingsInstallerOptions?: TypingsInstallerOptions,
): readonly [SessionInit, SessionUtils] {
  const normalizedFiles = new Map([...files].map(([fileName, content]) => [normalizePath(fileName), content]));
  const currentDirectory = normalizePath(options?.currentDirectory ?? "/");
  const utils = new SessionUtils({
    currentDirectory,
    files: normalizedFiles,
    ...(typingsInstallerOptions === undefined ? {} : { typingsInstallerOptions }),
  });
  const fs = new SnapshotFS(normalizedFiles);
  const sessionOptions: SessionOptions = {
    currentDirectory,
    typingsLocation: options?.typingsLocation ?? testTypingsLocation,
    watchEnabled: options?.watchEnabled ?? true,
    loggingEnabled: options?.loggingEnabled ?? true,
    pushDiagnosticsEnabled: options?.pushDiagnosticsEnabled ?? true,
    useCaseSensitiveFileNames: options?.useCaseSensitiveFileNames ?? false,
    ...(options?.defaultLibraryPath === undefined ? {} : { defaultLibraryPath: options.defaultLibraryPath }),
  };
  return [{
    options: sessionOptions,
    fs,
    client: utils.client,
  }, utils];
}

export function withRequestID<T>(value: T): T {
  return value;
}

export function typesRegistryConfigText(): string {
  return [...typesRegistryConfig()]
    .map(([key, value], index) => `${index === 0 ? "" : ","}\n      "${key}": "${value}"`)
    .join("");
}

export function typesRegistryConfig(): ReadonlyMap<string, string> {
  return new Map([
    ["latest", "1.3.0"],
    ["ts2.0", "1.0.0"],
    ["ts2.1", "1.0.0"],
    ["ts2.2", "1.2.0"],
    ["ts2.3", "1.3.0"],
    ["ts2.4", "1.3.0"],
    ["ts2.5", "1.3.0"],
    ["ts2.6", "1.3.0"],
    ["ts2.7", "1.3.0"],
  ]);
}

interface NormalizedTypingsInstallerOptions {
  readonly typesRegistry: readonly string[];
  readonly packageToFile: ReadonlyMap<string, string>;
}

function normalizeTypingsInstallerOptions(options: TypingsInstallerOptions | undefined): NormalizedTypingsInstallerOptions | undefined {
  if (options === undefined) return undefined;
  const packageToFile = options.packageToFile instanceof Map
    ? new Map(options.packageToFile)
    : new Map(Object.entries(options.packageToFile ?? {}));
  return {
    typesRegistry: [...(options.typesRegistry ?? [])],
    packageToFile,
  };
}

function getWatcherPattern(watcher: unknown): string | undefined {
  if (typeof watcher === "string") return normalizePath(watcher);
  if (watcher === null || typeof watcher !== "object") return undefined;
  const record = watcher as {
    readonly globPattern?: string | { readonly pattern?: string; readonly relativePattern?: { readonly baseUri?: { readonly uri?: string } | string; readonly pattern?: string } };
  };
  if (typeof record.globPattern === "string") return normalizePath(record.globPattern);
  if (record.globPattern?.pattern !== undefined) return normalizePath(record.globPattern.pattern);
  const relative = record.globPattern?.relativePattern;
  if (relative === undefined) return undefined;
  const baseUri = typeof relative.baseUri === "string" ? relative.baseUri : relative.baseUri?.uri;
  if (baseUri === undefined || relative.pattern === undefined) return undefined;
  return normalizePath(`${documentUriToFileName(baseUri)}/${relative.pattern}`);
}

function documentUriToFileName(uri: string): string {
  if (!uri.startsWith("file://")) return uri;
  return decodeURI(uri.slice("file://".length));
}

function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const part of path.replaceAll("\\", "/").split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function resolvePath(currentDirectory: string, fileName: string): string {
  return fileName.startsWith("/") ? normalizePath(fileName) : normalizePath(`${currentDirectory}/${fileName}`);
}

function globToRegExp(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[\\^$+?.()|[\]{}]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${escaped}$`);
}
