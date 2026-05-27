/**
 * Spread-argument handling in calls.
 *
 * Ported from Strada `checker.go` — checkSpreadArgument,
 * getEffectiveCallArguments, expandSpreadArguments.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the argument node is a spread element.
 */
export function isSpreadArgument(node: AstNode): boolean {
  return node.kind === Kind.SpreadElement;
}

/**
 * Returns the inner expression of a spread argument.
 */
export function getSpreadOperand(node: AstNode): AstNode | undefined {
  if (!isSpreadArgument(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the element type when the spread operand is an array.
 */
export function getSpreadElementType(operandType: Type): Type {
  const elementType = (operandType as unknown as { elementType?: Type }).elementType;
  return elementType ?? ANY;
}

/**
 * Returns true when the argument list contains a spread argument.
 */
export function argumentsContainSpread(args: readonly AstNode[]): boolean {
  return args.some(isSpreadArgument);
}

/**
 * Returns the index of the first spread argument, or -1.
 */
export function indexOfFirstSpread(args: readonly AstNode[]): number {
  return args.findIndex(isSpreadArgument);
}

/**
 * Returns true when all arguments are spreads — pure spread-only call
 * (e.g. `fn(...all)`).
 */
export function isAllSpreadCall(args: readonly AstNode[]): boolean {
  if (args.length === 0) return false;
  return args.every(isSpreadArgument);
}

/**
 * Returns the count of "fixed" (non-spread) arguments before the
 * first spread.
 */
export function countLeadingFixedArgs(args: readonly AstNode[]): number {
  const idx = indexOfFirstSpread(args);
  return idx === -1 ? args.length : idx;
}

/**
 * Returns the count of "fixed" (non-spread) arguments after the last
 * spread.
 */
export function countTrailingFixedArgs(args: readonly AstNode[]): number {
  const lastSpread = (() => {
    for (let i = args.length - 1; i >= 0; i--) {
      if (isSpreadArgument(args[i]!)) return i;
    }
    return -1;
  })();
  return lastSpread === -1 ? 0 : args.length - lastSpread - 1;
}
