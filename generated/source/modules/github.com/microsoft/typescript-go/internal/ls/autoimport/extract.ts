import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ObjectLiteralExpression as ObjectLiteralExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { ExportSyntax } from "./export.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, CheckFlagsMapped$constant as CheckFlagsMapped$constant__from_ast, DeclarationBase as DeclarationBase__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetNonAugmentationDeclaration as GetNonAugmentationDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, InternalSymbolNameExportStar$string as InternalSymbolNameExportStar$string__from_ast, IsGlobalScopeAugmentation as IsGlobalScopeAugmentation__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, IsNonLocalAlias as IsNonLocalAlias__from_ast, IsPartOfTypeOnlyImportOrExportDeclaration as IsPartOfTypeOnlyImportOrExportDeclaration__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsAll$constant as SymbolFlagsAll$constant__from_ast, SymbolFlagsNamespace$constant as SymbolFlagsNamespace$constant__from_ast, SymbolFlagsNone$constant as SymbolFlagsNone$constant__from_ast, SymbolFlagsPrototype$constant as SymbolFlagsPrototype$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetLocalSymbolForExportDefault as GetLocalSymbolForExportDefault__from_binder, NameResolver as NameResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { $state as $state__core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetSymbolKind as GetSymbolKind__from_lsutil, GetSymbolModifiers as GetSymbolModifiers__from_lsutil, ModuleSpecifierToValidIdentifier as ModuleSpecifierToValidIdentifier__from_lsutil, ScriptElementKind as ScriptElementKind__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { ResolvedModule as ResolvedModule__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, ResolvePath as ResolvePath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { FirstNonZero$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonZero.js";
import { IfElse$Named_autoimport$ExportSyntax } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$ModuleDeclaration } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Delete$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol } from "../../../../../../../support/generics/concretizations/slices/Delete.js";
import { Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/slices/Grow.js";
import { Index$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol } from "../../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../../support/maps.js";
import { Export, ExportID, ExportSyntaxCommonJSExportsProperty$constant, ExportSyntaxCommonJSModuleExports$constant, ExportSyntaxDefaultDeclaration$constant, ExportSyntaxDefaultModifier$constant, ExportSyntaxEquals$constant, ExportSyntaxModifier$constant, ExportSyntaxNamed$constant, ExportSyntaxNone$constant, ExportSyntaxStar$constant, ExportSyntaxUMD$constant, ModuleID } from "./export.js";
import { getDefaultLikeExportNameFromDeclaration, tryGetModuleIDAndFileNameOfModuleSymbol } from "./util.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class symbolExtractor {
    declare private readonly $goType: void;
    public constructor(public packageName: gostring, public stats: extractorStats | undefined, public localNameResolver: {
        value: NameResolver__from_binder;
    } | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, public toPath: (($0: gostring) => Path__from_tspath) | undefined, public realpath: (($0: gostring) => gostring) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$autoimport$createExport(e: symbolExtractor | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, moduleID: ModuleID, moduleFileName: gostring, syntax: ExportSyntax, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, checkerLease__shadow_1: checkerLease | undefined): [
        {
            value: Export;
        } | undefined,
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined
    ] {
        if (shouldIgnoreSymbol(__go_symbol)) {
            return [void 0, void 0];
        }
        let __go_export: {
            value: Export;
        } | undefined = { value: new Export(new ExportID(moduleID, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), moduleFileName, syntax, Symbol__from_ast.CombinedLocalAndExportSymbolFlags(__go_symbol), "", "", ExportID.$zero(), false, new ScriptElementKind__from_lsutil(0), 0, SourceFile__from_ast.Path(file), (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName) };
        if (syntax.$value === ExportSyntaxUMD$constant().$value) {
            (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName = InternalSymbolNameExportEquals$string__from_ast;
            (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
        }
        let targetSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            targetSymbol = symbolExtractor.$go$private$autoimport$tryResolveSymbol(e, __go_symbol, syntax, checkerLease__shadow_1);
            if (!(targetSymbol === undefined)) {
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                    decl = Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
                }
                else if (!((Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsMapped$constant__from_ast()) >>> 0 === 0)) {
                    {
                        let mappedDecl: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMappedTypeSymbolOfProperty(checkerLease.GetChecker(checkerLease__shadow_1), targetSymbol);
                        if (!(mappedDecl === undefined) && Symbol__from_ast.$storageOf(((mappedDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                            decl = Symbol__from_ast.$storageOf(((mappedDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
                        }
                    }
                }
                if (decl === undefined) {
                    decl = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
                }
                if (decl === undefined) {
                    const __gotots_argument_4 = new GoInterfaceAdapter("no declaration for aliased symbol");
                    GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
                }
                let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent;
                {
                    let checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = checkerLease.TryChecker(checkerLease__shadow_1);
                    if (!(checker__shadow_1 === undefined)) {
                        (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags = Checker__from_checker.GetSymbolFlags(checker__shadow_1, targetSymbol);
                        (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly = !(Checker__from_checker.GetTypeOnlyAliasDeclaration(checker__shadow_1, __go_symbol) === undefined);
                        parent = Checker__from_checker.GetMergedSymbol(checker__shadow_1, parent);
                    }
                    else {
                        (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags = Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags;
                        (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly = Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsPartOfTypeOnlyImportOrExportDeclaration__from_ast);
                    }
                }
                (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKind = GetSymbolKind__from_lsutil(checkerLease.TryChecker(checkerLease__shadow_1), targetSymbol, decl);
                (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKindModifiers = GetSymbolModifiers__from_lsutil(checkerLease.TryChecker(checkerLease__shadow_1), targetSymbol);
                let targetModuleID = new ModuleID(SourceFile__from_ast.Path(GetSourceFileOfNode__from_ast(decl)).$value);
                if (!(parent === undefined) && Symbol__from_ast.IsExternalModule(parent)) {
                    {
                        const __gotots_results_6 = symbolExtractor.$go$private$autoimport$getModuleIDForSymbol(e, parent);
                        let id = __gotots_results_6[0];
                        let ok = __gotots_results_6[1];
                        if (ok) {
                            targetModuleID = id;
                        }
                    }
                }
                (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target = new ExportID(targetModuleID, Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            }
        }
        else {
            (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKind = GetSymbolKind__from_lsutil(checkerLease.TryChecker(checkerLease__shadow_1), __go_symbol, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0));
            (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKindModifiers = GetSymbolModifiers__from_lsutil(checkerLease.TryChecker(checkerLease__shadow_1), __go_symbol);
        }
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameDefault$string__from_ast || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameExportEquals$string__from_ast) {
            let namedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
            {
                let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = GetLocalSymbolForExportDefault__from_binder(__go_symbol);
                if (!(s === undefined)) {
                    namedSymbol = s;
                }
            }
            (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName = getDefaultLikeExportNameFromDeclaration(namedSymbol);
            if (isUnusableName((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName)) {
                (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName = (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target.ExportName;
            }
            if (isUnusableName((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName)) {
                if (!(targetSymbol === undefined)) {
                    namedSymbol = targetSymbol;
                    {
                        let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = GetLocalSymbolForExportDefault__from_binder(targetSymbol);
                        if (!(s === undefined)) {
                            namedSymbol = s;
                        }
                    }
                    (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName = getDefaultLikeExportNameFromDeclaration(namedSymbol);
                }
            }
            if (isUnusableName((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName)) {
                (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName = ModuleSpecifierToValidIdentifier__from_lsutil(fileNameForDefaultExportName(targetSymbol, moduleFileName, moduleID), false);
            }
        }
        if (isUnusableName(Export.Name(__go_export))) {
            return [void 0, void 0];
        }
        atomic__from_gostdlib.Int32.Add(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports, 1);
        if (!(checkerLease.TryChecker(checkerLease__shadow_1) === undefined)) {
            atomic__from_gostdlib.Int32.Add(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).usedChecker, 1);
        }
        return [__go_export, targetSymbol];
    }
    static $go$private$autoimport$extractFromSymbol(e: symbolExtractor | undefined, name: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, moduleID: ModuleID, moduleFileName: gostring, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, exports: tsonicTypeScriptRuntime.Location<RuntimeSlice<{
        value: Export;
    } | undefined>> | undefined): void {
        if (shouldIgnoreSymbol(__go_symbol)) {
            return;
        }
        if (name === InternalSymbolNameExportStar$string__from_ast) {
            let checkerLease__shadow_2: checkerLease | undefined = new checkerLease(false, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
            let allExports = Checker__from_checker.GetExportsOfModule((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
            const __gotots_range_6 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
            const __gotots_range_keys_2 = __gotots_range_6.keys();
            for (const __gotots_range_value_12 of __gotots_range_keys_2) {
                const __gotots_range_value_13 = __gotots_range_6.lookupOk(__gotots_range_value_12);
                if (!__gotots_range_value_13[1]) {
                    continue;
                }
                const __gotots_range_value_14 = __gotots_range_value_12;
                const __gotots_range_value_15 = __gotots_range_value_13[0];
                let name__shadow_1 = __gotots_range_value_14;
                let namedExport: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_15;
                if (name__shadow_1 !== InternalSymbolNameExportStar$string__from_ast) {
                    let idx = Index$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol(allExports, namedExport);
                    if (idx >= 0 || shouldIgnoreSymbol(namedExport)) {
                        allExports = Delete$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol(allExports, idx, idx + 1);
                    }
                }
            }
            void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                    value: Export;
                } | undefined>>).value, allExports.length));
            const __gotots_range_7 = allExports;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
                const __gotots_range_value_16 = __gotots_range_7.get(__gotots_range_index_4);
                let reexportedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_16;
                const __gotots_results_1 = symbolExtractor.$go$private$autoimport$createExport(e, reexportedSymbol, moduleID, moduleFileName, ExportSyntaxStar$constant(), file, checkerLease__shadow_2);
                let __go_export__shadow_1: {
                    value: Export;
                } | undefined = __gotots_results_1[0];
                if (!(__go_export__shadow_1 === undefined)) {
                    let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(checkerLease.GetChecker(checkerLease__shadow_2), Symbol__from_ast.$storageOf(((reexportedSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
                    if (!(parent === undefined) && Symbol__from_ast.IsExternalModule(parent)) {
                        {
                            const __gotots_results_2 = symbolExtractor.$go$private$autoimport$getModuleIDForSymbol(e, parent);
                            let targetModuleID = __gotots_results_2[0];
                            let ok = __gotots_results_2[1];
                            if (ok) {
                                (__go_export__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target = new ExportID(targetModuleID, Symbol__from_ast.$storageOf(((reexportedSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                            }
                        }
                    }
                    (__go_export__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.through = InternalSymbolNameExportStar$string__from_ast;
                    void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                        ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                            value: Export;
                        } | undefined>>).value.append(void 0, [__go_export__shadow_1]));
                }
            }
            return;
        }
        let syntax = getSyntax(__go_symbol);
        let checkerLease__shadow_1: checkerLease | undefined = new checkerLease(false, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
        const __gotots_results_3 = symbolExtractor.$go$private$autoimport$createExport(e, __go_symbol, moduleID, moduleFileName, syntax, file, checkerLease__shadow_1);
        let __go_export: {
            value: Export;
        } | undefined = __gotots_results_3[0];
        let target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_3[1];
        if (__go_export === undefined) {
            return;
        }
        void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: Export;
            } | undefined>>).value.append(void 0, [__go_export]));
        if (!(target === undefined)) {
            if (syntax.$value === ExportSyntaxEquals$constant().$value && !((Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsNamespace$constant__from_ast()) >>> 0 === 0)) {
                void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                        value: Export;
                    } | undefined>>).value, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length()));
                const __gotots_range_8 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
                const __gotots_range_keys_3 = __gotots_range_8.keys();
                for (const __gotots_range_value_17 of __gotots_range_keys_3) {
                    const __gotots_range_value_18 = __gotots_range_8.lookupOk(__gotots_range_value_17);
                    if (!__gotots_range_value_18[1]) {
                        continue;
                    }
                    const __gotots_range_value_19 = __gotots_range_value_17;
                    const __gotots_range_value_20 = __gotots_range_value_18[0];
                    let innerName = __gotots_range_value_19;
                    let namedExport: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_20;
                    if (innerName !== InternalSymbolNameExportStar$string__from_ast) {
                        const __gotots_results_4 = symbolExtractor.$go$private$autoimport$createExport(e, namedExport, moduleID, moduleFileName, syntax, file, checkerLease__shadow_1);
                        let __go_export__shadow_1: {
                            value: Export;
                        } | undefined = __gotots_results_4[0];
                        if (!(__go_export__shadow_1 === undefined)) {
                            (__go_export__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.through = name;
                            void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                                    value: Export;
                                } | undefined>>).value.append(void 0, [__go_export__shadow_1]));
                        }
                    }
                }
            }
        }
        else if (syntax.$value === ExportSyntaxCommonJSModuleExports$constant().$value) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
            if (Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast()) {
                void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                        value: Export;
                    } | undefined>>).value, NodeList__from_ast.$storageOf((((Node__from_ast.AsObjectLiteralExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length));
                const __gotots_range_9 = NodeList__from_ast.$storageOf((((Node__from_ast.AsObjectLiteralExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_9.length; __gotots_range_index_5++) {
                    const __gotots_range_value_21 = __gotots_range_9.get(__gotots_range_index_5);
                    let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_21;
                    if (IsShorthandPropertyAssignment__from_ast(prop) || IsPropertyAssignment__from_ast(prop) && Node__from_ast.$storageOf(((PropertyAssignment__from_ast.Name(Node__from_ast.AsPropertyAssignment(prop)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                        const __gotots_results_5 = symbolExtractor.$go$private$autoimport$createExport(e, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.lookup(Node__from_ast.Text(Node__from_ast.Name(prop))), moduleID, moduleFileName, syntax, file, checkerLease__shadow_1);
                        let __go_export__shadow_1: {
                            value: Export;
                        } | undefined = __gotots_results_5[0];
                        if (!(__go_export__shadow_1 === undefined)) {
                            (__go_export__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.through = name;
                            void ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                ((exports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                                    value: Export;
                                } | undefined>>).value.append(void 0, [__go_export__shadow_1]));
                        }
                    }
                }
            }
        }
    }
    static $go$private$autoimport$getModuleID(e: symbolExtractor | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): ModuleID {
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath === undefined) && !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).toPath === undefined)) {
            const __gotots_callee_2 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath;
            const __gotots_argument_2 = SourceFile__from_ast.FileName(file);
            let realpath = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            const __gotots_callee_3 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).toPath;
            const __gotots_argument_3 = realpath;
            return new ModuleID((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3).$value);
        }
        return new ModuleID(SourceFile__from_ast.Path(file).$value);
    }
    static $go$private$autoimport$getModuleIDForSymbol(e: symbolExtractor | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): [
        ModuleID,
        bool
    ] {
        const __gotots_results_7 = tryGetModuleIDAndFileNameOfModuleSymbol(__go_symbol);
        let moduleID = __gotots_results_7[0];
        let fileName = __gotots_results_7[1];
        let ok = __gotots_results_7[2];
        if (!ok) {
            return [new ModuleID(""), false];
        }
        if (fileName !== "" && !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath === undefined)) {
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNonAugmentationDeclaration__from_ast(__go_symbol);
            if (!(decl === undefined) && Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
                return [symbolExtractor.$go$private$autoimport$getModuleID(e, Node__from_ast.AsSourceFile(decl)), true];
            }
        }
        return [moduleID, true];
    }
    static $go$private$autoimport$tryResolveSymbol(e: symbolExtractor | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, syntax: ExportSyntax, checkerLease__shadow_1: checkerLease | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!IsNonLocalAlias__from_ast(__go_symbol, SymbolFlagsNone$constant__from_ast())) {
            return __go_symbol;
        }
        let loc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let name = "";
        {
            const __gotots_switch_tag_0 = syntax;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0.$value === ExportSyntaxNamed$constant().$value;
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0.$value === ExportSyntaxEquals$constant().$value;
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_2 = false;
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0.$value === ExportSyntaxDefaultDeclaration$constant().$value;
                }
                if (__gotots_switch_match_2) {
                    __gotots_switch_selection_0 = 2;
                }
            }
            __gotots_control_target_0: {
                if (__gotots_switch_selection_0 === 0) {
                    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindExportSpecifier$constant__from_ast());
                    if ((Node__from_ast.AsExportDeclaration(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
                        {
                            let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstNonZero$PointerTo_Named_ast$Node(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([Node__from_ast.Name(decl), Node__from_ast.PropertyName(decl)]));
                            if (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                                loc = n;
                                name = Node__from_ast.Text(n);
                            }
                        }
                    }
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 1) {
                    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== InternalSymbolNameExportEquals$string__from_ast) {
                        break __gotots_control_target_0;
                    }
                    __gotots_switch_selection_0 = 2;
                }
                if (__gotots_switch_selection_0 === 2) {
                    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindExportAssignment$constant__from_ast());
                    if (Node__from_ast.$storageOf(((Node__from_ast.Expression(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                        loc = Node__from_ast.Expression(decl);
                        name = Node__from_ast.Text(loc);
                    }
                    break __gotots_control_target_0;
                }
            }
        }
        if (!(loc === undefined)) {
            let local: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = NameResolver__from_binder.Resolve((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).localNameResolver, loc, name, SymbolFlagsAll$constant__from_ast(), void 0, false, false);
            if (!(local === undefined) && !IsNonLocalAlias__from_ast(local, SymbolFlagsNone$constant__from_ast())) {
                return local;
            }
        }
        let checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = checkerLease.GetChecker(checkerLease__shadow_1);
        {
            let resolved: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetAliasedSymbol(checker__shadow_1, __go_symbol);
            if (!Checker__from_checker.IsUnknownSymbol(checker__shadow_1, resolved)) {
                return resolved;
            }
        }
        return void 0;
    }
}
export class exportExtractor {
    declare private readonly $goType: void;
    public constructor(public symbolExtractor: symbolExtractor | undefined, public moduleResolver: {
        value: Resolver__from___go_module;
    } | undefined) {
    }
    declare private readonly then?: never;
    static Stats(e: exportExtractor | undefined): extractorStats | undefined {
        return ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats;
    }
    static $go$private$autoimport$extractFromFile(e: exportExtractor | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<{
        value: Export;
    } | undefined> {
        if (!(DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol === undefined)) {
            return exportExtractor.$go$private$autoimport$extractFromModule(e, file);
        }
        if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames.length > 0) {
            let moduleDeclarations = Filter$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsModuleWithStringLiteralName__from_ast);
            let exportCount = 0;
            const __gotots_range_0 = moduleDeclarations;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                exportCount += new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf((Node__from_ast.AsModuleDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length();
            }
            let exports = RuntimeSlice.make<{
                value: Export;
            } | undefined>(0, exportCount, void 0);
            const exports$location = tsonicTypeScriptRuntime.boundLocation({}, () => exports, exports$next => exports = exports$next);
            const __gotots_range_1 = moduleDeclarations;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                exportExtractor.$go$private$autoimport$extractFromModuleDeclaration(e, Node__from_ast.AsModuleDeclaration(decl), file, new ModuleID(Node__from_ast.Text(Node__from_ast.Name(decl))), "", exports$location);
            }
            return exports;
        }
        return RuntimeSlice.nil<{
            value: Export;
        } | undefined>();
    }
    static $go$private$autoimport$extractFromModule(e: exportExtractor | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<{
        value: Export;
    } | undefined> {
        let moduleAugmentations = MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$ModuleDeclaration(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations, (name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
            value: ModuleDeclaration__from_ast;
        } | undefined => {
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (IsGlobalScopeAugmentation__from_ast(decl)) {
                return void 0;
            }
            return Node__from_ast.AsModuleDeclaration(decl);
        });
        let augmentationExportCount = 0;
        const __gotots_range_2 = moduleAugmentations;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let decl: {
                value: ModuleDeclaration__from_ast;
            } | undefined = __gotots_range_value_2;
            augmentationExportCount += new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length();
        }
        let moduleID = symbolExtractor.$go$private$autoimport$getModuleID((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor, file);
        let exports = RuntimeSlice.make<{
            value: Export;
        } | undefined>(0, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length() + augmentationExportCount, void 0);
        const exports$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => exports, exports$next2 => exports = exports$next2);
        const __gotots_range_3 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
        const __gotots_range_keys_0 = __gotots_range_3.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            const __gotots_range_value_6 = __gotots_range_value_4[0];
            let name = __gotots_range_value_5;
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_6;
            symbolExtractor.$go$private$autoimport$extractFromSymbol((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor, name, __go_symbol, moduleID, SourceFile__from_ast.FileName(file), file, exports$location2);
        }
        const __gotots_range_4 = moduleAugmentations;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
            const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_3);
            let decl: {
                value: ModuleDeclaration__from_ast;
            } | undefined = __gotots_range_value_7;
            let name = LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(ModuleDeclaration__from_ast.Name(decl)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).Text;
            let moduleID__shadow_1 = new ModuleID(name);
            let moduleFileName = "";
            if (IsExternalModuleNameRelative__from_tspath(name)) {
                {
                    const __gotots_results_0 = Resolver__from___go_module.ResolveModuleName((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).moduleResolver, name, SourceFile__from_ast.FileName(file), ModuleKindCommonJS$constant__from_core(), void 0);
                    let resolved: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_results_0[0];
                    if (ResolvedModule__from___go_module.IsResolved(resolved)) {
                        moduleFileName = ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
                        const __gotots_callee_0 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).toPath;
                        const __gotots_argument_0 = moduleFileName;
                        moduleID__shadow_1 = new ModuleID((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0).$value);
                    }
                    else {
                        moduleFileName = ResolvePath__from_tspath(GetDirectoryPath__from_tspath(SourceFile__from_ast.FileName(file)), RuntimeSlice.literal<gostring>([name]));
                        const __gotots_callee_1 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).toPath;
                        const __gotots_argument_1 = moduleFileName;
                        moduleID__shadow_1 = new ModuleID((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1).$value);
                    }
                }
            }
            exportExtractor.$go$private$autoimport$extractFromModuleDeclaration(e, decl, file, moduleID__shadow_1, moduleFileName, exports$location2);
        }
        return exports;
    }
    static $go$private$autoimport$extractFromModuleDeclaration(e: exportExtractor | undefined, decl: {
        value: ModuleDeclaration__from_ast;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, moduleID: ModuleID, moduleFileName: gostring, exports: tsonicTypeScriptRuntime.Location<RuntimeSlice<{
        value: Export;
    } | undefined>> | undefined): void {
        const __gotots_range_5 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
        const __gotots_range_keys_1 = __gotots_range_5.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_1) {
            const __gotots_range_value_9 = __gotots_range_5.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_8;
            const __gotots_range_value_11 = __gotots_range_value_9[0];
            let name = __gotots_range_value_10;
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_11;
            symbolExtractor.$go$private$autoimport$extractFromSymbol((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolExtractor, name, __go_symbol, moduleID, moduleFileName, file, exports);
        }
    }
}
export class extractorStats {
    declare private readonly $goType: void;
    public constructor(public exports: atomic__from_gostdlib.Int32, public usedChecker: atomic__from_gostdlib.Int32) {
    }
    static $zero(): extractorStats {
        return new extractorStats(named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero());
    }
    declare private readonly then?: never;
}
export class checkerLease {
    declare private readonly $goType: void;
    public constructor(public used: bool, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined) {
    }
    declare private readonly then?: never;
    static GetChecker(l: checkerLease | undefined): tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined {
        (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).used = true;
        return (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker;
    }
    static TryChecker(l: checkerLease | undefined): tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined {
        if ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).used) {
            return (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker;
        }
        return void 0;
    }
}
export function newSymbolExtractor(packageName: gostring, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, toPath: (($0: gostring) => Path__from_tspath) | undefined, realpath: (($0: gostring) => gostring) | undefined): symbolExtractor | undefined {
    return new symbolExtractor(packageName, new extractorStats(named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero()), { value: new NameResolver__from_binder($state__core.EmptyCompilerOptions, void 0, void 0, new SymbolTable__from_ast(GoMap.nil()), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0) }, checker__shadow_1, toPath, realpath);
}
export function shouldIgnoreSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0)) {
        return true;
    }
    return false;
}
export function getSyntax(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ExportSyntax {
    const __gotots_range_10 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_10.length; __gotots_range_index_6++) {
        const __gotots_range_value_22 = __gotots_range_10.get(__gotots_range_index_6);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_22;
        switch (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindExportSpecifier$constant__from_ast(): {
                return ExportSyntaxNamed$constant();
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return IfElse$Named_autoimport$ExportSyntax((Node__from_ast.AsExportAssignment(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals, ExportSyntaxEquals$constant(), ExportSyntaxDefaultDeclaration$constant());
                break;
            }
            case KindNamespaceExportDeclaration$constant__from_ast(): {
                return ExportSyntaxUMD$constant();
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                switch (GetAssignmentDeclarationKind__from_ast(decl).$value) {
                    case 1: {
                        return ExportSyntaxCommonJSModuleExports$constant();
                        break;
                    }
                    case 2: {
                        return ExportSyntaxCommonJSExportsProperty$constant();
                        break;
                    }
                }
                break;
            }
            default: {
                if (!((GetCombinedModifierFlags__from_ast(decl) & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0)) {
                    return ExportSyntaxDefaultModifier$constant();
                }
                else {
                    return ExportSyntaxModifier$constant();
                }
                break;
            }
        }
    }
    return ExportSyntaxNone$constant();
}
export function isUnusableName(name: gostring): bool {
    return name === "" || name === "_default" || name === InternalSymbolNameExportStar$string__from_ast || name === InternalSymbolNameDefault$string__from_ast || name === InternalSymbolNameExportEquals$string__from_ast;
}
export function fileNameForDefaultExportName(targetSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, moduleFileName: gostring, moduleID: ModuleID): gostring {
    if (!(targetSymbol === undefined) && Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        {
            let fn = SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0)));
            if (fn !== "") {
                return fn;
            }
        }
    }
    if (moduleFileName !== "") {
        return moduleFileName;
    }
    return moduleID.$value;
}
