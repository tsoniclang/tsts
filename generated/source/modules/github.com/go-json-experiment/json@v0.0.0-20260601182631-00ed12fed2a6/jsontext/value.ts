import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Encoder } from "./encode.js";
import type { Kind } from "./token.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { Bools as Bools__from_jsonflags, Flags as Flags__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { CompareUTF16 as CompareUTF16__from_jsonwire, ConsumeWhitespace as ConsumeWhitespace__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { SortFunc$SliceOf_Named_jsontext$objectMember$Named_jsontext$objectMember } from "../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$objectMember, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { Decoder, decoderState } from "./decode.js";
import { getBufferedDecoder, getBufferedEncoder, putBufferedDecoder, putBufferedEncoder } from "./pools.js";
import { Kind_normalize, invalidKind$constant } from "./token.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
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
export class Value {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
    static UnmarshalJSON(v: tsonicTypeScriptRuntime.Location<Value> | undefined, b: RuntimeSlice<uint8>): GoInterface | undefined {
        if (v === undefined) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("jsontext.Value: UnmarshalJSON on nil pointer"));
        }
        void ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new Value(goSliceAppendSlice<uint8>(new Value((((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value>).value).$value.slice(0, 0, null)).$value, b, 0)));
        return void 0;
    }
    Clone(): Value {
        return new Value(bytes__from_gostdlib.Clone(this.$value));
    }
    Kind(): Kind {
        {
            let v__shadow_1: Value = new Value(this.$value.slice(ConsumeWhitespace__from_jsonwire(this.$value), null, null));
            if (v__shadow_1.$value.length > 0) {
                return Kind_normalize(v__shadow_1.$value.get(0));
            }
        }
        return invalidKind$constant();
    }
    MarshalJSON(): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        if (this.$value.isNil()) {
            const __gotots_conversion_0 = "null";
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            const __gotots_results_2 = __gotots_conversion_1;
            const __gotots_results_3 = void 0;
            return [__gotots_results_2, __gotots_results_3];
        }
        return [this.$value, void 0];
    }
    String(): gostring {
        if (this.$value.isNil()) {
            return "null";
        }
        const __gotots_conversion_3 = this.$value;
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        return __gotots_conversion_4;
    }
}
export const commaAndWhitespace$string: gostring = ", \n\r\t";
export type objectMember$Storage = {
    name: RuntimeSlice<uint8>;
    buffer: RuntimeSlice<uint8>;
};
export class objectMember implements GoContainerStoredValue<objectMember$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: objectMember$Storage) {
    }
    public static $storageOf($source: objectMember): objectMember$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: objectMember$Storage): objectMember {
        return new objectMember($source);
    }
    public get name(): RuntimeSlice<uint8> {
        return this.$storage.name;
    }
    public set name($value: RuntimeSlice<uint8>) {
        this.$storage.name = $value;
    }
    public get buffer(): RuntimeSlice<uint8> {
        return this.$storage.buffer;
    }
    public set buffer($value: RuntimeSlice<uint8>) {
        this.$storage.buffer = $value;
    }
    declare readonly [$goContainerStorageType]: objectMember$Storage;
    static $zero(): objectMember {
        return new objectMember({
            name: RuntimeSlice.nil<uint8>(),
            buffer: RuntimeSlice.nil<uint8>()
        });
    }
    static $copy($source: objectMember): objectMember {
        return new objectMember({
            name: $source.$storage.name,
            buffer: $source.$storage.buffer
        });
    }
    static $zeroStorage(): objectMember$Storage {
        return {
            name: RuntimeSlice.nil<uint8>(),
            buffer: RuntimeSlice.nil<uint8>()
        };
    }
    declare private readonly then?: never;
    Compare(y: objectMember): int {
        {
            let c = CompareUTF16__from_jsonwire(objectMember.$storageOf(this).name, objectMember.$storageOf(y).name);
            if (c !== 0) {
                return c;
            }
        }
        return CompareUTF16__from_jsonwire(bytes__from_gostdlib.TrimLeft(objectMember.$storageOf(this).buffer, commaAndWhitespace$string), bytes__from_gostdlib.TrimLeft(objectMember.$storageOf(y).buffer, commaAndWhitespace$string));
    }
}
export function getObjectMembers(): tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>> | undefined {
    let ns: tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>> | undefined => {
        if (!$goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$objectMember.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.objectMemberPool));
    void ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value).slice(0, 0, null));
    return ns;
}
export function putObjectMembers(ns: tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>> | undefined): void {
    if (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value.capacity < 1024) {
        const __gotots_slice_build_4 = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value;
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.length; __gotots_slice_build_5++) {
            __gotots_slice_build_4.set(__gotots_slice_build_5, objectMember.$zeroStorage());
        }
        void 0;
        sync__from_gostdlib.Pool.Put($state.objectMemberPool, new $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$objectMember(ns));
    }
}
export function mustReorderObjects(b: RuntimeSlice<uint8>): void {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                let e2: tsonicTypeScriptRuntime.Location<Encoder> | undefined = getBufferedEncoder(RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                const __gotots_argument_0 = e2;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    putBufferedEncoder(__gotots_argument_0);
                };
                let d: tsonicTypeScriptRuntime.Location<Decoder> | undefined = getBufferedDecoder(b, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                const __gotots_argument_1 = d;
                __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                    putBufferedDecoder(__gotots_argument_1);
                };
                const __gotots_store_0 = Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.Struct);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_0, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(7n));
                const __gotots_argument_2 = d;
                const __gotots_store_1 = ((e2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer;
                const __gotots_argument_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Buf");
                mustReorderObjectsFromDecoder(__gotots_argument_2, __gotots_argument_3);
            }
        }
        catch (__gotots_caught_2) {
            if (!(__gotots_caught_2 instanceof GoPanic)) {
                throw __gotots_caught_2;
            }
            __gotots_panic_0 = __gotots_caught_2;
        }
    }
    finally {
        if (__gotots_deferred_1 !== undefined) {
            const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_1(__gotots_recovery_1);
                if (__gotots_recovery_1.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
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
}
export function mustReorderObjectsFromDecoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined, scratch: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): void {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                {
                    const __gotots_results_0 = Decoder.ReadToken(d);
                    let tok = __gotots_results_0[0];
                    let err: GoInterface | undefined = __gotots_results_0[1];
                    switch (tok.Kind()) {
                        case 123: {
                            let members: tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>> | undefined = getObjectMembers();
                            const __gotots_argument_2 = members;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                putObjectMembers(__gotots_argument_2);
                            });
                            let prevMember = objectMember.$zero();
                            let isSorted = true;
                            let beforeBody = Decoder.InputOffset(d);
                            for (; !(Decoder.PeekKind(d) === 125);) {
                                let beforeName = Decoder.InputOffset(d);
                                let flags = new ValueFlags__from_jsonwire(0);
                                const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
                                const __gotots_store_2 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
                                const __gotots_results_1 = decoderState.ReadValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "s"), flags$location);
                                let name: Value = __gotots_results_1[0];
                                name = new Value(UnquoteMayCopy__from_jsonwire(name.$value, flags.IsVerbatim()));
                                mustReorderObjectsFromDecoder(d, scratch);
                                let afterValue = Decoder.InputOffset(d);
                                let currMember = objectMember.$fromStorage({
                                    name: name.$value,
                                    buffer: ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf.slice(beforeName, afterValue, null)
                                });
                                if (isSorted && ((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value.length > 0) {
                                    const __gotots_callee_0 = ($argument0: objectMember, $argument1: objectMember): int => {
                                        return objectMember.$copy($argument0).Compare($argument1);
                                    };
                                    const __gotots_argument_3 = objectMember.$copy(prevMember);
                                    const __gotots_argument_4 = objectMember.$copy(currMember);
                                    const __gotots_binary_operand_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4);
                                    const __gotots_binary_operand_1 = 0;
                                    isSorted = __gotots_binary_operand_0 < __gotots_binary_operand_1;
                                }
                                const __gotots_store_3 = (members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_slice_build_0 = ((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value;
                                const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                                let __gotots_slice_build_1 = __gotots_slice_build_0;
                                if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                                    __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, objectMember.$storageOf(objectMember.$copy(currMember)));
                                }
                                else {
                                    __gotots_slice_build_1 = goSliceAllocate<objectMember$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                                        __gotots_slice_build_1.set(__gotots_slice_build_3, objectMember.$storageOf(objectMember.$copy(objectMember.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                                    }
                                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, objectMember.$storageOf(objectMember.$copy(currMember)));
                                    for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                                        __gotots_slice_build_1.$initialize(__gotots_slice_build_3, objectMember.$zeroStorage());
                                    }
                                }
                                void (__gotots_store_3.value =
                                    __gotots_slice_build_1);
                                prevMember = objectMember.$copy(currMember);
                            }
                            let afterBody = Decoder.InputOffset(d);
                            Decoder.ReadToken(d);
                            if (isSorted) {
                                break __gotots_return_block_0;
                            }
                            let firstBufferBeforeSorting = (void objectMember.$storageOf, (void objectMember.$fromStorage,
                                (((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value).get(0))).buffer;
                            SortFunc$SliceOf_Named_jsontext$objectMember$Named_jsontext$objectMember(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value, ($argument0: objectMember, $argument1: objectMember): int => {
                                return objectMember.$copy($argument0).Compare($argument1);
                            });
                            let firstBufferAfterSorting = (void objectMember.$storageOf, (void objectMember.$fromStorage,
                                (((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value).get(0))).buffer;
                            let commaAndWhitespacePrefix: (($0: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined = (b: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
                                return b.slice(0, b.length - bytes__from_gostdlib.TrimLeft(b, commaAndWhitespace$string).length, null);
                            };
                            let sorted = (((scratch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value).slice(0, 0, null);
                            const __gotots_range_0 = ((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<objectMember$Storage>>).value;
                            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                                const __gotots_range_value_0 = __gotots_range_index_0;
                                const __gotots_range_value_1 = objectMember.$copy(objectMember.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                                let i = __gotots_range_value_0;
                                let member = __gotots_range_value_1;
                                __gotots_control_target_0: {
                                    if (i === 0 && !tsonicTypeScriptRuntime.sameLocation(goSliceAddress<uint8>(objectMember.$storageOf(member).buffer, 0), goSliceAddress<uint8>(firstBufferBeforeSorting, 0))) {
                                        const __gotots_argument_6 = sorted;
                                        const __gotots_callee_1 = commaAndWhitespacePrefix;
                                        const __gotots_argument_5 = firstBufferBeforeSorting;
                                        const __gotots_argument_7 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
                                        sorted = goSliceAppendSlice<uint8>(__gotots_argument_6, __gotots_argument_7, 0);
                                        sorted = goSliceAppendSlice<uint8>(sorted, bytes__from_gostdlib.TrimLeft(objectMember.$storageOf(member).buffer, commaAndWhitespace$string), 0);
                                    }
                                    else if (i !== 0 &&
                                        tsonicTypeScriptRuntime.sameLocation(goSliceAddress<uint8>(objectMember.$storageOf(member).buffer, 0), goSliceAddress<uint8>(firstBufferBeforeSorting, 0))) {
                                        const __gotots_argument_9 = sorted;
                                        const __gotots_callee_2 = commaAndWhitespacePrefix;
                                        const __gotots_argument_8 = firstBufferAfterSorting;
                                        const __gotots_argument_10 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                                        sorted = goSliceAppendSlice<uint8>(__gotots_argument_9, __gotots_argument_10, 0);
                                        sorted = goSliceAppendSlice<uint8>(sorted, bytes__from_gostdlib.TrimLeft(objectMember.$storageOf(member).buffer, commaAndWhitespace$string), 0);
                                    }
                                    else {
                                        sorted = goSliceAppendSlice<uint8>(sorted, objectMember.$storageOf(member).buffer, 0);
                                    }
                                }
                            }
                            if (globalThis.Number(BigInt.asIntN(64, goInt64(afterBody - beforeBody))) !== sorted.length) {
                                const __gotots_argument_11 = new GoInterfaceAdapter("BUG: length invariant violated");
                                GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
                            }
                            RuntimeSlice.copy<uint8>(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf.slice(beforeBody, afterBody, null), sorted);
                            if (sorted.length > ((scratch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length) {
                                void ((scratch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    sorted);
                            }
                            break;
                        }
                        case 91: {
                            for (; !(Decoder.PeekKind(d) === 93);) {
                                mustReorderObjectsFromDecoder(d, scratch);
                            }
                            Decoder.ReadToken(d);
                            break;
                        }
                        default: {
                            if (!(err === undefined)) {
                                const __gotots_binary_operand_2 = "BUG: ";
                                const __gotots_receiver_2 = err;
                                const __gotots_binary_operand_3 = goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Error();
                                const __gotots_argument_12 = new GoInterfaceAdapter(__gotots_binary_operand_2 + __gotots_binary_operand_3);
                                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                            }
                            break;
                        }
                    }
                }
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
}
