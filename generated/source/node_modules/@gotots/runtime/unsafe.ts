import { GoPanic } from "./panic.js";
import { RuntimeSlice } from "./slice.js";
export function goUnsafeString<I extends number | bigint>(source: RuntimeSlice<I>, offset: number | bigint, length: number | bigint): string {
    const numericOffset = globalThis.Number(offset);
    const numericLength = globalThis.Number(length);
    if (numericLength < 0)
        GoPanic.raiseRuntime("unsafe string length is negative");
    let result: string = "";
    for (let index = 0; index < numericLength; index++) {
        result += globalThis.String.fromCharCode(globalThis.Number(source.get(numericOffset + index)));
    }
    return result;
}
