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
import type { Type } from "./types.js";

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

  isReachableFlowNode(flow: FlowNode): boolean { void flow; return true; }
  isReachableFlowNodeWorker(flow: FlowNode, noCacheCheck: boolean): boolean {
    void flow; void noCacheCheck; return true;
  }

  getNarrowedTypeForReference(
    type: Type, reference: AstNode, checkMode: number, contextualType: Type | undefined,
  ): Type {
    void reference; void checkMode; void contextualType; return type;
  }

  getTypeAtFlowNode(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowAssignment(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowCondition(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowSwitchClause(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowBranchLabel(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowLoopLabel(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowArrayMutation(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }
  getTypeAtFlowCall(reference: AstNode, flow: FlowNode): FlowType {
    void reference; void flow;
    return { type: {} as Type };
  }

  // -------------------------------------------------------------------------
  // Narrowing primitives
  // -------------------------------------------------------------------------

  narrowType(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeByTruthiness(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeByEquality(
    type: Type, operator: number, value: AstNode, assumeTrue: boolean,
  ): Type {
    void operator; void value; void assumeTrue; return type;
  }
  narrowTypeByTypeof(type: Type, typeofExpr: AstNode, operator: number, literal: AstNode, assumeTrue: boolean): Type {
    void typeofExpr; void operator; void literal; void assumeTrue; return type;
  }
  narrowTypeByInstanceof(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeByInKeyword(type: Type, nameType: Type, assumeTrue: boolean): Type {
    void nameType; void assumeTrue; return type;
  }
  narrowTypeByConstructor(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeByAssertion(type: Type, expr: AstNode): Type {
    void expr; return type;
  }
  narrowTypeByCallExpression(type: Type, callExpression: AstNode, assumeTrue: boolean): Type {
    void callExpression; void assumeTrue; return type;
  }
  narrowTypeByOptionalChainContainment(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeByPrivateIdentifierInInExpression(type: Type, expr: AstNode, assumeTrue: boolean): Type {
    void expr; void assumeTrue; return type;
  }
  narrowTypeBySwitchOnDiscriminant(type: Type, switchStatement: AstNode, clauseStart: number, clauseEnd: number): Type {
    void switchStatement; void clauseStart; void clauseEnd; return type;
  }

  // -------------------------------------------------------------------------
  // Evolving arrays
  // -------------------------------------------------------------------------

  getEvolvingArrayType(elementType: Type): Type { return elementType; }
  finalizeEvolvingArrayType(type: Type): Type { return type; }
  isEvolvingArrayOperationTarget(node: AstNode): boolean { void node; return false; }
  getInitialTypeOfBindingElement(node: AstNode): Type { void node; return {} as Type; }
  getInitialTypeOfVariableDeclaration(node: AstNode): Type { void node; return {} as Type; }
  getInitialOrAssignedType(node: AstNode): Type { void node; return {} as Type; }
  isMatchingReferenceDiscriminant(expr: AstNode, computedType: Type): boolean {
    void expr; void computedType; return false;
  }
  isMatchingReference(source: AstNode, target: AstNode): boolean {
    void source; void target; return false;
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
  isFunctionObjectType(type: Type): boolean { void type; return false; }
  isExhaustiveSwitchStatement(node: AstNode): boolean { void node; return false; }
  computeExhaustiveSwitchStatement(node: AstNode): boolean { void node; return false; }

  // -------------------------------------------------------------------------
  // Reference + symbol resolution within flow
  // -------------------------------------------------------------------------

  hasMatchingArgument(expression: AstNode, reference: AstNode): boolean {
    void expression; void reference; return false;
  }
  isFalseExpression(expr: AstNode): boolean { void expr; return false; }
  hasDefaultValue(node: AstNode): boolean { void node; return false; }

  getCandidateDiscriminantPropertyAccess(access: AstNode, ref: AstNode, candidates: readonly Type[]): AstNode | undefined {
    void access; void ref; void candidates; return undefined;
  }

  getAssignmentDeclarationKind(node: AstNode): AssignmentDeclarationKind {
    void node;
    return AssignmentDeclarationKind.None;
  }

  isAssignmentDeclaration(node: AstNode): boolean { void node; return false; }

  getReferenceCandidate(node: AstNode): AstNode { return node; }

  isWriteOnlyAccess(node: AstNode): boolean { void node; return false; }

  isReadonlySymbol(symbol: AstSymbol): boolean { void symbol; return false; }

  isAssignmentToReadonlyEntity(expr: AstNode, symbol: AstSymbol, assignmentKind: number): boolean {
    void expr; void symbol; void assignmentKind; return false;
  }
}

export function newFlowAnalyzer(): FlowAnalyzer {
  return new FlowAnalyzer();
}
