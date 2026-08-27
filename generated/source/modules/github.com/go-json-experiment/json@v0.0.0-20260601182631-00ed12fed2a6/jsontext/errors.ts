import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { InvalidTextError as InvalidTextError__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import type { $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { decoderState } from "./decode.js";
import type { bool, gostring, int, int64, uint8 } from "@gotots/runtime/scalars.js";
import { Flags as Flags__from_jsonflags, ReportErrorsWithLegacySemantics$constant as ReportErrorsWithLegacySemantics$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { TruncatePointer as TruncatePointer__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { NewInvalidCharacterError$SliceOf_byte } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/internal/jsonwire/NewInvalidCharacterError.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError, $goInterfaceAdapter$PointerTo_Named_jsontext$decoderState, $goInterfaceAdapter$PointerTo_Named_jsontext$ioError, $goInterfaceAdapter$PointerTo_Named_jsonwire$InvalidTextError, $goInterfaceAdapter$PointerTo_Named_jsontext$pointerSuffixError as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { nonComparable, requireKeyedLiterals } from "./doc.js";
import { Pointer, appendEscapePointerName } from "./state.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export const errorPrefix$string: gostring = "jsontext: ";
export class ioError {
    declare private readonly $goType: void;
    public constructor(public action: gostring, public err: GoInterface | undefined) {
    }
    static $copy($source: ioError): ioError {
        return new ioError($source.action, $source.err);
    }
    static $equal($left: ioError, $right: ioError): bool {
        return $left.action === $right.action && goInterfaceEqual($left.err, $right.err);
    }
    static $hash($source: ioError): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.action));
        $hash = GoMapHash.mix($hash, $source.err === undefined ? 0 : $source.err.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Error(e: {
        value: ioError;
    } | undefined): gostring {
        const __gotots_binary_operand_0 = errorPrefix$string + (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.action + " error: ";
        const __gotots_receiver_3 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.err;
        const __gotots_binary_operand_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_3).Error();
        return __gotots_binary_operand_0 + __gotots_binary_operand_1;
    }
    static Unwrap(e: {
        value: ioError;
    } | undefined): GoInterface | undefined {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.err;
    }
}
export class SyntacticError {
    declare private readonly $goType: void;
    public constructor(public requireKeyedLiterals: requireKeyedLiterals, public nonComparable: nonComparable, public ByteOffset: int64, public JSONPointer: Pointer, public Err: GoInterface | undefined) {
    }
    static $zero(): SyntacticError {
        return new SyntacticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), 0n, new Pointer(""), void 0);
    }
    static $copy($source: SyntacticError): SyntacticError {
        return new SyntacticError(requireKeyedLiterals.$copy($source.requireKeyedLiterals), new nonComparable($source.nonComparable.$value.copy()), $source.ByteOffset, $source.JSONPointer, $source.Err);
    }
    declare private readonly then?: never;
    static Error(e: {
        value: SyntacticError;
    } | undefined): gostring {
        let pointer = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSONPointer;
        let offset = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ByteOffset;
        const __gotots_conversion_15 = errorPrefix$string;
        const __gotots_conversion_16 = RuntimeSlice.make<uint8>(__gotots_conversion_15.length, null, 0);
        for (let __gotots_conversion_17 = 0; __gotots_conversion_17 < __gotots_conversion_15.length; __gotots_conversion_17++) {
            __gotots_conversion_16.set(__gotots_conversion_17, __gotots_conversion_15.charCodeAt(__gotots_conversion_17));
        }
        let b = __gotots_conversion_16;
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err === undefined)) {
            const __gotots_argument_3 = b;
            const __gotots_receiver_4 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err;
            const __gotots_argument_4 = goInterfaceNonNil<GoInterface>(__gotots_receiver_4).Error();
            const __gotots_slice_build_0 = __gotots_argument_3;
            const __gotots_slice_build_1 = __gotots_argument_4;
            const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
            }
            b = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
            if (goInterfaceEqual((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err, $state.ErrDuplicateName)) {
                b = strconv__from_gostdlib.AppendQuote(b.append(0, [32]), pointer.LastToken());
                pointer = pointer.Parent();
                offset = 0n;
            }
        }
        else {
            const __gotots_slice_build_4 = b;
            const __gotots_slice_build_5 = "syntactic error";
            const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
                __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
            }
            b = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
        }
        if (!(pointer.$value ===
            ((void Pointer,
                "") as string))) {
            const __gotots_slice_build_8 = b;
            const __gotots_slice_build_9 = " within ";
            const __gotots_slice_build_10 = goSliceAllocate<uint8>(__gotots_slice_build_9.length, null);
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_9.length; __gotots_slice_build_11++) {
                __gotots_slice_build_10.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
            }
            const __gotots_argument_5 = goSliceAppendSlice<uint8>(__gotots_slice_build_8, __gotots_slice_build_10, 0);
            const __gotots_argument_6 = TruncatePointer__from_jsonwire(pointer.$value, 100);
            b = strconv__from_gostdlib.AppendQuote(__gotots_argument_5, __gotots_argument_6);
        }
        if (offset > 0n) {
            const __gotots_slice_build_12 = b;
            const __gotots_slice_build_13 = " after offset ";
            const __gotots_slice_build_14 = goSliceAllocate<uint8>(__gotots_slice_build_13.length, null);
            for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_13.length; __gotots_slice_build_15++) {
                __gotots_slice_build_14.set(__gotots_slice_build_15, __gotots_slice_build_13.charCodeAt(__gotots_slice_build_15));
            }
            const __gotots_argument_7 = goSliceAppendSlice<uint8>(__gotots_slice_build_12, __gotots_slice_build_14, 0);
            const __gotots_argument_8 = offset;
            const __gotots_argument_9 = 10;
            b = strconv__from_gostdlib.AppendInt(__gotots_argument_7, __gotots_argument_8, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_9)));
        }
        const __gotots_conversion_18 = b;
        let __gotots_conversion_19 = "";
        for (let __gotots_conversion_20 = 0; __gotots_conversion_20 < __gotots_conversion_18.length; __gotots_conversion_20++) {
            __gotots_conversion_19 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_18.get(__gotots_conversion_20)));
        }
        return __gotots_conversion_19;
    }
    static Unwrap(e: {
        value: SyntacticError;
    } | undefined): GoInterface | undefined {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Err;
    }
}
export function wrapSyntacticError(state__shadow_1: $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct | undefined, err: GoInterface | undefined, pos: int, where: int): GoInterface | undefined {
    {
        const __gotots_results_1 = (($value: GoInterface | undefined): [
            {
                value: ioError;
            } | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_jsontext$ioError.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(err);
        let ok = __gotots_results_1[1];
        if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)) || ok) {
            return err;
        }
    }
    const __gotots_receiver_0 = state__shadow_1;
    const __gotots_argument_0 = pos;
    let offset = goInterfaceNonNil<$goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct>(__gotots_receiver_0).$go$private$jsontext$offsetAt(__gotots_argument_0);
    const __gotots_receiver_1 = state__shadow_1;
    const __gotots_argument_1 = RuntimeSlice.nil<uint8>();
    const __gotots_argument_2 = where;
    let ptr = goInterfaceNonNil<$goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct>(__gotots_receiver_1).AppendStackPointer(__gotots_argument_1, __gotots_argument_2);
    {
        const __gotots_results_2 = (($value: GoInterface | undefined): [
            {
                value: pointerSuffixError;
            } | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(err);
        let serr: {
            value: pointerSuffixError;
        } | undefined = __gotots_results_2[0];
        let ok = __gotots_results_2[1];
        if (ok) {
            ptr = pointerSuffixError.$go$private$jsontext$appendPointer(serr, ptr);
            err = (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.error;
        }
    }
    {
        const __gotots_results_3 = (($value: $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct | undefined): [
            tsonicTypeScriptRuntime.Location<decoderState> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_jsontext$decoderState.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(state__shadow_1);
        let d: tsonicTypeScriptRuntime.Location<decoderState> | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok && goInterfaceEqual(err, $state.errMismatchDelim)) {
            let where__shadow_1 = "at start of value";
            if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Stack.length > 0 && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.Length() > 0n) {
                __gotots_control_target_0: {
                    if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isArray()) {
                        where__shadow_1 = "after array element (expecting ',' or ']')";
                        const __gotots_conversion_0 = ptr;
                        let __gotots_conversion_1 = "";
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                        }
                        const __gotots_conversion_3 = new Pointer(__gotots_conversion_1).Parent().$value;
                        const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
                        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                            __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
                        }
                        ptr = __gotots_conversion_4;
                    }
                    else if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isObject()) {
                        where__shadow_1 = "after object value (expecting ',' or '}')";
                        const __gotots_conversion_6 = ptr;
                        let __gotots_conversion_7 = "";
                        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                        }
                        const __gotots_conversion_9 = new Pointer(__gotots_conversion_7).Parent().$value;
                        const __gotots_conversion_10 = RuntimeSlice.make<uint8>(__gotots_conversion_9.length, null, 0);
                        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                            __gotots_conversion_10.set(__gotots_conversion_11, __gotots_conversion_9.charCodeAt(__gotots_conversion_11));
                        }
                        ptr = __gotots_conversion_10;
                    }
                }
            }
            err = NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), where__shadow_1);
        }
    }
    const __gotots_receiver_2 = state__shadow_1;
    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((goInterfaceNonNil<$goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct>(__gotots_receiver_2).$go$private$jsontext$options() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct__from_jsonopts>).value).Flags).Get(ReportErrorsWithLegacySemantics$constant__from_jsonflags()) && !goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF))) {
        {
            const __gotots_results_4 = (($value: GoInterface | undefined): [
                {
                    value: InvalidTextError__from_jsonwire;
                } | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsonwire$InvalidTextError.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(err);
            let werr: {
                value: InvalidTextError__from_jsonwire;
            } | undefined = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok && !(werr === undefined)) {
                offset = goInt64(offset + BigInt.asIntN(64, goNumberToBigInt((werr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What.length)));
            }
            else {
                offset = goInt64(offset + 1n);
            }
        }
    }
    const __gotots_field_0 = offset;
    const __gotots_conversion_12 = ptr;
    let __gotots_conversion_13 = "";
    for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
        __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
    }
    const __gotots_field_1 = new Pointer(__gotots_conversion_13);
    return new $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError({ value: new SyntacticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), __gotots_field_0, __gotots_field_1, err) });
}
export class pointerSuffixError {
    declare private readonly $goType: void;
    public constructor(public error: GoInterface | undefined, public reversePointer: RuntimeSlice<uint8>) {
    }
    static $copy($source: pointerSuffixError): pointerSuffixError {
        return new pointerSuffixError($source.error, $source.reversePointer);
    }
    declare private readonly then?: never;
    static $go$private$jsontext$appendPointer(e: {
        value: pointerSuffixError;
    } | undefined, pointer: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
        const __gotots_assign_0 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reversePointer;
        const __gotots_assign_1 = pointer;
        let bi = __gotots_assign_0;
        let bo = __gotots_assign_1;
        for (; bi.length > 0;) {
            let i = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.LastIndexByte(bi, 47)));
            const __gotots_assign_2 = bi.slice(0, i, null);
            const __gotots_assign_3 = goSliceAppendSlice<uint8>(bo, bi.slice(i, null, null), 0);
            bi = __gotots_assign_2;
            bo = __gotots_assign_3;
        }
        return bo;
    }
}
export function wrapWithObjectName(err: GoInterface | undefined, quotedName: RuntimeSlice<uint8>): GoInterface | undefined {
    const __gotots_results_0 = (($value: GoInterface | undefined): [
        {
            value: pointerSuffixError;
        } | undefined,
        boolean
    ] => {
        if (!GoInterfaceAdapter.$is($value)) {
            return [void 0, false];
        }
        return [$value.$go$value, true];
    })(err);
    let serr: {
        value: pointerSuffixError;
    } | undefined = __gotots_results_0[0];
    if (serr === undefined) {
        serr =
            { value: new pointerSuffixError(err, RuntimeSlice.nil<uint8>()) };
    }
    let name = UnquoteMayCopy__from_jsonwire(quotedName, false);
    (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reversePointer = appendEscapePointerName((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reversePointer.append(0, [47]), name);
    return new GoInterfaceAdapter(serr);
}
export function wrapWithArrayIndex(err: GoInterface | undefined, index: int64): GoInterface | undefined {
    const __gotots_results_5 = (($value: GoInterface | undefined): [
        {
            value: pointerSuffixError;
        } | undefined,
        boolean
    ] => {
        if (!GoInterfaceAdapter.$is($value)) {
            return [void 0, false];
        }
        return [$value.$go$value, true];
    })(err);
    let serr: {
        value: pointerSuffixError;
    } | undefined = __gotots_results_5[0];
    if (serr === undefined) {
        serr =
            { value: new pointerSuffixError(err, RuntimeSlice.nil<uint8>()) };
    }
    (serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reversePointer = strconv__from_gostdlib.AppendUint((serr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reversePointer.append(0, [47]), BigInt.asUintN(64, index), BigInt.asIntN(64, goNumberToBigInt(10)));
    return new GoInterfaceAdapter(serr);
}
