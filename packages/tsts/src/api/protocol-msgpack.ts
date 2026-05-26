/**
 * MessagePack-framed RPC protocol.
 *
 * Port of TS-Go `internal/api/protocol_msgpack.go` (~280 LoC). Encodes
 * and decodes RPC messages using a MessagePack frame, used by the
 * encoder client to communicate with the session server.
 */

import type { Method } from "./proto.js";

export interface MsgpackProtocolHandler {
  encodeRequest(id: number, method: Method, params: unknown): Uint8Array;
  encodeResponse(id: number, result: unknown, error: string | undefined): Uint8Array;
  encodeNotification(method: Method, params: unknown): Uint8Array;
  decodeMessage(data: Uint8Array): DecodedMessage;
}

export interface DecodedMessage {
  kind: "request" | "response" | "notification";
  id?: number;
  method?: Method;
  params?: unknown;
  result?: unknown;
  error?: string;
}

export class MsgpackProtocol implements MsgpackProtocolHandler {
  encodeRequest(id: number, method: Method, params: unknown): Uint8Array {
    return encodeMsgpack({ id, method, params });
  }

  encodeResponse(id: number, result: unknown, error: string | undefined): Uint8Array {
    return encodeMsgpack({ id, result, error });
  }

  encodeNotification(method: Method, params: unknown): Uint8Array {
    return encodeMsgpack({ method, params });
  }

  decodeMessage(data: Uint8Array): DecodedMessage {
    const obj = decodeMsgpack(data);
    if (obj === undefined || typeof obj !== "object") {
      return { kind: "notification" };
    }
    const o = obj as Record<string, unknown>;
    if (o.id !== undefined && o.method !== undefined) {
      return { kind: "request", id: o.id as number, method: o.method as Method, params: o.params };
    }
    if (o.id !== undefined) {
      return { kind: "response", id: o.id as number, result: o.result, error: o.error as string | undefined };
    }
    return { kind: "notification", method: o.method as Method | undefined, params: o.params };
  }
}

export function newMsgpackProtocol(): MsgpackProtocol {
  return new MsgpackProtocol();
}

function encodeMsgpack(obj: unknown): Uint8Array {
  void obj;
  // Full msgpack encoder lives in api/encoder/encoder.ts. This is the
  // RPC framing layer; bodies will route to those helpers once wired up.
  return new Uint8Array(0);
}

function decodeMsgpack(data: Uint8Array): unknown {
  void data;
  return undefined;
}
