import type { Node } from "../ast/index.js";

export interface ReparseClone {
  readonly original: Node;
  readonly clone: Node;
}

export interface ReparseState {
  readonly clones: ReparseClone[];
  readonly syntheticNodes: Node[];
}

export function newReparseState(): ReparseState {
  return { clones: [], syntheticNodes: [] };
}

export function finishReparsedNode<T extends Node>(node: T, locationNode: Node): T {
  const mutable = node as Node & { flags?: number; pos?: number; end?: number };
  const location = locationNode as Node & { pos?: number; end?: number };
  mutable.pos = location.pos;
  mutable.end = location.end;
  mutable.flags = ((mutable.flags ?? 0) | (1 << 20));
  return node;
}

export function finishMutatedNode<T extends Node>(node: T): T {
  return node;
}

export function addDeepCloneReparse<T extends Node>(state: ReparseState, node: T, clone: T): T {
  state.clones.push({ original: node, clone });
  return clone;
}

export function reparseTags(state: ReparseState, parent: Node, jsDoc: readonly Node[]): void {
  for (const doc of jsDoc) {
    reparseUnhosted(state, parent, doc);
    reparseHosted(state, parent, doc);
  }
}

export function reparseUnhosted(state: ReparseState, parent: Node, jsDoc: Node): void {
  void parent;
  state.syntheticNodes.push(jsDoc);
}

export function reparseHosted(state: ReparseState, parent: Node, jsDoc: Node): void {
  void jsDoc;
  state.syntheticNodes.push(parent);
}
