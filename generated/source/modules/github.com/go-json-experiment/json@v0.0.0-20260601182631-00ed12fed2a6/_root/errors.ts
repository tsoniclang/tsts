import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Kind as Kind__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int64, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { Flags as Flags__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { AppendUnquote as AppendUnquote__from_jsonwire, TruncatePointer as TruncatePointer__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state as $state__jsontext, Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Pointer as Pointer__from_jsontext, SyntacticError as SyntacticError__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { Or$Named_reflect$Type, Or$int64, Or$string } from "../../../../../support/generics/concretizations/cmp/Or.js";
import { $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct, $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder, $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError, $goInterfaceAdapter$PointerTo_Named_jsontext$decoderState, $goInterfaceAdapter$PointerTo_Named_jsontext$encoderState, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_json$SemanticError as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { $goInterfaceMethod$Options$void_to_Named_jsonopts$Options, $goInterfaceMethod$StackPointer$void_to_Named_jsontext$Pointer } from "../../../../../support/interface-methods.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { decodeBuffer as decodeBuffer__from_jsontext, decoderState as decoderState__from_jsontext } from "../jsontext/decode.js";
import { encoderState as encoderState__from_jsontext } from "../jsontext/encode.js";
import { __go_export as __go_export__from_jsontext } from "../jsontext/export.js";
import { nonComparable, requireKeyedLiterals } from "./doc.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export const errorPrefix$string: gostring = "json: ";
export function isSemanticError(err: GoInterface | undefined): bool {
    const __gotots_results_0 = (($value: GoInterface | undefined): [
        {
            value: SemanticError;
        } | undefined,
        boolean
    ] => {
        if (!GoInterfaceAdapter.$is($value)) {
            return [void 0, false];
        }
        return [$value.$go$value, true];
    })(err);
    let ok = __gotots_results_0[1];
    return ok;
}
export function isSyntacticError(err: GoInterface | undefined): bool {
    const __gotots_results_3 = (($value: GoInterface | undefined): [
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
    let ok = __gotots_results_3[1];
    return ok;
}
export function isFatalError(err: GoInterface | undefined, flags: Flags__from_jsonflags): bool {
    return !flags.Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags()) || isSyntacticError(err) || __go_export__from_jsontext.$fromStorage($state.__go_export).IsIOError(err);
}
export class SemanticError {
    declare private readonly $goType: void;
    public constructor(public requireKeyedLiterals: requireKeyedLiterals, public nonComparable: nonComparable, public action: gostring, public ByteOffset: int64, public JSONPointer: Pointer__from_jsontext, public JSONKind: Kind__from_jsontext, public JSONValue: Value__from_jsontext, public GoType: reflect__from_gostdlib.Type | undefined, public Err: GoInterface | undefined) {
    }
    static $copy($source: SemanticError): SemanticError {
        return new SemanticError(requireKeyedLiterals.$copy($source.requireKeyedLiterals), new nonComparable($source.nonComparable.$value.copy()), $source.action, $source.ByteOffset, $source.JSONPointer, $source.JSONKind, $source.JSONValue, $source.GoType, $source.Err);
    }
    declare private readonly then?: never;
    static Error(e: {
        value: SemanticError;
    } | undefined): gostring {
        let sb = named_strings.StringsBuilderOperations.$zero();
        strings__from_gostdlib.Builder.WriteString(sb, errorPrefix$string);
        const __gotots_receiver_3 = sb;
        const __gotots_callee_0 = $state.errorModalVerb;
        const __gotots_argument_8 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3, __gotots_argument_8);
        let preposition = "";
        switch ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action) {
            case "marshal": {
                strings__from_gostdlib.Builder.WriteString(sb, " marshal");
                preposition = " from";
                break;
            }
            case "unmarshal": {
                strings__from_gostdlib.Builder.WriteString(sb, " unmarshal");
                preposition = " into";
                break;
            }
            default: {
                strings__from_gostdlib.Builder.WriteString(sb, " handle");
                preposition = " with";
                break;
            }
        }
        switch ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONKind) {
            case 110: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON null");
                break;
            }
            case 102:
            case 116: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON boolean");
                break;
            }
            case 34: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON string");
                break;
            }
            case 48: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON number");
                break;
            }
            case 123:
            case 125: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON object");
                break;
            }
            case 91:
            case 93: {
                strings__from_gostdlib.Builder.WriteString(sb, " JSON array");
                break;
            }
            default: {
                if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action === "") {
                    preposition = "";
                }
                break;
            }
        }
        if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONValue.$value.length > 0 && (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONValue.$value.length < 100) {
            strings__from_gostdlib.Builder.WriteByte(sb, 32);
            strings__from_gostdlib.Builder.Write(sb, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONValue.$value);
        }
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType === undefined)) {
            const __gotots_receiver_4 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
            let typeString = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_4).String();
            if (typeString.length > 100) {
                const __gotots_receiver_5 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
                typeString = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_5).Kind().String();
                const __gotots_receiver_6 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
                let __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_6).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct);
                if (__gotots_logical_result_0) {
                    const __gotots_receiver_7 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
                    const __gotots_binary_operand_0 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_7).Name();
                    const __gotots_binary_operand_1 = "";
                    __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
                }
                if (__gotots_logical_result_0) {
                    const __gotots_receiver_8 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
                    const __gotots_range_0 = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_8).NumField()));
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_index_0;
                        let i = __gotots_range_value_0;
                        {
                            const __gotots_receiver_9 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType;
                            const __gotots_argument_9 = i;
                            let pkgPath = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_9).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_9))).PkgPath;
                            if (pkgPath !== "") {
                                typeString = goStringSlice(pkgPath, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(pkgPath, 47))) + 1) + ".struct";
                                break;
                            }
                        }
                    }
                }
            }
            strings__from_gostdlib.Builder.WriteString(sb, preposition);
            strings__from_gostdlib.Builder.WriteString(sb, " Go ");
            strings__from_gostdlib.Builder.WriteString(sb, typeString);
        }
        if (goInterfaceEqual((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err, $state.ErrUnknownName)) {
            strings__from_gostdlib.Builder.WriteString(sb, ": ");
            const __gotots_receiver_11 = sb;
            const __gotots_receiver_10 = $state.ErrUnknownName;
            const __gotots_argument_10 = goInterfaceNonNil<GoInterface>(__gotots_receiver_10).Error();
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_11, __gotots_argument_10);
            strings__from_gostdlib.Builder.WriteString(sb, " ");
            strings__from_gostdlib.Builder.WriteString(sb, strconv__from_gostdlib.Quote((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.LastToken()));
            {
                let parent = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.Parent();
                if (!(parent.$value ===
                    ((void Pointer__from_jsontext,
                        "") as string))) {
                    strings__from_gostdlib.Builder.WriteString(sb, " within ");
                    strings__from_gostdlib.Builder.WriteString(sb, strconv__from_gostdlib.Quote(TruncatePointer__from_jsonwire(parent.$value, 100)));
                }
            }
            return strings__from_gostdlib.Builder.String(sb);
        }
        {
            const __gotots_results_8 = (($value: GoInterface | undefined): [
                {
                    value: SyntacticError__from_jsontext;
                } | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err);
            let serr: {
                value: SyntacticError__from_jsontext;
            } | undefined = __gotots_results_8[0];
            __gotots_control_target_1: {
                if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.$value ===
                    ((void Pointer__from_jsontext,
                        "") as string))) {
                    if (serr === undefined || !(e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.Contains((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer)) {
                        strings__from_gostdlib.Builder.WriteString(sb, " within ");
                        strings__from_gostdlib.Builder.WriteString(sb, strconv__from_gostdlib.Quote(TruncatePointer__from_jsonwire((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.$value, 100)));
                    }
                }
                else if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset > 0n) {
                    if (serr === undefined || !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset <= (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset)) {
                        strings__from_gostdlib.Builder.WriteString(sb, " after offset ");
                        strings__from_gostdlib.Builder.WriteString(sb, strconv__from_gostdlib.FormatInt((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset, BigInt.asIntN(64, goNumberToBigInt(10))));
                    }
                }
            }
        }
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err === undefined)) {
            const __gotots_receiver_12 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err;
            let errString = goInterfaceNonNil<GoInterface>(__gotots_receiver_12).Error();
            if (isSyntacticError((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err)) {
                errString = strings__from_gostdlib.TrimPrefix(errString, "jsontext: ");
            }
            strings__from_gostdlib.Builder.WriteString(sb, ": ");
            strings__from_gostdlib.Builder.WriteString(sb, errString);
        }
        return strings__from_gostdlib.Builder.String(sb);
    }
    static Unwrap(e: {
        value: SemanticError;
    } | undefined): GoInterface | undefined {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err;
    }
}
export interface coder extends GoInterfaceValue {
    Options(): Options__from_jsonopts | undefined;
    StackPointer(): Pointer__from_jsontext;
}
export const coder$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Options$void_to_Named_jsonopts$Options, $goInterfaceMethod$StackPointer$void_to_Named_jsontext$Pointer]);
export function coder$is(value: GoInterfaceValue | undefined): value is coder {
    return value !== undefined && value.$go$implements(coder$contract);
}
export function newInvalidFormatError(c: coder | undefined, t: reflect__from_gostdlib.Type | undefined): GoInterface | undefined {
    const __gotots_argument_5 = "invalid format flag %q";
    const __gotots_receiver_1 = c;
    const __gotots_argument_4 = new $goInterfaceAdapter$string(ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf((((($value: Options__from_jsonopts | undefined): tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_jsonopts$Struct.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(goInterfaceNonNil<coder>(__gotots_receiver_1).Options()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).ArshalValues)).Format);
    const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_4]);
    let err: GoInterface | undefined = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf(__gotots_argument_5, __gotots_argument_6));
    const __gotots_type_switch_1: coder | undefined = c;
    switch (true) {
        case $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder.$is(__gotots_type_switch_1): {
            let c__shadow_1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined = __gotots_type_switch_1.$go$value;
            err = newMarshalErrorBefore(c__shadow_1, t, err);
            break;
        }
        case $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder.$is(__gotots_type_switch_1): {
            let c__shadow_1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = __gotots_type_switch_1.$go$value;
            err = newUnmarshalErrorBeforeWithSkipping(c__shadow_1, t, err);
            break;
        }
    }
    return err;
}
export function newMarshalErrorBefore(e: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    const __gotots_field_0 = "marshal";
    const __gotots_field_1 = t;
    const __gotots_field_2 = toUnexpectedEOF(err);
    const __gotots_field_3 = goInt64(Encoder__from_jsontext.OutputOffset(e) + BigInt.asIntN(64, goNumberToBigInt(encoderState__from_jsontext.CountNextDelimWhitespace(__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(e)))));
    const __gotots_conversion_0 = encoderState__from_jsontext.AppendStackPointer(__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(e), RuntimeSlice.nil<uint8>(), 1);
    let __gotots_conversion_1 = "";
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
    }
    const __gotots_field_4 = new Pointer__from_jsontext(__gotots_conversion_1);
    return new GoInterfaceAdapter({ value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), __gotots_field_0, __gotots_field_3, __gotots_field_4, 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), __gotots_field_1, __gotots_field_2) });
}
export function newUnmarshalErrorBefore(d: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    let k = 0;
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
        k = Decoder__from_jsontext.PeekKind(d);
    }
    const __gotots_field_13 = "unmarshal";
    const __gotots_field_14 = t;
    const __gotots_field_15 = toUnexpectedEOF(err);
    const __gotots_field_16 = goInt64(Decoder__from_jsontext.InputOffset(d) + BigInt.asIntN(64, goNumberToBigInt(decoderState__from_jsontext.CountNextDelimWhitespace(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d)))));
    const __gotots_conversion_12 = decoderState__from_jsontext.AppendStackPointer(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d), RuntimeSlice.nil<uint8>(), 1);
    let __gotots_conversion_13 = "";
    for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
        __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
    }
    const __gotots_field_17 = new Pointer__from_jsontext(__gotots_conversion_13);
    return new GoInterfaceAdapter({ value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), __gotots_field_13, __gotots_field_16, __gotots_field_17, k, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), __gotots_field_14, __gotots_field_15) });
}
export function newUnmarshalErrorBeforeWithSkipping(d: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    err = newUnmarshalErrorBefore(d, t, err);
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
        {
            let err2: GoInterface | undefined = decoderState__from_jsontext.SkipValue(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d));
            if (!(err2 === undefined)) {
                return err2;
            }
        }
    }
    return err;
}
export function newUnmarshalErrorAfter(d: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    const __gotots_store_1 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
    let tokOrVal = decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "decodeBuffer"));
    let byteOffset = goInt64(Decoder__from_jsontext.InputOffset(d) - BigInt.asIntN(64, goNumberToBigInt(tokOrVal.length)));
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
        {
            let k = new Value__from_jsontext(tokOrVal).Kind();
            if (k === 91 || k === 123) {
                byteOffset = goInt64(byteOffset + 1n);
            }
            else {
                byteOffset = goInt64(byteOffset + BigInt.asIntN(64, goNumberToBigInt(tokOrVal.length)));
            }
        }
    }
    const __gotots_field_5 = "unmarshal";
    const __gotots_field_6 = t;
    const __gotots_field_7 = toUnexpectedEOF(err);
    const __gotots_field_8 = byteOffset;
    const __gotots_conversion_6 = decoderState__from_jsontext.AppendStackPointer(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d), RuntimeSlice.nil<uint8>(), -1);
    let __gotots_conversion_7 = "";
    for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
        __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
    }
    const __gotots_field_9 = new Pointer__from_jsontext(__gotots_conversion_7);
    return new GoInterfaceAdapter({ value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), __gotots_field_5, __gotots_field_8, __gotots_field_9, new Value__from_jsontext(tokOrVal).Kind(), new Value__from_jsontext(RuntimeSlice.nil<uint8>()), __gotots_field_6, __gotots_field_7) });
}
export function newUnmarshalErrorAfterWithValue(d: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    let serr: {
        value: SemanticError;
    } | undefined = (($value: GoInterface | undefined): {
        value: SemanticError;
    } | undefined => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(newUnmarshalErrorAfter(d, t, err));
    if ((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONKind === 34 || (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONKind === 48) {
        const __gotots_store_2 = ((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
        (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONValue = new Value__from_jsontext(decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "decodeBuffer"))).Clone();
    }
    return new GoInterfaceAdapter(serr);
}
export function newUnmarshalErrorAfterWithSkipping(d: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, t: reflect__from_gostdlib.Type | undefined, err: GoInterface | undefined): GoInterface | undefined {
    err = newUnmarshalErrorAfter(d, t, err);
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.Struct).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags())) {
        {
            let err2: GoInterface | undefined = decoderState__from_jsontext.SkipValueRemainder(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(d));
            if (!(err2 === undefined)) {
                return err2;
            }
        }
    }
    return err;
}
export function newSemanticErrorWithPosition(c: coder | undefined, t: reflect__from_gostdlib.Type | undefined, prevDepth: int, prevLength: int64, err: GoInterface | undefined): GoInterface | undefined {
    const __gotots_results_4 = (($value: GoInterface | undefined): [
        {
            value: SemanticError;
        } | undefined,
        boolean
    ] => {
        if (!GoInterfaceAdapter.$is($value)) {
            return [void 0, false];
        }
        return [$value.$go$value, true];
    })(err);
    let serr: {
        value: SemanticError;
    } | undefined = __gotots_results_4[0];
    if (serr === undefined) {
        serr =
            { value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), "", 0n, new Pointer__from_jsontext(""), 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), void 0, err) };
    }
    (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err = toUnexpectedEOF((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err);
    let currDepth = 0;
    let currLength = 0n;
    let coderState: $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte | undefined = void 0;
    let offset = 0n;
    const __gotots_type_switch_0: coder | undefined = c;
    switch (true) {
        case $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder.$is(__gotots_type_switch_0): {
            let c__shadow_1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined = __gotots_type_switch_0.$go$value;
            let e: tsonicTypeScriptRuntime.Location<encoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(c__shadow_1);
            (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action = Or$string(RuntimeSlice.literal<gostring>([(serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action, "marshal"]));
            const __gotots_results_5 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState__from_jsontext>).value.state.Tokens.DepthLength();
            currDepth = __gotots_results_5[0];
            currLength = __gotots_results_5[1];
            offset = goInt64(Encoder__from_jsontext.OutputOffset(c__shadow_1) + BigInt.asIntN(64, goNumberToBigInt(encoderState__from_jsontext.CountNextDelimWhitespace(__go_export__from_jsontext.$fromStorage($state.__go_export).Encoder(c__shadow_1)))));
            coderState = new $goInterfaceAdapter$PointerTo_Named_jsontext$encoderState(e);
            break;
        }
        case $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder.$is(__gotots_type_switch_0): {
            let c__shadow_1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = __gotots_type_switch_0.$go$value;
            let d: tsonicTypeScriptRuntime.Location<decoderState__from_jsontext> | undefined = __go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(c__shadow_1);
            (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action = Or$string(RuntimeSlice.literal<gostring>([(serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action, "unmarshal"]));
            const __gotots_results_6 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value.state.Tokens.DepthLength();
            currDepth = __gotots_results_6[0];
            currLength = __gotots_results_6[1];
            const __gotots_store_0 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState__from_jsontext>).value;
            let tokOrVal = decodeBuffer__from_jsontext.PreviousTokenOrValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "decodeBuffer"));
            offset = goInt64(Decoder__from_jsontext.InputOffset(c__shadow_1) - BigInt.asIntN(64, goNumberToBigInt(tokOrVal.length)));
            if ((prevDepth === currDepth && prevLength === currLength) || tokOrVal.length === 0) {
                offset = goInt64(Decoder__from_jsontext.InputOffset(c__shadow_1) + BigInt.asIntN(64, goNumberToBigInt(decoderState__from_jsontext.CountNextDelimWhitespace(__go_export__from_jsontext.$fromStorage($state.__go_export).Decoder(c__shadow_1)))));
            }
            coderState = new $goInterfaceAdapter$PointerTo_Named_jsontext$decoderState(d);
            break;
        }
    }
    (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset = Or$int64(RuntimeSlice.literal<int64>([(serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset, offset]));
    if ((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.$value ===
        ((void Pointer__from_jsontext,
            "") as string)) {
        let where = 0;
        __gotots_control_target_0: {
            if (prevDepth === currDepth && goInt64(prevLength + 0n) === currLength) {
                where = 1;
            }
            else if (prevDepth === currDepth && goInt64(prevLength + 1n) === currLength) {
                where = -1;
            }
        }
        const __gotots_receiver_0 = coderState;
        const __gotots_argument_2 = RuntimeSlice.nil<uint8>();
        const __gotots_argument_3 = where;
        const __gotots_conversion_3 = goInterfaceNonNil<$goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte>(__gotots_receiver_0).AppendStackPointer(__gotots_argument_2, __gotots_argument_3);
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer = new Pointer__from_jsontext(__gotots_conversion_4);
    }
    (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType = Or$Named_reflect$Type(RuntimeSlice.literal<reflect__from_gostdlib.Type | undefined>([(serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoType, t]));
    return new GoInterfaceAdapter(serr);
}
export function collapseSemanticErrors(err: GoInterface | undefined): GoInterface | undefined {
    {
        const __gotots_results_1 = (($value: GoInterface | undefined): [
            {
                value: SemanticError;
            } | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(err);
        let serr1: {
            value: SemanticError;
        } | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok) {
            {
                const __gotots_results_2 = (($value: GoInterface | undefined): [
                    {
                        value: SemanticError;
                    } | undefined,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [void 0, false];
                    }
                    return [$value.$go$value, true];
                })((serr1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err);
                let serr2: {
                    value: SemanticError;
                } | undefined = __gotots_results_2[0];
                let ok__shadow_1 = __gotots_results_2[1];
                if (ok__shadow_1) {
                    (serr2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset = goInt64((serr1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset + (serr2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset);
                    (serr2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer = new Pointer__from_jsontext((serr1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.$value + (serr2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer.$value);
                    void ((serr1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                        SemanticError.$copy(SemanticError.$copy((serr2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value)));
                }
            }
        }
    }
    return err;
}
export function wrapErrUnsupported(err: GoInterface | undefined, what: gostring): GoInterface | undefined {
    const __gotots_argument_0 = err;
    const __gotots_argument_1 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.state.ErrUnsupported);
    if (provider_error.ErrorsIsDirect(__gotots_argument_0, __gotots_argument_1, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
        return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New(what + " may not return errors.ErrUnsupported"));
    }
    return err;
}
export function newDuplicateNameError(ptr: Pointer__from_jsontext, quotedName: RuntimeSlice<uint8>, offset: int64): GoInterface | undefined {
    if (!quotedName.isNil()) {
        const __gotots_results_7 = AppendUnquote__from_jsonwire(RuntimeSlice.nil<uint8>(), quotedName);
        let name = __gotots_results_7[0];
        const __gotots_receiver_2 = ptr;
        const __gotots_conversion_9 = name;
        let __gotots_conversion_10 = "";
        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
        }
        const __gotots_argument_7 = __gotots_conversion_10;
        ptr = __gotots_receiver_2.AppendToken(__gotots_argument_7);
    }
    const __gotots_field_10 = offset;
    const __gotots_field_11 = ptr;
    const __gotots_field_12 = $state__jsontext.ErrDuplicateName;
    const __gotots_struct_0 = SyntacticError__from_jsontext.$zero();
    __gotots_struct_0.ByteOffset = __gotots_field_10;
    __gotots_struct_0.JSONPointer = __gotots_field_11;
    __gotots_struct_0.Err = __gotots_field_12;
    return new $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError({ value: __gotots_struct_0 });
}
export function toUnexpectedEOF(err: GoInterface | undefined): GoInterface | undefined {
    if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF))) {
        return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
    }
    return err;
}
