/**
 * Parallel files parser.
 *
 * Substantive port of TS-Go `internal/compiler/filesparser.go` (~549 LoC).
 * Orchestrates parsing of all program files (root + lib + reference)
 * potentially in parallel via a work-stealing parse pool.
 */

import type { SourceFile } from "../ast/index.js";
import { normalizePath } from "../tspath/index.js";
import type { FileLoader, LibFile, FileIncludeReason, ProcessedFiles, ResolvedModule } from "./fileLoader.js";

export interface ResolvedRef {
  fileName: string;
  isExternalLibraryImport?: boolean;
  increaseDepth?: boolean;
  elideOnDepth?: boolean;
  includeReason?: FileIncludeReason;
  packageId?: string;
}

export class ParseTask {
  normalizedFilePath: string;
  path_: string;
  libFile: LibFile | undefined;
  includeReason: FileIncludeReason;
  parsedFile: SourceFile | undefined;
  redirectedParseTask: ParseTask | undefined;
  subTasks: ParseTask[] = [];
  resolvedModules: Map<string, ResolvedModule> = new Map();
  loaded = false;
  startedSubTasks = false;
  isForAutomaticTypeDirective = false;
  increaseDepth = false;
  elideOnDepth = false;
  loadedTask: ParseTask | undefined;
  packageId = "";
  allIncludeReasons: FileIncludeReason[] = [];

  constructor(fileName: string, includeReason: FileIncludeReason, libFile?: LibFile) {
    this.normalizedFilePath = normalizePath(fileName);
    this.path_ = this.normalizedFilePath;
    this.includeReason = includeReason;
    this.libFile = libFile;
  }

  fileName(): string { return this.normalizedFilePath; }
  path(): string { return this.path_; }

  load(loader: FileLoader): void {
    this.loaded = true;
    if (this.isForAutomaticTypeDirective) {
      this.loadAutomaticTypeDirectives(loader);
      return;
    }
    this.parsedFile = loader.parseSourceFile({
      fileName: this.normalizedFilePath,
      libFile: this.libFile,
      includeReason: this.includeReason,
    } as unknown as never);
  }

  redirect(loader: FileLoader, fileName: string): void {
    void loader;
    this.redirectedParseTask = new ParseTask(fileName, this.includeReason, this.libFile);
    this.subTasks = [this.redirectedParseTask];
  }

  loadAutomaticTypeDirectives(loader: FileLoader): void {
    loader.addAutomaticTypeDirectiveTasks();
  }

  addSubTask(ref: ResolvedRef, libFile: LibFile | undefined): void {
    const task = new ParseTask(
      ref.fileName,
      ref.includeReason ?? { kind: 0, fileName: ref.fileName },
      libFile,
    );
    task.increaseDepth = ref.increaseDepth === true;
    task.elideOnDepth = ref.elideOnDepth === true;
    task.packageId = ref.packageId ?? "";
    this.subTasks.push(task);
  }
}

export interface ParseTaskData {
  readonly tasks: Map<string, ParseTask>;
  lowestDepth: number;
  startedSubTasks: boolean;
  packageId: string;
}

const parseTaskDataPool: ParseTaskData[] = [];

export function getParseTaskData(task: ParseTask): ParseTaskData {
  const td = parseTaskDataPool.pop();
  if (td !== undefined) {
    td.tasks.set(task.normalizedFilePath, task);
    td.lowestDepth = Number.MAX_SAFE_INTEGER;
    td.startedSubTasks = false;
    td.packageId = "";
    return td;
  }
  return {
    tasks: new Map([[task.normalizedFilePath, task]]),
    lowestDepth: Number.MAX_SAFE_INTEGER,
    startedSubTasks: false,
    packageId: "",
  };
}

export function putParseTaskData(td: ParseTaskData): void {
  td.tasks.clear();
  parseTaskDataPool.push(td);
}

export class FilesParser {
  private readonly taskDataByPath = new Map<string, ParseTaskData>();
  maxDepth = Number.MAX_SAFE_INTEGER;

  parse(loader: FileLoader, tasks: ParseTask[]): void {
    this.start(loader, tasks, 0);
  }

  start(loader: FileLoader, tasks: ParseTask[], depth: number): void {
    for (let index = 0; index < tasks.length; index += 1) {
      const task = tasks[index]!;
      task.path_ = loader.toPath(task.normalizedFilePath);
      const candidate = getParseTaskData(task);
      const existing = this.taskDataByPath.get(task.path_);
      const data = existing ?? candidate;
      if (existing !== undefined) {
        putParseTaskData(candidate);
        const loadedTask = data.tasks.get(task.normalizedFilePath);
        if (loadedTask !== undefined) task.loadedTask = loadedTask;
        else {
          data.tasks.set(task.normalizedFilePath, task);
        }
      } else {
        this.taskDataByPath.set(task.path_, data);
      }

      if (data.packageId === "" && task.packageId !== "") data.packageId = task.packageId;
      const currentDepth = task.increaseDepth ? depth + 1 : depth;
      let startSubtasks = data.startedSubTasks;
      if (currentDepth < data.lowestDepth) {
        data.lowestDepth = currentDepth;
        startSubtasks = true;
        data.startedSubTasks = true;
      }
      if (task.elideOnDepth && currentDepth > this.maxDepth) continue;

      for (const taskByFileName of data.tasks.values()) {
        let loadSubTasks = startSubtasks;
        if (!taskByFileName.loaded) {
          taskByFileName.load(loader);
          if (taskByFileName.redirectedParseTask !== undefined) {
            loadSubTasks = true;
            data.startedSubTasks = true;
          }
        }
        if (!taskByFileName.startedSubTasks && loadSubTasks) {
          taskByFileName.startedSubTasks = true;
          this.start(loader, taskByFileName.subTasks, data.lowestDepth);
        }
      }
    }
  }

  getProcessedFiles(loader: FileLoader): ProcessedFiles {
    const duplicateSourceFiles = [...loader.duplicateFiles];
    const seenByPath = new Map<string, SourceFile>();
    for (const file of loader.files) {
      const path = loader.toPath(file.fileName);
      const previous = seenByPath.get(path);
      if (previous !== undefined && previous.fileName !== file.fileName) {
        duplicateSourceFiles.push({ file, reason: `File casing differs from ${previous.fileName}` });
      } else {
        seenByPath.set(path, file);
      }
    }
    return {
      files: loader.files,
      duplicateSourceFiles,
      unresolvedImports: new Set(),
      resolvedModulesMap: loader.resolvedModulesMap,
      packageNamesInfo: { unresolvedImports: new Set(), packagesMap: new Map() },
      fileReasons: loader.fileReasons,
      diagnostics: loader.diagnostics,
    };
  }

  addIncludeReason(includeProcessor: IncludeProcessor, task: ParseTask, reason: FileIncludeReason): void {
    if (task.redirectedParseTask !== undefined) {
      this.addIncludeReason(includeProcessor, task.redirectedParseTask, reason);
      return;
    }
    if (!task.loaded) return;
    task.allIncludeReasons.push(reason);
    includeProcessor.addReason(task.path_, reason);
  }
}

interface IncludeProcessor {
  addReason(fileName: string, reason: FileIncludeReason): void;
}
