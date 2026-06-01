/**
 * Emit substitution parity helpers.
 *
 * TS-Go transform passes share substitution hooks for identifiers, property
 * access, call targets, class names, decorators, and import/export bindings.
 */

import type { Node as AstNode } from "../ast/index.js";

export type SubstitutionKind =
  | "identifier"
  | "property-access"
  | "element-access"
  | "call-expression"
  | "class-expression"
  | "decorator"
  | "import-binding"
  | "export-binding";

export interface EmitSubstitution {
  readonly kind: SubstitutionKind;
  readonly original: AstNode;
  readonly replacement: AstNode;
  readonly reason: string;
}

export interface EmitSubstitutionState {
  readonly byNode: Map<AstNode, EmitSubstitution>;
  readonly enabledKinds: Set<SubstitutionKind>;
}

export function createEmitSubstitutionState(): EmitSubstitutionState {
  return {
    byNode: new Map(),
    enabledKinds: new Set(),
  };
}

export function enableEmitSubstitution(state: EmitSubstitutionState, kind: SubstitutionKind): void {
  state.enabledKinds.add(kind);
}

export function registerEmitSubstitution(state: EmitSubstitutionState, substitution: EmitSubstitution): void {
  state.enabledKinds.add(substitution.kind);
  state.byNode.set(substitution.original, substitution);
}

export function substituteEmitNode(state: EmitSubstitutionState, kind: SubstitutionKind, node: AstNode): AstNode {
  if (!state.enabledKinds.has(kind)) return node;
  const substitution = state.byNode.get(node);
  return substitution?.kind === kind ? substitution.replacement : node;
}

export function substituteIdentifier(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "identifier", node);
}

export function substitutePropertyAccess(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "property-access", node);
}

export function substituteElementAccess(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "element-access", node);
}

export function substituteCallExpression(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "call-expression", node);
}

export function substituteClassExpression(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "class-expression", node);
}

export function substituteDecorator(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "decorator", node);
}

export function substituteImportBinding(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "import-binding", node);
}

export function substituteExportBinding(node: AstNode, state: EmitSubstitutionState): AstNode {
  return substituteEmitNode(state, "export-binding", node);
}

export function collectSubstitutionsForEmit(state: EmitSubstitutionState): readonly EmitSubstitution[] {
  return [...state.byNode.values()].sort((left, right) => left.kind.localeCompare(right.kind) || left.reason.localeCompare(right.reason));
}

export function removeEmitSubstitution(state: EmitSubstitutionState, node: AstNode): void {
  state.byNode.delete(node);
}

export function hasEmitSubstitution(state: EmitSubstitutionState, node: AstNode): boolean {
  return state.byNode.has(node);
}

export function cloneEmitSubstitutionState(state: EmitSubstitutionState): EmitSubstitutionState {
  return {
    byNode: new Map(state.byNode),
    enabledKinds: new Set(state.enabledKinds),
  };
}

export function mergeEmitSubstitutionState(target: EmitSubstitutionState, source: EmitSubstitutionState): void {
  for (const kind of source.enabledKinds) target.enabledKinds.add(kind);
  for (const substitution of source.byNode.values()) target.byNode.set(substitution.original, substitution);
}

export function substitutionReason(state: EmitSubstitutionState, node: AstNode): string | undefined {
  return state.byNode.get(node)?.reason;
}
