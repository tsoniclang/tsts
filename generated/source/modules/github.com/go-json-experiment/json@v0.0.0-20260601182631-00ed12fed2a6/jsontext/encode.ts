import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { ArshalValues$Storage as ArshalValues__from_jsonopts$Storage, CoderValues$Storage as CoderValues__from_jsonopts$Storage, Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Kind } from "./token.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int64, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { AllowDuplicateNames$constant as AllowDuplicateNames$constant__from_jsonflags, AnyWhitespace$constant as AnyWhitespace$constant__from_jsonflags, CanonicalizeNumbers$constant as CanonicalizeNumbers$constant__from_jsonflags, Flags as Flags__from_jsonflags, Multiline$constant as Multiline$constant__from_jsonflags, OmitTopLevelNewline$constant as OmitTopLevelNewline$constant__from_jsonflags, ReorderRawObjects$constant as ReorderRawObjects$constant__from_jsonflags, SpaceAfterColon$constant as SpaceAfterColon$constant__from_jsonflags, SpaceAfterComma$constant as SpaceAfterComma$constant__from_jsonflags, TagFlags$constant as TagFlags$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, CoderValues as CoderValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { AppendQuote as AppendQuote__from_jsonwire, ConsumeFalse as ConsumeFalse__from_jsonwire, ConsumeLiteral as ConsumeLiteral__from_jsonwire, ConsumeNull as ConsumeNull__from_jsonwire, ConsumeSimpleNumber as ConsumeSimpleNumber__from_jsonwire, ConsumeSimpleString as ConsumeSimpleString__from_jsonwire, ConsumeTrue as ConsumeTrue__from_jsonwire, ConsumeWhitespace as ConsumeWhitespace__from_jsonwire, NeedEscape as NeedEscape__from_jsonwire, ReformatNumber as ReformatNumber__from_jsonwire, ReformatString as ReformatString__from_jsonwire, TrimSuffixByte as TrimSuffixByte__from_jsonwire, TrimSuffixString as TrimSuffixString__from_jsonwire, TrimSuffixWhitespace as TrimSuffixWhitespace__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { NewInvalidCharacterError$Named_jsontext$Value } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/internal/jsonwire/NewInvalidCharacterError.js";
import { $goInterfaceAdapter$PointerTo_Named_bytes$Buffer, $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct, $goInterfaceAdapter$PointerTo_Named_jsontext$ioError, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_jsontext$encoderState as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Interface_void_To_Struct_void as GoMap } from "../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { ioError, wrapSyntacticError, wrapWithArrayIndex, wrapWithObjectName } from "./errors.js";
import { bufferStatistics } from "./pools.js";
import { Pointer, objectNameStack, objectNamespace, objectNamespaceStack, state, stateEntry, stateMachine } from "./state.js";
import { Kind_normalize, Token } from "./token.js";
import { Value, mustReorderObjects } from "./value.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goIntegerDivide, goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class Encoder {
    declare private readonly $goType: void;
    public constructor(public s: encoderState) {
    }
    static $zero(): Encoder {
        return new Encoder(encoderState.$zero());
    }
    static $copy($source: Encoder): Encoder {
        return new Encoder(encoderState.$copy($source.s));
    }
    declare private readonly then?: never;
    static AvailableBuffer(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): RuntimeSlice<uint8> {
        let n = globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.maxValue | 63)))))))) < 0 ? GoPanic.raiseRuntime("negative shift amount") : globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.maxValue | 63)))))))) >= 64 ? 0 : 1 << globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.maxValue | 63))))))));
        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer.capacity < n) {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer = RuntimeSlice.make<uint8>(0, n, 0);
        }
        return ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer;
    }
    static Options(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): Options__from_jsonopts | undefined {
        const __gotots_store_56 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s;
        return new $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Struct"));
    }
    static OutputOffset(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): int64 {
        const __gotots_store_38 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s;
        return encodeBuffer.$go$private$jsontext$previousOffsetEnd(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "encodeBuffer"));
    }
    static StackPointer(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): Pointer {
        const __gotots_store_49 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
        const __gotots_conversion_9 = encoderState.AppendStackPointer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "s"), RuntimeSlice.nil<uint8>(), -1);
        let __gotots_conversion_10 = "";
        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
        }
        return new Pointer(__gotots_conversion_10);
    }
    static WriteToken(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined, t: Token): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_store_0 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
        return encoderState.WriteToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "s"), Token.$copy(t));
    }
    static WriteValue(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined, v: Value): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_store_25 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
        return encoderState.WriteValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "s"), v);
    }
}
export class encoderState {
    declare private readonly $goType: void;
    public constructor(public state: state, public encodeBuffer: encodeBuffer, public Struct: Struct__from_jsonopts, public SeenPointers: GoMapValue<GoInterface | undefined, GoEmptyStruct>) {
    }
    static $zero(): encoderState {
        return new encoderState(state.$zero(), encodeBuffer.$zero(), Struct__from_jsonopts.$zero(), GoMap.nil());
    }
    static $copy($source: encoderState): encoderState {
        return new encoderState(state.$copy($source.state), encodeBuffer.$copy($source.encodeBuffer), Struct__from_jsonopts.$copy($source.Struct), $source.SeenPointers);
    }
    declare private readonly then?: never;
    static AppendIndent(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, b: RuntimeSlice<uint8>, n: int): RuntimeSlice<uint8> {
        if (n === 0) {
            return b;
        }
        b = b.append(0, [10]);
        const __gotots_slice_build_12 = b;
        const __gotots_slice_build_13 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct.CoderValues.IndentPrefix;
        const __gotots_slice_build_14 = goSliceAllocate<uint8>(__gotots_slice_build_13.length, null);
        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_13.length; __gotots_slice_build_15++) {
            __gotots_slice_build_14.set(__gotots_slice_build_15, __gotots_slice_build_13.charCodeAt(__gotots_slice_build_15));
        }
        b = goSliceAppendSlice<uint8>(__gotots_slice_build_12, __gotots_slice_build_14, 0);
        for (; n > 1; n--) {
            const __gotots_slice_build_16 = b;
            const __gotots_slice_build_17 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct.CoderValues.Indent;
            const __gotots_slice_build_18 = goSliceAllocate<uint8>(__gotots_slice_build_17.length, null);
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_17.length; __gotots_slice_build_19++) {
                __gotots_slice_build_18.set(__gotots_slice_build_19, __gotots_slice_build_17.charCodeAt(__gotots_slice_build_19));
            }
            b = goSliceAppendSlice<uint8>(__gotots_slice_build_16, __gotots_slice_build_18, 0);
        }
        return b;
    }
    static AppendRaw(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, k: Kind, safeASCII: bool, appendFn: (($0: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf;
        b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.MayAppendDelim(b, k);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AnyWhitespace$constant__from_jsonflags())) {
            b = encoderState.$go$private$jsontext$appendWhitespace(e, b, k);
        }
        let pos = b.length;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        switch (k) {
            case 34: {
                b = b.append(0, [34]);
                {
                    const __gotots_callee_0 = appendFn;
                    const __gotots_argument_4 = b;
                    const __gotots_results_3 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                    b = __gotots_results_3[0];
                    err = __gotots_results_3[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                }
                b = b.append(0, [34]);
                let isVerbatim = safeASCII || !NeedEscape__from_jsonwire(b.slice(pos + 1, b.length - 1, null));
                if (!isVerbatim) {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    let b2 = goSliceAppendSlice<uint8>(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.availBuffer, b.slice(pos + 1, b.length - 1, null), 0);
                    const __gotots_argument_5 = b.slice(0, pos, null);
                    const __gotots_argument_6 = b2;
                    const __gotots_store_21 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                    const __gotots_argument_7 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                        return Flags__from_jsonflags.$fromStorage($go$storage);
                    }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                        return Flags__from_jsonflags.$storageOf($go$value);
                    });
                    const __gotots_results_4 = AppendQuote__from_jsonwire(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
                    b = __gotots_results_4[0];
                    err__shadow_1 = __gotots_results_4[1];
                    ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.availBuffer = b2.slice(0, 0, null);
                    if (!(err__shadow_1 === undefined)) {
                        return wrapSyntacticError(new GoInterfaceAdapter(e), err__shadow_1, pos, 1);
                    }
                }
                if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.NeedObjectName()) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isValidNamespace()) {
                            return wrapSyntacticError(new GoInterfaceAdapter(e), $state.errInvalidNamespace, pos, 1);
                        }
                        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace() && !objectNamespace.$go$private$jsontext$insertQuoted(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last(), b.slice(pos, null, null), isVerbatim)) {
                            err = wrapWithObjectName($state.ErrDuplicateName, b.slice(pos, null, null));
                            return wrapSyntacticError(new GoInterfaceAdapter(e), err, pos, 1);
                        }
                    }
                    const __gotots_store_22 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    objectNameStack.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Names"), pos);
                }
                {
                    const __gotots_store_23 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = stateMachine.$go$private$jsontext$appendString(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Tokens"));
                    if (!(err__shadow_1 === undefined)) {
                        return wrapSyntacticError(new GoInterfaceAdapter(e), err__shadow_1, pos, 1);
                    }
                }
                break;
            }
            case 48: {
                {
                    const __gotots_callee_1 = appendFn;
                    const __gotots_argument_8 = b;
                    const __gotots_results_5 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                    b = __gotots_results_5[0];
                    err = __gotots_results_5[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                }
                {
                    const __gotots_store_24 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = stateMachine.$go$private$jsontext$appendNumber(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Tokens"));
                    if (!(err__shadow_1 === undefined)) {
                        return wrapSyntacticError(new GoInterfaceAdapter(e), err__shadow_1, pos, 1);
                    }
                }
                break;
            }
            default: {
                const __gotots_argument_9 = new $goInterfaceAdapter$string("BUG: invalid kind");
                GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
                break;
            }
        }
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = b;
        if (encoderState.NeedFlush(e)) {
            return encoderState.Flush(e);
        }
        return void 0;
    }
    static AppendStackPointer(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, b: RuntimeSlice<uint8>, where: int): RuntimeSlice<uint8> {
        const __gotots_store_39 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
        objectNameStack.$go$private$jsontext$copyQuotedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "Names"), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf);
        return ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.$go$private$jsontext$appendStackPointer(b, where);
    }
    static CountNextDelimWhitespace(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): int {
        let n: int = 0;
        const next: Kind = 34;
        let delim = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next);
        if (delim > 0) {
            n += 1;
        }
        if (delim === 58) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterColon$constant__from_jsonflags())) {
                n += 1;
            }
        }
        else {
            if (delim === 44 && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterComma$constant__from_jsonflags())) {
                n += 1;
            }
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                {
                    let m = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.NeedIndent(next);
                    if (m > 0) {
                        n += 1 + CoderValues__from_jsonopts.$storageOf(CoderValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).CoderValues)).IndentPrefix.length + (m - 1) * CoderValues__from_jsonopts.$storageOf(CoderValues__from_jsonopts.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).CoderValues)).Indent.length;
                    }
                }
            }
        }
        return n;
    }
    static Flush(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.wr === undefined || encoderState.$go$private$jsontext$avoidFlush(e)) {
            return void 0;
        }
        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Depth() === 1 && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(OmitTopLevelNewline$constant__from_jsonflags())) {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.append(0, [10]);
        }
        const __gotots_store_26 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
        objectNameStack.$go$private$jsontext$copyQuotedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Names"), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf);
        {
            const __gotots_results_6 = (($value: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): [
                tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_bytes$Buffer.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.wr);
            let bb: tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined = __gotots_results_6[0];
            let ok = __gotots_results_6[1];
            if (ok) {
                const __gotots_receiver_3 = bb;
                const __gotots_results_7 = bytes__from_gostdlib.Buffer.Write(__gotots_receiver_3 === void 0 ? void 0 :
                    (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf);
                const __gotots_results_8 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_7[0])), GoProviderInterfaceBridge.$from(__gotots_results_7[1])] satisfies [
                    int,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ];
                let n__shadow_1 = __gotots_results_8[0];
                const __gotots_store_27 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer;
                __gotots_store_27.baseOffset = goInt64(__gotots_store_27.baseOffset + BigInt.asIntN(64, goNumberToBigInt(n__shadow_1)));
                {
                    const __gotots_receiver_4 = bb;
                    let avail = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Buffer.Available(__gotots_receiver_4 === void 0 ? void 0 :
                        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value)));
                    const __gotots_binary_operand_2 = avail;
                    const __gotots_receiver_5 = bb;
                    const __gotots_binary_operand_0 = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Buffer.Len(__gotots_receiver_5 === void 0 ? void 0 :
                        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value)));
                    const __gotots_binary_operand_1 = 4;
                    const __gotots_binary_operand_3 = goNumberIntegerDivide(__gotots_binary_operand_0, __gotots_binary_operand_1);
                    if (__gotots_binary_operand_2 < __gotots_binary_operand_3) {
                        const __gotots_receiver_6 = bb;
                        bytes__from_gostdlib.Buffer.Grow(__gotots_receiver_6 === void 0 ? void 0 :
                            (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value, BigInt.asIntN(64, goNumberToBigInt(avail + 1)));
                    }
                }
                const __gotots_receiver_7 = bb;
                ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = bytes__from_gostdlib.Buffer.AvailableBuffer(__gotots_receiver_7 === void 0 ? void 0 :
                    (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value);
                return void 0;
            }
        }
        const __gotots_receiver_8 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.wr;
        const __gotots_argument_10 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf;
        const __gotots_results_9 = goInterfaceNonNil<$goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error>(__gotots_receiver_8).Write(__gotots_argument_10);
        let n = __gotots_results_9[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_9[1];
        const __gotots_store_28 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer;
        __gotots_store_28.baseOffset = goInt64(__gotots_store_28.baseOffset + BigInt.asIntN(64, goNumberToBigInt(n)));
        if (!(err === undefined)) {
            if (n > 0) {
                ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(0, RuntimeSlice.copy<uint8>(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(n, null, null)), null);
            }
            return new $goInterfaceAdapter$PointerTo_Named_jsontext$ioError({ value: new ioError("write", err) });
        }
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(0, 0, null);
        const growthSizeFactor$int: int = 2;
        const growthRateFactor$int64: int64 = 2n;
        let grow = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.capacity <= 2048;
        let __gotots_logical_result_0 = grow;
        if (__gotots_logical_result_0) {
            const __gotots_binary_operand_6 = BigInt.asIntN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.capacity));
            const __gotots_store_29 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value;
            const __gotots_binary_operand_4 = encodeBuffer.$go$private$jsontext$previousOffsetEnd(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "encodeBuffer"));
            const __gotots_binary_operand_5 = growthRateFactor$int64;
            const __gotots_binary_operand_7 = goInt64(goIntegerDivide(__gotots_binary_operand_4, __gotots_binary_operand_5));
            __gotots_logical_result_0 = __gotots_binary_operand_6 < __gotots_binary_operand_7;
        }
        grow = __gotots_logical_result_0;
        if (grow) {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = RuntimeSlice.make<uint8>(0, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.capacity * growthSizeFactor$int, 0);
        }
        return void 0;
    }
    static NeedFlush(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): bool {
        return !(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.wr === undefined) && (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Depth() === 1 || ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.length > goNumberIntegerDivide(3 * ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.capacity, 4));
    }
    static UnwriteEmptyObjectMember(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, prevName: tsonicTypeScriptRuntime.Location<gostring> | undefined): bool {
        {
            let last = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last;
            if (!last.$go$private$jsontext$isObject() || !last.NeedObjectName() || last.Length() === 0n) {
                const __gotots_argument_12 = new $goInterfaceAdapter$string("BUG: must be called on an object after writing a value");
                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
            }
        }
        const __gotots_store_32 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value;
        let b = encodeBuffer.$go$private$jsontext$unflushedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "encodeBuffer"));
        let n = 0;
        if (b.length >= 3) {
            const __gotots_conversion_3 = b.slice(b.length - 2, null, null);
            let __gotots_conversion_4 = "";
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
            }
            switch (__gotots_conversion_4) {
                case "ll": {
                    n = 4;
                    break;
                }
                case "\"\"": {
                    if (b.get(b.length - 3) === 92) {
                        return false;
                    }
                    n = 2;
                    break;
                }
                case "{}": {
                    n = 2;
                    break;
                }
                case "[]": {
                    n = 2;
                    break;
                }
            }
        }
        if (n === 0) {
            return false;
        }
        b = b.slice(0, b.length - n, null);
        b = TrimSuffixWhitespace__from_jsonwire(b);
        b = TrimSuffixByte__from_jsonwire(b, 58);
        b = TrimSuffixString__from_jsonwire(b);
        b = TrimSuffixWhitespace__from_jsonwire(b);
        b = TrimSuffixByte__from_jsonwire(b, 44);
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = b;
        const __gotots_store_33 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens;
        stateEntry.$go$private$jsontext$decrement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Last"));
        const __gotots_store_34 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens;
        stateEntry.$go$private$jsontext$decrement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "Last"));
        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
            if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace()) {
                objectNamespace.$go$private$jsontext$removeLast(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last());
            }
        }
        const __gotots_store_35 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
        objectNameStack.$go$private$jsontext$clearLast(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Names"));
        if (!(prevName === undefined)) {
            const __gotots_store_36 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
            objectNameStack.$go$private$jsontext$copyQuotedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "Names"), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf);
            const __gotots_store_37 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
            objectNameStack.$go$private$jsontext$replaceLastUnquotedName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "Names"), ((prevName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value);
        }
        return true;
    }
    static UnwriteOnlyObjectMemberName(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): gostring {
        {
            let last = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last;
            if (!last.$go$private$jsontext$isObject() || last.Length() !== 1n) {
                const __gotots_argument_11 = new $goInterfaceAdapter$string("BUG: must be called on an object after writing first name");
                GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
            }
        }
        let b = TrimSuffixString__from_jsonwire(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf);
        let isVerbatim = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexByte(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(b.length, null, null), 92))) < 0;
        const __gotots_conversion_0 = UnquoteMayCopy__from_jsonwire(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(b.length, null, null), isVerbatim);
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        let name = __gotots_conversion_1;
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = TrimSuffixWhitespace__from_jsonwire(b);
        const __gotots_store_30 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens;
        stateEntry.$go$private$jsontext$decrement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Last"));
        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
            if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace()) {
                objectNamespace.$go$private$jsontext$removeLast(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last());
            }
        }
        const __gotots_store_31 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
        objectNameStack.$go$private$jsontext$clearLast(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Names"));
        return name;
    }
    static WriteToken(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, t: Token): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let k = t.Kind();
        let b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf;
        b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.MayAppendDelim(b, k);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AnyWhitespace$constant__from_jsonflags())) {
            b = encoderState.$go$private$jsontext$appendWhitespace(e, b, k);
        }
        let pos = b.length;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        switch (k) {
            case 110: {
                const __gotots_slice_build_0 = b;
                const __gotots_slice_build_1 = "null";
                const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                }
                b = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                const __gotots_store_1 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Tokens"));
                break;
            }
            case 102: {
                const __gotots_slice_build_4 = b;
                const __gotots_slice_build_5 = "false";
                const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
                    __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
                }
                b = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
                const __gotots_store_2 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Tokens"));
                break;
            }
            case 116: {
                const __gotots_slice_build_8 = b;
                const __gotots_slice_build_9 = "true";
                const __gotots_slice_build_10 = goSliceAllocate<uint8>(__gotots_slice_build_9.length, null);
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_9.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_10.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
                }
                b = goSliceAppendSlice<uint8>(__gotots_slice_build_8, __gotots_slice_build_10, 0);
                const __gotots_store_3 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Tokens"));
                break;
            }
            case 34: {
                {
                    const __gotots_receiver_0 = t;
                    const __gotots_argument_0 = b;
                    const __gotots_store_4 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                    const __gotots_argument_1 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                        return Flags__from_jsonflags.$fromStorage($go$storage);
                    }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                        return Flags__from_jsonflags.$storageOf($go$value);
                    });
                    const __gotots_results_0 = __gotots_receiver_0.$go$private$jsontext$appendString(__gotots_argument_0, __gotots_argument_1);
                    b = __gotots_results_0[0];
                    err = __gotots_results_0[1];
                    if (!(err === undefined)) {
                        break;
                    }
                }
                if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.NeedObjectName()) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isValidNamespace()) {
                            err = $state.errInvalidNamespace;
                            break;
                        }
                        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace() && !objectNamespace.$go$private$jsontext$insertQuoted(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last(), b.slice(pos, null, null), false)) {
                            err = wrapWithObjectName($state.ErrDuplicateName, b.slice(pos, null, null));
                            break;
                        }
                    }
                    const __gotots_store_5 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    objectNameStack.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Names"), pos);
                }
                const __gotots_store_6 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendString(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Tokens"));
                break;
            }
            case 48: {
                {
                    const __gotots_receiver_1 = t;
                    const __gotots_argument_2 = b;
                    const __gotots_store_7 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                    const __gotots_argument_3 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                        return Flags__from_jsonflags.$fromStorage($go$storage);
                    }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                        return Flags__from_jsonflags.$storageOf($go$value);
                    });
                    const __gotots_results_1 = __gotots_receiver_1.$go$private$jsontext$appendNumber(__gotots_argument_2, __gotots_argument_3);
                    b = __gotots_results_1[0];
                    err = __gotots_results_1[1];
                    if (!(err === undefined)) {
                        break;
                    }
                }
                const __gotots_store_8 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendNumber(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Tokens"));
                break;
            }
            case 123: {
                b = b.append(0, [123]);
                {
                    const __gotots_store_9 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                const __gotots_store_10 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                objectNameStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Names"));
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                    const __gotots_store_11 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    objectNamespaceStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Namespaces"));
                }
                const __gotots_store_12 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                    return Flags__from_jsonflags.$fromStorage($go$storage);
                }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                    return Flags__from_jsonflags.$storageOf($go$value);
                }), TagFlags$constant__from_jsonflags());
                break;
            }
            case 125: {
                b = b.append(0, [125]);
                {
                    const __gotots_store_13 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                const __gotots_store_14 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                objectNameStack.$go$private$jsontext$pop(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Names"));
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                    const __gotots_store_15 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    objectNamespaceStack.$go$private$jsontext$pop(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Namespaces"));
                }
                break;
            }
            case 91: {
                b = b.append(0, [91]);
                const __gotots_store_16 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$pushArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Tokens"));
                const __gotots_store_17 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                    return Flags__from_jsonflags.$fromStorage($go$storage);
                }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                    return Flags__from_jsonflags.$storageOf($go$value);
                }), TagFlags$constant__from_jsonflags());
                break;
            }
            case 93: {
                b = b.append(0, [93]);
                const __gotots_store_18 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$popArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Tokens"));
                break;
            }
            default: {
                err = $state.errInvalidToken;
                break;
            }
        }
        if (!(err === undefined)) {
            return wrapSyntacticError(new GoInterfaceAdapter(e), err, pos, 1);
        }
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = b;
        if (encoderState.NeedFlush(e)) {
            return encoderState.Flush(e);
        }
        return void 0;
    }
    static WriteValue(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, v: Value): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_store_40 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer;
        __gotots_store_40.maxValue = __gotots_store_40.maxValue | v.$value.length;
        let k = v.Kind();
        let b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf;
        b = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.MayAppendDelim(b, k);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AnyWhitespace$constant__from_jsonflags())) {
            b = encoderState.$go$private$jsontext$appendWhitespace(e, b, k);
        }
        let pos = b.length;
        let n = 0;
        n += ConsumeWhitespace__from_jsonwire(new Value(v.$value.slice(n, null, null)).$value);
        const __gotots_results_10 = encoderState.$go$private$jsontext$reformatValue(e, b, new Value(v.$value.slice(n, null, null)), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Depth());
        b = __gotots_results_10[0];
        let m = __gotots_results_10[1];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_10[2];
        if (!(err === undefined)) {
            return wrapSyntacticError(new GoInterfaceAdapter(e), err, pos + n + m, 1);
        }
        n += m;
        n += ConsumeWhitespace__from_jsonwire(new Value(v.$value.slice(n, null, null)).$value);
        if (v.$value.length > n) {
            err = NewInvalidCharacterError$Named_jsontext$Value(new Value(v.$value.slice(n, null, null)), "after top-level value");
            return wrapSyntacticError(new GoInterfaceAdapter(e), err, pos + n, 0);
        }
        switch (k) {
            case 110:
            case 102:
            case 116: {
                const __gotots_store_41 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "Tokens"));
                break;
            }
            case 34: {
                if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.NeedObjectName()) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isValidNamespace()) {
                            err = $state.errInvalidNamespace;
                            break;
                        }
                        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace() && !objectNamespace.$go$private$jsontext$insertQuoted(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last(), b.slice(pos, null, null), false)) {
                            err = wrapWithObjectName($state.ErrDuplicateName, b.slice(pos, null, null));
                            break;
                        }
                    }
                    const __gotots_store_42 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    objectNameStack.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "Names"), pos);
                }
                const __gotots_store_43 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendString(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "Tokens"));
                break;
            }
            case 48: {
                const __gotots_store_44 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendNumber(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "Tokens"));
                break;
            }
            case 123: {
                {
                    const __gotots_store_45 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                {
                    const __gotots_store_46 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "Tokens"));
                    if (!(err === undefined)) {
                        const __gotots_binary_operand_8 = "BUG: popObject should never fail immediately after pushObject: ";
                        const __gotots_receiver_9 = err;
                        const __gotots_binary_operand_9 = goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_9).Error();
                        const __gotots_argument_13 = new $goInterfaceAdapter$string(__gotots_binary_operand_8 + __gotots_binary_operand_9);
                        GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
                    }
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(ReorderRawObjects$constant__from_jsonflags())) {
                    mustReorderObjects(b.slice(pos, null, null));
                }
                break;
            }
            case 91: {
                {
                    const __gotots_store_47 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                {
                    const __gotots_store_48 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "Tokens"));
                    if (!(err === undefined)) {
                        const __gotots_binary_operand_10 = "BUG: popArray should never fail immediately after pushArray: ";
                        const __gotots_receiver_10 = err;
                        const __gotots_binary_operand_11 = goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_10).Error();
                        const __gotots_argument_14 = new $goInterfaceAdapter$string(__gotots_binary_operand_10 + __gotots_binary_operand_11);
                        GoPanic.raise(__gotots_argument_14 === undefined ? GoPanicNilValue.create() : __gotots_argument_14);
                    }
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(ReorderRawObjects$constant__from_jsonflags())) {
                    mustReorderObjects(b.slice(pos, null, null));
                }
                break;
            }
        }
        if (!(err === undefined)) {
            return wrapSyntacticError(new GoInterfaceAdapter(e), err, pos, 1);
        }
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = b;
        if (encoderState.NeedFlush(e)) {
            return encoderState.Flush(e);
        }
        return void 0;
    }
    static $go$private$jsontext$appendWhitespace(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, b: RuntimeSlice<uint8>, next: Kind): RuntimeSlice<uint8> {
        {
            let delim = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next);
            if (delim === 58) {
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterColon$constant__from_jsonflags())) {
                    b = b.append(0, [32]);
                }
            }
            else {
                if (delim === 44 && Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterComma$constant__from_jsonflags())) {
                    b = b.append(0, [32]);
                }
                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                    b = encoderState.AppendIndent(e, b, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.NeedIndent(next));
                }
            }
        }
        return b;
    }
    static $go$private$jsontext$avoidFlush(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): bool {
        __gotots_control_target_0: {
            if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.Length() === 0n) {
                return true;
            }
            else if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.$go$private$jsontext$needObjectValue()) {
                return true;
            }
            else if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Tokens.Last.NeedObjectName() && ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.length >= 2) {
                const __gotots_conversion_6 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.slice(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf.length - 2, null, null);
                let __gotots_conversion_7 = "";
                for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                    __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                }
                switch (__gotots_conversion_7) {
                    case "ll":
                    case "\"\"":
                    case "{}":
                    case "[]": {
                        return true;
                        break;
                    }
                }
            }
        }
        return false;
    }
    static $go$private$jsontext$options(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined): tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined {
        const __gotots_store_55 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "Struct");
    }
    static $go$private$jsontext$reformatArray(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, dst: RuntimeSlice<uint8>, src: Value, depth: int): [
        RuntimeSlice<uint8>,
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (src.$value.length === 0 || src.$value.get(0) !== 91) {
            const __gotots_argument_25 = new $goInterfaceAdapter$string("BUG: reformatArray must be called with a buffer that starts with '['");
            GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
        }
        else if (depth === 10001) {
            return [dst, 0, $state.errMaxDepth];
        }
        dst = dst.append(0, [91]);
        let n = 1;
        n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
            return [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        if (src.$value.get(n) === 93) {
            dst = dst.append(0, [93]);
            n += 1;
            return [dst, n, void 0];
        }
        let idx = 0n;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        depth++;
        for (;;) {
            if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                dst = encoderState.AppendIndent(e, dst, depth);
            }
            n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
            if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                return [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
            }
            let m = 0;
            const __gotots_results_25 = encoderState.$go$private$jsontext$reformatValue(e, dst, new Value(src.$value.slice(n, null, null)), depth);
            dst = __gotots_results_25[0];
            m = __gotots_results_25[1];
            err = __gotots_results_25[2];
            if (!(err === undefined)) {
                return [dst, n + m, wrapWithArrayIndex(err, idx)];
            }
            n += m;
            n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
            if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                return [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
            }
            switch (src.$value.get(n)) {
                case 44: {
                    dst = dst.append(0, [44]);
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterComma$constant__from_jsonflags())) {
                        dst = dst.append(0, [32]);
                    }
                    n += 1;
                    idx = goInt64(idx + 1n);
                    continue;
                    break;
                }
                case 93: {
                    if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                        dst = encoderState.AppendIndent(e, dst, depth - 1);
                    }
                    dst = dst.append(0, [93]);
                    n += 1;
                    return [dst, n, void 0];
                    break;
                }
                default: {
                    return [dst, n, NewInvalidCharacterError$Named_jsontext$Value(new Value(src.$value.slice(n, null, null)), "after array value (expecting ',' or ']')")];
                    break;
                }
            }
        }
    }
    static $go$private$jsontext$reformatObject(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, dst: RuntimeSlice<uint8>, src: Value, depth: int): [
        RuntimeSlice<uint8>,
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<uint8>,
            int,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<uint8>(), 0, void 0];
        try {
            try {
                __gotots_return_block_0: {
                    if (src.$value.length === 0 || src.$value.get(0) !== 123) {
                        const __gotots_argument_21 = new $goInterfaceAdapter$string("BUG: reformatObject must be called with a buffer that starts with '{'");
                        GoPanic.raise(__gotots_argument_21 === undefined ? GoPanicNilValue.create() : __gotots_argument_21);
                    }
                    else if (depth === 10001) {
                        __gotots_return_0 = [dst, 0, $state.errMaxDepth];
                        break __gotots_return_block_0;
                    }
                    dst = dst.append(0, [123]);
                    let n = 1;
                    n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                        __gotots_return_0 = [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                        break __gotots_return_block_0;
                    }
                    if (src.$value.get(n) === 125) {
                        dst = dst.append(0, [125]);
                        n += 1;
                        __gotots_return_0 = [dst, n, void 0];
                        break __gotots_return_block_0;
                    }
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    let names: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined = void 0;
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        const __gotots_store_52 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                        objectNamespaceStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Namespaces"));
                        const __gotots_store_53 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state;
                        const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Namespaces");
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            objectNamespaceStack.$go$private$jsontext$pop(__gotots_receiver_11);
                        });
                        names = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.state.Namespaces.Last();
                    }
                    depth++;
                    for (;;) {
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                            dst = encoderState.AppendIndent(e, dst, depth);
                        }
                        n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            __gotots_return_0 = [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                            break __gotots_return_block_0;
                        }
                        let m = ConsumeSimpleString__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                        let isVerbatim = m > 0;
                        if (isVerbatim) {
                            dst = goSliceAppendSlice<uint8>(dst, new Value(src.$value.slice(n, n + m, null)).$value, 0);
                        }
                        else {
                            const __gotots_argument_22 = dst;
                            const __gotots_argument_23 = new Value(src.$value.slice(n, null, null)).$value;
                            const __gotots_store_54 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                            const __gotots_argument_24 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                                return Flags__from_jsonflags.$fromStorage($go$storage);
                            }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                                return Flags__from_jsonflags.$storageOf($go$value);
                            });
                            const __gotots_results_23 = ReformatString__from_jsonwire(__gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
                            dst = __gotots_results_23[0];
                            m = __gotots_results_23[1];
                            err = __gotots_results_23[2];
                            if (!(err === undefined)) {
                                __gotots_return_0 = [dst, n + m, err];
                                break __gotots_return_block_0;
                            }
                        }
                        let quotedName: Value = new Value(src.$value.slice(n, n + m, null));
                        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && !objectNamespace.$go$private$jsontext$insertQuoted(names, quotedName.$value, isVerbatim)) {
                            __gotots_return_0 = [dst, n, wrapWithObjectName($state.ErrDuplicateName, quotedName.$value)];
                            break __gotots_return_block_0;
                        }
                        n += m;
                        n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            __gotots_return_0 = [dst, n, wrapWithObjectName(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF), quotedName.$value)];
                            break __gotots_return_block_0;
                        }
                        if (src.$value.get(n) !== 58) {
                            err = NewInvalidCharacterError$Named_jsontext$Value(new Value(src.$value.slice(n, null, null)), "after object name (expecting ':')");
                            __gotots_return_0 = [dst, n, wrapWithObjectName(err, quotedName.$value)];
                            break __gotots_return_block_0;
                        }
                        dst = dst.append(0, [58]);
                        n += 1;
                        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterColon$constant__from_jsonflags())) {
                            dst = dst.append(0, [32]);
                        }
                        n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            __gotots_return_0 = [dst, n, wrapWithObjectName(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF), quotedName.$value)];
                            break __gotots_return_block_0;
                        }
                        const __gotots_results_24 = encoderState.$go$private$jsontext$reformatValue(e, dst, new Value(src.$value.slice(n, null, null)), depth);
                        dst = __gotots_results_24[0];
                        m = __gotots_results_24[1];
                        err = __gotots_results_24[2];
                        if (!(err === undefined)) {
                            __gotots_return_0 = [dst, n + m, wrapWithObjectName(err, quotedName.$value)];
                            break __gotots_return_block_0;
                        }
                        n += m;
                        n += ConsumeWhitespace__from_jsonwire(new Value(src.$value.slice(n, null, null)).$value);
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.$value.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            __gotots_return_0 = [dst, n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                            break __gotots_return_block_0;
                        }
                        switch (src.$value.get(n)) {
                            case 44: {
                                dst = dst.append(0, [44]);
                                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(SpaceAfterComma$constant__from_jsonflags())) {
                                    dst = dst.append(0, [32]);
                                }
                                n += 1;
                                continue;
                                break;
                            }
                            case 125: {
                                if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
                                    dst = encoderState.AppendIndent(e, dst, depth - 1);
                                }
                                dst = dst.append(0, [125]);
                                n += 1;
                                __gotots_return_0 = [dst, n, void 0];
                                break __gotots_return_block_0;
                                break;
                            }
                            default: {
                                __gotots_return_0 = [dst, n, NewInvalidCharacterError$Named_jsontext$Value(new Value(src.$value.slice(n, null, null)), "after object value (expecting ',' or '}')")];
                                break __gotots_return_block_0;
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
        return __gotots_return_0;
    }
    static $go$private$jsontext$reformatValue(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, dst: RuntimeSlice<uint8>, src: Value, depth: int): [
        RuntimeSlice<uint8>,
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (src.$value.length === 0) {
            return [dst, 0, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        {
            let k = Kind_normalize(src.$value.get(0));
            switch (k) {
                case 110: {
                    if (ConsumeNull__from_jsonwire(src.$value) === 0) {
                        const __gotots_results_11 = ConsumeLiteral__from_jsonwire(src.$value, "null");
                        let n = __gotots_results_11[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_11[1];
                        return [dst, n, err];
                    }
                    const __gotots_slice_build_20 = dst;
                    const __gotots_slice_build_21 = "null";
                    const __gotots_slice_build_22 = goSliceAllocate<uint8>(__gotots_slice_build_21.length, null);
                    for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_21.length; __gotots_slice_build_23++) {
                        __gotots_slice_build_22.set(__gotots_slice_build_23, __gotots_slice_build_21.charCodeAt(__gotots_slice_build_23));
                    }
                    const __gotots_results_12 = goSliceAppendSlice<uint8>(__gotots_slice_build_20, __gotots_slice_build_22, 0);
                    const __gotots_results_13 = 4;
                    const __gotots_results_14 = void 0;
                    return [__gotots_results_12, __gotots_results_13, __gotots_results_14];
                    break;
                }
                case 102: {
                    if (ConsumeFalse__from_jsonwire(src.$value) === 0) {
                        const __gotots_results_15 = ConsumeLiteral__from_jsonwire(src.$value, "false");
                        let n = __gotots_results_15[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_15[1];
                        return [dst, n, err];
                    }
                    const __gotots_slice_build_24 = dst;
                    const __gotots_slice_build_25 = "false";
                    const __gotots_slice_build_26 = goSliceAllocate<uint8>(__gotots_slice_build_25.length, null);
                    for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_25.length; __gotots_slice_build_27++) {
                        __gotots_slice_build_26.set(__gotots_slice_build_27, __gotots_slice_build_25.charCodeAt(__gotots_slice_build_27));
                    }
                    const __gotots_results_16 = goSliceAppendSlice<uint8>(__gotots_slice_build_24, __gotots_slice_build_26, 0);
                    const __gotots_results_17 = 5;
                    const __gotots_results_18 = void 0;
                    return [__gotots_results_16, __gotots_results_17, __gotots_results_18];
                    break;
                }
                case 116: {
                    if (ConsumeTrue__from_jsonwire(src.$value) === 0) {
                        const __gotots_results_19 = ConsumeLiteral__from_jsonwire(src.$value, "true");
                        let n = __gotots_results_19[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_19[1];
                        return [dst, n, err];
                    }
                    const __gotots_slice_build_28 = dst;
                    const __gotots_slice_build_29 = "true";
                    const __gotots_slice_build_30 = goSliceAllocate<uint8>(__gotots_slice_build_29.length, null);
                    for (let __gotots_slice_build_31 = 0; __gotots_slice_build_31 < __gotots_slice_build_29.length; __gotots_slice_build_31++) {
                        __gotots_slice_build_30.set(__gotots_slice_build_31, __gotots_slice_build_29.charCodeAt(__gotots_slice_build_31));
                    }
                    const __gotots_results_20 = goSliceAppendSlice<uint8>(__gotots_slice_build_28, __gotots_slice_build_30, 0);
                    const __gotots_results_21 = 4;
                    const __gotots_results_22 = void 0;
                    return [__gotots_results_20, __gotots_results_21, __gotots_results_22];
                    break;
                }
                case 34: {
                    {
                        let n = ConsumeSimpleString__from_jsonwire(src.$value);
                        if (n > 0) {
                            dst = goSliceAppendSlice<uint8>(dst, new Value(src.$value.slice(0, n, null)).$value, 0);
                            return [dst, n, void 0];
                        }
                    }
                    const __gotots_argument_15 = dst;
                    const __gotots_argument_16 = src.$value;
                    const __gotots_store_50 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                    const __gotots_argument_17 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                        return Flags__from_jsonflags.$fromStorage($go$storage);
                    }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                        return Flags__from_jsonflags.$storageOf($go$value);
                    });
                    return ReformatString__from_jsonwire(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
                    break;
                }
                case 48: {
                    {
                        let n = ConsumeSimpleNumber__from_jsonwire(src.$value);
                        if (n > 0 && !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(CanonicalizeNumbers$constant__from_jsonflags())) {
                            dst = goSliceAppendSlice<uint8>(dst, new Value(src.$value.slice(0, n, null)).$value, 0);
                            return [dst, n, void 0];
                        }
                    }
                    const __gotots_argument_18 = dst;
                    const __gotots_argument_19 = src.$value;
                    const __gotots_store_51 = Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct);
                    const __gotots_argument_20 = tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Flags"), ($go$storage: Flags__from_jsonflags$Storage): Flags__from_jsonflags => {
                        return Flags__from_jsonflags.$fromStorage($go$storage);
                    }, ($go$value: Flags__from_jsonflags): Flags__from_jsonflags$Storage => {
                        return Flags__from_jsonflags.$storageOf($go$value);
                    });
                    return ReformatNumber__from_jsonwire(__gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
                    break;
                }
                case 123: {
                    return encoderState.$go$private$jsontext$reformatObject(e, dst, src, depth);
                    break;
                }
                case 91: {
                    return encoderState.$go$private$jsontext$reformatArray(e, dst, src, depth);
                    break;
                }
                default: {
                    return [dst, 0, NewInvalidCharacterError$Named_jsontext$Value(src, "at start of value")];
                    break;
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$jsontext$reset(e: tsonicTypeScriptRuntime.Location<encoderState> | undefined, b: RuntimeSlice<uint8>, w: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): void {
        const __gotots_store_19 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value;
        state.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "state"));
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer = new encodeBuffer(b, 0n, w, 0, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.availBuffer, bufferStatistics.$copy(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.bufStats));
        {
            const __gotots_results_2 = (($value: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): [
                tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_bytes$Buffer.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(w);
            let bb: tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok && !(bb === undefined)) {
                const __gotots_receiver_2 = bb;
                ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.encodeBuffer.Buf = bytes__from_gostdlib.Buffer.AvailableBuffer(__gotots_receiver_2 === void 0 ? void 0 :
                    (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value);
            }
        }
        let opts2 = Struct__from_jsonopts.$fromStorage({
            Flags: Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$zero()),
            CoderValues: CoderValues__from_jsonopts.$storageOf(CoderValues__from_jsonopts.$zero()),
            ArshalValues: ArshalValues__from_jsonopts.$storageOf(ArshalValues__from_jsonopts.$zero())
        });
        const opts2$location = tsonicTypeScriptRuntime.boundLocation({}, () => opts2, opts2$next => opts2 = opts2$next);
        Struct__from_jsonopts.Join(opts2$location, opts);
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct = Struct__from_jsonopts.$copy(opts2);
        if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value.Struct).Flags).Get(Multiline$constant__from_jsonflags())) {
            const __gotots_store_20 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encoderState>).value;
            Struct__from_jsonopts.InitializeMultiline(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Struct"));
        }
    }
}
export class encodeBuffer {
    declare private readonly $goType: void;
    public constructor(public Buf: RuntimeSlice<uint8>, public baseOffset: int64, public wr: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public maxValue: int, public availBuffer: RuntimeSlice<uint8>, public bufStats: bufferStatistics) {
    }
    static $zero(): encodeBuffer {
        return new encodeBuffer(RuntimeSlice.nil<uint8>(), 0n, void 0, 0, RuntimeSlice.nil<uint8>(), bufferStatistics.$zero());
    }
    static $copy($source: encodeBuffer): encodeBuffer {
        return new encodeBuffer($source.Buf, $source.baseOffset, $source.wr, $source.maxValue, $source.availBuffer, bufferStatistics.$copy($source.bufStats));
    }
    declare private readonly then?: never;
    static $go$private$jsontext$offsetAt(e: tsonicTypeScriptRuntime.Location<encodeBuffer> | undefined, pos: int): int64 {
        return goInt64(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encodeBuffer>).value.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
    }
    static $go$private$jsontext$previousOffsetEnd(e: tsonicTypeScriptRuntime.Location<encodeBuffer> | undefined): int64 {
        return goInt64(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encodeBuffer>).value.baseOffset + BigInt.asIntN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encodeBuffer>).value.Buf.length)));
    }
    static $go$private$jsontext$unflushedBuffer(e: tsonicTypeScriptRuntime.Location<encodeBuffer> | undefined): RuntimeSlice<uint8> {
        return ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<encodeBuffer>).value.Buf;
    }
}
