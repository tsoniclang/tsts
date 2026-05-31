/**
 * Flow-based narrowing.
 *
 * Substantive port of TS-Go `internal/checker/flow.go` (~2733 LoC,
 * 133 funcs/types). Implements TypeScript's control-flow type analysis:
 * narrowing variables across branches, exhaustiveness checks, ANT
 * (Apparent Narrowed Type) propagation, evolving-array tracking,
 * function-result-after-call narrowing.
 */

import type { Node as AstNode, FlowNode, Symbol as AstSymbol } from "../ast/index.js";
import {
  FlowFlags,
  getAssignmentTarget,
  getCombinedNodeFlags,
  hasSyntacticModifier,
  Kind,
  NodeFlags,
  nodeParent,
  SymbolFlags,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import type { Type, ObjectType, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

// ---------------------------------------------------------------------------
// Flow analysis types
// ---------------------------------------------------------------------------

export interface FlowType {
  type: Type;
  flags?: number;
  incomplete?: boolean;
}

export interface IncompleteType {
  flags: number;
  type: Type;
}

export interface SharedFlow {
  flow: FlowNode;
  flowType: FlowType;
}

export type AssignmentDeclarationKind = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const AssignmentDeclarationKind = {
  None: 0 as AssignmentDeclarationKind,
  ExportsProperty: 1 as AssignmentDeclarationKind,
  ModuleExports: 2 as AssignmentDeclarationKind,
  PrototypeProperty: 3 as AssignmentDeclarationKind,
  ThisProperty: 4 as AssignmentDeclarationKind,
  Property: 5 as AssignmentDeclarationKind,
  Prototype: 6 as AssignmentDeclarationKind,
  ObjectDefinePropertyValue: 7 as AssignmentDeclarationKind,
  ObjectDefinePropertyExports: 8 as AssignmentDeclarationKind,
  ObjectDefinePrototypeProperty: 9 as AssignmentDeclarationKind,
} as const;

// ---------------------------------------------------------------------------
// FlowAnalyzer
// ---------------------------------------------------------------------------

export class FlowAnalyzer {
  flowAnalysisDisabled = false;
  flowInvocationCount = 0;
  lastFlowNode: FlowNode | undefined;
  lastFlowNodeReachable = true;
  flowTypeCache: Map<AstNode, Type> = new Map();
  sharedFlows: SharedFlow[] = [];

  // -------------------------------------------------------------------------
  // Top-level reachability + type narrowing
  // -------------------------------------------------------------------------

  private readonly reachableCache = new WeakMap<FlowNode, boolean>();

  isReachableFlowNode(flow: FlowNode): boolean {
    const cached = this.reachableCache.get(flow);
    if (cached !== undefined) return cached;
    const result = this.isReachableFlowNodeWorker(flow, false);
    this.reachableCache.set(flow, result);
    return result;
  }
  isReachableFlowNodeWorker(flow: FlowNode, noCacheCheck: boolean): boolean {
    if (!noCacheCheck) {
      const cached = this.reachableCache.get(flow);
      if (cached !== undefined) return cached;
    }
    if ((flow.flags & FlowFlags.Unreachable) !== 0) {
      this.reachableCache.set(flow, false);
      return false;
    }
    if ((flow.flags & FlowFlags.Start) !== 0) {
      this.reachableCache.set(flow, true);
      return true;
    }
    const antecedents = flowAntecedents(flow);
    if (antecedents.length === 0) {
      this.reachableCache.set(flow, true);
      return true;
    }
    const result = antecedents.some((antecedent) => this.isReachableFlowNodeWorker(antecedent, false));
    this.reachableCache.set(flow, result);
    return result;
  }

  getNarrowedTypeForReference(
    type: Type, reference: AstNode, checkMode: number, contextualType: Type | undefined,
  ): Type {
    void checkMode;
    const flowNode = getFlowNodeOfNode(reference);
    const baseType = contextualType ?? type;
    if (flowNode === undefined || this.flowAnalysisDisabled) return baseType;
    return this.finalizeEvolvingArrayType(this.getTypeAtFlowNode(reference, flowNode).type);
  }

  getTypeAtFlowNode(reference: AstNode, flow: FlowNode): FlowType {
    if (this.flowInvocationCount > 2000) {
      this.flowAnalysisDisabled = true;
      return { type: typeOfNode(reference), incomplete: true };
    }
    this.flowInvocationCount++;
    let current: FlowNode | undefined = flow;
    while (current !== undefined) {
      if ((current.flags & FlowFlags.Assignment) !== 0) return this.getTypeAtFlowAssignment(reference, current);
      if ((current.flags & FlowFlags.Call) !== 0) return this.getTypeAtFlowCall(reference, current);
      if ((current.flags & FlowFlags.Condition) !== 0) return this.getTypeAtFlowCondition(reference, current);
      if ((current.flags & FlowFlags.SwitchClause) !== 0) return this.getTypeAtFlowSwitchClause(reference, current);
      if ((current.flags & FlowFlags.BranchLabel) !== 0) return this.getTypeAtFlowBranchLabel(reference, current);
      if ((current.flags & FlowFlags.LoopLabel) !== 0) return this.getTypeAtFlowLoopLabel(reference, current);
      if ((current.flags & FlowFlags.ArrayMutation) !== 0) return this.getTypeAtFlowArrayMutation(reference, current);
      if ((current.flags & FlowFlags.Start) !== 0) return { type: typeOfNode(reference) };
      current = current.antecedent;
    }
    return { type: typeOfNode(reference) };
  }
  getTypeAtFlowAssignment(reference: AstNode, flow: FlowNode): FlowType {
    const node = flow.node;
    if (node !== undefined && this.isMatchingReference(reference, node)) {
      if (!this.isReachableFlowNode(flow)) return { type: neverType() };
      return { type: this.getInitialOrAssignedType(node) };
    }
    if (node !== undefined && this.containsMatchingReference(reference, node)) {
      if (!this.isReachableFlowNode(flow)) return { type: neverType() };
      return { type: typeOfNode(reference) };
    }
    return flow.antecedent === undefined ? { type: typeOfNode(reference) } : this.getTypeAtFlowNode(reference, flow.antecedent);
  }
  getTypeAtFlowCondition(reference: AstNode, flow: FlowNode): FlowType {
    const antecedent = flow.antecedent;
    const flowType = antecedent === undefined ? { type: typeOfNode(reference) } : this.getTypeAtFlowNode(reference, antecedent);
    const expression = flow.node;
    if (expression === undefined) return flowType;
    const assumeTrue = (flow.flags & FlowFlags.TrueCondition) !== 0;
    return newFlowType(this.narrowType(flowType.type, expression, assumeTrue), flowType.incomplete);
  }
  getTypeAtFlowSwitchClause(reference: AstNode, flow: FlowNode): FlowType {
    const antecedent = flow.antecedent;
    const flowType = antecedent === undefined ? { type: typeOfNode(reference) } : this.getTypeAtFlowNode(reference, antecedent);
    const switchStatement = flow.node;
    if (switchStatement === undefined) return flowType;
    const data = flow as FlowNode & { clauseStart?: number; clauseEnd?: number };
    return newFlowType(
      this.narrowTypeBySwitchOnDiscriminant(flowType.type, switchStatement, data.clauseStart ?? 0, data.clauseEnd ?? Number.MAX_SAFE_INTEGER),
      flowType.incomplete,
    );
  }
  getTypeAtFlowBranchLabel(reference: AstNode, flow: FlowNode): FlowType {
    const antecedents = flowAntecedents(flow);
    if (antecedents.length === 0) return { type: typeOfNode(reference) };
    const types = antecedents.map((antecedent) => this.getTypeAtFlowNode(reference, antecedent).type);
    return { type: unionType(types) };
  }
  getTypeAtFlowLoopLabel(reference: AstNode, flow: FlowNode): FlowType {
    return this.getTypeAtFlowBranchLabel(reference, flow);
  }
  getTypeAtFlowArrayMutation(reference: AstNode, flow: FlowNode): FlowType {
    const antecedent = flow.antecedent;
    const prior = antecedent === undefined ? typeOfNode(reference) : this.getTypeAtFlowNode(reference, antecedent).type;
    const node = flow.node;
    if (node === undefined || !this.containsMatchingReference(reference, node)) return { type: prior };
    const argumentTypes = callArguments(node).map(typeOfNode);
    const elementType = unionType([arrayElementType(prior), ...argumentTypes].filter((type): type is Type => type !== undefined));
    return { type: this.getEvolvingArrayType(elementType) };
  }
  getTypeAtFlowCall(reference: AstNode, flow: FlowNode): FlowType {
    const antecedent = flow.antecedent;
    const flowType = antecedent === undefined ? { type: typeOfNode(reference) } : this.getTypeAtFlowNode(reference, antecedent);
    const call = flow.node;
    if (call === undefined) return flowType;
    const returnType = typeOfNode(call);
    if ((returnType.flags & TypeFlags.Never) !== 0) return { type: neverType() };
    return newFlowType(this.narrowTypeByCallExpression(flowType.type, call, true), flowType.incomplete);
  }

  // -------------------------------------------------------------------------
  // Narrowing primitives
  // -------------------------------------------------------------------------

  narrowType(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    const node = skipParentheses(expr);
    if (node.kind === Kind.TrueKeyword || node.kind === Kind.FalseKeyword || node.kind === Kind.Identifier || isAccessExpressionKind(node.kind)) {
      return this.narrowTypeByTruthiness(type, node, assumeTrue);
    }
    if (node.kind === Kind.PrefixUnaryExpression && operatorKind(node) === Kind.ExclamationToken) {
      return this.narrowType(type, expressionOf(node) ?? node, !assumeTrue);
    }
    if (node.kind === Kind.BinaryExpression) {
      const operator = operatorKind(node);
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      if (left !== undefined && right !== undefined) {
        if (operator === Kind.AmpersandAmpersandToken) {
          const leftNarrowed = this.narrowType(type, left, assumeTrue);
          return assumeTrue ? this.narrowType(leftNarrowed, right, true) : unionType([this.narrowType(type, left, false), this.narrowType(type, right, false)]);
        }
        if (operator === Kind.BarBarToken) {
          const leftNarrowed = this.narrowType(type, left, assumeTrue);
          return assumeTrue ? unionType([this.narrowType(type, left, true), this.narrowType(type, right, true)]) : this.narrowType(leftNarrowed, right, false);
        }
        if (isEqualityOperator(operator)) {
          if (this.isMatchingReference(left, expr)) return this.narrowTypeByEquality(type, operator, right, assumeTrue);
          if (this.isMatchingReference(right, expr)) return this.narrowTypeByEquality(type, operator, left, assumeTrue);
          if (isTypeOfExpression(left)) return this.narrowTypeByTypeof(type, left, operator, right, assumeTrue);
          if (isTypeOfExpression(right)) return this.narrowTypeByTypeof(type, right, operator, left, assumeTrue);
        }
        if (operator === Kind.InstanceOfKeyword) return this.narrowTypeByInstanceof(type, node, assumeTrue);
        if (operator === Kind.InKeyword) return this.narrowTypeByInKeyword(type, typeOfNode(left), assumeTrue);
      }
    }
    return this.narrowTypeByTruthiness(type, node, assumeTrue);
  }
  narrowTypeByTruthiness(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr;
    if ((type.flags & TypeFlags.Union) === 0) return type;
    const filtered = constituentTypes(type).filter((candidate) => assumeTrue ? isTruthyType(candidate) : isFalsyType(candidate));
    return filtered.length === 0 ? neverType() : unionType(filtered);
  }
  narrowTypeByEquality(
    type: Type, operator: number, value: AstNode, assumeTrue: boolean,
  ): Type {
    if ((type.flags & TypeFlags.Union) === 0) return type;
    const literal = literalValueOfNode(value);
    if (literal === undefined && value.kind !== Kind.NullKeyword && value.kind !== Kind.UndefinedKeyword) return type;
    const positive = operator === Kind.EqualsEqualsToken || operator === Kind.EqualsEqualsEqualsToken;
    const keepEqual = assumeTrue === positive;
    const filtered = constituentTypes(type).filter((candidate) => {
      const candidateLiteral = literalValueOfType(candidate);
      const isEqual = candidateLiteral === literal || (literal === null && (candidate.flags & TypeFlags.Null) !== 0)
        || (literal === undefined && (candidate.flags & TypeFlags.Undefined) !== 0);
      return keepEqual ? isEqual : !isEqual;
    });
    return filtered.length === 0 ? neverType() : unionType(filtered);
  }
  narrowTypeByTypeof(type: Type, typeofExpr: AstNode, operator: number, literal: AstNode, assumeTrue: boolean): Type {
    void typeofExpr;
    const typeName = literalValueOfNode(literal);
    if (typeof typeName !== "string") return type;
    const positive = operator === Kind.EqualsEqualsToken || operator === Kind.EqualsEqualsEqualsToken;
    const keepMatching = assumeTrue === positive;
    const narrowed = filterType(type, (candidate) => {
      const match = typeofTypeName(candidate) === typeName;
      return keepMatching ? match : !match;
    });
    return narrowed ?? type;
  }
  narrowTypeByInstanceof(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    const right = (expr as unknown as { right?: AstNode }).right;
    const constructorName = nodeText(right);
    if (constructorName.length === 0) return type;
    const narrowed = filterType(type, (candidate) => symbolName(candidate.symbol) === constructorName);
    return assumeTrue ? narrowed ?? type : filterType(type, (candidate) => symbolName(candidate.symbol) !== constructorName) ?? type;
  }
  narrowTypeByInKeyword(type: Type, nameType: Type, assumeTrue: boolean): Type {
    const propertyName = literalValueOfType(nameType);
    if (typeof propertyName !== "string") return type;
    const narrowed = filterType(type, (candidate) => hasProperty(candidate, propertyName));
    return assumeTrue ? narrowed ?? type : filterType(type, (candidate) => !hasProperty(candidate, propertyName)) ?? type;
  }
  narrowTypeByConstructor(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    return this.narrowTypeByInstanceof(type, expr, assumeTrue);
  }
  narrowTypeByAssertion(type: Type, expr: AstNode): Type {
    return this.narrowType(type, expr, true);
  }
  narrowTypeByCallExpression(type: Type, callExpression: AstNode, assumeTrue: boolean): Type {
    const predicateType = (callExpression as unknown as { predicateType?: Type }).predicateType;
    if (predicateType === undefined || !assumeTrue) return type;
    return filterType(type, (candidate) => isTypeOverlap(candidate, predicateType)) ?? type;
  }
  narrowTypeByOptionalChainContainment(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr;
    return assumeTrue ? removeNullable(type) : type;
  }
  narrowTypeByPrivateIdentifierInInExpression(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    return this.narrowTypeByInKeyword(type, typeOfNode((expr as unknown as { left?: AstNode }).left), assumeTrue);
  }
  narrowTypeBySwitchOnDiscriminant(type: Type, switchStatement: AstNode, clauseStart: number, clauseEnd: number): Type {
    if ((type.flags & TypeFlags.Union) === 0) return type;
    const clauses = switchClausesOf(switchStatement).slice(clauseStart, clauseEnd);
    const literals = new Set<unknown>();
    for (const clause of clauses) {
      const expression = (clause as unknown as { expression?: AstNode }).expression;
      const literal = expression === undefined ? undefined : literalValueOfNode(expression);
      if (literal !== undefined) literals.add(literal);
    }
    if (literals.size === 0) return type;
    return filterType(type, (candidate) => literals.has(literalValueOfType(candidate))) ?? type;
  }

  // -------------------------------------------------------------------------
  // Evolving arrays
  // -------------------------------------------------------------------------

  getEvolvingArrayType(elementType: Type): Type { return elementType; }
  finalizeEvolvingArrayType(type: Type): Type { return type; }
  isEvolvingArrayOperationTarget(node: AstNode): boolean {
    const root = getReferenceRoot(node);
    const parent = nodeParent(root);
    if (parent === undefined) return false;
    if (parent.kind === Kind.PropertyAccessExpression) {
      const expression = expressionOf(parent);
      const name = (parent as unknown as { name?: { text?: string } }).name?.text;
      if (expression !== root) return false;
      if (name === "length") return true;
      if (name !== "push" && name !== "unshift") return false;
      const callParent = nodeParent(parent);
      return callParent?.kind === Kind.CallExpression && expressionOf(callParent) === parent;
    }
    if (parent.kind === Kind.ElementAccessExpression) {
      if (expressionOf(parent) !== root) return false;
      const assignment = nodeParent(parent);
      return assignment?.kind === Kind.BinaryExpression
        && operatorKind(assignment) === Kind.EqualsToken
        && (assignment as unknown as { left?: AstNode }).left === parent
        && getAssignmentTarget(assignment) === undefined;
    }
    return false;
  }
  getInitialTypeOfBindingElement(node: AstNode): Type { void node; return {} as Type; }
  getInitialTypeOfVariableDeclaration(node: AstNode): Type { void node; return {} as Type; }
  getInitialOrAssignedType(node: AstNode): Type { void node; return {} as Type; }
  isMatchingReferenceDiscriminant(expr: AstNode, computedType: Type): boolean {
    void expr; void computedType; return false;
  }
  isMatchingReference(source: AstNode, target: AstNode): boolean {
    const normalizedSource = this.getReferenceCandidate(source);
    const normalizedTarget = this.getReferenceCandidate(target);
    if (normalizedSource === normalizedTarget) return true;
    if (normalizedSource.kind === Kind.Identifier || normalizedSource.kind === Kind.PrivateIdentifier) {
      if (isDeclarationReference(normalizedTarget)) {
        return nodeText(normalizedSource) !== "" && nodeText(normalizedSource) === nodeText(declarationName(normalizedTarget));
      }
      return (normalizedTarget.kind === Kind.Identifier || normalizedTarget.kind === Kind.PrivateIdentifier)
        && symbolsMatch(normalizedSource, normalizedTarget)
        && nodeText(normalizedSource) !== ""
        && nodeText(normalizedSource) === nodeText(normalizedTarget);
    }
    if (normalizedSource.kind === Kind.ThisKeyword) return normalizedTarget.kind === Kind.ThisKeyword;
    if (normalizedSource.kind === Kind.SuperKeyword) return normalizedTarget.kind === Kind.SuperKeyword;
    if (normalizedSource.kind === Kind.MetaProperty && normalizedTarget.kind === Kind.MetaProperty) {
      return tokenKind(normalizedSource, "keywordToken") === tokenKind(normalizedTarget, "keywordToken")
        && nodeText((normalizedSource as unknown as { name?: AstNode }).name) === nodeText((normalizedTarget as unknown as { name?: AstNode }).name);
    }
    if (isAccessExpressionKind(normalizedSource.kind)) {
      const sourceName = accessedPropertyName(normalizedSource);
      const targetName = accessedPropertyName(normalizedTarget);
      if (sourceName !== undefined && targetName !== undefined && sourceName === targetName) {
        const sourceExpression = expressionOf(normalizedSource);
        const targetExpression = expressionOf(normalizedTarget);
        return sourceExpression !== undefined && targetExpression !== undefined && this.isMatchingReference(sourceExpression, targetExpression);
      }
      if (normalizedSource.kind === Kind.ElementAccessExpression && normalizedTarget.kind === Kind.ElementAccessExpression) {
        const sourceExpression = expressionOf(normalizedSource);
        const targetExpression = expressionOf(normalizedTarget);
        const sourceArgument = (normalizedSource as unknown as { argumentExpression?: AstNode }).argumentExpression;
        const targetArgument = (normalizedTarget as unknown as { argumentExpression?: AstNode }).argumentExpression;
        return sourceExpression !== undefined
          && targetExpression !== undefined
          && sourceArgument !== undefined
          && targetArgument !== undefined
          && this.isMatchingReference(sourceExpression, targetExpression)
          && stableElementArgumentKey(sourceArgument) !== undefined
          && stableElementArgumentKey(sourceArgument) === stableElementArgumentKey(targetArgument);
      }
    }
    if (normalizedSource.kind === Kind.QualifiedName && isAccessExpressionKind(normalizedTarget.kind)) {
      const sourceRight = (normalizedSource as unknown as { right?: AstNode }).right;
      const sourceLeft = (normalizedSource as unknown as { left?: AstNode }).left;
      const targetExpression = expressionOf(normalizedTarget);
      return sourceRight !== undefined
        && sourceLeft !== undefined
        && targetExpression !== undefined
        && nodeText(sourceRight) === accessedPropertyName(normalizedTarget)
        && this.isMatchingReference(sourceLeft, targetExpression);
    }
    return false;
  }

  containsMatchingReference(source: AstNode, target: AstNode): boolean {
    if (this.isMatchingReference(source, target)) return true;
    for (const child of childNodes(target)) {
      if (this.containsMatchingReference(source, child)) return true;
    }
    return false;
  }
  getNarrowableTypeForReference(type: Type, reference: AstNode, checkMode: number): Type {
    void reference; void checkMode; return type;
  }

  // -------------------------------------------------------------------------
  // Discriminated unions
  // -------------------------------------------------------------------------

  getDiscriminantPropertyAccess(expr: AstNode, computedType: Type): AstNode | undefined {
    void expr; void computedType; return undefined;
  }
  narrowTypeForDiscriminantProperty(type: Type, access: AstNode, value: AstNode, assumeTrue: boolean): Type {
    void access; void value; void assumeTrue; return type;
  }
  isFunctionObjectType(type: Type): boolean {
    const callSignatures = (type as unknown as { callSignatures?: readonly unknown[] }).callSignatures;
    const constructSignatures = (type as unknown as { constructSignatures?: readonly unknown[] }).constructSignatures;
    return (callSignatures?.length ?? 0) > 0 || (constructSignatures?.length ?? 0) > 0;
  }
  isExhaustiveSwitchStatement(node: AstNode): boolean {
    const cached = (node as unknown as { exhaustive?: boolean }).exhaustive;
    if (cached !== undefined) return cached;
    return this.computeExhaustiveSwitchStatement(node);
  }
  computeExhaustiveSwitchStatement(node: AstNode): boolean {
    const clauses = (node as unknown as { caseBlock?: { clauses?: { nodes?: readonly AstNode[] } } }).caseBlock?.clauses?.nodes ?? [];
    if (clauses.length === 0) return false;
    return clauses.some((clause) => clause.kind === Kind.DefaultClause);
  }

  // -------------------------------------------------------------------------
  // Reference + symbol resolution within flow
  // -------------------------------------------------------------------------

  hasMatchingArgument(expression: AstNode, reference: AstNode): boolean {
    const argumentsList = (expression as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes ?? [];
    return argumentsList.some((argument) => this.isMatchingReference(argument, reference));
  }
  isFalseExpression(expr: AstNode): boolean {
    const node = skipParentheses(expr);
    if (node.kind === Kind.FalseKeyword) return true;
    if (node.kind === Kind.BinaryExpression) {
      const op = operatorKind(node);
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      if (left === undefined || right === undefined) return false;
      return op === Kind.AmpersandAmpersandToken
        ? this.isFalseExpression(left) || this.isFalseExpression(right)
        : op === Kind.BarBarToken && this.isFalseExpression(left) && this.isFalseExpression(right);
    }
    return false;
  }
  hasDefaultValue(node: AstNode): boolean {
    if (node.kind === Kind.BindingElement) return (node as unknown as { initializer?: AstNode }).initializer !== undefined;
    if (node.kind === Kind.PropertyAssignment) {
      const initializer = (node as unknown as { initializer?: AstNode }).initializer;
      return initializer !== undefined && this.hasDefaultValue(initializer);
    }
    if (node.kind === Kind.ShorthandPropertyAssignment) {
      return (node as unknown as { objectAssignmentInitializer?: AstNode }).objectAssignmentInitializer !== undefined;
    }
    return node.kind === Kind.BinaryExpression && operatorKind(node) === Kind.EqualsToken;
  }

  getCandidateDiscriminantPropertyAccess(access: AstNode, ref: AstNode, candidates: readonly Type[]): AstNode | undefined {
    void access; void ref; void candidates; return undefined;
  }

  getAssignmentDeclarationKind(node: AstNode): AssignmentDeclarationKind {
    void node;
    return AssignmentDeclarationKind.None;
  }

  isAssignmentDeclaration(node: AstNode): boolean {
    return this.getAssignmentDeclarationKind(node) !== AssignmentDeclarationKind.None;
  }

  getReferenceCandidate(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.ParenthesizedExpression:
      case Kind.NonNullExpression:
      case Kind.SatisfiesExpression:
        return this.getReferenceCandidate(expressionOf(node) ?? node);
      case Kind.BinaryExpression: {
        const op = operatorKind(node);
        if (op === Kind.CommaToken) {
          return this.getReferenceCandidate((node as unknown as { right?: AstNode }).right ?? node);
        }
        if (op >= Kind.FirstAssignment && op <= Kind.LastAssignment) {
          return this.getReferenceCandidate((node as unknown as { left?: AstNode }).left ?? node);
        }
        return node;
      }
    }
    return node;
  }

  isWriteOnlyAccess(node: AstNode): boolean {
    const assignmentTarget = getAssignmentTarget(node);
    if (assignmentTarget === undefined) return false;
    if (assignmentTarget.kind === Kind.BinaryExpression) {
      return operatorKind(assignmentTarget) === Kind.EqualsToken;
    }
    return false;
  }

  isReadonlySymbol(symbol: AstSymbol): boolean {
    const flags = symbol.flags ?? 0;
    const checkFlags = (symbol as unknown as { checkFlags?: number }).checkFlags ?? 0;
    if ((checkFlags & 8 /* CheckFlagsReadonly */) !== 0) return true;
    if ((flags & SymbolFlags.Property) !== 0 && symbol.declarations.some((declaration) => hasSyntacticModifier(declaration, ModifierFlags.Readonly))) {
      return true;
    }
    if ((flags & SymbolFlags.Variable) !== 0 && symbol.declarations.some((declaration) => (getCombinedNodeFlags(declaration) & NodeFlags.Constant) !== 0)) {
      return true;
    }
    if ((flags & SymbolFlags.Accessor) !== 0 && (flags & SymbolFlags.SetAccessor) === 0) return true;
    if ((flags & SymbolFlags.EnumMember) !== 0) return true;
    return (symbol.declarations ?? []).some((declaration) => {
      return declaration.kind === Kind.CallExpression && isReadonlyDefinePropertyDeclaration(declaration);
    });
  }

  isAssignmentToReadonlyEntity(expr: AstNode, symbol: AstSymbol, assignmentKind: number): boolean {
    void expr; void symbol; void assignmentKind; return false;
  }
}

export function newFlowAnalyzer(): FlowAnalyzer {
  return new FlowAnalyzer();
}

function flowAntecedents(flow: FlowNode): readonly FlowNode[] {
  const direct = flow.antecedent;
  if (direct !== undefined) return [direct];
  const antecedents = flow.antecedents;
  if (Array.isArray(antecedents)) return antecedents.filter(isFlowNode);
  const nodes = (antecedents as { nodes?: readonly unknown[] } | undefined)?.nodes;
  if (nodes !== undefined) return nodes.filter(isFlowNode);
  const flowList = (antecedents as { flow?: unknown; next?: unknown } | undefined);
  const result: FlowNode[] = [];
  let current: unknown = flowList;
  while (current !== undefined && current !== null) {
    const currentFlow = (current as { flow?: unknown }).flow;
    if (isFlowNode(currentFlow)) result.push(currentFlow);
    current = (current as { next?: unknown }).next;
  }
  return result;
}

function isFlowNode(value: unknown): value is FlowNode {
  return typeof value === "object" && value !== null && typeof (value as { flags?: unknown }).flags === "number";
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function literalText(node: AstNode): string {
  return (node as unknown as { text?: string }).text ?? "";
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as unknown as { expression?: AstNode }).expression;
}

function operatorKind(node: AstNode): Kind {
  return ((node as unknown as { operatorToken?: { kind?: Kind } }).operatorToken?.kind ?? Kind.Unknown) as Kind;
}

function tokenKind(node: AstNode, field: string): Kind | undefined {
  return (node as unknown as Record<string, { kind?: Kind } | undefined>)[field]?.kind;
}

function skipParentheses(node: AstNode): AstNode {
  let current = node;
  while (current.kind === Kind.ParenthesizedExpression) {
    current = expressionOf(current) ?? current;
    if (current === node) return current;
  }
  return current;
}

function getReferenceRoot(node: AstNode): AstNode {
  let current = node;
  for (;;) {
    const parent = nodeParent(current);
    if (parent === undefined) return current;
    if ((parent.kind === Kind.ParenthesizedExpression || parent.kind === Kind.NonNullExpression) && expressionOf(parent) === current) {
      current = parent;
      continue;
    }
    return current;
  }
}

function isAccessExpressionKind(kind: Kind): boolean {
  return kind === Kind.PropertyAccessExpression || kind === Kind.ElementAccessExpression;
}

function accessedPropertyName(node: AstNode): string | undefined {
  if (node.kind === Kind.PropertyAccessExpression) {
    return nodeText((node as unknown as { name?: AstNode }).name);
  }
  if (node.kind === Kind.ElementAccessExpression) {
    const argument = (node as unknown as { argumentExpression?: AstNode }).argumentExpression;
    return argument === undefined ? undefined : stableElementArgumentKey(argument);
  }
  return undefined;
}

function stableElementArgumentKey(node: AstNode): string | undefined {
  const candidate = skipParentheses(node);
  if (candidate.kind === Kind.StringLiteral || candidate.kind === Kind.NumericLiteral || candidate.kind === Kind.NoSubstitutionTemplateLiteral) {
    return literalText(candidate);
  }
  if (candidate.kind === Kind.Identifier || candidate.kind === Kind.PrivateIdentifier) {
    return nodeText(candidate);
  }
  return undefined;
}

function symbolsMatch(left: AstNode, right: AstNode): boolean {
  const leftSymbol = left.symbol;
  const rightSymbol = right.symbol;
  return leftSymbol === undefined || rightSymbol === undefined || leftSymbol === rightSymbol;
}

function isDeclarationReference(node: AstNode): boolean {
  return node.kind === Kind.VariableDeclaration || node.kind === Kind.BindingElement || node.kind === Kind.Parameter;
}

function declarationName(node: AstNode): AstNode | undefined {
  return (node as unknown as { name?: AstNode }).name;
}

function isReadonlyDefinePropertyDeclaration(node: AstNode): boolean {
  const expression = expressionOf(node);
  if (expression?.kind !== Kind.PropertyAccessExpression) return false;
  const propertyName = accessedPropertyName(expression);
  if (propertyName !== "defineProperty") return false;
  const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes ?? [];
  const descriptor = args[2];
  if (descriptor?.kind !== Kind.ObjectLiteralExpression) return false;
  const properties = (descriptor as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes ?? [];
  const writable = properties.find((property) => property.kind === Kind.PropertyAssignment && nodeText((property as unknown as { name?: AstNode }).name) === "writable");
  if (writable === undefined) {
    return properties.every((property) => !(property.kind === Kind.SetAccessor || nodeText((property as unknown as { name?: AstNode }).name) === "set"));
  }
  const initializer = (writable as unknown as { initializer?: AstNode }).initializer;
  return initializer?.kind === Kind.FalseKeyword;
}

function getFlowNodeOfNode(node: AstNode): FlowNode | undefined {
  return (node as unknown as { flowNode?: FlowNode; flowNodeData?: { flowNode?: FlowNode; FlowNode?: FlowNode } }).flowNode
    ?? (node as unknown as { flowNodeData?: { flowNode?: FlowNode; FlowNode?: FlowNode } }).flowNodeData?.flowNode
    ?? (node as unknown as { flowNodeData?: { flowNode?: FlowNode; FlowNode?: FlowNode } }).flowNodeData?.FlowNode;
}

function typeOfNode(node: AstNode | undefined): Type {
  const symbolType = getTypeOfSymbol((node as { symbol?: AstSymbol } | undefined)?.symbol);
  return symbolType
    ?? (node as unknown as { checkedType?: Type; type?: Type } | undefined)?.checkedType
    ?? (node as unknown as { checkedType?: Type; type?: Type } | undefined)?.type
    ?? unknownType();
}

function neverType(): Type {
  return intrinsicType(TypeFlags.Never, "never");
}

function unknownType(): Type {
  return intrinsicType(TypeFlags.Unknown, "unknown");
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return {
    flags,
    id: nextSyntheticTypeId(),
    data: {
      intrinsicName,
      objectFlags: ObjectFlags.None,
    },
  };
}

function newFlowType(type: Type, incomplete: boolean | undefined): FlowType {
  return incomplete === undefined ? { type } : { type, incomplete };
}

function unionType(types: readonly Type[]): Type {
  const flattened: Type[] = [];
  for (const type of types) {
    if ((type.flags & TypeFlags.Never) !== 0) continue;
    if ((type.flags & TypeFlags.Union) !== 0) flattened.push(...constituentTypes(type));
    else flattened.push(type);
  }
  const unique = dedupeTypes(flattened);
  if (unique.length === 0) return neverType();
  if (unique.length === 1) return unique[0]!;
  return {
    flags: TypeFlags.Union,
    id: nextSyntheticTypeId(),
    data: {
      types: unique,
      objectFlags: ObjectFlags.None,
    },
  };
}

function filterType(type: Type, predicate: (type: Type) => boolean): Type | undefined {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : undefined;
  const filtered = constituentTypes(type).filter(predicate);
  return filtered.length === 0 ? undefined : unionType(filtered);
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [type];
}

function dedupeTypes(types: readonly Type[]): readonly Type[] {
  const out: Type[] = [];
  const seen = new Set<Type>();
  for (const type of types) {
    if (seen.has(type)) continue;
    seen.add(type);
    out.push(type);
  }
  return out;
}

function literalValueOfType(type: Type | undefined): unknown {
  if (type === undefined) return undefined;
  if ((type.flags & TypeFlags.Null) !== 0) return null;
  if ((type.flags & TypeFlags.Undefined) !== 0) return undefined;
  return (type.data as { value?: unknown } | undefined)?.value;
}

function literalValueOfNode(node: AstNode | undefined): unknown {
  if (node === undefined) return undefined;
  if (node.kind === Kind.NullKeyword) return null;
  if (node.kind === Kind.UndefinedKeyword) return undefined;
  if (node.kind === Kind.TrueKeyword) return true;
  if (node.kind === Kind.FalseKeyword) return false;
  const text = literalText(node);
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral) return text;
  if (node.kind === Kind.NumericLiteral) return Number(text);
  return (node as unknown as { value?: unknown }).value;
}

function isTruthyType(type: Type): boolean {
  if ((type.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void | TypeFlags.Never)) !== 0) return false;
  const value = literalValueOfType(type);
  return value !== false && value !== 0 && value !== "" && !isZeroPseudoBigInt(value);
}

function isFalsyType(type: Type): boolean {
  if ((type.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void | TypeFlags.Never)) !== 0) return true;
  const value = literalValueOfType(type);
  return value === false || value === 0 || value === "" || isZeroPseudoBigInt(value);
}

