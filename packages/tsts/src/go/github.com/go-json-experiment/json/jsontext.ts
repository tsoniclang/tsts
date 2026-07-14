import type { bool, byte, int } from "../../../scalars.js";
import type { GoDefined, GoError, GoSlice, GoValueOps } from "../../../compat.js";
import {
  GoNilSlice,
  GoNumberValueOps,
  GoSliceAppend,
  GoSliceLoad,
  GoSliceMake,
  GoSliceReslice,
} from "../../../compat.js";
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

export const KindValueOps: GoValueOps<Kind> = Object.freeze({
  zero: (): Kind => "\0",
  copy: (value: Kind): Kind => value,
});

export class Token {
  readonly #value: string;

  constructor(value: string = "\0") {
    this.#value = value;
  }

  Kind(): Kind {
    return this.#value;
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
  "__goDefinedType::github.com/go-json-experiment/json/jsontext::type::Value::affd457443859fae2d3075a32543bd0c10339f644bf51d4faff36f3aab0589c2"
>;

type ContainerKind = "invalid" | "top" | "array" | "object";
type ContainerExpectation = "key" | "value";

interface ContainerFrame {
  kind: ContainerKind;
  count: int;
  expecting: ContainerExpectation;
}

const containerFrameValueOps: GoValueOps<ContainerFrame> = Object.freeze({
  zero: (): ContainerFrame => ({ kind: "invalid", count: 0, expecting: "value" }),
  copy: (value: ContainerFrame): ContainerFrame => ({
    kind: value.kind,
    count: value.count,
    expecting: value.expecting,
  }),
});

const invalidFrame = (): ContainerFrame => ({ kind: "invalid", count: 0, expecting: "value" });
const topFrame = (): ContainerFrame => ({ kind: "top", count: 0, expecting: "value" });

export class Decoder {
  #reader: Reader | undefined;
  #buffer: Value = GoNilSlice<byte>();
  #cursor: int = 0;
  #stack: GoSlice<ContainerFrame> = GoNilSlice<ContainerFrame>();
  #last: ContainerFrame = invalidFrame();
  #loaded: bool = false;
  #initialized: bool = false;
  #readError: GoError;

  constructor(reader?: Reader, source?: Decoder) {
    if (source !== undefined) {
      this.#reader = source.#reader;
      this.#buffer = source.#buffer;
      this.#cursor = source.#cursor;
      this.#stack = source.#stack;
      this.#last = containerFrameValueOps.copy(source.#last);
      this.#loaded = source.#loaded;
      this.#initialized = source.#initialized;
      this.#readError = source.#readError;
    } else if (reader !== undefined) {
      this.#reader = reader;
      this.#last = topFrame();
      this.#initialized = true;
    }
  }

  PeekKind(): Kind {
    const [position, error] = this.#nextPosition();
    if (error !== undefined || position === undefined) {
      return KindValueOps.zero();
    }
    return normalizeKind(byteAt(this.#buffer, position));
  }

  ReadToken(): [Token, GoError] {
    const [position, positionError] = this.#nextPosition();
    if (positionError !== undefined || position === undefined) {
      return [new Token(), positionError ?? this.#exhaustedError()];
    }

    const currentByte = byteAt(this.#buffer, position);
    const currentKind = normalizeKind(currentByte);
    if (currentByte === 0x7b || currentByte === 0x5b) {
      if (!this.#acceptsValue()) {
        return [new Token(), new Error("json object name must be a string")];
      }
      this.#cursor = position + 1;
      this.#push(currentByte === 0x7b ? "object" : "array");
      return [new Token(currentKind), undefined];
    }
    if (currentByte === 0x7d || currentByte === 0x5d) {
      const expected = currentByte === 0x7d ? "object" : "array";
      if (this.#last.kind !== expected || (expected === "object" && this.#last.expecting !== "key")) {
        return [new Token(), new Error(`json decoder mismatched ${String.fromCharCode(currentByte)} token`)];
      }
      this.#cursor = position + 1;
      const popError = this.#pop();
      return popError === undefined ? [new Token(currentKind), undefined] : [new Token(), popError];
    }

    const [end, scanError] = scanValueEnd(this.#buffer, position);
    if (scanError !== undefined || end === undefined) {
      return [new Token(), scanError];
    }
    const [decoded, decodeError] = decodeJsonValue(this.#buffer, position, end);
    if (decodeError !== undefined) {
      return [new Token(), decodeError];
    }
    if (this.#last.kind === "object" && this.#last.expecting === "key" && typeof decoded !== "string") {
      return [new Token(), new Error("json object name must be a string")];
    }
    this.#cursor = end;
    this.#finishValue();
    return [new Token(currentKind), undefined];
  }

  ReadValue(): [Value, GoError] {
    const [position, positionError] = this.#nextPosition();
    if (positionError !== undefined || position === undefined) {
      return [GoNilSlice<byte>(), positionError ?? this.#exhaustedError()];
    }
    const currentByte = byteAt(this.#buffer, position);
    if (currentByte === 0x7d || currentByte === 0x5d) {
      return [GoNilSlice<byte>(), new Error("json decoder cannot read an end token as a value")];
    }
    const [end, scanError] = scanValueEnd(this.#buffer, position);
    if (scanError !== undefined || end === undefined) {
      return [GoNilSlice<byte>(), scanError];
    }
    const [decoded, decodeError] = decodeJsonValue(this.#buffer, position, end);
    if (decodeError !== undefined) {
      return [GoNilSlice<byte>(), decodeError];
    }
    if (this.#last.kind === "object" && this.#last.expecting === "key" && typeof decoded !== "string") {
      return [GoNilSlice<byte>(), new Error("json object name must be a string")];
    }
    this.#cursor = end;
    this.#finishValue();
    return [GoSliceReslice(this.#buffer, position, end), undefined];
  }

  #ensureLoaded(): GoError {
    if (!this.#initialized || this.#reader === undefined) {
      return new Error("json decoder is an uninitialized zero value");
    }
    if (this.#loaded) {
      return undefined;
    }

    let bytes: GoSlice<byte> = GoNilSlice<byte>();
    const chunk = GoSliceMake<byte>(4096, 4096, GoNumberValueOps);
    for (;;) {
      const [count, error] = this.#reader.Read(chunk);
      if (!Number.isInteger(count) || count < 0 || count > chunk.length) {
        this.#loaded = true;
        this.#readError = new Error("json reader returned an invalid byte count");
        this.#buffer = bytes;
        return this.#readError;
      }
      for (let index = 0; index < count; index++) {
        bytes = GoSliceAppend(bytes, GoSliceLoad(chunk, index, GoNumberValueOps), GoNumberValueOps);
      }
      if (error !== undefined || count === 0) {
        this.#loaded = true;
        this.#readError = error;
        this.#buffer = bytes;
        return bytes.length === 0 ? error : undefined;
      }
    }
  }

  #nextPosition(): [int | undefined, GoError] {
    const loadError = this.#ensureLoaded();
    if (loadError !== undefined && this.#buffer.length === 0) {
      return [undefined, loadError];
    }
    if (this.#last.kind === "invalid") {
      return [undefined, new Error("json decoder is an uninitialized zero value")];
    }

    let position = skipWhitespace(this.#buffer, this.#cursor);
    if (position >= this.#buffer.length) {
      return [undefined, this.#readError];
    }

    const currentByte = byteAt(this.#buffer, position);
    if (this.#last.kind === "array") {
      if (currentByte === 0x5d) {
        return [position, undefined];
      }
      if (this.#last.count > 0) {
        if (currentByte !== 0x2c) {
          return [undefined, new Error("json array value missing comma")];
        }
        position = skipWhitespace(this.#buffer, position + 1);
      }
    } else if (this.#last.kind === "object") {
      if (this.#last.expecting === "key") {
        if (currentByte === 0x7d) {
          return [position, undefined];
        }
        if (this.#last.count > 0) {
          if (currentByte !== 0x2c) {
            return [undefined, new Error("json object member missing comma")];
          }
          position = skipWhitespace(this.#buffer, position + 1);
        }
      } else {
        if (currentByte !== 0x3a) {
          return [undefined, new Error("json object name missing colon")];
        }
        position = skipWhitespace(this.#buffer, position + 1);
      }
    }

    if (position >= this.#buffer.length) {
      return [undefined, new Error("unexpected end of JSON input")];
    }
    return [position, undefined];
  }

  #acceptsValue(): bool {
    return this.#last.kind !== "object" || this.#last.expecting === "value";
  }

  #finishValue(): void {
    if (this.#last.kind === "object" && this.#last.expecting === "key") {
      this.#last.expecting = "value";
      return;
    }
    this.#last.count++;
    if (this.#last.kind === "object") {
      this.#last.expecting = "key";
    }
  }

  #push(kind: "array" | "object"): void {
    this.#stack = GoSliceAppend(this.#stack, this.#last, containerFrameValueOps);
    this.#last = { kind, count: 0, expecting: kind === "object" ? "key" : "value" };
  }

  #pop(): GoError {
    if (this.#stack.length === 0) {
      return new Error("json decoder container stack underflow");
    }
    const parentIndex = this.#stack.length - 1;
    this.#last = GoSliceLoad(this.#stack, parentIndex, containerFrameValueOps);
    this.#stack = GoSliceReslice(this.#stack, 0, parentIndex);
    this.#finishValue();
    return undefined;
  }

  #exhaustedError(): Error {
    return this.#readError ?? new Error("json decoder exhausted");
  }
}

export const DecoderValueOps: GoValueOps<Decoder> = Object.freeze({
  zero: (): Decoder => new Decoder(),
  copy: (value: Decoder): Decoder => new Decoder(undefined, value),
});

export class Encoder {
  #writer: Writer | undefined;
  #buffer: GoSlice<byte> = GoNilSlice<byte>();
  #stack: GoSlice<ContainerFrame> = GoNilSlice<ContainerFrame>();
  #last: ContainerFrame = invalidFrame();
  #initialized: bool = false;

  constructor(writer?: Writer, source?: Encoder) {
    if (source !== undefined) {
      this.#writer = source.#writer;
      this.#buffer = source.#buffer;
      this.#stack = source.#stack;
      this.#last = containerFrameValueOps.copy(source.#last);
      this.#initialized = source.#initialized;
    } else if (writer !== undefined) {
      this.#writer = writer;
      this.#last = topFrame();
      this.#initialized = true;
    }
  }

  WriteToken(token: Token): GoError {
    const initializedError = this.#initializedError();
    if (initializedError !== undefined) {
      return initializedError;
    }
    const kind = token.Kind();
    switch (kind) {
      case "{":
      case "[": {
        if (!this.#acceptsValue()) {
          return new Error("json object name must be a string");
        }
        const prefixError = this.#appendPrefix();
        if (prefixError !== undefined) {
          return prefixError;
        }
        this.#appendByte(kind.charCodeAt(0));
        this.#push(kind === "{" ? "object" : "array");
        return undefined;
      }
      case "}":
        return this.#close("object", 0x7d);
      case "]":
        return this.#close("array", 0x5d);
      case "n": {
        if (!this.#acceptsValue()) {
          return new Error("json object name must be a string");
        }
        const prefixError = this.#appendPrefix();
        if (prefixError !== undefined) {
          return prefixError;
        }
        this.#appendString("null");
        this.#finishValue();
        return this.#flushCompleteTopLevel();
      }
      default:
        return new Error(`unsupported json token ${kind}`);
    }
  }

  WriteValue(value: Value): GoError {
    const initializedError = this.#initializedError();
    if (initializedError !== undefined) {
      return initializedError;
    }
    const [decoded, decodeError] = decodeJsonValue(value, 0, value.length);
    if (decodeError !== undefined) {
      return decodeError;
    }
    if (this.#last.kind === "object" && this.#last.expecting === "key" && typeof decoded !== "string") {
      return new Error("json object name must be a string");
    }
    const prefixError = this.#appendPrefix();
    if (prefixError !== undefined) {
      return prefixError;
    }
    for (let index = 0; index < value.length; index++) {
      this.#buffer = GoSliceAppend(
        this.#buffer,
        GoSliceLoad(value, index, GoNumberValueOps),
        GoNumberValueOps,
      );
    }
    this.#finishValue();
    return this.#flushCompleteTopLevel();
  }

  #initializedError(): GoError {
    return this.#initialized && this.#writer !== undefined
      ? undefined
      : new Error("json encoder is an uninitialized zero value");
  }

  #acceptsValue(): bool {
    return this.#last.kind !== "object" || this.#last.expecting === "value";
  }

  #appendPrefix(): GoError {
    if (this.#last.kind === "array") {
      if (this.#last.count > 0) {
        this.#appendByte(0x2c);
      }
      return undefined;
    }
    if (this.#last.kind === "object") {
      if (this.#last.expecting === "key") {
        if (this.#last.count > 0) {
          this.#appendByte(0x2c);
        }
      } else {
        this.#appendByte(0x3a);
      }
      return undefined;
    }
    return this.#last.kind === "top" ? undefined : new Error("json encoder has invalid state");
  }

  #appendByte(value: byte): void {
    this.#buffer = GoSliceAppend(this.#buffer, value, GoNumberValueOps);
  }

  #appendString(value: string): void {
    const bytes = textEncoder.encode(value);
    for (let index = 0; index < bytes.length; index++) {
      this.#appendByte(bytes[index]!);
    }
  }

  #finishValue(): void {
    if (this.#last.kind === "object" && this.#last.expecting === "key") {
      this.#last.expecting = "value";
      return;
    }
    this.#last.count++;
    if (this.#last.kind === "object") {
      this.#last.expecting = "key";
    }
  }

  #push(kind: "array" | "object"): void {
    this.#stack = GoSliceAppend(this.#stack, this.#last, containerFrameValueOps);
    this.#last = { kind, count: 0, expecting: kind === "object" ? "key" : "value" };
  }

  #close(expected: "array" | "object", token: byte): GoError {
    if (this.#last.kind !== expected || (expected === "object" && this.#last.expecting !== "key")) {
      return new Error(`json encoder mismatched ${String.fromCharCode(token)} token`);
    }
    this.#appendByte(token);
    if (this.#stack.length === 0) {
      return new Error("json encoder container stack underflow");
    }
    const parentIndex = this.#stack.length - 1;
    this.#last = GoSliceLoad(this.#stack, parentIndex, containerFrameValueOps);
    this.#stack = GoSliceReslice(this.#stack, 0, parentIndex);
    this.#finishValue();
    return this.#flushCompleteTopLevel();
  }

  #flushCompleteTopLevel(): GoError {
    if (this.#last.kind !== "top" || this.#stack.length !== 0) {
      return undefined;
    }
    this.#appendByte(0x0a);
    const output = this.#buffer;
    const writer = this.#writer;
    if (writer === undefined) {
      return new Error("json encoder is an uninitialized zero value");
    }
    const [count, error] = writer.Write(output);
    if (!Number.isInteger(count) || count < 0 || count > output.length) {
      return new Error("json writer returned an invalid byte count");
    }
    if (error !== undefined) {
      this.#buffer = GoSliceReslice(output, count, output.length);
      return error;
    }
    if (count !== output.length) {
      this.#buffer = GoSliceReslice(output, count, output.length);
      return new Error("short write");
    }
    this.#buffer = GoSliceReslice(output, 0, 0);
    return undefined;
  }
}

export const EncoderValueOps: GoValueOps<Encoder> = Object.freeze({
  zero: (): Encoder => new Encoder(),
  copy: (value: Encoder): Encoder => new Encoder(undefined, value),
});

export function NewDecoder(reader: Reader, ...options: Option[]): Decoder {
  void options;
  return new Decoder(reader);
}

export function NewEncoder(writer: Writer, ...options: Option[]): Encoder {
  void options;
  return new Encoder(writer);
}

export function WithIndent(indent: string): Option {
  return { name: "WithIndent", value: indent };
}

export function WithIndentPrefix(prefix: string): Option {
  return { name: "WithIndentPrefix", value: prefix };
}

const normalizeKind = (value: byte): Kind => {
  const character = String.fromCharCode(value);
  return character === "-" || (character >= "0" && character <= "9") ? "0" : character;
};

const byteAt = (value: GoSlice<byte>, index: int): byte => {
  return GoSliceLoad(value, index, GoNumberValueOps);
};

const skipWhitespace = (value: GoSlice<byte>, start: int): int => {
  let position = start;
  while (position < value.length) {
    const current = byteAt(value, position);
    if (current !== 0x20 && current !== 0x09 && current !== 0x0a && current !== 0x0d) {
      break;
    }
    position++;
  }
  return position;
};

const scanValueEnd = (value: GoSlice<byte>, start: int): [int | undefined, GoError] => {
  if (start >= value.length) {
    return [undefined, new Error("unexpected end of JSON input")];
  }
  const first = byteAt(value, start);
  if (first === 0x22) {
    return scanStringEnd(value, start);
  }
  if (first === 0x7b || first === 0x5b) {
    let objectDepth = first === 0x7b ? 1 : 0;
    let arrayDepth = first === 0x5b ? 1 : 0;
    let position = start + 1;
    while (position < value.length) {
      const current = byteAt(value, position);
      if (current === 0x22) {
        const [stringEnd, stringError] = scanStringEnd(value, position);
        if (stringError !== undefined || stringEnd === undefined) {
          return [undefined, stringError];
        }
        position = stringEnd;
        continue;
      }
      if (current === 0x7b) objectDepth++;
      if (current === 0x7d) objectDepth--;
      if (current === 0x5b) arrayDepth++;
      if (current === 0x5d) arrayDepth--;
      position++;
      if (objectDepth === 0 && arrayDepth === 0) {
        return [position, undefined];
      }
      if (objectDepth < 0 || arrayDepth < 0) {
        return [undefined, new Error("mismatched JSON container")];
      }
    }
    return [undefined, new Error("unexpected end of JSON container")];
  }

  let position = start;
  while (position < value.length) {
    const current = byteAt(value, position);
    if (
      current === 0x20 || current === 0x09 || current === 0x0a || current === 0x0d
      || current === 0x2c || current === 0x5d || current === 0x7d
    ) {
      break;
    }
    position++;
  }
  return position === start
    ? [undefined, new Error("invalid JSON value")]
    : [position, undefined];
};

const scanStringEnd = (value: GoSlice<byte>, start: int): [int | undefined, GoError] => {
  let escaped = false;
  for (let position = start + 1; position < value.length; position++) {
    const current = byteAt(value, position);
    if (escaped) {
      escaped = false;
      continue;
    }
    if (current === 0x5c) {
      escaped = true;
      continue;
    }
    if (current === 0x22) {
      return [position + 1, undefined];
    }
  }
  return [undefined, new Error("unexpected end of JSON string")];
};

const decodeJsonValue = (value: GoSlice<byte>, start: int, end: int): [unknown, GoError] => {
  try {
    const bytes = new Uint8Array(end - start);
    for (let index = start; index < end; index++) {
      bytes[index - start] = byteAt(value, index);
    }
    return [JSON.parse(textDecoder.decode(bytes)), undefined];
  } catch (error) {
    return [undefined, toError(error)];
  }
};

export const writeTo = (writer: Writer, bytes: GoSlice<byte>): GoError => {
  const [, error] = writer.Write(bytes);
  return error;
};

const toError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error));
};
