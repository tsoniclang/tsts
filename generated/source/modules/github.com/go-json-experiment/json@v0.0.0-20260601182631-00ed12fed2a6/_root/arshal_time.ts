import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { arshaler } from "./arshal.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type { bool, float64, gostring, int64, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { Bools as Bools__from_jsonflags, Flags as Flags__from_jsonflags, FormatDurationAsNano$constant as FormatDurationAsNano$constant__from_jsonflags, FormatTag$constant as FormatTag$constant__from_jsonflags, MergeWithLegacySemantics$constant as MergeWithLegacySemantics$constant__from_jsonflags, ParseTimeWithLooseRFC3339$constant as ParseTimeWithLooseRFC3339$constant__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags, StringTag$constant as StringTag$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { ParseUint as ParseUint__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state as $state__internal, ExpJSONFormat$bool as ExpJSONFormat$bool__from_internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { MaxUint$uint64 as MaxUint$uint64__from_math__package_1, MaxUint64$uint64 as MaxUint64$uint64__from_math__package_1 } from "../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { ANSIC$string as ANSIC$string__from_time, DateOnly$string as DateOnly$string__from_time, DateTime$string as DateTime$string__from_time, Kitchen$string as Kitchen$string__from_time, RFC1123$string as RFC1123$string__from_time, RFC1123Z$string as RFC1123Z$string__from_time, RFC3339$string as RFC3339$string__from_time, RFC3339Nano$string as RFC3339Nano$string__from_time, RFC822$string as RFC822$string__from_time, RFC822Z$string as RFC822Z$string__from_time, RFC850$string as RFC850$string__from_time, RubyDate$string as RubyDate$string__from_time, Stamp$string as Stamp$string__from_time, StampMicro$string as StampMicro$string__from_time, StampMilli$string as StampMilli$string__from_time, StampNano$string as StampNano$string__from_time, TimeOnly$string as TimeOnly$string__from_time, UnixDate$string as UnixDate$string__from_time } from "../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/time/index.js";
import { Or$string } from "../../../../../support/generics/concretizations/cmp/Or.js";
import { $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$Named_time$Time, $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_time$Duration, $goInterfaceAdapter$PointerTo_Named_time$ParseError, $goInterfaceAdapter$PointerTo_Named_time$Time, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { addressableValue } from "./arshal.js";
import { stringOrNumberKind } from "./arshal_default.js";
import { isSyntacticError, newInvalidFormatError, newMarshalErrorBefore, newUnmarshalErrorAfter, newUnmarshalErrorBeforeWithSkipping } from "./errors.js";
import { isLetterOrDigit } from "./fields.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goIntegerDivide, goIntegerRemainder, goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export function makeTimeArshaler(fncs: tsonicTypeScriptRuntime.Location<arshaler> | undefined, t: reflect__from_gostdlib.Type | undefined): tsonicTypeScriptRuntime.Location<arshaler> | undefined {
    {
        const __gotots_switch_tag_0 = t;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = goInterfaceEqual(__gotots_switch_tag_0, $state.timeDurationType);
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = goInterfaceEqual(__gotots_switch_tag_0, $state.timeTimeType);
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        switch (__gotots_switch_selection_0) {
            case 0: {
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.nonDefault = true;
                let marshalNano: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.marshal;
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                    let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    let m = durationArshaler.$zero();
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                        if (!durationArshaler.$go$private$json$initFormat(m, ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format)) {
                            return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
                        }
                    }
                    else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatDurationAsNano$constant__from_jsonflags())) {
                        const __gotots_callee_0 = marshalNano;
                        const __gotots_argument_0 = enc;
                        const __gotots_argument_1 = addressableValue.$copy(va);
                        const __gotots_argument_2 = mo;
                        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                    }
                    else {
                        let workaround = "";
                        if (ExpJSONFormat$bool__from_internal) {
                            workaround = "; specify an explicit format";
                        }
                        return newMarshalErrorBefore(enc, t, GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("no default representation" + workaround)));
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !durationArshaler.$go$private$json$isNumeric(m) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                    }
                    const __gotots_store_0 = m;
                    const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
                        time__from_gostdlib.Duration,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$Named_time$Duration.$is($value)) {
                            return [named_time.TimeDurationValueOperations.$wrap(0n), false];
                        }
                        return [$value.$go$value, true];
                    })(addressableValue.$storageOf(va).Value.$unbox());
                    __gotots_store_0.td = __gotots_results_0[0];
                    let k = stringOrNumberKind(!durationArshaler.$go$private$json$isNumeric(m) || ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n)));
                    {
                        const __gotots_receiver_1 = xe;
                        const __gotots_argument_3 = k;
                        const __gotots_argument_4 = true;
                        const __gotots_receiver_0 = m;
                        const __gotots_argument_5 = ($argument0: RuntimeSlice<uint8>): [
                            RuntimeSlice<uint8>,
                            GoInterface | undefined
                        ] => {
                            return durationArshaler.$go$private$json$appendMarshal(__gotots_receiver_0, $argument0);
                        };
                        let err: GoInterface | undefined = encoderState__from_jsontext.AppendRaw(__gotots_receiver_1, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
                        if (!(err === undefined)) {
                            if (!isSyntacticError(err) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err)) {
                                err = newMarshalErrorBefore(enc, t, err);
                            }
                            return err;
                        }
                    }
                    return void 0;
                };
                let unmarshalNano: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.unmarshal;
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                    let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                    let u = durationArshaler.$zero();
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                        if (!durationArshaler.$go$private$json$initFormat(u, ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format)) {
                            return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
                        }
                    }
                    else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatDurationAsNano$constant__from_jsonflags())) {
                        const __gotots_callee_1 = unmarshalNano;
                        const __gotots_argument_6 = dec;
                        const __gotots_argument_7 = addressableValue.$copy(va);
                        const __gotots_argument_8 = uo;
                        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                    }
                    else {
                        let workaround = "";
                        if (ExpJSONFormat$bool__from_internal) {
                            workaround = "; specify an explicit format";
                        }
                        return newUnmarshalErrorBeforeWithSkipping(dec, t, GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("no default representation" + workaround)));
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !durationArshaler.$go$private$json$isNumeric(u) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
                    }
                    let stringify = !durationArshaler.$go$private$json$isNumeric(u) || ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
                    let flags = new ValueFlags__from_jsonwire(0);
                    const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
                    const __gotots_results_1 = (($value: $goInterface$Interface_void | undefined): [
                        tsonicTypeScriptRuntime.Location<time__from_gostdlib.Duration> | undefined,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$PointerTo_Named_time$Duration.$is($value)) {
                            return [void 0, false];
                        }
                        return [$value.$go$value, true];
                    })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                    let td: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Duration> | undefined = __gotots_results_1[0];
                    const __gotots_results_2 = decoderState__from_jsontext.ReadValue(xd, flags$location);
                    let val: Value__from_jsontext = __gotots_results_2[0];
                    let err: GoInterface | undefined = __gotots_results_2[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                    {
                        let k = val.Kind();
                        switch (k) {
                            case 110: {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    void ((td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                        named_time.TimeDurationValueOperations.$wrap(0n));
                                }
                                return void 0;
                                break;
                            }
                            case 34: {
                                if (!stringify) {
                                    break;
                                }
                                val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                                {
                                    let err__shadow_1: GoInterface | undefined = durationArshaler.$go$private$json$unmarshal(u, val.$value);
                                    if (!(err__shadow_1 === undefined)) {
                                        return newUnmarshalErrorAfter(dec, t, err__shadow_1);
                                    }
                                }
                                void ((td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    u.td);
                                return void 0;
                                break;
                            }
                            case 48: {
                                if (stringify) {
                                    break;
                                }
                                {
                                    let err__shadow_1: GoInterface | undefined = durationArshaler.$go$private$json$unmarshal(u, val.$value);
                                    if (!(err__shadow_1 === undefined)) {
                                        return newUnmarshalErrorAfter(dec, t, err__shadow_1);
                                    }
                                }
                                void ((td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    u.td);
                                return void 0;
                                break;
                            }
                        }
                    }
                    return newUnmarshalErrorAfter(dec, t, void 0);
                };
                break;
            }
            case 1: {
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.nonDefault = true;
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                    let err: GoInterface | undefined = void 0;
                    let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    let m = timeArshaler.$zero();
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                        if (!timeArshaler.$go$private$json$initFormat(m, ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format)) {
                            return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
                        }
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !timeArshaler.$go$private$json$isNumeric(m) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                    }
                    const __gotots_store_1 = m;
                    const __gotots_results_3 = (($value: $goInterface$Interface_void | undefined): [
                        time__from_gostdlib.Time,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$Named_time$Time.$is($value)) {
                            return [named_time.TimeOperations.$zero(), false];
                        }
                        return [$value.$go$value, true];
                    })(addressableValue.$storageOf(va).Value.$unbox());
                    __gotots_store_1.tt = __gotots_results_3[0];
                    let k = stringOrNumberKind(!timeArshaler.$go$private$json$isNumeric(m) || ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n)));
                    {
                        const __gotots_receiver_3 = xe;
                        const __gotots_argument_9 = k;
                        const __gotots_argument_10 = !timeArshaler.$go$private$json$hasCustomFormat(m);
                        const __gotots_receiver_2 = m;
                        const __gotots_argument_11 = ($argument0: RuntimeSlice<uint8>): [
                            RuntimeSlice<uint8>,
                            GoInterface | undefined
                        ] => {
                            return timeArshaler.$go$private$json$appendMarshal(__gotots_receiver_2, $argument0);
                        };
                        let err__shadow_1: GoInterface | undefined = encoderState__from_jsontext.AppendRaw(__gotots_receiver_3, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                        if (!(err__shadow_1 === undefined)) {
                            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                                const __gotots_callee_2 = $state__internal.NewMarshalerError;
                                const __gotots_argument_12 = addressableValue.$storageOf(va).Value.Addr().Interface();
                                const __gotots_argument_13 = err__shadow_1;
                                const __gotots_argument_14 = "MarshalJSON";
                                return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
                            }
                            if (!isSyntacticError(err__shadow_1) && !__go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err__shadow_1)) {
                                err__shadow_1 = newMarshalErrorBefore(enc, t, err__shadow_1);
                            }
                            return err__shadow_1;
                        }
                    }
                    return void 0;
                };
                ((fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<arshaler>).value.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                    let err: GoInterface | undefined = void 0;
                    let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
                    let u = timeArshaler.$zero();
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                        if (!timeArshaler.$go$private$json$initFormat(u, ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format)) {
                            return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
                        }
                    }
                    else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ParseTimeWithLooseRFC3339$constant__from_jsonflags())) {
                        u.looseRFC3339 = true;
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !timeArshaler.$go$private$json$isNumeric(u) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                        return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
                    }
                    let stringify = !timeArshaler.$go$private$json$isNumeric(u) || ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
                    let flags = new ValueFlags__from_jsonwire(0);
                    const flags$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next2 => flags = flags$next2);
                    const __gotots_results_4 = (($value: $goInterface$Interface_void | undefined): [
                        tsonicTypeScriptRuntime.Location<time__from_gostdlib.Time> | undefined,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$PointerTo_Named_time$Time.$is($value)) {
                            return [void 0, false];
                        }
                        return [$value.$go$value, true];
                    })(addressableValue.$storageOf(va).Value.Addr().$unbox());
                    let tt: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Time> | undefined = __gotots_results_4[0];
                    const __gotots_results_5 = decoderState__from_jsontext.ReadValue(xd, flags$location2);
                    let val: Value__from_jsontext = __gotots_results_5[0];
                    err = __gotots_results_5[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                    {
                        let k = val.Kind();
                        switch (k) {
                            case 110: {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    const __gotots_store_2 = (tt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_struct_0 = named_time.TimeOperations.$zero();
                                    void (__gotots_store_2.value =
                                        __gotots_struct_0);
                                }
                                return void 0;
                                break;
                            }
                            case 34: {
                                if (!stringify) {
                                    break;
                                }
                                val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                                {
                                    let err__shadow_1: GoInterface | undefined = timeArshaler.$go$private$json$unmarshal(u, val.$value);
                                    if (!(err__shadow_1 === undefined)) {
                                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                                            return err__shadow_1;
                                        }
                                        return newUnmarshalErrorAfter(dec, t, err__shadow_1);
                                    }
                                }
                                void ((tt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    named_time.TimeOperations.$copy(u.tt));
                                return void 0;
                                break;
                            }
                            case 48: {
                                if (stringify) {
                                    break;
                                }
                                {
                                    let err__shadow_1: GoInterface | undefined = timeArshaler.$go$private$json$unmarshal(u, val.$value);
                                    if (!(err__shadow_1 === undefined)) {
                                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                                            return err__shadow_1;
                                        }
                                        return newUnmarshalErrorAfter(dec, t, err__shadow_1);
                                    }
                                }
                                void ((tt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    named_time.TimeOperations.$copy(u.tt));
                                return void 0;
                                break;
                            }
                        }
                    }
                    return newUnmarshalErrorAfter(dec, t, void 0);
                };
                break;
            }
        }
    }
    return fncs;
}
export class durationArshaler {
    declare private readonly $goType: void;
    public constructor(public td: time__from_gostdlib.Duration, public base: uint64) {
    }
    static $zero(): durationArshaler {
        return new durationArshaler(named_time.TimeDurationValueOperations.$wrap(0n), 0n);
    }
    declare private readonly then?: never;
    static $go$private$json$appendMarshal(a: durationArshaler | undefined, b: RuntimeSlice<uint8>): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        switch ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base) {
            case 0n: {
                const __gotots_slice_build_0 = b;
                const __gotots_slice_build_1 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).td.String();
                const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                }
                const __gotots_results_6 = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                const __gotots_results_7 = void 0;
                return [__gotots_results_6, __gotots_results_7];
                break;
            }
            case 8601n: {
                return [appendDurationISO8601(b, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).td), void 0];
                break;
            }
            default: {
                return [appendDurationBase10(b, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).td, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base), void 0];
                break;
            }
        }
    }
    static $go$private$json$initFormat(a: durationArshaler | undefined, format: gostring): bool {
        let ok: bool = false;
        switch (format) {
            case "units": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 0n;
                break;
            }
            case "sec": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000000000n;
                break;
            }
            case "milli": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000000n;
                break;
            }
            case "micro": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000n;
                break;
            }
            case "nano": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1n;
                break;
            }
            case "iso8601": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 8601n;
                break;
            }
            default: {
                return false;
                break;
            }
        }
        return true;
    }
    static $go$private$json$isNumeric(a: durationArshaler | undefined): bool {
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base !== 0n && (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base !== 8601n;
    }
    static $go$private$json$unmarshal(a: durationArshaler | undefined, b: RuntimeSlice<uint8>): GoInterface | undefined {
        let err: GoInterface | undefined = void 0;
        switch ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base) {
            case 0n: {
                const __gotots_store_3 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_conversion_0 = b;
                let __gotots_conversion_1 = "";
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                }
                const __gotots_argument_15 = __gotots_conversion_1;
                const __gotots_results_8 = time__from_gostdlib.ParseDuration(__gotots_argument_15);
                const __gotots_results_9 = [__gotots_results_8[0], GoProviderInterfaceBridge.$from(__gotots_results_8[1])] satisfies [
                    time__from_gostdlib.Duration,
                    GoInterface | undefined
                ];
                __gotots_store_3.td = __gotots_results_9[0];
                err = __gotots_results_9[1];
                break;
            }
            case 8601n: {
                const __gotots_store_4 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_10 = parseDurationISO8601(b);
                __gotots_store_4.td = __gotots_results_10[0];
                err = __gotots_results_10[1];
                break;
            }
            default: {
                const __gotots_store_5 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_11 = parseDurationBase10(b, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base);
                __gotots_store_5.td = __gotots_results_11[0];
                err = __gotots_results_11[1];
                break;
            }
        }
        return err;
    }
}
export class timeArshaler {
    declare private readonly $goType: void;
    public constructor(public tt: time__from_gostdlib.Time, public base: uint64, public format: gostring, public looseRFC3339: bool) {
    }
    static $zero(): timeArshaler {
        return new timeArshaler(named_time.TimeOperations.$zero(), 0n, "", false);
    }
    declare private readonly then?: never;
    static $go$private$json$appendMarshal(a: timeArshaler | undefined, b: RuntimeSlice<uint8>): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        switch ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base) {
            case 0n: {
                let format = Or$string(RuntimeSlice.literal<gostring>([(a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format, RFC3339Nano$string__from_time]));
                let n0 = b.length;
                b = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tt.AppendFormat(b, format);
                {
                    let b__shadow_1 = b.slice(n0, null, null);
                    __gotots_control_target_0: {
                        if (b__shadow_1.get(4) !== 45) {
                            return [b__shadow_1, GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("year outside of range [0,9999]"))];
                        }
                        else if (b__shadow_1.get(b__shadow_1.length - 1) !== 90) {
                            let c = b__shadow_1.get(b__shadow_1.length - 6);
                            if ((48 <= c && c <= 57) || parseDec2(b__shadow_1.slice(b__shadow_1.length - 5, null, null)) >= 24) {
                                return [b__shadow_1, GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("timezone hour outside of range [0,23]"))];
                            }
                        }
                    }
                }
                return [b, void 0];
                break;
            }
            case MaxUint$uint64__from_math__package_1: {
                return [(a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tt.AppendFormat(b, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format), void 0];
                break;
            }
            default: {
                return [appendTimeUnix(b, named_time.TimeOperations.$copy((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tt), (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base), void 0];
                break;
            }
        }
    }
    static $go$private$json$hasCustomFormat(a: timeArshaler | undefined): bool {
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base === MaxUint$uint64__from_math__package_1;
    }
    static $go$private$json$initFormat(a: timeArshaler | undefined, format: gostring): bool {
        if (format.length === 0) {
            return false;
        }
        (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = MaxUint$uint64__from_math__package_1;
        {
            let c = goStringIndex(format, 0);
            if (!(97 <= c && c <= 122) && !(65 <= c && c <= 90)) {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = format;
                return true;
            }
        }
        switch (format) {
            case "ANSIC": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = ANSIC$string__from_time;
                break;
            }
            case "UnixDate": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = UnixDate$string__from_time;
                break;
            }
            case "RubyDate": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RubyDate$string__from_time;
                break;
            }
            case "RFC822": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC822$string__from_time;
                break;
            }
            case "RFC822Z": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC822Z$string__from_time;
                break;
            }
            case "RFC850": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC850$string__from_time;
                break;
            }
            case "RFC1123": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC1123$string__from_time;
                break;
            }
            case "RFC1123Z": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC1123Z$string__from_time;
                break;
            }
            case "RFC3339": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 0n;
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC3339$string__from_time;
                break;
            }
            case "RFC3339Nano": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 0n;
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = RFC3339Nano$string__from_time;
                break;
            }
            case "Kitchen": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = Kitchen$string__from_time;
                break;
            }
            case "Stamp": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = Stamp$string__from_time;
                break;
            }
            case "StampMilli": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = StampMilli$string__from_time;
                break;
            }
            case "StampMicro": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = StampMicro$string__from_time;
                break;
            }
            case "StampNano": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = StampNano$string__from_time;
                break;
            }
            case "DateTime": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = DateTime$string__from_time;
                break;
            }
            case "DateOnly": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = DateOnly$string__from_time;
                break;
            }
            case "TimeOnly": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = TimeOnly$string__from_time;
                break;
            }
            case "unix": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1n;
                break;
            }
            case "unixmilli": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000n;
                break;
            }
            case "unixmicro": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000000n;
                break;
            }
            case "unixnano": {
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base = 1000000000n;
                break;
            }
            default: {
                if (strings__from_gostdlib.TrimFunc(format, isLetterOrDigit) === "") {
                    return false;
                }
                (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format = format;
                break;
            }
        }
        return true;
    }
    static $go$private$json$isNumeric(a: timeArshaler | undefined): bool {
        return globalThis.Number(BigInt.asIntN(64, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base)) > 0;
    }
    static $go$private$json$unmarshal(a: timeArshaler | undefined, b: RuntimeSlice<uint8>): GoInterface | undefined {
        let err: GoInterface | undefined = void 0;
        switch ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base) {
            case 0n: {
                {
                    let err__shadow_1: GoInterface | undefined = GoProviderInterfaceBridge.$from(time__from_gostdlib.Time.UnmarshalText((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tt, b));
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                let newParseError: (($0: gostring, $1: gostring, $2: gostring, $3: gostring, $4: gostring) => GoInterface | undefined) | undefined = (layout: gostring, value: gostring, layoutElem: gostring, valueElem: gostring, message: gostring): GoInterface | undefined => {
                    return new $goInterfaceAdapter$PointerTo_Named_time$ParseError(tsonicTypeScriptRuntime.location<time__from_gostdlib.ParseError>(named_time.TimeParseErrorOperations.$make(layout, value, layoutElem, valueElem, message)));
                };
                __gotots_control_target_1: {
                    if ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).looseRFC3339) {
                        return void 0;
                    }
                    else if (b.get(12) === 58) {
                        const __gotots_callee_4 = newParseError;
                        const __gotots_argument_16 = RFC3339$string__from_time;
                        const __gotots_conversion_3 = b;
                        let __gotots_conversion_4 = "";
                        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                        }
                        const __gotots_argument_17 = __gotots_conversion_4;
                        const __gotots_argument_18 = "15";
                        const __gotots_conversion_6 = b.slice(11, null, null).slice(0, 1, null);
                        let __gotots_conversion_7 = "";
                        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                        }
                        const __gotots_argument_19 = __gotots_conversion_7;
                        const __gotots_argument_20 = "";
                        return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
                    }
                    else if (b.get(19) === 44) {
                        const __gotots_callee_5 = newParseError;
                        const __gotots_argument_21 = RFC3339$string__from_time;
                        const __gotots_conversion_9 = b;
                        let __gotots_conversion_10 = "";
                        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                        }
                        const __gotots_argument_22 = __gotots_conversion_10;
                        const __gotots_argument_23 = ".";
                        const __gotots_argument_24 = ",";
                        const __gotots_argument_25 = "";
                        return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
                    }
                    else if (b.get(b.length - 1) !== 90) {
                        __gotots_control_target_2: {
                            if (parseDec2(b.slice(b.length - 5, null, null)) >= 24) {
                                const __gotots_callee_6 = newParseError;
                                const __gotots_argument_26 = RFC3339$string__from_time;
                                const __gotots_conversion_12 = b;
                                let __gotots_conversion_13 = "";
                                for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
                                    __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
                                }
                                const __gotots_argument_27 = __gotots_conversion_13;
                                const __gotots_argument_28 = "Z07:00";
                                const __gotots_conversion_15 = b.slice(b.length - 6, null, null);
                                let __gotots_conversion_16 = "";
                                for (let __gotots_conversion_17 = 0; __gotots_conversion_17 < __gotots_conversion_15.length; __gotots_conversion_17++) {
                                    __gotots_conversion_16 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_15.get(__gotots_conversion_17)));
                                }
                                const __gotots_argument_29 = __gotots_conversion_16;
                                const __gotots_argument_30 = ": timezone hour out of range";
                                return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
                            }
                            else if (parseDec2(b.slice(b.length - 2, null, null)) >= 60) {
                                const __gotots_callee_7 = newParseError;
                                const __gotots_argument_31 = RFC3339$string__from_time;
                                const __gotots_conversion_18 = b;
                                let __gotots_conversion_19 = "";
                                for (let __gotots_conversion_20 = 0; __gotots_conversion_20 < __gotots_conversion_18.length; __gotots_conversion_20++) {
                                    __gotots_conversion_19 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_18.get(__gotots_conversion_20)));
                                }
                                const __gotots_argument_32 = __gotots_conversion_19;
                                const __gotots_argument_33 = "Z07:00";
                                const __gotots_conversion_21 = b.slice(b.length - 6, null, null);
                                let __gotots_conversion_22 = "";
                                for (let __gotots_conversion_23 = 0; __gotots_conversion_23 < __gotots_conversion_21.length; __gotots_conversion_23++) {
                                    __gotots_conversion_22 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_21.get(__gotots_conversion_23)));
                                }
                                const __gotots_argument_34 = __gotots_conversion_22;
                                const __gotots_argument_35 = ": timezone minute out of range";
                                return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                            }
                        }
                    }
                }
                return void 0;
                break;
            }
            case MaxUint$uint64__from_math__package_1: {
                const __gotots_store_6 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_36 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).format;
                const __gotots_conversion_24 = b;
                let __gotots_conversion_25 = "";
                for (let __gotots_conversion_26 = 0; __gotots_conversion_26 < __gotots_conversion_24.length; __gotots_conversion_26++) {
                    __gotots_conversion_25 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_24.get(__gotots_conversion_26)));
                }
                const __gotots_argument_37 = __gotots_conversion_25;
                const __gotots_results_12 = time__from_gostdlib.Parse(__gotots_argument_36, __gotots_argument_37);
                const __gotots_results_13 = [__gotots_results_12[0], GoProviderInterfaceBridge.$from(__gotots_results_12[1])] satisfies [
                    time__from_gostdlib.Time,
                    GoInterface | undefined
                ];
                __gotots_store_6.tt = __gotots_results_13[0];
                err = __gotots_results_13[1];
                return err;
                break;
            }
            default: {
                const __gotots_store_7 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_14 = parseTimeUnix(b, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base);
                __gotots_store_7.tt = __gotots_results_14[0];
                err = __gotots_results_14[1];
                return err;
                break;
            }
        }
    }
}
export function appendDurationBase10(b: RuntimeSlice<uint8>, d: time__from_gostdlib.Duration, pow10: uint64): RuntimeSlice<uint8> {
    const __gotots_results_22 = mayAppendDurationSign(b, d);
    b = __gotots_results_22[0];
    let n = __gotots_results_22[1];
    const __gotots_results_24 = bits__from_gostdlib.Div64(0n, n, pow10);
    let whole = __gotots_results_24[0];
    let frac = __gotots_results_24[1];
    b = strconv__from_gostdlib.AppendUint(b, whole, BigInt.asIntN(64, goNumberToBigInt(10)));
    return appendFracBase10(b, frac, pow10);
}
export function parseDurationBase10(b: RuntimeSlice<uint8>, pow10: uint64): [
    time__from_gostdlib.Duration,
    GoInterface | undefined
] {
    const __gotots_results_40 = consumeSign(b, false);
    let suffix = __gotots_results_40[0];
    let neg = __gotots_results_40[1];
    const __gotots_results_41 = bytesCutByte(suffix, 46, true);
    let wholeBytes = __gotots_results_41[0];
    let fracBytes = __gotots_results_41[1];
    const __gotots_results_42 = ParseUint__from_jsonwire(wholeBytes);
    let whole = __gotots_results_42[0];
    let okWhole = __gotots_results_42[1];
    const __gotots_results_43 = parseFracBase10(fracBytes, pow10);
    let frac = __gotots_results_43[0];
    let okFrac = __gotots_results_43[1];
    const __gotots_results_45 = bits__from_gostdlib.Mul64(whole, pow10);
    let hi = __gotots_results_45[0];
    let lo = __gotots_results_45[1];
    const __gotots_results_47 = bits__from_gostdlib.Add64(lo, frac, 0n);
    let sum = __gotots_results_47[0];
    let co = __gotots_results_47[1];
    {
        let d = mayApplyDurationSign(sum, neg);
        __gotots_control_target_4: {
            if ((!okWhole && whole !== MaxUint64$uint64__from_math__package_1) || !okFrac) {
                return [named_time.TimeDurationValueOperations.$wrap(0n), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid duration %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax)])))];
            }
            else if (!okWhole || hi > 0n || co > 0n || neg !== (named_time.TimeDurationValueOperations.$project(d) < 0n)) {
                return [named_time.TimeDurationValueOperations.$wrap(0n), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid duration %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange)])))];
            }
            else {
                return [d, void 0];
            }
        }
    }
}
export function appendDurationISO8601(b: RuntimeSlice<uint8>, d: time__from_gostdlib.Duration): RuntimeSlice<uint8> {
    if (named_time.TimeDurationValueOperations.$project(d) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n))) {
        const __gotots_slice_build_4 = b;
        const __gotots_slice_build_5 = "PT0S";
        const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
            __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
        }
        return goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
    }
    const __gotots_results_15 = mayAppendDurationSign(b, d);
    b = __gotots_results_15[0];
    let n = __gotots_results_15[1];
    const __gotots_slice_build_8 = b;
    const __gotots_slice_build_9 = "PT";
    const __gotots_slice_build_10 = goSliceAllocate<uint8>(__gotots_slice_build_9.length, null);
    for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_9.length; __gotots_slice_build_11++) {
        __gotots_slice_build_10.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
    }
    b = goSliceAppendSlice<uint8>(__gotots_slice_build_8, __gotots_slice_build_10, 0);
    const __gotots_results_17 = bits__from_gostdlib.Div64(0n, n, 1000000000n);
    n = __gotots_results_17[0];
    let nsec = __gotots_results_17[1];
    const __gotots_results_19 = bits__from_gostdlib.Div64(0n, n, 60n);
    n = __gotots_results_19[0];
    let sec = __gotots_results_19[1];
    const __gotots_results_21 = bits__from_gostdlib.Div64(0n, n, 60n);
    let hour = __gotots_results_21[0];
    let min = __gotots_results_21[1];
    if (hour > 0n) {
        b = strconv__from_gostdlib.AppendUint(b, hour, BigInt.asIntN(64, goNumberToBigInt(10))).append(0, [72]);
    }
    if (min > 0n) {
        b = strconv__from_gostdlib.AppendUint(b, min, BigInt.asIntN(64, goNumberToBigInt(10))).append(0, [77]);
    }
    if (sec > 0n || nsec > 0n) {
        b = appendFracBase10(strconv__from_gostdlib.AppendUint(b, sec, BigInt.asIntN(64, goNumberToBigInt(10))), nsec, 1000000000n).append(0, [83]);
    }
    return b;
}
export function parseDurationISO8601(b: RuntimeSlice<uint8>): [
    time__from_gostdlib.Duration,
    GoInterface | undefined
] {
    let invalid = false, overflow = false, inaccurate = false, sawFrac = false;
    let sumNanos = 0n, n = 0n, co = 0n;
    let cutBytes: (($0: RuntimeSlice<uint8>, $1: uint8, $2: uint8) => [
        RuntimeSlice<uint8>,
        RuntimeSlice<uint8>,
        bool
    ]) | undefined = (b__shadow_1: RuntimeSlice<uint8>, c0: uint8, c1: uint8): [
        RuntimeSlice<uint8>,
        RuntimeSlice<uint8>,
        bool
    ] => {
        let prefix__shadow_1: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
        let suffix__shadow_1: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
        let ok: bool = false;
        const __gotots_range_0 = b__shadow_1;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let c = __gotots_range_value_1;
            if (c === c0 || c === c1) {
                return [b__shadow_1.slice(0, i, null), b__shadow_1.slice(i + 1, null, null), true];
            }
        }
        return [b__shadow_1, RuntimeSlice.nil<uint8>(), false];
    };
    let mayParseUnit: (($0: RuntimeSlice<uint8>, $1: uint8, $2: uint8, $3: time__from_gostdlib.Duration) => RuntimeSlice<uint8>) | undefined = (b__shadow_1: RuntimeSlice<uint8>, desHi: uint8, desLo: uint8, unit: time__from_gostdlib.Duration): RuntimeSlice<uint8> => {
        const __gotots_callee_8 = cutBytes;
        const __gotots_argument_38 = b__shadow_1;
        const __gotots_argument_39 = desHi;
        const __gotots_argument_40 = desLo;
        const __gotots_results_25 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
        let __go_number = __gotots_results_25[0];
        let suffix__shadow_1 = __gotots_results_25[1];
        let ok = __gotots_results_25[2];
        if (!ok || sawFrac) {
            return b__shadow_1;
        }
        const __gotots_callee_9 = cutBytes;
        const __gotots_argument_41 = __go_number;
        const __gotots_argument_42 = 46;
        const __gotots_argument_43 = 44;
        const __gotots_results_26 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
        let whole = __gotots_results_26[0];
        let frac = __gotots_results_26[1];
        ok = __gotots_results_26[2];
        if (ok) {
            sawFrac = true;
            invalid = invalid || frac.length === 0 || named_time.TimeDurationValueOperations.$project(unit) > named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Hour);
            if (named_time.TimeDurationValueOperations.$project(unit) === named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Second)) {
                const __gotots_results_27 = parsePaddedBase10(frac, 1000000000n);
                n = __gotots_results_27[0];
                ok = __gotots_results_27[1];
                invalid = invalid || !ok;
            }
            else {
                const __gotots_binary_operand_0 = "0.";
                const __gotots_conversion_27 = frac;
                let __gotots_conversion_28 = "";
                for (let __gotots_conversion_29 = 0; __gotots_conversion_29 < __gotots_conversion_27.length; __gotots_conversion_29++) {
                    __gotots_conversion_28 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_27.get(__gotots_conversion_29)));
                }
                const __gotots_binary_operand_1 = __gotots_conversion_28;
                const __gotots_argument_44 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
                const __gotots_argument_45 = 64;
                const __gotots_results_28 = strconv__from_gostdlib.ParseFloat(__gotots_argument_44, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_45)));
                const __gotots_results_29 = [__gotots_results_28[0], GoProviderInterfaceBridge.$from(__gotots_results_28[1])] satisfies [
                    float64,
                    GoInterface | undefined
                ];
                let f = __gotots_results_29[0];
                let err: GoInterface | undefined = __gotots_results_29[1];
                invalid = invalid || !(err === undefined) || bytes__from_gostdlib.Trim(frac.slice(1, null, null), "0123456789").length > 0;
                n = BigInt.asUintN(64, goNumberToBigInt(math__from_gostdlib.Round(f * globalThis.Number(named_time.TimeDurationValueOperations.$project(unit)))));
            }
            const __gotots_results_31 = bits__from_gostdlib.Add64(sumNanos, n, 0n);
            sumNanos = __gotots_results_31[0];
            co = __gotots_results_31[1];
            overflow = overflow || co > 0n;
        }
        for (; whole.length > 1 && whole.get(0) === 48;) {
            whole = whole.slice(1, null, null);
        }
        const __gotots_results_32 = ParseUint__from_jsonwire(whole);
        let n__shadow_1 = __gotots_results_32[0];
        ok = __gotots_results_32[1];
        const __gotots_results_34 = bits__from_gostdlib.Mul64(n__shadow_1, BigInt.asUintN(64, named_time.TimeDurationValueOperations.$project(unit)));
        let hi = __gotots_results_34[0];
        let lo = __gotots_results_34[1];
        const __gotots_results_36 = bits__from_gostdlib.Add64(sumNanos, lo, 0n);
        sumNanos = __gotots_results_36[0];
        co = __gotots_results_36[1];
        invalid = invalid || (!ok && n__shadow_1 !== MaxUint64$uint64__from_math__package_1);
        overflow = overflow || (!ok && n__shadow_1 === MaxUint64$uint64__from_math__package_1) || hi > 0n || co > 0n;
        inaccurate = inaccurate || named_time.TimeDurationValueOperations.$project(unit) > named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Hour);
        return suffix__shadow_1;
    };
    const __gotots_results_37 = consumeSign(b, true);
    let suffix = __gotots_results_37[0];
    let neg = __gotots_results_37[1];
    const __gotots_callee_10 = cutBytes;
    const __gotots_argument_46 = suffix;
    const __gotots_argument_47 = 80;
    const __gotots_argument_48 = 112;
    const __gotots_results_38 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
    let prefix = __gotots_results_38[0];
    suffix = __gotots_results_38[1];
    let okP = __gotots_results_38[2];
    const __gotots_callee_11 = cutBytes;
    const __gotots_argument_49 = suffix;
    const __gotots_argument_50 = 84;
    const __gotots_argument_51 = 116;
    const __gotots_results_39 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
    let durDate = __gotots_results_39[0];
    let durTime = __gotots_results_39[1];
    let okT = __gotots_results_39[2];
    invalid = invalid || prefix.length > 0 || !okP || (okT && durTime.length === 0) || durDate.length + durTime.length === 0;
    if (durDate.length > 0) {
        const __gotots_callee_12 = mayParseUnit;
        const __gotots_argument_52 = durDate;
        const __gotots_argument_53 = 89;
        const __gotots_argument_54 = 121;
        const __gotots_argument_55 = named_time.TimeDurationValueOperations.$wrap(31556952000000000n);
        durDate = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
        const __gotots_callee_13 = mayParseUnit;
        const __gotots_argument_56 = durDate;
        const __gotots_argument_57 = 77;
        const __gotots_argument_58 = 109;
        const __gotots_argument_59 = named_time.TimeDurationValueOperations.$wrap(2629746000000000n);
        durDate = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59);
        const __gotots_callee_14 = mayParseUnit;
        const __gotots_argument_60 = durDate;
        const __gotots_argument_61 = 87;
        const __gotots_argument_62 = 119;
        const __gotots_argument_63 = named_time.TimeDurationValueOperations.$wrap(604800000000000n);
        durDate = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63);
        const __gotots_callee_15 = mayParseUnit;
        const __gotots_argument_64 = durDate;
        const __gotots_argument_65 = 68;
        const __gotots_argument_66 = 100;
        const __gotots_argument_67 = named_time.TimeDurationValueOperations.$wrap(86400000000000n);
        durDate = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
        invalid = invalid || durDate.length > 0;
    }
    if (durTime.length > 0) {
        const __gotots_callee_16 = mayParseUnit;
        const __gotots_argument_68 = durTime;
        const __gotots_argument_69 = 72;
        const __gotots_argument_70 = 104;
        const __gotots_argument_71 = named_time.TimeDurationValueOperations.$wrap(3600000000000n);
        durTime = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
        const __gotots_callee_17 = mayParseUnit;
        const __gotots_argument_72 = durTime;
        const __gotots_argument_73 = 77;
        const __gotots_argument_74 = 109;
        const __gotots_argument_75 = named_time.TimeDurationValueOperations.$wrap(60000000000n);
        durTime = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
        const __gotots_callee_18 = mayParseUnit;
        const __gotots_argument_76 = durTime;
        const __gotots_argument_77 = 83;
        const __gotots_argument_78 = 115;
        const __gotots_argument_79 = named_time.TimeDurationValueOperations.$wrap(1000000000n);
        durTime = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79);
        invalid = invalid || durTime.length > 0;
    }
    let d = mayApplyDurationSign(sumNanos, neg);
    overflow = overflow || (neg !== (named_time.TimeDurationValueOperations.$project(d) < 0n) && !(named_time.TimeDurationValueOperations.$project(d) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n))));
    __gotots_control_target_3: {
        if (invalid) {
            return [named_time.TimeDurationValueOperations.$wrap(0n), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid ISO 8601 duration %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax)])))];
        }
        else if (overflow) {
            return [named_time.TimeDurationValueOperations.$wrap(0n), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid ISO 8601 duration %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange)])))];
        }
        else if (inaccurate) {
            return [d, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid ISO 8601 duration %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), $state.errInaccurateDateUnits])))];
        }
        else {
            return [d, void 0];
        }
    }
}
export function mayAppendDurationSign(b: RuntimeSlice<uint8>, d: time__from_gostdlib.Duration): [
    RuntimeSlice<uint8>,
    uint64
] {
    if (named_time.TimeDurationValueOperations.$project(d) < 0n) {
        b = b.append(0, [45]);
        d = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(d) * -1n));
    }
    return [b, BigInt.asUintN(64, named_time.TimeDurationValueOperations.$project(d))];
}
export function mayApplyDurationSign(n: uint64, neg: bool): time__from_gostdlib.Duration {
    if (neg) {
        return named_time.TimeDurationValueOperations.$wrap(goInt64(-1n * named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(BigInt.asIntN(64, n)))));
    }
    else {
        return named_time.TimeDurationValueOperations.$wrap(goInt64(1n * named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(BigInt.asIntN(64, n)))));
    }
}
export function appendTimeUnix(b: RuntimeSlice<uint8>, t: time__from_gostdlib.Time, pow10: uint64): RuntimeSlice<uint8> {
    const __gotots_assign_0 = t.Unix();
    const __gotots_assign_1 = BigInt.asIntN(64, goNumberToBigInt(globalThis.Number(BigInt.asIntN(64, t.Nanosecond()))));
    let sec = __gotots_assign_0;
    let nsec = __gotots_assign_1;
    if (sec < 0n) {
        b = b.append(0, [45]);
        const __gotots_results_48 = negateSecNano(sec, nsec);
        sec = __gotots_results_48[0];
        nsec = __gotots_results_48[1];
    }
    __gotots_control_target_5: {
        if (pow10 === 1n) {
            b = strconv__from_gostdlib.AppendUint(b, BigInt.asUintN(64, sec), BigInt.asIntN(64, goNumberToBigInt(10)));
            return appendFracBase10(b, BigInt.asUintN(64, nsec), 1000000000n);
        }
        else if (BigInt.asUintN(64, sec) < 1000000000n) {
            b = strconv__from_gostdlib.AppendUint(b, goUint64(goUint64(BigInt.asUintN(64, sec) * pow10) + goUint64(goIntegerDivide(BigInt.asUintN(64, nsec), (goUint64(goIntegerDivide(1000000000n, pow10)))))), BigInt.asIntN(64, goNumberToBigInt(10)));
            return appendFracBase10(b, goUint64(goIntegerRemainder((goUint64(BigInt.asUintN(64, nsec) * pow10)), 1000000000n)), 1000000000n);
        }
        else {
            b = strconv__from_gostdlib.AppendUint(b, BigInt.asUintN(64, sec), BigInt.asIntN(64, goNumberToBigInt(10)));
            b = appendPaddedBase10(b, goUint64(goIntegerDivide(BigInt.asUintN(64, nsec), (goUint64(goIntegerDivide(1000000000n, pow10))))), pow10);
            return appendFracBase10(b, goUint64(goIntegerRemainder((goUint64(BigInt.asUintN(64, nsec) * pow10)), 1000000000n)), 1000000000n);
        }
    }
}
export function parseTimeUnix(b: RuntimeSlice<uint8>, pow10: uint64): [
    time__from_gostdlib.Time,
    GoInterface | undefined
] {
    const __gotots_results_49 = consumeSign(b, false);
    let suffix = __gotots_results_49[0];
    let neg = __gotots_results_49[1];
    const __gotots_results_50 = bytesCutByte(suffix, 46, true);
    let wholeBytes = __gotots_results_50[0];
    let fracBytes = __gotots_results_50[1];
    const __gotots_results_51 = ParseUint__from_jsonwire(wholeBytes);
    let whole = __gotots_results_51[0];
    let okWhole = __gotots_results_51[1];
    const __gotots_results_52 = parseFracBase10(fracBytes, goUint64(goIntegerDivide(1000000000n, pow10)));
    let frac = __gotots_results_52[0];
    let okFrac = __gotots_results_52[1];
    let sec = 0n, nsec = 0n;
    __gotots_control_target_6: {
        if (pow10 === 1n) {
            sec = BigInt.asIntN(64, whole);
            nsec = BigInt.asIntN(64, frac);
        }
        else if (okWhole) {
            sec = BigInt.asIntN(64, goUint64(goIntegerDivide(whole, pow10)));
            nsec = BigInt.asIntN(64, goUint64(goUint64((goUint64(goIntegerRemainder(whole, pow10))) * (goUint64(goIntegerDivide(1000000000n, pow10)))) + frac));
        }
        else if (!okWhole && whole === MaxUint64$uint64__from_math__package_1) {
            let width = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(math__from_gostdlib.Log10(globalThis.Number(pow10)))));
            const __gotots_results_53 = ParseUint__from_jsonwire(wholeBytes.slice(0, wholeBytes.length - width, null));
            whole = __gotots_results_53[0];
            okWhole = __gotots_results_53[1];
            const __gotots_results_54 = parsePaddedBase10(wholeBytes.slice(wholeBytes.length - width, null, null), pow10);
            let mid = __gotots_results_54[0];
            sec = BigInt.asIntN(64, whole);
            nsec = BigInt.asIntN(64, goUint64(goUint64(mid * (goUint64(goIntegerDivide(1000000000n, pow10)))) + frac));
        }
    }
    if (neg) {
        const __gotots_results_55 = negateSecNano(sec, nsec);
        sec = __gotots_results_55[0];
        nsec = __gotots_results_55[1];
    }
    {
        let t = time__from_gostdlib.Unix(sec, nsec).UTC();
        __gotots_control_target_7: {
            if ((!okWhole && whole !== MaxUint64$uint64__from_math__package_1) || !okFrac) {
                const __gotots_struct_1 = named_time.TimeOperations.$zero();
                const __gotots_results_56 = __gotots_struct_1;
                const __gotots_results_57 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid time %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax)])));
                return [__gotots_results_56, __gotots_results_57];
            }
            else if (!okWhole || neg !== (t.Unix() < 0n)) {
                const __gotots_struct_2 = named_time.TimeOperations.$zero();
                const __gotots_results_58 = __gotots_struct_2;
                const __gotots_results_59 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid time %q: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(b), GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange)])));
                return [__gotots_results_58, __gotots_results_59];
            }
            else {
                return [named_time.TimeOperations.$copy(t), void 0];
            }
        }
    }
}
export function negateSecNano(sec: int64, nsec: int64): [
    int64,
    int64
] {
    sec = goInt64(~sec);
    nsec = goInt64(goInt64(-nsec) + 1000000000n);
    sec = goInt64(sec + goInt64(goIntegerDivide(nsec, 1000000000n)));
    nsec = goInt64(goIntegerRemainder(nsec, 1000000000n));
    return [sec, nsec];
}
export function appendFracBase10(b: RuntimeSlice<uint8>, n: uint64, max10: uint64): RuntimeSlice<uint8> {
    if (n === 0n) {
        return b;
    }
    return bytes__from_gostdlib.TrimRight(appendPaddedBase10(b.append(0, [46]), n, max10), "0");
}
export function parseFracBase10(b: RuntimeSlice<uint8>, max10: uint64): [
    uint64,
    bool
] {
    let n: uint64 = 0n;
    let ok: bool = false;
    __gotots_control_target_8: {
        if (b.length === 0) {
            return [0n, true];
        }
        else if (b.length < 2 || b.get(0) !== 46) {
            return [0n, false];
        }
    }
    return parsePaddedBase10(b.slice(1, null, null), max10);
}
export function appendPaddedBase10(b: RuntimeSlice<uint8>, n: uint64, max10: uint64): RuntimeSlice<uint8> {
    if (n < goUint64(goIntegerDivide(max10, 10n))) {
        let i = b.length;
        b = strconv__from_gostdlib.AppendUint(b, goUint64(n + goUint64(goIntegerDivide(max10, 10n))), BigInt.asIntN(64, goNumberToBigInt(10)));
        const __gotots_store_8 = b;
        const __gotots_store_9 = i;
        __gotots_store_8.set(__gotots_store_9, __gotots_store_8.get(__gotots_store_9) - 1);
        return b;
    }
    return strconv__from_gostdlib.AppendUint(b, n, BigInt.asIntN(64, goNumberToBigInt(10)));
}
export function parsePaddedBase10(b: RuntimeSlice<uint8>, max10: uint64): [
    uint64,
    bool
] {
    let n: uint64 = 0n;
    let ok: bool = false;
    let pow10 = 1n;
    for (; pow10 < max10;) {
        n = goUint64(n * 10n);
        if (b.length > 0) {
            if (b.get(0) < 48 || 57 < b.get(0)) {
                return [n, false];
            }
            n = goUint64(n + BigInt.asUintN(64, goNumberToBigInt(b.get(0) - 48)));
            b = b.slice(1, null, null);
        }
        pow10 = goUint64(pow10 * 10n);
    }
    if (b.length > 0 && bytes__from_gostdlib.TrimRight(b, "0123456789").length > 0) {
        return [n, false];
    }
    return [n, true];
}
export function consumeSign(b: RuntimeSlice<uint8>, allowPlus: bool): [
    RuntimeSlice<uint8>,
    bool
] {
    if (b.length > 0) {
        if (b.get(0) === 45) {
            return [b.slice(1, null, null), true];
        }
        else if (b.get(0) === 43 && allowPlus) {
            return [b.slice(1, null, null), false];
        }
    }
    return [b, false];
}
export function bytesCutByte(b: RuntimeSlice<uint8>, c: uint8, include: bool): [
    RuntimeSlice<uint8>,
    RuntimeSlice<uint8>
] {
    {
        let i = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexByte(b, c)));
        if (i >= 0) {
            if (include) {
                return [b.slice(0, i, null), b.slice(i, null, null)];
            }
            return [b.slice(0, i, null), b.slice(i + 1, null, null)];
        }
    }
    return [b, RuntimeSlice.nil<uint8>()];
}
export function parseDec2(b: RuntimeSlice<uint8>): uint8 {
    if (b.length < 2) {
        return 0;
    }
    return 10 * (b.get(0) - 48) + (b.get(1) - 48);
}