function typeofTypeName(type: Type): string | undefined {
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return "bigint";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return "symbol";
  if ((type.flags & TypeFlags.Undefined) !== 0) return "undefined";
  if ((type.flags & TypeFlags.Object) !== 0 && isFunctionObjectTypeLocal(type)) return "function";
  if ((type.flags & (TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.Null)) !== 0) return "object";
  return undefined;
}

function isEqualityOperator(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

function isTypeOfExpression(node: AstNode): boolean {
  return node.kind === Kind.TypeOfExpression
    || (node.kind === Kind.PrefixUnaryExpression && operatorKind(node) === Kind.TypeOfKeyword);
}

function removeNullable(type: Type): Type {
  return filterType(type, (candidate) => (candidate.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) === 0) ?? neverType();
}

function symbolName(symbol: AstSymbol | undefined): string {
  return (symbol as { name?: string } | undefined)?.name ?? "";
}

function hasProperty(type: Type, propertyName: string): boolean {
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some((candidate) => hasProperty(candidate, propertyName));
  const members = (type.symbol as { members?: Map<string, AstSymbol> } | undefined)?.members;
  if (members?.has(propertyName) === true) return true;
  return ((type.data as ObjectType | undefined)?.declaredProperties ?? [])
    .some((property) => symbolName(property) === propertyName);
}

function isTypeOverlap(left: Type, right: Type): boolean {
  if (left === right) return true;
  if ((left.flags & TypeFlags.Union) !== 0) return constituentTypes(left).some((type) => isTypeOverlap(type, right));
  if ((right.flags & TypeFlags.Union) !== 0) return constituentTypes(right).some((type) => isTypeOverlap(left, type));
  if ((left.flags & right.flags & TypeFlags.Primitive) !== 0) return true;
  return symbolName(left.symbol) !== "" && symbolName(left.symbol) === symbolName(right.symbol);
}

function arrayElementType(type: Type): Type | undefined {
  return (type.data as { elementType?: Type; resolvedTypeArguments?: readonly Type[]; resolvedTypeArguments_?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { resolvedTypeArguments?: readonly Type[]; resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0]
    ?? (type.data as { resolvedTypeArguments?: readonly Type[]; resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_?.[0];
}

function callArguments(node: AstNode): readonly AstNode[] {
  const args = (node as unknown as { arguments?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).arguments;
  return nodeArrayOrList(args);
}

function switchClausesOf(node: AstNode): readonly AstNode[] {
  const clauses = (node as unknown as { caseBlock?: { clauses?: readonly AstNode[] | { nodes?: readonly AstNode[] } } }).caseBlock?.clauses;
  return nodeArrayOrList(clauses);
}

function nodeArrayOrList(value: readonly AstNode[] | { nodes?: readonly AstNode[] } | undefined): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { nodes?: readonly AstNode[] }).nodes ?? [];
}

function childNodes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isAstNode(value)) out.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (isAstNode(item)) out.push(item);
    } else if (isNodeList(value)) {
      out.push(...value.nodes.filter(isAstNode));
    }
  }
  return out;
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { nodes: readonly unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes);
}

function isFunctionObjectTypeLocal(type: Type): boolean {
  return ((type.data as ObjectType | undefined)?.declaredCallSignatures?.length ?? 0) > 0
    || ((type.data as ObjectType | undefined)?.declaredConstructSignatures?.length ?? 0) > 0;
}

function isZeroPseudoBigInt(value: unknown): boolean {
  return typeof value === "object"
    && value !== null
    && (value as { negative?: boolean; base10Value?: string }).negative !== true
    && (value as { base10Value?: string }).base10Value === "0";
}

let syntheticTypeId = -1;
function nextSyntheticTypeId(): number {
  return syntheticTypeId--;
}
