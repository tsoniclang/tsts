/**
 * Modifier propagation parity helpers.
 */

export interface ModifierCarrier {
  readonly modifiers?: readonly string[];
}

export function hasModifierName(node: ModifierCarrier, name: string): boolean {
  return node.modifiers?.includes(name) === true;
}

export function copyModifiers(source: ModifierCarrier, extra: readonly string[] = []): readonly string[] {
  return [...new Set([...(source.modifiers ?? []), ...extra])];
}

export function removeModifierName(node: ModifierCarrier, name: string): readonly string[] {
  return (node.modifiers ?? []).filter(modifier => modifier !== name);
}

export function modifierSortKey(name: string): number {
  if (name === "export") return 0;
  if (name === "default") return 1;
  if (name === "declare") return 2;
  if (name === "public" || name === "protected" || name === "private") return 3;
  if (name === "static") return 4;
  if (name === "readonly") return 5;
  if (name === "async") return 6;
  return 10;
}

export function sortModifiers(modifiers: readonly string[]): readonly string[] {
  return [...modifiers].sort((left, right) => modifierSortKey(left) - modifierSortKey(right) || left.localeCompare(right));
}
