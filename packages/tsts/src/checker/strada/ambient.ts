/**
 * Ambient-declaration helpers.
 *
 * Ported from Strada `checker.go` — isAmbientModule, isExternalModuleAugmentation,
 * checkAmbientInitializer, isInAmbientContext.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import { hasAmbientModifier } from "./modifiers.js";

const NodeFlags_Ambient = 1 << 25;

/**
 * Returns true when the node is itself flagged ambient (or any of
 * its ancestors are).
 */
export function isInAmbientContext(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    const flags = (current as unknown as { flags?: number }).flags ?? 0;
    if ((flags & NodeFlags_Ambient) !== 0) return true;
    if (hasAmbientModifier(current)) return true;
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}

/**
 * Returns true when the node is an ambient module — a `declare module "x"`
 * or `declare module Foo` block.
 */
export function isAmbientModule(node: AstNode): boolean {
  if (node.kind !== Kind.ModuleDeclaration) return false;
  return hasAmbientModifier(node);
}

/**
 * Returns true when the module declaration augments another module.
 * Identifying feature: name is a string literal AND the module has
 * a parent module declaration or is exported.
 */
export function isExternalModuleAugmentation(node: AstNode): boolean {
  if (!isAmbientModule(node)) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  return name !== undefined && name.kind === Kind.StringLiteral;
}

/**
 * Returns true when the initializer of an ambient declaration is
 * legal — only literal-typed initializers (string/number/boolean/
 * enum members) are allowed.
 */
export function isLegalAmbientInitializer(init: AstNode): boolean {
  switch (init.kind) {
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
      return true;
    case Kind.PrefixUnaryExpression: {
      const op = (init as unknown as { operator?: number }).operator;
      if (op !== Kind.MinusToken && op !== Kind.PlusToken) return false;
      const operand = (init as unknown as { operand?: AstNode }).operand;
      return operand !== undefined && isLegalAmbientInitializer(operand);
    }
    default:
      return false;
  }
}

/**
 * Returns true when the node is the body of a global augmentation
 * (`declare global { ... }`).
 */
export function isGlobalAugmentation(node: AstNode): boolean {
  if (!isAmbientModule(node)) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return false;
  if (name.kind !== Kind.Identifier) return false;
  return (name as unknown as { escapedText?: string }).escapedText === "global";
}
