import type { bool, int } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { Node, NodeList, ModifierList, NodeVisitor } from "../ast/spine.js";
import type { SourceFile } from "../ast/ast.js";
import type { TypeNode } from "../ast/generated/unions.js";
import type { Symbol } from "../ast/symbol.js";
import type { SymbolFlags } from "../ast/generated/flags.js";
import { KindAnyKeyword, KindAssertKeyword, KindComputedPropertyName, KindJSDocParameterTag, KindJSDocPropertyTag, KindKeyOfKeyword, KindNullKeyword, KindQuestionToken, KindSymbolKeyword, KindUndefinedKeyword, KindUniqueKeyword } from "../ast/generated/kinds.js";
import { TokenFlagsNone, TokenFlagsSingleQuote } from "../ast/tokenflags.js";
import { NewArrayTypeNode, NewCallSignatureDeclaration, NewComputedPropertyName, NewConditionalTypeNode, NewConstructSignatureDeclaration, NewConstructorTypeNode, NewFunctionTypeNode, NewIdentifier, NewImportTypeNode, NewIndexedAccessTypeNode, NewJSDocSignature, NewKeywordExpression, NewKeywordTypeNode, NewLiteralTypeNode, NewPropertySignatureDeclaration, NewStringLiteral, NewToken, NewTypeLiteralNode, NewTypeOperatorNode, NewTypePredicateNode, NewTypeQueryNode, NewTypeReferenceNode, NewUnionTypeNode, NodeFactory_UpdateCallSignatureDeclaration, NodeFactory_UpdateComputedPropertyName, NodeFactory_UpdateConditionalTypeNode, NodeFactory_UpdateConstructSignatureDeclaration, NodeFactory_UpdateFunctionTypeNode, NodeFactory_UpdateImportTypeNode, NodeFactory_UpdateIndexedAccessTypeNode, NodeFactory_UpdateJSDocSignature, NodeFactory_UpdateTypeOperatorNode, NodeFactory_UpdateTypePredicateNode, NodeFactory_UpdateTypeQueryNode, NodeFactory_UpdateTypeReferenceNode } from "../ast/generated/factory.js";
import { AsCallSignatureDeclaration, AsComputedPropertyName, AsConditionalTypeNode, AsConstructSignatureDeclaration, AsConstructorTypeNode, AsFunctionTypeNode, AsIdentifier, AsImportAttributes, AsImportTypeNode, AsIndexSignatureDeclaration, AsIndexedAccessTypeNode, AsJSDocNonNullableType, AsJSDocNullableType, AsJSDocOptionalType, AsJSDocParameterOrPropertyTag, AsJSDocSignature, AsJSDocTypeExpression, AsJSDocTypeLiteral, AsJSDocVariadicType, AsLiteralTypeNode, AsMappedTypeNode, AsMethodSignatureDeclaration, AsParameterDeclaration, AsQualifiedName, AsStringLiteral, AsTypeOperatorNode, AsTypeParameterDeclaration, AsTypePredicateNode, AsTypeQueryNode, AsTypeReferenceNode } from "../ast/generated/casts.js";
import {
  IsComputedPropertyName,
  IsCallSignatureDeclaration,
  IsConditionalTypeNode,
  IsConstructSignatureDeclaration,
  IsConstructorTypeNode,
  IsIdentifier,
  IsExpressionWithTypeArguments,
  IsFunctionTypeNode,
  IsImportTypeNode,
  IsIndexedAccessTypeNode,
  IsIndexSignatureDeclaration,
  IsJSDocAllType,
  IsJSDocNonNullableType,
  IsJSDocNullableType,
  IsJSDocOptionalType,
  IsJSDocSignature,
  IsJSDocParameterTag,
  IsJSDocTypeExpression,
  IsJSDocTypeLiteral,
  IsJSDocVariadicType,
  IsMappedTypeNode,
  IsMethodSignatureDeclaration,
  IsPropertyDeclaration,
  IsPropertySignatureDeclaration,
  IsParameterDeclaration,
  IsQualifiedName,
  IsStringLiteral,
  IsThisTypeNode,
  IsTupleTypeNode,
  IsTypeLiteralNode,
  IsTypeOperatorNode,
  IsTypeParameterDeclaration,
  IsTypePredicateNode,
  IsTypeQueryNode,
  IsTypeReferenceNode,
} from "../ast/generated/predicates.js";
import { Node_Clone, Node_ForEachChild, Node_Modifiers, Node_Name, Node_VisitEachChild, NodeFactory_NewNodeList, NodeList_Clone } from "../ast/spine.js";
import type { NodeVisitor as ConcreteNodeVisitor } from "../ast/visitor.js";
import { NewNodeVisitor, NodeVisitor_VisitModifiers, NodeVisitor_VisitNode, NodeVisitor_VisitNodes } from "../ast/visitor.js";
import type { LinkStore } from "../core/linkstore.js";
import { LinkStore_Get } from "../core/linkstore.js";
import { NewTextRange } from "../core/text.js";
import type { SymbolTracker } from "../nodebuilder/types.js";
import { FlagsMultilineObjectLiterals, FlagsUseSingleQuotesForStringLiteralType, InternalFlagsAllowUnresolvedNames } from "../nodebuilder/types.js";
import { EFNoAsciiEscaping, EFSingleLine } from "../printer/emitflags.js";
import { EmitContext_AddEmitFlags, EmitContext_MostOriginal, EmitContext_SetOriginal } from "../printer/emitcontext.js";
import {
  classifyPropertyName,
  NodeBuilderImpl_checkTypeExpandability,
  NodeBuilderImpl_canReuseExistingJSTypeNode,
  NodeBuilderImpl_getTypeFromTypeNode,
  NodeBuilderImpl_newIdentifier,
  NodeBuilderImpl_serializeTypeName,
  NodeBuilderImpl_setTextRange,
  NodeBuilderImpl_tryGetResolvedSymbolFromTypeNode,
  NodeBuilderImpl_typeParameterToName,
  NodeBuilderImpl_typeToTypeNode,
  propertyNameNodeKindIdentifier,
  propertyNameNodeKindStringLiteral,
} from "./nodebuilderimpl.js";
import { SymbolFlagsFunctionScopedVariable, SymbolFlagsType, SymbolFlagsTypeParameter, SymbolFlagsValue } from "../ast/generated/flags.js";
import { FindAncestor, GetFirstIdentifier, GetSourceFileOfNode, HasDynamicName, IsConstTypeReference, IsDeclarationName, IsEntityNameExpression, IsExportsIdentifier, IsFunctionLike, IsInJSFile, IsLiteralImportTypeNode, IsModuleExportsAccessExpression, IsModuleIdentifier, IsPartOfParameterDeclaration, IsStringLiteralLike, IsThisIdentifier, IsTypeNode, NodeIsSynthesized, SkipParentheses, TryGetTextOfPropertyName } from "../ast/utilities.js";
import { Node_Initializer, Node_PostfixToken, Node_Text, Node_Symbol, Node_Type, NodeFactory_UpdateConstructorTypeNode, NodeFactory_UpdateIndexSignatureDeclaration, NodeFactory_UpdateMethodSignatureDeclaration, NodeFactory_UpdateParameterDeclaration, NodeFactory_UpdatePropertyDeclaration, NodeFactory_UpdatePropertySignatureDeclaration, NodeFactory_UpdateTypeParameterDeclaration } from "../ast/ast.js";
import { ResolutionModeNone } from "../core/compileroptions.js";
import { SymbolAccessibilityAccessible } from "../printer/emitresolver.js";
import { Checker_IsSymbolAccessible } from "./symbolaccessibility.js";
import type { Checker } from "./checker/state.js";
import { Checker_checkNotCanceled, IsExternalModuleSymbol } from "./utilities.js";
import { Checker_getThisContainer } from "./checker/support-queries.js";
import { NodeFactory_DeepCloneNode } from "../ast/deepclone.js";
import { Checker_getResolutionModeOverride } from "./checker/classes.js";
import { NewSymbolTrackerImpl, SymbolTrackerImpl_as_SymbolTracker } from "./symboltracker.js";
import { NodeBuilderImpl_lookupSymbolChain, NodeBuilderImpl_getSpecifierForModuleSymbol } from "./nodebuilderimpl.js";
import { NodeBuilderImpl_enterNewScope } from "./nodebuilderscopes.js";
import { TypeMapper_Map } from "./mapper.js";
import { Checker_getDeclaredTypeOfSymbol, Checker_getExportSymbolOfValueSymbolIfExported, Checker_getExternalModuleFileFromDeclaration, Checker_getPropertyOfType, Checker_getSymbolIfSameReference, Checker_getSymbolOfDeclaration, Checker_hasLateBindableName, Checker_checkComputedPropertyName, Checker_resolveEntityName } from "./checker/symbols.js";
import { Checker_getDeclaredTypeOfTypeParameter, Checker_getInferTypeParameters, Checker_getSignatureFromDeclaration } from "./checker/signatures.js";
import { getMeaningOfEntityNameReference } from "./emitresolver.js";
import type { NodeBuilderContext, NodeBuilderImpl, NodeBuilderLinks, TrackedSymbolArgs } from "./nodebuilderimpl.js";
import type { Type } from "./types.js";
import { TypeFlagsAny } from "./types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.reuseNode","kind":"method","status":"implemented","sigHash":"4dd3d0a7af1286966a11e12383e2ef457a4a06fd6f05408d7ceada8f3bde9de2","bodyHash":"163e063ba136506af7ea7baaafbe0a06ab5cb754809819c5fc86ba9c3c19fd30"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) reuseNode(node *ast.Node) *ast.Node {
 * 	if node == nil {
 * 		return node
 * 	}
 *
 * 	return b.tryReuseExistingNodeHelper(node)
 * }
 */
