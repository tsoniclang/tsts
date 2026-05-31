/**
 * Generated AST node decoder dispatch table.
 *
 * Port surface of TS-Go `internal/api/encoder/decoder_generated.go`
 * (~1140 LoC). The upstream file is a generated dispatch table that
 * maps each ast.Kind to a decode-extended-data function. This skeleton
 * exposes the dispatch entry point; per-kind decoders will be filled
 * in from the upstream baseline corpus.
 */

import type { Node as AstNode } from "../../ast/index.js";
import type { ASTDecoder } from "./decoder.js";

export type DecodeExtendedDataFunc = (
  decoder: ASTDecoder, data: number, childIndices: readonly number[], commonData: number,
) => AstNode | undefined;

export type DecodeCommonDataFunc = (commonData: number) => unknown;

export function decodeExtendedData(
  decoder: ASTDecoder, kind: number, data: number,
  childIndices: readonly number[], commonData: number,
): AstNode | undefined {
  const fn = extendedDataDecoders[kind];
  if (fn === undefined) return undefined;
  return fn(decoder, data, childIndices, commonData);
}

export function decodeNodeCommonData(kind: number, commonData: number): unknown {
  const fn = commonDataDecoders[kind];
  if (fn === undefined) return undefined;
  return fn(commonData);
}

const extendedDataDecoders: Record<number, DecodeExtendedDataFunc | undefined> = {};
const commonDataDecoders: Record<number, DecodeCommonDataFunc | undefined> = {};

export function registerExtendedDataDecoder(kind: number, fn: DecodeExtendedDataFunc): void {
  extendedDataDecoders[kind] = fn;
}

export function registerCommonDataDecoder(kind: number, fn: DecodeCommonDataFunc): void {
  commonDataDecoders[kind] = fn;
}
