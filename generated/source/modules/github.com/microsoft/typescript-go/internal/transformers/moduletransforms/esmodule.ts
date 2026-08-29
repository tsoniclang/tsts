import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, HasFileName as HasFileName__from_ast, ImportDeclaration as ImportDeclaration__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { CallExpression as CallExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, IsExportNamespaceAsDefaultDeclaration as IsExportNamespaceAsDefaultDeclaration__from_ast, IsExternalModuleImportEqualsDeclaration as IsExternalModuleImportEqualsDeclaration__from_ast, IsExternalModuleIndicator as IsExternalModuleIndicator__from_ast, IsExternalModule as IsExternalModule__from_ast, IsImportCall as IsImportCall__from_ast, IsInJSFile as IsInJSFile__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, IsRequireCall as IsRequireCall__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportKeyword$constant as KindImportKeyword$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, StatementBase as StatementBase__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitPreserve$constant as JsxEmitPreserve$constant__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindNode16$constant as ModuleKindNode16$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFCustomPrologue$constant as EFCustomPrologue$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { SingleOrMany as SingleOrMany__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { FirstResult$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { createExternalHelpersImportDeclarationIfNeeded } from "./externalmoduleinfo.js";
import { createEmptyImports, getExternalModuleNameLiteral, rewriteModuleSpecifier } from "./utilities.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class ESModuleTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public resolver: ReferenceResolver__from_binder | undefined, public getEmitModuleFormatOfFile: (($0: HasFileName__from_ast | undefined) => ModuleKind__from_core) | undefined, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public importRequireStatements: importRequireStatements | undefined, public helperNameSubstitutions: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$moduletransforms$appendExportsOfImportEqualsDeclaration(tx: ESModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, node: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_143 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_144 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_145 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_144, __gotots_argument_145)) {
            const __gotots_argument_157 = statements;
            const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_145 = (Transformer__from_transformers.Factory(__gotots_store_144.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeFactory");
            const __gotots_argument_152 = void 0;
            const __gotots_argument_153 = false;
            const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_147 = (Transformer__from_transformers.Factory(__gotots_store_146.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory");
            const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_149 = (Transformer__from_transformers.Factory(__gotots_store_148.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeFactory");
            const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_151 = (Transformer__from_transformers.Factory(__gotots_store_150.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeFactory");
            const __gotots_argument_147 = false;
            const __gotots_argument_148 = void 0;
            const __gotots_receiver_43 = ImportEqualsDeclaration__from_ast.Name(node);
            const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_146 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_152.Transformer));
            const __gotots_argument_149 = Node__from_ast.Clone(__gotots_receiver_43, __gotots_argument_146);
            const __gotots_slice_element_5 = NodeFactory__from_ast.NewExportSpecifier(__gotots_receiver_44, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149);
            const __gotots_argument_150 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_5]);
            const __gotots_argument_151 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_45, __gotots_argument_150);
            const __gotots_argument_154 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_46, __gotots_argument_151);
            const __gotots_argument_155 = void 0;
            const __gotots_argument_156 = void 0;
            const __gotots_argument_158 = NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_47, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154, __gotots_argument_155, __gotots_argument_156);
            statements = __gotots_argument_157.append(void 0, [__gotots_argument_158]);
        }
        return statements;
    }
    static $go$private$moduletransforms$createRequireCall(tx: ESModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_88 = Transformer__from_transformers.Factory(__gotots_store_91.Transformer);
        const __gotots_argument_89 = node;
        const __gotots_argument_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile;
        const __gotots_argument_91 = void 0;
        const __gotots_argument_92 = void 0;
        const __gotots_argument_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        let moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getExternalModuleNameLiteral(__gotots_argument_88, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
        let args = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(moduleName === undefined)) {
            const __gotots_argument_97 = args;
            const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_94 = Transformer__from_transformers.EmitContext(__gotots_store_92.Transformer);
            const __gotots_argument_95 = moduleName;
            const __gotots_argument_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
            const __gotots_argument_98 = rewriteModuleSpecifier(__gotots_argument_94, __gotots_argument_95, __gotots_argument_96);
            args = __gotots_argument_97.append(void 0, [__gotots_argument_98]);
        }
        if (CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) === ModuleKindPreserve$constant__from_core()) {
            const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_94 = (Transformer__from_transformers.Factory(__gotots_store_93.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeFactory");
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_96 = (Transformer__from_transformers.Factory(__gotots_store_95.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_99 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "NodeFactory"), "require");
            const __gotots_argument_100 = void 0;
            const __gotots_argument_101 = void 0;
            const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_98 = (Transformer__from_transformers.Factory(__gotots_store_97.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_102 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeFactory"), args);
            const __gotots_argument_103 = NodeFlagsNone$constant__from_ast();
            return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_26, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102, __gotots_argument_103);
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements === undefined) {
            const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let createRequireName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_99.Transformer), "_createRequire", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_101 = (Transformer__from_transformers.Factory(__gotots_store_100.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NodeFactory");
            const __gotots_argument_112 = void 0;
            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_103 = (Transformer__from_transformers.Factory(__gotots_store_102.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory");
            const __gotots_argument_109 = KindUnknown$constant__from_ast();
            const __gotots_argument_110 = void 0;
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory");
            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_107 = (Transformer__from_transformers.Factory(__gotots_store_106.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "NodeFactory");
            const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_109 = (Transformer__from_transformers.Factory(__gotots_store_108.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory");
            const __gotots_argument_104 = false;
            const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_111 = (Transformer__from_transformers.Factory(__gotots_store_110.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_105 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeFactory"), "createRequire");
            const __gotots_argument_106 = createRequireName;
            const __gotots_slice_element_2 = NodeFactory__from_ast.NewImportSpecifier(__gotots_receiver_27, __gotots_argument_104, __gotots_argument_105, __gotots_argument_106);
            const __gotots_argument_107 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
            const __gotots_argument_108 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_28, __gotots_argument_107);
            const __gotots_argument_111 = NodeFactory__from_ast.NewNamedImports(__gotots_receiver_29, __gotots_argument_108);
            const __gotots_argument_113 = NodeFactory__from_ast.NewImportClause(__gotots_receiver_30, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111);
            const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_114 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory"), "module", TokenFlagsNone$constant__from_ast());
            const __gotots_argument_115 = void 0;
            let importStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportDeclaration(__gotots_receiver_31, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115);
            const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_114.Transformer), importStatement, EFCustomPrologue$constant__from_printer());
            const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let requireHelperName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_115.Transformer), "__require", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory");
            const __gotots_argument_136 = void 0;
            const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_119 = (Transformer__from_transformers.Factory(__gotots_store_118.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_39 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory");
            const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_121 = (Transformer__from_transformers.Factory(__gotots_store_120.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory");
            const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_123 = (Transformer__from_transformers.Factory(__gotots_store_122.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "NodeFactory");
            const __gotots_argument_129 = requireHelperName;
            const __gotots_argument_130 = void 0;
            const __gotots_argument_131 = void 0;
            const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_125 = (Transformer__from_transformers.Factory(__gotots_store_124.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "NodeFactory");
            const __gotots_receiver_32 = createRequireName;
            const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_116 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_126.Transformer));
            const __gotots_argument_124 = Node__from_ast.Clone(__gotots_receiver_32, __gotots_argument_116);
            const __gotots_argument_125 = void 0;
            const __gotots_argument_126 = void 0;
            const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_128 = (Transformer__from_transformers.Factory(__gotots_store_127.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory");
            const __gotots_store_129 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_130 = (Transformer__from_transformers.Factory(__gotots_store_129.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory");
            const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_132 = (Transformer__from_transformers.Factory(__gotots_store_131.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory");
            const __gotots_argument_117 = KindImportKeyword$constant__from_ast();
            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_134 = (Transformer__from_transformers.Factory(__gotots_store_133.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_118 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory"), "meta");
            const __gotots_argument_119 = NodeFactory__from_ast.NewMetaProperty(__gotots_receiver_33, __gotots_argument_117, __gotots_argument_118);
            const __gotots_argument_120 = void 0;
            const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_136 = (Transformer__from_transformers.Factory(__gotots_store_135.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_121 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeFactory"), "url");
            const __gotots_argument_122 = NodeFlagsNone$constant__from_ast();
            const __gotots_slice_element_3 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_34, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122);
            const __gotots_argument_123 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3]);
            const __gotots_argument_127 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_35, __gotots_argument_123);
            const __gotots_argument_128 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_132 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_36, __gotots_argument_124, __gotots_argument_125, __gotots_argument_126, __gotots_argument_127, __gotots_argument_128);
            const __gotots_slice_element_4 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_37, __gotots_argument_129, __gotots_argument_130, __gotots_argument_131, __gotots_argument_132);
            const __gotots_argument_133 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_4]);
            const __gotots_argument_134 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_38, __gotots_argument_133);
            const __gotots_argument_135 = NodeFlagsConst$constant__from_ast();
            const __gotots_argument_137 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_39, __gotots_argument_134, __gotots_argument_135);
            let requireStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_40, __gotots_argument_136, __gotots_argument_137);
            const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_137.Transformer), requireStatement, EFCustomPrologue$constant__from_printer());
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements = new importRequireStatements(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([importStatement, requireStatement]), requireHelperName);
        }
        const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_139 = (Transformer__from_transformers.Factory(__gotots_store_138.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory");
        const __gotots_receiver_41 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requireHelperName;
        const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_138 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_140.Transformer));
        const __gotots_argument_139 = Node__from_ast.Clone(__gotots_receiver_41, __gotots_argument_138);
        const __gotots_argument_140 = void 0;
        const __gotots_argument_141 = void 0;
        const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_142 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), args);
        const __gotots_argument_143 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_42, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143);
    }
    static $go$private$moduletransforms$visit(tx: ESModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindImportDeclaration$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitImportDeclaration(tx, Node__from_ast.AsImportDeclaration(node));
                break;
            }
            case KindImportEqualsDeclaration$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitImportEqualsDeclaration(tx, Node__from_ast.AsImportEqualsDeclaration(node));
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitExportAssignment(tx, Node__from_ast.AsExportAssignment(node));
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitExportDeclaration(tx, Node__from_ast.AsExportDeclaration(node));
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                node = ESModuleTransformer.$go$private$moduletransforms$visitCallExpression(tx, Node__from_ast.AsCallExpression(node));
                break;
            }
            default: {
                const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                node = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                break;
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitCallExpression(tx: ESModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions)) {
            const __gotots_store_86 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_83 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let __gotots_logical_result_1 = IsImportCall__from_ast(__gotots_argument_83) && NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0;
            if (!__gotots_logical_result_1) {
                const __gotots_store_87 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_84 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                let __gotots_logical_result_0 = IsInJSFile__from_ast(__gotots_argument_84);
                if (__gotots_logical_result_0) {
                    const __gotots_store_88 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_85 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_86 = false;
                    __gotots_logical_result_0 = IsRequireCall__from_ast(__gotots_argument_85, __gotots_argument_86);
                }
                __gotots_logical_result_1 = __gotots_logical_result_0;
            }
            if (__gotots_logical_result_1) {
                return ESModuleTransformer.$go$private$moduletransforms$visitImportOrRequireCall(tx, node);
            }
        }
        const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_25 = Transformer__from_transformers.Visitor(__gotots_store_89.Transformer);
        const __gotots_store_90 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_87 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_25, __gotots_argument_87);
    }
    static $go$private$moduletransforms$visitExportAssignment(tx: ESModuleTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
            const __gotots_store_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_13 = Transformer__from_transformers.Visitor(__gotots_store_44.Transformer);
            const __gotots_store_45 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_45 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_13, __gotots_argument_45);
        }
        if (!(CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) === ModuleKindPreserve$constant__from_core())) {
            return void 0;
        }
        const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_47 = (Transformer__from_transformers.Factory(__gotots_store_46.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "NodeFactory");
        const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_15 = Transformer__from_transformers.Factory(__gotots_store_48.Transformer);
        const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_50 = (Transformer__from_transformers.Factory(__gotots_store_49.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory");
        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_52 = (Transformer__from_transformers.Factory(__gotots_store_51.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_46 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory"), "module");
        const __gotots_argument_47 = void 0;
        const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_54 = (Transformer__from_transformers.Factory(__gotots_store_53.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_48 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory"), "exports");
        const __gotots_argument_49 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_50 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_14, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49);
        const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_51 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_55.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_52 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_15, __gotots_argument_50, __gotots_argument_51);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_16, __gotots_argument_52);
        const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_17 = Transformer__from_transformers.EmitContext(__gotots_store_56.Transformer);
        const __gotots_argument_53 = statement;
        const __gotots_store_57 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_54 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_17, __gotots_argument_53, __gotots_argument_54);
        return statement;
    }
    static $go$private$moduletransforms$visitExportDeclaration(tx: ESModuleTransformer | undefined, node: {
        value: ExportDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
            const __gotots_store_58 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_55 = Transformer__from_transformers.EmitContext(__gotots_store_59.Transformer);
        const __gotots_argument_56: ExportDeclaration__from_ast["ModuleSpecifier"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
        const __gotots_argument_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        let updatedModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = rewriteModuleSpecifier(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57);
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module > ModuleKindES2015$constant__from_core() || (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined || !IsNamespaceExport__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause)) {
            const __gotots_store_60 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_61 = (Transformer__from_transformers.Factory(__gotots_store_60.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory");
            const __gotots_argument_58 = node;
            const __gotots_argument_59 = void 0;
            const __gotots_argument_60 = false;
            const __gotots_argument_61: ExportDeclaration__from_ast["ExportClause"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
            const __gotots_argument_62 = updatedModuleSpecifier;
            const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_63 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_62.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateExportDeclaration(__gotots_receiver_18, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63);
        }
        let oldIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
        const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let synthName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_63.Transformer), oldIdentifier);
        const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_65 = (Transformer__from_transformers.Factory(__gotots_store_64.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory");
        const __gotots_argument_67 = void 0;
        const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_67 = (Transformer__from_transformers.Factory(__gotots_store_66.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
        const __gotots_argument_64 = KindUnknown$constant__from_ast();
        const __gotots_argument_65 = void 0;
        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_69 = (Transformer__from_transformers.Factory(__gotots_store_68.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_66 = NodeFactory__from_ast.NewNamespaceImport(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory"), synthName);
        const __gotots_argument_68 = NodeFactory__from_ast.NewImportClause(__gotots_receiver_19, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66);
        const __gotots_argument_69 = updatedModuleSpecifier;
        const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_70 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_70.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
        let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportDeclaration(__gotots_receiver_20, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70);
        const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_71.Transformer), importDecl, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
        let exportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_store_72 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_71 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (IsExportNamespaceAsDefaultDeclaration__from_ast(__gotots_argument_71)) {
            const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_74 = (Transformer__from_transformers.Factory(__gotots_store_73.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            exportDecl = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeFactory"), void 0, false, void 0, synthName);
        }
        else {
            const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_76 = (Transformer__from_transformers.Factory(__gotots_store_75.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeFactory");
            const __gotots_argument_74 = void 0;
            const __gotots_argument_75 = false;
            const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_78 = (Transformer__from_transformers.Factory(__gotots_store_77.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "NodeFactory");
            const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_80 = (Transformer__from_transformers.Factory(__gotots_store_79.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "NodeFactory");
            const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_82 = (Transformer__from_transformers.Factory(__gotots_store_81.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_1 = NodeFactory__from_ast.NewExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "NodeFactory"), false, synthName, oldIdentifier);
            const __gotots_argument_72 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
            const __gotots_argument_73 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_21, __gotots_argument_72);
            const __gotots_argument_76 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_22, __gotots_argument_73);
            const __gotots_argument_77 = void 0;
            const __gotots_argument_78 = void 0;
            exportDecl = NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_23, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78);
        }
        const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_24 = Transformer__from_transformers.EmitContext(__gotots_store_83.Transformer);
        const __gotots_argument_79 = exportDecl;
        const __gotots_store_84 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_80 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_24, __gotots_argument_79, __gotots_argument_80);
        const __gotots_argument_81 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([importDecl, exportDecl]);
        const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_82 = Transformer__from_transformers.Factory(__gotots_store_85.Transformer);
        return SingleOrMany__from_transformers(__gotots_argument_81, __gotots_argument_82);
    }
    static $go$private$moduletransforms$visitImportDeclaration(tx: ESModuleTransformer | undefined, node: {
        value: ImportDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions)) {
            const __gotots_store_22 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_18 = Transformer__from_transformers.EmitContext(__gotots_store_23.Transformer);
        const __gotots_argument_19: ImportDeclaration__from_ast["ModuleSpecifier"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
        const __gotots_argument_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        let updatedModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = rewriteModuleSpecifier(__gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
        const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_25 = (Transformer__from_transformers.Factory(__gotots_store_24.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory");
        const __gotots_argument_21 = node;
        const __gotots_argument_22 = void 0;
        const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_23 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_26.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
        const __gotots_argument_24 = updatedModuleSpecifier;
        const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_25 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_27.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
        return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_4, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
    }
    static $go$private$moduletransforms$visitImportEqualsDeclaration(tx: ESModuleTransformer | undefined, node: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) < ModuleKindNode16$constant__from_core()) {
            return void 0;
        }
        const __gotots_store_28 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_26 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!IsExternalModuleImportEqualsDeclaration__from_ast(__gotots_argument_26)) {
            const __gotots_argument_27 = new $goInterfaceAdapter$string("import= for internal module references should be handled in an earlier transformer.");
            GoPanic.raise(__gotots_argument_27 === undefined ? GoPanicNilValue.create() : __gotots_argument_27);
        }
        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_30 = (Transformer__from_transformers.Factory(__gotots_store_29.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory");
        const __gotots_argument_37 = void 0;
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_32 = (Transformer__from_transformers.Factory(__gotots_store_31.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory");
        const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_34 = (Transformer__from_transformers.Factory(__gotots_store_33.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory");
        const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_36 = (Transformer__from_transformers.Factory(__gotots_store_35.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory");
        const __gotots_receiver_5 = ImportEqualsDeclaration__from_ast.Name(node);
        const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_28 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_37.Transformer));
        const __gotots_argument_30 = Node__from_ast.Clone(__gotots_receiver_5, __gotots_argument_28);
        const __gotots_argument_31 = void 0;
        const __gotots_argument_32 = void 0;
        const __gotots_receiver_6 = tx;
        const __gotots_store_38 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_29 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_33 = ESModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_6, __gotots_argument_29);
        const __gotots_slice_element_0 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_7, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
        const __gotots_argument_34 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
        const __gotots_argument_35 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_8, __gotots_argument_34);
        const __gotots_argument_36 = NodeFlagsConst$constant__from_ast();
        const __gotots_argument_38 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_9, __gotots_argument_35, __gotots_argument_36);
        let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_10, __gotots_argument_37, __gotots_argument_38);
        const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_11 = Transformer__from_transformers.EmitContext(__gotots_store_39.Transformer);
        const __gotots_argument_39 = varStatement;
        const __gotots_store_40 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_40 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_11, __gotots_argument_39, __gotots_argument_40);
        const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_12 = Transformer__from_transformers.EmitContext(__gotots_store_41.Transformer);
        const __gotots_argument_41 = varStatement;
        const __gotots_store_42 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_42 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_12, __gotots_argument_41, __gotots_argument_42);
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        statements = statements.append(void 0, [varStatement]);
        statements = ESModuleTransformer.$go$private$moduletransforms$appendExportsOfImportEqualsDeclaration(tx, statements, node);
        const __gotots_argument_43 = statements;
        const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_44 = Transformer__from_transformers.Factory(__gotots_store_43.Transformer);
        return SingleOrMany__from_transformers(__gotots_argument_43, __gotots_argument_44);
    }
    static $go$private$moduletransforms$visitImportOrRequireCall(tx: ESModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_48 = Transformer__from_transformers.Visitor(__gotots_store_153.Transformer);
            const __gotots_store_154 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_159 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_48, __gotots_argument_159);
        }
        const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_155.Transformer), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
        let argument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsStringLiteralLike__from_ast(NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0))) {
            const __gotots_store_156 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_160 = Transformer__from_transformers.EmitContext(__gotots_store_156.Transformer);
            const __gotots_argument_161 = NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
            const __gotots_argument_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
            argument = rewriteModuleSpecifier(__gotots_argument_160, __gotots_argument_161, __gotots_argument_162);
        }
        else {
            const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            argument = NodeFactory__from_printer.NewRewriteRelativeImportExtensionsHelper(Transformer__from_transformers.Factory(__gotots_store_157.Transformer), NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0), ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitPreserve$constant__from_core());
        }
        let __go_arguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        __go_arguments = __go_arguments.append(void 0, [argument]);
        const __gotots_store_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_2 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_158.Transformer), NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(1, null, null));
        let rest = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_2[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_2[1])]));
        __go_arguments = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__go_arguments, rest, void 0);
        const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_160 = (Transformer__from_transformers.Factory(__gotots_store_159.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let argumentList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory"), __go_arguments);
        NodeList__from_ast.$storageOf(((argumentList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_162 = (Transformer__from_transformers.Factory(__gotots_store_161.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateCallExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), node, expression, CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken, void 0, argumentList, (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
    }
    static $go$private$moduletransforms$visitSourceFile(tx: ESModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile || !(IsExternalModule__from_ast(node) || CompilerOptions__from_core.GetIsolatedModules((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions))) {
            const __gotots_store_2 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = node;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements = void 0;
        const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_2 = Transformer__from_transformers.Visitor(__gotots_store_3.Transformer);
        const __gotots_store_4 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let result: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_2));
        const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(__gotots_store_5.Transformer);
        const __gotots_store_6 = NodeBase__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_3 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_4 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_7.Transformer));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
        const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_6 = Transformer__from_transformers.EmitContext(__gotots_store_8.Transformer);
        const __gotots_argument_7 = result;
        const __gotots_argument_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        const __gotots_callee_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getEmitModuleFormatOfFile;
        const __gotots_argument_5 = new GoInterfaceAdapter(node);
        const __gotots_argument_9 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
        const __gotots_argument_10 = false;
        const __gotots_argument_11 = false;
        const __gotots_argument_12 = false;
        let externalHelpersImportDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createExternalHelpersImportDeclarationIfNeeded(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
        if (!(externalHelpersImportDeclaration === undefined) || !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements === undefined)) {
            const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_0 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(__gotots_store_9.Transformer), NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            let prologue = __gotots_results_0[0];
            let rest = __gotots_results_0[1];
            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_1 = NodeFactory__from_printer.SplitCustomPrologue(Transformer__from_transformers.Factory(__gotots_store_10.Transformer), rest);
            let custom = __gotots_results_1[0];
            rest = __gotots_results_1[1];
            let statements = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(prologue);
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, custom, void 0);
            if (!(externalHelpersImportDeclaration === undefined)) {
                const __gotots_argument_13 = statements;
                const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_14 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_11.Transformer), externalHelpersImportDeclaration);
                statements = __gotots_argument_13.append(void 0, [__gotots_argument_14]);
            }
            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements === undefined)) {
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statements, void 0);
            }
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, rest, void 0);
            const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), statements);
            NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_15 = (Transformer__from_transformers.Factory(__gotots_store_14.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            result = Node__from_ast.AsSourceFile(NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), result, statementList, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken));
        }
        if (IsExternalModule__from_ast(result) && !(CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) === ModuleKindPreserve$constant__from_core()) && !Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsExternalModuleIndicator__from_ast)) {
            let statements = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            const __gotots_argument_16 = statements;
            const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_15 = Transformer__from_transformers.Factory(__gotots_store_16.Transformer);
            const __gotots_argument_17 = createEmptyImports(__gotots_argument_15);
            statements = __gotots_argument_16.append(void 0, [__gotots_argument_17]);
            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_18 = (Transformer__from_transformers.Factory(__gotots_store_17.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), statements);
            NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_20 = (Transformer__from_transformers.Factory(__gotots_store_19.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            result = Node__from_ast.AsSourceFile(NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), result, statementList, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importRequireStatements = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = void 0;
        const __gotots_store_21 = NodeBase__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
}
export class importRequireStatements {
    declare private readonly $goType: void;
    public constructor(public statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public requireHelperName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function NewESModuleTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let tx: ESModuleTransformer | undefined = new ESModuleTransformer(Transformer__from_transformers.$zero(), compilerOptions, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetEmitModuleFormatOfFile, void 0, void 0, GoMap.nil());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return ESModuleTransformer.$go$private$moduletransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
