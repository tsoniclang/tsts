import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ElementAccessExpression as ElementAccessExpression__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { FindAncestor as FindAncestor__from_ast, GetDeclarationContainer as GetDeclarationContainer__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsAliasSymbolDeclaration as IsAliasSymbolDeclaration__from_ast, IsDeclaration as IsDeclaration__from_ast, IsNonLocalAlias as IsNonLocalAlias__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SymbolFlagsExportHasLocal$constant as SymbolFlagsExportHasLocal$constant__from_ast, SymbolFlagsExportValue$constant as SymbolFlagsExportValue$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, SymbolFlagsValueModule$constant as SymbolFlagsValueModule$constant__from_ast, SymbolFlagsVariable$constant as SymbolFlagsVariable$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindLast$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindLast.js";
import { $goInterfaceAdapter$PointerTo_Named_binder$referenceResolver as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetElementAccessExpressionName$PointerTo_Named_ast$ElementAccessExpression_to_string, $goInterfaceMethod$GetReferencedExportContainer$PointerTo_Named_ast$Node_bool_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedImportDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedMemberValueDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedValueDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedValueDeclarations$PointerTo_Named_ast$Node_to_SliceOf_PointerTo_Named_ast$Node } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { NameResolver } from "./nameresolver.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface ReferenceResolver extends GoInterfaceValue {
    GetElementAccessExpressionName($argument0: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined): gostring;
    GetReferencedExportContainer($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    GetReferencedImportDeclaration($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    GetReferencedMemberValueDeclaration($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    GetReferencedValueDeclaration($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    GetReferencedValueDeclarations($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
}
export const ReferenceResolver$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetElementAccessExpressionName$PointerTo_Named_ast$ElementAccessExpression_to_string, $goInterfaceMethod$GetReferencedExportContainer$PointerTo_Named_ast$Node_bool_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedImportDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedMemberValueDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedValueDeclaration$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Node, $goInterfaceMethod$GetReferencedValueDeclarations$PointerTo_Named_ast$Node_to_SliceOf_PointerTo_Named_ast$Node]);
export function ReferenceResolver$is(value: GoInterfaceValue | undefined): value is ReferenceResolver {
    return value !== undefined && value.$go$implements(ReferenceResolver$contract);
}
export class ReferenceResolverHooks {
    declare private readonly $goType: void;
    public constructor(public ResolveName: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: gostring, $2: SymbolFlags__from_ast, $3: {
        value: Message__from_diagnostics;
    } | undefined, $4: bool, $5: bool) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetResolvedSymbol: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetMergedSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetParentOfSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetSymbolOfDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetTypeOnlyAliasDeclaration: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: SymbolFlags__from_ast) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, public GetExportSymbolOfValueSymbolIfExported: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public GetElementAccessExpressionName: (($0: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined) => [
        gostring,
        bool
    ]) | undefined) {
    }
    static $zero(): ReferenceResolverHooks {
        return new ReferenceResolverHooks(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
    }
    static $copy($source: ReferenceResolverHooks): ReferenceResolverHooks {
        return new ReferenceResolverHooks($source.ResolveName, $source.GetResolvedSymbol, $source.GetMergedSymbol, $source.GetParentOfSymbol, $source.GetSymbolOfDeclaration, $source.GetTypeOnlyAliasDeclaration, $source.GetExportSymbolOfValueSymbolIfExported, $source.GetElementAccessExpressionName);
    }
    declare private readonly then?: never;
}
export class referenceResolver {
    declare private readonly $goType: void;
    public constructor(public resolver: {
        value: NameResolver;
    } | undefined, public options: {
        value: CompilerOptions__from_core;
    } | undefined, public hooks: ReferenceResolverHooks) {
    }
    static $copy($source: referenceResolver): referenceResolver {
        return new referenceResolver($source.resolver, $source.options, ReferenceResolverHooks.$copy($source.hooks));
    }
    declare private readonly then?: never;
    static GetElementAccessExpressionName(r: {
        value: referenceResolver;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined): gostring {
        if (!(expression === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetElementAccessExpressionName === undefined)) {
                {
                    const __gotots_callee_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetElementAccessExpressionName;
                    const __gotots_argument_0 = expression;
                    const __gotots_results_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                    let name = __gotots_results_0[0];
                    let ok = __gotots_results_0[1];
                    if (ok) {
                        return name;
                    }
                }
            }
        }
        return "";
    }
    static GetReferencedExportContainer(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, prefixLocals: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let startInDeclarationContainer = !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEnumDeclaration$constant__from_ast()) &&
            tsonicTypeScriptRuntime.sameLocation(node, Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getReferencedValueSymbol(r, node, startInDeclarationContainer);
            if (!(__go_symbol === undefined)) {
                if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsExportValue$constant__from_ast()) >>> 0 === 0)) {
                    let exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getMergedSymbol(r, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol);
                    if (!prefixLocals && !((Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsExportHasLocal$constant__from_ast()) >>> 0 === 0) && (Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0) {
                        return void 0;
                    }
                    __go_symbol = exportSymbol;
                }
                let parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getParentOfSymbol(r, __go_symbol);
                if (!(parentSymbol === undefined)) {
                    if (!((Symbol__from_ast.$storageOf(((parentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsValueModule$constant__from_ast()) >>> 0 === 0) && !(Symbol__from_ast.$storageOf(((parentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((parentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
                        let symbolFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(Symbol__from_ast.$storageOf(((parentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                        let referenceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
                        let symbolIsUmdExport = !tsonicTypeScriptRuntime.sameLocation(symbolFile, referenceFile);
                        if (symbolIsUmdExport) {
                            return void 0;
                        }
                        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((symbolFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                            return NodeDefault__from_ast.$fromStorage($go$storage);
                        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                            return NodeDefault__from_ast.$storageOf($go$value);
                        }));
                    }
                    let isMatchingContainer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEnumDeclaration$constant__from_ast()) &&
                            tsonicTypeScriptRuntime.sameLocation(referenceResolver.$go$private$binder$getSymbolOfDeclaration(r, n), parentSymbol);
                    };
                    return FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, isMatchingContainer);
                }
            }
        }
        return void 0;
    }
    static GetReferencedImportDeclaration(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getReferencedValueSymbol(r, node, false);
            if (!(__go_symbol === undefined)) {
                if (IsNonLocalAlias__from_ast(__go_symbol, SymbolFlagsValue$constant__from_ast()) && !referenceResolver.$go$private$binder$isTypeOnlyAliasDeclaration(r, __go_symbol)) {
                    return referenceResolver.$go$private$binder$getDeclarationOfAliasSymbol(r, __go_symbol);
                }
            }
        }
        return void 0;
    }
    static GetReferencedMemberValueDeclaration(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getResolvedSymbol(r, node);
        if (s === undefined && !(Node__from_ast.Symbol(node) === undefined)) {
            s = referenceResolver.$go$private$binder$getMergedSymbol(r, Node__from_ast.Symbol(node));
        }
        if (s === undefined) {
            return void 0;
        }
        return Symbol__from_ast.$storageOf(((referenceResolver.$go$private$binder$getExportSymbolOfValueSymbolIfExported(r, s) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    }
    static GetReferencedValueDeclaration(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getReferencedValueSymbol(r, node, false);
            if (!(__go_symbol === undefined)) {
                return Symbol__from_ast.$storageOf(((referenceResolver.$go$private$binder$getExportSymbolOfValueSymbolIfExported(r, __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            }
        }
        return void 0;
    }
    static GetReferencedValueDeclarations(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getReferencedValueSymbol(r, node, false);
            if (!(__go_symbol === undefined)) {
                __go_symbol = referenceResolver.$go$private$binder$getExportSymbolOfValueSymbolIfExported(r, __go_symbol);
                const __gotots_range_0 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindVariableDeclaration$constant__from_ast():
                        case KindParameter$constant__from_ast():
                        case KindBindingElement$constant__from_ast():
                        case KindPropertyDeclaration$constant__from_ast():
                        case KindPropertyAssignment$constant__from_ast():
                        case KindShorthandPropertyAssignment$constant__from_ast():
                        case KindEnumMember$constant__from_ast():
                        case KindObjectLiteralExpression$constant__from_ast():
                        case KindFunctionDeclaration$constant__from_ast():
                        case KindFunctionExpression$constant__from_ast():
                        case KindArrowFunction$constant__from_ast():
                        case KindClassDeclaration$constant__from_ast():
                        case KindClassExpression$constant__from_ast():
                        case KindEnumDeclaration$constant__from_ast():
                        case KindMethodDeclaration$constant__from_ast():
                        case KindGetAccessor$constant__from_ast():
                        case KindSetAccessor$constant__from_ast():
                        case KindModuleDeclaration$constant__from_ast(): {
                            declarations = declarations.append(void 0, [declaration]);
                            break;
                        }
                    }
                }
            }
        }
        return declarations;
    }
    static $go$private$binder$getDeclarationOfAliasSymbol(r: {
        value: referenceResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return FindLast$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsAliasSymbolDeclaration__from_ast);
    }
    static $go$private$binder$getExportSymbolOfValueSymbolIfExported(r: {
        value: referenceResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!(__go_symbol === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetExportSymbolOfValueSymbolIfExported === undefined)) {
                const __gotots_callee_7 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetExportSymbolOfValueSymbolIfExported;
                const __gotots_argument_13 = __go_symbol;
                return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
            }
            if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsExportValue$constant__from_ast()) >>> 0 === 0) && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol === undefined)) {
                __go_symbol = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol;
            }
            return referenceResolver.$go$private$binder$getMergedSymbol(r, __go_symbol);
        }
        return void 0;
    }
    static $go$private$binder$getMergedSymbol(r: {
        value: referenceResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!(__go_symbol === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetMergedSymbol === undefined)) {
                const __gotots_callee_2 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetMergedSymbol;
                const __gotots_argument_7 = __go_symbol;
                return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
            }
            return __go_symbol;
        }
        return void 0;
    }
    static $go$private$binder$getParentOfSymbol(r: {
        value: referenceResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!(__go_symbol === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetParentOfSymbol === undefined)) {
                const __gotots_callee_3 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetParentOfSymbol;
                const __gotots_argument_8 = __go_symbol;
                return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
            }
            return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent;
        }
        return void 0;
    }
    static $go$private$binder$getReferencedValueSymbol(r: {
        value: referenceResolver;
    } | undefined, reference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, startInDeclarationContainer: bool): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        let resolvedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = referenceResolver.$go$private$binder$getResolvedSymbol(r, reference);
        if (!(resolvedSymbol === undefined)) {
            return resolvedSymbol;
        }
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = reference;
        if (startInDeclarationContainer && !(Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsDeclaration__from_ast(Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), reference)) {
            location = GetDeclarationContainer__from_ast(Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.ResolveName === undefined)) {
            const __gotots_callee_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.ResolveName;
            const __gotots_argument_1 = location;
            const __gotots_argument_2 = Node__from_ast.Text(reference);
            const __gotots_argument_3 = 3257279;
            const __gotots_argument_4 = void 0;
            const __gotots_argument_5 = false;
            const __gotots_argument_6 = false;
            return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolver === undefined) {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolver =
                { value: new NameResolver((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options, void 0, void 0, new SymbolTable__from_ast(GoMap.nil()), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0) };
        }
        return NameResolver.Resolve((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolver, location, Node__from_ast.Text(reference), 3257279, void 0, false, false);
    }
    static $go$private$binder$getResolvedSymbol(r: {
        value: referenceResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!(node === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetResolvedSymbol === undefined)) {
                const __gotots_callee_6 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetResolvedSymbol;
                const __gotots_argument_12 = node;
                return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
            }
        }
        return void 0;
    }
    static $go$private$binder$getSymbolOfDeclaration(r: {
        value: referenceResolver;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!(declaration === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetSymbolOfDeclaration === undefined)) {
                const __gotots_callee_4 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetSymbolOfDeclaration;
                const __gotots_argument_9 = declaration;
                return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
            }
            return Node__from_ast.Symbol(declaration);
        }
        return void 0;
    }
    static $go$private$binder$isTypeOnlyAliasDeclaration(r: {
        value: referenceResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
        if (!(__go_symbol === undefined)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetTypeOnlyAliasDeclaration === undefined)) {
                const __gotots_callee_5 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hooks.GetTypeOnlyAliasDeclaration;
                const __gotots_argument_10 = __go_symbol;
                const __gotots_argument_11 = SymbolFlagsValue$constant__from_ast();
                return !((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11) === undefined);
            }
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = referenceResolver.$go$private$binder$getDeclarationOfAliasSymbol(r, __go_symbol);
            for (; !(node === undefined);) {
                switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindImportEqualsDeclaration$constant__from_ast():
                    case KindExportDeclaration$constant__from_ast(): {
                        return Node__from_ast.IsTypeOnly(node);
                        break;
                    }
                    case KindImportClause$constant__from_ast():
                    case KindImportSpecifier$constant__from_ast():
                    case KindExportSpecifier$constant__from_ast(): {
                        if (Node__from_ast.IsTypeOnly(node)) {
                            return true;
                        }
                        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        continue;
                        break;
                    }
                    case KindNamedImports$constant__from_ast():
                    case KindNamedExports$constant__from_ast(): {
                        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        continue;
                        break;
                    }
                }
                break;
            }
        }
        return false;
    }
}
export function NewReferenceResolver(options: {
    value: CompilerOptions__from_core;
} | undefined, hooks: ReferenceResolverHooks): ReferenceResolver | undefined {
    return new GoInterfaceAdapter({ value: new referenceResolver(void 0, options, ReferenceResolverHooks.$copy(hooks)) });
}
