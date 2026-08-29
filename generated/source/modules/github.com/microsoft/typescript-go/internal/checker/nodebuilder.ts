import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassDeclaration as ClassDeclaration__from_ast, Identifier as Identifier__from_ast, Kind as Kind__from_ast, SymbolFlags as SymbolFlags__from_ast, SymbolId as SymbolId__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Flags as Flags__from_nodebuilder, InternalFlags as InternalFlags__from_nodebuilder, SymbolTracker as SymbolTracker__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { EmitContext as EmitContext__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { Host } from "./checker.js";
import type { TrackedSymbolArgs } from "./nodebuilderimpl.js";
import type { IndexInfo, Signature, Type, TypeId, TypePredicate } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CreateModifiersFromModifierFlags as CreateModifiersFromModifierFlags__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsEnumDeclaration as IsEnumDeclaration__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, NodeFactory as NodeFactory__from_ast, Node as Node__from_ast, ReplaceModifiers as ReplaceModifiers__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CopyOnWriteMap as CopyOnWriteMap__from_collections, CopyOnWriteSet as CopyOnWriteSet__from_collections, Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { FlagsNoTruncation$constant as FlagsNoTruncation$constant__from_nodebuilder, InternalFlagsNone$constant as InternalFlagsNone$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$SymbolTrackerImpl as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_ast$SymbolId_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_Named_ast$SymbolId_To_PointerTo_Named_checker$Type, $goMap$MapOf_Named_ast$SymbolId_To_Struct_void, $goMap$MapOf_Named_checker$TypeId_To_PointerTo_Named_ast$Identifier, $goMap$MapOf_Named_checker$TypeId_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_checker$CompositeSymbolIdentity_To_int as GoMap } from "../../../../../../support/maps.js";
import { Checker } from "./checker.js";
import { NodeBuilderContext, NodeBuilderImpl, newNodeBuilderImpl } from "./nodebuilderimpl.js";
import { NewSymbolTrackerImpl } from "./symboltracker.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class NodeBuilder {
    declare private readonly $goType: void;
    public constructor(public ctxStack: RuntimeSlice<{
        value: NodeBuilderContext;
    } | undefined>, public host: Host | undefined, public impl: {
        value: NodeBuilderImpl;
    } | undefined, public verbosity: {
        value: VerbosityContext;
    } | undefined) {
    }
    static $copy($source: NodeBuilder): NodeBuilder {
        return new NodeBuilder($source.ctxStack, $source.host, $source.impl, $source.verbosity);
    }
    declare private readonly then?: never;
    static EmitContext(b: NodeBuilder | undefined): {
        value: EmitContext__from_printer;
    } | undefined {
        return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e;
    }
    static ExpandSymbolForHover(b: NodeBuilder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        NodeBuilder.$go$private$checker$enterContext(b, void 0, 70239232, InternalFlagsNone$constant__from_nodebuilder(), void 0);
        let declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfSymbol(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.append(void 0, [declaredType]);
        (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.append(void 0, [void 0]);
        let nodes = NodeBuilderImpl.$go$private$checker$expandSymbolForHover((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, __go_symbol);
        (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.slice(0, (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.length - 2, null);
        NodeBuilder.$go$private$checker$propagateVerbosityOut(b);
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, nodes.length, void 0);
        const __gotots_range_0 = nodes;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindClassDeclaration$constant__from_ast(): {
                    result = result.append(void 0, [simplifyClassDeclaration(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node, __go_symbol)]);
                    break;
                }
                case KindEnumDeclaration$constant__from_ast(): {
                    result = result.append(void 0, [simplifyModifiers(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node, IsEnumDeclaration__from_ast, __go_symbol)]);
                    break;
                }
                case KindInterfaceDeclaration$constant__from_ast(): {
                    if (!((meaning & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0)) {
                        result = result.append(void 0, [simplifyModifiers(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node, IsInterfaceDeclaration__from_ast, __go_symbol)]);
                    }
                    break;
                }
                case KindModuleDeclaration$constant__from_ast(): {
                    result = result.append(void 0, [simplifyModifiers(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node, IsModuleDeclaration__from_ast, __go_symbol)]);
                    break;
                }
            }
        }
        return NodeBuilder.$go$private$checker$exitContextSlice(b, result);
    }
    static IndexInfoToIndexSignatureDeclaration(b: NodeBuilder | undefined, info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$indexInfoToIndexSignatureDeclarationHelper((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, info, void 0));
    }
    static SerializeReturnTypeForSignature(b: NodeBuilder | undefined, signatureDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signatureDeclaration);
        const __gotots_results_0 = NodeBuilderImpl.$go$private$checker$enterSignatureScope((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, signature);
        let cleanup: (() => void) | undefined = __gotots_results_0[1];
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeReturnTypeForSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, signature, true);
        const __gotots_callee_0 = cleanup;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        return NodeBuilder.$go$private$checker$exitContext(b, result);
    }
    static SerializeTypeForDeclaration(b: NodeBuilder | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, declaration, void 0, __go_symbol, true));
    }
    static SerializeTypeForExpression(b: NodeBuilder | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$serializeTypeForExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, expr));
    }
    static SerializeTypeParametersForSignature(b: NodeBuilder | undefined, signatureDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signatureDeclaration);
        let typeParams = NodeBuilder.SymbolToTypeParameterDeclarations(b, __go_symbol, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContextSlice(b, typeParams);
    }
    static SignatureToSignatureDeclaration(b: NodeBuilder | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined, kind: Kind__from_ast, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, signature, kind, void 0));
    }
    static SymbolToEntityName(b: NodeBuilder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$symbolToName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, __go_symbol, meaning, false));
    }
    static SymbolToExpression(b: NodeBuilder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$symbolToExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, __go_symbol, meaning));
    }
    static SymbolToNode(b: NodeBuilder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$symbolToNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, __go_symbol, meaning));
    }
    static SymbolToTypeParameterDeclarations(b: NodeBuilder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContextSlice(b, NodeBuilderImpl.$go$private$checker$symbolToTypeParameterDeclarations((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, __go_symbol));
    }
    static TryJSTypeNodeToTypeNode(b: NodeBuilder | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$tryJSTypeNodeToTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, node));
    }
    static TypeParameterToDeclaration(b: NodeBuilder | undefined, parameter: tsonicTypeScriptRuntime.Location<Type> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, parameter));
    }
    static TypePredicateToTypePredicateNode(b: NodeBuilder | undefined, predicate: {
        value: TypePredicate;
    } | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$typePredicateToTypePredicateNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, predicate));
    }
    static TypeToTypeNode(b: NodeBuilder | undefined, typ: tsonicTypeScriptRuntime.Location<Type> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$typeToTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl, typ));
    }
    static $go$private$checker$enterContext(b: NodeBuilder | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): void {
        let verbosityLevel = -1;
        let maxTruncationLength = 0;
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity === undefined)) {
            verbosityLevel = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Level;
            maxTruncationLength = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MaxTruncationLength;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack.append(void 0, [((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx]);
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx =
            { value: new NodeBuilderContext((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, tracker, 0, maxTruncationLength, false, false, false, flags, internalFlags, 0, verbosityLevel, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), false, false, enclosingDeclaration, GetSourceFileOfNode__from_ast(enclosingDeclaration), RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Type> | undefined>(0, null, void 0), Set__from_collections.$zero<TypeId>((): GoMapValue<TypeId, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_checker$TypeId_To_Struct_void.nil();
                }), GoMap.make(0, []), RuntimeSlice.make<{
                    value: TrackedSymbolArgs;
                } | undefined>(0, null, void 0), void 0, RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(0, null, void 0), $goMap$MapOf_Named_ast$SymbolId_To_PointerTo_Named_checker$Type.make(0, []), false, $goMap$MapOf_Named_ast$SymbolId_To_PointerTo_Named_ast$Symbol.make(0, []), CopyOnWriteMap__from_collections.$zero<TypeId, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>((): GoMapValue<TypeId, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined> => {
                    return $goMap$MapOf_Named_checker$TypeId_To_PointerTo_Named_ast$Identifier.nil();
                }), CopyOnWriteSet__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
                    return $goMap$MapOf_string_To_Struct_void.nil();
                }), CopyOnWriteMap__from_collections.$zero<gostring, int>((): GoMapValue<gostring, int> => {
                    return GoMap__from_gotots_runtime.nil<gostring, int>(0);
                }), CopyOnWriteSet__from_collections.$zero<SymbolId__from_ast>((): GoMapValue<SymbolId__from_ast, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_ast$SymbolId_To_Struct_void.nil();
                })) };
        tracker = new GoInterfaceAdapter(NewSymbolTrackerImpl(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx, tracker));
        (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker = tracker;
    }
    static $go$private$checker$exitContext(b: NodeBuilder | undefined, result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    NodeBuilder.$go$private$checker$propagateVerbosityOut(b);
                    NodeBuilder.$go$private$checker$exitContextCheck(b);
                    const __gotots_receiver_0 = b;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        NodeBuilder.$go$private$checker$popContext(__gotots_receiver_0);
                    };
                    if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = result;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$checker$exitContextCheck(b: NodeBuilder | undefined): void {
        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating && !(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
            const __gotots_receiver_0: NodeBuilderContext["tracker"] = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_0).ReportTruncationError();
        }
    }
    static $go$private$checker$exitContextSlice(b: NodeBuilder | undefined, result: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    NodeBuilder.$go$private$checker$propagateVerbosityOut(b);
                    NodeBuilder.$go$private$checker$exitContextCheck(b);
                    const __gotots_receiver_1 = b;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        NodeBuilder.$go$private$checker$popContext(__gotots_receiver_1);
                    };
                    if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError) {
                        __gotots_return_1 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_1;
                    }
                    __gotots_return_1 = result;
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static $go$private$checker$popContext(b: NodeBuilder | undefined): void {
        let stackSize = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack.length;
        if (stackSize === 0) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx = void 0;
        }
        else {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack.get(stackSize - 1);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctxStack.slice(0, stackSize - 1, null);
        }
    }
    static $go$private$checker$propagateVerbosityOut(b: NodeBuilder | undefined): void {
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity === undefined)) {
            if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity = true;
            }
            if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).impl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expansionTruncated) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).verbosity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated = true;
            }
        }
    }
    SymbolToParameterDeclaration(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let b: NodeBuilder = NodeBuilder.$copy(this);
        NodeBuilder.$go$private$checker$enterContext(b, enclosingDeclaration, flags, internalFlags, tracker);
        return NodeBuilder.$go$private$checker$exitContext(b, NodeBuilderImpl.$go$private$checker$symbolToParameterDeclaration(b.impl, __go_symbol, false));
    }
    $tsonicReplace($value: NodeBuilder): void {
        this.ctxStack = $value.ctxStack;
        this.host = $value.host;
        this.impl = $value.impl;
        this.verbosity = $value.verbosity;
    }
}
export class VerbosityContext {
    declare private readonly $goType: void;
    public constructor(public Level: int, public MaxTruncationLength: int, public CanIncreaseVerbosity: bool, public Truncated: bool) {
    }
    static $copy($source: VerbosityContext): VerbosityContext {
        return new VerbosityContext($source.Level, $source.MaxTruncationLength, $source.CanIncreaseVerbosity, $source.Truncated);
    }
    static $equal($left: VerbosityContext, $right: VerbosityContext): bool {
        return $left.Level === $right.Level && $left.MaxTruncationLength === $right.MaxTruncationLength && $left.CanIncreaseVerbosity === $right.CanIncreaseVerbosity && $left.Truncated === $right.Truncated;
    }
    static $hash($source: VerbosityContext): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Level));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.MaxTruncationLength));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.CanIncreaseVerbosity));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Truncated));
        return $hash;
    }
    declare private readonly then?: never;
}
export function simplifyClassDeclaration(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, classDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let classDeclarations = Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsClassLike__from_ast);
    let originalClassDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (classDeclarations.length > 0) {
        originalClassDecl = classDeclarations.get(0);
    }
    else {
        originalClassDecl = classDecl;
    }
    let modifiers = (Node__from_ast.ModifierFlags(originalClassDecl) & 4294967135) >>> 0;
    let isAnonymous = IsClassExpression__from_ast(originalClassDecl);
    if (isAnonymous) {
        let cd: {
            value: ClassDeclaration__from_ast;
        } | undefined = Node__from_ast.AsClassDeclaration(classDecl);
        classDecl = NodeFactory__from_ast.UpdateClassDeclaration(f, cd, Node__from_ast.Modifiers(classDecl), void 0, (cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters, (cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses, (cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
    }
    const __gotots_argument_3 = f;
    const __gotots_argument_4 = classDecl;
    const __gotots_receiver_3 = f;
    const __gotots_argument_0 = modifiers;
    const __gotots_receiver_2 = f;
    const __gotots_argument_1 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return NodeFactory__from_ast.NewModifier(__gotots_receiver_2, $argument0);
    };
    const __gotots_argument_2 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_0, __gotots_argument_1);
    const __gotots_argument_5 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_3, __gotots_argument_2);
    return ReplaceModifiers__from_ast(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
}
export function simplifyModifiers(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, newDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isDeclKind: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let decls = Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, isDeclKind);
    let declWithModifiers: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (decls.length > 0) {
        declWithModifiers = decls.get(0);
    }
    else {
        declWithModifiers = newDecl;
    }
    let modifiers = (Node__from_ast.ModifierFlags(declWithModifiers) & 4294967135) >>> 0;
    const __gotots_argument_9 = f;
    const __gotots_argument_10 = newDecl;
    const __gotots_receiver_5 = f;
    const __gotots_argument_6 = modifiers;
    const __gotots_receiver_4 = f;
    const __gotots_argument_7 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return NodeFactory__from_ast.NewModifier(__gotots_receiver_4, $argument0);
    };
    const __gotots_argument_8 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_6, __gotots_argument_7);
    const __gotots_argument_11 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_5, __gotots_argument_8);
    return ReplaceModifiers__from_ast(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
}
export function NewNodeBuilder(ch: {
    value: Checker;
} | undefined, e: {
    value: EmitContext__from_printer;
} | undefined): NodeBuilder | undefined {
    return NewNodeBuilderEx(ch, e, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.nil());
}
export function NewNodeBuilderEx(ch: {
    value: Checker;
} | undefined, e: {
    value: EmitContext__from_printer;
} | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): NodeBuilder | undefined {
    let impl: {
        value: NodeBuilderImpl;
    } | undefined = newNodeBuilderImpl(ch, e, idToSymbol);
    return new NodeBuilder(RuntimeSlice.make<{
        value: NodeBuilderContext;
    } | undefined>(0, 1, void 0), (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, impl, void 0);
}
