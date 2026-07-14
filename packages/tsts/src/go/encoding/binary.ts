import type { byte, int, ushort } from "../scalars.js";
import type { GoError, GoSlice } from "../compat.js";
import { GoNumberValueOps, GoSliceAppendSlice } from "../compat.js";
import { GoAppend, GoAppendSlice } from "../compat.js";
import { GoSliceBuild, GoSliceMake, GoSliceStore } from "../compat.js";
import { GoSliceLoad } from "../compat.js";



export interface ByteOrder {
  Uint16(bytes: GoSlice<byte>): ushort;
  PutUint16(bytes: GoSlice<byte>, value: ushort): void;
}

class byteOrder implements ByteOrder {
  constructor(private readonly endian: "big" | "little") {}

  Uint16(bytes: GoSlice<byte>): ushort {
    const b0 = GoSliceLoad(bytes, 0, GoNumberValueOps) ?? 0;
    const b1 = GoSliceLoad(bytes, 1, GoNumberValueOps) ?? 0;
    return (this.endian === "big" ? (b0 << 8) | b1 : (b1 << 8) | b0) as ushort;
  }

  PutUint16(bytes: GoSlice<byte>, value: ushort): void {
    const v = value & 0xffff;
    if (this.endian === "big") {
      GoSliceStore(bytes, 0, (v >> 8) as byte, GoNumberValueOps);
      GoSliceStore(bytes, 1, (v & 0xff) as byte, GoNumberValueOps);
    } else {
      GoSliceStore(bytes, 0, (v & 0xff) as byte, GoNumberValueOps);
      GoSliceStore(bytes, 1, (v >> 8) as byte, GoNumberValueOps);
    }
  }
}

export const BigEndian: ByteOrder = new byteOrder("big");
export const LittleEndian: ByteOrder = new byteOrder("little");

type ByteReader = {
  ReadByte(): [byte, GoError];
};

type ByteWriter = {
  Write(p: GoSlice<byte>): [int, GoError];
};

function isByteReader(value: unknown): value is ByteReader {
  return value !== undefined && value !== null && typeof (value as { ReadByte?: unknown }).ReadByte === "function";
}

function isByteWriter(value: unknown): value is ByteWriter {
  return value !== undefined && value !== null && typeof (value as { Write?: unknown }).Write === "function";
}

export function Append(buf: GoSlice<byte>, order: ByteOrder, data: int | GoSlice<int>): [GoSlice<byte>, GoError] {
  let out = buf;
  if (typeof data === "number") {
    const bytes: GoSlice<byte> = GoSliceBuild(2, 2, GoNumberValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, 0 as byte, GoNumberValueOps);
      GoSliceStore(__goSliceLiteral, 1, 0 as byte, GoNumberValueOps);
    });
    order.PutUint16(bytes, data as int);
    out = GoSliceAppendSlice(out, bytes, GoNumberValueOps);
    return [out, undefined];
  }
  for (const value of data) {
    const bytes: GoSlice<byte> = GoSliceBuild(2, 2, GoNumberValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, 0 as byte, GoNumberValueOps);
      GoSliceStore(__goSliceLiteral, 1, 0 as byte, GoNumberValueOps);
    });
    order.PutUint16(bytes, value);
    out = GoSliceAppendSlice(out, bytes, GoNumberValueOps);
  }
  return [out, undefined];
}

export function Read(reader: unknown, order: ByteOrder, data: GoSlice<int>): GoError {
  if (!isByteReader(reader)) {
    return new globalThis.Error("encoding/binary: reader does not implement ReadByte");
  }
  for (let i = 0; i < data.length; i++) {
    const [b0, err0] = reader.ReadByte();
    if (err0 !== undefined) {
      return err0;
    }
    const [b1, err1] = reader.ReadByte();
    if (err1 !== undefined) {
      return err1;
    }
    GoSliceStore(data, i, order.Uint16(GoSliceBuild(2, 2, GoNumberValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, b0, GoNumberValueOps);
      GoSliceStore(__goSliceLiteral, 1, b1, GoNumberValueOps);
    })), GoNumberValueOps);
  }
  return undefined;
}

export function Write(writer: unknown, order: ByteOrder, data: int | GoSlice<int>): GoError {
  if (!isByteWriter(writer)) {
    return new globalThis.Error("encoding/binary: writer does not implement Write");
  }
  const values = typeof data === "number" ? [data as int] : data;
  const bytes: GoSlice<byte> = GoSliceMake(0, 0, GoNumberValueOps);
  for (const value of values) {
    const encoded: GoSlice<byte> = GoSliceBuild(2, 2, GoNumberValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, 0 as byte, GoNumberValueOps);
      GoSliceStore(__goSliceLiteral, 1, 0 as byte, GoNumberValueOps);
    });
    order.PutUint16(encoded, value);
    bytes.push(...encoded);
  }
  const [, err] = writer.Write(bytes);
  return err;
}
