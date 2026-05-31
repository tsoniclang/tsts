/**
 * Visitor-pipeline parity helpers.
 *
 * TS-Go transform visitors use a shared traversal contract: visitor state is
 * pushed and popped around lexical scopes, arrays preserve holes where needed,
 * and subtree replacement never silently drops emit metadata.
 */

import type { Node as AstNode } from "../ast/index.js";

export interface VisitorPipelineState {
  readonly scopeStack: AstNode[];
  readonly substitutions: Map<AstNode, AstNode>;
  readonly skippedSubtrees: Set<AstNode>;
  readonly emittedHelpers: Set<string>;
}

export interface VisitorPipelineOptions {
  readonly preserveOmittedNodes?: boolean;
  readonly visitGeneratedNodes?: boolean;
}

export type PipelineVisitor = (node: AstNode, state: VisitorPipelineState) => AstNode;

export function createVisitorPipelineState(): VisitorPipelineState {
  return {
    scopeStack: [],
    substitutions: new Map(),
    skippedSubtrees: new Set(),
    emittedHelpers: new Set(),
  };
}

export function visitNodePipeline(node: AstNode, visitor: PipelineVisitor, state = createVisitorPipelineState(), options: VisitorPipelineOptions = {}): AstNode {
  if (state.skippedSubtrees.has(node)) return node;
  if (isGeneratedNode(node) && options.visitGeneratedNodes !== true) return node;
  const substituted = state.substitutions.get(node) ?? node;
  const entered = enterScopeIfNeeded(substituted, state);
  try {
    const visitedChildren = visitNodeChildren(substituted, visitor, state, options);
    return preserveEmitMetadata(substituted, visitor(visitedChildren, state));
  } finally {
    if (entered) state.scopeStack.pop();
  }
}

export function visitNodeChildren(node: AstNode, visitor: PipelineVisitor, state: VisitorPipelineState, options: VisitorPipelineOptions): AstNode {
  const children = childNodes(node);
  if (children.length === 0) return node;
  const visited = visitNodeArray(children, visitor, state, options);
  return updateChildren(node, visited);
}

export function visitNodeArray(nodes: readonly AstNode[], visitor: PipelineVisitor, state: VisitorPipelineState, options: VisitorPipelineOptions = {}): readonly AstNode[] {
  const result: AstNode[] = [];
  for (const node of nodes) {
    const visited = visitNodePipeline(node, visitor, state, options);
    if (isOmittedNode(visited) && options.preserveOmittedNodes !== true) continue;
    result.push(visited);
  }
  return result;
}

export function substituteVisitorNode(state: VisitorPipelineState, original: AstNode, replacement: AstNode): void {
  state.substitutions.set(original, replacement);
}

export function skipVisitorSubtree(state: VisitorPipelineState, node: AstNode): void {
  state.skippedSubtrees.add(node);
}

export function requestVisitorHelper(state: VisitorPipelineState, helperName: string): void {
  state.emittedHelpers.add(helperName);
}

export function visitorHelpers(state: VisitorPipelineState): readonly string[] {
  return [...state.emittedHelpers].sort();
}

export function createScopedPipelineVisitor(predicate: (node: AstNode) => boolean, visitor: PipelineVisitor): PipelineVisitor {
  return (node, state) => {
    if (!predicate(node)) return node;
    state.scopeStack.push(node);
    try {
      return visitor(node, state);
    } finally {
      state.scopeStack.pop();
    }
  };
}

export function chainPipelineVisitors(visitors: readonly PipelineVisitor[]): PipelineVisitor {
  return (node, state) => visitors.reduce((current, visitor) => visitor(current, state), node);
}

export function visitorCurrentScope(state: VisitorPipelineState): AstNode | undefined {
  return state.scopeStack[state.scopeStack.length - 1];
}

function enterScopeIfNeeded(node: AstNode, state: VisitorPipelineState): boolean {
  if (!isLexicalScope(node)) return false;
  state.scopeStack.push(node);
  return true;
}

function preserveEmitMetadata(original: AstNode, updated: AstNode): AstNode {
  if (original === updated) return updated;
  return Object.assign({}, updated, {
    emitNode: (original as { readonly emitNode?: unknown }).emitNode,
    transformFlags: (original as { readonly transformFlags?: unknown }).transformFlags,
  });
}

function updateChildren(node: AstNode, children: readonly AstNode[]): AstNode {
  if ("statements" in node) return Object.assign({}, node, { statements: children });
  if ("members" in node) return Object.assign({}, node, { members: children });
  if ("children" in node) return Object.assign({}, node, { children });
  return node;
}

function childNodes(node: AstNode): readonly AstNode[] {
  return (node as { readonly statements?: readonly AstNode[] }).statements
    ?? (node as { readonly members?: readonly AstNode[] }).members
    ?? (node as { readonly children?: readonly AstNode[] }).children
    ?? [];
}

function isLexicalScope(node: AstNode): boolean {
  const kindName = (node as { readonly kindName?: string }).kindName ?? "";
  return kindName.endsWith("Function")
    || kindName.endsWith("Class")
    || kindName === "SourceFile"
    || kindName === "Block";
}

function isGeneratedNode(node: AstNode): boolean {
  return Boolean((node as { readonly generated?: boolean; readonly emitNode?: { readonly generated?: boolean } }).generated)
    || Boolean((node as { readonly emitNode?: { readonly generated?: boolean } }).emitNode?.generated);
}

function isOmittedNode(node: AstNode): boolean {
  return Boolean((node as { readonly omitted?: boolean }).omitted);
}
