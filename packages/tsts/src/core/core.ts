/**
 * Core utilities used across the compiler.
 *
 * Faithful port of TS-Go internal/core/core.go.
 * Where the JS native is sufficient (filter, map, every, some) we wrap it;
 * otherwise the helper is implemented to match Go semantics exactly.
 */

import type { int } from "@tsonic/core/types.js";
// Interim Node boundary: per spec section J, use Node's process directly here.
import process from "node:process";
import type { TextPos } from "./text.js";
import { isLineBreak } from "../stringutil/util.js";

export interface DebugRuntimeEnvironment {
  readonly TS_GO_DEBUG_STACK_LIMIT?: string | undefined;
}

export function applyDebugStackLimit(
  env: DebugRuntimeEnvironment = runtimeEnvironment(),
): number | undefined {
  const value = env["TS_GO_DEBUG_STACK_LIMIT"];
  if (value === undefined || value === "") return undefined;
  const limit = Number.parseInt(value, 10);
  if (!Number.isFinite(limit) || limit <= 0) return undefined;
  return limit;
}

function runtimeEnvironment(): DebugRuntimeEnvironment {
  return {
    TS_GO_DEBUG_STACK_LIMIT: process.env["TS_GO_DEBUG_STACK_LIMIT"],
  };
}

// ---------------------------------------------------------------------------
// Filter / Map family
// ---------------------------------------------------------------------------

export function filter<T>(slice: readonly T[], f: (item: T) => boolean): readonly T[] {
  return slice.filter(f);
}

export function* filterSeq<T>(slice: readonly T[], f: (item: T) => boolean): Iterable<T> {
  for (const value of slice) {
    if (f(value)) {
      yield value;
    }
  }
}

export function filterIndex<T>(
  slice: readonly T[],
  f: (item: T, index: number, slice: readonly T[]) => boolean,
): readonly T[] {
  return slice.filter(f);
}

export function map<T, U>(slice: readonly T[], f: (item: T) => U): readonly U[] {
  return slice.map(f);
}

export function tryMap<T, U>(slice: readonly T[], f: (item: T) => U): readonly U[] {
  return slice.map(f);
}

export function mapIndex<T, U>(slice: readonly T[], f: (item: T, index: number) => U): readonly U[] {
  return slice.map(f);
}

export function mapNonNil<T, U>(slice: readonly T[], f: (item: T) => U | undefined | null): readonly U[] {
  const out: U[] = [];
  for (const item of slice) {
    const mapped = f(item);
    if (!isZeroValue(mapped)) out.push(mapped as U);
  }
  return out;
}

export function mapFiltered<T, U>(slice: readonly T[], f: (item: T) => readonly [U, boolean]): readonly U[] {
  const out: U[] = [];
  for (const item of slice) {
    const [value, include] = f(item);
    if (include) out.push(value);
  }
  return out;
}

export function flatMap<T, U>(slice: readonly T[], f: (item: T) => readonly U[]): readonly U[] {
  return slice.flatMap((x) => [...f(x)]);
}

export function flatten<T>(arrays: readonly (readonly T[])[]): readonly T[] {
  const result: T[] = [];
  for (const sub of arrays) {
    for (const item of sub) result.push(item);
  }
  return result;
}

export function sameMap<T>(slice: readonly T[], f: (item: T) => T): readonly T[] {
  let changed = false;
  const out = slice.map((item) => {
    const mapped = f(item);
    if (mapped !== item) changed = true;
    return mapped;
  });
  return changed ? out : slice;
}

export function sameMapIndex<T>(slice: readonly T[], f: (item: T, index: number) => T): readonly T[] {
  let changed = false;
  const out = slice.map((item, i) => {
    const mapped = f(item, i);
    if (mapped !== item) changed = true;
    return mapped;
  });
  return changed ? out : slice;
}

export function same<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Predicates / find
// ---------------------------------------------------------------------------

export function some<T>(slice: readonly T[], f: (item: T) => boolean): boolean {
  return slice.some(f);
}

export function every<T>(slice: readonly T[], f: (item: T) => boolean): boolean {
  return slice.every(f);
}

