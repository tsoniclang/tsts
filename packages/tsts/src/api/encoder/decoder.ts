/**
 * AST binary decoder.
 *
 * Substantive port of TS-Go `internal/api/encoder/decoder.go` (~381 LoC).
 * Decodes a binary-encoded SourceFile/Node tree back to the in-memory
 * AST representation.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { ModifierList, Node as AstNode, NodeArray, NodeList, SourceFile } from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import { createNode as createGeneratedNode, GeneratedChildPropertiesByKind } from "./decoder.generated.js";
import {
  HeaderOffsetExtendedData,
  HeaderOffsetMetadata,
  HeaderOffsetNodes,
  HeaderOffsetParseOptions,
  HeaderOffsetStringData,
  HeaderOffsetStringOffsets,
  HeaderSize,
  NodeDataStringIndexMask,
  NodeOffsetData,
  NodeOffsetEnd,
  NodeOffsetFlags,
  NodeOffsetKind,
  NodeOffsetNext,
  NodeOffsetParent,
  NodeOffsetPos,
  NodeSize,
  ProtocolVersion,
  SyntaxKindNodeList,
} from "./encoder.js";

export class ASTDecoder {
  data: Uint8Array;
  strTable = 0;
  strData = 0;
  extData = 0;
  nodeOff = 0;
  nodeCount = 0;
  nodes: AstNode[] = [];
  nodeLists: (NodeList | undefined)[] = [];
  childBuf: number[] = [];
  readonly decoder = new TextDecoder();

  constructor(data: Uint8Array, strTable: number, strData: number, extData: number, nodeOff: number) {
    this.data = data;
    this.strTable = strTable;
    this.strData = strData;
    this.extData = extData;
    this.nodeOff = nodeOff;
    this.nodeCount = Math.floor((data.length - nodeOff) / NodeSize);
  }

  allocNodeSlice(capacity: number): (AstNode | undefined)[] {
    // Pre-allocates an array of size `capacity` with undefined slots.
    return Array.from({ length: capacity }, () => undefined);
  }

  nodeField(i: number, field: number): number {
    const offset = this.nodeOff + i * NodeSize + field;
    if (offset + 4 > this.data.length) return 0;
    return readLE32(this.data, offset);
  }

  getString(idx: number): string {
    const offsetBase = this.strTable + idx * 4;
    const start = readLE32(this.data, offsetBase);
    const end = readLE32(this.data, offsetBase + 4);
    return this.decoder.decode(this.data.subarray(this.strData + start, this.strData + end));
  }

  collectChildren(i: number): number[] {
    this.childBuf.length = 0;
    if (i + 1 >= this.nodeCount) {
      return this.childBuf;
    }
    const firstChild = i + 1;
    if (this.nodeField(firstChild, NodeOffsetParent) !== i) {
      return this.childBuf;
    }
    this.childBuf.push(firstChild);
    let next = this.nodeField(firstChild, NodeOffsetNext);
    while (next !== 0) {
      this.childBuf.push(next);
      next = this.nodeField(next, NodeOffsetNext);
    }
    return this.childBuf;
  }

  decode(): AstNode | undefined {
    if (this.nodeCount < 2) {
      return undefined;
    }
    this.nodes = Array.from({ length: this.nodeCount }, () => undefined as unknown as AstNode);
    this.nodeLists = Array.from({ length: this.nodeCount }, () => undefined);
    for (let index = this.nodeCount - 1; index >= 1; index -= 1) {
      const kind = this.nodeField(index, NodeOffsetKind);
      const pos = this.nodeField(index, NodeOffsetPos);
      const end = this.nodeField(index, NodeOffsetEnd);
      const data = this.nodeField(index, NodeOffsetData);
      const childIndices = [...this.collectChildren(index)];
      if (kind === SyntaxKindNodeList) {
        const childNodes = childIndices
          .map((childIndex) => this.nodes[childIndex])
          .filter((node): node is AstNode => node !== undefined);
        const nodeList = childNodes as unknown as NodeArray<AstNode>;
        assignRange(nodeList, pos, end);
        (nodeList as unknown as { transformFlags: number }).transformFlags = 0;
        this.nodeLists[index] = nodeList;
        continue;
      }
      const node = this.createNode(kind, data, childIndices);
      assignRange(node, pos, end);
      node.flags = this.nodeField(index, NodeOffsetFlags);
      this.nodes[index] = node;
    }
    return this.nodes[1];
  }

  getModifierList(ci: number): ModifierList | undefined {
    return this.nodeLists[ci] as unknown as ModifierList | undefined;
  }

  nodeAt(ci: number): AstNode | undefined {
    return this.nodes[ci];
  }

  nodeListAt(ci: number): NodeList | undefined {
    return ci === 0 ? undefined : this.nodeLists[ci];
  }

  modifierListAt(ci: number): ModifierList | undefined {
    return this.getModifierList(ci);
  }

  createNode(kind: number, data: number, childIndices: readonly number[]): AstNode {
    return createGeneratedNode(this, kind, data, childIndices);
  }

  decodeExtendedData_SourceFile(data: number, childIndices: readonly number[], commonData: number): AstNode {
    void commonData;
    const extOff = this.extData + (data & NodeDataStringIndexMask);
    const text = this.getString(readLE32(this.data, extOff));
    const fileName = this.getString(readLE32(this.data, extOff + 4));
    const path = this.getString(readLE32(this.data, extOff + 8));
    let statements: NodeList | undefined;
    let endOfFileToken: AstNode | undefined;
    for (const childIndex of childIndices) {
      if (this.nodeField(childIndex, NodeOffsetKind) === SyntaxKindNodeList) {
        statements = this.nodeListAt(childIndex);
      } else {
        const child = this.nodeAt(childIndex);
        if (child?.kind === Kind.EndOfFile) {
          endOfFileToken = child;
        }
      }
    }
    const parseOptions = readLE32(this.data, HeaderOffsetParseOptions);
    return createDecodedNode(Kind.SourceFile, {
      text,
      fileName,
      path,
      statements: statements ?? emptyNodeArray(),
      endOfFileToken: endOfFileToken ?? createDecodedNode(Kind.EndOfFile),
      languageVariant: readLE32(this.data, extOff + 12),
      scriptKind: readLE32(this.data, extOff + 16),
      referencedFiles: [],
      typeReferenceDirectives: [],
      libReferenceDirectives: [],
      imports: [],
      moduleAugmentations: [],
      ambientModuleNames: [],
      externalModuleIndicator: undefined,
      parseDiagnostics: [],
      parseOptions: {
        ExternalModuleIndicatorOptions: {
          JSX: (parseOptions & 1) !== 0,
          Force: (parseOptions & 2) !== 0,
        },
      },
    });
  }

  decodeExtendedData_TemplateHead(data: number, childIndices: readonly number[], commonData: number): AstNode {
    return this.decodeTemplateLiteralLike(Kind.TemplateHead, data, childIndices, commonData);
  }

  decodeExtendedData_TemplateMiddle(data: number, childIndices: readonly number[], commonData: number): AstNode {
    return this.decodeTemplateLiteralLike(Kind.TemplateMiddle, data, childIndices, commonData);
  }

  decodeExtendedData_TemplateTail(data: number, childIndices: readonly number[], commonData: number): AstNode {
    return this.decodeTemplateLiteralLike(Kind.TemplateTail, data, childIndices, commonData);
  }

  singleChild(childIndices: readonly number[]): AstNode | undefined {
    if (childIndices.length === 0) return undefined;
    return this.nodes[childIndices[0]!];
  }

  singleNodeListChild(childIndices: readonly number[]): NodeList | undefined {
    if (childIndices.length === 0) return undefined;
    return this.nodeListAt(childIndices[0]!);
  }

  createStringNode(kind: number, data: number, commonData: number): AstNode {
    const text = this.getString(data & NodeDataStringIndexMask);
    const properties: Record<string, unknown> = { text };
    if (kind === Kind.JsxText) {
      properties["containsOnlyTriviaWhiteSpaces"] = (commonData & 1) !== 0;
    }
    return createDecodedNode(kind, properties);
  }

  createExtendedNode(kind: number, data: number, childIndices: readonly number[], commonData: number): AstNode {
    switch (kind) {
      case Kind.StringLiteral:
      case Kind.NumericLiteral:
      case Kind.BigIntLiteral:
      case Kind.RegularExpressionLiteral:
        return this.decodeLiteralLike(kind, data, "tokenFlags");
      case Kind.NoSubstitutionTemplateLiteral:
        return this.decodeLiteralLike(kind, data, "templateFlags");
      case Kind.TemplateHead:
        return this.decodeExtendedData_TemplateHead(data, childIndices, commonData);
      case Kind.TemplateMiddle:
        return this.decodeExtendedData_TemplateMiddle(data, childIndices, commonData);
      case Kind.TemplateTail:
        return this.decodeExtendedData_TemplateTail(data, childIndices, commonData);
      case Kind.SourceFile:
        return this.decodeExtendedData_SourceFile(data, childIndices, commonData);
      default:
        throw new Error(`unknown extended-data node kind ${kind}`);
    }
  }

  createChildrenNode(kind: number, data: number, childIndices: readonly number[], commonData: number): AstNode {
    return this.createChildrenNodeWithProperties(kind, data & 0x000000ff, childIndices, commonData, []);
  }

  createChildrenNodeWithProperties(
    kind: number,
    mask: number,
    childIndices: readonly number[],
    commonData: number,
    properties: readonly string[],
  ): AstNode {
    const iterator = newChildIter(childIndices);
    const decodedProperties: Record<string, unknown> = decodeCommonDataProperties(kind, commonData);
    for (let bit = 0; bit < properties.length; bit += 1) {
      const childIndex = iterator.nextIf(mask, bit);
      if (childIndex === 0) {
        continue;
      }
      const childValue = this.nodeField(childIndex, NodeOffsetKind) === SyntaxKindNodeList
        ? this.nodeListAt(childIndex)
        : this.nodeAt(childIndex);
      decodedProperties[properties[bit]!] = childValue;
    }
    return createDecodedNode(kind, decodedProperties);
  }

  decodeLiteralLike(kind: number, data: number, flagsProperty: "tokenFlags" | "templateFlags"): AstNode {
    const extOff = this.extData + (data & NodeDataStringIndexMask);
    return createDecodedNode(kind, {
      text: this.getString(readLE32(this.data, extOff)),
      [flagsProperty]: readLE32(this.data, extOff + 4),
    });
  }

  decodeTemplateLiteralLike(kind: number, data: number, _childIndices: readonly number[], _commonData: number): AstNode {
    const extOff = this.extData + (data & NodeDataStringIndexMask);
    return createDecodedNode(kind, {
      text: this.getString(readLE32(this.data, extOff)),
      rawText: this.getString(readLE32(this.data, extOff + 4)),
      templateFlags: readLE32(this.data, extOff + 8),
    });
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
  if (data.length < HeaderSize) return undefined;
  const version = data[HeaderOffsetMetadata + 3]!;
  if (version !== ProtocolVersion) return undefined;
  const strTable = readLE32(data, HeaderOffsetStringOffsets);
  const strData = readLE32(data, HeaderOffsetStringData);
  const extData = readLE32(data, HeaderOffsetExtendedData);
  const nodeOff = readLE32(data, HeaderOffsetNodes);
  if (strTable > data.length || strData > data.length || extData > data.length || nodeOff > data.length) {
    return undefined;
  }
  if (!(strTable <= strData && strData <= extData && extData <= nodeOff)) {
    return undefined;
  }
  return new ASTDecoder(data, strTable, strData, extData, nodeOff);
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
    if ((mask & (1 << bit)) === 0) {
      return 0;
    }
    return this.next();
  }
}

export function newChildIter(indices: readonly number[]): ChildIterator {
  return new ChildIterator(indices);
}

function assignRange(target: { pos: number; end: number }, pos: number, end: number): void {
  target.pos = pos;
  target.end = end;
}

function emptyNodeArray(): NodeList {
  const array = [] as unknown as NodeArray<AstNode>;
  assignRange(array, 0, 0);
  (array as unknown as { transformFlags: number }).transformFlags = 0;
  return array;
}

function createDecodedNode(kind: number, properties: Record<string, unknown> = {}): AstNode {
  const node = {
    kind,
    flags: 0,
    pos: 0,
    end: 0,
    parent: undefined,
    ...properties,
    forEachChild(visitor: (node: AstNode) => boolean | undefined, visitArray?: (nodes: NodeArray<AstNode>) => boolean | undefined): boolean | undefined {
      const childProperties = GeneratedChildPropertiesByKind.get(kind as Kind) ?? [];
      for (const property of childProperties) {
        const value = (this as unknown as Record<string, unknown>)[property];
        if (Array.isArray(value)) {
          const result = visitArray?.(value as unknown as NodeArray<AstNode>);
          if (result !== undefined) {
            return result;
          }
        } else if (value !== undefined && value !== null) {
          const result = visitor(value as AstNode);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    },
    getSourceFile(): SourceFile {
      let current: AstNode = this as unknown as AstNode;
      while (current.kind !== Kind.SourceFile && current.parent !== undefined && current.parent !== current) {
        current = current.parent;
      }
      return current as SourceFile;
    },
  } as unknown as AstNode;
  return node;
}

function decodeCommonDataProperties(kind: number, commonData: number): Record<string, unknown> {
  switch (kind) {
    case Kind.Block:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
      return { multiLine: (commonData & 1) !== 0 };
    case Kind.HeritageClause:
      return { token: (commonData & 1) !== 0 ? Kind.ImplementsKeyword : Kind.ExtendsKeyword };
    case Kind.ExportAssignment:
      return { isExportEquals: (commonData & 1) !== 0 };
    case Kind.ExportSpecifier:
    case Kind.ImportEqualsDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ImportSpecifier:
      return { isTypeOnly: (commonData & 1) !== 0 };
    case Kind.PrefixUnaryExpression:
      return { operator: decodePrefixUnaryOperator(commonData) };
    case Kind.PostfixUnaryExpression:
      return { operator: (commonData & 1) !== 0 ? Kind.MinusMinusToken : Kind.PlusPlusToken };
    case Kind.MetaProperty:
      return { keywordToken: (commonData & 1) !== 0 ? Kind.NewKeyword : Kind.ImportKeyword };
    case Kind.TypeOperator:
      return { operator: decodeTypeOperator(commonData) };
    case Kind.ImportAttributes:
      return {
        multiLine: (commonData & 1) !== 0,
        token: (commonData & 2) !== 0 ? Kind.AssertKeyword : Kind.WithKeyword,
      };
    case Kind.JsxText:
      return { containsOnlyTriviaWhiteSpaces: (commonData & 1) !== 0 };
    case Kind.ModuleDeclaration:
      return { keyword: (commonData & 1) !== 0 ? Kind.NamespaceKeyword : Kind.ModuleKeyword };
    case Kind.ImportType:
      return { isTypeOf: (commonData & 1) !== 0 };
    case Kind.ImportClause:
      return { phaseModifier: decodeImportPhaseModifier(commonData) };
    case Kind.JSDocTypeLiteral:
      return { isArrayType: (commonData & 1) !== 0 };
    case Kind.JSDocParameterTag:
    case Kind.JSDocPropertyTag:
      return { isBracketed: (commonData & 1) !== 0, isNameFirst: (commonData & 2) !== 0 };
    default:
      return {};
  }
}

function decodePrefixUnaryOperator(commonData: number): Kind {
  switch (commonData) {
    case 1:
      return Kind.MinusToken;
    case 2:
      return Kind.TildeToken;
    case 3:
      return Kind.ExclamationToken;
    case 4:
      return Kind.PlusPlusToken;
    case 5:
      return Kind.MinusMinusToken;
    default:
      return Kind.PlusToken;
  }
}

function decodeTypeOperator(commonData: number): Kind {
  switch (commonData) {
    case 1:
      return Kind.ReadonlyKeyword;
    case 2:
      return Kind.UniqueKeyword;
    default:
      return Kind.KeyOfKeyword;
  }
}

function decodeImportPhaseModifier(commonData: number): Kind | undefined {
  switch (commonData) {
    case 1:
      return Kind.TypeKeyword;
    case 2:
      return Kind.DeferKeyword;
    default:
      return undefined;
  }
}
