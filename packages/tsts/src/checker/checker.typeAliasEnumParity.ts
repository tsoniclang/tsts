/**
 * Type-alias and enum evaluation parity.
 *
 * TS-Go computes declared type aliases, enum member constants, enum literal
 * unions, and circularity diagnostics through one cache-backed path. This file
 * ports that path for the split checker.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { Type, UnionOrIntersectionType } from "./types.js";
import { TypeFlags } from "./types.js";

export interface TypeAliasEnumHost {
  readonly unknownType: Type;
  readonly numberType: Type;
  readonly stringType: Type;
  readonly neverType: Type;
  readonly createLiteralType?: (value: string | number | boolean, symbol?: AstSymbol) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly getDeclaredTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getTypeFromTypeNode?: (node: AstNode) => Type | undefined;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface TypeAliasResolutionState {
  readonly resolving: Set<AstSymbol>;
  readonly resolved: Map<AstSymbol, Type>;
  readonly enumValues: Map<AstSymbol, EnumMemberValue>;
}

export type EnumMemberValue =
  | { readonly kind: "number"; readonly value: number }
  | { readonly kind: "string"; readonly value: string }
  | { readonly kind: "unknown" };

export function createTypeAliasResolutionState(): TypeAliasResolutionState {
  return { resolving: new Set(), resolved: new Map(), enumValues: new Map() };
}

export function getDeclaredTypeOfTypeAlias(symbol: AstSymbol, declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): Type {
  const cached = state.resolved.get(symbol);
  if (cached !== undefined) return cached;
  if (state.resolving.has(symbol)) {
    host.report?.(declaration, `Type alias '${symbolName(symbol)}' circularly references itself.`);
    state.resolved.set(symbol, host.neverType);
    return host.neverType;
  }
  state.resolving.add(symbol);
  const typeNode = (declaration as { readonly type?: AstNode }).type;
  const resolved = typeNode === undefined ? host.unknownType : host.getTypeFromTypeNode?.(typeNode) ?? host.unknownType;
  state.resolving.delete(symbol);
  state.resolved.set(symbol, resolved);
  return resolved;
}

export function getDeclaredTypeOfEnum(symbol: AstSymbol, declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): Type {
  const cached = state.resolved.get(symbol);
  if (cached !== undefined) return cached;
  const members = enumMembers(declaration);
  const memberTypes = members.map(member => getDeclaredTypeOfEnumMember(memberSymbol(member), member, state, host));
  const result = memberTypes.length === 0
    ? host.numberType
    : host.createUnionType?.(memberTypes) ?? unionType(memberTypes);
  state.resolved.set(symbol, result);
  return result;
}

export function getDeclaredTypeOfEnumMember(symbol: AstSymbol, declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): Type {
  const cached = state.resolved.get(symbol);
  if (cached !== undefined) return cached;
  const value = computeEnumMemberValue(symbol, declaration, state, host);
  const type = value.kind === "string"
    ? literalType(value.value, symbol, host)
    : value.kind === "number"
      ? literalType(value.value, symbol, host)
      : host.numberType;
  state.resolved.set(symbol, type);
  return type;
}

export function computeEnumMemberValue(symbol: AstSymbol, declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): EnumMemberValue {
  const cached = state.enumValues.get(symbol);
  if (cached !== undefined) return cached;
  const initializer = (declaration as { readonly initializer?: AstNode }).initializer;
  const value = initializer === undefined
    ? computeAutoEnumValue(declaration, state)
    : evaluateEnumInitializer(initializer, state, host);
  state.enumValues.set(symbol, value);
  return value;
}

export function evaluateEnumInitializer(node: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): EnumMemberValue {
  const raw = literalNodeValue(node);
  if (typeof raw === "number") return { kind: "number", value: raw };
  if (typeof raw === "string") return { kind: "string", value: raw };
  const operator = (node as { readonly operator?: string }).operator;
  const operand = (node as { readonly operand?: AstNode }).operand;
  if (operator !== undefined && operand !== undefined) return evaluateUnaryEnumInitializer(operator, operand, state, host);
  const left = (node as { readonly left?: AstNode }).left;
  const right = (node as { readonly right?: AstNode }).right;
  if (left !== undefined && right !== undefined) return evaluateBinaryEnumInitializer(left, (node as { readonly operatorToken?: { readonly text?: string } }).operatorToken?.text ?? "", right, state, host);
  const symbol = (node as { readonly symbol?: AstSymbol }).symbol;
  if (symbol !== undefined) return state.enumValues.get(symbol) ?? { kind: "unknown" };
  return { kind: "unknown" };
}

export function evaluateUnaryEnumInitializer(operator: string, operand: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): EnumMemberValue {
  const value = evaluateEnumInitializer(operand, state, host);
  if (value.kind !== "number") return { kind: "unknown" };
  if (operator === "-") return { kind: "number", value: -value.value };
  if (operator === "+") return value;
  if (operator === "~") return { kind: "number", value: ~value.value };
  return { kind: "unknown" };
}

export function evaluateBinaryEnumInitializer(left: AstNode, operator: string, right: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): EnumMemberValue {
  const leftValue = evaluateEnumInitializer(left, state, host);
  const rightValue = evaluateEnumInitializer(right, state, host);
  if (operator === "+" && leftValue.kind === "string" && rightValue.kind === "string") return { kind: "string", value: leftValue.value + rightValue.value };
  if (leftValue.kind !== "number" || rightValue.kind !== "number") return { kind: "unknown" };
  switch (operator) {
    case "+":
      return { kind: "number", value: leftValue.value + rightValue.value };
    case "-":
      return { kind: "number", value: leftValue.value - rightValue.value };
    case "*":
      return { kind: "number", value: leftValue.value * rightValue.value };
    case "/":
      return { kind: "number", value: leftValue.value / rightValue.value };
    case "%":
      return { kind: "number", value: leftValue.value % rightValue.value };
    case "<<":
      return { kind: "number", value: leftValue.value << rightValue.value };
    case ">>":
      return { kind: "number", value: leftValue.value >> rightValue.value };
    case ">>>":
      return { kind: "number", value: leftValue.value >>> rightValue.value };
    case "|":
      return { kind: "number", value: leftValue.value | rightValue.value };
    case "&":
      return { kind: "number", value: leftValue.value & rightValue.value };
    case "^":
      return { kind: "number", value: leftValue.value ^ rightValue.value };
    default:
      return { kind: "unknown" };
  }
}

export function enumMemberValueToString(value: EnumMemberValue): string {
  if (value.kind === "string") return JSON.stringify(value.value);
  if (value.kind === "number") return String(value.value);
  return "<unknown>";
}

export function enumHasOnlyLiteralMembers(declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): boolean {
  return enumMembers(declaration).every(member => computeEnumMemberValue(memberSymbol(member), member, state, host).kind !== "unknown");
}

export function enumIsConst(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.ConstEnum) !== 0 || Boolean((symbol as { readonly constEnum?: boolean }).constEnum);
}

export function aliasSymbolTarget(symbol: AstSymbol, host: TypeAliasEnumHost): AstSymbol | undefined {
  const type = host.getDeclaredTypeOfSymbol?.(symbol);
  return type?.symbol;
}

export function typeAliasNeedsSubstitution(declaration: AstNode): boolean {
  return ((declaration as { readonly typeParameters?: readonly AstNode[] }).typeParameters?.length ?? 0) > 0;
}

export function instantiateAliasType(type: Type, typeArguments: readonly Type[], host: TypeAliasEnumHost): Type {
  if (typeArguments.length === 0) return type;
  return host.createUnionType?.([type, ...typeArguments]) ?? unionType([type, ...typeArguments]);
}

export function getEnumMembersAsSymbols(declaration: AstNode): readonly AstSymbol[] {
  return enumMembers(declaration).map(memberSymbol);
}

export function getEnumValueMap(declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): ReadonlyMap<string, EnumMemberValue> {
  const map = new Map<string, EnumMemberValue>();
  for (const member of enumMembers(declaration)) {
    const symbol = memberSymbol(member);
    map.set(symbolName(symbol), computeEnumMemberValue(symbol, member, state, host));
  }
  return map;
}

export function reportEnumValueDiagnostics(declaration: AstNode, state: TypeAliasResolutionState, host: TypeAliasEnumHost): readonly string[] {
  const diagnostics: string[] = [];
  for (const [name, value] of getEnumValueMap(declaration, state, host)) {
    if (value.kind === "unknown") {
      const message = `Enum member '${name}' must have a constant value.`;
      diagnostics.push(message);
      host.report?.(declaration, message);
    }
  }
  return diagnostics;
}

function computeAutoEnumValue(declaration: AstNode, state: TypeAliasResolutionState): EnumMemberValue {
  const previous = previousEnumMember(declaration);
  if (previous === undefined) return { kind: "number", value: 0 };
  const previousValue = state.enumValues.get(memberSymbol(previous));
  return previousValue?.kind === "number" ? { kind: "number", value: previousValue.value + 1 } : { kind: "unknown" };
}

function previousEnumMember(declaration: AstNode): AstNode | undefined {
  const parent = declaration.parent as { readonly members?: readonly AstNode[] } | undefined;
  const members = parent?.members ?? [];
  const index = members.indexOf(declaration);
  return index > 0 ? members[index - 1] : undefined;
}

function enumMembers(declaration: AstNode): readonly AstNode[] {
  return (declaration as { readonly members?: readonly AstNode[] }).members ?? [];
}

function memberSymbol(member: AstNode): AstSymbol {
  return member.symbol ?? { name: memberName(member), escapedName: memberName(member), declarations: [member], flags: SymbolFlags.EnumMember };
}

function memberName(member: AstNode): string {
  const name = (member as { readonly name?: { readonly text?: string; readonly escapedText?: string } }).name;
  return name?.text ?? name?.escapedText ?? "";
}

function literalNodeValue(node: AstNode): string | number | undefined {
  const value = (node as { readonly value?: unknown; readonly text?: string }).value;
  if (typeof value === "string" || typeof value === "number") return value;
  const text = (node as { readonly text?: string }).text;
  if (text === undefined) return undefined;
  const numberValue = Number(text);
  return Number.isFinite(numberValue) && text.trim() !== "" ? numberValue : text;
}

function literalType(value: string | number | boolean, symbol: AstSymbol, host: TypeAliasEnumHost): Type {
  return host.createLiteralType?.(value, symbol) ?? {
    flags: typeof value === "number" ? TypeFlags.NumberLiteral : typeof value === "string" ? TypeFlags.StringLiteral : TypeFlags.BooleanLiteral,
    id: syntheticId(),
    symbol,
    data: { value } as NonNullable<Type["data"]>,
  };
}

function unionType(types: readonly Type[]): Type {
  return { flags: TypeFlags.Union, id: syntheticId(), data: { types, objectFlags: 0 } as UnionOrIntersectionType };
}

let nextSyntheticId = -6000;

function syntheticId(): number {
  nextSyntheticId -= 1;
  return nextSyntheticId;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}
