import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeId as NodeId__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { EmitTextWriter as EmitTextWriter__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ReferenceEntry } from "./findallreferences.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { CanHaveModifiers as CanHaveModifiers__from_ast, FindAncestor as FindAncestor__from_ast, GetAssignedName as GetAssignedName__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetCombinedNodeFlags as GetCombinedNodeFlags__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetNodeId as GetNodeId__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsArgumentExpressionOfElementAccess as IsArgumentExpressionOfElementAccess__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCallOrNewExpressionTarget as IsCallOrNewExpressionTarget__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsDecoratorTarget as IsDecoratorTarget__from_ast, IsDecorator as IsDecorator__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsJsxOpeningElement as IsJsxOpeningElement__from_ast, IsJsxOpeningLikeElementTagName as IsJsxOpeningLikeElementTagName__from_ast, IsJsxSelfClosingElement as IsJsxSelfClosingElement__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodSignatureDeclaration as IsMethodSignatureDeclaration__from_ast, IsModuleBlock as IsModuleBlock__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsNewExpression as IsNewExpression__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsRightSideOfPropertyAccess as IsRightSideOfPropertyAccess__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStringOrNumericLiteralLike as IsStringOrNumericLiteralLike__from_ast, IsTaggedTemplateExpression as IsTaggedTemplateExpression__from_ast, IsTaggedTemplateTag as IsTaggedTemplateTag__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierList as ModifierList__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeIsPresent as NodeIsPresent__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, Symbol as Symbol__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { Position as Position__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetSingleLineStringWriter as GetSingleLineStringWriter__from_printer, NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { SortFunc$SliceOf_int$int } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Node, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_context$Context as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { entryKindNode$constant } from "./findallreferences.js";
import { LanguageService } from "./languageservice.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export function isNamedExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    if (!IsFunctionExpression__from_ast(node) && !IsClassExpression__from_ast(node)) {
        return false;
    }
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
    return !(name === undefined) && IsIdentifier__from_ast(name);
}
export function isVariableLike(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    return IsPropertyDeclaration__from_ast(node) || IsVariableDeclaration__from_ast(node);
}
export function isAssignedExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    if (!(IsFunctionExpression__from_ast(node) || IsArrowFunction__from_ast(node) || IsClassExpression__from_ast(node))) {
        return false;
    }
    if (!(Node__from_ast.Name(node) === undefined)) {
        return false;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (!isVariableLike(parent)) {
        return false;
    }
    if (!tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(parent), node)) {
        return false;
    }
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(parent);
    if (!IsIdentifier__from_ast(name)) {
        return false;
    }
    return !(((GetCombinedNodeFlags__from_ast(parent) & NodeFlagsConst$constant__from_ast()) >>> 0) === 0) || IsPropertyDeclaration__from_ast(parent);
}
export function isPossibleCallHierarchyDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    return IsSourceFile__from_ast(node) || IsModuleDeclaration__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsFunctionExpression__from_ast(node) || IsClassDeclaration__from_ast(node) || IsClassExpression__from_ast(node) || IsClassStaticBlockDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node) || IsSetAccessorDeclaration__from_ast(node);
}
export function isValidCallHierarchyDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    if (IsSourceFile__from_ast(node)) {
        return true;
    }
    if (IsModuleDeclaration__from_ast(node)) {
        return IsIdentifier__from_ast(Node__from_ast.Name(node));
    }
    return IsFunctionDeclaration__from_ast(node) || IsClassDeclaration__from_ast(node) || IsClassStaticBlockDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node) || IsSetAccessorDeclaration__from_ast(node) || isNamedExpression(node) || isAssignedExpression(node);
}
export function getCallHierarchyDeclarationReferenceNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    if (IsSourceFile__from_ast(node)) {
        return node;
    }
    {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (!(name === undefined)) {
            return name;
        }
    }
    if (isAssignedExpression(node)) {
        return Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    {
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(node);
        if (!(modifiers === undefined)) {
            const __gotots_range_1 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let mod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                if (Node__from_ast.$storageOf(((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()) {
                    return mod;
                }
            }
        }
    }
    return void 0;
}
export function getSymbolOfCallHierarchyDeclaration(c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (IsClassStaticBlockDeclaration__from_ast(node)) {
        return void 0;
    }
    let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getCallHierarchyDeclarationReferenceNode(node);
    if (location === undefined) {
        return void 0;
    }
    return Checker__from_checker.GetSymbolAtLocation(c, location);
}
export function getCallHierarchyItemName(program: {
    value: Program__from_compiler;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
    gostring,
    int,
    int
] {
    let text: gostring = "";
    let pos: int = 0;
    let end: int = 0;
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                if (IsSourceFile__from_ast(node)) {
                    let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(node);
                    const __gotots_results_1: [
                        gostring,
                        int,
                        int
                    ] = [SourceFile__from_ast.FileName(sourceFile__shadow_1), 0, 0];
                    text = __gotots_results_1[0];
                    pos = __gotots_results_1[1];
                    end = __gotots_results_1[2];
                    break __gotots_return_block_0;
                }
                if ((IsFunctionDeclaration__from_ast(node) || IsClassDeclaration__from_ast(node)) && Node__from_ast.Name(node) === undefined) {
                    {
                        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(node);
                        if (!(modifiers === undefined)) {
                            const __gotots_range_0 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
                            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                                let mod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                                if (Node__from_ast.$storageOf(((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()) {
                                    let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
                                    let start = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile__shadow_1), Node__from_ast.Pos(mod));
                                    const __gotots_results_2: [
                                        gostring,
                                        int,
                                        int
                                    ] = ["default", start, Node__from_ast.End(mod)];
                                    text = __gotots_results_2[0];
                                    pos = __gotots_results_2[1];
                                    end = __gotots_results_2[2];
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                    }
                }
                if (IsClassStaticBlockDeclaration__from_ast(node)) {
                    let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
                    let pos__shadow_1 = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile__shadow_1), moveRangePastModifiers(node).Pos());
                    let end__shadow_1 = pos__shadow_1 + 6;
                    const __gotots_results_3 = Program__from_compiler.GetTypeCheckerForFile(program, GoProviderInterfaceBridge.$from(context__from_gostdlib.Background()), sourceFile__shadow_1);
                    let c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_3[0];
                    let done: (() => void) | undefined = __gotots_results_3[1];
                    const __gotots_callee_0: (() => void) | undefined = done;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    let prefix = "";
                    if (!(__go_symbol === undefined)) {
                        prefix = Checker__from_checker.SymbolToString(c, __go_symbol) + " ";
                    }
                    const __gotots_results_4: [
                        gostring,
                        int,
                        int
                    ] = [prefix + "static {}", pos__shadow_1, end__shadow_1];
                    text = __gotots_results_4[0];
                    pos = __gotots_results_4[1];
                    end = __gotots_results_4[2];
                    break __gotots_return_block_0;
                }
                let declName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (isAssignedExpression(node)) {
                    declName = Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                }
                else {
                    declName = GetNameOfDeclaration__from_ast(node);
                }
                if (declName === undefined || !NodeIsPresent__from_ast(declName)) {
                    let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
                    __gotots_control_target_0: {
                        if (IsFunctionDeclaration__from_ast(node) || IsFunctionExpression__from_ast(node)) {
                            let kwPos = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile__shadow_1), moveRangePastModifiers(node).Pos());
                            const __gotots_results_5: [
                                gostring,
                                int,
                                int
                            ] = ["(anonymous)", kwPos, kwPos + 8];
                            text = __gotots_results_5[0];
                            pos = __gotots_results_5[1];
                            end = __gotots_results_5[2];
                            break __gotots_return_block_0;
                        }
                        else if (IsClassDeclaration__from_ast(node) || IsClassExpression__from_ast(node)) {
                            let kwPos = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile__shadow_1), moveRangePastModifiers(node).Pos());
                            const __gotots_results_6: [
                                gostring,
                                int,
                                int
                            ] = ["(anonymous)", kwPos, kwPos + 5];
                            text = __gotots_results_6[0];
                            pos = __gotots_results_6[1];
                            end = __gotots_results_6[2];
                            break __gotots_return_block_0;
                        }
                    }
                    Assert__from_debug(!(declName === undefined), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Expected call hierarchy item to have a name")]));
                }
                text = getTextOfCallHierarchyName(program, node, declName, node);
                let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
                let namePos = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(declName));
                const __gotots_results_7: [
                    gostring,
                    int,
                    int
                ] = [text, namePos, Node__from_ast.End(declName)];
                text = __gotots_results_7[0];
                pos = __gotots_results_7[1];
                end = __gotots_results_7[2];
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return [text, pos, end];
}
export function getTextOfCallHierarchyName(program: {
    value: Program__from_compiler;
} | undefined, sourceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, printNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: gostring = "";
    try {
        try {
            __gotots_return_block_0: {
                if (IsIdentifier__from_ast(name) || IsStringOrNumericLiteralLike__from_ast(name)) {
                    __gotots_return_0 = Node__from_ast.Text(name);
                    break __gotots_return_block_0;
                }
                if (IsComputedPropertyName__from_ast(name)) {
                    let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(name);
                    if (IsStringOrNumericLiteralLike__from_ast(expr)) {
                        __gotots_return_0 = Node__from_ast.Text(expr);
                        break __gotots_return_block_0;
                    }
                }
                const __gotots_results_2 = Program__from_compiler.GetTypeCheckerForFile(program, GoProviderInterfaceBridge.$from(context__from_gostdlib.Background()), GetSourceFileOfNode__from_ast(sourceNode));
                let c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_2[0];
                let done: (() => void) | undefined = __gotots_results_2[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                };
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, name);
                if (!(__go_symbol === undefined)) {
                    let text = Checker__from_checker.SymbolToString(c, __go_symbol);
                    if (text !== "") {
                        __gotots_return_0 = text;
                        break __gotots_return_block_0;
                    }
                }
                let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(sourceNode);
                const __gotots_results_3 = GetSingleLineStringWriter__from_printer();
                let writer: EmitTextWriter__from_printer | undefined = __gotots_results_3[0];
                let putWriter: (() => void) | undefined = __gotots_results_3[1];
                const __gotots_callee_1: (() => void) | undefined = putWriter;
                const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_3 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                };
                let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(true, 0, false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), void 0);
                Printer__from_printer.Write(p, printNode, sourceFile, writer, void 0);
                const __gotots_receiver_0 = writer;
                __gotots_return_0 = goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_0).String();
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_2) {
            if (!(__gotots_caught_2 instanceof GoPanic)) {
                throw __gotots_caught_2;
            }
            __gotots_panic_0 = __gotots_caught_2;
        }
    }
    finally {
        if (__gotots_deferred_1 !== undefined) {
            const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_1(__gotots_recovery_1);
                if (__gotots_recovery_1.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
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
export function getCallHierarchyItemContainerName(program: {
    value: Program__from_compiler;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (isAssignedExpression(node)) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (IsPropertyDeclaration__from_ast(parent) && IsClassLike__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            if (IsClassExpression__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                {
                    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetAssignedName__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(assignedName === undefined)) {
                        return getTextOfCallHierarchyName(program, node, assignedName, assignedName);
                    }
                }
            }
            else {
                {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(name === undefined)) {
                        return getTextOfCallHierarchyName(program, node, name, name);
                    }
                }
            }
        }
        if (!(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsModuleBlock__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            let modParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (IsModuleDeclaration__from_ast(modParent)) {
                {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(modParent);
                    if (!(name === undefined) && IsIdentifier__from_ast(name)) {
                        return Node__from_ast.Text(name);
                    }
                }
            }
        }
        return "";
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast(): {
            if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast()) {
                {
                    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetAssignedName__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(assignedName === undefined)) {
                        return getTextOfCallHierarchyName(program, node, assignedName, assignedName);
                    }
                }
            }
            {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if (!(name === undefined)) {
                    return getTextOfCallHierarchyName(program, node, name, name);
                }
            }
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast(): {
            if (IsModuleBlock__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                if (IsModuleDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    {
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        if (!(name === undefined) && IsIdentifier__from_ast(name)) {
                            return Node__from_ast.Text(name);
                        }
                    }
                }
            }
            break;
        }
    }
    return "";
}
export function moveRangePastModifiers(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    {
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(node);
        if (!(modifiers === undefined) && (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
            ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length > 0) {
            let lastMod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.get((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length - 1);
            return NewTextRange__from_core(Node__from_ast.End(lastMod), Node__from_ast.End(node));
        }
    }
    return NewTextRange__from_core(Node__from_ast.Pos(node), Node__from_ast.End(node));
}
export function findImplementation(c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    if (!IsFunctionLikeDeclaration__from_ast(node)) {
        return node;
    }
    if (!(Node__from_ast.Body(node) === undefined)) {
        return node;
    }
    if (IsConstructorDeclaration__from_ast(node)) {
        return GetFirstConstructorWithBody__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    if (IsFunctionDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node)) {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getSymbolOfCallHierarchyDeclaration(c, node);
        if (!(__go_symbol === undefined) && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
            if (IsFunctionLikeDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && !(Node__from_ast.Body(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) === undefined)) {
                return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            }
        }
        return void 0;
    }
    return node;
}
export function findAllInitialDeclarations(c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsClassStaticBlockDeclaration__from_ast(node)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getSymbolOfCallHierarchyDeclaration(c, node);
    if (__go_symbol === undefined || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.isNil()) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    type declKey$Storage = {
        file: gostring;
        pos: int;
    };
    class declKey {
        declare private readonly $goType: void;
        public constructor(private readonly $storage: declKey$Storage) {
        }
        public static $storageOf($source: declKey): declKey$Storage {
            return $source.$storage;
        }
        public static $fromStorage($source: declKey$Storage): declKey {
            return new declKey($source);
        }
        public get file(): gostring {
            return this.$storage.file;
        }
        public set file($value: gostring) {
            this.$storage.file = $value;
        }
        public get pos(): int {
            return this.$storage.pos;
        }
        public set pos($value: int) {
            this.$storage.pos = $value;
        }
        static $zero(): declKey {
            return new declKey({
                file: "",
                pos: 0
            });
        }
        declare private readonly then?: never;
    }
    let indices = RuntimeSlice.make<int>(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length, null, 0);
    const __gotots_range_9 = indices;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_9 = __gotots_range_index_9;
        let i = __gotots_range_value_9;
        indices.set(i, i);
    }
    const __gotots_slice_build_0 = goSliceAllocate<declKey$Storage>(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length, null);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, declKey.$storageOf(declKey.$zero()));
    }
    let keys = __gotots_slice_build_0;
    const __gotots_range_10 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
        const __gotots_range_value_10 = __gotots_range_index_10;
        const __gotots_range_value_11 = __gotots_range_10.get(__gotots_range_index_10);
        let i = __gotots_range_value_10;
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
        keys.set(i, (void declKey.$storageOf, (void declKey.$fromStorage,
            {
                file: SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(decl)),
                pos: Node__from_ast.Pos(decl)
            })));
    }
    SortFunc$SliceOf_int$int(indices, (a: int, b: int): int => {
        if ((void declKey.$storageOf, (void declKey.$fromStorage,
            keys.get(a))).file !== (void declKey.$storageOf, (void declKey.$fromStorage,
            keys.get(b))).file) {
            return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare((void declKey.$storageOf, (void declKey.$fromStorage,
                keys.get(a))).file, (void declKey.$storageOf, (void declKey.$fromStorage,
                keys.get(b))).file)));
        }
        return (void declKey.$storageOf, (void declKey.$fromStorage,
            keys.get(a))).pos - (void declKey.$storageOf, (void declKey.$fromStorage,
            keys.get(b))).pos;
    });
    let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let lastDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    const __gotots_range_11 = indices;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
        const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_11);
        let i = __gotots_range_value_12;
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(i);
        if (isValidCallHierarchyDeclaration(decl)) {
            if (lastDecl === undefined || !tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((lastDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.End(lastDecl) !== Node__from_ast.Pos(decl)) {
                declarations = declarations.append(void 0, [decl]);
            }
            lastDecl = decl;
        }
    }
    return declarations;
}
export function findImplementationOrAllInitialDeclarations(c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoInterface | undefined {
    if (IsClassStaticBlockDeclaration__from_ast(node)) {
        return new GoInterfaceAdapter(node);
    }
    if (IsFunctionLikeDeclaration__from_ast(node)) {
        {
            let impl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findImplementation(c, node);
            if (!(impl === undefined)) {
                return new GoInterfaceAdapter(impl);
            }
        }
        {
            let decls = findAllInitialDeclarations(c, node);
            if (!decls.isNil()) {
                return new $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Node(decls);
            }
        }
        return new GoInterfaceAdapter(node);
    }
    {
        let decls = findAllInitialDeclarations(c, node);
        if (!decls.isNil()) {
            return new $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Node(decls);
        }
    }
    return new GoInterfaceAdapter(node);
}
export function resolveCallHierarchyDeclaration(program: {
    value: Program__from_compiler;
} | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoInterface | undefined {
    let result: GoInterface | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_0 = Program__from_compiler.GetTypeChecker(program, GoProviderInterfaceBridge.$from(context__from_gostdlib.Background()));
                let c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_0[0];
                let done: (() => void) | undefined = __gotots_results_0[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let followingSymbol = false;
                for (; !(location === undefined);) {
                    if (isValidCallHierarchyDeclaration(location)) {
                        result = findImplementationOrAllInitialDeclarations(c, location);
                        break __gotots_return_block_0;
                    }
                    if (isPossibleCallHierarchyDeclaration(location)) {
                        let ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(location, isValidCallHierarchyDeclaration);
                        if (!(ancestor === undefined)) {
                            result = findImplementationOrAllInitialDeclarations(c, ancestor);
                            break __gotots_return_block_0;
                        }
                    }
                    if (IsDeclarationName__from_ast(location)) {
                        if (isValidCallHierarchyDeclaration(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            result = findImplementationOrAllInitialDeclarations(c, Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            break __gotots_return_block_0;
                        }
                        if (isPossibleCallHierarchyDeclaration(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            let ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, isValidCallHierarchyDeclaration);
                            if (!(ancestor === undefined)) {
                                result = findImplementationOrAllInitialDeclarations(c, ancestor);
                                break __gotots_return_block_0;
                            }
                        }
                        if (isVariableLike(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            if (!(initializer === undefined) && isAssignedExpression(initializer)) {
                                result = new GoInterfaceAdapter(initializer);
                                break __gotots_return_block_0;
                            }
                        }
                        result = void 0;
                        break __gotots_return_block_0;
                    }
                    if (IsConstructorDeclaration__from_ast(location)) {
                        if (isValidCallHierarchyDeclaration(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            result = new GoInterfaceAdapter(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            break __gotots_return_block_0;
                        }
                        result = void 0;
                        break __gotots_return_block_0;
                    }
                    if (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStaticKeyword$constant__from_ast() && IsClassStaticBlockDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        location = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        continue;
                    }
                    if (IsVariableDeclaration__from_ast(location)) {
                        {
                            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(location);
                            if (!(initializer === undefined) && isAssignedExpression(initializer)) {
                                result = new GoInterfaceAdapter(initializer);
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    if (!followingSymbol) {
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, location);
                        if (!(__go_symbol === undefined)) {
                            if (!(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0) === 0)) {
                                __go_symbol = Checker__from_checker.GetAliasedSymbol(c, __go_symbol);
                            }
                            if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
                                followingSymbol = true;
                                location = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                                continue;
                            }
                        }
                    }
                    result = void 0;
                    break __gotots_return_block_0;
                }
                result = void 0;
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
    return result;
}
export class callSite {
    declare private readonly $goType: void;
    public constructor(public declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public textRange: TextRange__from_core, public sourceFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function convertEntryToCallSite(entry: ReferenceEntry | undefined): callSite | undefined {
    if (!((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === entryKindNode$constant().$value)) {
        return void 0;
    }
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node;
    if (!IsCallOrNewExpressionTarget__from_ast(node, true, true) && !IsTaggedTemplateTag__from_ast(node, true, true) && !IsDecoratorTarget__from_ast(node, true, true) && !IsJsxOpeningLikeElementTagName__from_ast(node, true, true) && !IsRightSideOfPropertyAccess__from_ast(node) && !IsArgumentExpressionOfElementAccess__from_ast(node)) {
        return void 0;
    }
    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
    let ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, isValidCallHierarchyDeclaration);
    if (ancestor === undefined) {
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        ancestor = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    let start = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node));
    const __gotots_field_0 = ancestor;
    const __gotots_field_1 = NewTextRange__from_core(start, Node__from_ast.End(node));
    const __gotots_store_1 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    const __gotots_field_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    return new callSite(__gotots_field_0, __gotots_field_1, __gotots_field_2);
}
export function getCallSiteGroupKey(site: callSite | undefined): NodeId__from_ast {
    return GetNodeId__from_ast((site ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declaration);
}
export class incomingEntry {
    declare private readonly $goType: void;
    public constructor(public ls: LanguageService | undefined, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public sourceFileOnce: sync__from_gostdlib.Once, public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public documentUriOnce: sync__from_gostdlib.Once, public documentUri: DocumentUri__from_lsproto, public positionOnce: sync__from_gostdlib.Once, public position: Position__from_lsproto) {
    }
    declare private readonly then?: never;
    static TextDocumentPosition(d: incomingEntry | undefined): Position__from_lsproto {
        sync__from_gostdlib.Once.Do((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).positionOnce, (): void => {
            let start = GetTokenPosOfNode__from_scanner((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, incomingEntry.$go$private$ls$getSourceFile(d), false);
            (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).position = LanguageService.$go$private$ls$createLspPosition((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ls, start, incomingEntry.$go$private$ls$getSourceFile(d));
        });
        return Position__from_lsproto.$copy((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).position);
    }
    static TextDocumentURI(d: incomingEntry | undefined): DocumentUri__from_lsproto {
        sync__from_gostdlib.Once.Do((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).documentUriOnce, (): void => {
            (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).documentUri = FileNameToDocumentURI__from_lsconv(SourceFile__from_ast.FileName(incomingEntry.$go$private$ls$getSourceFile(d)));
        });
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).documentUri;
    }
    static $go$private$ls$getSourceFile(d: incomingEntry | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        sync__from_gostdlib.Once.Do((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileOnce, (): void => {
            (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile = GetSourceFileOfNode__from_ast((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node);
        });
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile;
    }
}
export class callSiteCollector {
    declare private readonly $goType: void;
    public constructor(public program: {
        value: Program__from_compiler;
    } | undefined, public callSites: RuntimeSlice<callSite | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$collect(c: callSiteCollector | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (node === undefined) {
            return;
        }
        if (!(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0) === 0)) {
            return;
        }
        if (isValidCallHierarchyDeclaration(node)) {
            if (IsClassLike__from_ast(node)) {
                const __gotots_range_12 = Node__from_ast.Members(node);
                for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
                    const __gotots_range_value_13 = __gotots_range_12.get(__gotots_range_index_12);
                    let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
                    if (!(Node__from_ast.Name(member) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(member))) {
                        callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(Node__from_ast.Name(member)));
                    }
                }
            }
            return;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast():
            case KindImportEqualsDeclaration$constant__from_ast():
            case KindImportDeclaration$constant__from_ast():
            case KindExportDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindTypeAliasDeclaration$constant__from_ast(): {
                return;
                break;
            }
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                return;
                break;
            }
            case KindTypeAssertionExpression$constant__from_ast():
            case KindAsExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(node));
                return;
                break;
            }
            case KindVariableDeclaration$constant__from_ast():
            case KindParameter$constant__from_ast(): {
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Name(node));
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Initializer(node));
                return;
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(node));
                const __gotots_range_13 = Node__from_ast.Arguments(node);
                for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
                    const __gotots_range_value_14 = __gotots_range_13.get(__gotots_range_index_13);
                    let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
                    callSiteCollector.$go$private$ls$collect(c, arg);
                }
                return;
                break;
            }
            case KindNewExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(node));
                const __gotots_range_14 = Node__from_ast.Arguments(node);
                for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
                    const __gotots_range_value_15 = __gotots_range_14.get(__gotots_range_index_14);
                    let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
                    callSiteCollector.$go$private$ls$collect(c, arg);
                }
                return;
                break;
            }
            case KindTaggedTemplateExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                let taggedTemplate: {
                    value: TaggedTemplateExpression__from_ast;
                } | undefined = Node__from_ast.AsTaggedTemplateExpression(node);
                callSiteCollector.$go$private$ls$collect(c, (taggedTemplate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
                callSiteCollector.$go$private$ls$collect(c, (taggedTemplate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
                return;
                break;
            }
            case KindJsxOpeningElement$constant__from_ast():
            case KindJsxSelfClosingElement$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.TagName(node));
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Attributes(node));
                return;
                break;
            }
            case KindDecorator$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(node));
                return;
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$recordCallSite(c, node);
                Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    callSiteCollector.$go$private$ls$collect(c, child);
                    return false;
                }));
                return;
                break;
            }
            case KindSatisfiesExpression$constant__from_ast(): {
                callSiteCollector.$go$private$ls$collect(c, Node__from_ast.Expression(node));
                return;
                break;
            }
        }
        if (IsPartOfTypeNode__from_ast(node)) {
            return;
        }
        Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            callSiteCollector.$go$private$ls$collect(c, child);
            return false;
        }));
    }
    static $go$private$ls$recordCallSite(c: callSiteCollector | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        __gotots_control_target_1: {
            if (IsTaggedTemplateExpression__from_ast(node)) {
                target = (Node__from_ast.AsTaggedTemplateExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag;
            }
            else if (IsJsxOpeningElement__from_ast(node)) {
                target = Node__from_ast.TagName(node);
            }
            else if (IsJsxSelfClosingElement__from_ast(node)) {
                target = Node__from_ast.TagName(node);
            }
            else if (IsPropertyAccessExpression__from_ast(node) || IsElementAccessExpression__from_ast(node)) {
                target = node;
            }
            else if (IsClassStaticBlockDeclaration__from_ast(node)) {
                target = node;
            }
            else if (IsCallExpression__from_ast(node)) {
                target = Node__from_ast.Expression(node);
            }
            else if (IsNewExpression__from_ast(node)) {
                target = Node__from_ast.Expression(node);
            }
            else if (IsDecorator__from_ast(node)) {
                target = Node__from_ast.Expression(node);
            }
        }
        if (target === undefined) {
            return;
        }
        let declaration: GoInterface | undefined = resolveCallHierarchyDeclaration((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, target);
        if (declaration === undefined) {
            return;
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(target);
        let start = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(target));
        let textRange = NewTextRange__from_core(start, Node__from_ast.End(target));
        const __gotots_type_switch_0: GoInterface | undefined = declaration;
        switch (true) {
            case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_type_switch_0.$go$value;
                const __gotots_argument_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).callSites;
                const __gotots_field_3 = decl;
                const __gotots_field_4 = TextRange__from_core.$copy(textRange);
                const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                const __gotots_field_5 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_1 = new callSite(__gotots_field_3, __gotots_field_4, __gotots_field_5);
                (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).callSites = __gotots_argument_0.append(void 0, [__gotots_argument_1]);
                break;
            }
            case $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Node.$is(__gotots_type_switch_0): {
                let decl: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_type_switch_0.$go$value;
                const __gotots_range_15 = decl;
                for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
                    const __gotots_range_value_16 = __gotots_range_15.get(__gotots_range_index_15);
                    let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
                    const __gotots_argument_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).callSites;
                    const __gotots_field_6 = d;
                    const __gotots_field_7 = TextRange__from_core.$copy(textRange);
                    const __gotots_store_3 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    const __gotots_field_8 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_3 = new callSite(__gotots_field_6, __gotots_field_7, __gotots_field_8);
                    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).callSites = __gotots_argument_2.append(void 0, [__gotots_argument_3]);
                }
                break;
            }
        }
    }
}
export function collectCallSites(program: {
    value: Program__from_compiler;
} | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<callSite | undefined> {
    let collector: callSiteCollector | undefined = new callSiteCollector(program, RuntimeSlice.make<callSite | undefined>(0, null, void 0));
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindSourceFile$constant__from_ast(): {
            const __gotots_range_2 = Node__from_ast.Statements(node);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                callSiteCollector.$go$private$ls$collect(collector, stmt);
            }
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            {
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(node);
                if (!HasSyntacticModifier__from_ast(node, ModifierFlagsAmbient$constant__from_ast()) && !(body === undefined) && IsModuleBlock__from_ast(body)) {
                    const __gotots_range_3 = Node__from_ast.Statements(body);
                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                        let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                        callSiteCollector.$go$private$ls$collect(collector, stmt);
                    }
                }
            }
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            let impl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findImplementation(c, node);
            if (!(impl === undefined)) {
                const __gotots_range_4 = Node__from_ast.Parameters(impl);
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                    const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                    let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                    callSiteCollector.$go$private$ls$collect(collector, param);
                }
                callSiteCollector.$go$private$ls$collect(collector, Node__from_ast.Body(impl));
            }
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            {
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(node);
                if (!(modifiers === undefined)) {
                    const __gotots_range_5 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                        let mod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                        callSiteCollector.$go$private$ls$collect(collector, mod);
                    }
                }
            }
            let heritage: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassExtendsHeritageElement__from_ast(node);
            if (!(heritage === undefined)) {
                callSiteCollector.$go$private$ls$collect(collector, Node__from_ast.Expression(heritage));
            }
            const __gotots_range_6 = Node__from_ast.Members(node);
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                if (CanHaveModifiers__from_ast(member) && !(Node__from_ast.Modifiers(member) === undefined)) {
                    const __gotots_range_7 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((Node__from_ast.Modifiers(member) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
                    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
                        let mod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                        callSiteCollector.$go$private$ls$collect(collector, mod);
                    }
                }
                if (IsPropertyDeclaration__from_ast(member)) {
                    callSiteCollector.$go$private$ls$collect(collector, Node__from_ast.Initializer(member));
                }
                else if (IsConstructorDeclaration__from_ast(member)) {
                    {
                        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(member);
                        if (!(body === undefined)) {
                            const __gotots_range_8 = Node__from_ast.Parameters(member);
                            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                                const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
                                let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
                                callSiteCollector.$go$private$ls$collect(collector, param);
                            }
                            callSiteCollector.$go$private$ls$collect(collector, body);
                        }
                    }
                }
                else if (IsClassStaticBlockDeclaration__from_ast(member)) {
                    callSiteCollector.$go$private$ls$collect(collector, member);
                }
            }
            break;
        }
        case KindClassStaticBlockDeclaration$constant__from_ast(): {
            let staticBlock: {
                value: ClassStaticBlockDeclaration__from_ast;
            } | undefined = Node__from_ast.AsClassStaticBlockDeclaration(node);
            callSiteCollector.$go$private$ls$collect(collector, (staticBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body);
            break;
        }
        default: {
            AssertNever__from_debug(new GoInterfaceAdapter(node), RuntimeSlice.nil<GoInterface | undefined>());
            break;
        }
    }
    return (collector ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).callSites;
}
