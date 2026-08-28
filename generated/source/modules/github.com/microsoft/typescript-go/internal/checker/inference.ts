import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { InferencePriority } from "./checker.js";
import type { ExpandingFlags } from "./relater.js";
import type { TupleType, TypeId } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, Node as Node__from_ast, Symbol as Symbol__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Find$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { Clone$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { InferenceInfo, InferencePriorityMaxValue$constant } from "./checker.js";
import { ElementFlagsVariable$constant, ElementFlagsVariadic$constant, Type, TypeFlagsIntersection$constant, TypeFlagsTypeVariable$constant } from "./types.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class InferenceKey {
    declare private readonly $goType: void;
    public constructor(public s: TypeId, public t: TypeId) {
    }
    static $copy($source: InferenceKey): InferenceKey {
        return new InferenceKey($source.s, $source.t);
    }
    static $equal($left: InferenceKey, $right: InferenceKey): bool {
        return $left.s === $right.s && $left.t === $right.t;
    }
    static $hash($source: InferenceKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.s));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.t));
        return $hash;
    }
    declare private readonly then?: never;
}
export class InferenceState {
    declare private readonly $goType: void;
    public constructor(public inferences: RuntimeSlice<{
        value: InferenceInfo;
    } | undefined>, public originalSource: tsonicTypeScriptRuntime.Location<Type> | undefined, public originalTarget: tsonicTypeScriptRuntime.Location<Type> | undefined, public priority: InferencePriority, public inferencePriority: InferencePriority, public contravariant: bool, public bivariant: bool, public expandingFlags: ExpandingFlags, public propagationType: tsonicTypeScriptRuntime.Location<Type> | undefined, public visited: GoMapValue<InferenceKey, InferencePriority>, public sourceStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public targetStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public next: {
        value: InferenceState;
    } | undefined) {
    }
    static $copy($source: InferenceState): InferenceState {
        return new InferenceState($source.inferences, $source.originalSource, $source.originalTarget, $source.priority, $source.inferencePriority, $source.contravariant, $source.bivariant, $source.expandingFlags, $source.propagationType, $source.visited, $source.sourceStack, $source.targetStack, $source.next);
    }
    declare private readonly then?: never;
}
export function getSingleTypeVariableFromIntersectionTypes(n: {
    value: InferenceState;
} | undefined, types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): tsonicTypeScriptRuntime.Location<Type> | undefined {
    let typeVariable: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
    const __gotots_range_4 = types;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_4;
        if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) {
            return void 0;
        }
        let v: tsonicTypeScriptRuntime.Location<Type> | undefined = Find$PointerTo_Named_checker$Type(Type.Types(t), (t__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
            return !(getInferenceInfoForType(n, t__shadow_1) === undefined);
        });
        if (v === undefined || !(typeVariable === undefined) && !tsonicTypeScriptRuntime.sameLocation(v, typeVariable)) {
            return void 0;
        }
        typeVariable = v;
    }
    return typeVariable;
}
export function tupleTypesDefinitelyUnrelated(source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    let s: {
        value: TupleType;
    } | undefined = Type.TargetTupleType(source);
    let t: {
        value: TupleType;
    } | undefined = Type.TargetTupleType(target);
    return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsVariadic$constant()) >>> 0 === 0 && (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.minLength > (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.minLength || ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsVariable$constant()) >>> 0 === 0 && (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsVariable$constant()) >>> 0 === 0) || (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fixedLength < (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fixedLength);
}
export function getInferenceInfoForType(n: {
    value: InferenceState;
} | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
    value: InferenceInfo;
} | undefined {
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeVariable$constant()) >>> 0 === 0)) {
        const __gotots_range_2: InferenceState["inferences"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferences;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let inference: {
                value: InferenceInfo;
            } | undefined = __gotots_range_value_2;
            if (tsonicTypeScriptRuntime.sameLocation(t, (inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeParameter)) {
                return inference;
            }
        }
    }
    return void 0;
}
export function newInferenceInfo(typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined): {
    value: InferenceInfo;
} | undefined {
    return { value: new InferenceInfo(typeParameter, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), void 0, InferencePriorityMaxValue$constant(), true, false, -1) };
}
export function cloneInferenceInfo(info: {
    value: InferenceInfo;
} | undefined): {
    value: InferenceInfo;
} | undefined {
    return { value: new InferenceInfo((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeParameter, Clone$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.candidates), Clone$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contraCandidates), (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredType, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.priority, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.topLevel, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isFixed, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.impliedArity) };
}
export function clearCachedInferences(inferences: RuntimeSlice<{
    value: InferenceInfo;
} | undefined>): void {
    const __gotots_range_3 = inferences;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let inference: {
            value: InferenceInfo;
        } | undefined = __gotots_range_value_3;
        if (!(inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isFixed) {
            (inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredType = void 0;
        }
    }
}
export function hasInferenceCandidates(info: {
    value: InferenceInfo;
} | undefined): bool {
    return (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.candidates.length !== 0 || (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contraCandidates.length !== 0;
}
export function hasInferenceCandidatesOrDefault(info: {
    value: InferenceInfo;
} | undefined): bool {
    return !(info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.candidates.isNil() || !(info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contraCandidates.isNil() || hasTypeParameterDefault((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeParameter);
}
export function hasTypeParameterDefault(tp: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    if (!(((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
        const __gotots_range_1 = Symbol__from_ast.$storageOf(((((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            if (IsTypeParameterDeclaration__from_ast(d) && !(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType === undefined)) {
                return true;
            }
        }
    }
    return false;
}
export function hasOverlappingInferences(a: RuntimeSlice<{
    value: InferenceInfo;
} | undefined>, b: RuntimeSlice<{
    value: InferenceInfo;
} | undefined>): bool {
    const __gotots_range_0 = a;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        if (hasInferenceCandidates(a.get(i)) && hasInferenceCandidates(b.get(i))) {
            return true;
        }
    }
    return false;
}
