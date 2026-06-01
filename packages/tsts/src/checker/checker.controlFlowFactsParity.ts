/**
 * Control-flow fact parity.
 *
 * TS-Go narrows types by truthiness, equality, `typeof`, discriminants,
 * assignments, optional chains, and switch clauses. This module ports the
 * shared fact model and merge/intersection/negation rules.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, UnionOrIntersectionType } from "./types.js";
import { TypeFlags } from "./types.js";

export type FlowFactKind =
  | "truthy"
  | "falsy"
  | "defined"
  | "undefined"
  | "null"
  | "never"
  | "typeof"
  | "equality"
  | "discriminant"
  | "assignment";

export interface FlowFact {
  readonly kind: FlowFactKind;
  readonly symbol?: AstSymbol;
  readonly propertyName?: string;
  readonly value?: string;
  readonly type?: Type;
  readonly negated?: boolean;
}

export interface FlowFactSet {
  readonly facts: readonly FlowFact[];
}

export interface FlowFactHost {
  readonly neverType: Type;
  readonly unknownType: Type;
  readonly undefinedType: Type;
  readonly nullType?: Type;
  readonly trueType?: Type;
  readonly falseType?: Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
}

export function emptyFlowFacts(): FlowFactSet {
  return { facts: [] };
}

export function addFlowFact(set: FlowFactSet, fact: FlowFact): FlowFactSet {
  if (set.facts.some(existing => sameFlowFact(existing, fact))) return set;
  return { facts: [...set.facts, fact] };
}

export function negateFlowFacts(set: FlowFactSet): FlowFactSet {
  return { facts: set.facts.map(fact => ({ ...fact, negated: fact.negated !== true })) };
}

export function intersectFlowFacts(left: FlowFactSet, right: FlowFactSet): FlowFactSet {
  let result = left;
  for (const fact of right.facts) result = addFlowFact(result, fact);
  return result;
}

export function unionFlowFacts(left: FlowFactSet, right: FlowFactSet): FlowFactSet {
  return { facts: left.facts.filter(fact => right.facts.some(other => sameFlowFact(fact, other))) };
}

export function flowFactsForTruthyExpression(symbol: AstSymbol | undefined): FlowFactSet {
  return symbol === undefined ? emptyFlowFacts() : { facts: [{ kind: "truthy", symbol }] };
}

export function flowFactsForFalsyExpression(symbol: AstSymbol | undefined): FlowFactSet {
  return symbol === undefined ? emptyFlowFacts() : { facts: [{ kind: "falsy", symbol }] };
}

export function flowFactsForTypeof(symbol: AstSymbol | undefined, value: string, negated = false): FlowFactSet {
  return symbol === undefined ? emptyFlowFacts() : { facts: [{ kind: "typeof", symbol, value, negated }] };
}

export function flowFactsForEquality(symbol: AstSymbol | undefined, type: Type, negated = false): FlowFactSet {
  return symbol === undefined ? emptyFlowFacts() : { facts: [{ kind: "equality", symbol, type, negated }] };
}

export function flowFactsForDiscriminant(symbol: AstSymbol | undefined, propertyName: string, value: string, negated = false): FlowFactSet {
  return symbol === undefined ? emptyFlowFacts() : { facts: [{ kind: "discriminant", symbol, propertyName, value, negated }] };
}

export function applyFlowFacts(type: Type, facts: FlowFactSet, symbol: AstSymbol | undefined, host: FlowFactHost): Type {
  let current = type;
  for (const fact of facts.facts) {
    if (fact.symbol !== undefined && symbol !== undefined && fact.symbol !== symbol) continue;
    current = applyFlowFact(current, fact, host);
  }
  return current;
}

export function applyFlowFact(type: Type, fact: FlowFact, host: FlowFactHost): Type {
  switch (fact.kind) {
    case "truthy":
      return fact.negated === true ? narrowFalsy(type, host) : narrowTruthy(type, host);
    case "falsy":
      return fact.negated === true ? narrowTruthy(type, host) : narrowFalsy(type, host);
    case "defined":
      return fact.negated === true ? narrowUndefined(type, host) : narrowDefined(type, host);
    case "undefined":
      return fact.negated === true ? narrowDefined(type, host) : narrowUndefined(type, host);
    case "null":
      return fact.negated === true ? narrowNonNull(type, host) : narrowNull(type, host);
    case "typeof":
      return narrowTypeof(type, fact.value ?? "", fact.negated === true, host);
    case "equality":
      return fact.type === undefined ? type : narrowByEquality(type, fact.type, fact.negated === true, host);
    case "discriminant":
      return narrowByDiscriminant(type, fact.propertyName ?? "", fact.value ?? "", fact.negated === true, host);
    case "assignment":
      return fact.type ?? type;
    case "never":
      return host.neverType;
  }
}

export function narrowTruthy(type: Type, host: FlowFactHost): Type {
  return filterType(type, part => !isDefinitelyFalsy(part), host);
}

export function narrowFalsy(type: Type, host: FlowFactHost): Type {
  return filterType(type, isDefinitelyFalsy, host);
}

export function narrowDefined(type: Type, host: FlowFactHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.Undefined) === 0, host);
}

export function narrowUndefined(type: Type, host: FlowFactHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.Undefined) !== 0, host);
}

export function narrowNull(type: Type, host: FlowFactHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.Null) !== 0, host);
}

export function narrowNonNull(type: Type, host: FlowFactHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.Null) === 0, host);
}

export function narrowTypeof(type: Type, value: string, negated: boolean, host: FlowFactHost): Type {
  const predicate = (part: Type): boolean => typeMatchesTypeof(part, value);
  return filterType(type, part => negated ? !predicate(part) : predicate(part), host);
}

export function narrowByEquality(type: Type, equalityType: Type, negated: boolean, host: FlowFactHost): Type {
  const equalityKey = typeKey(equalityType);
  return filterType(type, part => negated ? typeKey(part) !== equalityKey : typeKey(part) === equalityKey, host);
}

export function narrowByDiscriminant(type: Type, propertyName: string, value: string, negated: boolean, host: FlowFactHost): Type {
  return filterType(type, part => {
    const discriminants = discriminantMap(part);
    const actual = discriminants.get(propertyName);
    return negated ? actual !== value : actual === value;
  }, host);
}

export function factsMentionSymbol(set: FlowFactSet, symbol: AstSymbol): boolean {
  return set.facts.some(fact => fact.symbol === symbol);
}

export function removeFactsForSymbol(set: FlowFactSet, symbol: AstSymbol): FlowFactSet {
  return { facts: set.facts.filter(fact => fact.symbol !== symbol) };
}

export function replaceAssignmentFact(set: FlowFactSet, symbol: AstSymbol, type: Type): FlowFactSet {
  const without = removeFactsForSymbol(set, symbol);
  return addFlowFact(without, { kind: "assignment", symbol, type });
}

export function flowFactsForSwitchClause(symbol: AstSymbol | undefined, clauseValues: readonly string[]): readonly FlowFactSet[] {
  if (symbol === undefined) return [];
  return clauseValues.map(value => ({ facts: [{ kind: "equality", symbol, value }] }));
}

export function mergeSwitchExhaustiveness(facts: readonly FlowFactSet[], symbol: AstSymbol | undefined): FlowFactSet {
  if (symbol === undefined || facts.length === 0) return emptyFlowFacts();
  const values = facts.flatMap(set => set.facts.filter(fact => fact.symbol === symbol).map(fact => fact.value).filter((value): value is string => value !== undefined));
  return { facts: [...new Set(values)].map(value => ({ kind: "equality", symbol, value })) };
}

export function factKey(fact: FlowFact): string {
  return [
    fact.kind,
    fact.symbol?.name ?? fact.symbol?.escapedName ?? "",
    fact.propertyName ?? "",
    fact.value ?? "",
    fact.type === undefined ? "" : typeKey(fact.type),
    fact.negated === true ? "!" : "",
  ].join("|");
}

export function factsToDiagnostics(set: FlowFactSet): readonly string[] {
  return set.facts.map(fact => {
    const target = fact.symbol?.name ?? fact.symbol?.escapedName ?? "<expr>";
    const negation = fact.negated === true ? "not " : "";
    if (fact.kind === "typeof") return `${target} is ${negation}typeof ${fact.value}`;
    if (fact.kind === "discriminant") return `${target}.${fact.propertyName} is ${negation}${fact.value}`;
    return `${target} has ${negation}${fact.kind} fact`;
  });
}

export function flowNodeFacts(node: AstNode): FlowFactSet {
  return (node as { readonly flowFacts?: FlowFactSet }).flowFacts ?? emptyFlowFacts();
}

export function setFlowNodeFacts(node: AstNode, facts: FlowFactSet): AstNode {
  return Object.assign(node, { flowFacts: facts });
}

function sameFlowFact(left: FlowFact, right: FlowFact): boolean {
  return factKey(left) === factKey(right);
}

function filterType(type: Type, predicate: (type: Type) => boolean, host: FlowFactHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : host.neverType;
  const parts = constituentTypes(type).filter(predicate);
  if (parts.length === 0) return host.neverType;
  if (parts.length === 1) return parts[0]!;
  return host.createUnionType?.(parts) ?? unionType(parts);
}

function typeMatchesTypeof(type: Type, value: string): boolean {
  if (value === "string") return (type.flags & TypeFlags.StringLike) !== 0;
  if (value === "number") return (type.flags & TypeFlags.NumberLike) !== 0;
  if (value === "bigint") return (type.flags & TypeFlags.BigIntLike) !== 0;
  if (value === "boolean") return (type.flags & TypeFlags.BooleanLike) !== 0;
  if (value === "undefined") return (type.flags & TypeFlags.Undefined) !== 0;
  if (value === "object") return (type.flags & (TypeFlags.Object | TypeFlags.Null)) !== 0;
  if (value === "function") return (type.flags & TypeFlags.Object) !== 0 && Boolean((type.data as { readonly callSignatures?: unknown }).callSignatures);
  return false;
}

function isDefinitelyFalsy(type: Type): boolean {
  if ((type.flags & (TypeFlags.Undefined | TypeFlags.Null | TypeFlags.VoidLike | TypeFlags.Never)) !== 0) return true;
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  return value === false || value === 0 || value === "";
}

function discriminantMap(type: Type): ReadonlyMap<string, string> {
  const raw = (type.data as { readonly discriminants?: ReadonlyMap<string, string> } | undefined)?.discriminants;
  return raw ?? new Map();
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function unionType(types: readonly Type[]): Type {
  return { flags: TypeFlags.Union, id: syntheticId(), data: { types, objectFlags: 0 } as UnionOrIntersectionType };
}

let nextSyntheticId = -5000;

function syntheticId(): number {
  nextSyntheticId -= 1;
  return nextSyntheticId;
}

function typeKey(type: Type): string {
  if (type.id !== undefined) return `id:${type.id}`;
  if (type.symbol?.name !== undefined) return `symbol:${type.symbol.name}`;
  return `flags:${type.flags}:${JSON.stringify(type.data ?? {})}`;
}
