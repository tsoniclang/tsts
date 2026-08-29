import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { InferenceContext, InferenceInfo } from "./checker.js";
import type { Type } from "./types.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, int32 } from "@gotots/runtime/scalars.js";
import { Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$ArrayToSingleTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$ArrayTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$CompositeTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$DeferredTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$MergedTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$SimpleTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$FunctionTypeMapper as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Kind$void_to_Named_checker$TypeMapperKind, $goInterfaceMethod$Map$PointerTo_Named_checker$Type_to_PointerTo_Named_checker$Type } from "../../../../../../support/interface-methods.js";
import { Checker } from "./checker.js";
import { clearCachedInferences } from "./inference.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type TypeMapperKind = int32;
export function TypeMapperKindUnknown$constant(): TypeMapperKind {
    return 0;
}
export function TypeMapperKindSimple$constant(): TypeMapperKind {
    return 1;
}
export function TypeMapperKindArray$constant(): TypeMapperKind {
    return 2;
}
export function TypeMapperKindMerged$constant(): TypeMapperKind {
    return 3;
}
export class TypeMapper {
    declare private readonly $goType: void;
    public constructor(public data: TypeMapperData | undefined) {
    }
    static $zero(): TypeMapper {
        return new TypeMapper(void 0);
    }
    static $copy($source: TypeMapper): TypeMapper {
        return new TypeMapper($source.data);
    }
    static $equal($left: TypeMapper, $right: TypeMapper): bool {
        return goInterfaceEqual($left.data, $right.data);
    }
    static $hash($source: TypeMapper): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.data === undefined ? 0 : $source.data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Kind(m: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): TypeMapperKind {
        const __gotots_receiver_1 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data;
        return goInterfaceNonNil<TypeMapperData>(__gotots_receiver_1).Kind();
    }
    static Map(m: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_receiver_0 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data;
        const __gotots_argument_0 = t;
        return goInterfaceNonNil<TypeMapperData>(__gotots_receiver_0).Map(__gotots_argument_0);
    }
}
export interface TypeMapperData extends GoInterfaceValue {
    Kind(): TypeMapperKind;
    Map($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined;
}
export const TypeMapperData$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Kind$void_to_Named_checker$TypeMapperKind, $goInterfaceMethod$Map$PointerTo_Named_checker$Type_to_PointerTo_Named_checker$Type]);
export function TypeMapperData$is(value: GoInterfaceValue | undefined): value is TypeMapperData {
    return value !== undefined && value.$go$implements(TypeMapperData$contract);
}
export function newTypeMapper(sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, targets: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    if (sources.length === 1) {
        return newSimpleTypeMapper(sources.get(0), targets.get(0));
    }
    return newArrayTypeMapper(sources, targets);
}
export function mergeTypeMappers(m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    if (!(m1 === undefined)) {
        return newMergedTypeMapper(m1, m2);
    }
    return m2;
}
export function prependTypeMapping(source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    if (mapper === undefined) {
        return newSimpleTypeMapper(source, target);
    }
    return newMergedTypeMapper(newSimpleTypeMapper(source, target), mapper);
}
export function appendTypeMapping(mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    if (mapper === undefined) {
        return newSimpleTypeMapper(source, target);
    }
    return newMergedTypeMapper(mapper, newSimpleTypeMapper(source, target));
}
export class TypeMapperBase {
    declare private readonly $goType: void;
    public constructor(public TypeMapper: TypeMapper) {
    }
    static $zero(): TypeMapperBase {
        return new TypeMapperBase(TypeMapper.$zero());
    }
    static $copy($source: TypeMapperBase): TypeMapperBase {
        return new TypeMapperBase(TypeMapper.$copy($source.TypeMapper));
    }
    static $equal($left: TypeMapperBase, $right: TypeMapperBase): bool {
        return TypeMapper.$equal($left.TypeMapper, $right.TypeMapper);
    }
    static $hash($source: TypeMapperBase): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeMapper.$hash($source.TypeMapper));
        return $hash;
    }
    declare private readonly then?: never;
    static Kind(m: tsonicTypeScriptRuntime.Location<TypeMapperBase> | undefined): TypeMapperKind {
        return TypeMapperKindUnknown$constant();
    }
}
export class SimpleTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public source: tsonicTypeScriptRuntime.Location<Type> | undefined, public target: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: SimpleTypeMapper): SimpleTypeMapper {
        return new SimpleTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.source, $source.target);
    }
    static $equal($left: SimpleTypeMapper, $right: SimpleTypeMapper): bool {
        return TypeMapperBase.$equal($left.TypeMapperBase, $right.TypeMapperBase) &&
            tsonicTypeScriptRuntime.sameLocation($left.source, $right.source) &&
            tsonicTypeScriptRuntime.sameLocation($left.target, $right.target);
    }
    static $hash($source: SimpleTypeMapper): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeMapperBase.$hash($source.TypeMapperBase));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.source));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.target));
        return $hash;
    }
    declare private readonly then?: never;
    static Kind(m: {
        value: SimpleTypeMapper;
    } | undefined): TypeMapperKind {
        return TypeMapperKindSimple$constant();
    }
    static Map(m: {
        value: SimpleTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        if (tsonicTypeScriptRuntime.sameLocation(t, (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source)) {
            return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
        }
        return t;
    }
}
export function newSimpleTypeMapper(source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: SimpleTypeMapper;
    } | undefined = { value: new SimpleTypeMapper(TypeMapperBase.$zero(), void 0, void 0) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$SimpleTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source = source;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target = target;
    const __gotots_store_1: SimpleTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "TypeMapper");
}
export class ArrayTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public targets: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $copy($source: ArrayTypeMapper): ArrayTypeMapper {
        return new ArrayTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.sources, $source.targets);
    }
    declare private readonly then?: never;
    static Kind(m: {
        value: ArrayTypeMapper;
    } | undefined): TypeMapperKind {
        return TypeMapperKindArray$constant();
    }
    static Map(m: {
        value: ArrayTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_range_0: ArrayTypeMapper["sources"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let s: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_1;
            if (tsonicTypeScriptRuntime.sameLocation(t, s)) {
                return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets.get(i);
            }
        }
        return t;
    }
}
export function newArrayTypeMapper(sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, targets: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: ArrayTypeMapper;
    } | undefined = { value: new ArrayTypeMapper(TypeMapperBase.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>()) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$ArrayTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources = sources;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets = targets;
    const __gotots_store_3: ArrayTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "TypeMapper");
}
export class ArrayToSingleTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public target: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: ArrayToSingleTypeMapper): ArrayToSingleTypeMapper {
        return new ArrayToSingleTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.sources, $source.target);
    }
    declare private readonly then?: never;
    static Map(m: {
        value: ArrayToSingleTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        if (Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources, t)) {
            return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
        }
        return t;
    }
}
export function newArrayToSingleTypeMapper(sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, target: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: ArrayToSingleTypeMapper;
    } | undefined = { value: new ArrayToSingleTypeMapper(TypeMapperBase.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), void 0) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$ArrayToSingleTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources = sources;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target = target;
    const __gotots_store_6: ArrayToSingleTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "TypeMapper");
}
export class DeferredTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public targets: RuntimeSlice<(() => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined>) {
    }
    static $copy($source: DeferredTypeMapper): DeferredTypeMapper {
        return new DeferredTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.sources, $source.targets);
    }
    declare private readonly then?: never;
    static Map(m: {
        value: DeferredTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_range_2: DeferredTypeMapper["sources"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_4 = __gotots_range_index_2;
            const __gotots_range_value_5 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_4;
            let s: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_5;
            if (tsonicTypeScriptRuntime.sameLocation(t, s)) {
                const __gotots_callee_1 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets.get(i);
                return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
        }
        return t;
    }
}
export function newDeferredTypeMapper(sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, targets: RuntimeSlice<(() => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined>): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: DeferredTypeMapper;
    } | undefined = { value: new DeferredTypeMapper(TypeMapperBase.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), RuntimeSlice.nil<(() => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined>()) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$DeferredTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources = sources;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets = targets;
    const __gotots_store_5: DeferredTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "TypeMapper");
}
export class FunctionTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public fn: (($0: tsonicTypeScriptRuntime.Location<Type> | undefined) => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined) {
    }
    static $copy($source: FunctionTypeMapper): FunctionTypeMapper {
        return new FunctionTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.fn);
    }
    declare private readonly then?: never;
    static Map(m: {
        value: FunctionTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_callee_0: FunctionTypeMapper["fn"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fn;
        const __gotots_argument_1 = t;
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
    }
}
export function newFunctionTypeMapper(fn: (($0: tsonicTypeScriptRuntime.Location<Type> | undefined) => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: FunctionTypeMapper;
    } | undefined = { value: new FunctionTypeMapper(TypeMapperBase.$zero(), void 0) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new GoInterfaceAdapter(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fn = fn;
    const __gotots_store_0: FunctionTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "TypeMapper");
}
export class MergedTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined) {
    }
    static $copy($source: MergedTypeMapper): MergedTypeMapper {
        return new MergedTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.m1, $source.m2);
    }
    static $equal($left: MergedTypeMapper, $right: MergedTypeMapper): bool {
        return TypeMapperBase.$equal($left.TypeMapperBase, $right.TypeMapperBase) &&
            tsonicTypeScriptRuntime.sameLocation($left.m1, $right.m1) &&
            tsonicTypeScriptRuntime.sameLocation($left.m2, $right.m2);
    }
    static $hash($source: MergedTypeMapper): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeMapperBase.$hash($source.TypeMapperBase));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.m1));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.m2));
        return $hash;
    }
    declare private readonly then?: never;
    static Kind(m: {
        value: MergedTypeMapper;
    } | undefined): TypeMapperKind {
        return TypeMapperKindMerged$constant();
    }
    static Map(m: {
        value: MergedTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return TypeMapper.Map((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2, TypeMapper.Map((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1, t));
    }
}
export function newMergedTypeMapper(m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: MergedTypeMapper;
    } | undefined = { value: new MergedTypeMapper(TypeMapperBase.$zero(), void 0, void 0) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$MergedTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1 = m1;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2 = m2;
    const __gotots_store_2: MergedTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "TypeMapper");
}
export class CompositeTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public c: {
        value: Checker;
    } | undefined, public m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined) {
    }
    static $copy($source: CompositeTypeMapper): CompositeTypeMapper {
        return new CompositeTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.c, $source.m1, $source.m2);
    }
    static $equal($left: CompositeTypeMapper, $right: CompositeTypeMapper): bool {
        return TypeMapperBase.$equal($left.TypeMapperBase, $right.TypeMapperBase) &&
            $left.c
                ===
                    $right.c &&
            tsonicTypeScriptRuntime.sameLocation($left.m1, $right.m1) &&
            tsonicTypeScriptRuntime.sameLocation($left.m2, $right.m2);
    }
    static $hash($source: CompositeTypeMapper): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeMapperBase.$hash($source.TypeMapperBase));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.c));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.m1));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.m2));
        return $hash;
    }
    declare private readonly then?: never;
    static Map(m: {
        value: CompositeTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        let t1: tsonicTypeScriptRuntime.Location<Type> | undefined = TypeMapper.Map((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1, t);
        if (!tsonicTypeScriptRuntime.sameLocation(t1, t)) {
            return Checker.$go$private$checker$instantiateType((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, t1, (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2);
        }
        return TypeMapper.Map((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2, t);
    }
}
export function newCompositeTypeMapper(c: {
    value: Checker;
} | undefined, m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
    let m: {
        value: CompositeTypeMapper;
    } | undefined = { value: new CompositeTypeMapper(TypeMapperBase.$zero(), void 0, void 0, void 0) };
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase.TypeMapper.data = new $goInterfaceAdapter$PointerTo_Named_checker$CompositeTypeMapper(m);
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c = c;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1 = m1;
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2 = m2;
    const __gotots_store_4: CompositeTypeMapper["TypeMapperBase"] = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeMapperBase;
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "TypeMapper");
}
export class InferenceTypeMapper {
    declare private readonly $goType: void;
    public constructor(public TypeMapperBase: TypeMapperBase, public c: {
        value: Checker;
    } | undefined, public n: {
        value: InferenceContext;
    } | undefined, public fixing: bool) {
    }
    static $copy($source: InferenceTypeMapper): InferenceTypeMapper {
        return new InferenceTypeMapper(TypeMapperBase.$copy($source.TypeMapperBase), $source.c, $source.n, $source.fixing);
    }
    static $equal($left: InferenceTypeMapper, $right: InferenceTypeMapper): bool {
        return TypeMapperBase.$equal($left.TypeMapperBase, $right.TypeMapperBase) &&
            $left.c
                ===
                    $right.c &&
            $left.n
                ===
                    $right.n && $left.fixing === $right.fixing;
    }
    static $hash($source: InferenceTypeMapper): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeMapperBase.$hash($source.TypeMapperBase));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.c));
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.n));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.fixing));
        return $hash;
    }
    declare private readonly then?: never;
    static Map(m: {
        value: InferenceTypeMapper;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_range_1: InferenceContext["inferences"] = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferences;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_index_1;
            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_2;
            let inference: {
                value: InferenceInfo;
            } | undefined = __gotots_range_value_3;
            if (tsonicTypeScriptRuntime.sameLocation(t, (inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeParameter)) {
                if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fixing && !(inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isFixed) {
                    Checker.$go$private$checker$inferFromIntraExpressionSites((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.n);
                    clearCachedInferences(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferences);
                    (inference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isFixed = true;
                }
                return Checker.$go$private$checker$getInferredType((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.n, i);
            }
        }
        return t;
    }
}
