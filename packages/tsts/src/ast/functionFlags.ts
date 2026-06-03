import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Kind } from "./generated/kind.js";
import type { Node } from "./generated/types.js";
import { getAsteriskToken, getBody } from "./accessors.js";
import { hasSyntacticModifier } from "./utilities.js";

export type FunctionFlags = number;

export const FunctionFlags = {
  Normal: 0 as FunctionFlags,
  Generator: 1 << 0 as FunctionFlags,
  Async: 1 << 1 as FunctionFlags,
  Invalid: 1 << 2 as FunctionFlags,
  AsyncGenerator: 1 << 1 | 1 << 0 as FunctionFlags,
} as const;

// GetFunctionFlags (functionflags.go:13).
export function getFunctionFlags(node: Node | undefined): FunctionFlags {
  if (node === undefined) {
    return FunctionFlags.Invalid;
  }
  if (!isFunctionLikeWithBody(node)) {
    return FunctionFlags.Invalid;
  }
  let flags: FunctionFlags = FunctionFlags.Normal;
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.MethodDeclaration:
      if (getAsteriskToken(node) !== undefined) {
        flags |= FunctionFlags.Generator;
      }
    // fallthrough
    case Kind.ArrowFunction:
      if (hasSyntacticModifier(node, ModifierFlags.Async)) {
        flags |= FunctionFlags.Async;
      }
  }
  if (getBody(node) === undefined) {
    flags |= FunctionFlags.Invalid;
  }
  return flags;
}

// Mirrors TS-Go `node.BodyData() == nil`: a function-like node that carries a
// body slot (the body-bearing kinds). Non-body-bearing nodes return Invalid.
function isFunctionLikeWithBody(node: Node): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.MethodDeclaration:
    case Kind.ArrowFunction:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return true;
    default:
      return false;
  }
}
