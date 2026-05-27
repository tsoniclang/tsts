/**
 * Contextual-type resolution.
 *
 * Ported from Strada `checker.go` — getContextualType family.
 * Walks up from a node to its parent and decides which contextual
 * type applies based on the syntactic position.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type, Signature } from "../types.js";
import type { CheckerOps } from "./index.js";

export function getContextualType(c: CheckerOps, node: AstNode): Type | undefined {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return undefined;
  const k = (parent as { kind?: number }).kind;
  switch (k) {
    case Kind.VariableDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.Parameter:
    case Kind.PropertyAssignment:
    case Kind.BindingElement:
      return getContextualTypeForVariableLikeDeclaration(c, parent);
    case Kind.ReturnStatement:
      return getContextualTypeForReturnExpression(c, node);
    case Kind.CallExpression:
    case Kind.NewExpression:
      return getContextualTypeForArgument(c, parent, node);
    case Kind.ConditionalExpression:
      return getContextualType(c, parent);
    case Kind.AwaitExpression:
      return getContextualType(c, parent);
    case Kind.BinaryExpression:
      return getContextualTypeForBinaryOperand(c, node);
    case Kind.ArrayLiteralExpression: {
      const elements = (parent as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
      if (elements === undefined) return undefined;
      const idx = elements.indexOf(node);
      void idx;
      return undefined;
    }
    default:
      return undefined;
  }
}

export function getContextualTypeForArgument(c: CheckerOps, callTarget: AstNode, arg: AstNode): Type | undefined {
  const args = (callTarget as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
  if (args === undefined) return undefined;
  const idx = args.indexOf(arg);
  return idx >= 0 ? getContextualTypeForArgumentAtIndex(c, callTarget, idx) : undefined;
}

export function getContextualTypeForArgumentAtIndex(c: CheckerOps, callTarget: AstNode, argIndex: number): Type | undefined {
  const calleeExpr = (callTarget as unknown as { expression?: AstNode }).expression;
  if (calleeExpr === undefined) return undefined;
  const calleeSym = c.getSymbolAtLocation(calleeExpr);
  if (calleeSym === undefined) return undefined;
  const signatures = c.getSignaturesOfSymbol(calleeSym);
  if (signatures.length === 0) return undefined;
  const params = (signatures[0] as unknown as { parameters?: readonly AstSymbol[] }).parameters;
  if (params === undefined || argIndex >= params.length) return undefined;
  return c.getTypeOfSymbol(params[argIndex]!);
}

export function getContextualTypeForVariableLikeDeclaration(c: CheckerOps, node: AstNode): Type | undefined {
  const typeNode = (node as unknown as { type?: AstNode }).type;
  return typeNode !== undefined ? c.getTypeFromTypeNode(typeNode) : undefined;
}

export function getContextualTypeForBinaryOperand(c: CheckerOps, node: AstNode): Type | undefined {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return undefined;
  const op = (parent as unknown as { operatorToken?: { kind?: number } }).operatorToken;
  if (op?.kind === 63 /* EqualsToken */) {
    const left = (parent as unknown as { left?: AstNode; right?: AstNode }).left;
    const right = (parent as unknown as { right?: AstNode }).right;
    if (right === node && left !== undefined) {
      const sym = c.getSymbolAtLocation(left);
      if (sym === undefined) return undefined;
      return c.getTypeOfSymbol(sym);
    }
  }
  return undefined;
}

export function getContextualTypeForReturnExpression(c: CheckerOps, node: AstNode): Type | undefined {
  let n: AstNode | undefined = node;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (k === Kind.FunctionDeclaration || k === Kind.MethodDeclaration ||
        k === Kind.FunctionExpression || k === Kind.ArrowFunction ||
        k === Kind.GetAccessor || k === Kind.SetAccessor) {
      const t = (n as unknown as { type?: AstNode }).type;
      return t !== undefined ? c.getTypeFromTypeNode(t) : undefined;
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

export function getContextualTypeForDecorator(_c: CheckerOps, _node: AstNode): Signature | undefined {
  return undefined;
}
