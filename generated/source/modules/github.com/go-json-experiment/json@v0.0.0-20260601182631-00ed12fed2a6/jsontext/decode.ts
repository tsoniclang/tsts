import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { ArshalValues$Storage as ArshalValues__from_jsonopts$Storage, CoderValues$Storage as CoderValues__from_jsonopts$Storage, Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Kind } from "./token.js";
import type { bool, gostring, int, int64, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { AllowDuplicateNames$constant as AllowDuplicateNames$constant__from_jsonflags, AllowInvalidUTF8$constant as AllowInvalidUTF8$constant__from_jsonflags, Flags as Flags__from_jsonflags, TagFlags$constant as TagFlags$constant__from_jsonflags, WithinArshalCall$constant as WithinArshalCall$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { ArshalValues as ArshalValues__from_jsonopts, CoderValues as CoderValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { ConsumeFalse as ConsumeFalse__from_jsonwire, ConsumeLiteral as ConsumeLiteral__from_jsonwire, ConsumeNull as ConsumeNull__from_jsonwire, ConsumeNumberResumable as ConsumeNumberResumable__from_jsonwire, ConsumeNumberState as ConsumeNumberState__from_jsonwire, ConsumeSimpleNumber as ConsumeSimpleNumber__from_jsonwire, ConsumeSimpleString as ConsumeSimpleString__from_jsonwire, ConsumeStringResumable as ConsumeStringResumable__from_jsonwire, ConsumeTrue as ConsumeTrue__from_jsonwire, ConsumeWhitespace as ConsumeWhitespace__from_jsonwire, ValueFlags as ValueFlags__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { NewInvalidCharacterError$SliceOf_byte } from "../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/internal/jsonwire/NewInvalidCharacterError.js";
import { $goInterfaceAdapter$PointerTo_Named_bytes$Buffer, $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct, $goInterfaceAdapter$PointerTo_Named_jsontext$ioError, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_jsontext$decoderState as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { nonComparable } from "./doc.js";
import { ioError, wrapSyntacticError, wrapWithArrayIndex, wrapWithObjectName } from "./errors.js";
import { Pointer, objectNameStack, objectNamespace, objectNamespaceStack, state, stateMachine } from "./state.js";
import { Kind_normalize, Token, invalidKind$constant } from "./token.js";
import { Value } from "./value.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goIntegerDivide, goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class Decoder {
    declare private readonly $goType: void;
    public constructor(public s: decoderState) {
    }
    static $zero(): Decoder {
        return new Decoder(decoderState.$zero());
    }
    static $copy($source: Decoder): Decoder {
        return new Decoder(decoderState.$copy($source.s));
    }
    declare private readonly then?: never;
    static InputOffset(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): int64 {
        const __gotots_store_18 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s;
        return decodeBuffer.$go$private$jsontext$previousOffsetEnd(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "decodeBuffer"));
    }
    static Options(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): Options__from_jsonopts | undefined {
        const __gotots_store_99 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s;
        return new $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "Struct"));
    }
    static PeekKind(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): Kind {
        const __gotots_store_15 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        return decoderState.PeekKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "s"));
    }
    static ReadToken(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): [
        Token,
        GoInterface | undefined
    ] {
        const __gotots_store_14 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        return decoderState.ReadToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "s"));
    }
    static ReadValue(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): [
        Value,
        GoInterface | undefined
    ] {
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next => flags = flags$next);
        const __gotots_store_13 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        return decoderState.ReadValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "s"), flags$location);
    }
    static Reset(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined, r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): void {
        __gotots_control_target_2: {
            if (d === undefined) {
                const __gotots_argument_9 = new $goInterfaceAdapter$string("jsontext: invalid nil Decoder");
                GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
            }
            else if (r === undefined) {
                const __gotots_argument_10 = new $goInterfaceAdapter$string("jsontext: invalid nil io.Reader");
                GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
            }
            else if (Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.Struct).Flags).Get(WithinArshalCall$constant__from_jsonflags())) {
                const __gotots_argument_11 = new $goInterfaceAdapter$string("jsontext: cannot reset Decoder passed to json.UnmarshalerFrom");
                GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
            }
        }
        let b = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf.slice(0, 0, null);
        {
            const __gotots_results_49 = (($value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
                tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_bytes$Buffer.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.rd);
            let ok = __gotots_results_49[1];
            if (ok) {
                b = RuntimeSlice.nil<uint8>();
            }
        }
        const __gotots_store_98 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        decoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "s"), b, r, opts);
    }
    static SkipValue(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): GoInterface | undefined {
        const __gotots_store_16 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        return decoderState.SkipValue(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "s"));
    }
    static StackPointer(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): Pointer {
        const __gotots_store_17 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        const __gotots_conversion_3 = decoderState.AppendStackPointer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "s"), RuntimeSlice.nil<uint8>(), -1);
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        return new Pointer(__gotots_conversion_4);
    }
    static UnreadBuffer(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): RuntimeSlice<uint8> {
        const __gotots_store_96 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s;
        return decodeBuffer.$go$private$jsontext$unreadBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "decodeBuffer"));
    }
}
export class decoderState {
    declare private readonly $goType: void;
    public constructor(public state: state, public decodeBuffer: decodeBuffer, public Struct: Struct__from_jsonopts, public StringCache: tsonicTypeScriptRuntime.Location<GoArray<gostring, 256>> | undefined) {
    }
    static $zero(): decoderState {
        return new decoderState(state.$zero(), decodeBuffer.$zero(), Struct__from_jsonopts.$zero(), void 0);
    }
    static $copy($source: decoderState): decoderState {
        return new decoderState(state.$copy($source.state), decodeBuffer.$copy($source.decodeBuffer), Struct__from_jsonopts.$copy($source.Struct), $source.StringCache);
    }
    declare private readonly then?: never;
    static AppendStackPointer(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, b: RuntimeSlice<uint8>, where: int): RuntimeSlice<uint8> {
        const __gotots_store_21 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
        objectNameStack.$go$private$jsontext$copyQuotedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Names"), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf);
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.$go$private$jsontext$appendStackPointer(b, where);
    }
    static AtEOF(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): bool {
        const __gotots_results_3 = decoderState.$go$private$jsontext$consumeWhitespace(d, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd);
        let err: GoInterface | undefined = __gotots_results_3[1];
        return goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF));
    }
    static CheckEOF(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): GoInterface | undefined {
        return decoderState.$go$private$jsontext$checkEOF(d, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd);
    }
    static CheckNextValue(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, last: bool): GoInterface | undefined {
        decoderState.PeekKind(d);
        const __gotots_assign_30 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos;
        const __gotots_assign_31 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekErr;
        let pos = __gotots_assign_30;
        let err: GoInterface | undefined = __gotots_assign_31;
        const __gotots_store_94 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        const __gotots_store_95 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        const __gotots_assign_32 = 0;
        const __gotots_assign_33 = void 0;
        __gotots_store_94.peekPos = __gotots_assign_32;
        __gotots_store_95.peekErr = __gotots_assign_33;
        if (!(err === undefined)) {
            return err;
        }
        let flags = new ValueFlags__from_jsonwire(0);
        const flags$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next2 => flags = flags$next2);
        {
            const __gotots_results_42 = decoderState.$go$private$jsontext$consumeValue(d, flags$location2, pos, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth());
            let pos__shadow_1 = __gotots_results_42[0];
            let err__shadow_1: GoInterface | undefined = __gotots_results_42[1];
            if (!(err__shadow_1 === undefined)) {
                return wrapSyntacticError(new GoInterfaceAdapter(d), err__shadow_1, pos__shadow_1, 1);
            }
            else if (last) {
                return decoderState.$go$private$jsontext$checkEOF(d, pos__shadow_1);
            }
        }
        return void 0;
    }
    static CountNextDelimWhitespace(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): int {
        decoderState.PeekKind(d);
        const __gotots_store_19 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        const __gotots_binary_operand_6 = decodeBuffer.$go$private$jsontext$unreadBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "decodeBuffer")).length;
        const __gotots_store_20 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        const __gotots_argument_2 = decodeBuffer.$go$private$jsontext$unreadBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "decodeBuffer"));
        const __gotots_argument_3 = ",: \n\r\t";
        const __gotots_binary_operand_7 = bytes__from_gostdlib.TrimLeft(__gotots_argument_2, __gotots_argument_3).length;
        return __gotots_binary_operand_6 - __gotots_binary_operand_7;
    }
    static PeekKind(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): Kind {
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos > 0) {
            return Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos));
        }
        let err: GoInterface | undefined = void 0;
        const __gotots_store_68 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        decodeBuffer.$go$private$jsontext$invalidatePreviousRead(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "decodeBuffer"));
        let pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd;
        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
        const __gotots_store_69 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "decodeBuffer"), pos)) {
            {
                const __gotots_results_23 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                pos = __gotots_results_23[0];
                err = __gotots_results_23[1];
                if (!(err === undefined)) {
                    if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)) && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() === 1) {
                        err = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                    }
                    const __gotots_store_70 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                    const __gotots_store_71 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                    const __gotots_assign_22 = -1;
                    const __gotots_assign_23 = wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0);
                    __gotots_store_70.peekPos = __gotots_assign_22;
                    __gotots_store_71.peekErr = __gotots_assign_23;
                    return invalidKind$constant();
                }
            }
        }
        let delim = 0;
        {
            let c = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos);
            if (c === 58 || c === 44) {
                delim = c;
                pos += 1;
                pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                const __gotots_store_72 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "decodeBuffer"), pos)) {
                    {
                        const __gotots_results_24 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                        pos = __gotots_results_24[0];
                        err = __gotots_results_24[1];
                        if (!(err === undefined)) {
                            err = wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0);
                            const __gotots_store_73 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                            const __gotots_store_74 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                            const __gotots_assign_24 = -1;
                            const __gotots_assign_25 = decoderState.$go$private$jsontext$checkDelimBeforeIOError(d, delim, err);
                            __gotots_store_73.peekPos = __gotots_assign_24;
                            __gotots_store_74.peekErr = __gotots_assign_25;
                            return invalidKind$constant();
                        }
                    }
                }
            }
        }
        let next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next) !== delim) {
            const __gotots_store_75 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
            const __gotots_store_76 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
            const __gotots_assign_26 = -1;
            const __gotots_assign_27 = decoderState.$go$private$jsontext$checkDelim(d, delim, next);
            __gotots_store_75.peekPos = __gotots_assign_26;
            __gotots_store_76.peekErr = __gotots_assign_27;
            return invalidKind$constant();
        }
        const __gotots_store_77 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        const __gotots_store_78 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        const __gotots_assign_28 = pos;
        const __gotots_assign_29 = void 0;
        __gotots_store_77.peekPos = __gotots_assign_28;
        __gotots_store_78.peekErr = __gotots_assign_29;
        return next;
    }
    static ReadToken(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): [
        Token,
        GoInterface | undefined
    ] {
        let err: GoInterface | undefined = void 0;
        let next = 0;
        let pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos;
        if (pos !== 0) {
            if (!(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekErr === undefined)) {
                let err__shadow_1: GoInterface | undefined = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekErr;
                const __gotots_store_24 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_25 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_2 = 0;
                const __gotots_assign_3 = void 0;
                __gotots_store_24.peekPos = __gotots_assign_2;
                __gotots_store_25.peekErr = __gotots_assign_3;
                return [Token.$fromStorage({
                        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                        raw: void 0,
                        str: "",
                        num: 0n
                    }), err__shadow_1];
            }
            next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos = 0;
        }
        else {
            const __gotots_store_26 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            decodeBuffer.$go$private$jsontext$invalidatePreviousRead(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "decodeBuffer"));
            pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd;
            pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
            const __gotots_store_27 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "decodeBuffer"), pos)) {
                {
                    const __gotots_results_9 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                    pos = __gotots_results_9[0];
                    err = __gotots_results_9[1];
                    if (!(err === undefined)) {
                        if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)) && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() === 1) {
                            err = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                        }
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0)];
                    }
                }
            }
            let delim = 0;
            {
                let c = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos);
                if (c === 58 || c === 44) {
                    delim = c;
                    pos += 1;
                    pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                    const __gotots_store_28 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                    if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "decodeBuffer"), pos)) {
                        {
                            const __gotots_results_10 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                            pos = __gotots_results_10[0];
                            err = __gotots_results_10[1];
                            if (!(err === undefined)) {
                                err = wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0);
                                return [Token.$fromStorage({
                                        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                        raw: void 0,
                                        str: "",
                                        num: 0n
                                    }), decoderState.$go$private$jsontext$checkDelimBeforeIOError(d, delim, err)];
                            }
                        }
                    }
                }
            }
            next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
            if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next) !== delim) {
                return [Token.$fromStorage({
                        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                        raw: void 0,
                        str: "",
                        num: 0n
                    }), decoderState.$go$private$jsontext$checkDelim(d, delim, next)];
            }
        }
        let n = 0;
        switch (next) {
            case 110: {
                if (ConsumeNull__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null)) === 0) {
                    const __gotots_results_11 = decoderState.$go$private$jsontext$consumeLiteral(d, pos, "null");
                    pos = __gotots_results_11[0];
                    err = __gotots_results_11[1];
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                else {
                    pos += 4;
                }
                {
                    const __gotots_store_29 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - 4, 1)];
                    }
                }
                const __gotots_store_30 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_31 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_4 = pos;
                const __gotots_assign_5 = pos;
                __gotots_store_30.prevStart = __gotots_assign_4;
                __gotots_store_31.prevEnd = __gotots_assign_5;
                return [Token.$copy(Token.$fromStorage($state.Null)), void 0];
                break;
            }
            case 102: {
                if (ConsumeFalse__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null)) === 0) {
                    const __gotots_results_12 = decoderState.$go$private$jsontext$consumeLiteral(d, pos, "false");
                    pos = __gotots_results_12[0];
                    err = __gotots_results_12[1];
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                else {
                    pos += 5;
                }
                {
                    const __gotots_store_32 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - 5, 1)];
                    }
                }
                const __gotots_store_33 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_34 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_6 = pos;
                const __gotots_assign_7 = pos;
                __gotots_store_33.prevStart = __gotots_assign_6;
                __gotots_store_34.prevEnd = __gotots_assign_7;
                return [Token.$copy(Token.$fromStorage($state.False)), void 0];
                break;
            }
            case 116: {
                if (ConsumeTrue__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null)) === 0) {
                    const __gotots_results_13 = decoderState.$go$private$jsontext$consumeLiteral(d, pos, "true");
                    pos = __gotots_results_13[0];
                    err = __gotots_results_13[1];
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                else {
                    pos += 4;
                }
                {
                    const __gotots_store_35 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - 4, 1)];
                    }
                }
                const __gotots_store_36 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_37 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_8 = pos;
                const __gotots_assign_9 = pos;
                __gotots_store_36.prevStart = __gotots_assign_8;
                __gotots_store_37.prevEnd = __gotots_assign_9;
                return [Token.$copy(Token.$fromStorage($state.True)), void 0];
                break;
            }
            case 34: {
                let flags = new ValueFlags__from_jsonwire(0);
                const flags$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next3 => flags = flags$next3);
                {
                    n = ConsumeSimpleString__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                    if (n === 0) {
                        let oldAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                        const __gotots_results_14 = decoderState.$go$private$jsontext$consumeString(d, flags$location3, pos);
                        pos = __gotots_results_14[0];
                        err = __gotots_results_14[1];
                        let newAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                        n = globalThis.Number(BigInt.asIntN(64, goInt64(newAbsPos - oldAbsPos)));
                        if (!(err === undefined)) {
                            return [Token.$fromStorage({
                                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                    raw: void 0,
                                    str: "",
                                    num: 0n
                                }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                        }
                    }
                    else {
                        pos += n;
                    }
                }
                if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.NeedObjectName()) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isValidNamespace()) {
                            return [Token.$fromStorage({
                                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                    raw: void 0,
                                    str: "",
                                    num: 0n
                                }), wrapSyntacticError(new GoInterfaceAdapter(d), $state.errInvalidNamespace, pos - n, 1)];
                        }
                        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace() && !objectNamespace.$go$private$jsontext$insertQuoted(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Namespaces.Last(), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, null), flags.IsVerbatim())) {
                            err = wrapWithObjectName($state.ErrDuplicateName, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, null));
                            return [Token.$fromStorage({
                                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                    raw: void 0,
                                    str: "",
                                    num: 0n
                                }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - n, 1)];
                        }
                    }
                    const __gotots_store_38 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    objectNameStack.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Names"), pos - n);
                }
                {
                    const __gotots_store_39 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$appendString(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - n, 1)];
                    }
                }
                const __gotots_store_40 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_41 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_10 = pos - n;
                const __gotots_assign_11 = pos;
                __gotots_store_40.prevStart = __gotots_assign_10;
                __gotots_store_41.prevEnd = __gotots_assign_11;
                const __gotots_store_42 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                const __gotots_field_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "decodeBuffer");
                const __gotots_store_43 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                const __gotots_field_1 = BigInt.asUintN(64, decodeBuffer.$go$private$jsontext$previousOffsetStart(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "decodeBuffer")));
                const __gotots_results_15 = Token.$fromStorage({
                    raw: __gotots_field_0,
                    num: __gotots_field_1,
                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                    str: ""
                });
                const __gotots_results_16 = void 0;
                return [__gotots_results_15, __gotots_results_16];
                break;
            }
            case 48: {
                {
                    n = ConsumeSimpleNumber__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                    let __gotots_logical_result_3 = n === 0;
                    if (!__gotots_logical_result_3) {
                        const __gotots_store_44 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                        __gotots_logical_result_3 = decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "decodeBuffer"), pos + n);
                    }
                    if (__gotots_logical_result_3) {
                        let oldAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                        const __gotots_results_17 = decoderState.$go$private$jsontext$consumeNumber(d, pos);
                        pos = __gotots_results_17[0];
                        err = __gotots_results_17[1];
                        let newAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                        n = globalThis.Number(BigInt.asIntN(64, goInt64(newAbsPos - oldAbsPos)));
                        if (!(err === undefined)) {
                            return [Token.$fromStorage({
                                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                    raw: void 0,
                                    str: "",
                                    num: 0n
                                }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                        }
                    }
                    else {
                        pos += n;
                    }
                }
                {
                    const __gotots_store_45 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$appendNumber(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - n, 1)];
                    }
                }
                const __gotots_store_46 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_47 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_12 = pos - n;
                const __gotots_assign_13 = pos;
                __gotots_store_46.prevStart = __gotots_assign_12;
                __gotots_store_47.prevEnd = __gotots_assign_13;
                const __gotots_store_48 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                const __gotots_field_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "decodeBuffer");
                const __gotots_store_49 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                const __gotots_field_3 = BigInt.asUintN(64, decodeBuffer.$go$private$jsontext$previousOffsetStart(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "decodeBuffer")));
                const __gotots_results_18 = Token.$fromStorage({
                    raw: __gotots_field_2,
                    num: __gotots_field_3,
                    nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                    str: ""
                });
                const __gotots_results_19 = void 0;
                return [__gotots_results_18, __gotots_results_19];
                break;
            }
            case 123: {
                {
                    const __gotots_store_50 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                const __gotots_store_51 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                objectNameStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Names"));
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                    const __gotots_store_52 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    objectNamespaceStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Namespaces"));
                }
                const __gotots_store_53 = Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct);
                Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), TagFlags$constant__from_jsonflags());
                pos += 1;
                const __gotots_store_54 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_55 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_14 = pos;
                const __gotots_assign_15 = pos;
                __gotots_store_54.prevStart = __gotots_assign_14;
                __gotots_store_55.prevEnd = __gotots_assign_15;
                return [Token.$copy(Token.$fromStorage($state.BeginObject)), void 0];
                break;
            }
            case 125: {
                {
                    const __gotots_store_56 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                const __gotots_store_57 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                objectNameStack.$go$private$jsontext$pop(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "Names"));
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                    const __gotots_store_58 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    objectNamespaceStack.$go$private$jsontext$pop(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Namespaces"));
                }
                pos += 1;
                const __gotots_store_59 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_60 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_16 = pos;
                const __gotots_assign_17 = pos;
                __gotots_store_59.prevStart = __gotots_assign_16;
                __gotots_store_60.prevEnd = __gotots_assign_17;
                return [Token.$copy(Token.$fromStorage($state.EndObject)), void 0];
                break;
            }
            case 91: {
                {
                    const __gotots_store_61 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                const __gotots_store_62 = Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct);
                Flags__from_jsonflags.Clear(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), TagFlags$constant__from_jsonflags());
                pos += 1;
                const __gotots_store_63 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_64 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_18 = pos;
                const __gotots_assign_19 = pos;
                __gotots_store_63.prevStart = __gotots_assign_18;
                __gotots_store_64.prevEnd = __gotots_assign_19;
                return [Token.$copy(Token.$fromStorage($state.BeginArray)), void 0];
                break;
            }
            case 93: {
                {
                    const __gotots_store_65 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "Tokens"));
                    if (!(err === undefined)) {
                        return [Token.$fromStorage({
                                nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                                raw: void 0,
                                str: "",
                                num: 0n
                            }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                    }
                }
                pos += 1;
                const __gotots_store_66 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_67 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_20 = pos;
                const __gotots_assign_21 = pos;
                __gotots_store_66.prevStart = __gotots_assign_20;
                __gotots_store_67.prevEnd = __gotots_assign_21;
                return [Token.$copy(Token.$fromStorage($state.EndArray)), void 0];
                break;
            }
            default: {
                err = NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "at start of value");
                return [Token.$fromStorage({
                        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
                        raw: void 0,
                        str: "",
                        num: 0n
                    }), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
                break;
            }
        }
    }
    static ReadValue(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, flags: tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire> | undefined): [
        Value,
        GoInterface | undefined
    ] {
        let err: GoInterface | undefined = void 0;
        let next = 0;
        let pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos;
        if (pos !== 0) {
            if (!(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekErr === undefined)) {
                let err__shadow_1: GoInterface | undefined = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekErr;
                const __gotots_store_0 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_store_1 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
                const __gotots_assign_0 = 0;
                const __gotots_assign_1 = void 0;
                __gotots_store_0.peekPos = __gotots_assign_0;
                __gotots_store_1.peekErr = __gotots_assign_1;
                return [new Value(RuntimeSlice.nil<uint8>()), err__shadow_1];
            }
            next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.peekPos = 0;
        }
        else {
            const __gotots_store_2 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            decodeBuffer.$go$private$jsontext$invalidatePreviousRead(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "decodeBuffer"));
            pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd;
            pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
            const __gotots_store_3 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "decodeBuffer"), pos)) {
                {
                    const __gotots_results_0 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                    pos = __gotots_results_0[0];
                    err = __gotots_results_0[1];
                    if (!(err === undefined)) {
                        if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)) && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() === 1) {
                            err = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                        }
                        return [new Value(RuntimeSlice.nil<uint8>()), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0)];
                    }
                }
            }
            let delim = 0;
            {
                let c = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos);
                if (c === 58 || c === 44) {
                    delim = c;
                    pos += 1;
                    pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                    const __gotots_store_4 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                    if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "decodeBuffer"), pos)) {
                        {
                            const __gotots_results_1 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                            pos = __gotots_results_1[0];
                            err = __gotots_results_1[1];
                            if (!(err === undefined)) {
                                err = wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0);
                                return [new Value(RuntimeSlice.nil<uint8>()), decoderState.$go$private$jsontext$checkDelimBeforeIOError(d, delim, err)];
                            }
                        }
                    }
                }
            }
            next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
            if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next) !== delim) {
                return [new Value(RuntimeSlice.nil<uint8>()), decoderState.$go$private$jsontext$checkDelim(d, delim, next)];
            }
        }
        let oldAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
        const __gotots_results_2 = decoderState.$go$private$jsontext$consumeValue(d, flags, pos, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth());
        pos = __gotots_results_2[0];
        err = __gotots_results_2[1];
        let newAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
        let n = globalThis.Number(BigInt.asIntN(64, goInt64(newAbsPos - oldAbsPos)));
        if (!(err === undefined)) {
            return [new Value(RuntimeSlice.nil<uint8>()), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 1)];
        }
        switch (next) {
            case 110:
            case 116:
            case 102: {
                const __gotots_store_5 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Tokens"));
                break;
            }
            case 34: {
                if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.NeedObjectName()) {
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isValidNamespace()) {
                            err = $state.errInvalidNamespace;
                            break;
                        }
                        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isActiveNamespace() && !objectNamespace.$go$private$jsontext$insertQuoted(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Namespaces.Last(), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, null), ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire>).value.IsVerbatim())) {
                            err = wrapWithObjectName($state.ErrDuplicateName, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, null));
                            break;
                        }
                    }
                    const __gotots_store_6 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    objectNameStack.ReplaceLastQuotedOffset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Names"), pos - n);
                }
                const __gotots_store_7 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendString(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Tokens"));
                break;
            }
            case 48: {
                const __gotots_store_8 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                err = stateMachine.$go$private$jsontext$appendNumber(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Tokens"));
                break;
            }
            case 123: {
                {
                    const __gotots_store_9 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                {
                    const __gotots_store_10 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popObject(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Tokens"));
                    if (!(err === undefined)) {
                        const __gotots_binary_operand_0 = "BUG: popObject should never fail immediately after pushObject: ";
                        const __gotots_receiver_0 = err;
                        const __gotots_binary_operand_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Error();
                        const __gotots_argument_0 = new $goInterfaceAdapter$string(__gotots_binary_operand_0 + __gotots_binary_operand_1);
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                }
                break;
            }
            case 91: {
                {
                    const __gotots_store_11 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$pushArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Tokens"));
                    if (!(err === undefined)) {
                        break;
                    }
                }
                {
                    const __gotots_store_12 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                    err = stateMachine.$go$private$jsontext$popArray(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Tokens"));
                    if (!(err === undefined)) {
                        const __gotots_binary_operand_2 = "BUG: popArray should never fail immediately after pushArray: ";
                        const __gotots_receiver_1 = err;
                        const __gotots_binary_operand_3 = goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Error();
                        const __gotots_argument_1 = new $goInterfaceAdapter$string(__gotots_binary_operand_2 + __gotots_binary_operand_3);
                        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                    }
                }
                break;
            }
        }
        if (!(err === undefined)) {
            return [new Value(RuntimeSlice.nil<uint8>()), wrapSyntacticError(new GoInterfaceAdapter(d), err, pos - n, 1)];
        }
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd = pos;
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart = pos - n;
        return [new Value(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, pos)), void 0];
    }
    static SkipUntil(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, depth: int, length: int64): GoInterface | undefined {
        for (; ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() > depth || (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() === depth && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.Length() < length);) {
            {
                const __gotots_results_4 = decoderState.ReadToken(d);
                let err: GoInterface | undefined = __gotots_results_4[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
        }
        return void 0;
    }
    static SkipValue(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): GoInterface | undefined {
        switch (decoderState.PeekKind(d)) {
            case 123:
            case 91: {
                let depth = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth();
                for (;;) {
                    {
                        const __gotots_results_20 = decoderState.ReadToken(d);
                        let err: GoInterface | undefined = __gotots_results_20[1];
                        if (!(err === undefined)) {
                            return err;
                        }
                    }
                    if (depth >= ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth()) {
                        return void 0;
                    }
                }
                break;
            }
            default: {
                let flags = new ValueFlags__from_jsonwire(0);
                const flags$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => flags, flags$next4 => flags = flags$next4);
                {
                    const __gotots_results_21 = decoderState.ReadValue(d, flags$location4);
                    let err: GoInterface | undefined = __gotots_results_21[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                }
                return void 0;
                break;
            }
        }
    }
    static SkipValueRemainder(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): GoInterface | undefined {
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() - 1 > 0 && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.Length() === 0n) {
            for (let n = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth(); ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Depth() >= n;) {
                {
                    const __gotots_results_22 = decoderState.ReadToken(d);
                    let err: GoInterface | undefined = __gotots_results_22[1];
                    if (!(err === undefined)) {
                        return err;
                    }
                }
            }
        }
        return void 0;
    }
    static $go$private$jsontext$checkDelim(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, delim: uint8, next: Kind): GoInterface | undefined {
        let where = "at start of value";
        switch (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next)) {
            case delim: {
                return void 0;
                break;
            }
            case 58: {
                where = "after object name (expecting ':')";
                break;
            }
            case 44: {
                if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isObject()) {
                    where = "after object value (expecting ',' or '}')";
                }
                else {
                    where = "after array element (expecting ',' or ']')";
                }
                break;
            }
        }
        let pos = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevEnd;
        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
        let err: GoInterface | undefined = NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), where);
        return wrapSyntacticError(new GoInterfaceAdapter(d), err, pos, 0);
    }
    static $go$private$jsontext$checkDelimBeforeIOError(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, delim: uint8, err: GoInterface | undefined): GoInterface | undefined {
        const next: Kind = 34;
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.$go$private$jsontext$needDelim(next) !== delim) {
            err = decoderState.$go$private$jsontext$checkDelim(d, delim, next);
        }
        return err;
    }
    static $go$private$jsontext$checkEOF(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, pos: int): GoInterface | undefined {
        {
            const __gotots_results_41 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
            let pos__shadow_1 = __gotots_results_41[0];
            let err: GoInterface | undefined = __gotots_results_41[1];
            {
                const __gotots_switch_tag_0 = err;
                let __gotots_switch_selection_1 = -1;
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_2 = false;
                    if (!__gotots_switch_match_2) {
                        __gotots_switch_match_2 = goInterfaceEqual(__gotots_switch_tag_0, void 0);
                    }
                    if (__gotots_switch_match_2) {
                        __gotots_switch_selection_1 = 0;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = goInterfaceEqual(__gotots_switch_tag_0, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF));
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_1 = 1;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    __gotots_switch_selection_1 = 2;
                }
                switch (__gotots_switch_selection_1) {
                    case 0: {
                        let err__shadow_1: GoInterface | undefined = NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos__shadow_1, null, null), "after top-level value");
                        return wrapSyntacticError(new GoInterfaceAdapter(d), err__shadow_1, pos__shadow_1, 0);
                        break;
                    }
                    case 1: {
                        return void 0;
                        break;
                    }
                    case 2: {
                        return err;
                        break;
                    }
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$jsontext$consumeArray(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, flags: tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire> | undefined, pos: int, depth: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(pos))) >= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length))) || ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos) !== 91) {
            const __gotots_argument_8 = new $goInterfaceAdapter$string("BUG: consumeArray must be called with a buffer that starts with '['");
            GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
        }
        else if (depth === 10001) {
            return [pos, $state.errMaxDepth];
        }
        pos++;
        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
        const __gotots_store_90 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "decodeBuffer"), pos)) {
            {
                const __gotots_results_36 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                pos = __gotots_results_36[0];
                err = __gotots_results_36[1];
                if (!(err === undefined)) {
                    return [pos, err];
                }
            }
        }
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos) === 93) {
            pos++;
            return [pos, void 0];
        }
        let idx = 0n;
        depth++;
        for (;;) {
            pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
            const __gotots_store_91 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "decodeBuffer"), pos)) {
                {
                    const __gotots_results_37 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                    pos = __gotots_results_37[0];
                    err = __gotots_results_37[1];
                    if (!(err === undefined)) {
                        return [pos, err];
                    }
                }
            }
            const __gotots_results_38 = decoderState.$go$private$jsontext$consumeValue(d, flags, pos, depth);
            pos = __gotots_results_38[0];
            err = __gotots_results_38[1];
            if (!(err === undefined)) {
                return [pos, wrapWithArrayIndex(err, idx)];
            }
            pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
            const __gotots_store_92 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "decodeBuffer"), pos)) {
                {
                    const __gotots_results_39 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                    pos = __gotots_results_39[0];
                    err = __gotots_results_39[1];
                    if (!(err === undefined)) {
                        return [pos, err];
                    }
                }
            }
            switch (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos)) {
                case 44: {
                    pos++;
                    idx = goInt64(idx + 1n);
                    continue;
                    break;
                }
                case 93: {
                    pos++;
                    return [pos, void 0];
                    break;
                }
                default: {
                    return [pos, NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "after array element (expecting ',' or ']')")];
                    break;
                }
            }
        }
    }
    static $go$private$jsontext$consumeLiteral(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, pos: int, lit: gostring): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        for (;;) {
            const __gotots_results_40 = ConsumeLiteral__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), lit);
            let n = __gotots_results_40[0];
            let err__shadow_1: GoInterface | undefined = __gotots_results_40[1];
            if (goInterfaceEqual(err__shadow_1, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF))) {
                let absPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                err__shadow_1 = decoderState.$go$private$jsontext$fetch(d);
                pos = globalThis.Number(BigInt.asIntN(64, goInt64(absPos - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset)));
                if (!(err__shadow_1 === undefined)) {
                    return [pos + n, err__shadow_1];
                }
                continue;
            }
            return [pos + n, err__shadow_1];
        }
    }
    static $go$private$jsontext$consumeNumber(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, pos: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        let n = 0;
        let state__shadow_1 = new ConsumeNumberState__from_jsonwire(0);
        for (;;) {
            const __gotots_results_28 = ConsumeNumberResumable__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), n, state__shadow_1);
            n = __gotots_results_28[0];
            state__shadow_1 = __gotots_results_28[1];
            err = __gotots_results_28[2];
            let __gotots_logical_result_5 = goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF));
            if (!__gotots_logical_result_5) {
                const __gotots_store_83 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                __gotots_logical_result_5 = decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "decodeBuffer"), pos + n);
            }
            if (__gotots_logical_result_5) {
                let mayTerminate = err === undefined;
                let absPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                err = decoderState.$go$private$jsontext$fetch(d);
                pos = globalThis.Number(BigInt.asIntN(64, goInt64(absPos - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset)));
                if (!(err === undefined)) {
                    if (mayTerminate && goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF))) {
                        return [pos + n, void 0];
                    }
                    return [pos, err];
                }
                continue;
            }
            return [pos + n, err];
        }
    }
    static $go$private$jsontext$consumeObject(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, flags: tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire> | undefined, pos: int, depth: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let n = 0;
                    let names: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined = void 0;
                    if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags())) {
                        const __gotots_store_84 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                        objectNamespaceStack.$go$private$jsontext$push(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "Namespaces"));
                        const __gotots_store_85 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
                        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "Namespaces");
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            objectNamespaceStack.$go$private$jsontext$pop(__gotots_receiver_7);
                        });
                        names = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Namespaces.Last();
                    }
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(pos))) >= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length))) || ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos) !== 123) {
                        const __gotots_argument_7 = new $goInterfaceAdapter$string("BUG: consumeObject must be called with a buffer that starts with '{'");
                        GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
                    }
                    else if (depth === 10001) {
                        const __gotots_results_29: [
                            int,
                            GoInterface | undefined
                        ] = [pos, $state.errMaxDepth];
                        newPos = __gotots_results_29[0];
                        err = __gotots_results_29[1];
                        break __gotots_return_block_0;
                    }
                    pos++;
                    pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                    const __gotots_store_86 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                    if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "decodeBuffer"), pos)) {
                        {
                            const __gotots_results_30 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                            pos = __gotots_results_30[0];
                            err = __gotots_results_30[1];
                            if (!(err === undefined)) {
                                const __gotots_results_31: [
                                    int,
                                    GoInterface | undefined
                                ] = [pos, err];
                                newPos = __gotots_results_31[0];
                                err = __gotots_results_31[1];
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos) === 125) {
                        pos++;
                        const __gotots_results_32: [
                            int,
                            GoInterface | undefined
                        ] = [pos, void 0];
                        newPos = __gotots_results_32[0];
                        err = __gotots_results_32[1];
                        break __gotots_return_block_0;
                    }
                    depth++;
                    for (;;) {
                        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                        const __gotots_store_87 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "decodeBuffer"), pos)) {
                            {
                                const __gotots_results_33 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                                pos = __gotots_results_33[0];
                                err = __gotots_results_33[1];
                                if (!(err === undefined)) {
                                    const __gotots_results_34: [
                                        int,
                                        GoInterface | undefined
                                    ] = [pos, err];
                                    newPos = __gotots_results_34[0];
                                    err = __gotots_results_34[1];
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                        let flags2 = new ValueFlags__from_jsonwire(0);
                        const flags2$location = tsonicTypeScriptRuntime.boundLocation({}, () => flags2, flags2$next => flags2 = flags2$next);
                        {
                            n = ConsumeSimpleString__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            if (n === 0) {
                                let oldAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                                const __gotots_results_35 = decoderState.$go$private$jsontext$consumeString(d, flags2$location, pos);
                                pos = __gotots_results_35[0];
                                err = __gotots_results_35[1];
                                let newAbsPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                                n = globalThis.Number(BigInt.asIntN(64, goInt64(newAbsPos - oldAbsPos)));
                                ValueFlags__from_jsonwire.Join(flags, flags2);
                                if (!(err === undefined)) {
                                    const __gotots_results_36: [
                                        int,
                                        GoInterface | undefined
                                    ] = [pos, err];
                                    newPos = __gotots_results_36[0];
                                    err = __gotots_results_36[1];
                                    break __gotots_return_block_0;
                                }
                            }
                            else {
                                pos += n;
                            }
                        }
                        let quotedName = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos - n, pos, null);
                        if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowDuplicateNames$constant__from_jsonflags()) && !objectNamespace.$go$private$jsontext$insertQuoted(names, quotedName, flags2.IsVerbatim())) {
                            const __gotots_results_37: [
                                int,
                                GoInterface | undefined
                            ] = [pos - n, wrapWithObjectName($state.ErrDuplicateName, quotedName)];
                            newPos = __gotots_results_37[0];
                            err = __gotots_results_37[1];
                            break __gotots_return_block_0;
                        }
                        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                        const __gotots_store_88 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "decodeBuffer"), pos)) {
                            {
                                const __gotots_results_38 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                                pos = __gotots_results_38[0];
                                err = __gotots_results_38[1];
                                if (!(err === undefined)) {
                                    const __gotots_results_39: [
                                        int,
                                        GoInterface | undefined
                                    ] = [pos, wrapWithObjectName(err, quotedName)];
                                    newPos = __gotots_results_39[0];
                                    err = __gotots_results_39[1];
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos) !== 58) {
                            let err__shadow_1: GoInterface | undefined = NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "after object name (expecting ':')");
                            const __gotots_results_40: [
                                int,
                                GoInterface | undefined
                            ] = [pos, wrapWithObjectName(err__shadow_1, quotedName)];
                            newPos = __gotots_results_40[0];
                            err = __gotots_results_40[1];
                            break __gotots_return_block_0;
                        }
                        pos++;
                        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                        const __gotots_store_89 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "decodeBuffer"), pos)) {
                            {
                                const __gotots_results_41 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                                pos = __gotots_results_41[0];
                                err = __gotots_results_41[1];
                                if (!(err === undefined)) {
                                    const __gotots_results_42: [
                                        int,
                                        GoInterface | undefined
                                    ] = [pos, wrapWithObjectName(err, quotedName)];
                                    newPos = __gotots_results_42[0];
                                    err = __gotots_results_42[1];
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                        const __gotots_results_43 = decoderState.$go$private$jsontext$consumeValue(d, flags, pos, depth);
                        pos = __gotots_results_43[0];
                        err = __gotots_results_43[1];
                        if (!(err === undefined)) {
                            const __gotots_results_44: [
                                int,
                                GoInterface | undefined
                            ] = [pos, wrapWithObjectName(err, quotedName)];
                            newPos = __gotots_results_44[0];
                            err = __gotots_results_44[1];
                            break __gotots_return_block_0;
                        }
                        pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                        const __gotots_store_90 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                        if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "decodeBuffer"), pos)) {
                            {
                                const __gotots_results_45 = decoderState.$go$private$jsontext$consumeWhitespace(d, pos);
                                pos = __gotots_results_45[0];
                                err = __gotots_results_45[1];
                                if (!(err === undefined)) {
                                    const __gotots_results_46: [
                                        int,
                                        GoInterface | undefined
                                    ] = [pos, err];
                                    newPos = __gotots_results_46[0];
                                    err = __gotots_results_46[1];
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                        switch (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos)) {
                            case 44: {
                                pos++;
                                continue;
                                break;
                            }
                            case 125: {
                                pos++;
                                const __gotots_results_47: [
                                    int,
                                    GoInterface | undefined
                                ] = [pos, void 0];
                                newPos = __gotots_results_47[0];
                                err = __gotots_results_47[1];
                                break __gotots_return_block_0;
                                break;
                            }
                            default: {
                                const __gotots_results_48: [
                                    int,
                                    GoInterface | undefined
                                ] = [pos, NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "after object value (expecting ',' or '}')")];
                                newPos = __gotots_results_48[0];
                                err = __gotots_results_48[1];
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
        return [newPos, err];
    }
    static $go$private$jsontext$consumeString(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, flags: tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire> | undefined, pos: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        let n = 0;
        for (;;) {
            const __gotots_results_27 = ConsumeStringResumable__from_jsonwire(flags, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), n, !Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct).Flags).Get(AllowInvalidUTF8$constant__from_jsonflags()));
            n = __gotots_results_27[0];
            err = __gotots_results_27[1];
            if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF))) {
                let absPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                err = decoderState.$go$private$jsontext$fetch(d);
                pos = globalThis.Number(BigInt.asIntN(64, goInt64(absPos - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset)));
                if (!(err === undefined)) {
                    return [pos + n, err];
                }
                continue;
            }
            return [pos + n, err];
        }
    }
    static $go$private$jsontext$consumeValue(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, flags: tsonicTypeScriptRuntime.Location<ValueFlags__from_jsonwire> | undefined, pos: int, depth: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        for (;;) {
            let n = 0;
            let err__shadow_1: GoInterface | undefined = void 0;
            {
                let next = Kind_normalize(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.get(pos));
                switch (next) {
                    case 110: {
                        {
                            n = ConsumeNull__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            if (n === 0) {
                                const __gotots_results_6 = ConsumeLiteral__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "null");
                                n = __gotots_results_6[0];
                                err__shadow_1 = __gotots_results_6[1];
                            }
                        }
                        break;
                    }
                    case 102: {
                        {
                            n = ConsumeFalse__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            if (n === 0) {
                                const __gotots_results_7 = ConsumeLiteral__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "false");
                                n = __gotots_results_7[0];
                                err__shadow_1 = __gotots_results_7[1];
                            }
                        }
                        break;
                    }
                    case 116: {
                        {
                            n = ConsumeTrue__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            if (n === 0) {
                                const __gotots_results_8 = ConsumeLiteral__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "true");
                                n = __gotots_results_8[0];
                                err__shadow_1 = __gotots_results_8[1];
                            }
                        }
                        break;
                    }
                    case 34: {
                        {
                            n = ConsumeSimpleString__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            if (n === 0) {
                                return decoderState.$go$private$jsontext$consumeString(d, flags, pos);
                            }
                        }
                        break;
                    }
                    case 48: {
                        {
                            n = ConsumeSimpleNumber__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
                            let __gotots_logical_result_2 = n === 0;
                            if (!__gotots_logical_result_2) {
                                const __gotots_store_23 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
                                __gotots_logical_result_2 = decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "decodeBuffer"), pos + n);
                            }
                            if (__gotots_logical_result_2) {
                                return decoderState.$go$private$jsontext$consumeNumber(d, pos);
                            }
                        }
                        break;
                    }
                    case 123: {
                        return decoderState.$go$private$jsontext$consumeObject(d, flags, pos, depth);
                        break;
                    }
                    case 91: {
                        return decoderState.$go$private$jsontext$consumeArray(d, flags, pos, depth);
                        break;
                    }
                    default: {
                        if ((((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isObject() && next === 93) || (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state.Tokens.Last.$go$private$jsontext$isArray() && next === 125)) {
                            return [pos, $state.errMismatchDelim];
                        }
                        return [pos, NewInvalidCharacterError$SliceOf_byte(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null), "at start of value")];
                        break;
                    }
                }
            }
            if (goInterfaceEqual(err__shadow_1, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF))) {
                let absPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                err__shadow_1 = decoderState.$go$private$jsontext$fetch(d);
                pos = globalThis.Number(BigInt.asIntN(64, goInt64(absPos - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset)));
                if (!(err__shadow_1 === undefined)) {
                    return [pos + n, err__shadow_1];
                }
                continue;
            }
            return [pos + n, err__shadow_1];
        }
    }
    static $go$private$jsontext$consumeWhitespace(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, pos: int): [
        int,
        GoInterface | undefined
    ] {
        let newPos: int = 0;
        let err: GoInterface | undefined = void 0;
        for (;;) {
            pos += ConsumeWhitespace__from_jsonwire(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(pos, null, null));
            const __gotots_store_22 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            if (decodeBuffer.$go$private$jsontext$needMore(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "decodeBuffer"), pos)) {
                let absPos = goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
                err = decoderState.$go$private$jsontext$fetch(d);
                pos = globalThis.Number(BigInt.asIntN(64, goInt64(absPos - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.baseOffset)));
                if (!(err === undefined)) {
                    return [pos, err];
                }
                continue;
            }
            return [pos, void 0];
        }
    }
    static $go$private$jsontext$fetch(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): GoInterface | undefined {
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.rd === undefined) {
            return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
        }
        const __gotots_store_79 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.state;
        objectNameStack.$go$private$jsontext$copyQuotedBuffer(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "Names"), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf);
        {
            const __gotots_results_25 = (($value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
                tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_bytes$Buffer.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.rd);
            let bb: tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined = __gotots_results_25[0];
            let ok = __gotots_results_25[1];
            if (ok) {
                {
                    let __gotots_switch_selection_0 = -1;
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_0 = false;
                        if (!__gotots_switch_match_0) {
                            const __gotots_receiver_2 = bb;
                            const __gotots_binary_operand_8 = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Buffer.Len(__gotots_receiver_2 === void 0 ? void 0 :
                                (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value)));
                            const __gotots_binary_operand_9 = 0;
                            __gotots_switch_match_0 = __gotots_binary_operand_8 === __gotots_binary_operand_9;
                        }
                        if (__gotots_switch_match_0) {
                            __gotots_switch_selection_0 = 0;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_1 = false;
                        if (!__gotots_switch_match_1) {
                            __gotots_switch_match_1 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length === 0;
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
                            return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
                            break;
                        }
                        case 1: {
                            const __gotots_receiver_3 = bb;
                            const __gotots_receiver_5 = __gotots_receiver_3 === void 0 ? void 0 :
                                (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value;
                            const __gotots_receiver_4 = bb;
                            const __gotots_argument_5 = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Buffer.Len(__gotots_receiver_4 === void 0 ? void 0 :
                                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer>).value)));
                            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf = bytes__from_gostdlib.Buffer.Next(__gotots_receiver_5, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_5)));
                            return void 0;
                            break;
                        }
                        case 2: {
                            return new $goInterfaceAdapter$PointerTo_Named_jsontext$ioError({ value: new ioError("read", $state.errBufferWriteAfterNext) });
                            break;
                        }
                    }
                }
            }
        }
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity === 0) {
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf = RuntimeSlice.make<uint8>(0, 64, 0);
        }
        const growthSizeFactor$int: int = 2;
        const growthRateFactor$int64: int64 = 2n;
        let grow = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity <= 2048;
        let __gotots_logical_result_4 = grow;
        if (__gotots_logical_result_4) {
            const __gotots_binary_operand_12 = BigInt.asIntN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity));
            const __gotots_store_80 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
            const __gotots_binary_operand_10 = decodeBuffer.$go$private$jsontext$previousOffsetEnd(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "decodeBuffer"));
            const __gotots_binary_operand_11 = growthRateFactor$int64;
            const __gotots_binary_operand_13 = goInt64(goIntegerDivide(__gotots_binary_operand_10, __gotots_binary_operand_11));
            __gotots_logical_result_4 = __gotots_binary_operand_12 < __gotots_binary_operand_13;
        }
        grow = __gotots_logical_result_4;
        grow = grow || (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart === 0 && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length >= goNumberIntegerDivide(3 * ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity, 4));
        if (grow) {
            let buf = RuntimeSlice.make<uint8>(0, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity * growthSizeFactor$int, 0);
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf = goSliceAppendSlice<uint8>(buf, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart, null, null), 0);
        }
        else {
            let n = RuntimeSlice.copy<uint8>(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(0, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity, null), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart, null, null));
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(0, n, null);
        }
        const __gotots_store_81 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        __gotots_store_81.baseOffset = goInt64(__gotots_store_81.baseOffset + BigInt.asIntN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart)));
        const __gotots_store_82 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer;
        __gotots_store_82.prevEnd = __gotots_store_82.prevEnd - ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart;
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.prevStart = 0;
        for (;;) {
            const __gotots_receiver_6 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.rd;
            const __gotots_argument_6 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.capacity, null);
            const __gotots_results_26 = goInterfaceNonNil<$goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error>(__gotots_receiver_6).Read(__gotots_argument_6);
            let n = __gotots_results_26[0];
            let err: GoInterface | undefined = __gotots_results_26[1];
            __gotots_control_target_1: {
                if (n > 0) {
                    ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.slice(0, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer.buf.length + n, null);
                    return void 0;
                }
                else if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF))) {
                    return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF);
                }
                else if (!(err === undefined)) {
                    return new $goInterfaceAdapter$PointerTo_Named_jsontext$ioError({ value: new ioError("read", err) });
                }
                else {
                    continue;
                }
            }
        }
    }
    static $go$private$jsontext$options(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined): tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined {
        const __gotots_store_97 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "Struct");
    }
    static $go$private$jsontext$reset(d: tsonicTypeScriptRuntime.Location<decoderState> | undefined, b: RuntimeSlice<uint8>, r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): void {
        const __gotots_store_93 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value;
        state.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "state"));
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.decodeBuffer = new decodeBuffer(0, void 0, b, 0, 0, 0n, r);
        let opts2 = Struct__from_jsonopts.$fromStorage({
            Flags: Flags__from_jsonflags.$zeroStorage(),
            CoderValues: CoderValues__from_jsonopts.$zeroStorage(),
            ArshalValues: ArshalValues__from_jsonopts.$zeroStorage()
        });
        const opts2$location = tsonicTypeScriptRuntime.boundLocation({}, () => opts2, opts2$next => opts2 = opts2$next);
        Struct__from_jsonopts.Join(opts2$location, opts);
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decoderState>).value.Struct = Struct__from_jsonopts.$copy(opts2);
    }
}
export class decodeBuffer {
    declare private readonly $goType: void;
    public constructor(public peekPos: int, public peekErr: GoInterface | undefined, public buf: RuntimeSlice<uint8>, public prevStart: int, public prevEnd: int, public baseOffset: int64, public rd: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined) {
    }
    static $zero(): decodeBuffer {
        return new decodeBuffer(0, void 0, RuntimeSlice.nil<uint8>(), 0, 0, 0n, void 0);
    }
    static $copy($source: decodeBuffer): decodeBuffer {
        return new decodeBuffer($source.peekPos, $source.peekErr, $source.buf, $source.prevStart, $source.prevEnd, $source.baseOffset, $source.rd);
    }
    declare private readonly then?: never;
    static PreviousTokenOrValue(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): RuntimeSlice<uint8> {
        let b = decodeBuffer.$go$private$jsontext$previousBuffer(d);
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.peekPos > 0 || b.length > 0 && b.get(0) === invalidateBufferByte$uint8) {
            return RuntimeSlice.nil<uint8>();
        }
        if (b.length === 0) {
            b = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.slice(0, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd, null);
            const __gotots_range_0 = RuntimeSlice.literal<gostring>(["null", "false", "true", "{", "}", "[", "]"]);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let tok = __gotots_range_value_0;
                let __gotots_logical_result_0 = b.length >= tok.length;
                if (__gotots_logical_result_0) {
                    const __gotots_conversion_0 = b.slice(b.length - tok.length, null, null);
                    let __gotots_conversion_1 = "";
                    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                        __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                    }
                    const __gotots_binary_operand_4 = __gotots_conversion_1;
                    const __gotots_binary_operand_5 = tok;
                    __gotots_logical_result_0 = __gotots_binary_operand_4 === __gotots_binary_operand_5;
                }
                if (__gotots_logical_result_0) {
                    return b.slice(b.length - tok.length, null, null);
                }
            }
        }
        return b;
    }
    static $go$private$jsontext$invalidatePreviousRead(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): void {
        let isBytesBuffer: (($0: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined) => bool) | undefined = (r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): bool => {
            const __gotots_results_5 = (($value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
                tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_bytes$Buffer.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(r);
            let ok = __gotots_results_5[1];
            return ok;
        };
        let __gotots_logical_result_1 = !(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.rd === undefined);
        if (__gotots_logical_result_1) {
            const __gotots_callee_0 = isBytesBuffer;
            const __gotots_argument_4 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.rd;
            __gotots_logical_result_1 = !(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
        }
        if (__gotots_logical_result_1 && ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart < ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd && globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.length)))) {
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.set(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart, invalidateBufferByte$uint8);
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd;
        }
    }
    static $go$private$jsontext$needMore(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined, pos: int): bool {
        return pos === ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.length;
    }
    static $go$private$jsontext$offsetAt(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined, pos: int): int64 {
        return goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.baseOffset + BigInt.asIntN(64, goNumberToBigInt(pos)));
    }
    static $go$private$jsontext$previousBuffer(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): RuntimeSlice<uint8> {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.slice(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd, null);
    }
    static $go$private$jsontext$previousOffsetEnd(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): int64 {
        return goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.baseOffset + BigInt.asIntN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd)));
    }
    static $go$private$jsontext$previousOffsetStart(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): int64 {
        return goInt64(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.baseOffset + BigInt.asIntN(64, goNumberToBigInt(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart)));
    }
    static $go$private$jsontext$unreadBuffer(d: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined): RuntimeSlice<uint8> {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.slice(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevEnd, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.length, null);
    }
}
export function NewDecoder(r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Decoder> | undefined {
    let d: tsonicTypeScriptRuntime.Location<Decoder> | undefined = tsonicTypeScriptRuntime.location<Decoder>(Decoder.$zero());
    Decoder.Reset(d, r, opts);
    return d;
}
export const invalidateBufferByte$uint8: uint8 = 35;
