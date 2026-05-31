import type { CommandLineTesting, DiagnosticLike, DiagnosticReporter, DiagnosticsReporter, Watcher } from "./tsc/index.js";

export interface WatchHost {
  readonly now: () => Date;
  readonly setTimeout: (callback: () => void, ms: number) => unknown;
  readonly clearTimeout: (handle: unknown) => void;
}

export interface WatchFileSystem {
  stat(fileName: string): { readonly mtime: Date } | undefined;
  readFile?(fileName: string): string | undefined;
}

export interface WatchCompilerSourceFile {
  readonly fileName: string;
  readonly path: string;
}

export interface WatchCompilerHost<SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> {
  readonly fs: WatchFileSystem;
  getSourceFile(fileName: string, path: string): SourceFile | undefined;
}

export interface CachedSourceFile<SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> {
  readonly file: SourceFile;
  readonly modTime: Date;
}

export interface WatchChange {
  readonly fileName: string;
  readonly kind: WatchChangeKind;
  readonly time: Date;
}

export enum WatchChangeKind {
  Created = 0,
  Updated = 1,
  Deleted = 2,
}

export interface WatchParsedConfig<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  readonly configFileName?: string;
  readonly extendedSourceFiles: readonly string[];
  readonly watchInterval: number;
  readonly diagnostics: readonly Diagnostic[];
  reload?(): WatchParsedConfig<Diagnostic>;
}

export interface WatchProgram<SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> {
  readonly sourceFiles: readonly SourceFile[];
}

export interface BuildWatcherOptions<Diagnostic extends DiagnosticLike = DiagnosticLike, SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> {
  readonly host: WatchHost;
  readonly config: WatchParsedConfig<Diagnostic>;
  readonly compilerHost?: WatchCompilerHost<SourceFile>;
  readonly reportDiagnostic?: DiagnosticReporter<Diagnostic>;
  readonly reportErrorSummary?: DiagnosticsReporter<Diagnostic>;
  readonly reportWatchStatus?: DiagnosticReporter<DiagnosticLike>;
  readonly testing?: CommandLineTesting;
  readonly createProgram?: (config: WatchParsedConfig<Diagnostic>, host: WatchCompilerHost<SourceFile> | undefined) => WatchProgram<SourceFile>;
  readonly compileAndEmit?: (program: WatchProgram<SourceFile>) => { readonly diagnostics: readonly Diagnostic[] };
  readonly parseConfig?: () => WatchParsedConfig<Diagnostic>;
  readonly delayMs?: number;
}

export class WatchCompilerHostCache<SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> {
  private readonly compilerHost: WatchCompilerHost<SourceFile>;
  private readonly cache = new Map<string, CachedSourceFile<SourceFile>>();

  constructor(compilerHost: WatchCompilerHost<SourceFile>) {
    this.compilerHost = compilerHost;
  }

  getSourceFile(fileName: string, path: string): SourceFile | undefined {
    const info = this.compilerHost.fs.stat(fileName);
    const cached = this.cache.get(path);
    if (cached !== undefined && info !== undefined && sameTime(info.mtime, cached.modTime)) return cached.file;
    const file = this.compilerHost.getSourceFile(fileName, path);
    if (file !== undefined && info !== undefined) this.cache.set(path, { file, modTime: info.mtime });
    else this.cache.delete(path);
    return file;
  }

