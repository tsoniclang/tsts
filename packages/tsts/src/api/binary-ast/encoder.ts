import {
  ChildPropertiesByKind,
  DataEncodingByKind,
  Kind,
  NodeDataEncoding,
  type Node,
  type NodeArray,
  type SourceFile,
} from "../../ast/index.js";
import {
  HEADER_OFFSET_EXTENDED_DATA,
  HEADER_OFFSET_METADATA,
  HEADER_OFFSET_NODES,
  HEADER_OFFSET_STRING_TABLE,
  HEADER_OFFSET_STRING_TABLE_OFFSETS,
  HEADER_OFFSET_STRUCTURED_DATA,
  HEADER_SIZE,
  KIND_NODE_LIST,
  NODE_DATA_TYPE_CHILDREN,
  NODE_DATA_TYPE_EXTENDED,
  NODE_DATA_TYPE_STRING,
  NODE_LEN,
  PROTOCOL_VERSION,
} from "./protocol.js";

const nodeFields = NODE_LEN / 4;
const nodeFieldNext = 3;
const noStructuredData = 0xFFFFFFFF;

class StringTable {
  readonly #parts: string[] = [];
  readonly #offsets: number[] = [];
  #byteLength = 0;

  add(text: string): number {
    const index = this.#offsets.length / 2;
    const encoded = new TextEncoder().encode(text);
    this.#offsets.push(this.#byteLength, this.#byteLength + encoded.length);
    this.#parts.push(text);
    this.#byteLength += encoded.length;
    return index;
  }

