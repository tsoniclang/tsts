/**
 * Checker type instantiation algorithms.
 *
 * Conceptual split from TS-Go `checker.go` generic instantiation section:
 * active mapper stack, object/anonymous/conditional/mapped instantiation,
 * and type-parameter cloning.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { IndexInfo, MappedType, ObjectType, Signature, Type, TypeMapper, TypeParameter } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getMappedType, newTypeMapper } from "./mapper.js";
import { instantiateIndexInfo, instantiateSignatureEx } from "./checker.returnTypes.js";
import { createInstantiatedSymbolTable } from "./checker.returnTypes.js";

export interface InstantiationHost {
  readonly anyType: Type;
  readonly neverType: Type;
  readonly unknownType: Type;
  createTypeReference(target: Type, typeArguments: readonly Type[]): Type;
  createUnionType(types: readonly Type[]): Type;
  createIntersectionType(types: readonly Type[]): Type;
}

interface ActiveMapperFrame {
  readonly mapper: TypeMapper;
  readonly source: Type;
  readonly target: Type;
}

interface ConditionalTypeData {
  readonly checkType?: Type;
  readonly extendsType?: Type;
  readonly trueType?: Type;
  readonly falseType?: Type;
}

const activeMapperStack: ActiveMapperFrame[] = [];

export function instantiateTypeWithAlias(
  host: InstantiationHost,
  type: Type,
  mapper: TypeMapper | undefined,
  aliasSymbol: AstSymbol | undefined,
  aliasTypeArguments: readonly Type[] | undefined,
): Type {
  if (mapper === undefined) return type;
  const instantiated = instantiateTypeWorker(host, type, mapper);
  if (aliasSymbol === undefined && aliasTypeArguments === undefined) return instantiated;
  return {
    ...instantiated,
    ...(aliasSymbol === undefined ? {} : { aliasSymbol }),
    ...(aliasTypeArguments === undefined ? {} : { aliasTypeArguments }),
  };
}

export function pushActiveMapper(mapper: TypeMapper, source: Type, target: Type): void {
  activeMapperStack.push({ mapper, source, target });
}

export function popActiveMapper(): void {
  activeMapperStack.pop();
}

export function findActiveMapper(source: Type, target: Type): TypeMapper | undefined {
  for (let index = activeMapperStack.length - 1; index >= 0; index--) {
    const frame = activeMapperStack[index]!;
    if (frame.source === source && frame.target === target) return frame.mapper;
  }
  return undefined;
}

export function clearActiveMapperCaches(): void {
  activeMapperStack.length = 0;
}

export function isNonGenericTopLevelType(type: Type): boolean {
  if ((type.flags & TypeFlags.TypeVariable) !== 0) return false;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return typeConstituents(type).every(isNonGenericTopLevelType);
  const objectFlags = (type.data as ObjectType | undefined)?.objectFlags ?? 0;
  return (objectFlags & ObjectFlags.IsGenericType) === 0;
}

export function instantiateTypeWorker(host: InstantiationHost, type: Type, mapper: TypeMapper): Type {
  if (isNonGenericTopLevelType(type)) return type;
  const mapped = getMappedType(type, mapper);
  if (mapped !== type) return mapped;
  if ((type.flags & TypeFlags.Object) !== 0) return getObjectTypeInstantiation(host, type, mapper);
  if ((type.flags & TypeFlags.Union) !== 0) return host.createUnionType(typeConstituents(type).map(part => instantiateTypeWorker(host, part, mapper)));
  if ((type.flags & TypeFlags.Intersection) !== 0) return host.createIntersectionType(typeConstituents(type).map(part => instantiateTypeWorker(host, part, mapper)));
  if ((type.flags & TypeFlags.Conditional) !== 0) return getConditionalTypeInstantiation(host, type, mapper);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) {
    const data = type.data as { readonly objectType?: Type; readonly indexType?: Type; readonly accessFlags?: number } | undefined;
    return {
      ...type,
      id: nextSyntheticTypeId(),
      data: {
        ...data,
        objectType: data?.objectType === undefined ? host.unknownType : instantiateTypeWorker(host, data.objectType, mapper),
        indexType: data?.indexType === undefined ? host.unknownType : instantiateTypeWorker(host, data.indexType, mapper),
      },
    };
  }
  return type;
}

export function getObjectTypeInstantiation(host: InstantiationHost, type: Type, mapper: TypeMapper): Type {
  const data = type.data as ObjectType | undefined;
  if (data === undefined) return type;
  if ((data.objectFlags & ObjectFlags.Reference) !== 0 && data.target !== undefined) {
    const target = data.target as unknown as Type;
    const typeArguments = (data.resolvedTypeArguments ?? []).map(argument => instantiateTypeWorker(host, argument, mapper));
    return host.createTypeReference(target, typeArguments);
  }
  if ((data.objectFlags & ObjectFlags.Mapped) !== 0) return instantiateMappedType(host, type, mapper);
  if ((data.objectFlags & ObjectFlags.Anonymous) !== 0) return instantiateAnonymousType(host, type, mapper);
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: {
      ...data,
      declaredProperties: instantiateSymbols(data.declaredProperties, mapper),
      declaredCallSignatures: instantiateSignatures(data.declaredCallSignatures, mapper),
      declaredConstructSignatures: instantiateSignatures(data.declaredConstructSignatures, mapper),
      indexInfos: instantiateIndexInfos(data.indexInfos, mapper),
      objectFlags: data.objectFlags | ObjectFlags.Instantiated,
    },
  };
}

export function isTypeParameterPossiblyReferenced(typeParameter: TypeParameter, node: AstNode | undefined): boolean {
  const name = symbolName((typeParameter as { readonly symbol?: AstSymbol }).symbol);
  if (name.length === 0 || node === undefined) return true;
  return nodeMentions(node, name);
}

export function instantiateAnonymousType(host: InstantiationHost, type: Type, mapper: TypeMapper): Type {
  const data = type.data as ObjectType | undefined;
  if (data === undefined) return type;
  const symbol = instantiateSymbol(type.symbol, mapper);
  return {
    ...type,
    id: nextSyntheticTypeId(),
    ...(symbol === undefined ? {} : { symbol }),
    data: {
      ...data,
      declaredProperties: instantiateSymbols(data.declaredProperties, mapper),
      declaredCallSignatures: instantiateSignatures(data.declaredCallSignatures, mapper),
      declaredConstructSignatures: instantiateSignatures(data.declaredConstructSignatures, mapper),
      indexInfos: instantiateIndexInfos(data.indexInfos, mapper),
      objectFlags: data.objectFlags | ObjectFlags.Instantiated,
    },
  };
}

export function getConditionalTypeInstantiation(host: InstantiationHost, type: Type, mapper: TypeMapper): Type {
  const data = type.data as ConditionalTypeData | undefined;
  if (data === undefined) return type;
  const checkType = instantiateOptionalType(host, (data as { readonly checkType?: Type }).checkType, mapper);
  const extendsType = instantiateOptionalType(host, (data as { readonly extendsType?: Type }).extendsType, mapper);
  const trueType = instantiateOptionalType(host, (data as { readonly trueType?: Type }).trueType, mapper);
  const falseType = instantiateOptionalType(host, (data as { readonly falseType?: Type }).falseType, mapper);
  if (checkType === extendsType && trueType === falseType && checkType === undefined) return type;
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: {
      ...data,
      ...(checkType === undefined ? {} : { checkType }),
      ...(extendsType === undefined ? {} : { extendsType }),
      ...(trueType === undefined ? {} : { trueType }),
      ...(falseType === undefined ? {} : { falseType }),
    },
  };
}

export function cloneTypeParameter(typeParameter: TypeParameter): TypeParameter {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  const clone: TypeParameter = {
    ...typeParameter,
    ...(symbol === undefined ? {} : { symbol: cloneSymbol(symbol) }),
  } as TypeParameter;
  clone.target = typeParameter.target ?? typeParameter;
  if (typeParameter.mapper !== undefined) clone.mapper = typeParameter.mapper;
  return clone;
}

export function getHomomorphicTypeVariable(type: Type): TypeParameter | undefined {
  const mapped = type.data as MappedType | undefined;
  const constraint = mapped?.constraintType;
  if (constraint === undefined) return undefined;
  if ((constraint.flags & TypeFlags.Index) !== 0) {
    return ((constraint.data as { readonly type?: Type } | undefined)?.type?.data) as TypeParameter | undefined;
  }
  return undefined;
}

export function instantiateMappedType(host: InstantiationHost, type: Type, mapper: TypeMapper): Type {
  const mapped = type.data as MappedType | undefined;
  if (mapped === undefined) return type;
  const newTypeParameter = mapped.typeParameter === undefined ? undefined : cloneTypeParameter(mapped.typeParameter);
  if (newTypeParameter !== undefined) {
    const constraint = instantiateOptionalType(host, mapped.typeParameter?.constraint, mapper);
    if (constraint !== undefined) newTypeParameter.constraint = constraint;
    newTypeParameter.mapper = mapper;
  }
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: {
      ...mapped,
      ...(newTypeParameter === undefined ? {} : { typeParameter: newTypeParameter }),
      constraintType: instantiateOptionalType(host, mapped.constraintType, mapper),
      nameType: instantiateOptionalType(host, mapped.nameType, mapper),
      templateType: instantiateOptionalType(host, mapped.templateType, mapper),
      modifiersType: instantiateOptionalType(host, mapped.modifiersType, mapper),
      objectFlags: mapped.objectFlags | ObjectFlags.InstantiatedMapped,
    },
  };
}

export function hasArrayOrTypeTypeConstraint(type: Type): boolean {
  const constraint = (type.data as TypeParameter | undefined)?.constraint;
  if (constraint === undefined) return false;
  const symbol = constraint.symbol;
  return symbolName(symbol) === "Array" || symbolName(symbol) === "ReadonlyArray" || symbolName(symbol) === "Type";
}

function instantiateOptionalType(host: InstantiationHost, type: Type | undefined, mapper: TypeMapper): Type | undefined {
  return type === undefined ? undefined : instantiateTypeWorker(host, type, mapper);
}

function instantiateSymbols(symbols: readonly AstSymbol[] | undefined, mapper: TypeMapper): readonly AstSymbol[] {
  return (symbols ?? []).map(symbol => instantiateSymbol(symbol, mapper)).filter((symbol): symbol is AstSymbol => symbol !== undefined);
}

function instantiateSymbol(symbol: AstSymbol | undefined, mapper: TypeMapper): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  const type = getTypeOfSymbol(symbol);
  return {
    ...symbol,
    declarations: symbol.declarations ?? [],
    ...(type === undefined ? {} : { synthetic: true, syntheticType: getMappedType(type, mapper) }),
  } as AstSymbol;
}

function instantiateSignatures(signatures: readonly Signature[] | undefined, mapper: TypeMapper): readonly Signature[] {
  return (signatures ?? []).map(signature => instantiateSignatureEx(signature, mapper, false));
}

function instantiateIndexInfos(infos: readonly IndexInfo[] | undefined, mapper: TypeMapper): readonly IndexInfo[] {
  return (infos ?? []).map(info => instantiateIndexInfo(info, mapper));
}

function cloneSymbol(symbol: AstSymbol): AstSymbol {
  const members = (symbol as { readonly members?: SymbolTable }).members;
  return {
    ...symbol,
    declarations: [...symbol.declarations ?? []],
    ...(members === undefined ? {} : { members: cloneSymbolTable(members) }),
  } as AstSymbol;
}

function cloneSymbolTable(table: SymbolTable): SymbolTable {
  const clone: SymbolTable = new Map();
  for (const [name, symbol] of table) clone.set(name, cloneSymbol(symbol));
  return clone;
}

function nodeMentions(node: AstNode, name: string): boolean {
  if (nodeText(node) === name) return true;
  return childrenOf(node).some(child => nodeMentions(child, name));
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const key of ["children", "statements", "members", "parameters", "typeArguments", "arguments", "elements", "properties"]) {
    out.push(...nodeArray((node as unknown as Record<string, unknown>)[key]));
  }
  for (const key of ["type", "expression", "name", "left", "right", "body", "initializer"]) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (isNode(child)) out.push(child);
  }
  return out;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

const _unusedMapperFactory = newTypeMapper;
const _unusedCreateInstantiatedSymbolTable = createInstantiatedSymbolTable;
let syntheticTypeId = -1_450_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
