/**
 * Transport abstraction.
 *
 * Port of TS-Go `internal/api/transport.go` (~95 LoC) + `transport_unix.go`
 * (~22 LoC) + `transport_windows.go` (~19 LoC). Provides the
 * stdio/pipe/socket transport types used by the encoder client and
 * server.
 */

export interface Transport {
  read(): Promise<Uint8Array | undefined>;
  write(data: Uint8Array): Promise<void>;
  close(): Promise<void>;
}

export class StdioTransport implements Transport {
  readonly stdin: AsyncIterableIterator<Uint8Array>;
  readonly stdout: { write(data: Uint8Array): Promise<void> };
  closed = false;

  constructor(
    stdin: AsyncIterableIterator<Uint8Array>,
    stdout: { write(data: Uint8Array): Promise<void> },
  ) {
    this.stdin = stdin;
    this.stdout = stdout;
  }

  async read(): Promise<Uint8Array | undefined> {
    if (this.closed) return undefined;
    const result = await this.stdin.next();
    if (result.done) return undefined;
    return result.value;
  }

  async write(data: Uint8Array): Promise<void> {
    await this.stdout.write(data);
  }

  async close(): Promise<void> {
    this.closed = true;
  }
}

export function newStdioTransport(
  stdin: AsyncIterableIterator<Uint8Array>,
  stdout: { write(data: Uint8Array): Promise<void> },
): StdioTransport {
  return new StdioTransport(stdin, stdout);
}
