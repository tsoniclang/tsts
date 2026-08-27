import { GoPanic } from "./panic.js";
export class GoArray<T, N extends number> {
    private constructor(private readonly $values: T[], private readonly $offset: number, public readonly length: N) {
    }
    public static $allocate<T, N extends number>(length: N): GoArray<T, N> {
        return new GoArray<T, N>(new Array<T>(globalThis.Number(length)), 0, length);
    }
    public $location(): readonly [
        T[],
        number
    ] {
        return [this.$values, this.$offset];
    }
    public static zero<T, N extends number>(length: N, zero: T): GoArray<T, N> {
        const values: T[] = [];
        for (let index = 0; index < length; index++) {
            values.push(zero);
        }
        return new GoArray<T, N>(values, 0, length);
    }
    public static literal<T, N extends number>(length: N, zero: T, indexes: number[], values: T[]): GoArray<T, N> {
        if (indexes.length !== values.length) {
            GoPanic.raiseRuntime("array literal index/value length mismatch");
        }
        const result = GoArray.zero<T, N>(length, zero);
        for (let entry = 0; entry < indexes.length; entry++) {
            result.set((entry in indexes ? indexes[entry] : GoPanic.raiseRuntime("dense storage index is absent")) as number, (entry in values ? values[entry] : GoPanic.raiseRuntime("dense storage index is absent")) as T);
        }
        return result;
    }
    public copy(): GoArray<T, N> {
        return new GoArray<T, N>(this.$values.slice(this.$offset, this.$offset + globalThis.Number(this.length)), 0, this.length);
    }
    public get(index: number | bigint): T {
        const offset: number = this.$check(index);
        return (this.$offset + offset in this.$values ? this.$values[this.$offset + offset] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
    }
    public set(index: number | bigint, value: T): void {
        const offset: number = this.$check(index);
        this.$values[this.$offset + offset] = value;
    }
    private $check(index: number | bigint): number {
        const offset: number = globalThis.Number(index);
        if (!globalThis.Number.isInteger(offset) || offset < 0 || offset >= this.length) {
            GoPanic.raiseRuntime("array index out of bounds");
        }
        return offset;
    }
    declare private readonly then?: never;
}
export function goArrayAllocate<T, N extends number>(length: N): GoArray<T, N> {
    return GoArray.$allocate<T, N>(length);
}
export function goArrayLocation<T, N extends number>(value: GoArray<T, N>): readonly [
    T[],
    number
] {
    return value.$location();
}
export function goArrayPacked<T extends number, N extends number>(length: N, zero: T, entryCount: number, encoded: string): GoArray<T, N> {
    const fields = encoded.split(",");
    if (fields.length !== entryCount * 2) {
        GoPanic.raiseRuntime("array packed payload length mismatch");
    }
    const result = GoArray.zero<T, N>(length, zero);
    for (let entry = 0; entry < fields.length; entry += 2) {
        const indexText: string = (entry in fields ? fields[entry] : GoPanic.raiseRuntime("dense storage index is absent")) as string;
        const index: number = globalThis.Number.parseInt(indexText, 36);
        const valueText: string = (entry + 1 in fields ? fields[entry + 1] : GoPanic.raiseRuntime("dense storage index is absent")) as string;
        const value: number = globalThis.Number.parseInt(valueText, 36);
        if (!globalThis.Number.isSafeInteger(index) || index.toString(36) !== indexText || (!globalThis.Number.isSafeInteger(value) || value.toString(36) !== valueText)) {
            GoPanic.raiseRuntime("array packed payload is malformed");
        }
        result.set(index, value as T);
    }
    return result;
}
