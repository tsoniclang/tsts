/**
 * Function-like declaration typing.
 *
 * Ported from Strada `checker.go` — getTypeOfFunctionDeclaration,
 * getSignatureFromFunctionLike, isAnonymousFunction.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a function-like declaration.
 */
export function isFunctionLike(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.ConstructSignature:
    case Kind.IndexSignature:
    case Kind.FunctionType:
    case Kind.ConstructorType:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the node is an anonymous function (no name).
 */
export function isAnonymousFunction(node: AstNode): boolean {
  if (!isFunctionLike(node)) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  return name === undefined;
}

/**
 * Returns the parameter list of a function-like.
 */
export function getFunctionParameters(node: AstNode): readonly AstNode[] {
  if (!isFunctionLike(node)) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params?.nodes ?? [];
}

/**
 * Returns the return-type annotation of a function-like, or undefined.
 */
export function getReturnTypeAnnotation(node: AstNode): AstNode | undefined {
  if (!isFunctionLike(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the body of a function-like — block or expression.
 */
export function getFunctionBody(node: AstNode): AstNode | undefined {
  if (!isFunctionLike(node)) return undefined;
  return (node as unknown as { body?: AstNode }).body;
}

/**
 * Returns true when the body is a block (vs. a single-expression
 * arrow).
 */
export function hasBlockBody(node: AstNode): boolean {
  const body = getFunctionBody(node);
  return body !== undefined && body.kind === Kind.Block;
}

/**
 * Returns true when the function has no body (signature-only —
 * declarations, abstract methods, ambient).
 */
export function isSignatureOnly(node: AstNode): boolean {
  return isFunctionLike(node) && getFunctionBody(node) === undefined;
}

/**
 * Returns a placeholder function-type Type — for cases where the
 * function shape is needed but the body hasn't been visited.
 */
export function createFunctionPlaceholderType(sig: Signature): Type {
  return {
    flags: TypeFlags.Object,
    callSignatures: [sig],
    symbol: { name: "__function" },
  } as unknown as Type;
}

/**
 * Returns the type parameters of a function-like.
 */
export function getFunctionTypeParameters(node: AstNode): readonly AstNode[] {
  if (!isFunctionLike(node)) return [];
  const tp = (node as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes ?? [];
}
