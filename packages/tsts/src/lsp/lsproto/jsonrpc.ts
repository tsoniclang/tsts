/**
 * LSP-specific JSON-RPC message wrappers.
 *
 * Port of TS-Go `internal/lsp/lsproto/jsonrpc.go`.
 */

import {
  ID,
  JSONRPCVersion,
  MessageKind,
  ResponseError,
  newIDInt,
  newIDString,
} from "../../jsonrpc/index.js";
import type { Method } from "./lsp.js";
import type { IntegerOrString } from "./lspGenerated.js";

export function newID(rawValue: IntegerOrString): ID {
  return rawValue.string !== undefined ? newIDString(rawValue.string) : newIDInt(rawValue.integer ?? 0);
}

export class Message {
  kind: MessageKind = MessageKind.Notification;
  private payload: RequestMessage | ResponseMessage | undefined;

  asRequest(): RequestMessage {
    if (!(this.payload instanceof RequestMessage)) throw new Error("message is not a request");
    return this.payload;
  }

  asResponse(): ResponseMessage {
    if (!(this.payload instanceof ResponseMessage)) throw new Error("message is not a response");
    return this.payload;
  }

  static fromJSON(data: string): Message {
    const raw = JSON.parse(data) as {
      readonly id?: string | number;
      readonly method?: Method;
      readonly params?: unknown;
      readonly result?: unknown;
      readonly error?: { readonly code: number; readonly message: string; readonly data?: unknown };
    };
    const message = new Message();
    const id = raw.id === undefined ? undefined : typeof raw.id === "string" ? newIDString(raw.id) : newIDInt(raw.id);
    if (id !== undefined && raw.method === undefined) {
      message.kind = MessageKind.Response;
      message.payload = new ResponseMessage(id, raw.result, raw.error === undefined ? undefined : new ResponseError(raw.error.code, raw.error.message, raw.error.data));
      return message;
    }
    message.kind = id === undefined ? MessageKind.Notification : MessageKind.Request;
    message.payload = new RequestMessage(id, raw.method ?? "", raw.params);
    return message;
  }

  toJSON(): RequestMessage | ResponseMessage | undefined {
    return this.payload;
  }
}

export class RequestMessage {
  readonly jsonrpc = new JSONRPCVersion();
  readonly id: ID | undefined;
  readonly method: Method;
  readonly params: unknown;

  constructor(id: ID | undefined, method: Method, params?: unknown) {
    this.id = id;
    this.method = method;
    this.params = params;
  }

  message(): Message {
    const message = new Message();
    message.kind = this.id === undefined ? MessageKind.Notification : MessageKind.Request;
    Object.assign(message, { payload: this });
    return message;
  }
}

export class ResponseMessage {
  readonly jsonrpc = new JSONRPCVersion();
  readonly id: ID;
  readonly result: unknown;
  readonly error: ResponseError | undefined;

  constructor(id: ID, result?: unknown, error?: ResponseError) {
    this.id = id;
    this.result = result;
    this.error = error;
  }

  message(): Message {
    const message = new Message();
    message.kind = MessageKind.Response;
    Object.assign(message, { payload: this });
    return message;
  }
}
