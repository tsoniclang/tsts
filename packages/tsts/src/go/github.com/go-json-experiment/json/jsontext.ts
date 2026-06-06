import type { bool, byte } from "@tsonic/core/types.js";
import type { GoError, GoSlice } from "../../../compat.js";
import type { Reader, Writer } from "../../../io.js";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export interface Option {
  readonly name: string;
  readonly value: unknown;
}

export function AllowDuplicateNames(allow: bool): Option {
  return { name: "AllowDuplicateNames", value: allow };
}

export function AllowInvalidUTF8(allow: bool): Option {
  return { name: "AllowInvalidUTF8", value: allow };
}

export class Kind {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  Kind(): string {
    return this.#value;
  }

  String(): string {
    return this.#value;
  }
}

export const BeginArray = new Kind("[");
export const BeginObject = new Kind("{");
export const EndArray = new Kind("]");
export const EndObject = new Kind("}");
export const Null = new Kind("n");

export type Value = GoSlice<byte>;

export interface Decoder {
  PeekKind(): string;
  ReadToken(): [Kind, GoError];
  ReadValue(): [unknown, GoError];
}

export interface Encoder {
  WriteToken(kind: Kind): GoError;
  WriteValue(value: unknown): GoError;
  Bytes(): GoSlice<byte>;
}

class JsonDecoder implements Decoder {
  readonly #value: unknown;
  #consumed = false;

  constructor(input: unknown) {
    this.#value = parseInput(input);
  }

  PeekKind(): string {
    return kindOf(this.#value);
  }

  ReadToken(): [Kind, GoError] {
    if (this.#consumed) {
      return [new Kind(""), new Error("json decoder exhausted")];
    }
    this.#consumed = true;
    return [new Kind(kindOf(this.#value)), undefined];
  }

  ReadValue(): [unknown, GoError] {
    if (this.#consumed) {
      return [undefined, new Error("json decoder exhausted")];
    }
    this.#consumed = true;
    return [this.#value, undefined];
  }
}

class JsonEncoder implements Encoder {
  readonly #chunks: Array<string> = [];

  WriteToken(kind: Kind): GoError {
    this.#chunks.push(kind.Kind());
    return undefined;
  }

  WriteValue(value: unknown): GoError {
    this.#chunks.push(JSON.stringify(value));
    return undefined;
  }

  Bytes(): GoSlice<byte> {
    return Array.from(textEncoder.encode(this.#chunks.join("")));
  }
}

export function NewDecoder(reader: Reader | GoSlice<byte> | string): Decoder {
  return new JsonDecoder(reader);
}

export function NewEncoder(): Encoder {
  return new JsonEncoder();
}

export function WithIndent(indent: string): Option {
  return { name: "WithIndent", value: indent };
}

export function WithIndentPrefix(prefix: string): Option {
  return { name: "WithIndentPrefix", value: prefix };
}

const parseInput = (input: unknown): unknown => {
  if (typeof input === "string") {
    return JSON.parse(input);
  }
  if (Array.isArray(input) || input instanceof Uint8Array) {
    return JSON.parse(textDecoder.decode(Uint8Array.from(input as ArrayLike<number>)));
  }
  if (typeof input === "object" && input !== null && "Read" in input) {
    const bytes: Array<byte> = [];
    const chunk = new Array<byte>(4096);
    for (;;) {
      const [count, err] = (input as Reader).Read(chunk);
      if (count > 0) {
        bytes.push(...chunk.slice(0, count));
      }
      if (err !== undefined || count === 0) {
        break;
      }
    }
    return JSON.parse(textDecoder.decode(Uint8Array.from(bytes as Array<number>)));
  }
  return input;
}

const kindOf = (value: unknown): string => {
  if (value === null) {
    return "n";
  }
  if (Array.isArray(value)) {
    return "[";
  }
  if (typeof value === "object") {
    return "{";
  }
  if (typeof value === "string") {
    return "\"";
  }
  if (typeof value === "boolean") {
    return value ? "t" : "f";
  }
  return "0";
}

export const writeTo = (writer: Writer, bytes: GoSlice<byte>): GoError => {
  const [, err] = writer.Write(bytes);
  return err;
}
