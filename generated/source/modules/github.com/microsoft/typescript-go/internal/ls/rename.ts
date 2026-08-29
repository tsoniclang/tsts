import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { QuotePreference as QuotePreference__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { GetSourceFileOfNode as GetSourceFileOfNode__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IsImportSpecifier as IsImportSpecifier__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetClientCapabilities as GetClientCapabilities__from_lsproto, Range as Range__from_lsproto, ResourceOperationKindRename$constant as ResourceOperationKindRename$constant__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { ParseNodeModuleFromPath as ParseNodeModuleFromPath__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { IsDeclarationFileName as IsDeclarationFileName__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { Contains$SliceOf_Named_lsproto$ResourceOperationKind$Named_lsproto$ResourceOperationKind } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { isInsideNodeModules } from "./symbols.js";
import { isLiteralNameOfPropertyDeclarationOrIndexAccess } from "./utilities.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class RenameInfo {
    declare private readonly $goType: void;
    public constructor(public CanRename: bool, public LocalizedErrorMessage: gostring, public DisplayName: gostring, public TriggerSpan: Range__from_lsproto, public FileToRename: gostring, public NewFileName: gostring) {
    }
    static $zero(): RenameInfo {
        return new RenameInfo(false, "", "", Range__from_lsproto.$zero(), "", "");
    }
    static $copy($source: RenameInfo): RenameInfo {
        return new RenameInfo($source.CanRename, $source.LocalizedErrorMessage, $source.DisplayName, Range__from_lsproto.$copy($source.TriggerSpan), $source.FileToRename, $source.NewFileName);
    }
    declare private readonly then?: never;
}
export function nodeIsEligibleForRename(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindPrivateIdentifier$constant__from_ast():
        case KindStringLiteral$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindThisKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindNumericLiteral$constant__from_ast(): {
            return isLiteralNameOfPropertyDeclarationOrIndexAccess(node);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isDefinedInLibraryFile(program: {
    value: Program__from_compiler;
} | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let declSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(declaration);
    return Program__from_compiler.IsSourceFileDefaultLibrary(program, SourceFile__from_ast.Path(declSourceFile)) && IsDeclarationFileName__from_tspath(SourceFile__from_ast.FileName(declSourceFile));
}
export function wouldRenameInOtherNodeModules(originalFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ch: {
    value: Checker__from_checker;
} | undefined, preferences: UserPreferences__from_lsutil): {
    value: Message__from_diagnostics;
} | undefined {
    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
    if (!Tristate_IsTrue__from_core(preferences.UseAliasesForRename) && !((Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        let importSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsImportSpecifier__from_ast);
        if (!(importSpecifier === undefined) && ImportSpecifier__from_ast.$storageOf(((Node__from_ast.AsImportSpecifier(importSpecifier) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined) {
            sym = Checker__from_checker.GetAliasedSymbol(ch, sym);
        }
    }
    let declarations = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    if (declarations.length === 0) {
        return void 0;
    }
    let originalPackage = ParseNodeModuleFromPath__from___go_module(SourceFile__from_ast.FileName(originalFile), false);
    if (originalPackage === "") {
        const __gotots_range_0 = declarations;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            if (isInsideNodeModules(SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(declaration)))) {
                return $state__diagnostics.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder;
            }
        }
        return void 0;
    }
    const __gotots_range_1 = declarations;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        let declPackage = ParseNodeModuleFromPath__from___go_module(SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(declaration)), false);
        if (declPackage !== "" && declPackage !== originalPackage) {
            return $state__diagnostics.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder;
        }
    }
    return void 0;
}
export function ClientSupportsWillRenameFiles(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.FileOperations.WillRename;
}
export function ClientSupportsDocumentChanges(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.WorkspaceEdit.DocumentChanges;
}
export function ClientSupportsRenameResourceOperations(ctx: GoInterface | undefined): bool {
    return Contains$SliceOf_Named_lsproto$ResourceOperationKind$Named_lsproto$ResourceOperationKind(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.WorkspaceEdit.ResourceOperations, ResourceOperationKindRename$constant__from_lsproto());
}
export function getQuoteFromPreference(quotePreference: QuotePreference__from_lsutil): gostring {
    if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
        return "'";
    }
    return "\"";
}
export function getRenameInfoError(ctx: GoInterface | undefined, message: {
    value: Message__from_diagnostics;
} | undefined): RenameInfo {
    return new RenameInfo(false, Message__from_diagnostics.Localize(message, FromContext__from_locale(ctx), RuntimeSlice.nil<$goInterface$Interface_void | undefined>()), "", Range__from_lsproto.$zero(), "", "");
}
export function getRenameInfoSuccess(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, displayName: gostring, converters: {
    value: Converters__from_lsconv;
} | undefined): RenameInfo {
    let start = GetStartOfNode__from_astnav(node, sourceFile, false);
    let end = Node__from_ast.End(node);
    if (IsStringLiteralLike__from_ast(node)) {
        start++;
        end--;
    }
    return new RenameInfo(true, "", displayName, Converters__from_lsconv.ToLSPRange(converters, new GoInterfaceAdapter(sourceFile), NewTextRange__from_core(start, end)), "", "");
}
