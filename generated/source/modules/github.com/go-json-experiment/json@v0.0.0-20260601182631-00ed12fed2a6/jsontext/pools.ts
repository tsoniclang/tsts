import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Decoder } from "./decode.js";
import type { Encoder } from "./encode.js";
import type * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import type { bool, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder, $goInterfaceAdapter$PointerTo_Named_bytes$Buffer as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { decoderState } from "./decode.js";
import { encoderState } from "./encode.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class bufferStatistics {
    declare private readonly $goType: void;
    public constructor(public strikes: int, public prevLen: int) {
    }
    static $zero(): bufferStatistics {
        return new bufferStatistics(0, 0);
    }
    static $copy($source: bufferStatistics): bufferStatistics {
        return new bufferStatistics($source.strikes, $source.prevLen);
    }
    static $equal($left: bufferStatistics, $right: bufferStatistics): bool {
        return $left.strikes === $right.strikes && $left.prevLen === $right.prevLen;
    }
    static $hash($source: bufferStatistics): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.strikes));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.prevLen));
        return $hash;
    }
    declare private readonly then?: never;
}
export function getBufferedEncoder(opts: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Encoder> | undefined {
    const __gotots_receiver_2 = $state.bufferedEncoderPool;
    let e: tsonicTypeScriptRuntime.Location<Encoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Encoder> | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Encoder.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get(__gotots_receiver_2 === void 0 ? void 0 :
        (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
    if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.isNil()) {
        let n = globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.prevLen | 63)))))))) < 0 ? GoPanic.raiseRuntime("negative shift amount") : globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.prevLen | 63)))))))) >= 64 ? 0 : 1 << globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.Len(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.prevLen | 63))))))));
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf = RuntimeSlice.make<uint8>(0, n, 0);
    }
    const __gotots_store_2 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
    encoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "s"), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.slice(0, 0, null), void 0, opts);
    return e;
}
export function putBufferedEncoder(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): void {
    if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer.capacity > 65536) {
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer = RuntimeSlice.nil<uint8>();
    }
    __gotots_control_target_0: {
        if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.capacity <= 4096) {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.strikes = 0;
        }
        else if (goNumberIntegerDivide(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.capacity, 4) <= ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.length) {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.strikes = 0;
        }
        else if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.strikes < 4) {
            const __gotots_store_4 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats;
            __gotots_store_4.strikes = __gotots_store_4.strikes + 1;
        }
        else {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.strikes = 0;
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.bufStats.prevLen = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.length;
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf = RuntimeSlice.nil<uint8>();
        }
    }
    const __gotots_receiver_4 = $state.bufferedEncoderPool;
    sync__from_gostdlib.Pool.Put(__gotots_receiver_4 === void 0 ? void 0 :
        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder(e));
}
export function getStreamingEncoder(w: GoInterface | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Encoder> | undefined {
    {
        const __gotots_results_0 = (($value: GoInterface | undefined): [
            tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(w);
        let ok = __gotots_results_0[1];
        if (ok) {
            const __gotots_receiver_0 = $state.bytesBufferEncoderPool;
            let e: tsonicTypeScriptRuntime.Location<Encoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Encoder> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Encoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(sync__from_gostdlib.Pool.Get(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
            const __gotots_store_0 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
            encoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "s"), RuntimeSlice.nil<uint8>(), w, opts);
            return e;
        }
        else {
            const __gotots_receiver_1 = $state.streamingEncoderPool;
            let e: tsonicTypeScriptRuntime.Location<Encoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Encoder> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Encoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(sync__from_gostdlib.Pool.Get(__gotots_receiver_1 === void 0 ? void 0 :
                (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
            const __gotots_store_1 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
            encoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "s"), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.slice(0, 0, null), w, opts);
            return e;
        }
    }
}
export function putStreamingEncoder(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): void {
    if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer.capacity > 65536) {
        ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.availBuffer = RuntimeSlice.nil<uint8>();
    }
    {
        const __gotots_results_1 = (($value: GoInterface | undefined): [
            tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.wr);
        let ok = __gotots_results_1[1];
        if (ok) {
            const __gotots_store_5 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer;
            const __gotots_store_6 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer;
            const __gotots_assign_0 = void 0;
            const __gotots_assign_1 = RuntimeSlice.nil<uint8>();
            __gotots_store_5.wr = __gotots_assign_0;
            __gotots_store_6.Buf = __gotots_assign_1;
            const __gotots_receiver_5 = $state.bytesBufferEncoderPool;
            sync__from_gostdlib.Pool.Put(__gotots_receiver_5 === void 0 ? void 0 :
                (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder(e));
        }
        else {
            ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.wr = void 0;
            if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf.capacity > 65536) {
                ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value.s.encodeBuffer.Buf = RuntimeSlice.nil<uint8>();
            }
            const __gotots_receiver_6 = $state.streamingEncoderPool;
            sync__from_gostdlib.Pool.Put(__gotots_receiver_6 === void 0 ? void 0 :
                (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder(e));
        }
    }
}
export function getBufferedDecoder(b: RuntimeSlice<uint8>, opts: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Decoder> | undefined {
    const __gotots_receiver_3 = $state.bufferedDecoderPool;
    let d: tsonicTypeScriptRuntime.Location<Decoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Decoder> | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Decoder.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get(__gotots_receiver_3 === void 0 ? void 0 :
        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
    const __gotots_store_3 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
    decoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "s"), b, void 0, opts);
    return d;
}
export function putBufferedDecoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): void {
    ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf = RuntimeSlice.nil<uint8>();
    const __gotots_receiver_7 = $state.bufferedDecoderPool;
    sync__from_gostdlib.Pool.Put(__gotots_receiver_7 === void 0 ? void 0 :
        (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(d));
}
export function getStreamingDecoder(r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Decoder> | undefined {
    {
        const __gotots_results_2 = (($value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
            tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(r);
        let ok = __gotots_results_2[1];
        if (ok) {
            const __gotots_receiver_8 = $state.bytesBufferDecoderPool;
            let d: tsonicTypeScriptRuntime.Location<Decoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Decoder> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(sync__from_gostdlib.Pool.Get(__gotots_receiver_8 === void 0 ? void 0 :
                (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
            const __gotots_store_7 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
            decoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "s"), RuntimeSlice.nil<uint8>(), r, opts);
            return d;
        }
        else {
            const __gotots_receiver_9 = $state.streamingDecoderPool;
            let d: tsonicTypeScriptRuntime.Location<Decoder> | undefined = (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<Decoder> | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Decoder.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(sync__from_gostdlib.Pool.Get(__gotots_receiver_9 === void 0 ? void 0 :
                (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
            const __gotots_store_8 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
            decoderState.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "s"), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf.slice(0, 0, null), r, opts);
            return d;
        }
    }
}
export function putStreamingDecoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): void {
    {
        const __gotots_results_3 = (($value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
            tsonicTypeScriptRuntime.Location<bytes__from_gostdlib.Buffer> | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.rd);
        let ok = __gotots_results_3[1];
        if (ok) {
            const __gotots_store_9 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer;
            const __gotots_store_10 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer;
            const __gotots_assign_2 = void 0;
            const __gotots_assign_3 = RuntimeSlice.nil<uint8>();
            __gotots_store_9.rd = __gotots_assign_2;
            __gotots_store_10.buf = __gotots_assign_3;
            const __gotots_receiver_10 = $state.bytesBufferDecoderPool;
            sync__from_gostdlib.Pool.Put(__gotots_receiver_10 === void 0 ? void 0 :
                (__gotots_receiver_10 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(d));
        }
        else {
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.rd = void 0;
            if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf.capacity > 65536) {
                ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value.s.decodeBuffer.buf = RuntimeSlice.nil<uint8>();
            }
            const __gotots_receiver_11 = $state.streamingDecoderPool;
            sync__from_gostdlib.Pool.Put(__gotots_receiver_11 === void 0 ? void 0 :
                (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(d));
        }
    }
}
