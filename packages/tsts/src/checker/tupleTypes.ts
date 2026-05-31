import { SymbolFlags, type Node as AstNode, type Symbol as AstSymbol } from "../ast/index.js";
import { getArrayElementType, getTypeOfSymbol } from "./checker.checkedtype.js";
import { ElementFlags, ObjectFlags, TypeFlags, type ElementFlags as ElementFlagsType, type TupleElementInfo, type TupleType, type Type, type TypeReference } from "./types.js";

export function isTupleType(type: Type): boolean {
  return (type.flags & TypeFlags.Object) !== 0 && (objectFlagsOf(type) & ObjectFlags.Tuple) !== 0;
}

export function isGenericTupleType(type: Type): boolean {
  return isTupleType(type) && tupleTarget(type)?.combinedFlags !== ElementFlags.Required;
}

export function getTupleElementTypes(type: Type): readonly Type[] {
  return (type.data as TypeReference | undefined)?.resolvedTypeArguments ?? [];
}

export function getTupleElementFlags(type: Type): readonly ElementFlagsType[] {
  const target = tupleTarget(type);
  if (target?.elementInfo !== undefined) return target.elementInfo.map(info => info.flags);
  return getTupleElementTypes(type).map(() => ElementFlags.Required);
}

export function getTupleElementLabels(type: Type): readonly string[] {
  const target = tupleTarget(type);
  return target?.elementInfo.map((info, index) =>
    tupleElementLabelFromDeclaration(info.labeledDeclaration, index, getTupleElementFlags(type)[index] ?? ElementFlags.Required)) ?? [];
}

export function getKnownKeysOfTupleType(type: Type): readonly string[] {
  const fixedLength = getTupleFixedLength(type);
  const keys: string[] = [];
  for (let index = 0; index < fixedLength; index++) keys.push(String(index));
  keys.push("length");
  return keys;
}

export function getTupleFixedLength(type: Type): number {
  const target = tupleTarget(type);
  if (target?.fixedLength !== undefined) return target.fixedLength;
  const flags = getTupleElementFlags(type);
  let count = 0;
  for (const flag of flags) {
    if ((flag & ElementFlags.Fixed) === 0) break;
    count += 1;
  }
  return count;
}

export function getTupleMinLength(type: Type): number {
  const target = tupleTarget(type);
  if (target?.minLength !== undefined) return target.minLength;
  return getTupleElementFlags(type).filter(flag => (flag & ElementFlags.Required) !== 0).length;
}

export function getTupleArity(type: Type): number {
  return getTupleElementTypes(type).length;
}

export function hasRestElement(type: Type): boolean {
  return getTupleElementFlags(type).some(flag => (flag & ElementFlags.Rest) !== 0);
}

export function hasOptionalElement(type: Type): boolean {
  return getTupleElementFlags(type).some(flag => (flag & ElementFlags.Optional) !== 0);
}

export function getRestArrayTypeOfTupleType(type: Type): Type | undefined {
  const flags = getTupleElementFlags(type);
  const types = getTupleElementTypes(type);
  for (let index = 0; index < flags.length; index++) {
    if ((flags[index]! & ElementFlags.Rest) !== 0) {
      return types[index];
    }
  }
  return undefined;
}

export function sliceTupleType(type: Type, index: number, endSkipCount: number): Type {
  const types = getTupleElementTypes(type);
  const flags = getTupleElementFlags(type);
  const end = Math.max(index, types.length - endSkipCount);
  const slicedTypes = types.slice(index, end);
  const slicedFlags = flags.slice(index, end);
  return {
    ...type,
    data: {
      objectFlags: objectFlagsOf(type),
      elementTypes: slicedTypes,
      elementFlags: slicedFlags,
      fixedLength: slicedFlags.filter(flag => (flag & ElementFlags.Fixed) !== 0).length,
      minLength: slicedFlags.filter(flag => (flag & ElementFlags.Required) !== 0).length,
      combinedFlags: slicedFlags.reduce((acc, flag) => acc | flag, 0),
    } as unknown as TupleType,
  };
}

