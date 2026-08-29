import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { arshaler, stringSlice } from "./arshal.js";
import type { typedArshalers } from "./arshal_funcs.js";
import type { bool, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { Bools as Bools__from_jsonflags, Deterministic$constant as Deterministic$constant__from_jsonflags, Flags as Flags__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { AppendQuote as AppendQuote__from_jsonwire, HasSuffixByte as HasSuffixByte__from_jsonwire, TrimSuffixByte as TrimSuffixByte__from_jsonwire, TrimSuffixWhitespace as TrimSuffixWhitespace__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { typedArshalers$lookup$Named_jsontext$Decoder, typedArshalers$lookup$Named_jsontext$Encoder } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/typedArshalers$lookup.js";
import { Sort$Named_json$stringSlice$string } from "../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder, $goInterfaceAdapter$PointerTo_Named_jsontext$Value, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_jsontext$Value as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goReflectType$string } from "../../../../../support/reflection-types.js";
import "../../../../../support/reflection-types.js";
import { decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { addressableValue, getStrings, newAddressableValue, putStrings } from "./arshal.js";
import { newDuplicateNameError, newMarshalErrorBefore, newUnmarshalErrorAfterWithSkipping } from "./errors.js";
import { structField } from "./fields.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function marshalInlinedFallbackAll(enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined, f: tsonicTypeScriptRuntime.Location<structField> | undefined, insertUnquotedName: (($0: RuntimeSlice<uint8>) => bool) | undefined): GoInterface | undefined {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: GoInterface | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let v = addressableValue.$fromStorage({
                    Value: addressableValue.$storageOf(va).Value.Field(BigInt.asIntN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index0))),
                    forcedAddr: addressableValue.$storageOf(va).forcedAddr
                });
                if (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.length > 0) {
                    v = v.$go$private$json$fieldByIndex(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index, false);
                    if (!addressableValue.$storageOf(v).Value.IsValid()) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                }
                v = v.$go$private$json$indirect(false);
                if (!addressableValue.$storageOf(v).Value.IsValid()) {
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
                if (goInterfaceEqual(addressableValue.$storageOf(v).Value.Type(), $state.jsontextValueType)) {
                    const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
                        Value__from_jsontext,
                        boolean
                    ] => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return [new Value__from_jsontext(RuntimeSlice.nil<uint8>()), false];
                        }
                        return [$value.$go$value, true];
                    })(addressableValue.$storageOf(v).Value.$unbox());
                    let b: Value__from_jsontext = __gotots_results_0[0];
                    if (b.$value.length === 0) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    let dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).GetBufferedDecoder(b.$value, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    const __gotots_receiver_0 = __go_export__from_jsontext.$copy(__go_export__from_jsontext.$fromStorage($state.__go_export));
                    const __gotots_argument_0 = dec;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_receiver_0.PutBufferedDecoder(__gotots_argument_0);
                    });
                    let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                    const __gotots_store_0 = Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(7n));
                    const __gotots_results_1 = Decoder__from_jsontext.ReadToken(dec);
                    let tok = __gotots_results_1[0];
                    let err: GoInterface | undefined = __gotots_results_1[1];
                    if (!(err === undefined)) {
                        if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF))) {
                            err = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
                        }
                        __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), err);
                        break __gotots_return_block_0;
                    }
                    if (!(tok.Kind() === 123)) {
                        __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), $state.errRawInlinedNotObject);
                        break __gotots_return_block_0;
                    }
                    for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
                        let flags = new ValueFlags__from_jsonwire(0);
                        const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
                        const __gotots_results_2 = decoderState__from_jsontext.ReadValue(xd, flags$location);
                        let val: Value__from_jsontext = __gotots_results_2[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_2[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), err__shadow_1);
                            break __gotots_return_block_0;
                        }
                        if (!(insertUnquotedName === undefined)) {
                            let name = UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim());
                            const __gotots_callee_0 = insertUnquotedName;
                            const __gotots_argument_1 = name;
                            if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1)) {
                                __gotots_return_0 = newDuplicateNameError(Encoder__from_jsontext.StackPointer(enc).Parent(), val.$value, Encoder__from_jsontext.OutputOffset(enc));
                                break __gotots_return_block_0;
                            }
                        }
                        {
                            let err__shadow_2: GoInterface | undefined = Encoder__from_jsontext.WriteValue(enc, val);
                            if (!(err__shadow_2 === undefined)) {
                                __gotots_return_0 = err__shadow_2;
                                break __gotots_return_block_0;
                            }
                        }
                        const __gotots_results_3 = decoderState__from_jsontext.ReadValue(xd, flags$location);
                        val = __gotots_results_3[0];
                        err__shadow_1 = __gotots_results_3[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), err__shadow_1);
                            break __gotots_return_block_0;
                        }
                        {
                            let err__shadow_2: GoInterface | undefined = Encoder__from_jsontext.WriteValue(enc, val);
                            if (!(err__shadow_2 === undefined)) {
                                __gotots_return_0 = err__shadow_2;
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    {
                        const __gotots_results_4 = Decoder__from_jsontext.ReadToken(dec);
                        let err__shadow_1: GoInterface | undefined = __gotots_results_4[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), err__shadow_1);
                            break __gotots_return_block_0;
                        }
                    }
                    {
                        let err__shadow_1: GoInterface | undefined = decoderState__from_jsontext.CheckEOF(xd);
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, addressableValue.$storageOf(v).Value.Type(), err__shadow_1);
                            break __gotots_return_block_0;
                        }
                    }
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
                else {
                    let m = addressableValue.$copy(v);
                    let n = globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(m).Value.Len()));
                    if (n === 0) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_1 = addressableValue.$storageOf(m).Value.Type();
                    const __gotots_argument_2 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_1).Key();
                    let mk = newAddressableValue(__gotots_argument_2);
                    const __gotots_receiver_2 = addressableValue.$storageOf(m).Value.Type();
                    const __gotots_argument_3 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_2).Elem();
                    let mv = newAddressableValue(__gotots_argument_3);
                    let marshalKey: (($0: addressableValue) => GoInterface | undefined) | undefined = (mk__shadow_1: addressableValue): GoInterface | undefined => {
                        const __gotots_argument_4 = Encoder__from_jsontext.AvailableBuffer(enc);
                        const __gotots_conversion_0 = addressableValue.$storageOf(mk__shadow_1).Value.String();
                        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
                        }
                        const __gotots_argument_5 = __gotots_conversion_1;
                        const __gotots_store_1 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                        const __gotots_argument_6 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
                        const __gotots_results_5 = AppendQuote__from_jsonwire(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
                        let b = __gotots_results_5[0];
                        let err: GoInterface | undefined = __gotots_results_5[1];
                        if (!(err === undefined)) {
                            const __gotots_argument_7 = enc;
                            const __gotots_receiver_3 = addressableValue.$storageOf(m).Value.Type();
                            const __gotots_argument_8 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_3).Key();
                            const __gotots_argument_9 = err;
                            return newMarshalErrorBefore(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
                        }
                        if (!(insertUnquotedName === undefined)) {
                            let isVerbatim = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexByte(b, 92))) < 0;
                            let name = UnquoteMayCopy__from_jsonwire(b, isVerbatim);
                            const __gotots_callee_1 = insertUnquotedName;
                            const __gotots_argument_10 = name;
                            if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10)) {
                                return newDuplicateNameError(Encoder__from_jsontext.StackPointer(enc).Parent(), b, Encoder__from_jsontext.OutputOffset(enc));
                            }
                        }
                        return Encoder__from_jsontext.WriteValue(enc, new Value__from_jsontext(b));
                    };
                    let marshalVal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
                    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
                        const __gotots_results_6 = typedArshalers$lookup$Named_jsontext$Encoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers), marshalVal, addressableValue.$storageOf(mv).Value.Type());
                        marshalVal = __gotots_results_6[0];
                    }
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(Deterministic$constant__from_jsonflags()) || n <= 1) {
                        {
                            const __gotots_conversion_3 = addressableValue.$storageOf(m).Value.MapRange();
                            let iter: tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter> | undefined = __gotots_conversion_3 === undefined ? undefined :
                                tsonicTypeScriptRuntime.boundLocation<reflect__from_gostdlib.MapIter>(__gotots_conversion_3, (): reflect__from_gostdlib.MapIter => {
                                    return __gotots_conversion_3;
                                }, ($go$providerPointerValue: reflect__from_gostdlib.MapIter): void => {
                                    named_reflect.ReflectMapIterOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
                                });
                            for (;;) {
                                const __gotots_receiver_4 = iter;
                                if (!reflect__from_gostdlib.MapIter.Next(__gotots_receiver_4 === void 0 ? void 0 :
                                    (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value)) {
                                    break;
                                }
                                {
                                    const __gotots_conversion_4 = iter;
                                    addressableValue.$storageOf(mk).Value.SetIterKey(__gotots_conversion_4 === undefined ? undefined :
                                        (__gotots_conversion_4 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                    {
                                        const __gotots_callee_2 = marshalKey;
                                        const __gotots_argument_11 = addressableValue.$copy(mk);
                                        let err: GoInterface | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
                                        if (!(err === undefined)) {
                                            __gotots_return_0 = err;
                                            break __gotots_return_block_0;
                                        }
                                    }
                                    const __gotots_receiver_6 = addressableValue.$storageOf(mv).Value;
                                    const __gotots_receiver_5 = iter;
                                    const __gotots_argument_12 = reflect__from_gostdlib.MapIter.Value(__gotots_receiver_5 === void 0 ? void 0 :
                                        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                    __gotots_receiver_6.Set(__gotots_argument_12);
                                    {
                                        const __gotots_callee_3 = marshalVal;
                                        const __gotots_argument_13 = enc;
                                        const __gotots_argument_14 = addressableValue.$copy(mv);
                                        const __gotots_argument_15 = mo;
                                        let err: GoInterface | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                                        if (!(err === undefined)) {
                                            __gotots_return_0 = err;
                                            break __gotots_return_block_0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        let names: {
                            value: stringSlice;
                        } | undefined = getStrings(n);
                        {
                            const __gotots_assign_0 = 0;
                            const __gotots_conversion_5 = addressableValue.$storageOf(m).Value.MapRange();
                            const __gotots_assign_1 = __gotots_conversion_5 === undefined ? undefined :
                                tsonicTypeScriptRuntime.boundLocation<reflect__from_gostdlib.MapIter>(__gotots_conversion_5, (): reflect__from_gostdlib.MapIter => {
                                    return __gotots_conversion_5;
                                }, ($go$providerPointerValue: reflect__from_gostdlib.MapIter): void => {
                                    named_reflect.ReflectMapIterOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
                                });
                            let i = __gotots_assign_0;
                            let iter: tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter> | undefined = __gotots_assign_1;
                            let __gotots_for_first_0 = true;
                            for (;;) {
                                if (__gotots_for_first_0) {
                                    __gotots_for_first_0 = false;
                                }
                                else {
                                    i++;
                                }
                                let __gotots_logical_result_0 = i < n;
                                if (__gotots_logical_result_0) {
                                    const __gotots_receiver_7 = iter;
                                    __gotots_logical_result_0 = reflect__from_gostdlib.MapIter.Next(__gotots_receiver_7 === void 0 ? void 0 :
                                        (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                }
                                if (!__gotots_logical_result_0) {
                                    break;
                                }
                                {
                                    const __gotots_conversion_6 = iter;
                                    addressableValue.$storageOf(mk).Value.SetIterKey(__gotots_conversion_6 === undefined ? undefined :
                                        (__gotots_conversion_6 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                    ((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).$value.set(i, addressableValue.$storageOf(mk).Value.String());
                                }
                            }
                        }
                        Sort$Named_json$stringSlice$string((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                        const __gotots_range_0: stringSlice["$value"] = (names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value;
                        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                            let name = __gotots_range_value_0;
                            addressableValue.$storageOf(mk).Value.SetString(name);
                            {
                                const __gotots_callee_4 = marshalKey;
                                const __gotots_argument_16 = addressableValue.$copy(mk);
                                let err: GoInterface | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
                                if (!(err === undefined)) {
                                    __gotots_return_0 = err;
                                    break __gotots_return_block_0;
                                }
                            }
                            addressableValue.$storageOf(mv).Value.Set(addressableValue.$storageOf(m).Value.MapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(mk).Value)));
                            {
                                const __gotots_callee_5 = marshalVal;
                                const __gotots_argument_17 = enc;
                                const __gotots_argument_18 = addressableValue.$copy(mv);
                                const __gotots_argument_19 = mo;
                                let err: GoInterface | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                                if (!(err === undefined)) {
                                    __gotots_return_0 = err;
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                        putStrings(names);
                    }
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
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
    return __gotots_return_0;
}
export function unmarshalInlinedFallbackNext(dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined, f: tsonicTypeScriptRuntime.Location<structField> | undefined, quotedName: RuntimeSlice<uint8>, unquotedName: RuntimeSlice<uint8>): GoInterface | undefined {
    let v = addressableValue.$fromStorage({
        Value: addressableValue.$storageOf(va).Value.Field(BigInt.asIntN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index0))),
        forcedAddr: addressableValue.$storageOf(va).forcedAddr
    });
    if (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.length > 0) {
        v = v.$go$private$json$fieldByIndex(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index, true);
    }
    v = v.$go$private$json$indirect(true);
    if (goInterfaceEqual(addressableValue.$storageOf(v).Value.Type(), $state.jsontextValueType)) {
        const __gotots_results_7 = (($value: $goInterface$Interface_void | undefined): [
            tsonicTypeScriptRuntime.Location<Value__from_jsontext> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Value.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(addressableValue.$storageOf(v).Value.Addr().$unbox());
        let b: tsonicTypeScriptRuntime.Location<Value__from_jsontext> | undefined = __gotots_results_7[0];
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value.length === 0) {
            void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                new Value__from_jsontext(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value.append(0, [123])));
        }
        else {
            void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                new Value__from_jsontext(TrimSuffixWhitespace__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value)));
            if (HasSuffixByte__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, 125)) {
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new Value__from_jsontext(TrimSuffixByte__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, 125)));
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new Value__from_jsontext(TrimSuffixWhitespace__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value)));
                if (!HasSuffixByte__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, 44) && !HasSuffixByte__from_jsonwire(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, 123)) {
                    void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                        new Value__from_jsontext(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value.append(0, [44])));
                }
            }
            else {
                return newUnmarshalErrorAfterWithSkipping(dec, addressableValue.$storageOf(v).Value.Type(), $state.errRawInlinedNotObject);
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new Value__from_jsontext(goSliceAppendSlice<uint8>(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, quotedName, 0)));
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new Value__from_jsontext(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value.append(0, [58])));
        const __gotots_results_8 = Decoder__from_jsontext.ReadValue(dec);
        let val: Value__from_jsontext = __gotots_results_8[0];
        let err: GoInterface | undefined = __gotots_results_8[1];
        if (!(err === undefined)) {
            return err;
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new Value__from_jsontext(goSliceAppendSlice<uint8>(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value, val.$value, 0)));
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new Value__from_jsontext(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Value__from_jsontext>).value.$value.append(0, [125])));
        return void 0;
    }
    else {
        const __gotots_conversion_7 = unquotedName;
        let __gotots_conversion_8 = "";
        for (let __gotots_conversion_9 = 0; __gotots_conversion_9 < __gotots_conversion_7.length; __gotots_conversion_9++) {
            __gotots_conversion_8 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_7.get(__gotots_conversion_9)));
        }
        let name = __gotots_conversion_8;
        let m = addressableValue.$copy(v);
        if (addressableValue.$storageOf(m).Value.IsNil()) {
            addressableValue.$storageOf(m).Value.Set(reflect__from_gostdlib.MakeMap(addressableValue.$storageOf(m).Value.Type()));
        }
        let mk = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$string(name));
        {
            const __gotots_receiver_7 = addressableValue.$storageOf(m).Value.Type();
            let mkt: reflect__from_gostdlib.Type | undefined = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_7).Key();
            if (!goInterfaceEqual(mkt, $state.stringType)) {
                mk = mk.Convert(mkt);
            }
        }
        const __gotots_receiver_8 = addressableValue.$storageOf(m).Value.Type();
        const __gotots_argument_19 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_8).Elem();
        let mv = newAddressableValue(__gotots_argument_19);
        {
            let v2 = addressableValue.$storageOf(m).Value.MapIndex(named_reflect.ReflectValueOperations.$copy(mk));
            if (v2.IsValid()) {
                addressableValue.$storageOf(mv).Value.Set(named_reflect.ReflectValueOperations.$copy(v2));
            }
        }
        let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
            const __gotots_results_9 = typedArshalers$lookup$Named_jsontext$Decoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers), unmarshal, addressableValue.$storageOf(mv).Value.Type());
            unmarshal = __gotots_results_9[0];
        }
        const __gotots_callee_6 = unmarshal;
        const __gotots_argument_20 = dec;
        const __gotots_argument_21 = addressableValue.$copy(mv);
        const __gotots_argument_22 = uo;
        let err: GoInterface | undefined = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21, __gotots_argument_22);
        addressableValue.$storageOf(m).Value.SetMapIndex(named_reflect.ReflectValueOperations.$copy(mk), named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(mv).Value));
        if (!(err === undefined)) {
            return err;
        }
        return void 0;
    }
}
