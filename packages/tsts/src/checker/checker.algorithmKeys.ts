/**
 * Checker core key algorithms.
 *
 * Port-focused slice from TS-Go `internal/checker/checker.go`.
 * These helpers cover late-bound symbol bookkeeping plus the deterministic
 * cache-key builders used by union/intersection/type-instantiation caches.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Type } from "./types.js";
import { ObjectFlags, TypeFlags } from "./types.js";

export interface LateBoundDeclaration {
  readonly declaration: AstNode;
  readonly nameType?: Type;
}

export interface LateBoundSymbol extends AstSymbol {
  lateBoundDeclarations?: LateBoundDeclaration[];
}

export interface ConditionalTypeData {
  readonly checkType?: Type;
  readonly extendsType?: Type;
  readonly trueType?: Type;
  readonly falseType?: Type;
  readonly inferredTrueType?: Type;
  readonly outerTypeParameters?: readonly Type[];
  readonly root?: ConditionalTypeData;
}

export interface IndexedAccessTypeData {
  readonly objectType?: Type;
  readonly indexType?: Type;
  readonly constraint?: Type;
}

export function getCannotResolveModuleNameErrorForSpecificModule(moduleName: string): string {
  return `Cannot find module '${moduleName}' or its corresponding type declarations.`;
}

export function resolutionExtensionIsTSOrJson(extension: string): boolean {
  return extension === ".ts"
    || extension === ".tsx"
    || extension === ".d.ts"
    || extension === ".mts"
    || extension === ".cts"
    || extension === ".json";
}

export function lateBindMember(symbol: AstSymbol, declaration: AstNode, nameType?: Type): LateBoundSymbol {
  const target = symbol as LateBoundSymbol;
  const declarations = target.lateBoundDeclarations ?? [];
  target.lateBoundDeclarations = [...declarations, nameType === undefined ? { declaration } : { declaration, nameType }];
  if (!target.declarations.includes(declaration)) target.declarations.push(declaration);
  return target;
}

export function lateBindIndexSignature(symbol: AstSymbol, declaration: AstNode, keyType: Type, valueType: Type): LateBoundSymbol {
  const target = lateBindMember(symbol, declaration) as LateBoundSymbol & {
    lateBoundIndexSignatures?: readonly { readonly declaration: AstNode; readonly keyType: Type; readonly valueType: Type }[];
  };
  target.lateBoundIndexSignatures = [...target.lateBoundIndexSignatures ?? [], { declaration, keyType, valueType }];
  return target;
}

export function addDeclarationToLateBoundSymbol(symbol: AstSymbol, declaration: AstNode, nameType?: Type): AstSymbol {
  return lateBindMember(symbol, declaration, nameType);
}

export function getMembersOfSymbol(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return symbol?.members ?? symbol?.exports;
}

export function getConstraintFromIndexedAccess(type: Type): Type | undefined {
  const data = type.data as IndexedAccessTypeData | undefined;
  if (data?.constraint !== undefined) return data.constraint;
  if (data?.objectType === undefined || data.indexType === undefined) return undefined;
  const objectConstraint = getBaseConstraintOfType(data.objectType) ?? data.objectType;
  const indexConstraint = getBaseConstraintOfType(data.indexType) ?? data.indexType;
  if (objectConstraint === data.objectType && indexConstraint === data.indexType) return undefined;
  return {
    flags: TypeFlags.IndexedAccess,
    id: nextKeyTypeId(),
    data: {
      objectType: objectConstraint,
      indexType: indexConstraint,
      constraint: undefined,
    },
  };
}

export function getConstraintOfConditionalType(type: Type): Type | undefined {
  return getConstraintFromConditionalType(type)
    ?? getDefaultConstraintOfConditionalType(type)
    ?? getConstraintOfDistributiveConditionalType(type);
}

export function getConstraintFromConditionalType(type: Type): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  return data?.inferredTrueType ?? data?.trueType;
}

export function getDefaultConstraintOfConditionalType(type: Type): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  if (data?.trueType === undefined && data?.falseType === undefined) return undefined;
  return unionIfNeeded([data.trueType, data.falseType].filter(isType));
}

export function getConstraintOfDistributiveConditionalType(type: Type): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  const checkType = data?.checkType;
  if (checkType === undefined || (checkType.flags & TypeFlags.TypeParameter) === 0) return undefined;
  const constraint = getBaseConstraintOfType(checkType);
  if (constraint === undefined) return undefined;
  return {
    flags: TypeFlags.Conditional,
    id: nextKeyTypeId(),
    data: {
      ...data,
      checkType: constraint,
    },
  };
}

export function isThislessInterface(type: Type): boolean {
  const data = type.data as { readonly thisType?: Type; readonly outerTypeParameters?: readonly Type[]; readonly localTypeParameters?: readonly Type[] } | undefined;
  return data?.thisType === undefined
    && (data?.outerTypeParameters?.length ?? 0) === 0
    && (data?.localTypeParameters?.length ?? 0) === 0;
}

export function isZero(value: unknown): boolean {
  if (value === 0 || value === "0") return true;
  return typeof value === "object"
    && value !== null
    && (value as { readonly negative?: boolean }).negative !== true
    && ((value as { readonly base10Value?: string }).base10Value === "0"
      || (value as { readonly value?: string | number }).value === 0
      || (value as { readonly value?: string | number }).value === "0");
}

export class KeyBuilder {
  private readonly parts: string[] = [];

  writeByte(value: string | number): void {
    this.parts.push(typeof value === "number" ? String.fromCharCode(value) : value.charAt(0));
  }

  writeString(value: string): void {
    this.parts.push(`${value.length}:${value}`);
  }

  writeInt(value: number): void {
    this.parts.push(`#${value}`);
  }

  writeSymbol(symbol: AstSymbol | undefined): void {
    if (symbol === undefined) {
      this.writeString("<missing-symbol>");
      return;
    }
    this.writeString(symbolName(symbol));
    this.writeInt(getStableSymbolId(symbol));
  }

  writeType(type: Type | undefined): void {
    if (type === undefined) {
      this.writeString("<missing-type>");
      return;
    }
    this.writeInt(type.id ?? 0);
    this.writeInt(type.flags);
    this.writeString(symbolName(type.symbol) || intrinsicName(type));
  }

  writeTypes(types: readonly Type[] | undefined): void {
    this.writeInt(types?.length ?? 0);
    for (const type of types ?? []) this.writeType(type);
  }

  writeAlias(symbol: AstSymbol | undefined, typeArguments: readonly Type[] | undefined): void {
    this.writeSymbol(symbol);
    this.writeTypes(typeArguments);
  }

  writeGenericTypeReferences(type: Type | undefined): void {
    this.writeTypes(typeArgumentsOf(type));
  }

  writeNodeId(node: AstNode | undefined): void {
    this.writeInt(node === undefined ? 0 : getStableNodeId(node));
  }

  writeNode(node: AstNode | undefined): void {
    if (node === undefined) {
      this.writeString("<missing-node>");
      return;
    }
    this.writeInt(node.kind);
    this.writeNodeId(node);
    const name = nodeName(node);
    if (name.length > 0) this.writeString(name);
  }

  hash(): string {
    return this.parts.join("|");
  }
}

export function newKeyBuilder(): KeyBuilder {
  return new KeyBuilder();
}

export function writeByte(builder: KeyBuilder, value: string | number): void {
  builder.writeByte(value);
}

export function writeString(builder: KeyBuilder, value: string): void {
  builder.writeString(value);
}

export function writeInt(builder: KeyBuilder, value: number): void {
  builder.writeInt(value);
}

export function writeSymbol(builder: KeyBuilder, symbol: AstSymbol | undefined): void {
  builder.writeSymbol(symbol);
}

export function writeType(builder: KeyBuilder, type: Type | undefined): void {
  builder.writeType(type);
}

export function writeTypes(builder: KeyBuilder, types: readonly Type[] | undefined): void {
  builder.writeTypes(types);
}

export function writeAlias(builder: KeyBuilder, symbol: AstSymbol | undefined, typeArguments: readonly Type[] | undefined): void {
  builder.writeAlias(symbol, typeArguments);
}

export function writeGenericTypeReferences(builder: KeyBuilder, type: Type | undefined): void {
  builder.writeGenericTypeReferences(type);
}

export function writeNodeId(builder: KeyBuilder, node: AstNode | undefined): void {
  builder.writeNodeId(node);
}

export function writeNode(builder: KeyBuilder, node: AstNode | undefined): void {
  builder.writeNode(node);
}

export function getTypeListKey(types: readonly Type[]): string {
  const builder = new KeyBuilder();
  builder.writeTypes(types);
  return builder.hash();
}

export function getAliasKey(aliasSymbol: AstSymbol | undefined, aliasTypeArguments: readonly Type[] | undefined): string {
  const builder = new KeyBuilder();
  builder.writeAlias(aliasSymbol, aliasTypeArguments);
  return builder.hash();
}

export function getUnionKey(types: readonly Type[]): string {
  return prefixedTypeListKey("union", types);
}

export function getIntersectionKey(types: readonly Type[]): string {
  return prefixedTypeListKey("intersection", types);
}

export function getTupleKey(elementTypes: readonly Type[], readonlyTuple: boolean, elementFlags: readonly number[] = []): string {
  const builder = new KeyBuilder();
  builder.writeString("tuple");
  builder.writeByte(readonlyTuple ? "R" : "W");
  builder.writeTypes(elementTypes);
  for (const flag of elementFlags) builder.writeInt(flag);
  return builder.hash();
}

export function getTypeAliasInstantiationKey(aliasSymbol: AstSymbol | undefined, typeArguments: readonly Type[]): string {
  const builder = new KeyBuilder();
  builder.writeString("typeAlias");
  builder.writeAlias(aliasSymbol, typeArguments);
  return builder.hash();
}

export function getTypeInstantiationKey(target: Type, mapper: readonly Type[]): string {
  const builder = new KeyBuilder();
  builder.writeString("instantiation");
  builder.writeType(target);
  builder.writeTypes(mapper);
  return builder.hash();
}

export function getIndexedAccessKey(objectType: Type, indexType: Type, accessFlags = 0): string {
  const builder = new KeyBuilder();
  builder.writeString("indexedAccess");
  builder.writeType(objectType);
  builder.writeType(indexType);
  builder.writeInt(accessFlags);
  return builder.hash();
}

export function getTemplateTypeKey(texts: readonly string[], types: readonly Type[]): string {
  const builder = new KeyBuilder();
  builder.writeString("template");
  builder.writeInt(texts.length);
  for (const text of texts) builder.writeString(text);
  builder.writeTypes(types);
  return builder.hash();
}

export function getConditionalTypeKey(type: Type): string {
  const data = type.data as ConditionalTypeData | undefined;
  const builder = new KeyBuilder();
  builder.writeString("conditional");
  builder.writeType(data?.checkType);
  builder.writeType(data?.extendsType);
  builder.writeType(data?.trueType);
  builder.writeType(data?.falseType);
  return builder.hash();
}

export function getNodeListKey(nodes: readonly AstNode[]): string {
  const builder = new KeyBuilder();
  builder.writeInt(nodes.length);
  for (const node of nodes) builder.writeNode(node);
  return builder.hash();
}

function prefixedTypeListKey(prefix: string, types: readonly Type[]): string {
  const builder = new KeyBuilder();
  builder.writeString(prefix);
  builder.writeTypes(types);
  return builder.hash();
}

function getBaseConstraintOfType(type: Type): Type | undefined {
  return (type.data as { readonly constraint?: Type; readonly baseConstraint?: Type } | undefined)?.constraint
    ?? (type.data as { readonly constraint?: Type; readonly baseConstraint?: Type } | undefined)?.baseConstraint;
}

function unionIfNeeded(types: readonly Type[]): Type | undefined {
  if (types.length === 0) return undefined;
  if (types.length === 1) return types[0];
  return {
    flags: TypeFlags.Union,
    id: nextKeyTypeId(),
    data: {
      objectFlags: ObjectFlags.None,
      types: dedupeTypes(types),
    },
  };
}

function dedupeTypes(types: readonly Type[]): readonly Type[] {
  const seen = new Set<Type>();
  const result: Type[] = [];
  for (const type of types) {
    if (seen.has(type)) continue;
    seen.add(type);
    result.push(type);
  }
  return result;
}

function typeArgumentsOf(type: Type | undefined): readonly Type[] {
  return type?.aliasTypeArguments
    ?? (type?.data as { readonly typeArguments?: readonly Type[]; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.typeArguments
    ?? (type?.data as { readonly typeArguments?: readonly Type[]; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? [];
}

function isType(value: Type | undefined): value is Type {
  return value !== undefined;
}

function intrinsicName(type: Type): string {
  return (type.data as { readonly intrinsicName?: string } | undefined)?.intrinsicName ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function nodeName(node: AstNode): string {
  const name = (node as { readonly name?: AstNode }).name;
  if (name !== undefined) return nodeName(name);
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

const nodeIds = new WeakMap<AstNode, number>();
const symbolIds = new WeakMap<AstSymbol, number>();
let nextNodeId = 1;
let nextSymbolId = 1;
let nextSyntheticTypeId = -100_000;

function getStableNodeId(node: AstNode): number {
  const id = (node as { readonly id?: number }).id;
  if (id !== undefined) return id;
  const existing = nodeIds.get(node);
  if (existing !== undefined) return existing;
  const next = nextNodeId;
  nextNodeId += 1;
  nodeIds.set(node, next);
  return next;
}

function getStableSymbolId(symbol: AstSymbol): number {
  const id = (symbol as { readonly id?: number }).id;
  if (id !== undefined) return id;
  const existing = symbolIds.get(symbol);
  if (existing !== undefined) return existing;
  const next = nextSymbolId;
  nextSymbolId += 1;
  symbolIds.set(symbol, next);
  return next;
}

function nextKeyTypeId(): number {
  const id = nextSyntheticTypeId;
  nextSyntheticTypeId -= 1;
  return id;
}
