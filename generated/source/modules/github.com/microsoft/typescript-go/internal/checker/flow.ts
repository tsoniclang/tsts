import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FlowList as FlowList__from_ast, FlowReduceLabelData as FlowReduceLabelData__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LiteralType, UniqueESSymbolType } from "./types.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FlowNodeBase as FlowNodeBase__from_ast, FlowNode as FlowNode__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, Node as Node__from_ast, SkipParentheses as SkipParentheses__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { AnyToString as AnyToString__from_evaluator } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { CacheHashKey } from "./checker.js";
import { ObjectFlagsEvolvingArray$constant, Type, TypeFlagsNever$constant, TypeFlagsStringOrNumberLiteral$constant, TypeFlagsUniqueESSymbol$constant } from "./types.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type FlowType$Storage = {
    t: tsonicTypeScriptRuntime.Location<Type> | undefined;
    incomplete: bool;
};
export class FlowType {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FlowType$Storage) {
    }
    public static $storageOf($source: FlowType): FlowType$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FlowType$Storage): FlowType {
        return new FlowType($source);
    }
    public get t(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.t;
    }
    public set t($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.t = $value;
    }
    public get incomplete(): bool {
        return this.$storage.incomplete;
    }
    public set incomplete($value: bool) {
        this.$storage.incomplete = $value;
    }
    static $zero(): FlowType {
        return new FlowType({
            t: void 0,
            incomplete: false
        });
    }
    static $copy($source: FlowType): FlowType {
        return new FlowType({
            t: $source.$storage.t,
            incomplete: $source.$storage.incomplete
        });
    }
    static $equal($left: FlowType, $right: FlowType): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.t, $right.$storage.t)
            && $left.$storage.incomplete === $right.$storage.incomplete;
    }
    static $hash($source: FlowType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.t));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.incomplete));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$checker$isNil(ft: tsonicTypeScriptRuntime.Location<FlowType> | undefined): bool {
        return FlowType.$storageOf(((ft ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowType>).value).t === undefined;
    }
}
export type SharedFlow$Storage = {
    flow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined;
    flowType: FlowType$Storage;
};
export class SharedFlow {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SharedFlow$Storage) {
    }
    public static $storageOf($source: SharedFlow): SharedFlow$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SharedFlow$Storage): SharedFlow {
        return new SharedFlow($source);
    }
    public get flow(): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return this.$storage.flow;
    }
    public set flow($value: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined) {
        this.$storage.flow = $value;
    }
    public get flowType(): FlowType {
        return FlowType.$fromStorage(this.$storage.flowType);
    }
    public set flowType($value: FlowType) {
        this.$storage.flowType = FlowType.$storageOf($value);
    }
    static $zero(): SharedFlow {
        return new SharedFlow({
            flow: void 0,
            flowType: FlowType.$storageOf(FlowType.$zero())
        });
    }
    static $copy($source: SharedFlow): SharedFlow {
        return new SharedFlow({
            flow: $source.$storage.flow,
            flowType: FlowType.$storageOf(FlowType.$copy(FlowType.$fromStorage($source.$storage.flowType)))
        });
    }
    static $equal($left: SharedFlow, $right: SharedFlow): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.flow, $right.$storage.flow)
            && FlowType.$equal(FlowType.$fromStorage($left.$storage.flowType), FlowType.$fromStorage($right.$storage.flowType));
    }
    static $hash($source: SharedFlow): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.flow));
        $hash = GoMapHash.mix($hash, FlowType.$hash(FlowType.$fromStorage($source.$storage.flowType)));
        return $hash;
    }
    declare private readonly then?: never;
}
export class FlowState {
    declare private readonly $goType: void;
    public constructor(public reference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined, public initialType: tsonicTypeScriptRuntime.Location<Type> | undefined, public flowContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public refKey: CacheHashKey, public depth: int, public sharedFlowStart: int, public reduceLabels: RuntimeSlice<{
        value: FlowReduceLabelData__from_ast;
    } | undefined>, public next: {
        value: FlowState;
    } | undefined) {
    }
    static $copy($source: FlowState): FlowState {
        return new FlowState($source.reference, $source.declaredType, $source.initialType, $source.flowContainer, CacheHashKey.$copy($source.refKey), $source.depth, $source.sharedFlowStart, $source.reduceLabels, $source.next);
    }
    declare private readonly then?: never;
}
export function getFlowNodeOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
    let flowNodeData: tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast> | undefined = Node__from_ast.FlowNodeData(node);
    if (!(flowNodeData === undefined)) {
        return FlowNodeBase__from_ast.$storageOf(((flowNodeData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast>).value).FlowNode;
    }
    return void 0;
}
export function getBranchLabelAntecedents(flow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, reduceLabels: RuntimeSlice<{
    value: FlowReduceLabelData__from_ast;
} | undefined>): tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined {
    let i = reduceLabels.length;
    for (; i !== 0;) {
        i--;
        let data: {
            value: FlowReduceLabelData__from_ast;
        } | undefined = reduceLabels.get(i);
        if (tsonicTypeScriptRuntime.sameLocation((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target, flow)) {
            return (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Antecedents;
        }
    }
    return FlowNode__from_ast.$storageOf(((flow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents;
}
export function getCandidateVariableDeclarationInitializer(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsVariableDeclaration__from_ast(node) && Node__from_ast.Type(node) === undefined) {
        {
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(node);
            if (!(initializer === undefined)) {
                return SkipParentheses__from_ast(initializer);
            }
        }
    }
    return void 0;
}
export function isEvolvingArrayTypeList(types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): bool {
    let hasEvolvingArrayType = false;
    const __gotots_range_0 = types;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_0;
        if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0) {
            if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsEvolvingArray$constant()) >>> 0 === 0) {
                return false;
            }
            hasEvolvingArrayType = true;
        }
    }
    return hasEvolvingArrayType;
}
export function tryGetNameFromType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): [
    gostring,
    bool
] {
    __gotots_control_target_0: {
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0)) {
            return [(Type.AsUniqueESSymbolType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name, true];
        }
        else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringOrNumberLiteral$constant()) >>> 0 === 0)) {
            return [AnyToString__from_evaluator((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value), true];
        }
    }
    return ["", false];
}
export function isCoercibleUnderDoubleEquals(source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (8288)) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (352)) >>> 0 === 0);
}
