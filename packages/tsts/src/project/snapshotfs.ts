export interface FileHandle {
  readonly fileName: string;
  readonly version: number;
  content(): string;
  lineMap(): readonly number[];
}

class TextFileHandle implements FileHandle {
  readonly fileName: string;
  readonly version: number;
  private readonly text: string;
  private cachedLineMap: readonly number[] | undefined;

  constructor(fileName: string, text: string, version: number) {
    this.fileName = fileName;
    this.text = text;
    this.version = version;
  }

  content(): string {
    return this.text;
  }

  lineMap(): readonly number[] {
    if (this.cachedLineMap !== undefined) return this.cachedLineMap;
    const starts = [0];
    for (let index = 0; index < this.text.length; index += 1) {
      const ch = this.text.charCodeAt(index);
      if (ch === 13) {
        if (this.text.charCodeAt(index + 1) === 10) index += 1;
        starts.push(index + 1);
      } else if (ch === 10) {
        starts.push(index + 1);
      }
    }
    this.cachedLineMap = starts;
    return starts;
  }
}

export class SnapshotFS {
  private readonly files = new Map<string, TextFileHandle>();
  private readonly closedFiles = new Set<string>();

  constructor(files?: Iterable<readonly [string, string]>) {
    if (files !== undefined) {
      for (const [fileName, content] of files) this.openFile(fileName, content, 0);
    }
  }

  openFile(fileName: string, content: string, version = 0): void {
    this.files.set(normalize(fileName), new TextFileHandle(fileName, content, version));
    this.closedFiles.delete(normalize(fileName));
  }

  closeFile(fileName: string): void {
    this.closedFiles.add(normalize(fileName));
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.files.get(normalize(fileName));
  }

  readFile(fileName: string): string | undefined {
    return this.getFile(fileName)?.content();
  }

  fileExists(fileName: string): boolean {
    return this.files.has(normalize(fileName));
  }

  directoryExists(path: string): boolean {
    const prefix = ensureTrailingSlash(normalize(path));
    for (const fileName of this.files.keys()) {
      if (fileName.startsWith(prefix)) return true;
    }
    return false;
  }

  getDirectories(path: string): readonly string[] {
    const prefix = ensureTrailingSlash(normalize(path));
    const directories = new Set<string>();
    for (const fileName of this.files.keys()) {
      if (!fileName.startsWith(prefix)) continue;
      const rest = fileName.slice(prefix.length);
      const slash = rest.indexOf("/");
      if (slash !== -1) directories.add(rest.slice(0, slash));
    }
    return [...directories].sort();
  }

  readDirectory(currentDir: string, path: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[], depth = Number.POSITIVE_INFINITY): readonly string[] {
    const root = resolve(currentDir, path);
    const prefix = ensureTrailingSlash(root);
    const excludeMatchers = excludes.map(globToRegExp);
    const includeMatchers = includes.map(globToRegExp);
    const out: string[] = [];
    for (const fileName of this.files.keys()) {
      if (!fileName.startsWith(prefix)) continue;
      const relative = fileName.slice(prefix.length);
      if (relative.split("/").length - 1 > depth) continue;
      if (extensions.length > 0 && !extensions.some(ext => fileName.endsWith(ext))) continue;
      if (excludeMatchers.some(rx => rx.test(relative))) continue;
      if (includeMatchers.length > 0 && !includeMatchers.some(rx => rx.test(relative))) continue;
      out.push(fileName);
    }
    return out.sort();
  }

  clone(): SnapshotFS {
    const clone = new SnapshotFS();
    for (const [fileName, handle] of this.files) clone.files.set(fileName, new TextFileHandle(handle.fileName, handle.content(), handle.version));
    for (const fileName of this.closedFiles) clone.closedFiles.add(fileName);
    return clone;
  }
}

function normalize(path: string): string {
  const parts: string[] = [];
  for (const part of path.replaceAll("\\", "/").split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function resolve(currentDir: string, path: string): string {
  return normalize(path.startsWith("/") ? path : `${currentDir}/${path}`);
}

function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function globToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[\\^$+?.()|[\]{}]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${escaped}$`);
}
