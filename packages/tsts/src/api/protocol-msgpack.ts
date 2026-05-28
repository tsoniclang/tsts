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
  id?: number | undefined;
  method?: Method | undefined;
  params?: unknown;
  result?: unknown;
  error?: string | undefined;
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
  const buf: number[] = [];
  encodeValue(buf, obj);
  return new Uint8Array(buf);
}

function encodeValue(buf: number[], v: unknown): void {
  if (v === null || v === undefined) { buf.push(0xc0); return; }
  if (typeof v === "boolean") { buf.push(v ? 0xc3 : 0xc2); return; }
  if (typeof v === "number") {
    if (Number.isInteger(v) && v >= 0 && v < 0x80) { buf.push(v); return; }
    if (Number.isInteger(v) && v < 0 && v >= -32) { buf.push(0xe0 | (v + 32)); return; }
    if (Number.isInteger(v) && v >= 0 && v < 0x100) { buf.push(0xcc, v); return; }
    if (Number.isInteger(v) && v >= 0 && v < 0x10000) {
      buf.push(0xcd, (v >>> 8) & 0xff, v & 0xff); return;
    }
    if (Number.isInteger(v) && v >= 0 && v < 0x100000000) {
      buf.push(0xce, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
      return;
    }
    // Fall through to float64.
    const dv = new DataView(new ArrayBuffer(8));
    dv.setFloat64(0, v, false);
    buf.push(0xcb);
    for (let i = 0; i < 8; i++) buf.push(dv.getUint8(i));
    return;
  }
  if (typeof v === "string") {
    const bytes = new TextEncoder().encode(v);
    if (bytes.length < 32) buf.push(0xa0 | bytes.length);
    else if (bytes.length < 0x100) buf.push(0xd9, bytes.length);
    else if (bytes.length < 0x10000) buf.push(0xda, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
    else buf.push(0xdb, (bytes.length >>> 24) & 0xff, (bytes.length >>> 16) & 0xff, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
    for (const b of bytes) buf.push(b);
    return;
  }
  if (Array.isArray(v)) {
    if (v.length < 16) buf.push(0x90 | v.length);
    else if (v.length < 0x10000) buf.push(0xdc, (v.length >>> 8) & 0xff, v.length & 0xff);
    else buf.push(0xdd, (v.length >>> 24) & 0xff, (v.length >>> 16) & 0xff, (v.length >>> 8) & 0xff, v.length & 0xff);
    for (const item of v) encodeValue(buf, item);
    return;
  }
  if (v instanceof Uint8Array) {
    if (v.length < 0x100) buf.push(0xc4, v.length);
    else if (v.length < 0x10000) buf.push(0xc5, (v.length >>> 8) & 0xff, v.length & 0xff);
    else buf.push(0xc6, (v.length >>> 24) & 0xff, (v.length >>> 16) & 0xff, (v.length >>> 8) & 0xff, v.length & 0xff);
    for (const b of v) buf.push(b);
    return;
  }
  if (typeof v === "object") {
    const entries = Object.entries(v as Record<string, unknown>).filter(([, val]) => val !== undefined);
    if (entries.length < 16) buf.push(0x80 | entries.length);
    else if (entries.length < 0x10000) buf.push(0xde, (entries.length >>> 8) & 0xff, entries.length & 0xff);
    else buf.push(0xdf, (entries.length >>> 24) & 0xff, (entries.length >>> 16) & 0xff, (entries.length >>> 8) & 0xff, entries.length & 0xff);
    for (const [k, val] of entries) {
      encodeValue(buf, k);
      encodeValue(buf, val);
    }
    return;
  }
  buf.push(0xc0); // null fallback
}

function decodeMsgpack(data: Uint8Array): unknown {
  const cursor = { pos: 0 };
  return decodeValue(data, cursor);
}

function decodeValue(data: Uint8Array, c: { pos: number }): unknown {
  if (c.pos >= data.length) return undefined;
  const b = data[c.pos++]!;
  if (b < 0x80) return b;                       // positive fixint
  if ((b & 0xf0) === 0x80) return decodeMap(data, c, b & 0x0f);
  if ((b & 0xf0) === 0x90) return decodeArray(data, c, b & 0x0f);
  if ((b & 0xe0) === 0xa0) return decodeStr(data, c, b & 0x1f);
  if (b >= 0xe0) return b - 256;                // negative fixint
  switch (b) {
    case 0xc0: return null;
    case 0xc2: return false;
    case 0xc3: return true;
    case 0xcc: return data[c.pos++]!;
    case 0xcd: { const v = (data[c.pos]! << 8) | data[c.pos + 1]!; c.pos += 2; return v; }
    case 0xce: {
      const v = ((data[c.pos]! << 24) | (data[c.pos + 1]! << 16) | (data[c.pos + 2]! << 8) | data[c.pos + 3]!) >>> 0;
      c.pos += 4; return v;
    }
    case 0xcb: {
      const dv = new DataView(data.buffer, data.byteOffset + c.pos, 8);
      c.pos += 8;
      return dv.getFloat64(0, false);
    }
    case 0xd9: { const n = data[c.pos++]!; return decodeStr(data, c, n); }
    case 0xda: { const n = (data[c.pos]! << 8) | data[c.pos + 1]!; c.pos += 2; return decodeStr(data, c, n); }
    case 0xdb: {
      const n = ((data[c.pos]! << 24) | (data[c.pos + 1]! << 16) | (data[c.pos + 2]! << 8) | data[c.pos + 3]!) >>> 0;
      c.pos += 4; return decodeStr(data, c, n);
    }
    case 0xdc: { const n = (data[c.pos]! << 8) | data[c.pos + 1]!; c.pos += 2; return decodeArray(data, c, n); }
    case 0xdd: {
      const n = ((data[c.pos]! << 24) | (data[c.pos + 1]! << 16) | (data[c.pos + 2]! << 8) | data[c.pos + 3]!) >>> 0;
      c.pos += 4; return decodeArray(data, c, n);
    }
    case 0xde: { const n = (data[c.pos]! << 8) | data[c.pos + 1]!; c.pos += 2; return decodeMap(data, c, n); }
    case 0xdf: {
      const n = ((data[c.pos]! << 24) | (data[c.pos + 1]! << 16) | (data[c.pos + 2]! << 8) | data[c.pos + 3]!) >>> 0;
      c.pos += 4; return decodeMap(data, c, n);
    }
    default: return undefined;
  }
}

function decodeStr(data: Uint8Array, c: { pos: number }, len: number): string {
  const s = new TextDecoder().decode(data.subarray(c.pos, c.pos + len));
  c.pos += len;
  return s;
}

function decodeArray(data: Uint8Array, c: { pos: number }, len: number): unknown[] {
  const out: unknown[] = [];
  for (let i = 0; i < len; i++) out.push(decodeValue(data, c));
  return out;
}

function decodeMap(data: Uint8Array, c: { pos: number }, len: number): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (let i = 0; i < len; i++) {
    const k = decodeValue(data, c);
    const v = decodeValue(data, c);
    if (typeof k === "string") out[k] = v;
  }
  return out;
}