  encode(): Uint8Array {
    const encodedText = new TextEncoder().encode(this.#parts.join(""));
    const offsetBytes = new Uint8Array(this.#offsets.length * 4);
    const offsetView = new DataView(offsetBytes.buffer);
    for (let index = 0; index < this.#offsets.length; index += 1) {
      offsetView.setUint32(index * 4, this.#offsets[index]!, true);
    }
    const result = new Uint8Array(offsetBytes.length + encodedText.length);
    result.set(offsetBytes, 0);
    result.set(encodedText, offsetBytes.length);
    return result;
  }

  stringByteLength(): number {
    return this.#byteLength;
  }

  offsetsCount(): number {
    return this.#offsets.length;
  }
}

function isNodeArray(value: unknown): value is NodeArray<Node> {
  return Array.isArray(value)
    && typeof (value as { readonly pos?: unknown }).pos === "number"
    && typeof (value as { readonly end?: unknown }).end === "number";
}

function isChildPresent(value: unknown): boolean {
  return value !== undefined && value !== null;
}

function childMask(node: Node): number {
  const properties = ChildPropertiesByKind[node.kind] ?? [];
  const record = node as unknown as Record<string, unknown>;
  let mask = 0;
  for (let index = 0; index < properties.length; index += 1) {
    const property = properties[index]!;
    if (isChildPresent(record[property])) {
      mask |= 1 << index;
    }
  }
  return mask;
}

function nodeDataType(kind: Kind): number {
  switch (DataEncodingByKind[kind]) {
    case NodeDataEncoding.string:
      return NODE_DATA_TYPE_STRING;
    case NodeDataEncoding.extended:
      return NODE_DATA_TYPE_EXTENDED;
    case NodeDataEncoding.children:
    case undefined:
      return NODE_DATA_TYPE_CHILDREN;
  }
}

function recordStringNode(node: Node, strings: StringTable): number {
  return strings.add(String((node as unknown as { readonly text?: unknown }).text ?? ""));
}

function recordExtendedNode(node: Node, strings: StringTable, extendedData: number[]): number {
  const offset = extendedData.length * 4;
  if (node.kind === Kind.SourceFile) {
    const sourceFile = node as SourceFile;
    extendedData.push(
      strings.add(sourceFile.text),
      strings.add(sourceFile.fileName),
      strings.add(sourceFile.path),
      sourceFile.languageVariant,
      sourceFile.scriptKind,
      noStructuredData,
      noStructuredData,
      noStructuredData,
      noStructuredData,
      noStructuredData,
      noStructuredData,
      0,
    );
    return offset;
  }

  const literal = node as unknown as { readonly text?: string; readonly tokenFlags?: number; readonly rawText?: string; readonly templateFlags?: number };
  if (node.kind === Kind.TemplateHead || node.kind === Kind.TemplateMiddle || node.kind === Kind.TemplateTail) {
    extendedData.push(strings.add(literal.text ?? ""), strings.add(literal.rawText ?? ""), literal.templateFlags ?? 0);
  } else {
    extendedData.push(strings.add(literal.text ?? ""), literal.tokenFlags ?? 0);
  }
  return offset;
}

function nodeData(node: Node, strings: StringTable, extendedData: number[]): number {
  const dataType = nodeDataType(node.kind);
  switch (dataType) {
    case NODE_DATA_TYPE_STRING:
      return dataType | recordStringNode(node, strings);
    case NODE_DATA_TYPE_EXTENDED:
      return dataType | recordExtendedNode(node, strings, extendedData);
    default:
      return dataType | childMask(node);
  }
}

export function encodeSourceFile(sourceFile: SourceFile): Uint8Array {
  return encodeNode(sourceFile);
}

export function encodeNode(root: Node): Uint8Array {
  const strings = new StringTable();
  const extendedData: number[] = [];
  const nodeValues: number[] = [0, 0, 0, 0, 0, 0, 0];
  let nodeCount = 0;
  let parentIndex = 0;
  let previousIndex = 0;

  const writeNodeRecord = (node: Node, currentParentIndex: number): number => {
    nodeCount += 1;
    const currentIndex = nodeCount;
    if (previousIndex !== 0) {
      nodeValues[previousIndex * nodeFields + nodeFieldNext] = currentIndex;
    }
    nodeValues.push(
      node.kind,
      node.pos >= 0 ? node.pos : 0,
      node.end >= 0 ? node.end : 0,
      0,
      currentParentIndex,
      nodeData(node, strings, extendedData),
      node.flags,
    );
    return currentIndex;
  };

  const visitNode = (node: Node): void => {
    const currentIndex = writeNodeRecord(node, parentIndex);
    const savedParentIndex = parentIndex;
    const savedPreviousIndex = previousIndex;
    parentIndex = currentIndex;
    previousIndex = 0;
    visitChildren(node);
    previousIndex = currentIndex;
    parentIndex = savedParentIndex;
    if (savedPreviousIndex === 0) {
      return;
    }
  };

  const visitNodeArray = (array: NodeArray<Node>): void => {
    nodeCount += 1;
    const currentIndex = nodeCount;
    if (previousIndex !== 0) {
      nodeValues[previousIndex * nodeFields + nodeFieldNext] = currentIndex;
    }
    nodeValues.push(
      KIND_NODE_LIST,
      array.pos >= 0 ? array.pos : 0,
      array.end >= 0 ? array.end : 0,
      0,
      parentIndex,
      array.length,
      0,
    );
    const savedParentIndex = parentIndex;
    parentIndex = currentIndex;
    previousIndex = 0;
    for (const child of array) {
      visitNode(child);
    }
    previousIndex = currentIndex;
    parentIndex = savedParentIndex;
  };

  const visitChildren = (node: Node): void => {
    const properties = ChildPropertiesByKind[node.kind] ?? [];
    const record = node as unknown as Record<string, unknown>;
    for (const property of properties) {
      const child = record[property];
      if (!isChildPresent(child)) {
        continue;
      }
      if (isNodeArray(child)) {
        visitNodeArray(child);
      } else {
        visitNode(child as Node);
      }
    }
  };

  parentIndex = 1;
  writeNodeRecord(root, 0);
  previousIndex = 0;
  visitChildren(root);

  const extendedDataBytes = new Uint8Array(extendedData.length * 4);
  const extendedDataView = new DataView(extendedDataBytes.buffer);
  for (let index = 0; index < extendedData.length; index += 1) {
    extendedDataView.setUint32(index * 4, extendedData[index]! >>> 0, true);
  }

  const stringBytes = strings.encode();
  const nodeBytes = new Uint8Array(nodeValues.length * 4);
  const nodeView = new DataView(nodeBytes.buffer);
  for (let index = 0; index < nodeValues.length; index += 1) {
    nodeView.setUint32(index * 4, nodeValues[index]! >>> 0, true);
  }

  const offsetStringTableOffsets = HEADER_SIZE;
  const offsetStringTable = HEADER_SIZE + strings.offsetsCount() * 4;
  const offsetExtendedData = offsetStringTable + strings.stringByteLength();
  const offsetStructuredData = offsetExtendedData + extendedDataBytes.length;
  const offsetNodes = offsetStructuredData;

  const header = new Uint8Array(HEADER_SIZE);
  const headerView = new DataView(header.buffer);
  headerView.setUint32(HEADER_OFFSET_METADATA, PROTOCOL_VERSION << 24, true);
  headerView.setUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, offsetStringTableOffsets, true);
  headerView.setUint32(HEADER_OFFSET_STRING_TABLE, offsetStringTable, true);
  headerView.setUint32(HEADER_OFFSET_EXTENDED_DATA, offsetExtendedData, true);
  headerView.setUint32(HEADER_OFFSET_STRUCTURED_DATA, offsetStructuredData, true);
  headerView.setUint32(HEADER_OFFSET_NODES, offsetNodes, true);

  const result = new Uint8Array(header.length + stringBytes.length + extendedDataBytes.length + nodeBytes.length);
  result.set(header, 0);
  result.set(stringBytes, HEADER_SIZE);
  result.set(extendedDataBytes, offsetExtendedData);
  result.set(nodeBytes, offsetNodes);
  return result;
}

export function uint8ArrayToBase64(data: Uint8Array): string {
  return Buffer.from(data).toString("base64");
}
