import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Phase as Phase__from_tracing, TracedType as TracedType__from_tracing, Tracer as Tracer__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ConditionalType, EvolvingArrayType, IndexType, IndexedAccessType, IntersectionType, IntrinsicType, ReverseMappedType, SubstitutionType, TypeData, TypeReference, UnionType } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import { Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Copy$MapOf_string_To_Interface_void$MapOf_string_To_Interface_void$string$Interface_void } from "../../../../../../support/generics/concretizations/maps/Copy.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$IntrinsicType, $goInterfaceAdapter$int, $goInterfaceAdapter$PointerTo_Named_checker$tracedTypeAdapter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../support/maps.js";
import { Checker } from "./checker.js";
import { RecursionId, getRecursionIdentity } from "./relater.js";
import { FormatTypeFlags, ObjectFlagsAnonymous$constant, ObjectFlagsEvolvingArray$constant, ObjectFlagsReference$constant, ObjectFlagsReverseMapped$constant, ObjectFlagsTuple$constant, Type, TypeAlias, TypeFlagsConditional$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsIntersection$constant, TypeFlagsIntrinsic$constant, TypeFlagsObject$constant, TypeFlagsSubstitution$constant, TypeFlagsUnion$constant } from "./types.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Tracer {
    declare private readonly $goType: void;
    public constructor(public tracing: {
        value: Tracing__from_tracing;
    } | undefined, public recorder: Tracer__from_tracing | undefined, public checkerIndex: int) {
    }
    static $copy($source: Tracer): Tracer {
        return new Tracer($source.tracing, $source.recorder, $source.checkerIndex);
    }
    static $equal($left: Tracer, $right: Tracer): bool {
        return $left.tracing
            ===
                $right.tracing
            && goInterfaceEqual($left.recorder, $right.recorder) && $left.checkerIndex === $right.checkerIndex;
    }
    static $hash($source: Tracer): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.tracing));
        $hash = GoMapHash.mix($hash, $source.recorder === undefined ? 0 : $source.recorder.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.checkerIndex));
        return $hash;
    }
    declare private readonly then?: never;
    static Instant(t: {
        value: Tracer;
    } | undefined, phase: Phase__from_tracing, name: gostring, args: GoMapValue<gostring, GoInterface | undefined>): void {
        Tracing__from_tracing.Instant((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracing, phase, name, Tracer.$go$private$checker$copyWithCheckerIndex(t, args));
    }
    static Push(t: {
        value: Tracer;
    } | undefined, phase: Phase__from_tracing, name: gostring, args: GoMapValue<gostring, GoInterface | undefined>, separateBeginAndEnd: bool): (() => void) | undefined {
        if (!separateBeginAndEnd) {
            return Tracing__from_tracing.Push((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracing, phase, name, Tracer.$go$private$checker$copyWithCheckerIndex(t, args), separateBeginAndEnd);
        }
        const __gotots_results_0 = Tracer.$go$private$checker$temporarilyAddCheckerIndex(t, args);
        args = __gotots_results_0[0];
        let restore: (() => void) | undefined = __gotots_results_0[1];
        let pop: (() => void) | undefined = Tracing__from_tracing.Push((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracing, phase, name, args, separateBeginAndEnd);
        const __gotots_callee_0 = restore;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        return (): void => {
            let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_0: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_0: {
                        const __gotots_results_1 = Tracer.$go$private$checker$temporarilyAddCheckerIndex(t, args);
                        let restoreEndArgs: (() => void) | undefined = __gotots_results_1[1];
                        const __gotots_callee_1: (() => void) | undefined = restoreEndArgs;
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                        __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        };
                        const __gotots_callee_2 = pop;
                        (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
            finally {
                if (__gotots_deferred_0 !== undefined) {
                    const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                    try {
                        __gotots_deferred_0(__gotots_recovery_0);
                        if (__gotots_recovery_0.recovered()) {
                            __gotots_panic_0 = undefined;
                        }
                    }
                    catch (__gotots_caught_0) {
                        if (!(__gotots_caught_0 instanceof GoPanic)) {
                            throw __gotots_caught_0;
                        }
                        __gotots_panic_0 = __gotots_caught_0;
                    }
                }
            }
            if (__gotots_panic_0 !== undefined) {
                throw __gotots_panic_0;
            }
        };
    }
    static RecordType(t: {
        value: Tracer;
    } | undefined, typ: tsonicTypeScriptRuntime.Location<Type> | undefined): void {
        const __gotots_receiver_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.recorder;
        const __gotots_argument_0 = wrapType(typ);
        goInterfaceNonNil<Tracer__from_tracing>(__gotots_receiver_0).RecordType(__gotots_argument_0);
    }
    static $go$private$checker$copyWithCheckerIndex(t: {
        value: Tracer;
    } | undefined, args: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> {
        let withCheckerIndex: GoMapValue<gostring, GoInterface | undefined> = GoMap.make(args.length() + 1, []);
        Copy$MapOf_string_To_Interface_void$MapOf_string_To_Interface_void$string$Interface_void(withCheckerIndex, args);
        withCheckerIndex.store("checkerId", new $goInterfaceAdapter$int((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerIndex));
        return withCheckerIndex;
    }
    static $go$private$checker$temporarilyAddCheckerIndex(t: {
        value: Tracer;
    } | undefined, args: GoMapValue<gostring, GoInterface | undefined>): [
        GoMapValue<gostring, GoInterface | undefined>,
        (() => void) | undefined
    ] {
        if (args.isNil()) {
            args = GoMap.make(0, []);
        }
        const __gotots_results_2 = args.lookupOk("checkerId");
        let previous: GoInterface | undefined = __gotots_results_2[0];
        let hadPrevious = __gotots_results_2[1];
        args.store("checkerId", new $goInterfaceAdapter$int((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerIndex));
        return [args, (): void => {
                if (hadPrevious) {
                    args.store("checkerId", previous);
                }
                else {
                    args.delete("checkerId");
                }
            }];
    }
}
export function NewTracer(tr: {
    value: Tracing__from_tracing;
} | undefined, checkerIndex: int): {
    value: Tracer;
} | undefined {
    return { value: new Tracer(tr, Tracing__from_tracing.NewTypeTracer(tr, checkerIndex), checkerIndex) };
}
export class tracedTypeAdapter {
    declare private readonly $goType: void;
    public constructor(public t: tsonicTypeScriptRuntime.Location<Type> | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker> | undefined) {
    }
    static $copy($source: tracedTypeAdapter): tracedTypeAdapter {
        return new tracedTypeAdapter($source.t, $source.checker);
    }
    static $equal($left: tracedTypeAdapter, $right: tracedTypeAdapter): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.t, $right.t)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.checker, $right.checker);
    }
    static $hash($source: tracedTypeAdapter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.t));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.checker));
        return $hash;
    }
    declare private readonly then?: never;
    static AliasSymbol(a: {
        value: tracedTypeAdapter;
    } | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) {
            return void 0;
        }
        return TypeAlias.Symbol((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias);
    }
    static AliasTypeArguments(a: {
        value: tracedTypeAdapter;
    } | undefined): RuntimeSlice<TracedType__from_tracing | undefined> {
        if ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) {
            return RuntimeSlice.nil<TracedType__from_tracing | undefined>();
        }
        return wrapTypes(TypeAlias.TypeArguments((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias));
    }
    static ConditionalCheckType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsConditionalType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ConditionalExtendsType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsConditionalType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ConditionalFalseType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsConditionalType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolvedFalseType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ConditionalTrueType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsConditionalType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolvedTrueType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static Display(a: {
        value: tracedTypeAdapter;
    } | undefined): gostring {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: gostring = "";
        try {
            try {
                __gotots_return_block_1: {
                    if ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker === undefined) {
                        __gotots_return_0 = "";
                        break __gotots_return_block_1;
                    }
                    if (!(((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsAnonymous$constant()) >>> 0 === 0) || !(((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (406862848)) >>> 0 === 0)) {
                        const __gotots_callee_3 = ($go$recovery: GoRecovery): void => {
                            $go$recovery === undefined ? undefined : $go$recovery.take();
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_3($go$recovery);
                        });
                        __gotots_return_0 = Checker.TypeToString((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t);
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = "";
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_1 = __gotots_caught_2;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_2 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_3) {
                    if (!(__gotots_caught_3 instanceof GoPanic)) {
                        throw __gotots_caught_3;
                    }
                    __gotots_panic_1 = __gotots_caught_3;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static EvolvingArrayElementType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsEvolvingArray$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsEvolvingArrayType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static EvolvingArrayFinalType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsEvolvingArray$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsEvolvingArrayType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.finalArrayType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static FormatFlags(a: {
        value: tracedTypeAdapter;
    } | undefined): RuntimeSlice<gostring> {
        return FormatTypeFlags((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags);
    }
    static Id(a: {
        value: tracedTypeAdapter;
    } | undefined): uint32 {
        return (((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id;
    }
    static IndexType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static IndexedAccessIndexType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexedAccessType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static IndexedAccessObjectType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexedAccessType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static IntersectionTypes(a: {
        value: tracedTypeAdapter;
    } | undefined): RuntimeSlice<TracedType__from_tracing | undefined> {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) {
            return RuntimeSlice.nil<TracedType__from_tracing | undefined>();
        }
        return wrapTypes((Type.AsIntersectionType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types);
    }
    static IntrinsicName(a: {
        value: tracedTypeAdapter;
    } | undefined): gostring {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntrinsic$constant()) >>> 0 === 0) {
            return "";
        }
        const __gotots_results_3 = (($value: TypeData | undefined): [
            {
                value: IntrinsicType;
            } | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$IntrinsicType.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
        let data: {
            value: IntrinsicType;
        } | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (!ok) {
            return "";
        }
        return (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.intrinsicName;
    }
    static IsConditional(a: {
        value: tracedTypeAdapter;
    } | undefined): bool {
        return !(((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0);
    }
    static IsTuple(a: {
        value: tracedTypeAdapter;
    } | undefined): bool {
        return !(((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsTuple$constant()) >>> 0 === 0);
    }
    static Pattern(a: {
        value: tracedTypeAdapter;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker === undefined) {
            return void 0;
        }
        return (((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.patternForType.lookup((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t);
    }
    static RecursionIdentity(a: {
        value: tracedTypeAdapter;
    } | undefined): GoInterface | undefined {
        return RecursionId.$storageOf(getRecursionIdentity((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t)).value;
    }
    static ReferenceNode(a: {
        value: tracedTypeAdapter;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) {
            return void 0;
        }
        return ((Type.AsTypeReference((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node;
    }
    static ReferenceTarget(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = ((Type.AsTypeReference((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ReferenceTypeArguments(a: {
        value: tracedTypeAdapter;
    } | undefined): RuntimeSlice<TracedType__from_tracing | undefined> {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) {
            return RuntimeSlice.nil<TracedType__from_tracing | undefined>();
        }
        return wrapTypes(((Type.AsTypeReference((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.resolvedTypeArguments);
    }
    static ReverseMappedConstraintType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReverseMapped$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsReverseMappedType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraintType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ReverseMappedMappedType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReverseMapped$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsReverseMappedType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mappedType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static ReverseMappedSourceType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || ((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReverseMapped$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsReverseMappedType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static SubstitutionBaseType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsSubstitutionType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static SubstitutionConstraintType(a: {
        value: tracedTypeAdapter;
    } | undefined): TracedType__from_tracing | undefined {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0) {
            return void 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsSubstitutionType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint;
        if (t === undefined) {
            return void 0;
        }
        return wrapType(t);
    }
    static Symbol(a: {
        value: tracedTypeAdapter;
    } | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return (((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
    }
    static UnionTypes(a: {
        value: tracedTypeAdapter;
    } | undefined): RuntimeSlice<TracedType__from_tracing | undefined> {
        if (((((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) {
            return RuntimeSlice.nil<TracedType__from_tracing | undefined>();
        }
        return wrapTypes((Type.AsUnionType((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types);
    }
}
export function wrapType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): TracedType__from_tracing | undefined {
    if (t === undefined) {
        return void 0;
    }
    return new GoInterfaceAdapter({ value: new tracedTypeAdapter(t, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker) });
}
export function wrapTypes(types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): RuntimeSlice<TracedType__from_tracing | undefined> {
    if (types.length === 0) {
        return RuntimeSlice.nil<TracedType__from_tracing | undefined>();
    }
    let result = RuntimeSlice.make<TracedType__from_tracing | undefined>(types.length, null, void 0);
    const __gotots_range_0 = types;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_1;
        result.set(i, wrapType(t));
    }
    return result;
}
