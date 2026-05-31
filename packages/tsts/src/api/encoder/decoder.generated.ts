/**
 * Generated AST node decoder dispatch table.
 *
 * Port surface of TS-Go `internal/api/encoder/decoder_generated.go`
 * (~1140 LoC). The upstream file is a generated dispatch table that
 * maps each ast.Kind to a decode-extended-data function. This skeleton
 * exposes the dispatch entry point; per-kind decoders will be filled
 * in from the upstream baseline corpus.
 */

import { ChildPropertiesByKind, Kind, type Node as AstNode } from "../../ast/index.js";
import type { ASTDecoder } from "./decoder.js";
import { NodeDataChildMask, NodeDataStringIndexMask, NodeDataTypeExtendedData, NodeDataTypeMask, NodeDataTypeString } from "./encoder.js";

export type DecodeExtendedDataFunc = (
  decoder: ASTDecoder, data: number, childIndices: readonly number[], commonData: number,
) => AstNode | undefined;

export type DecodeCommonDataFunc = (commonData: number) => unknown;

export function createStringNode(decoder: ASTDecoder, kind: number, data: number, commonData: number): AstNode {
  return decoder.createStringNode(kind, data, commonData);
}

export function createExtendedNode(
  decoder: ASTDecoder,
  kind: number,
  data: number,
  childIndices: readonly number[],
  commonData: number,
): AstNode {
  return decoder.createExtendedNode(kind, data, childIndices, commonData);
}

export function createChildrenNode(
  decoder: ASTDecoder,
  kind: number,
  data: number,
  childIndices: readonly number[],
  commonData: number,
): AstNode {
  const mask = data & NodeDataChildMask;
  const expectedProperties = ChildPropertiesByKind.get(kind as Kind) ?? [];
  if (expectedProperties.length === 0 && childIndices.length === 0) {
    return decoder.createChildrenNode(kind, data, childIndices, commonData);
  }
  return decoder.createChildrenNode(kind, mask, childIndices, commonData);
}

export function createNode(decoder: ASTDecoder, kind: number, data: number, childIndices: readonly number[]): AstNode {
  const dataType = data & NodeDataTypeMask;
  const commonData = (data >>> 24) & 0x3f;
  switch (dataType) {
    case NodeDataTypeString:
      return createStringNode(decoder, kind, data & NodeDataStringIndexMask, commonData);
    case NodeDataTypeExtendedData:
      return createExtendedNode(decoder, kind, data, childIndices, commonData);
    default:
      return createChildrenNode(decoder, kind, data, childIndices, commonData);
  }
}

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
