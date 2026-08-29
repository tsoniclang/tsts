import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { ImportAdder as ImportAdder__from_autoimport, View as View__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { TextEdit as TextEdit__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CodeFixContext } from "./codeactions.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Diagnostic as Diagnostic__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetContainingClass as GetContainingClass__from_ast, GetImplementsTypeNodes as GetImplementsTypeNodes__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, GetDeclarationModifierFlagsFromSymbol as GetDeclarationModifierFlagsFromSymbol__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { NewImportAdder as NewImportAdder__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { NewTracker as NewTracker__from_change, Tracker as Tracker__from_change } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Set$AddIfAbsent$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { CodeAction, CombinedCodeActions, containsErrorCode } from "./codeactions.js";
import { missingMemberFixer, newMissingMemberFixer, preserveOptionalFlagsAll$constant } from "./codeactions_missingmemberfixer.js";
import { getAllDiagnostics } from "./diagnostics.js";
import { LanguageService } from "./languageservice.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export const fixClassIncorrectlyImplementsInterfaceFixID$string: gostring = "fixClassIncorrectlyImplementsInterface";
export function getCodeActionsToFixClassIncorrectlyImplementsInterface(context__shadow_1: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
    RuntimeSlice<CodeAction | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        RuntimeSlice<CodeAction | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = [RuntimeSlice.nil<CodeAction | undefined>(), void 0];
    try {
        try {
            __gotots_return_block_0: {
                let classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getClass((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, TextRange__from_core.$copy((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Span));
                if (classDeclaration === undefined) {
                    __gotots_return_0 = [RuntimeSlice.nil<CodeAction | undefined>(), void 0];
                    break __gotots_return_block_0;
                }
                let implementsTypes = GetImplementsTypeNodes__from_ast(classDeclaration);
                let locale__shadow_1 = FromContext__from_locale(context__shadow_1);
                const __gotots_results_0 = Program__from_compiler.GetTypeCheckerForFile((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, context__shadow_1, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let typeChecker: {
                    value: Checker__from_checker;
                } | undefined = __gotots_results_0[0];
                let done: (() => void) | undefined = __gotots_results_0[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let actions = RuntimeSlice.nil<CodeAction | undefined>();
                const __gotots_range_0 = implementsTypes;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let implementedTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    let changeTracker: Tracker__from_change | undefined = NewTracker__from_change(context__shadow_1, Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program), LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters);
                    const __gotots_results_1 = createImportAdder(context__shadow_1, fixContext, typeChecker);
                    let importAdder: ImportAdder__from_autoimport | undefined = __gotots_results_1[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<CodeAction | undefined>(), err];
                        break __gotots_return_block_0;
                    }
                    addChanges(context__shadow_1, fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode);
                    let changes = getChanges(changeTracker, importAdder, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                    if (changes.length === 0) {
                        continue;
                    }
                    actions = actions.append(void 0, [new CodeAction(Message__from_diagnostics.Localize($state__diagnostics.Implement_interface_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(GetTextOfNode__from_scanner(implementedTypeNode))])), changes, fixClassIncorrectlyImplementsInterfaceFixID$string, Message__from_diagnostics.Localize($state__diagnostics.Implement_all_unimplemented_interfaces, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<$goInterface$Interface_void | undefined>())),]);
                }
                __gotots_return_0 = [actions, void 0];
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
export function getAllCodeActionsToFixClassIncorrectlyImplementsInterface(context__shadow_1: GoInterface | undefined, fixContext: CodeFixContext | undefined): [
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
                const __gotots_results_2 = Program__from_compiler.GetTypeCheckerForFile((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, context__shadow_1, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                let typeChecker: {
                    value: Checker__from_checker;
                } | undefined = __gotots_results_2[0];
                let done: (() => void) | undefined = __gotots_results_2[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let changeTracker: Tracker__from_change | undefined = NewTracker__from_change(context__shadow_1, Program__from_compiler.Options((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program), LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters);
                const __gotots_results_3 = createImportAdder(context__shadow_1, fixContext, typeChecker);
                let importAdder: ImportAdder__from_autoimport | undefined = __gotots_results_3[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
                if (!(err === undefined)) {
                    __gotots_return_0 = [void 0, err];
                    break __gotots_return_block_0;
                }
                let seenClassDeclarations = Set__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>({
                    M: GoMap.nil()
                });
                const seenClassDeclarations$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenClassDeclarations, seenClassDeclarations$next => seenClassDeclarations = seenClassDeclarations$next);
                const __gotots_range_1 = getAllDiagnostics(context__shadow_1, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
                    if (containsErrorCode($state.fixClassIncorrectlyImplementsInterfaceErrorCodes, Diagnostic__from_ast.Code(diag))) {
                        let classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getClass((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, NewTextRange__from_core(Diagnostic__from_ast.Pos(diag), Diagnostic__from_ast.End(diag)));
                        if (classDeclaration === undefined) {
                            continue;
                        }
                        if (Set$AddIfAbsent$PointerTo_Named_ast$Node(seenClassDeclarations$location, classDeclaration)) {
                            let implementsTypes = GetImplementsTypeNodes__from_ast(classDeclaration);
                            const __gotots_range_2 = implementsTypes;
                            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                                let implementedTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                                addChanges(context__shadow_1, fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode);
                            }
                        }
                    }
                }
                let changes = getChanges(changeTracker, importAdder, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
                if (changes.length === 0) {
                    __gotots_return_0 = [void 0, void 0];
                    break __gotots_return_block_0;
                }
                __gotots_return_0 = [new CombinedCodeActions(Message__from_diagnostics.Localize($state__diagnostics.Implement_all_unimplemented_interfaces, FromContext__from_locale(context__shadow_1), RuntimeSlice.nil<$goInterface$Interface_void | undefined>()), changes), void 0];
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
export function addChanges(context__shadow_1: GoInterface | undefined, fixContext: CodeFixContext | undefined, changeTracker: Tracker__from_change | undefined, importAdder: ImportAdder__from_autoimport | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, implementedTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let missingMemberFixer__shadow_1: missingMemberFixer | undefined = newMissingMemberFixer(changeTracker, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, typeChecker, LanguageService.UserPreferences((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), importAdder, FromContext__from_locale(context__shadow_1));
    let __go_constructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getConstructor(classDeclaration);
    let implementedType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(typeChecker, implementedTypeNode);
    let classType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(typeChecker, classDeclaration);
    if (Checker__from_checker.GetNumberIndexType(typeChecker, classType) === undefined) {
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createIndexSignatureDeclarationFromType(missingMemberFixer__shadow_1, classDeclaration, implementedType, Checker__from_checker.GetNumberType(typeChecker));
        if (!(member === undefined)) {
            insertInterfaceMemberNode(changeTracker, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, classDeclaration, __go_constructor, member);
        }
    }
    if (Checker__from_checker.GetStringIndexType(typeChecker, classType) === undefined) {
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createIndexSignatureDeclarationFromType(missingMemberFixer__shadow_1, classDeclaration, implementedType, Checker__from_checker.GetStringType(typeChecker));
        if (!(member === undefined)) {
            insertInterfaceMemberNode(changeTracker, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, classDeclaration, __go_constructor, member);
        }
    }
    let missingMembers = getMissingMembers(typeChecker, classDeclaration, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([implementedType]));
    const __gotots_range_3 = missingMembers;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let member: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_3;
        let memberNodes = missingMemberFixer.$go$private$ls$createMemberFromSymbol(missingMemberFixer__shadow_1, member, classDeclaration, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, void 0, preserveOptionalFlagsAll$constant());
        const __gotots_range_4 = memberNodes;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let memberNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            insertInterfaceMemberNode(changeTracker, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, classDeclaration, __go_constructor, memberNode);
        }
    }
}
export function getChanges(changeTracker: Tracker__from_change | undefined, importAdder: ImportAdder__from_autoimport | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<{
    value: TextEdit__from_lsproto;
} | undefined> {
    let fileChanges = Tracker__from_change.GetChanges(changeTracker).lookup(SourceFile__from_ast.FileName(sourceFile));
    let __gotots_logical_result_0 = !(importAdder === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_receiver_0 = importAdder;
        __gotots_logical_result_0 = goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_0).HasFixes();
    }
    if (__gotots_logical_result_0) {
        const __gotots_argument_0 = fileChanges;
        const __gotots_receiver_1 = importAdder;
        const __gotots_argument_1 = goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_1).Edits();
        fileChanges = goSliceAppendSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>(__gotots_argument_0, __gotots_argument_1, void 0);
    }
    return fileChanges;
}
export function insertInterfaceMemberNode(changeTracker: Tracker__from_change | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_constructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    if (__go_constructor === undefined) {
        Tracker__from_change.InsertMemberAtStart(changeTracker, sourceFile, classDeclaration, member);
    }
    else {
        Tracker__from_change.InsertNodeAfter(changeTracker, sourceFile, __go_constructor, member);
    }
}
export function getClass(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, span: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, span.Pos());
    if (token === undefined) {
        return void 0;
    }
    return GetContainingClass__from_ast(token);
}
export function getConstructor(classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (classDeclaration === undefined || Node__from_ast.MemberList(classDeclaration) === undefined) {
        return void 0;
    }
    const __gotots_range_5 = NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(classDeclaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        if (!(member === undefined) && IsConstructorDeclaration__from_ast(member)) {
            return member;
        }
    }
    return void 0;
}
export function getMissingMembers(typeChecker: {
    value: Checker__from_checker;
} | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, implementedTypes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    let inheritedMembers: SymbolTable__from_ast = getInheritedMembers(typeChecker, classDeclaration);
    let seenMembers: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []);
    let classMembers: SymbolTable__from_ast = new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.nil());
    if (!(Node__from_ast.Symbol(classDeclaration) === undefined)) {
        classMembers = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(classDeclaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members);
    }
    let missingMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    const __gotots_range_6 = implementedTypes;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let implementedType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_6;
        const __gotots_range_7 = Checker__from_checker.GetPropertiesOfType(typeChecker, implementedType);
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_7;
            if (__go_symbol === undefined) {
                continue;
            }
            if (!classMembers.$value.isNil() && !(classMembers.$value.lookup(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) === undefined)) {
                continue;
            }
            if (!(inheritedMembers.$value.lookup(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) === undefined) || !(seenMembers.lookup(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) === undefined)) {
                continue;
            }
            let flags = GetDeclarationModifierFlagsFromSymbol__from_checker(__go_symbol);
            if ((flags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0) {
                seenMembers.store(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
                missingMembers = missingMembers.append(void 0, [__go_symbol]);
            }
        }
    }
    return missingMembers;
}
export function getInheritedMembers(typeChecker: {
    value: Checker__from_checker;
} | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SymbolTable__from_ast {
    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassExtendsHeritageElement__from_ast(classDeclaration);
    if (typeNode === undefined) {
        return new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []));
    }
    let baseType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(typeChecker, (void Node__from_ast.AsNode,
        typeNode));
    if (baseType === undefined) {
        return new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []));
    }
    let inheritedMembers: SymbolTable__from_ast = new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []));
    const __gotots_range_8 = Checker__from_checker.GetPropertiesOfType(typeChecker, baseType);
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_8;
        if (__go_symbol === undefined) {
            continue;
        }
        let flags = GetDeclarationModifierFlagsFromSymbol__from_checker(__go_symbol);
        if ((flags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0) {
            inheritedMembers.$value.store(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
        }
    }
    return inheritedMembers;
}
export function createImportAdder(context__shadow_1: GoInterface | undefined, fixContext: CodeFixContext | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined): [
    ImportAdder__from_autoimport | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_4 = LanguageService.$go$private$ls$getPreparedAutoImportView((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
    let view: View__from_autoimport | undefined = __gotots_results_4[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
    if (!(err === undefined)) {
        return [void 0, err];
    }
    if (view === undefined) {
        return [void 0, void 0];
    }
    return [NewImportAdder__from_autoimport(context__shadow_1, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Program, typeChecker, (fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, view, LanguageService.FormatOptions((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS), ((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, LanguageService.UserPreferences((fixContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LS)), void 0];
}
