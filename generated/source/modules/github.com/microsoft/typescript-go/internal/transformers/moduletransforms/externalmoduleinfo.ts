import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ExportSpecifier as ExportSpecifier__from_ast, ImportClause as ImportClause__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, NamedImports as NamedImports__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BindingElement as BindingElement__from_ast, ClassDeclaration as ClassDeclaration__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, GetNamespaceDeclarationNode as GetNamespaceDeclarationNode__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsDefaultImport as IsDefaultImport__from_ast, IsEffectiveExternalModule as IsEffectiveExternalModule__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExternalModuleReference as IsExternalModuleReference__from_ast, IsNamedExports as IsNamedExports__from_ast, IsNamedImports as IsNamedImports__from_ast, IsNotEmittedStatement as IsNotEmittedStatement__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModuleExportNameIsDefault as ModuleExportNameIsDefault__from_ast, NamespaceExport as NamespaceExport__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, StatementBase as StatementBase__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { MultiMap as MultiMap__from_collections, OrderedSet as OrderedSet__from_collections, Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleKindSystem$constant as ModuleKindSystem$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EFCustomPrologue$constant as EFCustomPrologue$constant__from_printer, EFExternalHelpers$constant as EFExternalHelpers$constant__from_printer, EmitContext as EmitContext__from_printer, IsFileLevelUniqueName as IsFileLevelUniqueName__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { CompareStringsCaseSensitive as CompareStringsCaseSensitive__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { IsLocalName as IsLocalName__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { MultiMap$Add$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, MultiMap$Add$string$PointerTo_Named_ast$ExportSpecifier } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/MultiMap$Add.js";
import { OrderedSet$Add$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Add.js";
import { Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { AppendIfUnique$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Map$string$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { SortFunc$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_SliceOf_PointerTo_Named_ast$Node, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$ExportSpecifier, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class externalModuleInfo {
    declare private readonly $goType: void;
    public constructor(public externalImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public exportSpecifiers: MultiMap__from_collections<gostring, {
        value: ExportSpecifier__from_ast;
    } | undefined>, public exportedBindings: MultiMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public exportedNames: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public exportedFunctions: OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public exportEquals: {
        value: ExportAssignment__from_ast;
    } | undefined, public hasExportStarsToExportValues: bool) {
    }
    declare private readonly then?: never;
}
export class externalModuleInfoCollector {
    declare private readonly $goType: void;
    public constructor(public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public emitContext: {
        value: EmitContext__from_printer;
    } | undefined, public resolver: ReferenceResolver__from_binder | undefined, public uniqueExports: Set__from_collections<gostring>, public hasExportDefault: bool, public output: externalModuleInfo | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$moduletransforms$addExportedBinding(c: externalModuleInfoCollector | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_22 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        MultiMap$Add$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(__gotots_store_22.exportedBindings, EmitContext__from_printer.MostOriginal((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, decl), name);
    }
    static $go$private$moduletransforms$addExportedFunctionDeclaration(c: externalModuleInfoCollector | undefined, node: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isDefault: bool): void {
        const __gotots_store_23 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "exportedFunctions");
        const __gotots_receiver_10 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext;
        const __gotots_store_24 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_24 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_25 = EmitContext__from_printer.MostOriginal(__gotots_receiver_10, __gotots_argument_24);
        OrderedSet$Add$PointerTo_Named_ast$Node(__gotots_receiver_11, __gotots_argument_25);
        if (isDefault) {
            if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasExportDefault) {
                if (name === undefined) {
                    const __gotots_receiver_12: EmitContext__from_printer["Factory"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
                    const __gotots_store_25 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                            FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
                    const __gotots_argument_26 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    name = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_12, __gotots_argument_26);
                }
                const __gotots_receiver_13 = c;
                const __gotots_store_26 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
                const __gotots_argument_27 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_28 = name;
                externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(__gotots_receiver_13, __gotots_argument_27, __gotots_argument_28);
                (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasExportDefault = true;
            }
        }
        else {
            if (name === undefined) {
                name = FunctionDeclaration__from_ast.Name(node);
            }
            let nameText = Node__from_ast.Text(name);
            if (externalModuleInfoCollector.$go$private$moduletransforms$addUniqueExport(c, nameText)) {
                const __gotots_receiver_14 = c;
                const __gotots_store_27 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
                const __gotots_argument_29 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_30 = name;
                externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(__gotots_receiver_14, __gotots_argument_29, __gotots_argument_30);
            }
        }
    }
    static $go$private$moduletransforms$addExportedName(c: externalModuleInfoCollector | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedNames = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedNames.append(void 0, [name]);
    }
    static $go$private$moduletransforms$addExportedNamesForExportDeclaration(c: externalModuleInfoCollector | undefined, node: {
        value: ExportDeclaration__from_ast;
    } | undefined): void {
        const __gotots_range_5 = Node__from_ast.Elements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            let specifierNameText = Node__from_ast.Text(Node__from_ast.Name(specifier));
            if (externalModuleInfoCollector.$go$private$moduletransforms$addUniqueExport(c, specifierNameText)) {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyNameOrName(specifier);
                if (!(Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast())) {
                    if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
                        const __gotots_store_18 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        MultiMap$Add$string$PointerTo_Named_ast$ExportSpecifier(__gotots_store_18.exportSpecifiers, Node__from_ast.Text(name), Node__from_ast.AsExportSpecifier(specifier));
                    }
                    const __gotots_receiver_8 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                    const __gotots_argument_22 = EmitContext__from_printer.MostOriginal((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, name);
                    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_8).GetReferencedImportDeclaration(__gotots_argument_22);
                    if (decl === undefined) {
                        const __gotots_receiver_9 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                        const __gotots_argument_23 = EmitContext__from_printer.MostOriginal((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, name);
                        decl = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_9).GetReferencedValueDeclaration(__gotots_argument_23);
                    }
                    if (!(decl === undefined)) {
                        if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast()) {
                            const __gotots_store_19 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            Set__from_collections.Delete<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "uniqueExports"), specifierNameText);
                            externalModuleInfoCollector.$go$private$moduletransforms$addExportedFunctionDeclaration(c, Node__from_ast.AsFunctionDeclaration(decl), Node__from_ast.Name(specifier), ModuleExportNameIsDefault__from_ast(Node__from_ast.Name(specifier)));
                            continue;
                        }
                        externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(c, decl, Node__from_ast.Name(specifier));
                    }
                }
                externalModuleInfoCollector.$go$private$moduletransforms$addExportedName(c, Node__from_ast.Name(specifier));
            }
        }
    }
    static $go$private$moduletransforms$addExternalImport(c: externalModuleInfoCollector | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).externalImports = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).externalImports.append(void 0, [node]);
    }
    static $go$private$moduletransforms$addUniqueExport(c: externalModuleInfoCollector | undefined, name: gostring): bool {
        const __gotots_store_20 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (!Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "uniqueExports"), name)) {
            const __gotots_store_21 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "uniqueExports"), name);
            return true;
        }
        return false;
    }
    static $go$private$moduletransforms$collect(c: externalModuleInfoCollector | undefined): externalModuleInfo | undefined {
        let hasImportStar = false;
        let hasImportDefault = false;
        const __gotots_range_3 = NodeList__from_ast.$storageOf((((((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            if (IsNotEmittedStatement__from_ast(node)) {
                let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, node);
                if (!(original === undefined) && IsExportAssignment__from_ast(original)) {
                    let n: {
                        value: ExportAssignment__from_ast;
                    } | undefined = Node__from_ast.AsExportAssignment(original);
                    if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals && ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined) {
                        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals = n;
                    }
                }
                continue;
            }
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindImportDeclaration$constant__from_ast(): {
                    let n: {
                        value: ImportDeclaration__from_ast;
                    } | undefined = Node__from_ast.AsImportDeclaration(node);
                    externalModuleInfoCollector.$go$private$moduletransforms$addExternalImport(c, node);
                    if (!hasImportStar && getImportNeedsImportStarHelper(n)) {
                        hasImportStar = true;
                    }
                    if (!hasImportDefault && getImportNeedsImportDefaultHelper(n)) {
                        hasImportDefault = true;
                    }
                    break;
                }
                case KindImportEqualsDeclaration$constant__from_ast(): {
                    let n: {
                        value: ImportEqualsDeclaration__from_ast;
                    } | undefined = Node__from_ast.AsImportEqualsDeclaration(node);
                    if (IsExternalModuleReference__from_ast((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference)) {
                        externalModuleInfoCollector.$go$private$moduletransforms$addExternalImport(c, node);
                    }
                    break;
                }
                case KindExportDeclaration$constant__from_ast(): {
                    let n: {
                        value: ExportDeclaration__from_ast;
                    } | undefined = Node__from_ast.AsExportDeclaration(node);
                    if (!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) {
                        externalModuleInfoCollector.$go$private$moduletransforms$addExternalImport(c, node);
                        if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined) {
                            ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasExportStarsToExportValues = true;
                        }
                        else if (IsNamedExports__from_ast((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause)) {
                            externalModuleInfoCollector.$go$private$moduletransforms$addExportedNamesForExportDeclaration(c, n);
                            if (!hasImportDefault) {
                                hasImportDefault = containsDefaultReference((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                            }
                        }
                        else {
                            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NamespaceExport__from_ast.Name(Node__from_ast.AsNamespaceExport((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause));
                            let nameText = Node__from_ast.Text(name);
                            if (externalModuleInfoCollector.$go$private$moduletransforms$addUniqueExport(c, nameText)) {
                                externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(c, node, name);
                                externalModuleInfoCollector.$go$private$moduletransforms$addExportedName(c, name);
                            }
                            hasImportStar = true;
                        }
                    }
                    else {
                        externalModuleInfoCollector.$go$private$moduletransforms$addExportedNamesForExportDeclaration(c, Node__from_ast.AsExportDeclaration(node));
                    }
                    break;
                }
                case KindExportAssignment$constant__from_ast(): {
                    let n: {
                        value: ExportAssignment__from_ast;
                    } | undefined = Node__from_ast.AsExportAssignment(node);
                    if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals && ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined) {
                        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals = n;
                    }
                    break;
                }
                case KindVariableStatement$constant__from_ast(): {
                    let n: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined = Node__from_ast.AsVariableStatement(node);
                    if (HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
                        const __gotots_range_4 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                            externalModuleInfoCollector.$go$private$moduletransforms$collectExportedVariableInfo(c, decl);
                        }
                    }
                    break;
                }
                case KindFunctionDeclaration$constant__from_ast(): {
                    let n: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
                    if (HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
                        externalModuleInfoCollector.$go$private$moduletransforms$addExportedFunctionDeclaration(c, n, void 0, HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast()));
                    }
                    break;
                }
                case KindClassDeclaration$constant__from_ast(): {
                    let n: {
                        value: ClassDeclaration__from_ast;
                    } | undefined = Node__from_ast.AsClassDeclaration(node);
                    if (HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
                        if (HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast())) {
                            if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasExportDefault) {
                                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ClassDeclaration__from_ast.Name(n);
                                if (name === undefined) {
                                    name = NodeFactory__from_printer.NewGeneratedNameForNode(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, node);
                                }
                                externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(c, node, name);
                                (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasExportDefault = true;
                            }
                        }
                        else {
                            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ClassDeclaration__from_ast.Name(n);
                            if (!(name === undefined)) {
                                if (externalModuleInfoCollector.$go$private$moduletransforms$addUniqueExport(c, Node__from_ast.Text(name))) {
                                    externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(c, node, name);
                                    externalModuleInfoCollector.$go$private$moduletransforms$addExportedName(c, name);
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).output;
    }
    static $go$private$moduletransforms$collectExportedVariableInfo(c: externalModuleInfoCollector | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsBindingPattern__from_ast(Node__from_ast.Name(decl))) {
            const __gotots_range_6 = Node__from_ast.Elements(Node__from_ast.Name(decl));
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                let e: {
                    value: BindingElement__from_ast;
                } | undefined = Node__from_ast.AsBindingElement(element);
                if (!(BindingElement__from_ast.Name(e) === undefined)) {
                    externalModuleInfoCollector.$go$private$moduletransforms$collectExportedVariableInfo(c, element);
                }
            }
        }
        else if (!EmitContext__from_printer.HasAutoGenerateInfo((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, Node__from_ast.Name(decl))) {
            let text = Node__from_ast.Text(Node__from_ast.Name(decl));
            if (externalModuleInfoCollector.$go$private$moduletransforms$addUniqueExport(c, text)) {
                externalModuleInfoCollector.$go$private$moduletransforms$addExportedName(c, Node__from_ast.Name(decl));
                if (IsLocalName__from_transformers((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitContext, Node__from_ast.Name(decl))) {
                    externalModuleInfoCollector.$go$private$moduletransforms$addExportedBinding(c, decl, Node__from_ast.Name(decl));
                }
            }
        }
    }
}
export function collectExternalModuleInfo(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, emitContext: {
    value: EmitContext__from_printer;
} | undefined, resolver: ReferenceResolver__from_binder | undefined): externalModuleInfo | undefined {
    let c = new externalModuleInfoCollector(sourceFile, compilerOptions, emitContext, resolver, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.nil();
    }), false, new externalModuleInfo(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), MultiMap__from_collections.$zero<gostring, {
        value: ExportSpecifier__from_ast;
    } | undefined>((): GoMapValue<gostring, RuntimeSlice<{
        value: ExportSpecifier__from_ast;
    } | undefined>> => {
        return $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$ExportSpecifier.nil();
    }), MultiMap__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_SliceOf_PointerTo_Named_ast$Node.nil();
    }), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), OrderedSet__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return GoMap.nil();
    }), void 0, false));
    return externalModuleInfoCollector.$go$private$moduletransforms$collect(c);
}
export const externalHelpersModuleNameText$string: gostring = "tslib";
export function createExternalHelpersImportDeclarationIfNeeded(emitContext: {
    value: EmitContext__from_printer;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, fileModuleKind: ModuleKind__from_core, hasExportStarsToExportValues: bool, hasImportStar: bool, hasImportDefault: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportHelpers) && IsEffectiveExternalModule__from_ast(sourceFile, compilerOptions)) {
        let moduleKind = CompilerOptions__from_core.GetEmitModuleKind(compilerOptions);
        let helpers = getImportedHelpers(emitContext, sourceFile);
        if (fileModuleKind === ModuleKindCommonJS$constant__from_core() || fileModuleKind === ModuleKindNone$constant__from_core() && moduleKind === ModuleKindCommonJS$constant__from_core()) {
            let externalHelpersModuleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getOrCreateExternalHelpersModuleNameIfNeeded(emitContext, sourceFile, compilerOptions, helpers, hasExportStarsToExportValues, hasImportStar || hasImportDefault, fileModuleKind);
            if (!(externalHelpersModuleName === undefined)) {
                const __gotots_store_0 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory");
                const __gotots_argument_1 = void 0;
                const __gotots_argument_2 = false;
                const __gotots_argument_3 = externalHelpersModuleName;
                const __gotots_store_1 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory");
                const __gotots_store_2 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_0 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory"), externalHelpersModuleNameText$string, TokenFlagsNone$constant__from_ast());
                const __gotots_argument_4 = NodeFactory__from_ast.NewExternalModuleReference(__gotots_receiver_0, __gotots_argument_0);
                let externalHelpersImportDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportEqualsDeclaration(__gotots_receiver_1, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                EmitContext__from_printer.AddEmitFlags(emitContext, externalHelpersImportDeclaration, EFCustomPrologue$constant__from_printer());
                return externalHelpersImportDeclaration;
            }
        }
        else {
            let helperNames = RuntimeSlice.nil<gostring>();
            const __gotots_range_0 = helpers;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let helper: {
                    value: EmitHelper__from_printer;
                } | undefined = __gotots_range_value_0;
                let importName: EmitHelper__from_printer["ImportName"] = (helper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportName;
                if (importName.length > 0) {
                    helperNames = AppendIfUnique$string(helperNames, importName);
                }
            }
            if (helperNames.length > 0) {
                SortFunc$SliceOf_string$string(helperNames, CompareStringsCaseSensitive__from_stringutil);
                let importSpecifiers = Map$string$PointerTo_Named_ast$Node(helperNames, (name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    if (IsFileLevelUniqueName__from_printer(sourceFile, name, void 0)) {
                        const __gotots_store_3 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory");
                        const __gotots_argument_5 = false;
                        const __gotots_argument_6 = void 0;
                        const __gotots_store_4 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_7 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), name);
                        return NodeFactory__from_ast.NewImportSpecifier(__gotots_receiver_2, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
                    }
                    else {
                        const __gotots_store_5 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory");
                        const __gotots_argument_8 = false;
                        const __gotots_store_6 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_9 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), name);
                        const __gotots_argument_10 = NodeFactory__from_printer.NewUnscopedHelperName((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, name);
                        return NodeFactory__from_ast.NewImportSpecifier(__gotots_receiver_3, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
                    }
                });
                const __gotots_store_7 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory");
                const __gotots_store_8 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_11 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), importSpecifiers);
                let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNamedImports(__gotots_receiver_4, __gotots_argument_11);
                const __gotots_receiver_5 = emitContext;
                const __gotots_store_9 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                const __gotots_argument_12 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(__gotots_receiver_5, __gotots_argument_12);
                EmitContext__from_printer.AddEmitFlags(emitContext, parseNode, EFExternalHelpers$constant__from_printer());
                const __gotots_store_10 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory");
                const __gotots_argument_13 = void 0;
                const __gotots_store_11 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_14 = NodeFactory__from_ast.NewImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), KindUnknown$constant__from_ast(), void 0, namedBindings);
                const __gotots_store_12 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_15 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), externalHelpersModuleNameText$string, TokenFlagsNone$constant__from_ast());
                const __gotots_argument_16 = void 0;
                let externalHelpersImportDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportDeclaration(__gotots_receiver_6, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
                EmitContext__from_printer.AddEmitFlags(emitContext, externalHelpersImportDeclaration, EFCustomPrologue$constant__from_printer());
                return externalHelpersImportDeclaration;
            }
        }
    }
    return void 0;
}
export function getImportedHelpers(emitContext: {
    value: EmitContext__from_printer;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined> {
    let helpers = RuntimeSlice.nil<{
        value: EmitHelper__from_printer;
    } | undefined>();
    const __gotots_receiver_7 = emitContext;
    const __gotots_store_13 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    const __gotots_argument_17 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    const __gotots_range_1 = EmitContext__from_printer.GetEmitHelpers(__gotots_receiver_7, __gotots_argument_17);
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let helper: {
            value: EmitHelper__from_printer;
        } | undefined = __gotots_range_value_1;
        if (!(helper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Scoped) {
            helpers = helpers.append(void 0, [helper]);
        }
    }
    return helpers;
}
export function getOrCreateExternalHelpersModuleNameIfNeeded(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, helpers: RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined>, hasExportStarsToExportValues: bool, hasImportStarOrImportDefault: bool, fileModuleKind: ModuleKind__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let externalHelpersModuleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.GetExternalHelpersModuleName(emitContext, node);
    if (!(externalHelpersModuleName === undefined)) {
        return externalHelpersModuleName;
    }
    let create = helpers.length > 0 || (hasExportStarsToExportValues || hasImportStarOrImportDefault) && fileModuleKind < ModuleKindSystem$constant__from_core();
    if (create) {
        externalHelpersModuleName = NodeFactory__from_printer.NewUniqueName((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, externalHelpersModuleNameText$string);
        EmitContext__from_printer.SetExternalHelpersModuleName(emitContext, node, externalHelpersModuleName);
    }
    return externalHelpersModuleName;
}
export function isNamedDefaultReference(e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return ModuleExportNameIsDefault__from_ast(Node__from_ast.PropertyNameOrName(e));
}
export function containsDefaultReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && (IsNamedImports__from_ast(node) || IsNamedExports__from_ast(node)) && Some$PointerTo_Named_ast$Node(Node__from_ast.Elements(node), isNamedDefaultReference);
}
export function getExportNeedsImportStarHelper(node: {
    value: ExportDeclaration__from_ast;
} | undefined): bool {
    const __gotots_store_17 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
    const __gotots_argument_21 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    return !(GetNamespaceDeclarationNode__from_ast(__gotots_argument_21) === undefined);
}
export function getImportNeedsImportStarHelper(node: {
    value: ImportDeclaration__from_ast;
} | undefined): bool {
    const __gotots_store_14 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
    const __gotots_argument_18 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    if (!(GetNamespaceDeclarationNode__from_ast(__gotots_argument_18) === undefined)) {
        return true;
    }
    if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
        return false;
    }
    let bindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
    if (bindings === undefined) {
        return false;
    }
    if (!IsNamedImports__from_ast(bindings)) {
        return false;
    }
    let namedImports: {
        value: NamedImports__from_ast;
    } | undefined = Node__from_ast.AsNamedImports(bindings);
    let defaultRefCount = 0;
    const __gotots_range_2 = NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let binding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
        if (isNamedDefaultReference(binding)) {
            defaultRefCount++;
        }
    }
    let __gotots_logical_result_1 = (defaultRefCount > 0 && defaultRefCount !== NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length);
    if (!__gotots_logical_result_1) {
        let __gotots_logical_result_0 = (NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - defaultRefCount) !== 0;
        if (__gotots_logical_result_0) {
            const __gotots_store_15 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_19 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_0 = IsDefaultImport__from_ast(__gotots_argument_19);
        }
        __gotots_logical_result_1 = (__gotots_logical_result_0);
    }
    return __gotots_logical_result_1;
}
export function getImportNeedsImportDefaultHelper(node: {
    value: ImportDeclaration__from_ast;
} | undefined): bool {
    let __gotots_logical_result_2 = !getImportNeedsImportStarHelper(node);
    if (__gotots_logical_result_2) {
        const __gotots_store_16 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_20 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_2 = (IsDefaultImport__from_ast(__gotots_argument_20) || (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) && IsNamedImports__from_ast((Node__from_ast.AsImportClause((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings) && containsDefaultReference((Node__from_ast.AsImportClause((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings)));
    }
    return __gotots_logical_result_2;
}
