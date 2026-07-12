import type { bool, int } from "../../go/scalars.js";
import { goReceiverKey } from "../../go/compat.js";
import type { GoInterfaceValue, GoMap, GoPtr } from "../../go/compat.js";
import { Builder } from "../../go/strings.js";
import type { ModifierList, Node, NodeList, NodeFactoryCoercible } from "../ast/spine.js";
import { Node_Clone, Node_End, Node_ForEachChild, Node_Pos, Node_VisitEachChild, NodeFactory_NewModifierList, NodeFactory_NewNodeList, NodeList_Clone, NodeList_End, NodeList_Pos } from "../ast/spine.js";
import type { NodeFactory } from "../ast/generated/factory.js";
import type { NodeVisitor } from "../ast/visitor.js";
import { NewNodeVisitor, NodeVisitor_VisitNodes } from "../ast/visitor.js";
import { NodeIsSynthesized } from "../ast/utilities.js";
import { NewTextRange } from "../core/text.js";
import type { Symbol } from "../ast/symbol.js";
import type { UTF16Offset } from "../core/core.js";
import { SkipTrivia } from "../scanner/scanner.js";
import { IsWhiteSpaceLike } from "../stringutil/util.js";
import { defaultIndentSize } from "./textwriter.js";
import type { textWriter } from "./textwriter.js";
import {
  textWriter_Clear,
  textWriter_DecreaseIndent,
  textWriter_GetColumn,
  textWriter_GetIndent,
  textWriter_GetLine,
  textWriter_GetTextPos,
  textWriter_HasTrailingComment,
  textWriter_HasTrailingWhitespace,
  textWriter_IncreaseIndent,
  textWriter_IsAtStartOfLine,
  textWriter_RawWrite,
  textWriter_String,
  textWriter_Write,
  textWriter_WriteComment,
  textWriter_WriteKeyword,
  textWriter_WriteLine,
  textWriter_WriteLineForce,
  textWriter_WriteLiteral,
  textWriter_WriteOperator,
  textWriter_WriteParameter,
  textWriter_WriteProperty,
  textWriter_WritePunctuation,
  textWriter_WriteSpace,
  textWriter_WriteStringLiteral,
  textWriter_WriteSymbol,
  textWriter_WriteTrailingSemicolon,
} from "./textwriter.js";
import type { PrintHandlers } from "./printer/state.js";

// Go strings are byte sequences. `len(s)` is the UTF-8 byte length and `s[i]`
// indexes a byte, so position math (matching textWriter.GetTextPos, which returns
// a byte offset) is performed over the UTF-8 encoding of the string.
const utf8Encoder: TextEncoder = new globalThis.TextEncoder();
const byteLen = (s: string): int => utf8Encoder.encode(s).length as int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::type::ChangeTrackerWriter","kind":"type","status":"implemented","sigHash":"c477609e074153925420febf51c26d161099f83952e89bbfdcbdcf2a14ab09c9"}
 *
 * Go source:
 * ChangeTrackerWriter struct {
 * 	textWriter
 * 	lastNonTriviaPosition int
 * 	pos                   map[triviaPositionKey]int
 * 	end                   map[triviaPositionKey]int
 * }
 */