export function getTypeAtTuplePosition(type: Type, position: number): Type | undefined {
  const elements = getTupleElementTypes(type);
  if (position < elements.length) return elements[position];
  const rest = getRestArrayTypeOfTupleType(type);
  return rest === undefined ? undefined : getArrayElementType(rest) ?? rest;
}

export function getElementTypeOfSliceOfTupleType(type: Type, index: number, endSkipCount: number): Type | undefined {
  const sliced = sliceTupleType(type, index, endSkipCount);
  const types = getTupleElementTypes(sliced);
  if (types.length === 0) return undefined;
  return unionLike(types);
}

export function tupleElementsAssignableTo(
  source: Type,
  target: Type,
  compareTypes: (source: Type, target: Type) => boolean,
): boolean {
  const sourceTypes = getTupleElementTypes(source);
  const targetTypes = getTupleElementTypes(target);
  const targetFlags = getTupleElementFlags(target);
  if (getTupleMinLength(source) > getTupleArity(target)) return false;
  if (!hasRestElement(target) && sourceTypes.length > targetTypes.length) return false;
  for (let index = 0; index < targetTypes.length; index++) {
    const targetType = targetTypes[index]!;
    const sourceType = sourceTypes[index] ?? getRestArrayTypeOfTupleType(source);
    if (sourceType === undefined) {
      if ((targetFlags[index]! & ElementFlags.Optional) !== 0) continue;
      return false;
    }
    if (!compareTypes(sourceType, targetType)) return false;
  }
  return true;
}

export function getTupleElementLabel(elementInfo: TupleElementInfo, restSymbol: AstSymbol | undefined, index: number): string {
  const declarationLabel = elementInfo.labeledDeclaration === undefined ? undefined : getTupleElementLabelFromBindingElement(elementInfo.labeledDeclaration, index, elementInfo.flags);
  if (declarationLabel !== undefined && declarationLabel.length > 0) return declarationLabel;
  const restName = restSymbol?.escapedName ?? restSymbol?.name;
  if ((elementInfo.flags & ElementFlags.Rest) !== 0 && restName !== undefined && restName.length > 0) return restName;
  return `arg${index}`;
}

export function getTupleElementLabelFromBindingElement(node: AstNode, index: number, elementFlags: ElementFlagsType): string {
  const name = (node as { readonly name?: { readonly text?: string } }).name?.text;
  if (name !== undefined && name.length > 0) return name;
  return (elementFlags & ElementFlags.Rest) !== 0 ? `rest${index}` : `arg${index}`;
}

export function isValidDeclarationForTupleLabel(declaration: AstNode): boolean {
  const symbol = (declaration as { readonly symbol?: AstSymbol }).symbol;
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0) return true;
  return (declaration as { readonly name?: unknown }).name !== undefined;
}

export function createTupleElementInfo(type: Type, flags: ElementFlagsType, label?: string, declaration?: AstNode): TupleElementInfo {
  void type; void label;
  return { flags, ...(declaration === undefined ? {} : { labeledDeclaration: declaration }) };
}

export function tupleTarget(type: Type): TupleType | undefined {
  const data = type.data as (TypeReference & Partial<TupleType>) | undefined;
  if (data === undefined) return undefined;
  if (data.elementInfo !== undefined) return data as TupleType;
  const target = data.target as (TupleType | undefined);
  return target?.elementInfo === undefined ? undefined : target;
}

function tupleElementLabelFromDeclaration(declaration: AstNode | undefined, index: number, flags: ElementFlagsType): string {
  if (declaration === undefined) return (flags & ElementFlags.Rest) !== 0 ? `rest${index}` : `arg${index}`;
  return getTupleElementLabelFromBindingElement(declaration, index, flags);
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None;
}

function unionLike(types: readonly Type[]): Type {
  if (types.length === 1) return types[0]!;
  return { id: -3, flags: TypeFlags.Union, data: { objectFlags: ObjectFlags.None, types } };
}
