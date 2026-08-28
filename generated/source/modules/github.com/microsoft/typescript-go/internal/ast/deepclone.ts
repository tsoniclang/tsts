import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeList$Storage as NodeList__from_ast$Storage } from "./ast.js";
import type { NodeFactory } from "./ast_generated.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { ModifierList, Node, NodeList } from "./ast.js";
import { NewNodeVisitor, NodeVisitor, NodeVisitorHooks } from "./visitor.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function getDeepCloneVisitor(f: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined, syntheticLocation: bool): {
    value: NodeVisitor;
} | undefined {
    let visitor: {
        value: NodeVisitor;
    } | undefined = void 0;
    visitor = NewNodeVisitor((node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined => {
        let visited: tsonicTypeScriptRuntime.Location<Node> | undefined = NodeVisitor.VisitEachChild(visitor, node);
        if (!tsonicTypeScriptRuntime.sameLocation(visited, node)) {
            if (syntheticLocation) {
                Node.$storageOf(((visited ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
            }
            return visited;
        }
        let c: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Clone(node, new GoInterfaceAdapter(f));
        if (syntheticLocation) {
            Node.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
        }
        return c;
    }, f, new NodeVisitorHooks(void 0, void 0, (nodes: tsonicTypeScriptRuntime.Location<NodeList> | undefined, v: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined => {
        if (nodes === undefined) {
            return void 0;
        }
        let visited: tsonicTypeScriptRuntime.Location<NodeList> | undefined = NodeVisitor.VisitNodes(v, nodes);
        let newList: tsonicTypeScriptRuntime.Location<NodeList> | undefined = void 0;
        if (!tsonicTypeScriptRuntime.sameLocation(visited, nodes)) {
            newList = visited;
        }
        else {
            newList = NodeList.Clone(nodes, new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory));
        }
        if (syntheticLocation) {
            NodeList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
            if (NodeList.HasTrailingComma(nodes)) {
                Node.$storageOf(((NodeList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(NodeList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length - 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-2, -2));
            }
        }
        return newList;
    }, (nodes: tsonicTypeScriptRuntime.Location<ModifierList> | undefined, v: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined => {
        if (nodes === undefined) {
            return void 0;
        }
        let visited: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = NodeVisitor.VisitModifiers(v, nodes);
        let newList: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = void 0;
        if (!tsonicTypeScriptRuntime.sameLocation(visited, nodes)) {
            newList = visited;
        }
        else {
            newList = ModifierList.Clone(nodes, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory);
        }
        if (syntheticLocation) {
            (void NodeList.$storageOf, (void NodeList.$fromStorage,
                ModifierList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
            const __gotots_store_0 = ModifierList.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value);
            if (NodeList.HasTrailingComma(tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeList"), NodeList.$fromStorage, NodeList.$storageOf))) {
                Node.$storageOf((((void NodeList.$storageOf, (void NodeList.$fromStorage,
                    ModifierList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes.get((void NodeList.$storageOf, (void NodeList.$fromStorage,
                    ModifierList.$storageOf(((newList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes.length - 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-2, -2));
            }
        }
        return newList;
    }, void 0, void 0, void 0, void 0, void 0));
    return visitor;
}
