import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BindingPattern as BindingPattern__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, NamedImports as NamedImports__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Converters as Converters__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { QuotePreference as QuotePreference__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { AddAsTypeOnly as AddAsTypeOnly__from_lsproto, AutoImportFixKind as AutoImportFixKind__from_lsproto, AutoImportFix as AutoImportFix__from_lsproto, ImportKind as ImportKind__from_lsproto, TextEdit as TextEdit__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { ResultKind as ResultKind__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { Export } from "./export.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { ExpressionBase as ExpressionBase__from_ast, Identifier as Identifier__from_ast, ImportClause as ImportClause__from_ast, ImportSpecifier as ImportSpecifier__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsAnyImportSyntax as IsAnyImportSyntax__from_ast, IsExternalModuleReference as IsExternalModuleReference__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsRequireVariableStatement as IsRequireVariableStatement__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsVariableDeclarationInitializedToRequire as IsVariableDeclarationInitializedToRequire__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SourceFile as SourceFile__from_ast, StatementBase as StatementBase__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TryGetImportFromModuleSpecifier as TryGetImportFromModuleSpecifier__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { TryGetModuleSpecifierFromDeclaration as TryGetModuleSpecifierFromDeclaration__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompareBooleans as CompareBooleans__from_core, CompilerOptions as CompilerOptions__from_core, ModuleDetectionKindForce$constant as ModuleDetectionKindForce$constant__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, NewTextRange as NewTextRange__from_core, SingleElementSlice as SingleElementSlice__from_core, TSFalse$constant as TSFalse$constant__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromContext as FromContext__from_locale, Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { LeadingTriviaOptionExclude$constant as LeadingTriviaOptionExclude$constant__from_change, LeadingTriviaOptionNone$constant as LeadingTriviaOptionNone$constant__from_change, NewTracker as NewTracker__from_change, NodeOptions as NodeOptions__from_change, Tracker as Tracker__from_change } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { CompareImportsOrRequireStatements as CompareImportsOrRequireStatements__from_lsutil, FormatCodeSettings as FormatCodeSettings__from_lsutil, GetFirstToken as GetFirstToken__from_lsutil, GetImportDeclarationInsertIndex as GetImportDeclarationInsertIndex__from_lsutil, GetImportSpecifierInsertionIndex as GetImportSpecifierInsertionIndex__from_lsutil, GetNamedImportSpecifierComparerWithDetection as GetNamedImportSpecifierComparerWithDetection__from_lsutil, GetOrganizeImportsStringComparerWithDetection as GetOrganizeImportsStringComparerWithDetection__from_lsutil, GetQuotePreference as GetQuotePreference__from_lsutil, QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { AddAsTypeOnlyAllowed$constant as AddAsTypeOnlyAllowed$constant__from_lsproto, AddAsTypeOnlyNotAllowed$constant as AddAsTypeOnlyNotAllowed$constant__from_lsproto, AddAsTypeOnlyRequired$constant as AddAsTypeOnlyRequired$constant__from_lsproto, AutoImportFixKindAddNew$constant as AutoImportFixKindAddNew$constant__from_lsproto, AutoImportFixKindAddToExisting$constant as AutoImportFixKindAddToExisting$constant__from_lsproto, AutoImportFixKindJsdocTypeImport$constant as AutoImportFixKindJsdocTypeImport$constant__from_lsproto, AutoImportFixKindPromoteTypeOnly$constant as AutoImportFixKindPromoteTypeOnly$constant__from_lsproto, AutoImportFixKindUseNamespace$constant as AutoImportFixKindUseNamespace$constant__from_lsproto, ImportKindCommonJS$constant as ImportKindCommonJS$constant__from_lsproto, ImportKindDefault$constant as ImportKindDefault$constant__from_lsproto, ImportKindNamed$constant as ImportKindNamed$constant__from_lsproto, ImportKindNamespace$constant as ImportKindNamespace$constant__from_lsproto, Position as Position__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { ResultKindRelative$constant as ResultKindRelative$constant__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, GetTextOfNode as GetTextOfNode__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, Scanner as Scanner__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Every$PointerTo_Named_autoimport$newImportBinding } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { IfElse$Named_ast$Kind, IfElse$Named_ast$TokenFlags, IfElse$PointerTo_Named_ast$Node, IfElse$PointerTo_Named_autoimport$newImportBinding, IfElse$SliceOf_PointerTo_Named_autoimport$newImportBinding } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, Map$PointerTo_Named_autoimport$newImportBinding$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Some$PointerTo_Named_autoimport$newImportBinding } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Index.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { ExportSyntaxCommonJSExportsProperty$constant, ExportSyntaxCommonJSModuleExports$constant, ExportSyntaxDefaultDeclaration$constant, ExportSyntaxDefaultModifier$constant, ExportSyntaxEquals$constant, ExportSyntaxModifier$constant, ExportSyntaxNamed$constant, ExportSyntaxStar$constant, ExportSyntaxUMD$constant } from "./export.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class newImportBinding {
    declare private readonly $goType: void;
    public constructor(public kind: ImportKind__from_lsproto, public propertyName: gostring, public name: gostring, public addAsTypeOnly: AddAsTypeOnly__from_lsproto) {
    }
    declare private readonly then?: never;
}
export class Fix {
    declare private readonly $goType: void;
    public constructor(public AutoImportFix: {
        value: AutoImportFix__from_lsproto;
    } | undefined, public ModuleSpecifierKind: ResultKind__from_modulespecifiers, public IsReExport: bool, public ModuleFileName: gostring, public TypeOnlyAliasDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: Fix): Fix {
        return new Fix($source.AutoImportFix, $source.ModuleSpecifierKind, $source.IsReExport, $source.ModuleFileName, $source.TypeOnlyAliasDeclaration);
    }
    static $equal($left: Fix, $right: Fix): bool {
        return $left.AutoImportFix
            ===
                $right.AutoImportFix
            && $left.ModuleSpecifierKind === $right.ModuleSpecifierKind && $left.IsReExport === $right.IsReExport && $left.ModuleFileName === $right.ModuleFileName &&
            tsonicTypeScriptRuntime.sameLocation($left.TypeOnlyAliasDeclaration, $right.TypeOnlyAliasDeclaration);
    }
    static $hash($source: Fix): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.AutoImportFix));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ModuleSpecifierKind));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.IsReExport));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ModuleFileName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.TypeOnlyAliasDeclaration));
        return $hash;
    }
    declare private readonly then?: never;
    static Edits(f: {
        value: Fix;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, formatOptions: FormatCodeSettings__from_lsutil, converters: {
        value: Converters__from_lsconv;
    } | undefined, preferences: UserPreferences__from_lsutil): [
        RuntimeSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>,
        gostring
    ] {
        let locale__shadow_1 = FromContext__from_locale(ctx);
        let tracker: Tracker__from_change | undefined = NewTracker__from_change(ctx, compilerOptions, FormatCodeSettings__from_lsutil.$copy(formatOptions), converters);
        switch (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind) {
            case AutoImportFixKindUseNamespace$constant__from_lsproto(): {
                let description = addNamespaceQualifier(f, tracker, file, Locale__from_locale.$copy(locale__shadow_1));
                return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), description];
                break;
            }
            case AutoImportFixKindAddToExisting$constant__from_lsproto(): {
                if (SourceFile__from_ast.Imports(file).length <= ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportIndex) {
                    const __gotots_argument_31 = new $goInterfaceAdapter$string("import index out of range");
                    GoPanic.raise(__gotots_argument_31 === undefined ? GoPanicNilValue.create() : __gotots_argument_31);
                }
                let existingFix: addToExistingImportFix | undefined = getAddToExistingImportFix(file, f);
                addToExistingImport(tracker, file, (existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importClauseOrBindingPattern, (existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport, SingleElementSlice__from_core<newImportBinding>((existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImport), UserPreferences__from_lsutil.$copy(preferences));
                return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), Message__from_diagnostics.Localize($state__diagnostics.Update_import_from_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier)]))];
                break;
            }
            case AutoImportFixKindAddNew$constant__from_lsproto(): {
                let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                let defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = IfElse$PointerTo_Named_autoimport$newImportBinding(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindDefault$constant__from_lsproto(), tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(0, "", ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)), void 0);
                let namedImports = IfElse$SliceOf_PointerTo_Named_autoimport$newImportBinding(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindNamed$constant__from_lsproto(), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>([
                    tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(0, "", ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)),
                ]), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>());
                let namespaceLikeImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = void 0;
                if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindNamespace$constant__from_lsproto() || ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindCommonJS$constant__from_lsproto()) {
                    namespaceLikeImport =
                        tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind, "", ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, 0));
                }
                let quotePreference = GetQuotePreference__from_lsutil(file, UserPreferences__from_lsutil.$copy(preferences));
                if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseRequire) {
                    declarations = getNewRequires(tracker, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions);
                }
                else {
                    declarations = getNewImports(tracker, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions, UserPreferences__from_lsutil.$copy(preferences));
                }
                insertImports(tracker, file, declarations, true, UserPreferences__from_lsutil.$copy(preferences));
                return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), Message__from_diagnostics.Localize($state__diagnostics.Add_import_from_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier)]))];
                break;
            }
            case AutoImportFixKindPromoteTypeOnly$constant__from_lsproto(): {
                let promotedDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = promoteFromTypeOnly(tracker, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeOnlyAliasDeclaration, compilerOptions, file, UserPreferences__from_lsutil.$copy(preferences));
                if (Node__from_ast.$storageOf(((promotedDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast()) {
                    let moduleSpec__shadow_1 = getModuleSpecifierText(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((promotedDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), Message__from_diagnostics.Localize($state__diagnostics.Remove_type_from_import_of_0_from_1, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name), new $goInterfaceAdapter$string(moduleSpec__shadow_1)]))];
                }
                let moduleSpec = getModuleSpecifierText(promotedDeclaration);
                return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), Message__from_diagnostics.Localize($state__diagnostics.Remove_type_from_import_declaration_from_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(moduleSpec)]))];
                break;
            }
            case AutoImportFixKindJsdocTypeImport$constant__from_lsproto(): {
                let description = addImportType(f, file, UserPreferences__from_lsutil.$copy(preferences), tracker, Locale__from_locale.$copy(locale__shadow_1));
                return [Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(file)), description];
                break;
            }
            default: {
                const __gotots_argument_32 = new $goInterfaceAdapter$string("unimplemented fix edit");
                GoPanic.raise(__gotots_argument_32 === undefined ? GoPanicNilValue.create() : __gotots_argument_32);
                break;
            }
        }
    }
}
export class addToExistingImportFix {
    declare private readonly $goType: void;
    public constructor(public importClauseOrBindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, public namedImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined) {
    }
    declare private readonly then?: never;
}
export function addImportType(f: {
    value: Fix;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, tracker: Tracker__from_change | undefined, locale__shadow_1: Locale__from_locale): gostring {
    if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UsagePosition === undefined) {
        const __gotots_argument_8 = new $goInterfaceAdapter$string("UsagePosition must be set for JSDoc type import fix");
        GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
    }
    let quotePreference = GetQuotePreference__from_lsutil(file, UserPreferences__from_lsutil.$copy(preferences));
    let quoteChar = "\"";
    if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
        quoteChar = "'";
    }
    let importTypePrefix = fmt__from_gostdlib.Sprintf("import(%s%s%s).", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(quoteChar), new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier), new $goInterfaceAdapter$string(quoteChar)]));
    Tracker__from_change.InsertText(tracker, file, Position__from_lsproto.$copy(Position__from_lsproto.$copy(((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UsagePosition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Position__from_lsproto>).value)), importTypePrefix);
    return Message__from_diagnostics.Localize($state__diagnostics.Change_0_to_1, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name), new $goInterfaceAdapter$string(importTypePrefix + ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name)]));
}
export function addNamespaceQualifier(f: {
    value: Fix;
} | undefined, tracker: Tracker__from_change | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, locale__shadow_1: Locale__from_locale): gostring {
    if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UsagePosition === undefined || ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamespacePrefix === "") {
        const __gotots_argument_7 = new $goInterfaceAdapter$string("namespace fix requires usage position and prefix");
        GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
    }
    let qualified = fmt__from_gostdlib.Sprintf("%s.%s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamespacePrefix), new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name)]));
    Tracker__from_change.InsertText(tracker, file, Position__from_lsproto.$copy(Position__from_lsproto.$copy(((((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UsagePosition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Position__from_lsproto>).value)), ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamespacePrefix + ".");
    return Message__from_diagnostics.Localize($state__diagnostics.Change_0_to_1, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name), new $goInterfaceAdapter$string(qualified)]));
}
export function getAddToExistingImportFix(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, fix: {
    value: Fix;
} | undefined): addToExistingImportFix | undefined {
    if (!(((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === AutoImportFixKindAddToExisting$constant__from_lsproto())) {
        const __gotots_argument_1 = new $goInterfaceAdapter$string("expected add to existing import fix");
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
    }
    let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SourceFile__from_ast.Imports(file).get(((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportIndex);
    let importNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetImportFromModuleSpecifier__from_ast(moduleSpecifier);
    if (importNode === undefined) {
        const __gotots_argument_2 = new $goInterfaceAdapter$string("expected import declaration");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
    }
    let importClauseOrBindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    switch (Node__from_ast.$storageOf(((importNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportDeclaration$constant__from_ast(): {
            importClauseOrBindingPattern = Node__from_ast.ImportClause(importNode);
            if (importClauseOrBindingPattern === undefined) {
                const __gotots_argument_3 = new $goInterfaceAdapter$string("expected import clause");
                GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
            }
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            if (!IsVariableDeclarationInitializedToRequire__from_ast(Node__from_ast.$storageOf(((importNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                const __gotots_argument_4 = new $goInterfaceAdapter$string("expected require call expression to be in variable declaration");
                GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
            }
            importClauseOrBindingPattern = Node__from_ast.Name(Node__from_ast.$storageOf(((importNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            if (importClauseOrBindingPattern === undefined || !IsObjectBindingPattern__from_ast(importClauseOrBindingPattern)) {
                const __gotots_argument_5 = new $goInterfaceAdapter$string("expected object binding pattern in variable declaration");
                GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
            }
            break;
        }
        default: {
            const __gotots_argument_6 = new $goInterfaceAdapter$string("expected import declaration or require call expression");
            GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
            break;
        }
    }
    let defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = IfElse$PointerTo_Named_autoimport$newImportBinding(((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindDefault$constant__from_lsproto(), tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindDefault$constant__from_lsproto(), "", ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)), void 0);
    let namedImports: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = IfElse$PointerTo_Named_autoimport$newImportBinding(((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindNamed$constant__from_lsproto(), tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindNamed$constant__from_lsproto(), "", ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)), void 0);
    return new addToExistingImportFix(importClauseOrBindingPattern, defaultImport, namedImports);
}
export function addToExistingImport(ct: Tracker__from_change | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importClauseOrBindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>, preferences: UserPreferences__from_lsutil): void {
    switch (Node__from_ast.$storageOf(((importClauseOrBindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindObjectBindingPattern$constant__from_ast(): {
            let bindingPattern: {
                value: BindingPattern__from_ast;
            } | undefined = Node__from_ast.AsBindingPattern(importClauseOrBindingPattern);
            if (!(defaultImport === undefined)) {
                addElementToBindingPattern(ct, file, bindingPattern, ((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name, "default");
            }
            const __gotots_range_2 = namedImports;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let namedImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = __gotots_range_value_2;
                addElementToBindingPattern(ct, file, bindingPattern, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name, "");
            }
            return;
            break;
        }
        case KindImportClause$constant__from_ast(): {
            let importClause: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause(importClauseOrBindingPattern);
            const __gotots_store_1 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
            let promoteFromTypeOnly__shadow_1 = Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf)) && Some$PointerTo_Named_autoimport$newImportBinding(namedImports.append(void 0, [defaultImport]), (i: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined): bool => {
                if (i === undefined) {
                    return false;
                }
                return ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto();
            });
            let existingSpecifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (!((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && Node__from_ast.$storageOf((((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()) {
                existingSpecifiers = Node__from_ast.Elements((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
            }
            if (!(defaultImport === undefined)) {
                Assert__from_debug(ImportClause__from_ast.Name(importClause) === undefined, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Cannot add a default import to an import clause that already has one")]));
                const __gotots_receiver_0 = ct;
                const __gotots_argument_12 = file;
                const __gotots_store_2 = NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_10 = file;
                const __gotots_argument_11 = false;
                const __gotots_argument_13 = GetStartOfNode__from_astnav(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11) | 0;
                const __gotots_argument_14 = NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name);
                const __gotots_field_0 = ", ";
                const __gotots_struct_0 = NodeOptions__from_change.$zero();
                __gotots_struct_0.Suffix = __gotots_field_0;
                const __gotots_argument_15 = __gotots_struct_0;
                Tracker__from_change.InsertNodeAt(__gotots_receiver_0, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
            }
            if (namedImports.length > 0) {
                const __gotots_results_1 = GetNamedImportSpecifierComparerWithDetection__from_lsutil((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent, file, UserPreferences__from_lsutil.$copy(preferences));
                let specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = __gotots_results_1[0];
                let isSorted = __gotots_results_1[1];
                let newSpecifiers = Map$PointerTo_Named_autoimport$newImportBinding$PointerTo_Named_ast$Node(namedImports, (namedImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName !== "") {
                        const __gotots_store_3 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                    Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                        identifier = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    }
                    const __gotots_receiver_1 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
                    const __gotots_store_4 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
                    const __gotots_argument_16 = (!Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf)) || promoteFromTypeOnly__shadow_1) && shouldUseTypeOnly(((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly, UserPreferences__from_lsutil.$copy(preferences));
                    const __gotots_argument_17 = identifier;
                    const __gotots_argument_18 = NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name);
                    return NodeFactory__from_ast.NewImportSpecifier(__gotots_receiver_1, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
                });
                SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newSpecifiers, specifierComparer);
                if (existingSpecifiers.length > 0 && !(isSorted === TSFalse$constant__from_core())) {
                    let specsToCompareAgainst = existingSpecifiers;
                    if (promoteFromTypeOnly__shadow_1 && existingSpecifiers.length > 0) {
                        specsToCompareAgainst = Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(existingSpecifiers, (e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                            let spec: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(e);
                            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                            if (!(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined)) {
                                propertyName = ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName;
                            }
                            let syntheticSpec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportSpecifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, true, propertyName, ImportSpecifier__from_ast.Name(spec));
                            return syntheticSpec;
                        });
                    }
                    const __gotots_range_3 = newSpecifiers;
                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                        let spec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                        let insertionIndex = GetImportSpecifierInsertionIndex__from_lsutil(specsToCompareAgainst, spec, specifierComparer);
                        Tracker__from_change.InsertImportSpecifierAtIndex(ct, file, spec, (importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings, insertionIndex);
                    }
                }
                else if (existingSpecifiers.length > 0) {
                    const __gotots_range_4 = newSpecifiers;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                        let spec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                        Tracker__from_change.InsertNodeInListAfter(ct, file, existingSpecifiers.get(existingSpecifiers.length - 1), (void Node__from_ast.AsNode,
                            spec), void 0);
                    }
                }
                else {
                    if (newSpecifiers.length > 0) {
                        let namedImports__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNamedImports((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNodeList((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, newSpecifiers));
                        if (!((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined)) {
                            Tracker__from_change.ReplaceNode(ct, file, (importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings, namedImports__shadow_1, void 0);
                        }
                        else {
                            if (ImportClause__from_ast.Name(importClause) === undefined) {
                                const __gotots_argument_19 = new $goInterfaceAdapter$string("Import clause must have either named imports or a default import");
                                GoPanic.raise(__gotots_argument_19 === undefined ? GoPanicNilValue.create() : __gotots_argument_19);
                            }
                            Tracker__from_change.InsertNodeAfter(ct, file, ImportClause__from_ast.Name(importClause), namedImports__shadow_1);
                        }
                    }
                }
            }
            if (promoteFromTypeOnly__shadow_1) {
                let typeKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getTypeKeywordOfTypeOnlyImport(importClause, file);
                Tracker__from_change.Delete(ct, file, typeKeyword);
                if (existingSpecifiers.length > 0) {
                    const __gotots_range_5 = existingSpecifiers;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                        if (!ImportSpecifier__from_ast.$storageOf(((Node__from_ast.AsImportSpecifier(specifier) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly) {
                            Tracker__from_change.InsertModifierBefore(ct, file, KindTypeKeyword$constant__from_ast(), specifier);
                        }
                    }
                }
            }
            break;
        }
        default: {
            const __gotots_argument_20 = new $goInterfaceAdapter$string("Unsupported clause kind: " + Node__from_ast.KindString(importClauseOrBindingPattern) + " for addToExistingImport");
            GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
            break;
        }
    }
}
export function getTypeKeywordOfTypeOnlyImport(importClause: {
    value: ImportClause__from_ast;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_store_6 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
        NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
    const __gotots_argument_26 = Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
    const __gotots_argument_27 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("import clause must be type-only")]);
    Assert__from_debug(__gotots_argument_26, __gotots_argument_27);
    const __gotots_store_7 = NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_28 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    const __gotots_argument_29 = KindTypeKeyword$constant__from_ast();
    const __gotots_argument_30 = sourceFile;
    let typeKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(__gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
    Assert__from_debug(!(typeKeyword === undefined), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("type-only import clause should have a type keyword")]));
    return typeKeyword;
}
export function addElementToBindingPattern(ct: Tracker__from_change | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, bindingPattern: {
    value: BindingPattern__from_ast;
} | undefined, name: gostring, propertyName: gostring): void {
    let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBindingElement((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, void 0, NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, name), IfElse$PointerTo_Named_ast$Node(propertyName === "", void 0, NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, propertyName)));
    if (NodeList__from_ast.$storageOf((((bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
        Tracker__from_change.InsertNodeInListAfter(ct, file, NodeList__from_ast.$storageOf((((bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf((((bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1), element, (bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
    }
    else {
        const __gotots_receiver_2 = ct;
        const __gotots_argument_22 = file;
        const __gotots_store_5 = NodeBase__from_ast.$storageOf((bindingPattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_23 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_24 = NodeFactory__from_ast.NewBindingPattern((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindObjectBindingPattern$constant__from_ast(), NodeFactory__from_ast.NewNodeList((void NodeFactory__from_ast.AsNodeFactory,
            (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([element])));
        const __gotots_argument_25 = void 0;
        Tracker__from_change.ReplaceNode(__gotots_receiver_2, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
    }
}
export function getNewImports(ct: Tracker__from_change | undefined, moduleSpecifier: gostring, quotePreference: QuotePreference__from_lsutil, defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>, namespaceLikeImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let tokenFlags = IfElse$Named_ast$TokenFlags(quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value, TokenFlagsSingleQuote$constant__from_ast(), TokenFlagsNone$constant__from_ast());
    let moduleSpecifierStringLiteral: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, moduleSpecifier, tokenFlags);
    let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    if (!(defaultImport === undefined) || namedImports.length > 0) {
        let topLevelTypeOnly = (defaultImport === undefined || needsTypeOnly(((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly)) && Every$PointerTo_Named_autoimport$newImportBinding(namedImports, (i: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined): bool => {
            return needsTypeOnly(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly);
        }) || (Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) || Tristate_IsTrue__from_core(preferences.PreferTypeOnlyAutoImports)) && (defaultImport === undefined || !(((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto())) && !Some$PointerTo_Named_autoimport$newImportBinding(namedImports, (i: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined): bool => {
            return ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto();
        });
        let defaultImportNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(defaultImport === undefined)) {
            defaultImportNode = NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name);
        }
        statements = statements.append(void 0, [makeImport(ct, defaultImportNode, Map$PointerTo_Named_autoimport$newImportBinding$PointerTo_Named_ast$Node(namedImports, (namedImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                let namedImportPropertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName !== "") {
                    namedImportPropertyName = NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName);
                }
                return NodeFactory__from_ast.NewImportSpecifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, !topLevelTypeOnly && shouldUseTypeOnly(((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly, UserPreferences__from_lsutil.$copy(preferences)), namedImportPropertyName, NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name));
            }), moduleSpecifierStringLiteral, topLevelTypeOnly)]);
    }
    if (!(namespaceLikeImport === undefined)) {
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.kind === ImportKindCommonJS$constant__from_lsproto()) {
            declaration = NodeFactory__from_ast.NewImportEqualsDeclaration((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, shouldUseTypeOnly(((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly, UserPreferences__from_lsutil.$copy(preferences)), NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name), NodeFactory__from_ast.NewExternalModuleReference((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, moduleSpecifierStringLiteral));
        }
        else {
            declaration = NodeFactory__from_ast.NewImportDeclaration((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, NodeFactory__from_ast.NewImportClause((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, IfElse$Named_ast$Kind(shouldUseTypeOnly(((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly, UserPreferences__from_lsutil.$copy(preferences)), KindTypeKeyword$constant__from_ast(), KindUnknown$constant__from_ast()), void 0, NodeFactory__from_ast.NewNamespaceImport((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewIdentifier((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name))), moduleSpecifierStringLiteral, void 0);
        }
        statements = statements.append(void 0, [declaration]);
    }
    if (statements.length === 0) {
        const __gotots_argument_21 = new $goInterfaceAdapter$string("No statements to insert for new imports");
        GoPanic.raise(__gotots_argument_21 === undefined ? GoPanicNilValue.create() : __gotots_argument_21);
    }
    return statements;
}
export function getNewRequires(changeTracker: Tracker__from_change | undefined, moduleSpecifier: gostring, quotePreference: QuotePreference__from_lsutil, defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>, namespaceLikeImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let quotedModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, moduleSpecifier, IfElse$Named_ast$TokenFlags(quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value, TokenFlagsSingleQuote$constant__from_ast(), TokenFlagsNone$constant__from_ast()));
    let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    if (!(defaultImport === undefined) || namedImports.length > 0) {
        let bindingElements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        const __gotots_range_6 = namedImports;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
            let namedImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = __gotots_range_value_6;
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName !== "") {
                propertyName = NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName);
            }
            bindingElements = bindingElements.append(void 0, [NodeFactory__from_ast.NewBindingElement((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, propertyName, NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name), void 0)]);
        }
        if (!(defaultImport === undefined)) {
            bindingElements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewBindingElement((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, "default"), NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name), void 0)]), bindingElements, void 0);
        }
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createConstEqualsRequireDeclaration(changeTracker, NodeFactory__from_ast.NewBindingPattern((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindObjectBindingPattern$constant__from_ast(), NodeFactory__from_ast.NewNodeList((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, bindingElements)), quotedModuleSpecifier);
        statements = statements.append(void 0, [declaration]);
    }
    if (!(namespaceLikeImport === undefined)) {
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createConstEqualsRequireDeclaration(changeTracker, NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ((namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name), quotedModuleSpecifier);
        statements = statements.append(void 0, [declaration]);
    }
    Assert__from_debug(!statements.isNil(), RuntimeSlice.nil<GoInterface | undefined>());
    return statements;
}
export function createConstEqualsRequireDeclaration(changeTracker: Tracker__from_change | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, quotedModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return NodeFactory__from_ast.NewVariableStatement((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, NodeFactory__from_ast.NewVariableDeclarationList((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNodeList((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewVariableDeclaration((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, name, void 0, void 0, NodeFactory__from_ast.NewCallExpression((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewIdentifier((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, "require"), void 0, void 0, NodeFactory__from_ast.NewNodeList((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([quotedModuleSpecifier])), NodeFlagsNone$constant__from_ast()))])), NodeFlagsConst$constant__from_ast()));
}
export function insertImports(ct: Tracker__from_change | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, imports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, blankLineBetween: bool, preferences: UserPreferences__from_lsutil): void {
    let existingImportStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    if (Node__from_ast.$storageOf(((imports.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableStatement$constant__from_ast()) {
        existingImportStatements = Filter$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsRequireVariableStatement__from_ast);
    }
    else {
        existingImportStatements = Filter$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsAnyImportSyntax__from_ast);
    }
    const __gotots_results_2 = GetOrganizeImportsStringComparerWithDetection__from_lsutil(existingImportStatements, UserPreferences__from_lsutil.$copy(preferences));
    let comparer: (($0: gostring, $1: gostring) => int) | undefined = __gotots_results_2[0];
    let isSorted = __gotots_results_2[1];
    let sortedNewImports = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(imports);
    SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(sortedNewImports, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        return CompareImportsOrRequireStatements__from_lsutil(a, b, comparer);
    });
    if (existingImportStatements.length > 0 && isSorted) {
        const __gotots_range_7 = sortedNewImports;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let newImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            let insertionIndex = GetImportDeclarationInsertIndex__from_lsutil(existingImportStatements, newImport, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                return CompareImportsOrRequireStatements__from_lsutil(a, b, comparer);
            });
            if (insertionIndex === 0) {
                let leadingTriviaOption = LeadingTriviaOptionNone$constant__from_change();
                if (tsonicTypeScriptRuntime.sameLocation(existingImportStatements.get(0), NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0))) {
                    leadingTriviaOption = LeadingTriviaOptionExclude$constant__from_change();
                }
                Tracker__from_change.InsertNodeBefore(ct, sourceFile, (void Node__from_ast.AsNode,
                    existingImportStatements.get(0)), (void Node__from_ast.AsNode,
                    newImport), false, leadingTriviaOption);
            }
            else {
                let prevImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = existingImportStatements.get(insertionIndex - 1);
                Tracker__from_change.InsertNodeAfter(ct, sourceFile, (void Node__from_ast.AsNode,
                    prevImport), (void Node__from_ast.AsNode,
                    newImport));
            }
        }
    }
    else if (existingImportStatements.length > 0) {
        Tracker__from_change.InsertNodesAfter(ct, sourceFile, existingImportStatements.get(existingImportStatements.length - 1), sortedNewImports);
    }
    else {
        Tracker__from_change.InsertAtTopOfFile(ct, sourceFile, sortedNewImports, blankLineBetween);
    }
}
export function makeImport(ct: Tracker__from_change | undefined, defaultImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isTypeOnly: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let newNamedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (namedImports.length > 0) {
        newNamedImports = NodeFactory__from_ast.NewNamedImports((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNodeList((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, namedImports));
    }
    let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (!(defaultImport === undefined) || !(newNamedImports === undefined)) {
        importClause = NodeFactory__from_ast.NewImportClause((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, IfElse$Named_ast$Kind(isTypeOnly, KindTypeKeyword$constant__from_ast(), KindUnknown$constant__from_ast()), defaultImport, newNamedImports);
    }
    return NodeFactory__from_ast.NewImportDeclaration((ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, importClause, moduleSpecifier, void 0);
}
export function getAddAsTypeOnly(isValidTypeOnlyUseSite: bool, __go_export: {
    value: Export;
} | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): AddAsTypeOnly__from_lsproto {
    if (!isValidTypeOnlyUseSite) {
        return AddAsTypeOnlyNotAllowed$constant__from_lsproto();
    }
    if (Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) && ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly || ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0) || (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly && !(((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0)) {
        return AddAsTypeOnlyRequired$constant__from_lsproto();
    }
    return AddAsTypeOnlyAllowed$constant__from_lsproto();
}
export function getNamespaceLikeImportText(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast(): {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(declaration);
            if (!(name === undefined) && Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                return Node__from_ast.Text(name);
            }
            return "";
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            return Node__from_ast.Text(Node__from_ast.Name(declaration));
            break;
        }
        case KindJSDocImportTag$constant__from_ast():
        case KindImportDeclaration$constant__from_ast(): {
            let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ImportClause(declaration);
            if (!(importClause === undefined) && !((Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && Node__from_ast.$storageOf((((Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceImport$constant__from_ast()) {
                return Node__from_ast.Text(Node__from_ast.Name((Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings));
            }
            return "";
            break;
        }
        default: {
            return "";
            break;
        }
    }
}
export function getImportKind(importingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, __go_export: {
    value: Export;
} | undefined, program: {
    value: Program__from_compiler;
} | undefined): ImportKind__from_lsproto {
    if (Tristate_IsTrue__from_core((Program__from_compiler.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) && Program__from_compiler.GetEmitModuleFormatOfFile(program, new GoInterfaceAdapter(importingFile)) === ModuleKindCommonJS$constant__from_core()) {
        return ImportKindCommonJS$constant__from_lsproto();
    }
    {
        const __gotots_switch_tag_0: Export["Syntax"] = (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Syntax;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0.$value === ExportSyntaxDefaultModifier$constant().$value;
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0.$value === ExportSyntaxDefaultDeclaration$constant().$value;
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0.$value === ExportSyntaxNamed$constant().$value;
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0.$value === ExportSyntaxModifier$constant().$value;
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0.$value === ExportSyntaxStar$constant().$value;
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0.$value === ExportSyntaxCommonJSExportsProperty$constant().$value;
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0.$value === ExportSyntaxEquals$constant().$value;
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0.$value === ExportSyntaxCommonJSModuleExports$constant().$value;
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0.$value === ExportSyntaxUMD$constant().$value;
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 4;
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return ImportKindDefault$constant__from_lsproto();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName === InternalSymbolNameDefault$string__from_ast) {
                    return ImportKindDefault$constant__from_lsproto();
                }
                __gotots_switch_selection_0 = 2;
            }
            if (__gotots_switch_selection_0 === 2) {
                return ImportKindNamed$constant__from_lsproto();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 3) {
                if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName !== InternalSymbolNameExportEquals$string__from_ast) {
                    return ImportKindNamed$constant__from_lsproto();
                }
                const __gotots_range_0 = NodeList__from_ast.$storageOf(((((importingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    if (IsImportEqualsDeclaration__from_ast(statement) && !NodeIsMissing__from_ast((Node__from_ast.AsImportEqualsDeclaration(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference)) {
                        return ImportKindCommonJS$constant__from_lsproto();
                    }
                }
                if (!(((importingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) || !IsSourceFileJS__from_ast(importingFile)) {
                    return ImportKindDefault$constant__from_lsproto();
                }
                return ImportKindCommonJS$constant__from_lsproto();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 4) {
                const __gotots_argument_0 = new $goInterfaceAdapter$string("unhandled export syntax kind: " + (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Syntax.String());
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                break __gotots_control_target_0;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export type existingImport$Storage = {
    node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    moduleSpecifier: gostring;
    index: int;
};
export class existingImport implements GoContainerStoredValue<existingImport$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: existingImport$Storage) {
    }
    public static $storageOf($source: existingImport): existingImport$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: existingImport$Storage): existingImport {
        return new existingImport($source);
    }
    public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.node;
    }
    public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.node = $value;
    }
    public get moduleSpecifier(): gostring {
        return this.$storage.moduleSpecifier;
    }
    public set moduleSpecifier($value: gostring) {
        this.$storage.moduleSpecifier = $value;
    }
    public get index(): int {
        return this.$storage.index;
    }
    public set index($value: int) {
        this.$storage.index = $value;
    }
    declare readonly [$goContainerStorageType]: existingImport$Storage;
    static $zero(): existingImport {
        return new existingImport({
            node: void 0,
            moduleSpecifier: "",
            index: 0
        });
    }
    static $copy($source: existingImport): existingImport {
        return new existingImport({
            node: $source.$storage.node,
            moduleSpecifier: $source.$storage.moduleSpecifier,
            index: $source.$storage.index
        });
    }
    declare private readonly then?: never;
}
export class fileSyntaxKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function fileSyntaxKindAmbiguous$constant(): fileSyntaxKind {
    return new fileSyntaxKind(0);
}
export function fileSyntaxKindESM$constant(): fileSyntaxKind {
    return new fileSyntaxKind(1);
}
export function fileSyntaxKindCJS$constant(): fileSyntaxKind {
    return new fileSyntaxKind(2);
}
export function detectSyntax(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): fileSyntaxKind {
    const __gotots_results_0 = detectSyntaxIndicators(file, options);
    let hasESM = __gotots_results_0[0];
    let hasCJS = __gotots_results_0[1];
    __gotots_control_target_1: {
        if (hasCJS && !hasESM) {
            return fileSyntaxKindCJS$constant();
        }
        else if (hasESM && !hasCJS) {
            return fileSyntaxKindESM$constant();
        }
        else {
            return fileSyntaxKindAmbiguous$constant();
        }
    }
}
export function detectSyntaxIndicators(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): [
    bool,
    bool
] {
    let hasESM: bool = false;
    let hasCJS: bool = false;
    hasCJS = !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined);
    if (!(CompilerOptions__from_core.GetEmitModuleDetectionKind(options) === ModuleDetectionKindForce$constant__from_core())) {
        hasESM = !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined);
        return [hasESM, hasCJS];
    }
    let __gotots_logical_result_0 = !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_equal_operand_0 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator;
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        __gotots_logical_result_0 = !tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
    }
    if (__gotots_logical_result_0) {
        return [true, hasCJS];
    }
    const __gotots_range_1 = SourceFile__from_ast.Imports(file);
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (!((Node__from_ast.$storageOf(((imp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsSynthesized$constant__from_ast()) >>> 0 === 0)) {
            continue;
        }
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((imp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (parent === undefined) {
            continue;
        }
        switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindImportDeclaration$constant__from_ast():
            case KindJSImportDeclaration$constant__from_ast():
            case KindExportDeclaration$constant__from_ast(): {
                return [true, hasCJS];
                break;
            }
            case KindExternalModuleReference$constant__from_ast(): {
                return [true, hasCJS];
                break;
            }
        }
    }
    return [hasESM, hasCJS];
}
export function needsTypeOnly(addAsTypeOnly: AddAsTypeOnly__from_lsproto): bool {
    return addAsTypeOnly === AddAsTypeOnlyRequired$constant__from_lsproto();
}
export function shouldUseTypeOnly(addAsTypeOnly: AddAsTypeOnly__from_lsproto, preferences: UserPreferences__from_lsutil): bool {
    return needsTypeOnly(addAsTypeOnly) || !(addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto()) && Tristate_IsTrue__from_core(preferences.PreferTypeOnlyAutoImports);
}
export function compareFixKinds(a: AutoImportFixKind__from_lsproto, b: AutoImportFixKind__from_lsproto): int {
    return a - b;
}
export function isFixPossiblyReExportingImportingFile(fix: {
    value: Fix;
} | undefined, importingFileName: gostring): bool {
    if ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsReExport && isIndexFileName((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName)) {
        let reExportDir = GetDirectoryPath__from_tspath((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName);
        return strings__from_gostdlib.HasPrefix(importingFileName, reExportDir);
    }
    return false;
}
export function isIndexFileName(fileName: gostring): bool {
    let lastSlash = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(fileName, 47)));
    if (lastSlash < 0 || fileName.length <= lastSlash + 1) {
        return false;
    }
    fileName = goStringSlice(fileName, lastSlash + 1);
    switch (fileName) {
        case "index.js":
        case "index.jsx":
        case "index.d.ts":
        case "index.ts":
        case "index.tsx": {
            return true;
            break;
        }
    }
    return false;
}
export function promoteFromTypeOnly(changes: Tracker__from_change | undefined, aliasDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let convertExistingToTypeOnly: CompilerOptions__from_core["VerbatimModuleSyntax"] = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax;
    switch (Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportSpecifier$constant__from_ast(): {
            let spec: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(aliasDeclaration);
            if (ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly) {
                if (!((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent === undefined) && Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()) {
                    let namedImportsNode: {
                        value: NamedImports__from_ast;
                    } | undefined = Node__from_ast.AsNamedImports((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent);
                    let elements = NodeList__from_ast.$storageOf((((namedImportsNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    if (elements.length > 1) {
                        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined)) {
                            const __gotots_store_8 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                    (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                        Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(NodeFactory__from_ast.NewIdentifier((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, Node__from_ast.Text(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName))) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                            propertyName = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        }
                        let newSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportSpecifier((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, false, propertyName, NodeFactory__from_ast.NewIdentifier((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, Node__from_ast.Text(ImportSpecifier__from_ast.Name(spec))));
                        const __gotots_results_3 = GetNamedImportSpecifierComparerWithDetection__from_lsutil(Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                    ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile, UserPreferences__from_lsutil.$copy(preferences));
                        let specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = __gotots_results_3[0];
                        let insertionIndex = GetImportSpecifierInsertionIndex__from_lsutil(elements, newSpecifier, specifierComparer);
                        let currentIndex = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(elements, aliasDeclaration);
                        if (insertionIndex !== currentIndex) {
                            Tracker__from_change.Delete(changes, sourceFile, aliasDeclaration);
                            Tracker__from_change.InsertImportSpecifierAtIndex(changes, sourceFile, newSpecifier, (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent, insertionIndex);
                            return aliasDeclaration;
                        }
                    }
                    let firstToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(aliasDeclaration, sourceFile);
                    let typeKeywordPos = GetTokenPosOfNode__from_scanner(firstToken, sourceFile, false);
                    let targetNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined)) {
                        targetNode = ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName;
                    }
                    else {
                        targetNode = ImportSpecifier__from_ast.Name(spec);
                    }
                    let targetPos = GetTokenPosOfNode__from_scanner((void Node__from_ast.AsNode,
                        targetNode), sourceFile, false);
                    Tracker__from_change.DeleteRange(changes, sourceFile, NewTextRange__from_core(typeKeywordPos, targetPos));
                }
                return aliasDeclaration;
            }
            else {
                if ((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent === undefined || !(Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast())) {
                    const __gotots_argument_33 = new $goInterfaceAdapter$string("ImportSpecifier parent must be NamedImports");
                    GoPanic.raise(__gotots_argument_33 === undefined ? GoPanicNilValue.create() : __gotots_argument_33);
                }
                if (Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportClause$constant__from_ast())) {
                    const __gotots_argument_34 = new $goInterfaceAdapter$string("NamedImports parent must be ImportClause");
                    GoPanic.raise(__gotots_argument_34 === undefined ? GoPanicNilValue.create() : __gotots_argument_34);
                }
                promoteImportClause(changes, Node__from_ast.AsImportClause(Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), compilerOptions, sourceFile, UserPreferences__from_lsutil.$copy(preferences), convertExistingToTypeOnly, aliasDeclaration);
                return Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
        case KindImportClause$constant__from_ast(): {
            promoteImportClause(changes, Node__from_ast.AsImportClause(aliasDeclaration), compilerOptions, sourceFile, UserPreferences__from_lsutil.$copy(preferences), convertExistingToTypeOnly, aliasDeclaration);
            return aliasDeclaration;
            break;
        }
        case KindNamespaceImport$constant__from_ast(): {
            if (Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportClause$constant__from_ast())) {
                const __gotots_argument_35 = new $goInterfaceAdapter$string("NamespaceImport parent must be ImportClause");
                GoPanic.raise(__gotots_argument_35 === undefined ? GoPanicNilValue.create() : __gotots_argument_35);
            }
            promoteImportClause(changes, Node__from_ast.AsImportClause(Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), compilerOptions, sourceFile, UserPreferences__from_lsutil.$copy(preferences), convertExistingToTypeOnly, aliasDeclaration);
            return Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let importEqDecl: {
                value: ImportEqualsDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportEqualsDeclaration(aliasDeclaration);
            const __gotots_argument_36 = sourceFile;
            const __gotots_store_9 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((importEqDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault));
            const __gotots_argument_37 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            let scan: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(__gotots_argument_36, __gotots_argument_37);
            Scanner__from_scanner.Scan(scan);
            deleteTypeKeyword(changes, sourceFile, Scanner__from_scanner.TokenStart(scan));
            return aliasDeclaration;
            break;
        }
        default: {
            const __gotots_argument_38 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unexpected alias declaration kind: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
            GoPanic.raise(__gotots_argument_38 === undefined ? GoPanicNilValue.create() : __gotots_argument_38);
            break;
        }
    }
}
export function promoteImportClause(changes: Tracker__from_change | undefined, importClause: {
    value: ImportClause__from_ast;
} | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, convertExistingToTypeOnly: Tristate__from_core, aliasDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    if ((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier === KindTypeKeyword$constant__from_ast()) {
        const __gotots_argument_39 = changes;
        const __gotots_argument_40 = sourceFile;
        const __gotots_store_10 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
        const __gotots_argument_41 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        deleteTypeKeyword(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41);
    }
    if (Tristate_IsFalse__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowImportingTsExtensions)) {
        let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetModuleSpecifierFromDeclaration__from_checker((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent);
        if (!(moduleSpecifier === undefined)) {
        }
    }
    if (Tristate_IsTrue__from_core(convertExistingToTypeOnly)) {
        let namedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
        if (!(namedImports === undefined) && Node__from_ast.$storageOf(((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()) {
            let namedImportsData: {
                value: NamedImports__from_ast;
            } | undefined = Node__from_ast.AsNamedImports(namedImports);
            if (NodeList__from_ast.$storageOf((((namedImportsData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 1) {
                const __gotots_results_4 = GetNamedImportSpecifierComparerWithDetection__from_lsutil((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent, sourceFile, UserPreferences__from_lsutil.$copy(preferences));
                let isSorted = __gotots_results_4[1];
                if (Tristate_IsFalse__from_core(isSorted) === false && !(aliasDeclaration === undefined) && Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast()) {
                    let aliasIndex = -1;
                    const __gotots_range_8 = NodeList__from_ast.$storageOf((((namedImportsData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                        const __gotots_range_value_8 = __gotots_range_index_8;
                        const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
                        let i = __gotots_range_value_8;
                        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                        if (tsonicTypeScriptRuntime.sameLocation(element, aliasDeclaration)) {
                            aliasIndex = i;
                            break;
                        }
                    }
                    if (aliasIndex > 0) {
                        Tracker__from_change.Delete(changes, sourceFile, aliasDeclaration);
                        Tracker__from_change.InsertImportSpecifierAtIndex(changes, sourceFile, aliasDeclaration, namedImports, 0);
                    }
                }
                const __gotots_range_9 = NodeList__from_ast.$storageOf((((namedImportsData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
                    const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_9);
                    let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                    let spec: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(element);
                    if (!(aliasDeclaration === undefined) && Node__from_ast.$storageOf(((aliasDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast()) {
                        if (tsonicTypeScriptRuntime.sameLocation(element, aliasDeclaration)) {
                            continue;
                        }
                    }
                    if (!ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly) {
                        Tracker__from_change.InsertModifierBefore(changes, sourceFile, KindTypeKeyword$constant__from_ast(), element);
                    }
                }
            }
        }
    }
}
export function deleteTypeKeyword(changes: Tracker__from_change | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, startPos: int): void {
    let scan: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, startPos);
    if (!(Scanner__from_scanner.Token(scan) === KindTypeKeyword$constant__from_ast())) {
        return;
    }
    let typeStart = Scanner__from_scanner.TokenStart(scan);
    let typeEnd = Scanner__from_scanner.TokenEnd(scan);
    let text = SourceFile__from_ast.Text(sourceFile);
    for (; typeEnd < text.length && (goStringIndex(text, typeEnd) === 32 || goStringIndex(text, typeEnd) === 9);) {
        typeEnd++;
    }
    Tracker__from_change.DeleteRange(changes, sourceFile, NewTextRange__from_core(typeStart, typeEnd));
}
export function getModuleSpecifierText(promotedDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (Node__from_ast.$storageOf(((promotedDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) {
        let importEqualsDeclaration: {
            value: ImportEqualsDeclaration__from_ast;
        } | undefined = Node__from_ast.AsImportEqualsDeclaration(promotedDeclaration);
        if (IsExternalModuleReference__from_ast((importEqualsDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference)) {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression((importEqualsDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
            if (!(expr === undefined)) {
                if (IsStringLiteralLike__from_ast(expr)) {
                    return Node__from_ast.Text(expr);
                }
                return GetTextOfNode__from_scanner(expr);
            }
        }
        return GetTextOfNode__from_scanner((importEqualsDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
    }
    let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((promotedDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    if (IsStringLiteralLike__from_ast(moduleSpecifier)) {
        return Node__from_ast.Text(moduleSpecifier);
    }
    return GetTextOfNode__from_scanner(moduleSpecifier);
}
export function compareModuleSpecifierRelativity(a: {
    value: Fix;
} | undefined, b: {
    value: Fix;
} | undefined, preferences: UserPreferences__from_modulespecifiers): int {
    switch (preferences.ImportModuleSpecifierPreference.$value) {
        case "non-relative":
        case "project-relative": {
            return CompareBooleans__from_core((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindRelative$constant__from_modulespecifiers(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindRelative$constant__from_modulespecifiers());
            break;
        }
    }
    return 0;
}
