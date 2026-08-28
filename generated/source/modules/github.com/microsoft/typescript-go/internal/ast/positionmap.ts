import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class PositionMap {
    declare private readonly $goType: void;
    public constructor(public asciiOnly: bool, public entries: RuntimeSlice<positionMapEntry$Storage>) {
    }
    static $copy($source: PositionMap): PositionMap {
        return new PositionMap($source.asciiOnly, $source.entries);
    }
    declare private readonly then?: never;
    static UTF16ToUTF8(pm: {
        value: PositionMap;
    } | undefined, utf16Offset: int): int {
        if ((pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.asciiOnly) {
            return utf16Offset;
        }
        const __gotots_assign_0 = 0;
        const __gotots_assign_1 = (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.length;
        let lo = __gotots_assign_0;
        let hi = __gotots_assign_1;
        for (; lo < hi;) {
            let mid = lo + goNumberIntegerDivide((hi - lo), 2);
            let utf16Pos = (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
                (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.get(mid))).utf8Pos - (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
                (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.get(mid))).delta;
            if (utf16Pos <= utf16Offset) {
                lo = mid + 1;
            }
            else {
                hi = mid;
            }
        }
        if (lo === 0) {
            return utf16Offset;
        }
        return utf16Offset + (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
            (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.get(lo - 1))).delta;
    }
    static UTF8ToUTF16(pm: {
        value: PositionMap;
    } | undefined, utf8Offset: int): int {
        if ((pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.asciiOnly) {
            return utf8Offset;
        }
        const __gotots_assign_2 = 0;
        const __gotots_assign_3 = (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.length;
        let lo = __gotots_assign_2;
        let hi = __gotots_assign_3;
        for (; lo < hi;) {
            let mid = lo + goNumberIntegerDivide((hi - lo), 2);
            if ((void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
                (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.get(mid))).utf8Pos <= utf8Offset) {
                lo = mid + 1;
            }
            else {
                hi = mid;
            }
        }
        if (lo === 0) {
            return utf8Offset;
        }
        return utf8Offset - (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
            (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.get(lo - 1))).delta;
    }
}
export type positionMapEntry$Storage = {
    utf8Pos: int;
    delta: int;
};
export class positionMapEntry {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: positionMapEntry$Storage) {
    }
    public static $storageOf($source: positionMapEntry): positionMapEntry$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: positionMapEntry$Storage): positionMapEntry {
        return new positionMapEntry($source);
    }
    public get utf8Pos(): int {
        return this.$storage.utf8Pos;
    }
    public set utf8Pos($value: int) {
        this.$storage.utf8Pos = $value;
    }
    public get delta(): int {
        return this.$storage.delta;
    }
    public set delta($value: int) {
        this.$storage.delta = $value;
    }
    static $zero(): positionMapEntry {
        return new positionMapEntry({
            utf8Pos: 0,
            delta: 0
        });
    }
    static $copy($source: positionMapEntry): positionMapEntry {
        return new positionMapEntry({
            utf8Pos: $source.$storage.utf8Pos,
            delta: $source.$storage.delta
        });
    }
    static $equal($left: positionMapEntry, $right: positionMapEntry): bool {
        return $left.$storage.utf8Pos === $right.$storage.utf8Pos && $left.$storage.delta === $right.$storage.delta;
    }
    static $hash($source: positionMapEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.utf8Pos));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.delta));
        return $hash;
    }
    declare private readonly then?: never;
}
export function ComputePositionMap(text: gostring): {
    value: PositionMap;
} | undefined {
    let pm: {
        value: PositionMap;
    } | undefined = { value: new PositionMap(false, RuntimeSlice.nil<positionMapEntry$Storage>()) };
    let delta = 0;
    for (let i = 0; i < text.length;) {
        let b = goStringIndex(text, i);
        if (b < RuneSelf$uint8__from_utf8) {
            i++;
            continue;
        }
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, i));
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_1[0];
        let size = __gotots_results_1[1];
        let utf16Size = 1;
        if (r >= 65536) {
            utf16Size = 2;
        }
        delta += size - utf16Size;
        const __gotots_slice_build_0: PositionMap["entries"] = (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
                {
                    utf8Pos: i + size,
                    delta: delta
                })));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<positionMapEntry$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, positionMapEntry.$storageOf(positionMapEntry.$copy(positionMapEntry.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void positionMapEntry.$storageOf, (void positionMapEntry.$fromStorage,
                {
                    utf8Pos: i + size,
                    delta: delta
                })));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, positionMapEntry.$storageOf(positionMapEntry.$zero()));
            }
        }
        (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries = __gotots_slice_build_1;
        i += size;
    }
    (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.asciiOnly = (pm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.length === 0;
    return pm;
}
