/**
 * Flow-based type narrowing.
 *
 * Ported from Strada `checker/flow.go` — narrowing along the CFG that
 * the binder builds. Without binder flow output we surface the
 * narrowing API surface with conservative bodies that return the
 * un-narrowed type.
 *
 * Full body porting requires the binder to attach flow nodes to
 * Identifier references (the binder-strada bind* methods build the
 * flow graph).
 */

import type { Node as AstNode, FlowNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

export interface FlowType {
  type: Type;
  flags?: number;
  incomplete?: boolean;
}

export function isReachableFlowNode(_flow: FlowNode): boolean {
  return true;
}

export function getNarrowedTypeForReference(c: CheckerOps, t: Type, reference: AstNode): Type {
  // Walk the reference's flow node antecedents narrowing `t` by each
  // condition. Conservative: return t unchanged.
  void c; void reference;
  return t;
}

export function getTypeAtFlowNode(_c: CheckerOps, _reference: AstNode, _flow: FlowNode): FlowType {
  // Resolve the type at the given flow position. Without flow nodes
  // attached we return an Any flow type.
  return { type: { flags: 1 << 0 } as unknown as Type };
}

export function isPostSuperFlowNode(_flow: FlowNode): boolean {
  return false;
}

/**
 * Returns true when the conditional expression's true branch
 * structurally narrows `reference`. Used to detect `if (x)` narrowing.
 */
export function isMatchingReference(source: AstNode, target: AstNode): boolean {
  return source === target;
}

/**
 * Walks the conditional expressions in a flow node antecedent to
 * determine whether `reference` is reachable.
 */
export function isReachableFlowNodeWorker(_flow: FlowNode, _noCacheCheck: boolean): boolean {
  return true;
}

/**
 * Returns true when the type can be narrowed by the given condition.
 * The full implementation evaluates the condition's structure against
 * the reference; here we conservatively return false so no narrowing
 * is applied.
 */
export function canNarrowByEquality(_source: Type, _target: Type): boolean {
  return false;
}
