import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BigIntLiteral as BigIntLiteral__from_ast, FileReference as FileReference__from_ast, NoSubstitutionTemplateLiteral as NoSubstitutionTemplateLiteral__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeList$Storage as NodeList__from_ast$Storage, Node$Storage as Node__from_ast$Storage, RegularExpressionLiteral as RegularExpressionLiteral__from_ast, TemplateHead as TemplateHead__from_ast, TemplateMiddle as TemplateMiddle__from_ast, TemplateTail as TemplateTail__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { ComputePositionMap as ComputePositionMap__from_ast, ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, GetNodeId as GetNodeId__from_ast, KindLastUnaryOperator$constant as KindLastUnaryOperator$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, ModifierList as ModifierList__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, NumericLiteral as NumericLiteral__from_ast, PositionMap as PositionMap__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Compare$Named_ast$NodeId } from "../../../../../../../support/generics/concretizations/cmp/Compare.js";
import { BinarySearchUniqueFunc$SliceOf_uint32$uint32 } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BinarySearchUniqueFunc.js";
import { Concat$SliceOf_byte$byte } from "../../../../../../../support/generics/concretizations/slices/Concat.js";
import { SortFunc$SliceOf_uint32$uint32 } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_uint32 as GoMap } from "../../../../../../../support/maps.js";
import { getChildrenPropertyMask, getNodeCommonData, getNodeDataType, recordExtendedData, recordNodeStrings } from "./encoder_generated.js";
import { newStringTable, stringTable } from "./stringtable.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function init(): void {
    if (false) {
        const __gotots_argument_49 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("KindLastUnaryOperator (%d) exceeds the 6-bit commonData capacity (max 63)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ast$Kind(KindLastUnaryOperator$constant__from_ast())])));
        GoPanic.raise(__gotots_argument_49 === undefined ? GoPanicNilValue.create() : __gotots_argument_49);
    }
}
export const NodeOffsetKind$int: int = 0;
export const NodeOffsetPos$int: int = 4;
export const NodeOffsetEnd$int: int = 8;
export const NodeOffsetNext$int: int = 12;
export const NodeOffsetNext$uint32: uint32 = 12;
export const NodeOffsetParent$int: int = 16;
export const NodeOffsetData$int: int = 20;
export const NodeOffsetFlags$int: int = 24;
export const NodeSize$int: int = 28;
export const NodeSize$uint32: uint32 = 28;
export const NodeDataTypeChildren: uint32 = 0;
export const NodeDataTypeString: uint32 = 1073741824;
export const NodeDataTypeExtendedData: uint32 = 2147483648;
export const NodeDataTypeMask: uint32 = 3221225472;
export const NodeDataChildMask: uint32 = 255;
export const NodeDataStringIndexMask: uint32 = 16777215;
export const SyntaxKindNodeList: uint32 = 4294967295;
export const HeaderOffsetParseOptions$int: int = 20;
export const HeaderOffsetStringOffsets$int: int = 24;
export const HeaderOffsetStringData$int: int = 28;
export const HeaderOffsetExtendedData$int: int = 32;
export const HeaderOffsetNodes$int: int = 40;
export const HeaderSize$int: int = 44;
export const ProtocolVersion: uint8 = 5;
export function encodeParseOptions(opts: ExternalModuleIndicatorOptions__from_ast): uint32 {
    let bits = 0;
    if (ExternalModuleIndicatorOptions__from_ast.$storageOf(opts).JSX) {
        bits = (bits | 1) >>> 0;
    }
    if (ExternalModuleIndicatorOptions__from_ast.$storageOf(opts).Force) {
        bits = (bits | 2) >>> 0;
    }
    return bits;
}
export class NodeIndexTable {
    declare private readonly $goType: void;
    public constructor(public Nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public sortedOnce: sync__from_gostdlib.Once, public sortedIdx: RuntimeSlice<uint32>) {
    }
    declare private readonly then?: never;
    static GetIndex(t: NodeIndexTable | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): uint32 {
        sync__from_gostdlib.Once.Do((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sortedOnce, (): void => {
            let idx = RuntimeSlice.make<uint32>(0, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes.length, 0);
            const __gotots_range_6 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_index_6;
                const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
                let i__shadow_1 = __gotots_range_value_6;
                let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                if (!(n === undefined)) {
                    idx = idx.append(0, [i__shadow_1 >>> 0]);
                }
            }
            let nodes = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes;
            SortFunc$SliceOf_uint32$uint32(idx, (a: uint32, b: uint32): int => {
                return Compare$Named_ast$NodeId(GetNodeId__from_ast(nodes.get(a)), GetNodeId__from_ast(nodes.get(b)));
            });
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sortedIdx = idx;
        });
        let target = GetNodeId__from_ast(node);
        const __gotots_results_1 = BinarySearchUniqueFunc$SliceOf_uint32$uint32((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sortedIdx, ($0: int, el: uint32): int => {
            return Compare$Named_ast$NodeId(GetNodeId__from_ast((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes.get(el)), target);
        });
        let i = __gotots_results_1[0];
        let found = __gotots_results_1[1];
        if (found) {
            return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sortedIdx.get(i);
        }
        return 0;
    }
}
export function BuildNodeIndexTable(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): NodeIndexTable | undefined {
    let nodeCount = 0;
    let nodeTable = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(1, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeCount + 1, void 0);
    let visitor: {
        value: NodeVisitor__from_ast;
    } | undefined = { value: new NodeVisitor__from_ast(void 0, void 0, new NodeVisitorHooks__from_ast(void 0, void 0, (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, visitor__shadow_1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (nodeList === undefined) {
                return nodeList;
            }
            nodeCount++;
            nodeTable = nodeTable.append(void 0, [void 0]);
            NodeVisitor__from_ast.VisitSlice(visitor__shadow_1, NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            return nodeList;
        }, (modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, visitor__shadow_1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
            if (!(modifiers === undefined) && NodeList__from_ast.$storageOf(NodeList__from_ast.$fromStorage(ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length > 0) {
                const __gotots_callee_9 = (visitor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNodes;
                const __gotots_store_2 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_argument_39 = tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeList"), ($go$storage: NodeList__from_ast$Storage): NodeList__from_ast => {
                    return NodeList__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeList__from_ast): NodeList__from_ast$Storage => {
                    return NodeList__from_ast.$storageOf($go$value);
                });
                const __gotots_argument_40 = visitor__shadow_1;
                (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39, __gotots_argument_40);
            }
            return modifiers;
        }, void 0, void 0, void 0, void 0, void 0)) };
    (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        nodeCount++;
        nodeTable = nodeTable.append(void 0, [node]);
        NodeVisitor__from_ast.VisitEachChild(visitor, node);
        const __gotots_range_4 = Node__from_ast.JSDoc(node, sourceFile);
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            const __gotots_callee_10 = (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_41 = jsdoc;
            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41);
        }
        return node;
    };
    const __gotots_store_3 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    let rootNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    }));
    nodeCount++;
    nodeTable = nodeTable.append(void 0, [rootNode]);
    NodeVisitor__from_ast.VisitEachChild(visitor, rootNode);
    const __gotots_range_5 = Node__from_ast.JSDoc(rootNode, sourceFile);
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        const __gotots_callee_11 = (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_42 = jsdoc;
        (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
    }
    return new NodeIndexTable(nodeTable, named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<uint32>());
}
export function EncodeSourceFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<uint8>,
    NodeIndexTable | undefined,
    GoInterface | undefined
] {
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    const __gotots_argument_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    }));
    const __gotots_argument_1 = sourceFile;
    return encodeTree(__gotots_argument_0, __gotots_argument_1);
}
export function EncodeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<uint8>,
    NodeIndexTable | undefined,
    GoInterface | undefined
] {
    return encodeTree(node, sourceFile);
}
export function encodeTree(rootNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<uint8>,
    NodeIndexTable | undefined,
    GoInterface | undefined
] {
    let parentIndex = 0, nodeCount = 0, prevIndex = 0;
    let extendedData = RuntimeSlice.nil<uint8>();
    const extendedData$location = tsonicTypeScriptRuntime.boundLocation({}, () => extendedData, extendedData$next => extendedData = extendedData$next);
    let structuredData = RuntimeSlice.nil<uint8>();
    const structuredData$location = tsonicTypeScriptRuntime.boundLocation({}, () => structuredData, structuredData$next => structuredData = structuredData$next);
    let strs: stringTable | undefined = void 0;
    let positionMap: {
        value: PositionMap__from_ast;
    } | undefined = void 0;
    if (Node__from_ast.$storageOf(((rootNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
        strs = newStringTable(SourceFile__from_ast.Text(sourceFile), ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TextCount);
        positionMap = SourceFile__from_ast.GetPositionMap(sourceFile);
    }
    else {
        strs = newStringTable("", 0);
        if (!(sourceFile === undefined)) {
            positionMap = SourceFile__from_ast.GetPositionMap(sourceFile);
        }
    }
    if (positionMap === undefined) {
        positionMap = ComputePositionMap__from_ast("");
    }
    let utf16: (($0: int) => uint32) | undefined = (pos: int): uint32 => {
        return PositionMap__from_ast.UTF8ToUTF16(positionMap, pos) >>> 0;
    };
    let initialNodeCount = 0;
    if (!(sourceFile === undefined)) {
        initialNodeCount = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeCount;
    }
    let nodes = RuntimeSlice.make<uint8>(0, (initialNodeCount + 1) * NodeSize$int, 0);
    let nodeTable = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(1, initialNodeCount + 1, void 0);
    let nodeIndexMap: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, uint32> = GoMap.nil();
    let sfExtendedDataOffset = 0;
    if (Node__from_ast.$storageOf(((rootNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
        let sf: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(rootNode);
        let total = SourceFile__from_ast.Imports(sf).length + ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations.length;
        if (!(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) && !tsonicTypeScriptRuntime.sameLocation(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator, rootNode)) {
            total++;
        }
        if (total > 0) {
            nodeIndexMap = GoMap.make(total, []);
            const __gotots_range_0 = SourceFile__from_ast.Imports(sf);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                nodeIndexMap.store(Node__from_ast.AsNode(imp), 0);
            }
            const __gotots_range_1 = ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let aug: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                nodeIndexMap.store(Node__from_ast.AsNode(aug), 0);
            }
            if (!(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) && !tsonicTypeScriptRuntime.sameLocation(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator, rootNode)) {
                nodeIndexMap.store(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator, 0);
            }
        }
    }
    let visitor: {
        value: NodeVisitor__from_ast;
    } | undefined = { value: new NodeVisitor__from_ast(void 0, void 0, new NodeVisitorHooks__from_ast(void 0, void 0, (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, visitor__shadow_1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (nodeList === undefined) {
                return nodeList;
            }
            nodeCount++;
            nodeTable = nodeTable.append(void 0, [void 0]);
            if (prevIndex !== 0) {
                const __gotots_assign_0 = nodeCount & 255;
                const __gotots_assign_1 = nodeCount >>> 8 & 255;
                const __gotots_assign_2 = nodeCount >>> 16 & 255;
                const __gotots_assign_3 = nodeCount >>> 24 & 255;
                let b0 = __gotots_assign_0;
                let b1 = __gotots_assign_1;
                let b2 = __gotots_assign_2;
                let b3 = __gotots_assign_3;
                nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 0, b0);
                nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 1, b1);
                nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 2, b2);
                nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 3, b3);
            }
            const __gotots_argument_11 = nodes;
            const __gotots_argument_4 = SyntaxKindNodeList;
            const __gotots_callee_0 = utf16;
            const __gotots_argument_2 = NodeList__from_ast.Pos(nodeList);
            const __gotots_argument_5 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            const __gotots_callee_1 = utf16;
            const __gotots_argument_3 = NodeList__from_ast.End(nodeList);
            const __gotots_argument_6 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            const __gotots_argument_7 = 0;
            const __gotots_argument_8 = parentIndex;
            const __gotots_argument_9 = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >>> 0;
            const __gotots_argument_10 = 0;
            const __gotots_argument_12 = RuntimeSlice.literal<uint32>([__gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10]);
            nodes = appendUint32s(__gotots_argument_11, __gotots_argument_12);
            let saveParentIndex = parentIndex;
            let currentIndex = nodeCount;
            prevIndex = 0;
            parentIndex = currentIndex;
            NodeVisitor__from_ast.VisitSlice(visitor__shadow_1, NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            prevIndex = currentIndex;
            parentIndex = saveParentIndex;
            return nodeList;
        }, (modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, visitor__shadow_1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
            if (!(modifiers === undefined) && NodeList__from_ast.$storageOf(NodeList__from_ast.$fromStorage(ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length > 0) {
                const __gotots_callee_2 = (visitor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNodes;
                const __gotots_store_1 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_argument_13 = tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeList"), ($go$storage: NodeList__from_ast$Storage): NodeList__from_ast => {
                    return NodeList__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeList__from_ast): NodeList__from_ast$Storage => {
                    return NodeList__from_ast.$storageOf($go$value);
                });
                const __gotots_argument_14 = visitor__shadow_1;
                (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
            }
            return modifiers;
        }, void 0, void 0, void 0, void 0, void 0)) };
    (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        nodeCount++;
        nodeTable = nodeTable.append(void 0, [node]);
        if (prevIndex !== 0) {
            const __gotots_assign_4 = nodeCount & 255;
            const __gotots_assign_5 = nodeCount >>> 8 & 255;
            const __gotots_assign_6 = nodeCount >>> 16 & 255;
            const __gotots_assign_7 = nodeCount >>> 24 & 255;
            let b0 = __gotots_assign_4;
            let b1 = __gotots_assign_5;
            let b2 = __gotots_assign_6;
            let b3 = __gotots_assign_7;
            nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 0, b0);
            nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 1, b1);
            nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 2, b2);
            nodes.set(prevIndex * NodeSize$uint32 + NodeOffsetNext$uint32 + 3, b3);
        }
        const __gotots_argument_24 = nodes;
        const __gotots_argument_17 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind >>> 0;
        const __gotots_callee_3 = utf16;
        const __gotots_argument_15 = Node__from_ast.Pos(node);
        const __gotots_argument_18 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
        const __gotots_callee_4 = utf16;
        const __gotots_argument_16 = Node__from_ast.End(node);
        const __gotots_argument_19 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
        const __gotots_argument_20 = 0;
        const __gotots_argument_21 = parentIndex;
        const __gotots_argument_22 = getNodeData(node, strs, positionMap, extendedData$location, structuredData$location);
        const __gotots_argument_23 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags;
        const __gotots_argument_25 = RuntimeSlice.literal<uint32>([__gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23]);
        nodes = appendUint32s(__gotots_argument_24, __gotots_argument_25);
        if (!nodeIndexMap.isNil()) {
            {
                const __gotots_results_0 = nodeIndexMap.lookupOk(node);
                let ok = __gotots_results_0[1];
                if (ok) {
                    nodeIndexMap.store(node, nodeCount);
                }
            }
        }
        let saveParentIndex = parentIndex;
        let currentIndex = nodeCount;
        prevIndex = 0;
        parentIndex = currentIndex;
        NodeVisitor__from_ast.VisitEachChild(visitor, node);
        if (!(sourceFile === undefined)) {
            const __gotots_range_2 = Node__from_ast.JSDoc(node, sourceFile);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                const __gotots_callee_5 = (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                const __gotots_argument_26 = jsdoc;
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
            }
        }
        prevIndex = currentIndex;
        parentIndex = saveParentIndex;
        return node;
    };
    nodes = appendUint32s(nodes, RuntimeSlice.literal<uint32>([0, 0, 0, 0, 0, 0, 0]));
    nodeCount++;
    parentIndex++;
    nodeTable = nodeTable.append(void 0, [rootNode]);
    sfExtendedDataOffset = extendedData.length;
    const __gotots_argument_36 = nodes;
    const __gotots_argument_29 = Node__from_ast.$storageOf(((rootNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind >>> 0;
    const __gotots_callee_6 = utf16;
    const __gotots_argument_27 = Node__from_ast.Pos(rootNode);
    const __gotots_argument_30 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
    const __gotots_callee_7 = utf16;
    const __gotots_argument_28 = Node__from_ast.End(rootNode);
    const __gotots_argument_31 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
    const __gotots_argument_32 = 0;
    const __gotots_argument_33 = 0;
    const __gotots_argument_34 = getNodeData(rootNode, strs, positionMap, extendedData$location, structuredData$location);
    const __gotots_argument_35 = Node__from_ast.$storageOf(((rootNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags;
    const __gotots_argument_37 = RuntimeSlice.literal<uint32>([__gotots_argument_29, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35]);
    nodes = appendUint32s(__gotots_argument_36, __gotots_argument_37);
    NodeVisitor__from_ast.VisitEachChild(visitor, rootNode);
    if (!(sourceFile === undefined)) {
        const __gotots_range_3 = Node__from_ast.JSDoc(rootNode, sourceFile);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            const __gotots_callee_8 = (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_38 = jsdoc;
            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
        }
    }
    let hash = Uint128__from_xxh3.$zero();
    let parseOpts = 0;
    if (Node__from_ast.$storageOf(((rootNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
        hash = Uint128__from_xxh3.$copy(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash);
        parseOpts = encodeParseOptions(ExternalModuleIndicatorOptions__from_ast.$fromStorage(SourceFileParseOptions__from_ast.$storageOf(SourceFile__from_ast.ParseOptions(sourceFile)).ExternalModuleIndicatorOptions));
        let sf: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(rootNode);
        let importsOffset = encodeNodeIndexArray(SourceFile__from_ast.Imports(sf), nodeIndexMap, structuredData$location);
        let moduleAugmentationsOffset = encodeModuleAugmentations(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations, nodeIndexMap, structuredData$location);
        let ambientModuleNamesOffset = encodeStringArray(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames, structuredData$location);
        binary__from_gostdlib.state.LittleEndian.PutUint32(extendedData.slice(sfExtendedDataOffset + 32, null, null), importsOffset);
        binary__from_gostdlib.state.LittleEndian.PutUint32(extendedData.slice(sfExtendedDataOffset + 36, null, null), moduleAugmentationsOffset);
        binary__from_gostdlib.state.LittleEndian.PutUint32(extendedData.slice(sfExtendedDataOffset + 40, null, null), ambientModuleNamesOffset);
        let externalModuleIndicatorIndex = 0;
        if (!(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined)) {
            if (tsonicTypeScriptRuntime.sameLocation(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator, rootNode)) {
                externalModuleIndicatorIndex = 1;
            }
            else {
                externalModuleIndicatorIndex = nodeIndexMap.lookup(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator);
            }
        }
        binary__from_gostdlib.state.LittleEndian.PutUint32(extendedData.slice(sfExtendedDataOffset + 44, null, null), externalModuleIndicatorIndex);
    }
    let metadata = 83886080;
    let offsetStringTableOffsets = HeaderSize$int;
    let offsetStringTableData = HeaderSize$int + (strs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.length * 4;
    let offsetExtendedData = offsetStringTableData + stringTable.$go$private$encoder$stringLength(strs);
    let offsetStructuredData = offsetExtendedData + extendedData.length;
    let offsetNodes = offsetStructuredData + structuredData.length;
    let header = RuntimeSlice.literal<uint32>([metadata, globalThis.Number(BigInt.asUintN(32, Uint128__from_xxh3.$storageOf(hash).Lo)), globalThis.Number(BigInt.asUintN(32, goUint64(Uint128__from_xxh3.$storageOf(hash).Lo >> 32n))), globalThis.Number(BigInt.asUintN(32, Uint128__from_xxh3.$storageOf(hash).Hi)), globalThis.Number(BigInt.asUintN(32, goUint64(Uint128__from_xxh3.$storageOf(hash).Hi >> 32n))), parseOpts, offsetStringTableOffsets >>> 0, offsetStringTableData >>> 0, offsetExtendedData >>> 0, offsetStructuredData >>> 0, offsetNodes >>> 0]);
    let headerBytes = RuntimeSlice.nil<uint8>(), strsBytes = RuntimeSlice.nil<uint8>();
    headerBytes = appendUint32s(RuntimeSlice.nil<uint8>(), header);
    strsBytes = stringTable.$go$private$encoder$encode(strs);
    return [Concat$SliceOf_byte$byte(RuntimeSlice.literal<RuntimeSlice<uint8>>([headerBytes, strsBytes, extendedData, structuredData, nodes])), new NodeIndexTable(nodeTable, named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<uint32>()), void 0];
}
export function appendUint32s(buf: RuntimeSlice<uint8>, values: RuntimeSlice<uint32>): RuntimeSlice<uint8> {
    const __gotots_range_7 = values;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_7);
        let value = __gotots_range_value_8;
        buf = binary__from_gostdlib.state.LittleEndian.AppendUint32(buf, value);
    }
    return buf;
}
export function getNodeData(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    let t = getNodeDataType(node);
    switch (t) {
        case NodeDataTypeChildren: {
            return ((t | getNodeCommonData(node)) >>> 0 | getChildrenPropertyMask(node)) >>> 0;
            break;
        }
        case NodeDataTypeString: {
            return ((t | getNodeCommonData(node)) >>> 0 | recordNodeStrings(node, strs)) >>> 0;
            break;
        }
        case NodeDataTypeExtendedData: {
            return ((t | getNodeCommonData(node)) >>> 0 | recordExtendedData(node, strs, positionMap, extendedData, structuredData)) >>> 0;
            break;
        }
        default: {
            const __gotots_argument_43 = new GoInterfaceAdapter("unreachable");
            GoPanic.raise(__gotots_argument_43 === undefined ? GoPanicNilValue.create() : __gotots_argument_43);
            break;
        }
    }
}
export const noStructuredData$uint32: uint32 = 4294967295;
export function recordExtendedData_SourceFile(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let sf: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(node);
    const __gotots_receiver_0 = strs;
    const __gotots_argument_45 = SourceFile__from_ast.Text(sf);
    const __gotots_argument_46 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault)).Node)).Kind;
    const __gotots_store_4 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    const __gotots_argument_47 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
        return Node__from_ast.$fromStorage($go$storage);
    }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
        return Node__from_ast.$storageOf($go$value);
    }));
    const __gotots_store_5 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    const __gotots_argument_48 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
        return Node__from_ast.$fromStorage($go$storage);
    }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
        return Node__from_ast.$storageOf($go$value);
    }));
    let textIndex = stringTable.$go$private$encoder$add(__gotots_receiver_0, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
    let fileNameIndex = stringTable.$go$private$encoder$add(strs, SourceFile__from_ast.FileName(sf), 0, 0, 0);
    let pathIndex = stringTable.$go$private$encoder$add(strs, SourceFile__from_ast.Path(sf).$value, 0, 0, 0);
    let referencedFilesOffset = encodeFileReferences(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles, positionMap, structuredData);
    let typeRefDirectivesOffset = encodeFileReferences(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives, positionMap, structuredData);
    let libRefDirectivesOffset = encodeFileReferences(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives, positionMap, structuredData);
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, fileNameIndex, pathIndex, ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant >>> 0, ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind >>> 0, referencedFilesOffset, typeRefDirectivesOffset, libRefDirectivesOffset, noStructuredData$uint32, noStructuredData$uint32, noStructuredData$uint32, 0])));
}
export function recordExtendedData_TemplateHead(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: TemplateHead__from_ast;
    } | undefined = Node__from_ast.AsTemplateHead(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    let rawTextIndex = stringTable.$go$private$encoder$add(strs, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, rawTextIndex, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.TemplateFlags >>> 0])));
}
export function recordExtendedData_TemplateMiddle(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: TemplateMiddle__from_ast;
    } | undefined = Node__from_ast.AsTemplateMiddle(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    let rawTextIndex = stringTable.$go$private$encoder$add(strs, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, rawTextIndex, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.TemplateFlags >>> 0])));
}
export function recordExtendedData_TemplateTail(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: TemplateTail__from_ast;
    } | undefined = Node__from_ast.AsTemplateTail(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    let rawTextIndex = stringTable.$go$private$encoder$add(strs, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, rawTextIndex, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.TemplateFlags >>> 0])));
}
export function boolToByte(b: bool): uint8 {
    if (b) {
        return 1;
    }
    return 0;
}
export function hasModifiers(modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): bool {
    return !(modifiers === undefined) && NodeList__from_ast.$storageOf(NodeList__from_ast.$fromStorage(ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length > 0;
}
export function encodeFileReferences(refs: RuntimeSlice<{
    value: FileReference__from_ast;
} | undefined>, positionMap: {
    value: PositionMap__from_ast;
} | undefined, buf: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    if (refs.length === 0) {
        return noStructuredData$uint32;
    }
    let offset = ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length >>> 0;
    void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        msgpackWriteArrayHeader(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, refs.length));
    const __gotots_range_11 = refs;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
        const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_11);
        let ref: {
            value: FileReference__from_ast;
        } | undefined = __gotots_range_value_12;
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteArrayHeader(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, 5));
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteUint(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, PositionMap__from_ast.UTF8ToUTF16(positionMap, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange.Pos()) >>> 0));
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteUint(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, PositionMap__from_ast.UTF8ToUTF16(positionMap, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange.End()) >>> 0));
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteString(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName));
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteUint(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode >>> 0));
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteBool(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve));
    }
    return offset;
}
export function encodeNodeIndexArray(nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, indexMap: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, uint32>, buf: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    if (nodes.length === 0) {
        return noStructuredData$uint32;
    }
    let offset = ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length >>> 0;
    void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        msgpackWriteArrayHeader(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, nodes.length));
    const __gotots_range_8 = nodes;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteUint(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, indexMap.lookup(Node__from_ast.AsNode(node))));
    }
    return offset;
}
export function encodeModuleAugmentations(nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, indexMap: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, uint32>, buf: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    if (nodes.length === 0) {
        return noStructuredData$uint32;
    }
    let offset = ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length >>> 0;
    void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        msgpackWriteArrayHeader(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, nodes.length));
    const __gotots_range_9 = nodes;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_9);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteUint(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, indexMap.lookup(Node__from_ast.AsNode(node))));
    }
    return offset;
}
export function encodeStringArray(strs: RuntimeSlice<gostring>, buf: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    if (strs.length === 0) {
        return noStructuredData$uint32;
    }
    let offset = ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length >>> 0;
    void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        msgpackWriteArrayHeader(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, strs.length));
    const __gotots_range_10 = strs;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
        const __gotots_range_value_11 = __gotots_range_10.get(__gotots_range_index_10);
        let s = __gotots_range_value_11;
        void ((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            msgpackWriteString(((buf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, s));
    }
    return offset;
}
export function msgpackWriteArrayHeader(buf: RuntimeSlice<uint8>, length: int): RuntimeSlice<uint8> {
    if (length <= 15) {
        return buf.append(0, [(144 | length) & 255]);
    }
    if (length <= 65535) {
        return buf.append(0, [220, length >> 8 & 255, length & 255]);
    }
    return buf.append(0, [221, length >> 24 & 255, length >> 16 & 255, length >> 8 & 255, length & 255]);
}
export function msgpackWriteUint(buf: RuntimeSlice<uint8>, value: uint32): RuntimeSlice<uint8> {
    if (value <= 127) {
        return buf.append(0, [value & 255]);
    }
    if (value <= 255) {
        return buf.append(0, [204, value & 255]);
    }
    if (value <= 65535) {
        return buf.append(0, [205, value >>> 8 & 255, value & 255]);
    }
    return buf.append(0, [206, value >>> 24 & 255, value >>> 16 & 255, value >>> 8 & 255, value & 255]);
}
export function msgpackWriteString(buf: RuntimeSlice<uint8>, s: gostring): RuntimeSlice<uint8> {
    let n = s.length;
    if (n <= 31) {
        buf = buf.append(0, [(160 | n) & 255]);
    }
    else if (n <= 255) {
        buf = buf.append(0, [217, n & 255]);
    }
    else if (n <= 65535) {
        buf = buf.append(0, [218, n >> 8 & 255, n & 255]);
    }
    else {
        buf = buf.append(0, [219, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255]);
    }
    const __gotots_slice_build_0 = buf;
    const __gotots_slice_build_1 = s;
    const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
        __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
    }
    return goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
}
export function msgpackWriteBool(buf: RuntimeSlice<uint8>, value: bool): RuntimeSlice<uint8> {
    if (value) {
        return buf.append(0, [195]);
    }
    return buf.append(0, [194]);
}
export function getNodeCommonData_SyntheticExpression($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): uint32 {
    const __gotots_argument_44 = new GoInterfaceAdapter("SyntheticExpression should never be encoded");
    GoPanic.raise(__gotots_argument_44 === undefined ? GoPanicNilValue.create() : __gotots_argument_44);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function recordExtendedData_StringLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, $2: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, $4: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined = Node__from_ast.AsStringLiteral(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(StringLiteral__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(StringLiteral__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags >>> 0])));
}
export function recordExtendedData_NumericLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, $2: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, $4: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast> | undefined = Node__from_ast.AsNumericLiteral(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(NumericLiteral__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(NumericLiteral__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags >>> 0])));
}
export function recordExtendedData_BigIntLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, $2: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, $4: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: BigIntLiteral__from_ast;
    } | undefined = Node__from_ast.AsBigIntLiteral(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).TokenFlags >>> 0])));
}
export function recordExtendedData_RegularExpressionLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, $2: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, $4: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: RegularExpressionLiteral__from_ast;
    } | undefined = Node__from_ast.AsRegularExpressionLiteral(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).TokenFlags >>> 0])));
}
export function recordExtendedData_NoSubstitutionTemplateLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, $2: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, $4: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    let n: {
        value: NoSubstitutionTemplateLiteral__from_ast;
    } | undefined = Node__from_ast.AsNoSubstitutionTemplateLiteral(node);
    let textIndex = stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
    void ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        appendUint32s(((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value, RuntimeSlice.literal<uint32>([textIndex, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.TemplateFlags >>> 0])));
}
