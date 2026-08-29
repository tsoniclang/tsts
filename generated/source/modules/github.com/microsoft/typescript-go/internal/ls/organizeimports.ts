import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportDeclaration as ExportDeclaration__from_ast, ImportAttributes as ImportAttributes__from_ast, ImportDeclaration as ImportDeclaration__from_ast, NamedExports as NamedExports__from_ast, NamedImports as NamedImports__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { OrganizeImportsTypeOrder as OrganizeImportsTypeOrder__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { ImportAttribute as ImportAttribute__from_ast, ImportClause as ImportClause__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNewLineTrivia$constant as KindNewLineTrivia$constant__from_ast, Kind_String as Kind_String__from_ast, ModifiersBase as ModifiersBase__from_ast, NamespaceImport as NamespaceImport__from_ast, NewNodeFactory as NewNodeFactory__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactoryHooks as NodeFactoryHooks__from_ast, NodeFactory as NodeFactory__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SubtreeContainsJsx$constant as SubtreeContainsJsx$constant__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { JsxEmitReact$constant as JsxEmitReact$constant__from_core, JsxEmitReactNative$constant as JsxEmitReactNative$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { LeadingTriviaOptionExclude$constant as LeadingTriviaOptionExclude$constant__from_change, NodeOptions as NodeOptions__from_change, Tracker as Tracker__from_change, TrailingTriviaOptionInclude$constant as TrailingTriviaOptionInclude$constant__from_change } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { CodeLensUserPreferences as CodeLensUserPreferences__from_lsutil, CompareImportsOrRequireStatements as CompareImportsOrRequireStatements__from_lsutil, CompareModuleSpecifiers as CompareModuleSpecifiers__from_lsutil, FormatCodeSettings as FormatCodeSettings__from_lsutil, GetExternalModuleName as GetExternalModuleName__from_lsutil, GetNamedImportSpecifierComparer as GetNamedImportSpecifierComparer__from_lsutil, InlayHintsPreferences as InlayHintsPreferences__from_lsutil, JsxAttributeCompletionStyle as JsxAttributeCompletionStyle__from_lsutil, OrganizeImportsCaseFirst as OrganizeImportsCaseFirst__from_lsutil, OrganizeImportsCollation as OrganizeImportsCollation__from_lsutil, QuotePreference as QuotePreference__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreference__from_modulespecifiers, ImportModuleSpecifierPreference as ImportModuleSpecifierPreference__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { EFMultiLine$constant as EFMultiLine$constant__from_printer, EFNoLeadingComments$constant as EFNoLeadingComments$constant__from_printer, EmitContext as EmitContext__from_printer, RangeIsOnSingleLine as RangeIsOnSingleLine__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { NewScanner as NewScanner__from_scanner, Scanner as Scanner__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CompareStringsCaseSensitive as CompareStringsCaseSensitive__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, SortFunc$SliceOf_SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { SortStableFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, SortStableFunc$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$Node as GoMap } from "../../../../../../support/maps.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class organizeImportsComparerSettings {
    declare private readonly $goType: void;
    public constructor(public moduleSpecifierComparer: (($0: gostring, $1: gostring) => int) | undefined, public namedImportComparer: (($0: gostring, $1: gostring) => int) | undefined, public typeOrder: OrganizeImportsTypeOrder__from_lsutil) {
    }
    static $copy($source: organizeImportsComparerSettings): organizeImportsComparerSettings {
        return new organizeImportsComparerSettings($source.moduleSpecifierComparer, $source.namedImportComparer, $source.typeOrder);
    }
    declare private readonly then?: never;
}
export function organizeImportsWorker(oldImportDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, comparer: organizeImportsComparerSettings, shouldSort: bool, shouldCombine: bool, shouldRemove: bool, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, program: {
    value: Program__from_compiler;
} | undefined, changeTracker: Tracker__from_change | undefined, ctx: GoInterface | undefined): void {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                if (oldImportDecls.length === 0) {
                    break __gotots_return_block_0;
                }
                let processedImports = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(oldImportDecls);
                if (shouldRemove) {
                    const __gotots_results_0 = Program__from_compiler.GetTypeCheckerForFile(program, ctx, sourceFile);
                    let typeChecker: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_results_0[0];
                    let done: (() => void) | undefined = __gotots_results_0[1];
                    const __gotots_callee_0: (() => void) | undefined = done;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                    processedImports = removeUnusedImports(processedImports, sourceFile, typeChecker, program, changeTracker);
                }
                let newImportDecls = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                if (shouldCombine) {
                    let grouped = groupByModuleSpecifier(processedImports);
                    if (shouldSort) {
                        SortFunc$SliceOf_SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node(grouped, (a: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, b: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
                            if (a.length === 0 || b.length === 0) {
                                return 0;
                            }
                            return CompareModuleSpecifiers__from_lsutil(Node__from_ast.ModuleSpecifier(a.get(0)), Node__from_ast.ModuleSpecifier(b.get(0)), comparer.moduleSpecifierComparer);
                        });
                    }
                    let specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = GetNamedImportSpecifierComparer__from_lsutil(new UserPreferences__from_lsutil(FormatCodeSettings__from_lsutil.$zero(), new QuotePreference__from_lsutil(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle__from_lsutil(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation__from_lsutil(false), "", 0, 0, new OrganizeImportsCaseFirst__from_lsutil(0), comparer.typeOrder, 0, 0, 0, 0, InlayHintsPreferences__from_lsutil.$zero(), CodeLensUserPreferences__from_lsutil.$zero(), false, 0, 0, 0, 0, 0, 0, 0, ""), comparer.namedImportComparer);
                    const __gotots_range_1 = grouped;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                        let importGroup__shadow_1 = __gotots_range_value_1;
                        let coalesced = coalesceImportsWorker(importGroup__shadow_1, comparer.moduleSpecifierComparer, specifierComparer, sourceFile, changeTracker);
                        if (shouldSort) {
                            SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(coalesced, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                                return CompareImportsOrRequireStatements__from_lsutil(a, b, comparer.moduleSpecifierComparer);
                            });
                        }
                        newImportDecls = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newImportDecls, coalesced, void 0);
                    }
                }
                else {
                    newImportDecls = processedImports;
                }
                if (shouldSort && !shouldCombine) {
                    SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newImportDecls, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                        return CompareImportsOrRequireStatements__from_lsutil(a, b, comparer.moduleSpecifierComparer);
                    });
                }
                if (newImportDecls.length === 0) {
                    Tracker__from_change.DeleteNodeRange(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                        oldImportDecls.get(0)), (void Node__from_ast.AsNode,
                        oldImportDecls.get(oldImportDecls.length - 1)), LeadingTriviaOptionExclude$constant__from_change(), TrailingTriviaOptionInclude$constant__from_change());
                }
                else {
                    const __gotots_range_2 = newImportDecls;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                        EmitContext__from_printer.SetEmitFlags((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, (void Node__from_ast.AsNode,
                            imp), EFNoLeadingComments$constant__from_printer());
                    }
                    const __gotots_field_0 = LeadingTriviaOptionExclude$constant__from_change();
                    const __gotots_field_1 = TrailingTriviaOptionInclude$constant__from_change();
                    const __gotots_field_2 = "\n";
                    const __gotots_struct_0 = NodeOptions__from_change.$zero();
                    __gotots_struct_0.LeadingTriviaOption = __gotots_field_0;
                    __gotots_struct_0.TrailingTriviaOption = __gotots_field_1;
                    __gotots_struct_0.Suffix = __gotots_field_2;
                    let options = __gotots_struct_0;
                    let newNodes = Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newImportDecls, (s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                        return (void Node__from_ast.AsNode,
                            s);
                    });
                    Tracker__from_change.ReplaceNodeWithNodes(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                        oldImportDecls.get(0)), newNodes, options);
                    if (oldImportDecls.length > 1) {
                        for (let i = 1; i < oldImportDecls.length; i++) {
                            Tracker__from_change.Delete(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                                oldImportDecls.get(i)));
                        }
                    }
                }
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
}
export function groupByModuleSpecifier(imports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    let groups: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = GoMap.make(0, []);
    let order = RuntimeSlice.nil<gostring>();
    const __gotots_range_6 = imports;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
        let specifier = GetExternalModuleName__from_lsutil(Node__from_ast.ModuleSpecifier(imp));
        {
            const __gotots_results_1 = groups.lookupOk(specifier);
            let exists = __gotots_results_1[1];
            if (!exists) {
                order = order.append("", [specifier]);
            }
        }
        groups.store(specifier, groups.lookup(specifier).append(void 0, [imp]));
    }
    let result = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(0, order.length, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
    const __gotots_range_7 = order;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let key = __gotots_range_value_7;
        result = result.append(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), [groups.lookup(key)]);
    }
    return result;
}
export function removeUnusedImports(oldImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined, program: {
    value: Program__from_compiler;
} | undefined, changeTracker: Tracker__from_change | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = Program__from_compiler.Options(program);
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    const __gotots_binary_operand_0 = Node__from_ast.SubtreeFacts(NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
    const __gotots_binary_operand_1 = SubtreeContainsJsx$constant__from_ast();
    let jsxElementsPresent = !(((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0) === 0);
    let jsxModeNeedsExplicitImport__shadow_1 = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReact$constant__from_core() || (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactNative$constant__from_core();
    let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0));
    let usedImports = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, oldImports.length, void 0);
    const __gotots_range_5 = oldImports;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportDeclaration(importDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
        if (importClause === undefined) {
            usedImports = usedImports.append(void 0, [importDecl]);
            continue;
        }
        let clause: {
            value: ImportClause__from_ast;
        } | undefined = Node__from_ast.AsImportClause(importClause);
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ImportClause__from_ast.Name(clause);
        let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
        if (!(name === undefined) && !Checker__from_checker.IsDeclarationUsed(typeChecker, sourceFile, Node__from_ast.AsIdentifier(name), jsxElementsPresent, jsxModeNeedsExplicitImport__shadow_1)) {
            name = void 0;
        }
        if (!(namedBindings === undefined)) {
            switch (Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindNamespaceImport$constant__from_ast(): {
                    let nsImport: {
                        value: NamespaceImport__from_ast;
                    } | undefined = Node__from_ast.AsNamespaceImport(namedBindings);
                    if (!Checker__from_checker.IsDeclarationUsed(typeChecker, sourceFile, Node__from_ast.AsIdentifier(NamespaceImport__from_ast.Name(nsImport)), jsxElementsPresent, jsxModeNeedsExplicitImport__shadow_1)) {
                        namedBindings = void 0;
                    }
                    break;
                }
                case KindNamedImports$constant__from_ast(): {
                    let namedImports: {
                        value: NamedImports__from_ast;
                    } | undefined = Node__from_ast.AsNamedImports(namedBindings);
                    let originalBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = namedBindings;
                    let newElements = filterUsedImportSpecifiers(NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, typeChecker, sourceFile, jsxElementsPresent, jsxModeNeedsExplicitImport__shadow_1);
                    if (newElements.length === 0) {
                        namedBindings = void 0;
                    }
                    else if (newElements.length < NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length) {
                        let newList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(factory, newElements);
                        let updatedNamedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateNamedImports(factory, namedImports, newList);
                        namedBindings =
                            (void Node__from_ast.AsNode,
                                updatedNamedImports);
                    }
                    if (!(namedBindings === undefined) && !NodeIsSynthesized__from_ast((void Node__from_ast.AsNode,
                        originalBindings)) && !RangeIsOnSingleLine__from_printer(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((originalBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), sourceFile)) {
                        EmitContext__from_printer.SetEmitFlags((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, namedBindings, EFMultiLine$constant__from_printer());
                    }
                    break;
                }
            }
        }
        if (!(name === undefined) || !(namedBindings === undefined)) {
            let importDeclNode: {
                value: ImportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportDeclaration(importDecl);
            let newClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportClause(factory, clause, (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, name, namedBindings);
            const __gotots_receiver_0 = factory;
            const __gotots_argument_0 = importDeclNode;
            const __gotots_store_1 = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_1 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "ModifiersBase"));
            const __gotots_argument_2 = (void Node__from_ast.AsNode,
                newClause);
            const __gotots_argument_3: ImportDeclaration__from_ast["ModuleSpecifier"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_4: ImportDeclaration__from_ast["Attributes"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
            usedImports = usedImports.append(void 0, [newImportDecl]);
        }
        else {
            let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ModuleSpecifier(importDecl);
            if (hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier)) {
                if (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
                    let importDeclNode: {
                        value: ImportDeclaration__from_ast;
                    } | undefined = Node__from_ast.AsImportDeclaration(importDecl);
                    const __gotots_receiver_1 = factory;
                    const __gotots_argument_5 = importDeclNode;
                    const __gotots_store_2 = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_6 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "ModifiersBase"));
                    const __gotots_argument_7 = void 0;
                    const __gotots_argument_8: ImportDeclaration__from_ast["ModuleSpecifier"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                    const __gotots_argument_9: ImportDeclaration__from_ast["Attributes"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                    let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_1, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
                    usedImports = usedImports.append(void 0, [newImportDecl]);
                }
                else {
                    usedImports = usedImports.append(void 0, [importDecl]);
                }
            }
        }
    }
    return usedImports;
}
export function filterUsedImportSpecifiers(elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, typeChecker: {
    value: Checker__from_checker;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, jsxElementsPresent: bool, jsxModeNeedsExplicitImport__shadow_1: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_17 = elements;
    for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_17.length; __gotots_range_index_17++) {
        const __gotots_range_value_18 = __gotots_range_17.get(__gotots_range_index_17);
        let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
        let spec: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(elem);
        if (Checker__from_checker.IsDeclarationUsed(typeChecker, sourceFile, Node__from_ast.AsIdentifier(ImportSpecifier__from_ast.Name(spec)), jsxElementsPresent, jsxModeNeedsExplicitImport__shadow_1)) {
            result = result.append(void 0, [elem]);
        }
    }
    return result;
}
export function hasModuleDeclarationMatchingSpecifier(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (moduleSpecifier === undefined || !IsStringLiteral__from_ast((void Node__from_ast.AsNode,
        moduleSpecifier))) {
        return false;
    }
    let moduleSpecifierText = Node__from_ast.Text(moduleSpecifier);
    const __gotots_range_18 = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations;
    for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_18.length; __gotots_range_index_18++) {
        const __gotots_range_value_19 = __gotots_range_18.get(__gotots_range_index_18);
        let moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_19;
        if (IsStringLiteral__from_ast(moduleName) && Node__from_ast.Text(moduleName) === moduleSpecifierText) {
            return true;
        }
    }
    return false;
}
export function getImportAttributesKey(attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (attributes === undefined) {
        return "";
    }
    let importAttrs: {
        value: ImportAttributes__from_ast;
    } | undefined = Node__from_ast.AsImportAttributes(attributes);
    let key = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.WriteString(key, Kind_String__from_ast((importAttrs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Token));
    strings__from_gostdlib.Builder.WriteString(key, " ");
    let attrNodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(NodeList__from_ast.$storageOf((((importAttrs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, null, void 0);
    RuntimeSlice.copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(attrNodes, NodeList__from_ast.$storageOf((((importAttrs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
    SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(attrNodes, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        let aName = Node__from_ast.Text(ImportAttribute__from_ast.Name(Node__from_ast.AsImportAttribute(a)));
        let bName = Node__from_ast.Text(ImportAttribute__from_ast.Name(Node__from_ast.AsImportAttribute(b)));
        return CompareStringsCaseSensitive__from_stringutil(aName, bName);
    });
    const __gotots_range_19 = attrNodes;
    for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_19.length; __gotots_range_index_19++) {
        const __gotots_range_value_20 = __gotots_range_19.get(__gotots_range_index_19);
        let attrNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_20;
        let attr: {
            value: ImportAttribute__from_ast;
        } | undefined = Node__from_ast.AsImportAttribute(attrNode);
        strings__from_gostdlib.Builder.WriteString(key, Node__from_ast.Text(ImportAttribute__from_ast.Name(attr)));
        strings__from_gostdlib.Builder.WriteString(key, ":");
        if (IsStringLiteralLike__from_ast((void Node__from_ast.AsNode,
            (attr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value))) {
            strings__from_gostdlib.Builder.WriteString(key, "\"");
            strings__from_gostdlib.Builder.WriteString(key, Node__from_ast.Text((attr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value));
            strings__from_gostdlib.Builder.WriteString(key, "\"");
        }
        else {
            strings__from_gostdlib.Builder.WriteString(key, Node__from_ast.Text((void Node__from_ast.AsNode,
                (attr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value)));
        }
        strings__from_gostdlib.Builder.WriteString(key, " ");
    }
    return strings__from_gostdlib.Builder.String(key);
}
export function groupByNewlineContiguous(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, decls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    let s: Scanner__from_scanner | undefined = NewScanner__from_scanner();
    Scanner__from_scanner.SetSkipTrivia(s, false);
    let groups = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    let currentGroup = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_0 = decls;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (currentGroup.length > 0 && isNewGroup(sourceFile, decl, s)) {
            groups = groups.append(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), [currentGroup]);
            currentGroup = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        currentGroup = currentGroup.append(void 0, [decl]);
    }
    if (currentGroup.length > 0) {
        groups = groups.append(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), [currentGroup]);
    }
    return groups;
}
export function isNewGroup(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, s: Scanner__from_scanner | undefined): bool {
    let fullStart = Node__from_ast.Pos(decl);
    if (fullStart < 0) {
        return false;
    }
    let text = SourceFile__from_ast.Text(sourceFile);
    let textLen = text.length;
    if (fullStart >= textLen) {
        return false;
    }
    let startPos = SkipTrivia__from_scanner(text, fullStart);
    if (startPos <= fullStart) {
        return false;
    }
    let triviaLen = startPos - fullStart;
    Scanner__from_scanner.SetText(s, goStringSlice(text, fullStart, startPos));
    let numberOfNewLines = 0;
    for (; Scanner__from_scanner.TokenStart(s) < triviaLen;) {
        let tokenKind = Scanner__from_scanner.Scan(s);
        if (tokenKind === KindNewLineTrivia$constant__from_ast()) {
            numberOfNewLines++;
            if (numberOfNewLines >= 2) {
                return true;
            }
        }
    }
    return false;
}
export function coalesceImportsWorker(importDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, comparer: (($0: gostring, $1: gostring) => int) | undefined, specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, changeTracker: Tracker__from_change | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (importDecls.length === 0) {
        return importDecls;
    }
    let importGroupsByAttributes: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = GoMap.make(0, []);
    let attributeKeys = RuntimeSlice.nil<gostring>();
    const __gotots_range_8 = importDecls;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
        let key = getImportAttributesKey((Node__from_ast.AsImportDeclaration(importDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
        {
            const __gotots_results_2 = importGroupsByAttributes.lookupOk(key);
            let exists = __gotots_results_2[1];
            if (!exists) {
                attributeKeys = attributeKeys.append("", [key]);
            }
        }
        importGroupsByAttributes.store(key, importGroupsByAttributes.lookup(key).append(void 0, [importDecl]));
    }
    let coalescedImports = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, null, void 0);
    const __gotots_range_9 = attributeKeys;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
        let attributeKey = __gotots_range_value_9;
        let importGroupSameAttrs = importGroupsByAttributes.lookup(attributeKey);
        let categorized = getCategorizedImports(importGroupSameAttrs);
        if (!(categorized.importWithoutClause === undefined)) {
            coalescedImports = coalescedImports.append(void 0, [categorized.importWithoutClause]);
        }
        let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0));
        const __gotots_range_10 = RuntimeSlice.literal<importGroup$Storage>([importGroup.$storageOf(importGroup.$copy(categorized.regularImports)), importGroup.$storageOf(importGroup.$copy(categorized.typeOnlyImports))]);
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_10 = __gotots_range_index_10;
            const __gotots_range_value_11 = importGroup.$copy(importGroup.$fromStorage(__gotots_range_10.get(__gotots_range_index_10)));
            let i = __gotots_range_value_10;
            let group = __gotots_range_value_11;
            if (group.$go$private$ls$isEmpty()) {
                continue;
            }
            let isTypeOnly = i === 1;
            if (!isTypeOnly && importGroup.$storageOf(group).defaultImports.length === 1 && importGroup.$storageOf(group).namespaceImports.length === 1 && importGroup.$storageOf(group).namedImports.length === 0) {
                let defaultImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = importGroup.$storageOf(group).defaultImports.get(0);
                let namespaceImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = importGroup.$storageOf(group).namespaceImports.get(0);
                let defaultClause: {
                    value: ImportClause__from_ast;
                } | undefined = Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(defaultImport) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                let namespaceBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(namespaceImport) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
                let newClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportClause(factory, defaultClause, (defaultClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, ImportClause__from_ast.Name(defaultClause), namespaceBindings);
                let defaultDeclNode: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(defaultImport);
                const __gotots_receiver_2 = factory;
                const __gotots_argument_10 = defaultDeclNode;
                const __gotots_store_3 = (defaultDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_11 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "ModifiersBase"));
                const __gotots_argument_12 = newClause;
                const __gotots_argument_13: ImportDeclaration__from_ast["ModuleSpecifier"] = (defaultDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_14: ImportDeclaration__from_ast["Attributes"] = (defaultDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_2, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
                coalescedImports = coalescedImports.append(void 0, [newImportDecl]);
                continue;
            }
            SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(importGroup.$storageOf(group).namespaceImports, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                let n1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NamespaceImport__from_ast.Name(Node__from_ast.AsNamespaceImport((Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(a) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings));
                let n2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NamespaceImport__from_ast.Name(Node__from_ast.AsNamespaceImport((Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(b) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings));
                const __gotots_callee_0 = comparer;
                const __gotots_argument_15 = Node__from_ast.Text(n1);
                const __gotots_argument_16 = Node__from_ast.Text(n2);
                return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16);
            });
            const __gotots_range_11 = importGroup.$storageOf(group).namespaceImports;
            for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
                const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_11);
                let nsImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
                let nsImportDecl: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(nsImport);
                let clause: {
                    value: ImportClause__from_ast;
                } | undefined = Node__from_ast.AsImportClause((nsImportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                let newClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportClause(factory, clause, (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, void 0, (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
                const __gotots_receiver_3 = factory;
                const __gotots_argument_17 = nsImportDecl;
                const __gotots_store_4 = (nsImportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_18 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "ModifiersBase"));
                const __gotots_argument_19 = newClause;
                const __gotots_argument_20: ImportDeclaration__from_ast["ModuleSpecifier"] = (nsImportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_21: ImportDeclaration__from_ast["Attributes"] = (nsImportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_3, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
                coalescedImports = coalescedImports.append(void 0, [newImportDecl]);
            }
            let firstDefaultImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            let firstNamedImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (importGroup.$storageOf(group).defaultImports.length > 0) {
                firstDefaultImport = importGroup.$storageOf(group).defaultImports.get(0);
            }
            if (importGroup.$storageOf(group).namedImports.length > 0) {
                firstNamedImport = importGroup.$storageOf(group).namedImports.get(0);
            }
            let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = firstDefaultImport;
            if (importDecl === undefined) {
                importDecl = firstNamedImport;
            }
            if (importDecl === undefined) {
                continue;
            }
            let newDefaultImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            let newImportSpecifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (importGroup.$storageOf(group).defaultImports.length === 1) {
                newDefaultImport = ImportClause__from_ast.Name(Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(importGroup.$storageOf(group).defaultImports.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause));
            }
            else {
                const __gotots_range_12 = importGroup.$storageOf(group).defaultImports;
                for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
                    const __gotots_range_value_13 = __gotots_range_12.get(__gotots_range_index_12);
                    let defaultImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
                    let defaultClause: {
                        value: ImportClause__from_ast;
                    } | undefined = Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(defaultImport) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                    let defaultName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ImportClause__from_ast.Name(defaultClause);
                    let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(factory, "default");
                    let importSpec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportSpecifier(factory, false, propertyName, defaultName);
                    newImportSpecifiers = newImportSpecifiers.append(void 0, [importSpec]);
                }
            }
            newImportSpecifiers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newImportSpecifiers, getNewImportSpecifiers(importGroup.$storageOf(group).namedImports, factory), void 0);
            SortStableFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newImportSpecifiers, specifierComparer);
            let newNamedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (newImportSpecifiers.length === 0) {
                if (!(newDefaultImport === undefined)) {
                    newNamedImports = void 0;
                }
                else {
                    newNamedImports = NodeFactory__from_ast.NewNamedImports(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()));
                }
            }
            else {
                let sortedList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(factory, newImportSpecifiers);
                if (!(firstNamedImport === undefined)) {
                    let firstNamedBindings: {
                        value: NamedImports__from_ast;
                    } | undefined = Node__from_ast.AsNamedImports((Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(firstNamedImport) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
                    let originalElements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (firstNamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                    if (NodeList__from_ast.HasTrailingComma(originalElements)) {
                        NodeList__from_ast.$storageOf(((sortedList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((originalElements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                    }
                    newNamedImports =
                        (void Node__from_ast.AsNode,
                            NodeFactory__from_ast.UpdateNamedImports(factory, firstNamedBindings, sortedList));
                }
                else {
                    newNamedImports = NodeFactory__from_ast.NewNamedImports(factory, sortedList);
                }
            }
            if (!(sourceFile === undefined) && !(newNamedImports === undefined) && !(firstNamedImport === undefined)) {
                let firstNamedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(firstNamedImport) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
                if (!NodeIsSynthesized__from_ast((void Node__from_ast.AsNode,
                    firstNamedBindings)) && !RangeIsOnSingleLine__from_printer(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((firstNamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), sourceFile)) {
                    EmitContext__from_printer.SetEmitFlags((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, (void Node__from_ast.AsNode,
                        newNamedImports), EFMultiLine$constant__from_printer());
                }
            }
            if (isTypeOnly && !(newDefaultImport === undefined) && !(newNamedImports === undefined)) {
                let importDeclNode: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(importDecl);
                let defaultClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportClause(factory, (Node__from_ast.AsImportClause((importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, newDefaultImport, void 0);
                const __gotots_receiver_4 = factory;
                const __gotots_argument_22 = importDeclNode;
                const __gotots_store_5 = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_23 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "ModifiersBase"));
                const __gotots_argument_24 = defaultClause;
                const __gotots_argument_25: ImportDeclaration__from_ast["ModuleSpecifier"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_26: ImportDeclaration__from_ast["Attributes"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let defaultImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_4, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
                coalescedImports = coalescedImports.append(void 0, [defaultImportDecl]);
                let namedDeclNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = firstNamedImport;
                if (namedDeclNode === undefined) {
                    namedDeclNode = importDecl;
                }
                let namedImportDeclNode: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(namedDeclNode);
                let namedClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportClause(factory, (Node__from_ast.AsImportClause((namedImportDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, void 0, newNamedImports);
                const __gotots_receiver_5 = factory;
                const __gotots_argument_27 = namedImportDeclNode;
                const __gotots_store_6 = (namedImportDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_28 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "ModifiersBase"));
                const __gotots_argument_29 = namedClause;
                const __gotots_argument_30: ImportDeclaration__from_ast["ModuleSpecifier"] = (namedImportDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_31: ImportDeclaration__from_ast["Attributes"] = (namedImportDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let namedImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_5, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
                coalescedImports = coalescedImports.append(void 0, [namedImportDecl]);
            }
            else {
                let importDeclNode: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(importDecl);
                let clauseNode: {
                    value: ImportClause__from_ast;
                } | undefined = Node__from_ast.AsImportClause((importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                let newClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportClause(factory, clauseNode, (clauseNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, newDefaultImport, newNamedImports);
                const __gotots_receiver_6 = factory;
                const __gotots_argument_32 = importDeclNode;
                const __gotots_store_7 = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_33 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "ModifiersBase"));
                const __gotots_argument_34 = newClause;
                const __gotots_argument_35: ImportDeclaration__from_ast["ModuleSpecifier"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                const __gotots_argument_36: ImportDeclaration__from_ast["Attributes"] = (importDeclNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                let newImportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_6, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
                coalescedImports = coalescedImports.append(void 0, [newImportDecl]);
            }
        }
    }
    return coalescedImports;
}
export class categorizedImports {
    declare private readonly $goType: void;
    public constructor(public importWithoutClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public typeOnlyImports: importGroup, public regularImports: importGroup) {
    }
    declare private readonly then?: never;
}
export type importGroup$Storage = {
    defaultImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    namespaceImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
};
export class importGroup {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: importGroup$Storage) {
    }
    public static $storageOf($source: importGroup): importGroup$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: importGroup$Storage): importGroup {
        return new importGroup($source);
    }
    public get defaultImports(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.defaultImports;
    }
    public set defaultImports($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.defaultImports = $value;
    }
    public get namespaceImports(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.namespaceImports;
    }
    public set namespaceImports($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.namespaceImports = $value;
    }
    public get namedImports(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.namedImports;
    }
    public set namedImports($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.namedImports = $value;
    }
    static $zero(): importGroup {
        return new importGroup({
            defaultImports: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(),
            namespaceImports: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(),
            namedImports: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()
        });
    }
    static $copy($source: importGroup): importGroup {
        return new importGroup({
            defaultImports: $source.$storage.defaultImports,
            namespaceImports: $source.$storage.namespaceImports,
            namedImports: $source.$storage.namedImports
        });
    }
    declare private readonly then?: never;
    $go$private$ls$isEmpty(): bool {
        return this.defaultImports.length === 0 && this.namespaceImports.length === 0 && this.namedImports.length === 0;
    }
}
export function getCategorizedImports(importDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): categorizedImports {
    let importWithoutClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let typeOnlyImports = importGroup.$zero(), regularImports = importGroup.$zero();
    const __gotots_range_20 = importDecls;
    for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_20.length; __gotots_range_index_20++) {
        const __gotots_range_value_21 = __gotots_range_20.get(__gotots_range_index_20);
        let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_21;
        if ((Node__from_ast.AsImportDeclaration(importDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
            if (importWithoutClause === undefined) {
                importWithoutClause = importDecl;
            }
            continue;
        }
        let clause: {
            value: ImportClause__from_ast;
        } | undefined = Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(importDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
        let group: importGroup | undefined = regularImports;
        const __gotots_store_10 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
        if (Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf))) {
            group = typeOnlyImports;
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ImportClause__from_ast.Name(clause);
        let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
        if (!(name === undefined)) {
            importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).defaultImports = importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).defaultImports.append(void 0, [importDecl]);
        }
        if (!(namedBindings === undefined)) {
            switch (Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindNamespaceImport$constant__from_ast(): {
                    importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).namespaceImports = importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).namespaceImports.append(void 0, [importDecl]);
                    break;
                }
                case KindNamedImports$constant__from_ast(): {
                    importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).namedImports = importGroup.$storageOf((group ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).namedImports.append(void 0, [importDecl]);
                    break;
                }
            }
        }
    }
    return new categorizedImports(importWithoutClause, importGroup.$copy(typeOnlyImports), importGroup.$copy(regularImports));
}
export function getNewImportSpecifiers(namedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_21 = namedImports;
    for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_21.length; __gotots_range_index_21++) {
        const __gotots_range_value_22 = __gotots_range_21.get(__gotots_range_index_21);
        let namedImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_22;
        let elements = tryGetNamedBindingElements(namedImport);
        if (elements.isNil()) {
            continue;
        }
        const __gotots_range_22 = elements;
        for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_22.length; __gotots_range_index_22++) {
            const __gotots_range_value_23 = __gotots_range_22.get(__gotots_range_index_22);
            let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_23;
            let spec: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(elem);
            if (!(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined) && !(ImportSpecifier__from_ast.Name(spec) === undefined)) {
                let propertyText = Node__from_ast.Text(ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName);
                let nameText = Node__from_ast.Text(ImportSpecifier__from_ast.Name(spec));
                if (propertyText === nameText) {
                    let normalized: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateImportSpecifier(factory, spec, ImportSpecifier__from_ast.$storageOf(((spec ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly, void 0, ImportSpecifier__from_ast.Name(spec));
                    result = result.append(void 0, [normalized]);
                    continue;
                }
            }
            result = result.append(void 0, [elem]);
        }
    }
    return result;
}
export function tryGetNamedBindingElements(namedImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (!(Node__from_ast.$storageOf(((namedImport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast())) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let importDecl: {
        value: ImportDeclaration__from_ast;
    } | undefined = Node__from_ast.AsImportDeclaration(namedImport);
    if ((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let clause: {
        value: ImportClause__from_ast;
    } | undefined = Node__from_ast.AsImportClause((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
    let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
    if (!(namedBindings === undefined) && Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()) {
        let namedImportsNode: {
            value: NamedImports__from_ast;
        } | undefined = Node__from_ast.AsNamedImports(namedBindings);
        return NodeList__from_ast.$storageOf((((namedImportsNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function getTopLevelExportGroups(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    let topLevelExportGroups = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    let statements = NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    let statementsLen = statements.length;
    let i = 0;
    let groupIndex = 0;
    for (; i < statementsLen;) {
        if (Node__from_ast.$storageOf(((statements.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportDeclaration$constant__from_ast()) {
            if (groupIndex >= topLevelExportGroups.length) {
                topLevelExportGroups = topLevelExportGroups.append(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), [RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])]);
            }
            let exportDecl: {
                value: ExportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsExportDeclaration(statements.get(i));
            if (!((exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) {
                topLevelExportGroups.set(groupIndex, topLevelExportGroups.get(groupIndex).append(void 0, [statements.get(i)]));
                i++;
            }
            else {
                for (; i < statementsLen && Node__from_ast.$storageOf(((statements.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportDeclaration$constant__from_ast();) {
                    topLevelExportGroups.set(groupIndex, topLevelExportGroups.get(groupIndex).append(void 0, [statements.get(i)]));
                    i++;
                }
                groupIndex++;
            }
        }
        else {
            i++;
            if (groupIndex < topLevelExportGroups.length && topLevelExportGroups.get(groupIndex).length > 0) {
                groupIndex++;
            }
        }
    }
    let result = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    const __gotots_range_3 = topLevelExportGroups;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let exportGroup = __gotots_range_value_3;
        let subGroups = groupByNewlineContiguous(sourceFile, exportGroup);
        result = goSliceAppendSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(result, subGroups, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
    }
    return result;
}
export function organizeExportsWorker(oldExportDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, comparer: organizeImportsComparerSettings, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, changeTracker: Tracker__from_change | undefined): void {
    if (oldExportDecls.length === 0) {
        return;
    }
    let specifierComparerFunc: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = GetNamedImportSpecifierComparer__from_lsutil(new UserPreferences__from_lsutil(FormatCodeSettings__from_lsutil.$zero(), new QuotePreference__from_lsutil(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle__from_lsutil(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation__from_lsutil(false), "", 0, 0, new OrganizeImportsCaseFirst__from_lsutil(0), comparer.typeOrder, 0, 0, 0, 0, InlayHintsPreferences__from_lsutil.$zero(), CodeLensUserPreferences__from_lsutil.$zero(), false, 0, 0, 0, 0, 0, 0, 0, ""), comparer.namedImportComparer);
    let newExportDecls = coalesceExportsWorker(oldExportDecls, specifierComparerFunc, comparer.moduleSpecifierComparer, sourceFile, changeTracker);
    if (oldExportDecls.length > 0) {
        if (newExportDecls.length === 0) {
            Tracker__from_change.DeleteNodeRange(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                oldExportDecls.get(0)), (void Node__from_ast.AsNode,
                oldExportDecls.get(oldExportDecls.length - 1)), LeadingTriviaOptionExclude$constant__from_change(), TrailingTriviaOptionInclude$constant__from_change());
        }
        else {
            const __gotots_range_4 = newExportDecls;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                let exp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                EmitContext__from_printer.AddEmitFlags((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, (void Node__from_ast.AsNode,
                    exp), EFNoLeadingComments$constant__from_printer());
            }
            const __gotots_field_3 = LeadingTriviaOptionExclude$constant__from_change();
            const __gotots_field_4 = TrailingTriviaOptionInclude$constant__from_change();
            const __gotots_field_5 = "\n";
            const __gotots_struct_1 = NodeOptions__from_change.$zero();
            __gotots_struct_1.LeadingTriviaOption = __gotots_field_3;
            __gotots_struct_1.TrailingTriviaOption = __gotots_field_4;
            __gotots_struct_1.Suffix = __gotots_field_5;
            let options = __gotots_struct_1;
            let newNodes = Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newExportDecls, (s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return (void Node__from_ast.AsNode,
                    s);
            });
            Tracker__from_change.ReplaceNodeWithNodes(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                oldExportDecls.get(0)), newNodes, options);
            if (oldExportDecls.length > 1) {
                for (let i = 1; i < oldExportDecls.length; i++) {
                    Tracker__from_change.Delete(changeTracker, sourceFile, (void Node__from_ast.AsNode,
                        oldExportDecls.get(i)));
                }
            }
        }
    }
}
export function coalesceExportsWorker(exportGroup: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined, moduleSpecifierComparer: (($0: gostring, $1: gostring) => int) | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, changeTracker: Tracker__from_change | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (exportGroup.length === 0) {
        return exportGroup;
    }
    let exportsByModuleSpecifier: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = GoMap.make(0, []);
    let moduleSpecifierOrder = RuntimeSlice.nil<gostring>();
    const __gotots_range_13 = exportGroup;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
        const __gotots_range_value_14 = __gotots_range_13.get(__gotots_range_index_13);
        let exportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
        let __go_export: {
            value: ExportDeclaration__from_ast;
        } | undefined = Node__from_ast.AsExportDeclaration(exportDecl);
        let moduleSpecifier = "";
        if (!((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) {
            moduleSpecifier = Node__from_ast.Text((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier);
        }
        {
            const __gotots_results_3 = exportsByModuleSpecifier.lookupOk(moduleSpecifier);
            let exists = __gotots_results_3[1];
            if (!exists) {
                moduleSpecifierOrder = moduleSpecifierOrder.append("", [moduleSpecifier]);
            }
        }
        exportsByModuleSpecifier.store(moduleSpecifier, exportsByModuleSpecifier.lookup(moduleSpecifier).append(void 0, [exportDecl]));
    }
    SortStableFunc$SliceOf_string$string(moduleSpecifierOrder, (a: gostring, b: gostring): int => {
        if (a === "" && b !== "") {
            return 1;
        }
        if (a !== "" && b === "") {
            return -1;
        }
        const __gotots_callee_1 = moduleSpecifierComparer;
        const __gotots_argument_37 = a;
        const __gotots_argument_38 = b;
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38);
    });
    let coalescedExports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0));
    const __gotots_range_14 = moduleSpecifierOrder;
    for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
        const __gotots_range_value_15 = __gotots_range_14.get(__gotots_range_index_14);
        let moduleSpecifier = __gotots_range_value_15;
        let group = exportsByModuleSpecifier.lookup(moduleSpecifier);
        let categorized = getCategorizedExports(group);
        if (!(categorized.exportWithoutClause === undefined)) {
            coalescedExports = coalescedExports.append(void 0, [categorized.exportWithoutClause]);
        }
        const __gotots_range_15 = RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>([categorized.namedExports, categorized.typeOnlyExports]);
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
            const __gotots_range_value_16 = __gotots_range_15.get(__gotots_range_index_15);
            let subGroup = __gotots_range_value_16;
            if (subGroup.length === 0) {
                continue;
            }
            let newExportSpecifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_16 = subGroup;
            for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
                const __gotots_range_value_17 = __gotots_range_16.get(__gotots_range_index_16);
                let exportDecl__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_17;
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(exportDecl__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                if (!(exportClause === undefined) && Node__from_ast.$storageOf(((exportClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedExports$constant__from_ast()) {
                    let namedExports: {
                        value: NamedExports__from_ast;
                    } | undefined = Node__from_ast.AsNamedExports(exportClause);
                    newExportSpecifiers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newExportSpecifiers, NodeList__from_ast.$storageOf((((namedExports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                }
            }
            SortStableFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newExportSpecifiers, specifierComparer);
            let exportDecl: {
                value: ExportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsExportDeclaration(subGroup.get(0));
            let updatedExportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!((exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) {
                if (Node__from_ast.$storageOf((((exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedExports$constant__from_ast()) {
                    let namedExports: {
                        value: NamedExports__from_ast;
                    } | undefined = Node__from_ast.AsNamedExports((exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                    let sortedList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(factory, newExportSpecifiers);
                    updatedExportClause = NodeFactory__from_ast.UpdateNamedExports(factory, namedExports, sortedList);
                    let __gotots_logical_result_0 = !(sourceFile === undefined);
                    if (__gotots_logical_result_0) {
                        const __gotots_store_8 = NodeBase__from_ast.$storageOf((namedExports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                        const __gotots_argument_39 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        __gotots_logical_result_0 = !NodeIsSynthesized__from_ast(__gotots_argument_39);
                    }
                    if (__gotots_logical_result_0 && !RangeIsOnSingleLine__from_printer(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            NodeBase__from_ast.$storageOf((namedExports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Loc)), sourceFile)) {
                        EmitContext__from_printer.SetEmitFlags((changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, (void Node__from_ast.AsNode,
                            updatedExportClause), EFMultiLine$constant__from_printer());
                    }
                }
                else {
                    updatedExportClause = (exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                }
            }
            const __gotots_receiver_7 = factory;
            const __gotots_argument_40 = exportDecl;
            const __gotots_store_9 = (exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_41 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "ModifiersBase"));
            const __gotots_argument_42: ExportDeclaration__from_ast["IsTypeOnly"] = (exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly;
            const __gotots_argument_43 = updatedExportClause;
            const __gotots_argument_44: ExportDeclaration__from_ast["ModuleSpecifier"] = (exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_45: ExportDeclaration__from_ast["Attributes"] = (exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            let newExportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateExportDeclaration(__gotots_receiver_7, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45);
            coalescedExports = coalescedExports.append(void 0, [newExportDecl]);
        }
    }
    return coalescedExports;
}
export class categorizedExports {
    declare private readonly $goType: void;
    public constructor(public exportWithoutClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public namedExports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public typeOnlyExports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
}
export function getCategorizedExports(exportGroup: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): categorizedExports {
    let exportWithoutClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let namedExports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), typeOnlyExports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_23 = exportGroup;
    for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_23.length; __gotots_range_index_23++) {
        const __gotots_range_value_24 = __gotots_range_23.get(__gotots_range_index_23);
        let exportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_24;
        let __go_export: {
            value: ExportDeclaration__from_ast;
        } | undefined = Node__from_ast.AsExportDeclaration(exportDecl);
        if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined) {
            if (exportWithoutClause === undefined) {
                exportWithoutClause = exportDecl;
            }
        }
        else if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) {
            typeOnlyExports = typeOnlyExports.append(void 0, [exportDecl]);
        }
        else {
            namedExports = namedExports.append(void 0, [exportDecl]);
        }
    }
    return new categorizedExports(exportWithoutClause, namedExports, typeOnlyExports);
}
