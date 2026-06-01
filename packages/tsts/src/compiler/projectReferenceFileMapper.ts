/**
 * Project-reference file mapper.
 *
 * Port of TS-Go `internal/compiler/projectreferencefilemapper.go`.
 * Owns the bidirectional map between project-reference source files,
 * declaration outputs, referenced config files, and symlinked declaration
 * realpaths used during parsing and module resolution.
 */

import type { CompilerOptionsHandle, ParsedCommandLine, SourceOutputAndProjectReference } from "../tsoptions/parsedCommandLine.js";
import {
  toPath,
  type Path,
} from "../tspath/index.js";

export interface ProjectReferenceMapperHost {
  fileExists(path: string): boolean;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  realpath(path: string): string;
}

export interface ProjectReferenceMapperOptions {
  readonly config: ParsedCommandLine;
  readonly host: ProjectReferenceMapperHost;
  readonly canUseProjectReferenceSource: boolean;
}

export interface ProjectReferenceMapperLoader {
  toPath(fileName: string): Path;
}

export interface HasFileName {
  readonly fileName?: unknown;
  readonly path?: unknown;
}

export interface RedirectForResolution {
  readonly redirect: ParsedCommandLine | undefined;
  readonly sourceFileName: string;
}

export class ProjectReferenceFileMapper {
  readonly opts: ProjectReferenceMapperOptions;
  loader: ProjectReferenceMapperLoader | undefined;

  readonly configToProjectReference = new Map<Path, ParsedCommandLine>();
  readonly referencesInConfigFile = new Map<Path, readonly Path[]>();
  readonly sourceToProjectReference = new Map<Path, SourceOutputAndProjectReference>();
  readonly outputDtsToProjectReference = new Map<Path, SourceOutputAndProjectReference>();

  private readonly realpathDtsToSource = new Map<Path, SourceOutputAndProjectReference | undefined>();

  constructor(opts: ProjectReferenceMapperOptions, loader?: ProjectReferenceMapperLoader) {
    this.opts = opts;
    this.loader = loader;
  }

  getParseFileRedirect(file: HasFileName): string {
    const filePath = this.pathOf(file);
    if (this.opts.canUseProjectReferenceSource) {
      const source = this.getProjectReferenceFromOutputDts(filePath) ?? this.getSourceToDtsIfSymlink(file);
      return source?.source ?? "";
    }

    const output = this.getProjectReferenceFromSource(filePath);
    return output?.outputDts !== "" ? output?.outputDts ?? "" : "";
  }

  getResolvedProjectReferences(): readonly ParsedCommandLine[] | undefined {
    const configFile = this.opts.config.configFile;
    if (configFile === undefined) return undefined;

    const refs = this.referencesInConfigFile.get(this.toPath(configFile.fileName));
    if (refs === undefined) return undefined;

    const result: ParsedCommandLine[] = [];
    for (const refPath of refs) {
      const refConfig = this.configToProjectReference.get(refPath);
      if (refConfig !== undefined) result.push(refConfig);
    }
    return result;
  }

  getProjectReferenceFromSource(path: Path | string): SourceOutputAndProjectReference | undefined {
    return this.sourceToProjectReference.get(this.canonicalPath(path));
  }

  getProjectReferenceFromOutputDts(path: Path | string): SourceOutputAndProjectReference | undefined {
    return this.outputDtsToProjectReference.get(this.canonicalPath(path));
  }

  isSourceFromProjectReference(path: Path | string): boolean {
    return this.opts.canUseProjectReferenceSource && this.getProjectReferenceFromSource(path) !== undefined;
  }

  getCompilerOptionsForFile(file: HasFileName): CompilerOptionsHandle {
    const redirect = this.getRedirectParsedCommandLineForResolution(file);
    return redirect?.parsedConfig.compilerOptions ?? this.opts.config.parsedConfig.compilerOptions;
  }

  getRedirectParsedCommandLineForResolution(file: HasFileName): ParsedCommandLine | undefined {
    return this.getRedirectForResolution(file).redirect;
  }

  getRedirectForResolution(file: HasFileName): RedirectForResolution {
    const filePath = this.pathOf(file);
    const output = this.getProjectReferenceFromSource(filePath);
    if (output !== undefined) {
      return { redirect: output.resolved, sourceFileName: output.source };
    }

    const resultFromDts = this.getProjectReferenceFromOutputDts(filePath);
    if (resultFromDts !== undefined) {
      return { redirect: resultFromDts.resolved, sourceFileName: resultFromDts.source };
    }

    const realpathDtsToSource = this.getSourceToDtsIfSymlink(file);
    if (realpathDtsToSource !== undefined) {
      return { redirect: realpathDtsToSource.resolved, sourceFileName: realpathDtsToSource.source };
    }

    return { redirect: undefined, sourceFileName: this.fileNameOf(file) };
  }

  getResolvedReferenceFor(path: Path | string): { config: ParsedCommandLine | undefined; ok: boolean } {
    const config = this.configToProjectReference.get(this.canonicalPath(path));
    return { config, ok: config !== undefined };
  }

