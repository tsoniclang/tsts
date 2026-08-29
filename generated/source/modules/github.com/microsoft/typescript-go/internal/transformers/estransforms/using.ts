import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, ForStatement as ForStatement__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast, SyntaxList as SyntaxList__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint } from "@gotots/runtime/scalars.js";
import { Block as Block__from_ast, ClassDeclaration as ClassDeclaration__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsIdentifier as IsIdentifier__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAwaitUsing$constant as NodeFlagsAwaitUsing$constant__from_ast, NodeFlagsBlockScoped$constant as NodeFlagsBlockScoped$constant__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsUsing$constant as NodeFlagsUsing$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsUsing$constant as SubtreeContainsUsing$constant__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ConvertBindingPatternToAssignmentPattern as ConvertBindingPatternToAssignmentPattern__from_transformers, IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsLocalName as IsLocalName__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { FirstResult$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { IfElse$Named_ast$NodeFlags } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string, $goInterfaceAdapter$bool as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { isNamedEvaluation, transformNamedEvaluation } from "./namedevaluation.js";
import { convertClassDeclarationToClassExpression } from "./utilities.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class usingDeclarationTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public exportBindings: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public exportBindingNames: RuntimeSlice<gostring>, public exportVars: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public defaultExportBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public exportEqualsBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$createDownlevelUsingStatements(tx: usingDeclarationTransformer | undefined, bodyStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_async: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let statements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 2, void 0);
        const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_100 = (Transformer__from_transformers.Factory(__gotots_store_99.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory");
        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_102 = (Transformer__from_transformers.Factory(__gotots_store_101.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeFactory");
        const __gotots_store_103 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_104 = (Transformer__from_transformers.Factory(__gotots_store_103.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "NodeFactory");
        const __gotots_argument_80 = void 0;
        const __gotots_store_105 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_106 = (Transformer__from_transformers.Factory(__gotots_store_105.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_81 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "NodeFactory"), "stack");
        const __gotots_argument_82 = void 0;
        const __gotots_argument_83 = void 0;
        const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_108 = (Transformer__from_transformers.Factory(__gotots_store_107.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_84 = NodeFactory__from_ast.NewArrayLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "NodeFactory"), void 0, false);
        const __gotots_slice_element_4 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_26, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82, __gotots_argument_83, __gotots_argument_84);
        const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_110 = (Transformer__from_transformers.Factory(__gotots_store_109.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "NodeFactory");
        const __gotots_argument_85 = void 0;
        const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_112 = (Transformer__from_transformers.Factory(__gotots_store_111.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_86 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeFactory"), "error");
        const __gotots_argument_87 = void 0;
        const __gotots_argument_88 = void 0;
        const __gotots_store_113 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_89 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_113.Transformer));
        const __gotots_slice_element_5 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_27, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89);
        const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_115 = (Transformer__from_transformers.Factory(__gotots_store_114.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory");
        const __gotots_argument_90 = void 0;
        const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_91 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory"), "hasError");
        const __gotots_argument_92 = void 0;
        const __gotots_argument_93 = void 0;
        const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_94 = NodeFactory__from_printer.NewFalseExpression(Transformer__from_transformers.Factory(__gotots_store_118.Transformer));
        const __gotots_slice_element_6 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_28, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93, __gotots_argument_94);
        const __gotots_argument_95 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_4, __gotots_slice_element_5, __gotots_slice_element_6]);
        const __gotots_argument_96 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_29, __gotots_argument_95);
        const __gotots_argument_97 = false;
        let envObject: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_30, __gotots_argument_96, __gotots_argument_97);
        const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_120 = (Transformer__from_transformers.Factory(__gotots_store_119.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let envVar: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "NodeFactory"), envBinding, void 0, void 0, envObject);
        const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_122 = (Transformer__from_transformers.Factory(__gotots_store_121.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "NodeFactory");
        const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_124 = (Transformer__from_transformers.Factory(__gotots_store_123.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_98 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([envVar]));
        const __gotots_argument_99 = NodeFlagsConst$constant__from_ast();
        let envVarList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_31, __gotots_argument_98, __gotots_argument_99);
        const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_126 = (Transformer__from_transformers.Factory(__gotots_store_125.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let envVarStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory"), void 0, envVarList);
        statements = statements.append(void 0, [envVarStatement]);
        const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_128 = (Transformer__from_transformers.Factory(__gotots_store_127.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory");
        const __gotots_store_129 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_130 = (Transformer__from_transformers.Factory(__gotots_store_129.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_100 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory"), bodyStatements);
        const __gotots_argument_101 = true;
        let tryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_32, __gotots_argument_100, __gotots_argument_101);
        const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let bodyCatchBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName(Transformer__from_transformers.Factory(__gotots_store_131.Transformer), "e");
        const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_133 = (Transformer__from_transformers.Factory(__gotots_store_132.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_41 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "NodeFactory");
        const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_135 = (Transformer__from_transformers.Factory(__gotots_store_134.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_119 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory"), bodyCatchBinding, void 0, void 0, void 0);
        const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_137 = (Transformer__from_transformers.Factory(__gotots_store_136.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "NodeFactory");
        const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_139 = (Transformer__from_transformers.Factory(__gotots_store_138.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_39 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory");
        const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_141 = (Transformer__from_transformers.Factory(__gotots_store_140.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "NodeFactory");
        const __gotots_store_142 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_34 = Transformer__from_transformers.Factory(__gotots_store_142.Transformer);
        const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_144 = (Transformer__from_transformers.Factory(__gotots_store_143.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory");
        const __gotots_argument_102 = envBinding;
        const __gotots_argument_103 = void 0;
        const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_146 = (Transformer__from_transformers.Factory(__gotots_store_145.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_104 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "NodeFactory"), "error");
        const __gotots_argument_105 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_106 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_33, __gotots_argument_102, __gotots_argument_103, __gotots_argument_104, __gotots_argument_105);
        const __gotots_argument_107 = bodyCatchBinding;
        const __gotots_argument_108 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_34, __gotots_argument_106, __gotots_argument_107);
        const __gotots_slice_element_7 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_35, __gotots_argument_108);
        const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_148 = (Transformer__from_transformers.Factory(__gotots_store_147.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "NodeFactory");
        const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_37 = Transformer__from_transformers.Factory(__gotots_store_149.Transformer);
        const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_151 = (Transformer__from_transformers.Factory(__gotots_store_150.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeFactory");
        const __gotots_argument_109 = envBinding;
        const __gotots_argument_110 = void 0;
        const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_153 = (Transformer__from_transformers.Factory(__gotots_store_152.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_111 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "NodeFactory"), "hasError");
        const __gotots_argument_112 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_113 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_36, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112);
        const __gotots_store_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_114 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_154.Transformer));
        const __gotots_argument_115 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_37, __gotots_argument_113, __gotots_argument_114);
        const __gotots_slice_element_8 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_38, __gotots_argument_115);
        const __gotots_argument_116 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_7, __gotots_slice_element_8]);
        const __gotots_argument_117 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_39, __gotots_argument_116);
        const __gotots_argument_118 = true;
        const __gotots_argument_120 = NodeFactory__from_ast.NewBlock(__gotots_receiver_40, __gotots_argument_117, __gotots_argument_118);
        let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCatchClause(__gotots_receiver_41, __gotots_argument_119, __gotots_argument_120);
        let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (__go_async) {
            const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName(Transformer__from_transformers.Factory(__gotots_store_155.Transformer), "result");
            const __gotots_store_156 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_157 = (Transformer__from_transformers.Factory(__gotots_store_156.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "NodeFactory");
            const __gotots_store_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_159 = (Transformer__from_transformers.Factory(__gotots_store_158.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "NodeFactory");
            const __gotots_store_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_161 = (Transformer__from_transformers.Factory(__gotots_store_160.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory");
            const __gotots_argument_128 = void 0;
            const __gotots_store_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_163 = (Transformer__from_transformers.Factory(__gotots_store_162.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory");
            const __gotots_store_164 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_165 = (Transformer__from_transformers.Factory(__gotots_store_164.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "NodeFactory");
            const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_167 = (Transformer__from_transformers.Factory(__gotots_store_166.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "NodeFactory");
            const __gotots_argument_121 = result;
            const __gotots_argument_122 = void 0;
            const __gotots_argument_123 = void 0;
            const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_124 = NodeFactory__from_printer.NewDisposeResourcesHelper(Transformer__from_transformers.Factory(__gotots_store_168.Transformer), envBinding);
            const __gotots_slice_element_9 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_42, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124);
            const __gotots_argument_125 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_9]);
            const __gotots_argument_126 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_43, __gotots_argument_125);
            const __gotots_argument_127 = NodeFlagsConst$constant__from_ast();
            const __gotots_argument_129 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_44, __gotots_argument_126, __gotots_argument_127);
            const __gotots_slice_element_10 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_45, __gotots_argument_128, __gotots_argument_129);
            const __gotots_store_169 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_170 = (Transformer__from_transformers.Factory(__gotots_store_169.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "NodeFactory");
            const __gotots_argument_131 = result;
            const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_172 = (Transformer__from_transformers.Factory(__gotots_store_171.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory");
            const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_174 = (Transformer__from_transformers.Factory(__gotots_store_173.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_130 = NodeFactory__from_ast.NewAwaitExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "NodeFactory"), result);
            const __gotots_argument_132 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_46, __gotots_argument_130);
            const __gotots_argument_133 = void 0;
            const __gotots_slice_element_11 = NodeFactory__from_ast.NewIfStatement(__gotots_receiver_47, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133);
            const __gotots_argument_134 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_10, __gotots_slice_element_11]);
            const __gotots_argument_135 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_48, __gotots_argument_134);
            const __gotots_argument_136 = true;
            finallyBlock = NodeFactory__from_ast.NewBlock(__gotots_receiver_49, __gotots_argument_135, __gotots_argument_136);
        }
        else {
            const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_176 = (Transformer__from_transformers.Factory(__gotots_store_175.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_52 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "NodeFactory");
            const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_178 = (Transformer__from_transformers.Factory(__gotots_store_177.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_51 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "NodeFactory");
            const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_180 = (Transformer__from_transformers.Factory(__gotots_store_179.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory");
            const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_137 = NodeFactory__from_printer.NewDisposeResourcesHelper(Transformer__from_transformers.Factory(__gotots_store_181.Transformer), envBinding);
            const __gotots_slice_element_12 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_50, __gotots_argument_137);
            const __gotots_argument_138 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_12]);
            const __gotots_argument_139 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_51, __gotots_argument_138);
            const __gotots_argument_140 = true;
            finallyBlock = NodeFactory__from_ast.NewBlock(__gotots_receiver_52, __gotots_argument_139, __gotots_argument_140);
        }
        const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_183 = (Transformer__from_transformers.Factory(__gotots_store_182.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let tryStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTryStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory"), tryBlock, catchClause, finallyBlock);
        statements = statements.append(void 0, [tryStatement]);
        return statements;
    }
    static $go$private$estransforms$createEnvBinding(tx: usingDeclarationTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewUniqueName(Transformer__from_transformers.Factory(__gotots_store_84.Transformer), "env");
    }
    static $go$private$estransforms$hoistBindingElement(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isExportedDeclaration: bool, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsBindingPattern__from_ast(Node__from_ast.Name(node))) {
            const __gotots_range_6 = Node__from_ast.Elements(Node__from_ast.Name(node));
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                if (!(Node__from_ast.Name(element) === undefined)) {
                    usingDeclarationTransformer.$go$private$estransforms$hoistBindingElement(tx, element, isExportedDeclaration, original);
                }
            }
        }
        else {
            usingDeclarationTransformer.$go$private$estransforms$hoistBindingIdentifier(tx, Node__from_ast.Name(node), isExportedDeclaration, void 0, original);
        }
    }
    static $go$private$estransforms$hoistBindingIdentifier(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isExport: bool, exportAlias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
        const __gotots_store_236 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_190 = Transformer__from_transformers.EmitContext(__gotots_store_236.Transformer);
        const __gotots_argument_191 = node;
        if (!IsGeneratedIdentifier__from_transformers(__gotots_argument_190, __gotots_argument_191)) {
            const __gotots_receiver_63 = name;
            const __gotots_store_237 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_192 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_237.Transformer));
            name = Node__from_ast.Clone(__gotots_receiver_63, __gotots_argument_192);
        }
        if (isExport) {
            let __gotots_logical_result_0 = exportAlias === undefined;
            if (__gotots_logical_result_0) {
                const __gotots_store_238 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_193 = Transformer__from_transformers.EmitContext(__gotots_store_238.Transformer);
                const __gotots_argument_194 = name;
                __gotots_logical_result_0 = !IsLocalName__from_transformers(__gotots_argument_193, __gotots_argument_194);
            }
            if (__gotots_logical_result_0) {
                const __gotots_store_239 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_240 = (Transformer__from_transformers.Factory(__gotots_store_239.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_240, "NodeFactory"), name, void 0, void 0, void 0);
                if (!(original === undefined)) {
                    const __gotots_store_241 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_241.Transformer), varDecl, original);
                }
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars.append(void 0, [varDecl]);
                return;
            }
            let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(exportAlias === undefined)) {
                localName = name;
                exportName = exportAlias;
            }
            else {
                exportName = name;
            }
            const __gotots_store_242 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_243 = (Transformer__from_transformers.Factory(__gotots_store_242.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_243, "NodeFactory"), false, localName, exportName);
            if (!(original === undefined)) {
                const __gotots_store_244 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_244.Transformer), specifier, original);
            }
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings.isNil()) {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings = GoMap.make(0, []);
            }
            {
                const __gotots_results_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings.lookupOk(Node__from_ast.Text(name));
                let ok = __gotots_results_5[1];
                if (!ok) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindingNames = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindingNames.append("", [Node__from_ast.Text(name)]);
                }
            }
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings.store(Node__from_ast.Text(name), specifier);
        }
        const __gotots_store_245 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_245.Transformer), name);
    }
    static $go$private$estransforms$hoistClassDeclaration(tx: usingDeclarationTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (ClassDeclaration__from_ast.Name(node) === undefined && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding === undefined)) {
            const __gotots_store_184 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_185 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_141 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_142 = ModifierFlagsExport$constant__from_ast();
        let isExported = HasSyntacticModifier__from_ast(__gotots_argument_141, __gotots_argument_142);
        const __gotots_store_186 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_143 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_144 = ModifierFlagsDefault$constant__from_ast();
        let isDefault = HasSyntacticModifier__from_ast(__gotots_argument_143, __gotots_argument_144);
        const __gotots_store_187 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_145 = Transformer__from_transformers.EmitContext(__gotots_store_187.Transformer);
        const __gotots_argument_146 = node;
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = convertClassDeclarationToClassExpression(__gotots_argument_145, __gotots_argument_146);
        if (!(ClassDeclaration__from_ast.Name(node) === undefined)) {
            const __gotots_receiver_54 = tx;
            const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_53 = Transformer__from_transformers.Factory(__gotots_store_188.Transformer);
            const __gotots_store_189 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_147 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_148 = NodeFactory__from_printer.GetLocalName(__gotots_receiver_53, __gotots_argument_147);
            const __gotots_argument_149 = isExported && !isDefault;
            const __gotots_argument_150 = void 0;
            const __gotots_store_190 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_151 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            usingDeclarationTransformer.$go$private$estransforms$hoistBindingIdentifier(__gotots_receiver_54, __gotots_argument_148, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151);
            const __gotots_store_191 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_56 = Transformer__from_transformers.Factory(__gotots_store_191.Transformer);
            const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_55 = Transformer__from_transformers.Factory(__gotots_store_192.Transformer);
            const __gotots_store_193 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_152 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_153 = NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_55, __gotots_argument_152);
            const __gotots_argument_154 = expression;
            expression = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_56, __gotots_argument_153, __gotots_argument_154);
            const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_57 = Transformer__from_transformers.EmitContext(__gotots_store_194.Transformer);
            const __gotots_argument_155 = expression;
            const __gotots_store_195 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_156 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_57, __gotots_argument_155, __gotots_argument_156);
            const __gotots_store_196 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_196.Transformer), expression, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_197 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_197.Transformer), expression, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_157 = Transformer__from_transformers.EmitContext(__gotots_store_198.Transformer);
            const __gotots_argument_158 = expression;
            if (isNamedEvaluation(__gotots_argument_157, __gotots_argument_158)) {
                const __gotots_store_199 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_159 = Transformer__from_transformers.EmitContext(__gotots_store_199.Transformer);
                const __gotots_argument_160 = expression;
                const __gotots_argument_161 = false;
                const __gotots_argument_162 = "";
                expression = transformNamedEvaluation(__gotots_argument_159, __gotots_argument_160, __gotots_argument_161, __gotots_argument_162);
            }
        }
        if (isDefault && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding === undefined) {
            const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_200.Transformer), "_default", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(56), "", ""));
            const __gotots_receiver_58 = tx;
            const __gotots_argument_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding;
            const __gotots_argument_164 = true;
            const __gotots_store_201 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_202 = (Transformer__from_transformers.Factory(__gotots_store_201.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_165 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "NodeFactory"), "default");
            const __gotots_store_203 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_166 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            usingDeclarationTransformer.$go$private$estransforms$hoistBindingIdentifier(__gotots_receiver_58, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165, __gotots_argument_166);
            const __gotots_store_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_204.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding, expression);
            const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_59 = Transformer__from_transformers.EmitContext(__gotots_store_205.Transformer);
            const __gotots_argument_167 = expression;
            const __gotots_store_206 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_168 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_59, __gotots_argument_167, __gotots_argument_168);
            const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_169 = Transformer__from_transformers.EmitContext(__gotots_store_207.Transformer);
            const __gotots_argument_170 = expression;
            if (isNamedEvaluation(__gotots_argument_169, __gotots_argument_170)) {
                const __gotots_store_208 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_171 = Transformer__from_transformers.EmitContext(__gotots_store_208.Transformer);
                const __gotots_argument_172 = expression;
                const __gotots_argument_173 = false;
                const __gotots_argument_174 = "default";
                expression = transformNamedEvaluation(__gotots_argument_171, __gotots_argument_172, __gotots_argument_173, __gotots_argument_174);
            }
        }
        const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_210 = (Transformer__from_transformers.Factory(__gotots_store_209.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "NodeFactory"), expression);
    }
    static $go$private$estransforms$hoistExportAssignment(tx: usingDeclarationTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
            return usingDeclarationTransformer.$go$private$estransforms$hoistExportEquals(tx, node);
        }
        else {
            return usingDeclarationTransformer.$go$private$estransforms$hoistExportDefault(tx, node);
        }
    }
    static $go$private$estransforms$hoistExportDefault(tx: usingDeclarationTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding === undefined)) {
            const __gotots_store_225 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_226 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_226.Transformer), "_default", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(56), "", ""));
        const __gotots_receiver_62 = tx;
        const __gotots_argument_180 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding;
        const __gotots_argument_181 = true;
        const __gotots_store_227 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_228 = (Transformer__from_transformers.Factory(__gotots_store_227.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_182 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_228, "NodeFactory"), "default");
        const __gotots_store_229 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_183 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        usingDeclarationTransformer.$go$private$estransforms$hoistBindingIdentifier(__gotots_receiver_62, __gotots_argument_180, __gotots_argument_181, __gotots_argument_182, __gotots_argument_183);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(expression, OEKAll$constant__from_ast());
        const __gotots_store_230 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_184 = Transformer__from_transformers.EmitContext(__gotots_store_230.Transformer);
        const __gotots_argument_185 = innerExpression;
        if (isNamedEvaluation(__gotots_argument_184, __gotots_argument_185)) {
            const __gotots_store_231 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_186 = Transformer__from_transformers.EmitContext(__gotots_store_231.Transformer);
            const __gotots_argument_187 = innerExpression;
            const __gotots_argument_188 = false;
            const __gotots_argument_189 = "default";
            innerExpression = transformNamedEvaluation(__gotots_argument_186, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189);
            const __gotots_store_232 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            expression = NodeFactory__from_printer.RestoreOuterExpressions(Transformer__from_transformers.Factory(__gotots_store_232.Transformer), expression, innerExpression, OEKAll$constant__from_ast());
        }
        const __gotots_store_233 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_233.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding, expression);
        const __gotots_store_234 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_235 = (Transformer__from_transformers.Factory(__gotots_store_234.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_235, "NodeFactory"), assignment);
    }
    static $go$private$estransforms$hoistExportEquals(tx: usingDeclarationTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding === undefined)) {
            const __gotots_store_219 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_219, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_220 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_220.Transformer), "_default", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(56), "", ""));
        const __gotots_store_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_221.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding);
        const __gotots_store_222 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_222.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_223 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_224 = (Transformer__from_transformers.Factory(__gotots_store_223.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_224, "NodeFactory"), assignment);
    }
    static $go$private$estransforms$hoistImportOrExportOrHoistedDeclaration(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, topLevelStatements: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): void {
        void ((topLevelStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            ((topLevelStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value.append(void 0, [node]));
    }
    static $go$private$estransforms$hoistInitializedVariable(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined) {
            const __gotots_argument_195 = new $goInterfaceAdapter$string("Expected initializer");
            GoPanic.raise(__gotots_argument_195 === undefined ? GoPanicNilValue.create() : __gotots_argument_195);
        }
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(node))) {
            const __gotots_receiver_64 = VariableDeclaration__from_ast.Name(node);
            const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_196 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_246.Transformer));
            target = Node__from_ast.Clone(__gotots_receiver_64, __gotots_argument_196);
            const __gotots_store_247 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_65 = Transformer__from_transformers.EmitContext(__gotots_store_247.Transformer);
            const __gotots_argument_197 = target;
            const __gotots_store_248 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_binary_operand_0 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_248.Transformer), target);
            const __gotots_binary_operand_1 = 4294961151;
            const __gotots_argument_198 = (__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0;
            EmitContext__from_printer.SetEmitFlags(__gotots_receiver_65, __gotots_argument_197, __gotots_argument_198);
        }
        else {
            const __gotots_store_249 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_199 = Transformer__from_transformers.EmitContext(__gotots_store_249.Transformer);
            const __gotots_argument_200 = Node__from_ast.AsBindingPattern(VariableDeclaration__from_ast.Name(node));
            target = ConvertBindingPatternToAssignmentPattern__from_transformers(__gotots_argument_199, __gotots_argument_200);
        }
        const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_250.Transformer), target, VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
        const __gotots_store_251 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_66 = Transformer__from_transformers.EmitContext(__gotots_store_251.Transformer);
        const __gotots_argument_201 = assignment;
        const __gotots_store_252 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_202 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_252, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_66, __gotots_argument_201, __gotots_argument_202);
        const __gotots_store_253 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_253.Transformer), assignment, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
        const __gotots_store_254 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_254.Transformer), assignment, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
        return assignment;
    }
    static $go$private$estransforms$hoistVariableStatement(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_211 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_175 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_176 = ModifierFlagsExport$constant__from_ast();
        let isExported = HasSyntacticModifier__from_ast(__gotots_argument_175, __gotots_argument_176);
        const __gotots_range_5 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let variable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            usingDeclarationTransformer.$go$private$estransforms$hoistBindingElement(tx, variable, isExported, variable);
            if (!(Node__from_ast.Initializer(variable) === undefined)) {
                expressions = expressions.append(void 0, [usingDeclarationTransformer.$go$private$estransforms$hoistInitializedVariable(tx, Node__from_ast.AsVariableDeclaration(variable))]);
            }
        }
        if (expressions.length > 0) {
            const __gotots_store_212 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_213 = (Transformer__from_transformers.Factory(__gotots_store_212.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_60 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "NodeFactory");
            const __gotots_store_214 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_177 = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_214.Transformer), expressions);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_60, __gotots_argument_177);
            const __gotots_store_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_61 = Transformer__from_transformers.EmitContext(__gotots_store_215.Transformer);
            const __gotots_argument_178 = statement;
            const __gotots_store_216 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_179 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_61, __gotots_argument_178, __gotots_argument_179);
            const __gotots_store_217 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_217.Transformer), statement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                            VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_218 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_218.Transformer), statement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                            VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase)).NodeDefault)).Node)).Loc)));
            return statement;
        }
        return void 0;
    }
    static $go$private$estransforms$transformUsingDeclarations(tx: usingDeclarationTransformer | undefined, statementsIn: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, topLevelStatements: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let hoist: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (topLevelStatements === undefined) {
                return node;
            }
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindImportDeclaration$constant__from_ast():
                case KindImportEqualsDeclaration$constant__from_ast():
                case KindExportDeclaration$constant__from_ast():
                case KindFunctionDeclaration$constant__from_ast(): {
                    usingDeclarationTransformer.$go$private$estransforms$hoistImportOrExportOrHoistedDeclaration(tx, node, topLevelStatements);
                    return void 0;
                    break;
                }
                case KindExportAssignment$constant__from_ast(): {
                    return usingDeclarationTransformer.$go$private$estransforms$hoistExportAssignment(tx, Node__from_ast.AsExportAssignment(node));
                    break;
                }
                case KindClassDeclaration$constant__from_ast(): {
                    return usingDeclarationTransformer.$go$private$estransforms$hoistClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                    break;
                }
                case KindVariableStatement$constant__from_ast(): {
                    return usingDeclarationTransformer.$go$private$estransforms$hoistVariableStatement(tx, Node__from_ast.AsVariableStatement(node));
                    break;
                }
            }
            return node;
        };
        let hoistOrAppendNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            const __gotots_callee_0 = hoist;
            const __gotots_argument_61 = node;
            node = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_61);
            if (!(node === undefined)) {
                statements = statements.append(void 0, [node]);
            }
        };
        const __gotots_range_2 = statementsIn;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            let usingKind__shadow_1 = getUsingKind(statement);
            if (!(usingKind__shadow_1.$value === usingKindNone$constant().$value)) {
                let varStatement: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined = Node__from_ast.AsVariableStatement(statement);
                let declarationList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = VariableStatement__from_ast.$storageOf(((varStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList;
                let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                const __gotots_range_3 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                    const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                    if (!IsIdentifier__from_ast(Node__from_ast.Name(declaration))) {
                        declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break;
                    }
                    const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_62 = Transformer__from_transformers.EmitContext(__gotots_store_85.Transformer);
                    const __gotots_argument_63 = declaration;
                    if (isNamedEvaluation(__gotots_argument_62, __gotots_argument_63)) {
                        const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_64 = Transformer__from_transformers.EmitContext(__gotots_store_86.Transformer);
                        const __gotots_argument_65 = declaration;
                        const __gotots_argument_66 = false;
                        const __gotots_argument_67 = "";
                        declaration = transformNamedEvaluation(__gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
                    }
                    const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_87.Transformer), Node__from_ast.Initializer(declaration));
                    if (initializer === undefined) {
                        const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        initializer = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_88.Transformer));
                    }
                    const __gotots_argument_73 = declarations;
                    const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_90 = (Transformer__from_transformers.Factory(__gotots_store_89.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeFactory");
                    const __gotots_argument_68 = Node__from_ast.AsVariableDeclaration(declaration);
                    const __gotots_argument_69 = Node__from_ast.Name(declaration);
                    const __gotots_argument_70 = void 0;
                    const __gotots_argument_71 = void 0;
                    const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_72 = NodeFactory__from_printer.NewAddDisposableResourceHelper(Transformer__from_transformers.Factory(__gotots_store_91.Transformer), envBinding, initializer, usingKind__shadow_1.$value === usingKindAsync$constant().$value);
                    const __gotots_argument_74 = NodeFactory__from_ast.UpdateVariableDeclaration(__gotots_receiver_24, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
                    declarations = __gotots_argument_73.append(void 0, [__gotots_argument_74]);
                }
                if (declarations.length > 0) {
                    const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_93 = (Transformer__from_transformers.Factory(__gotots_store_92.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeFactory");
                    const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_95 = (Transformer__from_transformers.Factory(__gotots_store_94.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_75 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeFactory"), declarations);
                    const __gotots_argument_76 = NodeFlagsConst$constant__from_ast();
                    let varList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_25, __gotots_argument_75, __gotots_argument_76);
                    const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_96.Transformer), varList, declarationList);
                    Node__from_ast.$storageOf(((varList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((declarationList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_callee_1 = hoistOrAppendNode;
                    const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_98 = (Transformer__from_transformers.Factory(__gotots_store_97.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_77 = NodeFactory__from_ast.UpdateVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeFactory"), varStatement, void 0, varList);
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_77);
                    continue;
                }
            }
            {
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = usingDeclarationTransformer.$go$private$estransforms$visit(tx, statement);
                if (!(result === undefined)) {
                    if (Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                        const __gotots_range_4: SyntaxList__from_ast["Children"] = (Node__from_ast.AsSyntaxList(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                            const __gotots_callee_2 = hoistOrAppendNode;
                            const __gotots_argument_78 = node;
                            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78);
                        }
                    }
                    else {
                        const __gotots_callee_3 = hoistOrAppendNode;
                        const __gotots_argument_79 = result;
                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_79);
                    }
                }
            }
        }
        return statements;
    }
    static $go$private$estransforms$visit(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsUsing$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                node = usingDeclarationTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindBlock$constant__from_ast(): {
                node = usingDeclarationTransformer.$go$private$estransforms$visitBlock(tx, Node__from_ast.AsBlock(node));
                break;
            }
            case KindForStatement$constant__from_ast(): {
                node = usingDeclarationTransformer.$go$private$estransforms$visitForStatement(tx, Node__from_ast.AsForStatement(node));
                break;
            }
            case KindForOfStatement$constant__from_ast(): {
                node = usingDeclarationTransformer.$go$private$estransforms$visitForOfStatement(tx, Node__from_ast.AsForInOrOfStatement(node));
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
    static $go$private$estransforms$visitBlock(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let usingKind__shadow_1 = getUsingKindOfStatements(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        if (!(usingKind__shadow_1.$value === usingKindNone$constant().$value)) {
            const __gotots_store_34 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_3 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(__gotots_store_34.Transformer), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            let prologue = __gotots_results_3[0];
            let rest = __gotots_results_3[1];
            let envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = usingDeclarationTransformer.$go$private$estransforms$createEnvBinding(tx);
            let statements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, prologue.length + 2, void 0);
            const __gotots_argument_32 = statements;
            const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_4 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_35.Transformer), prologue);
            const __gotots_argument_33 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_4[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_4[1])]));
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_32, __gotots_argument_33, void 0);
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, usingDeclarationTransformer.$go$private$estransforms$createDownlevelUsingStatements(tx, usingDeclarationTransformer.$go$private$estransforms$transformUsingDeclarations(tx, rest, envBinding, void 0), envBinding, usingKind__shadow_1.$value === usingKindAsync$constant().$value), void 0);
            const __gotots_store_36 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_37 = (Transformer__from_transformers.Factory(__gotots_store_36.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeFactory"), statements);
            NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_39 = (Transformer__from_transformers.Factory(__gotots_store_38.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), node, statementList, Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
        }
        const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_10 = Transformer__from_transformers.Visitor(__gotots_store_40.Transformer);
        const __gotots_store_41 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_34 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_10, __gotots_argument_34);
    }
    static $go$private$estransforms$visitForOfStatement(tx: usingDeclarationTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (isUsingVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)) {
            let forInitializer: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined = Node__from_ast.AsVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
            let forDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((forInitializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            if (forDecl === undefined) {
                const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_54 = (Transformer__from_transformers.Factory(__gotots_store_53.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
                const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_40 = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_55.Transformer));
                const __gotots_argument_41 = void 0;
                const __gotots_argument_42 = void 0;
                const __gotots_argument_43 = void 0;
                forDecl = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_15, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
            }
            let isAwaitUsing = getUsingKindOfVariableDeclarationList(forInitializer).$value === usingKindAsync$constant().$value;
            const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_56.Transformer), Node__from_ast.Name(forDecl));
            const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_58 = (Transformer__from_transformers.Factory(__gotots_store_57.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let usingVar: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory"), Node__from_ast.AsVariableDeclaration(forDecl), Node__from_ast.Name(forDecl), void 0, void 0, temp);
            const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_60 = (Transformer__from_transformers.Factory(__gotots_store_59.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeFactory");
            const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_62 = (Transformer__from_transformers.Factory(__gotots_store_61.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_44 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([usingVar]));
            const __gotots_argument_45 = IfElse$Named_ast$NodeFlags(isAwaitUsing, NodeFlagsAwaitUsing$constant__from_ast(), NodeFlagsUsing$constant__from_ast());
            let usingVarList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_16, __gotots_argument_44, __gotots_argument_45);
            const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_64 = (Transformer__from_transformers.Factory(__gotots_store_63.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let usingVarStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "NodeFactory"), void 0, usingVarList);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsBlock__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement)) {
                let statements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, Node__from_ast.Statements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement).length + 1, void 0);
                statements = statements.append(void 0, [usingVarStatement]);
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, Node__from_ast.Statements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement), void 0);
                const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_66 = (Transformer__from_transformers.Factory(__gotots_store_65.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NodeFactory");
                const __gotots_argument_46 = Node__from_ast.AsBlock((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
                const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_68 = (Transformer__from_transformers.Factory(__gotots_store_67.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_47 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "NodeFactory"), statements);
                const __gotots_argument_48 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
                statement = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_17, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
            }
            else {
                const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_70 = (Transformer__from_transformers.Factory(__gotots_store_69.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeFactory");
                const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_72 = (Transformer__from_transformers.Factory(__gotots_store_71.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_49 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([usingVarStatement, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement]));
                const __gotots_argument_50 = true;
                statement = NodeFactory__from_ast.NewBlock(__gotots_receiver_18, __gotots_argument_49, __gotots_argument_50);
            }
            const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_22 = Transformer__from_transformers.Visitor(__gotots_store_73.Transformer);
            const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_75 = (Transformer__from_transformers.Factory(__gotots_store_74.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory");
            const __gotots_argument_54 = node;
            const __gotots_argument_55: ForInOrOfStatement__from_ast["AwaitModifier"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier;
            const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_77 = (Transformer__from_transformers.Factory(__gotots_store_76.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "NodeFactory");
            const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_79 = (Transformer__from_transformers.Factory(__gotots_store_78.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NodeFactory");
            const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_81 = (Transformer__from_transformers.Factory(__gotots_store_80.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_3 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory"), temp, void 0, void 0, void 0);
            const __gotots_argument_51 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3]);
            const __gotots_argument_52 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_19, __gotots_argument_51);
            const __gotots_argument_53 = NodeFlagsConst$constant__from_ast();
            const __gotots_argument_56 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_20, __gotots_argument_52, __gotots_argument_53);
            const __gotots_argument_57: ForInOrOfStatement__from_ast["Expression"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
            const __gotots_argument_58 = statement;
            const __gotots_argument_59 = NodeFactory__from_ast.UpdateForInOrOfStatement(__gotots_receiver_21, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
            return NodeVisitor__from_ast.VisitNode(__gotots_receiver_22, __gotots_argument_59);
        }
        const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_23 = Transformer__from_transformers.Visitor(__gotots_store_82.Transformer);
        const __gotots_store_83 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_60 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_23, __gotots_argument_60);
    }
    static $go$private$estransforms$visitForStatement(tx: usingDeclarationTransformer | undefined, node: {
        value: ForStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined) && isUsingVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)) {
            const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_13 = Transformer__from_transformers.Visitor(__gotots_store_42.Transformer);
            const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_44 = (Transformer__from_transformers.Factory(__gotots_store_43.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory");
            const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_46 = (Transformer__from_transformers.Factory(__gotots_store_45.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory");
            const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_48 = (Transformer__from_transformers.Factory(__gotots_store_47.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeFactory"), void 0, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
            const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_50 = (Transformer__from_transformers.Factory(__gotots_store_49.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_2 = NodeFactory__from_ast.UpdateForStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory"), node, void 0, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement);
            const __gotots_argument_35 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1, __gotots_slice_element_2]);
            const __gotots_argument_36 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_11, __gotots_argument_35);
            const __gotots_argument_37 = false;
            const __gotots_argument_38 = NodeFactory__from_ast.NewBlock(__gotots_receiver_12, __gotots_argument_36, __gotots_argument_37);
            return NodeVisitor__from_ast.VisitNode(__gotots_receiver_13, __gotots_argument_38);
        }
        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_14 = Transformer__from_transformers.Visitor(__gotots_store_51.Transformer);
        const __gotots_store_52 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.StatementBase).NodeBase));
        const __gotots_argument_39 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_14, __gotots_argument_39);
    }
    static $go$private$estransforms$visitSourceFile(tx: usingDeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_2 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let usingKind__shadow_1 = getUsingKindOfStatements(NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        if (!(usingKind__shadow_1.$value === usingKindNone$constant().$value)) {
            const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_3.Transformer));
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings = GoMap.make(0, []);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_0 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(__gotots_store_4.Transformer), NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            let prologue = __gotots_results_0[0];
            let rest = __gotots_results_0[1];
            let topLevelStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const topLevelStatements$location = tsonicTypeScriptRuntime.boundLocation({}, () => topLevelStatements, topLevelStatements$next => topLevelStatements = topLevelStatements$next);
            const __gotots_argument_2 = topLevelStatements;
            const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_1 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_5.Transformer), prologue);
            const __gotots_argument_3 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_1[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_1[1])]));
            topLevelStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_2, __gotots_argument_3, void 0);
            let pos = 0;
            for (; pos < rest.length;) {
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = rest.get(pos);
                if (!(getUsingKind(statement).$value === usingKindNone$constant().$value)) {
                    if (pos > 0) {
                        const __gotots_argument_4 = topLevelStatements;
                        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_results_2 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_6.Transformer), rest.slice(0, pos, null));
                        const __gotots_argument_5 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_2[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_2[1])]));
                        topLevelStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_4, __gotots_argument_5, void 0);
                    }
                    break;
                }
                pos++;
            }
            if (pos >= rest.length) {
                const __gotots_argument_6 = new $goInterfaceAdapter$string("Should have encountered at least one 'using' statement.");
                GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
            }
            let envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = usingDeclarationTransformer.$go$private$estransforms$createEnvBinding(tx);
            let bodyStatements = usingDeclarationTransformer.$go$private$estransforms$transformUsingDeclarations(tx, rest.slice(pos, null, null), envBinding, topLevelStatements$location);
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings.length() > 0) {
                let exportSpecifiers = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindingNames.length, void 0);
                const __gotots_range_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindingNames;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let name = __gotots_range_value_0;
                    let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings.lookup(name);
                    Assert__from_debug(!(specifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Missing export binding for hoisted export name")]));
                    exportSpecifiers = exportSpecifiers.append(void 0, [specifier]);
                }
                const __gotots_argument_13 = topLevelStatements;
                const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_8 = (Transformer__from_transformers.Factory(__gotots_store_7.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory");
                const __gotots_argument_8 = void 0;
                const __gotots_argument_9 = false;
                const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_10 = (Transformer__from_transformers.Factory(__gotots_store_9.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory");
                const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_12 = (Transformer__from_transformers.Factory(__gotots_store_11.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_7 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), exportSpecifiers);
                const __gotots_argument_10 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_2, __gotots_argument_7);
                const __gotots_argument_11 = void 0;
                const __gotots_argument_12 = void 0;
                const __gotots_argument_14 = NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_3, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
                topLevelStatements = __gotots_argument_13.append(void 0, [__gotots_argument_14]);
            }
            const __gotots_argument_15 = topLevelStatements;
            const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_16 = EmitContext__from_printer.EndVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_13.Transformer));
            topLevelStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_15, __gotots_argument_16, void 0);
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars.length > 0) {
                const __gotots_argument_22 = topLevelStatements;
                const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_15 = (Transformer__from_transformers.Factory(__gotots_store_14.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory");
                const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_17 = (Transformer__from_transformers.Factory(__gotots_store_16.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory");
                const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_19 = (Transformer__from_transformers.Factory(__gotots_store_18.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_slice_element_0 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), KindExportKeyword$constant__from_ast());
                const __gotots_argument_17 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
                const __gotots_argument_20 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_4, __gotots_argument_17);
                const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_21 = (Transformer__from_transformers.Factory(__gotots_store_20.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
                const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_23 = (Transformer__from_transformers.Factory(__gotots_store_22.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_18 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars);
                const __gotots_argument_19 = NodeFlagsLet$constant__from_ast();
                const __gotots_argument_21 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_5, __gotots_argument_18, __gotots_argument_19);
                const __gotots_argument_23 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_6, __gotots_argument_20, __gotots_argument_21);
                topLevelStatements = __gotots_argument_22.append(void 0, [__gotots_argument_23]);
            }
            topLevelStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(topLevelStatements, usingDeclarationTransformer.$go$private$estransforms$createDownlevelUsingStatements(tx, bodyStatements, envBinding, usingKind__shadow_1.$value === usingKindAsync$constant().$value), void 0);
            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding === undefined)) {
                const __gotots_argument_24 = topLevelStatements;
                const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_25 = (Transformer__from_transformers.Factory(__gotots_store_24.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_25 = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), void 0, true, void 0, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding);
                topLevelStatements = __gotots_argument_24.append(void 0, [__gotots_argument_25]);
            }
            const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_27 = (Transformer__from_transformers.Factory(__gotots_store_26.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory");
            const __gotots_argument_26 = node;
            const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_29 = (Transformer__from_transformers.Factory(__gotots_store_28.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_27 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), topLevelStatements);
            const __gotots_argument_28 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken;
            visited = NodeFactory__from_ast.UpdateSourceFile(__gotots_receiver_7, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
        }
        else {
            const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_8 = Transformer__from_transformers.Visitor(__gotots_store_30.Transformer);
            const __gotots_store_31 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_29 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            visited = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_8, __gotots_argument_29);
        }
        const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_9 = Transformer__from_transformers.EmitContext(__gotots_store_32.Transformer);
        const __gotots_argument_30 = visited;
        const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_31 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_33.Transformer));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_9, __gotots_argument_30, __gotots_argument_31);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportVars = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindings = GoMap.nil();
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportBindingNames = RuntimeSlice.nil<gostring>();
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultExportBinding = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEqualsBinding = void 0;
        return visited;
    }
}
export function newUsingDeclarationTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: usingDeclarationTransformer | undefined = new usingDeclarationTransformer(Transformer__from_transformers.$zero(), GoMap.nil(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return usingDeclarationTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export class usingKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint) {
    }
    declare private readonly then?: never;
}
export function usingKindNone$constant(): usingKind {
    return new usingKind(0);
}
export function usingKindSync$constant(): usingKind {
    return new usingKind(1);
}
export function usingKindAsync$constant(): usingKind {
    return new usingKind(2);
}
export function isUsingVariableDeclarationList(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsVariableDeclarationList__from_ast(node) && !(getUsingKindOfVariableDeclarationList(Node__from_ast.AsVariableDeclarationList(node)).$value === usingKindNone$constant().$value);
}
export function getUsingKindOfVariableDeclarationList(node: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined): usingKind {
    switch (((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclarationList__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).NodeBase)).NodeDefault)).Node)).Flags & NodeFlagsBlockScoped$constant__from_ast()) >>> 0) {
        case NodeFlagsAwaitUsing$constant__from_ast(): {
            return usingKindAsync$constant();
            break;
        }
        case NodeFlagsUsing$constant__from_ast(): {
            return usingKindSync$constant();
            break;
        }
        default: {
            return usingKindNone$constant();
            break;
        }
    }
}
export function getUsingKindOfVariableStatement(node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): usingKind {
    return getUsingKindOfVariableDeclarationList(Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList));
}
export function getUsingKind(statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): usingKind {
    if (IsVariableStatement__from_ast(statement)) {
        return getUsingKindOfVariableStatement(Node__from_ast.AsVariableStatement(statement));
    }
    return usingKindNone$constant();
}
export function getUsingKindOfStatements(statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): usingKind {
    let result = usingKindNone$constant();
    const __gotots_range_1 = statements;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        let usingKind__shadow_1 = getUsingKind(statement);
        if (usingKind__shadow_1.$value === usingKindAsync$constant().$value) {
            return usingKindAsync$constant();
        }
        if (usingKind__shadow_1.$value > result.$value) {
            result = usingKind__shadow_1;
        }
    }
    return result;
}
