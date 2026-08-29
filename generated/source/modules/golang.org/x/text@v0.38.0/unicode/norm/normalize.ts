import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { streamSafe } from "./composition.js";
import type { Properties$Storage as Properties__from_norm$Storage } from "./forminfo.js";
import type { bool, gostring, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/state.js";
import { appendFlush, iSuccess$constant, reorderBuffer, ssOverflow$constant, ssStarter$constant, ssSuccess$constant, streamSafe_backwards, streamSafe_first, streamSafe_isMax, streamSafe_next } from "./composition.js";
import { Properties, compInfo, formInfo } from "./forminfo.js";
import { input, inputBytes, inputString } from "./input.js";
import { nfcTrie, nfkcTrie } from "./tables15.0.0.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoArray, goArrayAllocate } from "@gotots/runtime/array.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class Form {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    Append(__go_out: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
        return this.$go$private$norm$doAppend(__go_out, inputBytes(src), src.length);
    }
    AppendString(__go_out: RuntimeSlice<uint8>, src: gostring): RuntimeSlice<uint8> {
        return this.$go$private$norm$doAppend(__go_out, inputString(src), src.length);
    }
    FirstBoundary(b: RuntimeSlice<uint8>): int {
        return this.$go$private$norm$firstBoundary(inputBytes(b), b.length);
    }
    FirstBoundaryInString(s: gostring): int {
        return this.$go$private$norm$firstBoundary(inputString(s), s.length);
    }
    Properties(s: RuntimeSlice<uint8>): Properties {
        if (this.$value === NFC$constant().$value || this.$value === NFD$constant().$value) {
            const __gotots_results_2 = nfcTrie.$go$private$norm$lookup($state.nfcData, s);
            return compInfo(__gotots_results_2[0], __gotots_results_2[1]);
        }
        const __gotots_results_3 = nfkcTrie.$go$private$norm$lookup($state.nfkcData, s);
        return compInfo(__gotots_results_3[0], __gotots_results_3[1]);
    }
    PropertiesString(s: gostring): Properties {
        if (this.$value === NFC$constant().$value || this.$value === NFD$constant().$value) {
            const __gotots_results_0 = nfcTrie.$go$private$norm$lookupString($state.nfcData, s);
            return compInfo(__gotots_results_0[0], __gotots_results_0[1]);
        }
        const __gotots_results_1 = nfkcTrie.$go$private$norm$lookupString($state.nfkcData, s);
        return compInfo(__gotots_results_1[0], __gotots_results_1[1]);
    }
    $go$private$norm$doAppend(__go_out: RuntimeSlice<uint8>, src: input, n: int): RuntimeSlice<uint8> {
        if (n === 0) {
            return __go_out;
        }
        let ft: formInfo | undefined = $state.formTable.get(this.$value);
        if (__go_out.length === 0) {
            const __gotots_results_4 = formInfo.$go$private$norm$quickSpan(ft, input.$copy(src), 0, n, true);
            let p = __gotots_results_4[0];
            __go_out = input.$go$private$norm$appendSlice(src, __go_out, 0, p);
            if (p === n) {
                return __go_out;
            }
            const __gotots_field_0 = formInfo.$copy(formInfo.$copy((ft ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
            const __gotots_field_1 = input.$copy(src);
            const __gotots_field_2 = n;
            const __gotots_field_3 = __go_out;
            const __gotots_field_4 = appendFlush;
            const __gotots_array_build_0 = goArrayAllocate<Properties__from_norm$Storage, 32>(32);
            for (let __gotots_array_build_1 = 0; __gotots_array_build_1 < 32; __gotots_array_build_1++) {
                __gotots_array_build_0.set(__gotots_array_build_1, Properties.$zeroStorage());
            }
            let rb__shadow_1 = new reorderBuffer(__gotots_array_build_0, GoArray.zero<uint8, 128>(128, 0), 0, 0, 0, __gotots_field_0, __gotots_field_1, __gotots_field_2, input.$zero(), __gotots_field_3, __gotots_field_4);
            return doAppendInner(rb__shadow_1, p);
        }
        const __gotots_field_5 = formInfo.$copy(formInfo.$copy((ft ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
        const __gotots_field_6 = input.$copy(src);
        const __gotots_field_7 = n;
        const __gotots_array_build_2 = goArrayAllocate<Properties__from_norm$Storage, 32>(32);
        for (let __gotots_array_build_3 = 0; __gotots_array_build_3 < 32; __gotots_array_build_3++) {
            __gotots_array_build_2.set(__gotots_array_build_3, Properties.$zeroStorage());
        }
        let rb = new reorderBuffer(__gotots_array_build_2, GoArray.zero<uint8, 128>(128, 0), 0, 0, 0, __gotots_field_5, __gotots_field_6, __gotots_field_7, input.$zero(), RuntimeSlice.nil<uint8>(), void 0);
        return doAppend(rb, __go_out, 0);
    }
    $go$private$norm$firstBoundary(src: input, nsrc: int): int {
        let i = input.$go$private$norm$skipContinuationBytes(src, 0);
        if (i >= nsrc) {
            return -1;
        }
        let fd: formInfo | undefined = $state.formTable.get(this.$value);
        let ss = 0;
        const ss$location = tsonicTypeScriptRuntime.boundLocation({}, () => ss, ss$next => ss = ss$next);
        for (;;) {
            const __gotots_callee_0 = (fd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).info.$value;
            const __gotots_argument_0 = input.$copy(src);
            const __gotots_argument_1 = i;
            let info = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            if (Properties.$storageOf(info).size === 0) {
                return -1;
            }
            {
                let s = streamSafe_next(ss$location, Properties.$copy(info));
                if (!(s.$value === ssSuccess$constant().$value)) {
                    return i;
                }
            }
            i += Properties.$storageOf(info).size;
            if (i >= nsrc) {
                if (!info.BoundaryAfter() && !streamSafe_isMax(ss)) {
                    return -1;
                }
                return nsrc;
            }
        }
    }
}
export function NFC$constant(): Form {
    return new Form(0);
}
export function NFD$constant(): Form {
    return new Form(1);
}
export function NFKC$constant(): Form {
    return new Form(2);
}
export function NFKD$constant(): Form {
    return new Form(3);
}
export function patchTail(rb: reorderBuffer | undefined): bool {
    const __gotots_store_5 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_argument_8 = __gotots_store_5.f;
    const __gotots_argument_9 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out;
    const __gotots_results_6 = lastRuneStart(__gotots_argument_8, __gotots_argument_9);
    let info = __gotots_results_6[0];
    let p = __gotots_results_6[1];
    if (p === -1 || Properties.$storageOf(info).size === 0) {
        return true;
    }
    let end = p + Properties.$storageOf(info).size;
    let extra = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.length - end;
    if (extra > 0) {
        let x = RuntimeSlice.make<uint8>(0, null, 0);
        x = goSliceAppendSlice<uint8>(x, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.length - extra, null, null), 0);
        (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(0, end, null);
        decomposeToLastBoundary(rb);
        reorderBuffer.$go$private$norm$doFlush(rb);
        (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = goSliceAppendSlice<uint8>((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out, x, 0);
        return false;
    }
    let buf = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(p, null, null);
    (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(0, p, null);
    decomposeToLastBoundary(rb);
    {
        const __gotots_store_6 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let s = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "ss"), Properties.$copy(info));
        if (s.$value === ssStarter$constant().$value) {
            reorderBuffer.$go$private$norm$doFlush(rb);
            const __gotots_store_7 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            streamSafe_first(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "ss"), Properties.$copy(info));
        }
        else if (s.$value === ssOverflow$constant().$value) {
            reorderBuffer.$go$private$norm$doFlush(rb);
            reorderBuffer.$go$private$norm$insertCGJ(rb);
            (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ss = 0;
        }
    }
    reorderBuffer.$go$private$norm$insertUnsafe(rb, inputBytes(buf), 0, Properties.$copy(info));
    return true;
}
export function appendQuick(rb: reorderBuffer | undefined, i: int): int {
    if ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nsrc === i) {
        return i;
    }
    const __gotots_store_3 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_results_5 = formInfo.$go$private$norm$quickSpan(__gotots_store_3.f, input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src), i, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nsrc, true);
    let end = __gotots_results_5[0];
    const __gotots_store_4 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = input.$go$private$norm$appendSlice(__gotots_store_4.src, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out, i, end);
    return end;
}
export function doAppend(rb: reorderBuffer | undefined, __go_out: RuntimeSlice<uint8>, p: int): RuntimeSlice<uint8> {
    reorderBuffer.$go$private$norm$setFlusher(rb, __go_out, appendFlush);
    const __gotots_assign_0 = input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src);
    const __gotots_assign_1 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nsrc;
    let src = __gotots_assign_0;
    let n = __gotots_assign_1;
    let doMerge = __go_out.length > 0;
    {
        let q = input.$go$private$norm$skipContinuationBytes(src, p);
        if (q > p) {
            (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = input.$go$private$norm$appendSlice(src, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out, p, q);
            p = q;
            doMerge = patchTail(rb);
        }
    }
    const __gotots_store_0 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    let fd: formInfo | undefined = __gotots_store_0.f;
    if (doMerge) {
        let info = Properties.$zero();
        if (p < n) {
            const __gotots_callee_1 = (fd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).info.$value;
            const __gotots_argument_2 = input.$copy(src);
            const __gotots_argument_3 = p;
            info = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
            if (!info.BoundaryBefore() || info.$go$private$norm$nLeadingNonStarters() > 0) {
                if (p === 0) {
                    decomposeToLastBoundary(rb);
                }
                p = decomposeSegment(rb, p, true);
            }
        }
        if (Properties.$storageOf(info).size === 0) {
            reorderBuffer.$go$private$norm$doFlush(rb);
            return input.$go$private$norm$appendSlice(src, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out, p, n);
        }
        if ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nrune > 0) {
            return doAppendInner(rb, p);
        }
    }
    p = appendQuick(rb, p);
    return doAppendInner(rb, p);
}
export function doAppendInner(rb: reorderBuffer | undefined, p: int): RuntimeSlice<uint8> {
    for (let n = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nsrc; p < n;) {
        p = decomposeSegment(rb, p, true);
        p = appendQuick(rb, p);
    }
    return (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out;
}
export function decomposeSegment(rb: reorderBuffer | undefined, sp: int, atEOF: bool): int {
    const __gotots_callee_2 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f.info.$value;
    const __gotots_argument_4 = input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src);
    const __gotots_argument_5 = sp;
    let info = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
    if (Properties.$storageOf(info).size === 0) {
        return 0;
    }
    end: {
        {
            const __gotots_store_1 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let s = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "ss"), Properties.$copy(info));
            if (s.$value === ssStarter$constant().$value) {
                if ((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nrune > 0) {
                    break end;
                }
            }
            else if (s.$value === ssOverflow$constant().$value) {
                reorderBuffer.$go$private$norm$insertCGJ(rb);
                break end;
            }
        }
        {
            let err = reorderBuffer.$go$private$norm$insertFlush(rb, input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src), sp, Properties.$copy(info));
            if (!(err.$value === iSuccess$constant().$value)) {
                return err.$value;
            }
        }
        __gotots_control_target_0: for (;;) {
            sp += Properties.$storageOf(info).size;
            if (sp >= (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nsrc) {
                if (!atEOF && !info.BoundaryAfter()) {
                    return -2;
                }
                break __gotots_control_target_0;
            }
            const __gotots_callee_3 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f.info.$value;
            const __gotots_argument_6 = input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src);
            const __gotots_argument_7 = sp;
            info = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
            if (Properties.$storageOf(info).size === 0) {
                if (!atEOF) {
                    return -2;
                }
                break __gotots_control_target_0;
            }
            {
                const __gotots_store_2 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let s = streamSafe_next(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "ss"), Properties.$copy(info));
                if (s.$value === ssStarter$constant().$value) {
                    break __gotots_control_target_0;
                }
                else if (s.$value === ssOverflow$constant().$value) {
                    reorderBuffer.$go$private$norm$insertCGJ(rb);
                    break __gotots_control_target_0;
                }
            }
            {
                let err = reorderBuffer.$go$private$norm$insertFlush(rb, input.$copy((rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).src), sp, Properties.$copy(info));
                if (!(err.$value === iSuccess$constant().$value)) {
                    return err.$value;
                }
            }
        }
    }
    if (!reorderBuffer.$go$private$norm$doFlush(rb)) {
        return -1;
    }
    return sp;
}
export function lastRuneStart(fd: formInfo | undefined, buf: RuntimeSlice<uint8>): [
    Properties,
    int
] {
    let p = buf.length - 1;
    for (; p >= 0 && !utf8__from_gostdlib.RuneStart(buf.get(p)); p--) {
    }
    if (p < 0) {
        return [Properties.$fromStorage({
                pos: 0,
                size: 0,
                ccc: 0,
                tccc: 0,
                nLead: 0,
                flags: 0,
                index: 0
            }), -1];
    }
    const __gotots_callee_4 = (fd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).info.$value;
    const __gotots_argument_10 = inputBytes(buf);
    const __gotots_argument_11 = p;
    const __gotots_results_9 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
    const __gotots_results_10 = p;
    return [__gotots_results_9, __gotots_results_10];
}
export function decomposeToLastBoundary(rb: reorderBuffer | undefined): void {
    const __gotots_store_8 = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    let fd: formInfo | undefined = __gotots_store_8.f;
    const __gotots_results_7 = lastRuneStart(fd, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out);
    let info = __gotots_results_7[0];
    let i = __gotots_results_7[1];
    if (Properties.$storageOf(info).size !== (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.length - i) {
        return;
    }
    if (info.BoundaryAfter()) {
        return;
    }
    const __gotots_array_build_4 = goArrayAllocate<Properties__from_norm$Storage, 31>(31);
    for (let __gotots_array_build_5 = 0; __gotots_array_build_5 < 31; __gotots_array_build_5++) {
        __gotots_array_build_4.set(__gotots_array_build_5, Properties.$zeroStorage());
    }
    const __gotots_assign_2 = __gotots_array_build_4;
    let add = __gotots_assign_2;
    let padd = 0;
    let ss = 0;
    const ss$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => ss, ss$next2 => ss = ss$next2);
    let p = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.length;
    for (;;) {
        add.set(padd, Properties.$storageOf(Properties.$copy(info)));
        let v = streamSafe_backwards(ss$location2, Properties.$copy(info));
        if (v.$value === ssOverflow$constant().$value) {
            break;
        }
        padd++;
        p = p - Properties.$storageOf(info).size;
        if (v.$value === ssStarter$constant().$value || p < 0) {
            break;
        }
        const __gotots_results_8 = lastRuneStart(fd, (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(0, p, null));
        info = __gotots_results_8[0];
        i = __gotots_results_8[1];
        if (Properties.$storageOf(info).size !== p - i) {
            break;
        }
    }
    (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ss = ss;
    let buf = GoArray.zero<uint8, 128>(128, 0);
    let cp = goArraySlice(buf, 0, RuntimeSlice.copy<uint8>(goArraySlice(buf, 0, null, null), (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(p, null, null)), null);
    (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out = (rb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_out.slice(0, p, null);
    for (padd--; padd >= 0; padd--) {
        info = Properties.$copy(Properties.$fromStorage(add.get(padd)));
        reorderBuffer.$go$private$norm$insertUnsafe(rb, inputBytes(cp), 0, Properties.$copy(info));
        cp = cp.slice(Properties.$storageOf(info).size, null, null);
    }
}
