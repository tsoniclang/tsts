/**
 * Contextual type resolution dispatcher.
 *
 * Ported from Strada `checker.go` — getContextualType (the top-level
 * dispatcher across all contextual positions).
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns the contextual type at a given location. Dispatches by
 * parent Kind to the appropriate contextual-type provider.
 */
export function getContextualTypeForNode(node: AstNode): Type | undefined {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return undefined;

  switch (parent.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.BindingElement: {
      const annotation = (parent as unknown as { type?: { resolvedType?: Type } }).type;
      return annotation?.resolvedType;
    }

    case Kind.ReturnStatement:
      return getContextualReturnType(parent);

    case Kind.ConditionalExpression:
      return getContextualConditionalType(parent, node);

    case Kind.BinaryExpression:
      return getContextualBinaryType(parent, node);

    case Kind.CallExpression:
    case Kind.NewExpression:
      return undefined; // handled per-argument via call-resolution

    case Kind.ArrayLiteralExpression:
      return undefined; // handled via array-literal contextual

    case Kind.ObjectLiteralExpression:
      return undefined; // handled via object-literal contextual

    case Kind.AsExpression:
    case Kind.TypeAssertionExpression:
    case Kind.SatisfiesExpression: {
      const type = (parent as unknown as { type?: { resolvedType?: Type } }).type;
      return type?.resolvedType;
    }

    default:
      return undefined;
  }
}

/**
 * Returns the contextual type for a return statement — the
 * enclosing function's annotated return type.
 */
function getContextualReturnType(returnStmt: AstNode): Type | undefined {
  const walker = (current: AstNode | undefined): Type | undefined => {
    if (current === undefined) return undefined;
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration: {
        const t = (current as unknown as { type?: { resolvedType?: Type } }).type;
        return t?.resolvedType;
      }
      case Kind.ClassDeclaration:
      case Kind.SourceFile:
        return undefined;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((returnStmt as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns the contextual type for a branch of a conditional
 * expression.
 */
function getContextualConditionalType(_parent: AstNode, _branch: AstNode): Type | undefined {
  return undefined;
}

/**
 * Returns the contextual type for a binary expression operand.
 */
function getContextualBinaryType(_parent: AstNode, _operand: AstNode): Type | undefined {
  return undefined;
}
