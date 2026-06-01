import { type SourceFile, type Node } from "../../ast/index.js";
import { bindSourceFile } from "../../binder/index.js";
import { type CompilerOptions, ModuleKind, ResolutionMode, Tristate } from "../../core/index.js";
import type { ResolvedModule, ResolvedModuleWithFailedLookupLocations } from "../../module/resolver.js";
import type { ParsedCommandLine, SourceOutputAndProjectReference } from "../../tsoptions/parsedCommandLine.js";
import { pathIsRelative, type Path } from "../../tspath/index.js";

export interface PathAndFileName {
  readonly path: Path;
  readonly fileName: string;
}

export interface AliasResolverFileSystem {
  useCaseSensitiveFileNames(): boolean;
}

export interface RegistryCloneHost {
  getCurrentDirectory(): string;
  fs(): AliasResolverFileSystem;
  getSourceFile(fileName: string, path: Path): SourceFile | undefined;
}

export interface AliasModuleResolver {
  resolveModuleName(
    moduleReference: string,
    containingFile: string,
    mode: ResolutionMode,
    redirectedReference: unknown | undefined,
  ): ResolvedModuleWithFailedLookupLocations;
}

type ModuleResolutionCache = Map<string, ResolvedModule | undefined>;

export class AliasResolver {
  private readonly toPath: (fileName: string) => Path;
  private readonly host: RegistryCloneHost;
  private readonly moduleResolver: AliasModuleResolver;
  private readonly rootFiles: readonly SourceFile[];
  private readonly symlinks: ReadonlyMap<Path, PathAndFileName>;
  private readonly onFailedAmbientModuleLookup: (source: SourceFile, moduleName: string) => void;
  private readonly resolvedModules = new Map<Path, ModuleResolutionCache>();

  constructor(
    rootFiles: readonly SourceFile[],
    symlinks: ReadonlyMap<Path, PathAndFileName>,
    host: RegistryCloneHost,
    moduleResolver: AliasModuleResolver,
    toPath: (fileName: string) => Path,
    onFailedAmbientModuleLookup: (source: SourceFile, moduleName: string) => void,
  ) {
    this.toPath = toPath;
    this.host = host;
    this.moduleResolver = moduleResolver;
    this.rootFiles = rootFiles;
    this.symlinks = symlinks;
    this.onFailedAmbientModuleLookup = onFailedAmbientModuleLookup;
  }

  bindSourceFiles(): void {
  }

  sourceFiles(): readonly SourceFile[] {
    return this.rootFiles;
  }

  options(): CompilerOptions {
    return {
      noCheck: Tristate.True,
    };
  }

  getCurrentDirectory(): string {
    return this.host.getCurrentDirectory();
  }

  useCaseSensitiveFileNames(): boolean {
    return this.host.fs().useCaseSensitiveFileNames();
  }

  getSourceFile(fileName: string): SourceFile | undefined {
    const file = this.host.getSourceFile(fileName, this.toPath(fileName));
    if (file === undefined) {
      return undefined;
    }
    bindSourceFile(file);
    return file;
  }

  getDefaultResolutionModeForFile(_file: SourceFile): ResolutionMode {
    return ResolutionMode.ESM;
  }

  getEmitModuleFormatOfFile(_sourceFile: SourceFile): ModuleKind {
    return ModuleKind.ESNext;
  }

  getEmitSyntaxForUsageLocation(_sourceFile: SourceFile, _usageLocation: Node): ResolutionMode {
    return ResolutionMode.ESM;
  }

  getImpliedNodeFormatForEmit(_sourceFile: SourceFile): ModuleKind {
    return ModuleKind.ESNext;
  }

  getModeForUsageLocation(_file: SourceFile, _moduleSpecifier: Node): ResolutionMode {
    return ResolutionMode.ESM;
  }

