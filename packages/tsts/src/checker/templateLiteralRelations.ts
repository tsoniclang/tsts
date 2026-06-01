import { TypeFlags, type Type } from "./types.js";

export interface TemplateLiteralTypeData {
  readonly texts: readonly string[];
  readonly types: readonly Type[];
}

export type TypeComparer = (source: Type, target: Type) => boolean;

export function templateLiteralTypesDefinitelyUnrelated(source: TemplateLiteralTypeData, target: TemplateLiteralTypeData): boolean {
  if (source.texts.length === 0 || target.texts.length === 0) return false;
  const sourceStart = source.texts[0] ?? "";
  const targetStart = target.texts[0] ?? "";
  if (sourceStart.length > 0 && targetStart.length > 0 && !sourceStart.startsWith(targetStart) && !targetStart.startsWith(sourceStart)) return true;
  const sourceEnd = source.texts[source.texts.length - 1] ?? "";
  const targetEnd = target.texts[target.texts.length - 1] ?? "";
  if (sourceEnd.length > 0 && targetEnd.length > 0 && !sourceEnd.endsWith(targetEnd) && !targetEnd.endsWith(sourceEnd)) return true;
  return false;
}

export function isTypeMatchedByTemplateLiteralType(source: Type, target: TemplateLiteralTypeData, compareTypes: TypeComparer): boolean {
  if ((source.flags & TypeFlags.StringLiteral) !== 0) {
    const value = String((source.data as { readonly value?: unknown } | undefined)?.value ?? "");
    return matchesStringLiteralText(value, target);
  }
  if ((source.flags & TypeFlags.TemplateLiteral) !== 0) {
    const sourceTemplate = templateLiteralDataOf(source);
    return sourceTemplate !== undefined && inferTypesFromTemplateLiteralType(source, target).every((inferred, index) => {
      const targetType = target.types[index];
      return targetType === undefined || compareTypes(inferred, targetType);
    });
  }
  return target.types.some(type => compareTypes(source, type));
}

export function inferTypesFromTemplateLiteralType(source: Type, target: TemplateLiteralTypeData): readonly Type[] {
  if ((source.flags & TypeFlags.StringLiteral) !== 0) {
    const value = String((source.data as { readonly value?: unknown } | undefined)?.value ?? "");
    return inferFromLiteralPartsToTemplateLiteral([value], [], target);
  }
  const sourceTemplate = templateLiteralDataOf(source);
  if (sourceTemplate === undefined) return [];
  return inferFromLiteralPartsToTemplateLiteral(sourceTemplate.texts, sourceTemplate.types, target);
}

export function inferFromLiteralPartsToTemplateLiteral(
  sourceTexts: readonly string[],
  sourceTypes: readonly Type[],
  target: TemplateLiteralTypeData,
): readonly Type[] {
  if (target.texts.length === 0) return [];
  const matches: Type[] = [];
  let sourceIndex = 0;
  let sourceOffset = 0;
  for (let targetIndex = 0; targetIndex < target.types.length; targetIndex++) {
    const startText = target.texts[targetIndex] ?? "";
    const endText = target.texts[targetIndex + 1] ?? "";
    if (!consumeText(sourceTexts, startText, sourceIndex, sourceOffset).matched) return [];
    const afterStart = consumeText(sourceTexts, startText, sourceIndex, sourceOffset);
    sourceIndex = afterStart.index;
    sourceOffset = afterStart.offset;
    const span = consumeUntilText(sourceTexts, sourceTypes, endText, sourceIndex, sourceOffset);
    if (!span.matched) return [];
    matches.push(typeFromMatchedSpan(span.text, span.types, target.types[targetIndex]));
    sourceIndex = span.index;
    sourceOffset = span.offset;
  }
  const tail = target.texts[target.texts.length - 1] ?? "";
  return consumeText(sourceTexts, tail, sourceIndex, sourceOffset).matched ? matches : [];
}

export function getStringLikeTypeForType(type: Type): Type {
  if ((type.flags & TypeFlags.StringLike) !== 0) return type;
  if ((type.flags & TypeFlags.NumberLike) !== 0 || (type.flags & TypeFlags.BigIntLike) !== 0 || (type.flags & TypeFlags.BooleanLike) !== 0) {
    return stringLiteralType(String((type.data as { readonly value?: unknown } | undefined)?.value ?? ""));
  }
  return stringTypeLike();
}

export function isValidTypeForTemplateLiteralPlaceholder(source: Type, target: Type, compareTypes: TypeComparer): boolean {
  if ((target.flags & TypeFlags.StringLike) !== 0) return (source.flags & TypeFlags.StringLike) !== 0;
  if ((target.flags & TypeFlags.NumberLike) !== 0) return (source.flags & TypeFlags.NumberLike) !== 0;
  if ((target.flags & TypeFlags.BigIntLike) !== 0) return (source.flags & TypeFlags.BigIntLike) !== 0;
  if ((target.flags & TypeFlags.BooleanLike) !== 0) return (source.flags & TypeFlags.BooleanLike) !== 0;
  return compareTypes(source, target);
}

