/**
 * Generic JSON-RPC 2.0 types and utilities.
 *
 * Port of TS-Go `internal/jsonrpc/jsonrpc.go`.
 */

export class JSONRPCVersion {
  marshalJSON(): string {
    return "\"2.0\"";
  }

  unmarshalJSON(data: string): void {
    if (data !== "\"2.0\"") throw errInvalidJSONRPCVersion;
  }

  toJSON(): string {
    return "2.0";
  }
}

export const jsonRPCVersion = "\"2.0\"";
export const errInvalidJSONRPCVersion = new Error("invalid JSON-RPC version");

export interface IntegerOrString {
  readonly integer?: number;
  readonly string?: string;
}

export class ID {
  private readonly stringValue: string | undefined;
  private readonly integerValue: number | undefined;

  private constructor(stringValue: string | undefined, integerValue: number | undefined) {
    this.stringValue = stringValue;
    this.integerValue = integerValue;
  }

  static newID(rawValue: IntegerOrString): ID {
    return rawValue.string !== undefined ? new ID(rawValue.string, undefined) : new ID(undefined, rawValue.integer ?? 0);
  }

  static newIDString(value: string): ID {
    return new ID(value, undefined);
  }

  static newIDInt(value: number): ID {
    return new ID(undefined, value | 0);
  }

  string(): string {
    return this.stringValue ?? String(this.integerValue ?? 0);
  }

  marshalJSON(): string {
    return JSON.stringify(this.toJSON());
  }

  unmarshalJSON(data: string): ID {
    const parsed = JSON.parse(data) as string | number;
    return typeof parsed === "string" ? ID.newIDString(parsed) : ID.newIDInt(parsed);
  }

  tryInt(): { readonly value: number; readonly ok: boolean } {
    return this.stringValue === undefined && this.integerValue !== undefined
      ? { value: this.integerValue, ok: true }
      : { value: 0, ok: false };
  }

  mustInt(): number {
    if (this.stringValue !== undefined) throw new Error("ID is not an integer");
    return this.integerValue ?? 0;
  }

  toJSON(): string | number {
    return this.stringValue ?? this.integerValue ?? 0;
  }
}

export function newID(rawValue: IntegerOrString): ID {
  return ID.newID(rawValue);
}

export function newIDString(value: string): ID {
  return ID.newIDString(value);
}

export function newIDInt(value: number): ID {
  return ID.newIDInt(value);
}

export class ResponseError extends Error {
  readonly code: number;
  readonly data: unknown;

  constructor(code: number, message: string, data?: unknown) {
    super(message);
    this.name = "ResponseError";
    this.code = code;
    this.data = data;
  }

  string(): string {
    if (this.data === undefined) return `[${this.code}]: ${this.message}`;
    return `[${this.code}]: ${this.message}\n${JSON.stringify(this.data)}`;
  }

  override toString(): string {
    return this.string();
  }

  toJSON(): { readonly code: number; readonly message: string; readonly data?: unknown } {
    return this.data === undefined
      ? { code: this.code, message: this.message }
      : { code: this.code, message: this.message, data: this.data };
  }
}

export const codeParseError = -32700;
export const codeInvalidRequest = -32600;
export const codeMethodNotFound = -32601;
export const codeInvalidParams = -32602;
export const codeInternalError = -32603;

export const enum MessageKind {
  Notification = 0,
  Request = 1,
  Response = 2,
}

export interface Message {
  readonly jsonrpc: JSONRPCVersion;
  readonly id?: ID;
  readonly method?: string;
  readonly params?: unknown;
  readonly result?: unknown;
  readonly error?: ResponseError;
}

export function messageKind(message: Message): MessageKind {
  if (message.id !== undefined && (message.method ?? "") === "") return MessageKind.Response;
  if (message.id === undefined) return MessageKind.Notification;
  return MessageKind.Request;
}

export function isRequest(message: Message): boolean {
  return message.id !== undefined && (message.method ?? "") !== "";
}

export function isNotification(message: Message): boolean {
  return message.id === undefined && (message.method ?? "") !== "";
}

export function isResponse(message: Message): boolean {
  return message.id !== undefined && (message.method ?? "") === "";
}

export interface RequestMessage {
  readonly jsonrpc: JSONRPCVersion;
  readonly id?: ID;
  readonly method: string;
  readonly params?: unknown;
}

export interface ResponseMessage {
  readonly jsonrpc: JSONRPCVersion;
  readonly id?: ID;
  readonly result?: unknown;
  readonly error?: ResponseError;
}

export function parseMessage(text: string): Message {
  const raw = JSON.parse(text) as {
    readonly jsonrpc?: string;
    readonly id?: string | number;
    readonly method?: string;
    readonly params?: unknown;
    readonly result?: unknown;
    readonly error?: { readonly code: number; readonly message: string; readonly data?: unknown };
  };
  const version = new JSONRPCVersion();
  version.unmarshalJSON(JSON.stringify(raw.jsonrpc));
  return {
    jsonrpc: version,
    ...(raw.id === undefined ? {} : { id: typeof raw.id === "string" ? newIDString(raw.id) : newIDInt(raw.id) }),
    ...(raw.method === undefined ? {} : { method: raw.method }),
    ...(raw.params === undefined ? {} : { params: raw.params }),
    ...(raw.result === undefined ? {} : { result: raw.result }),
    ...(raw.error === undefined ? {} : { error: new ResponseError(raw.error.code, raw.error.message, raw.error.data) }),
  };
}

export function stringifyMessage(message: Message): string {
  return JSON.stringify(message);
}
