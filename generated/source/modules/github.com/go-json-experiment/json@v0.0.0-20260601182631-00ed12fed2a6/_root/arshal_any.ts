import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../support/provider-interface-bridges.js";
import type { arshaler, stringSlice } from "./arshal.js";
import type { typedArshalers } from "./arshal_funcs.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { AllowInvalidUTF8$constant as AllowInvalidUTF8$constant__from_jsonflags, AnyWhitespace$constant as AnyWhitespace$constant__from_jsonflags, Deterministic$constant as Deterministic$constant__from_jsonflags, Flags as Flags__from_jsonflags, FormatNilMapAsNull$constant as FormatNilMapAsNull$constant__from_jsonflags, FormatNilSliceAsNull$constant as FormatNilSliceAsNull$constant__from_jsonflags, UnmarshalAnyWithRawNumber$constant as UnmarshalAnyWithRawNumber$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state as $state__internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { $state as $state__jsontext, Bool as Bool__from_jsontext, Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Float as Float__from_jsontext, Kind_String as Kind_String__from_jsontext, String as String__from_jsontext, Token as Token__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { Or$Named_error } from "../../../../../support/generics/concretizations/cmp/Or.js";
import { len64$SliceOf_byte } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/len64.js";
import { typedArshalers$lookup$Named_jsontext$Encoder } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/typedArshalers$lookup.js";
import { Sort$Named_json$stringSlice$string } from "../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$MapOf_string_To_Interface_void, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$float64, $goInterfaceAdapter$string, $goInterfaceAdapter$bool as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract as GoInterface$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_error$Using$Error$Direct as GoProviderProfileBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goReflectType$Interface_void, $goReflectType$MapOf_string_To_Interface_void, $goReflectType$SliceOf_Interface_void } from "../../../../../support/reflection-types.js";
import "../../../../../support/reflection-types.js";
import { decodeBuffer as decodeBuffer__from_jsontext, decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { stateEntry as stateEntry__from_jsontext } from "../jsontext/state.js";
import { addressableValue, getStrings, lookupArshaler, newAddressableValue, putStrings } from "./arshal.js";
import { leavePointer, startDetectingCyclesAfter$int, visitPointer } from "./arshal_default.js";
import { isFatalError, newDuplicateNameError, newMarshalErrorBefore, newUnmarshalErrorAfterWithValue } from "./errors.js";
import { makeString } from "./intern.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function marshalValueAny(enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, val: GoInterface | undefined, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    const __gotots_type_switch_0: GoInterface | undefined = val;
    switch (true) {
        case __gotots_type_switch_0 === void 0: {
            let val__shadow_1: GoInterface | undefined = __gotots_type_switch_0;
            return Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
            break;
        }
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let val__shadow_1: bool = __gotots_type_switch_0.$go$value;
            return Encoder__from_jsontext.WriteToken(enc, Bool__from_jsontext(val__shadow_1));
            break;
        }
        case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
            let val__shadow_1: gostring = __gotots_type_switch_0.$go$value;
            return Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(val__shadow_1));
            break;
        }
        case $goInterfaceAdapter$float64.$is(__gotots_type_switch_0): {
            let val__shadow_1: float64 = __gotots_type_switch_0.$go$value;
            if (math__from_gostdlib.IsNaN(val__shadow_1) || math__from_gostdlib.IsInf(val__shadow_1, BigInt.asIntN(64, goNumberToBigInt(0)))) {
                break;
            }
            return Encoder__from_jsontext.WriteToken(enc, Float__from_jsontext(val__shadow_1));
            break;
        }
        case $goInterfaceAdapter$MapOf_string_To_Interface_void.$is(__gotots_type_switch_0): {
            let val__shadow_1: GoMapValue<gostring, GoInterface | undefined> = __gotots_type_switch_0.$go$value;
            return marshalObjectAny(enc, val__shadow_1, mo);
            break;
        }
        case $goInterfaceAdapter$SliceOf_Interface_void.$is(__gotots_type_switch_0): {
            let val__shadow_1: RuntimeSlice<GoInterface | undefined> = __gotots_type_switch_0.$go$value;
            return marshalArrayAny(enc, val__shadow_1, mo);
            break;
        }
    }
    let v = newAddressableValue(named_reflect.ReflectTypeMetadataOperations.$typeOf(val));
    addressableValue.$storageOf(v).Value.Set(reflect__from_gostdlib.ValueOf(val));
    let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = (lookupArshaler(addressableValue.$storageOf(v).Value.Type()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
        const __gotots_results_0 = typedArshalers$lookup$Named_jsontext$Encoder((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers), marshal, addressableValue.$storageOf(v).Value.Type());
        marshal = __gotots_results_0[0];
    }
    const __gotots_callee_0 = marshal;
    const __gotots_argument_0 = enc;
    const __gotots_argument_1 = addressableValue.$copy(v);
    const __gotots_argument_2 = mo;
    return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
}
export function unmarshalValueAny(dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    {
        let k = Decoder__from_jsontext.PeekKind(dec);
        switch (k) {
            case 123: {
                const __gotots_results_1 = unmarshalObjectAny(dec, uo);
                return [new $goInterfaceAdapter$MapOf_string_To_Interface_void(__gotots_results_1[0]), __gotots_results_1[1]];
                break;
            }
            case 91: {
                const __gotots_results_2 = unmarshalArrayAny(dec, uo);
                return [new $goInterfaceAdapter$SliceOf_Interface_void(__gotots_results_2[0]), __gotots_results_2[1]];
                break;
            }
            default: {
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                let flags = new ValueFlags__from_jsonwire(0);
                const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
                const __gotots_results_3 = decoderState__from_jsontext.ReadValue(xd, flags$location);
                let val: Value__from_jsontext = __gotots_results_3[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
                if (!(err === undefined)) {
                    return [void 0, err];
                }
                switch (val.Kind()) {
                    case 110: {
                        return [void 0, void 0];
                        break;
                    }
                    case 102: {
                        return [new GoInterfaceAdapter(false), void 0];
                        break;
                    }
                    case 116: {
                        return [new GoInterfaceAdapter(true), void 0];
                        break;
                    }
                    case 34: {
                        val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                        if (((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache === undefined) {
                            ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache =
                                tsonicTypeScriptRuntime.location<GoArray<gostring, 256>>(GoArray.zero<gostring, 256>(256, ""));
                        }
                        return [new $goInterfaceAdapter$string(makeString(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache, val.$value)), void 0];
                        break;
                    }
                    case 48: {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(UnmarshalAnyWithRawNumber$constant__from_jsonflags())) {
                            const __gotots_callee_1 = $state__internal.RawNumberOf;
                            const __gotots_argument_3 = val.$value;
                            const __gotots_results_4 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                            const __gotots_results_5 = void 0;
                            return [__gotots_results_4, __gotots_results_5];
                        }
                        const __gotots_conversion_0 = val.$value;
                        let __gotots_conversion_1 = "";
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                        }
                        const __gotots_argument_4 = __gotots_conversion_1;
                        const __gotots_argument_5 = 64;
                        const __gotots_results_6 = strconv__from_gostdlib.ParseFloat(__gotots_argument_4, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_5)));
                        const __gotots_results_7 = [__gotots_results_6[0], GoProviderInterfaceBridge.$from(__gotots_results_6[1])] satisfies [
                            float64,
                            $goInterface$Interface_Method_Error_void_to_string | undefined
                        ];
                        let fv = __gotots_results_7[0];
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_7[1];
                        if (!(err__shadow_1 === undefined)) {
                            const __gotots_results_8 = new $goInterfaceAdapter$float64(fv);
                            const __gotots_argument_7 = dec;
                            const __gotots_argument_8 = $state.float64Type;
                            const __gotots_argument_6 = err__shadow_1;
                            const __gotots_argument_9 = GoProviderProfileBridge.$from(provider_error.ErrorsUnwrapDirect(GoProviderProfileBridge.$to(__gotots_argument_6), GoInterface$is));
                            const __gotots_results_9 = newUnmarshalErrorAfterWithValue(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
                            return [__gotots_results_8, __gotots_results_9];
                        }
                        return [new $goInterfaceAdapter$float64(fv), void 0];
                        break;
                    }
                    default: {
                        const __gotots_argument_10 = new $goInterfaceAdapter$string("BUG: invalid kind: " + Kind_String__from_jsontext(k));
                        GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
                        break;
                    }
                }
                break;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function marshalObjectAny(enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, obj: GoMapValue<gostring, GoInterface | undefined>, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Depth() > startDetectingCyclesAfter$int) {
                    let v = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$MapOf_string_To_Interface_void(obj));
                    {
                        const __gotots_store_0 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                        const __gotots_argument_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "SeenPointers");
                        const __gotots_argument_12 = named_reflect.ReflectValueOperations.$copy(v);
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = visitPointer(__gotots_argument_11, __gotots_argument_12);
                        if (!(err === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, $state.mapStringAnyType, err);
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_store_1 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                    const __gotots_argument_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "SeenPointers");
                    const __gotots_argument_14 = named_reflect.ReflectValueOperations.$copy(v);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        leavePointer(__gotots_argument_13, __gotots_argument_14);
                    });
                }
                if (obj.length() === 0) {
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatNilMapAsNull$constant__from_jsonflags()) && obj.isNil()) {
                        __gotots_return_0 = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
                        break __gotots_return_block_0;
                    }
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                        const __gotots_slice_build_0 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 123);
                        const __gotots_slice_build_1 = "{}";
                        const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                        }
                        ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                        const __gotots_store_2 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                        stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Last"));
                        if (encoderState__from_jsontext.NeedFlush(xe)) {
                            __gotots_return_0 = encoderState__from_jsontext.Flush(xe);
                            break __gotots_return_block_0;
                        }
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                }
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginObject)));
                    if (!(err === undefined)) {
                        __gotots_return_0 = err;
                        break __gotots_return_block_0;
                    }
                }
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags())) {
                    const __gotots_store_3 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                    stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Last"));
                }
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(Deterministic$constant__from_jsonflags()) || obj.length() <= 1) {
                    const __gotots_range_0 = obj;
                    const __gotots_range_keys_0 = __gotots_range_0.keys();
                    for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                        const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                        if (!__gotots_range_value_1[1]) {
                            continue;
                        }
                        const __gotots_range_value_2 = __gotots_range_value_0;
                        const __gotots_range_value_3 = __gotots_range_value_1[0];
                        let name = __gotots_range_value_2;
                        let val: GoInterface | undefined = __gotots_range_value_3;
                        {
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(name));
                            if (!(err === undefined)) {
                                __gotots_return_0 = err;
                                break __gotots_return_block_0;
                            }
                        }
                        {
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = marshalValueAny(enc, val, mo);
                            if (!(err === undefined)) {
                                __gotots_return_0 = err;
                                break __gotots_return_block_0;
                            }
                        }
                    }
                }
                else {
                    let names: {
                        value: stringSlice;
                    } | undefined = getStrings(obj.length());
                    let i = 0;
                    const __gotots_range_1 = obj;
                    const __gotots_range_keys_1 = __gotots_range_1.keys();
                    for (const __gotots_range_value_4 of __gotots_range_keys_1) {
                        const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
                        if (!__gotots_range_value_5[1]) {
                            continue;
                        }
                        const __gotots_range_value_6 = __gotots_range_value_4;
                        let name = __gotots_range_value_6;
                        ((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).$value.set(i, name);
                        i++;
                    }
                    Sort$Named_json$stringSlice$string((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_range_2: stringSlice["$value"] = (names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_2.length; __gotots_range_index_0++) {
                        const __gotots_range_value_7 = __gotots_range_2.get(__gotots_range_index_0);
                        let name = __gotots_range_value_7;
                        {
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(name));
                            if (!(err === undefined)) {
                                __gotots_return_0 = err;
                                break __gotots_return_block_0;
                            }
                        }
                        {
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = marshalValueAny(enc, obj.lookup(name), mo);
                            if (!(err === undefined)) {
                                __gotots_return_0 = err;
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    putStrings(names);
                }
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndObject)));
                    if (!(err === undefined)) {
                        __gotots_return_0 = err;
                        break __gotots_return_block_0;
                    }
                }
                __gotots_return_0 = void 0;
                break __gotots_return_block_0;
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
export function unmarshalObjectAny(dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): [
    GoMapValue<gostring, GoInterface | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    {
        const __gotots_results_10 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_10[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_10[1];
        __gotots_control_target_0: {
            if (!(err === undefined)) {
                return [GoMap.nil(), err];
            }
            else if (!(tok.Kind() === 123)) {
                const __gotots_argument_15 = new $goInterfaceAdapter$string("BUG: invalid kind: " + Kind_String__from_jsontext(tok.Kind()));
                GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
            }
        }
    }
    let obj: GoMapValue<gostring, GoInterface | undefined> = GoMap.make(0, []);
    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags())) {
        const __gotots_store_5 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens;
        stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Last"));
    }
    let errUnmarshal: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
        const __gotots_results_11 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_11[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_11[1];
        if (!(err === undefined)) {
            return [obj, err];
        }
        let name = tok.String();
        {
            const __gotots_results_12 = obj.lookupOk(name);
            let ok = __gotots_results_12[1];
            if (ok) {
                const __gotots_store_6 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                let name__shadow_1 = decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "decodeBuffer"));
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = newDuplicateNameError(Decoder__from_jsontext.StackPointer(dec), RuntimeSlice.nil<uint8>(), goInt64(Decoder__from_jsontext.InputOffset(dec) - len64$SliceOf_byte(name__shadow_1)));
                return [obj, err__shadow_1];
            }
        }
        const __gotots_results_13 = unmarshalValueAny(dec, uo);
        let val: GoInterface | undefined = __gotots_results_13[0];
        err = __gotots_results_13[1];
        obj.store(name, val);
        if (!(err === undefined)) {
            if (isFatalError(err, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                return [obj, err];
            }
            errUnmarshal = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, errUnmarshal]));
        }
    }
    {
        const __gotots_results_14 = Decoder__from_jsontext.ReadToken(dec);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_14[1];
        if (!(err === undefined)) {
            return [obj, err];
        }
    }
    return [obj, errUnmarshal];
}
export function marshalArrayAny(enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, arr: RuntimeSlice<GoInterface | undefined>, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Depth() > startDetectingCyclesAfter$int) {
                    let v = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$SliceOf_Interface_void(arr));
                    {
                        const __gotots_store_3 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                        const __gotots_argument_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "SeenPointers");
                        const __gotots_argument_14 = named_reflect.ReflectValueOperations.$copy(v);
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = visitPointer(__gotots_argument_13, __gotots_argument_14);
                        if (!(err === undefined)) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, $state.sliceAnyType, err);
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_store_4 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                    const __gotots_argument_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "SeenPointers");
                    const __gotots_argument_16 = named_reflect.ReflectValueOperations.$copy(v);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        leavePointer(__gotots_argument_15, __gotots_argument_16);
                    });
                }
                if (arr.length === 0) {
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatNilSliceAsNull$constant__from_jsonflags()) && arr.isNil()) {
                        __gotots_return_0 = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
                        break __gotots_return_block_0;
                    }
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                        const __gotots_slice_build_4 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 91);
                        const __gotots_slice_build_5 = "[]";
                        const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
                        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
                            __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
                        }
                        ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
                        const __gotots_store_5 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                        stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Last"));
                        if (encoderState__from_jsontext.NeedFlush(xe)) {
                            __gotots_return_0 = encoderState__from_jsontext.Flush(xe);
                            break __gotots_return_block_0;
                        }
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                }
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginArray)));
                    if (!(err === undefined)) {
                        __gotots_return_0 = err;
                        break __gotots_return_block_0;
                    }
                }
                const __gotots_range_3 = arr;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
                    const __gotots_range_value_8 = __gotots_range_3.get(__gotots_range_index_1);
                    let val: GoInterface | undefined = __gotots_range_value_8;
                    {
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = marshalValueAny(enc, val, mo);
                        if (!(err === undefined)) {
                            __gotots_return_0 = err;
                            break __gotots_return_block_0;
                        }
                    }
                }
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndArray)));
                    if (!(err === undefined)) {
                        __gotots_return_0 = err;
                        break __gotots_return_block_0;
                    }
                }
                __gotots_return_0 = void 0;
                break __gotots_return_block_0;
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
export function unmarshalArrayAny(dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): [
    RuntimeSlice<GoInterface | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    {
        const __gotots_results_15 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_15[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_15[1];
        __gotots_control_target_1: {
            if (!(err === undefined)) {
                return [RuntimeSlice.nil<GoInterface | undefined>(), err];
            }
            else if (!(tok.Kind() === 91)) {
                const __gotots_argument_16 = new $goInterfaceAdapter$string("BUG: invalid kind: " + Kind_String__from_jsontext(tok.Kind()));
                GoPanic.raise(__gotots_argument_16 === undefined ? GoPanicNilValue.create() : __gotots_argument_16);
            }
        }
    }
    let arr = RuntimeSlice.literal<GoInterface | undefined>([]);
    let errUnmarshal: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    for (; !(Decoder__from_jsontext.PeekKind(dec) === 93);) {
        const __gotots_results_16 = unmarshalValueAny(dec, uo);
        let val: GoInterface | undefined = __gotots_results_16[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_16[1];
        arr = arr.append(void 0, [val]);
        if (!(err === undefined)) {
            if (isFatalError(err, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                return [arr, err];
            }
            errUnmarshal = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([errUnmarshal, err]));
        }
    }
    {
        const __gotots_results_17 = Decoder__from_jsontext.ReadToken(dec);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_17[1];
        if (!(err === undefined)) {
            return [arr, err];
        }
    }
    return [arr, errUnmarshal];
}
