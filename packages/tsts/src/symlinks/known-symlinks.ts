/**
 * Symlink tracking for module resolution.
 *
 * Port of TS-Go internal/symlinks/knownsymlinks.go.
 *
 * Tracks bidirectional mappings between symlinked paths and their realpaths,
 * for both directories and files. Used by module resolution to detect when
 * a path resolution crossed a symlink boundary.
 *
 * TS-Go uses sync.Map for concurrent access; TypeScript is single-threaded
 * so we use plain Map.
 *
 * NOTE: `setSymlinksFromResolutions` and `processResolution` depend on the
 * module-resolution data structures (`ResolvedModule`, etc.) which aren't
 * ported yet. The data-structure methods are complete; the resolution
 * integration is stubbed pending module/ port.
 */

import {
  containsIgnoredPath,
  ensureTrailingDirectorySeparator,
  getCanonicalFileName,
  getNormalizedAbsolutePath,
  getPathComponents,
  getPathFromPathComponents,
  type Path,
  toPath,
} from "../tspath/index.js";

export interface KnownDirectoryLink {
  /**
   * Matches the casing returned by `realpath`. Used to compute the realpath
   * of children. Always has a trailing directory separator.
   */
  readonly real: string;
  /**
   * toPath(real). Stored to avoid repeated recomputation.
   * Always has a trailing directory separator.
   */
  readonly realPath: Path;
}

export class KnownSymlinks {
  private readonly directories = new Map<Path, KnownDirectoryLink>();
  private readonly directoriesByRealpath = new Map<Path, Set<string>>();
  private readonly files = new Map<Path, string>();
  private readonly filesByRealpath = new Map<Path, Set<string>>();
  private readonly cwd: string;
  private readonly useCaseSensitiveFileNames: boolean;

  constructor(currentDirectory: string, useCaseSensitiveFileNames: boolean) {
    this.cwd = currentDirectory;
    this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
  }

  hasDirectory(symlinkPath: Path): boolean {
    return this.directories.has(ensureTrailingDirectorySeparator(symlinkPath) as Path);
  }

  /** Symlink path → realpath (directories). Keys have trailing separator. */
  getDirectories(): ReadonlyMap<Path, KnownDirectoryLink> {
    return this.directories;
  }

  getDirectoriesByRealpath(): ReadonlyMap<Path, ReadonlySet<string>> {
    return this.directoriesByRealpath;
  }

  /** Symlink path → realpath (files). */
  getFiles(): ReadonlyMap<Path, string> {
    return this.files;
  }

  /** Realpath → set of symlink strings. */
  getFilesByRealpath(): ReadonlyMap<Path, ReadonlySet<string>> {
    return this.filesByRealpath;
  }

  setDirectory(symlink: string, symlinkPath: Path, realDirectory: KnownDirectoryLink | undefined): void {
    if (realDirectory !== undefined) {
      if (!this.directories.has(symlinkPath)) {
        let set = this.directoriesByRealpath.get(realDirectory.realPath);
        if (set === undefined) {
          set = new Set();
          this.directoriesByRealpath.set(realDirectory.realPath, set);
        }
        set.add(symlink);
      }
    }
    if (realDirectory !== undefined) {
      this.directories.set(symlinkPath, realDirectory);
    } else {
      this.directories.delete(symlinkPath);
    }
  }

  setFile(symlink: string, symlinkPath: Path, realpath: string): void {
    if (!this.files.has(symlinkPath)) {
      const realpathPath = toPath(realpath, this.cwd, this.useCaseSensitiveFileNames);
      let set = this.filesByRealpath.get(realpathPath);
      if (set === undefined) {
        set = new Set();
        this.filesByRealpath.set(realpathPath, set);
      }
      set.add(symlink);
    }
    this.files.set(symlinkPath, realpath);
  }

  /**
   * Records a symlink mapping from a single `originalPath → resolvedFileName`
   * pair. The directory-level symlink is inferred by walking up common
   * suffixes until they diverge.
   */
  processResolution(originalPath: string, resolvedFileName: string): void {
    if (originalPath === "" || resolvedFileName === "") return;

    this.setFile(
      originalPath,
      toPath(originalPath, this.cwd, this.useCaseSensitiveFileNames),
      resolvedFileName
    );

    const guess = this.guessDirectorySymlink(resolvedFileName, originalPath);
    if (guess === undefined) return;
    const { commonResolved, commonOriginal } = guess;
    const symlinkPath = toPath(commonOriginal, this.cwd, this.useCaseSensitiveFileNames);
    if (containsIgnoredPath(symlinkPath)) return;

    this.setDirectory(
      commonOriginal,
      ensureTrailingDirectorySeparator(symlinkPath) as Path,
      {
        real: ensureTrailingDirectorySeparator(commonResolved),
        realPath: ensureTrailingDirectorySeparator(
          toPath(commonResolved, this.cwd, this.useCaseSensitiveFileNames)
        ) as Path,
      }
    );
  }

  private guessDirectorySymlink(a: string, b: string): { commonResolved: string; commonOriginal: string } | undefined {
    let aParts = [...getPathComponents(getNormalizedAbsolutePath(a, this.cwd), "")];
    let bParts = [...getPathComponents(getNormalizedAbsolutePath(b, this.cwd), "")];
    let isDirectory = false;

    while (
      aParts.length >= 2 &&
      bParts.length >= 2 &&
      !this.isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2]!) &&
      !this.isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2]!) &&
      getCanonicalFileName(aParts[aParts.length - 1]!, this.useCaseSensitiveFileNames) ===
        getCanonicalFileName(bParts[bParts.length - 1]!, this.useCaseSensitiveFileNames)
    ) {
      aParts = aParts.slice(0, -1);
      bParts = bParts.slice(0, -1);
      isDirectory = true;
    }

    if (isDirectory) {
      return {
        commonResolved: getPathFromPathComponents(aParts),
        commonOriginal: getPathFromPathComponents(bParts),
      };
    }
    return undefined;
  }

  private isNodeModulesOrScopedPackageDirectory(s: string): boolean {
    return s !== "" && (
      getCanonicalFileName(s, this.useCaseSensitiveFileNames) === "node_modules" ||
      s.startsWith("@")
    );
  }
}
