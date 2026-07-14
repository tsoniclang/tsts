import type { bool } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend, GoSliceAppendSlice } from "../../go/compat.js";
import { GoAppend, GoAppendSlice, GoNilSlice, GoSliceIsNil } from "../../go/compat.js";
import * as slices from "../../go/slices.js";
import { AsSourceFile } from "./ast.js";
import type { SourceFile } from "./ast.js";
import { AsSyntaxList } from "./generated/casts.js";
import { NewBlock } from "./generated/factory.js";
import type { NodeFactory } from "./generated/factory.js";
import { KindSyntaxList } from "./generated/kinds.js";
import type { BlockOrExpression, ParameterList, Statement, StatementList, TokenNode } from "./generated/unions.js";
import type { ModifierList, Node, NodeList } from "./spine.js";
import { NewNodeFactory, NodeDefault_AsNode, NodeFactory_NewModifierList, NodeFactory_NewNodeList, Node_VisitEachChild } from "./spine.js";

import type { GoFunc } from "../../go/compat.js";
import { GoSliceBuild, GoSliceStore } from "../../go/compat.js";

// NodeVisitor

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::type::NodeVisitor","kind":"type","status":"implemented","sigHash":"1a8b615ace67a9225de32eb2009109a62e8d8bea41e8c1cde2f95a7c88b534f3"}
 *
 * Go source:
 * NodeVisitor struct {
 * 	Visit   func(node *Node) *Node // Required. The callback used to visit a node
 * 	Factory *NodeFactory           // Required. The NodeFactory used to produce new nodes when passed to VisitEachChild
 * 	Hooks   NodeVisitorHooks       // Hooks to be invoked when visiting a node
 * }
 */