export function or<T>(...preds: readonly ((item: T) => boolean)[]): (item: T) => boolean {
  return (item: T) => preds.some((p) => p(item));
}

export function find<T>(slice: readonly T[], f: (item: T) => boolean): T | undefined {
  return slice.find(f);
}

export function findLast<T>(slice: readonly T[], f: (item: T) => boolean): T | undefined {
  for (let i = slice.length - 1; i >= 0; i -= 1) {
    if (f(slice[i]!)) return slice[i];
  }
  return undefined;
}

export function findIndex<T>(slice: readonly T[], f: (item: T) => boolean): number {
  return slice.findIndex(f);
}

export function findLastIndex<T>(slice: readonly T[], f: (item: T) => boolean): number {
  for (let i = slice.length - 1; i >= 0; i -= 1) {
    if (f(slice[i]!)) return i;
  }
  return -1;
}

// ---------------------------------------------------------------------------
// First / last access
// ---------------------------------------------------------------------------

export function firstOrNil<T>(slice: readonly T[]): T | undefined {
  return slice.length > 0 ? slice[0] : undefined;
}

export function lastOrNil<T>(slice: readonly T[]): T | undefined {
  return slice.length > 0 ? slice[slice.length - 1] : undefined;
}

export function elementOrNil<T>(slice: readonly T[], index: int): T | undefined {
  return index < slice.length ? slice[index] : undefined;
}

export function firstOrNilSeq<T>(seq: Iterable<T> | undefined): T | undefined {
  if (seq === undefined) return undefined;
  for (const value of seq) {
    return value;
  }
  return undefined;
}

export function firstOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice[0];
}

export function lastOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice[slice.length - 1];
}

export function singleOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice.length === 1 ? slice[0] : undefined;
}

export function firstNonNil<T, U>(slice: readonly T[], f: (item: T) => U | undefined | null): U | undefined {
  for (const item of slice) {
    const mapped = f(item);
    if (mapped !== undefined && mapped !== null) return mapped;
  }
  return undefined;
}

export function firstNonZero<T>(...values: readonly T[]): T | undefined {
  for (const value of values) {
    if (!isZeroValue(value)) return value;
  }
  return values[0];
}

// ---------------------------------------------------------------------------
// Branching helpers
// ---------------------------------------------------------------------------

export function ifElse<T>(cond: boolean, whenTrue: T, whenFalse: T): T {
  return cond ? whenTrue : whenFalse;
}

export function orElse<T>(value: T | undefined | null, defaultValue: T): T {
  if (isZeroValue(value)) return defaultValue;
  return value as T;
}

export function coalesce<T>(...values: readonly (T | undefined | null)[]): T | undefined {
  for (const v of values) {
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
}

export function firstTruthy<T>(...values: readonly T[]): T | undefined {
  for (const v of values) {
    if (v) return v;
  }
  return undefined;
}

function isZeroValue(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (value === false) return true;
  if (value === 0) return true;
  if (value === "") return true;
  return false;
}

// ---------------------------------------------------------------------------
// Array manipulation
// ---------------------------------------------------------------------------

export function concatenate<T>(s1: readonly T[] | undefined, s2: readonly T[] | undefined): readonly T[] {
  if (s2 === undefined || s2.length === 0) return s1 ?? [];
  if (s1 === undefined || s1.length === 0) return s2;
  return [...s1, ...s2];
}

export function splice<T>(s1: readonly T[], start: int, deleteCount: int, ...items: readonly T[]): readonly T[] {
  let s: int = start;
  let dc: int = deleteCount;
  if (s < 0) s = s1.length + s;
  if (s < 0) s = 0;
  if (s > s1.length) s = s1.length;
  if (dc < 0) dc = 0;
  let end: int = s + dc;
  if (end > s1.length) end = s1.length;
  if (s === end && items.length === 0) return s1;
  return [...s1.slice(0, s), ...items, ...s1.slice(end)];
}

export function countWhere<T>(slice: readonly T[], f: (item: T) => boolean): number {
  let count = 0;
  for (const v of slice) if (f(v)) count++;
  return count;
}

export function replaceElement<T>(slice: readonly T[], index: int, value: T): readonly T[] {
  const result = slice.slice();
  result[index] = value;
  return result;
}

export function insertSorted<T>(slice: readonly T[], element: T, cmp: (a: T, b: T) => number): readonly T[] {
  let lo = 0;
  let hi = slice.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cmp(slice[mid]!, element) < 0) lo = mid + 1;
    else hi = mid;
  }
  return [...slice.slice(0, lo), element, ...slice.slice(lo)];
}

