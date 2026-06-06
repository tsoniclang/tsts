import type { int } from "@tsonic/core/types.js";
import type { GoError, GoSlice } from "./compat.js";
import * as nodeFs from "node:fs";
import * as nodeOs from "node:os";
import * as nodePath from "node:path";
import process from "node:process";
import { NodeFS } from "./io/fs.js";
import type { FileInfo, FS } from "./io/fs.js";

export const Args: GoSlice<string> = process.argv;
export const Stdin: unknown = process.stdin;
export const Stdout: unknown = process.stdout;
export const Stderr: unknown = process.stderr;
export const Interrupt = "SIGINT";
export const PathError = Error;

export const O_APPEND: int = nodeFs.constants.O_APPEND as int;
export const O_CREATE: int = nodeFs.constants.O_CREAT as int;
export const O_TRUNC: int = nodeFs.constants.O_TRUNC as int;
export const O_WRONLY: int = nodeFs.constants.O_WRONLY as int;

export interface File {
  WriteString(s: string): [int, GoError];
  Close(): GoError;
}

class NodeFile implements File {
  constructor(private readonly fd: int) {}

  WriteString(s: string): [int, GoError] {
    try {
      return [nodeFs.writeSync(this.fd, s, undefined, "utf8") as int, undefined];
    } catch (error) {
      return [0 as int, normalizeError(error)];
    }
  }

  Close(): GoError {
    try {
      nodeFs.closeSync(this.fd);
      return undefined;
    } catch (error) {
      return normalizeError(error);
    }
  }
}

export function DirFS(root: string): FS {
  return NodeFS(root);
}

export function Environ(): GoSlice<string> {
  return Object.entries(process.env).map(([key, value]) => `${key}=${value ?? ""}`);
}

export function Executable(): [string, GoError] {
  return [process.execPath, undefined];
}

export function Exit(code: int): never {
  process.exit(code);
}

export function Getenv(key: string): string {
  return process.env[key] ?? "";
}

export function Getpid(): int {
  return process.pid as int;
}

export function Getwd(): [string, GoError] {
  try {
    return [process.cwd(), undefined];
  } catch (error) {
    return ["", normalizeError(error)];
  }
}

export function IsNotExist(err: GoError): boolean {
  return err !== undefined && (err as NodeJS.ErrnoException).code === "ENOENT";
}

export function MkdirAll(path: string, perm: int): GoError {
  try {
    nodeFs.mkdirSync(path, { mode: perm, recursive: true });
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

export function Open(path: string): [File, GoError] {
  return OpenFile(path, nodeFs.constants.O_RDONLY as int, 0 as int);
}

export function OpenFile(path: string, flag: int, perm: int): [File, GoError] {
  try {
    return [new NodeFile(nodeFs.openSync(path, flag, perm) as int), undefined];
  } catch (error) {
    return [undefined as unknown as File, normalizeError(error)];
  }
}

export function Create(path: string): [File, GoError] {
  return OpenFile(path, (nodeFs.constants.O_CREAT | nodeFs.constants.O_TRUNC | nodeFs.constants.O_WRONLY) as int, 0o666 as int);
}

export function ReadDir(path: string): [GoSlice<nodeFs.Dirent>, GoError] {
  try {
    return [nodeFs.readdirSync(path, { withFileTypes: true }), undefined];
  } catch (error) {
    return [[], normalizeError(error)];
  }
}

export function ReadFile(path: string): [string, GoError] {
  try {
    return [nodeFs.readFileSync(path, "utf8"), undefined];
  } catch (error) {
    return ["", normalizeError(error)];
  }
}

export function Remove(path: string): GoError {
  try {
    nodeFs.rmSync(path, { force: true });
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

export function RemoveAll(path: string): GoError {
  try {
    nodeFs.rmSync(path, { force: true, recursive: true });
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

export function Stat(path: string): [FileInfo, GoError] {
  try {
    const stats = nodeFs.statSync(path);
    return [{
      Name: () => nodePath.basename(path),
      Size: () => stats.size as int,
      Mode: () => (stats.isDirectory() ? 0x80000000 : (stats.mode & 0o777)) as unknown as import("./io/fs.js").FileMode,
      ModTime: () => stats.mtime,
      IsDir: () => stats.isDirectory(),
      Sys: () => stats,
    }, undefined];
  } catch (error) {
    return [undefined as unknown as FileInfo, normalizeError(error)];
  }
}

export function Symlink(oldname: string, newname: string): GoError {
  try {
    nodeFs.symlinkSync(oldname, newname);
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

export function TempDir(): string {
  return nodeOs.tmpdir();
}

export function UserCacheDir(): [string, GoError] {
  const cacheRoot = process.env.XDG_CACHE_HOME ?? nodePath.join(nodeOs.homedir(), ".cache");
  return [cacheRoot, undefined];
}

export function UserHomeDir(): [string, GoError] {
  return [nodeOs.homedir(), undefined];
}

export function WriteFile(path: string, data: string, perm: int): GoError {
  try {
    nodeFs.writeFileSync(path, data, { encoding: "utf8", mode: perm });
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

export function Chtimes(path: string, aTime: unknown, mTime: unknown): GoError {
  try {
    nodeFs.utimesSync(path, toDate(aTime), toDate(mTime));
    return undefined;
  } catch (error) {
    return normalizeError(error);
  }
}

function toDate(value: unknown): Date {
  return value instanceof Date ? value : new Date();
}

function normalizeError(error: unknown): GoError {
  if (error instanceof globalThis.Error) {
    return error;
  }
  return new globalThis.Error(String(error));
}
