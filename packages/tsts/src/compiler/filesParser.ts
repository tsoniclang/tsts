/**
 * Parallel files parser.
 *
 * Substantive port of TS-Go `internal/compiler/filesparser.go` (~549 LoC).
 * Orchestrates parsing of all program files (root + lib + reference)
 * potentially in parallel via a work-stealing parse pool.
 */

import type { Node as AstNode, SourceFile, Diagnostic } from "../ast/index.js";
import { normalizePath } from "../tspath/index.js";
import {
  FileIncludeKind,
  type FileLoader,
  type JsxRuntimeImportSpecifier,
  type LibFile,
  type FileIncludeReason,
  type ProcessedFiles,
  type ResolvedModule,
  type ResolvedTypeReferenceDirective,
} from "./fileLoader.js";

export interface ResolvedRef {
  fileName: string;
  isExternalLibraryImport?: boolean;
  increaseDepth?: boolean;
  elideOnDepth?: boolean;
  includeReason?: FileIncludeReason;
  packageId?: unknown;
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
  typeResolutions: Map<string, ResolvedTypeReferenceDirective> = new Map();
  metadata: SourceFileMetaData | undefined;
  processingDiagnostics: Diagnostic[] = [];
  importHelpersImportSpecifier: AstNode | undefined;
  jsxRuntimeImportSpecifier: JsxRuntimeImportSpecifier | undefined;
  loaded = false;
  startedSubTasks = false;
  isForAutomaticTypeDirective = false;
  increaseDepth = false;
  elideOnDepth = false;
  loadedTask: ParseTask | undefined;
  packageId: unknown;
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

    const redirect = parseFileRedirect(loader, this);
    if (redirect !== "") {
      this.redirect(loader, redirect);
      return;
    }

    this.metadata = loader.loadSourceFileMetaData(this.normalizedFilePath);
    const taskForLoader = {
      fileName: this.normalizedFilePath,
      normalizedFilePath: this.normalizedFilePath,
      path: this.path_,
      libFile: this.libFile,
      includeReason: this.includeReason,
      isForAutomaticTypeDirective: false,
      depth: 0,
      elideOnDepth: this.elideOnDepth,
      packageId: this.packageId,
      metadata: this.metadata,
    };
    this.parsedFile = loader.parseSourceFile(taskForLoader as Parameters<FileLoader["parseSourceFile"]>[0]);
    if (this.parsedFile === undefined) return;

    const compilerOptions = loader.options;
    if (compilerOptions.noResolve !== 2) {
      for (let index = 0; index < this.parsedFile.referencedFiles.length; index++) {
        const ref = this.parsedFile.referencedFiles[index]!;
        const resolved = loader.resolveTripleslashPathReference(ref.fileName, this.parsedFile.fileName, index);
        if (resolved.resolved !== undefined) {
          this.addSubTask({
            fileName: resolved.resolved.fileName,
            includeReason: {
              kind: FileIncludeKind.ReferenceFile,
              referencingFile: this.parsedFile.fileName,
              ref,
            },
          }, undefined);
        }
      }
      const mutableTask = taskForLoader as Parameters<FileLoader["resolveTypeReferenceDirectives"]>[0];
      mutableTask.file = this.parsedFile;
      loader.resolveTypeReferenceDirectives(mutableTask);
      this.typeResolutions = mutableTask.typeResolutionsInFile ?? new Map();
    }

    if (compilerOptions.noLib !== 2) {
      for (let index = 0; index < this.parsedFile.libReferenceDirectives.length; index++) {
        const lib = this.parsedFile.libReferenceDirectives[index]!;
        const libName = loader.pathForLibFile(lib.fileName);
        if (libName !== undefined) {
          this.addSubTask({
            fileName: libName.path,
            includeReason: {
              kind: FileIncludeKind.LibReferenceDirective,
              referencingFile: this.parsedFile.fileName,
              ref: lib,
            },
          }, libName);
        }
      }
    }
  }

  redirect(loader: FileLoader, fileName: string): void {
    void loader;
    this.redirectedParseTask = new ParseTask(fileName, this.includeReason, this.libFile);
    this.subTasks = [this.redirectedParseTask];
  }

  loadAutomaticTypeDirectives(loader: FileLoader): void {
    const result = loader.resolveAutomaticTypeDirectives(this.normalizedFilePath);
    this.typeResolutions = result.resolutions;
    for (const ref of result.directives) {
      this.addSubTask(ref, undefined);
    }
  }

  addSubTask(ref: ResolvedRef, libFile: LibFile | undefined): void {
    const task = new ParseTask(
      ref.fileName,
      ref.includeReason ?? { kind: 0, fileName: ref.fileName },
      libFile,
    );
    task.increaseDepth = ref.increaseDepth === true;
    task.elideOnDepth = ref.elideOnDepth === true;
    task.packageId = ref.packageId;
    this.subTasks.push(task);
  }
}

export interface ParseTaskData {
  readonly tasks: Map<string, ParseTask>;
  lowestDepth: number;
  startedSubTasks: boolean;
  packageId: unknown;
}

const parseTaskDataPool: ParseTaskData[] = [];

