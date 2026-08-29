import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../support/interface-contracts.js";
import type { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import type { typedArshalers } from "./arshal_funcs.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { AllowDuplicateNames$constant as AllowDuplicateNames$constant__from_jsonflags, AllowInvalidUTF8$constant as AllowInvalidUTF8$constant__from_jsonflags, AnyWhitespace$constant as AnyWhitespace$constant__from_jsonflags, Bools as Bools__from_jsonflags, Flags as Flags__from_jsonflags, Multiline$constant as Multiline$constant__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, ChangedWhitespace as ChangedWhitespace__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { $state as $state__internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { $state as $state__jsontext, Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Pointer as Pointer__from_jsontext, SyntacticError as SyntacticError__from_jsontext, Token as Token__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { typedArshalers$lookup$Named_jsontext$Decoder, typedArshalers$lookup$Named_jsontext$Encoder } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/typedArshalers$lookup.js";
import { $goInterfaceAdapter$PointerTo_Named_json$SemanticError, $goInterfaceAdapter$PointerTo_Named_json$arshaler, $goInterfaceAdapter$PointerTo_Named_json$stringSlice, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goReflectType$Interface_void } from "../../../../../support/reflection-types.js";
import "../../../../../support/reflection-types.js";
import { decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { stateMachine as stateMachine__from_jsontext } from "../jsontext/state.js";
import { makeDefaultArshaler } from "./arshal_default.js";
import { makeMethodArshaler } from "./arshal_methods.js";
import { makeTimeArshaler } from "./arshal_time.js";
import { nonComparable, requireKeyedLiterals } from "./doc.js";
import { SemanticError, newMarshalErrorBefore, newUnmarshalErrorBefore } from "./errors.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceClear } from "@gotots/runtime/slice.js";
export function Marshal(__go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): [
    RuntimeSlice<uint8>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __go_out: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                let enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).GetBufferedEncoder(opts);
                const __gotots_receiver_0 = __go_export__from_jsontext.$copy(__go_export__from_jsontext.$fromStorage($state.__go_export));
                const __gotots_argument_5 = enc;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_receiver_0.PutBufferedEncoder(__gotots_argument_5);
                };
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                const __gotots_store_2 = Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(17n));
                const __gotots_argument_6 = enc;
                const __gotots_argument_7 = __go_in;
                const __gotots_store_3 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                const __gotots_argument_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Struct");
                err = marshalEncode(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_results_0 = RuntimeSlice.nil<uint8>();
                    const __gotots_callee_1 = $state__internal.TransformMarshalError;
                    const __gotots_argument_9 = __go_in;
                    const __gotots_argument_10 = err;
                    const __gotots_results_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
                    const __gotots_results_2: [
                        RuntimeSlice<uint8>,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ] = [__gotots_results_0, __gotots_results_1];
                    __go_out = __gotots_results_2[0];
                    err = __gotots_results_2[1];
                    break __gotots_return_block_0;
                }
                const __gotots_results_3: [
                    RuntimeSlice<uint8>,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] = [bytes__from_gostdlib.Clone(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf), err];
                __go_out = __gotots_results_3[0];
                err = __gotots_results_3[1];
                break __gotots_return_block_0;
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
    return [__go_out, err];
}
export function MarshalWrite(__go_out: GoInterface | undefined, __go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                let enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).GetStreamingEncoder(__go_out, opts);
                const __gotots_receiver_0 = __go_export__from_jsontext.$copy(__go_export__from_jsontext.$fromStorage($state.__go_export));
                const __gotots_argument_0 = enc;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_receiver_0.PutStreamingEncoder(__gotots_argument_0);
                };
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                const __gotots_store_0 = Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(17n));
                const __gotots_argument_1 = enc;
                const __gotots_argument_2 = __go_in;
                const __gotots_store_1 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                const __gotots_argument_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Struct");
                err = marshalEncode(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_callee_0 = $state__internal.TransformMarshalError;
                    const __gotots_argument_4 = __go_in;
                    const __gotots_argument_5 = err;
                    err = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
                    break __gotots_return_block_0;
                }
                err = err;
                break __gotots_return_block_0;
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
    return err;
}
export function MarshalEncode(__go_out: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, __go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    const __gotots_defers_1: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_2: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_2: {
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(__go_out);
                if (opts.length > 0) {
                    let optsOriginal = Struct__from_jsonopts.$copy(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct);
                    const __gotots_callee_7 = (): void => {
                        ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct = Struct__from_jsonopts.$copy(optsOriginal);
                    };
                    __gotots_defers_1.push(($go$recovery: GoRecovery): void => {
                        __gotots_callee_7();
                    });
                    const __gotots_store_9 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                    Struct__from_jsonopts.Join(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Struct"), opts);
                    if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(optsOriginal).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                            err = newMarshalErrorBefore(__go_out, named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_in), $state.errChangingDuplicateNames);
                            break __gotots_return_block_2;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(optsOriginal).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags())) {
                            err = newMarshalErrorBefore(__go_out, named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_in), $state.errChangingInvalidUTF8);
                            break __gotots_return_block_2;
                        }
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Has(AnyWhitespace$constant__from_jsonflags())) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                            const __gotots_store_10 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                            Struct__from_jsonopts.InitializeMultiline(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Struct"));
                        }
                        if (ChangedWhitespace__from_jsonopts(Struct__from_jsonopts.$copy(optsOriginal), Struct__from_jsonopts.$copy(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct))) {
                            err = newMarshalErrorBefore(__go_out, named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_in), $state.errChangingWhitespace);
                            break __gotots_return_block_2;
                        }
                    }
                }
                const __gotots_argument_30 = __go_out;
                const __gotots_argument_31 = __go_in;
                const __gotots_store_11 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                const __gotots_argument_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Struct");
                err = marshalEncode(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_callee_8 = $state__internal.TransformMarshalError;
                    const __gotots_argument_33 = __go_in;
                    const __gotots_argument_34 = err;
                    err = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33, __gotots_argument_34);
                    break __gotots_return_block_2;
                }
                err = err;
                break __gotots_return_block_2;
            }
        }
        catch (__gotots_caught_4) {
            if (!(__gotots_caught_4 instanceof GoPanic)) {
                throw __gotots_caught_4;
            }
            __gotots_panic_2 = __gotots_caught_4;
        }
    }
    finally {
        while (__gotots_defers_1.length !== 0) {
            const __gotots_deferred_2 = goDeferPop(__gotots_defers_1);
            const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
            try {
                __gotots_deferred_2(__gotots_recovery_2);
                if (__gotots_recovery_2.recovered()) {
                    __gotots_panic_2 = undefined;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
    }
    if (__gotots_panic_2 !== undefined) {
        throw __gotots_panic_2;
    }
    return err;
}
export function marshalEncode(__go_out: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, __go_in: $goInterface$Interface_void | undefined, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let v = reflect__from_gostdlib.ValueOf(__go_in);
    if (!v.IsValid() || (named_reflect.ReflectKindValueOperations.$project(v.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer) && v.IsNil())) {
        return Encoder__from_jsontext.WriteToken(__go_out, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
    }
    let forceAddr = !(named_reflect.ReflectKindValueOperations.$project(v.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer));
    if (forceAddr) {
        let v2 = reflect__from_gostdlib.New(v.Type());
        v2.Elem().Set(named_reflect.ReflectValueOperations.$copy(v));
        v = named_reflect.ReflectValueOperations.$copy(v2);
    }
    let va = addressableValue.$fromStorage({
        Value: v.Elem(),
        forcedAddr: forceAddr
    });
    let t: reflect__from_gostdlib.Type | undefined = addressableValue.$storageOf(va).Value.Type();
    let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = (lookupArshaler(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
        const __gotots_results_2 = typedArshalers$lookup$Named_jsontext$Encoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers), marshal, t);
        marshal = __gotots_results_2[0];
    }
    {
        const __gotots_callee_2 = marshal;
        const __gotots_argument_10 = __go_out;
        const __gotots_argument_11 = addressableValue.$copy(va);
        const __gotots_argument_12 = mo;
        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
        if (!(err__shadow_1 === undefined)) {
            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                const __gotots_store_4 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(__go_out) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state;
                stateMachine__from_jsontext.InvalidateDisabledNamespaces(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Tokens"));
            }
            return err__shadow_1;
        }
    }
    return void 0;
}
export function Unmarshal(__go_in: RuntimeSlice<uint8>, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                let dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).GetBufferedDecoder(__go_in, opts);
                const __gotots_receiver_6 = __go_export__from_jsontext.$copy(__go_export__from_jsontext.$fromStorage($state.__go_export));
                const __gotots_argument_15 = dec;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_receiver_6.PutBufferedDecoder(__gotots_argument_15);
                };
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                const __gotots_argument_16 = dec;
                const __gotots_argument_17 = __go_out;
                const __gotots_store_5 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                const __gotots_argument_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Struct");
                const __gotots_argument_19 = true;
                err = unmarshalDecode(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_callee_3 = $state__internal.TransformUnmarshalError;
                    const __gotots_argument_20 = __go_out;
                    const __gotots_argument_21 = err;
                    err = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21);
                    break __gotots_return_block_0;
                }
                err = err;
                break __gotots_return_block_0;
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
    return err;
}
export function UnmarshalRead(__go_in: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_3: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_3: {
                let dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).GetStreamingDecoder(__go_in, opts);
                const __gotots_receiver_7 = __go_export__from_jsontext.$copy(__go_export__from_jsontext.$fromStorage($state.__go_export));
                const __gotots_argument_35 = dec;
                __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                    __gotots_receiver_7.PutStreamingDecoder(__gotots_argument_35);
                };
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                const __gotots_argument_36 = dec;
                const __gotots_argument_37 = __go_out;
                const __gotots_store_12 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                const __gotots_argument_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Struct");
                const __gotots_argument_39 = true;
                err = unmarshalDecode(__gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_callee_9 = $state__internal.TransformUnmarshalError;
                    const __gotots_argument_40 = __go_out;
                    const __gotots_argument_41 = err;
                    err = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_40, __gotots_argument_41);
                    break __gotots_return_block_3;
                }
                err = err;
                break __gotots_return_block_3;
            }
        }
        catch (__gotots_caught_7) {
            if (!(__gotots_caught_7 instanceof GoPanic)) {
                throw __gotots_caught_7;
            }
            __gotots_panic_3 = __gotots_caught_7;
        }
    }
    finally {
        if (__gotots_deferred_3 !== undefined) {
            const __gotots_recovery_3 = new GoRecovery(__gotots_panic_3);
            try {
                __gotots_deferred_3(__gotots_recovery_3);
                if (__gotots_recovery_3.recovered()) {
                    __gotots_panic_3 = undefined;
                }
            }
            catch (__gotots_caught_6) {
                if (!(__gotots_caught_6 instanceof GoPanic)) {
                    throw __gotots_caught_6;
                }
                __gotots_panic_3 = __gotots_caught_6;
            }
        }
    }
    if (__gotots_panic_3 !== undefined) {
        throw __gotots_panic_3;
    }
    return err;
}
export function UnmarshalDecode(__go_in: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_1: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_1: {
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(__go_in);
                if (opts.length > 0) {
                    let optsOriginal = Struct__from_jsonopts.$copy(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct);
                    const __gotots_callee_5 = (): void => {
                        ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct = Struct__from_jsonopts.$copy(optsOriginal);
                    };
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_callee_5();
                    });
                    const __gotots_store_7 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                    Struct__from_jsonopts.Join(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Struct"), opts);
                    if (((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(optsOriginal).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                            err = newUnmarshalErrorBefore(__go_in, named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_out), $state.errChangingDuplicateNames);
                            break __gotots_return_block_1;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(optsOriginal).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags())) {
                            err = newUnmarshalErrorBefore(__go_in, named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_out), $state.errChangingInvalidUTF8);
                            break __gotots_return_block_1;
                        }
                    }
                }
                const __gotots_argument_24 = __go_in;
                const __gotots_argument_25 = __go_out;
                const __gotots_store_8 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                const __gotots_argument_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Struct");
                const __gotots_argument_27 = false;
                err = unmarshalDecode(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
                if (!(err === undefined) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_callee_6 = $state__internal.TransformUnmarshalError;
                    const __gotots_argument_28 = __go_out;
                    const __gotots_argument_29 = err;
                    err = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28, __gotots_argument_29);
                    break __gotots_return_block_1;
                }
                err = err;
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
            const __gotots_deferred_1 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
            try {
                __gotots_deferred_1(__gotots_recovery_1);
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
    return err;
}
export function unmarshalDecode(__go_in: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, __go_out: $goInterface$Interface_void | undefined, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined, last: bool): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    let v = reflect__from_gostdlib.ValueOf(__go_out);
    if (!(named_reflect.ReflectKindValueOperations.$project(v.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer)) || v.IsNil()) {
        return new $goInterfaceAdapter$PointerTo_Named_json$SemanticError({ value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), "unmarshal", 0n, new Pointer__from_jsontext(""), 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), named_reflect.ReflectTypeMetadataOperations.$typeOf(__go_out), $state__internal.ErrNonNilReference) });
    }
    let va = addressableValue.$fromStorage({
        Value: v.Elem(),
        forcedAddr: false
    });
    let t: reflect__from_gostdlib.Type | undefined = addressableValue.$storageOf(va).Value.Type();
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = decoderState__from_jsontext.CheckNextValue(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(__go_in), last);
            if (!(err__shadow_1 === undefined)) {
                if (goInterfaceEqual(err__shadow_1, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)) && last) {
                    let offset = goInt64(Decoder__from_jsontext.InputOffset(__go_in) + BigInt.asIntN(64, goNumberToBigInt(Decoder__from_jsontext.UnreadBuffer(__go_in).length)));
                    const __gotots_field_0 = offset;
                    const __gotots_field_1 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
                    const __gotots_struct_0 = SyntacticError__from_jsontext.$zero();
                    __gotots_struct_0.ByteOffset = __gotots_field_0;
                    __gotots_struct_0.Err = __gotots_field_1;
                    return new $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError({ value: __gotots_struct_0 });
                }
                return err__shadow_1;
            }
        }
    }
    let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = (lookupArshaler(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
        const __gotots_results_7 = typedArshalers$lookup$Named_jsontext$Decoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers), unmarshal, t);
        unmarshal = __gotots_results_7[0];
    }
    {
        const __gotots_callee_4 = unmarshal;
        const __gotots_argument_21 = __go_in;
        const __gotots_argument_22 = addressableValue.$copy(va);
        const __gotots_argument_23 = uo;
        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
        if (!(err__shadow_1 === undefined)) {
            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                const __gotots_store_6 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(__go_in) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state;
                stateMachine__from_jsontext.InvalidateDisabledNamespaces(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Tokens"));
            }
            if (goInterfaceEqual(err__shadow_1, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)) && last) {
                let offset = goInt64(Decoder__from_jsontext.InputOffset(__go_in) + BigInt.asIntN(64, goNumberToBigInt(Decoder__from_jsontext.UnreadBuffer(__go_in).length)));
                const __gotots_field_2 = offset;
                const __gotots_field_3 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
                const __gotots_struct_1 = SyntacticError__from_jsontext.$zero();
                __gotots_struct_1.ByteOffset = __gotots_field_2;
                __gotots_struct_1.Err = __gotots_field_3;
                return new $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError({ value: __gotots_struct_1 });
            }
            return err__shadow_1;
        }
    }
    if (last) {
        return decoderState__from_jsontext.CheckEOF(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(__go_in));
    }
    return void 0;
}
export type addressableValue$Storage = {
    Value: reflect__from_gostdlib.Value;
    forcedAddr: bool;
};
export class addressableValue {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: addressableValue$Storage) {
    }
    public static $storageOf($source: addressableValue): addressableValue$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: addressableValue$Storage): addressableValue {
        return new addressableValue($source);
    }
    public get Value(): reflect__from_gostdlib.Value {
        return this.$storage.Value;
    }
    public set Value($value: reflect__from_gostdlib.Value) {
        this.$storage.Value = $value;
    }
    public get forcedAddr(): bool {
        return this.$storage.forcedAddr;
    }
    public set forcedAddr($value: bool) {
        this.$storage.forcedAddr = $value;
    }
    static $zero(): addressableValue {
        return new addressableValue({
            Value: named_reflect.ReflectValueOperations.$zero(),
            forcedAddr: false
        });
    }
    static $copy($source: addressableValue): addressableValue {
        return new addressableValue({
            Value: named_reflect.ReflectValueOperations.$copy($source.$storage.Value),
            forcedAddr: $source.$storage.forcedAddr
        });
    }
    static $zeroStorage(): addressableValue$Storage {
        return {
            Value: named_reflect.ReflectValueOperations.$zero(),
            forcedAddr: false
        };
    }
    declare private readonly then?: never;
    $go$private$json$fieldByIndex(index: RuntimeSlice<int>, mayAlloc: bool): addressableValue {
        let va: addressableValue = addressableValue.$copy(this);
        const __gotots_range_0 = index;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            va = va.$go$private$json$indirect(mayAlloc);
            if (!addressableValue.$storageOf(va).Value.IsValid()) {
                return addressableValue.$copy(va);
            }
            va = addressableValue.$fromStorage({
                Value: addressableValue.$storageOf(va).Value.Field(BigInt.asIntN(64, goNumberToBigInt(i))),
                forcedAddr: addressableValue.$storageOf(va).forcedAddr
            });
        }
        return addressableValue.$copy(va);
    }
    $go$private$json$indirect(mayAlloc: bool): addressableValue {
        let va: addressableValue = addressableValue.$copy(this);
        if (named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer)) {
            if (addressableValue.$storageOf(va).Value.IsNil()) {
                if (!mayAlloc || !addressableValue.$storageOf(va).Value.CanSet()) {
                    return addressableValue.$fromStorage({
                        Value: named_reflect.ReflectValueOperations.$zero(),
                        forcedAddr: false
                    });
                }
                const __gotots_receiver_5 = addressableValue.$storageOf(va).Value;
                const __gotots_receiver_4 = addressableValue.$storageOf(va).Value.Type();
                const __gotots_argument_13 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_4).Elem();
                const __gotots_argument_14 = reflect__from_gostdlib.New(__gotots_argument_13);
                __gotots_receiver_5.Set(__gotots_argument_14);
            }
            va = addressableValue.$fromStorage({
                Value: addressableValue.$storageOf(va).Value.Elem(),
                forcedAddr: false
            });
        }
        return addressableValue.$copy(va);
    }
}
export function newAddressableValue(t: reflect__from_gostdlib.Type | undefined): addressableValue {
    return addressableValue.$fromStorage({
        Value: reflect__from_gostdlib.New(t).Elem(),
        forcedAddr: true
    });
}
export class arshaler {
    declare private readonly $goType: void;
    public constructor(public marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined, public unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined, public nonDefault: bool) {
    }
    static $zero(): arshaler {
        return new arshaler(void 0, void 0, false);
    }
    static $copy($source: arshaler): arshaler {
        return new arshaler($source.marshal, $source.unmarshal, $source.nonDefault);
    }
    declare private readonly then?: never;
    $tsonicReplace($value: arshaler): void {
        this.marshal = $value.marshal;
        this.unmarshal = $value.unmarshal;
        this.nonDefault = $value.nonDefault;
    }
}
export function lookupArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    {
        const __gotots_results_4 = sync__from_gostdlib.Map.Load($state.lookupArshalerCache, t);
        let v__shadow_1: $goInterface$Interface_void | undefined = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (ok) {
            return (($value: $goInterface$Interface_void | undefined): arshaler | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$arshaler.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(v__shadow_1);
        }
    }
    let fncs: arshaler | undefined = makeDefaultArshaler(t);
    fncs = makeMethodArshaler(fncs, t);
    fncs = makeTimeArshaler(fncs, t);
    const __gotots_results_6 = sync__from_gostdlib.Map.LoadOrStore($state.lookupArshalerCache, t, new $goInterfaceAdapter$PointerTo_Named_json$arshaler(fncs));
    let v: $goInterface$Interface_void | undefined = __gotots_results_6[0];
    return (($value: $goInterface$Interface_void | undefined): arshaler | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_json$arshaler.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(v);
}
export class stringSlice {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<gostring>) {
    }
    declare private readonly then?: never;
}
export function getStrings(n: int): {
    value: stringSlice;
} | undefined {
    const __gotots_receiver_0 = $state.stringsPools;
    let s: {
        value: stringSlice;
    } | undefined = (($value: $goInterface$Interface_void | undefined): {
        value: stringSlice;
    } | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_json$stringSlice.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value.capacity < n) {
        void ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new stringSlice(RuntimeSlice.make<gostring>(n, null, "")));
    }
    void ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        new stringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).$value.slice(0, n, null)));
    return s;
}
export function putStrings(s: {
    value: stringSlice;
} | undefined): void {
    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value.capacity > 1024) {
        void ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new stringSlice(RuntimeSlice.nil<gostring>()));
    }
    goSliceClear((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value, "");
    const __gotots_receiver_1 = $state.stringsPools;
    sync__from_gostdlib.Pool.Put(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_json$stringSlice(s));
}