export function minAllFunc<T>(xs: readonly T[], cmp: (a: T, b: T) => number): readonly T[] {
  if (xs.length === 0) return [];
  let m = xs[0]!;
  let mins: T[] = [m];
  for (let i = 1; i < xs.length; i++) {
    const x = xs[i]!;
    const c = cmp(x, m);
    if (c < 0) {
      m = x;
      mins = [x];
    } else if (c === 0) {
      mins.push(x);
    }
  }
  return mins;
}

export function appendIfUnique<T>(slice: readonly T[], element: T): readonly T[] {
  if (slice.includes(element)) return slice;
  return [...slice, element];
}

export function singleElementSlice<T>(element: T | undefined): readonly T[] {
  if (element === undefined || element === null) return [];
  return [element];
}

export function deduplicate<T>(slice: readonly T[]): readonly T[] {
  if (slice.length <= 1) return slice;
  const seen = new Set<T>();
  const result: T[] = [];
  for (const v of slice) {
    if (!seen.has(v)) {
      seen.add(v);
      result.push(v);
    }
  }
  return result.length === slice.length ? slice : result;
}

export function deduplicateSorted<T>(slice: readonly T[], isEqual: (a: T, b: T) => boolean): readonly T[] {
  if (slice.length === 0) return slice;
  let last = slice[0]!;
  const deduplicated: T[] = [last];
  for (let i = 1; i < slice.length; i++) {
    const next = slice[i]!;
    if (isEqual(last, next)) continue;
    deduplicated.push(next);
    last = next;
  }
  return deduplicated;
}

export function unorderedEqual<T>(s1: readonly T[], s2: readonly T[]): boolean {
  if (s1.length !== s2.length) return false;
  const counts = new Map<T, number>();
  for (const v of s1) counts.set(v, (counts.get(v) ?? 0) + 1);
  for (const v of s2) {
    const c = (counts.get(v) ?? 0) - 1;
    if (c < 0) return false;
    counts.set(v, c);
  }
  return true;
}

// ---------------------------------------------------------------------------
// Memoize / identity
// ---------------------------------------------------------------------------

export function memoize<T>(create: () => T): () => T {
  let cached: T | undefined;
  let computed = false;
  return () => {
    if (!computed) {
      cached = create();
      computed = true;
    }
    return cached as T;
  };
}

export function identity<T>(t: T): T {
  return t;
}

export function checkEachDefined<S>(s: readonly (S | undefined)[], msg: string): readonly S[] {
  for (const value of s) {
    if (value === undefined || value === null) throw new Error(msg);
  }
  return s as readonly S[];
}

export function must<T>(v: T | undefined, err: Error | string | undefined): T {
  if (err !== undefined && err !== null) {
    throw typeof err === "string" ? new Error(err) : err;
  }
  if (v === undefined) throw new Error("must: unexpected undefined");
  return v;
}

export function firstResult<T>(t: T, ..._rest: readonly unknown[]): T {
  return t;
}

// ---------------------------------------------------------------------------
// Boolean comparison
// ---------------------------------------------------------------------------

export function compareBooleans(a: boolean, b: boolean): number {
  if (a && !b) return 1;
  if (!a && b) return -1;
  return 0;
}

// ---------------------------------------------------------------------------
// Map diffing
// ---------------------------------------------------------------------------

export function diffMaps<K, V>(
  m1: ReadonlyMap<K, V>,
  m2: ReadonlyMap<K, V>,
  onAdded: ((k: K, v: V) => void) | undefined,
  onRemoved: ((k: K, v: V) => void) | undefined,
  onChanged: ((k: K, v1: V, v2: V) => void) | undefined,
): void {
  diffMapsFunc(m1, m2, (a, b) => a === b, onAdded, onRemoved, onChanged);
}

