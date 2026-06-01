/**
 * LSP logger surface.
 *
 * Port of TS-Go `internal/lsp/logger.go`.
 */

export interface Logger {
  log(message: string): void;
  error(message: string): void;
}

export class BufferLogger implements Logger {
  readonly lines: string[] = [];

  log(message: string): void {
    this.lines.push(message);
  }

  error(message: string): void {
    this.lines.push(`Error: ${message}`);
  }
}

export function noopLogger(): Logger {
  return {
    log(_message: string): void {},
    error(_message: string): void {},
  };
}
