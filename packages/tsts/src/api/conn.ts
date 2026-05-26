/**
 * RPC connection abstraction.
 *
 * Port of TS-Go `internal/api/conn.go` (~46 LoC). Defines the
 * Connection interface that decouples the session from the underlying
 * transport (stdio, pipe, sync, async).
 */

export interface Connection {
  send(message: Uint8Array): Promise<void>;
  receive(): Promise<Uint8Array | undefined>;
  close(): Promise<void>;
}

export interface ConnectionFactory {
  newConnection(): Connection;
}
