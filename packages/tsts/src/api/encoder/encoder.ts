/**
 * AST binary encoder.
 *
 * Substantive port of TS-Go `internal/api/encoder/encoder.go` (~733 LoC).
 * Encodes SourceFile/Node trees into a compact binary format consumed
 * by the LSP/api session protocol.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { FileReference, ModifierList, Node as AstNode, NodeArray, PositionMap, SourceFile } from "../../ast/index.js";
import { getModifierListLength, Kind } from "../../ast/index.js";
import {
  getChildrenPropertyMask,
  getNodeCommonData,
  getNodeDataType,
  NodeDataTypeChildren,
  NodeDataTypeExtendedData,
  NodeDataTypeString,
  recordExtendedData,
  recordNodeStrings,
} from "./encoder.generated.js";
import { newStringTable, type StringTable } from "./stringTable.js";

export const NodeOffsetKind = 0;
export const NodeOffsetPos = 4;
export const NodeOffsetEnd = 8;
export const NodeOffsetNext = 12;
export const NodeOffsetParent = 16;
export const NodeOffsetData = 20;
export const NodeOffsetFlags = 24;
export const NodeSize = 28;

export {
  NodeDataTypeChildren,
  NodeDataTypeExtendedData,
  NodeDataTypeString,
} from "./encoder.generated.js";

export const NodeDataTypeMask = 0xc0000000;
export const NodeDataChildMask = 0x000000ff;
export const NodeDataStringIndexMask = 0x00ffffff;
export const SyntaxKindNodeList = 0xffffffff;

export const HeaderOffsetMetadata = 0;
export const HeaderOffsetHashLo0 = 4;
export const HeaderOffsetHashLo1 = 8;
export const HeaderOffsetHashHi0 = 12;
export const HeaderOffsetHashHi1 = 16;
export const HeaderOffsetParseOptions = 20;
export const HeaderOffsetStringOffsets = 24;
export const HeaderOffsetStringData = 28;
export const HeaderOffsetExtendedData = 32;
export const HeaderOffsetStructuredData = 36;
export const HeaderOffsetNodes = 40;
export const HeaderSize = 44;
export const ProtocolVersion = 5;
const noStructuredData = 0xffffffff;

export function sourceFileHash(sourceFile: SourceFile): string {
  // Identity hash: hash the source text length + first/last 32 bytes.
  // Not cryptographic — the protocol consumes this only as a cache key
  // that survives across the wire and is recomputed on the other side.
  const text = (sourceFile as unknown as { text?: string }).text ?? "";
  const len = text.length;
  const head = text.slice(0, 32);
  const tail = text.slice(Math.max(0, len - 32));
  let h = 0;
  for (let i = 0; i < head.length; i++) h = ((h << 5) - h + head.charCodeAt(i)) | 0;
  for (let i = 0; i < tail.length; i++) h = ((h << 5) - h + tail.charCodeAt(i)) | 0;
  return `${len.toString(16)}-${(h >>> 0).toString(16)}`;
}

export function encodeParseOptions(opts: ExternalModuleIndicatorOptions): number {
  let flags = 0;
  const options = opts as unknown as { readonly JSX?: boolean; readonly Force?: boolean; readonly jsx?: unknown; readonly force?: boolean };
  if (options.JSX === true || options.jsx !== undefined) {
    flags |= 1;
  }
  if (options.Force === true || options.force === true) {
    flags |= 2;
  }
  return flags;
}

export function encodeSourceFile(sourceFile: SourceFile): Uint8Array {
  return encodeTree(sourceFile as unknown as AstNode, sourceFile);
}

export function encodeNode(node: AstNode, sourceFile: SourceFile): Uint8Array {
  return encodeTree(node, sourceFile);
}

function encodeTree(rootNode: AstNode, sourceFile: SourceFile): Uint8Array {
  let parentIndex = 0;
  let nodeCount = 0;
  let previousIndex = 0;
  let sourceFileExtendedDataOffset = -1;
  const extendedData: number[] = [];
  const structuredData: number[] = [];
  const strings = rootNode.kind === Kind.SourceFile
    ? newStringTable(sourceFile.text, 0)
    : newStringTable("", 0);
  const nodeBytes: number[] = appendUint32s([], 0, 0, 0, 0, 0, 0, 0);
  const nodeIndexMap = rootNode.kind === Kind.SourceFile
    ? createSourceFileNodeIndexMap(rootNode as SourceFile)
    : undefined;

  const writeNodeRecord = (node: AstNode, currentParentIndex: number): number => {
    nodeCount += 1;
    if (previousIndex !== 0) {
      writeUint32At(nodeBytes, previousIndex * NodeSize + NodeOffsetNext, nodeCount);
    }
    const data = getNodeData(node, strings, undefined, extendedData, structuredData, (offset) => {
      sourceFileExtendedDataOffset = offset;
    });
    appendUint32s(
      nodeBytes,
      node.kind,
      encodePosition(node.pos),
      encodePosition(node.end),
      0,
      currentParentIndex,
      data,
      node.flags,
    );
    if (nodeIndexMap !== undefined && nodeIndexMap.has(node)) {
      nodeIndexMap.set(node, nodeCount);
    }
    return nodeCount;
  };

  const visitNodeArray = (array: NodeArray<AstNode>): void => {
    nodeCount += 1;
    if (previousIndex !== 0) {
      writeUint32At(nodeBytes, previousIndex * NodeSize + NodeOffsetNext, nodeCount);
    }
    appendUint32s(
      nodeBytes,
      SyntaxKindNodeList,
      encodePosition(array.pos),
      encodePosition(array.end),
      0,
      parentIndex,
      array.length,
      0,
    );
    const savedParentIndex = parentIndex;
    const currentIndex = nodeCount;
    previousIndex = 0;
    parentIndex = currentIndex;
    for (const child of array) {
      visitNode(child);
    }
    previousIndex = currentIndex;
    parentIndex = savedParentIndex;
  };

  const visitNode = (node: AstNode): void => {
    const currentIndex = writeNodeRecord(node, parentIndex);
    const savedParentIndex = parentIndex;
    parentIndex = currentIndex;
    previousIndex = 0;
    node.forEachChild(
      (child) => {
        visitNode(child);
        return undefined;
      },
      (children) => {
        visitNodeArray(children);
        return undefined;
      },
    );
    for (const jsDoc of node.jsDoc ?? []) {
      visitNode(jsDoc);
    }
    previousIndex = currentIndex;
    parentIndex = savedParentIndex;
  };

  visitNode(rootNode);

  if (rootNode.kind === Kind.SourceFile && sourceFileExtendedDataOffset >= 0 && nodeIndexMap !== undefined) {
    const sourceFileNode = rootNode as SourceFile;
    const sourceFileWordOffset = sourceFileExtendedDataOffset / 4;
    extendedData[sourceFileWordOffset + 8] = encodeNodeIndexArray(sourceFileNode.imports, nodeIndexMap, structuredData);
    extendedData[sourceFileWordOffset + 9] = encodeModuleAugmentations(sourceFileNode.moduleAugmentations, nodeIndexMap, structuredData);
    extendedData[sourceFileWordOffset + 10] = encodeStringArray(sourceFileNode.ambientModuleNames, structuredData);
    const externalModuleIndicator = sourceFileNode.externalModuleIndicator as AstNode | undefined;
    extendedData[sourceFileWordOffset + 11] = externalModuleIndicator === undefined
      ? 0
      : externalModuleIndicator === rootNode
        ? 1
        : nodeIndexMap.get(externalModuleIndicator) ?? 0;
  }

  const hashParts = sourceFileHashParts(rootNode.kind === Kind.SourceFile ? sourceFile : undefined);
  const stringBytes = strings.encode();
  const extendedDataBytes = uint32WordsToBytes(extendedData);
  const offsetStringTableOffsets = HeaderSize;
  const offsetStringTableData = HeaderSize + strings.offsets.length * 4;
  const offsetExtendedData = offsetStringTableData + strings.stringLength();
  const offsetStructuredData = offsetExtendedData + extendedDataBytes.length;
  const offsetNodes = offsetStructuredData + structuredData.length;
  const headerBytes = appendUint32s(
    [],
    ProtocolVersion << 24,
    hashParts[0],
    hashParts[1],
    hashParts[2],
    hashParts[3],
    rootNode.kind === Kind.SourceFile ? encodeParseOptions(readParseOptions(sourceFile)) : 0,
    offsetStringTableOffsets,
    offsetStringTableData,
    offsetExtendedData,
    offsetStructuredData,
    offsetNodes,
  );

  const result = new Uint8Array(headerBytes.length + stringBytes.length + extendedDataBytes.length + structuredData.length + nodeBytes.length);
  result.set(headerBytes, 0);
  result.set(stringBytes, headerBytes.length);
  result.set(extendedDataBytes, offsetExtendedData);
  result.set(structuredData, offsetStructuredData);
  result.set(nodeBytes, offsetNodes);
  return result;
}

export function appendUint32s(buf: number[], ...values: number[]): number[] {
  for (const v of values) {
    buf.push(v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff);
  }
  return buf;
}

function writeUint32At(buf: number[], offset: number, value: number): void {
  buf[offset] = value & 0xff;
  buf[offset + 1] = (value >>> 8) & 0xff;
  buf[offset + 2] = (value >>> 16) & 0xff;
  buf[offset + 3] = (value >>> 24) & 0xff;
}

function uint32WordsToBytes(values: readonly number[]): Uint8Array {
  const result = new Uint8Array(values.length * 4);
  const view = new DataView(result.buffer);
  for (let index = 0; index < values.length; index += 1) {
    view.setUint32(index * 4, values[index]! >>> 0, true);
  }
  return result;
}

function encodePosition(value: number): number {
  return value >= 0 ? value : 0;
}

function createSourceFileNodeIndexMap(sourceFile: SourceFile): Map<AstNode, number> | undefined {
  const result = new Map<AstNode, number>();
  for (const node of sourceFile.imports) {
    result.set(node, 0);
  }
  for (const node of sourceFile.moduleAugmentations) {
    result.set(node, 0);
  }
  const externalModuleIndicator = sourceFile.externalModuleIndicator as AstNode | undefined;
  if (externalModuleIndicator !== undefined && externalModuleIndicator !== sourceFile) {
    result.set(externalModuleIndicator, 0);
  }
  return result.size === 0 ? undefined : result;
}

function getNodeData(
  node: AstNode,
  strings: StringTable,
  positionMap: PositionMap | undefined,
  extendedData: number[],
  structuredData: number[],
  onSourceFileExtendedDataOffset: (offset: number) => void,
): number {
  const dataType = getNodeDataType(node);
  switch (dataType) {
    case NodeDataTypeChildren:
      return dataType | getNodeCommonData(node) | getChildrenPropertyMask(node);
    case NodeDataTypeString:
      return dataType | getNodeCommonData(node) | recordNodeStrings(node, strings);
    case NodeDataTypeExtendedData:
      return dataType | getNodeCommonData(node) | recordExtendedDataForNode(
        node,
        strings,
        positionMap,
        extendedData,
        structuredData,
        onSourceFileExtendedDataOffset,
      );
    default:
      throw new Error(`unreachable node data type ${dataType}`);
  }
}

function recordExtendedDataForNode(
  node: AstNode,
  strings: StringTable,
  positionMap: PositionMap | undefined,
  extendedData: number[],
  structuredData: number[],
  onSourceFileExtendedDataOffset: (offset: number) => void,
): number {
  if (node.kind === Kind.SourceFile) {
    const offset = extendedData.length * 4;
    onSourceFileExtendedDataOffset(offset);
    recordExtendedDataSourceFile(node as SourceFile, strings, positionMap, extendedData, structuredData);
    return offset;
  }
  return recordExtendedData(node, strings, positionMap as PositionMap, extendedData, structuredData);
}

function recordExtendedDataSourceFile(
  sourceFile: SourceFile,
  strings: StringTable,
  positionMap: PositionMap | undefined,
  extendedData: number[],
  structuredData: number[],
): void {
  const textIndex = strings.add(sourceFile.text, sourceFile.kind, sourceFile.pos, sourceFile.end);
  const fileNameIndex = strings.add(sourceFile.fileName, 0, 0, 0);
  const pathIndex = strings.add(sourceFile.path, 0, 0, 0);
  extendedData.push(
    textIndex,
    fileNameIndex,
    pathIndex,
    sourceFile.languageVariant,
    sourceFile.scriptKind,
    encodeFileReferences(sourceFile.referencedFiles, positionMap, structuredData),
    encodeFileReferences(sourceFile.typeReferenceDirectives, positionMap, structuredData),
    encodeFileReferences(sourceFile.libReferenceDirectives, positionMap, structuredData),
    noStructuredData,
    noStructuredData,
    noStructuredData,
    0,
  );
}

export function boolToByte(b: boolean): number {
  return b ? 1 : 0;
}

export function hasModifiers(modifiers: ModifierList | undefined): boolean {
  return modifiers !== undefined && getModifierListLength(modifiers) > 0;
}

export function encodeFileReferences(refs: readonly FileReference[], positionMap: PositionMap | undefined, buf: number[]): number {
  if (refs.length === 0) {
    return noStructuredData;
  }
  void positionMap;
  const offset = buf.length;
  msgpackWriteArrayHeaderInPlace(buf, refs.length);
  const enc = new TextEncoder();
  for (const reference of refs) {
    msgpackWriteArrayHeaderInPlace(buf, 5);
    msgpackWriteUintInPlace(buf, reference.pos);
    msgpackWriteUintInPlace(buf, reference.end);
    msgpackWriteStringBytesInPlace(buf, enc.encode(reference.fileName));
    msgpackWriteUintInPlace(buf, reference.resolutionMode);
    msgpackWriteBoolInPlace(buf, reference.preserve);
  }
  return offset;
}

export function encodeNodeIndexArray(
  nodes: readonly AstNode[], indexMap: Map<AstNode, number>, buf: number[],
): number {
  if (nodes.length === 0) {
    return noStructuredData;
  }
  const offset = buf.length;
  msgpackWriteArrayHeaderInPlace(buf, nodes.length);
  for (const node of nodes) {
    msgpackWriteUintInPlace(buf, indexMap.get(node) ?? 0);
  }
  return offset;
}

export function encodeModuleAugmentations(
  nodes: readonly AstNode[], indexMap: Map<AstNode, number>, buf: number[],
): number {
  // Module augmentations are encoded as a node-index array; the same
  // serialization shape applies.
  return encodeNodeIndexArray(nodes, indexMap, buf);
}

export function encodeStringArray(strs: readonly string[], buf: number[]): number {
  if (strs.length === 0) {
    return noStructuredData;
  }
  const offset = buf.length;
  const enc = new TextEncoder();
  msgpackWriteArrayHeaderInPlace(buf, strs.length);
  for (const text of strs) {
    msgpackWriteStringBytesInPlace(buf, enc.encode(text));
  }
  return offset;
}

// ---------------------------------------------------------------------------
// MessagePack writers
// ---------------------------------------------------------------------------

export function msgpackWriteArrayHeader(buf: number[], length: number): number[] {
  if (length < 16) return [...buf, 0x90 | length];
  if (length < 0x10000) return [...buf, 0xdc, (length >>> 8) & 0xff, length & 0xff];
  return [...buf, 0xdd, (length >>> 24) & 0xff, (length >>> 16) & 0xff, (length >>> 8) & 0xff, length & 0xff];
}

export function msgpackWriteUint(buf: number[], value: number): number[] {
  if (value < 0x80) return [...buf, value];
  if (value < 0x100) return [...buf, 0xcc, value];
  if (value < 0x10000) return [...buf, 0xcd, (value >>> 8) & 0xff, value & 0xff];
  return [...buf, 0xce, (value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
}

export function msgpackWriteString(buf: number[], s: string): number[] {
  const bytes = new TextEncoder().encode(s);
  let result = [...buf];
  if (bytes.length < 32) result.push(0xa0 | bytes.length);
  else if (bytes.length < 0x100) result.push(0xd9, bytes.length);
  else if (bytes.length < 0x10000) result.push(0xda, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
  else result.push(0xdb, (bytes.length >>> 24) & 0xff, (bytes.length >>> 16) & 0xff, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
  for (const b of bytes) result.push(b);
  return result;
}

export function msgpackWriteBool(buf: number[], value: boolean): number[] {
  return [...buf, value ? 0xc3 : 0xc2];
}

function msgpackWriteArrayHeaderInPlace(buf: number[], length: number): void {
  if (length < 16) {
    buf.push(0x90 | length);
    return;
  }
  if (length < 0x10000) {
    buf.push(0xdc, (length >>> 8) & 0xff, length & 0xff);
    return;
  }
  buf.push(0xdd, (length >>> 24) & 0xff, (length >>> 16) & 0xff, (length >>> 8) & 0xff, length & 0xff);
}

function msgpackWriteUintInPlace(buf: number[], value: number): void {
  if (value < 0x80) {
    buf.push(value);
    return;
  }
  if (value < 0x100) {
    buf.push(0xcc, value);
    return;
  }
  if (value < 0x10000) {
    buf.push(0xcd, (value >>> 8) & 0xff, value & 0xff);
    return;
  }
  buf.push(0xce, (value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff);
}

function msgpackWriteStringBytesInPlace(buf: number[], bytes: Uint8Array): void {
  if (bytes.length < 32) {
    buf.push(0xa0 | bytes.length);
  } else if (bytes.length < 0x100) {
    buf.push(0xd9, bytes.length);
  } else if (bytes.length < 0x10000) {
    buf.push(0xda, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
  } else {
    buf.push(0xdb, (bytes.length >>> 24) & 0xff, (bytes.length >>> 16) & 0xff, (bytes.length >>> 8) & 0xff, bytes.length & 0xff);
  }
  for (const byte of bytes) {
    buf.push(byte);
  }
}

function msgpackWriteBoolInPlace(buf: number[], value: boolean): void {
  buf.push(value ? 0xc3 : 0xc2);
}

function sourceFileHashParts(sourceFile: SourceFile | undefined): [number, number, number, number] {
  if (sourceFile === undefined) {
    return [0, 0, 0, 0];
  }
  const hash = (sourceFile as unknown as { readonly hash?: { readonly lo?: number; readonly hi?: number; readonly Lo?: number; readonly Hi?: number } }).hash;
  if (hash !== undefined) {
    const lo = hash.lo ?? hash.Lo ?? 0;
    const hi = hash.hi ?? hash.Hi ?? 0;
    return [lo >>> 0, Math.floor(lo / 0x100000000) >>> 0, hi >>> 0, Math.floor(hi / 0x100000000) >>> 0];
  }
  return [0, 0, 0, 0];
}

function readParseOptions(sourceFile: SourceFile): ExternalModuleIndicatorOptions {
  const maybeFunction = (sourceFile as unknown as { readonly parseOptions?: () => ExternalModuleIndicatorOptions }).parseOptions;
  if (maybeFunction !== undefined) {
    return maybeFunction();
  }
  return (sourceFile as unknown as { readonly parseOptions?: ExternalModuleIndicatorOptions }).parseOptions ?? {};
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

interface ExternalModuleIndicatorOptions { readonly _opts?: unknown }
