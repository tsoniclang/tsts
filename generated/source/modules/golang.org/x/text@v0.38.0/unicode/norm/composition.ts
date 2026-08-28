import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Properties$Storage as Properties__from_norm$Storage, formInfo } from "./forminfo.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { bool, gostring, int, int32, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/state.js";
import { UTFMax$uint8 as UTFMax$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Properties, buildRecompMap, combine } from "./forminfo.js";
import { input } from "./input.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberIntegerDivide, goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export const maxNonStarters$uint8: uint8 = 30;
export class ssState {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ssSuccess$constant(): ssState {
    return new ssState(0);
}
export function ssStarter$constant(): ssState {
    return new ssState(1);
}
export function ssOverflow$constant(): ssState {
    return new ssState(2);
}
export type streamSafe = uint8;
export function streamSafe_first(ss: tsonicTypeScriptRuntime.Location<streamSafe> | undefined, p: Properties): void {
    void ((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        p.$go$private$norm$nTrailingNonStarters());
}
export function streamSafe_next(ss: tsonicTypeScriptRuntime.Location<streamSafe> | undefined, p: Properties): ssState {
    if (((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<streamSafe>).value
        > maxNonStarters$uint8) {
        const __gotots_argument_0 = new GoInterfaceAdapter("streamSafe was not reset");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    let n = p.$go$private$norm$nLeadingNonStarters();
    {
        const __gotots_store_0 = (ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_0.value =
            __gotots_store_0.value
                + n);
        if (((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<streamSafe>).value
            > maxNonStarters$uint8) {
            void ((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                0);
            return ssOverflow$constant();
        }
    }
    if (n === 0) {
        void ((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            p.$go$private$norm$nTrailingNonStarters());
        return ssStarter$constant();
    }
    return ssSuccess$constant();
}
export function streamSafe_backwards(ss: tsonicTypeScriptRuntime.Location<streamSafe> | undefined, p: Properties): ssState {
    if (((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<streamSafe>).value
        > maxNonStarters$uint8) {
        const __gotots_argument_2 = new GoInterfaceAdapter("streamSafe was not reset");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
    }
    let c = ((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<streamSafe>).value
        + p.$go$private$norm$nTrailingNonStarters();
    if (c > maxNonStarters$uint8) {
        return ssOverflow$constant();
    }
    void ((ss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        c);
    if (p.$go$private$norm$nLeadingNonStarters() === 0) {
        return ssStarter$constant();
    }
    return ssSuccess$constant();
}
export function streamSafe_isMax(ss: streamSafe): bool {
    return ss === maxNonStarters$uint8;
}
export const GraphemeJoiner$string: gostring = "\u00CD\u008F";
export class reorderBuffer {
    declare private readonly $goType: void;
    public constructor(public rune: GoArray<Properties__from_norm$Storage, 32>, public byte: GoArray<uint8, 128>, public nbyte: uint8, public ss: streamSafe, public nrune: int, public f: formInfo, public src: input, public nsrc: int, public tmpBytes: input, public __go_out: RuntimeSlice<uint8>, public flushF: (($0: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined) => bool) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$norm$appendRune(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, r: int32): void {
        let bn = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nbyte;
        let sz = globalThis.Number(BigInt.asIntN(64, utf8__from_gostdlib.EncodeRune(goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, bn, null, null), r)));
        const __gotots_store_4 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value;
        __gotots_store_4.nbyte = __gotots_store_4.nbyte + UTFMax$uint8__from_utf8;
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.set(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune, (void Properties.$storageOf, (void Properties.$fromStorage,
            {
                pos: bn,
                size: sz & 255,
                ccc: 0,
                tccc: 0,
                nLead: 0,
                flags: 0,
                index: 0
            })));
        const __gotots_store_5 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value;
        __gotots_store_5.nrune = __gotots_store_5.nrune + 1;
    }
    static $go$private$norm$assignRune(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, pos: int, r: int32): void {
        let bn = (void Properties.$storageOf, (void Properties.$fromStorage,
            ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(pos))).pos;
        let sz = globalThis.Number(BigInt.asIntN(64, utf8__from_gostdlib.EncodeRune(goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, bn, null, null), r)));
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.set(pos, (void Properties.$storageOf, (void Properties.$fromStorage,
            {
                pos: bn,
                size: sz & 255,
                ccc: 0,
                tccc: 0,
                nLead: 0,
                flags: 0,
                index: 0
            })));
    }
    static $go$private$norm$bytesAt(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, n: int): RuntimeSlice<uint8> {
        let inf = Properties.$copy(Properties.$fromStorage(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(n)));
        return goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, Properties.$storageOf(inf).pos, Properties.$storageOf(inf).pos + Properties.$storageOf(inf).size, null);
    }
    static $go$private$norm$combineHangul(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, s: int, i: int, k: int): void {
        let b = goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune, 0, null, null);
        let bn = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune;
        for (; i < bn; i++) {
            let cccB = (void Properties.$storageOf, (void Properties.$fromStorage,
                b.get(k - 1))).ccc;
            let cccC = (void Properties.$storageOf, (void Properties.$fromStorage,
                b.get(i))).ccc;
            if (cccB === 0) {
                s = k - 1;
            }
            if (s !== k - 1 && cccB >= cccC) {
                b.set(k, Properties.$storageOf(Properties.$copy(Properties.$fromStorage(b.get(i)))));
                k++;
            }
            else {
                let l = reorderBuffer.$go$private$norm$runeAt(rb, s);
                let v = reorderBuffer.$go$private$norm$runeAt(rb, i);
                __gotots_control_target_0: {
                    if (jamoLBase$int32 <= l && l < jamoLEnd$int32 && jamoVBase$int32 <= v && v < jamoVEnd$int32) {
                        reorderBuffer.$go$private$norm$assignRune(rb, s, hangulBase$int32 + (l - jamoLBase$int32) * jamoVTCount$int32 + (v - jamoVBase$int32) * jamoTCount$int32);
                    }
                    else if (hangulBase$int32 <= l && l < hangulEnd$int32 && jamoTBase$int32 < v && v < jamoTEnd$int32 && (goNumberIntegerRemainder((l - hangulBase$int32), jamoTCount$int32)) === 0) {
                        reorderBuffer.$go$private$norm$assignRune(rb, s, l + v - jamoTBase$int32);
                    }
                    else {
                        b.set(k, Properties.$storageOf(Properties.$copy(Properties.$fromStorage(b.get(i)))));
                        k++;
                    }
                }
            }
        }
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune = k;
    }
    static $go$private$norm$compose(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined): void {
        sync__from_gostdlib.Once.Do($state.recompMapOnce, buildRecompMap);
        let bn = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune;
        if (bn === 0) {
            return;
        }
        let k = 1;
        let b = goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune, 0, null, null);
        {
            const __gotots_assign_0 = 0;
            const __gotots_assign_1 = 1;
            let s = __gotots_assign_0;
            let i = __gotots_assign_1;
            for (; i < bn; i++) {
                if (isJamoVT(reorderBuffer.$go$private$norm$bytesAt(rb, i))) {
                    reorderBuffer.$go$private$norm$combineHangul(rb, s, i, k);
                    return;
                }
                let ii = Properties.$copy(Properties.$fromStorage(b.get(i)));
                if (ii.$go$private$norm$combinesBackward()) {
                    let cccB = (void Properties.$storageOf, (void Properties.$fromStorage,
                        b.get(k - 1))).ccc;
                    let cccC = Properties.$storageOf(ii).ccc;
                    let blocked = false;
                    if (cccB === 0) {
                        s = k - 1;
                    }
                    else {
                        blocked = s !== k - 1 && cccB >= cccC;
                    }
                    if (!blocked) {
                        let combined = combine(reorderBuffer.$go$private$norm$runeAt(rb, s), reorderBuffer.$go$private$norm$runeAt(rb, i));
                        if (combined !== 0) {
                            reorderBuffer.$go$private$norm$assignRune(rb, s, combined);
                            continue;
                        }
                    }
                }
                b.set(k, Properties.$storageOf(Properties.$copy(Properties.$fromStorage(b.get(i)))));
                k++;
            }
        }
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune = k;
    }
    static $go$private$norm$decomposeHangul(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, r: int32): void {
        r = r - hangulBase$int32;
        let x = goNumberIntegerRemainder(r, jamoTCount$int32);
        r = goNumberIntegerDivide(r, jamoTCount$int32);
        reorderBuffer.$go$private$norm$appendRune(rb, jamoLBase$int32 + goNumberIntegerDivide(r, jamoVCount$int32));
        reorderBuffer.$go$private$norm$appendRune(rb, jamoVBase$int32 + goNumberIntegerRemainder(r, jamoVCount$int32));
        if (x !== 0) {
            reorderBuffer.$go$private$norm$appendRune(rb, jamoTBase$int32 + x);
        }
    }
    static $go$private$norm$doFlush(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined): bool {
        if (((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.f.composing) {
            reorderBuffer.$go$private$norm$compose(rb);
        }
        const __gotots_callee_0 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.flushF;
        const __gotots_argument_1 = rb;
        let res = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        reorderBuffer.$go$private$norm$reset(rb);
        return res;
    }
    static $go$private$norm$flushCopy(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, buf: RuntimeSlice<uint8>): int {
        let p = 0;
        for (let i = 0; i < ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune; i++) {
            let runep = Properties.$copy(Properties.$fromStorage(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(i)));
            p += RuntimeSlice.copy<uint8>(buf.slice(p, null, null), goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, Properties.$storageOf(runep).pos, Properties.$storageOf(runep).pos + Properties.$storageOf(runep).size, null));
        }
        reorderBuffer.$go$private$norm$reset(rb);
        return p;
    }
    static $go$private$norm$insertCGJ(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined): void {
        reorderBuffer.$go$private$norm$insertSingle(rb, new input(GraphemeJoiner$string, RuntimeSlice.nil<uint8>()), 0, Properties.$fromStorage({
            size: 2,
            pos: 0,
            ccc: 0,
            tccc: 0,
            nLead: 0,
            flags: 0,
            index: 0
        }));
    }
    static $go$private$norm$insertDecomposed(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, dcomp: RuntimeSlice<uint8>): insertErr {
        const __gotots_store_1 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value;
        input.$go$private$norm$setBytes(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "tmpBytes"), dcomp);
        for (let i = 0; i < dcomp.length;) {
            const __gotots_callee_2 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.f.info.$value;
            const __gotots_argument_3 = input.$copy(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.tmpBytes);
            const __gotots_argument_4 = i;
            let info = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4);
            if (info.BoundaryBefore() && ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune > 0 && !reorderBuffer.$go$private$norm$doFlush(rb)) {
                return iShortDst$constant();
            }
            i += RuntimeSlice.copy<uint8>(goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nbyte, null, null), dcomp.slice(i, i + Properties.$storageOf(info).size, null));
            reorderBuffer.$go$private$norm$insertOrdered(rb, Properties.$copy(info));
        }
        return iSuccess$constant();
    }
    static $go$private$norm$insertFlush(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, src: input, i: int, info: Properties): insertErr {
        const src$location = tsonicTypeScriptRuntime.boundLocation({}, () => src, src$next => src = src$next);
        {
            let rune = input.$go$private$norm$hangul(src$location, i);
            if (rune !== 0) {
                reorderBuffer.$go$private$norm$decomposeHangul(rb, rune);
                return iSuccess$constant();
            }
        }
        if (info.$go$private$norm$hasDecomposition()) {
            return reorderBuffer.$go$private$norm$insertDecomposed(rb, info.Decomposition());
        }
        reorderBuffer.$go$private$norm$insertSingle(rb, input.$copy(src), i, Properties.$copy(info));
        return iSuccess$constant();
    }
    static $go$private$norm$insertOrdered(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, info: Properties): void {
        let n = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune;
        let b = goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune, 0, null, null);
        let cc = Properties.$storageOf(info).ccc;
        if (cc > 0) {
            for (; n > 0; n--) {
                if ((void Properties.$storageOf, (void Properties.$fromStorage,
                    b.get(n - 1))).ccc <= cc) {
                    break;
                }
                b.set(n, Properties.$storageOf(Properties.$copy(Properties.$fromStorage(b.get(n - 1)))));
            }
        }
        const __gotots_store_2 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value;
        __gotots_store_2.nrune = __gotots_store_2.nrune + 1;
        let pos = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nbyte;
        const __gotots_store_3 = ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value;
        __gotots_store_3.nbyte = __gotots_store_3.nbyte + UTFMax$uint8__from_utf8;
        Properties.$storageOf(info).pos = pos;
        b.set(n, Properties.$storageOf(Properties.$copy(info)));
    }
    static $go$private$norm$insertSingle(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, src: input, i: int, info: Properties): void {
        const src$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => src, src$next2 => src = src$next2);
        input.$go$private$norm$copySlice(src$location2, goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nbyte, null, null), i, i + Properties.$storageOf(info).size);
        reorderBuffer.$go$private$norm$insertOrdered(rb, Properties.$copy(info));
    }
    static $go$private$norm$insertUnsafe(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, src: input, i: int, info: Properties): void {
        const src$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => src, src$next3 => src = src$next3);
        {
            let rune = input.$go$private$norm$hangul(src$location3, i);
            if (rune !== 0) {
                reorderBuffer.$go$private$norm$decomposeHangul(rb, rune);
            }
        }
        if (info.$go$private$norm$hasDecomposition()) {
            reorderBuffer.$go$private$norm$insertDecomposed(rb, info.Decomposition());
        }
        else {
            reorderBuffer.$go$private$norm$insertSingle(rb, input.$copy(src), i, Properties.$copy(info));
        }
    }
    static $go$private$norm$reset(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined): void {
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune = 0;
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nbyte = 0;
    }
    static $go$private$norm$runeAt(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, n: int): int32 {
        let inf = Properties.$copy(Properties.$fromStorage(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(n)));
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRune(goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, Properties.$storageOf(inf).pos, Properties.$storageOf(inf).pos + Properties.$storageOf(inf).size, null));
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_1[0];
        return r;
    }
    static $go$private$norm$setFlusher(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined, __go_out: RuntimeSlice<uint8>, f: (($0: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined) => bool) | undefined): void {
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.__go_out = __go_out;
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.flushF = f;
    }
}
export function appendFlush(rb: tsonicTypeScriptRuntime.Location<reorderBuffer> | undefined): bool {
    for (let i = 0; i < ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.nrune; i++) {
        let start = (void Properties.$storageOf, (void Properties.$fromStorage,
            ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(i))).pos;
        let end = start + (void Properties.$storageOf, (void Properties.$fromStorage,
            ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.rune.get(i))).size;
        ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.__go_out = goSliceAppendSlice<uint8>(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.__go_out, goArraySlice(((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<reorderBuffer>).value.byte, start, end, null), 0);
    }
    return true;
}
export class insertErr {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function iSuccess$constant(): insertErr {
    return new insertErr(0);
}
export function iShortDst$constant(): insertErr {
    return new insertErr(-1);
}
export const hangulBase$int32: int32 = 44032;
export const hangulBase0$uint8: uint8 = 234;
export const hangulBase1$uint8: uint8 = 176;
export const hangulEnd$int32: int32 = 55204;
export const hangulEnd0$uint8: uint8 = 237;
export const hangulEnd1$uint8: uint8 = 158;
export const hangulEnd2$uint8: uint8 = 164;
export const jamoLBase$int32: int32 = 4352;
export const jamoLBase0$uint8: uint8 = 225;
export const jamoLBase1$uint8: uint8 = 132;
export const jamoLEnd$int32: int32 = 4371;
export const jamoVBase$int32: int32 = 4449;
export const jamoVEnd$int32: int32 = 4470;
export const jamoTBase$int32: int32 = 4519;
export const jamoTEnd$int32: int32 = 4547;
export const jamoTCount$int32: int32 = 28;
export const jamoVCount$int32: int32 = 21;
export const jamoVTCount$int32: int32 = 588;
export const hangulUTF8Size$int: int = 3;
export function isHangul(b: RuntimeSlice<uint8>): bool {
    if (b.length < hangulUTF8Size$int) {
        return false;
    }
    let b0 = b.get(0);
    if (b0 < hangulBase0$uint8) {
        return false;
    }
    let b1 = b.get(1);
    __gotots_control_target_2: {
        if (b0 === hangulBase0$uint8) {
            return b1 >= hangulBase1$uint8;
        }
        else if (b0 < hangulEnd0$uint8) {
            return true;
        }
        else if (b0 > hangulEnd0$uint8) {
            return false;
        }
        else if (b1 < hangulEnd1$uint8) {
            return true;
        }
    }
    return b1 === hangulEnd1$uint8 && b.get(2) < hangulEnd2$uint8;
}
export function isHangulString(b: gostring): bool {
    if (b.length < hangulUTF8Size$int) {
        return false;
    }
    let b0 = goStringIndex(b, 0);
    if (b0 < hangulBase0$uint8) {
        return false;
    }
    let b1 = goStringIndex(b, 1);
    __gotots_control_target_1: {
        if (b0 === hangulBase0$uint8) {
            return b1 >= hangulBase1$uint8;
        }
        else if (b0 < hangulEnd0$uint8) {
            return true;
        }
        else if (b0 > hangulEnd0$uint8) {
            return false;
        }
        else if (b1 < hangulEnd1$uint8) {
            return true;
        }
    }
    return b1 === hangulEnd1$uint8 && goStringIndex(b, 2) < hangulEnd2$uint8;
}
export function isJamoVT(b: RuntimeSlice<uint8>): bool {
    return b.get(0) === jamoLBase0$uint8 && (b.get(1) & 252) === jamoLBase1$uint8;
}
export function decomposeHangul(buf: RuntimeSlice<uint8>, r: int32): int {
    const JamoUTF8Len$int: int = 3;
    r = r - hangulBase$int32;
    let x = goNumberIntegerRemainder(r, jamoTCount$int32);
    r = goNumberIntegerDivide(r, jamoTCount$int32);
    utf8__from_gostdlib.EncodeRune(buf, jamoLBase$int32 + goNumberIntegerDivide(r, jamoVCount$int32));
    utf8__from_gostdlib.EncodeRune(buf.slice(JamoUTF8Len$int, null, null), jamoVBase$int32 + goNumberIntegerRemainder(r, jamoVCount$int32));
    if (x !== 0) {
        utf8__from_gostdlib.EncodeRune(buf.slice(6, null, null), jamoTBase$int32 + x);
        return 9;
    }
    return 6;
}
