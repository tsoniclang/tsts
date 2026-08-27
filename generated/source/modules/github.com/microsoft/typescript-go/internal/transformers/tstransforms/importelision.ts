import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportDeclaration as ExportDeclaration__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, NamedExports as NamedExports__from_ast, NamedImports as NamedImports__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitResolver as EmitResolver__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { ImportClause as ImportClause__from_ast, IsExternalModuleImportEqualsDeclaration as IsExternalModuleImportEqualsDeclaration__from_ast, IsExternalModule as IsExternalModule__from_ast, IsInJSFile as IsInJSFile__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, StatementBase as StatementBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { IfElse$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class ImportElisionTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public emitResolver: EmitResolver__from_printer | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$tstransforms$isReferencedAliasDeclaration(tx: ImportElisionTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        node = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "Transformer")), node);
        let __gotots_logical_result_3 = node === undefined;
        if (!__gotots_logical_result_3) {
            const __gotots_receiver_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
            const __gotots_argument_17 = node;
            __gotots_logical_result_3 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_7).IsReferencedAliasDeclaration(__gotots_argument_17);
        }
        return __gotots_logical_result_3;
    }
    static $go$private$tstransforms$isTopLevelValueImportEqualsWithEntityName(tx: ImportElisionTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        node = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Transformer")), node);
        let __gotots_logical_result_4 = !(node === undefined);
        if (__gotots_logical_result_4) {
            const __gotots_receiver_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
            const __gotots_argument_18 = node;
            __gotots_logical_result_4 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_8).IsTopLevelValueImportEqualsWithEntityName(__gotots_argument_18);
        }
        return __gotots_logical_result_4;
    }
    static $go$private$tstransforms$isValueAliasDeclaration(tx: ImportElisionTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        node = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Transformer")), node);
        let __gotots_logical_result_2 = node === undefined;
        if (!__gotots_logical_result_2) {
            const __gotots_receiver_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
            const __gotots_argument_16 = node;
            __gotots_logical_result_2 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_6).IsValueAliasDeclaration(__gotots_argument_16);
        }
        return __gotots_logical_result_2;
    }
    static $go$private$tstransforms$shouldEmitAliasDeclaration(tx: ImportElisionTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return IsInJSFile__from_ast(node) || ImportElisionTransformer.$go$private$tstransforms$isReferencedAliasDeclaration(tx, node);
    }
    static $go$private$tstransforms$shouldEmitImportEqualsDeclaration(tx: ImportElisionTransformer | undefined, node: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): bool {
        const __gotots_receiver_4 = tx;
        const __gotots_store_25 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_14 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let __gotots_logical_result_1 = ImportElisionTransformer.$go$private$tstransforms$shouldEmitAliasDeclaration(__gotots_receiver_4, __gotots_argument_14);
        if (!__gotots_logical_result_1) {
            let __gotots_logical_result_0 = !IsExternalModule__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
            if (__gotots_logical_result_0) {
                const __gotots_receiver_5 = tx;
                const __gotots_store_26 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_15 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                __gotots_logical_result_0 = ImportElisionTransformer.$go$private$tstransforms$isTopLevelValueImportEqualsWithEntityName(__gotots_receiver_5, __gotots_argument_15);
            }
            __gotots_logical_result_1 = (__gotots_logical_result_0);
        }
        return __gotots_logical_result_1;
    }
    static $go$private$tstransforms$visit(tx: ImportElisionTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindImportEqualsDeclaration$constant__from_ast(): {
                if (IsExternalModuleImportEqualsDeclaration__from_ast(node)) {
                    if (!ImportElisionTransformer.$go$private$tstransforms$shouldEmitAliasDeclaration(tx, node)) {
                        return void 0;
                    }
                }
                else {
                    if (!ImportElisionTransformer.$go$private$tstransforms$shouldEmitImportEqualsDeclaration(tx, Node__from_ast.AsImportEqualsDeclaration(node))) {
                        return void 0;
                    }
                }
                const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")), node);
                break;
            }
            case KindImportDeclaration$constant__from_ast(): {
                let n: {
                    value: ImportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsImportDeclaration(node);
                if (!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined)) {
                    const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                    if (importClause === undefined) {
                        return void 0;
                    }
                    const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_4 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory");
                    const __gotots_argument_3 = n;
                    const __gotots_store_5 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_4 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "ModifiersBase"));
                    const __gotots_argument_5 = importClause;
                    const __gotots_argument_6 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                    const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_7 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                    return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
                }
                const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer")), node);
                break;
            }
            case KindImportClause$constant__from_ast(): {
                let n: {
                    value: ImportClause__from_ast;
                } | undefined = Node__from_ast.AsImportClause(node);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(ImportElisionTransformer.$go$private$tstransforms$shouldEmitAliasDeclaration(tx, node), ImportClause__from_ast.Name(n), void 0);
                const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
                if (name === undefined && namedBindings === undefined) {
                    return void 0;
                }
                const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_10 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), n, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, name, namedBindings);
                break;
            }
            case KindNamespaceImport$constant__from_ast(): {
                if (!ImportElisionTransformer.$go$private$tstransforms$shouldEmitAliasDeclaration(tx, node)) {
                    return void 0;
                }
                return node;
                break;
            }
            case KindNamedImports$constant__from_ast(): {
                let n: {
                    value: NamedImports__from_ast;
                } | undefined = Node__from_ast.AsNamedImports(node);
                const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
                if (NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                    return void 0;
                }
                const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_13 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateNamedImports(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), n, elements);
                break;
            }
            case KindImportSpecifier$constant__from_ast(): {
                if (!ImportElisionTransformer.$go$private$tstransforms$shouldEmitAliasDeclaration(tx, node)) {
                    return void 0;
                }
                return node;
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                if (!Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) && !ImportElisionTransformer.$go$private$tstransforms$isValueAliasDeclaration(tx, node)) {
                    return void 0;
                }
                const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Transformer")), node);
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                let n: {
                    value: ExportDeclaration__from_ast;
                } | undefined = Node__from_ast.AsExportDeclaration(node);
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) {
                    const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    exportClause = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                    if (exportClause === undefined) {
                        return void 0;
                    }
                }
                const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_17 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory");
                const __gotots_argument_8 = n;
                const __gotots_argument_9 = void 0;
                const __gotots_argument_10 = false;
                const __gotots_argument_11 = exportClause;
                const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_12 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier);
                const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_13 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                return NodeFactory__from_ast.UpdateExportDeclaration(__gotots_receiver_3, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
                break;
            }
            case KindNamedExports$constant__from_ast(): {
                let n: {
                    value: NamedExports__from_ast;
                } | undefined = Node__from_ast.AsNamedExports(node);
                const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Transformer")), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
                if (NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                    return void 0;
                }
                const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_22 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateNamedExports(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), n, elements);
                break;
            }
            case KindExportSpecifier$constant__from_ast(): {
                if (!ImportElisionTransformer.$go$private$tstransforms$isValueAliasDeclaration(tx, node)) {
                    return void 0;
                }
                return node;
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                let savedCurrentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = Node__from_ast.AsSourceFile(node);
                const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                node = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Transformer")), node);
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = savedCurrentSourceFile;
                return node;
                break;
            }
            case KindModuleDeclaration$constant__from_ast():
            case KindModuleBlock$constant__from_ast(): {
                const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer")), node);
                break;
            }
            default: {
                return node;
                break;
            }
        }
    }
}
export function NewImportElisionTransformer(opt: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    if (Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax)) {
        const __gotots_argument_0 = new GoInterfaceAdapter("ImportElisionTransformer should not be used with VerbatimModuleSyntax");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    let tx: ImportElisionTransformer | undefined = new ImportElisionTransformer(Transformer__from_transformers.$zero(), compilerOptions, void 0, (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitResolver);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return ImportElisionTransformer.$go$private$tstransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_2 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_1, __gotots_argument_2);
}