export function diffMapsFunc<K, V1, V2>(
  m1: ReadonlyMap<K, V1>,
  m2: ReadonlyMap<K, V2>,
  equalValues: (a: V1, b: V2) => boolean,
  onAdded: ((k: K, v: V2) => void) | undefined,
  onRemoved: ((k: K, v: V1) => void) | undefined,
  onChanged: ((k: K, v1: V1, v2: V2) => void) | undefined,
): void {
  if (onAdded !== undefined) {
    for (const [k, v2] of m2) {
      if (!m1.has(k)) onAdded(k, v2);
    }
  }
  if (onChanged === undefined && onRemoved === undefined) return;
  for (const [k, v1] of m1) {
    if (m2.has(k)) {
      const v2 = m2.get(k)!;
      if (onChanged !== undefined && !equalValues(v1, v2)) onChanged(k, v1, v2);
    } else {
      if (onRemoved !== undefined) onRemoved(k, v1);
    }
  }
}

export function copyMapInto<K, V>(dst: Map<K, V> | undefined, src: ReadonlyMap<K, V>): Map<K, V> {
  if (dst === undefined) return new Map(src);
  for (const [k, v] of src) dst.set(k, v);
  return dst;
}

export function comparableValuesEqual<T>(left: T, right: T): boolean {
  return left === right;
}

// ---------------------------------------------------------------------------
// String helpers
// ---------------------------------------------------------------------------

export function indexAfter(s: string, pattern: string, startIndex: number): number {
  const matched = s.indexOf(pattern, startIndex);
  return matched;
}

export type JsonSerializable =
  | string
  | number
  | boolean
  | null
  | readonly JsonSerializable[]
  | { readonly [key: string]: JsonSerializable };

export function stringifyJson(input: JsonSerializable, prefix: string, indent: string): string {
  const out = indent === "" ? stringifyJsonCompact(input) : stringifyJsonIndented(input, indent, 0);
  if (prefix === "") return out;
  // Custom prefix per line — emulate TS-Go's strings.NewReplacer(..., prefix + "\n")
  return out.split("\n").join("\n" + prefix);
}

function stringifyJsonCompact(input: JsonSerializable): string {
  if (input === null) return "null";
  if (typeof input === "string") return JSON.stringify(input);
  if (typeof input === "number") return Number.isFinite(input) ? String(input) : "null";
  if (typeof input === "boolean") return input ? "true" : "false";
  if (Array.isArray(input)) {
    const items: string[] = [];
    for (const item of input) items.push(stringifyJsonCompact(item));
    return "[" + items.join(",") + "]";
  }
  const object = input as { readonly [key: string]: JsonSerializable };
  const fields: string[] = [];
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value !== undefined) fields.push(JSON.stringify(key) + ":" + stringifyJsonCompact(value));
  }
  return "{" + fields.join(",") + "}";
}

function stringifyJsonIndented(input: JsonSerializable, indent: string, depth: number): string {
  if (input === null || typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
    return stringifyJsonCompact(input);
  }
  const childIndent = indent.repeat(depth + 1);
  const currentIndent = indent.repeat(depth);
  if (Array.isArray(input)) {
    if (input.length === 0) return "[]";
    const items: string[] = [];
    for (const item of input) items.push(childIndent + stringifyJsonIndented(item, indent, depth + 1));
    return "[\n" + items.join(",\n") + "\n" + currentIndent + "]";
  }
  const object = input as { readonly [key: string]: JsonSerializable };
  const fields: string[] = [];
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value !== undefined) fields.push(childIndent + JSON.stringify(key) + ": " + stringifyJsonIndented(value, indent, depth + 1));
  }
  if (fields.length === 0) return "{}";
  return "{\n" + fields.join(",\n") + "\n" + currentIndent + "}";
}

// ---------------------------------------------------------------------------
// ECMA line starts (UTF-16 / UTF-8 abstraction)
// ---------------------------------------------------------------------------

export type ECMALineStarts = readonly TextPos[];

export function computeECMALineStarts(text: string): ECMALineStarts {
  return [...computeECMALineStartsSeq(text)];
}

