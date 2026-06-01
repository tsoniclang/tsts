/**
 * LSP server shell.
 *
 * Porting anchor for TS-Go `internal/lsp/server.go`.
 */

import type { Logger } from "./logger.js";
import { noopLogger } from "./logger.js";
import type { Message, RequestMessage, ResponseMessage } from "./lsproto/index.js";

export interface ServerOptions {
  readonly logger?: Logger;
}

export class Server {
  private readonly logger: Logger;
  private readonly outgoing: (RequestMessage | ResponseMessage)[] = [];
  private closed = false;

  constructor(options: ServerOptions = {}) {
    this.logger = options.logger ?? noopLogger();
  }

  isClosed(): boolean {
    return this.closed;
  }

  close(): void {
    this.closed = true;
  }

  log(message: string): void {
    this.logger.log(message);
  }

  send(message: RequestMessage | ResponseMessage): void {
    if (this.closed) throw new Error("server is closed");
    this.outgoing.push(message);
  }

  drainOutgoing(): readonly (RequestMessage | ResponseMessage)[] {
    const messages = [...this.outgoing];
    this.outgoing.length = 0;
    return messages;
  }

  receive(message: Message): void {
    this.logger.log(JSON.stringify(message));
  }
}
