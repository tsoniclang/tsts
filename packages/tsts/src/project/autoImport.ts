export interface AutoImportProviderProject {
  readonly projectId: string;
  readonly packageName: string;
  readonly rootFileNames: readonly string[];
}

export interface AutoImportRequest {
  readonly importingFileName: string;
  readonly moduleSpecifier: string;
}

export interface AutoImportResult {
  readonly packageName: string;
  readonly fileName: string;
  readonly moduleSpecifier: string;
}

export interface FileHandle {
  readonly fileName: string;
  readonly content: string;
  readonly hash?: string;
  readonly kind?: number;
}

export interface FileSource {
  fileExists(fileName: string, path: string): boolean;
  getFile(fileName: string): FileHandle | undefined;
  getFileByPath(fileName: string, path: string): FileHandle | undefined;
  getAccessibleEntries(path: string): { readonly files: readonly string[]; readonly directories: readonly string[] };
}

export interface AutoImportBuilderFsHost {
  readFile(fileName: string): string | undefined;
  fileExists(fileName: string): boolean;
  getAccessibleEntries(path: string): { readonly files: readonly string[]; readonly directories: readonly string[] };
}

export class AutoImportBuilderFS implements FileSource {
  private readonly host: AutoImportBuilderFsHost;
  private readonly toPath: (fileName: string) => string;
  private readonly overlays: ReadonlyMap<string, FileHandle>;
  private readonly diskFiles: Map<string, FileHandle>;
  private readonly untrackedFiles = new Map<string, FileHandle | undefined>();

  constructor(
    host: AutoImportBuilderFsHost,
    toPath: (fileName: string) => string,
    overlays: ReadonlyMap<string, FileHandle> = new Map(),
    diskFiles: Map<string, FileHandle> = new Map(),
  ) {
    this.host = host;
    this.toPath = toPath;
    this.overlays = overlays;
    this.diskFiles = diskFiles;
  }

  fileExists(fileName: string, path: string): boolean {
    return this.overlays.has(path) || this.diskFiles.has(path) || this.host.fileExists(fileName);
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.getFileByPath(fileName, this.toPath(fileName));
  }

  getFileByPath(fileName: string, path: string): FileHandle | undefined {
    const overlay = this.overlays.get(path);
    if (overlay !== undefined) return overlay;
    const diskFile = this.diskFiles.get(path);
    if (diskFile !== undefined) return diskFile;
    if (this.untrackedFiles.has(path)) return this.untrackedFiles.get(path);
    const content = this.host.readFile(fileName);
    const handle = content === undefined ? undefined : newFileHandle(fileName, content);
    this.untrackedFiles.set(path, handle);
    return handle;
  }

  getAccessibleEntries(path: string): { readonly files: readonly string[]; readonly directories: readonly string[] } {
    return this.host.getAccessibleEntries(path);
  }
}

export class AutoImportRegistry {
  private readonly providers = new Map<string, AutoImportProviderProject>();

  set(provider: AutoImportProviderProject): void {
    this.providers.set(provider.projectId, provider);
  }

  delete(projectId: string): void {
    this.providers.delete(projectId);
  }

  get(projectId: string): AutoImportProviderProject | undefined {
    return this.providers.get(projectId);
  }

  resolve(request: AutoImportRequest): readonly AutoImportResult[] {
    const matches: AutoImportResult[] = [];
    for (const provider of this.providers.values()) {
      for (const fileName of provider.rootFileNames) {
        if (!fileName.endsWith(".d.ts") && !fileName.endsWith(".ts")) continue;
        matches.push({
          packageName: provider.packageName,
          fileName,
          moduleSpecifier: request.moduleSpecifier,
        });
      }
    }
    return matches.sort((left, right) => left.packageName.localeCompare(right.packageName) || left.fileName.localeCompare(right.fileName));
  }

  clone(): AutoImportRegistry {
    const registry = new AutoImportRegistry();
    for (const provider of this.providers.values()) registry.set(provider);
    return registry;
  }

  clear(): void {
    this.providers.clear();
  }

  values(): readonly AutoImportProviderProject[] {
    return [...this.providers.values()];
  }
}

export interface AutoImportRegistryCloneHostOptions {
  readonly projectCollection: AutoImportProjectCollection;
  readonly parseCache: AutoImportParseCache;
  readonly fileSource: FileSource;
  readonly currentDirectory: string;
}

export interface AutoImportProjectCollection {
  getDefaultProject(path: string): { readonly configFilePath: string; readonly program: unknown } | undefined;
  getProjectByPath(path: string): { readonly program: unknown } | undefined;
}

export interface AutoImportParseCache {
  acquire(key: ParseCacheKey, file: FileHandle): unknown;
  deref(key: ParseCacheKey): void;
}

export interface ParseCacheKey {
  readonly fileName: string;
  readonly path: string;
  readonly hash?: string;
  readonly kind?: number;
}

export class AutoImportRegistryCloneHost {
  private readonly options: AutoImportRegistryCloneHostOptions;
  private readonly files: ParseCacheKey[] = [];

  constructor(options: AutoImportRegistryCloneHostOptions) {
    this.options = options;
  }

  fs(): FileSource {
    return this.options.fileSource;
  }

  getCurrentDirectory(): string {
    return this.options.currentDirectory;
  }

  getDefaultProject(path: string): { readonly projectPath: string; readonly program: unknown } | undefined {
    const project = this.options.projectCollection.getDefaultProject(path);
    if (project === undefined) return undefined;
    return { projectPath: project.configFilePath, program: project.program };
  }

  getPackageJson(fileName: string): PackageJsonInfo {
    const file = this.options.fileSource.getFile(fileName);
    const packageDirectory = directoryOf(fileName);
    if (file === undefined) return { directoryExists: false, packageDirectory };
    try {
      return {
        directoryExists: true,
        packageDirectory,
        contents: JSON.parse(file.content) as Record<string, unknown>,
        parseable: true,
      };
    } catch {
      return { directoryExists: true, packageDirectory, parseable: false };
    }
  }

  getProgramForProject(projectPath: string): unknown {
    return this.options.projectCollection.getProjectByPath(projectPath)?.program;
  }

  getSourceFile(fileName: string, path: string): unknown {
    const file = this.options.fileSource.getFileByPath(fileName, path);
    if (file === undefined) return undefined;
    const key: ParseCacheKey = {
      fileName,
      path,
      ...(file.hash === undefined ? {} : { hash: file.hash }),
      ...(file.kind === undefined ? {} : { kind: file.kind }),
    };
    this.files.push(key);
    return this.options.parseCache.acquire(key, file);
  }

  dispose(): void {
    for (const key of this.files.splice(0)) this.options.parseCache.deref(key);
  }
}

export interface PackageJsonInfo {
  readonly directoryExists: boolean;
  readonly packageDirectory: string;
  readonly contents?: Record<string, unknown>;
  readonly parseable?: boolean;
}

export function newAutoImportRegistryCloneHost(options: AutoImportRegistryCloneHostOptions): AutoImportRegistryCloneHost {
  return new AutoImportRegistryCloneHost(options);
}

function newFileHandle(fileName: string, content: string): FileHandle {
  return {
    fileName,
    content,
    hash: `${content.length}:${content.charCodeAt(0) || 0}:${content.charCodeAt(content.length - 1) || 0}`,
  };
}

function directoryOf(fileName: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  return index < 0 ? "" : normalized.slice(0, index);
}
