/**
 * Async connection implementation.
 *
 * Port of TS-Go `internal/api/conn_async.go` (~182 LoC). Provides an
 * async (goroutine-backed in Go) connection that allows interleaved
 * request/response processing without blocking on the transport.
 */

import type { Connection } from "./conn.js";

export class AsyncConnection implements Connection {
  pending: Array<{ resolve: (data: Uint8Array | undefined) => void; reject: (e: unknown) => void }> = [];
  closed = false;
  readonly write: (chunk: Uint8Array) => Promise<void>;
  readonly read: () => Promise<Uint8Array | undefined>;

  constructor(
    write: (chunk: Uint8Array) => Promise<void>,
    read: () => Promise<Uint8Array | undefined>,
  ) {
    this.write = write;
    this.read = read;
  }

  async send(message: Uint8Array): Promise<void> {
    if (this.closed) throw new Error("connection closed");
    await this.write(message);
  }

  async receive(): Promise<Uint8Array | undefined> {
    if (this.closed) return undefined;
    return this.read();
  }

  async close(): Promise<void> {
    this.closed = true;
    while (this.pending.length > 0) {
      const p = this.pending.shift()!;
      p.resolve(undefined);
    }
  }

  startReadLoop(handle: (chunk: Uint8Array) => void): void {
    void (async () => {
      while (!this.closed) {
        const chunk = await this.read();
        if (chunk === undefined) break;
        handle(chunk);
      }
    })();
  }
}

export function newAsyncConnection(
  write: (chunk: Uint8Array) => Promise<void>,
  read: () => Promise<Uint8Array | undefined>,
): AsyncConnection {
  return new AsyncConnection(write, read);
}
