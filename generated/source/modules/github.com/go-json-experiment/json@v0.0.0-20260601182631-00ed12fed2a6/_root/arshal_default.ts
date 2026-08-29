import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { Kind as Kind__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../support/provider-interface-bridges.js";
import type { addressableValue$Storage as addressableValue__from_json$Storage, stringSlice } from "./arshal.js";
import type { Marshaler, MarshalerTo } from "./arshal_methods.js";
import type { SemanticError } from "./errors.js";
import type { structField$Storage as structField__from_json$Storage } from "./fields.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int, int64, uint, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { AllowDuplicateNames$constant as AllowDuplicateNames$constant__from_jsonflags, AllowInvalidUTF8$constant as AllowInvalidUTF8$constant__from_jsonflags, AnyWhitespace$constant as AnyWhitespace$constant__from_jsonflags, Bools as Bools__from_jsonflags, CallMethodsWithLegacySemantics$constant as CallMethodsWithLegacySemantics$constant__from_jsonflags, Deterministic$constant as Deterministic$constant__from_jsonflags, Flags as Flags__from_jsonflags, FormatByteArrayAsArray$constant as FormatByteArrayAsArray$constant__from_jsonflags, FormatBytesWithLegacySemantics$constant as FormatBytesWithLegacySemantics$constant__from_jsonflags, FormatNilMapAsNull$constant as FormatNilMapAsNull$constant__from_jsonflags, FormatNilSliceAsNull$constant as FormatNilSliceAsNull$constant__from_jsonflags, FormatTag$constant as FormatTag$constant__from_jsonflags, MergeWithLegacySemantics$constant as MergeWithLegacySemantics$constant__from_jsonflags, Multiline$constant as Multiline$constant__from_jsonflags, OmitEmptyWithLegacySemantics$constant as OmitEmptyWithLegacySemantics$constant__from_jsonflags, OmitZeroStructFields$constant as OmitZeroStructFields$constant__from_jsonflags, ParseBytesWithLooseRFC4648$constant as ParseBytesWithLooseRFC4648$constant__from_jsonflags, RejectUnknownMembers$constant as RejectUnknownMembers$constant__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags, SpaceAfterComma$constant as SpaceAfterComma$constant__from_jsonflags, StringTag$constant as StringTag$constant__from_jsonflags, StringifyWithLegacySemantics$constant as StringifyWithLegacySemantics$constant__from_jsonflags, TagFlags$constant as TagFlags$constant__from_jsonflags, UnmarshalAnyWithRawNumber$constant as UnmarshalAnyWithRawNumber$constant__from_jsonflags, UnmarshalArrayFromAnyLength$constant as UnmarshalArrayFromAnyLength$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { AppendFloat as AppendFloat__from_jsonwire, AppendQuote as AppendQuote__from_jsonwire, ConsumeNumber as ConsumeNumber__from_jsonwire, ParseUint as ParseUint__from_jsonwire, QuoteRune as QuoteRune__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state as $state__internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { $state as $state__jsontext, Bool as Bool__from_jsontext, Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Float as Float__from_jsontext, String as String__from_jsontext, SyntacticError as SyntacticError__from_jsontext, Token as Token__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_, $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_, $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_, $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_ } from "../../../../../support/anonymous-structs.js";
import { MaxUint64$uint64 as MaxUint64$uint64__from_math__package_1 } from "../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { Or$Named_error } from "../../../../../support/generics/concretizations/cmp/Or.js";
import { AppendQuote$SliceOf_byte } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/jsontext/AppendQuote.js";
import { AppendUnquote$Named_jsontext$Value } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/jsontext/AppendUnquote.js";
import { len64$Named_jsontext$Value, len64$SliceOf_byte } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/len64.js";
import { typedArshalers$lookup$Named_jsontext$Decoder, typedArshalers$lookup$Named_jsontext$Encoder } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/typedArshalers$lookup.js";
import { Sort$Named_json$stringSlice$string } from "../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$Named_json$typedPointer, $goInterfaceAdapter$Pointer, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder, $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError, $goInterfaceAdapter$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_, $goInterfaceAdapter$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_, $goInterfaceAdapter$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_, $goInterfaceAdapter$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Is_Named_error_to_bool$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$contract, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$is, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$contract, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract as GoInterface$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { $goMap$MapOf_Interface_void_To_Struct_void as GoMap } from "../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_error$Using$Error$Direct as GoProviderProfileBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goReflectType$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_, $goReflectType$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_, $goReflectType$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_, $goReflectType$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_ } from "../../../../../support/reflection-types.js";
import "../../../../../support/reflection-types.js";
import { decodeBuffer as decodeBuffer__from_jsontext, decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { objectNameStack as objectNameStack__from_jsontext, objectNamespace as objectNamespace__from_jsontext, stateEntry as stateEntry__from_jsontext } from "../jsontext/state.js";
import { addressableValue, arshaler, getStrings, lookupArshaler, newAddressableValue, putStrings } from "./arshal.js";
import { marshalValueAny, unmarshalValueAny } from "./arshal_any.js";
import { typedArshalers } from "./arshal_funcs.js";
import { marshalInlinedFallbackAll, unmarshalInlinedFallbackNext } from "./arshal_inlined.js";
import { Marshaler$contract, Marshaler$is, MarshalerTo$contract, MarshalerTo$is, implementsAny } from "./arshal_methods.js";
import { isFatalError, newDuplicateNameError, newInvalidFormatError, newMarshalErrorBefore, newUnmarshalErrorAfter, newUnmarshalErrorAfterWithSkipping, newUnmarshalErrorAfterWithValue, newUnmarshalErrorBefore, newUnmarshalErrorBeforeWithSkipping } from "./errors.js";
import { fieldOptions, makeStructFields, structField, structFields } from "./fields.js";
import { makeString } from "./intern.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goNumberIntegerDivide, goNumberIntegerRemainder, goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice, goSliceClear } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export const optimizeCommon$bool: bool = true;
export const startDetectingCyclesAfter$int: int = 1000;
export class typedPointer {
    declare private readonly $goType: void;
    public constructor(public typ: reflect__from_gostdlib.Type | undefined, public ptr: $goInterface$Interface_void | undefined, public len: int) {
    }
    static $copy($source: typedPointer): typedPointer {
        return new typedPointer($source.typ, $source.ptr, $source.len);
    }
    static $equal($left: typedPointer, $right: typedPointer): bool {
        return goInterfaceEqual($left.typ, $right.typ) && goInterfaceEqual($left.ptr, $right.ptr) && $left.len === $right.len;
    }
    static $hash($source: typedPointer): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.typ === undefined ? 0 : $source.typ.$go$hash());
        $hash = GoMapHash.mix($hash, $source.ptr === undefined ? 0 : $source.ptr.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.len));
        return $hash;
    }
    declare private readonly then?: never;
}
export function visitPointer(m: tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>> | undefined, v: reflect__from_gostdlib.Value): GoInterface | undefined {
    const __gotots_field_2 = v.Type();
    const __gotots_conversion_53 = v.UnsafePointer();
    const __gotots_field_3 = new $goInterfaceAdapter$Pointer(__gotots_conversion_53 === undefined ? undefined :
        tsonicTypeScriptRuntime.rawPointer(__gotots_conversion_53));
    let p = new typedPointer(__gotots_field_2, __gotots_field_3, sliceLen(named_reflect.ReflectValueOperations.$copy(v)));
    {
        const __gotots_results_56 = (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>>).value).lookupOk(new $goInterfaceAdapter$Named_json$typedPointer(typedPointer.$copy(p)));
        let ok = __gotots_results_56[1];
        if (ok) {
            return $state__internal.ErrCycle;
        }
    }
    if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>>).value.isNil()) {
        void ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            GoMap.make(0, []));
    }
    (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>>).value).store(new $goInterfaceAdapter$Named_json$typedPointer(typedPointer.$copy(p)), new GoEmptyStruct);
    return void 0;
}
export function leavePointer(m: tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>> | undefined, v: reflect__from_gostdlib.Value): void {
    const __gotots_field_4 = v.Type();
    const __gotots_conversion_54 = v.UnsafePointer();
    const __gotots_field_5 = new $goInterfaceAdapter$Pointer(__gotots_conversion_54 === undefined ? undefined :
        tsonicTypeScriptRuntime.rawPointer(__gotots_conversion_54));
    let p = new typedPointer(__gotots_field_4, __gotots_field_5, sliceLen(named_reflect.ReflectValueOperations.$copy(v)));
    ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoMapValue<$goInterface$Interface_void | undefined, GoEmptyStruct>>).value.delete(new $goInterfaceAdapter$Named_json$typedPointer(typedPointer.$copy(p)));
}
export function sliceLen(v: reflect__from_gostdlib.Value): int {
    if (named_reflect.ReflectKindValueOperations.$project(v.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
        return globalThis.Number(BigInt.asIntN(64, v.Len()));
    }
    return 0;
}
export function len64$kernel<Bytes>($go$length$T0_to_int: ($0: Bytes) => int, __go_in: Bytes): int64 {
    return BigInt.asIntN(64, goNumberToBigInt($go$length$T0_to_int(__go_in)));
}
export function makeDefaultArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    const __gotots_receiver_0 = t;
    switch (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Kind())) {
        case 1n: {
            return makeBoolArshaler(t);
            break;
        }
        case 24n: {
            return makeStringArshaler(t);
            break;
        }
        case 2n:
        case 3n:
        case 4n:
        case 5n:
        case 6n: {
            return makeIntArshaler(t);
            break;
        }
        case 7n:
        case 8n:
        case 9n:
        case 10n:
        case 11n:
        case 12n: {
            return makeUintArshaler(t);
            break;
        }
        case 13n:
        case 14n: {
            return makeFloatArshaler(t);
            break;
        }
        case 21n: {
            return makeMapArshaler(t);
            break;
        }
        case 25n: {
            return makeStructArshaler(t);
            break;
        }
        case 23n: {
            let fncs: arshaler | undefined = makeSliceArshaler(t);
            const __gotots_receiver_1 = t;
            const __gotots_receiver_2 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_1).Elem();
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_2).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Uint8)) {
                return makeBytesArshaler(t, fncs);
            }
            return fncs;
            break;
        }
        case 17n: {
            let fncs: arshaler | undefined = makeArrayArshaler(t);
            const __gotots_receiver_3 = t;
            const __gotots_receiver_4 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_3).Elem();
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_4).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Uint8)) {
                return makeBytesArshaler(t, fncs);
            }
            return fncs;
            break;
        }
        case 22n: {
            return makePointerArshaler(t);
            break;
        }
        case 20n: {
            return makeInterfaceArshaler(t);
            break;
        }
        default: {
            return makeInvalidArshaler(t);
            break;
        }
    }
}
export function makeBoolArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let stringify = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            stringify = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(824633720832n))) {
                return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !stringify && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = strconv__from_gostdlib.AppendBool(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 116), addressableValue.$storageOf(va).Value.Bool());
            const __gotots_store_0 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Last"));
            if (encoderState__from_jsontext.NeedFlush(xe)) {
                return encoderState__from_jsontext.Flush(xe);
            }
            return void 0;
        }
        if (stringify) {
            if (addressableValue.$storageOf(va).Value.Bool()) {
                return Encoder__from_jsontext.WriteToken(enc, String__from_jsontext("true"));
            }
            else {
                return Encoder__from_jsontext.WriteToken(enc, String__from_jsontext("false"));
            }
        }
        return Encoder__from_jsontext.WriteToken(enc, Bool__from_jsontext(addressableValue.$storageOf(va).Value.Bool()));
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let stringify = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            stringify = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(824633720832n))) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        const __gotots_results_0 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_0[0];
        let err: GoInterface | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = tok.Kind();
        switch (k) {
            case 110: {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                    addressableValue.$storageOf(va).Value.SetBool(false);
                }
                return void 0;
                break;
            }
            case 116:
            case 102: {
                if (!stringify) {
                    addressableValue.$storageOf(va).Value.SetBool(tok.Bool());
                    return void 0;
                }
                break;
            }
            case 34: {
                if (stringify) {
                    switch (tok.String()) {
                        case "true": {
                            addressableValue.$storageOf(va).Value.SetBool(true);
                            break;
                        }
                        case "false": {
                            addressableValue.$storageOf(va).Value.SetBool(false);
                            break;
                        }
                        default: {
                            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags()) && tok.String() === "null") {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    addressableValue.$storageOf(va).Value.SetBool(false);
                                }
                                return void 0;
                            }
                            return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax));
                            break;
                        }
                    }
                    return void 0;
                }
                break;
            }
        }
        return newUnmarshalErrorAfterWithSkipping(dec, t, void 0);
    };
    return fncs;
}
export function makeStringArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let stringify = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            stringify = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(824633720832n))) {
                return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        let s = addressableValue.$storageOf(va).Value.String();
        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !stringify && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
            let b = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf;
            b = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(b, 34);
            const __gotots_argument_0 = b;
            const __gotots_conversion_0 = s;
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            const __gotots_argument_1 = __gotots_conversion_1;
            const __gotots_store_1 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
            const __gotots_argument_2 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
            const __gotots_results_1 = AppendQuote__from_jsonwire(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
            b = __gotots_results_1[0];
            let err: GoInterface | undefined = __gotots_results_1[1];
            if (err === undefined) {
                ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = b;
                const __gotots_store_2 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Last"));
                if (encoderState__from_jsontext.NeedFlush(xe)) {
                    return encoderState__from_jsontext.Flush(xe);
                }
                return void 0;
            }
        }
        if (stringify) {
            const __gotots_argument_3 = RuntimeSlice.nil<uint8>();
            const __gotots_conversion_3 = s;
            const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
            }
            const __gotots_argument_4 = __gotots_conversion_4;
            const __gotots_store_3 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
            const __gotots_argument_5 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
            const __gotots_results_2 = AppendQuote__from_jsonwire(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
            let b = __gotots_results_2[0];
            let err: GoInterface | undefined = __gotots_results_2[1];
            if (!(err === undefined)) {
                const __gotots_argument_6 = enc;
                const __gotots_argument_7 = t;
                const __gotots_field_0 = err;
                const __gotots_struct_0 = SyntacticError__from_jsontext.$zero();
                __gotots_struct_0.Err = __gotots_field_0;
                const __gotots_argument_8 = new $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError({ value: __gotots_struct_0 });
                return newMarshalErrorBefore(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
            }
            const __gotots_results_3 = AppendQuote$SliceOf_byte(RuntimeSlice.nil<uint8>(), b);
            let q = __gotots_results_3[0];
            err = __gotots_results_3[1];
            if (!(err === undefined)) {
                const __gotots_binary_operand_0 = "BUG: second AppendQuote should never fail: ";
                const __gotots_receiver_5 = err;
                const __gotots_binary_operand_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_5).Error();
                const __gotots_argument_9 = new $goInterfaceAdapter$string(__gotots_binary_operand_0 + __gotots_binary_operand_1);
                GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
            }
            return Encoder__from_jsontext.WriteValue(enc, new Value__from_jsontext(q));
        }
        return Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(s));
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        let stringify = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            stringify = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(824633720832n))) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
        const __gotots_results_4 = decoderState__from_jsontext.ReadValue(xd, flags$location);
        let val: Value__from_jsontext = __gotots_results_4[0];
        let err: GoInterface | undefined = __gotots_results_4[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = val.Kind();
        switch (k) {
            case 110: {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                    addressableValue.$storageOf(va).Value.SetString("");
                }
                return void 0;
                break;
            }
            case 34: {
                val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                if (stringify) {
                    const __gotots_results_5 = AppendUnquote$Named_jsontext$Value(RuntimeSlice.nil<uint8>(), val);
                    val = new Value__from_jsontext(__gotots_results_5[0]);
                    err = __gotots_results_5[1];
                    if (!(err === undefined)) {
                        return newUnmarshalErrorAfter(dec, t, err);
                    }
                    let __gotots_logical_result_0 = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
                    if (__gotots_logical_result_0) {
                        const __gotots_conversion_6 = val.$value;
                        let __gotots_conversion_7 = "";
                        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                        }
                        const __gotots_binary_operand_2 = __gotots_conversion_7;
                        const __gotots_binary_operand_3 = "null";
                        __gotots_logical_result_0 = __gotots_binary_operand_2 === __gotots_binary_operand_3;
                    }
                    if (__gotots_logical_result_0) {
                        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                            addressableValue.$storageOf(va).Value.SetString("");
                        }
                        return void 0;
                    }
                }
                if (((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache === undefined) {
                    ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache =
                        tsonicTypeScriptRuntime.location<GoArray<gostring, 256>>(GoArray.zero<gostring, 256>(256, ""));
                }
                let str = makeString(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.StringCache, val.$value);
                addressableValue.$storageOf(va).Value.SetString(str);
                return void 0;
                break;
            }
        }
        return newUnmarshalErrorAfter(dec, t, void 0);
    };
    return fncs;
}
export function makeBytesArshaler(t: reflect__from_gostdlib.Type | undefined, fncs: arshaler | undefined): arshaler | undefined {
    let marshalArray: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
    const __gotots_receiver_41 = t;
    const __gotots_receiver_42 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_41).Elem();
    const __gotots_binary_operand_10 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_42).PkgPath();
    const __gotots_binary_operand_11 = "";
    let isNamedByte = __gotots_binary_operand_10 !== __gotots_binary_operand_11;
    const __gotots_receiver_43 = t;
    const __gotots_argument_115 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_43).Elem();
    const __gotots_argument_116 = $state.allMarshalerTypes;
    let hasMarshaler = implementsAny(__gotots_argument_115, __gotots_argument_116);
    (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatBytesWithLegacySemantics$constant__from_jsonflags()) && isNamedByte) {
            const __gotots_callee_19 = marshalArray;
            const __gotots_argument_117 = enc;
            const __gotots_argument_118 = addressableValue.$copy(va);
            const __gotots_argument_119 = mo;
            return (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_117, __gotots_argument_118, __gotots_argument_119);
        }
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let appendEncode: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined = $state.appendEncodeBase64;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(new Bools__from_jsonflags(3625975808n))) {
            __gotots_control_target_4: {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                    switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                        case "base64": {
                            appendEncode = $state.appendEncodeBase64;
                            break;
                        }
                        case "base64url": {
                            appendEncode = $state.appendEncodeBase64URL;
                            break;
                        }
                        case "base32": {
                            appendEncode = $state.appendEncodeBase32;
                            break;
                        }
                        case "base32hex": {
                            appendEncode = $state.appendEncodeBase32Hex;
                            break;
                        }
                        case "base16":
                        case "hex": {
                            appendEncode = $state.appendEncodeBase16;
                            break;
                        }
                        case "array": {
                            const __gotots_store_26 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                            Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), FormatTag$constant__from_jsonflags());
                            const __gotots_callee_20 = marshalArray;
                            const __gotots_argument_120 = enc;
                            const __gotots_argument_121 = addressableValue.$copy(va);
                            const __gotots_argument_122 = mo;
                            return (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_120, __gotots_argument_121, __gotots_argument_122);
                            break;
                        }
                        default: {
                            return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
                            break;
                        }
                    }
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatByteArrayAsArray$constant__from_jsonflags()) && named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Array)) {
                    const __gotots_callee_21 = marshalArray;
                    const __gotots_argument_123 = enc;
                    const __gotots_argument_124 = addressableValue.$copy(va);
                    const __gotots_argument_125 = mo;
                    return (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_123, __gotots_argument_124, __gotots_argument_125);
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatBytesWithLegacySemantics$constant__from_jsonflags()) && hasMarshaler) {
                    const __gotots_callee_22 = marshalArray;
                    const __gotots_argument_126 = enc;
                    const __gotots_argument_127 = addressableValue.$copy(va);
                    const __gotots_argument_128 = mo;
                    return (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_126, __gotots_argument_127, __gotots_argument_128);
                }
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatNilSliceAsNull$constant__from_jsonflags()) && named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice) && addressableValue.$storageOf(va).Value.IsNil()) {
                return Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
            }
        }
        return encoderState__from_jsontext.AppendRaw(xe, 34, true, (b: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ] => {
            const __gotots_callee_23 = appendEncode;
            const __gotots_argument_129 = b;
            const __gotots_argument_130 = addressableValue.$storageOf(va).Value.Bytes();
            const __gotots_results_39 = (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_129, __gotots_argument_130);
            const __gotots_results_40 = void 0;
            return [__gotots_results_39, __gotots_results_40];
        });
    };
    let unmarshalArray: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
    (fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatBytesWithLegacySemantics$constant__from_jsonflags()) && isNamedByte) {
            const __gotots_callee_24 = unmarshalArray;
            const __gotots_argument_131 = dec;
            const __gotots_argument_132 = addressableValue.$copy(va);
            const __gotots_argument_133 = uo;
            return (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_131, __gotots_argument_132, __gotots_argument_133);
        }
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        const __gotots_assign_4 = $state.appendDecodeBase64;
        const __gotots_assign_5 = $state.encodedLenBase64;
        let appendDecode: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ]) | undefined = __gotots_assign_4;
        let encodedLen: (($0: int) => int) | undefined = __gotots_assign_5;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(new Bools__from_jsonflags(3623878656n))) {
            __gotots_control_target_5: {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                    switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                        case "base64": {
                            const __gotots_assign_6 = $state.appendDecodeBase64;
                            const __gotots_assign_7 = $state.encodedLenBase64;
                            appendDecode = __gotots_assign_6;
                            encodedLen = __gotots_assign_7;
                            break;
                        }
                        case "base64url": {
                            const __gotots_assign_8 = $state.appendDecodeBase64URL;
                            const __gotots_assign_9 = $state.encodedLenBase64URL;
                            appendDecode = __gotots_assign_8;
                            encodedLen = __gotots_assign_9;
                            break;
                        }
                        case "base32": {
                            const __gotots_assign_10 = $state.appendDecodeBase32;
                            const __gotots_assign_11 = $state.encodedLenBase32;
                            appendDecode = __gotots_assign_10;
                            encodedLen = __gotots_assign_11;
                            break;
                        }
                        case "base32hex": {
                            const __gotots_assign_12 = $state.appendDecodeBase32Hex;
                            const __gotots_assign_13 = $state.encodedLenBase32Hex;
                            appendDecode = __gotots_assign_12;
                            encodedLen = __gotots_assign_13;
                            break;
                        }
                        case "base16":
                        case "hex": {
                            const __gotots_assign_14 = $state.appendDecodeBase16;
                            const __gotots_assign_15 = $state.encodedLenBase16;
                            appendDecode = __gotots_assign_14;
                            encodedLen = __gotots_assign_15;
                            break;
                        }
                        case "array": {
                            const __gotots_store_27 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                            Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), FormatTag$constant__from_jsonflags());
                            const __gotots_callee_25 = unmarshalArray;
                            const __gotots_argument_134 = dec;
                            const __gotots_argument_135 = addressableValue.$copy(va);
                            const __gotots_argument_136 = uo;
                            return (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_134, __gotots_argument_135, __gotots_argument_136);
                            break;
                        }
                        default: {
                            return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
                            break;
                        }
                    }
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatByteArrayAsArray$constant__from_jsonflags()) && named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Array)) {
                    const __gotots_callee_26 = unmarshalArray;
                    const __gotots_argument_137 = dec;
                    const __gotots_argument_138 = addressableValue.$copy(va);
                    const __gotots_argument_139 = uo;
                    return (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_137, __gotots_argument_138, __gotots_argument_139);
                }
                else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatBytesWithLegacySemantics$constant__from_jsonflags()) && Decoder__from_jsontext.PeekKind(dec) === 91) {
                    const __gotots_callee_27 = unmarshalArray;
                    const __gotots_argument_140 = dec;
                    const __gotots_argument_141 = addressableValue.$copy(va);
                    const __gotots_argument_142 = uo;
                    return (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_140, __gotots_argument_141, __gotots_argument_142);
                }
            }
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next2 => flags = flags$next2);
        const __gotots_results_41 = decoderState__from_jsontext.ReadValue(xd, flags$location2);
        let val: Value__from_jsontext = __gotots_results_41[0];
        let err: GoInterface | undefined = __gotots_results_41[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = val.Kind();
        switch (k) {
            case 110: {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags()) || !(named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Array))) {
                    addressableValue.$storageOf(va).Value.SetZero();
                }
                return void 0;
                break;
            }
            case 34: {
                val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                const __gotots_callee_28 = appendDecode;
                const __gotots_argument_143 = addressableValue.$storageOf(va).Value.Bytes().slice(0, 0, null);
                const __gotots_argument_144 = val.$value;
                const __gotots_results_42 = (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_143, __gotots_argument_144);
                let b = __gotots_results_42[0];
                let err__shadow_1: GoInterface | undefined = __gotots_results_42[1];
                if (!(err__shadow_1 === undefined)) {
                    return newUnmarshalErrorAfter(dec, t, err__shadow_1);
                }
                const __gotots_binary_operand_12 = val.$value.length;
                const __gotots_callee_29 = encodedLen;
                const __gotots_argument_145 = b.length;
                const __gotots_binary_operand_13 = (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_145);
                if (__gotots_binary_operand_12 !== __gotots_binary_operand_13 && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ParseBytesWithLooseRFC4648$constant__from_jsonflags())) {
                    let i = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexAny(val.$value, "\r\n")));
                    let err__shadow_2: GoInterface | undefined = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("illegal character %s at offset %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(QuoteRune__from_jsonwire(new Value__from_jsontext(val.$value.slice(i, null, null)).$value)), new $goInterfaceAdapter$int(i)])));
                    return newUnmarshalErrorAfter(dec, t, err__shadow_2);
                }
                if (named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Array)) {
                    let dst = addressableValue.$storageOf(va).Value.Bytes();
                    goSliceClear(dst.slice(RuntimeSlice.copy<uint8>(dst, b), null, null), 0);
                    if (b.length !== dst.length && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(UnmarshalArrayFromAnyLength$constant__from_jsonflags())) {
                        let err__shadow_2: GoInterface | undefined = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("decoded length of %d mismatches array length of %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(b.length), new $goInterfaceAdapter$int(dst.length)])));
                        return newUnmarshalErrorAfter(dec, t, err__shadow_2);
                    }
                }
                else {
                    if (b.isNil()) {
                        b = RuntimeSlice.literal<uint8>([]);
                    }
                    addressableValue.$storageOf(va).Value.SetBytes(b);
                }
                return void 0;
                break;
            }
        }
        return newUnmarshalErrorAfter(dec, t, void 0);
    };
    return fncs;
}
export function makeIntArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    const __gotots_receiver_6 = t;
    let bits = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_6).Bits()));
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let stringify = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
        }
        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !stringify) {
            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = strconv__from_gostdlib.AppendInt(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 48), addressableValue.$storageOf(va).Value.Int(), BigInt.asIntN(64, goNumberToBigInt(10)));
            const __gotots_store_4 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Last"));
            if (encoderState__from_jsontext.NeedFlush(xe)) {
                return encoderState__from_jsontext.Flush(xe);
            }
            return void 0;
        }
        let k = stringOrNumberKind(stringify);
        return encoderState__from_jsontext.AppendRaw(xe, k, true, (b: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ] => {
            return [strconv__from_gostdlib.AppendInt(b, addressableValue.$storageOf(va).Value.Int(), BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
        });
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        let stringify = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next3 => flags = flags$next3);
        const __gotots_results_6 = decoderState__from_jsontext.ReadValue(xd, flags$location3);
        let val: Value__from_jsontext = __gotots_results_6[0];
        let err: GoInterface | undefined = __gotots_results_6[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = val.Kind();
        {
            const __gotots_switch_tag_0 = k;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0 === 110;
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === 34;
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_2 = false;
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === 48;
                }
                if (__gotots_switch_match_2) {
                    __gotots_switch_selection_0 = 2;
                }
            }
            __gotots_control_target_0: {
                if (__gotots_switch_selection_0 === 0) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(va).Value.SetInt(0n);
                    }
                    return void 0;
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 1) {
                    if (!stringify) {
                        break __gotots_control_target_0;
                    }
                    val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
                        const __gotots_conversion_9 = val.$value;
                        let __gotots_conversion_10 = "";
                        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                        }
                        const __gotots_argument_10 = __gotots_conversion_10;
                        const __gotots_argument_11 = 10;
                        const __gotots_argument_12 = bits;
                        const __gotots_results_7 = strconv__from_gostdlib.ParseInt(__gotots_argument_10, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_11)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_12)));
                        const __gotots_results_8 = [__gotots_results_7[0], GoProviderInterfaceBridge.$from(__gotots_results_7[1])] satisfies [
                            int64,
                            GoInterface | undefined
                        ];
                        let n = __gotots_results_8[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_8[1];
                        if (!(err__shadow_1 === undefined)) {
                            const __gotots_conversion_12 = val.$value;
                            let __gotots_conversion_13 = "";
                            for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
                                __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
                            }
                            const __gotots_binary_operand_4 = __gotots_conversion_13;
                            const __gotots_binary_operand_5 = "null";
                            if (__gotots_binary_operand_4 === __gotots_binary_operand_5) {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    addressableValue.$storageOf(va).Value.SetInt(0n);
                                }
                                return void 0;
                            }
                            const __gotots_argument_14 = dec;
                            const __gotots_argument_15 = t;
                            const __gotots_argument_13 = err__shadow_1;
                            const __gotots_argument_16 = GoProviderProfileBridge.$from(provider_error.ErrorsUnwrapDirect(GoProviderProfileBridge.$to(__gotots_argument_13), GoInterface$is));
                            return newUnmarshalErrorAfterWithValue(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
                        }
                        addressableValue.$storageOf(va).Value.SetInt(n);
                        return void 0;
                    }
                    __gotots_switch_selection_0 = 2;
                }
                if (__gotots_switch_selection_0 === 2) {
                    if (stringify && k === 48) {
                        break __gotots_control_target_0;
                    }
                    let negOffset = 0;
                    let neg = val.$value.length > 0 && val.$value.get(0) === 45;
                    if (neg) {
                        negOffset = 1;
                    }
                    const __gotots_results_9 = ParseUint__from_jsonwire(new Value__from_jsontext(val.$value.slice(negOffset, null, null)).$value);
                    let n = __gotots_results_9[0];
                    let ok = __gotots_results_9[1];
                    let maxInt = (bits - 1) < 0 ? GoPanic.raiseRuntime("negative shift amount") : (bits - 1) >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt((bits - 1)));
                    let overflow = (neg && n > maxInt) || (!neg && n > goUint64(maxInt - 1n));
                    if (!ok) {
                        if (n !== MaxUint64$uint64__from_math__package_1) {
                            return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax));
                        }
                        overflow = true;
                    }
                    if (overflow) {
                        return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange));
                    }
                    if (neg) {
                        addressableValue.$storageOf(va).Value.SetInt(BigInt.asIntN(64, goUint64(-n)));
                    }
                    else {
                        addressableValue.$storageOf(va).Value.SetInt(BigInt.asIntN(64, n));
                    }
                    return void 0;
                    break __gotots_control_target_0;
                }
            }
        }
        return newUnmarshalErrorAfter(dec, t, void 0);
    };
    return fncs;
}
export function makeUintArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    const __gotots_receiver_7 = t;
    let bits = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_7).Bits()));
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let stringify = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
        }
        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !stringify) {
            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = strconv__from_gostdlib.AppendUint(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 48), addressableValue.$storageOf(va).Value.Uint(), BigInt.asIntN(64, goNumberToBigInt(10)));
            const __gotots_store_5 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Last"));
            if (encoderState__from_jsontext.NeedFlush(xe)) {
                return encoderState__from_jsontext.Flush(xe);
            }
            return void 0;
        }
        let k = stringOrNumberKind(stringify);
        return encoderState__from_jsontext.AppendRaw(xe, k, true, (b: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ] => {
            return [strconv__from_gostdlib.AppendUint(b, addressableValue.$storageOf(va).Value.Uint(), BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
        });
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        let stringify = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next4 => flags = flags$next4);
        const __gotots_results_10 = decoderState__from_jsontext.ReadValue(xd, flags$location4);
        let val: Value__from_jsontext = __gotots_results_10[0];
        let err: GoInterface | undefined = __gotots_results_10[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = val.Kind();
        {
            const __gotots_switch_tag_1 = k;
            let __gotots_switch_selection_1 = -1;
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_3 = false;
                if (!__gotots_switch_match_3) {
                    __gotots_switch_match_3 = __gotots_switch_tag_1 === 110;
                }
                if (__gotots_switch_match_3) {
                    __gotots_switch_selection_1 = 0;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_4 = false;
                if (!__gotots_switch_match_4) {
                    __gotots_switch_match_4 = __gotots_switch_tag_1 === 34;
                }
                if (__gotots_switch_match_4) {
                    __gotots_switch_selection_1 = 1;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_5 = false;
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_1 === 48;
                }
                if (__gotots_switch_match_5) {
                    __gotots_switch_selection_1 = 2;
                }
            }
            __gotots_control_target_1: {
                if (__gotots_switch_selection_1 === 0) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(va).Value.SetUint(0n);
                    }
                    return void 0;
                    break __gotots_control_target_1;
                }
                if (__gotots_switch_selection_1 === 1) {
                    if (!stringify) {
                        break __gotots_control_target_1;
                    }
                    val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
                        const __gotots_conversion_15 = val.$value;
                        let __gotots_conversion_16 = "";
                        for (let __gotots_conversion_17 = 0; __gotots_conversion_17 < __gotots_conversion_15.length; __gotots_conversion_17++) {
                            __gotots_conversion_16 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_15.get(__gotots_conversion_17)));
                        }
                        const __gotots_argument_17 = __gotots_conversion_16;
                        const __gotots_argument_18 = 10;
                        const __gotots_argument_19 = bits;
                        const __gotots_results_11 = strconv__from_gostdlib.ParseUint(__gotots_argument_17, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_18)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_19)));
                        const __gotots_results_12 = [__gotots_results_11[0], GoProviderInterfaceBridge.$from(__gotots_results_11[1])] satisfies [
                            uint64,
                            GoInterface | undefined
                        ];
                        let n = __gotots_results_12[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_12[1];
                        if (!(err__shadow_1 === undefined)) {
                            const __gotots_conversion_18 = val.$value;
                            let __gotots_conversion_19 = "";
                            for (let __gotots_conversion_20 = 0; __gotots_conversion_20 < __gotots_conversion_18.length; __gotots_conversion_20++) {
                                __gotots_conversion_19 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_18.get(__gotots_conversion_20)));
                            }
                            const __gotots_binary_operand_6 = __gotots_conversion_19;
                            const __gotots_binary_operand_7 = "null";
                            if (__gotots_binary_operand_6 === __gotots_binary_operand_7) {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    addressableValue.$storageOf(va).Value.SetUint(0n);
                                }
                                return void 0;
                            }
                            const __gotots_argument_21 = dec;
                            const __gotots_argument_22 = t;
                            const __gotots_argument_20 = err__shadow_1;
                            const __gotots_argument_23 = GoProviderProfileBridge.$from(provider_error.ErrorsUnwrapDirect(GoProviderProfileBridge.$to(__gotots_argument_20), GoInterface$is));
                            return newUnmarshalErrorAfterWithValue(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
                        }
                        addressableValue.$storageOf(va).Value.SetUint(n);
                        return void 0;
                    }
                    __gotots_switch_selection_1 = 2;
                }
                if (__gotots_switch_selection_1 === 2) {
                    if (stringify && k === 48) {
                        break __gotots_control_target_1;
                    }
                    const __gotots_results_13 = ParseUint__from_jsonwire(val.$value);
                    let n = __gotots_results_13[0];
                    let ok = __gotots_results_13[1];
                    let maxUint = bits < 0 ? GoPanic.raiseRuntime("negative shift amount") : bits >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt(bits));
                    let overflow = n > goUint64(maxUint - 1n);
                    if (!ok) {
                        if (n !== MaxUint64$uint64__from_math__package_1) {
                            return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax));
                        }
                        overflow = true;
                    }
                    if (overflow) {
                        return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange));
                    }
                    addressableValue.$storageOf(va).Value.SetUint(n);
                    return void 0;
                    break __gotots_control_target_1;
                }
            }
        }
        return newUnmarshalErrorAfter(dec, t, void 0);
    };
    return fncs;
}
export function makeFloatArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    const __gotots_receiver_8 = t;
    let bits = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_8).Bits()));
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        let stringify = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        let allowNonFinite = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            if ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format === "nonfinite") {
                allowNonFinite = true;
            }
            else {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        let fv = addressableValue.$storageOf(va).Value.Float();
        if (math__from_gostdlib.IsNaN(fv) || math__from_gostdlib.IsInf(fv, BigInt.asIntN(64, goNumberToBigInt(0)))) {
            if (!allowNonFinite) {
                let err: GoInterface | undefined = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unsupported value: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$float64(fv)])));
                return newMarshalErrorBefore(enc, t, err);
            }
            return Encoder__from_jsontext.WriteToken(enc, Float__from_jsontext(fv));
        }
        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !stringify) {
            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = AppendFloat__from_jsonwire(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 48), fv, bits);
            const __gotots_store_6 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Last"));
            if (encoderState__from_jsontext.NeedFlush(xe)) {
                return encoderState__from_jsontext.Flush(xe);
            }
            return void 0;
        }
        let k = stringOrNumberKind(stringify);
        return encoderState__from_jsontext.AppendRaw(xe, k, true, (b: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ] => {
            return [AppendFloat__from_jsonwire(b, addressableValue.$storageOf(va).Value.Float(), bits), void 0];
        });
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        let stringify = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName() || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(134479872n));
        let allowNonFinite = false;
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
            if ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format === "nonfinite") {
                allowNonFinite = true;
            }
            else {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location5 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next5 => flags = flags$next5);
        const __gotots_results_14 = decoderState__from_jsontext.ReadValue(xd, flags$location5);
        let val: Value__from_jsontext = __gotots_results_14[0];
        let err: GoInterface | undefined = __gotots_results_14[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = val.Kind();
        {
            const __gotots_switch_tag_2 = k;
            let __gotots_switch_selection_2 = -1;
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_6 = false;
                if (!__gotots_switch_match_6) {
                    __gotots_switch_match_6 = __gotots_switch_tag_2 === 110;
                }
                if (__gotots_switch_match_6) {
                    __gotots_switch_selection_2 = 0;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_7 = false;
                if (!__gotots_switch_match_7) {
                    __gotots_switch_match_7 = __gotots_switch_tag_2 === 34;
                }
                if (__gotots_switch_match_7) {
                    __gotots_switch_selection_2 = 1;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_8 = false;
                if (!__gotots_switch_match_8) {
                    __gotots_switch_match_8 = __gotots_switch_tag_2 === 48;
                }
                if (__gotots_switch_match_8) {
                    __gotots_switch_selection_2 = 2;
                }
            }
            __gotots_control_target_2: {
                if (__gotots_switch_selection_2 === 0) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(va).Value.SetFloat(0);
                    }
                    return void 0;
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_2 === 1) {
                    val = new Value__from_jsontext(UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim()));
                    if (allowNonFinite) {
                        const __gotots_conversion_21 = val.$value;
                        let __gotots_conversion_22 = "";
                        for (let __gotots_conversion_23 = 0; __gotots_conversion_23 < __gotots_conversion_21.length; __gotots_conversion_23++) {
                            __gotots_conversion_22 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_21.get(__gotots_conversion_23)));
                        }
                        switch (__gotots_conversion_22) {
                            case "NaN": {
                                addressableValue.$storageOf(va).Value.SetFloat(math__from_gostdlib.NaN());
                                return void 0;
                                break;
                            }
                            case "Infinity": {
                                addressableValue.$storageOf(va).Value.SetFloat(math__from_gostdlib.Inf(BigInt.asIntN(64, goNumberToBigInt(1))));
                                return void 0;
                                break;
                            }
                            case "-Infinity": {
                                addressableValue.$storageOf(va).Value.SetFloat(math__from_gostdlib.Inf(BigInt.asIntN(64, goNumberToBigInt(-1))));
                                return void 0;
                                break;
                            }
                        }
                    }
                    if (!stringify) {
                        break __gotots_control_target_2;
                    }
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
                        const __gotots_conversion_24 = val.$value;
                        let __gotots_conversion_25 = "";
                        for (let __gotots_conversion_26 = 0; __gotots_conversion_26 < __gotots_conversion_24.length; __gotots_conversion_26++) {
                            __gotots_conversion_25 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_24.get(__gotots_conversion_26)));
                        }
                        const __gotots_argument_24 = __gotots_conversion_25;
                        const __gotots_argument_25 = bits;
                        const __gotots_results_15 = strconv__from_gostdlib.ParseFloat(__gotots_argument_24, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_25)));
                        const __gotots_results_16 = [__gotots_results_15[0], GoProviderInterfaceBridge.$from(__gotots_results_15[1])] satisfies [
                            float64,
                            GoInterface | undefined
                        ];
                        let n = __gotots_results_16[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_16[1];
                        if (!(err__shadow_1 === undefined)) {
                            const __gotots_conversion_27 = val.$value;
                            let __gotots_conversion_28 = "";
                            for (let __gotots_conversion_29 = 0; __gotots_conversion_29 < __gotots_conversion_27.length; __gotots_conversion_29++) {
                                __gotots_conversion_28 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_27.get(__gotots_conversion_29)));
                            }
                            const __gotots_binary_operand_8 = __gotots_conversion_28;
                            const __gotots_binary_operand_9 = "null";
                            if (__gotots_binary_operand_8 === __gotots_binary_operand_9) {
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                    addressableValue.$storageOf(va).Value.SetFloat(0);
                                }
                                return void 0;
                            }
                            const __gotots_argument_27 = dec;
                            const __gotots_argument_28 = t;
                            const __gotots_argument_26 = err__shadow_1;
                            const __gotots_argument_29 = GoProviderProfileBridge.$from(provider_error.ErrorsUnwrapDirect(GoProviderProfileBridge.$to(__gotots_argument_26), GoInterface$is));
                            return newUnmarshalErrorAfterWithValue(__gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
                        }
                        addressableValue.$storageOf(va).Value.SetFloat(n);
                        return void 0;
                    }
                    {
                        const __gotots_results_17 = ConsumeNumber__from_jsonwire(val.$value);
                        let n = __gotots_results_17[0];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_17[1];
                        if (n !== val.$value.length || !(err__shadow_1 === undefined)) {
                            return newUnmarshalErrorAfterWithValue(dec, t, GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrSyntax));
                        }
                    }
                    __gotots_switch_selection_2 = 2;
                }
                if (__gotots_switch_selection_2 === 2) {
                    if (stringify && k === 48) {
                        break __gotots_control_target_2;
                    }
                    const __gotots_conversion_30 = val.$value;
                    let __gotots_conversion_31 = "";
                    for (let __gotots_conversion_32 = 0; __gotots_conversion_32 < __gotots_conversion_30.length; __gotots_conversion_32++) {
                        __gotots_conversion_31 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_30.get(__gotots_conversion_32)));
                    }
                    const __gotots_argument_30 = __gotots_conversion_31;
                    const __gotots_argument_31 = bits;
                    const __gotots_results_18 = strconv__from_gostdlib.ParseFloat(__gotots_argument_30, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_31)));
                    const __gotots_results_19 = [__gotots_results_18[0], GoProviderInterfaceBridge.$from(__gotots_results_18[1])] satisfies [
                        float64,
                        GoInterface | undefined
                    ];
                    let fv = __gotots_results_19[0];
                    let err__shadow_1: GoInterface | undefined = __gotots_results_19[1];
                    addressableValue.$storageOf(va).Value.SetFloat(fv);
                    if (!(err__shadow_1 === undefined)) {
                        const __gotots_argument_33 = dec;
                        const __gotots_argument_34 = t;
                        const __gotots_argument_32 = err__shadow_1;
                        const __gotots_argument_35 = GoProviderProfileBridge.$from(provider_error.ErrorsUnwrapDirect(GoProviderProfileBridge.$to(__gotots_argument_32), GoInterface$is));
                        return newUnmarshalErrorAfterWithValue(__gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                    }
                    return void 0;
                    break __gotots_control_target_2;
                }
            }
        }
        return newUnmarshalErrorAfter(dec, t, void 0);
    };
    return fncs;
}
export function makeMapArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let once = named_sync.SyncOnceOperations.$zero();
    let keyFncs: arshaler | undefined = void 0;
    let valFncs: arshaler | undefined = void 0;
    let init__shadow_1: (() => void) | undefined = (): void => {
        const __gotots_receiver_9 = t;
        const __gotots_argument_36 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_9).Key();
        keyFncs = lookupArshaler(__gotots_argument_36);
        const __gotots_receiver_10 = t;
        const __gotots_argument_37 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_10).Elem();
        valFncs = lookupArshaler(__gotots_argument_37);
    };
    const __gotots_receiver_11 = t;
    const __gotots_receiver_12 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_11).Key();
    let __gotots_logical_result_1 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_12).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
    if (__gotots_logical_result_1) {
        const __gotots_receiver_13 = t;
        const __gotots_argument_38 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_13).Key();
        const __gotots_argument_39 = RuntimeSlice.literal<reflect__from_gostdlib.Type | undefined>([$state.textMarshalerType, $state.textAppenderType]);
        __gotots_logical_result_1 = implementsAny(__gotots_argument_38, __gotots_argument_39);
    }
    let nillableLegacyKey = __gotots_logical_result_1;
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Depth() > startDetectingCyclesAfter$int) {
                        {
                            const __gotots_store_7 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                            const __gotots_argument_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "SeenPointers");
                            const __gotots_argument_41 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                            let err: GoInterface | undefined = visitPointer(__gotots_argument_40, __gotots_argument_41);
                            if (!(err === undefined)) {
                                __gotots_return_0 = newMarshalErrorBefore(enc, t, err);
                                break __gotots_return_block_0;
                            }
                        }
                        const __gotots_store_8 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                        const __gotots_argument_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "SeenPointers");
                        const __gotots_argument_43 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            leavePointer(__gotots_argument_42, __gotots_argument_43);
                        });
                    }
                    let emitNull = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatNilMapAsNull$constant__from_jsonflags());
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                            break __gotots_return_block_0;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                            switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                                case "emitnull": {
                                    emitNull = true;
                                    break;
                                }
                                case "emitempty": {
                                    emitNull = false;
                                    break;
                                }
                                default: {
                                    __gotots_return_0 = newInvalidFormatError(new GoInterfaceAdapter(enc), t);
                                    break __gotots_return_block_0;
                                    break;
                                }
                            }
                        }
                    }
                    let n = globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Len()));
                    if (n === 0) {
                        if (emitNull && addressableValue.$storageOf(va).Value.IsNil()) {
                            __gotots_return_0 = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
                            break __gotots_return_block_0;
                        }
                        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                            const __gotots_slice_build_0 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 123);
                            const __gotots_slice_build_1 = "{}";
                            const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                                __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                            }
                            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                            const __gotots_store_9 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Last"));
                            if (encoderState__from_jsontext.NeedFlush(xe)) {
                                __gotots_return_0 = encoderState__from_jsontext.Flush(xe);
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                    }
                    sync__from_gostdlib.Once.Do(once, init__shadow_1);
                    {
                        let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginObject)));
                        if (!(err === undefined)) {
                            __gotots_return_0 = err;
                            break __gotots_return_block_0;
                        }
                    }
                    if (n > 0) {
                        let nonDefaultKey = (keyFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault;
                        let marshalKey: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (keyFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
                        let marshalVal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
                        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
                            let ok = false;
                            const __gotots_receiver_15 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value.$go$value;
                            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers);
                            const __gotots_argument_44 = marshalKey;
                            const __gotots_receiver_14 = t;
                            const __gotots_argument_45 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_14).Key();
                            const __gotots_results_20 = typedArshalers$lookup$Named_jsontext$Encoder(__gotots_receiver_15, __gotots_argument_44, __gotots_argument_45);
                            marshalKey = __gotots_results_20[0];
                            ok = __gotots_results_20[1];
                            const __gotots_receiver_17 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value.$go$value;
                            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers);
                            const __gotots_argument_46 = marshalVal;
                            const __gotots_receiver_16 = t;
                            const __gotots_argument_47 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_16).Elem();
                            const __gotots_results_21 = typedArshalers$lookup$Named_jsontext$Encoder(__gotots_receiver_17, __gotots_argument_46, __gotots_argument_47);
                            marshalVal = __gotots_results_21[0];
                            nonDefaultKey = nonDefaultKey || ok;
                        }
                        const __gotots_receiver_18 = t;
                        const __gotots_argument_48 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_18).Key();
                        let k = newAddressableValue(__gotots_argument_48);
                        const __gotots_receiver_19 = t;
                        const __gotots_argument_49 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_19).Elem();
                        let v = newAddressableValue(__gotots_argument_49);
                        if (!nonDefaultKey && mapKeyWithUniqueRepresentation(addressableValue.$storageOf(k).Value.Kind(), Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags()))) {
                            const __gotots_store_10 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                            stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Last"));
                        }
                        {
                            let __gotots_switch_selection_3 = -1;
                            if (__gotots_switch_selection_3 === -1) {
                                let __gotots_switch_match_9 = false;
                                if (!__gotots_switch_match_9) {
                                    __gotots_switch_match_9 = !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(Deterministic$constant__from_jsonflags()) || n <= 1;
                                }
                                if (__gotots_switch_match_9) {
                                    __gotots_switch_selection_3 = 0;
                                }
                            }
                            if (__gotots_switch_selection_3 === -1) {
                                let __gotots_switch_match_10 = false;
                                if (!__gotots_switch_match_10) {
                                    let __gotots_logical_result_3 = !nonDefaultKey;
                                    if (__gotots_logical_result_3) {
                                        const __gotots_receiver_21 = t;
                                        const __gotots_receiver_22 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_21).Key();
                                        __gotots_logical_result_3 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_22).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
                                    }
                                    __gotots_switch_match_10 = __gotots_logical_result_3;
                                }
                                if (__gotots_switch_match_10) {
                                    __gotots_switch_selection_3 = 1;
                                }
                            }
                            if (__gotots_switch_selection_3 === -1) {
                                __gotots_switch_selection_3 = 2;
                            }
                            __gotots_control_target_3: switch (__gotots_switch_selection_3) {
                                case 0: {
                                    {
                                        const __gotots_conversion_33 = addressableValue.$storageOf(va).Value.MapRange();
                                        let iter: tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter> | undefined = __gotots_conversion_33 === undefined ? undefined :
                                            tsonicTypeScriptRuntime.boundLocation<reflect__from_gostdlib.MapIter>(__gotots_conversion_33, (): reflect__from_gostdlib.MapIter => {
                                                return __gotots_conversion_33;
                                            }, ($go$providerPointerValue: reflect__from_gostdlib.MapIter): void => {
                                                named_reflect.ReflectMapIterOperations.$assign(__gotots_conversion_33, $go$providerPointerValue);
                                            });
                                        for (;;) {
                                            const __gotots_receiver_20 = iter;
                                            if (!reflect__from_gostdlib.MapIter.Next(__gotots_receiver_20 === void 0 ? void 0 :
                                                (__gotots_receiver_20 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value)) {
                                                break;
                                            }
                                            {
                                                const __gotots_conversion_34 = iter;
                                                addressableValue.$storageOf(k).Value.SetIterKey(__gotots_conversion_34 === undefined ? undefined :
                                                    (__gotots_conversion_34 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                                const __gotots_callee_1 = marshalKey;
                                                const __gotots_argument_50 = enc;
                                                const __gotots_argument_51 = addressableValue.$copy(k);
                                                const __gotots_argument_52 = mo;
                                                let err: GoInterface | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
                                                if (!(err === undefined)) {
                                                    let __gotots_logical_result_2 = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags());
                                                    if (__gotots_logical_result_2) {
                                                        const __gotots_argument_53 = err;
                                                        const __gotots_argument_54 = $state__jsontext.ErrNonStringName;
                                                        __gotots_logical_result_2 = provider_error.ErrorsIsDirect(__gotots_argument_53, __gotots_argument_54, $goInterface$Interface_Method_Is_Named_error_to_bool$is, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                                                    }
                                                    if (__gotots_logical_result_2 && nillableLegacyKey && addressableValue.$storageOf(k).Value.IsNil()) {
                                                        err = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(""));
                                                    }
                                                    if (!(err === undefined)) {
                                                        {
                                                            const __gotots_results_22 = (($value: GoInterface | undefined): [
                                                                {
                                                                    value: SyntacticError__from_jsontext;
                                                                } | undefined,
                                                                boolean
                                                            ] => {
                                                                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError.$is($value)) {
                                                                    return [void 0, false];
                                                                }
                                                                return [$value.$go$value, true];
                                                            })(err);
                                                            let serr: {
                                                                value: SyntacticError__from_jsontext;
                                                            } | undefined = __gotots_results_22[0];
                                                            let ok = __gotots_results_22[1];
                                                            if (ok && goInterfaceEqual((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err, $state__jsontext.ErrNonStringName)) {
                                                                err = newMarshalErrorBefore(enc, addressableValue.$storageOf(k).Value.Type(), err);
                                                            }
                                                        }
                                                        __gotots_return_0 = err;
                                                        break __gotots_return_block_0;
                                                    }
                                                }
                                                const __gotots_conversion_35 = iter;
                                                addressableValue.$storageOf(v).Value.SetIterValue(__gotots_conversion_35 === undefined ? undefined :
                                                    (__gotots_conversion_35 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                                {
                                                    const __gotots_callee_2 = marshalVal;
                                                    const __gotots_argument_55 = enc;
                                                    const __gotots_argument_56 = addressableValue.$copy(v);
                                                    const __gotots_argument_57 = mo;
                                                    let err__shadow_1: GoInterface | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57);
                                                    if (!(err__shadow_1 === undefined)) {
                                                        __gotots_return_0 = err__shadow_1;
                                                        break __gotots_return_block_0;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 1: {
                                    let names: {
                                        value: stringSlice;
                                    } | undefined = getStrings(n);
                                    {
                                        const __gotots_assign_0 = 0;
                                        const __gotots_conversion_36 = addressableValue.$storageOf(va).Value.MapRange();
                                        const __gotots_assign_1 = __gotots_conversion_36 === undefined ? undefined :
                                            tsonicTypeScriptRuntime.boundLocation<reflect__from_gostdlib.MapIter>(__gotots_conversion_36, (): reflect__from_gostdlib.MapIter => {
                                                return __gotots_conversion_36;
                                            }, ($go$providerPointerValue: reflect__from_gostdlib.MapIter): void => {
                                                named_reflect.ReflectMapIterOperations.$assign(__gotots_conversion_36, $go$providerPointerValue);
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
                                            let __gotots_logical_result_4 = i < n;
                                            if (__gotots_logical_result_4) {
                                                const __gotots_receiver_23 = iter;
                                                __gotots_logical_result_4 = reflect__from_gostdlib.MapIter.Next(__gotots_receiver_23 === void 0 ? void 0 :
                                                    (__gotots_receiver_23 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                            }
                                            if (!__gotots_logical_result_4) {
                                                break;
                                            }
                                            {
                                                const __gotots_conversion_37 = iter;
                                                addressableValue.$storageOf(k).Value.SetIterKey(__gotots_conversion_37 === undefined ? undefined :
                                                    (__gotots_conversion_37 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                                ((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).$value.set(i, addressableValue.$storageOf(k).Value.String());
                                            }
                                        }
                                    }
                                    Sort$Named_json$stringSlice$string((names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                                    const __gotots_range_0: stringSlice["$value"] = (names ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.$value;
                                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                                        let name = __gotots_range_value_0;
                                        {
                                            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(name));
                                            if (!(err === undefined)) {
                                                __gotots_return_0 = err;
                                                break __gotots_return_block_0;
                                            }
                                        }
                                        addressableValue.$storageOf(k).Value.SetString(name);
                                        addressableValue.$storageOf(v).Value.Set(addressableValue.$storageOf(va).Value.MapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(k).Value)));
                                        {
                                            const __gotots_callee_3 = marshalVal;
                                            const __gotots_argument_58 = enc;
                                            const __gotots_argument_59 = addressableValue.$copy(v);
                                            const __gotots_argument_60 = mo;
                                            let err: GoInterface | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_58, __gotots_argument_59, __gotots_argument_60);
                                            if (!(err === undefined)) {
                                                __gotots_return_0 = err;
                                                break __gotots_return_block_0;
                                            }
                                        }
                                    }
                                    putStrings(names);
                                    break;
                                }
                                case 2: {
                                    type member$Storage = {
                                        name: gostring;
                                        key: addressableValue__from_json$Storage;
                                        val: addressableValue__from_json$Storage;
                                    };
                                    class member implements GoContainerStoredValue<member$Storage> {
                                        declare private readonly $goType: void;
                                        public constructor(private readonly $storage: member$Storage) {
                                        }
                                        public static $storageOf($source: member): member$Storage {
                                            return $source.$storage;
                                        }
                                        public static $fromStorage($source: member$Storage): member {
                                            return new member($source);
                                        }
                                        public get name(): gostring {
                                            return this.$storage.name;
                                        }
                                        public set name($value: gostring) {
                                            this.$storage.name = $value;
                                        }
                                        public get key(): addressableValue {
                                            return addressableValue.$fromStorage(this.$storage.key);
                                        }
                                        public set key($value: addressableValue) {
                                            this.$storage.key = addressableValue.$storageOf($value);
                                        }
                                        public get val(): addressableValue {
                                            return addressableValue.$fromStorage(this.$storage.val);
                                        }
                                        public set val($value: addressableValue) {
                                            this.$storage.val = addressableValue.$storageOf($value);
                                        }
                                        declare readonly [$goContainerStorageType]: member$Storage;
                                        static $copy($source: member): member {
                                            return new member({
                                                name: $source.$storage.name,
                                                key: addressableValue.$storageOf(addressableValue.$copy(addressableValue.$fromStorage($source.$storage.key))),
                                                val: addressableValue.$storageOf(addressableValue.$copy(addressableValue.$fromStorage($source.$storage.val)))
                                            });
                                        }
                                        static $zeroStorage(): member$Storage {
                                            return {
                                                name: "",
                                                key: addressableValue.$zeroStorage(),
                                                val: addressableValue.$zeroStorage()
                                            };
                                        }
                                        declare private readonly then?: never;
                                    }
                                    function SortFunc$SliceOf_Named_member$Named_member($argument0: RuntimeSlice<member$Storage>, $argument1: (($0: member, $1: member) => int) | undefined): void {
                                        const __gotots_callee_4 = $argument1;
                                        return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<member$Storage>, member, member$Storage>(($argument0: RuntimeSlice<member$Storage>): RuntimeSlice<member$Storage> => {
                                            return $argument0;
                                        }, ($argument0: member): member => {
                                            return member.$copy($argument0);
                                        }, ($argument0: member$Storage): member => {
                                            return member.$fromStorage($argument0);
                                        }, ($argument0: member): member$Storage => {
                                            return member.$storageOf($argument0);
                                        }, $argument0, __gotots_callee_4 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
                                            return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_4($providerArgument0, $providerArgument1)));
                                        });
                                    }
                                    const __gotots_slice_build_4 = goSliceAllocate<member$Storage>(n, null);
                                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
                                        __gotots_slice_build_4.$initialize(__gotots_slice_build_5, member.$zeroStorage());
                                    }
                                    let members = __gotots_slice_build_4;
                                    const __gotots_receiver_24 = t;
                                    const __gotots_argument_61 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_24).Key();
                                    const __gotots_argument_62 = reflect__from_gostdlib.SliceOf(__gotots_argument_61);
                                    const __gotots_argument_63 = n;
                                    const __gotots_argument_64 = n;
                                    let keys = reflect__from_gostdlib.MakeSlice(__gotots_argument_62, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_63)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_64)));
                                    const __gotots_receiver_25 = t;
                                    const __gotots_argument_65 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_25).Elem();
                                    const __gotots_argument_66 = reflect__from_gostdlib.SliceOf(__gotots_argument_65);
                                    const __gotots_argument_67 = n;
                                    const __gotots_argument_68 = n;
                                    let vals = reflect__from_gostdlib.MakeSlice(__gotots_argument_66, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_67)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_68)));
                                    {
                                        const __gotots_assign_2 = 0;
                                        const __gotots_conversion_38 = addressableValue.$storageOf(va).Value.MapRange();
                                        const __gotots_assign_3 = __gotots_conversion_38 === undefined ? undefined :
                                            tsonicTypeScriptRuntime.boundLocation<reflect__from_gostdlib.MapIter>(__gotots_conversion_38, (): reflect__from_gostdlib.MapIter => {
                                                return __gotots_conversion_38;
                                            }, ($go$providerPointerValue: reflect__from_gostdlib.MapIter): void => {
                                                named_reflect.ReflectMapIterOperations.$assign(__gotots_conversion_38, $go$providerPointerValue);
                                            });
                                        let i = __gotots_assign_2;
                                        let iter: tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter> | undefined = __gotots_assign_3;
                                        let __gotots_for_first_1 = true;
                                        for (;;) {
                                            if (__gotots_for_first_1) {
                                                __gotots_for_first_1 = false;
                                            }
                                            else {
                                                i++;
                                            }
                                            let __gotots_logical_result_5 = i < n;
                                            if (__gotots_logical_result_5) {
                                                const __gotots_receiver_26 = iter;
                                                __gotots_logical_result_5 = reflect__from_gostdlib.MapIter.Next(__gotots_receiver_26 === void 0 ? void 0 :
                                                    (__gotots_receiver_26 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                            }
                                            if (!__gotots_logical_result_5) {
                                                break;
                                            }
                                            {
                                                let k__shadow_1 = addressableValue.$fromStorage({
                                                    Value: keys.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                                                    forcedAddr: true
                                                });
                                                const __gotots_conversion_39 = iter;
                                                addressableValue.$storageOf(k__shadow_1).Value.SetIterKey(__gotots_conversion_39 === undefined ? undefined :
                                                    (__gotots_conversion_39 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                                let v__shadow_1 = addressableValue.$fromStorage({
                                                    Value: vals.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                                                    forcedAddr: true
                                                });
                                                const __gotots_conversion_40 = iter;
                                                addressableValue.$storageOf(v__shadow_1).Value.SetIterValue(__gotots_conversion_40 === undefined ? undefined :
                                                    (__gotots_conversion_40 as tsonicTypeScriptRuntime.Location<reflect__from_gostdlib.MapIter>).value);
                                                const __gotots_callee_5 = marshalKey;
                                                const __gotots_argument_69 = enc;
                                                const __gotots_argument_70 = addressableValue.$copy(k__shadow_1);
                                                const __gotots_argument_71 = mo;
                                                let err: GoInterface | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
                                                if (!(err === undefined)) {
                                                    let __gotots_logical_result_6 = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags());
                                                    if (__gotots_logical_result_6) {
                                                        const __gotots_argument_72 = err;
                                                        const __gotots_argument_73 = $state__jsontext.ErrNonStringName;
                                                        __gotots_logical_result_6 = provider_error.ErrorsIsDirect(__gotots_argument_72, __gotots_argument_73, $goInterface$Interface_Method_Is_Named_error_to_bool$is, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                                                    }
                                                    if (__gotots_logical_result_6 && nillableLegacyKey && addressableValue.$storageOf(k__shadow_1).Value.IsNil()) {
                                                        err = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(""));
                                                    }
                                                    if (!(err === undefined)) {
                                                        {
                                                            const __gotots_results_23 = (($value: GoInterface | undefined): [
                                                                {
                                                                    value: SyntacticError__from_jsontext;
                                                                } | undefined,
                                                                boolean
                                                            ] => {
                                                                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError.$is($value)) {
                                                                    return [void 0, false];
                                                                }
                                                                return [$value.$go$value, true];
                                                            })(err);
                                                            let serr: {
                                                                value: SyntacticError__from_jsontext;
                                                            } | undefined = __gotots_results_23[0];
                                                            let ok = __gotots_results_23[1];
                                                            if (ok && goInterfaceEqual((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err, $state__jsontext.ErrNonStringName)) {
                                                                err = newMarshalErrorBefore(enc, addressableValue.$storageOf(k__shadow_1).Value.Type(), err);
                                                            }
                                                        }
                                                        __gotots_return_0 = err;
                                                        break __gotots_return_block_0;
                                                    }
                                                }
                                                let name = encoderState__from_jsontext.UnwriteOnlyObjectMemberName(xe);
                                                members.set(i, (void member.$storageOf, (void member.$fromStorage,
                                                    {
                                                        name: name,
                                                        key: addressableValue.$storageOf(addressableValue.$copy(k__shadow_1)),
                                                        val: addressableValue.$storageOf(addressableValue.$copy(v__shadow_1))
                                                    })));
                                            }
                                        }
                                    }
                                    SortFunc$SliceOf_Named_member$Named_member(members, (x: member, y: member): int => {
                                        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(member.$storageOf(x).name, member.$storageOf(y).name)));
                                    });
                                    const __gotots_range_1 = members;
                                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                                        const __gotots_range_value_1 = member.$copy(member.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                                        let member__shadow_1 = __gotots_range_value_1;
                                        {
                                            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext(member.$storageOf(member__shadow_1).name));
                                            if (!(err === undefined)) {
                                                __gotots_return_0 = err;
                                                break __gotots_return_block_0;
                                            }
                                        }
                                        {
                                            const __gotots_callee_6 = marshalVal;
                                            const __gotots_argument_74 = enc;
                                            const __gotots_argument_75 = addressableValue.$copy(addressableValue.$fromStorage(member.$storageOf(member__shadow_1).val));
                                            const __gotots_argument_76 = mo;
                                            let err: GoInterface | undefined = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74, __gotots_argument_75, __gotots_argument_76);
                                            if (!(err === undefined)) {
                                                __gotots_return_0 = err;
                                                break __gotots_return_block_0;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    {
                        let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndObject)));
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
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                    case "emitnull":
                    case "emitempty": {
                        break;
                    }
                    default: {
                        return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
                        break;
                    }
                }
            }
        }
        const __gotots_results_24 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_24[0];
        let err: GoInterface | undefined = __gotots_results_24[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = tok.Kind();
        switch (k) {
            case 110: {
                addressableValue.$storageOf(va).Value.SetZero();
                return void 0;
                break;
            }
            case 123: {
                sync__from_gostdlib.Once.Do(once, init__shadow_1);
                if (addressableValue.$storageOf(va).Value.IsNil()) {
                    addressableValue.$storageOf(va).Value.Set(reflect__from_gostdlib.MakeMap(t));
                }
                let nonDefaultKey = (keyFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault;
                let unmarshalKey: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (keyFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
                let unmarshalVal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
                if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
                    let ok = false;
                    const __gotots_receiver_28 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers);
                    const __gotots_argument_77 = unmarshalKey;
                    const __gotots_receiver_27 = t;
                    const __gotots_argument_78 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_27).Key();
                    const __gotots_results_25 = typedArshalers$lookup$Named_jsontext$Decoder(__gotots_receiver_28, __gotots_argument_77, __gotots_argument_78);
                    unmarshalKey = __gotots_results_25[0];
                    ok = __gotots_results_25[1];
                    const __gotots_receiver_30 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers);
                    const __gotots_argument_79 = unmarshalVal;
                    const __gotots_receiver_29 = t;
                    const __gotots_argument_80 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_29).Elem();
                    const __gotots_results_26 = typedArshalers$lookup$Named_jsontext$Decoder(__gotots_receiver_30, __gotots_argument_79, __gotots_argument_80);
                    unmarshalVal = __gotots_results_26[0];
                    nonDefaultKey = nonDefaultKey || ok;
                }
                const __gotots_receiver_31 = t;
                const __gotots_argument_81 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_31).Key();
                let k__shadow_1 = newAddressableValue(__gotots_argument_81);
                const __gotots_receiver_32 = t;
                const __gotots_argument_82 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_32).Elem();
                let v = newAddressableValue(__gotots_argument_82);
                if (!nonDefaultKey && mapKeyWithUniqueRepresentation(addressableValue.$storageOf(k__shadow_1).Value.Kind(), Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags()))) {
                    const __gotots_store_11 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens;
                    stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Last"));
                }
                let seen = named_reflect.ReflectValueOperations.$zero();
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Len())) > 0) {
                    seen = reflect__from_gostdlib.MakeMap(reflect__from_gostdlib.MapOf(addressableValue.$storageOf(k__shadow_1).Value.Type(), $state.emptyStructType));
                }
                let errUnmarshal: GoInterface | undefined = void 0;
                for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
                    addressableValue.$storageOf(k__shadow_1).Value.SetZero();
                    const __gotots_callee_8 = unmarshalKey;
                    const __gotots_argument_83 = dec;
                    const __gotots_argument_84 = addressableValue.$copy(k__shadow_1);
                    const __gotots_argument_85 = uo;
                    let err__shadow_1: GoInterface | undefined = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_83, __gotots_argument_84, __gotots_argument_85);
                    if (!(err__shadow_1 === undefined)) {
                        if (isFatalError(err__shadow_1, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                            return err__shadow_1;
                        }
                        {
                            let err__shadow_2: GoInterface | undefined = Decoder__from_jsontext.SkipValue(dec);
                            if (!(err__shadow_2 === undefined)) {
                                return err__shadow_2;
                            }
                        }
                        errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_1]));
                        continue;
                    }
                    let __gotots_logical_result_7 = named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(k__shadow_1).Value.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Interface) && !addressableValue.$storageOf(k__shadow_1).Value.IsNil();
                    if (__gotots_logical_result_7) {
                        const __gotots_receiver_33 = addressableValue.$storageOf(k__shadow_1).Value.Elem().Type();
                        __gotots_logical_result_7 = !goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_33).Comparable();
                    }
                    if (__gotots_logical_result_7) {
                        let err__shadow_2: GoInterface | undefined = newUnmarshalErrorAfter(dec, t, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid incomparable key type %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([addressableValue.$storageOf(k__shadow_1).Value.Elem().Type()]))));
                        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            return err__shadow_2;
                        }
                        {
                            let err2: GoInterface | undefined = Decoder__from_jsontext.SkipValue(dec);
                            if (!(err2 === undefined)) {
                                return err2;
                            }
                        }
                        errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_2]));
                        continue;
                    }
                    {
                        let v2 = addressableValue.$storageOf(va).Value.MapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(k__shadow_1).Value));
                        if (v2.IsValid()) {
                            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && (!seen.IsValid() || seen.MapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(k__shadow_1).Value)).IsValid())) {
                                const __gotots_store_12 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
                                let name = decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "decodeBuffer"));
                                return newDuplicateNameError(Decoder__from_jsontext.StackPointer(dec), RuntimeSlice.nil<uint8>(), goInt64(Decoder__from_jsontext.InputOffset(dec) - len64$SliceOf_byte(name)));
                            }
                            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                                addressableValue.$storageOf(v).Value.Set(named_reflect.ReflectValueOperations.$copy(v2));
                            }
                            else {
                                addressableValue.$storageOf(v).Value.SetZero();
                            }
                        }
                        else {
                            addressableValue.$storageOf(v).Value.SetZero();
                        }
                    }
                    const __gotots_callee_9 = unmarshalVal;
                    const __gotots_argument_86 = dec;
                    const __gotots_argument_87 = addressableValue.$copy(v);
                    const __gotots_argument_88 = uo;
                    err__shadow_1 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86, __gotots_argument_87, __gotots_argument_88);
                    addressableValue.$storageOf(va).Value.SetMapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(k__shadow_1).Value), named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(v).Value));
                    if (seen.IsValid()) {
                        seen.SetMapIndex(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(k__shadow_1).Value), reflect__from_gostdlib.Zero($state.emptyStructType));
                    }
                    if (!(err__shadow_1 === undefined)) {
                        if (isFatalError(err__shadow_1, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                            return err__shadow_1;
                        }
                        errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_1]));
                    }
                }
                {
                    const __gotots_results_27 = Decoder__from_jsontext.ReadToken(dec);
                    let err__shadow_1: GoInterface | undefined = __gotots_results_27[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                return errUnmarshal;
                break;
            }
        }
        return newUnmarshalErrorAfterWithSkipping(dec, t, void 0);
    };
    return fncs;
}
export function mapKeyWithUniqueRepresentation(k: reflect__from_gostdlib.Kind, allowInvalidUTF8: bool): bool {
    switch (named_reflect.ReflectKindValueOperations.$project(k)) {
        case 1n:
        case 2n:
        case 3n:
        case 4n:
        case 5n:
        case 6n:
        case 7n:
        case 8n:
        case 9n:
        case 10n:
        case 11n:
        case 12n: {
            return true;
            break;
        }
        case 24n: {
            return !allowInvalidUTF8;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function makeStructArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let once = named_sync.SyncOnceOperations.$zero();
    let fields = structFields.$zero();
    const fields$location = tsonicTypeScriptRuntime.boundLocation({}, () => fields, fields$next => fields = fields$next);
    let errInit: {
        value: SemanticError;
    } | undefined = void 0;
    let init__shadow_1: (() => void) | undefined = (): void => {
        const __gotots_results_28 = makeStructFields(t);
        fields = __gotots_results_28[0];
        errInit = __gotots_results_28[1];
    };
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        sync__from_gostdlib.Once.Do(once, init__shadow_1);
        if (!(errInit === undefined) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
            return newMarshalErrorBefore(enc, (errInit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType, (errInit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err);
        }
        {
            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginObject)));
            if (!(err === undefined)) {
                return err;
            }
        }
        let seenIdxs = uintSet.$zero();
        let prevIdx = -1;
        const __gotots_store_12 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
        stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Last"));
        const __gotots_range_2 = fields.flattened;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_index_2;
            let i = __gotots_range_value_2;
            let f: tsonicTypeScriptRuntime.Location<structField> | undefined = tsonicTypeScriptRuntime.projectLocation<structField__from_json$Storage, structField>(goSliceAddress<structField__from_json$Storage>(fields.flattened, i), structField.$fromStorage, structField.$storageOf);
            let v = addressableValue.$fromStorage({
                Value: addressableValue.$storageOf(va).Value.Field(BigInt.asIntN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index0))),
                forcedAddr: addressableValue.$storageOf(va).forcedAddr
            });
            if (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.length > 0) {
                v = v.$go$private$json$fieldByIndex(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index, false);
                if (!addressableValue.$storageOf(v).Value.IsValid()) {
                    continue;
                }
            }
            let __gotots_logical_result_10 = ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).omitzero || Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(OmitZeroStructFields$constant__from_jsonflags()));
            if (__gotots_logical_result_10) {
                let __gotots_logical_result_9 = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).isZero === undefined && addressableValue.$storageOf(v).Value.IsZero());
                if (!__gotots_logical_result_9) {
                    let __gotots_logical_result_8 = !(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).isZero === undefined);
                    if (__gotots_logical_result_8) {
                        const __gotots_callee_10 = structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).isZero;
                        const __gotots_argument_87 = addressableValue.$copy(v);
                        __gotots_logical_result_8 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_87);
                    }
                    __gotots_logical_result_9 = (__gotots_logical_result_8);
                }
                __gotots_logical_result_10 = (__gotots_logical_result_9);
            }
            if (__gotots_logical_result_10) {
                continue;
            }
            if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).omitempty && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(OmitEmptyWithLegacySemantics$constant__from_jsonflags()) && isLegacyEmpty(addressableValue.$copy(v))) {
                continue;
            }
            let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
            let nonDefault = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonDefault;
            if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
                let ok = false;
                const __gotots_results_29 = typedArshalers$lookup$Named_jsontext$Encoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers), marshal, structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).typ);
                marshal = __gotots_results_29[0];
                ok = __gotots_results_29[1];
                nonDefault = nonDefault || ok;
            }
            let __gotots_logical_result_11 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).omitempty && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(OmitEmptyWithLegacySemantics$constant__from_jsonflags()) && !nonDefault && !(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).isEmpty === undefined);
            if (__gotots_logical_result_11) {
                const __gotots_callee_11 = structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).isEmpty;
                const __gotots_argument_88 = addressableValue.$copy(v);
                __gotots_logical_result_11 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_88);
            }
            if (__gotots_logical_result_11) {
                continue;
            }
            if (optimizeCommon$bool) {
                let b = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf;
                if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.Length() > 0n) {
                    b = b.append(0, [44]);
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(SpaceAfterComma$constant__from_jsonflags())) {
                        b = b.append(0, [32]);
                    }
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(Multiline$constant__from_jsonflags())) {
                    b = encoderState__from_jsontext.AppendIndent(xe, b, ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.NeedIndent(34));
                }
                let n0 = b.length;
                if (!(void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                    structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).nameNeedEscape) {
                    const __gotots_slice_build_6 = b;
                    const __gotots_slice_build_7 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).quotedName;
                    const __gotots_slice_build_8 = goSliceAllocate<uint8>(__gotots_slice_build_7.length, null);
                    for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_7.length; __gotots_slice_build_9++) {
                        __gotots_slice_build_8.set(__gotots_slice_build_9, __gotots_slice_build_7.charCodeAt(__gotots_slice_build_9));
                    }
                    b = goSliceAppendSlice<uint8>(__gotots_slice_build_6, __gotots_slice_build_8, 0);
                }
                else {
                    const __gotots_argument_89 = b;
                    const __gotots_conversion_41 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).name;
                    const __gotots_conversion_42 = RuntimeSlice.make<uint8>(__gotots_conversion_41.length, null, 0);
                    for (let __gotots_conversion_43 = 0; __gotots_conversion_43 < __gotots_conversion_41.length; __gotots_conversion_43++) {
                        __gotots_conversion_42.set(__gotots_conversion_43, __gotots_conversion_41.charCodeAt(__gotots_conversion_43));
                    }
                    const __gotots_argument_90 = __gotots_conversion_42;
                    const __gotots_store_13 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                    const __gotots_argument_91 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
                    const __gotots_results_30 = AppendQuote__from_jsonwire(__gotots_argument_89, __gotots_argument_90, __gotots_argument_91);
                    b = __gotots_results_30[0];
                }
                ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = b;
                const __gotots_store_14 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state;
                objectNameStack__from_jsontext.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Names"), n0);
                const __gotots_store_15 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Last"));
            }
            else {
                {
                    let err__shadow_1: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, String__from_jsontext((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).name));
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
            }
            let flagsOriginal = Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags));
            if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).__go_string) {
                const __gotots_store_16 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(134217729n));
            }
            if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).format !== "") {
                const __gotots_store_17 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(268435457n));
                (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                    structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).format;
            }
            const __gotots_callee_12 = marshal;
            const __gotots_argument_92 = enc;
            const __gotots_argument_93 = addressableValue.$copy(v);
            const __gotots_argument_94 = mo;
            let err: GoInterface | undefined = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_92, __gotots_argument_93, __gotots_argument_94);
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags = Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$copy(flagsOriginal));
            (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format = "";
            if (!(err === undefined)) {
                return err;
            }
            if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).omitempty && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(OmitEmptyWithLegacySemantics$constant__from_jsonflags())) {
                let prevName: tsonicTypeScriptRuntime.Location<gostring> | undefined = void 0;
                if (prevIdx >= 0) {
                    const __gotots_store_18 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        (void structField.$storageOf, (void structField.$fromStorage,
                            fields.flattened.get(prevIdx))).fieldOptions));
                    prevName =
                        tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "name");
                }
                if (encoderState__from_jsontext.UnwriteEmptyObjectMember(xe, prevName)) {
                    continue;
                }
            }
            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && !(fields.inlinedFallback === undefined)) {
                uintSet.$go$private$json$insert(seenIdxs, globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id))));
            }
            prevIdx = structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id;
        }
        if (!(fields.inlinedFallback === undefined)) {
            let insertUnquotedName: (($0: RuntimeSlice<uint8>) => bool) | undefined;
            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                insertUnquotedName = (name: RuntimeSlice<uint8>): bool => {
                    {
                        let foldedFields = structFields.$go$private$json$lookupByFoldedName(fields$location, name);
                        if (foldedFields.length > 0) {
                            {
                                const __gotots_map_0 = fields.byActualName;
                                const __gotots_conversion_44 = name;
                                let __gotots_conversion_45 = "";
                                for (let __gotots_conversion_46 = 0; __gotots_conversion_46 < __gotots_conversion_44.length; __gotots_conversion_46++) {
                                    __gotots_conversion_45 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_44.get(__gotots_conversion_46)));
                                }
                                const __gotots_map_1 = __gotots_conversion_45;
                                let f: tsonicTypeScriptRuntime.Location<structField> | undefined = __gotots_map_0.lookup(__gotots_map_1);
                                if (!(f === undefined)) {
                                    return uintSet.$go$private$json$insert(seenIdxs, globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id))));
                                }
                            }
                            const __gotots_range_3 = foldedFields;
                            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                                let f: tsonicTypeScriptRuntime.Location<structField> | undefined = __gotots_range_value_3;
                                const __gotots_receiver_34 = f;
                                const __gotots_argument_95 = name;
                                const __gotots_store_19 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                                const __gotots_argument_96 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
                                if (structField.$go$private$json$matchFoldedName(__gotots_receiver_34, __gotots_argument_95, __gotots_argument_96)) {
                                    return uintSet.$go$private$json$insert(seenIdxs, globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id))));
                                }
                            }
                        }
                    }
                    return objectNamespace__from_jsontext.InsertUnquoted(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Namespaces.Last(), name);
                };
            }
            {
                let err: GoInterface | undefined = marshalInlinedFallbackAll(enc, addressableValue.$copy(va), mo, fields.inlinedFallback, insertUnquotedName);
                if (!(err === undefined)) {
                    return err;
                }
            }
        }
        {
            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndObject)));
            if (!(err === undefined)) {
                return err;
            }
        }
        return void 0;
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        let xd: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        const __gotots_results_31 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_31[0];
        let err: GoInterface | undefined = __gotots_results_31[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = tok.Kind();
        switch (k) {
            case 110: {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                    addressableValue.$storageOf(va).Value.SetZero();
                }
                return void 0;
                break;
            }
            case 123: {
                sync__from_gostdlib.Once.Do(once, init__shadow_1);
                if (!(errInit === undefined) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    return newUnmarshalErrorAfter(dec, (errInit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType, (errInit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err);
                }
                let seenIdxs = uintSet.$zero();
                const __gotots_store_20 = ((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens;
                stateEntry__from_jsontext.DisableNamespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Last"));
                let errUnmarshal: GoInterface | undefined = void 0;
                for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
                    let flags = new ValueFlags__from_jsonwire(0);
                    const flags$location6 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next6 => flags = flags$next6);
                    const __gotots_results_32 = decoderState__from_jsontext.ReadValue(xd, flags$location6);
                    let val: Value__from_jsontext = __gotots_results_32[0];
                    let err__shadow_1: GoInterface | undefined = __gotots_results_32[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                    let name = UnquoteMayCopy__from_jsonwire(val.$value, flags.IsVerbatim());
                    const __gotots_map_2 = fields.byActualName;
                    const __gotots_conversion_47 = name;
                    let __gotots_conversion_48 = "";
                    for (let __gotots_conversion_49 = 0; __gotots_conversion_49 < __gotots_conversion_47.length; __gotots_conversion_49++) {
                        __gotots_conversion_48 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_47.get(__gotots_conversion_49)));
                    }
                    const __gotots_map_3 = __gotots_conversion_48;
                    let f: tsonicTypeScriptRuntime.Location<structField> | undefined = __gotots_map_2.lookup(__gotots_map_3);
                    if (f === undefined) {
                        const __gotots_range_4 = structFields.$go$private$json$lookupByFoldedName(fields$location, name);
                        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                            let f2: tsonicTypeScriptRuntime.Location<structField> | undefined = __gotots_range_value_4;
                            const __gotots_receiver_35 = f2;
                            const __gotots_argument_97 = name;
                            const __gotots_store_21 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                            const __gotots_argument_98 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf);
                            if (structField.$go$private$json$matchFoldedName(__gotots_receiver_35, __gotots_argument_97, __gotots_argument_98)) {
                                f = f2;
                                break;
                            }
                        }
                        if (f === undefined) {
                            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(RejectUnknownMembers$constant__from_jsonflags()) && fields.inlinedFallback === undefined) {
                                let err__shadow_2: GoInterface | undefined = newUnmarshalErrorAfter(dec, t, $state.ErrUnknownName);
                                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                                    return err__shadow_2;
                                }
                                errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_2]));
                            }
                            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && !objectNamespace__from_jsontext.InsertUnquoted(((xd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Namespaces.Last(), name)) {
                                return newDuplicateNameError(Decoder__from_jsontext.StackPointer(dec), RuntimeSlice.nil<uint8>(), goInt64(Decoder__from_jsontext.InputOffset(dec) - len64$Named_jsontext$Value(val)));
                            }
                            if (fields.inlinedFallback === undefined) {
                                {
                                    let err__shadow_2: GoInterface | undefined = Decoder__from_jsontext.SkipValue(dec);
                                    if (!(err__shadow_2 === undefined)) {
                                        return err__shadow_2;
                                    }
                                }
                            }
                            else {
                                {
                                    let err__shadow_2: GoInterface | undefined = unmarshalInlinedFallbackNext(dec, addressableValue.$copy(va), uo, fields.inlinedFallback, val.$value, name);
                                    if (!(err__shadow_2 === undefined)) {
                                        if (isFatalError(err__shadow_2, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                                            return err__shadow_2;
                                        }
                                        errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_2]));
                                    }
                                }
                            }
                            continue;
                        }
                    }
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && !uintSet.$go$private$json$insert(seenIdxs, globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id))))) {
                        return newDuplicateNameError(Decoder__from_jsontext.StackPointer(dec), RuntimeSlice.nil<uint8>(), goInt64(Decoder__from_jsontext.InputOffset(dec) - len64$Named_jsontext$Value(val)));
                    }
                    let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
                    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
                        const __gotots_results_33 = typedArshalers$lookup$Named_jsontext$Decoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers), unmarshal, structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).typ);
                        unmarshal = __gotots_results_33[0];
                    }
                    let flagsOriginal = Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags));
                    if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).__go_string) {
                        const __gotots_store_22 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                        Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(134217729n));
                    }
                    if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).format !== "") {
                        const __gotots_store_23 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                        Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(268435457n));
                        (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                            structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).format;
                    }
                    let v = addressableValue.$fromStorage({
                        Value: addressableValue.$storageOf(va).Value.Field(BigInt.asIntN(64, goNumberToBigInt(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index0))),
                        forcedAddr: addressableValue.$storageOf(va).forcedAddr
                    });
                    if (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.length > 0) {
                        v = v.$go$private$json$fieldByIndex(structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index, true);
                        if (!addressableValue.$storageOf(v).Value.IsValid()) {
                            let err__shadow_2: GoInterface | undefined = newUnmarshalErrorBefore(dec, t, $state.errNilField);
                            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                                return err__shadow_2;
                            }
                            errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_2]));
                            unmarshal = (dec__shadow_1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
                                return Decoder__from_jsontext.SkipValue(dec__shadow_1);
                            };
                        }
                    }
                    const __gotots_callee_14 = unmarshal;
                    const __gotots_argument_99 = dec;
                    const __gotots_argument_100 = addressableValue.$copy(v);
                    const __gotots_argument_101 = uo;
                    err__shadow_1 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_99, __gotots_argument_100, __gotots_argument_101);
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags = Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$copy(flagsOriginal));
                    (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format = "";
                    if (!(err__shadow_1 === undefined)) {
                        if (isFatalError(err__shadow_1, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                            return err__shadow_1;
                        }
                        errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_1]));
                    }
                }
                {
                    const __gotots_results_34 = Decoder__from_jsontext.ReadToken(dec);
                    let err__shadow_1: GoInterface | undefined = __gotots_results_34[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                return errUnmarshal;
                break;
            }
        }
        return newUnmarshalErrorAfterWithSkipping(dec, t, void 0);
    };
    return fncs;
}
export function isLegacyEmpty(v: addressableValue): bool {
    switch (named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(v).Value.Kind())) {
        case 1n: {
            return addressableValue.$storageOf(v).Value.Bool() === false;
            break;
        }
        case 2n:
        case 3n:
        case 4n:
        case 5n:
        case 6n: {
            return addressableValue.$storageOf(v).Value.Int() === 0n;
            break;
        }
        case 7n:
        case 8n:
        case 9n:
        case 10n:
        case 11n:
        case 12n: {
            return addressableValue.$storageOf(v).Value.Uint() === 0n;
            break;
        }
        case 13n:
        case 14n: {
            return addressableValue.$storageOf(v).Value.Float() === 0;
            break;
        }
        case 24n:
        case 21n:
        case 23n:
        case 17n: {
            return globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(v).Value.Len())) === 0;
            break;
        }
        case 22n:
        case 20n: {
            return addressableValue.$storageOf(v).Value.IsNil();
            break;
        }
    }
    return false;
}
export function makeSliceArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let once = named_sync.SyncOnceOperations.$zero();
    let valFncs: arshaler | undefined = void 0;
    let init__shadow_1: (() => void) | undefined = (): void => {
        const __gotots_receiver_36 = t;
        const __gotots_argument_102 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_36).Elem();
        valFncs = lookupArshaler(__gotots_argument_102);
    };
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Depth() > startDetectingCyclesAfter$int) {
                        {
                            const __gotots_store_24 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                            const __gotots_argument_103 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "SeenPointers");
                            const __gotots_argument_104 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                            let err: GoInterface | undefined = visitPointer(__gotots_argument_103, __gotots_argument_104);
                            if (!(err === undefined)) {
                                __gotots_return_0 = newMarshalErrorBefore(enc, t, err);
                                break __gotots_return_block_0;
                            }
                        }
                        const __gotots_store_25 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                        const __gotots_argument_105 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "SeenPointers");
                        const __gotots_argument_106 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            leavePointer(__gotots_argument_105, __gotots_argument_106);
                        });
                    }
                    let emitNull = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(FormatNilSliceAsNull$constant__from_jsonflags());
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                            break __gotots_return_block_0;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                            switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                                case "emitnull": {
                                    emitNull = true;
                                    break;
                                }
                                case "emitempty": {
                                    emitNull = false;
                                    break;
                                }
                                default: {
                                    __gotots_return_0 = newInvalidFormatError(new GoInterfaceAdapter(enc), t);
                                    break __gotots_return_block_0;
                                    break;
                                }
                            }
                        }
                    }
                    let n = globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Len()));
                    if (n === 0) {
                        if (emitNull && addressableValue.$storageOf(va).Value.IsNil()) {
                            __gotots_return_0 = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
                            break __gotots_return_block_0;
                        }
                        if (optimizeCommon$bool && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(AnyWhitespace$constant__from_jsonflags()) && !((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Last.NeedObjectName()) {
                            const __gotots_slice_build_10 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.MayAppendDelim(((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf, 91);
                            const __gotots_slice_build_11 = "[]";
                            const __gotots_slice_build_12 = goSliceAllocate<uint8>(__gotots_slice_build_11.length, null);
                            for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_11.length; __gotots_slice_build_13++) {
                                __gotots_slice_build_12.set(__gotots_slice_build_13, __gotots_slice_build_11.charCodeAt(__gotots_slice_build_13));
                            }
                            ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.encodeBuffer.Buf = goSliceAppendSlice<uint8>(__gotots_slice_build_10, __gotots_slice_build_12, 0);
                            const __gotots_store_26 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens;
                            stateEntry__from_jsontext.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Last"));
                            if (encoderState__from_jsontext.NeedFlush(xe)) {
                                __gotots_return_0 = encoderState__from_jsontext.Flush(xe);
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                    }
                    sync__from_gostdlib.Once.Do(once, init__shadow_1);
                    {
                        let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginArray)));
                        if (!(err === undefined)) {
                            __gotots_return_0 = err;
                            break __gotots_return_block_0;
                        }
                    }
                    let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
                    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
                        const __gotots_receiver_38 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers);
                        const __gotots_argument_107 = marshal;
                        const __gotots_receiver_37 = t;
                        const __gotots_argument_108 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_37).Elem();
                        const __gotots_results_35 = typedArshalers$lookup$Named_jsontext$Encoder(__gotots_receiver_38, __gotots_argument_107, __gotots_argument_108);
                        marshal = __gotots_results_35[0];
                    }
                    const __gotots_range_5 = n;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5; __gotots_range_index_5++) {
                        const __gotots_range_value_5 = __gotots_range_index_5;
                        let i = __gotots_range_value_5;
                        let v = addressableValue.$fromStorage({
                            Value: addressableValue.$storageOf(va).Value.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                            forcedAddr: false
                        });
                        {
                            const __gotots_callee_16 = marshal;
                            const __gotots_argument_109 = enc;
                            const __gotots_argument_110 = addressableValue.$copy(v);
                            const __gotots_argument_111 = mo;
                            let err: GoInterface | undefined = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_109, __gotots_argument_110, __gotots_argument_111);
                            if (!(err === undefined)) {
                                __gotots_return_0 = err;
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    {
                        let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndArray)));
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
    };
    let emptySlice = reflect__from_gostdlib.MakeSlice(t, BigInt.asIntN(64, goNumberToBigInt(0)), BigInt.asIntN(64, goNumberToBigInt(0)));
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                switch ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format) {
                    case "emitnull":
                    case "emitempty": {
                        break;
                    }
                    default: {
                        return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
                        break;
                    }
                }
            }
        }
        const __gotots_results_36 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_36[0];
        let err: GoInterface | undefined = __gotots_results_36[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = tok.Kind();
        switch (k) {
            case 110: {
                addressableValue.$storageOf(va).Value.SetZero();
                return void 0;
                break;
            }
            case 91: {
                sync__from_gostdlib.Once.Do(once, init__shadow_1);
                let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
                if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
                    const __gotots_receiver_40 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers);
                    const __gotots_argument_112 = unmarshal;
                    const __gotots_receiver_39 = t;
                    const __gotots_argument_113 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_39).Elem();
                    const __gotots_results_37 = typedArshalers$lookup$Named_jsontext$Decoder(__gotots_receiver_40, __gotots_argument_112, __gotots_argument_113);
                    unmarshal = __gotots_results_37[0];
                }
                let mustZero = true;
                let cap = globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Cap()));
                if (cap > 0) {
                    addressableValue.$storageOf(va).Value.SetLen(BigInt.asIntN(64, goNumberToBigInt(cap)));
                }
                let i = 0;
                let errUnmarshal: GoInterface | undefined = void 0;
                for (; !(Decoder__from_jsontext.PeekKind(dec) === 93);) {
                    if (i === cap) {
                        addressableValue.$storageOf(va).Value.Grow(BigInt.asIntN(64, goNumberToBigInt(1)));
                        cap = globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Cap()));
                        addressableValue.$storageOf(va).Value.SetLen(BigInt.asIntN(64, goNumberToBigInt(cap)));
                        mustZero = false;
                    }
                    let v = addressableValue.$fromStorage({
                        Value: addressableValue.$storageOf(va).Value.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                        forcedAddr: false
                    });
                    i++;
                    if (mustZero && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(v).Value.SetZero();
                    }
                    {
                        const __gotots_callee_18 = unmarshal;
                        const __gotots_argument_114 = dec;
                        const __gotots_argument_115 = addressableValue.$copy(v);
                        const __gotots_argument_116 = uo;
                        let err__shadow_1: GoInterface | undefined = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_114, __gotots_argument_115, __gotots_argument_116);
                        if (!(err__shadow_1 === undefined)) {
                            if (isFatalError(err__shadow_1, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                                addressableValue.$storageOf(va).Value.SetLen(BigInt.asIntN(64, goNumberToBigInt(i)));
                                return err__shadow_1;
                            }
                            errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_1]));
                        }
                    }
                }
                if (i === 0) {
                    addressableValue.$storageOf(va).Value.Set(named_reflect.ReflectValueOperations.$copy(emptySlice));
                }
                else {
                    addressableValue.$storageOf(va).Value.SetLen(BigInt.asIntN(64, goNumberToBigInt(i)));
                }
                {
                    const __gotots_results_38 = Decoder__from_jsontext.ReadToken(dec);
                    let err__shadow_1: GoInterface | undefined = __gotots_results_38[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                return errUnmarshal;
                break;
            }
        }
        return newUnmarshalErrorAfterWithSkipping(dec, t, void 0);
    };
    return fncs;
}
export function makeArrayArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let once = named_sync.SyncOnceOperations.$zero();
    let valFncs: arshaler | undefined = void 0;
    let init__shadow_1: (() => void) | undefined = (): void => {
        const __gotots_receiver_44 = t;
        const __gotots_argument_146 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_44).Elem();
        valFncs = lookupArshaler(__gotots_argument_146);
    };
    const __gotots_receiver_45 = t;
    let n = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_45).Len()));
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        sync__from_gostdlib.Once.Do(once, init__shadow_1);
        {
            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginArray)));
            if (!(err === undefined)) {
                return err;
            }
        }
        let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
            const __gotots_receiver_47 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers);
            const __gotots_argument_147 = marshal;
            const __gotots_receiver_46 = t;
            const __gotots_argument_148 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_46).Elem();
            const __gotots_results_43 = typedArshalers$lookup$Named_jsontext$Encoder(__gotots_receiver_47, __gotots_argument_147, __gotots_argument_148);
            marshal = __gotots_results_43[0];
        }
        const __gotots_range_6 = n;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_index_6;
            let i = __gotots_range_value_6;
            let v = addressableValue.$fromStorage({
                Value: addressableValue.$storageOf(va).Value.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                forcedAddr: addressableValue.$storageOf(va).forcedAddr
            });
            {
                const __gotots_callee_31 = marshal;
                const __gotots_argument_149 = enc;
                const __gotots_argument_150 = addressableValue.$copy(v);
                const __gotots_argument_151 = mo;
                let err: GoInterface | undefined = (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_149, __gotots_argument_150, __gotots_argument_151);
                if (!(err === undefined)) {
                    return err;
                }
            }
        }
        {
            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndArray)));
            if (!(err === undefined)) {
                return err;
            }
        }
        return void 0;
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        const __gotots_results_44 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_44[0];
        let err: GoInterface | undefined = __gotots_results_44[1];
        if (!(err === undefined)) {
            return err;
        }
        let k = tok.Kind();
        switch (k) {
            case 110: {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                    addressableValue.$storageOf(va).Value.SetZero();
                }
                return void 0;
                break;
            }
            case 91: {
                sync__from_gostdlib.Once.Do(once, init__shadow_1);
                let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
                if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
                    const __gotots_receiver_49 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers);
                    const __gotots_argument_152 = unmarshal;
                    const __gotots_receiver_48 = t;
                    const __gotots_argument_153 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_48).Elem();
                    const __gotots_results_45 = typedArshalers$lookup$Named_jsontext$Decoder(__gotots_receiver_49, __gotots_argument_152, __gotots_argument_153);
                    unmarshal = __gotots_results_45[0];
                }
                let i = 0;
                let errUnmarshal: GoInterface | undefined = void 0;
                for (; !(Decoder__from_jsontext.PeekKind(dec) === 93);) {
                    if (i >= n) {
                        {
                            let err__shadow_1: GoInterface | undefined = Decoder__from_jsontext.SkipValue(dec);
                            if (!(err__shadow_1 === undefined)) {
                                return err__shadow_1;
                            }
                        }
                        err = $state.errArrayOverflow;
                        continue;
                    }
                    let v = addressableValue.$fromStorage({
                        Value: addressableValue.$storageOf(va).Value.Index(BigInt.asIntN(64, goNumberToBigInt(i))),
                        forcedAddr: addressableValue.$storageOf(va).forcedAddr
                    });
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags())) {
                        addressableValue.$storageOf(v).Value.SetZero();
                    }
                    {
                        const __gotots_callee_33 = unmarshal;
                        const __gotots_argument_154 = dec;
                        const __gotots_argument_155 = addressableValue.$copy(v);
                        const __gotots_argument_156 = uo;
                        let err__shadow_1: GoInterface | undefined = (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_154, __gotots_argument_155, __gotots_argument_156);
                        if (!(err__shadow_1 === undefined)) {
                            if (isFatalError(err__shadow_1, Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags)))) {
                                return err__shadow_1;
                            }
                            errUnmarshal = Or$Named_error(RuntimeSlice.literal<GoInterface | undefined>([errUnmarshal, err__shadow_1]));
                        }
                    }
                    i++;
                }
                for (; i < n; i++) {
                    addressableValue.$storageOf(va).Value.Index(BigInt.asIntN(64, goNumberToBigInt(i))).SetZero();
                    err = $state.errArrayUnderflow;
                }
                {
                    const __gotots_results_46 = Decoder__from_jsontext.ReadToken(dec);
                    let err__shadow_1: GoInterface | undefined = __gotots_results_46[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                if (!(err === undefined) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(UnmarshalArrayFromAnyLength$constant__from_jsonflags())) {
                    return newUnmarshalErrorAfter(dec, t, err);
                }
                return errUnmarshal;
                break;
            }
        }
        return newUnmarshalErrorAfterWithSkipping(dec, t, void 0);
    };
    return fncs;
}
export function makePointerArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let once = named_sync.SyncOnceOperations.$zero();
    let valFncs: arshaler | undefined = void 0;
    let init__shadow_1: (() => void) | undefined = (): void => {
        const __gotots_receiver_50 = t;
        const __gotots_argument_157 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_50).Elem();
        valFncs = lookupArshaler(__gotots_argument_157);
    };
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let xe: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(enc);
                    if (((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.Depth() > startDetectingCyclesAfter$int) {
                        {
                            const __gotots_store_28 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                            const __gotots_argument_158 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "SeenPointers");
                            const __gotots_argument_159 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                            let err: GoInterface | undefined = visitPointer(__gotots_argument_158, __gotots_argument_159);
                            if (!(err === undefined)) {
                                __gotots_return_0 = newMarshalErrorBefore(enc, t, err);
                                break __gotots_return_block_0;
                            }
                        }
                        const __gotots_store_29 = ((xe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value;
                        const __gotots_argument_160 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "SeenPointers");
                        const __gotots_argument_161 = named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(va).Value);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            leavePointer(__gotots_argument_160, __gotots_argument_161);
                        });
                    }
                    let __gotots_logical_result_12 = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
                    if (__gotots_logical_result_12) {
                        const __gotots_receiver_51 = t;
                        const __gotots_receiver_52 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_51).Elem();
                        __gotots_logical_result_12 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_52).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
                    }
                    if (__gotots_logical_result_12) {
                        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                            __gotots_return_0 = newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                            break __gotots_return_block_0;
                        }
                        const __gotots_store_30 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                        Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), StringTag$constant__from_jsonflags());
                    }
                    if (addressableValue.$storageOf(va).Value.IsNil()) {
                        __gotots_return_0 = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Once.Do(once, init__shadow_1);
                    let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
                    if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
                        const __gotots_receiver_54 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers);
                        const __gotots_argument_162 = marshal;
                        const __gotots_receiver_53 = t;
                        const __gotots_argument_163 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_53).Elem();
                        const __gotots_results_47 = typedArshalers$lookup$Named_jsontext$Encoder(__gotots_receiver_54, __gotots_argument_162, __gotots_argument_163);
                        marshal = __gotots_results_47[0];
                    }
                    let v = addressableValue.$fromStorage({
                        Value: addressableValue.$storageOf(va).Value.Elem(),
                        forcedAddr: false
                    });
                    const __gotots_callee_35 = marshal;
                    const __gotots_argument_164 = enc;
                    const __gotots_argument_165 = addressableValue.$copy(v);
                    const __gotots_argument_166 = mo;
                    __gotots_return_0 = (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_164, __gotots_argument_165, __gotots_argument_166);
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
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Decoder__from_jsontext.PeekKind(dec) === 110) {
            {
                const __gotots_results_48 = Decoder__from_jsontext.ReadToken(dec);
                let err: GoInterface | undefined = __gotots_results_48[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
            addressableValue.$storageOf(va).Value.SetZero();
            return void 0;
        }
        let __gotots_logical_result_13 = Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags());
        if (__gotots_logical_result_13) {
            const __gotots_receiver_55 = t;
            const __gotots_receiver_56 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_55).Elem();
            __gotots_logical_result_13 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_56).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
        }
        if (__gotots_logical_result_13) {
            if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
            }
            const __gotots_store_31 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
            Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), StringTag$constant__from_jsonflags());
        }
        sync__from_gostdlib.Once.Do(once, init__shadow_1);
        let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (valFncs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
            const __gotots_receiver_58 = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers);
            const __gotots_argument_167 = unmarshal;
            const __gotots_receiver_57 = t;
            const __gotots_argument_168 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_57).Elem();
            const __gotots_results_49 = typedArshalers$lookup$Named_jsontext$Decoder(__gotots_receiver_58, __gotots_argument_167, __gotots_argument_168);
            unmarshal = __gotots_results_49[0];
        }
        if (addressableValue.$storageOf(va).Value.IsNil()) {
            const __gotots_receiver_60 = addressableValue.$storageOf(va).Value;
            const __gotots_receiver_59 = t;
            const __gotots_argument_169 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_59).Elem();
            const __gotots_argument_170 = reflect__from_gostdlib.New(__gotots_argument_169);
            __gotots_receiver_60.Set(__gotots_argument_170);
        }
        let v = addressableValue.$fromStorage({
            Value: addressableValue.$storageOf(va).Value.Elem(),
            forcedAddr: false
        });
        {
            const __gotots_callee_37 = unmarshal;
            const __gotots_argument_171 = dec;
            const __gotots_argument_172 = addressableValue.$copy(v);
            const __gotots_argument_173 = uo;
            let err: GoInterface | undefined = (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_171, __gotots_argument_172, __gotots_argument_173);
            if (!(err === undefined)) {
                return err;
            }
        }
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags()) && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
            const __gotots_store_32 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(dec) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
            const __gotots_conversion_50 = decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "decodeBuffer"));
            let __gotots_conversion_51 = "";
            for (let __gotots_conversion_52 = 0; __gotots_conversion_52 < __gotots_conversion_50.length; __gotots_conversion_52++) {
                __gotots_conversion_51 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_50.get(__gotots_conversion_52)));
            }
            const __gotots_binary_operand_14 = __gotots_conversion_51;
            const __gotots_binary_operand_15 = "\"null\"";
            if (__gotots_binary_operand_14 === __gotots_binary_operand_15) {
                addressableValue.$storageOf(va).Value.SetZero();
            }
        }
        return void 0;
    };
    return fncs;
}
export function makeInterfaceArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    let whichMarshaler: reflect__from_gostdlib.Type | undefined = void 0;
    const __gotots_range_7 = $state.allMarshalerTypes;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let iface: reflect__from_gostdlib.Type | undefined = __gotots_range_value_7;
        const __gotots_receiver_61 = t;
        const __gotots_argument_172 = iface;
        if (goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_61).Implements(__gotots_argument_172)) {
            whichMarshaler = t;
            break;
        }
    }
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags())) {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    return newMarshalErrorBefore(enc, t, $state.errInvalidStringTag);
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_store_32 = Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                    Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), StringTag$constant__from_jsonflags());
                }
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new GoInterfaceAdapter(enc), t);
            }
        }
        if (addressableValue.$storageOf(va).Value.IsNil()) {
            return Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
        }
        else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(CallMethodsWithLegacySemantics$constant__from_jsonflags()) && !(whichMarshaler === undefined)) {
            if (named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Elem().Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer) && addressableValue.$storageOf(va).Value.Elem().IsNil()) {
                let v2 = newAddressableValue(whichMarshaler);
                {
                    const __gotots_switch_tag_3 = whichMarshaler;
                    let __gotots_switch_selection_4 = -1;
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_11 = false;
                        if (!__gotots_switch_match_11) {
                            __gotots_switch_match_11 = goInterfaceEqual(__gotots_switch_tag_3, $state.jsonMarshalerToType);
                        }
                        if (__gotots_switch_match_11) {
                            __gotots_switch_selection_4 = 0;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_12 = false;
                        if (!__gotots_switch_match_12) {
                            __gotots_switch_match_12 = goInterfaceEqual(__gotots_switch_tag_3, $state.jsonMarshalerType);
                        }
                        if (__gotots_switch_match_12) {
                            __gotots_switch_selection_4 = 1;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_13 = false;
                        if (!__gotots_switch_match_13) {
                            __gotots_switch_match_13 = goInterfaceEqual(__gotots_switch_tag_3, $state.textAppenderType);
                        }
                        if (__gotots_switch_match_13) {
                            __gotots_switch_selection_4 = 2;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_14 = false;
                        if (!__gotots_switch_match_14) {
                            __gotots_switch_match_14 = goInterfaceEqual(__gotots_switch_tag_3, $state.textMarshalerType);
                        }
                        if (__gotots_switch_match_14) {
                            __gotots_switch_selection_4 = 3;
                        }
                    }
                    switch (__gotots_switch_selection_4) {
                        case 0: {
                            addressableValue.$storageOf(v2).Value.Set(reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_(new $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_((($value: $goInterface$Interface_void | undefined): MarshalerTo | undefined => {
                                if (!MarshalerTo$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value;
                            })(addressableValue.$storageOf(va).Value.Elem().Interface())))));
                            break;
                        }
                        case 1: {
                            addressableValue.$storageOf(v2).Value.Set(reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_(new $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_((($value: $goInterface$Interface_void | undefined): Marshaler | undefined => {
                                if (!Marshaler$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value;
                            })(addressableValue.$storageOf(va).Value.Elem().Interface())))));
                            break;
                        }
                        case 2: {
                            addressableValue.$storageOf(v2).Value.Set(reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_(new $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_((($value: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error | undefined => {
                                if (!$goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value;
                            })(addressableValue.$storageOf(va).Value.Elem().Interface())))));
                            break;
                        }
                        case 3: {
                            addressableValue.$storageOf(v2).Value.Set(reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_(new $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_((($value: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined => {
                                if (!$goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$is($value)) {
                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                }
                                return $value;
                            })(addressableValue.$storageOf(va).Value.Elem().Interface())))));
                            break;
                        }
                    }
                }
                va = addressableValue.$copy(v2);
            }
        }
        let v = newAddressableValue(addressableValue.$storageOf(va).Value.Elem().Type());
        addressableValue.$storageOf(v).Value.Set(addressableValue.$storageOf(va).Value.Elem());
        let marshal: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (lookupArshaler(addressableValue.$storageOf(v).Value.Type()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).marshal;
        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined)) {
            const __gotots_results_50 = typedArshalers$lookup$Named_jsontext$Encoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers), marshal, addressableValue.$storageOf(v).Value.Type());
            marshal = __gotots_results_50[0];
        }
        if (optimizeCommon$bool && goInterfaceEqual(t, $state.anyType) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(402915328n)) && ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers === undefined || !typedArshalers.$storageOf((((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((mo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Marshalers) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>>).value).fromAny)) {
            return marshalValueAny(enc, addressableValue.$storageOf(va).Value.Elem().Interface(), mo);
        }
        const __gotots_callee_38 = marshal;
        const __gotots_argument_173 = enc;
        const __gotots_argument_174 = addressableValue.$copy(v);
        const __gotots_argument_175 = mo;
        return (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_173, __gotots_argument_174, __gotots_argument_175);
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(TagFlags$constant__from_jsonflags())) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringTag$constant__from_jsonflags())) {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
                    return newUnmarshalErrorBeforeWithSkipping(dec, t, $state.errInvalidStringTag);
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(StringifyWithLegacySemantics$constant__from_jsonflags())) {
                    const __gotots_store_33 = Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value);
                    Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), StringTag$constant__from_jsonflags());
                }
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                return newInvalidFormatError(new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(dec), t);
            }
        }
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(MergeWithLegacySemantics$constant__from_jsonflags()) && !addressableValue.$storageOf(va).Value.IsNil()) {
            let e = addressableValue.$storageOf(va).Value.Elem();
            if (named_reflect.ReflectKindValueOperations.$project(e.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer) && !e.IsNil()) {
                if (Decoder__from_jsontext.PeekKind(dec) === 110 && named_reflect.ReflectKindValueOperations.$project(e.Elem().Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer)) {
                    {
                        const __gotots_results_51 = Decoder__from_jsontext.ReadToken(dec);
                        let err__shadow_1: GoInterface | undefined = __gotots_results_51[1];
                        if (!(err__shadow_1 === undefined)) {
                            return err__shadow_1;
                        }
                    }
                    addressableValue.$storageOf(va).Value.Elem().Elem().SetZero();
                    return void 0;
                }
            }
            else {
                addressableValue.$storageOf(va).Value.SetZero();
            }
        }
        if (Decoder__from_jsontext.PeekKind(dec) === 110) {
            {
                const __gotots_results_52 = Decoder__from_jsontext.ReadToken(dec);
                let err__shadow_1: GoInterface | undefined = __gotots_results_52[1];
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            addressableValue.$storageOf(va).Value.SetZero();
            return void 0;
        }
        let v = addressableValue.$zero();
        if (addressableValue.$storageOf(va).Value.IsNil()) {
            if (optimizeCommon$bool && goInterfaceEqual(t, $state.anyType) && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(new Bools__from_jsonflags(268435458n)) && ((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined || !typedArshalers.$storageOf((((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>>).value).fromAny)) {
                const __gotots_results_53 = unmarshalValueAny(dec, uo);
                let v__shadow_1: $goInterface$Interface_void | undefined = __gotots_results_53[0];
                let err__shadow_1: GoInterface | undefined = __gotots_results_53[1];
                if (!(v__shadow_1 === undefined)) {
                    addressableValue.$storageOf(va).Value.Set(reflect__from_gostdlib.ValueOf(v__shadow_1));
                }
                return err__shadow_1;
            }
            let k = Decoder__from_jsontext.PeekKind(dec);
            if (!isAnyType(t)) {
                return newUnmarshalErrorBeforeWithSkipping(dec, t, $state__internal.ErrNilInterface);
            }
            switch (k) {
                case 102:
                case 116: {
                    v = newAddressableValue($state.boolType);
                    break;
                }
                case 34: {
                    v = newAddressableValue($state.stringType);
                    break;
                }
                case 48: {
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(UnmarshalAnyWithRawNumber$constant__from_jsonflags())) {
                        const __gotots_callee_39 = $state__internal.NewRawNumber;
                        const __gotots_argument_176 = (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))();
                        const __gotots_field_1 = reflect__from_gostdlib.ValueOf(__gotots_argument_176).Elem();
                        v = addressableValue.$fromStorage({
                            Value: __gotots_field_1,
                            forcedAddr: true
                        });
                    }
                    else {
                        v = newAddressableValue($state.float64Type);
                    }
                    break;
                }
                case 123: {
                    v = newAddressableValue($state.mapStringAnyType);
                    break;
                }
                case 91: {
                    v = newAddressableValue($state.sliceAnyType);
                    break;
                }
                default: {
                    const __gotots_results_54 = Decoder__from_jsontext.ReadValue(dec);
                    let err__shadow_1: GoInterface | undefined = __gotots_results_54[1];
                    return err__shadow_1;
                    break;
                }
            }
        }
        else {
            v = newAddressableValue(addressableValue.$storageOf(va).Value.Elem().Type());
            addressableValue.$storageOf(v).Value.Set(addressableValue.$storageOf(va).Value.Elem());
        }
        let unmarshal: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = (lookupArshaler(addressableValue.$storageOf(v).Value.Type()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unmarshal;
        if (!((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
            Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers === undefined)) {
            const __gotots_results_55 = typedArshalers$lookup$Named_jsontext$Decoder((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                Struct__from_jsonopts.$storageOf(((uo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Unmarshalers), unmarshal, addressableValue.$storageOf(v).Value.Type());
            unmarshal = __gotots_results_55[0];
        }
        const __gotots_callee_40 = unmarshal;
        const __gotots_argument_177 = dec;
        const __gotots_argument_178 = addressableValue.$copy(v);
        const __gotots_argument_179 = uo;
        let err: GoInterface | undefined = (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_177, __gotots_argument_178, __gotots_argument_179);
        addressableValue.$storageOf(va).Value.Set(named_reflect.ReflectValueOperations.$copy(addressableValue.$storageOf(v).Value));
        return err;
    };
    return fncs;
}
export function isAnyType(t: reflect__from_gostdlib.Type | undefined): bool {
    let __gotots_logical_result_14 = goInterfaceEqual(t, $state.anyType);
    if (!__gotots_logical_result_14) {
        const __gotots_receiver_62 = $state.anyType;
        const __gotots_argument_180 = t;
        __gotots_logical_result_14 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_62).Implements(__gotots_argument_180);
    }
    return __gotots_logical_result_14;
}
export function makeInvalidArshaler(t: reflect__from_gostdlib.Type | undefined): arshaler | undefined {
    let fncs = arshaler.$zero();
    fncs.marshal = (enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, va: addressableValue, mo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        return newMarshalErrorBefore(enc, t, void 0);
    };
    fncs.unmarshal = (dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, va: addressableValue, uo: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
        return newUnmarshalErrorBefore(dec, t, void 0);
    };
    return fncs;
}
export function stringOrNumberKind(isString: bool): Kind__from_jsontext {
    if (isString) {
        return 34;
    }
    else {
        return 48;
    }
}
export class uintSet64 {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
    static $go$private$json$set(s: tsonicTypeScriptRuntime.Location<uintSet64> | undefined, i: uint): void {
        const __gotots_store_35 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_35.value =
            new uintSet64(goUint64(__gotots_store_35.value.$value |
                ((void uintSet64,
                    i < 0 ? GoPanic.raiseRuntime("negative shift amount") : i >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt(i))) as uint64))));
    }
    $go$private$json$has(i: uint): bool {
        return ((void uintSet64,
            goUint64(this.$value & (new uintSet64(i < 0 ? GoPanic.raiseRuntime("negative shift amount") : i >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt(i)))).$value)) as uint64)
            > 0n;
    }
}
export class uintSet {
    declare private readonly $goType: void;
    public constructor(public lo: uintSet64, public hi: RuntimeSlice<uint64>) {
    }
    static $zero(): uintSet {
        return new uintSet(new uintSet64(0n), RuntimeSlice.nil<uint64>());
    }
    declare private readonly then?: never;
    static $go$private$json$insert(s: uintSet | undefined, i: uint): bool {
        if (i < 64) {
            let has = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lo.$go$private$json$has(i);
            const __gotots_store_34 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            uintSet64.$go$private$json$set(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "lo"), i);
            return !has;
        }
        else {
            i = i - 64;
            const __gotots_assign_16 = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(goNumberIntegerDivide(i, 64))));
            const __gotots_assign_17 = goNumberIntegerRemainder(i, 64);
            let iHi = __gotots_assign_16;
            let iLo = __gotots_assign_17;
            if (iHi >= (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi.length) {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi = goSliceAppendSlice<uint64>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi, RuntimeSlice.make<uint64>(iHi + 1 - (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi.length, null, ((void uintSet64,
                    0n) as uint64)), ((void uintSet64,
                    0n) as uint64));
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi.slice(0, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi.capacity, null);
            }
            let has = new uintSet64((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi.get(iHi)).$go$private$json$has(iLo);
            uintSet64.$go$private$json$set(tsonicTypeScriptRuntime.projectLocation<uint64, uintSet64>(goSliceAddress<uint64>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hi, iHi), ($go$storage: uint64): uintSet64 => {
                return new uintSet64($go$storage);
            }, ($go$value: uintSet64): uint64 => {
                return $go$value.$value;
            }), iLo);
            return !has;
        }
    }
}