export interface NodeVisitor {
  Visit: GoFunc<(node: GoPtr<Node>) => GoPtr<Node>>;
  Factory: GoPtr<NodeFactory>;
  Hooks: NodeVisitorHooks;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::type::NodeVisitorHooks","kind":"type","status":"implemented","sigHash":"432bb2ee3465afbee008e249a00e7f2867d526c453640ed29ca3289ad38c8de2"}
 *
 * Go source:
 * NodeVisitorHooks struct {
 * 	VisitNode               func(node *Node, v *NodeVisitor) *Node                           // Overrides visiting a Node. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitToken              func(node *TokenNode, v *NodeVisitor) *Node                      // Overrides visiting a TokenNode. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitNodes              func(nodes *NodeList, v *NodeVisitor) *NodeList                  // Overrides visiting a NodeList. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitModifiers          func(nodes *ModifierList, v *NodeVisitor) *ModifierList          // Overrides visiting a ModifierList. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitEmbeddedStatement  func(node *Statement, v *NodeVisitor) *Statement                 // Overrides visiting a Node when it is the embedded statement body of an iteration statement, `if` statement, or `with` statement. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitIterationBody      func(node *Statement, v *NodeVisitor) *Statement                 // Overrides visiting a Node when it is the embedded statement body of an iteration statement. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitParameters         func(nodes *ParameterList, v *NodeVisitor) *ParameterList        // Overrides visiting a ParameterList. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitFunctionBody       func(node *BlockOrExpression, v *NodeVisitor) *BlockOrExpression // Overrides visiting a function body. Only invoked by the VisitEachChild method on a given Node subtype.
 * 	VisitTopLevelStatements func(nodes *StatementList, v *NodeVisitor) *StatementList        // Overrides visiting a variable environment. Only invoked by the VisitEachChild method on a given Node subtype.
 * }
 */
export interface NodeVisitorHooks {
  VisitNode: GoFunc<(node: GoPtr<Node>, v: GoPtr<NodeVisitor>) => GoPtr<Node>>;
  VisitToken: GoFunc<(node: GoPtr<TokenNode>, v: GoPtr<NodeVisitor>) => GoPtr<Node>>;
  VisitNodes: GoFunc<(nodes: GoPtr<NodeList>, v: GoPtr<NodeVisitor>) => GoPtr<NodeList>>;
  VisitModifiers: GoFunc<(nodes: GoPtr<ModifierList>, v: GoPtr<NodeVisitor>) => GoPtr<ModifierList>>;
  VisitEmbeddedStatement: GoFunc<(node: GoPtr<Statement>, v: GoPtr<NodeVisitor>) => GoPtr<Statement>>;
  VisitIterationBody: GoFunc<(node: GoPtr<Statement>, v: GoPtr<NodeVisitor>) => GoPtr<Statement>>;
  VisitParameters: GoFunc<(nodes: GoPtr<ParameterList>, v: GoPtr<NodeVisitor>) => GoPtr<ParameterList>>;
  VisitFunctionBody: GoFunc<(node: GoPtr<BlockOrExpression>, v: GoPtr<NodeVisitor>) => GoPtr<BlockOrExpression>>;
  VisitTopLevelStatements: GoFunc<(nodes: GoPtr<StatementList>, v: GoPtr<NodeVisitor>) => GoPtr<StatementList>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::func::NewNodeVisitor","kind":"func","status":"implemented","sigHash":"9994679f74b71439da639ad23d79343e35b8b53348eaf35a1b96ac07b98416cf"}
 *
 * Go source:
 * func NewNodeVisitor(visit func(node *Node) *Node, factory *NodeFactory, hooks NodeVisitorHooks) *NodeVisitor {
 * 	if factory == nil {
 * 		factory = &NodeFactory{}
 * 	}
 * 	return &NodeVisitor{Visit: visit, Factory: factory, Hooks: hooks}
 * }
 */
export function NewNodeVisitor(visit: GoFunc<(node: GoPtr<Node>) => GoPtr<Node>>, factory: GoPtr<NodeFactory>, hooks: NodeVisitorHooks): GoPtr<NodeVisitor> {
  const resolvedFactory = factory === undefined
    ? NewNodeFactory({ OnCreate: undefined, OnUpdate: undefined, OnClone: undefined })
    : factory;
  return { Visit: visit, Factory: resolvedFactory, Hooks: hooks };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitSourceFile","kind":"method","status":"implemented","sigHash":"a72502a1c9477af1a5c3ff283872694a44fd1d519c5db278ba45d95e65707485"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitSourceFile(node *SourceFile) *SourceFile {
 * 	return v.VisitNode(node.AsNode()).AsSourceFile()
 * }
 */
export function NodeVisitor_VisitSourceFile(receiver: GoPtr<NodeVisitor>, node: GoPtr<SourceFile>): GoPtr<SourceFile> {
  return AsSourceFile(NodeVisitor_VisitNode(receiver, NodeDefault_AsNode(node)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitNode","kind":"method","status":"implemented","sigHash":"8675b3cc64a63faa226b3a500d7da5191decf04a03a4fc1728e00d825baaaeeb"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitNode(node *Node) *Node {
 * 	if node == nil || v.Visit == nil {
 * 		return node
 * 	}
 *
 * 	if v.Visit != nil {
 * 		visited := v.Visit(node)
 * 		if visited != nil && visited.Kind == KindSyntaxList {
 * 			nodes := visited.AsSyntaxList().Children
 * 			if len(nodes) != 1 {
 * 				panic("Expected only a single node to be written to output")
 * 			}
 * 			visited = nodes[0]
 * 			if visited != nil && visited.Kind == KindSyntaxList {
 * 				panic("The result of visiting and lifting a Node may not be SyntaxList")
 * 			}
 * 		}
 * 		return visited
 * 	}
 *
 * 	return node
 * }
 */
export function NodeVisitor_VisitNode(receiver: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {
  if (node === undefined || receiver!.Visit === undefined) {
    return node;
  }

  if (receiver!.Visit !== undefined) {
    let visited = receiver!.Visit(node);
    if (visited !== undefined && visited.Kind === KindSyntaxList) {
      const nodes = AsSyntaxList(visited)!.Children;
      if (nodes.length !== 1) {
        throw new globalThis.Error("Expected only a single node to be written to output");
      }
      visited = nodes[0];
      if (visited !== undefined && visited.Kind === KindSyntaxList) {
        throw new globalThis.Error("The result of visiting and lifting a Node may not be SyntaxList");
      }
    }
    return visited;
  }

  return node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitEmbeddedStatement","kind":"method","status":"implemented","sigHash":"0c28e2511ed5d52e86f3db9e78cd099c8722c2ea02f7ff2ef3f78d3364692e9a"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitEmbeddedStatement(node *Statement) *Statement {
 * 	if node == nil || v.Visit == nil {
 * 		return node
 * 	}
 *
 * 	visited := v.Visit(node)
 * 	if visited == nil {
 * 		return nil
 * 	}
 * 	return v.liftToBlock(visited)
 * }
 */
export function NodeVisitor_VisitEmbeddedStatement(receiver: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {
  if (node === undefined || receiver!.Visit === undefined) {
    return node;
  }

  const visited = receiver!.Visit(node);
  if (visited === undefined) {
    return undefined;
  }
  return NodeVisitor_liftToBlock(receiver, visited);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitNodes","kind":"method","status":"implemented","sigHash":"b84a1123d46bf09f1df4cf87b50f407880b389362fb871d8c341ab7a72280df3"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitNodes(nodes *NodeList) *NodeList {
 * 	if nodes == nil || v.Visit == nil {
 * 		return nodes
 * 	}
 *
 * 	if result, changed := v.VisitSlice(nodes.Nodes); changed {
 * 		list := v.Factory.NewNodeList(result)
 * 		list.Loc = nodes.Loc
 * 		return list
 * 	}
 *
 * 	return nodes
 * }
 */
export function NodeVisitor_VisitNodes(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<NodeList>): GoPtr<NodeList> {
  if (nodes === undefined || receiver!.Visit === undefined) {
    return nodes;
  }

  const [result, changed] = NodeVisitor_VisitSlice(receiver, nodes.Nodes);
  if (changed) {
    const list = NodeFactory_NewNodeList(receiver!.Factory, result);
    list!.Loc = nodes.Loc;
    return list;
  }

  return nodes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitModifiers","kind":"method","status":"implemented","sigHash":"75a2b011a30cbccacdef917dd35aba892e97fd4454cd08f0f6fc9f6d87779555"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitModifiers(nodes *ModifierList) *ModifierList {
 * 	if nodes == nil || v.Visit == nil {
 * 		return nodes
 * 	}
 *
 * 	if result, changed := v.VisitSlice(nodes.Nodes); changed {
 * 		list := v.Factory.NewModifierList(result)
 * 		list.Loc = nodes.Loc
 * 		return list
 * 	}
 *
 * 	return nodes
 * }
 */
export function NodeVisitor_VisitModifiers(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<ModifierList>): GoPtr<ModifierList> {
  if (nodes === undefined || receiver!.Visit === undefined) {
    return nodes;
  }

  const [result, changed] = NodeVisitor_VisitSlice(receiver, nodes.Nodes);
  if (changed) {
    const list = NodeFactory_NewModifierList(receiver!.Factory, result);
    list!.Loc = nodes.Loc;
    return list;
  }

  return nodes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitSlice","kind":"method","status":"implemented","sigHash":"b52ffbd89f962ab15f2d4130c69f4a1b0dbabe115a48c765915d9650e5ab8145"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitSlice(nodes []*Node) (result []*Node, changed bool) {
 * 	if nodes == nil || v.Visit == nil {
 * 		return nodes, false
 * 	}
 *
 * 	for i := 0; i < len(nodes); i++ {
 * 		node := nodes[i]
 * 		if v.Visit == nil {
 * 			break
 * 		}
 *
 * 		visited := v.Visit(node)
 * 		if visited == nil || visited != node {
 * 			updated := slices.Clone(nodes[:i])
 *
 * 			for {
 * 				// finish prior loop
 * 				switch {
 * 				case visited == nil: // do nothing
 * 				case visited.Kind == KindSyntaxList:
 * 					updated = append(updated, visited.AsSyntaxList().Children...)
 * 				default:
 * 					updated = append(updated, visited)
 * 				}
 *
 * 				i++
 *
 * 				// loop over remaining elements
 * 				if i >= len(nodes) {
 * 					break
 * 				}
 *
 * 				if v.Visit != nil {
 * 					node = nodes[i]
 * 					visited = v.Visit(node)
 * 				} else {
 * 					updated = append(updated, nodes[i:]...)
 * 					break
 * 				}
 * 			}
 *
 * 			return updated, true
 * 		}
 * 	}
 *
 * 	return nodes, false
 * }
 */
export function NodeVisitor_VisitSlice(receiver: GoPtr<NodeVisitor>, nodes: GoSlice<GoPtr<Node>>): [result: GoSlice<GoPtr<Node>>, changed: bool] {
  if (GoSliceIsNil(nodes) || receiver!.Visit === undefined) {
    return [nodes, false as bool];
  }

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if (receiver!.Visit === undefined) {
      break;
    }

    let visited = receiver!.Visit(node);
    if (visited === undefined || visited !== node) {
      let updated = slices.Clone(nodes.slice(0, i))!;

      for (;;) {
        // finish prior loop
        if (visited === undefined) {
          // do nothing
        } else if (visited.Kind === KindSyntaxList) {
          updated = GoSliceAppendSlice(updated, AsSyntaxList(visited)!.Children, GoPointerValueOps<Node>());
        } else {
          updated = GoSliceAppend(updated, visited, GoPointerValueOps<Node>());
        }

        i++;

        // loop over remaining elements
        if (i >= nodes.length) {
          break;
        }

        if (receiver!.Visit !== undefined) {
          node = nodes[i];
          visited = receiver!.Visit(node);
        } else {
          updated = GoSliceAppendSlice(updated, nodes.slice(i), GoPointerValueOps<Node>());
          break;
        }
      }

      return [updated, true as bool];
    }
  }

  return [nodes, false as bool];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.VisitEachChild","kind":"method","status":"implemented","sigHash":"46836a76cef68798a6085b0fcb90249b60c2565f15e9fcf4a15dae3db9965d75"}
 *
 * Go source:
 * func (v *NodeVisitor) VisitEachChild(node *Node) *Node {
 * 	if node == nil || v.Visit == nil {
 * 		return node
 * 	}
 *
 * 	return node.VisitEachChild(v)
 * }
 */
export function NodeVisitor_VisitEachChild(receiver: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {
  if (node === undefined || receiver!.Visit === undefined) {
    return node;
  }

  return Node_VisitEachChild(node, receiver);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitNode","kind":"method","status":"implemented","sigHash":"9caefefa87e0ce9f499b1f8a8abb813fc2e05e1a921c8f880f3173145a10d742"}
 *
 * Go source:
 * func (v *NodeVisitor) visitNode(node *Node) *Node {
 * 	if v.Hooks.VisitNode != nil {
 * 		return v.Hooks.VisitNode(node, v)
 * 	}
 * 	return v.VisitNode(node)
 * }
 */
export function NodeVisitor_visitNode(receiver: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {
  if (receiver!.Hooks.VisitNode !== undefined) {
    return receiver!.Hooks.VisitNode(node, receiver);
  }
  return NodeVisitor_VisitNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitEmbeddedStatement","kind":"method","status":"implemented","sigHash":"c581ce77c2cfb3ab1fbd94623710c9286154cbcfec1f5953131c5331b26a011a"}
 *
 * Go source:
 * func (v *NodeVisitor) visitEmbeddedStatement(node *Node) *Node {
 * 	if v.Hooks.VisitEmbeddedStatement != nil {
 * 		return v.Hooks.VisitEmbeddedStatement(node, v)
 * 	}
 * 	if v.Hooks.VisitNode != nil {
 * 		return v.liftToBlock(v.Hooks.VisitNode(node, v))
 * 	}
 * 	return v.VisitEmbeddedStatement(node)
 * }
 */
export function NodeVisitor_visitEmbeddedStatement(receiver: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {
  if (receiver!.Hooks.VisitEmbeddedStatement !== undefined) {
    return receiver!.Hooks.VisitEmbeddedStatement(node, receiver);
  }
  if (receiver!.Hooks.VisitNode !== undefined) {
    return NodeVisitor_liftToBlock(receiver, receiver!.Hooks.VisitNode(node, receiver));
  }
  return NodeVisitor_VisitEmbeddedStatement(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitIterationBody","kind":"method","status":"implemented","sigHash":"fb8e2c18acbadb2b2ecd01100dfac85ba24c0deb4b3e33816224d6625aa90ad8"}
 *
 * Go source:
 * func (v *NodeVisitor) visitIterationBody(node *Statement) *Statement {
 * 	if v.Hooks.VisitIterationBody != nil {
 * 		return v.Hooks.VisitIterationBody(node, v)
 * 	}
 * 	return v.visitEmbeddedStatement(node)
 * }
 */
export function NodeVisitor_visitIterationBody(receiver: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {
  if (receiver!.Hooks.VisitIterationBody !== undefined) {
    return receiver!.Hooks.VisitIterationBody(node, receiver);
  }
  return NodeVisitor_visitEmbeddedStatement(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitFunctionBody","kind":"method","status":"implemented","sigHash":"caa3d598dd04e45317ec6ffb19d4114aa2e07a7b0c79012c846553b946c37a23"}
 *
 * Go source:
 * func (v *NodeVisitor) visitFunctionBody(node *BlockOrExpression) *BlockOrExpression {
 * 	if v.Hooks.VisitFunctionBody != nil {
 * 		return v.Hooks.VisitFunctionBody(node, v)
 * 	}
 * 	return v.visitNode(node)
 * }
 */
export function NodeVisitor_visitFunctionBody(receiver: GoPtr<NodeVisitor>, node: GoPtr<BlockOrExpression>): GoPtr<BlockOrExpression> {
  if (receiver!.Hooks.VisitFunctionBody !== undefined) {
    return receiver!.Hooks.VisitFunctionBody(node, receiver);
  }
  return NodeVisitor_visitNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitToken","kind":"method","status":"implemented","sigHash":"3f3d6eb4ed4a32d2d87f3725497cce902ea94d870de2bf25a77bea5dbcbcf331"}
 *
 * Go source:
 * func (v *NodeVisitor) visitToken(node *Node) *Node {
 * 	if v.Hooks.VisitToken != nil {
 * 		return v.Hooks.VisitToken(node, v)
 * 	}
 * 	return v.VisitNode(node)
 * }
 */
export function NodeVisitor_visitToken(receiver: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {
  if (receiver!.Hooks.VisitToken !== undefined) {
    return receiver!.Hooks.VisitToken(node, receiver);
  }
  return NodeVisitor_VisitNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitNodes","kind":"method","status":"implemented","sigHash":"7bb45ae3f9662b196d5b1c32c74f051dfec73067df813440711cdf658fd5dde1"}
 *
 * Go source:
 * func (v *NodeVisitor) visitNodes(nodes *NodeList) *NodeList {
 * 	if v.Hooks.VisitNodes != nil {
 * 		return v.Hooks.VisitNodes(nodes, v)
 * 	}
 * 	return v.VisitNodes(nodes)
 * }
 */
export function NodeVisitor_visitNodes(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<NodeList>): GoPtr<NodeList> {
  if (receiver!.Hooks.VisitNodes !== undefined) {
    return receiver!.Hooks.VisitNodes(nodes, receiver);
  }
  return NodeVisitor_VisitNodes(receiver, nodes);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitModifiers","kind":"method","status":"implemented","sigHash":"896883fcc80cf2d1741155a2ebe2913002ce09a986cfc4ccea636866fa6c1020"}
 *
 * Go source:
 * func (v *NodeVisitor) visitModifiers(nodes *ModifierList) *ModifierList {
 * 	if v.Hooks.VisitModifiers != nil {
 * 		return v.Hooks.VisitModifiers(nodes, v)
 * 	}
 * 	return v.VisitModifiers(nodes)
 * }
 */
export function NodeVisitor_visitModifiers(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<ModifierList>): GoPtr<ModifierList> {
  if (receiver!.Hooks.VisitModifiers !== undefined) {
    return receiver!.Hooks.VisitModifiers(nodes, receiver);
  }
  return NodeVisitor_VisitModifiers(receiver, nodes);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitParameters","kind":"method","status":"implemented","sigHash":"b31e3f8f64eecc81b8a6046fcc82ddced80efedfff3001297cc444fcbe1a4c3c"}
 *
 * Go source:
 * func (v *NodeVisitor) visitParameters(nodes *ParameterList) *ParameterList {
 * 	if v.Hooks.VisitParameters != nil {
 * 		return v.Hooks.VisitParameters(nodes, v)
 * 	}
 * 	return v.visitNodes(nodes)
 * }
 */
export function NodeVisitor_visitParameters(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<ParameterList>): GoPtr<ParameterList> {
  if (receiver!.Hooks.VisitParameters !== undefined) {
    return receiver!.Hooks.VisitParameters(nodes, receiver);
  }
  return NodeVisitor_visitNodes(receiver, nodes);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.visitTopLevelStatements","kind":"method","status":"implemented","sigHash":"c56a205c89540dcf560288ba7ca28aea0f76fe4c3bb38ab0865664a1f569c1d3"}
 *
 * Go source:
 * func (v *NodeVisitor) visitTopLevelStatements(nodes *StatementList) *StatementList {
 * 	if v.Hooks.VisitTopLevelStatements != nil {
 * 		return v.Hooks.VisitTopLevelStatements(nodes, v)
 * 	}
 * 	return v.visitNodes(nodes)
 * }
 */
export function NodeVisitor_visitTopLevelStatements(receiver: GoPtr<NodeVisitor>, nodes: GoPtr<StatementList>): GoPtr<StatementList> {
  if (receiver!.Hooks.VisitTopLevelStatements !== undefined) {
    return receiver!.Hooks.VisitTopLevelStatements(nodes, receiver);
  }
  return NodeVisitor_visitNodes(receiver, nodes);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/visitor.go::method::NodeVisitor.liftToBlock","kind":"method","status":"implemented","sigHash":"74f079f4482566c55865b3ace7ead53cc5660db8a4df8a677108c921b1fd24ab"}
 *
 * Go source:
 * func (v *NodeVisitor) liftToBlock(node *Statement) *Statement {
 * 	var nodes []*Node
 * 	if node != nil {
 * 		if node.Kind == KindSyntaxList {
 * 			nodes = node.AsSyntaxList().Children
 * 		} else {
 * 			nodes = []*Node{node}
 * 		}
 * 	}
 * 	if len(nodes) == 1 {
 * 		node = nodes[0]
 * 	} else {
 * 		node = v.Factory.NewBlock(v.Factory.NewNodeList(nodes), true /*multiLine* /)
 * 	}
 * 	if node.Kind == KindSyntaxList {
 * 		panic("The result of visiting and lifting a Node may not be SyntaxList")
 * 	}
 * 	return node
 * }
 */
export function NodeVisitor_liftToBlock(receiver: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {
  let nodes: GoSlice<GoPtr<Node>> = GoNilSlice();
  if (node !== undefined) {
    if (node.Kind === KindSyntaxList) {
      nodes = AsSyntaxList(node)!.Children;
    } else {
      nodes = GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, node, GoPointerValueOps<Node>());
      });
    }
  }
  if (nodes.length === 1) {
    node = nodes[0];
  } else {
    node = NewBlock(receiver!.Factory, NodeFactory_NewNodeList(receiver!.Factory, nodes), true as bool);
  }
  if (node!.Kind === KindSyntaxList) {
    throw new globalThis.Error("The result of visiting and lifting a Node may not be SyntaxList");
  }
  return node;
}