  deleteMissing(program: WatchProgram<SourceFile>): void {
    const programFiles = new Set(program.sourceFiles.map((file) => file.path));
    for (const path of this.cache.keys()) {
      if (!programFiles.has(path)) this.cache.delete(path);
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export class BuildWatcher<Diagnostic extends DiagnosticLike = DiagnosticLike, SourceFile extends WatchCompilerSourceFile = WatchCompilerSourceFile> implements Watcher {
  private readonly options: BuildWatcherOptions<Diagnostic, SourceFile>;
  private readonly delayMs: number;
  private readonly sourceFileCache: WatchCompilerHostCache<SourceFile> | undefined;
  private pendingChanges: WatchChange[] = [];
  private timer: unknown;
  private closed = false;
  private config: WatchParsedConfig<Diagnostic>;
  private configFilePaths: string[] = [];
  private configModified = false;
  private configHasErrors = false;
  private program: WatchProgram<SourceFile> | undefined;

  constructor(options: BuildWatcherOptions<Diagnostic, SourceFile>);
  constructor(host: WatchHost, cycle: () => void, delayMs?: number);
  constructor(
    optionsOrHost: BuildWatcherOptions<Diagnostic, SourceFile> | WatchHost,
    cycle?: () => void,
    delayMs: number = 250,
  ) {
    if (isBuildWatcherOptions(optionsOrHost)) {
      this.options = optionsOrHost;
      this.delayMs = optionsOrHost.delayMs ?? optionsOrHost.config.watchInterval;
      this.config = optionsOrHost.config;
      this.sourceFileCache = optionsOrHost.compilerHost === undefined ? undefined : new WatchCompilerHostCache(optionsOrHost.compilerHost);
    } else {
      this.options = {
        host: optionsOrHost,
        config: { extendedSourceFiles: [], watchInterval: delayMs, diagnostics: [] as readonly Diagnostic[] },
        createProgram: () => ({ sourceFiles: [] }),
        compileAndEmit: () => {
          cycle?.();
          return { diagnostics: [] as readonly Diagnostic[] };
        },
      };
      this.delayMs = delayMs;
      this.config = this.options.config;
    }
  }

  start(): void {
    if (this.config.configFileName !== undefined) {
      this.configFilePaths = [this.config.configFileName, ...this.config.extendedSourceFiles];
    }
    this.options.reportWatchStatus?.({ message: "Starting compilation in watch mode." });
    this.doBuild();
  }

  enqueue(fileName: string, kind: WatchChangeKind): void {
    if (this.closed) return;
    this.pendingChanges.push({ fileName, kind, time: this.options.host.now() });
    this.schedule();
  }

  changes(): readonly WatchChange[] {
    return this.pendingChanges;
  }

  doCycle(): void {
    if (this.closed) return;
    if (this.recheckTsConfig()) return;
    if (!this.configModified && this.pendingChanges.length === 0) {
      if (this.program !== undefined) this.options.testing?.onProgram(this.program);
      return;
    }
    this.pendingChanges = [];
    this.options.reportWatchStatus?.({ message: "File change detected. Starting incremental compilation." });
    this.doBuild();
  }

  close(): void {
    this.closed = true;
    if (this.timer !== undefined) this.options.host.clearTimeout(this.timer);
    this.timer = undefined;
    this.pendingChanges = [];
    this.sourceFileCache?.clear();
  }

  private doBuild(): void {
    if (this.configModified) this.sourceFileCache?.clear();
    this.program = this.options.createProgram?.(this.config, this.options.compilerHost);
    const result = this.program === undefined ? { diagnostics: [] as readonly Diagnostic[] } : this.options.compileAndEmit?.(this.program) ?? { diagnostics: [] as readonly Diagnostic[] };
    if (this.program !== undefined) {
      this.sourceFileCache?.deleteMissing(this.program);
      this.options.testing?.onProgram(this.program);
    }
    this.configModified = false;
    const errorCount = result.diagnostics.length;
    this.options.reportWatchStatus?.({
      message: errorCount === 1 ? "Found 1 error. Watching for file changes." : `Found ${errorCount} errors. Watching for file changes.`,
    });
  }

  private recheckTsConfig(): boolean {
    if (this.config.configFileName === undefined || this.options.parseConfig === undefined) return false;
    if (!this.configHasErrors && this.configFilePaths.length > 0 && !this.changedConfigFilePaths()) return false;
    const config = this.options.parseConfig();
    if (config.diagnostics.length > 0) {
      for (const diagnostic of config.diagnostics) this.options.reportDiagnostic?.(diagnostic);
      this.configHasErrors = true;
      this.options.reportWatchStatus?.({
        message: config.diagnostics.length === 1
          ? "Found 1 error. Watching for file changes."
          : `Found ${config.diagnostics.length} errors. Watching for file changes.`,
      });
      return true;
    }
    if (this.configHasErrors || !sameConfig(this.config, config)) this.configModified = true;
    this.configHasErrors = false;
    this.config = config;
    this.configFilePaths = config.configFileName === undefined ? [] : [config.configFileName, ...config.extendedSourceFiles];
    return false;
  }

  private changedConfigFilePaths(): boolean {
    for (const change of this.pendingChanges) {
      if (this.configFilePaths.includes(change.fileName)) return true;
    }
    return false;
  }

  private schedule(): void {
    if (this.timer !== undefined) return;
    this.timer = this.options.host.setTimeout(() => {
      this.timer = undefined;
      this.doCycle();
    }, this.delayMs);
  }
}

function sameTime(left: Date, right: Date): boolean {
  return left.getTime() === right.getTime();
}

function isBuildWatcherOptions<Diagnostic extends DiagnosticLike, SourceFile extends WatchCompilerSourceFile>(
  value: BuildWatcherOptions<Diagnostic, SourceFile> | WatchHost,
): value is BuildWatcherOptions<Diagnostic, SourceFile> {
  return "config" in value;
}

function sameConfig(left: WatchParsedConfig, right: WatchParsedConfig): boolean {
  return left.configFileName === right.configFileName &&
    left.watchInterval === right.watchInterval &&
    sameStringArray(left.extendedSourceFiles, right.extendedSourceFiles);
}

function sameStringArray(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}
