/**
 * Synchronous connection implementation.
 *
 * Port of TS-Go `internal/api/conn_sync.go` (~159 LoC). Single-threaded
 * connection that processes one message at a time. Used in environments
 * where goroutine-style concurrency isn't available.
 */

import type { Connection } from "./conn.js";

export class SyncConnection implements Connection {
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
  }

  async runLoop(handle: (chunk: Uint8Array) => Promise<void>): Promise<void> {
    while (!this.closed) {
      const chunk = await this.read();
      if (chunk === undefined) break;
      await handle(chunk);
    }
  }
}

export function newSyncConnection(
  write: (chunk: Uint8Array) => Promise<void>,
  read: () => Promise<Uint8Array | undefined>,
): SyncConnection {
  return new SyncConnection(write, read);
}