export function getParseTaskData(task: ParseTask): ParseTaskData {
  const td = parseTaskDataPool.pop();
  if (td !== undefined) {
    td.tasks.set(task.normalizedFilePath, task);
    td.lowestDepth = Number.MAX_SAFE_INTEGER;
    td.startedSubTasks = false;
    td.packageId = undefined;
    return td;
  }
  return {
    tasks: new Map([[task.normalizedFilePath, task]]),
    lowestDepth: Number.MAX_SAFE_INTEGER,
    startedSubTasks: false,
    packageId: undefined,
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

      if (data.packageId === undefined && task.packageId !== undefined) data.packageId = task.packageId;
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
    const orderedFiles: SourceFile[] = [];
    const orderedLibFiles: SourceFile[] = [];
    const typeResolutionsInFile = new Map<string, Map<string, ResolvedTypeReferenceDirective>>();
    const jsxRuntimeImportSpecifiers = new Map<string, JsxRuntimeImportSpecifier>();
    const importHelpersImportSpecifiers = new Map<string, AstNode>();
    const libFiles = new Map<string, LibFile>();

    for (const file of loader.files) {
      const path = loader.toPath(file.fileName);
      const previous = seenByPath.get(path);
      if (previous !== undefined && previous.fileName !== file.fileName) {
        duplicateSourceFiles.push({ file, reason: `File casing differs from ${previous.fileName}` });
      } else {
        seenByPath.set(path, file);
      }
    }

    const collect = (task: ParseTask, seen: Set<ParseTask>): void => {
      const actualTask = task.loadedTask ?? task;
      if (seen.has(actualTask)) return;
      seen.add(actualTask);
      this.addIncludeReason({ addReason: (fileName, reason) => {
        const existing = loader.fileReasons.get(fileName);
        if (existing === undefined) loader.fileReasons.set(fileName, [reason]);
        else existing.push(reason);
      } }, actualTask, task.includeReason);

      if (actualTask.redirectedParseTask !== undefined) {
        collect(actualTask.redirectedParseTask, seen);
        return;
      }
      for (const subTask of actualTask.subTasks) collect(subTask, seen);

      if (actualTask.isForAutomaticTypeDirective) {
        typeResolutionsInFile.set(actualTask.path_, actualTask.typeResolutions);
        return;
      }
      const parsedFile = actualTask.parsedFile;
      if (parsedFile === undefined) return;
      seenByPath.set(actualTask.path_, parsedFile);
      if (actualTask.libFile !== undefined) {
        orderedLibFiles.push(parsedFile);
        libFiles.set(actualTask.path_, actualTask.libFile);
      } else {
        orderedFiles.push(parsedFile);
      }
      if (actualTask.typeResolutions.size > 0) typeResolutionsInFile.set(actualTask.path_, actualTask.typeResolutions);
      if (actualTask.importHelpersImportSpecifier !== undefined) importHelpersImportSpecifiers.set(actualTask.path_, actualTask.importHelpersImportSpecifier);
      if (actualTask.jsxRuntimeImportSpecifier !== undefined) jsxRuntimeImportSpecifiers.set(actualTask.path_, actualTask.jsxRuntimeImportSpecifier);
    };

    for (const task of loader.rootTasks as unknown as ParseTask[]) collect(task, new Set());
    if (orderedFiles.length === 0 && orderedLibFiles.length === 0) {
      orderedFiles.push(...loader.files.filter(file => !loader.libFiles.has(loader.toPath(file.fileName))));
      orderedLibFiles.push(...loader.files.filter(file => loader.libFiles.has(loader.toPath(file.fileName))));
      for (const [path, libFile] of loader.libFiles) libFiles.set(path, libFile);
    }
    loader.sortLibs(orderedLibFiles);

    return {
      files: [...orderedLibFiles, ...orderedFiles],
      duplicateSourceFiles,
      filesByPath: seenByPath,
      unresolvedImports: new Set(loader.unresolvedImports),
      resolvedModulesMap: loader.resolvedModulesMap,
      typeResolutionsInFile: typeResolutionsInFile.size === 0 ? loader.typeResolutionsInFile : typeResolutionsInFile,
      jsxRuntimeImportSpecifiers: jsxRuntimeImportSpecifiers.size === 0 ? loader.jsxRuntimeImportSpecifiers : jsxRuntimeImportSpecifiers,
      importHelpersImportSpecifiers: importHelpersImportSpecifiers.size === 0 ? loader.importHelpersImportSpecifiers : importHelpersImportSpecifiers,
      libFiles: libFiles.size === 0 ? loader.libFiles : libFiles,
      packageNamesInfo: { unresolvedImports: new Set(loader.unresolvedImports), packagesMap: new Map() },
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

interface SourceFileMetaData {
  readonly packageJsonType?: string;
  readonly packageJsonDirectory?: string;
  readonly impliedNodeFormat?: number;
}

function parseFileRedirect(loader: FileLoader, task: ParseTask): string {
  const mapper = loader as unknown as {
    projectReferenceFileMapper?: { getParseFileRedirect(task: ParseTask): string };
  };
  return mapper.projectReferenceFileMapper?.getParseFileRedirect(task) ?? "";
}
