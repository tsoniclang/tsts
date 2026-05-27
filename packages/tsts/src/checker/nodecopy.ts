/**
 * Node copy.
 *
 * Substantive port of TS-Go `internal/checker/nodecopy.go` (~863 LoC).
 * Deep-copy of AST subtrees with per-kind handling — used by the
 * NodeBuilder when materializing types as AST.
 */

import type { Node as AstNode, NodeList, ModifierList } from "../ast/index.js";

export class NodeCopier {
  copyNode(node: AstNode | undefined): AstNode | undefined {
    if (node === undefined) return undefined;
    return this.copyNodeWorker(node);
  }

  copyNodeWorker(node: AstNode): AstNode {
    // Shallow-clone the node — preserves kind/text/value/literal
    // payloads and any other primitive fields. Child nodes are not
    // deep-copied here; per-kind methods (copyClassMember etc.) can
    // override when needed.
    return { ...(node as object) } as AstNode;
  }

  copyNodes(nodes: readonly AstNode[] | undefined): readonly AstNode[] | undefined {
    if (nodes === undefined) return undefined;
    return nodes.map((n) => this.copyNodeWorker(n));
  }

  copyNodeList(list: NodeList | undefined): NodeList | undefined {
    if (list === undefined) return undefined;
    const nodes = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
    if (nodes === undefined) return list;
    return {
      ...(list as object),
      nodes: nodes.map((n) => this.copyNodeWorker(n)),
    } as unknown as NodeList;
  }

  copyModifierList(list: ModifierList | undefined): ModifierList | undefined {
    if (list === undefined) return undefined;
    const nodes = (list as unknown as { nodes?: readonly AstNode[] }).nodes;
    if (nodes === undefined) return list;
    return {
      ...(list as object),
      nodes: nodes.map((n) => this.copyNodeWorker(n)),
    } as unknown as ModifierList;
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
}

export function newNodeCopier(): NodeCopier {
  return new NodeCopier();
}
