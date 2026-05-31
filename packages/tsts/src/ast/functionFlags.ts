import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Kind } from "./generated/kind.js";
import type { Node } from "./generated/types.js";
import { getAsteriskToken, getBody } from "./accessors.js";
import { hasSyntacticModifier } from "./utilities.js";

export type FunctionFlags = number;

export const FunctionFlags = {
  Normal: 0,
  Generator: 1 << 0,
  Async: 1 << 1,
  Invalid: 1 << 2,
  AsyncGenerator: (1 << 1) | (1 << 0),
} as const;

export function getFunctionFlags(node: Node | undefined): FunctionFlags {
  if (node === undefined) return FunctionFlags.Invalid;

  let flags: FunctionFlags = FunctionFlags.Normal;
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.MethodDeclaration:
      if (getAsteriskToken(node) !== undefined) flags |= FunctionFlags.Generator;
      if (hasSyntacticModifier(node, ModifierFlags.Async)) flags |= FunctionFlags.Async;
      break;
    case Kind.ArrowFunction:
      if (hasSyntacticModifier(node, ModifierFlags.Async)) flags |= FunctionFlags.Async;
      break;
    default:
      return FunctionFlags.Invalid;
  }

  if (getBody(node) === undefined) flags |= FunctionFlags.Invalid;
  return flags;
}
