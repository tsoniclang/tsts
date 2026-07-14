import type { bool, int } from "../../go/scalars.js";
import type { GoPointerMethodSet, GoPtr, GoSlice } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend, GoSliceAppendSlice } from "../../go/compat.js";
import { GoAppend, GoAppendSlice, GoMapIsNil, GoNilSlice } from "../../go/compat.js";
import { Itoa } from "../../go/strconv.js";
import type { Node, NodeFactoryCoercible, NodeList } from "../ast/spine.js";
import { NewNodeFactory as NewAstNodeFactory, NodeFactory_AsNodeFactory as AstNodeFactory_AsNodeFactory, NodeFactory_NewNodeList, Node_Clone, Node_Name } from "../ast/spine.js";
import type { NodeFactory as NodeFactory_88523d1c } from "../ast/generated/factory.js";
import type { LabeledStatement, NonNullExpression, ParenthesizedExpression, PartiallyEmittedExpression, SatisfiesExpression, AsExpression, ExpressionWithTypeArguments, VariableDeclaration, VariableDeclarationList } from "../ast/generated/data.js";
import { GetNonAssignedNameOfDeclaration, GetNameOfDeclaration, HasSyntacticModifier, IsMemberName, IsNodeDescendantOf, IsPrologueDirective, NodeIsSynthesized, RangeIsSynthesized, GetNodeId, TryGetPropertyNameOfBindingOrAssignmentElement, IsOuterExpression, OEKAll } from "../ast/utilities.js";
import type { OuterExpressionKinds } from "../ast/utilities.js";
import { Node_Expression, Node_Text, Node_Type, Node_TypeArgumentList, NodeFactory_UpdateAsExpression, NodeFactory_UpdateExpressionWithTypeArguments, NodeFactory_UpdateLabeledStatement, NodeFactory_UpdateNonNullExpression, NodeFactory_UpdateParenthesizedExpression, NodeFactory_UpdatePartiallyEmittedExpression, NodeFactory_UpdateSatisfiesExpression, NodeFactory_UpdateVariableDeclaration, NodeFactory_UpdateVariableDeclarationList } from "../ast/ast.js";
import { ModifierFlagsExport } from "../ast/modifierflags.js";
import { FormatGeneratedName } from "./utilities.js";
import {
  NewArrayLiteralExpression,
  NewArrowFunction,
  NewBinaryExpression,
  NewBlock,
  NewCallExpression,
  NewConditionalExpression,
  NewElementAccessExpression,
  NewExportAssignment,
  NewExportDeclaration,
  NewExportSpecifier,
  NewExpressionStatement,
  NewFunctionExpression,
  NewIdentifier,
  NewKeywordExpression,
  NewNamedExports,
  NewNumericLiteral,
  NewObjectLiteralExpression,
  NewParameterDeclaration,
  NewParenthesizedExpression,
  NewPrivateIdentifier,
  NewPropertyAccessExpression,
  NewPropertyAssignment,
  NewSetAccessorDeclaration,
  NewStringLiteral,
  NewToken,
  NewTypeOfExpression,
  NewVariableDeclarationList,
  NewVariableStatement,
  NewVoidExpression,
} from "../ast/generated/factory.js";
import type { BlockNode, Declaration, Expression, IdentifierNode, PrivateIdentifierNode, Statement, StringLiteralNode, VariableDeclarationNodeList } from "../ast/generated/unions.js";
import { AsBinaryExpression, AsAsExpression, AsExpressionWithTypeArguments, AsLabeledStatement, AsNonNullExpression, AsParenthesizedExpression, AsPartiallyEmittedExpression, AsQualifiedName, AsSatisfiesExpression, AsTypeAssertion, AsVariableDeclaration, AsVariableDeclarationList } from "../ast/generated/casts.js";
import { IsBinaryExpression, IsCallExpression, IsComputedPropertyName, IsIdentifier, IsLabeledStatement, IsParenthesizedExpression, IsPrivateIdentifier, IsQualifiedName, IsVariableDeclarationList } from "../ast/generated/predicates.js";
import type { NodeFlags } from "../ast/generated/flags.js";
import { NodeFlagsNone, NodeFlagsOptionalChain } from "../ast/generated/flags.js";
import { KindAmpersandAmpersandToken, KindAsExpression, KindAsteriskToken, KindBarBarToken, KindBigIntLiteral, KindColonToken, KindCommaToken, KindEqualsEqualsEqualsToken, KindEqualsGreaterThanToken, KindEqualsToken, KindExclamationEqualsEqualsToken, KindExpressionWithTypeArguments, KindFalseKeyword, KindIdentifier, KindInKeyword, KindJsxNamespacedName, KindNoSubstitutionTemplateLiteral, KindNonNullExpression, KindNullKeyword, KindNumericLiteral, KindPartiallyEmittedExpression, KindParenthesizedExpression, KindPlusToken, KindPrivateIdentifier, KindQuestionToken, KindRegularExpressionLiteral, KindSatisfiesExpression, KindStringLiteral, KindTemplateTail, KindTemplateHead, KindTemplateMiddle, KindThisKeyword, KindTrueKeyword, KindTypeAssertionExpression } from "../ast/generated/kinds.js";
import { TokenFlagsNone } from "../ast/tokenflags.js";
import { IfElse } from "../core/core.js";
import type { ScriptTarget } from "../core/compileroptions.js";
import type { TextRange } from "../core/text.js";
import type { AutoGenerateOptions, EmitContext, AutoGenerateId, AutoGenerateInfo } from "./emitcontext.js";
import { EmitContext_AddEmitFlags, EmitContext_AssignCommentAndSourceMapRanges, EmitContext_CommentRange, EmitContext_EmitFlags, EmitContext_HasAutoGenerateInfo, EmitContext_RequestEmitHelper, EmitContext_SetEmitFlags, EmitContext_SourceMapRange, EmitContext_getNodeForGeneratedNameWorker, EmitContext_onClone, EmitContext_onCreate, EmitContext_onUpdate, nextAutoGenerateId } from "./emitcontext.js";
import type { EmitFlags } from "./emitflags.js";
import { EFAsyncFunctionBody, EFCustomPrologue, EFExportName, EFHelperName, EFLocalName, EFNoComments, EFNoSourceMap, EFNone, EFReuseTempVariableScope } from "./emitflags.js";
import { addDisposableResourceHelper, asyncDelegatorHelper, asyncGeneratorHelper, asyncValuesHelper, awaiterHelper, awaitHelper, classPrivateFieldGetHelper, classPrivateFieldInHelper, classPrivateFieldSetHelper, decorateHelper, disposeResourcesHelper, esDecorateHelper, exportStarHelper, importDefaultHelper, importStarHelper, makeTemplateObjectHelper, metadataHelper, paramHelper, propKeyHelper, restHelper, rewriteRelativeImportExtensionsHelper, runInitializersHelper, setFunctionNameHelper } from "./helpers.js";
import type { GeneratedIdentifierFlags } from "./generatedidentifierflags.js";
import { GeneratedIdentifierFlagsAuto, GeneratedIdentifierFlagsKindMask, GeneratedIdentifierFlagsLoop, GeneratedIdentifierFlagsNode, GeneratedIdentifierFlagsOptimistic, GeneratedIdentifierFlagsUnique } from "./generatedidentifierflags.js";
import { GoSliceBuild, GoSliceMake, GoSliceStore } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::type::NodeFactory","kind":"type","status":"implemented","sigHash":"a712ecc9d60b4ded4861ea18bb957773602cb73b7775e87938062ca2de6cfd5f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The hidden pointer-method carrier statically exposes the Go pointer receiver set without adding value methods, reflection, prototype mutation, or a wrapper object.","goSignatureHash":"0f3846dcdcb4c3a6b17a7ec53b8d2da74981cca95e3998a9812cea968d5a4f7f","tsSignatureHash":"fca8a2d43aaa5a15d83ca16a93708068515ce38ba7ff1d1c106f840cf08df43a"}
 *
 * Go source:
 * NodeFactory struct {
 * 	ast.NodeFactory
 * 	emitContext *EmitContext
 * }
 */