export function* computeECMALineStartsSeq(text: string): Iterable<TextPos> {
  const len = text.length;
  let pos = 0;
  let lineStart = 0;
  while (pos < len) {
    const cp = text.charCodeAt(pos);
    if (cp === 0x0D) {
      pos += 1;
      if (pos < len && text.charCodeAt(pos) === 0x0A) pos += 1;
      yield lineStart as TextPos;
      lineStart = pos;
    } else if (cp === 0x0A || cp === 0x2028 || cp === 0x2029 || isLineBreak(cp)) {
      pos += 1;
      yield lineStart as TextPos;
      lineStart = pos;
    } else {
      pos += 1;
    }
  }
  yield lineStart as TextPos;
}

export function positionToLineAndByteOffset(
  position: number,
  lineStarts: readonly TextPos[],
): { line: number; byteOffset: number } {
  // binary search for last lineStart <= position
  let lo = 0;
  let hi = lineStarts.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if ((lineStarts[mid] as unknown as number) > position) hi = mid;
    else lo = mid + 1;
  }
  const line: int = Math.max(lo - 1, 0) | 0;
  return { line, byteOffset: position - (lineStarts[line] as unknown as number) };
}

// UTF-16 code-unit offset measurement
export type UTF16Offset = number;

export function utf16Len(s: string): UTF16Offset {
  return s.length; // JS strings are already UTF-16 code units
}

// ---------------------------------------------------------------------------
// Iter helpers
// ---------------------------------------------------------------------------

export function* concatenateSeq<T>(...seqs: readonly (Iterable<T> | undefined)[]): Iterable<T> {
  for (const seq of seqs) {
    if (seq === undefined) continue;
    for (const e of seq) yield e;
  }
}

export function* enumerate<T>(seq: Iterable<T>): Iterable<readonly [number, T]> {
  let i = 0;
  for (const v of seq) {
    yield [i, v];
    i++;
  }
}

// ---------------------------------------------------------------------------
// Spelling suggestion (Levenshtein with maximum)
// ---------------------------------------------------------------------------

export function getSpellingSuggestion<T>(
  name: string,
  candidates: Iterable<T>,
  getName: (t: T) => string,
  compare: (a: T, b: T) => number,
): T | undefined {
  const maximumLengthDifference = Math.max(2, Math.floor(name.length * 0.34));
  let bestDistance = Math.floor(name.length * 0.4) + 0.9;
  let bestCandidate: T | undefined;
  for (const candidate of candidates) {
    const candidateName = getName(candidate);
    const maxLen = Math.max(candidateName.length, name.length);
    const minLen = Math.min(candidateName.length, name.length);
    if (candidateName !== "" && maxLen - minLen <= maximumLengthDifference) {
      if (candidateName === name) continue;
      if (candidateName.length < 3 && candidateName.toLowerCase() !== name.toLowerCase()) continue;
      const distance = levenshteinWithMax(name, candidateName, bestDistance);
      if (distance < 0) continue;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestCandidate = candidate;
      } else if (bestCandidate !== undefined && compare(candidate, bestCandidate) < 0) {
        bestCandidate = candidate;
      }
    }
  }
  return bestCandidate;
}

