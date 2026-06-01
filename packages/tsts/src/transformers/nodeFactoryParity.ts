/**
 * Transformer node-factory parity helpers.
 */

import type { Node as AstNode } from "../ast/index.js";

export interface TransformFactoryNode {
  readonly kindName: string;
  readonly children: readonly AstNode[];
  readonly original?: AstNode;
}

export function createTransformFactoryNode(kindName: string, children: readonly AstNode[] = [], original?: AstNode): TransformFactoryNode {
  return { kindName, children, ...(original === undefined ? {} : { original }) };
}

export function updateTransformFactoryNode(node: TransformFactoryNode, children: readonly AstNode[]): TransformFactoryNode {
  if (sameChildren(node.children, children)) return node;
  return { ...node, children };
}

export function cloneTransformFactoryNode(node: TransformFactoryNode): TransformFactoryNode {
  return { ...node, children: [...node.children] };
}

export function factoryNodeStartsOnNewLine(node: TransformFactoryNode): boolean {
  return node.kindName.endsWith("Statement") || node.kindName === "Block" || node.kindName === "SourceFile";
}

function sameChildren(left: readonly AstNode[], right: readonly AstNode[]): boolean {
  return left.length === right.length && left.every((child, index) => child === right[index]);
}
