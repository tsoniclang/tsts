/**
 * Modifier-filter visitor.
 *
 * Port of TS-Go `internal/transformers/modifiervisitor.go`. Provides
 * `extractModifiers` which removes any modifier kinds not in the
 * allowed flag set.
 */

import type { Node as AstNode, ModifierList } from "../ast/index.js";
import { Transformer, type EmitContext } from "./transformer.js";

class ModifierVisitor extends Transformer {
  readonly allowedModifiers: number;

  constructor(allowed: number, emitContext: EmitContext) {
    super();
    this.allowedModifiers = allowed;
    this.initTransformer((node) => this.visit(node) as AstNode, emitContext);
  }

  visit(node: AstNode): AstNode | undefined {
    const flags = modifierToFlag(node.kind);
    if (flags !== ModifierFlags.None && (flags & this.allowedModifiers) === 0) {
      return undefined;
    }
    return node;
  }
}

export function extractModifiers(
  emitContext: EmitContext,
  modifiers: ModifierList | undefined,
  allowed: number,
): ModifierList | undefined {
  if (modifiers === undefined) return undefined;
  const tx = new ModifierVisitor(allowed, emitContext);
  return tx.visitor().visitModifiers(modifiers);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare const ModifierFlags: { None: number };
declare function modifierToFlag(kind: number): number;
