import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, JsxEmit as JsxEmit__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ImportAdder as ImportAdder__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { Diagnostic as Diagnostic__from_lsproto, Position as Position__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsIdentifier as IsIdentifier__from_ast, IsJsxClosingElement as IsJsxClosingElement__from_ast, IsJsxOpeningFragment as IsJsxOpeningFragment__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsJsxTagName as IsJsxTagName__from_ast, IsNamespaceExportDeclaration as IsNamespaceExportDeclaration__from_ast, IsTypeOnlyImportOrExportDeclaration as IsTypeOnlyImportOrExportDeclaration__from_ast, IsValidTypeOnlyAliasUseSite as IsValidTypeOnlyAliasUseSite__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompareBooleans as CompareBooleans__from_core, JsxEmitReact$constant as JsxEmitReact$constant__from_core, JsxEmitReactNative$constant as JsxEmitReactNative$constant__from_core, NewTextRange as NewTextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { Export as Export__from_autoimport, Fix as Fix__from_autoimport, NewImportAdder as NewImportAdder__from_autoimport, QueryKindCaseInsensitiveMatch$constant as QueryKindCaseInsensitiveMatch$constant__from_autoimport, QueryKindExactMatch$constant as QueryKindExactMatch$constant__from_autoimport, SymbolToExport as SymbolToExport__from_autoimport, View as View__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { AutoImportFixKindPromoteTypeOnly$constant as AutoImportFixKindPromoteTypeOnly$constant__from_lsproto, AutoImportFix as AutoImportFix__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, IsIntrinsicJsxName as IsIntrinsicJsxName__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsDynamicFileName as IsDynamicFileName__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { SortFunc$SliceOf_PointerTo_Named_ls$fixInfo$PointerTo_Named_ls$fixInfo } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { CodeAction, CodeFixContext, CombinedCodeActions, containsErrorCode } from "./codeactions.js";
import { LanguageService } from "./languageservice.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export const importFixID$string: gostring = "fixMissingImport";
export class fixInfo {
    declare private readonly $goType: void;
    public constructor(public fix: {
        value: Fix__from_autoimport;
    } | undefined, public symbolName: gostring, public errorIdentifierText: gostring, public isJsxNamespaceFix: bool) {
    }
    declare private readonly then?: never;
}
export function getImportCodeActions(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_0 = getFixInfos(ctx, fixContext, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorCode, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Span.Pos());
    let info = __gotots_results_0[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
    if (!(err === undefined)) {
        return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>(), err];
    }
    if (info.length === 0) {
        return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>(), void 0];
    }
    let actions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>();
    const __gotots_range_0 = info;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let fixInfo__shadow_1: fixInfo | undefined = __gotots_range_value_0;
        const __gotots_results_1 = Fix__from_autoimport.Edits((fixInfo__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fix, ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program), LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, LanguageService.UserPreferences((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS));
        let edits = __gotots_results_1[0];
        let description = __gotots_results_1[1];
        actions = actions.append(void 0, [
            tsonicTypeScriptRuntime.location<CodeAction>(new CodeAction(description, edits, importFixID$string, Message__from_diagnostics.Localize($state__diagnostics.Add_all_missing_imports, FromContext__from_locale(ctx), RuntimeSlice.nil<$goInterface$Interface_void | undefined>()))),
        ]);
    }
    return [actions, void 0];
}
export function getAllImportCodeActions(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
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
                if (IsDynamicFileName__from_tspath(SourceFile__from_ast.FileName((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile))) {
                    __gotots_return_0 = [void 0, void 0];
                    break __gotots_return_block_0;
                }
                let allDiagnostics = Program__from_compiler.GetSemanticDiagnostics((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let importDiags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
                const __gotots_range_1 = allDiagnostics;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
                    if (containsErrorCode($state.importFixErrorCodes, Diagnostic__from_ast.Code(diag))) {
                        importDiags = importDiags.append(void 0, [diag]);
                    }
                }
                if (importDiags.length === 0) {
                    __gotots_return_0 = [void 0, void 0];
                    break __gotots_return_block_0;
                }
                const __gotots_results_2 = LanguageService.$go$private$ls$getPreparedAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let view: View__from_autoimport | undefined = __gotots_results_2[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
                if (!(err === undefined)) {
                    __gotots_return_0 = [void 0, err];
                    break __gotots_return_block_0;
                }
                if (view === undefined) {
                    view = LanguageService.$go$private$ls$getCurrentAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                }
                const __gotots_results_3 = Program__from_compiler.GetTypeChecker((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_3[0];
                let done: (() => void) | undefined = __gotots_results_3[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let importAdder: ImportAdder__from_autoimport | undefined = NewImportAdder__from_autoimport(ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ch, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, view, LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, LanguageService.UserPreferences((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS));
                const __gotots_range_2 = importDiags;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_2;
                    {
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = addImportFromDiagnostic(ctx, importAdder, diag, fixContext);
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = [void 0, err__shadow_1];
                            break __gotots_return_block_0;
                        }
                    }
                }
                const __gotots_receiver_0 = importAdder;
                if (!goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_0).HasFixes()) {
                    __gotots_return_0 = [void 0, void 0];
                    break __gotots_return_block_0;
                }
                const __gotots_field_0 = Message__from_diagnostics.Localize($state__diagnostics.Add_all_missing_imports, FromContext__from_locale(ctx), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                const __gotots_receiver_1 = importAdder;
                const __gotots_field_1 = goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_1).Edits();
                const __gotots_results_4 = new CombinedCodeActions(__gotots_field_0, __gotots_field_1);
                const __gotots_results_5 = void 0;
                __gotots_return_0 = [__gotots_results_4, __gotots_results_5];
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
export function addImportFromDiagnostic(ctx: GoInterface | undefined, importAdder: ImportAdder__from_autoimport | undefined, diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, fixContext: CodeFixContext | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let diagFixContext: CodeFixContext | undefined = new CodeFixContext((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, NewTextRange__from_core(Diagnostic__from_ast.Pos(diag), Diagnostic__from_ast.End(diag)), Diagnostic__from_ast.Code(diag), (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, void 0, void 0);
    const __gotots_results_8 = getFixInfos(ctx, diagFixContext, Diagnostic__from_ast.Code(diag), Diagnostic__from_ast.Pos(diag));
    let infos = __gotots_results_8[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_8[1];
    if (!(err === undefined)) {
        return err;
    }
    if (infos.length > 0) {
        const __gotots_receiver_2 = importAdder;
        const __gotots_argument_0 = (infos.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fix;
        goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_2).AddImportFix(__gotots_argument_0);
    }
    return void 0;
}
export function getFixInfos(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined, errorCode: int32, pos: int): [
    RuntimeSlice<fixInfo | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        RuntimeSlice<fixInfo | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = [RuntimeSlice.nil<fixInfo | undefined>(), void 0];
    try {
        try {
            __gotots_return_block_0: {
                if (IsDynamicFileName__from_tspath(SourceFile__from_ast.FileName((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile))) {
                    __gotots_return_0 = [RuntimeSlice.nil<fixInfo | undefined>(), void 0];
                    break __gotots_return_block_0;
                }
                let symbolToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, pos);
                let view: View__from_autoimport | undefined = void 0;
                let info = RuntimeSlice.nil<fixInfo | undefined>();
                if (errorCode === Message__from_diagnostics.Code($state__diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead)) {
                    view = LanguageService.$go$private$ls$getCurrentAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                    info = getFixesInfoForUMDImport(ctx, fixContext, symbolToken, view);
                }
                else if (!IsIdentifier__from_ast(symbolToken)) {
                    __gotots_return_0 = [RuntimeSlice.nil<fixInfo | undefined>(), void 0];
                    break __gotots_return_block_0;
                }
                else if (errorCode === Message__from_diagnostics.Code($state__diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type)) {
                    const __gotots_results_6 = Program__from_compiler.GetTypeChecker((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx);
                    let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_6[0];
                    let done: (() => void) | undefined = __gotots_results_6[1];
                    const __gotots_callee_0: (() => void) | undefined = done;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                    let compilerOptions: {
                        value: CompilerOptions__from_core;
                    } | undefined = Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program);
                    let symbolNames = getSymbolNamesToImport((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, ch, symbolToken, compilerOptions);
                    let allTypeOnlyFixes = RuntimeSlice.nil<fixInfo | undefined>();
                    const __gotots_range_3 = symbolNames;
                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                        const __gotots_range_value_3 = symbolNameInfo.$copy(symbolNameInfo.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
                        let sn = __gotots_range_value_3;
                        if (!symbolNameInfo.$storageOf(sn).isTypeOnly) {
                            continue;
                        }
                        let fix: {
                            value: Fix__from_autoimport;
                        } | undefined = getTypeOnlyPromotionFix(ctx, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, symbolToken, symbolNameInfo.$storageOf(sn).name, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program);
                        if (!(fix === undefined)) {
                            allTypeOnlyFixes = allTypeOnlyFixes.append(void 0, [new fixInfo(fix, symbolNameInfo.$storageOf(sn).name, Node__from_ast.Text(symbolToken), false),]);
                        }
                    }
                    let diagnosticMessage = "";
                    if (!((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostic === undefined)) {
                        diagnosticMessage = ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Message.AsString();
                    }
                    if (allTypeOnlyFixes.length > 1 && diagnosticMessage !== "") {
                        const __gotots_range_4 = allTypeOnlyFixes;
                        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                            let fi: fixInfo | undefined = __gotots_range_value_4;
                            if (strings__from_gostdlib.Contains(diagnosticMessage, "'" + (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolName + "'")) {
                                info = info.append(void 0, [fi]);
                            }
                        }
                    }
                    if (info.length === 0) {
                        info = allTypeOnlyFixes;
                    }
                    __gotots_return_0 = [info, void 0];
                    break __gotots_return_block_0;
                }
                else {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    const __gotots_results_7 = LanguageService.$go$private$ls$getPreparedAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                    view = __gotots_results_7[0];
                    err = __gotots_results_7[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<fixInfo | undefined>(), err];
                        break __gotots_return_block_0;
                    }
                    if (!(view === undefined)) {
                        info = getFixesInfoForNonUMDImport(ctx, fixContext, symbolToken, view);
                    }
                }
                if (view === undefined) {
                    view = LanguageService.$go$private$ls$getCurrentAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                }
                __gotots_return_0 = [sortFixInfo(info, fixContext, view), void 0];
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
    return __gotots_return_0;
}
export function getFixesInfoForUMDImport(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined, token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, view: View__from_autoimport | undefined): RuntimeSlice<fixInfo | undefined> {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: RuntimeSlice<fixInfo | undefined> = RuntimeSlice.nil<fixInfo | undefined>();
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_9 = Program__from_compiler.GetTypeChecker((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_9[0];
                let done: (() => void) | undefined = __gotots_results_9[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let umdSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getUmdSymbol(token, ch);
                if (umdSymbol === undefined) {
                    __gotots_return_0 = RuntimeSlice.nil<fixInfo | undefined>();
                    break __gotots_return_block_0;
                }
                let __go_export: {
                    value: Export__from_autoimport;
                } | undefined = SymbolToExport__from_autoimport(umdSymbol, ch);
                let isValidTypeOnlyUseSite = IsValidTypeOnlyAliasUseSite__from_ast(token);
                let result = RuntimeSlice.nil<fixInfo | undefined>();
                const __gotots_range_5 = View__from_autoimport.GetFixes(view, ctx, __go_export, false, isValidTypeOnlyUseSite, void 0);
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                    const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                    let fix: {
                        value: Fix__from_autoimport;
                    } | undefined = __gotots_range_value_5;
                    let errorIdentifierText = "";
                    if (IsIdentifier__from_ast(token)) {
                        errorIdentifierText = Node__from_ast.Text(token);
                    }
                    result = result.append(void 0, [new fixInfo(fix, Symbol__from_ast.$storageOf(((umdSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, errorIdentifierText, false),]);
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
export function getUmdSymbol(token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let umdSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
    if (IsIdentifier__from_ast(token)) {
        umdSymbol = Checker__from_checker.GetResolvedSymbol(ch, token);
    }
    if (isUMDExportSymbol(umdSymbol)) {
        return umdSymbol;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if ((IsJsxOpeningLikeElement__from_ast(parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TagName(parent), token)) || IsJsxOpeningFragment__from_ast(parent)) {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsJsxOpeningLikeElement__from_ast(parent)) {
            location = token;
        }
        else {
            location = parent;
        }
        let jsxNamespace = Checker__from_checker.GetJsxNamespace(ch, parent);
        let parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, jsxNamespace, location, SymbolFlagsValue$constant__from_ast(), false);
        if (isUMDExportSymbol(parentSymbol)) {
            return parentSymbol;
        }
    }
    return void 0;
}
export function isUMDExportSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(__go_symbol === undefined) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0) === undefined) && IsNamespaceExportDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0));
}
export function getFixesInfoForNonUMDImport(ctx: GoInterface | undefined, fixContext: CodeFixContext | undefined, symbolToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, view: View__from_autoimport | undefined): RuntimeSlice<fixInfo | undefined> {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: RuntimeSlice<fixInfo | undefined> = RuntimeSlice.nil<fixInfo | undefined>();
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_11 = Program__from_compiler.GetTypeChecker((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, ctx);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_11[0];
                let done: (() => void) | undefined = __gotots_results_11[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let compilerOptions: {
                    value: CompilerOptions__from_core;
                } | undefined = Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program);
                let isValidTypeOnlyUseSite = IsValidTypeOnlyAliasUseSite__from_ast(symbolToken);
                let symbolNames = getSymbolNamesToImport((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, ch, symbolToken, compilerOptions);
                let allInfo = RuntimeSlice.nil<fixInfo | undefined>();
                let usagePosition = Converters__from_lsconv.PositionToLineAndCharacter(((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile), GetTokenPosOfNode__from_scanner(symbolToken, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, false) | 0);
                const usagePosition$location = tsonicTypeScriptRuntime.boundLocation({}, () => usagePosition, usagePosition$next => usagePosition = usagePosition$next);
                const __gotots_range_6 = symbolNames;
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                    const __gotots_range_value_6 = symbolNameInfo.$copy(symbolNameInfo.$fromStorage(__gotots_range_6.get(__gotots_range_index_6)));
                    let sn = __gotots_range_value_6;
                    if (symbolNameInfo.$storageOf(sn).isTypeOnly) {
                        continue;
                    }
                    let symbolName = symbolNameInfo.$storageOf(sn).name;
                    if (symbolName === "default") {
                        continue;
                    }
                    let isJSXTagName = symbolName === Node__from_ast.Text(symbolToken) && IsJsxTagName__from_ast(symbolToken);
                    let queryKind = QueryKindExactMatch$constant__from_autoimport();
                    if (isJSXTagName) {
                        queryKind = QueryKindCaseInsensitiveMatch$constant__from_autoimport();
                    }
                    let exports = View__from_autoimport.Search(view, symbolName, queryKind);
                    const __gotots_range_7 = exports;
                    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
                        let __go_export: {
                            value: Export__from_autoimport;
                        } | undefined = __gotots_range_value_7;
                        if (isJSXTagName && !(Export__from_autoimport.Name(__go_export) === symbolName || Export__from_autoimport.IsRenameable(__go_export))) {
                            continue;
                        }
                        let fixes = View__from_autoimport.GetFixes(view, ctx, __go_export, isJSXTagName, isValidTypeOnlyUseSite, usagePosition$location);
                        const __gotots_range_8 = fixes;
                        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
                            let fix: {
                                value: Fix__from_autoimport;
                            } | undefined = __gotots_range_value_8;
                            allInfo = allInfo.append(void 0, [new fixInfo(fix, symbolName, "", symbolName !== Node__from_ast.Text(symbolToken)),]);
                        }
                    }
                }
                __gotots_return_0 = allInfo;
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
export function getTypeOnlyPromotionFix(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbolToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolName: gostring, program: {
    value: Program__from_compiler;
} | undefined): {
    value: Fix__from_autoimport;
} | undefined {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: {
        value: Fix__from_autoimport;
    } | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_10 = Program__from_compiler.GetTypeChecker(program, ctx);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_10[0];
                let done: (() => void) | undefined = __gotots_results_10[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, symbolName, symbolToken, SymbolFlagsValue$constant__from_ast(), true);
                if (__go_symbol === undefined) {
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
                let typeOnlyAliasDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.GetTypeOnlyAliasDeclaration(ch, __go_symbol);
                if (typeOnlyAliasDeclaration === undefined || !tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(typeOnlyAliasDeclaration), sourceFile)) {
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
                __gotots_return_0 =
                    { value: new Fix__from_autoimport({ value: new AutoImportFix__from_lsproto(AutoImportFixKindPromoteTypeOnly$constant__from_lsproto(), "", 0, false, 0, "", 0, void 0, "") }, 0, false, "", typeOnlyAliasDeclaration) };
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
export type symbolNameInfo$Storage = {
    name: gostring;
    isTypeOnly: bool;
};
export class symbolNameInfo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: symbolNameInfo$Storage) {
    }
    public static $storageOf($source: symbolNameInfo): symbolNameInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: symbolNameInfo$Storage): symbolNameInfo {
        return new symbolNameInfo($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get isTypeOnly(): bool {
        return this.$storage.isTypeOnly;
    }
    public set isTypeOnly($value: bool) {
        this.$storage.isTypeOnly = $value;
    }
    static $zero(): symbolNameInfo {
        return new symbolNameInfo({
            name: "",
            isTypeOnly: false
        });
    }
    static $copy($source: symbolNameInfo): symbolNameInfo {
        return new symbolNameInfo({
            name: $source.$storage.name,
            isTypeOnly: $source.$storage.isTypeOnly
        });
    }
    declare private readonly then?: never;
}
export function getSymbolNamesToImport(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, symbolToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): RuntimeSlice<symbolNameInfo$Storage> {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((symbolToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if ((IsJsxOpeningLikeElement__from_ast(parent) || IsJsxClosingElement__from_ast(parent)) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TagName(parent), symbolToken) && jsxModeNeedsExplicitImport((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx)) {
        const __gotots_receiver_3 = ch;
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_1 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let jsxNamespace = Checker__from_checker.GetJsxNamespace(__gotots_receiver_3, __gotots_argument_1);
        if (needsJsxNamespaceFix(jsxNamespace, symbolToken, ch)) {
            let result = RuntimeSlice.nil<symbolNameInfo$Storage>();
            if (!IsIntrinsicJsxName__from_scanner(Node__from_ast.Text(symbolToken))) {
                let compSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, Node__from_ast.Text(symbolToken), symbolToken, SymbolFlagsValue$constant__from_ast(), false);
                if (compSymbol === undefined) {
                    const __gotots_slice_build_0 = result;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                            {
                                name: Node__from_ast.Text(symbolToken),
                                isTypeOnly: false
                            })));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<symbolNameInfo$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, symbolNameInfo.$storageOf(symbolNameInfo.$copy(symbolNameInfo.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                            {
                                name: Node__from_ast.Text(symbolToken),
                                isTypeOnly: false
                            })));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, symbolNameInfo.$storageOf(symbolNameInfo.$zero()));
                        }
                    }
                    result = __gotots_slice_build_1;
                }
                else if (!(Checker__from_checker.GetTypeOnlyAliasDeclaration(ch, compSymbol) === undefined)) {
                    const __gotots_slice_build_4 = result;
                    const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                    let __gotots_slice_build_5 = __gotots_slice_build_4;
                    if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                        __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                        __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                            {
                                name: Node__from_ast.Text(symbolToken),
                                isTypeOnly: true
                            })));
                    }
                    else {
                        __gotots_slice_build_5 = goSliceAllocate<symbolNameInfo$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                            __gotots_slice_build_5.set(__gotots_slice_build_7, symbolNameInfo.$storageOf(symbolNameInfo.$copy(symbolNameInfo.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                        }
                        __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                            {
                                name: Node__from_ast.Text(symbolToken),
                                isTypeOnly: true
                            })));
                        for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                            __gotots_slice_build_5.$initialize(__gotots_slice_build_7, symbolNameInfo.$storageOf(symbolNameInfo.$zero()));
                        }
                    }
                    result = __gotots_slice_build_5;
                }
            }
            let nsIsTypeOnly = false;
            {
                let nsSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, jsxNamespace, symbolToken, SymbolFlagsValue$constant__from_ast(), true);
                if (!(nsSymbol === undefined)) {
                    nsIsTypeOnly = !(Checker__from_checker.GetTypeOnlyAliasDeclaration(ch, nsSymbol) === undefined);
                }
            }
            const __gotots_slice_build_8 = result;
            const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
            let __gotots_slice_build_9 = __gotots_slice_build_8;
            if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                    {
                        name: jsxNamespace,
                        isTypeOnly: nsIsTypeOnly
                    })));
            }
            else {
                __gotots_slice_build_9 = goSliceAllocate<symbolNameInfo$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.set(__gotots_slice_build_11, symbolNameInfo.$storageOf(symbolNameInfo.$copy(symbolNameInfo.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                }
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
                    {
                        name: jsxNamespace,
                        isTypeOnly: nsIsTypeOnly
                    })));
                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, symbolNameInfo.$storageOf(symbolNameInfo.$zero()));
                }
            }
            result = __gotots_slice_build_9;
            return result;
        }
    }
    let tokenIsTypeOnly = false;
    {
        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, Node__from_ast.Text(symbolToken), symbolToken, SymbolFlagsValue$constant__from_ast(), true);
        if (!(sym === undefined)) {
            tokenIsTypeOnly = !(Checker__from_checker.GetTypeOnlyAliasDeclaration(ch, sym) === undefined);
        }
    }
    return RuntimeSlice.literal<symbolNameInfo$Storage>([
        (void symbolNameInfo.$storageOf, (void symbolNameInfo.$fromStorage,
            {
                name: Node__from_ast.Text(symbolToken),
                isTypeOnly: tokenIsTypeOnly
            })),
    ]);
}
export function needsJsxNamespaceFix(jsxNamespace: gostring, symbolToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    if (IsIntrinsicJsxName__from_scanner(Node__from_ast.Text(symbolToken))) {
        return true;
    }
    let namespaceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(ch, jsxNamespace, symbolToken, SymbolFlagsValue$constant__from_ast(), true);
    if (namespaceSymbol === undefined) {
        return true;
    }
    if (ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((namespaceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsTypeOnlyImportOrExportDeclaration__from_ast)) {
        return ((Symbol__from_ast.$storageOf(((namespaceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsValue$constant__from_ast()) >>> 0) === 0;
    }
    return false;
}
export function jsxModeNeedsExplicitImport(jsx: JsxEmit__from_core): bool {
    return jsx === JsxEmitReact$constant__from_core() || jsx === JsxEmitReactNative$constant__from_core();
}
export function sortFixInfo(fixes: RuntimeSlice<fixInfo | undefined>, fixContext: CodeFixContext | undefined, view: View__from_autoimport | undefined): RuntimeSlice<fixInfo | undefined> {
    if (fixes.length === 0) {
        return fixes;
    }
    let sorted = RuntimeSlice.make<fixInfo | undefined>(fixes.length, null, void 0);
    RuntimeSlice.copy<fixInfo | undefined>(sorted, fixes);
    SortFunc$SliceOf_PointerTo_Named_ls$fixInfo$PointerTo_Named_ls$fixInfo(sorted, (a: fixInfo | undefined, b: fixInfo | undefined): int => {
        {
            let cmp = CompareBooleans__from_core((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isJsxNamespaceFix, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isJsxNamespaceFix);
            if (cmp !== 0) {
                return cmp;
            }
        }
        return View__from_autoimport.CompareFixesForSorting(view, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fix, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fix);
    });
    return sorted;
}
