/**
 * Generated AST node encoder dispatch table.
 *
 * Port surface of TS-Go `internal/api/encoder/encoder_generated.go`
 * (~707 LoC). The upstream file is a generated dispatch table mapping
 * each ast.Kind to a record-extended-data function. This skeleton
 * exposes the dispatch entry point; the per-kind record functions
 * will be filled in from the upstream baseline test corpus.
 */

import type { Node as AstNode, PositionMap } from "../../ast/index.js";
import type { StringTable } from "./stringtable.js";

export type RecordExtendedDataFunc = (
  node: AstNode, strs: StringTable, positionMap: PositionMap,
  extendedData: number[], structuredData: number[],
) => void;

export type GetCommonDataFunc = (node: AstNode) => number;

/** Records the extended data for a node by dispatching on kind. */
export function recordExtendedData(
  node: AstNode, strs: StringTable, positionMap: PositionMap,
  extendedData: number[], structuredData: number[],
): void {
  const fn = extendedDataRecorders[node.kind];
  if (fn !== undefined) {
    fn(node, strs, positionMap, extendedData, structuredData);
  }
}

/** Returns the common-data byte for a node by dispatching on kind. */
export function getNodeCommonData(node: AstNode): number {
  const fn = commonDataGetters[node.kind];
  return fn === undefined ? 0 : fn(node);
}

// Lazy-initialized dispatch tables. Per-kind recorders are filled in
// incrementally to match the upstream baseline corpus.
const extendedDataRecorders: Record<number, RecordExtendedDataFunc | undefined> = {};
const commonDataGetters: Record<number, GetCommonDataFunc | undefined> = {};

export function registerExtendedDataRecorder(kind: number, fn: RecordExtendedDataFunc): void {
  extendedDataRecorders[kind] = fn;
}

export function registerCommonDataGetter(kind: number, fn: GetCommonDataFunc): void {
  commonDataGetters[kind] = fn;
}
