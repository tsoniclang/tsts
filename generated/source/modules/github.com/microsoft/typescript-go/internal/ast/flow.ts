import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node } from "./ast.js";
import type { bool, int, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$FlowSwitchClauseData, $goInterfaceAdapter$PointerTo_Named_ast$FlowReduceLabelData as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { NodeBase, NodeFactoryHooks, newNode } from "./ast.js";
import { KindUnknown$constant } from "./kind_generated.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type FlowFlags = uint32;
export function FlowFlagsUnreachable$constant(): FlowFlags {
    return 1;
}
export function FlowFlagsStart$constant(): FlowFlags {
    return 2;
}
export function FlowFlagsBranchLabel$constant(): FlowFlags {
    return 4;
}
export function FlowFlagsLoopLabel$constant(): FlowFlags {
    return 8;
}
export function FlowFlagsAssignment$constant(): FlowFlags {
    return 16;
}
export function FlowFlagsTrueCondition$constant(): FlowFlags {
    return 32;
}
export function FlowFlagsFalseCondition$constant(): FlowFlags {
    return 64;
}
export function FlowFlagsSwitchClause$constant(): FlowFlags {
    return 128;
}
export function FlowFlagsArrayMutation$constant(): FlowFlags {
    return 256;
}
export function FlowFlagsCall$constant(): FlowFlags {
    return 512;
}
export function FlowFlagsReduceLabel$constant(): FlowFlags {
    return 1024;
}
export function FlowFlagsReferenced$constant(): FlowFlags {
    return 2048;
}
export function FlowFlagsShared$constant(): FlowFlags {
    return 4096;
}
export function FlowFlagsCondition$constant(): FlowFlags {
    return 96;
}
export type FlowNode$Storage = {
    Flags: uint32;
    Node: tsonicTypeScriptRuntime.Location<Node> | undefined;
    Antecedent: tsonicTypeScriptRuntime.Location<FlowNode> | undefined;
    Antecedents: tsonicTypeScriptRuntime.Location<FlowList> | undefined;
};
export class FlowNode implements GoContainerStoredValue<FlowNode$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FlowNode$Storage) {
    }
    public static $storageOf($source: FlowNode): FlowNode$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FlowNode$Storage): FlowNode {
        return new FlowNode($source);
    }
    public get Flags(): FlowFlags {
        return this.$storage.Flags;
    }
    public set Flags($value: FlowFlags) {
        this.$storage.Flags = $value;
    }
    public get Node(): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return this.$storage.Node;
    }
    public set Node($value: tsonicTypeScriptRuntime.Location<Node> | undefined) {
        this.$storage.Node = $value;
    }
    public get Antecedent(): tsonicTypeScriptRuntime.Location<FlowNode> | undefined {
        return this.$storage.Antecedent;
    }
    public set Antecedent($value: tsonicTypeScriptRuntime.Location<FlowNode> | undefined) {
        this.$storage.Antecedent = $value;
    }
    public get Antecedents(): tsonicTypeScriptRuntime.Location<FlowList> | undefined {
        return this.$storage.Antecedents;
    }
    public set Antecedents($value: tsonicTypeScriptRuntime.Location<FlowList> | undefined) {
        this.$storage.Antecedents = $value;
    }
    declare readonly [$goContainerStorageType]: FlowNode$Storage;
    static $zero(): FlowNode {
        return new FlowNode({
            Flags: 0,
            Node: void 0,
            Antecedent: void 0,
            Antecedents: void 0
        });
    }
    static $copy($source: FlowNode): FlowNode {
        return new FlowNode({
            Flags: $source.$storage.Flags,
            Node: $source.$storage.Node,
            Antecedent: $source.$storage.Antecedent,
            Antecedents: $source.$storage.Antecedents
        });
    }
    static $equal($left: FlowNode, $right: FlowNode): bool {
        return $left.$storage.Flags === $right.$storage.Flags &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.Node, $right.$storage.Node) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.Antecedent, $right.$storage.Antecedent) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.Antecedents, $right.$storage.Antecedents);
    }
    static $hash($source: FlowNode): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Flags));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Node));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Antecedent));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Antecedents));
        return $hash;
    }
    static $zeroStorage(): FlowNode$Storage {
        return {
            Flags: 0,
            Node: void 0,
            Antecedent: void 0,
            Antecedents: void 0
        };
    }
    declare private readonly then?: never;
}
export type FlowList$Storage = {
    Flow: tsonicTypeScriptRuntime.Location<FlowNode> | undefined;
    Next: tsonicTypeScriptRuntime.Location<FlowList> | undefined;
};
export class FlowList implements GoContainerStoredValue<FlowList$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FlowList$Storage) {
    }
    public static $storageOf($source: FlowList): FlowList$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FlowList$Storage): FlowList {
        return new FlowList($source);
    }
    public get Flow(): tsonicTypeScriptRuntime.Location<FlowNode> | undefined {
        return this.$storage.Flow;
    }
    public set Flow($value: tsonicTypeScriptRuntime.Location<FlowNode> | undefined) {
        this.$storage.Flow = $value;
    }
    public get Next(): tsonicTypeScriptRuntime.Location<FlowList> | undefined {
        return this.$storage.Next;
    }
    public set Next($value: tsonicTypeScriptRuntime.Location<FlowList> | undefined) {
        this.$storage.Next = $value;
    }
    declare readonly [$goContainerStorageType]: FlowList$Storage;
    static $zero(): FlowList {
        return new FlowList({
            Flow: void 0,
            Next: void 0
        });
    }
    static $copy($source: FlowList): FlowList {
        return new FlowList({
            Flow: $source.$storage.Flow,
            Next: $source.$storage.Next
        });
    }
    static $equal($left: FlowList, $right: FlowList): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.Flow, $right.$storage.Flow)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.Next, $right.$storage.Next);
    }
    static $hash($source: FlowList): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Flow));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Next));
        return $hash;
    }
    static $zeroStorage(): FlowList$Storage {
        return {
            Flow: void 0,
            Next: void 0
        };
    }
    declare private readonly then?: never;
}
export class FlowSwitchClauseData {
    declare private readonly $goType: void;
    public constructor(public NodeBase: NodeBase, public SwitchStatement: tsonicTypeScriptRuntime.Location<Node> | undefined, public ClauseStart: int32, public ClauseEnd: int32) {
    }
    static $copy($source: FlowSwitchClauseData): FlowSwitchClauseData {
        return new FlowSwitchClauseData(NodeBase.$copy($source.NodeBase), $source.SwitchStatement, $source.ClauseStart, $source.ClauseEnd);
    }
    static $equal($left: FlowSwitchClauseData, $right: FlowSwitchClauseData): bool {
        return NodeBase.$equal($left.NodeBase, $right.NodeBase) &&
            tsonicTypeScriptRuntime.sameLocation($left.SwitchStatement, $right.SwitchStatement) && $left.ClauseStart === $right.ClauseStart && $left.ClauseEnd === $right.ClauseEnd;
    }
    static $hash($source: FlowSwitchClauseData): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, NodeBase.$hash($source.NodeBase));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.SwitchStatement));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ClauseStart));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ClauseEnd));
        return $hash;
    }
    declare private readonly then?: never;
    static IsEmpty(node: {
        value: FlowSwitchClauseData;
    } | undefined): bool {
        return (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClauseStart === (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClauseEnd;
    }
}
export function NewFlowSwitchClauseData(switchStatement: tsonicTypeScriptRuntime.Location<Node> | undefined, clauseStart: int, clauseEnd: int): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let node: {
        value: FlowSwitchClauseData;
    } | undefined = { value: new FlowSwitchClauseData(NodeBase.$zero(), void 0, 0, 0) };
    (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SwitchStatement = switchStatement;
    (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClauseStart = clauseStart | 0;
    (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClauseEnd = clauseEnd | 0;
    return newNode(KindUnknown$constant(), new $goInterfaceAdapter$PointerTo_Named_ast$FlowSwitchClauseData(node), new NodeFactoryHooks(void 0, void 0, void 0));
}
export class FlowReduceLabelData {
    declare private readonly $goType: void;
    public constructor(public NodeBase: NodeBase, public Target: tsonicTypeScriptRuntime.Location<FlowNode> | undefined, public Antecedents: tsonicTypeScriptRuntime.Location<FlowList> | undefined) {
    }
    static $copy($source: FlowReduceLabelData): FlowReduceLabelData {
        return new FlowReduceLabelData(NodeBase.$copy($source.NodeBase), $source.Target, $source.Antecedents);
    }
    static $equal($left: FlowReduceLabelData, $right: FlowReduceLabelData): bool {
        return NodeBase.$equal($left.NodeBase, $right.NodeBase) &&
            tsonicTypeScriptRuntime.sameLocation($left.Target, $right.Target) &&
            tsonicTypeScriptRuntime.sameLocation($left.Antecedents, $right.Antecedents);
    }
    static $hash($source: FlowReduceLabelData): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, NodeBase.$hash($source.NodeBase));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Target));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Antecedents));
        return $hash;
    }
    declare private readonly then?: never;
}
export function NewFlowReduceLabelData(target: tsonicTypeScriptRuntime.Location<FlowNode> | undefined, antecedents: tsonicTypeScriptRuntime.Location<FlowList> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let node: {
        value: FlowReduceLabelData;
    } | undefined = { value: new FlowReduceLabelData(NodeBase.$zero(), void 0, void 0) };
    (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target = target;
    (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Antecedents = antecedents;
    return newNode(KindUnknown$constant(), new GoInterfaceAdapter(node), new NodeFactoryHooks(void 0, void 0, void 0));
}
