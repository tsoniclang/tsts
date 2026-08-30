import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TemplateExpression as TemplateExpression__from_ast, TemplateLiteralLikeNodeBase as TemplateLiteralLikeNodeBase__from_ast, TemplateSpan as TemplateSpan__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { ExpressionBase as ExpressionBase__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsExternalModule as IsExternalModule__from_ast, IsNoSubstitutionTemplateLiteral as IsNoSubstitutionTemplateLiteral__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SubtreeContainsInvalidTemplateEscape$constant as SubtreeContainsInvalidTemplateEscape$constant__from_ast, TokenFlagsContainsInvalidEscape$constant as TokenFlagsContainsInvalidEscape$constant__from_ast, TokenFlagsIsInvalid$constant as TokenFlagsIsInvalid$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetSourceTextOfNodeFromSourceFile as GetSourceTextOfNodeFromSourceFile__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/estransforms/state.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
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
export class taggedTemplateTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public taggedTemplateStringDeclarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$processTaggedTemplateExpression(tx: taggedTemplateTransformer | undefined, node: {
        value: TaggedTemplateExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_16.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
        let template: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template;
        if (!hasInvalidEscape(template)) {
            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_6 = Transformer__from_transformers.Visitor(__gotots_store_17.Transformer);
            const __gotots_store_18 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_11 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_18, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_6, __gotots_argument_11);
        }
        const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(__gotots_store_19.Transformer);
        let templateArguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([void 0]);
        let cookedStrings = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let rawStrings = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (IsNoSubstitutionTemplateLiteral__from_ast(template)) {
            cookedStrings = cookedStrings.append(void 0, [createTemplateCooked(f, Node__from_ast.TemplateLiteralLikeData(template))]);
            rawStrings = rawStrings.append(void 0, [getRawLiteral(f, template)]);
        }
        else {
            let te: {
                value: TemplateExpression__from_ast;
            } | undefined = Node__from_ast.AsTemplateExpression(template);
            cookedStrings = cookedStrings.append(void 0, [createTemplateCooked(f, Node__from_ast.TemplateLiteralLikeData((te ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head))]);
            rawStrings = rawStrings.append(void 0, [getRawLiteral(f, (te ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head)]);
            const __gotots_range_0 = NodeList__from_ast.$storageOf((((te ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let span: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                let ts: {
                    value: TemplateSpan__from_ast;
                } | undefined = Node__from_ast.AsTemplateSpan(span);
                cookedStrings = cookedStrings.append(void 0, [createTemplateCooked(f, Node__from_ast.TemplateLiteralLikeData((ts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal))]);
                rawStrings = rawStrings.append(void 0, [getRawLiteral(f, (ts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal)]);
                const __gotots_argument_12 = templateArguments;
                const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_13 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_20.Transformer), (ts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                templateArguments = __gotots_argument_12.append(void 0, [__gotots_argument_13]);
            }
        }
        const __gotots_receiver_9 = f;
        const __gotots_store_21 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
        const __gotots_store_22 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_14 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), cookedStrings);
        const __gotots_argument_15 = false;
        const __gotots_argument_18 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_7, __gotots_argument_14, __gotots_argument_15);
        const __gotots_store_23 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory");
        const __gotots_store_24 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_16 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), rawStrings);
        const __gotots_argument_17 = false;
        const __gotots_argument_19 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_8, __gotots_argument_16, __gotots_argument_17);
        let helperCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTemplateObjectHelper(__gotots_receiver_9, __gotots_argument_18, __gotots_argument_19);
        if (IsExternalModule__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile)) {
            let tempVar: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName(f, "templateObject");
            const __gotots_argument_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).taggedTemplateStringDeclarations;
            const __gotots_store_25 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_21 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), tempVar, void 0, void 0, void 0);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).taggedTemplateStringDeclarations = __gotots_argument_20.append(void 0, [__gotots_argument_21]);
            templateArguments.set(0, NodeFactory__from_printer.NewLogicalORExpression(f, tempVar, NodeFactory__from_printer.NewAssignmentExpression(f, tempVar, helperCall)));
        }
        else {
            templateArguments.set(0, helperCall);
        }
        const __gotots_store_26 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory");
        const __gotots_argument_22 = tag;
        const __gotots_argument_23 = void 0;
        const __gotots_argument_24 = void 0;
        const __gotots_store_27 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_25 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory"), templateArguments);
        const __gotots_argument_26 = NodeFlagsNone$constant__from_ast();
        let call: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_10, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
        Node__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        return call;
    }
    static $go$private$estransforms$visit(tx: taggedTemplateTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsInvalidTemplateEscape$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                return taggedTemplateTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindTaggedTemplateExpression$constant__from_ast(): {
                return taggedTemplateTransformer.$go$private$estransforms$visitTaggedTemplateExpression(tx, Node__from_ast.AsTaggedTemplateExpression(node));
                break;
            }
            default: {
                const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitSourceFile(tx: taggedTemplateTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = node;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).taggedTemplateStringDeclarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_2 = Transformer__from_transformers.Visitor(__gotots_store_2.Transformer);
        const __gotots_store_3 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_2 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_3, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_2);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).taggedTemplateStringDeclarations.length > 0) {
            let visitedSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(visited);
            const __gotots_argument_7 = NodeList__from_ast.$storageOf(((((visitedSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(0, NodeList__from_ast.$storageOf(((((visitedSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, NodeList__from_ast.$storageOf(((((visitedSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length);
            const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_5 = (Transformer__from_transformers.Factory(__gotots_store_4.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory");
            const __gotots_argument_5 = void 0;
            const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_7 = (Transformer__from_transformers.Factory(__gotots_store_6.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory");
            const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_9 = (Transformer__from_transformers.Factory(__gotots_store_8.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_3 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).taggedTemplateStringDeclarations);
            const __gotots_argument_4 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_6 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
            const __gotots_argument_8 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_4, __gotots_argument_5, __gotots_argument_6);
            let statements = __gotots_argument_7.append(void 0, [__gotots_argument_8]);
            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_11 = (Transformer__from_transformers.Factory(__gotots_store_10.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let stmtList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), statements);
            NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            visited = NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), visitedSourceFile, stmtList, ((visitedSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken);
        }
        const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_5 = Transformer__from_transformers.EmitContext(__gotots_store_14.Transformer);
        const __gotots_argument_9 = visited;
        const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_10 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_15.Transformer));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_5, __gotots_argument_9, __gotots_argument_10);
        return visited;
    }
    static $go$private$estransforms$visitTaggedTemplateExpression(tx: taggedTemplateTransformer | undefined, node: {
        value: TaggedTemplateExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return taggedTemplateTransformer.$go$private$estransforms$processTaggedTemplateExpression(tx, node);
    }
}
export function newTaggedTemplateLiftRestrictionTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: taggedTemplateTransformer | undefined = new taggedTemplateTransformer(Transformer__from_transformers.$zero(), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return taggedTemplateTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export function createTemplateCooked(f: {
    value: NodeFactory__from_printer;
} | undefined, template: tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!((((template ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.TemplateFlags & TokenFlagsIsInvalid$constant__from_ast()) === 0)) {
        return NodeFactory__from_printer.NewVoidZeroExpression(f);
    }
    const __gotots_store_28 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), LiteralLikeNodeBase__from_ast.$storageOf(((template ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.LiteralLikeNodeBase).Text, TokenFlagsNone$constant__from_ast());
}
export function getRawLiteral(f: {
    value: NodeFactory__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let text = ((Node__from_ast.TemplateLiteralLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.RawText;
    if (text === "") {
        text = GetSourceTextOfNodeFromSourceFile__from_scanner(GetSourceFileOfNode__from_ast(node), node, false);
        let isLast = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNoSubstitutionTemplateLiteral$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateTail$constant__from_ast();
        let endLen = 2;
        if (isLast) {
            endLen = 1;
        }
        text = goStringSlice(text, 1, text.length - endLen);
    }
    const __gotots_receiver_11 = $state.newlineNormalizer;
    text = strings__from_gostdlib.Replacer.Replace(__gotots_receiver_11 === void 0 ? void 0 :
        (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer>).value, text);
    const __gotots_store_29 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), text, TokenFlagsNone$constant__from_ast());
    Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    return result;
}
export function hasInvalidEscape(template: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsNoSubstitutionTemplateLiteral__from_ast(template)) {
        return !((((Node__from_ast.TemplateLiteralLikeData(template) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.TemplateFlags & TokenFlagsContainsInvalidEscape$constant__from_ast()) === 0);
    }
    let te: {
        value: TemplateExpression__from_ast;
    } | undefined = Node__from_ast.AsTemplateExpression(template);
    if (!((((Node__from_ast.TemplateLiteralLikeData((te ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.TemplateFlags & TokenFlagsContainsInvalidEscape$constant__from_ast()) === 0)) {
        return true;
    }
    const __gotots_range_1 = NodeList__from_ast.$storageOf((((te ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let span: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (!((((Node__from_ast.TemplateLiteralLikeData((Node__from_ast.AsTemplateSpan(span) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.TemplateFlags & TokenFlagsContainsInvalidEscape$constant__from_ast()) === 0)) {
            return true;
        }
    }
    return false;
}