  rangeResolvedProjectReference(
    callback: (path: Path, config: ParsedCommandLine | undefined, parent: ParsedCommandLine, index: number) => boolean,
  ): boolean {
    const configFile = this.opts.config.configFile;
    if (configFile === undefined) return false;
    const seenRef = new Set<Path>();
    const rootPath = this.toPath(configFile.fileName);
    seenRef.add(rootPath);
    return this.rangeResolvedReferenceWorker(
      this.referencesInConfigFile.get(rootPath) ?? [],
      callback,
      this.opts.config,
      seenRef,
    );
  }

  rangeResolvedProjectReferenceInChildConfig(
    childConfig: ParsedCommandLine | undefined,
    callback: (path: Path, config: ParsedCommandLine | undefined, parent: ParsedCommandLine, index: number) => boolean,
  ): boolean {
    if (childConfig?.configFile === undefined) return false;
    const seenRef = new Set<Path>();
    const childPath = this.toPath(childConfig.configFile.fileName);
    seenRef.add(childPath);
    return this.rangeResolvedReferenceWorker(
      this.referencesInConfigFile.get(childPath) ?? [],
      callback,
      this.opts.config,
      seenRef,
    );
  }

  getSourceToDtsIfSymlink(file: HasFileName): SourceOutputAndProjectReference | undefined {
    const filePath = this.pathOf(file);
    if (this.realpathDtsToSource.has(filePath)) {
      return this.realpathDtsToSource.get(filePath);
    }

    if (this.loader !== undefined && this.preserveSymlinks()) {
      const fileName = this.fileNameOf(file);
      if (!fileName.includes("/node_modules/")) {
        this.realpathDtsToSource.set(filePath, undefined);
      } else {
        const realDeclarationPath = this.loader.toPath(this.opts.host.realpath(fileName));
        if (realDeclarationPath === filePath) {
          this.realpathDtsToSource.set(filePath, undefined);
        } else {
          const realpathDtsToSource = this.getProjectReferenceFromOutputDts(realDeclarationPath);
          this.realpathDtsToSource.set(filePath, realpathDtsToSource);
          return realpathDtsToSource;
        }
      }
    }
    return undefined;
  }

  setResolvedReference(path: Path | string, config: ParsedCommandLine): void {
    this.configToProjectReference.set(this.canonicalPath(path), config);
  }

  setReferencesInConfigFile(configPath: Path | string, references: readonly (Path | string)[]): void {
    this.referencesInConfigFile.set(this.canonicalPath(configPath), references.map(path => this.canonicalPath(path)));
  }

  setSourceToProjectReference(path: Path | string, reference: SourceOutputAndProjectReference): void {
    this.sourceToProjectReference.set(this.canonicalPath(path), reference);
  }

  setOutputDtsToProjectReference(path: Path | string, reference: SourceOutputAndProjectReference): void {
    this.outputDtsToProjectReference.set(this.canonicalPath(path), reference);
  }

  private rangeResolvedReferenceWorker(
    references: readonly Path[],
    callback: (path: Path, config: ParsedCommandLine | undefined, parent: ParsedCommandLine, index: number) => boolean,
    parent: ParsedCommandLine,
    seenRef: Set<Path>,
  ): boolean {
    for (let index = 0; index < references.length; index++) {
      const path = references[index]!;
      if (seenRef.has(path)) continue;
      seenRef.add(path);

      const config = this.configToProjectReference.get(path);
      if (!callback(path, config, parent, index)) return false;
      if (config !== undefined) {
        const childReferences = this.referencesInConfigFile.get(path) ?? [];
        if (!this.rangeResolvedReferenceWorker(childReferences, callback, config, seenRef)) return false;
      }
    }
    return true;
  }

  private canonicalPath(path: Path | string): Path {
    return this.toPath(path);
  }

  private toPath(fileName: string): Path {
    return toPath(
      fileName,
      this.opts.host.getCurrentDirectory(),
      this.opts.host.useCaseSensitiveFileNames(),
    );
  }

  private fileNameOf(file: HasFileName): string {
    const fileName = file.fileName;
    if (typeof fileName === "function") return fileName.call(file) as string;
    return typeof fileName === "string" ? fileName : "";
  }

  private pathOf(file: HasFileName): Path {
    const path = file.path;
    if (typeof path === "function") return path.call(file) as Path;
    if (typeof path === "string") return path as Path;
    return this.toPath(this.fileNameOf(file));
  }

  private preserveSymlinks(): boolean {
    const compilerOptions = this.opts.config.parsedConfig.compilerOptions as CompilerOptionsHandle & {
      readonly preserveSymlinks?: boolean | number;
    };
    return compilerOptions.preserveSymlinks === true || compilerOptions.preserveSymlinks === 2;
  }
}

export function newProjectReferenceFileMapper(
  opts: ProjectReferenceMapperOptions,
  loader?: ProjectReferenceMapperLoader,
): ProjectReferenceFileMapper {
  return new ProjectReferenceFileMapper(opts, loader);
}
