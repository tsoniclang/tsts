import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, CatchClause as CatchClause__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, SourceFile as SourceFile__from_ast, SyntaxList as SyntaxList__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, ContainsObjectRestOrSpread as ContainsObjectRestOrSpread__from_ast, ExpressionBase as ExpressionBase__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsAssignmentPattern as IsAssignmentPattern__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, SkipParentheses as SkipParentheses__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsESObjectRestOrSpread$constant as SubtreeContainsESObjectRestOrSpread$constant__from_ast, SubtreeContainsObjectRestOrSpread$constant as SubtreeContainsObjectRestOrSpread$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EFCustomPrologue$constant as EFCustomPrologue$constant__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFNoSourceMap$constant as EFNoSourceMap$constant__from_printer, EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { CreateAssignmentCallback as CreateAssignmentCallback__from_transformers, FlattenDestructuringAssignment as FlattenDestructuringAssignment__from_transformers, FlattenDestructuringBinding as FlattenDestructuringBinding__from_transformers, FlattenLevelAll$constant as FlattenLevelAll$constant__from_transformers, FlattenLevelObjectRest$constant as FlattenLevelObjectRest$constant__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class objectRestSpreadTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public inExportedVariableStatement: bool, public expressionResultIsUnused: bool, public parametersWithPrecedingObjectRestOrSpread: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$chunkObjectLiteralElements(ch: objectRestSpreadTransformer | undefined, list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (list === undefined || NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let elements = NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        let chunkObject = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let objects = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1, void 0);
        const __gotots_range_2 = elements;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            if (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSpreadAssignment$constant__from_ast()) {
                if (chunkObject.length > 0) {
                    const __gotots_argument_127 = objects;
                    const __gotots_store_132 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_133 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "NodeFactory");
                    const __gotots_store_134 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_135 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_125 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory"), chunkObject);
                    const __gotots_argument_126 = false;
                    const __gotots_argument_128 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_42, __gotots_argument_125, __gotots_argument_126);
                    objects = __gotots_argument_127.append(void 0, [__gotots_argument_128]);
                    chunkObject = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
                let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(e);
                const __gotots_argument_129 = objects;
                const __gotots_store_136 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_130 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "Transformer")), target);
                objects = __gotots_argument_129.append(void 0, [__gotots_argument_130]);
            }
            else {
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAssignment$constant__from_ast()) {
                    const __gotots_store_137 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_138 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeFactory");
                    const __gotots_argument_131 = void 0;
                    const __gotots_argument_132 = Node__from_ast.Name(e);
                    const __gotots_argument_133 = void 0;
                    const __gotots_argument_134 = void 0;
                    const __gotots_store_139 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_135 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "Transformer")), Node__from_ast.Initializer(e));
                    elem = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_43, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133, __gotots_argument_134, __gotots_argument_135);
                }
                else {
                    const __gotots_store_140 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    elem = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "Transformer")), e);
                }
                chunkObject = chunkObject.append(void 0, [elem]);
            }
        }
        if (chunkObject.length > 0) {
            const __gotots_argument_138 = objects;
            const __gotots_store_141 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_142 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory");
            const __gotots_store_143 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_144 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_136 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), chunkObject);
            const __gotots_argument_137 = false;
            const __gotots_argument_139 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_44, __gotots_argument_136, __gotots_argument_137);
            objects = __gotots_argument_138.append(void 0, [__gotots_argument_139]);
        }
        return objects;
    }
    static $go$private$estransforms$collectObjectRestAssignments(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let containsPrecedingObjectRestOrSpread = false;
        let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_5 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_7 = __gotots_range_5.get(__gotots_range_index_5);
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            if (containsPrecedingObjectRestOrSpread) {
                if (IsBindingPattern__from_ast(Node__from_ast.Name(parameter))) {
                    if (Node__from_ast.Elements(Node__from_ast.Name(parameter)).length > 0) {
                        const __gotots_store_170 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_149 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "Transformer");
                        const __gotots_argument_150 = parameter;
                        const __gotots_store_171 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_151 = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "Transformer")), parameter);
                        const __gotots_argument_152 = FlattenLevelAll$constant__from_transformers();
                        const __gotots_argument_153 = false;
                        const __gotots_argument_154 = false;
                        let declarations: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FlattenDestructuringBinding__from_transformers(__gotots_argument_149, __gotots_argument_150, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154);
                        if (!(declarations === undefined)) {
                            const __gotots_store_172 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_173 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "NodeFactory");
                            const __gotots_store_174 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_175 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_155 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
                            const __gotots_argument_156 = NodeFlagsNone$constant__from_ast();
                            let declarationList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_47, __gotots_argument_155, __gotots_argument_156);
                            let decls = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([declarations]);
                            if (Node__from_ast.$storageOf(((declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                                decls = (Node__from_ast.AsSyntaxList(declarations) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                            }
                            NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, decls, void 0);
                            const __gotots_store_176 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_177 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "NodeFactory"), void 0, declarationList);
                            const __gotots_store_178 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "Transformer")), statement, EFCustomPrologue$constant__from_printer());
                            results = results.append(void 0, [statement]);
                        }
                    }
                    else if (!(Node__from_ast.Initializer(parameter) === undefined)) {
                        const __gotots_store_179 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "Transformer")), parameter);
                        const __gotots_store_180 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "Transformer")), Node__from_ast.Initializer(parameter));
                        const __gotots_store_181 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "Transformer")), name, initializer);
                        const __gotots_store_182 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_183 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory"), assignment);
                        const __gotots_store_184 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "Transformer")), statement, EFCustomPrologue$constant__from_printer());
                        results = results.append(void 0, [statement]);
                    }
                }
                else if (!(Node__from_ast.Initializer(parameter) === undefined)) {
                    const __gotots_receiver_48 = Node__from_ast.Name(parameter);
                    const __gotots_store_185 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_157 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "Transformer")));
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_48, __gotots_argument_157);
                    Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Name(parameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_store_186 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "Transformer")), name, EFNoSourceMap$constant__from_printer());
                    const __gotots_store_187 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "Transformer")), Node__from_ast.Initializer(parameter));
                    const __gotots_store_188 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "Transformer")), initializer, 396);
                    const __gotots_store_189 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "Transformer")), name, initializer);
                    Node__from_ast.$storageOf(((assignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_store_190 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "Transformer")), assignment, EFNoComments$constant__from_printer());
                    const __gotots_store_191 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_192 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_192, "NodeFactory");
                    const __gotots_store_193 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_194 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_194, "NodeFactory");
                    const __gotots_store_195 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_196 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_slice_element_2 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "NodeFactory"), assignment);
                    const __gotots_argument_158 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
                    const __gotots_argument_159 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_49, __gotots_argument_158);
                    const __gotots_argument_160 = false;
                    let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_50, __gotots_argument_159, __gotots_argument_160);
                    Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_store_197 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "Transformer")), block, 489);
                    const __gotots_store_198 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_52 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "Transformer"));
                    const __gotots_receiver_51 = name;
                    const __gotots_store_199 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_161 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "Transformer")));
                    const __gotots_argument_162 = Node__from_ast.Clone(__gotots_receiver_51, __gotots_argument_161);
                    const __gotots_argument_163 = "undefined";
                    let typeCheck: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTypeCheck(__gotots_receiver_52, __gotots_argument_162, __gotots_argument_163);
                    const __gotots_store_200 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_201 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIfStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory"), typeCheck, block, void 0);
                    Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_store_202 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "Transformer")), statement, 590312);
                    results = results.append(void 0, [statement]);
                }
            }
            else if (!((Node__from_ast.SubtreeFacts(parameter) & SubtreeContainsObjectRestOrSpread$constant__from_ast()) >>> 0 === 0)) {
                containsPrecedingObjectRestOrSpread = true;
                const __gotots_store_203 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_164 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "Transformer");
                const __gotots_argument_165 = parameter;
                const __gotots_store_204 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_166 = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "Transformer")), parameter);
                const __gotots_argument_167 = FlattenLevelObjectRest$constant__from_transformers();
                const __gotots_argument_168 = false;
                const __gotots_argument_169 = true;
                let declarations: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FlattenDestructuringBinding__from_transformers(__gotots_argument_164, __gotots_argument_165, __gotots_argument_166, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169);
                if (!(declarations === undefined)) {
                    const __gotots_store_205 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_206 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_205, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeFactory");
                    const __gotots_store_207 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_208 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_207, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_170 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
                    const __gotots_argument_171 = NodeFlagsNone$constant__from_ast();
                    let declarationList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_53, __gotots_argument_170, __gotots_argument_171);
                    let decls = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([declarations]);
                    if (Node__from_ast.$storageOf(((declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                        decls = (Node__from_ast.AsSyntaxList(declarations) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                    }
                    NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, decls, void 0);
                    const __gotots_store_209 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_210 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_209, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "NodeFactory"), void 0, declarationList);
                    const __gotots_store_211 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "Transformer")), statement, EFCustomPrologue$constant__from_printer());
                    results = results.append(void 0, [statement]);
                }
            }
        }
        return results;
    }
    static $go$private$estransforms$collectParametersWithPrecedingObjectRestOrSpread(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> {
        let result: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> = GoMap.nil();
        const __gotots_range_4 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_4);
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
            if (!result.isNil()) {
                result.store(parameter, new GoEmptyStruct);
            }
            else if (!((Node__from_ast.SubtreeFacts(parameter) & SubtreeContainsObjectRestOrSpread$constant__from_ast()) >>> 0 === 0)) {
                result = GoMap.make(0, []);
            }
        }
        return result;
    }
    static $go$private$estransforms$enterParameterListContext(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): oldParamScope {
        let old: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread;
        (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread = objectRestSpreadTransformer.$go$private$estransforms$collectParametersWithPrecedingObjectRestOrSpread(ch, node);
        return new oldParamScope(old);
    }
    static $go$private$estransforms$exitParameterListContext(ch: objectRestSpreadTransformer | undefined, scope: oldParamScope): void {
        (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread = scope.$value;
    }
    static $go$private$estransforms$transformFunctionBody(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_150 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "Transformer")));
        const __gotots_store_151 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "Transformer")), Node__from_ast.Body(node));
        const __gotots_store_152 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let extras = EmitContext__from_printer.EndVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "Transformer")));
        const __gotots_store_153 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "Transformer")));
        let newStatements = objectRestSpreadTransformer.$go$private$estransforms$collectObjectRestAssignments(ch, node);
        const __gotots_store_154 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        extras = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "Transformer")), extras);
        if (newStatements.length === 0 && extras.length === 0) {
            return body;
        }
        if (body === undefined) {
            const __gotots_store_155 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_156 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
            const __gotots_store_157 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_158 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_147 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_148 = true;
            body = NodeFactory__from_ast.NewBlock(__gotots_receiver_46, __gotots_argument_147, __gotots_argument_148);
        }
        let prefix = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let suffix = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (IsBlock__from_ast(body)) {
            let custom = false;
            const __gotots_range_3 = Node__from_ast.Statements(body);
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_4 = __gotots_range_index_3;
                const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_3);
                let i = __gotots_range_value_4;
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                if (!custom && IsPrologueDirective__from_ast(statement)) {
                    prefix = prefix.append(void 0, [statement]);
                }
                else {
                    const __gotots_store_159 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_binary_operand_6 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "Transformer")), statement);
                    const __gotots_binary_operand_7 = EFCustomPrologue$constant__from_printer();
                    if (!((__gotots_binary_operand_6 & __gotots_binary_operand_7) >>> 0 === 0)) {
                        custom = true;
                        prefix = prefix.append(void 0, [statement]);
                    }
                    else {
                        suffix = Node__from_ast.Statements(body).slice(i, null, null);
                        break;
                    }
                }
            }
        }
        else {
            const __gotots_store_160 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_161 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let ret: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory"), body);
            Node__from_ast.$storageOf(((ret ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_162 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_163 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_164 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_165 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            body = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "NodeFactory"), list, true);
            suffix = suffix.append(void 0, [ret]);
        }
        const __gotots_store_166 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_167 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let newStatementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "NodeFactory"), goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(prefix, extras, void 0), newStatements, void 0), suffix, void 0));
        NodeList__from_ast.$storageOf(((newStatementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        const __gotots_store_168 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_169 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory"), Node__from_ast.AsBlock(body), newStatementList, Block__from_ast.$storageOf(((Node__from_ast.AsBlock(body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
    }
    static $go$private$estransforms$visit(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsESObjectRestOrSpread$constant__from_ast()) >>> 0 === 0 && (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread.isNil()) {
                        __gotots_return_0 = node;
                        break __gotots_return_block_0;
                    }
                    let expressionResultIsUnused = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused;
                    (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = false;
                    const __gotots_callee_0 = (): void => {
                        (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = expressionResultIsUnused;
                    };
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_0();
                    };
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindSourceFile$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitSourceFile(ch, Node__from_ast.AsSourceFile(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindObjectLiteralExpression$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitObjectLiteralExpression(ch, Node__from_ast.AsObjectLiteralExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindBinaryExpression$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitBinaryExpression(ch, Node__from_ast.AsBinaryExpression(node), expressionResultIsUnused);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExpressionStatement$constant__from_ast(): {
                            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = true;
                            const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParenthesizedExpression$constant__from_ast(): {
                            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = expressionResultIsUnused;
                            const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer")), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindForOfStatement$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitForOftatement(ch, Node__from_ast.AsForInOrOfStatement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindVariableStatement$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitVariableStatement(ch, Node__from_ast.AsVariableStatement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindVariableDeclaration$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitVariableDeclaration(ch, Node__from_ast.AsVariableDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindCatchClause$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitCatchClause(ch, Node__from_ast.AsCatchClause(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParameter$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitParameter(ch, Node__from_ast.AsParameterDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindConstructor$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitContructorDeclaration(ch, Node__from_ast.AsConstructorDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindGetAccessor$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitGetAccessorDeclaration(ch, Node__from_ast.AsGetAccessorDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSetAccessor$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitSetAccessorDeclaration(ch, Node__from_ast.AsSetAccessorDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindMethodDeclaration$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitMethodDeclaration(ch, Node__from_ast.AsMethodDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitFunctionDeclaration(ch, Node__from_ast.AsFunctionDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindArrowFunction$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitArrowFunction(ch, Node__from_ast.AsArrowFunction(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionExpression$constant__from_ast(): {
                            __gotots_return_0 = objectRestSpreadTransformer.$go$private$estransforms$visitFunctionExpression(ch, Node__from_ast.AsFunctionExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            const __gotots_store_3 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Transformer")), node);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitArrowFunction(ch: objectRestSpreadTransformer | undefined, node: {
        value: ArrowFunction__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_36 = ch;
                    const __gotots_store_119 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
                    const __gotots_argument_104 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_36, __gotots_argument_104);
                    const __gotots_receiver_37 = ch;
                    const __gotots_argument_105 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_37, __gotots_argument_105);
                    };
                    const __gotots_store_120 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_121 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_39 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory");
                    const __gotots_argument_107 = node;
                    const __gotots_store_122 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_108 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "ModifiersBase"));
                    const __gotots_argument_109 = void 0;
                    const __gotots_store_123 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_110 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_111 = void 0;
                    const __gotots_argument_112 = void 0;
                    const __gotots_argument_113: ArrowFunction__from_ast["EqualsGreaterThanToken"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken;
                    const __gotots_receiver_38 = ch;
                    const __gotots_store_124 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
                    const __gotots_argument_106 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_114 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_38, __gotots_argument_106);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateArrowFunction(__gotots_receiver_39, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitBinaryExpression(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, expressionResultIsUnused: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_17 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_10 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (IsDestructuringAssignment__from_ast(__gotots_argument_10) && ContainsObjectRestOrSpread__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
            const __gotots_store_18 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Transformer");
            const __gotots_store_19 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
            const __gotots_argument_12 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_13 = !expressionResultIsUnused;
            const __gotots_argument_14 = FlattenLevelObjectRest$constant__from_transformers();
            const __gotots_argument_15 = new CreateAssignmentCallback__from_transformers(void 0);
            return FlattenDestructuringAssignment__from_transformers(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
        }
        if (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = true;
            const __gotots_store_20 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Transformer")), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionResultIsUnused = expressionResultIsUnused;
            const __gotots_store_21 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Transformer")), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            const __gotots_store_22 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_23 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), node, void 0, left, void 0, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
        }
        const __gotots_store_24 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_6 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer"));
        const __gotots_store_25 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_16 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_6, __gotots_argument_16);
    }
    static $go$private$estransforms$visitCatchClause(ch: objectRestSpreadTransformer | undefined, node: {
        value: CatchClause__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration === undefined) && IsBindingPattern__from_ast(Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration)) && !((Node__from_ast.SubtreeFacts(Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration)) & SubtreeContainsObjectRestOrSpread$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_store_51 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Transformer")), Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration));
            const __gotots_store_52 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_53 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let updatedDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeFactory"), Node__from_ast.AsVariableDeclaration((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration), Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration), void 0, void 0, name);
            const __gotots_store_54 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "Transformer");
            const __gotots_argument_29 = updatedDecl;
            const __gotots_argument_30 = void 0;
            const __gotots_argument_31 = FlattenLevelObjectRest$constant__from_transformers();
            const __gotots_argument_32 = false;
            const __gotots_argument_33 = false;
            let visitedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FlattenDestructuringBinding__from_transformers(__gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
            const __gotots_store_55 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block);
            if (!(visitedBindings === undefined)) {
                let decls = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                if (Node__from_ast.$storageOf(((visitedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                    decls = (Node__from_ast.AsSyntaxList(visitedBindings) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                }
                else {
                    decls = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([visitedBindings]);
                }
                const __gotots_store_56 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_57 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeFactory");
                const __gotots_argument_36 = void 0;
                const __gotots_store_58 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_59 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeFactory");
                const __gotots_store_60 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_61 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_34 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory"), decls);
                const __gotots_argument_35 = NodeFlagsNone$constant__from_ast();
                const __gotots_argument_37 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_13, __gotots_argument_34, __gotots_argument_35);
                let newStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_14, __gotots_argument_36, __gotots_argument_37);
                let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([newStatement]);
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, Node__from_ast.Statements(block), void 0);
                const __gotots_store_62 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_63 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeFactory"), statements);
                NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(block) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                const __gotots_store_64 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_65 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                block = NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory"), Node__from_ast.AsBlock(block), statementList, Block__from_ast.$storageOf(((Node__from_ast.AsBlock(block) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
            }
            const __gotots_store_66 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_67 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
            const __gotots_argument_38 = node;
            const __gotots_store_68 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_69 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_39 = NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory"), Node__from_ast.AsVariableDeclaration((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration), name, void 0, void 0, void 0);
            const __gotots_argument_40 = block;
            return NodeFactory__from_ast.UpdateCatchClause(__gotots_receiver_15, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
        }
        const __gotots_store_70 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_16 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "Transformer"));
        const __gotots_store_71 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_41 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_16, __gotots_argument_41);
    }
    static $go$private$estransforms$visitContructorDeclaration(ch: objectRestSpreadTransformer | undefined, node: {
        value: ConstructorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_21 = ch;
                    const __gotots_store_85 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_52 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_21, __gotots_argument_52);
                    const __gotots_receiver_22 = ch;
                    const __gotots_argument_53 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_22, __gotots_argument_53);
                    };
                    const __gotots_store_86 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_87 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeFactory");
                    const __gotots_argument_55 = node;
                    const __gotots_store_88 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_56 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "ModifiersBase"));
                    const __gotots_argument_57 = void 0;
                    const __gotots_store_89 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_58 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_59 = void 0;
                    const __gotots_argument_60 = void 0;
                    const __gotots_receiver_23 = ch;
                    const __gotots_store_90 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_54 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_61 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_23, __gotots_argument_54);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_24, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitForOftatement(ch: objectRestSpreadTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((Node__from_ast.SubtreeFacts((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer) & SubtreeContainsObjectRestOrSpread$constant__from_ast()) >>> 0 === 0) || (IsAssignmentPattern__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer) && ContainsObjectRestOrSpread__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer))) {
            let initializerWithoutParens: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
            if (IsVariableDeclarationList__from_ast(initializerWithoutParens) || IsAssignmentPattern__from_ast(initializerWithoutParens)) {
                let bodyLocation = TextRange__from_core.$zero();
                let statementsLocation = TextRange__from_core.$zero();
                const __gotots_store_26 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Transformer")));
                const __gotots_store_27 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_7 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Transformer"));
                const __gotots_store_28 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_17 = NodeFactory__from_printer.CreateForOfBindingStatement(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "Transformer")), initializerWithoutParens, temp);
                let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(__gotots_receiver_7, __gotots_argument_17);
                let statements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1, void 0);
                if (!(res === undefined)) {
                    statements = statements.append(void 0, [res]);
                }
                if (IsBlock__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement)) {
                    const __gotots_range_1 = Node__from_ast.Statements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
                        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                        const __gotots_store_29 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Transformer")), statement);
                        if (!(visited === undefined)) {
                            statements = statements.append(void 0, [visited]);
                        }
                    }
                    bodyLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
                    statementsLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc));
                }
                else if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement === undefined)) {
                    const __gotots_argument_18 = statements;
                    const __gotots_store_30 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_19 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
                    statements = __gotots_argument_18.append(void 0, [__gotots_argument_19]);
                    bodyLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
                    statementsLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
                }
                const __gotots_store_31 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_32 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory");
                const __gotots_store_33 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_34 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory");
                const __gotots_store_35 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_36 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory"), temp, void 0, void 0, void 0);
                const __gotots_argument_20 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
                const __gotots_argument_21 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_8, __gotots_argument_20);
                const __gotots_argument_22 = NodeFlagsLet$constant__from_ast();
                let list: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_9, __gotots_argument_21, __gotots_argument_22);
                Node__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_37 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                const __gotots_store_38 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_39 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statementsList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), statements);
                NodeList__from_ast.$storageOf(((statementsList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(statementsLocation));
                const __gotots_store_40 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_41 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory"), statementsList, true);
                Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(bodyLocation));
                const __gotots_store_42 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_43 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateForInOrOfStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier, list, expr, block);
            }
        }
        const __gotots_store_44 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_10 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "Transformer"));
        const __gotots_store_45 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_23 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_10, __gotots_argument_23);
    }
    static $go$private$estransforms$visitFunctionDeclaration(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_33 = ch;
                    const __gotots_store_112 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                            FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
                    const __gotots_argument_93 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_33, __gotots_argument_93);
                    const __gotots_receiver_34 = ch;
                    const __gotots_argument_94 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_34, __gotots_argument_94);
                    };
                    const __gotots_store_113 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_114 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "NodeFactory");
                    const __gotots_argument_96 = node;
                    const __gotots_store_115 = FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
                    const __gotots_argument_97 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
                    const __gotots_argument_98 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                        (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                            FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
                    const __gotots_store_116 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_99 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "Transformer")), FunctionDeclaration__from_ast.Name(node));
                    const __gotots_argument_100 = void 0;
                    const __gotots_store_117 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_101 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                            FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters);
                    const __gotots_argument_102 = void 0;
                    const __gotots_argument_103 = void 0;
                    const __gotots_receiver_35 = ch;
                    const __gotots_store_118 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                            FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
                    const __gotots_argument_95 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_104 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_35, __gotots_argument_95);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_36, __gotots_argument_96, __gotots_argument_97, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102, __gotots_argument_103, __gotots_argument_104);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitFunctionExpression(ch: objectRestSpreadTransformer | undefined, node: {
        value: FunctionExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_39 = ch;
                    const __gotots_store_125 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_114 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_39, __gotots_argument_114);
                    const __gotots_receiver_40 = ch;
                    const __gotots_argument_115 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_40, __gotots_argument_115);
                    };
                    const __gotots_store_126 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_127 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "NodeFactory");
                    const __gotots_argument_117 = node;
                    const __gotots_store_128 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_118 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "ModifiersBase"));
                    const __gotots_argument_119 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
                    const __gotots_store_129 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_120 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "Transformer")), FunctionExpression__from_ast.Name(node));
                    const __gotots_argument_121 = void 0;
                    const __gotots_store_130 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_122 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_123 = void 0;
                    const __gotots_argument_124 = void 0;
                    const __gotots_receiver_41 = ch;
                    const __gotots_store_131 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_116 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_125 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_41, __gotots_argument_116);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateFunctionExpression(__gotots_receiver_42, __gotots_argument_117, __gotots_argument_118, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitGetAccessorDeclaration(ch: objectRestSpreadTransformer | undefined, node: {
        value: GetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_24 = ch;
                    const __gotots_store_91 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
                    const __gotots_argument_61 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_24, __gotots_argument_61);
                    const __gotots_receiver_25 = ch;
                    const __gotots_argument_62 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_25, __gotots_argument_62);
                    };
                    const __gotots_store_92 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_93 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeFactory");
                    const __gotots_argument_64 = node;
                    const __gotots_store_94: GetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
                    const __gotots_argument_65 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NamedMemberBase"));
                    const __gotots_store_95 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_66 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "Transformer")), GetAccessorDeclaration__from_ast.Name(node));
                    const __gotots_argument_67 = void 0;
                    const __gotots_store_96 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_68 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_69 = void 0;
                    const __gotots_argument_70 = void 0;
                    const __gotots_receiver_26 = ch;
                    const __gotots_store_97 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
                    const __gotots_argument_63 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_71 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_26, __gotots_argument_63);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_27, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitMethodDeclaration(ch: objectRestSpreadTransformer | undefined, node: {
        value: MethodDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_30 = ch;
                    const __gotots_store_105 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_81 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_30, __gotots_argument_81);
                    const __gotots_receiver_31 = ch;
                    const __gotots_argument_82 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_31, __gotots_argument_82);
                    };
                    const __gotots_store_106 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_107 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "NodeFactory");
                    const __gotots_argument_84 = node;
                    const __gotots_store_108 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_85 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "NamedMemberBase"));
                    const __gotots_argument_86 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
                    const __gotots_store_109 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_87 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "Transformer")), MethodDeclaration__from_ast.Name(node));
                    const __gotots_argument_88 = NamedMemberBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                    const __gotots_argument_89 = void 0;
                    const __gotots_store_110 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_90 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_91 = void 0;
                    const __gotots_argument_92 = void 0;
                    const __gotots_receiver_32 = ch;
                    const __gotots_store_111 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_83 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_93 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_32, __gotots_argument_83);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_33, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitObjectLiteralExpression(ch: objectRestSpreadTransformer | undefined, node: {
        value: ObjectLiteralExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_8 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_binary_operand_0 = NodeDefault__from_ast.SubtreeFacts(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_binary_operand_1 = SubtreeContainsObjectRestOrSpread$constant__from_ast();
        if (((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0) === 0) {
            const __gotots_store_9 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_4 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Transformer"));
            const __gotots_store_10 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_5 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_4, __gotots_argument_5);
        }
        let objects = objectRestSpreadTransformer.$go$private$estransforms$chunkObjectLiteralElements(ch, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties);
        if (objects.length > 0 && !(Node__from_ast.$storageOf(((objects.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast())) {
            const __gotots_store_11 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_12 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory");
            const __gotots_store_13 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_14 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_6 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_7 = false;
            const __gotots_slice_element_0 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_5, __gotots_argument_6, __gotots_argument_7);
            const __gotots_argument_8 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            const __gotots_argument_9 = objects;
            objects = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_8, __gotots_argument_9, void 0);
        }
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = objects.get(0);
        if (objects.length > 1) {
            const __gotots_range_0 = objects;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_index_0;
                const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
                let i = __gotots_range_value_0;
                let obj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                if (i === 0) {
                    continue;
                }
                const __gotots_store_15 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewAssignHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer")), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression, obj]), CompilerOptions__from_core.GetEmitScriptTarget((ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions));
            }
            return expression;
        }
        const __gotots_store_16 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewAssignHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")), objects, CompilerOptions__from_core.GetEmitScriptTarget((ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions));
    }
    static $go$private$estransforms$visitParameter(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread.isNil()) {
            {
                const __gotots_map_0 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parametersWithPrecedingObjectRestOrSpread;
                const __gotots_store_72 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
                const __gotots_map_1 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_results_0 = __gotots_map_0.lookupOk(__gotots_map_1);
                let ok = __gotots_results_0[1];
                if (ok) {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ParameterDeclaration__from_ast.Name(node);
                    if (IsBindingPattern__from_ast(name)) {
                        const __gotots_store_73 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_17 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "Transformer"));
                        const __gotots_store_74 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
                        const __gotots_argument_42 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        name = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_17, __gotots_argument_42);
                    }
                    const __gotots_store_75 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_76 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.UpdateParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeFactory"), node, void 0, ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, name, void 0, void 0, void 0);
                }
            }
        }
        const __gotots_store_77 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_binary_operand_2 = NodeDefault__from_ast.SubtreeFacts(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_binary_operand_3 = SubtreeContainsObjectRestOrSpread$constant__from_ast();
        if (!((__gotots_binary_operand_2 & __gotots_binary_operand_3) >>> 0 === 0)) {
            const __gotots_store_78 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_79 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NodeFactory");
            const __gotots_argument_44 = node;
            const __gotots_argument_45 = void 0;
            const __gotots_argument_46 = ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
            const __gotots_store_80 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_18 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer"));
            const __gotots_store_81 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_43 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_47 = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_18, __gotots_argument_43);
            const __gotots_argument_48 = void 0;
            const __gotots_argument_49 = void 0;
            const __gotots_store_82 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_50 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "Transformer")), ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
            return NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_19, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
        }
        const __gotots_store_83 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_20 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "Transformer"));
        const __gotots_store_84 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_51 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_20, __gotots_argument_51);
    }
    static $go$private$estransforms$visitSetAccessorDeclaration(ch: objectRestSpreadTransformer | undefined, node: {
        value: SetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_27 = ch;
                    const __gotots_store_98 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
                    const __gotots_argument_71 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let old: oldParamScope = objectRestSpreadTransformer.$go$private$estransforms$enterParameterListContext(__gotots_receiver_27, __gotots_argument_71);
                    const __gotots_receiver_28 = ch;
                    const __gotots_argument_72 = old;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        objectRestSpreadTransformer.$go$private$estransforms$exitParameterListContext(__gotots_receiver_28, __gotots_argument_72);
                    };
                    const __gotots_store_99 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_100 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory");
                    const __gotots_argument_74 = node;
                    const __gotots_store_101: SetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
                    const __gotots_argument_75 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NamedMemberBase"));
                    const __gotots_store_102 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_76 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "Transformer")), SetAccessorDeclaration__from_ast.Name(node));
                    const __gotots_argument_77 = void 0;
                    const __gotots_store_103 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_78 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "Transformer")), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                    const __gotots_argument_79 = void 0;
                    const __gotots_argument_80 = void 0;
                    const __gotots_receiver_29 = ch;
                    const __gotots_store_104 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
                    const __gotots_argument_73 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_81 = objectRestSpreadTransformer.$go$private$estransforms$transformFunctionBody(__gotots_receiver_29, __gotots_argument_73);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_30, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$estransforms$visitSourceFile(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_2 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer"));
        const __gotots_store_5 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_2);
        const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer"));
        const __gotots_argument_3 = (void Node__from_ast.AsNode,
            visited);
        const __gotots_store_7 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_4 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer")));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
        return visited;
    }
    static $go$private$estransforms$visitVariableDeclaration(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement) {
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement = false;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = objectRestSpreadTransformer.$go$private$estransforms$visitVariableDeclarationWorker(ch, node, true);
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement = true;
            return result;
        }
        return objectRestSpreadTransformer.$go$private$estransforms$visitVariableDeclarationWorker(ch, node, false);
    }
    static $go$private$estransforms$visitVariableDeclarationWorker(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined, exported: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_0 = IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(node));
        if (__gotots_logical_result_0) {
            const __gotots_store_145 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
            const __gotots_binary_operand_4 = NodeDefault__from_ast.SubtreeFacts(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_binary_operand_5 = SubtreeContainsObjectRestOrSpread$constant__from_ast();
            __gotots_logical_result_0 = !((__gotots_binary_operand_4 & __gotots_binary_operand_5) >>> 0 === 0);
        }
        if (__gotots_logical_result_0) {
            const __gotots_store_146 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_140 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "Transformer");
            const __gotots_store_147 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_141 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_142 = void 0;
            const __gotots_argument_143 = FlattenLevelObjectRest$constant__from_transformers();
            const __gotots_argument_144 = exported;
            const __gotots_argument_145 = false;
            return FlattenDestructuringBinding__from_transformers(__gotots_argument_140, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145);
        }
        const __gotots_store_148 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_45 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "Transformer"));
        const __gotots_store_149 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_146 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_45, __gotots_argument_146);
    }
    static $go$private$estransforms$visitVariableStatement(ch: objectRestSpreadTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_46 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_24 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_25 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_24, __gotots_argument_25)) {
            let oldInExportedVariableStatement = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement;
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement = true;
            const __gotots_store_47 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_11 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Transformer"));
            const __gotots_store_48 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_26 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_11, __gotots_argument_26);
            (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inExportedVariableStatement = oldInExportedVariableStatement;
            return result;
        }
        const __gotots_store_49 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_12 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "Transformer"));
        const __gotots_store_50 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_27 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_12, __gotots_argument_27);
    }
}
export class oldParamScope {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>) {
    }
    declare private readonly then?: never;
}
export function newObjectRestSpreadTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: objectRestSpreadTransformer | undefined = new objectRestSpreadTransformer(Transformer__from_transformers.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, false, false, GoMap.nil());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return objectRestSpreadTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
