import {
  ChildPropertiesByKind,
  DataEncodingByKind,
  Kind,
  NodeDataEncoding,
  type Node as AstNode,
  type PositionMap,
} from "../../ast/index.js";
import type { StringTable } from "./stringTable.js";

export const NodeDataTypeChildren = 0x00000000;
export const NodeDataTypeString = 0x40000000;
export const NodeDataTypeExtendedData = 0x80000000;
export const NodeDataTypeMask = 0xc0000000;
export const NodeDataChildMask = 0x000000ff;
export const NodeDataStringIndexMask = 0x00ffffff;

export type RecordExtendedDataFunc = (
  node: AstNode, strs: StringTable, positionMap: PositionMap,
  extendedData: number[], structuredData: number[],
) => void;

export type GetCommonDataFunc = (node: AstNode) => number;

export function getNodeDataType(node: AstNode): number {
  switch (DataEncodingByKind.get(node.kind)) {
    case NodeDataEncoding.string:
      return NodeDataTypeString;
    case NodeDataEncoding.extended:
      return NodeDataTypeExtendedData;
    case NodeDataEncoding.children:
    case undefined:
      return NodeDataTypeChildren;
  }
  return NodeDataTypeChildren;
}

export function getChildrenPropertyMask(node: AstNode): number {
  const properties = ChildPropertiesByKind.get(node.kind) ?? [];
  const record = node as unknown as Record<string, unknown>;
  let mask = 0;
  for (let index = 0; index < properties.length; index += 1) {
    const value = record[properties[index]!];
    if (value !== undefined && value !== null) {
      mask |= 1 << index;
    }
  }
  return mask;
}

export function getNodeCommonData(node: AstNode): number {
  const record = node as unknown as Record<string, unknown>;
  switch (node.kind) {
    case Kind.Block:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
      return boolToByte(record["multiLine"] === true) << 24;
    case Kind.HeritageClause:
      return (record["token"] === Kind.ImplementsKeyword ? 1 : 0) << 24;
    case Kind.ExportAssignment:
      return boolToByte(record["isExportEquals"] === true) << 24;
    case Kind.ExportSpecifier:
    case Kind.ImportEqualsDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ImportSpecifier:
      return boolToByte(record["isTypeOnly"] === true) << 24;
    case Kind.PrefixUnaryExpression:
      return unaryOperatorIndex(record["operator"]) << 24;
    case Kind.PostfixUnaryExpression:
      return (record["operator"] === Kind.MinusMinusToken ? 1 : 0) << 24;
    case Kind.MetaProperty:
      return (record["keywordToken"] === Kind.NewKeyword ? 1 : 0) << 24;
    case Kind.TypeOperator:
      return typeOperatorIndex(record["operator"]) << 24;
    case Kind.ImportAttributes:
      return (boolToByte(record["multiLine"] === true) << 24)
        | ((record["token"] === Kind.AssertKeyword ? 1 : 0) << 25);
    case Kind.SyntheticExpression:
      throw new Error("SyntheticExpression should never be encoded");
    case Kind.JsxText:
      return boolToByte(record["containsOnlyTriviaWhiteSpaces"] === true) << 24;
    case Kind.ModuleDeclaration:
      return (record["keyword"] === Kind.NamespaceKeyword ? 1 : 0) << 24;
    case Kind.ImportType:
      return boolToByte(record["isTypeOf"] === true) << 24;
    case Kind.ImportClause:
      return importPhaseModifierIndex(record["phaseModifier"]) << 24;
    case Kind.JSDocTypeLiteral:
      return boolToByte(record["isArrayType"] === true) << 24;
    case Kind.JSDocParameterTag:
    case Kind.JSDocPropertyTag:
      return (boolToByte(record["isBracketed"] === true) << 24)
        | (boolToByte(record["isNameFirst"] === true) << 25);
  }
  const fn = commonDataGetters[node.kind];
  return fn === undefined ? 0 : fn(node);
}

export function recordNodeStrings(node: AstNode, strs: StringTable): number {
  const record = node as unknown as { readonly text?: string };
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
    case Kind.JsxText:
    case Kind.JSDocText:
    case Kind.JSDocLink:
    case Kind.JSDocLinkPlain:
    case Kind.JSDocLinkCode:
      return strs.add(record.text ?? "", node.kind, node.pos, node.end);
    default:
      throw new Error(`Unexpected string-data node kind ${node.kind}`);
  }
}

export function recordExtendedData(
  node: AstNode, strs: StringTable, positionMap: PositionMap,
  extendedData: number[], structuredData: number[],
): number {
  const offset = extendedData.length * 4;
  const fn = extendedDataRecorders[node.kind];
  if (fn !== undefined) {
    fn(node, strs, positionMap, extendedData, structuredData);
    return offset;
  }
  recordGeneratedExtendedData(node, strs, extendedData);
  return offset;
}

function recordGeneratedExtendedData(node: AstNode, strs: StringTable, extendedData: number[]): void {
  const record = node as unknown as {
    readonly text?: string;
    readonly rawText?: string;
    readonly tokenFlags?: number;
    readonly templateFlags?: number;
  };
  switch (node.kind) {
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.RegularExpressionLiteral:
      pushUint32s(extendedData, strs.add(record.text ?? "", node.kind, node.pos, node.end), record.tokenFlags ?? 0);
      return;
    case Kind.NoSubstitutionTemplateLiteral:
      pushUint32s(extendedData, strs.add(record.text ?? "", node.kind, node.pos, node.end), record.templateFlags ?? 0);
      return;
    case Kind.TemplateHead:
    case Kind.TemplateMiddle:
    case Kind.TemplateTail:
      pushUint32s(
        extendedData,
        strs.add(record.text ?? "", node.kind, node.pos, node.end),
        strs.add(record.rawText ?? "", node.kind, node.pos, node.end),
        record.templateFlags ?? 0,
      );
      return;
    default:
      throw new Error(`unknown extended-data node kind ${node.kind}`);
  }
}

function pushUint32s(values: number[], ...items: readonly number[]): void {
  for (const item of items) {
    values.push(item >>> 0);
  }
}

function boolToByte(value: boolean): number {
  return value ? 1 : 0;
}

function unaryOperatorIndex(value: unknown): number {
  switch (value) {
    case Kind.MinusToken:
      return 1;
    case Kind.TildeToken:
      return 2;
    case Kind.ExclamationToken:
      return 3;
    case Kind.PlusPlusToken:
      return 4;
    case Kind.MinusMinusToken:
      return 5;
    default:
      return 0;
  }
}

function typeOperatorIndex(value: unknown): number {
  switch (value) {
    case Kind.ReadonlyKeyword:
      return 1;
    case Kind.UniqueKeyword:
      return 2;
    default:
      return 0;
  }
}

function importPhaseModifierIndex(value: unknown): number {
  switch (value) {
    case Kind.TypeKeyword:
      return 1;
    case Kind.DeferKeyword:
      return 2;
    default:
      return 0;
  }
}

const extendedDataRecorders: Record<number, RecordExtendedDataFunc | undefined> = {};
const commonDataGetters: Record<number, GetCommonDataFunc | undefined> = {};

export function registerExtendedDataRecorder(kind: number, fn: RecordExtendedDataFunc): void {
  extendedDataRecorders[kind] = fn;
}

export function registerCommonDataGetter(kind: number, fn: GetCommonDataFunc): void {
  commonDataGetters[kind] = fn;
}
