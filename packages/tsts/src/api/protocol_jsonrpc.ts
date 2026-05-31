/**
 * JSON-RPC framing protocol.
 *
 * Port of TS-Go `internal/api/protocol_jsonrpc.go` (~96 LoC). An
 * alternative to the MessagePack protocol — uses JSON text frames
 * with Content-Length headers (matches LSP framing).
 */

import type { MsgpackProtocolHandler, DecodedMessage } from "./protocol_msgpack.js";
import type { Method } from "./proto.js";

export class JSONRPCProtocol implements MsgpackProtocolHandler {
  encodeRequest(id: number, method: Method, params: unknown): Uint8Array {
    return frameMessage({ jsonrpc: "2.0", id, method, params });
  }

  encodeResponse(id: number, result: unknown, error: string | undefined): Uint8Array {
    if (error !== undefined) {
      return frameMessage({ jsonrpc: "2.0", id, error: { code: -32000, message: error } });
    }
    return frameMessage({ jsonrpc: "2.0", id, result });
  }

  encodeNotification(method: Method, params: unknown): Uint8Array {
    return frameMessage({ jsonrpc: "2.0", method, params });
  }

  decodeMessage(data: Uint8Array): DecodedMessage {
    const text = new TextDecoder().decode(data);
    const headerEnd = text.indexOf("\r\n\r\n");
    const body = headerEnd >= 0 ? text.slice(headerEnd + 4) : text;
    try {
      const obj = JSON.parse(body) as Record<string, unknown>;
      if (obj.id !== undefined && obj.method !== undefined) {
        return { kind: "request", id: obj.id as number, method: obj.method as Method, params: obj.params };
      }
      if (obj.id !== undefined) {
        const err = obj.error as { message?: string } | undefined;
        return { kind: "response", id: obj.id as number, result: obj.result, error: err?.message };
      }
      return { kind: "notification", method: obj.method as Method | undefined, params: obj.params };
    } catch {
      return { kind: "notification" };
    }
  }
}

export function newJSONRPCProtocol(): JSONRPCProtocol {
  return new JSONRPCProtocol();
}

function frameMessage(obj: unknown): Uint8Array {
  const body = JSON.stringify(obj);
  const bodyBytes = new TextEncoder().encode(body);
  const header = `Content-Length: ${bodyBytes.length}\r\n\r\n`;
  const headerBytes = new TextEncoder().encode(header);
  const result = new Uint8Array(headerBytes.length + bodyBytes.length);
  result.set(headerBytes, 0);
  result.set(bodyBytes, headerBytes.length);
  return result;
}
