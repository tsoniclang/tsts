import type { GoPtr } from "../../../go/compat.js";
import type { Node } from "../../ast/spine.js";
import { Node_SubtreeFacts } from "../../ast/spine.js";
import type { BinaryExpression } from "../../ast/generated/data.js";
import { AsBinaryExpression } from "../../ast/generated/casts.js";
import { KindBinaryExpression, KindQuestionQuestionToken, KindColonToken, KindQuestionToken } from "../../ast/generated/kinds.js";
import { NewConditionalExpression, NewToken } from "../../ast/generated/factory.js";
import { SubtreeContainsNullishCoalescing } from "../../ast/subtreefacts.js";
import { NodeVisitor_VisitEachChild, NodeVisitor_VisitNode } from "../../ast/visitor.js";
import type { NodeVisitor as ConcreteNodeVisitor } from "../../ast/visitor.js";
import { EmitContext_AddVariableDeclaration } from "../../printer/emitcontext.js";
import { NodeFactory_NewAssignmentExpression, NodeFactory_NewTempVariable } from "../../printer/factory.js";
import type { TransformOptions } from "../chain.js";
import type { Transformer } from "../transformer.js";
import { Transformer_EmitContext, Transformer_Factory, Transformer_NewTransformer, Transformer_Visitor } from "../transformer.js";
import { IsSimpleCopiableExpression } from "../utilities.js";
import { createNotNullCondition } from "./utilities.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/estransforms/nullishcoalescing.go::type::nullishCoalescingTransformer","kind":"type","status":"implemented","sigHash":"f4065d25347ac4061b7af6d3bf42592df0bc8bbfec61f56c03593dbb7e4f8b62"}
 *
 * Go source:
 * nullishCoalescingTransformer struct {
 * 	transformers.Transformer
 * }
 */
export interface nullishCoalescingTransformer {
  __tsgoEmbedded0: Transformer;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/estransforms/nullishcoalescing.go::method::nullishCoalescingTransformer.visit","kind":"method","status":"implemented","sigHash":"a39451f7bffd2d9f965f4475e2105cc0b2ba9ca3607309a415ded3a733de7552"}
 *
 * Go source:
 * func (ch *nullishCoalescingTransformer) visit(node *ast.Node) *ast.Node {
 * 	if node.SubtreeFacts()&ast.SubtreeContainsNullishCoalescing == 0 {
 * 		return node
 * 	}
 * 	switch node.Kind {
 * 	case ast.KindBinaryExpression:
 * 		return ch.visitBinaryExpression(node.AsBinaryExpression())
 * 	default:
 * 		return ch.Visitor().VisitEachChild(node)
 * 	}
 * }
 */
export function nullishCoalescingTransformer_visit(receiver: GoPtr<nullishCoalescingTransformer>, node: GoPtr<Node>): GoPtr<Node> {
  if ((Node_SubtreeFacts(node) & SubtreeContainsNullishCoalescing) === 0) {
    return node;
  }
  switch (node!.Kind) {
    case KindBinaryExpression:
      return nullishCoalescingTransformer_visitBinaryExpression(receiver, AsBinaryExpression(node));
    default:
      return NodeVisitor_VisitEachChild(Transformer_Visitor(receiver!.__tsgoEmbedded0) as ConcreteNodeVisitor, node);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/estransforms/nullishcoalescing.go::method::nullishCoalescingTransformer.visitBinaryExpression","kind":"method","status":"implemented","sigHash":"611efa27abe4213570f4419936858063218b97635130c33b8e236b046c24114e"}
 *
 * Go source:
 * func (ch *nullishCoalescingTransformer) visitBinaryExpression(node *ast.BinaryExpression) *ast.Node {
 * 	switch node.OperatorToken.Kind {
 * 	case ast.KindQuestionQuestionToken:
 * 		left := ch.Visitor().VisitNode(node.Left)
 * 		right := left
 * 		if !transformers.IsSimpleCopiableExpression(left) {
 * 			right = ch.Factory().NewTempVariable()
 * 			ch.EmitContext().AddVariableDeclaration(right)
 * 			left = ch.Factory().NewAssignmentExpression(right, left)
 * 		}
 * 		return ch.Factory().NewConditionalExpression(
 * 			createNotNullCondition(ch.EmitContext(), left, right, false),
 * 			ch.Factory().NewToken(ast.KindQuestionToken),
 * 			right,
 * 			ch.Factory().NewToken(ast.KindColonToken),
 * 			ch.Visitor().VisitNode(node.Right),
 * 		)
 * 	default:
 * 		return ch.Visitor().VisitEachChild(node.AsNode())
 * 	}
 * }
 */
export function nullishCoalescingTransformer_visitBinaryExpression(receiver: GoPtr<nullishCoalescingTransformer>, node: GoPtr<BinaryExpression>): GoPtr<Node> {
  const visitor = Transformer_Visitor(receiver!.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const printerFactory = Transformer_Factory(receiver!.__tsgoEmbedded0);
  const astFactory = printerFactory!.__tsgoEmbedded0!;
  const emitCtx = Transformer_EmitContext(receiver!.__tsgoEmbedded0);

  switch (node!.OperatorToken!.Kind) {
    case KindQuestionQuestionToken: {
      let left = NodeVisitor_VisitNode(visitor, node!.Left);
      let right = left;
      if (!IsSimpleCopiableExpression(left)) {
        right = NodeFactory_NewTempVariable(printerFactory);
        EmitContext_AddVariableDeclaration(emitCtx, right);
        left = NodeFactory_NewAssignmentExpression(printerFactory, right, left);
      }
      return NewConditionalExpression(
        astFactory,
        createNotNullCondition(emitCtx, left, right, false as never),
        NewToken(astFactory, KindQuestionToken),
        right,
        NewToken(astFactory, KindColonToken),
        NodeVisitor_VisitNode(visitor, node!.Right),
      );
    }
    default:
      return NodeVisitor_VisitEachChild(visitor, node as unknown as GoPtr<Node>);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/estransforms/nullishcoalescing.go::func::newNullishCoalescingTransformer","kind":"func","status":"implemented","sigHash":"4e9f9607161ee0db118659b729bc627d12ea4f44d6c82e4994c3a6a159f5da36"}
 *
 * Go source:
 * func newNullishCoalescingTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
 * 	tx := &nullishCoalescingTransformer{}
 * 	return tx.NewTransformer(tx.visit, opts.Context)
 * }
 */
export function newNullishCoalescingTransformer(opts: GoPtr<TransformOptions>): GoPtr<Transformer> {
  const tx: nullishCoalescingTransformer = {
    __tsgoEmbedded0: { emitContext: undefined, factory: undefined, visitor: undefined },
  };
  return Transformer_NewTransformer(tx.__tsgoEmbedded0, (node) => nullishCoalescingTransformer_visit(tx, node), opts!.Context);
}