export function isMemberOfStringMapping(source: Type, target: Type): boolean {
  const symbol = target.symbol?.name ?? "";
  if (symbol.length === 0) return false;
  return (source.flags & TypeFlags.StringLike) !== 0 && STRING_MAPPING_NAMES.has(symbol);
}

export function applyTargetStringMappingToSource(source: Type, target: Type): { readonly source: Type; readonly target: Type } {
  const mapping = target.symbol?.name ?? "";
  const sourceValue = (source.data as { readonly value?: unknown } | undefined)?.value;
  if (typeof sourceValue !== "string") return { source, target };
  switch (mapping) {
    case "Uppercase": return { source: stringLiteralType(sourceValue.toUpperCase()), target };
    case "Lowercase": return { source: stringLiteralType(sourceValue.toLowerCase()), target };
    case "Capitalize": return { source: stringLiteralType(sourceValue.slice(0, 1).toUpperCase() + sourceValue.slice(1)), target };
    case "Uncapitalize": return { source: stringLiteralType(sourceValue.slice(0, 1).toLowerCase() + sourceValue.slice(1)), target };
    default: return { source, target };
  }
}

export function literalTextFromType(type: Type): string | undefined {
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") return String(value);
  return undefined;
}

function matchesStringLiteralText(value: string, target: TemplateLiteralTypeData): boolean {
  let offset = 0;
  for (let index = 0; index < target.types.length; index++) {
    const start = target.texts[index] ?? "";
    if (!value.startsWith(start, offset)) return false;
    offset += start.length;
    const next = target.texts[index + 1] ?? "";
    if (next.length === 0) {
      offset = value.length;
      continue;
    }
    const nextIndex = value.indexOf(next, offset);
    if (nextIndex < 0) return false;
    offset = nextIndex;
  }
  const tail = target.texts[target.texts.length - 1] ?? "";
  return value.startsWith(tail, offset) && offset + tail.length === value.length;
}

function consumeText(sourceTexts: readonly string[], text: string, index: number, offset: number): { readonly matched: boolean; readonly index: number; readonly offset: number } {
  if (text.length === 0) return { matched: true, index, offset };
  let remaining = text;
  let currentIndex = index;
  let currentOffset = offset;
  while (remaining.length > 0 && currentIndex < sourceTexts.length) {
    const current = sourceTexts[currentIndex]!.slice(currentOffset);
    if (!remaining.startsWith(current) && !current.startsWith(remaining)) return { matched: false, index, offset };
    if (remaining.length <= current.length) return { matched: true, index: currentIndex, offset: currentOffset + remaining.length };
    remaining = remaining.slice(current.length);
    currentIndex += 1;
    currentOffset = 0;
  }
  return { matched: remaining.length === 0, index: currentIndex, offset: currentOffset };
}

function consumeUntilText(
  sourceTexts: readonly string[],
  sourceTypes: readonly Type[],
  text: string,
  index: number,
  offset: number,
): { readonly matched: boolean; readonly text: string; readonly types: readonly Type[]; readonly index: number; readonly offset: number } {
  let literal = "";
  const types: Type[] = [];
  let currentIndex = index;
  let currentOffset = offset;
  while (currentIndex < sourceTexts.length) {
    const current = sourceTexts[currentIndex]!.slice(currentOffset);
    const found = text.length === 0 ? current.length : current.indexOf(text);
    if (found >= 0) {
      literal += current.slice(0, found);
      return { matched: true, text: literal, types, index: currentIndex, offset: currentOffset + found };
    }
    literal += current;
    const sourceType = sourceTypes[currentIndex];
    if (sourceType !== undefined) types.push(sourceType);
    currentIndex += 1;
    currentOffset = 0;
  }
  return { matched: text.length === 0, text: literal, types, index: currentIndex, offset: currentOffset };
}

function typeFromMatchedSpan(text: string, types: readonly Type[], fallback: Type | undefined): Type {
  if (types.length === 1 && text.length === 0) return types[0]!;
  if (text.length > 0) return stringLiteralType(text);
  return fallback ?? stringTypeLike();
}

function templateLiteralDataOf(type: Type): TemplateLiteralTypeData | undefined {
  const data = type.data as { readonly texts?: readonly string[]; readonly types?: readonly Type[] } | undefined;
  return data?.texts === undefined || data.types === undefined ? undefined : { texts: data.texts, types: data.types };
}

function stringLiteralType(value: string): Type {
  return { id: -1, flags: TypeFlags.StringLiteral, data: { value } };
}

function stringTypeLike(): Type {
  return { id: -2, flags: TypeFlags.String, data: { intrinsicName: "string", objectFlags: 0 } };
}

const STRING_MAPPING_NAMES = new Set(["Uppercase", "Lowercase", "Capitalize", "Uncapitalize"]);
