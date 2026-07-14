import type { bool, int } from "../../go/scalars.js";
import type { GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import { GoBooleanKey, GoNilMap, GoNilSlice, GoNumberKey, GoStructField, GoStructKey, NewGoStructMap } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import type { Kind } from "../ast/generated/kinds.js";
import { KindClassDeclaration, KindEnumDeclaration, KindInterfaceDeclaration, KindModuleDeclaration } from "../ast/generated/kinds.js";
import type { SymbolFlags } from "../ast/generated/flags.js";
import type { IdentifierNode } from "../ast/generated/unions.js";
import type { NodeFactory } from "../ast/generated/factory.js";
import type { Symbol } from "../ast/symbol.js";
import {
  FlagsNoTruncation,
  type Flags,
  type InternalFlags,
  type SymbolTracker,
} from "../nodebuilder/types.js";
import { GetSourceFileOfNode } from "../ast/utilities.js";
import { NewEmitContext } from "../printer/emitcontext.js";
import type { EmitContext as EmitContext_3f6f588c } from "../printer/emitcontext.js";
import type { Checker, Host } from "./checker/state.js";
import { Checker_getSignatureFromDeclaration } from "./checker/signatures.js";
import { Checker_getDeclaredTypeOfSymbol, Checker_getSymbolOfDeclaration } from "./checker/symbols.js";
import { NewSymbolTrackerImpl, SymbolTrackerImpl_as_SymbolTracker } from "./symboltracker.js";
import { newNodeBuilderImpl } from "./nodebuilderimpl.js";
import type { CompositeSymbolIdentity, NodeBuilderContext, NodeBuilderImpl } from "./nodebuilderimpl.js";
import {
  NodeBuilderImpl_indexInfoToIndexSignatureDeclarationHelper,
  NodeBuilderImpl_serializeReturnTypeForSignature,
  NodeBuilderImpl_serializeTypeForDeclaration,
  NodeBuilderImpl_serializeTypeForExpression,
  NodeBuilderImpl_signatureToSignatureDeclarationHelper,
  NodeBuilderImpl_symbolToExpression,
  NodeBuilderImpl_symbolToName,
  NodeBuilderImpl_symbolToNode,
  NodeBuilderImpl_symbolToParameterDeclaration,
  NodeBuilderImpl_symbolToTypeParameterDeclarations,
  NodeBuilderImpl_typeParameterToDeclaration,
  NodeBuilderImpl_typePredicateToTypePredicateNode,
  NodeBuilderImpl_typeToTypeNode,
} from "./nodebuilderimpl.js";
import { NodeBuilderImpl_enterSignatureScope } from "./nodebuilderscopes.js";
import { NodeBuilderImpl_expandSymbolForHover } from "./nodebuilder_hover.js";
import { NodeBuilderImpl_tryJSTypeNodeToTypeNode } from "./nodecopy.js";
import { Node_ModifierFlags, NodeFactory_NewModifier, NodeFactory_ReleaseArenas, NodeFactory_UpdateClassDeclaration } from "../ast/ast.js";
import { AsClassDeclaration } from "../ast/generated/casts.js";
import { IsClassExpression, IsEnumDeclaration, IsInterfaceDeclaration, IsModuleDeclaration } from "../ast/generated/predicates.js";
import { NodeFactory_NewModifierList, Node_Modifiers } from "../ast/spine.js";
import { CreateModifiersFromModifierFlags, IsClassLike, ReplaceModifiers } from "../ast/utilities.js";
import { ModifierFlagsAmbient, ModifierFlagsExport } from "../ast/modifierflags.js";
import { Filter } from "../core/core.js";
import {
  FlagsIgnoreErrors,
  FlagsMultilineObjectLiterals,
  FlagsUseAliasDefinedOutsideCurrentScope,
} from "../nodebuilder/types.js";
import { SymbolFlagsInterface } from "../ast/generated/flags.js";
import type { IndexInfo, Signature, Type, TypePredicate } from "./types.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::type::NodeBuilder","kind":"type","status":"implemented","sigHash":"124bf1d1a7a2b0f1d3e43db875844c14ec51925de9e8999b8ec1a04195cbc32b"}
 *
 * Go source:
 * NodeBuilder struct {
 * 	ctxStack  []*NodeBuilderContext
 * 	host      Host
 * 	impl      *NodeBuilderImpl
 * 	verbosity *VerbosityContext // nil for non-hover callers
 * }
 */
