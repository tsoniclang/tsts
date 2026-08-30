import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CallSignatureDeclaration as CallSignatureDeclaration__from_ast, ComputedPropertyName as ComputedPropertyName__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, ConstructorTypeNode as ConstructorTypeNode__from_ast, ImportAttributes as ImportAttributes__from_ast, ImportTypeNode as ImportTypeNode__from_ast, IndexSignatureDeclaration as IndexSignatureDeclaration__from_ast, JSDocNonNullableType as JSDocNonNullableType__from_ast, JSDocNullableType as JSDocNullableType__from_ast, JSDocOptionalType as JSDocOptionalType__from_ast, JSDocParameterOrPropertyTag as JSDocParameterOrPropertyTag__from_ast, JSDocSignature as JSDocSignature__from_ast, JSDocTypeExpression as JSDocTypeExpression__from_ast, JSDocTypeLiteral as JSDocTypeLiteral__from_ast, JSDocVariadicType as JSDocVariadicType__from_ast, MappedTypeNode as MappedTypeNode__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, QualifiedName as QualifiedName__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast, TypePredicateNode as TypePredicateNode__from_ast, TypeQueryNode as TypeQueryNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LinkStore as LinkStore__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { SymbolTracker as SymbolTracker__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { NodeBuilderContext } from "./nodebuilderimpl.js";
import type { SymbolNodeLinks$Storage as SymbolNodeLinks__from_checker$Storage, Type } from "./types.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { ConstructSignatureDeclaration as ConstructSignatureDeclaration__from_ast, ExpressionBase as ExpressionBase__from_ast, FindAncestor as FindAncestor__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionOrConstructorTypeNodeBase as FunctionOrConstructorTypeNodeBase__from_ast, FunctionTypeNode as FunctionTypeNode__from_ast, GetFirstIdentifier as GetFirstIdentifier__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasDynamicName as HasDynamicName__from_ast, Identifier as Identifier__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConditionalTypeNode as IsConditionalTypeNode__from_ast, IsConstTypeReference as IsConstTypeReference__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsExportsIdentifier as IsExportsIdentifier__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsIndexedAccessTypeNode as IsIndexedAccessTypeNode__from_ast, IsJSDocParameterTag as IsJSDocParameterTag__from_ast, IsLiteralImportTypeNode as IsLiteralImportTypeNode__from_ast, IsMappedTypeNode as IsMappedTypeNode__from_ast, IsModuleExportsAccessExpression as IsModuleExportsAccessExpression__from_ast, IsModuleIdentifier as IsModuleIdentifier__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPartOfParameterDeclaration as IsPartOfParameterDeclaration__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsThisIdentifier as IsThisIdentifier__from_ast, IsThisTypeNode as IsThisTypeNode__from_ast, IsTupleTypeNode as IsTupleTypeNode__from_ast, IsTypeLiteralNode as IsTypeLiteralNode__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeOperatorNode as IsTypeOperatorNode__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsTypePredicateNode as IsTypePredicateNode__from_ast, IsTypeQueryNode as IsTypeQueryNode__from_ast, IsTypeReferenceNode as IsTypeReferenceNode__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindAssertKeyword$constant as KindAssertKeyword$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindJSDocAllType$constant as KindJSDocAllType$constant__from_ast, KindJSDocNonNullableType$constant as KindJSDocNonNullableType$constant__from_ast, KindJSDocNullableType$constant as KindJSDocNullableType$constant__from_ast, KindJSDocOptionalType$constant as KindJSDocOptionalType$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindJSDocTypeExpression$constant as KindJSDocTypeExpression$constant__from_ast, KindJSDocTypeLiteral$constant as KindJSDocTypeLiteral$constant__from_ast, KindJSDocVariadicType$constant as KindJSDocVariadicType$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, MethodSignatureDeclaration as MethodSignatureDeclaration__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SkipParentheses as SkipParentheses__from_ast, StringLiteral as StringLiteral__from_ast, SymbolFlagsFunctionScopedVariable$constant as SymbolFlagsFunctionScopedVariable$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, Symbol as Symbol__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FlagsMultilineObjectLiterals$constant as FlagsMultilineObjectLiterals$constant__from_nodebuilder, FlagsUseSingleQuotesForStringLiteralType$constant as FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder, InternalFlagsAllowUnresolvedNames$constant as InternalFlagsAllowUnresolvedNames$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { EFNoAsciiEscaping$constant as EFNoAsciiEscaping$constant__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, SymbolAccessibilityAccessible$constant as SymbolAccessibilityAccessible$constant__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SymbolNodeLinks } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$ReportCyclicStructureError$void_to_void, $goInterfaceMethod$ReportInaccessibleThisError$void_to_void, $goInterfaceMethod$ReportInaccessibleUniqueSymbolError$void_to_void } from "../../../../../../support/interface-methods.js";
import { Checker } from "./checker.js";
import { getMeaningOfEntityNameReference } from "./emitresolver.js";
import { TypeMapper } from "./mapper.js";
import { NodeBuilderImpl, TrackedSymbolArgs } from "./nodebuilderimpl.js";
import { Signature, SymbolNodeLinks, TypeFlagsAny$constant } from "./types.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class recoveryBoundary {
    declare private readonly $goType: void;
    public constructor(public ctx: {
        value: NodeBuilderContext;
    } | undefined, public hadError: bool, public deferredReports: RuntimeSlice<(() => void) | undefined>, public oldTracker: SymbolTracker__from_nodebuilder | undefined, public oldTrackedSymbols: RuntimeSlice<{
        value: TrackedSymbolArgs;
    } | undefined>, public trackedSymbols: RuntimeSlice<{
        value: TrackedSymbolArgs;
    } | undefined>, public oldEncounteredError: bool, public oldApproximateLength: int) {
    }
    static $copy($source: recoveryBoundary): recoveryBoundary {
        return new recoveryBoundary($source.ctx, $source.hadError, $source.deferredReports, $source.oldTracker, $source.oldTrackedSymbols, $source.trackedSymbols, $source.oldEncounteredError, $source.oldApproximateLength);
    }
    declare private readonly then?: never;
    static $go$private$checker$endRecoveryScope(b: {
        value: recoveryBoundary;
    } | undefined, state: originalRecoveryScopeState): void {
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError = state.hadError;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols.slice(0, state.trackedSymbolsTop, null);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports.slice(0, state.unreportedErrorsTop, null);
    }
    static $go$private$checker$markError(b: {
        value: recoveryBoundary;
    } | undefined, f: (() => void) | undefined): void {
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError = true;
        if (!(f === undefined)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports.append(void 0, [f]);
        }
    }
    static $go$private$checker$startRecoveryScope(b: {
        value: recoveryBoundary;
    } | undefined): originalRecoveryScopeState {
        let trackedSymbolsTop = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols.length;
        let unreportedErrorsTop = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports.length;
        return new originalRecoveryScopeState(trackedSymbolsTop, unreportedErrorsTop, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError);
    }
}
export class originalRecoveryScopeState {
    declare private readonly $goType: void;
    public constructor(public trackedSymbolsTop: int, public unreportedErrorsTop: int, public hadError: bool) {
    }
    static $copy($source: originalRecoveryScopeState): originalRecoveryScopeState {
        return new originalRecoveryScopeState($source.trackedSymbolsTop, $source.unreportedErrorsTop, $source.hadError);
    }
    declare private readonly then?: never;
}
export class wrappingTracker {
    declare private readonly $goType: void;
    public constructor(public wrapped: SymbolTracker__from_nodebuilder | undefined, public bound: {
        value: recoveryBoundary;
    } | undefined) {
    }
    static $copy($source: wrappingTracker): wrappingTracker {
        return new wrappingTracker($source.wrapped, $source.bound);
    }
    static $equal($left: wrappingTracker, $right: wrappingTracker): bool {
        return goInterfaceEqual($left.wrapped, $right.wrapped) &&
            $left.bound
                ===
                    $right.bound;
    }
    static $hash($source: wrappingTracker): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.wrapped === undefined ? 0 : $source.wrapped.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.bound));
        return $hash;
    }
    declare private readonly then?: never;
    static PopErrorFallbackNode(w: {
        value: wrappingTracker;
    } | undefined): void {
        const __gotots_receiver_4: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_4).PopErrorFallbackNode();
    }
    static PushErrorFallbackNode(w: {
        value: wrappingTracker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_receiver_5: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
        const __gotots_argument_36 = node;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_5).PushErrorFallbackNode(__gotots_argument_36);
    }
    static ReportCyclicStructureError(w: {
        value: wrappingTracker;
    } | undefined): void {
        const __gotots_receiver_8: wrappingTracker["bound"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound;
        const __gotots_receiver_6 = goInterfaceNonNil((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped);
        const __gotots_argument_37 = DeferredCallableRegistry.register((): void => __gotots_receiver_6.ReportCyclicStructureError(), ($go$recovery: GoRecovery): void => {
            const __gotots_receiver_7: SymbolTracker__from_nodebuilder = goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_6);
            const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$ReportCyclicStructureError$void_to_void, __gotots_receiver_7);
            __gotots_deferred_0 === undefined ? __gotots_receiver_7.ReportCyclicStructureError() : __gotots_deferred_0($go$recovery, __gotots_receiver_7);
        });
        recoveryBoundary.$go$private$checker$markError(__gotots_receiver_8, __gotots_argument_37);
    }
    static ReportInaccessibleThisError(w: {
        value: wrappingTracker;
    } | undefined): void {
        const __gotots_receiver_11: wrappingTracker["bound"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound;
        const __gotots_receiver_9 = goInterfaceNonNil((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped);
        const __gotots_argument_38 = DeferredCallableRegistry.register((): void => __gotots_receiver_9.ReportInaccessibleThisError(), ($go$recovery: GoRecovery): void => {
            const __gotots_receiver_10: SymbolTracker__from_nodebuilder = goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_9);
            const __gotots_deferred_1 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$ReportInaccessibleThisError$void_to_void, __gotots_receiver_10);
            __gotots_deferred_1 === undefined ? __gotots_receiver_10.ReportInaccessibleThisError() : __gotots_deferred_1($go$recovery, __gotots_receiver_10);
        });
        recoveryBoundary.$go$private$checker$markError(__gotots_receiver_11, __gotots_argument_38);
    }
    static ReportInaccessibleUniqueSymbolError(w: {
        value: wrappingTracker;
    } | undefined): void {
        const __gotots_receiver_14: wrappingTracker["bound"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound;
        const __gotots_receiver_12 = goInterfaceNonNil((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped);
        const __gotots_argument_39 = DeferredCallableRegistry.register((): void => __gotots_receiver_12.ReportInaccessibleUniqueSymbolError(), ($go$recovery: GoRecovery): void => {
            const __gotots_receiver_13: SymbolTracker__from_nodebuilder = goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_12);
            const __gotots_deferred_2 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$ReportInaccessibleUniqueSymbolError$void_to_void, __gotots_receiver_13);
            __gotots_deferred_2 === undefined ? __gotots_receiver_13.ReportInaccessibleUniqueSymbolError() : __gotots_deferred_2($go$recovery, __gotots_receiver_13);
        });
        recoveryBoundary.$go$private$checker$markError(__gotots_receiver_14, __gotots_argument_39);
    }
    static ReportInferenceFallback(w: {
        value: wrappingTracker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_receiver_15: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
        const __gotots_argument_40 = node;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_15).ReportInferenceFallback(__gotots_argument_40);
    }
    static ReportLikelyUnsafeImportRequiredError(w: {
        value: wrappingTracker;
    } | undefined, specifier: gostring, symbolName: gostring): void {
        recoveryBoundary.$go$private$checker$markError((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound, (): void => {
            const __gotots_receiver_16: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
            const __gotots_argument_41 = specifier;
            const __gotots_argument_42 = symbolName;
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_16).ReportLikelyUnsafeImportRequiredError(__gotots_argument_41, __gotots_argument_42);
        });
    }
    static ReportNonSerializableProperty(w: {
        value: wrappingTracker;
    } | undefined, propertyName: gostring): void {
        recoveryBoundary.$go$private$checker$markError((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound, (): void => {
            const __gotots_receiver_17: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
            const __gotots_argument_43 = propertyName;
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_17).ReportNonSerializableProperty(__gotots_argument_43);
        });
    }
    static ReportNonlocalAugmentation(w: {
        value: wrappingTracker;
    } | undefined, containingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, augmentingSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        const __gotots_receiver_18: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
        const __gotots_argument_44 = containingFile;
        const __gotots_argument_45 = parentSymbol;
        const __gotots_argument_46 = augmentingSymbol;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_18).ReportNonlocalAugmentation(__gotots_argument_44, __gotots_argument_45, __gotots_argument_46);
    }
    static ReportPrivateInBaseOfClassExpression(w: {
        value: wrappingTracker;
    } | undefined, propertyName: gostring): void {
        recoveryBoundary.$go$private$checker$markError((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound, (): void => {
            const __gotots_receiver_19: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
            const __gotots_argument_47 = propertyName;
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_19).ReportPrivateInBaseOfClassExpression(__gotots_argument_47);
        });
    }
    static ReportTruncationError(w: {
        value: wrappingTracker;
    } | undefined): void {
        const __gotots_receiver_20: wrappingTracker["wrapped"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wrapped;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_20).ReportTruncationError();
    }
    static TrackSymbol(w: {
        value: wrappingTracker;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning: SymbolFlags__from_ast): bool {
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols.append(void 0, [
            { value: new TrackedSymbolArgs(__go_symbol, enclosingDeclaration, meaning) },
        ]);
        return false;
    }
}
export function newWrappingTracker(inner: SymbolTracker__from_nodebuilder | undefined, bound: {
    value: recoveryBoundary;
} | undefined): {
    value: wrappingTracker;
} | undefined {
    return { value: new wrappingTracker(inner, bound) };
}
export function getExistingNodeTreeVisitor(b: {
    value: NodeBuilderImpl;
} | undefined, bound: {
    value: recoveryBoundary;
} | undefined): {
    value: NodeVisitor__from_ast;
} | undefined {
    let visitor: {
        value: NodeVisitor__from_ast;
    } | undefined = void 0;
    let attachSymbolToLeftmostIdentifier: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (leftmost: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let vis: {
            value: NodeVisitor__from_ast;
        } | undefined = void 0;
        let visitorFunc: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (tsonicTypeScriptRuntime.sameLocation(node__shadow_1, leftmost)) {
                let type_: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!(sym === undefined)) {
                    type_ = Checker.$go$private$checker$getDeclaredTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, sym);
                    if (!((Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
                        const __gotots_store_0 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                    Identifier__from_ast.$storageOf(((NodeBuilderImpl.$go$private$checker$typeParameterToName(b, type_) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                        name = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    }
                }
                if (name === undefined) {
                    name = NodeBuilderImpl.$go$private$checker$newIdentifier(b, Node__from_ast.Text(node__shadow_1), sym);
                }
                name = NodeBuilderImpl.$go$private$checker$setTextRange(b, name, node__shadow_1);
                EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, name, EFNoAsciiEscaping$constant__from_printer());
                return name;
            }
            return NodeBuilderImpl.$go$private$checker$setTextRange(b, Node__from_ast.VisitEachChild(node__shadow_1, vis), node__shadow_1);
        };
        vis = NewNodeVisitor__from_ast(visitorFunc, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, new NodeVisitorHooks__from_ast(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
        const __gotots_callee_0 = visitorFunc;
        const __gotots_argument_0 = node;
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
    };
    let trackExistingEntityName: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => [
        bool,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined
    ]) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, overrideEnclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        bool,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined
    ] => {
        let enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        if (!(overrideEnclosing === undefined)) {
            enclosingDeclaration = overrideEnclosing;
        }
        let introducesError = false;
        let leftmost: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(node);
        if (IsInJSFile__from_ast(node) && (IsExportsIdentifier__from_ast(leftmost) || IsModuleExportsAccessExpression__from_ast(Node__from_ast.$storageOf(((leftmost ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || (IsQualifiedName__from_ast(Node__from_ast.$storageOf(((leftmost ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsModuleIdentifier__from_ast((Node__from_ast.AsQualifiedName(Node__from_ast.$storageOf(((leftmost ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left) && IsExportsIdentifier__from_ast((Node__from_ast.AsQualifiedName(Node__from_ast.$storageOf(((leftmost ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right)))) {
            introducesError = true;
            return [introducesError, NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node), node), void 0];
        }
        let meaning = getMeaningOfEntityNameReference(node);
        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (IsThisIdentifier__from_ast(leftmost)) {
            sym = Checker.$go$private$checker$getSymbolOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getThisContainer((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, leftmost, false, false));
            if (!(Checker.IsSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, sym, leftmost, meaning, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer())) {
                introducesError = true;
                const __gotots_receiver_0: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_0).ReportInaccessibleThisError();
            }
            const __gotots_results_0 = introducesError;
            const __gotots_callee_1 = attachSymbolToLeftmostIdentifier;
            const __gotots_argument_1 = leftmost;
            const __gotots_argument_2 = node;
            const __gotots_argument_3 = sym;
            const __gotots_results_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
            const __gotots_results_2 = void 0;
            return [__gotots_results_0, __gotots_results_1, __gotots_results_2];
        }
        sym = Checker.$go$private$checker$resolveEntityName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, leftmost, meaning, true, true, void 0);
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) && !(!(sym === undefined) && !((Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0))) {
            sym = Checker.$go$private$checker$getExportSymbolOfValueSymbolIfExported((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, sym);
            let symAtLocation: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveEntityName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, leftmost, meaning, true, true, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
            if (tsonicTypeScriptRuntime.sameLocation(symAtLocation, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownSymbol)
                || (symAtLocation === undefined && !(sym === undefined)) || (!(symAtLocation === undefined) && !(sym === undefined) && Checker.$go$private$checker$getSymbolIfSameReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getExportSymbolOfValueSymbolIfExported((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, symAtLocation), sym) === undefined)) {
                if (!tsonicTypeScriptRuntime.sameLocation(symAtLocation, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownSymbol)) {
                    const __gotots_receiver_1: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_4 = node;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_1).ReportInferenceFallback(__gotots_argument_4);
                }
                introducesError = true;
                return [introducesError, NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node), node), sym];
            }
            else {
                sym = symAtLocation;
            }
        }
        if (!(sym === undefined)) {
            if (!((Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunctionScopedVariable$constant__from_ast()) >>> 0 === 0) && !(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
                if (IsPartOfParameterDeclaration__from_ast(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) || IsJSDocParameterTag__from_ast(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                    const __gotots_results_3 = introducesError;
                    const __gotots_callee_2 = attachSymbolToLeftmostIdentifier;
                    const __gotots_argument_5 = leftmost;
                    const __gotots_argument_6 = node;
                    const __gotots_argument_7 = sym;
                    const __gotots_results_4 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
                    const __gotots_results_5 = void 0;
                    return [__gotots_results_3, __gotots_results_4, __gotots_results_5];
                }
            }
            if ((Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0 && !IsDeclarationName__from_ast(node) && !(Checker.IsSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, sym, enclosingDeclaration, meaning, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer())) {
                const __gotots_receiver_2: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_8 = node;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_2).ReportInferenceFallback(__gotots_argument_8);
                introducesError = true;
            }
            else {
                const __gotots_receiver_3: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_9 = sym;
                const __gotots_argument_10 = enclosingDeclaration;
                const __gotots_argument_11 = meaning;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_3).TrackSymbol(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
            }
            const __gotots_results_6 = introducesError;
            const __gotots_callee_3 = attachSymbolToLeftmostIdentifier;
            const __gotots_argument_12 = leftmost;
            const __gotots_argument_13 = node;
            const __gotots_argument_14 = sym;
            const __gotots_results_7 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
            const __gotots_results_8 = void 0;
            return [__gotots_results_6, __gotots_results_7, __gotots_results_8];
        }
        return [introducesError, NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node), node), void 0];
    };
    let tryVisitSimpleTypeNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    let tryVisitIndexedAccess: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        const __gotots_callee_4 = tryVisitSimpleTypeNode;
        const __gotots_argument_15 = IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType;
        let resultObjectType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
        if (resultObjectType === undefined) {
            return void 0;
        }
        return NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.UpdateIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.AsIndexedAccessTypeNode(node), resultObjectType, NodeVisitor__from_ast.VisitNode(visitor, IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType)), node);
    };
    let tryVisitKeyOf: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let to: tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast> | undefined = Node__from_ast.AsTypeOperatorNode(node);
        const __gotots_callee_5 = tryVisitSimpleTypeNode;
        const __gotots_argument_16 = TypeOperatorNode__from_ast.$storageOf(((to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Type;
        let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
        if (t === undefined) {
            return void 0;
        }
        return NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.UpdateTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, to, TypeOperatorNode__from_ast.$storageOf(((to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator, t), node);
    };
    let tryVisitTypeQuery: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        const __gotots_callee_6 = trackExistingEntityName;
        const __gotots_argument_17: TypeQueryNode__from_ast["ExprName"] = (Node__from_ast.AsTypeQueryNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName;
        const __gotots_argument_18 = void 0;
        const __gotots_results_9 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
        let introducesError = __gotots_results_9[0];
        let exprName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_9[1];
        if (!introducesError) {
            return NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.UpdateTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.AsTypeQueryNode(node), exprName, NodeVisitor__from_ast.VisitNodes(visitor, NodeWithTypeArgumentsBase__from_ast.$storageOf((Node__from_ast.AsTypeQueryNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments)), node);
        }
        let serializedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeTypeName(b, (Node__from_ast.AsTypeQueryNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName, true, NodeVisitor__from_ast.VisitNodes(visitor, NodeWithTypeArgumentsBase__from_ast.$storageOf((Node__from_ast.AsTypeQueryNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments));
        if (!(serializedName === undefined)) {
            return NodeBuilderImpl.$go$private$checker$setTextRange(b, serializedName, (Node__from_ast.AsTypeQueryNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName);
        }
        return void 0;
    };
    let tryVisitTypeReference: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (IsConstTypeReference__from_ast(node)) {
            return void 0;
        }
        const __gotots_store_1 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SymbolNodeLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SymbolNodeLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "symbolNodeLinks"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SymbolNodeLinks>).value).resolvedSymbol;
        if (s === undefined) {
            return void 0;
        }
        if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
            let declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, s);
            if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper === undefined) && !tsonicTypeScriptRuntime.sameLocation(TypeMapper.Map(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper, declaredType), declaredType)) {
                return void 0;
            }
        }
        const __gotots_callee_7 = trackExistingEntityName;
        const __gotots_argument_19 = TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
        const __gotots_argument_20 = void 0;
        const __gotots_results_10 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20);
        let introducesError = __gotots_results_10[0];
        let newName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_10[1];
        if (!introducesError) {
            let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(visitor, (void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments);
            return NodeBuilderImpl.$go$private$checker$setTextRange(b, NodeFactory__from_ast.UpdateTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.AsTypeReferenceNode(node), newName, typeArguments), node);
        }
        else {
            let serializedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeTypeName(b, TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, false, NodeVisitor__from_ast.VisitNodes(visitor, (void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments));
            if (!(serializedName === undefined)) {
                return NodeBuilderImpl.$go$private$checker$setTextRange(b, serializedName, TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName);
            }
            return void 0;
        }
    };
    tryVisitSimpleTypeNode = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let innerNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(node);
        switch (Node__from_ast.$storageOf(((innerNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindTypeReference$constant__from_ast(): {
                const __gotots_callee_8 = tryVisitTypeReference;
                const __gotots_argument_21 = innerNode;
                return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
                break;
            }
            case KindTypeQuery$constant__from_ast(): {
                const __gotots_callee_9 = tryVisitTypeQuery;
                const __gotots_argument_22 = innerNode;
                return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
                break;
            }
            case KindIndexedAccessType$constant__from_ast(): {
                const __gotots_callee_10 = tryVisitIndexedAccess;
                const __gotots_argument_23 = innerNode;
                return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
                break;
            }
            case KindTypeOperator$constant__from_ast(): {
                if (TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(innerNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindKeyOfKeyword$constant__from_ast()) {
                    const __gotots_callee_11 = tryVisitKeyOf;
                    const __gotots_argument_24 = innerNode;
                    return (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
                }
                break;
            }
        }
        return NodeVisitor__from_ast.VisitNode(visitor, node);
    };
    let visitExistingNodeTreeSymbolsWorker: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTypeExpression$constant__from_ast()) {
            return NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsJSDocTypeExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocAllType$constant__from_ast()) {
            return NodeFactory__from_ast.NewKeywordTypeNode(factory, KindAnyKeyword$constant__from_ast());
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocNullableType$constant__from_ast()) {
            let unionMembers = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsJSDocNullableType(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type), NodeFactory__from_ast.NewLiteralTypeNode(factory, NodeFactory__from_ast.NewKeywordExpression(factory, KindNullKeyword$constant__from_ast()))]);
            return NodeFactory__from_ast.NewUnionTypeNode(factory, NodeFactory__from_ast.NewNodeList(factory, unionMembers));
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocOptionalType$constant__from_ast()) {
            let unionMembers = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsJSDocOptionalType(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type), NodeFactory__from_ast.NewKeywordTypeNode(factory, KindUndefinedKeyword$constant__from_ast())]);
            return NodeFactory__from_ast.NewUnionTypeNode(factory, NodeFactory__from_ast.NewNodeList(factory, unionMembers));
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocNonNullableType$constant__from_ast()) {
            return NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsJSDocNonNullableType(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocVariadicType$constant__from_ast()) {
            return NodeFactory__from_ast.NewArrayTypeNode(factory, NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsJSDocVariadicType(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type));
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTypeLiteral$constant__from_ast()) {
            let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_0: JSDocTypeLiteral__from_ast["JSDocPropertyTags"] = (Node__from_ast.AsJSDocTypeLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocPropertyTags;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                if (!(Node__from_ast.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocPropertyTag$constant__from_ast()) && !(Node__from_ast.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocParameterTag$constant__from_ast())) {
                    continue;
                }
                let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(t);
                let targetName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsIdentifier__from_ast(n)) {
                    targetName = n;
                }
                else {
                    targetName = (Node__from_ast.AsQualifiedName(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right;
                }
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, targetName);
                let shouldBeOptional = (Node__from_ast.AsJSDocParameterOrPropertyTag(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsBracketed || (!(Node__from_ast.TypeExpression(t) === undefined) && Node__from_ast.$storageOf(((Node__from_ast.TypeExpression(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocOptionalType$constant__from_ast());
                let question: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (shouldBeOptional) {
                    question = NodeFactory__from_ast.NewToken(factory, KindQuestionToken$constant__from_ast());
                }
                let ty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, Node__from_ast.TypeExpression(t));
                members = members.append(void 0, [NodeFactory__from_ast.NewPropertySignatureDeclaration(factory, void 0, name, question, ty, void 0)]);
            }
            return NodeFactory__from_ast.NewTypeLiteralNode(factory, NodeFactory__from_ast.NewNodeList(factory, members));
        }
        if (IsTypeReferenceNode__from_ast(node) && IsIdentifier__from_ast(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) && Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text === "") {
            let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewKeywordTypeNode(factory, KindAnyKeyword$constant__from_ast());
            EmitContext__from_printer.SetOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, replacement, node);
            return replacement;
        }
        if (IsThisTypeNode__from_ast(node)) {
            return node;
        }
        if (IsTypeParameterDeclaration__from_ast(node)) {
            const __gotots_callee_12 = trackExistingEntityName;
            const __gotots_argument_25 = Node__from_ast.Name(node);
            const __gotots_argument_26 = void 0;
            const __gotots_results_11 = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
            let newName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_11[1];
            return NodeFactory__from_ast.UpdateTypeParameterDeclaration(factory, Node__from_ast.AsTypeParameterDeclaration(node), NodeVisitor__from_ast.VisitModifiers(visitor, Node__from_ast.Modifiers(node)), newName, NodeVisitor__from_ast.VisitNode(visitor, TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint), NodeVisitor__from_ast.VisitNode(visitor, TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Expression), NodeVisitor__from_ast.VisitNode(visitor, TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType));
        }
        if (IsIndexedAccessTypeNode__from_ast(node)) {
            const __gotots_callee_13 = tryVisitIndexedAccess;
            const __gotots_argument_27 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
            if (!(result === undefined)) {
                return result;
            }
            recoveryBoundary.$go$private$checker$markError(bound, void 0);
            return node;
        }
        if (IsTypeReferenceNode__from_ast(node)) {
            const __gotots_callee_14 = tryVisitTypeReference;
            const __gotots_argument_28 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
            if (!(result === undefined)) {
                return result;
            }
            recoveryBoundary.$go$private$checker$markError(bound, void 0);
            return node;
        }
        if (IsTypeQueryNode__from_ast(node)) {
            const __gotots_callee_15 = tryVisitTypeQuery;
            const __gotots_argument_29 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29);
            if (!(result === undefined)) {
                return result;
            }
            recoveryBoundary.$go$private$checker$markError(bound, void 0);
            return node;
        }
        if (IsTypeOperatorNode__from_ast(node)) {
            if (TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindUniqueKeyword$constant__from_ast() && Node__from_ast.$storageOf(((TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Type ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSymbolKeyword$constant__from_ast()) {
                let nonFakeEnclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$getEnclosingDeclarationIgnoringFakeScope(b);
                let sameScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return tsonicTypeScriptRuntime.sameLocation(a, nonFakeEnclosing);
                });
                if (sameScope === undefined) {
                    recoveryBoundary.$go$private$checker$markError(bound, void 0);
                    return node;
                }
            }
            else if (TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindKeyOfKeyword$constant__from_ast()) {
                const __gotots_callee_16 = tryVisitKeyOf;
                const __gotots_argument_30 = node;
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
                if (!(result === undefined)) {
                    return result;
                }
                recoveryBoundary.$go$private$checker$markError(bound, void 0);
                return node;
            }
        }
        if (IsLiteralImportTypeNode__from_ast(node)) {
            if (!((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined) && (Node__from_ast.AsImportAttributes((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Token === KindAssertKeyword$constant__from_ast()) {
                recoveryBoundary.$go$private$checker$markError(bound, void 0);
                return node;
            }
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, node, true);
            if (t === undefined) {
                recoveryBoundary.$go$private$checker$markError(bound, void 0);
                return node;
            }
            if (IsInJSFile__from_ast(node)) {
            }
            let originalSpec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal;
            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$rewriteModuleSpecifier(b, node, originalSpec);
            if (tsonicTypeScriptRuntime.sameLocation(originalSpec, specifier)) {
                specifier = NodeVisitor__from_ast.VisitNode(visitor, specifier);
            }
            let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument;
            if (!tsonicTypeScriptRuntime.sameLocation(specifier, originalSpec)) {
                arg = NodeFactory__from_ast.NewLiteralTypeNode(factory, specifier);
            }
            return NodeFactory__from_ast.UpdateImportTypeNode(factory, Node__from_ast.AsImportTypeNode(node), (Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf, arg, NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes), NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier), NodeVisitor__from_ast.VisitNodes(visitor, NodeWithTypeArgumentsBase__from_ast.$storageOf((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments));
        }
        if (!(Node__from_ast.Name(node) === undefined) && Node__from_ast.$storageOf(((Node__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindComputedPropertyName$constant__from_ast() && !Checker.$go$private$checker$hasLateBindableName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node)) {
            if (!HasDynamicName__from_ast(node)) {
                return NodeVisitor__from_ast.VisitEachChild(visitor, node);
            }
            let shouldRemoveDeclaration = !((!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags & InternalFlagsAllowUnresolvedNames$constant__from_nodebuilder()) === 0)) && IsEntityNameExpression__from_ast((Node__from_ast.AsComputedPropertyName(Node__from_ast.Name(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression) && (!((((Checker.$go$private$checker$checkComputedPropertyName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.Name(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsAny$constant()) >>> 0 === 0)));
            if (shouldRemoveDeclaration) {
                return void 0;
            }
        }
        if ((IsFunctionLike__from_ast(node) && Node__from_ast.Type(node) === undefined) || (IsPropertyDeclaration__from_ast(node) && Node__from_ast.Type(node) === undefined && Node__from_ast.Initializer(node) === undefined) || (IsPropertySignatureDeclaration__from_ast(node) && Node__from_ast.Type(node) === undefined && Node__from_ast.Initializer(node) === undefined) || (IsParameterDeclaration__from_ast(node) && Node__from_ast.Type(node) === undefined && Node__from_ast.Initializer(node) === undefined)) {
            let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(visitor, node);
            if (tsonicTypeScriptRuntime.sameLocation(visited, node)) {
                visited = NodeBuilderImpl.$go$private$checker$setTextRange(b, Node__from_ast.Clone(node, new GoInterfaceAdapter(factory)), node);
            }
            node = visited;
            let newType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewKeywordTypeNode(factory, KindAnyKeyword$constant__from_ast());
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindPropertyDeclaration$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdatePropertyDeclaration(factory, Node__from_ast.AsPropertyDeclaration(node), Node__from_ast.Modifiers(node), Node__from_ast.Name(node), Node__from_ast.PostfixToken(node), newType, void 0);
                    break;
                }
                case KindPropertySignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdatePropertySignatureDeclaration(factory, Node__from_ast.AsPropertySignatureDeclaration(node), Node__from_ast.Modifiers(node), Node__from_ast.Name(node), Node__from_ast.PostfixToken(node), newType, void 0);
                    break;
                }
                case KindParameter$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateParameterDeclaration(factory, Node__from_ast.AsParameterDeclaration(node), void 0, ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, Node__from_ast.Name(node), ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken, newType, void 0);
                    break;
                }
                case KindMethodSignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateMethodSignatureDeclaration(factory, Node__from_ast.AsMethodSignatureDeclaration(node), Node__from_ast.Modifiers(node), Node__from_ast.Name(node), (void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                        MethodSignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsMethodSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        MethodSignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsMethodSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        MethodSignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsMethodSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters, newType);
                    break;
                }
                case KindCallSignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateCallSignatureDeclaration(factory, Node__from_ast.AsCallSignatureDeclaration(node), FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsCallSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).TypeParameters, FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsCallSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters, newType);
                    break;
                }
                case KindJSDocSignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateJSDocSignature(factory, Node__from_ast.AsJSDocSignature(node), FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsJSDocSignature(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).TypeParameters, FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsJSDocSignature(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters, newType);
                    break;
                }
                case KindConstructSignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateConstructSignatureDeclaration(factory, Node__from_ast.AsConstructSignatureDeclaration(node), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        ConstructSignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsConstructSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        ConstructSignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsConstructSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters, newType);
                    break;
                }
                case KindIndexSignature$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateIndexSignatureDeclaration(factory, Node__from_ast.AsIndexSignatureDeclaration(node), Node__from_ast.Modifiers(node), FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsIndexSignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters, newType);
                    break;
                }
                case KindFunctionType$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateFunctionTypeNode(factory, Node__from_ast.AsFunctionTypeNode(node), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                            FunctionTypeNode__from_ast.$storageOf(((Node__from_ast.AsFunctionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                            FunctionTypeNode__from_ast.$storageOf(((Node__from_ast.AsFunctionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).Parameters, newType);
                    break;
                }
                case KindConstructorType$constant__from_ast(): {
                    return NodeFactory__from_ast.UpdateConstructorTypeNode(factory, Node__from_ast.AsConstructorTypeNode(node), Node__from_ast.Modifiers(node), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((Node__from_ast.AsConstructorTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((Node__from_ast.AsConstructorTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).Parameters, newType);
                    break;
                }
            }
        }
        if (IsComputedPropertyName__from_ast(node) && IsEntityNameExpression__from_ast((Node__from_ast.AsComputedPropertyName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            const __gotots_callee_17 = trackExistingEntityName;
            const __gotots_argument_31: ComputedPropertyName__from_ast["Expression"] = (Node__from_ast.AsComputedPropertyName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
            const __gotots_argument_32 = void 0;
            const __gotots_results_12 = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32);
            let introducesError = __gotots_results_12[0];
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_12[1];
            if (!introducesError) {
                return NodeFactory__from_ast.UpdateComputedPropertyName(factory, Node__from_ast.AsComputedPropertyName(node), result);
            }
            else {
                recoveryBoundary.$go$private$checker$markError(bound, void 0);
                return NodeVisitor__from_ast.VisitEachChild(visitor, node);
            }
        }
        if (IsTypePredicateNode__from_ast(node)) {
            let parameterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsIdentifier__from_ast((Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName)) {
                const __gotots_callee_18 = trackExistingEntityName;
                const __gotots_argument_33: TypePredicateNode__from_ast["ParameterName"] = (Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName;
                const __gotots_argument_34 = void 0;
                const __gotots_results_13 = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33, __gotots_argument_34);
                let introducesError = __gotots_results_13[0];
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_13[1];
                if (introducesError) {
                    recoveryBoundary.$go$private$checker$markError(bound, void 0);
                }
                parameterName = result;
            }
            else {
                parameterName = Node__from_ast.Clone((Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName, new GoInterfaceAdapter(factory));
            }
            return NodeFactory__from_ast.UpdateTypePredicateNode(factory, Node__from_ast.AsTypePredicateNode(node), NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssertsModifier), parameterName, NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type));
        }
        if (IsConditionalTypeNode__from_ast(node)) {
            let checkType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckType);
            let dispose: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$enterNewScope(b, node, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), Checker.$go$private$checker$getInferTypeParameters((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), void 0);
            let extendsType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType);
            let trueType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType);
            const __gotots_callee_19 = dispose;
            (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))();
            let falseType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, (Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType);
            return NodeFactory__from_ast.UpdateConditionalTypeNode(factory, Node__from_ast.AsConditionalTypeNode(node), checkType, extendsType, trueType, falseType);
        }
        if (IsTupleTypeNode__from_ast(node) || ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsMultilineObjectLiterals$constant__from_nodebuilder()) >>> 0 === 0 && IsTypeLiteralNode__from_ast(node)) || IsMappedTypeNode__from_ast(node)) {
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(visitor, node);
            if (tsonicTypeScriptRuntime.sameLocation(res, node)) {
                res = Node__from_ast.Clone(res, new GoInterfaceAdapter(factory));
                res = NodeBuilderImpl.$go$private$checker$setTextRange(b, res, node);
            }
            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, res, EFSingleLine$constant__from_printer());
            return res;
        }
        if (IsStringLiteralLike__from_ast(node)) {
            let c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(node, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
            if (IsStringLiteral__from_ast(node) && !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder()) >>> 0 === 0) && ((void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                    StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags & TokenFlagsSingleQuote$constant__from_ast()) === 0) {
                const __gotots_store_2 = (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                    (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                        StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(c) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase));
                __gotots_store_2.TokenFlags = __gotots_store_2.TokenFlags ^ 65536;
            }
            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, c, EFNoAsciiEscaping$constant__from_printer());
            return c;
        }
        return NodeVisitor__from_ast.VisitEachChild(visitor, node);
    };
    let nonLocalNode = true;
    visitor = NewNodeVisitor__from_ast((node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if ((bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError) {
            return node;
        }
        let recover_ = recoveryBoundary.$go$private$checker$startRecoveryScope(bound);
        let introducesNewScope = IsFunctionLike__from_ast(node) || IsMappedTypeNode__from_ast(node);
        let exit: (() => void) | undefined;
        if (introducesNewScope) {
            let params = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
            let typeParams = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
            if (IsFunctionLike__from_ast(node)) {
                let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node);
                params = Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters;
                typeParams = Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters;
            }
            else if (IsConditionalTypeNode__from_ast(node)) {
                typeParams = Checker.$go$private$checker$getInferTypeParameters((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node);
            }
            else if (IsMappedTypeNode__from_ast(node)) {
                typeParams = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([Checker.$go$private$checker$getDeclaredTypeOfTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getSymbolOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (Node__from_ast.AsMappedTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter))]);
            }
            exit = NodeBuilderImpl.$go$private$checker$enterNewScope(b, node, params, typeParams, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), void 0);
        }
        const __gotots_callee_20 = visitExistingNodeTreeSymbolsWorker;
        const __gotots_argument_35 = node;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
        if (!(exit === undefined)) {
            const __gotots_callee_21 = exit;
            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        if (tsonicTypeScriptRuntime.sameLocation(result, node)
            && !NodeIsSynthesized__from_ast(node)) {
            result = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node);
        }
        result = NodeBuilderImpl.$go$private$checker$setTextRange(b, result, node);
        if ((bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError) {
            if (IsTypeNode__from_ast(node) && !IsTypePredicateNode__from_ast(node)) {
                recoveryBoundary.$go$private$checker$endRecoveryScope(bound, originalRecoveryScopeState.$copy(recover_));
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, node, false);
                return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
            }
            return NodeBuilderImpl.$go$private$checker$setTextRange(b, Node__from_ast.Clone(node, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f)), node);
        }
        return result;
    }, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, new NodeVisitorHooks__from_ast((node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, v: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let oldNonLocalNode = nonLocalNode;
        nonLocalNode = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile === undefined || !tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast(EmitContext__from_printer.MostOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, node)));
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(v, node);
        nonLocalNode = oldNonLocalNode;
        return res;
    }, void 0, (nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, v: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        let res: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(v, nodes);
        if (nonLocalNode && !(res === undefined)) {
            if (tsonicTypeScriptRuntime.sameLocation(res, nodes)) {
                res = NodeList__from_ast.Clone(nodes, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
            }
            NodeList__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
        }
        return res;
    }, void 0, void 0, void 0, void 0, void 0, void 0));
    return visitor;
}