export function NodeBuilderImpl_reuseNode(receiver: GoPtr<NodeBuilderImpl>, node: GoPtr<Node>): GoPtr<Node> {
  if (node === undefined) {
    return node;
  }

  return NodeBuilderImpl_tryReuseExistingNodeHelper(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.tryJSTypeNodeToTypeNode","kind":"method","status":"implemented","sigHash":"5488dfba909936bf6f3262e21428eac3034269906a941a606bbd3ff454921403","bodyHash":"6c7ed7aad1729cfc610232786f3b82f72d711f588f7b98d82888d2a14bcf9f2c"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) tryJSTypeNodeToTypeNode(node *ast.Node) *ast.Node {
 * 	return b.reuseNode(node)
 * }
 */
export function NodeBuilderImpl_tryJSTypeNodeToTypeNode(receiver: GoPtr<NodeBuilderImpl>, node: GoPtr<Node>): GoPtr<Node> {
  return NodeBuilderImpl_reuseNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.reuseName","kind":"method","status":"implemented","sigHash":"5df99735ef14d158dfea3be1c7b4f2f0919d2c484d5cb4a9e518d1ea020d1cc4","bodyHash":"8a732b81e3c69d1ce54c94ed84befa993c5dd959f2009c9fd0b298896296f181"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) reuseName(node *ast.Node, isMethod bool) *ast.Node {
 * 	res := b.reuseNode(node)
 * 	if res == nil {
 * 		return res
 * 	}
 *
 * 	text, ok := ast.TryGetTextOfPropertyName(res)
 * 	if !ok {
 * 		return res
 * 	}
 *
 * 	kind := classifyPropertyName(text, ast.IsStringLiteral(res), isMethod)
 * 	if ast.IsIdentifier(res) && kind == propertyNameNodeKindIdentifier {
 * 		return res
 * 	}
 * 	if ast.IsStringLiteral(res) && kind == propertyNameNodeKindStringLiteral {
 * 		return res
 * 	}
 *
 * 	var renamed *ast.Node
 * 	switch kind {
 * 	case propertyNameNodeKindIdentifier:
 * 		renamed = b.newIdentifier(text, nil)
 * 	case propertyNameNodeKindStringLiteral:
 * 		renamed = b.f.NewStringLiteral(text, ast.TokenFlagsNone)
 * 	default:
 * 		return res
 * 	}
 * 	b.e.SetOriginal(renamed, res)
 * 	return b.setTextRange(renamed, res)
 * }
 */
export function NodeBuilderImpl_reuseName(receiver: GoPtr<NodeBuilderImpl>, node: GoPtr<Node>, isMethod: bool): GoPtr<Node> {
  const res = NodeBuilderImpl_reuseNode(receiver, node);
  if (res === undefined) {
    return res;
  }
  const [text, ok] = TryGetTextOfPropertyName(res);
  if (!ok) {
    return res;
  }
  const kind = classifyPropertyName(text, IsStringLiteral(res), isMethod);
  if (IsIdentifier(res) && kind === propertyNameNodeKindIdentifier) {
    return res;
  }
  if (IsStringLiteral(res) && kind === propertyNameNodeKindStringLiteral) {
    return res;
  }
  let renamed: GoPtr<Node>;
  switch (kind) {
    case propertyNameNodeKindIdentifier:
      renamed = NodeBuilderImpl_newIdentifier(receiver, text, undefined);
      break;
    case propertyNameNodeKindStringLiteral:
      renamed = NewStringLiteral(receiver!.f, text, TokenFlagsNone);
      break;
    default:
      return res;
  }
  EmitContext_SetOriginal(receiver!.e, renamed, res);
  return NodeBuilderImpl_setTextRange(receiver, renamed, res);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.reuseTypeNode","kind":"method","status":"implemented","sigHash":"44f85ffcc5adf7a0b1f1fc08b424255efcd99f93c880403dcd085937da9f8304","bodyHash":"ca12a6192d27bb497b5a980118521793ffe640a48ffa3c70dd476c9a70cd7fe3"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) reuseTypeNode(node *ast.Node) *ast.Node {
 * 	if node == nil {
 * 		return node
 * 	}
 * 	r := b.reuseNode(node)
 * 	if r != nil {
 * 		// After successful reuse during hover, probe the reused AST for expandable
 * 		// type references so canIncreaseExpansionDepth is set even though
 * 		// typeToTypeNode (and shouldExpandType) were never called.
 * 		if b.ctx.maxExpansionDepth >= 0 && !b.ctx.canIncreaseExpansionDepth {
 * 			b.walkNodeForExpandability(node)
 * 		}
 * 		return r
 * 	}
 * 	b.ctx.tracker.ReportInferenceFallback(node)
 * 	t := b.getTypeFromTypeNode(node, false)
 * 	return b.typeToTypeNode(t)
 * }
 */
export function NodeBuilderImpl_reuseTypeNode(receiver: GoPtr<NodeBuilderImpl>, node: GoPtr<Node>): GoPtr<Node> {
  if (node === undefined) {
    return node;
  }
  const r = NodeBuilderImpl_reuseNode(receiver, node);
  if (r !== undefined) {
    // After successful reuse during hover, probe the reused AST for expandable
    // type references so canIncreaseExpansionDepth is set even though
    // typeToTypeNode (and shouldExpandType) were never called.
    if (receiver!.ctx!.maxExpansionDepth >= 0 && !receiver!.ctx!.canIncreaseExpansionDepth) {
      NodeBuilderImpl_walkNodeForExpandability(receiver, node);
    }
    return r;
  }
  receiver!.ctx!.tracker!.ReportInferenceFallback(node);
  const t = NodeBuilderImpl_getTypeFromTypeNode(receiver, node, false);
  return NodeBuilderImpl_typeToTypeNode(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.walkNodeForExpandability","kind":"method","status":"implemented","sigHash":"042f02ce100844abc395a5cd6c47c6f9cc17dd4ef114519542cd4f1a06c81080","bodyHash":"a432668379d9de14ca951ab367ce4571cd22ef36ce4a7e2c9c9d6801e7cb3a67"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) walkNodeForExpandability(node *ast.Node) {
 * 	if b.ctx.canIncreaseExpansionDepth || node == nil {
 * 		return
 * 	}
 * 	// Check these explicitly so we look into type arguments wehther or not they are in the tree or not.
 * 	if ast.IsTypeReferenceNode(node) || ast.IsExpressionWithTypeArguments(node) || ast.IsTypePredicateNode(node) || ast.IsImportTypeNode(node) {
 * 		t := b.getTypeFromTypeNode(node, false)
 * 		if t != nil {
 * 			b.checkTypeExpandability(t)
 * 			if b.ctx.canIncreaseExpansionDepth {
 * 				return
 * 			}
 * 		}
 * 	}
 * 	node.ForEachChild(func(child *ast.Node) bool {
 * 		b.walkNodeForExpandability(child)
 * 		return b.ctx.canIncreaseExpansionDepth
 * 	})
 * }
 */
export function NodeBuilderImpl_walkNodeForExpandability(receiver: GoPtr<NodeBuilderImpl>, node: GoPtr<Node>): void {
  if (receiver!.ctx!.canIncreaseExpansionDepth || node === undefined) {
    return;
  }
  // Check these explicitly so we look into type arguments wehther or not they are in the tree or not.
  if (IsTypeReferenceNode(node) || IsExpressionWithTypeArguments(node) || IsTypePredicateNode(node) || IsImportTypeNode(node)) {
    const t = NodeBuilderImpl_getTypeFromTypeNode(receiver, node, false);
    if (t !== undefined) {
      NodeBuilderImpl_checkTypeExpandability(receiver, t);
      if (receiver!.ctx!.canIncreaseExpansionDepth) {
        return;
      }
    }
  }
  Node_ForEachChild(node, (child: GoPtr<Node>): bool => {
    NodeBuilderImpl_walkNodeForExpandability(receiver, child);
    return receiver!.ctx!.canIncreaseExpansionDepth;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::type::recoveryBoundary","kind":"type","status":"implemented","sigHash":"aad68436aa790ac9d6f7b6f40b29f65ab8c7f5efdb07a00cc46305232db29361","bodyHash":"3c90613cf27f9ed5f28d731564e404c30b853c0f8f8f7f2d47190fec407997f4"}
 *
 * Go source:
 * recoveryBoundary struct {
 * 	ctx                  *NodeBuilderContext
 * 	hadError             bool
 * 	deferredReports      []func()
 * 	oldTracker           nodebuilder.SymbolTracker
 * 	oldTrackedSymbols    []*TrackedSymbolArgs
 * 	trackedSymbols       []*TrackedSymbolArgs
 * 	oldEncounteredError  bool
 * 	oldApproximateLength int
 * }
 */
export interface recoveryBoundary {
  ctx: GoPtr<NodeBuilderContext>;
  hadError: bool;
  deferredReports: GoSlice<() => void>;
  oldTracker: SymbolTracker;
  oldTrackedSymbols: GoSlice<GoPtr<TrackedSymbolArgs>>;
  trackedSymbols: GoSlice<GoPtr<TrackedSymbolArgs>>;
  oldEncounteredError: bool;
  oldApproximateLength: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::recoveryBoundary.markError","kind":"method","status":"implemented","sigHash":"4c9a198de34bd44348be3bb07fc3d697d095f0c9b1fce5c552127dc32e237848","bodyHash":"77dbf371ea7a6e0356d780855557491acd55664485da71d1750338dc231da854"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Recovery paths call markError(nil) when an unsupported reuse shape must mark the boundary failed but has no diagnostic callback to replay. The method always sets hadError and appends only non-nil callbacks; TypeScript uses undefined for that no-report callback case.","goSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/checker/nodecopy.ts::recoveryBoundary>,()=>void)=>void","tsSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/checker/nodecopy.ts::recoveryBoundary>,packages/tsts/src/go/compat.ts::GoPtr<()=>void>)=>void"}
 *
 * Go source:
 * func (b *recoveryBoundary) markError(f func()) {
 * 	b.hadError = true
 * 	if f != nil {
 * 		b.deferredReports = append(b.deferredReports, f)
 * 	}
 * }
 */
export function recoveryBoundary_markError(receiver: GoPtr<recoveryBoundary>, f: GoPtr<() => void>): void {
  receiver!.hadError = true;
  if (f !== undefined) {
    receiver!.deferredReports = [...receiver!.deferredReports, f];
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::type::originalRecoveryScopeState","kind":"type","status":"implemented","sigHash":"17868c9eb4bdb62f8e69dfcf2dc37e58285961730abbb71bb4a5d1dd30d369b1","bodyHash":"273bdf3eb30aa9915d831797147441a4da7a69505e0b8317f91473bd4cffe0e4"}
 *
 * Go source:
 * originalRecoveryScopeState struct {
 * 	trackedSymbolsTop   int
 * 	unreportedErrorsTop int
 * 	hadError            bool
 * }
 */
export interface originalRecoveryScopeState {
  trackedSymbolsTop: int;
  unreportedErrorsTop: int;
  hadError: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::recoveryBoundary.startRecoveryScope","kind":"method","status":"implemented","sigHash":"20fa9da11af2b7708ed84fa9f2964ae123fd808730ac7d747f109f1653687e39","bodyHash":"1368c3701b269adcca8d9dde4a241473e8149ac021f32654e24fb2870cafc30b"}
 *
 * Go source:
 * func (b *recoveryBoundary) startRecoveryScope() originalRecoveryScopeState {
 * 	trackedSymbolsTop := len(b.ctx.trackedSymbols)
 * 	unreportedErrorsTop := len(b.deferredReports)
 * 	return originalRecoveryScopeState{trackedSymbolsTop: trackedSymbolsTop, unreportedErrorsTop: unreportedErrorsTop, hadError: b.hadError}
 * }
 */
export function recoveryBoundary_startRecoveryScope(receiver: GoPtr<recoveryBoundary>): originalRecoveryScopeState {
  const trackedSymbolsTop = receiver!.ctx!.trackedSymbols.length as int;
  const unreportedErrorsTop = receiver!.deferredReports.length as int;
  return { trackedSymbolsTop: trackedSymbolsTop, unreportedErrorsTop: unreportedErrorsTop, hadError: receiver!.hadError };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::recoveryBoundary.endRecoveryScope","kind":"method","status":"implemented","sigHash":"625e4568435e9578d735d3d9e631f1ea994c78b08a1025ce33320eed2fa52975","bodyHash":"48c89709cd5dcfca40aee56b8074102166909bd3b8be59e41f039a4327464b03"}
 *
 * Go source:
 * func (b *recoveryBoundary) endRecoveryScope(state originalRecoveryScopeState) {
 * 	b.hadError = state.hadError
 * 	b.ctx.trackedSymbols = b.ctx.trackedSymbols[0:state.trackedSymbolsTop]
 * 	b.deferredReports = b.deferredReports[0:state.unreportedErrorsTop]
 * }
 */
export function recoveryBoundary_endRecoveryScope(receiver: GoPtr<recoveryBoundary>, state: originalRecoveryScopeState): void {
  receiver!.hadError = state.hadError;
  receiver!.ctx!.trackedSymbols = receiver!.ctx!.trackedSymbols.slice(0, state.trackedSymbolsTop);
  receiver!.deferredReports = receiver!.deferredReports.slice(0, state.unreportedErrorsTop);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::type::wrappingTracker","kind":"type","status":"implemented","sigHash":"7268cd1c8ec3e18435be81b0f2825958c81c7068e40c22ed602676f6fc9a2cfc","bodyHash":"f97b3c7689dd5f04f41b67a6aeacc15f845c3d3a7c4ad96bde331e9d17311dde"}
 *
 * Go source:
 * wrappingTracker struct {
 * 	wrapped nodebuilder.SymbolTracker
 * 	bound   *recoveryBoundary
 * }
 */
export interface wrappingTracker {
  wrapped: SymbolTracker;
  bound: GoPtr<recoveryBoundary>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.PopErrorFallbackNode","kind":"method","status":"implemented","sigHash":"5e7c1a63d688b7eff38ed2753fdfc3cf334fe37f7077f3e63de47d7aa1f15ee2","bodyHash":"873e486c1fbd29e5a9406e2bb23eb9915a09dfac014ec065e16ffdaac447a177"}
 *
 * Go source:
 * func (w *wrappingTracker) PopErrorFallbackNode() {
 * 	w.wrapped.PopErrorFallbackNode()
 * }
 */
export function wrappingTracker_PopErrorFallbackNode(receiver: GoPtr<wrappingTracker>): void {
  receiver!.wrapped!.PopErrorFallbackNode();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.PushErrorFallbackNode","kind":"method","status":"implemented","sigHash":"dcd05322fb627e5669df47b7c7a1e8ec41842bdc031b73a0346e7699e6444f68","bodyHash":"b5e1208c3ea5466a49c6205a21e2739adb84f5d6091bae7fb354607dfb011683"}
 *
 * Go source:
 * func (w *wrappingTracker) PushErrorFallbackNode(node *ast.Node) {
 * 	w.wrapped.PushErrorFallbackNode(node)
 * }
 */
export function wrappingTracker_PushErrorFallbackNode(receiver: GoPtr<wrappingTracker>, node: GoPtr<Node>): void {
  receiver!.wrapped!.PushErrorFallbackNode(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportCyclicStructureError","kind":"method","status":"implemented","sigHash":"c939dc4cd31aec0ee6e62651c7b40fced64db490898538188c2d45ddc812c198","bodyHash":"efdbe89fbb30ab7d2dd478eaa2bdcd657771db9669683f0bafd4814571e9f24f"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportCyclicStructureError() {
 * 	w.bound.markError(w.wrapped.ReportCyclicStructureError)
 * }
 */
export function wrappingTracker_ReportCyclicStructureError(receiver: GoPtr<wrappingTracker>): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportCyclicStructureError();
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportInaccessibleThisError","kind":"method","status":"implemented","sigHash":"e2a1dc7abc4900d5930f88d4de58738873d9048eaa1eadf20d488fe14336fa21","bodyHash":"23d25b00768b85bc3c4dfb042db3eb9d76c270a0bcbc25b82dcad794081faf60"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportInaccessibleThisError() {
 * 	w.bound.markError(w.wrapped.ReportInaccessibleThisError)
 * }
 */
export function wrappingTracker_ReportInaccessibleThisError(receiver: GoPtr<wrappingTracker>): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportInaccessibleThisError();
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportInaccessibleUniqueSymbolError","kind":"method","status":"implemented","sigHash":"6e016a418c496007a5fa4f87ad1eb32b4587eb96187ec8b4da7255a8badcf7ed","bodyHash":"927b98869011ca5d990f466f9d15545eb806830516418b04ae2008e909315888"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportInaccessibleUniqueSymbolError() {
 * 	w.bound.markError(w.wrapped.ReportInaccessibleUniqueSymbolError)
 * }
 */
export function wrappingTracker_ReportInaccessibleUniqueSymbolError(receiver: GoPtr<wrappingTracker>): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportInaccessibleUniqueSymbolError();
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportInferenceFallback","kind":"method","status":"implemented","sigHash":"ba8c035f8c55fc18ee868186175c510b2fb772ebdc999f4166d3e961cd1e006b","bodyHash":"afe668dddee1a790a5c6144e82081e00612bf73e8c5c65990bbaa6a92e9d7792"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportInferenceFallback(node *ast.Node) {
 * 	w.wrapped.ReportInferenceFallback(node) // Should this also be deferred?
 * }
 */
export function wrappingTracker_ReportInferenceFallback(receiver: GoPtr<wrappingTracker>, node: GoPtr<Node>): void {
  receiver!.wrapped!.ReportInferenceFallback(node); // Should this also be deferred?
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportLikelyUnsafeImportRequiredError","kind":"method","status":"implemented","sigHash":"479ff9e60022779c1f666d6206e2af708e26e4b04ad274bf1e34854a22fc9bf5","bodyHash":"b18171fa49e0fd5c7db505db316a9ff2277f829297eda027ec34cff6f8ba47ac"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportLikelyUnsafeImportRequiredError(specifier string, symbolName string) {
 * 	w.bound.markError(func() { w.wrapped.ReportLikelyUnsafeImportRequiredError(specifier, symbolName) })
 * }
 */
export function wrappingTracker_ReportLikelyUnsafeImportRequiredError(receiver: GoPtr<wrappingTracker>, specifier: string, symbolName: string): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportLikelyUnsafeImportRequiredError(specifier, symbolName);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportNonSerializableProperty","kind":"method","status":"implemented","sigHash":"ab98c34f31a9627fccef9f5158dd6308b810faf398936deaa6d8301dbc717440","bodyHash":"48557e96652ae33408ce4ff815b960117f591106a55f954c052b5aaf3c66d48f"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportNonSerializableProperty(propertyName string) {
 * 	w.bound.markError(func() { w.wrapped.ReportNonSerializableProperty(propertyName) })
 * }
 */
export function wrappingTracker_ReportNonSerializableProperty(receiver: GoPtr<wrappingTracker>, propertyName: string): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportNonSerializableProperty(propertyName);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportNonlocalAugmentation","kind":"method","status":"implemented","sigHash":"3c36c9997ce56aae033ef419bc89c44d5d1cb1ff941d8508ca59a445377bbcce","bodyHash":"b154c6b4e3f3edd823d8ee37c3e4665f597de504d1d7da67b2dde0e071883416"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol) {
 * 	w.wrapped.ReportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol) // Should this also be deferred?
 * }
 */
export function wrappingTracker_ReportNonlocalAugmentation(receiver: GoPtr<wrappingTracker>, containingFile: GoPtr<SourceFile>, parentSymbol: GoPtr<Symbol>, augmentingSymbol: GoPtr<Symbol>): void {
  receiver!.wrapped!.ReportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol); // Should this also be deferred?
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportPrivateInBaseOfClassExpression","kind":"method","status":"implemented","sigHash":"52c581a929ddabb52b8ad9563547bfbda5b1ae9385813417fbee180f4ea6e300","bodyHash":"18e3fa516de7e216f8bdcca641f44a0a61a816d6c0f2ab2b019e7493885c0ea0"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportPrivateInBaseOfClassExpression(propertyName string) {
 * 	w.bound.markError(func() { w.wrapped.ReportPrivateInBaseOfClassExpression(propertyName) })
 * }
 */
export function wrappingTracker_ReportPrivateInBaseOfClassExpression(receiver: GoPtr<wrappingTracker>, propertyName: string): void {
  recoveryBoundary_markError(receiver!.bound, () => {
    receiver!.wrapped!.ReportPrivateInBaseOfClassExpression(propertyName);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.ReportTruncationError","kind":"method","status":"implemented","sigHash":"5263f962deeafc6217394bd5d99921949cb53a0ab97d83f4ce48bf5d55121188","bodyHash":"b7cbfab2a0ab25d4937ef7f1abe06c884474bf1791b34c2a3b28c1afa506e21f"}
 *
 * Go source:
 * func (w *wrappingTracker) ReportTruncationError() {
 * 	w.wrapped.ReportTruncationError() // Should this also be deferred?
 * }
 */
export function wrappingTracker_ReportTruncationError(receiver: GoPtr<wrappingTracker>): void {
  receiver!.wrapped!.ReportTruncationError(); // Should this also be deferred?
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::wrappingTracker.TrackSymbol","kind":"method","status":"implemented","sigHash":"e40917de1e33ffea57dab2771576bc9f8bdc57e68c2073dc5e17dbfc11686e6f","bodyHash":"5190f71ddf93ee6975aea1f1a8ae28677d65f1f021735ea338e52ce048a22810"}
 *
 * Go source:
 * func (w *wrappingTracker) TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
 * 	w.bound.trackedSymbols = append(w.bound.trackedSymbols, &TrackedSymbolArgs{symbol, enclosingDeclaration, meaning})
 * 	return false
 * }
 */
export function wrappingTracker_TrackSymbol(receiver: GoPtr<wrappingTracker>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags): bool {
  const arg: TrackedSymbolArgs = { "symbol": symbol_, enclosingDeclaration: enclosingDeclaration, meaning: meaning };
  receiver!.bound!.trackedSymbols = [...receiver!.bound!.trackedSymbols, arg];
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::func::newWrappingTracker","kind":"func","status":"implemented","sigHash":"5261e4da67345757b09b70ed8e79495114ff491eaf63578f565f009ef93fcef7","bodyHash":"efddc49fe16e0513c1a73359e978d7e09b4ecded2535302df5d8a6fc8f9a12f8"}
 *
 * Go source:
 * func newWrappingTracker(inner nodebuilder.SymbolTracker, bound *recoveryBoundary) *wrappingTracker {
 * 	return &wrappingTracker{
 * 		wrapped: inner,
 * 		bound:   bound,
 * 	}
 * }
 */
export function newWrappingTracker(inner: SymbolTracker, bound: GoPtr<recoveryBoundary>): GoPtr<wrappingTracker> {
  return {
    wrapped: inner,
    bound: bound,
  };
}

export function wrappingTracker_as_SymbolTracker(receiver: GoPtr<wrappingTracker>): GoPtr<SymbolTracker> {
  if (receiver === undefined) {
    return undefined;
  }
  return {
    TrackSymbol: (symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags): bool =>
      wrappingTracker_TrackSymbol(receiver, symbol_, enclosingDeclaration, meaning),
    ReportInaccessibleThisError: (): void => wrappingTracker_ReportInaccessibleThisError(receiver),
    ReportPrivateInBaseOfClassExpression: (propertyName: string): void =>
      wrappingTracker_ReportPrivateInBaseOfClassExpression(receiver, propertyName),
    ReportInaccessibleUniqueSymbolError: (): void => wrappingTracker_ReportInaccessibleUniqueSymbolError(receiver),
    ReportCyclicStructureError: (): void => wrappingTracker_ReportCyclicStructureError(receiver),
    ReportLikelyUnsafeImportRequiredError: (specifier: string, symbolName: string): void =>
      wrappingTracker_ReportLikelyUnsafeImportRequiredError(receiver, specifier, symbolName),
    ReportTruncationError: (): void => wrappingTracker_ReportTruncationError(receiver),
    ReportNonlocalAugmentation: (containingFile: GoPtr<SourceFile>, parentSymbol: GoPtr<Symbol>, augmentingSymbol: GoPtr<Symbol>): void =>
      wrappingTracker_ReportNonlocalAugmentation(receiver, containingFile, parentSymbol, augmentingSymbol),
    ReportNonSerializableProperty: (propertyName: string): void =>
      wrappingTracker_ReportNonSerializableProperty(receiver, propertyName),
    ReportInferenceFallback: (node: GoPtr<Node>): void => wrappingTracker_ReportInferenceFallback(receiver, node),
    PushErrorFallbackNode: (node: GoPtr<Node>): void => wrappingTracker_PushErrorFallbackNode(receiver, node),
    PopErrorFallbackNode: (): void => wrappingTracker_PopErrorFallbackNode(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.createRecoveryBoundary","kind":"method","status":"implemented","sigHash":"865e5f4dfd3e740abccad8455472128a5898b6d6c04b1efc7da8802449f71575","bodyHash":"94d2d70a3dd769933524b1c1d6299e431f89850b0de1c1dbf385bce992fcc946"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) createRecoveryBoundary() *recoveryBoundary {
 * 	b.ch.checkNotCanceled()
 * 	bound := &recoveryBoundary{ctx: b.ctx, oldTracker: b.ctx.tracker, oldTrackedSymbols: b.ctx.trackedSymbols, oldEncounteredError: b.ctx.encounteredError, oldApproximateLength: b.ctx.approximateLength}
 * 	newTracker := NewSymbolTrackerImpl(b.ctx, newWrappingTracker(b.ctx.tracker, bound))
 * 	b.ctx.tracker = newTracker
 * 	b.ctx.trackedSymbols = nil
 * 	return bound
 * }
 */
export function NodeBuilderImpl_createRecoveryBoundary(receiver: GoPtr<NodeBuilderImpl>): GoPtr<recoveryBoundary> {
  Checker_checkNotCanceled(receiver!.ch);
  const bound: recoveryBoundary = {
    ctx: receiver!.ctx,
    oldTracker: receiver!.ctx!.tracker!,
    oldTrackedSymbols: receiver!.ctx!.trackedSymbols,
    oldEncounteredError: receiver!.ctx!.encounteredError,
    oldApproximateLength: receiver!.ctx!.approximateLength,
    hadError: false,
    deferredReports: [],
    trackedSymbols: [],
  };
  const newTracker = NewSymbolTrackerImpl(receiver!.ctx, wrappingTracker_as_SymbolTracker(newWrappingTracker(receiver!.ctx!.tracker!, bound)));
  receiver!.ctx!.tracker = SymbolTrackerImpl_as_SymbolTracker(newTracker);
  receiver!.ctx!.trackedSymbols = [];
  return bound;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.finalizeBoundary","kind":"method","status":"implemented","sigHash":"57082edb608f416244cb4807c41e2abd1149a13d050daf652c582dc47823db94","bodyHash":"0600bc21675157f883744878bf11b1bc307bcdece83e85693b36718cbff51538"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) finalizeBoundary(bound *recoveryBoundary) bool {
 * 	b.ctx.tracker = bound.oldTracker
 * 	b.ctx.trackedSymbols = bound.oldTrackedSymbols
 * 	b.ctx.encounteredError = bound.oldEncounteredError
 * 	b.ctx.approximateLength = bound.oldApproximateLength
 *
 * 	for _, f := range bound.deferredReports {
 * 		f()
 * 	}
 * 	if bound.hadError {
 * 		return false
 * 	}
 * 	for _, a := range bound.trackedSymbols {
 * 		b.ctx.tracker.TrackSymbol(a.symbol, a.enclosingDeclaration, a.meaning)
 * 	}
 * 	return true
 * }
 */
export function NodeBuilderImpl_finalizeBoundary(receiver: GoPtr<NodeBuilderImpl>, bound: GoPtr<recoveryBoundary>): bool {
  receiver!.ctx!.tracker = bound!.oldTracker;
  receiver!.ctx!.trackedSymbols = bound!.oldTrackedSymbols;
  receiver!.ctx!.encounteredError = bound!.oldEncounteredError;
  receiver!.ctx!.approximateLength = bound!.oldApproximateLength;

  for (const f of bound!.deferredReports) {
    f();
  }
  if (bound!.hadError) {
    return false;
  }
  for (const a of bound!.trackedSymbols) {
    receiver!.ctx!.tracker!.TrackSymbol(a!["symbol"], a!.enclosingDeclaration, a!.meaning);
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.tryReuseExistingNodeHelper","kind":"method","status":"implemented","sigHash":"c0f3a922317b5f0fdf2262ed81a7c4e222651bd0007fb3912de401c9ed6b63e5","bodyHash":"0f45f4753b177d777fa107349d3b459581ef8114c42bf328bec5304fa5a35f55"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) tryReuseExistingNodeHelper(existing *ast.TypeNode) *ast.TypeNode {
 * 	bound := b.createRecoveryBoundary()
 * 	var transformed *ast.Node
 * 	v := getExistingNodeTreeVisitor(b, bound) // !!! TODO: Cache visitor and just reset bound+host builder? We try this for a *lot* of nodes.
 * 	transformed = v.VisitNode(existing)
 * 	if !b.finalizeBoundary(bound) {
 * 		return nil
 * 	}
 * 	b.ctx.approximateLength += existing.Loc.End() - existing.Loc.Pos()
 * 	return transformed
 * }
 */
export function NodeBuilderImpl_tryReuseExistingNodeHelper(receiver: GoPtr<NodeBuilderImpl>, existing: GoPtr<TypeNode>): GoPtr<TypeNode> {
  const b = receiver!;
  const bound = NodeBuilderImpl_createRecoveryBoundary(b);
  const visitor = getExistingNodeTreeVisitor(b, bound) as GoPtr<ConcreteNodeVisitor>;
  const transformed = NodeVisitor_VisitNode(visitor, existing as GoPtr<Node>) as GoPtr<TypeNode>;
  if (!NodeBuilderImpl_finalizeBoundary(b, bound)) {
    return undefined;
  }
  b.ctx!.approximateLength += existing!.Loc.end - existing!.Loc.pos;
  return transformed;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.getModuleSpecifierOverride","kind":"method","status":"implemented","sigHash":"25bd0b1a05d2e56e9f22ed4747a0c00d98f5bb8e806aabb5463763d69859196c","bodyHash":"818f67e0dfb34f911d474806e1a351b71794c5612c1a7b023e0a207fe1677345"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) getModuleSpecifierOverride(parent *ast.Node, lit *ast.Node) string {
 * 	if b.ctx.enclosingFile != ast.GetSourceFileOfNode(lit) {
 * 		mode := core.ResolutionModeNone
 * 		if parent.AsImportTypeNode().Attributes != nil {
 * 			mode = b.ch.getResolutionModeOverride(parent.AsImportTypeNode().Attributes.AsImportAttributes(), false)
 * 		}
 * 		name := lit.Text()
 * 		originalName := name
 * 		nodeSymbol := b.tryGetResolvedSymbolFromTypeNode(parent)
 * 		meaning := ast.SymbolFlagsType
 * 		if parent.AsImportTypeNode().IsTypeOf {
 * 			meaning = ast.SymbolFlagsValue
 * 		}
 * 		var parentSymbol *ast.Symbol
 * 		if nodeSymbol != nil && b.ch.IsSymbolAccessible(nodeSymbol, b.ctx.enclosingDeclaration, meaning, false).Accessibility == printer.SymbolAccessibilityAccessible {
 * 			parentSymbol = b.lookupSymbolChain(nodeSymbol, meaning, true)[0]
 * 		}
 * 		if parentSymbol != nil && IsExternalModuleSymbol(parentSymbol) {
 * 			name = b.getSpecifierForModuleSymbol(parentSymbol, mode)
 * 		} else {
 * 			targetFile := b.ch.getExternalModuleFileFromDeclaration(parent)
 * 			if targetFile != nil {
 * 				name = b.getSpecifierForModuleSymbol(targetFile.Symbol, mode)
 * 			}
 * 		}
 * 		if len(name) > 0 && strings.Contains(name, "/node_modules/") {
 * 			b.ctx.encounteredError = true
 * 			b.ctx.tracker.ReportLikelyUnsafeImportRequiredError(name, "")
 * 		}
 * 		if name != originalName {
 * 			return name
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function NodeBuilderImpl_getModuleSpecifierOverride(receiver: GoPtr<NodeBuilderImpl>, parent: GoPtr<Node>, lit: GoPtr<Node>): string {
  if (receiver!.ctx!.enclosingFile !== GetSourceFileOfNode(lit)) {
    let mode = ResolutionModeNone;
    const importTypeNode = AsImportTypeNode(parent)!;
    if (importTypeNode.Attributes !== undefined) {
      mode = Checker_getResolutionModeOverride(receiver!.ch, AsImportAttributes(importTypeNode.Attributes), false);
    }
    let name = Node_Text(lit);
    const originalName = name;
    const nodeSymbol = NodeBuilderImpl_tryGetResolvedSymbolFromTypeNode(receiver, parent);
    let meaning: SymbolFlags = SymbolFlagsType;
    if (importTypeNode.IsTypeOf) {
      meaning = SymbolFlagsValue;
    }
    let parentSymbol = undefined;
    if (nodeSymbol !== undefined && Checker_IsSymbolAccessible(receiver!.ch, nodeSymbol, receiver!.ctx!.enclosingDeclaration, meaning, false).Accessibility === SymbolAccessibilityAccessible) {
      parentSymbol = NodeBuilderImpl_lookupSymbolChain(receiver, nodeSymbol, meaning, true)[0];
    }
    if (parentSymbol !== undefined && IsExternalModuleSymbol(parentSymbol)) {
      name = NodeBuilderImpl_getSpecifierForModuleSymbol(receiver, parentSymbol, mode);
    } else {
      const targetFile = Checker_getExternalModuleFileFromDeclaration(receiver!.ch, parent);
      if (targetFile !== undefined) {
        name = NodeBuilderImpl_getSpecifierForModuleSymbol(receiver, Node_Symbol(targetFile), mode);
      }
    }
    if (name.length > 0 && name.includes("/node_modules/")) {
      receiver!.ctx!.encounteredError = true;
      receiver!.ctx!.tracker!.ReportLikelyUnsafeImportRequiredError(name, "");
    }
    if (name !== originalName) {
      return name;
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.rewriteModuleSpecifier","kind":"method","status":"implemented","sigHash":"b5bed9b3055c1bdeb13e8f8c09d45d7edd0379e4597ad8f501fb542e6928e391","bodyHash":"13440531d128aae45cb860c35eee2cd527e60cbc6f9519c9c10bbc0847dce569"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) rewriteModuleSpecifier(parent *ast.Node, lit *ast.Node) *ast.Node {
 * 	newName := b.getModuleSpecifierOverride(parent, lit)
 * 	if len(newName) == 0 {
 * 		return lit
 * 	}
 * 	res := b.f.NewStringLiteral(newName, ast.TokenFlagsNone)
 * 	b.e.SetOriginal(res, lit)
 * 	return res
 * }
 */
export function NodeBuilderImpl_rewriteModuleSpecifier(receiver: GoPtr<NodeBuilderImpl>, parent: GoPtr<Node>, lit: GoPtr<Node>): GoPtr<Node> {
  const newName = NodeBuilderImpl_getModuleSpecifierOverride(receiver, parent, lit);
  if (newName.length === 0) {
    return lit;
  }
  const res = NewStringLiteral(receiver!.f, newName, TokenFlagsNone);
  EmitContext_SetOriginal(receiver!.e, res, lit);
  return res;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::method::NodeBuilderImpl.getEnclosingDeclarationIgnoringFakeScope","kind":"method","status":"implemented","sigHash":"a5b74c1a87faf0bd1db48a711a4c76532d774a889ffede1a60504d465b78594e","bodyHash":"c7f7ad9088c3d88a7ca1262708c6a9c4f8e72d534a35a965ee840a3cd55c8731"}
 *
 * Go source:
 * func (b *NodeBuilderImpl) getEnclosingDeclarationIgnoringFakeScope() *ast.Node {
 * 	enc := b.ctx.enclosingDeclaration
 * 	for enc != nil && b.links.Get(enc).fakeScopeForSignatureDeclaration != nil {
 * 		enc = enc.Parent
 * 	}
 * 	return enc
 * }
 */
export function NodeBuilderImpl_getEnclosingDeclarationIgnoringFakeScope(receiver: GoPtr<NodeBuilderImpl>): GoPtr<Node> {
  const links = receiver!.links as LinkStore<GoPtr<Node>, NodeBuilderLinks>;
  const loop = (enc: GoPtr<Node>): GoPtr<Node> => {
    if (enc === undefined) return undefined;
    if (LinkStore_Get(links, enc)!.fakeScopeForSignatureDeclaration === undefined) return enc;
    return loop(enc.Parent);
  };
  return loop(receiver!.ctx!.enclosingDeclaration);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodecopy.go::func::getExistingNodeTreeVisitor","kind":"func","status":"implemented","sigHash":"f23a46dc64b0d3a0dcb8be0adbb3b14920a0890683fe6d3ae276db72fa8babde","bodyHash":"2e05d3eaac42877bd706511eae3e2309600dbc7e20ba7e5e20543e5dfbc878d6"}
 *
 * Go source:
 * func getExistingNodeTreeVisitor(b *NodeBuilderImpl, bound *recoveryBoundary) *ast.NodeVisitor {
 * 	// TODO: wrap all these closures into methods on an object so we can guarantee we reuse the same memory on each invocation by reusing/resetting the object
 * 	// instead of re-closing-over all of these each time we need a visitor. In theory the compiler could handle this, but in practice closure inlining hasn't been reliable
 * 	var visitor *ast.NodeVisitor
 * 	// note: also handles renaming type parameters renamed within the current context
 * 	attachSymbolToLeftmostIdentifier := func(leftmost *ast.Node, node *ast.Node, sym *ast.Symbol) *ast.Node {
 * 		var vis *ast.NodeVisitor
 * 		visitorFunc := func(node *ast.Node) *ast.Node {
 * 			if node == leftmost {
 * 				var type_ *Type
 * 				var name *ast.Node
 * 				if sym != nil {
 * 					type_ = b.ch.getDeclaredTypeOfSymbol(sym)
 * 					if sym.Flags&ast.SymbolFlagsTypeParameter != 0 {
 * 						name = b.typeParameterToName(type_).AsNode()
 * 					}
 * 				}
 * 				if name == nil {
 * 					name = b.newIdentifier(node.Text(), sym)
 * 				}
 * 				name = b.setTextRange(name, node)
 * 				b.e.AddEmitFlags(name, printer.EFNoAsciiEscaping)
 * 				return name
 * 			}
 * 			return b.setTextRange(node.VisitEachChild(vis), node)
 * 		}
 * 		vis = ast.NewNodeVisitor(visitorFunc, b.f, ast.NodeVisitorHooks{})
 * 		return visitorFunc(node)
 * 	}
 * 	trackExistingEntityName := func(node *ast.Node, overrideEnclosing *ast.Node) (bool, *ast.Node, *ast.Symbol) {
 * 		enclosingDeclaration := b.ctx.enclosingDeclaration
 * 		if overrideEnclosing != nil {
 * 			enclosingDeclaration = overrideEnclosing
 * 		}
 * 		introducesError := false
 * 		leftmost := ast.GetFirstIdentifier(node)
 * 		if ast.IsInJSFile(node) && (ast.IsExportsIdentifier(leftmost) || ast.IsModuleExportsAccessExpression(leftmost.Parent) || (ast.IsQualifiedName(leftmost.Parent) && ast.IsModuleIdentifier(leftmost.Parent.AsQualifiedName().Left) && ast.IsExportsIdentifier(leftmost.Parent.AsQualifiedName().Right))) {
 * 			introducesError = true
 * 			return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), nil
 * 		}
 * 		meaning := getMeaningOfEntityNameReference(node)
 * 		var sym *ast.Symbol
 * 		if ast.IsThisIdentifier(leftmost) {
 * 			// `this` isn't a bindable identifier - skip resolution, find a relevant `this` symbol directly and avoid exhaustive scope traversal
 * 			sym = b.ch.getSymbolOfDeclaration(b.ch.getThisContainer(leftmost, false, false))
 * 			if b.ch.IsSymbolAccessible(sym, leftmost, meaning, false).Accessibility != printer.SymbolAccessibilityAccessible {
 * 				introducesError = true
 * 				b.ctx.tracker.ReportInaccessibleThisError()
 * 			}
 * 			return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
 * 		}
 * 		sym = b.ch.resolveEntityName(leftmost, meaning, true, true, nil)
 * 		if b.ctx.enclosingDeclaration != nil && !(sym != nil && sym.Flags&ast.SymbolFlagsTypeParameter != 0) {
 * 			sym = b.ch.getExportSymbolOfValueSymbolIfExported(sym)
 * 			// Some declarations may be transplanted to a new location.
 * 			// When this happens we need to make sure that the name has the same meaning at both locations
 * 			// We also check for the unknownSymbol because when we create a fake scope some parameters may actually not be usable
 * 			// either because they are the expanded rest parameter,
 * 			// or because they are the newly added parameters from the tuple, which might have different meanings in the original context
 * 			symAtLocation := b.ch.resolveEntityName(leftmost, meaning, true, true, b.ctx.enclosingDeclaration)
 * 			if
 * 			// Check for unusable parameters symbols
 * 			symAtLocation == b.ch.unknownSymbol ||
 * 				// If the symbol is not found, but was not found in the original scope either we probably have an error, don't reuse the node
 * 				(symAtLocation == nil && sym != nil) ||
 * 				// If the symbol is found both in declaration scope and in current scope then it should point to the same reference
 * 				(symAtLocation != nil && sym != nil && b.ch.getSymbolIfSameReference(b.ch.getExportSymbolOfValueSymbolIfExported(symAtLocation), sym) == nil) {
 * 				// In isolated declaration we will not do rest parameter expansion so there is no need to report on these.
 * 				if symAtLocation != b.ch.unknownSymbol {
 * 					b.ctx.tracker.ReportInferenceFallback(node)
 * 				}
 * 				introducesError = true
 * 				return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), sym
 * 			} else {
 * 				sym = symAtLocation
 * 			}
 * 		}
 *
 * 		if sym != nil {
 * 			// If a parameter is resolvable in the current context it is also visible, so no need to go to symbol accesibility
 * 			if sym.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 && sym.ValueDeclaration != nil {
 * 				if ast.IsPartOfParameterDeclaration(sym.ValueDeclaration) || ast.IsJSDocParameterTag(sym.ValueDeclaration) {
 * 					return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
 * 				}
 * 			}
 * 			if sym.Flags&ast.SymbolFlagsTypeParameter == 0 /* Type parameters are visible in the current context if they are are resolvable * / && !ast.IsDeclarationName(node) &&
 * 				b.ch.IsSymbolAccessible(sym, enclosingDeclaration, meaning, false).Accessibility != printer.SymbolAccessibilityAccessible {
 * 				b.ctx.tracker.ReportInferenceFallback(node)
 * 				introducesError = true
 * 			} else {
 * 				b.ctx.tracker.TrackSymbol(sym, enclosingDeclaration, meaning)
 * 			}
 * 			return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
 * 		}
 * 		return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), nil
 * 	}
 * 	var tryVisitSimpleTypeNode func(node *ast.Node) *ast.Node
 * 	tryVisitIndexedAccess := func(node *ast.Node) *ast.Node {
 * 		resultObjectType := tryVisitSimpleTypeNode(node.AsIndexedAccessTypeNode().ObjectType)
 * 		if resultObjectType == nil {
 * 			return nil
 * 		}
 * 		return b.setTextRange(b.f.UpdateIndexedAccessTypeNode(node.AsIndexedAccessTypeNode(), resultObjectType, visitor.VisitNode(node.AsIndexedAccessTypeNode().IndexType)), node)
 * 	}
 * 	tryVisitKeyOf := func(node *ast.Node) *ast.Node {
 * 		to := node.AsTypeOperatorNode()
 * 		t := tryVisitSimpleTypeNode(to.Type)
 * 		if t == nil {
 * 			return nil
 * 		}
 * 		return b.setTextRange(b.f.UpdateTypeOperatorNode(to, to.Operator, t), node)
 * 	}
 * 	tryVisitTypeQuery := func(node *ast.Node) *ast.Node {
 * 		introducesError, exprName, _ := trackExistingEntityName(node.AsTypeQueryNode().ExprName, nil)
 * 		if !introducesError {
 * 			return b.setTextRange(b.f.UpdateTypeQueryNode(
 * 				node.AsTypeQueryNode(),
 * 				exprName,
 * 				visitor.VisitNodes(node.AsTypeQueryNode().TypeArguments),
 * 			), node)
 * 		}
 *
 * 		serializedName := b.serializeTypeName(node.AsTypeQueryNode().ExprName, true, visitor.VisitNodes(node.AsTypeQueryNode().TypeArguments))
 * 		if serializedName != nil {
 * 			return b.setTextRange(serializedName, node.AsTypeQueryNode().ExprName)
 * 		}
 * 		return nil
 * 	}
 * 	tryVisitTypeReference := func(node *ast.Node) *ast.Node {
 * 		if ast.IsConstTypeReference(node) {
 * 			return nil
 * 		}
 * 		s := b.tryGetResolvedSymbolFromTypeNode(node)
 * 		if s == nil {
 * 			return nil // ???
 * 		}
 * 		if s.Flags&ast.SymbolFlagsTypeParameter != 0 {
 * 			declaredType := b.ch.getDeclaredTypeOfSymbol(s)
 * 			if b.ctx.mapper != nil && b.ctx.mapper.Map(declaredType) != declaredType {
 * 				return nil // refers to type parameter remapped by context (TODO improvement: just return the remapped param name?)
 * 			}
 * 		}
 * 		if !b.canReuseExistingJSTypeNode(node, b.getTypeFromTypeNode(node, false)) {
 * 			// fallback to serialization for jsdoc types that have insufficient or incomplete type args, or are remapped by the checker in only jsdoc contexts
 * 			// TODO: remappings like `promise` -> `Promise<any>` are static, we *could* statically remap the nodes, too. But that only matters for `isolatedDeclarations`
 * 			// in JS, should we enable that.
 * 			return nil
 * 		}
 * 		introducesError, newName, _ := trackExistingEntityName(node.AsTypeReferenceNode().TypeName, nil)
 * 		if !introducesError {
 * 			typeArguments := visitor.VisitNodes(node.AsTypeReferenceNode().TypeArguments)
 * 			return b.setTextRange(b.f.UpdateTypeReferenceNode(
 * 				node.AsTypeReferenceNode(),
 * 				newName,
 * 				typeArguments,
 * 			), node)
 * 		} else {
 * 			serializedName := b.serializeTypeName(node.AsTypeReferenceNode().TypeName, false, visitor.VisitNodes(node.AsTypeReferenceNode().TypeArguments))
 * 			if serializedName != nil {
 * 				return b.setTextRange(serializedName, node.AsTypeReferenceNode().TypeName)
 * 			}
 * 			return nil
 * 		}
 * 	}
 * 	tryVisitSimpleTypeNode = func(node *ast.Node) *ast.Node {
 * 		innerNode := ast.SkipParentheses(node)
 * 		switch innerNode.Kind {
 * 		case ast.KindTypeReference:
 * 			return tryVisitTypeReference(innerNode)
 * 		case ast.KindTypeQuery:
 * 			return tryVisitTypeQuery(innerNode)
 * 		case ast.KindIndexedAccessType:
 * 			return tryVisitIndexedAccess(innerNode)
 * 		case ast.KindTypeOperator:
 * 			if innerNode.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword {
 * 				return tryVisitKeyOf(innerNode)
 * 			}
 * 		}
 * 		return visitor.VisitNode(node)
 * 	}
 * 	visitExistingNodeTreeSymbolsWorker := func(node *ast.Node) *ast.Node {
 * 		factory := b.f
 * 		// !!! TODO: the reparser *should* make all the jsdoc remapping logic here redundant,
 * 		// assuming we only ever try to preserve reparsed nodes and never walk back to the jsdoc "originals"
 * 		// accidentally.
 * 		// Still, what can be ported of the logic is here, just in case.
 * 		// Begin JSDoc handling
 * 		if node.Kind == ast.KindJSDocTypeExpression {
 * 			// Unwrap JSDocTypeExpressions
 * 			return visitor.VisitNode(node.AsJSDocTypeExpression().Type)
 * 		}
 * 		// !!! TODO: We don't _actually_ support jsdoc namepath types, emit `any` instead; verify we handle as gracefully as strada
 * 		if node.Kind == ast.KindJSDocAllType /* || node.Kind == ast.JSDocNamepathType * / {
 * 			return factory.NewKeywordTypeNode(ast.KindAnyKeyword)
 * 		}
 * 		// !!! TODO: verify JSDocUnknwonType is hopefully just parsed into `unknown` upfront; the kind no longer exists
 * 		// if node.Kind == ast.KindJSDocUnknownType {
 * 		// 	return factory.NewKeywordTypeNode(ast.KindUnknownKeyword)
 * 		// }
 * 		if node.Kind == ast.KindJSDocNullableType {
 * 			unionMembers := []*ast.Node{
 * 				visitor.VisitNode(node.AsJSDocNullableType().Type),
 * 				factory.NewLiteralTypeNode(factory.NewKeywordExpression(ast.KindNullKeyword)),
 * 			}
 * 			return factory.NewUnionTypeNode(factory.NewNodeList(unionMembers))
 * 		}
 * 		if node.Kind == ast.KindJSDocOptionalType {
 * 			unionMembers := []*ast.Node{
 * 				visitor.VisitNode(node.AsJSDocOptionalType().Type),
 * 				factory.NewKeywordTypeNode(ast.KindUndefinedKeyword),
 * 			}
 * 			return factory.NewUnionTypeNode(factory.NewNodeList(unionMembers))
 * 		}
 * 		if node.Kind == ast.KindJSDocNonNullableType {
 * 			// Unwrap
 * 			return visitor.VisitNode(node.AsJSDocNonNullableType().Type)
 * 		}
 * 		if node.Kind == ast.KindJSDocVariadicType { // !!! TODO: verify this matches how jsdoc variadics are actually handled now?
 * 			return factory.NewArrayTypeNode(visitor.VisitNode(node.AsJSDocVariadicType().Type))
 * 		}
 * 		if node.Kind == ast.KindJSDocTypeLiteral {
 * 			var members []*ast.Node
 * 			for _, t := range node.AsJSDocTypeLiteral().JSDocPropertyTags {
 * 				if t.Kind != ast.KindJSDocPropertyTag && t.Kind != ast.KindJSDocParameterTag {
 * 					continue
 * 				}
 * 				n := t.Name()
 * 				var targetName *ast.Node
 * 				if ast.IsIdentifier(n) {
 * 					targetName = n
 * 				} else {
 * 					targetName = n.AsQualifiedName().Right // !!! TODO: without typesystem backup, doing this cast unguarded seems really suspect, even though it is what strada does
 * 				}
 * 				name := visitor.VisitNode(targetName)
 * 				shouldBeOptional := t.AsJSDocParameterOrPropertyTag().IsBracketed || (t.TypeExpression() != nil && t.TypeExpression().Kind == ast.KindJSDocOptionalType)
 * 				var question *ast.Node
 * 				if shouldBeOptional {
 * 					question = factory.NewToken(ast.KindQuestionToken)
 * 				}
 * 				ty := visitor.VisitNode(t.TypeExpression()) // !!! TODO: alternate lookup locations for the type? serialize on demand if it doesn't serialze? strada does something funky here.
 *
 * 				members = append(members, factory.NewPropertySignatureDeclaration(nil, name, question, ty, nil))
 * 			}
 * 			return factory.NewTypeLiteralNode(factory.NewNodeList(members))
 * 		}
 * 		// if (ast.IsExpressionWithTypeArguments(node) || ast.IsTypeReferenceNode(node)) && ast.IsJSDocIndexSignature(node) { /// !!! TODO: JSDocIndexSignature handling hasn't been ported - readd if it's readded
 * 		// 	args := node.TypeArguments()
 * 		// 	if len(args) != 2 {
 * 		// 		return factory.NewKeywordTypeNode(ast.KindAnyKeyword) // shouldn't be flagged as a jsdoc index signature in the first place
 * 		// 	}
 * 		// 	return factory.NewTypeLiteralNode(factory.NewNodeList([]*ast.Node{
 * 		// 		factory.NewIndexSignatureDeclaration(nil, factory.NewNodeList([]*ast.Node{
 * 		// 			factory.NewParameterDeclaration(nil, nil, factory.NewIdentifier("x"), nil, visitor.VisitNode(args[0]), nil),
 * 		// 		}), visitor.VisitNode(args[1])),
 * 		// 	}))
 * 		// }
 * 		// if node.Kind == ast.KindJSDocFunctionType {} // !!! no longer exists
 * 		// End JSDoc handling
 *
 * 		if ast.IsTypeReferenceNode(node) && ast.IsIdentifier(node.AsTypeReferenceNode().TypeName) && node.AsTypeReferenceNode().TypeName.AsIdentifier().Text == "" {
 * 			replacement := factory.NewKeywordTypeNode(ast.KindAnyKeyword)
 * 			b.e.SetOriginal(replacement, node)
 * 			return replacement
 * 		}
 * 		if ast.IsThisTypeNode(node) {
 * 			// TODO: strada never marks `this` type nodes as an error - it calls `canReuseTypeNode` on it, but that function always returns `true` for `this`
 * 			// type nodes, which in turn fails to verify that the `this` context is the same between the source and target locations. The conservative thing is to
 * 			// _never_ copy a `this`. We could improve this, but strada is *definitely* wrong and overbroad here. (note that we're inling uses of `canReuseTypeNode`
 * 			// in corsa because of the unfurled host structure meaning we don't need to defer to a host object for functionality it needs)
 * 			// bound.markError(nil) // conservative approach
 * 			return node
 * 		}
 * 		if ast.IsTypeParameterDeclaration(node) {
 * 			_, newName, _ := trackExistingEntityName(node.Name(), nil)
 * 			return factory.UpdateTypeParameterDeclaration(
 * 				node.AsTypeParameterDeclaration(),
 * 				visitor.VisitModifiers(node.Modifiers()),
 * 				newName,
 * 				visitor.VisitNode(node.AsTypeParameterDeclaration().Constraint),
 * 				visitor.VisitNode(node.AsTypeParameterDeclaration().Expression),
 * 				visitor.VisitNode(node.AsTypeParameterDeclaration().DefaultType),
 * 			)
 * 		}
 * 		if ast.IsIndexedAccessTypeNode(node) {
 * 			result := tryVisitIndexedAccess(node)
 * 			if result != nil {
 * 				return result
 * 			}
 * 			bound.markError(nil)
 * 			return node
 * 		}
 * 		if ast.IsTypeReferenceNode(node) {
 * 			result := tryVisitTypeReference(node)
 * 			if result != nil {
 * 				return result
 * 			}
 * 			bound.markError(nil)
 * 			return node
 * 		}
 * 		if ast.IsTypeQueryNode(node) {
 * 			result := tryVisitTypeQuery(node)
 * 			if result != nil {
 * 				return result
 * 			}
 * 			bound.markError(nil)
 * 			return node
 * 		}
 * 		if ast.IsTypeOperatorNode(node) {
 * 			if node.AsTypeOperatorNode().Operator == ast.KindUniqueKeyword && node.AsTypeOperatorNode().Type.Kind == ast.KindSymbolKeyword {
 * 				nonFakeEnclosing := b.getEnclosingDeclarationIgnoringFakeScope()
 * 				sameScope := ast.FindAncestor(node, func(a *ast.Node) bool {
 * 					return a == nonFakeEnclosing
 * 				})
 * 				if sameScope == nil {
 * 					bound.markError(nil)
 * 					return node
 * 				}
 * 			} else if node.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword {
 * 				result := tryVisitKeyOf(node)
 * 				if result != nil {
 * 					return result
 * 				}
 * 				bound.markError(nil)
 * 				return node
 * 			}
 * 		}
 * 		if ast.IsLiteralImportTypeNode(node) {
 * 			// assert keyword in imported attributes is deprecated, so we don't reuse types that contain it
 * 			// Ex: import("pkg", { assert: {} }
 * 			if node.AsImportTypeNode().Attributes != nil && node.AsImportTypeNode().Attributes.AsImportAttributes().Token == ast.KindAssertKeyword {
 * 				bound.markError(nil)
 * 				return node
 * 			}
 * 			t := b.getTypeFromTypeNode(node, true)
 * 			if t == nil {
 * 				bound.markError(nil)
 * 				return node
 * 			}
 * 			if ast.IsInJSFile(node) {
 * 				// !!! TODO: invalidate node reuse if js fallback logic used in type param list/typeof lookup (but isn't this logic gone?)
 * 				// s := b.ch.symbolNodeLinks.Get(node).resolvedSymbol
 * 			}
 * 			originalSpec := node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal
 * 			specifier := b.rewriteModuleSpecifier(node, originalSpec)
 * 			if originalSpec == specifier {
 * 				specifier = visitor.VisitNode(specifier) // visit node if not replaced
 * 			}
 * 			arg := node.AsImportTypeNode().Argument
 * 			if specifier != originalSpec {
 * 				arg = factory.NewLiteralTypeNode(specifier)
 * 			}
 * 			return factory.UpdateImportTypeNode(
 * 				node.AsImportTypeNode(),
 * 				node.AsImportTypeNode().IsTypeOf,
 * 				arg,
 * 				visitor.VisitNode(node.AsImportTypeNode().Attributes),
 * 				visitor.VisitNode(node.AsImportTypeNode().Qualifier),
 * 				visitor.VisitNodes(node.AsImportTypeNode().TypeArguments),
 * 			)
 * 		}
 * 		if node.Name() != nil && node.Name().Kind == ast.KindComputedPropertyName && !b.ch.hasLateBindableName(node) {
 * 			if !ast.HasDynamicName(node) {
 * 				// !!! TODO: This matches strada, but rather than recursing, this should probably fall down to later cases.
 * 				// Take a `["field"]` property declaration - it still needs a `: any` appended to it
 * 				return visitor.VisitEachChild(node)
 * 			}
 * 			// !!! TODO: this condition matches strada, but it just seems wrong? Or at the very least extraordinarily approximate, and doesn't flag a builder error...
 * 			shouldRemoveDeclaration := !((b.ctx.internalFlags&nodebuilder.InternalFlagsAllowUnresolvedNames != 0) && ast.IsEntityNameExpression(node.Name().AsComputedPropertyName().Expression) && (b.ch.checkComputedPropertyName(node.Name()).flags&TypeFlagsAny != 0))
 * 			if shouldRemoveDeclaration {
 * 				return nil
 * 			}
 * 		}
 * 		if (ast.IsFunctionLike(node) && node.Type() == nil) || (ast.IsPropertyDeclaration(node) && node.Type() == nil && node.Initializer() == nil) || (ast.IsPropertySignatureDeclaration(node) && node.Type() == nil && node.Initializer() == nil) || (ast.IsParameterDeclaration(node) && node.Type() == nil && node.Initializer() == nil) {
 * 			visited := visitor.VisitEachChild(node)
 * 			if visited == node {
 * 				visited = b.setTextRange(node.Clone(factory), node)
 * 			}
 * 			node = visited
 * 			newType := factory.NewKeywordTypeNode(ast.KindAnyKeyword)
 * 			switch node.Kind {
 * 			case ast.KindPropertyDeclaration:
 * 				return factory.UpdatePropertyDeclaration(
 * 					node.AsPropertyDeclaration(),
 * 					node.Modifiers(),
 * 					node.Name(),
 * 					node.PostfixToken(),
 * 					newType,
 * 					nil,
 * 				)
 * 			case ast.KindPropertySignature:
 * 				return factory.UpdatePropertySignatureDeclaration(
 * 					node.AsPropertySignatureDeclaration(),
 * 					node.Modifiers(),
 * 					node.Name(),
 * 					node.PostfixToken(),
 * 					newType,
 * 					nil,
 * 				)
 * 			case ast.KindParameter:
 * 				return factory.UpdateParameterDeclaration(
 * 					node.AsParameterDeclaration(),
 * 					nil,
 * 					node.AsParameterDeclaration().DotDotDotToken,
 * 					node.Name(),
 * 					node.AsParameterDeclaration().QuestionToken,
 * 					newType,
 * 					nil,
 * 				)
 * 			case ast.KindMethodSignature:
 * 				return factory.UpdateMethodSignatureDeclaration(
 * 					node.AsMethodSignatureDeclaration(),
 * 					node.Modifiers(),
 * 					node.Name(),
 * 					node.AsMethodSignatureDeclaration().PostfixToken,
 * 					node.AsMethodSignatureDeclaration().TypeParameters,
 * 					node.AsMethodSignatureDeclaration().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindCallSignature:
 * 				return factory.UpdateCallSignatureDeclaration(
 * 					node.AsCallSignatureDeclaration(),
 * 					node.AsCallSignatureDeclaration().TypeParameters,
 * 					node.AsCallSignatureDeclaration().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindJSDocSignature:
 * 				return factory.UpdateJSDocSignature(
 * 					node.AsJSDocSignature(),
 * 					node.AsJSDocSignature().TypeParameters,
 * 					node.AsJSDocSignature().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindConstructSignature:
 * 				return factory.UpdateConstructSignatureDeclaration(
 * 					node.AsConstructSignatureDeclaration(),
 * 					node.AsConstructSignatureDeclaration().TypeParameters,
 * 					node.AsConstructSignatureDeclaration().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindIndexSignature:
 * 				return factory.UpdateIndexSignatureDeclaration(
 * 					node.AsIndexSignatureDeclaration(),
 * 					node.Modifiers(),
 * 					node.AsIndexSignatureDeclaration().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindFunctionType:
 * 				return factory.UpdateFunctionTypeNode(
 * 					node.AsFunctionTypeNode(),
 * 					node.AsFunctionTypeNode().TypeParameters,
 * 					node.AsFunctionTypeNode().Parameters,
 * 					newType,
 * 				)
 * 			case ast.KindConstructorType:
 * 				return factory.UpdateConstructorTypeNode(
 * 					node.AsConstructorTypeNode(),
 * 					node.Modifiers(),
 * 					node.AsConstructorTypeNode().TypeParameters,
 * 					node.AsConstructorTypeNode().Parameters,
 * 					newType,
 * 				)
 * 			}
 * 		}
 * 		if ast.IsComputedPropertyName(node) && ast.IsEntityNameExpression(node.AsComputedPropertyName().Expression) {
 * 			introducesError, result, _ := trackExistingEntityName(node.AsComputedPropertyName().Expression, nil)
 * 			if !introducesError {
 * 				return factory.UpdateComputedPropertyName(node.AsComputedPropertyName(), result)
 * 			} else {
 * 				// !!! TODO: rewriting computed names based on evaluator/typecheck results?
 * 				// strada's behavior seems hard to justify vs marking an error and moving on
 * 				bound.markError(nil)
 * 				return visitor.VisitEachChild(node)
 * 			}
 * 		}
 * 		if ast.IsTypePredicateNode(node) {
 * 			var parameterName *ast.Node
 * 			if ast.IsIdentifier(node.AsTypePredicateNode().ParameterName) {
 * 				introducesError, result, _ := trackExistingEntityName(node.AsTypePredicateNode().ParameterName, nil)
 * 				// Should not usually happen the only case is when a type predicate comes from a JSDoc type annotation with it's own parameter symbol definition.
 * 				// /** @type {(v: unknown) => v is undefined} * /
 * 				// const isUndef = v => v === undefined;
 * 				if introducesError {
 * 					bound.markError(nil)
 * 				}
 * 				parameterName = result
 * 			} else {
 * 				parameterName = node.AsTypePredicateNode().ParameterName.Clone(factory)
 * 			}
 * 			return factory.UpdateTypePredicateNode(
 * 				node.AsTypePredicateNode(),
 * 				visitor.VisitNode(node.AsTypePredicateNode().AssertsModifier),
 * 				parameterName,
 * 				visitor.VisitNode(node.AsTypePredicateNode().Type),
 * 			)
 * 		}
 * 		if ast.IsConditionalTypeNode(node) {
 * 			checkType := visitor.VisitNode(node.AsConditionalTypeNode().CheckType)
 * 			dispose := b.enterNewScope(node, nil, b.ch.getInferTypeParameters(node), nil, nil)
 * 			extendsType := visitor.VisitNode(node.AsConditionalTypeNode().ExtendsType)
 * 			trueType := visitor.VisitNode(node.AsConditionalTypeNode().TrueType)
 * 			dispose()
 * 			falseType := visitor.VisitNode(node.AsConditionalTypeNode().FalseType)
 * 			return factory.UpdateConditionalTypeNode(
 * 				node.AsConditionalTypeNode(),
 * 				checkType,
 * 				extendsType,
 * 				trueType,
 * 				falseType,
 * 			)
 * 		}
 *
 * 		// style applications
 * 		if ast.IsTupleTypeNode(node) || (b.ctx.flags&nodebuilder.FlagsMultilineObjectLiterals == 0 && ast.IsTypeLiteralNode(node)) || ast.IsMappedTypeNode(node) {
 * 			// make tuples/types/mappedtypes single line
 * 			res := visitor.VisitEachChild(node)
 * 			if res == node {
 * 				res = res.Clone(factory)
 * 				res = b.setTextRange(res, node)
 * 			}
 * 			b.e.AddEmitFlags(res, printer.EFSingleLine)
 * 			return res
 * 		}
 *
 * 		if ast.IsStringLiteralLike(node) {
 * 			// Preserve the original characters of the literal (e.g. emojis) in declaration emit
 * 			// rather than escaping them as ASCII Unicode escapes. Mirrors TypeScript's behavior
 * 			// for synthesized string literal types in the node builder (checker.ts:6853).
 * 			c := node.Clone(b.f)
 * 			if ast.IsStringLiteral(node) && b.ctx.flags&nodebuilder.FlagsUseSingleQuotesForStringLiteralType != 0 && node.AsStringLiteral().TokenFlags&ast.TokenFlagsSingleQuote == 0 {
 * 				// set single quote on string literals
 * 				c.AsStringLiteral().TokenFlags ^= ast.TokenFlagsSingleQuote
 * 			}
 * 			b.e.AddEmitFlags(c, printer.EFNoAsciiEscaping)
 * 			return c
 * 		}
 *
 * 		return visitor.VisitEachChild(node)
 * 	}
 * 	nonLocalNode := true
 * 	visitor = ast.NewNodeVisitor(func(node *ast.Node) *ast.Node {
 * 		// If there was an error in a sibling node bail early, the result will be discarded anyway
 * 		if bound.hadError {
 * 			return node
 * 		}
 * 		recover_ := bound.startRecoveryScope()
 * 		introducesNewScope := ast.IsFunctionLike(node) || ast.IsMappedTypeNode(node)
 * 		var exit func()
 * 		if introducesNewScope {
 * 			var params []*ast.Symbol
 * 			var typeParams []*Type
 * 			if ast.IsFunctionLike(node) {
 * 				sig := b.ch.getSignatureFromDeclaration(node)
 * 				params = sig.parameters
 * 				typeParams = sig.typeParameters
 * 			} else if ast.IsConditionalTypeNode(node) { // !!! TODO: impossible in combination with the scope start check???
 * 				typeParams = b.ch.getInferTypeParameters(node)
 * 			} else if ast.IsMappedTypeNode(node) {
 * 				typeParams = []*Type{b.ch.getDeclaredTypeOfTypeParameter(b.ch.getSymbolOfDeclaration(node.AsMappedTypeNode().TypeParameter))}
 * 			}
 * 			exit = b.enterNewScope(node, params, typeParams, nil, nil)
 * 		}
 * 		result := visitExistingNodeTreeSymbolsWorker(node)
 * 		if exit != nil {
 * 			exit()
 * 		}
 *
 * 		if result == node && !ast.NodeIsSynthesized(node) {
 * 			result = b.f.DeepCloneNode(node) // always clone a new node
 * 		}
 *
 * 		// We want to clone the subtree, so when we mark it up with __pos and __end in quickfixes,
 * 		//  we don't get odd behavior because of reused nodes. We also need to clone to _remove_
 * 		//  the position information if the node comes from a different file than the one the node builder
 * 		//  is set to build for (even though we are reusing the node structure, the position information
 * 		//  would make the printer print invalid spans for literals and identifiers, and the formatter would
 * 		//  choke on the mismatched positonal spans between a parent and an injected child from another file).
 * 		result = b.setTextRange(result, node)
 *
 * 		if bound.hadError {
 * 			if ast.IsTypeNode(node) && !ast.IsTypePredicateNode(node) {
 * 				bound.endRecoveryScope(recover_)
 * 				// TODO: this fallback matches strada behavior, but it lacks any verification that the type from `node` actually matches
 * 				// the type we'd expect at this traversal position within the parent type.
 * 				t := b.getTypeFromTypeNode(node, false)
 * 				return b.typeToTypeNode(t)
 * 			}
 * 			return b.setTextRange(node.Clone(b.f), node)
 * 		}
 *
 * 		return result
 * 	}, b.f, ast.NodeVisitorHooks{
 * 		VisitNodes: func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
 * 			res := v.VisitNodes(nodes)
 * 			if nonLocalNode && res != nil {
 * 				// Remove position data from node lists originating in other files
 * 				if res == nodes {
 * 					res = nodes.Clone(b.f)
 * 				}
 * 				res.Loc = core.NewTextRange(-1, -1)
 * 			}
 * 			return res
 * 		},
 * 		VisitNode: func(node *ast.Node, v *ast.NodeVisitor) *ast.Node {
 * 			// Capture if the current node is in the current file so node lists knoww if they can keep positions or not
 * 			oldNonLocalNode := nonLocalNode
 * 			nonLocalNode = b.ctx.enclosingFile == nil || b.ctx.enclosingFile != ast.GetSourceFileOfNode(b.e.MostOriginal(node))
 * 			res := v.VisitNode(node)
 * 			nonLocalNode = oldNonLocalNode
 * 			return res
 * 		},
 * 	})
 * 	return visitor
 * }
 */
export function getExistingNodeTreeVisitor(b: GoPtr<NodeBuilderImpl>, bound: GoPtr<recoveryBoundary>): GoPtr<NodeVisitor> {
  let visitor: GoPtr<ConcreteNodeVisitor>;
  const asNodeVisitor = (): GoPtr<ConcreteNodeVisitor> => visitor!;
  const visitNode = (node: GoPtr<Node>): GoPtr<Node> => NodeVisitor_VisitNode(asNodeVisitor(), node);
  const visitNodes = (nodes: GoPtr<NodeList>): GoPtr<NodeList> => NodeVisitor_VisitNodes(asNodeVisitor(), nodes);
  const visitModifiers = (nodes: GoPtr<ModifierList>): GoPtr<ModifierList> => NodeVisitor_VisitModifiers(asNodeVisitor(), nodes);
  const visitEachChild = (node: GoPtr<Node>): GoPtr<Node> => Node_VisitEachChild(node, asNodeVisitor());

  const attachSymbolToLeftmostIdentifier = (leftmost: GoPtr<Node>, node: GoPtr<Node>, sym: GoPtr<Symbol>): GoPtr<Node> => {
    let vis: GoPtr<ConcreteNodeVisitor>;
    const visitorFunc = (current: GoPtr<Node>): GoPtr<Node> => {
      if (current === leftmost) {
        let type_: GoPtr<Type> = undefined;
        let name: GoPtr<Node> = undefined;
        if (sym !== undefined) {
          type_ = Checker_getDeclaredTypeOfSymbol(b!.ch, sym);
          if ((sym.Flags & SymbolFlagsTypeParameter) !== 0) {
            name = NodeBuilderImpl_typeParameterToName(b, type_);
          }
        }
        if (name === undefined) {
          name = NodeBuilderImpl_newIdentifier(b, Node_Text(current), sym);
        }
        name = NodeBuilderImpl_setTextRange(b, name, current);
        EmitContext_AddEmitFlags(b!.e, name, EFNoAsciiEscaping);
        return name;
      }
      return NodeBuilderImpl_setTextRange(b, Node_VisitEachChild(current, vis), current);
    };
    vis = NewNodeVisitor(visitorFunc, b!.f, {});
    return visitorFunc(node);
  };

  const trackExistingEntityName = (node: GoPtr<Node>, overrideEnclosing: GoPtr<Node>): [bool, GoPtr<Node>, GoPtr<Symbol>] => {
    let enclosingDeclaration = b!.ctx!.enclosingDeclaration;
    if (overrideEnclosing !== undefined) {
      enclosingDeclaration = overrideEnclosing;
    }
    let introducesError = false;
    const leftmost = GetFirstIdentifier(node);
    const parent = leftmost!.Parent;
    if (IsInJSFile(node) &&
      (IsExportsIdentifier(leftmost) ||
        IsModuleExportsAccessExpression(parent) ||
        (IsQualifiedName(parent) &&
          IsModuleIdentifier(AsQualifiedName(parent)!.Left) &&
          IsExportsIdentifier(AsQualifiedName(parent)!.Right)))) {
      introducesError = true;
      return [introducesError, NodeBuilderImpl_setTextRange(b, Node_Clone(node, b!.f!), node), undefined];
    }
    const meaning = getMeaningOfEntityNameReference(node);
    let sym: GoPtr<Symbol> = undefined;
    if (IsThisIdentifier(leftmost)) {
      sym = Checker_getSymbolOfDeclaration(b!.ch, Checker_getThisContainer(b!.ch, leftmost, false, false));
      if (Checker_IsSymbolAccessible(b!.ch, sym, leftmost, meaning, false).Accessibility !== SymbolAccessibilityAccessible) {
        introducesError = true;
        b!.ctx!.tracker!.ReportInaccessibleThisError();
      }
      return [introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), undefined];
    }
    sym = Checker_resolveEntityName(b!.ch, leftmost, meaning, true, true, undefined);
    if (b!.ctx!.enclosingDeclaration !== undefined && !(sym !== undefined && (sym.Flags & SymbolFlagsTypeParameter) !== 0)) {
      sym = Checker_getExportSymbolOfValueSymbolIfExported(b!.ch, sym);
      const symAtLocation = Checker_resolveEntityName(b!.ch, leftmost, meaning, true, true, b!.ctx!.enclosingDeclaration);
      if (symAtLocation === b!.ch!.unknownSymbol ||
        (symAtLocation === undefined && sym !== undefined) ||
        (symAtLocation !== undefined && sym !== undefined &&
          Checker_getSymbolIfSameReference(b!.ch, Checker_getExportSymbolOfValueSymbolIfExported(b!.ch, symAtLocation), sym) === undefined)) {
        if (symAtLocation !== b!.ch!.unknownSymbol) {
          b!.ctx!.tracker!.ReportInferenceFallback(node);
        }
        introducesError = true;
        return [introducesError, NodeBuilderImpl_setTextRange(b, Node_Clone(node, b!.f!), node), sym];
      }
      sym = symAtLocation;
    }

    if (sym !== undefined) {
      if ((sym.Flags & SymbolFlagsFunctionScopedVariable) !== 0 && sym.ValueDeclaration !== undefined) {
        if (IsPartOfParameterDeclaration(sym.ValueDeclaration) || IsJSDocParameterTag(sym.ValueDeclaration)) {
          return [introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), undefined];
        }
      }
      if ((sym.Flags & SymbolFlagsTypeParameter) === 0 &&
        !IsDeclarationName(node) &&
        Checker_IsSymbolAccessible(b!.ch, sym, enclosingDeclaration, meaning, false).Accessibility !== SymbolAccessibilityAccessible) {
        b!.ctx!.tracker!.ReportInferenceFallback(node);
        introducesError = true;
      } else {
        b!.ctx!.tracker!.TrackSymbol(sym, enclosingDeclaration, meaning);
      }
      return [introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), undefined];
    }
    return [introducesError, NodeBuilderImpl_setTextRange(b, Node_Clone(node, b!.f!), node), undefined];
  };

  let tryVisitSimpleTypeNode!: (node: GoPtr<Node>) => GoPtr<Node>;
  const tryVisitIndexedAccess = (node: GoPtr<Node>): GoPtr<Node> => {
    const indexed = AsIndexedAccessTypeNode(node)!;
    const resultObjectType = tryVisitSimpleTypeNode(indexed.ObjectType);
    if (resultObjectType === undefined) {
      return undefined;
    }
    return NodeBuilderImpl_setTextRange(
      b,
      NodeFactory_UpdateIndexedAccessTypeNode(b!.f!, indexed, resultObjectType, visitNode(indexed.IndexType)),
      node,
    );
  };
  const tryVisitKeyOf = (node: GoPtr<Node>): GoPtr<Node> => {
    const typeOperator = AsTypeOperatorNode(node)!;
    const typeNode = tryVisitSimpleTypeNode(typeOperator.Type);
    if (typeNode === undefined) {
      return undefined;
    }
    return NodeBuilderImpl_setTextRange(b, NodeFactory_UpdateTypeOperatorNode(b!.f!, typeOperator, typeOperator.Operator, typeNode), node);
  };
  const tryVisitTypeQuery = (node: GoPtr<Node>): GoPtr<Node> => {
    const typeQuery = AsTypeQueryNode(node)!;
    const [introducesError, exprName] = trackExistingEntityName(typeQuery.ExprName, undefined);
    if (!introducesError) {
      return NodeBuilderImpl_setTextRange(
        b,
        NodeFactory_UpdateTypeQueryNode(b!.f, typeQuery, exprName as GoPtr<never>, visitNodes(typeQuery.TypeArguments) as GoPtr<never>),
        node,
      );
    }
    const serializedName = NodeBuilderImpl_serializeTypeName(b, typeQuery.ExprName, true, visitNodes(typeQuery.TypeArguments));
    if (serializedName !== undefined) {
      return NodeBuilderImpl_setTextRange(b, serializedName, typeQuery.ExprName);
    }
    return undefined;
  };
  const tryVisitTypeReference = (node: GoPtr<Node>): GoPtr<Node> => {
    if (IsConstTypeReference(node)) {
      return undefined;
    }
    const symbol_ = NodeBuilderImpl_tryGetResolvedSymbolFromTypeNode(b, node);
    if (symbol_ === undefined) {
      return undefined;
    }
    if ((symbol_.Flags & SymbolFlagsTypeParameter) !== 0) {
      const declaredType = Checker_getDeclaredTypeOfSymbol(b!.ch, symbol_);
      if (b!.ctx!.mapper !== undefined && TypeMapper_Map(b!.ctx!.mapper, declaredType) !== declaredType) {
        return undefined;
      }
    }
    if (!NodeBuilderImpl_canReuseExistingJSTypeNode(b, node as GoPtr<TypeNode>, NodeBuilderImpl_getTypeFromTypeNode(b, node as GoPtr<TypeNode>, false))) {
      return undefined;
    }
    const ref = AsTypeReferenceNode(node)!;
    const [introducesError, newName] = trackExistingEntityName(ref.TypeName, undefined);
    const typeArguments = visitNodes(ref.TypeArguments);
    if (!introducesError) {
      return NodeBuilderImpl_setTextRange(b, NodeFactory_UpdateTypeReferenceNode(b!.f, ref, newName as GoPtr<never>, typeArguments as GoPtr<never>), node);
    }
    const serializedName = NodeBuilderImpl_serializeTypeName(b, ref.TypeName, false, typeArguments);
    if (serializedName !== undefined) {
      return NodeBuilderImpl_setTextRange(b, serializedName, ref.TypeName);
    }
    return undefined;
  };
  tryVisitSimpleTypeNode = (node: GoPtr<Node>): GoPtr<Node> => {
    const innerNode = SkipParentheses(node as GoPtr<never>) as GoPtr<Node>;
    if (IsTypeReferenceNode(innerNode)) {
      return tryVisitTypeReference(innerNode);
    }
    if (IsTypeQueryNode(innerNode)) {
      return tryVisitTypeQuery(innerNode);
    }
    if (IsIndexedAccessTypeNode(innerNode)) {
      return tryVisitIndexedAccess(innerNode);
    }
    if (IsTypeOperatorNode(innerNode) && AsTypeOperatorNode(innerNode)!.Operator === KindKeyOfKeyword) {
      return tryVisitKeyOf(innerNode);
    }
    return visitNode(node);
  };

  const visitExistingNodeTreeSymbolsWorker = (node: GoPtr<Node>): GoPtr<Node> => {
    const factory = b!.f!;
    if (IsJSDocTypeExpression(node)) {
      return visitNode(AsJSDocTypeExpression(node)!.Type);
    }
    if (IsJSDocAllType(node)) {
      return NewKeywordTypeNode(factory, KindAnyKeyword);
    }
    if (IsJSDocNullableType(node)) {
      return NewUnionTypeNode(factory, NodeFactory_NewNodeList(factory, [
        visitNode(AsJSDocNullableType(node)!.Type),
        NewLiteralTypeNode(factory, NewKeywordExpression(factory, KindNullKeyword)),
      ]) as GoPtr<never>);
    }
    if (IsJSDocOptionalType(node)) {
      return NewUnionTypeNode(factory, NodeFactory_NewNodeList(factory, [
        visitNode(AsJSDocOptionalType(node)!.Type),
        NewKeywordTypeNode(factory, KindUndefinedKeyword),
      ]) as GoPtr<never>);
    }
    if (IsJSDocNonNullableType(node)) {
      return visitNode(AsJSDocNonNullableType(node)!.Type);
    }
    if (IsJSDocVariadicType(node)) {
      return NewArrayTypeNode(factory, visitNode(AsJSDocVariadicType(node)!.Type) as GoPtr<never>);
    }
    if (IsJSDocTypeLiteral(node)) {
      const members: GoSlice<GoPtr<Node>> = [];
      for (const tag of AsJSDocTypeLiteral(node)!.JSDocPropertyTags ?? []) {
        if (tag!.Kind !== KindJSDocPropertyTag && tag!.Kind !== KindJSDocParameterTag) {
          continue;
        }
        const tagNode = tag!;
        const nameNode = Node_Name(tagNode);
        const targetName = IsIdentifier(nameNode) ? nameNode : AsQualifiedName(nameNode)!.Right;
        const name = visitNode(targetName);
        const tagData = AsJSDocParameterOrPropertyTag(tagNode)!;
        const typeExpression = Node_Type(tagNode);
        const shouldBeOptional = tagData.IsBracketed || (typeExpression !== undefined && IsJSDocOptionalType(typeExpression));
        const question = shouldBeOptional ? NewToken(factory, KindQuestionToken) : undefined;
        const typeNode = visitNode(typeExpression);
        members.push(NewPropertySignatureDeclaration(factory, undefined, name as GoPtr<never>, question as GoPtr<never>, typeNode as GoPtr<never>, undefined));
      }
      return NewTypeLiteralNode(factory, NodeFactory_NewNodeList(factory, members) as GoPtr<never>);
    }
    if (IsTypeReferenceNode(node) && IsIdentifier(AsTypeReferenceNode(node)!.TypeName) && AsIdentifier(AsTypeReferenceNode(node)!.TypeName)!.Text === "") {
      const replacement = NewKeywordTypeNode(factory, KindAnyKeyword);
      EmitContext_SetOriginal(b!.e, replacement, node);
      return replacement;
    }
    if (IsThisTypeNode(node)) {
      return node;
    }
    if (IsTypeParameterDeclaration(node)) {
      const [, newName] = trackExistingEntityName(Node_Name(node), undefined);
      const typeParam = AsTypeParameterDeclaration(node)!;
      return NodeFactory_UpdateTypeParameterDeclaration(
        factory,
        typeParam,
        visitModifiers(Node_Modifiers(node)),
        newName as GoPtr<never>,
        visitNode(typeParam.Constraint) as GoPtr<never>,
        visitNode(typeParam.Expression) as GoPtr<never>,
        visitNode(typeParam.DefaultType) as GoPtr<never>,
      );
    }
    if (IsIndexedAccessTypeNode(node)) {
      const result = tryVisitIndexedAccess(node);
      if (result !== undefined) {
        return result;
      }
      recoveryBoundary_markError(bound, undefined);
      return node;
    }
    if (IsTypeReferenceNode(node)) {
      const result = tryVisitTypeReference(node);
      if (result !== undefined) {
        return result;
      }
      recoveryBoundary_markError(bound, undefined);
      return node;
    }
    if (IsTypeQueryNode(node)) {
      const result = tryVisitTypeQuery(node);
      if (result !== undefined) {
        return result;
      }
      recoveryBoundary_markError(bound, undefined);
      return node;
    }
    if (IsTypeOperatorNode(node)) {
      const typeOperator = AsTypeOperatorNode(node)!;
      if (typeOperator.Operator === KindUniqueKeyword && typeOperator.Type!.Kind === KindSymbolKeyword) {
        const nonFakeEnclosing = NodeBuilderImpl_getEnclosingDeclarationIgnoringFakeScope(b);
        const sameScope = FindAncestor(node, (ancestor) => ancestor === nonFakeEnclosing);
        if (sameScope === undefined) {
          recoveryBoundary_markError(bound, undefined);
          return node;
        }
      } else if (typeOperator.Operator === KindKeyOfKeyword) {
        const result = tryVisitKeyOf(node);
        if (result !== undefined) {
          return result;
        }
        recoveryBoundary_markError(bound, undefined);
        return node;
      }
    }
    if (IsLiteralImportTypeNode(node)) {
      const importType = AsImportTypeNode(node)!;
      if (importType.Attributes !== undefined && AsImportAttributes(importType.Attributes)!.Token === KindAssertKeyword) {
        recoveryBoundary_markError(bound, undefined);
        return node;
      }
      const type_ = NodeBuilderImpl_getTypeFromTypeNode(b, node as GoPtr<never>, true);
      if (type_ === undefined) {
        recoveryBoundary_markError(bound, undefined);
        return node;
      }
      const originalSpec = AsLiteralTypeNode(importType.Argument)!.Literal;
      let specifier = NodeBuilderImpl_rewriteModuleSpecifier(b, node, originalSpec);
      if (originalSpec === specifier) {
        specifier = visitNode(specifier);
      }
      let arg = importType.Argument;
      if (specifier !== originalSpec) {
        arg = NewLiteralTypeNode(factory, specifier) as GoPtr<never>;
      }
      return NodeFactory_UpdateImportTypeNode(
        factory,
        importType,
        importType.IsTypeOf,
        arg,
        visitNode(importType.Attributes) as GoPtr<never>,
        visitNode(importType.Qualifier) as GoPtr<never>,
        visitNodes(importType.TypeArguments) as GoPtr<never>,
      );
    }
    const nodeName = Node_Name(node);
    if (nodeName !== undefined && nodeName.Kind === KindComputedPropertyName && !Checker_hasLateBindableName(b!.ch, node)) {
      if (!HasDynamicName(node)) {
        return visitEachChild(node);
      }
      const expression = AsComputedPropertyName(nodeName)!.Expression;
      const shouldRemoveDeclaration = !((b!.ctx!.internalFlags & InternalFlagsAllowUnresolvedNames) !== 0 &&
        IsEntityNameExpression(expression) &&
        (Checker_checkComputedPropertyName(b!.ch, nodeName)!.flags & TypeFlagsAny) !== 0);
      if (shouldRemoveDeclaration) {
        return undefined;
      }
    }
    if ((IsFunctionLike(node) && Node_Type(node) === undefined) ||
      (IsPropertyDeclaration(node) && Node_Type(node) === undefined && Node_Initializer(node) === undefined) ||
      (IsPropertySignatureDeclaration(node) && Node_Type(node) === undefined && Node_Initializer(node) === undefined) ||
      (IsParameterDeclaration(node) && Node_Type(node) === undefined && Node_Initializer(node) === undefined)) {
      let visited = visitEachChild(node);
      if (visited === node) {
        visited = NodeBuilderImpl_setTextRange(b, Node_Clone(node, factory), node);
      }
      const newType = NewKeywordTypeNode(factory, KindAnyKeyword);
      if (IsPropertyDeclaration(visited)) {
        return NodeFactory_UpdatePropertyDeclaration(factory, visited as GoPtr<never>, Node_Modifiers(visited), Node_Name(visited) as GoPtr<never>, Node_PostfixToken(visited) as GoPtr<never>, newType as GoPtr<never>, undefined);
      }
      if (IsPropertySignatureDeclaration(visited)) {
        return NodeFactory_UpdatePropertySignatureDeclaration(factory, visited as GoPtr<never>, Node_Modifiers(visited), Node_Name(visited) as GoPtr<never>, Node_PostfixToken(visited) as GoPtr<never>, newType as GoPtr<never>, undefined);
      }
      if (IsParameterDeclaration(visited)) {
        const param = AsParameterDeclaration(visited)!;
        return NodeFactory_UpdateParameterDeclaration(factory, param, undefined, param.DotDotDotToken, Node_Name(visited) as GoPtr<never>, param.QuestionToken, newType as GoPtr<never>, undefined);
      }
      if (IsMethodSignatureDeclaration(visited)) {
        const method = AsMethodSignatureDeclaration(visited)!;
        return NodeFactory_UpdateMethodSignatureDeclaration(factory, method, Node_Modifiers(visited), Node_Name(visited) as GoPtr<never>, Node_PostfixToken(visited) as GoPtr<never>, method.TypeParameters, method.Parameters, newType as GoPtr<never>);
      }
      if (IsCallSignatureDeclaration(visited)) {
        const call = AsCallSignatureDeclaration(visited)!;
        return NodeFactory_UpdateCallSignatureDeclaration(factory, call, call.TypeParameters, call.Parameters, newType as GoPtr<never>);
      }
      if (IsJSDocSignature(visited)) {
        const jsdocSig = AsJSDocSignature(visited)!;
        return NodeFactory_UpdateJSDocSignature(factory, jsdocSig, jsdocSig.TypeParameters, jsdocSig.Parameters, newType as GoPtr<never>);
      }
      if (IsConstructSignatureDeclaration(visited)) {
        const construct = AsConstructSignatureDeclaration(visited)!;
        return NodeFactory_UpdateConstructSignatureDeclaration(factory, construct, construct.TypeParameters, construct.Parameters, newType as GoPtr<never>);
      }
      if (IsIndexSignatureDeclaration(visited)) {
        const index = AsIndexSignatureDeclaration(visited)!;
        return NodeFactory_UpdateIndexSignatureDeclaration(factory, index, Node_Modifiers(visited), index.Parameters, newType as GoPtr<never>);
      }
      if (IsFunctionTypeNode(visited)) {
        const fn = AsFunctionTypeNode(visited)!;
        return NodeFactory_UpdateFunctionTypeNode(factory, fn, fn.TypeParameters, fn.Parameters, newType as GoPtr<never>);
      }
      if (IsConstructorTypeNode(visited)) {
        const ctor = AsConstructorTypeNode(visited)!;
        return NodeFactory_UpdateConstructorTypeNode(factory, ctor, Node_Modifiers(visited), ctor.TypeParameters, ctor.Parameters, newType as GoPtr<never>);
      }
    }
    if (IsComputedPropertyName(node) && IsEntityNameExpression(AsComputedPropertyName(node)!.Expression)) {
      const [introducesError, result] = trackExistingEntityName(AsComputedPropertyName(node)!.Expression, undefined);
      if (!introducesError) {
        return NodeFactory_UpdateComputedPropertyName(factory, AsComputedPropertyName(node)!, result as GoPtr<never>);
      }
      recoveryBoundary_markError(bound, undefined);
      return visitEachChild(node);
    }
    if (IsTypePredicateNode(node)) {
      let parameterName: GoPtr<Node> = undefined;
      const predicate = AsTypePredicateNode(node)!;
      if (IsIdentifier(predicate.ParameterName)) {
        const [introducesError, result] = trackExistingEntityName(predicate.ParameterName, undefined);
        if (introducesError) {
          recoveryBoundary_markError(bound, undefined);
        }
        parameterName = result;
      } else {
        parameterName = Node_Clone(predicate.ParameterName, factory);
      }
      return NodeBuilderImpl_setTextRange(b, NodeFactory_UpdateTypePredicateNode(
        factory,
        predicate,
        visitNode(predicate.AssertsModifier),
        parameterName as GoPtr<never>,
        visitNode(predicate.Type) as GoPtr<never>,
      ), node);
    }
    if (IsConditionalTypeNode(node)) {
      const conditional = AsConditionalTypeNode(node)!;
      const checkType = visitNode(conditional.CheckType);
      const dispose = NodeBuilderImpl_enterNewScope(b, node, undefined, Checker_getInferTypeParameters(b!.ch, node), undefined, undefined);
      const extendsType = visitNode(conditional.ExtendsType);
      const trueType = visitNode(conditional.TrueType);
      dispose();
      const falseType = visitNode(conditional.FalseType);
      return NodeFactory_UpdateConditionalTypeNode(factory, conditional, checkType as GoPtr<never>, extendsType as GoPtr<never>, trueType as GoPtr<never>, falseType as GoPtr<never>);
    }
    if (IsTupleTypeNode(node) || ((b!.ctx!.flags & FlagsMultilineObjectLiterals) === 0 && IsTypeLiteralNode(node)) || IsMappedTypeNode(node)) {
      let result = visitEachChild(node);
      if (result === node) {
        result = Node_Clone(result, factory);
        result = NodeBuilderImpl_setTextRange(b, result, node);
      }
      EmitContext_AddEmitFlags(b!.e, result, EFSingleLine);
      return result;
    }
    if (IsStringLiteralLike(node)) {
      // Preserve the original characters of the literal (e.g. emojis) in declaration emit
      // rather than escaping them as ASCII Unicode escapes. Mirrors TypeScript's behavior
      // for synthesized string literal types in the node builder (checker.ts:6853).
      const clone = Node_Clone(node, b!.f!);
      if (IsStringLiteral(node) && (b!.ctx!.flags & FlagsUseSingleQuotesForStringLiteralType) !== 0 && (AsStringLiteral(node)!.TokenFlags & TokenFlagsSingleQuote) === 0) {
        // set single quote on string literals
        AsStringLiteral(clone)!.TokenFlags ^= TokenFlagsSingleQuote;
      }
      EmitContext_AddEmitFlags(b!.e, clone, EFNoAsciiEscaping);
      return clone;
    }
    return visitEachChild(node);
  };

  let nonLocalNode = true;
  visitor = NewNodeVisitor((node: GoPtr<Node>): GoPtr<Node> => {
    if (bound!.hadError) {
      return node;
    }
    const recovery = recoveryBoundary_startRecoveryScope(bound);
    const introducesNewScope = IsFunctionLike(node) || IsMappedTypeNode(node);
    let exit: (() => void) | undefined = undefined;
    if (introducesNewScope) {
      let params: GoPtr<GoSlice<GoPtr<Symbol>>>;
      let typeParams: GoPtr<GoSlice<GoPtr<Type>>>;
      if (IsFunctionLike(node)) {
        const signature = Checker_getSignatureFromDeclaration(b!.ch, node);
        params = signature!.parameters;
        typeParams = signature!.typeParameters;
      } else if (IsConditionalTypeNode(node)) {
        typeParams = Checker_getInferTypeParameters(b!.ch, node);
      } else if (IsMappedTypeNode(node)) {
        typeParams = [Checker_getDeclaredTypeOfTypeParameter(b!.ch, Checker_getSymbolOfDeclaration(b!.ch, AsMappedTypeNode(node)!.TypeParameter))];
      }
      exit = NodeBuilderImpl_enterNewScope(b, node, params, typeParams, undefined, undefined);
    }
    let result = visitExistingNodeTreeSymbolsWorker(node);
    if (exit !== undefined) {
      exit();
    }
    if (result === node && !NodeIsSynthesized(node)) {
      result = NodeFactory_DeepCloneNode(b!.f!, node);
    }
    result = NodeBuilderImpl_setTextRange(b, result, node);
    if (bound!.hadError) {
      if (IsTypeNode(node) && !IsTypePredicateNode(node)) {
        recoveryBoundary_endRecoveryScope(bound, recovery);
        const type_ = NodeBuilderImpl_getTypeFromTypeNode(b, node as GoPtr<never>, false);
        return NodeBuilderImpl_typeToTypeNode(b, type_);
      }
      return NodeBuilderImpl_setTextRange(b, Node_Clone(node, b!.f!), node);
    }
    return result;
  }, b!.f, {
    VisitNodes: (nodes: GoPtr<NodeList>, nodeVisitor: GoPtr<ConcreteNodeVisitor>): GoPtr<NodeList> => {
      let result = NodeVisitor_VisitNodes(nodeVisitor, nodes);
      if (nonLocalNode && result !== undefined) {
        if (result === nodes) {
          result = NodeList_Clone(nodes, b!.f!);
        }
        result!.Loc = NewTextRange(-1, -1);
      }
      return result;
    },
    VisitNode: (node: GoPtr<Node>, nodeVisitor: GoPtr<ConcreteNodeVisitor>): GoPtr<Node> => {
      const oldNonLocalNode = nonLocalNode;
      nonLocalNode = b!.ctx!.enclosingFile === undefined || b!.ctx!.enclosingFile !== GetSourceFileOfNode(EmitContext_MostOriginal(b!.e, node));
      const result = NodeVisitor_VisitNode(nodeVisitor, node);
      nonLocalNode = oldNonLocalNode;
      return result;
    },
  });
  return visitor;
}
