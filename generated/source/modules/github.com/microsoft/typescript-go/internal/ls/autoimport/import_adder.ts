import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ImportTypeNode as ImportTypeNode__from_ast, NodeList as NodeList__from_ast, QualifiedName as QualifiedName__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Type as Type__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Converters as Converters__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { AddAsTypeOnly as AddAsTypeOnly__from_lsproto, AutoImportFix as AutoImportFix__from_lsproto, ImportKind as ImportKind__from_lsproto, TextEdit as TextEdit__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { Export } from "./export.js";
import type { Fix, addToExistingImportFix } from "./fix.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { GetFirstIdentifier as GetFirstIdentifier__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsLiteralImportTypeNode as IsLiteralImportTypeNode__from_ast, IsTypeNode as IsTypeNode__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, NewNodeFactory as NewNodeFactory__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeFactoryHooks as NodeFactoryHooks__from_ast, NodeFactory as NodeFactory__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__locale, Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { NewTracker as NewTracker__from_change, Tracker as Tracker__from_change } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil, GetQuotePreference as GetQuotePreference__from_lsutil, ModuleSymbolToValidIdentifier as ModuleSymbolToValidIdentifier__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { AddAsTypeOnlyAllowed$constant as AddAsTypeOnlyAllowed$constant__from_lsproto, AddAsTypeOnlyRequired$constant as AddAsTypeOnlyRequired$constant__from_lsproto, AutoImportFixKindAddNew$constant as AutoImportFixKindAddNew$constant__from_lsproto, AutoImportFixKindAddToExisting$constant as AutoImportFixKindAddToExisting$constant__from_lsproto, AutoImportFixKindJsdocTypeImport$constant as AutoImportFixKindJsdocTypeImport$constant__from_lsproto, AutoImportFixKindPromoteTypeOnly$constant as AutoImportFixKindPromoteTypeOnly$constant__from_lsproto, AutoImportFixKindUseNamespace$constant as AutoImportFixKindUseNamespace$constant__from_lsproto, ImportKindCommonJS$constant as ImportKindCommonJS$constant__from_lsproto, ImportKindDefault$constant as ImportKindDefault$constant__from_lsproto, ImportKindNamed$constant as ImportKindNamed$constant__from_lsproto, ImportKindNamespace$constant as ImportKindNamespace$constant__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { FlagsNone$constant as FlagsNone$constant__from_nodebuilder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { FlatMap$PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Fix } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FlatMap.js";
import { Keys$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding$string$PointerTo_Named_autoimport$newImportBinding } from "../../../../../../../support/generics/concretizations/maps/Keys.js";
import { SortFunc$SliceOf_PointerTo_Named_autoimport$Fix$PointerTo_Named_autoimport$Fix } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { Sorted$string } from "../../../../../../../support/generics/concretizations/slices/Sorted.js";
import { $goInterfaceAdapter$Named_lsproto$AutoImportFixKind, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_autoimport$importAdder as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$AddImportFix$PointerTo_Named_autoimport$Fix_to_void, $goInterfaceMethod$AddImportFromExportedSymbol$PointerTo_Named_ast$Symbol_bool_to_void, $goInterfaceMethod$Edits$void_to_SliceOf_PointerTo_Named_lsproto$TextEdit, $goInterfaceMethod$HasFixes$void_to_bool } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_PointerTo_Named_autoimport$importsCollection, $goMap$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_autoimport$addToExistingState as GoMap } from "../../../../../../../support/maps.js";
import { ExportID, SymbolToExport } from "./export.js";
import { addImportType, addNamespaceQualifier, addToExistingImport, getAddToExistingImportFix, getNewImports, getNewRequires, insertImports, newImportBinding } from "./fix.js";
import { getDefaultLikeExportNameFromDeclaration } from "./util.js";
import { View } from "./view.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export interface ImportAdder extends GoInterfaceValue {
    AddImportFix($argument0: {
        value: Fix;
    } | undefined): void;
    AddImportFromExportedSymbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: bool): void;
    Edits(): RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>;
    HasFixes(): bool;
}
export const ImportAdder$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AddImportFix$PointerTo_Named_autoimport$Fix_to_void, $goInterfaceMethod$AddImportFromExportedSymbol$PointerTo_Named_ast$Symbol_bool_to_void, $goInterfaceMethod$Edits$void_to_SliceOf_PointerTo_Named_lsproto$TextEdit, $goInterfaceMethod$HasFixes$void_to_bool]);
export function ImportAdder$is(value: GoInterfaceValue | undefined): value is ImportAdder {
    return value !== undefined && value.$go$implements(ImportAdder$contract);
}
export class addToExistingState {
    declare private readonly $goType: void;
    public constructor(public importClauseOrBindingPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, public namedImports: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>) {
    }
    declare private readonly then?: never;
}
export class importsCollection {
    declare private readonly $goType: void;
    public constructor(public defaultImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, public namedImports: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>, public namespaceLikeImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined, public useRequire: bool) {
    }
    declare private readonly then?: never;
}
export function newImportsKey(moduleSpecifier: gostring, topLevelTypeOnly: bool): gostring {
    if (topLevelTypeOnly) {
        return "1|" + moduleSpecifier;
    }
    return "0|" + moduleSpecifier;
}
export class importAdder {
    declare private readonly $goType: void;
    public constructor(public ctx: GoInterface | undefined, public checker: {
        value: Checker__from_checker;
    } | undefined, public view: View | undefined, public formatOptions: FormatCodeSettings__from_lsutil, public converters: {
        value: Converters__from_lsconv;
    } | undefined, public preferences: UserPreferences__from_lsutil, public addToNamespace: RuntimeSlice<{
        value: Fix;
    } | undefined>, public importType: RuntimeSlice<{
        value: Fix;
    } | undefined>, public addToExisting: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, addToExistingState | undefined>, public newImports: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<importsCollection> | undefined>) {
    }
    declare private readonly then?: never;
    static AddImportFix(adder: importAdder | undefined, fix: {
        value: Fix;
    } | undefined): void {
        let symbolName: AutoImportFix__from_lsproto["Name"] = ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name;
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = Program__from_compiler.Options(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        switch (((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind) {
            case AutoImportFixKindUseNamespace$constant__from_lsproto(): {
                (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToNamespace = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToNamespace.append(void 0, [fix]);
                break;
            }
            case AutoImportFixKindJsdocTypeImport$constant__from_lsproto(): {
                (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importType = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importType.append(void 0, [fix]);
                break;
            }
            case AutoImportFixKindAddToExisting$constant__from_lsproto(): {
                let existingFix: addToExistingImportFix | undefined = getAddToExistingImportFix(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, fix);
                let entry: addToExistingState | undefined = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToExisting.lookup((existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importClauseOrBindingPattern);
                if (entry === undefined) {
                    entry = new addToExistingState((existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importClauseOrBindingPattern, void 0, $goMap$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding.make(0, []));
                    (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToExisting.store((existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importClauseOrBindingPattern, entry);
                }
                if (((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind === ImportKindNamed$constant__from_lsproto()) {
                    let prevImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImports.lookup(symbolName);
                    let prevTypeOnly = 0;
                    if (!(prevImport === undefined)) {
                        prevTypeOnly = ((prevImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly;
                    }
                    (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImports.store(symbolName, tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindNamed$constant__from_lsproto(), (((existingFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.propertyName, symbolName, reduceAddAsTypeOnlyValues(prevTypeOnly, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly))));
                }
                else {
                    Assert__from_debug((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport === undefined || (((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name === symbolName, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("(Add to Existing) Default import should be missing or match symbolName")]));
                    let prevTypeOnly = 0;
                    if (!((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport === undefined)) {
                        prevTypeOnly = (((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly;
                    }
                    (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport =
                        tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindDefault$constant__from_lsproto(), "", symbolName, reduceAddAsTypeOnlyValues(prevTypeOnly, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)));
                }
                break;
            }
            case AutoImportFixKindAddNew$constant__from_lsproto(): {
                let entry: tsonicTypeScriptRuntime.Location<importsCollection> | undefined = importAdder.$go$private$autoimport$getNewImportEntry(adder, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseRequire, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly);
                Assert__from_debug(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.useRequire === ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseRequire, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("(Add new) Tried to add an `import` and a `require` for the same module")]));
                switch (((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind) {
                    case ImportKindDefault$constant__from_lsproto(): {
                        Assert__from_debug(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport === undefined || ((((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name === symbolName, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("(Add new) Default import should be missing or match symbolName")]));
                        let prevTypeOnly = 0;
                        if (!(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport === undefined)) {
                            prevTypeOnly = ((((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly;
                        }
                        ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport =
                            tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindDefault$constant__from_lsproto(), "", symbolName, reduceAddAsTypeOnlyValues(prevTypeOnly, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly)));
                        break;
                    }
                    case ImportKindNamed$constant__from_lsproto(): {
                        if (((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.isNil()) {
                            ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports = $goMap$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding.make(0, []);
                        }
                        let prevImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.lookup(symbolName);
                        let prevTypeOnly = 0;
                        if (!(prevImport === undefined)) {
                            prevTypeOnly = ((prevImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly;
                        }
                        ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.store(symbolName, tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindNamed$constant__from_lsproto(), "", symbolName, reduceAddAsTypeOnlyValues(prevTypeOnly, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly))));
                        break;
                    }
                    case ImportKindCommonJS$constant__from_lsproto(): {
                        if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax === TSTrue$constant__from_core()) {
                            if (((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.isNil()) {
                                ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports = $goMap$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding.make(0, []);
                            }
                            let prevImport: tsonicTypeScriptRuntime.Location<newImportBinding> | undefined = ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.lookup(symbolName);
                            let prevTypeOnly = 0;
                            if (!(prevImport === undefined)) {
                                prevTypeOnly = ((prevImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.addAsTypeOnly;
                            }
                            ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports.store(symbolName, tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindCommonJS$constant__from_lsproto(), "", symbolName, reduceAddAsTypeOnlyValues(prevTypeOnly, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly))));
                        }
                        else {
                            Assert__from_debug(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport === undefined || ((((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name === symbolName, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Namespacelike import should be missing or match symbolName")]));
                            ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport =
                                tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindCommonJS$constant__from_lsproto(), "", symbolName, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly));
                        }
                        break;
                    }
                    case ImportKindNamespace$constant__from_lsproto(): {
                        Assert__from_debug(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport === undefined || ((((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<newImportBinding>).value.name === symbolName, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Namespacelike import should be missing or match symbolName")]));
                        ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport =
                            tsonicTypeScriptRuntime.location<newImportBinding>(new newImportBinding(ImportKindNamespace$constant__from_lsproto(), "", symbolName, ((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AddAsTypeOnly));
                        break;
                    }
                }
                break;
            }
            case AutoImportFixKindPromoteTypeOnly$constant__from_lsproto(): {
                break;
            }
            default: {
                Fail__from_debug(fmt__from_gostdlib.Sprintf("Unexpected fix kind: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$AutoImportFixKind(((fix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind)])));
                break;
            }
        }
    }
    static AddImportFromExportedSymbol(adder: importAdder | undefined, exportedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, isValidTypeOnlyUseSite: bool): void {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Checker__from_checker.SkipAlias((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, exportedSymbol));
        let exportInfos = importAdder.$go$private$autoimport$getAllExportsForSymbol(adder, __go_symbol);
        if (exportInfos.length === 0) {
            return;
        }
        let fix: {
            value: Fix;
        } | undefined = importAdder.$go$private$autoimport$getImportFixForSymbol(adder, (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view, ((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, exportInfos, isValidTypeOnlyUseSite);
        if (!(fix === undefined)) {
            importAdder.AddImportFix(adder, fix);
        }
    }
    static Edits(adder: importAdder | undefined): RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined> {
        let tracker: Tracker__from_change | undefined = NewTracker__from_change((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, Program__from_compiler.Options(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), FormatCodeSettings__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatOptions), (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters);
        let quotePreference = GetQuotePreference__from_lsutil(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, UserPreferences__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        const __gotots_range_1 = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToNamespace;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let fix: {
                value: Fix;
            } | undefined = __gotots_range_value_1;
            addNamespaceQualifier(fix, tracker, ((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default)));
        }
        const __gotots_range_2 = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importType;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let fix: {
                value: Fix;
            } | undefined = __gotots_range_value_2;
            addImportType(fix, ((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, UserPreferences__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences), tracker, Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default)));
        }
        const __gotots_range_3 = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToExisting;
        const __gotots_range_keys_0 = __gotots_range_3.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            const __gotots_range_value_6 = __gotots_range_value_4[0];
            let clauseOrPattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            let entry: addToExistingState | undefined = __gotots_range_value_6;
            addToExistingImport(tracker, ((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, clauseOrPattern, (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultImport, sortedNamedImports((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImports), UserPreferences__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        }
        let newDeclarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_4 = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports;
        const __gotots_range_keys_1 = __gotots_range_4.keys();
        for (const __gotots_range_value_7 of __gotots_range_keys_1) {
            const __gotots_range_value_8 = __gotots_range_4.lookupOk(__gotots_range_value_7);
            if (!__gotots_range_value_8[1]) {
                continue;
            }
            const __gotots_range_value_9 = __gotots_range_value_7;
            const __gotots_range_value_10 = __gotots_range_value_8[0];
            let key = __gotots_range_value_9;
            let newImport: tsonicTypeScriptRuntime.Location<importsCollection> | undefined = __gotots_range_value_10;
            let moduleSpecifier = goStringSlice(key, 2);
            let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.useRequire) {
                declarations = getNewRequires(tracker, moduleSpecifier, quotePreference, ((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport, sortedNamedImports(((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports), ((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport, Program__from_compiler.Options(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
            }
            else {
                declarations = getNewImports(tracker, moduleSpecifier, quotePreference, ((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.defaultImport, sortedNamedImports(((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namedImports), ((newImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<importsCollection>).value.namespaceLikeImport, Program__from_compiler.Options(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), UserPreferences__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
            }
            newDeclarations = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newDeclarations, declarations, void 0);
        }
        if (newDeclarations.length > 0) {
            insertImports(tracker, ((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, newDeclarations, true, UserPreferences__from_lsutil.$copy((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        }
        return Tracker__from_change.GetChanges(tracker).lookup(SourceFile__from_ast.FileName(((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile));
    }
    static HasFixes(adder: importAdder | undefined): bool {
        return (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToNamespace.length > 0 || (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importType.length > 0 || (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addToExisting.length() > 0 || (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports.length() > 0;
    }
    static $go$private$autoimport$getAllExportsForSymbol(adder: importAdder | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<{
        value: Export;
    } | undefined> {
        {
            let __go_export: {
                value: Export;
            } | undefined = SymbolToExport(__go_symbol, (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
            if (!(__go_export === undefined)) {
                return View.SearchByExportID((adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).view, ExportID.$copy((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID));
            }
        }
        return RuntimeSlice.nil<{
            value: Export;
        } | undefined>();
    }
    static $go$private$autoimport$getImportFixForSymbol(adder: importAdder | undefined, view: View | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, exports: RuntimeSlice<{
        value: Export;
    } | undefined>, isValidTypeOnlyUseSite: bool): {
        value: Fix;
    } | undefined {
        let fixes = FlatMap$PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Fix(exports, (__go_export: {
            value: Export;
        } | undefined): RuntimeSlice<{
            value: Fix;
        } | undefined> => {
            return View.GetFixes(view, (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, __go_export, false, isValidTypeOnlyUseSite, void 0);
        });
        SortFunc$SliceOf_PointerTo_Named_autoimport$Fix$PointerTo_Named_autoimport$Fix(fixes, (a: {
            value: Fix;
        } | undefined, b: {
            value: Fix;
        } | undefined): int => {
            return View.CompareFixesForRanking(view, a, b);
        });
        if (fixes.length > 0) {
            return fixes.get(0);
        }
        return void 0;
    }
    static $go$private$autoimport$getNewImportEntry(adder: importAdder | undefined, moduleSpecifier: gostring, importKind: ImportKind__from_lsproto, useRequire: bool, addAsTypeOnly: AddAsTypeOnly__from_lsproto): tsonicTypeScriptRuntime.Location<importsCollection> | undefined {
        let typeOnlyKey = newImportsKey(moduleSpecifier, true);
        let nonTypeOnlyKey = newImportsKey(moduleSpecifier, false);
        let typeOnlyEntry: tsonicTypeScriptRuntime.Location<importsCollection> | undefined = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports.lookup(typeOnlyKey);
        let nonTypeOnlyEntry: tsonicTypeScriptRuntime.Location<importsCollection> | undefined = (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports.lookup(nonTypeOnlyKey);
        let newEntry: tsonicTypeScriptRuntime.Location<importsCollection> | undefined = tsonicTypeScriptRuntime.location<importsCollection>(new importsCollection(void 0, $goMap$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding.nil(), void 0, useRequire));
        if (importKind === ImportKindDefault$constant__from_lsproto() && addAsTypeOnly === AddAsTypeOnlyRequired$constant__from_lsproto()) {
            if (!(typeOnlyEntry === undefined)) {
                return typeOnlyEntry;
            }
            (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports.store(typeOnlyKey, newEntry);
            return newEntry;
        }
        if (addAsTypeOnly === AddAsTypeOnlyAllowed$constant__from_lsproto() && (!(typeOnlyEntry === undefined) || !(nonTypeOnlyEntry === undefined))) {
            if (!(typeOnlyEntry === undefined)) {
                return typeOnlyEntry;
            }
            return nonTypeOnlyEntry;
        }
        if (!(nonTypeOnlyEntry === undefined)) {
            return nonTypeOnlyEntry;
        }
        (adder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newImports.store(nonTypeOnlyKey, newEntry);
        return newEntry;
    }
}
export function NewImportAdder(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, view: View | undefined, formatOptions: FormatCodeSettings__from_lsutil, converters: {
    value: Converters__from_lsconv;
} | undefined, preferences: UserPreferences__from_lsutil): ImportAdder | undefined {
    return new GoInterfaceAdapter(new importAdder(ctx, checker__shadow_1, view, FormatCodeSettings__from_lsutil.$copy(formatOptions), converters, UserPreferences__from_lsutil.$copy(preferences), RuntimeSlice.nil<{
        value: Fix;
    } | undefined>(), RuntimeSlice.nil<{
        value: Fix;
    } | undefined>(), GoMap.make(0, []), $goMap$MapOf_string_To_PointerTo_Named_autoimport$importsCollection.make(0, [])));
}
export function sortedNamedImports(m: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined> {
    let keys = Sorted$string(Keys$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding$string$PointerTo_Named_autoimport$newImportBinding(m));
    let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<newImportBinding> | undefined>(0, keys.length, void 0);
    const __gotots_range_5 = keys;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
        const __gotots_range_value_11 = __gotots_range_5.get(__gotots_range_index_3);
        let k = __gotots_range_value_11;
        result = result.append(void 0, [m.lookup(k)]);
    }
    return result;
}
export function reduceAddAsTypeOnlyValues(prevValue: AddAsTypeOnly__from_lsproto, newValue: AddAsTypeOnly__from_lsproto): AddAsTypeOnly__from_lsproto {
    if (newValue > prevValue) {
        return newValue;
    }
    return prevValue;
}
export function TypeToAutoImportableTypeNode(c: {
    value: Checker__from_checker;
} | undefined, importAdder__shadow_1: ImportAdder | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.make(0, []);
    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNode(c, t, contextNode, FlagsNone$constant__from_nodebuilder(), idToSymbol);
    if (typeNode === undefined) {
        return void 0;
    }
    return TypeNodeToAutoImportableTypeNode(typeNode, importAdder__shadow_1, idToSymbol);
}
export function TypeNodeToAutoImportableTypeNode(typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, importAdder__shadow_1: ImportAdder | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_results_0 = TryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol);
    let referenceTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[0];
    let importableSymbols = __gotots_results_0[1];
    if (!(referenceTypeNode === undefined)) {
        if (!(importAdder__shadow_1 === undefined)) {
            importSymbols(importAdder__shadow_1, importableSymbols);
        }
        typeNode = referenceTypeNode;
    }
    return typeNode;
}
export function importSymbols(importAdder__shadow_1: ImportAdder | undefined, symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): void {
    const __gotots_range_0 = symbols;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_0;
        const __gotots_receiver_0 = importAdder__shadow_1;
        const __gotots_argument_0 = __go_symbol;
        const __gotots_argument_1 = true;
        goInterfaceNonNil<ImportAdder>(__gotots_receiver_0).AddImportFromExportedSymbol(__gotots_argument_0, __gotots_argument_1);
    }
}
export function TryGetAutoImportableReferenceFromTypeNode(importTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): [
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>
] {
    let symbols = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    let visitor: {
        value: NodeVisitor__from_ast;
    } | undefined = void 0;
    let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0));
    let visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (IsLiteralImportTypeNode__from_ast(node) && !((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier === undefined)) {
            let importTypeNode__shadow_1: {
                value: ImportTypeNode__from_ast;
            } | undefined = Node__from_ast.AsImportTypeNode(node);
            let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast((importTypeNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier);
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = idToSymbol.lookup(firstIdentifier);
            if (__go_symbol === undefined) {
                return Node__from_ast.VisitEachChild(node, visitor);
            }
            let name = getNameForExportedSymbol(__go_symbol, false);
            let qualifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (name !== Node__from_ast.Text(firstIdentifier)) {
                qualifier = replaceFirstIdentifierOfEntityName(factory, (importTypeNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier, NodeFactory__from_ast.NewIdentifier(factory, name));
            }
            else {
                qualifier = (importTypeNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier;
            }
            symbols = symbols.append(void 0, [__go_symbol]);
            let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(visitor, NodeWithTypeArgumentsBase__from_ast.$storageOf((importTypeNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments);
            return NodeFactory__from_ast.NewTypeReferenceNode(factory, qualifier, typeArguments);
        }
        return NodeVisitor__from_ast.VisitEachChild(visitor, node);
    };
    visitor = NewNodeVisitor__from_ast(visit, factory, new NodeVisitorHooks__from_ast(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, importTypeNode);
    Assert__from_debug(typeNode === undefined || IsTypeNode__from_ast(typeNode), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("expected a type node")]));
    return [typeNode, symbols];
}
export function getNameForExportedSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, preferCapitalized: bool): gostring {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameExportEquals$string__from_ast || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameDefault$string__from_ast) {
        let name = getDefaultLikeExportNameFromDeclaration(__go_symbol);
        if (name !== "") {
            return name;
        }
        Assert__from_debug(!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Expected exported symbol to have module symbol as parent")]));
        return ModuleSymbolToValidIdentifier__from_lsutil(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, preferCapitalized);
    }
    return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
}
export function replaceFirstIdentifierOfEntityName(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
        return newIdentifier;
    }
    return NodeFactory__from_ast.NewQualifiedName(factory, replaceFirstIdentifierOfEntityName(factory, (Node__from_ast.AsQualifiedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, newIdentifier), (Node__from_ast.AsQualifiedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right);
}
