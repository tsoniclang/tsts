import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ComputedPropertyName as ComputedPropertyName__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, PropertyDeclaration as PropertyDeclaration__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ScriptTarget as ScriptTarget__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BodyBase as BodyBase__from_ast, CanHaveDecorators as CanHaveDecorators__from_ast, ChildIsDecorated as ChildIsDecorated__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ClassOrConstructorParameterIsDecorated as ClassOrConstructorParameterIsDecorated__from_ast, ExpressionBase as ExpressionBase__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAllAccessorDeclarations as GetAllAccessorDeclarations__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, HasAccessorModifier as HasAccessorModifier__from_ast, HasDecorators as HasDecorators__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, Identifier as Identifier__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsDecorator as IsDecorator__from_ast, IsIdentifier as IsIdentifier__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsStatic as IsStatic__from_ast, IsThisParameter as IsThisParameter__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeOrChildIsDecorated as NodeOrChildIsDecorated__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, SkipPartiallyEmittedExpressions as SkipPartiallyEmittedExpressions__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsDecorators$constant as SubtreeContainsDecorators$constant__from_ast, SubtreeContainsPrivateIdentifierInExpression$constant as SubtreeContainsPrivateIdentifierInExpression$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, Visitor as Visitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { MultiMap as MultiMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ScriptTargetES2022$constant as ScriptTargetES2022$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssignedNameOptions as AssignedNameOptions__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFNoTrailingSourceMap$constant as EFNoTrailingSourceMap$constant__from_printer, EmitContext as EmitContext__from_printer, NameOptions as NameOptions__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsSimpleInlineableExpression as IsSimpleInlineableExpression__from_transformers, MoveRangePastModifiers as MoveRangePastModifiers__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { GroupBy$bool$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/GroupBy.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Some$PointerTo_Named_ast$Node, Some$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class LegacyDecoratorsTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public languageVersion: ScriptTarget__from_core, public referenceResolver: ReferenceResolver__from_binder | undefined, public classAliases: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public enclosingClasses: RuntimeSlice<{
        value: ClassDeclaration__from_ast;
    } | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$tstransforms$finishClassElement(tx: LegacyDecoratorsTransformer | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!tsonicTypeScriptRuntime.sameLocation(updated, original)) {
            const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_145.Transformer), updated, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_146.Transformer), updated, MoveRangePastModifiers__from_transformers(original));
        }
        return updated;
    }
    static $go$private$tstransforms$generateClassElementDecorationExpression(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let allDecorators__shadow_1: allDecorators | undefined = getAllDecoratorsOfClassElement(member, node, true);
        let decoratorExpressions = LegacyDecoratorsTransformer.$go$private$tstransforms$transformAllDecoratorsOfDeclaration(tx, allDecorators__shadow_1);
        if (decoratorExpressions.length === 0) {
            return void 0;
        }
        let prefix: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LegacyDecoratorsTransformer.$go$private$tstransforms$getClassMemberPrefix(tx, node, member);
        let memberName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LegacyDecoratorsTransformer.$go$private$tstransforms$getExpressionForPropertyName(tx, member, (Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0);
        let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsPropertyDeclaration__from_ast(member) && !HasAccessorModifier__from_ast(member)) {
            const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            descriptor = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_182.Transformer));
        }
        else {
            const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_184 = (Transformer__from_transformers.Factory(__gotots_store_183.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            descriptor = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "NodeFactory"), KindNullKeyword$constant__from_ast());
        }
        const __gotots_store_185 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let helper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewDecorateHelper(Transformer__from_transformers.Factory(__gotots_store_185.Transformer), decoratorExpressions, prefix, memberName, descriptor);
        const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_186.Transformer), helper, EFNoComments$constant__from_printer());
        const __gotots_store_187 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_187.Transformer), helper, MoveRangePastModifiers__from_transformers(member));
        return helper;
    }
    static $go$private$tstransforms$generateClassElementDecorationExpressions(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let members = getDecoratedClassElements(node, isStatic);
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_5 = members;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LegacyDecoratorsTransformer.$go$private$tstransforms$generateClassElementDecorationExpression(tx, node, member);
            if (!(expr === undefined)) {
                expressions = expressions.append(void 0, [expr]);
            }
        }
        return expressions;
    }
    static $go$private$tstransforms$generateConstructorDecorationExpression(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let allDecorators__shadow_1: allDecorators | undefined = getAllDecoratorsOfClass(node, true);
        let hasAlias = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.length > 0 &&
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.get((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.length - 1)
                ===
                    node;
        if (hasAlias) {
            LegacyDecoratorsTransformer.$go$private$tstransforms$popEnclosingClass(tx);
        }
        let decoratorExpressions = LegacyDecoratorsTransformer.$go$private$tstransforms$transformAllDecoratorsOfDeclaration(tx, allDecorators__shadow_1);
        if (hasAlias) {
            LegacyDecoratorsTransformer.$go$private$tstransforms$pushEnclosingClass(tx, node);
        }
        if (decoratorExpressions.length === 0) {
            return void 0;
        }
        let classAlias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases.isNil()) {
            const __gotots_map_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
            const __gotots_store_170 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_map_5 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_170, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_results_3 = __gotots_map_4.lookupOk(__gotots_map_5);
            classAlias = __gotots_results_3[0];
        }
        const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_49 = Transformer__from_transformers.Factory(__gotots_store_171.Transformer);
        const __gotots_store_172 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_139 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_172, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_140 = new NameOptions__from_printer(false, true);
        let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetDeclarationNameEx(__gotots_receiver_49, __gotots_argument_139, __gotots_argument_140);
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let decorate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewDecorateHelper(Transformer__from_transformers.Factory(__gotots_store_173.Transformer), decoratorExpressions, localName, void 0, void 0);
        let assignmentTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = decorate;
        if (!(classAlias === undefined)) {
            const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            assignmentTarget = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_174.Transformer), classAlias, decorate);
        }
        const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_175.Transformer), localName, assignmentTarget);
        const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_176.Transformer), expression, EFNoComments$constant__from_printer());
        const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_50 = Transformer__from_transformers.EmitContext(__gotots_store_177.Transformer);
        const __gotots_argument_142 = expression;
        const __gotots_store_178 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_141 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_178, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_143 = MoveRangePastModifiers__from_transformers(__gotots_argument_141);
        EmitContext__from_printer.SetSourceMapRange(__gotots_receiver_50, __gotots_argument_142, __gotots_argument_143);
        return expression;
    }
    static $go$private$tstransforms$getClassAliasIfNeeded(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!LegacyDecoratorsTransformer.$go$private$tstransforms$hasInternalStaticReference(tx, node)) {
            return void 0;
        }
        let nameText = "default";
        let __gotots_logical_result_4 = !(ClassDeclaration__from_ast.Name(node) === undefined);
        if (__gotots_logical_result_4) {
            const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_123 = Transformer__from_transformers.EmitContext(__gotots_store_148.Transformer);
            const __gotots_argument_124 = ClassDeclaration__from_ast.Name(node);
            __gotots_logical_result_4 = !IsGeneratedIdentifier__from_transformers(__gotots_argument_123, __gotots_argument_124);
        }
        if (__gotots_logical_result_4) {
            nameText = Node__from_ast.Text(ClassDeclaration__from_ast.Name(node));
        }
        const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let classAlias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName(Transformer__from_transformers.Factory(__gotots_store_149.Transformer), nameText);
        const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_150.Transformer), classAlias);
        const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
        const __gotots_store_151 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        __gotots_store_152.store(NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_151, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)), classAlias);
        return classAlias;
    }
    static $go$private$tstransforms$getClassElementDecorationStatements(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let exprs = LegacyDecoratorsTransformer.$go$private$tstransforms$generateClassElementDecorationExpressions(tx, node, isStatic);
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_4 = exprs;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            const __gotots_argument_137 = statements;
            const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_169 = (Transformer__from_transformers.Factory(__gotots_store_168.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_138 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory"), e);
            statements = __gotots_argument_137.append(void 0, [__gotots_argument_138]);
        }
        return statements;
    }
    static $go$private$tstransforms$getClassMemberPrefix(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsStatic__from_ast(member)) {
            const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_53 = Transformer__from_transformers.Factory(__gotots_store_194.Transformer);
            const __gotots_store_195 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_158 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_195, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_53, __gotots_argument_158);
        }
        return LegacyDecoratorsTransformer.$go$private$tstransforms$getClassPrototype(tx, node);
    }
    static $go$private$tstransforms$getClassPrototype(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_203 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_204 = (Transformer__from_transformers.Factory(__gotots_store_203.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "NodeFactory");
        const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_54 = Transformer__from_transformers.Factory(__gotots_store_205.Transformer);
        const __gotots_store_206 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_159 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_206, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_160 = NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_54, __gotots_argument_159);
        const __gotots_argument_161 = void 0;
        const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_208 = (Transformer__from_transformers.Factory(__gotots_store_207.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_162 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory"), "prototype");
        const __gotots_argument_163 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_55, __gotots_argument_160, __gotots_argument_161, __gotots_argument_162, __gotots_argument_163);
    }
    static $go$private$tstransforms$getConstructorDecorationStatement(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LegacyDecoratorsTransformer.$go$private$tstransforms$generateConstructorDecorationExpression(tx, node);
        if (!(expression === undefined)) {
            const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_162 = (Transformer__from_transformers.Factory(__gotots_store_161.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), expression);
            const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_46 = Transformer__from_transformers.EmitContext(__gotots_store_163.Transformer);
            const __gotots_argument_132 = result;
            const __gotots_store_164 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_133 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_164, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_46, __gotots_argument_132, __gotots_argument_133);
            return result;
        }
        return void 0;
    }
    static $go$private$tstransforms$getExpressionForPropertyName(tx: LegacyDecoratorsTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, generateNameForComputedPropertyName: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(member);
        if (IsPrivateIdentifier__from_ast(name)) {
            const __gotots_store_196 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_197 = (Transformer__from_transformers.Factory(__gotots_store_196.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory"), "");
        }
        else if (IsComputedPropertyName__from_ast(name)) {
            if (generateNameForComputedPropertyName && !IsSimpleInlineableExpression__from_transformers((Node__from_ast.AsComputedPropertyName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
                const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_198.Transformer), name);
            }
            return (Node__from_ast.AsComputedPropertyName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        }
        else if (IsIdentifier__from_ast(name)) {
            const __gotots_store_199 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_200 = (Transformer__from_transformers.Factory(__gotots_store_199.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "NodeFactory"), Node__from_ast.Text(name), TokenFlagsNone$constant__from_ast());
        }
        else {
            const __gotots_store_201 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_202 = (Transformer__from_transformers.Factory(__gotots_store_201.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.DeepCloneNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "NodeFactory"), name);
        }
    }
    static $go$private$tstransforms$hasInternalStaticReference(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): bool {
        const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_47 = Transformer__from_transformers.EmitContext(__gotots_store_165.Transformer);
        const __gotots_store_166 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_134 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_166, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let classNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(__gotots_receiver_47, __gotots_argument_134);
        let isOrContainsStaticSelfReference: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined;
        isOrContainsStaticSelfReference = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let __gotots_logical_result_5 = IsIdentifier__from_ast(n);
            if (__gotots_logical_result_5) {
                const __gotots_receiver_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referenceResolver;
                const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_135 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_167.Transformer), n);
                __gotots_logical_result_5 =
                    tsonicTypeScriptRuntime.sameLocation(goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_48).GetReferencedValueDeclaration(__gotots_argument_135), classNode);
            }
            if (__gotots_logical_result_5) {
                return true;
            }
            if (IsPropertyAccessExpression__from_ast(n)) {
                const __gotots_callee_0 = isOrContainsStaticSelfReference;
                const __gotots_argument_136 = Node__from_ast.Expression(n);
                return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_136);
            }
            return Node__from_ast.ForEachChild(n, new Visitor__from_ast(isOrContainsStaticSelfReference));
        };
        const __gotots_range_2 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            if (Node__from_ast.ForEachChild(member, new Visitor__from_ast(isOrContainsStaticSelfReference))) {
                return true;
            }
        }
        return false;
    }
    static $go$private$tstransforms$isSyntheticMetadataDecorator(tx: LegacyDecoratorsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return EmitContext__from_printer.IsCallToHelper(Transformer__from_transformers.EmitContext(__gotots_store_188.Transformer), Node__from_ast.Expression(node), "__metadata");
    }
    static $go$private$tstransforms$popEnclosingClass(tx: LegacyDecoratorsTransformer | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.slice(0, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.length - 1, null);
    }
    static $go$private$tstransforms$pushEnclosingClass(tx: LegacyDecoratorsTransformer | undefined, cls: {
        value: ClassDeclaration__from_ast;
    } | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.append(void 0, [cls]);
    }
    static $go$private$tstransforms$transformAllDecoratorsOfDeclaration(tx: LegacyDecoratorsTransformer | undefined, allDecorators__shadow_1: allDecorators | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (allDecorators__shadow_1 === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        const __gotots_argument_146 = (allDecorators__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).decorators;
        const __gotots_receiver_51 = tx;
        const __gotots_argument_147 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return LegacyDecoratorsTransformer.$go$private$tstransforms$isSyntheticMetadataDecorator(__gotots_receiver_51, $argument0);
        };
        let mm: MultiMap__from_collections<bool, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined = GroupBy$bool$PointerTo_Named_ast$Node(__gotots_argument_146, __gotots_argument_147);
        let metadata = MultiMap__from_collections.Get<bool, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(mm, true);
        let decorators = MultiMap__from_collections.Get<bool, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(mm, false);
        let decoratorExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        decoratorExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(decoratorExpressions, LegacyDecoratorsTransformer.$go$private$tstransforms$transformDecorators(tx, decorators), void 0);
        decoratorExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(decoratorExpressions, LegacyDecoratorsTransformer.$go$private$tstransforms$transformDecoratorsOfParameters(tx, (allDecorators__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parameters), void 0);
        decoratorExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(decoratorExpressions, LegacyDecoratorsTransformer.$go$private$tstransforms$transformDecorators(tx, metadata), void 0);
        return decoratorExpressions;
    }
    static $go$private$tstransforms$transformClassDeclarationWithClassDecorators(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_75 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_88 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_75, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_89 = ModifierFlagsExport$constant__from_ast();
                    let isExport = HasSyntacticModifier__from_ast(__gotots_argument_88, __gotots_argument_89);
                    const __gotots_store_76 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_90 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_76, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_91 = ModifierFlagsDefault$constant__from_ast();
                    let isDefault = HasSyntacticModifier__from_ast(__gotots_argument_90, __gotots_argument_91);
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                    const __gotots_store_77: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                    let __gotots_logical_result_2 = !(ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "ModifiersBase")) === undefined);
                    if (__gotots_logical_result_2) {
                        const __gotots_store_78: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                        const __gotots_binary_operand_0 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                            ModifierList__from_ast.$storageOf(((ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "ModifiersBase")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length;
                        const __gotots_binary_operand_1 = 0;
                        __gotots_logical_result_2 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
                    }
                    if (__gotots_logical_result_2) {
                        const __gotots_store_79: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                        const __gotots_argument_92 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                            ModifierList__from_ast.$storageOf(((ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "ModifiersBase")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
                        const __gotots_argument_93 = isNotExportOrDefaultOrDecorator;
                        let modifierNodes = Filter$PointerTo_Named_ast$Node(__gotots_argument_92, __gotots_argument_93);
                        const __gotots_binary_operand_2 = modifierNodes.length;
                        const __gotots_store_80: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                        const __gotots_binary_operand_3 = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                            ModifierList__from_ast.$storageOf(((ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "ModifiersBase")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length;
                        if (__gotots_binary_operand_2 !== __gotots_binary_operand_3) {
                            const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_82 = (Transformer__from_transformers.Factory(__gotots_store_81.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            modifiers = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "NodeFactory"), modifierNodes);
                            const __gotots_store_83: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                            (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                                ModifierList__from_ast.$storageOf(((ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "ModifiersBase")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
                        }
                        else {
                            const __gotots_store_84: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                            modifiers = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "ModifiersBase"));
                        }
                    }
                    const __gotots_store_85 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_94 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_85, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let location = MoveRangePastModifiers__from_transformers(__gotots_argument_94);
                    let classAlias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LegacyDecoratorsTransformer.$go$private$tstransforms$getClassAliasIfNeeded(tx, node);
                    if (!(classAlias === undefined)) {
                        LegacyDecoratorsTransformer.$go$private$tstransforms$pushEnclosingClass(tx, node);
                        const __gotots_receiver_28 = tx;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            LegacyDecoratorsTransformer.$go$private$tstransforms$popEnclosingClass(__gotots_receiver_28);
                        });
                    }
                    const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_29 = Transformer__from_transformers.Factory(__gotots_store_86.Transformer);
                    const __gotots_store_87 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_95 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_87, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_96 = new AssignedNameOptions__from_printer(false, true, false);
                    let declName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(__gotots_receiver_29, __gotots_argument_95, __gotots_argument_96);
                    const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_88.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                    const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_89.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                    const __gotots_results_1 = LegacyDecoratorsTransformer.$go$private$tstransforms$transformDecoratorsOfClassElements(tx, node, members);
                    members = __gotots_results_1[0];
                    let decorationStatements = __gotots_results_1[1];
                    let assignClassAliasInStaticBlock = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).languageVersion >= ScriptTargetES2022$constant__from_core() && !(classAlias === undefined) && !(members === undefined) && NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0 && Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, isClassStaticBlockDeclarationOrStaticProperty);
                    if (assignClassAliasInStaticBlock) {
                        let memberList = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
                        const __gotots_argument_105 = memberList;
                        const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_91 = (Transformer__from_transformers.Factory(__gotots_store_90.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "NodeFactory");
                        const __gotots_argument_103 = void 0;
                        const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_93 = (Transformer__from_transformers.Factory(__gotots_store_92.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeFactory");
                        const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_95 = (Transformer__from_transformers.Factory(__gotots_store_94.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeFactory");
                        const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_97 = (Transformer__from_transformers.Factory(__gotots_store_96.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeFactory");
                        const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_30 = Transformer__from_transformers.Factory(__gotots_store_98.Transformer);
                        const __gotots_argument_97 = classAlias;
                        const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_100 = (Transformer__from_transformers.Factory(__gotots_store_99.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_98 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory"), KindThisKeyword$constant__from_ast());
                        const __gotots_argument_99 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_30, __gotots_argument_97, __gotots_argument_98);
                        const __gotots_slice_element_0 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_31, __gotots_argument_99);
                        const __gotots_argument_100 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
                        const __gotots_argument_101 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_32, __gotots_argument_100);
                        const __gotots_argument_102 = false;
                        const __gotots_argument_104 = NodeFactory__from_ast.NewBlock(__gotots_receiver_33, __gotots_argument_101, __gotots_argument_102);
                        const __gotots_argument_106 = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_34, __gotots_argument_103, __gotots_argument_104);
                        memberList = __gotots_argument_105.append(void 0, [__gotots_argument_106]);
                        memberList = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(memberList, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_102 = (Transformer__from_transformers.Factory(__gotots_store_101.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        let newList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeFactory"), memberList);
                        NodeList__from_ast.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                        members = newList;
                    }
                    let exprName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = name;
                    let __gotots_logical_result_3 = !(name === undefined);
                    if (__gotots_logical_result_3) {
                        const __gotots_store_103 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_107 = Transformer__from_transformers.EmitContext(__gotots_store_103.Transformer);
                        const __gotots_argument_108 = name;
                        __gotots_logical_result_3 = IsGeneratedIdentifier__from_transformers(__gotots_argument_107, __gotots_argument_108);
                    }
                    if (__gotots_logical_result_3) {
                        exprName = void 0;
                    }
                    const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let classExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory"), modifiers, exprName, void 0, heritageClauses, members);
                    const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_35 = Transformer__from_transformers.EmitContext(__gotots_store_106.Transformer);
                    const __gotots_argument_109 = classExpression;
                    const __gotots_store_107 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_110 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_107, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_35, __gotots_argument_109, __gotots_argument_110);
                    Node__from_ast.$storageOf(((classExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
                    let varInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classExpression;
                    if (!(classAlias === undefined) && !assignClassAliasInStaticBlock) {
                        const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        varInitializer = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_108.Transformer), classAlias, classExpression);
                    }
                    const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_110 = (Transformer__from_transformers.Factory(__gotots_store_109.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "NodeFactory"), declName, void 0, void 0, varInitializer);
                    const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_36 = Transformer__from_transformers.EmitContext(__gotots_store_111.Transformer);
                    const __gotots_argument_111 = varDecl;
                    const __gotots_store_112 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_112 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_112, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_36, __gotots_argument_111, __gotots_argument_112);
                    const __gotots_store_113 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_114 = (Transformer__from_transformers.Factory(__gotots_store_113.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "NodeFactory");
                    const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_116 = (Transformer__from_transformers.Factory(__gotots_store_115.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_113 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
                    const __gotots_argument_114 = NodeFlagsLet$constant__from_ast();
                    let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_37, __gotots_argument_113, __gotots_argument_114);
                    const __gotots_store_117 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_118 = (Transformer__from_transformers.Factory(__gotots_store_117.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeFactory"), void 0, varDeclList);
                    const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_38 = Transformer__from_transformers.EmitContext(__gotots_store_119.Transformer);
                    const __gotots_argument_115 = varStatement;
                    const __gotots_store_120 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_116 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_120, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_38, __gotots_argument_115, __gotots_argument_116);
                    Node__from_ast.$storageOf(((varStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
                    const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_121.Transformer), varStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
                    let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varStatement]);
                    statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, decorationStatements, void 0);
                    statements = statements.append(void 0, [LegacyDecoratorsTransformer.$go$private$tstransforms$getConstructorDecorationStatement(tx, node)]);
                    if (isExport) {
                        let exportStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (isDefault) {
                            const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            exportStatement = NodeFactory__from_printer.NewExportDefault(Transformer__from_transformers.Factory(__gotots_store_122.Transformer), declName);
                        }
                        else {
                            const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_40 = Transformer__from_transformers.Factory(__gotots_store_123.Transformer);
                            const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_39 = Transformer__from_transformers.Factory(__gotots_store_124.Transformer);
                            const __gotots_store_125 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                            const __gotots_argument_117 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_125, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                            const __gotots_argument_118 = NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_39, __gotots_argument_117);
                            exportStatement = NodeFactory__from_printer.NewExternalModuleExport(__gotots_receiver_40, __gotots_argument_118);
                        }
                        statements = statements.append(void 0, [exportStatement]);
                    }
                    if (statements.length === 1) {
                        __gotots_return_0 = statements.get(0);
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_127 = (Transformer__from_transformers.Factory(__gotots_store_126.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_0 = NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "NodeFactory"), statements);
                    break __gotots_return_block_0;
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
        return __gotots_return_0;
    }
    static $go$private$tstransforms$transformClassDeclarationWithoutClassDecorators(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_40 = Transformer__from_transformers.Visitor(__gotots_store_128.Transformer);
        const __gotots_store_129: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_119 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_40, __gotots_argument_119);
        const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_130.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let initialMembers: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_131.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        const __gotots_results_2 = LegacyDecoratorsTransformer.$go$private$tstransforms$transformDecoratorsOfClassElements(tx, node, initialMembers);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_2[0];
        let decorationStatements = __gotots_results_2[1];
        if (name === undefined && decorationStatements.length > 0) {
            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_41 = Transformer__from_transformers.Factory(__gotots_store_132.Transformer);
            const __gotots_store_133 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_120 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_133, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            name = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_41, __gotots_argument_120);
        }
        const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_135 = (Transformer__from_transformers.Factory(__gotots_store_134.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory"), node, modifiers, name, void 0, heritageClauses, members);
        if (decorationStatements.length === 0) {
            return updated;
        }
        const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_137 = (Transformer__from_transformers.Factory(__gotots_store_136.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "NodeFactory"), goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updated]), decorationStatements, void 0));
    }
    static $go$private$tstransforms$transformDecorators(tx: LegacyDecoratorsTransformer | undefined, decorators: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_7 = decorators;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            const __gotots_argument_149 = results;
            const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_150 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_189.Transformer), Node__from_ast.Expression(d));
            results = __gotots_argument_149.append(void 0, [__gotots_argument_150]);
        }
        return results;
    }
    static $go$private$tstransforms$transformDecoratorsOfClassElements(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined, members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
    ] {
        let decorationStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        decorationStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(decorationStatements, LegacyDecoratorsTransformer.$go$private$tstransforms$getClassElementDecorationStatements(tx, node, false), void 0);
        decorationStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(decorationStatements, LegacyDecoratorsTransformer.$go$private$tstransforms$getClassElementDecorationStatements(tx, node, true), void 0);
        if (hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node)) {
            let memberNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (!(members === undefined) && NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                memberNodes = NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            }
            const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_154 = (Transformer__from_transformers.Factory(__gotots_store_153.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory");
            const __gotots_argument_129 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]), memberNodes, void 0);
            const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_156 = (Transformer__from_transformers.Factory(__gotots_store_155.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
            const __gotots_argument_127 = void 0;
            const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_158 = (Transformer__from_transformers.Factory(__gotots_store_157.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory");
            const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_160 = (Transformer__from_transformers.Factory(__gotots_store_159.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_125 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory"), decorationStatements);
            const __gotots_argument_126 = true;
            const __gotots_argument_128 = NodeFactory__from_ast.NewBlock(__gotots_receiver_43, __gotots_argument_125, __gotots_argument_126);
            const __gotots_argument_130 = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_44, __gotots_argument_127, __gotots_argument_128);
            const __gotots_argument_131 = __gotots_argument_129.append(void 0, [__gotots_argument_130]);
            members = NodeFactory__from_ast.NewNodeList(__gotots_receiver_45, __gotots_argument_131);
            decorationStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        return [members, decorationStatements];
    }
    static $go$private$tstransforms$transformDecoratorsOfParameters(tx: LegacyDecoratorsTransformer | undefined, parameters: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_8 = parameters;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_8 = __gotots_range_index_8;
            const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
            let i = __gotots_range_value_8;
            let decorators = __gotots_range_value_9;
            if (decorators.length > 0) {
                const __gotots_range_9 = decorators;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
                    const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_9);
                    let decorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                    const __gotots_store_190 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_52 = Transformer__from_transformers.Factory(__gotots_store_190.Transformer);
                    const __gotots_store_191 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_151 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_191.Transformer), Node__from_ast.Expression(decorator));
                    const __gotots_argument_152 = i;
                    const __gotots_argument_153 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(decorator) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
                    let helper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewParamHelper(__gotots_receiver_52, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153);
                    const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_192.Transformer), helper, EFNoComments$constant__from_printer());
                    results = results.append(void 0, [helper]);
                }
            }
        }
        return results;
    }
    static $go$private$tstransforms$visit(tx: LegacyDecoratorsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((Node__from_ast.SubtreeFacts(node) & SubtreeContainsDecorators$constant__from_ast()) >>> 0) === 0 && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses.length === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitIdentifier(tx, Node__from_ast.AsIdentifier(node));
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyAccessExpression(tx, Node__from_ast.AsPropertyAccessExpression(node));
                break;
            }
            case KindDecorator$constant__from_ast(): {
                return void 0;
                break;
            }
            case KindClassDeclaration$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitClassExpression(tx, Node__from_ast.AsClassExpression(node));
                break;
            }
            case KindConstructor$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitConstructorDeclaration(tx, Node__from_ast.AsConstructorDeclaration(node));
                break;
            }
            case KindMethodDeclaration$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitMethodDeclaration(tx, Node__from_ast.AsMethodDeclaration(node));
                break;
            }
            case KindSetAccessor$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitSetAccessorDeclaration(tx, Node__from_ast.AsSetAccessorDeclaration(node));
                break;
            }
            case KindGetAccessor$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitGetAccessorDeclaration(tx, Node__from_ast.AsGetAccessorDeclaration(node));
                break;
            }
            case KindPropertyDeclaration$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyDeclaration(tx, Node__from_ast.AsPropertyDeclaration(node));
                break;
            }
            case KindParameter$constant__from_ast(): {
                return LegacyDecoratorsTransformer.$go$private$tstransforms$visitParamerDeclaration(tx, Node__from_ast.AsParameterDeclaration(node));
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases = GoMap.make(0, []);
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses = RuntimeSlice.nil<{
                    value: ClassDeclaration__from_ast;
                } | undefined>();
                const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_2 = Transformer__from_transformers.EmitContext(__gotots_store_2.Transformer);
                const __gotots_argument_2 = result;
                const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_3 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_3.Transformer));
                EmitContext__from_printer.AddEmitHelper(__gotots_receiver_2, __gotots_argument_2, __gotots_argument_3);
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases = GoMap.nil();
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses = RuntimeSlice.nil<{
                    value: ClassDeclaration__from_ast;
                } | undefined>();
                return result;
                break;
            }
            default: {
                const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_4.Transformer), node);
                break;
            }
        }
    }
    static $go$private$tstransforms$visitClassDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_argument_7 = true;
        const __gotots_store_16 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_8 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_16, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let decorated = ClassOrConstructorParameterIsDecorated__from_ast(__gotots_argument_7, __gotots_argument_8);
        let __gotots_logical_result_1 = decorated;
        if (!__gotots_logical_result_1) {
            const __gotots_argument_9 = true;
            const __gotots_store_17 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_10 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_17, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_11 = void 0;
            __gotots_logical_result_1 = ChildIsDecorated__from_ast(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
        }
        if (!(__gotots_logical_result_1)) {
            const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_6 = Transformer__from_transformers.Visitor(__gotots_store_18.Transformer);
            const __gotots_store_19 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_12 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_19, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_6, __gotots_argument_12);
        }
        if (decorated) {
            return LegacyDecoratorsTransformer.$go$private$tstransforms$transformClassDeclarationWithClassDecorators(tx, node, ClassDeclaration__from_ast.Name(node));
        }
        return LegacyDecoratorsTransformer.$go$private$tstransforms$transformClassDeclarationWithoutClassDecorators(tx, node, ClassDeclaration__from_ast.Name(node));
    }
    static $go$private$tstransforms$visitClassExpression(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ClassExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_21 = (Transformer__from_transformers.Factory(__gotots_store_20.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
        const __gotots_argument_14 = node;
        const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_7 = Transformer__from_transformers.Visitor(__gotots_store_22.Transformer);
        const __gotots_store_23: ClassExpression__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_13 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "ModifiersBase"));
        const __gotots_argument_15 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_7, __gotots_argument_13);
        const __gotots_argument_16 = ClassExpression__from_ast.Name(node);
        const __gotots_argument_17 = void 0;
        const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_18 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_24.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_19 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_25.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        return NodeFactory__from_ast.UpdateClassExpression(__gotots_receiver_8, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
    }
    static $go$private$tstransforms$visitConstructorDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: ConstructorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_27 = (Transformer__from_transformers.Factory(__gotots_store_26.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory");
        const __gotots_argument_21 = node;
        const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_9 = Transformer__from_transformers.Visitor(__gotots_store_28.Transformer);
        const __gotots_store_29 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_20 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "ModifiersBase"));
        const __gotots_argument_22 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_9, __gotots_argument_20);
        const __gotots_argument_23 = void 0;
        const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_24 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_30.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_argument_25 = void 0;
        const __gotots_argument_26 = void 0;
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_27 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_31.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
        return NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_10, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
    }
    static $go$private$tstransforms$visitGetAccessorDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: GetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_22 = tx;
        const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_49 = (Transformer__from_transformers.Factory(__gotots_store_48.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory");
        const __gotots_argument_56 = node;
        const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_19 = Transformer__from_transformers.Visitor(__gotots_store_50.Transformer);
        const __gotots_store_51: GetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_54 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NamedMemberBase"));
        const __gotots_argument_57 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_19, __gotots_argument_54);
        const __gotots_receiver_20 = tx;
        const __gotots_store_52 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_55 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_52, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_58 = LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyNameOfClassElement(__gotots_receiver_20, __gotots_argument_55);
        const __gotots_argument_59 = void 0;
        const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_60 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_53.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_argument_61 = void 0;
        const __gotots_argument_62 = void 0;
        const __gotots_store_54 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_63 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_54.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
        const __gotots_argument_64 = NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_21, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63);
        const __gotots_store_55 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_65 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_55, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return LegacyDecoratorsTransformer.$go$private$tstransforms$finishClassElement(__gotots_receiver_22, __gotots_argument_64, __gotots_argument_65);
    }
    static $go$private$tstransforms$visitIdentifier(tx: LegacyDecoratorsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_range_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingClasses;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let d: {
                value: ClassDeclaration__from_ast;
            } | undefined = __gotots_range_value_0;
            {
                const __gotots_map_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
                const __gotots_store_5 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_map_1 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_5, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_results_0 = __gotots_map_0.lookupOk(__gotots_map_1);
                let ok = __gotots_results_0[1];
                let __gotots_logical_result_0 = ok;
                if (__gotots_logical_result_0) {
                    const __gotots_receiver_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referenceResolver;
                    const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(__gotots_store_6.Transformer);
                    const __gotots_store_7 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_4 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_7, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_5 = EmitContext__from_printer.MostOriginal(__gotots_receiver_3, __gotots_argument_4);
                    const __gotots_equal_operand_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_4).GetReferencedValueDeclaration(__gotots_argument_5);
                    const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_5 = Transformer__from_transformers.EmitContext(__gotots_store_8.Transformer);
                    const __gotots_store_9 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_6 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_9, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    __gotots_logical_result_0 =
                        tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, EmitContext__from_printer.MostOriginal(__gotots_receiver_5, __gotots_argument_6));
                }
                if (__gotots_logical_result_0) {
                    const __gotots_map_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
                    const __gotots_store_10 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_map_3 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_10, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    return __gotots_map_2.lookup(__gotots_map_3);
                }
            }
        }
        const __gotots_store_11 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_11, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    static $go$private$tstransforms$visitMethodDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: MethodDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_14 = tx;
        const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_33 = (Transformer__from_transformers.Factory(__gotots_store_32.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory");
        const __gotots_argument_30 = node;
        const __gotots_store_34 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_11 = Transformer__from_transformers.Visitor(__gotots_store_34.Transformer);
        const __gotots_store_35 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_28 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NamedMemberBase"));
        const __gotots_argument_31 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_11, __gotots_argument_28);
        const __gotots_argument_32 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
        const __gotots_receiver_12 = tx;
        const __gotots_store_36 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_29 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_36, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_33 = LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyNameOfClassElement(__gotots_receiver_12, __gotots_argument_29);
        const __gotots_argument_34 = void 0;
        const __gotots_argument_35 = void 0;
        const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_36 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_37.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_argument_37 = void 0;
        const __gotots_argument_38 = void 0;
        const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_39 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_38.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
        const __gotots_argument_40 = NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_13, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39);
        const __gotots_store_39 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_41 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_39, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return LegacyDecoratorsTransformer.$go$private$tstransforms$finishClassElement(__gotots_receiver_14, __gotots_argument_40, __gotots_argument_41);
    }
    static $go$private$tstransforms$visitParamerDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_65 = (Transformer__from_transformers.Factory(__gotots_store_64.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory");
        const __gotots_argument_80 = node;
        const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_78 = Transformer__from_transformers.Factory(__gotots_store_66.Transformer);
        const __gotots_store_67 = ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
        const __gotots_argument_79 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_67, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
        const __gotots_argument_81 = elideModifiers(__gotots_argument_78, __gotots_argument_79);
        const __gotots_argument_82 = ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_83 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_68.Transformer), ParameterDeclaration__from_ast.Name(node));
        const __gotots_argument_84 = void 0;
        const __gotots_argument_85 = void 0;
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_86 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_69.Transformer), ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_27, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86);
        const __gotots_equal_operand_1 = updated;
        const __gotots_store_70 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        if (!tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_1, NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_70, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)))) {
            const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_71.Transformer), updated, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_72 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_87 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_72, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let newLoc = MoveRangePastModifiers__from_transformers(__gotots_argument_87);
            Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(newLoc));
            const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_73.Transformer), updated, TextRange__from_core.$copy(newLoc));
            const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_74.Transformer), Node__from_ast.Name(updated), EFNoTrailingSourceMap$constant__from_printer());
        }
        return updated;
    }
    static $go$private$tstransforms$visitPropertyAccessExpression(tx: LegacyDecoratorsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_12.Transformer), PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
        if (!tsonicTypeScriptRuntime.sameLocation(expression, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression)) {
            const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_14 = (Transformer__from_transformers.Factory(__gotots_store_13.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), node, expression, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).QuestionDotToken, PropertyAccessExpression__from_ast.Name(node), (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
        }
        const __gotots_store_15 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_15, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    static $go$private$tstransforms$visitPropertyDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0) === 0)) {
            return void 0;
        }
        const __gotots_store_56 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_66 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_56, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_67 = 192;
        if (HasSyntacticModifier__from_ast(__gotots_argument_66, __gotots_argument_67)) {
            return void 0;
        }
        const __gotots_receiver_26 = tx;
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_58 = (Transformer__from_transformers.Factory(__gotots_store_57.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory");
        const __gotots_argument_70 = node;
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_23 = Transformer__from_transformers.Visitor(__gotots_store_59.Transformer);
        const __gotots_store_60 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_68 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NamedMemberBase"));
        const __gotots_argument_71 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_23, __gotots_argument_68);
        const __gotots_receiver_24 = tx;
        const __gotots_store_61 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_69 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_61, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_72 = LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyNameOfClassElement(__gotots_receiver_24, __gotots_argument_69);
        const __gotots_argument_73 = void 0;
        const __gotots_argument_74 = void 0;
        const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_75 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_62.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_argument_76 = NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_25, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
        const __gotots_store_63 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_77 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_63, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return LegacyDecoratorsTransformer.$go$private$tstransforms$finishClassElement(__gotots_receiver_26, __gotots_argument_76, __gotots_argument_77);
    }
    static $go$private$tstransforms$visitPropertyNameOfClassElement(tx: LegacyDecoratorsTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(member);
        if (IsComputedPropertyName__from_ast(name) && HasDecorators__from_ast(member)) {
            const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_138.Transformer), (Node__from_ast.AsComputedPropertyName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipPartiallyEmittedExpressions__from_ast(expression);
            if (!IsSimpleInlineableExpression__from_transformers(innerExpression)) {
                const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let generatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_139.Transformer), name);
                const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_140.Transformer), generatedName);
                const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory");
                const __gotots_argument_121 = Node__from_ast.AsComputedPropertyName(name);
                const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_122 = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_143.Transformer), (void Node__from_ast.AsNode,
                    generatedName), expression);
                return NodeFactory__from_ast.UpdateComputedPropertyName(__gotots_receiver_42, __gotots_argument_121, __gotots_argument_122);
            }
        }
        const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_144.Transformer), name);
    }
    static $go$private$tstransforms$visitSetAccessorDeclaration(tx: LegacyDecoratorsTransformer | undefined, node: {
        value: SetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_18 = tx;
        const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_41 = (Transformer__from_transformers.Factory(__gotots_store_40.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory");
        const __gotots_argument_44 = node;
        const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_15 = Transformer__from_transformers.Visitor(__gotots_store_42.Transformer);
        const __gotots_store_43: SetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_42 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NamedMemberBase"));
        const __gotots_argument_45 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_15, __gotots_argument_42);
        const __gotots_receiver_16 = tx;
        const __gotots_store_44 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_43 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_44, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_46 = LegacyDecoratorsTransformer.$go$private$tstransforms$visitPropertyNameOfClassElement(__gotots_receiver_16, __gotots_argument_43);
        const __gotots_argument_47 = void 0;
        const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_48 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_45.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_argument_49 = void 0;
        const __gotots_argument_50 = void 0;
        const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_51 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_46.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
        const __gotots_argument_52 = NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_17, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
        const __gotots_store_47 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_53 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_47, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return LegacyDecoratorsTransformer.$go$private$tstransforms$finishClassElement(__gotots_receiver_18, __gotots_argument_52, __gotots_argument_53);
    }
}
export function NewLegacyDecoratorsTransformer(opt: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: LegacyDecoratorsTransformer | undefined = new LegacyDecoratorsTransformer(Transformer__from_transformers.$zero(), CompilerOptions__from_core.GetEmitScriptTarget((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions), (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, GoMap.nil(), RuntimeSlice.nil<{
        value: ClassDeclaration__from_ast;
    } | undefined>());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return LegacyDecoratorsTransformer.$go$private$tstransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export function elideModifiers(f: {
    value: NodeFactory__from_printer;
} | undefined, nodes: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
    if (nodes === undefined) {
        return void 0;
    }
    if ((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
        ModifierList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length === 0) {
        return nodes;
    }
    const __gotots_store_147 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let replacement: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
    (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
        ModifierList__from_ast.$storageOf(((replacement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
        ModifierList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
    return replacement;
}
export function isClassStaticBlockDeclarationOrStaticProperty(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsClassStaticBlockDeclaration__from_ast(node) || (IsPropertyDeclaration__from_ast(node) && HasStaticModifier__from_ast(node));
}
export function isNotExportOrDefaultOrDecorator(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(IsDecorator__from_ast(node) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportKeyword$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast());
}
export function decoratorContainsPrivateIdentifierInExpression(decorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(((Node__from_ast.SubtreeFacts(decorator) & SubtreeContainsPrivateIdentifierInExpression$constant__from_ast()) >>> 0) === 0);
}
export function parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool {
    return Some$PointerTo_Named_ast$Node(parameterDecorators, decoratorContainsPrivateIdentifierInExpression);
}
export function hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node: {
    value: ClassDeclaration__from_ast;
} | undefined): bool {
    if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members === undefined || NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return false;
    }
    const __gotots_range_3 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
        if (!CanHaveDecorators__from_ast(member)) {
            continue;
        }
        let allDecorators__shadow_1: allDecorators | undefined = getAllDecoratorsOfClassElement(member, node, true);
        if (allDecorators__shadow_1 === undefined) {
            continue;
        }
        if (Some$PointerTo_Named_ast$Node((allDecorators__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).decorators, decoratorContainsPrivateIdentifierInExpression)) {
            return true;
        }
        if (Some$SliceOf_PointerTo_Named_ast$Node((allDecorators__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parameters, parameterDecoratorsContainPrivateIdentifierInExpression)) {
            return true;
        }
    }
    return false;
}
export class allDecorators {
    declare private readonly $goType: void;
    public constructor(public decorators: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public parameters: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>) {
    }
    declare private readonly then?: never;
}
export function getAllDecoratorsOfClass(node: {
    value: ClassDeclaration__from_ast;
} | undefined, useLegacyDecorators: bool): allDecorators | undefined {
    const __gotots_store_179 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault));
    let decorators = Node__from_ast.Decorators(new $ProjectedPropertyLocation(__gotots_store_179, "Node", Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
    let parameters = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    if (useLegacyDecorators) {
        const __gotots_store_180 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_144 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_180, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_145 = GetFirstConstructorWithBody__from_ast(__gotots_argument_144);
        parameters = getDecoratorsOfParameters(__gotots_argument_145);
    }
    if (decorators.length === 0 && parameters.length === 0) {
        return void 0;
    }
    return new allDecorators(decorators, parameters);
}
export function getAllDecoratorsOfClassElement(member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: {
    value: ClassDeclaration__from_ast;
} | undefined, useLegacyDecorators: bool): allDecorators | undefined {
    switch (Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            if (!useLegacyDecorators) {
                return getAllDecoratorsOfMethod(member, false);
            }
            return getAllDecoratorsOfAccessors(member, parent, true);
            break;
        }
        case KindMethodDeclaration$constant__from_ast(): {
            return getAllDecoratorsOfMethod(member, useLegacyDecorators);
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            return getAllDecoratorsOfProperty(member);
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function getAllDecoratorsOfAccessors(__go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: {
    value: ClassDeclaration__from_ast;
} | undefined, useLegacyDecorators: bool): allDecorators | undefined {
    if (Node__from_ast.Body(__go_accessor) === undefined) {
        return void 0;
    }
    let decls = GetAllAccessorDeclarations__from_ast(NodeList__from_ast.$storageOf((((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, __go_accessor);
    let firstAccessorWithDecorators: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (HasDecorators__from_ast(decls.FirstAccessor)) {
        firstAccessorWithDecorators = decls.FirstAccessor;
    }
    else if (!(decls.SecondAccessor === undefined) && HasDecorators__from_ast(decls.SecondAccessor)) {
        firstAccessorWithDecorators = decls.SecondAccessor;
    }
    if (firstAccessorWithDecorators === undefined || !tsonicTypeScriptRuntime.sameLocation(__go_accessor, firstAccessorWithDecorators)) {
        return void 0;
    }
    let decorators = Node__from_ast.Decorators(firstAccessorWithDecorators);
    let parameters = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    if (useLegacyDecorators && !(decls.SetAccessor === undefined)) {
        const __gotots_store_181 = NodeBase__from_ast.$storageOf((decls.SetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_148 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_181, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        parameters = getDecoratorsOfParameters(__gotots_argument_148);
    }
    if (decorators.length === 0 && parameters.length === 0) {
        return void 0;
    }
    return new allDecorators(decorators, parameters);
}
export function getAllDecoratorsOfProperty(property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): allDecorators | undefined {
    let decorators = Node__from_ast.Decorators(property);
    if (decorators.length === 0) {
        return void 0;
    }
    return new allDecorators(decorators, RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>());
}
export function getAllDecoratorsOfMethod(method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, useLegacyDecorators: bool): allDecorators | undefined {
    if (Node__from_ast.Body(method) === undefined) {
        return void 0;
    }
    let decorators = Node__from_ast.Decorators(method);
    let parameters = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    if (useLegacyDecorators) {
        parameters = getDecoratorsOfParameters(method);
    }
    if (decorators.length === 0 && parameters.length === 0) {
        return void 0;
    }
    return new allDecorators(decorators, parameters);
}
export function getDecoratorsOfParameters(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    let decorators = RuntimeSlice.nil<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>();
    if (!(node === undefined)) {
        let parameters = Node__from_ast.Parameters(node);
        let firstParameterIsThis = parameters.length > 0 && IsThisParameter__from_ast(parameters.get(0));
        let firstParameterOffset = 0;
        let numParameters = parameters.length;
        if (firstParameterIsThis) {
            firstParameterOffset = 1;
            numParameters = numParameters - 1;
        }
        const __gotots_range_1 = numParameters;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            let i = __gotots_range_value_1;
            let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = parameters.get(i + firstParameterOffset);
            if (decorators.length > 0 || HasDecorators__from_ast(p)) {
                if (decorators.length === 0) {
                    decorators = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(numParameters, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                }
                decorators.set(i, Node__from_ast.Decorators(p));
            }
        }
    }
    return decorators;
}
export function isDecoratedClassElement(member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isStaticElement: bool, parent: {
    value: ClassDeclaration__from_ast;
} | undefined): bool {
    let __gotots_logical_result_6 = isStaticElement === IsStatic__from_ast(member);
    if (__gotots_logical_result_6) {
        const __gotots_argument_154 = true;
        const __gotots_argument_155 = member;
        const __gotots_store_193 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_156 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_193, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_157 = void 0;
        __gotots_logical_result_6 = NodeOrChildIsDecorated__from_ast(__gotots_argument_154, __gotots_argument_155, __gotots_argument_156, __gotots_argument_157);
    }
    return __gotots_logical_result_6;
}
export function getDecoratedClassElements(node: {
    value: ClassDeclaration__from_ast;
} | undefined, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members === undefined || NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_6 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
        if (isDecoratedClassElement(member, isStatic, node)) {
            members = members.append(void 0, [member]);
        }
    }
    return members;
}
