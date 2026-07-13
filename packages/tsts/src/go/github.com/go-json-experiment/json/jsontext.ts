import type { bool, byte } from "../../../scalars.js";
import type { GoDefined, GoError, GoSlice } from "../../../compat.js";
import { GoIsRef, GoNilSlice } from "../../../compat.js";
import type { Reader, Writer } from "../../../io.js";

const textEncoder: TextEncoder = new TextEncoder();
const textDecoder: TextDecoder = new TextDecoder();

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

export type Kind = string;

export class Token {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  Kind(): Kind {
    return this.#value as Kind;
  }

  String(): string {
    return this.#value;
  }
}

export const BeginArray: Token = new Token("[");
export const BeginObject: Token = new Token("{");
export const EndArray: Token = new Token("]");
export const EndObject: Token = new Token("}");
export const Null: Token = new Token("n");

export type Value = GoDefined<
  GoSlice<byte>,
  "__goDefinedType::github.com/go-json-experiment/json/jsontext::type::Value::e83a93b64e2ccb2d4a377d9f9967e79a3b67d10c1f888316e94321bf7cda027e"
>;

export interface Decoder {
  PeekKind(): Kind;
  ReadToken(): [Token, GoError];
  ReadValue(): [Value, GoError];
}

export interface Encoder {
  WriteToken(token: Token): GoError;
  WriteValue(value: Value): GoError;
}

class JsonDecoder implements Decoder {
  readonly #value: Value;
  #consumed: boolean = false;

  constructor(input: unknown) {
    this.#value = parseInput(input);
  }

  PeekKind(): Kind {
    return kindOf(this.#value) as Kind;
  }

  ReadToken(): [Token, GoError] {
    if (this.#consumed) {
      return [new Token(""), new Error("json decoder exhausted")];
    }
    this.#consumed = true;
    return [new Token(kindOf(this.#value)), undefined];
  }

  ReadValue(): [Value, GoError] {
    if (this.#consumed) {
      return [GoNilSlice<byte>(), new Error("json decoder exhausted")];
    }
    this.#consumed = true;
    return [this.#value.slice(), undefined];
  }
}

class JsonEncoder implements Encoder {
  readonly #chunks: Array<string> = [];
  readonly #stack: Array<JsonContainerFrame> = [];

  WriteToken(token: Token): GoError {
    try {
      const value = token.Kind();
      switch (value) {
        case "{":
          this.#writeValuePrefix();
          this.#chunks.push("{");
          this.#stack.push({ kind: "object", count: 0, expecting: "key" });
          return undefined;
        case "[":
          this.#writeValuePrefix();
          this.#chunks.push("[");
          this.#stack.push({ kind: "array", count: 0 });
          return undefined;
        case "}":
          return this.#closeContainer("object", "}");
        case "]":
          return this.#closeContainer("array", "]");
        case "n":
          this.#writeValuePrefix();
          this.#chunks.push("null");
          return undefined;
        default:
          return new Error(`unsupported json token ${value}`);
      }
    } catch (error) {
      return toError(error);
    }
  }

  WriteValue(value: Value): GoError {
    try {
      const rawValue = textDecoder.decode(Uint8Array.from(value));
      const decodedValue: unknown = JSON.parse(rawValue);
      const frame = this.#stack[this.#stack.length - 1];
      const objectFrame = asJsonObjectFrame(frame);
      if (objectFrame !== undefined) {
        if (objectFrame.expecting !== "key") {
          this.#writeValuePrefix();
          this.#chunks.push(rawValue);
          return undefined;
        }
        if (typeof decodedValue !== "string") {
          return new Error("json object name must be a string");
        }
        if (objectFrame.count > 0) {
          this.#chunks.push(",");
        }
        this.#chunks.push(JSON.stringify(decodedValue));
        this.#chunks.push(":");
        objectFrame.expecting = "value";
        return undefined;
      }
      this.#writeValuePrefix();
      this.#chunks.push(rawValue);
      return undefined;
    } catch (error) {
      return toError(error);
    }
  }

  #writeValuePrefix(): void {
    const frame = this.#stack[this.#stack.length - 1];
    if (frame === undefined) {
      if (this.#chunks.length > 0) {
        throw new Error("json encoder already has a top-level value");
      }
      return;
    }
    if (frame.kind === "array") {
      if (frame.count > 0) {
        this.#chunks.push(",");
      }
      frame.count = frame.count + 1;
      return;
    }
    const objectFrame = asJsonObjectFrame(frame);
    if (objectFrame === undefined) {
      throw new Error("json array value prefix reached object-only branch");
    }
    if (objectFrame.expecting !== "value") {
      throw new Error("json object value written before key");
    }
    objectFrame.count = objectFrame.count + 1;
    objectFrame.expecting = "key";
  }

  #closeContainer(expected: JsonContainerFrame["kind"], token: string): GoError {
    const frame = this.#stack.pop();
    if (frame === undefined || frame.kind !== expected) {
      return new Error(`json encoder mismatched ${token} token`);
    }
    const objectFrame = asJsonObjectFrame(frame);
    if (objectFrame !== undefined) {
      if (objectFrame.expecting !== "key") {
        return new Error("json object closed before value");
      }
    }
    this.#chunks.push(token);
    return undefined;
  }
}

interface JsonObjectFrame {
  kind: "object";
  count: number;
  expecting: "key" | "value";
}

interface JsonArrayFrame {
  kind: "array";
  count: number;
}

type JsonContainerFrame = JsonObjectFrame | JsonArrayFrame;

function asJsonObjectFrame(frame: JsonContainerFrame | undefined): JsonObjectFrame | undefined {
  return frame !== undefined && frame.kind === "object" ? frame as JsonObjectFrame : undefined;
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

const parseInput = (input: unknown): Value => {
  if (typeof input === "string") {
    JSON.parse(input);
    return Array.from(textEncoder.encode(input));
  }
  if (Array.isArray(input) || input instanceof Uint8Array) {
    const bytes = Array.from(input);
    JSON.parse(textDecoder.decode(Uint8Array.from(bytes)));
    return bytes;
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
    JSON.parse(textDecoder.decode(Uint8Array.from(bytes)));
    return bytes;
  }
  const text = JSON.stringify(normalizeForJson(input));
  if (text === undefined) {
    throw new Error("json input cannot be represented as a JSON value");
  }
  return Array.from(textEncoder.encode(text));
}

const kindOf = (value: Value): string => {
  const first = textDecoder.decode(Uint8Array.from(value)).trimStart().charAt(0);
  return first === "-" || (first >= "0" && first <= "9") ? "0" : first;
};

const normalizeForJson = (value: unknown): unknown => {
  if (GoIsRef(value)) {
    return value.v;
  }
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  if (value instanceof Uint8Array) {
    return Array.from(value);
  }
  return value;
}

const toError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error));
}

export const writeTo = (writer: Writer, bytes: GoSlice<byte>): GoError => {
  const [, err] = writer.Write(bytes);
  return err;
}
