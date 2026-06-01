export interface TestFileSystemEntry {
  readonly path: string;
  readonly content?: string;
}

export interface TestFileSystem {
  readonly files: readonly TestFileSystemEntry[];
}

export interface BuildInfoLike {
  version?: string;
  readonly [key: string]: unknown;
}

export interface TestFsHost {
  readFile(path: string): string | undefined;
  writeFile(path: string, text: string): void;
  remove(path: string): void;
}

export class TscTestFileSystem {
  readonly defaultLibs = new Set<string>();
  readonly writtenFiles = new Set<string>();
  private readonly host: TestFsHost;
  private readonly currentVersion: string;
  private readonly fakeVersion: string;

  constructor(host: TestFsHost, currentVersion: string, fakeVersion: string) {
    this.host = host;
    this.currentVersion = currentVersion;
    this.fakeVersion = fakeVersion;
  }

  readFile(path: string): string | undefined {
    this.removeIgnoreLibPath(path);
    return this.readFileHandlingBuildInfo(path);
  }

  writeFile(path: string, data: string): void {
    this.removeIgnoreLibPath(path);
    this.writtenFiles.add(path);
    this.writeFileHandlingBuildInfo(path, data);
  }

  remove(path: string): void {
    this.removeIgnoreLibPath(path);
    this.host.remove(path);
  }

  private removeIgnoreLibPath(path: string): void {
    this.defaultLibs.delete(path);
  }

  private readFileHandlingBuildInfo(path: string): string | undefined {
    const contents = this.host.readFile(path);
    if (contents === undefined || !isBuildInfoPath(path)) return contents;
    const buildInfo = parseBuildInfo(contents);
    if (buildInfo === undefined || buildInfo.version !== this.fakeVersion) return contents;
    return JSON.stringify({ ...buildInfo, version: this.currentVersion });
  }

  private writeFileHandlingBuildInfo(path: string, data: string): void {
    if (!isBuildInfoPath(path)) {
      this.host.writeFile(path, data);
      return;
    }

    const buildInfo = parseBuildInfo(data);
    if (buildInfo === undefined) {
      throw new Error("testFs.WriteFile: failed to unmarshal build info; use the underlying file system for intentionally invalid build-info text");
    }

    const stored = buildInfo.version === this.currentVersion
      ? JSON.stringify({ ...buildInfo, version: this.fakeVersion })
      : data;
    this.host.writeFile(path, stored);
    this.host.writeFile(`${path}.readable.baseline.txt`, JSON.stringify(buildInfo, undefined, 2));
  }
}

export class MapTestFsHost implements TestFsHost {
  private readonly files = new Map<string, string>();

  constructor(files: readonly TestFileSystemEntry[] = []) {
    for (const file of files) {
      if (file.content !== undefined) this.files.set(file.path, file.content);
    }
  }

  readFile(path: string): string | undefined {
    return this.files.get(path);
  }

  writeFile(path: string, text: string): void {
    this.files.set(path, text);
  }

  remove(path: string): void {
    this.files.delete(path);
  }

  snapshot(): readonly TestFileSystemEntry[] {
    return [...this.files.entries()].map(([path, content]) => ({ path, content }));
  }
}

function isBuildInfoPath(path: string): boolean {
  return path.endsWith(".tsbuildinfo");
}

function parseBuildInfo(text: string): BuildInfoLike | undefined {
  try {
    const value = JSON.parse(text) as unknown;
    return typeof value === "object" && value !== null ? value as BuildInfoLike : undefined;
  } catch {
    return undefined;
  }
}
