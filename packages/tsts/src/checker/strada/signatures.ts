/**
 * Signature queries.
 *
 * Ported from Strada `checker.go` — getSignaturesOfType,
 * getSignatureFromDeclaration, getReturnTypeOfSignature.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type, Signature, SignatureKind } from "../types.js";
import type { CheckerOps } from "./index.js";

export function getSignaturesOfType(t: Type, kind: SignatureKind): readonly Signature[] {
  return getSignaturesOfStructuredType(t, kind);
}

export function getSignaturesOfStructuredType(t: Type, kind: SignatureKind): readonly Signature[] {
  if (kind === 0) {
    return (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures ?? [];
  }
  return (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures ?? [];
}

export function getSignaturesOfSymbol(c: CheckerOps, symbol: AstSymbol): readonly Signature[] {
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  const out: Signature[] = [];
  for (const d of decls) {
    const k = (d as { kind?: number }).kind;
    if (k === Kind.FunctionDeclaration || k === Kind.MethodDeclaration ||
        k === Kind.FunctionExpression || k === Kind.ArrowFunction ||
        k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor ||
        k === Kind.MethodSignature || k === Kind.CallSignature || k === Kind.ConstructSignature) {
      out.push(getSignatureFromDeclaration(c, d));
    }
  }
  return out;
}

export function getSignatureFromDeclaration(c: CheckerOps, declaration: AstNode): Signature {
  const params = (declaration as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes ?? [];
  const returnTypeNode = (declaration as unknown as { type?: AstNode }).type;
  const typeParameters = (declaration as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters?.nodes;
  return {
    declaration,
    parameters: params
      .map((p) => (p as unknown as { symbol?: AstSymbol }).symbol)
      .filter((s): s is AstSymbol => s !== undefined),
    typeParameters,
    resolvedReturnType: returnTypeNode !== undefined ? c.getTypeFromTypeNode(returnTypeNode) : undefined,
  } as unknown as Signature;
}

export function getReturnTypeOfSignature(signature: Signature): Type {
  const resolved = (signature as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
  return resolved ?? ({ flags: 1 << 0 } as unknown as Type);
}

export function getSignatureInstantiation(signature: Signature, typeArguments: readonly Type[] | undefined): Signature {
  if (typeArguments === undefined) return signature;
  return { ...(signature as object), typeArguments } as unknown as Signature;
}