export interface NodeBuilder {
  ctxStack: GoSlice<GoPtr<NodeBuilderContext>>;
  host: GoInterface<Host>;
  impl: GoPtr<NodeBuilderImpl>;
  verbosity: GoPtr<VerbosityContext>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::type::VerbosityContext","kind":"type","status":"implemented","sigHash":"eef06c25ab87c15776fd294926438272f2be208e543673f23ea3a8fe2f3ebecf"}
 *
 * Go source:
 * VerbosityContext struct {
 * 	Level                int  // 0 = default (no expansion), 1+ = expansion depth
 * 	MaxTruncationLength  int  // 0 = use default
 * 	CanIncreaseVerbosity bool // output: whether increasing Level would reveal more
 * 	Truncated            bool // output: whether output was truncated
 * }
 */
export interface VerbosityContext {
  Level: int;
  MaxTruncationLength: int;
  CanIncreaseVerbosity: bool;
  Truncated: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.EmitContext","kind":"method","status":"implemented","sigHash":"e28989a6600816020b14851b74237cf7a00f113bbf74a0544bc41204cc1b38a4"}
 *
 * Go source:
 * func (b *NodeBuilder) EmitContext() *printer.EmitContext {
 * 	return b.impl.e
 * }
 */
export function NodeBuilder_EmitContext(receiver: GoPtr<NodeBuilder>): GoPtr<EmitContext_3f6f588c> {
  const b = receiver!;
  return b.impl!.e;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.enterContext","kind":"method","status":"implemented","sigHash":"64391abd43035e3d56369aa2be5cd3a5b0d856ba60201b426689fd138cd0a1cf"}
 *
 * Go source:
 * func (b *NodeBuilder) enterContext(enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) {
 * 	verbosityLevel := -1
 * 	maxTruncationLength := 0
 * 	if b.verbosity != nil {
 * 		verbosityLevel = b.verbosity.Level
 * 		maxTruncationLength = b.verbosity.MaxTruncationLength
 * 	}
 * 	b.ctxStack = append(b.ctxStack, b.impl.ctx)
 * 	b.impl.ctx = &NodeBuilderContext{
 * 		host:                     b.host,
 * 		tracker:                  tracker,
 * 		flags:                    flags,
 * 		internalFlags:            internalFlags,
 * 		maxExpansionDepth:        verbosityLevel,
 * 		maxTruncationLength:      maxTruncationLength,
 * 		enclosingDeclaration:     enclosingDeclaration,
 * 		enclosingFile:            ast.GetSourceFileOfNode(enclosingDeclaration),
 * 		inferTypeParameters:      make([]*Type, 0),
 * 		symbolDepth:              make(map[CompositeSymbolIdentity]int),
 * 		trackedSymbols:           make([]*TrackedSymbolArgs, 0),
 * 		reverseMappedStack:       make([]*ast.Symbol, 0),
 * 		enclosingSymbolTypes:     make(map[ast.SymbolId]*Type),
 * 		remappedSymbolReferences: make(map[ast.SymbolId]*ast.Symbol),
 * 	}
 * 	tracker = NewSymbolTrackerImpl(b.impl.ctx, tracker)
 * 	b.impl.ctx.tracker = tracker
 * }
 */
export function NodeBuilder_enterContext(receiver: GoPtr<NodeBuilder>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): void {
  const b = receiver!;
  let verbosityLevel = -1;
  let maxTruncationLength = 0;
  if (b.verbosity !== undefined) {
    verbosityLevel = b.verbosity.Level;
    maxTruncationLength = b.verbosity.MaxTruncationLength;
  }
  b.ctxStack = [...b.ctxStack, b.impl!.ctx];
  b.impl!.ctx = {
    host: b.host,
    tracker: tracker,
    approximateLength: 0,
    maxTruncationLength: maxTruncationLength,
    encounteredError: false as bool,
    truncating: false as bool,
    reportedDiagnostic: false as bool,
    flags: flags,
    internalFlags: internalFlags,
    depth: 0,
    maxExpansionDepth: verbosityLevel,
    typeStack: [],
    canIncreaseExpansionDepth: false as bool,
    expansionTruncated: false as bool,
    enclosingDeclaration: enclosingDeclaration,
    enclosingFile: GetSourceFileOfNode(enclosingDeclaration),
    inferTypeParameters: [],
    visitedTypes: { M: new globalThis.Map() },
    symbolDepth: NewGoStructMap(GoStructKey(
      [
        GoStructField((value: CompositeSymbolIdentity) => value.isConstructorNode, GoBooleanKey),
        GoStructField((value: CompositeSymbolIdentity) => value.symbolId, GoNumberKey),
        GoStructField((value: CompositeSymbolIdentity) => value.nodeId, GoNumberKey),
      ],
      ([isConstructorNode, symbolId, nodeId]) => ({ isConstructorNode, symbolId, nodeId }),
    )),
    trackedSymbols: [],
    mapper: undefined,
    reverseMappedStack: [],
    enclosingSymbolTypes: new globalThis.Map(),
    suppressReportInferenceFallback: false as bool,
    remappedSymbolReferences: new globalThis.Map(),
    typeParameterNames: { m: new globalThis.Map(), owned: false as bool },
    typeParameterNamesByText: { m: { m: new globalThis.Map(), owned: false as bool } },
    typeParameterNamesByTextNextNameCount: { m: new globalThis.Map(), owned: false as bool },
    typeParameterSymbolList: { m: { m: new globalThis.Map(), owned: false as bool } },
  };
  const newTracker = NewSymbolTrackerImpl(b.impl!.ctx, tracker);
  b.impl!.ctx.tracker = SymbolTrackerImpl_as_SymbolTracker(newTracker);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.propagateVerbosityOut","kind":"method","status":"implemented","sigHash":"6265d0f5da702898f7c7ed588963bbfbdbda3d9feb258deffdf87861db4c0735"}
 *
 * Go source:
 * func (b *NodeBuilder) propagateVerbosityOut() {
 * 	if b.verbosity != nil {
 * 		// Only set to true, never clear — multiple calls share the same VerbosityContext
 * 		if b.impl.ctx.canIncreaseExpansionDepth {
 * 			b.verbosity.CanIncreaseVerbosity = true
 * 		}
 * 		if b.impl.ctx.expansionTruncated {
 * 			b.verbosity.Truncated = true
 * 		}
 * 	}
 * }
 */
export function NodeBuilder_propagateVerbosityOut(receiver: GoPtr<NodeBuilder>): void {
  const b = receiver!;
  if (b.verbosity !== undefined) {
    // Only set to true, never clear — multiple calls share the same VerbosityContext
    if (b.impl!.ctx!.canIncreaseExpansionDepth) {
      b.verbosity.CanIncreaseVerbosity = true;
    }
    if (b.impl!.ctx!.expansionTruncated) {
      b.verbosity.Truncated = true;
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.popContext","kind":"method","status":"implemented","sigHash":"dbeeac6da32b15dabda40999da44174dd713394667de6af076af7e2aca991376"}
 *
 * Go source:
 * func (b *NodeBuilder) popContext() {
 * 	stackSize := len(b.ctxStack)
 * 	if stackSize == 0 {
 * 		b.impl.ctx = nil
 * 	} else {
 * 		b.impl.ctx = b.ctxStack[stackSize-1]
 * 		b.ctxStack = b.ctxStack[:stackSize-1]
 * 	}
 * }
 */
export function NodeBuilder_popContext(receiver: GoPtr<NodeBuilder>): void {
  const b = receiver!;
  const stackSize = b.ctxStack.length;
  if (stackSize === 0) {
    b.impl!.ctx = undefined;
  } else {
    b.impl!.ctx = b.ctxStack[stackSize - 1];
    b.ctxStack = b.ctxStack.slice(0, stackSize - 1);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.exitContext","kind":"method","status":"implemented","sigHash":"1c6e2b513829dfb9d095c46904312bd19dfcd887813883bf8ce59a662f50de02"}
 *
 * Go source:
 * func (b *NodeBuilder) exitContext(result *ast.Node) *ast.Node {
 * 	b.propagateVerbosityOut()
 * 	b.exitContextCheck()
 * 	defer b.popContext()
 * 	if b.impl.ctx.encounteredError {
 * 		return nil
 * 	}
 * 	return result
 * }
 */
export function NodeBuilder_exitContext(receiver: GoPtr<NodeBuilder>, result: GoPtr<Node>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_propagateVerbosityOut(b);
  NodeBuilder_exitContextCheck(b);
  try {
    if (b.impl!.ctx!.encounteredError) {
      return undefined;
    }
    return result;
  } finally {
    NodeBuilder_popContext(b);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.exitContextSlice","kind":"method","status":"implemented","sigHash":"5f687e71539c989d757d6146e94b1af9cd2109b12be9fb84d8d62763bce6966e"}
 *
 * Go source:
 * func (b *NodeBuilder) exitContextSlice(result []*ast.Node) []*ast.Node {
 * 	b.propagateVerbosityOut()
 * 	b.exitContextCheck()
 * 	defer b.popContext()
 * 	if b.impl.ctx.encounteredError {
 * 		return nil
 * 	}
 * 	return result
 * }
 */
export function NodeBuilder_exitContextSlice(receiver: GoPtr<NodeBuilder>, result: GoSlice<GoPtr<Node>>): GoSlice<GoPtr<Node>> {
  const b = receiver!;
  NodeBuilder_propagateVerbosityOut(b);
  NodeBuilder_exitContextCheck(b);
  try {
    if (b.impl!.ctx!.encounteredError) {
      return GoNilSlice<GoPtr<Node>>();
    }
    return result;
  } finally {
    NodeBuilder_popContext(b);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.exitContextCheck","kind":"method","status":"implemented","sigHash":"62c8da6a257100a367ebb4c22486f10e136b3539723503ab78c567fb0ebdba94"}
 *
 * Go source:
 * func (b *NodeBuilder) exitContextCheck() {
 * 	if b.impl.ctx.truncating && b.impl.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
 * 		b.impl.ctx.tracker.ReportTruncationError()
 * 	}
 * }
 */
export function NodeBuilder_exitContextCheck(receiver: GoPtr<NodeBuilder>): void {
  const b = receiver!;
  if (b.impl!.ctx!.truncating && (b.impl!.ctx!.flags & FlagsNoTruncation) !== 0) {
    b.impl!.ctx!.tracker!.ReportTruncationError();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.IndexInfoToIndexSignatureDeclaration","kind":"method","status":"implemented","sigHash":"00b7bcf8270161772958b2bc90e61a8f6a6f6bbfa37b3f09efd2032cd925deed"}
 *
 * Go source:
 * func (b *NodeBuilder) IndexInfoToIndexSignatureDeclaration(info *IndexInfo, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.indexInfoToIndexSignatureDeclarationHelper(info, nil))
 * }
 */
export function NodeBuilder_IndexInfoToIndexSignatureDeclaration(receiver: GoPtr<NodeBuilder>, info: GoPtr<IndexInfo>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_indexInfoToIndexSignatureDeclarationHelper(b.impl, info, undefined));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SerializeReturnTypeForSignature","kind":"method","status":"implemented","sigHash":"4460033c7db63ca38b4ac28f5332457fb0112cf6636e981d66ace8abe3d638f5"}
 *
 * Go source:
 * func (b *NodeBuilder) SerializeReturnTypeForSignature(signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	signature := b.impl.ch.getSignatureFromDeclaration(signatureDeclaration)
 * 	_, cleanup := b.impl.enterSignatureScope(signature)
 * 	result := b.impl.serializeReturnTypeForSignature(signature, true)
 * 	cleanup()
 * 	return b.exitContext(result)
 * }
 */
export function NodeBuilder_SerializeReturnTypeForSignature(receiver: GoPtr<NodeBuilder>, signatureDeclaration: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  const signature = Checker_getSignatureFromDeclaration(b.impl!.ch, signatureDeclaration);
  const [, cleanup] = NodeBuilderImpl_enterSignatureScope(b.impl, signature);
  const result = NodeBuilderImpl_serializeReturnTypeForSignature(b.impl, signature, true);
  cleanup!();
  return NodeBuilder_exitContext(b, result);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SerializeTypeParametersForSignature","kind":"method","status":"implemented","sigHash":"27fc3405a9e0e7cc1de5afb5278e12eaec19a8d07a216d584b4979bd8e12896b"}
 *
 * Go source:
 * func (b *NodeBuilder) SerializeTypeParametersForSignature(signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	symbol := b.impl.ch.getSymbolOfDeclaration(signatureDeclaration)
 * 	typeParams := b.SymbolToTypeParameterDeclarations(symbol, enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContextSlice(typeParams)
 * }
 */
export function NodeBuilder_SerializeTypeParametersForSignature(receiver: GoPtr<NodeBuilder>, signatureDeclaration: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoSlice<GoPtr<Node>> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  const symbol_ = Checker_getSymbolOfDeclaration(b.impl!.ch, signatureDeclaration);
  const typeParams = NodeBuilder_SymbolToTypeParameterDeclarations(b, symbol_, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContextSlice(b, typeParams);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SerializeTypeForDeclaration","kind":"method","status":"implemented","sigHash":"271fa5657703869eb06887371776166cbe5260b19d5c050386e5f22eceb7374d"}
 *
 * Go source:
 * func (b *NodeBuilder) SerializeTypeForDeclaration(declaration *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.serializeTypeForDeclaration(declaration, nil, symbol, true))
 * }
 */
export function NodeBuilder_SerializeTypeForDeclaration(receiver: GoPtr<NodeBuilder>, declaration: GoPtr<Node>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_serializeTypeForDeclaration(b.impl, declaration, undefined, symbol_, true as bool));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SerializeTypeForExpression","kind":"method","status":"implemented","sigHash":"c3188f4b4ceab7b471d732f7c100be400aad1bd30232f446f00ad8e2debb3089"}
 *
 * Go source:
 * func (b *NodeBuilder) SerializeTypeForExpression(expr *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.serializeTypeForExpression(expr))
 * }
 */
export function NodeBuilder_SerializeTypeForExpression(receiver: GoPtr<NodeBuilder>, expr: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_serializeTypeForExpression(b.impl, expr));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SignatureToSignatureDeclaration","kind":"method","status":"implemented","sigHash":"2f89cea185985e69e93b7ca53d167e4f6879dbfd2b7132b563373fead858835f"}
 *
 * Go source:
 * func (b *NodeBuilder) SignatureToSignatureDeclaration(signature *Signature, kind ast.Kind, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.signatureToSignatureDeclarationHelper(signature, kind, nil))
 * }
 */
export function NodeBuilder_SignatureToSignatureDeclaration(receiver: GoPtr<NodeBuilder>, signature: GoPtr<Signature>, kind: Kind, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_signatureToSignatureDeclarationHelper(b.impl, signature, kind, undefined));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.ExpandSymbolForHover","kind":"method","status":"implemented","sigHash":"7a3cbd508cd907016de28e2272ccb43566b14b2648b47a39ace496523e1f526b"}
 *
 * Go source:
 * func (b *NodeBuilder) ExpandSymbolForHover(symbol *ast.Symbol, meaning ast.SymbolFlags) []*ast.Node {
 * 	b.enterContext(nil, nodebuilder.FlagsIgnoreErrors|nodebuilder.FlagsMultilineObjectLiterals|nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope, nodebuilder.InternalFlagsNone, nil)
 *
 * 	// Push the declared type onto the type stack to prevent re-expansion.
 * 	// We push a nil sentinel after the real type so that isTypeOnStack
 * 	// (which skips the last element) still checks declaredType.
 * 	declaredType := b.impl.ch.getDeclaredTypeOfSymbol(symbol)
 * 	b.impl.ctx.typeStack = append(b.impl.ctx.typeStack, declaredType)
 * 	b.impl.ctx.typeStack = append(b.impl.ctx.typeStack, nil)
 *
 * 	nodes := b.impl.expandSymbolForHover(symbol)
 *
 * 	b.impl.ctx.typeStack = b.impl.ctx.typeStack[:len(b.impl.ctx.typeStack)-2]
 *
 * 	b.propagateVerbosityOut()
 *
 * 	// Simplify declarations by applying original modifiers
 * 	result := make([]*ast.Node, 0, len(nodes))
 * 	for _, node := range nodes {
 * 		switch node.Kind {
 * 		case ast.KindClassDeclaration:
 * 			result = append(result, simplifyClassDeclaration(b.impl.f, node, symbol))
 * 		case ast.KindEnumDeclaration:
 * 			result = append(result, simplifyModifiers(b.impl.f, node, ast.IsEnumDeclaration, symbol))
 * 		case ast.KindInterfaceDeclaration:
 * 			if meaning&ast.SymbolFlagsInterface != 0 {
 * 				result = append(result, simplifyModifiers(b.impl.f, node, ast.IsInterfaceDeclaration, symbol))
 * 			}
 * 		case ast.KindModuleDeclaration:
 * 			result = append(result, simplifyModifiers(b.impl.f, node, ast.IsModuleDeclaration, symbol))
 * 		}
 * 	}
 *
 * 	return b.exitContextSlice(result)
 * }
 */
export function NodeBuilder_ExpandSymbolForHover(receiver: GoPtr<NodeBuilder>, symbol_: GoPtr<Symbol>, meaning: SymbolFlags): GoSlice<GoPtr<Node>> {
  const b = receiver!;
  NodeBuilder_enterContext(b, undefined, (FlagsIgnoreErrors | FlagsMultilineObjectLiterals | FlagsUseAliasDefinedOutsideCurrentScope) as Flags, 0 as InternalFlags, undefined as unknown as SymbolTracker);
  const declaredType = Checker_getDeclaredTypeOfSymbol(b.impl!.ch, symbol_);
  b.impl!.ctx!.typeStack = [...b.impl!.ctx!.typeStack, declaredType];
  b.impl!.ctx!.typeStack = [...b.impl!.ctx!.typeStack, undefined];
  const nodes = NodeBuilderImpl_expandSymbolForHover(b.impl, symbol_);
  b.impl!.ctx!.typeStack = b.impl!.ctx!.typeStack.slice(0, b.impl!.ctx!.typeStack.length - 2);
  NodeBuilder_propagateVerbosityOut(b);
  let result: GoSlice<GoPtr<Node>> = [];
  for (const node of nodes) {
    switch (node!.Kind) {
      case KindClassDeclaration:
        result = [...result, simplifyClassDeclaration(b.impl!.f, node, symbol_)];
        break;
      case KindEnumDeclaration:
        result = [...result, simplifyModifiers(b.impl!.f, node, IsEnumDeclaration, symbol_)];
        break;
      case KindInterfaceDeclaration:
        if ((meaning & SymbolFlagsInterface) !== 0) {
          result = [...result, simplifyModifiers(b.impl!.f, node, IsInterfaceDeclaration, symbol_)];
        }
        break;
      case KindModuleDeclaration:
        result = [...result, simplifyModifiers(b.impl!.f, node, IsModuleDeclaration, symbol_)];
        break;
    }
  }
  return NodeBuilder_exitContextSlice(b, result);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::func::simplifyClassDeclaration","kind":"func","status":"implemented","sigHash":"7c62def0ba136852000b19a2e3ff5f59dc78a370af8fbbe9ca73fad6c3d4d6fe"}
 *
 * Go source:
 * func simplifyClassDeclaration(f *ast.NodeFactory, classDecl *ast.Node, symbol *ast.Symbol) *ast.Node {
 * 	classDeclarations := core.Filter(symbol.Declarations, ast.IsClassLike)
 * 	var originalClassDecl *ast.Node
 * 	if len(classDeclarations) > 0 {
 * 		originalClassDecl = classDeclarations[0]
 * 	} else {
 * 		originalClassDecl = classDecl
 * 	}
 * 	modifiers := originalClassDecl.ModifierFlags() & ^(ast.ModifierFlagsExport | ast.ModifierFlagsAmbient)
 * 	isAnonymous := ast.IsClassExpression(originalClassDecl)
 * 	if isAnonymous {
 * 		cd := classDecl.AsClassDeclaration()
 * 		classDecl = f.UpdateClassDeclaration(
 * 			cd,
 * 			classDecl.Modifiers(),
 * 			nil,
 * 			cd.TypeParameters,
 * 			cd.HeritageClauses,
 * 			cd.Members,
 * 		)
 * 	}
 * 	return ast.ReplaceModifiers(f, classDecl, f.NewModifierList(ast.CreateModifiersFromModifierFlags(modifiers, f.NewModifier)))
 * }
 */
export function simplifyClassDeclaration(f: GoPtr<NodeFactory>, classDecl: GoPtr<Node>, symbol_: GoPtr<Symbol>): GoPtr<Node> {
  const classDeclarations = Filter(symbol_!.Declarations ?? [], IsClassLike);
  let originalClassDecl: GoPtr<Node>;
  if (classDeclarations.length > 0) {
    originalClassDecl = classDeclarations[0];
  } else {
    originalClassDecl = classDecl;
  }
  const modifiers = Node_ModifierFlags(originalClassDecl) & ~(ModifierFlagsExport | ModifierFlagsAmbient);
  const isAnonymous = IsClassExpression(originalClassDecl);
  if (isAnonymous) {
    const cd = AsClassDeclaration(classDecl);
    classDecl = NodeFactory_UpdateClassDeclaration(
      f,
      cd,
      Node_Modifiers(classDecl),
      undefined,
      cd!.TypeParameters,
      cd!.HeritageClauses,
      cd!.Members,
    );
  }
  return ReplaceModifiers(f, classDecl, NodeFactory_NewModifierList(f, CreateModifiersFromModifierFlags(modifiers, (kind: Kind) => NodeFactory_NewModifier(f, kind))));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::func::simplifyModifiers","kind":"func","status":"implemented","sigHash":"57fd2fe02d634d4c88ecfa02cccbcb771ce7e1d0af3a25a1f83ac71e0dc1aeb5"}
 *
 * Go source:
 * func simplifyModifiers(f *ast.NodeFactory, newDecl *ast.Node, isDeclKind func(*ast.Node) bool, symbol *ast.Symbol) *ast.Node {
 * 	decls := core.Filter(symbol.Declarations, isDeclKind)
 * 	var declWithModifiers *ast.Node
 * 	if len(decls) > 0 {
 * 		declWithModifiers = decls[0]
 * 	} else {
 * 		declWithModifiers = newDecl
 * 	}
 * 	modifiers := declWithModifiers.ModifierFlags() & ^(ast.ModifierFlagsExport | ast.ModifierFlagsAmbient)
 * 	return ast.ReplaceModifiers(f, newDecl, f.NewModifierList(ast.CreateModifiersFromModifierFlags(modifiers, f.NewModifier)))
 * }
 */
export function simplifyModifiers(f: GoPtr<NodeFactory>, newDecl: GoPtr<Node>, isDeclKind: GoFunc<(arg0: GoPtr<Node>) => bool>, symbol_: GoPtr<Symbol>): GoPtr<Node> {
  const decls = Filter(symbol_!.Declarations ?? [], isDeclKind);
  let declWithModifiers: GoPtr<Node>;
  if (decls.length > 0) {
    declWithModifiers = decls[0];
  } else {
    declWithModifiers = newDecl;
  }
  const modifiers = Node_ModifierFlags(declWithModifiers) & ~(ModifierFlagsExport | ModifierFlagsAmbient);
  return ReplaceModifiers(f, newDecl, NodeFactory_NewModifierList(f, CreateModifiersFromModifierFlags(modifiers, (kind: Kind) => NodeFactory_NewModifier(f, kind))));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SymbolToEntityName","kind":"method","status":"implemented","sigHash":"730ac3d6e7081c7e3712b60f69989e745ffc2384f01a6914a1be57948a3c54c1"}
 *
 * Go source:
 * func (b *NodeBuilder) SymbolToEntityName(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.symbolToName(symbol, meaning, false))
 * }
 */
export function NodeBuilder_SymbolToEntityName(receiver: GoPtr<NodeBuilder>, symbol_: GoPtr<Symbol>, meaning: SymbolFlags, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_symbolToName(b.impl, symbol_, meaning, false as bool));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SymbolToExpression","kind":"method","status":"implemented","sigHash":"8bd212612bbd2acb542b6277a09df6a81f00b70de2dd01f6e16fa36b838f9fbd"}
 *
 * Go source:
 * func (b *NodeBuilder) SymbolToExpression(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.symbolToExpression(symbol, meaning))
 * }
 */
export function NodeBuilder_SymbolToExpression(receiver: GoPtr<NodeBuilder>, symbol_: GoPtr<Symbol>, meaning: SymbolFlags, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_symbolToExpression(b.impl, symbol_, meaning));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SymbolToNode","kind":"method","status":"implemented","sigHash":"4ac220de247e4166bd65e3bcbe9015437da3bb387935989d0eca4c1243bc4193"}
 *
 * Go source:
 * func (b *NodeBuilder) SymbolToNode(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.symbolToNode(symbol, meaning))
 * }
 */
export function NodeBuilder_SymbolToNode(receiver: GoPtr<NodeBuilder>, symbol_: GoPtr<Symbol>, meaning: SymbolFlags, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_symbolToNode(b.impl, symbol_, meaning));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SymbolToParameterDeclaration","kind":"method","status":"implemented","sigHash":"73b81729e72418271a33d45de1a22a43dde8fbe401841c019bc307f11569e22f"}
 *
 * Go source:
 * func (b NodeBuilder) SymbolToParameterDeclaration(symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.symbolToParameterDeclaration(symbol, false))
 * }
 */
export function NodeBuilder_SymbolToParameterDeclaration(receiver: NodeBuilder, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_symbolToParameterDeclaration(b.impl, symbol_, false as bool));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.SymbolToTypeParameterDeclarations","kind":"method","status":"implemented","sigHash":"ffe1ee4a3f21e2ecca84ef4d9e511b59da9e67da15280cc9c2aceee8010d0369"}
 *
 * Go source:
 * func (b *NodeBuilder) SymbolToTypeParameterDeclarations(symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContextSlice(b.impl.symbolToTypeParameterDeclarations(symbol))
 * }
 */
export function NodeBuilder_SymbolToTypeParameterDeclarations(receiver: GoPtr<NodeBuilder>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoSlice<GoPtr<Node>> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContextSlice(b, NodeBuilderImpl_symbolToTypeParameterDeclarations(b.impl, symbol_));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.TypeParameterToDeclaration","kind":"method","status":"implemented","sigHash":"a079bfac4ce21860c4a71a7978e057e64be6167cf60034147b8fe2d7193a4ba5"}
 *
 * Go source:
 * func (b *NodeBuilder) TypeParameterToDeclaration(parameter *Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.typeParameterToDeclaration(parameter))
 * }
 */
export function NodeBuilder_TypeParameterToDeclaration(receiver: GoPtr<NodeBuilder>, parameter: GoPtr<Type>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_typeParameterToDeclaration(b.impl, parameter));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.TypePredicateToTypePredicateNode","kind":"method","status":"implemented","sigHash":"a4b63fbc352d7f5132d98bcbdb28e867981cf16c3d0d1419bc5f5769ea10b707"}
 *
 * Go source:
 * func (b *NodeBuilder) TypePredicateToTypePredicateNode(predicate *TypePredicate, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.typePredicateToTypePredicateNode(predicate))
 * }
 */
export function NodeBuilder_TypePredicateToTypePredicateNode(receiver: GoPtr<NodeBuilder>, predicate: GoPtr<TypePredicate>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_typePredicateToTypePredicateNode(b.impl, predicate));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.TypeToTypeNode","kind":"method","status":"implemented","sigHash":"68e58546f68b798df8082c0580d0fdd6df08458e646979efc5e870c66e09a276"}
 *
 * Go source:
 * func (b *NodeBuilder) TypeToTypeNode(typ *Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.typeToTypeNode(typ))
 * }
 */
export function NodeBuilder_TypeToTypeNode(receiver: GoPtr<NodeBuilder>, typ: GoPtr<Type>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_typeToTypeNode(b.impl, typ));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::NodeBuilder.TryJSTypeNodeToTypeNode","kind":"method","status":"implemented","sigHash":"b6c74298c4ec35ba01ad8fc5982cd44f81a46c0df07497338d0dc9557b3dd57c"}
 *
 * Go source:
 * func (b *NodeBuilder) TryJSTypeNodeToTypeNode(node *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
 * 	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
 * 	return b.exitContext(b.impl.tryJSTypeNodeToTypeNode(node))
 * }
 */
export function NodeBuilder_TryJSTypeNodeToTypeNode(receiver: GoPtr<NodeBuilder>, node: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node> {
  const b = receiver!;
  NodeBuilder_enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
  return NodeBuilder_exitContext(b, NodeBuilderImpl_tryJSTypeNodeToTypeNode(b.impl, node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::func::NewNodeBuilder","kind":"func","status":"implemented","sigHash":"908a7a8953123cd4e81890e895b7e1c396a78e64c6db6dc1bb9ade29abb84392"}
 *
 * Go source:
 * func NewNodeBuilder(ch *Checker, e *printer.EmitContext) *NodeBuilder {
 * 	return NewNodeBuilderEx(ch, e, nil /*idToSymbol* /)
 * }
 */
export function NewNodeBuilder(ch: GoPtr<Checker>, e: GoPtr<EmitContext_3f6f588c>): GoPtr<NodeBuilder> {
  return NewNodeBuilderEx(ch, e, GoNilMap<GoPtr<IdentifierNode>, GoPtr<Symbol>>());
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::func::NewNodeBuilderEx","kind":"func","status":"implemented","sigHash":"7b8388ef9588371c534fbbd7c9bc213ccc724cb54237fe8b75685ebdf5f49d95"}
 *
 * Go source:
 * func NewNodeBuilderEx(ch *Checker, e *printer.EmitContext, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *NodeBuilder {
 * 	impl := newNodeBuilderImpl(ch, e, idToSymbol)
 * 	return &NodeBuilder{impl: impl, ctxStack: make([]*NodeBuilderContext, 0, 1), host: ch.program}
 * }
 */
export function NewNodeBuilderEx(ch: GoPtr<Checker>, e: GoPtr<EmitContext_3f6f588c>, idToSymbol: GoMap<GoPtr<IdentifierNode>, GoPtr<Symbol>>): GoPtr<NodeBuilder> {
  const impl = newNodeBuilderImpl(ch, e, idToSymbol);
  return { impl: impl, ctxStack: [], host: ch!.program as unknown as Host, verbosity: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::Checker.getNodeBuilder","kind":"method","status":"implemented","sigHash":"0f65596090092dce318a6048e2eddba4fe1bc58ff3308455575c96cd36759d4b"}
 *
 * Go source:
 * func (c *Checker) getNodeBuilder() (*NodeBuilder, func()) {
 * 	releaseNodes := func() {
 * 		c.typeToStringNodebuilder.EmitContext().Factory.ReleaseArenas() // Allow any allocated nodes to be freed if they're no longer in a cache
 * 	}
 * 	if c.typeToStringNodebuilder != nil {
 * 		return c.typeToStringNodebuilder, releaseNodes
 * 	}
 * 	c.typeToStringNodebuilder = c.getNodeBuilderEx(nil /*idToSymbol* /)
 * 	return c.typeToStringNodebuilder, releaseNodes
 * }
 */
export function Checker_getNodeBuilder(receiver: GoPtr<Checker>): [GoPtr<NodeBuilder>, GoFunc<() => void>] {
  const releaseNodes = (): void => {
    NodeFactory_ReleaseArenas(NodeBuilder_EmitContext(receiver!.typeToStringNodebuilder)!.Factory!.AsNodeFactory()); // Allow any allocated nodes to be freed if they're no longer in a cache
  };
  if (receiver!.typeToStringNodebuilder !== undefined) {
    return [receiver!.typeToStringNodebuilder, releaseNodes];
  }
  receiver!.typeToStringNodebuilder = Checker_getNodeBuilderEx(receiver, GoNilMap<GoPtr<IdentifierNode>, GoPtr<Symbol>>());
  return [receiver!.typeToStringNodebuilder, releaseNodes];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/nodebuilder.go::method::Checker.getNodeBuilderEx","kind":"method","status":"implemented","sigHash":"87077f83bd4df6f01f810b78e4f0c9d739a8c2f80668e06b95e988c30c88f5cb"}
 *
 * Go source:
 * func (c *Checker) getNodeBuilderEx(idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *NodeBuilder {
 * 	b := NewNodeBuilderEx(c, printer.NewEmitContext(), idToSymbol)
 * 	return b
 * }
 */
export function Checker_getNodeBuilderEx(receiver: GoPtr<Checker>, idToSymbol: GoMap<GoPtr<IdentifierNode>, GoPtr<Symbol>>): GoPtr<NodeBuilder> {
  return NewNodeBuilderEx(receiver, NewEmitContext(), idToSymbol);
}
