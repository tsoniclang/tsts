/**
 * Project-reference .d.ts faking host.
 *
 * Port of TS-Go `internal/compiler/projectreferencedtsfakinghost.go`.
 * Wraps a compiler host so module resolution can observe declaration files
 * that are produced by a referenced project even when only the source file is
 * present on disk.
 */

import type { CompilerHost } from "./host.js";
import { ProjectReferenceFileMapper } from "./projectReferenceFileMapper.js";
import { KnownSymlinks, type KnownDirectoryLink } from "../symlinks/index.js";
import {
  containsIgnoredPath,
  ensureTrailingDirectorySeparator,
  getNormalizedAbsolutePath,
  isDeclarationFileName,
  toPath,
  type Path,
} from "../tspath/index.js";

export interface ProjectReferenceDtsFakingLoader {
  readonly host: CompilerHost;
  readonly projectReferenceFileMapper: ProjectReferenceFileMapper;
  readonly dtsDirectories: ReadonlySet<Path>;
}

export class ProjectReferenceDtsFakingHost implements CompilerHost {
  private readonly host: CompilerHost;
  private readonly fs: ProjectReferenceDtsFakingVfs;

  constructor(host: CompilerHost, fs: ProjectReferenceDtsFakingVfs) {
    this.host = host;
    this.fs = fs;
  }

  fileExists(path: string): boolean { return this.fs.fileExists(path); }

  readFile(path: string): { content: string; ok: boolean } {
    return this.host.readFile(path);
  }

  writeFile(path: string, data: string, writeByteOrderMark: boolean): boolean {
    void path; void data; void writeByteOrderMark;
    throw new Error("ProjectReferenceDtsFakingHost.writeFile must not be called by module resolution");
  }

  getCurrentDirectory(): string { return this.host.getCurrentDirectory(); }
  useCaseSensitiveFileNames(): boolean { return this.host.useCaseSensitiveFileNames(); }
  getDefaultLibFileName(): string { return this.host.getDefaultLibFileName(); }
  getCanonicalFileName(path: string): string { return this.host.getCanonicalFileName(path); }
  getNewLine(): string { return this.host.getNewLine(); }
  realpath(path: string): string { return this.fs.realpath(path); }
  directoryExists(path: string): boolean { return this.fs.directoryExists(path); }
  getDirectories(path: string): readonly string[] { return this.host.getDirectories(path); }
}

export class ProjectReferenceDtsFakingVfs {
  private readonly sourceHost: CompilerHost;
  private readonly projectReferenceFileMapper: ProjectReferenceFileMapper;
  private readonly dtsDirectories: ReadonlySet<Path>;
  private readonly knownSymlinks: KnownSymlinks;

  constructor(sourceHost: CompilerHost, projectReferenceFileMapper: ProjectReferenceFileMapper, dtsDirectories: ReadonlySet<Path>) {
    this.sourceHost = sourceHost;
    this.projectReferenceFileMapper = projectReferenceFileMapper;
    this.dtsDirectories = dtsDirectories;
    this.knownSymlinks = new KnownSymlinks(
      this.host().getCurrentDirectory(),
      this.host().useCaseSensitiveFileNames(),
    );
  }

  useCaseSensitiveFileNames(): boolean {
    return this.host().useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    if (this.host().fileExists(path)) return true;
    if (!isDeclarationFileName(path)) return false;
    return this.fileOrDirectoryExistsUsingSource(path, true);
  }

  readFile(path: string): { content: string; ok: boolean } {
    return this.host().readFile(path);
  }

  directoryExists(path: string): boolean {
    if (this.host().directoryExists(path)) {
      this.handleDirectoryCouldBeSymlink(path);
      return true;
    }
    return this.fileOrDirectoryExistsUsingSource(path, false);
  }

  realpath(path: string): string {
    return this.knownSymlinks.getFiles().get(this.pathOf(path)) ?? this.host().realpath(path);
  }

