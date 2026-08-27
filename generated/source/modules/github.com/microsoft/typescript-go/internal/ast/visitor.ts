import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierList$Storage as ModifierList__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeList$Storage as NodeList__from_ast$Storage, SourceFile } from "./ast.js";
import type { ArrayTypeNode, ArrayTypeNode$Storage as ArrayTypeNode__from_ast$Storage, BinaryExpression, BinaryExpression$Storage as BinaryExpression__from_ast$Storage, Block, Block$Storage as Block__from_ast$Storage, CallExpression, CallExpression$Storage as CallExpression__from_ast$Storage, ConditionalExpression, ConditionalExpression$Storage as ConditionalExpression__from_ast$Storage, ConstructSignatureDeclaration, ConstructSignatureDeclaration$Storage as ConstructSignatureDeclaration__from_ast$Storage, ElementAccessExpression, ElementAccessExpression$Storage as ElementAccessExpression__from_ast$Storage, ExpressionStatement, ExpressionStatement$Storage as ExpressionStatement__from_ast$Storage, ExpressionWithTypeArguments, ExpressionWithTypeArguments$Storage as ExpressionWithTypeArguments__from_ast$Storage, FunctionDeclaration, FunctionDeclaration$Storage as FunctionDeclaration__from_ast$Storage, FunctionTypeNode, FunctionTypeNode$Storage as FunctionTypeNode__from_ast$Storage, HeritageClause, HeritageClause$Storage as HeritageClause__from_ast$Storage, Identifier, Identifier$Storage as Identifier__from_ast$Storage, IfStatement, IfStatement$Storage as IfStatement__from_ast$Storage, ImportSpecifier, ImportSpecifier$Storage as ImportSpecifier__from_ast$Storage, IndexedAccessTypeNode, IndexedAccessTypeNode$Storage as IndexedAccessTypeNode__from_ast$Storage, InterfaceDeclaration, InterfaceDeclaration$Storage as InterfaceDeclaration__from_ast$Storage, IntersectionTypeNode, IntersectionTypeNode$Storage as IntersectionTypeNode__from_ast$Storage, JSDoc, JSDocDeprecatedTag, JSDocDeprecatedTag$Storage as JSDocDeprecatedTag__from_ast$Storage, JSDocText, JSDocText$Storage as JSDocText__from_ast$Storage, JSDocUnknownTag, JSDocUnknownTag$Storage as JSDocUnknownTag__from_ast$Storage, JSDoc$Storage as JSDoc__from_ast$Storage, KeywordExpression, KeywordExpression$Storage as KeywordExpression__from_ast$Storage, KeywordTypeNode, KeywordTypeNode$Storage as KeywordTypeNode__from_ast$Storage, LiteralTypeNode, LiteralTypeNode$Storage as LiteralTypeNode__from_ast$Storage, MethodSignatureDeclaration, MethodSignatureDeclaration$Storage as MethodSignatureDeclaration__from_ast$Storage, NumericLiteral, NumericLiteral$Storage as NumericLiteral__from_ast$Storage, ParameterDeclaration, ParameterDeclaration$Storage as ParameterDeclaration__from_ast$Storage, ParenthesizedExpression, ParenthesizedExpression$Storage as ParenthesizedExpression__from_ast$Storage, ParenthesizedTypeNode, ParenthesizedTypeNode$Storage as ParenthesizedTypeNode__from_ast$Storage, PrefixUnaryExpression, PrefixUnaryExpression$Storage as PrefixUnaryExpression__from_ast$Storage, PropertyAccessExpression, PropertyAccessExpression$Storage as PropertyAccessExpression__from_ast$Storage, PropertyAssignment, PropertyAssignment$Storage as PropertyAssignment__from_ast$Storage, PropertySignatureDeclaration, PropertySignatureDeclaration$Storage as PropertySignatureDeclaration__from_ast$Storage, ReturnStatement, ReturnStatement$Storage as ReturnStatement__from_ast$Storage, StringLiteral, StringLiteral$Storage as StringLiteral__from_ast$Storage, SyntaxList, Token, Token$Storage as Token__from_ast$Storage, TypeAliasDeclaration, TypeAliasDeclaration$Storage as TypeAliasDeclaration__from_ast$Storage, TypeLiteralNode, TypeLiteralNode$Storage as TypeLiteralNode__from_ast$Storage, TypeOperatorNode, TypeOperatorNode$Storage as TypeOperatorNode__from_ast$Storage, TypeParameterDeclaration, TypeParameterDeclaration$Storage as TypeParameterDeclaration__from_ast$Storage, TypeReferenceNode, TypeReferenceNode$Storage as TypeReferenceNode__from_ast$Storage, UnionTypeNode, UnionTypeNode$Storage as UnionTypeNode__from_ast$Storage, VariableDeclaration, VariableDeclarationList, VariableDeclarationList$Storage as VariableDeclarationList__from_ast$Storage, VariableDeclaration$Storage as VariableDeclaration__from_ast$Storage, VariableStatement, VariableStatement$Storage as VariableStatement__from_ast$Storage } from "./ast_generated.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Arena as Arena__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { ModifierList, Node, NodeBase, NodeDefault, NodeFactoryHooks, NodeList } from "./ast.js";
import { NodeFactory } from "./ast_generated.js";
import { KindSyntaxList$constant } from "./kind_generated.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class NodeVisitor {
    declare private readonly $goType: void;
    public constructor(public Visit: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public Factory: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined, public Hooks: NodeVisitorHooks) {
    }
    static $copy($source: NodeVisitor): NodeVisitor {
        return new NodeVisitor($source.Visit, $source.Factory, NodeVisitorHooks.$copy($source.Hooks));
    }
    declare private readonly then?: never;
    static VisitEachChild(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (node === undefined || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return node;
        }
        return Node.VisitEachChild(node, v);
    }
    static VisitEmbeddedStatement(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (node === undefined || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return node;
        }
        const __gotots_callee_11 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_23 = node;
        let visited: tsonicTypeScriptRuntime.Location<Node> | undefined = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
        if (visited === undefined) {
            return void 0;
        }
        return NodeVisitor.$go$private$ast$liftToBlock(v, visited);
    }
    static VisitModifiers(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined {
        if (nodes === undefined || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return nodes;
        }
        {
            const __gotots_results_0 = NodeVisitor.VisitSlice(v, NodeList.$storageOf(NodeList.$fromStorage(ModifierList.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes);
            let result = __gotots_results_0[0];
            let changed = __gotots_results_0[1];
            if (changed) {
                let list: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = NodeFactory.NewModifierList((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, result);
                NodeList.$storageOf(NodeList.$fromStorage(ModifierList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList.$storageOf(NodeList.$fromStorage(ModifierList.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Loc)));
                return list;
            }
        }
        return nodes;
    }
    static VisitNode(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (node === undefined || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return node;
        }
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined)) {
            const __gotots_callee_0 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_0 = node;
            let visited: tsonicTypeScriptRuntime.Location<Node> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            if (!(visited === undefined) && Node.$storageOf(((visited ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSyntaxList$constant()) {
                let nodes = (Node.AsSyntaxList(visited) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                if (nodes.length !== 1) {
                    const __gotots_argument_1 = new GoInterfaceAdapter("Expected only a single node to be written to output");
                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                }
                visited = nodes.get(0);
                if (!(visited === undefined) && Node.$storageOf(((visited ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSyntaxList$constant()) {
                    const __gotots_argument_2 = new GoInterfaceAdapter("The result of visiting and lifting a Node may not be SyntaxList");
                    GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
                }
            }
            return visited;
        }
        return node;
    }
    static VisitNodes(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        if (nodes === undefined || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return nodes;
        }
        {
            const __gotots_results_1 = NodeVisitor.VisitSlice(v, NodeList.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes);
            let result = __gotots_results_1[0];
            let changed = __gotots_results_1[1];
            if (changed) {
                let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = NodeFactory.NewNodeList((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, result);
                NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc)));
                return list;
            }
        }
        return nodes;
    }
    static VisitSlice(v: {
        value: NodeVisitor;
    } | undefined, nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>,
        bool
    ] {
        let result: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        let changed: bool = false;
        if (nodes.isNil() || (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
            return [nodes, false];
        }
        for (let i = 0; i < nodes.length; i++) {
            let node: tsonicTypeScriptRuntime.Location<Node> | undefined = nodes.get(i);
            if ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined) {
                break;
            }
            const __gotots_callee_1 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_3 = node;
            let visited: tsonicTypeScriptRuntime.Location<Node> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            if (visited === undefined || !tsonicTypeScriptRuntime.sameLocation(visited, node)) {
                let updated = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes.slice(0, i, null));
                for (;;) {
                    __gotots_control_target_0: {
                        if (visited === undefined) {
                        }
                        else if (Node.$storageOf(((visited ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSyntaxList$constant()) {
                            updated = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>(updated, (Node.AsSyntaxList(visited) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children, void 0);
                        }
                        else {
                            updated = updated.append(void 0, [visited]);
                        }
                    }
                    i++;
                    if (i >= nodes.length) {
                        break;
                    }
                    if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit === undefined)) {
                        node = nodes.get(i);
                        const __gotots_callee_2 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                        const __gotots_argument_4 = node;
                        visited = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                    }
                    else {
                        updated = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>(updated, nodes.slice(i, null, null), void 0);
                        break;
                    }
                }
                return [updated, true];
            }
        }
        return [nodes, false];
    }
    static VisitSourceFile(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined {
        const __gotots_receiver_1 = v;
        const __gotots_store_0 = NodeBase.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
        const __gotots_argument_24 = NodeDefault.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault => {
            return NodeDefault.$fromStorage($go$storage);
        }, ($go$value: NodeDefault): NodeDefault__from_ast$Storage => {
            return NodeDefault.$storageOf($go$value);
        }));
        return Node.AsSourceFile(NodeVisitor.VisitNode(__gotots_receiver_1, __gotots_argument_24));
    }
    static $go$private$ast$liftToBlock(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        let nodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        if (!(node === undefined)) {
            if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSyntaxList$constant()) {
                nodes = (Node.AsSyntaxList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
            }
            else {
                nodes = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node> | undefined>([node]);
            }
        }
        if (nodes.length === 1) {
            node = nodes.get(0);
        }
        else {
            node = NodeFactory.NewBlock((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, NodeFactory.NewNodeList((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, nodes), true);
        }
        if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSyntaxList$constant()) {
            const __gotots_argument_22 = new GoInterfaceAdapter("The result of visiting and lifting a Node may not be SyntaxList");
            GoPanic.raise(__gotots_argument_22 === undefined ? GoPanicNilValue.create() : __gotots_argument_22);
        }
        return node;
    }
    static $go$private$ast$visitEmbeddedStatement(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitEmbeddedStatement === undefined)) {
            const __gotots_callee_9 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitEmbeddedStatement;
            const __gotots_argument_17 = node;
            const __gotots_argument_18 = v;
            return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
        }
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode === undefined)) {
            const __gotots_receiver_0 = v;
            const __gotots_callee_10 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode;
            const __gotots_argument_19 = node;
            const __gotots_argument_20 = v;
            const __gotots_argument_21 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20);
            return NodeVisitor.$go$private$ast$liftToBlock(__gotots_receiver_0, __gotots_argument_21);
        }
        return NodeVisitor.VisitEmbeddedStatement(v, node);
    }
    static $go$private$ast$visitFunctionBody(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitFunctionBody === undefined)) {
            const __gotots_callee_7 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitFunctionBody;
            const __gotots_argument_13 = node;
            const __gotots_argument_14 = v;
            return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
        }
        return NodeVisitor.$go$private$ast$visitNode(v, node);
    }
    static $go$private$ast$visitIterationBody(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitIterationBody === undefined)) {
            const __gotots_callee_8 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitIterationBody;
            const __gotots_argument_15 = node;
            const __gotots_argument_16 = v;
            return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16);
        }
        return NodeVisitor.$go$private$ast$visitEmbeddedStatement(v, node);
    }
    static $go$private$ast$visitModifiers(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitModifiers === undefined)) {
            const __gotots_callee_5 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitModifiers;
            const __gotots_argument_9 = nodes;
            const __gotots_argument_10 = v;
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
        }
        return NodeVisitor.VisitModifiers(v, nodes);
    }
    static $go$private$ast$visitNode(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode === undefined)) {
            const __gotots_callee_3 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode;
            const __gotots_argument_5 = node;
            const __gotots_argument_6 = v;
            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
        }
        return NodeVisitor.VisitNode(v, node);
    }
    static $go$private$ast$visitNodes(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNodes === undefined)) {
            const __gotots_callee_4 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNodes;
            const __gotots_argument_7 = nodes;
            const __gotots_argument_8 = v;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8);
        }
        return NodeVisitor.VisitNodes(v, nodes);
    }
    static $go$private$ast$visitParameters(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitParameters === undefined)) {
            const __gotots_callee_6 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitParameters;
            const __gotots_argument_11 = nodes;
            const __gotots_argument_12 = v;
            return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11, __gotots_argument_12);
        }
        return NodeVisitor.$go$private$ast$visitNodes(v, nodes);
    }
    static $go$private$ast$visitToken(v: {
        value: NodeVisitor;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitToken === undefined)) {
            const __gotots_callee_13 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitToken;
            const __gotots_argument_27 = node;
            const __gotots_argument_28 = v;
            return (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28);
        }
        return NodeVisitor.VisitNode(v, node);
    }
    static $go$private$ast$visitTopLevelStatements(v: {
        value: NodeVisitor;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitTopLevelStatements === undefined)) {
            const __gotots_callee_12 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitTopLevelStatements;
            const __gotots_argument_25 = nodes;
            const __gotots_argument_26 = v;
            return (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
        }
        return NodeVisitor.$go$private$ast$visitNodes(v, nodes);
    }
}
export class NodeVisitorHooks {
    declare private readonly $goType: void;
    public constructor(public VisitNode: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public VisitToken: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public VisitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList> | undefined) | undefined, public VisitModifiers: (($0: tsonicTypeScriptRuntime.Location<ModifierList> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<ModifierList> | undefined) | undefined, public VisitEmbeddedStatement: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public VisitIterationBody: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public VisitParameters: (($0: tsonicTypeScriptRuntime.Location<NodeList> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList> | undefined) | undefined, public VisitFunctionBody: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, public VisitTopLevelStatements: (($0: tsonicTypeScriptRuntime.Location<NodeList> | undefined, $1: {
        value: NodeVisitor;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList> | undefined) | undefined) {
    }
    static $copy($source: NodeVisitorHooks): NodeVisitorHooks {
        return new NodeVisitorHooks($source.VisitNode, $source.VisitToken, $source.VisitNodes, $source.VisitModifiers, $source.VisitEmbeddedStatement, $source.VisitIterationBody, $source.VisitParameters, $source.VisitFunctionBody, $source.VisitTopLevelStatements);
    }
    declare private readonly then?: never;
}
export function NewNodeVisitor(visit__shadow_1: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, factory: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined, hooks: NodeVisitorHooks): {
    value: NodeVisitor;
} | undefined {
    if (factory === undefined) {
        factory =
            tsonicTypeScriptRuntime.location<NodeFactory>(new NodeFactory(NodeFactoryHooks.$zero(), Arena__from_core.$zero<ArrayTypeNode>(), Arena__from_core.$zero<BinaryExpression>(), Arena__from_core.$zero<Block>(), Arena__from_core.$zero<CallExpression>(), Arena__from_core.$zero<ConditionalExpression>(), Arena__from_core.$zero<ConstructSignatureDeclaration>(), Arena__from_core.$zero<ElementAccessExpression>(), Arena__from_core.$zero<ExpressionStatement>(), Arena__from_core.$zero<ExpressionWithTypeArguments>(), Arena__from_core.$zero<FunctionDeclaration>(), Arena__from_core.$zero<FunctionTypeNode>(), Arena__from_core.$zero<HeritageClause>(), Arena__from_core.$zero<Identifier>(), Arena__from_core.$zero<IfStatement>(), Arena__from_core.$zero<ImportSpecifier>(), Arena__from_core.$zero<IndexedAccessTypeNode>(), Arena__from_core.$zero<InterfaceDeclaration>(), Arena__from_core.$zero<IntersectionTypeNode>(), Arena__from_core.$zero<JSDoc>(), Arena__from_core.$zero<JSDocDeprecatedTag>(), Arena__from_core.$zero<JSDocText>(), Arena__from_core.$zero<JSDocUnknownTag>(), Arena__from_core.$zero<KeywordExpression>(), Arena__from_core.$zero<KeywordTypeNode>(), Arena__from_core.$zero<LiteralTypeNode>(), Arena__from_core.$zero<MethodSignatureDeclaration>(), Arena__from_core.$zero<ModifierList>(), Arena__from_core.$zero<NodeList>(), Arena__from_core.$zero<NumericLiteral>(), Arena__from_core.$zero<ParameterDeclaration>(), Arena__from_core.$zero<ParenthesizedExpression>(), Arena__from_core.$zero<ParenthesizedTypeNode>(), Arena__from_core.$zero<PrefixUnaryExpression>(), Arena__from_core.$zero<PropertyAccessExpression>(), Arena__from_core.$zero<PropertyAssignment>(), Arena__from_core.$zero<PropertySignatureDeclaration>(), Arena__from_core.$zero<ReturnStatement>(), Arena__from_core.$zero<StringLiteral>(), Arena__from_core.$zero<Token>(), Arena__from_core.$zero<TypeAliasDeclaration>(), Arena__from_core.$zero<TypeLiteralNode>(), Arena__from_core.$zero<TypeOperatorNode>(), Arena__from_core.$zero<TypeParameterDeclaration>(), Arena__from_core.$zero<TypeReferenceNode>(), Arena__from_core.$zero<UnionTypeNode>(), Arena__from_core.$zero<VariableDeclaration>(), Arena__from_core.$zero<VariableDeclarationList>(), Arena__from_core.$zero<VariableStatement>(), 0, 0));
    }
    return { value: new NodeVisitor(visit__shadow_1, factory, NodeVisitorHooks.$copy(hooks)) };
}
