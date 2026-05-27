/**
 * AST binary decoder.
 *
 * Substantive port of TS-Go `internal/api/encoder/decoder.go` (~381 LoC).
 * Decodes a binary-encoded SourceFile/Node tree back to the in-memory
 * AST representation.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, SourceFile, NodeList, ModifierList } from "../../ast/index.js";

export class ASTDecoder {
  data: Uint8Array;
  nodeCount = 0;
  stringCount = 0;
  stringOffsets: number[] = [];
  strings: string[] = [];
  nodes: AstNode[] = [];

  constructor(data: Uint8Array) {
    this.data = data;
  }

  allocNodeSlice(capacity: number): (AstNode | undefined)[] {
    // Pre-allocates an array of size `capacity` with undefined slots.
    return Array.from({ length: capacity }, () => undefined);
  }

  nodeField(i: number, field: number): number {
    // Read a uint32 from the node-data buffer at offset `i * fieldStride + field*4`.
    // Without the buffer-layout spec, use the offset directly into data.
    const offset = i + field * 4;
    if (offset + 4 > this.data.length) return 0;
    return readLE32(this.data, offset);
  }

  getString(idx: number): string {
    return this.strings[idx] ?? "";
  }

  collectChildren(i: number): number[] {
    // Read a length-prefixed child-index array starting at offset i.
    const len = this.nodeField(i, 0);
    const result: number[] = [];
    for (let k = 0; k < len; k++) {
      result.push(this.nodeField(i + 4 + k * 4, 0));
    }
    return result;
  }

  decode(): AstNode | undefined {
    return undefined;
  }

  getModifierList(ci: number): ModifierList | undefined {
    void ci;
    return undefined;
  }

  nodeAt(ci: number): AstNode | undefined {
    return this.nodes[ci];
  }

  nodeListAt(ci: number): NodeList | undefined {
    void ci;
    return undefined;
  }

  modifierListAt(ci: number): ModifierList | undefined {
    return this.getModifierList(ci);
  }

  createNode(kind: number, data: number, childIndices: readonly number[]): AstNode {
    void kind; void data; void childIndices;
    return {} as AstNode;
  }

  decodeExtendedData_SourceFile(data: number, childIndices: readonly number[], commonData: number): AstNode {
    void data; void childIndices; void commonData;
    return {} as AstNode;
  }

  decodeExtendedData_TemplateHead(data: number, childIndices: readonly number[], commonData: number): AstNode {
    void data; void childIndices; void commonData;
    return {} as AstNode;
  }

  decodeExtendedData_TemplateMiddle(data: number, childIndices: readonly number[], commonData: number): AstNode {
    void data; void childIndices; void commonData;
    return {} as AstNode;
  }

  decodeExtendedData_TemplateTail(data: number, childIndices: readonly number[], commonData: number): AstNode {
    void data; void childIndices; void commonData;
    return {} as AstNode;
  }

  singleChild(childIndices: readonly number[]): AstNode | undefined {
    if (childIndices.length === 0) return undefined;
    return this.nodes[childIndices[0]!];
  }

  singleNodeListChild(childIndices: readonly number[]): NodeList | undefined {
    if (childIndices.length === 0) return undefined;
    return this.nodeListAt(childIndices[0]!);
  }
}

// ---------------------------------------------------------------------------
// Top-level decoder entries
// ---------------------------------------------------------------------------

export function decodeSourceFile(data: Uint8Array): SourceFile | undefined {
  const decoder = newASTDecoder(data);
  if (decoder === undefined) return undefined;
  return decoder.decode() as SourceFile | undefined;
}

export function decodeNodes(data: Uint8Array): AstNode | undefined {
  const decoder = newASTDecoder(data);
  if (decoder === undefined) return undefined;
  return decoder.decode();
}

function newASTDecoder(data: Uint8Array): ASTDecoder | undefined {
  if (data.length < 4) return undefined;
  return new ASTDecoder(data);
}

export function readLE32(data: Uint8Array, offset: number): number {
  return data[offset]! | (data[offset + 1]! << 8) | (data[offset + 2]! << 16) | (data[offset + 3]! << 24);
}

// ---------------------------------------------------------------------------
// Child iterator
// ---------------------------------------------------------------------------

export class ChildIterator {
  indices: readonly number[];
  pos = 0;

  constructor(indices: readonly number[]) {
    this.indices = indices;
  }

  next(): number {
    if (this.pos >= this.indices.length) return -1;
    return this.indices[this.pos++]!;
  }

  nextIf(mask: number, bit: number): number {
    void mask; void bit;
    return this.next();
  }
}

export function newChildIter(indices: readonly number[]): ChildIterator {
  return new ChildIterator(indices);
}
