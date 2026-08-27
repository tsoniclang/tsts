import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type valueRange$Storage = {
    value: uint16;
    lo: uint8;
    hi: uint8;
};
export class valueRange {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: valueRange$Storage) {
    }
    public static $storageOf($source: valueRange): valueRange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: valueRange$Storage): valueRange {
        return new valueRange($source);
    }
    public get value(): uint16 {
        return this.$storage.value;
    }
    public set value($value: uint16) {
        this.$storage.value = $value;
    }
    public get lo(): uint8 {
        return this.$storage.lo;
    }
    public set lo($value: uint8) {
        this.$storage.lo = $value;
    }
    public get hi(): uint8 {
        return this.$storage.hi;
    }
    public set hi($value: uint8) {
        this.$storage.hi = $value;
    }
    static $zero(): valueRange {
        return new valueRange({
            value: 0,
            lo: 0,
            hi: 0
        });
    }
    static $copy($source: valueRange): valueRange {
        return new valueRange({
            value: $source.$storage.value,
            lo: $source.$storage.lo,
            hi: $source.$storage.hi
        });
    }
    declare private readonly then?: never;
}
export type sparseBlocks$Storage = {
    values: RuntimeSlice<valueRange$Storage>;
    offset: RuntimeSlice<uint16>;
};
export class sparseBlocks {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: sparseBlocks$Storage) {
    }
    public static $storageOf($source: sparseBlocks): sparseBlocks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: sparseBlocks$Storage): sparseBlocks {
        return new sparseBlocks($source);
    }
    public get values(): RuntimeSlice<valueRange$Storage> {
        return this.$storage.values;
    }
    public set values($value: RuntimeSlice<valueRange$Storage>) {
        this.$storage.values = $value;
    }
    public get offset(): RuntimeSlice<uint16> {
        return this.$storage.offset;
    }
    public set offset($value: RuntimeSlice<uint16>) {
        this.$storage.offset = $value;
    }
    static $zero(): sparseBlocks {
        return new sparseBlocks({
            values: RuntimeSlice.nil<valueRange$Storage>(),
            offset: RuntimeSlice.nil<uint16>()
        });
    }
    declare private readonly then?: never;
    static $go$private$norm$lookup(t: tsonicTypeScriptRuntime.Location<sparseBlocks> | undefined, n: uint32, b: uint8): uint16 {
        let offset = sparseBlocks.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<sparseBlocks>).value).offset.get(n);
        let header = valueRange.$copy(valueRange.$fromStorage(sparseBlocks.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<sparseBlocks>).value).values.get(offset)));
        let lo = offset + 1;
        let hi = lo + valueRange.$storageOf(header).lo;
        for (; lo < hi;) {
            let m = lo + goNumberIntegerDivide((hi - lo), 2);
            let r = valueRange.$copy(valueRange.$fromStorage(sparseBlocks.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<sparseBlocks>).value).values.get(m)));
            if (valueRange.$storageOf(r).lo <= b && b <= valueRange.$storageOf(r).hi) {
                return valueRange.$storageOf(r).value + (b - valueRange.$storageOf(r).lo) * valueRange.$storageOf(header).value;
            }
            if (b < valueRange.$storageOf(r).lo) {
                hi = m;
            }
            else {
                lo = m + 1;
            }
        }
        return 0;
    }
}
