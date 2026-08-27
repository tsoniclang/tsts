import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { streamSafe } from "./composition.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { decomposeHangul, hangulUTF8Size$int, reorderBuffer, ssOverflow$constant, ssStarter$constant, streamSafe_first, streamSafe_next } from "./composition.js";
import { Properties } from "./forminfo.js";
import { input } from "./input.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class Iter {
    declare private readonly $goType: void;
    public constructor(public rb: reorderBuffer, public buf: GoArray<uint8, 128>, public info: Properties, public next: iterFunc, public asciiF: iterFunc, public p: int, public multiSeg: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
    static $go$private$norm$returnSlice(i: tsonicTypeScriptRuntime.Location<Iter> | undefined, a: int, b: int): RuntimeSlice<uint8> {
        if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src.bytes.isNil()) {
            const __gotots_slice_operand_4 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf;
            const __gotots_slice_build_0 = goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null);
            const __gotots_slice_build_1 = goStringSlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src.str, a, b);
            const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
                __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
            }
            const __gotots_slice_operand_5 = __gotots_slice_build_2;
            return goArraySlice(__gotots_slice_operand_4, 0, __gotots_slice_operand_5, null);
        }
        return ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src.bytes.slice(a, b, null);
    }
    static $go$private$norm$setDone(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): void {
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextDone);
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc;
    }
}
export class iterFunc {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Iter> | undefined) => RuntimeSlice<uint8>) | undefined) {
    }
    declare private readonly then?: never;
}
export function nextHangul(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    let p = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
    let next = p + hangulUTF8Size$int;
    if (next >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
        Iter.$go$private$norm$setDone(i);
    }
    else {
        const __gotots_store_34 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
        const __gotots_binary_operand_6 = input.$go$private$norm$hangul(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "src"), next);
        const __gotots_binary_operand_7 = 0;
        if (__gotots_binary_operand_6 === __gotots_binary_operand_7) {
            const __gotots_store_35 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
            streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
            const __gotots_callee_9 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
            const __gotots_argument_17 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
            const __gotots_argument_18 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.nextMain;
            const __gotots_callee_10 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next.$value;
            const __gotots_argument_19 = i;
            return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
        }
    }
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p = next;
    const __gotots_slice_operand_6 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf;
    const __gotots_argument_20 = goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null);
    const __gotots_store_36 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    const __gotots_argument_21 = input.$go$private$norm$hangul(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "src"), p);
    const __gotots_slice_operand_7 = decomposeHangul(__gotots_argument_20, __gotots_argument_21);
    return goArraySlice(__gotots_slice_operand_6, 0, __gotots_slice_operand_7, null);
}
export function nextDone(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    return RuntimeSlice.nil<uint8>();
}
export function nextMulti(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    let j = 0;
    let d = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg;
    for (j = 1; j < d.length && !utf8__from_gostdlib.RuneStart(d.get(j)); j++) {
    }
    for (; j < d.length;) {
        const __gotots_callee_7 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
        const __gotots_argument_14 = new input("", d);
        const __gotots_argument_15 = j;
        let info = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14, __gotots_argument_15);
        if (info.BoundaryBefore()) {
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = d.slice(j, null, null);
            return d.slice(0, j, null);
        }
        j += Properties.$storageOf(info).size;
    }
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.nextMain;
    const __gotots_callee_8 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next.$value;
    const __gotots_argument_16 = i;
    return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
}
export function nextMultiNorm(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    let j = 0;
    let d = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg;
    for (; j < d.length;) {
        const __gotots_callee_5 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
        const __gotots_argument_10 = new input("", d);
        const __gotots_argument_11 = j;
        let info = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
        if (info.BoundaryBefore()) {
            const __gotots_store_23 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            reorderBuffer.$go$private$norm$compose(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "rb"));
            const __gotots_slice_operand_0 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf;
            const __gotots_store_24 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            const __gotots_slice_operand_1 = reorderBuffer.$go$private$norm$flushCopy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "rb"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null));
            let seg = goArraySlice(__gotots_slice_operand_0, 0, __gotots_slice_operand_1, null);
            const __gotots_store_25 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "rb"), new input("", d), j, Properties.$copy(info));
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = d.slice(j + Properties.$storageOf(info).size, null, null);
            return seg;
        }
        const __gotots_store_26 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
        reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "rb"), new input("", d), j, Properties.$copy(info));
        j += Properties.$storageOf(info).size;
    }
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = RuntimeSlice.nil<uint8>();
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextComposed);
    return doNormComposed(i);
}
export function nextDecomposed(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    let next: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
    let outp = 0;
    const __gotots_assign_2 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
    const __gotots_assign_3 = 0;
    let inCopyStart = __gotots_assign_2;
    let outCopyStart = __gotots_assign_3;
    doNorm: {
        __gotots_control_target_0: for (;;) {
            {
                let sz = Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).size;
                if (sz <= 1) {
                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.ss = 0;
                    let p = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
                    const __gotots_store_7 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
                    __gotots_store_7.p = __gotots_store_7.p + 1;
                    if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                        Iter.$go$private$norm$setDone(i);
                        return Iter.$go$private$norm$returnSlice(i, p, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                    }
                    else {
                        const __gotots_store_8 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                        const __gotots_binary_operand_2 = input.$go$private$norm$_u5f_byte(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "src"), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                        const __gotots_binary_operand_3 = RuneSelf$uint8__from_utf8;
                        if (__gotots_binary_operand_2 < __gotots_binary_operand_3) {
                            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.asciiF;
                            return Iter.$go$private$norm$returnSlice(i, p, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                        }
                    }
                    outp++;
                }
                else {
                    let d = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info.Decomposition();
                    if (!d.isNil()) {
                        let p = outp + d.length;
                        if (outp > 0) {
                            const __gotots_store_9 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                            input.$go$private$norm$copySlice(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "src"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, outCopyStart, null, null), inCopyStart, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                            if (p > 128) {
                                return goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, outp, null);
                            }
                        }
                        else if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info.$go$private$norm$multiSegment()) {
                            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg.isNil()) {
                                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = d;
                                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextMulti);
                                return nextMulti(i);
                            }
                            d = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg;
                            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = RuntimeSlice.nil<uint8>();
                            p = d.length;
                        }
                        let prevCC__shadow_1 = Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).tccc;
                        {
                            const __gotots_store_10 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
                            __gotots_store_10.p = __gotots_store_10.p + sz;
                            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                                Iter.$go$private$norm$setDone(i);
                                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = Properties.$fromStorage({
                                    pos: 0,
                                    size: 0,
                                    ccc: 0,
                                    tccc: 0,
                                    nLead: 0,
                                    flags: 0,
                                    index: 0
                                });
                            }
                            else {
                                const __gotots_callee_3 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
                                const __gotots_argument_6 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
                                const __gotots_argument_7 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
                                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
                            }
                        }
                        {
                            const __gotots_store_11 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                            const __gotots_switch_tag_0 = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
                            let __gotots_switch_selection_0 = -1;
                            if (__gotots_switch_selection_0 === -1) {
                                let __gotots_switch_match_0 = false;
                                if (!__gotots_switch_match_0) {
                                    __gotots_switch_match_0 = __gotots_switch_tag_0.$value === ssOverflow$constant().$value;
                                }
                                if (__gotots_switch_match_0) {
                                    __gotots_switch_selection_0 = 0;
                                }
                            }
                            if (__gotots_switch_selection_0 === -1) {
                                let __gotots_switch_match_1 = false;
                                if (!__gotots_switch_match_1) {
                                    __gotots_switch_match_1 = __gotots_switch_tag_0.$value === ssStarter$constant().$value;
                                }
                                if (__gotots_switch_match_1) {
                                    __gotots_switch_selection_0 = 1;
                                }
                            }
                            __gotots_control_target_1: {
                                if (__gotots_switch_selection_0 === 0) {
                                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextCGJDecompose);
                                    __gotots_switch_selection_0 = 1;
                                }
                                if (__gotots_switch_selection_0 === 1) {
                                    if (outp > 0) {
                                        RuntimeSlice.copy<uint8>(goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, outp, null, null), d);
                                        return goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, p, null);
                                    }
                                    return d;
                                    break __gotots_control_target_1;
                                }
                            }
                        }
                        RuntimeSlice.copy<uint8>(goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, outp, null, null), d);
                        outp = p;
                        const __gotots_assign_4 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
                        const __gotots_assign_5 = outp;
                        inCopyStart = __gotots_assign_4;
                        outCopyStart = __gotots_assign_5;
                        if (Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).ccc < prevCC__shadow_1) {
                            break doNorm;
                        }
                        continue __gotots_control_target_0;
                    }
                    else {
                        const __gotots_store_12 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                        let r = input.$go$private$norm$hangul(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "src"), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                        if (r !== 0) {
                            outp = decomposeHangul(goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null), r);
                            const __gotots_store_13 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
                            __gotots_store_13.p = __gotots_store_13.p + hangulUTF8Size$int;
                            const __gotots_assign_6 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
                            const __gotots_assign_7 = outp;
                            inCopyStart = __gotots_assign_6;
                            outCopyStart = __gotots_assign_7;
                            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                                Iter.$go$private$norm$setDone(i);
                                break __gotots_control_target_0;
                            }
                            else {
                                const __gotots_store_14 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                                const __gotots_binary_operand_4 = input.$go$private$norm$hangul(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "src"), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                                const __gotots_binary_operand_5 = 0;
                                if (__gotots_binary_operand_4 !== __gotots_binary_operand_5) {
                                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextHangul);
                                    return goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, outp, null);
                                }
                            }
                        }
                        else {
                            let p = outp + sz;
                            if (p > 128) {
                                break __gotots_control_target_0;
                            }
                            outp = p;
                            const __gotots_store_15 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
                            __gotots_store_15.p = __gotots_store_15.p + sz;
                        }
                    }
                }
            }
            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                Iter.$go$private$norm$setDone(i);
                break __gotots_control_target_0;
            }
            let prevCC = Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).tccc;
            const __gotots_callee_4 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
            const __gotots_argument_8 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
            const __gotots_argument_9 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
            {
                const __gotots_store_16 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                let v = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
                if (v.$value === ssStarter$constant().$value) {
                    break __gotots_control_target_0;
                }
                else if (v.$value === ssOverflow$constant().$value) {
                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextCGJDecompose);
                    break __gotots_control_target_0;
                }
            }
            if (Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).ccc < prevCC) {
                break doNorm;
            }
        }
        if (outCopyStart === 0) {
            return Iter.$go$private$norm$returnSlice(i, inCopyStart, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
        }
        else if (inCopyStart < ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p) {
            const __gotots_store_17 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
            input.$go$private$norm$copySlice(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "src"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, outCopyStart, null, null), inCopyStart, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
        }
        return goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, outp, null);
    }
    const __gotots_store_18 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    input.$go$private$norm$copySlice(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "src"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, outCopyStart, null, null), inCopyStart, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
    const __gotots_store_19 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$insertDecomposed(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "rb"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, outp, null));
    return doNormDecomposed(i);
}
export function doNormDecomposed(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    for (;;) {
        const __gotots_store_37 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
        reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "rb"), input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p, Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
        {
            const __gotots_store_38 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            __gotots_store_38.p = __gotots_store_38.p + Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).size;
            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                Iter.$go$private$norm$setDone(i);
                break;
            }
        }
        const __gotots_callee_11 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
        const __gotots_argument_22 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
        const __gotots_argument_23 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22, __gotots_argument_23);
        if (Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).ccc === 0) {
            break;
        }
        {
            const __gotots_store_39 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
            let s = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
            if (s.$value === ssOverflow$constant().$value) {
                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextCGJDecompose);
                break;
            }
        }
    }
    const __gotots_slice_operand_8 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf;
    const __gotots_store_40 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    const __gotots_slice_operand_9 = reorderBuffer.$go$private$norm$flushCopy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "rb"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null));
    return goArraySlice(__gotots_slice_operand_8, 0, __gotots_slice_operand_9, null);
}
export function nextCGJDecompose(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.ss = 0;
    const __gotots_store_32 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$insertCGJ(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "rb"));
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextDecomposed);
    const __gotots_store_33 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    streamSafe_first(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    let buf = doNormDecomposed(i);
    return buf;
}
export function nextComposed(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    const __gotots_assign_0 = 0;
    const __gotots_assign_1 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
    let outp = __gotots_assign_0;
    let startp = __gotots_assign_1;
    let prevCC = 0;
    doNorm__label_1: {
        __gotots_control_target_0: for (;;) {
            if (!((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info.$go$private$norm$isYesC()) {
                break doNorm__label_1;
            }
            prevCC = Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).tccc;
            let sz = Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).size;
            if (sz === 0) {
                sz = 1;
            }
            let p = outp + sz;
            if (p > 128) {
                break __gotots_control_target_0;
            }
            outp = p;
            const __gotots_store_0 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            __gotots_store_0.p = __gotots_store_0.p + sz;
            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                Iter.$go$private$norm$setDone(i);
                break __gotots_control_target_0;
            }
            else {
                const __gotots_store_1 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                const __gotots_binary_operand_0 = input.$go$private$norm$_u5f_byte(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "src"), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
                const __gotots_binary_operand_1 = RuneSelf$uint8__from_utf8;
                if (__gotots_binary_operand_0 < __gotots_binary_operand_1) {
                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.ss = 0;
                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.asciiF;
                    break __gotots_control_target_0;
                }
            }
            const __gotots_callee_0 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
            const __gotots_argument_0 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
            const __gotots_argument_1 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
            ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            {
                const __gotots_store_2 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
                let v = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
                if (v.$value === ssStarter$constant().$value) {
                    break __gotots_control_target_0;
                }
                else if (v.$value === ssOverflow$constant().$value) {
                    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextCGJCompose);
                    break __gotots_control_target_0;
                }
            }
            if (Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).ccc < prevCC) {
                break doNorm__label_1;
            }
        }
        return Iter.$go$private$norm$returnSlice(i, startp, ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p);
    }
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p = startp;
    const __gotots_callee_1 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
    const __gotots_argument_2 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
    const __gotots_argument_3 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
    const __gotots_store_3 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    streamSafe_first(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info.$go$private$norm$multiSegment()) {
        let d = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info.Decomposition();
        const __gotots_callee_2 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
        const __gotots_argument_4 = new input("", d);
        const __gotots_argument_5 = 0;
        let info = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
        const __gotots_store_4 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
        reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "rb"), new input("", d), 0, Properties.$copy(info));
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.multiSeg = d.slice(Properties.$storageOf(info).size, null, null);
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextMultiNorm);
        return nextMultiNorm(i);
    }
    const __gotots_store_5 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    streamSafe_first(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    const __gotots_store_6 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "rb"), input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p, Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    return doNormComposed(i);
}
export function doNormComposed(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    for (;;) {
        {
            const __gotots_store_27 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
            __gotots_store_27.p = __gotots_store_27.p + Properties.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info).size;
            if (((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p >= ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.nsrc) {
                Iter.$go$private$norm$setDone(i);
                break;
            }
        }
        const __gotots_callee_6 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.f.info.$value;
        const __gotots_argument_12 = input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src);
        const __gotots_argument_13 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p;
        ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
        {
            const __gotots_store_28 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
            let s = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
            if (s.$value === ssStarter$constant().$value) {
                break;
            }
            else if (s.$value === ssOverflow$constant().$value) {
                ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextCGJCompose);
                break;
            }
        }
        const __gotots_store_29 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
        reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "rb"), input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p, Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    }
    const __gotots_store_30 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$compose(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "rb"));
    const __gotots_slice_operand_2 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf;
    const __gotots_store_31 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    const __gotots_slice_operand_3 = reorderBuffer.$go$private$norm$flushCopy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "rb"), goArraySlice(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.buf, 0, null, null));
    let seg = goArraySlice(__gotots_slice_operand_2, 0, __gotots_slice_operand_3, null);
    return seg;
}
export function nextCGJCompose(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): RuntimeSlice<uint8> {
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.ss = 0;
    const __gotots_store_20 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$insertCGJ(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "rb"));
    ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.next = new iterFunc(nextComposed);
    const __gotots_store_21 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb;
    streamSafe_first(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "ss"), Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    const __gotots_store_22 = ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value;
    reorderBuffer.$go$private$norm$insertUnsafe(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "rb"), input.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.rb.src), ((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.p, Properties.$copy(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value.info));
    return doNormComposed(i);
}
