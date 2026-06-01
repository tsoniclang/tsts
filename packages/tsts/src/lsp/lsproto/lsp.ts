/**
 * LSP core helpers.
 *
 * Port of TS-Go `internal/lsp/lsproto/lsp.go`.
 */

import { isBundled } from "../../bundled/index.js";
import { splitVolumePath, toPath, type Path } from "../../tspath/index.js";

export type DocumentUri = string;
export type URI = string;
export type Method = string;

export function documentUriFileName(uri: DocumentUri): string {
  if (isBundled(uri)) return uri;
  if (uri.startsWith("file://")) {
    const parsed = new URL(uri);
    if (parsed.host !== "") return `//${parsed.host}${parsed.pathname}`;
    return fixWindowsURIPath(decodeURIComponent(parsed.pathname));
  }
  const separator = uri.indexOf(":");
  if (separator < 0) throw new Error(`invalid URI: ${uri}`);
  const scheme = uri.slice(0, separator);
  let path = uri.slice(separator + 1);
  let authority = "ts-nul-authority";
  if (path.startsWith("//")) {
    const rest = path.slice(2);
    const slash = rest.indexOf("/");
    if (slash < 0) throw new Error(`invalid URI: ${uri}`);
    authority = rest.slice(0, slash);
    path = rest.slice(slash + 1);
  }
  return `^/${scheme}/${authority}/${path}`;
}

export function documentUriPath(uri: DocumentUri, useCaseSensitiveFileNames: boolean): Path {
  return toPath(documentUriFileName(uri), "", useCaseSensitiveFileNames);
}

export function fixWindowsURIPath(path: string): string {
  if (!path.startsWith("/")) return path;
  const volume = splitVolumePath(path.slice(1));
  return volume === undefined ? path : `${volume.volume}${volume.rest}`;
}

export interface HasTextDocumentURI {
  textDocumentURI(): DocumentUri;
}

export interface HasTextDocumentPosition extends HasTextDocumentURI {
  textDocumentPosition(): Position;
}

export interface HasLocations {
  getLocations(): readonly Location[];
}

export interface HasLocation {
  getLocation(): Location;
}

export function unmarshalValue<T>(data: string): T {
  return JSON.parse(data) as T;
}

export function unmarshalAny(data: string): unknown {
  return JSON.parse(data) as unknown;
}

export function unmarshalEmpty(data: string): undefined {
  if (data.length !== 0) throw new Error(`expected empty, got: ${data}`);
  return undefined;
}

export function boolToInt(value: boolean): number {
  return value ? 1 : 0;
}

export function errNotObject(kind: string): Error {
  return new Error(`expected object start, but encountered ${kind}`);
}

export function errNull(field: string): Error {
  return new Error(`null value is not allowed for field ${JSON.stringify(field)}`);
}

export function errMissing(properties: readonly string[]): Error {
  return new Error(`missing required properties: ${properties.join(", ")}`);
}

export function errInvalidKind(typeName: string, got: string): Error {
  return new Error(`invalid ${typeName}: got ${got}`);
}

export function errInvalidValue(typeName: string, data: string): Error {
  return new Error(`invalid ${typeName}: ${data}`);
}

export function errLiteralMismatch(typeName: string, expected: string, got: string): Error {
  return new Error(`expected ${typeName} value ${expected}, got ${got}`);
}

export function assertOnlyOne(message: string, count: number): void {
  if (count !== 1) throw new Error(message);
}

export function assertAtMostOne(message: string, count: number): void {
  if (count > 1) throw new Error(message);
}

export function jsonKeyCheck(name: string, key: string): boolean {
  return name === JSON.stringify(key);
}

export function jsonObjectRawField(data: string, field: string): unknown {
  const value = JSON.parse(data) as unknown;
  if (!isObject(value)) return undefined;
  return value[field];
}

export function jsonObjectHasKey(data: string, ...keys: readonly string[]): number {
  const value = JSON.parse(data) as unknown;
  if (!isObject(value)) return -1;
  return keys.findIndex(key => Object.hasOwn(value, key));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export interface Position {
  readonly line: number;
  readonly character: number;
}

export interface Range {
  readonly start: Position;
  readonly end: Position;
}

export interface Location {
  readonly uri: DocumentUri;
  readonly range: Range;
}
