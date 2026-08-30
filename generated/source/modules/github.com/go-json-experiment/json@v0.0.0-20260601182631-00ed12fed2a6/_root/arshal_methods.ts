import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error, $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { arshaler } from "./arshal.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { Bools as Bools__from_jsonflags, CallMethodsWithLegacySemantics$constant as CallMethodsWithLegacySemantics$constant__from_jsonflags, Flags as Flags__from_jsonflags, MergeWithLegacySemantics$constant as MergeWithLegacySemantics$constant__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state as $state__internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $goDeferred$SliceOf_byte_to_SliceOf_byte_Named_error as DeferredCallableRegistry } from "../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Is_Named_error_to_bool$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$contract, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$is, $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$contract, $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$is, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$contract as GoInterface$contract, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { $goInterfaceMethod$AppendText$SliceOf_byte_to_SliceOf_byte_Named_error, $goInterfaceMethod$MarshalJSON$void_to_SliceOf_byte_Named_error, $goInterfaceMethod$MarshalJSONTo$PointerTo_Named_jsontext$Encoder_to_Named_error, $goInterfaceMethod$UnmarshalJSON$SliceOf_byte_to_Named_error, $goInterfaceMethod$UnmarshalJSONFrom$PointerTo_Named_jsontext$Decoder_to_Named_error } from "../../../../../support/interface-methods.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { addressableValue } from "./arshal.js";
import { collapseSemanticErrors, isSemanticError, isSyntacticError, newMarshalErrorBefore, newSemanticErrorWithPosition, newUnmarshalErrorAfter, wrapErrUnsupported } from "./errors.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goSliceAppendSlice } from "@gotots/runtime/slice.js";
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
export interface Marshaler extends GoInterfaceValue {
    MarshalJSON(): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ];
}
export const Marshaler$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$MarshalJSON$void_to_SliceOf_byte_Named_error]);
export function Marshaler$is(value: GoInterfaceValue | undefined): value is Marshaler {
    return value !== undefined && value.$go$implements(Marshaler$contract);
}
export interface MarshalerTo extends GoInterfaceValue {
    MarshalJSONTo($argument0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): GoInterface | undefined;
}
export const MarshalerTo$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$MarshalJSONTo$PointerTo_Named_jsontext$Encoder_to_Named_error]);
export function MarshalerTo$is(value: GoInterfaceValue | undefined): value is MarshalerTo {
    return value !== undefined && value.$go$implements(MarshalerTo$contract);
}
export interface Unmarshaler extends GoInterfaceValue {
    UnmarshalJSON($argument0: RuntimeSlice<uint8>): GoInterface | undefined;
}
export const Unmarshaler$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$UnmarshalJSON$SliceOf_byte_to_Named_error]);
export function Unmarshaler$is(value: GoInterfaceValue | undefined): value is Unmarshaler {
    return value !== undefined && value.$go$implements(Unmarshaler$contract);
}
export interface UnmarshalerFrom extends GoInterfaceValue {
    UnmarshalJSONFrom($argument0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): GoInterface | undefined;
}
export const UnmarshalerFrom$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$UnmarshalJSONFrom$PointerTo_Named_jsontext$Decoder_to_Named_error]);
export function UnmarshalerFrom$is(value: GoInterfaceValue | undefined): value is UnmarshalerFrom {
    return value !== undefined && value.$go$implements(UnmarshalerFrom$contract);
}
export function makeMethodArshaler(fncs: arshaler | undefined, t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    const __gotots_receiver_0 = t;
    let __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
    if (!__gotots_logical_result_0) {
        const __gotots_receiver_1 = t;
        __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_1).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Interface);
    }
    if (__gotots_logical_result_0) {
        return fncs;
    }
    {
        const __gotots_results_0 = __go_implements(t, $state.textMarshalerType);
        let needAddr = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevMarshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && (needAddr && addressableValue.$storageOf(va).forcedAddr)) {
                    const __gotots_callee_0 = prevMarshal;
                    const __gotots_argument_0 = enc;
                    const __gotots_argument_1 = addressableValue.$copy(va);
                    const __gotots_argument_2 = mo;
                    return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                }
                const __gotots_results_1 = (($value: $goInterface$Interface_void | undefined): [
                    $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined,
                    boolean
                ] => {
                    if (!GoInterface$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let marshaler__shadow_1: $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined = __gotots_results_1[0];
                {
                    let err: GoInterface | undefined = encoderState__from_jsontext.AppendRaw(__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc), 34, false, (b: RuntimeSlice<uint8>): [
                        RuntimeSlice<uint8>,
                        GoInterface | undefined
                    ] => {
                        const __gotots_receiver_2 = marshaler__shadow_1;
                        const __gotots_results_2 = goInterfaceNonNil<$goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error>(__gotots_receiver_2).MarshalText();
                        let b2 = __gotots_results_2[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_2[1];
                        return [goSliceAppendSlice<uint8>(b, b2, 0), err__shadow_1];
                    });
                    if (!(err === undefined)) {
                        err = wrapErrUnsupported(err, "MarshalText method");
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            const __gotots_callee_1 = $state__internal.NewMarshalerError;
                            const __gotots_argument_3 = addressableValue.$storageOf(va).Value.Addr().Interface();
                            const __gotots_argument_4 = err;
                            const __gotots_argument_5 = "MarshalText";
                            return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
                        }
                        if (!isSemanticError(err) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err)) {
                            err = newMarshalErrorBefore(enc, t, err);
                        }
                        return err;
                    }
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_3 = __go_implements(t, $state.textAppenderType);
        let needAddr = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevMarshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                let err: GoInterface | undefined = void 0;
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && (needAddr && addressableValue.$storageOf(va).forcedAddr)) {
                    const __gotots_callee_2 = prevMarshal;
                    const __gotots_argument_6 = enc;
                    const __gotots_argument_7 = addressableValue.$copy(va);
                    const __gotots_argument_8 = mo;
                    return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                }
                const __gotots_results_4 = (($value: $goInterface$Interface_void | undefined): [
                    $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error | undefined,
                    boolean
                ] => {
                    if (!$goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let appender: $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error | undefined = __gotots_results_4[0];
                {
                    const __gotots_receiver_5 = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    const __gotots_argument_9 = 34;
                    const __gotots_argument_10 = false;
                    const __gotots_receiver_3 = goInterfaceNonNil(appender);
                    const __gotots_argument_11 = DeferredCallableRegistry.register(($argument0: RuntimeSlice<uint8>): [
                        RuntimeSlice<uint8>,
                        GoInterface | undefined
                    ] => __gotots_receiver_3.AppendText($argument0), ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>): [
                        RuntimeSlice<uint8>,
                        GoInterface | undefined
                    ] => {
                        const __gotots_receiver_4: $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error = goInterfaceNonNil<$goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error>(__gotots_receiver_3);
                        const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$AppendText$SliceOf_byte_to_SliceOf_byte_Named_error, __gotots_receiver_4);
                        return __gotots_deferred_0 === undefined ? __gotots_receiver_4.AppendText($argument0) : __gotots_deferred_0($go$recovery, __gotots_receiver_4, $argument0);
                    });
                    let err__shadow_1: GoInterface | undefined = encoderState__from_jsontext.AppendRaw(__gotots_receiver_5, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                    if (!(err__shadow_1 === undefined)) {
                        err__shadow_1 = wrapErrUnsupported(err__shadow_1, "AppendText method");
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            const __gotots_callee_3 = $state__internal.NewMarshalerError;
                            const __gotots_argument_12 = addressableValue.$storageOf(va).Value.Addr().Interface();
                            const __gotots_argument_13 = err__shadow_1;
                            const __gotots_argument_14 = "AppendText";
                            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
                        }
                        if (!isSemanticError(err__shadow_1) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err__shadow_1)) {
                            err__shadow_1 = newMarshalErrorBefore(enc, t, err__shadow_1);
                        }
                        return err__shadow_1;
                    }
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_5 = __go_implements(t, $state.jsonMarshalerType);
        let needAddr = __gotots_results_5[0];
        let ok = __gotots_results_5[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevMarshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && ((needAddr && addressableValue.$storageOf(va).forcedAddr) || ((__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName())) {
                    const __gotots_callee_4 = prevMarshal;
                    const __gotots_argument_15 = enc;
                    const __gotots_argument_16 = addressableValue.$copy(va);
                    const __gotots_argument_17 = mo;
                    return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
                }
                const __gotots_results_6 = (($value: $goInterface$Interface_void | undefined): [
                    Marshaler | undefined,
                    boolean
                ] => {
                    if (!Marshaler$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let marshaler__shadow_1: Marshaler | undefined = __gotots_results_6[0];
                const __gotots_receiver_6 = marshaler__shadow_1;
                const __gotots_results_7 = goInterfaceNonNil<Marshaler>(__gotots_receiver_6).MarshalJSON();
                let val = __gotots_results_7[0];
                let err: GoInterface | undefined = __gotots_results_7[1];
                if (!(err === undefined)) {
                    err = wrapErrUnsupported(err, "MarshalJSON method");
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        const __gotots_callee_5 = $state__internal.NewMarshalerError;
                        const __gotots_argument_18 = addressableValue.$storageOf(va).Value.Addr().Interface();
                        const __gotots_argument_19 = err;
                        const __gotots_argument_20 = "MarshalJSON";
                        return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
                    }
                    err = newMarshalErrorBefore(enc, t, err);
                    return collapseSemanticErrors(err);
                }
                {
                    let err__shadow_1: GoInterface | undefined = Encoder__from_jsontext.WriteValue(enc, new Value__from_jsontext(val));
                    if (!(err__shadow_1 === undefined)) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            const __gotots_callee_6 = $state__internal.NewMarshalerError;
                            const __gotots_argument_21 = addressableValue.$storageOf(va).Value.Addr().Interface();
                            const __gotots_argument_22 = err__shadow_1;
                            const __gotots_argument_23 = "MarshalJSON";
                            return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
                        }
                        if (isSyntacticError(err__shadow_1)) {
                            err__shadow_1 = newMarshalErrorBefore(enc, t, err__shadow_1);
                        }
                        return err__shadow_1;
                    }
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_8 = __go_implements(t, $state.jsonMarshalerToType);
        let needAddr = __gotots_results_8[0];
        let ok = __gotots_results_8[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevMarshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && ((needAddr && addressableValue.$storageOf(va).forcedAddr) || ((__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName())) {
                    const __gotots_callee_7 = prevMarshal;
                    const __gotots_argument_24 = enc;
                    const __gotots_argument_25 = addressableValue.$copy(va);
                    const __gotots_argument_26 = mo;
                    return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
                }
                let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                const __gotots_results_9 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.DepthLength();
                let prevDepth = __gotots_results_9[0];
                let prevLength = __gotots_results_9[1];
                const __gotots_store_0 = Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_0, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(9n));
                const __gotots_results_10 = (($value: $goInterface$Interface_void | undefined): [
                    MarshalerTo | undefined,
                    boolean
                ] => {
                    if (!MarshalerTo$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let marshaler__shadow_1: MarshalerTo | undefined = __gotots_results_10[0];
                const __gotots_receiver_7 = marshaler__shadow_1;
                const __gotots_argument_27 = enc;
                let err: GoInterface | undefined = goInterfaceNonNil<MarshalerTo>(__gotots_receiver_7).MarshalJSONTo(__gotots_argument_27);
                const __gotots_store_1 = Struct__from_jsonopts.$storageOf(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_1, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(8n));
                const __gotots_results_11 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.DepthLength();
                let currDepth = __gotots_results_11[0];
                let currLength = __gotots_results_11[1];
                if ((prevDepth !== currDepth || goInt64(prevLength + 1n) !== currLength) && err === undefined) {
                    err = $state.errNonSingularValue;
                }
                if (!(err === undefined)) {
                    const __gotots_argument_28 = err;
                    const __gotots_argument_29 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.state.ErrUnsupported);
                    if (provider_error.ErrorsIsDirect(__gotots_argument_28, __gotots_argument_29, $goInterface$Interface_Method_Is_Named_error_to_bool$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                        if (prevDepth === currDepth && prevLength === currLength) {
                            const __gotots_callee_8 = prevMarshal;
                            const __gotots_argument_30 = enc;
                            const __gotots_argument_31 = addressableValue.$copy(va);
                            const __gotots_argument_32 = mo;
                            return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32);
                        }
                        err = $state.errUnsupportedMutation;
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        const __gotots_callee_9 = $state__internal.NewMarshalerError;
                        const __gotots_argument_33 = addressableValue.$storageOf(va).Value.Addr().Interface();
                        const __gotots_argument_34 = err;
                        const __gotots_argument_35 = "MarshalJSONTo";
                        return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                    }
                    if (!__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err)) {
                        err = newSemanticErrorWithPosition(new GoInterfaceAdapter(enc), t, prevDepth, prevLength, err);
                    }
                    return err;
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_12 = __go_implements(t, $state.textUnmarshalerType);
        let ok = __gotots_results_12[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                let flags = new ValueFlags__from_jsonwire(0);
                const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
                const __gotots_results_13 = decoderState__from_jsontext.ReadValue(xd, flags$location);
                let val: Value__from_jsontext = __gotots_results_13[0];
                let err: GoInterface | undefined = __gotots_results_13[1];
                if (!(err === undefined)) {
                    return err;
                }
                if (val.Kind() === 110) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(va).Value.SetZero();
                    }
                    return void 0;
                }
                if (!(val.Kind() === 34)) {
                    return newUnmarshalErrorAfter(dec, t, $state.errNonStringValue);
                }
                let s = UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim());
                const __gotots_results_14 = (($value: $goInterface$Interface_void | undefined): [
                    $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error | undefined,
                    boolean
                ] => {
                    if (!$goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let unmarshaler__shadow_1: $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error | undefined = __gotots_results_14[0];
                {
                    const __gotots_receiver_8 = unmarshaler__shadow_1;
                    const __gotots_argument_36 = s;
                    let err__shadow_1: GoInterface | undefined = goInterfaceNonNil<$goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error>(__gotots_receiver_8).UnmarshalText(__gotots_argument_36);
                    if (!(err__shadow_1 === undefined)) {
                        err__shadow_1 = wrapErrUnsupported(err__shadow_1, "UnmarshalText method");
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            return err__shadow_1;
                        }
                        if (!isSemanticError(err__shadow_1) && !isSyntacticError(err__shadow_1) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err__shadow_1)) {
                            err__shadow_1 = newUnmarshalErrorAfter(dec, t, err__shadow_1);
                        }
                        return err__shadow_1;
                    }
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_15 = __go_implements(t, $state.jsonUnmarshalerType);
        let ok = __gotots_results_15[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevUnmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                    const __gotots_callee_10 = prevUnmarshal;
                    const __gotots_argument_37 = dec;
                    const __gotots_argument_38 = addressableValue.$copy(va);
                    const __gotots_argument_39 = uo;
                    return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38, __gotots_argument_39);
                }
                const __gotots_results_16 = Decoder__from_jsontext.ReadValue(dec);
                let val: Value__from_jsontext = __gotots_results_16[0];
                let err: GoInterface | undefined = __gotots_results_16[1];
                if (!(err === undefined)) {
                    return err;
                }
                const __gotots_results_17 = (($value: $goInterface$Interface_void | undefined): [
                    Unmarshaler | undefined,
                    boolean
                ] => {
                    if (!Unmarshaler$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let unmarshaler__shadow_1: Unmarshaler | undefined = __gotots_results_17[0];
                {
                    const __gotots_receiver_9 = unmarshaler__shadow_1;
                    const __gotots_argument_40 = val.$value;
                    let err__shadow_1: GoInterface | undefined = goInterfaceNonNil<Unmarshaler>(__gotots_receiver_9).UnmarshalJSON(__gotots_argument_40);
                    if (!(err__shadow_1 === undefined)) {
                        err__shadow_1 = wrapErrUnsupported(err__shadow_1, "UnmarshalJSON method");
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            return err__shadow_1;
                        }
                        err__shadow_1 = newUnmarshalErrorAfter(dec, t, err__shadow_1);
                        return collapseSemanticErrors(err__shadow_1);
                    }
                }
                return void 0;
            };
        }
    }
    {
        const __gotots_results_18 = __go_implements(t, $state.jsonUnmarshalerFromType);
        let ok = __gotots_results_18[1];
        if (ok) {
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault = true;
            let prevUnmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
            (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                    const __gotots_callee_11 = prevUnmarshal;
                    const __gotots_argument_41 = dec;
                    const __gotots_argument_42 = addressableValue.$copy(va);
                    const __gotots_argument_43 = uo;
                    return (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
                }
                let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                const __gotots_results_19 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.DepthLength();
                let prevDepth = __gotots_results_19[0];
                let prevLength = __gotots_results_19[1];
                if (prevDepth === 1 && decoderState__from_jsontext.AtEOF(xd)) {
                    return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                }
                const __gotots_store_2 = Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_2, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(9n));
                const __gotots_results_20 = (($value: $goInterface$Interface_void | undefined): [
                    UnmarshalerFrom | undefined,
                    boolean
                ] => {
                    if (!UnmarshalerFrom$is($value)) {
                        return [void 0, false];
                    }
                    return [$value, true];
                })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                let unmarshaler__shadow_1: UnmarshalerFrom | undefined = __gotots_results_20[0];
                const __gotots_receiver_10 = unmarshaler__shadow_1;
                const __gotots_argument_44 = dec;
                let err: GoInterface | undefined = goInterfaceNonNil<UnmarshalerFrom>(__gotots_receiver_10).UnmarshalJSONFrom(__gotots_argument_44);
                const __gotots_store_3 = Struct__from_jsonopts.$storageOf(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_3, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(8n));
                const __gotots_results_21 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.DepthLength();
                let currDepth = __gotots_results_21[0];
                let currLength = __gotots_results_21[1];
                if ((prevDepth !== currDepth || goInt64(prevLength + 1n) !== currLength) && err === undefined) {
                    err = $state.errNonSingularValue;
                }
                if (!(err === undefined)) {
                    const __gotots_argument_45 = err;
                    const __gotots_argument_46 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.state.ErrUnsupported);
                    if (provider_error.ErrorsIsDirect(__gotots_argument_45, __gotots_argument_46, $goInterface$Interface_Method_Is_Named_error_to_bool$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                        if (prevDepth === currDepth && prevLength === currLength) {
                            const __gotots_callee_12 = prevUnmarshal;
                            const __gotots_argument_47 = dec;
                            const __gotots_argument_48 = addressableValue.$copy(va);
                            const __gotots_argument_49 = uo;
                            return (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47, __gotots_argument_48, __gotots_argument_49);
                        }
                        err = $state.errUnsupportedMutation;
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        {
                            let err2: GoInterface | undefined = decoderState__from_jsontext.SkipUntil(xd, prevDepth, goInt64(prevLength + 1n));
                            if (!(err2 === undefined)) {
                                return err2;
                            }
                        }
                        return err;
                    }
                    if (!isSyntacticError(err) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err)) {
                        err = newSemanticErrorWithPosition(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t, prevDepth, prevLength, err);
                    }
                    return err;
                }
                return void 0;
            };
        }
    }
    return fncs;
}
export function implementsAny(t: reflect__from_gostdlib.Type | undefined, ifaceTypes: RuntimeSlice<reflect__from_gostdlib.Type | undefined>): bool {
    const __gotots_range_0 = ifaceTypes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let ifaceType: reflect__from_gostdlib.Type | undefined = __gotots_range_value_0;
        {
            const __gotots_results_22 = __go_implements(t, ifaceType);
            let ok = __gotots_results_22[1];
            if (ok) {
                return true;
            }
        }
    }
    return false;
}
export function __go_implements(t: reflect__from_gostdlib.Type | undefined, ifaceType: reflect__from_gostdlib.Type | undefined): [
    bool,
    bool
] {
    let needAddr: bool = false;
    let ok: bool = false;
    {
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                const __gotots_receiver_11 = t;
                const __gotots_argument_50 = ifaceType;
                __gotots_switch_match_0 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_11).Implements(__gotots_argument_50);
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                const __gotots_receiver_12 = reflect__from_gostdlib.PointerTo(t);
                const __gotots_argument_51 = ifaceType;
                __gotots_switch_match_1 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_12).Implements(__gotots_argument_51);
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 2;
        }
        __gotots_control_target_0: switch (__gotots_switch_selection_0) {
            case 0: {
                return [false, true];
                break;
            }
            case 1: {
                return [true, true];
                break;
            }
            case 2: {
                return [false, false];
                break;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
