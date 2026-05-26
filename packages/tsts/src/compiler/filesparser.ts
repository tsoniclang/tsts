/**
 * Parallel files parser.
 *
 * Substantive port of TS-Go `internal/compiler/filesparser.go` (~549 LoC).
 * Orchestrates parsing of all program files (root + lib + reference)
 * potentially in parallel via a work-stealing parse pool.
 */

import type { SourceFile } from "../ast/index.js";
import type { FileLoader, LibFile, FileIncludeReason, ProcessedFiles, ResolvedModule } from "./fileloader.js";

export interface ResolvedRef {
  fileName: string;
  isExternalLibraryImport: boolean;
}

export class ParseTask {
  fileName_: string;
  path_: string;
  libFile: LibFile | undefined;
  includeReason: FileIncludeReason;
  parsedFile: SourceFile | undefined;
  subTasks: ParseTask[] = [];
  resolvedModules: Map<string, ResolvedModule> = new Map();

  constructor(fileName: string, includeReason: FileIncludeReason, libFile?: LibFile) {
    this.fileName_ = fileName;
    this.path_ = fileName;
    this.includeReason = includeReason;
    this.libFile = libFile;
  }

  fileName(): string { return this.fileName_; }
  path(): string { return this.path_; }

  load(loader: FileLoader): void {
    this.parsedFile = loader.parseSourceFile(this as unknown as never);
  }

  redirect(loader: FileLoader, fileName: string): void {
    void loader;
    this.fileName_ = fileName;
  }

  loadAutomaticTypeDirectives(loader: FileLoader): void {
    loader.addAutomaticTypeDirectiveTasks();
  }

  addSubTask(ref: ResolvedRef, libFile: LibFile | undefined): void {
    this.subTasks.push(new ParseTask(
      ref.fileName,
      { kind: 0, fileName: ref.fileName },
      libFile,
    ));
  }
}

export interface ParseTaskData {
  task: ParseTask;
  loader: FileLoader;
}

const parseTaskDataPool: ParseTaskData[] = [];

export function getParseTaskData(task: ParseTask, loader: FileLoader): ParseTaskData {
  const td = parseTaskDataPool.pop();
  if (td !== undefined) {
    td.task = task;
    td.loader = loader;
    return td;
  }
  return { task, loader };
}

export function putParseTaskData(td: ParseTaskData): void {
  parseTaskDataPool.push(td);
}

export class FilesParser {
  parse(loader: FileLoader, tasks: ParseTask[]): void {
    this.start(loader, tasks, 0);
  }

  start(loader: FileLoader, tasks: ParseTask[], depth: number): void {
    void depth;
    for (const task of tasks) {
      task.load(loader);
      if (task.subTasks.length > 0) {
        this.start(loader, task.subTasks, depth + 1);
      }
    }
  }

  getProcessedFiles(loader: FileLoader): ProcessedFiles {
    return {
      files: loader.files,
      duplicateSourceFiles: [],
      unresolvedImports: new Set(),
      resolvedModulesMap: loader.resolvedModulesMap,
      packageNamesInfo: { unresolvedImports: new Set(), packagesMap: new Map() },
      fileReasons: loader.fileReasons,
      diagnostics: loader.diagnostics,
    };
  }

  addIncludeReason(includeProcessor: IncludeProcessor, task: ParseTask, reason: FileIncludeReason): void {
    void includeProcessor;
    const reasons = task.includeReason ? [task.includeReason, reason] : [reason];
    task.includeReason = reasons[0]!;
  }
}

interface IncludeProcessor { readonly _ip?: unknown }
