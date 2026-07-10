import type { byte, bool } from "../../scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../compat.js";
import type { Reader, Writer } from "../../io.js";
import type { Decoder, Encoder, Option } from "./json/jsontext.js";
import { NewDecoder, NewEncoder, writeTo } from "./json/jsontext.js";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export interface Options extends Option {
  readonly __jsonOptions?: never;
}

export const JsonFieldNames: unique symbol = Symbol("tsts.jsonFieldNames");

export interface JsonFieldSpec<T = unknown> {
  readonly name: string;
  readonly omitZero?: bool;
  readonly omitEmpty?: bool;
  readonly ignored?: bool;
  readonly zero?: "value" | "nil";
  readonly isZero?: (value: T) => bool;
  readonly marshal?: (value: T) => unknown;
  readonly unmarshal?: (value: unknown) => T;
}

export type JsonFieldName<T = unknown> = string | JsonFieldSpec<T>;

export type JsonFieldNameMap = Record<string, JsonFieldName>;

export type JsonFieldNameMapFor<T extends object> = {
  readonly [K in Extract<keyof T, string>]?: JsonFieldName<T[K]>;
};

export interface JsonStructMetadata<T extends object> {
  readonly unitId: string;
  readonly fields: JsonFieldNameMapFor<T>;
  readonly strategy: "runtime" | "custom-codec" | "source-metadata";
  readonly reason: string;
}

export type JsonFieldNamesForGoStructContract<
  T extends object,
  UnitId extends string,
  Fields extends JsonFieldNameMapFor<T>,
  Strategy extends "custom-codec" | "source-metadata",
  Reason extends string,
> = {
  readonly __jsonFieldNamesForGoStructContract?: {
    readonly value: T;
    readonly unitId: UnitId;
    readonly fields: Fields;
    readonly strategy: Strategy;
    readonly reason: Reason;
  };
};

export function DefineJsonFieldNamesForGoStruct<T extends object>(
  unitId: string,
  fields: JsonFieldNameMapFor<T>,
  contract: Pick<JsonStructMetadata<T>, "strategy" | "reason">,
): JsonStructMetadata<T> {
  return { unitId, fields, strategy: contract.strategy, reason: contract.reason };
}

export function AttachJsonFieldNamesForGoStruct<T extends object>(value: T, metadata: JsonStructMetadata<T>): T {
  globalThis.Object.defineProperty(value, JsonFieldNames, { configurable: true, value: metadata.fields });
  return value;
}

export interface MarshalerTo {
  MarshalJSONTo(encoder: Encoder): GoError;
}

export interface UnmarshalerFrom {
  UnmarshalJSONFrom(decoder: Decoder): GoError;
}

export function Deterministic(value: bool): Options {
  return { name: "Deterministic", value };
}

export function Marshal(value: unknown, ...opts: Array<Options>): [GoSlice<byte>, GoError] {
  try {
    return [Array.from(textEncoder.encode(stringify(value, opts))), undefined];
  } catch (error) {
    return [[], toError(error)];
  }
}

export function MarshalEncode(encoder: GoPtr<Encoder>, value: unknown, ...opts: Array<Options>): GoError {
  if (encoder === undefined) {
    return new Error("nil json encoder");
  }
  if (isMarshalerTo(value)) {
    return value.MarshalJSONTo(encoder);
  }
  return encoder.WriteValue(JSON.parse(stringify(value, opts)));
}

export function MarshalWrite(writer: Writer, value: unknown, ...opts: Array<Options>): GoError {
  const [bytes, err] = Marshal(value, ...opts);
  if (err !== undefined) {
    return err;
  }
  return writeTo(writer, bytes);
}

export function Unmarshal(data: GoSlice<byte>, out: unknown, ...opts: Array<Options>): GoError {
  void opts;
  try {
    assignDecoded(out, JSON.parse(textDecoder.decode(Uint8Array.from(data as Array<number>))));
    return undefined;
  } catch (error) {
    return toError(error);
  }
}