  private host(): CompilerHost {
    return this.sourceHost;
  }

  private pathOf(path: string): Path {
    return toPath(
      path,
      this.host().getCurrentDirectory(),
      this.host().useCaseSensitiveFileNames(),
    );
  }

  private handleDirectoryCouldBeSymlink(directory: string): void {
    if (containsIgnoredPath(directory)) return;
    if (!directory.includes("/node_modules/")) return;

    const directoryPath = ensureTrailingDirectorySeparator(this.pathOf(directory)) as Path;
    if (this.knownSymlinks.getDirectories().has(directoryPath)) return;

    const realDirectory = this.realpath(directory);
    if (realDirectory === directory) return;

    const realPath = ensureTrailingDirectorySeparator(this.pathOf(realDirectory)) as Path;
    if (realPath === directoryPath) return;

    const link: KnownDirectoryLink = {
      real: ensureTrailingDirectorySeparator(realDirectory),
      realPath,
    };
    this.knownSymlinks.setDirectory(directory, directoryPath, link);
  }

  private fileOrDirectoryExistsUsingSource(fileOrDirectory: string, isFile: boolean): boolean {
    const direct = isFile
      ? this.fileExistsIfProjectReferenceDts(fileOrDirectory)
      : this.directoryExistsIfProjectReferenceDeclDir(fileOrDirectory);
    if (direct !== undefined) return direct;

    const knownDirectoryLinks = this.knownSymlinks.getDirectories();
    if (knownDirectoryLinks.size === 0) return false;

    const fileOrDirectoryPath = this.pathOf(fileOrDirectory);
    if (!fileOrDirectoryPath.includes("/node_modules/")) return false;
    if (isFile && this.knownSymlinks.getFiles().has(fileOrDirectoryPath)) return true;

    for (const [directoryPath, knownDirectoryLink] of knownDirectoryLinks) {
      if (!fileOrDirectoryPath.startsWith(directoryPath)) continue;
      const relative = fileOrDirectoryPath.slice(directoryPath.length);
      const realCandidate = knownDirectoryLink.realPath + relative;
      const exists = isFile
        ? this.fileExistsIfProjectReferenceDts(realCandidate)
        : this.directoryExistsIfProjectReferenceDeclDir(realCandidate);
      if (exists !== true) continue;

      if (isFile) {
        const absolutePath = getNormalizedAbsolutePath(fileOrDirectory, this.host().getCurrentDirectory());
        this.knownSymlinks.setFile(
          absolutePath,
          fileOrDirectoryPath,
          knownDirectoryLink.real + absolutePath.slice(directoryPath.length),
        );
      }
      return true;
    }

    return false;
  }

  private fileExistsIfProjectReferenceDts(file: string): boolean | undefined {
    const source = this.projectReferenceFileMapper.getProjectReferenceFromOutputDts(this.pathOf(file));
    if (source === undefined) return undefined;
    return this.host().fileExists(source.source);
  }

  private directoryExistsIfProjectReferenceDeclDir(dir: string): boolean | undefined {
    const dirPath = this.pathOf(dir);
    const dirPathWithTrailingDirectorySeparator = ensureTrailingDirectorySeparator(dirPath);

    for (const declDirPath of this.dtsDirectories) {
      if (
        dirPath === declDirPath ||
        declDirPath.startsWith(dirPathWithTrailingDirectorySeparator) ||
        dirPath.startsWith(ensureTrailingDirectorySeparator(declDirPath))
      ) {
        return true;
      }
    }
    return undefined;
  }
}

export function newProjectReferenceDtsFakingHost(
  loader: ProjectReferenceDtsFakingLoader,
): ProjectReferenceDtsFakingHost {
  const fs = new ProjectReferenceDtsFakingVfs(
    loader.host,
    loader.projectReferenceFileMapper,
    loader.dtsDirectories,
  );
  return new ProjectReferenceDtsFakingHost(loader.host, fs);
}
