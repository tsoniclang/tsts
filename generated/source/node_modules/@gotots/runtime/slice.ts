import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import { GoArray, goArrayLocation } from "./array.js";
import { GoPanic } from "./panic.js";
export class RuntimeSlice<T> {
    protected constructor(private readonly backing: T[] | null, private readonly offset: number, readonly length: number, readonly capacity: number) {
    }
    static nil<T>(): RuntimeSlice<T> {
        return new RuntimeSlice<T>(null, 0, 0, 0);
    }
    static make<T>(length: number | bigint, capacity: (number | bigint) | null, zero: T): RuntimeSlice<T> {
        const numericLength = globalThis.Number(length);
        const resolvedCapacity = globalThis.Number(capacity ?? numericLength);
        if (numericLength < 0 || resolvedCapacity < numericLength)
            GoPanic.raiseRuntime("slice bounds out of range");
        const backing = new Array<T>(resolvedCapacity).fill(zero);
        return new RuntimeSlice<T>(backing, 0, numericLength, resolvedCapacity);
    }
    static literal<T>(values: T[]): RuntimeSlice<T> {
        return new RuntimeSlice<T>(values, 0, values.length, values.length);
    }
    isNil(): boolean {
        return this.backing === null;
    }
    get(index: number | bigint): T {
        const numericIndex = globalThis.Number(index);
        const backing = this.backing;
        if (backing === null || (numericIndex < 0 || numericIndex >= this.length))
            GoPanic.raiseRuntime("runtime error: index out of range [" + String(numericIndex) + "] with length " + String(this.length));
        return (this.offset + numericIndex in backing ? backing[this.offset + numericIndex] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
    }
    set(index: number | bigint, value: T): T {
        const numericIndex = globalThis.Number(index);
        const backing = this.backing;
        if (backing === null || (numericIndex < 0 || numericIndex >= this.length))
            GoPanic.raiseRuntime("runtime error: index out of range [" + String(numericIndex) + "] with length " + String(this.length));
        backing[this.offset + numericIndex] = value;
        return value;
    }
    slice(low: number | bigint, high: (number | bigint) | null, max: (number | bigint) | null): RuntimeSlice<T> {
        const numericLow = globalThis.Number(low);
        const resolvedHigh = high === null ? this.length : globalThis.Number(high);
        const resolvedMax = max === null ? this.capacity : globalThis.Number(max);
        if (numericLow < 0 || resolvedHigh < numericLow || (resolvedMax < resolvedHigh || resolvedMax > this.capacity))
            GoPanic.raiseRuntime("slice bounds out of range");
        return new RuntimeSlice<T>(this.backing, this.offset + numericLow, resolvedHigh - numericLow, resolvedMax - numericLow);
    }
    append(zero: T, values: T[]): RuntimeSlice<T> {
        const newLength = this.length + values.length;
        const existingBacking = this.backing;
        if (values.length === 0)
            return this;
        if (newLength <= this.capacity) {
            if (existingBacking === null)
                GoPanic.raiseRuntime("slice bounds out of range");
            for (let index = 0; index < values.length; index++) {
                existingBacking[this.offset + this.length + index] = (index in values ? values[index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
            }
            return new RuntimeSlice<T>(existingBacking, this.offset, newLength, this.capacity);
        }
        const nextCapacity = RuntimeSlice.$grownCapacity(this.capacity, newLength);
        const backing = new Array<T>(nextCapacity).fill(zero);
        if (existingBacking !== null) {
            for (let index = 0; index < this.length; index++) {
                backing[index] = (this.offset + index in existingBacking ? existingBacking[this.offset + index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
            }
        }
        for (let index = 0; index < values.length; index++) {
            backing[this.length + index] = (index in values ? values[index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
        }
        return new RuntimeSlice<T>(backing, 0, newLength, nextCapacity);
    }
    static copy<T>(target: RuntimeSlice<T>, source: RuntimeSlice<T>): number {
        const count = Math.min(target.length, source.length);
        const targetBacking = target.backing;
        const sourceBacking = source.backing;
        if (count === 0)
            return 0;
        if (targetBacking !== null && sourceBacking !== null) {
            if (targetBacking === sourceBacking)
                targetBacking.copyWithin(target.offset, source.offset, source.offset + count);
            else
                for (let index = 0; index < count; index++) {
                    targetBacking[target.offset + index] = (source.offset + index in sourceBacking ? sourceBacking[source.offset + index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
                }
            return count;
        }
        const values = new Array<T>(count);
        for (let index = 0; index < count; index++) {
            values[index] = source.get(index);
        }
        for (let index = 0; index < count; index++) {
            target.set(index, (index in values ? values[index] : GoPanic.raiseRuntime("dense storage index is absent")) as T);
        }
        return count;
    }
    static $allocate<T>(length: number | bigint, capacity: (number | bigint) | null): RuntimeSlice<T> {
        const numericLength = globalThis.Number(length);
        const resolvedCapacity = globalThis.Number(capacity ?? numericLength);
        if (numericLength < 0 || resolvedCapacity < numericLength)
            GoPanic.raiseRuntime("slice bounds out of range");
        return new RuntimeSlice<T>(new Array<T>(resolvedCapacity), 0, numericLength, resolvedCapacity);
    }
    static $grownCapacity(capacity: number, length: number): number {
        let nextCapacity = capacity === 0 ? 1 : capacity * 2;
        while (nextCapacity < length) {
            nextCapacity *= 2;
        }
        return nextCapacity;
    }
    $initialize(index: number, value: T): void {
        const backing = this.backing;
        if (backing === null || (index < 0 || index >= this.capacity))
            GoPanic.raiseRuntime("slice bounds out of range");
        backing[this.offset + index] = value;
    }
    $withLength(length: number): RuntimeSlice<T> {
        return this.slice(0, length, null);
    }
    appendSlice(zero: T, source: RuntimeSlice<T>): RuntimeSlice<T> {
        const values = new Array<T>(source.length);
        for (let index = 0; index < source.length; index++) {
            values[index] = source.get(index);
        }
        const newLength = this.length + values.length;
        const existingBacking = this.backing;
        if (values.length === 0)
            return this;
        if (newLength <= this.capacity) {
            if (existingBacking === null)
                GoPanic.raiseRuntime("slice bounds out of range");
            for (let index = 0; index < values.length; index++) {
                existingBacking[this.offset + this.length + index] = (index in values ? values[index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
            }
            return new RuntimeSlice<T>(existingBacking, this.offset, newLength, this.capacity);
        }
        const nextCapacity = RuntimeSlice.$grownCapacity(this.capacity, newLength);
        const backing = new Array<T>(nextCapacity).fill(zero);
        if (existingBacking !== null) {
            for (let index = 0; index < this.length; index++) {
                backing[index] = (this.offset + index in existingBacking ? existingBacking[this.offset + index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
            }
        }
        for (let index = 0; index < values.length; index++) {
            backing[this.length + index] = (index in values ? values[index] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
        }
        return new RuntimeSlice<T>(backing, 0, newLength, nextCapacity);
    }
    clear(zero: T): void {
        if (this.backing === null) {
            return;
        }
        for (let index = 0; index < this.length; index++) {
            this.backing[this.offset + index] = zero;
        }
    }
    address(index: number | bigint): tsonicTypeScriptRuntime.Location<T> {
        const numericIndex = globalThis.Number(index);
        const backing = this.backing;
        if (backing === null || (numericIndex < 0 || numericIndex >= this.length))
            GoPanic.raiseRuntime("slice bounds out of range");
        return tsonicTypeScriptRuntime.propertyLocation(backing, this.offset + numericIndex);
    }
    $arrayLocation<N extends number>(length: N): readonly [
        T[],
        number
    ] | undefined {
        const requested = globalThis.Number(length);
        if (this.length < requested)
            GoPanic.raiseRuntime("slice bounds out of range");
        const backing = this.backing;
        if (backing === null) {
            return void 0;
        }
        return [backing, this.offset];
    }
    static $view<T>(backing: T[], offset: number, length: number, capacity: number): RuntimeSlice<T> {
        return new RuntimeSlice<T>(backing, offset, length, capacity);
    }
    declare private readonly then?: never;
}
export function goSliceAddress<T>(value: RuntimeSlice<T>, index: number | bigint): tsonicTypeScriptRuntime.Location<T> {
    return value.address(index);
}
export function goSliceAllocate<T>(length: number | bigint, capacity: (number | bigint) | null): RuntimeSlice<T> {
    return RuntimeSlice.$allocate<T>(length, capacity);
}
export class RuntimeSliceProjection<F, T> extends RuntimeSlice<T> {
    constructor(private readonly source: RuntimeSlice<F>, private readonly fromSource: (value: F) => T, private readonly toSource: (value: T) => F, private readonly sourceZero: F, private readonly targetZero: T) {
        super(null, 0, source.length, source.capacity);
    }
    override isNil(): boolean {
        return this.source.isNil();
    }
    override get(index: number | bigint): T {
        return this.fromSource(this.source.get(index));
    }
    override set(index: number | bigint, value: T): T {
        this.source.set(index, this.toSource(value));
        return value;
    }
    override slice(low: number | bigint, high: (number | bigint) | null, max: (number | bigint) | null): RuntimeSlice<T> {
        return new RuntimeSliceProjection<F, T>(this.source.slice(low, high, max), this.fromSource, this.toSource, this.sourceZero, this.targetZero);
    }
    override append(_zero: T, values: T[]): RuntimeSlice<T> {
        const converted = values.map((value: T): F => this.toSource(value));
        return new RuntimeSliceProjection<F, T>(this.source.append(this.sourceZero, converted), this.fromSource, this.toSource, this.sourceZero, this.targetZero);
    }
    override $initialize(index: number, value: T): void {
        this.source.$initialize(index, this.toSource(value));
    }
    override $withLength(length: number): RuntimeSlice<T> {
        return new RuntimeSliceProjection<F, T>(this.source.$withLength(length), this.fromSource, this.toSource, this.sourceZero, this.targetZero);
    }
    override appendSlice(_zero: T, next: RuntimeSlice<T>): RuntimeSlice<T> {
        const values = new Array<T>;
        for (let index = 0; index < next.length; index++) {
            values.push(next.get(index));
        }
        return this.append(this.targetZero, values);
    }
    override clear(zero: T): void {
        for (let index = 0; index < this.source.length; index++) {
            this.source.set(index, this.toSource(zero));
        }
    }
    override address(index: number | bigint): tsonicTypeScriptRuntime.Location<T> {
        return tsonicTypeScriptRuntime.projectLocation<F, T>(this.source.address(index), this.fromSource, this.toSource);
    }
    override $arrayLocation<N extends number>(length: N): readonly [
        T[],
        number
    ] | undefined {
        const sourceLocation = this.source.$arrayLocation<N>(length);
        if (sourceLocation === void 0) {
            return void 0;
        }
        return GoPanic.raiseRuntime("projected slice has no contiguous target representation");
    }
}
export function goArraySlice<T, N extends number>(value: GoArray<T, N>, low: number | bigint, high: (number | bigint) | null, max: (number | bigint) | null): RuntimeSlice<T> {
    const location = goArrayLocation<T, N>(value);
    return RuntimeSlice.$view<T>(location[0], location[1], value.length, value.length).slice(low, high, max);
}
export function goSliceAppendSlice<T>(target: RuntimeSlice<T>, source: RuntimeSlice<T>, zero: T): RuntimeSlice<T> {
    return target.appendSlice(zero, source);
}
export function goSliceClear<T>(source: RuntimeSlice<T>, zero: T): void {
    source.clear(zero);
}
