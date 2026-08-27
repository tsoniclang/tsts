import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CodeActionParams as CodeActionParams__from_lsproto, Command as Command__from_lsproto, Diagnostic as Diagnostic__from_lsproto, DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { LanguageService } from "./languageservice.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { CodeActionKindQuickFix$constant as CodeActionKindQuickFix$constant__from_lsproto, CodeActionKindSourceFixAll$constant as CodeActionKindSourceFixAll$constant__from_lsproto, CodeActionKindSourceOrganizeImports$constant as CodeActionKindSourceOrganizeImports$constant__from_lsproto, CodeActionKindSourceRemoveUnusedImports$constant as CodeActionKindSourceRemoveUnusedImports$constant__from_lsproto, CodeActionKindSourceSortImports$constant as CodeActionKindSourceSortImports$constant__from_lsproto, CodeActionKind as CodeActionKind__from_lsproto, CodeAction as CodeAction__from_lsproto, CommandOrCodeAction as CommandOrCodeAction__from_lsproto, TextEdit as TextEdit__from_lsproto, WorkspaceEdit as WorkspaceEdit__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { Compare$int } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { Contains$SliceOf_Named_lsproto$CodeActionKind$Named_lsproto$CodeActionKind, Contains$SliceOf_int32$int32 } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_SliceOf_PointerTo_Named_lsproto$TextEdit as GoMap } from "../../../../../../support/maps.js";
import { getAllDiagnostics } from "./diagnostics.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class CodeFixProvider {
    declare private readonly $goType: void;
    public constructor(public ErrorCodes: RuntimeSlice<int32>, public GetCodeActions: (($0: GoInterface | undefined, $1: CodeFixContext | undefined) => [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<CodeAction> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined, public FixIds: RuntimeSlice<gostring>, public GetAllCodeActions: (($0: GoInterface | undefined, $1: CodeFixContext | undefined) => [
        CombinedCodeActions | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined) {
    }
    declare private readonly then?: never;
}
export class CodeFixContext {
    declare private readonly $goType: void;
    public constructor(public SourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public Span: TextRange__from_core, public ErrorCode: int32, public Program: {
        value: Program__from_compiler;
    } | undefined, public LS: LanguageService | undefined, public Diagnostic: {
        value: Diagnostic__from_lsproto;
    } | undefined, public Params: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined) {
    }
    declare private readonly then?: never;
}
export class CodeAction {
    declare private readonly $goType: void;
    public constructor(public Description: gostring, public Changes: RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>, public FixID: gostring, public FixAllDescription: gostring) {
    }
    declare private readonly then?: never;
    static Compare(a: tsonicTypeScriptRuntime.Location<CodeAction> | undefined, b: tsonicTypeScriptRuntime.Location<CodeAction> | undefined): int {
        {
            let c = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Description, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Description)));
            if (c !== 0) {
                return c;
            }
        }
        {
            let c = Compare$int(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Changes.length, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Changes.length);
            if (c !== 0) {
                return c;
            }
        }
        const __gotots_range_2 = ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Changes;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_index_2;
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_2;
            let edit: {
                value: TextEdit__from_lsproto;
            } | undefined = __gotots_range_value_3;
            {
                let c = TextEdit__from_lsproto.Compare(edit, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Changes.get(i));
                if (c !== 0) {
                    return c;
                }
            }
        }
        return 0;
    }
}
export class CombinedCodeActions {
    declare private readonly $goType: void;
    public constructor(public Description: gostring, public Changes: RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>) {
    }
    declare private readonly then?: never;
}
export function hasMultipleFixableDiagnostics(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, errorCodes: RuntimeSlice<int32>): bool {
    let allDiags = getAllDiagnostics(ctx, program, file);
    let count = 0;
    const __gotots_range_3 = allDiags;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_4;
        if (containsErrorCode(errorCodes, Diagnostic__from_ast.Code(d))) {
            count++;
            if (count >= 2) {
                return true;
            }
        }
    }
    return false;
}
export function codeActionKindContains(requestedKind: CodeActionKind__from_lsproto, actionKind: CodeActionKind__from_lsproto): bool {
    return requestedKind.$value === actionKind.$value || requestedKind.$value ===
        ((void CodeActionKind__from_lsproto,
            "") as string) || strings__from_gostdlib.HasPrefix(actionKind.$value, requestedKind.$value + ".");
}
export function isFixAllKind(kind: CodeActionKind__from_lsproto): bool {
    return codeActionKindContains(kind, CodeActionKindSourceFixAll$constant__from_lsproto());
}
export function wantsQuickFixes(only: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): bool {
    if (only === undefined || ((only ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>>).value.length === 0) {
        return true;
    }
    const __gotots_range_1 = ((only ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>>).value;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = new CodeActionKind__from_lsproto(__gotots_range_1.get(__gotots_range_index_1));
        let kind = __gotots_range_value_1;
        if (codeActionKindContains(kind, CodeActionKindQuickFix$constant__from_lsproto())) {
            return true;
        }
    }
    return false;
}
export function getOrganizeImportsActionTitle(ctx: GoInterface | undefined, kind: CodeActionKind__from_lsproto): gostring {
    let loc = FromContext__from_locale(ctx);
    switch (kind.$value) {
        case "source.removeUnusedImports": {
            return Message__from_diagnostics.Localize($state__diagnostics.Remove_Unused_Imports, Locale__from_locale.$copy(loc), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            break;
        }
        case "source.sortImports": {
            return Message__from_diagnostics.Localize($state__diagnostics.Sort_Imports, Locale__from_locale.$copy(loc), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            break;
        }
        default: {
            return Message__from_diagnostics.Localize($state__diagnostics.Organize_Imports, Locale__from_locale.$copy(loc), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            break;
        }
    }
}
export function getOrganizeImportsActionsForKind(requestedKind: CodeActionKind__from_lsproto): RuntimeSlice<gostring> {
    let organizeImportsKinds = RuntimeSlice.literal<gostring>([CodeActionKindSourceOrganizeImports$constant__from_lsproto().$value, CodeActionKindSourceRemoveUnusedImports$constant__from_lsproto().$value, CodeActionKindSourceSortImports$constant__from_lsproto().$value]);
    let result = RuntimeSlice.nil<gostring>();
    const __gotots_range_0 = organizeImportsKinds;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = new CodeActionKind__from_lsproto(__gotots_range_0.get(__gotots_range_index_0));
        let organizeKind = __gotots_range_value_0;
        if (codeActionKindContains(requestedKind, organizeKind)) {
            result = result.append(((void CodeActionKind__from_lsproto,
                "") as string), [organizeKind.$value]);
        }
    }
    if (Contains$SliceOf_Named_lsproto$CodeActionKind$Named_lsproto$CodeActionKind(result, requestedKind)) {
        return RuntimeSlice.literal<gostring>([requestedKind.$value]);
    }
    return result;
}
export function containsErrorCode(codes: RuntimeSlice<int32>, code: int32): bool {
    return Contains$SliceOf_int32$int32(codes, code);
}
export function convertToLSPCodeAction(action: tsonicTypeScriptRuntime.Location<CodeAction> | undefined, diag: {
    value: Diagnostic__from_lsproto;
} | undefined, uri: DocumentUri__from_lsproto): CommandOrCodeAction__from_lsproto {
    let kind = CodeActionKindQuickFix$constant__from_lsproto();
    const kind$location = tsonicTypeScriptRuntime.boundLocation({}, () => kind, kind$next => kind = kind$next);
    let changes: GoMapValue<DocumentUri__from_lsproto, RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>> = GoMap.make(1, [[uri, ((action ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Changes]]);
    const changes$location = tsonicTypeScriptRuntime.boundLocation({}, () => changes, changes$next => changes = changes$next);
    let diagnostics__shadow_1 = RuntimeSlice.literal<{
        value: Diagnostic__from_lsproto;
    } | undefined>([diag]);
    const diagnostics__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => diagnostics__shadow_1, diagnostics__shadow_1$next => diagnostics__shadow_1 = diagnostics__shadow_1$next);
    return CommandOrCodeAction__from_lsproto.$fromStorage({
        CodeAction: tsonicTypeScriptRuntime.location<CodeAction__from_lsproto>(new CodeAction__from_lsproto(((action ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeAction>).value.Description, kind$location, diagnostics__shadow_1$location, void 0, void 0, { value: new WorkspaceEdit__from_lsproto(changes$location, void 0, void 0) }, void 0, void 0, void 0)),
        Command: void 0
    });
}