export function getSpellingSuggestionForStrings(name: string, candidates: Iterable<string>): string | undefined {
  return getSpellingSuggestion(name, candidates, identity, (a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function levenshteinWithMax(s1: string, s2: string, maxValue: number): number {
  const big = maxValue + 0.01;
  const len1: int = s1.length;
  const len2: int = s2.length;
  let previous = new Array<number>(len2 + 1);
  let current = new Array<number>(len2 + 1);
  for (let i: int = 0; i <= len2; i++) previous[i] = i;

  for (let i: int = 1; i <= len1; i++) {
    const c1 = s1[i - 1]!;
    const c1Lower = c1.toLowerCase();
    const minJ: int = Math.max(Math.ceil(i - maxValue), 1) | 0;
    const maxJ: int = Math.min(Math.floor(maxValue + i), len2) | 0;
    let colMin: number = i;
    current[0] = colMin;
    for (let j: int = 1; j < minJ; j++) current[j] = big;
    for (let j: int = minJ; j <= maxJ; j++) {
      const c2 = s2[j - 1]!;
      let substitutionDistance: number;
      if (c1Lower === c2.toLowerCase()) substitutionDistance = previous[j - 1]! + 0.1;
      else substitutionDistance = previous[j - 1]! + 2;
      let dist: number;
      if (c1 === c2) dist = previous[j - 1]!;
      else dist = Math.min(previous[j]! + 1, Math.min(current[j - 1]! + 1, substitutionDistance));
      current[j] = dist;
      if (dist < colMin) colMin = dist;
    }
    for (let j: int = maxJ + 1; j <= len2; j++) current[j] = big;
    if (colMin > maxValue) return -1;
    const tmp = previous;
    previous = current;
    current = tmp;
  }
  const res = previous[len2]!;
  return res > maxValue ? -1 : res;
}

// ---------------------------------------------------------------------------
// ScriptKind from filename
// ---------------------------------------------------------------------------

export type ScriptKind = int;
export interface ScriptKindTable {
  readonly Unknown: ScriptKind;
  readonly JS: ScriptKind;
  readonly JSX: ScriptKind;
  readonly TS: ScriptKind;
  readonly TSX: ScriptKind;
  readonly External: ScriptKind;
  readonly JSON: ScriptKind;
  readonly Deferred: ScriptKind;
}
export const ScriptKind: ScriptKindTable = {
  Unknown: 0 as ScriptKind,
  JS: 1 as ScriptKind,
  JSX: 2 as ScriptKind,
  TS: 3 as ScriptKind,
  TSX: 4 as ScriptKind,
  External: 5 as ScriptKind,
  JSON: 6 as ScriptKind,
  Deferred: 7 as ScriptKind,
};

const scriptKindNames: readonly string[] = [
  "ScriptKindUnknown",
  "ScriptKindJS",
  "ScriptKindJSX",
  "ScriptKindTS",
  "ScriptKindTSX",
  "ScriptKindExternal",
  "ScriptKindJSON",
  "ScriptKindDeferred",
];

export function scriptKindToString(i: ScriptKind): string {
  if (i === ScriptKind.Unknown) return "ScriptKindUnknown";
  if (i === ScriptKind.JS) return "ScriptKindJS";
  if (i === ScriptKind.JSX) return "ScriptKindJSX";
  if (i === ScriptKind.TS) return "ScriptKindTS";
  if (i === ScriptKind.TSX) return "ScriptKindTSX";
  if (i === ScriptKind.External) return "ScriptKindExternal";
  if (i === ScriptKind.JSON) return "ScriptKindJSON";
  if (i === ScriptKind.Deferred) return "ScriptKindDeferred";
  return "ScriptKind(" + String(i) + ")";
}

const EXT_TO_SCRIPT: ReadonlyMap<string, ScriptKind> = new Map([
  [".js", ScriptKind.JS], [".cjs", ScriptKind.JS], [".mjs", ScriptKind.JS],
  [".jsx", ScriptKind.JSX],
  [".ts", ScriptKind.TS], [".cts", ScriptKind.TS], [".mts", ScriptKind.TS],
  [".tsx", ScriptKind.TSX],
  [".json", ScriptKind.JSON],
]);

export function getScriptKindFromFileName(fileName: string): ScriptKind {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) return ScriptKind.Unknown;
  const ext = fileName.slice(dot).toLowerCase();
  if (!EXT_TO_SCRIPT.has(ext)) return ScriptKind.Unknown;
  return EXT_TO_SCRIPT.get(ext)!;
}

// ---------------------------------------------------------------------------
// Module-specifier rewrite gate
// ---------------------------------------------------------------------------

export function shouldRewriteModuleSpecifier(specifier: string, options: { rewriteRelativeImportExtensions?: boolean | undefined }): boolean {
  // We can't import tspath helpers here cleanly without circular dep; inline the predicate.
  if (!options.rewriteRelativeImportExtensions) return false;
  if (!(specifier.startsWith("./") || specifier.startsWith("../") || specifier === "." || specifier === "..")) return false;
  if (specifier.endsWith(".d.ts") || specifier.endsWith(".d.cts") || specifier.endsWith(".d.mts")) return false;
  return /\.(ts|cts|mts|tsx)$/.test(specifier);
}
