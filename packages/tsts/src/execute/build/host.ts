/**
 * Build orchestration host cache.
 *
 * Port of TS-Go `internal/execute/build/host.go` for the cache-owning host
 * responsibilities that are independent of the full orchestrator.
 */

import { extensionJson, fileExtensionIs, isDeclarationFileName, type Path } from "../../tspath/index.js";
import type { FS } from "../../vfs/index.js";
import { ParseCache } from "./parseCache.js";

export interface SourceFileParseOptions {
  readonly fileName: string;
  readonly path: Path;
}

export interface SourceFileLike {
  readonly fileName: string;
}

export interface ParsedCommandLineLike {
  readonly configFileName: string;
}

export interface BuildCompilerHost<SourceFile extends SourceFileLike, ParsedCommandLine extends ParsedCommandLineLike> {
  fs(): FS;
  defaultLibraryPath(): string;
  getCurrentDirectory(): string;
  getSourceFile(opts: SourceFileParseOptions): SourceFile | undefined;
  getResolvedProjectReference(fileName: string, path: Path): ParsedCommandLine | undefined;
}

export interface BuildTaskLike<BuildInfo> {
  loadOrStoreBuildInfo(configPath: Path, buildInfoFileName: string): BuildInfo | undefined;
}

export interface BuildHostOrchestrator<BuildInfo> {
  now(): Date;
  toPath(fileName: string): Path;
  getTask(configPath: Path): BuildTaskLike<BuildInfo> | undefined;
}

export class BuildHost<
  SourceFile extends SourceFileLike,
  ParsedCommandLine extends ParsedCommandLineLike,
  BuildInfo,
> {
  private readonly orchestrator: BuildHostOrchestrator<BuildInfo>;
  private readonly host: BuildCompilerHost<SourceFile, ParsedCommandLine>;
  private readonly sourceFiles = new ParseCache<Path, SourceFile | undefined>();
  private readonly resolvedReferences = new ParseCache<Path, ParsedCommandLine | undefined>();
  private readonly mTimes = new Map<Path, Date | undefined>();
  private readonly configTimes = new Map<Path, number>();

  constructor(
    orchestrator: BuildHostOrchestrator<BuildInfo>,
    host: BuildCompilerHost<SourceFile, ParsedCommandLine>,
  ) {
    this.orchestrator = orchestrator;
    this.host = host;
  }

  fs(): FS {
    return this.host.fs();
  }

  defaultLibraryPath(): string {
    return this.host.defaultLibraryPath();
  }

  getCurrentDirectory(): string {
    return this.host.getCurrentDirectory();
  }

  getSourceFile(opts: SourceFileParseOptions): SourceFile | undefined {
    if (isDeclarationFileName(opts.fileName) || fileExtensionIs(opts.fileName, extensionJson)) {
      return this.sourceFiles.loadOrStore(opts.path, () => this.host.getSourceFile(opts), false);
    }
    return this.host.getSourceFile(opts);
  }

  getResolvedProjectReference(fileName: string, path: Path): ParsedCommandLine | undefined {
    return this.resolvedReferences.loadOrStore(path, (key) => {
      const started = this.orchestrator.now().getTime();
      const commandLine = this.host.getResolvedProjectReference(fileName, key);
      const ended = this.orchestrator.now().getTime();
      this.configTimes.set(key, ended - started);
      return commandLine;
    }, true);
  }

  readBuildInfo(config: ParsedCommandLine, buildInfoFileName: string): BuildInfo | undefined {
    const configPath = this.orchestrator.toPath(config.configFileName);
    const task = this.orchestrator.getTask(configPath);
    if (task === undefined) return undefined;
    return task.loadOrStoreBuildInfo(configPath, buildInfoFileName);
  }

  getMTime(fileName: string): Date | undefined {
    return this.loadOrStoreMTime(fileName, undefined, true);
  }

  setMTime(fileName: string, mTime: Date): void {
    this.fs().chtimes(fileName, new Date(0), mTime);
    this.storeMTime(fileName, mTime);
  }

  loadOrStoreMTime(fileName: string, oldCache: ReadonlyMap<Path, Date | undefined> | undefined, store: boolean): Date | undefined {
    const path = this.orchestrator.toPath(fileName);
    if (this.mTimes.has(path)) return this.mTimes.get(path);

    let mTime = oldCache?.get(path);
    if (mTime === undefined && oldCache?.has(path) !== true) {
      mTime = this.host.fs().stat(fileName)?.mtime;
    }
    if (store) this.mTimes.set(path, mTime);
    return mTime;
  }

  storeMTime(fileName: string, mTime: Date): void {
    const path = this.orchestrator.toPath(fileName);
    this.mTimes.set(path, mTime);
  }

  storeMTimeFromOldCache(fileName: string, oldCache: ReadonlyMap<Path, Date | undefined>): void {
    const path = this.orchestrator.toPath(fileName);
    if (oldCache.has(path)) this.mTimes.set(path, oldCache.get(path));
  }

  getConfigTime(path: Path): number | undefined {
    return this.configTimes.get(path);
  }

  resetCycleCaches(): void {
    this.sourceFiles.reset();
    this.configTimes.clear();
  }
}
