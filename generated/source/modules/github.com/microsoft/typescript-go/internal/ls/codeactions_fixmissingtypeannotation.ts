import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, BindingPattern as BindingPattern__from_ast, ComputedPropertyName as ComputedPropertyName__from_ast, ExportAssignment as ExportAssignment__from_ast, FindAncestorResult as FindAncestorResult__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NamedImports as NamedImports__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Signature as Signature__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { ImportAdder as ImportAdder__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { TextEdit as TextEdit__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { EmitTextWriter as EmitTextWriter__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CodeFixContext } from "./codeactions.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, BindingElement as BindingElement__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ConditionalExpression as ConditionalExpression__from_ast, Diagnostic as Diagnostic__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FindAncestorFalse$constant as FindAncestorFalse$constant__from_ast, FindAncestorKind as FindAncestorKind__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, FindAncestor as FindAncestor__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, HasInitializer as HasInitializer__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, Identifier as Identifier__from_ast, ImportClause as ImportClause__from_ast, IsAccessor as IsAccessor__from_ast, IsArrayBindingPattern as IsArrayBindingPattern__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCallExpression as IsCallExpression__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConditionalExpression as IsConditionalExpression__from_ast, IsConstTypeReference as IsConstTypeReference__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDeclaration as IsDeclaration__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsEnumMember as IsEnumMember__from_ast, IsExpression as IsExpression__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsNamedImports as IsNamedImports__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSpreadAssignment as IsSpreadAssignment__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsStatement as IsStatement__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsTypeReferenceNode as IsTypeReferenceNode__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDeclareKeyword$constant as KindDeclareKeyword$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableStatement as VariableStatement__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, InterfaceType as InterfaceType__from_checker, ObjectFlagsReference$constant as ObjectFlagsReference$constant__from_checker, TypeFlagsUniqueESSymbol$constant as TypeFlagsUniqueESSymbol$constant__from_checker, TypePredicate as TypePredicate__from_checker, Type as Type__from_checker, UnionReductionNone$constant as UnionReductionNone$constant__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewLineKindLF$constant as NewLineKindLF$constant__from_core, NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { TryGetAutoImportableReferenceFromTypeNode as TryGetAutoImportableReferenceFromTypeNode__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { LeadingTriviaOptionNone$constant as LeadingTriviaOptionNone$constant__from_change, NewTracker as NewTracker__from_change, NodeOptions as NodeOptions__from_change, Tracker as Tracker__from_change } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { FlagsAllowUniqueESSymbolType$constant as FlagsAllowUniqueESSymbolType$constant__from_nodebuilder, FlagsNone$constant as FlagsNone$constant__from_nodebuilder, InternalFlagsWriteComputedProps$constant as InternalFlagsWriteComputedProps$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsOptimistic$int as GeneratedIdentifierFlagsOptimistic$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, GetSingleLineStringWriter as GetSingleLineStringWriter__from_printer, NewPrinter as NewPrinter__from_printer, NodeFactory as NodeFactory__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IdentifierToKeywordKind as IdentifierToKeywordKind__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Node_To_bool as GoMap } from "../../../../../../support/maps.js";
import { CodeAction, CombinedCodeActions, containsErrorCode } from "./codeactions.js";
import { getAllDiagnostics } from "./diagnostics.js";
import { LanguageService } from "./languageservice.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export const fixMissingTypeAnnotationOnExportsFixID$string: gostring = "fixMissingTypeAnnotationOnExports";
export class typePrintMode {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function typePrintModeFull$constant(): typePrintMode {
    return new typePrintMode(0);
}
export function typePrintModeRelative$constant(): typePrintMode {
    return new typePrintMode(1);
}
export function typePrintModeWidened$constant(): typePrintMode {
    return new typePrintMode(2);
}
export function getIsolatedDeclarationsCodeActions(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>(), void 0];
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_0 = Program__from_compiler.GetTypeCheckerForFile((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_0[0];
                let done: (() => void) | undefined = __gotots_results_0[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let fixes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>();
                let addFix: (($0: tsonicTypeScriptRuntime.Location<CodeAction> | undefined) => void) | undefined = (action: tsonicTypeScriptRuntime.Location<CodeAction> | undefined): void => {
                    if (action === undefined) {
                        return;
                    }
                    fixes = fixes.append(void 0, [action]);
                };
                let modes = RuntimeSlice.literal<int>([typePrintModeFull$constant().$value, typePrintModeRelative$constant().$value, typePrintModeWidened$constant().$value]);
                const __gotots_range_0 = modes;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = new typePrintMode(__gotots_range_0.get(__gotots_range_index_0));
                    let mode = __gotots_range_value_0;
                    const __gotots_callee_1 = addFix;
                    const __gotots_argument_0 = tryCodeAction(ctx, fixContext, ch, (f: isolatedDeclarationsFixer | undefined): gostring => {
                        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typePrintMode = mode;
                        return isolatedDeclarationsFixer.$go$private$ls$addTypeAnnotation(f, TextRange__from_core.$copy((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Span));
                    });
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                }
                const __gotots_range_1 = modes;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = new typePrintMode(__gotots_range_1.get(__gotots_range_index_1));
                    let mode = __gotots_range_value_1;
                    const __gotots_callee_2 = addFix;
                    const __gotots_argument_1 = tryCodeAction(ctx, fixContext, ch, (f: isolatedDeclarationsFixer | undefined): gostring => {
                        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typePrintMode = mode;
                        return isolatedDeclarationsFixer.$go$private$ls$addInlineAssertion(f, TextRange__from_core.$copy((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Span));
                    });
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                }
                const __gotots_callee_3 = addFix;
                const __gotots_argument_2 = tryCodeAction(ctx, fixContext, ch, (f: isolatedDeclarationsFixer | undefined): gostring => {
                    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typePrintMode = typePrintModeFull$constant();
                    return isolatedDeclarationsFixer.$go$private$ls$extractAsVariable(f, TextRange__from_core.$copy((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Span));
                });
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                __gotots_return_0 = [fixes, void 0];
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
export function getAllIsolatedDeclarationsCodeActions(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
    CombinedCodeActions | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        CombinedCodeActions | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = [void 0, void 0];
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_1 = Program__from_compiler.GetTypeCheckerForFile((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_1[0];
                let done: (() => void) | undefined = __gotots_results_1[1];
                const __gotots_callee_3: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let changeTracker: Tracker__from_change | undefined = NewTracker__from_change(ctx, Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program), LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters);
                let fixer: isolatedDeclarationsFixer | undefined = new isolatedDeclarationsFixer((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ch, changeTracker, void 0, FromContext__from_locale(ctx), GoMap.make(0, []), typePrintModeFull$constant(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), false);
                let allDiags = getAllDiagnostics(ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                const __gotots_range_2 = allDiags;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_2;
                    if (containsErrorCode($state.isolatedDeclarationsFixErrorCodes, Diagnostic__from_ast.Code(diag))) {
                        let span = NewTextRange__from_core(Diagnostic__from_ast.Loc(diag).Pos(), Diagnostic__from_ast.Loc(diag).End());
                        isolatedDeclarationsFixer.$go$private$ls$addTypeAnnotation(fixer, TextRange__from_core.$copy(span));
                    }
                }
                const __gotots_range_3 = (fixer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolsToImport;
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                    const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_3;
                    isolatedDeclarationsFixer.$go$private$ls$addSymbolToExistingImport(fixer, sym);
                }
                let changes: GoMapValue<gostring, RuntimeSlice<{
                    value: TextEdit__from_lsproto;
                } | undefined>> = Tracker__from_change.GetChanges(changeTracker);
                let fileChanges = changes.lookup(SourceFile__from_ast.FileName((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile));
                if (fileChanges.length === 0) {
                    __gotots_return_0 = [void 0, void 0];
                    break __gotots_return_block_0;
                }
                __gotots_return_0 = [new CombinedCodeActions(Message__from_diagnostics.Localize($state__diagnostics.Add_all_missing_type_annotations, FromContext__from_locale(ctx), RuntimeSlice.nil<$goInterface$Interface_void | undefined>()), fileChanges), void 0];
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
export function tryCodeAction(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, fn: (($0: isolatedDeclarationsFixer | undefined) => gostring) | undefined): tsonicTypeScriptRuntime.Location<CodeAction> | undefined {
    let changeTracker: Tracker__from_change | undefined = NewTracker__from_change(ctx, Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program), LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters);
    let importAdder: ImportAdder__from_autoimport | undefined = void 0;
    let fixer: isolatedDeclarationsFixer | undefined = new isolatedDeclarationsFixer((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ch, changeTracker, importAdder, FromContext__from_locale(ctx), GoMap.make(0, []), new typePrintMode(0), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), false);
    const __gotots_callee_3 = fn;
    const __gotots_argument_3 = fixer;
    let description = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
    if (description === "") {
        return void 0;
    }
    const __gotots_range_4 = (fixer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolsToImport;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_4;
        isolatedDeclarationsFixer.$go$private$ls$addSymbolToExistingImport(fixer, sym);
    }
    let changes: GoMapValue<gostring, RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>> = Tracker__from_change.GetChanges(changeTracker);
    let fileChanges = changes.lookup(SourceFile__from_ast.FileName((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile));
    let __gotots_logical_result_0 = !(importAdder === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_receiver_0 = importAdder;
        __gotots_logical_result_0 = goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_0).HasFixes();
    }
    if (__gotots_logical_result_0) {
        const __gotots_argument_4 = fileChanges;
        const __gotots_receiver_1 = importAdder;
        const __gotots_argument_5 = goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_1).Edits();
        fileChanges = goSliceAppendSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>(__gotots_argument_4, __gotots_argument_5, void 0);
    }
    if (fileChanges.length === 0) {
        return void 0;
    }
    return tsonicTypeScriptRuntime.location<CodeAction>(new CodeAction(description, fileChanges, fixMissingTypeAnnotationOnExportsFixID$string, Message__from_diagnostics.Localize($state__diagnostics.Add_all_missing_type_annotations, FromContext__from_locale(ctx), RuntimeSlice.nil<$goInterface$Interface_void | undefined>())));
}
export class isolatedDeclarationsFixer {
    declare private readonly $goType: void;
    public constructor(public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, public changeTracker: Tracker__from_change | undefined, public importAdder: ImportAdder__from_autoimport | undefined, public locale: Locale__from_locale, public fixedNodes: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, bool>, public typePrintMode: typePrintMode, public symbolsToImport: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public mutatedTarget: bool) {
    }
    declare private readonly then?: never;
    static $go$private$ls$addInlineAssertion(f: isolatedDeclarationsFixer | undefined, span: TextRange__from_core): gostring {
        let nodeWithDiag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, span.Pos());
        let expandoFunction: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findExpandoFunction((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, nodeWithDiag);
        if (!(expandoFunction === undefined)) {
            return "";
        }
        let targetNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findBestFittingNode(nodeWithDiag, TextRange__from_core.$copy(span));
        if (targetNode === undefined || isValueSignatureDeclaration(targetNode) || isValueSignatureDeclaration(Node__from_ast.$storageOf(((targetNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return "";
        }
        let isExpressionTarget = IsExpression__from_ast(targetNode);
        let isShorthandPropertyAssignmentTarget = IsShorthandPropertyAssignment__from_ast(targetNode);
        if (!isShorthandPropertyAssignmentTarget && isNamedDeclarationKind(targetNode)) {
            return "";
        }
        if (!(FindAncestor__from_ast(targetNode, IsBindingPattern__from_ast) === undefined)) {
            return "";
        }
        if (!(FindAncestor__from_ast(targetNode, IsEnumMember__from_ast) === undefined)) {
            return "";
        }
        if (isExpressionTarget && (!(FindAncestorKind__from_ast(targetNode, KindHeritageClause$constant__from_ast()) === undefined) || !(FindAncestor__from_ast(targetNode, IsTypeNode__from_ast) === undefined))) {
            return "";
        }
        if (IsSpreadElement__from_ast(targetNode)) {
            return "";
        }
        let variableDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorKind__from_ast(targetNode, KindVariableDeclaration$constant__from_ast());
        let variableType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
        if (!(variableDeclaration === undefined)) {
            variableType = Checker__from_checker.GetTypeAtLocation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, variableDeclaration);
        }
        if (!(variableType === undefined) && !((Type__from_checker.Flags(variableType) & TypeFlagsUniqueESSymbol$constant__from_checker()) >>> 0 === 0)) {
            return "";
        }
        if (!isExpressionTarget && !isShorthandPropertyAssignmentTarget) {
            return "";
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, targetNode, variableType);
        if (typeNode === undefined || (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        if (isShorthandPropertyAssignmentTarget) {
            let clonedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, ShorthandPropertyAssignment__from_ast.Name(Node__from_ast.AsShorthandPropertyAssignment(targetNode)));
            let asExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createAsExpression(factory, clonedName, typeNode);
            const __gotots_receiver_2 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker;
            const __gotots_argument_6 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile;
            const __gotots_argument_7 = Node__from_ast.End(targetNode) | 0;
            const __gotots_argument_8 = asExpr;
            const __gotots_field_0 = ": ";
            const __gotots_struct_0 = NodeOptions__from_change.$zero();
            __gotots_struct_0.Prefix = __gotots_field_0;
            const __gotots_argument_9 = __gotots_struct_0;
            Tracker__from_change.InsertNodeAt(__gotots_receiver_2, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
        }
        else if (isExpressionTarget) {
            let clonedTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, targetNode);
            if (needsParenthesizedExpressionForAssertion(targetNode)) {
                clonedTarget = NodeFactory__from_ast.NewParenthesizedExpression(factory, clonedTarget);
            }
            let clonedType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, typeNode);
            let satisfiesAsExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewAsExpression(factory, NodeFactory__from_ast.NewSatisfiesExpression(factory, clonedTarget, clonedType), typeNode);
            Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, targetNode, satisfiesAsExpr, void 0);
        }
        else {
            return "";
        }
        return Message__from_diagnostics.Localize($state__diagnostics.Add_satisfies_and_an_inline_type_assertion_with_0, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typeToStringForDiag(typeNode, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker))]));
    }
    static $go$private$ls$addSymbolToExistingImport(f: isolatedDeclarationsFixer | undefined, sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        if (sym === undefined || Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) {
            return;
        }
        let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent;
        let symbolName = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
        const __gotots_range_5 = NodeList__from_ast.$storageOf((((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            if (!IsImportDeclaration__from_ast(stmt)) {
                continue;
            }
            let importDecl: {
                value: ImportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportDeclaration(stmt);
            if ((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
                continue;
            }
            let importModuleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, (importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier);
            if (importModuleSymbol === undefined || !tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetMergedSymbol((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, importModuleSymbol), Checker__from_checker.GetMergedSymbol((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, moduleSymbol))) {
                continue;
            }
            let importClause: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
            if (!((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && IsNamedImports__from_ast((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings)) {
                let existingElements = NodeList__from_ast.$storageOf((((Node__from_ast.AsNamedImports((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
                let newSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportSpecifier(factory, false, void 0, NodeFactory__from_ast.NewIdentifier(factory, symbolName));
                let newElements = existingElements.append(void 0, [Node__from_ast.AsNode(newSpecifier)]);
                let newNamedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNamedImports(factory, NodeFactory__from_ast.NewNodeList(factory, newElements));
                let newImportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportClause(factory, importClause, (importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, ImportClause__from_ast.Name(importClause), newNamedImports);
                const __gotots_receiver_3 = factory;
                const __gotots_argument_10 = importDecl;
                const __gotots_store_0 = (importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_11 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "ModifiersBase"));
                const __gotots_argument_12 = newImportClause;
                const __gotots_argument_13 = (importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_14 = (importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_3, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
                Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, stmt, Node__from_ast.AsNode(newImportDecl), void 0);
            }
            return;
        }
    }
    static $go$private$ls$addTypeAnnotation(f: isolatedDeclarationsFixer | undefined, span: TextRange__from_core): gostring {
        let nodeWithDiag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, span.Pos());
        let expandoFunction: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findExpandoFunction((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, nodeWithDiag);
        if (!(expandoFunction === undefined)) {
            if (IsFunctionDeclaration__from_ast(expandoFunction)) {
                return isolatedDeclarationsFixer.$go$private$ls$createNamespaceForExpandoProperties(f, expandoFunction);
            }
            return isolatedDeclarationsFixer.$go$private$ls$fixIsolatedDeclarationError(f, expandoFunction);
        }
        let nodeMissingType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findAncestorWithMissingType(nodeWithDiag);
        if (!(nodeMissingType === undefined)) {
            return isolatedDeclarationsFixer.$go$private$ls$fixIsolatedDeclarationError(f, nodeMissingType);
        }
        return "";
    }
    static $go$private$ls$addTypeToSignatureDeclaration(f: isolatedDeclarationsFixer | undefined, funcNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        if (!(Node__from_ast.Type(funcNode) === undefined)) {
            return "";
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, funcNode, void 0);
        if (typeNode === undefined) {
            return "";
        }
        Tracker__from_change.TryInsertTypeAnnotation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, funcNode, typeNode);
        return Message__from_diagnostics.Localize($state__diagnostics.Add_return_type_0, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typeToStringForDiag(typeNode, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker))]));
    }
    static $go$private$ls$addTypeToVariableLike(f: isolatedDeclarationsFixer | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, decl, void 0);
        if (typeNode === undefined) {
            return "";
        }
        if (!(Node__from_ast.Type(decl) === undefined)) {
            Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, Node__from_ast.Type(decl), typeNode, void 0);
        }
        else {
            Tracker__from_change.TryInsertTypeAnnotation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, decl, typeNode);
            if (IsParameterDeclaration__from_ast(decl) && !(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsArrowFunction__from_ast(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                Tracker__from_change.ParenthesizeArrowParameters((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
        }
        return Message__from_diagnostics.Localize($state__diagnostics.Add_annotation_of_type_0, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typeToStringForDiag(typeNode, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker))]));
    }
    static $go$private$ls$createNamespaceForExpandoProperties(f: isolatedDeclarationsFixer | undefined, expandoFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let funcDecl: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(expandoFunc);
        if (FunctionDeclaration__from_ast.Name(funcDecl) === undefined) {
            return "";
        }
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, expandoFunc);
        let elements = Checker__from_checker.GetPropertiesOfType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t);
        if (elements.length === 0) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        let newProperties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_7 = elements;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_7;
            if (!IsIdentifierText__from_scanner(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, LanguageVariantStandard$constant__from_core())) {
                continue;
            }
            if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsVariableDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                continue;
            }
            let symType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbol((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, __go_symbol);
            let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$typeToMinimizedReferenceType(f, symType, expandoFunc, $state.declarationEmitNodeBuilderFlags);
            if (typeNode === undefined) {
                continue;
            }
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, NodeFactory__from_ast.NewIdentifier(factory, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), void 0, typeNode, void 0);
            let exportToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken(factory, KindExportKeyword$constant__from_ast());
            let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsNone$constant__from_ast());
            let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, NodeFactory__from_ast.NewModifierList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([exportToken])), varDeclList);
            newProperties = newProperties.append(void 0, [varStmt]);
        }
        if (newProperties.length === 0) {
            return "";
        }
        let modifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (HasSyntacticModifier__from_ast(expandoFunc, ModifierFlagsExport$constant__from_ast())) {
            modifiers = modifiers.append(void 0, [NodeFactory__from_ast.NewToken(factory, KindExportKeyword$constant__from_ast())]);
        }
        modifiers = modifiers.append(void 0, [NodeFactory__from_ast.NewToken(factory, KindDeclareKeyword$constant__from_ast())]);
        let __go_namespace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewModuleDeclaration(factory, NodeFactory__from_ast.NewModifierList(factory, modifiers), KindNamespaceKeyword$constant__from_ast(), NodeFactory__from_ast.NewIdentifier(factory, Node__from_ast.Text(FunctionDeclaration__from_ast.Name(funcDecl))), NodeFactory__from_ast.NewModuleBlock(factory, NodeFactory__from_ast.NewNodeList(factory, newProperties)));
        Node__from_ast.$storageOf(((__go_namespace ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags = 25263168;
        Tracker__from_change.InsertNodeAfter((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, expandoFunc, __go_namespace);
        return Message__from_diagnostics.Localize($state__diagnostics.Annotate_types_of_properties_expando_function_in_a_namespace, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    }
    static $go$private$ls$createTypeOfFromEntityNameExpression(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory__from_ast.NewTypeQueryNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.DeepCloneNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, node), void 0);
    }
    static $go$private$ls$emitBindingElementVariable(f: isolatedDeclarationsFixer | undefined, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, be: {
        value: BindingElement__from_ast;
    } | undefined, accessExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNodes: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, enclosingVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, name, void 0);
        let variableInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = accessExpr;
        if (!((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) {
            let propName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
            let tempBaseName = "temp";
            if (!(propName === undefined) && IsIdentifier__from_ast(propName)) {
                tempBaseName = Node__from_ast.Text(propName);
            }
            let tempName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, tempBaseName, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
            let tempVarDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(tempName), void 0, void 0, variableInitializer);
            let tempVarDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([tempVarDecl])), NodeFlagsConst$constant__from_ast());
            let tempVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, tempVarDeclList);
            void ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.append(void 0, [tempVarStmt]));
            variableInitializer = NodeFactory__from_ast.NewConditionalExpression(factory, NodeFactory__from_ast.NewBinaryExpression(factory, void 0, Node__from_ast.AsNode(tempName), void 0, NodeFactory__from_ast.NewToken(factory, KindEqualsEqualsEqualsToken$constant__from_ast()), NodeFactory__from_ast.NewIdentifier(factory, "undefined")), NodeFactory__from_ast.NewToken(factory, KindQuestionToken$constant__from_ast()), (be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, NodeFactory__from_ast.NewToken(factory, KindColonToken$constant__from_ast()), variableInitializer);
        }
        let exportModifier: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$getExportModifier(f, enclosingVarStmt);
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, NodeFactory__from_ast.NewIdentifier(factory, Node__from_ast.Text(name)), void 0, typeNode, variableInitializer);
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
        let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, exportModifier, varDeclList);
        void ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.append(void 0, [varStmt]));
    }
    static $go$private$ls$extractAsVariable(f: isolatedDeclarationsFixer | undefined, span: TextRange__from_core): gostring {
        let nodeWithDiag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, span.Pos());
        let targetNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findBestFittingNode(nodeWithDiag, TextRange__from_core.$copy(span));
        if (targetNode === undefined || isValueSignatureDeclaration(targetNode) || isValueSignatureDeclaration(Node__from_ast.$storageOf(((targetNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return "";
        }
        if (!IsExpression__from_ast(targetNode)) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        if (IsArrayLiteralExpression__from_ast(targetNode)) {
            let constRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeReferenceNode(factory, NodeFactory__from_ast.NewIdentifier(factory, "const"), void 0);
            let cloned: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, targetNode);
            Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, targetNode, createAsExpression(factory, cloned, constRef), void 0);
            return Message__from_diagnostics.Localize($state__diagnostics.Mark_array_literal_as_const, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        }
        let parentPropertyAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorKind__from_ast(targetNode, KindPropertyAssignment$constant__from_ast());
        if (!(parentPropertyAssignment === undefined)) {
            if (tsonicTypeScriptRuntime.sameLocation(parentPropertyAssignment, Node__from_ast.$storageOf(((targetNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)
                && IsEntityNameExpression__from_ast(targetNode)) {
                return "";
            }
            let tempName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, getIdentifierNameForNode(targetNode), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
            let replacementTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = targetNode;
            let initializationNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = targetNode;
            if (IsSpreadElement__from_ast(replacementTarget)) {
                replacementTarget = WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((replacementTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if (isConstAssertion(Node__from_ast.$storageOf(((replacementTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    replacementTarget = Node__from_ast.$storageOf(((replacementTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    initializationNode = replacementTarget;
                }
                else {
                    let constRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeReferenceNode(factory, NodeFactory__from_ast.NewIdentifier(factory, "const"), void 0);
                    initializationNode = createAsExpression(factory, NodeFactory__from_ast.DeepCloneNode(factory, replacementTarget), constRef);
                }
            }
            if (IsEntityNameExpression__from_ast(replacementTarget)) {
                return "";
            }
            let clonedInit: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, initializationNode);
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(tempName), void 0, void 0, clonedInit);
            let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
            let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, varDeclList);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(targetNode, IsStatement__from_ast);
            if (statement === undefined) {
                return "";
            }
            Tracker__from_change.InsertNodeBefore((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, statement, varStmt, false, LeadingTriviaOptionNone$constant__from_change());
            let typeQuery: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeQueryNode(factory, Node__from_ast.AsNode(tempName), void 0);
            let asExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewAsExpression(factory, Node__from_ast.AsNode(tempName), typeQuery);
            Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, replacementTarget, asExpr, void 0);
            let idText = typeToStringForDiag(Node__from_ast.AsNode(tempName), (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker);
            return Message__from_diagnostics.Localize($state__diagnostics.Extract_to_variable_and_replace_with_0_as_typeof_0, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(idText)]));
        }
        return "";
    }
    static $go$private$ls$extractBindingElements(f: isolatedDeclarationsFixer | undefined, bindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, baseExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNodes: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, enclosingVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        if (IsObjectBindingPattern__from_ast(bindingPattern)) {
            const __gotots_range_12 = NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(bindingPattern) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
                const __gotots_range_value_13 = __gotots_range_12.get(__gotots_range_index_12);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
                if (IsOmittedExpression__from_ast(element)) {
                    continue;
                }
                let be: {
                    value: BindingElement__from_ast;
                } | undefined = Node__from_ast.AsBindingElement(element);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BindingElement__from_ast.Name(be);
                if (name === undefined) {
                    continue;
                }
                let accessExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName === undefined) && IsComputedPropertyName__from_ast((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName)) {
                    let computedExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsComputedPropertyName((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                    let identifierForComputedProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, computedExpression);
                    let compVarDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(identifierForComputedProperty), void 0, void 0, computedExpression);
                    let compVarDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([compVarDecl])), NodeFlagsConst$constant__from_ast());
                    let compVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, compVarDeclList);
                    void ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                        ((newNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.append(void 0, [compVarStmt]));
                    accessExpr = NodeFactory__from_ast.NewElementAccessExpression(factory, baseExpr, void 0, Node__from_ast.AsNode(identifierForComputedProperty), NodeFlagsNone$constant__from_ast());
                }
                else if (!((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName === undefined)) {
                    let propText = Node__from_ast.Text((be ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName);
                    accessExpr = NodeFactory__from_ast.NewPropertyAccessExpression(factory, baseExpr, void 0, NodeFactory__from_ast.NewIdentifier(factory, propText), NodeFlagsNone$constant__from_ast());
                }
                else if (IsIdentifier__from_ast(name)) {
                    accessExpr = NodeFactory__from_ast.NewPropertyAccessExpression(factory, baseExpr, void 0, NodeFactory__from_ast.NewIdentifier(factory, Node__from_ast.Text(name)), NodeFlagsNone$constant__from_ast());
                }
                else {
                    continue;
                }
                if (IsBindingPattern__from_ast(name)) {
                    isolatedDeclarationsFixer.$go$private$ls$extractBindingElements(f, name, accessExpr, newNodes, enclosingVarStmt);
                }
                else {
                    isolatedDeclarationsFixer.$go$private$ls$emitBindingElementVariable(f, factory, name, be, accessExpr, newNodes, enclosingVarStmt);
                }
            }
        }
        else if (IsArrayBindingPattern__from_ast(bindingPattern)) {
            const __gotots_range_13 = NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(bindingPattern) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
                const __gotots_range_value_14 = __gotots_range_index_13;
                const __gotots_range_value_15 = __gotots_range_13.get(__gotots_range_index_13);
                let i = __gotots_range_value_14;
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
                if (IsOmittedExpression__from_ast(element)) {
                    continue;
                }
                let be: {
                    value: BindingElement__from_ast;
                } | undefined = Node__from_ast.AsBindingElement(element);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BindingElement__from_ast.Name(be);
                if (name === undefined) {
                    continue;
                }
                let accessExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(factory, baseExpr, void 0, NodeFactory__from_ast.NewNumericLiteral(factory, strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(i))), TokenFlagsNone$constant__from_ast()), NodeFlagsNone$constant__from_ast());
                if (IsBindingPattern__from_ast(name)) {
                    isolatedDeclarationsFixer.$go$private$ls$extractBindingElements(f, name, accessExpr, newNodes, enclosingVarStmt);
                }
                else {
                    isolatedDeclarationsFixer.$go$private$ls$emitBindingElementVariable(f, factory, name, be, accessExpr, newNodes, enclosingVarStmt);
                }
            }
        }
    }
    static $go$private$ls$finalizesVariablePart(f: isolatedDeclarationsFixer | undefined, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, name: gostring, isInConstContext: bool, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, makeNodeOfKind: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, createSpread: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, currentVariableProperties: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, intersectionTypes: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, newSpreads: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): void {
        if (((currentVariableProperties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.length > 0) {
            const __gotots_receiver_9 = f;
            const __gotots_argument_49 = factory;
            const __gotots_argument_50 = name;
            const __gotots_argument_51 = isInConstContext;
            const __gotots_argument_52 = statement;
            const __gotots_argument_53 = createSpread;
            const __gotots_callee_8 = makeNodeOfKind;
            const __gotots_argument_48 = ((currentVariableProperties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value;
            const __gotots_argument_54 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
            const __gotots_argument_55 = intersectionTypes;
            const __gotots_argument_56 = newSpreads;
            isolatedDeclarationsFixer.$go$private$ls$makeSpreadVariable(__gotots_receiver_9, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56);
            void ((currentVariableProperties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
        }
    }
    static $go$private$ls$fixIsolatedDeclarationError(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fixedNodes.lookup(node)) {
            return "";
        }
        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fixedNodes.store(node, true);
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindParameter$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast():
            case KindVariableDeclaration$constant__from_ast(): {
                return isolatedDeclarationsFixer.$go$private$ls$addTypeToVariableLike(f, node);
                break;
            }
            case KindArrowFunction$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast(): {
                return isolatedDeclarationsFixer.$go$private$ls$addTypeToSignatureDeclaration(f, node);
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return isolatedDeclarationsFixer.$go$private$ls$transformExportAssignment(f, node);
                break;
            }
            case KindClassDeclaration$constant__from_ast(): {
                return isolatedDeclarationsFixer.$go$private$ls$transformExtendsClauseWithExpression(f, node);
                break;
            }
            case KindObjectBindingPattern$constant__from_ast():
            case KindArrayBindingPattern$constant__from_ast(): {
                return isolatedDeclarationsFixer.$go$private$ls$transformDestructuringPatterns(f, node);
                break;
            }
            default: {
                return "";
                break;
            }
        }
    }
    static $go$private$ls$getExportModifier(f: isolatedDeclarationsFixer | undefined, enclosingVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        if (HasSyntacticModifier__from_ast(enclosingVarStmt, ModifierFlagsExport$constant__from_ast())) {
            let exportToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindExportKeyword$constant__from_ast());
            return NodeFactory__from_ast.NewModifierList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([exportToken]));
        }
        return void 0;
    }
    static $go$private$ls$getExtraFlags(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): Flags__from_nodebuilder {
        if ((IsVariableDeclaration__from_ast(node) || (IsPropertyDeclaration__from_ast(node) && HasSyntacticModifier__from_ast(node, 264))) && !((Type__from_checker.Flags(t) & TypeFlagsUniqueESSymbol$constant__from_checker()) >>> 0 === 0)) {
            return FlagsAllowUniqueESSymbolType$constant__from_nodebuilder();
        }
        return FlagsNone$constant__from_nodebuilder();
    }
    static $go$private$ls$inferType(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, variableType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget = false;
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typePrintMode.$value === typePrintModeRelative$constant().$value) {
            return isolatedDeclarationsFixer.$go$private$ls$relativeType(f, node);
        }
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
        if (isValueSignatureDeclaration(node)) {
            let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetSignatureFromDeclaration((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, node);
            if (!(signature === undefined)) {
                let typePredicate: {
                    value: TypePredicate__from_checker;
                } | undefined = Checker__from_checker.GetTypePredicateOfSignature((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, signature);
                if (!(typePredicate === undefined)) {
                    if (TypePredicate__from_checker.Type(typePredicate) === undefined) {
                        return void 0;
                    }
                    let enclosingDecl__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsDeclaration__from_ast);
                    if (enclosingDecl__shadow_1 === undefined) {
                        const __gotots_store_1 = NodeBase__from_ast.$storageOf((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                        enclosingDecl__shadow_1 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                            return NodeDefault__from_ast.$fromStorage($go$storage);
                        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                            return NodeDefault__from_ast.$storageOf($go$value);
                        }));
                    }
                    let flags__shadow_1 = $state.declarationEmitNodeBuilderFlags;
                    if (!((Type__from_checker.Flags(TypePredicate__from_checker.Type(typePredicate)) & TypeFlagsUniqueESSymbol$constant__from_checker()) >>> 0 === 0)) {
                        flags__shadow_1 = (flags__shadow_1 | 1048576) >>> 0;
                    }
                    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypePredicateToTypePredicateNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, typePredicate, enclosingDecl__shadow_1, flags__shadow_1, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.nil());
                    if (!(result === undefined)) {
                        return Node__from_ast.AsNode(result);
                    }
                    return void 0;
                }
                t = Checker__from_checker.GetReturnTypeOfSignature((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, signature);
            }
        }
        else {
            t = Checker__from_checker.GetTypeAtLocation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, node);
        }
        if (t === undefined) {
            return void 0;
        }
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typePrintMode.$value === typePrintModeWidened$constant().$value) {
            if (!(variableType === undefined)) {
                t = variableType;
            }
            let widenedType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetWidenedLiteralType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t);
            if (Checker__from_checker.IsTypeAssignableTo((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, widenedType, t)) {
                return void 0;
            }
            t = widenedType;
        }
        let enclosingDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsDeclaration__from_ast);
        if (enclosingDecl === undefined) {
            const __gotots_store_2 = NodeBase__from_ast.$storageOf((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            enclosingDecl = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
        }
        let flags = ($state.declarationEmitNodeBuilderFlags | isolatedDeclarationsFixer.$go$private$ls$getExtraFlags(f, node, t)) >>> 0;
        if (IsParameterDeclaration__from_ast(node) && Checker__from_checker.RequiresAddingImplicitUndefined((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, node)) {
            t = Checker__from_checker.GetUnionTypeEx((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([Checker__from_checker.GetUndefinedType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker), t]), UnionReductionNone$constant__from_checker());
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$typeToMinimizedReferenceType(f, t, enclosingDecl, flags);
        return typeNode;
    }
    static $go$private$ls$makeSpreadVariable(f: isolatedDeclarationsFixer | undefined, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, name: gostring, isInConstContext: bool, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, createSpread: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, intersectionTypes: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, newSpreads: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): void {
        let tempName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.AsNode(NodeFactory__from_printer.NewUniqueNameEx((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, name + "_Part" + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(((newSpreads ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.length + 1))), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", "")));
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!isInConstContext) {
            initializer = NodeFactory__from_ast.DeepCloneNode(factory, expression);
        }
        else {
            let constRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeReferenceNode(factory, NodeFactory__from_ast.NewIdentifier(factory, "const"), void 0);
            initializer = NodeFactory__from_ast.NewAsExpression(factory, NodeFactory__from_ast.DeepCloneNode(factory, expression), constRef);
        }
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, tempName, void 0, void 0, initializer);
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
        let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, varDeclList);
        if (!(statement === undefined)) {
            Tracker__from_change.InsertNodeBefore((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, statement, varStmt, false, LeadingTriviaOptionNone$constant__from_change());
        }
        void ((intersectionTypes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            ((intersectionTypes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.append(void 0, [isolatedDeclarationsFixer.$go$private$ls$createTypeOfFromEntityNameExpression(f, tempName)]));
        const __gotots_store_8 = (newSpreads ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_58 = ((newSpreads ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value;
        const __gotots_callee_9 = createSpread;
        const __gotots_argument_57 = tempName;
        const __gotots_argument_59 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57);
        void (__gotots_store_8.value =
            __gotots_argument_58.append(void 0, [__gotots_argument_59]));
    }
    static $go$private$ls$relativeType(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsParameterDeclaration__from_ast(node)) {
            return void 0;
        }
        if (IsShorthandPropertyAssignment__from_ast(node)) {
            return isolatedDeclarationsFixer.$go$private$ls$createTypeOfFromEntityNameExpression(f, ShorthandPropertyAssignment__from_ast.Name(Node__from_ast.AsShorthandPropertyAssignment(node)));
        }
        if (IsEntityNameExpression__from_ast(node)) {
            return isolatedDeclarationsFixer.$go$private$ls$createTypeOfFromEntityNameExpression(f, node);
        }
        if (isConstAssertion(node)) {
            return isolatedDeclarationsFixer.$go$private$ls$relativeType(f, Node__from_ast.Expression(node));
        }
        if (IsArrayLiteralExpression__from_ast(node)) {
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorKind__from_ast(node, KindVariableDeclaration$constant__from_ast());
            let partName = "";
            if (!(varDecl === undefined) && IsIdentifier__from_ast(Node__from_ast.Name(varDecl))) {
                partName = Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(Node__from_ast.Name(varDecl)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text;
            }
            return isolatedDeclarationsFixer.$go$private$ls$typeFromArraySpreadElements(f, Node__from_ast.AsArrayLiteralExpression(node), partName);
        }
        if (IsObjectLiteralExpression__from_ast(node)) {
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorKind__from_ast(node, KindVariableDeclaration$constant__from_ast());
            let partName = "";
            if (!(varDecl === undefined) && IsIdentifier__from_ast(Node__from_ast.Name(varDecl))) {
                partName = Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(Node__from_ast.Name(varDecl)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text;
            }
            return isolatedDeclarationsFixer.$go$private$ls$typeFromObjectSpreadAssignment(f, Node__from_ast.AsObjectLiteralExpression(node), partName);
        }
        if (IsVariableDeclaration__from_ast(node) && !(Node__from_ast.Initializer(node) === undefined)) {
            return isolatedDeclarationsFixer.$go$private$ls$relativeType(f, Node__from_ast.Initializer(node));
        }
        if (IsConditionalExpression__from_ast(node)) {
            let cond: tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast> | undefined = Node__from_ast.AsConditionalExpression(node);
            let trueType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$relativeType(f, ConditionalExpression__from_ast.$storageOf(((cond ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue);
            if (trueType === undefined) {
                return void 0;
            }
            let trueMutated = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget;
            let falseType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$relativeType(f, ConditionalExpression__from_ast.$storageOf(((cond ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse);
            if (falseType === undefined) {
                return void 0;
            }
            (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget = trueMutated || (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget;
            let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
            return NodeFactory__from_ast.NewUnionTypeNode(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([trueType, falseType])));
        }
        return void 0;
    }
    static $go$private$ls$transformDestructuringPatterns(f: isolatedDeclarationsFixer | undefined, bindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let enclosingVariableDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (!IsVariableDeclaration__from_ast(enclosingVariableDeclaration)) {
            return "";
        }
        let enclosingVarStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((enclosingVariableDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (!IsVariableStatement__from_ast(enclosingVarStmt)) {
            return "";
        }
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(enclosingVariableDeclaration);
        if (initializer === undefined) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        let newNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const newNodes$location = tsonicTypeScriptRuntime.boundLocation({}, () => newNodes, newNodes$next => newNodes = newNodes$next);
        let baseExprNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!IsIdentifier__from_ast(initializer)) {
            let tempName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, "dest", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
            let clonedInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, initializer);
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(tempName), void 0, void 0, clonedInitializer);
            let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
            let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, varDeclList);
            newNodes = newNodes.append(void 0, [varStmt]);
            baseExprNode = Node__from_ast.AsNode(tempName);
        }
        else {
            baseExprNode = NodeFactory__from_ast.NewIdentifier(factory, Node__from_ast.Text(initializer));
        }
        isolatedDeclarationsFixer.$go$private$ls$extractBindingElements(f, bindingPattern, baseExprNode, newNodes$location, enclosingVarStmt);
        if (newNodes.length === 0) {
            return "";
        }
        let declList: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined = Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(enclosingVarStmt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList);
        if (NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((declList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 1) {
            let remainingDecls = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_9 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((declList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
                const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
                let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                if (!tsonicTypeScriptRuntime.sameLocation(d, enclosingVariableDeclaration)) {
                    remainingDecls = remainingDecls.append(void 0, [d]);
                }
            }
            if (remainingDecls.length > 0) {
                const __gotots_argument_18 = newNodes;
                const __gotots_receiver_5 = factory;
                const __gotots_argument_15 = Node__from_ast.AsVariableStatement(enclosingVarStmt);
                const __gotots_store_3 = VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(enclosingVarStmt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value);
                const __gotots_argument_16 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
                    return ModifiersBase__from_ast.$fromStorage($go$storage);
                }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
                    return ModifiersBase__from_ast.$storageOf($go$value);
                }));
                const __gotots_argument_17 = NodeFactory__from_ast.UpdateVariableDeclarationList(factory, declList, NodeFactory__from_ast.NewNodeList(factory, remainingDecls), Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(VariableDeclarationList__from_ast.$storageOf(((declList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).NodeBase)).NodeDefault)).Node)).Flags);
                const __gotots_argument_19 = NodeFactory__from_ast.UpdateVariableStatement(__gotots_receiver_5, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
                newNodes = __gotots_argument_18.append(void 0, [__gotots_argument_19]);
            }
        }
        Tracker__from_change.ReplaceNodeWithNodes((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, enclosingVarStmt, newNodes, void 0);
        return Message__from_diagnostics.Localize($state__diagnostics.Extract_binding_expressions_to_variable, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    }
    static $go$private$ls$transformExportAssignment(f: isolatedDeclarationsFixer | undefined, defaultExport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let exportAssignment: {
            value: ExportAssignment__from_ast;
        } | undefined = Node__from_ast.AsExportAssignment(defaultExport);
        if ((exportAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
            return "";
        }
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (exportAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, expression, void 0);
        if (typeNode === undefined) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        let defaultIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, "_default");
        let clonedExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, expression);
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(defaultIdentifier), void 0, typeNode, clonedExpression);
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
        let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, varDeclList);
        let newExport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateExportAssignment(factory, Node__from_ast.AsExportAssignment(defaultExport), Node__from_ast.Modifiers(defaultExport), false, void 0, Node__from_ast.AsNode(defaultIdentifier));
        Tracker__from_change.ReplaceNodeWithNodes((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, defaultExport, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varStmt, newExport]), void 0);
        return Message__from_diagnostics.Localize($state__diagnostics.Extract_default_export_to_variable, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    }
    static $go$private$ls$transformExtendsClauseWithExpression(f: isolatedDeclarationsFixer | undefined, classDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let cd: {
            value: ClassDeclaration__from_ast;
        } | undefined = Node__from_ast.AsClassDeclaration(classDecl);
        let extendsClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses === undefined)) {
            const __gotots_range_8 = NodeList__from_ast.$storageOf((((cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
                let clause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
                if (HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(clause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindExtendsKeyword$constant__from_ast()) {
                    extendsClause = clause;
                    break;
                }
            }
        }
        if (extendsClause === undefined) {
            return "";
        }
        let heritageTypes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(extendsClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types;
        if (heritageTypes === undefined || NodeList__from_ast.$storageOf(((heritageTypes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return "";
        }
        let heritageExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((heritageTypes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(heritageExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression;
        let heritageTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = isolatedDeclarationsFixer.$go$private$ls$inferType(f, expression, void 0);
        if (heritageTypeNode === undefined) {
            return "";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        let baseName = "Anonymous";
        if (!(ClassDeclaration__from_ast.Name(cd) === undefined)) {
            baseName = Node__from_ast.Text(ClassDeclaration__from_ast.Name(cd)) + "Base";
        }
        let baseClassName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, baseName, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
        let clonedExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode(factory, expression);
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(factory, Node__from_ast.AsNode(baseClassName), void 0, heritageTypeNode, clonedExpression);
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl])), NodeFlagsConst$constant__from_ast());
        let varStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(factory, void 0, varDeclList);
        Tracker__from_change.InsertNodeBefore((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, classDecl, varStmt, false, LeadingTriviaOptionNone$constant__from_change());
        Tracker__from_change.ReplaceNode((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, heritageExpression, NodeFactory__from_ast.NewExpressionWithTypeArguments(factory, Node__from_ast.AsNode(baseClassName), void 0), void 0);
        return Message__from_diagnostics.Localize($state__diagnostics.Extract_base_class_to_variable, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    }
    static $go$private$ls$typeFromArraySpreadElements(f: isolatedDeclarationsFixer | undefined, node: {
        value: ArrayLiteralExpression__from_ast;
    } | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_4 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_20 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_21 = isConstAssertion;
        let isInConstContext = !(FindAncestor__from_ast(__gotots_argument_20, __gotots_argument_21) === undefined);
        if (!isInConstContext) {
            return void 0;
        }
        if (name === "") {
            name = "temp";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        const __gotots_receiver_6 = f;
        const __gotots_store_5 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_22 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_23 = name;
        const __gotots_argument_24 = isInConstContext;
        const __gotots_argument_25 = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
            return NodeList__from_ast.$storageOf((((Node__from_ast.AsArrayLiteralExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        };
        const __gotots_argument_26 = IsSpreadElement__from_ast;
        const __gotots_argument_27 = (expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewSpreadElement(factory, expr);
        };
        const __gotots_argument_28 = (elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewArrayLiteralExpression(factory, NodeFactory__from_ast.NewNodeList(factory, elements), true);
        };
        const __gotots_argument_29 = (types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            let restTypes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(types.length, null, void 0);
            const __gotots_range_14 = types;
            for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
                const __gotots_range_value_16 = __gotots_range_index_14;
                const __gotots_range_value_17 = __gotots_range_14.get(__gotots_range_index_14);
                let i = __gotots_range_value_16;
                let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_17;
                restTypes.set(i, NodeFactory__from_ast.NewRestTypeNode(factory, t));
            }
            return NodeFactory__from_ast.NewTupleTypeNode(factory, NodeFactory__from_ast.NewNodeList(factory, restTypes));
        };
        return isolatedDeclarationsFixer.$go$private$ls$typeFromSpreads(__gotots_receiver_6, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
    }
    static $go$private$ls$typeFromObjectSpreadAssignment(f: isolatedDeclarationsFixer | undefined, node: {
        value: ObjectLiteralExpression__from_ast;
    } | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_6 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_30 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_31 = isConstAssertion;
        let isInConstContext = !(FindAncestor__from_ast(__gotots_argument_30, __gotots_argument_31) === undefined);
        if (name === "") {
            name = "temp";
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        const __gotots_receiver_7 = f;
        const __gotots_store_7 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_32 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_33 = name;
        const __gotots_argument_34 = isInConstContext;
        const __gotots_argument_35 = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
            if (!((Node__from_ast.AsObjectLiteralExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties === undefined)) {
                return NodeList__from_ast.$storageOf((((Node__from_ast.AsObjectLiteralExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            }
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        };
        const __gotots_argument_36 = IsSpreadAssignment__from_ast;
        const __gotots_argument_37 = (expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewSpreadAssignment(factory, expr);
        };
        const __gotots_argument_38 = (elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewObjectLiteralExpression(factory, NodeFactory__from_ast.NewNodeList(factory, elements), true);
        };
        const __gotots_argument_39 = (types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewIntersectionTypeNode(factory, NodeFactory__from_ast.NewNodeList(factory, types));
        };
        return isolatedDeclarationsFixer.$go$private$ls$typeFromSpreads(__gotots_receiver_7, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39);
    }
    static $go$private$ls$typeFromSpreads(f: isolatedDeclarationsFixer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring, isInConstContext: bool, getChildren: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) | undefined, isSpread: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, createSpread: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, makeNodeOfKind: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, finalType: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        let intersectionTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const intersectionTypes$location = tsonicTypeScriptRuntime.boundLocation({}, () => intersectionTypes, intersectionTypes$next => intersectionTypes = intersectionTypes$next);
        let newSpreads = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const newSpreads$location = tsonicTypeScriptRuntime.boundLocation({}, () => newSpreads, newSpreads$next => newSpreads = newSpreads$next);
        let currentVariableProperties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const currentVariableProperties$location = tsonicTypeScriptRuntime.boundLocation({}, () => currentVariableProperties, currentVariableProperties$next => currentVariableProperties = currentVariableProperties$next);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsStatement__from_ast);
        const __gotots_callee_4 = getChildren;
        const __gotots_argument_40 = node;
        let children = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_40);
        const __gotots_range_16 = children;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
            const __gotots_range_value_19 = __gotots_range_16.get(__gotots_range_index_16);
            let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_19;
            const __gotots_callee_5 = isSpread;
            const __gotots_argument_41 = prop;
            if ((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41)) {
                isolatedDeclarationsFixer.$go$private$ls$finalizesVariablePart(f, factory, name, isInConstContext, statement, makeNodeOfKind, createSpread, currentVariableProperties$location, intersectionTypes$location, newSpreads$location);
                if (IsEntityNameExpression__from_ast(Node__from_ast.Expression(prop))) {
                    intersectionTypes = intersectionTypes.append(void 0, [isolatedDeclarationsFixer.$go$private$ls$createTypeOfFromEntityNameExpression(f, Node__from_ast.Expression(prop))]);
                    newSpreads = newSpreads.append(void 0, [prop]);
                }
                else {
                    isolatedDeclarationsFixer.$go$private$ls$makeSpreadVariable(f, factory, name, isInConstContext, statement, createSpread, Node__from_ast.Expression(prop), intersectionTypes$location, newSpreads$location);
                }
            }
            else {
                currentVariableProperties = currentVariableProperties.append(void 0, [prop]);
            }
        }
        if (newSpreads.length === 0) {
            return void 0;
        }
        isolatedDeclarationsFixer.$go$private$ls$finalizesVariablePart(f, factory, name, isInConstContext, statement, makeNodeOfKind, createSpread, currentVariableProperties$location, intersectionTypes$location, newSpreads$location);
        const __gotots_receiver_8 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker;
        const __gotots_argument_43 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile;
        const __gotots_argument_44 = node;
        const __gotots_callee_6 = makeNodeOfKind;
        const __gotots_argument_42 = newSpreads;
        const __gotots_argument_45 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
        const __gotots_argument_46 = void 0;
        Tracker__from_change.ReplaceNode(__gotots_receiver_8, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46);
        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mutatedTarget = true;
        const __gotots_callee_7 = finalType;
        const __gotots_argument_47 = intersectionTypes;
        return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
    }
    static $go$private$ls$typeToMinimizedReferenceType(f: isolatedDeclarationsFixer | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, enclosingDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.make(0, []);
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNodeEx((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t, enclosingDecl, flags, InternalFlagsWriteComputedProps$constant__from_nodebuilder(), idToSymbol);
        if (typeNode === undefined) {
            return void 0;
        }
        if (IsTypeReferenceNode__from_ast(typeNode) && !((Type__from_checker.ObjectFlags(t) & ObjectFlagsReference$constant__from_checker()) >>> 0 === 0)) {
            let typeArgs = Checker__from_checker.GetTypeArguments((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t);
            let nodeTypeArgs = Node__from_ast.TypeArguments(typeNode);
            if (typeArgs.length > 0 && nodeTypeArgs.length > 0) {
                let cutoff = endOfRequiredTypeParameters((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t);
                if (cutoff < nodeTypeArgs.length) {
                    let trimmedArgs: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, nodeTypeArgs.slice(0, cutoff, null));
                    typeNode = NodeFactory__from_ast.UpdateTypeReferenceNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, Node__from_ast.AsTypeReferenceNode(typeNode), TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, trimmedArgs);
                }
            }
        }
        const __gotots_results_3 = TryGetAutoImportableReferenceFromTypeNode__from_autoimport(typeNode, idToSymbol);
        let referenceTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_3[0];
        let importableSymbols = __gotots_results_3[1];
        if (!(referenceTypeNode === undefined)) {
            typeNode = referenceTypeNode;
            (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolsToImport = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolsToImport, importableSymbols, void 0);
        }
        return typeNode;
    }
}
export function needsParenthesizedExpressionForAssertion(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !IsEntityNameExpression__from_ast(node) && !IsCallExpression__from_ast(node) && !IsObjectLiteralExpression__from_ast(node) && !IsArrayLiteralExpression__from_ast(node);
}
export function createAsExpression(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (needsParenthesizedExpressionForAssertion(node)) {
        node = NodeFactory__from_ast.NewParenthesizedExpression(factory, node);
    }
    return NodeFactory__from_ast.NewAsExpression(factory, node, typeNode);
}
export function isExpandoPropertyDeclarationForFix(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && (IsPropertyAccessExpression__from_ast(node) || IsElementAccessExpression__from_ast(node) || IsBinaryExpression__from_ast(node));
}
export function findExpandoFunction(ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let expandoDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsStatement__from_ast(n)) {
            return FindAncestorQuit$constant__from_ast();
        }
        if (isExpandoPropertyDeclarationForFix(n)) {
            return FindAncestorTrue$constant__from_ast();
        }
        return FindAncestorFalse$constant__from_ast();
    });
    if (expandoDeclaration === undefined || !isExpandoPropertyDeclarationForFix(expandoDeclaration)) {
        return void 0;
    }
    let assignmentTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = expandoDeclaration;
    if (IsBinaryExpression__from_ast(assignmentTarget)) {
        assignmentTarget = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(assignmentTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
        if (!isExpandoPropertyDeclarationForFix(assignmentTarget)) {
            return void 0;
        }
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsPropertyAccessExpression__from_ast(assignmentTarget)) {
        expression = PropertyAccessExpression__from_ast.$storageOf(((Node__from_ast.AsPropertyAccessExpression(assignmentTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression;
    }
    else if (IsElementAccessExpression__from_ast(assignmentTarget)) {
        expression = ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(assignmentTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression;
    }
    else {
        return void 0;
    }
    let targetType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(ch, expression);
    if (targetType === undefined) {
        return void 0;
    }
    let properties = Checker__from_checker.GetPropertiesOfType(ch, targetType);
    let found = false;
    const __gotots_range_6 = properties;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_6;
        if (tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, expandoDeclaration)
            ||
                tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, Node__from_ast.$storageOf(((expandoDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            found = true;
            break;
        }
    }
    if (!found) {
        return void 0;
    }
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(targetType);
    if (__go_symbol === undefined || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) {
        return void 0;
    }
    let fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    if ((IsFunctionExpression__from_ast(fn) || IsArrowFunction__from_ast(fn)) && IsVariableDeclaration__from_ast(Node__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return Node__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (IsFunctionDeclaration__from_ast(fn)) {
        return fn;
    }
    return void 0;
}
export function isConstAssertion(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsAssertionExpression__from_ast(node)) {
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
        return IsConstTypeReference__from_ast(typeNode);
    }
    return false;
}
export function endOfRequiredTypeParameters(ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): int {
    let typeArgs = Checker__from_checker.GetTypeArguments(ch, t);
    if (typeArgs.length === 0) {
        return 0;
    }
    let target: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Type__from_checker.Target(t);
    if (target === undefined || Type__from_checker.AsInterfaceType(target) === undefined) {
        return typeArgs.length;
    }
    let typeParams = InterfaceType__from_checker.TypeParameters(Type__from_checker.AsInterfaceType(target));
    let localTypeParams = InterfaceType__from_checker.LocalTypeParameters(Type__from_checker.AsInterfaceType(target));
    let outerCount = typeParams.length - localTypeParams.length;
    const __gotots_range_10 = typeArgs;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
        const __gotots_range_value_10 = __gotots_range_index_10;
        let cutoff = __gotots_range_value_10;
        let localIdx = cutoff - outerCount;
        if (localIdx < 0 || localIdx >= localTypeParams.length || !typeParamHasDefault(localTypeParams.get(localIdx))) {
            continue;
        }
        let filledIn = Checker__from_checker.FillMissingTypeArguments(ch, typeArgs.slice(0, cutoff, null), typeParams, cutoff, false);
        let allMatch = true;
        const __gotots_range_11 = filledIn;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
            const __gotots_range_value_11 = __gotots_range_index_11;
            const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_11);
            let i = __gotots_range_value_11;
            let fill: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_12;
            if (!tsonicTypeScriptRuntime.sameLocation(fill, typeArgs.get(i))) {
                allMatch = false;
                break;
            }
        }
        if (allMatch) {
            return cutoff;
        }
    }
    return typeArgs.length;
}
export function typeParamHasDefault(tp: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(tp);
    if (sym === undefined) {
        return false;
    }
    const __gotots_range_15 = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
        const __gotots_range_value_18 = __gotots_range_15.get(__gotots_range_index_15);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
        if (IsTypeParameterDeclaration__from_ast(decl) && !(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType === undefined)) {
            return true;
        }
    }
    return false;
}
export function typeToStringForDiag(typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ct: Tracker__from_change | undefined): gostring {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: gostring = "";
    try {
        try {
            __gotots_return_block_0: {
                let savedFlags = EmitContext__from_printer.EmitFlags((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, typeNode);
                EmitContext__from_printer.SetEmitFlags((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, typeNode, (savedFlags | EFSingleLine$constant__from_printer()) >>> 0);
                let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, NewLineKindLF$constant__from_core(), false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext);
                const __gotots_results_2 = GetSingleLineStringWriter__from_printer();
                let writer: EmitTextWriter__from_printer | undefined = __gotots_results_2[0];
                let release: (() => void) | undefined = __gotots_results_2[1];
                const __gotots_callee_4: (() => void) | undefined = release;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_4);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                Printer__from_printer.Write(p, typeNode, sourceFile, writer, void 0);
                EmitContext__from_printer.SetEmitFlags((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, typeNode, savedFlags);
                const __gotots_receiver_4 = writer;
                let result = goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_4).String();
                if (result.length > 160) {
                    __gotots_return_0 = goStringSlice(result, 0, 157) + "...";
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
export function findAncestorWithMissingType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindAncestor__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (!$state.canHaveTypeAnnotationKinds.lookup(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            return false;
        }
        if (IsObjectBindingPattern__from_ast(n) || IsArrayBindingPattern__from_ast(n)) {
            return IsVariableDeclaration__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        return true;
    });
}
export function findBestFittingNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, span: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    for (; !(node === undefined) && Node__from_ast.End(node) < span.Pos() + span.Len();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    for (; !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.Pos(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === Node__from_ast.Pos(node) && Node__from_ast.End(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === Node__from_ast.End(node);) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (IsIdentifier__from_ast(node) && HasInitializer__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(Node__from_ast.Initializer(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined)) {
        return Node__from_ast.Initializer(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    if (IsIdentifier__from_ast(node) && IsShorthandPropertyAssignment__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return node;
}
export function isNamedDeclarationKind(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindArrowFunction$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindClassStaticBlockDeclaration$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindEnumMember$constant__from_ast():
        case KindExportSpecifier$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindImportClause$constant__from_ast():
        case KindImportEqualsDeclaration$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindJsxAttribute$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindNamespaceExportDeclaration$constant__from_ast():
        case KindNamespaceImport$constant__from_ast():
        case KindNamespaceExport$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindTypeParameter$constant__from_ast():
        case KindVariableDeclaration$constant__from_ast():
        case KindJSDocTypedefTag$constant__from_ast():
        case KindJSDocCallbackTag$constant__from_ast():
        case KindJSDocPropertyTag$constant__from_ast():
        case KindNamedTupleMember$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function isValueSignatureDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsFunctionExpression__from_ast(node) || IsArrowFunction__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsAccessor__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsConstructorDeclaration__from_ast(node);
}
export function getIdentifierNameForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (IsPropertyAccessExpression__from_ast(node)) {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node));
        if (IsIdentifier__from_ast(name) && !IsPrivateIdentifier__from_ast(name) && IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(name)) === KindUnknown$constant__from_ast()) {
            return Node__from_ast.Text(name);
        }
    }
    return "newLocal";
}
