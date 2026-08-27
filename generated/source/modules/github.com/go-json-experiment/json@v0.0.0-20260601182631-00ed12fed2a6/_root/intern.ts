import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoArray } from "@gotots/runtime/array.js";
import type { bool, gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerRemainder, goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function makeString(c: tsonicTypeScriptRuntime.Location<GoArray<gostring, 256>> | undefined, b: RuntimeSlice<uint8>): gostring {
    const minCachedLen$int: int = 2;
    const maxCachedLen$int: int = 256;
    if (c === undefined || b.length < minCachedLen$int || b.length > maxCachedLen$int) {
        const __gotots_conversion_0 = b;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }
    let h = 0;
    __gotots_control_target_0: {
        if (b.length >= 8) {
            let lo = binary__from_gostdlib.state.LittleEndian.Uint64(b.slice(0, 8, null));
            let hi = binary__from_gostdlib.state.LittleEndian.Uint64(b.slice(b.length - 8, null, null));
            h = (hash64(globalThis.Number(BigInt.asUintN(32, lo)), globalThis.Number(BigInt.asUintN(32, goUint64(lo >> 32n)))) ^ hash64(globalThis.Number(BigInt.asUintN(32, hi)), globalThis.Number(BigInt.asUintN(32, goUint64(hi >> 32n))))) >>> 0;
        }
        else if (b.length >= 4) {
            let lo = binary__from_gostdlib.state.LittleEndian.Uint32(b.slice(0, 4, null));
            let hi = binary__from_gostdlib.state.LittleEndian.Uint32(b.slice(b.length - 4, null, null));
            h = hash64(lo, hi);
        }
        else if (b.length >= 2) {
            let lo = binary__from_gostdlib.state.LittleEndian.Uint16(b.slice(0, 2, null));
            let hi = binary__from_gostdlib.state.LittleEndian.Uint16(b.slice(b.length - 2, null, null));
            h = hash64(lo, hi);
        }
    }
    let i = goNumberIntegerRemainder(h, 256);
    {
        let s__shadow_1 = (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<gostring, 256>>).value.copy()).get(i);
        const __gotots_binary_operand_0 = s__shadow_1;
        const __gotots_conversion_3 = b;
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        const __gotots_binary_operand_1 = __gotots_conversion_4;
        if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
            return s__shadow_1;
        }
    }
    const __gotots_conversion_6 = b;
    let __gotots_conversion_7 = "";
    for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
        __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
    }
    let s = __gotots_conversion_7;
    (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<gostring, 256>>).value.copy()).set(i, s);
    return s;
}
export function hash64(lo: uint32, hi: uint32): uint32 {
    const prime2$uint32: uint32 = 2246822519;
    const prime3$uint32: uint32 = 3266489917;
    const prime4$uint32: uint32 = 668265263;
    let h = 374761401;
    h += lo * prime3$uint32;
    h = bits__from_gostdlib.RotateLeft32(h, BigInt.asIntN(64, goNumberToBigInt(17))) * prime4$uint32;
    h += hi * prime3$uint32;
    h = bits__from_gostdlib.RotateLeft32(h, BigInt.asIntN(64, goNumberToBigInt(17))) * prime4$uint32;
    const avalanche$bool: bool = false;
    if (avalanche$bool) {
        h = (h ^ h >>> 15) >>> 0;
        h = h * prime2$uint32;
        h = (h ^ h >>> 13) >>> 0;
        h = h * prime3$uint32;
        h = (h ^ h >>> 16) >>> 0;
    }
    return h;
}
