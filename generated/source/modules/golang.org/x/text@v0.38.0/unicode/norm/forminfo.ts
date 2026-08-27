import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { streamSafe } from "./composition.js";
import type { iterFunc } from "./iter.js";
import type { Form } from "./normalize.js";
import type { bool, int, int32, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/state.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { streamSafe_next } from "./composition.js";
import { input } from "./input.js";
import { endMulti$uint16, firstCCC$uint16, firstLeadingCCC$uint16, firstMulti$uint16, firstStarterWithNLead$uint16, recompMapPacked$string } from "./tables15.0.0.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export const qcInfoMask$uint8: uint8 = 63;
export const headerLenMask$uint8: uint8 = 31;
export const headerFlagsMask$uint8: uint8 = 224;
export type Properties$Storage = {
    pos: uint8;
    size: uint8;
    ccc: uint8;
    tccc: uint8;
    nLead: uint8;
    flags: uint8;
    index: uint16;
};
export class Properties {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Properties$Storage) {
    }
    public static $storageOf($source: Properties): Properties$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Properties$Storage): Properties {
        return new Properties($source);
    }
    public get pos(): uint8 {
        return this.$storage.pos;
    }
    public set pos($value: uint8) {
        this.$storage.pos = $value;
    }
    public get size(): uint8 {
        return this.$storage.size;
    }
    public set size($value: uint8) {
        this.$storage.size = $value;
    }
    public get ccc(): uint8 {
        return this.$storage.ccc;
    }
    public set ccc($value: uint8) {
        this.$storage.ccc = $value;
    }
    public get tccc(): uint8 {
        return this.$storage.tccc;
    }
    public set tccc($value: uint8) {
        this.$storage.tccc = $value;
    }
    public get nLead(): uint8 {
        return this.$storage.nLead;
    }
    public set nLead($value: uint8) {
        this.$storage.nLead = $value;
    }
    public get flags(): qcInfo {
        return this.$storage.flags;
    }
    public set flags($value: qcInfo) {
        this.$storage.flags = $value;
    }
    public get index(): uint16 {
        return this.$storage.index;
    }
    public set index($value: uint16) {
        this.$storage.index = $value;
    }
    static $zero(): Properties {
        return new Properties({
            pos: 0,
            size: 0,
            ccc: 0,
            tccc: 0,
            nLead: 0,
            flags: 0,
            index: 0
        });
    }
    static $copy($source: Properties): Properties {
        return new Properties({
            pos: $source.$storage.pos,
            size: $source.$storage.size,
            ccc: $source.$storage.ccc,
            tccc: $source.$storage.tccc,
            nLead: $source.$storage.nLead,
            flags: $source.$storage.flags,
            index: $source.$storage.index
        });
    }
    declare private readonly then?: never;
    BoundaryAfter(): bool {
        return this.$go$private$norm$isInert();
    }
    BoundaryBefore(): bool {
        if (Properties.$storageOf(this).ccc === 0 && !this.$go$private$norm$combinesBackward()) {
            return true;
        }
        return false;
    }
    Decomposition(): RuntimeSlice<uint8> {
        if (Properties.$storageOf(this).index === 0) {
            return RuntimeSlice.nil<uint8>();
        }
        let i = Properties.$storageOf(this).index;
        let n = $state.decomps.get(i) & headerLenMask$uint8;
        if (n === 31) {
            n = 33;
        }
        i++;
        return goArraySlice($state.decomps, i, i + n, null);
    }
    LeadCCC(): uint8 {
        return $state.ccc.get(Properties.$storageOf(this).ccc);
    }
    Size(): int {
        return Properties.$storageOf(this).size;
    }
    TrailCCC(): uint8 {
        return $state.ccc.get(Properties.$storageOf(this).tccc);
    }
    $go$private$norm$combinesBackward(): bool {
        return !((Properties.$storageOf(this).flags & 8) === 0);
    }
    $go$private$norm$hasDecomposition(): bool {
        return !((Properties.$storageOf(this).flags & 4) === 0);
    }
    $go$private$norm$isInert(): bool {
        return (Properties.$storageOf(this).flags & qcInfoMask$uint8) === 0 && Properties.$storageOf(this).ccc === 0;
    }
    $go$private$norm$isYesC(): bool {
        return (Properties.$storageOf(this).flags & 16) === 0;
    }
    $go$private$norm$isYesD(): bool {
        return (Properties.$storageOf(this).flags & 4) === 0;
    }
    $go$private$norm$multiSegment(): bool {
        return Properties.$storageOf(this).index >= firstMulti$uint16 && Properties.$storageOf(this).index < endMulti$uint16;
    }
    $go$private$norm$nLeadingNonStarters(): uint8 {
        return Properties.$storageOf(this).nLead;
    }
    $go$private$norm$nTrailingNonStarters(): uint8 {
        return Properties.$storageOf(this).flags & 3;
    }
}
export class lookupFunc {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: input, $1: int) => Properties) | undefined) {
    }
    declare private readonly then?: never;
}
export class formInfo {
    declare private readonly $goType: void;
    public constructor(public form: Form, public composing: bool, public compatibility: bool, public info: lookupFunc, public nextMain: iterFunc) {
    }
    static $copy($source: formInfo): formInfo {
        return new formInfo($source.form, $source.composing, $source.compatibility, $source.info, $source.nextMain);
    }
    declare private readonly then?: never;
    static $go$private$norm$quickSpan(f: tsonicTypeScriptRuntime.Location<formInfo> | undefined, src: input, i: int, end: int, atEOF: bool): [
        int,
        bool
    ] {
        let n: int = 0;
        let ok: bool = false;
        let lastCC = 0;
        let ss = 0;
        const ss$location = tsonicTypeScriptRuntime.boundLocation({}, () => ss, ss$next => ss = ss$next);
        let lastSegStart = i;
        for (n = end; i < n;) {
            {
                let j = input.$go$private$norm$skipASCII(src, i, n);
                if (i !== j) {
                    i = j;
                    lastSegStart = i - 1;
                    lastCC = 0;
                    ss = 0;
                    continue;
                }
            }
            const __gotots_callee_0 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<formInfo>).value.info.$value;
            const __gotots_argument_0 = input.$copy(src);
            const __gotots_argument_1 = i;
            let info = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            if (Properties.$storageOf(info).size === 0) {
                if (atEOF) {
                    return [n, true];
                }
                return [lastSegStart, true];
            }
            switch (streamSafe_next(ss$location, Properties.$copy(info)).$value) {
                case 1: {
                    lastSegStart = i;
                    break;
                }
                case 2: {
                    return [lastSegStart, false];
                    break;
                }
                case 0: {
                    if (lastCC > Properties.$storageOf(info).ccc) {
                        return [lastSegStart, false];
                    }
                    break;
                }
            }
            if (((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<formInfo>).value.composing) {
                if (!info.$go$private$norm$isYesC()) {
                    break;
                }
            }
            else {
                if (!info.$go$private$norm$isYesD()) {
                    break;
                }
            }
            lastCC = Properties.$storageOf(info).ccc;
            i += Properties.$storageOf(info).size;
        }
        if (i === n) {
            if (!atEOF) {
                n = lastSegStart;
            }
            return [n, true];
        }
        return [lastSegStart, false];
    }
}
export type qcInfo = uint8;
export function buildRecompMap(): void {
    $state.recompMap = GoMap.make<uint32, int32>(0, 941, []);
    let buf = GoArray.zero<uint8, 8>(8, 0);
    for (let i = 0; i < 7528; i += 8) {
        const __gotots_slice_build_0 = goArraySlice(buf, 0, null, null);
        const __gotots_slice_build_1 = goStringSlice(recompMapPacked$string, i, i + 8);
        const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
            __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
        }
        __gotots_slice_build_2;
        let key = binary__from_gostdlib.state.BigEndian.Uint32(goArraySlice(buf, 0, 4, null));
        let val = binary__from_gostdlib.state.BigEndian.Uint32(goArraySlice(buf, 4, null, null));
        $state.recompMap.store(key, val | 0);
    }
}
export function combine(a: int32, b: int32): int32 {
    let key = ((a & 65535) << 16 >>> 0) + (b & 65535);
    if ($state.recompMap.isNil()) {
        const __gotots_argument_2 = new GoInterfaceAdapter("caller error");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
    }
    return $state.recompMap.lookup(key);
}
export function lookupInfoNFC(b: input, i: int): Properties {
    const __gotots_results_0 = input.$go$private$norm$charinfoNFC(b, i);
    let v = __gotots_results_0[0];
    let sz = __gotots_results_0[1];
    return compInfo(v, sz);
}
export function lookupInfoNFKC(b: input, i: int): Properties {
    const __gotots_results_1 = input.$go$private$norm$charinfoNFKC(b, i);
    let v = __gotots_results_1[0];
    let sz = __gotots_results_1[1];
    return compInfo(v, sz);
}
export function compInfo(v: uint16, sz: int): Properties {
    if (v === 0) {
        return Properties.$fromStorage({
            size: sz & 255,
            pos: 0,
            ccc: 0,
            tccc: 0,
            nLead: 0,
            flags: 0,
            index: 0
        });
    }
    else if (v >= 32768) {
        let p__shadow_1 = Properties.$fromStorage({
            size: sz & 255,
            ccc: v & 255,
            tccc: v & 255,
            flags: v >> 8 & 255,
            pos: 0,
            nLead: 0,
            index: 0
        });
        if (Properties.$storageOf(p__shadow_1).ccc > 0 || p__shadow_1.$go$private$norm$combinesBackward()) {
            Properties.$storageOf(p__shadow_1).nLead = Properties.$storageOf(p__shadow_1).flags & 3;
        }
        return Properties.$copy(p__shadow_1);
    }
    let h = $state.decomps.get(v);
    let f = ((h & headerFlagsMask$uint8) >> 2) | 4;
    let p = Properties.$fromStorage({
        size: sz & 255,
        flags: f,
        index: v,
        pos: 0,
        ccc: 0,
        tccc: 0,
        nLead: 0
    });
    if (v >= firstCCC$uint16) {
        let n = h & headerLenMask$uint8;
        if (n === 31) {
            n = 33;
        }
        v += n + 1;
        let c = $state.decomps.get(v);
        Properties.$storageOf(p).tccc = c >> 2;
        const __gotots_store_0 = Properties.$storageOf(p);
        __gotots_store_0.flags = __gotots_store_0.flags | c & 3;
        if (v >= firstLeadingCCC$uint16) {
            Properties.$storageOf(p).nLead = c & 3;
            if (v >= firstStarterWithNLead$uint16) {
                const __gotots_store_1 = Properties.$storageOf(p);
                __gotots_store_1.flags = __gotots_store_1.flags & 3;
                Properties.$storageOf(p).index = 0;
                return Properties.$copy(p);
            }
            Properties.$storageOf(p).ccc = $state.decomps.get(v + 1);
        }
    }
    return Properties.$copy(p);
}