export interface ChangeTrackerWriter {
  __tsgoEmbedded0: textWriter;
  lastNonTriviaPosition: int;
  pos: GoMap<triviaPositionKey, int>;
  end: GoMap<triviaPositionKey, int>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::type::triviaPositionKey","kind":"type","status":"implemented","sigHash":"8afcfd37e24226d32c0303750c14c2560398126a4865a619dad6f8bad086e352"}
 *
 * Go source:
 * triviaPositionKey interface { // *astNode | *ast.NodeList
 * 	Pos() int
 * 	End() int
 * }
 */
export interface triviaPositionKey extends GoInterfaceValue<GoPtr<Node> | GoPtr<NodeList>> {
  Pos(): int;
  End(): int;
}

// `*ast.Node` satisfies `triviaPositionKey` (it has Pos()/End()). The method-bearing
// adapter carries the underlying receiver via the goReceiver brand so the change
// tracker's maps can key on pointer identity.
const nodeTriviaPositionKeys = new WeakMap<Node, triviaPositionKey>();
const nodeListTriviaPositionKeys = new WeakMap<NodeList, triviaPositionKey>();

function Node_as_triviaPositionKey(receiver: GoPtr<Node>): triviaPositionKey {
  let value = nodeTriviaPositionKeys.get(receiver!);
  if (value !== undefined) return value;
  value = {
    [goReceiverKey]: receiver,
    Pos: (): int => Node_Pos(receiver),
    End: (): int => Node_End(receiver),
  };
  nodeTriviaPositionKeys.set(receiver!, value);
  return value;
}

// `*ast.NodeList` satisfies `triviaPositionKey` as well.
function NodeList_as_triviaPositionKey(receiver: GoPtr<NodeList>): triviaPositionKey {
  let value = nodeListTriviaPositionKeys.get(receiver!);
  if (value !== undefined) return value;
  value = {
    [goReceiverKey]: receiver,
    Pos: (): int => NodeList_Pos(receiver),
    End: (): int => NodeList_End(receiver),
  };
  nodeListTriviaPositionKeys.set(receiver!, value);
  return value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::func::NewChangeTrackerWriter","kind":"func","status":"implemented","sigHash":"aa31b7ff3ae3773c8684e84ad8228c22d7ec6b96e924725f6040855fe8e203fa"}
 *
 * Go source:
 * func NewChangeTrackerWriter(newline string, indentSize int) *ChangeTrackerWriter {
 * 	// TODO: Callers passing -1 should pass actual indent options once indent-related formatting is ported.
 * 	if indentSize < 0 {
 * 		indentSize = defaultIndentSize
 * 	}
 * 	ctw := &ChangeTrackerWriter{
 * 		textWriter:            textWriter{newLine: newline, indentSize: indentSize},
 * 		lastNonTriviaPosition: 0,
 * 		pos:                   map[triviaPositionKey]int{},
 * 		end:                   map[triviaPositionKey]int{},
 * 	}
 * 	ctw.textWriter.Clear()
 * 	return ctw
 * }
 */
export function NewChangeTrackerWriter(newline: string, indentSize: int): GoPtr<ChangeTrackerWriter> {
  // TODO: Callers passing -1 should pass actual indent options once indent-related formatting is ported.
  const resolvedIndentSize: int = indentSize < 0 ? defaultIndentSize : indentSize;
  // textWriter{newLine, indentSize}: the remaining fields take their Go zero values;
  // ctw.textWriter.Clear() below resets the mutable ones.
  const embedded: textWriter = {
    newLine: newline,
    indentSize: resolvedIndentSize,
    builder: new Builder(),
    lastWritten: "",
    indent: 0 as int,
    lineStart: false as bool,
    lineCount: 0 as int,
    linePos: 0 as int,
    hasTrailingCommentState: false as bool,
  };
  const ctw: ChangeTrackerWriter = {
    __tsgoEmbedded0: embedded,
    lastNonTriviaPosition: 0 as int,
    pos: new globalThis.Map<triviaPositionKey, int>(),
    end: new globalThis.Map<triviaPositionKey, int>(),
  };
  textWriter_Clear(ctw.__tsgoEmbedded0);
  return ctw;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.GetPrintHandlers","kind":"method","status":"implemented","sigHash":"e05edf69eb861f9658617c9916c3c7d410673f180ae3286d814613e3c8d7c0a4"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) GetPrintHandlers() PrintHandlers {
 * 	return PrintHandlers{
 * 		OnBeforeEmitNode: func(nodeOpt *ast.Node) {
 * 			if nodeOpt != nil {
 * 				ct.setPos(nodeOpt)
 * 			}
 * 		},
 * 		OnAfterEmitNode: func(nodeOpt *ast.Node) {
 * 			if nodeOpt != nil {
 * 				ct.setEnd(nodeOpt)
 * 			}
 * 		},
 * 		OnBeforeEmitNodeList: func(nodesOpt *ast.NodeList) {
 * 			if nodesOpt != nil {
 * 				ct.setPos(nodesOpt)
 * 			}
 * 		},
 * 		OnAfterEmitNodeList: func(nodesOpt *ast.NodeList) {
 * 			if nodesOpt != nil {
 * 				ct.setEnd(nodesOpt)
 * 			}
 * 		},
 * 		OnBeforeEmitToken: func(nodeOpt *ast.TokenNode) {
 * 			if nodeOpt != nil {
 * 				ct.setPos(nodeOpt)
 * 			}
 * 		},
 * 		OnAfterEmitToken: func(nodeOpt *ast.TokenNode) {
 * 			if nodeOpt != nil {
 * 				ct.setEnd(nodeOpt)
 * 			}
 * 		},
 * 	}
 * }
 */
export function ChangeTrackerWriter_GetPrintHandlers(receiver: GoPtr<ChangeTrackerWriter>): PrintHandlers {
  return {
    HasGlobalName: (_name: string): bool => false as bool,
    OnBeforeEmitNode: (nodeOpt: GoPtr<Node>): void => {
      if (nodeOpt !== undefined) {
        ChangeTrackerWriter_setPos(receiver, Node_as_triviaPositionKey(nodeOpt));
      }
    },
    OnAfterEmitNode: (nodeOpt: GoPtr<Node>): void => {
      if (nodeOpt !== undefined) {
        ChangeTrackerWriter_setEnd(receiver, Node_as_triviaPositionKey(nodeOpt));
      }
    },
    OnBeforeEmitNodeList: (nodesOpt: GoPtr<NodeList>): void => {
      if (nodesOpt !== undefined) {
        ChangeTrackerWriter_setPos(receiver, NodeList_as_triviaPositionKey(nodesOpt));
      }
    },
    OnAfterEmitNodeList: (nodesOpt: GoPtr<NodeList>): void => {
      if (nodesOpt !== undefined) {
        ChangeTrackerWriter_setEnd(receiver, NodeList_as_triviaPositionKey(nodesOpt));
      }
    },
    OnBeforeEmitToken: (nodeOpt: GoPtr<Node>): void => {
      if (nodeOpt !== undefined) {
        ChangeTrackerWriter_setPos(receiver, Node_as_triviaPositionKey(nodeOpt));
      }
    },
    OnAfterEmitToken: (nodeOpt: GoPtr<Node>): void => {
      if (nodeOpt !== undefined) {
        ChangeTrackerWriter_setEnd(receiver, Node_as_triviaPositionKey(nodeOpt));
      }
    },
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.setPos","kind":"method","status":"implemented","sigHash":"f21f82d2c8337afd1b8c2029c3ed5c9adb7cb27870abe2b20f46c043023bcda9"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) setPos(node triviaPositionKey) {
 * 	ct.pos[node] = ct.lastNonTriviaPosition
 * }
 */
export function ChangeTrackerWriter_setPos(receiver: GoPtr<ChangeTrackerWriter>, node: triviaPositionKey): void {
  receiver!.pos.set(node, receiver!.lastNonTriviaPosition);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.setEnd","kind":"method","status":"implemented","sigHash":"f601f20196a2e4286335b0f5b3c0bee9d784997792d8b9171368a9dfe2940c8a"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) setEnd(node triviaPositionKey) {
 * 	ct.end[node] = ct.lastNonTriviaPosition
 * }
 */
export function ChangeTrackerWriter_setEnd(receiver: GoPtr<ChangeTrackerWriter>, node: triviaPositionKey): void {
  receiver!.end.set(node, receiver!.lastNonTriviaPosition);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.getPos","kind":"method","status":"implemented","sigHash":"cf5df1fd9d0ebe9ca81c49c8ab2ffa1240f5dfcf1362fdeb6fd674782cadde36"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) getPos(node triviaPositionKey) int {
 * 	return ct.pos[node]
 * }
 */
export function ChangeTrackerWriter_getPos(receiver: GoPtr<ChangeTrackerWriter>, node: triviaPositionKey): int {
  // Go's map read of a missing key yields the int zero value.
  const value = receiver!.pos.get(node);
  return value !== undefined ? value : (0 as int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.getEnd","kind":"method","status":"implemented","sigHash":"41dc188edcc40927a8c14f1a35cfedd6a7e08ad920381f497b1f868fceb866f4"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) getEnd(node triviaPositionKey) int {
 * 	return ct.end[node]
 * }
 */
export function ChangeTrackerWriter_getEnd(receiver: GoPtr<ChangeTrackerWriter>, node: triviaPositionKey): int {
  // Go's map read of a missing key yields the int zero value.
  const value = receiver!.end.get(node);
  return value !== undefined ? value : (0 as int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.setLastNonTriviaPosition","kind":"method","status":"implemented","sigHash":"f0504bc73374f407635e845c2cb871b9b2d0d37fe33b9def0654cc11171acb70"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) setLastNonTriviaPosition(s string, force bool) {
 * 	if force || scanner.SkipTrivia(s, 0) != len(s) {
 * 		ct.lastNonTriviaPosition = ct.textWriter.GetTextPos()
 * 		i := 0
 * 		for stringutil.IsWhiteSpaceLike(rune(s[len(s)-i-1])) {
 * 			i++
 * 		}
 * 		// trim trailing whitespaces
 * 		ct.lastNonTriviaPosition -= i
 * 	}
 * }
 */
export function ChangeTrackerWriter_setLastNonTriviaPosition(receiver: GoPtr<ChangeTrackerWriter>, s: string, force: bool): void {
  const bytes = utf8Encoder.encode(s);
  if (force || SkipTrivia(s, 0 as int) !== byteLen(s)) {
    receiver!.lastNonTriviaPosition = textWriter_GetTextPos(receiver!.__tsgoEmbedded0);
    const trailing = ((): int => {
      const loop = (i: int): int => {
        if (IsWhiteSpaceLike(bytes[bytes.length - i - 1]! as int)) {
          return loop((i + 1) as int);
        }
        return i;
      };
      return loop(0 as int);
    })();
    // trim trailing whitespaces
    receiver!.lastNonTriviaPosition = (receiver!.lastNonTriviaPosition - trailing) as int;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.AssignPositionsToNode","kind":"method","status":"implemented","sigHash":"df34348c3dd44caab84789b23b73690d07ccdde8841999b024a7189f23bf877b"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) AssignPositionsToNode(node *ast.Node, factory *ast.NodeFactory) *ast.Node {
 * 	var visitor *ast.NodeVisitor
 * 	visitor = &ast.NodeVisitor{
 * 		Visit:   func(n *ast.Node) *ast.Node { return ct.assignPositionsToNodeWorker(n, visitor) },
 * 		Factory: factory,
 * 		Hooks: ast.NodeVisitorHooks{
 * 			VisitNode:  ct.assignPositionsToNodeWorker,
 * 			VisitNodes: ct.assignPositionsToNodeArray,
 * 			VisitToken: ct.assignPositionsToNodeWorker,
 * 			VisitModifiers: func(modifiers *ast.ModifierList, v *ast.NodeVisitor) *ast.ModifierList {
 * 				if modifiers != nil {
 * 					newNodeList := ct.assignPositionsToNodeArray(&modifiers.NodeList, v)
 * 					// Return a new ModifierList so that VisitEachChild/Update detects the
 * 					// change and creates a new node with reassigned child positions.
 * 					return factory.NewModifierList(newNodeList.Nodes)
 * 				}
 * 				return modifiers
 * 			},
 * 		},
 * 	}
 * 	return ct.assignPositionsToNodeWorker(node, visitor)
 * }
 */
export function ChangeTrackerWriter_AssignPositionsToNode(receiver: GoPtr<ChangeTrackerWriter>, node: GoPtr<Node>, factory: GoPtr<NodeFactory>): GoPtr<Node> {
  // visitor is assigned first; the Visit closure captures the variable binding so
  // the self-referential call to assignPositionsToNodeWorker sees the final value.
  let visitor: GoPtr<NodeVisitor> = undefined;
  visitor = NewNodeVisitor(
    (n: GoPtr<Node>): GoPtr<Node> => ChangeTrackerWriter_assignPositionsToNodeWorker(receiver, n, visitor),
    factory,
    {
      VisitNode: (n: GoPtr<Node>, v: GoPtr<NodeVisitor>): GoPtr<Node> => ChangeTrackerWriter_assignPositionsToNodeWorker(receiver, n, v),
      VisitNodes: (nodes: GoPtr<NodeList>, v: GoPtr<NodeVisitor>): GoPtr<NodeList> => ChangeTrackerWriter_assignPositionsToNodeArray(receiver, nodes, v),
      VisitToken: (n: GoPtr<Node>, v: GoPtr<NodeVisitor>): GoPtr<Node> => ChangeTrackerWriter_assignPositionsToNodeWorker(receiver, n, v),
      VisitModifiers: (modifiers: GoPtr<ModifierList>, v: GoPtr<NodeVisitor>): GoPtr<ModifierList> => {
        if (modifiers !== undefined) {
          const newNodeList = ChangeTrackerWriter_assignPositionsToNodeArray(receiver, modifiers as unknown as GoPtr<NodeList>, v);
          // Return a new ModifierList so that VisitEachChild/Update detects the
          // change and creates a new node with reassigned child positions.
          return NodeFactory_NewModifierList(factory, newNodeList!.Nodes);
        }
        return modifiers;
      },
      VisitEmbeddedStatement: undefined as never,
      VisitIterationBody: undefined as never,
      VisitParameters: undefined as never,
      VisitFunctionBody: undefined as never,
      VisitTopLevelStatements: undefined as never,
    },
  );
  return ChangeTrackerWriter_assignPositionsToNodeWorker(receiver, node, visitor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.assignPositionsToNodeWorker","kind":"method","status":"implemented","sigHash":"9cc5507d01f59b2b6e64c8a3925c7261c6c108047a0411390dbc7f631153f2ec"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) assignPositionsToNodeWorker(
 * 	node *ast.Node,
 * 	v *ast.NodeVisitor,
 * ) *ast.Node {
 * 	if node == nil {
 * 		return node
 * 	}
 * 	visited := node.VisitEachChild(v)
 * 	// create proxy node for non synthesized nodes
 * 	newNode := visited
 * 	if !ast.NodeIsSynthesized(visited) {
 * 		newNode = visited.Clone(v.Factory)
 * 	}
 * 	newNode.ForEachChild(func(child *ast.Node) bool {
 * 		child.Parent = newNode
 * 		return true
 * 	})
 * 	newNode.Loc = core.NewTextRange(ct.getPos(node), ct.getEnd(node))
 * 	return newNode
 * }
 */
export function ChangeTrackerWriter_assignPositionsToNodeWorker(receiver: GoPtr<ChangeTrackerWriter>, node: GoPtr<Node>, v: GoPtr<NodeVisitor>): GoPtr<Node> {
  if (node === undefined) {
    return node;
  }
  const visited = Node_VisitEachChild(node, v);
  // create proxy node for non synthesized nodes
  let newNode = visited;
  if (!NodeIsSynthesized(visited)) {
    newNode = Node_Clone(visited, v!.Factory as unknown as NodeFactoryCoercible);
  }
  Node_ForEachChild(newNode, (child: GoPtr<Node>): bool => {
    child!.Parent = newNode;
    return true as bool;
  });
  newNode!.Loc = NewTextRange(ChangeTrackerWriter_getPos(receiver, Node_as_triviaPositionKey(node)), ChangeTrackerWriter_getEnd(receiver, Node_as_triviaPositionKey(node)));
  return newNode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.assignPositionsToNodeArray","kind":"method","status":"implemented","sigHash":"e141fab8e838cd07ea02c114a13763488cc71168b0a02955627e74f63795d7d7"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) assignPositionsToNodeArray(
 * 	nodes *ast.NodeList,
 * 	v *ast.NodeVisitor,
 * ) *ast.NodeList {
 * 	visited := v.VisitNodes(nodes)
 * 	if visited == nil {
 * 		return visited
 * 	}
 * 	if nodes == nil {
 * 		// Debug.assert(nodes);
 * 		panic("if nodes is nil, visited should not be nil")
 * 	}
 * 	// clone nodearray if necessary
 * 	nodeArray := visited
 * 	if visited == nodes {
 * 		nodeArray = visited.Clone(v.Factory)
 * 	}
 *
 * 	nodeArray.Loc = core.NewTextRange(ct.getPos(nodes), ct.getEnd(nodes))
 * 	return nodeArray
 * }
 */
export function ChangeTrackerWriter_assignPositionsToNodeArray(receiver: GoPtr<ChangeTrackerWriter>, nodes: GoPtr<NodeList>, v: GoPtr<NodeVisitor>): GoPtr<NodeList> {
  const visited = NodeVisitor_VisitNodes(v, nodes);
  if (visited === undefined) {
    return visited;
  }
  if (nodes === undefined) {
    // Debug.assert(nodes);
    throw new globalThis.Error("if nodes is nil, visited should not be nil");
  }
  // clone nodearray if necessary
  let nodeArray: GoPtr<NodeList> = visited;
  if (visited === nodes) {
    nodeArray = NodeList_Clone(visited, v!.Factory as unknown as NodeFactoryCoercible);
  }
  nodeArray!.Loc = NewTextRange(ChangeTrackerWriter_getPos(receiver, NodeList_as_triviaPositionKey(nodes)), ChangeTrackerWriter_getEnd(receiver, NodeList_as_triviaPositionKey(nodes)));
  return nodeArray;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.Write","kind":"method","status":"implemented","sigHash":"be52f41210e5467498b31fc4660b3e646a2bae51a1b329244ff596a2fdfc9d97"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) Write(text string) {
 * 	ct.textWriter.Write(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_Write(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_Write(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteTrailingSemicolon","kind":"method","status":"implemented","sigHash":"c2e4a0a1ffc7ababbbdc9e5efc92691c8022ce103afe32e8018dd1966809915e"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteTrailingSemicolon(text string) {
 * 	ct.textWriter.WriteTrailingSemicolon(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteTrailingSemicolon(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteTrailingSemicolon(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteComment","kind":"method","status":"implemented","sigHash":"8ebf3f422a918d769ac2e086008726fed54045fae0d466fe498b25d9f38fd29f"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteComment(text string) { ct.textWriter.WriteComment(text) }
 */
export function ChangeTrackerWriter_WriteComment(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteComment(receiver!.__tsgoEmbedded0, text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteKeyword","kind":"method","status":"implemented","sigHash":"3792eb24e56e72a31c4da9d21038e537ce5010a559f0c266a79765b5e19af3c4"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteKeyword(text string) {
 * 	ct.textWriter.WriteKeyword(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteKeyword(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteKeyword(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteOperator","kind":"method","status":"implemented","sigHash":"2b80d4372ab12ef9a4ba4141969d0aab7eeaaeb748dc1880425b4fc3898007c0"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteOperator(text string) {
 * 	ct.textWriter.WriteOperator(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteOperator(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteOperator(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WritePunctuation","kind":"method","status":"implemented","sigHash":"e4df1ad1ef3fd172015402a7a1c944f79ef68f28526ce891b8d36c4c9e0cc1ce"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WritePunctuation(text string) {
 * 	ct.textWriter.WritePunctuation(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WritePunctuation(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WritePunctuation(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteSpace","kind":"method","status":"implemented","sigHash":"9130cdd9a127b113bea05af5c0c876f419a185a50198c2a73b0108105458db6e"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteSpace(text string) {
 * 	ct.textWriter.WriteSpace(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteSpace(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteSpace(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteStringLiteral","kind":"method","status":"implemented","sigHash":"7514c16d7b50bc145bfd7304568b4deb0949c11ec023ce8c17dec1e166fe0932"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteStringLiteral(text string) {
 * 	ct.textWriter.WriteStringLiteral(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteStringLiteral(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteStringLiteral(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteParameter","kind":"method","status":"implemented","sigHash":"1d5c4f841e52014ce798965d872b0daec3d3d443eed2136aa87974a1aaeb4919"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteParameter(text string) {
 * 	ct.textWriter.WriteParameter(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteParameter(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteParameter(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteProperty","kind":"method","status":"implemented","sigHash":"289209c1919cbaa21ca97a2f49b6a00ba64e601529224fa80d79e668081909f1"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteProperty(text string) {
 * 	ct.textWriter.WriteProperty(text)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteProperty(receiver: GoPtr<ChangeTrackerWriter>, text: string): void {
  textWriter_WriteProperty(receiver!.__tsgoEmbedded0, text);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteSymbol","kind":"method","status":"implemented","sigHash":"4f13d013803d2b39afe053f7e59783455e3d623f1276a46a1e230e2c4c81ae24"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteSymbol(text string, symbol *ast.Symbol) {
 * 	ct.textWriter.WriteSymbol(text, symbol)
 * 	ct.setLastNonTriviaPosition(text, false)
 * }
 */
export function ChangeTrackerWriter_WriteSymbol(receiver: GoPtr<ChangeTrackerWriter>, text: string, symbol_: GoPtr<Symbol>): void {
  textWriter_WriteSymbol(receiver!.__tsgoEmbedded0, text, symbol_);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, text, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteLine","kind":"method","status":"implemented","sigHash":"e3e7d2946c90cb9b7503568f7d82c699ad7aa15a4f975d9e92a6853a3bf4b8e7"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteLine()                { ct.textWriter.WriteLine() }
 */
export function ChangeTrackerWriter_WriteLine(receiver: GoPtr<ChangeTrackerWriter>): void {
  textWriter_WriteLine(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteLineForce","kind":"method","status":"implemented","sigHash":"9a05b3b945029bfd04ffce2acceee343ce430544f287e7e757f5a67b6ccf3de3"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteLineForce(force bool) { ct.textWriter.WriteLineForce(force) }
 */
export function ChangeTrackerWriter_WriteLineForce(receiver: GoPtr<ChangeTrackerWriter>, force: bool): void {
  textWriter_WriteLineForce(receiver!.__tsgoEmbedded0, force);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.IncreaseIndent","kind":"method","status":"implemented","sigHash":"278ad53cbbe4875cf69851d5ff60310601cc4bd6cb59acd317270c3315fab23a"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) IncreaseIndent()           { ct.textWriter.IncreaseIndent() }
 */
export function ChangeTrackerWriter_IncreaseIndent(receiver: GoPtr<ChangeTrackerWriter>): void {
  textWriter_IncreaseIndent(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.DecreaseIndent","kind":"method","status":"implemented","sigHash":"c8943603cd8db3d8e3f01a186c75e25e4c316d058fd506b216b10b92c4b7433c"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) DecreaseIndent()           { ct.textWriter.DecreaseIndent() }
 */
export function ChangeTrackerWriter_DecreaseIndent(receiver: GoPtr<ChangeTrackerWriter>): void {
  textWriter_DecreaseIndent(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.Clear","kind":"method","status":"implemented","sigHash":"8fab5a2514664004bcfc8f3ee0300c3a7e05ff104a20819461670751892814f6"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) Clear()                    { ct.textWriter.Clear(); ct.lastNonTriviaPosition = 0 }
 */
export function ChangeTrackerWriter_Clear(receiver: GoPtr<ChangeTrackerWriter>): void {
  textWriter_Clear(receiver!.__tsgoEmbedded0);
  receiver!.lastNonTriviaPosition = 0 as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.String","kind":"method","status":"implemented","sigHash":"c6571688b2613fdec97b8f1b72d287e54e5ea849e1003a9c28a02ff6f2c93a38"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) String() string            { return ct.textWriter.String() }
 */
export function ChangeTrackerWriter_String(receiver: GoPtr<ChangeTrackerWriter>): string {
  return textWriter_String(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.RawWrite","kind":"method","status":"implemented","sigHash":"dbcabfd2431250e93a4f6b17766242b4469eccad0e8f142504a8c696d0f9804d"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) RawWrite(s string) {
 * 	ct.textWriter.RawWrite(s)
 * 	ct.setLastNonTriviaPosition(s, false)
 * }
 */
export function ChangeTrackerWriter_RawWrite(receiver: GoPtr<ChangeTrackerWriter>, s: string): void {
  textWriter_RawWrite(receiver!.__tsgoEmbedded0, s);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, s, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.WriteLiteral","kind":"method","status":"implemented","sigHash":"0e45f1473ce6338dde6a4d1d6a45f1f52fc82bf149cf63154744759d5d7a89f9"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) WriteLiteral(s string) {
 * 	ct.textWriter.WriteLiteral(s)
 * 	ct.setLastNonTriviaPosition(s, true)
 * }
 */
export function ChangeTrackerWriter_WriteLiteral(receiver: GoPtr<ChangeTrackerWriter>, s: string): void {
  textWriter_WriteLiteral(receiver!.__tsgoEmbedded0, s);
  ChangeTrackerWriter_setLastNonTriviaPosition(receiver, s, true as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.GetTextPos","kind":"method","status":"implemented","sigHash":"4be9630143c1fc3c512143d3ee34f73624aa35c16c879d5220d976ab50ea50a1"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) GetTextPos() int             { return ct.textWriter.GetTextPos() }
 */
export function ChangeTrackerWriter_GetTextPos(receiver: GoPtr<ChangeTrackerWriter>): int {
  return textWriter_GetTextPos(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.GetLine","kind":"method","status":"implemented","sigHash":"ad1acf6e04112609fc420bf666a26176be2d903561436a5ba6d0468e05b554d6"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) GetLine() int                { return ct.textWriter.GetLine() }
 */
export function ChangeTrackerWriter_GetLine(receiver: GoPtr<ChangeTrackerWriter>): int {
  return textWriter_GetLine(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.GetColumn","kind":"method","status":"implemented","sigHash":"3aebfbeb103ee99a4eead48760355a67ee94e7b6a055283c7924a570745864ab"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) GetColumn() core.UTF16Offset { return ct.textWriter.GetColumn() }
 */
export function ChangeTrackerWriter_GetColumn(receiver: GoPtr<ChangeTrackerWriter>): UTF16Offset {
  return textWriter_GetColumn(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.GetIndent","kind":"method","status":"implemented","sigHash":"47af60ebd5adf84b927adf570a63f2bce37587e3485f4765f7e16be2574e5501"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) GetIndent() int              { return ct.textWriter.GetIndent() }
 */
export function ChangeTrackerWriter_GetIndent(receiver: GoPtr<ChangeTrackerWriter>): int {
  return textWriter_GetIndent(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.IsAtStartOfLine","kind":"method","status":"implemented","sigHash":"0c1a1ae2db7e23e60e19250881560ff37052104c629f832839448be53991f0e7"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) IsAtStartOfLine() bool       { return ct.textWriter.IsAtStartOfLine() }
 */
export function ChangeTrackerWriter_IsAtStartOfLine(receiver: GoPtr<ChangeTrackerWriter>): bool {
  return textWriter_IsAtStartOfLine(receiver!.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.HasTrailingComment","kind":"method","status":"implemented","sigHash":"34db950a0fe5318dcab045ee015a9d2d2c5481c3168df3cb5b613e7c5a238757"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) HasTrailingComment() bool    { return ct.textWriter.HasTrailingComment() }
 */
export function ChangeTrackerWriter_HasTrailingComment(receiver: GoPtr<ChangeTrackerWriter>): bool {
  return textWriter_HasTrailingComment(receiver!.__tsgoEmbedded0!);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/changetrackerwriter.go::method::ChangeTrackerWriter.HasTrailingWhitespace","kind":"method","status":"implemented","sigHash":"71a2e4cb1282e6b7cf16b4fe8e135a4b172437ed2461753efe13ee982e40537f"}
 *
 * Go source:
 * func (ct *ChangeTrackerWriter) HasTrailingWhitespace() bool {
 * 	return ct.textWriter.HasTrailingWhitespace()
 * }
 */
export function ChangeTrackerWriter_HasTrailingWhitespace(receiver: GoPtr<ChangeTrackerWriter>): bool {
  return textWriter_HasTrailingWhitespace(receiver!.__tsgoEmbedded0);
}
