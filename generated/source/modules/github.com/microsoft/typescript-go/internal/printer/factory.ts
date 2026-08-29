import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { LabeledStatement as LabeledStatement__from_ast, OuterExpressionKinds as OuterExpressionKinds__from_ast, QualifiedName as QualifiedName__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptTarget as ScriptTarget__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { EmitFlags } from "./emitflags.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetNodeId as GetNodeId__from_ast, GetNonAssignedNameOfDeclaration as GetNonAssignedNameOfDeclaration__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsCallExpression as IsCallExpression__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsIdentifier as IsIdentifier__from_ast, IsLabeledStatement as IsLabeledStatement__from_ast, IsMemberName as IsMemberName__from_ast, IsOuterExpression as IsOuterExpression__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindJsxNamespacedName$constant as KindJsxNamespacedName$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, NewNodeFactory as NewNodeFactory__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactoryHooks as NodeFactoryHooks__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsOptionalChain$constant as NodeFlagsOptionalChain$constant__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, RangeIsSynthesized as RangeIsSynthesized__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TryGetPropertyNameOfBindingOrAssignmentElement as TryGetPropertyNameOfBindingOrAssignmentElement__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/state.js";
import { IfElse$Named_ast$Kind } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$Named_ast$NodeId, $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_printer$AutoGenerateId as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$AutoGenerateInfo as GoMap } from "../../../../../../support/maps.js";
import { AutoGenerateInfo, AutoGenerateOptions, EmitContext } from "./emitcontext.js";
import { EFCustomPrologue$constant, EFExportName$constant, EFHelperName$constant, EFLocalName$constant, EFNoComments$constant, EFNoSourceMap$constant, EFNone$constant } from "./emitflags.js";
import { GeneratedIdentifierFlags, GeneratedIdentifierFlagsAuto$int, GeneratedIdentifierFlagsKindMask$int, GeneratedIdentifierFlagsNode$int, GeneratedIdentifierFlagsOptimistic$int, GeneratedIdentifierFlagsUnique$int } from "./generatedidentifierflags.js";
import { FormatGeneratedName } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class NodeFactory {
    declare private readonly $goType: void;
    public constructor(public NodeFactory: NodeFactory__from_ast, public emitContext: {
        value: EmitContext;
    } | undefined) {
    }
    static $copy($source: NodeFactory): NodeFactory {
        return new NodeFactory(NodeFactory__from_ast.$copy($source.NodeFactory), $source.emitContext);
    }
    declare private readonly then?: never;
    static CreateExpressionFromEntityName(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsQualifiedName__from_ast(node)) {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory.CreateExpressionFromEntityName(f, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left);
            const __gotots_receiver_5: QualifiedName__from_ast["Right"] = (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right;
            const __gotots_store_6 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_11 = new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory")));
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_5, __gotots_argument_11);
            Node__from_ast.$storageOf(((right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            Node__from_ast.$storageOf(((right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf((((Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            const __gotots_store_7 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let propAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), left, void 0, right, NodeFlagsNone$constant__from_ast());
            Node__from_ast.$storageOf(((propAccess ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return propAccess;
        }
        const __gotots_receiver_6 = node;
        const __gotots_store_8 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_12 = new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory")));
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_6, __gotots_argument_12);
        Node__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        Node__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        return res;
    }
    static CreateForOfBindingStatement(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, boundValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsVariableDeclarationList__from_ast(node)) {
            let firstDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
            const __gotots_store_99 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let updatedDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "NodeFactory"), Node__from_ast.AsVariableDeclaration(firstDeclaration), Node__from_ast.Name(firstDeclaration), void 0, void 0, boundValue);
            const __gotots_store_100 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory");
            const __gotots_argument_171 = void 0;
            const __gotots_store_101 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NodeFactory");
            const __gotots_argument_168 = Node__from_ast.AsVariableDeclarationList(node);
            const __gotots_store_102 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_169 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updatedDeclaration]));
            const __gotots_argument_170 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).NodeBase)).NodeDefault)).Node)).Flags;
            const __gotots_argument_172 = NodeFactory__from_ast.UpdateVariableDeclarationList(__gotots_receiver_45, __gotots_argument_168, __gotots_argument_169, __gotots_argument_170);
            let statement__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_46, __gotots_argument_171, __gotots_argument_172);
            Node__from_ast.$storageOf(((statement__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return statement__shadow_1;
        }
        let updatedExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory.NewAssignmentExpression(f, node, boundValue);
        Node__from_ast.$storageOf(((updatedExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_103 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory"), updatedExpression);
        Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return statement;
    }
    static EnsureUseStrict(f: {
        value: NodeFactory;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_range_1 = statements;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            if (IsPrologueDirective__from_ast(statement) && Node__from_ast.Text(Node__from_ast.Expression(statement)) === "use strict") {
                return statements;
            }
            else {
                break;
            }
        }
        const __gotots_store_9 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory");
        const __gotots_store_10 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_13 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), "use strict", TokenFlagsNone$constant__from_ast());
        let useStrictPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_7, __gotots_argument_13);
        statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([useStrictPrologue]), statements, void 0);
        return statements;
    }
    static GetDeclarationName(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.GetDeclarationNameEx(f, node, new NameOptions(false, false));
    }
    static GetDeclarationNameEx(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, opts: NameOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.$go$private$printer$getName(f, node, EFNone$constant(), new AssignedNameOptions(opts.AllowComments, opts.AllowSourceMaps, false));
    }
    static GetExportName(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.GetExportNameEx(f, node, new AssignedNameOptions(false, false, false));
    }
    static GetExportNameEx(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, opts: AssignedNameOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.$go$private$printer$getName(f, node, EFExportName$constant(), AssignedNameOptions.$copy(opts));
    }
    static GetExternalModuleOrNamespaceExportName(f: {
        value: NodeFactory;
    } | undefined, ns: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, allowComments: bool, allowSourceMaps: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(ns === undefined) && HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
            let nameOpts = new NameOptions(allowComments, allowSourceMaps);
            return NodeFactory.GetNamespaceMemberName(f, ns, NodeFactory.GetDeclarationNameEx(f, node, NameOptions.$copy(nameOpts)), NameOptions.$copy(nameOpts));
        }
        return NodeFactory.GetExportNameEx(f, node, new AssignedNameOptions(allowComments, allowSourceMaps, false));
    }
    static GetLocalName(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.GetLocalNameEx(f, node, new AssignedNameOptions(false, false, false));
    }
    static GetLocalNameEx(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, opts: AssignedNameOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.$go$private$printer$getName(f, node, EFLocalName$constant(), AssignedNameOptions.$copy(opts));
    }
    static GetNamespaceMemberName(f: {
        value: NodeFactory;
    } | undefined, ns: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, opts: NameOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!EmitContext.HasAutoGenerateInfo((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, name)) {
            name = Node__from_ast.Clone(name, new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(f));
        }
        const __gotots_store_15 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let qualifiedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), ns, void 0, name, NodeFlagsNone$constant__from_ast());
        EmitContext.AssignCommentAndSourceMapRanges((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, qualifiedName, name);
        if (!opts.AllowComments) {
            EmitContext.AddEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, qualifiedName, EFNoComments$constant());
        }
        if (!opts.AllowSourceMaps) {
            EmitContext.AddEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, qualifiedName, EFNoSourceMap$constant());
        }
        return qualifiedName;
    }
    static InlineExpressions(f: {
        value: NodeFactory;
    } | undefined, expressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (expressions.length === 0) {
            return void 0;
        }
        if (expressions.length === 1) {
            return expressions.get(0);
        }
        expressions = flattenCommaElements(expressions);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = expressions.get(0);
        const __gotots_range_0 = expressions.slice(1, null, null);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let next: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            expression = NodeFactory.NewCommaExpression(f, expression, next);
        }
        return expression;
    }
    static NewAddDisposableResourceHelper(f: {
        value: NodeFactory;
    } | undefined, envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_async: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.addDisposableResourceHelper);
        const __gotots_store_160 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_72 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory");
        const __gotots_argument_275 = NodeFactory.NewUnscopedHelperName(f, "__addDisposableResource");
        const __gotots_argument_276 = void 0;
        const __gotots_argument_277 = void 0;
        const __gotots_store_161 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_71 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory");
        const __gotots_slice_element_33 = envBinding;
        const __gotots_slice_element_34 = value;
        const __gotots_store_162 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_35 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), IfElse$Named_ast$Kind(__go_async, KindTrueKeyword$constant__from_ast(), KindFalseKeyword$constant__from_ast()));
        const __gotots_argument_274 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_33, __gotots_slice_element_34, __gotots_slice_element_35]);
        const __gotots_argument_278 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_71, __gotots_argument_274);
        const __gotots_argument_279 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_72, __gotots_argument_275, __gotots_argument_276, __gotots_argument_277, __gotots_argument_278, __gotots_argument_279);
    }
    static NewArraySliceCall(f: {
        value: NodeFactory;
    } | undefined, array: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, start: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let args = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (start !== 0) {
            const __gotots_argument_93 = args;
            const __gotots_store_62 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_94 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "NodeFactory"), strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(start))), TokenFlagsNone$constant__from_ast());
            args = __gotots_argument_93.append(void 0, [__gotots_argument_94]);
        }
        const __gotots_receiver_28 = f;
        const __gotots_argument_95 = array;
        const __gotots_store_63 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_96 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeFactory"), "slice");
        const __gotots_argument_97 = args;
        return NodeFactory.NewMethodCall(__gotots_receiver_28, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
    }
    static NewAssignHelper(f: {
        value: NodeFactory;
    } | undefined, attributesSegments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, scriptTarget: ScriptTarget__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_47 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "NodeFactory");
        const __gotots_store_48 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeFactory");
        const __gotots_store_49 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_65 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory"), "Object");
        const __gotots_argument_66 = void 0;
        const __gotots_store_50 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_67 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory"), "assign");
        const __gotots_argument_68 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_69 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_22, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68);
        const __gotots_argument_70 = void 0;
        const __gotots_argument_71 = void 0;
        const __gotots_store_51 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_72 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NodeFactory"), attributesSegments);
        const __gotots_argument_73 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_23, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73);
    }
    static NewAssignmentExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_2 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory");
        const __gotots_argument_1 = void 0;
        const __gotots_argument_2 = left;
        const __gotots_argument_3 = void 0;
        const __gotots_store_3 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_4 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), KindEqualsToken$constant__from_ast());
        const __gotots_argument_5 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_3, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
    }
    static NewAssignmentTargetWrapper(f: {
        value: NodeFactory;
    } | undefined, paramName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_138 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_65 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeFactory");
        const __gotots_argument_246 = void 0;
        const __gotots_store_139 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_247 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory"), "value");
        const __gotots_argument_248 = void 0;
        const __gotots_store_140 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_62 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory");
        const __gotots_store_141 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_15 = NodeFactory__from_ast.NewParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "NodeFactory"), void 0, void 0, paramName, void 0, void 0, void 0);
        const __gotots_argument_242 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_15]);
        const __gotots_argument_249 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_62, __gotots_argument_242);
        const __gotots_argument_250 = void 0;
        const __gotots_argument_251 = void 0;
        const __gotots_store_142 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory");
        const __gotots_store_143 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_63 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "NodeFactory");
        const __gotots_store_144 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_16 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), expression);
        const __gotots_argument_243 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_16]);
        const __gotots_argument_244 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_63, __gotots_argument_243);
        const __gotots_argument_245 = false;
        const __gotots_argument_252 = NodeFactory__from_ast.NewBlock(__gotots_receiver_64, __gotots_argument_244, __gotots_argument_245);
        let setAccessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSetAccessorDeclaration(__gotots_receiver_65, __gotots_argument_246, __gotots_argument_247, __gotots_argument_248, __gotots_argument_249, __gotots_argument_250, __gotots_argument_251, __gotots_argument_252);
        const __gotots_store_145 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_66 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeFactory");
        const __gotots_store_146 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_253 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([setAccessor]));
        const __gotots_argument_254 = false;
        let objLiteral: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_66, __gotots_argument_253, __gotots_argument_254);
        const __gotots_store_147 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_67 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory");
        const __gotots_store_148 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_255 = NodeFactory__from_ast.NewParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "NodeFactory"), objLiteral);
        const __gotots_argument_256 = void 0;
        const __gotots_store_149 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_257 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeFactory"), "value");
        const __gotots_argument_258 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_67, __gotots_argument_255, __gotots_argument_256, __gotots_argument_257, __gotots_argument_258);
    }
    static NewAsyncDelegatorHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.awaitHelper);
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.asyncDelegatorHelper);
        const __gotots_store_108 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "NodeFactory");
        const __gotots_argument_183 = NodeFactory.NewUnscopedHelperName(f, "__asyncDelegator");
        const __gotots_argument_184 = void 0;
        const __gotots_argument_185 = void 0;
        const __gotots_store_109 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_186 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression]));
        const __gotots_argument_187 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_49, __gotots_argument_183, __gotots_argument_184, __gotots_argument_185, __gotots_argument_186, __gotots_argument_187);
    }
    static NewAsyncGeneratorHelper(f: {
        value: NodeFactory;
    } | undefined, generatorFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, hasLexicalThis: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.awaitHelper);
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.asyncGeneratorHelper);
        EmitContext.AddEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, generatorFunc, 2129920);
        let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (hasLexicalThis) {
            const __gotots_store_172 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            thisArg = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory"), KindThisKeyword$constant__from_ast());
        }
        else {
            thisArg = NodeFactory.NewVoidZeroExpression(f);
        }
        const __gotots_store_173 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_75 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "NodeFactory");
        const __gotots_argument_287 = NodeFactory.NewUnscopedHelperName(f, "__asyncGenerator");
        const __gotots_argument_288 = void 0;
        const __gotots_argument_289 = void 0;
        const __gotots_store_174 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "NodeFactory");
        const __gotots_slice_element_36 = thisArg;
        const __gotots_store_175 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_37 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "NodeFactory"), "arguments");
        const __gotots_slice_element_38 = generatorFunc;
        const __gotots_argument_286 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_36, __gotots_slice_element_37, __gotots_slice_element_38]);
        const __gotots_argument_290 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_74, __gotots_argument_286);
        const __gotots_argument_291 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_75, __gotots_argument_287, __gotots_argument_288, __gotots_argument_289, __gotots_argument_290, __gotots_argument_291);
    }
    static NewAsyncValuesHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.asyncValuesHelper);
        const __gotots_store_106 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "NodeFactory");
        const __gotots_argument_178 = NodeFactory.NewUnscopedHelperName(f, "__asyncValues");
        const __gotots_argument_179 = void 0;
        const __gotots_argument_180 = void 0;
        const __gotots_store_107 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_181 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression]));
        const __gotots_argument_182 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_48, __gotots_argument_178, __gotots_argument_179, __gotots_argument_180, __gotots_argument_181, __gotots_argument_182);
    }
    static NewAwaitHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.awaitHelper);
        const __gotots_store_104 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "NodeFactory");
        const __gotots_argument_173 = NodeFactory.NewUnscopedHelperName(f, "__await");
        const __gotots_argument_174 = void 0;
        const __gotots_argument_175 = void 0;
        const __gotots_store_105 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_176 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression]));
        const __gotots_argument_177 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_47, __gotots_argument_173, __gotots_argument_174, __gotots_argument_175, __gotots_argument_176, __gotots_argument_177);
    }
    static NewAwaiterHelper(f: {
        value: NodeFactory;
    } | undefined, hasLexicalThis: bool, argumentsExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.awaiterHelper);
        let params: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (!(parameters === undefined)) {
            params = parameters;
        }
        else {
            const __gotots_store_178 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            params = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        }
        const __gotots_store_179 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_77 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "NodeFactory");
        const __gotots_argument_297 = void 0;
        const __gotots_store_180 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_298 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory"), KindAsteriskToken$constant__from_ast());
        const __gotots_argument_299 = void 0;
        const __gotots_argument_300 = void 0;
        const __gotots_argument_301 = params;
        const __gotots_argument_302 = void 0;
        const __gotots_argument_303 = void 0;
        const __gotots_argument_304 = body;
        let generatorFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(__gotots_receiver_77, __gotots_argument_297, __gotots_argument_298, __gotots_argument_299, __gotots_argument_300, __gotots_argument_301, __gotots_argument_302, __gotots_argument_303, __gotots_argument_304);
        EmitContext.AddEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, generatorFunc, 2129920);
        let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (hasLexicalThis) {
            const __gotots_store_181 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            thisArg = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "NodeFactory"), KindThisKeyword$constant__from_ast());
        }
        else {
            thisArg = NodeFactory.NewVoidZeroExpression(f);
        }
        let argsArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(argumentsExpression === undefined)) {
            argsArg = argumentsExpression;
        }
        else {
            argsArg = NodeFactory.NewVoidZeroExpression(f);
        }
        const __gotots_store_182 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_78 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "NodeFactory");
        const __gotots_argument_305 = NodeFactory.NewUnscopedHelperName(f, "__awaiter");
        const __gotots_argument_306 = void 0;
        const __gotots_argument_307 = void 0;
        const __gotots_store_183 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_308 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([thisArg, argsArg, NodeFactory.NewVoidZeroExpression(f), generatorFunc]));
        const __gotots_argument_309 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_78, __gotots_argument_305, __gotots_argument_306, __gotots_argument_307, __gotots_argument_308, __gotots_argument_309);
    }
    static NewClassPrivateFieldGetHelper(f: {
        value: NodeFactory;
    } | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, state: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: PrivateIdentifierKind, fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.classPrivateFieldGetHelper);
        let args = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (fn === undefined) {
            const __gotots_slice_element_17 = receiver;
            const __gotots_slice_element_18 = state;
            const __gotots_store_150 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_19 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "NodeFactory"), kind.$value, TokenFlagsNone$constant__from_ast());
            args = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_17, __gotots_slice_element_18, __gotots_slice_element_19]);
        }
        else {
            const __gotots_slice_element_20 = receiver;
            const __gotots_slice_element_21 = state;
            const __gotots_store_151 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_22 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeFactory"), kind.$value, TokenFlagsNone$constant__from_ast());
            const __gotots_slice_element_23 = fn;
            args = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_20, __gotots_slice_element_21, __gotots_slice_element_22, __gotots_slice_element_23]);
        }
        const __gotots_store_152 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_68 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "NodeFactory");
        const __gotots_argument_259 = NodeFactory.NewUnscopedHelperName(f, "__classPrivateFieldGet");
        const __gotots_argument_260 = void 0;
        const __gotots_argument_261 = void 0;
        const __gotots_store_153 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_262 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "NodeFactory"), args);
        const __gotots_argument_263 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_68, __gotots_argument_259, __gotots_argument_260, __gotots_argument_261, __gotots_argument_262, __gotots_argument_263);
    }
    static NewClassPrivateFieldInHelper(f: {
        value: NodeFactory;
    } | undefined, state: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.classPrivateFieldInHelper);
        const __gotots_store_158 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory");
        const __gotots_argument_269 = NodeFactory.NewUnscopedHelperName(f, "__classPrivateFieldIn");
        const __gotots_argument_270 = void 0;
        const __gotots_argument_271 = void 0;
        const __gotots_store_159 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_272 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([state, receiver]));
        const __gotots_argument_273 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_70, __gotots_argument_269, __gotots_argument_270, __gotots_argument_271, __gotots_argument_272, __gotots_argument_273);
    }
    static NewClassPrivateFieldSetHelper(f: {
        value: NodeFactory;
    } | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, state: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: PrivateIdentifierKind, fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.classPrivateFieldSetHelper);
        let args = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (fn === undefined) {
            const __gotots_slice_element_24 = receiver;
            const __gotots_slice_element_25 = state;
            const __gotots_slice_element_26 = value;
            const __gotots_store_154 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_27 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory"), kind.$value, TokenFlagsNone$constant__from_ast());
            args = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_24, __gotots_slice_element_25, __gotots_slice_element_26, __gotots_slice_element_27]);
        }
        else {
            const __gotots_slice_element_28 = receiver;
            const __gotots_slice_element_29 = state;
            const __gotots_slice_element_30 = value;
            const __gotots_store_155 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_31 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "NodeFactory"), kind.$value, TokenFlagsNone$constant__from_ast());
            const __gotots_slice_element_32 = fn;
            args = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_28, __gotots_slice_element_29, __gotots_slice_element_30, __gotots_slice_element_31, __gotots_slice_element_32]);
        }
        const __gotots_store_156 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_69 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
        const __gotots_argument_264 = NodeFactory.NewUnscopedHelperName(f, "__classPrivateFieldSet");
        const __gotots_argument_265 = void 0;
        const __gotots_argument_266 = void 0;
        const __gotots_store_157 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_267 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "NodeFactory"), args);
        const __gotots_argument_268 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_69, __gotots_argument_264, __gotots_argument_265, __gotots_argument_266, __gotots_argument_267, __gotots_argument_268);
    }
    static NewCommaExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_13 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory");
        const __gotots_argument_14 = void 0;
        const __gotots_argument_15 = left;
        const __gotots_argument_16 = void 0;
        const __gotots_store_14 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_17 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), KindCommaToken$constant__from_ast());
        const __gotots_argument_18 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_8, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
    }
    static NewDecorateHelper(f: {
        value: NodeFactory;
    } | undefined, decoratorExpressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.decorateHelper);
        let argumentsArray = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_argument_58 = argumentsArray;
        const __gotots_store_43 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeFactory");
        const __gotots_store_44 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_56 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory"), decoratorExpressions);
        const __gotots_argument_57 = true;
        const __gotots_argument_59 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_20, __gotots_argument_56, __gotots_argument_57);
        argumentsArray = __gotots_argument_58.append(void 0, [__gotots_argument_59]);
        argumentsArray = argumentsArray.append(void 0, [target]);
        if (!(memberName === undefined)) {
            argumentsArray = argumentsArray.append(void 0, [memberName]);
            if (!(descriptor === undefined)) {
                argumentsArray = argumentsArray.append(void 0, [descriptor]);
            }
        }
        const __gotots_store_45 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeFactory");
        const __gotots_argument_60 = NodeFactory.NewUnscopedHelperName(f, "__decorate");
        const __gotots_argument_61 = void 0;
        const __gotots_argument_62 = void 0;
        const __gotots_store_46 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_63 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory"), argumentsArray);
        const __gotots_argument_64 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_21, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64);
    }
    static NewDisposeResourcesHelper(f: {
        value: NodeFactory;
    } | undefined, envBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.disposeResourcesHelper);
        const __gotots_store_163 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory");
        const __gotots_argument_280 = NodeFactory.NewUnscopedHelperName(f, "__disposeResources");
        const __gotots_argument_281 = void 0;
        const __gotots_argument_282 = void 0;
        const __gotots_store_164 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_283 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([envBinding]));
        const __gotots_argument_284 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_73, __gotots_argument_280, __gotots_argument_281, __gotots_argument_282, __gotots_argument_283, __gotots_argument_284);
    }
    static NewESDecorateClassContextObject(f: {
        value: NodeFactory;
    } | undefined, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, metadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_111 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeFactory");
        const __gotots_argument_188 = void 0;
        const __gotots_store_112 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_189 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeFactory"), "kind");
        const __gotots_argument_190 = void 0;
        const __gotots_argument_191 = void 0;
        const __gotots_store_113 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_192 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory"), "class", 0);
        const __gotots_slice_element_6 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_50, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190, __gotots_argument_191, __gotots_argument_192);
        const __gotots_store_114 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_51 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "NodeFactory");
        const __gotots_argument_193 = void 0;
        const __gotots_store_115 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_194 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory"), "name");
        const __gotots_argument_195 = void 0;
        const __gotots_argument_196 = void 0;
        const __gotots_argument_197 = nameExpr;
        const __gotots_slice_element_7 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_51, __gotots_argument_193, __gotots_argument_194, __gotots_argument_195, __gotots_argument_196, __gotots_argument_197);
        const __gotots_store_116 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_52 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "NodeFactory");
        const __gotots_argument_198 = void 0;
        const __gotots_store_117 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_199 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory"), "metadata");
        const __gotots_argument_200 = void 0;
        const __gotots_argument_201 = void 0;
        const __gotots_argument_202 = metadata;
        const __gotots_slice_element_8 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_52, __gotots_argument_198, __gotots_argument_199, __gotots_argument_200, __gotots_argument_201, __gotots_argument_202);
        let props = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6, __gotots_slice_element_7, __gotots_slice_element_8]);
        const __gotots_store_118 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeFactory");
        const __gotots_store_119 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_203 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory"), props);
        const __gotots_argument_204 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_53, __gotots_argument_203, __gotots_argument_204);
    }
    static NewESDecorateClassElementAccessGetMethod(f: {
        value: NodeFactory;
    } | undefined, nameComputed: bool, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (nameComputed) {
            const __gotots_store_204 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_87 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "NodeFactory");
            const __gotots_store_205 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_349 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_205, "NodeFactory"), "obj");
            const __gotots_argument_350 = void 0;
            const __gotots_argument_351 = nameExpr;
            const __gotots_argument_352 = NodeFlagsNone$constant__from_ast();
            __go_accessor = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_87, __gotots_argument_349, __gotots_argument_350, __gotots_argument_351, __gotots_argument_352);
        }
        else {
            const __gotots_store_206 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_88 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeFactory");
            const __gotots_store_207 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_353 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_207, "NodeFactory"), "obj");
            const __gotots_argument_354 = void 0;
            const __gotots_argument_355 = nameExpr;
            const __gotots_argument_356 = NodeFlagsNone$constant__from_ast();
            __go_accessor = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_88, __gotots_argument_353, __gotots_argument_354, __gotots_argument_355, __gotots_argument_356);
        }
        const __gotots_store_208 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_89 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory");
        const __gotots_argument_357 = void 0;
        const __gotots_argument_358 = void 0;
        const __gotots_store_209 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_359 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_209, "NodeFactory"), "obj");
        const __gotots_argument_360 = void 0;
        const __gotots_argument_361 = void 0;
        const __gotots_argument_362 = void 0;
        let objParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_89, __gotots_argument_357, __gotots_argument_358, __gotots_argument_359, __gotots_argument_360, __gotots_argument_361, __gotots_argument_362);
        const __gotots_store_210 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_90 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "NodeFactory");
        const __gotots_argument_363 = void 0;
        const __gotots_argument_364 = void 0;
        const __gotots_store_211 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_365 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([objParam]));
        const __gotots_argument_366 = void 0;
        const __gotots_argument_367 = void 0;
        const __gotots_store_212 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_368 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_212, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
        const __gotots_argument_369 = __go_accessor;
        let arrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_90, __gotots_argument_363, __gotots_argument_364, __gotots_argument_365, __gotots_argument_366, __gotots_argument_367, __gotots_argument_368, __gotots_argument_369);
        const __gotots_store_213 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_91 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "NodeFactory");
        const __gotots_argument_370 = void 0;
        const __gotots_store_214 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_371 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_214, "NodeFactory"), "get");
        const __gotots_argument_372 = void 0;
        const __gotots_argument_373 = void 0;
        const __gotots_argument_374 = arrow;
        return NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_91, __gotots_argument_370, __gotots_argument_371, __gotots_argument_372, __gotots_argument_373, __gotots_argument_374);
    }
    static NewESDecorateClassElementAccessHasMethod(f: {
        value: NodeFactory;
    } | undefined, nameComputed: bool, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!nameComputed && !(nameExpr === undefined) && IsIdentifier__from_ast(nameExpr)) {
            propertyName = NodeFactory.NewStringLiteralFromNode(f, nameExpr);
        }
        else {
            propertyName = nameExpr;
        }
        const __gotots_store_194 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_83 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_194, "NodeFactory");
        const __gotots_argument_326 = void 0;
        const __gotots_argument_327 = void 0;
        const __gotots_store_195 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_328 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "NodeFactory"), "obj");
        const __gotots_argument_329 = void 0;
        const __gotots_argument_330 = void 0;
        const __gotots_argument_331 = void 0;
        let objParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_83, __gotots_argument_326, __gotots_argument_327, __gotots_argument_328, __gotots_argument_329, __gotots_argument_330, __gotots_argument_331);
        const __gotots_store_196 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_84 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "NodeFactory");
        const __gotots_argument_332 = void 0;
        const __gotots_argument_333 = propertyName;
        const __gotots_argument_334 = void 0;
        const __gotots_store_197 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_335 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory"), KindInKeyword$constant__from_ast());
        const __gotots_store_198 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_336 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "NodeFactory"), "obj");
        let inExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_84, __gotots_argument_332, __gotots_argument_333, __gotots_argument_334, __gotots_argument_335, __gotots_argument_336);
        const __gotots_store_199 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_85 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory");
        const __gotots_argument_337 = void 0;
        const __gotots_argument_338 = void 0;
        const __gotots_store_200 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_339 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([objParam]));
        const __gotots_argument_340 = void 0;
        const __gotots_argument_341 = void 0;
        const __gotots_store_201 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_342 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
        const __gotots_argument_343 = inExpr;
        let arrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_85, __gotots_argument_337, __gotots_argument_338, __gotots_argument_339, __gotots_argument_340, __gotots_argument_341, __gotots_argument_342, __gotots_argument_343);
        const __gotots_store_202 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_86 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "NodeFactory");
        const __gotots_argument_344 = void 0;
        const __gotots_store_203 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_345 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeFactory"), "has");
        const __gotots_argument_346 = void 0;
        const __gotots_argument_347 = void 0;
        const __gotots_argument_348 = arrow;
        return NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_86, __gotots_argument_344, __gotots_argument_345, __gotots_argument_346, __gotots_argument_347, __gotots_argument_348);
    }
    static NewESDecorateClassElementAccessObject(f: {
        value: NodeFactory;
    } | undefined, nameComputed: bool, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, hasGet: bool, hasSet: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let accessProps = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        accessProps = accessProps.append(void 0, [NodeFactory.NewESDecorateClassElementAccessHasMethod(f, nameComputed, nameExpr)]);
        if (hasGet) {
            accessProps = accessProps.append(void 0, [NodeFactory.NewESDecorateClassElementAccessGetMethod(f, nameComputed, nameExpr)]);
        }
        if (hasSet) {
            accessProps = accessProps.append(void 0, [NodeFactory.NewESDecorateClassElementAccessSetMethod(f, nameComputed, nameExpr)]);
        }
        const __gotots_store_191 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_82 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "NodeFactory");
        const __gotots_store_192 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_323 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_192, "NodeFactory"), accessProps);
        const __gotots_argument_324 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_82, __gotots_argument_323, __gotots_argument_324);
    }
    static NewESDecorateClassElementAccessSetMethod(f: {
        value: NodeFactory;
    } | undefined, nameComputed: bool, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (nameComputed) {
            const __gotots_store_215 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_92 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_215, "NodeFactory");
            const __gotots_store_216 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_375 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory"), "obj");
            const __gotots_argument_376 = void 0;
            const __gotots_argument_377 = nameExpr;
            const __gotots_argument_378 = NodeFlagsNone$constant__from_ast();
            __go_accessor = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_92, __gotots_argument_375, __gotots_argument_376, __gotots_argument_377, __gotots_argument_378);
        }
        else {
            const __gotots_store_217 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_93 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_217, "NodeFactory");
            const __gotots_store_218 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_379 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeFactory"), "obj");
            const __gotots_argument_380 = void 0;
            const __gotots_argument_381 = nameExpr;
            const __gotots_argument_382 = NodeFlagsNone$constant__from_ast();
            __go_accessor = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_93, __gotots_argument_379, __gotots_argument_380, __gotots_argument_381, __gotots_argument_382);
        }
        const __gotots_receiver_94 = f;
        const __gotots_argument_383 = __go_accessor;
        const __gotots_store_219 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_384 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_219, "NodeFactory"), "value");
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory.NewAssignmentExpression(__gotots_receiver_94, __gotots_argument_383, __gotots_argument_384);
        const __gotots_store_220 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_220, "NodeFactory"), assignment);
        const __gotots_store_221 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_95 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_221, "NodeFactory");
        const __gotots_store_222 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_385 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_222, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([stmt]));
        const __gotots_argument_386 = false;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_95, __gotots_argument_385, __gotots_argument_386);
        const __gotots_store_223 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_96 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_223, "NodeFactory");
        const __gotots_argument_387 = void 0;
        const __gotots_argument_388 = void 0;
        const __gotots_store_224 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_389 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_224, "NodeFactory"), "obj");
        const __gotots_argument_390 = void 0;
        const __gotots_argument_391 = void 0;
        const __gotots_argument_392 = void 0;
        let objParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_96, __gotots_argument_387, __gotots_argument_388, __gotots_argument_389, __gotots_argument_390, __gotots_argument_391, __gotots_argument_392);
        const __gotots_store_225 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_97 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "NodeFactory");
        const __gotots_argument_393 = void 0;
        const __gotots_argument_394 = void 0;
        const __gotots_store_226 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_395 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_226, "NodeFactory"), "value");
        const __gotots_argument_396 = void 0;
        const __gotots_argument_397 = void 0;
        const __gotots_argument_398 = void 0;
        let valueParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_97, __gotots_argument_393, __gotots_argument_394, __gotots_argument_395, __gotots_argument_396, __gotots_argument_397, __gotots_argument_398);
        const __gotots_store_227 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_98 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_227, "NodeFactory");
        const __gotots_argument_399 = void 0;
        const __gotots_argument_400 = void 0;
        const __gotots_store_228 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_401 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_228, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([objParam, valueParam]));
        const __gotots_argument_402 = void 0;
        const __gotots_argument_403 = void 0;
        const __gotots_store_229 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_404 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
        const __gotots_argument_405 = body;
        let arrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_98, __gotots_argument_399, __gotots_argument_400, __gotots_argument_401, __gotots_argument_402, __gotots_argument_403, __gotots_argument_404, __gotots_argument_405);
        const __gotots_store_230 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_99 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_230, "NodeFactory");
        const __gotots_argument_406 = void 0;
        const __gotots_store_231 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_407 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_231, "NodeFactory"), "set");
        const __gotots_argument_408 = void 0;
        const __gotots_argument_409 = void 0;
        const __gotots_argument_410 = arrow;
        return NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_99, __gotots_argument_406, __gotots_argument_407, __gotots_argument_408, __gotots_argument_409, __gotots_argument_410);
    }
    static NewESDecorateClassElementContextObject(f: {
        value: NodeFactory;
    } | undefined, kind: gostring, nameComputed: bool, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isStatic: bool, isPrivate: bool, hasGet: bool, hasSet: bool, metadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nameValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!nameComputed && !(nameExpr === undefined) && (IsPrivateIdentifier__from_ast(nameExpr) || IsIdentifier__from_ast(nameExpr))) {
            nameValue = NodeFactory.NewStringLiteralFromNode(f, nameExpr);
        }
        else {
            nameValue = nameExpr;
        }
        let accessObj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory.NewESDecorateClassElementAccessObject(f, nameComputed, nameExpr, hasGet, hasSet);
        let staticExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isStatic) {
            staticExpr = NodeFactory.NewTrueExpression(f);
        }
        else {
            staticExpr = NodeFactory.NewFalseExpression(f);
        }
        let privateExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isPrivate) {
            privateExpr = NodeFactory.NewTrueExpression(f);
        }
        else {
            privateExpr = NodeFactory.NewFalseExpression(f);
        }
        const __gotots_store_122 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "NodeFactory");
        const __gotots_argument_210 = void 0;
        const __gotots_store_123 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_211 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "NodeFactory"), "kind");
        const __gotots_argument_212 = void 0;
        const __gotots_argument_213 = void 0;
        const __gotots_store_124 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_214 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeFactory"), kind, 0);
        const __gotots_slice_element_9 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_55, __gotots_argument_210, __gotots_argument_211, __gotots_argument_212, __gotots_argument_213, __gotots_argument_214);
        const __gotots_store_125 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_56 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "NodeFactory");
        const __gotots_argument_215 = void 0;
        const __gotots_store_126 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_216 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory"), "name");
        const __gotots_argument_217 = void 0;
        const __gotots_argument_218 = void 0;
        const __gotots_argument_219 = nameValue;
        const __gotots_slice_element_10 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_56, __gotots_argument_215, __gotots_argument_216, __gotots_argument_217, __gotots_argument_218, __gotots_argument_219);
        const __gotots_store_127 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_57 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "NodeFactory");
        const __gotots_argument_220 = void 0;
        const __gotots_store_128 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_221 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory"), "static");
        const __gotots_argument_222 = void 0;
        const __gotots_argument_223 = void 0;
        const __gotots_argument_224 = staticExpr;
        const __gotots_slice_element_11 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_57, __gotots_argument_220, __gotots_argument_221, __gotots_argument_222, __gotots_argument_223, __gotots_argument_224);
        const __gotots_store_129 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_58 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory");
        const __gotots_argument_225 = void 0;
        const __gotots_store_130 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_226 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory"), "private");
        const __gotots_argument_227 = void 0;
        const __gotots_argument_228 = void 0;
        const __gotots_argument_229 = privateExpr;
        const __gotots_slice_element_12 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_58, __gotots_argument_225, __gotots_argument_226, __gotots_argument_227, __gotots_argument_228, __gotots_argument_229);
        const __gotots_store_131 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_59 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeFactory");
        const __gotots_argument_230 = void 0;
        const __gotots_store_132 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_231 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory"), "access");
        const __gotots_argument_232 = void 0;
        const __gotots_argument_233 = void 0;
        const __gotots_argument_234 = accessObj;
        const __gotots_slice_element_13 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_59, __gotots_argument_230, __gotots_argument_231, __gotots_argument_232, __gotots_argument_233, __gotots_argument_234);
        const __gotots_store_133 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_60 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "NodeFactory");
        const __gotots_argument_235 = void 0;
        const __gotots_store_134 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_236 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory"), "metadata");
        const __gotots_argument_237 = void 0;
        const __gotots_argument_238 = void 0;
        const __gotots_argument_239 = metadata;
        const __gotots_slice_element_14 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_60, __gotots_argument_235, __gotots_argument_236, __gotots_argument_237, __gotots_argument_238, __gotots_argument_239);
        let props = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_9, __gotots_slice_element_10, __gotots_slice_element_11, __gotots_slice_element_12, __gotots_slice_element_13, __gotots_slice_element_14]);
        const __gotots_store_135 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_61 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory");
        const __gotots_store_136 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_240 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeFactory"), props);
        const __gotots_argument_241 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_61, __gotots_argument_240, __gotots_argument_241);
    }
    static NewESDecorateHelper(f: {
        value: NodeFactory;
    } | undefined, ctor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptorIn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, decorators: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextIn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializers: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, extraInitializers: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.esDecorateHelper);
        const __gotots_store_120 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "NodeFactory");
        const __gotots_argument_205 = NodeFactory.NewUnscopedHelperName(f, "__esDecorate");
        const __gotots_argument_206 = void 0;
        const __gotots_argument_207 = void 0;
        const __gotots_store_121 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_208 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers]));
        const __gotots_argument_209 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_54, __gotots_argument_205, __gotots_argument_206, __gotots_argument_207, __gotots_argument_208, __gotots_argument_209);
    }
    static NewExportDefault(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_16 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory"), void 0, false, void 0, expression);
    }
    static NewExportStarHelper(f: {
        value: NodeFactory;
    } | undefined, moduleExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportsExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.exportStarHelper);
        const __gotots_store_23 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory");
        const __gotots_argument_25 = NodeFactory.NewUnscopedHelperName(f, "__exportStar");
        const __gotots_argument_26 = void 0;
        const __gotots_argument_27 = void 0;
        const __gotots_store_24 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_28 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([moduleExpression, exportsExpression]));
        const __gotots_argument_29 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_11, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
    }
    static NewExternalModuleExport(f: {
        value: NodeFactory;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_17 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), false, void 0, name);
        const __gotots_store_18 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory");
        const __gotots_store_19 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_19 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([specifier]));
        let namedExports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_9, __gotots_argument_19);
        const __gotots_store_20 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewExportDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), void 0, false, namedExports, void 0, void 0);
    }
    static NewFalseExpression(f: {
        value: NodeFactory;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_28 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), KindFalseKeyword$constant__from_ast());
    }
    static NewFunctionBindCall(f: {
        value: NodeFactory;
    } | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, argumentsList: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let args = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1 + argumentsList.length, void 0);
        args = args.append(void 0, [thisArg]);
        args = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(args, argumentsList, void 0);
        const __gotots_receiver_40 = f;
        const __gotots_argument_146 = target;
        const __gotots_store_88 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_147 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "NodeFactory"), "bind");
        const __gotots_argument_148 = args;
        return NodeFactory.NewMethodCall(__gotots_receiver_40, __gotots_argument_146, __gotots_argument_147, __gotots_argument_148);
    }
    static NewFunctionCallCall(f: {
        value: NodeFactory;
    } | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, argumentsList: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (thisArg === undefined) {
            const __gotots_argument_142 = new $goInterfaceAdapter$string("Attempted to construct function call call without this argument expression");
            GoPanic.raise(__gotots_argument_142 === undefined ? GoPanicNilValue.create() : __gotots_argument_142);
        }
        let args = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([thisArg]), argumentsList, void 0);
        const __gotots_receiver_39 = f;
        const __gotots_argument_143 = target;
        const __gotots_store_87 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_144 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeFactory"), "call");
        const __gotots_argument_145 = args;
        return NodeFactory.NewMethodCall(__gotots_receiver_39, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145);
    }
    static NewGeneratedNameForNode(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.NewGeneratedNameForNodeEx(f, node, new AutoGenerateOptions(new GeneratedIdentifierFlags(0), "", ""));
    }
    static NewGeneratedNameForNodeEx(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (options.Prefix.length > 0 || options.Suffix.length > 0) {
            const __gotots_store_11 = options;
            __gotots_store_11.Flags = new GeneratedIdentifierFlags(__gotots_store_11.Flags.$value | 16);
        }
        return NodeFactory.$go$private$printer$newGeneratedIdentifier(f, new GeneratedIdentifierFlags(GeneratedIdentifierFlagsNode$int), "", node, AutoGenerateOptions.$copy(options));
    }
    static NewGeneratedPrivateNameForNodeEx(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (options.Prefix.length > 0 || options.Suffix.length > 0) {
            const __gotots_store_137 = options;
            __gotots_store_137.Flags = new GeneratedIdentifierFlags(__gotots_store_137.Flags.$value | 16);
        }
        return NodeFactory.$go$private$printer$newGeneratedPrivateIdentifier(f, new GeneratedIdentifierFlags(GeneratedIdentifierFlagsNode$int), "", node, AutoGenerateOptions.$copy(options));
    }
    static NewGlobalMethodCall(f: {
        value: NodeFactory;
    } | undefined, globalObjectName: gostring, methodName: gostring, argumentsList: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_79 = f;
        const __gotots_store_184 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_310 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "NodeFactory"), globalObjectName);
        const __gotots_store_185 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_311 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory"), methodName);
        const __gotots_argument_312 = argumentsList;
        return NodeFactory.NewMethodCall(__gotots_receiver_79, __gotots_argument_310, __gotots_argument_311, __gotots_argument_312);
    }
    static NewImmediatelyInvokedArrowFunction(f: {
        value: NodeFactory;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_91 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "NodeFactory");
        const __gotots_argument_156 = void 0;
        const __gotots_argument_157 = void 0;
        const __gotots_store_92 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_158 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_159 = void 0;
        const __gotots_argument_160 = void 0;
        const __gotots_store_93 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_161 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
        const __gotots_store_94 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeFactory");
        const __gotots_store_95 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_154 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeFactory"), statements);
        const __gotots_argument_155 = true;
        const __gotots_argument_162 = NodeFactory__from_ast.NewBlock(__gotots_receiver_42, __gotots_argument_154, __gotots_argument_155);
        let arrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_43, __gotots_argument_156, __gotots_argument_157, __gotots_argument_158, __gotots_argument_159, __gotots_argument_160, __gotots_argument_161, __gotots_argument_162);
        const __gotots_store_96 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "NodeFactory");
        const __gotots_store_97 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_163 = NodeFactory__from_ast.NewParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeFactory"), arrow);
        const __gotots_argument_164 = void 0;
        const __gotots_argument_165 = void 0;
        const __gotots_store_98 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_166 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_167 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_44, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165, __gotots_argument_166, __gotots_argument_167);
    }
    static NewImportDefaultHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.importDefaultHelper);
        const __gotots_store_21 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
        const __gotots_argument_20 = NodeFactory.NewUnscopedHelperName(f, "__importDefault");
        const __gotots_argument_21 = void 0;
        const __gotots_argument_22 = void 0;
        const __gotots_store_22 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_23 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression]));
        const __gotots_argument_24 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_10, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
    }
    static NewImportStarHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.importStarHelper);
        const __gotots_store_33 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory");
        const __gotots_argument_36 = NodeFactory.NewUnscopedHelperName(f, "__importStar");
        const __gotots_argument_37 = void 0;
        const __gotots_argument_38 = void 0;
        const __gotots_store_34 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_39 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expression]));
        const __gotots_argument_40 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_14, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
    }
    static NewLogicalANDExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_75 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory");
        const __gotots_argument_119 = void 0;
        const __gotots_argument_120 = left;
        const __gotots_argument_121 = void 0;
        const __gotots_store_76 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_122 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeFactory"), KindAmpersandAmpersandToken$constant__from_ast());
        const __gotots_argument_123 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_34, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123);
    }
    static NewLogicalORExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_4 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory");
        const __gotots_argument_6 = void 0;
        const __gotots_argument_7 = left;
        const __gotots_argument_8 = void 0;
        const __gotots_store_5 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_9 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), KindBarBarToken$constant__from_ast());
        const __gotots_argument_10 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_4, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    }
    static NewMetadataHelper(f: {
        value: NodeFactory;
    } | undefined, metadataKey: gostring, metadataValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.metadataHelper);
        const __gotots_store_40 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory");
        const __gotots_argument_51 = NodeFactory.NewUnscopedHelperName(f, "__metadata");
        const __gotots_argument_52 = void 0;
        const __gotots_argument_53 = void 0;
        const __gotots_store_41 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory");
        const __gotots_store_42 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_2 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory"), metadataKey, TokenFlagsNone$constant__from_ast());
        const __gotots_slice_element_3 = metadataValue;
        const __gotots_argument_50 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2, __gotots_slice_element_3]);
        const __gotots_argument_54 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_18, __gotots_argument_50);
        const __gotots_argument_55 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_19, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
    }
    static NewMethodCall(f: {
        value: NodeFactory;
    } | undefined, __go_object: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, methodName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, argumentsList: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsCallExpression__from_ast(__go_object) && (!((Node__from_ast.$storageOf(((__go_object ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0))) {
            const __gotots_store_64 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "NodeFactory");
            const __gotots_store_65 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_98 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory"), __go_object, void 0, methodName, NodeFlagsNone$constant__from_ast());
            const __gotots_argument_99 = void 0;
            const __gotots_argument_100 = void 0;
            const __gotots_store_66 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_101 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NodeFactory"), argumentsList);
            const __gotots_argument_102 = NodeFlagsOptionalChain$constant__from_ast();
            return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_29, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102);
        }
        const __gotots_store_67 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
        const __gotots_store_68 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_103 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "NodeFactory"), __go_object, void 0, methodName, NodeFlagsNone$constant__from_ast());
        const __gotots_argument_104 = void 0;
        const __gotots_argument_105 = void 0;
        const __gotots_store_69 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_106 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory"), argumentsList);
        const __gotots_argument_107 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_30, __gotots_argument_103, __gotots_argument_104, __gotots_argument_105, __gotots_argument_106, __gotots_argument_107);
    }
    static NewObjectDefinePropertyCall(f: {
        value: NodeFactory;
    } | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_232 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_101 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_232, "NodeFactory");
        const __gotots_store_233 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_100 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_233, "NodeFactory");
        const __gotots_store_234 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_411 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_234, "NodeFactory"), "Object");
        const __gotots_argument_412 = void 0;
        const __gotots_store_235 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_413 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_235, "NodeFactory"), "defineProperty");
        const __gotots_argument_414 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_415 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_100, __gotots_argument_411, __gotots_argument_412, __gotots_argument_413, __gotots_argument_414);
        const __gotots_argument_416 = void 0;
        const __gotots_argument_417 = void 0;
        const __gotots_store_236 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_418 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_236, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([target, name, descriptor]));
        const __gotots_argument_419 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_101, __gotots_argument_415, __gotots_argument_416, __gotots_argument_417, __gotots_argument_418, __gotots_argument_419);
    }
    static NewParamHelper(f: {
        value: NodeFactory;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parameterOffset: int, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.paramHelper);
        const __gotots_store_70 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeFactory");
        const __gotots_argument_109 = NodeFactory.NewUnscopedHelperName(f, "__param");
        const __gotots_argument_110 = void 0;
        const __gotots_argument_111 = void 0;
        const __gotots_store_71 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeFactory");
        const __gotots_store_72 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_4 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeFactory"), strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(parameterOffset))), TokenFlagsNone$constant__from_ast());
        const __gotots_slice_element_5 = expression;
        const __gotots_argument_108 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_4, __gotots_slice_element_5]);
        const __gotots_argument_112 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_31, __gotots_argument_108);
        const __gotots_argument_113 = NodeFlagsNone$constant__from_ast();
        let helper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_32, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113);
        Node__from_ast.$storageOf(((helper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        return helper;
    }
    static NewPropKeyHelper(f: {
        value: NodeFactory;
    } | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.propKeyHelper);
        const __gotots_store_189 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_81 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "NodeFactory");
        const __gotots_argument_318 = NodeFactory.NewUnscopedHelperName(f, "__propKey");
        const __gotots_argument_319 = void 0;
        const __gotots_argument_320 = void 0;
        const __gotots_store_190 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_321 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([expr]));
        const __gotots_argument_322 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_81, __gotots_argument_318, __gotots_argument_319, __gotots_argument_320, __gotots_argument_321, __gotots_argument_322);
    }
    static NewReflectGetCall(f: {
        value: NodeFactory;
    } | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, propertyKey: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_77 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "NodeFactory");
        const __gotots_store_78 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "NodeFactory");
        const __gotots_store_79 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_124 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NodeFactory"), "Reflect");
        const __gotots_argument_125 = void 0;
        const __gotots_store_80 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_126 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "NodeFactory"), "get");
        const __gotots_argument_127 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_128 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_35, __gotots_argument_124, __gotots_argument_125, __gotots_argument_126, __gotots_argument_127);
        const __gotots_argument_129 = void 0;
        const __gotots_argument_130 = void 0;
        const __gotots_store_81 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_131 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([target, propertyKey, receiver]));
        const __gotots_argument_132 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_36, __gotots_argument_128, __gotots_argument_129, __gotots_argument_130, __gotots_argument_131, __gotots_argument_132);
    }
    static NewReflectSetCall(f: {
        value: NodeFactory;
    } | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, propertyKey: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_82 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "NodeFactory");
        const __gotots_store_83 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "NodeFactory");
        const __gotots_store_84 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_133 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "NodeFactory"), "Reflect");
        const __gotots_argument_134 = void 0;
        const __gotots_store_85 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_135 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "NodeFactory"), "set");
        const __gotots_argument_136 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_137 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_37, __gotots_argument_133, __gotots_argument_134, __gotots_argument_135, __gotots_argument_136);
        const __gotots_argument_138 = void 0;
        const __gotots_argument_139 = void 0;
        const __gotots_store_86 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_140 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([target, propertyKey, value, receiver]));
        const __gotots_argument_141 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_38, __gotots_argument_137, __gotots_argument_138, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141);
    }
    static NewRestHelper(f: {
        value: NodeFactory;
    } | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, computedTempVariables: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.restHelper);
        let propertyNames = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let computedTempVariableOffset = 0;
        const __gotots_range_5 = elements;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_7 = __gotots_range_index_5;
            const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_5);
            let i = __gotots_range_value_7;
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            if (i === elements.length - 1) {
                break;
            }
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetPropertyNameOfBindingOrAssignmentElement__from_ast(element);
            if (!(propertyName === undefined)) {
                if (IsComputedPropertyName__from_ast(propertyName)) {
                    Assert__from_debug(!computedTempVariables.isNil(), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Encountered computed property name but 'computedTempVariables' argument was not provided.")]));
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = computedTempVariables.get(computedTempVariableOffset);
                    computedTempVariableOffset++;
                    const __gotots_argument_84 = propertyNames;
                    const __gotots_store_52 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory");
                    const __gotots_argument_79 = NodeFactory.NewTypeCheck(f, temp, "symbol");
                    const __gotots_store_53 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_80 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeFactory"), KindQuestionToken$constant__from_ast());
                    const __gotots_argument_81 = temp;
                    const __gotots_store_54 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_82 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory"), KindColonToken$constant__from_ast());
                    const __gotots_store_55 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "NodeFactory");
                    const __gotots_argument_74 = void 0;
                    const __gotots_argument_75 = temp;
                    const __gotots_argument_76 = void 0;
                    const __gotots_store_56 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_77 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "NodeFactory"), KindPlusToken$constant__from_ast());
                    const __gotots_store_57 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_78 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeFactory"), "", TokenFlagsNone$constant__from_ast());
                    const __gotots_argument_83 = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_24, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78);
                    const __gotots_argument_85 = NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_25, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82, __gotots_argument_83);
                    propertyNames = __gotots_argument_84.append(void 0, [__gotots_argument_85]);
                }
                else {
                    propertyNames = propertyNames.append(void 0, [NodeFactory.NewStringLiteralFromNode(f, propertyName)]);
                }
            }
        }
        const __gotots_store_58 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory");
        const __gotots_store_59 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_86 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeFactory"), propertyNames);
        const __gotots_argument_87 = false;
        let propNames: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_26, __gotots_argument_86, __gotots_argument_87);
        Node__from_ast.$storageOf(((propNames ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        const __gotots_store_60 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeFactory");
        const __gotots_argument_88 = NodeFactory.NewUnscopedHelperName(f, "__rest");
        const __gotots_argument_89 = void 0;
        const __gotots_argument_90 = void 0;
        const __gotots_store_61 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_91 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([value, propNames]));
        const __gotots_argument_92 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_27, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92);
    }
    static NewRewriteRelativeImportExtensionsHelper(f: {
        value: NodeFactory;
    } | undefined, firstArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, preserveJsx: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.rewriteRelativeImportExtensionsHelper);
        let __go_arguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (preserveJsx) {
            const __gotots_slice_element_0 = firstArgument;
            const __gotots_store_30 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_1 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), KindTrueKeyword$constant__from_ast());
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0, __gotots_slice_element_1]);
        }
        else {
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([firstArgument]);
        }
        const __gotots_store_31 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeFactory");
        const __gotots_argument_31 = NodeFactory.NewUnscopedHelperName(f, "__rewriteRelativeImportExtension");
        const __gotots_argument_32 = void 0;
        const __gotots_argument_33 = void 0;
        const __gotots_store_32 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_34 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), __go_arguments);
        const __gotots_argument_35 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_13, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
    }
    static NewRunInitializersHelper(f: {
        value: NodeFactory;
    } | undefined, thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializers: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.runInitializersHelper);
        let __go_arguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(value === undefined)) {
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([thisArg, initializers, value]);
        }
        else {
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([thisArg, initializers]);
        }
        const __gotots_store_89 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_41 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "NodeFactory");
        const __gotots_argument_149 = NodeFactory.NewUnscopedHelperName(f, "__runInitializers");
        const __gotots_argument_150 = void 0;
        const __gotots_argument_151 = void 0;
        const __gotots_store_90 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_152 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeFactory"), __go_arguments);
        const __gotots_argument_153 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_41, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153);
    }
    static NewSetFunctionNameHelper(f: {
        value: NodeFactory;
    } | undefined, fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, prefix: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.setFunctionNameHelper);
        let __go_arguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (prefix.length > 0) {
            const __gotots_slice_element_39 = fn;
            const __gotots_slice_element_40 = name;
            const __gotots_store_186 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_41 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "NodeFactory"), prefix, TokenFlagsNone$constant__from_ast());
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_39, __gotots_slice_element_40, __gotots_slice_element_41]);
        }
        else {
            __go_arguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([fn, name]);
        }
        const __gotots_store_187 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_80 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "NodeFactory");
        const __gotots_argument_313 = NodeFactory.NewUnscopedHelperName(f, "__setFunctionName");
        const __gotots_argument_314 = void 0;
        const __gotots_argument_315 = void 0;
        const __gotots_store_188 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_316 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "NodeFactory"), __go_arguments);
        const __gotots_argument_317 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_80, __gotots_argument_313, __gotots_argument_314, __gotots_argument_315, __gotots_argument_316, __gotots_argument_317);
    }
    static NewStrictEqualityExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_35 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory");
        const __gotots_argument_41 = void 0;
        const __gotots_argument_42 = left;
        const __gotots_argument_43 = void 0;
        const __gotots_store_36 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_44 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory"), KindEqualsEqualsEqualsToken$constant__from_ast());
        const __gotots_argument_45 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_15, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45);
    }
    static NewStrictInequalityExpression(f: {
        value: NodeFactory;
    } | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_73 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "NodeFactory");
        const __gotots_argument_114 = void 0;
        const __gotots_argument_115 = left;
        const __gotots_argument_116 = void 0;
        const __gotots_store_74 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_117 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeFactory"), KindExclamationEqualsEqualsToken$constant__from_ast());
        const __gotots_argument_118 = right;
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_33, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118);
    }
    static NewStringLiteralFromNode(f: {
        value: NodeFactory;
    } | undefined, textSourceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let text = "";
        switch (Node__from_ast.$storageOf(((textSourceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast():
            case KindPrivateIdentifier$constant__from_ast():
            case KindJsxNamespacedName$constant__from_ast():
            case KindStringLiteral$constant__from_ast():
            case KindNumericLiteral$constant__from_ast():
            case KindBigIntLiteral$constant__from_ast():
            case KindNoSubstitutionTemplateLiteral$constant__from_ast():
            case KindTemplateHead$constant__from_ast():
            case KindTemplateMiddle$constant__from_ast():
            case KindTemplateTail$constant__from_ast():
            case KindRegularExpressionLiteral$constant__from_ast(): {
                text = Node__from_ast.Text(textSourceNode);
                break;
            }
        }
        const __gotots_store_1 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory"), text, TokenFlagsNone$constant__from_ast());
        if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.textSource.isNil()) {
            ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.textSource = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.make(0, []);
        }
        ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.textSource.store(node, textSourceNode);
        return node;
    }
    static NewTempVariable(f: {
        value: NodeFactory;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.NewTempVariableEx(f, new AutoGenerateOptions(new GeneratedIdentifierFlags(0), "", ""));
    }
    static NewTempVariableEx(f: {
        value: NodeFactory;
    } | undefined, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.$go$private$printer$newGeneratedIdentifier(f, new GeneratedIdentifierFlags(GeneratedIdentifierFlagsAuto$int), "", void 0, AutoGenerateOptions.$copy(options));
    }
    static NewTemplateObjectHelper(f: {
        value: NodeFactory;
    } | undefined, cookedArray: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, rawArray: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.RequestEmitHelper((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, $state.makeTemplateObjectHelper);
        const __gotots_store_176 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_76 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "NodeFactory");
        const __gotots_argument_292 = NodeFactory.NewUnscopedHelperName(f, "__makeTemplateObject");
        const __gotots_argument_293 = void 0;
        const __gotots_argument_294 = void 0;
        const __gotots_store_177 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_295 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([cookedArray, rawArray]));
        const __gotots_argument_296 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_76, __gotots_argument_292, __gotots_argument_293, __gotots_argument_294, __gotots_argument_295, __gotots_argument_296);
    }
    static NewThisExpression(f: {
        value: NodeFactory;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_12 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), KindThisKeyword$constant__from_ast());
    }
    static NewTrueExpression(f: {
        value: NodeFactory;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_27 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory"), KindTrueKeyword$constant__from_ast());
    }
    static NewTypeCheck(f: {
        value: NodeFactory;
    } | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tag: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (tag === "null") {
            const __gotots_receiver_16 = f;
            const __gotots_argument_46 = value;
            const __gotots_store_37 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_47 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeFactory"), KindNullKeyword$constant__from_ast());
            return NodeFactory.NewStrictEqualityExpression(__gotots_receiver_16, __gotots_argument_46, __gotots_argument_47);
        }
        else if (tag === "undefined") {
            return NodeFactory.NewStrictEqualityExpression(f, value, NodeFactory.NewVoidZeroExpression(f));
        }
        else {
            const __gotots_receiver_17 = f;
            const __gotots_store_38 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_48 = NodeFactory__from_ast.NewTypeOfExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeFactory"), value);
            const __gotots_store_39 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_49 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), tag, TokenFlagsNone$constant__from_ast());
            return NodeFactory.NewStrictEqualityExpression(__gotots_receiver_17, __gotots_argument_48, __gotots_argument_49);
        }
    }
    static NewUniqueName(f: {
        value: NodeFactory;
    } | undefined, text: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.NewUniqueNameEx(f, text, new AutoGenerateOptions(new GeneratedIdentifierFlags(0), "", ""));
    }
    static NewUniqueNameEx(f: {
        value: NodeFactory;
    } | undefined, text: gostring, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory.$go$private$printer$newGeneratedIdentifier(f, new GeneratedIdentifierFlags(GeneratedIdentifierFlagsUnique$int), text, void 0, AutoGenerateOptions.$copy(options));
    }
    static NewUnscopedHelperName(f: {
        value: NodeFactory;
    } | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_29 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), name);
        EmitContext.SetEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, node, EFHelperName$constant());
        return node;
    }
    static NewVoidZeroExpression(f: {
        value: NodeFactory;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_25 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory");
        const __gotots_store_26 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_30 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), "0", TokenFlagsNone$constant__from_ast());
        return NodeFactory__from_ast.NewVoidExpression(__gotots_receiver_12, __gotots_argument_30);
    }
    static RestoreEnclosingLabel(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, outermostLabeledStatement: {
        value: LabeledStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (outermostLabeledStatement === undefined) {
            return node;
        }
        let innerLabel: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
        if (IsLabeledStatement__from_ast((outermostLabeledStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement)) {
            innerLabel = NodeFactory.RestoreEnclosingLabel(f, node, Node__from_ast.AsLabeledStatement((outermostLabeledStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement));
        }
        const __gotots_store_110 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateLabeledStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "NodeFactory"), outermostLabeledStatement, (outermostLabeledStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label, innerLabel);
    }
    static RestoreOuterExpressions(f: {
        value: NodeFactory;
    } | undefined, outerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kinds: OuterExpressionKinds__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(outerExpression === undefined) && IsOuterExpression__from_ast(outerExpression, kinds) && !NodeFactory.$go$private$printer$isIgnorableParen(f, outerExpression)) {
            return NodeFactory.$go$private$printer$updateOuterExpression(f, outerExpression, NodeFactory.RestoreOuterExpressions(f, Node__from_ast.Expression(outerExpression), innerExpression, OEKAll$constant__from_ast()));
        }
        return innerExpression;
    }
    static SplitCustomPrologue(f: {
        value: NodeFactory;
    } | undefined, source: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
    ] {
        let prologue: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let rest: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_4 = source;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = __gotots_range_index_4;
            const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_4);
            let i = __gotots_range_value_5;
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
            if (IsPrologueDirective__from_ast(statement) || (EmitContext.EmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, statement) & EFCustomPrologue$constant()) >>> 0 === 0) {
                return [source.slice(0, i, null), source.slice(i, null, null)];
            }
        }
        return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), source];
    }
    static SplitStandardPrologue(f: {
        value: NodeFactory;
    } | undefined, source: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
    ] {
        let prologue: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let rest: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_2 = source;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_index_2;
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_2;
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            if (!IsPrologueDirective__from_ast(statement)) {
                return [source.slice(0, i, null), source.slice(i, null, null)];
            }
        }
        return [source, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()];
    }
    static $go$private$printer$getName(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitFlags: EmitFlags, opts: AssignedNameOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nodeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(node === undefined)) {
            if (opts.IgnoreAssignedName) {
                nodeName = GetNonAssignedNameOfDeclaration__from_ast(node);
            }
            else {
                nodeName = GetNameOfDeclaration__from_ast(node);
            }
        }
        if (!(nodeName === undefined)) {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(nodeName, new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(f));
            if (!opts.AllowComments) {
                emitFlags = (emitFlags | 384) >>> 0;
            }
            if (!opts.AllowSourceMaps) {
                emitFlags = (emitFlags | 12) >>> 0;
            }
            EmitContext.AddEmitFlags((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, name, emitFlags);
            return name;
        }
        return NodeFactory.NewGeneratedNameForNode(f, node);
    }
    static $go$private$printer$isIgnorableParen(f: {
        value: NodeFactory;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return IsParenthesizedExpression__from_ast(node) && NodeIsSynthesized__from_ast(node) && RangeIsSynthesized__from_ast(EmitContext.SourceMapRange((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, node)) && RangeIsSynthesized__from_ast(EmitContext.CommentRange((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, node));
    }
    static $go$private$printer$newGeneratedIdentifier(f: {
        value: NodeFactory;
    } | undefined, kind: GeneratedIdentifierFlags, text: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let id = atomic__from_gostdlib.Uint32.Add($state.nextAutoGenerateId, 1);
        if (text.length === 0) {
            __gotots_control_target_0: {
                if (node === undefined) {
                    text = fmt__from_gostdlib.Sprintf("(auto@%d)", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(id)]));
                }
                else if (IsMemberName__from_ast(node)) {
                    text = Node__from_ast.Text(node);
                }
                else {
                    text = fmt__from_gostdlib.Sprintf("(generated@%v)", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$NodeId(GetNodeId__from_ast(EmitContext.$go$private$printer$getNodeForGeneratedNameWorker((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, node, id)))]));
                }
            }
            text = FormatGeneratedName(false, options.Prefix, text, options.Suffix);
        }
        const __gotots_store_0 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory"), text);
        let autoGenerate: AutoGenerateInfo | undefined = new AutoGenerateInfo(new GeneratedIdentifierFlags(kind.$value | (new GeneratedIdentifierFlags(options.Flags.$value &
            ((void GeneratedIdentifierFlags,
                -8) as number))).$value), id, options.Prefix, options.Suffix, node);
        if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.isNil()) {
            ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate = GoMap.make(0, []);
        }
        ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.store(name, autoGenerate);
        return name;
    }
    static $go$private$printer$newGeneratedPrivateIdentifier(f: {
        value: NodeFactory;
    } | undefined, kind: GeneratedIdentifierFlags, text: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: AutoGenerateOptions): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let id = atomic__from_gostdlib.Uint32.Add($state.nextAutoGenerateId, 1);
        if (text.length === 0) {
            __gotots_control_target_1: {
                if (node === undefined) {
                    text = fmt__from_gostdlib.Sprintf("(auto@%d)", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(id)]));
                }
                else if (IsMemberName__from_ast(node)) {
                    text = Node__from_ast.Text(node);
                }
                else {
                    text = fmt__from_gostdlib.Sprintf("(generated@%v)", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$NodeId(GetNodeId__from_ast(EmitContext.$go$private$printer$getNodeForGeneratedNameWorker((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext, node, id)))]));
                }
            }
            text = FormatGeneratedName(true, options.Prefix, text, options.Suffix);
        }
        else if (!strings__from_gostdlib.HasPrefix(text, "#")) {
            const __gotots_argument_325 = new $goInterfaceAdapter$string("First character of private identifier must be #: " + text);
            GoPanic.raise(__gotots_argument_325 === undefined ? GoPanicNilValue.create() : __gotots_argument_325);
        }
        const __gotots_store_193 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPrivateIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory"), text);
        let autoGenerate: AutoGenerateInfo | undefined = new AutoGenerateInfo(new GeneratedIdentifierFlags(kind.$value | (new GeneratedIdentifierFlags(options.Flags.$value & ~((void GeneratedIdentifierFlags,
            GeneratedIdentifierFlagsKindMask$int) as number))).$value), id, options.Prefix, options.Suffix, node);
        if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.isNil()) {
            ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate = GoMap.make(0, []);
        }
        ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.store(name, autoGenerate);
        return name;
    }
    static $go$private$printer$updateOuterExpression(f: {
        value: NodeFactory;
    } | undefined, outerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((outerExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindParenthesizedExpression$constant__from_ast(): {
                const __gotots_store_165 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "NodeFactory"), Node__from_ast.AsParenthesizedExpression(outerExpression), expression);
                break;
            }
            case KindTypeAssertionExpression$constant__from_ast(): {
                const __gotots_store_166 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateTypeAssertion(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "NodeFactory"), Node__from_ast.AsTypeAssertion(outerExpression), Node__from_ast.Type(outerExpression), expression);
                break;
            }
            case KindAsExpression$constant__from_ast(): {
                const __gotots_store_167 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateAsExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "NodeFactory"), Node__from_ast.AsAsExpression(outerExpression), expression, Node__from_ast.Type(outerExpression));
                break;
            }
            case KindSatisfiesExpression$constant__from_ast(): {
                const __gotots_store_168 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateSatisfiesExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "NodeFactory"), Node__from_ast.AsSatisfiesExpression(outerExpression), expression, Node__from_ast.Type(outerExpression));
                break;
            }
            case KindNonNullExpression$constant__from_ast(): {
                const __gotots_store_169 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateNonNullExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory"), Node__from_ast.AsNonNullExpression(outerExpression), expression, Node__from_ast.$storageOf(((outerExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags);
                break;
            }
            case KindExpressionWithTypeArguments$constant__from_ast(): {
                const __gotots_store_170 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateExpressionWithTypeArguments(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "NodeFactory"), Node__from_ast.AsExpressionWithTypeArguments(outerExpression), expression, Node__from_ast.TypeArgumentList(outerExpression));
                break;
            }
            case KindPartiallyEmittedExpression$constant__from_ast(): {
                const __gotots_store_171 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdatePartiallyEmittedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "NodeFactory"), Node__from_ast.AsPartiallyEmittedExpression(outerExpression), expression);
                break;
            }
            default: {
                const __gotots_argument_285 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unexpected outer expression kind: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node__from_ast.$storageOf(((outerExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
                GoPanic.raise(__gotots_argument_285 === undefined ? GoPanicNilValue.create() : __gotots_argument_285);
                break;
            }
        }
    }
}
export function NewNodeFactory(context: {
    value: EmitContext;
} | undefined): {
    value: NodeFactory;
} | undefined {
    const __gotots_receiver_0 = context;
    const __gotots_field_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        EmitContext.$go$private$printer$onCreate(__gotots_receiver_0, $argument0);
    };
    const __gotots_receiver_1 = context;
    const __gotots_field_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        EmitContext.$go$private$printer$onUpdate(__gotots_receiver_1, $argument0, $argument1);
    };
    const __gotots_receiver_2 = context;
    const __gotots_field_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        EmitContext.$go$private$printer$onClone(__gotots_receiver_2, $argument0, $argument1);
    };
    const __gotots_argument_0 = new NodeFactoryHooks__from_ast(__gotots_field_0, __gotots_field_1, __gotots_field_2);
    const __gotots_field_3 = NodeFactory__from_ast.$copy(NodeFactory__from_ast.$copy(((NewNodeFactory__from_ast(__gotots_argument_0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeFactory__from_ast>).value));
    return { value: new NodeFactory(__gotots_field_3, context) };
}
export function flattenCommaElement(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsBinaryExpression__from_ast(node) && NodeIsSynthesized__from_ast(node) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
        expressions = flattenCommaElement(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, expressions);
        expressions = flattenCommaElement(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, expressions);
    }
    else {
        expressions = expressions.append(void 0, [node]);
    }
    return expressions;
}
export function flattenCommaElements(expressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_3 = expressions;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
        result = flattenCommaElement(expression, result);
    }
    return result;
}
export class NameOptions {
    declare private readonly $goType: void;
    public constructor(public AllowComments: bool, public AllowSourceMaps: bool) {
    }
    static $copy($source: NameOptions): NameOptions {
        return new NameOptions($source.AllowComments, $source.AllowSourceMaps);
    }
    declare private readonly then?: never;
}
export class AssignedNameOptions {
    declare private readonly $goType: void;
    public constructor(public AllowComments: bool, public AllowSourceMaps: bool, public IgnoreAssignedName: bool) {
    }
    static $copy($source: AssignedNameOptions): AssignedNameOptions {
        return new AssignedNameOptions($source.AllowComments, $source.AllowSourceMaps, $source.IgnoreAssignedName);
    }
    declare private readonly then?: never;
}
export class PrivateIdentifierKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function PrivateIdentifierKindField$constant(): PrivateIdentifierKind {
    return new PrivateIdentifierKind("f");
}
export function PrivateIdentifierKindMethod$constant(): PrivateIdentifierKind {
    return new PrivateIdentifierKind("m");
}
export function PrivateIdentifierKindAccessor$constant(): PrivateIdentifierKind {
    return new PrivateIdentifierKind("a");
}
export function PrivateIdentifierKindUntransformed$constant(): PrivateIdentifierKind {
    return new PrivateIdentifierKind("untransformed");
}
