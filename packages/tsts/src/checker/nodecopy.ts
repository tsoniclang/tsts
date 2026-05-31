/**
 * Node copy.
 *
 * Substantive port of TS-Go `internal/checker/nodecopy.go` (~863 LoC).
 * Deep-copy of AST subtrees with per-kind handling — used by the
 * NodeBuilder when materializing types as AST.
 */

import type { Node as AstNode, NodeList, ModifierList } from "../ast/index.js";

export interface NodeCopyOptions {
  preserveSymbols?: boolean;
  preserveFlow?: boolean;
  preserveDiagnostics?: boolean;
  setOriginal?: boolean;
}

export class NodeCopier {
  private readonly seen = new Map<AstNode, AstNode>();

  constructor(private readonly options: NodeCopyOptions = {}) {}

  copyNode(node: AstNode | undefined): AstNode | undefined {
    if (node === undefined) return undefined;
    return this.copyNodeWorker(node);
  }

  copyNodeWorker(node: AstNode): AstNode {
    const existing = this.seen.get(node);
    if (existing !== undefined) return existing;
    const clone = {} as Record<string, unknown>;
    this.seen.set(node, clone as unknown as AstNode);
    for (const [key, value] of Object.entries(node as object)) {
      if (key === "parent") continue;
      if (!this.options.preserveSymbols && isSymbolSlot(key)) continue;
      if (!this.options.preserveFlow && isFlowSlot(key)) continue;
      if (!this.options.preserveDiagnostics && isDiagnosticSlot(key)) continue;
      clone[key] = this.copyValue(value, clone as unknown as AstNode);
    }
    if (this.options.setOriginal) clone.original = node;
    return clone as unknown as AstNode;
  }

  copyNodes(nodes: readonly AstNode[] | undefined): readonly AstNode[] | undefined {
    if (nodes === undefined) return undefined;
    return nodes.map((n) => this.copyNodeWithParent(n, undefined));
  }

  copyNodeList(list: NodeList | undefined): NodeList | undefined {
    if (list === undefined) return undefined;
    const nodes = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
    if (nodes === undefined) return list;
    return this.copyNodeListLike(list, nodes) as NodeList;
  }

  copyModifierList(list: ModifierList | undefined): ModifierList | undefined {
    if (list === undefined) return undefined;
    const nodes = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
    if (nodes === undefined) return list;
    return this.copyNodeListLike(list, nodes) as ModifierList;
  }

  copyIdentifier(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyPropertyName(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyEntityName(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyParameterDeclaration(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyTypeParameterDeclaration(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyTypeNode(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyExpression(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyStatement(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyDeclaration(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyClassMember(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyInterfaceMember(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyHeritageClause(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyImportClause(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyExportClause(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyTypeReference(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyUnionOrIntersectionType(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyConditionalType(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyMappedType(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyTypeLiteral(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyArrayBindingPattern(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyObjectBindingPattern(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyJsxElement(node: AstNode): AstNode { return this.copyNodeWorker(node); }
  copyJsxFragment(node: AstNode): AstNode { return this.copyNodeWorker(node); }

  reuseNode(node: AstNode | undefined): AstNode | undefined {
    if (node === undefined) return undefined;
    return this.tryReuseExistingNodeHelper(node);
  }

  tryJSTypeNodeToTypeNode(node: AstNode | undefined): AstNode | undefined {
    return this.reuseNode(node);
  }

  reuseName(node: AstNode | undefined): AstNode | undefined {
    const reused = this.reuseNode(node);
    if (reused !== undefined && identifierText(reused) === "new") {
      return {
        kind: stringLiteralKind(reused),
        text: "new",
      original: reused,
    } as unknown as AstNode;
    }
    return reused;
  }

  reuseTypeNode(node: AstNode | undefined): AstNode | undefined {
    return this.reuseNode(node);
  }

  tryReuseExistingNodeHelper(existing: AstNode): AstNode {
    return this.copyNodeWorker(existing);
  }

  walkNodeForExpandability(node: AstNode | undefined, cb: (node: AstNode) => boolean | void): boolean {
    if (node === undefined) return false;
    if (cb(node) === true) return true;
    for (const child of childNodes(node)) {
      if (this.walkNodeForExpandability(child, cb)) return true;
    }
    return false;
  }

  rewriteModuleSpecifier(parent: AstNode, literal: AstNode, getModuleSpecifierOverride: (parent: AstNode, literal: AstNode) => string | undefined): AstNode {
    const newName = getModuleSpecifierOverride(parent, literal);
    if (newName === undefined || newName.length === 0 || newName === identifierText(literal)) return literal;
    return {
      ...this.copyNodeWorker(literal),
      text: newName,
      original: literal,
    } as AstNode;
  }

  private copyValue(value: unknown, parent: AstNode): unknown {
    if (isNode(value)) return this.copyNodeWithParent(value, parent);
    if (Array.isArray(value)) {
      return value.map((item) => this.copyValue(item, parent));
    }
    if (isNodeList(value)) {
      return this.copyNodeListLike(value, value.nodes, parent);
    }
    if (value instanceof Map) {
      const clone = new Map<unknown, unknown>();
      for (const [key, item] of value) clone.set(key, this.copyValue(item, parent));
      return clone;
    }
    return value;
  }

  private copyNodeWithParent(node: AstNode, parent: AstNode | undefined): AstNode {
    const clone = this.copyNodeWorker(node);
    if (parent !== undefined) (clone as { parent?: AstNode }).parent = parent;
    return clone;
  }

  private copyNodeListLike(
    list: object,
    nodes: readonly AstNode[],
    parent?: AstNode,
  ): object {
    const clone = { ...(list as object) } as { nodes?: readonly AstNode[]; parent?: AstNode };
    clone.nodes = nodes.map((node) => this.copyNodeWithParent(node, parent));
    if (parent !== undefined) clone.parent = parent;
    return clone;
  }
}

export function newNodeCopier(options?: NodeCopyOptions): NodeCopier {
  return new NodeCopier(options);
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { nodes: readonly AstNode[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes);
}

function childNodes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isNode(value)) out.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) out.push(item);
    } else if (isNodeList(value)) {
      out.push(...value.nodes);
    }
  }
  return out;
}

function isSymbolSlot(key: string): boolean {
  return key === "symbol" || key === "localSymbol" || key === "locals" || key === "nextContainer";
}

function isFlowSlot(key: string): boolean {
  return key === "flowNode" || key === "endFlowNode" || key === "returnFlowNode";
}

function isDiagnosticSlot(key: string): boolean {
  return key === "parseDiagnostics" || key === "bindDiagnostics" || key === "semanticDiagnostics";
}

function identifierText(node: AstNode | undefined): string {
  return (node as { text?: string } | undefined)?.text ?? "";
}

function stringLiteralKind(node: AstNode): number {
  return (node as { kind?: number }).kind ?? 11;
}
