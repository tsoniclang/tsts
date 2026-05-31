/**
 * API server runtime.
 *
 * Port of TS-Go `internal/api/server.go` (~114 LoC). Glues a Session
 * to a transport + connection, decoding incoming requests, routing
 * through Session.HandleRequest, and writing responses back.
 */

import { Session } from "./session.js";
import type { Connection } from "./conn.js";
import type { MsgpackProtocolHandler } from "./protocol_msgpack.js";

export interface ServerOptions {
  session: Session;
  connection: Connection;
  protocol: MsgpackProtocolHandler;
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
