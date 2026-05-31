/**
 * Modifier-filter visitor.
 *
 * Port of TS-Go `internal/transformers/modifiervisitor.go`. Provides
 * `extractModifiers` which removes any modifier kinds not in the
 * allowed flag set.
 */

import type { Node as AstNode, ModifierList } from "../ast/index.js";
import { Kind } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Transformer, type EmitContext } from "./transformer.js";

// Map modifier syntax kinds to ModifierFlags bits.
function modifierToFlag(kind: number): number {
  switch (kind) {
    case Kind.PublicKeyword: return ModifierFlags.Public;
    case Kind.PrivateKeyword: return ModifierFlags.Private;
    case Kind.ProtectedKeyword: return ModifierFlags.Protected;
    case Kind.ReadonlyKeyword: return ModifierFlags.Readonly;
    case Kind.OverrideKeyword: return ModifierFlags.Override;
    case Kind.ExportKeyword: return ModifierFlags.Export;
    case Kind.AbstractKeyword: return ModifierFlags.Abstract;
    case Kind.DeclareKeyword: return ModifierFlags.Ambient;
    case Kind.StaticKeyword: return ModifierFlags.Static;
    case Kind.AccessorKeyword: return ModifierFlags.Accessor;
    case Kind.AsyncKeyword: return ModifierFlags.Async;
    case Kind.DefaultKeyword: return ModifierFlags.Default;
    case Kind.ConstKeyword: return ModifierFlags.Const;
    case Kind.InKeyword: return ModifierFlags.In;
    case Kind.OutKeyword: return ModifierFlags.Out;
    default: return ModifierFlags.None;
  }
}

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

