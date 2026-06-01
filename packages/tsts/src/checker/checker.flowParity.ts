/**
 * Flow and narrowing evaluator.
 *
 * TS-Go `flow.go` plus the checker.go flow accessors compute types by
 * replaying flow nodes, applying assignment, condition, switch-clause,
 * array-mutation, and call-effect refinements. This file provides the same
 * reusable evaluator shape for the split TSTS checker.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind } from "../ast/index.js";
import { TypeFlags, type Type } from "./types.js";

export type FlowNodeKind =
  | "start"
  | "assignment"
  | "condition"
  | "switch-clause"
  | "array-mutation"
  | "call"
  | "label"
  | "branch-label"
  | "loop-label"
  | "reduce-label"
  | "unreachable";

export type FlowPredicateKind =
  | "truthy"
  | "falsy"
  | "typeof"
  | "equality"
  | "inequality"
  | "in"
  | "instanceof"
  | "discriminant"
  | "never";

export interface FlowTypeEnvironment {
  readonly declaredType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly unknownType: Type;
  readonly narrowTypeByTruthiness: (type: Type, assumeTrue: boolean) => Type;
  readonly narrowTypeByTypeof: (type: Type, typeName: string, assumeTrue: boolean) => Type;
  readonly narrowTypeByEquality: (type: Type, compared: Type, assumeTrue: boolean) => Type;
  readonly narrowTypeByPropertyPresence: (type: Type, propertyName: string, assumeTrue: boolean) => Type;
  readonly getAssignedType?: (node: AstNode) => Type | undefined;
  readonly getExpressionType?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly isMatchingReference?: (reference: AstNode, candidate: AstNode) => boolean;
}

export interface FlowNode {
  readonly id: number;
  readonly kind: FlowNodeKind;
  readonly node?: AstNode;
  readonly antecedent?: FlowNode;
  readonly antecedents?: readonly FlowNode[];
  readonly predicate?: FlowPredicate;
  readonly target?: AstSymbol;
  readonly invalidates?: readonly AstSymbol[];
}

export interface FlowPredicate {
  readonly kind: FlowPredicateKind;
  readonly expression?: AstNode;
  readonly propertyName?: string;
  readonly typeName?: string;
  readonly comparedType?: Type;
  readonly assumeTrue: boolean;
}

export interface FlowEvaluationState {
  readonly cache: Map<string, Type>;
  readonly inProgress: Set<string>;
  readonly environments: Map<AstSymbol, Type>;
  recursionDepth: number;
  recursionLimit: number;
}

export interface FlowAssignmentEffect {
  readonly symbol: AstSymbol;
  readonly assignedType: Type;
  readonly declaredType: Type;
  readonly narrowedType: Type;
}

export function createFlowEvaluationState(): FlowEvaluationState {
  return {
    cache: new Map(),
    inProgress: new Set(),
    environments: new Map(),
    recursionDepth: 0,
    recursionLimit: 200,
  };
}

export function getFlowTypeOfReference(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode | undefined,
  environment: FlowTypeEnvironment,
  state = createFlowEvaluationState(),
): Type {
  if (flowNode === undefined) return declaredType;
  const key = `${flowNode.id}:${nodeIdentity(reference)}:${declaredType.id}`;
  const cached = state.cache.get(key);
  if (cached !== undefined) return cached;
  if (state.inProgress.has(key)) return declaredType;
  if (state.recursionDepth > state.recursionLimit) return declaredType;
  state.inProgress.add(key);
  state.recursionDepth += 1;
  const result = getFlowTypeOfReferenceWorker(reference, declaredType, flowNode, environment, state);
  state.recursionDepth -= 1;
  state.inProgress.delete(key);
  state.cache.set(key, result);
  return result;
}

export function getFlowTypeOfReferenceWorker(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  switch (flowNode.kind) {
    case "start":
      return declaredType;
    case "assignment":
      return getTypeAtFlowAssignment(reference, declaredType, flowNode, environment, state);
    case "condition":
      return getTypeAtFlowCondition(reference, declaredType, flowNode, environment, state);
    case "switch-clause":
      return getTypeAtSwitchClause(reference, declaredType, flowNode, environment, state);
    case "array-mutation":
      return getTypeAtFlowArrayMutation(reference, declaredType, flowNode, environment, state);
    case "call":
      return getTypeAtFlowCall(reference, declaredType, flowNode, environment, state);
    case "label":
    case "branch-label":
    case "loop-label":
    case "reduce-label":
      return getTypeAtFlowLabel(reference, declaredType, flowNode, environment, state);
    case "unreachable":
      return environment.neverType;
  }
}

export function getTypeAtFlowAssignment(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedentType = getAntecedentType(reference, declaredType, flowNode, environment, state);
  const assignedNode = flowNode.node;
  if (assignedNode === undefined) return antecedentType;
  if (!isMatchingReference(environment, reference, assignedNode)) return antecedentType;
  const assignedType = environment.getAssignedType?.(assignedNode) ?? environment.getExpressionType?.(assignedNode);
  if (assignedType === undefined) return antecedentType;
  return getAssignmentReducedType(declaredType, assignedType, environment);
}

export function getTypeAtFlowCondition(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedentType = getAntecedentType(reference, declaredType, flowNode, environment, state);
  const predicate = flowNode.predicate;
  if (predicate === undefined) return antecedentType;
  if (predicate.expression !== undefined && !isReferenceRelevant(environment, reference, predicate.expression)) return antecedentType;
  return narrowTypeByFlowPredicate(antecedentType, predicate, environment);
}

export function getTypeAtSwitchClause(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedentType = getAntecedentType(reference, declaredType, flowNode, environment, state);
  const predicate = flowNode.predicate;
  if (predicate === undefined) return antecedentType;
  if (predicate.kind !== "discriminant" && predicate.kind !== "equality") return antecedentType;
  return narrowTypeByFlowPredicate(antecedentType, predicate, environment);
}

export function getTypeAtFlowArrayMutation(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedentType = getAntecedentType(reference, declaredType, flowNode, environment, state);
  const target = flowNode.target;
  if (target === undefined) return antecedentType;
  const targetType = environment.getTypeOfSymbol?.(target);
  if (targetType === undefined) return antecedentType;
  if (flowNode.invalidates?.includes(target) === true) return declaredType;
  return antecedentType;
}

export function getTypeAtFlowCall(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedentType = getAntecedentType(reference, declaredType, flowNode, environment, state);
  for (const invalidated of flowNode.invalidates ?? []) {
    const symbol = symbolForReference(reference);
    if (symbol !== undefined && symbol === invalidated) return declaredType;
  }
  const predicate = flowNode.predicate;
  return predicate === undefined ? antecedentType : narrowTypeByFlowPredicate(antecedentType, predicate, environment);
}

export function getTypeAtFlowLabel(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  const antecedents = flowNode.antecedents ?? (flowNode.antecedent === undefined ? [] : [flowNode.antecedent]);
  if (antecedents.length === 0) return declaredType;
  const types = antecedents.map(antecedent => getFlowTypeOfReference(reference, declaredType, antecedent, environment, state));
  return combineFlowTypes(types, declaredType, environment);
}

export function getAntecedentType(
  reference: AstNode,
  declaredType: Type,
  flowNode: FlowNode,
  environment: FlowTypeEnvironment,
  state: FlowEvaluationState,
): Type {
  return flowNode.antecedent === undefined
    ? declaredType
    : getFlowTypeOfReference(reference, declaredType, flowNode.antecedent, environment, state);
}

export function narrowTypeByFlowPredicate(type: Type, predicate: FlowPredicate, environment: FlowTypeEnvironment): Type {
  switch (predicate.kind) {
    case "truthy":
      return environment.narrowTypeByTruthiness(type, predicate.assumeTrue);
    case "falsy":
      return environment.narrowTypeByTruthiness(type, !predicate.assumeTrue);
    case "typeof":
      return predicate.typeName === undefined ? type : environment.narrowTypeByTypeof(type, predicate.typeName, predicate.assumeTrue);
    case "equality":
    case "inequality":
      return predicate.comparedType === undefined
        ? type
        : environment.narrowTypeByEquality(type, predicate.comparedType, predicate.kind === "equality" ? predicate.assumeTrue : !predicate.assumeTrue);
    case "in":
    case "discriminant":
      return predicate.propertyName === undefined ? type : environment.narrowTypeByPropertyPresence(type, predicate.propertyName, predicate.assumeTrue);
    case "instanceof":
      return predicate.comparedType === undefined ? type : environment.narrowTypeByEquality(type, predicate.comparedType, predicate.assumeTrue);
    case "never":
      return predicate.assumeTrue ? environment.neverType : type;
  }
}

export function getAssignmentReducedType(declaredType: Type, assignedType: Type, environment: FlowTypeEnvironment): Type {
  if ((assignedType.flags & TypeFlags.Never) !== 0) return environment.neverType;
  if ((declaredType.flags & TypeFlags.Union) === 0) return assignedType;
  if ((assignedType.flags & TypeFlags.AnyOrUnknown) !== 0) return declaredType;
  return environment.narrowTypeByEquality(declaredType, assignedType, true);
}

export function combineFlowTypes(types: readonly Type[], declaredType: Type, environment: FlowTypeEnvironment): Type {
  const nonNever = types.filter(type => (type.flags & TypeFlags.Never) === 0);
  if (nonNever.length === 0) return environment.neverType;
  if (nonNever.length === 1) return nonNever[0]!;
  if (nonNever.every(type => type === nonNever[0])) return nonNever[0]!;
  if (nonNever.some(type => type === declaredType)) return declaredType;
  return declaredType;
}

export function createFlowPredicateFromExpression(
  expression: AstNode,
  assumeTrue: boolean,
  comparedType: Type | undefined,
): FlowPredicate {
  const propertyName = propertyNameFromExpression(expression);
  const typeName = typeofNameFromExpression(expression);
  if (typeName !== undefined) return { kind: "typeof", expression, typeName, assumeTrue };
  if (propertyName !== undefined) {
    return {
      kind: "discriminant",
      expression,
      propertyName,
      ...(comparedType === undefined ? {} : { comparedType }),
      assumeTrue,
    };
  }
  return { kind: assumeTrue ? "truthy" : "falsy", expression, assumeTrue };
}

export function createEqualityFlowPredicate(expression: AstNode, comparedType: Type, assumeTrue: boolean): FlowPredicate {
  return { kind: "equality", expression, comparedType, assumeTrue };
}

export function createInFlowPredicate(expression: AstNode, propertyName: string, assumeTrue: boolean): FlowPredicate {
  return { kind: "in", expression, propertyName, assumeTrue };
}

export function createTypeofFlowPredicate(expression: AstNode, typeName: string, assumeTrue: boolean): FlowPredicate {
  return { kind: "typeof", expression, typeName, assumeTrue };
}

export function createNeverFlowPredicate(expression: AstNode): FlowPredicate {
  return { kind: "never", expression, assumeTrue: true };
}

export function isReachableFlowNode(flowNode: FlowNode | undefined): boolean {
  if (flowNode === undefined) return true;
  if (flowNode.kind === "unreachable") return false;
  return flowNode.antecedent === undefined || isReachableFlowNode(flowNode.antecedent);
}

export function reduceFlowLabel(antecedents: readonly FlowNode[], id: number): FlowNode {
  const reachable = antecedents.filter(isReachableFlowNode);
  if (reachable.length === 0) return { id, kind: "unreachable" };
  if (reachable.length === 1) return reachable[0]!;
  return { id, kind: "reduce-label", antecedents: reachable };
}

export function makeAssignmentFlowNode(id: number, node: AstNode, antecedent: FlowNode): FlowNode {
  return { id, kind: "assignment", node, antecedent };
}

export function makeConditionFlowNode(id: number, node: AstNode, predicate: FlowPredicate, antecedent: FlowNode): FlowNode {
  return { id, kind: "condition", node, predicate, antecedent };
}

export function makeSwitchClauseFlowNode(id: number, node: AstNode, predicate: FlowPredicate, antecedent: FlowNode): FlowNode {
  return { id, kind: "switch-clause", node, predicate, antecedent };
}

export function makeCallFlowNode(id: number, node: AstNode, antecedent: FlowNode, invalidates: readonly AstSymbol[]): FlowNode {
  return { id, kind: "call", node, antecedent, invalidates };
}

export function makeArrayMutationFlowNode(id: number, node: AstNode, antecedent: FlowNode, target: AstSymbol): FlowNode {
  return { id, kind: "array-mutation", node, antecedent, target, invalidates: [target] };
}

export function isReferenceRelevant(environment: FlowTypeEnvironment, reference: AstNode, expression: AstNode): boolean {
  return isMatchingReference(environment, reference, expression)
    || isDottedNamePrefix(reference, expression)
    || isDottedNamePrefix(expression, reference);
}

export function isMatchingReference(environment: FlowTypeEnvironment, reference: AstNode, candidate: AstNode): boolean {
  const custom = environment.isMatchingReference?.(reference, candidate);
  if (custom !== undefined) return custom;
  if (reference === candidate) return true;
  const referenceName = referenceText(reference);
  const candidateName = referenceText(candidate);
  return referenceName.length !== 0 && referenceName === candidateName;
}

export function isDottedNamePrefix(prefix: AstNode, node: AstNode): boolean {
  const prefixText = referenceText(prefix);
  const nodeText = referenceText(node);
  return prefixText.length !== 0 && nodeText.startsWith(`${prefixText}.`);
}

export function propertyNameFromExpression(expression: AstNode): string | undefined {
  if (expression.kind === Kind.PropertyAccessExpression) {
    const name = (expression as { readonly name?: { readonly text?: string } | string }).name;
    return typeof name === "string" ? name : name?.text;
  }
  if (expression.kind === Kind.ElementAccessExpression) {
    const argument = (expression as { readonly argumentExpression?: AstNode }).argumentExpression;
    return argument === undefined ? undefined : literalText(argument);
  }
  return undefined;
}

export function typeofNameFromExpression(expression: AstNode): string | undefined {
  if (expression.kind !== Kind.TypeOfExpression) return undefined;
  const candidate = expression as { readonly typeName?: string; readonly text?: string };
  return candidate.typeName ?? candidate.text;
}

export function referenceText(node: AstNode): string {
  const candidate = node as {
    readonly text?: string;
    readonly escapedText?: string;
    readonly expression?: AstNode;
    readonly name?: AstNode | string;
  };
  if (candidate.text !== undefined) return candidate.text;
  if (candidate.escapedText !== undefined) return candidate.escapedText;
  if (typeof candidate.name === "string") return `${referenceText(candidate.expression ?? node)}.${candidate.name}`;
  if (candidate.name !== undefined) return `${referenceText(candidate.expression ?? node)}.${referenceText(candidate.name)}`;
  return "";
}

export function literalText(node: AstNode): string | undefined {
  const candidate = node as { readonly text?: string; readonly value?: string | number };
  if (candidate.text !== undefined) return candidate.text;
  if (typeof candidate.value === "string" || typeof candidate.value === "number") return String(candidate.value);
  return undefined;
}

export function symbolForReference(node: AstNode): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol; readonly resolvedSymbol?: AstSymbol }).symbol
    ?? (node as { readonly resolvedSymbol?: AstSymbol }).resolvedSymbol;
}

export function nodeIdentity(node: AstNode): number {
  return (node as { readonly id?: number }).id ?? node.kind;
}
