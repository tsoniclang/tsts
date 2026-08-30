import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierList as ModifierList__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, PostfixUnaryExpression as PostfixUnaryExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedSet as OrderedSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, CallExpression as CallExpression__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, IsAssignmentOperator as IsAssignmentOperator__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsSuperProperty as IsSuperProperty__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, ModifiersBase as ModifiersBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, StatementBase as StatementBase__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ExtractModifiers as ExtractModifiers__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { OrderedSet$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Add.js";
import { OrderedSet$Values$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Values.js";
import { assignmentTargetContainsSuperProperty, isUpdateExpression } from "./async.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
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
export function convertClassDeclarationToClassExpression(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: {
    value: ClassDeclaration__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_store_54 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
    const __gotots_argument_96 = emitContext;
    const __gotots_store_55: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
    const __gotots_argument_97 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "ModifiersBase"));
    const __gotots_argument_98 = 4294965215;
    const __gotots_argument_99 = ExtractModifiers__from_transformers(__gotots_argument_96, __gotots_argument_97, __gotots_argument_98);
    const __gotots_argument_100 = ClassDeclaration__from_ast.Name(node);
    const __gotots_argument_101 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters;
    const __gotots_argument_102 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses;
    const __gotots_argument_103 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members;
    let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassExpression(__gotots_receiver_25, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102, __gotots_argument_103);
    const __gotots_receiver_26 = emitContext;
    const __gotots_argument_104 = updated;
    const __gotots_store_56 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
    const __gotots_argument_105 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_56, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.SetOriginal(__gotots_receiver_26, __gotots_argument_104, __gotots_argument_105);
    Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
    return updated;
}
export function createNotNullCondition(emitContext: {
    value: EmitContext__from_printer;
} | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, invert: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let token = KindExclamationEqualsEqualsToken$constant__from_ast();
    let op = KindAmpersandAmpersandToken$constant__from_ast();
    if (invert) {
        token = KindEqualsEqualsEqualsToken$constant__from_ast();
        op = KindBarBarToken$constant__from_ast();
    }
    const __gotots_store_2 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory");
    const __gotots_argument_11 = void 0;
    const __gotots_store_3 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory");
    const __gotots_argument_1 = void 0;
    const __gotots_argument_2 = left;
    const __gotots_argument_3 = void 0;
    const __gotots_store_4 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_4 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), token);
    const __gotots_store_5 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_5 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), KindNullKeyword$constant__from_ast());
    const __gotots_argument_12 = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_2, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
    const __gotots_argument_13 = void 0;
    const __gotots_store_6 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_14 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), op);
    const __gotots_store_7 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory");
    const __gotots_argument_6 = void 0;
    const __gotots_argument_7 = right;
    const __gotots_argument_8 = void 0;
    const __gotots_store_8 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_9 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), token);
    const __gotots_argument_10 = NodeFactory__from_printer.NewVoidZeroExpression((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory);
    const __gotots_argument_15 = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_3, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_4, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
}
export class superAccessState {
    declare private readonly $goType: void;
    public constructor(public factory: {
        value: NodeFactory__from_printer;
    } | undefined, public capturedSuperProperties: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined, public hasSuperElementAccess: bool, public hasSuperPropertyAssignment: bool, public superBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public superIndexBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public superAccessVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    static $zero(): superAccessState {
        return new superAccessState(void 0, void 0, false, false, void 0, void 0, void 0);
    }
    declare private readonly then?: never;
    static $go$private$estransforms$createSuperAccessVariableStatement(s: superAccessState | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory;
        let accessors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(OrderedSet$Values$string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).capturedSuperProperties));
        if (__gotots_range_0 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_0(($argument0: gostring): bool => {
            if (__gotots_range_state_0 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_0 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_0 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_0 = -1;
            const __gotots_range_value_0 = $argument0;
            let name = __gotots_range_value_0;
            let descriptorProperties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_store_19 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory");
            const __gotots_store_20 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_35 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), KindSuperKeyword$constant__from_ast());
            const __gotots_argument_36 = void 0;
            const __gotots_store_21 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_37 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), name);
            const __gotots_argument_38 = NodeFlagsNone$constant__from_ast();
            let getterBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_10, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
            const __gotots_store_22 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory");
            const __gotots_argument_39 = void 0;
            const __gotots_argument_40 = void 0;
            const __gotots_store_23 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_41 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_42 = void 0;
            const __gotots_argument_43 = void 0;
            const __gotots_store_24 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_44 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
            const __gotots_argument_45 = getterBody;
            let getterArrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_11, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45);
            const __gotots_store_25 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory");
            const __gotots_argument_46 = void 0;
            const __gotots_store_26 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_47 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), "get");
            const __gotots_argument_48 = void 0;
            const __gotots_argument_49 = void 0;
            const __gotots_argument_50 = getterArrow;
            let getter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_12, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
            descriptorProperties = descriptorProperties.append(void 0, [getter]);
            if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperPropertyAssignment) {
                const __gotots_store_27 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory");
                const __gotots_argument_51 = void 0;
                const __gotots_argument_52 = void 0;
                const __gotots_store_28 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_53 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), "v");
                const __gotots_argument_54 = void 0;
                const __gotots_argument_55 = void 0;
                const __gotots_argument_56 = void 0;
                let vParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_13, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56);
                const __gotots_store_29 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory");
                const __gotots_store_30 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_57 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), KindSuperKeyword$constant__from_ast());
                const __gotots_argument_58 = void 0;
                const __gotots_store_31 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_59 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeFactory"), name);
                const __gotots_argument_60 = NodeFlagsNone$constant__from_ast();
                let superProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_14, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60);
                const __gotots_receiver_15 = f;
                const __gotots_argument_61 = superProp;
                const __gotots_store_32 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_62 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), "v");
                let assignExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_15, __gotots_argument_61, __gotots_argument_62);
                const __gotots_store_33 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory");
                const __gotots_argument_63 = void 0;
                const __gotots_argument_64 = void 0;
                const __gotots_store_34 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_65 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([vParam]));
                const __gotots_argument_66 = void 0;
                const __gotots_argument_67 = void 0;
                const __gotots_store_35 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_68 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
                const __gotots_argument_69 = assignExpr;
                let setterArrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_16, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
                const __gotots_store_36 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory");
                const __gotots_argument_70 = void 0;
                const __gotots_store_37 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_71 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeFactory"), "set");
                const __gotots_argument_72 = void 0;
                const __gotots_argument_73 = void 0;
                const __gotots_argument_74 = setterArrow;
                let setter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_17, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74);
                descriptorProperties = descriptorProperties.append(void 0, [setter]);
            }
            const __gotots_store_38 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeFactory");
            const __gotots_store_39 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_75 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), descriptorProperties);
            const __gotots_argument_76 = false;
            let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_18, __gotots_argument_75, __gotots_argument_76);
            const __gotots_store_40 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory");
            const __gotots_argument_77 = void 0;
            const __gotots_store_41 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_78 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory"), name);
            const __gotots_argument_79 = void 0;
            const __gotots_argument_80 = void 0;
            const __gotots_argument_81 = descriptor;
            let __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_19, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
            accessors = accessors.append(void 0, [__go_accessor]);
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        const __gotots_store_42 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory");
        const __gotots_store_43 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_82 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeFactory"), accessors);
        const __gotots_argument_83 = true;
        let descriptorsObject: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_20, __gotots_argument_82, __gotots_argument_83);
        const __gotots_store_44 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory");
        const __gotots_store_45 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeFactory");
        const __gotots_store_46 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_84 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory"), "Object");
        const __gotots_argument_85 = void 0;
        const __gotots_store_47 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_86 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "NodeFactory"), "create");
        const __gotots_argument_87 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_89 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_21, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87);
        const __gotots_argument_90 = void 0;
        const __gotots_argument_91 = void 0;
        const __gotots_store_48 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeFactory");
        const __gotots_store_49 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_0 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory"), KindNullKeyword$constant__from_ast());
        const __gotots_slice_element_1 = descriptorsObject;
        const __gotots_argument_88 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0, __gotots_slice_element_1]);
        const __gotots_argument_92 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_22, __gotots_argument_88);
        const __gotots_argument_93 = NodeFlagsNone$constant__from_ast();
        let objectCreateCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_23, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
        const __gotots_store_50 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory"), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superBinding, void 0, void 0, objectCreateCall);
        const __gotots_store_51 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NodeFactory");
        const __gotots_store_52 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_94 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([decl]));
        const __gotots_argument_95 = NodeFlagsConst$constant__from_ast();
        let declList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_24, __gotots_argument_94, __gotots_argument_95);
        const __gotots_store_53 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeFactory"), void 0, declList);
    }
    static $go$private$estransforms$createSuperElementAccessInAsyncMethod(s: superAccessState | undefined, argumentExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_15 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory");
        const __gotots_argument_26 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superIndexBinding;
        const __gotots_argument_27 = void 0;
        const __gotots_argument_28 = void 0;
        const __gotots_store_16 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_29 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([argumentExpression]));
        const __gotots_argument_30 = NodeFlagsNone$constant__from_ast();
        let superIndexCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_8, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperPropertyAssignment) {
            const __gotots_store_17 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory");
            const __gotots_argument_31 = superIndexCall;
            const __gotots_argument_32 = void 0;
            const __gotots_store_18 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_33 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), "value");
            const __gotots_argument_34 = NodeFlagsNone$constant__from_ast();
            return NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_9, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34);
        }
        return superIndexCall;
    }
    static $go$private$estransforms$initSuperAccessVisitor(s: superAccessState | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, factory: {
        value: NodeFactory__from_printer;
    } | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory = factory;
        const __gotots_receiver_1 = emitContext;
        const __gotots_receiver_0 = s;
        const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return superAccessState.$go$private$estransforms$visitSuperAccessNode(__gotots_receiver_0, $argument0);
        };
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_1, __gotots_argument_0);
    }
    static $go$private$estransforms$substituteCallExpressionWithSuperAccess(s: superAccessState | undefined, call: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression;
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsPropertyAccessExpression__from_ast(expression)) {
            const __gotots_store_9 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            target = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superBinding, void 0, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(expression)), NodeFlagsNone$constant__from_ast());
        }
        else if (IsElementAccessExpression__from_ast(expression)) {
            target = superAccessState.$go$private$estransforms$createSuperElementAccessInAsyncMethod(s, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
        }
        else {
            const __gotots_receiver_5 = visitor;
            const __gotots_store_10 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_16 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_10, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_5, __gotots_argument_16);
        }
        const __gotots_store_11 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory");
        const __gotots_argument_17 = target;
        const __gotots_argument_18 = void 0;
        const __gotots_store_12 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_19 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), "call");
        const __gotots_argument_20 = NodeFlagsNone$constant__from_ast();
        let callTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_6, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
        let allArgs = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        allArgs = allArgs.append(void 0, [NodeFactory__from_printer.NewThisExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory)]);
        if (!(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments === undefined)) {
            let visitedArgs: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(visitor, CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
            if (!(visitedArgs === undefined)) {
                allArgs = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allArgs, NodeList__from_ast.$storageOf(((visitedArgs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
            }
        }
        const __gotots_store_13 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory");
        const __gotots_argument_21 = callTarget;
        const __gotots_argument_22 = void 0;
        const __gotots_argument_23 = void 0;
        const __gotots_store_14 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_24 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), allArgs);
        const __gotots_argument_25 = NodeFlagsNone$constant__from_ast();
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_7, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        return result;
    }
    static $go$private$estransforms$substituteSuperAccessesInBody(s: superAccessState | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeVisitor__from_ast.VisitNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor, body);
    }
    static $go$private$estransforms$trackSuperAccess(s: superAccessState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).capturedSuperProperties === undefined) {
            return;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyAccessExpression$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                    OrderedSet$Add$string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).capturedSuperProperties, Node__from_ast.Text(Node__from_ast.Name(node)));
                }
                break;
            }
            case KindElementAccessExpression$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperElementAccess = true;
                }
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                if (IsAssignmentOperator__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && assignmentTargetContainsSuperProperty(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperPropertyAssignment = true;
                }
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                if (isUpdateExpression(node) && assignmentTargetContainsSuperProperty(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand)) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperPropertyAssignment = true;
                }
                break;
            }
            case KindPostfixUnaryExpression$constant__from_ast(): {
                if (isUpdateExpression(node) && assignmentTargetContainsSuperProperty((Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand)) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasSuperPropertyAssignment = true;
                }
                break;
            }
        }
    }
    static $go$private$estransforms$visitSuperAccessNode(s: superAccessState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindCallExpression$constant__from_ast(): {
                let call: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(node);
                if (IsSuperProperty__from_ast(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
                    return superAccessState.$go$private$estransforms$substituteCallExpressionWithSuperAccess(s, call, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor);
                }
                return NodeVisitor__from_ast.VisitEachChild((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor, node);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                    const __gotots_store_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory"), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superBinding, void 0, Node__from_ast.Name(node), NodeFlagsNone$constant__from_ast());
                }
                return NodeVisitor__from_ast.VisitEachChild((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor, node);
                break;
            }
            case KindElementAccessExpression$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                    return superAccessState.$go$private$estransforms$createSuperElementAccessInAsyncMethod(s, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                }
                return NodeVisitor__from_ast.VisitEachChild((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor, node);
                break;
            }
            case KindFunctionExpression$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindConstructor$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindClassExpression$constant__from_ast(): {
                return node;
                break;
            }
            default: {
                return NodeVisitor__from_ast.VisitEachChild((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessVisitor, node);
                break;
            }
        }
    }
}
export function createAccessorPropertyBackingField(f: {
    value: NodeFactory__from_printer;
} | undefined, node: {
    value: PropertyDeclaration__from_ast;
} | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_store_1 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdatePropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory"), node, modifiers, NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(f, PropertyDeclaration__from_ast.Name(node), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage")), void 0, void 0, initializer);
}