  getResolvedModule(currentSourceFile: SourceFile, moduleReference: string, mode: ResolutionMode): ResolvedModule | undefined {
    const cache = this.moduleCacheFor(currentSourceFile.path);
    const key = modeAwareCacheKey(moduleReference, mode);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = this.moduleResolver.resolveModuleName(
      moduleReference,
      currentSourceFile.fileName,
      mode,
      undefined,
    ).resolvedModule;
    cache.set(key, result);

    if (!resolvedModuleIsResolved(result) && !pathIsRelative(moduleReference)) {
      this.onFailedAmbientModuleLookup(currentSourceFile, moduleReference);
    }
    return result;
  }

  getSourceFileForResolvedModule(fileName: string): SourceFile | undefined {
    return this.getSourceFile(fileName);
  }

  getResolvedModules(): ReadonlyMap<Path, ReadonlyMap<string, ResolvedModule | undefined>> {
    return this.resolvedModules;
  }

  getSymlinkCache(): never {
    return unimplemented();
  }

  getSourceFileMetaData(_path: Path): never {
    return unimplemented();
  }

  commonSourceDirectory(): never {
    return unimplemented();
  }

  fileExists(_fileName: string): never {
    return unimplemented();
  }

  getGlobalTypingsCacheLocation(): never {
    return unimplemented();
  }

  getImportHelpersImportSpecifier(_path: Path): never {
    return unimplemented();
  }

  getJSXRuntimeImportSpecifier(_path: Path): never {
    return unimplemented();
  }

  getNearestAncestorDirectoryWithPackageJson(_dirname: string): never {
    return unimplemented();
  }

  getPackageJsonInfo(_pkgJsonPath: string): never {
    return unimplemented();
  }

  getProjectReferenceFromOutputDts(_path: Path): SourceOutputAndProjectReference | undefined {
    return unimplemented();
  }

  getProjectReferenceFromSource(_path: Path): SourceOutputAndProjectReference | undefined {
    return unimplemented();
  }

  getRedirectForResolution(_file: SourceFile): ParsedCommandLine | undefined {
    return unimplemented();
  }

  getRedirectTargets(_path: Path): readonly string[] {
    return unimplemented();
  }

  getResolvedModuleFromModuleSpecifier(_file: SourceFile, _moduleSpecifier: Node): ResolvedModule | undefined {
    return unimplemented();
  }

  getSourceOfProjectReferenceIfOutputIncluded(_file: SourceFile): string {
    return unimplemented();
  }

  isSourceFileDefaultLibrary(_path: Path): boolean {
    return unimplemented();
  }

  isSourceFromProjectReference(_path: Path): boolean {
    return unimplemented();
  }

  sourceFileMayBeEmitted(_sourceFile: SourceFile, _forceDtsEmit: boolean): boolean {
    return unimplemented();
  }

  getPackagesMap(): ReadonlyMap<string, boolean> {
    return new Map();
  }

  private moduleCacheFor(path: Path): ModuleResolutionCache {
    const existing = this.resolvedModules.get(path);
    if (existing !== undefined) {
      return existing;
    }
    const created: ModuleResolutionCache = new Map();
    this.resolvedModules.set(path, created);
    return created;
  }
}

export function newAliasResolver(
  rootFiles: readonly SourceFile[],
  symlinks: ReadonlyMap<Path, PathAndFileName>,
  host: RegistryCloneHost,
  moduleResolver: AliasModuleResolver,
  toPath: (fileName: string) => Path,
  onFailedAmbientModuleLookup: (source: SourceFile, moduleName: string) => void,
): AliasResolver {
  return new AliasResolver(
    rootFiles,
    symlinks,
    host,
    moduleResolver,
    toPath,
    onFailedAmbientModuleLookup,
  );
}

function modeAwareCacheKey(name: string, mode: ResolutionMode): string {
  return name + "\u0000" + String(mode);
}

function resolvedModuleIsResolved(module: ResolvedModule | undefined): boolean {
  return module !== undefined && module.resolvedFileName !== "";
}

function unimplemented(): never {
  throw new Error("unimplemented");
}
