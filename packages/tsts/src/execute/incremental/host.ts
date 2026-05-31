/**
 * Incremental build host helpers.
 *
 * Port of TS-Go `internal/execute/incremental/host.go`.
 */

import type { FS } from "../../vfs/index.js";

export interface Host {
  getMTime(fileName: string): Date | undefined;
  setMTime(fileName: string, mTime: Date): void;
}

export interface CompilerHostWithFS {
  fs(): FS;
}

class IncrementalHost implements Host {
  private readonly host: CompilerHostWithFS;

  constructor(host: CompilerHostWithFS) {
    this.host = host;
  }

  getMTime(fileName: string): Date | undefined {
    return getMTime(this.host, fileName);
  }

  setMTime(fileName: string, mTime: Date): void {
    this.host.fs().chtimes(fileName, new Date(0), mTime);
  }
}

export function createHost(compilerHost: CompilerHostWithFS): Host {
  return new IncrementalHost(compilerHost);
}

export function getMTime(host: CompilerHostWithFS, fileName: string): Date | undefined {
  const stat = host.fs().stat(fileName);
  if (stat === undefined) return undefined;
  return stat.mtime;
}
