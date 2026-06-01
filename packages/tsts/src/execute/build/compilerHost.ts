/**
 * Build compiler-host adapter.
 *
 * Port of TS-Go `internal/execute/build/compilerHost.go`: the build host is
 * adapted to the compiler-facing host contract without duplicating file-system,
 * default-library, source-file, or project-reference logic.
 */

export interface BuildHostLike {
  fs(): unknown;
  defaultLibraryPath(): string;
  getCurrentDirectory(): string;
  getSourceFile(options: SourceFileParseOptions): unknown;
  getResolvedProjectReference(fileName: string, path: string): unknown;
}

export interface SourceFileParseOptions {
  readonly fileName: string;
  readonly path?: string;
  readonly scriptKind?: unknown;
}

export interface BuildCompilerHost {
  fs(): unknown;
  defaultLibraryPath(): string;
  getCurrentDirectory(): string;
  trace(message: unknown, ...args: readonly unknown[]): void;
  getSourceFile(options: SourceFileParseOptions): unknown;
  getResolvedProjectReference(fileName: string, path: string): unknown;
}

export function createBuildCompilerHost(host: BuildHostLike, trace: (message: unknown, ...args: readonly unknown[]) => void = () => {}): BuildCompilerHost {
  return new CompilerHostAdapter(host, trace);
}

export class CompilerHostAdapter implements BuildCompilerHost {
  readonly #host: BuildHostLike;
  readonly #trace: (message: unknown, ...args: readonly unknown[]) => void;

  constructor(host: BuildHostLike, trace: (message: unknown, ...args: readonly unknown[]) => void) {
    this.#host = host;
    this.#trace = trace;
  }

  fs(): unknown {
    return this.#host.fs();
  }

  defaultLibraryPath(): string {
    return this.#host.defaultLibraryPath();
  }

  getCurrentDirectory(): string {
    return this.#host.getCurrentDirectory();
  }

  trace(message: unknown, ...args: readonly unknown[]): void {
    this.#trace(message, ...args);
  }

  getSourceFile(options: SourceFileParseOptions): unknown {
    return this.#host.getSourceFile(options);
  }

  getResolvedProjectReference(fileName: string, path: string): unknown {
    return this.#host.getResolvedProjectReference(fileName, path);
  }
}