export interface NodeFactory {
  __tsgoEmbedded0: NodeFactory_88523d1c;
  emitContext: GoPtr<EmitContext>;
  readonly [__tsgoPointerMethodSet]?: GoPointerMethodSet<{
    AsNodeFactory(): GoPtr<NodeFactory_88523d1c>;
  }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::func::NewNodeFactory","kind":"func","status":"implemented","sigHash":"580750f8820bc9f53e1feb77e23e6325616c0c74c53aab83bf8128ee179d8a45"}
 *
 * Go source:
 * func NewNodeFactory(context *EmitContext) *NodeFactory {
 * 	return &NodeFactory{
 * 		NodeFactory: *ast.NewNodeFactory(ast.NodeFactoryHooks{
 * 			OnCreate: context.onCreate,
 * 			OnUpdate: context.onUpdate,
 * 			OnClone:  context.onClone,
 * 		}),
 * 		emitContext: context,
 * 	}
 * }
 */
export function NewNodeFactory(context: GoPtr<EmitContext>): GoPtr<NodeFactory> {
  const embedded = NewAstNodeFactory({
    OnCreate: (node) => EmitContext_onCreate(context, node),
    OnUpdate: (updated, original) => EmitContext_onUpdate(context, updated, original),
    OnClone: (updated, original) => EmitContext_onClone(context, updated, original),
  })!;
  return {
    // Go embeds the value `*ast.NewNodeFactory(...)`; the `*` dereference is
    // expressed here via the non-null assertion on the returned GoPtr.
    __tsgoEmbedded0: embedded,
    AsNodeFactory: () => AstNodeFactory_AsNodeFactory(embedded),
    emitContext: context,
  };
}

function normalizeAutoGenerateOptions(options: GoPtr<AutoGenerateOptions>): AutoGenerateOptions {
  return {
    Flags: (options?.Flags ?? 0) as GeneratedIdentifierFlags,
    Prefix: options?.Prefix ?? "",
    Suffix: options?.Suffix ?? "",
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.newGeneratedIdentifier","kind":"method","status":"implemented","sigHash":"bd65bc9bb79cb9b5e957beb9597f38912038626f7684e4bfd9a342fcfddaf2b3"}
 *
 * Go source:
 * func (f *NodeFactory) newGeneratedIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
 * 	id := AutoGenerateId(nextAutoGenerateId.Add(1))
 * 
 * 	if len(text) == 0 {
 * 		switch {
 * 		case node == nil:
 * 			text = fmt.Sprintf("(auto@%d)", id)
 * 		case ast.IsMemberName(node):
 * 			text = node.Text()
 * 		default:
 * 			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(f.emitContext.getNodeForGeneratedNameWorker(node, id)))
 * 		}
 * 		text = FormatGeneratedName(false /*privateName* /, options.Prefix, text, options.Suffix)
 * 	}
 * 
 * 	name := f.NewIdentifier(text)
 * 	autoGenerate := &AutoGenerateInfo{
 * 		Id:     id,
 * 		Flags:  kind | (options.Flags & ^GeneratedIdentifierFlagsKindMask),
 * 		Prefix: options.Prefix,
 * 		Suffix: options.Suffix,
 * 		Node:   node,
 * 	}
 * 	if f.emitContext.autoGenerate == nil {
 * 		f.emitContext.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
 * 	}
 * 	f.emitContext.autoGenerate[name] = autoGenerate
 * 	return name
 * }
 */
export function NodeFactory_newGeneratedIdentifier(receiver: GoPtr<NodeFactory>, kind: GeneratedIdentifierFlags, text: string, node: GoPtr<Node>, options: AutoGenerateOptions): GoPtr<IdentifierNode> {
  options = normalizeAutoGenerateOptions(options);
  const id = nextAutoGenerateId.Add(1 as never) as AutoGenerateId;

  if (text.length === 0) {
    if (node === undefined) {
      text = `(auto@${id})`;
    } else if (IsMemberName(node)) {
      text = Node_Text(node);
    } else {
      text = `(generated@${GetNodeId(EmitContext_getNodeForGeneratedNameWorker(receiver!.emitContext, node, id))})`;
    }
    text = FormatGeneratedName(false, options.Prefix, text, options.Suffix);
  }

  const name = NewIdentifier(receiver!.__tsgoEmbedded0!, text);
  const autoGenerate: AutoGenerateInfo = {
    Id: id,
    Flags: (kind | (options.Flags & ~GeneratedIdentifierFlagsKindMask)) as GeneratedIdentifierFlags,
    Prefix: options.Prefix,
    Suffix: options.Suffix,
    Node: node,
  };
  if (GoMapIsNil(receiver!.emitContext!.autoGenerate)) {
    receiver!.emitContext!.autoGenerate = new globalThis.Map();
  }
  receiver!.emitContext!.autoGenerate.set(name, autoGenerate);
  return name;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewTempVariable","kind":"method","status":"implemented","sigHash":"82a36806ba1375429dc2fe965f71593fb56e12f85d45fc6a8b8295e7c9e28720"}
 *
 * Go source:
 * func (f *NodeFactory) NewTempVariable() *ast.IdentifierNode {
 * 	return f.NewTempVariableEx(AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewTempVariable(receiver: GoPtr<NodeFactory>): GoPtr<IdentifierNode> {
  return NodeFactory_NewTempVariableEx(receiver, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewTempVariableEx","kind":"method","status":"implemented","sigHash":"14946e84a4bc9ffe771c29a3063f0db7cf2aea79db8770203071611fe007b5d8"}
 *
 * Go source:
 * func (f *NodeFactory) NewTempVariableEx(options AutoGenerateOptions) *ast.IdentifierNode {
 * 	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsAuto, "", nil /*node* /, options)
 * }
 */
export function NodeFactory_NewTempVariableEx(receiver: GoPtr<NodeFactory>, options: AutoGenerateOptions): GoPtr<IdentifierNode> {
  return NodeFactory_newGeneratedIdentifier(receiver, GeneratedIdentifierFlagsAuto, "", undefined, options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewLoopVariable","kind":"method","status":"implemented","sigHash":"1d6990751bc9808c364025ee8946039340e2c76f30847657e5bf46577ab6286e"}
 *
 * Go source:
 * func (f *NodeFactory) NewLoopVariable() *ast.IdentifierNode {
 * 	return f.NewLoopVariableEx(AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewLoopVariable(receiver: GoPtr<NodeFactory>): GoPtr<IdentifierNode> {
  return NodeFactory_NewLoopVariableEx(receiver, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewLoopVariableEx","kind":"method","status":"implemented","sigHash":"f982fa035cca4fcbe6b73b0dd504daa6f8928a191e0c49935c18e63737cd8ba1"}
 *
 * Go source:
 * func (f *NodeFactory) NewLoopVariableEx(options AutoGenerateOptions) *ast.IdentifierNode {
 * 	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsLoop, "", nil /*node* /, options)
 * }
 */
export function NodeFactory_NewLoopVariableEx(receiver: GoPtr<NodeFactory>, options: AutoGenerateOptions): GoPtr<IdentifierNode> {
  return NodeFactory_newGeneratedIdentifier(receiver, GeneratedIdentifierFlagsLoop, "", undefined, options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewUniqueName","kind":"method","status":"implemented","sigHash":"62b7e9d742f2b2a6f113311d77ad7468efd954172f25ef7c1c15dd87e68b0250"}
 *
 * Go source:
 * func (f *NodeFactory) NewUniqueName(text string) *ast.IdentifierNode {
 * 	return f.NewUniqueNameEx(text, AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewUniqueName(receiver: GoPtr<NodeFactory>, text: string): GoPtr<IdentifierNode> {
  return NodeFactory_NewUniqueNameEx(receiver, text, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewUniqueNameEx","kind":"method","status":"implemented","sigHash":"4a887d0043c470a9885d600189d291a5eef33118b22e4e78eef7573789b30263"}
 *
 * Go source:
 * func (f *NodeFactory) NewUniqueNameEx(text string, options AutoGenerateOptions) *ast.IdentifierNode {
 * 	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node* /, options)
 * }
 */
export function NodeFactory_NewUniqueNameEx(receiver: GoPtr<NodeFactory>, text: string, options: AutoGenerateOptions): GoPtr<IdentifierNode> {
  return NodeFactory_newGeneratedIdentifier(receiver, GeneratedIdentifierFlagsUnique, text, undefined, options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewGeneratedNameForNode","kind":"method","status":"implemented","sigHash":"648a5abf3a3d81c984a76b38aff83d82e15334a48c52786c77f658d9fdd0ca73"}
 *
 * Go source:
 * func (f *NodeFactory) NewGeneratedNameForNode(node *ast.Node) *ast.IdentifierNode {
 * 	return f.NewGeneratedNameForNodeEx(node, AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewGeneratedNameForNode(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>): GoPtr<IdentifierNode> {
  return NodeFactory_NewGeneratedNameForNodeEx(receiver, node, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewGeneratedNameForNodeEx","kind":"method","status":"implemented","sigHash":"8d95ba42041e939336947d58112146f3a26b4bc73a3e329bd23bf29b1c5e9196"}
 *
 * Go source:
 * func (f *NodeFactory) NewGeneratedNameForNodeEx(node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
 * 	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
 * 		options.Flags |= GeneratedIdentifierFlagsOptimistic
 * 	}
 *
 * 	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
 * }
 */
export function NodeFactory_NewGeneratedNameForNodeEx(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>, options: AutoGenerateOptions): GoPtr<IdentifierNode> {
  options = normalizeAutoGenerateOptions(options);
  // Go passes `options` by value; the |= below mutates that local copy only.
  const opts: AutoGenerateOptions = options.Prefix.length > 0 || options.Suffix.length > 0
    ? { Flags: options.Flags | GeneratedIdentifierFlagsOptimistic, Prefix: options.Prefix, Suffix: options.Suffix }
    : options;
  return NodeFactory_newGeneratedIdentifier(receiver, GeneratedIdentifierFlagsNode, "", node, opts);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.newGeneratedPrivateIdentifier","kind":"method","status":"implemented","sigHash":"a1b3679d9370a830c39f55d9d0440eb130ffa0e6cfd218bf2f6a3c3ed2d47d8c"}
 *
 * Go source:
 * func (f *NodeFactory) newGeneratedPrivateIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
 * 	id := AutoGenerateId(nextAutoGenerateId.Add(1))
 * 
 * 	if len(text) == 0 {
 * 		switch {
 * 		case node == nil:
 * 			text = fmt.Sprintf("(auto@%d)", id)
 * 		case ast.IsMemberName(node):
 * 			text = node.Text()
 * 		default:
 * 			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(f.emitContext.getNodeForGeneratedNameWorker(node, id)))
 * 		}
 * 		text = FormatGeneratedName(true /*privateName* /, options.Prefix, text, options.Suffix)
 * 	} else if !strings.HasPrefix(text, "#") {
 * 		panic("First character of private identifier must be #: " + text)
 * 	}
 * 
 * 	name := f.NewPrivateIdentifier(text)
 * 	autoGenerate := &AutoGenerateInfo{
 * 		Id:     id,
 * 		Flags:  kind | (options.Flags &^ GeneratedIdentifierFlagsKindMask),
 * 		Prefix: options.Prefix,
 * 		Suffix: options.Suffix,
 * 		Node:   node,
 * 	}
 * 	if f.emitContext.autoGenerate == nil {
 * 		f.emitContext.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
 * 	}
 * 	f.emitContext.autoGenerate[name] = autoGenerate
 * 	return name
 * }
 */
export function NodeFactory_newGeneratedPrivateIdentifier(receiver: GoPtr<NodeFactory>, kind: GeneratedIdentifierFlags, text: string, node: GoPtr<Node>, options: AutoGenerateOptions): GoPtr<PrivateIdentifierNode> {
  options = normalizeAutoGenerateOptions(options);
  const id = nextAutoGenerateId.Add(1 as never) as AutoGenerateId;

  if (text.length === 0) {
    if (node === undefined) {
      text = `(auto@${id})`;
    } else if (IsMemberName(node)) {
      text = Node_Text(node);
    } else {
      text = `(generated@${GetNodeId(EmitContext_getNodeForGeneratedNameWorker(receiver!.emitContext, node, id))})`;
    }
    text = FormatGeneratedName(true, options.Prefix, text, options.Suffix);
  } else if (!text.startsWith("#")) {
    throw new globalThis.Error("First character of private identifier must be #: " + text);
  }

  const name = NewPrivateIdentifier(receiver!.__tsgoEmbedded0!, text);
  const autoGenerate: AutoGenerateInfo = {
    Id: id,
    Flags: (kind | (options.Flags & ~GeneratedIdentifierFlagsKindMask)) as GeneratedIdentifierFlags,
    Prefix: options.Prefix,
    Suffix: options.Suffix,
    Node: node,
  };
  if (GoMapIsNil(receiver!.emitContext!.autoGenerate)) {
    receiver!.emitContext!.autoGenerate = new globalThis.Map();
  }
  receiver!.emitContext!.autoGenerate.set(name, autoGenerate);
  return name;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewUniquePrivateName","kind":"method","status":"implemented","sigHash":"3521092f17b34dfd90c8e9b445f16cb8dd725b27e169c65f94ce43c1d6a6c545"}
 *
 * Go source:
 * func (f *NodeFactory) NewUniquePrivateName(text string) *ast.PrivateIdentifierNode {
 * 	return f.NewUniquePrivateNameEx(text, AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewUniquePrivateName(receiver: GoPtr<NodeFactory>, text: string): GoPtr<PrivateIdentifierNode> {
  return NodeFactory_NewUniquePrivateNameEx(receiver, text, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewUniquePrivateNameEx","kind":"method","status":"implemented","sigHash":"6c5bbcf503197a3a0ed9a1d89823e35232b7b58bb5daf5183ea50c7aaf66f2d8"}
 *
 * Go source:
 * func (f *NodeFactory) NewUniquePrivateNameEx(text string, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
 * 	return f.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node* /, options)
 * }
 */
export function NodeFactory_NewUniquePrivateNameEx(receiver: GoPtr<NodeFactory>, text: string, options: AutoGenerateOptions): GoPtr<PrivateIdentifierNode> {
  return NodeFactory_newGeneratedPrivateIdentifier(receiver, GeneratedIdentifierFlagsUnique, text, undefined, options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewGeneratedPrivateNameForNode","kind":"method","status":"implemented","sigHash":"36751f7e71dee552216d9761146120cec6f8073e2cbffd48a13c5e6dcf394b71"}
 *
 * Go source:
 * func (f *NodeFactory) NewGeneratedPrivateNameForNode(node *ast.Node) *ast.PrivateIdentifierNode {
 * 	return f.NewGeneratedPrivateNameForNodeEx(node, AutoGenerateOptions{})
 * }
 */
export function NodeFactory_NewGeneratedPrivateNameForNode(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>): GoPtr<PrivateIdentifierNode> {
  return NodeFactory_NewGeneratedPrivateNameForNodeEx(receiver, node, { Flags: 0, Prefix: "", Suffix: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewGeneratedPrivateNameForNodeEx","kind":"method","status":"implemented","sigHash":"10b59414fc3eccbf19ad387c1b5cfd25f3893d8248b2610683d23e0f00e404db"}
 *
 * Go source:
 * func (f *NodeFactory) NewGeneratedPrivateNameForNodeEx(node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
 * 	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
 * 		options.Flags |= GeneratedIdentifierFlagsOptimistic
 * 	}
 *
 * 	return f.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
 * }
 */
export function NodeFactory_NewGeneratedPrivateNameForNodeEx(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>, options: AutoGenerateOptions): GoPtr<PrivateIdentifierNode> {
  options = normalizeAutoGenerateOptions(options);
  // Go passes `options` by value; the |= below mutates that local copy only.
  const opts: AutoGenerateOptions = options.Prefix.length > 0 || options.Suffix.length > 0
    ? { Flags: options.Flags | GeneratedIdentifierFlagsOptimistic, Prefix: options.Prefix, Suffix: options.Suffix }
    : options;
  return NodeFactory_newGeneratedPrivateIdentifier(receiver, GeneratedIdentifierFlagsNode, "", node, opts);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewStringLiteralFromNode","kind":"method","status":"implemented","sigHash":"29f6805ae74e9d73d3ee131816e4f3711134b1b412a8270441ea0b6412a6c48f"}
 *
 * Go source:
 * func (f *NodeFactory) NewStringLiteralFromNode(textSourceNode *ast.Node) *ast.Node {
 * 	var text string
 * 	switch textSourceNode.Kind {
 * 	case ast.KindIdentifier,
 * 		ast.KindPrivateIdentifier,
 * 		ast.KindJsxNamespacedName,
 * 		ast.KindStringLiteral,
 * 		ast.KindNumericLiteral,
 * 		ast.KindBigIntLiteral,
 * 		ast.KindNoSubstitutionTemplateLiteral,
 * 		ast.KindTemplateHead,
 * 		ast.KindTemplateMiddle,
 * 		ast.KindTemplateTail,
 * 		ast.KindRegularExpressionLiteral:
 * 		text = textSourceNode.Text()
 * 	}
 * 	node := f.NewStringLiteral(text, ast.TokenFlagsNone)
 * 	if f.emitContext.textSource == nil {
 * 		f.emitContext.textSource = make(map[*ast.StringLiteralNode]*ast.Node)
 * 	}
 * 	f.emitContext.textSource[node] = textSourceNode
 * 	return node
 * }
 */
export function NodeFactory_NewStringLiteralFromNode(receiver: GoPtr<NodeFactory>, textSourceNode: GoPtr<Node>): GoPtr<Node> {
  let text = "";
  switch (textSourceNode!.Kind) {
    case KindIdentifier:
    case KindPrivateIdentifier:
    case KindJsxNamespacedName:
    case KindStringLiteral:
    case KindNumericLiteral:
    case KindBigIntLiteral:
    case KindNoSubstitutionTemplateLiteral:
    case KindTemplateHead:
    case KindTemplateMiddle:
    case KindTemplateTail:
    case KindRegularExpressionLiteral:
      text = Node_Text(textSourceNode);
      break;
  }
  const node = NewStringLiteral(receiver!.__tsgoEmbedded0!, text, TokenFlagsNone);
  if (GoMapIsNil(receiver!.emitContext!.textSource)) {
    receiver!.emitContext!.textSource = new globalThis.Map();
  }
  receiver!.emitContext!.textSource.set(node as unknown as GoPtr<StringLiteralNode>, textSourceNode);
  return node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewThisExpression","kind":"method","status":"implemented","sigHash":"b3fd6aaa8b941193649a9573517606d71d78d46ee2aea8e16aca4ef7810a6412"}
 *
 * Go source:
 * func (f *NodeFactory) NewThisExpression() *ast.Expression {
 * 	return f.NewKeywordExpression(ast.KindThisKeyword)
 * }
 */
export function NodeFactory_NewThisExpression(receiver: GoPtr<NodeFactory>): GoPtr<Expression> {
  return NewKeywordExpression(receiver!.__tsgoEmbedded0!, KindThisKeyword);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewTrueExpression","kind":"method","status":"implemented","sigHash":"af67827a925e6d2882b472fa4fcad810915abd5a038838ef2927f6eb30b89b9c"}
 *
 * Go source:
 * func (f *NodeFactory) NewTrueExpression() *ast.Expression {
 * 	return f.NewKeywordExpression(ast.KindTrueKeyword)
 * }
 */
export function NodeFactory_NewTrueExpression(receiver: GoPtr<NodeFactory>): GoPtr<Expression> {
  return NewKeywordExpression(receiver!.__tsgoEmbedded0!, KindTrueKeyword);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewFalseExpression","kind":"method","status":"implemented","sigHash":"4c87aa011f8ce224ed484f2450e983708cc7f0b5b27ab6800313a0bd2ccb82c3"}
 *
 * Go source:
 * func (f *NodeFactory) NewFalseExpression() *ast.Expression {
 * 	return f.NewKeywordExpression(ast.KindFalseKeyword)
 * }
 */
export function NodeFactory_NewFalseExpression(receiver: GoPtr<NodeFactory>): GoPtr<Expression> {
  return NewKeywordExpression(receiver!.__tsgoEmbedded0!, KindFalseKeyword);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewCommaExpression","kind":"method","status":"implemented","sigHash":"fa0b315d900205c995a56c4e67ec0e09f1f1243051f7b7b98e7820358dc27769"}
 *
 * Go source:
 * func (f *NodeFactory) NewCommaExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindCommaToken), right)
 * }
 */
export function NodeFactory_NewCommaExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindCommaToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAssignmentExpression","kind":"method","status":"implemented","sigHash":"d65469557959ceed9d833db5ac18d0868ff68ecc07bd4b32a65b9915dee5cc88"}
 *
 * Go source:
 * func (f *NodeFactory) NewAssignmentExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindEqualsToken), right)
 * }
 */
export function NodeFactory_NewAssignmentExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindEqualsToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewLogicalORExpression","kind":"method","status":"implemented","sigHash":"108c7f9599666454afe6359498c19d47a99fa459199fce35fb22242f0df40768"}
 *
 * Go source:
 * func (f *NodeFactory) NewLogicalORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindBarBarToken), right)
 * }
 */
export function NodeFactory_NewLogicalORExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindBarBarToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewLogicalANDExpression","kind":"method","status":"implemented","sigHash":"a6eec390aa3a0ee1c49dfadccfc1676df31e10e41beed79c7acf33f1aedb55d4"}
 *
 * Go source:
 * func (f *NodeFactory) NewLogicalANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindAmpersandAmpersandToken), right)
 * }
 */
export function NodeFactory_NewLogicalANDExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindAmpersandAmpersandToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewStrictEqualityExpression","kind":"method","status":"implemented","sigHash":"ef2d1f9ace59c2982d1a03466552490e07d8d821d507547733326c297fbb1bcc"}
 *
 * Go source:
 * func (f *NodeFactory) NewStrictEqualityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindEqualsEqualsEqualsToken), right)
 * }
 */
export function NodeFactory_NewStrictEqualityExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindEqualsEqualsEqualsToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewStrictInequalityExpression","kind":"method","status":"implemented","sigHash":"67135c4626f9343c2e1adcb9267c748ef953743acbf1ca12aa72fe0c44d4fedf"}
 *
 * Go source:
 * func (f *NodeFactory) NewStrictInequalityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
 * 	return f.NewBinaryExpression(nil /*modifiers* /, left, nil /*typeNode* /, f.NewToken(ast.KindExclamationEqualsEqualsToken), right)
 * }
 */
export function NodeFactory_NewStrictInequalityExpression(receiver: GoPtr<NodeFactory>, left: GoPtr<Expression>, right: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewBinaryExpression(f, undefined, left, undefined, NewToken(f, KindExclamationEqualsEqualsToken), right);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewVoidZeroExpression","kind":"method","status":"implemented","sigHash":"be9bafc263983f75c771764fc33e2151d15eb1209bd0ef0951e4c2ab0e2fdbd3"}
 *
 * Go source:
 * func (f *NodeFactory) NewVoidZeroExpression() *ast.Expression {
 * 	return f.NewVoidExpression(f.NewNumericLiteral("0", ast.TokenFlagsNone))
 * }
 */
export function NodeFactory_NewVoidZeroExpression(receiver: GoPtr<NodeFactory>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewVoidExpression(f, NewNumericLiteral(f, "0", TokenFlagsNone));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::func::flattenCommaElement","kind":"func","status":"implemented","sigHash":"4dba9a3211c3451b688f07594b484c6c40d78703109fb320351423438c9a23a1"}
 *
 * Go source:
 * func flattenCommaElement(node *ast.Expression, expressions []*ast.Expression) []*ast.Expression {
 * 	if ast.IsBinaryExpression(node) && ast.NodeIsSynthesized(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
 * 		expressions = flattenCommaElement(node.AsBinaryExpression().Left, expressions)
 * 		expressions = flattenCommaElement(node.AsBinaryExpression().Right, expressions)
 * 	} else {
 * 		expressions = append(expressions, node)
 * 	}
 * 	return expressions
 * }
 */
export function flattenCommaElement(node: GoPtr<Expression>, expressions: GoSlice<GoPtr<Expression>>): GoSlice<GoPtr<Expression>> {
  if (IsBinaryExpression(node) && NodeIsSynthesized(node) && AsBinaryExpression(node)!.OperatorToken!.Kind === KindCommaToken) {
    expressions = flattenCommaElement(AsBinaryExpression(node)!.Left, expressions);
    expressions = flattenCommaElement(AsBinaryExpression(node)!.Right, expressions);
  } else {
    expressions = GoSliceAppend(expressions, node, GoPointerValueOps<Node>());
  }
  return expressions;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::func::flattenCommaElements","kind":"func","status":"implemented","sigHash":"84f941a6d494a5d83cacb06a8fe8a6c846c4a9674d329d67355a3de984759259"}
 *
 * Go source:
 * func flattenCommaElements(expressions []*ast.Expression) []*ast.Expression {
 * 	var result []*ast.Expression
 * 	for _, expression := range expressions {
 * 		result = flattenCommaElement(expression, result)
 * 	}
 * 	return result
 * }
 */
export function flattenCommaElements(expressions: GoSlice<GoPtr<Expression>>): GoSlice<GoPtr<Expression>> {
  let result: GoSlice<GoPtr<Expression>> = GoNilSlice();
  for (
    let __goRangeSlice = expressions,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoPointerValueOps<Node>(),
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const expression = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    result = flattenCommaElement(expression, result);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.InlineExpressions","kind":"method","status":"implemented","sigHash":"221dd0b92b78276c9c179094299495a5a012f7d0ad4dbcbdb938cc7cbe0819fc"}
 *
 * Go source:
 * func (f *NodeFactory) InlineExpressions(expressions []*ast.Expression) *ast.Expression {
 * 	if len(expressions) == 0 {
 * 		return nil
 * 	}
 * 	if len(expressions) == 1 {
 * 		return expressions[0]
 * 	}
 * 	expressions = flattenCommaElements(expressions)
 * 	expression := expressions[0]
 * 	for _, next := range expressions[1:] {
 * 		expression = f.NewCommaExpression(expression, next)
 * 	}
 * 	return expression
 * }
 */
export function NodeFactory_InlineExpressions(receiver: GoPtr<NodeFactory>, expressions: GoSlice<GoPtr<Expression>>): GoPtr<Expression> {
  if (expressions.length === 0) {
    return undefined;
  }
  if (expressions.length === 1) {
    return GoSliceLoad(expressions, 0, GoPointerValueOps<Node>());
  }
  const flattened = flattenCommaElements(expressions);
  let expression = GoSliceLoad(flattened, 0, GoPointerValueOps<Node>());
  for (const next of flattened.slice(1)) {
    expression = NodeFactory_NewCommaExpression(receiver, expression, next);
  }
  return expression;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.CreateExpressionFromEntityName","kind":"method","status":"implemented","sigHash":"98ffd03b1ee302a932f4cc71d05fb215e641b285015700c5e08fa7e45ba1ecb9"}
 *
 * Go source:
 * func (f *NodeFactory) CreateExpressionFromEntityName(node *ast.Node) *ast.Expression {
 * 	if ast.IsQualifiedName(node) {
 * 		left := f.CreateExpressionFromEntityName(node.AsQualifiedName().Left)
 * 		right := node.AsQualifiedName().Right.Clone(f.AsNodeFactory())
 * 		right.Loc = node.AsQualifiedName().Right.Loc
 * 		// TODO(rbuckton): Does this need to be parented?
 * 		right.Parent = node.AsQualifiedName().Right.Parent
 * 		propAccess := f.NewPropertyAccessExpression(left, nil, right, ast.NodeFlagsNone)
 * 		propAccess.Loc = node.Loc
 * 		return propAccess
 * 	}
 * 	res := node.Clone(f.AsNodeFactory())
 * 	res.Loc = node.Loc
 * 	// TODO(rbuckton): Does this need to be parented?
 * 	res.Parent = node.Parent
 * 	return res
 * }
 */
export function NodeFactory_CreateExpressionFromEntityName(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>): GoPtr<Expression> {
  const f = receiver!;
  if (IsQualifiedName(node)) {
    const left = NodeFactory_CreateExpressionFromEntityName(f, AsQualifiedName(node)!.Left);
    const right = Node_Clone(AsQualifiedName(node)!.Right, AstNodeFactory_AsNodeFactory(f.__tsgoEmbedded0));
    right!.Loc = AsQualifiedName(node)!.Right!.Loc;
    // TODO(rbuckton): Does this need to be parented?
    right!.Parent = AsQualifiedName(node)!.Right!.Parent;
    const propAccess = NewPropertyAccessExpression(f.__tsgoEmbedded0!, left, undefined, right, NodeFlagsNone);
    propAccess!.Loc = node!.Loc;
    return propAccess;
  }
  const res = Node_Clone(node, AstNodeFactory_AsNodeFactory(f.__tsgoEmbedded0));
  res!.Loc = node!.Loc;
  // TODO(rbuckton): Does this need to be parented?
  res!.Parent = node!.Parent;
  return res;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.RestoreEnclosingLabel","kind":"method","status":"implemented","sigHash":"fff69a5f287d6c3b561a537d1218bfb18105629decea3120ddc567a37c74e817"}
 *
 * Go source:
 * func (f *NodeFactory) RestoreEnclosingLabel(node *ast.Node, outermostLabeledStatement *ast.LabeledStatement) *ast.Node {
 * 	if outermostLabeledStatement == nil {
 * 		return node
 * 	}
 * 	innerLabel := node
 * 	if ast.IsLabeledStatement(outermostLabeledStatement.Statement) {
 * 		innerLabel = f.RestoreEnclosingLabel(node, outermostLabeledStatement.Statement.AsLabeledStatement())
 * 	}
 * 	return f.UpdateLabeledStatement(
 * 		outermostLabeledStatement,
 * 		outermostLabeledStatement.Label,
 * 		innerLabel,
 * 	)
 * }
 */
export function NodeFactory_RestoreEnclosingLabel(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>, outermostLabeledStatement: GoPtr<LabeledStatement>): GoPtr<Node> {
  if (outermostLabeledStatement === undefined) {
    return node;
  }
  let innerLabel = node;
  if (IsLabeledStatement(outermostLabeledStatement!.Statement)) {
    innerLabel = NodeFactory_RestoreEnclosingLabel(receiver, node, AsLabeledStatement(outermostLabeledStatement!.Statement));
  }
  return NodeFactory_UpdateLabeledStatement(
    receiver!.__tsgoEmbedded0!,
    outermostLabeledStatement,
    outermostLabeledStatement!.Label,
    innerLabel,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.CreateForOfBindingStatement","kind":"method","status":"implemented","sigHash":"bd015f3f845631b5480ef62c8ddd971450bd52a6d4dec4be1763e51543e46fde"}
 *
 * Go source:
 * func (f *NodeFactory) CreateForOfBindingStatement(node *ast.Node, boundValue *ast.Node) *ast.Node {
 * 	if ast.IsVariableDeclarationList(node) {
 * 		firstDeclaration := node.AsVariableDeclarationList().Declarations.Nodes[0]
 * 		updatedDeclaration := f.UpdateVariableDeclaration(
 * 			firstDeclaration.AsVariableDeclaration(),
 * 			firstDeclaration.Name(),
 * 			nil, /*exclamationToken* /
 * 			nil, /*type* /
 * 			boundValue,
 * 		)
 * 		statement := f.NewVariableStatement(
 * 			nil,
 * 			f.UpdateVariableDeclarationList(
 * 				node.AsVariableDeclarationList(),
 * 				f.NewNodeList([]*ast.Node{updatedDeclaration}),
 * 				node.AsVariableDeclarationList().Flags,
 * 			),
 * 		)
 * 		statement.Loc = node.Loc
 * 		return statement
 * 	}
 * 	updatedExpression := f.NewAssignmentExpression(node, boundValue)
 * 	updatedExpression.Loc = node.Loc
 * 	statement := f.NewExpressionStatement(updatedExpression)
 * 	statement.Loc = node.Loc
 * 	return statement
 * }
 */
export function NodeFactory_CreateForOfBindingStatement(receiver: GoPtr<NodeFactory>, node: GoPtr<Node>, boundValue: GoPtr<Node>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  if (IsVariableDeclarationList(node)) {
    const firstDeclaration = GoSliceLoad(AsVariableDeclarationList(node)!.Declarations!.Nodes, 0, GoPointerValueOps<Node>());
    const updatedDeclaration = NodeFactory_UpdateVariableDeclaration(
      f,
      AsVariableDeclaration(firstDeclaration),
      Node_Name(firstDeclaration),
      undefined, /*exclamationToken*/
      undefined, /*type*/
      boundValue,
    );
    const updatedList = NodeFactory_UpdateVariableDeclarationList(
      f,
      AsVariableDeclarationList(node),
      NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, updatedDeclaration, GoPointerValueOps<Node>());
      })) as unknown as GoPtr<VariableDeclarationNodeList>,
      AsVariableDeclarationList(node)!.Flags as NodeFlags,
    );
    const statement = NewVariableStatement(f, undefined, updatedList);
    statement!.Loc = node!.Loc;
    return statement;
  }
  const updatedExpression = NodeFactory_NewAssignmentExpression(receiver, node, boundValue);
  updatedExpression!.Loc = node!.Loc;
  const statement = NewExpressionStatement(f, updatedExpression);
  statement!.Loc = node!.Loc;
  return statement;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewTypeCheck","kind":"method","status":"implemented","sigHash":"9929c8c20c6a528830ff5b0f95200736c4587d5f365464de75f02ccfa82c7e13"}
 *
 * Go source:
 * func (f *NodeFactory) NewTypeCheck(value *ast.Node, tag string) *ast.Node {
 * 	if tag == "null" {
 * 		return f.NewStrictEqualityExpression(value, f.NewKeywordExpression(ast.KindNullKeyword))
 * 	} else if tag == "undefined" {
 * 		return f.NewStrictEqualityExpression(value, f.NewVoidZeroExpression())
 * 	} else {
 * 		return f.NewStrictEqualityExpression(f.NewTypeOfExpression(value), f.NewStringLiteral(tag, ast.TokenFlagsNone))
 * 	}
 * }
 */
export function NodeFactory_NewTypeCheck(receiver: GoPtr<NodeFactory>, value: GoPtr<Node>, tag: string): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  if (tag === "null") {
    return NodeFactory_NewStrictEqualityExpression(receiver, value, NewKeywordExpression(f, KindNullKeyword));
  } else if (tag === "undefined") {
    return NodeFactory_NewStrictEqualityExpression(receiver, value, NodeFactory_NewVoidZeroExpression(receiver));
  } else {
    return NodeFactory_NewStrictEqualityExpression(receiver, NewTypeOfExpression(f, value), NewStringLiteral(f, tag, TokenFlagsNone));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewMethodCall","kind":"method","status":"implemented","sigHash":"1a2b13b373216fc0b93624895eb0f8a7722bda836b6dda25f8ad6480ae7bf466"}
 *
 * Go source:
 * func (f *NodeFactory) NewMethodCall(object *ast.Node, methodName *ast.Node, argumentsList []*ast.Node) *ast.Node {
 * 	// Preserve the optionality of `object`.
 * 	if ast.IsCallExpression(object) && (object.Flags&ast.NodeFlagsOptionalChain != 0) {
 * 		return f.NewCallExpression(
 * 			f.NewPropertyAccessExpression(object, nil, methodName, ast.NodeFlagsNone),
 * 			nil,
 * 			nil,
 * 			f.NewNodeList(argumentsList),
 * 			ast.NodeFlagsOptionalChain,
 * 		)
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewPropertyAccessExpression(object, nil, methodName, ast.NodeFlagsNone),
 * 		nil,
 * 		nil,
 * 		f.NewNodeList(argumentsList),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewMethodCall(receiver: GoPtr<NodeFactory>, object: GoPtr<Node>, methodName: GoPtr<Node>, argumentsList: GoSlice<GoPtr<Node>>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  // Preserve the optionality of `object`.
  if (IsCallExpression(object) && (object!.Flags & NodeFlagsOptionalChain) !== 0) {
    return NewCallExpression(
      f,
      NewPropertyAccessExpression(f, object, undefined, methodName, NodeFlagsNone),
      undefined,
      undefined,
      NodeFactory_NewNodeList(f, argumentsList),
      NodeFlagsOptionalChain,
    );
  }
  return NewCallExpression(
    f,
    NewPropertyAccessExpression(f, object, undefined, methodName, NodeFlagsNone),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, argumentsList),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewGlobalMethodCall","kind":"method","status":"implemented","sigHash":"b366904a54ba7f958f3168d517d86f1e788634b2d4960b4e81b21aced8f28da1"}
 *
 * Go source:
 * func (f *NodeFactory) NewGlobalMethodCall(globalObjectName string, methodName string, argumentsList []*ast.Node) *ast.Node {
 * 	return f.NewMethodCall(f.NewIdentifier(globalObjectName), f.NewIdentifier(methodName), argumentsList)
 * }
 */
export function NodeFactory_NewGlobalMethodCall(receiver: GoPtr<NodeFactory>, globalObjectName: string, methodName: string, argumentsList: GoSlice<GoPtr<Node>>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  return NodeFactory_NewMethodCall(receiver, NewIdentifier(f, globalObjectName), NewIdentifier(f, methodName), argumentsList);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewFunctionCallCall","kind":"method","status":"implemented","sigHash":"bd1019e963afc5048dc8e423c20228f60ef74008c254a64ded70685e797efab4"}
 *
 * Go source:
 * func (f *NodeFactory) NewFunctionCallCall(target *ast.Expression, thisArg *ast.Expression, argumentsList []*ast.Node) *ast.Node {
 * 	if thisArg == nil {
 * 		panic("Attempted to construct function call call without this argument expression")
 * 	}
 * 	args := append([]*ast.Expression{thisArg}, argumentsList...)
 * 	return f.NewMethodCall(target, f.NewIdentifier("call"), args)
 * }
 */
export function NodeFactory_NewFunctionCallCall(receiver: GoPtr<NodeFactory>, target: GoPtr<Expression>, thisArg: GoPtr<Expression>, argumentsList: GoSlice<GoPtr<Node>>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  if (thisArg === undefined) {
    throw new globalThis.Error("Attempted to construct function call call without this argument expression");
  }
  const args: GoSlice<GoPtr<Node>> = GoAppendSlice([thisArg], argumentsList);
  return NodeFactory_NewMethodCall(receiver, target, NewIdentifier(f, "call"), args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewArraySliceCall","kind":"method","status":"implemented","sigHash":"2b27df829d064d1a78ff952a8ef8673e571bac59793574865d0d4bd30f750b6d"}
 *
 * Go source:
 * func (f *NodeFactory) NewArraySliceCall(array *ast.Expression, start int) *ast.Node {
 * 	var args []*ast.Node
 * 	if start != 0 {
 * 		args = append(args, f.NewNumericLiteral(strconv.Itoa(start), ast.TokenFlagsNone))
 * 	}
 * 	return f.NewMethodCall(array, f.NewIdentifier("slice"), args)
 * }
 */
export function NodeFactory_NewArraySliceCall(receiver: GoPtr<NodeFactory>, array: GoPtr<Expression>, start: int): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  let args: GoSlice<GoPtr<Node>> = GoNilSlice();
  if (start !== 0) {
    args = GoSliceAppend(args, NewNumericLiteral(f, Itoa(start), TokenFlagsNone), GoPointerValueOps<Node>());
  }
  return NodeFactory_NewMethodCall(receiver, array, NewIdentifier(f, "slice"), args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.isIgnorableParen","kind":"method","status":"implemented","sigHash":"b809345c5af265b8a94ba18b84e35f57b9f84f7fc5c0e2412c0395df333d7404"}
 *
 * Go source:
 * func (f *NodeFactory) isIgnorableParen(node *ast.Expression) bool {
 * 	return ast.IsParenthesizedExpression(node) &&
 * 		ast.NodeIsSynthesized(node) &&
 * 		ast.RangeIsSynthesized(f.emitContext.SourceMapRange(node)) &&
 * 		ast.RangeIsSynthesized(f.emitContext.CommentRange(node)) // &&
 * 	// len(emitContext.SyntheticLeadingComments(node)) == 0 &&
 * 	// len(emitContext.SyntheticTrailingComments(node)) == 0
 * }
 */
export function NodeFactory_isIgnorableParen(receiver: GoPtr<NodeFactory>, node: GoPtr<Expression>): bool {
  return (IsParenthesizedExpression(node) &&
    NodeIsSynthesized(node) &&
    RangeIsSynthesized(EmitContext_SourceMapRange(receiver!.emitContext, node)) &&
    RangeIsSynthesized(EmitContext_CommentRange(receiver!.emitContext, node))) as bool;
  // &&
  // len(emitContext.SyntheticLeadingComments(node)) == 0 &&
  // len(emitContext.SyntheticTrailingComments(node)) == 0
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.updateOuterExpression","kind":"method","status":"implemented","sigHash":"10888fc30677b7efe8b432e8d2b2e10afa17c9f1af2a181a0a101f666b69080d"}
 *
 * Go source:
 * func (f *NodeFactory) updateOuterExpression(outerExpression *ast.Expression /*OuterExpression* /, expression *ast.Expression) *ast.Expression {
 * 	switch outerExpression.Kind {
 * 	case ast.KindParenthesizedExpression:
 * 		return f.UpdateParenthesizedExpression(outerExpression.AsParenthesizedExpression(), expression)
 * 	case ast.KindTypeAssertionExpression:
 * 		return f.UpdateTypeAssertion(outerExpression.AsTypeAssertion(), outerExpression.Type(), expression)
 * 	case ast.KindAsExpression:
 * 		return f.UpdateAsExpression(outerExpression.AsAsExpression(), expression, outerExpression.Type())
 * 	case ast.KindSatisfiesExpression:
 * 		return f.UpdateSatisfiesExpression(outerExpression.AsSatisfiesExpression(), expression, outerExpression.Type())
 * 	case ast.KindNonNullExpression:
 * 		return f.UpdateNonNullExpression(outerExpression.AsNonNullExpression(), expression, outerExpression.Flags)
 * 	case ast.KindExpressionWithTypeArguments:
 * 		return f.UpdateExpressionWithTypeArguments(outerExpression.AsExpressionWithTypeArguments(), expression, outerExpression.TypeArgumentList())
 * 	case ast.KindPartiallyEmittedExpression:
 * 		return f.UpdatePartiallyEmittedExpression(outerExpression.AsPartiallyEmittedExpression(), expression)
 * 	default:
 * 		panic(fmt.Sprintf("Unexpected outer expression kind: %s", outerExpression.Kind))
 * 	}
 * }
 */
export function NodeFactory_updateOuterExpression(receiver: GoPtr<NodeFactory>, outerExpression: GoPtr<Expression>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  switch (outerExpression!.Kind) {
    case KindParenthesizedExpression:
      return NodeFactory_UpdateParenthesizedExpression(f, AsParenthesizedExpression(outerExpression), expression);
    case KindTypeAssertionExpression:
      throw new globalThis.Error(`Unexpected outer expression kind: ${outerExpression!.Kind}`);
    case KindAsExpression:
      return NodeFactory_UpdateAsExpression(f, AsAsExpression(outerExpression), expression, Node_Type(outerExpression));
    case KindSatisfiesExpression:
      return NodeFactory_UpdateSatisfiesExpression(f, AsSatisfiesExpression(outerExpression), expression, Node_Type(outerExpression));
    case KindNonNullExpression:
      return NodeFactory_UpdateNonNullExpression(f, AsNonNullExpression(outerExpression), expression, outerExpression!.Flags as NodeFlags);
    case KindExpressionWithTypeArguments:
      return NodeFactory_UpdateExpressionWithTypeArguments(f, AsExpressionWithTypeArguments(outerExpression), expression, Node_TypeArgumentList(outerExpression) as unknown as GoPtr<NodeList>);
    case KindPartiallyEmittedExpression:
      return NodeFactory_UpdatePartiallyEmittedExpression(f, AsPartiallyEmittedExpression(outerExpression), expression);
    default:
      throw new globalThis.Error(`Unexpected outer expression kind: ${outerExpression!.Kind}`);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.RestoreOuterExpressions","kind":"method","status":"implemented","sigHash":"576a40f626c8cdab8f513253cce9641b9f38598014338e247aa2ad9324473fa5"}
 *
 * Go source:
 * func (f *NodeFactory) RestoreOuterExpressions(outerExpression *ast.Expression, innerExpression *ast.Expression, kinds ast.OuterExpressionKinds) *ast.Expression {
 * 	if outerExpression != nil && ast.IsOuterExpression(outerExpression, kinds) && !f.isIgnorableParen(outerExpression) {
 * 		return f.updateOuterExpression(
 * 			outerExpression,
 * 			f.RestoreOuterExpressions(outerExpression.Expression(), innerExpression, ast.OEKAll),
 * 		)
 * 	}
 * 	return innerExpression
 * }
 */
export function NodeFactory_RestoreOuterExpressions(receiver: GoPtr<NodeFactory>, outerExpression: GoPtr<Expression>, innerExpression: GoPtr<Expression>, kinds: OuterExpressionKinds): GoPtr<Expression> {
  if (outerExpression !== undefined && IsOuterExpression(outerExpression, kinds as never) && !NodeFactory_isIgnorableParen(receiver, outerExpression)) {
    return NodeFactory_updateOuterExpression(
      receiver,
      outerExpression,
      NodeFactory_RestoreOuterExpressions(receiver, Node_Expression(outerExpression), innerExpression, OEKAll as OuterExpressionKinds),
    );
  }
  return innerExpression;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.EnsureUseStrict","kind":"method","status":"implemented","sigHash":"73d4a53ec0f110499527dd123224ee00b6bad73becdcc805e5ce55b323e7397f"}
 *
 * Go source:
 * func (f *NodeFactory) EnsureUseStrict(statements []*ast.Statement) []*ast.Statement {
 * 	for _, statement := range statements {
 * 		if ast.IsPrologueDirective(statement) && statement.Expression().Text() == "use strict" {
 * 			return statements
 * 		} else {
 * 			break
 * 		}
 * 	}
 * 	useStrictPrologue := f.NewExpressionStatement(f.NewStringLiteral("use strict", ast.TokenFlagsNone))
 * 	statements = append([]*ast.Statement{useStrictPrologue}, statements...)
 * 	return statements
 * }
 */
export function NodeFactory_EnsureUseStrict(receiver: GoPtr<NodeFactory>, statements: GoSlice<GoPtr<Statement>>): GoSlice<GoPtr<Statement>> {
  const f = receiver!.__tsgoEmbedded0!;
  for (
    let __goRangeSlice = statements,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoPointerValueOps<Node>(),
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const statement = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (IsPrologueDirective(statement) && Node_Text(Node_Expression(statement)) === "use strict") {
      return statements;
    } else {
      break;
    }
  }
  const useStrictPrologue = NewExpressionStatement(f, NewStringLiteral(f, "use strict", TokenFlagsNone));
  return GoAppendSlice([useStrictPrologue], statements);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.SplitStandardPrologue","kind":"method","status":"implemented","sigHash":"1135bf3ea0e0b047e3dad437f331f20a44daa80009147101ca9cce0496448e82"}
 *
 * Go source:
 * func (f *NodeFactory) SplitStandardPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
 * 	for i, statement := range source {
 * 		if !ast.IsPrologueDirective(statement) {
 * 			return source[:i], source[i:]
 * 		}
 * 	}
 * 	return source, nil
 * }
 */
export function NodeFactory_SplitStandardPrologue(receiver: GoPtr<NodeFactory>, source: GoSlice<GoPtr<Statement>>): [prologue: GoSlice<GoPtr<Statement>>, rest: GoSlice<GoPtr<Statement>>] {
  for (let i = 0; i < source.length; i++) {
    if (!IsPrologueDirective(GoSliceLoad(source, i, GoPointerValueOps<Node>()))) {
      return [source.slice(0, i), source.slice(i)];
    }
  }
  return [source, GoNilSlice()];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.SplitCustomPrologue","kind":"method","status":"implemented","sigHash":"0011c8fe8ad098afe8f5091a9853566d8bfedbd5dbd542548f3e0248f0d45376"}
 *
 * Go source:
 * func (f *NodeFactory) SplitCustomPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
 * 	for i, statement := range source {
 * 		if ast.IsPrologueDirective(statement) || f.emitContext.EmitFlags(statement)&EFCustomPrologue == 0 {
 * 			return source[:i], source[i:]
 * 		}
 * 	}
 * 	return nil, source
 * }
 */
export function NodeFactory_SplitCustomPrologue(receiver: GoPtr<NodeFactory>, source: GoSlice<GoPtr<Statement>>): [prologue: GoSlice<GoPtr<Statement>>, rest: GoSlice<GoPtr<Statement>>] {
  for (let i = 0; i < source.length; i++) {
    if (IsPrologueDirective(GoSliceLoad(source, i, GoPointerValueOps<Node>())) || (EmitContext_EmitFlags(receiver!.emitContext, GoSliceLoad(source, i, GoPointerValueOps<Node>())) & EFCustomPrologue) === 0) {
      return [source.slice(0, i), source.slice(i)];
    }
  }
  return [GoNilSlice(), source];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::type::NameOptions","kind":"type","status":"implemented","sigHash":"1f11cc5abac181377aab613fc91f724de584d4505e07d392b93b6c5935438c23"}
 *
 * Go source:
 * NameOptions struct {
 * 	AllowComments   bool // indicates whether comments may be emitted for the name.
 * 	AllowSourceMaps bool // indicates whether source maps may be emitted for the name.
 * }
 */
export interface NameOptions {
  AllowComments: bool;
  AllowSourceMaps: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::type::AssignedNameOptions","kind":"type","status":"implemented","sigHash":"f1ac263b626f495044e3272095c91aa930e09e773361d1b974c6f6038214f62c"}
 *
 * Go source:
 * AssignedNameOptions struct {
 * 	AllowComments      bool // indicates whether comments may be emitted for the name.
 * 	AllowSourceMaps    bool // indicates whether source maps may be emitted for the name.
 * 	IgnoreAssignedName bool // indicates whether the assigned name of a declaration shouldn't be considered.
 * }
 */
export interface AssignedNameOptions {
  AllowComments: bool;
  AllowSourceMaps: bool;
  IgnoreAssignedName: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.getName","kind":"method","status":"implemented","sigHash":"29e529817f00078524add6ee54e17af1fd188edd3a47c1c49497c21168be5abe"}
 *
 * Go source:
 * func (f *NodeFactory) getName(node *ast.Declaration, emitFlags EmitFlags, opts AssignedNameOptions) *ast.IdentifierNode {
 * 	var nodeName *ast.IdentifierNode
 * 	if node != nil {
 * 		if opts.IgnoreAssignedName {
 * 			nodeName = ast.GetNonAssignedNameOfDeclaration(node)
 * 		} else {
 * 			nodeName = ast.GetNameOfDeclaration(node)
 * 		}
 * 	}
 * 
 * 	if nodeName != nil {
 * 		name := nodeName.Clone(f)
 * 		if !opts.AllowComments {
 * 			emitFlags |= EFNoComments
 * 		}
 * 		if !opts.AllowSourceMaps {
 * 			emitFlags |= EFNoSourceMap
 * 		}
 * 		f.emitContext.AddEmitFlags(name, emitFlags)
 * 		return name
 * 	}
 * 
 * 	return f.NewGeneratedNameForNode(node)
 * }
 */
export function NodeFactory_getName(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>, emitFlags: EmitFlags, opts: AssignedNameOptions): GoPtr<IdentifierNode> {
  let nodeName: GoPtr<IdentifierNode> = undefined;
  if (node !== undefined) {
    if (opts.IgnoreAssignedName) {
      nodeName = GetNonAssignedNameOfDeclaration(node as unknown as GoPtr<Node>) as GoPtr<IdentifierNode>;
    } else {
      nodeName = GetNameOfDeclaration(node as unknown as GoPtr<Node>) as GoPtr<IdentifierNode>;
    }
  }

  if (nodeName !== undefined) {
    const name = Node_Clone(nodeName as unknown as GoPtr<Node>, receiver!.__tsgoEmbedded0! as unknown as NodeFactoryCoercible) as GoPtr<IdentifierNode>;
    let flags = emitFlags;
    if (!opts.AllowComments) {
      flags = (flags | EFNoComments) as EmitFlags;
    }
    if (!opts.AllowSourceMaps) {
      flags = (flags | EFNoSourceMap) as EmitFlags;
    }
    EmitContext_AddEmitFlags(receiver!.emitContext, name as unknown as GoPtr<Node>, flags);
    return name;
  }

  return NodeFactory_NewGeneratedNameForNode(receiver, node as unknown as GoPtr<Node>);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetLocalName","kind":"method","status":"implemented","sigHash":"471d0f41b6eec27e6e4b5adb7c29b55f25e9e944e374b59ad98572123fc8f047"}
 *
 * Go source:
 * func (f *NodeFactory) GetLocalName(node *ast.Declaration) *ast.IdentifierNode {
 * 	return f.GetLocalNameEx(node, AssignedNameOptions{})
 * }
 */
export function NodeFactory_GetLocalName(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>): GoPtr<IdentifierNode> {
  return NodeFactory_GetLocalNameEx(receiver, node, { AllowComments: false, AllowSourceMaps: false, IgnoreAssignedName: false });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetLocalNameEx","kind":"method","status":"implemented","sigHash":"8d1984feb1eb2e266a5a28dddea40558e07638eeeac1637e35ed7d0e81ab1f54"}
 *
 * Go source:
 * func (f *NodeFactory) GetLocalNameEx(node *ast.Declaration, opts AssignedNameOptions) *ast.IdentifierNode {
 * 	return f.getName(node, EFLocalName, opts)
 * }
 */
export function NodeFactory_GetLocalNameEx(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>, opts: AssignedNameOptions): GoPtr<IdentifierNode> {
  return NodeFactory_getName(receiver, node, EFLocalName, opts);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetExportName","kind":"method","status":"implemented","sigHash":"236751cabac10c10473cf63b6b5f28d9d436842ebada01036a9b227627bfd6c4"}
 *
 * Go source:
 * func (f *NodeFactory) GetExportName(node *ast.Declaration) *ast.IdentifierNode {
 * 	return f.GetExportNameEx(node, AssignedNameOptions{})
 * }
 */
export function NodeFactory_GetExportName(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>): GoPtr<IdentifierNode> {
  return NodeFactory_GetExportNameEx(receiver, node, { AllowComments: false, AllowSourceMaps: false, IgnoreAssignedName: false });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetExportNameEx","kind":"method","status":"implemented","sigHash":"1d61debded762356d88a02918f8c5b93b6a94d3e79175e2b2dad141f1344da6e"}
 *
 * Go source:
 * func (f *NodeFactory) GetExportNameEx(node *ast.Declaration, opts AssignedNameOptions) *ast.IdentifierNode {
 * 	return f.getName(node, EFExportName, opts)
 * }
 */
export function NodeFactory_GetExportNameEx(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>, opts: AssignedNameOptions): GoPtr<IdentifierNode> {
  return NodeFactory_getName(receiver, node, EFExportName, opts);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetDeclarationName","kind":"method","status":"implemented","sigHash":"eee9c9b9e4bc633dce6345021ba23fc2cdd3113493547a6b042328609b558039"}
 *
 * Go source:
 * func (f *NodeFactory) GetDeclarationName(node *ast.Declaration) *ast.IdentifierNode {
 * 	return f.GetDeclarationNameEx(node, NameOptions{})
 * }
 */
export function NodeFactory_GetDeclarationName(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>): GoPtr<IdentifierNode> {
  return NodeFactory_GetDeclarationNameEx(receiver, node, { AllowComments: false, AllowSourceMaps: false });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetDeclarationNameEx","kind":"method","status":"implemented","sigHash":"d4cccfea7bdd36f45ce87e3639304c4cfc8280b474d666f95d5442b9cc6a296f"}
 *
 * Go source:
 * func (f *NodeFactory) GetDeclarationNameEx(node *ast.Declaration, opts NameOptions) *ast.IdentifierNode {
 * 	return f.getName(node, EFNone, AssignedNameOptions{AllowComments: opts.AllowComments, AllowSourceMaps: opts.AllowSourceMaps})
 * }
 */
export function NodeFactory_GetDeclarationNameEx(receiver: GoPtr<NodeFactory>, node: GoPtr<Declaration>, opts: NameOptions): GoPtr<IdentifierNode> {
  return NodeFactory_getName(receiver, node, EFNone, { AllowComments: opts.AllowComments, AllowSourceMaps: opts.AllowSourceMaps, IgnoreAssignedName: false });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetNamespaceMemberName","kind":"method","status":"implemented","sigHash":"a9566c9944a8234ea6946c55f8404e3a308fdff286a6d11a616ed13d135ff159"}
 *
 * Go source:
 * func (f *NodeFactory) GetNamespaceMemberName(ns *ast.IdentifierNode, name *ast.IdentifierNode, opts NameOptions) *ast.IdentifierNode {
 * 	if !f.emitContext.HasAutoGenerateInfo(name) {
 * 		name = name.Clone(f)
 * 	}
 * 	qualifiedName := f.NewPropertyAccessExpression(ns, nil /*questionDotToken* /, name, ast.NodeFlagsNone)
 * 	f.emitContext.AssignCommentAndSourceMapRanges(qualifiedName, name)
 * 	if !opts.AllowComments {
 * 		f.emitContext.AddEmitFlags(qualifiedName, EFNoComments)
 * 	}
 * 	if !opts.AllowSourceMaps {
 * 		f.emitContext.AddEmitFlags(qualifiedName, EFNoSourceMap)
 * 	}
 * 	return qualifiedName
 * }
 */
export function NodeFactory_GetNamespaceMemberName(receiver: GoPtr<NodeFactory>, ns: GoPtr<IdentifierNode>, name: GoPtr<IdentifierNode>, opts: NameOptions): GoPtr<IdentifierNode> {
  const f = receiver!.__tsgoEmbedded0!;
  if (!EmitContext_HasAutoGenerateInfo(receiver!.emitContext, name)) {
    name = Node_Clone(name as unknown as GoPtr<Node>, f as unknown as NodeFactoryCoercible) as GoPtr<IdentifierNode>;
  }
  const qualifiedName = NewPropertyAccessExpression(f, ns, undefined, name, NodeFlagsNone);
  EmitContext_AssignCommentAndSourceMapRanges(receiver!.emitContext, qualifiedName, name as unknown as GoPtr<Node>);
  if (!opts.AllowComments) {
    EmitContext_AddEmitFlags(receiver!.emitContext, qualifiedName, EFNoComments);
  }
  if (!opts.AllowSourceMaps) {
    EmitContext_AddEmitFlags(receiver!.emitContext, qualifiedName, EFNoSourceMap);
  }
  return qualifiedName as unknown as GoPtr<IdentifierNode>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.GetExternalModuleOrNamespaceExportName","kind":"method","status":"implemented","sigHash":"1ccde2661440de42114385032fec603571d991913750fca1256df456aaba48fa"}
 *
 * Go source:
 * func (f *NodeFactory) GetExternalModuleOrNamespaceExportName(ns *ast.IdentifierNode, node *ast.Declaration, allowComments bool, allowSourceMaps bool) *ast.Node {
 * 	if ns != nil && ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
 * 		nameOpts := NameOptions{AllowComments: allowComments, AllowSourceMaps: allowSourceMaps}
 * 		return f.GetNamespaceMemberName(ns, f.GetDeclarationNameEx(node, nameOpts), nameOpts)
 * 	}
 * 	return f.GetExportNameEx(node, AssignedNameOptions{AllowComments: allowComments, AllowSourceMaps: allowSourceMaps})
 * }
 */
export function NodeFactory_GetExternalModuleOrNamespaceExportName(receiver: GoPtr<NodeFactory>, ns: GoPtr<IdentifierNode>, node: GoPtr<Declaration>, allowComments: bool, allowSourceMaps: bool): GoPtr<Node> {
  if (ns !== undefined && HasSyntacticModifier(node as unknown as GoPtr<Node>, ModifierFlagsExport)) {
    const nameOpts: NameOptions = { AllowComments: allowComments, AllowSourceMaps: allowSourceMaps };
    return NodeFactory_GetNamespaceMemberName(receiver, ns, NodeFactory_GetDeclarationNameEx(receiver, node, nameOpts), nameOpts) as unknown as GoPtr<Node>;
  }
  return NodeFactory_GetExportNameEx(receiver, node, { AllowComments: allowComments, AllowSourceMaps: allowSourceMaps, IgnoreAssignedName: false }) as unknown as GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewUnscopedHelperName","kind":"method","status":"implemented","sigHash":"b0cfe4d39ce4c88c291d96f36c6a854b474383a927b1519434aaad527d723c76"}
 *
 * Go source:
 * func (f *NodeFactory) NewUnscopedHelperName(name string) *ast.IdentifierNode {
 * 	node := f.NewIdentifier(name)
 * 	f.emitContext.SetEmitFlags(node, EFHelperName)
 * 	return node
 * }
 */
export function NodeFactory_NewUnscopedHelperName(receiver: GoPtr<NodeFactory>, name: string): GoPtr<IdentifierNode> {
  const f = receiver!.__tsgoEmbedded0!;
  const node = NewIdentifier(f, name);
  EmitContext_SetEmitFlags(receiver!.emitContext, node, EFHelperName);
  return node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewDecorateHelper","kind":"method","status":"implemented","sigHash":"1b391f8443b00f72f6c3263a6ec035c73c121b85b0dcd035777d04eebc46d2cd"}
 *
 * Go source:
 * func (f *NodeFactory) NewDecorateHelper(decoratorExpressions []*ast.Node, target *ast.Node, memberName *ast.Node, descriptor *ast.Node) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(decorateHelper)
 * 
 * 	var argumentsArray []*ast.Node
 * 	argumentsArray = append(argumentsArray, f.NewArrayLiteralExpression(f.NewNodeList(decoratorExpressions), true))
 * 	argumentsArray = append(argumentsArray, target)
 * 	if memberName != nil {
 * 		argumentsArray = append(argumentsArray, memberName)
 * 		if descriptor != nil {
 * 			argumentsArray = append(argumentsArray, descriptor)
 * 		}
 * 	}
 * 
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__decorate"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(argumentsArray),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewDecorateHelper(receiver: GoPtr<NodeFactory>, decoratorExpressions: GoSlice<GoPtr<Node>>, target: GoPtr<Node>, memberName: GoPtr<Node>, descriptor: GoPtr<Node>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, decorateHelper);

  let argumentsArray: GoSlice<GoPtr<Node>> = GoNilSlice();
  argumentsArray = GoSliceAppend(argumentsArray, NewArrayLiteralExpression(f, NodeFactory_NewNodeList(f, decoratorExpressions), true), GoPointerValueOps<Node>());
  argumentsArray = GoSliceAppend(argumentsArray, target, GoPointerValueOps<Node>());
  if (memberName !== undefined) {
    argumentsArray = GoSliceAppend(argumentsArray, memberName, GoPointerValueOps<Node>());
    if (descriptor !== undefined) {
      argumentsArray = GoSliceAppend(argumentsArray, descriptor, GoPointerValueOps<Node>());
    }
  }

  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__decorate"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, argumentsArray),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewMetadataHelper","kind":"method","status":"implemented","sigHash":"764b5e2b774c71d7333d0c02183dec99a9cef57a2f32523cd67d85dc1b043d8a"}
 *
 * Go source:
 * func (f *NodeFactory) NewMetadataHelper(metadataKey string, metadataValue *ast.Node) *ast.Node {
 * 	f.emitContext.RequestEmitHelper(metadataHelper)
 * 
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__metadata"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Node{
 * 			f.NewStringLiteral(metadataKey, ast.TokenFlagsNone),
 * 			metadataValue,
 * 		}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewMetadataHelper(receiver: GoPtr<NodeFactory>, metadataKey: string, metadataValue: GoPtr<Node>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, metadataHelper);

  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__metadata"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, NewStringLiteral(f, metadataKey, TokenFlagsNone), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, metadataValue, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewParamHelper","kind":"method","status":"implemented","sigHash":"111982e09290ccc02bc3e72e65f614382bf60f3c781ae397d9a3e62896a4b149"}
 *
 * Go source:
 * func (f *NodeFactory) NewParamHelper(expression *ast.Node, parameterOffset int, location core.TextRange) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(paramHelper)
 * 	helper := f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__param"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{f.NewNumericLiteral(strconv.Itoa(parameterOffset), ast.TokenFlagsNone), expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * 	helper.Loc = location
 * 	return helper
 * }
 */
export function NodeFactory_NewParamHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Node>, parameterOffset: int, location: TextRange): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, paramHelper);
  const helper = NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__param"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, NewNumericLiteral(f, Itoa(parameterOffset), TokenFlagsNone), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
  helper!.Loc = location;
  return helper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAddDisposableResourceHelper","kind":"method","status":"implemented","sigHash":"c45019fade4d6c661675e0a87e8f5aa881644d131f420997d4a730a042069c20"}
 *
 * Go source:
 * func (f *NodeFactory) NewAddDisposableResourceHelper(envBinding *ast.Expression, value *ast.Expression, async bool) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(addDisposableResourceHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__addDisposableResource"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{envBinding, value, f.NewKeywordExpression(core.IfElse(async, ast.KindTrueKeyword, ast.KindFalseKeyword))}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAddDisposableResourceHelper(receiver: GoPtr<NodeFactory>, envBinding: GoPtr<Expression>, value: GoPtr<Expression>, async: bool): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, addDisposableResourceHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__addDisposableResource"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, envBinding, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, value, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, NewKeywordExpression(f, IfElse(async, KindTrueKeyword, KindFalseKeyword)), GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewDisposeResourcesHelper","kind":"method","status":"implemented","sigHash":"7bb268ed7b228c99940f0b8c37c27f7306a5973a897430ef0b5860cdd6beeef0"}
 *
 * Go source:
 * func (f *NodeFactory) NewDisposeResourcesHelper(envBinding *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(disposeResourcesHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__disposeResources"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{envBinding}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewDisposeResourcesHelper(receiver: GoPtr<NodeFactory>, envBinding: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, disposeResourcesHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__disposeResources"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, envBinding, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::type::PrivateIdentifierKind","kind":"type","status":"implemented","sigHash":"7e75697350348a6dae519f26d69517ffa7831f77c3377a212224d3bf7352b67e"}
 *
 * Go source:
 * PrivateIdentifierKind string
 */
export type PrivateIdentifierKind = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::constGroup::PrivateIdentifierKindField+PrivateIdentifierKindMethod+PrivateIdentifierKindAccessor+PrivateIdentifierKindUntransformed","kind":"constGroup","status":"implemented","sigHash":"26b04ec5499627cd1ad15f9b4cdd841b765834f097731a9218b9022cab281e69"}
 *
 * Go source:
 * const (
 * 	PrivateIdentifierKindField         PrivateIdentifierKind = "f"
 * 	PrivateIdentifierKindMethod        PrivateIdentifierKind = "m"
 * 	PrivateIdentifierKindAccessor      PrivateIdentifierKind = "a"
 * 	PrivateIdentifierKindUntransformed PrivateIdentifierKind = "untransformed"
 * )
 */
export const PrivateIdentifierKindField: PrivateIdentifierKind = "f";
export const PrivateIdentifierKindMethod: PrivateIdentifierKind = "m";
export const PrivateIdentifierKindAccessor: PrivateIdentifierKind = "a";
export const PrivateIdentifierKindUntransformed: PrivateIdentifierKind = "untransformed";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewClassPrivateFieldGetHelper","kind":"method","status":"implemented","sigHash":"ab4b8de627f79e3d6558803188fb5edc4e5365911a604b0b24da1f2e5ad15b11"}
 *
 * Go source:
 * func (f *NodeFactory) NewClassPrivateFieldGetHelper(receiver *ast.Expression, state *ast.IdentifierNode, kind PrivateIdentifierKind, fn *ast.IdentifierNode) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(classPrivateFieldGetHelper)
 * 	var args []*ast.Node
 * 	if fn == nil {
 * 		args = []*ast.Node{receiver, state, f.NewStringLiteral(string(kind), ast.TokenFlagsNone)}
 * 	} else {
 * 		args = []*ast.Node{receiver, state, f.NewStringLiteral(string(kind), ast.TokenFlagsNone), fn}
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__classPrivateFieldGet"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(args),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewClassPrivateFieldGetHelper(receiver: GoPtr<NodeFactory>, receiver1: GoPtr<Expression>, state: GoPtr<IdentifierNode>, kind: PrivateIdentifierKind, fn: GoPtr<IdentifierNode>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, classPrivateFieldGetHelper);
  const args: GoSlice<GoPtr<Node>> = fn === undefined
    ? GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, receiver1, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, state, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, NewStringLiteral(f, kind, TokenFlagsNone), GoPointerValueOps<Node>());
    })
    : GoSliceBuild(4, 4, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, receiver1, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, state, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, NewStringLiteral(f, kind, TokenFlagsNone), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, fn, GoPointerValueOps<Node>());
    });
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__classPrivateFieldGet"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, args),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewClassPrivateFieldSetHelper","kind":"method","status":"implemented","sigHash":"1b56046fc2bc4eafe319fb043be190c7046902f734259e910e973a8bfc11f37f"}
 *
 * Go source:
 * func (f *NodeFactory) NewClassPrivateFieldSetHelper(receiver *ast.Expression, state *ast.IdentifierNode, value *ast.Expression, kind PrivateIdentifierKind, fn *ast.IdentifierNode) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(classPrivateFieldSetHelper)
 * 	var args []*ast.Node
 * 	if fn == nil {
 * 		args = []*ast.Node{receiver, state, value, f.NewStringLiteral(string(kind), ast.TokenFlagsNone)}
 * 	} else {
 * 		args = []*ast.Node{receiver, state, value, f.NewStringLiteral(string(kind), ast.TokenFlagsNone), fn}
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__classPrivateFieldSet"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(args),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewClassPrivateFieldSetHelper(receiver: GoPtr<NodeFactory>, receiver1: GoPtr<Expression>, state: GoPtr<IdentifierNode>, value: GoPtr<Expression>, kind: PrivateIdentifierKind, fn: GoPtr<IdentifierNode>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, classPrivateFieldSetHelper);
  const args: GoSlice<GoPtr<Node>> = fn === undefined
    ? GoSliceBuild(4, 4, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, receiver1, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, state, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, value, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, NewStringLiteral(f, kind, TokenFlagsNone), GoPointerValueOps<Node>());
    })
    : GoSliceBuild(5, 5, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, receiver1, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, state, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, value, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, NewStringLiteral(f, kind, TokenFlagsNone), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 4, fn, GoPointerValueOps<Node>());
    });
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__classPrivateFieldSet"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, args),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewClassPrivateFieldInHelper","kind":"method","status":"implemented","sigHash":"a342b0ffe1e442de1c97fbc55bdf3d9735417401751c82f25cf0e3651eb524f5"}
 *
 * Go source:
 * func (f *NodeFactory) NewClassPrivateFieldInHelper(state *ast.IdentifierNode, receiver *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(classPrivateFieldInHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__classPrivateFieldIn"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{state, receiver}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewClassPrivateFieldInHelper(receiver: GoPtr<NodeFactory>, state: GoPtr<IdentifierNode>, receiver1: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, classPrivateFieldInHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__classPrivateFieldIn"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, state, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, receiver1, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewObjectDefinePropertyCall","kind":"method","status":"implemented","sigHash":"0d8f47e2785ff0d1a5591426bd1e3c4aefb763b1e14cae48e6cb8ef3dc9c3e0a"}
 *
 * Go source:
 * func (f *NodeFactory) NewObjectDefinePropertyCall(target *ast.Expression, name *ast.Expression, descriptor *ast.Expression) *ast.Expression {
 * 	return f.NewCallExpression(
 * 		f.NewPropertyAccessExpression(
 * 			f.NewIdentifier("Object"),
 * 			nil,
 * 			f.NewIdentifier("defineProperty"),
 * 			ast.NodeFlagsNone,
 * 		),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{target, name, descriptor}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewObjectDefinePropertyCall(receiver: GoPtr<NodeFactory>, target: GoPtr<Expression>, name: GoPtr<Expression>, descriptor: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewCallExpression(
    f,
    NewPropertyAccessExpression(
      f,
      NewIdentifier(f, "Object"),
      undefined,
      NewIdentifier(f, "defineProperty"),
      NodeFlagsNone,
    ),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, target, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, name, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, descriptor, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewReflectGetCall","kind":"method","status":"implemented","sigHash":"11b987d3b2c3bfed078c94ce66c3bdf0916512f8f925899c5079c8ce88299d72"}
 *
 * Go source:
 * func (f *NodeFactory) NewReflectGetCall(target *ast.Expression, propertyKey *ast.Expression, receiver *ast.Expression) *ast.Expression {
 * 	return f.NewCallExpression(
 * 		f.NewPropertyAccessExpression(
 * 			f.NewIdentifier("Reflect"),
 * 			nil,
 * 			f.NewIdentifier("get"),
 * 			ast.NodeFlagsNone,
 * 		),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{target, propertyKey, receiver}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewReflectGetCall(receiver: GoPtr<NodeFactory>, target: GoPtr<Expression>, propertyKey: GoPtr<Expression>, receiver1: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewCallExpression(
    f,
    NewPropertyAccessExpression(
      f,
      NewIdentifier(f, "Reflect"),
      undefined,
      NewIdentifier(f, "get"),
      NodeFlagsNone,
    ),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, target, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, propertyKey, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, receiver1, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewReflectSetCall","kind":"method","status":"implemented","sigHash":"46880d5f1310ade00b6648f1d5e96706453806d3af014a59d913df73ee1863c2"}
 *
 * Go source:
 * func (f *NodeFactory) NewReflectSetCall(target *ast.Expression, propertyKey *ast.Expression, value *ast.Expression, receiver *ast.Expression) *ast.Expression {
 * 	return f.NewCallExpression(
 * 		f.NewPropertyAccessExpression(
 * 			f.NewIdentifier("Reflect"),
 * 			nil,
 * 			f.NewIdentifier("set"),
 * 			ast.NodeFlagsNone,
 * 		),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{target, propertyKey, value, receiver}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewReflectSetCall(receiver: GoPtr<NodeFactory>, target: GoPtr<Expression>, propertyKey: GoPtr<Expression>, value: GoPtr<Expression>, receiver1: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewCallExpression(
    f,
    NewPropertyAccessExpression(
      f,
      NewIdentifier(f, "Reflect"),
      undefined,
      NewIdentifier(f, "set"),
      NodeFlagsNone,
    ),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(4, 4, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, target, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, propertyKey, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, value, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, receiver1, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewFunctionBindCall","kind":"method","status":"implemented","sigHash":"204a5051fabb832a78199577c5488c4bc1184600c081ca84194201cb7888e100"}
 *
 * Go source:
 * func (f *NodeFactory) NewFunctionBindCall(target *ast.Expression, thisArg *ast.Expression, argumentsList []*ast.Node) *ast.Expression {
 * 	args := make([]*ast.Node, 0, 1+len(argumentsList))
 * 	args = append(args, thisArg)
 * 	args = append(args, argumentsList...)
 * 	return f.NewMethodCall(target, f.NewIdentifier("bind"), args)
 * }
 */
export function NodeFactory_NewFunctionBindCall(receiver: GoPtr<NodeFactory>, target: GoPtr<Expression>, thisArg: GoPtr<Expression>, argumentsList: GoSlice<GoPtr<Node>>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  let args: GoSlice<GoPtr<Node>> = GoSliceMake(0, 0, GoPointerValueOps<Node>());
  args = GoSliceAppend(args, thisArg, GoPointerValueOps<Node>());
  args = GoSliceAppendSlice(args, argumentsList, GoPointerValueOps<Node>());
  return NodeFactory_NewMethodCall(receiver, target, NewIdentifier(f, "bind"), args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewImmediatelyInvokedArrowFunction","kind":"method","status":"implemented","sigHash":"354d7c83f9956c045c484f621d386b7b6ca008b2371bb54f1e2df14cd683d9d5"}
 *
 * Go source:
 * func (f *NodeFactory) NewImmediatelyInvokedArrowFunction(statements []*ast.Statement) *ast.Expression {
 * 	arrow := f.NewArrowFunction(
 * 		nil,                          /*modifiers* /
 * 		nil,                          /*typeParameters* /
 * 		f.NewNodeList([]*ast.Node{}), /*parameters* /
 * 		nil,                          /*returnType* /
 * 		nil,                          /*fullSignature* /
 * 		f.NewToken(ast.KindEqualsGreaterThanToken), /*equalsGreaterThanToken* /
 * 		f.NewBlock(f.NewNodeList(statements), true),
 * 	)
 * 	return f.NewCallExpression(
 * 		f.NewParenthesizedExpression(arrow),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Node{}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewImmediatelyInvokedArrowFunction(receiver: GoPtr<NodeFactory>, statements: GoSlice<GoPtr<Statement>>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  const arrow = NewArrowFunction(
    f,
    undefined, /*modifiers*/
    undefined, /*typeParameters*/
    NodeFactory_NewNodeList(f, GoSliceMake(0, 0, GoPointerValueOps<Node>())), /*parameters*/
    undefined, /*returnType*/
    undefined, /*fullSignature*/
    NewToken(f, KindEqualsGreaterThanToken), /*equalsGreaterThanToken*/
    NewBlock(f, NodeFactory_NewNodeList(f, statements), true),
  );
  return NewCallExpression(
    f,
    NewParenthesizedExpression(f, arrow),
    undefined, /*questionDotToken*/
    undefined, /*typeArguments*/
    NodeFactory_NewNodeList(f, GoSliceMake(0, 0, GoPointerValueOps<Node>())),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewExportDefault","kind":"method","status":"implemented","sigHash":"a55d2fdc85e54853e4a923a6b840227045cc7b3b08b2b8df6ba34c2132f36580"}
 *
 * Go source:
 * func (f *NodeFactory) NewExportDefault(expression *ast.Expression) *ast.Statement {
 * 	return f.NewExportAssignment(nil, false, nil, expression)
 * }
 */
export function NodeFactory_NewExportDefault(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Statement> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewExportAssignment(f, undefined, false, undefined, expression);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewExternalModuleExport","kind":"method","status":"implemented","sigHash":"a577d9daccfea2065f5388a1817aa6f7aae64088460ee3b836146d0e94afb300"}
 *
 * Go source:
 * func (f *NodeFactory) NewExternalModuleExport(name *ast.IdentifierNode) *ast.Statement {
 * 	specifier := f.NewExportSpecifier(false, nil, name)
 * 	namedExports := f.NewNamedExports(f.NewNodeList([]*ast.Node{specifier}))
 * 	return f.NewExportDeclaration(nil, false, namedExports, nil, nil)
 * }
 */
export function NodeFactory_NewExternalModuleExport(receiver: GoPtr<NodeFactory>, name: GoPtr<IdentifierNode>): GoPtr<Statement> {
  const f = receiver!.__tsgoEmbedded0!;
  const specifier = NewExportSpecifier(f, false, undefined, name);
  const namedExports = NewNamedExports(f, NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, specifier, GoPointerValueOps<Node>());
  })));
  return NewExportDeclaration(f, undefined, false, namedExports, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAssignHelper","kind":"method","status":"implemented","sigHash":"deb7b5d1949b56ae214df635b0379edfa975b443961ba6c3edc0a3a32efc28f5"}
 *
 * Go source:
 * func (f *NodeFactory) NewAssignHelper(attributesSegments []*ast.Expression, scriptTarget core.ScriptTarget) *ast.Expression {
 * 	return f.NewCallExpression(f.NewPropertyAccessExpression(f.NewIdentifier("Object"), nil, f.NewIdentifier("assign"), ast.NodeFlagsNone), nil, nil, f.NewNodeList(attributesSegments), ast.NodeFlagsNone)
 * }
 */
export function NodeFactory_NewAssignHelper(receiver: GoPtr<NodeFactory>, attributesSegments: GoSlice<GoPtr<Expression>>, scriptTarget: ScriptTarget): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  return NewCallExpression(f, NewPropertyAccessExpression(f, NewIdentifier(f, "Object"), undefined, NewIdentifier(f, "assign"), NodeFlagsNone), undefined, undefined, NodeFactory_NewNodeList(f, attributesSegments), NodeFlagsNone);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewRestHelper","kind":"method","status":"implemented","sigHash":"9a928547e1de56ea38e37be92f4e72e874087e78064bae6f92b7ce2b86e25153"}
 *
 * Go source:
 * func (f *NodeFactory) NewRestHelper(value *ast.Expression, elements []*ast.Node, computedTempVariables []*ast.Node, location core.TextRange) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(restHelper)
 * 	var propertyNames []*ast.Node
 * 	computedTempVariableOffset := 0
 * 	for i, element := range elements {
 * 		if i == len(elements)-1 {
 * 			break
 * 		}
 * 		propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
 * 		if propertyName != nil {
 * 			if ast.IsComputedPropertyName(propertyName) {
 * 				debug.Assert(computedTempVariables != nil, "Encountered computed property name but 'computedTempVariables' argument was not provided.")
 * 				temp := computedTempVariables[computedTempVariableOffset]
 * 				computedTempVariableOffset++
 * 				// typeof _tmp === "symbol" ? _tmp : _tmp + ""
 * 				propertyNames = append(propertyNames, f.NewConditionalExpression(
 * 					f.NewTypeCheck(temp, "symbol"),
 * 					f.NewToken(ast.KindQuestionToken),
 * 					temp,
 * 					f.NewToken(ast.KindColonToken),
 * 					f.NewBinaryExpression(nil, temp, nil, f.NewToken(ast.KindPlusToken), f.NewStringLiteral("", ast.TokenFlagsNone)),
 * 				))
 * 			} else {
 * 				propertyNames = append(propertyNames, f.NewStringLiteralFromNode(propertyName))
 * 			}
 * 		}
 * 	}
 * 	propNames := f.NewArrayLiteralExpression(f.NewNodeList(propertyNames), false)
 * 	propNames.Loc = location
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__rest"),
 * 		nil,
 * 		nil,
 * 		f.NewNodeList([]*ast.Node{
 * 			value,
 * 			propNames,
 * 		}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewRestHelper(receiver: GoPtr<NodeFactory>, value: GoPtr<Expression>, elements: GoSlice<GoPtr<Node>>, computedTempVariables: GoSlice<GoPtr<Node>>, location: TextRange): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, restHelper);
  let propertyNames: GoSlice<GoPtr<Node>> = GoNilSlice();
  let computedTempVariableOffset = 0;
  for (let i = 0; i < elements.length; i++) {
    if (i === elements.length - 1) {
      break;
    }
    const element = GoSliceLoad(elements, i, GoPointerValueOps<Node>());
    const propertyName = TryGetPropertyNameOfBindingOrAssignmentElement(element);
    if (propertyName !== undefined) {
      if (IsComputedPropertyName(propertyName)) {
        const temp = GoSliceLoad(computedTempVariables, computedTempVariableOffset, GoPointerValueOps<Node>());
        computedTempVariableOffset++;
        // typeof _tmp === "symbol" ? _tmp : _tmp + ""
        propertyNames = GoSliceAppend(propertyNames, NewConditionalExpression(
          f,
          NodeFactory_NewTypeCheck(receiver, temp, "symbol"),
          NewToken(f, KindQuestionToken),
          temp,
          NewToken(f, KindColonToken),
          NewBinaryExpression(f, undefined, temp, undefined, NewToken(f, KindPlusToken), NewStringLiteral(f, "", TokenFlagsNone)),
        ), GoPointerValueOps<Node>());
      } else {
        propertyNames = GoSliceAppend(propertyNames, NodeFactory_NewStringLiteralFromNode(receiver, propertyName), GoPointerValueOps<Node>());
      }
    }
  }
  const propNames = NewArrayLiteralExpression(f, NodeFactory_NewNodeList(f, propertyNames), false);
  propNames!.Loc = location;
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__rest"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, value, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, propNames, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAwaitHelper","kind":"method","status":"implemented","sigHash":"086a88229674c5dd3f5a039e9b760998a344c0a175153d0969ca0328321c6532"}
 *
 * Go source:
 * func (f *NodeFactory) NewAwaitHelper(expression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(awaitHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__await"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAwaitHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, awaitHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__await"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAsyncGeneratorHelper","kind":"method","status":"implemented","sigHash":"6b64a8490f2cb00124c28fa7c362cb085ba5263577777654796110e07660974c"}
 *
 * Go source:
 * func (f *NodeFactory) NewAsyncGeneratorHelper(
 * 	generatorFunc *ast.Expression,
 * 	hasLexicalThis bool,
 * ) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(awaitHelper)
 * 	f.emitContext.RequestEmitHelper(asyncGeneratorHelper)
 * 
 * 	// Mark this node as originally an async function body
 * 	f.emitContext.AddEmitFlags(generatorFunc, EFAsyncFunctionBody|EFReuseTempVariableScope)
 * 
 * 	var thisArg *ast.Expression
 * 	if hasLexicalThis {
 * 		thisArg = f.NewKeywordExpression(ast.KindThisKeyword)
 * 	} else {
 * 		thisArg = f.NewVoidZeroExpression()
 * 	}
 * 
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__asyncGenerator"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{
 * 			thisArg,
 * 			f.NewIdentifier("arguments"),
 * 			generatorFunc,
 * 		}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAsyncGeneratorHelper(receiver: GoPtr<NodeFactory>, generatorFunc: GoPtr<Expression>, hasLexicalThis: bool): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, awaitHelper);
  EmitContext_RequestEmitHelper(receiver!.emitContext, asyncGeneratorHelper);

  // Mark this node as originally an async function body
  EmitContext_AddEmitFlags(receiver!.emitContext, generatorFunc, EFAsyncFunctionBody | EFReuseTempVariableScope);

  const thisArg: GoPtr<Expression> = hasLexicalThis
    ? NewKeywordExpression(f, KindThisKeyword)
    : NodeFactory_NewVoidZeroExpression(receiver);

  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__asyncGenerator"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, thisArg, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, NewIdentifier(f, "arguments"), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, generatorFunc, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAsyncDelegatorHelper","kind":"method","status":"implemented","sigHash":"85d4b4b56ccc5ae305ad4b402273b7030bfae3fb284f225d24dc9277aa46ebb4"}
 *
 * Go source:
 * func (f *NodeFactory) NewAsyncDelegatorHelper(expression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(awaitHelper)
 * 	f.emitContext.RequestEmitHelper(asyncDelegatorHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__asyncDelegator"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAsyncDelegatorHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, awaitHelper);
  EmitContext_RequestEmitHelper(receiver!.emitContext, asyncDelegatorHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__asyncDelegator"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAsyncValuesHelper","kind":"method","status":"implemented","sigHash":"df8d6580d6138f039be1b077f5a973b80056202f3ea189057335a7aae04a1cbc"}
 *
 * Go source:
 * func (f *NodeFactory) NewAsyncValuesHelper(expression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(asyncValuesHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__asyncValues"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAsyncValuesHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, asyncValuesHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__asyncValues"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAwaiterHelper","kind":"method","status":"implemented","sigHash":"818e15be850c34d1b0607ff032caece9f3437ae64c42e8bf0a2bed396b8a4aad"}
 *
 * Go source:
 * func (f *NodeFactory) NewAwaiterHelper(
 * 	hasLexicalThis bool,
 * 	argumentsExpression *ast.Expression,
 * 	parameters *ast.NodeList,
 * 	body *ast.BlockNode,
 * ) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(awaiterHelper)
 * 
 * 	var params *ast.NodeList
 * 	if parameters != nil {
 * 		params = parameters
 * 	} else {
 * 		params = f.NewNodeList([]*ast.Node{})
 * 	}
 * 
 * 	generatorFunc := f.NewFunctionExpression(
 * 		nil, /*modifiers* /
 * 		f.NewToken(ast.KindAsteriskToken),
 * 		nil, /*name* /
 * 		nil, /*typeParameters* /
 * 		params,
 * 		nil, /*returnType* /
 * 		nil, /*fullSignature* /
 * 		body,
 * 	)
 * 
 * 	// Mark this node as originally an async function body
 * 	f.emitContext.AddEmitFlags(generatorFunc, EFAsyncFunctionBody|EFReuseTempVariableScope)
 * 
 * 	var thisArg *ast.Expression
 * 	if hasLexicalThis {
 * 		thisArg = f.NewKeywordExpression(ast.KindThisKeyword)
 * 	} else {
 * 		thisArg = f.NewVoidZeroExpression()
 * 	}
 * 
 * 	var argsArg *ast.Expression
 * 	if argumentsExpression != nil {
 * 		argsArg = argumentsExpression
 * 	} else {
 * 		argsArg = f.NewVoidZeroExpression()
 * 	}
 * 
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__awaiter"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{
 * 			thisArg,
 * 			argsArg,
 * 			f.NewVoidZeroExpression(),
 * 			generatorFunc,
 * 		}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAwaiterHelper(receiver: GoPtr<NodeFactory>, hasLexicalThis: bool, argumentsExpression: GoPtr<Expression>, parameters: GoPtr<NodeList>, body: GoPtr<BlockNode>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, awaiterHelper);

  const params: GoPtr<NodeList> = parameters !== undefined ? parameters : NodeFactory_NewNodeList(f, GoSliceMake(0, 0, GoPointerValueOps<Node>()));

  const generatorFunc = NewFunctionExpression(
    f,
    undefined, /*modifiers*/
    NewToken(f, KindAsteriskToken),
    undefined, /*name*/
    undefined, /*typeParameters*/
    params,
    undefined, /*returnType*/
    undefined, /*fullSignature*/
    body,
  );

  // Mark this node as originally an async function body
  EmitContext_AddEmitFlags(receiver!.emitContext, generatorFunc, EFAsyncFunctionBody | EFReuseTempVariableScope);

  const thisArg: GoPtr<Expression> = hasLexicalThis
    ? NewKeywordExpression(f, KindThisKeyword)
    : NodeFactory_NewVoidZeroExpression(receiver);

  const argsArg: GoPtr<Expression> = argumentsExpression !== undefined
    ? argumentsExpression
    : NodeFactory_NewVoidZeroExpression(receiver);

  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__awaiter"),
    undefined, /*questionDotToken*/
    undefined, /*typeArguments*/
    NodeFactory_NewNodeList(f, GoSliceBuild(4, 4, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, thisArg, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, argsArg, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, NodeFactory_NewVoidZeroExpression(receiver), GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, generatorFunc, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassContextObject","kind":"method","status":"implemented","sigHash":"04d9f16cffa994e2e2bdc43eaed2446579dc1e2ba94b5bd5bdc03373831038b1"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassContextObject(nameExpr *ast.Expression, metadata *ast.IdentifierNode) *ast.Expression {
 * 	props := []*ast.Node{
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("kind"), nil, nil, f.NewStringLiteral("class", 0)),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("name"), nil, nil, nameExpr),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("metadata"), nil, nil, metadata),
 * 	}
 * 	return f.NewObjectLiteralExpression(f.NewNodeList(props), false)
 * }
 */
export function NodeFactory_NewESDecorateClassContextObject(receiver: GoPtr<NodeFactory>, nameExpr: GoPtr<Expression>, metadata: GoPtr<IdentifierNode>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  const props: GoSlice<GoPtr<Node>> = GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, NewPropertyAssignment(f, undefined, NewIdentifier(f, "kind"), undefined, undefined, NewStringLiteral(f, "class", 0)), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 1, NewPropertyAssignment(f, undefined, NewIdentifier(f, "name"), undefined, undefined, nameExpr), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 2, NewPropertyAssignment(f, undefined, NewIdentifier(f, "metadata"), undefined, undefined, metadata), GoPointerValueOps<Node>());
  });
  return NewObjectLiteralExpression(f, NodeFactory_NewNodeList(f, props), false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassElementAccessGetMethod","kind":"method","status":"implemented","sigHash":"f2d59a8a96c952737cf7e7bf24d8e9f9ed4967a5b8b48a43acfca66b52d2a04e"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassElementAccessGetMethod(
 * 	nameComputed bool,
 * 	nameExpr *ast.Expression,
 * ) *ast.Node {
 * 	var accessor *ast.Expression
 * 	if nameComputed {
 * 		accessor = f.NewElementAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
 * 	} else {
 * 		accessor = f.NewPropertyAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
 * 	}
 * 
 * 	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)
 * 
 * 	arrow := f.NewArrowFunction(
 * 		nil, nil,
 * 		f.NewNodeList([]*ast.Node{objParam}),
 * 		nil, nil,
 * 		f.NewToken(ast.KindEqualsGreaterThanToken),
 * 		accessor,
 * 	)
 * 
 * 	return f.NewPropertyAssignment(nil, f.NewIdentifier("get"), nil, nil, arrow)
 * }
 */
export function NodeFactory_NewESDecorateClassElementAccessGetMethod(receiver: GoPtr<NodeFactory>, nameComputed: bool, nameExpr: GoPtr<Expression>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  const accessor: GoPtr<Expression> = nameComputed
    ? NewElementAccessExpression(f, NewIdentifier(f, "obj"), undefined, nameExpr, NodeFlagsNone)
    : NewPropertyAccessExpression(f, NewIdentifier(f, "obj"), undefined, nameExpr, NodeFlagsNone);

  const objParam = NewParameterDeclaration(f, undefined, undefined, NewIdentifier(f, "obj"), undefined, undefined, undefined);

  const arrow = NewArrowFunction(
    f,
    undefined, undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, objParam, GoPointerValueOps<Node>());
    })),
    undefined, undefined,
    NewToken(f, KindEqualsGreaterThanToken),
    accessor,
  );

  return NewPropertyAssignment(f, undefined, NewIdentifier(f, "get"), undefined, undefined, arrow);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassElementAccessSetMethod","kind":"method","status":"implemented","sigHash":"d2e100872bdee7c96c6b9b7e5263226098044a27b0f9c541d75b694f3de37ba9"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassElementAccessSetMethod(
 * 	nameComputed bool,
 * 	nameExpr *ast.Expression,
 * ) *ast.Node {
 * 	var accessor *ast.Expression
 * 	if nameComputed {
 * 		accessor = f.NewElementAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
 * 	} else {
 * 		accessor = f.NewPropertyAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
 * 	}
 * 
 * 	assignment := f.NewAssignmentExpression(accessor, f.NewIdentifier("value"))
 * 	stmt := f.NewExpressionStatement(assignment)
 * 	body := f.NewBlock(f.NewNodeList([]*ast.Node{stmt}), false)
 * 
 * 	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)
 * 	valueParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("value"), nil, nil, nil)
 * 
 * 	arrow := f.NewArrowFunction(
 * 		nil, nil,
 * 		f.NewNodeList([]*ast.Node{objParam, valueParam}),
 * 		nil, nil,
 * 		f.NewToken(ast.KindEqualsGreaterThanToken),
 * 		body,
 * 	)
 * 
 * 	return f.NewPropertyAssignment(nil, f.NewIdentifier("set"), nil, nil, arrow)
 * }
 */
export function NodeFactory_NewESDecorateClassElementAccessSetMethod(receiver: GoPtr<NodeFactory>, nameComputed: bool, nameExpr: GoPtr<Expression>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  const accessor: GoPtr<Expression> = nameComputed
    ? NewElementAccessExpression(f, NewIdentifier(f, "obj"), undefined, nameExpr, NodeFlagsNone)
    : NewPropertyAccessExpression(f, NewIdentifier(f, "obj"), undefined, nameExpr, NodeFlagsNone);

  const assignment = NodeFactory_NewAssignmentExpression(receiver, accessor, NewIdentifier(f, "value"));
  const stmt = NewExpressionStatement(f, assignment);
  const body = NewBlock(f, NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, stmt, GoPointerValueOps<Node>());
  })), false);

  const objParam = NewParameterDeclaration(f, undefined, undefined, NewIdentifier(f, "obj"), undefined, undefined, undefined);
  const valueParam = NewParameterDeclaration(f, undefined, undefined, NewIdentifier(f, "value"), undefined, undefined, undefined);

  const arrow = NewArrowFunction(
    f,
    undefined, undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, objParam, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, valueParam, GoPointerValueOps<Node>());
    })),
    undefined, undefined,
    NewToken(f, KindEqualsGreaterThanToken),
    body,
  );

  return NewPropertyAssignment(f, undefined, NewIdentifier(f, "set"), undefined, undefined, arrow);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassElementAccessHasMethod","kind":"method","status":"implemented","sigHash":"66d14160c85fc63bd2adf59f53701720c1acefce2df6ead64cf7b017eac6a51e"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassElementAccessHasMethod(
 * 	nameComputed bool,
 * 	nameExpr *ast.Expression,
 * ) *ast.Node {
 * 	// The property name for the "in" expression
 * 	var propertyName *ast.Expression
 * 	if !nameComputed && nameExpr != nil && ast.IsIdentifier(nameExpr) {
 * 		propertyName = f.NewStringLiteralFromNode(nameExpr)
 * 	} else {
 * 		propertyName = nameExpr
 * 	}
 * 
 * 	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)
 * 	inExpr := f.NewBinaryExpression(nil, propertyName, nil, f.NewToken(ast.KindInKeyword), f.NewIdentifier("obj"))
 * 
 * 	arrow := f.NewArrowFunction(
 * 		nil, nil,
 * 		f.NewNodeList([]*ast.Node{objParam}),
 * 		nil, nil,
 * 		f.NewToken(ast.KindEqualsGreaterThanToken),
 * 		inExpr,
 * 	)
 * 
 * 	return f.NewPropertyAssignment(nil, f.NewIdentifier("has"), nil, nil, arrow)
 * }
 */
export function NodeFactory_NewESDecorateClassElementAccessHasMethod(receiver: GoPtr<NodeFactory>, nameComputed: bool, nameExpr: GoPtr<Expression>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  // The property name for the "in" expression
  const propertyName: GoPtr<Expression> = !nameComputed && nameExpr !== undefined && IsIdentifier(nameExpr)
    ? NodeFactory_NewStringLiteralFromNode(receiver, nameExpr)
    : nameExpr;

  const objParam = NewParameterDeclaration(f, undefined, undefined, NewIdentifier(f, "obj"), undefined, undefined, undefined);
  const inExpr = NewBinaryExpression(f, undefined, propertyName, undefined, NewToken(f, KindInKeyword), NewIdentifier(f, "obj"));

  const arrow = NewArrowFunction(
    f,
    undefined, undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, objParam, GoPointerValueOps<Node>());
    })),
    undefined, undefined,
    NewToken(f, KindEqualsGreaterThanToken),
    inExpr,
  );

  return NewPropertyAssignment(f, undefined, NewIdentifier(f, "has"), undefined, undefined, arrow);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassElementAccessObject","kind":"method","status":"implemented","sigHash":"e6bf5b934bf84784cacc95f210305dc1f193f99fd77531e4276db57c2c13cd1c"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassElementAccessObject(
 * 	nameComputed bool,
 * 	nameExpr *ast.Expression,
 * 	hasGet bool,
 * 	hasSet bool,
 * ) *ast.Expression {
 * 	accessProps := []*ast.Node{}
 * 
 * 	// "has" method: obj => name in obj
 * 	accessProps = append(accessProps, f.NewESDecorateClassElementAccessHasMethod(nameComputed, nameExpr))
 * 
 * 	// "get" method: obj => obj.name or obj => obj[name]
 * 	if hasGet {
 * 		accessProps = append(accessProps, f.NewESDecorateClassElementAccessGetMethod(nameComputed, nameExpr))
 * 	}
 * 
 * 	// "set" method: (obj, value) => { obj.name = value; } or (obj, value) => { obj[name] = value; }
 * 	if hasSet {
 * 		accessProps = append(accessProps, f.NewESDecorateClassElementAccessSetMethod(nameComputed, nameExpr))
 * 	}
 * 
 * 	return f.NewObjectLiteralExpression(f.NewNodeList(accessProps), false)
 * }
 */
export function NodeFactory_NewESDecorateClassElementAccessObject(receiver: GoPtr<NodeFactory>, nameComputed: bool, nameExpr: GoPtr<Expression>, hasGet: bool, hasSet: bool): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  let accessProps: GoSlice<GoPtr<Node>> = GoNilSlice();

  // "has" method: obj => name in obj
  accessProps = GoSliceAppend(accessProps, NodeFactory_NewESDecorateClassElementAccessHasMethod(receiver, nameComputed, nameExpr), GoPointerValueOps<Node>());

  // "get" method: obj => obj.name or obj => obj[name]
  if (hasGet) {
    accessProps = GoSliceAppend(accessProps, NodeFactory_NewESDecorateClassElementAccessGetMethod(receiver, nameComputed, nameExpr), GoPointerValueOps<Node>());
  }

  // "set" method: (obj, value) => { obj.name = value; } or (obj, value) => { obj[name] = value; }
  if (hasSet) {
    accessProps = GoSliceAppend(accessProps, NodeFactory_NewESDecorateClassElementAccessSetMethod(receiver, nameComputed, nameExpr), GoPointerValueOps<Node>());
  }

  return NewObjectLiteralExpression(f, NodeFactory_NewNodeList(f, accessProps), false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateClassElementContextObject","kind":"method","status":"implemented","sigHash":"5c0e1d5157ce59a555d52660509de2afca8d5cb4498f3649d703a2de1e13283c"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateClassElementContextObject(
 * 	kind string,
 * 	nameComputed bool,
 * 	nameExpr *ast.Expression,
 * 	isStatic bool,
 * 	isPrivate bool,
 * 	hasGet bool,
 * 	hasSet bool,
 * 	metadata *ast.IdentifierNode,
 * ) *ast.Expression {
 * 	// Build the name value for the context's "name" property
 * 	var nameValue *ast.Expression
 * 	if !nameComputed && nameExpr != nil && (ast.IsPrivateIdentifier(nameExpr) || ast.IsIdentifier(nameExpr)) {
 * 		nameValue = f.NewStringLiteralFromNode(nameExpr)
 * 	} else {
 * 		nameValue = nameExpr
 * 	}
 * 
 * 	// Build the access object with has/get/set arrow functions
 * 	accessObj := f.NewESDecorateClassElementAccessObject(nameComputed, nameExpr, hasGet, hasSet)
 * 
 * 	var staticExpr *ast.Node
 * 	if isStatic {
 * 		staticExpr = f.NewTrueExpression()
 * 	} else {
 * 		staticExpr = f.NewFalseExpression()
 * 	}
 * 
 * 	var privateExpr *ast.Node
 * 	if isPrivate {
 * 		privateExpr = f.NewTrueExpression()
 * 	} else {
 * 		privateExpr = f.NewFalseExpression()
 * 	}
 * 
 * 	props := []*ast.Node{
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("kind"), nil, nil, f.NewStringLiteral(kind, 0)),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("name"), nil, nil, nameValue),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("static"), nil, nil, staticExpr),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("private"), nil, nil, privateExpr),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("access"), nil, nil, accessObj),
 * 		f.NewPropertyAssignment(nil, f.NewIdentifier("metadata"), nil, nil, metadata),
 * 	}
 * 	return f.NewObjectLiteralExpression(f.NewNodeList(props), false)
 * }
 */
export function NodeFactory_NewESDecorateClassElementContextObject(receiver: GoPtr<NodeFactory>, kind: string, nameComputed: bool, nameExpr: GoPtr<Expression>, isStatic: bool, isPrivate: bool, hasGet: bool, hasSet: bool, metadata: GoPtr<IdentifierNode>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  // Build the name value for the context's "name" property
  const nameValue: GoPtr<Expression> = !nameComputed && nameExpr !== undefined && (IsPrivateIdentifier(nameExpr) || IsIdentifier(nameExpr))
    ? NodeFactory_NewStringLiteralFromNode(receiver, nameExpr)
    : nameExpr;

  // Build the access object with has/get/set arrow functions
  const accessObj = NodeFactory_NewESDecorateClassElementAccessObject(receiver, nameComputed, nameExpr, hasGet, hasSet);

  const staticExpr: GoPtr<Node> = isStatic
    ? NodeFactory_NewTrueExpression(receiver)
    : NodeFactory_NewFalseExpression(receiver);

  const privateExpr: GoPtr<Node> = isPrivate
    ? NodeFactory_NewTrueExpression(receiver)
    : NodeFactory_NewFalseExpression(receiver);

  const props: GoSlice<GoPtr<Node>> = GoSliceBuild(6, 6, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, NewPropertyAssignment(f, undefined, NewIdentifier(f, "kind"), undefined, undefined, NewStringLiteral(f, kind, 0)), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 1, NewPropertyAssignment(f, undefined, NewIdentifier(f, "name"), undefined, undefined, nameValue), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 2, NewPropertyAssignment(f, undefined, NewIdentifier(f, "static"), undefined, undefined, staticExpr), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 3, NewPropertyAssignment(f, undefined, NewIdentifier(f, "private"), undefined, undefined, privateExpr), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 4, NewPropertyAssignment(f, undefined, NewIdentifier(f, "access"), undefined, undefined, accessObj), GoPointerValueOps<Node>());
    GoSliceStore(__goSliceLiteral, 5, NewPropertyAssignment(f, undefined, NewIdentifier(f, "metadata"), undefined, undefined, metadata), GoPointerValueOps<Node>());
  });
  return NewObjectLiteralExpression(f, NodeFactory_NewNodeList(f, props), false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewESDecorateHelper","kind":"method","status":"implemented","sigHash":"7aa36484b4618d77aa789b48d01a12a3f9f7059bd6419bb846384a9d9a86645c"}
 *
 * Go source:
 * func (f *NodeFactory) NewESDecorateHelper(ctor *ast.Expression, descriptorIn *ast.Expression, decorators *ast.Expression, contextIn *ast.Expression, initializers *ast.Expression, extraInitializers *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(esDecorateHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__esDecorate"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewESDecorateHelper(receiver: GoPtr<NodeFactory>, ctor: GoPtr<Expression>, descriptorIn: GoPtr<Expression>, decorators: GoPtr<Expression>, contextIn: GoPtr<Expression>, initializers: GoPtr<Expression>, extraInitializers: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, esDecorateHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__esDecorate"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(6, 6, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, ctor, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, descriptorIn, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, decorators, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 3, contextIn, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 4, initializers, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 5, extraInitializers, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewRunInitializersHelper","kind":"method","status":"implemented","sigHash":"567cc8687e3e3bab4c30805b51dd7c5bde2e1d09807a7d2f9a0dc05e3a572b94"}
 *
 * Go source:
 * func (f *NodeFactory) NewRunInitializersHelper(thisArg *ast.Expression, initializers *ast.Expression, value *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(runInitializersHelper)
 * 	var arguments []*ast.Expression
 * 	if value != nil {
 * 		arguments = []*ast.Expression{thisArg, initializers, value}
 * 	} else {
 * 		arguments = []*ast.Expression{thisArg, initializers}
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__runInitializers"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(arguments),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewRunInitializersHelper(receiver: GoPtr<NodeFactory>, thisArg: GoPtr<Expression>, initializers: GoPtr<Expression>, value: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, runInitializersHelper);
  const args: GoSlice<GoPtr<Expression>> = value !== undefined
    ? GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, thisArg, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, initializers, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, value, GoPointerValueOps<Node>());
    })
    : GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, thisArg, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, initializers, GoPointerValueOps<Node>());
    });
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__runInitializers"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, args),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewTemplateObjectHelper","kind":"method","status":"implemented","sigHash":"a42d9cb8d3bca58bea97ad02778210b0ba04414f97e50782e72b63cfdc0c7c33"}
 *
 * Go source:
 * func (f *NodeFactory) NewTemplateObjectHelper(cookedArray *ast.Expression, rawArray *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(makeTemplateObjectHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__makeTemplateObject"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{cookedArray, rawArray}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewTemplateObjectHelper(receiver: GoPtr<NodeFactory>, cookedArray: GoPtr<Expression>, rawArray: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, makeTemplateObjectHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__makeTemplateObject"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, cookedArray, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, rawArray, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewPropKeyHelper","kind":"method","status":"implemented","sigHash":"2cd1c9c62c0f6f25c024e3ef7395e371378fc84491c6bad996f7f12f18e4c4bb"}
 *
 * Go source:
 * func (f *NodeFactory) NewPropKeyHelper(expr *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(propKeyHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__propKey"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expr}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewPropKeyHelper(receiver: GoPtr<NodeFactory>, expr: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, propKeyHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__propKey"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expr, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewSetFunctionNameHelper","kind":"method","status":"implemented","sigHash":"84921489cb579917fb5c8c19e69d04a621f6ff185b956e7a34f25cea691c2ad7"}
 *
 * Go source:
 * func (f *NodeFactory) NewSetFunctionNameHelper(fn *ast.Expression, name *ast.Expression, prefix string) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(setFunctionNameHelper)
 * 	var arguments []*ast.Expression
 * 	if len(prefix) > 0 {
 * 		arguments = []*ast.Expression{fn, name, f.NewStringLiteral(prefix, ast.TokenFlagsNone)}
 * 	} else {
 * 		arguments = []*ast.Expression{fn, name}
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__setFunctionName"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(arguments),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewSetFunctionNameHelper(receiver: GoPtr<NodeFactory>, fn: GoPtr<Expression>, name: GoPtr<Expression>, prefix: string): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, setFunctionNameHelper);
  const args: GoSlice<GoPtr<Expression>> = prefix.length > 0
    ? GoSliceBuild(3, 3, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, fn, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, name, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 2, NewStringLiteral(f, prefix, TokenFlagsNone), GoPointerValueOps<Node>());
    })
    : GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, fn, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, name, GoPointerValueOps<Node>());
    });
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__setFunctionName"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, args),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewImportDefaultHelper","kind":"method","status":"implemented","sigHash":"27a33a85a16d17b0ea506c1a9c47142e58c03add4844a7266d579bb81953b03c"}
 *
 * Go source:
 * func (f *NodeFactory) NewImportDefaultHelper(expression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(importDefaultHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__importDefault"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewImportDefaultHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, importDefaultHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__importDefault"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewImportStarHelper","kind":"method","status":"implemented","sigHash":"68d8f2ee50016c0017c71fed74d2341b9312d649aea543e965cfe45bbdb47cad"}
 *
 * Go source:
 * func (f *NodeFactory) NewImportStarHelper(expression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(importStarHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__importStar"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{expression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewImportStarHelper(receiver: GoPtr<NodeFactory>, expression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, importStarHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__importStar"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, expression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewExportStarHelper","kind":"method","status":"implemented","sigHash":"e8d42590918c13134da9ed1858ffd5aef3337ac26b4ae1a83c5df800af7dba02"}
 *
 * Go source:
 * func (f *NodeFactory) NewExportStarHelper(moduleExpression *ast.Expression, exportsExpression *ast.Expression) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(exportStarHelper)
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__exportStar"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList([]*ast.Expression{moduleExpression, exportsExpression}),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewExportStarHelper(receiver: GoPtr<NodeFactory>, moduleExpression: GoPtr<Expression>, exportsExpression: GoPtr<Expression>): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, exportStarHelper);
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__exportStar"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, moduleExpression, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, exportsExpression, GoPointerValueOps<Node>());
    })),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewAssignmentTargetWrapper","kind":"method","status":"implemented","sigHash":"05292a8713012246c159c10364eb72c643dbf05e2c5516adeb73b74bdc24442c"}
 *
 * Go source:
 * func (f *NodeFactory) NewAssignmentTargetWrapper(paramName *ast.IdentifierNode, expression *ast.Expression) *ast.Node {
 * 	setAccessor := f.NewSetAccessorDeclaration(
 * 		nil, /*modifiers* /
 * 		f.NewIdentifier("value"),
 * 		nil, /*typeParameters* /
 * 		f.NewNodeList([]*ast.Node{
 * 			f.NewParameterDeclaration(nil, nil, paramName, nil, nil, nil),
 * 		}),
 * 		nil, /*returnType* /
 * 		nil, /*fullSignature* /
 * 		f.NewBlock(f.NewNodeList([]*ast.Node{
 * 			f.NewExpressionStatement(expression),
 * 		}), false),
 * 	)
 * 	objLiteral := f.NewObjectLiteralExpression(f.NewNodeList([]*ast.Node{setAccessor}), false)
 * 	// Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
 * 	return f.NewPropertyAccessExpression(
 * 		f.NewParenthesizedExpression(objLiteral),
 * 		nil, /*questionDotToken* /
 * 		f.NewIdentifier("value"),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewAssignmentTargetWrapper(receiver: GoPtr<NodeFactory>, paramName: GoPtr<IdentifierNode>, expression: GoPtr<Expression>): GoPtr<Node> {
  const f = receiver!.__tsgoEmbedded0!;
  const setAccessor = NewSetAccessorDeclaration(
    f,
    undefined,
    NewIdentifier(f, "value"),
    undefined,
    NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, NewParameterDeclaration(f, undefined, undefined, paramName, undefined, undefined, undefined), GoPointerValueOps<Node>());
    })),
    undefined,
    undefined,
    NewBlock(f, NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, NewExpressionStatement(f, expression), GoPointerValueOps<Node>());
    })), false),
  );
  const objLiteral = NewObjectLiteralExpression(f, NodeFactory_NewNodeList(f, GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, setAccessor, GoPointerValueOps<Node>());
  })), false);
  return NewPropertyAccessExpression(
    f,
    NewParenthesizedExpression(f, objLiteral),
    undefined,
    NewIdentifier(f, "value"),
    NodeFlagsNone,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/factory.go::method::NodeFactory.NewRewriteRelativeImportExtensionsHelper","kind":"method","status":"implemented","sigHash":"dbcbd572f1c6c99748040daa64b5eb02017ce4ec48ec30d162e55a6f6f0b32b8"}
 *
 * Go source:
 * func (f *NodeFactory) NewRewriteRelativeImportExtensionsHelper(firstArgument *ast.Node, preserveJsx bool) *ast.Expression {
 * 	f.emitContext.RequestEmitHelper(rewriteRelativeImportExtensionsHelper)
 * 	var arguments []*ast.Expression
 * 	if preserveJsx {
 * 		arguments = []*ast.Expression{firstArgument, f.NewToken(ast.KindTrueKeyword)}
 * 	} else {
 * 		arguments = []*ast.Expression{firstArgument}
 * 	}
 * 	return f.NewCallExpression(
 * 		f.NewUnscopedHelperName("__rewriteRelativeImportExtension"),
 * 		nil, /*questionDotToken* /
 * 		nil, /*typeArguments* /
 * 		f.NewNodeList(arguments),
 * 		ast.NodeFlagsNone,
 * 	)
 * }
 */
export function NodeFactory_NewRewriteRelativeImportExtensionsHelper(receiver: GoPtr<NodeFactory>, firstArgument: GoPtr<Node>, preserveJsx: bool): GoPtr<Expression> {
  const f = receiver!.__tsgoEmbedded0!;
  EmitContext_RequestEmitHelper(receiver!.emitContext, rewriteRelativeImportExtensionsHelper);
  const args: GoSlice<GoPtr<Expression>> = preserveJsx
    ? GoSliceBuild(2, 2, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, firstArgument, GoPointerValueOps<Node>());
      GoSliceStore(__goSliceLiteral, 1, NewToken(f, KindTrueKeyword), GoPointerValueOps<Node>());
    })
    : GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, firstArgument, GoPointerValueOps<Node>());
    });
  return NewCallExpression(
    f,
    NodeFactory_NewUnscopedHelperName(receiver, "__rewriteRelativeImportExtension"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(f, args),
    NodeFlagsNone,
  );
}
