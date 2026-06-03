/**
 * API server runtime.
 *
 * Port of TS-Go `internal/api/server.go` (~114 LoC). Glues a Session
 * to a transport + connection, decoding incoming requests, routing
 * through Session.HandleRequest, and writing responses back.
 */

import { Session } from "./session.js";
import type { Connection } from "./conn.js";
import type { MsgpackProtocolHandler } from "./protocolMsgpack.js";
import type { CallbackName } from "./callbackFs.js";

export interface ServerOptions {
  session: Session;
  connection: Connection;
  protocol: MsgpackProtocolHandler;
}

// Readable/writable stream handles wrapping the process stdio. These model the
// Go `io.ReadCloser` / `io.WriteCloser` / `io.Writer` stream facades used by the
// STDIO server entry point.
export interface ReadCloser {
  read(): Promise<Uint8Array | undefined>;
  close(): Promise<void>;
}

export interface WriteCloser {
  write(data: Uint8Array): Promise<void>;
  close(): Promise<void>;
}

export interface Writer {
  write(data: Uint8Array): Promise<void>;
}

// StdioServerOptions configures the STDIO-based API server.
// Port of TS-Go `internal/api/server.go` `StdioServerOptions`.
export interface StdioServerOptions {
  in: ReadCloser;
  out: WriteCloser;
  err: Writer;
  cwd: string;
  defaultLibraryPath: string;
  // pipePath, if set, listens on a named pipe (Windows) or Unix domain socket
  // instead of using in/out for communication.
  pipePath: string;
  // callbacks specifies which filesystem operations should be delegated to the
  // client (e.g., "readFile", "fileExists"). Empty means no callbacks.
  callbacks: readonly CallbackName[];
  // async enables JSON-RPC protocol with async connection handling. When false
  // (default), uses MessagePack protocol with sync connection.
  async: boolean;
}

export class APIServer {
  readonly session: Session;
  readonly connection: Connection;
  readonly protocol: MsgpackProtocolHandler;
  running = false;

  constructor(opts: ServerOptions) {
    this.session = opts.session;
    this.connection = opts.connection;
    this.protocol = opts.protocol;
  }

  async run(): Promise<void> {
    this.running = true;
    while (this.running) {
      const chunk = await this.connection.receive();
      if (chunk === undefined) break;
      const msg = this.protocol.decodeMessage(chunk);
      if (msg.kind === "request") {
        const result = this.session.HandleRequest({}, msg.method ?? "", msg.params);
        const reply = this.protocol.encodeResponse(msg.id ?? 0, result.result, result.error);
        await this.connection.send(reply);
      } else if (msg.kind === "notification") {
        this.session.HandleNotification({}, msg.method ?? "", msg.params);
      }
    }
  }

  async stop(): Promise<void> {
    this.running = false;
    await this.connection.close();
  }
}

export function newAPIServer(opts: ServerOptions): APIServer {
  return new APIServer(opts);
}
