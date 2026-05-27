/**
 * Modifier extraction + classification.
 *
 * Ported from Strada `checker.go` modifier helpers + utilities.
 * Reads modifier lists off declarations and converts to a ModifierFlags
 * bitset.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const ModifierFlags = {
  None: 0,
  Export: 1 << 0,
  Ambient: 1 << 1,
  Public: 1 << 2,
  Private: 1 << 3,
  Protected: 1 << 4,
  Static: 1 << 5,
  Readonly: 1 << 6,
  Abstract: 1 << 7,
  Async: 1 << 8,
  Default: 1 << 9,
  Const: 1 << 11,
  Override: 1 << 14,
  Accessor: 1 << 15,
  In: 1 << 16,
  Out: 1 << 17,
} as const;

export function modifierToFlag(kind: number): number {
  switch (kind) {
    case Kind.ExportKeyword: return ModifierFlags.Export;
    case Kind.DeclareKeyword: return ModifierFlags.Ambient;
    case Kind.PublicKeyword: return ModifierFlags.Public;
    case Kind.PrivateKeyword: return ModifierFlags.Private;
    case Kind.ProtectedKeyword: return ModifierFlags.Protected;
    case Kind.StaticKeyword: return ModifierFlags.Static;
    case Kind.ReadonlyKeyword: return ModifierFlags.Readonly;
    case Kind.AbstractKeyword: return ModifierFlags.Abstract;
    case Kind.AsyncKeyword: return ModifierFlags.Async;
    case Kind.DefaultKeyword: return ModifierFlags.Default;
    case Kind.ConstKeyword: return ModifierFlags.Const;
    case Kind.OverrideKeyword: return ModifierFlags.Override;
    case Kind.AccessorKeyword: return ModifierFlags.Accessor;
    case Kind.InKeyword: return ModifierFlags.In;
    case Kind.OutKeyword: return ModifierFlags.Out;
    default: return 0;
  }
}

export function getModifierFlags(node: AstNode): number {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return 0;
  let f = 0;
  for (const m of mods) f |= modifierToFlag((m as { kind?: number }).kind ?? 0);
  return f;
}

export function hasModifier(node: AstNode, flag: number): boolean {
  return (getModifierFlags(node) & flag) !== 0;
}

export function hasStaticModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Static);
}

export function hasReadonlyModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Readonly);
}

export function hasAbstractModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Abstract);
}

export function hasAsyncModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Async);
}

export function hasOverrideModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Override);
}

export function hasAmbientModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Ambient);
}

export function hasExportModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Export);
}

export function hasDefaultModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Default);
}

export function hasDecorators(node: AstNode): boolean {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  for (const m of mods) if ((m as { kind?: number }).kind === Kind.Decorator) return true;
  return false;
}

export function getDecorators(node: AstNode): readonly AstNode[] {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return [];
  return mods.filter((m) => (m as { kind?: number }).kind === Kind.Decorator);
}

/**
 * Returns true when any of the listed access modifiers (public,
 * private, protected) appears on the node.
 */
export function hasAccessibilityModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected);
}

/**
 * Returns true when readonly OR any access modifier appears — i.e.
 * the parameter is a parameter-property.
 */
export function isParameterPropertyModifier(node: AstNode): boolean {
  return hasModifier(node, ModifierFlags.Public | ModifierFlags.Private |
    ModifierFlags.Protected | ModifierFlags.Readonly);
}