export function UnmarshalDecode(decoder: GoPtr<Decoder>, out: unknown, ...opts: Array<Options>): GoError {
  void opts;
  if (decoder === undefined) {
    return new Error("nil json decoder");
  }
  if (isUnmarshalerFrom(out)) {
    return out.UnmarshalJSONFrom(decoder);
  }
  const [value, err] = decoder.ReadValue();
  if (err !== undefined) {
    return err;
  }
  assignDecoded(out, value);
  return undefined;
}

export function UnmarshalRead(reader: Reader, out: unknown, ...opts: Array<Options>): GoError {
  return UnmarshalDecode(NewDecoder(reader), out, ...opts);
}

const stringify = (value: unknown, opts: Array<Options>): string => {
  const indent = opts.find((option) => option.name === "WithIndent")?.value;
  return JSON.stringify(value, (_key, current) => normalizeForJson(current), typeof indent === "string" ? indent : undefined);
}

const normalizeForJson = (value: unknown): unknown => {
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  if (value instanceof Uint8Array) {
    return Array.from(value);
  }
  const fieldNames = getJsonFieldNames(value);
  if (fieldNames !== undefined) {
    const normalized: Record<string, unknown> = {};
    const fields = value as Record<string, unknown>;
    for (const [key, field] of Object.entries(fieldNames)) {
      const current = fields[key];
      if (typeof current === "function") {
        continue;
      }
      if (typeof field === "object" && field.ignored === true) {
        continue;
      }
      const name = typeof field === "string" ? field : field.name;
      if (typeof field === "object" && field.omitZero === true && isZeroJsonValue(current, field)) {
        continue;
      }
      const projected = typeof field === "object" && field.marshal !== undefined
        ? field.marshal(current)
        : current;
      if (typeof field === "object" && field.omitEmpty === true && isEmptyJsonValue(normalizeForJson(projected))) {
        continue;
      }
      normalized[name] = projected;
    }
    return normalized;
  }
  return value;
}

const assignDecoded = (out: unknown, value: unknown): void => {
  if (out === undefined || out === null) {
    return;
  }
  if (Array.isArray(out) && Array.isArray(value)) {
    out.splice(0, out.length, ...value);
    return;
  }
  if (typeof out === "object" && typeof value === "object" && value !== null) {
    Object.assign(out, decodeFieldNames(out, value as Record<string, unknown>));
  }
}

const decodeFieldNames = (out: object, value: Record<string, unknown>): Record<string, unknown> => {
  const fieldNames = getJsonFieldNames(out);
  if (fieldNames === undefined) {
    return value;
  }
  const reverse = new Map<string, string>();
  for (const [key, field] of Object.entries(fieldNames)) {
    if (typeof field === "object" && field.ignored === true) continue;
    reverse.set(typeof field === "string" ? field : field.name, key);
  }
  const decoded: Record<string, unknown> = {};
  for (const [key, current] of Object.entries(value)) {
    const decodedKey = reverse.get(key);
    if (decodedKey === undefined) {
      continue;
    }
    const field = fieldNames[decodedKey];
    decoded[decodedKey] = typeof field === "object" && field.unmarshal !== undefined
      ? field.unmarshal(current)
      : current;
  }
  return decoded;
}

const getJsonFieldNames = (value: unknown): JsonFieldNameMap | undefined => {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  return (value as { [JsonFieldNames]?: JsonFieldNameMap })[JsonFieldNames];
}

const isZeroJsonValue = (value: unknown, field: JsonFieldSpec): bool => {
  if (field.isZero !== undefined) return field.isZero(value);
  if (field.zero === "nil") return value === undefined;
  return value === undefined || value === false || value === 0 || value === 0n || value === "";
}

const isEmptyJsonValue = (value: unknown): bool => {
  if (value === undefined || value === null || value === "") return true;
  if (Array.isArray(value) || value instanceof Uint8Array) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

const isMarshalerTo = (value: unknown): value is MarshalerTo => {
  return typeof value === "object" && value !== null && "MarshalJSONTo" in value && typeof (value as { MarshalJSONTo: unknown }).MarshalJSONTo === "function";
}

const isUnmarshalerFrom = (value: unknown): value is UnmarshalerFrom => {
  return typeof value === "object" && value !== null && "UnmarshalJSONFrom" in value && typeof (value as { UnmarshalJSONFrom: unknown }).UnmarshalJSONFrom === "function";
}

const toError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error));
}
